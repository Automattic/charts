import {
  radial_wipe_animation_default
} from "./chunk-KXRWNFQJ.js";
import {
  ChartHTML,
  ChartSVG,
  useChartChildren
} from "./chunk-6CCZL2JJ.js";
import {
  withResponsive
} from "./chunk-TYIH5LMV.js";
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
  useInteractiveLegendData,
  usePrefersReducedMotion
} from "./chunk-32ESS4MV.js";
import {
  attachSubComponents
} from "./chunk-TE63Y5PX.js";
import {
  BaseTooltip
} from "./chunk-BPYKWMI7.js";

// src/charts/pie-semi-circle-chart/pie-semi-circle-chart.tsx
import { Group } from "@visx/group";
import { Pie } from "@visx/shape";
import { Text } from "@visx/text";
import { useTooltip, useTooltipInPortal } from "@visx/tooltip";
import { __ } from "@wordpress/i18n";
import clsx from "clsx";
import { useCallback, useContext, useMemo } from "react";

// src/charts/pie-semi-circle-chart/pie-semi-circle-chart.module.scss
var pie_semi_circle_chart_module_default = {
  "pie-semi-circle-chart": "a8ccharts-8tyaQj",
  "pie-semi-circle-chart--legend-top": "a8ccharts-M1lF7A",
  "label": "a8ccharts-EKZS3j",
  "note": "a8ccharts-v85A8-"
};

// src/charts/pie-semi-circle-chart/pie-semi-circle-chart.tsx
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
var renderDefaultPieSemiCircleTooltip = ({
  tooltipData
}) => {
  return /* @__PURE__ */ _jsx(BaseTooltip, {
    data: tooltipData,
    top: 0,
    left: 0,
    renderContainer: false
  });
};
var PAD_ANGLE = 0.03;
var validateData = (data) => {
  if (!data.length) {
    return {
      isValid: false,
      message: "No data available"
    };
  }
  const hasNegativeValues = data.some((item) => item.percentage < 0 || item.value < 0);
  if (hasNegativeValues) {
    return {
      isValid: false,
      message: "Invalid data: Negative values are not allowed"
    };
  }
  const totalPercentage = data.reduce((sum, item) => sum + item.percentage, 0);
  if (totalPercentage <= 0) {
    return {
      isValid: false,
      message: "Invalid percentage total: Must be greater than 0"
    };
  }
  return {
    isValid: true,
    message: ""
  };
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
  tooltipOffsetY = -15,
  renderTooltip = renderDefaultPieSemiCircleTooltip
}) => {
  const chartId = useChartId(providedChartId);
  const [legendRef, legendHeight] = useElementHeight();
  const {
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    hideTooltip,
    showTooltip
  } = useTooltip();
  const {
    containerRef,
    TooltipInPortal,
    containerBounds
  } = useTooltipInPortal({
    detectBounds: true,
    scroll: true,
    debounce: 0
  });
  const handleMouseMove = useCallback((event, arc) => {
    if (containerBounds.width === 0 || containerBounds.height === 0) {
      return;
    }
    showTooltip({
      tooltipData: arc.data,
      tooltipLeft: event.clientX - containerBounds.left + tooltipOffsetX,
      tooltipTop: event.clientY - containerBounds.top + tooltipOffsetY
    });
  }, [containerBounds.width, containerBounds.height, containerBounds.left, containerBounds.top, showTooltip, tooltipOffsetX, tooltipOffsetY]);
  const handleMouseLeave = useCallback(() => {
    hideTooltip();
  }, [hideTooltip]);
  const handleArcMouseMove = useCallback((arc) => (event) => {
    handleMouseMove(event, arc);
  }, [handleMouseMove]);
  const {
    isValid,
    message
  } = validateData(data);
  const {
    getElementStyles,
    isSeriesVisible
  } = useGlobalChartsContext();
  const {
    visibleData,
    allSegmentsHidden,
    legendData
  } = useInteractiveLegendData({
    data,
    chartId,
    legendInteractive,
    isSeriesVisible
  });
  const accessors = useMemo(() => ({
    value: (d) => d.value,
    sort: (a, b) => b.value - a.value,
    fill: (d) => getElementStyles({
      data: d,
      index: d.index
    }).color
  }), [getElementStyles]);
  const legendOptions = useMemo(() => ({
    showValues: true,
    legendValueDisplay
  }), [legendValueDisplay]);
  const legendItems = useChartLegendItems(legendData, legendOptions);
  const {
    svgChildren,
    htmlChildren,
    otherChildren
  } = useChartChildren(children, "PieSemiCircleChart");
  const chartMetadata = useMemo(() => ({
    thickness,
    clockwise
  }), [thickness, clockwise]);
  useChartRegistration({
    chartId,
    legendItems,
    chartType: "pie-semi-circle",
    isDataValid: isValid,
    metadata: chartMetadata
  });
  const prefersReducedMotion = usePrefersReducedMotion();
  if (!isValid) {
    return /* @__PURE__ */ _jsx("div", {
      className: pie_semi_circle_chart_module_default["pie-semi-circle-chart"],
      children: /* @__PURE__ */ _jsx("svg", {
        width,
        height: width / 2,
        children: /* @__PURE__ */ _jsx("text", {
          x: "50%",
          y: "50%",
          textAnchor: "middle",
          className: pie_semi_circle_chart_module_default.error,
          children: message
        })
      })
    });
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
  return /* @__PURE__ */ _jsx(SingleChartContext.Provider, {
    value: {
      chartId,
      chartWidth: width,
      chartHeight: radius
    },
    children: /* @__PURE__ */ _jsxs("div", {
      ref: containerRef,
      className: clsx("pie-semi-circle-chart", pie_semi_circle_chart_module_default["pie-semi-circle-chart"], {
        [pie_semi_circle_chart_module_default["pie-semi-circle-chart--legend-top"]]: showLegend && legendPosition === "top"
      }, className),
      children: [/* @__PURE__ */ _jsxs("svg", {
        width,
        height: radius,
        viewBox: `0 0 ${width} ${chartHeight}`,
        children: [/* @__PURE__ */ _jsx("defs", {
          children: /* @__PURE__ */ _jsx(radial_wipe_animation_default, {
            id: `radial-wipe-${chartId}`,
            radius,
            innerRadius,
            startAngle: "-180deg",
            wipePercentage: 50
          })
        }), /* @__PURE__ */ _jsx(Group, {
          top: chartHeight,
          left: width / 2,
          mask: animation && !prefersReducedMotion ? `url(#radial-wipe-${chartId})` : null,
          children: allSegmentsHidden ? /* @__PURE__ */ _jsx("text", {
            textAnchor: "middle",
            y: -radius / 2,
            fill: "#ccc",
            fontSize: "14",
            fontFamily: "-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif",
            children: __("All segments are hidden. Click legend items to show data.", "jetpack-charts")
          }) : /* @__PURE__ */ _jsxs(_Fragment, {
            children: [/* @__PURE__ */ _jsx(Pie, {
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
                return pie.arcs.map((arc) => /* @__PURE__ */ _jsx("g", {
                  onMouseMove: withTooltips ? handleArcMouseMove(arc) : void 0,
                  onMouseLeave: withTooltips ? handleMouseLeave : void 0,
                  children: /* @__PURE__ */ _jsx("path", {
                    d: pie.path(arc) || "",
                    fill: accessors.fill(arc.data)
                  })
                }, arc.data.label));
              }
            }), /* @__PURE__ */ _jsxs(Group, {
              children: [/* @__PURE__ */ _jsx(Text, {
                textAnchor: "middle",
                verticalAnchor: "start",
                y: -40,
                className: pie_semi_circle_chart_module_default.label,
                children: label
              }), /* @__PURE__ */ _jsx(Text, {
                textAnchor: "middle",
                verticalAnchor: "start",
                y: -20,
                className: pie_semi_circle_chart_module_default.note,
                children: note
              })]
            }), !allSegmentsHidden && svgChildren]
          })
        })]
      }), withTooltips && tooltipOpen && tooltipData && /* @__PURE__ */ _jsx(TooltipInPortal, {
        top: tooltipTop || 0,
        left: tooltipLeft || 0,
        children: /* @__PURE__ */ _jsx("div", {
          role: "tooltip",
          children: renderTooltip({
            tooltipData
          })
        })
      }), showLegend && /* @__PURE__ */ _jsx(Legend, {
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
      }), htmlChildren, otherChildren]
    })
  });
};
var PieSemiCircleChartWithProvider = (props) => {
  const existingContext = useContext(GlobalChartsContext);
  if (existingContext) {
    return /* @__PURE__ */ _jsx(PieSemiCircleChartInternal, {
      ...props
    });
  }
  return /* @__PURE__ */ _jsx(GlobalChartsProvider, {
    children: /* @__PURE__ */ _jsx(PieSemiCircleChartInternal, {
      ...props
    })
  });
};
PieSemiCircleChartWithProvider.displayName = "PieSemiCircleChart";
var PieSemiCircleChart = attachSubComponents(PieSemiCircleChartWithProvider, {
  Legend,
  SVG: ChartSVG,
  HTML: ChartHTML
});
var PieSemiCircleChartResponsive = attachSubComponents(withResponsive(PieSemiCircleChartWithProvider), {
  Legend,
  SVG: ChartSVG,
  HTML: ChartHTML
});

export {
  PieSemiCircleChart,
  PieSemiCircleChartResponsive
};
//# sourceMappingURL=chunk-WYQMYVDY.js.map