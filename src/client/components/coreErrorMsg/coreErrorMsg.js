/*
 * pwix:core-app/src/client/components/coreErrorMsg/coreErrorMsg.js
 *
 * Display the error message on the bottom of a edition (either modal or page) panel.
 * 
 * Error messages may be rather simple: just display a message on the bottom, color it in red, and disable the OK button. That's all.
 * But, when your dialog is a bit more complex, you have several panels or several tabs, some errors are expected to block the panel
 * validation and the recording of the item, but some others only alter its good behavior, which may be fixed later. So should only
 * be considered as warnings.
 * 
 * There may be several errors, and the user may want just see all of them, in order to decide himself which one will be first fixed.
 * So:
 *  - this component is just responsible to display the most recent error message
 *  - a companion component is able to display all current error/warning/infos messages.
 * 
 * Parms:
 *  - errorsSet: a CoreApp.MessagesSet object
 */

import './coreErrorMsg.html';
import './coreErrorMsg.less';

Template.coreErrorMsg.onRendered( function(){
    this.autorun(() => {
        //console.debug( 'errorsSet', Template.currentData().errorsSet );
    });
});

Template.coreErrorMsg.helpers({
    // the content of the error message as a simple string (not HTML)
    //  because we do not want have several lines, or bold, or any other singularities here
    //  nevertheless the Blaze tempate itself is HTML-capable to be able to handle the '&nbsp;' character
    errorLabel(){
        const o = this.errorsSet?.lastError();
        return o ? o.label() : '&nbsp;';
    },

    // the class to be associated to the error message: may be an error, a warning, an info, etc.
    errorType(){
        const o = this.errorsSet?.lastError();
        return o ? o.type() : '';
    }
});
