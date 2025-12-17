"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }


var _chunkJZAXVB63cjs = require('./chunk-JZAXVB63.cjs');


var _chunkERGEUE7Rcjs = require('./chunk-ERGEUE7R.cjs');



var _chunkZN7KVU4Rcjs = require('./chunk-ZN7KVU4R.cjs');



var _chunkNOLFZYE3cjs = require('./chunk-NOLFZYE3.cjs');



var _chunkURC5RIC4cjs = require('./chunk-URC5RIC4.cjs');
require('./chunk-7OZEQ5HE.cjs');



var _chunkAOMDVOQZcjs = require('./chunk-AOMDVOQZ.cjs');
require('./chunk-OTZT3MC2.cjs');
require('./chunk-HIWNB5PK.cjs');


var _chunkSRXJLAKGcjs = require('./chunk-SRXJLAKG.cjs');



var _chunkKSSPQFW4cjs = require('./chunk-KSSPQFW4.cjs');


var _chunkMUUSZ7J5cjs = require('./chunk-MUUSZ7J5.cjs');



var _chunkNYZFVI2Pcjs = require('./chunk-NYZFVI2P.cjs');






var _chunkW3H42XRVcjs = require('./chunk-W3H42XRV.cjs');




var _chunkDAKYGZG6cjs = require('./chunk-DAKYGZG6.cjs');


var _chunk7HROSZRScjs = require('./chunk-7HROSZRS.cjs');
require('./chunk-EMMSS5I5.cjs');

// src/charts/geo-chart/geo-chart.tsx
var _i18n = require('@wordpress/i18n');
var _clsx = require('clsx'); var _clsx2 = _interopRequireDefault(_clsx);
var _react = require('react');
var _reactgooglecharts = require('react-google-charts');

// src/charts/geo-chart/geo-chart.module.scss
var geo_chart_module_default = {
  "container": "a8ccharts-JvcqOz"
};

// src/charts/geo-chart/geo-chart.tsx
var _jsxruntime = require('react/jsx-runtime');
var DEFAULT_FEATURE_FILL_COLOR = "#ffffff";
var DEFAULT_BACKGROUND_COLOR = "#ffffff";
var GeoChartInternal = ({
  className,
  data,
  width,
  height,
  renderPlaceholder
}) => {
  const {
    getElementStyles,
    theme: {
      geoChart: { featureFillColor },
      backgroundColor
    }
  } = _chunkW3H42XRVcjs.useGlobalChartsContext.call(void 0, );
  const loadingPlaceholder = /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
    "div",
    {
      className: _clsx2.default.call(void 0, "geo-chart", geo_chart_module_default.container, className),
      "data-testid": "geo-chart-loading",
      style: { width, height },
      children: renderPlaceholder ? renderPlaceholder() : _i18n.__.call(void 0, "Loading map", "jetpack-charts")
    }
  );
  const fullColorHex = getElementStyles({ index: 0 }).color;
  const lightColorHex = _chunkDAKYGZG6cjs.lightenHexColor.call(void 0, fullColorHex, 0.8);
  const backgroundColorHex = _chunkDAKYGZG6cjs.normalizeColorToHex.call(void 0, backgroundColor, null, _chunkDAKYGZG6cjs.resolveCssVariable) || DEFAULT_BACKGROUND_COLOR;
  const defaultFillColorHex = _chunkDAKYGZG6cjs.normalizeColorToHex.call(void 0, featureFillColor, null, _chunkDAKYGZG6cjs.resolveCssVariable) || DEFAULT_FEATURE_FILL_COLOR;
  const chartData = [["Country", "Value"], ...Object.entries(data)];
  const options = {
    colorAxis: { colors: [lightColorHex, fullColorHex] },
    backgroundColor: backgroundColorHex,
    datalessRegionColor: defaultFillColorHex,
    defaultColor: defaultFillColorHex,
    tooltip: { trigger: "focus" },
    legend: "none",
    keepAspectRatio: true
  };
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
    "div",
    {
      className: _clsx2.default.call(void 0, "geo-chart", geo_chart_module_default.container, className),
      "data-testid": "geo-chart",
      style: { width, height, backgroundColor },
      children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
        _reactgooglecharts.Chart,
        {
          chartType: "GeoChart",
          width,
          height,
          data: chartData,
          options,
          loader: loadingPlaceholder
        }
      )
    }
  );
};
var GeoChartWithProvider = (props) => {
  const existingContext = _react.useContext.call(void 0, _chunkW3H42XRVcjs.GlobalChartsContext);
  if (existingContext) {
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, GeoChartInternal, { ...props });
  }
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _chunkW3H42XRVcjs.GlobalChartsProvider, { children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, GeoChartInternal, { ...props }) });
};
GeoChartWithProvider.displayName = "GeoChart";
var GeoChartResponsive = _chunkMUUSZ7J5cjs.withResponsive.call(void 0, GeoChartWithProvider);

// src/charts/sparkline/sparkline.tsx



// src/charts/sparkline/sparkline.module.scss
var sparkline_module_default = {
  "sparkline": "a8ccharts-o-3Z8B",
  "sparkline--empty": "a8ccharts-CbLbcd"
};

// src/charts/sparkline/sparkline.tsx

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
    const theme = _chunkW3H42XRVcjs.useGlobalChartsTheme.call(void 0, );
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
          _chunkNOLFZYE3cjs.LineChart,
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




























exports.BarChart = _chunkKSSPQFW4cjs.BarChartResponsive; exports.BarChartUnresponsive = _chunkKSSPQFW4cjs.BarChart; exports.BarListChart = _chunkJZAXVB63cjs.BarListChartResponsive; exports.BarListChartUnresponsive = _chunkJZAXVB63cjs.BarListChart; exports.BaseTooltip = _chunk7HROSZRScjs.BaseTooltip; exports.ConversionFunnelChart = _chunkERGEUE7Rcjs.ConversionFunnelChartWithProvider; exports.GeoChart = GeoChartResponsive; exports.GeoChartUnresponsive = GeoChartWithProvider; exports.GlobalChartsContext = _chunkW3H42XRVcjs.GlobalChartsContext; exports.GlobalChartsProvider = _chunkW3H42XRVcjs.GlobalChartsProvider; exports.LeaderboardChart = _chunkZN7KVU4Rcjs.LeaderboardChartResponsive; exports.LeaderboardChartUnresponsive = _chunkZN7KVU4Rcjs.LeaderboardChart; exports.Legend = _chunkNYZFVI2Pcjs.Legend; exports.LineChart = _chunkNOLFZYE3cjs.LineChartResponsive; exports.LineChartUnresponsive = _chunkNOLFZYE3cjs.LineChart; exports.PieChart = _chunkURC5RIC4cjs.PieChartResponsive; exports.PieChartUnresponsive = _chunkURC5RIC4cjs.PieChart; exports.PieSemiCircleChart = _chunkAOMDVOQZcjs.PieSemiCircleChartResponsive; exports.PieSemiCircleChartUnresponsive = _chunkAOMDVOQZcjs.PieSemiCircleChart; exports.Sparkline = Sparkline; exports.SparklineUnresponsive = SparklineUnresponsive; exports.ThemeProvider = _chunkW3H42XRVcjs.GlobalChartsProvider; exports.TrendIndicator = _chunkSRXJLAKGcjs.TrendIndicator; exports.defaultTheme = _chunkW3H42XRVcjs.defaultTheme; exports.useChartLegendItems = _chunkNYZFVI2Pcjs.useChartLegendItems; exports.useGlobalChartsContext = _chunkW3H42XRVcjs.useGlobalChartsContext; exports.useGlobalChartsTheme = _chunkW3H42XRVcjs.useGlobalChartsTheme;
//# sourceMappingURL=index.cjs.map