"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _chunkREZTQ4PHcjs = require('./chunk-REZTQ4PH.cjs');

// src/charts/private/svg-empty-state/svg-empty-state.module.scss
var svg_empty_state_module_default = {
  "svg-empty-state": "a8ccharts-tGXBHV"
};

// src/charts/private/svg-empty-state/svg-empty-state.tsx
var _jsxruntime = require('react/jsx-runtime');
var SvgEmptyState = ({
  x,
  y,
  width,
  height,
  children
}) => {
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "foreignObject", {
    x: x - width / 2,
    y: y - height / 2,
    width,
    height,
    children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _chunkREZTQ4PHcjs.Stack, {
      align: "center",
      justify: "center",
      className: svg_empty_state_module_default["svg-empty-state"],
      children
    })
  });
};



exports.SvgEmptyState = SvgEmptyState;
//# sourceMappingURL=chunk-5NWDCSDI.cjs.map