import {
  radial_wipe_animation_default
} from "./chunk-3OVXJFQY.js";
import {
  BaseTooltip
} from "./chunk-W5KOH3TV.js";
import {
  ChartHTML,
  ChartSVG,
  useChartChildren
} from "./chunk-D3DZT2EK.js";
import {
  withResponsive
} from "./chunk-TYYW4BG3.js";
import {
  Legend,
  SingleChartContext,
  useChartLegendItems
} from "./chunk-IKDM6OVX.js";
import {
  GlobalChartsContext,
  GlobalChartsProvider,
  attachSubComponents,
  useChartId,
  useChartRegistration,
  useElementHeight,
  useGlobalChartsContext,
  useInteractiveLegendData,
  usePrefersReducedMotion
} from "./chunk-5OB3F7GC.js";

// src/components/pie-semi-circle-chart/pie-semi-circle-chart.tsx
import { localPoint } from "@visx/event";
import { Group } from "@visx/group";
import { Pie } from "@visx/shape";
import { Text } from "@visx/text";
import { useTooltip, useTooltipInPortal } from "@visx/tooltip";
import { __ } from "@wordpress/i18n";
import clsx from "clsx";
import { useCallback, useContext, useMemo } from "react";

// src/components/pie-semi-circle-chart/pie-semi-circle-chart.module.scss
var pie_semi_circle_chart_module_default = {
  "pie-semi-circle-chart": "a8ccharts-r5jk9c",
  "pie-semi-circle-chart--legend-top": "a8ccharts-XEH--U",
  "label": "a8ccharts-nPqOgD",
  "note": "a8ccharts-LpBZQh"
};

// src/components/pie-semi-circle-chart/pie-semi-circle-chart.tsx
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
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
  const chartId = useChartId(providedChartId);
  const [legendRef, legendHeight] = useElementHeight();
  const { tooltipOpen, tooltipLeft, tooltipTop, tooltipData, hideTooltip, showTooltip } = useTooltip();
  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    detectBounds: true,
    scroll: true,
    debounce: 0
  });
  const handleMouseMove = useCallback(
    (event, arc) => {
      const coords = localPoint(event);
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
  const handleMouseLeave = useCallback(() => {
    hideTooltip();
  }, [hideTooltip]);
  const handleArcMouseMove = useCallback(
    (arc) => (event) => {
      handleMouseMove(event, arc);
    },
    [handleMouseMove]
  );
  const { isValid, message } = validateData(data);
  const { getElementStyles, isSeriesVisible } = useGlobalChartsContext();
  const { visibleData, allSegmentsHidden, legendData } = useInteractiveLegendData({
    data,
    chartId,
    legendInteractive,
    isSeriesVisible
  });
  const accessors = useMemo(
    () => ({
      value: (d) => d.value,
      sort: (a, b) => b.value - a.value,
      fill: (d) => getElementStyles({ data: d, index: d.index }).color
    }),
    [getElementStyles]
  );
  const legendOptions = useMemo(
    () => ({ showValues: true, legendValueDisplay }),
    [legendValueDisplay]
  );
  const legendItems = useChartLegendItems(legendData, legendOptions);
  const { svgChildren, htmlChildren, otherChildren } = useChartChildren(
    children,
    "PieSemiCircleChart"
  );
  const chartMetadata = useMemo(
    () => ({
      thickness,
      clockwise
    }),
    [thickness, clockwise]
  );
  useChartRegistration({
    chartId,
    legendItems,
    chartType: "pie-semi-circle",
    isDataValid: isValid,
    metadata: chartMetadata
  });
  const prefersReducedMotion = usePrefersReducedMotion();
  if (!isValid) {
    return /* @__PURE__ */ jsx("div", { className: pie_semi_circle_chart_module_default["pie-semi-circle-chart"], children: /* @__PURE__ */ jsx("svg", { width, height: width / 2, "data-testid": "pie-chart-svg", children: /* @__PURE__ */ jsx("text", { x: "50%", y: "50%", textAnchor: "middle", className: pie_semi_circle_chart_module_default.error, children: message }) }) });
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
  return /* @__PURE__ */ jsx(
    SingleChartContext.Provider,
    {
      value: {
        chartId,
        chartWidth: width,
        chartHeight: radius
      },
      children: /* @__PURE__ */ jsxs(
        "div",
        {
          ref: containerRef,
          className: clsx(
            "pie-semi-circle-chart",
            pie_semi_circle_chart_module_default["pie-semi-circle-chart"],
            {
              [pie_semi_circle_chart_module_default["pie-semi-circle-chart--legend-top"]]: showLegend && legendPosition === "top"
            },
            className
          ),
          "data-testid": "pie-chart-container",
          children: [
            /* @__PURE__ */ jsxs(
              "svg",
              {
                width,
                height: radius,
                viewBox: `0 0 ${width} ${chartHeight}`,
                "data-testid": "pie-chart-svg",
                children: [
                  /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsx(
                    radial_wipe_animation_default,
                    {
                      id: `radial-wipe-${chartId}`,
                      radius,
                      innerRadius,
                      startAngle: "-180deg",
                      wipePercentage: 50
                    }
                  ) }),
                  /* @__PURE__ */ jsx(
                    Group,
                    {
                      top: chartHeight,
                      left: width / 2,
                      mask: animation && !prefersReducedMotion ? `url(#radial-wipe-${chartId})` : null,
                      children: allSegmentsHidden ? /* @__PURE__ */ jsx(
                        "text",
                        {
                          textAnchor: "middle",
                          y: -radius / 2,
                          fill: "#ccc",
                          fontSize: "14",
                          fontFamily: "-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif",
                          children: __(
                            "All segments are hidden. Click legend items to show data.",
                            "jetpack-charts"
                          )
                        }
                      ) : /* @__PURE__ */ jsxs(Fragment, { children: [
                        /* @__PURE__ */ jsx(
                          Pie,
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
                              return pie.arcs.map((arc) => /* @__PURE__ */ jsx(
                                "g",
                                {
                                  onMouseMove: withTooltips ? handleArcMouseMove(arc) : void 0,
                                  onMouseLeave: withTooltips ? handleMouseLeave : void 0,
                                  children: /* @__PURE__ */ jsx(
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
                        /* @__PURE__ */ jsxs(Group, { children: [
                          /* @__PURE__ */ jsx(
                            Text,
                            {
                              textAnchor: "middle",
                              verticalAnchor: "start",
                              y: -40,
                              className: pie_semi_circle_chart_module_default.label,
                              children: label
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            Text,
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
            withTooltips && tooltipOpen && tooltipData && /* @__PURE__ */ jsx(TooltipInPortal, { top: tooltipTop || 0, left: tooltipLeft || 0, children: /* @__PURE__ */ jsx("div", { role: "tooltip", children: /* @__PURE__ */ jsx(BaseTooltip, { data: tooltipData, top: 0, left: 0, renderContainer: false }) }) }),
            showLegend && /* @__PURE__ */ jsx(
              Legend,
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
  const existingContext = useContext(GlobalChartsContext);
  if (existingContext) {
    return /* @__PURE__ */ jsx(PieSemiCircleChartInternal, { ...props });
  }
  return /* @__PURE__ */ jsx(GlobalChartsProvider, { children: /* @__PURE__ */ jsx(PieSemiCircleChartInternal, { ...props }) });
};
PieSemiCircleChartWithProvider.displayName = "PieSemiCircleChart";
var PieSemiCircleChart = attachSubComponents(PieSemiCircleChartWithProvider, {
  Legend,
  SVG: ChartSVG,
  HTML: ChartHTML
});
var PieSemiCircleChartResponsive = attachSubComponents(
  withResponsive(PieSemiCircleChartWithProvider),
  {
    Legend,
    SVG: ChartSVG,
    HTML: ChartHTML
  }
);

export {
  PieSemiCircleChart,
  PieSemiCircleChartResponsive
};
//# sourceMappingURL=chunk-VVYLC4WL.js.map