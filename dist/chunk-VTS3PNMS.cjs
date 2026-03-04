"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }// src/utils/create-composition.ts
function attachSubComponents(Chart, subComponents) {
  return Object.assign(Chart, subComponents);
}

// src/utils/date-parsing.ts
var _datefns = require('date-fns');
var hasTimezone = (dateString) => {
  return /T.*[Z]$|T.*[+-]\d{2}:?\d{2}$/.test(dateString);
};
var parseAsLocalDate = (dateString) => {
  const trimmedString = dateString.trim();
  if (hasTimezone(trimmedString)) {
    const isoDate = _datefns.parseISO.call(void 0, trimmedString);
    if (!_datefns.isValid.call(void 0, isoDate)) {
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
    const result = _datefns.parse.call(void 0, trimmedString, format, /* @__PURE__ */ new Date());
    if (_datefns.isValid.call(void 0, result)) {
      return result;
    }
  }
  return /* @__PURE__ */ new Date(NaN);
};

// src/utils/format-metric-value.ts
var _numberformatters = require('@automattic/number-formatters');
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
      const formatted = useMultipliers ? _numberformatters.formatNumberCompact.call(void 0, numericValue, {
        decimals: _nullishCoalesce(decimals, () => ( 2)),
        numberFormatOptions: {
          maximumFractionDigits: _nullishCoalesce(decimals, () => ( 2)),
          signDisplay
        }
      }) : _numberformatters.formatNumber.call(void 0, numericValue, {
        decimals: _nullishCoalesce(decimals, () => ( 2)),
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
      return _numberformatters.formatNumber.call(void 0, numericValue, {
        decimals: _nullishCoalesce(decimals, () => ( 0)),
        numberFormatOptions: {
          style: "percent",
          signDisplay: _nullishCoalesce(signDisplay, () => ( "exceptZero"))
        }
      });
    }
    case "number":
    default: {
      return useMultipliers ? _numberformatters.formatNumberCompact.call(void 0, numericValue, {
        decimals: _nullishCoalesce(decimals, () => ( 0)),
        numberFormatOptions: {
          maximumFractionDigits: _nullishCoalesce(decimals, () => ( 0)),
          signDisplay
        }
      }) : _numberformatters.formatNumber.call(void 0, numericValue, {
        decimals: _nullishCoalesce(decimals, () => ( 0)),
        numberFormatOptions: {
          signDisplay
        }
      });
    }
  }
};

// src/utils/format-percentage.ts

var formatPercentage = (value) => {
  return _numberformatters.formatNumber.call(void 0, value / 100, {
    numberFormatOptions: {
      style: "percent",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }
  });
};

// src/utils/get-longest-tick-width.ts
var _text = require('@visx/text');
var getLongestTickWidth = (ticks, formatTick, labelStyle) => {
  const formattedTicks = ticks.map((tick) => formatTick(tick, 0, []));
  const longestTick = formattedTicks.reduce(
    (longest, current) => longest.length >= current.length ? longest : current,
    formattedTicks[0]
  );
  return _text.getStringWidth.call(void 0, longestTick, labelStyle);
};

// src/utils/get-styles.ts
function getSeriesLineStyles(seriesData, index, providerTheme) {
  const themeSemanticLineStyle = _optionalChain([providerTheme, 'optionalAccess', _ => _.lineChart, 'optionalAccess', _2 => _2.lineStyles, 'optionalAccess', _3 => _3[_optionalChain([seriesData, 'access', _4 => _4.options, 'optionalAccess', _5 => _5.type])]]);
  const themeSeriesLineStyle = _optionalChain([providerTheme, 'optionalAccess', _6 => _6.seriesLineStyles, 'optionalAccess', _7 => _7[index % providerTheme.seriesLineStyles.length]]);
  return _nullishCoalesce(_nullishCoalesce(_nullishCoalesce(_optionalChain([seriesData, 'access', _8 => _8.options, 'optionalAccess', _9 => _9.seriesLineStyle]), () => ( themeSemanticLineStyle)), () => ( themeSeriesLineStyle)), () => ( {}));
}
function getSeriesStroke(seriesData, index, themeColors) {
  return _nullishCoalesce(_optionalChain([seriesData, 'access', _10 => _10.options, 'optionalAccess', _11 => _11.stroke]), () => ( themeColors[index % themeColors.length]));
}
function getItemShapeStyles(series, index, theme, legendShape) {
  const seriesShapeStyles = _nullishCoalesce(_optionalChain([series, 'access', _12 => _12.options, 'optionalAccess', _13 => _13.legendShapeStyle]), () => ( {}));
  const lineStyles = legendShape === "line" ? getSeriesLineStyles(series, index, theme) : {};
  const themeShapeStyles = _optionalChain([theme, 'access', _14 => _14.legend, 'optionalAccess', _15 => _15.shapeStyles, 'optionalAccess', _16 => _16[index]]);
  const itemShapeStyles = {
    ...seriesShapeStyles,
    ...lineStyles
  };
  if (Object.values(itemShapeStyles).some(
    (value) => value !== void 0 && value !== null && value !== ""
  )) {
    return itemShapeStyles;
  }
  return _nullishCoalesce(themeShapeStyles, () => ( {}));
}

// src/utils/is-safari.ts
var isSafari = () => {
  if (typeof navigator !== "undefined" && navigator.userAgent) {
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  }
  return false;
};

// src/utils/merge-themes.ts
var _deepmerge = require('deepmerge'); var _deepmerge2 = _interopRequireDefault(_deepmerge);
function mergeThemes(baseTheme, overrideTheme) {
  return _deepmerge2.default.call(void 0, baseTheme, overrideTheme, {
    // Ensure arrays are replaced rather than concatenated
    arrayMerge: (_destinationArray, sourceArray) => sourceArray
  });
}

// src/utils/color-utils.ts
var _d3color = require('@visx/vendor/d3-color');
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
  return _d3color.color.call(void 0, hex).copy({ opacity: alpha }).formatRgb();
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
  const parsed = _d3color.hsl.call(void 0, lower);
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
  const parsed = _d3color.color.call(void 0, lower);
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
    const parsed = _d3color.color.call(void 0, trimmed);
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
  } catch (e) {
    return null;
  }
}





















exports.attachSubComponents = attachSubComponents; exports.parseAsLocalDate = parseAsLocalDate; exports.formatMetricValue = formatMetricValue; exports.formatPercentage = formatPercentage; exports.getLongestTickWidth = getLongestTickWidth; exports.getSeriesLineStyles = getSeriesLineStyles; exports.getSeriesStroke = getSeriesStroke; exports.getItemShapeStyles = getItemShapeStyles; exports.isSafari = isSafari; exports.mergeThemes = mergeThemes; exports.isValidHexColor = isValidHexColor; exports.validateHexColor = validateHexColor; exports.hexToRgba = hexToRgba; exports.getColorDistance = getColorDistance; exports.parseHslString = parseHslString; exports.parseRgbString = parseRgbString; exports.normalizeColorToHex = normalizeColorToHex; exports.lightenHexColor = lightenHexColor; exports.resolveCssVariable = resolveCssVariable;
//# sourceMappingURL=chunk-VTS3PNMS.cjs.map