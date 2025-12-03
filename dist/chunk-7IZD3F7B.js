// src/utils/create-composition.ts
function attachSubComponents(Chart, subComponents) {
  return Object.assign(Chart, subComponents);
}

// src/utils/date-parsing.ts
import { parse, parseISO, isValid } from "date-fns";
var hasTimezone = (dateString) => {
  return /T.*[Z]$|T.*[+-]\d{2}:?\d{2}$/.test(dateString);
};
var parseAsLocalDate = (dateString) => {
  const trimmedString = dateString.trim();
  if (hasTimezone(trimmedString)) {
    const isoDate = parseISO(trimmedString);
    if (!isValid(isoDate)) {
      return /* @__PURE__ */ new Date(NaN);
    }
    return isoDate;
  }
  const formats = [
    "yyyy-MM-dd",
    // 2025-01-01
    "yyyy-MM-dd HH:mm:ss",
    // 2025-01-01 14:30:45
    "yyyy-MM-dd HH:mm",
    // 2025-01-01 14:30
    "yyyy-MM-dd'T'HH:mm:ss",
    // 2025-01-01T14:30:45
    "yyyy-MM-dd'T'HH:mm:ss.SSS",
    // 2025-01-01T14:30:45.123
    "yyyy-MM-dd'T'HH:mm"
    // 2025-01-01T14:30
  ];
  for (const format of formats) {
    const result = parse(trimmedString, format, /* @__PURE__ */ new Date());
    if (isValid(result)) {
      return result;
    }
  }
  return /* @__PURE__ */ new Date(NaN);
};

// src/utils/format-metric-value.ts
import { formatNumberCompact, formatNumber } from "@automattic/number-formatters";
var formatMetricValue = (value, type = "number", { decimals, useMultipliers = false, signDisplay } = {}) => {
  if (value === null || value === void 0) {
    return "";
  }
  const numericValue = Number(value);
  if (isNaN(numericValue)) {
    return "";
  }
  switch (type) {
    case "currency": {
      const formatted = useMultipliers ? formatNumberCompact(numericValue, {
        decimals: decimals ?? 2,
        numberFormatOptions: {
          maximumFractionDigits: decimals ?? 2,
          signDisplay
        }
      }) : formatNumber(numericValue, {
        decimals: decimals ?? 2,
        numberFormatOptions: {
          signDisplay
        }
      });
      return `$${formatted}`;
    }
    case "average": {
      if (!Number.isFinite(numericValue)) {
        return "\u2014";
      }
      return formatNumber(numericValue, {
        decimals: decimals ?? 0,
        numberFormatOptions: {
          style: "percent",
          signDisplay: signDisplay ?? "exceptZero"
        }
      });
    }
    case "number":
    default: {
      return useMultipliers ? formatNumberCompact(numericValue, {
        decimals: decimals ?? 0,
        numberFormatOptions: {
          maximumFractionDigits: decimals ?? 0,
          signDisplay
        }
      }) : formatNumber(numericValue, {
        decimals: decimals ?? 0,
        numberFormatOptions: {
          signDisplay
        }
      });
    }
  }
};

// src/utils/format-percentage.ts
import { formatNumber as formatNumber2 } from "@automattic/number-formatters";
var formatPercentage = (value) => {
  return formatNumber2(value / 100, {
    numberFormatOptions: {
      style: "percent",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }
  });
};

// src/utils/get-longest-tick-width.ts
import { getStringWidth } from "@visx/text";
var getLongestTickWidth = (ticks, formatTick, labelStyle) => {
  const formattedTicks = ticks.map((tick) => formatTick(tick, 0, []));
  const longestTick = formattedTicks.reduce(
    (longest, current) => longest.length >= current.length ? longest : current,
    formattedTicks[0]
  );
  return getStringWidth(longestTick, labelStyle);
};

// src/utils/get-styles.ts
function getSeriesLineStyles(seriesData, index, providerTheme) {
  const themeSemanticLineStyle = providerTheme?.lineChart?.lineStyles?.[seriesData.options?.type];
  const themeSeriesLineStyle = providerTheme?.seriesLineStyles?.[index % providerTheme.seriesLineStyles.length];
  return seriesData.options?.seriesLineStyle ?? themeSemanticLineStyle ?? themeSeriesLineStyle ?? {};
}
function getSeriesStroke(seriesData, index, themeColors) {
  return seriesData.options?.stroke ?? themeColors[index % themeColors.length];
}
function getItemShapeStyles(series, index, theme, legendShape) {
  const seriesShapeStyles = series.options?.legendShapeStyle ?? {};
  const lineStyles = legendShape === "line" ? getSeriesLineStyles(series, index, theme) : {};
  const themeShapeStyles = theme.legendShapeStyles?.[index];
  const itemShapeStyles = {
    ...seriesShapeStyles,
    ...lineStyles
  };
  if (Object.values(itemShapeStyles).some(
    (value) => value !== void 0 && value !== null && value !== ""
  )) {
    return itemShapeStyles;
  }
  return themeShapeStyles ?? {};
}

// src/utils/is-safari.ts
var isSafari = () => {
  if (typeof navigator !== "undefined" && navigator.userAgent) {
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  }
  return false;
};

// src/utils/merge-themes.ts
import deepmerge from "deepmerge";
function mergeThemes(baseTheme, overrideTheme) {
  return deepmerge(baseTheme, overrideTheme, {
    // Ensure arrays are replaced rather than concatenated
    arrayMerge: (_destinationArray, sourceArray) => sourceArray
  });
}

// src/utils/color-utils.ts
var validateHexColor = (hex) => {
  if (typeof hex !== "string") {
    throw new Error("Hex color must be a string");
  }
  if (!hex.startsWith("#")) {
    throw new Error("Hex color must start with #");
  }
  if (hex.length !== 7) {
    throw new Error("Hex color must be 7 characters long (e.g., #ff0000)");
  }
  const hexDigits = hex.slice(1);
  if (!/^[0-9a-fA-F]{6}$/.test(hexDigits)) {
    throw new Error("Hex color contains invalid characters. Only 0-9, a-f, A-F are allowed");
  }
};
var hexToRgba = (hex, alpha) => {
  validateHexColor(hex);
  if (typeof alpha !== "number" || isNaN(alpha)) {
    throw new Error("Alpha must be a number");
  }
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
var hexToHsl = (hex) => {
  validateHexColor(hex);
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return [h * 360, s * 100, l * 100];
};
var getColorDistance = (hsl1, hsl2) => {
  const [h1, s1, l1] = hsl1;
  const [h2, s2, l2] = hsl2;
  let hueDiff = Math.abs(h1 - h2);
  hueDiff = Math.min(hueDiff, 360 - hueDiff);
  const hueWeight = 2;
  const lightnessWeight = 1;
  const saturationWeight = 0.5;
  return Math.sqrt(
    Math.pow(hueDiff * hueWeight, 2) + Math.pow((l1 - l2) * lightnessWeight, 2) + Math.pow((s1 - s2) * saturationWeight, 2)
  );
};

// src/utils/resolve-css-var.ts
var resolveCssVariable = (varName, element) => {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return null;
  }
  if (!varName.startsWith("--")) {
    return null;
  }
  try {
    const targetElement = element || document.documentElement;
    const computedValue = getComputedStyle(targetElement).getPropertyValue(varName).trim();
    return computedValue || null;
  } catch {
    return null;
  }
};

export {
  attachSubComponents,
  parseAsLocalDate,
  formatMetricValue,
  formatPercentage,
  getLongestTickWidth,
  getSeriesLineStyles,
  getSeriesStroke,
  getItemShapeStyles,
  isSafari,
  mergeThemes,
  hexToRgba,
  hexToHsl,
  getColorDistance,
  resolveCssVariable
};
//# sourceMappingURL=chunk-7IZD3F7B.js.map