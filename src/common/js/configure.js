/*
 * pwix:core-app/src/common/js/configure.js
 */

import _ from 'lodash';

import { ReactiveVar } from 'meteor/reactive-var';

let _conf = {};
CoreApp._conf = new ReactiveVar( _conf );

CoreApp._defaults = {
    appName: null,
    adminRole: 'APP_ADMINISTRATOR',
    routePrefix: '/coreApp',
    verbosity: CoreApp.C.Verbose.CONFIGURE
};

/**
 * @summary Get/set the package configuration
 *  Should be called *in same terms* both by the client and the server.
 * @param {Object} o configuration options
 * @returns {Object} the package configuration
 */
CoreApp.configure = function( o ){
    if( o && _.isObject( o )){
        _.merge( _conf, CoreApp._defaults, o );
        CoreApp._conf.set( _conf );
        // be verbose if asked for
        if( _conf.verbosity & CoreApp.C.Verbose.CONFIGURE ){
            //console.log( 'pwix:core-app configure() with', o, 'building', CoreApp._conf );
            console.log( 'pwix:core-app configure() with', o );
        }
    }
    // also acts as a getter
    return CoreApp._conf.get();
}

_.merge( _conf, CoreApp._defaults );
CoreApp._conf.set( _conf );
