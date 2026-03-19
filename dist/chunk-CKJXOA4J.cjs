"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } }

var _chunk7OZEQ5HEcjs = require('./chunk-7OZEQ5HE.cjs');


var _chunk2A34OA5Ocjs = require('./chunk-2A34OA5O.cjs');


var _chunk5NWDCSDIcjs = require('./chunk-5NWDCSDI.cjs');





var _chunkNL53FCS3cjs = require('./chunk-NL53FCS3.cjs');


var _chunkREZTQ4PHcjs = require('./chunk-REZTQ4PH.cjs');


var _chunkASLARV7Lcjs = require('./chunk-ASLARV7L.cjs');




var _chunkXVBH5XHEcjs = require('./chunk-XVBH5XHE.cjs');









var _chunkWYK7EL5Rcjs = require('./chunk-WYK7EL5R.cjs');


var _chunkMXGLYWVPcjs = require('./chunk-MXGLYWVP.cjs');


var _chunkY3NNQMAXcjs = require('./chunk-Y3NNQMAX.cjs');

// src/charts/pie-chart/pie-chart.tsx
var _group = require('@visx/group');
var _shape = require('@visx/shape');
var _tooltip = require('@visx/tooltip');
var _i18n = require('@wordpress/i18n');
var _clsx = require('clsx'); var _clsx2 = _interopRequireDefault(_clsx);
var _react = require('react');

// src/charts/pie-chart/pie-chart.module.scss
var pie_chart_module_default = {
  "pie-chart": "a8ccharts-C-n-Gu",
  "pie-chart--responsive": "a8ccharts-IQVR6j",
  "pie-chart__centering": "a8ccharts-eGV3AE"
};

// src/charts/pie-chart/pie-chart.tsx
var _jsxruntime = require('react/jsx-runtime');
var renderDefaultPieTooltip = ({
  tooltipData
}) => {
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _chunkY3NNQMAXcjs.BaseTooltip, {
    data: tooltipData,
    top: 0,
    left: 0,
    renderContainer: false
  });
};
var validateData = (data) => {
  if (!data.length) {
    return {
      isValid: false,
      message: "No data available"
    };
  }
  const hasNegativeValues = data.some((item) => item.percentage < 0 || item.value < 0);
  if (hasNegativeValues) {
    return {
      isValid: false,
      message: "Invalid data: Negative values are not allowed"
    };
  }
  const totalPercentage = data.reduce((sum, item) => sum + item.percentage, 0);
  if (Math.abs(totalPercentage - 100) > 0.01) {
    return {
      isValid: false,
      message: "Invalid percentage total: Must equal 100"
    };
  }
  return {
    isValid: true,
    message: ""
  };
};
var PieChartInternal = ({
  data,
  chartId: providedChartId,
  withTooltips = false,
  className,
  showLegend = false,
  legend = {},
  width: propWidth,
  height: propHeight,
  size,
  animation,
  thickness = 1,
  padding = 0,
  gapScale = 0,
  cornerScale = 0,
  showLabels = true,
  legendValueDisplay = "percentage",
  children = null,
  tooltipOffsetX = 0,
  tooltipOffsetY = -15,
  renderTooltip = renderDefaultPieTooltip,
  gap = "md"
}) => {
  const legendInteractive = _nullishCoalesce(legend.interactive, () => ( false));
  const legendPosition = _nullishCoalesce(legend.position, () => ( "bottom"));
  const providerTheme = _chunkWYK7EL5Rcjs.useGlobalChartsTheme.call(void 0, );
  const chartId = _chunkWYK7EL5Rcjs.useChartId.call(void 0, providedChartId);
  const {
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    hideTooltip,
    showTooltip
  } = _tooltip.useTooltip.call(void 0, );
  const {
    containerRef,
    TooltipInPortal,
    containerBounds
  } = _tooltip.useTooltipInPortal.call(void 0, {
    detectBounds: true,
    scroll: true,
    debounce: 0
  });
  const onMouseLeave = _react.useCallback.call(void 0, () => {
    if (!withTooltips) {
      return;
    }
    hideTooltip();
  }, [withTooltips, hideTooltip]);
  const {
    getElementStyles,
    isSeriesVisible
  } = _chunkWYK7EL5Rcjs.useGlobalChartsContext.call(void 0, );
  const {
    visibleData,
    allSegmentsHidden,
    legendData
  } = _chunkWYK7EL5Rcjs.useInteractiveLegendData.call(void 0, {
    data,
    chartId,
    legendInteractive,
    isSeriesVisible
  });
  const legendOptions = _react.useMemo.call(void 0, () => ({
    showValues: true,
    legendValueDisplay
  }), [legendValueDisplay]);
  const legendItems = _chunkXVBH5XHEcjs.useChartLegendItems.call(void 0, legendData, legendOptions);
  const {
    isValid,
    message
  } = validateData(data);
  const {
    svgChildren,
    htmlChildren,
    legendChildren,
    otherChildren
  } = _chunkNL53FCS3cjs.useChartChildren.call(void 0, children, "PieChart");
  const chartMetadata = _react.useMemo.call(void 0, () => ({
    thickness,
    gapScale,
    cornerScale
  }), [thickness, gapScale, cornerScale]);
  _chunkWYK7EL5Rcjs.useChartRegistration.call(void 0, {
    chartId,
    legendItems,
    chartType: "pie",
    isDataValid: isValid,
    metadata: chartMetadata
  });
  const prefersReducedMotion = _chunkWYK7EL5Rcjs.usePrefersReducedMotion.call(void 0, );
  if (!isValid) {
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", {
      className: _clsx2.default.call(void 0, "pie-chart", pie_chart_module_default["pie-chart"], className),
      children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", {
        className: pie_chart_module_default["error-message"],
        children: message
      })
    });
  }
  const padAngle = gapScale * (2 * Math.PI / data.length);
  const dataWithIndex = visibleData.map((d) => {
    const originalIndex = data.findIndex((item) => item.label === d.label);
    return {
      ...d,
      index: originalIndex >= 0 ? originalIndex : 0
    };
  });
  const accessors = {
    value: (d) => d.value,
    fill: (d) => {
      return getElementStyles({
        data: d,
        index: d.index
      }).color;
    }
  };
  const legendElement = showLegend && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _chunkXVBH5XHEcjs.Legend, {
    orientation: _nullishCoalesce(legend.orientation, () => ( "horizontal")),
    position: legendPosition,
    alignment: _nullishCoalesce(legend.alignment, () => ( "center")),
    labelStyles: legend.labelStyles,
    itemClassName: legend.itemClassName,
    itemStyles: legend.itemStyles,
    shapeStyles: legend.shapeStyles,
    shape: _nullishCoalesce(legend.shape, () => ( "circle")),
    chartId,
    interactive: legendInteractive
  });
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _chunkXVBH5XHEcjs.SingleChartContext.Provider, {
    value: {
      chartId
    },
    children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _chunkNL53FCS3cjs.ChartLayout, {
      legendPosition,
      legendElement,
      legendChildren,
      gap,
      className: _clsx2.default.call(void 0, 
        "pie-chart",
        pie_chart_module_default["pie-chart"],
        // Fill parent when no explicit dimensions provided
        {
          [pie_chart_module_default["pie-chart--responsive"]]: !propWidth && !propHeight
        },
        className
      ),
      style: {
        width: propWidth || void 0,
        height: propHeight || void 0
      },
      trailingContent: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _jsxruntime.Fragment, {
        children: [withTooltips && tooltipOpen && tooltipData && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, TooltipInPortal, {
          top: tooltipTop || 0,
          left: tooltipLeft || 0,
          children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", {
            role: "tooltip",
            children: renderTooltip({
              tooltipData
            })
          })
        }), htmlChildren, otherChildren]
      }),
      children: ({
        contentWidth,
        contentHeight
      }) => {
        const availableWidth = contentWidth > 0 ? contentWidth : 300;
        const availableHeight = contentHeight > 0 ? contentHeight : 300;
        const availableSize = Math.min(availableWidth, availableHeight);
        const actualSize = size ? Math.min(size, availableSize) : availableSize;
        const width = actualSize;
        const height = actualSize;
        const radius = Math.min(width, height) / 2;
        const centerX = width / 2;
        const centerY = height / 2;
        const outerRadius = radius - padding;
        const innerRadius = thickness === 0 ? 0 : outerRadius * (1 - thickness);
        const maxCornerRadius = (outerRadius - innerRadius) / 2;
        const cornerRadius = cornerScale ? Math.min(cornerScale * outerRadius, maxCornerRadius) : 0;
        return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _chunkREZTQ4PHcjs.Stack, {
          ref: containerRef,
          align: "center",
          justify: "center",
          className: pie_chart_module_default["pie-chart__centering"],
          children: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "svg", {
            viewBox: `0 0 ${width} ${height}`,
            preserveAspectRatio: "xMidYMid meet",
            width,
            height,
            children: [/* @__PURE__ */ _jsxruntime.jsx.call(void 0, "defs", {
              children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _chunk2A34OA5Ocjs.radial_wipe_animation_default, {
                id: `radial-wipe-${chartId}`,
                radius: outerRadius,
                innerRadius
              })
            }), /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _group.Group, {
              top: centerY,
              left: centerX,
              mask: animation && !prefersReducedMotion ? `url(#radial-wipe-${chartId})` : null,
              children: [allSegmentsHidden ? /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _chunk5NWDCSDIcjs.SvgEmptyState, {
                x: 0,
                y: 0,
                width,
                height,
                children: _i18n.__.call(void 0, "All segments are hidden. Click legend items to show data.", "jetpack-charts")
              }) : /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _shape.Pie, {
                data: dataWithIndex,
                pieValue: accessors.value,
                outerRadius,
                innerRadius,
                padAngle,
                cornerRadius,
                children: (pie) => {
                  return pie.arcs.map((arc, index) => {
                    const [centroidX, centroidY] = pie.path.centroid(arc);
                    const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.25;
                    const handleMouseMove = (event) => {
                      if (!withTooltips) {
                        return;
                      }
                      if (containerBounds.width === 0 || containerBounds.height === 0) {
                        return;
                      }
                      showTooltip({
                        tooltipData: arc.data,
                        tooltipLeft: event.clientX - containerBounds.left + tooltipOffsetX,
                        tooltipTop: event.clientY - containerBounds.top + tooltipOffsetY
                      });
                    };
                    const pathProps = {
                      d: pie.path(arc) || "",
                      fill: accessors.fill(arc.data),
                      "data-testid": "pie-segment"
                    };
                    const groupProps = {};
                    if (withTooltips) {
                      groupProps.onMouseMove = handleMouseMove;
                      groupProps.onMouseLeave = onMouseLeave;
                    }
                    const fontSize = 12;
                    const estimatedTextWidth = _chunk7OZEQ5HEcjs.getStringWidth.call(void 0, arc.data.label, {
                      fontSize
                    });
                    const labelPadding = 6;
                    const backgroundWidth = estimatedTextWidth + labelPadding * 2;
                    const backgroundHeight = fontSize + labelPadding * 2;
                    return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "g", {
                      ...groupProps,
                      children: [/* @__PURE__ */ _jsxruntime.jsx.call(void 0, "path", {
                        ...pathProps
                      }), showLabels && hasSpaceForLabel && /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "g", {
                        children: [providerTheme.labelBackgroundColor && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "rect", {
                          x: centroidX - backgroundWidth / 2,
                          y: centroidY - backgroundHeight / 2,
                          width: backgroundWidth,
                          height: backgroundHeight,
                          fill: providerTheme.labelBackgroundColor,
                          rx: 4,
                          ry: 4,
                          pointerEvents: "none"
                        }), /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "text", {
                          x: centroidX,
                          y: centroidY,
                          dy: ".33em",
                          fill: providerTheme.labelTextColor || "#333",
                          fontSize,
                          textAnchor: "middle",
                          pointerEvents: "none",
                          children: arc.data.label
                        })]
                      })]
                    }, `arc-${index}`);
                  });
                }
              }), !allSegmentsHidden && svgChildren]
            })]
          })
        });
      }
    })
  });
};
var PieChartWithProvider = (props) => {
  const existingContext = _react.useContext.call(void 0, _chunkWYK7EL5Rcjs.GlobalChartsContext);
  if (existingContext) {
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, PieChartInternal, {
      ...props
    });
  }
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _chunkWYK7EL5Rcjs.GlobalChartsProvider, {
    children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, PieChartInternal, {
      ...props
    })
  });
};
PieChartWithProvider.displayName = "PieChart";
var PieChart = _chunkMXGLYWVPcjs.attachSubComponents.call(void 0, PieChartWithProvider, {
  Legend: _chunkXVBH5XHEcjs.Legend,
  SVG: _chunkNL53FCS3cjs.ChartSVG,
  HTML: _chunkNL53FCS3cjs.ChartHTML
});
var PieChartResponsive = _chunkMXGLYWVPcjs.attachSubComponents.call(void 0, _chunkASLARV7Lcjs.withResponsive.call(void 0, PieChartWithProvider), {
  Legend: _chunkXVBH5XHEcjs.Legend,
  SVG: _chunkNL53FCS3cjs.ChartSVG,
  HTML: _chunkNL53FCS3cjs.ChartHTML
});




exports.PieChart = PieChart; exports.PieChartResponsive = PieChartResponsive;
//# sourceMappingURL=chunk-CKJXOA4J.cjs.map