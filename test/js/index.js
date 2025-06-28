// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by env-settings-ext.js.
import { name as packageName } from "meteor/pwix:env-settings-ext";

// Write your tests here!
// Here is an example.
Tinytest.add( 'env-settings-ext - example', function( test ){
    test.equal( packageName, 'env-settings-ext' );
});
