/*
 * /src/client/classes/display-set.class.js
 *
 * This class manages the individual DisplayUnit's.
 * This is a singleton instanciated once on client-side at application initialization time.
 * 
 * This class is designed so that the application can directly instanciate it, or may also derive it to build its own derived class.
 */

import _ from 'lodash';
const assert = require( 'assert' ).strict;

import { check } from 'meteor/check';

import { Base } from '../../common/classes/base.class';

import { DisplayUnit } from './display-unit.class';

export class DisplaySet extends Base {

    // static data

    static Singleton = null;

    // static methods

    // private data

    #set = {};

    // private methods

    // public data

    /**
     * Constructor
     * @locus Client
     * @param {Object} set the application-provided definition of displayable units
     * @returns {DisplaySet} this set
     * @throws {Exception} if the provided definition is not valid
     */
    constructor( set ){
        super( ...arguments );

        if( DisplaySet.Singleton ){
            console.log( 'trying to instanciates a new instance of an already existing singleton, returning the singleton' );
            return DisplaySet.Singleton;
        }

        DisplaySet.Singleton = this;

        if( set && Match.test( set, Object )){
            Object.keys( set ).every(( k ) => {
                this.#set[k] = new DisplayUnit( k, set[k] );
                return true;
            });
        } else {
            throw new Error( 'display set is undefined' );
        }

        return this;
    }

    /**
     * @summary build a list of the display units which are planned to appear in the specified menu
     * @param {String} menu the name of the menu
     * @param {Function} isAllowed the (async) permission function
     * @returns {Array<DisplayUnit>} the ordered list of the allowed display units
     */
    async buildMenu( menu, isAllowed ){
        check( menu, String );
        check( isAllowed, Function );
        let pages = [];
        let promises = [];
        this.enumerate( async ( name, page ) => {
            if( page.get( 'inMenus' ).includes( menu )){
                const wantPermission = page.get( 'wantPermission' );
                const p = Promise.resolve( !wantPermission || isAllowed( wantPermission ));
                pages.push( page );
                promises.push( p );
            }
            return true;
        });
        let allowed = [];
        return Promise.allSettled( promises ).then(( res ) => {
            assert( res.length === pages.length, 'expect res.length === pages.length' );
            for( let i=0 ; i<pages.length ; ++i ){
                if( res[i].value ){
                    allowed.push( pages[i] );
                }
            }
            return allowed;
        });
    }

    /**
     * @summary Find a unit definition by name
     * @param {String} name
     * @returns {DisplayUnit} the found definition, or null
     */
    byName( name ){
        return this.#set[name] || null;
    }

    /**
     * @summary Enumerate the registered DisplayUnit's definitions as provided by the application
     * @param {Function} cb a callback triggered for each unit definition as `cb( name<String>, def<DisplayUnit>, arg<Any> )`
     *  the `cb()` function must return true to continue the enumeration, false to stop it
     * @param {Any} arg an optional argument to be provided to the cb() callback
     */
    enumerate( cb, arg=null ){
        const self = this;
        if( !cb || !_.isFunction( cb )){
            console.error( 'expected a function, found', cb );
        } else {
            Object.keys( self.#set ).sort().every(( key ) => {
                return cb( key, self.#set[key], arg );
            });
        }
    }
}
