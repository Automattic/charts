"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

var _chunk3E5WRW5Icjs = require('./chunk-3E5WRW5I.cjs');


var _chunkHOTYXYXVcjs = require('./chunk-HOTYXYXV.cjs');



var _chunkTVV7ZI7Ccjs = require('./chunk-TVV7ZI7C.cjs');

// src/charts/bar-list-chart/bar-list-chart.tsx
var _numberformatters = require('@automattic/number-formatters');
var _group = require('@visx/group');
var _scale = require('@visx/scale');
var _text = require('@visx/text');
var _react = require('react');
var _jsxruntime = require('react/jsx-runtime');
var getScaleBandwidth = (scale) => {
  const s = scale;
  return s && "bandwidth" in s ? _nullishCoalesce(_optionalChain([s, 'optionalAccess', _ => _.bandwidth, 'call', _2 => _2()]), () => ( 0)) : 0;
};
var DefaultLabelComponent = ({ textProps, x, y, label, formatter }) => {
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _text.Text, { ...textProps, textAnchor: "start", x, y, children: formatter(label) });
};
var DefaultValueComponent = ({ textProps, x, y, value, formatter }) => {
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _text.Text, { ...textProps, textAnchor: "end", x, y, fontWeight: 500, children: formatter(value) });
};
var AxisRenderer = ({
  ticks,
  tickLabelProps,
  yOffset,
  labelPosition,
  valuePosition,
  data,
  labelFormatter,
  valueFormatter,
  LabelComponent = DefaultLabelComponent,
  ValueComponent = DefaultValueComponent
}) => {
  if (ticks.length === 0) {
    return null;
  }
  const allTickLabelProps = ticks.map(
    ({ value, index }) => typeof tickLabelProps === "function" ? tickLabelProps(value, index, ticks) : {}
  );
  return ticks.map(({ from, formattedValue }, index) => {
    const textProps = _nullishCoalesce(allTickLabelProps[index], () => ( {}));
    delete textProps.textAnchor;
    delete textProps.dx;
    const sum = data.reduce(
      (acc, { data: seriesData }) => acc + (_nullishCoalesce(_optionalChain([seriesData, 'access', _3 => _3[index], 'optionalAccess', _4 => _4.value]), () => ( 0))),
      0
    );
    const y = from.y + yOffset;
    return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _group.Group, { children: [
      /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
        LabelComponent,
        {
          textProps,
          x: labelPosition,
          y,
          label: formattedValue,
          formatter: labelFormatter
        }
      ),
      /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
        ValueComponent,
        {
          textProps,
          x: valuePosition,
          y,
          value: sum,
          formatter: valueFormatter,
          data,
          index
        }
      )
    ] }, index);
  });
};
var getDefaultYOffset = (data, yScaleConfig, height, isMultiSeries) => {
  if (!isMultiSeries) {
    return 0;
  }
  const dataKeys = data.map(({ label }) => label);
  const yScale = _scale.createScale.call(void 0, {
    type: "band",
    range: [0, height],
    domain: dataKeys,
    ...yScaleConfig
  });
  const groupScale = _scale.scaleBand.call(void 0, {
    domain: dataKeys,
    range: [0, getScaleBandwidth(yScale)],
    padding: yScaleConfig.paddingInner
  });
  const GAP_BETWEEN_BARS = 6;
  const barThickness = getScaleBandwidth(groupScale);
  return -(barThickness + GAP_BETWEEN_BARS);
};
var BarListChartInternal = ({
  data,
  width,
  height,
  options = {},
  margin = {
    left: 0,
    right: 20,
    bottom: 0,
    top: 0
  },
  ...rest
}) => {
  const chartOptions = _react.useMemo.call(void 0, () => {
    const isMultiSeries = data.length > 1;
    const defaultYScale = {
      // For multi series, set default padding larger to look better.
      paddingInner: isMultiSeries ? 0.3 : 0.1,
      padding: isMultiSeries ? 0.3 : 0.1
    };
    const defaultXScale = {
      // Always begin at zero since the x axis is hidden.
      zero: true
    };
    const yScale = {
      ...defaultYScale,
      ..._nullishCoalesce(options.yScale, () => ( {}))
    };
    const xScale = {
      ...defaultXScale,
      ..._nullishCoalesce(options.xScale, () => ( {}))
    };
    return {
      yScale,
      xScale,
      labelPosition: _nullishCoalesce(options.labelPosition, () => ( (isMultiSeries ? 0 : 10))),
      valueFormatter: _nullishCoalesce(options.valueFormatter, () => ( ((value) => _numberformatters.formatNumberCompact.call(void 0, value)))),
      labelFormatter: _nullishCoalesce(options.labelFormatter, () => ( ((value) => String(value)))),
      valuePosition: _nullishCoalesce(options.valuePosition, () => ( width)),
      yOffset: _nullishCoalesce(options.yOffset, () => ( getDefaultYOffset(data, yScale, height, isMultiSeries)))
    };
  }, [options, width, data, height]);
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
    _chunk3E5WRW5Icjs.BarChart,
    {
      orientation: "horizontal",
      gridVisibility: "none",
      data,
      width,
      height,
      margin,
      options: {
        axis: {
          y: {
            children: (renderProps) => /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
              AxisRenderer,
              {
                ...renderProps,
                data,
                yOffset: chartOptions.yOffset,
                labelPosition: chartOptions.labelPosition,
                valuePosition: chartOptions.valuePosition,
                labelFormatter: chartOptions.labelFormatter,
                valueFormatter: chartOptions.valueFormatter,
                LabelComponent: options.labelComponent,
                ValueComponent: options.valueComponent
              }
            )
          },
          x: {
            children: () => null
          }
        },
        xScale: chartOptions.xScale,
        yScale: chartOptions.yScale
      },
      ...rest
    }
  );
};
var BarListChart = (props) => {
  const existingContext = _react.useContext.call(void 0, _chunkTVV7ZI7Ccjs.GlobalChartsContext);
  if (existingContext) {
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, BarListChartInternal, { ...props });
  }
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _chunkTVV7ZI7Ccjs.GlobalChartsProvider, { children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, BarListChartInternal, { ...props }) });
};
BarListChart.displayName = "BarListChart";
var BarListChartResponsive = _chunkHOTYXYXVcjs.withResponsive.call(void 0, BarListChart);




exports.BarListChart = BarListChart; exports.BarListChartResponsive = BarListChartResponsive;
//# sourceMappingURL=chunk-LKXHCG5U.cjs.map