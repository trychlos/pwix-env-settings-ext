/*
 * pwix:core-app/src/client/js/index.js
 */

import '../../common/js/index.js';

import { RunContext } from '../classes/run-context.class';

// provides base classes in CoreApp global object
CoreApp.RunContext = RunContext;

// our functions
import './DOM.js';
