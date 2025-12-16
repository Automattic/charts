"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }


var _chunkVEJIPJN7cjs = require('./chunk-VEJIPJN7.cjs');



var _chunkMJ5XWSHYcjs = require('./chunk-MJ5XWSHY.cjs');
require('./chunk-7OZEQ5HE.cjs');



var _chunkJSGCFUVQcjs = require('./chunk-JSGCFUVQ.cjs');
require('./chunk-OTZT3MC2.cjs');


var _chunkSRXJLAKGcjs = require('./chunk-SRXJLAKG.cjs');



var _chunkGOZNZD3Ncjs = require('./chunk-GOZNZD3N.cjs');



var _chunkN4NZ4VJKcjs = require('./chunk-N4NZ4VJK.cjs');


var _chunk7HROSZRScjs = require('./chunk-7HROSZRS.cjs');


var _chunkUJIP7ICAcjs = require('./chunk-UJIP7ICA.cjs');



var _chunkBMWFTOSRcjs = require('./chunk-BMWFTOSR.cjs');
require('./chunk-HIWNB5PK.cjs');


var _chunkMUUSZ7J5cjs = require('./chunk-MUUSZ7J5.cjs');



var _chunk67BAKCI2cjs = require('./chunk-67BAKCI2.cjs');






var _chunk44EBMDFIcjs = require('./chunk-44EBMDFI.cjs');
require('./chunk-FI5B6KSH.cjs');
require('./chunk-EMMSS5I5.cjs');

// src/charts/sparkline/sparkline.tsx
var _clsx = require('clsx'); var _clsx2 = _interopRequireDefault(_clsx);
var _react = require('react');

// src/charts/sparkline/sparkline.module.scss
var sparkline_module_default = {
  "sparkline": "a8ccharts-o-3Z8B",
  "sparkline--empty": "a8ccharts-CbLbcd"
};

// src/charts/sparkline/sparkline.tsx
var _jsxruntime = require('react/jsx-runtime');
var DEFAULT_WIDTH = 100;
var DEFAULT_HEIGHT = 40;
var transformToSeriesData = (data, color, strokeWidth) => {
  const baseDate = new Date(2e3, 0, 1);
  return [
    {
      label: "sparkline",
      data: data.map((value, index) => ({
        date: new Date(baseDate.getTime() + index * 864e5),
        // Add days
        value
      })),
      options: {
        stroke: color,
        seriesLineStyle: strokeWidth ? { strokeWidth } : void 0
      }
    }
  ];
};
var SparklineComponent = _react.forwardRef.call(void 0, 
  ({
    data,
    width = DEFAULT_WIDTH,
    height = DEFAULT_HEIGHT,
    color,
    strokeWidth: strokeWidthProp,
    withGradientFill = true,
    gradient,
    className,
    chartId,
    margin: marginProp
  }, ref) => {
    const theme = _chunk44EBMDFIcjs.useGlobalChartsTheme.call(void 0, );
    const themeStrokeWidth = _nullishCoalesce(_optionalChain([theme, 'access', _ => _.sparkline, 'optionalAccess', _2 => _2.strokeWidth]), () => ( 1.5));
    const strokeWidth = _nullishCoalesce(strokeWidthProp, () => ( themeStrokeWidth));
    const seriesData = _react.useMemo.call(void 0, () => {
      if (!data || data.length === 0) {
        return [];
      }
      return transformToSeriesData(data, color, strokeWidth);
    }, [data, color, strokeWidth]);
    const finalMargin = _react.useMemo.call(void 0, () => {
      const themeMargin = _nullishCoalesce(_optionalChain([theme, 'access', _3 => _3.sparkline, 'optionalAccess', _4 => _4.margin]), () => ( { top: 2, right: 2, bottom: 2, left: 2 }));
      const margin = _nullishCoalesce(marginProp, () => ( themeMargin));
      return {
        ...themeMargin,
        ...margin
      };
    }, [marginProp, _optionalChain([theme, 'access', _5 => _5.sparkline, 'optionalAccess', _6 => _6.margin])]);
    const seriesWithGradient = _react.useMemo.call(void 0, () => {
      if (!gradient || seriesData.length === 0) {
        return seriesData;
      }
      return seriesData.map((series) => ({
        ...series,
        options: {
          ...series.options,
          gradient: {
            from: gradient.from || color || "#000000",
            to: gradient.to || "#ffffff",
            fromOpacity: _nullishCoalesce(gradient.fromOpacity, () => ( 0.5)),
            toOpacity: _nullishCoalesce(gradient.toOpacity, () => ( 0))
          }
        }
      }));
    }, [seriesData, gradient, color]);
    if (!data || data.length === 0) {
      return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
        "div",
        {
          ref,
          className: _clsx2.default.call(void 0, 
            "sparkline",
            sparkline_module_default.sparkline,
            sparkline_module_default["sparkline--empty"],
            className
          ),
          style: { width, height },
          "data-testid": "sparkline-empty"
        }
      );
    }
    if (data.length === 1) {
      const cx = width / 2;
      const cy = height / 2;
      const resolvedColor = color || "#000000";
      return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
        "div",
        {
          ref,
          className: _clsx2.default.call(void 0, 
            "sparkline",
            sparkline_module_default.sparkline,
            sparkline_module_default["sparkline--single-point"],
            className
          ),
          style: { width, height },
          "data-testid": "sparkline-single-point",
          children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "svg", { width, height, "aria-hidden": "true", children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "circle", { cx, cy, r: strokeWidth * 1.5, fill: resolvedColor }) })
        }
      );
    }
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
      "div",
      {
        ref,
        className: _clsx2.default.call(void 0, "sparkline", sparkline_module_default.sparkline, className),
        "data-testid": "sparkline",
        children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
          _chunkVEJIPJN7cjs.LineChart,
          {
            data: seriesWithGradient,
            width,
            height,
            margin: finalMargin,
            chartId,
            withGradientFill,
            withTooltips: false,
            showLegend: false,
            gridVisibility: "none",
            options: {
              axis: {
                x: { display: false },
                y: { display: false }
              }
            },
            curveType: "monotone"
          }
        )
      }
    );
  }
);
SparklineComponent.displayName = "SparklineComponent";
var SparklineUnresponsive = SparklineComponent;
SparklineUnresponsive.displayName = "SparklineUnresponsive";
var Sparkline = _chunkMUUSZ7J5cjs.withResponsive.call(void 0, SparklineUnresponsive);


























exports.BarChart = _chunkN4NZ4VJKcjs.BarChartResponsive; exports.BarChartUnresponsive = _chunkN4NZ4VJKcjs.BarChart; exports.BarListChart = _chunkGOZNZD3Ncjs.BarListChartResponsive; exports.BarListChartUnresponsive = _chunkGOZNZD3Ncjs.BarListChart; exports.BaseTooltip = _chunk7HROSZRScjs.BaseTooltip; exports.ConversionFunnelChart = _chunkUJIP7ICAcjs.ConversionFunnelChartWithProvider; exports.GlobalChartsContext = _chunk44EBMDFIcjs.GlobalChartsContext; exports.GlobalChartsProvider = _chunk44EBMDFIcjs.GlobalChartsProvider; exports.LeaderboardChart = _chunkBMWFTOSRcjs.LeaderboardChartResponsive; exports.LeaderboardChartUnresponsive = _chunkBMWFTOSRcjs.LeaderboardChart; exports.Legend = _chunk67BAKCI2cjs.Legend; exports.LineChart = _chunkVEJIPJN7cjs.LineChartResponsive; exports.LineChartUnresponsive = _chunkVEJIPJN7cjs.LineChart; exports.PieChart = _chunkMJ5XWSHYcjs.PieChartResponsive; exports.PieChartUnresponsive = _chunkMJ5XWSHYcjs.PieChart; exports.PieSemiCircleChart = _chunkJSGCFUVQcjs.PieSemiCircleChartResponsive; exports.PieSemiCircleChartUnresponsive = _chunkJSGCFUVQcjs.PieSemiCircleChart; exports.Sparkline = Sparkline; exports.SparklineUnresponsive = SparklineUnresponsive; exports.ThemeProvider = _chunk44EBMDFIcjs.GlobalChartsProvider; exports.TrendIndicator = _chunkSRXJLAKGcjs.TrendIndicator; exports.defaultTheme = _chunk44EBMDFIcjs.defaultTheme; exports.useChartLegendItems = _chunk67BAKCI2cjs.useChartLegendItems; exports.useGlobalChartsContext = _chunk44EBMDFIcjs.useGlobalChartsContext; exports.useGlobalChartsTheme = _chunk44EBMDFIcjs.useGlobalChartsTheme;
//# sourceMappingURL=index.cjs.map