/*
 * pwix:core-app/src/client/classes/run-context.class.js
 */

import _ from 'lodash';
import mix from '@vestergaard-company/js-mixin';

import { ReactiveVar } from 'meteor/reactive-var';

import { Base } from './base.class.js';

import { IAppSaa } from '../interfaces/iapp-saa.iface.js';

export class RunContext extends mix( Base ).with( IAppSaa ){

    // static data

    // static methods

    // private data

    #dataContext = new ReactiveVar( null );
    #title = new ReactiveVar( null );

    // private methods

    // public data

    /**
     * Constructor
     * @returns {RunContext} this instance
     */
    constructor(){
        super( ...arguments );
        const self = this;

        // initialize the default application title to its name
        this.title( CoreApp.configure().appName );

        //console.debug( this );
        return this;
    }

    /**
     * Getter/Setter
     * @summary
     *  The data context is attached to the current route.
     *  It is initialized by the router (cf. imports/client/init/routes.js), and passed to the `app_main` topmost root template as template data.
     *  We can get it through template helper as soon as we are willing to define a template helper per primary key of the passed object.
     *  So we have chosen to define a single standard 'dataContext' key which is expected to address all the data available to the router and
     *  needed to the pages..
     *  At the moment, only contains the name of the page to be displayed.
     * @param {Object} o the optional data context of the current page
     * @returns {Object} the current data context
     */
    dataContext( o ){
        if( o ){
            check( o, Object );
            this.#dataContext.set( o );
        }
        return this.#dataContext.get();
    }

    /**
     * Getter
     * @returns {Boolean} whether a user is currently logged-in
     */
    isConnected(){
        return Meteor.userId() !== null;
    }

    /**
     * Getter/Setter
     * @summary
     *  The title of the application defaults to its name as the constant `Meteor.APP.name`.
     *  It it overridable on a per-environment basis: the `app_main` topmost root template takes care of getting the environment
     *  from the private configuration assets (from pwix:env-settings package) as soon as they are available, and set this title.
     * @param {String} s an optional title
     * @returns {String} the title of the application to be displayed in the browser title bar
     */
    title( s ){
        if( s ){
            check( s, String );
            this.#title.set( s );
        }
        return this.#title.get();
    }

    /**
     * Getter
     * @returns {Boolean} whether we want display the page footer regarding the current run context
     */
    wantFooter(){
        return true;
    }

    /**
     * Getter
     * @returns {Boolean} whether we want display the page header regarding the current run context
     */
    wantHeader(){
        return true;
    }
}
