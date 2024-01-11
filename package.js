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
    api.versionsFrom( '2.9.0' );
    _use( 'check' );
    _use( 'blaze-html-templates@2.0.0', 'client' );
    _use( 'ecmascript' );
    _use( 'less@4.0.0', 'client' );
    _use( 'mongo' );
    _use( 'ostrio:flow-router-extra@3.9.0' );
    _use( 'pwix:blaze-layout@2.3.1' );
    _use( 'pwix:bootbox@1.5.0' );
    _use( 'pwix:cookie-manager@1.3.0' );
    _use( 'pwix:env-settings@1.5.0' );
    _use( 'pwix:i18n@1.5.2' );
    _use( 'pwix:roles@1.1.3' );
    _use( 'pwix:tolert@1.4.0' );
    _use( 'reactive-var' );
    _use( 'tmeasday:check-npm-versions@1.0.2', 'server' );
    _use( 'tracker', 'client' );
    api.addFiles( 'src/client/components/coreCookiesLink/coreCookiesLink.js', 'client' );
    api.addFiles( 'src/client/components/coreErrorMsg/coreErrorMsg.js', 'client' );
    api.addFiles( 'src/client/components/coreFieldCheckIndicator/coreFieldCheckIndicator.js', 'client' );
    api.addFiles( 'src/client/components/coreFieldTypeIndicator/coreFieldTypeIndicator.js', 'client' );
    api.addFiles( 'src/client/components/coreGDPRLink/coreGDPRLink.js', 'client' );
    api.addFiles( 'src/client/components/coreGTULink/coreGTULink.js', 'client' );
    api.addFiles( 'src/client/components/coreLegalsLink/coreLegalsLink.js', 'client' );
    api.addFiles( 'src/client/components/coreTabbedTemplate/coreTabbedTemplate.js', 'client' );
    api.addFiles( 'src/client/components/coreYesnoSelect/coreYesnoSelect.js', 'client' );
    api.addAssets([
        'src/client/icons/external-link-black.png',
        'src/client/icons/external-link-white.png',
        'src/client/icons/external-pdf-black.png',
        'src/client/icons/external-pdf-white.png',
        'src/client/icons/svgrepo-471618-link-external.svg'
    ],
        'client'
    );
    api.addFiles( 'src/client/stylesheets/core_app.less', 'client', { isImport: true });
}

// NPM dependencies are checked in /src/server/js/check_npms.js
// See also https://guide.meteor.com/writing-atmosphere-packages.html#npm-dependencies
