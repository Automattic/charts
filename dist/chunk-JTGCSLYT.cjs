"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }



var _chunkP6GF5KEQcjs = require('./chunk-P6GF5KEQ.cjs');

// src/components/conversion-funnel-chart/conversion-funnel-chart.tsx
var _event = require('@visx/event');
var _tooltip = require('@visx/tooltip');
var _clsx = require('clsx'); var _clsx2 = _interopRequireDefault(_clsx);
var _react = require('react');

// src/components/conversion-funnel-chart/conversion-funnel-chart.module.scss
var conversion_funnel_chart_module_default = {
  "conversionFunnelChart": "a8ccharts--9Qsb0",
  "loading": "a8ccharts-Kw-iZo",
  "main-metric": "a8ccharts-8mIwVL",
  "main-rate": "a8ccharts-D93Ubo",
  "change-indicator": "a8ccharts-QWypVS",
  "funnel-container": "a8ccharts-RR7xaC",
  "funnel-step": "a8ccharts-VIVztE",
  "blurred": "a8ccharts-Ax4cuC",
  "step-header": "a8ccharts-bUrZ0x",
  "step-label": "a8ccharts-SCy8FA",
  "step-rate": "a8ccharts-A0irBo",
  "bar-container": "a8ccharts-5Dl5-j",
  "selected": "a8ccharts-W40FYh",
  "disabled": "a8ccharts-Reovk6",
  "funnel-bar": "a8ccharts-tG5m3L",
  "tooltip-wrapper": "a8ccharts-NohPt6",
  "tooltip-title": "a8ccharts-hjZr33",
  "tooltip-content": "a8ccharts-ocwAPj",
  "empty-state": "a8ccharts-9c0psv"
};

// src/components/conversion-funnel-chart/private/use-funnel-selection.ts

var useFunnelSelection = (hideTooltip) => {
  const [clickedStep, setClickedStep] = _react.useState.call(void 0, null);
  const handleBarClick = _react.useCallback.call(void 0, 
    (stepId) => {
      if (clickedStep === stepId) {
        setClickedStep(null);
        _optionalChain([hideTooltip, 'optionalCall', _ => _()]);
      } else {
        setClickedStep(stepId);
      }
    },
    [clickedStep, hideTooltip]
  );
  const handleBarKeyDown = _react.useCallback.call(void 0, 
    (stepId, event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        if (clickedStep === stepId) {
          setClickedStep(null);
          _optionalChain([hideTooltip, 'optionalCall', _2 => _2()]);
        } else {
          setClickedStep(stepId);
        }
      } else if (event.key === "Escape") {
        event.preventDefault();
        setClickedStep(null);
        _optionalChain([hideTooltip, 'optionalCall', _3 => _3()]);
      }
    },
    [clickedStep, hideTooltip]
  );
  const clearSelection = _react.useCallback.call(void 0, () => {
    setClickedStep(null);
    _optionalChain([hideTooltip, 'optionalCall', _4 => _4()]);
  }, [hideTooltip]);
  const getStepState = _react.useCallback.call(void 0, 
    (stepId) => ({
      isClicked: clickedStep === stepId,
      isBlurred: clickedStep !== null && clickedStep !== stepId
    }),
    [clickedStep]
  );
  return {
    clickedStep,
    handleBarClick,
    handleBarKeyDown,
    clearSelection,
    getStepState
  };
};

// src/components/conversion-funnel-chart/conversion-funnel-chart.tsx
var _jsxruntime = require('react/jsx-runtime');
var DEFAULT_FUNNEL_SETTINGS = {
  primaryColor: "#4F46E5",
  backgroundColor: "#F3F4F6",
  positiveChangeColor: "#10B981",
  negativeChangeColor: "#EF4444"
};
var ConversionFunnelChart = ({
  mainRate,
  changeIndicator,
  steps,
  loading = false,
  className,
  style,
  renderStepLabel,
  renderStepRate,
  renderMainMetric,
  renderTooltip
}) => {
  const theme = _chunkP6GF5KEQcjs.useGlobalChartsTheme.call(void 0, );
  const chartRef = _react.useRef.call(void 0, null);
  const selectedBarRef = _react.useRef.call(void 0, null);
  const { tooltipData, tooltipLeft, tooltipTop, tooltipOpen, showTooltip, hideTooltip } = _tooltip.useTooltip.call(void 0, );
  const { handleBarClick, handleBarKeyDown, clearSelection, getStepState } = useFunnelSelection(hideTooltip);
  const { containerRef: portalContainerRef, TooltipInPortal } = _tooltip.useTooltipInPortal.call(void 0, {
    // use TooltipWithBounds for boundary detection
    detectBounds: true,
    // when tooltip containers are scrolled, this will correctly update the Tooltip position
    scroll: true
  });
  const clearSelectionAndRef = _react.useCallback.call(void 0, () => {
    clearSelection();
    selectedBarRef.current = null;
    hideTooltip();
  }, [clearSelection, hideTooltip]);
  const showTooltipAt = _react.useCallback.call(void 0, 
    (step, x, y) => {
      showTooltip({
        tooltipData: step,
        tooltipLeft: x,
        tooltipTop: y - 10
      });
    },
    [showTooltip]
  );
  const getMouseTooltipCoords = _react.useCallback.call(void 0, (event) => {
    const containerElement = chartRef.current;
    if (containerElement) {
      const coords = _event.localPoint.call(void 0, containerElement, event.nativeEvent);
      if (coords) {
        return { x: coords.x, y: coords.y };
      }
    }
    return null;
  }, []);
  const getKeyboardTooltipCoords = _react.useCallback.call(void 0, (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const containerElement = chartRef.current;
    if (containerElement) {
      const containerRect = containerElement.getBoundingClientRect();
      const x = rect.left + rect.width / 2 - containerRect.left;
      const y = rect.top - containerRect.top;
      return { x, y };
    }
    return null;
  }, []);
  const handleStepInteraction = _react.useCallback.call(void 0, 
    (step, event, interactionType) => {
      selectedBarRef.current = event.currentTarget;
      const { isClicked } = getStepState(step.id);
      if (isClicked) {
        if (interactionType === "click") {
          handleBarClick(step.id);
        } else {
          handleBarKeyDown(step.id, event);
        }
        return;
      }
      if (interactionType === "click") {
        handleBarClick(step.id);
        const coords = getMouseTooltipCoords(event);
        if (coords) {
          showTooltipAt(step, coords.x, coords.y);
        }
      } else {
        handleBarKeyDown(step.id, event);
        const coords = getKeyboardTooltipCoords(event);
        if (coords) {
          showTooltipAt(step, coords.x, coords.y);
        }
      }
    },
    [
      getStepState,
      handleBarClick,
      handleBarKeyDown,
      showTooltipAt,
      getMouseTooltipCoords,
      getKeyboardTooltipCoords
    ]
  );
  const stepHandlers = _react.useMemo.call(void 0, () => {
    const handlers = /* @__PURE__ */ new Map();
    steps.forEach((step) => {
      const onClick = (event) => {
        event.stopPropagation();
        handleStepInteraction(step, event, "click");
      };
      const onKeyDown = (event) => {
        if (event.key === "Enter" || event.key === " ") {
          handleStepInteraction(step, event, "keyboard");
        } else {
          selectedBarRef.current = event.currentTarget;
          handleBarKeyDown(step.id, event);
        }
      };
      handlers.set(step.id, { onClick, onKeyDown });
    });
    return handlers;
  }, [steps, handleStepInteraction, handleBarKeyDown]);
  _react.useEffect.call(void 0, () => {
    const handleDocumentClick = (event) => {
      if (selectedBarRef.current && !selectedBarRef.current.contains(event.target)) {
        clearSelectionAndRef();
      }
    };
    document.addEventListener("mousedown", handleDocumentClick);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, [clearSelectionAndRef]);
  const funnelSettings = theme.conversionFunnelChart;
  const primaryColor = _optionalChain([funnelSettings, 'optionalAccess', _5 => _5.primaryColor]) || DEFAULT_FUNNEL_SETTINGS.primaryColor;
  const positiveChangeColor = _optionalChain([funnelSettings, 'optionalAccess', _6 => _6.positiveChangeColor]) || DEFAULT_FUNNEL_SETTINGS.positiveChangeColor;
  const negativeChangeColor = _optionalChain([funnelSettings, 'optionalAccess', _7 => _7.negativeChangeColor]) || DEFAULT_FUNNEL_SETTINGS.negativeChangeColor;
  const isPositiveChange = _optionalChain([changeIndicator, 'optionalAccess', _8 => _8.startsWith, 'call', _9 => _9("+")]);
  const changeColor = isPositiveChange ? positiveChangeColor : negativeChangeColor;
  const lightBackgroundColor = _chunkP6GF5KEQcjs.hexToRgba.call(void 0, primaryColor, 0.08);
  const chartStyle = {
    "--primary-color": primaryColor,
    "--light-background-color": lightBackgroundColor,
    "--change-indicator-color": changeColor,
    ...style
  };
  const renderDefaultMainMetric = () => /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _jsxruntime.Fragment, { children: [
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: conversion_funnel_chart_module_default["main-rate"], children: _chunkP6GF5KEQcjs.formatPercentage.call(void 0, mainRate) }),
    changeIndicator && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: conversion_funnel_chart_module_default["change-indicator"], children: changeIndicator })
  ] });
  const renderDefaultTooltip = (step) => /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _jsxruntime.Fragment, { children: [
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: conversion_funnel_chart_module_default["tooltip-title"], children: step.label }),
    /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: conversion_funnel_chart_module_default["tooltip-content"], children: [
      _chunkP6GF5KEQcjs.formatPercentage.call(void 0, step.rate),
      step.count && ` \u2022 ${step.count.toLocaleString()} items`
    ] })
  ] });
  if (!steps || steps.length === 0) {
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
      "div",
      {
        className: _clsx2.default.call(void 0, conversion_funnel_chart_module_default.conversionFunnelChart, loading && conversion_funnel_chart_module_default.loading, className),
        style: chartStyle,
        children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: conversion_funnel_chart_module_default["empty-state"], children: loading ? "Loading..." : "No data available" })
      }
    );
  }
  const maxRate = Math.max(...steps.map((step) => step.rate));
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _jsxruntime.Fragment, { children: [
    /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
      "div",
      {
        ref: (node) => {
          portalContainerRef(node);
          chartRef.current = node;
        },
        className: _clsx2.default.call(void 0, conversion_funnel_chart_module_default.conversionFunnelChart, loading && conversion_funnel_chart_module_default.loading, className),
        style: chartStyle,
        children: [
          renderMainMetric ? renderMainMetric({
            mainRate,
            changeIndicator,
            className: conversion_funnel_chart_module_default["main-metric"],
            changeColor
          }) : /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: conversion_funnel_chart_module_default["main-metric"], children: renderDefaultMainMetric() }),
          /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: conversion_funnel_chart_module_default["funnel-container"], children: steps.map((step, index) => {
            const barHeight = step.rate / maxRate * 100;
            const { isClicked, isBlurred } = getStepState(step.id);
            return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
              "div",
              {
                className: _clsx2.default.call(void 0, conversion_funnel_chart_module_default["funnel-step"], isBlurred && conversion_funnel_chart_module_default.blurred),
                children: [
                  /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: conversion_funnel_chart_module_default["step-header"], children: [
                    renderStepLabel ? renderStepLabel({
                      step,
                      index,
                      className: conversion_funnel_chart_module_default["step-label"]
                    }) : /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: conversion_funnel_chart_module_default["step-label"], children: step.label }),
                    renderStepRate ? renderStepRate({
                      step,
                      index,
                      className: conversion_funnel_chart_module_default["step-rate"]
                    }) : /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: conversion_funnel_chart_module_default["step-rate"], children: _chunkP6GF5KEQcjs.formatPercentage.call(void 0, step.rate) })
                  ] }),
                  /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
                    "div",
                    {
                      className: _clsx2.default.call(void 0, 
                        conversion_funnel_chart_module_default["bar-container"],
                        isClicked && conversion_funnel_chart_module_default.selected,
                        isBlurred && conversion_funnel_chart_module_default.disabled
                      ),
                      onClick: _optionalChain([stepHandlers, 'access', _10 => _10.get, 'call', _11 => _11(step.id), 'optionalAccess', _12 => _12.onClick]),
                      onKeyDown: _optionalChain([stepHandlers, 'access', _13 => _13.get, 'call', _14 => _14(step.id), 'optionalAccess', _15 => _15.onKeyDown]),
                      role: "button",
                      tabIndex: isBlurred ? -1 : 0,
                      "aria-label": step.label,
                      children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
                        "div",
                        {
                          className: _clsx2.default.call(void 0, conversion_funnel_chart_module_default["funnel-bar"], isClicked && conversion_funnel_chart_module_default.selected),
                          style: {
                            height: `${barHeight}%`,
                            backgroundColor: primaryColor
                          }
                        }
                      )
                    }
                  )
                ]
              },
              step.id
            );
          }) })
        ]
      }
    ),
    tooltipOpen && tooltipData && (() => {
      const tooltipContent = renderTooltip ? renderTooltip({
        step: tooltipData,
        index: steps.findIndex((s) => s.id === tooltipData.id),
        top: tooltipTop,
        left: tooltipLeft,
        className: conversion_funnel_chart_module_default["tooltip-wrapper"]
      }) : renderDefaultTooltip(tooltipData);
      if (!tooltipContent) return null;
      return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
        TooltipInPortal,
        {
          top: tooltipTop,
          left: tooltipLeft,
          className: conversion_funnel_chart_module_default["tooltip-wrapper"],
          children: tooltipContent
        },
        Math.random()
      );
    })()
  ] });
};
var conversion_funnel_chart_default = ConversionFunnelChart;



exports.conversion_funnel_chart_default = conversion_funnel_chart_default;
//# sourceMappingURL=chunk-JTGCSLYT.cjs.map