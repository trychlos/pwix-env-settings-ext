/*
 * pwix:core-app/src/common/js/configure.js
 */

import _ from 'lodash';

CoreApp._conf = {};

CoreApp._defaults = {
    appName: null,
    adminRole: 'APP_ADMINISTRATOR',
    menuIcon: 'fa-chevron-right',
    routePrefix: '/coreApp',
    classes: [ 't-page' ],
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
        _.merge( CoreApp._conf, CoreApp._defaults, o );
        // be verbose if asked for
        if( CoreApp._conf.verbosity & CoreApp.C.Verbose.CONFIGURE ){
            //console.log( 'pwix:core-app configure() with', o, 'building', CoreApp._conf );
            console.log( 'pwix:core-app configure() with', o );
        }
    }
    // also acts as a getter
    return CoreApp._conf;
}

_.merge( CoreApp._conf, CoreApp._defaults );
