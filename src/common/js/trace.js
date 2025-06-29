/*
 * pwix:env-settings-ext/src/common/js/trace.js
 */

_verbose = function( level ){
    if( EnvSettingsExt.configure().verbosity & level ){
        let args = [ ...arguments ];
        args.shift();
        console.debug( 'pwix:env-settings-ext', ...args );
    }
};

_trace = function(){
    _verbose( EnvSettingsExt.C.Verbose.FUNCTIONS, ...arguments );
};
