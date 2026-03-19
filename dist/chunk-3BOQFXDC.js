import {
  Stack
} from "./chunk-YAFQVVDI.js";
import {
  Legend
} from "./chunk-WTQYGUNF.js";
import {
  useElementSize
} from "./chunk-2I67QUIV.js";

// src/charts/private/chart-composition/chart-svg.tsx
import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
var ChartSVG = ({
  children
}) => {
  return /* @__PURE__ */ _jsx(_Fragment, {
    children
  });
};
ChartSVG.displayName = "Chart.SVG";

// src/charts/private/chart-composition/chart-html.tsx
import { Fragment as _Fragment2, jsx as _jsx2 } from "react/jsx-runtime";
var ChartHTML = ({
  children
}) => {
  return /* @__PURE__ */ _jsx2(_Fragment2, {
    children
  });
};
ChartHTML.displayName = "Chart.HTML";

// src/charts/private/chart-composition/use-chart-children.ts
import { Group } from "@visx/group";
import { useMemo, Children, isValidElement } from "react";
function useChartChildren(children, chartType) {
  return useMemo(() => {
    const svg = [];
    const html = [];
    const legend = [];
    const other = [];
    const nonLegend = [];
    Children.forEach(children, (child) => {
      if (isValidElement(child)) {
        if (child.type === Legend) {
          const rawPosition = child.props?.position;
          const position = rawPosition === "top" || rawPosition === "bottom" ? rawPosition : "bottom";
          legend.push({ element: child, position });
          return;
        }
        const childType = child.type;
        const displayName = childType?.displayName;
        if (displayName === `${chartType}.SVG` || displayName === "Chart.SVG") {
          if (child.props?.children) {
            Children.forEach(child.props.children, (svgChild) => {
              svg.push(svgChild);
            });
          }
        } else if (displayName === `${chartType}.HTML` || displayName === "Chart.HTML") {
          if (child.props?.children) {
            Children.forEach(child.props.children, (htmlChild) => {
              html.push(htmlChild);
            });
          }
        } else if (child.type === Group) {
          svg.push(child);
        } else {
          other.push(child);
        }
      }
      nonLegend.push(child);
    });
    return {
      svgChildren: svg,
      htmlChildren: html,
      legendChildren: legend,
      otherChildren: other,
      nonLegendChildren: nonLegend
    };
  }, [children, chartType]);
}

// src/charts/private/chart-composition/render-legend-slot.ts
import { createElement, Fragment } from "react";
function renderLegendSlot(legendChildren, position) {
  return legendChildren.filter((l) => l.position === position).map(
    (l, i) => createElement(Fragment, { key: `legend-${position}-${i}` }, l.element)
  );
}

// src/charts/private/chart-layout/chart-layout.tsx
import { useEffect } from "react";

// src/charts/private/chart-layout/chart-layout.module.scss
var chart_layout_module_default = {
  "chart-layout__content": "a8ccharts-gXtQZk"
};

// src/charts/private/chart-layout/chart-layout.tsx
import { jsx as _jsx3, jsxs as _jsxs } from "react/jsx-runtime";
var ChartLayout = ({
  legendPosition,
  legendElement,
  legendChildren,
  children,
  trailingContent,
  onContentHeightChange,
  gap,
  className,
  style,
  "data-testid": dataTestId,
  "data-chart-id": dataChartId
}) => {
  const [contentRef, contentWidth, contentHeight] = useElementSize();
  const isRenderProp = typeof children === "function";
  const isMeasured = contentHeight > 0;
  const visibilityStyle = isRenderProp && !isMeasured ? {
    visibility: "hidden"
  } : {};
  useEffect(() => {
    if (isRenderProp && onContentHeightChange && isMeasured) {
      onContentHeightChange(contentHeight);
    }
  }, [isRenderProp, contentHeight, isMeasured, onContentHeightChange]);
  const renderedChildren = isRenderProp ? children({
    contentWidth,
    contentHeight,
    isMeasured
  }) : children;
  return /* @__PURE__ */ _jsxs(Stack, {
    direction: "column",
    gap,
    className,
    style: {
      ...style,
      ...visibilityStyle
    },
    "data-chart-id": dataChartId,
    children: [legendPosition === "top" && legendElement, renderLegendSlot(legendChildren, "top"), isRenderProp ? /* @__PURE__ */ _jsx3("div", {
      ref: contentRef,
      className: chart_layout_module_default["chart-layout__content"],
      children: renderedChildren
    }) : renderedChildren, legendPosition === "bottom" && legendElement, renderLegendSlot(legendChildren, "bottom"), trailingContent]
  });
};

export {
  ChartSVG,
  ChartHTML,
  useChartChildren,
  ChartLayout
};
//# sourceMappingURL=chunk-3BOQFXDC.js.map