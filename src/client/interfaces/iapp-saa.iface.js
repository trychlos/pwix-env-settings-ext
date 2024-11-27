/*
 * pwix:core-app/src/client/interfaces/iapp-saa.iface.js
 * 
 * See also https://github.com/justinfagnani/mixwith.js
 */

import _ from 'lodash';
const assert = require( 'assert' ).strict;
import { DeclareMixin } from '@vestergaard-company/js-mixin';

import { ReactiveVar } from 'meteor/reactive-var';

export const IAppSaa = DeclareMixin(( superclass ) => class extends superclass {

    // manage app admin at startup (SAA)
    #saaHavePackage = new ReactiveVar( false );
    #saaIsPackageReady = new ReactiveVar( false );
    #saaWantDisplay = new ReactiveVar( false );

    constructor(){
        super( ...arguments );
        const self = this;

        // whether we have the SAA package ?
        Tracker.autorun(() => {
            self.#saaHavePackage.set( Package['pwix:startup-app-admin'] !== undefined );
        });

        // if we have the SAA package, is it ready ?
        Tracker.autorun(() => {
            self.#saaIsPackageReady.set( self.#saaHavePackage.get() && Package['pwix:startup-app-admin'].SAA.ready());
        });

        // if we have the SAA package and it is ready, do we want display it ?
        Tracker.autorun(() => {
            self.#saaWantDisplay.set( self.#saaIsPackageReady.get() && Package['pwix:startup-app-admin'].SAA.countAdmins.get() === 0 );
        });

        return this;
    } 

    /**
     * Getter
     * @returns {Boolean} whether we want display the SAA admin creation
     */
    iAppSaaWantDisplay(){
        return this.#saaWantDisplay.get();
    }
});
