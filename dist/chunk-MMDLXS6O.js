// src/components/trend-indicator/trend-indicator.tsx
import clsx from "clsx";

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
import { jsx, jsxs } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsx(
    "svg",
    {
      className: trend_indicator_module_default["trend-indicator__icon"],
      viewBox: "0 0 16 16",
      fill: "none",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsxs(
    "span",
    {
      className: clsx(
        trend_indicator_module_default["trend-indicator"],
        trend_indicator_module_default[`trend-indicator--${direction}`],
        className
      ),
      style,
      "aria-label": ariaLabel,
      children: [
        showIcon && /* @__PURE__ */ jsx(Icon, { direction }),
        /* @__PURE__ */ jsx("span", { className: trend_indicator_module_default["trend-indicator__value"], children: value })
      ]
    }
  );
}

export {
  TrendIndicator
};
//# sourceMappingURL=chunk-MMDLXS6O.js.map