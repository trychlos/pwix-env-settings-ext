/*
 * /src/client/components/coreLegalsLink/coreLegalsLink.js
 */

import { pwixI18n } from 'meteor/pwix:i18n';

import './coreLegalsLink.html';

Template.coreLegalsLink.helpers({
    // the label
    label(){
        return this.label || pwixI18n.label( I18N, 'legalslink.label' );
    },

    // the route
    route(){
        return this.route || ( CoreApp.configure().routePrefix || '' )+'/legals';
    },

    // the title
    title(){
        return this.title || pwixI18n.label( I18N, 'legalslink.title' );
    }
});
