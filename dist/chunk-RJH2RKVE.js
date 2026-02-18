import {
  radial_wipe_animation_default
} from "./chunk-A3AEEGKR.js";
import {
  ChartHTML,
  ChartSVG,
  useChartChildren
} from "./chunk-CEZGL6YP.js";
import {
  getStringWidth
} from "./chunk-NFRB2POF.js";
import {
  BaseTooltip
} from "./chunk-5XI443YP.js";
import {
  withResponsive
} from "./chunk-C33AQZEC.js";
import {
  GlobalChartsContext,
  GlobalChartsProvider,
  Legend,
  SingleChartContext,
  useChartId,
  useChartLegendItems,
  useChartRegistration,
  useElementHeight,
  useGlobalChartsContext,
  useGlobalChartsTheme,
  useInteractiveLegendData,
  usePrefersReducedMotion
} from "./chunk-H34CJSR6.js";
import {
  attachSubComponents
} from "./chunk-TE63Y5PX.js";

// src/charts/pie-chart/pie-chart.tsx
import { Group } from "@visx/group";
import { Pie } from "@visx/shape";
import { useTooltip, useTooltipInPortal } from "@visx/tooltip";
import { __ } from "@wordpress/i18n";
import clsx from "clsx";
import { useCallback, useContext, useMemo } from "react";

// src/charts/pie-chart/pie-chart.module.scss
var pie_chart_module_default = {
  "pie-chart": "a8ccharts-C-n-Gu",
  "pie-chart--legend-top": "a8ccharts-Mu0uxl"
};

// src/charts/pie-chart/pie-chart.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var renderDefaultPieTooltip = ({ tooltipData }) => {
  return /* @__PURE__ */ jsx(BaseTooltip, { data: tooltipData, top: 0, left: 0, renderContainer: false });
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
  const providerTheme = useGlobalChartsTheme();
  const chartId = useChartId(providedChartId);
  const [legendRef, legendHeight] = useElementHeight();
  const { tooltipOpen, tooltipLeft, tooltipTop, tooltipData, hideTooltip, showTooltip } = useTooltip();
  const { containerRef, TooltipInPortal, containerBounds } = useTooltipInPortal({
    detectBounds: true,
    scroll: true,
    debounce: 0
  });
  const onMouseLeave = useCallback(() => {
    if (!withTooltips) {
      return;
    }
    hideTooltip();
  }, [withTooltips, hideTooltip]);
  const { getElementStyles, isSeriesVisible } = useGlobalChartsContext();
  const { visibleData, allSegmentsHidden, legendData } = useInteractiveLegendData({
    data,
    chartId,
    legendInteractive,
    isSeriesVisible
  });
  const legendOptions = useMemo(
    () => ({ showValues: true, legendValueDisplay }),
    [legendValueDisplay]
  );
  const legendItems = useChartLegendItems(legendData, legendOptions);
  const { isValid, message } = validateData(data);
  const { svgChildren, htmlChildren, otherChildren } = useChartChildren(children, "PieChart");
  const chartMetadata = useMemo(
    () => ({
      thickness,
      gapScale,
      cornerScale
    }),
    [thickness, gapScale, cornerScale]
  );
  useChartRegistration({
    chartId,
    legendItems,
    chartType: "pie",
    isDataValid: isValid,
    metadata: chartMetadata
  });
  const prefersReducedMotion = usePrefersReducedMotion();
  if (!isValid) {
    return /* @__PURE__ */ jsx("div", { className: clsx("pie-chart", pie_chart_module_default["pie-chart"], className), children: /* @__PURE__ */ jsx("div", { className: pie_chart_module_default["error-message"], children: message }) });
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
  return /* @__PURE__ */ jsx(
    SingleChartContext.Provider,
    {
      value: {
        chartId,
        chartWidth: width,
        chartHeight: adjustedHeight
      },
      children: /* @__PURE__ */ jsxs(
        "div",
        {
          ref: containerRef,
          className: clsx(
            "pie-chart",
            pie_chart_module_default["pie-chart"],
            { [pie_chart_module_default["pie-chart--legend-top"]]: showLegend && legendPosition === "top" },
            className
          ),
          children: [
            /* @__PURE__ */ jsxs(
              "svg",
              {
                viewBox: `0 0 ${width} ${adjustedHeight}`,
                preserveAspectRatio: "xMidYMid meet",
                width,
                height: adjustedHeight,
                children: [
                  /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsx(
                    radial_wipe_animation_default,
                    {
                      id: `radial-wipe-${chartId}`,
                      radius: outerRadius,
                      innerRadius
                    }
                  ) }),
                  /* @__PURE__ */ jsxs(
                    Group,
                    {
                      top: centerY,
                      left: centerX,
                      mask: animation && !prefersReducedMotion ? `url(#radial-wipe-${chartId})` : null,
                      children: [
                        allSegmentsHidden ? /* @__PURE__ */ jsx(
                          "text",
                          {
                            textAnchor: "middle",
                            dy: ".33em",
                            fill: providerTheme.gridColor || "#ccc",
                            fontSize: "14",
                            fontFamily: "-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif",
                            children: __(
                              "All segments are hidden. Click legend items to show data.",
                              "jetpack-charts"
                            )
                          }
                        ) : /* @__PURE__ */ jsx(
                          Pie,
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
                                const estimatedTextWidth = getStringWidth(arc.data.label, { fontSize });
                                const labelPadding = 6;
                                const backgroundWidth = estimatedTextWidth + labelPadding * 2;
                                const backgroundHeight = fontSize + labelPadding * 2;
                                return /* @__PURE__ */ jsxs("g", { ...groupProps, children: [
                                  /* @__PURE__ */ jsx("path", { ...pathProps }),
                                  showLabels && hasSpaceForLabel && /* @__PURE__ */ jsxs("g", { children: [
                                    providerTheme.labelBackgroundColor && /* @__PURE__ */ jsx(
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
                                    /* @__PURE__ */ jsx(
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
            showLegend && /* @__PURE__ */ jsx(
              Legend,
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
            withTooltips && tooltipOpen && tooltipData && /* @__PURE__ */ jsx(TooltipInPortal, { top: tooltipTop || 0, left: tooltipLeft || 0, children: /* @__PURE__ */ jsx("div", { role: "tooltip", children: renderTooltip({ tooltipData }) }) }),
            htmlChildren,
            otherChildren
          ]
        }
      )
    }
  );
};
var PieChartWithProvider = (props) => {
  const existingContext = useContext(GlobalChartsContext);
  if (existingContext) {
    return /* @__PURE__ */ jsx(PieChartInternal, { ...props });
  }
  return /* @__PURE__ */ jsx(GlobalChartsProvider, { children: /* @__PURE__ */ jsx(PieChartInternal, { ...props }) });
};
PieChartWithProvider.displayName = "PieChart";
var PieChart = attachSubComponents(PieChartWithProvider, {
  Legend,
  SVG: ChartSVG,
  HTML: ChartHTML
});
var PieChartResponsive = attachSubComponents(
  withResponsive(PieChartWithProvider),
  {
    Legend,
    SVG: ChartSVG,
    HTML: ChartHTML
  }
);

export {
  PieChart,
  PieChartResponsive
};
//# sourceMappingURL=chunk-RJH2RKVE.js.map