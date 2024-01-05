/*
 * /src/client/classes/entity-checker.class.js
 *
 * This client-only class manages the EntityChecker's for an entity.
 * 
 * Rationale:
 *  Entities may be edited, in a single page or in a single panel of a modal, or in several tabs of a tabbed page or a tabbed modal.
 *  In this later case, some events are managed at the entity level, and typically:
 *  - whether the edited entity can be saved or not (or whether the OK button is enabled or not)
 *  - the error messages list
 * 
 * An EntityChecker doesn't manage any form by itself, but manages a global result for a whole entity, and typically an aggreagation of the validity status
 * of several forms.
 */

import _ from 'lodash';
const assert = require( 'assert' ).strict; // up to nodejs v16.x

import { check } from 'meteor/check';
import { ReactiveVar } from 'meteor/reactive-var';

export class EntityChecker {

    // static data

    // static methods

    // private data

    #priv = null;

    // private methods

    // protected methods

    // public data

    /**
     * Constructor
     * 
     * @summary
     *  Instanciates a new EntityChecker instance.
     *  Should be called from Template.onRendered() function once per entity.
     * 
     * @param {Object} o an object with following keys:
     *  - instance: the calling Blaze.TemplateInstance instance
     *  - $ok: if set, the jQuery object which defines the OK button (to enable/disable it)
     *  - okSetFn: if set, a function to be called when OK button must be enabled / disabled
     *  - $err: if set, the jQuery object which defines the error message place
     *  - errSetFn: if set, a function to be called to display an error message
     *  - errClearFn: if set, a function to be called to clear all messages
     *      Because we want re-check all fields on each input event, in the same way each input event re-triggers all error messages
     *      So this function to let the application re-init its error messages stack.
     * 
     * @returns {EntityChecker} a EntityChecker object
     */
    constructor( o ){
        const self = this;

        assert( o && _.isObject( o ), 'expected a plain Object argument' );
        assert( o.instance instanceof Blaze.TemplateInstance, 'instance is not a Blaze.TemplateInstance');
        assert( !o.$ok || o.$ok.length > 0, 'when provided, $ok must be set to a jQuery object' );
        assert( !o.okSetFn || _.isFunction( o.okSetFn ), 'when provided, okSetFn must be a function' );
        assert( !o.$err || o.$err.length > 0, 'when provided, $err must be set to a jQuery object' );
        assert( !o.errSetFn || _.isFunction( o.errSetFn ), 'when provided, errSetFn must be a function' );
        assert( !o.errClearFn || _.isFunction( o.errClearFn ), 'when provided, errClearFn must be a function' );

        // keep the provided params
        this.#priv = {
            // the parameters
            instance: o.instance,
            $ok: o.$ok || null,
            okSetFn: o.okSetFn || null,
            $err: o.$err || null,
            errSetFn: o.errSetFn || null,
            errClearFn: o.errClearFn || null,
            // our internal vars
            errorsSet: new CoreApp.MessagesSet(),
            valid: new ReactiveVar( false )
        };

        // define an autorun which will enable/disable the OK button depending of the entity validity status
        o.instance.autorun(() => {
            const valid = self.#priv.valid.get();
            if( self.#priv.$ok ){
                self.#priv.$ok.prop( 'disabled', !valid );
            }
            if( self.#priv.okSetFn ){
                self.#priv.okSetFn( valid );
            }
        });

        return this;
    }

    /**
     * @summary Clears the error message place, and the error messages stack
     */
    errorClear(){
        this.#priv.errorsSet.clear();
        if( this.#priv.$err ){
            $err.val( '' );
        }
        if( this.#priv.errSetFn ){
            this.#priv.errSetFn( '' );
        }
        if( this.#priv.errClearFn ){
            this.#priv.errClearFn();
        }
    }

    /**
     * @summary Set a message
     * @param {TypedMessage} tm
     */
    errorSet( tm ){
        this.#priv.errorsSet.push( tm );
        if( this.#priv.$err ){
            $err.val( tm.message());
        }
        if( this.#priv.errSetFn ){
            this.#priv.errSetFn( tm.message());
        }
    }

    /**
     * @returns {MessageSet} the error messages set object instance
     */
    getErrorsSet(){
        return this.#priv.errorsSet;
    }
}
