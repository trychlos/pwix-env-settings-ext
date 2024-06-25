/*
 * pwix:core-app/src/client/js/index.js
 */

import '../../common/js/index.js';

// provides base classes in CoreApp global object
import { DisplaySet } from '../classes/display-set.class';
import { DisplayUnit } from '../classes/display-unit.class';
import { RunContext } from '../classes/run-context.class';

CoreApp.DisplaySet = DisplaySet;
CoreApp.DisplayUnit = DisplayUnit;
CoreApp.RunContext = RunContext;

// our functions
import './DOM.js';
