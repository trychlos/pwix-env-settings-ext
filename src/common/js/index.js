/*
 * pwix:core-app/src/common/js/index.js
 */

import { MessagesSet } from '../classes/messages-set.class.js';
import { TypedMessage } from '../classes/typed-message.class.js';

import { FieldCheck } from '../definitions/field-check.def.js';
import { FieldType } from '../definitions/field-type.def.js';
import { YesNo } from '../definitions/yesno.def.js';

import './global.js';
import './constants.js';
//
import './configure.js';
import './env-settings.js';
import './i18n.js';

CoreApp.MessagesSet = MessagesSet;
CoreApp.TypedMessage = TypedMessage;

CoreApp.FieldCheck = FieldCheck;
CoreApp.FieldType = FieldType;
CoreApp.YesNo = YesNo;
