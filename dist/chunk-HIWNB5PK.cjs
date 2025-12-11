"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }// src/charts/private/chart-composition/chart-svg.tsx
var _jsxruntime = require('react/jsx-runtime');
var ChartSVG = ({ children }) => {
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _jsxruntime.Fragment, { children });
};
ChartSVG.displayName = "Chart.SVG";

// src/charts/private/chart-composition/chart-html.tsx

var ChartHTML = ({ children }) => {
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _jsxruntime.Fragment, { children });
};
ChartHTML.displayName = "Chart.HTML";

// src/charts/private/chart-composition/use-chart-children.ts
var _group = require('@visx/group');
var _react = require('react');
function useChartChildren(children, chartType) {
  return _react.useMemo.call(void 0, () => {
    const svg = [];
    const html = [];
    const other = [];
    _react.Children.forEach(children, (child) => {
      if (_react.isValidElement.call(void 0, child)) {
        const childType = child.type;
        const displayName = _optionalChain([childType, 'optionalAccess', _ => _.displayName]);
        if (displayName === `${chartType}.SVG` || displayName === "Chart.SVG") {
          if (_optionalChain([child, 'access', _2 => _2.props, 'optionalAccess', _3 => _3.children])) {
            _react.Children.forEach(child.props.children, (svgChild) => {
              svg.push(svgChild);
            });
          }
        } else if (displayName === `${chartType}.HTML` || displayName === "Chart.HTML") {
          if (_optionalChain([child, 'access', _4 => _4.props, 'optionalAccess', _5 => _5.children])) {
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
    });
    return { svgChildren: svg, htmlChildren: html, otherChildren: other };
  }, [children, chartType]);
}





exports.ChartSVG = ChartSVG; exports.ChartHTML = ChartHTML; exports.useChartChildren = useChartChildren;
//# sourceMappingURL=chunk-HIWNB5PK.cjs.map