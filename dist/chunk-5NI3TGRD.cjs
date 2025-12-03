"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } }// src/components/private/with-responsive/with-responsive.tsx
var _responsive = require('@visx/responsive');
var _jsxruntime = require('react/jsx-runtime');
var useResponsiveDimensions = ({
  resizeDebounceTime = 300,
  maxWidth = 1200,
  aspectRatio = 0.5
}) => {
  const { parentRef, width: parentWidth } = _responsive.useParentSize.call(void 0, {
    debounceTime: resizeDebounceTime,
    enableDebounceLeadingCall: true
  });
  const containerWidth = parentWidth > 0 ? Math.min(parentWidth, maxWidth) : 0;
  const containerHeight = containerWidth * aspectRatio;
  return { parentRef, width: containerWidth, height: containerHeight };
};
function withResponsive(WrappedComponent) {
  return function ResponsiveChart({
    resizeDebounceTime = 300,
    maxWidth = 1200,
    aspectRatio = 0.5,
    ...chartProps
  }) {
    const {
      parentRef,
      width: containerWidth,
      height: containerHeight
    } = useResponsiveDimensions({
      resizeDebounceTime,
      maxWidth,
      aspectRatio
    });
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
      "div",
      {
        ref: parentRef,
        style: {
          width: _nullishCoalesce(_nullishCoalesce(chartProps.size, () => ( chartProps.width)), () => ( "100%")),
          height: _nullishCoalesce(_nullishCoalesce(chartProps.size, () => ( chartProps.height)), () => ( "auto"))
        },
        children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
          WrappedComponent,
          {
            width: containerWidth,
            height: containerHeight,
            size: containerWidth,
            ...chartProps
          }
        )
      }
    );
  };
}



exports.withResponsive = withResponsive;
//# sourceMappingURL=chunk-5NI3TGRD.cjs.map