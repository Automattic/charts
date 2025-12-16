"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// src/components/trend-indicator/trend-indicator.tsx
var _clsx = require('clsx'); var _clsx2 = _interopRequireDefault(_clsx);

// src/components/trend-indicator/trend-indicator.module.scss
var trend_indicator_module_default = {
  "trend-indicator": "a8ccharts-tGw1PY",
  "trend-indicator--up": "a8ccharts-Fn-D1W",
  "trend-indicator--down": "a8ccharts-HqtGQO",
  "trend-indicator--neutral": "a8ccharts-S10nvO",
  "trend-indicator__icon": "a8ccharts-5HjpOT",
  "trend-indicator__value": "a8ccharts-muLL2Q"
};

// src/components/trend-indicator/trend-indicator.tsx
var _jsxruntime = require('react/jsx-runtime');
var DIRECTION_LABELS = {
  up: "Increase",
  down: "Decrease",
  neutral: "No change"
};
var Icon = ({ direction }) => {
  if (direction === "neutral") {
    return null;
  }
  const isUp = direction === "up";
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
    "svg",
    {
      className: trend_indicator_module_default["trend-indicator__icon"],
      viewBox: "0 0 16 16",
      fill: "none",
      "aria-hidden": "true",
      children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
        "path",
        {
          d: isUp ? "M8 13V3M4 7l4-4 4 4" : "M8 3v10M4 9l4 4 4-4",
          stroke: "currentColor",
          strokeWidth: "1.5",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }
      )
    }
  );
};
function TrendIndicator({
  direction,
  value,
  className,
  style,
  showIcon = true
}) {
  const ariaLabel = `${DIRECTION_LABELS[direction]}: ${value}`;
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
    "span",
    {
      className: _clsx2.default.call(void 0, 
        trend_indicator_module_default["trend-indicator"],
        trend_indicator_module_default[`trend-indicator--${direction}`],
        className
      ),
      style,
      "aria-label": ariaLabel,
      children: [
        showIcon && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Icon, { direction }),
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: trend_indicator_module_default["trend-indicator__value"], children: value })
      ]
    }
  );
}



exports.TrendIndicator = TrendIndicator;
//# sourceMappingURL=chunk-SRXJLAKG.cjs.map