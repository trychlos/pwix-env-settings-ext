/*
 * pwix:core-app/src/common/js/env-settings.js
 */

import _ from 'lodash';

import { Tracker } from 'meteor/tracker';

// let the environment settings override part of the default package configuration provided by the application for this particular environment
// it expects the following hierarchy:
//      "packages": {
//          "pwix:accounts-ui": {               the name of the package
//              "global": "AccountsUI",         the name of the exported global which holds the configure() function
//              "conf": {                       the list of overriden keys for this environment
//                  "passwordLength": 4,            as either a value or a constant
//                  "passwordStrength": {
//                      "constant": "AccountsUI.C.Password.VERYWEAK"
//                  }
//              }
//          }
//      }

Tracker.autorun(() => {
    const res = CoreApp.envSettings.get();
    if( res && res.settings && res.settings.packages ){
        Object.keys( res.settings.packages ).every(( pck ) => {
            if( Object.keys( res.settings.packages[pck] ).includes( 'global' )){
                const global = res.settings.packages[pck].global;
                if( Object.keys( res.settings.packages[pck] ).includes( 'conf' )){
                    let conf = {};
                    Object.keys( res.settings.packages[pck].conf ).every(( key ) => {
                        let val = res.settings.packages[pck].conf[key];
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
                        return true;
                    });
                    //console.debug( 'calling', pck, global+'.configure() with', conf );
                    Package[pck][global].configure( conf );
                }
            }
            return true;
        });
    }
});
