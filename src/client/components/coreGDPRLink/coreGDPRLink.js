/*
 * /src/client/components/coreGDPRLink/coreGDPRLink.js
 */

import { pwixI18n } from 'meteor/pwix:i18n';

import './coreGDPRLink.html';

Template.coreGDPRLink.helpers({
    // the label
    label(){
        return this.label || pwixI18n.label( I18N, 'gdprlink.label' );
    },

    // the route
    route(){
        return this.route || ( CoreApp.configure().routePrefix || '' )+'/gdpr';
    },

    // the title
    title(){
        return this.title || pwixI18n.label( I18N, 'gdprlink.title' );
    }
});
