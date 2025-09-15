"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _chunk7OZEQ5HEcjs = require('./chunk-7OZEQ5HE.cjs');




var _chunk3Z526IL2cjs = require('./chunk-3Z526IL2.cjs');


var _chunkH43FBWWZcjs = require('./chunk-H43FBWWZ.cjs');


var _chunkFX2PTUFCcjs = require('./chunk-FX2PTUFC.cjs');




var _chunkADMNTUXLcjs = require('./chunk-ADMNTUXL.cjs');










var _chunkYMPBXVE6cjs = require('./chunk-YMPBXVE6.cjs');

// src/components/pie-chart/pie-chart.tsx
var _group = require('@visx/group');
var _shape = require('@visx/shape');
var _clsx = require('clsx'); var _clsx2 = _interopRequireDefault(_clsx);
var _react = require('react');

// src/components/pie-chart/pie-chart.module.scss
var pie_chart_module_default = {
  "pie-chart": "a8ccharts-R12VhH"
};

// src/components/pie-chart/pie-chart.tsx
var _jsxruntime = require('react/jsx-runtime');
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
  legendShape = "circle",
  size,
  thickness = 1,
  padding = 20,
  gapScale = 0,
  cornerScale = 0,
  showLabels = true,
  legendValueDisplay = "percentage",
  children = null
}) => {
  const providerTheme = _chunkYMPBXVE6cjs.useGlobalChartsTheme.call(void 0, );
  const chartId = _chunkYMPBXVE6cjs.useChartId.call(void 0, providedChartId);
  const [legendRef, legendHeight] = _chunkYMPBXVE6cjs.useElementHeight.call(void 0, );
  const { onMouseMove, onMouseLeave, tooltipOpen, tooltipData, tooltipLeft, tooltipTop } = _chunkYMPBXVE6cjs.useChartMouseHandler.call(void 0, {
    withTooltips
  });
  const legendOptions = _react.useMemo.call(void 0, 
    () => ({ showValues: true, legendValueDisplay }),
    [legendValueDisplay]
  );
  const legendItems = _chunkADMNTUXLcjs.useChartLegendItems.call(void 0, data, legendOptions);
  const { isValid, message } = validateData(data);
  const { svgChildren, htmlChildren, otherChildren } = _chunk3Z526IL2cjs.useChartChildren.call(void 0, children, "PieChart");
  const chartMetadata = _react.useMemo.call(void 0, 
    () => ({
      thickness,
      gapScale,
      cornerScale
    }),
    [thickness, gapScale, cornerScale]
  );
  _chunkYMPBXVE6cjs.useChartRegistration.call(void 0, {
    chartId,
    legendItems,
    chartType: "pie",
    isDataValid: isValid,
    metadata: chartMetadata
  });
  const { resolveGroupColor } = _chunkYMPBXVE6cjs.useGlobalChartsContext.call(void 0, );
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
  const dataWithIndex = data.map((d, index) => ({
    ...d,
    index
  }));
  const accessors = {
    value: (d) => d.value,
    // Use the color property from the data object as a last resort. The theme provides colours by default.
    fill: ({ group, index, color: overrideColor }) => resolveGroupColor({ group, index, overrideColor })
  };
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
    _chunkADMNTUXLcjs.SingleChartContext.Provider,
    {
      value: {
        chartId,
        chartWidth: width,
        chartHeight: adjustedHeight
      },
      children: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
        "div",
        {
          className: _clsx2.default.call(void 0, "pie-chart", pie_chart_module_default["pie-chart"], className),
          style: {
            display: "flex",
            flexDirection: showLegend && legendPosition === "top" ? "column-reverse" : "column"
          },
          children: [
            /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
              "svg",
              {
                viewBox: `0 0 ${width} ${adjustedHeight}`,
                preserveAspectRatio: "xMidYMid meet",
                width,
                height: adjustedHeight,
                children: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _group.Group, { top: centerY, left: centerX, children: [
                  /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
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
                          const handleMouseMove = (event) => onMouseMove(event, arc.data);
                          const pathProps = {
                            d: pie.path(arc) || "",
                            fill: accessors.fill(arc.data)
                          };
                          if (withTooltips) {
                            pathProps.onMouseMove = handleMouseMove;
                            pathProps.onMouseLeave = onMouseLeave;
                          }
                          const fontSize = 12;
                          const estimatedTextWidth = _chunk7OZEQ5HEcjs.getStringWidth.call(void 0, arc.data.label, { fontSize });
                          const labelPadding = 6;
                          const backgroundWidth = estimatedTextWidth + labelPadding * 2;
                          const backgroundHeight = fontSize + labelPadding * 2;
                          return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "g", { children: [
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
                  svgChildren
                ] })
              }
            ),
            showLegend && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
              _chunkADMNTUXLcjs.Legend,
              {
                orientation: legendOrientation,
                position: legendPosition,
                alignment: legendAlignment,
                maxWidth: legendMaxWidth,
                textOverflow: legendTextOverflow,
                className: pie_chart_module_default["pie-chart-legend"],
                shape: legendShape,
                ref: legendRef,
                chartId
              }
            ),
            withTooltips && tooltipOpen && tooltipData && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
              _chunkH43FBWWZcjs.BaseTooltip,
              {
                data: tooltipData,
                top: tooltipTop || 0,
                left: tooltipLeft || 0,
                style: {
                  transform: "translate(-50%, -100%)"
                }
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
var PieChartWithProvider = (props) => {
  const existingContext = _react.useContext.call(void 0, _chunkYMPBXVE6cjs.GlobalChartsContext);
  if (existingContext) {
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, PieChartInternal, { ...props });
  }
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _chunkYMPBXVE6cjs.GlobalChartsProvider, { children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, PieChartInternal, { ...props }) });
};
PieChartWithProvider.displayName = "PieChart";
var PieChart = _chunkYMPBXVE6cjs.attachSubComponents.call(void 0, PieChartWithProvider, {
  Legend: _chunkADMNTUXLcjs.Legend,
  SVG: _chunk3Z526IL2cjs.ChartSVG,
  HTML: _chunk3Z526IL2cjs.ChartHTML
});
var PieChartResponsive = _chunkYMPBXVE6cjs.attachSubComponents.call(void 0, 
  _chunkFX2PTUFCcjs.withResponsive.call(void 0, PieChartWithProvider),
  {
    Legend: _chunkADMNTUXLcjs.Legend,
    SVG: _chunk3Z526IL2cjs.ChartSVG,
    HTML: _chunk3Z526IL2cjs.ChartHTML
  }
);




exports.PieChart = PieChart; exports.PieChartResponsive = PieChartResponsive;
//# sourceMappingURL=chunk-CITULG4E.cjs.map