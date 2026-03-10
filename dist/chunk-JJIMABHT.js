// src/utils/create-composition.ts
function attachSubComponents(Chart, subComponents) {
  return Object.assign(Chart, subComponents);
}

// src/utils/date-parsing.ts
import { parse, parseISO, isValid } from "date-fns";
var hasTimezone = (dateString) => {
  const tIndex = dateString.indexOf("T");
  if (tIndex === -1) {
    return false;
  }
  if (dateString.endsWith("Z")) {
    return true;
  }
  return /[+-]\d{2}:?\d{2}$/.test(dateString.slice(tIndex + 1));
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
  const themeShapeStyles = theme.legend?.shapeStyles?.[index];
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
import { color as d3Color, hsl as d3Hsl } from "@visx/vendor/d3-color";
var isValidHexColor = (hex) => {
  return typeof hex === "string" && /^#[0-9a-fA-F]{6}$/.test(hex);
};
var validateHexColor = (hex) => {
  if (isValidHexColor(hex)) {
    return;
  }
  if (typeof hex !== "string") {
    throw new Error("Hex color must be a string");
  }
  if (!hex.startsWith("#")) {
    throw new Error("Hex color must start with #");
  }
  if (hex.length !== 7) {
    throw new Error("Hex color must be 7 characters long (e.g., #ff0000)");
  }
  throw new Error("Hex color contains invalid characters. Only 0-9, a-f, A-F are allowed");
};
var hexToRgba = (hex, alpha) => {
  validateHexColor(hex);
  if (typeof alpha !== "number" || isNaN(alpha)) {
    throw new Error("Alpha must be a number");
  }
  return d3Color(hex).copy({ opacity: alpha }).formatRgb();
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
var parseHslString = (hslString) => {
  const lower = hslString.toLowerCase().trim();
  if (!lower.startsWith("hsl(")) {
    return null;
  }
  const parsed = d3Hsl(lower);
  if (isNaN(parsed.h) && isNaN(parsed.s) && isNaN(parsed.l)) {
    return null;
  }
  const h = isNaN(parsed.h) ? 0 : (parsed.h % 360 + 360) % 360;
  return [h, parsed.s * 100, parsed.l * 100];
};
var parseRgbString = (rgbString) => {
  const lower = rgbString.toLowerCase().trim();
  if (!lower.startsWith("rgb(") || lower.startsWith("rgba(")) {
    return null;
  }
  const parsed = d3Color(lower);
  if (!parsed) {
    return null;
  }
  return parsed.formatHex();
};
var normalizeColorToHex = (color, element, resolveCss) => {
  if (!color || typeof color !== "string") {
    return "";
  }
  if (/^#[0-9a-fA-F]{6}$/.test(color)) {
    return color;
  }
  const trimmed = color.trim().toLowerCase();
  if (/^#[0-9a-f]{3}$/i.test(trimmed)) {
    const r = trimmed[1];
    const g = trimmed[2];
    const b = trimmed[3];
    return `#${r}${r}${g}${g}${b}${b}`;
  }
  if (trimmed.startsWith("--") || trimmed.startsWith("var(")) {
    if (resolveCss) {
      const resolved = resolveCss(color, element);
      if (resolved) {
        return normalizeColorToHex(resolved, element, resolveCss);
      }
    }
    return color;
  }
  if (trimmed.startsWith("hsl(") || trimmed.startsWith("rgb(")) {
    if (trimmed.startsWith("rgba(")) {
      return color;
    }
    const parsed = d3Color(trimmed);
    if (parsed) {
      return parsed.formatHex();
    }
    return color;
  }
  return color;
};
var lightenHexColor = (hex, blend) => {
  validateHexColor(hex);
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const newR = Math.round(r + (255 - r) * blend);
  const newG = Math.round(g + (255 - g) * blend);
  const newB = Math.round(b + (255 - b) * blend);
  return `#${newR.toString(16).padStart(2, "0")}${newG.toString(16).padStart(2, "0")}${newB.toString(16).padStart(2, "0")}`;
};

// src/utils/resolve-css-var.ts
var CSS_VAR_NAME_PATTERN = /^--[\w-]+$/;
var resolveCssVariable = (value, element) => {
  if (!value) {
    return null;
  }
  if (value.startsWith("var(") && value.endsWith(")")) {
    const parsed = parseVarExpression(value);
    if (parsed) {
      const resolved = resolveVariableName(parsed.varName, element);
      return resolved || parsed.fallback;
    }
  }
  if (value.startsWith("--")) {
    return resolveVariableName(value, element);
  }
  return value;
};
function parseVarExpression(expr) {
  const inner = expr.slice(4, -1).trim();
  if (!inner.startsWith("--")) {
    return null;
  }
  const commaIndex = inner.indexOf(",");
  if (commaIndex === -1) {
    const varName2 = inner.trim();
    if (!CSS_VAR_NAME_PATTERN.test(varName2)) {
      return null;
    }
    return { varName: varName2, fallback: null };
  }
  const varName = inner.slice(0, commaIndex).trim();
  if (!CSS_VAR_NAME_PATTERN.test(varName)) {
    return null;
  }
  const fallback = inner.slice(commaIndex + 1).trim();
  return { varName, fallback: fallback || null };
}
function resolveVariableName(varName, element) {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return null;
  }
  try {
    const targetElement = element || document.documentElement;
    const computedValue = getComputedStyle(targetElement).getPropertyValue(varName).trim();
    return computedValue || null;
  } catch {
    return null;
  }
}

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
  isValidHexColor,
  validateHexColor,
  hexToRgba,
  getColorDistance,
  parseHslString,
  parseRgbString,
  normalizeColorToHex,
  lightenHexColor,
  resolveCssVariable
};
//# sourceMappingURL=chunk-JJIMABHT.js.map