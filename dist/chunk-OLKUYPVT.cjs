"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _chunkH43FBWWZcjs = require('./chunk-H43FBWWZ.cjs');




var _chunk3Z526IL2cjs = require('./chunk-3Z526IL2.cjs');


var _chunkFX2PTUFCcjs = require('./chunk-FX2PTUFC.cjs');




var _chunkSLF2F4AOcjs = require('./chunk-SLF2F4AO.cjs');








var _chunkP6GF5KEQcjs = require('./chunk-P6GF5KEQ.cjs');

// src/components/pie-semi-circle-chart/pie-semi-circle-chart.tsx
var _event = require('@visx/event');
var _group = require('@visx/group');
var _shape = require('@visx/shape');
var _text = require('@visx/text');
var _tooltip = require('@visx/tooltip');
var _clsx = require('clsx'); var _clsx2 = _interopRequireDefault(_clsx);
var _react = require('react');

// src/components/pie-semi-circle-chart/pie-semi-circle-chart.module.scss
var pie_semi_circle_chart_module_default = {
  "pie-semi-circle-chart": "a8ccharts-r5jk9c",
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
  legendShape = "circle",
  legendValueDisplay = "percentage",
  label,
  note,
  className,
  children
}) => {
  const chartId = _chunkP6GF5KEQcjs.useChartId.call(void 0, providedChartId);
  const [legendRef, legendHeight] = _chunkP6GF5KEQcjs.useElementHeight.call(void 0, );
  const { tooltipOpen, tooltipLeft, tooltipTop, tooltipData, hideTooltip, showTooltip } = _tooltip.useTooltip.call(void 0, );
  const handleMouseMove = _react.useCallback.call(void 0, 
    (event, arc) => {
      const coords = _event.localPoint.call(void 0, event);
      if (!coords) return;
      showTooltip({
        tooltipData: arc.data,
        tooltipLeft: coords.x,
        tooltipTop: coords.y - 10
      });
    },
    [showTooltip]
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
  const { resolveGroupColor } = _chunkP6GF5KEQcjs.useGlobalChartsContext.call(void 0, );
  const accessors = _react.useMemo.call(void 0, 
    () => ({
      value: (d) => d.value,
      sort: (a, b) => b.value - a.value,
      fill: ({ group, index, color: overrideColor }) => resolveGroupColor({ group, index, overrideColor })
    }),
    [resolveGroupColor]
  );
  const legendOptions = _react.useMemo.call(void 0, 
    () => ({ showValues: true, legendValueDisplay }),
    [legendValueDisplay]
  );
  const legendItems = _chunkSLF2F4AOcjs.useChartLegendItems.call(void 0, data, legendOptions);
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
  _chunkP6GF5KEQcjs.useChartRegistration.call(void 0, {
    chartId,
    legendItems,
    chartType: "pie-semi-circle",
    isDataValid: isValid,
    metadata: chartMetadata
  });
  if (!isValid) {
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: pie_semi_circle_chart_module_default["pie-semi-circle-chart"], children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "svg", { width, height: width / 2, "data-testid": "pie-chart-svg", children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "text", { x: "50%", y: "50%", textAnchor: "middle", className: pie_semi_circle_chart_module_default.error, children: message }) }) });
  }
  const height = width / 2;
  const chartHeight = height - (showLegend && legendPosition === "top" ? legendHeight : 0);
  const radius = Math.min(width / 2, chartHeight);
  const innerRadius = radius * (1 - thickness);
  const dataWithIndex = data.map((d, index) => ({
    ...d,
    index
  }));
  const startAngle = clockwise ? -Math.PI / 2 : Math.PI / 2;
  const endAngle = clockwise ? Math.PI / 2 : -Math.PI / 2;
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
    _chunkSLF2F4AOcjs.SingleChartContext.Provider,
    {
      value: {
        chartId,
        chartWidth: width,
        chartHeight: radius
      },
      children: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
        "div",
        {
          className: _clsx2.default.call(void 0, "pie-semi-circle-chart", pie_semi_circle_chart_module_default["pie-semi-circle-chart"], className),
          "data-testid": "pie-chart-container",
          style: {
            display: "flex",
            flexDirection: showLegend && legendPosition === "top" ? "column-reverse" : "column"
          },
          children: [
            /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
              "svg",
              {
                width,
                height: radius,
                viewBox: `0 0 ${width} ${chartHeight}`,
                "data-testid": "pie-chart-svg",
                children: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _group.Group, { top: chartHeight, left: width / 2, children: [
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
                            onMouseMove: handleArcMouseMove(arc),
                            onMouseLeave: handleMouseLeave,
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
                  svgChildren
                ] })
              }
            ),
            withTooltips && tooltipOpen && tooltipData && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
              _chunkH43FBWWZcjs.BaseTooltip,
              {
                data: {
                  label: tooltipData.label,
                  value: tooltipData.value,
                  valueDisplay: tooltipData.valueDisplay
                },
                top: tooltipTop || 0,
                left: tooltipLeft || 0
              }
            ),
            showLegend && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
              _chunkSLF2F4AOcjs.Legend,
              {
                orientation: legendOrientation,
                position: legendPosition,
                alignment: legendAlignment,
                shape: legendShape,
                ref: legendRef,
                chartId
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
  const existingContext = _react.useContext.call(void 0, _chunkP6GF5KEQcjs.GlobalChartsContext);
  if (existingContext) {
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, PieSemiCircleChartInternal, { ...props });
  }
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _chunkP6GF5KEQcjs.GlobalChartsProvider, { children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, PieSemiCircleChartInternal, { ...props }) });
};
PieSemiCircleChartWithProvider.displayName = "PieSemiCircleChart";
var PieSemiCircleChart = _chunkP6GF5KEQcjs.attachSubComponents.call(void 0, PieSemiCircleChartWithProvider, {
  Legend: _chunkSLF2F4AOcjs.Legend,
  SVG: _chunk3Z526IL2cjs.ChartSVG,
  HTML: _chunk3Z526IL2cjs.ChartHTML
});
var PieSemiCircleChartResponsive = _chunkP6GF5KEQcjs.attachSubComponents.call(void 0, 
  _chunkFX2PTUFCcjs.withResponsive.call(void 0, PieSemiCircleChartWithProvider),
  {
    Legend: _chunkSLF2F4AOcjs.Legend,
    SVG: _chunk3Z526IL2cjs.ChartSVG,
    HTML: _chunk3Z526IL2cjs.ChartHTML
  }
);




exports.PieSemiCircleChart = PieSemiCircleChart; exports.PieSemiCircleChartResponsive = PieSemiCircleChartResponsive;
//# sourceMappingURL=chunk-OLKUYPVT.cjs.map