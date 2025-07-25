'use strict';

var jsxRuntime = require('react/jsx-runtime');
var xychart = require('@visx/xychart');
var react = require('react');

const DefaultGlyph = (props) => {
    const { theme } = react.useContext(xychart.DataContext) || {};
    return (jsxRuntime.jsx("circle", { cx: props.x, cy: props.y, r: props.size, fill: props.color, stroke: theme?.backgroundColor, strokeWidth: 1.5, paintOrder: "fill", "data-testid": `start-glyph-${props.index}`, ...props.glyphStyle }));
};

exports.DefaultGlyph = DefaultGlyph;
