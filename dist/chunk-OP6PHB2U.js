// src/charts/private/with-responsive/with-responsive.tsx
import { useParentSize } from "@visx/responsive";

// src/charts/private/with-responsive/with-responsive.module.scss
var with_responsive_module_default = {
  "container": "a8ccharts-GSKfBD"
};

// src/charts/private/with-responsive/with-responsive.tsx
import { jsx as _jsx } from "react/jsx-runtime";
var useResponsiveDimensions = ({
  resizeDebounceTime = 300,
  maxWidth = 1200,
  aspectRatio
}) => {
  const {
    parentRef,
    width: parentWidth,
    height: parentHeight
  } = useParentSize({
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
    const effectiveWidth = measuredWidth || width || 0;
    const effectiveHeight = measuredHeight || height || 0;
    const defaultHeight = hasAspectRatio ? "auto" : "100%";
    return /* @__PURE__ */ _jsx("div", {
      ref: parentRef,
      className: with_responsive_module_default.container,
      style: {
        width: width ?? "100%",
        height: height ?? defaultHeight
      },
      children: /* @__PURE__ */ _jsx(WrappedComponent, {
        width: effectiveWidth,
        height: effectiveHeight,
        size,
        ...chartProps
      })
    });
  };
}

export {
  withResponsive
};
//# sourceMappingURL=chunk-OP6PHB2U.js.map