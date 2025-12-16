import {
  LineChart,
  LineChartResponsive
} from "./chunk-AI6GM6HS.js";
import {
  PieChart,
  PieChartResponsive
} from "./chunk-IS66XVUU.js";
import "./chunk-NFRB2POF.js";
import {
  PieSemiCircleChart,
  PieSemiCircleChartResponsive
} from "./chunk-E6VKSUGP.js";
import "./chunk-A3AEEGKR.js";
import {
  TrendIndicator
} from "./chunk-MMDLXS6O.js";
import {
  BarListChart,
  BarListChartResponsive
} from "./chunk-DILKZ4MP.js";
import {
  BarChart,
  BarChartResponsive
} from "./chunk-GSG54JGM.js";
import {
  BaseTooltip
} from "./chunk-5XI443YP.js";
import {
  ConversionFunnelChartWithProvider
} from "./chunk-624IQX64.js";
import {
  LeaderboardChart,
  LeaderboardChartResponsive
} from "./chunk-S5UDYA4M.js";
import "./chunk-CEZGL6YP.js";
import {
  withResponsive
} from "./chunk-NONODB3K.js";
import {
  Legend,
  useChartLegendItems
} from "./chunk-EELV2LG7.js";
import {
  GlobalChartsContext,
  GlobalChartsProvider,
  defaultTheme,
  useGlobalChartsContext,
  useGlobalChartsTheme
} from "./chunk-ULRFJ3IU.js";
import "./chunk-7IZD3F7B.js";
import "./chunk-G3PMV62Z.js";

// src/charts/sparkline/sparkline.tsx
import clsx from "clsx";
import { useMemo, forwardRef } from "react";

// src/charts/sparkline/sparkline.module.scss
var sparkline_module_default = {
  "sparkline": "a8ccharts-o-3Z8B",
  "sparkline--empty": "a8ccharts-CbLbcd"
};

// src/charts/sparkline/sparkline.tsx
import { jsx } from "react/jsx-runtime";
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
      return /* @__PURE__ */ jsx(
        "div",
        {
          ref,
          className: clsx(
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
      return /* @__PURE__ */ jsx(
        "div",
        {
          ref,
          className: clsx(
            "sparkline",
            sparkline_module_default.sparkline,
            sparkline_module_default["sparkline--single-point"],
            className
          ),
          style: { width, height },
          "data-testid": "sparkline-single-point",
          children: /* @__PURE__ */ jsx("svg", { width, height, "aria-hidden": "true", children: /* @__PURE__ */ jsx("circle", { cx, cy, r: strokeWidth * 1.5, fill: resolvedColor }) })
        }
      );
    }
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: clsx("sparkline", sparkline_module_default.sparkline, className),
        "data-testid": "sparkline",
        children: /* @__PURE__ */ jsx(
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