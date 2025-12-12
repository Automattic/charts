import {
  AccessibleTooltip,
  useKeyboardNavigation
} from "./chunk-5XI443YP.js";
import {
  withResponsive
} from "./chunk-NONODB3K.js";
import {
  Legend,
  SingleChartContext,
  useChartLegendItems
} from "./chunk-MT3NPC5U.js";
import {
  GlobalChartsContext,
  GlobalChartsProvider,
  useChartDataTransform,
  useChartId,
  useChartMargin,
  useChartRegistration,
  useElementHeight,
  useGlobalChartsContext,
  useGlobalChartsTheme,
  usePrefersReducedMotion,
  useXYChartTheme,
  useZeroValueDisplay
} from "./chunk-RSKOU6PO.js";
import {
  attachSubComponents
} from "./chunk-7IZD3F7B.js";

// src/charts/bar-chart/bar-chart.tsx
import { formatNumber } from "@automattic/number-formatters";
import { PatternLines, PatternCircles, PatternWaves, PatternHexagons } from "@visx/pattern";
import { Axis, BarSeries, BarGroup, Grid, XYChart } from "@visx/xychart";
import { __ } from "@wordpress/i18n";
import clsx from "clsx";
import { useCallback, useContext, useState, useRef, useMemo as useMemo2 } from "react";

// src/charts/bar-chart/bar-chart.module.scss
var bar_chart_module_default = {
  "bar-chart": "a8ccharts-3gflnB",
  "bar-chart--legend-top": "a8ccharts-8Vnz-c",
  "bar-chart-legend": "a8ccharts-XhI9HR",
  "bar-chart--animated": "a8ccharts-98W-yu",
  "rise": "a8ccharts-z6AsiQ",
  "bar-chart--animated-horizontal": "a8ccharts-HFA3FF",
  "stretch": "a8ccharts-DQp37O"
};

// src/charts/bar-chart/private/use-bar-chart-options.ts
import { formatNumberCompact } from "@automattic/number-formatters";
import { useMemo } from "react";
var formatDateTick = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString(void 0, {
    month: "short",
    day: "numeric"
  });
};
var getGroupPadding = (scale) => {
  return typeof scale.paddingInner === "number" ? scale.paddingInner : 0;
};
function useBarChartOptions(data, horizontal, options = {}) {
  const defaultOptions = useMemo(() => {
    const bandScale = {
      type: "band",
      padding: 0.2,
      paddingInner: 0.1
    };
    const linearScale = {
      type: "linear",
      nice: true,
      zero: false
    };
    const labelFormatter = data?.[0]?.data?.[0]?.label ? (label) => label : formatDateTick;
    const valueFormatter = formatNumberCompact;
    const labelAccessor = (d) => d?.label || d?.date;
    const valueAccessor = (d) => {
      const enhancedPoint = d;
      return enhancedPoint?.visualValue !== void 0 ? enhancedPoint.visualValue : d?.value;
    };
    return {
      vertical: {
        xTickFormat: labelFormatter,
        yTickFormat: valueFormatter,
        tooltipLabelFormatter: labelFormatter,
        xAccessor: labelAccessor,
        yAccessor: valueAccessor,
        gridVisibility: "x",
        xScale: bandScale,
        yScale: linearScale
      },
      horizontal: {
        xTickFormat: valueFormatter,
        yTickFormat: labelFormatter,
        tooltipLabelFormatter: labelFormatter,
        xAccessor: valueAccessor,
        yAccessor: labelAccessor,
        gridVisibility: "y",
        xScale: linearScale,
        yScale: bandScale
      }
    };
  }, [data]);
  return useMemo(() => {
    const orientationKey = horizontal ? "horizontal" : "vertical";
    const {
      xTickFormat,
      yTickFormat,
      tooltipLabelFormatter: defaultTooltipLabelFormatter,
      xAccessor,
      yAccessor,
      gridVisibility,
      xScale: baseXScale,
      yScale: baseYScale
    } = defaultOptions[orientationKey];
    const xScale = { ...baseXScale, ...options.xScale || {} };
    const yScale = { ...baseYScale, ...options.yScale || {} };
    const providedToolTipLabelFormatter = horizontal ? options.axis?.y?.tickFormat : options.axis?.x?.tickFormat;
    return {
      gridVisibility,
      xScale,
      yScale,
      accessors: {
        xAccessor,
        yAccessor
      },
      axis: {
        x: {
          orientation: "bottom",
          numTicks: 4,
          tickFormat: xTickFormat,
          ...options.axis?.x || {}
        },
        y: {
          orientation: "left",
          numTicks: 4,
          tickFormat: yTickFormat,
          ...options.axis?.y || {}
        }
      },
      barGroup: {
        padding: getGroupPadding(horizontal ? yScale : xScale)
      },
      tooltip: {
        labelFormatter: providedToolTipLabelFormatter || defaultTooltipLabelFormatter
      }
    };
  }, [defaultOptions, options, horizontal]);
}

// src/charts/bar-chart/bar-chart.tsx
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var validateData = (data) => {
  if (!data?.length) return "No data available";
  const hasInvalidData = data.some(
    (series) => series.data.some(
      (point) => isNaN(point.value) || point.value === null || point.value === void 0 || !point.label && (!("date" in point && point.date) || isNaN(point.date.getTime()))
    )
  );
  if (hasInvalidData) return "Invalid data";
  return null;
};
var getPatternId = (chartId, index) => `bar-pattern-${chartId}-${index}`;
var BarChartInternal = ({
  data,
  chartId: providedChartId,
  width,
  height = 400,
  className,
  margin,
  withTooltips = false,
  showLegend = false,
  legendOrientation = "horizontal",
  legendPosition = "bottom",
  legendAlignment = "center",
  legendMaxWidth,
  legendTextOverflow = "wrap",
  legendItemClassName,
  legendShape = "rect",
  gridVisibility: gridVisibilityProp,
  renderTooltip,
  options = {},
  orientation = "vertical",
  withPatterns = false,
  showZeroValues = false,
  legendInteractive = false,
  animation,
  children
}) => {
  const horizontal = orientation === "horizontal";
  const chartId = useChartId(providedChartId);
  const theme = useXYChartTheme(data);
  const dataSorted = useChartDataTransform(data);
  const dataWithVisibleZeros = useZeroValueDisplay(dataSorted, {
    enabled: showZeroValues
  });
  const legendItems = useChartLegendItems(dataSorted);
  const chartOptions = useBarChartOptions(dataWithVisibleZeros, horizontal, options);
  const defaultMargin = useChartMargin(height, chartOptions, dataSorted, theme, horizontal);
  const [legendRef, legendHeight] = useElementHeight();
  const chartRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(void 0);
  const [isNavigating, setIsNavigating] = useState(false);
  const totalPoints = Math.max(0, ...data.map((series) => series.data?.length || 0)) * data.length;
  const { tooltipRef, onChartFocus, onChartBlur, onChartKeyDown } = useKeyboardNavigation({
    selectedIndex,
    setSelectedIndex,
    isNavigating,
    setIsNavigating,
    chartRef,
    totalPoints
  });
  const { getElementStyles, isSeriesVisible } = useGlobalChartsContext();
  const providerTheme = useGlobalChartsTheme();
  const seriesWithVisibility = useMemo2(() => {
    if (!chartId || !legendInteractive) {
      return dataWithVisibleZeros.map((series, index) => ({
        series,
        index,
        isVisible: true
      }));
    }
    return dataWithVisibleZeros.map((series, index) => ({
      series,
      index,
      isVisible: isSeriesVisible(chartId, series.label)
    }));
  }, [dataWithVisibleZeros, chartId, isSeriesVisible, legendInteractive]);
  const allSeriesHidden = useMemo2(() => {
    return seriesWithVisibility.every(({ isVisible }) => !isVisible);
  }, [seriesWithVisibility]);
  const getBarBackground = useCallback(
    (index) => () => withPatterns ? `url(#${getPatternId(chartId, index)})` : getElementStyles({ data: dataSorted[index], index }).color,
    [withPatterns, getElementStyles, dataSorted, chartId]
  );
  const renderDefaultTooltip = useCallback(
    ({ tooltipData }) => {
      const nearestDatum = tooltipData?.nearestDatum?.datum;
      if (!nearestDatum) return null;
      return /* @__PURE__ */ jsxs("div", { className: bar_chart_module_default["bar-chart__tooltip"], children: [
        /* @__PURE__ */ jsx("div", { className: bar_chart_module_default["bar-chart__tooltip-header"], children: tooltipData?.nearestDatum?.key }),
        /* @__PURE__ */ jsxs("div", { className: bar_chart_module_default["bar-chart__tooltip-row"], children: [
          /* @__PURE__ */ jsxs("span", { className: bar_chart_module_default["bar-chart__tooltip-label"], children: [
            chartOptions.tooltip.labelFormatter(
              nearestDatum.label || (nearestDatum.date ? nearestDatum.date.getTime() : 0),
              0,
              []
            ),
            ":"
          ] }),
          /* @__PURE__ */ jsx("span", { className: bar_chart_module_default["bar-chart__tooltip-value"], children: formatNumber(nearestDatum.value) })
        ] })
      ] });
    },
    [chartOptions.tooltip]
  );
  const renderPattern = useCallback(
    (index, color) => {
      const patternType = index % 4;
      const id = getPatternId(chartId, index);
      const commonProps = {
        id,
        stroke: "white",
        strokeWidth: 1,
        background: color
      };
      switch (patternType) {
        case 0:
        default:
          return /* @__PURE__ */ jsx(
            PatternLines,
            {
              ...commonProps,
              width: 5,
              height: 5,
              orientation: ["diagonal"]
            },
            id
          );
        case 1:
          return /* @__PURE__ */ jsx(PatternCircles, { ...commonProps, width: 6, height: 6, fill: "white" }, id);
        case 2:
          return /* @__PURE__ */ jsx(PatternWaves, { ...commonProps, width: 4, height: 4 }, id);
        case 3:
          return /* @__PURE__ */ jsx(PatternHexagons, { ...commonProps, size: 8, height: 3 }, id);
      }
    },
    [chartId]
  );
  const createPatternBorderStyle = useCallback(
    (index, color) => {
      const patternId = getPatternId(chartId, index);
      return `
			.visx-bar[fill="url(#${patternId})"] {
				stroke: ${color};
				stroke-width: 1;
				}
			`;
    },
    [chartId]
  );
  const createKeyboardHighlightStyle = useCallback(() => {
    if (selectedIndex === void 0) return "";
    const maxDataPoints = Math.max(...data.map((s) => s.data.length));
    const dataPointIndex = Math.floor(selectedIndex / data.length);
    const seriesIndex = selectedIndex % data.length;
    if (dataPointIndex >= maxDataPoints || seriesIndex >= data.length) {
      return "";
    }
    const seriesData = data[seriesIndex];
    if (dataPointIndex >= seriesData.data.length) {
      return "";
    }
    const actualBarIndex = seriesIndex * maxDataPoints + dataPointIndex;
    const generatedStyles = `
			.bar-chart[data-chart-id="bar-chart-${chartId}"] .visx-bar-group .visx-bar:nth-child(${actualBarIndex + 1}) {
				stroke: #005fcc;
				stroke-width: 2px;
			}
		`;
    return generatedStyles;
  }, [selectedIndex, data, chartId]);
  const error = validateData(dataSorted);
  const isDataValid = !error;
  const chartMetadata = useMemo2(
    () => ({
      orientation,
      withPatterns
    }),
    [orientation, withPatterns]
  );
  useChartRegistration({
    chartId,
    legendItems,
    chartType: "bar",
    isDataValid,
    metadata: chartMetadata
  });
  const prefersReducedMotion = usePrefersReducedMotion();
  if (error) {
    return /* @__PURE__ */ jsx("div", { className: clsx("bar-chart", bar_chart_module_default["bar-chart"]), children: error });
  }
  const gridVisibility = gridVisibilityProp ?? chartOptions.gridVisibility;
  const highlightedBarStyle = createKeyboardHighlightStyle();
  return /* @__PURE__ */ jsx(
    SingleChartContext.Provider,
    {
      value: {
        chartId,
        chartWidth: width,
        chartHeight: height - (showLegend ? legendHeight : 0)
      },
      children: /* @__PURE__ */ jsxs(
        "div",
        {
          className: clsx(
            "bar-chart",
            bar_chart_module_default["bar-chart"],
            {
              [bar_chart_module_default[`bar-chart--animated${horizontal ? "-horizontal" : ""}`]]: animation && !prefersReducedMotion,
              [bar_chart_module_default["bar-chart--legend-top"]]: showLegend && legendPosition === "top"
            },
            className
          ),
          "data-testid": "bar-chart",
          role: "grid",
          "aria-label": __("Bar chart", "jetpack-charts"),
          style: {
            width,
            height
          },
          tabIndex: 0,
          onKeyDown: onChartKeyDown,
          onFocus: onChartFocus,
          onBlur: onChartBlur,
          ref: chartRef,
          "data-chart-id": `bar-chart-${chartId}`,
          children: [
            /* @__PURE__ */ jsxs(
              XYChart,
              {
                theme,
                width,
                height: height - (showLegend ? legendHeight : 0),
                margin: {
                  ...defaultMargin,
                  ...margin,
                  ...showLegend && legendPosition === "top" ? { top: (defaultMargin.top || 0) + legendHeight } : {}
                },
                xScale: chartOptions.xScale,
                yScale: chartOptions.yScale,
                horizontal,
                pointerEventsDataKey: "nearest",
                children: [
                  /* @__PURE__ */ jsx(
                    Grid,
                    {
                      columns: gridVisibility.includes("y"),
                      rows: gridVisibility.includes("x"),
                      numTicks: 4
                    }
                  ),
                  withPatterns && /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsx("defs", { "data-testid": "bar-chart-patterns", children: dataSorted.map(
                      (seriesData, index) => renderPattern(index, getElementStyles({ data: seriesData, index }).color)
                    ) }),
                    /* @__PURE__ */ jsx("style", { children: dataSorted.map(
                      (seriesData, index) => createPatternBorderStyle(
                        index,
                        getElementStyles({ data: seriesData, index }).color
                      )
                    ) })
                  ] }),
                  highlightedBarStyle && /* @__PURE__ */ jsx("style", { children: highlightedBarStyle }),
                  allSeriesHidden ? /* @__PURE__ */ jsx(
                    "text",
                    {
                      x: width / 2,
                      y: (height - (showLegend ? legendHeight : 0)) / 2,
                      textAnchor: "middle",
                      fill: providerTheme.gridStyles?.stroke || "#ccc",
                      fontSize: "14",
                      fontFamily: "-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif",
                      children: __("All series are hidden. Click legend items to show data.", "jetpack-charts")
                    }
                  ) : null,
                  /* @__PURE__ */ jsx(BarGroup, { padding: chartOptions.barGroup.padding, children: seriesWithVisibility.map(({ series: seriesData, index, isVisible }) => {
                    if (!isVisible) {
                      return null;
                    }
                    return /* @__PURE__ */ jsx(
                      BarSeries,
                      {
                        dataKey: seriesData?.label,
                        data: seriesData.data,
                        yAccessor: chartOptions.accessors.yAccessor,
                        xAccessor: chartOptions.accessors.xAccessor,
                        colorAccessor: getBarBackground(index)
                      },
                      seriesData?.label
                    );
                  }) }),
                  /* @__PURE__ */ jsx(Axis, { ...chartOptions.axis.x }),
                  /* @__PURE__ */ jsx(Axis, { ...chartOptions.axis.y }),
                  withTooltips && /* @__PURE__ */ jsx(
                    AccessibleTooltip,
                    {
                      detectBounds: true,
                      snapTooltipToDatumX: true,
                      snapTooltipToDatumY: true,
                      renderTooltip: renderTooltip || renderDefaultTooltip,
                      selectedIndex,
                      tooltipRef,
                      keyboardFocusedClassName: bar_chart_module_default["bar-chart__tooltip--keyboard-focused"],
                      series: data,
                      mode: "individual"
                    }
                  )
                ]
              }
            ),
            showLegend && /* @__PURE__ */ jsx(
              Legend,
              {
                orientation: legendOrientation,
                position: legendPosition,
                alignment: legendAlignment,
                maxWidth: legendMaxWidth,
                textOverflow: legendTextOverflow,
                legendItemClassName,
                className: bar_chart_module_default["bar-chart__legend"],
                shape: legendShape,
                ref: legendRef,
                chartId,
                interactive: legendInteractive
              }
            ),
            children
          ]
        }
      )
    }
  );
};
var BarChartWithProvider = (props) => {
  const existingContext = useContext(GlobalChartsContext);
  if (existingContext) {
    return /* @__PURE__ */ jsx(BarChartInternal, { ...props });
  }
  return /* @__PURE__ */ jsx(GlobalChartsProvider, { children: /* @__PURE__ */ jsx(BarChartInternal, { ...props }) });
};
BarChartWithProvider.displayName = "BarChart";
var BarChart = attachSubComponents(BarChartWithProvider, {
  Legend
});
var BarChartResponsive = attachSubComponents(
  withResponsive(BarChartWithProvider),
  {
    Legend
  }
);

export {
  BarChart,
  BarChartResponsive
};
//# sourceMappingURL=chunk-NO2KYTQO.js.map