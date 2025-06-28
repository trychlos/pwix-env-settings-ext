/*
 * pwix:env-settings-ext/src/common/js/trace.js
 */

_verbose = function( level ){
    if( EnvSettingsExt.configure().verbosity & level ){
        let args = [ ...arguments ];
        args.shift();
        console.debug( ...args );
    }
};

_trace = function( functionName ){
    _verbose( EnvSettingsExt.C.Verbose.FUNCTIONS, ...arguments );
};
