/*
 * /src/common/classes/messages-set.class.js
 *
 * A class which implements the IMessagesSet interface.
 */

import _ from 'lodash';
const assert = require( 'assert' ).strict; // up to nodejs v16.x
import mix from '@vestergaard-company/js-mixin';

import { caBase } from './base.class.js';

import { IMessagesSet } from '../interfaces/imessages-set.iface.js';

export class MessagesSet extends mix( caBase ).with( IMessagesSet ){

    // static data

    // static methods

    // private data

    // private methods

    // public data

    /**
     * Constructor
     * @returns {MessagesSet}
     */
    constructor(){
        super( ...arguments );
        return this;
    }
}
