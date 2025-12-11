import {
  GlobalChartsContext,
  useGlobalChartsContext,
  useGlobalChartsTheme,
  useTextTruncation
} from "./chunk-RSKOU6PO.js";
import {
  formatPercentage
} from "./chunk-7IZD3F7B.js";

// src/components/legend/legend.tsx
import { useContext as useContext3, useMemo, forwardRef as forwardRef2 } from "react";

// src/charts/private/single-chart-context/single-chart-context.tsx
import { createContext } from "react";
var ChartInstanceContext = createContext(null);
var SingleChartContext = ChartInstanceContext;

// src/charts/private/single-chart-context/use-single-chart-context.ts
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
  "legend-item--interactive": "a8ccharts-qGsavM",
  "legend-item--inactive": "a8ccharts-ZtDY-Q",
  "legend-item-label": "a8ccharts-2H65Kr",
  "legend-item-text--wrap": "a8ccharts-faSDBI",
  "legend-item-text--ellipsis": "a8ccharts-FISUIO",
  "legend-item-value": "a8ccharts-DTZlT-"
};

// src/components/legend/private/base-legend.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var orientationToFlexDirection = {
  horizontal: "row",
  vertical: "column"
};
var LegendText = ({
  text,
  textOverflow,
  maxWidth
}) => {
  const isEllipsis = maxWidth != null && textOverflow === "ellipsis";
  const [textRef, isTruncated] = useTextTruncation(Boolean(isEllipsis));
  return /* @__PURE__ */ jsx(
    "span",
    {
      ref: textRef,
      className: clsx(
        base_legend_module_default["legend-item-text"],
        maxWidth != null && base_legend_module_default[`legend-item-text--${textOverflow}`]
      ),
      style: {
        ...maxWidth != null && {
          maxWidth,
          minWidth: 0
        }
      },
      title: isEllipsis && isTruncated ? text : void 0,
      children: text
    }
  );
};
var BaseLegend = forwardRef(
  ({
    items,
    className,
    orientation = "horizontal",
    position = "bottom",
    alignment = "center",
    maxWidth,
    textOverflow = "wrap",
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
    legendItemClassName,
    render,
    interactive = false,
    chartId,
    ...legendItemProps
  }, ref) => {
    const theme = useGlobalChartsTheme();
    const context = useContext2(GlobalChartsContext);
    const legendScale = scaleOrdinal({
      domain: items.map((item) => item.label),
      range: items.map((item) => item.color)
    });
    const domain = legendScale.domain();
    const getShapeStyle = useCallback(
      ({ index }) => items[index]?.shapeStyle,
      [items]
    );
    const handleLegendClick = useCallback(
      (seriesLabel) => {
        if (interactive && chartId && context) {
          context.toggleSeriesVisibility(chartId, seriesLabel);
        }
      },
      [interactive, chartId, context]
    );
    const isSeriesVisible = useCallback(
      (seriesLabel) => {
        if (!interactive || !chartId || !context) {
          return true;
        }
        return context.isSeriesVisible(chartId, seriesLabel);
      },
      [interactive, chartId, context]
    );
    const createClickHandler = useCallback(
      (labelText) => {
        if (!interactive) {
          return void 0;
        }
        return () => handleLegendClick(labelText);
      },
      [interactive, handleLegendClick]
    );
    const createKeyDownHandler = useCallback(
      (labelText) => {
        if (!interactive) {
          return void 0;
        }
        return (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleLegendClick(labelText);
          }
        };
      },
      [interactive, handleLegendClick]
    );
    return render ? render(items) : /* @__PURE__ */ jsx(
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
            children: labels.map((label, i) => {
              const visible = isSeriesVisible(label.text);
              const handleClick = createClickHandler(label.text);
              const handleKeyDown = createKeyDownHandler(label.text);
              return /* @__PURE__ */ jsxs(
                LegendItem,
                {
                  className: clsx(
                    "visx-legend-item",
                    base_legend_module_default["legend-item"],
                    interactive && base_legend_module_default["legend-item--interactive"],
                    !visible && base_legend_module_default["legend-item--inactive"],
                    legendItemClassName
                  ),
                  "data-testid": "legend-item",
                  margin: itemMargin,
                  flexDirection: orientation === "vertical" && alignment === "end" ? "row-reverse" : itemDirection,
                  onClick: handleClick,
                  onKeyDown: handleKeyDown,
                  role: interactive ? "button" : void 0,
                  tabIndex: interactive ? 0 : void 0,
                  "aria-pressed": interactive ? visible : void 0,
                  "aria-label": interactive ? `${label.text}: ${visible ? "visible" : "hidden"}. Toggle visibility.` : void 0,
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
                        className: clsx("visx-legend-label", base_legend_module_default["legend-item-label"]),
                        style: {
                          justifyContent: labelAlign,
                          flex: labelFlex,
                          margin: labelMargin,
                          ...theme.legendLabelStyles
                        },
                        ...legendLabelProps,
                        children: [
                          /* @__PURE__ */ jsx(
                            LegendText,
                            {
                              text: label.text,
                              textOverflow,
                              maxWidth
                            }
                          ),
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
              );
            })
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
    const contextItems = useMemo(() => {
      return contextChartId && context ? context.getChartData(contextChartId)?.legendItems : void 0;
    }, [contextChartId, context]);
    const legendItems = items || contextItems;
    if (!legendItems) {
      return null;
    }
    return /* @__PURE__ */ jsx2(BaseLegend, { ref, items: legendItems, ...props, chartId: contextChartId });
  }
);

// src/components/legend/hooks/use-chart-legend-items.ts
import { formatNumber } from "@automattic/number-formatters";
import { useMemo as useMemo2 } from "react";
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
        return formatNumber(percentagePoint.value);
      case "valueDisplay":
        return percentagePoint.valueDisplay || formatNumber(percentagePoint.value);
      default:
        return "";
    }
  }
  if ("value" in point) {
    return point.value !== null ? formatNumber(point.value) : "";
  }
  return "";
}
function applyGlyphToLegendItem(baseItem, withGlyph, glyph, renderGlyph, glyphSize) {
  if (withGlyph) {
    const glyphToUse = glyph || renderGlyph;
    if (glyphToUse) {
      return {
        ...baseItem,
        glyphSize,
        renderGlyph: glyphToUse
      };
    }
  }
  return baseItem;
}
function processSeriesData(seriesData, getElementStyles, showValues, withGlyph, glyphSize, renderGlyph, legendShape) {
  const mapper = (series, index) => {
    const { color, glyph, shapeStyles } = getElementStyles({
      data: series,
      index,
      legendShape
    });
    const baseItem = {
      label: series.label,
      value: showValues ? series.data?.length?.toString() || "0" : "",
      color,
      shapeStyle: shapeStyles
    };
    return applyGlyphToLegendItem(baseItem, withGlyph, glyph, renderGlyph, glyphSize);
  };
  return seriesData.map(mapper);
}
function processPointData(pointData, getElementStyles, showValues, legendValueDisplay, withGlyph, glyphSize, renderGlyph, legendShape) {
  const mapper = (point, index) => {
    const { color, glyph, shapeStyles } = getElementStyles({
      data: point,
      index,
      legendShape
    });
    const baseItem = {
      label: point.label,
      value: formatPointValue(point, showValues, legendValueDisplay),
      color,
      shapeStyle: shapeStyles
    };
    return applyGlyphToLegendItem(baseItem, withGlyph, glyph, renderGlyph, glyphSize);
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
  const { getElementStyles } = useGlobalChartsContext();
  return useMemo2(() => {
    if (!data || !Array.isArray(data) || data.length === 0) {
      return [];
    }
    if ("data" in data[0]) {
      return processSeriesData(
        data,
        getElementStyles,
        showValues,
        withGlyph,
        glyphSize,
        renderGlyph,
        legendShape
      );
    }
    return processPointData(
      data,
      getElementStyles,
      showValues,
      legendValueDisplay,
      withGlyph,
      glyphSize,
      renderGlyph,
      legendShape
    );
  }, [
    data,
    getElementStyles,
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
//# sourceMappingURL=chunk-MT3NPC5U.js.map