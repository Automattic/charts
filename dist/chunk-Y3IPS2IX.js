import {
  GlobalChartsContext,
  GlobalChartsProvider,
  useChartId,
  useChartRegistration,
  useGlobalChartsContext,
  useGlobalChartsTheme,
  usePrefersReducedMotion
} from "./chunk-H34CJSR6.js";
import {
  formatPercentage,
  hexToRgba
} from "./chunk-TE63Y5PX.js";

// src/charts/conversion-funnel-chart/conversion-funnel-chart.tsx
import { localPoint } from "@visx/event";
import { useTooltip, useTooltipInPortal } from "@visx/tooltip";
import clsx from "clsx";
import { useRef, useMemo, useEffect, useCallback as useCallback2, useContext } from "react";

// src/charts/conversion-funnel-chart/conversion-funnel-chart.module.scss
var conversion_funnel_chart_module_default = {
  "conversionFunnelChart": "a8ccharts-lK-YNK",
  "loading": "a8ccharts-DbHKK5",
  "main-metric": "a8ccharts-61WPYr",
  "main-rate": "a8ccharts-RRRI6x",
  "change-indicator": "a8ccharts-661iwx",
  "funnel-container": "a8ccharts-Z7EGnW",
  "funnel-step": "a8ccharts-VqFY0l",
  "blurred": "a8ccharts-7dTRBs",
  "step-header": "a8ccharts-2JsQiV",
  "step-label": "a8ccharts-6OabC4",
  "step-rate": "a8ccharts-9wSZ6n",
  "bar-container": "a8ccharts-sSmCTi",
  "disabled": "a8ccharts-PLWVAW",
  "funnel-bar": "a8ccharts-EzczI-",
  "selected": "a8ccharts-wNpZEu",
  "funnel-bar--animated": "a8ccharts-68HQJl",
  "stretch": "a8ccharts-CmtieZ",
  "tooltip-wrapper": "a8ccharts-2TeoCn",
  "tooltip-title": "a8ccharts-jkRitH",
  "tooltip-content": "a8ccharts-8jgT-3",
  "empty-state": "a8ccharts-Ml6MMr"
};

// src/charts/conversion-funnel-chart/private/use-funnel-selection.ts
import { useCallback, useState } from "react";
var useFunnelSelection = (hideTooltip) => {
  const [clickedStep, setClickedStep] = useState(null);
  const handleBarClick = useCallback(
    (stepId) => {
      if (clickedStep === stepId) {
        setClickedStep(null);
        hideTooltip?.();
      } else {
        setClickedStep(stepId);
      }
    },
    [clickedStep, hideTooltip]
  );
  const handleBarKeyDown = useCallback(
    (stepId, event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        if (clickedStep === stepId) {
          setClickedStep(null);
          hideTooltip?.();
        } else {
          setClickedStep(stepId);
        }
      } else if (event.key === "Escape") {
        event.preventDefault();
        setClickedStep(null);
        hideTooltip?.();
      }
    },
    [clickedStep, hideTooltip]
  );
  const clearSelection = useCallback(() => {
    setClickedStep(null);
    hideTooltip?.();
  }, [hideTooltip]);
  const getStepState = useCallback(
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

// src/charts/conversion-funnel-chart/conversion-funnel-chart.tsx
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
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
  const chartId = useChartId(providedChartId);
  const { conversionFunnelChart: conversionFunnelChartSettings } = useGlobalChartsTheme();
  const { getElementStyles } = useGlobalChartsContext();
  const chartRef = useRef(null);
  const selectedBarRef = useRef(null);
  const { tooltipData, tooltipLeft, tooltipTop, tooltipOpen, showTooltip, hideTooltip } = useTooltip();
  const { handleBarClick, handleBarKeyDown, clearSelection, getStepState } = useFunnelSelection(hideTooltip);
  const { containerRef: portalContainerRef, TooltipInPortal } = useTooltipInPortal({
    // use TooltipWithBounds for boundary detection
    detectBounds: true,
    // when tooltip containers are scrolled, this will correctly update the Tooltip position
    scroll: true
  });
  const clearSelectionAndRef = useCallback2(() => {
    clearSelection();
    selectedBarRef.current = null;
    hideTooltip();
  }, [clearSelection, hideTooltip]);
  const showTooltipAt = useCallback2(
    (step, x, y) => {
      showTooltip({
        tooltipData: step,
        tooltipLeft: x,
        tooltipTop: y - 10
      });
    },
    [showTooltip]
  );
  const getMouseTooltipCoords = useCallback2((event) => {
    const containerElement = chartRef.current;
    if (containerElement) {
      const coords = localPoint(containerElement, event.nativeEvent);
      if (coords) {
        return { x: coords.x, y: coords.y };
      }
    }
    return null;
  }, []);
  const getKeyboardTooltipCoords = useCallback2((event) => {
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
  const handleStepInteraction = useCallback2(
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
  const stepHandlers = useMemo(() => {
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
  useEffect(() => {
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
  const isPositiveChange = changeIndicator?.startsWith("+");
  const changeColor = isPositiveChange ? positiveChangeColor : negativeChangeColor;
  const barBackgroundColor = backgroundColor || hexToRgba(barColor, 0.08) || "rgba(0, 0, 0, 0.08)";
  const renderDefaultMainMetric = () => /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("span", { className: conversion_funnel_chart_module_default["main-rate"], children: formatPercentage(mainRate) }),
    changeIndicator && /* @__PURE__ */ jsx("span", { className: conversion_funnel_chart_module_default["change-indicator"], style: { color: changeColor }, children: changeIndicator })
  ] });
  const renderDefaultTooltip = (step) => /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: conversion_funnel_chart_module_default["tooltip-title"], children: step.label }),
    /* @__PURE__ */ jsxs("div", { className: conversion_funnel_chart_module_default["tooltip-content"], children: [
      formatPercentage(step.rate),
      ` \u2022 ${step.count ?? "no"} items`
    ] })
  ] });
  const isDataValid = Boolean(steps && steps.length > 0);
  const chartMetadata = useMemo(
    () => ({
      mainRate,
      changeIndicator,
      stepsCount: steps?.length || 0
    }),
    [mainRate, changeIndicator, steps?.length]
  );
  useChartRegistration({
    chartId,
    legendItems: [],
    chartType: "conversion-funnel",
    isDataValid,
    metadata: chartMetadata
  });
  const prefersReducedMotion = usePrefersReducedMotion();
  if (!isDataValid) {
    return /* @__PURE__ */ jsx(
      "div",
      {
        className: clsx(conversion_funnel_chart_module_default.conversionFunnelChart, loading && conversion_funnel_chart_module_default.loading, className),
        style,
        children: /* @__PURE__ */ jsx("div", { className: conversion_funnel_chart_module_default["empty-state"], children: loading ? "Loading..." : "No data available" })
      }
    );
  }
  const maxRate = Math.max(...steps.map((step) => step.rate));
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        ref: (node) => {
          portalContainerRef(node);
          chartRef.current = node;
        },
        className: clsx(conversion_funnel_chart_module_default.conversionFunnelChart, loading && conversion_funnel_chart_module_default.loading, className),
        style,
        children: [
          renderMainMetric ? renderMainMetric({
            mainRate,
            changeIndicator,
            className: conversion_funnel_chart_module_default["main-metric"],
            changeColor
          }) : /* @__PURE__ */ jsx("div", { className: conversion_funnel_chart_module_default["main-metric"], children: renderDefaultMainMetric() }),
          /* @__PURE__ */ jsx("div", { className: conversion_funnel_chart_module_default["funnel-container"], children: steps.map((step, index) => {
            const barHeight = step.rate / maxRate * 100;
            const { isBlurred } = getStepState(step.id);
            return /* @__PURE__ */ jsxs(
              "div",
              {
                className: clsx(conversion_funnel_chart_module_default["funnel-step"], isBlurred && conversion_funnel_chart_module_default.blurred),
                children: [
                  /* @__PURE__ */ jsxs("div", { className: conversion_funnel_chart_module_default["step-header"], children: [
                    renderStepLabel ? renderStepLabel({
                      step,
                      index,
                      className: conversion_funnel_chart_module_default["step-label"]
                    }) : /* @__PURE__ */ jsx("span", { className: conversion_funnel_chart_module_default["step-label"], children: step.label }),
                    renderStepRate ? renderStepRate({
                      step,
                      index,
                      className: conversion_funnel_chart_module_default["step-rate"]
                    }) : /* @__PURE__ */ jsx("span", { className: conversion_funnel_chart_module_default["step-rate"], children: formatPercentage(step.rate) })
                  ] }),
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: clsx(conversion_funnel_chart_module_default["bar-container"], isBlurred && conversion_funnel_chart_module_default.disabled),
                      onClick: stepHandlers.get(step.id)?.onClick,
                      onKeyDown: stepHandlers.get(step.id)?.onKeyDown,
                      role: "button",
                      tabIndex: isBlurred ? -1 : 0,
                      "aria-label": step.label,
                      style: { backgroundColor: barBackgroundColor },
                      children: /* @__PURE__ */ jsx(
                        "div",
                        {
                          className: clsx(conversion_funnel_chart_module_default["funnel-bar"], {
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
      return /* @__PURE__ */ jsx(
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
  const existingContext = useContext(GlobalChartsContext);
  if (existingContext) {
    return /* @__PURE__ */ jsx(ConversionFunnelChartInternal, { ...props });
  }
  return /* @__PURE__ */ jsx(GlobalChartsProvider, { children: /* @__PURE__ */ jsx(ConversionFunnelChartInternal, { ...props }) });
};
ConversionFunnelChartWithProvider.displayName = "ConversionFunnelChart";

export {
  ConversionFunnelChartWithProvider
};
//# sourceMappingURL=chunk-Y3IPS2IX.js.map