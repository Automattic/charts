"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkMUUSZ7J5cjs = require('./chunk-MUUSZ7J5.cjs');




var _chunkZPJHWKEKcjs = require('./chunk-ZPJHWKEK.cjs');













var _chunkWKN6C4ZEcjs = require('./chunk-WKN6C4ZE.cjs');



var _chunkZVGEDXDPcjs = require('./chunk-ZVGEDXDP.cjs');



var _chunk7HROSZRScjs = require('./chunk-7HROSZRS.cjs');

// src/charts/bar-chart/bar-chart.tsx
var _numberformatters = require('@automattic/number-formatters');
var _pattern = require('@visx/pattern');
var _xychart = require('@visx/xychart');
var _i18n = require('@wordpress/i18n');
var _clsx = require('clsx'); var _clsx2 = _interopRequireDefault(_clsx);
var _react = require('react');

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



// src/charts/bar-chart/private/truncated-tick-component.tsx


var _jsxruntime = require('react/jsx-runtime');
var getScaleBandwidth = (scale) => {
  return scale && "bandwidth" in scale ? _nullishCoalesce(scale.bandwidth(), () => ( 0)) : 0;
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
  const { xScale, yScale } = _react.useContext.call(void 0, _xychart.DataContext) || {};
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
  const { fontSize, fontFamily, fontWeight, fontStyle, letterSpacing, opacity } = textProps;
  const textStyles = {
    /**
     * SVG <text> elements are vertically aligned to the baseline by default, but HTML <div> elements inside <foreignObject>
     * are positioned relative to the top-left corner. To visually align the tick label like SVG text,
     * we shift the div up by 100% of its height and adjust by twice the SVG dy value (from visx) to approximate original placement.
     */
    transform: `translateY(calc(-100% + ${_nullishCoalesce(dy, () => ( "0"))} * 2))`,
    // Safari doesn't work well with foreignObject positioning. Use position: fixed as a workaround.
    ..._chunkZVGEDXDPcjs.isSafari.call(void 0, ) ? { position: "fixed" } : {},
    // Apply compatible SVG text styles
    fontSize,
    fontFamily,
    fontWeight,
    fontStyle,
    letterSpacing,
    opacity,
    // Convert svg text styles to CSS styles for the div
    color: _nullishCoalesce(fill, () => ( "inherit")),
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
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "foreignObject", { x: x + xOffset, y, width: maxWidth, height: 0, overflow: "visible", children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { style: textStyles, title: formattedValue, children: formattedValue }) });
};
var createTruncatedTickComponent = (axis) => (props) => {
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, TruncatedTickComponent, { ...props, axis });
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
  const defaultOptions = _react.useMemo.call(void 0, () => {
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
    const labelFormatter = _optionalChain([data, 'optionalAccess', _ => _[0], 'optionalAccess', _2 => _2.data, 'optionalAccess', _3 => _3[0], 'optionalAccess', _4 => _4.label]) ? (label) => label : formatDateTick;
    const valueFormatter = _numberformatters.formatNumberCompact;
    const labelAccessor = (d) => _optionalChain([d, 'optionalAccess', _5 => _5.label]) || _optionalChain([d, 'optionalAccess', _6 => _6.date]);
    const valueAccessor = (d) => {
      const enhancedPoint = d;
      return _optionalChain([enhancedPoint, 'optionalAccess', _7 => _7.visualValue]) !== void 0 ? enhancedPoint.visualValue : _optionalChain([d, 'optionalAccess', _8 => _8.value]);
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
  return _react.useMemo.call(void 0, () => {
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
    const providedToolTipLabelFormatter = horizontal ? _optionalChain([options, 'access', _9 => _9.axis, 'optionalAccess', _10 => _10.y, 'optionalAccess', _11 => _11.tickFormat]) : _optionalChain([options, 'access', _12 => _12.axis, 'optionalAccess', _13 => _13.x, 'optionalAccess', _14 => _14.tickFormat]);
    const { labelOverflow: xLabelOverflow, ...xAxisOptions } = _optionalChain([options, 'access', _15 => _15.axis, 'optionalAccess', _16 => _16.x]) || {};
    const { labelOverflow: yLabelOverflow, ...yAxisOptions } = _optionalChain([options, 'access', _17 => _17.axis, 'optionalAccess', _18 => _18.y]) || {};
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

var validateData = (data) => {
  if (!_optionalChain([data, 'optionalAccess', _19 => _19.length])) return "No data available";
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
  const chartId = _chunkWKN6C4ZEcjs.useChartId.call(void 0, providedChartId);
  const theme = _chunkWKN6C4ZEcjs.useXYChartTheme.call(void 0, data);
  const dataSorted = _chunkWKN6C4ZEcjs.useChartDataTransform.call(void 0, data);
  const dataWithVisibleZeros = _chunkWKN6C4ZEcjs.useZeroValueDisplay.call(void 0, dataSorted, {
    enabled: showZeroValues
  });
  const legendItems = _chunkZPJHWKEKcjs.useChartLegendItems.call(void 0, dataSorted);
  const chartOptions = useBarChartOptions(dataWithVisibleZeros, horizontal, options);
  const defaultMargin = _chunkWKN6C4ZEcjs.useChartMargin.call(void 0, height, chartOptions, dataSorted, theme, horizontal);
  const [legendRef, legendHeight] = _chunkWKN6C4ZEcjs.useElementHeight.call(void 0, );
  const chartRef = _react.useRef.call(void 0, null);
  const [selectedIndex, setSelectedIndex] = _react.useState.call(void 0, void 0);
  const [isNavigating, setIsNavigating] = _react.useState.call(void 0, false);
  const totalPoints = Math.max(0, ...data.map((series) => _optionalChain([series, 'access', _20 => _20.data, 'optionalAccess', _21 => _21.length]) || 0)) * data.length;
  const { tooltipRef, onChartFocus, onChartBlur, onChartKeyDown } = _chunk7HROSZRScjs.useKeyboardNavigation.call(void 0, {
    selectedIndex,
    setSelectedIndex,
    isNavigating,
    setIsNavigating,
    chartRef,
    totalPoints
  });
  const { getElementStyles, isSeriesVisible } = _chunkWKN6C4ZEcjs.useGlobalChartsContext.call(void 0, );
  const providerTheme = _chunkWKN6C4ZEcjs.useGlobalChartsTheme.call(void 0, );
  const seriesWithVisibility = _react.useMemo.call(void 0, () => {
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
  const allSeriesHidden = _react.useMemo.call(void 0, () => {
    return seriesWithVisibility.every(({ isVisible }) => !isVisible);
  }, [seriesWithVisibility]);
  const getBarBackground = _react.useCallback.call(void 0, 
    (index) => () => withPatterns ? `url(#${getPatternId(chartId, index)})` : getElementStyles({ data: dataSorted[index], index }).color,
    [withPatterns, getElementStyles, dataSorted, chartId]
  );
  const renderDefaultTooltip = _react.useCallback.call(void 0, 
    ({ tooltipData }) => {
      const nearestDatum = _optionalChain([tooltipData, 'optionalAccess', _22 => _22.nearestDatum, 'optionalAccess', _23 => _23.datum]);
      if (!nearestDatum) return null;
      return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: bar_chart_module_default["bar-chart__tooltip"], children: [
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: bar_chart_module_default["bar-chart__tooltip-header"], children: _optionalChain([tooltipData, 'optionalAccess', _24 => _24.nearestDatum, 'optionalAccess', _25 => _25.key]) }),
        /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: bar_chart_module_default["bar-chart__tooltip-row"], children: [
          /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "span", { className: bar_chart_module_default["bar-chart__tooltip-label"], children: [
            chartOptions.tooltip.labelFormatter(
              nearestDatum.label || (nearestDatum.date ? nearestDatum.date.getTime() : 0),
              0,
              []
            ),
            ":"
          ] }),
          /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: bar_chart_module_default["bar-chart__tooltip-value"], children: _numberformatters.formatNumber.call(void 0, nearestDatum.value) })
        ] })
      ] });
    },
    [chartOptions.tooltip]
  );
  const renderPattern = _react.useCallback.call(void 0, 
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
          return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
            _pattern.PatternLines,
            {
              ...commonProps,
              width: 5,
              height: 5,
              orientation: ["diagonal"]
            },
            id
          );
        case 1:
          return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _pattern.PatternCircles, { ...commonProps, width: 6, height: 6, fill: "white" }, id);
        case 2:
          return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _pattern.PatternWaves, { ...commonProps, width: 4, height: 4 }, id);
        case 3:
          return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _pattern.PatternHexagons, { ...commonProps, size: 8, height: 3 }, id);
      }
    },
    [chartId]
  );
  const createPatternBorderStyle = _react.useCallback.call(void 0, 
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
  const createKeyboardHighlightStyle = _react.useCallback.call(void 0, () => {
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
  const chartMetadata = _react.useMemo.call(void 0, 
    () => ({
      orientation,
      withPatterns
    }),
    [orientation, withPatterns]
  );
  _chunkWKN6C4ZEcjs.useChartRegistration.call(void 0, {
    chartId,
    legendItems,
    chartType: "bar",
    isDataValid,
    metadata: chartMetadata
  });
  const prefersReducedMotion = _chunkWKN6C4ZEcjs.usePrefersReducedMotion.call(void 0, );
  if (error) {
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: _clsx2.default.call(void 0, "bar-chart", bar_chart_module_default["bar-chart"]), children: error });
  }
  const gridVisibility = _nullishCoalesce(gridVisibilityProp, () => ( chartOptions.gridVisibility));
  const highlightedBarStyle = createKeyboardHighlightStyle();
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
    _chunkZPJHWKEKcjs.SingleChartContext.Provider,
    {
      value: {
        chartId,
        chartWidth: width,
        chartHeight: height - (showLegend ? legendHeight : 0)
      },
      children: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
        "div",
        {
          className: _clsx2.default.call(void 0, 
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
          "aria-label": _i18n.__.call(void 0, "Bar chart", "jetpack-charts"),
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
            /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
              _xychart.XYChart,
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
                  /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
                    _xychart.Grid,
                    {
                      columns: gridVisibility.includes("y"),
                      rows: gridVisibility.includes("x"),
                      numTicks: 4
                    }
                  ),
                  withPatterns && /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _jsxruntime.Fragment, { children: [
                    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "defs", { "data-testid": "bar-chart-patterns", children: dataSorted.map(
                      (seriesData, index) => renderPattern(index, getElementStyles({ data: seriesData, index }).color)
                    ) }),
                    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "style", { children: dataSorted.map(
                      (seriesData, index) => createPatternBorderStyle(
                        index,
                        getElementStyles({ data: seriesData, index }).color
                      )
                    ) })
                  ] }),
                  highlightedBarStyle && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "style", { children: highlightedBarStyle }),
                  allSeriesHidden ? /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
                    "text",
                    {
                      x: width / 2,
                      y: (height - (showLegend ? legendHeight : 0)) / 2,
                      textAnchor: "middle",
                      fill: _optionalChain([providerTheme, 'access', _26 => _26.gridStyles, 'optionalAccess', _27 => _27.stroke]) || "#ccc",
                      fontSize: "14",
                      fontFamily: "-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif",
                      children: _i18n.__.call(void 0, "All series are hidden. Click legend items to show data.", "jetpack-charts")
                    }
                  ) : null,
                  /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _xychart.BarGroup, { padding: chartOptions.barGroup.padding, children: seriesWithVisibility.map(({ series: seriesData, index, isVisible }) => {
                    if (!isVisible) {
                      return null;
                    }
                    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
                      _xychart.BarSeries,
                      {
                        dataKey: _optionalChain([seriesData, 'optionalAccess', _28 => _28.label]),
                        data: seriesData.data,
                        yAccessor: chartOptions.accessors.yAccessor,
                        xAccessor: chartOptions.accessors.xAccessor,
                        colorAccessor: getBarBackground(index)
                      },
                      _optionalChain([seriesData, 'optionalAccess', _29 => _29.label])
                    );
                  }) }),
                  /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _xychart.Axis, { ...chartOptions.axis.x }),
                  /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _xychart.Axis, { ...chartOptions.axis.y }),
                  withTooltips && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
                    _chunk7HROSZRScjs.AccessibleTooltip,
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
            showLegend && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
              _chunkZPJHWKEKcjs.Legend,
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
  const existingContext = _react.useContext.call(void 0, _chunkWKN6C4ZEcjs.GlobalChartsContext);
  if (existingContext) {
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, BarChartInternal, { ...props });
  }
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _chunkWKN6C4ZEcjs.GlobalChartsProvider, { children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, BarChartInternal, { ...props }) });
};
BarChartWithProvider.displayName = "BarChart";
var BarChart = _chunkZVGEDXDPcjs.attachSubComponents.call(void 0, BarChartWithProvider, {
  Legend: _chunkZPJHWKEKcjs.Legend
});
var BarChartResponsive = _chunkZVGEDXDPcjs.attachSubComponents.call(void 0, 
  _chunkMUUSZ7J5cjs.withResponsive.call(void 0, BarChartWithProvider),
  {
    Legend: _chunkZPJHWKEKcjs.Legend
  }
);




exports.BarChart = BarChart; exports.BarChartResponsive = BarChartResponsive;
//# sourceMappingURL=chunk-3E7IP2SY.cjs.map