"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }


var _chunkPNDL3WWMcjs = require('./chunk-PNDL3WWM.cjs');



var _chunkLNLHCZ6Fcjs = require('./chunk-LNLHCZ6F.cjs');



var _chunkJWMWOBAXcjs = require('./chunk-JWMWOBAX.cjs');
require('./chunk-7OZEQ5HE.cjs');



var _chunkUWAZGLHGcjs = require('./chunk-UWAZGLHG.cjs');
require('./chunk-OTZT3MC2.cjs');
require('./chunk-HIWNB5PK.cjs');


var _chunkSRXJLAKGcjs = require('./chunk-SRXJLAKG.cjs');



var _chunkEGGRTD4Vcjs = require('./chunk-EGGRTD4V.cjs');



var _chunk3OONWZ4Zcjs = require('./chunk-3OONWZ4Z.cjs');



var _chunkZPJHWKEKcjs = require('./chunk-ZPJHWKEK.cjs');


var _chunk7HROSZRScjs = require('./chunk-7HROSZRS.cjs');


var _chunk4KEE36W3cjs = require('./chunk-4KEE36W3.cjs');



var _chunkCLSMJQCOcjs = require('./chunk-CLSMJQCO.cjs');


var _chunkMUUSZ7J5cjs = require('./chunk-MUUSZ7J5.cjs');






var _chunkWKN6C4ZEcjs = require('./chunk-WKN6C4ZE.cjs');
require('./chunk-ZVGEDXDP.cjs');
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
    margin: marginProp,
    animation
  }, ref) => {
    const theme = _chunkWKN6C4ZEcjs.useGlobalChartsTheme.call(void 0, );
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
          _chunkLNLHCZ6Fcjs.LineChart,
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
            curveType: "monotone",
            animation
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




























exports.BarChart = _chunk3OONWZ4Zcjs.BarChartResponsive; exports.BarChartUnresponsive = _chunk3OONWZ4Zcjs.BarChart; exports.BarListChart = _chunkEGGRTD4Vcjs.BarListChartResponsive; exports.BarListChartUnresponsive = _chunkEGGRTD4Vcjs.BarListChart; exports.BaseTooltip = _chunk7HROSZRScjs.BaseTooltip; exports.ConversionFunnelChart = _chunk4KEE36W3cjs.ConversionFunnelChartWithProvider; exports.GeoChart = _chunkCLSMJQCOcjs.GeoChartResponsive; exports.GeoChartUnresponsive = _chunkCLSMJQCOcjs.GeoChartWithProvider; exports.GlobalChartsContext = _chunkWKN6C4ZEcjs.GlobalChartsContext; exports.GlobalChartsProvider = _chunkWKN6C4ZEcjs.GlobalChartsProvider; exports.LeaderboardChart = _chunkPNDL3WWMcjs.LeaderboardChartResponsive; exports.LeaderboardChartUnresponsive = _chunkPNDL3WWMcjs.LeaderboardChart; exports.Legend = _chunkZPJHWKEKcjs.Legend; exports.LineChart = _chunkLNLHCZ6Fcjs.LineChartResponsive; exports.LineChartUnresponsive = _chunkLNLHCZ6Fcjs.LineChart; exports.PieChart = _chunkJWMWOBAXcjs.PieChartResponsive; exports.PieChartUnresponsive = _chunkJWMWOBAXcjs.PieChart; exports.PieSemiCircleChart = _chunkUWAZGLHGcjs.PieSemiCircleChartResponsive; exports.PieSemiCircleChartUnresponsive = _chunkUWAZGLHGcjs.PieSemiCircleChart; exports.Sparkline = Sparkline; exports.SparklineUnresponsive = SparklineUnresponsive; exports.ThemeProvider = _chunkWKN6C4ZEcjs.GlobalChartsProvider; exports.TrendIndicator = _chunkSRXJLAKGcjs.TrendIndicator; exports.defaultTheme = _chunkWKN6C4ZEcjs.defaultTheme; exports.useChartLegendItems = _chunkZPJHWKEKcjs.useChartLegendItems; exports.useGlobalChartsContext = _chunkWKN6C4ZEcjs.useGlobalChartsContext; exports.useGlobalChartsTheme = _chunkWKN6C4ZEcjs.useGlobalChartsTheme;
//# sourceMappingURL=index.cjs.map