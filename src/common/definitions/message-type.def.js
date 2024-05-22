/*
 * pwix:core-app/src/common/definitions/message-type.def.js
 */

import _ from 'lodash';
const assert = require( 'assert' ).strict;

export const MessageType = {
    C: {
        ALERT: 'ALERT',
        CRIT: 'CRIT',
        DEBUG: 'DEBUG',
        EMERG: 'EMERG',
        ERR: 'ERR',
        ERROR: 'ERROR',
        INFO: 'INFO',
        LOG: 'LOG',
        NOTICE: 'NOTICE',
        WARNING: 'WARNING'
    }
};
_.merge( MessageType, {
    K: [
        {
            id: MessageType.C.ALERT
        },
        {
            id: MessageType.C.CRIT
        },
        {
            id: MessageType.C.DEBUG
        },
        {
            id: MessageType.C.EMERG
        },
        {
            id: MessageType.C.ERR
        },
        {
            id: MessageType.C.ERROR,  // not described in man 3 syslog, but used here as a synonym for ERR
            synonym: MessageType.C.ERR
        },
        {
            id: MessageType.C.INFO
        },
        {
            id: MessageType.C.LOG,    // not described in man 3 syslog, but used here as a default value and a synonym for INFO
            synonym: MessageType.C.INFO
        },
        {
            id: MessageType.C.NOTICE
        },
        {
            id: MessageType.C.WARNING
        }
    ],
    DefaultType: MessageType.C.LOG,

    /**
     * @param {String} id an identifier
     * @returns {Object} the MessageType definition, or null
     */
    byId( id ){
        let found = null;
        this.Knowns().every(( def ) => {
            if( def.id === id ){
                found = def;
            }
            return found === null;
        });
        return found;
    },

    /**
     * @returns {String} the identifier of the default type
     *  Happens to be LOG, itself a synonym for INFO
     */
    defaultType(){
        return this.DefaultType;
    },

    /**
     * @param {Object} def a MessageType definition as returned by MessageType.Knowns()
     * @returns {String} the identifier
     */
    id( def ){
        return def.id;
    },

    /**
     * @returns {Array} the list of managed MessageType definitions
     */
    Knowns(){
        return this.K;
    },

    /**
     * @param {Object} def a MessageType definition as returned by MessageType.Knowns()
     * @returns {String} the standard level this one is synonym of, or this same one
     */
    synonym( def ){
        return def.synonym || def.id;
    },

    /**
     * @param {String} id the identifier of the type
     * @returns {Array<String>} the list of synonyms for this one
     */
    synonyms( id ){
        let array = {};
        array[id] = true;
        const self = this;
        this.Knowns().every(( def ) => {
            const def_id = self.id( def );
            if( def_id !== id && self.synonym( def ) === id ){
                array[def_id] = true;
            }
            return true;
        });
        return Object.keys( array );
    }
});
