// src/components/tooltip/base-tooltip.tsx
import { formatNumber } from "@automattic/number-formatters";

// src/components/tooltip/base-tooltip.module.scss
var base_tooltip_module_default = {
  "tooltip": "a8ccharts-OfX6nd"
};

// src/components/tooltip/base-tooltip.tsx
import { Fragment as _Fragment, jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
var DefaultTooltipContent = ({
  data
}) => /* @__PURE__ */ _jsxs(_Fragment, {
  children: [data?.label, ": ", data?.valueDisplay || formatNumber(data?.value)]
});
var BaseTooltip = ({
  data,
  top,
  left,
  component: Component = DefaultTooltipContent,
  children,
  className,
  style,
  renderContainer = true
}) => {
  const content = children || data && /* @__PURE__ */ _jsx(Component, {
    data,
    className
  });
  if (!renderContainer) {
    return content;
  }
  return /* @__PURE__ */ _jsx("div", {
    className: base_tooltip_module_default.tooltip,
    style: {
      top,
      left,
      ...style
    },
    role: "tooltip",
    children: content
  });
};

// src/components/tooltip/accessible-tooltip.tsx
import { Tooltip, TooltipContext } from "@visx/xychart";
import { useContext, useEffect, useCallback, useMemo } from "react";
import { jsx as _jsx2 } from "react/jsx-runtime";
var AccessibleTooltip = ({
  renderTooltip,
  selectedIndex,
  tooltipRef,
  keyboardFocusedClassName,
  series = [],
  mode = "group",
  ...props
}) => {
  const tooltipContext = useContext(TooltipContext);
  const tooltipData = useMemo(() => {
    if (mode !== "individual") return [];
    if (series.length === 0) return [];
    const maxDataPoints = Math.max(...series.map((s) => s.data.length));
    const flattened = [];
    for (let dataPointIndex = 0; dataPointIndex < maxDataPoints; dataPointIndex++) {
      for (let seriesIndex = 0; seriesIndex < series.length; seriesIndex++) {
        const seriesData = series[seriesIndex];
        if (dataPointIndex < seriesData.data.length) {
          flattened.push({
            datum: seriesData.data[dataPointIndex],
            seriesLabel: seriesData.label,
            seriesIndex,
            dataPointIndex
          });
        }
      }
    }
    return flattened;
  }, [series, mode]);
  useEffect(() => {
    if (selectedIndex === void 0) {
      tooltipContext?.hideTooltip();
      return;
    }
    if (mode === "group") {
      series.forEach((s, index) => {
        if (selectedIndex < s.data.length) {
          const datum = s.data[selectedIndex];
          tooltipContext?.showTooltip({
            datum,
            key: s.label,
            index
          });
        }
      });
    } else if (mode === "individual") {
      if (selectedIndex < tooltipData.length) {
        const tooltipItem = tooltipData[selectedIndex];
        tooltipContext?.showTooltip({
          datum: tooltipItem.datum,
          key: tooltipItem.seriesLabel,
          index: tooltipItem.seriesIndex
        });
      }
    }
  }, [selectedIndex, tooltipData, series]);
  const focusableRenderTooltip = useMemo(() => {
    if (!renderTooltip) return void 0;
    return (params) => {
      const tooltipContent = renderTooltip(params);
      if (selectedIndex !== void 0) {
        return /* @__PURE__ */ _jsx2("div", {
          ref: tooltipRef,
          tabIndex: -1,
          role: "tooltip",
          "aria-atomic": "true",
          className: keyboardFocusedClassName,
          children: tooltipContent
        }, `chart-tooltip-${selectedIndex}`);
      }
      return /* @__PURE__ */ _jsx2("div", {
        role: "tooltip",
        "aria-live": "polite",
        children: tooltipContent
      });
    };
  }, [renderTooltip, selectedIndex, tooltipRef, keyboardFocusedClassName]);
  return /* @__PURE__ */ _jsx2(Tooltip, {
    ...props,
    renderTooltip: focusableRenderTooltip
  });
};
var useKeyboardNavigation = ({
  selectedIndex,
  setSelectedIndex,
  isNavigating,
  setIsNavigating,
  chartRef,
  totalPoints
}) => {
  const tooltipRef = useCallback((element) => {
    if (element && selectedIndex !== void 0) {
      element.focus();
    }
  }, [selectedIndex]);
  const onChartFocus = useCallback(() => {
    if (!isNavigating && selectedIndex !== void 0) {
      setSelectedIndex(0);
    }
  }, [isNavigating, selectedIndex, setSelectedIndex]);
  const onChartBlur = useCallback(() => {
    setIsNavigating(false);
  }, [setIsNavigating]);
  const onChartKeyDown = useCallback((event) => {
    if (totalPoints === 0) return;
    if (event.key === "Tab") {
      chartRef.current?.focus();
      setSelectedIndex(void 0);
      setIsNavigating(false);
      return;
    }
    const currentSelectedIndex = selectedIndex === void 0 ? -1 : selectedIndex;
    if (currentSelectedIndex + 1 >= totalPoints && ["ArrowRight"].includes(event.key)) {
      chartRef.current?.focus();
      setSelectedIndex(void 0);
      setIsNavigating(false);
      return;
    }
    event.preventDefault();
    if (["ArrowRight"].includes(event.key)) {
      setIsNavigating(true);
      setSelectedIndex((currentSelectedIndex + 1) % totalPoints);
    } else if (["ArrowLeft"].includes(event.key)) {
      setIsNavigating(true);
      setSelectedIndex((currentSelectedIndex - 1 + totalPoints) % totalPoints);
    } else if (event.key === "Escape") {
      setSelectedIndex(void 0);
      setIsNavigating(false);
      chartRef.current?.focus();
    }
  }, [totalPoints, selectedIndex, setSelectedIndex, setIsNavigating, chartRef]);
  return {
    tooltipRef,
    onChartFocus,
    onChartBlur,
    onChartKeyDown
  };
};

export {
  BaseTooltip,
  AccessibleTooltip,
  useKeyboardNavigation
};
//# sourceMappingURL=chunk-BPYKWMI7.js.map