import {
  LineChart,
  LineChartResponsive
} from "./chunk-RHQIACQT.js";
import {
  PieSemiCircleChart,
  PieSemiCircleChartResponsive
} from "./chunk-4RYV2TII.js";
import {
  PieChart,
  PieChartResponsive
} from "./chunk-VTMJWCCW.js";
import "./chunk-NFRB2POF.js";
import "./chunk-A3AEEGKR.js";
import {
  TrendIndicator
} from "./chunk-MMDLXS6O.js";
import {
  BarListChart,
  BarListChartResponsive
} from "./chunk-W4ZYJ74Q.js";
import {
  BarChart,
  BarChartResponsive
} from "./chunk-DY7IVYWP.js";
import {
  BaseTooltip
} from "./chunk-5XI443YP.js";
import {
  ConversionFunnelChartWithProvider
} from "./chunk-2FRTJVQ3.js";
import {
  LeaderboardChart,
  LeaderboardChartResponsive
} from "./chunk-CQPKK55N.js";
import "./chunk-CEZGL6YP.js";
import {
  withResponsive
} from "./chunk-NONODB3K.js";
import {
  Legend,
  useChartLegendItems
} from "./chunk-VER6S543.js";
import {
  GlobalChartsContext,
  GlobalChartsProvider,
  defaultTheme,
  useGlobalChartsContext,
  useGlobalChartsTheme
} from "./chunk-O2BJMTIS.js";
import {
  lightenHexColor,
  normalizeColorToHex,
  resolveCssVariable
} from "./chunk-P3QEXFTA.js";
import "./chunk-G3PMV62Z.js";

// src/charts/geo-chart/geo-chart.tsx
import { __ } from "@wordpress/i18n";
import clsx from "clsx";
import { useContext } from "react";
import { Chart } from "react-google-charts";

// src/charts/geo-chart/geo-chart.module.scss
var geo_chart_module_default = {
  "container": "a8ccharts-JvcqOz"
};

// src/charts/geo-chart/geo-chart.tsx
import { jsx } from "react/jsx-runtime";
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
  } = useGlobalChartsContext();
  const loadingPlaceholder = /* @__PURE__ */ jsx(
    "div",
    {
      className: clsx("geo-chart", geo_chart_module_default.container, className),
      "data-testid": "geo-chart-loading",
      style: { width, height },
      children: renderPlaceholder ? renderPlaceholder() : __("Loading map", "jetpack-charts")
    }
  );
  const fullColorHex = getElementStyles({ index: 0 }).color;
  const lightColorHex = lightenHexColor(fullColorHex, 0.8);
  const backgroundColorHex = normalizeColorToHex(backgroundColor, null, resolveCssVariable) || DEFAULT_BACKGROUND_COLOR;
  const defaultFillColorHex = normalizeColorToHex(featureFillColor, null, resolveCssVariable) || DEFAULT_FEATURE_FILL_COLOR;
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
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: clsx("geo-chart", geo_chart_module_default.container, className),
      "data-testid": "geo-chart",
      style: { width, height, backgroundColor },
      children: /* @__PURE__ */ jsx(
        Chart,
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
  const existingContext = useContext(GlobalChartsContext);
  if (existingContext) {
    return /* @__PURE__ */ jsx(GeoChartInternal, { ...props });
  }
  return /* @__PURE__ */ jsx(GlobalChartsProvider, { children: /* @__PURE__ */ jsx(GeoChartInternal, { ...props }) });
};
GeoChartWithProvider.displayName = "GeoChart";
var GeoChartResponsive = withResponsive(GeoChartWithProvider);

// src/charts/sparkline/sparkline.tsx
import clsx2 from "clsx";
import { useMemo, forwardRef } from "react";

// src/charts/sparkline/sparkline.module.scss
var sparkline_module_default = {
  "sparkline": "a8ccharts-o-3Z8B",
  "sparkline--empty": "a8ccharts-CbLbcd"
};

// src/charts/sparkline/sparkline.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
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
var SparklineComponent = forwardRef(
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
    const theme = useGlobalChartsTheme();
    const themeStrokeWidth = theme.sparkline?.strokeWidth ?? 1.5;
    const strokeWidth = strokeWidthProp ?? themeStrokeWidth;
    const seriesData = useMemo(() => {
      if (!data || data.length === 0) {
        return [];
      }
      return transformToSeriesData(data, color, strokeWidth);
    }, [data, color, strokeWidth]);
    const finalMargin = useMemo(() => {
      const themeMargin = theme.sparkline?.margin ?? { top: 2, right: 2, bottom: 2, left: 2 };
      const margin = marginProp ?? themeMargin;
      return {
        ...themeMargin,
        ...margin
      };
    }, [marginProp, theme.sparkline?.margin]);
    const seriesWithGradient = useMemo(() => {
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
            fromOpacity: gradient.fromOpacity ?? 0.5,
            toOpacity: gradient.toOpacity ?? 0
          }
        }
      }));
    }, [seriesData, gradient, color]);
    if (!data || data.length === 0) {
      return /* @__PURE__ */ jsx2(
        "div",
        {
          ref,
          className: clsx2(
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
      return /* @__PURE__ */ jsx2(
        "div",
        {
          ref,
          className: clsx2(
            "sparkline",
            sparkline_module_default.sparkline,
            sparkline_module_default["sparkline--single-point"],
            className
          ),
          style: { width, height },
          "data-testid": "sparkline-single-point",
          children: /* @__PURE__ */ jsx2("svg", { width, height, "aria-hidden": "true", children: /* @__PURE__ */ jsx2("circle", { cx, cy, r: strokeWidth * 1.5, fill: resolvedColor }) })
        }
      );
    }
    return /* @__PURE__ */ jsx2(
      "div",
      {
        ref,
        className: clsx2("sparkline", sparkline_module_default.sparkline, className),
        "data-testid": "sparkline",
        children: /* @__PURE__ */ jsx2(
          LineChart,
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
var Sparkline = withResponsive(SparklineUnresponsive);
export {
  BarChartResponsive as BarChart,
  BarChart as BarChartUnresponsive,
  BarListChartResponsive as BarListChart,
  BarListChart as BarListChartUnresponsive,
  BaseTooltip,
  ConversionFunnelChartWithProvider as ConversionFunnelChart,
  GeoChartResponsive as GeoChart,
  GeoChartWithProvider as GeoChartUnresponsive,
  GlobalChartsContext,
  GlobalChartsProvider,
  LeaderboardChartResponsive as LeaderboardChart,
  LeaderboardChart as LeaderboardChartUnresponsive,
  Legend,
  LineChartResponsive as LineChart,
  LineChart as LineChartUnresponsive,
  PieChartResponsive as PieChart,
  PieChart as PieChartUnresponsive,
  PieSemiCircleChartResponsive as PieSemiCircleChart,
  PieSemiCircleChart as PieSemiCircleChartUnresponsive,
  Sparkline,
  SparklineUnresponsive,
  GlobalChartsProvider as ThemeProvider,
  TrendIndicator,
  defaultTheme,
  useChartLegendItems,
  useGlobalChartsContext,
  useGlobalChartsTheme
};
//# sourceMappingURL=index.js.map