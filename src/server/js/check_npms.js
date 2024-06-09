/*
 * pwix:core-app/src/server/js/check_npms.js
 */

import { checkNpmVersions } from 'meteor/tmeasday:check-npm-versions';

if( false ){
    // whitelist packages which are included via a subfolder or badly recognized
    require( 'ellipsize/package.json' );
}

checkNpmVersions({
    'ellipsize': '^0.5.1',
    'lodash': '^4.17.0',
    'strftime': '^0.10.2',
    '@vestergaard-company/js-mixin': '^1.0.3'
},
    'pwix:core-app'
);
