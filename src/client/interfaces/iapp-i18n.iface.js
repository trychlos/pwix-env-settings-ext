/*
 * pwix:core-app/src/client/interfaces/iapp-i18n.iface.js
 * 
 * See also https://github.com/justinfagnani/mixwith.js
 */

import _ from 'lodash';
const assert = require( 'assert' ).strict;
import { DeclareMixin } from '@vestergaard-company/js-mixin';

import { EnvSettings } from 'meteor/pwix:env-settings';

export const IAppI18n = DeclareMixin(( superclass ) => class extends superclass {

    constructor(){
        super( ...arguments );
        const self = this;

        return this;
    } 

    /**
     * Getter
     * @returns {Boolean} whether we want display the SAA admin creation
     */
    iAppI18nWantSwitch(){
        return EnvSettings.environmentSettings().wantLanguageSwitch === true;
    }
});
