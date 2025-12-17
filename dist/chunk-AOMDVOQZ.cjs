"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _chunkOTZT3MC2cjs = require('./chunk-OTZT3MC2.cjs');




var _chunkHIWNB5PKcjs = require('./chunk-HIWNB5PK.cjs');


var _chunkMUUSZ7J5cjs = require('./chunk-MUUSZ7J5.cjs');




var _chunkNYZFVI2Pcjs = require('./chunk-NYZFVI2P.cjs');









var _chunkW3H42XRVcjs = require('./chunk-W3H42XRV.cjs');


var _chunkDAKYGZG6cjs = require('./chunk-DAKYGZG6.cjs');


var _chunk7HROSZRScjs = require('./chunk-7HROSZRS.cjs');

// src/charts/pie-semi-circle-chart/pie-semi-circle-chart.tsx
var _event = require('@visx/event');
var _group = require('@visx/group');
var _shape = require('@visx/shape');
var _text = require('@visx/text');
var _tooltip = require('@visx/tooltip');
var _i18n = require('@wordpress/i18n');
var _clsx = require('clsx'); var _clsx2 = _interopRequireDefault(_clsx);
var _react = require('react');

// src/charts/pie-semi-circle-chart/pie-semi-circle-chart.module.scss
var pie_semi_circle_chart_module_default = {
  "pie-semi-circle-chart": "a8ccharts-8tyaQj",
  "pie-semi-circle-chart--legend-top": "a8ccharts-M1lF7A",
  "label": "a8ccharts-EKZS3j",
  "note": "a8ccharts-v85A8-"
};

// src/charts/pie-semi-circle-chart/pie-semi-circle-chart.tsx
var _jsxruntime = require('react/jsx-runtime');
var PAD_ANGLE = 0.03;
var validateData = (data) => {
  if (!data.length) {
    return { isValid: false, message: "No data available" };
  }
  const hasNegativeValues = data.some((item) => item.percentage < 0 || item.value < 0);
  if (hasNegativeValues) {
    return { isValid: false, message: "Invalid data: Negative values are not allowed" };
  }
  const totalPercentage = data.reduce((sum, item) => sum + item.percentage, 0);
  if (totalPercentage <= 0) {
    return { isValid: false, message: "Invalid percentage total: Must be greater than 0" };
  }
  return { isValid: true, message: "" };
};
var PieSemiCircleChartInternal = ({
  data,
  chartId: providedChartId,
  width = 400,
  thickness = 0.4,
  clockwise = true,
  withTooltips = false,
  showLegend = false,
  legendOrientation = "horizontal",
  legendPosition = "bottom",
  legendAlignment = "center",
  legendMaxWidth,
  legendTextOverflow = "wrap",
  legendItemClassName,
  legendShape = "circle",
  legendValueDisplay = "percentage",
  legendInteractive = false,
  label,
  animation,
  note,
  className,
  children,
  tooltipOffsetX = 0,
  tooltipOffsetY = -15
}) => {
  const chartId = _chunkW3H42XRVcjs.useChartId.call(void 0, providedChartId);
  const [legendRef, legendHeight] = _chunkW3H42XRVcjs.useElementHeight.call(void 0, );
  const { tooltipOpen, tooltipLeft, tooltipTop, tooltipData, hideTooltip, showTooltip } = _tooltip.useTooltip.call(void 0, );
  const { containerRef, TooltipInPortal } = _tooltip.useTooltipInPortal.call(void 0, {
    detectBounds: true,
    scroll: true,
    debounce: 0
  });
  const handleMouseMove = _react.useCallback.call(void 0, 
    (event, arc) => {
      const coords = _event.localPoint.call(void 0, event);
      if (coords) {
        const legendOffset = showLegend && legendPosition === "top" ? legendHeight : 0;
        showTooltip({
          tooltipData: arc.data,
          tooltipLeft: coords.x + tooltipOffsetX,
          tooltipTop: coords.y + legendOffset + tooltipOffsetY
        });
      }
    },
    [showTooltip, tooltipOffsetX, tooltipOffsetY, showLegend, legendPosition, legendHeight]
  );
  const handleMouseLeave = _react.useCallback.call(void 0, () => {
    hideTooltip();
  }, [hideTooltip]);
  const handleArcMouseMove = _react.useCallback.call(void 0, 
    (arc) => (event) => {
      handleMouseMove(event, arc);
    },
    [handleMouseMove]
  );
  const { isValid, message } = validateData(data);
  const { getElementStyles, isSeriesVisible } = _chunkW3H42XRVcjs.useGlobalChartsContext.call(void 0, );
  const { visibleData, allSegmentsHidden, legendData } = _chunkW3H42XRVcjs.useInteractiveLegendData.call(void 0, {
    data,
    chartId,
    legendInteractive,
    isSeriesVisible
  });
  const accessors = _react.useMemo.call(void 0, 
    () => ({
      value: (d) => d.value,
      sort: (a, b) => b.value - a.value,
      fill: (d) => getElementStyles({ data: d, index: d.index }).color
    }),
    [getElementStyles]
  );
  const legendOptions = _react.useMemo.call(void 0, 
    () => ({ showValues: true, legendValueDisplay }),
    [legendValueDisplay]
  );
  const legendItems = _chunkNYZFVI2Pcjs.useChartLegendItems.call(void 0, legendData, legendOptions);
  const { svgChildren, htmlChildren, otherChildren } = _chunkHIWNB5PKcjs.useChartChildren.call(void 0, 
    children,
    "PieSemiCircleChart"
  );
  const chartMetadata = _react.useMemo.call(void 0, 
    () => ({
      thickness,
      clockwise
    }),
    [thickness, clockwise]
  );
  _chunkW3H42XRVcjs.useChartRegistration.call(void 0, {
    chartId,
    legendItems,
    chartType: "pie-semi-circle",
    isDataValid: isValid,
    metadata: chartMetadata
  });
  const prefersReducedMotion = _chunkW3H42XRVcjs.usePrefersReducedMotion.call(void 0, );
  if (!isValid) {
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: pie_semi_circle_chart_module_default["pie-semi-circle-chart"], children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "svg", { width, height: width / 2, "data-testid": "pie-chart-svg", children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "text", { x: "50%", y: "50%", textAnchor: "middle", className: pie_semi_circle_chart_module_default.error, children: message }) }) });
  }
  const height = width / 2;
  const chartHeight = height - (showLegend && legendPosition === "top" ? legendHeight : 0);
  const radius = Math.min(width / 2, chartHeight);
  const innerRadius = radius * (1 - thickness);
  const dataWithIndex = visibleData.map((d) => {
    const originalIndex = data.findIndex((item) => item.label === d.label);
    return {
      ...d,
      index: originalIndex >= 0 ? originalIndex : 0
    };
  });
  const startAngle = clockwise ? -Math.PI / 2 : Math.PI / 2;
  const endAngle = clockwise ? Math.PI / 2 : -Math.PI / 2;
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
    _chunkNYZFVI2Pcjs.SingleChartContext.Provider,
    {
      value: {
        chartId,
        chartWidth: width,
        chartHeight: radius
      },
      children: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
        "div",
        {
          ref: containerRef,
          className: _clsx2.default.call(void 0, 
            "pie-semi-circle-chart",
            pie_semi_circle_chart_module_default["pie-semi-circle-chart"],
            {
              [pie_semi_circle_chart_module_default["pie-semi-circle-chart--legend-top"]]: showLegend && legendPosition === "top"
            },
            className
          ),
          "data-testid": "pie-chart-container",
          children: [
            /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
              "svg",
              {
                width,
                height: radius,
                viewBox: `0 0 ${width} ${chartHeight}`,
                "data-testid": "pie-chart-svg",
                children: [
                  /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "defs", { children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
                    _chunkOTZT3MC2cjs.radial_wipe_animation_default,
                    {
                      id: `radial-wipe-${chartId}`,
                      radius,
                      innerRadius,
                      startAngle: "-180deg",
                      wipePercentage: 50
                    }
                  ) }),
                  /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
                    _group.Group,
                    {
                      top: chartHeight,
                      left: width / 2,
                      mask: animation && !prefersReducedMotion ? `url(#radial-wipe-${chartId})` : null,
                      children: allSegmentsHidden ? /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
                        "text",
                        {
                          textAnchor: "middle",
                          y: -radius / 2,
                          fill: "#ccc",
                          fontSize: "14",
                          fontFamily: "-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif",
                          children: _i18n.__.call(void 0, 
                            "All segments are hidden. Click legend items to show data.",
                            "jetpack-charts"
                          )
                        }
                      ) : /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _jsxruntime.Fragment, { children: [
                        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
                          _shape.Pie,
                          {
                            data: dataWithIndex,
                            pieValue: accessors.value,
                            outerRadius: radius,
                            innerRadius,
                            cornerRadius: 3,
                            padAngle: PAD_ANGLE,
                            startAngle,
                            endAngle,
                            pieSort: accessors.sort,
                            children: (pie) => {
                              return pie.arcs.map((arc) => /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
                                "g",
                                {
                                  onMouseMove: withTooltips ? handleArcMouseMove(arc) : void 0,
                                  onMouseLeave: withTooltips ? handleMouseLeave : void 0,
                                  children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
                                    "path",
                                    {
                                      d: pie.path(arc) || "",
                                      fill: accessors.fill(arc.data),
                                      "data-testid": "pie-segment"
                                    }
                                  )
                                },
                                arc.data.label
                              ));
                            }
                          }
                        ),
                        /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _group.Group, { children: [
                          /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
                            _text.Text,
                            {
                              textAnchor: "middle",
                              verticalAnchor: "start",
                              y: -40,
                              className: pie_semi_circle_chart_module_default.label,
                              children: label
                            }
                          ),
                          /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
                            _text.Text,
                            {
                              textAnchor: "middle",
                              verticalAnchor: "start",
                              y: -20,
                              className: pie_semi_circle_chart_module_default.note,
                              children: note
                            }
                          )
                        ] }),
                        !allSegmentsHidden && svgChildren
                      ] })
                    }
                  )
                ]
              }
            ),
            withTooltips && tooltipOpen && tooltipData && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, TooltipInPortal, { top: tooltipTop || 0, left: tooltipLeft || 0, children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { role: "tooltip", children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _chunk7HROSZRScjs.BaseTooltip, { data: tooltipData, top: 0, left: 0, renderContainer: false }) }) }),
            showLegend && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
              _chunkNYZFVI2Pcjs.Legend,
              {
                orientation: legendOrientation,
                position: legendPosition,
                alignment: legendAlignment,
                maxWidth: legendMaxWidth,
                textOverflow: legendTextOverflow,
                legendItemClassName,
                shape: legendShape,
                ref: legendRef,
                chartId,
                interactive: legendInteractive
              }
            ),
            htmlChildren,
            otherChildren
          ]
        }
      )
    }
  );
};
var PieSemiCircleChartWithProvider = (props) => {
  const existingContext = _react.useContext.call(void 0, _chunkW3H42XRVcjs.GlobalChartsContext);
  if (existingContext) {
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, PieSemiCircleChartInternal, { ...props });
  }
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _chunkW3H42XRVcjs.GlobalChartsProvider, { children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, PieSemiCircleChartInternal, { ...props }) });
};
PieSemiCircleChartWithProvider.displayName = "PieSemiCircleChart";
var PieSemiCircleChart = _chunkDAKYGZG6cjs.attachSubComponents.call(void 0, PieSemiCircleChartWithProvider, {
  Legend: _chunkNYZFVI2Pcjs.Legend,
  SVG: _chunkHIWNB5PKcjs.ChartSVG,
  HTML: _chunkHIWNB5PKcjs.ChartHTML
});
var PieSemiCircleChartResponsive = _chunkDAKYGZG6cjs.attachSubComponents.call(void 0, 
  _chunkMUUSZ7J5cjs.withResponsive.call(void 0, PieSemiCircleChartWithProvider),
  {
    Legend: _chunkNYZFVI2Pcjs.Legend,
    SVG: _chunkHIWNB5PKcjs.ChartSVG,
    HTML: _chunkHIWNB5PKcjs.ChartHTML
  }
);




exports.PieSemiCircleChart = PieSemiCircleChart; exports.PieSemiCircleChartResponsive = PieSemiCircleChartResponsive;
//# sourceMappingURL=chunk-AOMDVOQZ.cjs.map