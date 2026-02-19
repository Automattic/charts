"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/charts/private/radial-wipe-animation/radial-wipe-animation.tsx
var _jsxruntime = require('react/jsx-runtime');
function RadialWipeAnimation({
  id,
  radius,
  innerRadius = 0,
  durationMs = 1e3,
  wipePercentage = 100,
  direction = "clockwise",
  startAngle = "-90deg"
}) {
  const strokeWidth = (radius - innerRadius) * 2 + // The stroke is centered on the circumference, so we need to double the width.
  1;
  const scaleY = direction === "clockwise" ? -1 : 1;
  const isValidWipePercentage = 0 < wipePercentage && wipePercentage <= 100;
  const animationDuration = `${// If wipePercentage is invalid, set animation duration to 0 to disable animation.
  isValidWipePercentage ? durationMs * (100 / wipePercentage) : 0}ms`;
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "mask", {
    id,
    children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "circle", {
      cx: 0,
      cy: 0,
      r: radius,
      pathLength: "100",
      fill: "white",
      stroke: "black",
      strokeWidth,
      strokeDasharray: "100, 1000",
      strokeDashoffset: "0",
      style: {
        transform: `rotate(${startAngle}) scaleY(${scaleY})`
      },
      children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "animate", {
        attributeName: "stroke-dashoffset",
        from: "0",
        to: "100.1",
        dur: animationDuration,
        fill: "freeze",
        calcMode: "spline",
        keySplines: "0.42 0 0.58 1;0 0 1 1",
        keyTimes: `0;${wipePercentage / 100};1`
      })
    })
  });
}
var radial_wipe_animation_default = RadialWipeAnimation;



exports.radial_wipe_animation_default = radial_wipe_animation_default;
//# sourceMappingURL=chunk-2A34OA5O.cjs.map