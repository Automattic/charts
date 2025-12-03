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
  const themeShapeStyles = _optionalChain([theme, 'access', _14 => _14.legendShapeStyles, 'optionalAccess', _15 => _15[index]]);
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
  } catch (e) {
    return null;
  }
};
















exports.attachSubComponents = attachSubComponents; exports.parseAsLocalDate = parseAsLocalDate; exports.formatMetricValue = formatMetricValue; exports.formatPercentage = formatPercentage; exports.getLongestTickWidth = getLongestTickWidth; exports.getSeriesLineStyles = getSeriesLineStyles; exports.getSeriesStroke = getSeriesStroke; exports.getItemShapeStyles = getItemShapeStyles; exports.isSafari = isSafari; exports.mergeThemes = mergeThemes; exports.hexToRgba = hexToRgba; exports.hexToHsl = hexToHsl; exports.getColorDistance = getColorDistance; exports.resolveCssVariable = resolveCssVariable;
//# sourceMappingURL=chunk-FI5B6KSH.cjs.map