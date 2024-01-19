/*
 * /src/common/classes/typed-message.class.js
 *
 * A class which implements the ITypedMessage interface.
 */

import _ from 'lodash';
const assert = require( 'assert' ).strict; // up to nodejs v16.x
import mix from '@vestergaard-company/js-mixin';

import { caBase } from './base.class.js';

import { ITypedMessage } from '../interfaces/ityped-message.iface.js';

export class TypedMessage  extends  mix( caBase ).with( ITypedMessage ){

    // static data

    // static methods

    // private data

    // private methods

    // public data

    /**
     * Constructor
     * @returns {TypedMessage}
     */
    constructor(){
        super( ...arguments );
        return this;
    }
}
