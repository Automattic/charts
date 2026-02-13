"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _chunk7OZEQ5HEcjs = require('./chunk-7OZEQ5HE.cjs');


var _chunkOTZT3MC2cjs = require('./chunk-OTZT3MC2.cjs');


var _chunk7HROSZRScjs = require('./chunk-7HROSZRS.cjs');




var _chunkHIWNB5PKcjs = require('./chunk-HIWNB5PK.cjs');


var _chunkNW3RUYK2cjs = require('./chunk-NW3RUYK2.cjs');













var _chunkTVV7ZI7Ccjs = require('./chunk-TVV7ZI7C.cjs');


var _chunkZVGEDXDPcjs = require('./chunk-ZVGEDXDP.cjs');

// src/charts/pie-chart/pie-chart.tsx
var _group = require('@visx/group');
var _shape = require('@visx/shape');
var _tooltip = require('@visx/tooltip');
var _i18n = require('@wordpress/i18n');
var _clsx = require('clsx'); var _clsx2 = _interopRequireDefault(_clsx);
var _react = require('react');

// src/charts/pie-chart/pie-chart.module.scss
var pie_chart_module_default = {
  "pie-chart": "a8ccharts-C-n-Gu",
  "pie-chart--legend-top": "a8ccharts-Mu0uxl"
};

// src/charts/pie-chart/pie-chart.tsx
var _jsxruntime = require('react/jsx-runtime');
var renderDefaultPieTooltip = ({ tooltipData }) => {
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _chunk7HROSZRScjs.BaseTooltip, { data: tooltipData, top: 0, left: 0, renderContainer: false });
};
var validateData = (data) => {
  if (!data.length) {
    return { isValid: false, message: "No data available" };
  }
  const hasNegativeValues = data.some((item) => item.percentage < 0 || item.value < 0);
  if (hasNegativeValues) {
    return { isValid: false, message: "Invalid data: Negative values are not allowed" };
  }
  const totalPercentage = data.reduce((sum, item) => sum + item.percentage, 0);
  if (Math.abs(totalPercentage - 100) > 0.01) {
    return { isValid: false, message: "Invalid percentage total: Must equal 100" };
  }
  return { isValid: true, message: "" };
};
var PieChartInternal = ({
  data,
  chartId: providedChartId,
  withTooltips = false,
  className,
  showLegend = false,
  legendOrientation = "horizontal",
  legendPosition = "bottom",
  legendAlignment = "center",
  legendMaxWidth,
  legendTextOverflow = "wrap",
  legendItemClassName,
  legendShape = "circle",
  size,
  animation,
  thickness = 1,
  padding = 0,
  gapScale = 0,
  cornerScale = 0,
  showLabels = true,
  legendValueDisplay = "percentage",
  legendInteractive = false,
  children = null,
  tooltipOffsetX = 0,
  tooltipOffsetY = -15,
  renderTooltip = renderDefaultPieTooltip
}) => {
  const providerTheme = _chunkTVV7ZI7Ccjs.useGlobalChartsTheme.call(void 0, );
  const chartId = _chunkTVV7ZI7Ccjs.useChartId.call(void 0, providedChartId);
  const [legendRef, legendHeight] = _chunkTVV7ZI7Ccjs.useElementHeight.call(void 0, );
  const { tooltipOpen, tooltipLeft, tooltipTop, tooltipData, hideTooltip, showTooltip } = _tooltip.useTooltip.call(void 0, );
  const { containerRef, TooltipInPortal, containerBounds } = _tooltip.useTooltipInPortal.call(void 0, {
    detectBounds: true,
    scroll: true,
    debounce: 0
  });
  const onMouseLeave = _react.useCallback.call(void 0, () => {
    if (!withTooltips) {
      return;
    }
    hideTooltip();
  }, [withTooltips, hideTooltip]);
  const { getElementStyles, isSeriesVisible } = _chunkTVV7ZI7Ccjs.useGlobalChartsContext.call(void 0, );
  const { visibleData, allSegmentsHidden, legendData } = _chunkTVV7ZI7Ccjs.useInteractiveLegendData.call(void 0, {
    data,
    chartId,
    legendInteractive,
    isSeriesVisible
  });
  const legendOptions = _react.useMemo.call(void 0, 
    () => ({ showValues: true, legendValueDisplay }),
    [legendValueDisplay]
  );
  const legendItems = _chunkTVV7ZI7Ccjs.useChartLegendItems.call(void 0, legendData, legendOptions);
  const { isValid, message } = validateData(data);
  const { svgChildren, htmlChildren, otherChildren } = _chunkHIWNB5PKcjs.useChartChildren.call(void 0, children, "PieChart");
  const chartMetadata = _react.useMemo.call(void 0, 
    () => ({
      thickness,
      gapScale,
      cornerScale
    }),
    [thickness, gapScale, cornerScale]
  );
  _chunkTVV7ZI7Ccjs.useChartRegistration.call(void 0, {
    chartId,
    legendItems,
    chartType: "pie",
    isDataValid: isValid,
    metadata: chartMetadata
  });
  const prefersReducedMotion = _chunkTVV7ZI7Ccjs.usePrefersReducedMotion.call(void 0, );
  if (!isValid) {
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: _clsx2.default.call(void 0, "pie-chart", pie_chart_module_default["pie-chart"], className), children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: pie_chart_module_default["error-message"], children: message }) });
  }
  const width = size;
  const height = size;
  const adjustedHeight = showLegend && legendPosition === "top" ? height - legendHeight : height;
  const radius = Math.min(width, adjustedHeight) / 2;
  const centerX = width / 2;
  const centerY = adjustedHeight / 2;
  const padAngle = gapScale * (2 * Math.PI / data.length);
  const outerRadius = radius - padding;
  const innerRadius = thickness === 0 ? 0 : outerRadius * (1 - thickness);
  const maxCornerRadius = (outerRadius - innerRadius) / 2;
  const cornerRadius = cornerScale ? Math.min(cornerScale * outerRadius, maxCornerRadius) : 0;
  const dataWithIndex = visibleData.map((d) => {
    const originalIndex = data.findIndex((item) => item.label === d.label);
    return {
      ...d,
      index: originalIndex >= 0 ? originalIndex : 0
    };
  });
  const accessors = {
    value: (d) => d.value,
    fill: (d) => {
      return getElementStyles({ data: d, index: d.index }).color;
    }
  };
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
    _chunkTVV7ZI7Ccjs.SingleChartContext.Provider,
    {
      value: {
        chartId,
        chartWidth: width,
        chartHeight: adjustedHeight
      },
      children: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
        "div",
        {
          ref: containerRef,
          className: _clsx2.default.call(void 0, 
            "pie-chart",
            pie_chart_module_default["pie-chart"],
            { [pie_chart_module_default["pie-chart--legend-top"]]: showLegend && legendPosition === "top" },
            className
          ),
          children: [
            /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
              "svg",
              {
                viewBox: `0 0 ${width} ${adjustedHeight}`,
                preserveAspectRatio: "xMidYMid meet",
                width,
                height: adjustedHeight,
                children: [
                  /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "defs", { children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
                    _chunkOTZT3MC2cjs.radial_wipe_animation_default,
                    {
                      id: `radial-wipe-${chartId}`,
                      radius: outerRadius,
                      innerRadius
                    }
                  ) }),
                  /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
                    _group.Group,
                    {
                      top: centerY,
                      left: centerX,
                      mask: animation && !prefersReducedMotion ? `url(#radial-wipe-${chartId})` : null,
                      children: [
                        allSegmentsHidden ? /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
                          "text",
                          {
                            textAnchor: "middle",
                            dy: ".33em",
                            fill: providerTheme.gridColor || "#ccc",
                            fontSize: "14",
                            fontFamily: "-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif",
                            children: _i18n.__.call(void 0, 
                              "All segments are hidden. Click legend items to show data.",
                              "jetpack-charts"
                            )
                          }
                        ) : /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
                          _shape.Pie,
                          {
                            data: dataWithIndex,
                            pieValue: accessors.value,
                            outerRadius,
                            innerRadius,
                            padAngle,
                            cornerRadius,
                            children: (pie) => {
                              return pie.arcs.map((arc, index) => {
                                const [centroidX, centroidY] = pie.path.centroid(arc);
                                const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.25;
                                const handleMouseMove = (event) => {
                                  if (!withTooltips) {
                                    return;
                                  }
                                  if (containerBounds.width === 0 || containerBounds.height === 0) {
                                    return;
                                  }
                                  showTooltip({
                                    tooltipData: arc.data,
                                    tooltipLeft: event.clientX - containerBounds.left + tooltipOffsetX,
                                    tooltipTop: event.clientY - containerBounds.top + tooltipOffsetY
                                  });
                                };
                                const pathProps = {
                                  d: pie.path(arc) || "",
                                  fill: accessors.fill(arc.data),
                                  "data-testid": "pie-segment"
                                };
                                const groupProps = {};
                                if (withTooltips) {
                                  groupProps.onMouseMove = handleMouseMove;
                                  groupProps.onMouseLeave = onMouseLeave;
                                }
                                const fontSize = 12;
                                const estimatedTextWidth = _chunk7OZEQ5HEcjs.getStringWidth.call(void 0, arc.data.label, { fontSize });
                                const labelPadding = 6;
                                const backgroundWidth = estimatedTextWidth + labelPadding * 2;
                                const backgroundHeight = fontSize + labelPadding * 2;
                                return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "g", { ...groupProps, children: [
                                  /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "path", { ...pathProps }),
                                  showLabels && hasSpaceForLabel && /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "g", { children: [
                                    providerTheme.labelBackgroundColor && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
                                      "rect",
                                      {
                                        x: centroidX - backgroundWidth / 2,
                                        y: centroidY - backgroundHeight / 2,
                                        width: backgroundWidth,
                                        height: backgroundHeight,
                                        fill: providerTheme.labelBackgroundColor,
                                        rx: 4,
                                        ry: 4,
                                        pointerEvents: "none"
                                      }
                                    ),
                                    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
                                      "text",
                                      {
                                        x: centroidX,
                                        y: centroidY,
                                        dy: ".33em",
                                        fill: providerTheme.labelTextColor || "#333",
                                        fontSize,
                                        textAnchor: "middle",
                                        pointerEvents: "none",
                                        children: arc.data.label
                                      }
                                    )
                                  ] })
                                ] }, `arc-${index}`);
                              });
                            }
                          }
                        ),
                        !allSegmentsHidden && svgChildren
                      ]
                    }
                  )
                ]
              }
            ),
            showLegend && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
              _chunkTVV7ZI7Ccjs.Legend,
              {
                orientation: legendOrientation,
                position: legendPosition,
                alignment: legendAlignment,
                maxWidth: legendMaxWidth,
                textOverflow: legendTextOverflow,
                legendItemClassName,
                className: pie_chart_module_default["pie-chart-legend"],
                shape: legendShape,
                ref: legendRef,
                chartId,
                interactive: legendInteractive
              }
            ),
            withTooltips && tooltipOpen && tooltipData && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, TooltipInPortal, { top: tooltipTop || 0, left: tooltipLeft || 0, children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { role: "tooltip", children: renderTooltip({ tooltipData }) }) }),
            htmlChildren,
            otherChildren
          ]
        }
      )
    }
  );
};
var PieChartWithProvider = (props) => {
  const existingContext = _react.useContext.call(void 0, _chunkTVV7ZI7Ccjs.GlobalChartsContext);
  if (existingContext) {
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, PieChartInternal, { ...props });
  }
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _chunkTVV7ZI7Ccjs.GlobalChartsProvider, { children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, PieChartInternal, { ...props }) });
};
PieChartWithProvider.displayName = "PieChart";
var PieChart = _chunkZVGEDXDPcjs.attachSubComponents.call(void 0, PieChartWithProvider, {
  Legend: _chunkTVV7ZI7Ccjs.Legend,
  SVG: _chunkHIWNB5PKcjs.ChartSVG,
  HTML: _chunkHIWNB5PKcjs.ChartHTML
});
var PieChartResponsive = _chunkZVGEDXDPcjs.attachSubComponents.call(void 0, 
  _chunkNW3RUYK2cjs.withResponsive.call(void 0, PieChartWithProvider),
  {
    Legend: _chunkTVV7ZI7Ccjs.Legend,
    SVG: _chunkHIWNB5PKcjs.ChartSVG,
    HTML: _chunkHIWNB5PKcjs.ChartHTML
  }
);




exports.PieChart = PieChart; exports.PieChartResponsive = PieChartResponsive;
//# sourceMappingURL=chunk-CKFZWTKJ.cjs.map