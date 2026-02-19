"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } }// src/charts/private/with-responsive/with-responsive.tsx
var _responsive = require('@visx/responsive');

// src/charts/private/with-responsive/with-responsive.module.scss
var with_responsive_module_default = {
  "container": "a8ccharts-GSKfBD"
};

// src/charts/private/with-responsive/with-responsive.tsx
var _jsxruntime = require('react/jsx-runtime');
var useResponsiveDimensions = ({
  resizeDebounceTime = 300,
  maxWidth = 1200,
  aspectRatio
}) => {
  const {
    parentRef,
    width: parentWidth,
    height: parentHeight
  } = _responsive.useParentSize.call(void 0, {
    debounceTime: resizeDebounceTime,
    enableDebounceLeadingCall: true
  });
  const containerWidth = parentWidth > 0 ? Math.min(parentWidth, maxWidth) : 0;
  const containerHeight = aspectRatio !== void 0 ? containerWidth * aspectRatio : parentHeight;
  return {
    parentRef,
    width: containerWidth,
    height: containerHeight,
    /**
     * Whether an aspectRatio was provided. Used to determine container
     * height styling: 'auto' when true (height derived from width),
     * '100%' when false (fill parent container).
     */
    hasAspectRatio: aspectRatio !== void 0
  };
};
function withResponsive(WrappedComponent) {
  return function ResponsiveChart({
    resizeDebounceTime = 300,
    maxWidth = 1200,
    aspectRatio,
    size,
    width,
    height,
    ...chartProps
  }) {
    const {
      parentRef,
      width: measuredWidth,
      height: measuredHeight,
      hasAspectRatio
    } = useResponsiveDimensions({
      resizeDebounceTime,
      maxWidth,
      aspectRatio
    });
    const effectiveWidth = measuredWidth || size || width || 0;
    const effectiveHeight = measuredHeight || size || height || 0;
    const defaultHeight = hasAspectRatio ? "auto" : "100%";
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", {
      ref: parentRef,
      className: with_responsive_module_default.container,
      style: {
        width: _nullishCoalesce(_nullishCoalesce(size, () => ( width)), () => ( "100%")),
        height: _nullishCoalesce(_nullishCoalesce(size, () => ( height)), () => ( defaultHeight))
      },
      children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, WrappedComponent, {
        width: effectiveWidth,
        height: effectiveHeight,
        size: effectiveWidth,
        ...chartProps
      })
    });
  };
}



exports.withResponsive = withResponsive;
//# sourceMappingURL=chunk-7QDEU3KN.cjs.map