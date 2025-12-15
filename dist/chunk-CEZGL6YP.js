// src/charts/private/chart-composition/chart-svg.tsx
import { Fragment, jsx } from "react/jsx-runtime";
var ChartSVG = ({ children }) => {
  return /* @__PURE__ */ jsx(Fragment, { children });
};
ChartSVG.displayName = "Chart.SVG";

// src/charts/private/chart-composition/chart-html.tsx
import { Fragment as Fragment2, jsx as jsx2 } from "react/jsx-runtime";
var ChartHTML = ({ children }) => {
  return /* @__PURE__ */ jsx2(Fragment2, { children });
};
ChartHTML.displayName = "Chart.HTML";

// src/charts/private/chart-composition/use-chart-children.ts
import { Group } from "@visx/group";
import { useMemo, Children, isValidElement } from "react";
function useChartChildren(children, chartType) {
  return useMemo(() => {
    const svg = [];
    const html = [];
    const other = [];
    Children.forEach(children, (child) => {
      if (isValidElement(child)) {
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
    });
    return { svgChildren: svg, htmlChildren: html, otherChildren: other };
  }, [children, chartType]);
}

export {
  ChartSVG,
  ChartHTML,
  useChartChildren
};
//# sourceMappingURL=chunk-CEZGL6YP.js.map