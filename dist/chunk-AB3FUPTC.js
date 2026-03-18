import {
  Stack
} from "./chunk-YAFQVVDI.js";

// src/charts/private/svg-empty-state/svg-empty-state.module.scss
var svg_empty_state_module_default = {
  "svg-empty-state": "a8ccharts-tGXBHV"
};

// src/charts/private/svg-empty-state/svg-empty-state.tsx
import { jsx as _jsx } from "react/jsx-runtime";
var SvgEmptyState = ({
  x,
  y,
  width,
  height,
  children
}) => {
  return /* @__PURE__ */ _jsx("foreignObject", {
    x: x - width / 2,
    y: y - height / 2,
    width,
    height,
    children: /* @__PURE__ */ _jsx(Stack, {
      align: "center",
      justify: "center",
      className: svg_empty_state_module_default["svg-empty-state"],
      children
    })
  });
};

export {
  SvgEmptyState
};
//# sourceMappingURL=chunk-AB3FUPTC.js.map