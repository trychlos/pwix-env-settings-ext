/*
 * /src/client/classes/display-unit.class.js
 *
 * This class manages a display unit, which may be either a page or a modal.
 * A page display unit has its own route, while a modal doesn't.
 *
 * Only a non-empty name is mandatory. All other fields are free, and up to the application.
 *
 * Known keys are:
 *
 *  - name
 *                      Type: String
 *                      MANDATORY (no default).
 *
 *  - classes
 *                      Type: Array<String>
 *                      The classes to be added.
 *                      Defaulting to[ 't-page' ] as configured.
 *
 *  - inMenus
 *                      Definition type: String or Array of strings
 *                      Returned type: Array of strings
 *                      The menus names in which this page may appear as an item.
 *                      No default.
 *
 *  - menuIcon
 *                      Type: String
 *                      The name of the FontAwesome icon to be used in front of the menu label.
 *                      Defaulting to 'fa-chevron-right' as configured.
 *
 *  - menuLabel
 *                      Type: String
 *                      The I18n translation key for the menu label.
 *                      No default.
 *
 *  - rolesAccess
 *                      Definition type: String or Array of strings
 *                      Returned type: Array of strings
 *                      The role(s) needed to just have access to this page.
 *                      Defaulting to public access if no role is specified.
 *
 *  - rolesEdit
 *                      Definition type: String or Array of strings
 *                      Returned type: Array of strings
 *                      The role(s) needed to edit the page (which actually means everything, and only depends of the application)
 *                      Defaulting to APP_ADMINISTRATOR (as this role may nonetheless do anything)
 *
 *  - route
 *                      the route to the page
 *                      MANDATORY (no default): without this option, the page is inaccessible.
 *
 *  - template
 *                      Type: String
 *                      The template to be loaded
 *                      MANDATORY (no default): without this option, the page is just not rendered.
 *
 *  - templateParms
 *                      Type: Object
 *                      Parameters to be passed to the template, defaulting to none.
 *
 *  - wantEditionSwitch
 *                      Whether we want a 'edit now' toggle switch on the top of the page
 *                      Defaulting to false.
 *
 *  - wantScope
 *                      To be set to true if the display unit is built to only manage a single scope.
 *                      Defaulting to false.
 *
 * Please note that - after a try - we have decided to NOT use SimpleSchema to validate the provided definition.
 * Main reason is that it is difficult (or at least not documented) to use a longhand definition when type is either a string or an array of strings.
 *
 * This class is designed so that the application can directly instanciate it, or may also derive it to build its own derived class.
 */

import _ from 'lodash';

import { check } from 'meteor/check';
import { Roles } from 'meteor/pwix:roles';

import { caBase } from '../../common/classes/base.class';

export class DisplayUnit extends caBase {

    // static data

    // static methods

    // private data
    #name = null;
    #def = null;

    // private methods

    // protected methods
    //  these check methods are underscore_prefixed to mark them private along a common usage in javascript
    //  but we can consider them as only protected, and so useable by derived classes (and so not easily updatable)

    // check that the (optional) value is a boolean
    //  set the default value if provided
    _checkBoolean( o, key, defValue=null ){
        if( Object.keys( o ).includes( key )){
            check( o[key], Boolean );
        } else if( _.isBoolean( defValue )){
            o[key] = defValue;
        }
    }

    // check that the (optional) value is an object
    //  set the default value if provided
    _checkObject( o, key, defValue=null ){
        if( Object.keys( o ).includes( key )){
            check( o[key], Object );
        } else if( defValue ){
            o[key] = defValue;
        }
    }

    // check that the (optional) value is an object or a function
    //  set the default value if provided
    _checkObjectOrFunction( o, key, defValue=null ){
        if( Object.keys( o ).includes( key )){
            if( !Match.test( o[key], Object ) && !Match.test( o[key], Function )){
                throw new Error( key+' is not an object nor a function' );
            }
        } else if( defValue ){
            o[key] = defValue;
        }
    }

    // check that the (optional) value is a string
    //  set the default value if provided
    _checkString( o, key, defValue=null ){
        if( Object.keys( o ).includes( key )){
            check( o[key], String );
        } else if( defValue ){
            o[key] = defValue;
        }
    }

    // check that the (optional) value is a string or an array of string(s)
    // update the provided object to have an array of string(s)
    //  set the default value if provided
    _checkStringOrArray( o, key, defValue=null ){
        if( Object.keys( o ).includes( key )){
            if( !Match.test( o[key], String ) && !Match.test( o[key], [String] )){
                throw new Error( key+' is not a string nor an array of string(s)' );
            }
            if( !_.isArray( o[key] )){
                o[key] = [ o[key] ];
            }
        } else if( defValue ){
            o[key] = defValue;
        }
    }

    // public data

    /**
     * Constructor
     * @locus Client
     * @param {String} name the unit name
     * @param {Object} def the unit definition as a javascript object
     * @returns {DisplayUnit} a DisplayUnit object
     * @throws {Exception} if the provided definition is not valid
     */
    constructor( name, def ){
        super( ...arguments );

        // may throw an error
        check( name, String );

        this._checkStringOrArray( def, 'classes', CoreApp.configure().classes );
        this._checkStringOrArray( def, 'inMenus', [] );
        this._checkString( def, 'menuIcon', CoreApp.configure().menuIcon );
        this._checkString( def, 'menuLabel' );
        this._checkStringOrArray( def, 'rolesAccess', [] );
        this._checkStringOrArray( def, 'rolesEdit', [ CoreApp.configure().adminRole ] );
        this._checkString( def, 'route' );
        this._checkString( def, 'template' );
        this._checkObjectOrFunction( def, 'templateParms' );
        this._checkBoolean( def, 'wantEditionSwitch', false );

        this.#name = name;
        this.#def = { ...def };

        // be verbose if asked for
        if( CoreApp.configure().verbosity & CoreApp.C.Verbose.DISPLAY_UNIT ){
            console.log( 'pwix:core-app defining \''+name+'\' display unit' );
        }

        return this;
    }

    /**
     * @summary Generic getter
     * @param {String} key the name of the desired field
     * @returns {Any} the corresponding value
     */
    get( key ){
        return key === 'name' ? this.name() : this.#def[key];
    }

    /**
     * @returns {String} the page name
     */
    name(){
        return this.#name;
    }

    /**
     * @returns {Boolean} with value=true if the current page is scoped.
     *  A page is said 'scoped':
     *  - if it is qualified with 'wantScope=true' in the pages definition (/imports/client/init/pages.js)
     *  - or if one of the AccessRoles it requires is itself scoped (qualified as such in the roles hierarchy definition)
     *  - or if the roleAssignment of this role for this user is itself scoped
     */
    wantScope(){
        if( this.get( 'wantScope' )){
            return true;
        }
        let wantScope = false;
        this.get( 'rolesAccess' ).every(( role ) => {
            if( Roles.isRoleScoped( role )){
                wantScope = true;
                return !wantScope;
            }
        });
        return wantScope;
    }
}
