/*
 * /src/common/classes/messages-ordered-set.class.js
 *
 * A class which implements the IMessagesOrderedSet interface.
 */

import _ from 'lodash';
const assert = require( 'assert' ).strict; // up to nodejs v16.x
import mix from '@vestergaard-company/js-mixin';

import { MessagesSet } from './messages-set.class.js';

import { IMessagesOrderedSet } from '../interfaces/imessages-ordered-set.iface.js';

export class MessagesOrderedSet extends mix( MessagesSet ).with( IMessagesOrderedSet ){

    // static data

    // static methods

    // private data

    // private methods

    // public data

    /**
     * Constructor
     * @returns {MessagesOrderedSet}
     */
    constructor(){
        super( ...arguments );
        return this;
    }
}
