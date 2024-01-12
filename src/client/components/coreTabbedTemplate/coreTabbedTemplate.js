/*
 * pwix:core-app/src/client/components/coreTabbedTemplate/coreTabbedTemplate.js
 *
 * Parms:
 *  - tabs, an array of the tabs, or a function which returns such an array, each item being an object
 *      > navLabel: if set, the HTML nav label, or a function which returns such a string
 *      > navAttributes: if set, an object, or a function which returns such an object, which define attributes to be added to the nav-link element
 *          where each attribute is expected to be defined as { name: value }
 *      > navTemplate: if set, a template to be attached as the nav content (besides of the label if one is specified)
 *      > navData: if set, the data to be attached to the navTemplate, or a function which returns such a thing
 *      > paneTemplate: if set, the pane template name, or a function which returns such a name
 *      > paneData: if set, the data to be passed to the paneTemplate, or a function which returns such a thing
 *      > tabName: if set, the name of the tab, or a function which returns such a name
 *  - name: if set, the name used to read/write active tab into/from local storage, or a function which returns such a name
 *  - navPosition: may be 'bottom', 'top', 'left' or 'right'
 *      defaulting to 'top'
 *  - navClasses: classes to be added to each .nav element
 *  - paneSubTemplate: if set, the name of a template to add below the panes
 *  - paneSubData: if set, the data context to be passed to this sub-template, defaulting to panes data context
 * 
 * Data context:
 * 'coreTabbedTemplate' component increases the data context passed to navTemplate's and paneTemplate's with datas:
 * - tabbedId: the identifier of the 'coreTabbedTemplate' component
 * - tabbedTabId: the identifier of each tab, same whether we display a nav-link or a tab-pane
 * 
 * Handled events:
 *  - tabbed-activate, data={ tabbed, index } ask to activate the tab by its index
 *  - tabbed-activate, data={ tabbed, label } ask to activate the tab by its current nav label
 *  - tabbed-activate, data={ tabbed, name } ask to activate the tab by its name
 *  - tabbed-activate, data={ tabbed, attribute } ask to activate the tab by the specified nav attribute
 *  where 'tabbed' is expected to be the internal identifier of this tabbed template
 * 
 * Triggered events:
 *  - tabbed-changed, data={ tabbed:<tabbed_id> }
 *  - tabbed-activated, data={ tabbed:<tabbed_id>, name:<tabbed_name>, tab:<tab_object> }
 * 
 * Identifiers management:
 * We dynamically allocate random identifiers for:
 *  - the coreTabbedTemplate component, advertized as 'data-tabbed-id' in the DOM, and as 'tabbedId' in children data contexts
 *  - each tab, advertized as 'data-tabbed-tab-id' in the DOM, and as 'tabbedTabId' in children data contexts
 */

import _ from 'lodash';

import { Random } from 'meteor/random';
import { ReactiveVar } from 'meteor/reactive-var';

import './coreTabbedTemplate.html';
import './coreTabbedTemplate.less';

Template.coreTabbedTemplate.onCreated( function(){
    const self = this;

    self.APP = {
        myId: 'tabbed-'+Random.id(),
        tabs: new ReactiveVar( [], _.isEqual ),
        navPosition: new ReactiveVar( null ),
        activeTab: new ReactiveVar( 0 ),

        // activate a tab by a nav attribute specified as { name: value }
        activateByAttribute( attribute ){
            const key = Object.keys( attribute )[0];
            const value = attribute[key];
            const index = self.$( '.ca-tabbed-nav[data-tabbed-id="'+self.APP.myId+'"] .nav-link['+key+'="'+value+'"]' ).data( 'tabbed-index' );
            self.APP.activateByIndex( index );
        },

        // activate a tab by its index
        activateByIndex( index ){
            self.$( '.ca-tabbed-nav[data-tabbed-id="'+self.APP.myId+'"] .nav-link[data-tabbed-index="'+index+'"]' ).trigger( 'click' );
        },

        // activate a tab by its current nav label
        activateByLabel( label ){
            const index = self.$( '.ca-tabbed-nav[data-tabbed-id="'+self.APP.myId+'"] .nav-link :contains("'+label+'")' ).data( 'tabbed-index' );
            self.APP.activateByIndex( index );
        },

        // activate a tab by its name
        activateByName( name ){
            let found = null;
            self.APP.tabs().every(( tab ) => {
                if( tab.name === name ){
                    found = tab;
                }
                return found === null;
            });
            if( found ){
                self.APP.activateByIndex( found.TABBED.index );
            }
        },

        // dump the tabs array, returning this same tabs array to allow chaining
        dump( orig, tabs ){
            if( 0 ){
                tabs.every(( t ) => {
                    console.debug( orig, t.TABBED );
                    return true;
                });
            }
            return tabs;
        },

        // returns the list of tabs
        //  we only regenerate an identifier if the tab was not already present
        getTabs( dataContext ){
            const o = ( dataContext || Template.currentData()).tabs;
            const tabs = _.isFunction( o ) ? o() : o;
            // index and identify each tab
            for( let i=0 ; i<tabs.length ; ++i ){
                if( !tabs[i].TABBED ){
                    const id = Random.id();
                    tabs[i].TABBED = {
                        id: id,
                        tabid: 'tabbed-t-'+id,
                        paneid: 'tabbed-p-'+id
                    };
                }
                tabs[i].TABBED.index = i;
            }
            return( tabs );
        },

        // whether tabs are vertical ?
        isVertical(){
            const pos = self.APP.navPosition.get();
            return pos === 'top' || pos === 'bottom';
        },

        // returns the tab label
        navLabel( tab ){
            return _.toString( _.isFunction( tab.navLabel ) ? tab.navLabel() : tab.navLabel );
        },

        // returns the tab name
        tabName( tab ){
            return _.toString( _.isFunction( tab.tabName ) ? tab.name() : tab.tabName );
        },

        // returns the pane template
        paneTemplate( tab ){
            return _.toString( _.isFunction( tab.paneTemplate ) ? tab.paneTemplate() : tab.paneTemplate );
        },

        // returns the name associated with this tabbed template
        tabbedName(){
            const a = Template.currentData().name;
            return _.toString( _.isFunction( a ) ? a() : a );
        }
    };

    // compute the nav position
    self.autorun(() => {
        self.APP.navPosition.set( Template.currentData().navPosition || 'top' );
    });

    // track last active tab from session storage
    self.autorun(() => {
        const name = self.APP.tabbedName();
        if( name ){
            self.APP.activeTab.set( parseInt( sessionStorage.getItem( name+':activeTab' )) || 0 );
        }
    });

    // make sure session storage is updated each time the active tab changes
    self.autorun(() => {
        const activeTab = self.APP.activeTab.get();
        const name = self.APP.tabbedName();
        if( _.isString( name ) && _.isFinite( activeTab )){
            sessionStorage.setItem( name+':activeTab', activeTab );
        }
    });

    // reactively build the tabs
    self.autorun(() => {
        self.APP.tabs.set( self.APP.dump( 'build', self.APP.getTabs()));
    });
});

Template.coreTabbedTemplate.onRendered( function(){
    const self = this;

    // set the attributes on nav-link's if asked for
    self.autorun(() => {
        self.APP.tabs.get().every(( tab ) => {
            if( tab.navAttributes ){
                const o = tab.navAttributes;
                const oo = _.isFunction( o ) ? o() : o;
                if( oo ){
                    Object.keys( oo ).every(( key ) => {
                        self.$( '.ca-tabbed-template .nav-link#'+tab.TABBED.tabid ).attr( key, oo[key] );
                        return true;
                    });
                }
            }
            return true;
        });
    });

    // activate the designated tab
    //  this also triggers the first 'shown.bs.tab' event which is good
    self.APP.activateByIndex( self.APP.activeTab.get());

    // track the tabs changes and trigger an event
    self.autorun(() => {
        if( self.APP.tabs.get()){
            self.$( '.ca-tabbed-template' ).trigger( 'tabbed-changed', { tabbed: self.APP.myId });
        }
    });
});

Template.coreTabbedTemplate.helpers({
    // make the div height 100% when position is horizontal
    classes(){
        return Template.instance().APP.isVertical() ? '' : 'ca-h100';
    },
    // whether we have a sub-pane ?
    haveSubPane(){
        return this.paneSubTemplate?.length > 0;
    },
    // an identifier of this tabbed template
    myId(){
        return Template.instance().APP.myId;
    },
    // provide dynamic data context
    parmsSubData(){
        //return this.paneSubData || this;
        let o = null;
        if( this.paneSubData ){
            o = _.isFunction( this.paneSubData ) ? this.paneSubData() : this.paneSubData;
        } else {
            o = this;
        }
        return o;
    },
    // have a dynamic template
    parmsSubPane(){
        return this.paneSubTemplate;
    },
    // provides the tabs list
    parmsSubs(){
        return {
            APP: Template.instance().APP,
            dataContext: this
        };
    },
    posLeft(){
        return Template.instance().APP.navPosition.get() === 'left';
    },
    posTop(){
        return Template.instance().APP.navPosition.get() === 'top';
    },
    posVertical(){
        return Template.instance().APP.isVertical();
    }
});

Template.coreTabbedTemplate_nav.helpers({
    // whether this tab defaults to be visible at loading time ?
    ariaSelected( it ){
        return it.TABBED.index === this.APP.activeTab.get() ? 'true' : 'false';
    },
    // additional classes for the .nav element
    classes(){
        let str = 'nav-'+this.APP.navPosition.get();
        if( this.dataContext.navClasses ){
            str += ' '+this.dataContext.navClasses;
        }
        return str;
    },
    // whether we have something to display in this nav tab ?
    hasLabel( it ){
        return this.APP.navLabel( it ).length > 0;
    },
    // whether we have something to display in this nav tab ?
    hasTemplate( it ){
        return it.navTemplate;
    },
    // an identifier of this tabbed template
    myId(){
        return this.APP.myId;
    },
    // provides the data (if any) associated with the template for this tab
    navData( it ){
        const o = _.isFunction( it.navData ) ? it.navData() : it.navData;
        return {
            ...o,
            tabbedId: this.APP.myId,
            tabbedTabId: it.TABBED.id
        };
    },
    // provides the label (if an) associated with this tab
    navLabel( it ){
        return this.APP.navLabel( it ) || '';
    },
    // provides the template (if any) associated with this tab
    navTemplate( it ){
        return _.isFunction( it.navTemplate ) ? it.navTemplate() : it.navTemplate;
    },
    // returns the tabs list
    tabs(){
        return this.APP.tabs.get();
    }
});

Template.coreTabbedTemplate_pane.helpers({
    // whether we have something to display in this pane ?
    hasTemplate( it ){
        return this.APP.paneTemplate( it ).length > 0;
    },
    // an identifier of this tabbed template
    myId(){
        return this.APP.myId;
    },
    // provides the data associated to this template
    paneData( it ){
        const o = _.isFunction( it.paneData ) ? it.paneData() : it.paneData;
        return {
            ...o,
            tabbedId: this.APP.myId,
            tabbedTabId: it.TABBED.id
        };
    },
    // provides the template associated with this pane
    paneTemplate( it ){
        return this.APP.paneTemplate( it );
    },
    // returns the tabs list
    tabs(){
        return this.APP.tabs.get();
    }
});

Template.coreTabbedTemplate.events({
    // note that several tabbed-template may be imbricated - we must only deal with ours and not with those bubbling from lower tabbed-template's
    //  event.target and event.relatedTarget target the active tab and the previous active tab (if available) respectively
    'shown.bs.tab .ca-tabbed-template'( event, instance ){
        const myid = instance.$( event.target ).closest( '.ca-tabbed-nav' ).data( 'tabbed-id' );
        if( myid === instance.APP.myId ){
            const tabid = instance.$( event.target ).prop( 'id' );
            let found = null;
            instance.APP.tabs.get().every(( tab ) => {
                if( tab.TABBED.tabid === tabid ){
                    found = tab;
                }
                return found === null;
            });
            // a tab is just shown - what to do with that ?
            if( found ){
                // update the active tab for next reload and HMR
                instance.APP.activeTab.set( found.TABBED.index );
                // advertize all direct .tab-pane's children
                instance.$( '.ca-tabbed-template > * > * > * > .tab-pane' ).trigger( 'tabbed-activated', {
                    tabbed: myid,
                    name: instance.APP.tabbedName(),
                    tab: { ...found }
                });
        } else {
                console.warn( 'myId', myid, 'tabid not found', tabid );
            }
        }
    },

    // a request to activate a tab
    'tabbed-activate .ca-tabbed-template'( event, instance, data ){
        if( data.tabbed === instance.APP.myId ){
            if( _.isNumber( data.index )){
                instance.APP.activateByIndex( data.index );
            } else if( data.label ){
                instance.APP.activateByLabel( data.label );
            } else if( data.name ){
                instance.APP.activateByName( data.name );
            } else if( data.attribute ){
                instance.APP.activateByAttribute( data.attribute );
            }
        }
    }
});
