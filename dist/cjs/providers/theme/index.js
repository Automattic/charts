'use strict';

var themeProvider = require('./theme-provider.js');
var themes = require('./themes.js');



exports.ThemeProvider = themeProvider.ThemeProvider;
exports.useChartTheme = themeProvider.useChartTheme;
exports.useXYChartTheme = themeProvider.useXYChartTheme;
exports.defaultTheme = themes.defaultTheme;
exports.jetpackTheme = themes.jetpackTheme;
exports.wooTheme = themes.wooTheme;
