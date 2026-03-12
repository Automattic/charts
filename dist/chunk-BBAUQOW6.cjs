"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _chunkASLARV7Lcjs = require('./chunk-ASLARV7L.cjs');




var _chunkWYK7EL5Rcjs = require('./chunk-WYK7EL5R.cjs');




var _chunkMXGLYWVPcjs = require('./chunk-MXGLYWVP.cjs');

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
  region = "world",
  resolution = "countries",
  renderPlaceholder
}) => {
  const {
    getElementStyles,
    theme: {
      geoChart: {
        featureFillColor
      },
      backgroundColor
    }
  } = _chunkWYK7EL5Rcjs.useGlobalChartsContext.call(void 0, );
  const loadingPlaceholder = /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", {
    className: _clsx2.default.call(void 0, "geo-chart", geo_chart_module_default.container, className),
    style: {
      width,
      height
    },
    children: renderPlaceholder ? renderPlaceholder() : _i18n.__.call(void 0, "Loading map", "jetpack-charts")
  });
  const fullColorHex = getElementStyles({
    index: 0
  }).color;
  const lightColorHex = _chunkMXGLYWVPcjs.lightenHexColor.call(void 0, fullColorHex, 0.8);
  const backgroundColorHex = _chunkMXGLYWVPcjs.normalizeColorToHex.call(void 0, backgroundColor, null, _chunkMXGLYWVPcjs.resolveCssVariable) || DEFAULT_BACKGROUND_COLOR;
  const defaultFillColorHex = _chunkMXGLYWVPcjs.normalizeColorToHex.call(void 0, featureFillColor, null, _chunkMXGLYWVPcjs.resolveCssVariable) || DEFAULT_FEATURE_FILL_COLOR;
  const hasHtmlTooltips = _react.useMemo.call(void 0, () => data.length > 0 && data[0].some((col) => typeof col === "object" && col !== null && "role" in col && col.role === "tooltip" && "p" in col && typeof col.p === "object" && col.p !== null && "html" in col.p && col.p.html === true), [data]);
  const options = _react.useMemo.call(void 0, () => ({
    ...region !== "world" && {
      region
    },
    ...resolution !== "countries" && {
      resolution
    },
    colorAxis: {
      colors: [lightColorHex, fullColorHex]
    },
    backgroundColor: backgroundColorHex,
    datalessRegionColor: defaultFillColorHex,
    defaultColor: defaultFillColorHex,
    tooltip: {
      trigger: "focus",
      isHtml: hasHtmlTooltips
    },
    legend: "none",
    keepAspectRatio: true
  }), [region, resolution, lightColorHex, fullColorHex, backgroundColorHex, defaultFillColorHex, hasHtmlTooltips]);
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", {
    className: _clsx2.default.call(void 0, "geo-chart", geo_chart_module_default.container, className),
    style: {
      width,
      height,
      backgroundColor
    },
    children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _reactgooglecharts.Chart, {
      chartType: "GeoChart",
      width,
      height,
      data,
      options,
      loader: loadingPlaceholder
    })
  });
};
var GeoChartWithProvider = (props) => {
  const existingContext = _react.useContext.call(void 0, _chunkWYK7EL5Rcjs.GlobalChartsContext);
  if (existingContext) {
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, GeoChartInternal, {
      ...props
    });
  }
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _chunkWYK7EL5Rcjs.GlobalChartsProvider, {
    children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, GeoChartInternal, {
      ...props
    })
  });
};
GeoChartWithProvider.displayName = "GeoChart";
var GeoChartResponsive = _chunkASLARV7Lcjs.withResponsive.call(void 0, GeoChartWithProvider);




exports.GeoChartWithProvider = GeoChartWithProvider; exports.GeoChartResponsive = GeoChartResponsive;
//# sourceMappingURL=chunk-BBAUQOW6.cjs.map