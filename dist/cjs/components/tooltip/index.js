'use strict';

var baseTooltip = require('./base-tooltip.js');
var accessibleTooltip = require('./accessible-tooltip.js');



exports.BaseTooltip = baseTooltip.BaseTooltip;
exports.AccessibleTooltip = accessibleTooltip.AccessibleTooltip;
exports.useKeyboardNavigation = accessibleTooltip.useKeyboardNavigation;
