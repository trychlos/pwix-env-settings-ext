/*
 * pwix:core-app/src/common/js/env-settings.js
 */

import { EnvSettings } from 'meteor/pwix:env-settings';
import { Tracker } from 'meteor/tracker';

/**
 * @locus Anywhere
 * @returns The private-filtered current environment settings
 * A reactive data source
 */

let _methodDefined = false;

EnvSettings.environmentSettings = async function(){
    if( Meteor.isClient ){
        return Meteor.callAsync( 'env_settings_environment' );
    } else {
        if( !_methodDefined ){
            Meteor.methods({
                // define a method which let the client calls this function
                async 'env_settings_environment'(){
                    return EnvSettings.environmentSettings();
                }
            });
            _methodDefined = true;
        }
        // [chatgpt code] filter the private data
        const _removePrivateKeys = function( obj ){
            // if the input is not an object or array, return it as it is (base case)
            if( typeof obj !== 'object' || obj === null ){
                return obj;
            }
            // if the input is an array, recursively process each element
            if( Array.isArray( obj )){
                return obj.map( _removePrivateKeys );
            }
            // if the input is an object, process each key-value pair
            let newObj = {};
            for( let key in obj ){
                if( obj.hasOwnProperty( key )){
                    // Skip the 'private' key, otherwise recursively process the value
                    if( key !== 'private' ){
                        newObj[key] = _removePrivateKeys( obj[key] );
                    }
                }
            }
            return newObj;
        }
        let output = undefined;
        Tracker.autorun(() => {
            if( EnvSettings.ready()){
                const appName = CoreApp.configure().appName;
                const input = Meteor.settings[appName].environments[Meteor.settings.runtime.env];
                output = _removePrivateKeys( input );
            }
        });
		//console.log( "EnvSettings.environmentSettings() returning", output );
        return output;
    }
};

// when EnvSettings is ready, see if we have got some packages to reconfigure
// honors reconfigurePackages
// this must be called once from common code

Tracker.autorun(() => {
    if( EnvSettings.ready()){
        let _done = false;
        EnvSettings.environmentSettings()
            .then(( settings ) => {
                if( settings && settings.packages && !_done ){
                    Object.keys( settings.packages ).every(( pck ) => {
                        if( Object.keys( settings.packages[pck] ).includes( 'global' )){
                            const global = settings.packages[pck].global;
                            if( Object.keys( settings.packages[pck] ).includes( 'conf' )){
                                let conf = {};
                                Object.keys( settings.packages[pck].conf ).forEach(( key ) => {
                                    let val = settings.packages[pck].conf[key];
                                    if( val ){
                                        if( _.isString( val )){
                                            conf[key] = val;
                                        } else if( _.isNumber( val )){
                                            conf[key] = val;
                                        } else if( _.isObject( val )){
                                            if( val.constant ){
                                                let words = val.constant.split( '.' );
                                                let val2 = Package[pck];
                                                for( let i=0 ; i<words.length ; ++i ){
                                                    val2 = val2[words[i]];
                                                }
                                                conf[key] = val2;
                                            } else {
                                                console.warn( 'unmanaged key', val );
                                            }
                                        } else {
                                            console.warn( 'unmanaged object', val );
                                        }
                                    }
                                });
                                EnvSettings.verbose( EnvSettings.C.Verbose.RECONFIGURE, 'calling', pck, 'configure() with', conf );
                                Package[pck][global].configure( conf );
                            }
                        }
                        return true;
                    });
                    _done = true;
                }
            });
    }
});
