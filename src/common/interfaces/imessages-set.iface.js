/*
 * /imports/common/interfaces/imessages-set.iface.js
 *
 * An interface to manage TypedMessage's.
 * 
 * This interace provides methods as reactive data sources.
 */

import _ from 'lodash';
const assert = require( 'assert' ).strict;
import { DeclareMixin } from '@vestergaard-company/js-mixin';

import { Tracker } from 'meteor/tracker';

import { ITypedMessage } from '../interfaces/ityped-message.iface.js';

export const IMessagesSet = DeclareMixin(( superclass ) => class extends superclass {

    // private data

    // the set of TypedMessage's
    //  a private data, but still used by IMessagesOrderedSet to scan the current set
    _set = [];

    // dependency tracking
    //  a private data, but still used by IMessagesOrderedSet to make this later depend of the former
    _dep = null;

    /**
     * @summary Constructor
     * @returns {IMessagesSet} the instance
     */
    constructor(){
        super( ...arguments );

        this._dep = new Tracker.Dependency();

        return this;
    }

    /**
     * @summary Clears the message stack
     */
    IMessageSetClear(){
        this._set = [];
        this._dep.changed();
    }

    /**
     * @returns {ITypedMessage} the last pushed message
     */
    IMessageSetLast(){
        return this._set.length > 0 ? this._set[this._set.length-1] : null;
    }

    /**
     * @param {ITypedMessage} the message to be pushed
     */
    IMessageSetPush( tm ){
        assert( tm && tm instanceof ITypedMessage, 'IMessageSetPush() tm must be a ITypedMessage' )
        this._set.push( tm );
        this._dep.changed();
    }
});
