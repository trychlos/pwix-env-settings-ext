/*
 * /imports/common/interfaces/ityped-message.iface.js
 *
 * The ITypedMessage interface provides methods to have a typed message, suitable for example for logs and error messages in a UI.
 * 
 * Partially based on:
 * - https://datatracker.ietf.org/doc/html/rfc5424 Syslog protocol
 * - man 3 syslog
 */

import _ from 'lodash';
const assert = require( 'assert' ).strict;
import { DeclareMixin } from '@vestergaard-company/js-mixin';

import { MessageType } from '../definitions/message-type.def.js';

export const ITypedMessage = DeclareMixin(( superclass ) => class extends superclass {

    // private data

    #emitter = null;
    #type = null;
    #message = null;

    /**
     * @summary Constructor
     * @param {Object|String} o an object with following keys:
     *  - emitter {String} the emitter, defaulting to null
     *  - type {String} a key from MessageType.C, defaulting to MessageType.C.LOG
     *  - message {String} the message itself (mandatory)
     * @returns {ITypedMessage}
     */
    constructor(){
        super( ...arguments );

        if( o.type && !Object.keys( MessageType.C ).includes( o.type )){
            throw new SyntaxError( 'ITypedMessage() unknown type: '+o.type );
        }
        if( !_.isString( o ) && !o.message ){
            throw new SyntaxError( 'ITypedMessage() message is mandatory, not found' );
        }
        this.#emitter = o.emitter || null;
        this.#type = o.type || TypedMessage.C.LOG;
        this.#message = _.isString( o ) ? o : o.message;

        return this;
    }

    /**
     * @returns {String} the emitter
     */
    ITypedMessageEmitter(){
        return this.#emitter;
    }

    /**
     * @returns {String} the message
     */
    ITypedMessageMessage(){
        return this.#message;
    }

    /**
     * @returns {String} the type
     */
    ITypedMessageType(){
        return this.#type;
    }
});
