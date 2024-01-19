/*
 * pwix:core-app/src/common/definitions/type-order.def.js
 *
 * Only define here standard levels as defined in man 3 syslog.
 * Synonyms are managed in MessageType.
 */

import _ from 'lodash';
const assert = require( 'assert' ).strict;

import { MessageType } from '../definitions/message-type.def.js';

export const TypeOrder = {
    K: [
        MessageType.C.EMERG,
        MessageType.C.ALERT,
        MessageType.C.CRIT,
        MessageType.C.ERR,
        MessageType.C.WARNING,
        MessageType.C.NOTICE,
        MessageType.C.INFO,
        MessageType.C.DEBUG
    ],

    /**
     * @returns {Array} the list of ordeed MessageType's
     */
    Knowns(){
        return this.K;
    }
};
