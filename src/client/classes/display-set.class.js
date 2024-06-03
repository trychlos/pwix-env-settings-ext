/*
 * /src/client/classes/display-set.class.js
 *
 * This class manages the individual DisplayUnit's.
 * This is a singleton instanciated once on client-side at application initialization time.
 * 
 * This class is designed so that the application can directly instanciate it, or may also derive it to build its own derived class.
 */

import _ from 'lodash';

import { caBase } from '../../common/classes/base.class';

import { DisplayUnit } from './display-unit.class';

export class DisplaySet extends caBase {

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

    /**
     * @summary Find a unit definition by name
     * @param {String} name
     * @returns {DisplayUnit} the found definition, or null
     */
    get( name ){
        return this.#set[name] || null;
    }
}
