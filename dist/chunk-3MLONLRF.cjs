"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } }

var _chunk2A34OA5Ocjs = require('./chunk-2A34OA5O.cjs');


var _chunk5NWDCSDIcjs = require('./chunk-5NWDCSDI.cjs');





var _chunkFDBGXBW2cjs = require('./chunk-FDBGXBW2.cjs');




var _chunkXVBH5XHEcjs = require('./chunk-XVBH5XHE.cjs');


var _chunkY3NNQMAXcjs = require('./chunk-Y3NNQMAX.cjs');


var _chunkREZTQ4PHcjs = require('./chunk-REZTQ4PH.cjs');


var _chunkASLARV7Lcjs = require('./chunk-ASLARV7L.cjs');








var _chunkWYK7EL5Rcjs = require('./chunk-WYK7EL5R.cjs');


var _chunkMXGLYWVPcjs = require('./chunk-MXGLYWVP.cjs');

// src/charts/pie-semi-circle-chart/pie-semi-circle-chart.tsx
var _group = require('@visx/group');
var _shape = require('@visx/shape');
var _text = require('@visx/text');
var _tooltip = require('@visx/tooltip');
var _i18n = require('@wordpress/i18n');
var _clsx = require('clsx'); var _clsx2 = _interopRequireDefault(_clsx);
var _react = require('react');

// src/charts/pie-semi-circle-chart/pie-semi-circle-chart.module.scss
var pie_semi_circle_chart_module_default = {
  "pie-semi-circle-chart--responsive": "a8ccharts-V0wiEb",
  "pie-semi-circle-chart__centering": "a8ccharts-1khYG1",
  "pie-semi-circle-chart": "a8ccharts-8tyaQj",
  "label": "a8ccharts-EKZS3j",
  "note": "a8ccharts-v85A8-"
};

// src/charts/pie-semi-circle-chart/pie-semi-circle-chart.tsx
var _jsxruntime = require('react/jsx-runtime');
var renderDefaultPieSemiCircleTooltip = ({
  tooltipData
}) => {
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _chunkY3NNQMAXcjs.BaseTooltip, {
    data: tooltipData,
    top: 0,
    left: 0,
    renderContainer: false
  });
};
var PAD_ANGLE = 0.03;
var DEFAULT_WIDTH = 400;
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
  if (totalPercentage <= 0) {
    return {
      isValid: false,
      message: "Invalid percentage total: Must be greater than 0"
    };
  }
  return {
    isValid: true,
    message: ""
  };
};
var PieSemiCircleChartInternal = ({
  data,
  chartId: providedChartId,
  width: propWidth,
  height: propHeight,
  thickness = 0.4,
  clockwise = true,
  withTooltips = false,
  showLegend = false,
  legend = {},
  legendValueDisplay = "percentage",
  label,
  animation,
  note,
  className,
  children,
  tooltipOffsetX = 0,
  tooltipOffsetY = -15,
  renderTooltip = renderDefaultPieSemiCircleTooltip,
  gap = "md"
}) => {
  const legendInteractive = _nullishCoalesce(legend.interactive, () => ( false));
  const legendPosition = _nullishCoalesce(legend.position, () => ( "bottom"));
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
  const handleMouseMove = _react.useCallback.call(void 0, (event, arc) => {
    if (containerBounds.width === 0 || containerBounds.height === 0) {
      return;
    }
    showTooltip({
      tooltipData: arc.data,
      tooltipLeft: event.clientX - containerBounds.left + tooltipOffsetX,
      tooltipTop: event.clientY - containerBounds.top + tooltipOffsetY
    });
  }, [containerBounds.width, containerBounds.height, containerBounds.left, containerBounds.top, showTooltip, tooltipOffsetX, tooltipOffsetY]);
  const handleMouseLeave = _react.useCallback.call(void 0, () => {
    hideTooltip();
  }, [hideTooltip]);
  const handleArcMouseMove = _react.useCallback.call(void 0, (arc) => (event) => {
    handleMouseMove(event, arc);
  }, [handleMouseMove]);
  const {
    isValid,
    message
  } = validateData(data);
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
  const accessors = _react.useMemo.call(void 0, () => ({
    value: (d) => d.value,
    sort: (a, b) => b.value - a.value,
    fill: (d) => getElementStyles({
      data: d,
      index: d.index
    }).color
  }), [getElementStyles]);
  const legendOptions = _react.useMemo.call(void 0, () => ({
    showValues: true,
    legendValueDisplay
  }), [legendValueDisplay]);
  const legendItems = _chunkXVBH5XHEcjs.useChartLegendItems.call(void 0, legendData, legendOptions);
  const {
    svgChildren,
    htmlChildren,
    legendChildren,
    otherChildren
  } = _chunkFDBGXBW2cjs.useChartChildren.call(void 0, children, "PieSemiCircleChart");
  const chartMetadata = _react.useMemo.call(void 0, () => ({
    thickness,
    clockwise
  }), [thickness, clockwise]);
  _chunkWYK7EL5Rcjs.useChartRegistration.call(void 0, {
    chartId,
    legendItems,
    chartType: "pie-semi-circle",
    isDataValid: isValid,
    metadata: chartMetadata
  });
  const prefersReducedMotion = _chunkWYK7EL5Rcjs.usePrefersReducedMotion.call(void 0, );
  const effectiveWidth = propWidth || DEFAULT_WIDTH;
  if (!isValid) {
    const errorWidth = propHeight ? Math.min(propWidth || propHeight * 2, propHeight * 2) : effectiveWidth;
    const errorHeight = errorWidth / 2;
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", {
      className: pie_semi_circle_chart_module_default["pie-semi-circle-chart"],
      children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "svg", {
        width: errorWidth,
        height: errorHeight,
        children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "text", {
          x: "50%",
          y: "50%",
          textAnchor: "middle",
          className: pie_semi_circle_chart_module_default.error,
          children: message
        })
      })
    });
  }
  const dataWithIndex = visibleData.map((d) => {
    const originalIndex = data.findIndex((item) => item.label === d.label);
    return {
      ...d,
      index: originalIndex >= 0 ? originalIndex : 0
    };
  });
  const startAngle = clockwise ? -Math.PI / 2 : Math.PI / 2;
  const endAngle = clockwise ? Math.PI / 2 : -Math.PI / 2;
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
    children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _chunkFDBGXBW2cjs.ChartLayout, {
      ref: containerRef,
      legendPosition,
      legendElement,
      legendChildren,
      gap,
      className: _clsx2.default.call(void 0, "pie-semi-circle-chart", pie_semi_circle_chart_module_default["pie-semi-circle-chart"], {
        [pie_semi_circle_chart_module_default["pie-semi-circle-chart--responsive"]]: !propWidth && !propHeight
      }, className),
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
        const availableWidth = contentWidth > 0 ? contentWidth : effectiveWidth;
        const availableHeight = contentHeight > 0 ? contentHeight : propHeight || effectiveWidth / 2;
        const width = Math.min(availableWidth, availableHeight * 2);
        const height = width / 2;
        const radius = height;
        const innerRadius = radius * (1 - thickness);
        return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _chunkREZTQ4PHcjs.Stack, {
          align: "center",
          justify: "center",
          className: pie_semi_circle_chart_module_default["pie-semi-circle-chart__centering"],
          children: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "svg", {
            width,
            height,
            viewBox: `0 0 ${width} ${height}`,
            children: [/* @__PURE__ */ _jsxruntime.jsx.call(void 0, "defs", {
              children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _chunk2A34OA5Ocjs.radial_wipe_animation_default, {
                id: `radial-wipe-${chartId}`,
                radius,
                innerRadius,
                startAngle: "-180deg",
                wipePercentage: 50
              })
            }), /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _group.Group, {
              top: height,
              left: width / 2,
              mask: animation && !prefersReducedMotion ? `url(#radial-wipe-${chartId})` : null,
              children: allSegmentsHidden ? /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _chunk5NWDCSDIcjs.SvgEmptyState, {
                x: 0,
                y: -radius / 2,
                width,
                height,
                children: _i18n.__.call(void 0, "All segments are hidden. Click legend items to show data.", "jetpack-charts")
              }) : /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _jsxruntime.Fragment, {
                children: [/* @__PURE__ */ _jsxruntime.jsx.call(void 0, _shape.Pie, {
                  data: dataWithIndex,
                  pieValue: accessors.value,
                  outerRadius: radius,
                  innerRadius,
                  cornerRadius: 3,
                  padAngle: PAD_ANGLE,
                  startAngle,
                  endAngle,
                  pieSort: accessors.sort,
                  children: (pie) => {
                    return pie.arcs.map((arc) => /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "g", {
                      onMouseMove: withTooltips ? handleArcMouseMove(arc) : void 0,
                      onMouseLeave: withTooltips ? handleMouseLeave : void 0,
                      children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "path", {
                        d: pie.path(arc) || "",
                        fill: accessors.fill(arc.data)
                      })
                    }, arc.data.label));
                  }
                }), /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _group.Group, {
                  children: [/* @__PURE__ */ _jsxruntime.jsx.call(void 0, _text.Text, {
                    textAnchor: "middle",
                    verticalAnchor: "start",
                    y: -40,
                    className: pie_semi_circle_chart_module_default.label,
                    children: label
                  }), /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _text.Text, {
                    textAnchor: "middle",
                    verticalAnchor: "start",
                    y: -20,
                    className: pie_semi_circle_chart_module_default.note,
                    children: note
                  })]
                }), !allSegmentsHidden && svgChildren]
              })
            })]
          })
        });
      }
    })
  });
};
var PieSemiCircleChartWithProvider = (props) => {
  const existingContext = _react.useContext.call(void 0, _chunkWYK7EL5Rcjs.GlobalChartsContext);
  if (existingContext) {
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, PieSemiCircleChartInternal, {
      ...props
    });
  }
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _chunkWYK7EL5Rcjs.GlobalChartsProvider, {
    children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, PieSemiCircleChartInternal, {
      ...props
    })
  });
};
PieSemiCircleChartWithProvider.displayName = "PieSemiCircleChart";
var PieSemiCircleChart = _chunkMXGLYWVPcjs.attachSubComponents.call(void 0, PieSemiCircleChartWithProvider, {
  Legend: _chunkXVBH5XHEcjs.Legend,
  SVG: _chunkFDBGXBW2cjs.ChartSVG,
  HTML: _chunkFDBGXBW2cjs.ChartHTML
});
var PieSemiCircleChartResponsive = _chunkMXGLYWVPcjs.attachSubComponents.call(void 0, _chunkASLARV7Lcjs.withResponsive.call(void 0, PieSemiCircleChartWithProvider), {
  Legend: _chunkXVBH5XHEcjs.Legend,
  SVG: _chunkFDBGXBW2cjs.ChartSVG,
  HTML: _chunkFDBGXBW2cjs.ChartHTML
});




exports.PieSemiCircleChart = PieSemiCircleChart; exports.PieSemiCircleChartResponsive = PieSemiCircleChartResponsive;
//# sourceMappingURL=chunk-3MLONLRF.cjs.map