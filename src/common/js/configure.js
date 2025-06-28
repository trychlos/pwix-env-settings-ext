/*
 * pwix:env-settings-ext/src/common/js/configure.js
 */

import _ from 'lodash';

import { ReactiveVar } from 'meteor/reactive-var';

let _conf = {};
EnvSettingsExt._conf = new ReactiveVar( _conf );

EnvSettingsExt._defaults = {
    appName: null,
    adminRole: 'APP_ADMINISTRATOR',
    routePrefix: '/EnvSettingsExt',
    verbosity: EnvSettingsExt.C.Verbose.CONFIGURE
};

/**
 * @summary Get/set the package configuration
 *  Should be called *in same terms* both by the client and the server.
 * @param {Object} o configuration options
 * @returns {Object} the package configuration
 */
EnvSettingsExt.configure = function( o ){
    if( o && _.isObject( o )){
        _conf = _.merge( EnvSettingsExt._defaults, _conf, o );
        EnvSettingsExt._conf.set( _conf );
        // be verbose if asked for
        _verbose( EnvSettingsExt.C.Verbose.CONFIGURE, 'configure() with', o );
    }
    // also acts as a getter
    return EnvSettingsExt._conf.get();
}

_conf = _.merge( {}, EnvSettingsExt._defaults );
EnvSettingsExt._conf.set( _conf );
