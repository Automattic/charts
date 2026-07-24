Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
//#region \0rolldown/runtime.js
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJSMin = (cb, mod) => () => (mod || (cb((mod = { exports: {} }).exports, mod), cb = null), mod.exports);
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
//#endregion
let _automattic_number_formatters = require("@automattic/number-formatters");
let _visx_xychart = require("@visx/xychart");
let _wordpress_i18n = require("@wordpress/i18n");
let clsx = require("clsx");
clsx = __toESM(clsx, 1);
let react = require("react");
let react$1 = __toESM(react, 1);
react = __toESM(react);
let _visx_vendor_d3_color = require("@visx/vendor/d3-color");
let date_fns = require("date-fns");
let _visx_text = require("@visx/text");
let deepmerge = require("deepmerge");
deepmerge = __toESM(deepmerge, 1);
let react_jsx_runtime = require("react/jsx-runtime");
let _visx_tooltip = require("@visx/tooltip");
let _visx_scale = require("@visx/scale");
let _visx_group = require("@visx/group");
let _visx_legend = require("@visx/legend");
let react_dom = require("react-dom");
react_dom = __toESM(react_dom, 1);
let _wordpress_icons = require("@wordpress/icons");
let _wordpress_theme = require("@wordpress/theme");
_wordpress_theme = __toESM(_wordpress_theme, 1);
let _visx_gradient = require("@visx/gradient");
let _visx_curve = require("@visx/curve");
let _visx_responsive = require("@visx/responsive");
let _visx_annotation = require("@visx/annotation");
let _visx_pattern = require("@visx/pattern");
let react_google_charts = require("react-google-charts");
let dompurify = require("dompurify");
dompurify = __toESM(dompurify, 1);
require("@babel/runtime/helpers/esm/extends");
require("@babel/runtime/helpers/extends");
let _visx_shape = require("@visx/shape");
//#region src/charts/private/single-chart-context/single-chart-context.tsx
const ChartInstanceContext = (0, react$1.createContext)(null);
const SingleChartContext = ChartInstanceContext;
//#endregion
//#region src/charts/private/single-chart-context/use-single-chart-context.ts
const useChartInstanceContext = () => {
	const context = (0, react$1.useContext)(ChartInstanceContext);
	if (!context) throw new Error("useChartInstanceContext must be used within a Chart component");
	return context;
};
const useSingleChartContext = useChartInstanceContext;
//#endregion
//#region src/utils/create-composition.ts
/**
* Utility function to create chart components with composition API.
*
* This function attaches subcomponents to a chart component to enable
* dot notation access like <Chart.Legend />, <Chart.Tooltip />, etc.
*
* @param Chart         - The main chart component
* @param subComponents - Object containing subcomponents to attach
* @return Chart component with attached subcomponents
*/
function attachSubComponents(Chart, subComponents) {
	return Object.assign(Chart, subComponents);
}
//#endregion
//#region src/utils/date-parsing.ts
/**
* @file Date parsing utilities using date-fns for local timezone handling
*
* This module provides utilities for parsing various date string formats and converting
* them to local timezone dates using the battle-tested date-fns library. For formats
* without timezone info, they're treated as local. For formats with timezone info,
* they're converted to the equivalent local time.
*
* Note: And specifically it prevents format `YYYY-MM-DD` being parsed as UTC date.
*
* Key Features:
* - All parsed dates are in local timezone
* - Converts timezone-aware strings to local equivalent
* - Robust input validation and error handling using date-fns
* - TypeScript type safety
* - Much smaller codebase than custom parsing
*
* Supported Formats:
* - YYYY-MM-DD (treated as local)
* - YYYY-MM-DD HH:mm:ss (treated as local)
* - YYYY-MM-DD HH:mm (treated as local)
* - YYYY-MM-DDTHH:mm:ss (treated as local)
* - YYYY-MM-DDTHH:mm:ss.SSS (treated as local)
* - YYYY-MM-DDTHH:mm (treated as local)
* - YYYY-MM-DDTHH:mm:ssZ (converted to local)
* - YYYY-MM-DDTHH:mm:ss±HH:mm (converted to local)
*
* @example
* ```typescript
* parseAsLocalDate("2025-01-01");                     // Local timezone
* parseAsLocalDate("2025-01-01 14:30:00");            // Local timezone
* parseAsLocalDate("2025-01-01 14:30");               // Local timezone
* parseAsLocalDate("2025-01-01T14:30:45.123");        // Local timezone
* parseAsLocalDate("2025-01-01T14:30:00Z");           // UTC 14:30 → Local equivalent
* parseAsLocalDate("2025-01-01T14:30:00+05:00");      // +05:00 14:30 → Local equivalent
* ```
*/
/**
* Checks if a date string contains timezone information
* @param {string} dateString - The date string to check for timezone information
* @return {boolean} True if the date string contains timezone information, false otherwise
*/
const hasTimezone = (dateString) => {
	const tIndex = dateString.indexOf("T");
	if (tIndex === -1) return false;
	if (dateString.endsWith("Z")) return true;
	return /[+-]\d{2}:?\d{2}$/.test(dateString.slice(tIndex + 1));
};
/**
* Parses any supported date string format and returns a local timezone date
*
* Uses date-fns for robust parsing and validation. For strings without timezone
* info, treats as local timezone. For strings with timezone info, converts to
* local timezone equivalent.
*
* Supports:
* - YYYY-MM-DD (local)
* - YYYY-MM-DD HH:mm:ss (local)
* - YYYY-MM-DD HH:mm (local)
* - YYYY-MM-DDTHH:mm:ss (local)
* - YYYY-MM-DDTHH:mm:ss.SSS (local)
* - YYYY-MM-DDTHH:mm (local)
* - YYYY-MM-DDTHH:mm:ssZ (UTC → local)
* - YYYY-MM-DDTHH:mm:ss±HH:mm (offset → local)
* @param {string} dateString - The date string to parse into a local timezone date
* @return {Date} A Date object representing the parsed date in local timezone, or an invalid Date if parsing fails
*/
const parseAsLocalDate = (dateString) => {
	const trimmedString = dateString.trim();
	if (hasTimezone(trimmedString)) {
		const isoDate = (0, date_fns.parseISO)(trimmedString);
		if (!(0, date_fns.isValid)(isoDate)) return /* @__PURE__ */ new Date(NaN);
		return isoDate;
	}
	for (const format of [
		"yyyy-MM-dd",
		"yyyy-MM-dd HH:mm:ss",
		"yyyy-MM-dd HH:mm",
		"yyyy-MM-dd'T'HH:mm:ss",
		"yyyy-MM-dd'T'HH:mm:ss.SSS",
		"yyyy-MM-dd'T'HH:mm"
	]) {
		const result = (0, date_fns.parse)(trimmedString, format, /* @__PURE__ */ new Date());
		if ((0, date_fns.isValid)(result)) return result;
	}
	return /* @__PURE__ */ new Date(NaN);
};
//#endregion
//#region src/utils/format-metric-value.ts
/**
* Format a numeric metric value based on type, precision and scale.
* Supports currency, number and percentage, using `@automattic/number-formatters`.
*
* @param value                  - The value to format
* @param type                   - The type of formatting to apply
* @param options                - Formatting options
* @param options.decimals       - Number of decimal places to show
* @param options.useMultipliers - Whether to use K, M, B suffixes for large numbers
* @param options.signDisplay    - Controls when to display the sign (auto, always, never, exceptZero)
* @return Formatted string
*/
const formatMetricValue = (value, type = "number", { decimals, useMultipliers = false, signDisplay } = {}) => {
	if (value === null || value === void 0) return "";
	const numericValue = Number(value);
	if (isNaN(numericValue)) return "";
	switch (type) {
		case "currency": return `$${useMultipliers ? (0, _automattic_number_formatters.formatNumberCompact)(numericValue, {
			decimals: decimals ?? 2,
			numberFormatOptions: {
				maximumFractionDigits: decimals ?? 2,
				signDisplay
			}
		}) : (0, _automattic_number_formatters.formatNumber)(numericValue, {
			decimals: decimals ?? 2,
			numberFormatOptions: { signDisplay }
		})}`;
		case "average":
			if (!Number.isFinite(numericValue)) return "—";
			return (0, _automattic_number_formatters.formatNumber)(numericValue, {
				decimals: decimals ?? 0,
				numberFormatOptions: {
					style: "percent",
					signDisplay: signDisplay ?? "exceptZero"
				}
			});
		default: return useMultipliers ? (0, _automattic_number_formatters.formatNumberCompact)(numericValue, {
			decimals: decimals ?? 0,
			numberFormatOptions: {
				maximumFractionDigits: decimals ?? 0,
				signDisplay
			}
		}) : (0, _automattic_number_formatters.formatNumber)(numericValue, {
			decimals: decimals ?? 0,
			numberFormatOptions: { signDisplay }
		});
	}
};
//#endregion
//#region src/utils/format-percentage.ts
/**
* Format a percentage value with smart decimal handling.
* Uses `@automattic/number-formatters` for consistent formatting.
* Removes unnecessary trailing zeros and caps at 2 decimal places.
*
* @param value - The percentage value (0-100 range)
* @return Formatted percentage string (e.g., "30%", "30.1%", "30.25%")
*/
const formatPercentage = (value) => {
	return (0, _automattic_number_formatters.formatNumber)(value / 100, { numberFormatOptions: {
		style: "percent",
		minimumFractionDigits: 0,
		maximumFractionDigits: 2
	} });
};
//#endregion
//#region src/utils/get-longest-tick-width.ts
/**
* Returns the width of the longest tick.
*
* @param          ticks      - Ticks to get the width of.
* @param          formatTick - Function to format the tick.
* @param {object} labelStyle - Style object for the label.
* @return {number} - Width of the longest tick.
*/
const getLongestTickWidth = (ticks, formatTick, labelStyle) => {
	const formattedTicks = ticks.map((tick) => formatTick(tick, 0, []));
	return (0, _visx_text.getStringWidth)(formattedTicks.reduce((longest, current) => longest.length >= current.length ? longest : current, formattedTicks[0]), labelStyle);
};
//#endregion
//#region src/utils/get-styles.ts
/**
* Utility function to get consolidated line styles for a series
* This consolidates the logic used by both LineChart and Legend components
*
* @param {SeriesData} seriesData    - The series data containing styling options
* @param {number}     index         - The index of the series in the data array
* @param {ChartTheme} providerTheme - The chart theme configuration
* @return {LineStyles} The consolidated line styles for the series
*/
function getSeriesLineStyles(seriesData, index, providerTheme) {
	const themeSemanticLineStyle = providerTheme?.lineChart?.lineStyles?.[seriesData.options?.type];
	const themeSeriesLineStyle = providerTheme?.seriesLineStyles?.[index % providerTheme.seriesLineStyles.length];
	return seriesData.options?.seriesLineStyle ?? themeSemanticLineStyle ?? themeSeriesLineStyle ?? {};
}
/**
* Utility to get consolidated bar styles for a series by semantic type.
* Mirrors getSeriesLineStyles: a series with `options.type` (e.g. 'comparison')
* resolves to `theme.barChart.barStyles[ type ]`.
*
* @param {SeriesData} seriesData    - The series data containing styling options
* @param {number}     index         - The index of the series in the data array
* @param {ChartTheme} providerTheme - The chart theme configuration
* @return {BarStyles} The consolidated bar styles for the series
*/
function getSeriesBarStyles(seriesData, index, providerTheme) {
	const type = seriesData.options?.type;
	return (type && providerTheme?.barChart?.barStyles?.[type]) ?? {};
}
/**
* Utility function to get shape styles for a legend item
*
* @param {SeriesData}  series      - The series data containing styling options
* @param {number}      index       - The index of the series in the data array
* @param {ChartTheme}  theme       - The chart theme configuration
* @param {LegendShape} legendShape - The shape to use for the item (optional)
* @return {Record< string, unknown >} The shape styles for the item
*/
function getItemShapeStyles(series, index, theme, legendShape) {
	const seriesShapeStyles = series.options?.legendShapeStyle ?? {};
	const lineStyles = legendShape === "line" ? getSeriesLineStyles(series, index, theme) : {};
	const barOpacity = legendShape !== "line" ? getSeriesBarStyles(series, index, theme).opacity : void 0;
	const barShapeStyles = barOpacity !== void 0 ? { opacity: barOpacity } : {};
	const themeShapeStyles = theme.legend?.shapeStyles?.[index];
	const explicitStyles = {
		...seriesShapeStyles,
		...lineStyles
	};
	return {
		...Object.values(explicitStyles).some((value) => value !== void 0 && value !== null && value !== "") ? explicitStyles : themeShapeStyles ?? {},
		...barShapeStyles
	};
}
//#endregion
//#region src/utils/is-safari.ts
const isSafari = () => {
	if (typeof navigator !== "undefined" && navigator.userAgent) return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
	return false;
};
//#endregion
//#region src/utils/merge-themes.ts
function mergeThemes(baseTheme, overrideTheme) {
	return (0, deepmerge.default)(baseTheme, overrideTheme, { arrayMerge: (_destinationArray, sourceArray) => sourceArray });
}
//#endregion
//#region src/utils/color-utils.ts
/**
* Check if a value is a valid 6-digit hex color
* @param hex - The value to check
* @return true if valid hex color format (e.g., '#ff0000')
*/
const isValidHexColor = (hex) => {
	return typeof hex === "string" && /^#[0-9a-fA-F]{6}$/.test(hex);
};
/**
* Validate hex color format, throwing descriptive errors if invalid
* @param  hex - The hex color string to validate
* @throws {Error} if hex string is malformed
*/
const validateHexColor = (hex) => {
	if (isValidHexColor(hex)) return;
	if (typeof hex !== "string") throw new Error("Hex color must be a string");
	if (!hex.startsWith("#")) throw new Error("Hex color must start with #");
	if (hex.length !== 7) throw new Error("Hex color must be 7 characters long (e.g., #ff0000)");
	throw new Error("Hex color contains invalid characters. Only 0-9, a-f, A-F are allowed");
};
/**
* Convert hex color to rgba with specified opacity.
* This is genuinely reusable across chart components.
* @param  hex   - The hex color string (e.g., '#ff0000')
* @param  alpha - The opacity value. Values outside the [0, 1] range will be clamped by the underlying d3 color library.
* @return The rgba color string (e.g., 'rgba(255, 0, 0, 0.5)')
* @throws {Error} if hex string is malformed or alpha is not a valid number
*/
const hexToRgba = (hex, alpha) => {
	validateHexColor(hex);
	if (typeof alpha !== "number" || isNaN(alpha)) throw new Error("Alpha must be a number");
	return (0, _visx_vendor_d3_color.color)(hex).copy({ opacity: alpha }).formatRgb();
};
/**
* Calculate the perceptual distance between two HSL colors
* @param hsl1 - first color in HSL format [h, s, l]
* @param hsl2 - second color in HSL format [h, s, l]
* @return distance value (0-100+, lower means more similar)
*/
const getColorDistance = (hsl1, hsl2) => {
	const [h1, s1, l1] = hsl1;
	const [h2, s2, l2] = hsl2;
	let hueDiff = Math.abs(h1 - h2);
	hueDiff = Math.min(hueDiff, 360 - hueDiff);
	return Math.sqrt(Math.pow(hueDiff * 2, 2) + Math.pow((l1 - l2) * 1, 2) + Math.pow((s1 - s2) * .5, 2));
};
/**
* Parse an HSL string like 'hsl(120, 50%, 50%)' into an HSL tuple.
*
* @param hslString - HSL color string
* @return HSL tuple [h, s, l] or null if invalid
*/
const parseHslString = (hslString) => {
	const lower = hslString.toLowerCase().trim();
	if (!lower.startsWith("hsl(")) return null;
	const parsed = (0, _visx_vendor_d3_color.hsl)(lower);
	if (isNaN(parsed.h) && isNaN(parsed.s) && isNaN(parsed.l)) return null;
	return [
		isNaN(parsed.h) ? 0 : (parsed.h % 360 + 360) % 360,
		parsed.s * 100,
		parsed.l * 100
	];
};
/**
* Parse an RGB string like 'rgb(255, 0, 0)' into a hex color.
*
* @deprecated    Use normalizeColorToHex() instead, which handles all color formats including rgb() and rgba().
* @param      rgbString - RGB color string (not RGBA)
* @return        hex color string or null if invalid
*/
const parseRgbString = (rgbString) => {
	const lower = rgbString.toLowerCase().trim();
	if (!lower.startsWith("rgb(") || lower.startsWith("rgba(")) return null;
	const parsed = (0, _visx_vendor_d3_color.color)(lower);
	if (!parsed) return null;
	return parsed.formatHex();
};
/**
* Normalize any CSS color value to a hex color string.
* Handles hex, HSL, HSLA, RGB, RGBA, named CSS colors, and CSS variables.
*
* @param color      - Any CSS color value
* @param element    - Optional DOM element for resolving CSS variables
* @param resolveCss - Function to resolve CSS variables (injected for testability)
* @param _depth     - Internal recursion depth counter to prevent infinite loops
* @return hex color string, or the original value if conversion fails
*/
const normalizeColorToHex = (color, element, resolveCss, _depth = 0) => {
	if (!color || typeof color !== "string") return "";
	if (/^#[0-9a-fA-F]{6}$/.test(color)) return color;
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
			if (resolved && resolved !== color && _depth < 10) return normalizeColorToHex(resolved, element, resolveCss, _depth + 1);
		}
		return color;
	}
	if (trimmed.startsWith("hsl(") || trimmed.startsWith("hsla(") || trimmed.startsWith("rgb(") || trimmed.startsWith("rgba(")) {
		const parsed = (0, _visx_vendor_d3_color.color)(trimmed);
		if (parsed) return parsed.formatHex();
		return color;
	}
	const parsed = (0, _visx_vendor_d3_color.color)(trimmed);
	if (parsed) return parsed.formatHex();
	return color;
};
/**
* Lighten a hex color by blending it with white.
* Useful for creating color gradients or lighter variants.
*
* @param  hex   - Hex color string (e.g., '#98C8DF')
* @param  blend - Blend amount with white (0 = original color, 1 = white)
* @return Lightened hex color string (e.g., '#cce4ef')
* @throws {Error} if hex string is malformed
*/
const lightenHexColor = (hex, blend) => {
	validateHexColor(hex);
	const r = parseInt(hex.slice(1, 3), 16);
	const g = parseInt(hex.slice(3, 5), 16);
	const b = parseInt(hex.slice(5, 7), 16);
	const newR = Math.round(r + (255 - r) * blend);
	const newG = Math.round(g + (255 - g) * blend);
	const newB = Math.round(b + (255 - b) * blend);
	return `#${newR.toString(16).padStart(2, "0")}${newG.toString(16).padStart(2, "0")}${newB.toString(16).padStart(2, "0")}`;
};
/**
* Blend one hex color toward another, per-channel in sRGB.
*
* @param  fromHex - Starting hex color, returned when blend is 0
* @param  toHex   - Target hex color, returned when blend is 1
* @param  blend   - Amount toward toHex, clamped to [0, 1]
* @return Blended hex color string
* @throws {Error} if either hex string is malformed
*/
const mixHexColors = (fromHex, toHex, blend) => {
	validateHexColor(fromHex);
	validateHexColor(toHex);
	const amount = Math.min(1, Math.max(0, blend));
	const channel = (start, end) => Math.round(start + (end - start) * amount).toString(16).padStart(2, "0");
	return `#${channel(parseInt(fromHex.slice(1, 3), 16), parseInt(toHex.slice(1, 3), 16))}${channel(parseInt(fromHex.slice(3, 5), 16), parseInt(toHex.slice(3, 5), 16))}${channel(parseInt(fromHex.slice(5, 7), 16), parseInt(toHex.slice(5, 7), 16))}`;
};
/**
* WCAG relative luminance of a hex color (0 = black, 1 = white).
*
* @param  hex - Hex color string (e.g., '#98C8DF')
* @return Relative luminance in the range [0, 1]
* @throws {Error} if hex string is malformed
*/
const relativeLuminance = (hex) => {
	validateHexColor(hex);
	const toLinear = (value) => {
		const channel = value / 255;
		return channel <= .03928 ? channel / 12.92 : Math.pow((channel + .055) / 1.055, 2.4);
	};
	const r = toLinear(parseInt(hex.slice(1, 3), 16));
	const g = toLinear(parseInt(hex.slice(3, 5), 16));
	const b = toLinear(parseInt(hex.slice(5, 7), 16));
	return .2126 * r + .7152 * g + .0722 * b;
};
/**
* Whether light text reads better than dark text on the given background, using the W3C
* luminance threshold (0.179) that maximizes contrast against black vs white.
*
* @param backgroundHex - Hex background color
* @return true if light text should be used; false (dark text) for malformed colors
*/
const prefersLightText = (backgroundHex) => {
	if (!isValidHexColor(backgroundHex)) return false;
	return relativeLuminance(backgroundHex) <= .179;
};
//#endregion
//#region src/utils/resolve-css-var.ts
/**
* Pattern for valid CSS custom property names (e.g., '--my-color', '--jp-gray-10')
*/
const CSS_VAR_NAME_PATTERN = /^--[\w-]+$/;
/**
* Resolves a CSS custom property (variable) to its computed value.
* Handles multiple formats:
* - Plain variable names: '--my-color'
* - CSS var() syntax: 'var(--my-color)'
* - CSS var() with fallback: 'var(--my-color, #ffffff)'
* - Regular values (returned as-is): '#ffffff', 'red'
*
* @param value   - A CSS variable name, var() expression, or regular value
* @param element - Optional DOM element to resolve the variable from (defaults to document.documentElement)
* @return The resolved value, fallback value, or null if unresolvable
*/
const resolveCssVariable = (value, element) => {
	if (!value) return null;
	if (value.startsWith("var(") && value.endsWith(")")) {
		const parsed = parseVarExpression(value);
		if (parsed) return resolveVariableName(parsed.varName, element) || parsed.fallback;
	}
	if (value.startsWith("--")) return resolveVariableName(value, element);
	return value;
};
/**
* Parses a var() expression into its variable name and optional fallback.
* Uses string manipulation instead of complex regex to avoid ReDoS.
*
* @param expr - A var() expression like 'var(--name)' or 'var(--name, fallback)'
* @return Parsed result or null if invalid
*/
function parseVarExpression(expr) {
	const inner = expr.slice(4, -1).trim();
	if (!inner.startsWith("--")) return null;
	const commaIndex = inner.indexOf(",");
	if (commaIndex === -1) {
		const varName = inner.trim();
		if (!CSS_VAR_NAME_PATTERN.test(varName)) return null;
		return {
			varName,
			fallback: null
		};
	}
	const varName = inner.slice(0, commaIndex).trim();
	if (!CSS_VAR_NAME_PATTERN.test(varName)) return null;
	return {
		varName,
		fallback: inner.slice(commaIndex + 1).trim() || null
	};
}
/**
* Resolves a plain CSS variable name to its computed value.
*
* @param varName - A CSS variable name like '--my-color'
* @param element - Optional DOM element to resolve from
* @return The computed value or null
*/
function resolveVariableName(varName, element) {
	if (typeof window === "undefined" || typeof document === "undefined") return null;
	try {
		const targetElement = element || document.documentElement;
		return getComputedStyle(targetElement).getPropertyValue(varName).trim() || null;
	} catch {
		return null;
	}
}
//#endregion
//#region src/utils/resolve-font-size.ts
/**
* Resolve a theme `fontSize` value into a plain number suitable for
* canvas-based measurement (e.g. `getStringWidth`).
*
* Accepts:
* - A number — returned as-is
* - A pixel string like `"12px"` — parsed and returned as a number
*
* Returns `undefined` for any other input (missing value, NaN, or
* relative units like `rem`/`em`/`%`/`vh`) so callers can fall back to
* their own default. Relative units are intentionally rejected because
* we cannot resolve them to absolute pixels here without a parent
* computed style, and silently returning the unitless prefix
* (`parseFloat("0.875rem") === 0.875`) would produce nearly-zero
* widths in measurement code.
* @param val - Raw font size value from a theme, axis style, or props
* @return Parsed numeric font size in pixels, or `undefined` when unresolvable
*/
const resolveFontSize = (val) => {
	if (typeof val === "number") return isNaN(val) ? void 0 : val;
	if (typeof val === "string") {
		const match = val.trim().match(/^(-?\d+\.?\d*|-?\.\d+)(px)?$/);
		if (!match) return;
		const parsed = parseFloat(match[1]);
		return isNaN(parsed) ? void 0 : parsed;
	}
};
//#endregion
//#region src/providers/chart-context/private/get-chart-color.ts
/**
* Golden ratio for mathematically pleasing color distribution
* Used to generate evenly spaced hues that are visually distinct
*/
const GOLDEN_RATIO = .618033988749;
/**
* Minimum perceptual distance between colors to ensure visual distinction
* Based on weighted HSL distance calculation optimized for chart readability
*/
const MIN_COLOR_DISTANCE = 25;
/**
* Maximum attempts to find a sufficiently different color
* Prevents infinite loops while allowing reasonable search space
*/
const MAX_COLOR_GENERATION_ATTEMPTS = 50;
/**
* Color variation attempt offset
* Small increment to explore slightly different color variations per attempt
*/
const VARIATION_ATTEMPT_OFFSET = .1;
/**
* Base saturation percentage for generated colors
* 45% provides muted, professional colors without being washed out
*/
const BASE_SATURATION = 45;
/**
* Number of saturation variation steps
* Creates 3 different saturation levels for variety
*/
const SATURATION_VARIATION_STEPS = 3;
/**
* Saturation increment per variation step
* 10% increments provide subtle variation while keeping colors muted
* Results in saturation levels: 45%, 55%, 65%
*/
const SATURATION_INCREMENT = 10;
/**
* Base lightness percentage for generated colors
* 35% ensures sufficient contrast against white backgrounds for WCAG AA compliance
* WCAG AA requires 4.5:1 contrast ratio for normal text
*/
const BASE_LIGHTNESS = 35;
/**
* Number of lightness variation steps
* Creates 4 different lightness levels for variety
*/
const LIGHTNESS_VARIATION_STEPS = 4;
/**
* Lightness increment per variation step
* 8% increments provide subtle lightness variation while maintaining accessibility
* Results in lightness levels: 35%, 43%, 51%, 59%
* All levels maintain WCAG AA compliance against white backgrounds
*/
const LIGHTNESS_INCREMENT = 8;
/**
* Minimum hue range in degrees to ensure sufficient color variety
* 60 degrees provides reasonable color spread even for narrow palettes
*/
const MIN_HUE_RANGE_DEGREES = 60;
/**
* Hue range expansion factor
* 1.3x expansion provides slightly more variety than the original palette
*/
const HUE_RANGE_EXPANSION_FACTOR = 1.3;
/**
* Threshold for detecting hue wrap-around (color wheel boundary crossing)
* 180 degrees indicates the colors span more than half the color wheel
*/
const HUE_WRAP_THRESHOLD_DEGREES = 180;
/**
* Full color wheel rotation in degrees
*/
const FULL_HUE_ROTATION_DEGREES = 360;
/**
* Factor for single color hue range
*/
const SINGLE_COLOR_HUE_RANGE_FACTOR = .33;
/**
* Get a color from the colors array or generate a new color using the golden ratio
*
* @param index      - the index of the color to get
* @param colorCache - pre-computed color data for performance
* @return a color from the colors array or a new color using the golden ratio
*/
const getChartColor = (index, colorCache) => {
	const { colors, hues, existingHslColors, minHue: cachedMinHue, maxHue: cachedMaxHue } = colorCache;
	if (index < colors.length) return colors[index];
	let minHue = cachedMinHue;
	let maxHue = cachedMaxHue;
	for (let attempt = 0; attempt < MAX_COLOR_GENERATION_ATTEMPTS; attempt++) {
		let hue = (index - colors.length + attempt * VARIATION_ATTEMPT_OFFSET) * GOLDEN_RATIO * FULL_HUE_ROTATION_DEGREES % FULL_HUE_ROTATION_DEGREES;
		if (hues.length > 0) {
			let hueRange = maxHue - minHue;
			if (hues.length === 1) hueRange = FULL_HUE_ROTATION_DEGREES * SINGLE_COLOR_HUE_RANGE_FACTOR;
			else if (hueRange > HUE_WRAP_THRESHOLD_DEGREES) {
				const altMinHue = Math.min(...hues.filter((h) => h > HUE_WRAP_THRESHOLD_DEGREES));
				const altMaxHue = Math.max(...hues.filter((h) => h < HUE_WRAP_THRESHOLD_DEGREES)) + FULL_HUE_ROTATION_DEGREES;
				const altRange = altMaxHue - altMinHue;
				if (altRange < hueRange) {
					minHue = altMinHue;
					maxHue = altMaxHue;
					hueRange = altRange;
				}
			}
			const expandedRange = Math.max(hueRange * HUE_RANGE_EXPANSION_FACTOR, MIN_HUE_RANGE_DEGREES);
			hue = (minHue + maxHue) / 2 - expandedRange / 2 + hue / FULL_HUE_ROTATION_DEGREES * expandedRange;
			hue = (hue % FULL_HUE_ROTATION_DEGREES + FULL_HUE_ROTATION_DEGREES) % FULL_HUE_ROTATION_DEGREES;
		}
		const saturation = BASE_SATURATION + (index + attempt) % SATURATION_VARIATION_STEPS * SATURATION_INCREMENT;
		const lightness = BASE_LIGHTNESS + (index + attempt) % LIGHTNESS_VARIATION_STEPS * LIGHTNESS_INCREMENT;
		const candidateHsl = [
			hue,
			saturation,
			lightness
		];
		let isSufficientlyDifferent = true;
		for (const existingHsl of existingHslColors) if (getColorDistance(candidateHsl, existingHsl) < MIN_COLOR_DISTANCE) {
			isSufficientlyDifferent = false;
			break;
		}
		if (isSufficientlyDifferent) return (0, _visx_vendor_d3_color.hsl)(Math.round(hue), saturation / 100, lightness / 100).formatHex();
	}
	const fallbackHue = (index - colors.length) * GOLDEN_RATIO * FULL_HUE_ROTATION_DEGREES % FULL_HUE_ROTATION_DEGREES;
	const fallbackSaturation = BASE_SATURATION + index % SATURATION_VARIATION_STEPS * SATURATION_INCREMENT;
	const fallbackLightness = BASE_LIGHTNESS + index % LIGHTNESS_VARIATION_STEPS * LIGHTNESS_INCREMENT;
	return (0, _visx_vendor_d3_color.hsl)(Math.round(fallbackHue), fallbackSaturation / 100, fallbackLightness / 100).formatHex();
};
//#endregion
//#region src/providers/chart-context/themes.ts
/**
* Default theme configuration
*/
const defaultTheme = {
	backgroundColor: "var(--a8c-charts-color-background, var(--wpds-color-background-surface-neutral-strong, #fff))",
	labelBackgroundColor: "transparent",
	labelTextColor: "var(--a8c-charts-color-label-on-fill, #FFFFFF)",
	colors: [
		"#98C8DF",
		"#006DAB",
		"#A6DC80",
		"#1F9828",
		"#FF8C8F"
	],
	gridStyles: {
		stroke: "var(--a8c-charts-color-grid, var(--wpds-color-stroke-surface-neutral, #dbdbdb))",
		strokeWidth: 1
	},
	tickLength: 4,
	gridColor: "",
	gridColorDark: "",
	xTickLineStyles: {
		stroke: "var(--a8c-charts-color-tick, var(--wpds-color-stroke-surface-neutral, #dbdbdb))",
		strokeWidth: 1
	},
	xAxisLineStyles: {
		stroke: "var(--a8c-charts-color-axis, var(--wpds-color-stroke-surface-neutral, #dbdbdb))",
		strokeWidth: 1
	},
	legend: {
		labelStyles: { color: "var(--a8c-charts-color-label, var(--wpds-color-foreground-content-neutral, #1e1e1e))" },
		containerStyles: {},
		shapeStyles: []
	},
	seriesLineStyles: [],
	glyphs: [],
	svgLabelSmall: {
		fill: "var(--a8c-charts-color-label, var(--wpds-color-foreground-content-neutral, #1e1e1e))",
		fontFamily: "inherit"
	},
	svgLabelBig: { fontFamily: "inherit" },
	annotationStyles: {
		label: {
			anchorLineStroke: "var(--a8c-charts-color-annotation, var(--wpds-color-foreground-content-neutral, #1e1e1e))",
			backgroundFill: "var(--a8c-charts-color-background, var(--wpds-color-background-surface-neutral-strong, #fff))"
		},
		connector: { stroke: "var(--a8c-charts-color-annotation, var(--wpds-color-foreground-content-neutral, #1e1e1e))" },
		circleSubject: {
			stroke: "transparent",
			fill: "var(--a8c-charts-color-annotation, var(--wpds-color-foreground-content-neutral, #1e1e1e))",
			radius: 5
		}
	},
	geoChart: { featureFillColor: "var(--a8c-charts-color-surface-secondary, var(--wpds-color-background-surface-neutral-weak, #f4f4f4))" },
	leaderboardChart: {
		rowGap: 12,
		columnGap: 4,
		labelSpacing: "xs",
		deltaColors: [
			"var(--a8c-charts-color-trend-down, var(--wpds-color-foreground-content-error-weak, #cc1818))",
			"var(--a8c-charts-color-trend-neutral, var(--wpds-color-foreground-content-neutral-weak, #707070))",
			"var(--a8c-charts-color-trend-up, var(--wpds-color-foreground-content-success-weak, #008030))"
		]
	},
	conversionFunnelChart: {
		backgroundColor: "var(--a8c-charts-color-surface-secondary, var(--wpds-color-background-surface-neutral-weak, #f4f4f4))",
		positiveChangeColor: "var(--a8c-charts-color-trend-up, var(--wpds-color-foreground-content-success-weak, #008030))",
		negativeChangeColor: "var(--a8c-charts-color-trend-down, var(--wpds-color-foreground-content-error-weak, #cc1818))"
	},
	lineChart: { lineStyles: { comparison: {
		strokeDasharray: "4 4",
		strokeLinecap: "square"
	} } },
	barChart: { barStyles: { comparison: {
		widthFactor: 1.5,
		opacity: .5
	} } },
	sparkline: {
		margin: {
			top: 2,
			right: 2,
			bottom: 2,
			left: 2
		},
		strokeWidth: 1.5
	},
	heatmapChart: {
		compactCellGap: 2,
		compactCellSize: 11
	}
};
//#endregion
//#region src/providers/chart-context/global-charts-provider.tsx
const GlobalChartsContext = (0, react$1.createContext)(null);
const GlobalChartsProvider = ({ children, theme }) => {
	const [charts, setCharts] = (0, react$1.useState)(() => /* @__PURE__ */ new Map());
	const [hiddenSeries, setHiddenSeries] = (0, react$1.useState)(() => /* @__PURE__ */ new Map());
	const wrapperRef = (0, react$1.useRef)(null);
	const providerTheme = (0, react$1.useMemo)(() => {
		return theme ? mergeThemes(defaultTheme, theme) : defaultTheme;
	}, [theme]);
	const [colorCache, setColorCache] = (0, react$1.useState)(() => ({
		colors: [],
		hues: [],
		existingHslColors: [],
		minHue: 360,
		maxHue: 0
	}));
	const [isColorPaletteResolved, setIsColorPaletteResolved] = (0, react$1.useState)(false);
	(0, react$1.useLayoutEffect)(() => {
		setIsColorPaletteResolved(false);
		const { colors } = providerTheme;
		const resolvedColors = [];
		const hues = [];
		const existingHslColors = [];
		let minHue = 360;
		let maxHue = 0;
		if (Array.isArray(colors)) {
			for (const color of colors) if (color && typeof color === "string") {
				const normalizedColor = normalizeColorToHex(color, wrapperRef.current, resolveCssVariable);
				if (normalizedColor.startsWith("#")) {
					resolvedColors.push(normalizedColor);
					const hslColor = (0, _visx_vendor_d3_color.hsl)(normalizedColor);
					if (!isNaN(hslColor.h)) {
						const hslTuple = [
							hslColor.h,
							hslColor.s * 100,
							hslColor.l * 100
						];
						hues.push(hslTuple[0]);
						existingHslColors.push(hslTuple);
						minHue = Math.min(minHue, hslTuple[0]);
						maxHue = Math.max(maxHue, hslTuple[0]);
					}
				}
			}
		}
		setColorCache({
			colors: resolvedColors,
			hues,
			existingHslColors,
			minHue,
			maxHue
		});
	}, [providerTheme]);
	(0, react$1.useEffect)(() => {
		if (colorCache.colors.length > 0) setIsColorPaletteResolved(true);
	}, [colorCache]);
	const [groupToColorMap, setGroupToColorMap] = (0, react$1.useState)(() => /* @__PURE__ */ new Map());
	(0, react$1.useEffect)(() => {
		setGroupToColorMap(/* @__PURE__ */ new Map());
	}, [providerTheme.colors]);
	const registerChart = (0, react$1.useCallback)((id, data) => {
		setCharts((prev) => new Map(prev).set(id, data));
	}, []);
	const unregisterChart = (0, react$1.useCallback)((id) => {
		setCharts((prev) => {
			const newMap = new Map(prev);
			newMap.delete(id);
			return newMap;
		});
	}, []);
	const getChartData = (0, react$1.useCallback)((id) => {
		return charts.get(id);
	}, [charts]);
	const resolveColor = (0, react$1.useCallback)(({ group, index, overrideColor }) => {
		if (overrideColor) return normalizeColorToHex(overrideColor, wrapperRef.current, resolveCssVariable);
		if (group) {
			const existing = groupToColorMap.get(group);
			if (existing) return existing;
			const assignedCount = groupToColorMap.size;
			const color = getChartColor(assignedCount, colorCache);
			groupToColorMap.set(group, color);
			return color;
		}
		return getChartColor(index, colorCache);
	}, [colorCache, groupToColorMap]);
	const resolveThemeColor = (0, react$1.useCallback)((value) => value ? normalizeColorToHex(value, wrapperRef.current, resolveCssVariable) : "", []);
	const getElementStyles = (0, react$1.useCallback)(({ data, index, overrideColor, legendShape }) => {
		const isSeriesData = data && typeof data === "object" && "data" in data && "options" in data;
		const isPointPercentageData = data && typeof data === "object" && "value" in data && typeof data.value === "number" && !("data" in data);
		return {
			color: resolveColor({
				group: data?.group,
				index,
				overrideColor: overrideColor || isSeriesData && data?.options?.stroke || isPointPercentageData && data?.color
			}),
			lineStyles: isSeriesData ? getSeriesLineStyles(data, index, providerTheme) : {},
			barStyles: isSeriesData ? getSeriesBarStyles(data, index, providerTheme) : {},
			glyph: providerTheme.glyphs?.[index],
			shapeStyles: isSeriesData ? getItemShapeStyles(data, index, providerTheme, legendShape) : {}
		};
	}, [providerTheme, resolveColor]);
	const toggleSeriesVisibility = (0, react$1.useCallback)((chartId, seriesLabel) => {
		setHiddenSeries((prev) => {
			const newMap = new Map(prev);
			const chartHidden = newMap.get(chartId) || /* @__PURE__ */ new Set();
			const newSet = new Set(chartHidden);
			if (newSet.has(seriesLabel)) newSet.delete(seriesLabel);
			else newSet.add(seriesLabel);
			if (newSet.size === 0) newMap.delete(chartId);
			else newMap.set(chartId, newSet);
			return newMap;
		});
	}, []);
	const isSeriesVisible = (0, react$1.useCallback)((chartId, seriesLabel) => {
		const chartHidden = hiddenSeries.get(chartId);
		return !chartHidden || !chartHidden.has(seriesLabel);
	}, [hiddenSeries]);
	const getHiddenSeries = (0, react$1.useCallback)((chartId) => {
		const set = hiddenSeries.get(chartId);
		return set ? new Set(set) : /* @__PURE__ */ new Set();
	}, [hiddenSeries]);
	const value = (0, react$1.useMemo)(() => ({
		charts,
		registerChart,
		unregisterChart,
		getChartData,
		theme: providerTheme,
		getElementStyles,
		resolveThemeColor,
		toggleSeriesVisibility,
		isSeriesVisible,
		getHiddenSeries,
		isColorPaletteResolved
	}), [
		charts,
		registerChart,
		unregisterChart,
		getChartData,
		providerTheme,
		getElementStyles,
		resolveThemeColor,
		toggleSeriesVisibility,
		isSeriesVisible,
		getHiddenSeries,
		isColorPaletteResolved
	]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(GlobalChartsContext.Provider, {
		value,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			ref: wrapperRef,
			style: { display: "contents" },
			children
		})
	});
};
//#endregion
//#region src/providers/chart-context/hooks/use-global-charts-context.ts
const useGlobalChartsContext = () => {
	const context = (0, react$1.useContext)(GlobalChartsContext);
	if (!context) throw new Error("useGlobalChartsContext must be used within a GlobalChartsProvider");
	return context;
};
//#endregion
//#region src/providers/chart-context/hooks/use-chart-id.ts
const useChartId = (providedId) => {
	const generatedId = (0, react$1.useId)();
	return providedId || generatedId;
};
//#endregion
//#region src/hooks/use-deep-memo.ts
var import_fast_deep_equal = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = function equal(a, b) {
		if (a === b) return true;
		if (a && b && typeof a == "object" && typeof b == "object") {
			if (a.constructor !== b.constructor) return false;
			var length, i, keys;
			if (Array.isArray(a)) {
				length = a.length;
				if (length != b.length) return false;
				for (i = length; i-- !== 0;) if (!equal(a[i], b[i])) return false;
				return true;
			}
			if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
			if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
			if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();
			keys = Object.keys(a);
			length = keys.length;
			if (length !== Object.keys(b).length) return false;
			for (i = length; i-- !== 0;) if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
			for (i = length; i-- !== 0;) {
				var key = keys[i];
				if (!equal(a[key], b[key])) return false;
			}
			return true;
		}
		return a !== a && b !== b;
	};
})))(), 1);
/**
* Custom hook to memoize a value using deep equality comparison.
* Prevents unnecessary re-renders when objects have the same content but different references.
*
* @param value - The value to memoize with deep equality comparison
* @return The memoized value that only changes when deeply different
*/
const useDeepMemo = (value) => {
	const ref = (0, react$1.useRef)(value);
	if (!(0, import_fast_deep_equal.default)(ref.current, value)) ref.current = value;
	return ref.current;
};
//#endregion
//#region src/hooks/use-xychart-theme.ts
const resolveColor = (value) => value ? resolveCssVariable(value) ?? value : value;
const useXYChartTheme = (data) => {
	const theme = useGlobalChartsTheme();
	return (0, react$1.useMemo)(() => {
		const seriesColors = (data ?? []).map((series) => series.options?.stroke).filter((color) => Boolean(color));
		return (0, _visx_xychart.buildChartTheme)({
			...theme,
			colors: [...seriesColors, ...theme.colors ?? []],
			backgroundColor: resolveColor(theme.backgroundColor),
			gridStyles: theme.gridStyles && {
				...theme.gridStyles,
				stroke: resolveColor(theme.gridStyles.stroke)
			},
			xAxisLineStyles: theme.xAxisLineStyles && {
				...theme.xAxisLineStyles,
				stroke: resolveColor(theme.xAxisLineStyles.stroke)
			},
			xTickLineStyles: theme.xTickLineStyles && {
				...theme.xTickLineStyles,
				stroke: resolveColor(theme.xTickLineStyles.stroke)
			},
			svgLabelSmall: theme.svgLabelSmall && {
				...theme.svgLabelSmall,
				fill: resolveColor(theme.svgLabelSmall.fill)
			}
		});
	}, [theme, data]);
};
//#endregion
//#region src/hooks/use-chart-data-transform.ts
/**
* Hook that transforms and sorts chart data, handling date parsing and sorting
*
* This hook extracts the common data transformation logic used in both line-chart
* and bar-chart components. It:
* 1. Parses date strings into Date objects using parseAsLocalDate
* 2. Sorts data points by date when date properties are present
* 3. Returns the original data unchanged when no date properties are found
*
* @param {SeriesData[]} data - The raw chart data to transform
* @return {SeriesData[]} The transformed and sorted data
*/
const useChartDataTransform = (data) => {
	return (0, react$1.useMemo)(() => {
		const firstPoint = data?.[0]?.data?.[0];
		if (!(firstPoint && ("date" in firstPoint || "dateString" in firstPoint))) return data;
		return data.map((series) => ({
			...series,
			data: series.data.map((point) => {
				let date;
				if ("date" in point && point.date) date = point.date;
				else if ("dateString" in point && point.dateString) date = parseAsLocalDate(point.dateString);
				return {
					...point,
					date
				};
			}).sort((a, b) => {
				if (!a.date || !b.date) return 0;
				return a.date.getTime() - b.date.getTime();
			})
		}));
	}, [data]);
};
//#endregion
//#region src/hooks/use-chart-margin.tsx
/**
* Base top margin used when no dynamic adjustments are necessary.
*/
const DEFAULT_MARGIN_TOP = 10;
/**
* Base right margin used when no dynamic adjustments are necessary.
*/
const DEFAULT_MARGIN_RIGHT = 20;
/**
* Base bottom margin used for charts with a bottom X-axis.
* This is large enough for typical font sizes and will be increased
* dynamically when tick labels require more space.
*/
const DEFAULT_MARGIN_BOTTOM = 20;
/**
* Base left margin used when no dynamic adjustments are necessary.
*/
const DEFAULT_MARGIN_LEFT = 20;
/**
* Bottom margin to use when the X-axis is rendered at the top.
* We only need a small buffer below the chart in that case.
*/
const DEFAULT_BOTTOM_FOR_TOP_AXIS = 10;
/**
* Fallback font size used when we cannot derive a font size
* from the theme or axis styles for X-axis tick labels.
*/
const DEFAULT_FONT_SIZE = 12;
/**
* Fallback tick length used when tickLength is not provided
* by the theme for either axis.
*/
const DEFAULT_TICK_LENGTH = 8;
/**
* Fallback width used for Y-axis tick labels when we cannot
* measure them via getLongestTickWidth.
*/
const DEFAULT_Y_TICK_WIDTH = 40;
const getXAxisLabelMetrics = (theme, orientation) => {
	const xAxisStyles = orientation === "top" ? theme.axisStyles?.x?.top : theme.axisStyles?.x?.bottom;
	return {
		fontSize: resolveFontSize(xAxisStyles?.axisLabel?.fontSize) || resolveFontSize(theme.svgLabelSmall?.fontSize) || DEFAULT_FONT_SIZE,
		tickLength: xAxisStyles?.tickLength ?? DEFAULT_TICK_LENGTH
	};
};
const useChartMargin = (height, options, data, theme, horizontal = false) => {
	const yTicks = (0, react$1.useMemo)(() => {
		const allDataPoints = data.flatMap((series) => series.data);
		if (horizontal) return allDataPoints.map((d) => d.label || options.axis?.y?.tickFormat(d.date.getTime(), 0, []));
		if (options.axis?.y?.tickValues?.length) return options.axis.y.tickValues;
		const minY = Math.min(...allDataPoints.map((d) => d.value));
		const maxY = Math.max(...allDataPoints.map((d) => d.value));
		return (0, _visx_scale.getTicks)((0, _visx_scale.createScale)({
			...options.yScale,
			domain: [minY, maxY],
			range: [height, 0]
		}), options.axis?.y?.numTicks);
	}, [
		options,
		data,
		height,
		horizontal
	]);
	return (0, react$1.useMemo)(() => {
		const defaultMargin = {
			top: DEFAULT_MARGIN_TOP,
			right: DEFAULT_MARGIN_RIGHT,
			bottom: DEFAULT_MARGIN_BOTTOM,
			left: DEFAULT_MARGIN_LEFT
		};
		const yAxisOrientation = options.axis?.y?.orientation;
		const yAxisStyles = yAxisOrientation === "right" ? theme.axisStyles.y.right : theme.axisStyles.y.left;
		const yTickWidth = getLongestTickWidth(yTicks, options.axis?.y?.tickFormat, yAxisStyles.axisLabel);
		const yTickLabelFontSize = resolveFontSize(yAxisStyles?.tickLabel?.fontSize) || DEFAULT_FONT_SIZE;
		const yMarginValue = (yTickWidth ?? DEFAULT_Y_TICK_WIDTH) + (yAxisStyles?.tickLength ?? 0) + Math.ceil(yTickLabelFontSize * .25);
		if (yAxisOrientation === "right") defaultMargin.right = yMarginValue;
		else defaultMargin.left = yMarginValue;
		const xOrientation = options.axis?.x?.orientation === "top" ? "top" : "bottom";
		const { fontSize, tickLength } = getXAxisLabelMetrics(theme, xOrientation);
		const computedXMargin = fontSize + tickLength;
		if (xOrientation === "top") {
			defaultMargin.top = Math.max(defaultMargin.top, computedXMargin);
			defaultMargin.bottom = DEFAULT_BOTTOM_FOR_TOP_AXIS;
		} else defaultMargin.bottom = Math.max(defaultMargin.bottom, computedXMargin);
		return defaultMargin;
	}, [
		options,
		theme,
		yTicks
	]);
};
//#endregion
//#region src/hooks/use-element-size.ts
/**
* Hook to measure the width and height of a DOM element.
* Returns a ref callback to attach to the element and the current dimensions in pixels.
*
* @param {object} props               - Optional props.
* @param {number} props.initialWidth  - The initial width to use.
* @param {number} props.initialHeight - The initial height to use.
*
* @return {[Function, number, number]} A tuple containing a ref callback, width, and height in pixels
*/
function useElementSize({ initialWidth = 0, initialHeight = 0 } = {}) {
	const [width, setWidth] = (0, react$1.useState)(initialWidth);
	const [height, setHeight] = (0, react$1.useState)(initialHeight);
	const observerRef = (0, react$1.useRef)(null);
	return [
		(0, react$1.useCallback)((node) => {
			if (observerRef.current) {
				observerRef.current.disconnect();
				observerRef.current = null;
			}
			if (node) {
				const handleResize = () => {
					const rect = node.getBoundingClientRect();
					setWidth(rect.width || 0);
					setHeight(rect.height || 0);
				};
				handleResize();
				const resizeObserver = new ResizeObserver(handleResize);
				resizeObserver.observe(node);
				observerRef.current = resizeObserver;
			}
		}, []),
		width,
		height
	];
}
//#endregion
//#region src/hooks/use-text-truncation.ts
/**
* Hook to detect if text content is truncated within its container.
* Uses ResizeObserver to dynamically track changes in element size.
*
* @param enabled - Whether truncation detection should be active. Defaults to true.
* @return A tuple containing:
* - [0] refCallback: Function to attach to the text element as a ref
* - [1] isTruncated: Boolean indicating if the text is currently truncated
*
* @example
* ```tsx
* const [textRef, isTruncated] = useTextTruncation(true);
*
* return (
*   <span ref={textRef} title={isTruncated ? fullText : undefined}>
*     {text}
*   </span>
* );
* ```
*/
function useTextTruncation(enabled = true) {
	const [isTruncated, setIsTruncated] = (0, react$1.useState)(false);
	const observerRef = (0, react$1.useRef)(null);
	return [(0, react$1.useCallback)((node) => {
		if (observerRef.current) {
			observerRef.current.disconnect();
			observerRef.current = null;
		}
		if (node && enabled) {
			const checkTruncation = () => {
				const truncated = node.scrollWidth > node.clientWidth;
				setIsTruncated(truncated);
			};
			checkTruncation();
			const resizeObserver = new ResizeObserver(checkTruncation);
			resizeObserver.observe(node);
			observerRef.current = resizeObserver;
		} else setIsTruncated(false);
	}, [enabled]), isTruncated];
}
//#endregion
//#region src/hooks/use-zero-value-display.ts
/**
* Minimum pixel size for near-zero bars (non-zero values that would render too small).
* Using 3px to be visible but not misleading - larger values might look like actual data.
*/
const MIN_PIXEL_SIZE = 3;
/**
* Pixel size for zero-value bars (1px less than near-zero to be visually distinguishable).
*/
const ZERO_PIXEL_SIZE = MIN_PIXEL_SIZE - 1;
const useZeroValueDisplay = (data, options = { enabled: false }) => {
	const { enabled, valueAxisLength } = options;
	return (0, react$1.useMemo)(() => {
		if (!enabled || !valueAxisLength || valueAxisLength <= 0) return data;
		let maxAbsoluteValue = 0;
		for (const series of data) for (const point of series.data) if (point.value !== null && point.value !== 0) maxAbsoluteValue = Math.max(maxAbsoluteValue, Math.abs(point.value));
		if (maxAbsoluteValue === 0) return data;
		const minNonZeroValue = Math.min(MIN_PIXEL_SIZE / valueAxisLength * maxAbsoluteValue, maxAbsoluteValue);
		const zeroVisualValue = Math.min(ZERO_PIXEL_SIZE / valueAxisLength * maxAbsoluteValue, maxAbsoluteValue);
		return data.map((series) => ({
			...series,
			data: series.data.map((point) => {
				if (point.value === 0) return {
					...point,
					visualValue: zeroVisualValue
				};
				if (point.value === null) return point;
				if (Math.abs(point.value) < minNonZeroValue) return {
					...point,
					visualValue: Math.sign(point.value) * minNonZeroValue
				};
				return point;
			})
		}));
	}, [
		data,
		enabled,
		valueAxisLength
	]);
};
//#endregion
//#region src/hooks/use-data-with-percentages.ts
/**
* Hook to calculate percentages from values for chart data.
* Ensures percentages are always derived from values (single source of truth).
*
* @param data - Array of data points with values
* @return Data with calculated percentages
*/
const useDataWithPercentages = (data) => {
	return (0, react$1.useMemo)(() => {
		const totalValue = data.reduce((sum, segment) => sum + segment.value, 0);
		return data.map((segment) => ({
			...segment,
			percentage: totalValue > 0 ? segment.value / totalValue * 100 : 0
		}));
	}, [data]);
};
//#endregion
//#region src/hooks/use-interactive-legend-data.ts
/**
* Custom hook to filter and recalculate chart data for interactive legends.
*
* When interactive legends are enabled, this hook:
* 1. Filters data to show only visible series based on legend selection
* 2. Recalculates percentages so visible segments total 100%
* 3. Tracks whether all segments are hidden to show empty state
*
* This is particularly useful for pie charts, donut charts, and semi-circle charts
* where segment visibility and percentages need to be dynamically adjusted.
*
* @example
* ```tsx
* const { visibleData, allSegmentsHidden, legendData } = useInteractiveLegendData({
*   data: chartData,
*   chartId: 'my-pie-chart',
*   legendInteractive: true,
*   isSeriesVisible: (id, label) => context.isSeriesVisible(id, label),
* });
*
* // Use legendData for creating legend items (shows recalculated percentages)
* const legendItems = useChartLegendItems(legendData, legendOptions);
*
* if (allSegmentsHidden) {
*   return <EmptyState />;
* }
*
* // Use visibleData for rendering the chart (only visible segments)
* return <PieChart data={visibleData} />;
* ```
*
* @param params                   - Configuration object for the hook
* @param params.data              - The chart data to filter
* @param params.chartId           - Unique identifier for the chart (required for interactive mode)
* @param params.legendInteractive - Whether to enable interactive filtering
* @param params.isSeriesVisible   - Function to check series visibility
* @return Object containing visibleData, allSegmentsHidden flag, and legendData with recalculated percentages
*/
const useInteractiveLegendData = ({ data, chartId, legendInteractive, isSeriesVisible }) => {
	const visibleData = (0, react$1.useMemo)(() => {
		if (!chartId || !legendInteractive) return data;
		const filtered = data.filter((segment) => isSeriesVisible(chartId, segment.label));
		if (filtered.length === 0) return [];
		const totalValue = filtered.reduce((sum, segment) => sum + segment.value, 0);
		return filtered.map((segment) => ({
			...segment,
			percentage: totalValue > 0 ? segment.value / totalValue * 100 : 0
		}));
	}, [
		data,
		chartId,
		isSeriesVisible,
		legendInteractive
	]);
	return {
		visibleData,
		allSegmentsHidden: (0, react$1.useMemo)(() => {
			return legendInteractive && visibleData.length === 0;
		}, [legendInteractive, visibleData]),
		legendData: (0, react$1.useMemo)(() => {
			if (!legendInteractive || !chartId) return data;
			const visibleDataMap = new Map(visibleData.map((d) => [d.label, d]));
			return data.map((segment) => {
				if (!isSeriesVisible(chartId, segment.label)) return segment;
				return visibleDataMap.get(segment.label) || segment;
			});
		}, [
			data,
			visibleData,
			legendInteractive,
			chartId,
			isSeriesVisible
		])
	};
};
//#endregion
//#region src/hooks/use-prefers-reduced-motion.ts
const QUERY = "(prefers-reduced-motion: no-preference)";
const getInitialState = () => !window.matchMedia(QUERY).matches;
/**
* Custom hook to determine if the user prefers reduced motion.
* @return {boolean} A boolean indicating the user's preference for reduced motion.
*/
function usePrefersReducedMotion() {
	const [prefersReducedMotion, setPrefersReducedMotion] = (0, react$1.useState)(getInitialState);
	(0, react$1.useEffect)(() => {
		const mediaQueryList = window.matchMedia(QUERY);
		const listener = (event) => {
			setPrefersReducedMotion(!event.matches);
		};
		mediaQueryList.addEventListener("change", listener);
		return () => {
			mediaQueryList.removeEventListener("change", listener);
		};
	}, []);
	return prefersReducedMotion;
}
//#endregion
//#region src/providers/chart-context/hooks/use-chart-registration.ts
const useChartRegistration = ({ chartId, legendItems, chartType, isDataValid, metadata }) => {
	const { registerChart, unregisterChart } = useGlobalChartsContext();
	const stableLegendItems = useDeepMemo(legendItems);
	const memoizedMetadata = (0, react$1.useMemo)(() => metadata, [metadata]);
	(0, react$1.useEffect)(() => {
		if (isDataValid) registerChart(chartId, {
			legendItems: stableLegendItems,
			chartType,
			metadata: memoizedMetadata
		});
		return () => {
			unregisterChart(chartId);
		};
	}, [
		chartId,
		stableLegendItems,
		chartType,
		memoizedMetadata,
		isDataValid
	]);
};
//#endregion
//#region src/providers/chart-context/hooks/use-global-charts-theme.ts
/**
* Hook to get the global chart theme from GlobalChartsProvider
*
* @return The global chart theme
*/
const useGlobalChartsTheme = () => {
	return (0, react$1.useContext)(GlobalChartsContext)?.theme ?? defaultTheme;
};
//#endregion
//#region ../../../node_modules/.pnpm/is-plain-object@5.0.0/node_modules/is-plain-object/dist/is-plain-object.mjs
/*!
* is-plain-object <https://github.com/jonschlinkert/is-plain-object>
*
* Copyright (c) 2014-2017, Jon Schlinkert.
* Released under the MIT License.
*/
function isObject(o) {
	return Object.prototype.toString.call(o) === "[object Object]";
}
function isPlainObject(o) {
	var ctor, prot;
	if (isObject(o) === false) return false;
	ctor = o.constructor;
	if (ctor === void 0) return true;
	prot = ctor.prototype;
	if (isObject(prot) === false) return false;
	if (prot.hasOwnProperty("isPrototypeOf") === false) return false;
	return true;
}
//#endregion
//#region ../../../node_modules/.pnpm/lower-case@2.0.2/node_modules/lower-case/dist/index.js
var require_dist$14 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.lowerCase = exports.localeLowerCase = void 0;
	/**
	* Source: ftp://ftp.unicode.org/Public/UCD/latest/ucd/SpecialCasing.txt
	*/
	var SUPPORTED_LOCALE = {
		tr: {
			regexp: /\u0130|\u0049|\u0049\u0307/g,
			map: {
				İ: "i",
				I: "ı",
				İ: "i"
			}
		},
		az: {
			regexp: /\u0130/g,
			map: {
				İ: "i",
				I: "ı",
				İ: "i"
			}
		},
		lt: {
			regexp: /\u0049|\u004A|\u012E|\u00CC|\u00CD|\u0128/g,
			map: {
				I: "i̇",
				J: "j̇",
				Į: "į̇",
				Ì: "i̇̀",
				Í: "i̇́",
				Ĩ: "i̇̃"
			}
		}
	};
	/**
	* Localized lower case.
	*/
	function localeLowerCase(str, locale) {
		var lang = SUPPORTED_LOCALE[locale.toLowerCase()];
		if (lang) return lowerCase(str.replace(lang.regexp, function(m) {
			return lang.map[m];
		}));
		return lowerCase(str);
	}
	exports.localeLowerCase = localeLowerCase;
	/**
	* Lower case as a function.
	*/
	function lowerCase(str) {
		return str.toLowerCase();
	}
	exports.lowerCase = lowerCase;
}));
//#endregion
//#region ../../../node_modules/.pnpm/no-case@3.0.4/node_modules/no-case/dist/index.js
var require_dist$13 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.noCase = void 0;
	var lower_case_1 = require_dist$14();
	var DEFAULT_SPLIT_REGEXP = [/([a-z0-9])([A-Z])/g, /([A-Z])([A-Z][a-z])/g];
	var DEFAULT_STRIP_REGEXP = /[^A-Z0-9]+/gi;
	/**
	* Normalize the string into something other libraries can manipulate easier.
	*/
	function noCase(input, options) {
		if (options === void 0) options = {};
		var _a = options.splitRegexp, splitRegexp = _a === void 0 ? DEFAULT_SPLIT_REGEXP : _a, _b = options.stripRegexp, stripRegexp = _b === void 0 ? DEFAULT_STRIP_REGEXP : _b, _c = options.transform, transform = _c === void 0 ? lower_case_1.lowerCase : _c, _d = options.delimiter, delimiter = _d === void 0 ? " " : _d;
		var result = replace(replace(input, splitRegexp, "$1\0$2"), stripRegexp, "\0");
		var start = 0;
		var end = result.length;
		while (result.charAt(start) === "\0") start++;
		while (result.charAt(end - 1) === "\0") end--;
		return result.slice(start, end).split("\0").map(transform).join(delimiter);
	}
	exports.noCase = noCase;
	/**
	* Replace `re` in the input string with the replacement value.
	*/
	function replace(input, re, value) {
		if (re instanceof RegExp) return input.replace(re, value);
		return re.reduce(function(input, re) {
			return input.replace(re, value);
		}, input);
	}
}));
//#endregion
//#region ../../../node_modules/.pnpm/pascal-case@3.1.2/node_modules/pascal-case/dist/index.js
var require_dist$12 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.pascalCase = exports.pascalCaseTransformMerge = exports.pascalCaseTransform = void 0;
	var tslib_1$10 = require("tslib");
	var no_case_1 = require_dist$13();
	function pascalCaseTransform(input, index) {
		var firstChar = input.charAt(0);
		var lowerChars = input.substr(1).toLowerCase();
		if (index > 0 && firstChar >= "0" && firstChar <= "9") return "_" + firstChar + lowerChars;
		return "" + firstChar.toUpperCase() + lowerChars;
	}
	exports.pascalCaseTransform = pascalCaseTransform;
	function pascalCaseTransformMerge(input) {
		return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
	}
	exports.pascalCaseTransformMerge = pascalCaseTransformMerge;
	function pascalCase(input, options) {
		if (options === void 0) options = {};
		return no_case_1.noCase(input, tslib_1$10.__assign({
			delimiter: "",
			transform: pascalCaseTransform
		}, options));
	}
	exports.pascalCase = pascalCase;
}));
//#endregion
//#region ../../../node_modules/.pnpm/camel-case@4.1.2/node_modules/camel-case/dist/index.js
var require_dist$11 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.camelCase = exports.camelCaseTransformMerge = exports.camelCaseTransform = void 0;
	var tslib_1$9 = require("tslib");
	var pascal_case_1 = require_dist$12();
	function camelCaseTransform(input, index) {
		if (index === 0) return input.toLowerCase();
		return pascal_case_1.pascalCaseTransform(input, index);
	}
	exports.camelCaseTransform = camelCaseTransform;
	function camelCaseTransformMerge(input, index) {
		if (index === 0) return input.toLowerCase();
		return pascal_case_1.pascalCaseTransformMerge(input);
	}
	exports.camelCaseTransformMerge = camelCaseTransformMerge;
	function camelCase(input, options) {
		if (options === void 0) options = {};
		return pascal_case_1.pascalCase(input, tslib_1$9.__assign({ transform: camelCaseTransform }, options));
	}
	exports.camelCase = camelCase;
}));
//#endregion
//#region ../../../node_modules/.pnpm/upper-case-first@2.0.2/node_modules/upper-case-first/dist/index.js
var require_dist$10 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.upperCaseFirst = void 0;
	/**
	* Upper case the first character of an input string.
	*/
	function upperCaseFirst(input) {
		return input.charAt(0).toUpperCase() + input.substr(1);
	}
	exports.upperCaseFirst = upperCaseFirst;
}));
//#endregion
//#region ../../../node_modules/.pnpm/capital-case@1.0.4/node_modules/capital-case/dist/index.js
var require_dist$9 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.capitalCase = exports.capitalCaseTransform = void 0;
	var tslib_1$8 = require("tslib");
	var no_case_1 = require_dist$13();
	var upper_case_first_1 = require_dist$10();
	function capitalCaseTransform(input) {
		return upper_case_first_1.upperCaseFirst(input.toLowerCase());
	}
	exports.capitalCaseTransform = capitalCaseTransform;
	function capitalCase(input, options) {
		if (options === void 0) options = {};
		return no_case_1.noCase(input, tslib_1$8.__assign({
			delimiter: " ",
			transform: capitalCaseTransform
		}, options));
	}
	exports.capitalCase = capitalCase;
}));
//#endregion
//#region ../../../node_modules/.pnpm/upper-case@2.0.2/node_modules/upper-case/dist/index.js
var require_dist$8 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.upperCase = exports.localeUpperCase = void 0;
	/**
	* Source: ftp://ftp.unicode.org/Public/UCD/latest/ucd/SpecialCasing.txt
	*/
	var SUPPORTED_LOCALE = {
		tr: {
			regexp: /[\u0069]/g,
			map: { i: "İ" }
		},
		az: {
			regexp: /[\u0069]/g,
			map: { i: "İ" }
		},
		lt: {
			regexp: /[\u0069\u006A\u012F]\u0307|\u0069\u0307[\u0300\u0301\u0303]/g,
			map: {
				i̇: "I",
				j̇: "J",
				į̇: "Į",
				i̇̀: "Ì",
				i̇́: "Í",
				i̇̃: "Ĩ"
			}
		}
	};
	/**
	* Localized upper case.
	*/
	function localeUpperCase(str, locale) {
		var lang = SUPPORTED_LOCALE[locale.toLowerCase()];
		if (lang) return upperCase(str.replace(lang.regexp, function(m) {
			return lang.map[m];
		}));
		return upperCase(str);
	}
	exports.localeUpperCase = localeUpperCase;
	/**
	* Upper case as a function.
	*/
	function upperCase(str) {
		return str.toUpperCase();
	}
	exports.upperCase = upperCase;
}));
//#endregion
//#region ../../../node_modules/.pnpm/constant-case@3.0.4/node_modules/constant-case/dist/index.js
var require_dist$7 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.constantCase = void 0;
	var tslib_1$7 = require("tslib");
	var no_case_1 = require_dist$13();
	var upper_case_1 = require_dist$8();
	function constantCase(input, options) {
		if (options === void 0) options = {};
		return no_case_1.noCase(input, tslib_1$7.__assign({
			delimiter: "_",
			transform: upper_case_1.upperCase
		}, options));
	}
	exports.constantCase = constantCase;
}));
//#endregion
//#region ../../../node_modules/.pnpm/dot-case@3.0.4/node_modules/dot-case/dist/index.js
var require_dist$6 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.dotCase = void 0;
	var tslib_1$6 = require("tslib");
	var no_case_1 = require_dist$13();
	function dotCase(input, options) {
		if (options === void 0) options = {};
		return no_case_1.noCase(input, tslib_1$6.__assign({ delimiter: "." }, options));
	}
	exports.dotCase = dotCase;
}));
//#endregion
//#region ../../../node_modules/.pnpm/header-case@2.0.4/node_modules/header-case/dist/index.js
var require_dist$5 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.headerCase = void 0;
	var tslib_1$5 = require("tslib");
	var capital_case_1 = require_dist$9();
	function headerCase(input, options) {
		if (options === void 0) options = {};
		return capital_case_1.capitalCase(input, tslib_1$5.__assign({ delimiter: "-" }, options));
	}
	exports.headerCase = headerCase;
}));
//#endregion
//#region ../../../node_modules/.pnpm/param-case@3.0.4/node_modules/param-case/dist/index.js
var require_dist$4 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.paramCase = void 0;
	var tslib_1$4 = require("tslib");
	var dot_case_1 = require_dist$6();
	function paramCase(input, options) {
		if (options === void 0) options = {};
		return dot_case_1.dotCase(input, tslib_1$4.__assign({ delimiter: "-" }, options));
	}
	exports.paramCase = paramCase;
}));
//#endregion
//#region ../../../node_modules/.pnpm/path-case@3.0.4/node_modules/path-case/dist/index.js
var require_dist$3 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.pathCase = void 0;
	var tslib_1$3 = require("tslib");
	var dot_case_1 = require_dist$6();
	function pathCase(input, options) {
		if (options === void 0) options = {};
		return dot_case_1.dotCase(input, tslib_1$3.__assign({ delimiter: "/" }, options));
	}
	exports.pathCase = pathCase;
}));
//#endregion
//#region ../../../node_modules/.pnpm/sentence-case@3.0.4/node_modules/sentence-case/dist/index.js
var require_dist$2 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.sentenceCase = exports.sentenceCaseTransform = void 0;
	var tslib_1$2 = require("tslib");
	var no_case_1 = require_dist$13();
	var upper_case_first_1 = require_dist$10();
	function sentenceCaseTransform(input, index) {
		var result = input.toLowerCase();
		if (index === 0) return upper_case_first_1.upperCaseFirst(result);
		return result;
	}
	exports.sentenceCaseTransform = sentenceCaseTransform;
	function sentenceCase(input, options) {
		if (options === void 0) options = {};
		return no_case_1.noCase(input, tslib_1$2.__assign({
			delimiter: " ",
			transform: sentenceCaseTransform
		}, options));
	}
	exports.sentenceCase = sentenceCase;
}));
//#endregion
//#region ../../../node_modules/.pnpm/snake-case@3.0.4/node_modules/snake-case/dist/index.js
var require_dist$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.snakeCase = void 0;
	var tslib_1$1 = require("tslib");
	var dot_case_1 = require_dist$6();
	function snakeCase(input, options) {
		if (options === void 0) options = {};
		return dot_case_1.dotCase(input, tslib_1$1.__assign({ delimiter: "_" }, options));
	}
	exports.snakeCase = snakeCase;
}));
//#endregion
//#region ../../../node_modules/.pnpm/change-case@4.1.2/node_modules/change-case/dist/index.js
var require_dist = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	var tslib_1 = require("tslib");
	tslib_1.__exportStar(require_dist$11(), exports);
	tslib_1.__exportStar(require_dist$9(), exports);
	tslib_1.__exportStar(require_dist$7(), exports);
	tslib_1.__exportStar(require_dist$6(), exports);
	tslib_1.__exportStar(require_dist$5(), exports);
	tslib_1.__exportStar(require_dist$13(), exports);
	tslib_1.__exportStar(require_dist$4(), exports);
	tslib_1.__exportStar(require_dist$12(), exports);
	tslib_1.__exportStar(require_dist$3(), exports);
	tslib_1.__exportStar(require_dist$2(), exports);
	tslib_1.__exportStar(require_dist$1(), exports);
}));
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/error.mjs
let set$1;
if (process.env.NODE_ENV !== "production") set$1 = /* @__PURE__ */ new Set();
function error(...messages) {
	if (process.env.NODE_ENV !== "production") {
		const messageKey = messages.join(" ");
		if (!set$1.has(messageKey)) {
			set$1.add(messageKey);
			console.error(`Base UI: ${messageKey}`);
		}
	}
}
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/safeReact.mjs
/**
* A clone of the React namespace for reading APIs that may be missing in older
* supported React versions. Bundlers can rewrite direct `React.someNewApi`
* reads into named imports, which breaks React 17. Reading from this cloned
* object keeps those lookups optional.
*
* @see https://github.com/mui/material-ui/issues/41190#issuecomment-2040873379
*/
const SafeReact = { ...react$1 };
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/useRefWithInit.mjs
const UNINITIALIZED = {};
/**
* A React.useRef() that is initialized with a function. Note that it accepts an optional
* initialization argument, so the initialization function doesn't need to be an inline closure.
*
* @usage
*   const ref = useRefWithInit(sortColumns, columns)
*/
function useRefWithInit(init, initArg) {
	const ref = react$1.useRef(UNINITIALIZED);
	if (ref.current === UNINITIALIZED) ref.current = init(initArg);
	return ref;
}
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/useStableCallback.mjs
const useInsertionEffect$1 = SafeReact.useInsertionEffect;
const useSafeInsertionEffect = useInsertionEffect$1 && useInsertionEffect$1 !== SafeReact.useLayoutEffect ? useInsertionEffect$1 : (fn) => fn();
/**
* Stabilizes the function passed so it's always the same between renders.
*
* The function becomes non-reactive to any values it captures.
* It can safely be passed as a dependency of `React.useMemo` and `React.useEffect` without re-triggering them if its captured values change.
*
* The function must only be called inside effects and event handlers, never during render (which throws an error).
*
* This hook is a more permissive version of React 19.2's `React.useEffectEvent` in that it can be passed through contexts and called in event handler props, not just effects.
*/
function useStableCallback(callback) {
	const stable = useRefWithInit(createStableCallback).current;
	stable.next = callback;
	useSafeInsertionEffect(stable.effect);
	return stable.trampoline;
}
function createStableCallback() {
	const stable = {
		next: void 0,
		callback: assertNotCalled,
		trampoline: (...args) => stable.callback?.(...args),
		effect: () => {
			stable.callback = stable.next;
		}
	};
	return stable;
}
function assertNotCalled() {
	if (process.env.NODE_ENV !== "production") throw new Error("Base UI: Cannot call an event handler while rendering.");
}
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/useIsoLayoutEffect.mjs
const noop = () => {};
const useIsoLayoutEffect = typeof document !== "undefined" ? react$1.useLayoutEffect : noop;
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/warn.mjs
let set;
if (process.env.NODE_ENV !== "production") set = /* @__PURE__ */ new Set();
function warn(...messages) {
	if (process.env.NODE_ENV !== "production") {
		const messageKey = messages.join(" ");
		if (!set.has(messageKey)) {
			set.add(messageKey);
			console.warn(`Base UI: ${messageKey}`);
		}
	}
}
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/internals/direction-context/DirectionContext.mjs
/**
* @internal
*/
const DirectionContext = /*#__PURE__*/ react$1.createContext(void 0);
if (process.env.NODE_ENV !== "production") DirectionContext.displayName = "DirectionContext";
function useDirection() {
	return react$1.useContext(DirectionContext)?.direction ?? "ltr";
}
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/formatErrorMessage.mjs
/**
* Creates a formatErrorMessage function with a custom URL and prefix.
* @param baseUrl - The base URL for the error page (e.g., 'https://base-ui.com/production-error')
* @param prefix - The prefix for the error message (e.g., 'Base UI')
* @returns A function that formats error messages with the given URL and prefix
*/
function createFormatErrorMessage(baseUrl, prefix) {
	return function formatErrorMessage(code, ...args) {
		const url = new URL(baseUrl);
		url.searchParams.set("code", code.toString());
		args.forEach((arg) => url.searchParams.append("args[]", arg));
		return `${prefix} error #${code}; visit ${url} for the full message.`;
	};
}
/**
* WARNING: Don't import this directly. It's imported by the code generated by
* `@mui/internal-babel-plugin-minify-errors`. Make sure to always use string literals in `Error`
* constructors to ensure the plugin works as expected. Supported patterns include:
*   throw new Error('My message');
*   throw new Error(`My message: ${foo}`);
*   throw new Error(`My message: ${foo}` + 'another string');
*   ...
*/
const formatErrorMessage = createFormatErrorMessage("https://base-ui.com/production-error", "Base UI");
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/useMergedRefs.mjs
/**
* Merges refs into a single memoized callback ref or `null`.
* This makes sure multiple refs are updated together and have the same value.
*
* This function accepts up to four refs. If you need to merge more, or have an unspecified number of refs to merge,
* use `useMergedRefsN` instead.
*/
function useMergedRefs(a, b, c, d) {
	const forkRef = useRefWithInit(createForkRef).current;
	if (didChange(forkRef, a, b, c, d)) update(forkRef, [
		a,
		b,
		c,
		d
	]);
	return forkRef.callback;
}
/**
* Merges an array of refs into a single memoized callback ref or `null`.
*
* If you need to merge a fixed number (up to four) of refs, use `useMergedRefs` instead for better performance.
*/
function useMergedRefsN(refs) {
	const forkRef = useRefWithInit(createForkRef).current;
	if (didChangeN(forkRef, refs)) update(forkRef, refs);
	return forkRef.callback;
}
function createForkRef() {
	return {
		callback: null,
		cleanup: null,
		refs: []
	};
}
function didChange(forkRef, a, b, c, d) {
	return forkRef.refs[0] !== a || forkRef.refs[1] !== b || forkRef.refs[2] !== c || forkRef.refs[3] !== d;
}
function didChangeN(forkRef, newRefs) {
	return forkRef.refs.length !== newRefs.length || forkRef.refs.some((ref, index) => ref !== newRefs[index]);
}
function update(forkRef, refs) {
	forkRef.refs = refs;
	if (refs.every((ref) => ref == null)) {
		forkRef.callback = null;
		return;
	}
	forkRef.callback = (instance) => {
		if (forkRef.cleanup) {
			forkRef.cleanup();
			forkRef.cleanup = null;
		}
		if (instance != null) {
			const cleanupCallbacks = Array(refs.length).fill(null);
			for (let i = 0; i < refs.length; i += 1) {
				const ref = refs[i];
				if (ref == null) continue;
				switch (typeof ref) {
					case "function": {
						const refCleanup = ref(instance);
						if (typeof refCleanup === "function") cleanupCallbacks[i] = refCleanup;
						break;
					}
					case "object":
						ref.current = instance;
						break;
					default:
				}
			}
			forkRef.cleanup = () => {
				for (let i = 0; i < refs.length; i += 1) {
					const ref = refs[i];
					if (ref == null) continue;
					switch (typeof ref) {
						case "function": {
							const cleanupCallback = cleanupCallbacks[i];
							if (typeof cleanupCallback === "function") cleanupCallback();
							else ref(null);
							break;
						}
						case "object":
							ref.current = null;
							break;
						default:
					}
				}
			};
		}
	};
}
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/reactVersion.mjs
const majorVersion = parseInt(react$1.version, 10);
function isReactVersionAtLeast(reactVersionToCheck) {
	return majorVersion >= reactVersionToCheck;
}
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/getReactElementRef.mjs
/**
* Extracts the `ref` from a React element, handling different React versions.
*/
function getReactElementRef(element) {
	if (!/*#__PURE__*/ react$1.isValidElement(element)) return null;
	const reactElement = element;
	const propsWithRef = reactElement.props;
	return (isReactVersionAtLeast(19) ? propsWithRef?.ref : reactElement.ref) ?? null;
}
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/mergeObjects.mjs
function mergeObjects(a, b) {
	if (a && !b) return a;
	if (!a && b) return b;
	if (a || b) return {
		...a,
		...b
	};
}
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/empty.mjs
function NOOP() {}
Object.freeze([]);
const EMPTY_OBJECT = Object.freeze({});
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/internals/getStateAttributesProps.mjs
function getStateAttributesProps(state, customMapping) {
	const props = {};
	for (const key in state) {
		const value = state[key];
		if (customMapping?.hasOwnProperty(key)) {
			const customProps = customMapping[key](value);
			if (customProps != null) Object.assign(props, customProps);
			continue;
		}
		if (value === true) props[`data-${key.toLowerCase()}`] = "";
		else if (value) props[`data-${key.toLowerCase()}`] = value.toString();
	}
	return props;
}
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/utils/resolveClassName.mjs
/**
* If the provided className is a string, it will be returned as is.
* Otherwise, the function will call the className function with the state as the first argument.
*
* @param className
* @param state
*/
function resolveClassName(className, state) {
	return typeof className === "function" ? className(state) : className;
}
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/utils/resolveStyle.mjs
/**
* If the provided style is an object, it will be returned as is.
* Otherwise, the function will call the style function with the state as the first argument.
*
* @param style
* @param state
*/
function resolveStyle(style, state) {
	return typeof style === "function" ? style(state) : style;
}
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/merge-props/mergeProps.mjs
const EMPTY_PROPS = {};
/**
* Merges multiple sets of React props. It follows the Object.assign pattern where the rightmost object's fields overwrite
* the conflicting ones from others. This doesn't apply to event handlers, `className` and `style` props.
*
* Event handlers are merged and called in right-to-left order (rightmost handler executes first, leftmost last).
* For React synthetic events, the rightmost handler can prevent prior (left-positioned) handlers from executing
* by calling `event.preventBaseUIHandler()`. For non-synthetic events (custom events with primitive/object values),
* all handlers always execute without prevention capability.
*
* The `className` prop is merged by concatenating classes in right-to-left order (rightmost class appears first in the string).
* The `style` prop is merged with rightmost styles overwriting the prior ones.
*
* Props can either be provided as objects or as functions that take the previous props as an argument.
* The function will receive the merged props up to that point (going from left to right):
* so in the case of `(obj1, obj2, fn, obj3)`, `fn` will receive the merged props of `obj1` and `obj2`.
* The function is responsible for chaining event handlers if needed (that is, we don't run the merge logic).
*
* Event handlers returned by the functions are not automatically prevented when `preventBaseUIHandler` is called.
* They must check `event.baseUIHandlerPrevented` themselves and bail out if it's true.
*
* @important **`ref` is not merged.**
* @param a Props object to merge.
* @param b Props object to merge. The function will overwrite conflicting props from `a`.
* @param c Props object to merge. The function will overwrite conflicting props from previous parameters.
* @param d Props object to merge. The function will overwrite conflicting props from previous parameters.
* @param e Props object to merge. The function will overwrite conflicting props from previous parameters.
* @returns The merged props.
* @public
*/
function mergeProps(a, b, c, d, e) {
	if (!c && !d && !e && !a) return createInitialMergedProps(b);
	let merged = createInitialMergedProps(a);
	if (b) merged = mergeInto(merged, b);
	if (c) merged = mergeInto(merged, c);
	if (d) merged = mergeInto(merged, d);
	if (e) merged = mergeInto(merged, e);
	return merged;
}
/**
* Merges an arbitrary number of React props using the same logic as {@link mergeProps}.
* This function accepts an array of props instead of individual arguments.
*
* This has slightly lower performance than {@link mergeProps} due to accepting an array
* instead of a fixed number of arguments. Prefer {@link mergeProps} when merging 5 or
* fewer prop sets for better performance.
*
* @param props Array of props to merge.
* @returns The merged props.
* @see mergeProps
* @public
*/
function mergePropsN(props) {
	if (props.length === 0) return EMPTY_PROPS;
	if (props.length === 1) return createInitialMergedProps(props[0]);
	let merged = createInitialMergedProps(props[0]);
	for (let i = 1; i < props.length; i += 1) merged = mergeInto(merged, props[i]);
	return merged;
}
function createInitialMergedProps(inputProps) {
	if (isPropsGetter(inputProps)) return { ...resolvePropsGetter(inputProps, EMPTY_PROPS) };
	return copyInitialProps(inputProps);
}
function mergeInto(merged, inputProps) {
	if (isPropsGetter(inputProps)) return resolvePropsGetter(inputProps, merged);
	return mutablyMergeInto(merged, inputProps);
}
function copyInitialProps(inputProps) {
	const copiedProps = { ...inputProps };
	for (const propName in copiedProps) {
		const propValue = copiedProps[propName];
		if (isEventHandler(propName, propValue)) copiedProps[propName] = wrapEventHandler(propValue);
	}
	return copiedProps;
}
/**
* Merges two sets of props. In case of conflicts, the external props take precedence.
*/
function mutablyMergeInto(mergedProps, externalProps) {
	if (!externalProps) return mergedProps;
	for (const propName in externalProps) {
		const externalPropValue = externalProps[propName];
		switch (propName) {
			case "style":
				mergedProps[propName] = mergeObjects(mergedProps.style, externalPropValue);
				break;
			case "className":
				mergedProps[propName] = mergeClassNames(mergedProps.className, externalPropValue);
				break;
			default: if (isEventHandler(propName, externalPropValue)) mergedProps[propName] = mergeEventHandlers(mergedProps[propName], externalPropValue);
			else mergedProps[propName] = externalPropValue;
		}
	}
	return mergedProps;
}
function isEventHandler(key, value) {
	const code0 = key.charCodeAt(0);
	const code1 = key.charCodeAt(1);
	const code2 = key.charCodeAt(2);
	return code0 === 111 && code1 === 110 && code2 >= 65 && code2 <= 90 && (typeof value === "function" || typeof value === "undefined");
}
function isPropsGetter(inputProps) {
	return typeof inputProps === "function";
}
function resolvePropsGetter(inputProps, previousProps) {
	if (isPropsGetter(inputProps)) return inputProps(previousProps);
	return inputProps ?? EMPTY_PROPS;
}
function mergeEventHandlers(ourHandler, theirHandler) {
	if (!theirHandler) return ourHandler;
	if (!ourHandler) return wrapEventHandler(theirHandler);
	return (...args) => {
		const event = args[0];
		if (isSyntheticEvent(event)) {
			const baseUIEvent = event;
			makeEventPreventable(baseUIEvent);
			const result = theirHandler(...args);
			if (!baseUIEvent.baseUIHandlerPrevented) ourHandler?.(...args);
			return result;
		}
		const result = theirHandler(...args);
		ourHandler?.(...args);
		return result;
	};
}
function wrapEventHandler(handler) {
	if (!handler) return handler;
	return (...args) => {
		const event = args[0];
		if (isSyntheticEvent(event)) makeEventPreventable(event);
		return handler(...args);
	};
}
function makeEventPreventable(event) {
	event.preventBaseUIHandler = () => {
		event.baseUIHandlerPrevented = true;
	};
	return event;
}
function mergeClassNames(ourClassName, theirClassName) {
	if (theirClassName) {
		if (ourClassName) return theirClassName + " " + ourClassName;
		return theirClassName;
	}
	return ourClassName;
}
function isSyntheticEvent(event) {
	return event != null && typeof event === "object" && "nativeEvent" in event;
}
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/internals/useRenderElement.mjs
/**
* Renders a Base UI element.
*
* @param element The default HTML element to render. Can be overridden by the `render` prop.
* @param componentProps An object containing the `render` and `className` props to be used for element customization. Other props are ignored.
* @param params Additional parameters for rendering the element.
*/
function useRenderElement(element, componentProps, params = {}) {
	const renderProp = componentProps.render;
	const outProps = useRenderElementProps(componentProps, params);
	if (params.enabled === false) return null;
	return evaluateRenderProp(element, renderProp, outProps, params.state ?? EMPTY_OBJECT);
}
/**
* Computes render element final props.
*/
function useRenderElementProps(componentProps, params = {}) {
	const { className: classNameProp, style: styleProp, render: renderProp } = componentProps;
	const { state = EMPTY_OBJECT, ref, props, stateAttributesMapping, enabled = true } = params;
	const className = enabled ? resolveClassName(classNameProp, state) : void 0;
	const style = enabled ? resolveStyle(styleProp, state) : void 0;
	const stateProps = enabled ? getStateAttributesProps(state, stateAttributesMapping) : EMPTY_OBJECT;
	const resolvedProps = enabled && props ? resolveRenderFunctionProps(props) : void 0;
	const outProps = enabled ? mergeObjects(stateProps, resolvedProps) ?? {} : EMPTY_OBJECT;
	if (typeof document !== "undefined") if (!enabled) useMergedRefs(null, null);
	else if (Array.isArray(ref)) outProps.ref = useMergedRefsN([
		outProps.ref,
		getReactElementRef(renderProp),
		...ref
	]);
	else outProps.ref = useMergedRefs(outProps.ref, getReactElementRef(renderProp), ref);
	if (!enabled) return EMPTY_OBJECT;
	if (className !== void 0) outProps.className = mergeClassNames(outProps.className, className);
	if (style !== void 0) outProps.style = mergeObjects(outProps.style, style);
	return outProps;
}
function resolveRenderFunctionProps(props) {
	if (Array.isArray(props)) return mergePropsN(props);
	return mergeProps(void 0, props);
}
const REACT_LAZY_TYPE = Symbol.for("react.lazy");
const COMPONENT_IDENTIFIER_PATTERN = /^[A-Z][A-Za-z0-9$]*$/;
const LOWERCASE_CHARACTER_PATTERN = /[a-z]/;
function evaluateRenderProp(element, render, props, state) {
	if (render) {
		if (typeof render === "function") {
			if (process.env.NODE_ENV !== "production") warnIfRenderPropLooksLikeComponent(render);
			return render(props, state);
		}
		const mergedProps = mergeProps(props, render.props);
		mergedProps.ref = props.ref;
		let newElement = render;
		if (newElement?.$$typeof === REACT_LAZY_TYPE) newElement = react$1.Children.toArray(render)[0];
		if (process.env.NODE_ENV !== "production") {
			if (!/*#__PURE__*/ react$1.isValidElement(newElement)) throw new Error([
				"Base UI: The `render` prop was provided an invalid React element as `React.isValidElement(render)` is `false`.",
				"A valid React element must be provided to the `render` prop because it is cloned with props to replace the default element.",
				"https://base-ui.com/r/invalid-render-prop"
			].join("\n"));
		}
		return /*#__PURE__*/ react$1.cloneElement(newElement, mergedProps);
	}
	if (element) {
		if (typeof element === "string") return renderTag(element, props);
	}
	throw new Error(process.env.NODE_ENV !== "production" ? "Base UI: Render element or function are not defined." : formatErrorMessage(8));
}
function warnIfRenderPropLooksLikeComponent(renderFn) {
	const functionName = renderFn.name;
	if (functionName.length === 0) return;
	if (!COMPONENT_IDENTIFIER_PATTERN.test(functionName)) return;
	if (!LOWERCASE_CHARACTER_PATTERN.test(functionName)) return;
	warn(`The \`render\` prop received a function named \`${functionName}\` that starts with an uppercase letter.`, "This usually means a React component was passed directly as `render={Component}`.", "Base UI calls `render` as a plain function, which can break the Rules of Hooks during reconciliation.", "If this is an intentional render callback, rename it to start with a lowercase letter.", "Use `render={<Component />}` or `render={(props) => <Component {...props} />}` instead.", "https://base-ui.com/r/invalid-render-prop");
}
function renderTag(Tag, props) {
	if (Tag === "button") return /*#__PURE__*/ (0, react$1.createElement)("button", {
		type: "button",
		...props,
		key: props.key
	});
	if (Tag === "img") return /*#__PURE__*/ (0, react$1.createElement)("img", {
		alt: "",
		...props,
		key: props.key
	});
	return /*#__PURE__*/ react$1.createElement(Tag, props);
}
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/useId.mjs
let globalId = 0;
function useGlobalId(idOverride, prefix = "mui") {
	const [defaultId, setDefaultId] = react$1.useState(idOverride);
	const id = idOverride || defaultId;
	react$1.useEffect(() => {
		if (defaultId == null) {
			globalId += 1;
			setDefaultId(`${prefix}-${globalId}`);
		}
	}, [defaultId, prefix]);
	return id;
}
const maybeReactUseId = SafeReact.useId;
/**
*
* @example <div id={useId()} />
* @param idOverride
* @returns {string}
*/
function useId$1(idOverride, prefix) {
	if (maybeReactUseId !== void 0) {
		const reactId = maybeReactUseId();
		return idOverride ?? (prefix ? `${prefix}-${reactId}` : reactId);
	}
	return useGlobalId(idOverride, prefix);
}
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/internals/useBaseUiId.mjs
/**
* Wraps `useId` and prefixes generated `id`s with `base-ui-`
* @param {string | undefined} idOverride overrides the generated id when provided
* @returns {string | undefined}
*/
function useBaseUiId(idOverride) {
	return useId$1(idOverride, "base-ui");
}
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/internals/reason-parts.mjs
const none = "none";
const triggerPress = "trigger-press";
const triggerHover = "trigger-hover";
const triggerFocus = "trigger-focus";
const outsidePress = "outside-press";
const escapeKey = "escape-key";
const disabled = "disabled";
const imperativeAction = "imperative-action";
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/internals/createBaseUIEventDetails.mjs
/**
* Maps a change `reason` string to the corresponding native event type.
*/
/**
* Details of custom change events emitted by Base UI components.
*/
/**
* Details of custom generic events emitted by Base UI components.
*/
/**
* Creates a Base UI event details object with the given reason and utilities
* for preventing Base UI's internal event handling.
*/
function createChangeEventDetails(reason, event, trigger, customProperties) {
	let canceled = false;
	let allowPropagation = false;
	const custom = customProperties ?? EMPTY_OBJECT;
	return {
		reason,
		event: event ?? new Event("base-ui"),
		cancel() {
			canceled = true;
		},
		allowPropagation() {
			allowPropagation = true;
		},
		get isCanceled() {
			return canceled;
		},
		get isPropagationAllowed() {
			return allowPropagation;
		},
		trigger,
		...custom
	};
}
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/useOnMount.mjs
const EMPTY$2 = [];
/**
* A React.useEffect equivalent that runs once, when the component is mounted.
*/
function useOnMount(fn) {
	react$1.useEffect(fn, EMPTY$2);
}
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/useAnimationFrame.mjs
/** Unlike `setTimeout`, rAF doesn't guarantee a positive integer return value, so we can't have
* a monomorphic `uint` type with `0` meaning empty.
* See warning note at:
* https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame#return_value */
const EMPTY$1 = null;
let LAST_RAF = globalThis.requestAnimationFrame;
var Scheduler = class {
	callbacks = [];
	callbacksCount = 0;
	nextId = 1;
	startId = 1;
	isScheduled = false;
	tick = (timestamp) => {
		this.isScheduled = false;
		const currentCallbacks = this.callbacks;
		const currentCallbacksCount = this.callbacksCount;
		this.callbacks = [];
		this.callbacksCount = 0;
		this.startId = this.nextId;
		if (currentCallbacksCount > 0) for (let i = 0; i < currentCallbacks.length; i += 1) currentCallbacks[i]?.(timestamp);
	};
	request(fn) {
		const id = this.nextId;
		this.nextId += 1;
		this.callbacks.push(fn);
		this.callbacksCount += 1;
		const didRAFChange = process.env.NODE_ENV !== "production" && LAST_RAF !== requestAnimationFrame && (LAST_RAF = requestAnimationFrame, true);
		if (!this.isScheduled || didRAFChange) {
			requestAnimationFrame(this.tick);
			this.isScheduled = true;
		}
		return id;
	}
	cancel(id) {
		const index = id - this.startId;
		if (index < 0 || index >= this.callbacks.length) return;
		this.callbacks[index] = null;
		this.callbacksCount -= 1;
	}
};
const scheduler = new Scheduler();
var AnimationFrame = class AnimationFrame {
	static create() {
		return new AnimationFrame();
	}
	static request(fn) {
		return scheduler.request(fn);
	}
	static cancel(id) {
		return scheduler.cancel(id);
	}
	currentId = EMPTY$1;
	/**
	* Executes `fn` after `delay`, clearing any previously scheduled call.
	*/
	request(fn) {
		this.cancel();
		this.currentId = scheduler.request(() => {
			this.currentId = EMPTY$1;
			fn();
		});
	}
	cancel = () => {
		if (this.currentId !== EMPTY$1) {
			scheduler.cancel(this.currentId);
			this.currentId = EMPTY$1;
		}
	};
	disposeEffect = () => {
		return this.cancel;
	};
};
/**
* A `requestAnimationFrame` with automatic cleanup and guard.
*/
function useAnimationFrame() {
	const timeout = useRefWithInit(AnimationFrame.create).current;
	useOnMount(timeout.disposeEffect);
	return timeout;
}
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/internals/useTransitionStatus.mjs
/**
* Provides a status string for CSS animations.
* @param open - a boolean that determines if the element is open.
* @param enableIdleState - a boolean that enables the `'idle'` state between `'starting'` and `'ending'`
*/
function useTransitionStatus(open, enableIdleState = false, deferEndingState = false) {
	const [transitionStatus, setTransitionStatus] = react$1.useState(open && enableIdleState ? "idle" : void 0);
	const [mounted, setMounted] = react$1.useState(open);
	if (open && !mounted) {
		setMounted(true);
		setTransitionStatus("starting");
	}
	if (!open && mounted && transitionStatus !== "ending" && !deferEndingState) setTransitionStatus("ending");
	if (!open && !mounted && transitionStatus === "ending") setTransitionStatus(void 0);
	useIsoLayoutEffect(() => {
		if (!open && mounted && transitionStatus !== "ending" && deferEndingState) {
			const frame = AnimationFrame.request(() => {
				setTransitionStatus("ending");
			});
			return () => {
				AnimationFrame.cancel(frame);
			};
		}
	}, [
		open,
		mounted,
		transitionStatus,
		deferEndingState
	]);
	useIsoLayoutEffect(() => {
		if (!open || enableIdleState) return;
		const frame = AnimationFrame.request(() => {
			setTransitionStatus(void 0);
		});
		return () => {
			AnimationFrame.cancel(frame);
		};
	}, [enableIdleState, open]);
	useIsoLayoutEffect(() => {
		if (!open || !enableIdleState) return;
		if (open && mounted && transitionStatus !== "idle") setTransitionStatus("starting");
		const frame = AnimationFrame.request(() => {
			setTransitionStatus("idle");
		});
		return () => {
			AnimationFrame.cancel(frame);
		};
	}, [
		enableIdleState,
		open,
		mounted,
		transitionStatus
	]);
	return {
		mounted,
		setMounted,
		transitionStatus
	};
}
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/internals/stateAttributesMapping.mjs
let TransitionStatusDataAttributes = /*#__PURE__*/ function(TransitionStatusDataAttributes) {
	/**
	* Present when the component is animating in.
	*/
	TransitionStatusDataAttributes["startingStyle"] = "data-starting-style";
	/**
	* Present when the component is animating out.
	*/
	TransitionStatusDataAttributes["endingStyle"] = "data-ending-style";
	return TransitionStatusDataAttributes;
}({});
const STARTING_HOOK = { [TransitionStatusDataAttributes.startingStyle]: "" };
const ENDING_HOOK = { [TransitionStatusDataAttributes.endingStyle]: "" };
const transitionStatusMapping = { transitionStatus(value) {
	if (value === "starting") return STARTING_HOOK;
	if (value === "ending") return ENDING_HOOK;
	return null;
} };
//#endregion
//#region ../../../node_modules/.pnpm/@floating-ui+utils@0.2.12/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function hasWindow() {
	return typeof window !== "undefined";
}
function getNodeName(node) {
	if (isNode(node)) return (node.nodeName || "").toLowerCase();
	return "#document";
}
function getWindow(node) {
	var _node$ownerDocument;
	return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
	var _ref;
	return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
	if (!hasWindow()) return false;
	return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
	if (!hasWindow()) return false;
	return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
	if (!hasWindow()) return false;
	return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
	if (!hasWindow() || typeof ShadowRoot === "undefined") return false;
	return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
function isOverflowElement(element) {
	const { overflow, overflowX, overflowY, display } = getComputedStyle$1(element);
	return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && display !== "inline" && display !== "contents";
}
function isTableElement(element) {
	return /^(table|td|th)$/.test(getNodeName(element));
}
function isTopLayer(element) {
	try {
		if (element.matches(":popover-open")) return true;
	} catch (_e) {}
	try {
		return element.matches(":modal");
	} catch (_e) {
		return false;
	}
}
const willChangeRe = /transform|translate|scale|rotate|perspective|filter/;
const containRe = /paint|layout|strict|content/;
const isNotNone = (value) => !!value && value !== "none";
let isWebKitValue;
function isContainingBlock(elementOrCss) {
	const css = isElement(elementOrCss) ? getComputedStyle$1(elementOrCss) : elementOrCss;
	return isNotNone(css.transform) || isNotNone(css.translate) || isNotNone(css.scale) || isNotNone(css.rotate) || isNotNone(css.perspective) || !isWebKit() && (isNotNone(css.backdropFilter) || isNotNone(css.filter)) || willChangeRe.test(css.willChange || "") || containRe.test(css.contain || "");
}
function getContainingBlock(element) {
	let currentNode = getParentNode(element);
	while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
		if (isContainingBlock(currentNode)) return currentNode;
		else if (isTopLayer(currentNode)) return null;
		currentNode = getParentNode(currentNode);
	}
	return null;
}
function isWebKit() {
	if (isWebKitValue == null) isWebKitValue = typeof CSS !== "undefined" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none");
	return isWebKitValue;
}
function isLastTraversableNode(node) {
	return /^(html|body|#document)$/.test(getNodeName(node));
}
function getComputedStyle$1(element) {
	return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
	if (isElement(element)) return {
		scrollLeft: element.scrollLeft,
		scrollTop: element.scrollTop
	};
	return {
		scrollLeft: element.scrollX,
		scrollTop: element.scrollY
	};
}
function getParentNode(node) {
	if (getNodeName(node) === "html") return node;
	const result = node.assignedSlot || node.parentNode || isShadowRoot(node) && node.host || getDocumentElement(node);
	return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
	const parentNode = getParentNode(node);
	if (isLastTraversableNode(parentNode)) return (node.ownerDocument || node).body;
	if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) return parentNode;
	return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
	var _node$ownerDocument2;
	if (list === void 0) list = [];
	if (traverseIframes === void 0) traverseIframes = true;
	const scrollableAncestor = getNearestOverflowAncestor(node);
	const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
	const win = getWindow(scrollableAncestor);
	if (isBody) {
		const frameElement = getFrameElement(win);
		return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
	} else return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
}
function getFrameElement(win) {
	return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
}
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/internals/composite/root/CompositeRootContext.mjs
const CompositeRootContext = /*#__PURE__*/ react$1.createContext(void 0);
if (process.env.NODE_ENV !== "production") CompositeRootContext.displayName = "CompositeRootContext";
function useCompositeRootContext(optional = false) {
	const context = react$1.useContext(CompositeRootContext);
	if (context === void 0 && !optional) throw new Error(process.env.NODE_ENV !== "production" ? "Base UI: CompositeRootContext is missing. Composite parts must be placed within <Composite.Root>." : formatErrorMessage(16));
	return context;
}
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/utils/useFocusableWhenDisabled.mjs
function useFocusableWhenDisabled(parameters) {
	const { focusableWhenDisabled, disabled, composite = false, tabIndex: tabIndexProp = 0, isNativeButton } = parameters;
	const isFocusableComposite = composite && focusableWhenDisabled !== false;
	const isNonFocusableComposite = composite && focusableWhenDisabled === false;
	return { props: react$1.useMemo(() => {
		const additionalProps = { onKeyDown(event) {
			if (disabled && focusableWhenDisabled && event.key !== "Tab") event.preventDefault();
		} };
		if (!composite) {
			additionalProps.tabIndex = tabIndexProp;
			if (!isNativeButton && disabled) additionalProps.tabIndex = focusableWhenDisabled ? tabIndexProp : -1;
		}
		if (isNativeButton && (focusableWhenDisabled || isFocusableComposite) || !isNativeButton && disabled) additionalProps["aria-disabled"] = disabled;
		if (isNativeButton && (!focusableWhenDisabled || isNonFocusableComposite)) additionalProps.disabled = disabled;
		return additionalProps;
	}, [
		composite,
		disabled,
		focusableWhenDisabled,
		isFocusableComposite,
		isNonFocusableComposite,
		isNativeButton,
		tabIndexProp
	]) };
}
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/internals/use-button/useButton.mjs
function useButton(parameters = {}) {
	const { disabled = false, focusableWhenDisabled, tabIndex = 0, native: isNativeButton = true, composite: compositeProp } = parameters;
	const elementRef = react$1.useRef(null);
	const compositeRootContext = useCompositeRootContext(true);
	const isCompositeItem = compositeProp ?? compositeRootContext !== void 0;
	const { props: focusableWhenDisabledProps } = useFocusableWhenDisabled({
		focusableWhenDisabled,
		disabled,
		composite: isCompositeItem,
		tabIndex,
		isNativeButton
	});
	if (process.env.NODE_ENV !== "production") react$1.useEffect(() => {
		if (!elementRef.current) return;
		const isButtonTag = isButtonElement(elementRef.current);
		if (isNativeButton) {
			if (!isButtonTag) error(`A component that acts as a button expected a native <button> because the \`nativeButton\` prop is true. Rendering a non-<button> removes native button semantics, which can impact forms and accessibility. Use a real <button> in the \`render\` prop, or set \`nativeButton\` to \`false\`.${SafeReact.captureOwnerStack?.() || ""}`);
		} else if (isButtonTag) error(`A component that acts as a button expected a non-<button> because the \`nativeButton\` prop is false. Rendering a <button> keeps native behavior while Base UI applies non-native attributes and handlers, which can add unintended extra attributes (such as \`role\` or \`aria-disabled\`). Use a non-<button> in the \`render\` prop, or set \`nativeButton\` to \`true\`.${SafeReact.captureOwnerStack?.() || ""}`);
	}, [isNativeButton]);
	const updateDisabled = react$1.useCallback(() => {
		const element = elementRef.current;
		if (!isButtonElement(element)) return;
		if (isCompositeItem && disabled && focusableWhenDisabledProps.disabled === void 0 && element.disabled) element.disabled = false;
	}, [
		disabled,
		focusableWhenDisabledProps.disabled,
		isCompositeItem
	]);
	useIsoLayoutEffect(updateDisabled, [updateDisabled]);
	return {
		getButtonProps: react$1.useCallback((externalProps = {}) => {
			const { onClick: externalOnClick, onMouseDown: externalOnMouseDown, onKeyUp: externalOnKeyUp, onKeyDown: externalOnKeyDown, onPointerDown: externalOnPointerDown, ...otherExternalProps } = externalProps;
			return mergeProps({
				onClick(event) {
					if (disabled) {
						event.preventDefault();
						return;
					}
					externalOnClick?.(event);
				},
				onMouseDown(event) {
					if (!disabled) externalOnMouseDown?.(event);
				},
				onKeyDown(event) {
					if (disabled) return;
					makeEventPreventable(event);
					externalOnKeyDown?.(event);
					if (event.baseUIHandlerPrevented) return;
					const isCurrentTarget = event.target === event.currentTarget;
					const currentTarget = event.currentTarget;
					const isButton = isButtonElement(currentTarget);
					const isLink = !isNativeButton && isValidLinkElement(currentTarget);
					const shouldClick = isCurrentTarget && (isNativeButton ? isButton : !isLink);
					const isEnterKey = event.key === "Enter";
					const isSpaceKey = event.key === " ";
					const role = currentTarget.getAttribute("role");
					const isTextNavigationRole = role?.startsWith("menuitem") || role === "option" || role === "gridcell";
					if (isCurrentTarget && isCompositeItem && isSpaceKey) {
						if (event.defaultPrevented && isTextNavigationRole) return;
						event.preventDefault();
						if (isLink || isNativeButton && isButton) {
							currentTarget.click();
							event.preventBaseUIHandler();
						} else if (shouldClick) {
							externalOnClick?.(event);
							event.preventBaseUIHandler();
						}
						return;
					}
					if (shouldClick) {
						if (!isNativeButton && (isSpaceKey || isEnterKey)) event.preventDefault();
						if (!isNativeButton && isEnterKey) externalOnClick?.(event);
					}
				},
				onKeyUp(event) {
					if (disabled) return;
					makeEventPreventable(event);
					externalOnKeyUp?.(event);
					if (event.target === event.currentTarget && isNativeButton && isCompositeItem && isButtonElement(event.currentTarget) && event.key === " ") {
						event.preventDefault();
						return;
					}
					if (event.baseUIHandlerPrevented) return;
					if (event.target === event.currentTarget && !isNativeButton && !isCompositeItem && event.key === " ") externalOnClick?.(event);
				},
				onPointerDown(event) {
					if (disabled) {
						event.preventDefault();
						return;
					}
					externalOnPointerDown?.(event);
				}
			}, isNativeButton ? { type: "button" } : { role: "button" }, focusableWhenDisabledProps, otherExternalProps);
		}, [
			disabled,
			focusableWhenDisabledProps,
			isCompositeItem,
			isNativeButton
		]),
		buttonRef: useStableCallback((element) => {
			elementRef.current = element;
			updateDisabled();
		})
	};
}
function isButtonElement(elem) {
	return isHTMLElement(elem) && elem.tagName === "BUTTON";
}
function isValidLinkElement(elem) {
	return Boolean(elem?.tagName === "A" && elem?.href);
}
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/addEventListener.mjs
/**
* Adds an event listener and returns a cleanup function to remove it.
*/
function addEventListener(target, type, listener, options) {
	target.addEventListener(type, listener, options);
	return () => {
		target.removeEventListener(type, listener, options);
	};
}
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/useValueAsRef.mjs
/**
* Untracks the provided value by turning it into a ref to remove its reactivity.
*
* Used to access the passed value inside `React.useEffect` without causing the effect to re-run when the value changes.
*/
function useValueAsRef(value) {
	const latest = useRefWithInit(createLatestRef, value).current;
	latest.next = value;
	useIsoLayoutEffect(latest.effect);
	return latest;
}
function createLatestRef(value) {
	const latest = {
		current: value,
		next: value,
		effect: () => {
			latest.current = latest.next;
		}
	};
	return latest;
}
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/owner.mjs
function ownerDocument(node) {
	return node?.ownerDocument || document;
}
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/utils/resolveRef.mjs
/**
* If the provided argument is a ref object, returns its `current` value.
* Otherwise, returns the argument itself.
*/
function resolveRef(maybeRef) {
	if (maybeRef == null) return maybeRef;
	return "current" in maybeRef ? maybeRef.current : maybeRef;
}
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/internals/useAnimationsFinished.mjs
/**
* Executes a function once all animations have finished on the provided element.
* @param elementOrRef - The element to watch for animations.
* @param waitForStartingStyleRemoved - Whether to wait for [data-starting-style] to be removed before checking for animations.
* @param treatAbortedAsFinished - Whether to treat aborted animations as finished. If `false`, and there are aborted animations,
*   the function will check again if any new animations have started and wait for them to finish.
* @returns A function that takes a callback to execute once all animations have finished, and an optional AbortSignal to abort the callback
*/
function useAnimationsFinished(elementOrRef, waitForStartingStyleRemoved = false, treatAbortedAsFinished = true) {
	const frame = useAnimationFrame();
	return useStableCallback((fnToExecute, signal = null) => {
		frame.cancel();
		const element = resolveRef(elementOrRef);
		if (element == null) return;
		const resolvedElement = element;
		const done = () => {
			react_dom.flushSync(fnToExecute);
		};
		if (typeof resolvedElement.getAnimations !== "function" || globalThis.BASE_UI_ANIMATIONS_DISABLED) {
			fnToExecute();
			return;
		}
		function exec() {
			Promise.all(resolvedElement.getAnimations().map((animation) => animation.finished)).then(() => {
				if (!signal?.aborted) done();
			}).catch(() => {
				if (treatAbortedAsFinished) {
					if (!signal?.aborted) done();
					return;
				}
				const currentAnimations = resolvedElement.getAnimations();
				if (!signal?.aborted && currentAnimations.length > 0 && currentAnimations.some((animation) => animation.pending || animation.playState !== "finished")) exec();
			});
		}
		if (waitForStartingStyleRemoved) {
			const startingStyleAttribute = TransitionStatusDataAttributes.startingStyle;
			if (!resolvedElement.hasAttribute(startingStyleAttribute)) {
				frame.request(exec);
				return;
			}
			const attributeObserver = new MutationObserver(() => {
				if (!resolvedElement.hasAttribute(startingStyleAttribute)) {
					attributeObserver.disconnect();
					exec();
				}
			});
			attributeObserver.observe(resolvedElement, {
				attributes: true,
				attributeFilter: [startingStyleAttribute]
			});
			signal?.addEventListener("abort", () => attributeObserver.disconnect(), { once: true });
			return;
		}
		frame.request(exec);
	});
}
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/internals/useOpenChangeComplete.mjs
/**
* Calls the provided function when the CSS open/close animation or transition completes.
*/
function useOpenChangeComplete(parameters) {
	const { enabled = true, open, ref, onComplete: onCompleteParam } = parameters;
	const onComplete = useStableCallback(onCompleteParam);
	const runOnceAnimationsFinish = useAnimationsFinished(ref, open, false);
	react$1.useEffect(() => {
		if (!enabled) return;
		const abortController = new AbortController();
		runOnceAnimationsFinish(onComplete, abortController.signal);
		return () => {
			abortController.abort();
		};
	}, [
		enabled,
		open,
		onComplete,
		runOnceAnimationsFinish
	]);
}
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/useOnFirstRender.mjs
function useOnFirstRender(fn) {
	const ref = react$1.useRef(true);
	if (ref.current) {
		ref.current = false;
		fn();
	}
}
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/platform/shared.mjs
/**
* Reads `navigator.userAgent` / `navigator.platform` (legacy but universally
* supported) into a normalized shape. In development, prefers the modern
* `navigator.userAgentData` API on Chromium to avoid DevTools warnings about
* the deprecated reads; that branch is dead-code-eliminated in production
* builds to keep the bundle small.
*
* Returns empty/zero values when `navigator` is undefined (SSR), so every
* derived flag safely evaluates to `false`.
*/
function readRawData() {
	if (typeof navigator === "undefined") return {
		userAgent: "",
		platform: "",
		maxTouchPoints: 0
	};
	if (process.env.NODE_ENV !== "production") {
		const uaData = navigator.userAgentData;
		if (uaData && Array.isArray(uaData.brands)) return {
			userAgent: uaData.brands.map(({ brand, version }) => `${brand}/${version}`).join(" "),
			platform: uaData.platform ?? navigator.platform ?? "",
			maxTouchPoints: navigator.maxTouchPoints ?? 0
		};
	}
	return {
		userAgent: navigator.userAgent,
		platform: navigator.platform ?? "",
		maxTouchPoints: navigator.maxTouchPoints ?? 0
	};
}
const { userAgent, platform: platform$1, maxTouchPoints } = readRawData();
const lowerUserAgent = userAgent.toLowerCase();
const lowerPlatform = platform$1.toLowerCase();
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/platform/os.mjs
/** iPhone, iPad (including iPadOS 13+ reporting as macOS), iPod. */
const ios = /^i(os$|p)/.test(lowerPlatform) || lowerPlatform === "macintel" && maxTouchPoints > 1;
/** Android phones, tablets, and embedded Android browsers. */
const ANDROID_STRING = "android";
const android = lowerPlatform === ANDROID_STRING || lowerUserAgent.includes(ANDROID_STRING);
/** macOS desktop. Excludes iPadOS, which reports as `MacIntel`. */
const mac = !ios && lowerPlatform.startsWith("mac");
lowerPlatform.startsWith("win");
!android && /^(linux|chrome os)/.test(lowerPlatform);
/** Any Apple OS (`mac || ios`). */
const apple = mac || ios;
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/platform/engine.mjs
/** WebKit: Safari, all iOS browsers, GNOME Web. Excludes Blink. */
const webkit = typeof CSS !== "undefined" && !!CSS.supports?.("-webkit-backdrop-filter:none");
!webkit && lowerUserAgent.includes("firefox");
!webkit && lowerUserAgent.includes("chrom");
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/platform/screen-reader.mjs
/**
* The user *may* be using VoiceOver — actual activation is not detectable.
* True on any Apple platform (macOS, iOS, iPadOS).
*/
const voiceOver = apple;
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/platform/env.mjs
/** Running in jsdom or HappyDOM (used by unit tests). */
const jsdom = /jsdom|happydom/.test(lowerUserAgent);
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/useTimeout.mjs
const EMPTY = 0;
var Timeout = class Timeout {
	static create() {
		return new Timeout();
	}
	currentId = EMPTY;
	/**
	* Executes `fn` after `delay`, clearing any previously scheduled call.
	*/
	start(delay, fn) {
		this.clear();
		this.currentId = setTimeout(() => {
			this.currentId = EMPTY;
			fn();
		}, delay);
	}
	isStarted() {
		return this.currentId !== EMPTY;
	}
	clear = () => {
		if (this.currentId !== EMPTY) {
			clearTimeout(this.currentId);
			this.currentId = EMPTY;
		}
	};
	disposeEffect = () => {
		return this.clear;
	};
};
/**
* A `setTimeout` with automatic cleanup and guard.
*/
function useTimeout() {
	const timeout = useRefWithInit(Timeout.create).current;
	useOnMount(timeout.disposeEffect);
	return timeout;
}
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/floating-ui-react/utils/event.mjs
function isReactEvent(event) {
	return "nativeEvent" in event;
}
function isMouseLikePointerType(pointerType, strict) {
	const values = ["mouse", "pen"];
	if (!strict) values.push("", void 0);
	return values.includes(pointerType);
}
function isClickLikeEvent(event) {
	const type = event.type;
	return type === "click" || type === "mousedown" || type === "keydown" || type === "keyup";
}
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/floating-ui-react/utils/constants.mjs
const FOCUSABLE_ATTRIBUTE = "data-base-ui-focusable";
const TYPEABLE_SELECTOR = "input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])";
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/internals/shadowDom.mjs
function activeElement(doc) {
	let element = doc.activeElement;
	while (element?.shadowRoot?.activeElement != null) element = element.shadowRoot.activeElement;
	return element;
}
function contains(parent, child) {
	if (!parent || !child) return false;
	const rootNode = child.getRootNode?.();
	if (parent.contains(child)) return true;
	if (rootNode && isShadowRoot(rootNode)) {
		let next = child;
		while (next) {
			if (parent === next) return true;
			next = next.parentNode || next.host;
		}
	}
	return false;
}
function getTarget(event) {
	if ("composedPath" in event) return event.composedPath()[0];
	return event.target;
}
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/floating-ui-react/utils/element.mjs
function isTargetInsideEnabledTrigger(target, triggerElements) {
	if (!isElement(target)) return false;
	const targetElement = target;
	if (triggerElements.hasElement(targetElement)) return !targetElement.hasAttribute("data-trigger-disabled");
	for (const [, trigger] of triggerElements.entries()) if (contains(trigger, targetElement)) return !trigger.hasAttribute("data-trigger-disabled");
	return false;
}
function isEventTargetWithin(event, node) {
	if (node == null) return false;
	if ("composedPath" in event) return event.composedPath().includes(node);
	const eventAgain = event;
	return eventAgain.target != null && node.contains(eventAgain.target);
}
function isRootElement(element) {
	return element.matches("html,body");
}
function isTypeableElement(element) {
	return isHTMLElement(element) && element.matches("input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])");
}
function isInteractiveElement(element) {
	return element?.closest(`button,a[href],[role="button"],select,[tabindex]:not([tabindex="-1"]),${TYPEABLE_SELECTOR}`) != null;
}
function matchesFocusVisible(element) {
	if (!element || jsdom) return true;
	try {
		return element.matches(":focus-visible");
	} catch (_e) {
		return true;
	}
}
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/floating-ui-react/hooks/useHoverShared.mjs
function resolveValue(value, pointerType) {
	if (pointerType != null && !isMouseLikePointerType(pointerType)) return 0;
	if (typeof value === "function") return value();
	return value;
}
function getDelay(value, prop, pointerType) {
	const result = resolveValue(value, pointerType);
	if (typeof result === "number") return result;
	return result?.[prop];
}
function getRestMs(value) {
	if (typeof value === "function") return value();
	return value;
}
function isClickLikeOpenEvent(openEventType, interactedInside) {
	return interactedInside || openEventType === "click" || openEventType === "mousedown";
}
function isHoverOpenEvent(openEventType) {
	return openEventType?.includes("mouse") && openEventType !== "mousedown";
}
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/floating-ui-react/components/FloatingDelayGroup.mjs
const FloatingDelayGroupContext = /*#__PURE__*/ react$1.createContext({
	hasProvider: false,
	timeoutMs: 0,
	delayRef: { current: 0 },
	initialDelayRef: { current: 0 },
	timeout: new Timeout(),
	currentIdRef: { current: null },
	currentContextRef: { current: null }
});
if (process.env.NODE_ENV !== "production") FloatingDelayGroupContext.displayName = "FloatingDelayGroupContext";
function resetDelayRef(delayRef, initialDelayRef) {
	delayRef.current = initialDelayRef.current;
}
/**
* Experimental next version of `FloatingDelayGroup` to become the default
* in the future. This component is not yet stable.
* Provides context for a group of floating elements that should share a
* `delay`. Unlike `FloatingDelayGroup`, `useDelayGroup` with this
* component does not cause a re-render of unrelated consumers of the
* context when the delay changes.
* @see https://floating-ui.com/docs/FloatingDelayGroup
* @internal
*/
function FloatingDelayGroup(props) {
	const { children, delay, timeoutMs = 0 } = props;
	const delayRef = react$1.useRef(delay);
	const initialDelayRef = react$1.useRef(delay);
	const currentIdRef = react$1.useRef(null);
	const currentContextRef = react$1.useRef(null);
	const timeout = useTimeout();
	useIsoLayoutEffect(() => {
		initialDelayRef.current = delay;
		if (!currentIdRef.current) {
			delayRef.current = delay;
			return;
		}
		delayRef.current = {
			open: getDelay(delayRef.current, "open"),
			close: getDelay(delay, "close")
		};
	}, [
		delay,
		currentIdRef,
		delayRef,
		initialDelayRef
	]);
	return /*#__PURE__*/ (0, react_jsx_runtime.jsx)(FloatingDelayGroupContext.Provider, {
		value: react$1.useMemo(() => ({
			hasProvider: true,
			delayRef,
			initialDelayRef,
			currentIdRef,
			timeoutMs,
			currentContextRef,
			timeout
		}), [timeoutMs, timeout]),
		children
	});
}
/**
* Enables grouping when called inside a component that's a child of a
* `FloatingDelayGroup`.
* @see https://floating-ui.com/docs/FloatingDelayGroup
* @internal
*/
function useDelayGroup(context, options = { open: false }) {
	const { open } = options;
	const store = "rootStore" in context ? context.rootStore : context;
	const floatingId = store.useState("floatingId");
	const { currentIdRef, delayRef, timeoutMs, initialDelayRef, currentContextRef, hasProvider, timeout } = react$1.useContext(FloatingDelayGroupContext);
	const [isInstantPhase, setIsInstantPhase] = react$1.useState(false);
	const openRef = react$1.useRef(open);
	const isUnmountedRef = react$1.useRef(false);
	useIsoLayoutEffect(() => {
		openRef.current = open;
	}, [open]);
	useIsoLayoutEffect(() => {
		return () => {
			isUnmountedRef.current = true;
		};
	}, []);
	useIsoLayoutEffect(() => {
		function unset() {
			if (!isUnmountedRef.current) setIsInstantPhase(false);
			currentContextRef.current?.setIsInstantPhase(false);
			currentIdRef.current = null;
			currentContextRef.current = null;
			delayRef.current = initialDelayRef.current;
			timeout.clear();
		}
		if (!currentIdRef.current) return;
		if (!open && currentIdRef.current === floatingId) {
			setIsInstantPhase(false);
			if (timeoutMs) {
				const closingId = floatingId;
				timeout.start(timeoutMs, () => {
					if (store.select("open") || currentIdRef.current && currentIdRef.current !== closingId) return;
					unset();
				});
				return () => {
					if (openRef.current || currentIdRef.current !== closingId) timeout.clear();
				};
			}
			unset();
		}
	}, [
		open,
		floatingId,
		currentIdRef,
		delayRef,
		timeoutMs,
		initialDelayRef,
		currentContextRef,
		timeout,
		store
	]);
	useIsoLayoutEffect(() => {
		if (!open) return;
		const prevContext = currentContextRef.current;
		const prevId = currentIdRef.current;
		timeout.clear();
		currentContextRef.current = {
			onOpenChange: store.setOpen,
			setIsInstantPhase
		};
		currentIdRef.current = floatingId;
		delayRef.current = {
			open: 0,
			close: getDelay(initialDelayRef.current, "close")
		};
		if (prevId !== null && prevId !== floatingId) {
			setIsInstantPhase(true);
			prevContext?.setIsInstantPhase(true);
			prevContext?.onOpenChange(false, createChangeEventDetails(none));
		} else {
			setIsInstantPhase(false);
			prevContext?.setIsInstantPhase(false);
		}
	}, [
		open,
		floatingId,
		store,
		currentIdRef,
		delayRef,
		initialDelayRef,
		currentContextRef,
		timeout
	]);
	useIsoLayoutEffect(() => {
		return () => {
			if (currentIdRef.current === floatingId) {
				currentContextRef.current = null;
				if (!openRef.current) return;
				currentIdRef.current = null;
				resetDelayRef(delayRef, initialDelayRef);
				timeout.clear();
			}
		};
	}, [
		currentContextRef,
		currentIdRef,
		delayRef,
		floatingId,
		initialDelayRef,
		timeout
	]);
	return react$1.useMemo(() => ({
		hasProvider,
		delayRef,
		isInstantPhase
	}), [
		hasProvider,
		delayRef,
		isInstantPhase
	]);
}
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/mergeCleanups.mjs
/**
* Combines multiple cleanup functions into a single cleanup function.
*/
function mergeCleanups(...cleanups) {
	return () => {
		for (let i = 0; i < cleanups.length; i += 1) {
			const cleanup = cleanups[i];
			if (cleanup) cleanup();
		}
	};
}
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/visuallyHidden.mjs
const visuallyHiddenBase = {
	clipPath: "inset(50%)",
	overflow: "hidden",
	whiteSpace: "nowrap",
	border: 0,
	padding: 0,
	width: 1,
	height: 1,
	margin: -1
};
const visuallyHidden$1 = {
	...visuallyHiddenBase,
	position: "fixed",
	top: 0,
	left: 0
};
({ ...visuallyHiddenBase });
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/utils/FocusGuard.mjs
/**
* @internal
*/
const FocusGuard = /*#__PURE__*/ react$1.forwardRef(function FocusGuard(props, ref) {
	const [role, setRole] = react$1.useState();
	useIsoLayoutEffect(() => {
		if (voiceOver && webkit) setRole("button");
	}, []);
	const restProps = {
		tabIndex: 0,
		role
	};
	return /*#__PURE__*/ (0, react_jsx_runtime.jsx)("span", {
		...props,
		ref,
		style: visuallyHidden$1,
		"aria-hidden": role ? void 0 : true,
		...restProps,
		"data-base-ui-focus-guard": ""
	});
});
if (process.env.NODE_ENV !== "production") FocusGuard.displayName = "FocusGuard";
//#endregion
//#region ../../../node_modules/.pnpm/@floating-ui+utils@0.2.12/node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
/**
* Custom positioning reference element.
* @see https://floating-ui.com/docs/virtual-elements
*/
const sides = [
	"top",
	"right",
	"bottom",
	"left"
];
const min = Math.min;
const max = Math.max;
const round = Math.round;
const floor = Math.floor;
const createCoords = (v) => ({
	x: v,
	y: v
});
const oppositeSideMap = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function clamp(start, value, end) {
	return max(start, min(value, end));
}
function evaluate(value, param) {
	return typeof value === "function" ? value(param) : value;
}
function getSide(placement) {
	return placement.split("-")[0];
}
function getAlignment(placement) {
	return placement.split("-")[1];
}
function getOppositeAxis(axis) {
	return axis === "x" ? "y" : "x";
}
function getAxisLength(axis) {
	return axis === "y" ? "height" : "width";
}
function getSideAxis(placement) {
	const firstChar = placement[0];
	return firstChar === "t" || firstChar === "b" ? "y" : "x";
}
function getAlignmentAxis(placement) {
	return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
	if (rtl === void 0) rtl = false;
	const alignment = getAlignment(placement);
	const alignmentAxis = getAlignmentAxis(placement);
	const length = getAxisLength(alignmentAxis);
	let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
	if (rects.reference[length] > rects.floating[length]) mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
	return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
	const oppositePlacement = getOppositePlacement(placement);
	return [
		getOppositeAlignmentPlacement(placement),
		oppositePlacement,
		getOppositeAlignmentPlacement(oppositePlacement)
	];
}
function getOppositeAlignmentPlacement(placement) {
	return placement.includes("start") ? placement.replace("start", "end") : placement.replace("end", "start");
}
const lrPlacement = ["left", "right"];
const rlPlacement = ["right", "left"];
const tbPlacement = ["top", "bottom"];
const btPlacement = ["bottom", "top"];
function getSideList(side, isStart, rtl) {
	switch (side) {
		case "top":
		case "bottom":
			if (rtl) return isStart ? rlPlacement : lrPlacement;
			return isStart ? lrPlacement : rlPlacement;
		case "left":
		case "right": return isStart ? tbPlacement : btPlacement;
		default: return [];
	}
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
	const alignment = getAlignment(placement);
	let list = getSideList(getSide(placement), direction === "start", rtl);
	if (alignment) {
		list = list.map((side) => side + "-" + alignment);
		if (flipAlignment) list = list.concat(list.map(getOppositeAlignmentPlacement));
	}
	return list;
}
function getOppositePlacement(placement) {
	const side = getSide(placement);
	return oppositeSideMap[side] + placement.slice(side.length);
}
function expandPaddingObject(padding) {
	var _padding$top, _padding$right, _padding$bottom, _padding$left;
	return {
		top: (_padding$top = padding.top) != null ? _padding$top : 0,
		right: (_padding$right = padding.right) != null ? _padding$right : 0,
		bottom: (_padding$bottom = padding.bottom) != null ? _padding$bottom : 0,
		left: (_padding$left = padding.left) != null ? _padding$left : 0
	};
}
function getPaddingObject(padding) {
	return typeof padding !== "number" ? expandPaddingObject(padding) : {
		top: padding,
		right: padding,
		bottom: padding,
		left: padding
	};
}
function rectToClientRect(rect) {
	const { x, y, width, height } = rect;
	return {
		width,
		height,
		top: y,
		left: x,
		right: x + width,
		bottom: y + height,
		x,
		y
	};
}
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/floating-ui-react/utils/composite.mjs
function isHiddenByStyles(styles) {
	return styles.visibility === "hidden" || styles.visibility === "collapse";
}
function isElementVisible(element, styles = element ? getComputedStyle$1(element) : null) {
	if (!element || !element.isConnected || !styles || isHiddenByStyles(styles)) return false;
	if (typeof element.checkVisibility === "function") return element.checkVisibility();
	return styles.display !== "none" && styles.display !== "contents";
}
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/floating-ui-react/utils/tabbable.mjs
const CANDIDATE_SELECTOR = "a[href],button,input,select,textarea,summary,details,iframe,object,embed,[tabindex],[contenteditable]:not([contenteditable=\"false\"]),audio[controls],video[controls]";
function getParentElement(element) {
	const assignedSlot = element.assignedSlot;
	if (assignedSlot) return assignedSlot;
	if (element.parentElement) return element.parentElement;
	const rootNode = element.getRootNode();
	return isShadowRoot(rootNode) ? rootNode.host : null;
}
function getDetailsSummary(details) {
	for (const child of Array.from(details.children)) if (getNodeName(child) === "summary") return child;
	return null;
}
function isWithinOpenDetailsSummary(element, details) {
	const summary = getDetailsSummary(details);
	return !!summary && (element === summary || contains(summary, element));
}
function isFocusableCandidate(element) {
	const nodeName = element ? getNodeName(element) : "";
	return element != null && element.matches(CANDIDATE_SELECTOR) && (nodeName !== "summary" || element.parentElement != null && getNodeName(element.parentElement) === "details" && getDetailsSummary(element.parentElement) === element) && (nodeName !== "details" || getDetailsSummary(element) == null) && (nodeName !== "input" || element.type !== "hidden");
}
function isFocusableElement(element) {
	if (!isFocusableCandidate(element) || !element.isConnected || element.matches(":disabled")) return false;
	for (let current = element; current; current = getParentElement(current)) {
		const isAncestor = current !== element;
		const isSlot = getNodeName(current) === "slot";
		if (current.hasAttribute("inert")) return false;
		if (isAncestor && getNodeName(current) === "details" && !current.open && !isWithinOpenDetailsSummary(element, current) || current.hasAttribute("hidden") || !isSlot && !isVisibleInTabbableTree(current, isAncestor)) return false;
	}
	return true;
}
function isVisibleInTabbableTree(element, isAncestor) {
	const styles = getComputedStyle$1(element);
	if (!isAncestor) return isElementVisible(element, styles);
	return styles.display !== "none";
}
function getTabIndex(element) {
	const tabIndex = element.tabIndex;
	if (tabIndex < 0) {
		const nodeName = getNodeName(element);
		if (nodeName === "details" || nodeName === "audio" || nodeName === "video" || isHTMLElement(element) && element.isContentEditable) return 0;
	}
	return tabIndex;
}
function getNamedRadioInput(element) {
	if (getNodeName(element) !== "input") return null;
	const input = element;
	return input.type === "radio" && input.name !== "" ? input : null;
}
function isTabbableRadio(element, candidates) {
	const input = getNamedRadioInput(element);
	if (!input) return true;
	const checkedRadio = candidates.find((candidate) => {
		const radio = getNamedRadioInput(candidate);
		return radio?.name === input.name && radio.form === input.form && radio.checked;
	});
	if (checkedRadio) return checkedRadio === input;
	return candidates.find((candidate) => {
		const radio = getNamedRadioInput(candidate);
		return radio?.name === input.name && radio.form === input.form;
	}) === input;
}
function getComposedChildren(container) {
	if (isHTMLElement(container) && getNodeName(container) === "slot") {
		const assignedElements = container.assignedElements({ flatten: true });
		if (assignedElements.length > 0) return assignedElements;
	}
	if (isHTMLElement(container) && container.shadowRoot) return Array.from(container.shadowRoot.children);
	return Array.from(container.children);
}
function appendCandidates(container, list) {
	getComposedChildren(container).forEach((child) => {
		if (isFocusableCandidate(child)) list.push(child);
		appendCandidates(child, list);
	});
}
function appendMatchingElements(container, selector, list) {
	getComposedChildren(container).forEach((child) => {
		if (isHTMLElement(child) && child.matches(selector)) list.push(child);
		appendMatchingElements(child, selector, list);
	});
}
function focusable(container) {
	const candidates = [];
	appendCandidates(container, candidates);
	return candidates.filter(isFocusableElement);
}
function tabbable(container) {
	const candidates = focusable(container);
	return candidates.filter((element) => getTabIndex(element) >= 0 && isTabbableRadio(element, candidates));
}
function getTabbableIn(container, dir) {
	const list = tabbable(container);
	const len = list.length;
	if (len === 0) return;
	const active = activeElement(ownerDocument(container));
	const index = list.indexOf(active);
	return list[index === -1 ? dir === 1 ? 0 : len - 1 : index + dir];
}
function getNextTabbable(referenceElement) {
	return getTabbableIn(ownerDocument(referenceElement).body, 1) || referenceElement;
}
function getPreviousTabbable(referenceElement) {
	return getTabbableIn(ownerDocument(referenceElement).body, -1) || referenceElement;
}
function isOutsideEvent(event, container) {
	const containerElement = container || event.currentTarget;
	const relatedTarget = event.relatedTarget;
	return !relatedTarget || !contains(containerElement, relatedTarget);
}
function disableFocusInside(container) {
	tabbable(container).forEach((element) => {
		element.dataset.tabindex = element.getAttribute("tabindex") || "";
		element.setAttribute("tabindex", "-1");
	});
}
function enableFocusInside(container) {
	const elements = [];
	appendMatchingElements(container, "[data-tabindex]", elements);
	elements.forEach((element) => {
		const tabindex = element.dataset.tabindex;
		delete element.dataset.tabindex;
		if (tabindex) element.setAttribute("tabindex", tabindex);
		else element.removeAttribute("tabindex");
	});
}
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/floating-ui-react/utils/nodes.mjs
function getNodeChildren(nodes, id, onlyOpenChildren = true) {
	return nodes.filter((node) => node.parentId === id).flatMap((child) => [...!onlyOpenChildren || child.context?.open ? [child] : [], ...getNodeChildren(nodes, child.id, onlyOpenChildren)]);
}
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/floating-ui-react/utils/createAttribute.mjs
function createAttribute(name) {
	return `data-base-ui-${name}`;
}
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/internals/constants.mjs
const DISABLED_TRANSITIONS_STYLE = { style: { transition: "none" } };
/**
* Used by regular popups that usually aren't scrollable and are allowed to
* freely flip to any axis of placement.
*/
const POPUP_COLLISION_AVOIDANCE = { fallbackAxisSide: "end" };
/**
* Special visually hidden styles for the aria-owns owner element to ensure owned element
* accessibility in iOS/Safari/VoiceControl.
* The owner element is an empty span, so most of the common visually hidden styles are not needed.
* @see https://github.com/floating-ui/floating-ui/issues/3403
*/
const ownerVisuallyHidden = {
	clipPath: "inset(50%)",
	position: "fixed",
	top: 0,
	left: 0
};
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/floating-ui-react/components/FloatingPortal.mjs
const PortalContext = /*#__PURE__*/ react$1.createContext(null);
if (process.env.NODE_ENV !== "production") PortalContext.displayName = "PortalContext";
const usePortalContext = () => react$1.useContext(PortalContext);
const attr = createAttribute("portal");
function useFloatingPortalNode(props = {}) {
	const { ref, container: containerProp, componentProps = EMPTY_OBJECT, elementProps } = props;
	const uniqueId = useId$1();
	const parentPortalNode = usePortalContext()?.portalNode;
	const [containerElement, setContainerElement] = react$1.useState(null);
	const [portalNode, setPortalNode] = react$1.useState(null);
	const setPortalNodeRef = useStableCallback((node) => {
		if (node !== null) setPortalNode(node);
	});
	const containerRef = react$1.useRef(null);
	useIsoLayoutEffect(() => {
		if (containerProp === null) {
			if (containerRef.current) {
				containerRef.current = null;
				setPortalNode(null);
				setContainerElement(null);
			}
			return;
		}
		if (uniqueId == null) return;
		const resolvedContainer = (containerProp && (isNode(containerProp) ? containerProp : containerProp.current)) ?? parentPortalNode ?? document.body;
		if (resolvedContainer == null) {
			if (containerRef.current) {
				containerRef.current = null;
				setPortalNode(null);
				setContainerElement(null);
			}
			return;
		}
		if (containerRef.current !== resolvedContainer) {
			containerRef.current = resolvedContainer;
			setPortalNode(null);
			setContainerElement(resolvedContainer);
		}
	}, [
		containerProp,
		parentPortalNode,
		uniqueId
	]);
	const portalElement = useRenderElement("div", componentProps, {
		ref: [ref, setPortalNodeRef],
		props: [{
			id: uniqueId,
			[attr]: ""
		}, elementProps]
	});
	return {
		portalNode,
		portalSubtree: containerElement && portalElement ? /*#__PURE__*/ react_dom.createPortal(portalElement, containerElement) : null
	};
}
/**
* Portals the floating element into a given container element — by default,
* outside of the app root and into the body.
* This is necessary to ensure the floating element can appear outside any
* potential parent containers that cause clipping (such as `overflow: hidden`),
* while retaining its location in the React tree.
* @see https://floating-ui.com/docs/FloatingPortal
* @internal
*/
const FloatingPortal = /*#__PURE__*/ react$1.forwardRef(function FloatingPortal(componentProps, forwardedRef) {
	const { render, className, style, children, container, renderGuards, ...elementProps } = componentProps;
	const { portalNode, portalSubtree } = useFloatingPortalNode({
		container,
		ref: forwardedRef,
		componentProps,
		elementProps
	});
	const beforeOutsideRef = react$1.useRef(null);
	const afterOutsideRef = react$1.useRef(null);
	const beforeInsideRef = react$1.useRef(null);
	const afterInsideRef = react$1.useRef(null);
	const [focusManagerState, setFocusManagerState] = react$1.useState(null);
	const focusInsideDisabledRef = react$1.useRef(false);
	const modal = focusManagerState?.modal;
	const open = focusManagerState?.open;
	const shouldRenderGuards = typeof renderGuards === "boolean" ? renderGuards : !!focusManagerState && !focusManagerState.modal && focusManagerState.open && !!portalNode;
	react$1.useEffect(() => {
		if (!portalNode || modal) return;
		function onFocus(event) {
			if (portalNode && event.relatedTarget && isOutsideEvent(event)) if (event.type === "focusin") {
				if (focusInsideDisabledRef.current) {
					enableFocusInside(portalNode);
					focusInsideDisabledRef.current = false;
				}
			} else {
				disableFocusInside(portalNode);
				focusInsideDisabledRef.current = true;
			}
		}
		return mergeCleanups(addEventListener(portalNode, "focusin", onFocus, true), addEventListener(portalNode, "focusout", onFocus, true));
	}, [portalNode, modal]);
	useIsoLayoutEffect(() => {
		if (!portalNode || open !== true || !focusInsideDisabledRef.current) return;
		enableFocusInside(portalNode);
		focusInsideDisabledRef.current = false;
	}, [open, portalNode]);
	const portalContextValue = react$1.useMemo(() => ({
		beforeOutsideRef,
		afterOutsideRef,
		beforeInsideRef,
		afterInsideRef,
		portalNode,
		setFocusManagerState
	}), [portalNode]);
	return /*#__PURE__*/ (0, react_jsx_runtime.jsxs)(react$1.Fragment, { children: [portalSubtree, /*#__PURE__*/ (0, react_jsx_runtime.jsxs)(PortalContext.Provider, {
		value: portalContextValue,
		children: [
			shouldRenderGuards && portalNode && /*#__PURE__*/ (0, react_jsx_runtime.jsx)(FocusGuard, {
				"data-type": "outside",
				ref: beforeOutsideRef,
				onFocus: (event) => {
					if (isOutsideEvent(event, portalNode)) beforeInsideRef.current?.focus();
					else getPreviousTabbable(focusManagerState ? focusManagerState.domReference : null)?.focus();
				}
			}),
			shouldRenderGuards && portalNode && /*#__PURE__*/ (0, react_jsx_runtime.jsx)("span", {
				"aria-owns": portalNode.id,
				style: ownerVisuallyHidden
			}),
			portalNode && /*#__PURE__*/ react_dom.createPortal(children, portalNode),
			shouldRenderGuards && portalNode && /*#__PURE__*/ (0, react_jsx_runtime.jsx)(FocusGuard, {
				"data-type": "outside",
				ref: afterOutsideRef,
				onFocus: (event) => {
					if (isOutsideEvent(event, portalNode)) afterInsideRef.current?.focus();
					else {
						getNextTabbable(focusManagerState ? focusManagerState.domReference : null)?.focus();
						if (focusManagerState?.closeOnFocusOut) focusManagerState?.onOpenChange(false, createChangeEventDetails("focus-out", event.nativeEvent));
					}
				}
			})
		]
	})] });
});
if (process.env.NODE_ENV !== "production") FloatingPortal.displayName = "FloatingPortal";
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/floating-ui-react/utils/createEventEmitter.mjs
function createEventEmitter() {
	const map = /* @__PURE__ */ new Map();
	return {
		emit(event, data) {
			map.get(event)?.forEach((listener) => listener(data));
		},
		on(event, listener) {
			if (!map.has(event)) map.set(event, /* @__PURE__ */ new Set());
			map.get(event).add(listener);
		},
		off(event, listener) {
			map.get(event)?.delete(listener);
		}
	};
}
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/floating-ui-react/components/FloatingTree.mjs
const FloatingNodeContext = /*#__PURE__*/ react$1.createContext(null);
if (process.env.NODE_ENV !== "production") FloatingNodeContext.displayName = "FloatingNodeContext";
const FloatingTreeContext = /*#__PURE__*/ react$1.createContext(null);
/**
* Returns the parent node id for nested floating elements, if available.
* Returns `null` for top-level floating elements.
*/
if (process.env.NODE_ENV !== "production") FloatingTreeContext.displayName = "FloatingTreeContext";
const useFloatingParentNodeId = () => react$1.useContext(FloatingNodeContext)?.id || null;
/**
* Returns the nearest floating tree context, if available.
*/
const useFloatingTree = (externalTree) => {
	const contextTree = react$1.useContext(FloatingTreeContext);
	return externalTree ?? contextTree;
};
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/floating-ui-react/hooks/useClientPoint.mjs
function createVirtualElement(domElement, data) {
	let offsetX = null;
	let offsetY = null;
	let isAutoUpdateEvent = false;
	return {
		contextElement: domElement || void 0,
		getBoundingClientRect() {
			const domRect = domElement?.getBoundingClientRect() || {
				width: 0,
				height: 0,
				x: 0,
				y: 0
			};
			const isXAxis = data.axis === "x" || data.axis === "both";
			const isYAxis = data.axis === "y" || data.axis === "both";
			const canTrackCursorOnAutoUpdate = ["mouseenter", "mousemove"].includes(data.dataRef.current.openEvent?.type || "") && data.pointerType !== "touch";
			let width = domRect.width;
			let height = domRect.height;
			let x = domRect.x;
			let y = domRect.y;
			if (offsetX == null && data.x && isXAxis) offsetX = domRect.x - data.x;
			if (offsetY == null && data.y && isYAxis) offsetY = domRect.y - data.y;
			x -= offsetX || 0;
			y -= offsetY || 0;
			width = 0;
			height = 0;
			if (!isAutoUpdateEvent || canTrackCursorOnAutoUpdate) {
				width = data.axis === "y" ? domRect.width : 0;
				height = data.axis === "x" ? domRect.height : 0;
				x = isXAxis && data.x != null ? data.x : x;
				y = isYAxis && data.y != null ? data.y : y;
			} else if (isAutoUpdateEvent && !canTrackCursorOnAutoUpdate) {
				height = data.axis === "x" ? domRect.height : height;
				width = data.axis === "y" ? domRect.width : width;
			}
			isAutoUpdateEvent = true;
			return {
				width,
				height,
				x,
				y,
				top: y,
				right: x + width,
				bottom: y + height,
				left: x
			};
		}
	};
}
function isMouseBasedEvent(event) {
	return event != null && event.clientX != null;
}
/**
* Positions the floating element relative to a client point (in the viewport),
* such as the mouse position. By default, it follows the mouse cursor.
* @see https://floating-ui.com/docs/useClientPoint
*/
function useClientPoint(context, props = {}) {
	const { enabled = true, axis = "both" } = props;
	const store = "rootStore" in context ? context.rootStore : context;
	const open = store.useState("open");
	const floating = store.useState("floatingElement");
	const domReference = store.useState("domReferenceElement");
	const dataRef = store.context.dataRef;
	const initialRef = react$1.useRef(false);
	const cleanupListenerRef = react$1.useRef(null);
	const [pointerType, setPointerType] = react$1.useState();
	const [reactive, setReactive] = react$1.useState([]);
	const resetReference = useStableCallback((reference) => {
		store.set("positionReference", reference);
	});
	const setReference = useStableCallback((newX, newY, referenceElement) => {
		if (initialRef.current) return;
		if (dataRef.current.openEvent && !isMouseBasedEvent(dataRef.current.openEvent)) return;
		store.set("positionReference", createVirtualElement(referenceElement ?? domReference, {
			x: newX,
			y: newY,
			axis,
			dataRef,
			pointerType
		}));
	});
	const handleReferenceEnterOrMove = useStableCallback((event) => {
		if (!open) setReference(event.clientX, event.clientY, event.currentTarget);
		else if (!cleanupListenerRef.current) {
			setReference(event.clientX, event.clientY, event.currentTarget);
			setReactive([]);
		}
	});
	const openCheck = isMouseLikePointerType(pointerType) ? floating : open;
	react$1.useEffect(() => {
		if (!enabled) {
			resetReference(domReference);
			return;
		}
		if (!openCheck) return;
		function cleanupListener() {
			cleanupListenerRef.current?.();
			cleanupListenerRef.current = null;
		}
		const win = getWindow(floating);
		function handleMouseMove(event) {
			const target = getTarget(event);
			if (!contains(floating, target)) setReference(event.clientX, event.clientY);
			else cleanupListener();
		}
		if (!dataRef.current.openEvent || isMouseBasedEvent(dataRef.current.openEvent)) cleanupListenerRef.current = addEventListener(win, "mousemove", handleMouseMove);
		else resetReference(domReference);
		return cleanupListener;
	}, [
		openCheck,
		enabled,
		floating,
		dataRef,
		domReference,
		store,
		setReference,
		resetReference,
		reactive
	]);
	react$1.useEffect(() => () => {
		store.set("positionReference", null);
	}, [store]);
	react$1.useEffect(() => {
		if (enabled && !floating) initialRef.current = false;
	}, [enabled, floating]);
	react$1.useEffect(() => {
		if (!enabled && open) initialRef.current = true;
	}, [enabled, open]);
	const reference = react$1.useMemo(() => {
		function setPointerTypeRef(event) {
			setPointerType(event.pointerType);
		}
		return {
			onPointerDown: setPointerTypeRef,
			onPointerEnter: setPointerTypeRef,
			onMouseMove: handleReferenceEnterOrMove,
			onMouseEnter: handleReferenceEnterOrMove
		};
	}, [handleReferenceEnterOrMove]);
	return react$1.useMemo(() => enabled ? {
		reference,
		trigger: reference
	} : {}, [enabled, reference]);
}
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/floating-ui-react/hooks/useDismiss.mjs
function alwaysFalse() {
	return false;
}
function normalizeProp(normalizable) {
	return {
		escapeKey: typeof normalizable === "boolean" ? normalizable : normalizable?.escapeKey ?? false,
		outsidePress: typeof normalizable === "boolean" ? normalizable : normalizable?.outsidePress ?? true
	};
}
/**
* Closes the floating element when a dismissal is requested — by default, when
* the user presses the `escape` key or outside of the floating element.
* @see https://floating-ui.com/docs/useDismiss
*/
function useDismiss(context, props = {}) {
	const { enabled = true, escapeKey: escapeKey$1 = true, outsidePress: outsidePressProp = true, outsidePressEvent = "sloppy", referencePress = alwaysFalse, bubbles, externalTree } = props;
	const store = "rootStore" in context ? context.rootStore : context;
	const open = store.useState("open");
	const floatingElement = store.useState("floatingElement");
	const { dataRef } = store.context;
	const tree = useFloatingTree(externalTree);
	const outsidePressFn = useStableCallback(typeof outsidePressProp === "function" ? outsidePressProp : () => false);
	const outsidePress$1 = typeof outsidePressProp === "function" ? outsidePressFn : outsidePressProp;
	const outsidePressEnabled = outsidePress$1 !== false;
	const getOutsidePressEventProp = useStableCallback(() => outsidePressEvent);
	const { escapeKey: escapeKeyBubbles, outsidePress: outsidePressBubbles } = normalizeProp(bubbles);
	const pressStartedInsideRef = react$1.useRef(false);
	const pressStartPreventedRef = react$1.useRef(false);
	const suppressNextOutsideClickRef = react$1.useRef(false);
	const isComposingRef = react$1.useRef(false);
	const currentPointerTypeRef = react$1.useRef("");
	const touchStateRef = react$1.useRef(null);
	const cancelDismissOnEndTimeout = useTimeout();
	const clearInsideReactTreeTimeout = useTimeout();
	const clearInsideReactTree = useStableCallback(() => {
		clearInsideReactTreeTimeout.clear();
		dataRef.current.insideReactTree = false;
	});
	const hasBlockingChild = useStableCallback((bubbleKey) => {
		const nodeId = dataRef.current.floatingContext?.nodeId;
		return (tree ? getNodeChildren(tree.nodesRef.current, nodeId) : []).some((child) => child.context?.open && !child.context.dataRef.current[bubbleKey]);
	});
	const isEventWithinOwnElements = useStableCallback((event) => {
		return isEventTargetWithin(event, store.select("floatingElement")) || isEventTargetWithin(event, store.select("domReferenceElement"));
	});
	const closeOnReferencePress = useStableCallback((event) => {
		if (!referencePress()) return;
		store.setOpen(false, createChangeEventDetails(triggerPress, event.nativeEvent));
	});
	const closeOnEscapeKeyDown = useStableCallback((event) => {
		if (!open || !enabled || !escapeKey$1 || event.key !== "Escape") return;
		if (isComposingRef.current) return;
		if (!escapeKeyBubbles && hasBlockingChild("__escapeKeyBubbles")) return;
		const native = isReactEvent(event) ? event.nativeEvent : event;
		const eventDetails = createChangeEventDetails(escapeKey, native);
		store.setOpen(false, eventDetails);
		if (!eventDetails.isCanceled) event.preventDefault();
		if (!escapeKeyBubbles && !eventDetails.isPropagationAllowed) event.stopPropagation();
	});
	const markInsideReactTree = useStableCallback(() => {
		dataRef.current.insideReactTree = true;
		clearInsideReactTreeTimeout.start(0, clearInsideReactTree);
	});
	const markPressStartedInsideReactTree = useStableCallback((event) => {
		if (!open || !enabled || event.button !== 0) return;
		const target = getTarget(event.nativeEvent);
		if (!contains(store.select("floatingElement"), target)) return;
		if (!pressStartedInsideRef.current) {
			pressStartedInsideRef.current = true;
			pressStartPreventedRef.current = false;
		}
	});
	const markInsidePressStartPrevented = useStableCallback((event) => {
		if (!open || !enabled) return;
		if (!(event.defaultPrevented || event.nativeEvent.defaultPrevented)) return;
		if (pressStartedInsideRef.current) pressStartPreventedRef.current = true;
	});
	react$1.useEffect(() => {
		if (!open || !enabled) return;
		dataRef.current.__escapeKeyBubbles = escapeKeyBubbles;
		dataRef.current.__outsidePressBubbles = outsidePressBubbles;
		const compositionTimeout = new Timeout();
		const preventedPressSuppressionTimeout = new Timeout();
		function handleCompositionStart() {
			compositionTimeout.clear();
			isComposingRef.current = true;
		}
		function handleCompositionEnd() {
			compositionTimeout.start(webkit ? 5 : 0, () => {
				isComposingRef.current = false;
			});
		}
		function suppressImmediateOutsideClickAfterPreventedStart() {
			suppressNextOutsideClickRef.current = true;
			preventedPressSuppressionTimeout.start(0, () => {
				suppressNextOutsideClickRef.current = false;
			});
		}
		function resetPressStartState() {
			pressStartedInsideRef.current = false;
			pressStartPreventedRef.current = false;
		}
		function getOutsidePressEvent() {
			const type = currentPointerTypeRef.current;
			const computedType = type === "pen" || !type ? "mouse" : type;
			const outsidePressEventValue = getOutsidePressEventProp();
			const resolved = typeof outsidePressEventValue === "function" ? outsidePressEventValue() : outsidePressEventValue;
			if (typeof resolved === "string") return resolved;
			return resolved[computedType];
		}
		function shouldIgnoreEvent(event) {
			const computedOutsidePressEvent = getOutsidePressEvent();
			return computedOutsidePressEvent === "intentional" && event.type !== "click" || computedOutsidePressEvent === "sloppy" && event.type === "click";
		}
		function isEventWithinFloatingTree(event) {
			const nodeId = dataRef.current.floatingContext?.nodeId;
			const targetIsInsideChildren = tree && getNodeChildren(tree.nodesRef.current, nodeId).some((node) => isEventTargetWithin(event, node.context?.elements.floating));
			return isEventWithinOwnElements(event) || targetIsInsideChildren;
		}
		function closeOnPressOutside(event) {
			if (shouldIgnoreEvent(event)) {
				if (event.type !== "click" && !isEventWithinOwnElements(event)) {
					preventedPressSuppressionTimeout.clear();
					suppressNextOutsideClickRef.current = false;
				}
				clearInsideReactTree();
				return;
			}
			if (dataRef.current.insideReactTree) {
				clearInsideReactTree();
				return;
			}
			const target = getTarget(event);
			const inertSelector = `[${createAttribute("inert")}]`;
			const targetRoot = isElement(target) ? target.getRootNode() : null;
			const markers = Array.from((isShadowRoot(targetRoot) ? targetRoot : ownerDocument(store.select("floatingElement"))).querySelectorAll(inertSelector));
			const triggers = store.context.triggerElements;
			if (target && (triggers.hasElement(target) || triggers.hasMatchingElement((trigger) => contains(trigger, target)))) return;
			let targetRootAncestor = isElement(target) ? target : null;
			while (targetRootAncestor && !isLastTraversableNode(targetRootAncestor)) {
				const nextParent = getParentNode(targetRootAncestor);
				if (isLastTraversableNode(nextParent) || !isElement(nextParent)) break;
				targetRootAncestor = nextParent;
			}
			if (markers.length && isElement(target) && !isRootElement(target) && !contains(target, store.select("floatingElement")) && markers.every((marker) => !contains(targetRootAncestor, marker))) return;
			if (isHTMLElement(target) && !("touches" in event)) {
				const lastTraversableNode = isLastTraversableNode(target);
				const style = getComputedStyle$1(target);
				const scrollRe = /auto|scroll/;
				const isScrollableX = lastTraversableNode || scrollRe.test(style.overflowX);
				const isScrollableY = lastTraversableNode || scrollRe.test(style.overflowY);
				const canScrollX = isScrollableX && target.clientWidth > 0 && target.scrollWidth > target.clientWidth;
				const canScrollY = isScrollableY && target.clientHeight > 0 && target.scrollHeight > target.clientHeight;
				const isRTL = style.direction === "rtl";
				const pressedVerticalScrollbar = canScrollY && (isRTL ? event.offsetX <= target.offsetWidth - target.clientWidth : event.offsetX > target.clientWidth);
				const pressedHorizontalScrollbar = canScrollX && event.offsetY > target.clientHeight;
				if (pressedVerticalScrollbar || pressedHorizontalScrollbar) return;
			}
			if (isEventWithinFloatingTree(event)) return;
			if (getOutsidePressEvent() === "intentional" && suppressNextOutsideClickRef.current) {
				preventedPressSuppressionTimeout.clear();
				suppressNextOutsideClickRef.current = false;
				return;
			}
			if (typeof outsidePress$1 === "function" && !outsidePress$1(event)) return;
			if (hasBlockingChild("__outsidePressBubbles")) return;
			store.setOpen(false, createChangeEventDetails(outsidePress, event));
			clearInsideReactTree();
		}
		function handlePointerDown(event) {
			if (getOutsidePressEvent() !== "sloppy" || event.pointerType === "touch" || !store.select("open") || !enabled || isEventWithinOwnElements(event)) return;
			closeOnPressOutside(event);
		}
		function handleTouchStart(event) {
			if (getOutsidePressEvent() !== "sloppy" || !store.select("open") || !enabled || isEventWithinOwnElements(event)) return;
			const touch = event.touches[0];
			if (touch) {
				touchStateRef.current = {
					startTime: Date.now(),
					startX: touch.clientX,
					startY: touch.clientY,
					dismissOnTouchEnd: false,
					dismissOnMouseDown: true
				};
				cancelDismissOnEndTimeout.start(1e3, () => {
					if (touchStateRef.current) {
						touchStateRef.current.dismissOnTouchEnd = false;
						touchStateRef.current.dismissOnMouseDown = false;
					}
				});
			}
		}
		function addTargetEventListenerOnce(event, listener) {
			const target = getTarget(event);
			if (!target) return;
			const unsubscribe = addEventListener(target, event.type, () => {
				listener(event);
				unsubscribe();
			});
		}
		function handleTouchStartCapture(event) {
			currentPointerTypeRef.current = "touch";
			addTargetEventListenerOnce(event, handleTouchStart);
		}
		function closeOnPressOutsideCapture(event) {
			cancelDismissOnEndTimeout.clear();
			if (event.type === "pointerdown") currentPointerTypeRef.current = event.pointerType;
			if (event.type === "mousedown" && touchStateRef.current && !touchStateRef.current.dismissOnMouseDown) return;
			addTargetEventListenerOnce(event, (targetEvent) => {
				if (targetEvent.type === "pointerdown") handlePointerDown(targetEvent);
				else closeOnPressOutside(targetEvent);
			});
		}
		function handlePressEndCapture(event) {
			if (!pressStartedInsideRef.current) return;
			const pressStartedInsideDefaultPrevented = pressStartPreventedRef.current;
			resetPressStartState();
			if (getOutsidePressEvent() !== "intentional") return;
			if (event.type === "pointercancel") {
				if (pressStartedInsideDefaultPrevented) suppressImmediateOutsideClickAfterPreventedStart();
				return;
			}
			if (isEventWithinFloatingTree(event)) return;
			if (pressStartedInsideDefaultPrevented) {
				suppressImmediateOutsideClickAfterPreventedStart();
				return;
			}
			if (typeof outsidePress$1 === "function" && !outsidePress$1(event)) return;
			preventedPressSuppressionTimeout.clear();
			suppressNextOutsideClickRef.current = true;
			clearInsideReactTree();
		}
		function handleTouchMove(event) {
			if (getOutsidePressEvent() !== "sloppy" || !touchStateRef.current || isEventWithinOwnElements(event)) return;
			const touch = event.touches[0];
			if (!touch) return;
			const deltaX = Math.abs(touch.clientX - touchStateRef.current.startX);
			const deltaY = Math.abs(touch.clientY - touchStateRef.current.startY);
			const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
			if (distance > 5) touchStateRef.current.dismissOnTouchEnd = true;
			if (distance > 10) {
				closeOnPressOutside(event);
				cancelDismissOnEndTimeout.clear();
				touchStateRef.current = null;
			}
		}
		function handleTouchMoveCapture(event) {
			addTargetEventListenerOnce(event, handleTouchMove);
		}
		function handleTouchEnd(event) {
			if (getOutsidePressEvent() !== "sloppy" || !touchStateRef.current || isEventWithinOwnElements(event)) return;
			if (touchStateRef.current.dismissOnTouchEnd) closeOnPressOutside(event);
			cancelDismissOnEndTimeout.clear();
			touchStateRef.current = null;
		}
		function handleTouchEndCapture(event) {
			addTargetEventListenerOnce(event, handleTouchEnd);
		}
		const doc = ownerDocument(floatingElement);
		const unsubscribe = mergeCleanups(escapeKey$1 && mergeCleanups(addEventListener(doc, "keydown", closeOnEscapeKeyDown), addEventListener(doc, "compositionstart", handleCompositionStart), addEventListener(doc, "compositionend", handleCompositionEnd)), outsidePressEnabled && mergeCleanups(addEventListener(doc, "click", closeOnPressOutsideCapture, true), addEventListener(doc, "pointerdown", closeOnPressOutsideCapture, true), addEventListener(doc, "pointerup", handlePressEndCapture, true), addEventListener(doc, "pointercancel", handlePressEndCapture, true), addEventListener(doc, "mousedown", closeOnPressOutsideCapture, true), addEventListener(doc, "mouseup", handlePressEndCapture, true), addEventListener(doc, "touchstart", handleTouchStartCapture, true), addEventListener(doc, "touchmove", handleTouchMoveCapture, true), addEventListener(doc, "touchend", handleTouchEndCapture, true)));
		return () => {
			unsubscribe();
			compositionTimeout.clear();
			preventedPressSuppressionTimeout.clear();
			resetPressStartState();
			suppressNextOutsideClickRef.current = false;
		};
	}, [
		dataRef,
		floatingElement,
		escapeKey$1,
		outsidePressEnabled,
		outsidePress$1,
		open,
		enabled,
		escapeKeyBubbles,
		outsidePressBubbles,
		closeOnEscapeKeyDown,
		clearInsideReactTree,
		getOutsidePressEventProp,
		hasBlockingChild,
		isEventWithinOwnElements,
		tree,
		store,
		cancelDismissOnEndTimeout
	]);
	react$1.useEffect(clearInsideReactTree, [outsidePress$1, clearInsideReactTree]);
	const reference = react$1.useMemo(() => ({
		onKeyDown: closeOnEscapeKeyDown,
		onPointerDown: closeOnReferencePress,
		onClick: closeOnReferencePress
	}), [closeOnEscapeKeyDown, closeOnReferencePress]);
	const floating = react$1.useMemo(() => ({
		onKeyDown: closeOnEscapeKeyDown,
		onPointerDown: markInsidePressStartPrevented,
		onMouseDown: markInsidePressStartPrevented,
		onClickCapture: markInsideReactTree,
		onMouseDownCapture(event) {
			markInsideReactTree();
			markPressStartedInsideReactTree(event);
		},
		onPointerDownCapture(event) {
			markInsideReactTree();
			markPressStartedInsideReactTree(event);
		},
		onMouseUpCapture: markInsideReactTree,
		onTouchEndCapture: markInsideReactTree,
		onTouchMoveCapture: markInsideReactTree
	}), [
		closeOnEscapeKeyDown,
		markInsideReactTree,
		markPressStartedInsideReactTree,
		markInsidePressStartPrevented
	]);
	return react$1.useMemo(() => enabled ? {
		reference,
		floating,
		trigger: reference
	} : {}, [
		enabled,
		reference,
		floating
	]);
}
//#endregion
//#region ../../../node_modules/.pnpm/@floating-ui+core@1.8.0/node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function computeCoordsFromPlacement(_ref, placement, rtl) {
	let { reference, floating } = _ref;
	const sideAxis = getSideAxis(placement);
	const alignmentAxis = getAlignmentAxis(placement);
	const alignLength = getAxisLength(alignmentAxis);
	const side = getSide(placement);
	const isVertical = sideAxis === "y";
	const commonX = reference.x + reference.width / 2 - floating.width / 2;
	const commonY = reference.y + reference.height / 2 - floating.height / 2;
	const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
	let coords;
	switch (side) {
		case "top":
			coords = {
				x: commonX,
				y: reference.y - floating.height
			};
			break;
		case "bottom":
			coords = {
				x: commonX,
				y: reference.y + reference.height
			};
			break;
		case "right":
			coords = {
				x: reference.x + reference.width,
				y: commonY
			};
			break;
		case "left":
			coords = {
				x: reference.x - floating.width,
				y: commonY
			};
			break;
		default: coords = {
			x: reference.x,
			y: reference.y
		};
	}
	const alignment = getAlignment(placement);
	if (alignment) coords[alignmentAxis] += commonAlign * (alignment === "end" ? 1 : -1) * (rtl && isVertical ? -1 : 1);
	return coords;
}
/**
* Resolves with an object of overflow side offsets that determine how much the
* element is overflowing a given clipping boundary on each side.
* - positive = overflowing the boundary by that number of pixels
* - negative = how many pixels left before it will overflow
* - 0 = lies flush with the boundary
* @see https://floating-ui.com/docs/detectOverflow
*/
async function detectOverflow(state, options) {
	var _await$platform$isEle;
	if (options === void 0) options = {};
	const { x, y, platform, rects, elements, strategy } = state;
	const { boundary = "clippingAncestors", rootBoundary = "viewport", elementContext = "floating", altBoundary = false, padding = 0 } = evaluate(options, state);
	const paddingObject = getPaddingObject(padding);
	const element = elements[altBoundary ? elementContext === "floating" ? "reference" : "floating" : elementContext];
	const clippingClientRect = rectToClientRect(await platform.getClippingRect({
		element: ((_await$platform$isEle = await (platform.isElement == null ? void 0 : platform.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform.getDocumentElement == null ? void 0 : platform.getDocumentElement(elements.floating)),
		boundary,
		rootBoundary,
		strategy
	}));
	const rect = elementContext === "floating" ? {
		x,
		y,
		width: rects.floating.width,
		height: rects.floating.height
	} : rects.reference;
	const offsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(elements.floating));
	const offsetScale = await (platform.isElement == null ? void 0 : platform.isElement(offsetParent)) && await (platform.getScale == null ? void 0 : platform.getScale(offsetParent)) || {
		x: 1,
		y: 1
	};
	const elementClientRect = rectToClientRect(platform.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform.convertOffsetParentRelativeRectToViewportRelativeRect({
		elements,
		rect,
		offsetParent,
		strategy
	}) : rect);
	return {
		top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
		bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
		left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
		right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
	};
}
const MAX_RESET_COUNT = 50;
/**
* Computes the `x` and `y` coordinates that will place the floating element
* next to a given reference element.
*
* This export does not have any `platform` interface logic. You will need to
* write one for the platform you are using Floating UI with.
*/
const computePosition$1 = async (reference, floating, config) => {
	const { placement = "bottom", strategy = "absolute", middleware = [], platform } = config;
	const platformWithDetectOverflow = platform.detectOverflow ? platform : {
		...platform,
		detectOverflow
	};
	const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(floating));
	let rects = await platform.getElementRects({
		reference,
		floating,
		strategy
	});
	let { x, y } = computeCoordsFromPlacement(rects, placement, rtl);
	let statefulPlacement = placement;
	let resetCount = 0;
	const middlewareData = {};
	for (let i = 0; i < middleware.length; i++) {
		const currentMiddleware = middleware[i];
		if (!currentMiddleware) continue;
		const { name, fn } = currentMiddleware;
		const { x: nextX, y: nextY, data, reset } = await fn({
			x,
			y,
			initialPlacement: placement,
			placement: statefulPlacement,
			strategy,
			middlewareData,
			rects,
			platform: platformWithDetectOverflow,
			elements: {
				reference,
				floating
			}
		});
		x = nextX != null ? nextX : x;
		y = nextY != null ? nextY : y;
		middlewareData[name] = {
			...middlewareData[name],
			...data
		};
		if (reset && resetCount < MAX_RESET_COUNT) {
			resetCount++;
			if (typeof reset === "object") {
				if (reset.placement) statefulPlacement = reset.placement;
				if (reset.rects) rects = reset.rects === true ? await platform.getElementRects({
					reference,
					floating,
					strategy
				}) : reset.rects;
				({x, y} = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
			}
			i = -1;
		}
	}
	return {
		x,
		y,
		placement: statefulPlacement,
		strategy,
		middlewareData
	};
};
/**
* Optimizes the visibility of the floating element by flipping the `placement`
* in order to keep it in view when the preferred placement(s) will overflow the
* clipping boundary. Alternative to `autoPlacement`.
* @see https://floating-ui.com/docs/flip
*/
const flip$2 = function(options) {
	if (options === void 0) options = {};
	return {
		name: "flip",
		options,
		async fn(state) {
			var _middlewareData$arrow, _middlewareData$flip;
			const { placement, middlewareData, rects, initialPlacement, platform, elements } = state;
			const { mainAxis: checkMainAxis = true, crossAxis: checkCrossAxis = true, fallbackPlacements: specifiedFallbackPlacements, fallbackStrategy = "bestFit", fallbackAxisSideDirection = "none", flipAlignment = true, ...detectOverflowOptions } = evaluate(options, state);
			if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) return {};
			const side = getSide(placement);
			const initialSideAxis = getSideAxis(initialPlacement);
			const isBasePlacement = getSide(initialPlacement) === initialPlacement;
			const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
			const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
			const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== "none";
			if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
			const placements = [initialPlacement, ...fallbackPlacements];
			const overflow = await platform.detectOverflow(state, detectOverflowOptions);
			const overflows = [];
			let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
			if (checkMainAxis) overflows.push(overflow[side]);
			if (checkCrossAxis) {
				const sides = getAlignmentSides(placement, rects, rtl);
				overflows.push(overflow[sides[0]], overflow[sides[1]]);
			}
			overflowsData = [...overflowsData, {
				placement,
				overflows
			}];
			if (!overflows.every((side) => side <= 0)) {
				var _middlewareData$flip2, _overflowsData$filter;
				const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
				const nextPlacement = placements[nextIndex];
				if (nextPlacement) {
					if (!(checkCrossAxis === "alignment" ? initialSideAxis !== getSideAxis(nextPlacement) : false) || overflowsData.every((d) => getSideAxis(d.placement) === initialSideAxis ? d.overflows[0] > 0 : true)) return {
						data: {
							index: nextIndex,
							overflows: overflowsData
						},
						reset: { placement: nextPlacement }
					};
				}
				let resetPlacement = (_overflowsData$filter = overflowsData.filter((d) => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
				if (!resetPlacement) switch (fallbackStrategy) {
					case "bestFit": {
						var _overflowsData$filter2;
						const placement = (_overflowsData$filter2 = overflowsData.filter((d) => {
							if (hasFallbackAxisSideDirection) {
								const currentSideAxis = getSideAxis(d.placement);
								return currentSideAxis === initialSideAxis || currentSideAxis === "y";
							}
							return true;
						}).map((d) => [d.placement, d.overflows.filter((overflow) => overflow > 0).reduce((acc, overflow) => acc + overflow, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
						if (placement) resetPlacement = placement;
						break;
					}
					case "initialPlacement":
						resetPlacement = initialPlacement;
						break;
				}
				if (placement !== resetPlacement) return { reset: { placement: resetPlacement } };
			}
			return {};
		}
	};
};
function getSideOffsets(overflow, rect) {
	return {
		top: overflow.top - rect.height,
		right: overflow.right - rect.width,
		bottom: overflow.bottom - rect.height,
		left: overflow.left - rect.width
	};
}
function isAnySideFullyClipped(overflow) {
	return sides.some((side) => overflow[side] >= 0);
}
/**
* Provides data to hide the floating element in applicable situations, such as
* when it is not in the same clipping context as the reference element.
* @see https://floating-ui.com/docs/hide
*/
const hide$3 = function(options) {
	if (options === void 0) options = {};
	return {
		name: "hide",
		options,
		async fn(state) {
			const { rects, platform } = state;
			const { strategy = "referenceHidden", ...detectOverflowOptions } = evaluate(options, state);
			switch (strategy) {
				case "referenceHidden": {
					const offsets = getSideOffsets(await platform.detectOverflow(state, {
						...detectOverflowOptions,
						elementContext: "reference"
					}), rects.reference);
					return { data: {
						referenceHiddenOffsets: offsets,
						referenceHidden: isAnySideFullyClipped(offsets)
					} };
				}
				case "escaped": {
					const offsets = getSideOffsets(await platform.detectOverflow(state, {
						...detectOverflowOptions,
						altBoundary: true
					}), rects.floating);
					return { data: {
						escapedOffsets: offsets,
						escaped: isAnySideFullyClipped(offsets)
					} };
				}
				default: return {};
			}
		}
	};
};
const originSides = /*#__PURE__*/ new Set(["left", "top"]);
async function convertValueToCoords(state, options) {
	const { placement, platform, elements } = state;
	const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
	const side = getSide(placement);
	const alignment = getAlignment(placement);
	const isVertical = getSideAxis(placement) === "y";
	const mainAxisMulti = originSides.has(side) ? -1 : 1;
	const crossAxisMulti = rtl && isVertical ? -1 : 1;
	const rawValue = evaluate(options, state);
	let { mainAxis, crossAxis, alignmentAxis } = typeof rawValue === "number" ? {
		mainAxis: rawValue,
		crossAxis: 0,
		alignmentAxis: null
	} : {
		mainAxis: rawValue.mainAxis || 0,
		crossAxis: rawValue.crossAxis || 0,
		alignmentAxis: rawValue.alignmentAxis
	};
	if (alignment && typeof alignmentAxis === "number") crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
	return isVertical ? {
		x: crossAxis * crossAxisMulti,
		y: mainAxis * mainAxisMulti
	} : {
		x: mainAxis * mainAxisMulti,
		y: crossAxis * crossAxisMulti
	};
}
/**
* Modifies the placement by translating the floating element along the
* specified axes.
* A number (shorthand for `mainAxis` or distance), or an axes configuration
* object may be passed.
* @see https://floating-ui.com/docs/offset
*/
const offset$2 = function(options) {
	if (options === void 0) options = 0;
	return {
		name: "offset",
		options,
		async fn(state) {
			var _middlewareData$offse, _middlewareData$arrow;
			const { x, y, placement, middlewareData } = state;
			const diffCoords = await convertValueToCoords(state, options);
			if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) return {};
			return {
				x: x + diffCoords.x,
				y: y + diffCoords.y,
				data: {
					...diffCoords,
					placement
				}
			};
		}
	};
};
/**
* Optimizes the visibility of the floating element by shifting it in order to
* keep it in view when it will overflow the clipping boundary.
* @see https://floating-ui.com/docs/shift
*/
const shift$2 = function(options) {
	if (options === void 0) options = {};
	return {
		name: "shift",
		options,
		async fn(state) {
			const { x, y, placement, platform } = state;
			const { mainAxis: checkMainAxis = true, crossAxis: checkCrossAxis = false, limiter = { fn: (_ref) => {
				let { x, y } = _ref;
				return {
					x,
					y
				};
			} }, ...detectOverflowOptions } = evaluate(options, state);
			const coords = {
				x,
				y
			};
			const overflow = await platform.detectOverflow(state, detectOverflowOptions);
			const crossAxis = getSideAxis(placement);
			const mainAxis = getOppositeAxis(crossAxis);
			let mainAxisCoord = coords[mainAxis];
			let crossAxisCoord = coords[crossAxis];
			const clampCoord = (axis, coord) => clamp(coord + overflow[axis === "y" ? "top" : "left"], coord, coord - overflow[axis === "y" ? "bottom" : "right"]);
			if (checkMainAxis) mainAxisCoord = clampCoord(mainAxis, mainAxisCoord);
			if (checkCrossAxis) crossAxisCoord = clampCoord(crossAxis, crossAxisCoord);
			const limitedCoords = limiter.fn({
				...state,
				[mainAxis]: mainAxisCoord,
				[crossAxis]: crossAxisCoord
			});
			return {
				...limitedCoords,
				data: {
					x: limitedCoords.x - x,
					y: limitedCoords.y - y,
					enabled: {
						[mainAxis]: checkMainAxis,
						[crossAxis]: checkCrossAxis
					}
				}
			};
		}
	};
};
/**
* Built-in `limiter` that will stop `shift()` at a certain point.
*/
const limitShift$2 = function(options) {
	if (options === void 0) options = {};
	return {
		options,
		fn(state) {
			var _rawOffset$mainAxis, _rawOffset$crossAxis;
			const { x, y, placement, rects, middlewareData } = state;
			const { offset = 0, mainAxis: checkMainAxis = true, crossAxis: checkCrossAxis = true } = evaluate(options, state);
			const coords = {
				x,
				y
			};
			const crossAxis = getSideAxis(placement);
			const mainAxis = getOppositeAxis(crossAxis);
			let mainAxisCoord = coords[mainAxis];
			let crossAxisCoord = coords[crossAxis];
			const rawOffset = evaluate(offset, state);
			const computedOffset = typeof rawOffset === "number" ? {
				mainAxis: rawOffset,
				crossAxis: 0
			} : {
				mainAxis: (_rawOffset$mainAxis = rawOffset.mainAxis) != null ? _rawOffset$mainAxis : 0,
				crossAxis: (_rawOffset$crossAxis = rawOffset.crossAxis) != null ? _rawOffset$crossAxis : 0
			};
			if (checkMainAxis) {
				const len = mainAxis === "y" ? "height" : "width";
				const limitMin = rects.reference[mainAxis] - rects.floating[len] + computedOffset.mainAxis;
				const limitMax = rects.reference[mainAxis] + rects.reference[len] - computedOffset.mainAxis;
				if (mainAxisCoord < limitMin) mainAxisCoord = limitMin;
				else if (mainAxisCoord > limitMax) mainAxisCoord = limitMax;
			}
			if (checkCrossAxis) {
				var _middlewareData$offse, _middlewareData$offse2;
				const len = mainAxis === "y" ? "width" : "height";
				const isOriginSide = originSides.has(getSide(placement));
				const limitMin = rects.reference[crossAxis] - rects.floating[len] + (isOriginSide ? ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse[crossAxis]) || 0 : 0) + (isOriginSide ? 0 : computedOffset.crossAxis);
				const limitMax = rects.reference[crossAxis] + rects.reference[len] + (isOriginSide ? 0 : ((_middlewareData$offse2 = middlewareData.offset) == null ? void 0 : _middlewareData$offse2[crossAxis]) || 0) - (isOriginSide ? computedOffset.crossAxis : 0);
				if (crossAxisCoord < limitMin) crossAxisCoord = limitMin;
				else if (crossAxisCoord > limitMax) crossAxisCoord = limitMax;
			}
			return {
				[mainAxis]: mainAxisCoord,
				[crossAxis]: crossAxisCoord
			};
		}
	};
};
/**
* Provides data that allows you to change the size of the floating element —
* for instance, prevent it from overflowing the clipping boundary or match the
* width of the reference element.
* @see https://floating-ui.com/docs/size
*/
const size$2 = function(options) {
	if (options === void 0) options = {};
	return {
		name: "size",
		options,
		async fn(state) {
			const { placement, rects, platform, elements } = state;
			const { apply = () => {}, ...detectOverflowOptions } = evaluate(options, state);
			const overflow = await platform.detectOverflow(state, detectOverflowOptions);
			const side = getSide(placement);
			const alignment = getAlignment(placement);
			const isYAxis = getSideAxis(placement) === "y";
			const { width, height } = rects.floating;
			let heightSide;
			let widthSide;
			if (side === "top" || side === "bottom") {
				heightSide = side;
				widthSide = alignment === (await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating)) ? "start" : "end") ? "left" : "right";
			} else {
				widthSide = side;
				heightSide = alignment === "end" ? "top" : "bottom";
			}
			const maximumClippingHeight = height - overflow.top - overflow.bottom;
			const maximumClippingWidth = width - overflow.left - overflow.right;
			const overflowAvailableHeight = min(height - overflow[heightSide], maximumClippingHeight);
			const overflowAvailableWidth = min(width - overflow[widthSide], maximumClippingWidth);
			const shiftData = state.middlewareData.shift;
			const noShift = !shiftData;
			let availableHeight = overflowAvailableHeight;
			let availableWidth = overflowAvailableWidth;
			if (shiftData != null && shiftData.enabled.x) availableWidth = maximumClippingWidth;
			if (shiftData != null && shiftData.enabled.y) availableHeight = maximumClippingHeight;
			if (noShift && !alignment) if (isYAxis) availableWidth = width - 2 * max(overflow.left, overflow.right);
			else availableHeight = height - 2 * max(overflow.top, overflow.bottom);
			await apply({
				...state,
				availableWidth,
				availableHeight
			});
			const nextDimensions = await platform.getDimensions(elements.floating);
			if (width !== nextDimensions.width || height !== nextDimensions.height) return { reset: { rects: true } };
			return {};
		}
	};
};
//#endregion
//#region ../../../node_modules/.pnpm/@floating-ui+dom@1.8.0/node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function getCssDimensions(element) {
	const css = getComputedStyle$1(element);
	let width = parseFloat(css.width) || 0;
	let height = parseFloat(css.height) || 0;
	const hasOffset = isHTMLElement(element);
	const offsetWidth = hasOffset ? element.offsetWidth : width;
	const offsetHeight = hasOffset ? element.offsetHeight : height;
	const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
	if (shouldFallback) {
		width = offsetWidth;
		height = offsetHeight;
	}
	return {
		width,
		height,
		$: shouldFallback
	};
}
function unwrapElement(element) {
	return !isElement(element) ? element.contextElement : element;
}
function getScale(element) {
	const domElement = unwrapElement(element);
	if (!isHTMLElement(domElement)) return createCoords(1);
	const rect = domElement.getBoundingClientRect();
	const { width, height, $ } = getCssDimensions(domElement);
	let x = ($ ? round(rect.width) : rect.width) / width;
	let y = ($ ? round(rect.height) : rect.height) / height;
	if (!x || !Number.isFinite(x)) x = 1;
	if (!y || !Number.isFinite(y)) y = 1;
	return {
		x,
		y
	};
}
const noOffsets = /*#__PURE__*/ createCoords(0);
function getVisualOffsets(element) {
	const win = getWindow(element);
	if (!isWebKit() || !win.visualViewport) return noOffsets;
	return {
		x: win.visualViewport.offsetLeft,
		y: win.visualViewport.offsetTop
	};
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
	if (isFixed === void 0) isFixed = false;
	return !!floatingOffsetParent && isFixed && floatingOffsetParent === getWindow(element);
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
	if (includeScale === void 0) includeScale = false;
	if (isFixedStrategy === void 0) isFixedStrategy = false;
	const clientRect = element.getBoundingClientRect();
	const domElement = unwrapElement(element);
	let scale = createCoords(1);
	if (includeScale) if (offsetParent) {
		if (isElement(offsetParent)) scale = getScale(offsetParent);
	} else scale = getScale(element);
	const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
	let x = (clientRect.left + visualOffsets.x) / scale.x;
	let y = (clientRect.top + visualOffsets.y) / scale.y;
	let width = clientRect.width / scale.x;
	let height = clientRect.height / scale.y;
	if (domElement && offsetParent) {
		const win = getWindow(domElement);
		const offsetWin = isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
		let currentWin = win;
		let currentIFrame = getFrameElement(currentWin);
		while (currentIFrame && offsetWin !== currentWin) {
			const iframeScale = getScale(currentIFrame);
			const iframeRect = currentIFrame.getBoundingClientRect();
			const css = getComputedStyle$1(currentIFrame);
			const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
			const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
			x *= iframeScale.x;
			y *= iframeScale.y;
			width *= iframeScale.x;
			height *= iframeScale.y;
			x += left;
			y += top;
			currentWin = getWindow(currentIFrame);
			currentIFrame = getFrameElement(currentWin);
		}
	}
	return rectToClientRect({
		width,
		height,
		x,
		y
	});
}
function getWindowScrollBarX(element, rect) {
	const leftScroll = getNodeScroll(element).scrollLeft;
	if (!rect) return getBoundingClientRect(getDocumentElement(element)).left + leftScroll;
	return rect.left + leftScroll;
}
function getHTMLOffset(documentElement, scroll) {
	const htmlRect = documentElement.getBoundingClientRect();
	return {
		x: htmlRect.left + scroll.scrollLeft - getWindowScrollBarX(documentElement, htmlRect),
		y: htmlRect.top + scroll.scrollTop
	};
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
	let { elements, rect, offsetParent, strategy } = _ref;
	const isFixed = strategy === "fixed";
	const documentElement = getDocumentElement(offsetParent);
	const topLayer = elements ? isTopLayer(elements.floating) : false;
	if (offsetParent === documentElement || topLayer && isFixed) return rect;
	let scroll = {
		scrollLeft: 0,
		scrollTop: 0
	};
	let scale = createCoords(1);
	const offsets = createCoords(0);
	const isOffsetParentAnElement = isHTMLElement(offsetParent);
	if (isOffsetParentAnElement || !isFixed) {
		if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) scroll = getNodeScroll(offsetParent);
		if (isOffsetParentAnElement) {
			const offsetRect = getBoundingClientRect(offsetParent);
			scale = getScale(offsetParent);
			offsets.x = offsetRect.x + offsetParent.clientLeft;
			offsets.y = offsetRect.y + offsetParent.clientTop;
		}
	}
	const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
	return {
		width: rect.width * scale.x,
		height: rect.height * scale.y,
		x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
		y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y
	};
}
function getClientRects(element) {
	return element.getClientRects ? Array.from(element.getClientRects()) : [];
}
function getDocumentRect(html) {
	const scroll = getNodeScroll(html);
	const body = html.ownerDocument.body;
	const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
	const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
	let x = -scroll.scrollLeft + getWindowScrollBarX(html);
	const y = -scroll.scrollTop;
	if (getComputedStyle$1(body).direction === "rtl") x += max(html.clientWidth, body.clientWidth) - width;
	return {
		width,
		height,
		x,
		y
	};
}
const SCROLLBAR_MAX = 25;
function getViewportRect(element, strategy, rootBoundary) {
	if (rootBoundary === void 0) rootBoundary = "viewport";
	const isLayoutViewport = rootBoundary === "layoutViewport";
	const win = getWindow(element);
	const html = getDocumentElement(element);
	const visualViewport = win.visualViewport;
	let width = html.clientWidth;
	let height = html.clientHeight;
	let x = 0;
	let y = 0;
	if (visualViewport) {
		const layoutRelativeClientCoords = !isWebKit() || strategy === "fixed";
		if (isLayoutViewport) {
			if (!layoutRelativeClientCoords) {
				x = -visualViewport.offsetLeft;
				y = -visualViewport.offsetTop;
			}
		} else {
			width = visualViewport.width;
			height = visualViewport.height;
			if (layoutRelativeClientCoords) {
				x = visualViewport.offsetLeft;
				y = visualViewport.offsetTop;
			}
		}
	}
	if (getWindowScrollBarX(html) <= 0) {
		const doc = html.ownerDocument;
		const body = doc.body;
		const bodyStyles = getComputedStyle(body);
		const bodyMarginInline = doc.compatMode === "CSS1Compat" ? parseFloat(bodyStyles.marginLeft) + parseFloat(bodyStyles.marginRight) || 0 : 0;
		const reservedWidth = Math.abs(html.clientWidth - body.clientWidth - bodyMarginInline);
		const gutter = getComputedStyle(html).scrollbarGutter === "stable both-edges" ? reservedWidth / 2 : reservedWidth;
		if (gutter <= SCROLLBAR_MAX) width -= gutter;
	}
	return {
		width,
		height,
		x,
		y
	};
}
function getInnerBoundingClientRect(element, strategy) {
	const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
	const top = clientRect.top + element.clientTop;
	const left = clientRect.left + element.clientLeft;
	const scale = getScale(element);
	return {
		width: element.clientWidth * scale.x,
		height: element.clientHeight * scale.y,
		x: left * scale.x,
		y: top * scale.y
	};
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
	let rect;
	if (clippingAncestor === "viewport" || clippingAncestor === "layoutViewport") rect = getViewportRect(element, strategy, clippingAncestor);
	else if (clippingAncestor === "document") rect = getDocumentRect(getDocumentElement(element));
	else if (isElement(clippingAncestor)) rect = getInnerBoundingClientRect(clippingAncestor, strategy);
	else {
		const visualOffsets = getVisualOffsets(element);
		rect = {
			x: clippingAncestor.x - visualOffsets.x,
			y: clippingAncestor.y - visualOffsets.y,
			width: clippingAncestor.width,
			height: clippingAncestor.height
		};
	}
	return rectToClientRect(rect);
}
function getClippingElementAncestors(element, cache) {
	const cachedResult = cache.get(element);
	if (cachedResult) return cachedResult;
	let result = getOverflowAncestors(element, [], false).filter((el) => isElement(el) && getNodeName(el) !== "body");
	let lastKeptComputedStyle = null;
	const elementIsFixed = getComputedStyle$1(element).position === "fixed";
	let currentNode = elementIsFixed ? getParentNode(element) : element;
	while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
		const computedStyle = getComputedStyle$1(currentNode);
		const currentNodeIsContaining = isContainingBlock(currentNode);
		const lastPosition = lastKeptComputedStyle ? lastKeptComputedStyle.position : elementIsFixed ? "fixed" : "";
		if (!currentNodeIsContaining && (lastPosition === "fixed" || lastPosition === "absolute" && computedStyle.position === "static")) result = result.filter((ancestor) => ancestor !== currentNode);
		else lastKeptComputedStyle = computedStyle;
		currentNode = getParentNode(currentNode);
	}
	cache.set(element, result);
	return result;
}
function getClippingRect(_ref) {
	let { element, boundary, rootBoundary, strategy } = _ref;
	const clippingAncestors = [...boundary === "clippingAncestors" ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary), rootBoundary];
	const firstRect = getClientRectFromClippingAncestor(element, clippingAncestors[0], strategy);
	let top = firstRect.top;
	let right = firstRect.right;
	let bottom = firstRect.bottom;
	let left = firstRect.left;
	for (let i = 1; i < clippingAncestors.length; i++) {
		const rect = getClientRectFromClippingAncestor(element, clippingAncestors[i], strategy);
		top = max(rect.top, top);
		right = min(rect.right, right);
		bottom = min(rect.bottom, bottom);
		left = max(rect.left, left);
	}
	return {
		width: right - left,
		height: bottom - top,
		x: left,
		y: top
	};
}
function getDimensions(element) {
	const { width, height } = getCssDimensions(element);
	return {
		width,
		height
	};
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
	const isOffsetParentAnElement = isHTMLElement(offsetParent);
	const documentElement = getDocumentElement(offsetParent);
	const isFixed = strategy === "fixed";
	const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
	let scroll = {
		scrollLeft: 0,
		scrollTop: 0
	};
	const offsets = createCoords(0);
	if (isOffsetParentAnElement || !isFixed) {
		if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) scroll = getNodeScroll(offsetParent);
		if (isOffsetParentAnElement) {
			const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
			offsets.x = offsetRect.x + offsetParent.clientLeft;
			offsets.y = offsetRect.y + offsetParent.clientTop;
		}
	}
	if (!isOffsetParentAnElement && documentElement) offsets.x = getWindowScrollBarX(documentElement);
	const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
	return {
		x: rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x,
		y: rect.top + scroll.scrollTop - offsets.y - htmlOffset.y,
		width: rect.width,
		height: rect.height
	};
}
function isStaticPositioned(element) {
	return getComputedStyle$1(element).position === "static";
}
function getTrueOffsetParent(element, polyfill) {
	if (!isHTMLElement(element) || getComputedStyle$1(element).position === "fixed") return null;
	if (polyfill) return polyfill(element);
	let rawOffsetParent = element.offsetParent;
	if (getDocumentElement(element) === rawOffsetParent) rawOffsetParent = rawOffsetParent.ownerDocument.body;
	return rawOffsetParent;
}
function getOffsetParent(element, polyfill) {
	const win = getWindow(element);
	if (isTopLayer(element)) return win;
	if (!isHTMLElement(element)) {
		let svgOffsetParent = getParentNode(element);
		while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
			if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) return svgOffsetParent;
			svgOffsetParent = getParentNode(svgOffsetParent);
		}
		return win;
	}
	let offsetParent = getTrueOffsetParent(element, polyfill);
	while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) offsetParent = getTrueOffsetParent(offsetParent, polyfill);
	if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) return win;
	return offsetParent || getContainingBlock(element) || win;
}
const getElementRects = async function(data) {
	const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
	const getDimensionsFn = this.getDimensions;
	const floatingDimensions = await getDimensionsFn(data.floating);
	return {
		reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
		floating: {
			x: 0,
			y: 0,
			width: floatingDimensions.width,
			height: floatingDimensions.height
		}
	};
};
function isRTL(element) {
	return getComputedStyle$1(element).direction === "rtl";
}
const platform = {
	convertOffsetParentRelativeRectToViewportRelativeRect,
	getDocumentElement,
	getClippingRect,
	getOffsetParent,
	getElementRects,
	getClientRects,
	getDimensions,
	getScale,
	isElement,
	isRTL
};
function rectsAreEqual(a, b) {
	return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
}
function observeMove(element, onMove, ancestorResize) {
	let io = null;
	let timeoutId;
	const root = getDocumentElement(element);
	function cleanup() {
		var _io;
		clearTimeout(timeoutId);
		(_io = io) == null || _io.disconnect();
		io = null;
	}
	function refresh(skip, threshold) {
		if (skip === void 0) skip = false;
		if (threshold === void 0) threshold = 1;
		cleanup();
		const elementRectForRootMargin = element.getBoundingClientRect();
		const { left, top, width, height } = elementRectForRootMargin;
		if (!skip) onMove();
		if (!width || !height) return;
		const insetTop = floor(top);
		const insetRight = floor(root.clientWidth - (left + width));
		const insetBottom = floor(root.clientHeight - (top + height));
		const insetLeft = floor(left);
		const options = {
			rootMargin: -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px",
			threshold: max(0, min(1, threshold)) || 1
		};
		let isFirstUpdate = true;
		function handleObserve(entries) {
			const ratio = entries[0].intersectionRatio;
			if (!rectsAreEqual(elementRectForRootMargin, element.getBoundingClientRect())) return refresh();
			if (ratio !== threshold) {
				if (!isFirstUpdate) return refresh();
				if (!ratio) timeoutId = setTimeout(() => {
					refresh(false, 1e-7);
				}, 1e3);
				else refresh(false, ratio);
			}
			isFirstUpdate = false;
		}
		try {
			io = new IntersectionObserver(handleObserve, {
				...options,
				root: root.ownerDocument
			});
		} catch (_e) {
			io = new IntersectionObserver(handleObserve, options);
		}
		io.observe(element);
	}
	const win = getWindow(element);
	const handleResize = () => refresh(ancestorResize);
	win.addEventListener("resize", handleResize);
	refresh(true);
	return () => {
		win.removeEventListener("resize", handleResize);
		cleanup();
	};
}
/**
* Automatically updates the position of the floating element when necessary.
* Should only be called when the floating element is mounted on the DOM or
* visible on the screen.
* @returns cleanup function that should be invoked when the floating element is
* removed from the DOM or hidden from the screen.
* @see https://floating-ui.com/docs/autoUpdate
*/
function autoUpdate(reference, floating, update, options) {
	if (options === void 0) options = {};
	const { ancestorScroll = true, ancestorResize = true, elementResize = typeof ResizeObserver === "function", layoutShift = typeof IntersectionObserver === "function", animationFrame = false } = options;
	const referenceEl = unwrapElement(reference);
	const ancestors = ancestorScroll || ancestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...floating ? getOverflowAncestors(floating) : []] : [];
	ancestors.forEach((ancestor) => {
		ancestorScroll && ancestor.addEventListener("scroll", update);
		ancestorResize && ancestor.addEventListener("resize", update);
	});
	const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update, ancestorResize) : null;
	let reobserveFrame = -1;
	let resizeObserver = null;
	if (elementResize) {
		resizeObserver = new ResizeObserver((_ref) => {
			let [firstEntry] = _ref;
			if (firstEntry && firstEntry.target === referenceEl && resizeObserver && floating) {
				resizeObserver.unobserve(floating);
				cancelAnimationFrame(reobserveFrame);
				reobserveFrame = requestAnimationFrame(() => {
					var _resizeObserver;
					(_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
				});
			}
			update();
		});
		if (referenceEl && !animationFrame) resizeObserver.observe(referenceEl);
		if (floating) resizeObserver.observe(floating);
	}
	let frameId;
	let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
	if (animationFrame) frameLoop();
	function frameLoop() {
		const nextRefRect = getBoundingClientRect(reference);
		if (prevRefRect && !rectsAreEqual(prevRefRect, nextRefRect)) update();
		prevRefRect = nextRefRect;
		frameId = requestAnimationFrame(frameLoop);
	}
	update();
	return () => {
		var _resizeObserver2;
		ancestors.forEach((ancestor) => {
			ancestorScroll && ancestor.removeEventListener("scroll", update);
			ancestorResize && ancestor.removeEventListener("resize", update);
		});
		cleanupIo?.();
		(_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
		resizeObserver = null;
		if (animationFrame) cancelAnimationFrame(frameId);
	};
}
/**
* Modifies the placement by translating the floating element along the
* specified axes.
* A number (shorthand for `mainAxis` or distance), or an axes configuration
* object may be passed.
* @see https://floating-ui.com/docs/offset
*/
const offset$1 = offset$2;
/**
* Optimizes the visibility of the floating element by shifting it in order to
* keep it in view when it will overflow the clipping boundary.
* @see https://floating-ui.com/docs/shift
*/
const shift$1 = shift$2;
/**
* Optimizes the visibility of the floating element by flipping the `placement`
* in order to keep it in view when the preferred placement(s) will overflow the
* clipping boundary. Alternative to `autoPlacement`.
* @see https://floating-ui.com/docs/flip
*/
const flip$1 = flip$2;
/**
* Provides data that allows you to change the size of the floating element —
* for instance, prevent it from overflowing the clipping boundary or match the
* width of the reference element.
* @see https://floating-ui.com/docs/size
*/
const size$1 = size$2;
/**
* Provides data to hide the floating element in applicable situations, such as
* when it is not in the same clipping context as the reference element.
* @see https://floating-ui.com/docs/hide
*/
const hide$2 = hide$3;
/**
* Built-in `limiter` that will stop `shift()` at a certain point.
*/
const limitShift$1 = limitShift$2;
/**
* Computes the `x` and `y` coordinates that will place the floating element
* next to a given reference element.
*/
const computePosition = (reference, floating, options) => {
	const cache = /* @__PURE__ */ new Map();
	const mergedOptions = options != null ? options : {};
	const platformWithCache = {
		...platform,
		...mergedOptions.platform,
		_c: cache
	};
	return computePosition$1(reference, floating, {
		...mergedOptions,
		platform: platformWithCache
	});
};
//#endregion
//#region ../../../node_modules/.pnpm/@floating-ui+react-dom@2.1.9_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@floating-ui/react-dom/dist/floating-ui.react-dom.mjs
var index = typeof document !== "undefined" ? react$1.useLayoutEffect : function noop() {};
function deepEqual(a, b) {
	if (a === b) return true;
	if (typeof a !== typeof b) return false;
	if (typeof a === "function" && a.toString() === b.toString()) return true;
	let length;
	let i;
	let keys;
	if (a && b && typeof a === "object") {
		if (Array.isArray(a)) {
			length = a.length;
			if (length !== b.length) return false;
			for (i = length; i-- !== 0;) if (!deepEqual(a[i], b[i])) return false;
			return true;
		}
		keys = Object.keys(a);
		length = keys.length;
		if (length !== Object.keys(b).length) return false;
		for (i = length; i-- !== 0;) if (!{}.hasOwnProperty.call(b, keys[i])) return false;
		for (i = length; i-- !== 0;) {
			const key = keys[i];
			if (key === "_owner" && a.$$typeof) continue;
			if (!deepEqual(a[key], b[key])) return false;
		}
		return true;
	}
	return a !== a && b !== b;
}
function getDPR(element) {
	if (typeof window === "undefined") return 1;
	return (element.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function roundByDPR(element, value) {
	const dpr = getDPR(element);
	return Math.round(value * dpr) / dpr;
}
function useLatestRef(value) {
	const ref = react$1.useRef(value);
	index(() => {
		ref.current = value;
	});
	return ref;
}
/**
* Provides data to position a floating element.
* @see https://floating-ui.com/docs/useFloating
*/
function useFloating$1(options) {
	if (options === void 0) options = {};
	const { placement = "bottom", strategy = "absolute", middleware = [], platform, elements: { reference: externalReference, floating: externalFloating } = {}, transform = true, whileElementsMounted, open } = options;
	const [data, setData] = react$1.useState({
		x: 0,
		y: 0,
		strategy,
		placement,
		middlewareData: {},
		isPositioned: false
	});
	const [latestMiddleware, setLatestMiddleware] = react$1.useState(middleware);
	if (!deepEqual(latestMiddleware, middleware)) setLatestMiddleware(middleware);
	const [_reference, _setReference] = react$1.useState(null);
	const [_floating, _setFloating] = react$1.useState(null);
	const setReference = react$1.useCallback((node) => {
		if (node !== referenceRef.current) {
			referenceRef.current = node;
			_setReference(node);
		}
	}, []);
	const setFloating = react$1.useCallback((node) => {
		if (node !== floatingRef.current) {
			floatingRef.current = node;
			_setFloating(node);
		}
	}, []);
	const referenceEl = externalReference || _reference;
	const floatingEl = externalFloating || _floating;
	const referenceRef = react$1.useRef(null);
	const floatingRef = react$1.useRef(null);
	const dataRef = react$1.useRef(data);
	const hasWhileElementsMounted = whileElementsMounted != null;
	const whileElementsMountedRef = useLatestRef(whileElementsMounted);
	const platformRef = useLatestRef(platform);
	const openRef = useLatestRef(open);
	const update = react$1.useCallback(() => {
		if (!referenceRef.current || !floatingRef.current) return;
		const config = {
			placement,
			strategy,
			middleware: latestMiddleware
		};
		if (platformRef.current) config.platform = platformRef.current;
		computePosition(referenceRef.current, floatingRef.current, config).then((data) => {
			const fullData = {
				...data,
				isPositioned: openRef.current !== false
			};
			if (isMountedRef.current && !deepEqual(dataRef.current, fullData)) {
				dataRef.current = fullData;
				react_dom.flushSync(() => {
					setData(fullData);
				});
			}
		});
	}, [
		latestMiddleware,
		placement,
		strategy,
		platformRef,
		openRef
	]);
	index(() => {
		if (open === false && dataRef.current.isPositioned) {
			dataRef.current.isPositioned = false;
			setData((data) => ({
				...data,
				isPositioned: false
			}));
		}
	}, [open]);
	const isMountedRef = react$1.useRef(false);
	index(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	}, []);
	index(() => {
		if (referenceEl) referenceRef.current = referenceEl;
		if (floatingEl) floatingRef.current = floatingEl;
		if (referenceEl && floatingEl) {
			if (whileElementsMountedRef.current) return whileElementsMountedRef.current(referenceEl, floatingEl, update);
			update();
		}
	}, [
		referenceEl,
		floatingEl,
		update,
		whileElementsMountedRef,
		hasWhileElementsMounted
	]);
	const refs = react$1.useMemo(() => ({
		reference: referenceRef,
		floating: floatingRef,
		setReference,
		setFloating
	}), [setReference, setFloating]);
	const elements = react$1.useMemo(() => ({
		reference: referenceEl,
		floating: floatingEl
	}), [referenceEl, floatingEl]);
	const floatingStyles = react$1.useMemo(() => {
		const initialStyles = {
			position: strategy,
			left: 0,
			top: 0
		};
		if (!elements.floating) return initialStyles;
		const x = roundByDPR(elements.floating, data.x);
		const y = roundByDPR(elements.floating, data.y);
		if (transform) return {
			...initialStyles,
			transform: "translate(" + x + "px, " + y + "px)",
			...getDPR(elements.floating) >= 1.5 && { willChange: "transform" }
		};
		return {
			position: strategy,
			left: x,
			top: y
		};
	}, [
		strategy,
		transform,
		elements.floating,
		data.x,
		data.y
	]);
	return react$1.useMemo(() => ({
		...data,
		update,
		refs,
		elements,
		floatingStyles
	}), [
		data,
		update,
		refs,
		elements,
		floatingStyles
	]);
}
/**
* Modifies the placement by translating the floating element along the
* specified axes.
* A number (shorthand for `mainAxis` or distance), or an axes configuration
* object may be passed.
* @see https://floating-ui.com/docs/offset
*/
const offset = (options, deps) => {
	const result = offset$1(options);
	return {
		name: result.name,
		fn: result.fn,
		options: [options, deps]
	};
};
/**
* Optimizes the visibility of the floating element by shifting it in order to
* keep it in view when it will overflow the clipping boundary.
* @see https://floating-ui.com/docs/shift
*/
const shift = (options, deps) => {
	const result = shift$1(options);
	return {
		name: result.name,
		fn: result.fn,
		options: [options, deps]
	};
};
/**
* Built-in `limiter` that will stop `shift()` at a certain point.
*/
const limitShift = (options, deps) => {
	return {
		fn: limitShift$1(options).fn,
		options: [options, deps]
	};
};
/**
* Optimizes the visibility of the floating element by flipping the `placement`
* in order to keep it in view when the preferred placement(s) will overflow the
* clipping boundary. Alternative to `autoPlacement`.
* @see https://floating-ui.com/docs/flip
*/
const flip = (options, deps) => {
	const result = flip$1(options);
	return {
		name: result.name,
		fn: result.fn,
		options: [options, deps]
	};
};
/**
* Provides data that allows you to change the size of the floating element —
* for instance, prevent it from overflowing the clipping boundary or match the
* width of the reference element.
* @see https://floating-ui.com/docs/size
*/
const size = (options, deps) => {
	const result = size$1(options);
	return {
		name: result.name,
		fn: result.fn,
		options: [options, deps]
	};
};
/**
* Provides data to hide the floating element in applicable situations, such as
* when it is not in the same clipping context as the reference element.
* @see https://floating-ui.com/docs/hide
*/
const hide$1 = (options, deps) => {
	const result = hide$2(options);
	return {
		name: result.name,
		fn: result.fn,
		options: [options, deps]
	};
};
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/store/createSelector.mjs
/**
* The NoOptionalParams type is a utility type that checks if a function has optional or default parameters.
* If the function has optional or default parameters, it returns a string literal type with an error message.
* Otherwise, it returns the original function type.
*
* This is used to enforce that the combiner function passed to createSelector does not have optional or default parameters,
* as memoization relies on the Function.length property, which does not account for optional or default parameters.
*/
/**
* Creates a selector function that can be used to derive values from the store's state.
*
* The combiner function can have up to three additional parameters, but it **cannot have optional or default parameters**.
*
* This function accepts up to six functions and combines them into a single selector function.
* The resulting selector will take the state from the combined selectors and any additional parameters required by the combiner.
*
* The return type of the resulting selector is determined by the return type of the combiner function.
*
* @example
* const selector = createSelector(
*  (state) => state.disabled
* );
*
* @example
* const selector = createSelector(
*   (state) => state.disabled,
*   (state) => state.open,
*   (disabled, open) => ({ disabled, open })
* );
*/
const createSelector = (a, b, c, d, e, f, ...other) => {
	if (other.length > 0) throw new Error(process.env.NODE_ENV !== "production" ? "Unsupported number of selectors" : formatErrorMessage(1));
	let selector;
	if (a && b && c && d && e && f) selector = (state, a1, a2, a3) => {
		return f(a(state, a1, a2, a3), b(state, a1, a2, a3), c(state, a1, a2, a3), d(state, a1, a2, a3), e(state, a1, a2, a3), a1, a2, a3);
	};
	else if (a && b && c && d && e) selector = (state, a1, a2, a3) => {
		return e(a(state, a1, a2, a3), b(state, a1, a2, a3), c(state, a1, a2, a3), d(state, a1, a2, a3), a1, a2, a3);
	};
	else if (a && b && c && d) selector = (state, a1, a2, a3) => {
		return d(a(state, a1, a2, a3), b(state, a1, a2, a3), c(state, a1, a2, a3), a1, a2, a3);
	};
	else if (a && b && c) selector = (state, a1, a2, a3) => {
		return c(a(state, a1, a2, a3), b(state, a1, a2, a3), a1, a2, a3);
	};
	else if (a && b) selector = (state, a1, a2, a3) => {
		return b(a(state, a1, a2, a3), a1, a2, a3);
	};
	else if (a) selector = a;
	else throw new Error("Missing arguments");
	return selector;
};
//#endregion
//#region ../../../node_modules/.pnpm/use-sync-external-store@1.6.0_react@18.3.1/node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.production.js
/**
* @license React
* use-sync-external-store-shim.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_use_sync_external_store_shim_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	var React$1 = require("react");
	function is(x, y) {
		return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
	}
	var objectIs = "function" === typeof Object.is ? Object.is : is;
	var useState = React$1.useState;
	var useEffect = React$1.useEffect;
	var useLayoutEffect = React$1.useLayoutEffect;
	var useDebugValue = React$1.useDebugValue;
	function useSyncExternalStore$2(subscribe, getSnapshot) {
		var value = getSnapshot(), _useState = useState({ inst: {
			value,
			getSnapshot
		} }), inst = _useState[0].inst, forceUpdate = _useState[1];
		useLayoutEffect(function() {
			inst.value = value;
			inst.getSnapshot = getSnapshot;
			checkIfSnapshotChanged(inst) && forceUpdate({ inst });
		}, [
			subscribe,
			value,
			getSnapshot
		]);
		useEffect(function() {
			checkIfSnapshotChanged(inst) && forceUpdate({ inst });
			return subscribe(function() {
				checkIfSnapshotChanged(inst) && forceUpdate({ inst });
			});
		}, [subscribe]);
		useDebugValue(value);
		return value;
	}
	function checkIfSnapshotChanged(inst) {
		var latestGetSnapshot = inst.getSnapshot;
		inst = inst.value;
		try {
			var nextValue = latestGetSnapshot();
			return !objectIs(inst, nextValue);
		} catch (error) {
			return !0;
		}
	}
	function useSyncExternalStore$1(subscribe, getSnapshot) {
		return getSnapshot();
	}
	var shim = "undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement ? useSyncExternalStore$1 : useSyncExternalStore$2;
	exports.useSyncExternalStore = void 0 !== React$1.useSyncExternalStore ? React$1.useSyncExternalStore : shim;
}));
//#endregion
//#region ../../../node_modules/.pnpm/use-sync-external-store@1.6.0_react@18.3.1/node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js
/**
* @license React
* use-sync-external-store-shim.development.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_use_sync_external_store_shim_development = /* @__PURE__ */ __commonJSMin(((exports) => {
	"production" !== process.env.NODE_ENV && (function() {
		function is(x, y) {
			return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
		}
		function useSyncExternalStore$2(subscribe, getSnapshot) {
			didWarnOld18Alpha || void 0 === React.startTransition || (didWarnOld18Alpha = !0, console.error("You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."));
			var value = getSnapshot();
			if (!didWarnUncachedGetSnapshot) {
				var cachedValue = getSnapshot();
				objectIs(value, cachedValue) || (console.error("The result of getSnapshot should be cached to avoid an infinite loop"), didWarnUncachedGetSnapshot = !0);
			}
			cachedValue = useState({ inst: {
				value,
				getSnapshot
			} });
			var inst = cachedValue[0].inst, forceUpdate = cachedValue[1];
			useLayoutEffect(function() {
				inst.value = value;
				inst.getSnapshot = getSnapshot;
				checkIfSnapshotChanged(inst) && forceUpdate({ inst });
			}, [
				subscribe,
				value,
				getSnapshot
			]);
			useEffect(function() {
				checkIfSnapshotChanged(inst) && forceUpdate({ inst });
				return subscribe(function() {
					checkIfSnapshotChanged(inst) && forceUpdate({ inst });
				});
			}, [subscribe]);
			useDebugValue(value);
			return value;
		}
		function checkIfSnapshotChanged(inst) {
			var latestGetSnapshot = inst.getSnapshot;
			inst = inst.value;
			try {
				var nextValue = latestGetSnapshot();
				return !objectIs(inst, nextValue);
			} catch (error) {
				return !0;
			}
		}
		function useSyncExternalStore$1(subscribe, getSnapshot) {
			return getSnapshot();
		}
		"undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
		var React = require("react"), objectIs = "function" === typeof Object.is ? Object.is : is, useState = React.useState, useEffect = React.useEffect, useLayoutEffect = React.useLayoutEffect, useDebugValue = React.useDebugValue, didWarnOld18Alpha = !1, didWarnUncachedGetSnapshot = !1, shim = "undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement ? useSyncExternalStore$1 : useSyncExternalStore$2;
		exports.useSyncExternalStore = void 0 !== React.useSyncExternalStore ? React.useSyncExternalStore : shim;
		"undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
	})();
}));
//#endregion
//#region ../../../node_modules/.pnpm/use-sync-external-store@1.6.0_react@18.3.1/node_modules/use-sync-external-store/shim/index.js
var require_shim = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	if (process.env.NODE_ENV === "production") module.exports = require_use_sync_external_store_shim_production();
	else module.exports = require_use_sync_external_store_shim_development();
}));
//#endregion
//#region ../../../node_modules/.pnpm/use-sync-external-store@1.6.0_react@18.3.1/node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.production.js
/**
* @license React
* use-sync-external-store-shim/with-selector.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_with_selector_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	var React = require("react");
	var shim = require_shim();
	function is(x, y) {
		return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
	}
	var objectIs = "function" === typeof Object.is ? Object.is : is;
	var useSyncExternalStore = shim.useSyncExternalStore;
	var useRef = React.useRef;
	var useEffect = React.useEffect;
	var useMemo = React.useMemo;
	var useDebugValue = React.useDebugValue;
	exports.useSyncExternalStoreWithSelector = function(subscribe, getSnapshot, getServerSnapshot, selector, isEqual) {
		var instRef = useRef(null);
		if (null === instRef.current) {
			var inst = {
				hasValue: !1,
				value: null
			};
			instRef.current = inst;
		} else inst = instRef.current;
		instRef = useMemo(function() {
			function memoizedSelector(nextSnapshot) {
				if (!hasMemo) {
					hasMemo = !0;
					memoizedSnapshot = nextSnapshot;
					nextSnapshot = selector(nextSnapshot);
					if (void 0 !== isEqual && inst.hasValue) {
						var currentSelection = inst.value;
						if (isEqual(currentSelection, nextSnapshot)) return memoizedSelection = currentSelection;
					}
					return memoizedSelection = nextSnapshot;
				}
				currentSelection = memoizedSelection;
				if (objectIs(memoizedSnapshot, nextSnapshot)) return currentSelection;
				var nextSelection = selector(nextSnapshot);
				if (void 0 !== isEqual && isEqual(currentSelection, nextSelection)) return memoizedSnapshot = nextSnapshot, currentSelection;
				memoizedSnapshot = nextSnapshot;
				return memoizedSelection = nextSelection;
			}
			var hasMemo = !1, memoizedSnapshot, memoizedSelection, maybeGetServerSnapshot = void 0 === getServerSnapshot ? null : getServerSnapshot;
			return [function() {
				return memoizedSelector(getSnapshot());
			}, null === maybeGetServerSnapshot ? void 0 : function() {
				return memoizedSelector(maybeGetServerSnapshot());
			}];
		}, [
			getSnapshot,
			getServerSnapshot,
			selector,
			isEqual
		]);
		var value = useSyncExternalStore(subscribe, instRef[0], instRef[1]);
		useEffect(function() {
			inst.hasValue = !0;
			inst.value = value;
		}, [value]);
		useDebugValue(value);
		return value;
	};
}));
//#endregion
//#region ../../../node_modules/.pnpm/use-sync-external-store@1.6.0_react@18.3.1/node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.development.js
/**
* @license React
* use-sync-external-store-shim/with-selector.development.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_with_selector_development = /* @__PURE__ */ __commonJSMin(((exports) => {
	"production" !== process.env.NODE_ENV && (function() {
		function is(x, y) {
			return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
		}
		"undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
		var React = require("react"), shim = require_shim(), objectIs = "function" === typeof Object.is ? Object.is : is, useSyncExternalStore = shim.useSyncExternalStore, useRef = React.useRef, useEffect = React.useEffect, useMemo = React.useMemo, useDebugValue = React.useDebugValue;
		exports.useSyncExternalStoreWithSelector = function(subscribe, getSnapshot, getServerSnapshot, selector, isEqual) {
			var instRef = useRef(null);
			if (null === instRef.current) {
				var inst = {
					hasValue: !1,
					value: null
				};
				instRef.current = inst;
			} else inst = instRef.current;
			instRef = useMemo(function() {
				function memoizedSelector(nextSnapshot) {
					if (!hasMemo) {
						hasMemo = !0;
						memoizedSnapshot = nextSnapshot;
						nextSnapshot = selector(nextSnapshot);
						if (void 0 !== isEqual && inst.hasValue) {
							var currentSelection = inst.value;
							if (isEqual(currentSelection, nextSnapshot)) return memoizedSelection = currentSelection;
						}
						return memoizedSelection = nextSnapshot;
					}
					currentSelection = memoizedSelection;
					if (objectIs(memoizedSnapshot, nextSnapshot)) return currentSelection;
					var nextSelection = selector(nextSnapshot);
					if (void 0 !== isEqual && isEqual(currentSelection, nextSelection)) return memoizedSnapshot = nextSnapshot, currentSelection;
					memoizedSnapshot = nextSnapshot;
					return memoizedSelection = nextSelection;
				}
				var hasMemo = !1, memoizedSnapshot, memoizedSelection, maybeGetServerSnapshot = void 0 === getServerSnapshot ? null : getServerSnapshot;
				return [function() {
					return memoizedSelector(getSnapshot());
				}, null === maybeGetServerSnapshot ? void 0 : function() {
					return memoizedSelector(maybeGetServerSnapshot());
				}];
			}, [
				getSnapshot,
				getServerSnapshot,
				selector,
				isEqual
			]);
			var value = useSyncExternalStore(subscribe, instRef[0], instRef[1]);
			useEffect(function() {
				inst.hasValue = !0;
				inst.value = value;
			}, [value]);
			useDebugValue(value);
			return value;
		};
		"undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
	})();
}));
//#endregion
//#region ../../../node_modules/.pnpm/use-sync-external-store@1.6.0_react@18.3.1/node_modules/use-sync-external-store/shim/with-selector.js
var require_with_selector = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	if (process.env.NODE_ENV === "production") module.exports = require_with_selector_production();
	else module.exports = require_with_selector_development();
}));
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/fastHooks.mjs
const hooks = [];
let currentInstance = void 0;
function getInstance() {
	return currentInstance;
}
function register(hook) {
	hooks.push(hook);
}
function fastComponent(fn) {
	const FastComponent = (props, forwardedRef) => {
		const instance = useRefWithInit(createInstance).current;
		let result;
		try {
			currentInstance = instance;
			for (const hook of hooks) hook.before(instance);
			result = fn(props, forwardedRef);
			for (const hook of hooks) hook.after(instance);
			instance.didInitialize = true;
		} finally {
			currentInstance = void 0;
		}
		return result;
	};
	FastComponent.displayName = fn.displayName || fn.name;
	return FastComponent;
}
function fastComponentRef(fn) {
	return /*#__PURE__*/ react$1.forwardRef(fastComponent(fn));
}
function createInstance() {
	return { didInitialize: false };
}
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/store/useStore.mjs
var import_shim = require_shim();
var import_with_selector = require_with_selector();
const useStoreImplementation = isReactVersionAtLeast(19) ? useStoreFast : useStoreLegacy;
function useStore(store, selector, a1, a2, a3) {
	return useStoreImplementation(store, selector, a1, a2, a3);
}
function useStoreR19(store, selector, a1, a2, a3) {
	const getSelection = react$1.useCallback(() => selector(store.getSnapshot(), a1, a2, a3), [
		store,
		selector,
		a1,
		a2,
		a3
	]);
	return (0, import_shim.useSyncExternalStore)(store.subscribe, getSelection, getSelection);
}
register({
	before(instance) {
		instance.syncIndex = 0;
		if (!instance.didInitialize) {
			instance.syncTick = 1;
			instance.syncHooks = [];
			instance.didChangeStore = true;
			instance.getSnapshot = () => {
				let didChange = false;
				for (let i = 0; i < instance.syncHooks.length; i += 1) {
					const hook = instance.syncHooks[i];
					const value = hook.selector(hook.store.state, hook.a1, hook.a2, hook.a3);
					if (!Object.is(hook.value, value)) {
						didChange = true;
						hook.value = value;
					}
				}
				if (didChange) instance.syncTick += 1;
				return instance.syncTick;
			};
		}
	},
	after(instance) {
		if (instance.syncHooks.length > 0) {
			if (instance.didChangeStore) {
				instance.didChangeStore = false;
				instance.subscribe = (onStoreChange) => {
					const stores = /* @__PURE__ */ new Set();
					for (const hook of instance.syncHooks) stores.add(hook.store);
					const unsubscribes = [];
					for (const store of stores) unsubscribes.push(store.subscribe(onStoreChange));
					return () => {
						for (const unsubscribe of unsubscribes) unsubscribe();
					};
				};
			}
			(0, import_shim.useSyncExternalStore)(instance.subscribe, instance.getSnapshot, instance.getSnapshot);
		}
	}
});
function useStoreFast(store, selector, a1, a2, a3) {
	const instance = getInstance();
	if (!instance) return useStoreR19(store, selector, a1, a2, a3);
	const index = instance.syncIndex;
	instance.syncIndex += 1;
	let hook;
	if (!instance.didInitialize) {
		hook = {
			store,
			selector,
			a1,
			a2,
			a3,
			value: selector(store.getSnapshot(), a1, a2, a3)
		};
		instance.syncHooks.push(hook);
	} else {
		hook = instance.syncHooks[index];
		if (hook.store !== store || hook.selector !== selector || !Object.is(hook.a1, a1) || !Object.is(hook.a2, a2) || !Object.is(hook.a3, a3)) {
			if (hook.store !== store) instance.didChangeStore = true;
			hook.store = store;
			hook.selector = selector;
			hook.a1 = a1;
			hook.a2 = a2;
			hook.a3 = a3;
			hook.value = selector(store.getSnapshot(), a1, a2, a3);
		}
	}
	return hook.value;
}
function useStoreLegacy(store, selector, a1, a2, a3) {
	return (0, import_with_selector.useSyncExternalStoreWithSelector)(store.subscribe, store.getSnapshot, store.getSnapshot, (state) => selector(state, a1, a2, a3));
}
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/store/Store.mjs
/**
* A data store implementation that allows subscribing to state changes and updating the state.
* It uses an observer pattern to notify subscribers when the state changes.
*/
var Store = class {
	/**
	* The current state of the store.
	* This property is updated immediately when the state changes as a result of calling {@link setState}, {@link update}, or {@link set}.
	* To subscribe to state changes, use the {@link useState} method. The value returned by {@link useState} is updated after the component renders (similarly to React's useState).
	* The values can be used directly (to avoid subscribing to the store) in effects or event handlers.
	*
	* Do not modify properties in state directly. Instead, use the provided methods to ensure proper state management and listener notification.
	*/
	constructor(state) {
		this.state = state;
		this.listeners = /* @__PURE__ */ new Set();
		this.updateTick = 0;
	}
	/**
	* Registers a listener that will be called whenever the store's state changes.
	*
	* @param fn The listener function to be called on state changes.
	* @returns A function to unsubscribe the listener.
	*/
	subscribe = (fn) => {
		this.listeners.add(fn);
		return () => {
			this.listeners.delete(fn);
		};
	};
	/**
	* Returns the current state of the store.
	*/
	getSnapshot = () => {
		return this.state;
	};
	/**
	* Updates the entire store's state and notifies all registered listeners.
	*
	* @param newState The new state to set for the store.
	*/
	setState(newState) {
		if (this.state === newState) return;
		this.state = newState;
		this.updateTick += 1;
		const currentTick = this.updateTick;
		for (const listener of this.listeners) {
			if (currentTick !== this.updateTick) return;
			listener(newState);
		}
	}
	/**
	* Merges the provided changes into the current state and notifies listeners if there are changes.
	*
	* @param changes An object containing the changes to apply to the current state.
	*/
	update(changes) {
		for (const key in changes) if (!Object.is(this.state[key], changes[key])) {
			this.setState({
				...this.state,
				...changes
			});
			return;
		}
	}
	/**
	* Sets a specific key in the store's state to a new value and notifies listeners if the value has changed.
	*
	* @param key The key in the store's state to update.
	* @param value The new value to set for the specified key.
	*/
	set(key, value) {
		if (!Object.is(this.state[key], value)) this.setState({
			...this.state,
			[key]: value
		});
	}
	/**
	* Gives the state a new reference and updates all registered listeners.
	*/
	notifyAll() {
		const newState = { ...this.state };
		this.setState(newState);
	}
	use(selector, a1, a2, a3) {
		return useStore(this, selector, a1, a2, a3);
	}
};
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+utils@0.3.1_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/store/ReactStore.mjs
/**
* A Store that supports controlled state keys, non-reactive values and provides utility methods for React.
*/
var ReactStore = class extends Store {
	/**
	* Creates a new ReactStore instance.
	*
	* @param state Initial state of the store.
	* @param context Non-reactive context values.
	* @param selectors Optional selectors for use with `useState`.
	*/
	constructor(state, context = {}, selectors) {
		super(state);
		this.context = context;
		this.selectors = selectors;
	}
	/**
	* Non-reactive values such as refs, callbacks, etc.
	*/
	/**
	* Synchronizes a single external value into the store.
	*
	* Note that the while the value in `state` is updated immediately, the value returned
	* by `useState` is updated before the next render (similarly to React's `useState`).
	*/
	useSyncedValue(key, value) {
		react$1.useDebugValue(key);
		const store = this;
		useIsoLayoutEffect(() => {
			if (store.state[key] !== value) store.set(key, value);
		}, [
			store,
			key,
			value
		]);
	}
	/**
	* Synchronizes a single external value into the store and
	* cleans it up (sets to `undefined`) on unmount.
	*
	* Note that the while the value in `state` is updated immediately, the value returned
	* by `useState` is updated before the next render (similarly to React's `useState`).
	*/
	useSyncedValueWithCleanup(key, value) {
		const store = this;
		useIsoLayoutEffect(() => {
			if (store.state[key] !== value) store.set(key, value);
			return () => {
				store.set(key, void 0);
			};
		}, [
			store,
			key,
			value
		]);
	}
	/**
	* Synchronizes multiple external values into the store.
	*
	* Note that the while the values in `state` are updated immediately, the values returned
	* by `useState` are updated before the next render (similarly to React's `useState`).
	*/
	useSyncedValues(statePart) {
		const store = this;
		if (process.env.NODE_ENV !== "production") {
			react$1.useDebugValue(statePart, (p) => Object.keys(p));
			const keys = react$1.useRef(Object.keys(statePart)).current;
			const nextKeys = Object.keys(statePart);
			if (keys.length !== nextKeys.length || keys.some((key, index) => key !== nextKeys[index])) console.error("ReactStore.useSyncedValues expects the same prop keys on every render. Keys should be stable.");
		}
		useIsoLayoutEffect(() => {
			store.update(statePart);
		}, [store, ...Object.values(statePart)]);
	}
	/**
	* Registers a controllable prop pair (`controlled`, `defaultValue`) for a specific key. If `controlled`
	* is non-undefined, the store's state at `key` is updated to match `controlled`.
	*/
	useControlledProp(key, controlled) {
		react$1.useDebugValue(key);
		const store = this;
		const isControlled = controlled !== void 0;
		useIsoLayoutEffect(() => {
			if (isControlled && !Object.is(store.state[key], controlled)) store.setState({
				...store.state,
				[key]: controlled
			});
		}, [
			store,
			key,
			controlled,
			isControlled
		]);
		if (process.env.NODE_ENV !== "production") {
			const cache = this.controlledValues ??= /* @__PURE__ */ new Map();
			if (!cache.has(key)) cache.set(key, isControlled);
			const previouslyControlled = cache.get(key);
			if (previouslyControlled !== void 0 && previouslyControlled !== isControlled) console.error(`A component is changing the ${isControlled ? "" : "un"}controlled state of ${key.toString()} to be ${isControlled ? "un" : ""}controlled. Elements should not switch from uncontrolled to controlled (or vice versa).`);
		}
	}
	/** Gets the current value from the store using a selector with the provided key.
	*
	* @param key Key of the selector to use.
	*/
	select(key, a1, a2, a3) {
		const selector = this.selectors[key];
		return selector(this.state, a1, a2, a3);
	}
	/**
	* Returns a value from the store's state using a selector function.
	* Used to subscribe to specific parts of the state.
	* This methods causes a rerender whenever the selected state changes.
	*
	* @param key Key of the selector to use.
	*/
	useState(key, a1, a2, a3) {
		react$1.useDebugValue(key);
		return useStore(this, this.selectors[key], a1, a2, a3);
	}
	/**
	* Wraps a function with `useStableCallback` to ensure it has a stable reference
	* and assigns it to the context.
	*
	* @param key Key of the event callback. Must be a function in the context.
	* @param fn Function to assign.
	*/
	useContextCallback(key, fn) {
		react$1.useDebugValue(key);
		const stableFunction = useStableCallback(fn ?? NOOP);
		this.context[key] = stableFunction;
	}
	/**
	* Returns a stable setter function for a specific key in the store's state.
	* It's commonly used to pass as a ref callback to React elements.
	*
	* @param key Key of the state to set.
	*/
	useStateSetter(key) {
		const ref = react$1.useRef(void 0);
		if (ref.current === void 0) ref.current = (value) => {
			this.set(key, value);
		};
		return ref.current;
	}
	/**
	* Observes changes derived from the store's selectors and calls the listener when the selected value changes.
	*
	* @param key Key of the selector to observe.
	* @param listener Listener function called when the selector result changes.
	*/
	observe(selector, listener) {
		let selectFn;
		if (typeof selector === "function") selectFn = selector;
		else selectFn = this.selectors[selector];
		let prevValue = selectFn(this.state);
		listener(prevValue, prevValue, this);
		return this.subscribe((nextState) => {
			const nextValue = selectFn(nextState);
			if (!Object.is(prevValue, nextValue)) {
				const oldValue = prevValue;
				prevValue = nextValue;
				listener(nextValue, oldValue, this);
			}
		});
	}
};
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/floating-ui-react/components/FloatingRootStore.mjs
const selectors$1 = {
	open: createSelector((state) => state.open),
	transitionStatus: createSelector((state) => state.transitionStatus),
	domReferenceElement: createSelector((state) => state.domReferenceElement),
	referenceElement: createSelector((state) => state.positionReference ?? state.referenceElement),
	floatingElement: createSelector((state) => state.floatingElement),
	floatingId: createSelector((state) => state.floatingId)
};
var FloatingRootStore = class extends ReactStore {
	constructor(options) {
		const { syncOnly, nested, onOpenChange, triggerElements, ...initialState } = options;
		super({
			...initialState,
			positionReference: initialState.referenceElement,
			domReferenceElement: initialState.referenceElement
		}, {
			onOpenChange,
			dataRef: { current: {} },
			events: createEventEmitter(),
			nested,
			triggerElements
		}, selectors$1);
		this.syncOnly = syncOnly;
	}
	/**
	* Syncs the event used by hover logic to distinguish hover-open from click-like interaction.
	*/
	syncOpenEvent = (newOpen, event) => {
		if (!newOpen || !this.state.open || event != null && isClickLikeEvent(event)) this.context.dataRef.current.openEvent = newOpen ? event : void 0;
	};
	/**
	* Runs the root-owned side effects for an open state change.
	*/
	dispatchOpenChange = (newOpen, eventDetails) => {
		this.syncOpenEvent(newOpen, eventDetails.event);
		const details = {
			open: newOpen,
			reason: eventDetails.reason,
			nativeEvent: eventDetails.event,
			nested: this.context.nested,
			triggerElement: eventDetails.trigger
		};
		this.context.events.emit("openchange", details);
	};
	/**
	* Emits the `openchange` event through the internal event emitter and calls the `onOpenChange` handler with the provided arguments.
	*
	* @param newOpen The new open state.
	* @param eventDetails Details about the event that triggered the open state change.
	*/
	setOpen = (newOpen, eventDetails) => {
		if (this.syncOnly) {
			this.context.onOpenChange?.(newOpen, eventDetails);
			return;
		}
		this.dispatchOpenChange(newOpen, eventDetails);
		this.context.onOpenChange?.(newOpen, eventDetails);
	};
};
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/floating-ui-react/hooks/useSyncedFloatingRootContext.mjs
/**
* Keeps a FloatingRootStore in sync with the provided PopupStore.
* Uses the provided FloatingRootStore when one exists, otherwise creates one once and updates it on every render.
*/
function useSyncedFloatingRootContext(options) {
	const { popupStore, treatPopupAsFloatingElement = false, floatingRootContext: floatingRootContextProp, floatingId, nested, onOpenChange } = options;
	const open = popupStore.useState("open");
	const referenceElement = popupStore.useState("activeTriggerElement");
	const floatingElement = popupStore.useState(treatPopupAsFloatingElement ? "popupElement" : "positionerElement");
	const triggerElements = popupStore.context.triggerElements;
	const handleOpenChange = onOpenChange;
	const internalStoreRef = react$1.useRef(null);
	if (floatingRootContextProp === void 0 && internalStoreRef.current === null) internalStoreRef.current = new FloatingRootStore({
		open,
		transitionStatus: void 0,
		referenceElement,
		floatingElement,
		triggerElements,
		onOpenChange: handleOpenChange,
		floatingId,
		syncOnly: true,
		nested
	});
	const store = floatingRootContextProp ?? internalStoreRef.current;
	popupStore.useSyncedValue("floatingId", floatingId);
	useIsoLayoutEffect(() => {
		const valuesToSync = {
			open,
			floatingId,
			referenceElement,
			floatingElement
		};
		if (isElement(referenceElement)) valuesToSync.domReferenceElement = referenceElement;
		if (store.state.positionReference === store.state.referenceElement) valuesToSync.positionReference = referenceElement;
		store.update(valuesToSync);
	}, [
		open,
		floatingId,
		referenceElement,
		floatingElement,
		store
	]);
	store.context.onOpenChange = handleOpenChange;
	store.context.nested = nested;
	return store;
}
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/utils/popups/popupStoreUtils.mjs
const FOCUSABLE_POPUP_PROPS = {
	tabIndex: -1,
	[FOCUSABLE_ATTRIBUTE]: ""
};
function usePopupStore(externalStore, createStore, treatPopupAsFloatingElement = false) {
	const floatingId = useId$1();
	const nested = useFloatingParentNodeId() != null;
	const internalStoreRef = react$1.useRef(null);
	if (externalStore === void 0 && internalStoreRef.current === null) internalStoreRef.current = createStore(floatingId, nested);
	const store = externalStore ?? internalStoreRef.current;
	useSyncedFloatingRootContext({
		popupStore: store,
		treatPopupAsFloatingElement,
		floatingRootContext: store.state.floatingRootContext,
		floatingId,
		nested,
		onOpenChange: store.setOpen
	});
	return {
		store,
		internalStore: internalStoreRef.current
	};
}
/**
* Returns a callback ref that registers/unregisters the trigger element in the store.
*
* @param store The Store instance where the trigger should be registered.
*/
function useTriggerRegistration(id, store) {
	const registeredElementIdRef = react$1.useRef(null);
	const registeredElementRef = react$1.useRef(null);
	return react$1.useCallback((element) => {
		if (id === void 0) return;
		let shouldSyncTriggerCount = false;
		if (registeredElementIdRef.current !== null) {
			const registeredId = registeredElementIdRef.current;
			const registeredElement = registeredElementRef.current;
			const currentElement = store.context.triggerElements.getById(registeredId);
			if (registeredElement && currentElement === registeredElement) {
				store.context.triggerElements.delete(registeredId);
				shouldSyncTriggerCount = true;
			}
			registeredElementIdRef.current = null;
			registeredElementRef.current = null;
		}
		if (element !== null) {
			registeredElementIdRef.current = id;
			registeredElementRef.current = element;
			store.context.triggerElements.add(id, element);
			shouldSyncTriggerCount = true;
		}
		if (shouldSyncTriggerCount) {
			const triggerCount = store.context.triggerElements.size;
			if (store.select("open") && store.state.triggerCount !== triggerCount) store.set("triggerCount", triggerCount);
		}
	}, [store, id]);
}
function setPopupOpenState(state, open, trigger, preventUnmountOnClose = false) {
	if (open) state.preventUnmountingOnClose = false;
	else if (preventUnmountOnClose) state.preventUnmountingOnClose = true;
	const triggerId = trigger?.id ?? null;
	if (triggerId || open) {
		state.activeTriggerId = triggerId;
		state.activeTriggerElement = trigger ?? null;
	}
}
function attachPreventUnmountOnClose(eventDetails) {
	let preventUnmountOnClose = false;
	eventDetails.preventUnmountOnClose = () => {
		preventUnmountOnClose = true;
	};
	return () => preventUnmountOnClose;
}
/**
* Runs the shared open-change sequence for a popup store: notifies `onOpenChange`,
* honors cancellation, dispatches the floating root change, maps the reason to an
* `instantType`, and commits the state update (synchronously for hover so
* `getAnimations()` observes it). Stores supply their own differences via
* `extraState` (e.g. the last change reason) and `onBeforeDispatch` (e.g. updating
* inline-rect coordinates).
*/
function applyPopupOpenChange(store, nextOpen, eventDetails, options = {}) {
	const reason = eventDetails.reason;
	const isHover = reason === triggerHover;
	const isFocusOpen = nextOpen && reason === "trigger-focus";
	const isDismissClose = !nextOpen && (reason === "trigger-press" || reason === "escape-key");
	const shouldPreventUnmountOnClose = attachPreventUnmountOnClose(eventDetails);
	store.context.onOpenChange?.(nextOpen, eventDetails);
	if (eventDetails.isCanceled) return;
	options.onBeforeDispatch?.();
	store.state.floatingRootContext.dispatchOpenChange(nextOpen, eventDetails);
	const changeState = () => {
		const updatedState = {
			...options.extraState,
			open: nextOpen
		};
		if (isFocusOpen) updatedState.instantType = "focus";
		else if (isDismissClose) updatedState.instantType = "dismiss";
		else if (isHover) updatedState.instantType = void 0;
		setPopupOpenState(updatedState, nextOpen, eventDetails.trigger, shouldPreventUnmountOnClose());
		store.update(updatedState);
	};
	if (isHover) react_dom.flushSync(changeState);
	else changeState();
}
function useInitialOpenSync(store, openProp, defaultOpen, defaultTriggerId) {
	useOnFirstRender(() => {
		if (openProp === void 0 && store.state.open === false && defaultOpen) store.state = {
			...store.state,
			open: true,
			activeTriggerId: defaultTriggerId,
			preventUnmountingOnClose: false
		};
	});
}
/**
* Sets up trigger data forwarding to the store.
*
* @param triggerId Id of the trigger.
* @param triggerElementRef Ref for the trigger DOM element.
* @param store The Store instance managing the popup state.
* @param stateUpdates An object with state updates to apply when the trigger is active.
*/
function useTriggerDataForwarding(triggerId, triggerElementRef, store, stateUpdates) {
	const isMountedByThisTrigger = store.useState("isMountedByTrigger", triggerId);
	const baseRegisterTrigger = useTriggerRegistration(triggerId, store);
	const registerTrigger = useStableCallback((element) => {
		baseRegisterTrigger(element);
		if (!element) return;
		const open = store.select("open");
		const activeTriggerId = store.select("activeTriggerId");
		if (activeTriggerId === triggerId) {
			store.update({
				activeTriggerElement: element,
				...open ? stateUpdates : null
			});
			return;
		}
		if (activeTriggerId == null && open) store.update({
			activeTriggerId: triggerId,
			activeTriggerElement: element,
			...stateUpdates
		});
	});
	useIsoLayoutEffect(() => {
		if (isMountedByThisTrigger) store.update({
			activeTriggerElement: triggerElementRef.current,
			...stateUpdates
		});
	}, [
		isMountedByThisTrigger,
		store,
		triggerElementRef,
		...Object.values(stateUpdates)
	]);
	return {
		registerTrigger,
		isMountedByThisTrigger
	};
}
/**
* Keeps trigger registration state synchronized while the popup is open.
*
* When a popup opens without an explicit trigger id and exactly one trigger is registered, that
* trigger is claimed as the active trigger. When the active trigger id is still registered but its
* element changed, the active element is refreshed. When the active trigger unregisters, the
* default path preserves existing ownership so non-closing popup families do not silently claim a
* different trigger while staying open.
*
* If `closeOnActiveTriggerUnmount` is enabled, unregistering the active trigger requests a close
* after a microtask so a same-tick replacement trigger with the same id can register first.
*
* This should be called on the Root part.
*
* @param store The Store instance managing the popup state.
* @param options Options for active trigger unmount behavior.
*/
function useImplicitActiveTrigger(store, options = {}) {
	const { closeOnActiveTriggerUnmount = false } = options;
	const open = store.useState("open");
	useIsoLayoutEffect(() => {
		if (!open) {
			if (store.state.triggerCount !== 0) store.set("triggerCount", 0);
			return;
		}
		const triggerCount = store.context.triggerElements.size;
		const stateUpdates = {};
		if (store.state.triggerCount !== triggerCount) stateUpdates.triggerCount = triggerCount;
		const activeTriggerId = store.select("activeTriggerId");
		let lostActiveTriggerId = null;
		if (activeTriggerId) {
			const activeTriggerElement = store.context.triggerElements.getById(activeTriggerId);
			if (!activeTriggerElement) lostActiveTriggerId = activeTriggerId;
			else if (activeTriggerElement !== store.state.activeTriggerElement) stateUpdates.activeTriggerElement = activeTriggerElement;
		}
		if (!lostActiveTriggerId && !activeTriggerId && triggerCount === 1) {
			const iteratorResult = store.context.triggerElements.entries().next();
			if (!iteratorResult.done) {
				const [implicitTriggerId, implicitTriggerElement] = iteratorResult.value;
				stateUpdates.activeTriggerId = implicitTriggerId;
				stateUpdates.activeTriggerElement = implicitTriggerElement;
			}
		}
		if (stateUpdates.triggerCount !== void 0 || stateUpdates.activeTriggerId !== void 0 || stateUpdates.activeTriggerElement !== void 0) store.update(stateUpdates);
		if (lostActiveTriggerId) {
			if (closeOnActiveTriggerUnmount) queueMicrotask(() => {
				if (store.select("open") && store.select("activeTriggerId") === lostActiveTriggerId && !store.context.triggerElements.getById(lostActiveTriggerId)) {
					const eventDetails = createChangeEventDetails(none);
					store.setOpen(false, eventDetails);
					if (!eventDetails.isCanceled) store.update({
						activeTriggerId: null,
						activeTriggerElement: null
					});
				}
			});
		}
	}, [
		open,
		store,
		store.useState("triggerCount"),
		closeOnActiveTriggerUnmount
	]);
}
/**
* Manages the mounted state of the popup.
* Sets up the transition status listeners and handles unmounting when needed.
* Updates the `mounted`, `transitionStatus`, and `preventUnmountingOnClose` states in the store.
*
* @param open Whether the popup is open.
* @param store The Store instance managing the popup state.
* @param onUnmount Optional callback to be called when the popup is unmounted.
*
* @returns A function to forcibly unmount the popup.
*/
function useOpenStateTransitions(open, store, onUnmount) {
	const { mounted, setMounted, transitionStatus } = useTransitionStatus(open);
	const preventUnmountingOnClose = store.useState("preventUnmountingOnClose");
	const syncedPreventUnmountingOnClose = open ? false : preventUnmountingOnClose;
	store.useSyncedValues({
		mounted,
		transitionStatus,
		preventUnmountingOnClose: syncedPreventUnmountingOnClose
	});
	const forceUnmount = useStableCallback(() => {
		setMounted(false);
		store.update({
			activeTriggerId: null,
			activeTriggerElement: null,
			mounted: false,
			preventUnmountingOnClose: false
		});
		onUnmount?.();
		store.context.onOpenChangeComplete?.(false);
	});
	useOpenChangeComplete({
		enabled: mounted && !open && !syncedPreventUnmountingOnClose,
		open,
		ref: store.context.popupRef,
		onComplete() {
			if (!open) forceUnmount();
		}
	});
	return {
		forceUnmount,
		transitionStatus
	};
}
function usePopupInteractionProps(store, statePart) {
	store.useSyncedValues(statePart);
	useIsoLayoutEffect(() => () => {
		store.update({
			activeTriggerProps: EMPTY_OBJECT,
			inactiveTriggerProps: EMPTY_OBJECT,
			popupProps: EMPTY_OBJECT
		});
	}, [store]);
}
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/utils/popups/popupTriggerMap.mjs
/**
* Data structure to keep track of popup trigger elements by their IDs.
* Uses both a set of Elements and a map of IDs to Elements for efficient lookups.
*/
var PopupTriggerMap = class {
	constructor() {
		this.elementsSet = /* @__PURE__ */ new Set();
		this.idMap = /* @__PURE__ */ new Map();
	}
	/**
	* Adds a trigger element with the given ID.
	*
	* Note: The provided element is assumed to not be registered under multiple IDs.
	*/
	add(id, element) {
		const existingElement = this.idMap.get(id);
		if (existingElement === element) return;
		if (existingElement !== void 0) this.elementsSet.delete(existingElement);
		this.elementsSet.add(element);
		this.idMap.set(id, element);
		if (process.env.NODE_ENV !== "production") {
			if (this.elementsSet.size !== this.idMap.size) throw new Error("Base UI: A trigger element cannot be registered under multiple IDs in PopupTriggerMap.");
		}
	}
	/**
	* Removes the trigger element with the given ID.
	*/
	delete(id) {
		const element = this.idMap.get(id);
		if (element) {
			this.elementsSet.delete(element);
			this.idMap.delete(id);
		}
	}
	/**
	* Whether the given element is registered as a trigger.
	*/
	hasElement(element) {
		return this.elementsSet.has(element);
	}
	/**
	* Whether there is a registered trigger element matching the given predicate.
	*/
	hasMatchingElement(predicate) {
		for (const element of this.elementsSet) if (predicate(element)) return true;
		return false;
	}
	/**
	* Returns the trigger element associated with the given ID, or undefined if no such element exists.
	*/
	getById(id) {
		return this.idMap.get(id);
	}
	/**
	* Returns an iterable of all registered trigger entries, where each entry is a tuple of [id, element].
	*/
	entries() {
		return this.idMap.entries();
	}
	/**
	* Returns an iterable of all registered trigger elements.
	*/
	elements() {
		return this.elementsSet.values();
	}
	/**
	* Returns the number of registered trigger elements.
	*/
	get size() {
		return this.idMap.size;
	}
};
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/floating-ui-react/utils/getEmptyRootContext.mjs
function getEmptyRootContext() {
	return new FloatingRootStore({
		open: false,
		transitionStatus: void 0,
		floatingElement: null,
		referenceElement: null,
		triggerElements: new PopupTriggerMap(),
		floatingId: void 0,
		syncOnly: false,
		nested: false,
		onOpenChange: void 0
	});
}
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/utils/popups/store.mjs
/**
* State common to all popup stores.
*/
function createInitialPopupStoreState() {
	return {
		open: false,
		openProp: void 0,
		mounted: false,
		transitionStatus: void 0,
		floatingRootContext: getEmptyRootContext(),
		floatingId: void 0,
		triggerCount: 0,
		preventUnmountingOnClose: false,
		payload: void 0,
		activeTriggerId: null,
		activeTriggerElement: null,
		triggerIdProp: void 0,
		popupElement: null,
		positionerElement: null,
		activeTriggerProps: EMPTY_OBJECT,
		inactiveTriggerProps: EMPTY_OBJECT,
		popupProps: EMPTY_OBJECT
	};
}
function createPopupFloatingRootContext(triggerElements, floatingId, nested = false) {
	return new FloatingRootStore({
		open: false,
		transitionStatus: void 0,
		floatingElement: null,
		referenceElement: null,
		triggerElements,
		floatingId,
		syncOnly: true,
		nested,
		onOpenChange: void 0
	});
}
const activeTriggerIdSelector = createSelector((state) => state.triggerIdProp ?? state.activeTriggerId);
const openSelector = createSelector((state) => state.openProp ?? state.open);
const popupIdSelector = createSelector((state) => {
	return (state.popupElement?.id ?? state.floatingId) || void 0;
});
function triggerOwnsOpenPopup(state, triggerId) {
	return triggerId !== void 0 && openSelector(state) && activeTriggerIdSelector(state) === triggerId;
}
function triggerOwnsOpenPopupOrIsOnlyTrigger(state, triggerId) {
	if (triggerOwnsOpenPopup(state, triggerId)) return true;
	return triggerId !== void 0 && openSelector(state) && activeTriggerIdSelector(state) == null && state.triggerCount === 1;
}
const popupStoreSelectors = {
	open: openSelector,
	mounted: createSelector((state) => state.mounted),
	transitionStatus: createSelector((state) => state.transitionStatus),
	floatingRootContext: createSelector((state) => state.floatingRootContext),
	triggerCount: createSelector((state) => state.triggerCount),
	preventUnmountingOnClose: createSelector((state) => state.preventUnmountingOnClose),
	payload: createSelector((state) => state.payload),
	activeTriggerId: activeTriggerIdSelector,
	activeTriggerElement: createSelector((state) => state.mounted ? state.activeTriggerElement : null),
	popupId: popupIdSelector,
	/**
	* Whether the trigger with the given ID was used to open the popup.
	*/
	isTriggerActive: createSelector((state, triggerId) => triggerId !== void 0 && activeTriggerIdSelector(state) === triggerId),
	/**
	* Whether the popup is open and was activated by a trigger with the given ID.
	*/
	isOpenedByTrigger: createSelector((state, triggerId) => triggerOwnsOpenPopup(state, triggerId)),
	/**
	* Whether the popup is mounted and was activated by a trigger with the given ID.
	*/
	isMountedByTrigger: createSelector((state, triggerId) => triggerId !== void 0 && activeTriggerIdSelector(state) === triggerId && state.mounted),
	triggerProps: createSelector((state, isActive) => isActive ? state.activeTriggerProps : state.inactiveTriggerProps),
	/**
	* Popup id for the trigger that currently owns the open popup.
	*/
	triggerPopupId: createSelector((state, triggerId) => triggerOwnsOpenPopupOrIsOnlyTrigger(state, triggerId) ? popupIdSelector(state) : void 0),
	popupProps: createSelector((state) => state.popupProps),
	popupElement: createSelector((state) => state.popupElement),
	positionerElement: createSelector((state) => state.positionerElement)
};
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/floating-ui-react/hooks/useFloatingRootContext.mjs
function useFloatingRootContext(options) {
	const { open = false, onOpenChange, elements = {} } = options;
	const floatingId = useId$1();
	const nested = useFloatingParentNodeId() != null;
	if (process.env.NODE_ENV !== "production") {
		const optionDomReference = elements.reference;
		if (optionDomReference && !isElement(optionDomReference)) console.error("Cannot pass a virtual element to the `elements.reference` option,", "as it must be a real DOM element. Use `context.setPositionReference()`", "instead.");
	}
	const store = useRefWithInit(() => new FloatingRootStore({
		open,
		transitionStatus: void 0,
		onOpenChange,
		referenceElement: elements.reference ?? null,
		floatingElement: elements.floating ?? null,
		triggerElements: new PopupTriggerMap(),
		floatingId,
		syncOnly: false,
		nested
	})).current;
	useIsoLayoutEffect(() => {
		const valuesToSync = {
			open,
			floatingId
		};
		if (elements.reference !== void 0) {
			valuesToSync.referenceElement = elements.reference;
			valuesToSync.domReferenceElement = isElement(elements.reference) ? elements.reference : null;
		}
		if (elements.floating !== void 0) valuesToSync.floatingElement = elements.floating;
		store.update(valuesToSync);
	}, [
		open,
		floatingId,
		elements.reference,
		elements.floating,
		store
	]);
	store.context.onOpenChange = onOpenChange;
	store.context.nested = nested;
	return store;
}
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/floating-ui-react/hooks/useFloating.mjs
/**
* Provides data to position a floating element and context to add interactions.
* @see https://floating-ui.com/docs/useFloating
*/
function useFloating(options = {}) {
	const { nodeId, externalTree } = options;
	const internalStore = useFloatingRootContext(options);
	const store = options.rootContext || internalStore;
	const referenceElement = store.useState("referenceElement");
	const floatingElement = store.useState("floatingElement");
	const domReferenceElement = store.useState("domReferenceElement");
	const open = store.useState("open");
	const floatingId = store.useState("floatingId");
	const [positionReference, setPositionReferenceRaw] = react$1.useState(null);
	const [localDomReference, setLocalDomReference] = react$1.useState(void 0);
	const [localFloatingElement, setLocalFloatingElement] = react$1.useState(void 0);
	const domReferenceRef = react$1.useRef(null);
	const tree = useFloatingTree(externalTree);
	const storeElements = react$1.useMemo(() => ({
		reference: referenceElement,
		floating: floatingElement,
		domReference: domReferenceElement
	}), [
		referenceElement,
		floatingElement,
		domReferenceElement
	]);
	const position = useFloating$1({
		...options,
		elements: {
			...storeElements,
			...positionReference && { reference: positionReference }
		}
	});
	const localDomReferenceElement = isElement(localDomReference) ? localDomReference : null;
	const syncedFloatingElement = localFloatingElement === void 0 ? store.state.floatingElement : localFloatingElement;
	store.useSyncedValue("referenceElement", localDomReference ?? null);
	store.useSyncedValue("domReferenceElement", localDomReference === void 0 ? domReferenceElement : localDomReferenceElement);
	store.useSyncedValue("floatingElement", syncedFloatingElement);
	const setPositionReference = react$1.useCallback((node) => {
		const computedPositionReference = isElement(node) ? {
			getBoundingClientRect: () => node.getBoundingClientRect(),
			getClientRects: () => node.getClientRects(),
			contextElement: node
		} : node;
		setPositionReferenceRaw(computedPositionReference);
		position.refs.setReference(computedPositionReference);
	}, [position.refs]);
	const setReference = react$1.useCallback((node) => {
		if (isElement(node) || node === null) {
			domReferenceRef.current = node;
			setLocalDomReference(node);
		}
		if (isElement(position.refs.reference.current) || position.refs.reference.current === null || node !== null && !isElement(node)) position.refs.setReference(node);
	}, [position.refs, setLocalDomReference]);
	const setFloating = react$1.useCallback((node) => {
		setLocalFloatingElement(node);
		position.refs.setFloating(node);
	}, [position.refs]);
	const refs = react$1.useMemo(() => ({
		...position.refs,
		setReference,
		setFloating,
		setPositionReference,
		domReference: domReferenceRef
	}), [
		position.refs,
		setReference,
		setFloating,
		setPositionReference
	]);
	const elements = react$1.useMemo(() => ({
		...position.elements,
		domReference: domReferenceElement
	}), [position.elements, domReferenceElement]);
	const context = react$1.useMemo(() => ({
		...position,
		dataRef: store.context.dataRef,
		open,
		onOpenChange: store.setOpen,
		events: store.context.events,
		floatingId,
		refs,
		elements,
		nodeId,
		rootStore: store
	}), [
		position,
		refs,
		elements,
		nodeId,
		store,
		open,
		floatingId
	]);
	useIsoLayoutEffect(() => {
		if (domReferenceElement) domReferenceRef.current = domReferenceElement;
	}, [domReferenceElement]);
	useIsoLayoutEffect(() => {
		store.context.dataRef.current.floatingContext = context;
		const node = tree?.nodesRef.current.find((n) => n.id === nodeId);
		if (node) node.context = context;
	});
	return react$1.useMemo(() => ({
		...position,
		context,
		refs,
		elements,
		rootStore: store
	}), [
		position,
		refs,
		elements,
		context,
		store
	]);
}
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/floating-ui-react/hooks/useFocus.mjs
const isMacSafari = mac && webkit;
/**
* Opens the floating element while the reference element has focus, like CSS
* `:focus`.
* @see https://floating-ui.com/docs/useFocus
*/
function useFocus(context, props = {}) {
	const { enabled = true, delay } = props;
	const store = "rootStore" in context ? context.rootStore : context;
	const { events, dataRef } = store.context;
	const blockFocusRef = react$1.useRef(false);
	const blockedReferenceRef = react$1.useRef(null);
	const keyboardModalityRef = react$1.useRef(true);
	const timeout = useTimeout();
	react$1.useEffect(() => {
		const domReference = store.select("domReferenceElement");
		if (!enabled) return;
		const win = getWindow(domReference);
		function onBlur() {
			const currentDomReference = store.select("domReferenceElement");
			if (!store.select("open") && isHTMLElement(currentDomReference) && currentDomReference === activeElement(ownerDocument(currentDomReference))) blockFocusRef.current = true;
		}
		function onKeyDown() {
			keyboardModalityRef.current = true;
		}
		function onPointerDown() {
			keyboardModalityRef.current = false;
		}
		return mergeCleanups(addEventListener(win, "blur", onBlur), isMacSafari && addEventListener(win, "keydown", onKeyDown, true), isMacSafari && addEventListener(win, "pointerdown", onPointerDown, true));
	}, [store, enabled]);
	react$1.useEffect(() => {
		if (!enabled) return;
		function onOpenChangeLocal(details) {
			if (details.reason === "trigger-press" || details.reason === "escape-key") {
				const referenceElement = store.select("domReferenceElement");
				if (isElement(referenceElement)) {
					blockedReferenceRef.current = referenceElement;
					blockFocusRef.current = true;
				}
			}
		}
		events.on("openchange", onOpenChangeLocal);
		return () => {
			events.off("openchange", onOpenChangeLocal);
		};
	}, [
		events,
		enabled,
		store
	]);
	const reference = react$1.useMemo(() => {
		function resetBlockedFocus() {
			blockFocusRef.current = false;
			blockedReferenceRef.current = null;
		}
		return {
			onMouseLeave() {
				resetBlockedFocus();
			},
			onFocus(event) {
				const focusTarget = event.currentTarget;
				if (blockFocusRef.current) {
					if (blockedReferenceRef.current === focusTarget) return;
					resetBlockedFocus();
				}
				const target = getTarget(event.nativeEvent);
				if (isElement(target)) {
					if (isMacSafari && !event.relatedTarget) {
						if (!keyboardModalityRef.current && !isTypeableElement(target)) return;
					} else if (!matchesFocusVisible(target)) return;
				}
				const movedFromOtherEnabledTrigger = isTargetInsideEnabledTrigger(event.relatedTarget, store.context.triggerElements);
				const { nativeEvent, currentTarget } = event;
				const delayValue = typeof delay === "function" ? delay() : delay;
				if (store.select("open") && movedFromOtherEnabledTrigger || delayValue === 0 || delayValue === void 0) {
					store.setOpen(true, createChangeEventDetails(triggerFocus, nativeEvent, currentTarget));
					return;
				}
				timeout.start(delayValue, () => {
					if (blockFocusRef.current) return;
					store.setOpen(true, createChangeEventDetails(triggerFocus, nativeEvent, currentTarget));
				});
			},
			onBlur(event) {
				resetBlockedFocus();
				const relatedTarget = event.relatedTarget;
				const nativeEvent = event.nativeEvent;
				const movedToFocusGuard = isElement(relatedTarget) && relatedTarget.hasAttribute(createAttribute("focus-guard")) && relatedTarget.getAttribute("data-type") === "outside";
				timeout.start(0, () => {
					const domReference = store.select("domReferenceElement");
					const activeEl = activeElement(ownerDocument(domReference));
					if (!relatedTarget && activeEl === domReference) return;
					if (contains(dataRef.current.floatingContext?.refs.floating.current, activeEl) || contains(domReference, activeEl) || movedToFocusGuard) return;
					if (isTargetInsideEnabledTrigger(relatedTarget ?? activeEl, store.context.triggerElements)) return;
					store.setOpen(false, createChangeEventDetails(triggerFocus, nativeEvent));
				});
			}
		};
	}, [
		dataRef,
		delay,
		store,
		timeout
	]);
	return react$1.useMemo(() => enabled ? {
		reference,
		trigger: reference
	} : {}, [enabled, reference]);
}
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/floating-ui-react/hooks/useHoverInteractionSharedState.mjs
var HoverInteraction = class HoverInteraction {
	constructor() {
		this.pointerType = void 0;
		this.interactedInside = false;
		this.handler = void 0;
		this.blockMouseMove = true;
		this.performedPointerEventsMutation = false;
		this.pointerEventsScopeElement = null;
		this.pointerEventsReferenceElement = null;
		this.pointerEventsFloatingElement = null;
		this.restTimeoutPending = false;
		this.openChangeTimeout = new Timeout();
		this.restTimeout = new Timeout();
		this.handleCloseOptions = void 0;
	}
	static create() {
		return new HoverInteraction();
	}
	dispose = () => {
		this.openChangeTimeout.clear();
		this.restTimeout.clear();
	};
	disposeEffect = () => {
		return this.dispose;
	};
};
const pointerEventsMutationOwnerByScopeElement = /* @__PURE__ */ new WeakMap();
function clearSafePolygonPointerEventsMutation(instance) {
	if (!instance.performedPointerEventsMutation) return;
	const scopeElement = instance.pointerEventsScopeElement;
	if (scopeElement && pointerEventsMutationOwnerByScopeElement.get(scopeElement) === instance) {
		instance.pointerEventsScopeElement?.style.removeProperty("pointer-events");
		instance.pointerEventsReferenceElement?.style.removeProperty("pointer-events");
		instance.pointerEventsFloatingElement?.style.removeProperty("pointer-events");
		pointerEventsMutationOwnerByScopeElement.delete(scopeElement);
	}
	instance.performedPointerEventsMutation = false;
	instance.pointerEventsScopeElement = null;
	instance.pointerEventsReferenceElement = null;
	instance.pointerEventsFloatingElement = null;
}
function applySafePolygonPointerEventsMutation(instance, options) {
	const { scopeElement, referenceElement, floatingElement } = options;
	const existingOwner = pointerEventsMutationOwnerByScopeElement.get(scopeElement);
	if (existingOwner && existingOwner !== instance) clearSafePolygonPointerEventsMutation(existingOwner);
	clearSafePolygonPointerEventsMutation(instance);
	instance.performedPointerEventsMutation = true;
	instance.pointerEventsScopeElement = scopeElement;
	instance.pointerEventsReferenceElement = referenceElement;
	instance.pointerEventsFloatingElement = floatingElement;
	pointerEventsMutationOwnerByScopeElement.set(scopeElement, instance);
	scopeElement.style.pointerEvents = "none";
	referenceElement.style.pointerEvents = "auto";
	floatingElement.style.pointerEvents = "auto";
}
function useHoverInteractionSharedState(store) {
	const data = store.context.dataRef.current;
	const instance = useRefWithInit(() => data.hoverInteractionState ?? HoverInteraction.create()).current;
	if (!data.hoverInteractionState) data.hoverInteractionState = instance;
	useOnMount(data.hoverInteractionState.disposeEffect);
	return data.hoverInteractionState;
}
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/floating-ui-react/hooks/useHoverFloatingInteraction.mjs
/**
* Provides hover interactions that should be attached to the floating element.
*/
function useHoverFloatingInteraction(context, parameters = {}) {
	const { enabled = true, closeDelay: closeDelayProp = 0, nodeId: nodeIdProp } = parameters;
	const store = "rootStore" in context ? context.rootStore : context;
	const open = store.useState("open");
	const floatingElement = store.useState("floatingElement");
	const domReferenceElement = store.useState("domReferenceElement");
	const { dataRef } = store.context;
	const tree = useFloatingTree();
	const parentId = useFloatingParentNodeId();
	const instance = useHoverInteractionSharedState(store);
	const childClosedTimeout = useTimeout();
	const isClickLikeOpenEvent$2 = useStableCallback(() => {
		return isClickLikeOpenEvent(dataRef.current.openEvent?.type, instance.interactedInside);
	});
	const isHoverOpen = useStableCallback(() => {
		return isHoverOpenEvent(dataRef.current.openEvent?.type);
	});
	const clearPointerEvents = useStableCallback(() => {
		clearSafePolygonPointerEventsMutation(instance);
	});
	useIsoLayoutEffect(() => {
		if (!open) {
			instance.pointerType = void 0;
			instance.restTimeoutPending = false;
			instance.interactedInside = false;
			clearPointerEvents();
		}
	}, [
		open,
		instance,
		clearPointerEvents
	]);
	react$1.useEffect(() => {
		return clearPointerEvents;
	}, [clearPointerEvents]);
	useIsoLayoutEffect(() => {
		if (!enabled) return;
		if (open && instance.handleCloseOptions?.blockPointerEvents && isHoverOpen() && isElement(domReferenceElement) && floatingElement) {
			const ref = domReferenceElement;
			const floatingEl = floatingElement;
			const doc = ownerDocument(floatingElement);
			const parentFloating = tree?.nodesRef.current.find((node) => node.id === parentId)?.context?.elements.floating;
			if (parentFloating) parentFloating.style.pointerEvents = "";
			const cachedScopeElement = instance.pointerEventsScopeElement !== floatingEl ? instance.pointerEventsScopeElement : null;
			const parentScopeElement = parentFloating !== floatingEl ? parentFloating : null;
			const scopeElement = instance.handleCloseOptions?.getScope?.() ?? cachedScopeElement ?? parentScopeElement ?? ref.closest("[data-rootownerid]") ?? doc.body;
			applySafePolygonPointerEventsMutation(instance, {
				scopeElement,
				referenceElement: ref,
				floatingElement: floatingEl
			});
			return () => {
				clearPointerEvents();
			};
		}
	}, [
		enabled,
		open,
		domReferenceElement,
		floatingElement,
		instance,
		isHoverOpen,
		tree,
		parentId,
		clearPointerEvents
	]);
	react$1.useEffect(() => {
		if (!enabled) return;
		function hasParentChildren() {
			return !!(tree && parentId && getNodeChildren(tree.nodesRef.current, parentId).length > 0);
		}
		function closeWithDelay(event) {
			const closeDelay = getDelay(closeDelayProp, "close", instance.pointerType);
			const close = () => {
				store.setOpen(false, createChangeEventDetails(triggerHover, event));
				tree?.events.emit("floating.closed", event);
			};
			if (closeDelay) instance.openChangeTimeout.start(closeDelay, close);
			else {
				instance.openChangeTimeout.clear();
				close();
			}
		}
		function handleInteractInside(event) {
			const target = getTarget(event);
			if (!isInteractiveElement(target)) {
				instance.interactedInside = false;
				return;
			}
			instance.interactedInside = target?.closest("[aria-haspopup]") != null;
		}
		function onFloatingMouseEnter() {
			instance.openChangeTimeout.clear();
			childClosedTimeout.clear();
			tree?.events.off("floating.closed", onNodeClosed);
			clearPointerEvents();
		}
		function onFloatingMouseLeave(event) {
			if (hasParentChildren() && tree) {
				tree.events.on("floating.closed", onNodeClosed);
				return;
			}
			if (isTargetInsideEnabledTrigger(event.relatedTarget, store.context.triggerElements)) return;
			const currentNodeId = dataRef.current.floatingContext?.nodeId ?? nodeIdProp;
			const relatedTarget = event.relatedTarget;
			if (tree && currentNodeId && isElement(relatedTarget) && getNodeChildren(tree.nodesRef.current, currentNodeId, false).some((node) => contains(node.context?.elements.floating, relatedTarget))) return;
			if (instance.handler) {
				instance.handler(event);
				return;
			}
			clearPointerEvents();
			if (isHoverOpen() && !isClickLikeOpenEvent$2()) closeWithDelay(event);
		}
		function onNodeClosed(event) {
			if (!tree || !parentId || hasParentChildren()) return;
			childClosedTimeout.start(0, () => {
				tree.events.off("floating.closed", onNodeClosed);
				store.setOpen(false, createChangeEventDetails(triggerHover, event));
				tree.events.emit("floating.closed", event);
			});
		}
		const floating = floatingElement;
		return mergeCleanups(floating && addEventListener(floating, "mouseenter", onFloatingMouseEnter), floating && addEventListener(floating, "mouseleave", onFloatingMouseLeave), floating && addEventListener(floating, "pointerdown", handleInteractInside, true), () => {
			tree?.events.off("floating.closed", onNodeClosed);
		});
	}, [
		enabled,
		floatingElement,
		store,
		dataRef,
		closeDelayProp,
		nodeIdProp,
		isHoverOpen,
		isClickLikeOpenEvent$2,
		clearPointerEvents,
		instance,
		tree,
		parentId,
		childClosedTimeout
	]);
}
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/floating-ui-react/hooks/useHoverReferenceInteraction.mjs
const EMPTY_REF = { current: null };
/**
* Provides hover interactions that should be attached to reference or trigger
* elements.
*/
function useHoverReferenceInteraction(context, props = {}) {
	const { enabled = true, delay = 0, handleClose = null, mouseOnly = false, restMs = 0, move = true, triggerElementRef = EMPTY_REF, externalTree, isActiveTrigger = true, getHandleCloseContext, isClosing, shouldOpen: shouldOpenProp } = props;
	const store = "rootStore" in context ? context.rootStore : context;
	const { dataRef, events } = store.context;
	const tree = useFloatingTree(externalTree);
	const instance = useHoverInteractionSharedState(store);
	const isHoverCloseActiveRef = react$1.useRef(false);
	const handleCloseRef = useValueAsRef(handleClose);
	const delayRef = useValueAsRef(delay);
	const restMsRef = useValueAsRef(restMs);
	const enabledRef = useValueAsRef(enabled);
	const shouldOpenRef = useValueAsRef(shouldOpenProp);
	const isClosingRef = useValueAsRef(isClosing);
	const isClickLikeOpenEvent$1 = useStableCallback(() => {
		return isClickLikeOpenEvent(dataRef.current.openEvent?.type, instance.interactedInside);
	});
	const checkShouldOpen = useStableCallback(() => {
		return shouldOpenRef.current?.() !== false;
	});
	const isOverInactiveTrigger = useStableCallback((currentDomReference, currentTarget, target) => {
		const allTriggers = store.context.triggerElements;
		if (allTriggers.hasElement(currentTarget)) return !currentDomReference || !contains(currentDomReference, currentTarget);
		if (!isElement(target)) return false;
		const targetElement = target;
		return allTriggers.hasMatchingElement((trigger) => contains(trigger, targetElement)) && (!currentDomReference || !contains(currentDomReference, targetElement));
	});
	const cleanupMouseMoveHandler = useStableCallback(() => {
		if (!instance.handler) return;
		ownerDocument(store.select("domReferenceElement")).removeEventListener("mousemove", instance.handler);
		instance.handler = void 0;
	});
	const clearPointerEvents = useStableCallback(() => {
		clearSafePolygonPointerEventsMutation(instance);
	});
	if (isActiveTrigger) instance.handleCloseOptions = handleCloseRef.current?.__options;
	react$1.useEffect(() => cleanupMouseMoveHandler, [cleanupMouseMoveHandler]);
	react$1.useEffect(() => {
		if (!enabled) return;
		function onOpenChangeLocal(details) {
			if (!details.open) {
				isHoverCloseActiveRef.current = details.reason === triggerHover;
				cleanupMouseMoveHandler();
				instance.openChangeTimeout.clear();
				instance.restTimeout.clear();
				instance.blockMouseMove = true;
				instance.restTimeoutPending = false;
			} else isHoverCloseActiveRef.current = false;
		}
		events.on("openchange", onOpenChangeLocal);
		return () => {
			events.off("openchange", onOpenChangeLocal);
		};
	}, [
		enabled,
		events,
		instance,
		cleanupMouseMoveHandler
	]);
	react$1.useEffect(() => {
		if (!enabled) return;
		function closeWithDelay(event, runElseBranch = true) {
			const closeDelay = getDelay(delayRef.current, "close", instance.pointerType);
			if (closeDelay) instance.openChangeTimeout.start(closeDelay, () => {
				store.setOpen(false, createChangeEventDetails(triggerHover, event));
				tree?.events.emit("floating.closed", event);
			});
			else if (runElseBranch) {
				instance.openChangeTimeout.clear();
				store.setOpen(false, createChangeEventDetails(triggerHover, event));
				tree?.events.emit("floating.closed", event);
			}
		}
		const trigger = triggerElementRef.current ?? (isActiveTrigger ? store.select("domReferenceElement") : null);
		if (!isElement(trigger)) return;
		function onMouseEnter(event) {
			instance.openChangeTimeout.clear();
			instance.blockMouseMove = false;
			if (mouseOnly && !isMouseLikePointerType(instance.pointerType)) return;
			const restMsValue = getRestMs(restMsRef.current);
			const openDelay = getDelay(delayRef.current, "open", instance.pointerType);
			const eventTarget = getTarget(event);
			const currentTarget = event.currentTarget ?? null;
			const currentDomReference = store.select("domReferenceElement");
			let triggerNode = currentTarget;
			if (isElement(eventTarget) && !store.context.triggerElements.hasElement(eventTarget)) {
				for (const triggerElement of store.context.triggerElements.elements()) if (contains(triggerElement, eventTarget)) {
					triggerNode = triggerElement;
					break;
				}
			}
			if (isElement(currentTarget) && isElement(currentDomReference) && !store.context.triggerElements.hasElement(currentTarget) && contains(currentTarget, currentDomReference)) triggerNode = currentDomReference;
			const isOverInactive = triggerNode == null ? false : isOverInactiveTrigger(currentDomReference, triggerNode, eventTarget);
			const isOpen = store.select("open");
			const isInClosingTransition = isClosingRef.current?.() ?? store.select("transitionStatus") === "ending";
			const isHoverCloseTransition = !isOpen && isInClosingTransition && isHoverCloseActiveRef.current;
			const isReenteringSameTriggerDuringCloseTransition = !isOverInactive && isElement(triggerNode) && isElement(currentDomReference) && contains(currentDomReference, triggerNode) && isHoverCloseTransition;
			const isRestOnlyDelay = restMsValue > 0 && !openDelay;
			const shouldOpenImmediately = isOverInactive && (isOpen || isHoverCloseTransition) || isReenteringSameTriggerDuringCloseTransition;
			const shouldOpen = !isOpen || isOverInactive;
			if (shouldOpenImmediately) {
				if (checkShouldOpen()) store.setOpen(true, createChangeEventDetails(triggerHover, event, triggerNode));
				return;
			}
			if (isRestOnlyDelay) return;
			if (openDelay) instance.openChangeTimeout.start(openDelay, () => {
				if (shouldOpen && checkShouldOpen()) store.setOpen(true, createChangeEventDetails(triggerHover, event, triggerNode));
			});
			else if (shouldOpen) {
				if (checkShouldOpen()) store.setOpen(true, createChangeEventDetails(triggerHover, event, triggerNode));
			}
		}
		function onMouseLeave(event) {
			if (isClickLikeOpenEvent$1()) {
				clearPointerEvents();
				return;
			}
			cleanupMouseMoveHandler();
			const doc = ownerDocument(store.select("domReferenceElement"));
			instance.restTimeout.clear();
			instance.restTimeoutPending = false;
			const handleCloseContextBase = dataRef.current.floatingContext ?? getHandleCloseContext?.();
			if (isTargetInsideEnabledTrigger(event.relatedTarget, store.context.triggerElements)) return;
			if (handleCloseRef.current && handleCloseContextBase) {
				if (!store.select("open")) instance.openChangeTimeout.clear();
				const currentTrigger = triggerElementRef.current;
				instance.handler = handleCloseRef.current({
					...handleCloseContextBase,
					tree,
					x: event.clientX,
					y: event.clientY,
					onClose() {
						clearPointerEvents();
						cleanupMouseMoveHandler();
						if (enabledRef.current && !isClickLikeOpenEvent$1() && currentTrigger === store.select("domReferenceElement")) closeWithDelay(event, true);
					}
				});
				doc.addEventListener("mousemove", instance.handler);
				instance.handler(event);
				return;
			}
			if (instance.pointerType === "touch" ? !contains(store.select("floatingElement"), event.relatedTarget) : true) closeWithDelay(event);
		}
		if (move) return mergeCleanups(addEventListener(trigger, "mousemove", onMouseEnter, { once: true }), addEventListener(trigger, "mouseenter", onMouseEnter), addEventListener(trigger, "mouseleave", onMouseLeave));
		return mergeCleanups(addEventListener(trigger, "mouseenter", onMouseEnter), addEventListener(trigger, "mouseleave", onMouseLeave));
	}, [
		cleanupMouseMoveHandler,
		clearPointerEvents,
		dataRef,
		delayRef,
		store,
		enabled,
		handleCloseRef,
		instance,
		isActiveTrigger,
		isOverInactiveTrigger,
		isClickLikeOpenEvent$1,
		mouseOnly,
		move,
		restMsRef,
		triggerElementRef,
		tree,
		enabledRef,
		getHandleCloseContext,
		isClosingRef,
		checkShouldOpen
	]);
	return react$1.useMemo(() => {
		if (!enabled) return;
		function setPointerRef(event) {
			instance.pointerType = event.pointerType;
		}
		return {
			onPointerDown: setPointerRef,
			onPointerEnter: setPointerRef,
			onMouseMove(event) {
				const { nativeEvent } = event;
				const trigger = event.currentTarget;
				const currentDomReference = store.select("domReferenceElement");
				const currentOpen = store.select("open");
				const isOverInactive = isOverInactiveTrigger(currentDomReference, trigger, event.target);
				if (mouseOnly && !isMouseLikePointerType(instance.pointerType)) return;
				if (currentOpen && isOverInactive && instance.handleCloseOptions?.blockPointerEvents) {
					const floatingElement = store.select("floatingElement");
					if (floatingElement) {
						const scopeElement = instance.handleCloseOptions?.getScope?.() ?? trigger.ownerDocument.body;
						applySafePolygonPointerEventsMutation(instance, {
							scopeElement,
							referenceElement: trigger,
							floatingElement
						});
					}
				}
				const restMsValue = getRestMs(restMsRef.current);
				if (currentOpen && !isOverInactive || restMsValue === 0) return;
				if (!isOverInactive && instance.restTimeoutPending && event.movementX ** 2 + event.movementY ** 2 < 2) return;
				instance.restTimeout.clear();
				function handleMouseMove() {
					instance.restTimeoutPending = false;
					if (isClickLikeOpenEvent$1()) return;
					const latestOpen = store.select("open");
					if (!instance.blockMouseMove && (!latestOpen || isOverInactive) && checkShouldOpen()) store.setOpen(true, createChangeEventDetails(triggerHover, nativeEvent, trigger));
				}
				if (instance.pointerType === "touch") react_dom.flushSync(() => {
					handleMouseMove();
				});
				else if (isOverInactive && currentOpen) handleMouseMove();
				else {
					instance.restTimeoutPending = true;
					instance.restTimeout.start(restMsValue, handleMouseMove);
				}
			}
		};
	}, [
		enabled,
		instance,
		isClickLikeOpenEvent$1,
		isOverInactiveTrigger,
		mouseOnly,
		store,
		restMsRef,
		checkShouldOpen
	]);
}
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/floating-ui-react/safePolygon.mjs
const CURSOR_SPEED_THRESHOLD = .1;
const CURSOR_SPEED_THRESHOLD_SQUARED = CURSOR_SPEED_THRESHOLD * CURSOR_SPEED_THRESHOLD;
const POLYGON_BUFFER = .5;
function hasIntersectingEdge(pointX, pointY, xi, yi, xj, yj) {
	return yi >= pointY !== yj >= pointY && pointX <= (xj - xi) * (pointY - yi) / (yj - yi) + xi;
}
function isPointInQuadrilateral(pointX, pointY, x1, y1, x2, y2, x3, y3, x4, y4) {
	let isInsideValue = false;
	if (hasIntersectingEdge(pointX, pointY, x1, y1, x2, y2)) isInsideValue = !isInsideValue;
	if (hasIntersectingEdge(pointX, pointY, x2, y2, x3, y3)) isInsideValue = !isInsideValue;
	if (hasIntersectingEdge(pointX, pointY, x3, y3, x4, y4)) isInsideValue = !isInsideValue;
	if (hasIntersectingEdge(pointX, pointY, x4, y4, x1, y1)) isInsideValue = !isInsideValue;
	return isInsideValue;
}
function isInsideRect(pointX, pointY, rect) {
	return pointX >= rect.x && pointX <= rect.x + rect.width && pointY >= rect.y && pointY <= rect.y + rect.height;
}
function isInsideAxisAlignedRect(pointX, pointY, x1, y1, x2, y2) {
	return pointX >= Math.min(x1, x2) && pointX <= Math.max(x1, x2) && pointY >= Math.min(y1, y2) && pointY <= Math.max(y1, y2);
}
/**
* Generates a safe polygon area that the user can traverse without closing the
* floating element once leaving the reference element.
* @see https://floating-ui.com/docs/useHover#safepolygon
*/
function safePolygon(options = {}) {
	const { blockPointerEvents = false } = options;
	const timeout = new Timeout();
	const fn = ({ x, y, placement, elements, onClose, nodeId, tree }) => {
		const side = placement?.split("-")[0];
		let hasLanded = false;
		let lastX = null;
		let lastY = null;
		let lastCursorTime = typeof performance !== "undefined" ? performance.now() : 0;
		function isCursorMovingSlowly(nextX, nextY) {
			const currentTime = performance.now();
			const elapsedTime = currentTime - lastCursorTime;
			if (lastX === null || lastY === null || elapsedTime === 0) {
				lastX = nextX;
				lastY = nextY;
				lastCursorTime = currentTime;
				return false;
			}
			const deltaX = nextX - lastX;
			const deltaY = nextY - lastY;
			const distanceSquared = deltaX * deltaX + deltaY * deltaY;
			const thresholdSquared = elapsedTime * elapsedTime * CURSOR_SPEED_THRESHOLD_SQUARED;
			lastX = nextX;
			lastY = nextY;
			lastCursorTime = currentTime;
			return distanceSquared < thresholdSquared;
		}
		function close() {
			timeout.clear();
			onClose();
		}
		return function onMouseMove(event) {
			timeout.clear();
			const domReference = elements.domReference;
			const floating = elements.floating;
			if (!domReference || !floating || side == null || x == null || y == null) return;
			const { clientX, clientY } = event;
			const target = getTarget(event);
			const isLeave = event.type === "mouseleave";
			const isOverFloatingEl = contains(floating, target);
			const isOverReferenceEl = contains(domReference, target);
			if (isOverFloatingEl) {
				hasLanded = true;
				if (!isLeave) return;
			}
			if (isOverReferenceEl) {
				hasLanded = false;
				if (!isLeave) {
					hasLanded = true;
					return;
				}
			}
			if (isLeave && isElement(event.relatedTarget) && contains(floating, event.relatedTarget)) return;
			function hasOpenChildNode() {
				return Boolean(tree && getNodeChildren(tree.nodesRef.current, nodeId).length > 0);
			}
			function closeIfNoOpenChild() {
				if (!hasOpenChildNode()) close();
			}
			if (hasOpenChildNode()) return;
			const refRect = domReference.getBoundingClientRect();
			const rect = floating.getBoundingClientRect();
			const cursorLeaveFromRight = x > rect.right - rect.width / 2;
			const cursorLeaveFromBottom = y > rect.bottom - rect.height / 2;
			const isFloatingWider = rect.width > refRect.width;
			const isFloatingTaller = rect.height > refRect.height;
			const left = (isFloatingWider ? refRect : rect).left;
			const right = (isFloatingWider ? refRect : rect).right;
			const top = (isFloatingTaller ? refRect : rect).top;
			const bottom = (isFloatingTaller ? refRect : rect).bottom;
			if (side === "top" && y >= refRect.bottom - 1 || side === "bottom" && y <= refRect.top + 1 || side === "left" && x >= refRect.right - 1 || side === "right" && x <= refRect.left + 1) {
				closeIfNoOpenChild();
				return;
			}
			let isInsideTroughRect = false;
			switch (side) {
				case "top":
					isInsideTroughRect = isInsideAxisAlignedRect(clientX, clientY, left, refRect.top + 1, right, rect.bottom - 1);
					break;
				case "bottom":
					isInsideTroughRect = isInsideAxisAlignedRect(clientX, clientY, left, rect.top + 1, right, refRect.bottom - 1);
					break;
				case "left":
					isInsideTroughRect = isInsideAxisAlignedRect(clientX, clientY, rect.right - 1, bottom, refRect.left + 1, top);
					break;
				case "right":
					isInsideTroughRect = isInsideAxisAlignedRect(clientX, clientY, refRect.right - 1, bottom, rect.left + 1, top);
					break;
				default:
			}
			if (isInsideTroughRect) return;
			if (hasLanded && !isInsideRect(clientX, clientY, refRect)) {
				closeIfNoOpenChild();
				return;
			}
			if (!isLeave && isCursorMovingSlowly(clientX, clientY)) {
				closeIfNoOpenChild();
				return;
			}
			let isInsidePolygon = false;
			switch (side) {
				case "top": {
					const cursorXOffset = isFloatingWider ? POLYGON_BUFFER / 2 : POLYGON_BUFFER * 4;
					const cursorPointOneX = isFloatingWider ? x + cursorXOffset : cursorLeaveFromRight ? x + cursorXOffset : x - cursorXOffset;
					const cursorPointTwoX = isFloatingWider ? x - cursorXOffset : cursorLeaveFromRight ? x + cursorXOffset : x - cursorXOffset;
					const cursorPointY = y + POLYGON_BUFFER + 1;
					const commonYLeft = cursorLeaveFromRight ? rect.bottom - POLYGON_BUFFER : isFloatingWider ? rect.bottom - POLYGON_BUFFER : rect.top;
					const commonYRight = cursorLeaveFromRight ? isFloatingWider ? rect.bottom - POLYGON_BUFFER : rect.top : rect.bottom - POLYGON_BUFFER;
					isInsidePolygon = isPointInQuadrilateral(clientX, clientY, cursorPointOneX, cursorPointY, cursorPointTwoX, cursorPointY, rect.left, commonYLeft, rect.right, commonYRight);
					break;
				}
				case "bottom": {
					const cursorXOffset = isFloatingWider ? POLYGON_BUFFER / 2 : POLYGON_BUFFER * 4;
					const cursorPointOneX = isFloatingWider ? x + cursorXOffset : cursorLeaveFromRight ? x + cursorXOffset : x - cursorXOffset;
					const cursorPointTwoX = isFloatingWider ? x - cursorXOffset : cursorLeaveFromRight ? x + cursorXOffset : x - cursorXOffset;
					const cursorPointY = y - POLYGON_BUFFER;
					const commonYLeft = cursorLeaveFromRight ? rect.top + POLYGON_BUFFER : isFloatingWider ? rect.top + POLYGON_BUFFER : rect.bottom;
					const commonYRight = cursorLeaveFromRight ? isFloatingWider ? rect.top + POLYGON_BUFFER : rect.bottom : rect.top + POLYGON_BUFFER;
					isInsidePolygon = isPointInQuadrilateral(clientX, clientY, cursorPointOneX, cursorPointY, cursorPointTwoX, cursorPointY, rect.left, commonYLeft, rect.right, commonYRight);
					break;
				}
				case "left": {
					const cursorYOffset = isFloatingTaller ? POLYGON_BUFFER / 2 : POLYGON_BUFFER * 4;
					const cursorPointOneY = isFloatingTaller ? y + cursorYOffset : cursorLeaveFromBottom ? y + cursorYOffset : y - cursorYOffset;
					const cursorPointTwoY = isFloatingTaller ? y - cursorYOffset : cursorLeaveFromBottom ? y + cursorYOffset : y - cursorYOffset;
					const cursorPointX = x + POLYGON_BUFFER + 1;
					const commonXTop = cursorLeaveFromBottom ? rect.right - POLYGON_BUFFER : isFloatingTaller ? rect.right - POLYGON_BUFFER : rect.left;
					const commonXBottom = cursorLeaveFromBottom ? isFloatingTaller ? rect.right - POLYGON_BUFFER : rect.left : rect.right - POLYGON_BUFFER;
					isInsidePolygon = isPointInQuadrilateral(clientX, clientY, commonXTop, rect.top, commonXBottom, rect.bottom, cursorPointX, cursorPointOneY, cursorPointX, cursorPointTwoY);
					break;
				}
				case "right": {
					const cursorYOffset = isFloatingTaller ? POLYGON_BUFFER / 2 : POLYGON_BUFFER * 4;
					const cursorPointOneY = isFloatingTaller ? y + cursorYOffset : cursorLeaveFromBottom ? y + cursorYOffset : y - cursorYOffset;
					const cursorPointTwoY = isFloatingTaller ? y - cursorYOffset : cursorLeaveFromBottom ? y + cursorYOffset : y - cursorYOffset;
					const cursorPointX = x - POLYGON_BUFFER;
					const commonXTop = cursorLeaveFromBottom ? rect.left + POLYGON_BUFFER : isFloatingTaller ? rect.left + POLYGON_BUFFER : rect.right;
					const commonXBottom = cursorLeaveFromBottom ? isFloatingTaller ? rect.left + POLYGON_BUFFER : rect.right : rect.left + POLYGON_BUFFER;
					isInsidePolygon = isPointInQuadrilateral(clientX, clientY, cursorPointX, cursorPointOneY, cursorPointX, cursorPointTwoY, commonXTop, rect.top, commonXBottom, rect.bottom);
					break;
				}
				default:
			}
			if (!isInsidePolygon) closeIfNoOpenChild();
			else if (!hasLanded) timeout.start(40, closeIfNoOpenChild);
		};
	};
	fn.__options = {
		...options,
		blockPointerEvents
	};
	return fn;
}
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/utils/popupStateMapping.mjs
let CommonPopupDataAttributes = function(CommonPopupDataAttributes) {
	/**
	* Present when the popup is open.
	*/
	CommonPopupDataAttributes["open"] = "data-open";
	/**
	* Present when the popup is closed.
	*/
	CommonPopupDataAttributes["closed"] = "data-closed";
	/**
	* Present when the popup is animating in.
	*/
	CommonPopupDataAttributes[CommonPopupDataAttributes["startingStyle"] = TransitionStatusDataAttributes.startingStyle] = "startingStyle";
	/**
	* Present when the popup is animating out.
	*/
	CommonPopupDataAttributes[CommonPopupDataAttributes["endingStyle"] = TransitionStatusDataAttributes.endingStyle] = "endingStyle";
	/**
	* Present when the anchor is hidden.
	*/
	CommonPopupDataAttributes["anchorHidden"] = "data-anchor-hidden";
	/**
	* Indicates which side the popup is positioned relative to the trigger.
	* @type { 'top' | 'bottom' | 'left' | 'right' | 'inline-end' | 'inline-start'}
	*/
	CommonPopupDataAttributes["side"] = "data-side";
	/**
	* Indicates how the popup is aligned relative to specified side.
	* @type {'start' | 'center' | 'end'}
	*/
	CommonPopupDataAttributes["align"] = "data-align";
	return CommonPopupDataAttributes;
}({});
let CommonTriggerDataAttributes = /*#__PURE__*/ function(CommonTriggerDataAttributes) {
	/**
	* Present when the popup is open.
	*/
	CommonTriggerDataAttributes["popupOpen"] = "data-popup-open";
	/**
	* Present when a pressable trigger is pressed.
	*/
	CommonTriggerDataAttributes["pressed"] = "data-pressed";
	return CommonTriggerDataAttributes;
}({});
const TRIGGER_HOOK = { [CommonTriggerDataAttributes.popupOpen]: "" };
CommonTriggerDataAttributes.popupOpen, CommonTriggerDataAttributes.pressed;
const POPUP_OPEN_HOOK = { [CommonPopupDataAttributes.open]: "" };
const POPUP_CLOSED_HOOK = { [CommonPopupDataAttributes.closed]: "" };
const ANCHOR_HIDDEN_HOOK = { [CommonPopupDataAttributes.anchorHidden]: "" };
const triggerOpenStateMapping = { open(value) {
	if (value) return TRIGGER_HOOK;
	return null;
} };
const popupStateMapping = {
	open(value) {
		if (value) return POPUP_OPEN_HOOK;
		return POPUP_CLOSED_HOOK;
	},
	anchorHidden(value) {
		if (value) return ANCHOR_HIDDEN_HOOK;
		return null;
	}
};
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/floating-ui-react/middleware/arrow.mjs
/**
* Fork of the original `arrow` middleware from Floating UI that allows
* configuring the offset parent.
*/
const baseArrow = (options) => ({
	name: "arrow",
	options,
	async fn(state) {
		const { x, y, placement, rects, platform, elements, middlewareData } = state;
		const { element, padding = 0, offsetParent = "real" } = evaluate(options, state) || {};
		if (element == null) return {};
		const paddingObject = getPaddingObject(padding);
		const coords = {
			x,
			y
		};
		const axis = getAlignmentAxis(placement);
		const length = getAxisLength(axis);
		const arrowDimensions = await platform.getDimensions(element);
		const isYAxis = axis === "y";
		const minProp = isYAxis ? "top" : "left";
		const maxProp = isYAxis ? "bottom" : "right";
		const clientProp = isYAxis ? "clientHeight" : "clientWidth";
		const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
		const startDiff = coords[axis] - rects.reference[axis];
		const arrowOffsetParent = offsetParent === "real" ? await platform.getOffsetParent?.(element) : elements.floating;
		let clientSize = elements.floating[clientProp] || rects.floating[length];
		if (!clientSize || !await platform.isElement?.(arrowOffsetParent)) clientSize = elements.floating[clientProp] || rects.floating[length];
		const centerToReference = endDiff / 2 - startDiff / 2;
		const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
		const minPadding = Math.min(paddingObject[minProp], largestPossiblePadding);
		const maxPadding = Math.min(paddingObject[maxProp], largestPossiblePadding);
		const min = minPadding;
		const max = clientSize - arrowDimensions[length] - maxPadding;
		const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
		const offset = clamp(min, center, max);
		const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center !== offset && rects.reference[length] / 2 - (center < min ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
		const alignmentOffset = shouldAddOffset ? center < min ? center - min : center - max : 0;
		return {
			[axis]: coords[axis] + alignmentOffset,
			data: {
				[axis]: offset,
				centerOffset: center - offset - alignmentOffset,
				...shouldAddOffset && { alignmentOffset }
			},
			reset: shouldAddOffset
		};
	}
});
/**
* Provides data to position an inner element of the floating element so that it
* appears centered to the reference element.
* This wraps the core `arrow` middleware to allow React refs as the element.
* @see https://floating-ui.com/docs/arrow
*/
const arrow = (options, deps) => ({
	...baseArrow(options),
	options: [options, deps]
});
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/utils/hideMiddleware.mjs
const nativeHideFn = hide$1().fn;
const hide = {
	name: "hide",
	async fn(state) {
		const { width, height, x, y } = state.rects.reference;
		const anchorHidden = width === 0 && height === 0 && x === 0 && y === 0;
		return { data: { referenceHidden: (await nativeHideFn(state)).data?.referenceHidden || anchorHidden } };
	}
};
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/utils/adaptiveOriginMiddleware.mjs
const DEFAULT_SIDES = {
	sideX: "left",
	sideY: "top"
};
const adaptiveOrigin = {
	name: "adaptiveOrigin",
	async fn(state) {
		const { x: rawX, y: rawY, rects: { floating: floatRect }, elements: { floating }, platform, strategy, placement } = state;
		const win = getWindow(floating);
		const styles = win.getComputedStyle(floating);
		if (!(styles.transitionDuration !== "0s" && styles.transitionDuration !== "")) return {
			x: rawX,
			y: rawY,
			data: DEFAULT_SIDES
		};
		const offsetParent = await platform.getOffsetParent?.(floating);
		let offsetDimensions = {
			width: 0,
			height: 0
		};
		if (strategy === "fixed" && win?.visualViewport) offsetDimensions = {
			width: win.visualViewport.width,
			height: win.visualViewport.height
		};
		else if (offsetParent === win) {
			const doc = ownerDocument(floating);
			offsetDimensions = {
				width: doc.documentElement.clientWidth,
				height: doc.documentElement.clientHeight
			};
		} else if (await platform.isElement?.(offsetParent)) offsetDimensions = await platform.getDimensions(offsetParent);
		const currentSide = getSide(placement);
		let x = rawX;
		let y = rawY;
		if (currentSide === "left") x = offsetDimensions.width - (rawX + floatRect.width);
		if (currentSide === "top") y = offsetDimensions.height - (rawY + floatRect.height);
		const sideX = currentSide === "left" ? "right" : DEFAULT_SIDES.sideX;
		const sideY = currentSide === "top" ? "bottom" : DEFAULT_SIDES.sideY;
		return {
			x,
			y,
			data: {
				sideX,
				sideY
			}
		};
	}
};
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/utils/useAnchorPositioning.mjs
function getLogicalSide(sideParam, renderedSide, isRtl) {
	const isLogicalSideParam = sideParam === "inline-start" || sideParam === "inline-end";
	return {
		top: "top",
		right: isLogicalSideParam ? isRtl ? "inline-start" : "inline-end" : "right",
		bottom: "bottom",
		left: isLogicalSideParam ? isRtl ? "inline-end" : "inline-start" : "left"
	}[renderedSide];
}
function getOffsetData(state, sideParam, isRtl) {
	const { rects, placement } = state;
	return {
		side: getLogicalSide(sideParam, getSide(placement), isRtl),
		align: getAlignment(placement) || "center",
		anchor: {
			width: rects.reference.width,
			height: rects.reference.height
		},
		positioner: {
			width: rects.floating.width,
			height: rects.floating.height
		}
	};
}
/**
* Provides standardized anchor positioning behavior for floating elements. Wraps Floating UI's
* `useFloating` hook.
*/
function useAnchorPositioning(params) {
	const { anchor, positionMethod = "absolute", side: sideParam = "bottom", sideOffset = 0, align = "center", alignOffset = 0, collisionBoundary, collisionPadding: collisionPaddingParam = 5, sticky = false, arrowPadding = 5, disableAnchorTracking = false, inline: inlineMiddleware, keepMounted = false, floatingRootContext, mounted, collisionAvoidance, shiftCrossAxis = false, nodeId, adaptiveOrigin, lazyFlip = false, externalTree } = params;
	const [mountSide, setMountSide] = react$1.useState(null);
	if (!mounted && mountSide !== null) setMountSide(null);
	const collisionAvoidanceSide = collisionAvoidance.side || "flip";
	const collisionAvoidanceAlign = collisionAvoidance.align || "flip";
	const collisionAvoidanceFallbackAxisSide = collisionAvoidance.fallbackAxisSide || "end";
	const anchorFn = typeof anchor === "function" ? anchor : void 0;
	const anchorFnCallback = useStableCallback(anchorFn);
	const anchorDep = anchorFn ? anchorFnCallback : anchor;
	const anchorValueRef = useValueAsRef(anchor);
	const mountedRef = useValueAsRef(mounted);
	const isRtl = useDirection() === "rtl";
	const side = mountSide || {
		top: "top",
		right: "right",
		bottom: "bottom",
		left: "left",
		"inline-end": isRtl ? "left" : "right",
		"inline-start": isRtl ? "right" : "left"
	}[sideParam];
	const placement = align === "center" ? side : `${side}-${align}`;
	let collisionPadding = collisionPaddingParam;
	const bias = 1;
	const biasTop = sideParam === "bottom" ? bias : 0;
	const biasBottom = sideParam === "top" ? bias : 0;
	const biasLeft = sideParam === "right" ? bias : 0;
	const biasRight = sideParam === "left" ? bias : 0;
	if (typeof collisionPadding === "number") collisionPadding = {
		top: collisionPadding + biasTop,
		right: collisionPadding + biasRight,
		bottom: collisionPadding + biasBottom,
		left: collisionPadding + biasLeft
	};
	else if (collisionPadding) collisionPadding = {
		top: (collisionPadding.top || 0) + biasTop,
		right: (collisionPadding.right || 0) + biasRight,
		bottom: (collisionPadding.bottom || 0) + biasBottom,
		left: (collisionPadding.left || 0) + biasLeft
	};
	const commonCollisionProps = {
		boundary: collisionBoundary === "clipping-ancestors" ? "clippingAncestors" : collisionBoundary,
		padding: collisionPadding
	};
	const arrowRef = react$1.useRef(null);
	const sideOffsetRef = useValueAsRef(sideOffset);
	const alignOffsetRef = useValueAsRef(alignOffset);
	const sideOffsetDep = typeof sideOffset !== "function" ? sideOffset : 0;
	const alignOffsetDep = typeof alignOffset !== "function" ? alignOffset : 0;
	const middleware = [];
	if (inlineMiddleware) middleware.push(inlineMiddleware);
	middleware.push(offset((state) => {
		const data = getOffsetData(state, sideParam, isRtl);
		const sideAxis = typeof sideOffsetRef.current === "function" ? sideOffsetRef.current(data) : sideOffsetRef.current;
		const alignAxis = typeof alignOffsetRef.current === "function" ? alignOffsetRef.current(data) : alignOffsetRef.current;
		return {
			mainAxis: sideAxis,
			crossAxis: alignAxis,
			alignmentAxis: alignAxis
		};
	}, [
		sideOffsetDep,
		alignOffsetDep,
		isRtl,
		sideParam
	]));
	const shiftDisabled = collisionAvoidanceAlign === "none" && collisionAvoidanceSide !== "shift";
	const crossAxisShiftEnabled = !shiftDisabled && (sticky || shiftCrossAxis || collisionAvoidanceSide === "shift");
	const flipMiddleware = collisionAvoidanceSide === "none" ? null : flip({
		...commonCollisionProps,
		padding: {
			top: collisionPadding.top + bias,
			right: collisionPadding.right + bias,
			bottom: collisionPadding.bottom + bias,
			left: collisionPadding.left + bias
		},
		mainAxis: !shiftCrossAxis && collisionAvoidanceSide === "flip",
		crossAxis: collisionAvoidanceAlign === "flip" ? "alignment" : false,
		fallbackAxisSideDirection: collisionAvoidanceFallbackAxisSide
	});
	const shiftMiddleware = shiftDisabled ? null : shift((data) => {
		const html = ownerDocument(data.elements.floating).documentElement;
		return {
			...commonCollisionProps,
			rootBoundary: shiftCrossAxis ? {
				x: 0,
				y: 0,
				width: html.clientWidth,
				height: html.clientHeight
			} : void 0,
			mainAxis: collisionAvoidanceAlign !== "none",
			crossAxis: crossAxisShiftEnabled,
			limiter: sticky || shiftCrossAxis ? void 0 : limitShift((limitData) => {
				if (!arrowRef.current) return {};
				const { width, height } = arrowRef.current.getBoundingClientRect();
				const sideAxis = getSideAxis(getSide(limitData.placement));
				const arrowSize = sideAxis === "y" ? width : height;
				const offsetAmount = sideAxis === "y" ? collisionPadding.left + collisionPadding.right : collisionPadding.top + collisionPadding.bottom;
				return { offset: arrowSize / 2 + offsetAmount / 2 };
			})
		};
	}, [
		commonCollisionProps,
		sticky,
		shiftCrossAxis,
		collisionPadding,
		collisionAvoidanceAlign
	]);
	if (collisionAvoidanceSide === "shift" || collisionAvoidanceAlign === "shift" || align === "center") middleware.push(shiftMiddleware, flipMiddleware);
	else middleware.push(flipMiddleware, shiftMiddleware);
	middleware.push(size({
		...commonCollisionProps,
		apply({ elements: { floating }, availableWidth, availableHeight, rects }) {
			if (!mountedRef.current) return;
			const floatingStyle = floating.style;
			floatingStyle.setProperty("--available-width", `${availableWidth}px`);
			floatingStyle.setProperty("--available-height", `${availableHeight}px`);
			const dpr = getWindow(floating).devicePixelRatio || 1;
			const { x, y, width, height } = rects.reference;
			const anchorWidth = (Math.round((x + width) * dpr) - Math.round(x * dpr)) / dpr;
			const anchorHeight = (Math.round((y + height) * dpr) - Math.round(y * dpr)) / dpr;
			floatingStyle.setProperty("--anchor-width", `${anchorWidth}px`);
			floatingStyle.setProperty("--anchor-height", `${anchorHeight}px`);
		}
	}), arrow((state) => ({
		element: arrowRef.current || ownerDocument(state.elements.floating).createElement("div"),
		padding: arrowPadding,
		offsetParent: "floating"
	}), [arrowPadding]), {
		name: "transformOrigin",
		fn(state) {
			const { elements, middlewareData, placement: renderedPlacement, rects, y } = state;
			const currentRenderedSide = getSide(renderedPlacement);
			const currentRenderedAxis = getSideAxis(currentRenderedSide);
			const arrowEl = arrowRef.current;
			const arrowX = middlewareData.arrow?.x || 0;
			const arrowY = middlewareData.arrow?.y || 0;
			const arrowWidth = arrowEl?.clientWidth || 0;
			const arrowHeight = arrowEl?.clientHeight || 0;
			const transformX = arrowX + arrowWidth / 2;
			const transformY = arrowY + arrowHeight / 2;
			const shiftY = Math.abs(middlewareData.shift?.y || 0);
			const halfAnchorHeight = rects.reference.height / 2;
			const sideOffsetValue = typeof sideOffset === "function" ? sideOffset(getOffsetData(state, sideParam, isRtl)) : sideOffset;
			const isOverlappingAnchor = shiftY > sideOffsetValue;
			const adjacentTransformOrigin = {
				top: `${transformX}px calc(100% + ${sideOffsetValue}px)`,
				bottom: `${transformX}px ${-sideOffsetValue}px`,
				left: `calc(100% + ${sideOffsetValue}px) ${transformY}px`,
				right: `${-sideOffsetValue}px ${transformY}px`
			}[currentRenderedSide];
			const overlapTransformOrigin = `${transformX}px ${rects.reference.y + halfAnchorHeight - y}px`;
			elements.floating.style.setProperty("--transform-origin", crossAxisShiftEnabled && currentRenderedAxis === "y" && isOverlappingAnchor ? overlapTransformOrigin : adjacentTransformOrigin);
			return {};
		}
	}, hide, adaptiveOrigin);
	useIsoLayoutEffect(() => {
		if (!mounted && floatingRootContext) floatingRootContext.update({
			referenceElement: null,
			floatingElement: null,
			domReferenceElement: null,
			positionReference: null
		});
	}, [mounted, floatingRootContext]);
	const autoUpdateOptions = react$1.useMemo(() => ({
		elementResize: !disableAnchorTracking && typeof ResizeObserver !== "undefined",
		layoutShift: !disableAnchorTracking && typeof IntersectionObserver !== "undefined"
	}), [disableAnchorTracking]);
	const { refs, elements, x, y, middlewareData, update, placement: renderedPlacement, context, isPositioned, floatingStyles: originalFloatingStyles } = useFloating({
		rootContext: floatingRootContext,
		open: keepMounted ? mounted : void 0,
		placement,
		middleware,
		strategy: positionMethod,
		whileElementsMounted: keepMounted ? void 0 : (...args) => autoUpdate(...args, autoUpdateOptions),
		nodeId,
		externalTree
	});
	const { sideX, sideY } = middlewareData.adaptiveOrigin || DEFAULT_SIDES;
	const resolvedPosition = isPositioned ? positionMethod : "fixed";
	const floatingStyles = react$1.useMemo(() => {
		const base = adaptiveOrigin ? {
			position: resolvedPosition,
			[sideX]: x,
			[sideY]: y
		} : {
			position: resolvedPosition,
			...originalFloatingStyles
		};
		if (!isPositioned) base.opacity = 0;
		return base;
	}, [
		adaptiveOrigin,
		resolvedPosition,
		sideX,
		x,
		sideY,
		y,
		originalFloatingStyles,
		isPositioned
	]);
	const registeredPositionReferenceRef = react$1.useRef(null);
	useIsoLayoutEffect(() => {
		if (!mounted) return;
		const anchorValue = anchorValueRef.current;
		const resolvedAnchor = typeof anchorValue === "function" ? anchorValue() : anchorValue;
		const finalAnchor = (isRef(resolvedAnchor) ? resolvedAnchor.current : resolvedAnchor) || null;
		if (finalAnchor !== registeredPositionReferenceRef.current) {
			refs.setPositionReference(finalAnchor);
			registeredPositionReferenceRef.current = finalAnchor;
		}
	}, [
		mounted,
		refs,
		anchorDep,
		anchorValueRef
	]);
	react$1.useEffect(() => {
		if (!mounted) return;
		const anchorValue = anchorValueRef.current;
		if (typeof anchorValue === "function") return;
		if (isRef(anchorValue) && anchorValue.current !== registeredPositionReferenceRef.current) {
			refs.setPositionReference(anchorValue.current);
			registeredPositionReferenceRef.current = anchorValue.current;
		}
	}, [
		mounted,
		refs,
		anchorDep,
		anchorValueRef
	]);
	react$1.useEffect(() => {
		if (keepMounted && mounted && elements.reference && elements.floating) return autoUpdate(elements.reference, elements.floating, update, autoUpdateOptions);
	}, [
		keepMounted,
		mounted,
		elements,
		update,
		autoUpdateOptions
	]);
	const renderedSide = getSide(renderedPlacement);
	const logicalRenderedSide = getLogicalSide(sideParam, renderedSide, isRtl);
	const renderedAlign = getAlignment(renderedPlacement) || "center";
	const anchorHidden = Boolean(middlewareData.hide?.referenceHidden);
	useIsoLayoutEffect(() => {
		if (lazyFlip && mounted && isPositioned) setMountSide(renderedSide);
	}, [
		lazyFlip,
		mounted,
		isPositioned,
		renderedSide
	]);
	const arrowStyles = react$1.useMemo(() => ({
		position: "absolute",
		top: middlewareData.arrow?.y,
		left: middlewareData.arrow?.x
	}), [middlewareData.arrow]);
	const arrowUncentered = middlewareData.arrow?.centerOffset !== 0;
	return react$1.useMemo(() => ({
		positionerStyles: floatingStyles,
		arrowStyles,
		arrowRef,
		arrowUncentered,
		side: logicalRenderedSide,
		align: renderedAlign,
		physicalSide: renderedSide,
		anchorHidden,
		refs,
		context,
		isPositioned,
		update
	}), [
		floatingStyles,
		arrowStyles,
		arrowRef,
		arrowUncentered,
		logicalRenderedSide,
		renderedAlign,
		renderedSide,
		anchorHidden,
		refs,
		context,
		isPositioned,
		update
	]);
}
function isRef(param) {
	return param != null && "current" in param;
}
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/utils/getDisabledMountTransitionStyles.mjs
function getDisabledMountTransitionStyles(transitionStatus) {
	return transitionStatus === "starting" ? DISABLED_TRANSITIONS_STYLE : EMPTY_OBJECT;
}
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/utils/usePositioner.mjs
/**
* Renders the shared outer Positioner element used by popup components.
* Applies the common role, hidden state, transition styles, state attributes, and optional inert styling.
*/
function usePositioner(componentProps, state, { styles, transitionStatus, props, refs, hidden, inert = false }) {
	const style = { ...styles };
	if (inert) style.pointerEvents = "none";
	return useRenderElement("div", componentProps, {
		state,
		ref: refs,
		props: [
			{
				role: "presentation",
				hidden,
				style
			},
			getDisabledMountTransitionStyles(transitionStatus),
			props
		],
		stateAttributesMapping: popupStateMapping
	});
}
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/button/Button.mjs
/**
* A button component that can be used to trigger actions.
* Renders a `<button>` element.
*
* Documentation: [Base UI Button](https://base-ui.com/react/components/button)
*/
const Button$2 = /*#__PURE__*/ react$1.forwardRef(function Button(componentProps, forwardedRef) {
	const { render, className, disabled = false, focusableWhenDisabled = false, nativeButton = true, style, ...elementProps } = componentProps;
	const { getButtonProps, buttonRef } = useButton({
		disabled,
		focusableWhenDisabled,
		native: nativeButton
	});
	return useRenderElement("button", componentProps, {
		state: { disabled },
		ref: [forwardedRef, buttonRef],
		props: [elementProps, getButtonProps]
	});
});
if (process.env.NODE_ENV !== "production") Button$2.displayName = "Button";
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/utils/FloatingPortalLite.mjs
/**
* `FloatingPortal` includes tabbable logic handling for focus management.
* For components that don't need tabbable logic, use `FloatingPortalLite`.
* @internal
*/
const FloatingPortalLite = /*#__PURE__*/ react$1.forwardRef(function FloatingPortalLite(componentProps, forwardedRef) {
	const { children, container, className, render, style, ...elementProps } = componentProps;
	const { portalNode, portalSubtree } = useFloatingPortalNode({
		container,
		ref: forwardedRef,
		componentProps,
		elementProps
	});
	if (!portalSubtree && !portalNode) return null;
	return /*#__PURE__*/ (0, react_jsx_runtime.jsxs)(react$1.Fragment, { children: [portalSubtree, portalNode && /*#__PURE__*/ react_dom.createPortal(children, portalNode)] });
});
if (process.env.NODE_ENV !== "production") FloatingPortalLite.displayName = "FloatingPortalLite";
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/tooltip/root/TooltipRootContext.mjs
const TooltipRootContext = /*#__PURE__*/ react$1.createContext(void 0);
if (process.env.NODE_ENV !== "production") TooltipRootContext.displayName = "TooltipRootContext";
function useTooltipRootContext(optional) {
	const context = react$1.useContext(TooltipRootContext);
	if (context === void 0 && !optional) throw new Error(process.env.NODE_ENV !== "production" ? "Base UI: TooltipRootContext is missing. Tooltip parts must be placed within <Tooltip.Root>." : formatErrorMessage(72));
	return context;
}
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/tooltip/store/TooltipStore.mjs
const selectors = {
	...popupStoreSelectors,
	disabled: createSelector((state) => state.disabled),
	instantType: createSelector((state) => state.instantType),
	isInstantPhase: createSelector((state) => state.isInstantPhase),
	trackCursorAxis: createSelector((state) => state.trackCursorAxis),
	disableHoverablePopup: createSelector((state) => state.disableHoverablePopup),
	lastOpenChangeReason: createSelector((state) => state.openChangeReason),
	closeOnClick: createSelector((state) => state.closeOnClick),
	closeDelay: createSelector((state) => state.closeDelay),
	hasViewport: createSelector((state) => state.hasViewport)
};
var TooltipStore = class TooltipStore extends ReactStore {
	constructor(initialState, floatingId, nested = false) {
		const triggerElements = new PopupTriggerMap();
		const state = {
			...createInitialState(),
			...initialState
		};
		state.floatingRootContext = createPopupFloatingRootContext(triggerElements, floatingId, nested);
		super(state, {
			popupRef: /*#__PURE__*/ react$1.createRef(),
			onOpenChange: void 0,
			onOpenChangeComplete: void 0,
			triggerElements
		}, selectors);
	}
	setOpen = (nextOpen, eventDetails) => {
		applyPopupOpenChange(this, nextOpen, eventDetails, { extraState: { openChangeReason: eventDetails.reason } });
	};
	cancelPendingOpen(event) {
		this.state.floatingRootContext.dispatchOpenChange(false, createChangeEventDetails(triggerPress, event));
	}
	static useStore(externalStore, initialState) {
		return usePopupStore(externalStore, (floatingId, nested) => new TooltipStore(initialState, floatingId, nested)).store;
	}
};
function createInitialState() {
	return {
		...createInitialPopupStoreState(),
		disabled: false,
		instantType: void 0,
		isInstantPhase: false,
		trackCursorAxis: "none",
		disableHoverablePopup: false,
		openChangeReason: null,
		closeOnClick: true,
		closeDelay: 0,
		hasViewport: false
	};
}
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/tooltip/root/TooltipRoot.mjs
/**
* Groups all parts of the tooltip.
* Doesn't render its own HTML element.
*
* Documentation: [Base UI Tooltip](https://base-ui.com/react/components/tooltip)
*/
const TooltipRoot = fastComponent(function TooltipRoot(props) {
	const { disabled: disabled$1 = false, defaultOpen = false, open: openProp, disableHoverablePopup = false, trackCursorAxis = "none", actionsRef, onOpenChange, onOpenChangeComplete, handle, triggerId: triggerIdProp, defaultTriggerId: defaultTriggerIdProp = null, children } = props;
	const store = TooltipStore.useStore(handle?.store, {
		open: defaultOpen,
		openProp,
		activeTriggerId: defaultTriggerIdProp,
		triggerIdProp
	});
	useInitialOpenSync(store, openProp, defaultOpen, defaultTriggerIdProp);
	store.useControlledProp("openProp", openProp);
	store.useControlledProp("triggerIdProp", triggerIdProp);
	store.useContextCallback("onOpenChange", onOpenChange);
	store.useContextCallback("onOpenChangeComplete", onOpenChangeComplete);
	const openState = store.useState("open");
	const open = !disabled$1 && openState;
	const activeTriggerId = store.useState("activeTriggerId");
	const mounted = store.useState("mounted");
	const payload = store.useState("payload");
	store.useSyncedValues({
		trackCursorAxis,
		disableHoverablePopup
	});
	store.useSyncedValue("disabled", disabled$1);
	useImplicitActiveTrigger(store, { closeOnActiveTriggerUnmount: true });
	const { forceUnmount, transitionStatus } = useOpenStateTransitions(open, store);
	const isInstantPhase = store.useState("isInstantPhase");
	const instantType = store.useState("instantType");
	const lastOpenChangeReason = store.useState("lastOpenChangeReason");
	const previousInstantTypeRef = react$1.useRef(null);
	useIsoLayoutEffect(() => {
		if (openState && disabled$1) store.setOpen(false, createChangeEventDetails(disabled));
	}, [
		openState,
		disabled$1,
		store
	]);
	useIsoLayoutEffect(() => {
		if (transitionStatus === "ending" && lastOpenChangeReason === "none" || transitionStatus !== "ending" && isInstantPhase) {
			if (instantType !== "delay") previousInstantTypeRef.current = instantType;
			store.set("instantType", "delay");
		} else if (previousInstantTypeRef.current !== null) {
			store.set("instantType", previousInstantTypeRef.current);
			previousInstantTypeRef.current = null;
		}
	}, [
		transitionStatus,
		isInstantPhase,
		lastOpenChangeReason,
		instantType,
		store
	]);
	useIsoLayoutEffect(() => {
		if (open) {
			if (activeTriggerId == null) store.set("payload", void 0);
		}
	}, [
		store,
		activeTriggerId,
		open
	]);
	const handleImperativeClose = react$1.useCallback(() => {
		store.setOpen(false, createChangeEventDetails(imperativeAction));
	}, [store]);
	react$1.useImperativeHandle(actionsRef, () => ({
		unmount: forceUnmount,
		close: handleImperativeClose
	}), [forceUnmount, handleImperativeClose]);
	const shouldRenderInteractions = open || mounted || !disabled$1 && trackCursorAxis !== "none";
	return /*#__PURE__*/ (0, react_jsx_runtime.jsxs)(TooltipRootContext.Provider, {
		value: store,
		children: [shouldRenderInteractions && /*#__PURE__*/ (0, react_jsx_runtime.jsx)(TooltipInteractions, {
			store,
			disabled: disabled$1,
			trackCursorAxis
		}), typeof children === "function" ? children({ payload }) : children]
	});
});
if (process.env.NODE_ENV !== "production") TooltipRoot.displayName = "TooltipRoot";
function TooltipInteractions({ store, disabled, trackCursorAxis }) {
	const floatingRootContext = store.useState("floatingRootContext");
	const dismiss = useDismiss(floatingRootContext, {
		enabled: !disabled,
		referencePress: () => store.select("closeOnClick")
	});
	const clientPoint = useClientPoint(floatingRootContext, {
		enabled: !disabled && trackCursorAxis !== "none",
		axis: trackCursorAxis === "none" ? void 0 : trackCursorAxis
	});
	usePopupInteractionProps(store, {
		activeTriggerProps: react$1.useMemo(() => mergeProps(clientPoint.reference, dismiss.reference), [clientPoint.reference, dismiss.reference]),
		inactiveTriggerProps: react$1.useMemo(() => mergeProps(clientPoint.trigger, dismiss.trigger), [clientPoint.trigger, dismiss.trigger]),
		popupProps: react$1.useMemo(() => mergeProps(FOCUSABLE_POPUP_PROPS, clientPoint.floating, dismiss.floating), [clientPoint.floating, dismiss.floating])
	});
	return null;
}
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/tooltip/provider/TooltipProviderContext.mjs
const TooltipProviderContext = /*#__PURE__*/ react$1.createContext(void 0);
if (process.env.NODE_ENV !== "production") TooltipProviderContext.displayName = "TooltipProviderContext";
function useTooltipProviderContext() {
	return react$1.useContext(TooltipProviderContext);
}
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/tooltip/trigger/TooltipTriggerDataAttributes.mjs
let TooltipTriggerDataAttributes = function(TooltipTriggerDataAttributes) {
	/**
	* Present when the corresponding tooltip is open.
	*/
	TooltipTriggerDataAttributes[TooltipTriggerDataAttributes["popupOpen"] = CommonTriggerDataAttributes.popupOpen] = "popupOpen";
	/**
	* Present when the trigger is disabled, either by the `disabled` prop or by a parent `<Tooltip.Root>` component.
	*/
	TooltipTriggerDataAttributes["triggerDisabled"] = "data-trigger-disabled";
	return TooltipTriggerDataAttributes;
}({});
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/tooltip/trigger/TooltipTrigger.mjs
const TOOLTIP_TRIGGER_IDENTIFIER = "data-base-ui-tooltip-trigger";
function getTargetElement(event) {
	if ("composedPath" in event) {
		const path = event.composedPath();
		for (let i = 0; i < path.length; i += 1) {
			const element = path[i];
			if (isElement(element)) return element;
		}
	}
	const target = event.target;
	if (isElement(target)) return target;
	return null;
}
function closestEnabledTooltipTrigger(element) {
	let current = element;
	while (current) {
		if (current.hasAttribute(TOOLTIP_TRIGGER_IDENTIFIER)) return current;
		const parentElement = current.parentElement;
		if (parentElement) {
			current = parentElement;
			continue;
		}
		const root = current.getRootNode();
		current = "host" in root && isElement(root.host) ? root.host : null;
	}
	return null;
}
/**
* An element to attach the tooltip to.
* Renders a `<button>` element.
*
* Documentation: [Base UI Tooltip](https://base-ui.com/react/components/tooltip)
*/
const TooltipTrigger = fastComponentRef(function TooltipTrigger(componentProps, forwardedRef) {
	const { render, className, style, handle, payload, disabled: disabledProp, delay, closeOnClick = true, closeDelay, id: idProp, ...elementProps } = componentProps;
	const rootContext = useTooltipRootContext(true);
	const store = handle?.store ?? rootContext;
	if (!store) throw new Error(process.env.NODE_ENV !== "production" ? "Base UI: <Tooltip.Trigger> must be either used within a <Tooltip.Root> component or provided with a handle." : formatErrorMessage(82));
	const thisTriggerId = useBaseUiId(idProp);
	const isTriggerActive = store.useState("isTriggerActive", thisTriggerId);
	const isOpenedByThisTrigger = store.useState("isOpenedByTrigger", thisTriggerId);
	const floatingRootContext = store.useState("floatingRootContext");
	const triggerElementRef = react$1.useRef(null);
	const delayWithDefault = delay ?? 600;
	const closeDelayWithDefault = closeDelay ?? 0;
	const { registerTrigger, isMountedByThisTrigger } = useTriggerDataForwarding(thisTriggerId, triggerElementRef, store, {
		payload,
		closeOnClick,
		closeDelay: closeDelayWithDefault
	});
	const providerContext = useTooltipProviderContext();
	const { delayRef, isInstantPhase, hasProvider } = useDelayGroup(floatingRootContext, { open: isOpenedByThisTrigger });
	const hoverInteraction = useHoverInteractionSharedState(floatingRootContext);
	store.useSyncedValue("isInstantPhase", isInstantPhase);
	const rootDisabled = store.useState("disabled");
	const disabled = disabledProp ?? rootDisabled;
	const disabledRef = useValueAsRef(disabled);
	const trackCursorAxis = store.useState("trackCursorAxis");
	const disableHoverablePopup = store.useState("disableHoverablePopup");
	const isNestedTriggerHoveredRef = react$1.useRef(false);
	const nestedTriggerOpenTimeout = useTimeout();
	const pointerTypeRef = react$1.useRef(void 0);
	function getOpenDelay() {
		const providerDelay = providerContext?.delay;
		const groupOpenValue = typeof delayRef.current === "object" ? delayRef.current.open : void 0;
		let computedOpenDelay = delayWithDefault;
		if (hasProvider) if (groupOpenValue !== 0) computedOpenDelay = delay ?? providerDelay ?? delayWithDefault;
		else computedOpenDelay = 0;
		return computedOpenDelay;
	}
	function isEnabledNestedTriggerTarget(target) {
		const triggerEl = triggerElementRef.current;
		if (!triggerEl || !target) return false;
		const nearestTrigger = closestEnabledTooltipTrigger(target);
		return nearestTrigger !== null && nearestTrigger !== triggerEl && contains(triggerEl, nearestTrigger);
	}
	function detectNestedTriggerHover(target) {
		const nestedTriggerHovered = isEnabledNestedTriggerTarget(target);
		isNestedTriggerHoveredRef.current = nestedTriggerHovered;
		if (nestedTriggerHovered) {
			hoverInteraction.openChangeTimeout.clear();
			hoverInteraction.restTimeout.clear();
			hoverInteraction.restTimeoutPending = false;
			nestedTriggerOpenTimeout.clear();
		}
		return nestedTriggerHovered;
	}
	const hoverProps = useHoverReferenceInteraction(floatingRootContext, {
		enabled: !disabled,
		mouseOnly: true,
		move: false,
		handleClose: !disableHoverablePopup && trackCursorAxis !== "both" ? safePolygon() : null,
		restMs: getOpenDelay,
		delay() {
			const closeValue = typeof delayRef.current === "object" ? delayRef.current.close : void 0;
			let computedCloseDelay = closeDelayWithDefault;
			if (closeDelay == null && hasProvider) computedCloseDelay = closeValue;
			return { close: computedCloseDelay };
		},
		triggerElementRef,
		isActiveTrigger: isTriggerActive,
		isClosing: () => store.select("transitionStatus") === "ending",
		shouldOpen() {
			return !isNestedTriggerHoveredRef.current;
		}
	});
	const focusProps = useFocus(floatingRootContext, { enabled: !disabled }).reference;
	const handleNestedTriggerHover = (event) => {
		const wasNestedTriggerHovered = isNestedTriggerHoveredRef.current;
		const target = getTargetElement(event);
		const nestedTriggerHovered = detectNestedTriggerHover(target);
		const triggerEl = triggerElementRef.current;
		const targetInsideTrigger = triggerEl && target && contains(triggerEl, target);
		if (nestedTriggerHovered && store.select("open") && store.select("lastOpenChangeReason") === "trigger-hover") {
			store.setOpen(false, createChangeEventDetails(triggerHover, event));
			return;
		}
		if (wasNestedTriggerHovered && !nestedTriggerHovered && targetInsideTrigger && !disabledRef.current && !store.select("open") && triggerEl && isMouseLikePointerType(pointerTypeRef.current)) {
			const open = () => {
				if (!isNestedTriggerHoveredRef.current && !disabledRef.current && !store.select("open")) store.setOpen(true, createChangeEventDetails(triggerHover, event, triggerEl));
			};
			const openDelay = getOpenDelay();
			if (openDelay === 0) {
				nestedTriggerOpenTimeout.clear();
				open();
			} else nestedTriggerOpenTimeout.start(openDelay, open);
		}
	};
	const rootTriggerProps = store.useState("triggerProps", isMountedByThisTrigger);
	return useRenderElement("button", componentProps, {
		state: { open: isOpenedByThisTrigger },
		ref: [
			forwardedRef,
			registerTrigger,
			triggerElementRef
		],
		props: [
			hoverProps,
			focusProps,
			isMountedByThisTrigger || trackCursorAxis !== "none" ? rootTriggerProps : void 0,
			{
				onMouseOver(event) {
					handleNestedTriggerHover(event.nativeEvent);
				},
				onFocus(event) {
					if (isEnabledNestedTriggerTarget(getTargetElement(event.nativeEvent))) event.preventBaseUIHandler();
				},
				onMouseLeave() {
					isNestedTriggerHoveredRef.current = false;
					nestedTriggerOpenTimeout.clear();
					pointerTypeRef.current = void 0;
				},
				onPointerEnter(event) {
					pointerTypeRef.current = event.pointerType;
				},
				onPointerDown(event) {
					pointerTypeRef.current = event.pointerType;
					store.set("closeOnClick", closeOnClick);
					if (closeOnClick && !store.select("open")) store.cancelPendingOpen(event.nativeEvent);
				},
				onClick(event) {
					if (closeOnClick && !store.select("open")) store.cancelPendingOpen(event.nativeEvent);
				},
				id: thisTriggerId,
				[TooltipTriggerDataAttributes.triggerDisabled]: disabled ? "" : void 0,
				[TOOLTIP_TRIGGER_IDENTIFIER]: disabled ? void 0 : ""
			},
			elementProps
		],
		stateAttributesMapping: triggerOpenStateMapping
	});
});
if (process.env.NODE_ENV !== "production") TooltipTrigger.displayName = "TooltipTrigger";
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/tooltip/portal/TooltipPortalContext.mjs
const TooltipPortalContext = /*#__PURE__*/ react$1.createContext(void 0);
if (process.env.NODE_ENV !== "production") TooltipPortalContext.displayName = "TooltipPortalContext";
function useTooltipPortalContext() {
	const value = react$1.useContext(TooltipPortalContext);
	if (value === void 0) throw new Error(process.env.NODE_ENV !== "production" ? "Base UI: <Tooltip.Portal> is missing." : formatErrorMessage(70));
	return value;
}
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/tooltip/portal/TooltipPortal.mjs
/**
* A portal element that moves the popup to a different part of the DOM.
* By default, the portal element is appended to `<body>`.
* Renders a `<div>` element.
*
* Documentation: [Base UI Tooltip](https://base-ui.com/react/components/tooltip)
*/
const TooltipPortal = /*#__PURE__*/ react$1.forwardRef(function TooltipPortal(props, forwardedRef) {
	const { keepMounted = false, ...portalProps } = props;
	if (!(useTooltipRootContext().useState("mounted") || keepMounted)) return null;
	return /*#__PURE__*/ (0, react_jsx_runtime.jsx)(TooltipPortalContext.Provider, {
		value: keepMounted,
		children: /*#__PURE__*/ (0, react_jsx_runtime.jsx)(FloatingPortalLite, {
			ref: forwardedRef,
			...portalProps
		})
	});
});
if (process.env.NODE_ENV !== "production") TooltipPortal.displayName = "TooltipPortal";
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/tooltip/positioner/TooltipPositionerContext.mjs
const TooltipPositionerContext = /*#__PURE__*/ react$1.createContext(void 0);
if (process.env.NODE_ENV !== "production") TooltipPositionerContext.displayName = "TooltipPositionerContext";
function useTooltipPositionerContext() {
	const context = react$1.useContext(TooltipPositionerContext);
	if (context === void 0) throw new Error(process.env.NODE_ENV !== "production" ? "Base UI: TooltipPositionerContext is missing. TooltipPositioner parts must be placed within <Tooltip.Positioner>." : formatErrorMessage(71));
	return context;
}
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/tooltip/positioner/TooltipPositioner.mjs
/**
* Positions the tooltip against the trigger.
* Renders a `<div>` element.
*
* Documentation: [Base UI Tooltip](https://base-ui.com/react/components/tooltip)
*/
const TooltipPositioner = /*#__PURE__*/ react$1.forwardRef(function TooltipPositioner(componentProps, forwardedRef) {
	const { render, className, anchor, positionMethod = "absolute", side = "top", align = "center", sideOffset = 0, alignOffset = 0, collisionBoundary = "clipping-ancestors", collisionPadding = 5, arrowPadding = 5, sticky = false, disableAnchorTracking = false, collisionAvoidance = POPUP_COLLISION_AVOIDANCE, style, ...elementProps } = componentProps;
	const store = useTooltipRootContext();
	const keepMounted = useTooltipPortalContext();
	const open = store.useState("open");
	const mounted = store.useState("mounted");
	const trackCursorAxis = store.useState("trackCursorAxis");
	const disableHoverablePopup = store.useState("disableHoverablePopup");
	const floatingRootContext = store.useState("floatingRootContext");
	const instantType = store.useState("instantType");
	const transitionStatus = store.useState("transitionStatus");
	const positioning = useAnchorPositioning({
		anchor,
		positionMethod,
		floatingRootContext,
		mounted,
		side,
		sideOffset,
		align,
		alignOffset,
		collisionBoundary,
		collisionPadding,
		sticky,
		arrowPadding,
		disableAnchorTracking,
		keepMounted,
		collisionAvoidance,
		adaptiveOrigin: store.useState("hasViewport") ? adaptiveOrigin : void 0
	});
	const element = usePositioner(componentProps, react$1.useMemo(() => ({
		open,
		side: positioning.side,
		align: positioning.align,
		anchorHidden: positioning.anchorHidden,
		instant: trackCursorAxis !== "none" ? "tracking-cursor" : instantType
	}), [
		open,
		positioning.side,
		positioning.align,
		positioning.anchorHidden,
		trackCursorAxis,
		instantType
	]), {
		styles: positioning.positionerStyles,
		transitionStatus,
		props: elementProps,
		refs: [forwardedRef, store.useStateSetter("positionerElement")],
		hidden: !mounted,
		inert: !open || trackCursorAxis === "both" || disableHoverablePopup
	});
	return /*#__PURE__*/ (0, react_jsx_runtime.jsx)(TooltipPositionerContext.Provider, {
		value: positioning,
		children: element
	});
});
if (process.env.NODE_ENV !== "production") TooltipPositioner.displayName = "TooltipPositioner";
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/tooltip/popup/TooltipPopup.mjs
const stateAttributesMapping = {
	...popupStateMapping,
	...transitionStatusMapping
};
/**
* A container for the tooltip contents.
* Renders a `<div>` element.
*
* Documentation: [Base UI Tooltip](https://base-ui.com/react/components/tooltip)
*/
const TooltipPopup = /*#__PURE__*/ react$1.forwardRef(function TooltipPopup(componentProps, forwardedRef) {
	const { render, className, style, ...elementProps } = componentProps;
	const store = useTooltipRootContext();
	const { side, align } = useTooltipPositionerContext();
	const open = store.useState("open");
	const instantType = store.useState("instantType");
	const transitionStatus = store.useState("transitionStatus");
	const popupProps = store.useState("popupProps");
	const floatingContext = store.useState("floatingRootContext");
	const disabled = store.useState("disabled");
	const closeDelay = store.useState("closeDelay");
	useOpenChangeComplete({
		open,
		ref: store.context.popupRef,
		onComplete() {
			if (open) store.context.onOpenChangeComplete?.(true);
		}
	});
	useHoverFloatingInteraction(floatingContext, {
		enabled: !disabled,
		closeDelay
	});
	const setPopupElement = store.useStateSetter("popupElement");
	return useRenderElement("div", componentProps, {
		state: {
			open,
			side,
			align,
			instant: instantType,
			transitionStatus
		},
		ref: [
			forwardedRef,
			store.context.popupRef,
			setPopupElement
		],
		props: [
			popupProps,
			getDisabledMountTransitionStyles(transitionStatus),
			elementProps
		],
		stateAttributesMapping
	});
});
if (process.env.NODE_ENV !== "production") TooltipPopup.displayName = "TooltipPopup";
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/tooltip/provider/TooltipProvider.mjs
/**
* Provides a shared delay for multiple tooltips. The grouping logic ensures that
* once a tooltip becomes visible, the adjacent tooltips will be shown instantly.
*
* Documentation: [Base UI Tooltip](https://base-ui.com/react/components/tooltip)
*/
const TooltipProvider = function TooltipProvider(props) {
	const { delay, closeDelay, timeout = 400 } = props;
	const contextValue = react$1.useMemo(() => ({
		delay,
		closeDelay
	}), [delay, closeDelay]);
	const delayValue = react$1.useMemo(() => ({
		open: delay,
		close: closeDelay
	}), [delay, closeDelay]);
	return /*#__PURE__*/ (0, react_jsx_runtime.jsx)(TooltipProviderContext.Provider, {
		value: contextValue,
		children: /*#__PURE__*/ (0, react_jsx_runtime.jsx)(FloatingDelayGroup, {
			delay: delayValue,
			timeoutMs: timeout,
			children: props.children
		})
	});
};
if (process.env.NODE_ENV !== "production") TooltipProvider.displayName = "TooltipProvider";
//#endregion
//#region ../../../node_modules/.pnpm/@base-ui+react@1.6.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/use-render/useRender.mjs
/**
* Renders a Base UI element.
*
* @public
*/
function useRender(params) {
	return useRenderElement(params.defaultTagName ?? "div", params, params);
}
//#endregion
//#region ../../../node_modules/.pnpm/@wordpress+ui@0.17.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/ui/build-module/text/text.mjs
var STYLE_HASH_ATTRIBUTE$7 = "data-wp-hash";
function getRuntime$7() {
	const globalScope = globalThis;
	if (globalScope.__wpStyleRuntime) return globalScope.__wpStyleRuntime;
	globalScope.__wpStyleRuntime = {
		documents: /* @__PURE__ */ new Map(),
		styles: /* @__PURE__ */ new Map(),
		injectedStyles: /* @__PURE__ */ new WeakMap()
	};
	if (typeof document !== "undefined") registerDocument$7(document);
	return globalScope.__wpStyleRuntime;
}
function documentContainsStyleHash$7(targetDocument, hash) {
	if (!targetDocument.head) return false;
	for (const style of targetDocument.head.querySelectorAll(`style[${STYLE_HASH_ATTRIBUTE$7}]`)) if (style.getAttribute(STYLE_HASH_ATTRIBUTE$7) === hash) return true;
	return false;
}
function injectStyle$7(targetDocument, hash, css) {
	if (!targetDocument.head) return;
	const runtime = getRuntime$7();
	let injectedStyles = runtime.injectedStyles.get(targetDocument);
	if (!injectedStyles) {
		injectedStyles = /* @__PURE__ */ new Set();
		runtime.injectedStyles.set(targetDocument, injectedStyles);
	}
	if (injectedStyles.has(hash)) return;
	if (documentContainsStyleHash$7(targetDocument, hash)) {
		injectedStyles.add(hash);
		return;
	}
	const style = targetDocument.createElement("style");
	style.setAttribute(STYLE_HASH_ATTRIBUTE$7, hash);
	style.appendChild(targetDocument.createTextNode(css));
	targetDocument.head.appendChild(style);
	injectedStyles.add(hash);
}
function registerDocument$7(targetDocument) {
	const runtime = getRuntime$7();
	runtime.documents.set(targetDocument, (runtime.documents.get(targetDocument) ?? 0) + 1);
	for (const [hash, css] of runtime.styles) injectStyle$7(targetDocument, hash, css);
	return () => {
		const count = runtime.documents.get(targetDocument);
		if (count === void 0) return;
		if (count <= 1) {
			runtime.documents.delete(targetDocument);
			return;
		}
		runtime.documents.set(targetDocument, count - 1);
	};
}
function registerStyle$7(hash, css) {
	const runtime = getRuntime$7();
	runtime.styles.set(hash, css);
	for (const targetDocument of runtime.documents.keys()) injectStyle$7(targetDocument, hash, css);
}
if (typeof process === "undefined" || process.env.NODE_ENV !== "test") registerStyle$7("0c5702ddca", "@layer wp-ui{@layer utilities, components, compositions, overrides;@layer components{._83ed8a8da5dd50ea__text{margin:0}._14437cfb77831647__heading-2xl{--_gcd-heading-font-size:var(--wpds-typography-font-size-2xl,32px);--_gcd-heading-font-weight:var(--wpds-typography-font-weight-medium,499);--_gcd-p-font-size:var(--wpds-typography-font-size-2xl,32px);--_gcd-p-line-height:var(--wpds-typography-line-height-2xl,40px);font-size:var(--wpds-typography-font-size-2xl,32px);line-height:var(--wpds-typography-line-height-2xl,40px)}._14437cfb77831647__heading-2xl,._3c78b7fa9b4072dd__heading-xl{font-family:var(--wpds-typography-font-family-heading,-apple-system,system-ui,\"Segoe UI\",\"Roboto\",\"Oxygen-Sans\",\"Ubuntu\",\"Cantarell\",\"Helvetica Neue\",sans-serif);font-weight:var(--wpds-typography-font-weight-medium,499)}._3c78b7fa9b4072dd__heading-xl{--_gcd-heading-font-size:var(--wpds-typography-font-size-xl,20px);--_gcd-heading-font-weight:var(--wpds-typography-font-weight-medium,499);--_gcd-p-font-size:var(--wpds-typography-font-size-xl,20px);--_gcd-p-line-height:var(--wpds-typography-line-height-md,24px);font-size:var(--wpds-typography-font-size-xl,20px);line-height:var(--wpds-typography-line-height-md,24px)}.aa58f227716bcde2__heading-lg{--_gcd-heading-font-size:var(--wpds-typography-font-size-lg,15px);--_gcd-heading-font-weight:var(--wpds-typography-font-weight-medium,499);--_gcd-p-font-size:var(--wpds-typography-font-size-lg,15px);--_gcd-p-line-height:var(--wpds-typography-line-height-sm,20px);font-size:var(--wpds-typography-font-size-lg,15px)}.aa58f227716bcde2__heading-lg,.fc4da56d8dfe52c4__heading-md{font-family:var(--wpds-typography-font-family-heading,-apple-system,system-ui,\"Segoe UI\",\"Roboto\",\"Oxygen-Sans\",\"Ubuntu\",\"Cantarell\",\"Helvetica Neue\",sans-serif);font-weight:var(--wpds-typography-font-weight-medium,499);line-height:var(--wpds-typography-line-height-sm,20px)}.fc4da56d8dfe52c4__heading-md{--_gcd-heading-font-size:var(--wpds-typography-font-size-md,13px);--_gcd-heading-font-weight:var(--wpds-typography-font-weight-medium,499);--_gcd-p-font-size:var(--wpds-typography-font-size-md,13px);--_gcd-p-line-height:var(--wpds-typography-line-height-sm,20px);font-size:var(--wpds-typography-font-size-md,13px)}.a9b78c7c82e8dff7__heading-sm{--_gcd-heading-font-size:var(--wpds-typography-font-size-xs,11px);--_gcd-heading-font-weight:var(--wpds-typography-font-weight-medium,499);--_gcd-p-font-size:var(--wpds-typography-font-size-xs,11px);--_gcd-p-line-height:var(--wpds-typography-line-height-xs,16px);font-family:var(--wpds-typography-font-family-heading,-apple-system,system-ui,\"Segoe UI\",\"Roboto\",\"Oxygen-Sans\",\"Ubuntu\",\"Cantarell\",\"Helvetica Neue\",sans-serif);font-size:var(--wpds-typography-font-size-xs,11px);font-weight:var(--wpds-typography-font-weight-medium,499);line-height:var(--wpds-typography-line-height-xs,16px);text-transform:uppercase}._305ff559e52180d5__body-xl{--_gcd-heading-font-size:var(--wpds-typography-font-size-xl,20px);--_gcd-heading-font-weight:var(--wpds-typography-font-weight-regular,400);--_gcd-p-font-size:var(--wpds-typography-font-size-xl,20px);--_gcd-p-line-height:var(--wpds-typography-line-height-xl,32px);font-size:var(--wpds-typography-font-size-xl,20px);line-height:var(--wpds-typography-line-height-xl,32px)}._305ff559e52180d5__body-xl,.ca1aa3fc2029e958__body-lg{font-family:var(--wpds-typography-font-family-body,-apple-system,system-ui,\"Segoe UI\",\"Roboto\",\"Oxygen-Sans\",\"Ubuntu\",\"Cantarell\",\"Helvetica Neue\",sans-serif);font-weight:var(--wpds-typography-font-weight-regular,400)}.ca1aa3fc2029e958__body-lg{--_gcd-heading-font-size:var(--wpds-typography-font-size-lg,15px);--_gcd-heading-font-weight:var(--wpds-typography-font-weight-regular,400);--_gcd-p-font-size:var(--wpds-typography-font-size-lg,15px);--_gcd-p-line-height:var(--wpds-typography-line-height-md,24px);font-size:var(--wpds-typography-font-size-lg,15px);line-height:var(--wpds-typography-line-height-md,24px)}._131101940be12424__body-md{--_gcd-heading-font-size:var(--wpds-typography-font-size-md,13px);--_gcd-heading-font-weight:var(--wpds-typography-font-weight-regular,400);--_gcd-p-font-size:var(--wpds-typography-font-size-md,13px);--_gcd-p-line-height:var(--wpds-typography-line-height-sm,20px);font-size:var(--wpds-typography-font-size-md,13px);line-height:var(--wpds-typography-line-height-sm,20px)}._0e8d87a42c1f75fa__body-sm,._131101940be12424__body-md{font-family:var(--wpds-typography-font-family-body,-apple-system,system-ui,\"Segoe UI\",\"Roboto\",\"Oxygen-Sans\",\"Ubuntu\",\"Cantarell\",\"Helvetica Neue\",sans-serif);font-weight:var(--wpds-typography-font-weight-regular,400)}._0e8d87a42c1f75fa__body-sm{--_gcd-heading-font-size:var(--wpds-typography-font-size-sm,12px);--_gcd-heading-font-weight:var(--wpds-typography-font-weight-regular,400);--_gcd-p-font-size:var(--wpds-typography-font-size-sm,12px);--_gcd-p-line-height:var(--wpds-typography-line-height-xs,16px);font-size:var(--wpds-typography-font-size-sm,12px);line-height:var(--wpds-typography-line-height-xs,16px)}}}");
var style_default$6 = {
	"text": "_83ed8a8da5dd50ea__text",
	"heading-2xl": "_14437cfb77831647__heading-2xl",
	"heading-xl": "_3c78b7fa9b4072dd__heading-xl",
	"heading-lg": "aa58f227716bcde2__heading-lg",
	"heading-md": "fc4da56d8dfe52c4__heading-md",
	"heading-sm": "a9b78c7c82e8dff7__heading-sm",
	"body-xl": "_305ff559e52180d5__body-xl",
	"body-lg": "ca1aa3fc2029e958__body-lg",
	"body-md": "_131101940be12424__body-md",
	"body-sm": "_0e8d87a42c1f75fa__body-sm"
};
if (typeof process === "undefined" || process.env.NODE_ENV !== "test") registerStyle$7("d390e935a7", "._6defc79820e382c6__button{box-sizing:var(--_gcd-button-box-sizing,border-box);font-family:var(--_gcd-button-font-family,inherit);font-size:var(--_gcd-button-font-size,inherit);font-weight:var(--_gcd-button-font-weight,inherit)}.d2cff2e5dea83bd1__input{box-sizing:var(--_gcd-input-box-sizing,border-box);font-family:var(--_gcd-input-font-family,inherit);font-size:var(--_gcd-input-font-size,inherit);font-weight:var(--_gcd-input-font-weight,inherit);margin:var(--_gcd-input-margin,0);&:is(textarea,[type=text],[type=password],[type=color],[type=date],[type=datetime],[type=datetime-local],[type=email],[type=month],[type=number],[type=search],[type=tel],[type=time],[type=url],[type=week]){background-color:var(--_gcd-input-background-color,transparent);border:var(--_gcd-input-border,none);border-radius:var(--_gcd-input-border-radius,0);box-shadow:var(--_gcd-input-box-shadow,0 0 0 transparent);color:var(--_gcd-input-color,var(--wpds-color-foreground-interactive-neutral,#1e1e1e));&:focus{border-color:var(--_gcd-input-border-color-focus,var(--wp-admin-theme-color));box-shadow:var(--_gcd-input-box-shadow-focus,none);outline:var(--_gcd-input-outline-focus,none)}&:disabled{background:var(--_gcd-input-background-disabled,transparent);border-color:var(--_gcd-input-border-color-disabled,transparent);box-shadow:var(--_gcd-input-box-shadow-disabled,none);color:var(--_gcd-input-color-disabled,var(--wpds-color-foreground-interactive-neutral-disabled,#8d8d8d))}&::placeholder{color:var(--_gcd-input-placeholder-color,var(--wpds-color-foreground-interactive-neutral-disabled,#8d8d8d))}}&:is(textarea,[type=text],[type=password],[type=date],[type=datetime],[type=datetime-local],[type=email],[type=month],[type=number],[type=search],[type=tel],[type=time],[type=url],[type=week]){line-height:var(--_gcd-input-line-height,inherit);min-height:var(--_gcd-input-min-height,auto);padding:var(--_gcd-input-padding,0)}}._547d86373d02e108__textarea{box-sizing:var(--_gcd-textarea-box-sizing,border-box);overflow:var(--_gcd-textarea-overflow,auto);resize:var(--_gcd-textarea-resize,block)}._8c15fd0ed9f28ba4__div{outline:var(--_gcd-div-outline,0 solid transparent)}p._43cec3e1eec1066d__p{font-size:var(--_gcd-p-font-size,13px);line-height:var(--_gcd-p-line-height,1.5);margin:var(--_gcd-p-margin,0)}:is(h1,h2,h3,h4,h5,h6).e97669c6d9a38497__heading{color:var(--_gcd-heading-color,var(--wpds-color-foreground-content-neutral,#1e1e1e));font-size:var(--_gcd-heading-font-size,inherit);font-weight:var(--_gcd-heading-font-weight,var(--wpds-typography-font-weight-medium,499));margin:var(--_gcd-heading-margin,0)}._2c0831b0499dbd6e__a,._2c0831b0499dbd6e__a:is(:hover,:focus,:active){border-radius:var(--_gcd-a-border-radius,0);box-shadow:var(--_gcd-a-box-shadow,none);color:var(--_gcd-a-color,inherit);outline:var(--_gcd-a-outline,0 solid transparent);transition:var(--_gcd-a-transition,none)}");
var global_css_defense_default$1 = {
	"button": "_6defc79820e382c6__button",
	"input": "d2cff2e5dea83bd1__input",
	"textarea": "_547d86373d02e108__textarea",
	"div": "_8c15fd0ed9f28ba4__div",
	"p": "_43cec3e1eec1066d__p",
	"heading": "e97669c6d9a38497__heading",
	"a": "_2c0831b0499dbd6e__a"
};
var Text$2 = (0, react$1.forwardRef)(function Text2({ variant = "body-md", render, className, ...props }, ref) {
	return useRender({
		render,
		defaultTagName: "span",
		ref,
		props: mergeProps(props, { className: (0, clsx.default)(style_default$6.text, global_css_defense_default$1.heading, global_css_defense_default$1.p, style_default$6[variant], className) })
	});
});
//#endregion
//#region ../../../node_modules/.pnpm/@wordpress+dom-ready@4.51.0/node_modules/@wordpress/dom-ready/build-module/index.mjs
function domReady(callback) {
	if (typeof document === "undefined") return;
	if (document.readyState === "complete" || document.readyState === "interactive") {
		callback();
		return;
	}
	document.addEventListener("DOMContentLoaded", callback);
}
//#endregion
//#region ../../../node_modules/.pnpm/@wordpress+a11y@4.51.0/node_modules/@wordpress/a11y/build-module/script/add-container.mjs
function addContainer(ariaLive = "polite") {
	const container = document.createElement("div");
	container.id = `a11y-speak-${ariaLive}`;
	container.className = "a11y-speak-region";
	container.setAttribute("style", "position:absolute;margin:-1px;padding:0;height:1px;width:1px;overflow:hidden;clip-path:inset(50%);border:0;word-wrap:normal !important;word-break:normal !important;");
	container.setAttribute("aria-live", ariaLive);
	container.setAttribute("aria-relevant", "additions text");
	container.setAttribute("aria-atomic", "true");
	const { body } = document;
	if (body) body.appendChild(container);
	return container;
}
//#endregion
//#region ../../../node_modules/.pnpm/@wordpress+a11y@4.51.0/node_modules/@wordpress/a11y/build-module/script/add-intro-text.mjs
function addIntroText() {
	const introText = document.createElement("p");
	introText.id = "a11y-speak-intro-text";
	introText.className = "a11y-speak-intro-text";
	introText.textContent = (0, _wordpress_i18n.__)("Notifications");
	introText.setAttribute("style", "position:absolute;margin:-1px;padding:0;height:1px;width:1px;overflow:hidden;clip-path:inset(50%);border:0;word-wrap:normal !important;word-break:normal !important;");
	introText.setAttribute("hidden", "");
	const { body } = document;
	if (body) body.appendChild(introText);
	return introText;
}
//#endregion
//#region ../../../node_modules/.pnpm/@wordpress+a11y@4.51.0/node_modules/@wordpress/a11y/build-module/shared/clear.mjs
function clear() {
	const regions = document.getElementsByClassName("a11y-speak-region");
	const introText = document.getElementById("a11y-speak-intro-text");
	for (let i = 0; i < regions.length; i++) regions[i].textContent = "";
	if (introText) introText.setAttribute("hidden", "hidden");
}
//#endregion
//#region ../../../node_modules/.pnpm/@wordpress+a11y@4.51.0/node_modules/@wordpress/a11y/build-module/shared/filter-message.mjs
var previousMessage = "";
function filterMessage(message) {
	message = message.replace(/<[^<>]+>/g, " ");
	if (previousMessage === message) message += "\xA0";
	previousMessage = message;
	return message;
}
//#endregion
//#region ../../../node_modules/.pnpm/@wordpress+a11y@4.51.0/node_modules/@wordpress/a11y/build-module/shared/index.mjs
function speak(message, ariaLive) {
	clear();
	message = filterMessage(message);
	const introText = document.getElementById("a11y-speak-intro-text");
	const containerAssertive = document.getElementById("a11y-speak-assertive");
	const containerPolite = document.getElementById("a11y-speak-polite");
	if (containerAssertive && ariaLive === "assertive") containerAssertive.textContent = message;
	else if (containerPolite) containerPolite.textContent = message;
	if (introText) introText.removeAttribute("hidden");
}
//#endregion
//#region ../../../node_modules/.pnpm/@wordpress+a11y@4.51.0/node_modules/@wordpress/a11y/build-module/index.mjs
function setup() {
	const introText = document.getElementById("a11y-speak-intro-text");
	const containerAssertive = document.getElementById("a11y-speak-assertive");
	const containerPolite = document.getElementById("a11y-speak-polite");
	if (introText === null) addIntroText();
	if (containerAssertive === null) addContainer("assertive");
	if (containerPolite === null) addContainer("polite");
}
domReady(setup);
//#endregion
//#region ../../../node_modules/.pnpm/@wordpress+ui@0.17.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/ui/build-module/button/button.mjs
var STYLE_HASH_ATTRIBUTE$6 = "data-wp-hash";
function getRuntime$6() {
	const globalScope = globalThis;
	if (globalScope.__wpStyleRuntime) return globalScope.__wpStyleRuntime;
	globalScope.__wpStyleRuntime = {
		documents: /* @__PURE__ */ new Map(),
		styles: /* @__PURE__ */ new Map(),
		injectedStyles: /* @__PURE__ */ new WeakMap()
	};
	if (typeof document !== "undefined") registerDocument$6(document);
	return globalScope.__wpStyleRuntime;
}
function documentContainsStyleHash$6(targetDocument, hash) {
	if (!targetDocument.head) return false;
	for (const style of targetDocument.head.querySelectorAll(`style[${STYLE_HASH_ATTRIBUTE$6}]`)) if (style.getAttribute(STYLE_HASH_ATTRIBUTE$6) === hash) return true;
	return false;
}
function injectStyle$6(targetDocument, hash, css) {
	if (!targetDocument.head) return;
	const runtime = getRuntime$6();
	let injectedStyles = runtime.injectedStyles.get(targetDocument);
	if (!injectedStyles) {
		injectedStyles = /* @__PURE__ */ new Set();
		runtime.injectedStyles.set(targetDocument, injectedStyles);
	}
	if (injectedStyles.has(hash)) return;
	if (documentContainsStyleHash$6(targetDocument, hash)) {
		injectedStyles.add(hash);
		return;
	}
	const style = targetDocument.createElement("style");
	style.setAttribute(STYLE_HASH_ATTRIBUTE$6, hash);
	style.appendChild(targetDocument.createTextNode(css));
	targetDocument.head.appendChild(style);
	injectedStyles.add(hash);
}
function registerDocument$6(targetDocument) {
	const runtime = getRuntime$6();
	runtime.documents.set(targetDocument, (runtime.documents.get(targetDocument) ?? 0) + 1);
	for (const [hash, css] of runtime.styles) injectStyle$6(targetDocument, hash, css);
	return () => {
		const count = runtime.documents.get(targetDocument);
		if (count === void 0) return;
		if (count <= 1) {
			runtime.documents.delete(targetDocument);
			return;
		}
		runtime.documents.set(targetDocument, count - 1);
	};
}
function registerStyle$6(hash, css) {
	const runtime = getRuntime$6();
	runtime.styles.set(hash, css);
	for (const targetDocument of runtime.documents.keys()) injectStyle$6(targetDocument, hash, css);
}
if (typeof process === "undefined" || process.env.NODE_ENV !== "test") registerStyle$6("4c317b0736", "@layer wp-ui{@layer utilities, components, compositions, overrides;@layer components{._97b0fc33c028be1a__button,.abbb272e2ce49bd6__is-unstyled{appearance:none;padding:0}._97b0fc33c028be1a__button{--wp-ui-button-font-weight:var(--wpds-typography-font-weight-medium,499);--wp-ui-button-background-color:var(--wpds-color-background-interactive-brand-strong,var(--wp-admin-theme-color,#3858e9));--wp-ui-button-background-color-active:var(--wpds-color-background-interactive-brand-strong-active,color-mix(in oklch,var(--wp-admin-theme-color,#3858e9) 93%,#000));--wp-ui-button-background-color-disabled:var(--wpds-color-background-interactive-brand-strong-disabled,#e6e6e6);--wp-ui-button-foreground-color:var(--wpds-color-foreground-interactive-brand-strong,#fff);--wp-ui-button-foreground-color-active:var(--wpds-color-foreground-interactive-brand-strong-active,#fff);--wp-ui-button-foreground-color-disabled:var(--wpds-color-foreground-interactive-brand-strong-disabled,#8d8d8d);--wp-ui-button-padding-block:var(--wpds-dimension-padding-xs,4px);--wp-ui-button-padding-inline:var(--wpds-dimension-padding-md,12px);--wp-ui-button-height:var(--wpds-dimension-size-lg,40px);--wp-ui-button-aspect-ratio:auto;--wp-ui-button-font-size:var(--wpds-typography-font-size-md,13px);--wp-ui-button-min-width:calc(4ch + var(--wp-ui-button-padding-inline)*2);--wp-ui-button-icon-margin:calc((var(--wpds-dimension-size-2xs, 16px) - var(--wpds-dimension-size-sm, 24px))/2);--wp-ui-button-border-color:var(--wp-ui-button-background-color);--wp-ui-button-border-color-active:var(--wp-ui-button-background-color-active);--wp-ui-button-border-color-disabled:var(--wp-ui-button-background-color-disabled);--_gcd-button-font-family:var(--wpds-typography-font-family-body,-apple-system,system-ui,\"Segoe UI\",\"Roboto\",\"Oxygen-Sans\",\"Ubuntu\",\"Cantarell\",\"Helvetica Neue\",sans-serif);--_gcd-button-font-size:var(--wp-ui-button-font-size);--_gcd-button-font-weight:var(--wp-ui-button-font-weight);align-items:center;aspect-ratio:var(--wp-ui-button-aspect-ratio);background-clip:padding-box;background-color:var(--wp-ui-button-background-color);border-color:var(--wp-ui-button-border-color);border-radius:var(--wpds-border-radius-sm,2px);border-style:solid;border-width:1px;color:var(--wp-ui-button-foreground-color);display:inline-flex;font-family:var(--wpds-typography-font-family-body,-apple-system,system-ui,\"Segoe UI\",\"Roboto\",\"Oxygen-Sans\",\"Ubuntu\",\"Cantarell\",\"Helvetica Neue\",sans-serif);font-size:var(--wp-ui-button-font-size);font-weight:var(--wp-ui-button-font-weight);gap:var(--wpds-dimension-gap-sm,8px);justify-content:center;line-height:var(--wpds-typography-line-height-sm,20px);max-width:100%;min-height:var(--wp-ui-button-height);min-width:var(--wp-ui-button-min-width);overflow-wrap:anywhere;padding-block:var(--wp-ui-button-padding-block);padding-inline:var(--wp-ui-button-padding-inline);position:relative;text-align:center;text-decoration:none;&:not([data-disabled]){cursor:var(--wpds-cursor-control,pointer)}@media not (prefers-reduced-motion){transition:color .1s ease-out;*{transition:opacity .1s ease-out}}&[href]{cursor:pointer}[href]{color:inherit;text-decoration:inherit}&:not([data-disabled]):is(:hover,:active,:focus){background-color:var(--wp-ui-button-background-color-active);border-color:var(--wp-ui-button-border-color-active);color:var(--wp-ui-button-foreground-color-active)}&[data-disabled]:not(._914b42f315c0e580__is-loading){background-color:var(--wp-ui-button-background-color-disabled);border-color:var(--wp-ui-button-border-color-disabled);color:var(--wp-ui-button-foreground-color-disabled);@media (forced-colors:active){border-bottom-color:GrayText;border-left-color:GrayText;border-right-color:GrayText;border-top-color:GrayText;color:GrayText}}&:before{aspect-ratio:1;border:var(--wpds-border-width-focus,var(--wp-admin-border-width-focus,2px)) solid;border-block-end-color:transparent;border-block-start-color:var(--wp-ui-button-foreground-color);border-inline-end-color:var(--wp-ui-button-foreground-color);border-inline-start-color:transparent;border-radius:50%;box-sizing:border-box;content:\"\";display:block;height:var(--wp-ui-button-font-size);inset-inline-start:50%;opacity:0;pointer-events:none;position:absolute;top:50%;transform:translate(-50%,-50%);@media not (prefers-reduced-motion){transition:opacity .1s ease-out}@media (forced-colors:active){border-block-end-style:none;border-bottom-color:ButtonText;border-inline-start-style:none;border-left-color:ButtonText;border-right-color:ButtonText;border-top-color:ButtonText}}}._908205475f9f2a92__is-small{--wp-ui-button-padding-block:0;--wp-ui-button-padding-inline:var(--wpds-dimension-padding-sm,8px);--wp-ui-button-height:var(--wpds-dimension-size-sm,24px)}._9f6fc6553aeb36fe__icon{margin:var(--wp-ui-button-icon-margin)}.dd460c965226cc77__is-brand{&._62d5a778b7b258ee__is-outline,&.ad0619a3217c6a5b__is-minimal{--wp-ui-button-foreground-color:var(--wpds-color-foreground-interactive-brand,var(--wp-admin-theme-color,#3858e9));--wp-ui-button-foreground-color-active:var(--wpds-color-foreground-interactive-brand-active,color-mix(in oklch,var(--wp-admin-theme-color,#3858e9) 52%,#000));--wp-ui-button-foreground-color-disabled:var(--wpds-color-foreground-interactive-brand-disabled,#8d8d8d)}&._62d5a778b7b258ee__is-outline{--wp-ui-button-background-color:var(--wpds-color-background-interactive-brand-weak,#0000);--wp-ui-button-background-color-active:var(--wpds-color-background-interactive-brand-weak-active,color-mix(in oklch,var(--wp-admin-theme-color,#3858e9) 12%,#fff));--wp-ui-button-background-color-disabled:var(--wpds-color-background-interactive-brand-weak-disabled,#0000);--wp-ui-button-border-color:var(--wpds-color-stroke-interactive-brand,var(--wp-admin-theme-color,#3858e9));--wp-ui-button-border-color-active:var(--wpds-color-stroke-interactive-brand-active,color-mix(in oklch,var(--wp-admin-theme-color,#3858e9) 85%,#000));--wp-ui-button-border-color-disabled:var(--wpds-color-stroke-interactive-brand-disabled,#dbdbdb)}&.ad0619a3217c6a5b__is-minimal{--wp-ui-button-background-color:var(--wpds-color-background-interactive-brand-weak,#0000);--wp-ui-button-background-color-active:var(--wpds-color-background-interactive-brand-weak-active,color-mix(in oklch,var(--wp-admin-theme-color,#3858e9) 12%,#fff));--wp-ui-button-background-color-disabled:var(--wpds-color-background-interactive-brand-weak-disabled,#0000)}}.e722a8f96726aa99__is-neutral{&.ad0619a3217c6a5b__is-minimal[aria-pressed=true],&.b50b3358c5fb4d0b__is-solid{--wp-ui-button-background-color:var(--wpds-color-background-interactive-neutral-strong,#2d2d2d);--wp-ui-button-background-color-active:var(--wpds-color-background-interactive-neutral-strong-active,#1e1e1e);--wp-ui-button-background-color-disabled:var(--wpds-color-background-interactive-neutral-strong-disabled,#e6e6e6);--wp-ui-button-foreground-color:var(--wpds-color-foreground-interactive-neutral-strong,#f0f0f0);--wp-ui-button-foreground-color-active:var(--wpds-color-foreground-interactive-neutral-strong-active,#f0f0f0);--wp-ui-button-foreground-color-disabled:var(--wpds-color-foreground-interactive-neutral-strong-disabled,#8d8d8d)}&._62d5a778b7b258ee__is-outline,&.ad0619a3217c6a5b__is-minimal:not([aria-pressed=true]){--wp-ui-button-foreground-color:var(--wpds-color-foreground-interactive-neutral,#1e1e1e);--wp-ui-button-foreground-color-active:var(--wpds-color-foreground-interactive-neutral-active,#1e1e1e);--wp-ui-button-foreground-color-disabled:var(--wpds-color-foreground-interactive-neutral-disabled,#8d8d8d)}&._62d5a778b7b258ee__is-outline{--wp-ui-button-background-color:var(--wpds-color-background-interactive-neutral-weak,#0000);--wp-ui-button-background-color-active:var(--wpds-color-background-interactive-neutral-weak-active,#ededed);--wp-ui-button-background-color-disabled:var(--wpds-color-background-interactive-neutral-weak-disabled,#0000);--wp-ui-button-border-color:var(--wpds-color-stroke-interactive-neutral,#8d8d8d);--wp-ui-button-border-color-active:var(--wpds-color-stroke-interactive-neutral-active,#6e6e6e);--wp-ui-button-border-color-disabled:var(--wpds-color-stroke-interactive-neutral-disabled,#dbdbdb)}&.ad0619a3217c6a5b__is-minimal:not([aria-pressed=true]){--wp-ui-button-background-color:var(--wpds-color-background-interactive-neutral-weak,#0000);--wp-ui-button-background-color-active:var(--wpds-color-background-interactive-neutral-weak-active,#ededed);--wp-ui-button-background-color-disabled:var(--wpds-color-background-interactive-neutral-weak-disabled,#0000)}}.abbb272e2ce49bd6__is-unstyled{background:none;border:none;min-width:unset}.cf59cf1b69629838__is-compact{--wp-ui-button-height:var(--wpds-dimension-size-md,32px)}._914b42f315c0e580__is-loading:not(.abbb272e2ce49bd6__is-unstyled){color:transparent;&:not([data-disabled]):is(:hover,:active,:focus){color:transparent}@media (forced-colors:active){color:ButtonFace}*{opacity:0}&:before{opacity:1;transition-delay:.05s;@media not (prefers-reduced-motion){animation:_5a1d53da6f830c8d__loading-animation 1s linear infinite}}}}@keyframes _5a1d53da6f830c8d__loading-animation{0%{transform:translate(-50%,-50%) rotate(0deg)}to{transform:translate(-50%,-50%) rotate(1turn)}}}");
var style_default$5 = {
	"button": "_97b0fc33c028be1a__button",
	"is-unstyled": "abbb272e2ce49bd6__is-unstyled",
	"is-loading": "_914b42f315c0e580__is-loading",
	"is-small": "_908205475f9f2a92__is-small",
	"icon": "_9f6fc6553aeb36fe__icon",
	"is-brand": "dd460c965226cc77__is-brand",
	"is-outline": "_62d5a778b7b258ee__is-outline",
	"is-minimal": "ad0619a3217c6a5b__is-minimal",
	"is-neutral": "e722a8f96726aa99__is-neutral",
	"is-solid": "b50b3358c5fb4d0b__is-solid",
	"is-compact": "cf59cf1b69629838__is-compact",
	"loading-animation": "_5a1d53da6f830c8d__loading-animation"
};
if (typeof process === "undefined" || process.env.NODE_ENV !== "test") registerStyle$6("10f3806643", "@layer wp-ui{@layer utilities, components, compositions, overrides;@layer utilities{._336cd3e4e743482f__box-sizing{box-sizing:border-box;*,:after,:before{box-sizing:inherit}}}}");
var resets_default$1 = { "box-sizing": "_336cd3e4e743482f__box-sizing" };
if (typeof process === "undefined" || process.env.NODE_ENV !== "test") registerStyle$6("5f8e7aa0bc", "@layer wp-ui{@layer utilities, components, compositions, overrides;@layer utilities{._08e8a2e44959f892__outset-ring--focus:focus,._970d04df7376df67__outset-ring--focus-within-except-active:focus-within:not(:has(:active)),.c5cb3ee4bddaa8e4__outset-ring--focus-within-visible:focus-within:has(:focus-visible),.cd83dfc2126a0846__outset-ring--focus-within:focus-within,.d0541bc9dd9dc7b6__outset-ring--focus-visible:focus-visible,.e25b2bdd7aa21721__outset-ring--focus-except-active:focus:not(:active),:focus-visible .ecadb9e080e2dfa5__outset-ring--focus-parent-visible{--_gcd-a-outline:var(--wpds-border-width-focus,var(--wp-admin-border-width-focus,2px)) solid var(--wpds-color-stroke-focus,var(--wp-admin-theme-color,#3858e9));--_gcd-div-outline:var(--wpds-border-width-focus,var(--wp-admin-border-width-focus,2px)) solid var(--wpds-color-stroke-focus,var(--wp-admin-theme-color,#3858e9));outline:var(--wpds-border-width-focus,var(--wp-admin-border-width-focus,2px)) solid var(--wpds-color-stroke-focus,var(--wp-admin-theme-color,#3858e9));outline-offset:var(--wpds-border-width-focus,var(--wp-admin-border-width-focus,2px))}}}");
var focus_default = {
	"outset-ring--focus": "_08e8a2e44959f892__outset-ring--focus",
	"outset-ring--focus-except-active": "e25b2bdd7aa21721__outset-ring--focus-except-active",
	"outset-ring--focus-visible": "d0541bc9dd9dc7b6__outset-ring--focus-visible",
	"outset-ring--focus-within": "cd83dfc2126a0846__outset-ring--focus-within",
	"outset-ring--focus-within-except-active": "_970d04df7376df67__outset-ring--focus-within-except-active",
	"outset-ring--focus-within-visible": "c5cb3ee4bddaa8e4__outset-ring--focus-within-visible",
	"outset-ring--focus-parent-visible": "ecadb9e080e2dfa5__outset-ring--focus-parent-visible"
};
if (typeof process === "undefined" || process.env.NODE_ENV !== "test") registerStyle$6("d390e935a7", "._6defc79820e382c6__button{box-sizing:var(--_gcd-button-box-sizing,border-box);font-family:var(--_gcd-button-font-family,inherit);font-size:var(--_gcd-button-font-size,inherit);font-weight:var(--_gcd-button-font-weight,inherit)}.d2cff2e5dea83bd1__input{box-sizing:var(--_gcd-input-box-sizing,border-box);font-family:var(--_gcd-input-font-family,inherit);font-size:var(--_gcd-input-font-size,inherit);font-weight:var(--_gcd-input-font-weight,inherit);margin:var(--_gcd-input-margin,0);&:is(textarea,[type=text],[type=password],[type=color],[type=date],[type=datetime],[type=datetime-local],[type=email],[type=month],[type=number],[type=search],[type=tel],[type=time],[type=url],[type=week]){background-color:var(--_gcd-input-background-color,transparent);border:var(--_gcd-input-border,none);border-radius:var(--_gcd-input-border-radius,0);box-shadow:var(--_gcd-input-box-shadow,0 0 0 transparent);color:var(--_gcd-input-color,var(--wpds-color-foreground-interactive-neutral,#1e1e1e));&:focus{border-color:var(--_gcd-input-border-color-focus,var(--wp-admin-theme-color));box-shadow:var(--_gcd-input-box-shadow-focus,none);outline:var(--_gcd-input-outline-focus,none)}&:disabled{background:var(--_gcd-input-background-disabled,transparent);border-color:var(--_gcd-input-border-color-disabled,transparent);box-shadow:var(--_gcd-input-box-shadow-disabled,none);color:var(--_gcd-input-color-disabled,var(--wpds-color-foreground-interactive-neutral-disabled,#8d8d8d))}&::placeholder{color:var(--_gcd-input-placeholder-color,var(--wpds-color-foreground-interactive-neutral-disabled,#8d8d8d))}}&:is(textarea,[type=text],[type=password],[type=date],[type=datetime],[type=datetime-local],[type=email],[type=month],[type=number],[type=search],[type=tel],[type=time],[type=url],[type=week]){line-height:var(--_gcd-input-line-height,inherit);min-height:var(--_gcd-input-min-height,auto);padding:var(--_gcd-input-padding,0)}}._547d86373d02e108__textarea{box-sizing:var(--_gcd-textarea-box-sizing,border-box);overflow:var(--_gcd-textarea-overflow,auto);resize:var(--_gcd-textarea-resize,block)}._8c15fd0ed9f28ba4__div{outline:var(--_gcd-div-outline,0 solid transparent)}p._43cec3e1eec1066d__p{font-size:var(--_gcd-p-font-size,13px);line-height:var(--_gcd-p-line-height,1.5);margin:var(--_gcd-p-margin,0)}:is(h1,h2,h3,h4,h5,h6).e97669c6d9a38497__heading{color:var(--_gcd-heading-color,var(--wpds-color-foreground-content-neutral,#1e1e1e));font-size:var(--_gcd-heading-font-size,inherit);font-weight:var(--_gcd-heading-font-weight,var(--wpds-typography-font-weight-medium,499));margin:var(--_gcd-heading-margin,0)}._2c0831b0499dbd6e__a,._2c0831b0499dbd6e__a:is(:hover,:focus,:active){border-radius:var(--_gcd-a-border-radius,0);box-shadow:var(--_gcd-a-box-shadow,none);color:var(--_gcd-a-color,inherit);outline:var(--_gcd-a-outline,0 solid transparent);transition:var(--_gcd-a-transition,none)}");
var global_css_defense_default = {
	"button": "_6defc79820e382c6__button",
	"input": "d2cff2e5dea83bd1__input",
	"textarea": "_547d86373d02e108__textarea",
	"div": "_8c15fd0ed9f28ba4__div",
	"p": "_43cec3e1eec1066d__p",
	"heading": "e97669c6d9a38497__heading",
	"a": "_2c0831b0499dbd6e__a"
};
var Button$1 = (0, react$1.forwardRef)(function Button2({ tone = "brand", variant = "solid", size = "default", className, focusableWhenDisabled = true, disabled, loading, loadingAnnouncement = (0, _wordpress_i18n.__)("Loading"), children, ...props }, ref) {
	const mergedClassName = (0, clsx.default)(global_css_defense_default.button, resets_default$1["box-sizing"], focus_default["outset-ring--focus-except-active"], variant !== "unstyled" && style_default$5.button, style_default$5[`is-${tone}`], style_default$5[`is-${variant}`], style_default$5[`is-${size}`], loading && style_default$5["is-loading"], className);
	(0, react$1.useEffect)(() => {
		if (loading && loadingAnnouncement) speak(loadingAnnouncement);
	}, [loading, loadingAnnouncement]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Button$2, {
		ref,
		className: mergedClassName,
		focusableWhenDisabled,
		disabled: disabled ?? loading,
		...props,
		children
	});
});
//#endregion
//#region ../../../node_modules/.pnpm/@wordpress+primitives@4.51.0_@types+react@18.3.28_react@18.3.1/node_modules/@wordpress/primitives/build-module/svg/index.mjs
var SVG = (0, react$1.forwardRef)(
	/**
	* @param {SVGProps}                          props isPressed indicates whether the SVG should appear as pressed.
	*                                                  Other props will be passed through to svg component.
	* @param {React.ForwardedRef<SVGSVGElement>} ref   The forwarded ref to the SVG element.
	*
	* @return {React.JSX.Element} Stop component
	*/
	({ className, isPressed, ...props }, ref) => {
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
			...props,
			className: (0, clsx.default)(className, { "is-pressed": isPressed }) || void 0,
			"aria-hidden": true,
			focusable: false,
			ref
		});
	}
);
SVG.displayName = "SVG";
//#endregion
//#region ../../../node_modules/.pnpm/@wordpress+ui@0.17.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/ui/build-module/icon/icon.mjs
var Icon$2 = (0, react$1.forwardRef)(function Icon2({ icon, size = 24, ...restProps }, ref) {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SVG, {
		ref,
		...icon.props,
		...restProps,
		width: size,
		height: size
	});
});
//#endregion
//#region ../../../node_modules/.pnpm/@wordpress+ui@0.17.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/ui/build-module/button/icon.mjs
var STYLE_HASH_ATTRIBUTE$5 = "data-wp-hash";
function getRuntime$5() {
	const globalScope = globalThis;
	if (globalScope.__wpStyleRuntime) return globalScope.__wpStyleRuntime;
	globalScope.__wpStyleRuntime = {
		documents: /* @__PURE__ */ new Map(),
		styles: /* @__PURE__ */ new Map(),
		injectedStyles: /* @__PURE__ */ new WeakMap()
	};
	if (typeof document !== "undefined") registerDocument$5(document);
	return globalScope.__wpStyleRuntime;
}
function documentContainsStyleHash$5(targetDocument, hash) {
	if (!targetDocument.head) return false;
	for (const style of targetDocument.head.querySelectorAll(`style[${STYLE_HASH_ATTRIBUTE$5}]`)) if (style.getAttribute(STYLE_HASH_ATTRIBUTE$5) === hash) return true;
	return false;
}
function injectStyle$5(targetDocument, hash, css) {
	if (!targetDocument.head) return;
	const runtime = getRuntime$5();
	let injectedStyles = runtime.injectedStyles.get(targetDocument);
	if (!injectedStyles) {
		injectedStyles = /* @__PURE__ */ new Set();
		runtime.injectedStyles.set(targetDocument, injectedStyles);
	}
	if (injectedStyles.has(hash)) return;
	if (documentContainsStyleHash$5(targetDocument, hash)) {
		injectedStyles.add(hash);
		return;
	}
	const style = targetDocument.createElement("style");
	style.setAttribute(STYLE_HASH_ATTRIBUTE$5, hash);
	style.appendChild(targetDocument.createTextNode(css));
	targetDocument.head.appendChild(style);
	injectedStyles.add(hash);
}
function registerDocument$5(targetDocument) {
	const runtime = getRuntime$5();
	runtime.documents.set(targetDocument, (runtime.documents.get(targetDocument) ?? 0) + 1);
	for (const [hash, css] of runtime.styles) injectStyle$5(targetDocument, hash, css);
	return () => {
		const count = runtime.documents.get(targetDocument);
		if (count === void 0) return;
		if (count <= 1) {
			runtime.documents.delete(targetDocument);
			return;
		}
		runtime.documents.set(targetDocument, count - 1);
	};
}
function registerStyle$5(hash, css) {
	const runtime = getRuntime$5();
	runtime.styles.set(hash, css);
	for (const targetDocument of runtime.documents.keys()) injectStyle$5(targetDocument, hash, css);
}
if (typeof process === "undefined" || process.env.NODE_ENV !== "test") registerStyle$5("4c317b0736", "@layer wp-ui{@layer utilities, components, compositions, overrides;@layer components{._97b0fc33c028be1a__button,.abbb272e2ce49bd6__is-unstyled{appearance:none;padding:0}._97b0fc33c028be1a__button{--wp-ui-button-font-weight:var(--wpds-typography-font-weight-medium,499);--wp-ui-button-background-color:var(--wpds-color-background-interactive-brand-strong,var(--wp-admin-theme-color,#3858e9));--wp-ui-button-background-color-active:var(--wpds-color-background-interactive-brand-strong-active,color-mix(in oklch,var(--wp-admin-theme-color,#3858e9) 93%,#000));--wp-ui-button-background-color-disabled:var(--wpds-color-background-interactive-brand-strong-disabled,#e6e6e6);--wp-ui-button-foreground-color:var(--wpds-color-foreground-interactive-brand-strong,#fff);--wp-ui-button-foreground-color-active:var(--wpds-color-foreground-interactive-brand-strong-active,#fff);--wp-ui-button-foreground-color-disabled:var(--wpds-color-foreground-interactive-brand-strong-disabled,#8d8d8d);--wp-ui-button-padding-block:var(--wpds-dimension-padding-xs,4px);--wp-ui-button-padding-inline:var(--wpds-dimension-padding-md,12px);--wp-ui-button-height:var(--wpds-dimension-size-lg,40px);--wp-ui-button-aspect-ratio:auto;--wp-ui-button-font-size:var(--wpds-typography-font-size-md,13px);--wp-ui-button-min-width:calc(4ch + var(--wp-ui-button-padding-inline)*2);--wp-ui-button-icon-margin:calc((var(--wpds-dimension-size-2xs, 16px) - var(--wpds-dimension-size-sm, 24px))/2);--wp-ui-button-border-color:var(--wp-ui-button-background-color);--wp-ui-button-border-color-active:var(--wp-ui-button-background-color-active);--wp-ui-button-border-color-disabled:var(--wp-ui-button-background-color-disabled);--_gcd-button-font-family:var(--wpds-typography-font-family-body,-apple-system,system-ui,\"Segoe UI\",\"Roboto\",\"Oxygen-Sans\",\"Ubuntu\",\"Cantarell\",\"Helvetica Neue\",sans-serif);--_gcd-button-font-size:var(--wp-ui-button-font-size);--_gcd-button-font-weight:var(--wp-ui-button-font-weight);align-items:center;aspect-ratio:var(--wp-ui-button-aspect-ratio);background-clip:padding-box;background-color:var(--wp-ui-button-background-color);border-color:var(--wp-ui-button-border-color);border-radius:var(--wpds-border-radius-sm,2px);border-style:solid;border-width:1px;color:var(--wp-ui-button-foreground-color);display:inline-flex;font-family:var(--wpds-typography-font-family-body,-apple-system,system-ui,\"Segoe UI\",\"Roboto\",\"Oxygen-Sans\",\"Ubuntu\",\"Cantarell\",\"Helvetica Neue\",sans-serif);font-size:var(--wp-ui-button-font-size);font-weight:var(--wp-ui-button-font-weight);gap:var(--wpds-dimension-gap-sm,8px);justify-content:center;line-height:var(--wpds-typography-line-height-sm,20px);max-width:100%;min-height:var(--wp-ui-button-height);min-width:var(--wp-ui-button-min-width);overflow-wrap:anywhere;padding-block:var(--wp-ui-button-padding-block);padding-inline:var(--wp-ui-button-padding-inline);position:relative;text-align:center;text-decoration:none;&:not([data-disabled]){cursor:var(--wpds-cursor-control,pointer)}@media not (prefers-reduced-motion){transition:color .1s ease-out;*{transition:opacity .1s ease-out}}&[href]{cursor:pointer}[href]{color:inherit;text-decoration:inherit}&:not([data-disabled]):is(:hover,:active,:focus){background-color:var(--wp-ui-button-background-color-active);border-color:var(--wp-ui-button-border-color-active);color:var(--wp-ui-button-foreground-color-active)}&[data-disabled]:not(._914b42f315c0e580__is-loading){background-color:var(--wp-ui-button-background-color-disabled);border-color:var(--wp-ui-button-border-color-disabled);color:var(--wp-ui-button-foreground-color-disabled);@media (forced-colors:active){border-bottom-color:GrayText;border-left-color:GrayText;border-right-color:GrayText;border-top-color:GrayText;color:GrayText}}&:before{aspect-ratio:1;border:var(--wpds-border-width-focus,var(--wp-admin-border-width-focus,2px)) solid;border-block-end-color:transparent;border-block-start-color:var(--wp-ui-button-foreground-color);border-inline-end-color:var(--wp-ui-button-foreground-color);border-inline-start-color:transparent;border-radius:50%;box-sizing:border-box;content:\"\";display:block;height:var(--wp-ui-button-font-size);inset-inline-start:50%;opacity:0;pointer-events:none;position:absolute;top:50%;transform:translate(-50%,-50%);@media not (prefers-reduced-motion){transition:opacity .1s ease-out}@media (forced-colors:active){border-block-end-style:none;border-bottom-color:ButtonText;border-inline-start-style:none;border-left-color:ButtonText;border-right-color:ButtonText;border-top-color:ButtonText}}}._908205475f9f2a92__is-small{--wp-ui-button-padding-block:0;--wp-ui-button-padding-inline:var(--wpds-dimension-padding-sm,8px);--wp-ui-button-height:var(--wpds-dimension-size-sm,24px)}._9f6fc6553aeb36fe__icon{margin:var(--wp-ui-button-icon-margin)}.dd460c965226cc77__is-brand{&._62d5a778b7b258ee__is-outline,&.ad0619a3217c6a5b__is-minimal{--wp-ui-button-foreground-color:var(--wpds-color-foreground-interactive-brand,var(--wp-admin-theme-color,#3858e9));--wp-ui-button-foreground-color-active:var(--wpds-color-foreground-interactive-brand-active,color-mix(in oklch,var(--wp-admin-theme-color,#3858e9) 52%,#000));--wp-ui-button-foreground-color-disabled:var(--wpds-color-foreground-interactive-brand-disabled,#8d8d8d)}&._62d5a778b7b258ee__is-outline{--wp-ui-button-background-color:var(--wpds-color-background-interactive-brand-weak,#0000);--wp-ui-button-background-color-active:var(--wpds-color-background-interactive-brand-weak-active,color-mix(in oklch,var(--wp-admin-theme-color,#3858e9) 12%,#fff));--wp-ui-button-background-color-disabled:var(--wpds-color-background-interactive-brand-weak-disabled,#0000);--wp-ui-button-border-color:var(--wpds-color-stroke-interactive-brand,var(--wp-admin-theme-color,#3858e9));--wp-ui-button-border-color-active:var(--wpds-color-stroke-interactive-brand-active,color-mix(in oklch,var(--wp-admin-theme-color,#3858e9) 85%,#000));--wp-ui-button-border-color-disabled:var(--wpds-color-stroke-interactive-brand-disabled,#dbdbdb)}&.ad0619a3217c6a5b__is-minimal{--wp-ui-button-background-color:var(--wpds-color-background-interactive-brand-weak,#0000);--wp-ui-button-background-color-active:var(--wpds-color-background-interactive-brand-weak-active,color-mix(in oklch,var(--wp-admin-theme-color,#3858e9) 12%,#fff));--wp-ui-button-background-color-disabled:var(--wpds-color-background-interactive-brand-weak-disabled,#0000)}}.e722a8f96726aa99__is-neutral{&.ad0619a3217c6a5b__is-minimal[aria-pressed=true],&.b50b3358c5fb4d0b__is-solid{--wp-ui-button-background-color:var(--wpds-color-background-interactive-neutral-strong,#2d2d2d);--wp-ui-button-background-color-active:var(--wpds-color-background-interactive-neutral-strong-active,#1e1e1e);--wp-ui-button-background-color-disabled:var(--wpds-color-background-interactive-neutral-strong-disabled,#e6e6e6);--wp-ui-button-foreground-color:var(--wpds-color-foreground-interactive-neutral-strong,#f0f0f0);--wp-ui-button-foreground-color-active:var(--wpds-color-foreground-interactive-neutral-strong-active,#f0f0f0);--wp-ui-button-foreground-color-disabled:var(--wpds-color-foreground-interactive-neutral-strong-disabled,#8d8d8d)}&._62d5a778b7b258ee__is-outline,&.ad0619a3217c6a5b__is-minimal:not([aria-pressed=true]){--wp-ui-button-foreground-color:var(--wpds-color-foreground-interactive-neutral,#1e1e1e);--wp-ui-button-foreground-color-active:var(--wpds-color-foreground-interactive-neutral-active,#1e1e1e);--wp-ui-button-foreground-color-disabled:var(--wpds-color-foreground-interactive-neutral-disabled,#8d8d8d)}&._62d5a778b7b258ee__is-outline{--wp-ui-button-background-color:var(--wpds-color-background-interactive-neutral-weak,#0000);--wp-ui-button-background-color-active:var(--wpds-color-background-interactive-neutral-weak-active,#ededed);--wp-ui-button-background-color-disabled:var(--wpds-color-background-interactive-neutral-weak-disabled,#0000);--wp-ui-button-border-color:var(--wpds-color-stroke-interactive-neutral,#8d8d8d);--wp-ui-button-border-color-active:var(--wpds-color-stroke-interactive-neutral-active,#6e6e6e);--wp-ui-button-border-color-disabled:var(--wpds-color-stroke-interactive-neutral-disabled,#dbdbdb)}&.ad0619a3217c6a5b__is-minimal:not([aria-pressed=true]){--wp-ui-button-background-color:var(--wpds-color-background-interactive-neutral-weak,#0000);--wp-ui-button-background-color-active:var(--wpds-color-background-interactive-neutral-weak-active,#ededed);--wp-ui-button-background-color-disabled:var(--wpds-color-background-interactive-neutral-weak-disabled,#0000)}}.abbb272e2ce49bd6__is-unstyled{background:none;border:none;min-width:unset}.cf59cf1b69629838__is-compact{--wp-ui-button-height:var(--wpds-dimension-size-md,32px)}._914b42f315c0e580__is-loading:not(.abbb272e2ce49bd6__is-unstyled){color:transparent;&:not([data-disabled]):is(:hover,:active,:focus){color:transparent}@media (forced-colors:active){color:ButtonFace}*{opacity:0}&:before{opacity:1;transition-delay:.05s;@media not (prefers-reduced-motion){animation:_5a1d53da6f830c8d__loading-animation 1s linear infinite}}}}@keyframes _5a1d53da6f830c8d__loading-animation{0%{transform:translate(-50%,-50%) rotate(0deg)}to{transform:translate(-50%,-50%) rotate(1turn)}}}");
var style_default$4 = {
	"button": "_97b0fc33c028be1a__button",
	"is-unstyled": "abbb272e2ce49bd6__is-unstyled",
	"is-loading": "_914b42f315c0e580__is-loading",
	"is-small": "_908205475f9f2a92__is-small",
	"icon": "_9f6fc6553aeb36fe__icon",
	"is-brand": "dd460c965226cc77__is-brand",
	"is-outline": "_62d5a778b7b258ee__is-outline",
	"is-minimal": "ad0619a3217c6a5b__is-minimal",
	"is-neutral": "e722a8f96726aa99__is-neutral",
	"is-solid": "b50b3358c5fb4d0b__is-solid",
	"is-compact": "cf59cf1b69629838__is-compact",
	"loading-animation": "_5a1d53da6f830c8d__loading-animation"
};
var ButtonIcon = (0, react$1.forwardRef)(function ButtonIcon2({ className, icon, ...props }, ref) {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Icon$2, {
		ref,
		icon,
		className: (0, clsx.default)(style_default$4.icon, className),
		size: 24,
		...props
	});
});
//#endregion
//#region ../../../node_modules/.pnpm/@wordpress+ui@0.17.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/ui/build-module/button/index.mjs
ButtonIcon.displayName = "Button.Icon";
var Button = Object.assign(Button$1, { 
/**
* An icon component specifically designed to work well when rendered inside
* a `Button` component.
*/
Icon: ButtonIcon });
//#endregion
//#region ../../../node_modules/.pnpm/@wordpress+private-apis@1.51.0/node_modules/@wordpress/private-apis/build-module/implementation.mjs
var CORE_MODULES_USING_PRIVATE_APIS = [
	"@wordpress/admin-ui",
	"@wordpress/api-fetch",
	"@wordpress/block-directory",
	"@wordpress/block-editor",
	"@wordpress/block-library",
	"@wordpress/blocks",
	"@wordpress/boot",
	"@wordpress/commands",
	"@wordpress/compose",
	"@wordpress/connectors",
	"@wordpress/workflows",
	"@wordpress/components",
	"@wordpress/content-types",
	"@wordpress/core-commands",
	"@wordpress/core-data",
	"@wordpress/customize-widgets",
	"@wordpress/data",
	"@wordpress/edit-post",
	"@wordpress/edit-site",
	"@wordpress/edit-widgets",
	"@wordpress/editor",
	"@wordpress/font-list-route",
	"@wordpress/format-library",
	"@wordpress/patterns",
	"@wordpress/preferences",
	"@wordpress/reusable-blocks",
	"@wordpress/rich-text",
	"@wordpress/route",
	"@wordpress/router",
	"@wordpress/routes",
	"@wordpress/storybook",
	"@wordpress/sync",
	"@wordpress/theme",
	"@wordpress/dataviews",
	"@wordpress/fields",
	"@wordpress/lazy-editor",
	"@wordpress/media-editor",
	"@wordpress/media-utils",
	"@wordpress/upload-media",
	"@wordpress/global-styles-engine",
	"@wordpress/global-styles-ui",
	"@wordpress/ui",
	"@wordpress/views",
	"@wordpress/widget-dashboard"
];
var requiredConsent = "I acknowledge private features are not for use in themes or plugins and doing so will break in the next version of WordPress.";
var __dangerousOptInToUnstableAPIsOnlyForCoreModules = (consent, moduleName) => {
	if (!CORE_MODULES_USING_PRIVATE_APIS.includes(moduleName)) throw new Error(`You tried to opt-in to unstable APIs as module "${moduleName}". This feature is only for JavaScript modules shipped with WordPress core. Please do not use it in plugins and themes as the unstable APIs will be removed without a warning. If you ignore this error and depend on unstable features, your product will inevitably break on one of the next WordPress releases.`);
	if (consent !== requiredConsent) throw new Error(`You tried to opt-in to unstable APIs without confirming you know the consequences. This feature is only for JavaScript modules shipped with WordPress core. Please do not use it in plugins and themes as the unstable APIs will removed without a warning. If you ignore this error and depend on unstable features, your product will inevitably break on the next WordPress release.`);
	return {
		lock: lock$1,
		unlock: unlock$1
	};
};
function lock$1(object, privateData) {
	if (!object) throw new Error("Cannot lock an undefined object.");
	const _object = object;
	if (!(__private in _object)) _object[__private] = {};
	lockedData.set(_object[__private], privateData);
}
function unlock$1(object) {
	if (!object) throw new Error("Cannot unlock an undefined object.");
	const _object = object;
	if (!(__private in _object)) throw new Error("Cannot unlock an object that was not locked before. ");
	return lockedData.get(_object[__private]);
}
var lockedData = /* @__PURE__ */ new WeakMap();
var __private = /* @__PURE__ */ Symbol("Private API ID");
//#endregion
//#region ../../../node_modules/.pnpm/@wordpress+ui@0.17.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/ui/build-module/utils/render-slot-with-children.mjs
function renderSlotWithChildren(slot, defaultSlot, children) {
	return (0, react$1.cloneElement)(slot ?? defaultSlot, { children });
}
//#endregion
//#region ../../../node_modules/.pnpm/@wordpress+ui@0.17.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/ui/build-module/lock-unlock.mjs
var { lock, unlock } = __dangerousOptInToUnstableAPIsOnlyForCoreModules("I acknowledge private features are not for use in themes or plugins and doing so will break in the next version of WordPress.", "@wordpress/ui");
//#endregion
//#region ../../../node_modules/.pnpm/@wordpress+ui@0.17.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/ui/build-module/utils/theme-provider.mjs
function getThemeProvider() {
	const themePackage = _wordpress_theme;
	if (themePackage.ThemeProvider) return themePackage.ThemeProvider;
	if (!themePackage.privateApis) throw new Error("@wordpress/ui: @wordpress/theme must expose `ThemeProvider` or `privateApis.ThemeProvider`.");
	return unlock(themePackage.privateApis).ThemeProvider;
}
var ThemeProvider = getThemeProvider();
//#endregion
//#region ../../../node_modules/.pnpm/@wordpress+ui@0.17.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/ui/build-module/stack/stack.mjs
var STYLE_HASH_ATTRIBUTE$4 = "data-wp-hash";
function getRuntime$4() {
	const globalScope = globalThis;
	if (globalScope.__wpStyleRuntime) return globalScope.__wpStyleRuntime;
	globalScope.__wpStyleRuntime = {
		documents: /* @__PURE__ */ new Map(),
		styles: /* @__PURE__ */ new Map(),
		injectedStyles: /* @__PURE__ */ new WeakMap()
	};
	if (typeof document !== "undefined") registerDocument$4(document);
	return globalScope.__wpStyleRuntime;
}
function documentContainsStyleHash$4(targetDocument, hash) {
	if (!targetDocument.head) return false;
	for (const style of targetDocument.head.querySelectorAll(`style[${STYLE_HASH_ATTRIBUTE$4}]`)) if (style.getAttribute(STYLE_HASH_ATTRIBUTE$4) === hash) return true;
	return false;
}
function injectStyle$4(targetDocument, hash, css) {
	if (!targetDocument.head) return;
	const runtime = getRuntime$4();
	let injectedStyles = runtime.injectedStyles.get(targetDocument);
	if (!injectedStyles) {
		injectedStyles = /* @__PURE__ */ new Set();
		runtime.injectedStyles.set(targetDocument, injectedStyles);
	}
	if (injectedStyles.has(hash)) return;
	if (documentContainsStyleHash$4(targetDocument, hash)) {
		injectedStyles.add(hash);
		return;
	}
	const style = targetDocument.createElement("style");
	style.setAttribute(STYLE_HASH_ATTRIBUTE$4, hash);
	style.appendChild(targetDocument.createTextNode(css));
	targetDocument.head.appendChild(style);
	injectedStyles.add(hash);
}
function registerDocument$4(targetDocument) {
	const runtime = getRuntime$4();
	runtime.documents.set(targetDocument, (runtime.documents.get(targetDocument) ?? 0) + 1);
	for (const [hash, css] of runtime.styles) injectStyle$4(targetDocument, hash, css);
	return () => {
		const count = runtime.documents.get(targetDocument);
		if (count === void 0) return;
		if (count <= 1) {
			runtime.documents.delete(targetDocument);
			return;
		}
		runtime.documents.set(targetDocument, count - 1);
	};
}
function registerStyle$4(hash, css) {
	const runtime = getRuntime$4();
	runtime.styles.set(hash, css);
	for (const targetDocument of runtime.documents.keys()) injectStyle$4(targetDocument, hash, css);
}
if (typeof process === "undefined" || process.env.NODE_ENV !== "test") registerStyle$4("32aba35fe1", "@layer wp-ui{@layer utilities, components, compositions, overrides;@layer components{._19ce0419607e1896__stack{display:flex}}}");
var style_default$3 = { "stack": "_19ce0419607e1896__stack" };
var gapTokens = {
	xs: "var(--wpds-dimension-gap-xs, 4px)",
	sm: "var(--wpds-dimension-gap-sm, 8px)",
	md: "var(--wpds-dimension-gap-md, 12px)",
	lg: "var(--wpds-dimension-gap-lg, 16px)",
	xl: "var(--wpds-dimension-gap-xl, 24px)",
	"2xl": "var(--wpds-dimension-gap-2xl, 32px)",
	"3xl": "var(--wpds-dimension-gap-3xl, 40px)"
};
var Stack = (0, react$1.forwardRef)(function Stack2({ direction, gap, align, justify, wrap, render, ...props }, ref) {
	return useRender({
		render,
		ref,
		props: mergeProps(props, {
			style: {
				gap: gap && gapTokens[gap],
				alignItems: align,
				justifyContent: justify,
				flexDirection: direction,
				flexWrap: wrap
			},
			className: style_default$3.stack
		})
	});
});
//#endregion
//#region ../../../node_modules/.pnpm/@wordpress+ui@0.17.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/ui/build-module/utils/wp-compat-overlay-slot.mjs
var STYLE_HASH_ATTRIBUTE$3 = "data-wp-hash";
function getRuntime$3() {
	const globalScope = globalThis;
	if (globalScope.__wpStyleRuntime) return globalScope.__wpStyleRuntime;
	globalScope.__wpStyleRuntime = {
		documents: /* @__PURE__ */ new Map(),
		styles: /* @__PURE__ */ new Map(),
		injectedStyles: /* @__PURE__ */ new WeakMap()
	};
	if (typeof document !== "undefined") registerDocument$3(document);
	return globalScope.__wpStyleRuntime;
}
function documentContainsStyleHash$3(targetDocument, hash) {
	if (!targetDocument.head) return false;
	for (const style of targetDocument.head.querySelectorAll(`style[${STYLE_HASH_ATTRIBUTE$3}]`)) if (style.getAttribute(STYLE_HASH_ATTRIBUTE$3) === hash) return true;
	return false;
}
function injectStyle$3(targetDocument, hash, css) {
	if (!targetDocument.head) return;
	const runtime = getRuntime$3();
	let injectedStyles = runtime.injectedStyles.get(targetDocument);
	if (!injectedStyles) {
		injectedStyles = /* @__PURE__ */ new Set();
		runtime.injectedStyles.set(targetDocument, injectedStyles);
	}
	if (injectedStyles.has(hash)) return;
	if (documentContainsStyleHash$3(targetDocument, hash)) {
		injectedStyles.add(hash);
		return;
	}
	const style = targetDocument.createElement("style");
	style.setAttribute(STYLE_HASH_ATTRIBUTE$3, hash);
	style.appendChild(targetDocument.createTextNode(css));
	targetDocument.head.appendChild(style);
	injectedStyles.add(hash);
}
function registerDocument$3(targetDocument) {
	const runtime = getRuntime$3();
	runtime.documents.set(targetDocument, (runtime.documents.get(targetDocument) ?? 0) + 1);
	for (const [hash, css] of runtime.styles) injectStyle$3(targetDocument, hash, css);
	return () => {
		const count = runtime.documents.get(targetDocument);
		if (count === void 0) return;
		if (count <= 1) {
			runtime.documents.delete(targetDocument);
			return;
		}
		runtime.documents.set(targetDocument, count - 1);
	};
}
function registerStyle$3(hash, css) {
	const runtime = getRuntime$3();
	runtime.styles.set(hash, css);
	for (const targetDocument of runtime.documents.keys()) injectStyle$3(targetDocument, hash, css);
}
if (typeof process === "undefined" || process.env.NODE_ENV !== "test") registerStyle$3("be37f31c1e", "._11fc52b637ff8a7e__slot{inset:0;isolation:isolate;pointer-events:none;position:fixed;z-index:1000000003}@layer wp-ui{@layer utilities, components, compositions, overrides;@layer utilities{._11fc52b637ff8a7e__slot>*{pointer-events:auto}}}");
var wp_compat_overlay_slot_default = { "slot": "_11fc52b637ff8a7e__slot" };
var WP_COMPAT_OVERLAY_SLOT_ATTRIBUTE = "data-wp-compat-overlay-slot";
function resolveOwnerDocument() {
	return typeof document === "undefined" ? null : document;
}
function isInWordPressEnvironment() {
	let topWp;
	try {
		topWp = window.top?.wp;
	} catch {}
	const wp = topWp ?? window.wp;
	return typeof wp?.components === "object" && wp.components !== null;
}
var cachedSlot = null;
function createSlot(ownerDocument) {
	const element = ownerDocument.createElement("div");
	element.setAttribute(WP_COMPAT_OVERLAY_SLOT_ATTRIBUTE, "");
	if (wp_compat_overlay_slot_default.slot) element.classList.add(wp_compat_overlay_slot_default.slot);
	ownerDocument.body.appendChild(element);
	return element;
}
function getWpCompatOverlaySlot() {
	if (typeof window === "undefined") return;
	if (!isInWordPressEnvironment() && window.__wpUiCompatOverlaySlotEnabled !== true) return;
	const ownerDocument = resolveOwnerDocument();
	if (!ownerDocument || !ownerDocument.body) return;
	if (cachedSlot && cachedSlot.ownerDocument === ownerDocument && cachedSlot.isConnected) return cachedSlot;
	const existing = ownerDocument.querySelector(`[${WP_COMPAT_OVERLAY_SLOT_ATTRIBUTE}]`);
	if (existing instanceof HTMLDivElement) {
		cachedSlot = existing;
		return existing;
	}
	if (cachedSlot?.isConnected) cachedSlot.remove();
	cachedSlot = createSlot(ownerDocument);
	return cachedSlot;
}
//#endregion
//#region ../../../node_modules/.pnpm/@wordpress+ui@0.17.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/ui/build-module/tooltip/portal.mjs
var Portal = (0, react$1.forwardRef)(function TooltipPortal$1({ container, ...restProps }, ref) {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TooltipPortal, {
		container: container ?? getWpCompatOverlaySlot(),
		...restProps,
		ref
	});
});
//#endregion
//#region ../../../node_modules/.pnpm/@wordpress+ui@0.17.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/ui/build-module/tooltip/positioner.mjs
var STYLE_HASH_ATTRIBUTE$2 = "data-wp-hash";
function getRuntime$2() {
	const globalScope = globalThis;
	if (globalScope.__wpStyleRuntime) return globalScope.__wpStyleRuntime;
	globalScope.__wpStyleRuntime = {
		documents: /* @__PURE__ */ new Map(),
		styles: /* @__PURE__ */ new Map(),
		injectedStyles: /* @__PURE__ */ new WeakMap()
	};
	if (typeof document !== "undefined") registerDocument$2(document);
	return globalScope.__wpStyleRuntime;
}
function documentContainsStyleHash$2(targetDocument, hash) {
	if (!targetDocument.head) return false;
	for (const style of targetDocument.head.querySelectorAll(`style[${STYLE_HASH_ATTRIBUTE$2}]`)) if (style.getAttribute(STYLE_HASH_ATTRIBUTE$2) === hash) return true;
	return false;
}
function injectStyle$2(targetDocument, hash, css) {
	if (!targetDocument.head) return;
	const runtime = getRuntime$2();
	let injectedStyles = runtime.injectedStyles.get(targetDocument);
	if (!injectedStyles) {
		injectedStyles = /* @__PURE__ */ new Set();
		runtime.injectedStyles.set(targetDocument, injectedStyles);
	}
	if (injectedStyles.has(hash)) return;
	if (documentContainsStyleHash$2(targetDocument, hash)) {
		injectedStyles.add(hash);
		return;
	}
	const style = targetDocument.createElement("style");
	style.setAttribute(STYLE_HASH_ATTRIBUTE$2, hash);
	style.appendChild(targetDocument.createTextNode(css));
	targetDocument.head.appendChild(style);
	injectedStyles.add(hash);
}
function registerDocument$2(targetDocument) {
	const runtime = getRuntime$2();
	runtime.documents.set(targetDocument, (runtime.documents.get(targetDocument) ?? 0) + 1);
	for (const [hash, css] of runtime.styles) injectStyle$2(targetDocument, hash, css);
	return () => {
		const count = runtime.documents.get(targetDocument);
		if (count === void 0) return;
		if (count <= 1) {
			runtime.documents.delete(targetDocument);
			return;
		}
		runtime.documents.set(targetDocument, count - 1);
	};
}
function registerStyle$2(hash, css) {
	const runtime = getRuntime$2();
	runtime.styles.set(hash, css);
	for (const targetDocument of runtime.documents.keys()) injectStyle$2(targetDocument, hash, css);
}
if (typeof process === "undefined" || process.env.NODE_ENV !== "test") registerStyle$2("10f3806643", "@layer wp-ui{@layer utilities, components, compositions, overrides;@layer utilities{._336cd3e4e743482f__box-sizing{box-sizing:border-box;*,:after,:before{box-sizing:inherit}}}}");
var resets_default = { "box-sizing": "_336cd3e4e743482f__box-sizing" };
if (typeof process === "undefined" || process.env.NODE_ENV !== "test") registerStyle$2("789467362f", "@layer wp-ui{@layer utilities, components, compositions, overrides;@layer components{._480b748dd3510e64__positioner{z-index:var(--wp-ui-tooltip-z-index,initial)}._50096b232db7709d__popup{background-color:var(--wpds-color-background-surface-neutral-strong,#fff);border-radius:var(--wpds-border-radius-md,4px);box-shadow:var(--wpds-elevation-sm,0 1px 2px 0 #0000000d,0 2px 3px 0 #0000000a,0 6px 6px 0 #00000008,0 8px 8px 0 #00000005);color:var(--wpds-color-foreground-content-neutral,#1e1e1e);font-family:var(--wpds-typography-font-family-body,-apple-system,system-ui,\"Segoe UI\",\"Roboto\",\"Oxygen-Sans\",\"Ubuntu\",\"Cantarell\",\"Helvetica Neue\",sans-serif);font-size:var(--wpds-typography-font-size-sm,12px);line-height:1.4;padding:var(--wpds-dimension-padding-xs,4px) var(--wpds-dimension-padding-sm,8px);@media (forced-colors:active){border-bottom-color:CanvasText;border-bottom-style:solid;border-bottom-width:1px;border-left-color:CanvasText;border-left-style:solid;border-left-width:1px;border-right-color:CanvasText;border-right-style:solid;border-right-width:1px;border-top-color:CanvasText;border-top-style:solid;border-top-width:1px}}}}");
var style_default$2 = {
	"positioner": "_480b748dd3510e64__positioner",
	"popup": "_50096b232db7709d__popup"
};
var Positioner = (0, react$1.forwardRef)(function TooltipPositioner$1({ align = "center", className, side = "top", sideOffset = 4, ...props }, ref) {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TooltipPositioner, {
		ref,
		align,
		side,
		sideOffset,
		...props,
		className: (0, clsx.default)(resets_default["box-sizing"], style_default$2.positioner, className)
	});
});
//#endregion
//#region ../../../node_modules/.pnpm/@wordpress+ui@0.17.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/ui/build-module/tooltip/popup.mjs
var STYLE_HASH_ATTRIBUTE$1 = "data-wp-hash";
function getRuntime$1() {
	const globalScope = globalThis;
	if (globalScope.__wpStyleRuntime) return globalScope.__wpStyleRuntime;
	globalScope.__wpStyleRuntime = {
		documents: /* @__PURE__ */ new Map(),
		styles: /* @__PURE__ */ new Map(),
		injectedStyles: /* @__PURE__ */ new WeakMap()
	};
	if (typeof document !== "undefined") registerDocument$1(document);
	return globalScope.__wpStyleRuntime;
}
function documentContainsStyleHash$1(targetDocument, hash) {
	if (!targetDocument.head) return false;
	for (const style of targetDocument.head.querySelectorAll(`style[${STYLE_HASH_ATTRIBUTE$1}]`)) if (style.getAttribute(STYLE_HASH_ATTRIBUTE$1) === hash) return true;
	return false;
}
function injectStyle$1(targetDocument, hash, css) {
	if (!targetDocument.head) return;
	const runtime = getRuntime$1();
	let injectedStyles = runtime.injectedStyles.get(targetDocument);
	if (!injectedStyles) {
		injectedStyles = /* @__PURE__ */ new Set();
		runtime.injectedStyles.set(targetDocument, injectedStyles);
	}
	if (injectedStyles.has(hash)) return;
	if (documentContainsStyleHash$1(targetDocument, hash)) {
		injectedStyles.add(hash);
		return;
	}
	const style = targetDocument.createElement("style");
	style.setAttribute(STYLE_HASH_ATTRIBUTE$1, hash);
	style.appendChild(targetDocument.createTextNode(css));
	targetDocument.head.appendChild(style);
	injectedStyles.add(hash);
}
function registerDocument$1(targetDocument) {
	const runtime = getRuntime$1();
	runtime.documents.set(targetDocument, (runtime.documents.get(targetDocument) ?? 0) + 1);
	for (const [hash, css] of runtime.styles) injectStyle$1(targetDocument, hash, css);
	return () => {
		const count = runtime.documents.get(targetDocument);
		if (count === void 0) return;
		if (count <= 1) {
			runtime.documents.delete(targetDocument);
			return;
		}
		runtime.documents.set(targetDocument, count - 1);
	};
}
function registerStyle$1(hash, css) {
	const runtime = getRuntime$1();
	runtime.styles.set(hash, css);
	for (const targetDocument of runtime.documents.keys()) injectStyle$1(targetDocument, hash, css);
}
if (typeof process === "undefined" || process.env.NODE_ENV !== "test") registerStyle$1("789467362f", "@layer wp-ui{@layer utilities, components, compositions, overrides;@layer components{._480b748dd3510e64__positioner{z-index:var(--wp-ui-tooltip-z-index,initial)}._50096b232db7709d__popup{background-color:var(--wpds-color-background-surface-neutral-strong,#fff);border-radius:var(--wpds-border-radius-md,4px);box-shadow:var(--wpds-elevation-sm,0 1px 2px 0 #0000000d,0 2px 3px 0 #0000000a,0 6px 6px 0 #00000008,0 8px 8px 0 #00000005);color:var(--wpds-color-foreground-content-neutral,#1e1e1e);font-family:var(--wpds-typography-font-family-body,-apple-system,system-ui,\"Segoe UI\",\"Roboto\",\"Oxygen-Sans\",\"Ubuntu\",\"Cantarell\",\"Helvetica Neue\",sans-serif);font-size:var(--wpds-typography-font-size-sm,12px);line-height:1.4;padding:var(--wpds-dimension-padding-xs,4px) var(--wpds-dimension-padding-sm,8px);@media (forced-colors:active){border-bottom-color:CanvasText;border-bottom-style:solid;border-bottom-width:1px;border-left-color:CanvasText;border-left-style:solid;border-left-width:1px;border-right-color:CanvasText;border-right-style:solid;border-right-width:1px;border-top-color:CanvasText;border-top-style:solid;border-top-width:1px}}}}");
var style_default$1 = {
	"positioner": "_480b748dd3510e64__positioner",
	"popup": "_50096b232db7709d__popup"
};
var POPUP_COLOR = { background: "#1e1e1e" };
var Popup = (0, react$1.forwardRef)(function TooltipPopup$1({ portal, positioner, children, className, ...props }, ref) {
	const popupContent = /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ThemeProvider, {
		color: POPUP_COLOR,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TooltipPopup, {
			ref,
			className: (0, clsx.default)(style_default$1.popup, className),
			...props,
			children
		})
	});
	const positionedPopup = renderSlotWithChildren(positioner, /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Positioner, {}), popupContent);
	return renderSlotWithChildren(portal, /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Portal, {}), positionedPopup);
});
//#endregion
//#region ../../../node_modules/.pnpm/@wordpress+ui@0.17.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/ui/build-module/tooltip/trigger.mjs
var Trigger = (0, react$1.forwardRef)(function TooltipTrigger$1(props, ref) {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TooltipTrigger, {
		ref,
		...props
	});
});
//#endregion
//#region ../../../node_modules/.pnpm/@wordpress+ui@0.17.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/ui/build-module/tooltip/root.mjs
function Root(props) {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TooltipRoot, { ...props });
}
//#endregion
//#region ../../../node_modules/.pnpm/@wordpress+ui@0.17.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/ui/build-module/tooltip/provider.mjs
function Provider({ ...props }) {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TooltipProvider, { ...props });
}
//#endregion
//#region ../../../node_modules/.pnpm/@wordpress+ui@0.17.0_@types+react@18.3.28_date-fns@4.1.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/ui/build-module/icon-button/icon-button.mjs
var STYLE_HASH_ATTRIBUTE = "data-wp-hash";
function getRuntime() {
	const globalScope = globalThis;
	if (globalScope.__wpStyleRuntime) return globalScope.__wpStyleRuntime;
	globalScope.__wpStyleRuntime = {
		documents: /* @__PURE__ */ new Map(),
		styles: /* @__PURE__ */ new Map(),
		injectedStyles: /* @__PURE__ */ new WeakMap()
	};
	if (typeof document !== "undefined") registerDocument(document);
	return globalScope.__wpStyleRuntime;
}
function documentContainsStyleHash(targetDocument, hash) {
	if (!targetDocument.head) return false;
	for (const style of targetDocument.head.querySelectorAll(`style[${STYLE_HASH_ATTRIBUTE}]`)) if (style.getAttribute(STYLE_HASH_ATTRIBUTE) === hash) return true;
	return false;
}
function injectStyle(targetDocument, hash, css) {
	if (!targetDocument.head) return;
	const runtime = getRuntime();
	let injectedStyles = runtime.injectedStyles.get(targetDocument);
	if (!injectedStyles) {
		injectedStyles = /* @__PURE__ */ new Set();
		runtime.injectedStyles.set(targetDocument, injectedStyles);
	}
	if (injectedStyles.has(hash)) return;
	if (documentContainsStyleHash(targetDocument, hash)) {
		injectedStyles.add(hash);
		return;
	}
	const style = targetDocument.createElement("style");
	style.setAttribute(STYLE_HASH_ATTRIBUTE, hash);
	style.appendChild(targetDocument.createTextNode(css));
	targetDocument.head.appendChild(style);
	injectedStyles.add(hash);
}
function registerDocument(targetDocument) {
	const runtime = getRuntime();
	runtime.documents.set(targetDocument, (runtime.documents.get(targetDocument) ?? 0) + 1);
	for (const [hash, css] of runtime.styles) injectStyle(targetDocument, hash, css);
	return () => {
		const count = runtime.documents.get(targetDocument);
		if (count === void 0) return;
		if (count <= 1) {
			runtime.documents.delete(targetDocument);
			return;
		}
		runtime.documents.set(targetDocument, count - 1);
	};
}
function registerStyle(hash, css) {
	const runtime = getRuntime();
	runtime.styles.set(hash, css);
	for (const targetDocument of runtime.documents.keys()) injectStyle(targetDocument, hash, css);
}
if (typeof process === "undefined" || process.env.NODE_ENV !== "test") registerStyle("65cec4cf71", "@layer wp-ui{@layer utilities, components, compositions, overrides;@layer compositions{._28cfdc260e755391__icon-button{--wp-ui-button-aspect-ratio:1;--wp-ui-button-padding-inline:0;--wp-ui-button-min-width:unset}.f1c70d719989a85a__icon{margin:-1px}}}");
var style_default = {
	"icon-button": "_28cfdc260e755391__icon-button",
	"icon": "f1c70d719989a85a__icon"
};
var IconButton = (0, react$1.forwardRef)(function IconButton2({ label, className, children: _children, disabled, focusableWhenDisabled = true, icon, size, shortcut, positioner, ...restProps }, ref) {
	const classes = (0, clsx.default)(style_default["icon-button"], className);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Provider, {
		delay: 0,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(Root, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Trigger, {
			ref,
			disabled: disabled && !focusableWhenDisabled,
			render: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Button, {
				...restProps,
				size,
				"aria-label": label,
				"aria-keyshortcuts": shortcut?.ariaKeyShortcut,
				disabled,
				focusableWhenDisabled
			}),
			className: classes,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Icon$2, {
				icon,
				size: 24,
				className: style_default.icon
			})
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(Popup, {
			positioner,
			children: [label, shortcut && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [" ", /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				"aria-hidden": "true",
				children: shortcut.displayShortcut
			})] })]
		})] })
	});
});
//#endregion
//#region src/components/legend/utils/value-or-identity.ts
/**
* Returns an object's value if defined, or the object.
* @param _ - The object to return the value of.
* @return The value of the object, or the object itself.
*/
function valueOrIdentity(_) {
	if (_ && typeof _ === "object" && "value" in _ && typeof _.value !== "undefined") return _.value;
	return _;
}
/**
* Returns an object's value if defined, or the object, coerced to a string.
* @param _ - The object to return the value of.
* @return The value of the object, or the object itself.
*/
function valueOrIdentityString(_) {
	return String(valueOrIdentity(_));
}
//#endregion
//#region src/components/legend/utils/label-transform-factory.ts
/**
* Returns a function which takes a Datum and index as input, and returns a formatted label object.
* @param {object}                            root0             - The object to return the value of.
* @param {AnyD3Scale}                        root0.scale       - The scale to use.
* @param {LabelFormatter<ScaleInput<Scale>>} root0.labelFormat - The label format to use.
* @return {ItemTransformer<ScaleInput<Scale>, ReturnType<Scale>>} The label transform factory.
*/
function labelTransformFactory({ scale, labelFormat }) {
	return (d, i) => ({
		datum: d,
		index: i,
		text: `${labelFormat(d, i)}`,
		value: scale(d)
	});
}
//#endregion
//#region src/components/legend/private/base-legend.module.scss
var base_legend_module_default = {
	"legend": "a8ccharts-04TogW-legend",
	"legend-item": "a8ccharts-04TogW-legend-item",
	"legend-item--inactive": "a8ccharts-04TogW-legend-item--inactive",
	"legend-item--interactive": "a8ccharts-04TogW-legend-item--interactive",
	"legend-item-label": "a8ccharts-04TogW-legend-item-label",
	"legend-item-text--ellipsis": "a8ccharts-04TogW-legend-item-text--ellipsis",
	"legend-item-text--wrap": "a8ccharts-04TogW-legend-item-text--wrap",
	"legend-item-value": "a8ccharts-04TogW-legend-item-value"
};
//#endregion
//#region src/components/legend/private/base-legend.tsx
const ALIGNMENT_TO_FLEX = {
	start: "flex-start",
	center: "center",
	end: "flex-end"
};
const LegendText = ({ text, textOverflow, maxWidth }) => {
	const isEllipsis = maxWidth != null && textOverflow === "ellipsis";
	const [textRef, isTruncated] = useTextTruncation(Boolean(isEllipsis));
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
		ref: textRef,
		className: (0, clsx.default)(base_legend_module_default["legend-item-text"], maxWidth != null && base_legend_module_default[`legend-item-text--${textOverflow}`]),
		style: { ...maxWidth != null && {
			maxWidth,
			minWidth: 0
		} },
		title: isEllipsis && isTruncated ? text : void 0,
		children: text
	});
};
const BaseLegend = (0, react$1.forwardRef)(({ items, className, orientation = "horizontal", alignment = "center", shape = "rect", fill = valueOrIdentityString, size = valueOrIdentityString, labelFormat = valueOrIdentity, labelTransform = labelTransformFactory, itemStyles, itemClassName, labelStyles, labelClassName, shapeStyles, render, interactive = false, chartId }, ref) => {
	const { margin: itemMargin = "0", flexDirection: itemDirection = "row" } = itemStyles ?? {};
	const { justifyContent: labelJustifyContent = "flex-start", flex: labelFlex = "0 0 auto", margin: labelMargin = "0 4px", maxWidth, textOverflow = "wrap" } = labelStyles ?? {};
	const { width: shapeWidth = 16, height: shapeHeight = 16, margin: shapeMargin = "2px 4px 2px 0" } = shapeStyles ?? {};
	const theme = useGlobalChartsTheme();
	const context = (0, react$1.useContext)(GlobalChartsContext);
	const legendScale = (0, _visx_scale.scaleOrdinal)({
		domain: items.map((item) => item.label),
		range: items.map((item) => item.color)
	});
	const domain = legendScale.domain();
	const getShapeStyle = (0, react$1.useCallback)(({ index }) => items[index]?.shapeStyle, [items]);
	const handleLegendClick = (0, react$1.useCallback)((seriesLabel) => {
		if (interactive && chartId && context) context.toggleSeriesVisibility(chartId, seriesLabel);
	}, [
		interactive,
		chartId,
		context
	]);
	const isSeriesVisible = (0, react$1.useCallback)((seriesLabel) => {
		if (!interactive || !chartId || !context) return true;
		return context.isSeriesVisible(chartId, seriesLabel);
	}, [
		interactive,
		chartId,
		context
	]);
	const createClickHandler = (0, react$1.useCallback)((labelText) => {
		if (!interactive) return;
		return () => handleLegendClick(labelText);
	}, [interactive, handleLegendClick]);
	const createKeyDownHandler = (0, react$1.useCallback)((labelText) => {
		if (!interactive) return;
		return (event) => {
			if (event.key === "Enter" || event.key === " ") {
				event.preventDefault();
				handleLegendClick(labelText);
			}
		};
	}, [interactive, handleLegendClick]);
	const flexAlignment = ALIGNMENT_TO_FLEX[alignment] ?? "center";
	return render ? render(items) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_visx_legend.LegendOrdinal, {
		scale: legendScale,
		labelFormat,
		labelTransform,
		children: (labels) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Stack, {
			ref,
			direction: orientation === "vertical" ? "column" : "row",
			gap: orientation === "vertical" ? "sm" : "lg",
			align: orientation === "vertical" ? flexAlignment : void 0,
			justify: orientation === "horizontal" ? flexAlignment : void 0,
			wrap: orientation === "horizontal" ? "wrap" : void 0,
			role: "list",
			className: (0, clsx.default)(base_legend_module_default.legend, className),
			style: theme.legend?.containerStyles,
			children: labels.map((label, i) => {
				const visible = isSeriesVisible(label.text);
				const handleClick = createClickHandler(label.text);
				const handleKeyDown = createKeyDownHandler(label.text);
				const matchedItem = items[i];
				return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_visx_legend.LegendItem, {
					className: (0, clsx.default)("visx-legend-item", base_legend_module_default["legend-item"], interactive && base_legend_module_default["legend-item--interactive"], !visible && base_legend_module_default["legend-item--inactive"], itemClassName),
					margin: itemMargin,
					flexDirection: orientation === "vertical" && alignment === "end" ? "row-reverse" : itemDirection,
					onClick: handleClick,
					onKeyDown: handleKeyDown,
					role: interactive ? "button" : void 0,
					tabIndex: interactive ? 0 : void 0,
					"aria-pressed": interactive ? visible : void 0,
					"aria-label": interactive ? `${label.text}: ${visible ? "visible" : "hidden"}. Toggle visibility.` : void 0,
					children: [items[i]?.renderGlyph ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
						width: items[i]?.glyphSize * 2,
						height: items[i]?.glyphSize * 2,
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_visx_group.Group, { children: items[i]?.renderGlyph({
							key: `legend-glyph-${label.text}`,
							datum: {},
							index: i,
							color: fill(label),
							size: items[i]?.glyphSize,
							x: items[i]?.glyphSize,
							y: items[i]?.glyphSize
						}) })
					}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_visx_legend.LegendShape, {
						shape,
						height: shapeHeight,
						width: shapeWidth,
						margin: shapeMargin,
						item: domain[i],
						itemIndex: i,
						label,
						fill,
						size,
						shapeStyle: getShapeStyle
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_visx_legend.LegendLabel, {
						className: (0, clsx.default)("visx-legend-label", base_legend_module_default["legend-item-label"], labelClassName),
						style: {
							flex: labelFlex,
							margin: labelMargin,
							...theme.legend?.labelStyles
						},
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(Stack, {
							align: "center",
							gap: "sm",
							justify: labelJustifyContent,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(LegendText, {
								text: label.text,
								textOverflow,
								maxWidth
							}), matchedItem?.value != null && matchedItem.value !== "" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
								className: base_legend_module_default["legend-item-value"],
								children: ["\xA0", matchedItem.value]
							})]
						})
					})]
				}, `legend-${label.text}-${i}`);
			})
		})
	});
});
//#endregion
//#region src/components/legend/legend.tsx
const defaultShapeByChartType = {
	area: "rect",
	line: "line",
	bar: "rect",
	pie: "circle",
	"pie-semi-circle": "circle",
	leaderboard: "circle"
};
const Legend = (0, react$1.forwardRef)(({ chartId, items, shape, ...props }, ref) => {
	const context = (0, react$1.useContext)(GlobalChartsContext);
	const singleChartContext = (0, react$1.useContext)(SingleChartContext);
	const contextChartId = chartId ?? singleChartContext?.chartId;
	const chartData = (0, react$1.useMemo)(() => contextChartId && context ? context.getChartData(contextChartId) : void 0, [contextChartId, context]);
	const contextItems = chartData?.legendItems;
	const resolvedShape = shape ?? (chartData?.chartType ? defaultShapeByChartType[chartData.chartType] : void 0);
	const legendItems = items || contextItems;
	if (!legendItems) return null;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(BaseLegend, {
		ref,
		items: legendItems,
		shape: resolvedShape,
		...props,
		chartId: contextChartId
	});
});
//#endregion
//#region src/components/legend/hooks/use-chart-legend-items.ts
/**
* Formats the value for a data point based on its type and display preference
* @param point              - The data point to format
* @param showValues         - Whether to show values or return empty string
* @param legendValueDisplay - What type of value to display
* @return Formatted value string
*/
function formatPointValue(point, showValues, legendValueDisplay = "percentage") {
	if (!showValues || legendValueDisplay === "none") return "";
	if ("percentage" in point) switch (legendValueDisplay) {
		case "percentage": return formatPercentage(point.percentage);
		case "value": return (0, _automattic_number_formatters.formatNumber)(point.value);
		case "valueDisplay": return point.valueDisplay || (0, _automattic_number_formatters.formatNumber)(point.value);
		default: return "";
	}
	if ("value" in point) return point.value !== null ? (0, _automattic_number_formatters.formatNumber)(point.value) : "";
	return "";
}
/**
* Applies glyph configuration to a legend item if needed
* @param baseItem    - The base legend item
* @param withGlyph   - Whether to include glyph rendering
* @param glyph       - Glyph component from theme
* @param renderGlyph - Custom glyph render function
* @param glyphSize   - Size of the glyph
* @return The legend item with glyph configuration applied if applicable
*/
function applyGlyphToLegendItem(baseItem, withGlyph, glyph, renderGlyph, glyphSize) {
	if (withGlyph) {
		const glyphToUse = glyph || renderGlyph;
		if (glyphToUse) return {
			...baseItem,
			glyphSize,
			renderGlyph: glyphToUse
		};
	}
	return baseItem;
}
/**
* Processes SeriesData into legend items
* @param seriesData       - The series data to process
* @param getElementStyles - Function to get element styles
* @param showValues       - Whether to show values in legend
* @param withGlyph        - Whether to include glyph rendering
* @param glyphSize        - Size of the glyph
* @param renderGlyph      - Component to render the glyph
* @param legendShape      - The shape type for legend items (string literal or React component)
* @return Array of processed legend items
*/
function processSeriesData(seriesData, getElementStyles, showValues, withGlyph, glyphSize, renderGlyph, legendShape) {
	const mapper = (series, index) => {
		const { color, glyph, shapeStyles } = getElementStyles({
			data: series,
			index,
			legendShape
		});
		return applyGlyphToLegendItem({
			label: series.label,
			value: showValues ? series.data?.length?.toString() || "0" : "",
			color,
			shapeStyle: shapeStyles
		}, withGlyph, glyph, renderGlyph, glyphSize);
	};
	return seriesData.map(mapper);
}
/**
* Processes point data into legend items
* @param pointData          - The point data to process
* @param getElementStyles   - Function to get element styles
* @param showValues         - Whether to show values in legend
* @param legendValueDisplay - What type of value to display
* @param withGlyph          - Whether to include glyph rendering
* @param glyphSize          - Size of the glyph
* @param renderGlyph        - Component to render the glyph
* @param legendShape        - The shape type for legend items (string literal or React component)
* @return Array of processed legend items
*/
function processPointData(pointData, getElementStyles, showValues, legendValueDisplay, withGlyph, glyphSize, renderGlyph, legendShape) {
	const mapper = (point, index) => {
		const { color, glyph, shapeStyles } = getElementStyles({
			data: point,
			index,
			legendShape
		});
		return applyGlyphToLegendItem({
			label: point.label,
			value: formatPointValue(point, showValues, legendValueDisplay),
			color,
			shapeStyle: shapeStyles
		}, withGlyph, glyph, renderGlyph, glyphSize);
	};
	return pointData.map(mapper);
}
/**
* Hook to transform chart data into legend items
* @param data        - The chart data to transform
* @param options     - Configuration options for legend generation
* @param legendShape - The shape type for legend items (string literal or React component)
* @return Array of legend items ready for display
*/
function useChartLegendItems(data, options = {}, legendShape) {
	const { showValues = false, legendValueDisplay = "percentage", withGlyph = false, glyphSize = 8, renderGlyph } = options;
	const { getElementStyles } = useGlobalChartsContext();
	return (0, react$1.useMemo)(() => {
		if (!data || !Array.isArray(data) || data.length === 0) return [];
		if ("data" in data[0]) return processSeriesData(data, getElementStyles, showValues, withGlyph, glyphSize, renderGlyph, legendShape);
		return processPointData(data, getElementStyles, showValues, legendValueDisplay, withGlyph, glyphSize, renderGlyph, legendShape);
	}, [
		data,
		getElementStyles,
		showValues,
		legendValueDisplay,
		withGlyph,
		glyphSize,
		renderGlyph,
		legendShape
	]);
}
//#endregion
//#region src/components/tooltip/base-tooltip.module.scss
var base_tooltip_module_default = { "tooltip": "a8ccharts--zY0xG-tooltip" };
//#endregion
//#region src/components/tooltip/base-tooltip.tsx
const DefaultTooltipContent = ({ data }) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
	data?.label,
	": ",
	data?.valueDisplay || (0, _automattic_number_formatters.formatNumber)(data?.value)
] });
const BaseTooltip = ({ data, top, left, component: Component = DefaultTooltipContent, children, className, style, renderContainer = true }) => {
	const content = children || data && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Component, {
		data,
		className
	});
	if (!renderContainer) return content;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: base_tooltip_module_default.tooltip,
		style: {
			top,
			left,
			...style
		},
		role: "tooltip",
		children: content
	});
};
//#endregion
//#region src/components/tooltip/accessible-tooltip.tsx
const AccessibleTooltip = ({ renderTooltip, selectedIndex, tooltipRef, keyboardFocusedClassName, series = [], mode = "group", ...props }) => {
	const tooltipContext = (0, react$1.useContext)(_visx_xychart.TooltipContext);
	const tooltipData = (0, react$1.useMemo)(() => {
		if (mode !== "individual") return [];
		if (series.length === 0) return [];
		const maxDataPoints = Math.max(...series.map((s) => s.data.length));
		const flattened = [];
		for (let dataPointIndex = 0; dataPointIndex < maxDataPoints; dataPointIndex++) for (let seriesIndex = 0; seriesIndex < series.length; seriesIndex++) {
			const seriesData = series[seriesIndex];
			if (dataPointIndex < seriesData.data.length) flattened.push({
				datum: seriesData.data[dataPointIndex],
				seriesLabel: seriesData.label,
				seriesIndex,
				dataPointIndex
			});
		}
		return flattened;
	}, [series, mode]);
	(0, react$1.useEffect)(() => {
		if (selectedIndex === void 0) {
			tooltipContext?.hideTooltip();
			return;
		}
		if (mode === "group") series.forEach((s, index) => {
			if (selectedIndex < s.data.length) {
				const datum = s.data[selectedIndex];
				tooltipContext?.showTooltip({
					datum,
					key: s.label,
					index
				});
			}
		});
		else if (mode === "individual") {
			if (selectedIndex < tooltipData.length) {
				const tooltipItem = tooltipData[selectedIndex];
				tooltipContext?.showTooltip({
					datum: tooltipItem.datum,
					key: tooltipItem.seriesLabel,
					index: tooltipItem.seriesIndex
				});
			}
		}
	}, [
		selectedIndex,
		tooltipData,
		series
	]);
	const focusableRenderTooltip = (0, react$1.useMemo)(() => {
		if (!renderTooltip) return void 0;
		return (params) => {
			const tooltipContent = renderTooltip(params);
			if (selectedIndex !== void 0) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				ref: tooltipRef,
				tabIndex: -1,
				role: "tooltip",
				"aria-atomic": "true",
				className: keyboardFocusedClassName,
				children: tooltipContent
			}, `chart-tooltip-${selectedIndex}`);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				role: "tooltip",
				"aria-live": "polite",
				children: tooltipContent
			});
		};
	}, [
		renderTooltip,
		selectedIndex,
		tooltipRef,
		keyboardFocusedClassName
	]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_visx_xychart.Tooltip, {
		...props,
		renderTooltip: focusableRenderTooltip
	});
};
const useKeyboardNavigation = ({ selectedIndex, setSelectedIndex, isNavigating, setIsNavigating, chartRef, totalPoints }) => {
	return {
		tooltipRef: (0, react$1.useCallback)((element) => {
			if (element && selectedIndex !== void 0) element.focus();
		}, [selectedIndex]),
		onChartFocus: (0, react$1.useCallback)(() => {
			if (!isNavigating && selectedIndex !== void 0) setSelectedIndex(0);
		}, [
			isNavigating,
			selectedIndex,
			setSelectedIndex
		]),
		onChartBlur: (0, react$1.useCallback)(() => {
			setIsNavigating(false);
		}, [setIsNavigating]),
		onChartKeyDown: (0, react$1.useCallback)((event) => {
			if (totalPoints === 0) return;
			if (event.key === "Tab") {
				chartRef.current?.focus();
				setSelectedIndex(void 0);
				setIsNavigating(false);
				return;
			}
			const currentSelectedIndex = selectedIndex === void 0 ? -1 : selectedIndex;
			if (currentSelectedIndex + 1 >= totalPoints && ["ArrowRight"].includes(event.key)) {
				chartRef.current?.focus();
				setSelectedIndex(void 0);
				setIsNavigating(false);
				return;
			}
			event.preventDefault();
			if (["ArrowRight"].includes(event.key)) {
				setIsNavigating(true);
				setSelectedIndex((currentSelectedIndex + 1) % totalPoints);
			} else if (["ArrowLeft"].includes(event.key)) {
				setIsNavigating(true);
				setSelectedIndex((currentSelectedIndex - 1 + totalPoints) % totalPoints);
			} else if (event.key === "Escape") {
				setSelectedIndex(void 0);
				setIsNavigating(false);
				chartRef.current?.focus();
			}
		}, [
			totalPoints,
			selectedIndex,
			setSelectedIndex,
			setIsNavigating,
			chartRef
		])
	};
};
//#endregion
//#region src/charts/private/chart-composition/chart-svg.tsx
/**
* Compound component for SVG children in charts.
* This component serves as a marker for SVG content that should be rendered
* inside the chart's SVG element. The actual rendering is handled by the parent chart.
*
* @param {PropsWithChildren} props          - Component props
* @param {ReactNode}         props.children - Child elements to render inside the SVG
* @return {JSX.Element} The children wrapped in a fragment
*/
const ChartSVG = ({ children }) => {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react_jsx_runtime.Fragment, { children });
};
ChartSVG.displayName = "Chart.SVG";
//#endregion
//#region src/charts/private/chart-composition/chart-html.tsx
/**
* Compound component for HTML children in charts.
* This component serves as a marker for HTML content that should be rendered
* outside the chart's SVG element. The actual rendering is handled by the parent chart.
*
* @param {PropsWithChildren} props          - Component props
* @param {ReactNode}         props.children - Child elements to render outside the SVG
* @return {JSX.Element} The children wrapped in a fragment
*/
const ChartHTML = ({ children }) => {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react_jsx_runtime.Fragment, { children });
};
ChartHTML.displayName = "Chart.HTML";
//#endregion
//#region src/charts/private/chart-composition/render-legend-slot.ts
/**
* Renders legend children filtered by position slot.
*
* @param {LegendChild[]}  legendChildren - The legend children to filter and render
* @param {LegendPosition} position       - The position slot to render
* @return {ReactNode[]} Array of legend elements for the given position
*/
function renderLegendSlot(legendChildren, position) {
	return legendChildren.filter((l) => l.position === position).map((l, i) => (0, react$1.createElement)(react$1.Fragment, { key: `legend-${position}-${i}` }, l.element));
}
//#endregion
//#region src/charts/private/chart-composition/use-chart-children.ts
/**
* Custom hook to process and categorize chart children for composition API.
* Extracts children from compound components (Chart.SVG, Chart.HTML) and
* maintains backward compatibility with legacy Group components.
*
* @param {ReactNode} children  - The children prop from the chart component
* @param {string}    chartType - The type of chart (e.g., 'PieChart', 'BarChart')
* @return {ChartChildren} Categorized children for rendering
*/
function useChartChildren(children, chartType) {
	return (0, react$1.useMemo)(() => {
		const svg = [];
		const html = [];
		const legend = [];
		const other = [];
		const nonLegend = [];
		react$1.Children.forEach(children, (child) => {
			if ((0, react$1.isValidElement)(child)) {
				if (child.type === Legend) {
					const rawPosition = child.props?.position;
					const position = rawPosition === "top" || rawPosition === "bottom" ? rawPosition : "bottom";
					legend.push({
						element: child,
						position
					});
					return;
				}
				const displayName = child.type?.displayName;
				if (displayName === `${chartType}.SVG` || displayName === "Chart.SVG") {
					if (child.props?.children) react$1.Children.forEach(child.props.children, (svgChild) => {
						svg.push(svgChild);
					});
				} else if (displayName === `${chartType}.HTML` || displayName === "Chart.HTML") {
					if (child.props?.children) react$1.Children.forEach(child.props.children, (htmlChild) => {
						html.push(htmlChild);
					});
				} else if (child.type === _visx_group.Group) svg.push(child);
				else other.push(child);
			}
			nonLegend.push(child);
		});
		return {
			svgChildren: svg,
			htmlChildren: html,
			legendChildren: legend,
			otherChildren: other,
			nonLegendChildren: nonLegend
		};
	}, [children, chartType]);
}
//#endregion
//#region src/charts/private/chart-layout/chart-layout.module.scss
var chart_layout_module_default = { "chart-layout__content": "a8ccharts-fpNVAq-chart-layout__content" };
//#endregion
//#region src/charts/private/chart-layout/chart-layout.tsx
const ChartLayout = ({ legendPosition, legendElement, legendChildren, children, trailingContent, onContentHeightChange, gap, className, style, "data-testid": dataTestId, "data-chart-id": dataChartId }) => {
	const [contentRef, contentWidth, contentHeight] = useElementSize();
	const isRenderProp = typeof children === "function";
	const isMeasured = contentHeight > 0;
	const visibilityStyle = isRenderProp && !isMeasured ? { visibility: "hidden" } : {};
	(0, react$1.useEffect)(() => {
		if (isRenderProp && onContentHeightChange && isMeasured) onContentHeightChange(contentHeight);
	}, [
		isRenderProp,
		contentHeight,
		isMeasured,
		onContentHeightChange
	]);
	const renderedChildren = isRenderProp ? children({
		contentWidth,
		contentHeight,
		isMeasured
	}) : children;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(Stack, {
		direction: "column",
		gap,
		className,
		style: {
			...style,
			...visibilityStyle
		},
		"data-chart-id": dataChartId,
		children: [
			legendPosition === "top" && legendElement,
			renderLegendSlot(legendChildren, "top"),
			isRenderProp ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				ref: contentRef,
				className: chart_layout_module_default["chart-layout__content"],
				children: renderedChildren
			}) : renderedChildren,
			legendPosition === "bottom" && legendElement,
			renderLegendSlot(legendChildren, "bottom"),
			trailingContent
		]
	});
};
//#endregion
//#region src/charts/private/default-glyph/default-glyph.tsx
const DefaultGlyph = (props) => {
	const { theme } = (0, react$1.useContext)(_visx_xychart.DataContext) || {};
	props.position;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("circle", {
		cx: props.x,
		cy: props.y,
		r: props.size,
		fill: props.color,
		stroke: theme?.backgroundColor,
		strokeWidth: 1.5,
		paintOrder: "fill",
		...props.glyphStyle
	});
};
//#endregion
//#region src/charts/private/center/center.module.scss
var center_module_default = { "center": "a8ccharts-w3qxlG-center" };
//#endregion
//#region src/charts/private/center/center.tsx
/**
* Centers its children on both axes and fills its parent.
*
* A thin wrapper around `Stack` with `align="center"` and `justify="center"`
* defaults (both overridable) plus `width: 100%; height: 100%`. Reads more
* honestly than a `Stack` with both axes centered, and lets call sites drop
* ad-hoc `*__centering` classes. Forwards its ref and spreads remaining props
* onto the underlying `Stack`.
*
* @param props - Stack props; `align`/`justify` default to `"center"`.
* @param ref   - Forwarded to the underlying element.
* @return The centered layout element.
*/
const Center = (0, react$1.forwardRef)(({ align = "center", justify = "center", className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Stack, {
	ref,
	align,
	justify,
	className: (0, clsx.default)(center_module_default.center, className),
	...props
}));
Center.displayName = "Center";
//#endregion
//#region src/charts/private/svg-empty-state/svg-empty-state.module.scss
var svg_empty_state_module_default = { "svg-empty-state": "a8ccharts-udGPVq-svg-empty-state" };
//#endregion
//#region src/charts/private/svg-empty-state/svg-empty-state.tsx
/**
* Renders empty-state text inside an SVG using foreignObject so that the
* message wraps onto multiple lines instead of being clipped.
*
* The component centers the text within the specified area.
*
* @param  root0          - Component props
* @param  root0.x        - X coordinate of the center point
* @param  root0.y        - Y coordinate of the center point
* @param  root0.width    - Available width for the text area
* @param  root0.height   - Available height for the text area
* @param  root0.children - Text content
* @return {JSX.Element} A foreignObject element containing the centered text.
*/
const SvgEmptyState = ({ x, y, width, height, children }) => {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("foreignObject", {
		x: x - width / 2,
		y: y - height / 2,
		width,
		height,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Center, {
			className: svg_empty_state_module_default["svg-empty-state"],
			children
		})
	});
};
//#endregion
//#region src/charts/private/time-axis.ts
const X_TICK_WIDTH = 60;
const getCurveType = (type, smoothing) => {
	if (!type) return smoothing ? _visx_curve.curveCatmullRom : _visx_curve.curveLinear;
	switch (type) {
		case "smooth": return _visx_curve.curveCatmullRom;
		case "monotone": return _visx_curve.curveMonotoneX;
		case "linear": return _visx_curve.curveLinear;
		default: return _visx_curve.curveLinear;
	}
};
const formatYearTick = (timestamp) => {
	return new Date(timestamp).toLocaleDateString(void 0, { year: "numeric" });
};
const formatDateTick$1 = (timestamp) => {
	return new Date(timestamp).toLocaleDateString(void 0, {
		month: "short",
		day: "numeric"
	});
};
const formatHourTick = (timestamp) => {
	return new Date(timestamp).toLocaleTimeString(void 0, {
		hour: "numeric",
		hour12: true
	});
};
const getFormatter = (sortedData) => {
	const minX = Math.min(...sortedData.map((datom) => datom.data.at(0)?.date));
	const maxX = Math.max(...sortedData.map((datom) => datom.data.at(-1)?.date));
	if (Math.abs((0, date_fns.differenceInHours)(maxX, minX)) <= 24) return formatHourTick;
	if (Math.abs((0, date_fns.differenceInYears)(maxX, minX)) <= 1) return formatDateTick$1;
	return formatYearTick;
};
const guessOptimalNumTicks = (data, chartWidth, tickFormatter) => {
	const xScale = (0, _visx_scale.scaleTime)({ domain: [Math.min(...data.map((datom) => datom.data.at(0)?.date)), Math.max(...data.map((datom) => datom.data.at(-1)?.date))] });
	const upperBound = Math.min(data[0]?.data.length || 3, Math.ceil(chartWidth / X_TICK_WIDTH));
	let secondBestGuess = 1;
	for (let numTicks = upperBound; numTicks > 1; --numTicks) {
		const ticks = xScale.ticks(numTicks).map((d) => tickFormatter(d.getTime()));
		if (ticks.length > upperBound) continue;
		secondBestGuess = Math.max(secondBestGuess, ticks.length);
		if (Array.from(new Set(ticks)).length === 1) return 1;
		if (ticks.some((tick, idx) => idx > 0 && tick === ticks[idx - 1])) continue;
		return ticks.length;
	}
	return secondBestGuess;
};
//#endregion
//#region src/charts/private/with-responsive/with-responsive.module.scss
var with_responsive_module_default = {
	"container": "a8ccharts-sP1gHa-container",
	"content": "a8ccharts-sP1gHa-content",
	"isContained": "a8ccharts-sP1gHa-isContained"
};
//#endregion
//#region src/charts/private/with-responsive/with-responsive.tsx
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? react$1.useLayoutEffect : react$1.useEffect;
/**
* A higher-order component that provides responsive dimensions
* to the wrapped chart component using useParentSize from `@visx/responsive`.
*
* @param WrappedComponent - The chart component to be wrapped.
* @return A functional component that renders the wrapped component with responsive dimensions.
*/
function withResponsive(WrappedComponent) {
	return function ResponsiveChart({ resizeDebounceTime = 300, maxWidth = 1200, aspectRatio, size, width, height, ...chartProps }) {
		const { parentRef, width: parentWidth, height: parentHeight } = (0, _visx_responsive.useParentSize)({
			debounceTime: resizeDebounceTime,
			enableDebounceLeadingCall: true
		});
		const hasAspectRatio = aspectRatio !== void 0 && aspectRatio > 0;
		const wrapperRef = (0, react$1.useRef)(null);
		const setWrapperRef = (0, react$1.useCallback)((node) => {
			wrapperRef.current = node;
			if (typeof parentRef === "function") parentRef(node);
			else if (parentRef) parentRef.current = node;
		}, [parentRef]);
		const [containedHeight, setContainedHeight] = (0, react$1.useState)(null);
		const availableWidth = parentWidth > 0 ? Math.min(parentWidth, width === void 0 ? maxWidth : Infinity) : width ?? 0;
		let boxWidth = availableWidth;
		let boxHeight;
		if (hasAspectRatio) {
			const derivedHeight = availableWidth * aspectRatio;
			if (containedHeight !== null && derivedHeight > containedHeight) {
				boxHeight = containedHeight;
				boxWidth = boxHeight / aspectRatio;
			} else boxHeight = derivedHeight;
		} else boxHeight = parentHeight > 0 ? parentHeight : height ?? 0;
		useIsomorphicLayoutEffect(() => {
			if (!hasAspectRatio) {
				if (containedHeight !== null) setContainedHeight(null);
				return;
			}
			const available = wrapperRef.current?.clientHeight ?? 0;
			const derivedHeight = availableWidth * aspectRatio;
			if (containedHeight === null) {
				if (available > 0 && derivedHeight > available + 1) setContainedHeight(available);
			} else if (available >= derivedHeight - 1) setContainedHeight(null);
			else if (Math.abs(available - containedHeight) > 1) setContainedHeight(available);
		}, [
			hasAspectRatio,
			availableWidth,
			aspectRatio,
			containedHeight,
			parentHeight
		]);
		const wrappedComponent = /* @__PURE__ */ (0, react_jsx_runtime.jsx)(WrappedComponent, {
			width: boxWidth,
			height: boxHeight,
			size,
			...chartProps
		});
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			ref: setWrapperRef,
			className: (0, clsx.default)(with_responsive_module_default.container, hasAspectRatio && with_responsive_module_default.isContained),
			style: {
				...width !== void 0 ? { width } : null,
				...height !== void 0 ? { height } : null
			},
			children: hasAspectRatio ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: with_responsive_module_default.content,
				style: {
					width: boxWidth,
					height: boxHeight
				},
				children: wrappedComponent
			}) : wrappedComponent
		});
	};
}
//#endregion
//#region src/charts/private/x-zoom/x-zoom.module.scss
var x_zoom_module_default = {
	"x-zoom__reset": "a8ccharts-ur9dWW-x-zoom__reset",
	"x-zoom__selection": "a8ccharts-ur9dWW-x-zoom__selection"
};
//#endregion
//#region src/charts/private/x-zoom/x-zoom.tsx
const MIN_DRAG_PIXELS = 6;
/**
* Drag-to-zoom state + pointer handlers for an XY chart. Designed to be
* embedded in a chart parent: the parent owns the result, spreads the
* `domain` into its `xScale.domain` config, and renders the selection
* rect and reset button this returns.
*
* The X scale `.invert()` is read lazily from the chart's existing
* `internalChartRef.getScales()` at commit time, so no DataContext access
* is required from the parent.
*
* @param params                            - Hook params.
* @param params.enabled                    - When false, the hook becomes a passthrough.
* @param params.chartRef                   - Chart's internal scales ref.
* @param params.userHandlers               - User-supplied pointer handlers to chain.
* @param params.userHandlers.onPointerDown - Forwarded user pointerdown handler.
* @param params.userHandlers.onPointerMove - Forwarded user pointermove handler.
* @param params.userHandlers.onPointerUp   - Forwarded user pointerup handler.
* @return An object with `domain`, `drag`, `reset`, and chained `handlers`.
*/
function useXZoom({ enabled, chartRef, userHandlers }) {
	const [domain, setDomain] = (0, react$1.useState)(null);
	const [drag, setDrag] = (0, react$1.useState)(null);
	const reset = (0, react$1.useCallback)(() => setDomain(null), []);
	const onPointerDown = (0, react$1.useCallback)((params) => {
		userHandlers?.onPointerDown?.(params);
		if (!enabled || !params.svgPoint) return;
		setDrag({
			a: params.svgPoint.x,
			b: params.svgPoint.x
		});
	}, [enabled, userHandlers]);
	const onPointerMove = (0, react$1.useCallback)((params) => {
		userHandlers?.onPointerMove?.(params);
		if (!enabled || !params.svgPoint) return;
		setDrag((current) => current ? {
			a: current.a,
			b: params.svgPoint.x
		} : current);
	}, [enabled, userHandlers]);
	const onPointerUp = (0, react$1.useCallback)((params) => {
		userHandlers?.onPointerUp?.(params);
		if (!enabled) return;
		const finalDrag = drag;
		setDrag(null);
		if (!finalDrag) return;
		const lo = Math.min(finalDrag.a, finalDrag.b);
		const hi = Math.max(finalDrag.a, finalDrag.b);
		if (hi - lo < MIN_DRAG_PIXELS) return;
		const xScale = chartRef.current?.getScales()?.xScale;
		if (!xScale || typeof xScale.invert !== "function") return;
		setDomain([xScale.invert(lo), xScale.invert(hi)]);
	}, [
		enabled,
		drag,
		chartRef,
		userHandlers
	]);
	return (0, react$1.useMemo)(() => ({
		domain,
		drag,
		reset,
		handlers: {
			onPointerDown,
			onPointerMove,
			onPointerUp
		}
	}), [
		domain,
		drag,
		reset,
		onPointerDown,
		onPointerMove,
		onPointerUp
	]);
}
/**
* Live selection rectangle drawn inside `<XYChart>` while the user is
* dragging. Reads plot dimensions from visx's `DataContext`.
*
* @param props      - Props.
* @param props.drag - Current drag, or null when idle.
* @return JSX or null.
*/
function ZoomSelectionRect({ drag }) {
	const { margin, innerHeight } = (0, react$1.useContext)(_visx_xychart.DataContext);
	if (!drag || drag.a === drag.b) return null;
	const x = Math.min(drag.a, drag.b);
	const w = Math.abs(drag.b - drag.a);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("rect", {
		className: x_zoom_module_default["x-zoom__selection"],
		x,
		y: margin?.top ?? 0,
		width: w,
		height: innerHeight ?? 0
	});
}
/**
* Wraps a chart's series in a group that is clipped to the inner plot rectangle
* while `active`. Reads the plot geometry from visx's `DataContext` (the same
* source as `ZoomSelectionRect`), so the host charts don't compute any margins.
* The group is always rendered (only its `clip-path` toggles) so toggling zoom
* never remounts or re-animates the series.
*
* @param props          - Props.
* @param props.active   - Whether to clip (e.g. `zoomable`, or `zoomable && zoomed`).
* @param props.chartId  - Chart id; used to build a unique clip-path id.
* @param props.children - The series to clip.
* @return JSX element.
*/
function ZoomClip({ active, chartId, children }) {
	const { margin, innerWidth, innerHeight } = (0, react$1.useContext)(_visx_xychart.DataContext);
	const id = `chart-zoom-clip-${String(chartId ?? "").replace(/[^A-Za-z0-9_-]/g, "")}`;
	const clip = active && (innerWidth ?? 0) > 0 && (innerHeight ?? 0) > 0;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [clip && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("clipPath", {
		id,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("rect", {
			x: margin?.left ?? 0,
			y: margin?.top ?? 0,
			width: innerWidth,
			height: innerHeight
		})
	}) }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("g", {
		clipPath: clip ? `url(#${id})` : void 0,
		children
	})] });
}
/**
* Visible icon-only reset control rendered as an HTML overlay on top of the
* chart container, using the WPDS `IconButton` (built-in accessible tooltip).
* The host should wrap its SVG in a `position: relative` container so the
* button anchors correctly.
*
* @param props         - Props.
* @param props.onClick - Click handler. Typically the `reset` from `useXZoom`.
* @return JSX element.
*/
function ZoomResetButton({ onClick }) {
	const stopActivationKeys = (0, react$1.useCallback)((event) => {
		if (event.key === "Enter" || event.key === " ") event.stopPropagation();
	}, []);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(IconButton, {
		className: x_zoom_module_default["x-zoom__reset"],
		onKeyDown: stopActivationKeys,
		icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2",
			strokeLinecap: "round",
			strokeLinejoin: "round",
			"aria-hidden": "true",
			focusable: "false",
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("g", {
				transform: "translate(2.4 2.4) scale(0.8)",
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("circle", {
						cx: "10",
						cy: "10",
						r: "6"
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("line", {
						x1: "15",
						y1: "15",
						x2: "20",
						y2: "20"
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("line", {
						x1: "7",
						y1: "10",
						x2: "13",
						y2: "10"
					})
				]
			})
		}),
		label: (0, _wordpress_i18n.__)("Reset zoom", "jetpack-charts"),
		variant: "outline",
		tone: "neutral",
		size: "small",
		onClick
	});
}
//#endregion
//#region src/charts/line-chart/line-chart.module.scss
var line_chart_module_default = {
	"line-chart": "a8ccharts-inuQka-line-chart",
	"line-chart__annotation-label": "a8ccharts-inuQka-line-chart__annotation-label",
	"line-chart__annotation-label-popover": "a8ccharts-inuQka-line-chart__annotation-label-popover",
	"line-chart__annotation-label-popover--safari": "a8ccharts-inuQka-line-chart__annotation-label-popover--safari",
	"line-chart__annotation-label-popover--visible": "a8ccharts-inuQka-line-chart__annotation-label-popover--visible",
	"line-chart__annotation-label-popover-close-button": "a8ccharts-inuQka-line-chart__annotation-label-popover-close-button",
	"line-chart__annotation-label-popover-content": "a8ccharts-inuQka-line-chart__annotation-label-popover-content",
	"line-chart__annotation-label-trigger-button": "a8ccharts-inuQka-line-chart__annotation-label-trigger-button",
	"line-chart__annotations-overlay": "a8ccharts-inuQka-line-chart__annotations-overlay",
	"line-chart__tooltip": "a8ccharts-inuQka-line-chart__tooltip",
	"line-chart__tooltip-date": "a8ccharts-inuQka-line-chart__tooltip-date",
	"line-chart__tooltip-label": "a8ccharts-inuQka-line-chart__tooltip-label",
	"line-chart__tooltip-row": "a8ccharts-inuQka-line-chart__tooltip-row",
	"line-chart--animated": "a8ccharts-inuQka-line-chart--animated",
	"rise": "a8ccharts-inuQka-rise"
};
const CloseIcon = () => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
	width: "16",
	height: "16",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "2",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	"aria-hidden": "true",
	focusable: "false",
	children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M6 6l12 12M18 6L6 18" })
});
const LineChartAnnotationLabelWithPopover = ({ title, subtitle, renderLabel, renderLabelPopover }) => {
	const popoverId = (0, react$1.useId)();
	const buttonRef = (0, react$1.useRef)(null);
	const popoverRef = (0, react$1.useRef)(null);
	const [isPositioned, setIsPositioned] = (0, react$1.useState)(false);
	const isBrowserSafari = isSafari();
	(0, react$1.useEffect)(() => {
		const button = buttonRef.current;
		const popover = popoverRef.current;
		if (!button || !popover) return;
		const positionPopover = () => {
			if (!isBrowserSafari) {
				const buttonRect = button.getBoundingClientRect();
				popover.style.left = `${buttonRect.right}px`;
				popover.style.top = `${buttonRect.top}px`;
			}
			setIsPositioned(true);
		};
		popover.addEventListener("toggle", (e) => {
			if (e.newState === "open") positionPopover();
		});
		try {
			if (popover.matches(":popover-open")) positionPopover();
		} catch {}
	}, [isBrowserSafari]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: line_chart_module_default["line-chart__annotation-label"],
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
			ref: buttonRef,
			popovertarget: popoverId,
			className: line_chart_module_default["line-chart__annotation-label-trigger-button"],
			style: {
				width: `44px`,
				height: `44px`,
				transform: `translate(${44 / 2}px, 0)`
			},
			"aria-label": title || (0, _wordpress_i18n.__)("View details", "jetpack-charts"),
			children: renderLabel({
				title,
				subtitle
			})
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			ref: popoverRef,
			id: popoverId,
			popover: "auto",
			className: (0, clsx.default)(line_chart_module_default["line-chart__annotation-label-popover"], isPositioned && line_chart_module_default["line-chart__annotation-label-popover--visible"], isBrowserSafari && line_chart_module_default["line-chart__annotation-label-popover--safari"]),
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(Stack, {
				direction: "row",
				align: "flex-start",
				justify: "space-between",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: line_chart_module_default["line-chart__annotation-label-popover-content"],
					children: renderLabelPopover({
						title,
						subtitle
					})
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
					popovertarget: popoverId,
					popovertargetaction: "hide",
					className: line_chart_module_default["line-chart__annotation-label-popover-close-button"],
					"aria-label": (0, _wordpress_i18n.__)("Close", "jetpack-charts"),
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CloseIcon, {})
				})]
			})
		})]
	});
};
//#endregion
//#region src/charts/line-chart/private/line-chart-annotations-overlay.tsx
const LineChartAnnotationsOverlay = ({ children }) => {
	const { chartRef, chartWidth, chartHeight } = useSingleChartContext();
	const [scales, setScales] = (0, react$1.useState)(null);
	const [scalesStable, setScalesStable] = (0, react$1.useState)(false);
	const createScaleSignature = (0, react$1.useCallback)((scaleData) => {
		const xDomain = scaleData.xScale.domain();
		const yDomain = scaleData.yScale.domain();
		const xRange = scaleData.xScale.range();
		const yRange = scaleData.yScale.range();
		return `${xDomain.join(",")}-${yDomain.join(",")}-${xRange.join(",")}-${yRange.join(",")}`;
	}, []);
	const getScalesData = (0, react$1.useCallback)(() => {
		if (chartRef?.current) {
			const scaleData = chartRef.current.getScales();
			if (scaleData) {
				const scaleInfo = {
					xScale: scaleData.xScale,
					yScale: scaleData.yScale
				};
				return {
					scales: scaleInfo,
					signature: createScaleSignature(scaleInfo)
				};
			}
		}
		return null;
	}, [chartRef, createScaleSignature]);
	(0, react$1.useEffect)(() => {
		let timeoutId = null;
		let lastSignature = null;
		let retryCount = 0;
		const maxRetries = 20;
		const checkInterval = 50;
		setScalesStable(false);
		const monitorScales = () => {
			const currentScaleData = getScalesData();
			if (currentScaleData) {
				if (lastSignature && currentScaleData.signature === lastSignature) {
					setScalesStable(true);
					return;
				}
				setScales(currentScaleData.scales);
				lastSignature = currentScaleData.signature;
			}
			if (retryCount < maxRetries) {
				retryCount++;
				timeoutId = setTimeout(monitorScales, checkInterval);
			}
		};
		monitorScales();
		return () => {
			if (timeoutId) clearTimeout(timeoutId);
		};
	}, [
		getScalesData,
		chartWidth,
		chartHeight
	]);
	if (!chartRef || !children || !chartWidth || !chartHeight) return null;
	if (!scales || !scalesStable) return null;
	const dataContextValue = {
		xScale: scales.xScale,
		yScale: scales.yScale,
		margin: {
			top: 0,
			right: 0,
			bottom: 0,
			left: 0
		},
		width: chartWidth,
		height: chartHeight
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_visx_xychart.DataContext.Provider, {
		value: dataContextValue,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
			width: chartWidth,
			height: chartHeight,
			className: line_chart_module_default["line-chart__annotations-overlay"],
			children
		})
	});
};
//#endregion
//#region src/charts/line-chart/private/line-chart-annotation.tsx
const ANNOTATION_MAX_WIDTH = 125;
const ANNOTATION_INIT_HEIGHT = 100;
const getLabelPosition = ({ subjectType, x, xMax, y, yMin, yMax, maxWidth, height }) => {
	const annotationMaxWidth = maxWidth ?? ANNOTATION_MAX_WIDTH;
	const annotationHeight = height ?? ANNOTATION_INIT_HEIGHT;
	let dx = 15;
	let dy = 15;
	let isFlippedHorizontally = false;
	let isFlippedVertically = false;
	if (subjectType === "line-horizontal") {
		dx = 0;
		dy = 20;
	}
	if (subjectType === "line-vertical") {
		dx = 20;
		dy = 0;
	}
	if (x + dx + annotationMaxWidth > xMax) {
		isFlippedHorizontally = true;
		if (subjectType === "circle") dx = -dx;
		else if (subjectType === "line-vertical") dx = -20;
	}
	if (subjectType === "circle") {
		if (y + dy + annotationHeight > yMin) {
			isFlippedVertically = true;
			dy = -Math.abs(dy);
		}
	} else if (y - annotationHeight < yMax) {
		if (subjectType === "line-horizontal") {
			isFlippedVertically = true;
			dy = Math.abs(dy);
		} else if (subjectType === "line-vertical") isFlippedVertically = true;
	} else if (y + annotationHeight > yMin) {
		if (subjectType === "line-horizontal") {
			isFlippedVertically = true;
			dy = -Math.abs(dy);
		} else if (subjectType === "line-vertical") isFlippedVertically = true;
	}
	return {
		dx,
		dy,
		isFlippedHorizontally,
		isFlippedVertically
	};
};
const getHorizontalAnchor = (subjectType, isFlippedHorizontally) => {
	if (subjectType === "line-horizontal") return isFlippedHorizontally ? "end" : "start";
};
const getVerticalAnchor = (subjectType, isFlippedVertically, y, yMax, height) => {
	if (subjectType === "line-vertical") {
		if (isFlippedVertically) return y - height < yMax ? "start" : "end";
		return "start";
	}
};
const LineChartAnnotation = ({ datum, title, subtitle, subjectType = "circle", styles: datumStyles, testId, renderLabel, renderLabelPopover }) => {
	const providerTheme = useGlobalChartsTheme();
	const { xScale, yScale } = (0, react$1.useContext)(_visx_xychart.DataContext) || {};
	const labelRef = (0, react$1.useRef)(null);
	const [height, setHeight] = (0, react$1.useState)(null);
	const styles = (0, deepmerge.default)(providerTheme.annotationStyles ?? {}, datumStyles ?? {});
	const resolveColor = (value) => value ? resolveCssVariable(value) ?? value : value;
	(0, react$1.useEffect)(() => {
		if (labelRef.current?.getBBox) {
			const bbox = labelRef.current.getBBox();
			setHeight(bbox.height);
		}
	}, []);
	const positionData = (0, react$1.useMemo)(() => {
		if (!datum || !datum.date || datum.value == null || !xScale || !yScale) return null;
		const x = xScale(datum.date);
		const y = yScale(datum.value);
		if (typeof x !== "number" || typeof y !== "number") return null;
		const [yMin, yMax] = yScale.range().map(Number);
		const [xMin, xMax] = xScale.range().map(Number);
		if (renderLabel) return {
			x,
			dx: 0,
			y,
			dy: 0,
			yMin,
			yMax,
			xMin,
			xMax,
			isFlippedHorizontally: false,
			isFlippedVertically: false
		};
		return {
			x,
			y,
			yMin,
			yMax,
			xMin,
			xMax,
			...getLabelPosition({
				subjectType,
				x,
				xMax,
				y,
				yMin,
				yMax,
				maxWidth: styles?.label?.maxWidth,
				height
			})
		};
	}, [
		datum,
		xScale,
		yScale,
		subjectType,
		styles?.label?.maxWidth,
		height,
		renderLabel
	]);
	if (!positionData) return null;
	const { x, y, yMin, yMax, xMin, xMax, dx, dy, isFlippedHorizontally, isFlippedVertically } = positionData;
	const getLabelY = () => {
		const labelY = styles?.label?.y;
		if (labelY === "start") return yMax;
		if (labelY === "end") return yMin;
		return labelY;
	};
	const getLabelX = () => {
		const labelX = styles?.label?.x;
		if (labelX === "start") return xMin;
		if (labelX === "end") return xMax;
		return labelX;
	};
	const labelPosition = {
		x: getLabelX(),
		y: getLabelY()
	};
	const getSafariHTMLLabelPosition = () => {
		const labelWidth = 44;
		const labelHeight = 44;
		return isSafari() ? {
			transform: `translate(${x + (dx || 0) + (typeof labelPosition.x === "number" ? labelPosition.x - x : 0) - labelWidth}px, ${y + (dy || 0) + (typeof labelPosition.y === "number" ? labelPosition.y - y : 0) - labelHeight}px)`,
			width: labelWidth,
			height: labelHeight
		} : void 0;
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("g", { children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_visx_annotation.Annotation, {
		x,
		y,
		dx,
		dy,
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_visx_annotation.Connector, {
				...styles?.connector,
				stroke: resolveColor(styles?.connector?.stroke)
			}),
			subjectType === "circle" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_visx_annotation.CircleSubject, {
				...styles?.circleSubject,
				fill: resolveColor(styles?.circleSubject?.fill),
				stroke: resolveColor(styles?.circleSubject?.stroke)
			}),
			subjectType === "line-vertical" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_visx_annotation.LineSubject, {
				min: yMax,
				max: yMin,
				...styles?.lineSubject,
				orientation: "vertical"
			}),
			subjectType === "line-horizontal" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_visx_annotation.LineSubject, {
				min: xMin,
				max: xMax,
				...styles?.lineSubject,
				orientation: "horizontal"
			}),
			renderLabel ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_visx_annotation.HtmlLabel, {
				...styles?.label,
				...labelPosition,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					style: getSafariHTMLLabelPosition(),
					children: renderLabelPopover ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(LineChartAnnotationLabelWithPopover, {
						title,
						subtitle,
						renderLabel,
						renderLabelPopover
					}) : renderLabel({
						title,
						subtitle
					})
				})
			}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("g", {
				ref: labelRef,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_visx_annotation.Label, {
					title,
					subtitle,
					...styles?.label,
					anchorLineStroke: resolveColor(styles?.label?.anchorLineStroke),
					backgroundFill: resolveColor(styles?.label?.backgroundFill),
					...labelPosition,
					horizontalAnchor: getHorizontalAnchor(subjectType, isFlippedHorizontally),
					verticalAnchor: getVerticalAnchor(subjectType, isFlippedVertically, y, yMax, height ?? ANNOTATION_INIT_HEIGHT)
				})
			})
		]
	}) });
};
//#endregion
//#region src/charts/line-chart/private/line-chart-glyph.tsx
const toNumber$1 = (val) => {
	const num = typeof val === "number" ? val : parseFloat(val);
	return isNaN(num) ? void 0 : num;
};
const LineChartGlyph = ({ data, index, color, glyphStyle, renderGlyph, accessors, position }) => {
	const { xScale, yScale } = (0, react$1.useContext)(_visx_xychart.DataContext) || {};
	if (!xScale || !yScale) return null;
	if (data.data.length === 0) return null;
	const point = position === "start" ? data.data[0] : data.data[data.data.length - 1];
	const x = xScale(accessors.xAccessor(point));
	const y = yScale(accessors.yAccessor(point));
	if (typeof x !== "number" || typeof y !== "number") return null;
	const size = Math.max(0, toNumber$1(glyphStyle?.radius) ?? 4);
	return renderGlyph({
		key: `${position}-glyph-${data.label}`,
		index,
		datum: point,
		color,
		size,
		x,
		y,
		glyphStyle,
		position
	});
};
//#endregion
//#region src/charts/line-chart/line-chart.tsx
const defaultRenderGlyph = (props) => {
	return /* @__PURE__ */ (0, react$1.createElement)(DefaultGlyph, {
		...props,
		key: props.key
	});
};
const toNumber = (val) => {
	const num = typeof val === "number" ? val : parseFloat(val);
	return isNaN(num) ? void 0 : num;
};
/**
* Default visx-tooltip render that prints the hovered date as a heading and
* one row per visible series (label + formatted value), sorted descending by
* value. Reused by AreaChart, which has the same multi-series shape.
*
* @param params - visx `RenderTooltipParams< DataPointDate >`.
* @return Tooltip JSX, or `null` when no datum is hovered.
*/
const renderDefaultTooltip = (params) => {
	const { tooltipData } = params;
	const nearestDatum = tooltipData?.nearestDatum?.datum;
	if (!nearestDatum) return null;
	const tooltipPoints = Object.entries(tooltipData?.datumByKey || {}).map(([key, { datum }]) => ({
		key,
		value: datum.value
	})).sort((a, b) => b.value - a.value);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: line_chart_module_default["line-chart__tooltip"],
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: line_chart_module_default["line-chart__tooltip-date"],
			children: nearestDatum.date?.toLocaleDateString()
		}), tooltipPoints.map((point) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(Stack, {
			direction: "row",
			align: "center",
			justify: "space-between",
			className: line_chart_module_default["line-chart__tooltip-row"],
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
				className: line_chart_module_default["line-chart__tooltip-label"],
				children: [point.key, ":"]
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: line_chart_module_default["line-chart__tooltip-value"],
				children: (0, _automattic_number_formatters.formatNumber)(point.value)
			})]
		}, point.key))]
	});
};
const validateData$4 = (data) => {
	if (!data?.length) return "No data available";
	if (data.some((series) => series.data.some((point) => isNaN(point.value) || point.value === null || point.value === void 0 || "date" in point && point.date && isNaN(point.date.getTime())))) return "Invalid data";
	return null;
};
const LineChartScalesRef = ({ chartRef, width, height, margin }) => {
	const context = (0, react$1.useContext)(_visx_xychart.DataContext);
	(0, react$1.useImperativeHandle)(chartRef, () => ({
		getScales: () => {
			if (!context?.xScale || !context?.yScale) return null;
			return {
				xScale: context.xScale,
				yScale: context.yScale
			};
		},
		getChartDimensions: () => ({
			width,
			height,
			margin: margin || {}
		})
	}), [
		context,
		width,
		height,
		margin
	]);
	return null;
};
const LineChartInternal = (0, react$1.forwardRef)(({ data, chartId: providedChartId, width, height, className, margin, withTooltips = true, withTooltipCrosshairs, showLegend = false, legend = {}, renderGlyph = defaultRenderGlyph, glyphStyle = {}, withLegendGlyph = false, withGradientFill = false, smoothing = true, curveType, renderTooltip = renderDefaultTooltip, withStartGlyphs = false, withEndGlyphs = false, animation, options = {}, onPointerDown = void 0, onPointerUp = void 0, onPointerMove = void 0, onPointerOut = void 0, zoomable = false, children, gridVisibility, gap = "md" }, ref) => {
	const legendInteractive = legend.interactive ?? false;
	const legendShape = legend.shape ?? "line";
	const legendPosition = legend.position ?? "bottom";
	const providerTheme = useGlobalChartsTheme();
	const resolvedBackgroundColor = resolveCssVariable(providerTheme.backgroundColor) ?? providerTheme.backgroundColor;
	const theme = useXYChartTheme(data);
	const chartId = useChartId(providedChartId);
	const chartRef = (0, react$1.useRef)(null);
	const [selectedIndex, setSelectedIndex] = (0, react$1.useState)(void 0);
	const [isNavigating, setIsNavigating] = (0, react$1.useState)(false);
	const internalChartRef = (0, react$1.useRef)(null);
	const zoom = useXZoom({
		enabled: zoomable,
		chartRef: internalChartRef,
		userHandlers: {
			onPointerDown,
			onPointerMove,
			onPointerUp
		}
	});
	const { legendChildren, nonLegendChildren } = useChartChildren(children, "LineChart");
	const [measuredChartHeight, setMeasuredChartHeight] = (0, react$1.useState)();
	const handleContentHeightChange = (0, react$1.useCallback)((contentHeight) => {
		setMeasuredChartHeight(contentHeight > 0 ? contentHeight : height);
	}, [height]);
	(0, react$1.useImperativeHandle)(ref, () => ({
		getScales: () => internalChartRef.current?.getScales() || null,
		getChartDimensions: () => internalChartRef.current?.getChartDimensions() || {
			width: 0,
			height: 0,
			margin: {}
		}
	}), [internalChartRef]);
	const dataSorted = useChartDataTransform(data);
	const { getElementStyles, isSeriesVisible } = useGlobalChartsContext();
	const seriesWithVisibility = (0, react$1.useMemo)(() => {
		if (!chartId || !legendInteractive) return dataSorted.map((series, index) => ({
			series,
			index,
			isVisible: true
		}));
		return dataSorted.map((series, index) => ({
			series,
			index,
			isVisible: isSeriesVisible(chartId, series.label)
		}));
	}, [
		dataSorted,
		chartId,
		isSeriesVisible,
		legendInteractive
	]);
	const allSeriesHidden = (0, react$1.useMemo)(() => {
		return seriesWithVisibility.every(({ isVisible }) => !isVisible);
	}, [seriesWithVisibility]);
	const { tooltipRef, onChartFocus, onChartBlur, onChartKeyDown } = useKeyboardNavigation({
		selectedIndex,
		setSelectedIndex,
		isNavigating,
		setIsNavigating,
		chartRef,
		totalPoints: dataSorted[0]?.data.length || 0
	});
	const chartOptions = (0, react$1.useMemo)(() => {
		const formatter = options?.axis?.x?.tickFormat || getFormatter(dataSorted);
		return {
			axis: {
				x: {
					orientation: "bottom",
					numTicks: guessOptimalNumTicks(dataSorted, width, formatter),
					tickFormat: formatter,
					display: true,
					...options?.axis?.x
				},
				y: {
					orientation: "left",
					numTicks: 4,
					tickFormat: _automattic_number_formatters.formatNumberCompact,
					display: true,
					...options?.axis?.y
				}
			},
			xScale: {
				type: "time",
				...options?.xScale,
				...zoom.domain ? { domain: zoom.domain } : {}
			},
			yScale: {
				type: "linear",
				nice: true,
				zero: false,
				...options?.yScale
			}
		};
	}, [
		options,
		dataSorted,
		width,
		zoom.domain
	]);
	const tooltipRenderGlyph = (0, react$1.useMemo)(() => {
		return (props) => {
			const seriesIndex = dataSorted.findIndex((series) => series.label === props.key || series.data.includes(props.datum));
			const seriesData = dataSorted[seriesIndex];
			const { color, glyph: themeGlyph } = getElementStyles({
				data: seriesData,
				index: seriesIndex
			});
			const propsWithResolvedColor = {
				...props,
				color
			};
			return themeGlyph ? themeGlyph(propsWithResolvedColor) : renderGlyph(propsWithResolvedColor);
		};
	}, [
		dataSorted,
		renderGlyph,
		getElementStyles
	]);
	const defaultMargin = useChartMargin(height, chartOptions, dataSorted, theme);
	const error = validateData$4(dataSorted);
	const isDataValid = !error;
	useChartRegistration({
		chartId,
		legendItems: useChartLegendItems(dataSorted, (0, react$1.useMemo)(() => ({
			withGlyph: withLegendGlyph,
			glyphSize: Math.max(0, toNumber(glyphStyle?.radius) ?? 4),
			renderGlyph
		}), [
			withLegendGlyph,
			glyphStyle?.radius,
			renderGlyph
		]), legendShape),
		chartType: "line",
		isDataValid,
		metadata: (0, react$1.useMemo)(() => ({
			withGradientFill,
			smoothing,
			curveType,
			withStartGlyphs,
			withEndGlyphs,
			withLegendGlyph
		}), [
			withGradientFill,
			smoothing,
			curveType,
			withStartGlyphs,
			withEndGlyphs,
			withLegendGlyph
		])
	});
	const prefersReducedMotion = usePrefersReducedMotion();
	const accessors = {
		xAccessor: (d) => d?.date,
		yAccessor: (d) => d?.value
	};
	if (error) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: (0, clsx.default)("line-chart", line_chart_module_default["line-chart"]),
		children: error
	});
	const legendElement = showLegend && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Legend, {
		orientation: legend.orientation ?? "horizontal",
		alignment: legend.alignment ?? "center",
		position: legendPosition,
		labelStyles: legend.labelStyles,
		itemClassName: legend.itemClassName,
		itemStyles: legend.itemStyles,
		shapeStyles: legend.shapeStyles,
		className: line_chart_module_default["line-chart__legend"],
		shape: legendShape,
		chartId,
		interactive: legendInteractive
	});
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SingleChartContext.Provider, {
		value: {
			chartId,
			chartRef: internalChartRef,
			chartWidth: width,
			chartHeight: measuredChartHeight || 0
		},
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChartLayout, {
			legendPosition,
			legendElement,
			legendChildren,
			gap,
			className: (0, clsx.default)("line-chart", line_chart_module_default["line-chart"], { [line_chart_module_default["line-chart--animated"]]: animation && !prefersReducedMotion }, className),
			style: {
				width,
				height
			},
			trailingContent: nonLegendChildren,
			onContentHeightChange: handleContentHeightChange,
			children: ({ contentHeight }) => {
				const chartHeight = contentHeight > 0 ? contentHeight : height;
				return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					role: "grid",
					"aria-label": (0, _wordpress_i18n.__)("Line chart", "jetpack-charts"),
					tabIndex: 0,
					onKeyDown: onChartKeyDown,
					onFocus: onChartFocus,
					onBlur: onChartBlur,
					children: chartHeight > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						ref: chartRef,
						style: { position: "relative" },
						children: [zoomable && zoom.domain && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ZoomResetButton, { onClick: zoom.reset }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_visx_xychart.XYChart, {
							theme,
							width,
							height: chartHeight,
							margin: {
								...defaultMargin,
								...margin
							},
							xScale: chartOptions.xScale,
							yScale: chartOptions.yScale,
							onPointerDown: zoom.handlers.onPointerDown,
							onPointerUp: zoom.handlers.onPointerUp,
							onPointerMove: zoom.handlers.onPointerMove,
							onPointerOut,
							pointerEventsDataKey: "nearest",
							children: [
								gridVisibility !== "none" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_visx_xychart.Grid, {
									columns: false,
									numTicks: 4
								}),
								chartOptions.axis.x.display && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_visx_xychart.Axis, { ...chartOptions.axis.x }),
								chartOptions.axis.y.display && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_visx_xychart.Axis, { ...chartOptions.axis.y }),
								allSeriesHidden ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SvgEmptyState, {
									x: width / 2,
									y: chartHeight / 2,
									width,
									height: chartHeight,
									children: (0, _wordpress_i18n.__)("All series are hidden. Click legend items to show data.", "jetpack-charts")
								}) : null,
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(ZoomClip, {
									active: zoomable && !!zoom.domain,
									chartId,
									children: seriesWithVisibility.map(({ series: seriesData, index, isVisible }) => {
										if (!isVisible) return null;
										const { color, lineStyles, glyph } = getElementStyles({
											data: seriesData,
											index
										});
										const lineProps = {
											stroke: color,
											...lineStyles
										};
										return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("g", { children: [
											withGradientFill && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_visx_gradient.LinearGradient, {
												id: `area-gradient-${chartId}-${index + 1}`,
												from: color,
												fromOpacity: .4,
												toOpacity: .1,
												to: resolvedBackgroundColor,
												...seriesData.options?.gradient,
												children: seriesData.options?.gradient?.stops?.map((stop, stopIndex) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("stop", {
													offset: stop.offset,
													stopColor: stop.color || color,
													stopOpacity: stop.opacity ?? 1
												}, `${stop.offset}-${stop.color || color}`))
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_visx_xychart.AreaSeries, {
												dataKey: seriesData?.label,
												data: seriesData.data,
												...accessors,
												fill: withGradientFill ? `url(#area-gradient-${chartId}-${index + 1})` : "transparent",
												renderLine: true,
												curve: getCurveType(curveType, smoothing),
												lineProps
											}, seriesData?.label),
											withStartGlyphs && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(LineChartGlyph, {
												index,
												data: seriesData,
												color,
												renderGlyph: glyph ?? renderGlyph,
												accessors,
												glyphStyle,
												position: "start"
											}),
											withEndGlyphs && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(LineChartGlyph, {
												index,
												data: seriesData,
												color,
												renderGlyph: glyph ?? renderGlyph,
												accessors,
												glyphStyle,
												position: "end"
											})
										] }, seriesData?.label || index);
									})
								}),
								withTooltips && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(AccessibleTooltip, {
									detectBounds: true,
									snapTooltipToDatumX: true,
									snapTooltipToDatumY: true,
									showSeriesGlyphs: true,
									renderTooltip,
									renderGlyph: tooltipRenderGlyph,
									glyphStyle,
									showVerticalCrosshair: withTooltipCrosshairs?.showVertical,
									showHorizontalCrosshair: withTooltipCrosshairs?.showHorizontal,
									selectedIndex,
									tooltipRef,
									keyboardFocusedClassName: line_chart_module_default["line-chart__tooltip--keyboard-focused"],
									series: dataSorted
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(LineChartScalesRef, {
									chartRef: internalChartRef,
									width,
									height,
									margin
								}),
								zoomable && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ZoomSelectionRect, { drag: zoom.drag })
							]
						})]
					})
				});
			}
		})
	});
});
const LineChartWithProvider = (0, react$1.forwardRef)((props, ref) => {
	if ((0, react$1.useContext)(GlobalChartsContext)) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(LineChartInternal, {
		...props,
		ref
	});
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(GlobalChartsProvider, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(LineChartInternal, {
		...props,
		ref
	}) });
});
LineChartWithProvider.displayName = "LineChart";
const LineChart = attachSubComponents(LineChartWithProvider, {
	Legend,
	AnnotationsOverlay: LineChartAnnotationsOverlay,
	Annotation: LineChartAnnotation
});
const LineChartResponsive = attachSubComponents(withResponsive(LineChartWithProvider), {
	Legend,
	AnnotationsOverlay: LineChartAnnotationsOverlay,
	Annotation: LineChartAnnotation
});
//#endregion
//#region src/charts/area-chart/area-chart.module.scss
var area_chart_module_default = {
	"area-chart": "a8ccharts-jlynaq-area-chart",
	"area-chart--animated": "a8ccharts-jlynaq-area-chart--animated",
	"rise": "a8ccharts-jlynaq-rise"
};
//#endregion
//#region src/charts/area-chart/private/validate-data.ts
/**
* Up-front data validation. Returns a localised error message when the chart
* cannot safely render, otherwise `null`. Catches the cases that would
* NaN-cascade through the tick formatter and stack layout: empty top-level
* array, empty per-series data, null/NaN values, invalid dates.
*
* @param data - Series data passed to AreaChart.
* @return Error message, or `null` if the data is renderable.
*/
const validateData$3 = (data) => {
	if (!data?.length) return (0, _wordpress_i18n.__)("No data available", "jetpack-charts");
	if (data.some((series) => !series.data?.length)) return (0, _wordpress_i18n.__)("No data available", "jetpack-charts");
	if (data.some((series) => series.data.some((point) => isNaN(point.value) || point.value === null || point.value === void 0 || "date" in point && point.date && isNaN(point.date.getTime())))) return (0, _wordpress_i18n.__)("Invalid data", "jetpack-charts");
	return null;
};
//#endregion
//#region src/charts/area-chart/private/overlays.tsx
const AreaChartScalesRef = ({ chartRef, width, height, margin }) => {
	const context = (0, react$1.useContext)(_visx_xychart.DataContext);
	(0, react$1.useImperativeHandle)(chartRef, () => ({
		getScales: () => {
			if (!context?.xScale || !context?.yScale) return null;
			return {
				xScale: context.xScale,
				yScale: context.yScale
			};
		},
		getChartDimensions: () => ({
			width,
			height,
			margin: margin || {}
		})
	}), [
		context,
		width,
		height,
		margin
	]);
	return null;
};
const HoverGlyphs = ({ visibleSeries, stacked, stackOffset, getElementStyles, strokeColor }) => {
	const dataContext = (0, react$1.useContext)(_visx_xychart.DataContext);
	const tooltipContext = (0, react$1.useContext)(_visx_xychart.TooltipContext);
	const xScale = dataContext?.xScale;
	const yScale = dataContext?.yScale;
	const tooltipOpen = tooltipContext?.tooltipOpen;
	const nearestDatum = tooltipContext?.tooltipData?.nearestDatum?.datum;
	if (!tooltipOpen || !xScale || !yScale || !nearestDatum || !nearestDatum.date || stacked && stackOffset !== "none") return null;
	const xPx = Number(xScale(nearestDatum.date));
	if (!Number.isFinite(xPx)) return null;
	const hoveredTime = nearestDatum.date.getTime();
	let cumulative = 0;
	const circles = [];
	for (const { series, index } of visibleSeries) {
		const datum = series.data.find((d) => d.date?.getTime() === hoveredTime);
		const value = datum?.value ?? 0;
		if (stacked) cumulative += value;
		if (!datum || datum.value == null) continue;
		const yPx = Number(yScale(stacked ? cumulative : value));
		if (!Number.isFinite(yPx)) continue;
		const { color } = getElementStyles({
			data: series,
			index
		});
		circles.push(/* @__PURE__ */ (0, react_jsx_runtime.jsx)("circle", {
			cx: xPx,
			cy: yPx,
			r: 4,
			fill: color,
			stroke: strokeColor,
			strokeWidth: 1.5,
			paintOrder: "fill"
		}, series.label || index));
	}
	if (circles.length === 0) return null;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("g", {
		pointerEvents: "none",
		className: "area-chart__hover-glyphs",
		children: circles
	});
};
//#endregion
//#region src/charts/area-chart/area-chart.tsx
const AreaChartInternal = (0, react$1.forwardRef)(({ data, chartId: providedChartId, width, height, className, margin, withTooltips = true, withTooltipCrosshairs, showLegend = false, legend = {}, stacked = true, stackOffset = "none", smoothing = true, curveType, fillOpacity, withStroke, renderTooltip = renderDefaultTooltip, animation, options = {}, onPointerDown, onPointerUp, onPointerMove, onPointerOut, zoomable = false, rescaleYOnLegendToggle = true, children, gridVisibility, gap = "md" }, ref) => {
	const legendInteractive = legend.interactive ?? false;
	const legendShape = legend.shape ?? "rect";
	const legendPosition = legend.position ?? "bottom";
	const providerTheme = useGlobalChartsTheme();
	const theme = useXYChartTheme(data);
	const chartId = useChartId(providedChartId);
	const chartRef = (0, react$1.useRef)(null);
	const [selectedIndex, setSelectedIndex] = (0, react$1.useState)(void 0);
	const [isNavigating, setIsNavigating] = (0, react$1.useState)(false);
	const internalChartRef = (0, react$1.useRef)(null);
	const zoom = useXZoom({
		enabled: zoomable,
		chartRef: internalChartRef,
		userHandlers: {
			onPointerDown,
			onPointerMove,
			onPointerUp
		}
	});
	const { legendChildren, nonLegendChildren } = useChartChildren(children, "AreaChart");
	const [measuredChartHeight, setMeasuredChartHeight] = (0, react$1.useState)();
	const handleContentHeightChange = (0, react$1.useCallback)((contentHeight) => {
		setMeasuredChartHeight(contentHeight > 0 ? contentHeight : height);
	}, [height]);
	(0, react$1.useImperativeHandle)(ref, () => ({
		getScales: () => internalChartRef.current?.getScales() || null,
		getChartDimensions: () => internalChartRef.current?.getChartDimensions() || {
			width: 0,
			height: 0,
			margin: {}
		}
	}), [internalChartRef]);
	const dataSorted = useChartDataTransform(data);
	const { getElementStyles, isSeriesVisible } = useGlobalChartsContext();
	const seriesWithVisibility = (0, react$1.useMemo)(() => {
		if (!chartId || !legendInteractive) return dataSorted.map((series, index) => ({
			series,
			index,
			isVisible: true
		}));
		return dataSorted.map((series, index) => ({
			series,
			index,
			isVisible: isSeriesVisible(chartId, series.label)
		}));
	}, [
		dataSorted,
		chartId,
		isSeriesVisible,
		legendInteractive
	]);
	const allSeriesHidden = (0, react$1.useMemo)(() => seriesWithVisibility.every(({ isVisible }) => !isVisible), [seriesWithVisibility]);
	const { tooltipRef, onChartFocus, onChartBlur, onChartKeyDown } = useKeyboardNavigation({
		selectedIndex,
		setSelectedIndex,
		isNavigating,
		setIsNavigating,
		chartRef,
		totalPoints: dataSorted[0]?.data.length || 0
	});
	const fixedYDomain = (0, react$1.useMemo)(() => {
		if (rescaleYOnLegendToggle || !legendInteractive || !dataSorted.length || !dataSorted[0].data.length || stacked && stackOffset !== "none") return;
		if (stacked) {
			const numPoints = Math.max(...dataSorted.map((s) => s.data.length));
			let posMax = 0;
			let negMin = 0;
			for (let i = 0; i < numPoints; i++) {
				let posSum = 0;
				let negSum = 0;
				for (const series of dataSorted) {
					const v = Number(series.data[i]?.value);
					if (Number.isNaN(v)) continue;
					if (v >= 0) posSum += v;
					else negSum += v;
				}
				if (posSum > posMax) posMax = posSum;
				if (negSum < negMin) negMin = negSum;
			}
			return [negMin, posMax];
		}
		let max = -Infinity;
		let min = Infinity;
		for (const series of dataSorted) for (const point of series.data) {
			const v = Number(point?.value);
			if (!Number.isNaN(v)) {
				if (v > max) max = v;
				if (v < min) min = v;
			}
		}
		if (max === -Infinity) return void 0;
		return [Math.min(0, min), max];
	}, [
		dataSorted,
		stacked,
		stackOffset,
		legendInteractive,
		rescaleYOnLegendToggle
	]);
	const chartOptions = (0, react$1.useMemo)(() => {
		const formatter = options?.axis?.x?.tickFormat || getFormatter(dataSorted);
		return {
			axis: {
				x: {
					orientation: "bottom",
					numTicks: guessOptimalNumTicks(dataSorted, width, formatter),
					tickFormat: formatter,
					display: true,
					...options?.axis?.x
				},
				y: {
					orientation: "left",
					numTicks: 4,
					tickFormat: _automattic_number_formatters.formatNumberCompact,
					display: true,
					...options?.axis?.y
				}
			},
			xScale: {
				type: "time",
				...options?.xScale,
				...zoom.domain ? { domain: zoom.domain } : {}
			},
			yScale: {
				type: "linear",
				nice: true,
				zero: stacked,
				...fixedYDomain ? { domain: fixedYDomain } : {},
				...options?.yScale
			}
		};
	}, [
		options,
		dataSorted,
		width,
		stacked,
		fixedYDomain,
		zoom.domain
	]);
	const defaultMargin = useChartMargin(height, chartOptions, dataSorted, theme);
	const error = validateData$3(dataSorted);
	const isDataValid = !error;
	useChartRegistration({
		chartId,
		legendItems: useChartLegendItems(dataSorted, (0, react$1.useMemo)(() => ({
			withGlyph: false,
			glyphSize: 0
		}), []), legendShape),
		chartType: "area",
		isDataValid,
		metadata: (0, react$1.useMemo)(() => ({
			stacked,
			stackOffset,
			smoothing,
			curveType
		}), [
			stacked,
			stackOffset,
			smoothing,
			curveType
		])
	});
	const prefersReducedMotion = usePrefersReducedMotion();
	const animationEnabled = !!animation && !prefersReducedMotion;
	const accessors = {
		xAccessor: (d) => d?.date,
		yAccessor: (d) => d?.value
	};
	const zeroYAccessor = (0, react$1.useCallback)(() => 0, []);
	const visibleLabels = (0, react$1.useMemo)(() => new Set(seriesWithVisibility.filter((s) => s.isVisible).map((s) => s.series.label)), [seriesWithVisibility]);
	const filteredRenderTooltip = (0, react$1.useCallback)((params) => {
		if (!legendInteractive) return renderTooltip(params);
		const datumByKey = params?.tooltipData?.datumByKey;
		if (!datumByKey) return renderTooltip(params);
		const filtered = Object.fromEntries(Object.entries(datumByKey).filter(([key]) => visibleLabels.has(key)));
		if (Object.keys(filtered).length === 0) return null;
		const nearestDatum = params?.tooltipData?.nearestDatum;
		const nextNearest = nearestDatum && visibleLabels.has(nearestDatum.key) ? nearestDatum : {
			...Object.values(filtered)[0],
			distance: nearestDatum?.distance ?? 0
		};
		return renderTooltip({
			...params,
			tooltipData: {
				...params.tooltipData,
				datumByKey: filtered,
				nearestDatum: nextNearest
			}
		});
	}, [
		renderTooltip,
		legendInteractive,
		visibleLabels
	]);
	const resolvedFillOpacity = fillOpacity ?? (stacked ? .85 : .4);
	const resolvedWithStroke = withStroke ?? !stacked;
	if (error) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: (0, clsx.default)("area-chart", area_chart_module_default["area-chart"]),
		children: error
	});
	const legendElement = showLegend && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Legend, {
		orientation: legend.orientation ?? "horizontal",
		alignment: legend.alignment ?? "center",
		position: legendPosition,
		labelStyles: legend.labelStyles,
		itemClassName: legend.itemClassName,
		itemStyles: legend.itemStyles,
		shapeStyles: legend.shapeStyles,
		className: area_chart_module_default["area-chart__legend"],
		shape: legendShape,
		chartId,
		interactive: legendInteractive
	});
	const visibleSeries = seriesWithVisibility.filter(({ isVisible }) => isVisible);
	const curve = getCurveType(curveType, smoothing);
	const renderSeries = ({ series: seriesData, index, isVisible }) => {
		const { color, lineStyles } = getElementStyles({
			data: seriesData,
			index
		});
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_visx_xychart.AnimatedAreaSeries, {
			dataKey: seriesData?.label,
			data: seriesData.data,
			xAccessor: accessors.xAccessor,
			yAccessor: isVisible || !legendInteractive ? accessors.yAccessor : zeroYAccessor,
			fill: color,
			fillOpacity: resolvedFillOpacity,
			...stacked ? {} : {
				renderLine: resolvedWithStroke,
				curve
			},
			lineProps: {
				stroke: color,
				...lineStyles
			}
		}, seriesData?.label || index);
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SingleChartContext.Provider, {
		value: {
			chartId,
			chartRef: internalChartRef,
			chartWidth: width,
			chartHeight: measuredChartHeight || 0
		},
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChartLayout, {
			legendPosition,
			legendElement,
			legendChildren,
			gap,
			className: (0, clsx.default)("area-chart", area_chart_module_default["area-chart"], { [area_chart_module_default["area-chart--animated"]]: animationEnabled }, className),
			style: {
				width,
				height
			},
			trailingContent: nonLegendChildren,
			onContentHeightChange: handleContentHeightChange,
			children: ({ contentHeight }) => {
				const chartHeight = contentHeight > 0 ? contentHeight : height;
				return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					role: "grid",
					"aria-label": (0, _wordpress_i18n.__)("Area chart", "jetpack-charts"),
					tabIndex: 0,
					onKeyDown: onChartKeyDown,
					onFocus: onChartFocus,
					onBlur: onChartBlur,
					children: chartHeight > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						ref: chartRef,
						style: { position: "relative" },
						children: [zoomable && zoom.domain && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ZoomResetButton, { onClick: zoom.reset }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_visx_xychart.XYChart, {
							theme,
							width,
							height: chartHeight,
							margin: {
								...defaultMargin,
								...margin
							},
							xScale: chartOptions.xScale,
							yScale: chartOptions.yScale,
							onPointerDown: zoom.handlers.onPointerDown,
							onPointerUp: zoom.handlers.onPointerUp,
							onPointerMove: zoom.handlers.onPointerMove,
							onPointerOut,
							pointerEventsDataKey: "nearest",
							children: [
								gridVisibility !== "none" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_visx_xychart.Grid, {
									columns: false,
									numTicks: 4
								}),
								chartOptions.axis.x.display && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_visx_xychart.Axis, { ...chartOptions.axis.x }),
								chartOptions.axis.y.display && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_visx_xychart.Axis, { ...chartOptions.axis.y }),
								allSeriesHidden ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SvgEmptyState, {
									x: width / 2,
									y: chartHeight / 2,
									width,
									height: chartHeight,
									children: (0, _wordpress_i18n.__)("All series are hidden. Click legend items to show data.", "jetpack-charts")
								}) : null,
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(ZoomClip, {
									active: zoomable,
									chartId,
									children: [!allSeriesHidden && stacked && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_visx_xychart.AnimatedAreaStack, {
										curve,
										offset: stackOffset,
										renderLine: resolvedWithStroke,
										children: seriesWithVisibility.map(renderSeries)
									}), !allSeriesHidden && !stacked && seriesWithVisibility.map(renderSeries)]
								}),
								withTooltips && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(AccessibleTooltip, {
									detectBounds: true,
									snapTooltipToDatumX: true,
									snapTooltipToDatumY: !stacked,
									renderTooltip: filteredRenderTooltip,
									showVerticalCrosshair: withTooltipCrosshairs?.showVertical,
									showHorizontalCrosshair: withTooltipCrosshairs?.showHorizontal,
									selectedIndex,
									tooltipRef,
									keyboardFocusedClassName: area_chart_module_default["area-chart__tooltip--keyboard-focused"],
									series: dataSorted
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(HoverGlyphs, {
									visibleSeries,
									stacked,
									stackOffset,
									getElementStyles,
									strokeColor: resolveCssVariable(providerTheme.backgroundColor) ?? providerTheme.backgroundColor
								})] }),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(AreaChartScalesRef, {
									chartRef: internalChartRef,
									width,
									height: height || chartHeight,
									margin
								}),
								zoomable && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ZoomSelectionRect, { drag: zoom.drag })
							]
						})]
					})
				});
			}
		})
	});
});
const AreaChartWithProvider = (0, react$1.forwardRef)((props, ref) => {
	if ((0, react$1.useContext)(GlobalChartsContext)) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(AreaChartInternal, {
		...props,
		ref
	});
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(GlobalChartsProvider, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(AreaChartInternal, {
		...props,
		ref
	}) });
});
AreaChartWithProvider.displayName = "AreaChart";
const AreaChart = attachSubComponents(AreaChartWithProvider, { Legend });
const AreaChartResponsive = attachSubComponents(withResponsive(AreaChartWithProvider), { Legend });
//#endregion
//#region src/charts/bar-chart/bar-chart.module.scss
var bar_chart_module_default = {
	"bar-chart": "a8ccharts-97yN9W-bar-chart",
	"bar-chart--animated": "a8ccharts-97yN9W-bar-chart--animated",
	"bar-chart--animated-horizontal": "a8ccharts-97yN9W-bar-chart--animated-horizontal",
	"rise": "a8ccharts-97yN9W-rise",
	"stretch": "a8ccharts-97yN9W-stretch"
};
//#endregion
//#region src/charts/bar-chart/private/truncated-tick-component.tsx
/**
* Get the bandwidth of a scale
*
* @param scale - The scale to get the bandwidth of
* @return The bandwidth of the scale
*/
const getScaleBandwidth$1 = (scale) => {
	return scale && "bandwidth" in scale ? scale.bandwidth() ?? 0 : 0;
};
/**
* Minimum width in pixels for tick labels when scale bandwidth is very small.
* Prevents labels from collapsing to unreadable widths on dense charts.
*
* Trade-off: When bandwidth is less than this minimum (e.g., many bars in a narrow chart),
* adjacent labels may overlap since each label uses this minimum width regardless of
* available space. This prioritizes label readability over preventing overlap.
*
* For very dense charts where overlap occurs, consider:
* - Using `numTicks` option to reduce the number of displayed labels
* - Using `tickFormat` to abbreviate label text
* - Increasing chart width or reducing data points
*/
const MIN_TICK_LABEL_WIDTH = 20;
/**
* A tick component that renders labels with text truncation (ellipsis) when they exceed
* the available bandwidth. Shows the full text on hover via native title attribute.
*
* Uses foreignObject to embed HTML within SVG, enabling CSS text-overflow: ellipsis.
* Inherits text styles from tickLabelProps passed by visx Axis component.
*
* Note: A minimum label width (MIN_TICK_LABEL_WIDTH) is enforced to keep labels readable.
* On very dense charts where bandwidth < 20px, this may cause label overlap.
* See MIN_TICK_LABEL_WIDTH documentation for mitigation strategies.
*
* @param props                - The props for the truncated tick component
* @param props.x              - The x position of the tick
* @param props.y              - The y position of the tick
* @param props.formattedValue - The formatted value of the tick
* @param props.axis           - The axis this tick belongs to
* @param props.textAnchor     - The text anchor of the tick
* @param props.fill           - The fill color of the tick
* @param props.dy             - The dy offset of the tick
*
* @return The truncated tick component
*/
const TruncatedTickComponent = ({ x, y, formattedValue, axis, textAnchor, fill, dy, ...textProps }) => {
	const { xScale, yScale } = (0, react$1.useContext)(_visx_xychart.DataContext) || {};
	const bandwidth = getScaleBandwidth$1(axis === "x" ? xScale : yScale);
	const maxWidth = Math.max(bandwidth, MIN_TICK_LABEL_WIDTH);
	let textAlign = "center";
	if (textAnchor === "start") textAlign = "left";
	else if (textAnchor === "end") textAlign = "right";
	else if (textAnchor === "middle") textAlign = "center";
	let xOffset = 0;
	if (textAlign === "center") xOffset = -maxWidth / 2;
	else if (textAlign === "right") xOffset = -maxWidth;
	const { fontSize, fontFamily, fontWeight, fontStyle, letterSpacing, opacity } = textProps;
	const textStyles = {
		/**
		* SVG <text> elements are vertically aligned to the baseline by default, but HTML <div> elements inside <foreignObject>
		* are positioned relative to the top-left corner. To visually align the tick label like SVG text,
		* we shift the div up by 100% of its height and adjust by twice the SVG dy value (from visx) to approximate original placement.
		*/
		transform: `translateY(calc(-100% + ${dy ?? "0"} * 2))`,
		...isSafari() ? { position: "fixed" } : {},
		fontSize,
		fontFamily,
		fontWeight,
		fontStyle,
		letterSpacing,
		opacity,
		color: fill ?? "inherit",
		textAlign,
		width: maxWidth,
		overflow: "hidden",
		textOverflow: "ellipsis",
		whiteSpace: "nowrap",
		cursor: "default",
		pointerEvents: "auto"
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("foreignObject", {
		x: x + xOffset,
		y,
		width: maxWidth,
		height: 0,
		overflow: "visible",
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			style: textStyles,
			title: formattedValue,
			children: formattedValue
		})
	});
};
/**
* Factory function to create a truncated tick component for a specific axis.
* Returns a component that can be passed to visx's tickComponent prop.
*
* @param axis - The axis this tick component is for ('x' or 'y')
* @return A tick component function compatible with visx's TickRendererProps
*/
const createTruncatedTickComponent = (axis) => (props) => {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TruncatedTickComponent, {
		...props,
		axis
	});
};
/**
* Pre-created tick components for x and y axes.
* These functions are created once at module initialization and reused,
* avoiding repeated factory calls when configuring axes.
*/
const TruncatedXTickComponent = createTruncatedTickComponent("x");
const TruncatedYTickComponent = createTruncatedTickComponent("y");
//#endregion
//#region src/charts/bar-chart/private/use-bar-chart-options.ts
/** Outer padding of the category band scale (space at the chart edges). */
const BASE_BAND_PADDING = .2;
/** Inner padding of the category band scale (the base gap between ticks). */
const BASE_BAND_PADDING_INNER = .1;
const formatDateTick = (timestamp) => {
	return new Date(timestamp).toLocaleDateString(void 0, {
		month: "short",
		day: "numeric"
	});
};
/**
* Get the group padding of a scale.
*
* @param scale - The scale to get the group padding of.
* @return The group padding of the scale.
*/
const getGroupPadding = (scale) => {
	return typeof scale.paddingInner === "number" ? scale.paddingInner : 0;
};
/**
* Returns the merged options for the bar chart, including axis and scale configuration based on the orientation.
*
* @param data       - The data to be displayed in the chart.
* @param horizontal - Whether the chart is horizontal or vertical.
* @param options    - The options for the chart.
* @return The merged options for the chart.
*/
function useBarChartOptions(data, horizontal, options = {}) {
	const defaultOptions = (0, react$1.useMemo)(() => {
		const bandScale = {
			type: "band",
			padding: BASE_BAND_PADDING,
			paddingInner: BASE_BAND_PADDING_INNER
		};
		const linearScale = {
			type: "linear",
			nice: true,
			zero: false
		};
		const labelFormatter = data?.[0]?.data?.[0]?.label ? (label) => label : formatDateTick;
		const valueFormatter = _automattic_number_formatters.formatNumberCompact;
		const labelAccessor = (d) => d?.label || d?.date;
		const valueAccessor = (d) => {
			const enhancedPoint = d;
			return enhancedPoint?.visualValue !== void 0 ? enhancedPoint.visualValue : d?.value;
		};
		return {
			vertical: {
				xTickFormat: labelFormatter,
				yTickFormat: valueFormatter,
				tooltipLabelFormatter: labelFormatter,
				xAccessor: labelAccessor,
				yAccessor: valueAccessor,
				gridVisibility: "x",
				xScale: bandScale,
				yScale: linearScale
			},
			horizontal: {
				xTickFormat: valueFormatter,
				yTickFormat: labelFormatter,
				tooltipLabelFormatter: labelFormatter,
				xAccessor: valueAccessor,
				yAccessor: labelAccessor,
				gridVisibility: "y",
				xScale: linearScale,
				yScale: bandScale
			}
		};
	}, [data]);
	return (0, react$1.useMemo)(() => {
		const { xTickFormat, yTickFormat, tooltipLabelFormatter: defaultTooltipLabelFormatter, xAccessor, yAccessor, gridVisibility, xScale: baseXScale, yScale: baseYScale } = defaultOptions[horizontal ? "horizontal" : "vertical"];
		let valueScaleDomainOverride = {};
		if (data.some((s) => s.options?.type === "comparison")) {
			if (!(!horizontal ? options.yScale?.domain : options.xScale?.domain)) {
				const allValues = [];
				data.forEach((series) => {
					series.data.forEach((d) => {
						const enhanced = d;
						const v = enhanced.visualValue !== void 0 ? enhanced.visualValue : d.value;
						if (typeof v === "number" && Number.isFinite(v)) allValues.push(v);
					});
				});
				if (allValues.length > 0) valueScaleDomainOverride = { domain: [Math.min(0, ...allValues), Math.max(0, ...allValues)] };
			}
		}
		const xScale = {
			...baseXScale,
			...options.xScale || {},
			...horizontal ? valueScaleDomainOverride : {}
		};
		const yScale = {
			...baseYScale,
			...options.yScale || {},
			...!horizontal ? valueScaleDomainOverride : {}
		};
		const providedToolTipLabelFormatter = horizontal ? options.axis?.y?.tickFormat : options.axis?.x?.tickFormat;
		const { labelOverflow: xLabelOverflow, ...xAxisOptions } = options.axis?.x || {};
		const { labelOverflow: yLabelOverflow, ...yAxisOptions } = options.axis?.y || {};
		return {
			gridVisibility,
			xScale,
			yScale,
			accessors: {
				xAccessor,
				yAccessor
			},
			axis: {
				x: {
					orientation: "bottom",
					numTicks: 4,
					tickFormat: xTickFormat,
					...xLabelOverflow === "ellipsis" ? { tickComponent: TruncatedXTickComponent } : {},
					...xAxisOptions
				},
				y: {
					orientation: "left",
					numTicks: 4,
					tickFormat: yTickFormat,
					...yLabelOverflow === "ellipsis" ? { tickComponent: TruncatedYTickComponent } : {},
					...yAxisOptions
				}
			},
			barGroup: { padding: getGroupPadding(horizontal ? yScale : xScale) },
			tooltip: { labelFormatter: providedToolTipLabelFormatter || defaultTooltipLabelFormatter }
		};
	}, [
		defaultOptions,
		options,
		horizontal,
		data
	]);
}
//#endregion
//#region src/charts/bar-chart/private/comparison-bars-geometry.ts
/**
* Output position of a value scale's baseline: zero if in-domain, else the
* nearest range edge. Mirrors visx's getScaleBaseline so comparison shadows
* sit on the same baseline as primary bars.
*
* @param {ValueScale} scale - The continuous value scale.
* @return {number} The baseline output position in pixels.
*/
function getValueScaleBaseline(scale) {
	const [a, b] = scale.range().map((r) => Number(r) || 0);
	const isDescending = b < a;
	const maybeZero = scale(0);
	const [minOutput, maxOutput] = isDescending ? [b, a] : [a, b];
	if (isDescending) return Number.isFinite(maybeZero) ? Math.min(Math.max(minOutput, maybeZero), maxOutput) : maxOutput;
	return Number.isFinite(maybeZero) ? Math.min(Math.max(maybeZero, minOutput), maxOutput) : minOutput;
}
/**
* Compute the rect for a comparison "shadow" bar, centered on the paired
* primary bar slot and scaled by `widthFactor`.
*
* @param {object}  params               - Geometry inputs.
* @param {boolean} params.horizontal    - True for a horizontal bar chart, false for vertical.
* @param {number}  params.bandPosition  - bandScale(category): start px of the category band.
* @param {number}  params.slotOffset    - groupScale(primaryKey): offset of the primary slot within the band.
* @param {number}  params.slotThickness - groupScale.bandwidth(): primary bar thickness in px.
* @param {number}  params.valuePosition - valueScale(value): output px for the bar's data value.
* @param {number}  params.baseline      - getValueScaleBaseline(valueScale): zero-line output px.
* @param {number}  params.widthFactor   - Shadow thickness multiplier, e.g. 1.5 for 150% width.
* @return {ComparisonRect} The {x, y, width, height} of the shadow rect.
*/
function computeComparisonRect(params) {
	const { horizontal, bandPosition, slotOffset, slotThickness, valuePosition, baseline, widthFactor } = params;
	const slotStart = bandPosition + slotOffset;
	const shadowThickness = slotThickness * widthFactor;
	const shadowStart = slotStart + slotThickness / 2 - shadowThickness / 2;
	const valueStart = Math.min(valuePosition, baseline);
	const valueLength = Math.abs(baseline - valuePosition);
	if (horizontal) return {
		x: valueStart,
		y: shadowStart,
		width: valueLength,
		height: shadowThickness
	};
	return {
		x: shadowStart,
		y: valueStart,
		width: shadowThickness,
		height: valueLength
	};
}
/**
* Fraction of each per-series step left as a gap between bars within a single tick.
* Larger = more space between adjacent series; the shadow spans `1 - COMPARISON_INNER_GAP` of the step.
*/
const COMPARISON_INNER_GAP = .1;
/**
* Upper clamp on the computed group padding, so bars can never collapse to zero width
* even at very large `widthFactor` values.
*/
const MAX_GROUP_PADDING = .9;
/**
* Factor applied to the category band's `paddingInner` in comparison mode to tighten the
* gap between ticks. `0.75` = a 25% reduction of the tick-gap padding.
*/
const COMPARISON_TICK_GAP_FACTOR = .75;
//#endregion
//#region src/charts/bar-chart/private/comparison-bars.tsx
const ComparisonBars = ({ comparisonEntries, primaryKeys, groupPadding, horizontal, xAccessor, yAccessor, getElementStyles, resolveFill }) => {
	const context = (0, react$1.useContext)(_visx_xychart.DataContext);
	const xScale = context?.xScale;
	const yScale = context?.yScale;
	if (!xScale || !yScale || primaryKeys.length === 0) return null;
	const bandScale = horizontal ? yScale : xScale;
	const valueScale = horizontal ? xScale : yScale;
	const bandwidth = bandScale.bandwidth ? bandScale.bandwidth() : 0;
	if (!bandwidth) return null;
	const groupScale = (0, _visx_scale.scaleBand)({
		domain: primaryKeys,
		range: [0, bandwidth],
		padding: groupPadding
	});
	const slotThickness = groupScale.bandwidth();
	const baseline = getValueScaleBaseline(valueScale);
	const bandAccessor = horizontal ? yAccessor : xAccessor;
	const valueAccessor = horizontal ? xAccessor : yAccessor;
	const rects = [];
	comparisonEntries.forEach((entry) => {
		const { series, index, primaryKey } = entry;
		const slotOffset = groupScale(primaryKey);
		if (slotOffset == null || !Number.isFinite(slotOffset)) return;
		const { barStyles } = getElementStyles({
			data: series,
			index
		});
		const opacity = barStyles?.opacity ?? .5;
		const widthFactor = barStyles?.widthFactor ?? 1.5;
		const fill = resolveFill(entry);
		series.data.forEach((datum, i) => {
			const bandPosition = Number(bandScale(bandAccessor(datum)));
			const valuePosition = Number(valueScale(Number(valueAccessor(datum))));
			if (!Number.isFinite(bandPosition) || !Number.isFinite(valuePosition)) {
				if (process.env.NODE_ENV !== "production" && !Number.isFinite(bandPosition)) console.warn(`[Charts] ComparisonBars: datum key "${String(bandAccessor(datum))}" did not match any primary category. Shadow will not be rendered. Ensure comparison series data uses the same label/date keys as the primary series.`);
				return;
			}
			const rect = computeComparisonRect({
				horizontal,
				bandPosition,
				slotOffset,
				slotThickness,
				valuePosition,
				baseline,
				widthFactor
			});
			rects.push(/* @__PURE__ */ (0, react_jsx_runtime.jsx)("rect", {
				x: rect.x,
				y: rect.y,
				width: rect.width,
				height: rect.height,
				fill,
				opacity
			}, `${index}-${i}`));
		});
	});
	if (rects.length === 0) return null;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("g", {
		className: "bar-chart__comparison-bars",
		pointerEvents: "none",
		"aria-hidden": "true",
		children: rects
	});
};
//#endregion
//#region src/charts/bar-chart/bar-chart.tsx
const validateData$2 = (data) => {
	if (!data?.length) return "No data available";
	if (data.some((series) => series.data.some((point) => isNaN(point.value) || point.value === null || point.value === void 0 || !point.label && (!("date" in point && point.date) || isNaN(point.date.getTime()))))) return "Invalid data";
	return null;
};
const getPatternId = (chartId, index) => `bar-pattern-${chartId}-${index}`;
const renderTooltipRow = (label, value) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
	className: bar_chart_module_default["bar-chart__tooltip-row"],
	children: (0, _wordpress_i18n.sprintf)((0, _wordpress_i18n.__)("%1$s: %2$s", "jetpack-charts"), label, value)
});
const BarChartInternal = ({ data, chartId: providedChartId, width, height, className, margin, withTooltips = false, showLegend = false, legend = {}, gridVisibility: gridVisibilityProp, renderTooltip, options = {}, orientation = "vertical", withPatterns = false, showZeroValues = false, animation, children, gap = "md" }) => {
	const legendInteractive = legend.interactive ?? false;
	const horizontal = orientation === "horizontal";
	const chartId = useChartId(providedChartId);
	const theme = useXYChartTheme(data);
	const dataSorted = useChartDataTransform(data);
	const dataWithVisibleZeros = useZeroValueDisplay(dataSorted, {
		enabled: showZeroValues,
		valueAxisLength: horizontal ? width : height
	});
	const legendItems = useChartLegendItems(dataSorted);
	const chartOptions = useBarChartOptions(dataWithVisibleZeros, horizontal, options);
	const defaultMargin = useChartMargin(height, chartOptions, dataSorted, theme, horizontal);
	const chartRef = (0, react$1.useRef)(null);
	const { legendChildren, nonLegendChildren } = useChartChildren(children, "BarChart");
	const [measuredChartHeight, setMeasuredChartHeight] = (0, react$1.useState)();
	const handleContentHeightChange = (0, react$1.useCallback)((contentHeight) => {
		setMeasuredChartHeight(contentHeight > 0 ? contentHeight : height);
	}, [height]);
	const [selectedIndex, setSelectedIndex] = (0, react$1.useState)(void 0);
	const [isNavigating, setIsNavigating] = (0, react$1.useState)(false);
	const primarySeriesForNav = dataWithVisibleZeros.filter((s) => s.options?.type !== "comparison");
	const { tooltipRef, onChartFocus, onChartBlur, onChartKeyDown } = useKeyboardNavigation({
		selectedIndex,
		setSelectedIndex,
		isNavigating,
		setIsNavigating,
		chartRef,
		totalPoints: Math.max(0, ...primarySeriesForNav.map((s) => s.data?.length || 0)) * primarySeriesForNav.length
	});
	const { getElementStyles, isSeriesVisible } = useGlobalChartsContext();
	const seriesWithVisibility = (0, react$1.useMemo)(() => {
		if (!chartId || !legendInteractive) return dataWithVisibleZeros.map((series, index) => ({
			series,
			index,
			isVisible: true
		}));
		return dataWithVisibleZeros.map((series, index) => ({
			series,
			index,
			isVisible: isSeriesVisible(chartId, series.label)
		}));
	}, [
		dataWithVisibleZeros,
		chartId,
		isSeriesVisible,
		legendInteractive
	]);
	const allSeriesHidden = (0, react$1.useMemo)(() => {
		return seriesWithVisibility.every(({ isVisible }) => !isVisible);
	}, [seriesWithVisibility]);
	const primaryEntries = (0, react$1.useMemo)(() => seriesWithVisibility.filter(({ isVisible, series }) => isVisible && series.options?.type !== "comparison"), [seriesWithVisibility]);
	const primaryKeys = (0, react$1.useMemo)(() => primaryEntries.map(({ series }) => series.label), [primaryEntries]);
	const primarySeries = (0, react$1.useMemo)(() => primaryEntries.map(({ series }) => series), [primaryEntries]);
	const comparisonEntries = (0, react$1.useMemo)(() => {
		const primaryByGroup = new Map(primaryEntries.map(({ series, index }) => [series.group, {
			label: series.label,
			index
		}]));
		const entries = [];
		seriesWithVisibility.forEach(({ series, index, isVisible }) => {
			if (!isVisible || series.options?.type !== "comparison") return;
			const primary = primaryByGroup.get(series.group) ?? (primaryEntries.length === 1 ? {
				label: primaryEntries[0].series.label,
				index: primaryEntries[0].index
			} : void 0);
			if (!primary || !primaryKeys.includes(primary.label)) return;
			entries.push({
				series,
				index,
				primaryKey: primary.label,
				primaryIndex: primary.index
			});
		});
		return entries;
	}, [
		seriesWithVisibility,
		primaryEntries,
		primaryKeys
	]);
	const comparisonWidthFactor = (0, react$1.useMemo)(() => {
		if (comparisonEntries.length === 0) return void 0;
		return getElementStyles({
			data: comparisonEntries[0].series,
			index: comparisonEntries[0].index
		}).barStyles?.widthFactor ?? 1.5;
	}, [comparisonEntries, getElementStyles]);
	const groupPadding = (0, react$1.useMemo)(() => {
		const basePadding = chartOptions.barGroup.padding;
		if (!comparisonWidthFactor || comparisonWidthFactor <= 1) return basePadding;
		const p = 1 - (1 - COMPARISON_INNER_GAP) / comparisonWidthFactor;
		return Math.min(Math.max(p, basePadding), MAX_GROUP_PADDING);
	}, [chartOptions.barGroup.padding, comparisonWidthFactor]);
	const { xScale, yScale } = (0, react$1.useMemo)(() => {
		if (comparisonEntries.length === 0) return {
			xScale: chartOptions.xScale,
			yScale: chartOptions.yScale
		};
		const tighten = (scale) => ({
			...scale,
			paddingInner: (scale.paddingInner ?? .1) * COMPARISON_TICK_GAP_FACTOR
		});
		return horizontal ? {
			xScale: chartOptions.xScale,
			yScale: tighten(chartOptions.yScale)
		} : {
			xScale: tighten(chartOptions.xScale),
			yScale: chartOptions.yScale
		};
	}, [
		comparisonEntries.length,
		chartOptions.xScale,
		chartOptions.yScale,
		horizontal
	]);
	const getBarBackground = (0, react$1.useCallback)((index) => () => withPatterns ? `url(#${getPatternId(chartId, index)})` : getElementStyles({
		data: dataSorted[index],
		index
	}).color, [
		withPatterns,
		getElementStyles,
		dataSorted,
		chartId
	]);
	const resolveComparisonFill = (0, react$1.useCallback)((entry) => withPatterns ? `url(#${getPatternId(chartId, entry.primaryIndex)})` : getElementStyles({
		data: entry.series,
		index: entry.index
	}).color, [
		withPatterns,
		chartId,
		getElementStyles
	]);
	const renderDefaultTooltip = (0, react$1.useCallback)(({ tooltipData }) => {
		const nearestDatum = tooltipData?.nearestDatum?.datum;
		if (!nearestDatum) return null;
		const primaryKey = tooltipData?.nearestDatum?.key;
		const categoryLabel = chartOptions.tooltip.labelFormatter(nearestDatum.label || (nearestDatum.date ? nearestDatum.date.getTime() : 0), 0, []);
		const comparisonEntry = comparisonEntries.find((entry) => entry.primaryKey === primaryKey);
		const comparisonDatum = comparisonEntry?.series.data.find((point) => {
			const p = point;
			return nearestDatum.label != null ? p.label === nearestDatum.label : !!nearestDatum.date && !!p.date && p.date.getTime() === nearestDatum.date.getTime();
		});
		if (comparisonEntry && comparisonDatum && comparisonDatum.value != null) return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: bar_chart_module_default["bar-chart__tooltip"],
			children: [
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: bar_chart_module_default["bar-chart__tooltip-header"],
					children: categoryLabel
				}),
				renderTooltipRow(primaryKey, (0, _automattic_number_formatters.formatNumber)(nearestDatum.value)),
				renderTooltipRow(comparisonEntry.series.label, (0, _automattic_number_formatters.formatNumber)(comparisonDatum.value))
			]
		});
		return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: bar_chart_module_default["bar-chart__tooltip"],
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: bar_chart_module_default["bar-chart__tooltip-header"],
				children: primaryKey
			}), renderTooltipRow(categoryLabel, (0, _automattic_number_formatters.formatNumber)(nearestDatum.value))]
		});
	}, [chartOptions.tooltip, comparisonEntries]);
	const renderPattern = (0, react$1.useCallback)((index, color) => {
		const patternType = index % 4;
		const id = getPatternId(chartId, index);
		const commonProps = {
			id,
			stroke: "white",
			strokeWidth: 1,
			background: color
		};
		switch (patternType) {
			case 0:
			default: return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_visx_pattern.PatternLines, {
				...commonProps,
				width: 5,
				height: 5,
				orientation: ["diagonal"]
			}, id);
			case 1: return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_visx_pattern.PatternCircles, {
				...commonProps,
				width: 6,
				height: 6,
				fill: "white"
			}, id);
			case 2: return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_visx_pattern.PatternWaves, {
				...commonProps,
				width: 4,
				height: 4
			}, id);
			case 3: return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_visx_pattern.PatternHexagons, {
				...commonProps,
				size: 8,
				height: 3
			}, id);
		}
	}, [chartId]);
	const createPatternBorderStyle = (0, react$1.useCallback)((index, color) => {
		const patternId = getPatternId(chartId, index);
		return `
			.visx-bar[fill="url(#${patternId})"],
			.bar-chart__comparison-bars rect[fill="url(#${patternId})"] {
				stroke: ${color};
				stroke-width: 1;
				}
			`;
	}, [chartId]);
	const createKeyboardHighlightStyle = (0, react$1.useCallback)(() => {
		if (selectedIndex === void 0) return "";
		const primaryCount = primaryEntries.length;
		const maxDataPoints = Math.max(...primaryEntries.map((e) => e.series.data.length));
		const dataPointIndex = Math.floor(selectedIndex / primaryCount);
		const seriesIndex = selectedIndex % primaryCount;
		if (dataPointIndex >= maxDataPoints || seriesIndex >= primaryCount) return "";
		const seriesData = primaryEntries[seriesIndex]?.series;
		if (!seriesData || dataPointIndex >= seriesData.data.length) return "";
		const actualBarIndex = seriesIndex * maxDataPoints + dataPointIndex;
		return `
			.bar-chart[data-chart-id="bar-chart-${chartId}"] .visx-bar-group .visx-bar:nth-child(${actualBarIndex + 1}) {
				stroke: #005fcc;
				stroke-width: 2px;
			}
		`;
	}, [
		selectedIndex,
		primaryEntries,
		chartId
	]);
	const error = validateData$2(dataSorted);
	useChartRegistration({
		chartId,
		legendItems,
		chartType: "bar",
		isDataValid: !error,
		metadata: (0, react$1.useMemo)(() => ({
			orientation,
			withPatterns
		}), [orientation, withPatterns])
	});
	const prefersReducedMotion = usePrefersReducedMotion();
	if (error) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: (0, clsx.default)("bar-chart", bar_chart_module_default["bar-chart"]),
		children: error
	});
	const gridVisibility = gridVisibilityProp ?? chartOptions.gridVisibility;
	const highlightedBarStyle = createKeyboardHighlightStyle();
	const legendPosition = legend.position ?? "bottom";
	const legendElement = showLegend && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Legend, {
		orientation: legend.orientation ?? "horizontal",
		position: legendPosition,
		alignment: legend.alignment ?? "center",
		labelStyles: legend.labelStyles,
		itemClassName: legend.itemClassName,
		itemStyles: legend.itemStyles,
		shapeStyles: legend.shapeStyles,
		className: bar_chart_module_default["bar-chart__legend"],
		shape: legend.shape ?? "rect",
		chartId,
		interactive: legendInteractive
	});
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SingleChartContext.Provider, {
		value: {
			chartId,
			chartWidth: width,
			chartHeight: measuredChartHeight || 0
		},
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChartLayout, {
			legendPosition,
			legendElement,
			legendChildren,
			gap,
			className: (0, clsx.default)("bar-chart", bar_chart_module_default["bar-chart"], { [bar_chart_module_default[`bar-chart--animated${horizontal ? "-horizontal" : ""}`]]: animation && !prefersReducedMotion }, className),
			style: {
				width,
				height
			},
			"data-chart-id": `bar-chart-${chartId}`,
			trailingContent: nonLegendChildren,
			onContentHeightChange: handleContentHeightChange,
			children: ({ contentHeight }) => {
				const chartHeight = contentHeight > 0 ? contentHeight : height;
				return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					role: "grid",
					"aria-label": (0, _wordpress_i18n.__)("Bar chart", "jetpack-charts"),
					tabIndex: 0,
					onKeyDown: onChartKeyDown,
					onFocus: onChartFocus,
					onBlur: onChartBlur,
					children: chartHeight > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						ref: chartRef,
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_visx_xychart.XYChart, {
							theme,
							width,
							height: chartHeight,
							margin: {
								...defaultMargin,
								...margin
							},
							xScale,
							yScale,
							horizontal,
							pointerEventsDataKey: "nearest",
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_visx_xychart.Grid, {
									columns: gridVisibility.includes("y"),
									rows: gridVisibility.includes("x"),
									numTicks: 4
								}),
								withPatterns && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("defs", { children: dataSorted.map((seriesData, index) => renderPattern(index, getElementStyles({
									data: seriesData,
									index
								}).color)) }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("style", { children: dataSorted.map((seriesData, index) => createPatternBorderStyle(index, getElementStyles({
									data: seriesData,
									index
								}).color)) })] }),
								highlightedBarStyle && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("style", { children: highlightedBarStyle }),
								allSeriesHidden ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SvgEmptyState, {
									x: width / 2,
									y: chartHeight / 2,
									width,
									height: chartHeight,
									children: (0, _wordpress_i18n.__)("All series are hidden. Click legend items to show data.", "jetpack-charts")
								}) : null,
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(ComparisonBars, {
									comparisonEntries,
									primaryKeys,
									groupPadding,
									horizontal,
									xAccessor: chartOptions.accessors.xAccessor,
									yAccessor: chartOptions.accessors.yAccessor,
									getElementStyles,
									resolveFill: resolveComparisonFill
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_visx_xychart.BarGroup, {
									padding: groupPadding,
									children: primaryEntries.map(({ series: seriesData, index }) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_visx_xychart.BarSeries, {
										dataKey: seriesData?.label,
										data: seriesData.data,
										yAccessor: chartOptions.accessors.yAccessor,
										xAccessor: chartOptions.accessors.xAccessor,
										colorAccessor: getBarBackground(index)
									}, seriesData?.label))
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_visx_xychart.Axis, { ...chartOptions.axis.x }),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_visx_xychart.Axis, { ...chartOptions.axis.y }),
								withTooltips && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(AccessibleTooltip, {
									detectBounds: true,
									snapTooltipToDatumX: true,
									snapTooltipToDatumY: true,
									renderTooltip: renderTooltip || renderDefaultTooltip,
									selectedIndex,
									tooltipRef,
									keyboardFocusedClassName: bar_chart_module_default["bar-chart__tooltip--keyboard-focused"],
									series: primarySeries,
									mode: "individual"
								})
							]
						})
					})
				});
			}
		})
	});
};
const BarChartWithProvider = (props) => {
	if ((0, react$1.useContext)(GlobalChartsContext)) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(BarChartInternal, { ...props });
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(GlobalChartsProvider, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(BarChartInternal, { ...props }) });
};
BarChartWithProvider.displayName = "BarChart";
const BarChart = attachSubComponents(BarChartWithProvider, { Legend });
const BarChartResponsive = attachSubComponents(withResponsive(BarChartWithProvider), { Legend });
//#endregion
//#region src/charts/bar-list-chart/bar-list-chart.tsx
/**
* Get the bandwidth of a scale
* @param scale - The scale to get the bandwidth of
* @return The bandwidth of the scale
*/
const getScaleBandwidth = (scale) => {
	const s = scale;
	return s && "bandwidth" in s ? s?.bandwidth() ?? 0 : 0;
};
const DefaultLabelComponent = ({ textProps, x, y, label, formatter }) => {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_visx_text.Text, {
		...textProps,
		textAnchor: "start",
		x,
		y,
		children: formatter(label)
	});
};
const DefaultValueComponent = ({ textProps, x, y, value, formatter }) => {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_visx_text.Text, {
		...textProps,
		textAnchor: "end",
		x,
		y,
		fontWeight: 500,
		children: formatter(value)
	});
};
const AxisRenderer = ({ ticks, tickLabelProps, yOffset, labelPosition, valuePosition, data, labelFormatter, valueFormatter, LabelComponent = DefaultLabelComponent, ValueComponent = DefaultValueComponent }) => {
	if (ticks.length === 0) return null;
	const allTickLabelProps = ticks.map(({ value, index }) => typeof tickLabelProps === "function" ? tickLabelProps(value, index, ticks) : {});
	return ticks.map(({ from, formattedValue }, index) => {
		const textProps = allTickLabelProps[index] ?? {};
		delete textProps.textAnchor;
		delete textProps.dx;
		const sum = data.reduce((acc, { data: seriesData }) => acc + (seriesData[index]?.value ?? 0), 0);
		const y = from.y + yOffset;
		return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_visx_group.Group, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(LabelComponent, {
			textProps,
			x: labelPosition,
			y,
			label: formattedValue,
			formatter: labelFormatter
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ValueComponent, {
			textProps,
			x: valuePosition,
			y,
			value: sum,
			formatter: valueFormatter,
			data,
			index
		})] }, index);
	});
};
/**
* Calculate the default y offset for the bar list chart.
* @param data          - The data to calculate the default y offset for.
* @param yScaleConfig  - The y scale configuration.
* @param height        - The height of the chart.
* @param isMultiSeries - Whether the chart is a multi series chart.
* @return The default y offset.
*/
const getDefaultYOffset = (data, yScaleConfig, height, isMultiSeries) => {
	if (!isMultiSeries) return 0;
	const dataKeys = data.map(({ label }) => label);
	const yScale = (0, _visx_scale.createScale)({
		type: "band",
		range: [0, height],
		domain: dataKeys,
		...yScaleConfig
	});
	const groupScale = (0, _visx_scale.scaleBand)({
		domain: dataKeys,
		range: [0, getScaleBandwidth(yScale)],
		padding: yScaleConfig.paddingInner
	});
	return -(getScaleBandwidth(groupScale) + 6);
};
const BarListChartInternal = ({ data, width, height, options = {}, margin = {
	left: 0,
	right: 20,
	bottom: 0,
	top: 0
}, ...rest }) => {
	const chartOptions = (0, react$1.useMemo)(() => {
		const isMultiSeries = data.length > 1;
		const defaultYScale = {
			paddingInner: isMultiSeries ? .3 : .1,
			padding: isMultiSeries ? .3 : .1
		};
		const defaultXScale = { zero: true };
		const yScale = {
			...defaultYScale,
			...options.yScale ?? {}
		};
		return {
			yScale,
			xScale: {
				...defaultXScale,
				...options.xScale ?? {}
			},
			labelPosition: options.labelPosition ?? (isMultiSeries ? 0 : 10),
			valueFormatter: options.valueFormatter ?? ((value) => (0, _automattic_number_formatters.formatNumberCompact)(value)),
			labelFormatter: options.labelFormatter ?? ((value) => String(value)),
			valuePosition: options.valuePosition ?? width,
			yOffset: options.yOffset ?? getDefaultYOffset(data, yScale, height, isMultiSeries)
		};
	}, [
		options,
		width,
		data,
		height
	]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(BarChart, {
		orientation: "horizontal",
		gridVisibility: "none",
		data,
		width,
		height,
		margin,
		options: {
			axis: {
				y: { children: (renderProps) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(AxisRenderer, {
					...renderProps,
					data,
					yOffset: chartOptions.yOffset,
					labelPosition: chartOptions.labelPosition,
					valuePosition: chartOptions.valuePosition,
					labelFormatter: chartOptions.labelFormatter,
					valueFormatter: chartOptions.valueFormatter,
					LabelComponent: options.labelComponent,
					ValueComponent: options.valueComponent
				}) },
				x: { children: () => null }
			},
			xScale: chartOptions.xScale,
			yScale: chartOptions.yScale
		},
		...rest
	});
};
const BarListChart = (props) => {
	if ((0, react$1.useContext)(GlobalChartsContext)) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(BarListChartInternal, { ...props });
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(GlobalChartsProvider, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(BarListChartInternal, { ...props }) });
};
BarListChart.displayName = "BarListChart";
const BarListChartResponsive = withResponsive(BarListChart);
//#endregion
//#region src/charts/conversion-funnel-chart/conversion-funnel-chart.module.scss
var conversion_funnel_chart_module_default = {
	"bar-container": "a8ccharts-mGEVca-bar-container",
	"change-indicator": "a8ccharts-mGEVca-change-indicator",
	"conversion-funnel-chart--loading": "a8ccharts-mGEVca-conversion-funnel-chart--loading",
	"empty-state": "a8ccharts-mGEVca-empty-state",
	"funnel-bar": "a8ccharts-mGEVca-funnel-bar",
	"funnel-bar--animated": "a8ccharts-mGEVca-funnel-bar--animated",
	"funnel-container": "a8ccharts-mGEVca-funnel-container",
	"funnel-step": "a8ccharts-mGEVca-funnel-step",
	"funnel-step--animated": "a8ccharts-mGEVca-funnel-step--animated",
	"funnel-step--blurred": "a8ccharts-mGEVca-funnel-step--blurred",
	"main-metric": "a8ccharts-mGEVca-main-metric",
	"main-rate": "a8ccharts-mGEVca-main-rate",
	"step-label": "a8ccharts-mGEVca-step-label",
	"step-rate": "a8ccharts-mGEVca-step-rate",
	"stretch": "a8ccharts-mGEVca-stretch",
	"tooltip-content": "a8ccharts-mGEVca-tooltip-content",
	"tooltip-title": "a8ccharts-mGEVca-tooltip-title",
	"tooltip-wrapper": "a8ccharts-mGEVca-tooltip-wrapper"
};
//#endregion
//#region src/charts/conversion-funnel-chart/private/use-funnel-selection.ts
/**
* Custom hook to manage funnel bar selection state and interactions
* @param hideTooltip - Function to hide tooltip when selection is cleared
* @return Object containing selection state and event handlers
*/
const useFunnelSelection = (hideTooltip) => {
	const [clickedStep, setClickedStep] = (0, react$1.useState)(null);
	return {
		clickedStep,
		handleBarClick: (0, react$1.useCallback)((stepId) => {
			if (clickedStep === stepId) {
				setClickedStep(null);
				hideTooltip?.();
			} else setClickedStep(stepId);
		}, [clickedStep, hideTooltip]),
		handleBarKeyDown: (0, react$1.useCallback)((stepId, event) => {
			if (event.key === "Enter" || event.key === " ") {
				event.preventDefault();
				if (clickedStep === stepId) {
					setClickedStep(null);
					hideTooltip?.();
				} else setClickedStep(stepId);
			} else if (event.key === "Escape") {
				event.preventDefault();
				setClickedStep(null);
				hideTooltip?.();
			}
		}, [clickedStep, hideTooltip]),
		clearSelection: (0, react$1.useCallback)(() => {
			setClickedStep(null);
			hideTooltip?.();
		}, [hideTooltip]),
		getStepState: (0, react$1.useCallback)((stepId) => ({
			isClicked: clickedStep === stepId,
			isBlurred: clickedStep !== null && clickedStep !== stepId
		}), [clickedStep])
	};
};
//#endregion
//#region src/charts/conversion-funnel-chart/conversion-funnel-chart.tsx
/**
* Internal ConversionFunnelChart component with chart registration
*
* @param props                  - Component props
* @param props.chartId          - Optional unique identifier for the chart
* @param props.mainRate         - Main conversion rate to highlight
* @param props.changeIndicator  - Change indicator (e.g., +2%, -1.5%)
* @param props.steps            - Array of funnel steps
* @param props.loading          - Whether the chart is in loading state
* @param props.animation        - Whether to show chart animation on initial render or not
* @param props.className        - Additional CSS class name
* @param props.height           - Height of the chart container. Falls back to style.height if set, otherwise defaults to "100%".
* @param props.style            - Custom styling
* @param props.renderStepLabel  - Custom render function for step labels
* @param props.renderStepRate   - Custom render function for step rates
* @param props.renderMainMetric - Custom render function for the entire main metric section
* @param props.renderTooltip    - Custom render function for tooltip content
* @return JSX element representing the conversion funnel chart
*/
const ConversionFunnelChartInternal = ({ mainRate, changeIndicator, steps, loading = false, animation, className, chartId: providedChartId, height, style, renderStepLabel, renderStepRate, renderMainMetric, renderTooltip }) => {
	const chartId = useChartId(providedChartId);
	const { conversionFunnelChart: conversionFunnelChartSettings } = useGlobalChartsTheme();
	const { getElementStyles, isColorPaletteResolved } = useGlobalChartsContext();
	const chartRef = (0, react$1.useRef)(null);
	const selectedBarRef = (0, react$1.useRef)(null);
	const { tooltipData, tooltipLeft, tooltipTop, tooltipOpen, showTooltip, hideTooltip } = (0, _visx_tooltip.useTooltip)();
	const { handleBarClick, handleBarKeyDown, clearSelection, getStepState } = useFunnelSelection(hideTooltip);
	const { containerRef: portalContainerRef, TooltipInPortal, containerBounds } = (0, _visx_tooltip.useTooltipInPortal)({
		detectBounds: true,
		scroll: true
	});
	const clearSelectionAndRef = (0, react$1.useCallback)(() => {
		clearSelection();
		selectedBarRef.current = null;
		hideTooltip();
	}, [clearSelection, hideTooltip]);
	const showTooltipAt = (0, react$1.useCallback)((step, x, y) => {
		showTooltip({
			tooltipData: step,
			tooltipLeft: x,
			tooltipTop: y - 10
		});
	}, [showTooltip]);
	const getMouseTooltipCoords = (0, react$1.useCallback)((event) => {
		if (containerBounds.width === 0 || containerBounds.height === 0) return null;
		return {
			x: event.clientX - containerBounds.left,
			y: event.clientY - containerBounds.top
		};
	}, [
		containerBounds.width,
		containerBounds.height,
		containerBounds.left,
		containerBounds.top
	]);
	const getKeyboardTooltipCoords = (0, react$1.useCallback)((event) => {
		if (containerBounds.width === 0 || containerBounds.height === 0) return null;
		const rect = event.currentTarget.getBoundingClientRect();
		return {
			x: rect.left + rect.width / 2 - containerBounds.left,
			y: rect.top - containerBounds.top
		};
	}, [
		containerBounds.width,
		containerBounds.height,
		containerBounds.left,
		containerBounds.top
	]);
	const handleStepInteraction = (0, react$1.useCallback)((step, event, interactionType) => {
		selectedBarRef.current = event.currentTarget;
		const { isClicked } = getStepState(step.id);
		if (isClicked) {
			if (interactionType === "click") handleBarClick(step.id);
			else handleBarKeyDown(step.id, event);
			return;
		}
		if (interactionType === "click") {
			handleBarClick(step.id);
			const coords = getMouseTooltipCoords(event);
			if (coords) showTooltipAt(step, coords.x, coords.y);
		} else {
			handleBarKeyDown(step.id, event);
			const coords = getKeyboardTooltipCoords(event);
			if (coords) showTooltipAt(step, coords.x, coords.y);
		}
	}, [
		getStepState,
		handleBarClick,
		handleBarKeyDown,
		showTooltipAt,
		getMouseTooltipCoords,
		getKeyboardTooltipCoords
	]);
	const stepHandlers = (0, react$1.useMemo)(() => {
		const handlers = /* @__PURE__ */ new Map();
		steps.forEach((step) => {
			const onClick = (event) => {
				event.stopPropagation();
				handleStepInteraction(step, event, "click");
			};
			const onKeyDown = (event) => {
				if (event.key === "Enter" || event.key === " ") handleStepInteraction(step, event, "keyboard");
				else {
					selectedBarRef.current = event.currentTarget;
					handleBarKeyDown(step.id, event);
				}
			};
			handlers.set(step.id, {
				onClick,
				onKeyDown
			});
		});
		return handlers;
	}, [
		steps,
		handleStepInteraction,
		handleBarKeyDown
	]);
	(0, react$1.useEffect)(() => {
		const handleDocumentClick = (event) => {
			if (selectedBarRef.current && !selectedBarRef.current.contains(event.target)) clearSelectionAndRef();
		};
		document.addEventListener("mousedown", handleDocumentClick);
		return () => {
			document.removeEventListener("mousedown", handleDocumentClick);
		};
	}, [clearSelectionAndRef]);
	const resolvedHeight = height ?? style?.height ?? "100%";
	const { primaryColor, backgroundColor, positiveChangeColor, negativeChangeColor } = conversionFunnelChartSettings;
	const { color: barColor } = getElementStyles ? getElementStyles({
		index: 0,
		overrideColor: primaryColor
	}) : { color: primaryColor || "#000000" };
	const changeColor = changeIndicator?.startsWith("+") ? positiveChangeColor : negativeChangeColor;
	const barBackgroundColor = backgroundColor || hexToRgba(barColor, .08) || "rgba(0, 0, 0, 0.08)";
	const renderDefaultMainMetric = () => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
		className: conversion_funnel_chart_module_default["main-rate"],
		children: formatPercentage(mainRate)
	}), changeIndicator && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
		className: conversion_funnel_chart_module_default["change-indicator"],
		style: { color: changeColor },
		children: changeIndicator
	})] });
	const renderDefaultTooltip = (step) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(Stack, {
		direction: "column",
		align: "flex-start",
		gap: "xs",
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: conversion_funnel_chart_module_default["tooltip-title"],
			children: step.label
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: conversion_funnel_chart_module_default["tooltip-content"],
			children: [formatPercentage(step.rate), ` • ${step.count ?? "no"} items`]
		})]
	});
	const isDataValid = Boolean(steps && steps.length > 0);
	useChartRegistration({
		chartId,
		legendItems: [],
		chartType: "conversion-funnel",
		isDataValid,
		metadata: (0, react$1.useMemo)(() => ({
			mainRate,
			changeIndicator,
			stepsCount: steps?.length || 0
		}), [
			mainRate,
			changeIndicator,
			steps?.length
		])
	});
	const prefersReducedMotion = usePrefersReducedMotion();
	if (!isDataValid) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Stack, {
		direction: "column",
		align: "center",
		justify: "center",
		className: (0, clsx.default)(conversion_funnel_chart_module_default["conversion-funnel-chart"], loading && conversion_funnel_chart_module_default["conversion-funnel-chart--loading"], className),
		style: {
			...style,
			height: resolvedHeight
		},
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: conversion_funnel_chart_module_default["empty-state"],
			children: loading ? "Loading..." : "No data available"
		})
	});
	const maxRate = Math.max(...steps.map((step) => step.rate));
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(Stack, {
		direction: "column",
		gap: "xl",
		ref: (node) => {
			portalContainerRef(node);
			chartRef.current = node;
		},
		className: (0, clsx.default)(conversion_funnel_chart_module_default["conversion-funnel-chart"], loading && conversion_funnel_chart_module_default["conversion-funnel-chart--loading"], className),
		style: {
			...style,
			height: resolvedHeight
		},
		children: [renderMainMetric ? renderMainMetric({
			mainRate,
			changeIndicator,
			className: conversion_funnel_chart_module_default["main-metric"],
			changeColor
		}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Stack, {
			direction: "row",
			align: "baseline",
			gap: "sm",
			className: conversion_funnel_chart_module_default["main-metric"],
			children: renderDefaultMainMetric()
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Stack, {
			direction: "row",
			align: "flex-end",
			gap: "lg",
			className: conversion_funnel_chart_module_default["funnel-container"],
			children: steps.map((step, index) => {
				const barHeight = step.rate / maxRate * 100;
				const { isBlurred } = getStepState(step.id);
				return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(Stack, {
					direction: "column",
					className: (0, clsx.default)(conversion_funnel_chart_module_default["funnel-step"], isColorPaletteResolved && conversion_funnel_chart_module_default["funnel-step--animated"], isBlurred && conversion_funnel_chart_module_default["funnel-step--blurred"]),
					gap: "xl",
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(Stack, {
						direction: "column",
						gap: "xs",
						children: [renderStepLabel ? renderStepLabel({
							step,
							index,
							className: conversion_funnel_chart_module_default["step-label"]
						}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: conversion_funnel_chart_module_default["step-label"],
							children: step.label
						}), renderStepRate ? renderStepRate({
							step,
							index,
							className: conversion_funnel_chart_module_default["step-rate"]
						}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: conversion_funnel_chart_module_default["step-rate"],
							children: formatPercentage(step.rate)
						})]
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Stack, {
						direction: "column",
						justify: "flex-end",
						className: conversion_funnel_chart_module_default["bar-container"],
						onClick: stepHandlers.get(step.id)?.onClick,
						onKeyDown: stepHandlers.get(step.id)?.onKeyDown,
						role: "button",
						tabIndex: isBlurred ? -1 : 0,
						"aria-label": step.label,
						style: { backgroundColor: barBackgroundColor },
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: (0, clsx.default)(conversion_funnel_chart_module_default["funnel-bar"], { [conversion_funnel_chart_module_default["funnel-bar--animated"]]: animation && !loading && !prefersReducedMotion }),
							style: {
								height: `${barHeight}%`,
								backgroundColor: barColor
							}
						})
					})]
				}, step.id);
			})
		})]
	}), tooltipOpen && tooltipData && (() => {
		const tooltipContent = renderTooltip ? renderTooltip({
			step: tooltipData,
			index: steps.findIndex((s) => s.id === tooltipData.id),
			top: tooltipTop,
			left: tooltipLeft,
			className: conversion_funnel_chart_module_default["tooltip-wrapper"]
		}) : renderDefaultTooltip(tooltipData);
		if (!tooltipContent) return null;
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TooltipInPortal, {
			top: tooltipTop,
			left: tooltipLeft,
			className: conversion_funnel_chart_module_default["tooltip-wrapper"],
			children: tooltipContent
		}, Math.random());
	})()] });
};
/**
* ConversionFunnelChart component with provider wrapper
*
* @param props - Component props
* @return JSX element representing the conversion funnel chart
*/
const ConversionFunnelChartWithProvider = (props) => {
	if ((0, react$1.useContext)(GlobalChartsContext)) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ConversionFunnelChartInternal, { ...props });
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(GlobalChartsProvider, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ConversionFunnelChartInternal, { ...props }) });
};
ConversionFunnelChartWithProvider.displayName = "ConversionFunnelChart";
//#endregion
//#region src/utils/sanitize-html.ts
/**
* External dependencies
*/
dompurify.default.addHook("afterSanitizeAttributes", (node) => {
	if (node.tagName === "A" && node.getAttribute("target") === "_blank") node.setAttribute("rel", "noopener noreferrer");
});
/**
* Sanitizes an HTML string using DOMPurify, allowing only safe formatting
* markup suitable for chart tooltip content.
*
* @param html - The HTML string to sanitize
* @return Sanitized HTML string safe for rendering
*/
function sanitizeHtml(html) {
	return dompurify.default.sanitize(html, {
		ALLOWED_TAGS: [
			"a",
			"b",
			"br",
			"div",
			"em",
			"i",
			"li",
			"ol",
			"p",
			"small",
			"span",
			"strong",
			"sub",
			"sup",
			"table",
			"tbody",
			"td",
			"th",
			"thead",
			"tr",
			"u",
			"ul"
		],
		ALLOWED_ATTR: [
			"class",
			"href",
			"target",
			"rel"
		]
	});
}
//#endregion
//#region src/charts/geo-chart/geo-chart.module.scss
var geo_chart_module_default = { "container": "a8ccharts-8hS2IW-container" };
//#endregion
//#region src/charts/geo-chart/geo-chart.tsx
/**
* External dependencies
*/
/**
* Internal dependencies
*/
const DEFAULT_FEATURE_FILL_COLOR = "#ffffff";
const DEFAULT_BACKGROUND_COLOR = "#ffffff";
const GEO_CHART_PACKAGES = [
	"corechart",
	"controls",
	"geochart"
];
const GOOGLE_CHARTS_ERROR_ID_PREFIX = "google-visualization-errors-";
const GOOGLE_CHARTS_ERROR_WRAPPER_INFIX = "-all-";
/**
* Collects Google Charts error elements rendered inside a chart container.
*
* @param container - The chart container element to scan.
* @return Errors found in the container, one per error span.
*/
function collectRenderedGeoChartErrors(container) {
	const elements = container.querySelectorAll(`[id^="${GOOGLE_CHARTS_ERROR_ID_PREFIX}"]`);
	return Array.from(elements).filter((element) => !element.id.includes(GOOGLE_CHARTS_ERROR_WRAPPER_INFIX)).map((element) => ({
		id: element.id,
		message: element.textContent?.trim() ?? ""
	})).filter((error) => error.message.length > 0);
}
/**
* Whether a node added to the chart container is — or contains — a Google
* Charts error element. Also matches text appended into an existing error
* span, in case Google fills the message after inserting the element.
*
* @param node - The added DOM node to inspect.
* @return Whether the node involves a Google Charts error element.
*/
function involvesGeoChartErrorElement(node) {
	if (node.nodeType === Node.TEXT_NODE) return !!node.parentElement?.id.startsWith(GOOGLE_CHARTS_ERROR_ID_PREFIX);
	if (!(node instanceof HTMLElement)) return false;
	return node.id.startsWith(GOOGLE_CHARTS_ERROR_ID_PREFIX) || node.querySelector(`[id^="${GOOGLE_CHARTS_ERROR_ID_PREFIX}"]`) !== null;
}
/**
* Normalizes the raw Google Charts error event into the GeoChart error shape.
*
* @param eventArgs - Error event payload from react-google-charts.
* @return Normalized GeoChart error.
*/
function normalizeGeoChartError(eventArgs) {
	const payload = Array.isArray(eventArgs) ? eventArgs[0] : eventArgs;
	if (!payload || typeof payload !== "object") return {};
	const { id, message, detailedMessage, options } = payload;
	return {
		...typeof id === "string" && { id },
		...typeof message === "string" && { message },
		...typeof detailedMessage === "string" && { detailedMessage },
		...options && typeof options === "object" && !Array.isArray(options) && { options }
	};
}
/**
* Renders a geographical chart using Google Charts GeoChart to visualize data.
*
* Supports the full Google Charts data format including custom tooltips, formatted values,
* and multiple data columns for maximum flexibility.
*
* Locations can be identified by full name (e.g., 'United States', 'California') or codes
* (e.g., 'US', 'US-CA'). Full names are recommended for better readability in tooltips.
*
* @param props                   - The props for the GeoChart component
* @param props.data              - Data in Google Charts format (array of arrays with headers)
* @param props.width             - Width of the chart in pixels
* @param props.height            - Height of the chart in pixels
* @param props.region            - Region to display ('world', 'US', or ISO 3166-1 alpha-2 code)
* @param props.resolution        - Resolution level ('countries', 'provinces', or 'metros')
* @param props.onError           - Optional callback for Google Charts errors
* @param props.className         - Additional CSS class name for the chart container
* @param props.renderPlaceholder - Optional render function for the loading placeholder
* @return A React component displaying an interactive map with data visualization
*/
const GeoChartInternal = ({ className, data, width, height, region = "world", resolution = "countries", onError, renderPlaceholder }) => {
	const { getElementStyles, theme: { geoChart: { featureFillColor }, backgroundColor } } = useGlobalChartsContext();
	const containerRef = (0, react$1.useRef)(null);
	const reportedErrorIdsRef = (0, react$1.useRef)(/* @__PURE__ */ new Set());
	(0, react$1.useEffect)(() => {
		const container = containerRef.current;
		if (!onError || !container || typeof MutationObserver === "undefined") return;
		const reportRenderedErrors = () => {
			for (const error of collectRenderedGeoChartErrors(container)) {
				if (reportedErrorIdsRef.current.has(error.id)) continue;
				reportedErrorIdsRef.current.add(error.id);
				onError(error);
			}
		};
		const observer = new MutationObserver((records) => {
			if (records.some((record) => Array.from(record.addedNodes).some(involvesGeoChartErrorElement))) reportRenderedErrors();
		});
		observer.observe(container, {
			childList: true,
			subtree: true
		});
		reportRenderedErrors();
		return () => observer.disconnect();
	}, [onError]);
	const loadingPlaceholder = /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Center, {
		className: (0, clsx.default)("geo-chart", geo_chart_module_default.container, className),
		style: {
			width,
			height
		},
		children: renderPlaceholder ? renderPlaceholder() : (0, _wordpress_i18n.__)("Loading map", "jetpack-charts")
	});
	const fullColorHex = getElementStyles({ index: 0 }).color;
	const lightColorHex = lightenHexColor(fullColorHex, .8);
	const backgroundColorHex = normalizeColorToHex(backgroundColor, null, resolveCssVariable) || DEFAULT_BACKGROUND_COLOR;
	const defaultFillColorHex = normalizeColorToHex(featureFillColor, null, resolveCssVariable) || DEFAULT_FEATURE_FILL_COLOR;
	const sanitizedData = (0, react$1.useMemo)(() => {
		if (data.length === 0) return {
			data,
			hasHtmlTooltips: false
		};
		const htmlTooltipIndices = [];
		for (let i = 0; i < data[0].length; i++) {
			const col = data[0][i];
			if (typeof col === "object" && col !== null && "role" in col && col.role === "tooltip" && "p" in col && typeof col.p === "object" && col.p !== null && "html" in col.p && col.p.html === true) htmlTooltipIndices.push(i);
		}
		if (htmlTooltipIndices.length === 0) return {
			data,
			hasHtmlTooltips: false
		};
		const sanitizedRows = data.slice(1).map((row) => {
			const newRow = [...row];
			for (const colIndex of htmlTooltipIndices) if (typeof newRow[colIndex] === "string") newRow[colIndex] = sanitizeHtml(newRow[colIndex]);
			return newRow;
		});
		return {
			data: [data[0], ...sanitizedRows],
			hasHtmlTooltips: true
		};
	}, [data]);
	const options = (0, react$1.useMemo)(() => ({
		...region !== "world" && { region },
		...resolution !== "countries" && { resolution },
		colorAxis: { colors: [lightColorHex, fullColorHex] },
		backgroundColor: backgroundColorHex,
		datalessRegionColor: defaultFillColorHex,
		defaultColor: defaultFillColorHex,
		tooltip: {
			trigger: "focus",
			isHtml: sanitizedData.hasHtmlTooltips
		},
		legend: "none",
		keepAspectRatio: true
	}), [
		region,
		resolution,
		lightColorHex,
		fullColorHex,
		backgroundColorHex,
		defaultFillColorHex,
		sanitizedData.hasHtmlTooltips
	]);
	const chartEvents = (0, react$1.useMemo)(() => {
		if (!onError) return;
		return [{
			eventName: "error",
			callback: ({ eventArgs }) => {
				onError(normalizeGeoChartError(eventArgs));
			}
		}];
	}, [onError]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Center, {
		ref: containerRef,
		className: (0, clsx.default)("geo-chart", geo_chart_module_default.container, className),
		style: {
			width,
			height,
			backgroundColor
		},
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react_google_charts.Chart, {
			chartType: "GeoChart",
			chartPackages: GEO_CHART_PACKAGES,
			width,
			height,
			data: sanitizedData.data,
			options,
			chartEvents,
			loader: loadingPlaceholder
		})
	});
};
const GeoChartWithProvider = (props) => {
	if ((0, react$1.useContext)(GlobalChartsContext)) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(GeoChartInternal, { ...props });
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(GlobalChartsProvider, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(GeoChartInternal, { ...props }) });
};
GeoChartWithProvider.displayName = "GeoChart";
const GeoChartResponsive = withResponsive(GeoChartWithProvider);
//#endregion
//#region src/charts/heatmap-chart/heatmap-chart.module.scss
var heatmap_chart_module_default = {
	"heatmap-chart": "a8ccharts-O3YMOW-heatmap-chart",
	"heatmap-chart__cell": "a8ccharts-O3YMOW-heatmap-chart__cell",
	"heatmap-chart__cell--filled": "a8ccharts-O3YMOW-heatmap-chart__cell--filled",
	"heatmap-chart__cell--hidden": "a8ccharts-O3YMOW-heatmap-chart__cell--hidden",
	"heatmap-chart__cell--selected": "a8ccharts-O3YMOW-heatmap-chart__cell--selected",
	"heatmap-chart__cell--strong": "a8ccharts-O3YMOW-heatmap-chart__cell--strong",
	"heatmap-chart__cell-value": "a8ccharts-O3YMOW-heatmap-chart__cell-value",
	"heatmap-chart__col-label": "a8ccharts-O3YMOW-heatmap-chart__col-label",
	"heatmap-chart__empty": "a8ccharts-O3YMOW-heatmap-chart__empty",
	"heatmap-chart__grid": "a8ccharts-O3YMOW-heatmap-chart__grid",
	"heatmap-chart__grid--compact": "a8ccharts-O3YMOW-heatmap-chart__grid--compact",
	"heatmap-chart__grid--height-capped": "a8ccharts-O3YMOW-heatmap-chart__grid--height-capped",
	"heatmap-chart__legend-swatch": "a8ccharts-O3YMOW-heatmap-chart__legend-swatch",
	"heatmap-chart__row": "a8ccharts-O3YMOW-heatmap-chart__row",
	"heatmap-chart__row-label": "a8ccharts-O3YMOW-heatmap-chart__row-label",
	"heatmap-chart--height-capped": "a8ccharts-O3YMOW-heatmap-chart--height-capped"
};
//#endregion
//#region src/charts/heatmap-chart/private/use-heatmap-colors.ts
const isPresent = (value) => value !== null && value !== void 0 && !isNaN(value);
/**
* Get the min and max values from heatmap data, ignoring null/NaN.
* @param data - The heatmap columns
* @return Tuple of [min, max] values
*/
const getValueExtent = (data) => {
	let min = Infinity;
	let max = -Infinity;
	for (const column of data) for (const cell of column.data) {
		if (!isPresent(cell.value)) continue;
		if (cell.value < min) min = cell.value;
		if (cell.value > max) max = cell.value;
	}
	if (min === Infinity) return [0, 0];
	return [min, max];
};
/**
* Normalize a value to 0–1 within the extent. A flat extent (min === max)
* maps to 1 — every cell is equally the "highest" — except an all-zero
* extent, which maps to 0 so a no-activity grid renders at the scale's
* bottom instead of full intensity.
*
* @param value  - The value to normalize
* @param extent - Tuple of [min, max] values for the normalization range
* @return Normalized value between 0 and 1
*/
const getNormalizedValue = (value, extent) => {
	const [min, max] = extent;
	if (min === max) return max === 0 ? 0 : 1;
	return Math.min(1, Math.max(0, (value - min) / (max - min)));
};
//#endregion
//#region src/charts/heatmap-chart/private/build-calendar-data.ts
/** Rows that get a weekday label (Mon, Wed, Fri with a Monday week start). */
const LABELLED_ROWS = [
	0,
	2,
	4
];
const toDate = (point) => {
	if (point.date instanceof Date && !isNaN(point.date.getTime())) return point.date;
	if (point.dateString) {
		const parsed = (0, date_fns.parseISO)(point.dateString);
		if (!isNaN(parsed.getTime())) return parsed;
	}
	return null;
};
const buildCalendarHeatmapData = (series, options = {}) => {
	const weekStartsOn = options.weekStartsOn ?? 1;
	const hideOutOfRangeDays = options.hideOutOfRangeDays ?? true;
	const entries = series.map((point) => ({
		date: toDate(point),
		value: point.value
	})).filter((entry) => entry.date !== null);
	if (!entries.length) return {
		data: [],
		rowLabels: []
	};
	const valueByDay = /* @__PURE__ */ new Map();
	let minDate = entries[0].date;
	let maxDate = entries[0].date;
	for (const { date, value } of entries) {
		valueByDay.set((0, date_fns.format)(date, "yyyy-MM-dd"), value);
		if (date < minDate) minDate = date;
		if (date > maxDate) maxDate = date;
	}
	const gridStart = (0, date_fns.startOfWeek)(minDate, { weekStartsOn });
	const weekCount = (0, date_fns.differenceInCalendarWeeks)(maxDate, gridStart, { weekStartsOn }) + 1;
	const minDayKey = (0, date_fns.format)(minDate, "yyyy-MM-dd");
	const maxDayKey = (0, date_fns.format)(maxDate, "yyyy-MM-dd");
	const rowLabels = Array.from({ length: 7 }, (_, row) => LABELLED_ROWS.includes(row) ? (0, date_fns.format)((0, date_fns.addDays)(gridStart, row), "EEE") : "");
	const MIN_FIRST_MONTH_WEEKS = 2;
	const firstMonth = gridStart.getMonth();
	let firstMonthWeeks = 0;
	while (firstMonthWeeks < weekCount && (0, date_fns.addDays)(gridStart, firstMonthWeeks * 7).getMonth() === firstMonth) firstMonthWeeks++;
	const showFirstMonthLabel = !(firstMonthWeeks < weekCount) || firstMonthWeeks >= MIN_FIRST_MONTH_WEEKS;
	const data = [];
	let previousMonth = -1;
	for (let week = 0; week < weekCount; week++) {
		const columnStart = (0, date_fns.addDays)(gridStart, week * 7);
		const month = columnStart.getMonth();
		const label = month !== previousMonth && (week !== 0 || showFirstMonthLabel) ? (0, date_fns.format)(columnStart, "MMM") : "";
		previousMonth = month;
		const cells = [];
		for (let row = 0; row < 7; row++) {
			const day = (0, date_fns.addDays)(gridStart, week * 7 + row);
			const key = (0, date_fns.format)(day, "yyyy-MM-dd");
			const cell = {
				label: (0, date_fns.format)(day, "EEE, MMM d, yyyy"),
				value: valueByDay.has(key) ? valueByDay.get(key) : null
			};
			if (hideOutOfRangeDays && (key < minDayKey || key > maxDayKey)) cell.hidden = true;
			cells.push(cell);
		}
		data.push({
			label,
			data: cells
		});
	}
	return {
		data,
		rowLabels
	};
};
//#endregion
//#region src/charts/heatmap-chart/private/heatmap-context.ts
/** Shared by the chart and legend without importing back from `heatmap-chart.tsx`. */
const HeatmapContext = (0, react$1.createContext)(null);
//#endregion
//#region src/charts/heatmap-chart/private/heatmap-legend.tsx
const HeatmapLegend = ({ steps = 5, lessLabel, moreLabel }) => {
	const context = (0, react$1.useContext)(HeatmapContext);
	const { legend, backgroundColor } = useGlobalChartsTheme();
	if (!context) return null;
	const { primaryColorHex } = context;
	const labelStyle = legend.labelStyles;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(Stack, {
		direction: "row",
		gap: "xs",
		align: "center",
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Text$2, {
				variant: "body-sm",
				style: labelStyle,
				children: lessLabel ?? (0, _wordpress_i18n.__)("Less", "jetpack-charts")
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Stack, {
				direction: "row",
				gap: "xs",
				children: Array.from({ length: steps }, (_, index) => {
					const intensity = steps <= 1 ? 1 : index / (steps - 1);
					return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						"aria-hidden": "true",
						className: heatmap_chart_module_default["heatmap-chart__legend-swatch"],
						style: {
							"--a8c-charts-color-heatmap-primary": primaryColorHex,
							"--a8c-charts-color-heatmap-background": backgroundColor,
							"--a8c-charts-heatmap-cell-intensity": intensity
						}
					}, index);
				})
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Text$2, {
				variant: "body-sm",
				style: labelStyle,
				children: moreLabel ?? (0, _wordpress_i18n.__)("More", "jetpack-charts")
			})
		]
	});
};
//#endregion
//#region src/charts/heatmap-chart/heatmap-chart.tsx
const CELL_MIX_FLOOR = .15;
const HeatmapChartInternal = ({ data, chartId: providedChartId, width = 0, height = 0, className, compact = false, showValues, maxCellWidth, maxCellHeight, minCellWidth, minCellHeight, rowLabels = [], primaryColor, gap = "md", withTooltips = false, renderTooltip, children }) => {
	const chartId = useChartId(providedChartId);
	const { getElementStyles, resolveThemeColor, theme } = useGlobalChartsContext();
	const { heatmapChart: heatmapChartSettings } = theme;
	const { nonLegendChildren } = useChartChildren(children, "HeatmapChart");
	const [selectedIndex, setSelectedIndex] = (0, react$1.useState)();
	const { tooltipOpen, tooltipLeft, tooltipTop, tooltipData, showTooltip, hideTooltip } = (0, _visx_tooltip.useTooltip)();
	const { containerRef, containerBounds, TooltipInPortal } = (0, _visx_tooltip.useTooltipInPortal)({
		detectBounds: true,
		scroll: true
	});
	const containerBoundsRef = (0, react$1.useRef)(containerBounds);
	containerBoundsRef.current = containerBounds;
	const { color: primaryColorHex } = getElementStyles({
		index: 0,
		overrideColor: primaryColor || heatmapChartSettings.primaryColor
	});
	const chartBackgroundHex = resolveThemeColor(theme.backgroundColor);
	const primaryHex = normalizeColorToHex(primaryColorHex);
	const cellHasLightText = (intensity) => isValidHexColor(primaryHex) && isValidHexColor(chartBackgroundHex) && prefersLightText(mixHexColors(primaryHex, chartBackgroundHex, 1 - (CELL_MIX_FLOOR + (1 - CELL_MIX_FLOOR) * intensity)));
	const extent = (0, react$1.useMemo)(() => getValueExtent(data), [data]);
	const heatmapContext = (0, react$1.useMemo)(() => ({
		extent,
		primaryColorHex
	}), [extent, primaryColorHex]);
	const columns = data.length;
	const rows = Math.max(0, ...data.map((column) => column.data.length));
	const { compactCellGap, compactCellSize } = heatmapChartSettings;
	const drawValues = showValues ?? !compact;
	const buildTooltipData = (0, react$1.useCallback)((columnIndex, rowIndex) => {
		const cell = data[columnIndex]?.data[rowIndex];
		return {
			value: cell?.value ?? null,
			rowLabel: rowLabels[rowIndex],
			columnLabel: data[columnIndex]?.label,
			cellLabel: cell?.label,
			row: rowIndex,
			column: columnIndex
		};
	}, [data, rowLabels]);
	const onChartBlur = (0, react$1.useCallback)(() => {
		setSelectedIndex(void 0);
		hideTooltip();
	}, [hideTooltip]);
	const isCellHidden = (0, react$1.useCallback)((col, row) => data[col]?.data[row]?.hidden === true, [data]);
	const onChartKeyDown = (0, react$1.useCallback)((event) => {
		if (![
			"ArrowLeft",
			"ArrowRight",
			"ArrowUp",
			"ArrowDown",
			"Escape",
			"Tab"
		].includes(event.key)) return;
		if (event.key === "Tab" || event.key === "Escape") {
			setSelectedIndex(void 0);
			hideTooltip();
			return;
		}
		event.preventDefault();
		if (selectedIndex === void 0) {
			for (let index = 0; index < columns * rows; index++) if (!isCellHidden(Math.floor(index / rows), index % rows)) {
				setSelectedIndex(index);
				return;
			}
			return;
		}
		let stepCol = 0;
		let stepRow = 0;
		if (event.key === "ArrowRight") stepCol = 1;
		else if (event.key === "ArrowLeft") stepCol = -1;
		else if (event.key === "ArrowDown") stepRow = 1;
		else if (event.key === "ArrowUp") stepRow = -1;
		let col = Math.floor(selectedIndex / rows);
		let row = selectedIndex % rows;
		do {
			col += stepCol;
			row += stepRow;
		} while (col >= 0 && col < columns && row >= 0 && row < rows && isCellHidden(col, row));
		if (col < 0 || col >= columns || row < 0 || row >= rows) return;
		setSelectedIndex(col * rows + row);
	}, [
		rows,
		columns,
		selectedIndex,
		hideTooltip,
		isCellHidden
	]);
	const handleCellMouseMove = (0, react$1.useCallback)((event) => {
		if (!withTooltips) return;
		const target = event.currentTarget;
		const columnIndex = Number(target.dataset.column);
		const rowIndex = Number(target.dataset.row);
		const bounds = containerBoundsRef.current;
		showTooltip({
			tooltipLeft: event.clientX - bounds.left,
			tooltipTop: event.clientY - bounds.top,
			tooltipData: buildTooltipData(columnIndex, rowIndex)
		});
	}, [
		withTooltips,
		showTooltip,
		buildTooltipData
	]);
	const handleCellMouseLeave = (0, react$1.useCallback)(() => {
		if (withTooltips && selectedIndex === void 0) hideTooltip();
	}, [
		withTooltips,
		selectedIndex,
		hideTooltip
	]);
	(0, react$1.useEffect)(() => {
		if (!withTooltips || selectedIndex === void 0) return;
		const col = Math.floor(selectedIndex / rows);
		const row = selectedIndex % rows;
		const rect = (typeof document !== "undefined" ? document.getElementById(`${chartId}-cell-${col}-${row}`) : null)?.getBoundingClientRect();
		const bounds = containerBoundsRef.current;
		showTooltip({
			tooltipLeft: rect ? rect.left + rect.width / 2 - bounds.left : 0,
			tooltipTop: rect ? rect.top + rect.height / 2 - bounds.top : 0,
			tooltipData: buildTooltipData(col, row)
		});
	}, [
		selectedIndex,
		withTooltips,
		rows,
		chartId,
		buildTooltipData,
		showTooltip
	]);
	const defaultRenderTooltip = (0, react$1.useCallback)((info) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: info.cellLabel || `${info.columnLabel ?? ""} ${info.rowLabel ?? ""}`.trim() }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { children: info.value === null ? (0, _wordpress_i18n.__)("No data", "jetpack-charts") : (0, _automattic_number_formatters.formatNumber)(info.value) })] }), []);
	if (!columns || !rows) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Center, {
		className: (0, clsx.default)("heatmap-chart", heatmap_chart_module_default["heatmap-chart"], className),
		style: {
			width: width || void 0,
			height: height || void 0
		},
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
			className: heatmap_chart_module_default["heatmap-chart__empty"],
			children: (0, _wordpress_i18n.__)("No data available", "jetpack-charts")
		})
	});
	const columnTrack = compact ? "var(--a8c-charts-dimension-heatmap-cell-size)" : `minmax(${minCellWidth ?? 0}px, ${maxCellWidth ? `${maxCellWidth}px` : "1fr"})`;
	const rowTrack = compact ? "var(--a8c-charts-dimension-heatmap-cell-size)" : `minmax(${minCellHeight ?? 0}px, ${maxCellHeight ? `${maxCellHeight}px` : "1fr"})`;
	const gridStyle = {
		"--a8c-charts-color-heatmap-primary": primaryColorHex,
		"--a8c-charts-color-heatmap-background": theme.backgroundColor,
		gridTemplateColumns: `auto repeat(${columns}, ${columnTrack})`,
		gridTemplateRows: `auto repeat(${rows}, ${rowTrack})`
	};
	if (compact) {
		gridStyle["--a8c-charts-dimension-heatmap-cell-gap"] = `${compactCellGap}px`;
		gridStyle["--a8c-charts-dimension-heatmap-cell-size"] = `${compactCellSize}px`;
	}
	const activeDescendant = selectedIndex !== void 0 ? `${chartId}-cell-${Math.floor(selectedIndex / rows)}-${selectedIndex % rows}` : void 0;
	const heightCapped = !compact && Boolean(maxCellHeight);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(HeatmapContext.Provider, {
		value: heatmapContext,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SingleChartContext.Provider, {
			value: { chartId },
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(ChartLayout, {
				legendPosition: "bottom",
				legendChildren: [],
				trailingContent: nonLegendChildren,
				gap,
				className: (0, clsx.default)("heatmap-chart", heatmap_chart_module_default["heatmap-chart"], className, { [heatmap_chart_module_default["heatmap-chart--height-capped"]]: heightCapped }),
				style: {
					width: width || void 0,
					height: height || void 0
				},
				"data-chart-id": `heatmap-chart-${chartId}`,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					ref: containerRef,
					role: "grid",
					"aria-label": (0, _wordpress_i18n.__)("Heatmap chart", "jetpack-charts"),
					"aria-rowcount": rows,
					"aria-colcount": columns,
					"aria-activedescendant": activeDescendant,
					tabIndex: 0,
					onBlur: onChartBlur,
					onKeyDown: onChartKeyDown,
					className: (0, clsx.default)(heatmap_chart_module_default["heatmap-chart__grid"], {
						[heatmap_chart_module_default["heatmap-chart__grid--compact"]]: compact,
						[heatmap_chart_module_default["heatmap-chart__grid--height-capped"]]: heightCapped
					}),
					style: gridStyle,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						role: "row",
						"aria-hidden": "true",
						className: heatmap_chart_module_default["heatmap-chart__row"],
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {}), data.map((column, columnIndex) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: heatmap_chart_module_default["heatmap-chart__col-label"],
							children: column.label
						}, `col-${columnIndex}`))]
					}), Array.from({ length: rows }).map((_row, rowIndex) => {
						const labelVisible = !compact || rowIndex % 2 === 0;
						return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							role: "row",
							"aria-rowindex": rowIndex + 1,
							className: heatmap_chart_module_default["heatmap-chart__row"],
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								"aria-hidden": "true",
								className: heatmap_chart_module_default["heatmap-chart__row-label"],
								children: labelVisible ? rowLabels[rowIndex] ?? "" : ""
							}), data.map((column, columnIndex) => {
								const cell = column.data[rowIndex];
								if (cell?.hidden) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									"aria-hidden": "true",
									className: (0, clsx.default)(heatmap_chart_module_default["heatmap-chart__cell"], heatmap_chart_module_default["heatmap-chart__cell--hidden"])
								}, `cell-${columnIndex}-${rowIndex}`);
								const value = cell?.value ?? null;
								const present = isPresent(value);
								const normalized = present ? getNormalizedValue(value, extent) : 0;
								const flatIndex = columnIndex * rows + rowIndex;
								const info = buildTooltipData(columnIndex, rowIndex);
								const accessibleLabel = `${info.cellLabel || `${info.columnLabel ?? ""} ${info.rowLabel ?? ""}`.trim()}: ${info.value === null ? (0, _wordpress_i18n.__)("No data", "jetpack-charts") : (0, _automattic_number_formatters.formatNumber)(info.value)}`;
								return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									id: `${chartId}-cell-${columnIndex}-${rowIndex}`,
									role: "gridcell",
									tabIndex: -1,
									"aria-colindex": columnIndex + 1,
									"aria-label": accessibleLabel,
									"data-column": columnIndex,
									"data-row": rowIndex,
									className: (0, clsx.default)(heatmap_chart_module_default["heatmap-chart__cell"], {
										[heatmap_chart_module_default["heatmap-chart__cell--filled"]]: present,
										[heatmap_chart_module_default["heatmap-chart__cell--strong"]]: present && cellHasLightText(normalized),
										[heatmap_chart_module_default["heatmap-chart__cell--selected"]]: selectedIndex === flatIndex
									}),
									style: present ? { "--a8c-charts-heatmap-cell-intensity": normalized } : void 0,
									onMouseMove: handleCellMouseMove,
									onMouseLeave: handleCellMouseLeave,
									children: drawValues && present && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: heatmap_chart_module_default["heatmap-chart__cell-value"],
										children: (0, _automattic_number_formatters.formatNumberCompact)(value)
									})
								}, `cell-${columnIndex}-${rowIndex}`);
							})]
						}, `row-${rowIndex}`);
					})]
				}), withTooltips && tooltipOpen && tooltipData && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TooltipInPortal, {
					top: tooltipTop,
					left: tooltipLeft,
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						role: "tooltip",
						tabIndex: -1,
						children: (renderTooltip ?? defaultRenderTooltip)(tooltipData)
					})
				})]
			})
		})
	});
};
const HeatmapChartWithProvider = (props) => {
	if ((0, react$1.useContext)(GlobalChartsContext)) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(HeatmapChartInternal, { ...props });
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(GlobalChartsProvider, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(HeatmapChartInternal, { ...props }) });
};
HeatmapChartWithProvider.displayName = "HeatmapChart";
const HeatmapChart = attachSubComponents(HeatmapChartWithProvider, { Legend: HeatmapLegend });
const HeatmapChartResponsiveInner = (props) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(HeatmapChartWithProvider, {
	...props,
	width: void 0,
	height: void 0
});
HeatmapChartResponsiveInner.displayName = "HeatmapChart";
const HeatmapChartResponsive = attachSubComponents(withResponsive(HeatmapChartResponsiveInner), { Legend: HeatmapLegend });
//#endregion
//#region ../../../node_modules/.pnpm/@wordpress+components@37.0.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/utils/hooks/use-update-effect.mjs
function useUpdateEffect(effect, deps) {
	const mountedRef = (0, react$1.useRef)(false);
	(0, react$1.useEffect)(() => {
		if (mountedRef.current) return effect();
		mountedRef.current = true;
	}, deps);
	(0, react$1.useEffect)(() => () => {
		mountedRef.current = false;
	}, []);
}
var use_update_effect_default = useUpdateEffect;
//#endregion
//#region ../../../node_modules/.pnpm/@emotion+sheet@1.4.0/node_modules/@emotion/sheet/dist/emotion-sheet.esm.js
function sheetForTag(tag) {
	if (tag.sheet) return tag.sheet;
	/* istanbul ignore next */
	for (var i = 0; i < document.styleSheets.length; i++) if (document.styleSheets[i].ownerNode === tag) return document.styleSheets[i];
}
function createStyleElement(options) {
	var tag = document.createElement("style");
	tag.setAttribute("data-emotion", options.key);
	if (options.nonce !== void 0) tag.setAttribute("nonce", options.nonce);
	tag.appendChild(document.createTextNode(""));
	tag.setAttribute("data-s", "");
	return tag;
}
var StyleSheet = /*#__PURE__*/ function() {
	function StyleSheet(options) {
		var _this = this;
		this._insertTag = function(tag) {
			var before;
			if (_this.tags.length === 0) if (_this.insertionPoint) before = _this.insertionPoint.nextSibling;
			else if (_this.prepend) before = _this.container.firstChild;
			else before = _this.before;
			else before = _this.tags[_this.tags.length - 1].nextSibling;
			_this.container.insertBefore(tag, before);
			_this.tags.push(tag);
		};
		this.isSpeedy = options.speedy === void 0 ? true : options.speedy;
		this.tags = [];
		this.ctr = 0;
		this.nonce = options.nonce;
		this.key = options.key;
		this.container = options.container;
		this.prepend = options.prepend;
		this.insertionPoint = options.insertionPoint;
		this.before = null;
	}
	var _proto = StyleSheet.prototype;
	_proto.hydrate = function hydrate(nodes) {
		nodes.forEach(this._insertTag);
	};
	_proto.insert = function insert(rule) {
		if (this.ctr % (this.isSpeedy ? 65e3 : 1) === 0) this._insertTag(createStyleElement(this));
		var tag = this.tags[this.tags.length - 1];
		if (this.isSpeedy) {
			var sheet = sheetForTag(tag);
			try {
				sheet.insertRule(rule, sheet.cssRules.length);
			} catch (e) {}
		} else tag.appendChild(document.createTextNode(rule));
		this.ctr++;
	};
	_proto.flush = function flush() {
		this.tags.forEach(function(tag) {
			var _tag$parentNode;
			return (_tag$parentNode = tag.parentNode) == null ? void 0 : _tag$parentNode.removeChild(tag);
		});
		this.tags = [];
		this.ctr = 0;
	};
	return StyleSheet;
}();
//#endregion
//#region ../../../node_modules/.pnpm/stylis@4.2.0/node_modules/stylis/src/Enum.js
var MS = "-ms-";
var MOZ = "-moz-";
var WEBKIT = "-webkit-";
var COMMENT = "comm";
var RULESET = "rule";
var DECLARATION = "decl";
var IMPORT = "@import";
var KEYFRAMES = "@keyframes";
var LAYER = "@layer";
//#endregion
//#region ../../../node_modules/.pnpm/stylis@4.2.0/node_modules/stylis/src/Utility.js
/**
* @param {number}
* @return {number}
*/
var abs = Math.abs;
/**
* @param {number}
* @return {string}
*/
var from = String.fromCharCode;
/**
* @param {object}
* @return {object}
*/
var assign = Object.assign;
/**
* @param {string} value
* @param {number} length
* @return {number}
*/
function hash(value, length) {
	return charat(value, 0) ^ 45 ? (((length << 2 ^ charat(value, 0)) << 2 ^ charat(value, 1)) << 2 ^ charat(value, 2)) << 2 ^ charat(value, 3) : 0;
}
/**
* @param {string} value
* @return {string}
*/
function trim(value) {
	return value.trim();
}
/**
* @param {string} value
* @param {RegExp} pattern
* @return {string?}
*/
function match(value, pattern) {
	return (value = pattern.exec(value)) ? value[0] : value;
}
/**
* @param {string} value
* @param {(string|RegExp)} pattern
* @param {string} replacement
* @return {string}
*/
function replace(value, pattern, replacement) {
	return value.replace(pattern, replacement);
}
/**
* @param {string} value
* @param {string} search
* @return {number}
*/
function indexof(value, search) {
	return value.indexOf(search);
}
/**
* @param {string} value
* @param {number} index
* @return {number}
*/
function charat(value, index) {
	return value.charCodeAt(index) | 0;
}
/**
* @param {string} value
* @param {number} begin
* @param {number} end
* @return {string}
*/
function substr(value, begin, end) {
	return value.slice(begin, end);
}
/**
* @param {string} value
* @return {number}
*/
function strlen(value) {
	return value.length;
}
/**
* @param {any[]} value
* @return {number}
*/
function sizeof(value) {
	return value.length;
}
/**
* @param {any} value
* @param {any[]} array
* @return {any}
*/
function append(value, array) {
	return array.push(value), value;
}
/**
* @param {string[]} array
* @param {function} callback
* @return {string}
*/
function combine(array, callback) {
	return array.map(callback).join("");
}
//#endregion
//#region ../../../node_modules/.pnpm/stylis@4.2.0/node_modules/stylis/src/Tokenizer.js
var line = 1;
var column = 1;
var length = 0;
var position = 0;
var character = 0;
var characters = "";
/**
* @param {string} value
* @param {object | null} root
* @param {object | null} parent
* @param {string} type
* @param {string[] | string} props
* @param {object[] | string} children
* @param {number} length
*/
function node(value, root, parent, type, props, children, length) {
	return {
		value,
		root,
		parent,
		type,
		props,
		children,
		line,
		column,
		length,
		return: ""
	};
}
/**
* @param {object} root
* @param {object} props
* @return {object}
*/
function copy(root, props) {
	return assign(node("", null, null, "", null, null, 0), root, { length: -root.length }, props);
}
/**
* @return {number}
*/
function char() {
	return character;
}
/**
* @return {number}
*/
function prev() {
	character = position > 0 ? charat(characters, --position) : 0;
	if (column--, character === 10) column = 1, line--;
	return character;
}
/**
* @return {number}
*/
function next() {
	character = position < length ? charat(characters, position++) : 0;
	if (column++, character === 10) column = 1, line++;
	return character;
}
/**
* @return {number}
*/
function peek() {
	return charat(characters, position);
}
/**
* @return {number}
*/
function caret() {
	return position;
}
/**
* @param {number} begin
* @param {number} end
* @return {string}
*/
function slice(begin, end) {
	return substr(characters, begin, end);
}
/**
* @param {number} type
* @return {number}
*/
function token(type) {
	switch (type) {
		case 0:
		case 9:
		case 10:
		case 13:
		case 32: return 5;
		case 33:
		case 43:
		case 44:
		case 47:
		case 62:
		case 64:
		case 126:
		case 59:
		case 123:
		case 125: return 4;
		case 58: return 3;
		case 34:
		case 39:
		case 40:
		case 91: return 2;
		case 41:
		case 93: return 1;
	}
	return 0;
}
/**
* @param {string} value
* @return {any[]}
*/
function alloc(value) {
	return line = column = 1, length = strlen(characters = value), position = 0, [];
}
/**
* @param {any} value
* @return {any}
*/
function dealloc(value) {
	return characters = "", value;
}
/**
* @param {number} type
* @return {string}
*/
function delimit(type) {
	return trim(slice(position - 1, delimiter(type === 91 ? type + 2 : type === 40 ? type + 1 : type)));
}
/**
* @param {number} type
* @return {string}
*/
function whitespace(type) {
	while (character = peek()) if (character < 33) next();
	else break;
	return token(type) > 2 || token(character) > 3 ? "" : " ";
}
/**
* @param {number} index
* @param {number} count
* @return {string}
*/
function escaping(index, count) {
	while (--count && next()) if (character < 48 || character > 102 || character > 57 && character < 65 || character > 70 && character < 97) break;
	return slice(index, caret() + (count < 6 && peek() == 32 && next() == 32));
}
/**
* @param {number} type
* @return {number}
*/
function delimiter(type) {
	while (next()) switch (character) {
		case type: return position;
		case 34:
		case 39:
			if (type !== 34 && type !== 39) delimiter(character);
			break;
		case 40:
			if (type === 41) delimiter(type);
			break;
		case 92:
			next();
			break;
	}
	return position;
}
/**
* @param {number} type
* @param {number} index
* @return {number}
*/
function commenter(type, index) {
	while (next()) if (type + character === 57) break;
	else if (type + character === 84 && peek() === 47) break;
	return "/*" + slice(index, position - 1) + "*" + from(type === 47 ? type : next());
}
/**
* @param {number} index
* @return {string}
*/
function identifier(index) {
	while (!token(peek())) next();
	return slice(index, position);
}
//#endregion
//#region ../../../node_modules/.pnpm/stylis@4.2.0/node_modules/stylis/src/Parser.js
/**
* @param {string} value
* @return {object[]}
*/
function compile(value) {
	return dealloc(parse("", null, null, null, [""], value = alloc(value), 0, [0], value));
}
/**
* @param {string} value
* @param {object} root
* @param {object?} parent
* @param {string[]} rule
* @param {string[]} rules
* @param {string[]} rulesets
* @param {number[]} pseudo
* @param {number[]} points
* @param {string[]} declarations
* @return {object}
*/
function parse(value, root, parent, rule, rules, rulesets, pseudo, points, declarations) {
	var index = 0;
	var offset = 0;
	var length = pseudo;
	var atrule = 0;
	var property = 0;
	var previous = 0;
	var variable = 1;
	var scanning = 1;
	var ampersand = 1;
	var character = 0;
	var type = "";
	var props = rules;
	var children = rulesets;
	var reference = rule;
	var characters = type;
	while (scanning) switch (previous = character, character = next()) {
		case 40: if (previous != 108 && charat(characters, length - 1) == 58) {
			if (indexof(characters += replace(delimit(character), "&", "&\f"), "&\f") != -1) ampersand = -1;
			break;
		}
		case 34:
		case 39:
		case 91:
			characters += delimit(character);
			break;
		case 9:
		case 10:
		case 13:
		case 32:
			characters += whitespace(previous);
			break;
		case 92:
			characters += escaping(caret() - 1, 7);
			continue;
		case 47:
			switch (peek()) {
				case 42:
				case 47:
					append(comment(commenter(next(), caret()), root, parent), declarations);
					break;
				default: characters += "/";
			}
			break;
		case 123 * variable: points[index++] = strlen(characters) * ampersand;
		case 125 * variable:
		case 59:
		case 0:
			switch (character) {
				case 0:
				case 125: scanning = 0;
				case 59 + offset:
					if (ampersand == -1) characters = replace(characters, /\f/g, "");
					if (property > 0 && strlen(characters) - length) append(property > 32 ? declaration(characters + ";", rule, parent, length - 1) : declaration(replace(characters, " ", "") + ";", rule, parent, length - 2), declarations);
					break;
				case 59: characters += ";";
				default:
					append(reference = ruleset(characters, root, parent, index, offset, rules, points, type, props = [], children = [], length), rulesets);
					if (character === 123) if (offset === 0) parse(characters, root, reference, reference, props, rulesets, length, points, children);
					else switch (atrule === 99 && charat(characters, 3) === 110 ? 100 : atrule) {
						case 100:
						case 108:
						case 109:
						case 115:
							parse(value, reference, reference, rule && append(ruleset(value, reference, reference, 0, 0, rules, points, type, rules, props = [], length), children), rules, children, length, points, rule ? props : children);
							break;
						default: parse(characters, reference, reference, reference, [""], children, 0, points, children);
					}
			}
			index = offset = property = 0, variable = ampersand = 1, type = characters = "", length = pseudo;
			break;
		case 58: length = 1 + strlen(characters), property = previous;
		default:
			if (variable < 1) {
				if (character == 123) --variable;
				else if (character == 125 && variable++ == 0 && prev() == 125) continue;
			}
			switch (characters += from(character), character * variable) {
				case 38:
					ampersand = offset > 0 ? 1 : (characters += "\f", -1);
					break;
				case 44:
					points[index++] = (strlen(characters) - 1) * ampersand, ampersand = 1;
					break;
				case 64:
					if (peek() === 45) characters += delimit(next());
					atrule = peek(), offset = length = strlen(type = characters += identifier(caret())), character++;
					break;
				case 45: if (previous === 45 && strlen(characters) == 2) variable = 0;
			}
	}
	return rulesets;
}
/**
* @param {string} value
* @param {object} root
* @param {object?} parent
* @param {number} index
* @param {number} offset
* @param {string[]} rules
* @param {number[]} points
* @param {string} type
* @param {string[]} props
* @param {string[]} children
* @param {number} length
* @return {object}
*/
function ruleset(value, root, parent, index, offset, rules, points, type, props, children, length) {
	var post = offset - 1;
	var rule = offset === 0 ? rules : [""];
	var size = sizeof(rule);
	for (var i = 0, j = 0, k = 0; i < index; ++i) for (var x = 0, y = substr(value, post + 1, post = abs(j = points[i])), z = value; x < size; ++x) if (z = trim(j > 0 ? rule[x] + " " + y : replace(y, /&\f/g, rule[x]))) props[k++] = z;
	return node(value, root, parent, offset === 0 ? RULESET : type, props, children, length);
}
/**
* @param {number} value
* @param {object} root
* @param {object?} parent
* @return {object}
*/
function comment(value, root, parent) {
	return node(value, root, parent, COMMENT, from(char()), substr(value, 2, -2), 0);
}
/**
* @param {string} value
* @param {object} root
* @param {object?} parent
* @param {number} length
* @return {object}
*/
function declaration(value, root, parent, length) {
	return node(value, root, parent, DECLARATION, substr(value, 0, length), substr(value, length + 1, -1), length);
}
//#endregion
//#region ../../../node_modules/.pnpm/stylis@4.2.0/node_modules/stylis/src/Serializer.js
/**
* @param {object[]} children
* @param {function} callback
* @return {string}
*/
function serialize(children, callback) {
	var output = "";
	var length = sizeof(children);
	for (var i = 0; i < length; i++) output += callback(children[i], i, children, callback) || "";
	return output;
}
/**
* @param {object} element
* @param {number} index
* @param {object[]} children
* @param {function} callback
* @return {string}
*/
function stringify(element, index, children, callback) {
	switch (element.type) {
		case LAYER: if (element.children.length) break;
		case IMPORT:
		case DECLARATION: return element.return = element.return || element.value;
		case COMMENT: return "";
		case KEYFRAMES: return element.return = element.value + "{" + serialize(element.children, callback) + "}";
		case RULESET: element.value = element.props.join(",");
	}
	return strlen(children = serialize(element.children, callback)) ? element.return = element.value + "{" + children + "}" : "";
}
//#endregion
//#region ../../../node_modules/.pnpm/stylis@4.2.0/node_modules/stylis/src/Middleware.js
/**
* @param {function[]} collection
* @return {function}
*/
function middleware(collection) {
	var length = sizeof(collection);
	return function(element, index, children, callback) {
		var output = "";
		for (var i = 0; i < length; i++) output += collection[i](element, index, children, callback) || "";
		return output;
	};
}
/**
* @param {function} callback
* @return {function}
*/
function rulesheet(callback) {
	return function(element) {
		if (!element.root) {
			if (element = element.return) callback(element);
		}
	};
}
//#endregion
//#region ../../../node_modules/.pnpm/@emotion+weak-memoize@0.4.0/node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.esm.js
var weakMemoize = function weakMemoize(func) {
	var cache = /* @__PURE__ */ new WeakMap();
	return function(arg) {
		if (cache.has(arg)) return cache.get(arg);
		var ret = func(arg);
		cache.set(arg, ret);
		return ret;
	};
};
//#endregion
//#region ../../../node_modules/.pnpm/@emotion+memoize@0.9.0/node_modules/@emotion/memoize/dist/emotion-memoize.esm.js
function memoize(fn) {
	var cache = Object.create(null);
	return function(arg) {
		if (cache[arg] === void 0) cache[arg] = fn(arg);
		return cache[arg];
	};
}
//#endregion
//#region ../../../node_modules/.pnpm/@emotion+cache@11.14.0/node_modules/@emotion/cache/dist/emotion-cache.esm.js
var isBrowser$3 = typeof document !== "undefined";
var identifierWithPointTracking = function identifierWithPointTracking(begin, points, index) {
	var previous = 0;
	var character = 0;
	while (true) {
		previous = character;
		character = peek();
		if (previous === 38 && character === 12) points[index] = 1;
		if (token(character)) break;
		next();
	}
	return slice(begin, position);
};
var toRules = function toRules(parsed, points) {
	var index = -1;
	var character = 44;
	do
		switch (token(character)) {
			case 0:
				if (character === 38 && peek() === 12) points[index] = 1;
				parsed[index] += identifierWithPointTracking(position - 1, points, index);
				break;
			case 2:
				parsed[index] += delimit(character);
				break;
			case 4: if (character === 44) {
				parsed[++index] = peek() === 58 ? "&\f" : "";
				points[index] = parsed[index].length;
				break;
			}
			default: parsed[index] += from(character);
		}
	while (character = next());
	return parsed;
};
var getRules = function getRules(value, points) {
	return dealloc(toRules(alloc(value), points));
};
var fixedElements = /* #__PURE__ */ new WeakMap();
var compat = function compat(element) {
	if (element.type !== "rule" || !element.parent || element.length < 1) return;
	var value = element.value;
	var parent = element.parent;
	var isImplicitRule = element.column === parent.column && element.line === parent.line;
	while (parent.type !== "rule") {
		parent = parent.parent;
		if (!parent) return;
	}
	if (element.props.length === 1 && value.charCodeAt(0) !== 58 && !fixedElements.get(parent)) return;
	if (isImplicitRule) return;
	fixedElements.set(element, true);
	var points = [];
	var rules = getRules(value, points);
	var parentRules = parent.props;
	for (var i = 0, k = 0; i < rules.length; i++) for (var j = 0; j < parentRules.length; j++, k++) element.props[k] = points[i] ? rules[i].replace(/&\f/g, parentRules[j]) : parentRules[j] + " " + rules[i];
};
var removeLabel = function removeLabel(element) {
	if (element.type === "decl") {
		var value = element.value;
		if (value.charCodeAt(0) === 108 && value.charCodeAt(2) === 98) {
			element["return"] = "";
			element.value = "";
		}
	}
};
function prefix(value, length) {
	switch (hash(value, length)) {
		case 5103: return WEBKIT + "print-" + value + value;
		case 5737:
		case 4201:
		case 3177:
		case 3433:
		case 1641:
		case 4457:
		case 2921:
		case 5572:
		case 6356:
		case 5844:
		case 3191:
		case 6645:
		case 3005:
		case 6391:
		case 5879:
		case 5623:
		case 6135:
		case 4599:
		case 4855:
		case 4215:
		case 6389:
		case 5109:
		case 5365:
		case 5621:
		case 3829: return WEBKIT + value + value;
		case 5349:
		case 4246:
		case 4810:
		case 6968:
		case 2756: return WEBKIT + value + MOZ + value + MS + value + value;
		case 6828:
		case 4268: return WEBKIT + value + MS + value + value;
		case 6165: return WEBKIT + value + MS + "flex-" + value + value;
		case 5187: return WEBKIT + value + replace(value, /(\w+).+(:[^]+)/, WEBKIT + "box-$1$2" + MS + "flex-$1$2") + value;
		case 5443: return WEBKIT + value + MS + "flex-item-" + replace(value, /flex-|-self/, "") + value;
		case 4675: return WEBKIT + value + MS + "flex-line-pack" + replace(value, /align-content|flex-|-self/, "") + value;
		case 5548: return WEBKIT + value + MS + replace(value, "shrink", "negative") + value;
		case 5292: return WEBKIT + value + MS + replace(value, "basis", "preferred-size") + value;
		case 6060: return WEBKIT + "box-" + replace(value, "-grow", "") + WEBKIT + value + MS + replace(value, "grow", "positive") + value;
		case 4554: return WEBKIT + replace(value, /([^-])(transform)/g, "$1" + WEBKIT + "$2") + value;
		case 6187: return replace(replace(replace(value, /(zoom-|grab)/, WEBKIT + "$1"), /(image-set)/, WEBKIT + "$1"), value, "") + value;
		case 5495:
		case 3959: return replace(value, /(image-set\([^]*)/, WEBKIT + "$1$`$1");
		case 4968: return replace(replace(value, /(.+:)(flex-)?(.*)/, WEBKIT + "box-pack:$3" + MS + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + WEBKIT + value + value;
		case 4095:
		case 3583:
		case 4068:
		case 2532: return replace(value, /(.+)-inline(.+)/, WEBKIT + "$1$2") + value;
		case 8116:
		case 7059:
		case 5753:
		case 5535:
		case 5445:
		case 5701:
		case 4933:
		case 4677:
		case 5533:
		case 5789:
		case 5021:
		case 4765:
			if (strlen(value) - 1 - length > 6) switch (charat(value, length + 1)) {
				case 109: if (charat(value, length + 4) !== 45) break;
				case 102: return replace(value, /(.+:)(.+)-([^]+)/, "$1" + WEBKIT + "$2-$3$1" + MOZ + (charat(value, length + 3) == 108 ? "$3" : "$2-$3")) + value;
				case 115: return ~indexof(value, "stretch") ? prefix(replace(value, "stretch", "fill-available"), length) + value : value;
			}
			break;
		case 4949: if (charat(value, length + 1) !== 115) break;
		case 6444:
			switch (charat(value, strlen(value) - 3 - (~indexof(value, "!important") && 10))) {
				case 107: return replace(value, ":", ":" + WEBKIT) + value;
				case 101: return replace(value, /(.+:)([^;!]+)(;|!.+)?/, "$1" + WEBKIT + (charat(value, 14) === 45 ? "inline-" : "") + "box$3$1" + WEBKIT + "$2$3$1" + MS + "$2box$3") + value;
			}
			break;
		case 5936:
			switch (charat(value, length + 11)) {
				case 114: return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "tb") + value;
				case 108: return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "tb-rl") + value;
				case 45: return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "lr") + value;
			}
			return WEBKIT + value + MS + value + value;
	}
	return value;
}
var prefixer = function prefixer(element, index, children, callback) {
	if (element.length > -1) {
		if (!element["return"]) switch (element.type) {
			case DECLARATION:
				element["return"] = prefix(element.value, element.length);
				break;
			case KEYFRAMES: return serialize([copy(element, { value: replace(element.value, "@", "@" + WEBKIT) })], callback);
			case RULESET: if (element.length) return combine(element.props, function(value) {
				switch (match(value, /(::plac\w+|:read-\w+)/)) {
					case ":read-only":
					case ":read-write": return serialize([copy(element, { props: [replace(value, /:(read-\w+)/, ":" + MOZ + "$1")] })], callback);
					case "::placeholder": return serialize([
						copy(element, { props: [replace(value, /:(plac\w+)/, ":" + WEBKIT + "input-$1")] }),
						copy(element, { props: [replace(value, /:(plac\w+)/, ":" + MOZ + "$1")] }),
						copy(element, { props: [replace(value, /:(plac\w+)/, MS + "input-$1")] })
					], callback);
				}
				return "";
			});
		}
	}
};
var getServerStylisCache = isBrowser$3 ? void 0 : weakMemoize(function() {
	return memoize(function() {
		return {};
	});
});
var defaultStylisPlugins = [prefixer];
var createCache = function createCache(options) {
	var key = options.key;
	if (isBrowser$3 && key === "css") {
		var ssrStyles = document.querySelectorAll("style[data-emotion]:not([data-s])");
		Array.prototype.forEach.call(ssrStyles, function(node) {
			if (node.getAttribute("data-emotion").indexOf(" ") === -1) return;
			document.head.appendChild(node);
			node.setAttribute("data-s", "");
		});
	}
	var stylisPlugins = options.stylisPlugins || defaultStylisPlugins;
	var inserted = {};
	var container;
	var nodesToHydrate = [];
	if (isBrowser$3) {
		container = options.container || document.head;
		Array.prototype.forEach.call(document.querySelectorAll("style[data-emotion^=\"" + key + " \"]"), function(node) {
			var attrib = node.getAttribute("data-emotion").split(" ");
			for (var i = 1; i < attrib.length; i++) inserted[attrib[i]] = true;
			nodesToHydrate.push(node);
		});
	}
	var _insert;
	var omnipresentPlugins = [compat, removeLabel];
	if (!getServerStylisCache) {
		var currentSheet;
		var finalizingPlugins = [stringify, rulesheet(function(rule) {
			currentSheet.insert(rule);
		})];
		var serializer = middleware(omnipresentPlugins.concat(stylisPlugins, finalizingPlugins));
		var stylis = function stylis(styles) {
			return serialize(compile(styles), serializer);
		};
		_insert = function insert(selector, serialized, sheet, shouldCache) {
			currentSheet = sheet;
			stylis(selector ? selector + "{" + serialized.styles + "}" : serialized.styles);
			if (shouldCache) cache.inserted[serialized.name] = true;
		};
	} else {
		var _finalizingPlugins = [stringify];
		var _serializer = middleware(omnipresentPlugins.concat(stylisPlugins, _finalizingPlugins));
		var _stylis = function _stylis(styles) {
			return serialize(compile(styles), _serializer);
		};
		var serverStylisCache = getServerStylisCache(stylisPlugins)(key);
		var getRules = function getRules(selector, serialized) {
			var name = serialized.name;
			if (serverStylisCache[name] === void 0) serverStylisCache[name] = _stylis(selector ? selector + "{" + serialized.styles + "}" : serialized.styles);
			return serverStylisCache[name];
		};
		_insert = function _insert(selector, serialized, sheet, shouldCache) {
			var name = serialized.name;
			var rules = getRules(selector, serialized);
			if (cache.compat === void 0) {
				if (shouldCache) cache.inserted[name] = true;
				return rules;
			} else if (shouldCache) cache.inserted[name] = rules;
			else return rules;
		};
	}
	var cache = {
		key,
		sheet: new StyleSheet({
			key,
			container,
			nonce: options.nonce,
			speedy: options.speedy,
			prepend: options.prepend,
			insertionPoint: options.insertionPoint
		}),
		nonce: options.nonce,
		inserted,
		registered: {},
		insert: _insert
	};
	cache.sheet.hydrate(nodesToHydrate);
	return cache;
};
//#endregion
//#region ../../../node_modules/.pnpm/react-is@16.13.1/node_modules/react-is/cjs/react-is.production.min.js
/** @license React v16.13.1
* react-is.production.min.js
*
* Copyright (c) Facebook, Inc. and its affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_is_production_min = /* @__PURE__ */ __commonJSMin(((exports) => {
	var b = "function" === typeof Symbol && Symbol.for;
	var c = b ? Symbol.for("react.element") : 60103;
	var d = b ? Symbol.for("react.portal") : 60106;
	var e = b ? Symbol.for("react.fragment") : 60107;
	var f = b ? Symbol.for("react.strict_mode") : 60108;
	var g = b ? Symbol.for("react.profiler") : 60114;
	var h = b ? Symbol.for("react.provider") : 60109;
	var k = b ? Symbol.for("react.context") : 60110;
	var l = b ? Symbol.for("react.async_mode") : 60111;
	var m = b ? Symbol.for("react.concurrent_mode") : 60111;
	var n = b ? Symbol.for("react.forward_ref") : 60112;
	var p = b ? Symbol.for("react.suspense") : 60113;
	var q = b ? Symbol.for("react.suspense_list") : 60120;
	var r = b ? Symbol.for("react.memo") : 60115;
	var t = b ? Symbol.for("react.lazy") : 60116;
	var v = b ? Symbol.for("react.block") : 60121;
	var w = b ? Symbol.for("react.fundamental") : 60117;
	var x = b ? Symbol.for("react.responder") : 60118;
	var y = b ? Symbol.for("react.scope") : 60119;
	function z(a) {
		if ("object" === typeof a && null !== a) {
			var u = a.$$typeof;
			switch (u) {
				case c: switch (a = a.type, a) {
					case l:
					case m:
					case e:
					case g:
					case f:
					case p: return a;
					default: switch (a = a && a.$$typeof, a) {
						case k:
						case n:
						case t:
						case r:
						case h: return a;
						default: return u;
					}
				}
				case d: return u;
			}
		}
	}
	function A(a) {
		return z(a) === m;
	}
	exports.AsyncMode = l;
	exports.ConcurrentMode = m;
	exports.ContextConsumer = k;
	exports.ContextProvider = h;
	exports.Element = c;
	exports.ForwardRef = n;
	exports.Fragment = e;
	exports.Lazy = t;
	exports.Memo = r;
	exports.Portal = d;
	exports.Profiler = g;
	exports.StrictMode = f;
	exports.Suspense = p;
	exports.isAsyncMode = function(a) {
		return A(a) || z(a) === l;
	};
	exports.isConcurrentMode = A;
	exports.isContextConsumer = function(a) {
		return z(a) === k;
	};
	exports.isContextProvider = function(a) {
		return z(a) === h;
	};
	exports.isElement = function(a) {
		return "object" === typeof a && null !== a && a.$$typeof === c;
	};
	exports.isForwardRef = function(a) {
		return z(a) === n;
	};
	exports.isFragment = function(a) {
		return z(a) === e;
	};
	exports.isLazy = function(a) {
		return z(a) === t;
	};
	exports.isMemo = function(a) {
		return z(a) === r;
	};
	exports.isPortal = function(a) {
		return z(a) === d;
	};
	exports.isProfiler = function(a) {
		return z(a) === g;
	};
	exports.isStrictMode = function(a) {
		return z(a) === f;
	};
	exports.isSuspense = function(a) {
		return z(a) === p;
	};
	exports.isValidElementType = function(a) {
		return "string" === typeof a || "function" === typeof a || a === e || a === m || a === g || a === f || a === p || a === q || "object" === typeof a && null !== a && (a.$$typeof === t || a.$$typeof === r || a.$$typeof === h || a.$$typeof === k || a.$$typeof === n || a.$$typeof === w || a.$$typeof === x || a.$$typeof === y || a.$$typeof === v);
	};
	exports.typeOf = z;
}));
//#endregion
//#region ../../../node_modules/.pnpm/react-is@16.13.1/node_modules/react-is/cjs/react-is.development.js
/** @license React v16.13.1
* react-is.development.js
*
* Copyright (c) Facebook, Inc. and its affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_is_development = /* @__PURE__ */ __commonJSMin(((exports) => {
	if (process.env.NODE_ENV !== "production") (function() {
		"use strict";
		var hasSymbol = typeof Symbol === "function" && Symbol.for;
		var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for("react.element") : 60103;
		var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for("react.portal") : 60106;
		var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for("react.fragment") : 60107;
		var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for("react.strict_mode") : 60108;
		var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for("react.profiler") : 60114;
		var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for("react.provider") : 60109;
		var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for("react.context") : 60110;
		var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for("react.async_mode") : 60111;
		var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for("react.concurrent_mode") : 60111;
		var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for("react.forward_ref") : 60112;
		var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for("react.suspense") : 60113;
		var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for("react.suspense_list") : 60120;
		var REACT_MEMO_TYPE = hasSymbol ? Symbol.for("react.memo") : 60115;
		var REACT_LAZY_TYPE = hasSymbol ? Symbol.for("react.lazy") : 60116;
		var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for("react.block") : 60121;
		var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for("react.fundamental") : 60117;
		var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for("react.responder") : 60118;
		var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for("react.scope") : 60119;
		function isValidElementType(type) {
			return typeof type === "string" || typeof type === "function" || type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === "object" && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
		}
		function typeOf(object) {
			if (typeof object === "object" && object !== null) {
				var $$typeof = object.$$typeof;
				switch ($$typeof) {
					case REACT_ELEMENT_TYPE:
						var type = object.type;
						switch (type) {
							case REACT_ASYNC_MODE_TYPE:
							case REACT_CONCURRENT_MODE_TYPE:
							case REACT_FRAGMENT_TYPE:
							case REACT_PROFILER_TYPE:
							case REACT_STRICT_MODE_TYPE:
							case REACT_SUSPENSE_TYPE: return type;
							default:
								var $$typeofType = type && type.$$typeof;
								switch ($$typeofType) {
									case REACT_CONTEXT_TYPE:
									case REACT_FORWARD_REF_TYPE:
									case REACT_LAZY_TYPE:
									case REACT_MEMO_TYPE:
									case REACT_PROVIDER_TYPE: return $$typeofType;
									default: return $$typeof;
								}
						}
					case REACT_PORTAL_TYPE: return $$typeof;
				}
			}
		}
		var AsyncMode = REACT_ASYNC_MODE_TYPE;
		var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
		var ContextConsumer = REACT_CONTEXT_TYPE;
		var ContextProvider = REACT_PROVIDER_TYPE;
		var Element = REACT_ELEMENT_TYPE;
		var ForwardRef = REACT_FORWARD_REF_TYPE;
		var Fragment = REACT_FRAGMENT_TYPE;
		var Lazy = REACT_LAZY_TYPE;
		var Memo = REACT_MEMO_TYPE;
		var Portal = REACT_PORTAL_TYPE;
		var Profiler = REACT_PROFILER_TYPE;
		var StrictMode = REACT_STRICT_MODE_TYPE;
		var Suspense = REACT_SUSPENSE_TYPE;
		var hasWarnedAboutDeprecatedIsAsyncMode = false;
		function isAsyncMode(object) {
			if (!hasWarnedAboutDeprecatedIsAsyncMode) {
				hasWarnedAboutDeprecatedIsAsyncMode = true;
				console["warn"]("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.");
			}
			return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
		}
		function isConcurrentMode(object) {
			return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
		}
		function isContextConsumer(object) {
			return typeOf(object) === REACT_CONTEXT_TYPE;
		}
		function isContextProvider(object) {
			return typeOf(object) === REACT_PROVIDER_TYPE;
		}
		function isElement(object) {
			return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
		}
		function isForwardRef(object) {
			return typeOf(object) === REACT_FORWARD_REF_TYPE;
		}
		function isFragment(object) {
			return typeOf(object) === REACT_FRAGMENT_TYPE;
		}
		function isLazy(object) {
			return typeOf(object) === REACT_LAZY_TYPE;
		}
		function isMemo(object) {
			return typeOf(object) === REACT_MEMO_TYPE;
		}
		function isPortal(object) {
			return typeOf(object) === REACT_PORTAL_TYPE;
		}
		function isProfiler(object) {
			return typeOf(object) === REACT_PROFILER_TYPE;
		}
		function isStrictMode(object) {
			return typeOf(object) === REACT_STRICT_MODE_TYPE;
		}
		function isSuspense(object) {
			return typeOf(object) === REACT_SUSPENSE_TYPE;
		}
		exports.AsyncMode = AsyncMode;
		exports.ConcurrentMode = ConcurrentMode;
		exports.ContextConsumer = ContextConsumer;
		exports.ContextProvider = ContextProvider;
		exports.Element = Element;
		exports.ForwardRef = ForwardRef;
		exports.Fragment = Fragment;
		exports.Lazy = Lazy;
		exports.Memo = Memo;
		exports.Portal = Portal;
		exports.Profiler = Profiler;
		exports.StrictMode = StrictMode;
		exports.Suspense = Suspense;
		exports.isAsyncMode = isAsyncMode;
		exports.isConcurrentMode = isConcurrentMode;
		exports.isContextConsumer = isContextConsumer;
		exports.isContextProvider = isContextProvider;
		exports.isElement = isElement;
		exports.isForwardRef = isForwardRef;
		exports.isFragment = isFragment;
		exports.isLazy = isLazy;
		exports.isMemo = isMemo;
		exports.isPortal = isPortal;
		exports.isProfiler = isProfiler;
		exports.isStrictMode = isStrictMode;
		exports.isSuspense = isSuspense;
		exports.isValidElementType = isValidElementType;
		exports.typeOf = typeOf;
	})();
}));
//#endregion
//#region ../../../node_modules/.pnpm/react-is@16.13.1/node_modules/react-is/index.js
var require_react_is = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	if (process.env.NODE_ENV === "production") module.exports = require_react_is_production_min();
	else module.exports = require_react_is_development();
}));
//#endregion
//#region ../../../node_modules/.pnpm/hoist-non-react-statics@3.3.2/node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js
var require_hoist_non_react_statics_cjs = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var reactIs = require_react_is();
	/**
	* Copyright 2015, Yahoo! Inc.
	* Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
	*/
	var REACT_STATICS = {
		childContextTypes: true,
		contextType: true,
		contextTypes: true,
		defaultProps: true,
		displayName: true,
		getDefaultProps: true,
		getDerivedStateFromError: true,
		getDerivedStateFromProps: true,
		mixins: true,
		propTypes: true,
		type: true
	};
	var KNOWN_STATICS = {
		name: true,
		length: true,
		prototype: true,
		caller: true,
		callee: true,
		arguments: true,
		arity: true
	};
	var FORWARD_REF_STATICS = {
		"$$typeof": true,
		render: true,
		defaultProps: true,
		displayName: true,
		propTypes: true
	};
	var MEMO_STATICS = {
		"$$typeof": true,
		compare: true,
		defaultProps: true,
		displayName: true,
		propTypes: true,
		type: true
	};
	var TYPE_STATICS = {};
	TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
	TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;
	function getStatics(component) {
		if (reactIs.isMemo(component)) return MEMO_STATICS;
		return TYPE_STATICS[component["$$typeof"]] || REACT_STATICS;
	}
	var defineProperty = Object.defineProperty;
	var getOwnPropertyNames = Object.getOwnPropertyNames;
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
	var getPrototypeOf = Object.getPrototypeOf;
	var objectPrototype = Object.prototype;
	function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
		if (typeof sourceComponent !== "string") {
			if (objectPrototype) {
				var inheritedComponent = getPrototypeOf(sourceComponent);
				if (inheritedComponent && inheritedComponent !== objectPrototype) hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
			}
			var keys = getOwnPropertyNames(sourceComponent);
			if (getOwnPropertySymbols) keys = keys.concat(getOwnPropertySymbols(sourceComponent));
			var targetStatics = getStatics(targetComponent);
			var sourceStatics = getStatics(sourceComponent);
			for (var i = 0; i < keys.length; ++i) {
				var key = keys[i];
				if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
					var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
					try {
						defineProperty(targetComponent, key, descriptor);
					} catch (e) {}
				}
			}
		}
		return targetComponent;
	}
	module.exports = hoistNonReactStatics;
}));
//#endregion
//#region ../../../node_modules/.pnpm/@emotion+utils@1.4.2/node_modules/@emotion/utils/dist/emotion-utils.esm.js
var isBrowser$2 = typeof document !== "undefined";
function getRegisteredStyles$1(registered, registeredStyles, classNames) {
	var rawClassName = "";
	classNames.split(" ").forEach(function(className) {
		if (registered[className] !== void 0) registeredStyles.push(registered[className] + ";");
		else if (className) rawClassName += className + " ";
	});
	return rawClassName;
}
var registerStyles = function registerStyles(cache, serialized, isStringTag) {
	var className = cache.key + "-" + serialized.name;
	if ((isStringTag === false || isBrowser$2 === false && cache.compat !== void 0) && cache.registered[className] === void 0) cache.registered[className] = serialized.styles;
};
var insertStyles = function insertStyles(cache, serialized, isStringTag) {
	registerStyles(cache, serialized, isStringTag);
	var className = cache.key + "-" + serialized.name;
	if (cache.inserted[serialized.name] === void 0) {
		var stylesForSSR = "";
		var current = serialized;
		do {
			var maybeStyles = cache.insert(serialized === current ? "." + className : "", current, cache.sheet, true);
			if (!isBrowser$2 && maybeStyles !== void 0) stylesForSSR += maybeStyles;
			current = current.next;
		} while (current !== void 0);
		if (!isBrowser$2 && stylesForSSR.length !== 0) return stylesForSSR;
	}
};
//#endregion
//#region ../../../node_modules/.pnpm/@emotion+hash@0.9.2/node_modules/@emotion/hash/dist/emotion-hash.esm.js
function murmur2(str) {
	var h = 0;
	var k, i = 0, len = str.length;
	for (; len >= 4; ++i, len -= 4) {
		k = str.charCodeAt(i) & 255 | (str.charCodeAt(++i) & 255) << 8 | (str.charCodeAt(++i) & 255) << 16 | (str.charCodeAt(++i) & 255) << 24;
		k = (k & 65535) * 1540483477 + ((k >>> 16) * 59797 << 16);
		k ^= k >>> 24;
		h = (k & 65535) * 1540483477 + ((k >>> 16) * 59797 << 16) ^ (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
	}
	switch (len) {
		case 3: h ^= (str.charCodeAt(i + 2) & 255) << 16;
		case 2: h ^= (str.charCodeAt(i + 1) & 255) << 8;
		case 1:
			h ^= str.charCodeAt(i) & 255;
			h = (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
	}
	h ^= h >>> 13;
	h = (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
	return ((h ^ h >>> 15) >>> 0).toString(36);
}
//#endregion
//#region ../../../node_modules/.pnpm/@emotion+unitless@0.10.0/node_modules/@emotion/unitless/dist/emotion-unitless.esm.js
var unitlessKeys = {
	animationIterationCount: 1,
	aspectRatio: 1,
	borderImageOutset: 1,
	borderImageSlice: 1,
	borderImageWidth: 1,
	boxFlex: 1,
	boxFlexGroup: 1,
	boxOrdinalGroup: 1,
	columnCount: 1,
	columns: 1,
	flex: 1,
	flexGrow: 1,
	flexPositive: 1,
	flexShrink: 1,
	flexNegative: 1,
	flexOrder: 1,
	gridRow: 1,
	gridRowEnd: 1,
	gridRowSpan: 1,
	gridRowStart: 1,
	gridColumn: 1,
	gridColumnEnd: 1,
	gridColumnSpan: 1,
	gridColumnStart: 1,
	msGridRow: 1,
	msGridRowSpan: 1,
	msGridColumn: 1,
	msGridColumnSpan: 1,
	fontWeight: 1,
	lineHeight: 1,
	opacity: 1,
	order: 1,
	orphans: 1,
	scale: 1,
	tabSize: 1,
	widows: 1,
	zIndex: 1,
	zoom: 1,
	WebkitLineClamp: 1,
	fillOpacity: 1,
	floodOpacity: 1,
	stopOpacity: 1,
	strokeDasharray: 1,
	strokeDashoffset: 1,
	strokeMiterlimit: 1,
	strokeOpacity: 1,
	strokeWidth: 1
};
//#endregion
//#region ../../../node_modules/.pnpm/@emotion+serialize@1.3.3/node_modules/@emotion/serialize/dist/emotion-serialize.esm.js
var isDevelopment$1 = false;
var hyphenateRegex = /[A-Z]|^ms/g;
var animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g;
var isCustomProperty = function isCustomProperty(property) {
	return property.charCodeAt(1) === 45;
};
var isProcessableValue = function isProcessableValue(value) {
	return value != null && typeof value !== "boolean";
};
var processStyleName = /* #__PURE__ */ memoize(function(styleName) {
	return isCustomProperty(styleName) ? styleName : styleName.replace(hyphenateRegex, "-$&").toLowerCase();
});
var processStyleValue = function processStyleValue(key, value) {
	switch (key) {
		case "animation":
		case "animationName": if (typeof value === "string") return value.replace(animationRegex, function(match, p1, p2) {
			cursor = {
				name: p1,
				styles: p2,
				next: cursor
			};
			return p1;
		});
	}
	if (unitlessKeys[key] !== 1 && !isCustomProperty(key) && typeof value === "number" && value !== 0) return value + "px";
	return value;
};
var noComponentSelectorMessage = "Component selectors can only be used in conjunction with @emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware compiler transform.";
function handleInterpolation(mergedProps, registered, interpolation) {
	if (interpolation == null) return "";
	var componentSelector = interpolation;
	if (componentSelector.__emotion_styles !== void 0) return componentSelector;
	switch (typeof interpolation) {
		case "boolean": return "";
		case "object":
			var keyframes = interpolation;
			if (keyframes.anim === 1) {
				cursor = {
					name: keyframes.name,
					styles: keyframes.styles,
					next: cursor
				};
				return keyframes.name;
			}
			var serializedStyles = interpolation;
			if (serializedStyles.styles !== void 0) {
				var next = serializedStyles.next;
				if (next !== void 0) while (next !== void 0) {
					cursor = {
						name: next.name,
						styles: next.styles,
						next: cursor
					};
					next = next.next;
				}
				return serializedStyles.styles + ";";
			}
			return createStringFromObject(mergedProps, registered, interpolation);
		case "function":
			if (mergedProps !== void 0) {
				var previousCursor = cursor;
				var result = interpolation(mergedProps);
				cursor = previousCursor;
				return handleInterpolation(mergedProps, registered, result);
			}
			break;
	}
	var asString = interpolation;
	if (registered == null) return asString;
	var cached = registered[asString];
	return cached !== void 0 ? cached : asString;
}
function createStringFromObject(mergedProps, registered, obj) {
	var string = "";
	if (Array.isArray(obj)) for (var i = 0; i < obj.length; i++) string += handleInterpolation(mergedProps, registered, obj[i]) + ";";
	else for (var key in obj) {
		var value = obj[key];
		if (typeof value !== "object") {
			var asString = value;
			if (registered != null && registered[asString] !== void 0) string += key + "{" + registered[asString] + "}";
			else if (isProcessableValue(asString)) string += processStyleName(key) + ":" + processStyleValue(key, asString) + ";";
		} else {
			if (key === "NO_COMPONENT_SELECTOR" && isDevelopment$1) throw new Error(noComponentSelectorMessage);
			if (Array.isArray(value) && typeof value[0] === "string" && (registered == null || registered[value[0]] === void 0)) {
				for (var _i = 0; _i < value.length; _i++) if (isProcessableValue(value[_i])) string += processStyleName(key) + ":" + processStyleValue(key, value[_i]) + ";";
			} else {
				var interpolated = handleInterpolation(mergedProps, registered, value);
				switch (key) {
					case "animation":
					case "animationName":
						string += processStyleName(key) + ":" + interpolated + ";";
						break;
					default: string += key + "{" + interpolated + "}";
				}
			}
		}
	}
	return string;
}
var labelPattern = /label:\s*([^\s;{]+)\s*(;|$)/g;
var cursor;
function serializeStyles(args, registered, mergedProps) {
	if (args.length === 1 && typeof args[0] === "object" && args[0] !== null && args[0].styles !== void 0) return args[0];
	var stringMode = true;
	var styles = "";
	cursor = void 0;
	var strings = args[0];
	if (strings == null || strings.raw === void 0) {
		stringMode = false;
		styles += handleInterpolation(mergedProps, registered, strings);
	} else styles += strings[0];
	for (var i = 1; i < args.length; i++) {
		styles += handleInterpolation(mergedProps, registered, args[i]);
		if (stringMode) styles += strings[i];
	}
	labelPattern.lastIndex = 0;
	var identifierName = "";
	var match;
	while ((match = labelPattern.exec(styles)) !== null) identifierName += "-" + match[1];
	return {
		name: murmur2(styles) + identifierName,
		styles,
		next: cursor
	};
}
//#endregion
//#region ../../../node_modules/.pnpm/@emotion+use-insertion-effect-with-fallbacks@1.2.0_react@18.3.1/node_modules/@emotion/use-insertion-effect-with-fallbacks/dist/emotion-use-insertion-effect-with-fallbacks.esm.js
var isBrowser$1 = typeof document !== "undefined";
var syncFallback = function syncFallback(create) {
	return create();
};
var useInsertionEffect = react["useInsertionEffect"] ? react["useInsertionEffect"] : false;
var useInsertionEffectAlwaysWithSyncFallback = !isBrowser$1 ? syncFallback : useInsertionEffect || syncFallback;
useInsertionEffect || react.useLayoutEffect;
var isBrowser = typeof document !== "undefined";
var EmotionCacheContext = /* #__PURE__ */ react.createContext(typeof HTMLElement !== "undefined" ? /* #__PURE__ */ createCache({ key: "css" }) : null);
EmotionCacheContext.Provider;
var __unsafe_useEmotionCache = function useEmotionCache() {
	return (0, react.useContext)(EmotionCacheContext);
};
var withEmotionCache = function withEmotionCache(func) {
	return /*#__PURE__*/ (0, react.forwardRef)(function(props, ref) {
		return func(props, (0, react.useContext)(EmotionCacheContext), ref);
	});
};
if (!isBrowser) withEmotionCache = function withEmotionCache(func) {
	return function(props) {
		var cache = (0, react.useContext)(EmotionCacheContext);
		if (cache === null) {
			cache = createCache({ key: "css" });
			return /*#__PURE__*/ react.createElement(EmotionCacheContext.Provider, { value: cache }, func(props, cache));
		} else return func(props, cache);
	};
};
var ThemeContext = /* #__PURE__ */ react.createContext({});
var hasOwn = {}.hasOwnProperty;
var typePropName = "__EMOTION_TYPE_PLEASE_DO_NOT_USE__";
var createEmotionProps = function createEmotionProps(type, props) {
	var newProps = {};
	for (var _key in props) if (hasOwn.call(props, _key)) newProps[_key] = props[_key];
	newProps[typePropName] = type;
	return newProps;
};
var Insertion = function Insertion(_ref) {
	var cache = _ref.cache, serialized = _ref.serialized, isStringTag = _ref.isStringTag;
	registerStyles(cache, serialized, isStringTag);
	var rules = useInsertionEffectAlwaysWithSyncFallback(function() {
		return insertStyles(cache, serialized, isStringTag);
	});
	if (!isBrowser && rules !== void 0) {
		var _ref2;
		var serializedNames = serialized.name;
		var next = serialized.next;
		while (next !== void 0) {
			serializedNames += " " + next.name;
			next = next.next;
		}
		return /*#__PURE__*/ react.createElement("style", (_ref2 = {}, _ref2["data-emotion"] = cache.key + " " + serializedNames, _ref2.dangerouslySetInnerHTML = { __html: rules }, _ref2.nonce = cache.sheet.nonce, _ref2));
	}
	return null;
};
var Emotion$1 = /* @__PURE__ */ withEmotionCache(function(props, cache, ref) {
	var cssProp = props.css;
	if (typeof cssProp === "string" && cache.registered[cssProp] !== void 0) cssProp = cache.registered[cssProp];
	var WrappedComponent = props[typePropName];
	var registeredStyles = [cssProp];
	var className = "";
	if (typeof props.className === "string") className = getRegisteredStyles$1(cache.registered, registeredStyles, props.className);
	else if (props.className != null) className = props.className + " ";
	var serialized = serializeStyles(registeredStyles, void 0, react.useContext(ThemeContext));
	className += cache.key + "-" + serialized.name;
	var newProps = {};
	for (var _key2 in props) if (hasOwn.call(props, _key2) && _key2 !== "css" && _key2 !== typePropName && true) newProps[_key2] = props[_key2];
	newProps.className = className;
	if (ref) newProps.ref = ref;
	return /*#__PURE__*/ react.createElement(react.Fragment, null, /*#__PURE__*/ react.createElement(Insertion, {
		cache,
		serialized,
		isStringTag: typeof WrappedComponent === "string"
	}), /*#__PURE__*/ react.createElement(WrappedComponent, newProps));
});
require_hoist_non_react_statics_cjs();
var jsx = function jsx(type, props) {
	var args = arguments;
	if (props == null || !hasOwn.call(props, "css")) return react.createElement.apply(void 0, args);
	var argsLength = args.length;
	var createElementArgArray = new Array(argsLength);
	createElementArgArray[0] = Emotion$1;
	createElementArgArray[1] = createEmotionProps(type, props);
	for (var i = 2; i < argsLength; i++) createElementArgArray[i] = args[i];
	return react.createElement.apply(null, createElementArgArray);
};
(function(_jsx) {
	var JSX;
	JSX || (JSX = _jsx.JSX || (_jsx.JSX = {}));
})(jsx || (jsx = {}));
function css$1() {
	for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
	return serializeStyles(args);
}
//#endregion
//#region ../../../node_modules/.pnpm/@emotion+css@11.13.5/node_modules/@emotion/css/create-instance/dist/emotion-css-create-instance.esm.js
function insertWithoutScoping(cache, serialized) {
	if (cache.inserted[serialized.name] === void 0) return cache.insert("", serialized, cache.sheet, true);
}
function merge$1(registered, css, className) {
	var registeredStyles = [];
	var rawClassName = getRegisteredStyles$1(registered, registeredStyles, className);
	if (registeredStyles.length < 2) return className;
	return rawClassName + css(registeredStyles);
}
var createEmotion = function createEmotion(options) {
	var cache = createCache(options);
	cache.sheet.speedy = function(value) {
		this.isSpeedy = value;
	};
	cache.compat = true;
	var css = function css() {
		for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
		var serialized = serializeStyles(args, cache.registered, void 0);
		insertStyles(cache, serialized, false);
		return cache.key + "-" + serialized.name;
	};
	return {
		css,
		cx: function cx() {
			for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) args[_key4] = arguments[_key4];
			return merge$1(cache.registered, css, classnames(args));
		},
		injectGlobal: function injectGlobal() {
			for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) args[_key3] = arguments[_key3];
			insertWithoutScoping(cache, serializeStyles(args, cache.registered));
		},
		keyframes: function keyframes() {
			for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) args[_key2] = arguments[_key2];
			var serialized = serializeStyles(args, cache.registered);
			var animation = "animation-" + serialized.name;
			insertWithoutScoping(cache, {
				name: serialized.name,
				styles: "@keyframes " + animation + "{" + serialized.styles + "}"
			});
			return animation;
		},
		hydrate: function hydrate(ids) {
			ids.forEach(function(key) {
				cache.inserted[key] = true;
			});
		},
		flush: function flush() {
			cache.registered = {};
			cache.inserted = {};
			cache.sheet.flush();
		},
		sheet: cache.sheet,
		cache,
		getRegisteredStyles: getRegisteredStyles$1.bind(null, cache.registered),
		merge: merge$1.bind(null, cache.registered, css)
	};
};
var classnames = function classnames(args) {
	var cls = "";
	for (var i = 0; i < args.length; i++) {
		var arg = args[i];
		if (arg == null) continue;
		var toAdd = void 0;
		switch (typeof arg) {
			case "boolean": break;
			case "object":
				if (Array.isArray(arg)) toAdd = classnames(arg);
				else {
					toAdd = "";
					for (var k in arg) if (arg[k] && k) {
						toAdd && (toAdd += " ");
						toAdd += k;
					}
				}
				break;
			default: toAdd = arg;
		}
		if (toAdd) {
			cls && (cls += " ");
			cls += toAdd;
		}
	}
	return cls;
};
//#endregion
//#region ../../../node_modules/.pnpm/@emotion+css@11.13.5/node_modules/@emotion/css/dist/emotion-css.esm.js
var _createEmotion = createEmotion({ key: "css" });
_createEmotion.flush;
_createEmotion.hydrate;
var cx = _createEmotion.cx;
_createEmotion.merge;
_createEmotion.getRegisteredStyles;
_createEmotion.injectGlobal;
_createEmotion.keyframes;
_createEmotion.css;
_createEmotion.sheet;
_createEmotion.cache;
//#endregion
//#region ../../../node_modules/.pnpm/@wordpress+components@37.0.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/utils/hooks/use-cx.mjs
var isSerializedStyles = (o) => typeof o !== "undefined" && o !== null && ["name", "styles"].every((p) => typeof o[p] !== "undefined");
var useCx = () => {
	const cache = __unsafe_useEmotionCache();
	return (0, react$1.useCallback)((...classNames) => {
		if (cache === null) throw new Error("The `useCx` hook should be only used within a valid Emotion Cache Context");
		return cx(...classNames.map((arg) => {
			if (isSerializedStyles(arg)) {
				insertStyles(cache, arg, false);
				return `${cache.key}-${arg.name}`;
			}
			return arg;
		}));
	}, [cache]);
};
//#endregion
//#region ../../../node_modules/.pnpm/memize@2.1.1/node_modules/memize/dist/index.js
/**
* Memize options object.
*
* @typedef MemizeOptions
*
* @property {number} [maxSize] Maximum size of the cache.
*/
/**
* Internal cache entry.
*
* @typedef MemizeCacheNode
*
* @property {?MemizeCacheNode|undefined} [prev] Previous node.
* @property {?MemizeCacheNode|undefined} [next] Next node.
* @property {Array<*>}                   args   Function arguments for cache
*                                               entry.
* @property {*}                          val    Function result.
*/
/**
* Properties of the enhanced function for controlling cache.
*
* @typedef MemizeMemoizedFunction
*
* @property {()=>void} clear Clear the cache.
*/
/**
* Accepts a function to be memoized, and returns a new memoized function, with
* optional options.
*
* @template {(...args: any[]) => any} F
*
* @param {F}             fn        Function to memoize.
* @param {MemizeOptions} [options] Options object.
*
* @return {((...args: Parameters<F>) => ReturnType<F>) & MemizeMemoizedFunction} Memoized function.
*/
function memize(fn, options) {
	var size = 0;
	/** @type {?MemizeCacheNode|undefined} */
	var head;
	/** @type {?MemizeCacheNode|undefined} */
	var tail;
	options = options || {};
	function memoized() {
		var node = head, len = arguments.length, args, i;
		searchCache: while (node) {
			if (node.args.length !== arguments.length) {
				node = node.next;
				continue;
			}
			for (i = 0; i < len; i++) if (node.args[i] !== arguments[i]) {
				node = node.next;
				continue searchCache;
			}
			if (node !== head) {
				if (node === tail) tail = node.prev;
				/** @type {MemizeCacheNode} */ node.prev.next = node.next;
				if (node.next) node.next.prev = node.prev;
				node.next = head;
				node.prev = null;
				/** @type {MemizeCacheNode} */ head.prev = node;
				head = node;
			}
			return node.val;
		}
		args = new Array(len);
		for (i = 0; i < len; i++) args[i] = arguments[i];
		node = {
			args,
			val: fn.apply(null, args)
		};
		if (head) {
			head.prev = node;
			node.next = head;
		} else tail = node;
		if (size === options.maxSize) {
			tail = tail.prev;
			/** @type {MemizeCacheNode} */ tail.next = null;
		} else size++;
		head = node;
		return node.val;
	}
	memoized.clear = function() {
		head = null;
		tail = null;
		size = 0;
	};
	return memoized;
}
//#endregion
//#region ../../../node_modules/.pnpm/@wordpress+components@37.0.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/utils/colors-values.mjs
var white = "#fff";
var GRAY = {
	900: "#1e1e1e",
	800: "#2f2f2f",
	/** Meets 4.6:1 text contrast against white. */
	700: "#757575",
	/** Meets 3:1 UI or large text contrast against white. */
	600: "#949494",
	400: "#ccc",
	/** Used for most borders. */
	300: "#ddd",
	/** Used sparingly for light borders. */
	200: "#e0e0e0",
	/** Used for light gray backgrounds. */
	100: "#f0f0f0"
};
var ALERT = {
	yellow: "#f0b849",
	red: "#d94f4f",
	green: "#4ab866"
};
var THEME = {
	accent: `var(--wp-components-color-accent, var(--wp-admin-theme-color, #3858e9))`,
	accentDarker10: `var(--wp-components-color-accent-darker-10, var(--wp-admin-theme-color-darker-10, #2145e6))`,
	accentDarker20: `var(--wp-components-color-accent-darker-20, var(--wp-admin-theme-color-darker-20, #183ad6))`,
	/** Used when placing text on the accent color. */
	accentInverted: `var(--wp-components-color-accent-inverted, var(--wpds-color-foreground-interactive-brand-strong, #fff))`,
	background: `var(--wp-components-color-background, var(--wpds-color-background-surface-neutral-strong, #fff))`,
	foreground: `var(--wp-components-color-foreground, var(--wpds-color-foreground-content-neutral, #1e1e1e))`,
	/** Used when placing text on the foreground color. */
	foregroundInverted: `var(--wp-components-color-foreground-inverted, var(--wpds-color-background-surface-neutral, #fcfcfc))`,
	gray: {
		/** @deprecated Use `COLORS.theme.foreground` instead. */
		900: `var(--wp-components-color-foreground, var(--wpds-color-foreground-content-neutral, #1e1e1e))`,
		800: `var(--wp-components-color-gray-800, var(--wpds-color-foreground-content-neutral, #1e1e1e))`,
		700: `var(--wp-components-color-gray-700, var(--wpds-color-foreground-content-neutral-weak, #707070))`,
		600: `var(--wp-components-color-gray-600, var(--wpds-color-stroke-interactive-neutral, #8d8d8d))`,
		400: `var(--wp-components-color-gray-400, var(--wpds-color-stroke-interactive-neutral, #8d8d8d))`,
		300: `var(--wp-components-color-gray-300, var(--wpds-color-stroke-surface-neutral, #dbdbdb))`,
		200: `var(--wp-components-color-gray-200, var(--wpds-color-stroke-surface-neutral, #dbdbdb))`,
		100: `var(--wp-components-color-gray-100, var(--wpds-color-background-surface-neutral, #fcfcfc))`
	}
};
var UI = {
	background: THEME.background,
	backgroundDisabled: THEME.gray[100],
	border: THEME.gray[600],
	borderHover: THEME.gray[700],
	borderFocus: THEME.accent,
	borderDisabled: THEME.gray[400],
	textDisabled: THEME.gray[600],
	darkGrayPlaceholder: `color-mix(in srgb, ${THEME.foreground}, transparent 38%)`,
	lightGrayPlaceholder: `color-mix(in srgb, ${THEME.background}, transparent 35%)`
};
var COLORS = Object.freeze({
	/**
	* The main gray color object.
	*
	* @deprecated Use semantic aliases in `COLORS.ui` or theme-ready variables in `COLORS.theme.gray`.
	*/
	gray: GRAY,
	/**
	* @deprecated Prefer theme-ready variables in `COLORS.theme`.
	*/
	white,
	alert: ALERT,
	/**
	* Theme-ready variables with fallbacks.
	*
	* Prefer semantic aliases in `COLORS.ui` when applicable.
	*/
	theme: THEME,
	/**
	* Semantic aliases (prefer these over raw variables when applicable).
	*/
	ui: UI
});
//#endregion
//#region ../../../node_modules/.pnpm/@wordpress+components@37.0.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/utils/config-values.mjs
var CONTROL_HEIGHT = "36px";
var CONTROL_PROPS = {
	controlPaddingX: 12,
	controlPaddingXSmall: 8,
	controlPaddingXLarge: 12 * 1.3334,
	controlBoxShadowFocus: `0 0 0 0.5px ${COLORS.theme.accent}`,
	controlHeight: CONTROL_HEIGHT,
	controlHeightXSmall: `calc( ${CONTROL_HEIGHT} * 0.6 )`,
	controlHeightSmall: `calc( ${CONTROL_HEIGHT} * 0.8 )`,
	controlHeightLarge: `calc( ${CONTROL_HEIGHT} * 1.2 )`,
	controlHeightXLarge: `calc( ${CONTROL_HEIGHT} * 1.4 )`
};
var config_values_default = Object.assign({}, CONTROL_PROPS, {
	colorDivider: "rgba(0, 0, 0, 0.1)",
	colorScrollbarThumb: "rgba(0, 0, 0, 0.2)",
	colorScrollbarThumbHover: "rgba(0, 0, 0, 0.5)",
	colorScrollbarTrack: "rgba(0, 0, 0, 0.04)",
	elevationIntensity: 1,
	radiusXSmall: "1px",
	radiusSmall: "2px",
	radiusMedium: "4px",
	radiusLarge: "8px",
	radiusFull: "9999px",
	radiusRound: "50%",
	borderWidth: "1px",
	borderWidthFocus: "1.5px",
	borderWidthTab: "4px",
	spinnerSize: 16,
	fontSize: "13px",
	fontSizeH1: "calc(2.44 * 13px)",
	fontSizeH2: "calc(1.95 * 13px)",
	fontSizeH3: "calc(1.56 * 13px)",
	fontSizeH4: "calc(1.25 * 13px)",
	fontSizeH5: "13px",
	fontSizeH6: "calc(0.8 * 13px)",
	fontSizeInputMobile: "16px",
	fontSizeMobile: "15px",
	fontSizeSmall: "calc(0.92 * 13px)",
	fontSizeXSmall: "calc(0.75 * 13px)",
	fontLineHeightBase: "1.4",
	fontWeight: "normal",
	fontWeightEmphasis: "600",
	gridBase: "4px",
	elevationXSmall: `0 1px 1px rgba(0, 0, 0, 0.03), 0 1px 2px rgba(0, 0, 0, 0.02), 0 3px 3px rgba(0, 0, 0, 0.02), 0 4px 4px rgba(0, 0, 0, 0.01)`,
	elevationSmall: `0 1px 2px rgba(0, 0, 0, 0.05), 0 2px 3px rgba(0, 0, 0, 0.04), 0 6px 6px rgba(0, 0, 0, 0.03), 0 8px 8px rgba(0, 0, 0, 0.02)`,
	elevationMedium: `0 2px 3px rgba(0, 0, 0, 0.05), 0 4px 5px rgba(0, 0, 0, 0.04), 0 12px 12px rgba(0, 0, 0, 0.03), 0 16px 16px rgba(0, 0, 0, 0.02)`,
	elevationLarge: `0 5px 15px rgba(0, 0, 0, 0.08), 0 15px 27px rgba(0, 0, 0, 0.07), 0 30px 36px rgba(0, 0, 0, 0.04), 0 50px 43px rgba(0, 0, 0, 0.02)`,
	surfaceBorderColor: "rgba(0, 0, 0, 0.1)",
	surfaceColor: COLORS.white,
	transitionDuration: "200ms",
	transitionDurationFast: "160ms",
	transitionDurationFaster: "120ms",
	transitionDurationFastest: "100ms",
	transitionTimingFunction: "cubic-bezier(0.08, 0.52, 0.52, 1)",
	transitionTimingFunctionControl: "cubic-bezier(0.12, 0.8, 0.32, 1)"
});
//#endregion
//#region ../../../node_modules/.pnpm/fast-deep-equal@3.1.3/node_modules/fast-deep-equal/es6/index.js
var require_es6 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = function equal(a, b) {
		if (a === b) return true;
		if (a && b && typeof a == "object" && typeof b == "object") {
			if (a.constructor !== b.constructor) return false;
			var length, i, keys;
			if (Array.isArray(a)) {
				length = a.length;
				if (length != b.length) return false;
				for (i = length; i-- !== 0;) if (!equal(a[i], b[i])) return false;
				return true;
			}
			if (a instanceof Map && b instanceof Map) {
				if (a.size !== b.size) return false;
				for (i of a.entries()) if (!b.has(i[0])) return false;
				for (i of a.entries()) if (!equal(i[1], b.get(i[0]))) return false;
				return true;
			}
			if (a instanceof Set && b instanceof Set) {
				if (a.size !== b.size) return false;
				for (i of a.entries()) if (!b.has(i[0])) return false;
				return true;
			}
			if (ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
				length = a.length;
				if (length != b.length) return false;
				for (i = length; i-- !== 0;) if (a[i] !== b[i]) return false;
				return true;
			}
			if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
			if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
			if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();
			keys = Object.keys(a);
			length = keys.length;
			if (length !== Object.keys(b).length) return false;
			for (i = length; i-- !== 0;) if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
			for (i = length; i-- !== 0;) {
				var key = keys[i];
				if (!equal(a[key], b[key])) return false;
			}
			return true;
		}
		return a !== a && b !== b;
	};
}));
//#endregion
//#region ../../../node_modules/.pnpm/@wordpress+warning@3.51.0/node_modules/@wordpress/warning/build-module/utils.mjs
var logged = /* @__PURE__ */ new Set();
//#endregion
//#region ../../../node_modules/.pnpm/@wordpress+warning@3.51.0/node_modules/@wordpress/warning/build-module/index.mjs
function isDev() {
	return globalThis.SCRIPT_DEBUG === true;
}
function warning(message) {
	if (!isDev()) return;
	if (logged.has(message)) return;
	console.warn(message);
	try {
		throw Error(message);
	} catch {}
	logged.add(message);
}
//#endregion
//#region ../../../node_modules/.pnpm/@wordpress+components@37.0.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/context/context-system-provider.mjs
var import_es6 = /* @__PURE__ */ __toESM(require_es6(), 1);
var ComponentsContext = (0, react$1.createContext)(
	/** @type {Record<string, any>} */
	{}
);
ComponentsContext.displayName = "ComponentsContext";
var useComponentsContext = () => (0, react$1.useContext)(ComponentsContext);
function useContextSystemBridge({ value }) {
	const parentContext = useComponentsContext();
	const valueRef = (0, react$1.useRef)(value);
	use_update_effect_default(() => {
		if ((0, import_es6.default)(valueRef.current, value) && valueRef.current !== value) globalThis.SCRIPT_DEBUG === true && warning(`Please memoize your context: ${JSON.stringify(value)}`);
	}, [value]);
	return (0, react$1.useMemo)(() => {
		return (0, deepmerge.default)(parentContext ?? {}, value ?? {}, { isMergeableObject: isPlainObject });
	}, [parentContext, value]);
}
var BaseContextSystemProvider = ({ children, value }) => {
	const contextValue = useContextSystemBridge({ value });
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ComponentsContext.Provider, {
		value: contextValue,
		children
	});
};
(0, react$1.memo)(BaseContextSystemProvider);
//#endregion
//#region ../../../node_modules/.pnpm/@wordpress+components@37.0.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/context/constants.mjs
var COMPONENT_NAMESPACE = "data-wp-component";
var CONNECTED_NAMESPACE = "data-wp-c16t";
var CONNECT_STATIC_NAMESPACE = "__contextSystemKey__";
//#endregion
//#region ../../../node_modules/.pnpm/@wordpress+components@37.0.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/context/get-styled-class-name-from-key.mjs
var import_dist = require_dist();
function getStyledClassName(namespace) {
	return `components-${(0, import_dist.paramCase)(namespace)}`;
}
var getStyledClassNameFromKey = memize(getStyledClassName);
//#endregion
//#region ../../../node_modules/.pnpm/@wordpress+components@37.0.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/context/context-connect.mjs
function contextConnect(Component, namespace) {
	return _contextConnect(Component, namespace, { forwardsRef: true });
}
function _contextConnect(Component, namespace, options) {
	const WrappedComponent = options?.forwardsRef ? (0, react$1.forwardRef)(Component) : Component;
	if (typeof namespace === "undefined") globalThis.SCRIPT_DEBUG === true && warning("contextConnect: Please provide a namespace");
	let mergedNamespace = WrappedComponent["__contextSystemKey__"] || [namespace];
	if (Array.isArray(namespace)) mergedNamespace = [...mergedNamespace, ...namespace];
	if (typeof namespace === "string") mergedNamespace = [...mergedNamespace, namespace];
	return Object.assign(WrappedComponent, {
		[CONNECT_STATIC_NAMESPACE]: [...new Set(mergedNamespace)],
		displayName: namespace,
		selector: `.${getStyledClassNameFromKey(namespace)}`
	});
}
//#endregion
//#region ../../../node_modules/.pnpm/@wordpress+components@37.0.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/context/utils.mjs
function getNamespace(componentName) {
	return { [COMPONENT_NAMESPACE]: componentName };
}
function getConnectedNamespace() {
	return { [CONNECTED_NAMESPACE]: true };
}
//#endregion
//#region ../../../node_modules/.pnpm/@wordpress+components@37.0.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/context/use-context-system.mjs
function useContextSystem(props, namespace) {
	const contextSystemProps = useComponentsContext();
	if (typeof namespace === "undefined") globalThis.SCRIPT_DEBUG === true && warning("useContextSystem: Please provide a namespace");
	const contextProps = contextSystemProps?.[namespace] || {};
	const finalComponentProps = {
		...getConnectedNamespace(),
		...getNamespace(namespace)
	};
	const { _overrides: overrideProps, ...otherContextProps } = contextProps;
	const initialMergedProps = Object.entries(otherContextProps).length ? Object.assign({}, otherContextProps, props) : props;
	const classes = useCx()(getStyledClassNameFromKey(namespace), props.className);
	const rendered = typeof initialMergedProps.renderChildren === "function" ? initialMergedProps.renderChildren(initialMergedProps) : initialMergedProps.children;
	for (const key in initialMergedProps) finalComponentProps[key] = initialMergedProps[key];
	for (const key in overrideProps) finalComponentProps[key] = overrideProps[key];
	if (rendered !== void 0) finalComponentProps.children = rendered;
	finalComponentProps.className = classes;
	return finalComponentProps;
}
//#endregion
//#region ../../../node_modules/.pnpm/@wordpress+components@37.0.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/visually-hidden/styles.mjs
var visuallyHidden = {
	border: 0,
	clip: "rect(1px, 1px, 1px, 1px)",
	WebkitClipPath: "inset( 50% )",
	clipPath: "inset( 50% )",
	height: "1px",
	margin: "-1px",
	overflow: "hidden",
	padding: 0,
	position: "absolute",
	width: "1px",
	wordWrap: "normal",
	wordBreak: "normal"
};
//#endregion
//#region ../../../node_modules/.pnpm/@wordpress+components@37.0.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/utils/polymorphic-element.mjs
var customAttributeRegExp = /^(data|aria|x)-/i;
var eventHandlerRegExp = /^on[A-Z]/;
var svgElementNames = new Set(`animate animateMotion animateTransform circle clipPath defs desc ellipse
	feBlend feColorMatrix feComponentTransfer feComposite feConvolveMatrix
	feDiffuseLighting feDisplacementMap feDistantLight feDropShadow feFlood
	feFuncA feFuncB feFuncG feFuncR feGaussianBlur feImage feMerge feMergeNode
	feMorphology feOffset fePointLight feSpecularLighting feSpotLight feTile
	feTurbulence filter foreignObject g image line linearGradient marker mask
	metadata mpath path pattern polygon polyline radialGradient rect set stop svg
	switch symbol text textPath tspan use view`.split(/\s+/));
var baseElementProps = new Set(`children dangerouslySetInnerHTML key autoFocus defaultValue defaultChecked
	innerHTML suppressContentEditableWarning suppressHydrationWarning valueLink
	abbr accept acceptCharset accessKey action allow allowUserMedia
	allowPaymentRequest allowFullScreen allowTransparency alt async autoComplete
	autoPlay capture cellPadding cellSpacing challenge charSet checked cite classID
	className cols colSpan content contentEditable contextMenu controls controlsList
	coords crossOrigin data dateTime decoding default defer dir disabled
	disablePictureInPicture disableRemotePlayback download draggable encType
	enterKeyHint fetchpriority fetchPriority form formAction formEncType formMethod
	formNoValidate formTarget frameBorder headers height hidden high href hrefLang
	htmlFor httpEquiv id inputMode integrity is keyParams keyType kind label lang
	list loading loop low marginHeight marginWidth max maxLength media mediaGroup
	method min minLength multiple muted name nonce noValidate open optimum pattern
	placeholder playsInline popover popoverTarget popoverTargetAction poster
	preload profile radioGroup readOnly referrerPolicy rel required reversed role
	rows rowSpan sandbox scope scoped scrolling seamless selected shape size sizes
	slot span spellCheck src srcDoc srcLang srcSet start step style summary
	tabIndex target title translate type useMap value width wmode wrap about
	datatype inlist prefix property resource typeof vocab autoCapitalize
	autoCorrect autoSave color incremental fallback inert itemProp itemScope
	itemType itemID itemRef on option results security unselectable`.split(/\s+/));
var svgElementProps = new Set(`accentHeight accumulate additive alignmentBaseline allowReorder alphabetic
	amplitude arabicForm ascent attributeName attributeType autoReverse azimuth
	baseFrequency baselineShift baseProfile bbox begin bias by calcMode capHeight
	clip clipPathUnits clipPath clipRule colorInterpolation
	colorInterpolationFilters colorProfile colorRendering contentScriptType
	contentStyleType cursor cx cy d decelerate descent diffuseConstant direction
	display divisor dominantBaseline dur dx dy edgeMode elevation enableBackground
	end exponent externalResourcesRequired fill fillOpacity fillRule filter
	filterRes filterUnits floodColor floodOpacity focusable fontFamily fontSize
	fontSizeAdjust fontStretch fontStyle fontVariant fontWeight format from fr fx
	fy g1 g2 glyphName glyphOrientationHorizontal glyphOrientationVertical
	glyphRef gradientTransform gradientUnits hanging horizAdvX horizOriginX
	ideographic imageRendering in in2 intercept k k1 k2 k3 k4 kernelMatrix
	kernelUnitLength kerning keyPoints keySplines keyTimes lengthAdjust
	letterSpacing lightingColor limitingConeAngle local markerEnd markerMid
	markerStart markerHeight markerUnits markerWidth mask maskContentUnits
	maskUnits mathematical mode numOctaves offset opacity operator order orient
	orientation origin overflow overlinePosition overlineThickness panose1
	paintOrder pathLength patternContentUnits patternTransform patternUnits
	pointerEvents points pointsAtX pointsAtY pointsAtZ preserveAlpha
	preserveAspectRatio primitiveUnits r radius refX refY renderingIntent
	repeatCount repeatDur requiredExtensions requiredFeatures restart result rotate
	rx ry scale seed shapeRendering slope spacing specularConstant
	specularExponent speed spreadMethod startOffset stdDeviation stemh stemv
	stitchTiles stopColor stopOpacity strikethroughPosition strikethroughThickness
	string stroke strokeDasharray strokeDashoffset strokeLinecap strokeLinejoin
	strokeMiterlimit strokeOpacity strokeWidth surfaceScale systemLanguage
	tableValues targetX targetY textAnchor textDecoration textRendering textLength
	to transform u1 u2 underlinePosition underlineThickness unicode unicodeBidi
	unicodeRange unitsPerEm vAlphabetic vHanging vIdeographic vMathematical values
	vectorEffect version vertAdvY vertOriginX vertOriginY viewBox viewTarget
	visibility widths wordSpacing writingMode x xHeight x1 x2 xChannelSelector
	xlinkActuate xlinkArcrole xlinkHref xlinkRole xlinkShow xlinkTitle xlinkType
	xmlBase xmlns xmlnsXlink xmlLang xmlSpace y y1 y2 yChannelSelector z
	zoomAndPan`.split(/\s+/));
var compatElementProps = /* @__PURE__ */ new Set([
	"autofocus",
	"class",
	"for"
]);
function isValidIntrinsicElementProp(prop, element) {
	if (customAttributeRegExp.test(prop) || eventHandlerRegExp.test(prop)) return true;
	if (baseElementProps.has(prop) || compatElementProps.has(prop)) return true;
	return svgElementNames.has(element) && svgElementProps.has(prop);
}
function filterIntrinsicElementProps(props, element) {
	return Object.fromEntries(Object.entries(props).filter(([prop]) => isValidIntrinsicElementProp(prop, element)));
}
function UnforwardedPolymorphicElement({ as, ...props }, ref) {
	const Element = as || "div";
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Element, {
		ref,
		...typeof Element === "string" ? filterIntrinsicElementProps(props, Element) : props
	});
}
var PolymorphicElement = (0, react$1.forwardRef)(UnforwardedPolymorphicElement);
//#endregion
//#region ../../../node_modules/.pnpm/@wordpress+components@37.0.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/view/component.mjs
function UnforwardedView({ css, ...restProps }, ref) {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(PolymorphicElement, {
		ref,
		...restProps
	});
}
var component_default$2 = Object.assign((0, react$1.forwardRef)(UnforwardedView), { selector: ".components-view" });
//#endregion
//#region ../../../node_modules/.pnpm/@wordpress+components@37.0.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/visually-hidden/component.mjs
function UnconnectedVisuallyHidden(props, forwardedRef) {
	const { style: styleProp, ...contextProps } = useContextSystem(props, "VisuallyHidden");
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(component_default$2, {
		ref: forwardedRef,
		...contextProps,
		"data-visually-hidden": "",
		style: {
			...visuallyHidden,
			...styleProp || {}
		}
	});
}
var component_default$1 = contextConnect(UnconnectedVisuallyHidden, "VisuallyHidden");
//#endregion
//#region ../../../node_modules/.pnpm/@wordpress+components@37.0.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/utils/use-responsive-value.mjs
var breakpoints = [
	"40em",
	"52em",
	"64em"
];
var useBreakpointIndex = (options = {}) => {
	const { defaultIndex = 0 } = options;
	if (typeof defaultIndex !== "number") throw new TypeError(`Default breakpoint index should be a number. Got: ${defaultIndex}, ${typeof defaultIndex}`);
	else if (defaultIndex < 0 || defaultIndex > breakpoints.length - 1) throw new RangeError(`Default breakpoint index out of range. Theme has ${breakpoints.length} breakpoints, got index ${defaultIndex}`);
	const [value, setValue] = (0, react$1.useState)(defaultIndex);
	(0, react$1.useEffect)(() => {
		const getIndex = () => breakpoints.filter((bp) => {
			return typeof window !== "undefined" ? window.matchMedia(`screen and (min-width: ${bp})`).matches : false;
		}).length;
		const onResize = () => {
			const newValue = getIndex();
			if (value !== newValue) setValue(newValue);
		};
		onResize();
		if (typeof window !== "undefined") window.addEventListener("resize", onResize);
		return () => {
			if (typeof window !== "undefined") window.removeEventListener("resize", onResize);
		};
	}, [value]);
	return value;
};
function useResponsiveValue(values, options = {}) {
	const index = useBreakpointIndex(options);
	if (!Array.isArray(values) && typeof values !== "function") return values;
	const array = values || [];
	return array[index >= array.length ? array.length - 1 : index];
}
//#endregion
//#region ../../../node_modules/.pnpm/@wordpress+components@37.0.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/grid/utils.mjs
var ALIGNMENTS = {
	bottom: {
		alignItems: "flex-end",
		justifyContent: "center"
	},
	bottomLeft: {
		alignItems: "flex-start",
		justifyContent: "flex-end"
	},
	bottomRight: {
		alignItems: "flex-end",
		justifyContent: "flex-end"
	},
	center: {
		alignItems: "center",
		justifyContent: "center"
	},
	spaced: {
		alignItems: "center",
		justifyContent: "space-between"
	},
	left: {
		alignItems: "center",
		justifyContent: "flex-start"
	},
	right: {
		alignItems: "center",
		justifyContent: "flex-end"
	},
	stretch: { alignItems: "stretch" },
	top: {
		alignItems: "flex-start",
		justifyContent: "center"
	},
	topLeft: {
		alignItems: "flex-start",
		justifyContent: "flex-start"
	},
	topRight: {
		alignItems: "flex-start",
		justifyContent: "flex-end"
	}
};
function getAlignmentProps(alignment) {
	return alignment ? ALIGNMENTS[alignment] : {};
}
//#endregion
//#region ../../../node_modules/.pnpm/@wordpress+components@37.0.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/grid/hook.mjs
function useGrid(props) {
	const { align, alignment, className, columnGap, columns = 2, gap = 3, isInline = false, justify, rowGap, rows, templateColumns, templateRows, ...otherProps } = useContextSystem(props, "Grid");
	const column = useResponsiveValue(Array.isArray(columns) ? columns : [columns]);
	const row = useResponsiveValue(Array.isArray(rows) ? rows : [rows]);
	const gridTemplateColumns = templateColumns || !!columns && `repeat( ${column}, 1fr )`;
	const gridTemplateRows = templateRows || !!rows && `repeat( ${row}, 1fr )`;
	const cx = useCx();
	const classes = (0, react$1.useMemo)(() => {
		const alignmentProps = getAlignmentProps(alignment);
		const gridClasses = /* @__PURE__ */ css$1({
			alignItems: align,
			display: isInline ? "inline-grid" : "grid",
			gap: `calc( ${config_values_default.gridBase} * ${gap} )`,
			gridTemplateColumns: gridTemplateColumns || void 0,
			gridTemplateRows: gridTemplateRows || void 0,
			gridRowGap: rowGap,
			gridColumnGap: columnGap,
			justifyContent: justify,
			verticalAlign: isInline ? "middle" : void 0,
			...alignmentProps
		}, process.env.NODE_ENV === "production" ? "" : ";label:gridClasses;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvb2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBdURzQiIsImZpbGUiOiJob29rLnRzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuXG4vKipcbiAqIFdvcmRQcmVzcyBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgdXNlTWVtbyB9IGZyb20gJ0B3b3JkcHJlc3MvZWxlbWVudCc7XG5cbi8qKlxuICogSW50ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB0eXBlIHsgV29yZFByZXNzQ29tcG9uZW50UHJvcHMgfSBmcm9tICcuLi9jb250ZXh0JztcbmltcG9ydCB7IHVzZUNvbnRleHRTeXN0ZW0gfSBmcm9tICcuLi9jb250ZXh0JztcbmltcG9ydCB7IGdldEFsaWdubWVudFByb3BzIH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgeyB1c2VSZXNwb25zaXZlVmFsdWUgfSBmcm9tICcuLi91dGlscy91c2UtcmVzcG9uc2l2ZS12YWx1ZSc7XG5pbXBvcnQgQ09ORklHIGZyb20gJy4uL3V0aWxzL2NvbmZpZy12YWx1ZXMnO1xuaW1wb3J0IHsgdXNlQ3ggfSBmcm9tICcuLi91dGlscy9ob29rcy91c2UtY3gnO1xuaW1wb3J0IHR5cGUgeyBHcmlkUHJvcHMgfSBmcm9tICcuL3R5cGVzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdXNlR3JpZChcblx0cHJvcHM6IFdvcmRQcmVzc0NvbXBvbmVudFByb3BzPCBHcmlkUHJvcHMsICdkaXYnID5cbikge1xuXHRjb25zdCB7XG5cdFx0YWxpZ24sXG5cdFx0YWxpZ25tZW50LFxuXHRcdGNsYXNzTmFtZSxcblx0XHRjb2x1bW5HYXAsXG5cdFx0Y29sdW1ucyA9IDIsXG5cdFx0Z2FwID0gMyxcblx0XHRpc0lubGluZSA9IGZhbHNlLFxuXHRcdGp1c3RpZnksXG5cdFx0cm93R2FwLFxuXHRcdHJvd3MsXG5cdFx0dGVtcGxhdGVDb2x1bW5zLFxuXHRcdHRlbXBsYXRlUm93cyxcblx0XHQuLi5vdGhlclByb3BzXG5cdH0gPSB1c2VDb250ZXh0U3lzdGVtKCBwcm9wcywgJ0dyaWQnICk7XG5cblx0Y29uc3QgY29sdW1uc0FzQXJyYXkgPSBBcnJheS5pc0FycmF5KCBjb2x1bW5zICkgPyBjb2x1bW5zIDogWyBjb2x1bW5zIF07XG5cdGNvbnN0IGNvbHVtbiA9IHVzZVJlc3BvbnNpdmVWYWx1ZSggY29sdW1uc0FzQXJyYXkgKTtcblx0Y29uc3Qgcm93c0FzQXJyYXkgPSBBcnJheS5pc0FycmF5KCByb3dzICkgPyByb3dzIDogWyByb3dzIF07XG5cdGNvbnN0IHJvdyA9IHVzZVJlc3BvbnNpdmVWYWx1ZSggcm93c0FzQXJyYXkgKTtcblxuXHRjb25zdCBncmlkVGVtcGxhdGVDb2x1bW5zID1cblx0XHR0ZW1wbGF0ZUNvbHVtbnMgfHwgKCAhISBjb2x1bW5zICYmIGByZXBlYXQoICR7IGNvbHVtbiB9LCAxZnIgKWAgKTtcblx0Y29uc3QgZ3JpZFRlbXBsYXRlUm93cyA9XG5cdFx0dGVtcGxhdGVSb3dzIHx8ICggISEgcm93cyAmJiBgcmVwZWF0KCAkeyByb3cgfSwgMWZyIClgICk7XG5cblx0Y29uc3QgY3ggPSB1c2VDeCgpO1xuXG5cdGNvbnN0IGNsYXNzZXMgPSB1c2VNZW1vKCAoKSA9PiB7XG5cdFx0Y29uc3QgYWxpZ25tZW50UHJvcHMgPSBnZXRBbGlnbm1lbnRQcm9wcyggYWxpZ25tZW50ICk7XG5cblx0XHRjb25zdCBncmlkQ2xhc3NlcyA9IGNzcygge1xuXHRcdFx0YWxpZ25JdGVtczogYWxpZ24sXG5cdFx0XHRkaXNwbGF5OiBpc0lubGluZSA/ICdpbmxpbmUtZ3JpZCcgOiAnZ3JpZCcsXG5cdFx0XHRnYXA6IGBjYWxjKCAkeyBDT05GSUcuZ3JpZEJhc2UgfSAqICR7IGdhcCB9IClgLFxuXHRcdFx0Z3JpZFRlbXBsYXRlQ29sdW1uczogZ3JpZFRlbXBsYXRlQ29sdW1ucyB8fCB1bmRlZmluZWQsXG5cdFx0XHRncmlkVGVtcGxhdGVSb3dzOiBncmlkVGVtcGxhdGVSb3dzIHx8IHVuZGVmaW5lZCxcblx0XHRcdGdyaWRSb3dHYXA6IHJvd0dhcCxcblx0XHRcdGdyaWRDb2x1bW5HYXA6IGNvbHVtbkdhcCxcblx0XHRcdGp1c3RpZnlDb250ZW50OiBqdXN0aWZ5LFxuXHRcdFx0dmVydGljYWxBbGlnbjogaXNJbmxpbmUgPyAnbWlkZGxlJyA6IHVuZGVmaW5lZCxcblx0XHRcdC4uLmFsaWdubWVudFByb3BzLFxuXHRcdH0gKTtcblxuXHRcdHJldHVybiBjeCggZ3JpZENsYXNzZXMsIGNsYXNzTmFtZSApO1xuXHR9LCBbXG5cdFx0YWxpZ24sXG5cdFx0YWxpZ25tZW50LFxuXHRcdGNsYXNzTmFtZSxcblx0XHRjb2x1bW5HYXAsXG5cdFx0Y3gsXG5cdFx0Z2FwLFxuXHRcdGdyaWRUZW1wbGF0ZUNvbHVtbnMsXG5cdFx0Z3JpZFRlbXBsYXRlUm93cyxcblx0XHRpc0lubGluZSxcblx0XHRqdXN0aWZ5LFxuXHRcdHJvd0dhcCxcblx0XSApO1xuXG5cdHJldHVybiB7IC4uLm90aGVyUHJvcHMsIGNsYXNzTmFtZTogY2xhc3NlcyB9O1xufVxuIl19 */");
		return cx(gridClasses, className);
	}, [
		align,
		alignment,
		className,
		columnGap,
		cx,
		gap,
		gridTemplateColumns,
		gridTemplateRows,
		isInline,
		justify,
		rowGap
	]);
	return {
		...otherProps,
		className: classes
	};
}
//#endregion
//#region ../../../node_modules/.pnpm/@wordpress+components@37.0.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/grid/component.mjs
function UnconnectedGrid(props, forwardedRef) {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(component_default$2, {
		...useGrid(props),
		ref: forwardedRef
	});
}
var component_default = contextConnect(UnconnectedGrid, "Grid");
//#endregion
//#region src/charts/leaderboard-chart/hooks/use-fitted-row-count.ts
/**
* Fractional layout rounding can put a row's bottom a hair past the container's
* without any visible clipping. Allow that much slack before hiding a row.
*
* Exported so tests and stories assert against the real tolerance rather than
* restating it.
*/
const SUBPIXEL_TOLERANCE = .5;
/**
* Counts how many leading rows fit inside the content container.
*
* Rows are read from the DOM rather than derived from constants: row height
* depends on the theme's row gap, label wrapping, and whatever a caller renders
* as a label, so any restated number would drift.
*
* Every row is a direct grid child marked with `data-row-index`; interactive rows
* use a button wrapper and non-interactive rows use a div wrapper.
*
* @param enabled  - Whether to measure at all. When false every row fits.
* @param rowCount - Total number of rows rendered.
* @param data     - Rendered row data, whose geometry may change without changing the count.
* @return Ref for the content container and the number of leading rows that fit.
*/
function useFittedRowCount(enabled, rowCount, data) {
	const contentRef = (0, react$1.useRef)(null);
	const [fittedCount, setFittedCount] = (0, react$1.useState)(rowCount);
	const [isMeasurable, setIsMeasurable] = (0, react$1.useState)(true);
	const measure = (0, react$1.useCallback)(() => {
		const content = contentRef.current;
		if (!content) return;
		content.scrollTop = 0;
		const rows = content.querySelectorAll(":scope > [data-leaderboard-grid] > [data-row-index]");
		const rowBottoms = [];
		rows.forEach((row) => {
			const index = Number(row.getAttribute("data-row-index"));
			if (!Number.isInteger(index) || index < 0 || index >= rowCount) return;
			const { bottom } = row.getBoundingClientRect();
			rowBottoms[index] = Math.max(rowBottoms[index] ?? -Infinity, bottom);
		});
		if (rowBottoms.length === 0) {
			setIsMeasurable(false);
			setFittedCount(rowCount);
			return;
		}
		setIsMeasurable(true);
		const contentBottom = content.getBoundingClientRect().bottom + SUBPIXEL_TOLERANCE;
		let fits = 0;
		while (fits < rowBottoms.length && rowBottoms[fits] <= contentBottom) fits++;
		setFittedCount((current) => current === fits ? current : fits);
	}, [rowCount]);
	(0, react$1.useLayoutEffect)(() => {
		if (!enabled) {
			setFittedCount(rowCount);
			return;
		}
		measure();
	}, [
		enabled,
		rowCount,
		data,
		measure
	]);
	(0, react$1.useLayoutEffect)(() => {
		if (!enabled) return;
		const content = contentRef.current;
		if (!content) return;
		const observer = new ResizeObserver(measure);
		observer.observe(content);
		const grid = content.querySelector(":scope > [data-leaderboard-grid]");
		if (grid) observer.observe(grid);
		return () => observer.disconnect();
	}, [
		enabled,
		rowCount,
		measure
	]);
	return {
		contentRef,
		fittedCount: enabled ? fittedCount : rowCount,
		isMeasurable
	};
}
//#endregion
//#region src/charts/leaderboard-chart/hooks/use-leaderboard-legend-items.ts
/**
* Hook to create legend items from leaderboard data
* @param root0                         - Configuration object
* @param root0.data                    - Array of leaderboard entries
* @param root0.primaryColor            - Primary color override
* @param root0.secondaryColor          - Secondary color override
* @param root0.withComparison          - Whether comparison data is shown
* @param root0.withOverlayLabel        - Whether to overlay the label on top of the bar
* @param root0.legendLabels            - Custom labels for legend items
* @param root0.legendLabels.primary    - Label for primary period data
* @param root0.legendLabels.comparison - Label for comparison period data
* @return Array of legend items for the leaderboard chart
*/
function useLeaderboardLegendItems({ data, primaryColor, secondaryColor, withComparison = false, withOverlayLabel = false, legendLabels }) {
	const { leaderboardChart: leaderboardChartSettings } = useGlobalChartsTheme();
	const { getElementStyles } = useGlobalChartsContext();
	return (0, react$1.useMemo)(() => {
		if (!data || data.length === 0) return [];
		const items = [];
		const { color: resolvedPrimaryColor } = getElementStyles({
			index: 0,
			overrideColor: primaryColor || leaderboardChartSettings.primaryColor
		});
		items.push({
			label: legendLabels?.primary || (0, _wordpress_i18n.__)("Current period", "jetpack-charts"),
			color: resolvedPrimaryColor
		});
		if (withComparison && !withOverlayLabel) {
			const { color: resolvedSecondaryColor } = getElementStyles({
				index: 1,
				overrideColor: secondaryColor || leaderboardChartSettings.secondaryColor
			});
			items.push({
				label: legendLabels?.comparison || (0, _wordpress_i18n.__)("Previous period", "jetpack-charts"),
				color: resolvedSecondaryColor
			});
		}
		return items;
	}, [
		data,
		primaryColor,
		secondaryColor,
		withComparison,
		legendLabels,
		leaderboardChartSettings,
		getElementStyles,
		withOverlayLabel
	]);
}
//#endregion
//#region src/charts/leaderboard-chart/leaderboard-chart.module.scss
var leaderboard_chart_module_default = {
	"bar": "a8ccharts-GovfoW-bar",
	"bar--animated": "a8ccharts-GovfoW-bar--animated",
	"barWithLabelContainer": "a8ccharts-GovfoW-barWithLabelContainer",
	"chevron": "a8ccharts-GovfoW-chevron",
	"deltaPlaceholder": "a8ccharts-GovfoW-deltaPlaceholder",
	"deltaValue": "a8ccharts-GovfoW-deltaValue",
	"emptyState": "a8ccharts-GovfoW-emptyState",
	"fitEmptyState": "a8ccharts-GovfoW-fitEmptyState",
	"interactiveRow": "a8ccharts-GovfoW-interactiveRow",
	"is-overlay": "a8ccharts-GovfoW-is-overlay",
	"label": "a8ccharts-GovfoW-label",
	"leaderboardChart": "a8ccharts-GovfoW-leaderboardChart",
	"leaderboardChart__content": "a8ccharts-GovfoW-leaderboardChart__content",
	"leaderboardChart__content--fit": "a8ccharts-GovfoW-leaderboardChart__content--fit",
	"leaderboardChart--loading": "a8ccharts-GovfoW-leaderboardChart--loading",
	"leaderboardChart--responsive": "a8ccharts-GovfoW-leaderboardChart--responsive",
	"overlap": "a8ccharts-GovfoW-overlap",
	"overlayLabel": "a8ccharts-GovfoW-overlayLabel",
	"row": "a8ccharts-GovfoW-row",
	"stretch": "a8ccharts-GovfoW-stretch",
	"valueContainer": "a8ccharts-GovfoW-valueContainer"
};
//#endregion
//#region src/charts/leaderboard-chart/leaderboard-chart.tsx
/**
* Default value formatter using formatMetricValue
*
* @param value - The numeric value to format
* @return Formatted string representation of the value
*/
const defaultValueFormatter = (value) => {
	return formatMetricValue(value, "number", {
		useMultipliers: true,
		decimals: 1
	});
};
/**
* Default delta formatter using formatMetricValue
*
* @param value - The delta value to format
* @return Formatted percentage string
*/
const defaultDeltaFormatter = (value) => {
	return formatMetricValue(value / 100, "average", {
		decimals: 0,
		signDisplay: "exceptZero"
	});
};
/**
* Build a bar's width. A hover-inset CSS variable (0 by default) is subtracted
* on hover, scaled by the bar's share so the pull-back is proportional to its
* length: the full-length (100%) bar — the one that reaches the value — pulls
* back the whole inset to keep its gap with the value, while shorter bars pull
* back proportionally less, down to ~0 for a very short bar.
*
* @param share - The bar's share of the row width, as a percentage.
* @return A CSS width value.
*/
const getBarWidth = (share) => `calc(${share}% - var(--a8c-charts-dimension-leaderboard-bar-hover-inset, 0px) * ${share} / 100)`;
const hasComparisonValue = (entry) => entry.previousValue != null && entry.previousShare != null && entry.delta != null;
const BarLabel = ({ label }) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react_jsx_runtime.Fragment, { children: typeof label === "string" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Text$2, {
	className: leaderboard_chart_module_default.label,
	children: label
}) : label });
const BarWithLabel = ({ entry, withComparison, withOverlayLabel, primaryColor, secondaryColor, animation, isPrimaryVisible = true, isComparisonVisible = true }) => {
	const showComparisonBar = withComparison && !withOverlayLabel && isComparisonVisible;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: (0, clsx.default)(leaderboard_chart_module_default.barWithLabelContainer, { [leaderboard_chart_module_default["is-overlay"]]: withOverlayLabel }),
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(BarLabel, { label: entry.label }),
			isPrimaryVisible && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: (0, clsx.default)(leaderboard_chart_module_default.bar, { [leaderboard_chart_module_default["bar--animated"]]: animation }),
				style: {
					width: getBarWidth(entry.currentShare),
					backgroundColor: primaryColor
				}
			}),
			showComparisonBar && hasComparisonValue(entry) && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: (0, clsx.default)(leaderboard_chart_module_default.bar, { [leaderboard_chart_module_default["bar--animated"]]: animation }),
				style: {
					width: getBarWidth(entry.previousShare),
					backgroundColor: secondaryColor
				}
			})
		]
	});
};
/**
* LeaderboardChart component displays a ranked list of data with progress bars
* and optional comparison values.
*
* @param props                  - Component props
* @param props.data             - Array of leaderboard entries to display
* @param props.chartId          - Optional unique identifier for the chart
* @param props.width            - Optional width of the chart container in pixels
* @param props.height           - Optional height of the chart container in pixels
* @param props.withComparison   - Whether to show comparison data
* @param props.withOverlayLabel - Whether to overlay the label on top of the bar
* @param props.primaryColor     - Primary color for current period bars
* @param props.secondaryColor   - Secondary color for comparison period bars
* @param props.valueFormatter   - Custom formatter for values
* @param props.deltaFormatter   - Custom formatter for delta values
* @param props.loading          - Whether the chart is in loading state
* @param props.fitRows          - Whether to show only the rows that fit the chart's height
* @param props.animation        - Whether the chart should animate on load
* @param props.showLegend       - Whether to show legend
* @param props.legend           - Legend configuration (orientation, position, alignment, shape, shapeStyles, interactive)
* @param props.legendLabels     - Custom labels for legend items
* @param props.gap              - Spacing between legend and chart content
* @param props.children         - Child components for composition API
* @param props.className        - Additional CSS class name
* @param props.style            - Custom styling for the chart container
* @return JSX element representing the leaderboard chart
*/
const LeaderboardChartInternal = ({ data, chartId: providedChartId, width: propWidth, height: propHeight, withComparison = false, withOverlayLabel = false, primaryColor, secondaryColor, valueFormatter = defaultValueFormatter, deltaFormatter = defaultDeltaFormatter, animation, loading = false, fitRows = false, showLegend = false, legend = {}, legendLabels, gap = "md", className, style, children }) => {
	const legendInteractive = legend.interactive ?? false;
	const legendPosition = legend.position ?? "bottom";
	const chartId = useChartId(providedChartId);
	const { leaderboardChart: leaderboardChartSettings } = useGlobalChartsTheme();
	const legendShapeStyles = {
		width: 8,
		height: 8,
		...legend.shapeStyles
	};
	const { legendChildren, nonLegendChildren } = useChartChildren(children, "LeaderboardChart");
	const { labelSpacing, rowGap, columnGap, primaryColor: settingsPrimaryColor, secondaryColor: settingsSecondaryColor, deltaColors } = leaderboardChartSettings;
	const { getElementStyles, isSeriesVisible } = useGlobalChartsContext();
	const { color: resolvedPrimaryColor } = getElementStyles({
		index: 0,
		overrideColor: primaryColor || settingsPrimaryColor
	});
	const { color: resolvedSecondaryColor } = getElementStyles({
		index: 1,
		overrideColor: secondaryColor || settingsSecondaryColor
	});
	const legendItems = useLeaderboardLegendItems({
		data: data || [],
		primaryColor,
		secondaryColor,
		withComparison,
		withOverlayLabel,
		legendLabels
	});
	const isPrimaryVisible = (0, react$1.useMemo)(() => {
		if (!chartId || !legendInteractive || legendItems.length === 0) return true;
		return isSeriesVisible(chartId, legendItems[0].label);
	}, [
		chartId,
		legendInteractive,
		legendItems,
		isSeriesVisible
	]);
	const isComparisonVisible = (0, react$1.useMemo)(() => {
		if (!chartId || !legendInteractive || legendItems.length < 2) return true;
		return isSeriesVisible(chartId, legendItems[1].label);
	}, [
		chartId,
		legendInteractive,
		legendItems,
		isSeriesVisible
	]);
	const allSeriesHidden = (0, react$1.useMemo)(() => {
		if (!legendInteractive) return false;
		if (withComparison && !withOverlayLabel) return !isPrimaryVisible && !isComparisonVisible;
		return !isPrimaryVisible;
	}, [
		legendInteractive,
		isPrimaryVisible,
		isComparisonVisible,
		withComparison,
		withOverlayLabel
	]);
	useChartRegistration({
		chartId,
		legendItems,
		chartType: "leaderboard",
		isDataValid: Boolean(data && data.length > 0),
		metadata: (0, react$1.useMemo)(() => ({
			withComparison,
			withOverlayLabel
		}), [withComparison, withOverlayLabel])
	});
	const prefersReducedMotion = usePrefersReducedMotion();
	const { contentRef, fittedCount, isMeasurable } = useFittedRowCount(fitRows && !allSeriesHidden, data?.length ?? 0, data);
	const shouldFitRows = fitRows && isMeasurable;
	if (!data || data.length === 0) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SingleChartContext.Provider, {
		value: { chartId },
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChartLayout, {
			legendPosition,
			legendElement: false,
			legendChildren,
			className: (0, clsx.default)(leaderboard_chart_module_default.leaderboardChart, {
				[leaderboard_chart_module_default["leaderboardChart--responsive"]]: !propWidth && !propHeight,
				[leaderboard_chart_module_default["leaderboardChart--loading"]]: loading
			}, className),
			gap,
			style: {
				...style,
				width: propWidth || void 0,
				height: propHeight || void 0
			},
			trailingContent: nonLegendChildren,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: leaderboard_chart_module_default.emptyState,
				children: loading ? (0, _wordpress_i18n.__)("Loading…", "jetpack-charts") : (0, _wordpress_i18n.__)("No data available", "jetpack-charts")
			})
		})
	});
	const legendElement = showLegend && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Legend, {
		orientation: legend.orientation ?? "horizontal",
		position: legendPosition,
		alignment: legend.alignment ?? "center",
		labelStyles: legend.labelStyles,
		itemClassName: legend.itemClassName,
		itemStyles: legend.itemStyles,
		shape: legend.shape ?? "circle",
		shapeStyles: legendShapeStyles,
		chartId,
		interactive: legendInteractive
	});
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SingleChartContext.Provider, {
		value: { chartId },
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChartLayout, {
			legendPosition,
			legendElement,
			legendChildren,
			className: (0, clsx.default)(leaderboard_chart_module_default.leaderboardChart, {
				[leaderboard_chart_module_default["leaderboardChart--responsive"]]: !propWidth && !propHeight,
				[leaderboard_chart_module_default["leaderboardChart--loading"]]: loading
			}, className),
			gap,
			style: {
				...style,
				width: propWidth || void 0,
				height: propHeight || void 0
			},
			trailingContent: nonLegendChildren,
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				ref: contentRef,
				className: (0, clsx.default)(leaderboard_chart_module_default.leaderboardChart__content, { [leaderboard_chart_module_default["leaderboardChart__content--fit"]]: shouldFitRows }),
				children: [shouldFitRows && fittedCount === 0 && !allSeriesHidden && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: (0, clsx.default)(leaderboard_chart_module_default.emptyState, leaderboard_chart_module_default.fitEmptyState),
					children: (0, _wordpress_i18n.__)("Not enough space to display data", "jetpack-charts")
				}), allSeriesHidden ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: leaderboard_chart_module_default.emptyState,
					children: (0, _wordpress_i18n.__)("All series are hidden. Click legend items to show data.", "jetpack-charts")
				}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(component_default, {
					templateColumns: "minmax(0, 1fr) auto",
					rowGap,
					columnGap,
					"data-leaderboard-grid": true,
					children: data.map((entry, rowIndex) => {
						const rowStyle = shouldFitRows && rowIndex >= fittedCount ? { visibility: "hidden" } : void 0;
						const showComparisonColumn = withComparison && isComparisonVisible;
						const hasDeltaValue = hasComparisonValue(entry);
						const showComparisonValue = showComparisonColumn && hasDeltaValue;
						const showComparisonPlaceholder = showComparisonColumn && !hasDeltaValue;
						const colorIndex = showComparisonValue ? Math.sign(entry.delta) + 1 : 1;
						const deltaColor = deltaColors[colorIndex];
						const rowCells = /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Stack, {
							direction: "column",
							gap: labelSpacing,
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(BarWithLabel, {
								entry,
								withComparison,
								withOverlayLabel,
								primaryColor: resolvedPrimaryColor,
								secondaryColor: resolvedSecondaryColor,
								isPrimaryVisible,
								isComparisonVisible,
								animation: animation && !loading && !prefersReducedMotion
							})
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(Stack, {
							direction: "row",
							gap: "xs",
							className: (0, clsx.default)(leaderboard_chart_module_default.valueContainer, { [leaderboard_chart_module_default.overlayLabel]: withOverlayLabel }),
							children: [
								isPrimaryVisible && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Text$2, { children: valueFormatter(entry.currentValue) }),
								showComparisonValue && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Text$2, {
									className: leaderboard_chart_module_default.deltaValue,
									style: { color: deltaColor },
									children: deltaFormatter(entry.delta)
								}),
								showComparisonPlaceholder && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(Text$2, {
									className: (0, clsx.default)(leaderboard_chart_module_default.deltaValue, leaderboard_chart_module_default.deltaPlaceholder),
									style: { color: deltaColor },
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										"aria-hidden": "true",
										children: "-"
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(component_default$1, {
										as: "span",
										children: (0, _wordpress_i18n.__)("No comparison data", "jetpack-charts")
									})]
								})
							]
						})] });
						if (entry.onClick) return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
							type: "button",
							"data-row-index": rowIndex,
							style: rowStyle,
							className: (0, clsx.default)(leaderboard_chart_module_default.row, leaderboard_chart_module_default.interactiveRow),
							onClick: entry.onClick,
							"aria-label": entry.ariaLabel,
							children: [rowCells, /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_wordpress_icons.Icon, {
								className: leaderboard_chart_module_default.chevron,
								icon: _wordpress_icons.chevronRight,
								size: 24
							})]
						}, entry.id);
						return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							"data-row-index": rowIndex,
							style: rowStyle,
							className: leaderboard_chart_module_default.row,
							children: rowCells
						}, entry.id);
					})
				})]
			})
		})
	});
};
const LeaderboardChartWithProvider = (props) => {
	if ((0, react$1.useContext)(GlobalChartsContext)) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(LeaderboardChartInternal, { ...props });
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(GlobalChartsProvider, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(LeaderboardChartInternal, { ...props }) });
};
LeaderboardChartWithProvider.displayName = "LeaderboardChart";
const LeaderboardChart = attachSubComponents(LeaderboardChartWithProvider, { Legend });
const LeaderboardChartResponsive = attachSubComponents(withResponsive(LeaderboardChartWithProvider), { Legend });
//#endregion
//#region src/charts/private/radial-wipe-animation/radial-wipe-animation.tsx
/**
* Renders a SVG mask that creates a radial wipe animation effect.
*
* @param {RadialWipeAnimationProps} props - Component props
* @return {JSX.Element} The rendered mask component
*/
function RadialWipeAnimation({ id, radius, innerRadius = 0, durationMs = 1e3, wipePercentage = 100, direction = "clockwise", startAngle = "-90deg" }) {
	const strokeWidth = (radius - innerRadius) * 2 + 1;
	const scaleY = direction === "clockwise" ? -1 : 1;
	const animationDuration = `${0 < wipePercentage && wipePercentage <= 100 ? durationMs * (100 / wipePercentage) : 0}ms`;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("mask", {
		id,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("circle", {
			cx: 0,
			cy: 0,
			r: radius,
			pathLength: "100",
			fill: "white",
			stroke: "black",
			strokeWidth,
			strokeDasharray: "100, 1000",
			strokeDashoffset: "0",
			style: { transform: `rotate(${startAngle}) scaleY(${scaleY})` },
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("animate", {
				attributeName: "stroke-dashoffset",
				from: "0",
				to: "100.1",
				dur: animationDuration,
				fill: "freeze",
				calcMode: "spline",
				keySplines: "0.42 0 0.58 1;0 0 1 1",
				keyTimes: `0;${wipePercentage / 100};1`
			})
		})
	});
}
//#endregion
//#region src/charts/pie-chart/pie-chart.module.scss
var pie_chart_module_default = {
	"pie-chart": "a8ccharts-gnszbG-pie-chart",
	"pie-chart--responsive": "a8ccharts-gnszbG-pie-chart--responsive"
};
//#endregion
//#region src/charts/pie-chart/pie-chart.tsx
/**
* Default tooltip renderer for pie charts.
* Renders a BaseTooltip with the hovered segment's data.
*
* @param {PieChartRenderTooltipParams} params - The tooltip parameters containing the hovered data point
* @return {ReactNode} The rendered tooltip content
*/
const renderDefaultPieTooltip = ({ tooltipData }) => {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(BaseTooltip, {
		data: tooltipData,
		top: 0,
		left: 0,
		renderContainer: false
	});
};
/**
* Validates the pie chart data
* @param data - The data to validate
* @return Object containing validation result and error message
*/
const validateData$1 = (data) => {
	if (!data.length) return {
		isValid: false,
		message: "No data available"
	};
	if (data.some((item) => item.value < 0)) return {
		isValid: false,
		message: "Invalid data: Negative values are not allowed"
	};
	if (data.reduce((sum, item) => sum + item.value, 0) <= 0) return {
		isValid: false,
		message: "Invalid data: Total value must be greater than 0"
	};
	return {
		isValid: true,
		message: ""
	};
};
/**
* Renders a pie or donut chart using the provided data.
*
* @param {PieChartProps} props - Component props
* @return {JSX.Element} The rendered chart component
*/
const PieChartInternal = ({ data, chartId: providedChartId, withTooltips = false, className, showLegend = false, legend = {}, width: propWidth, height: propHeight, size, animation, thickness = 1, padding = 0, gapScale = 0, cornerScale = 0, showLabels = true, legendValueDisplay = "percentage", children = null, tooltipOffsetX = 0, tooltipOffsetY = -15, renderTooltip = renderDefaultPieTooltip, gap = "md" }) => {
	const legendInteractive = legend.interactive ?? false;
	const legendPosition = legend.position ?? "bottom";
	const providerTheme = useGlobalChartsTheme();
	const chartId = useChartId(providedChartId);
	const { tooltipOpen, tooltipLeft, tooltipTop, tooltipData, hideTooltip, showTooltip } = (0, _visx_tooltip.useTooltip)();
	const { containerRef, TooltipInPortal, containerBounds } = (0, _visx_tooltip.useTooltipInPortal)({
		detectBounds: true,
		scroll: true,
		debounce: 0
	});
	const onMouseLeave = (0, react$1.useCallback)(() => {
		if (!withTooltips) return;
		hideTooltip();
	}, [withTooltips, hideTooltip]);
	const { getElementStyles, isSeriesVisible } = useGlobalChartsContext();
	const { visibleData, allSegmentsHidden, legendData } = useInteractiveLegendData({
		data: useDataWithPercentages(data),
		chartId,
		legendInteractive,
		isSeriesVisible
	});
	const legendItems = useChartLegendItems(legendData, (0, react$1.useMemo)(() => ({
		showValues: true,
		legendValueDisplay
	}), [legendValueDisplay]));
	const { isValid, message } = validateData$1(data);
	const { svgChildren, htmlChildren, legendChildren, otherChildren } = useChartChildren(children, "PieChart");
	useChartRegistration({
		chartId,
		legendItems,
		chartType: "pie",
		isDataValid: isValid,
		metadata: (0, react$1.useMemo)(() => ({
			thickness,
			gapScale,
			cornerScale
		}), [
			thickness,
			gapScale,
			cornerScale
		])
	});
	const prefersReducedMotion = usePrefersReducedMotion();
	if (!isValid) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: (0, clsx.default)("pie-chart", pie_chart_module_default["pie-chart"], className),
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: pie_chart_module_default["error-message"],
			children: message
		})
	});
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
	const legendElement = showLegend && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Legend, {
		orientation: legend.orientation ?? "horizontal",
		position: legendPosition,
		alignment: legend.alignment ?? "center",
		labelStyles: legend.labelStyles,
		itemClassName: legend.itemClassName,
		itemStyles: legend.itemStyles,
		shapeStyles: legend.shapeStyles,
		shape: legend.shape ?? "circle",
		chartId,
		interactive: legendInteractive
	});
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SingleChartContext.Provider, {
		value: { chartId },
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChartLayout, {
			legendPosition,
			legendElement,
			legendChildren,
			gap,
			className: (0, clsx.default)("pie-chart", pie_chart_module_default["pie-chart"], { [pie_chart_module_default["pie-chart--responsive"]]: !propWidth && !propHeight }, className),
			style: {
				width: propWidth || void 0,
				height: propHeight || void 0
			},
			trailingContent: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
				withTooltips && tooltipOpen && tooltipData && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TooltipInPortal, {
					top: tooltipTop || 0,
					left: tooltipLeft || 0,
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						role: "tooltip",
						children: renderTooltip({ tooltipData })
					})
				}),
				htmlChildren,
				otherChildren
			] }),
			children: ({ contentWidth, contentHeight }) => {
				const availableSize = Math.min(contentWidth > 0 ? contentWidth : 300, contentHeight > 0 ? contentHeight : 300);
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
				return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Center, {
					ref: containerRef,
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", {
						viewBox: `0 0 ${width} ${height}`,
						preserveAspectRatio: "xMidYMid meet",
						width,
						height,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(RadialWipeAnimation, {
							id: `radial-wipe-${chartId}`,
							radius: outerRadius,
							innerRadius
						}) }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_visx_group.Group, {
							top: centerY,
							left: centerX,
							mask: animation && !prefersReducedMotion ? `url(#radial-wipe-${chartId})` : null,
							children: [allSegmentsHidden ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SvgEmptyState, {
								x: 0,
								y: 0,
								width,
								height,
								children: (0, _wordpress_i18n.__)("All segments are hidden. Click legend items to show data.", "jetpack-charts")
							}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_visx_shape.Pie, {
								data: dataWithIndex,
								pieValue: accessors.value,
								outerRadius,
								innerRadius,
								padAngle,
								cornerRadius,
								children: (pie) => {
									return pie.arcs.map((arc, index) => {
										const [centroidX, centroidY] = pie.path.centroid(arc);
										const hasSpaceForLabel = arc.endAngle - arc.startAngle >= .25;
										const handleMouseMove = (event) => {
											if (!withTooltips) return;
											if (containerBounds.width === 0 || containerBounds.height === 0) return;
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
										const svgLabelSmall = providerTheme.svgLabelSmall;
										const fontSize = resolveFontSize(svgLabelSmall?.fontSize) ?? 12;
										const estimatedTextWidth = (0, _visx_text.getStringWidth)(arc.data.label, {
											fontSize,
											fontFamily: svgLabelSmall?.fontFamily,
											fontWeight: svgLabelSmall?.fontWeight
										});
										const labelPadding = 6;
										const backgroundWidth = estimatedTextWidth + labelPadding * 2;
										const backgroundHeight = fontSize + labelPadding * 2;
										return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("g", {
											...groupProps,
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { ...pathProps }), showLabels && hasSpaceForLabel && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("g", { children: [providerTheme.labelBackgroundColor && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("rect", {
												x: centroidX - backgroundWidth / 2,
												y: centroidY - backgroundHeight / 2,
												width: backgroundWidth,
												height: backgroundHeight,
												fill: providerTheme.labelBackgroundColor,
												rx: 4,
												ry: 4,
												pointerEvents: "none"
											}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("text", {
												x: centroidX,
												y: centroidY,
												dy: ".33em",
												fill: providerTheme.labelTextColor || "#333",
												fontSize,
												textAnchor: "middle",
												pointerEvents: "none",
												children: arc.data.label
											})] })]
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
const PieChartWithProvider = (props) => {
	if ((0, react$1.useContext)(GlobalChartsContext)) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(PieChartInternal, { ...props });
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(GlobalChartsProvider, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(PieChartInternal, { ...props }) });
};
PieChartWithProvider.displayName = "PieChart";
const PieChart = attachSubComponents(PieChartWithProvider, {
	Legend,
	SVG: ChartSVG,
	HTML: ChartHTML
});
const PieChartResponsive = attachSubComponents(withResponsive(PieChartWithProvider), {
	Legend,
	SVG: ChartSVG,
	HTML: ChartHTML
});
//#endregion
//#region src/charts/pie-semi-circle-chart/pie-semi-circle-chart.module.scss
var pie_semi_circle_chart_module_default = {
	"label": "a8ccharts-YtTOxW-label",
	"note": "a8ccharts-YtTOxW-note",
	"pie-semi-circle-chart": "a8ccharts-YtTOxW-pie-semi-circle-chart",
	"pie-semi-circle-chart--responsive": "a8ccharts-YtTOxW-pie-semi-circle-chart--responsive"
};
//#endregion
//#region src/charts/pie-semi-circle-chart/pie-semi-circle-chart.tsx
/**
* Default tooltip renderer for semi-circle pie charts.
* Renders a BaseTooltip with the hovered segment's data.
*
* @param {PieSemiCircleChartRenderTooltipParams} params - The tooltip parameters containing the hovered data point
* @return {ReactNode} The rendered tooltip content
*/
const renderDefaultPieSemiCircleTooltip = ({ tooltipData }) => {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(BaseTooltip, {
		data: tooltipData,
		top: 0,
		left: 0,
		renderContainer: false
	});
};
const PAD_ANGLE = .03;
const DEFAULT_WIDTH$1 = 400;
/**
* Validates the semi-circle pie chart data
* @param data - The data to validate
* @return Object containing validation result and error message
*/
const validateData = (data) => {
	if (!data.length) return {
		isValid: false,
		message: "No data available"
	};
	if (data.some((item) => item.value < 0)) return {
		isValid: false,
		message: "Invalid data: Negative values are not allowed"
	};
	if (data.reduce((sum, item) => sum + item.value, 0) <= 0) return {
		isValid: false,
		message: "Invalid data: Total value must be greater than 0"
	};
	return {
		isValid: true,
		message: ""
	};
};
const PieSemiCircleChartInternal = ({ data, chartId: providedChartId, width: propWidth, height: propHeight, thickness = .4, clockwise = true, withTooltips = false, showLegend = false, legend = {}, legendValueDisplay = "percentage", label, animation, note, className, children, tooltipOffsetX = 0, tooltipOffsetY = -15, renderTooltip = renderDefaultPieSemiCircleTooltip, gap = "md" }) => {
	const legendInteractive = legend.interactive ?? false;
	const legendPosition = legend.position ?? "bottom";
	const chartId = useChartId(providedChartId);
	const { tooltipOpen, tooltipLeft, tooltipTop, tooltipData, hideTooltip, showTooltip } = (0, _visx_tooltip.useTooltip)();
	const { containerRef, TooltipInPortal, containerBounds } = (0, _visx_tooltip.useTooltipInPortal)({
		detectBounds: true,
		scroll: true,
		debounce: 0
	});
	const handleMouseMove = (0, react$1.useCallback)((event, arc) => {
		if (containerBounds.width === 0 || containerBounds.height === 0) return;
		showTooltip({
			tooltipData: arc.data,
			tooltipLeft: event.clientX - containerBounds.left + tooltipOffsetX,
			tooltipTop: event.clientY - containerBounds.top + tooltipOffsetY
		});
	}, [
		containerBounds.width,
		containerBounds.height,
		containerBounds.left,
		containerBounds.top,
		showTooltip,
		tooltipOffsetX,
		tooltipOffsetY
	]);
	const handleMouseLeave = (0, react$1.useCallback)(() => {
		hideTooltip();
	}, [hideTooltip]);
	const handleArcMouseMove = (0, react$1.useCallback)((arc) => (event) => {
		handleMouseMove(event, arc);
	}, [handleMouseMove]);
	const { isValid, message } = validateData(data);
	const { getElementStyles, isSeriesVisible } = useGlobalChartsContext();
	const { visibleData, allSegmentsHidden, legendData } = useInteractiveLegendData({
		data: useDataWithPercentages(data),
		chartId,
		legendInteractive,
		isSeriesVisible
	});
	const accessors = (0, react$1.useMemo)(() => ({
		value: (d) => d.value,
		sort: (a, b) => b.value - a.value,
		fill: (d) => getElementStyles({
			data: d,
			index: d.index
		}).color
	}), [getElementStyles]);
	const legendItems = useChartLegendItems(legendData, (0, react$1.useMemo)(() => ({
		showValues: true,
		legendValueDisplay
	}), [legendValueDisplay]));
	const { svgChildren, htmlChildren, legendChildren, otherChildren } = useChartChildren(children, "PieSemiCircleChart");
	useChartRegistration({
		chartId,
		legendItems,
		chartType: "pie-semi-circle",
		isDataValid: isValid,
		metadata: (0, react$1.useMemo)(() => ({
			thickness,
			clockwise
		}), [thickness, clockwise])
	});
	const prefersReducedMotion = usePrefersReducedMotion();
	const effectiveWidth = propWidth || DEFAULT_WIDTH$1;
	if (!isValid) {
		const errorWidth = propHeight ? Math.min(propWidth || propHeight * 2, propHeight * 2) : effectiveWidth;
		const errorHeight = errorWidth / 2;
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			className: pie_semi_circle_chart_module_default["pie-semi-circle-chart"],
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
				width: errorWidth,
				height: errorHeight,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("text", {
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
	const legendElement = showLegend && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Legend, {
		orientation: legend.orientation ?? "horizontal",
		position: legendPosition,
		alignment: legend.alignment ?? "center",
		labelStyles: legend.labelStyles,
		itemClassName: legend.itemClassName,
		itemStyles: legend.itemStyles,
		shapeStyles: legend.shapeStyles,
		shape: legend.shape ?? "circle",
		chartId,
		interactive: legendInteractive
	});
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SingleChartContext.Provider, {
		value: { chartId },
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChartLayout, {
			legendPosition,
			legendElement,
			legendChildren,
			gap,
			className: (0, clsx.default)("pie-semi-circle-chart", pie_semi_circle_chart_module_default["pie-semi-circle-chart"], { [pie_semi_circle_chart_module_default["pie-semi-circle-chart--responsive"]]: !propWidth && !propHeight }, className),
			style: {
				width: propWidth || void 0,
				height: propHeight || void 0
			},
			trailingContent: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
				withTooltips && tooltipOpen && tooltipData && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TooltipInPortal, {
					top: tooltipTop || 0,
					left: tooltipLeft || 0,
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						role: "tooltip",
						children: renderTooltip({ tooltipData })
					})
				}),
				htmlChildren,
				otherChildren
			] }),
			children: ({ contentWidth, contentHeight }) => {
				const availableWidth = contentWidth > 0 ? contentWidth : effectiveWidth;
				const availableHeight = contentHeight > 0 ? contentHeight : propHeight || effectiveWidth / 2;
				const width = Math.min(availableWidth, availableHeight * 2);
				const height = width / 2;
				const radius = height;
				const innerRadius = radius * (1 - thickness);
				return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Center, {
					ref: containerRef,
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", {
						width,
						height,
						viewBox: `0 0 ${width} ${height}`,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(RadialWipeAnimation, {
							id: `radial-wipe-${chartId}`,
							radius,
							innerRadius,
							startAngle: "-180deg",
							wipePercentage: 50
						}) }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_visx_group.Group, {
							top: height,
							left: width / 2,
							mask: animation && !prefersReducedMotion ? `url(#radial-wipe-${chartId})` : null,
							children: allSegmentsHidden ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SvgEmptyState, {
								x: 0,
								y: -radius / 2,
								width,
								height,
								children: (0, _wordpress_i18n.__)("All segments are hidden. Click legend items to show data.", "jetpack-charts")
							}) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_visx_shape.Pie, {
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
										return pie.arcs.map((arc) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("g", {
											onMouseMove: withTooltips ? handleArcMouseMove(arc) : void 0,
											onMouseLeave: withTooltips ? handleMouseLeave : void 0,
											children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
												d: pie.path(arc) || "",
												fill: accessors.fill(arc.data)
											})
										}, arc.data.label));
									}
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_visx_group.Group, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_visx_text.Text, {
									textAnchor: "middle",
									verticalAnchor: "start",
									y: -40,
									className: pie_semi_circle_chart_module_default.label,
									children: label
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_visx_text.Text, {
									textAnchor: "middle",
									verticalAnchor: "start",
									y: -20,
									className: pie_semi_circle_chart_module_default.note,
									children: note
								})] }),
								!allSegmentsHidden && svgChildren
							] })
						})]
					})
				});
			}
		})
	});
};
const PieSemiCircleChartWithProvider = (props) => {
	if ((0, react$1.useContext)(GlobalChartsContext)) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(PieSemiCircleChartInternal, { ...props });
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(GlobalChartsProvider, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(PieSemiCircleChartInternal, { ...props }) });
};
PieSemiCircleChartWithProvider.displayName = "PieSemiCircleChart";
const PieSemiCircleChart = attachSubComponents(PieSemiCircleChartWithProvider, {
	Legend,
	SVG: ChartSVG,
	HTML: ChartHTML
});
const PieSemiCircleChartResponsive = attachSubComponents(withResponsive(PieSemiCircleChartWithProvider), {
	Legend,
	SVG: ChartSVG,
	HTML: ChartHTML
});
//#endregion
//#region src/charts/sparkline/sparkline.module.scss
var sparkline_module_default = {
	"sparkline": "a8ccharts-GtgAVa-sparkline",
	"sparkline--empty": "a8ccharts-GtgAVa-sparkline--empty"
};
//#endregion
//#region src/charts/sparkline/sparkline.tsx
const DEFAULT_WIDTH = 100;
const DEFAULT_HEIGHT = 40;
/**
* Transforms a simple number array into SeriesData format for LineChart.
* Uses index-based dates to create a linear x-axis.
*
* @param data        - Array of numeric values to plot
* @param color       - Optional color for the line stroke
* @param strokeWidth - Optional stroke width for the line
* @return SeriesData array suitable for LineChart
*/
const transformToSeriesData = (data, color, strokeWidth) => {
	const baseDate = new Date(2e3, 0, 1);
	return [{
		label: "sparkline",
		data: data.map((value, index) => ({
			date: new Date(baseDate.getTime() + index * 864e5),
			value
		})),
		options: {
			stroke: color,
			seriesLineStyle: strokeWidth ? { strokeWidth } : void 0
		}
	}];
};
const SparklineComponent = (0, react$1.forwardRef)(({ data, width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT, color, strokeWidth: strokeWidthProp, withGradientFill = true, gradient, className, chartId, margin: marginProp, animation }, ref) => {
	const theme = useGlobalChartsTheme();
	const themeStrokeWidth = theme.sparkline?.strokeWidth ?? 1.5;
	const strokeWidth = strokeWidthProp ?? themeStrokeWidth;
	const seriesData = (0, react$1.useMemo)(() => {
		if (!data || data.length === 0) return [];
		return transformToSeriesData(data, color, strokeWidth);
	}, [
		data,
		color,
		strokeWidth
	]);
	const finalMargin = (0, react$1.useMemo)(() => {
		const themeMargin = theme.sparkline?.margin ?? {
			top: 2,
			right: 2,
			bottom: 2,
			left: 2
		};
		const margin = marginProp ?? themeMargin;
		return {
			...themeMargin,
			...margin
		};
	}, [marginProp, theme.sparkline?.margin]);
	const seriesWithGradient = (0, react$1.useMemo)(() => {
		if (!gradient || seriesData.length === 0) return seriesData;
		return seriesData.map((series) => ({
			...series,
			options: {
				...series.options,
				gradient: {
					from: gradient.from || color || "#000000",
					to: gradient.to || "#ffffff",
					fromOpacity: gradient.fromOpacity ?? .5,
					toOpacity: gradient.toOpacity ?? 0
				}
			}
		}));
	}, [
		seriesData,
		gradient,
		color
	]);
	if (!data || data.length === 0) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		ref,
		className: (0, clsx.default)("sparkline", sparkline_module_default.sparkline, sparkline_module_default["sparkline--empty"], className),
		style: {
			width,
			height
		}
	});
	if (data.length === 1) {
		const cx = width / 2;
		const cy = height / 2;
		const resolvedColor = color || "#000000";
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			ref,
			className: (0, clsx.default)("sparkline", sparkline_module_default.sparkline, sparkline_module_default["sparkline--single-point"], className),
			style: {
				width,
				height
			},
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
				width,
				height,
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("circle", {
					cx,
					cy,
					r: strokeWidth * 1.5,
					fill: resolvedColor
				})
			})
		});
	}
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		ref,
		className: (0, clsx.default)("sparkline", sparkline_module_default.sparkline, className),
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(LineChart, {
			data: seriesWithGradient,
			width,
			height,
			margin: finalMargin,
			chartId,
			withGradientFill,
			withTooltips: false,
			showLegend: false,
			gridVisibility: "none",
			options: { axis: {
				x: { display: false },
				y: { display: false }
			} },
			curveType: "monotone",
			animation
		})
	});
});
SparklineComponent.displayName = "SparklineComponent";
/**
* Sparkline - A minimal line chart for inline data visualization.
*
* Sparklines are compact charts designed to be embedded inline with text or
* displayed in small spaces like table cells or dashboards. They show trends
* without axes, labels, or other chart chrome.
*
* This component is built on top of LineChart with preconfigured settings
* for minimal display (no axes, grid, tooltips, or legend).
*/
const SparklineUnresponsive = SparklineComponent;
SparklineUnresponsive.displayName = "SparklineUnresponsive";
/**
* Responsive Sparkline chart component
*/
const Sparkline = withResponsive(SparklineUnresponsive);
//#endregion
//#region src/components/trend-indicator/trend-indicator.module.scss
var trend_indicator_module_default = {
	"trend-indicator": "a8ccharts-zR7F7G-trend-indicator",
	"trend-indicator__icon": "a8ccharts-zR7F7G-trend-indicator__icon",
	"trend-indicator__value": "a8ccharts-zR7F7G-trend-indicator__value",
	"trend-indicator--down": "a8ccharts-zR7F7G-trend-indicator--down",
	"trend-indicator--neutral": "a8ccharts-zR7F7G-trend-indicator--neutral",
	"trend-indicator--up": "a8ccharts-zR7F7G-trend-indicator--up"
};
//#endregion
//#region src/components/trend-indicator/trend-indicator.tsx
const DIRECTION_LABELS = {
	up: "Increase",
	down: "Decrease",
	neutral: "No change"
};
const Icon = ({ direction }) => {
	if (direction === "neutral") return null;
	const isUp = direction === "up";
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
		className: trend_indicator_module_default["trend-indicator__icon"],
		viewBox: "0 0 16 16",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
			d: isUp ? "M8 13V3M4 7l4-4 4 4" : "M8 3v10M4 9l4 4 4-4",
			stroke: "currentColor",
			strokeWidth: "1.5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
};
/**
* TrendIndicator displays a directional trend with a value.
* Used to show percentage changes or growth metrics.
*
* @param {TrendIndicatorProps} props - Component props
* @return {JSX.Element} The rendered trend indicator
*/
function TrendIndicator({ direction, value, className, style, showIcon = true }) {
	const ariaLabel = `${DIRECTION_LABELS[direction]}: ${value}`;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
		className: (0, clsx.default)(trend_indicator_module_default["trend-indicator"], trend_indicator_module_default[`trend-indicator--${direction}`], className),
		style,
		"aria-label": ariaLabel,
		children: [showIcon && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Icon, { direction }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
			className: trend_indicator_module_default["trend-indicator__value"],
			children: value
		})]
	});
}
//#endregion
exports.AccessibleTooltip = AccessibleTooltip;
exports.AreaChart = AreaChartResponsive;
exports.AreaChartUnresponsive = AreaChart;
exports.BarChart = BarChartResponsive;
exports.BarChartUnresponsive = BarChart;
exports.BarListChart = BarListChartResponsive;
exports.BarListChartUnresponsive = BarListChart;
exports.BaseTooltip = BaseTooltip;
exports.ConversionFunnelChart = ConversionFunnelChartWithProvider;
exports.GeoChart = GeoChartResponsive;
exports.GeoChartUnresponsive = GeoChartWithProvider;
exports.GlobalChartsContext = GlobalChartsContext;
exports.GlobalChartsProvider = GlobalChartsProvider;
exports.HeatmapChart = HeatmapChartResponsive;
exports.HeatmapChartUnresponsive = HeatmapChart;
exports.LeaderboardChart = LeaderboardChartResponsive;
exports.LeaderboardChartUnresponsive = LeaderboardChart;
exports.Legend = Legend;
exports.LineChart = LineChartResponsive;
exports.LineChartUnresponsive = LineChart;
exports.PieChart = PieChartResponsive;
exports.PieChartUnresponsive = PieChart;
exports.PieSemiCircleChart = PieSemiCircleChartResponsive;
exports.PieSemiCircleChartUnresponsive = PieSemiCircleChart;
exports.Sparkline = Sparkline;
exports.SparklineUnresponsive = SparklineUnresponsive;
exports.ThemeProvider = GlobalChartsProvider;
exports.TrendIndicator = TrendIndicator;
exports.buildCalendarHeatmapData = buildCalendarHeatmapData;
exports.defaultTheme = defaultTheme;
exports.formatMetricValue = formatMetricValue;
exports.formatPercentage = formatPercentage;
exports.getColorDistance = getColorDistance;
exports.hexToRgba = hexToRgba;
exports.isValidHexColor = isValidHexColor;
exports.lightenHexColor = lightenHexColor;
exports.mergeThemes = mergeThemes;
exports.mixHexColors = mixHexColors;
exports.normalizeColorToHex = normalizeColorToHex;
exports.parseAsLocalDate = parseAsLocalDate;
exports.parseHslString = parseHslString;
exports.parseRgbString = parseRgbString;
exports.prefersLightText = prefersLightText;
exports.relativeLuminance = relativeLuminance;
exports.useChartLegendItems = useChartLegendItems;
exports.useGlobalChartsContext = useGlobalChartsContext;
exports.useGlobalChartsTheme = useGlobalChartsTheme;
exports.useLeaderboardLegendItems = useLeaderboardLegendItems;
exports.validateHexColor = validateHexColor;

//# sourceMappingURL=index.cjs.map