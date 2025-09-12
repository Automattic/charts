import {
  BaseTooltip
} from "./chunk-6KOC7ZWU.js";
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
} from "./chunk-5QLJH7EK.js";
import {
  GlobalChartsContext,
  GlobalChartsProvider,
  attachSubComponents,
  useChartId,
  useChartRegistration,
  useElementHeight,
  useGlobalChartsContext
} from "./chunk-JSVPH6B5.js";

// src/components/pie-semi-circle-chart/pie-semi-circle-chart.tsx
import { localPoint } from "@visx/event";
import { Group } from "@visx/group";
import { Pie } from "@visx/shape";
import { Text } from "@visx/text";
import { useTooltip } from "@visx/tooltip";
import clsx from "clsx";
import { useCallback, useContext, useMemo } from "react";

// src/components/pie-semi-circle-chart/pie-semi-circle-chart.module.scss
var pie_semi_circle_chart_module_default = {
  "pie-semi-circle-chart": "a8ccharts-r5jk9c",
  "label": "a8ccharts-nPqOgD",
  "note": "a8ccharts-LpBZQh"
};

// src/components/pie-semi-circle-chart/pie-semi-circle-chart.tsx
import { jsx, jsxs } from "react/jsx-runtime";
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
  legendShape = "circle",
  legendValueDisplay = "percentage",
  label,
  note,
  className,
  children
}) => {
  const chartId = useChartId(providedChartId);
  const [legendRef, legendHeight] = useElementHeight();
  const { tooltipOpen, tooltipLeft, tooltipTop, tooltipData, hideTooltip, showTooltip } = useTooltip();
  const handleMouseMove = useCallback(
    (event, arc) => {
      const coords = localPoint(event);
      if (!coords) return;
      showTooltip({
        tooltipData: arc.data,
        tooltipLeft: coords.x,
        tooltipTop: coords.y - 10
      });
    },
    [showTooltip]
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
  const { resolveGroupColor } = useGlobalChartsContext();
  const accessors = useMemo(
    () => ({
      value: (d) => d.value,
      sort: (a, b) => b.value - a.value,
      fill: ({ group, index, color: overrideColor }) => resolveGroupColor({ group, index, overrideColor })
    }),
    [resolveGroupColor]
  );
  const legendOptions = useMemo(
    () => ({ showValues: true, legendValueDisplay }),
    [legendValueDisplay]
  );
  const legendItems = useChartLegendItems(data, legendOptions);
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
  if (!isValid) {
    return /* @__PURE__ */ jsx("div", { className: pie_semi_circle_chart_module_default["pie-semi-circle-chart"], children: /* @__PURE__ */ jsx("svg", { width, height: width / 2, "data-testid": "pie-chart-svg", children: /* @__PURE__ */ jsx("text", { x: "50%", y: "50%", textAnchor: "middle", className: pie_semi_circle_chart_module_default.error, children: message }) }) });
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
          className: clsx("pie-semi-circle-chart", pie_semi_circle_chart_module_default["pie-semi-circle-chart"], className),
          "data-testid": "pie-chart-container",
          style: {
            display: "flex",
            flexDirection: showLegend && legendPosition === "top" ? "column-reverse" : "column"
          },
          children: [
            /* @__PURE__ */ jsx(
              "svg",
              {
                width,
                height: radius,
                viewBox: `0 0 ${width} ${chartHeight}`,
                "data-testid": "pie-chart-svg",
                children: /* @__PURE__ */ jsxs(Group, { top: chartHeight, left: width / 2, children: [
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
                            onMouseMove: handleArcMouseMove(arc),
                            onMouseLeave: handleMouseLeave,
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
                  svgChildren
                ] })
              }
            ),
            withTooltips && tooltipOpen && tooltipData && /* @__PURE__ */ jsx(
              BaseTooltip,
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
            showLegend && /* @__PURE__ */ jsx(
              Legend,
              {
                orientation: legendOrientation,
                position: legendPosition,
                alignment: legendAlignment,
                maxWidth: legendMaxWidth,
                textOverflow: legendTextOverflow,
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
//# sourceMappingURL=chunk-M6ZQP3RJ.js.map