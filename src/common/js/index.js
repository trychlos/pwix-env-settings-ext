/*
 * pwix:core-app/src/common/js/index.js
 */

import { MessagesOrderedSet } from '../classes/messages-ordered-set.class.js';
import { MessagesSet } from '../classes/messages-set.class.js';
import { TypedMessage } from '../classes/typed-message.class.js';

import { FieldCheck } from '../definitions/field-check.def.js';
import { FieldType } from '../definitions/field-type.def.js';
import { MessageType } from '../definitions/message-type.def.js';
import { TypeOrder } from '../definitions/type-order.def.js';
import { YesNo } from '../definitions/yesno.def.js';

import { IMessagesOrderedSet } from '../interfaces/imessages-ordered-set.iface.js';
import { IMessagesSet } from '../interfaces/imessages-set.iface.js';
import { ITypedMessage } from '../interfaces/ityped-message.iface.js';

import './global.js';
import './constants.js';
//
import './configure.js';
import './env-settings.js';
import './i18n.js';

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
