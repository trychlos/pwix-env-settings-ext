Package.describe({
    name: 'pwix:core-app',
    version: '1.0.0-rc',
    summary: 'Bootstrap-based core package for SPA/Web applications',
    git: 'https://github.com/trychlos/pwix-core-app.git',
    documentation: 'README.md'
});

Package.onUse( function( api ){
    configure( api );
    api.export([
        'CoreApp'
    ]);
    api.mainModule( 'src/client/js/index.js', 'client' );
    api.mainModule( 'src/server/js/index.js', 'server' );
});

Package.onTest( function( api ){
    configure( api );
    api.use( 'tinytest' );
    api.use( 'pwix:core-app' );
    api.mainModule( 'test/js/index.js' );
});

function configure( api ){
    const _use = function(){
        api.use( ...arguments );
        api.imply( ...arguments );
    };
    api.versionsFrom([ '2.9.0', '3.0-rc.0' ]);
    _use( 'check' );
    _use( 'blaze-html-templates@2.0.0 || 3.0.0-alpha300.0', 'client' );
    _use( 'ecmascript' );
    _use( 'less@4.0.0', 'client' );
    _use( 'mongo@1.16.1 || 2.0.0-rc300.2' );
    _use( 'ostrio:flow-router-extra@3.10.0 || 3.11.0-rc300.0' );
    // pwix packages are used by dependancy level/alpha
    // level zero
    _use( 'pwix:blaze-layout@2.3.2' );
    _use( 'pwix:env-settings@1.6.0 || 2.0.0-rc' );
    _use( 'pwix:i18n@1.5.7' );
    _use( 'pwix:jquery-ui@1.0.3' );
    _use( 'pwix:jstree@1.0.6' );
    _use( 'pwix:plus-button@0.11.2' );
    _use( 'pwix:ssr@0.9.0-rc' );
    _use( 'pwix:toggle-switch@0.3.3' );
    _use( 'pwix:tolert@1.4.2' );
    //_use( 'pwix:ui-layout@2.0.0-rc' );
    //_use( 'pwix:ui-utils@0.9.0-rc' );
    // level 1
    _use( 'pwix:editor@1.4.1' );
    _use( 'pwix:options@2.1.1' );
    // level 2
    _use( 'pwix:accounts-tools@2.0.0' );
    _use( 'pwix:modal@1.10.0' );
    // level 3
    _use( 'pwix:bootbox@1.5.5' );
    _use( 'pwix:cookie-manager@1.4.1' );
    _use( 'pwix:modal-info@1.4.4' );
    _use( 'pwix:roles@1.3.0' );
    // level 4
    _use( 'pwix:accounts-ui@1.5.0' );
    //_use( 'pwix:forums@1.1.3' );
    // level 5
    _use( 'pwix:startup-app-admin@1.3.0' );
    // new/unleveled
    _use( 'pwix:accounts-manager@0.9.0-rc' );
    _use( 'pwix:tabular-ext@0.9.0-rc' );
    // others...
    _use( 'reactive-dict' );
    _use( 'reactive-var' );
    _use( 'tmeasday:check-npm-versions@1.0.2 || 2.0.0-beta.0', 'server' );
    //_use( 'tracker', 'client' );
    api.addFiles( 'src/client/components/coreCookiesLink/coreCookiesLink.js', 'client' );
    api.addFiles( 'src/client/components/coreErrorMsg/coreErrorMsg.js', 'client' );
    api.addFiles( 'src/client/components/coreFieldCheckIndicator/coreFieldCheckIndicator.js', 'client' );
    api.addFiles( 'src/client/components/coreFieldTypeIndicator/coreFieldTypeIndicator.js', 'client' );
    api.addFiles( 'src/client/components/coreGDPRLink/coreGDPRLink.js', 'client' );
    api.addFiles( 'src/client/components/coreGTULink/coreGTULink.js', 'client' );
    api.addFiles( 'src/client/components/coreLegalsLink/coreLegalsLink.js', 'client' );
    api.addFiles( 'src/client/components/coreTabbedTemplate/coreTabbedTemplate.js', 'client' );
    api.addFiles( 'src/client/components/coreYesnoSelect/coreYesnoSelect.js', 'client' );
}

// NPM dependencies are checked in /src/server/js/check_npms.js
// See also https://guide.meteor.com/writing-atmosphere-packages.html#peer-npm-dependencies
