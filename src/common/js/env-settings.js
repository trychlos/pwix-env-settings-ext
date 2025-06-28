/*
 * pwix:env-settings-ext/src/common/js/env-settings.js
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
        // a function which returns an array of single keys
        const _getKeys = function(){
            let keys = [];
            const confKeys = EnvSettingsExt.configure().environmentsKeys;
            if( _.isArray( confKeys )){
                confKeys.forEach(( it ) => {
                    keys.push( _getKeysByString( it ));
                });
            } else {
                keys.push( _getKeysByString( confKeys ));
            }
            return keys;
        };
        // a function which split the dot-separated string
        const _getKeysByString = function( str ){
            return str.split( '.' );
        };
        Tracker.autorun(() => {
            if( EnvSettings.ready()){
                let environments = Meteor.settings;
                const keys = _getKeys();
                keys.forEach(( it ) => {
                    environments = environments[it];
                });
                const input = environments[Meteor.settings.runtime.env];
                output = _removePrivateKeys( input );
            }
        });
		_verbose( EnvSettingsExt.C.SETTINGS, 'environmentSettings() returns', output );
        return output;
    }
};

// when EnvSettings is ready, see if we have got some packages to reconfigure
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
                                _verbose( EnvSettingsExt.C.Verbose.PACKAGES, 'calling', pck, 'configure() with', conf );
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
