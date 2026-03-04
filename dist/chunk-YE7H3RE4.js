import {
  withResponsive
} from "./chunk-OP6PHB2U.js";
import {
  GlobalChartsContext,
  GlobalChartsProvider,
  useGlobalChartsContext
} from "./chunk-ZO2FU4A4.js";
import {
  lightenHexColor,
  normalizeColorToHex,
  resolveCssVariable
} from "./chunk-DAU3HNEG.js";

// src/charts/geo-chart/geo-chart.tsx
import { __ } from "@wordpress/i18n";
import clsx from "clsx";
import { useContext, useMemo } from "react";
import { Chart } from "react-google-charts";

// src/charts/geo-chart/geo-chart.module.scss
var geo_chart_module_default = {
  "container": "a8ccharts-JvcqOz"
};

// src/charts/geo-chart/geo-chart.tsx
import { jsx as _jsx } from "react/jsx-runtime";
var DEFAULT_FEATURE_FILL_COLOR = "#ffffff";
var DEFAULT_BACKGROUND_COLOR = "#ffffff";
var GeoChartInternal = ({
  className,
  data,
  width,
  height,
  region = "world",
  resolution = "countries",
  renderPlaceholder
}) => {
  const {
    getElementStyles,
    theme: {
      geoChart: {
        featureFillColor
      },
      backgroundColor
    }
  } = useGlobalChartsContext();
  const loadingPlaceholder = /* @__PURE__ */ _jsx("div", {
    className: clsx("geo-chart", geo_chart_module_default.container, className),
    style: {
      width,
      height
    },
    children: renderPlaceholder ? renderPlaceholder() : __("Loading map", "jetpack-charts")
  });
  const fullColorHex = getElementStyles({
    index: 0
  }).color;
  const lightColorHex = lightenHexColor(fullColorHex, 0.8);
  const backgroundColorHex = normalizeColorToHex(backgroundColor, null, resolveCssVariable) || DEFAULT_BACKGROUND_COLOR;
  const defaultFillColorHex = normalizeColorToHex(featureFillColor, null, resolveCssVariable) || DEFAULT_FEATURE_FILL_COLOR;
  const hasHtmlTooltips = useMemo(() => data.length > 0 && data[0].some((col) => typeof col === "object" && col !== null && "role" in col && col.role === "tooltip" && "p" in col && typeof col.p === "object" && col.p !== null && "html" in col.p && col.p.html === true), [data]);
  const options = useMemo(() => ({
    ...region !== "world" && {
      region
    },
    ...resolution !== "countries" && {
      resolution
    },
    colorAxis: {
      colors: [lightColorHex, fullColorHex]
    },
    backgroundColor: backgroundColorHex,
    datalessRegionColor: defaultFillColorHex,
    defaultColor: defaultFillColorHex,
    tooltip: {
      trigger: "focus",
      isHtml: hasHtmlTooltips
    },
    legend: "none",
    keepAspectRatio: true
  }), [region, resolution, lightColorHex, fullColorHex, backgroundColorHex, defaultFillColorHex, hasHtmlTooltips]);
  return /* @__PURE__ */ _jsx("div", {
    className: clsx("geo-chart", geo_chart_module_default.container, className),
    style: {
      width,
      height,
      backgroundColor
    },
    children: /* @__PURE__ */ _jsx(Chart, {
      chartType: "GeoChart",
      width,
      height,
      data,
      options,
      loader: loadingPlaceholder
    })
  });
};
var GeoChartWithProvider = (props) => {
  const existingContext = useContext(GlobalChartsContext);
  if (existingContext) {
    return /* @__PURE__ */ _jsx(GeoChartInternal, {
      ...props
    });
  }
  return /* @__PURE__ */ _jsx(GlobalChartsProvider, {
    children: /* @__PURE__ */ _jsx(GeoChartInternal, {
      ...props
    })
  });
};
GeoChartWithProvider.displayName = "GeoChart";
var GeoChartResponsive = withResponsive(GeoChartWithProvider);

export {
  GeoChartWithProvider,
  GeoChartResponsive
};
//# sourceMappingURL=chunk-YE7H3RE4.js.map