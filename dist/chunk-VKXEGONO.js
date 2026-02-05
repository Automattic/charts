// src/charts/private/with-responsive/with-responsive.tsx
import { useParentSize } from "@visx/responsive";
import { jsx } from "react/jsx-runtime";
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
    const effectiveWidth = measuredWidth || size || width || 0;
    const effectiveHeight = measuredHeight || size || height || 0;
    const defaultHeight = hasAspectRatio ? "auto" : "100%";
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref: parentRef,
        "data-testid": "responsive-wrapper",
        style: {
          width: size ?? width ?? "100%",
          height: size ?? height ?? defaultHeight
        },
        children: /* @__PURE__ */ jsx(
          WrappedComponent,
          {
            width: effectiveWidth,
            height: effectiveHeight,
            size: effectiveWidth,
            ...chartProps
          }
        )
      }
    );
  };
}

export {
  withResponsive
};
//# sourceMappingURL=chunk-VKXEGONO.js.map