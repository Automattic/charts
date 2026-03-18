import {
  SvgEmptyState
} from "./chunk-AB3FUPTC.js";
import {
  ChartLayout,
  useChartChildren
} from "./chunk-5CWC5Z5L.js";
import {
  AccessibleTooltip,
  useKeyboardNavigation
} from "./chunk-BPYKWMI7.js";
import {
  Legend,
  SingleChartContext,
  useChartLegendItems
} from "./chunk-WTQYGUNF.js";
import {
  withResponsive
} from "./chunk-OP6PHB2U.js";
import {
  GlobalChartsContext,
  GlobalChartsProvider,
  useChartDataTransform,
  useChartId,
  useChartMargin,
  useChartRegistration,
  useGlobalChartsContext,
  usePrefersReducedMotion,
  useXYChartTheme,
  useZeroValueDisplay
} from "./chunk-2I67QUIV.js";
import {
  attachSubComponents,
  isSafari
} from "./chunk-JJIMABHT.js";

// src/charts/bar-chart/bar-chart.tsx
import { formatNumber } from "@automattic/number-formatters";
import { PatternLines, PatternCircles, PatternWaves, PatternHexagons } from "@visx/pattern";
import { Axis, BarSeries, BarGroup, Grid, XYChart } from "@visx/xychart";
import { __ } from "@wordpress/i18n";
import clsx from "clsx";
import { useCallback, useContext as useContext2, useState, useRef, useMemo as useMemo2 } from "react";

// src/charts/bar-chart/bar-chart.module.scss
var bar_chart_module_default = {
  "bar-chart": "a8ccharts-3gflnB",
  "bar-chart--animated": "a8ccharts-98W-yu",
  "rise": "a8ccharts-z6AsiQ",
  "bar-chart--animated-horizontal": "a8ccharts-HFA3FF",
  "stretch": "a8ccharts-DQp37O"
};

// src/charts/bar-chart/private/use-bar-chart-options.ts
import { formatNumberCompact } from "@automattic/number-formatters";
import { useMemo } from "react";

// src/charts/bar-chart/private/truncated-tick-component.tsx
import { DataContext } from "@visx/xychart";
import { useContext } from "react";
import { jsx as _jsx } from "react/jsx-runtime";
var getScaleBandwidth = (scale) => {
  return scale && "bandwidth" in scale ? scale.bandwidth() ?? 0 : 0;
};
var MIN_TICK_LABEL_WIDTH = 20;
var TruncatedTickComponent = ({
  x,
  y,
  formattedValue,
  axis,
  textAnchor,
  fill,
  dy,
  ...textProps
}) => {
  const {
    xScale,
    yScale
  } = useContext(DataContext) || {};
  const scale = axis === "x" ? xScale : yScale;
  const bandwidth = getScaleBandwidth(scale);
  const maxWidth = Math.max(bandwidth, MIN_TICK_LABEL_WIDTH);
  let textAlign = "center";
  if (textAnchor === "start") {
    textAlign = "left";
  } else if (textAnchor === "end") {
    textAlign = "right";
  } else if (textAnchor === "middle") {
    textAlign = "center";
  }
  let xOffset = 0;
  if (textAlign === "center") {
    xOffset = -maxWidth / 2;
  } else if (textAlign === "right") {
    xOffset = -maxWidth;
  }
  const {
    fontSize,
    fontFamily,
    fontWeight,
    fontStyle,
    letterSpacing,
    opacity
  } = textProps;
  const textStyles = {
    /**
     * SVG <text> elements are vertically aligned to the baseline by default, but HTML <div> elements inside <foreignObject>
     * are positioned relative to the top-left corner. To visually align the tick label like SVG text,
     * we shift the div up by 100% of its height and adjust by twice the SVG dy value (from visx) to approximate original placement.
     */
    transform: `translateY(calc(-100% + ${dy ?? "0"} * 2))`,
    // Safari doesn't work well with foreignObject positioning. Use position: fixed as a workaround.
    ...isSafari() ? {
      position: "fixed"
    } : {},
    // Apply compatible SVG text styles
    fontSize,
    fontFamily,
    fontWeight,
    fontStyle,
    letterSpacing,
    opacity,
    // Convert svg text styles to CSS styles for the div
    color: fill ?? "inherit",
    textAlign,
    // Ensure text is truncated with ellipsis, remains on one line, and shows the full value in a tooltip on hover.
    // The surrounding div uses CSS to handle overflow, and the 'title' attribute is set for accessibility.
    width: maxWidth,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    cursor: "default",
    pointerEvents: "auto"
  };
  return /* @__PURE__ */ _jsx("foreignObject", {
    x: x + xOffset,
    y,
    width: maxWidth,
    height: 0,
    overflow: "visible",
    children: /* @__PURE__ */ _jsx("div", {
      style: textStyles,
      title: formattedValue,
      children: formattedValue
    })
  });
};
var createTruncatedTickComponent = (axis) => (props) => {
  return /* @__PURE__ */ _jsx(TruncatedTickComponent, {
    ...props,
    axis
  });
};
var TruncatedXTickComponent = createTruncatedTickComponent("x");
var TruncatedYTickComponent = createTruncatedTickComponent("y");

// src/charts/bar-chart/private/use-bar-chart-options.ts
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
    const { labelOverflow: xLabelOverflow, ...xAxisOptions } = options.axis?.x || {};
    const { labelOverflow: yLabelOverflow, ...yAxisOptions } = options.axis?.y || {};
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
          ...xLabelOverflow === "ellipsis" ? { tickComponent: TruncatedXTickComponent } : {},
          ...xAxisOptions
        },
        y: {
          orientation: "left",
          numTicks: 4,
          tickFormat: yTickFormat,
          ...yLabelOverflow === "ellipsis" ? { tickComponent: TruncatedYTickComponent } : {},
          ...yAxisOptions
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
import { jsx as _jsx2, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
var validateData = (data) => {
  if (!data?.length) return "No data available";
  const hasInvalidData = data.some((series) => series.data.some((point) => isNaN(point.value) || point.value === null || point.value === void 0 || !point.label && (!("date" in point && point.date) || isNaN(point.date.getTime()))));
  if (hasInvalidData) return "Invalid data";
  return null;
};
var getPatternId = (chartId, index) => `bar-pattern-${chartId}-${index}`;
var BarChartInternal = ({
  data,
  chartId: providedChartId,
  width,
  height,
  className,
  margin,
  withTooltips = false,
  showLegend = false,
  legend = {},
  gridVisibility: gridVisibilityProp,
  renderTooltip,
  options = {},
  orientation = "vertical",
  withPatterns = false,
  showZeroValues = false,
  animation,
  children,
  gap = "md"
}) => {
  const legendInteractive = legend.interactive ?? false;
  const horizontal = orientation === "horizontal";
  const chartId = useChartId(providedChartId);
  const theme = useXYChartTheme(data);
  const dataSorted = useChartDataTransform(data);
  const dataWithVisibleZeros = useZeroValueDisplay(dataSorted, {
    enabled: showZeroValues,
    valueAxisLength: horizontal ? width : height
  });
  const legendItems = useChartLegendItems(dataSorted);
  const chartOptions = useBarChartOptions(dataWithVisibleZeros, horizontal, options);
  const defaultMargin = useChartMargin(height, chartOptions, dataSorted, theme, horizontal);
  const chartRef = useRef(null);
  const {
    legendChildren,
    nonLegendChildren
  } = useChartChildren(children, "BarChart");
  const [measuredChartHeight, setMeasuredChartHeight] = useState();
  const handleContentHeightChange = useCallback((contentHeight) => {
    const chartHeight = contentHeight > 0 ? contentHeight : height;
    setMeasuredChartHeight(chartHeight);
  }, [height]);
  const [selectedIndex, setSelectedIndex] = useState(void 0);
  const [isNavigating, setIsNavigating] = useState(false);
  const totalPoints = Math.max(0, ...data.map((series) => series.data?.length || 0)) * data.length;
  const {
    tooltipRef,
    onChartFocus,
    onChartBlur,
    onChartKeyDown
  } = useKeyboardNavigation({
    selectedIndex,
    setSelectedIndex,
    isNavigating,
    setIsNavigating,
    chartRef,
    totalPoints
  });
  const {
    getElementStyles,
    isSeriesVisible
  } = useGlobalChartsContext();
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
    return seriesWithVisibility.every(({
      isVisible
    }) => !isVisible);
  }, [seriesWithVisibility]);
  const getBarBackground = useCallback((index) => () => withPatterns ? `url(#${getPatternId(chartId, index)})` : getElementStyles({
    data: dataSorted[index],
    index
  }).color, [withPatterns, getElementStyles, dataSorted, chartId]);
  const renderDefaultTooltip = useCallback(({
    tooltipData
  }) => {
    const nearestDatum = tooltipData?.nearestDatum?.datum;
    if (!nearestDatum) return null;
    return /* @__PURE__ */ _jsxs("div", {
      className: bar_chart_module_default["bar-chart__tooltip"],
      children: [/* @__PURE__ */ _jsx2("div", {
        className: bar_chart_module_default["bar-chart__tooltip-header"],
        children: tooltipData?.nearestDatum?.key
      }), /* @__PURE__ */ _jsxs("div", {
        className: bar_chart_module_default["bar-chart__tooltip-row"],
        children: [/* @__PURE__ */ _jsxs("span", {
          className: bar_chart_module_default["bar-chart__tooltip-label"],
          children: [chartOptions.tooltip.labelFormatter(nearestDatum.label || (nearestDatum.date ? nearestDatum.date.getTime() : 0), 0, []), ":"]
        }), /* @__PURE__ */ _jsx2("span", {
          className: bar_chart_module_default["bar-chart__tooltip-value"],
          children: formatNumber(nearestDatum.value)
        })]
      })]
    });
  }, [chartOptions.tooltip]);
  const renderPattern = useCallback((index, color) => {
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
        return /* @__PURE__ */ _jsx2(PatternLines, {
          ...commonProps,
          width: 5,
          height: 5,
          orientation: ["diagonal"]
        }, id);
      case 1:
        return /* @__PURE__ */ _jsx2(PatternCircles, {
          ...commonProps,
          width: 6,
          height: 6,
          fill: "white"
        }, id);
      case 2:
        return /* @__PURE__ */ _jsx2(PatternWaves, {
          ...commonProps,
          width: 4,
          height: 4
        }, id);
      case 3:
        return /* @__PURE__ */ _jsx2(PatternHexagons, {
          ...commonProps,
          size: 8,
          height: 3
        }, id);
    }
  }, [chartId]);
  const createPatternBorderStyle = useCallback((index, color) => {
    const patternId = getPatternId(chartId, index);
    return `
			.visx-bar[fill="url(#${patternId})"] {
				stroke: ${color};
				stroke-width: 1;
				}
			`;
  }, [chartId]);
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
  const chartMetadata = useMemo2(() => ({
    orientation,
    withPatterns
  }), [orientation, withPatterns]);
  useChartRegistration({
    chartId,
    legendItems,
    chartType: "bar",
    isDataValid,
    metadata: chartMetadata
  });
  const prefersReducedMotion = usePrefersReducedMotion();
  if (error) {
    return /* @__PURE__ */ _jsx2("div", {
      className: clsx("bar-chart", bar_chart_module_default["bar-chart"]),
      children: error
    });
  }
  const gridVisibility = gridVisibilityProp ?? chartOptions.gridVisibility;
  const highlightedBarStyle = createKeyboardHighlightStyle();
  const legendPosition = legend.position ?? "bottom";
  const legendElement = showLegend && /* @__PURE__ */ _jsx2(Legend, {
    orientation: legend.orientation ?? "horizontal",
    position: legendPosition,
    alignment: legend.alignment ?? "center",
    labelStyles: legend.labelStyles,
    itemClassName: legend.itemClassName,
    itemStyles: legend.itemStyles,
    shapeStyles: legend.shapeStyles,
    className: bar_chart_module_default["bar-chart__legend"],
    shape: legend.shape ?? "rect",
    chartId,
    interactive: legendInteractive
  });
  return /* @__PURE__ */ _jsx2(SingleChartContext.Provider, {
    value: {
      chartId,
      chartWidth: width,
      chartHeight: measuredChartHeight || 0
    },
    children: /* @__PURE__ */ _jsx2(ChartLayout, {
      legendPosition,
      legendElement,
      legendChildren,
      gap,
      className: clsx("bar-chart", bar_chart_module_default["bar-chart"], {
        [bar_chart_module_default[`bar-chart--animated${horizontal ? "-horizontal" : ""}`]]: animation && !prefersReducedMotion
      }, className),
      style: {
        width,
        height
      },
      "data-chart-id": `bar-chart-${chartId}`,
      trailingContent: nonLegendChildren,
      onContentHeightChange: handleContentHeightChange,
      children: ({
        contentHeight
      }) => {
        const chartHeight = contentHeight > 0 ? contentHeight : height;
        return /* @__PURE__ */ _jsx2("div", {
          role: "grid",
          "aria-label": __("Bar chart", "jetpack-charts"),
          tabIndex: 0,
          onKeyDown: onChartKeyDown,
          onFocus: onChartFocus,
          onBlur: onChartBlur,
          children: chartHeight > 0 && /* @__PURE__ */ _jsx2("div", {
            ref: chartRef,
            children: /* @__PURE__ */ _jsxs(XYChart, {
              theme,
              width,
              height: chartHeight,
              margin: {
                ...defaultMargin,
                ...margin
              },
              xScale: chartOptions.xScale,
              yScale: chartOptions.yScale,
              horizontal,
              pointerEventsDataKey: "nearest",
              children: [/* @__PURE__ */ _jsx2(Grid, {
                columns: gridVisibility.includes("y"),
                rows: gridVisibility.includes("x"),
                numTicks: 4
              }), withPatterns && /* @__PURE__ */ _jsxs(_Fragment, {
                children: [/* @__PURE__ */ _jsx2("defs", {
                  children: dataSorted.map((seriesData, index) => renderPattern(index, getElementStyles({
                    data: seriesData,
                    index
                  }).color))
                }), /* @__PURE__ */ _jsx2("style", {
                  children: dataSorted.map((seriesData, index) => createPatternBorderStyle(index, getElementStyles({
                    data: seriesData,
                    index
                  }).color))
                })]
              }), highlightedBarStyle && /* @__PURE__ */ _jsx2("style", {
                children: highlightedBarStyle
              }), allSeriesHidden ? /* @__PURE__ */ _jsx2(SvgEmptyState, {
                x: width / 2,
                y: chartHeight / 2,
                width,
                height: chartHeight,
                children: __("All series are hidden. Click legend items to show data.", "jetpack-charts")
              }) : null, /* @__PURE__ */ _jsx2(BarGroup, {
                padding: chartOptions.barGroup.padding,
                children: seriesWithVisibility.map(({
                  series: seriesData,
                  index,
                  isVisible
                }) => {
                  if (!isVisible) {
                    return null;
                  }
                  return /* @__PURE__ */ _jsx2(BarSeries, {
                    dataKey: seriesData?.label,
                    data: seriesData.data,
                    yAccessor: chartOptions.accessors.yAccessor,
                    xAccessor: chartOptions.accessors.xAccessor,
                    colorAccessor: getBarBackground(index)
                  }, seriesData?.label);
                })
              }), /* @__PURE__ */ _jsx2(Axis, {
                ...chartOptions.axis.x
              }), /* @__PURE__ */ _jsx2(Axis, {
                ...chartOptions.axis.y
              }), withTooltips && /* @__PURE__ */ _jsx2(AccessibleTooltip, {
                detectBounds: true,
                snapTooltipToDatumX: true,
                snapTooltipToDatumY: true,
                renderTooltip: renderTooltip || renderDefaultTooltip,
                selectedIndex,
                tooltipRef,
                keyboardFocusedClassName: bar_chart_module_default["bar-chart__tooltip--keyboard-focused"],
                series: data,
                mode: "individual"
              })]
            })
          })
        });
      }
    })
  });
};
var BarChartWithProvider = (props) => {
  const existingContext = useContext2(GlobalChartsContext);
  if (existingContext) {
    return /* @__PURE__ */ _jsx2(BarChartInternal, {
      ...props
    });
  }
  return /* @__PURE__ */ _jsx2(GlobalChartsProvider, {
    children: /* @__PURE__ */ _jsx2(BarChartInternal, {
      ...props
    })
  });
};
BarChartWithProvider.displayName = "BarChart";
var BarChart = attachSubComponents(BarChartWithProvider, {
  Legend
});
var BarChartResponsive = attachSubComponents(withResponsive(BarChartWithProvider), {
  Legend
});

export {
  BarChart,
  BarChartResponsive
};
//# sourceMappingURL=chunk-CHGWGQJL.js.map