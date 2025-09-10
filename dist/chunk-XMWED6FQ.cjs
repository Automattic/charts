"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkFX2PTUFCcjs = require('./chunk-FX2PTUFC.cjs');



var _chunkH43FBWWZcjs = require('./chunk-H43FBWWZ.cjs');




var _chunkSLF2F4AOcjs = require('./chunk-SLF2F4AO.cjs');












var _chunkP6GF5KEQcjs = require('./chunk-P6GF5KEQ.cjs');

// src/components/bar-chart/bar-chart.tsx
var _pattern = require('@visx/pattern');
var _xychart = require('@visx/xychart');
var _i18n = require('@wordpress/i18n');
var _clsx = require('clsx'); var _clsx2 = _interopRequireDefault(_clsx);
var _react = require('react');

// src/components/bar-chart/bar-chart.module.scss
var bar_chart_module_default = {
  "bar-chart": "a8ccharts-lmYNi-",
  "bar-chart-legend": "a8ccharts-vgKKqG"
};

// src/components/bar-chart/private/use-bar-chart-options.ts
var _numberformatters = require('@automattic/number-formatters');

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
          ..._optionalChain([options, 'access', _15 => _15.axis, 'optionalAccess', _16 => _16.x]) || {}
        },
        y: {
          orientation: "left",
          numTicks: 4,
          tickFormat: yTickFormat,
          ..._optionalChain([options, 'access', _17 => _17.axis, 'optionalAccess', _18 => _18.y]) || {}
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

// src/components/bar-chart/bar-chart.tsx
var _jsxruntime = require('react/jsx-runtime');
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
  legendShape = "rect",
  gridVisibility: gridVisibilityProp,
  renderTooltip,
  options = {},
  orientation = "vertical",
  withPatterns = false,
  showZeroValues = false,
  children
}) => {
  const horizontal = orientation === "horizontal";
  const chartId = _chunkP6GF5KEQcjs.useChartId.call(void 0, providedChartId);
  const theme = _chunkP6GF5KEQcjs.useXYChartTheme.call(void 0, data);
  const dataSorted = _chunkP6GF5KEQcjs.useChartDataTransform.call(void 0, data);
  const dataWithVisibleZeros = _chunkP6GF5KEQcjs.useZeroValueDisplay.call(void 0, dataSorted, {
    enabled: showZeroValues
  });
  const legendItems = _chunkSLF2F4AOcjs.useChartLegendItems.call(void 0, dataSorted);
  const chartOptions = useBarChartOptions(dataWithVisibleZeros, horizontal, options);
  const defaultMargin = _chunkP6GF5KEQcjs.useChartMargin.call(void 0, height, chartOptions, dataSorted, theme, horizontal);
  const [legendRef, legendHeight] = _chunkP6GF5KEQcjs.useElementHeight.call(void 0, );
  const chartRef = _react.useRef.call(void 0, null);
  const [selectedIndex, setSelectedIndex] = _react.useState.call(void 0, void 0);
  const [isNavigating, setIsNavigating] = _react.useState.call(void 0, false);
  const totalPoints = Math.max(0, ...data.map((series) => _optionalChain([series, 'access', _20 => _20.data, 'optionalAccess', _21 => _21.length]) || 0)) * data.length;
  const { tooltipRef, onChartFocus, onChartBlur, onChartKeyDown } = _chunkH43FBWWZcjs.useKeyboardNavigation.call(void 0, {
    selectedIndex,
    setSelectedIndex,
    isNavigating,
    setIsNavigating,
    chartRef,
    totalPoints
  });
  const { resolveGroupColor } = _chunkP6GF5KEQcjs.useGlobalChartsContext.call(void 0, );
  const getColor = _react.useCallback.call(void 0, 
    (seriesData, index) => resolveGroupColor({
      group: seriesData.group,
      index,
      overrideColor: _optionalChain([seriesData, 'access', _22 => _22.options, 'optionalAccess', _23 => _23.stroke])
    }),
    [resolveGroupColor]
  );
  const getBarBackground = _react.useCallback.call(void 0, 
    (index) => () => withPatterns ? `url(#${getPatternId(chartId, index)})` : getColor(dataSorted[index], index),
    [withPatterns, getColor, dataSorted, chartId]
  );
  const renderDefaultTooltip = _react.useCallback.call(void 0, 
    ({ tooltipData }) => {
      const nearestDatum = _optionalChain([tooltipData, 'optionalAccess', _24 => _24.nearestDatum, 'optionalAccess', _25 => _25.datum]);
      if (!nearestDatum) return null;
      return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: bar_chart_module_default["bar-chart__tooltip"], children: [
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: bar_chart_module_default["bar-chart__tooltip-header"], children: _optionalChain([tooltipData, 'optionalAccess', _26 => _26.nearestDatum, 'optionalAccess', _27 => _27.key]) }),
        /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: bar_chart_module_default["bar-chart__tooltip-row"], children: [
          /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "span", { className: bar_chart_module_default["bar-chart__tooltip-label"], children: [
            chartOptions.tooltip.labelFormatter(
              nearestDatum.label || (nearestDatum.date ? nearestDatum.date.getTime() : 0),
              0,
              []
            ),
            ":"
          ] }),
          /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: bar_chart_module_default["bar-chart__tooltip-value"], children: nearestDatum.value })
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
  _chunkP6GF5KEQcjs.useChartRegistration.call(void 0, {
    chartId,
    legendItems,
    chartType: "bar",
    isDataValid,
    metadata: chartMetadata
  });
  if (error) {
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: _clsx2.default.call(void 0, "bar-chart", bar_chart_module_default["bar-chart"]), children: error });
  }
  const gridVisibility = _nullishCoalesce(gridVisibilityProp, () => ( chartOptions.gridVisibility));
  const highlightedBarStyle = createKeyboardHighlightStyle();
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
    _chunkSLF2F4AOcjs.SingleChartContext.Provider,
    {
      value: {
        chartId,
        chartWidth: width,
        chartHeight: height - (showLegend ? legendHeight : 0)
      },
      children: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
        "div",
        {
          className: _clsx2.default.call(void 0, "bar-chart", bar_chart_module_default["bar-chart"], className),
          "data-testid": "bar-chart",
          role: "grid",
          "aria-label": _i18n.__.call(void 0, "Bar chart", "jetpack-charts"),
          style: {
            width,
            height,
            display: "flex",
            flexDirection: showLegend && legendPosition === "top" ? "column-reverse" : "column"
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
                      (seriesData, index) => renderPattern(index, getColor(seriesData, index))
                    ) }),
                    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "style", { children: dataSorted.map(
                      (seriesData, index) => createPatternBorderStyle(index, getColor(seriesData, index))
                    ) })
                  ] }),
                  highlightedBarStyle && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "style", { children: highlightedBarStyle }),
                  /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _xychart.BarGroup, { padding: chartOptions.barGroup.padding, children: dataWithVisibleZeros.map((seriesData, index) => /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
                    _xychart.BarSeries,
                    {
                      dataKey: _optionalChain([seriesData, 'optionalAccess', _28 => _28.label]),
                      data: seriesData.data,
                      yAccessor: chartOptions.accessors.yAccessor,
                      xAccessor: chartOptions.accessors.xAccessor,
                      colorAccessor: getBarBackground(index)
                    },
                    _optionalChain([seriesData, 'optionalAccess', _29 => _29.label])
                  )) }),
                  /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _xychart.Axis, { ...chartOptions.axis.x }),
                  /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _xychart.Axis, { ...chartOptions.axis.y }),
                  withTooltips && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
                    _chunkH43FBWWZcjs.AccessibleTooltip,
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
              _chunkSLF2F4AOcjs.Legend,
              {
                orientation: legendOrientation,
                position: legendPosition,
                alignment: legendAlignment,
                className: bar_chart_module_default["bar-chart__legend"],
                shape: legendShape,
                ref: legendRef,
                chartId
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
  const existingContext = _react.useContext.call(void 0, _chunkP6GF5KEQcjs.GlobalChartsContext);
  if (existingContext) {
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, BarChartInternal, { ...props });
  }
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _chunkP6GF5KEQcjs.GlobalChartsProvider, { children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, BarChartInternal, { ...props }) });
};
BarChartWithProvider.displayName = "BarChart";
var BarChart = _chunkP6GF5KEQcjs.attachSubComponents.call(void 0, BarChartWithProvider, {
  Legend: _chunkSLF2F4AOcjs.Legend
});
var BarChartResponsive = _chunkP6GF5KEQcjs.attachSubComponents.call(void 0, 
  _chunkFX2PTUFCcjs.withResponsive.call(void 0, BarChartWithProvider),
  {
    Legend: _chunkSLF2F4AOcjs.Legend
  }
);




exports.BarChart = BarChart; exports.BarChartResponsive = BarChartResponsive;
//# sourceMappingURL=chunk-XMWED6FQ.cjs.map