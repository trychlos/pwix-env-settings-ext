Package.describe({
    name: 'pwix:core-app',
    version: '1.1.0-rc',
    summary: 'Meteor RunContext application core class',
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
    _use( 'pwix:i18n@1.5.0' );
    _use( 'reactive-dict' );
    _use( 'reactive-var' );
    _use( 'tmeasday:check-npm-versions@1.0.2 || 2.0.0-beta.0', 'server' );
    _use( 'tracker' );
    //_use( 'tracker', 'client' );
    api.addFiles( 'src/client/components/coreCookiesLink/coreCookiesLink.js', 'client' );
    api.addFiles( 'src/client/components/coreGDPRLink/coreGDPRLink.js', 'client' );
    api.addFiles( 'src/client/components/coreGTULink/coreGTULink.js', 'client' );
    api.addFiles( 'src/client/components/coreLegalsLink/coreLegalsLink.js', 'client' );
    api.addFiles( 'src/client/components/coreYesnoSelect/coreYesnoSelect.js', 'client' );
}

// NPM dependencies are checked in /src/server/js/check_npms.js
// See also https://guide.meteor.com/writing-atmosphere-packages.html#peer-npm-dependencies
