"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }









var _chunkAUKI2LYNcjs = require('./chunk-AUKI2LYN.cjs');

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
  "disabled": "a8ccharts-Reovk6",
  "funnel-bar": "a8ccharts-tG5m3L",
  "selected": "a8ccharts-W40FYh",
  "funnel-bar--animated": "a8ccharts-YVRBpF",
  "stretch": "a8ccharts-4otxiv",
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
var ConversionFunnelChartInternal = ({
  mainRate,
  changeIndicator,
  steps,
  loading = false,
  animation,
  className,
  chartId: providedChartId,
  style,
  renderStepLabel,
  renderStepRate,
  renderMainMetric,
  renderTooltip
}) => {
  const chartId = _chunkAUKI2LYNcjs.useChartId.call(void 0, providedChartId);
  const { conversionFunnelChart: conversionFunnelChartSettings } = _chunkAUKI2LYNcjs.useGlobalChartsTheme.call(void 0, );
  const { getElementStyles } = _chunkAUKI2LYNcjs.useGlobalChartsContext.call(void 0, );
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
  const { primaryColor, backgroundColor, positiveChangeColor, negativeChangeColor } = conversionFunnelChartSettings;
  const { color: barColor } = getElementStyles ? getElementStyles({
    index: 0,
    overrideColor: primaryColor
  }) : { color: primaryColor || "#000000" };
  const isPositiveChange = _optionalChain([changeIndicator, 'optionalAccess', _5 => _5.startsWith, 'call', _6 => _6("+")]);
  const changeColor = isPositiveChange ? positiveChangeColor : negativeChangeColor;
  const barBackgroundColor = backgroundColor || _chunkAUKI2LYNcjs.hexToRgba.call(void 0, barColor, 0.08);
  const renderDefaultMainMetric = () => /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _jsxruntime.Fragment, { children: [
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: conversion_funnel_chart_module_default["main-rate"], children: _chunkAUKI2LYNcjs.formatPercentage.call(void 0, mainRate) }),
    changeIndicator && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: conversion_funnel_chart_module_default["change-indicator"], style: { color: changeColor }, children: changeIndicator })
  ] });
  const renderDefaultTooltip = (step) => /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _jsxruntime.Fragment, { children: [
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: conversion_funnel_chart_module_default["tooltip-title"], children: step.label }),
    /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: conversion_funnel_chart_module_default["tooltip-content"], children: [
      _chunkAUKI2LYNcjs.formatPercentage.call(void 0, step.rate),
      step.count && ` \u2022 ${step.count.toLocaleString()} items`
    ] })
  ] });
  const isDataValid = Boolean(steps && steps.length > 0);
  const chartMetadata = _react.useMemo.call(void 0, 
    () => ({
      mainRate,
      changeIndicator,
      stepsCount: _optionalChain([steps, 'optionalAccess', _7 => _7.length]) || 0
    }),
    [mainRate, changeIndicator, _optionalChain([steps, 'optionalAccess', _8 => _8.length])]
  );
  _chunkAUKI2LYNcjs.useChartRegistration.call(void 0, {
    chartId,
    legendItems: [],
    chartType: "conversion-funnel",
    isDataValid,
    metadata: chartMetadata
  });
  const prefersReducedMotion = _chunkAUKI2LYNcjs.usePrefersReducedMotion.call(void 0, );
  if (!isDataValid) {
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
      "div",
      {
        className: _clsx2.default.call(void 0, conversion_funnel_chart_module_default.conversionFunnelChart, loading && conversion_funnel_chart_module_default.loading, className),
        style,
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
        style,
        children: [
          renderMainMetric ? renderMainMetric({
            mainRate,
            changeIndicator,
            className: conversion_funnel_chart_module_default["main-metric"],
            changeColor
          }) : /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: conversion_funnel_chart_module_default["main-metric"], children: renderDefaultMainMetric() }),
          /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: conversion_funnel_chart_module_default["funnel-container"], children: steps.map((step, index) => {
            const barHeight = step.rate / maxRate * 100;
            const { isBlurred } = getStepState(step.id);
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
                    }) : /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: conversion_funnel_chart_module_default["step-rate"], children: _chunkAUKI2LYNcjs.formatPercentage.call(void 0, step.rate) })
                  ] }),
                  /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
                    "div",
                    {
                      className: _clsx2.default.call(void 0, conversion_funnel_chart_module_default["bar-container"], isBlurred && conversion_funnel_chart_module_default.disabled),
                      onClick: _optionalChain([stepHandlers, 'access', _9 => _9.get, 'call', _10 => _10(step.id), 'optionalAccess', _11 => _11.onClick]),
                      onKeyDown: _optionalChain([stepHandlers, 'access', _12 => _12.get, 'call', _13 => _13(step.id), 'optionalAccess', _14 => _14.onKeyDown]),
                      role: "button",
                      tabIndex: isBlurred ? -1 : 0,
                      "aria-label": step.label,
                      style: { backgroundColor: barBackgroundColor },
                      children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
                        "div",
                        {
                          className: _clsx2.default.call(void 0, conversion_funnel_chart_module_default["funnel-bar"], {
                            [conversion_funnel_chart_module_default["funnel-bar--animated"]]: animation && !loading && !prefersReducedMotion
                          }),
                          style: {
                            height: `${barHeight}%`,
                            backgroundColor: barColor
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
var ConversionFunnelChartWithProvider = (props) => {
  const existingContext = _react.useContext.call(void 0, _chunkAUKI2LYNcjs.GlobalChartsContext);
  if (existingContext) {
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, ConversionFunnelChartInternal, { ...props });
  }
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _chunkAUKI2LYNcjs.GlobalChartsProvider, { children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, ConversionFunnelChartInternal, { ...props }) });
};
ConversionFunnelChartWithProvider.displayName = "ConversionFunnelChart";



exports.ConversionFunnelChartWithProvider = ConversionFunnelChartWithProvider;
//# sourceMappingURL=chunk-2XWJ2BDW.cjs.map