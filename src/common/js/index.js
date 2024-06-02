/*
 * pwix:core-app/src/common/js/index.js
 */

import { caBase } from '../classes/base.class';
import { MessagesOrderedSet } from '../classes/messages-ordered-set.class';
import { MessagesSet } from '../classes/messages-set.class';
import { TypedMessage } from '../classes/typed-message.class';

import { FieldCheck } from '../definitions/field-check.def';
import { FieldType } from '../definitions/field-type.def';
import { MessageType } from '../definitions/message-type.def';
import { TypeOrder } from '../definitions/type-order.def';
import { YesNo } from '../definitions/yesno.def';

import { IMessagesOrderedSet } from '../interfaces/imessages-ordered-set.iface';
import { IMessagesSet } from '../interfaces/imessages-set.iface';
import { ITypedMessage } from '../interfaces/ityped-message.iface';

import './global.js';
import './constants.js';
//
import './configure.js';
import './date.js';
import './env-settings.js';
import './i18n.js';

CoreApp.Base = caBase;
CoreApp.MessagesOrderedSet = MessagesOrderedSet;
CoreApp.MessagesSet = MessagesSet;
CoreApp.TypedMessage = TypedMessage;

CoreApp.FieldCheck = FieldCheck;
CoreApp.FieldType = FieldType;
CoreApp.MessageType = MessageType;
CoreApp.TypeOrder = TypeOrder;
CoreApp.YesNo = YesNo;

CoreApp.IMessagesOrderedSet = IMessagesOrderedSet;
CoreApp.IMessagesSet = IMessagesSet;
CoreApp.ITypedMessage = ITypedMessage;
