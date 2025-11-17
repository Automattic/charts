import {
  BarChartResponsive
} from "./chunk-VLYSUAPX.js";
import {
  withResponsive
} from "./chunk-TYYW4BG3.js";
import {
  GlobalChartsContext,
  GlobalChartsProvider
} from "./chunk-A3PGOCJO.js";

// src/components/bar-list-chart/bar-list-chart.tsx
import { formatNumberCompact } from "@automattic/number-formatters";
import { Group } from "@visx/group";
import { createScale, scaleBand } from "@visx/scale";
import { Text } from "@visx/text";
import { useContext, useMemo } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var getScaleBandwidth = (scale) => {
  const s = scale;
  return s && "bandwidth" in s ? s?.bandwidth() ?? 0 : 0;
};
var DefaultLabelComponent = ({ textProps, x, y, label, formatter }) => {
  return /* @__PURE__ */ jsx(Text, { ...textProps, textAnchor: "start", x, y, children: formatter(label) });
};
var DefaultValueComponent = ({ textProps, x, y, value, formatter }) => {
  return /* @__PURE__ */ jsx(Text, { ...textProps, textAnchor: "end", x, y, fontWeight: 500, children: formatter(value) });
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
    const textProps = allTickLabelProps[index] ?? {};
    delete textProps.textAnchor;
    delete textProps.dx;
    const sum = data.reduce(
      (acc, { data: seriesData }) => acc + (seriesData[index]?.value ?? 0),
      0
    );
    const y = from.y + yOffset;
    return /* @__PURE__ */ jsxs(Group, { children: [
      /* @__PURE__ */ jsx(
        LabelComponent,
        {
          textProps,
          x: labelPosition,
          y,
          label: formattedValue,
          formatter: labelFormatter
        }
      ),
      /* @__PURE__ */ jsx(
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
  const yScale = createScale({
    type: "band",
    range: [0, height],
    domain: dataKeys,
    ...yScaleConfig
  });
  const groupScale = scaleBand({
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
  const chartOptions = useMemo(() => {
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
      ...options.yScale ?? {}
    };
    const xScale = {
      ...defaultXScale,
      ...options.xScale ?? {}
    };
    return {
      yScale,
      xScale,
      labelPosition: options.labelPosition ?? (isMultiSeries ? 0 : 10),
      valueFormatter: options.valueFormatter ?? ((value) => formatNumberCompact(value)),
      labelFormatter: options.labelFormatter ?? ((value) => String(value)),
      valuePosition: options.valuePosition ?? width,
      yOffset: options.yOffset ?? getDefaultYOffset(data, yScale, height, isMultiSeries)
    };
  }, [options, width, data, height]);
  return /* @__PURE__ */ jsx(
    BarChartResponsive,
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
            children: (renderProps) => /* @__PURE__ */ jsx(
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
  const existingContext = useContext(GlobalChartsContext);
  if (existingContext) {
    return /* @__PURE__ */ jsx(BarListChartInternal, { ...props });
  }
  return /* @__PURE__ */ jsx(GlobalChartsProvider, { children: /* @__PURE__ */ jsx(BarListChartInternal, { ...props }) });
};
BarListChart.displayName = "BarListChart";
var BarListChartResponsive = withResponsive(BarListChart);

export {
  BarListChart,
  BarListChartResponsive
};
//# sourceMappingURL=chunk-QYXQJF3K.js.map