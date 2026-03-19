"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunkREZTQ4PHcjs = require('./chunk-REZTQ4PH.cjs');


var _chunkXVBH5XHEcjs = require('./chunk-XVBH5XHE.cjs');


var _chunkWYK7EL5Rcjs = require('./chunk-WYK7EL5R.cjs');

// src/charts/private/chart-composition/chart-svg.tsx
var _jsxruntime = require('react/jsx-runtime');
var ChartSVG = ({
  children
}) => {
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _jsxruntime.Fragment, {
    children
  });
};
ChartSVG.displayName = "Chart.SVG";

// src/charts/private/chart-composition/chart-html.tsx

var ChartHTML = ({
  children
}) => {
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _jsxruntime.Fragment, {
    children
  });
};
ChartHTML.displayName = "Chart.HTML";

// src/charts/private/chart-composition/use-chart-children.ts
var _group = require('@visx/group');
var _react = require('react');
function useChartChildren(children, chartType) {
  return _react.useMemo.call(void 0, () => {
    const svg = [];
    const html = [];
    const legend = [];
    const other = [];
    const nonLegend = [];
    _react.Children.forEach(children, (child) => {
      if (_react.isValidElement.call(void 0, child)) {
        if (child.type === _chunkXVBH5XHEcjs.Legend) {
          const rawPosition = _optionalChain([child, 'access', _ => _.props, 'optionalAccess', _2 => _2.position]);
          const position = rawPosition === "top" || rawPosition === "bottom" ? rawPosition : "bottom";
          legend.push({ element: child, position });
          return;
        }
        const childType = child.type;
        const displayName = _optionalChain([childType, 'optionalAccess', _3 => _3.displayName]);
        if (displayName === `${chartType}.SVG` || displayName === "Chart.SVG") {
          if (_optionalChain([child, 'access', _4 => _4.props, 'optionalAccess', _5 => _5.children])) {
            _react.Children.forEach(child.props.children, (svgChild) => {
              svg.push(svgChild);
            });
          }
        } else if (displayName === `${chartType}.HTML` || displayName === "Chart.HTML") {
          if (_optionalChain([child, 'access', _6 => _6.props, 'optionalAccess', _7 => _7.children])) {
            _react.Children.forEach(child.props.children, (htmlChild) => {
              html.push(htmlChild);
            });
          }
        } else if (child.type === _group.Group) {
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

function renderLegendSlot(legendChildren, position) {
  return legendChildren.filter((l) => l.position === position).map(
    (l, i) => _react.createElement.call(void 0, _react.Fragment, { key: `legend-${position}-${i}` }, l.element)
  );
}

// src/charts/private/chart-layout/chart-layout.tsx


// src/charts/private/chart-layout/chart-layout.module.scss
var chart_layout_module_default = {
  "chart-layout__content": "a8ccharts-gXtQZk"
};

// src/charts/private/chart-layout/chart-layout.tsx

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
  const [contentRef, contentWidth, contentHeight] = _chunkWYK7EL5Rcjs.useElementSize.call(void 0, );
  const isRenderProp = typeof children === "function";
  const isMeasured = contentHeight > 0;
  const visibilityStyle = isRenderProp && !isMeasured ? {
    visibility: "hidden"
  } : {};
  _react.useEffect.call(void 0, () => {
    if (isRenderProp && onContentHeightChange && isMeasured) {
      onContentHeightChange(contentHeight);
    }
  }, [isRenderProp, contentHeight, isMeasured, onContentHeightChange]);
  const renderedChildren = isRenderProp ? children({
    contentWidth,
    contentHeight,
    isMeasured
  }) : children;
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _chunkREZTQ4PHcjs.Stack, {
    direction: "column",
    gap,
    className,
    style: {
      ...style,
      ...visibilityStyle
    },
    "data-chart-id": dataChartId,
    children: [legendPosition === "top" && legendElement, renderLegendSlot(legendChildren, "top"), isRenderProp ? /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", {
      ref: contentRef,
      className: chart_layout_module_default["chart-layout__content"],
      children: renderedChildren
    }) : renderedChildren, legendPosition === "bottom" && legendElement, renderLegendSlot(legendChildren, "bottom"), trailingContent]
  });
};






exports.ChartSVG = ChartSVG; exports.ChartHTML = ChartHTML; exports.useChartChildren = useChartChildren; exports.ChartLayout = ChartLayout;
//# sourceMappingURL=chunk-NL53FCS3.cjs.map