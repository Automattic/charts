import {
  GlobalChartsContext,
  formatPercentage,
  getItemShapeStyles,
  getSeriesStroke,
  useGlobalChartsTheme
} from "./chunk-NB3M3ZHU.js";

// src/components/legend/legend.tsx
import { useContext as useContext3, useMemo as useMemo2, forwardRef as forwardRef2 } from "react";

// src/components/private/single-chart-context/single-chart-context.tsx
import { createContext } from "react";
var ChartInstanceContext = createContext(null);
var SingleChartContext = ChartInstanceContext;

// src/components/private/single-chart-context/use-single-chart-context.ts
import { useContext } from "react";
var useChartInstanceContext = () => {
  const context = useContext(ChartInstanceContext);
  if (!context) {
    throw new Error("useChartInstanceContext must be used within a Chart component");
  }
  return context;
};
var useSingleChartContext = useChartInstanceContext;

// src/components/legend/private/base-legend.tsx
import { Group } from "@visx/group";
import { LegendItem, LegendLabel, LegendOrdinal, LegendShape } from "@visx/legend";
import { scaleOrdinal } from "@visx/scale";
import clsx from "clsx";
import {
  forwardRef,
  useCallback,
  useMemo,
  useContext as useContext2
} from "react";

// src/components/legend/utils/value-or-identity.ts
function valueOrIdentity(_) {
  if (_ && typeof _ === "object" && "value" in _ && typeof _.value !== "undefined")
    return _.value;
  return _;
}
function valueOrIdentityString(_) {
  return String(valueOrIdentity(_));
}

// src/components/legend/utils/label-transform-factory.ts
function labelTransformFactory({
  scale,
  labelFormat
}) {
  return (d, i) => ({
    datum: d,
    index: i,
    text: `${labelFormat(d, i)}`,
    value: scale(d)
  });
}

// src/components/legend/private/base-legend.module.scss
var base_legend_module_default = {
  "legend--horizontal": "a8ccharts-AELBvX",
  "legend--vertical": "a8ccharts-fX8uQe",
  "legend--alignment-start": "a8ccharts-DEe0wg",
  "legend--alignment-center": "a8ccharts-WBKF9I",
  "legend--alignment-end": "a8ccharts-JfwMng",
  "legend--position-top": "a8ccharts-8Y73Kh",
  "legend--position-bottom": "a8ccharts-TVM-IY",
  "legend-item": "a8ccharts-Vflwq8",
  "legend-item-label": "a8ccharts-2H65Kr",
  "legend-item-value": "a8ccharts-DTZlT-"
};

// src/components/legend/private/base-legend.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var orientationToFlexDirection = {
  horizontal: "row",
  vertical: "column"
};
var BaseLegend = forwardRef(
  ({
    items,
    className,
    orientation = "horizontal",
    position = "bottom",
    alignment = "center",
    shape = "rect",
    fill = valueOrIdentityString,
    size = valueOrIdentityString,
    labelFormat = valueOrIdentity,
    labelTransform = labelTransformFactory,
    shapeWidth = 16,
    shapeHeight = 16,
    shapeMargin = "2px 4px 2px 0",
    labelAlign = "left",
    labelFlex = "0 0 auto",
    // Use natural width instead of expanding to fill space
    labelMargin = "0 4px",
    itemMargin = "0",
    itemDirection = "row",
    legendLabelProps,
    ...legendItemProps
  }, ref) => {
    const theme = useGlobalChartsTheme();
    const context = useContext2(GlobalChartsContext);
    const resolveGroupColor = context?.resolveGroupColor;
    const itemsWithResolvedColors = useMemo(() => {
      return items.map((item) => {
        if (item.group !== void 0 && item.index !== void 0 && resolveGroupColor) {
          const resolvedColor = resolveGroupColor({
            group: item.group,
            index: item.index,
            overrideColor: item.overrideColor
          });
          return { ...item, color: resolvedColor };
        }
        return item;
      });
    }, [items, resolveGroupColor]);
    const legendScale = scaleOrdinal({
      domain: itemsWithResolvedColors.map((item) => item.label),
      range: itemsWithResolvedColors.map((item) => item.color)
    });
    const domain = legendScale.domain();
    const getShapeStyle = useCallback(
      ({ index }) => itemsWithResolvedColors[index]?.shapeStyle,
      [itemsWithResolvedColors]
    );
    return /* @__PURE__ */ jsx(
      LegendOrdinal,
      {
        scale: legendScale,
        labelFormat,
        labelTransform,
        children: (labels) => /* @__PURE__ */ jsx(
          "div",
          {
            ref,
            role: "list",
            "data-testid": `legend-${orientation}`,
            className: clsx(
              base_legend_module_default.legend,
              base_legend_module_default[`legend--${orientation}`],
              base_legend_module_default[`legend--alignment-${alignment}`],
              base_legend_module_default[`legend--position-${position}`],
              className
            ),
            style: {
              flexDirection: orientationToFlexDirection[orientation],
              ...theme.legendContainerStyles
            },
            children: labels.map((label, i) => /* @__PURE__ */ jsxs(
              LegendItem,
              {
                className: base_legend_module_default["legend-item"],
                "data-testid": "legend-item",
                margin: itemMargin,
                flexDirection: orientation === "vertical" && alignment === "end" ? "row-reverse" : itemDirection,
                ...legendItemProps,
                children: [
                  items[i]?.renderGlyph ? /* @__PURE__ */ jsx(
                    "svg",
                    {
                      width: items[i]?.glyphSize * 2,
                      height: items[i]?.glyphSize * 2,
                      "data-testid": "legend-glyph",
                      children: /* @__PURE__ */ jsx(Group, { children: items[i]?.renderGlyph({
                        key: `legend-glyph-${label.text}`,
                        datum: {},
                        index: i,
                        color: fill(label),
                        size: items[i]?.glyphSize,
                        x: items[i]?.glyphSize,
                        y: items[i]?.glyphSize
                      }) })
                    }
                  ) : /* @__PURE__ */ jsx(
                    LegendShape,
                    {
                      shape,
                      height: shapeHeight,
                      width: shapeWidth,
                      margin: shapeMargin,
                      item: domain[i],
                      itemIndex: i,
                      label,
                      fill,
                      size,
                      shapeStyle: getShapeStyle
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    LegendLabel,
                    {
                      style: {
                        justifyContent: labelAlign,
                        flex: labelFlex,
                        margin: labelMargin,
                        ...theme.legendLabelStyles
                      },
                      ...legendLabelProps,
                      children: [
                        label.text,
                        items.find((item) => item.label === label.text)?.value && /* @__PURE__ */ jsxs("span", { className: base_legend_module_default["legend-item-value"], children: [
                          "\xA0",
                          items.find((item) => item.label === label.text)?.value
                        ] })
                      ]
                    }
                  )
                ]
              },
              `legend-${label.text}-${i}`
            ))
          }
        )
      }
    );
  }
);

// src/components/legend/legend.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var Legend = forwardRef2(
  ({ chartId, items, ...props }, ref) => {
    const context = useContext3(GlobalChartsContext);
    const singleChartContext = useContext3(SingleChartContext);
    const contextChartId = chartId ?? singleChartContext?.chartId;
    const contextItems = useMemo2(() => {
      return contextChartId && context ? context.getChartData(contextChartId)?.legendItems : void 0;
    }, [contextChartId, context]);
    const legendItems = items || contextItems;
    if (!legendItems) {
      return null;
    }
    return /* @__PURE__ */ jsx2(BaseLegend, { ref, items: legendItems, ...props });
  }
);

// src/components/legend/hooks/use-chart-legend-items.ts
import { useMemo as useMemo3 } from "react";
function formatPointValue(point, showValues, legendValueDisplay = "percentage") {
  if (!showValues || legendValueDisplay === "none") {
    return "";
  }
  if ("percentage" in point) {
    const percentagePoint = point;
    switch (legendValueDisplay) {
      case "percentage":
        return formatPercentage(percentagePoint.percentage);
      case "value":
        return percentagePoint.value.toString();
      case "valueDisplay":
        return percentagePoint.valueDisplay || percentagePoint.value.toString();
      default:
        return "";
    }
  }
  if ("value" in point) {
    return point.value.toString();
  }
  return "";
}
function processSeriesData(seriesData, theme, showValues, withGlyph, glyphSize, renderGlyph, legendShape) {
  const mapper = (series, index) => {
    const { shapeStyles } = getItemShapeStyles(series, index, theme, legendShape);
    const baseItem = {
      label: series.label,
      value: showValues ? series.data?.length?.toString() || "0" : "",
      color: getSeriesStroke(series, index, theme.colors),
      shapeStyle: shapeStyles,
      group: series.group,
      index,
      overrideColor: series.options?.stroke
    };
    if (withGlyph && renderGlyph) {
      return {
        ...baseItem,
        glyphSize,
        renderGlyph
      };
    }
    return baseItem;
  };
  return seriesData.map(mapper);
}
function processPointData(pointData, theme, showValues, legendValueDisplay, withGlyph, glyphSize, renderGlyph) {
  const mapper = (point, index) => {
    const baseItem = {
      label: point.label,
      value: formatPointValue(point, showValues, legendValueDisplay),
      color: point.color ?? theme.colors[index % theme.colors.length],
      group: point.group,
      index,
      overrideColor: point.color
    };
    if (withGlyph && renderGlyph) {
      const itemWithGlyph = {
        ...baseItem,
        glyphSize,
        renderGlyph
      };
      return itemWithGlyph;
    }
    return baseItem;
  };
  return pointData.map(mapper);
}
function useChartLegendItems(data, options = {}, legendShape) {
  const {
    showValues = false,
    legendValueDisplay = "percentage",
    withGlyph = false,
    glyphSize = 8,
    renderGlyph
  } = options;
  const theme = useGlobalChartsTheme();
  return useMemo3(() => {
    if (!data || !Array.isArray(data) || data.length === 0) {
      return [];
    }
    if ("data" in data[0]) {
      return processSeriesData(
        data,
        theme,
        showValues,
        withGlyph,
        glyphSize,
        renderGlyph,
        legendShape
      );
    }
    return processPointData(
      data,
      theme,
      showValues,
      legendValueDisplay,
      withGlyph,
      glyphSize,
      renderGlyph
    );
  }, [
    data,
    theme,
    showValues,
    legendValueDisplay,
    withGlyph,
    glyphSize,
    renderGlyph,
    legendShape
  ]);
}

export {
  SingleChartContext,
  useSingleChartContext,
  Legend,
  useChartLegendItems
};
//# sourceMappingURL=chunk-JFRMYLPI.js.map