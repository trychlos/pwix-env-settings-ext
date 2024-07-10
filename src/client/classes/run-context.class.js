/*
 * /src/client/classes/run-context.class.js
 */

import _ from 'lodash';

import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { ReactiveVar } from 'meteor/reactive-var';
import { Roles } from 'meteor/pwix:roles';
import { Tracker } from 'meteor/tracker';

import { Base } from '../../common/classes/base.class';

import { DisplayUnit } from './display-unit.class';

export class RunContext extends Base {

    // static data

    // static methods

    // private data

    #editionAsked = new ReactiveVar( false );
    #dataContext = new ReactiveVar( null );
    #page = new ReactiveVar( null );
    #roles = new ReactiveVar( null );
    #title = new ReactiveVar( null );
    #user = new ReactiveVar( null );

    // private methods

    // public data

    /**
     * Constructor
     * @returns {RunContext} this instance
     */
    constructor( o ){
        super( ...arguments );
        const self = this;

        // initialize the default application title to its name
        this.title( CoreApp.configure().appName );

        // an autorun tracker which dynamically tracks the currently connected user
        Tracker.autorun(() => {
            const id = Meteor.userId();
            if( id !== self.#user.get()){
                _verbose( CoreApp.C.Verbose.PAGE, 'pwix:core-app setting \''+id+'\' as current user' );
                self.#user.set( id );
            }
        });

        // an autorun tracker which dynamically tracks the roles attributed to the current user
        Tracker.autorun(() => {
            if( Roles.ready()){
                const roles = Roles.current();
                if( !_.isEqual( roles, self.#roles.get())){
                    _verbose( CoreApp.C.Verbose.PAGE, 'pwix:core-app setting current roles', roles );
                    self.#roles.set( roles );
                }
            }
        });

        // an autorun tracker which redirect to home page if user is not habilited to this one
        Tracker.autorun(() => {
            if( self.#page.get() && !self.accessAllowed()){
                console.log( 'Page', self.#page.get() || '(null)', 'not allowed, redirecting to \'/\'' );
                FlowRouter.redirect( '/' );
            }
        });

        // an autorun tracker reset the editionAsked reactive var each time the user logs out
        Tracker.autorun(() => {
            if( !Meteor.userId()){
                self.editionAsked( false );
            }
        });

        //console.debug( this );
        return this;
    }

    /**
     * @returns {Boolean} whether the access is allowed to the user for the page
     *  Reactive method
     */
    accessAllowed(){
        const page = this.#page.get();
        if( page ){
            check( page, DisplayUnit );
            const rolesAccess = page.get( 'rolesAccess' );
            if( !rolesAccess.length ){
                return true;
            }
            if( Roles.ready()){
                return Roles.userIsInRoles( this.#user.get(), rolesAccess, { anyScope: true });
            }
        }
        return false;
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
     * @returns {Boolean} whether edition is allowed to the user for the page
     *  Reactive method
     */
    editAllowed(){
        const user = this.#user.get();
        const page = this.#page.get();
        if( Roles.ready() && user && page ){
            check( page, DisplayUnit );
            return Roles.userIsInRoles( user, page.get( 'rolesEdit' ), { anyScope: true });
        }
        return false;
    }

    /**
     * Getter/Setter
     * @summary
     *  Edition management
     *  The application use db-stored documents and manage there its translations
     *  Documents can be edited online in dev environment
     * @param {Boolean} b the optional 'asked' status, i.e. whether the used has asked for editing the current page
     * @returns {Boolean} the current asked edition status
     */
    editionAsked( b ){
        if( b === true || b === false ){
            check( b, Boolean );
            //console.debug( 'editionAsked', b );
            this.#editionAsked.set( b );
        }
        return this.#editionAsked.get();
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
     *  A reactive tracker of the currently displayed page as a DisplayUnit is installed in the derived class constructor.s
     *  This has to be run from the application as only the application knows what is exactly in the page data context.
     *  Note: the currently displayed page may not be the currently displayed DisplayUnit if this later, for example, is a modal on top of the page.
     * @param {DisplayUnit} du
     * @returns {DisplayUnit} the current DisplayUnit page
     */
    page( du ){
        if( du ){
            check( du, DisplayUnit );
            this.#page.set( du );
        }
        return this.#page.get();
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
