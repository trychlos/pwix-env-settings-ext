/*
 * pwix:core-app/src/client/js/index.js
 */

import '../../common/js/index.js';

// 2023.06: @popperjs/core 2.11.8
// 2023.06: bootstrap 5.3.0
import '@popperjs/core/dist/cjs/popper.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

// provides base classes in CoreApp global object
import { DisplaySet } from '../classes/display-set.class';
import { DisplayUnit } from '../classes/display-unit.class';
import { EntityChecker } from '../classes/entity-checker.class';
import { FormChecker } from '../classes/form-checker.class';
import { RunContext } from '../classes/run-context.class';

CoreApp.DisplaySet = DisplaySet;
CoreApp.DisplayUnit = DisplayUnit;
CoreApp.EntityChecker = EntityChecker;
CoreApp.FormChecker = FormChecker;
CoreApp.RunContext = RunContext;

// our functions
import './DOM.js';
