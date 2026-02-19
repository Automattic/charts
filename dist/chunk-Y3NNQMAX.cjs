"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }// src/components/tooltip/base-tooltip.tsx
var _numberformatters = require('@automattic/number-formatters');

// src/components/tooltip/base-tooltip.module.scss
var base_tooltip_module_default = {
  "tooltip": "a8ccharts-OfX6nd"
};

// src/components/tooltip/base-tooltip.tsx
var _jsxruntime = require('react/jsx-runtime');
var DefaultTooltipContent = ({
  data
}) => /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _jsxruntime.Fragment, {
  children: [_optionalChain([data, 'optionalAccess', _ => _.label]), ": ", _optionalChain([data, 'optionalAccess', _2 => _2.valueDisplay]) || _numberformatters.formatNumber.call(void 0, _optionalChain([data, 'optionalAccess', _3 => _3.value]))]
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
  const content = children || data && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Component, {
    data,
    className
  });
  if (!renderContainer) {
    return content;
  }
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", {
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
var _xychart = require('@visx/xychart');
var _react = require('react');

var AccessibleTooltip = ({
  renderTooltip,
  selectedIndex,
  tooltipRef,
  keyboardFocusedClassName,
  series = [],
  mode = "group",
  ...props
}) => {
  const tooltipContext = _react.useContext.call(void 0, _xychart.TooltipContext);
  const tooltipData = _react.useMemo.call(void 0, () => {
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
  _react.useEffect.call(void 0, () => {
    if (selectedIndex === void 0) {
      _optionalChain([tooltipContext, 'optionalAccess', _4 => _4.hideTooltip, 'call', _5 => _5()]);
      return;
    }
    if (mode === "group") {
      series.forEach((s, index) => {
        if (selectedIndex < s.data.length) {
          const datum = s.data[selectedIndex];
          _optionalChain([tooltipContext, 'optionalAccess', _6 => _6.showTooltip, 'call', _7 => _7({
            datum,
            key: s.label,
            index
          })]);
        }
      });
    } else if (mode === "individual") {
      if (selectedIndex < tooltipData.length) {
        const tooltipItem = tooltipData[selectedIndex];
        _optionalChain([tooltipContext, 'optionalAccess', _8 => _8.showTooltip, 'call', _9 => _9({
          datum: tooltipItem.datum,
          key: tooltipItem.seriesLabel,
          index: tooltipItem.seriesIndex
        })]);
      }
    }
  }, [selectedIndex, tooltipData, series]);
  const focusableRenderTooltip = _react.useMemo.call(void 0, () => {
    if (!renderTooltip) return void 0;
    return (params) => {
      const tooltipContent = renderTooltip(params);
      if (selectedIndex !== void 0) {
        return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", {
          ref: tooltipRef,
          tabIndex: -1,
          role: "tooltip",
          "aria-atomic": "true",
          className: keyboardFocusedClassName,
          children: tooltipContent
        }, `chart-tooltip-${selectedIndex}`);
      }
      return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", {
        role: "tooltip",
        "aria-live": "polite",
        children: tooltipContent
      });
    };
  }, [renderTooltip, selectedIndex, tooltipRef, keyboardFocusedClassName]);
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _xychart.Tooltip, {
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
  const tooltipRef = _react.useCallback.call(void 0, (element) => {
    if (element && selectedIndex !== void 0) {
      element.focus();
    }
  }, [selectedIndex]);
  const onChartFocus = _react.useCallback.call(void 0, () => {
    if (!isNavigating && selectedIndex !== void 0) {
      setSelectedIndex(0);
    }
  }, [isNavigating, selectedIndex, setSelectedIndex]);
  const onChartBlur = _react.useCallback.call(void 0, () => {
    setIsNavigating(false);
  }, [setIsNavigating]);
  const onChartKeyDown = _react.useCallback.call(void 0, (event) => {
    if (totalPoints === 0) return;
    if (event.key === "Tab") {
      _optionalChain([chartRef, 'access', _10 => _10.current, 'optionalAccess', _11 => _11.focus, 'call', _12 => _12()]);
      setSelectedIndex(void 0);
      setIsNavigating(false);
      return;
    }
    const currentSelectedIndex = selectedIndex === void 0 ? -1 : selectedIndex;
    if (currentSelectedIndex + 1 >= totalPoints && ["ArrowRight"].includes(event.key)) {
      _optionalChain([chartRef, 'access', _13 => _13.current, 'optionalAccess', _14 => _14.focus, 'call', _15 => _15()]);
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
      _optionalChain([chartRef, 'access', _16 => _16.current, 'optionalAccess', _17 => _17.focus, 'call', _18 => _18()]);
    }
  }, [totalPoints, selectedIndex, setSelectedIndex, setIsNavigating, chartRef]);
  return {
    tooltipRef,
    onChartFocus,
    onChartBlur,
    onChartKeyDown
  };
};





exports.BaseTooltip = BaseTooltip; exports.AccessibleTooltip = AccessibleTooltip; exports.useKeyboardNavigation = useKeyboardNavigation;
//# sourceMappingURL=chunk-Y3NNQMAX.cjs.map