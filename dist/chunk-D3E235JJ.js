// src/components/private/with-responsive/with-responsive.tsx
import { useParentSize } from "@visx/responsive";
import { jsx } from "react/jsx-runtime";
var useResponsiveDimensions = ({
  resizeDebounceTime = 300,
  maxWidth = 1200,
  aspectRatio = 0.5
}) => {
  const { parentRef, width: parentWidth } = useParentSize({
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
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref: parentRef,
        style: {
          width: chartProps.size ?? chartProps.width ?? "100%",
          height: chartProps.size ?? chartProps.height ?? "auto"
        },
        children: /* @__PURE__ */ jsx(
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

export {
  withResponsive
};
//# sourceMappingURL=chunk-D3E235JJ.js.map