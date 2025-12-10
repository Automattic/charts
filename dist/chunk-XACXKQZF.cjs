"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _chunkSDNRKKBPcjs = require('./chunk-SDNRKKBP.cjs');


var _chunk7HROSZRScjs = require('./chunk-7HROSZRS.cjs');




var _chunk3Z526IL2cjs = require('./chunk-3Z526IL2.cjs');


var _chunk5NI3TGRDcjs = require('./chunk-5NI3TGRD.cjs');




var _chunkPD4ADOLWcjs = require('./chunk-PD4ADOLW.cjs');









var _chunkOLHJTLY4cjs = require('./chunk-OLHJTLY4.cjs');


var _chunkFI5B6KSHcjs = require('./chunk-FI5B6KSH.cjs');

// src/components/pie-semi-circle-chart/pie-semi-circle-chart.tsx
var _event = require('@visx/event');
var _group = require('@visx/group');
var _shape = require('@visx/shape');
var _text = require('@visx/text');
var _tooltip = require('@visx/tooltip');
var _i18n = require('@wordpress/i18n');
var _clsx = require('clsx'); var _clsx2 = _interopRequireDefault(_clsx);
var _react = require('react');

// src/components/pie-semi-circle-chart/pie-semi-circle-chart.module.scss
var pie_semi_circle_chart_module_default = {
  "pie-semi-circle-chart": "a8ccharts-r5jk9c",
  "pie-semi-circle-chart--legend-top": "a8ccharts-XEH--U",
  "label": "a8ccharts-nPqOgD",
  "note": "a8ccharts-LpBZQh"
};

// src/components/pie-semi-circle-chart/pie-semi-circle-chart.tsx
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
  const chartId = _chunkOLHJTLY4cjs.useChartId.call(void 0, providedChartId);
  const [legendRef, legendHeight] = _chunkOLHJTLY4cjs.useElementHeight.call(void 0, );
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
  const { getElementStyles, isSeriesVisible } = _chunkOLHJTLY4cjs.useGlobalChartsContext.call(void 0, );
  const { visibleData, allSegmentsHidden, legendData } = _chunkOLHJTLY4cjs.useInteractiveLegendData.call(void 0, {
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
  const legendItems = _chunkPD4ADOLWcjs.useChartLegendItems.call(void 0, legendData, legendOptions);
  const { svgChildren, htmlChildren, otherChildren } = _chunk3Z526IL2cjs.useChartChildren.call(void 0, 
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
  _chunkOLHJTLY4cjs.useChartRegistration.call(void 0, {
    chartId,
    legendItems,
    chartType: "pie-semi-circle",
    isDataValid: isValid,
    metadata: chartMetadata
  });
  const prefersReducedMotion = _chunkOLHJTLY4cjs.usePrefersReducedMotion.call(void 0, );
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
    _chunkPD4ADOLWcjs.SingleChartContext.Provider,
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
                    _chunkSDNRKKBPcjs.radial_wipe_animation_default,
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
              _chunkPD4ADOLWcjs.Legend,
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
  const existingContext = _react.useContext.call(void 0, _chunkOLHJTLY4cjs.GlobalChartsContext);
  if (existingContext) {
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, PieSemiCircleChartInternal, { ...props });
  }
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _chunkOLHJTLY4cjs.GlobalChartsProvider, { children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, PieSemiCircleChartInternal, { ...props }) });
};
PieSemiCircleChartWithProvider.displayName = "PieSemiCircleChart";
var PieSemiCircleChart = _chunkFI5B6KSHcjs.attachSubComponents.call(void 0, PieSemiCircleChartWithProvider, {
  Legend: _chunkPD4ADOLWcjs.Legend,
  SVG: _chunk3Z526IL2cjs.ChartSVG,
  HTML: _chunk3Z526IL2cjs.ChartHTML
});
var PieSemiCircleChartResponsive = _chunkFI5B6KSHcjs.attachSubComponents.call(void 0, 
  _chunk5NI3TGRDcjs.withResponsive.call(void 0, PieSemiCircleChartWithProvider),
  {
    Legend: _chunkPD4ADOLWcjs.Legend,
    SVG: _chunk3Z526IL2cjs.ChartSVG,
    HTML: _chunk3Z526IL2cjs.ChartHTML
  }
);




exports.PieSemiCircleChart = PieSemiCircleChart; exports.PieSemiCircleChartResponsive = PieSemiCircleChartResponsive;
//# sourceMappingURL=chunk-XACXKQZF.cjs.map