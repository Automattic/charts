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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule || !__hasOwnProp.call(mod, "default") ? __defProp(target, "default", {
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
let _wordpress_ui = require("@wordpress/ui");
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
let _wordpress_icons = require("@wordpress/icons");
let _visx_shape = require("@visx/shape");
//#region src/charts/private/chart-instance-context/chart-instance-context.ts
const ChartInstanceContext = (0, react.createContext)(null);
//#endregion
//#region src/charts/private/chart-instance-context/use-chart-instance-context.ts
const useChartInstanceContext = () => {
	const context = (0, react.useContext)(ChartInstanceContext);
	if (!context) throw new Error("useChartInstanceContext must be used within a Chart component");
	return context;
};
//#endregion
//#region src/styles/chart-scope-class.ts
/**
* Stable class that carries the `--a8c-charts-*` catalog. Applied to the `GlobalChartsProvider` wrapper, to portal-rendered surfaces (which sit outside the provider tree), and to standalone components when no provider is above them.
*
* Deliberately unhashed: consumers are documented as being able to target it to override a token on the provider element.
*/
const CHART_SCOPE_CLASS = "a8c-charts-scope";
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
	const longestTick = formattedTicks.reduce((longest, current) => longest.length >= current.length ? longest : current, formattedTicks[0]);
	return (0, _visx_text.getStringWidth)(longestTick, labelStyle);
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
const resolveCssVariable = (value, element) => createCssVariableResolver(element)(value);
/**
* Builds a resolver that reads every value from one `getComputedStyle` snapshot.
*
* `getComputedStyle` is the expensive half of resolving a token: each call can force the browser to flush pending style, and a chart theme resolves five roles at once. Taking the snapshot once per build turns that into a single query. The reads that share a snapshot happen synchronously inside one memo body, so no style change can land between them — the resolver is single-pass by design and is not meant to be held across renders.
*
* @param element - The element to resolve against, or null/undefined for the document root.
* @return A resolver that resolves each value exactly as `resolveCssVariable` does.
*/
function createCssVariableResolver(element) {
	let styles = null;
	const getStyles = () => {
		if (!styles) styles = computedStyleFor(element);
		return styles;
	};
	return (value) => {
		if (!value) return null;
		if (value.startsWith("var(") && value.endsWith(")")) {
			const parsed = parseVarExpression(value);
			if (parsed) return readCustomProperty(parsed.varName, getStyles()) || parsed.fallback;
		}
		if (value.startsWith("--")) return readCustomProperty(value, getStyles());
		return value;
	};
}
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
* Takes one computed-style snapshot, or null where there is nothing to read (SSR, or a detached element).
*
* @param element - The element to read from, or null/undefined for the document root.
* @return The computed styles, or null.
*/
function computedStyleFor(element) {
	if (typeof window === "undefined" || typeof document === "undefined") return null;
	try {
		return getComputedStyle(element || document.documentElement);
	} catch {
		return null;
	}
}
/**
* Reads one custom property from a computed-style snapshot.
*
* @param varName - A CSS variable name like '--my-color'
* @param styles  - The snapshot to read from, or null
* @return The computed value or null
*/
function readCustomProperty(varName, styles) {
	if (!styles) return null;
	try {
		return styles.getPropertyValue(varName).trim() || null;
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
//#region src/providers/chart-scope/chart-scope-context.ts
/**
* The nearest chart element, published so JS token resolution reads the same CSS cascade that paints the chart's own colours.
*
* All JS token resolution reads this element rather than `document.documentElement`, so a `getComputedStyle` call sees the same `--a8c-charts-*` values — including any override set inside the provider tree — that a CSS-painted sibling element does.
*/
const ChartScopeContext = (0, react.createContext)(null);
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
/**
* The catalog role holding one series-palette slot.
*
* @param slot - The one-based slot number.
* @return The role name.
*/
const seriesRole = (slot) => `--a8c-charts-color-series-${slot}`;
const SERIES_SLOT_1_FALLBACK = "#3858e9";
/** The catalog pointer for every slot, in slot order. */
const SERIES_PALETTE_POINTERS = Array.from({ length: 5 }, (_, index) => index === 0 ? `var(${seriesRole(1)}, ${SERIES_SLOT_1_FALLBACK})` : `var(${seriesRole(index + 1)})`);
//#endregion
//#region src/providers/chart-context/private/theme-override-vars.ts
const ROLE_FOR_FIELD = [
	["--a8c-charts-color-background", (theme) => theme.backgroundColor],
	["--a8c-charts-color-grid", (theme) => theme.gridStyles?.stroke],
	["--a8c-charts-color-axis", (theme) => theme.xAxisLineStyles?.stroke],
	["--a8c-charts-color-tick", (theme) => theme.xTickLineStyles?.stroke],
	["--a8c-charts-color-label-axis", (theme) => theme.svgLabelSmall?.fill],
	["--a8c-charts-color-label-background", (theme) => theme.labelBackgroundColor],
	["--a8c-charts-color-label-on-fill", (theme) => theme.labelTextColor],
	...Array.from({ length: 5 }, (_, index) => [seriesRole(index + 1), (theme) => theme.colors?.[index]])
];
let warnedAboutExtraColors = false;
/**
* Warns once when a consumer passes more colors than there are slots to publish them into.
*
* @param count - How many entries `theme.colors` holds.
*/
function warnOnceAboutExtraColors(count) {
	if (warnedAboutExtraColors || process.env.NODE_ENV === "production") return;
	warnedAboutExtraColors = true;
	console.warn(`[Charts] theme.colors holds ${count} colors and the palette has 5 slots, so entries past the 5th are ignored. Set a per-series color with \`options.stroke\` instead.`);
}
/**
* The variable a `theme` prop override is published as, one layer outside the role itself.
*
* `chart-scope.scss` declares each of these roles as `var(<role>-theme, <catalog default>)`, so an override that is invalid at computed-value time — a fallback-less `var()` naming a token the host never set — only invalidates this variable, and the role still resolves its mapped `--wpds-*` token. Published as the role directly, such a value took the role and every bare `var(<role>)` read site down with it.
*
* @param role - The catalog role being overridden.
* @return The custom property carrying the consumer's value.
*/
const themeLayerVar = (role) => `${role}-theme`;
ROLE_FOR_FIELD.map(([role]) => role);
/**
* Whether a value reads the role it is being published for, which would make the catalog entry depend on itself.
*
* The dependency runs `<role>: var(<role>-theme, …)`, so a value naming `<role>` closes a cycle through the catalog entry. CSS marks every custom property in a cycle invalid at computed-value time — the role's own fallback is *not* used, so the token resolves to nothing and every chart loses that color. Verified in Chrome: `--role-theme: var(--role, blue); --role: var(--role-theme, green)` leaves `--role` empty, not `green`.
*
* Three things this has to get right, none of which a plain substring test gets:
*
* `var()` permits whitespace after the opening paren, so testing for `var(<role>` misses `var( --a8c-charts-color-grid, … )`.
*
* Several roles are prefixes of others (`--a8c-charts-color-label` of `--a8c-charts-color-label-secondary`), and every role is a prefix of its own theme layer. A prefix match would read a legitimate cross-role pointer as a self-reference and silently drop the override, so the role must be followed by something that cannot continue an identifier — `-` included. A value naming `<role>-theme` is therefore not treated as a self-reference: that cycle is confined to the theme layer, which leaves the role free to fall back to the catalog default.
*
* `resolveCssVariable` also accepts a bare custom-property name with no `var()` wrapper (`--a8c-charts-color-grid`), so that is legal `theme` input too. It forms no cycle — custom properties accept arbitrary token streams — so it survives as a literal string and drops silently at the use site instead of falling back to the catalog default.
*
* @param value - The consumer's value for the field.
* @param role  - The catalog role this value would override.
* @return True when the value reads `role`, so it must not be published.
*/
const readsOwnRole = (value, role) => value.trim() === role || new RegExp(`var\\(\\s*${role.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?![\\w-])`).test(value);
/**
* Maps a sparse consumer theme onto the theme-layer variables its overridden catalog roles read, so CSS-painted and JS-resolved colors read one source.
*
* A value that reads the role it would override is left unpublished — that is the default theme's own pointer surviving `mergeThemes`, and publishing it would invalidate the role. The role is still reported in `roles`: `withCatalogPointers` restores its theme field to the catalog pointer either way, so CSS and visx agree on the catalog default rather than visx painting a literal CSS never sees.
*
* `theme.colors` publishes through the same mechanism, one slot per entry, so a CSS declaration of `--a8c-charts-color-series-N` still beats it and a short array leaves the later slots unset rather than blank.
*
* @param theme - The consumer's `theme` prop, before merging with the default theme.
* @return The wrapper's custom properties, and the roles the consumer overrode.
*/
const themeOverrideVars = (theme) => {
	if (!theme) return {
		vars: {},
		roles: []
	};
	if (Array.isArray(theme.colors) && theme.colors.length > 5) warnOnceAboutExtraColors(theme.colors.length);
	const vars = {};
	const roles = [];
	for (const [role, read] of ROLE_FOR_FIELD) {
		const value = read(theme);
		if (typeof value !== "string" || value === "") continue;
		roles.push(role);
		if (!readsOwnRole(value, role)) vars[themeLayerVar(role)] = value;
	}
	return {
		vars,
		roles
	};
};
//#endregion
//#region src/providers/chart-context/themes.ts
/**
* Default theme configuration
*/
const defaultTheme = {
	backgroundColor: "var(--a8c-charts-color-background, #fff)",
	labelBackgroundColor: "var(--a8c-charts-color-label-background, transparent)",
	labelTextColor: "var(--a8c-charts-color-label-on-fill, #FFFFFF)",
	colors: [...SERIES_PALETTE_POINTERS],
	gridStyles: {
		stroke: "var(--a8c-charts-color-grid, #dbdbdb)",
		strokeWidth: 1
	},
	tickLength: 4,
	gridColor: "",
	gridColorDark: "",
	xTickLineStyles: {
		stroke: "var(--a8c-charts-color-tick, #dbdbdb)",
		strokeWidth: 1
	},
	xAxisLineStyles: {
		stroke: "var(--a8c-charts-color-axis, #dbdbdb)",
		strokeWidth: 1
	},
	legend: {
		labelStyles: { color: "var(--a8c-charts-color-label, #1e1e1e)" },
		containerStyles: {},
		shapeStyles: []
	},
	seriesLineStyles: [],
	glyphs: [],
	svgLabelSmall: {
		fill: "var(--a8c-charts-color-label-axis, #1e1e1e)",
		fontFamily: "inherit"
	},
	svgLabelBig: { fontFamily: "inherit" },
	annotationStyles: {
		label: {
			anchorLineStroke: "var(--a8c-charts-color-annotation, #1e1e1e)",
			backgroundFill: "var(--a8c-charts-color-surface, #fff)"
		},
		connector: { stroke: "var(--a8c-charts-color-annotation, #1e1e1e)" },
		circleSubject: {
			stroke: "transparent",
			fill: "var(--a8c-charts-color-annotation, #1e1e1e)",
			radius: 5
		}
	},
	geoChart: { featureFillColor: "var(--a8c-charts-color-surface-secondary, #f4f4f4)" },
	leaderboardChart: {
		rowGap: 12,
		columnGap: 4,
		labelSpacing: "xs",
		deltaColors: [
			"var(--a8c-charts-color-trend-down, #cc1818)",
			"var(--a8c-charts-color-trend-neutral, #707070)",
			"var(--a8c-charts-color-trend-up, #008030)"
		]
	},
	conversionFunnelChart: {
		backgroundColor: "var(--a8c-charts-color-surface-secondary, #f4f4f4)",
		positiveChangeColor: "var(--a8c-charts-color-trend-up, #008030)",
		negativeChangeColor: "var(--a8c-charts-color-trend-down, #cc1818)"
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
//#region src/providers/chart-context/private/with-catalog-pointers.ts
/**
* The pointer one palette slot is restored to.
*
* Unlike the other roles, this keeps the consumer's own color as the pointer's terminal literal instead of the catalog's. The literal is only ever reached where `getComputedStyle` resolves nothing — SSR and jsdom — and there the palette is the one field where falling back to the catalog default would be visible: every series would paint the same seeded blue. In a browser the slot resolves first, so a CSS declaration of it still outranks the consumer's `theme.colors`.
*
* @param index - The slot's zero-based index in `colors`.
* @param value - The merged theme's entry for it.
* @return The catalog pointer for that slot.
*/
const seriesPointer = (index, value) => {
	const role = seriesRole(index + 1);
	if (typeof value === "string" && value.startsWith(`var(${role}`)) return value;
	if (typeof value !== "string" || value === "") return SERIES_PALETTE_POINTERS[index];
	return `var(${role}, ${value})`;
};
const CATALOG_RESTORE_FOR_ROLE = {
	...Object.fromEntries(Array.from({ length: 5 }, (_, index) => [seriesRole(index + 1), (theme) => ({ colors: SERIES_PALETTE_POINTERS.map((_pointer, slot) => seriesPointer(slot, theme.colors?.[slot])) })])),
	"--a8c-charts-color-background": () => ({ backgroundColor: defaultTheme.backgroundColor }),
	"--a8c-charts-color-grid": (theme) => ({ gridStyles: {
		...theme.gridStyles,
		stroke: defaultTheme.gridStyles.stroke
	} }),
	"--a8c-charts-color-axis": (theme) => ({ xAxisLineStyles: {
		...theme.xAxisLineStyles,
		stroke: defaultTheme.xAxisLineStyles.stroke
	} }),
	"--a8c-charts-color-tick": (theme) => ({ xTickLineStyles: {
		...theme.xTickLineStyles,
		stroke: defaultTheme.xTickLineStyles.stroke
	} }),
	"--a8c-charts-color-label-axis": (theme) => ({ svgLabelSmall: {
		...theme.svgLabelSmall,
		fill: defaultTheme.svgLabelSmall.fill
	} }),
	"--a8c-charts-color-label-background": () => ({ labelBackgroundColor: defaultTheme.labelBackgroundColor }),
	"--a8c-charts-color-label-on-fill": () => ({ labelTextColor: defaultTheme.labelTextColor })
};
/**
* Restores the mapped theme fields of `overriddenRoles` to their catalog pointer, so the theme-layer variable `themeOverrideVars` writes on the provider wrapper is the only carrier for an overridden role — CSS and the JS bridge (`useXYChartTheme`) then resolve it through the same cascade instead of visx reading a baked literal that can disagree with a closer CSS override.
*
* This covers roles `themeOverrideVars` deliberately left unpublished as well as the ones it published. A value that reads its own role is not publishable, but leaving visx the consumer's literal is what the whole mechanism exists to prevent: `theme={ { gridStyles: { stroke: 'var(--brand, var(--a8c-charts-color-grid, red))' } } }` would have CSS paint the catalog default while visx painted `--brand`.
*
* Every field outside the mapped roles is left exactly as `merged` provided it: those aren't published as theme-layer vars, so rewriting them would erase a consumer's override with no replacement carrier.
*
* @param merged          - The consumer theme merged onto `defaultTheme` (`mergeThemes` output).
* @param overriddenRoles - The catalog roles the consumer overrode, from `themeOverrideVars`.
* @return A new theme object; `merged` is not mutated.
*/
const withCatalogPointers = (merged, overriddenRoles) => {
	let result = merged;
	for (const role of overriddenRoles) {
		const restore = CATALOG_RESTORE_FOR_ROLE[role];
		if (restore) result = {
			...result,
			...restore(result)
		};
	}
	return result;
};
//#endregion
//#region src/providers/chart-context/global-charts-provider.tsx
const GlobalChartsContext = (0, react.createContext)(null);
const GlobalChartsProvider = ({ children, theme }) => {
	const [charts, setCharts] = (0, react.useState)(() => /* @__PURE__ */ new Map());
	const [hiddenSeries, setHiddenSeries] = (0, react.useState)(() => /* @__PURE__ */ new Map());
	const seededCharts = (0, react.useRef)(/* @__PURE__ */ new Set());
	const wrapperRef = (0, react.useRef)(null);
	const [scopeNode, setScopeNode] = (0, react.useState)(null);
	const setWrapperNode = (0, react.useCallback)((node) => {
		wrapperRef.current = node;
		setScopeNode(node);
	}, []);
	const { vars: overrideVars, roles: overriddenRoles } = (0, react.useMemo)(() => themeOverrideVars(theme), [theme]);
	const providerTheme = (0, react.useMemo)(() => {
		if (!theme) return defaultTheme;
		return withCatalogPointers(mergeThemes(defaultTheme, theme), overriddenRoles);
	}, [theme, overriddenRoles]);
	const [colorCache, setColorCache] = (0, react.useState)(() => ({
		colors: [],
		hues: [],
		existingHslColors: [],
		minHue: 360,
		maxHue: 0
	}));
	const [isColorPaletteResolved, setIsColorPaletteResolved] = (0, react.useState)(false);
	(0, react.useLayoutEffect)(() => {
		setIsColorPaletteResolved(false);
		const resolvedColors = [];
		const hues = [];
		const existingHslColors = [];
		let minHue = 360;
		let maxHue = 0;
		for (const color of providerTheme.colors ?? SERIES_PALETTE_POINTERS) {
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
		setColorCache({
			colors: resolvedColors,
			hues,
			existingHslColors,
			minHue,
			maxHue
		});
	}, [providerTheme]);
	(0, react.useEffect)(() => {
		if (colorCache.colors.length > 0) setIsColorPaletteResolved(true);
	}, [colorCache]);
	const [groupToColorMap, setGroupToColorMap] = (0, react.useState)(() => /* @__PURE__ */ new Map());
	const paletteKey = colorCache.colors.join(",");
	(0, react.useEffect)(() => {
		setGroupToColorMap(/* @__PURE__ */ new Map());
	}, [paletteKey]);
	const registerChart = (0, react.useCallback)((id, data) => {
		setCharts((prev) => new Map(prev).set(id, data));
	}, []);
	const unregisterChart = (0, react.useCallback)((id) => {
		setCharts((prev) => {
			const newMap = new Map(prev);
			newMap.delete(id);
			return newMap;
		});
	}, []);
	const getChartData = (0, react.useCallback)((id) => {
		return charts.get(id);
	}, [charts]);
	const resolveColor = (0, react.useCallback)(({ group, index, overrideColor }) => {
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
	const getElementStyles = (0, react.useCallback)(({ data, index, overrideColor, legendShape }) => {
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
	const updateHiddenSeries = (0, react.useCallback)((chartId, update) => {
		setHiddenSeries((prev) => {
			const current = prev.get(chartId);
			const next = update(new Set(current ?? []));
			if (!current && next.size === 0) return prev;
			if (current && current.size === next.size && [...next].every((label) => current.has(label))) return prev;
			const newMap = new Map(prev);
			if (next.size === 0) newMap.delete(chartId);
			else newMap.set(chartId, next);
			return newMap;
		});
	}, []);
	const toggleSeriesVisibility = (0, react.useCallback)((chartId, seriesLabel) => {
		updateHiddenSeries(chartId, (current) => {
			if (current.has(seriesLabel)) current.delete(seriesLabel);
			else current.add(seriesLabel);
			return current;
		});
	}, [updateHiddenSeries]);
	const setSeriesVisibility = (0, react.useCallback)((chartId, seriesLabel, visible) => {
		updateHiddenSeries(chartId, (current) => {
			if (visible) current.delete(seriesLabel);
			else current.add(seriesLabel);
			return current;
		});
	}, [updateHiddenSeries]);
	const setChartHiddenSeries = (0, react.useCallback)((chartId, seriesLabels) => {
		updateHiddenSeries(chartId, () => new Set(seriesLabels));
	}, [updateHiddenSeries]);
	const hasSeededChart = (0, react.useCallback)((chartId) => seededCharts.current.has(chartId), []);
	const seedChartHiddenSeries = (0, react.useCallback)((chartId, seriesLabels) => {
		if (seededCharts.current.has(chartId)) return;
		seededCharts.current.add(chartId);
		setChartHiddenSeries(chartId, seriesLabels);
	}, [setChartHiddenSeries]);
	const isSeriesVisible = (0, react.useCallback)((chartId, seriesLabel) => {
		const chartHidden = hiddenSeries.get(chartId);
		return !chartHidden || !chartHidden.has(seriesLabel);
	}, [hiddenSeries]);
	const getHiddenSeries = (0, react.useCallback)((chartId) => {
		const set = hiddenSeries.get(chartId);
		return set ? new Set(set) : /* @__PURE__ */ new Set();
	}, [hiddenSeries]);
	const value = (0, react.useMemo)(() => ({
		charts,
		registerChart,
		unregisterChart,
		getChartData,
		theme: providerTheme,
		getElementStyles,
		toggleSeriesVisibility,
		setSeriesVisibility,
		setChartHiddenSeries,
		seedChartHiddenSeries,
		hasSeededChart,
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
		toggleSeriesVisibility,
		setSeriesVisibility,
		setChartHiddenSeries,
		seedChartHiddenSeries,
		hasSeededChart,
		isSeriesVisible,
		getHiddenSeries,
		isColorPaletteResolved
	]);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(GlobalChartsContext.Provider, {
		value,
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
			ref: setWrapperNode,
			className: CHART_SCOPE_CLASS,
			style: {
				display: "contents",
				...overrideVars
			},
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChartScopeContext.Provider, {
				value: scopeNode,
				children
			})
		})
	});
};
//#endregion
//#region src/providers/chart-context/hooks/use-global-charts-context.ts
const useGlobalChartsContext = () => {
	const context = (0, react.useContext)(GlobalChartsContext);
	if (!context) throw new Error("useGlobalChartsContext must be used within a GlobalChartsProvider");
	return context;
};
//#endregion
//#region src/providers/chart-context/hooks/use-chart-id.ts
const useChartId = (providedId) => {
	const generatedId = (0, react.useId)();
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
	const ref = (0, react.useRef)(value);
	if (!(0, import_fast_deep_equal.default)(ref.current, value)) ref.current = value;
	return ref.current;
};
//#endregion
//#region src/providers/chart-scope/use-chart-scope-element.ts
/**
* Returns the nearest chart scope element, or `null` when rendered outside any scope (and during SSR, before the ref is attached).
*
* @return {HTMLElement | null} The nearest chart scope element, or `null`.
*/
const useChartScopeElement = () => (0, react.useContext)(ChartScopeContext);
//#endregion
//#region src/providers/chart-scope/use-standalone-scope-class.ts
/**
* Returns the catalog class when there is no `GlobalChartsProvider` above this component, and `undefined` when there is.
*
* Standalone components need the catalog to resolve at all, but inside a provider the tokens already inherit — re-declaring them there would shadow a consumer override set anywhere in the tree.
*
* @return The scope class name, or undefined when a provider is present.
*/
const useStandaloneScopeClass = () => (0, react.useContext)(GlobalChartsContext) ? void 0 : CHART_SCOPE_CLASS;
//#endregion
//#region src/hooks/use-xychart-theme.ts
const useXYChartTheme = (data) => {
	const theme = useGlobalChartsTheme();
	const scopeElement = useChartScopeElement();
	const seriesColorKey = JSON.stringify((data ?? []).map((series) => series.options?.stroke).filter((color) => Boolean(color)));
	return (0, react.useMemo)(() => {
		const resolve = createCssVariableResolver(scopeElement);
		const resolveColor = (value) => value ? resolve(value) ?? value : value;
		const paletteColors = [...JSON.parse(seriesColorKey), ...theme.colors ?? []].map((color) => resolveColor(color)).filter((color) => Boolean(color) && !color.includes("var("));
		const htmlLabelColor = resolveColor(theme.svgLabelSmall?.fill);
		return (0, _visx_xychart.buildChartTheme)({
			...theme,
			colors: paletteColors,
			backgroundColor: resolveColor(theme.backgroundColor),
			htmlLabel: htmlLabelColor ? { color: htmlLabelColor } : void 0
		});
	}, [
		theme,
		seriesColorKey,
		scopeElement
	]);
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
	return (0, react.useMemo)(() => {
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
	const yTicks = (0, react.useMemo)(() => {
		const allDataPoints = data.flatMap((series) => series.data);
		if (horizontal) return allDataPoints.map((d) => d.label || d.date?.getTime());
		if (options.axis?.y?.tickValues?.length) return options.axis.y.tickValues;
		const minY = Math.min(...allDataPoints.map((d) => d.value));
		const maxY = Math.max(...allDataPoints.map((d) => d.value));
		const yScale = (0, _visx_scale.createScale)({
			...options.yScale,
			domain: [minY, maxY],
			range: [height, 0]
		});
		return (0, _visx_scale.getTicks)(yScale, options.axis?.y?.numTicks);
	}, [
		options,
		data,
		height,
		horizontal
	]);
	return (0, react.useMemo)(() => {
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
	const [width, setWidth] = (0, react.useState)(initialWidth);
	const [height, setHeight] = (0, react.useState)(initialHeight);
	const observerRef = (0, react.useRef)(null);
	return [
		(0, react.useCallback)((node) => {
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
	const [isTruncated, setIsTruncated] = (0, react.useState)(false);
	const observerRef = (0, react.useRef)(null);
	return [(0, react.useCallback)((node) => {
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
const ZERO_PIXEL_SIZE = 2;
const useZeroValueDisplay = (data, options = { enabled: false }) => {
	const { enabled, valueAxisLength } = options;
	return (0, react.useMemo)(() => {
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
	return (0, react.useMemo)(() => {
		const totalValue = data.reduce((sum, segment) => sum + segment.value, 0);
		return data.map((segment) => ({
			...segment,
			percentage: totalValue > 0 ? segment.value / totalValue * 100 : 0
		}));
	}, [data]);
};
//#endregion
//#region src/hooks/use-legend-visibility-data.ts
/**
* Custom hook to filter and recalculate chart data based on series visibility.
*
* Regardless of whether the legend is interactive (clickable), this hook:
* 1. Filters data to show only visible series (visibility can also be set programmatically)
* 2. Recalculates percentages so visible segments total 100%
* 3. Tracks whether all segments are hidden to show empty state
*
* This is particularly useful for pie charts, donut charts, and semi-circle charts
* where segment visibility and percentages need to be dynamically adjusted.
*
* @example
* ```tsx
* const { visibleData, allSegmentsHidden, legendData } = useLegendVisibilityData({
*   data: chartData,
*   chartId: 'my-pie-chart',
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
* @param params                 - Configuration object for the hook
* @param params.data            - The chart data to filter
* @param params.chartId         - Unique identifier for the chart (required for filtering)
* @param params.isSeriesVisible - Function to check series visibility
* @return Object containing visibleData, allSegmentsHidden flag, and legendData with recalculated percentages
*/
const useLegendVisibilityData = ({ data, chartId, isSeriesVisible }) => {
	const visibleData = (0, react.useMemo)(() => {
		if (!chartId) return data;
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
		isSeriesVisible
	]);
	return {
		visibleData,
		allSegmentsHidden: (0, react.useMemo)(() => {
			return visibleData.length === 0 && data.length > 0;
		}, [visibleData, data]),
		legendData: (0, react.useMemo)(() => {
			if (!chartId) return data;
			const visibleDataMap = new Map(visibleData.map((d) => [d.label, d]));
			return data.map((segment) => {
				if (!isSeriesVisible(chartId, segment.label)) return segment;
				return visibleDataMap.get(segment.label) || segment;
			});
		}, [
			data,
			visibleData,
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
	const [prefersReducedMotion, setPrefersReducedMotion] = (0, react.useState)(getInitialState);
	(0, react.useEffect)(() => {
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
	const memoizedMetadata = (0, react.useMemo)(() => metadata, [metadata]);
	(0, react.useEffect)(() => {
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
	return (0, react.useContext)(GlobalChartsContext)?.theme ?? defaultTheme;
};
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
const getLegendItemAriaLabel = (text, value, visible, interactive) => {
	const accessibleText = value != null && value !== "" ? (0, _wordpress_i18n.sprintf)((0, _wordpress_i18n._x)("%1$s, %2$s", "legend item label and value", "jetpack-charts"), text, String(value)) : text;
	if (interactive) {
		if (visible) return (0, _wordpress_i18n.sprintf)((0, _wordpress_i18n._x)("%s: visible. Toggle visibility.", "visible interactive legend item", "jetpack-charts"), accessibleText);
		return (0, _wordpress_i18n.sprintf)((0, _wordpress_i18n._x)("%s: hidden. Toggle visibility.", "hidden interactive legend item", "jetpack-charts"), accessibleText);
	}
	if (visible) return;
	return (0, _wordpress_i18n.sprintf)((0, _wordpress_i18n._x)("%s: hidden", "hidden non-interactive legend item", "jetpack-charts"), accessibleText);
};
const BaseLegend = (0, react.forwardRef)(({ items, className, orientation = "horizontal", alignment = "center", shape = "rect", fill = valueOrIdentityString, size = valueOrIdentityString, labelFormat = valueOrIdentity, labelTransform = labelTransformFactory, itemStyles, itemClassName, labelStyles, labelClassName, shapeStyles, render, interactive = false, chartId }, ref) => {
	const { margin: itemMargin = "0", flexDirection: itemDirection = "row" } = itemStyles ?? {};
	const { justifyContent: labelJustifyContent = "flex-start", flex: labelFlex = "0 0 auto", margin: labelMargin = "0 4px", maxWidth, textOverflow = "wrap" } = labelStyles ?? {};
	const { width: shapeWidth = 16, height: shapeHeight = 16, margin: shapeMargin = "2px 4px 2px 0" } = shapeStyles ?? {};
	const theme = useGlobalChartsTheme();
	const context = (0, react.useContext)(GlobalChartsContext);
	const chartInstanceContext = (0, react.useContext)(ChartInstanceContext);
	const standaloneScopeClass = useStandaloneScopeClass();
	const legendScale = (0, _visx_scale.scaleOrdinal)({
		domain: items.map((item) => item.label),
		range: items.map((item) => item.color)
	});
	const domain = legendScale.domain();
	const getShapeStyle = (0, react.useCallback)(({ index }) => items[index]?.shapeStyle, [items]);
	const handleLegendClick = (0, react.useCallback)((seriesLabels) => {
		if (interactive && chartId && context) {
			const representativeVisible = context.isSeriesVisible(chartId, seriesLabels[0]);
			seriesLabels.forEach((label) => context.setSeriesVisibility(chartId, label, !representativeVisible));
		}
	}, [
		interactive,
		chartId,
		context
	]);
	const isSeriesVisible = (0, react.useCallback)((seriesLabel) => {
		if (chartInstanceContext?.isSeriesVisible) return chartInstanceContext.isSeriesVisible(seriesLabel);
		if (!chartId || !context) return true;
		return context.isSeriesVisible(chartId, seriesLabel);
	}, [
		chartId,
		chartInstanceContext,
		context
	]);
	const createClickHandler = (0, react.useCallback)((seriesLabels) => {
		if (!interactive) return;
		return () => handleLegendClick(seriesLabels);
	}, [interactive, handleLegendClick]);
	const createKeyDownHandler = (0, react.useCallback)((seriesLabels) => {
		if (!interactive) return;
		return (event) => {
			if (event.key === "Enter" || event.key === " ") {
				event.preventDefault();
				handleLegendClick(seriesLabels);
			}
		};
	}, [interactive, handleLegendClick]);
	const flexAlignment = ALIGNMENT_TO_FLEX[alignment] ?? "center";
	return render ? render(items) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_visx_legend.LegendOrdinal, {
		scale: legendScale,
		labelFormat,
		labelTransform,
		children: (labels) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_wordpress_ui.Stack, {
			ref,
			direction: orientation === "vertical" ? "column" : "row",
			gap: orientation === "vertical" ? "sm" : "lg",
			align: orientation === "vertical" ? flexAlignment : void 0,
			justify: orientation === "horizontal" ? flexAlignment : void 0,
			wrap: orientation === "horizontal" ? "wrap" : void 0,
			role: interactive ? void 0 : "list",
			className: (0, clsx.default)(standaloneScopeClass, base_legend_module_default.legend, className),
			style: theme.legend?.containerStyles,
			children: labels.map((label, i) => {
				const matchedItem = items[i];
				const seriesLabels = matchedItem?.seriesLabels?.length ? matchedItem.seriesLabels : [label.text];
				const visible = isSeriesVisible(seriesLabels[0]);
				const handleClick = createClickHandler(seriesLabels);
				const handleKeyDown = createKeyDownHandler(seriesLabels);
				return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_visx_legend.LegendItem, {
					className: (0, clsx.default)("visx-legend-item", base_legend_module_default["legend-item"], interactive && base_legend_module_default["legend-item--interactive"], !visible && base_legend_module_default["legend-item--inactive"], itemClassName),
					margin: itemMargin,
					flexDirection: orientation === "vertical" && alignment === "end" ? "row-reverse" : itemDirection,
					onClick: handleClick,
					onKeyDown: handleKeyDown,
					role: interactive ? "button" : "listitem",
					tabIndex: interactive ? 0 : void 0,
					"aria-pressed": interactive ? visible : void 0,
					"aria-label": getLegendItemAriaLabel(label.text, matchedItem?.value, visible, interactive),
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
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_wordpress_ui.Stack, {
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
const Legend = (0, react.forwardRef)(({ chartId, items, shape, ...props }, ref) => {
	const context = (0, react.useContext)(GlobalChartsContext);
	const chartInstanceContext = (0, react.useContext)(ChartInstanceContext);
	const contextChartId = chartId ?? chartInstanceContext?.chartId;
	const chartData = (0, react.useMemo)(() => contextChartId && context ? context.getChartData(contextChartId) : void 0, [contextChartId, context]);
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
* Buckets series by their `group`, preserving first-appearance order. Series with no group — or a
* group value unique to them — end up in a bucket of their own. Whether a multi-series bucket then
* collapses to a single legend item is decided by the caller: with `collapseGroups` on, every
* multi-member bucket collapses, and the comparison pattern only decides which member represents it.
* @param seriesData - The series data to group
* @return Ordered groups, each holding its member series with their original indices
*/
function groupSeriesForLegend(seriesData) {
	const groups = [];
	const groupIndexByKey = /* @__PURE__ */ new Map();
	seriesData.forEach((series, index) => {
		const member = {
			series,
			index
		};
		const key = series.group;
		if (key === void 0) {
			groups.push([member]);
			return;
		}
		const existing = groupIndexByKey.get(key);
		if (existing === void 0) {
			groupIndexByKey.set(key, groups.length);
			groups.push([member]);
		} else groups[existing].push(member);
	});
	return groups;
}
/**
* Builds a single legend item from a representative series, tagging it with the series it controls
* @param member           - The series (with its original index) that provides the label/colour
* @param seriesLabels     - Every series label this item toggles (grouped) or just its own
* @param getElementStyles - Function to get element styles
* @param showValues       - Whether to show values in legend
* @param withGlyph        - Whether to include glyph rendering
* @param glyphSize        - Size of the glyph
* @param renderGlyph      - Component to render the glyph
* @param legendShape      - The shape type for legend items (string literal or React component)
* @return The processed legend item
*/
function buildSeriesLegendItem(member, seriesLabels, getElementStyles, showValues, withGlyph, glyphSize, renderGlyph, legendShape) {
	const { color, glyph, shapeStyles } = getElementStyles({
		data: member.series,
		index: member.index,
		legendShape
	});
	return applyGlyphToLegendItem({
		label: member.series.label,
		value: showValues ? member.series.data?.length?.toString() || "0" : "",
		color,
		shapeStyle: shapeStyles,
		seriesLabels
	}, withGlyph, glyph, renderGlyph, glyphSize);
}
/**
* Processes SeriesData into legend items. Every series keeps its own legend entry unless
* `collapseGroups` is set, in which case series sharing a `group` collapse to one item labelled by
* the group's primary (its first non-comparison member).
* @param seriesData       - The series data to process
* @param getElementStyles - Function to get element styles
* @param showValues       - Whether to show values in legend
* @param withGlyph        - Whether to include glyph rendering
* @param glyphSize        - Size of the glyph
* @param collapseGroups   - Whether series sharing a group collapse to a single item
* @param renderGlyph      - Component to render the glyph
* @param legendShape      - The shape type for legend items (string literal or React component)
* @return Array of processed legend items
*/
function processSeriesData(seriesData, getElementStyles, showValues, withGlyph, glyphSize, collapseGroups, renderGlyph, legendShape) {
	const buildItem = (member, seriesLabels) => buildSeriesLegendItem(member, seriesLabels, getElementStyles, showValues, withGlyph, glyphSize, renderGlyph, legendShape);
	if (!collapseGroups) return seriesData.map((series, index) => buildItem({
		series,
		index
	}, [series.label]));
	return groupSeriesForLegend(seriesData).flatMap((members) => {
		if (members.length > 1) {
			const primary = members.find(({ series }) => series.options?.type !== "comparison") ?? members[0];
			const seriesLabels = [primary.series.label, ...members.filter((member) => member !== primary).map(({ series }) => series.label)];
			return [buildItem(primary, seriesLabels)];
		}
		return members.map((member) => buildItem(member, [member.series.label]));
	});
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
	const { showValues = false, legendValueDisplay = "percentage", withGlyph = false, glyphSize = 8, collapseGroups = false, renderGlyph } = options;
	const { getElementStyles } = useGlobalChartsContext();
	return (0, react.useMemo)(() => {
		if (!data || !Array.isArray(data) || data.length === 0) return [];
		if ("data" in data[0]) return processSeriesData(data, getElementStyles, showValues, withGlyph, glyphSize, collapseGroups, renderGlyph, legendShape);
		return processPointData(data, getElementStyles, showValues, legendValueDisplay, withGlyph, glyphSize, renderGlyph, legendShape);
	}, [
		data,
		getElementStyles,
		showValues,
		legendValueDisplay,
		withGlyph,
		glyphSize,
		collapseGroups,
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
	const standaloneScopeClass = useStandaloneScopeClass();
	if (!renderContainer) return content;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: (0, clsx.default)(standaloneScopeClass, base_tooltip_module_default.tooltip),
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
const AccessibleTooltip = ({ renderTooltip, selectedIndex, tooltipRef, keyboardFocusedClassName, series = [], mode = "group", verticalCrosshairStyle, horizontalCrosshairStyle, ...props }) => {
	const tooltipContext = (0, react.useContext)(_visx_xychart.TooltipContext);
	const scopeElement = useChartScopeElement();
	const gridStroke = useGlobalChartsTheme().gridStyles?.stroke;
	const crosshairStroke = (0, react.useMemo)(() => {
		const stroke = gridStroke ? resolveCssVariable(gridStroke, scopeElement) : null;
		return stroke ? { stroke } : void 0;
	}, [gridStroke, scopeElement]);
	const tooltipData = (0, react.useMemo)(() => {
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
	const hasKeyboardSelection = (0, react.useRef)(false);
	(0, react.useEffect)(() => {
		if (selectedIndex === void 0) {
			if (hasKeyboardSelection.current) {
				hasKeyboardSelection.current = false;
				tooltipContext?.hideTooltip();
			}
			return;
		}
		hasKeyboardSelection.current = true;
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
	const focusableRenderTooltip = (0, react.useMemo)(() => {
		if (!renderTooltip) return void 0;
		return (params) => {
			const tooltipContent = renderTooltip(params);
			if (selectedIndex !== void 0) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				ref: tooltipRef,
				tabIndex: -1,
				role: "tooltip",
				"aria-atomic": "true",
				className: (0, clsx.default)(CHART_SCOPE_CLASS, keyboardFocusedClassName),
				children: tooltipContent
			}, `chart-tooltip-${selectedIndex}`);
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: CHART_SCOPE_CLASS,
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
		verticalCrosshairStyle: {
			...crosshairStroke,
			...verticalCrosshairStyle
		},
		horizontalCrosshairStyle: {
			...crosshairStroke,
			...horizontalCrosshairStyle
		},
		renderTooltip: focusableRenderTooltip
	});
};
const useKeyboardNavigation = ({ selectedIndex, setSelectedIndex, isNavigating, setIsNavigating, chartRef, totalPoints, onActivate }) => {
	return {
		tooltipRef: (0, react.useCallback)((element) => {
			if (element && selectedIndex !== void 0) element.focus();
		}, [selectedIndex]),
		onChartFocus: (0, react.useCallback)(() => {
			if (!isNavigating && selectedIndex !== void 0) setSelectedIndex(0);
		}, [
			isNavigating,
			selectedIndex,
			setSelectedIndex
		]),
		onChartBlur: (0, react.useCallback)(() => {
			setIsNavigating(false);
		}, [setIsNavigating]),
		onChartKeyDown: (0, react.useCallback)((event) => {
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
			} else if ((event.key === "Enter" || event.key === " ") && selectedIndex !== void 0) onActivate?.(selectedIndex);
		}, [
			totalPoints,
			selectedIndex,
			setSelectedIndex,
			setIsNavigating,
			chartRef,
			onActivate
		])
	};
};
//#endregion
//#region src/providers/chart-context/hooks/use-default-hidden-series.ts
const useIsomorphicLayoutEffect$1 = typeof window !== "undefined" ? react.useLayoutEffect : react.useEffect;
/**
* Seeds a chart's hidden series once per chart ID, the first time the provider
* sees that ID.
*
* The provider owns the record of what has been seeded, not this hook: a
* mount-scoped one would re-apply the defaults on every remount, and a chart
* remounts for reasons the reader never thinks of as a new chart — switching
* between line and bar, tabbing away and back, a resize flipping tabs into a
* dropdown. Each of those would throw away the series they had just revealed.
*
* @param chartId      - The chart ID passed to the provider's visibility methods.
* @param seriesLabels - Labels to hide when this chart ID is first seen. Later values are ignored.
* @return The resolved hidden-series set.
*/
const useDefaultHiddenSeries = (chartId, seriesLabels) => {
	const { getHiddenSeries, seedChartHiddenSeries, hasSeededChart } = useGlobalChartsContext();
	const labelsRef = (0, react.useRef)(seriesLabels);
	labelsRef.current = seriesLabels;
	const hasSeriesLabels = seriesLabels !== void 0;
	const shouldUseDefaults = hasSeriesLabels && !hasSeededChart(chartId);
	useIsomorphicLayoutEffect$1(() => {
		if (labelsRef.current === void 0) return;
		seedChartHiddenSeries(chartId, labelsRef.current);
	}, [
		chartId,
		hasSeriesLabels,
		seedChartHiddenSeries
	]);
	return (0, react.useMemo)(() => shouldUseDefaults ? new Set(labelsRef.current) : getHiddenSeries(chartId), [
		shouldUseDefaults,
		getHiddenSeries,
		chartId
	]);
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
	return legendChildren.filter((l) => l.position === position).map((l, i) => (0, react.createElement)(react.Fragment, { key: `legend-${position}-${i}` }, l.element));
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
	return (0, react.useMemo)(() => {
		const svg = [];
		const html = [];
		const legend = [];
		const other = [];
		const nonLegend = [];
		react.Children.forEach(children, (child) => {
			if ((0, react.isValidElement)(child)) {
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
					if (child.props?.children) react.Children.forEach(child.props.children, (svgChild) => {
						svg.push(svgChild);
					});
				} else if (displayName === `${chartType}.HTML` || displayName === "Chart.HTML") {
					if (child.props?.children) react.Children.forEach(child.props.children, (htmlChild) => {
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
	(0, react.useEffect)(() => {
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
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_wordpress_ui.Stack, {
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
	const { theme } = (0, react.useContext)(_visx_xychart.DataContext) || {};
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
const Center = (0, react.forwardRef)(({ align = "center", justify = "center", className, ...props }, ref) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_wordpress_ui.Stack, {
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
//#region src/charts/private/svg-empty-state/get-all-hidden-message.ts
/**
* Return the empty-state message for a chart whose items are all hidden.
*
* Each translation call has a distinct gettext context. This prevents Terser
* from folding conditional calls into one call with a conditional msgid, which
* would make the strings unavailable to static translation extraction.
*
* @param interactive - Whether the legend can be used to show hidden items.
* @param itemType    - The chart-specific name for its data items.
* @return The translated empty-state message.
*/
const getAllHiddenMessage = (interactive, itemType) => {
	if (itemType === "segments") {
		if (interactive) return (0, _wordpress_i18n._x)("All segments are hidden. Click legend items to show data.", "chart empty state: interactive segments", "jetpack-charts");
		return (0, _wordpress_i18n._x)("All segments are hidden.", "chart empty state: segments", "jetpack-charts");
	}
	if (interactive) return (0, _wordpress_i18n._x)("All series are hidden. Click legend items to show data.", "chart empty state: interactive series", "jetpack-charts");
	return (0, _wordpress_i18n._x)("All series are hidden.", "chart empty state: series", "jetpack-charts");
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
const dateTimeFormat = (options) => {
	let formatter;
	return (timestamp) => {
		if (!Number.isFinite(Number(timestamp))) return new Date(timestamp).toLocaleDateString();
		formatter = formatter ?? new Intl.DateTimeFormat(void 0, options);
		return formatter.format(timestamp);
	};
};
const formatYearTick = dateTimeFormat({ year: "numeric" });
const formatDateTick = dateTimeFormat({
	month: "short",
	day: "numeric"
});
const formatHourTick = dateTimeFormat({
	hour: "numeric",
	hour12: true
});
const formatMonthTick = dateTimeFormat({ month: "short" });
const boundaryFormat = (isAnchor, atBoundary, between) => {
	const format = (timestamp) => isAnchor(new Date(timestamp)) ? atBoundary(timestamp) : between(timestamp);
	format.isAnchor = isAnchor;
	return format;
};
const formatDateOrHourTick = boundaryFormat((date) => date.getHours() === 0 && date.getMinutes() === 0, formatDateTick, formatHourTick);
const formatMonthOrYearTick = boundaryFormat((date) => date.getMonth() === 0, formatYearTick, formatMonthTick);
const getSpan = (sortedData) => {
	const bounds = sortedData.map((datom) => [datom.data.at(0)?.date, datom.data.at(-1)?.date]).filter(([first, last]) => first !== void 0 && last !== void 0);
	if (!bounds.length) return null;
	return {
		minX: Math.min(...bounds.map(([first]) => Number(first))),
		maxX: Math.max(...bounds.map(([, last]) => Number(last)))
	};
};
const getPointSpacingInHours = (sortedData) => {
	return sortedData.reduce((spacing, datom) => datom.data.reduce((seriesSpacing, point, index) => {
		const previous = datom.data[index - 1];
		if (previous?.date === void 0 || point?.date === void 0) return seriesSpacing;
		return Math.min(seriesSpacing, Math.abs((0, date_fns.differenceInHours)(point.date, previous.date)));
	}, spacing), Number.POSITIVE_INFINITY);
};
const SUB_DAILY_SPACING_HOURS = 23;
const MONTHLY_SPACING_HOURS = 672;
const getBucketResolution = (sortedData, tickResolution) => {
	if (tickResolution) return tickResolution === "week" ? "day" : tickResolution;
	const spacingInHours = getPointSpacingInHours(sortedData);
	if (spacingInHours < SUB_DAILY_SPACING_HOURS) return "hour";
	if (!Number.isFinite(spacingInHours) || spacingInHours < MONTHLY_SPACING_HOURS) return "day";
	return spacingInHours < 12 * MONTHLY_SPACING_HOURS ? "month" : "year";
};
const getFormatter = (sortedData, tickResolution) => {
	const resolution = getBucketResolution(sortedData, tickResolution);
	if (resolution === "year") return formatYearTick;
	if (resolution === "month") return formatMonthOrYearTick;
	const span = getSpan(sortedData);
	if (!span) return formatDateTick;
	const diffInHours = Math.abs((0, date_fns.differenceInHours)(span.maxX, span.minX));
	if (resolution === "hour") {
		if (diffInHours <= 24) return formatHourTick;
		if (diffInHours <= 168) return formatDateOrHourTick;
	}
	return Math.abs((0, date_fns.differenceInYears)(span.maxX, span.minX)) <= 1 ? formatDateTick : formatYearTick;
};
const getAnchorIndices = (domain, isAnchor) => domain.reduce((indices, date, index) => {
	if (isAnchor(date)) indices.push(index);
	return indices;
}, []);
const getCandidateSteps = (length, maxTicks, anchorSpacing) => {
	const steps = /* @__PURE__ */ new Set();
	for (let count = maxTicks; count > 1; count--) {
		steps.add(Math.max(1, Math.floor((length - 1) / (count - 1))));
		steps.add(Math.max(1, Math.ceil((length - 1) / (count - 1))));
	}
	if (anchorSpacing) {
		for (let divisor = 1; divisor <= anchorSpacing; divisor++) if (anchorSpacing % divisor === 0) steps.add(anchorSpacing / divisor);
		const minStep = Math.floor((length - 1) / Math.max(1, maxTicks)) + 1;
		steps.add(Math.ceil(minStep / anchorSpacing) * anchorSpacing);
	}
	return steps;
};
/**
* Tick values for a band time axis.
*
* visx samples a band domain by index from offset zero, blind to which labels
* carry a boundary and without collapsing repeats — so the tick that prints the
* year or the date often isn't sampled at all, and a long series can show the
* same label twice. Choose the values instead: sweep the evenly spaced
* candidates, including those that step from anchor to anchor, and keep the one
* that reaches the most anchors without thinning the axis or putting two
* identical labels side by side.
*
* @param domain        - Band domain, in axis order.
* @param tickFormatter - Formatter the axis will render these values with.
* @param maxTicks      - Most ticks the axis should carry.
* @return Values to hand the axis as `tickValues`.
*/
const getBandTickValues = (domain, tickFormatter, maxTicks) => {
	if (!domain.length) return [];
	const { isAnchor } = tickFormatter;
	const anchorIndices = isAnchor ? getAnchorIndices(domain, isAnchor) : [];
	const domainLabels = domain.map((date) => tickFormatter(date.getTime()));
	const candidates = [];
	const consider = (indices) => {
		if (!indices.length || indices.length > maxTicks) return;
		if (!indices.some((index, position) => position > 0 && domainLabels[index] === domainLabels[indices[position - 1]])) candidates.push(indices);
	};
	const anchorSpacing = anchorIndices.length > 1 ? anchorIndices[1] - anchorIndices[0] : null;
	for (const step of getCandidateSteps(domain.length, maxTicks, anchorSpacing)) for (let offset = 0; offset < step; offset++) {
		const indices = [];
		for (let index = offset; index < domain.length; index += step) indices.push(index);
		consider(indices);
	}
	for (let stride = 1; stride <= anchorIndices.length; stride++) consider(anchorIndices.filter((_, position) => position % stride === 0));
	if (!candidates.length) return [domain[0]];
	const densest = candidates.reduce((most, indices) => Math.max(most, indices.length), 0);
	const anchorsIn = (indices) => isAnchor ? indices.filter((index) => isAnchor(domain[index])).length : 0;
	return candidates.filter((indices) => indices.length >= densest - 1).reduce((chosen, indices) => {
		const gain = anchorsIn(indices) - anchorsIn(chosen);
		return gain > 0 || gain === 0 && indices.length > chosen.length ? indices : chosen;
	}).map((index) => domain[index]);
};
const guessOptimalNumTicks = (data, chartWidth, tickFormatter) => {
	const span = getSpan(data);
	if (!span) return 1;
	const xScale = (0, _visx_scale.scaleTime)({ domain: [span.minX, span.maxX] });
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
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? react.useLayoutEffect : react.useEffect;
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
		const [scopeNode, setScopeNode] = (0, react.useState)(null);
		const wrapperRef = (0, react.useRef)(null);
		const setWrapperRef = (0, react.useCallback)((node) => {
			wrapperRef.current = node;
			setScopeNode(node);
			if (typeof parentRef === "function") parentRef(node);
			else if (parentRef) parentRef.current = node;
		}, [parentRef]);
		const [containedHeight, setContainedHeight] = (0, react.useState)(null);
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
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChartScopeContext.Provider, {
				value: scopeNode,
				children: hasAspectRatio ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: with_responsive_module_default.content,
					style: {
						width: boxWidth,
						height: boxHeight
					},
					children: wrappedComponent
				}) : wrappedComponent
			})
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
	const [domain, setDomain] = (0, react.useState)(null);
	const [drag, setDrag] = (0, react.useState)(null);
	const reset = (0, react.useCallback)(() => setDomain(null), []);
	const onPointerDown = (0, react.useCallback)((params) => {
		userHandlers?.onPointerDown?.(params);
		if (!enabled || !params.svgPoint) return;
		setDrag({
			a: params.svgPoint.x,
			b: params.svgPoint.x
		});
	}, [enabled, userHandlers]);
	const onPointerMove = (0, react.useCallback)((params) => {
		userHandlers?.onPointerMove?.(params);
		if (!enabled || !params.svgPoint) return;
		setDrag((current) => current ? {
			a: current.a,
			b: params.svgPoint.x
		} : current);
	}, [enabled, userHandlers]);
	const onPointerUp = (0, react.useCallback)((params) => {
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
	return (0, react.useMemo)(() => ({
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
	const { margin, innerHeight } = (0, react.useContext)(_visx_xychart.DataContext);
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
	const { margin, innerWidth, innerHeight } = (0, react.useContext)(_visx_xychart.DataContext);
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
* chart container, using the WPDS `IconButton`. The host should wrap its SVG in
* a `position: relative` container so the button anchors correctly.
*
* @param props         - Props.
* @param props.onClick - Click handler. Typically the `reset` from `useXZoom`.
* @return JSX element.
*/
function ZoomResetButton({ onClick }) {
	const stopActivationKeys = (0, react.useCallback)((event) => {
		if (event.key === "Enter" || event.key === " ") event.stopPropagation();
	}, []);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_wordpress_ui.IconButton, {
		className: x_zoom_module_default["x-zoom__reset"],
		onKeyDown: stopActivationKeys,
		label: (0, _wordpress_i18n.__)("Reset zoom", "jetpack-charts"),
		variant: "outline",
		tone: "neutral",
		size: "small",
		onClick,
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
		})
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
	const popoverId = (0, react.useId)();
	const buttonRef = (0, react.useRef)(null);
	const popoverRef = (0, react.useRef)(null);
	const [isPositioned, setIsPositioned] = (0, react.useState)(false);
	const isBrowserSafari = isSafari();
	(0, react.useEffect)(() => {
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
				transform: `translate(22px, 0)`
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
			children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_wordpress_ui.Stack, {
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
	const { chartRef, chartWidth, chartHeight } = useChartInstanceContext();
	const [scales, setScales] = (0, react.useState)(null);
	const [scalesStable, setScalesStable] = (0, react.useState)(false);
	const createScaleSignature = (0, react.useCallback)((scaleData) => {
		const xDomain = scaleData.xScale.domain();
		const yDomain = scaleData.yScale.domain();
		const xRange = scaleData.xScale.range();
		const yRange = scaleData.yScale.range();
		return `${xDomain.join(",")}-${yDomain.join(",")}-${xRange.join(",")}-${yRange.join(",")}`;
	}, []);
	const getScalesData = (0, react.useCallback)(() => {
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
	(0, react.useEffect)(() => {
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
	const scopeElement = useChartScopeElement();
	const { xScale, yScale } = (0, react.useContext)(_visx_xychart.DataContext) || {};
	const labelRef = (0, react.useRef)(null);
	const [height, setHeight] = (0, react.useState)(null);
	const styles = (0, deepmerge.default)(providerTheme.annotationStyles ?? {}, datumStyles ?? {});
	const resolveColor = (value) => value ? resolveCssVariable(value, scopeElement) ?? value : value;
	(0, react.useEffect)(() => {
		if (labelRef.current?.getBBox) {
			const bbox = labelRef.current.getBBox();
			setHeight(bbox.height);
		}
	}, []);
	const positionData = (0, react.useMemo)(() => {
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
	const { xScale, yScale } = (0, react.useContext)(_visx_xychart.DataContext) || {};
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
	return /* @__PURE__ */ (0, react.createElement)(DefaultGlyph, {
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
		}), tooltipPoints.map((point) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_wordpress_ui.Stack, {
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
	const context = (0, react.useContext)(_visx_xychart.DataContext);
	(0, react.useImperativeHandle)(chartRef, () => ({
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
const LineChartInternal = (0, react.forwardRef)(({ data, chartId: providedChartId, width, height, className, margin, withTooltips = true, withTooltipCrosshairs, showLegend = false, legend = {}, renderGlyph = defaultRenderGlyph, glyphStyle = {}, withLegendGlyph = false, withGradientFill = false, smoothing = true, curveType, renderTooltip = renderDefaultTooltip, withStartGlyphs = false, withEndGlyphs = false, animation, options = {}, onPointerDown = void 0, onPointerUp = void 0, onPointerMove = void 0, onPointerOut = void 0, onDatumActivate = void 0, zoomable = false, rescaleYOnVisibilityChange = true, defaultHiddenSeries, children, gridVisibility, gap = "md" }, ref) => {
	const legendInteractive = legend.interactive ?? false;
	const legendCollapseGroups = legend.collapseGroups ?? false;
	const legendShape = legend.shape ?? "line";
	const legendPosition = legend.position ?? "bottom";
	const providerTheme = useGlobalChartsTheme();
	const theme = useXYChartTheme(data);
	const resolvedBackgroundColor = theme.backgroundColor ?? providerTheme.backgroundColor;
	const chartId = useChartId(providedChartId);
	const hiddenSeries = useDefaultHiddenSeries(chartId, defaultHiddenSeries);
	const isSeriesVisible = (0, react.useCallback)((seriesLabel) => !hiddenSeries.has(seriesLabel), [hiddenSeries]);
	const chartRef = (0, react.useRef)(null);
	const [selectedIndex, setSelectedIndex] = (0, react.useState)(void 0);
	const [isNavigating, setIsNavigating] = (0, react.useState)(false);
	const internalChartRef = (0, react.useRef)(null);
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
	const [measuredChartHeight, setMeasuredChartHeight] = (0, react.useState)();
	const handleContentHeightChange = (0, react.useCallback)((contentHeight) => {
		setMeasuredChartHeight(contentHeight > 0 ? contentHeight : height);
	}, [height]);
	(0, react.useImperativeHandle)(ref, () => ({
		getScales: () => internalChartRef.current?.getScales() || null,
		getChartDimensions: () => internalChartRef.current?.getChartDimensions() || {
			width: 0,
			height: 0,
			margin: {}
		}
	}), [internalChartRef]);
	const dataSorted = useChartDataTransform(data);
	const { getElementStyles } = useGlobalChartsContext();
	const seriesWithVisibility = (0, react.useMemo)(() => {
		return dataSorted.map((series, index) => ({
			series,
			index,
			isVisible: !hiddenSeries.has(series.label)
		}));
	}, [dataSorted, hiddenSeries]);
	const allSeriesHidden = (0, react.useMemo)(() => {
		return seriesWithVisibility.every(({ isVisible }) => !isVisible);
	}, [seriesWithVisibility]);
	const stableYDomain = (0, react.useMemo)(() => {
		if (rescaleYOnVisibilityChange) return;
		let min = Infinity;
		let max = -Infinity;
		for (const series of dataSorted) for (const point of series.data ?? []) {
			const value = point?.value;
			if (typeof value === "number" && Number.isFinite(value)) {
				min = Math.min(min, value);
				max = Math.max(max, value);
			}
		}
		return min < max ? [min, max] : void 0;
	}, [rescaleYOnVisibilityChange, dataSorted]);
	const activateSelectedPoint = (0, react.useCallback)((index) => {
		const series = dataSorted[0];
		const datum = series?.data[index];
		if (series && datum) onDatumActivate?.({
			datum,
			index,
			key: series.label
		});
	}, [dataSorted, onDatumActivate]);
	const { tooltipRef, onChartFocus, onChartBlur, onChartKeyDown } = useKeyboardNavigation({
		selectedIndex,
		setSelectedIndex,
		isNavigating,
		setIsNavigating,
		chartRef,
		totalPoints: dataSorted[0]?.data.length || 0,
		onActivate: activateSelectedPoint
	});
	const chartOptions = (0, react.useMemo)(() => {
		const { tickResolution, tickFormat, ...xAxisOptions } = options?.axis?.x ?? {};
		const formatter = tickFormat || getFormatter(dataSorted, tickResolution);
		return {
			axis: {
				x: {
					orientation: "bottom",
					numTicks: guessOptimalNumTicks(dataSorted, width, formatter),
					tickFormat: formatter,
					display: true,
					...xAxisOptions
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
				...stableYDomain ? { domain: stableYDomain } : {},
				...options?.yScale
			}
		};
	}, [
		options,
		dataSorted,
		width,
		zoom.domain,
		stableYDomain
	]);
	const tooltipRenderGlyph = (0, react.useMemo)(() => {
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
	const legendItems = useChartLegendItems(dataSorted, (0, react.useMemo)(() => ({
		withGlyph: withLegendGlyph,
		glyphSize: Math.max(0, toNumber(glyphStyle?.radius) ?? 4),
		collapseGroups: legendCollapseGroups,
		renderGlyph
	}), [
		withLegendGlyph,
		glyphStyle?.radius,
		legendCollapseGroups,
		renderGlyph
	]), legendShape);
	const chartMetadata = (0, react.useMemo)(() => ({
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
	]);
	useChartRegistration({
		chartId,
		legendItems,
		chartType: "line",
		isDataValid,
		metadata: chartMetadata
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
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChartInstanceContext.Provider, {
		value: {
			chartId,
			chartRef: internalChartRef,
			isSeriesVisible,
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
								!allSeriesHidden && gridVisibility !== "none" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_visx_xychart.Grid, {
									columns: false,
									numTicks: 4
								}),
								!allSeriesHidden && chartOptions.axis.x.display && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_visx_xychart.Axis, { ...chartOptions.axis.x }),
								!allSeriesHidden && chartOptions.axis.y.display && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_visx_xychart.Axis, { ...chartOptions.axis.y }),
								allSeriesHidden ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SvgEmptyState, {
									x: width / 2,
									y: chartHeight / 2,
									width,
									height: chartHeight,
									children: getAllHiddenMessage(legendInteractive, "series")
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
const LineChartWithProvider = (0, react.forwardRef)((props, ref) => {
	if ((0, react.useContext)(GlobalChartsContext)) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(LineChartInternal, {
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
	const context = (0, react.useContext)(_visx_xychart.DataContext);
	(0, react.useImperativeHandle)(chartRef, () => ({
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
	const dataContext = (0, react.useContext)(_visx_xychart.DataContext);
	const tooltipContext = (0, react.useContext)(_visx_xychart.TooltipContext);
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
const AreaChartInternal = (0, react.forwardRef)(({ data, chartId: providedChartId, width, height, className, margin, withTooltips = true, withTooltipCrosshairs, showLegend = false, legend = {}, stacked = true, stackOffset = "none", smoothing = true, curveType, fillOpacity, withStroke, renderTooltip = renderDefaultTooltip, animation, options = {}, onPointerDown, onPointerUp, onPointerMove, onPointerOut, zoomable = false, rescaleYOnVisibilityChange, rescaleYOnLegendToggle, defaultHiddenSeries, children, gridVisibility, gap = "md" }, ref) => {
	const legendInteractive = legend.interactive ?? false;
	const legendShape = legend.shape ?? "rect";
	const legendPosition = legend.position ?? "bottom";
	const rescaleYOnVisibility = rescaleYOnVisibilityChange ?? rescaleYOnLegendToggle ?? true;
	const providerTheme = useGlobalChartsTheme();
	const theme = useXYChartTheme(data);
	const chartId = useChartId(providedChartId);
	const hiddenSeries = useDefaultHiddenSeries(chartId, defaultHiddenSeries);
	const isSeriesVisible = (0, react.useCallback)((seriesLabel) => !hiddenSeries.has(seriesLabel), [hiddenSeries]);
	const chartRef = (0, react.useRef)(null);
	const [selectedIndex, setSelectedIndex] = (0, react.useState)(void 0);
	const [isNavigating, setIsNavigating] = (0, react.useState)(false);
	const internalChartRef = (0, react.useRef)(null);
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
	const [measuredChartHeight, setMeasuredChartHeight] = (0, react.useState)();
	const handleContentHeightChange = (0, react.useCallback)((contentHeight) => {
		setMeasuredChartHeight(contentHeight > 0 ? contentHeight : height);
	}, [height]);
	(0, react.useImperativeHandle)(ref, () => ({
		getScales: () => internalChartRef.current?.getScales() || null,
		getChartDimensions: () => internalChartRef.current?.getChartDimensions() || {
			width: 0,
			height: 0,
			margin: {}
		}
	}), [internalChartRef]);
	const dataSorted = useChartDataTransform(data);
	const { getElementStyles } = useGlobalChartsContext();
	const seriesWithVisibility = (0, react.useMemo)(() => {
		return dataSorted.map((series, index) => ({
			series,
			index,
			isVisible: !hiddenSeries.has(series.label)
		}));
	}, [dataSorted, hiddenSeries]);
	const allSeriesHidden = (0, react.useMemo)(() => seriesWithVisibility.every(({ isVisible }) => !isVisible), [seriesWithVisibility]);
	const { tooltipRef, onChartFocus, onChartBlur, onChartKeyDown } = useKeyboardNavigation({
		selectedIndex,
		setSelectedIndex,
		isNavigating,
		setIsNavigating,
		chartRef,
		totalPoints: dataSorted[0]?.data.length || 0
	});
	const fixedYDomain = (0, react.useMemo)(() => {
		if (rescaleYOnVisibility || !dataSorted.length || !dataSorted[0].data.length || stacked && stackOffset !== "none") return;
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
		rescaleYOnVisibility
	]);
	const chartOptions = (0, react.useMemo)(() => {
		const { tickResolution, tickFormat, ...xAxisOptions } = options?.axis?.x ?? {};
		const formatter = tickFormat || getFormatter(dataSorted, tickResolution);
		return {
			axis: {
				x: {
					orientation: "bottom",
					numTicks: guessOptimalNumTicks(dataSorted, width, formatter),
					tickFormat: formatter,
					display: true,
					...xAxisOptions
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
	const legendItems = useChartLegendItems(dataSorted, (0, react.useMemo)(() => ({
		withGlyph: false,
		glyphSize: 0,
		collapseGroups: legend.collapseGroups ?? false
	}), [legend.collapseGroups]), legendShape);
	const chartMetadata = (0, react.useMemo)(() => ({
		stacked,
		stackOffset,
		smoothing,
		curveType
	}), [
		stacked,
		stackOffset,
		smoothing,
		curveType
	]);
	useChartRegistration({
		chartId,
		legendItems,
		chartType: "area",
		isDataValid,
		metadata: chartMetadata
	});
	const prefersReducedMotion = usePrefersReducedMotion();
	const animationEnabled = !!animation && !prefersReducedMotion;
	const accessors = {
		xAccessor: (d) => d?.date,
		yAccessor: (d) => d?.value
	};
	const zeroYAccessor = (0, react.useCallback)(() => 0, []);
	const visibleLabels = (0, react.useMemo)(() => new Set(seriesWithVisibility.filter((s) => s.isVisible).map((s) => s.series.label)), [seriesWithVisibility]);
	const filteredRenderTooltip = (0, react.useCallback)((params) => {
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
	}, [renderTooltip, visibleLabels]);
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
			yAccessor: isVisible ? accessors.yAccessor : zeroYAccessor,
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
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChartInstanceContext.Provider, {
		value: {
			chartId,
			chartRef: internalChartRef,
			isSeriesVisible,
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
								!allSeriesHidden && gridVisibility !== "none" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_visx_xychart.Grid, {
									columns: false,
									numTicks: 4
								}),
								!allSeriesHidden && chartOptions.axis.x.display && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_visx_xychart.Axis, { ...chartOptions.axis.x }),
								!allSeriesHidden && chartOptions.axis.y.display && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_visx_xychart.Axis, { ...chartOptions.axis.y }),
								allSeriesHidden ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(SvgEmptyState, {
									x: width / 2,
									y: chartHeight / 2,
									width,
									height: chartHeight,
									children: getAllHiddenMessage(legendInteractive, "series")
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
									strokeColor: theme.backgroundColor ?? providerTheme.backgroundColor
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
const AreaChartWithProvider = (0, react.forwardRef)((props, ref) => {
	if ((0, react.useContext)(GlobalChartsContext)) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(AreaChartInternal, {
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
	const { xScale, yScale } = (0, react.useContext)(_visx_xychart.DataContext) || {};
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
/** Ticks each axis carries unless the caller asks for a different count. */
const DEFAULT_NUM_TICKS = 4;
const ALL_RENDERED = () => true;
const TOOLTIP_FORMAT_BY_RESOLUTION = {
	hour: {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "numeric",
		hour12: true
	},
	day: {
		year: "numeric",
		month: "long",
		day: "numeric"
	},
	month: {
		year: "numeric",
		month: "long"
	},
	year: { year: "numeric" }
};
/**
* Labels one bar's bucket, at the bucket's own granularity — finer than the
* ticks whenever the overall time span coarsens the axis.
*
* @param data           - Date-based series, already parsed and sorted by `useChartDataTransform`.
* @param tickResolution - Caller-declared bucket resolution, when known.
* @return Tooltip label formatter.
*/
const getTooltipFormatter = (data, tickResolution) => {
	if (tickResolution === "week") return (timestamp) => (0, _wordpress_i18n.sprintf)((0, _wordpress_i18n.__)("Week of %s", "jetpack-charts"), new Date(timestamp).toLocaleDateString(void 0, {
		year: "numeric",
		month: "long",
		day: "numeric"
	}));
	const format = TOOLTIP_FORMAT_BY_RESOLUTION[getBucketResolution(data, tickResolution)] ?? TOOLTIP_FORMAT_BY_RESOLUTION.day;
	return (timestamp) => new Date(timestamp).toLocaleString(void 0, format);
};
const identity = (label) => label;
const byBucket = (format) => (bucket) => typeof bucket === "string" ? bucket : format(Number(bucket));
const bucketAccessor = (d) => d?.label || d?.date;
/**
* The buckets the band axis can put a tick on.
*
* Built from the accessor visx is given, over the same series in the same order,
* so that a tick value is a key the scale actually holds; `scaleBand` returns
* `undefined` for one it does not, which parks the tick at the origin. Null
* rather than a partial list when any bucket is labelled instead of dated.
*
* @param data             - Every series handed to the chart.
* @param isSeriesRendered - Whether visx mounts a series, i.e. the legend shows it.
* @return Bucket dates in axis order, or null if the axis cannot be ticked by date.
*/
const getBandDomain = (data, isSeriesRendered) => {
	const registry = {};
	for (const series of data) {
		if (series.options?.type === "comparison" || !isSeriesRendered(series)) continue;
		registry[series.label] = series;
	}
	const byTimestamp = /* @__PURE__ */ new Map();
	for (const key of Object.keys(registry)) for (const point of registry[key].data) {
		const bucket = bucketAccessor(point);
		if (!(bucket instanceof Date)) return null;
		if (!byTimestamp.has(bucket.getTime())) byTimestamp.set(bucket.getTime(), bucket);
	}
	return byTimestamp.size ? [...byTimestamp.values()] : null;
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
* @param data             - The data to be displayed in the chart.
* @param horizontal       - Whether the chart is horizontal or vertical.
* @param options          - The options for the chart.
* @param isSeriesRendered - Whether visx mounts a series, i.e. the legend shows it.
* @return The merged options for the chart.
*/
function useBarChartOptions(data, horizontal, options = {}, isSeriesRendered = ALL_RENDERED) {
	const stableOptions = useDeepMemo(options);
	const axisConfig = (0, react.useMemo)(() => {
		const { labelOverflow: xLabelOverflow, tickResolution: xTickResolution, tickFormat: xTickFormat, ...xAxisOptions } = stableOptions.axis?.x || {};
		const { labelOverflow: yLabelOverflow, tickResolution: yTickResolution, tickFormat: yTickFormat, ...yAxisOptions } = stableOptions.axis?.y || {};
		return {
			xLabelOverflow,
			yLabelOverflow,
			xTickFormat,
			yTickFormat,
			xAxisOptions,
			yAxisOptions,
			tickResolution: horizontal ? yTickResolution : xTickResolution
		};
	}, [stableOptions, horizontal]);
	const { tickResolution } = axisConfig;
	const defaultOptions = (0, react.useMemo)(() => {
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
		const hasLabels = Boolean(data?.[0]?.data?.[0]?.label);
		const timeTickFormatter = hasLabels ? null : getFormatter(data, tickResolution);
		const labelFormatter = timeTickFormatter ? byBucket(timeTickFormatter) : identity;
		const tooltipDatumFormatter = hasLabels ? labelFormatter : byBucket(getTooltipFormatter(data, tickResolution));
		const valueFormatter = _automattic_number_formatters.formatNumberCompact;
		const bandDomain = timeTickFormatter ? getBandDomain(data, isSeriesRendered) : null;
		const valueAccessor = (d) => {
			const enhancedPoint = d;
			return enhancedPoint?.visualValue !== void 0 ? enhancedPoint.visualValue : d?.value;
		};
		return {
			timeAxis: bandDomain && timeTickFormatter && {
				domain: bandDomain,
				tickFormatter: timeTickFormatter
			},
			vertical: {
				xTickFormat: labelFormatter,
				yTickFormat: valueFormatter,
				tooltipLabelFormatter: tooltipDatumFormatter,
				xAccessor: bucketAccessor,
				yAccessor: valueAccessor,
				gridVisibility: "x",
				xScale: bandScale,
				yScale: linearScale
			},
			horizontal: {
				xTickFormat: valueFormatter,
				yTickFormat: labelFormatter,
				tooltipLabelFormatter: tooltipDatumFormatter,
				xAccessor: valueAccessor,
				yAccessor: bucketAccessor,
				gridVisibility: "y",
				xScale: linearScale,
				yScale: bandScale
			}
		};
	}, [
		data,
		tickResolution,
		isSeriesRendered
	]);
	return (0, react.useMemo)(() => {
		const { xTickFormat: defaultXTickFormat, yTickFormat: defaultYTickFormat, tooltipLabelFormatter: defaultTooltipLabelFormatter, xAccessor, yAccessor, gridVisibility, xScale: baseXScale, yScale: baseYScale } = defaultOptions[horizontal ? "horizontal" : "vertical"];
		let valueScaleDomainOverride = {};
		if (data.some((s) => s.options?.type === "comparison")) {
			if (!(!horizontal ? stableOptions.yScale?.domain : stableOptions.xScale?.domain)) {
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
			...stableOptions.xScale || {},
			...horizontal ? valueScaleDomainOverride : {}
		};
		const yScale = {
			...baseYScale,
			...stableOptions.yScale || {},
			...!horizontal ? valueScaleDomainOverride : {}
		};
		const { xLabelOverflow, yLabelOverflow, xTickFormat, yTickFormat, xAxisOptions, yAxisOptions } = axisConfig;
		const dateAxisTickFormat = horizontal ? yTickFormat : xTickFormat;
		const { timeAxis } = defaultOptions;
		const dateAxisOptions = horizontal ? yAxisOptions : xAxisOptions;
		const bandTickValues = timeAxis && !dateAxisTickFormat ? getBandTickValues(timeAxis.domain, timeAxis.tickFormatter, dateAxisOptions.numTicks ?? DEFAULT_NUM_TICKS) : null;
		const dateAxisTickValues = bandTickValues ? { tickValues: bandTickValues } : {};
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
					numTicks: DEFAULT_NUM_TICKS,
					tickFormat: xTickFormat || defaultXTickFormat,
					...horizontal ? {} : dateAxisTickValues,
					...xLabelOverflow === "ellipsis" ? { tickComponent: TruncatedXTickComponent } : {},
					...xAxisOptions
				},
				y: {
					orientation: "left",
					numTicks: DEFAULT_NUM_TICKS,
					tickFormat: yTickFormat || defaultYTickFormat,
					...horizontal ? dateAxisTickValues : {},
					...yLabelOverflow === "ellipsis" ? { tickComponent: TruncatedYTickComponent } : {},
					...yAxisOptions
				}
			},
			barGroup: { padding: getGroupPadding(horizontal ? yScale : xScale) },
			tooltip: { labelFormatter: dateAxisTickFormat || defaultTooltipLabelFormatter }
		};
	}, [
		defaultOptions,
		axisConfig,
		stableOptions,
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
	const context = (0, react.useContext)(_visx_xychart.DataContext);
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
const BarChartInternal = ({ data, chartId: providedChartId, width, height, className, margin, withTooltips = false, showLegend = false, legend = {}, gridVisibility: gridVisibilityProp, renderTooltip, options = {}, orientation = "vertical", withPatterns = false, showZeroValues = false, defaultHiddenSeries, animation, children, gap = "md", onPointerDown, onPointerUp, onDatumActivate }) => {
	const legendInteractive = legend.interactive ?? false;
	const legendCollapseGroups = legend.collapseGroups ?? false;
	const horizontal = orientation === "horizontal";
	const chartId = useChartId(providedChartId);
	const hiddenSeries = useDefaultHiddenSeries(chartId, defaultHiddenSeries);
	const isSeriesVisible = (0, react.useCallback)((seriesLabel) => !hiddenSeries.has(seriesLabel), [hiddenSeries]);
	const theme = useXYChartTheme(data);
	const dataSorted = useChartDataTransform(data);
	const dataWithVisibleZeros = useZeroValueDisplay(dataSorted, {
		enabled: showZeroValues,
		valueAxisLength: horizontal ? width : height
	});
	const legendItems = useChartLegendItems(dataSorted, (0, react.useMemo)(() => ({ collapseGroups: legendCollapseGroups }), [legendCollapseGroups]));
	const { getElementStyles } = useGlobalChartsContext();
	const isSeriesRendered = (0, react.useCallback)((series) => isSeriesVisible(series.label), [isSeriesVisible]);
	const chartOptions = useBarChartOptions(dataWithVisibleZeros, horizontal, options, isSeriesRendered);
	const defaultMargin = useChartMargin(height, chartOptions, dataSorted, theme, horizontal);
	const chartRef = (0, react.useRef)(null);
	const { legendChildren, nonLegendChildren } = useChartChildren(children, "BarChart");
	const [measuredChartHeight, setMeasuredChartHeight] = (0, react.useState)();
	const handleContentHeightChange = (0, react.useCallback)((contentHeight) => {
		setMeasuredChartHeight(contentHeight > 0 ? contentHeight : height);
	}, [height]);
	const [selectedIndex, setSelectedIndex] = (0, react.useState)(void 0);
	const [isNavigating, setIsNavigating] = (0, react.useState)(false);
	const primarySeriesForNav = dataWithVisibleZeros.filter((s) => s.options?.type !== "comparison");
	const totalPoints = Math.max(0, ...primarySeriesForNav.map((s) => s.data?.length || 0)) * primarySeriesForNav.length;
	const seriesWithVisibility = (0, react.useMemo)(() => dataWithVisibleZeros.map((series, index) => ({
		series,
		index,
		isVisible: isSeriesRendered(series)
	})), [dataWithVisibleZeros, isSeriesRendered]);
	const allSeriesHidden = (0, react.useMemo)(() => {
		return seriesWithVisibility.every(({ isVisible }) => !isVisible);
	}, [seriesWithVisibility]);
	const primaryEntries = (0, react.useMemo)(() => seriesWithVisibility.filter(({ isVisible, series }) => isVisible && series.options?.type !== "comparison"), [seriesWithVisibility]);
	const primaryKeys = (0, react.useMemo)(() => primaryEntries.map(({ series }) => series.label), [primaryEntries]);
	const primarySeries = (0, react.useMemo)(() => primaryEntries.map(({ series }) => series), [primaryEntries]);
	const activateSelectedBar = (0, react.useCallback)((index) => {
		const primaryCount = primaryEntries.length;
		if (!primaryCount) return;
		const dataPointIndex = Math.floor(index / primaryCount);
		const series = primaryEntries[index % primaryCount]?.series;
		const datum = series?.data[dataPointIndex];
		if (series && datum) onDatumActivate?.({
			datum,
			index: dataPointIndex,
			key: series.label
		});
	}, [primaryEntries, onDatumActivate]);
	const { tooltipRef, onChartFocus, onChartBlur, onChartKeyDown } = useKeyboardNavigation({
		selectedIndex,
		setSelectedIndex,
		isNavigating,
		setIsNavigating,
		chartRef,
		totalPoints,
		onActivate: activateSelectedBar
	});
	const comparisonEntries = (0, react.useMemo)(() => {
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
	const comparisonWidthFactor = (0, react.useMemo)(() => {
		if (comparisonEntries.length === 0) return void 0;
		return getElementStyles({
			data: comparisonEntries[0].series,
			index: comparisonEntries[0].index
		}).barStyles?.widthFactor ?? 1.5;
	}, [comparisonEntries, getElementStyles]);
	const groupPadding = (0, react.useMemo)(() => {
		const basePadding = chartOptions.barGroup.padding;
		if (!comparisonWidthFactor || comparisonWidthFactor <= 1) return basePadding;
		const p = 1 - .9 / comparisonWidthFactor;
		return Math.min(Math.max(p, basePadding), MAX_GROUP_PADDING);
	}, [chartOptions.barGroup.padding, comparisonWidthFactor]);
	const { xScale, yScale } = (0, react.useMemo)(() => {
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
	const getBarBackground = (0, react.useCallback)((index) => () => withPatterns ? `url(#${getPatternId(chartId, index)})` : getElementStyles({
		data: dataSorted[index],
		index
	}).color, [
		withPatterns,
		getElementStyles,
		dataSorted,
		chartId
	]);
	const resolveComparisonFill = (0, react.useCallback)((entry) => withPatterns ? `url(#${getPatternId(chartId, entry.primaryIndex)})` : getElementStyles({
		data: entry.series,
		index: entry.index
	}).color, [
		withPatterns,
		chartId,
		getElementStyles
	]);
	const renderDefaultTooltip = (0, react.useCallback)(({ tooltipData }) => {
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
	const renderPattern = (0, react.useCallback)((index, color) => {
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
	const createPatternBorderStyle = (0, react.useCallback)((index, color) => {
		const patternId = getPatternId(chartId, index);
		return `
			.visx-bar[fill="url(#${patternId})"],
			.bar-chart__comparison-bars rect[fill="url(#${patternId})"] {
				stroke: ${color};
				stroke-width: 1;
				}
			`;
	}, [chartId]);
	const createKeyboardHighlightStyle = (0, react.useCallback)(() => {
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
	const isDataValid = !error;
	const chartMetadata = (0, react.useMemo)(() => ({
		orientation,
		withPatterns
	}), [orientation, withPatterns]);
	useChartRegistration({
		chartId,
		legendItems,
		chartType: "bar",
		isDataValid,
		metadata: chartMetadata
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
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChartInstanceContext.Provider, {
		value: {
			chartId,
			isSeriesVisible,
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
							onPointerDown,
							onPointerUp,
							pointerEventsDataKey: "nearest",
							children: [
								!allSeriesHidden && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_visx_xychart.Grid, {
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
									children: getAllHiddenMessage(legendInteractive, "series")
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
								!allSeriesHidden && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_visx_xychart.Axis, { ...chartOptions.axis.x }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_visx_xychart.Axis, { ...chartOptions.axis.y })] }),
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
	if ((0, react.useContext)(GlobalChartsContext)) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(BarChartInternal, { ...props });
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
	const { getElementStyles } = useGlobalChartsContext();
	const tintedData = (0, react.useMemo)(() => {
		if (data.length > 1) return data;
		return data.map((series, index) => {
			if (series.options?.stroke) return series;
			const { color } = getElementStyles({
				data: series,
				index
			});
			if (!isValidHexColor(color)) return series;
			return {
				...series,
				options: {
					...series.options,
					stroke: lightenHexColor(color, .6)
				}
			};
		});
	}, [data, getElementStyles]);
	const chartOptions = (0, react.useMemo)(() => {
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
		data: tintedData,
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
	if ((0, react.useContext)(GlobalChartsContext)) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(BarListChartInternal, { ...props });
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
	const [clickedStep, setClickedStep] = (0, react.useState)(null);
	return {
		clickedStep,
		handleBarClick: (0, react.useCallback)((stepId) => {
			if (clickedStep === stepId) {
				setClickedStep(null);
				hideTooltip?.();
			} else setClickedStep(stepId);
		}, [clickedStep, hideTooltip]),
		handleBarKeyDown: (0, react.useCallback)((stepId, event) => {
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
		clearSelection: (0, react.useCallback)(() => {
			setClickedStep(null);
			hideTooltip?.();
		}, [hideTooltip]),
		getStepState: (0, react.useCallback)((stepId) => ({
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
	const chartRef = (0, react.useRef)(null);
	const selectedBarRef = (0, react.useRef)(null);
	const [scopeNode, setScopeNode] = (0, react.useState)(null);
	const { tooltipData, tooltipLeft, tooltipTop, tooltipOpen, showTooltip, hideTooltip } = (0, _visx_tooltip.useTooltip)();
	const { handleBarClick, handleBarKeyDown, clearSelection, getStepState } = useFunnelSelection(hideTooltip);
	const { containerRef: portalContainerRef, TooltipInPortal, containerBounds } = (0, _visx_tooltip.useTooltipInPortal)({
		detectBounds: true,
		scroll: true
	});
	const portalContainerRefRef = (0, react.useRef)(portalContainerRef);
	(0, react.useEffect)(() => {
		portalContainerRefRef.current = portalContainerRef;
	}, [portalContainerRef]);
	const setChartRef = (0, react.useCallback)((node) => {
		portalContainerRefRef.current(node);
		chartRef.current = node;
		setScopeNode(node);
	}, []);
	const clearSelectionAndRef = (0, react.useCallback)(() => {
		clearSelection();
		selectedBarRef.current = null;
		hideTooltip();
	}, [clearSelection, hideTooltip]);
	const showTooltipAt = (0, react.useCallback)((step, x, y) => {
		showTooltip({
			tooltipData: step,
			tooltipLeft: x,
			tooltipTop: y - 10
		});
	}, [showTooltip]);
	const getMouseTooltipCoords = (0, react.useCallback)((event) => {
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
	const getKeyboardTooltipCoords = (0, react.useCallback)((event) => {
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
	const handleStepInteraction = (0, react.useCallback)((step, event, interactionType) => {
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
	const stepHandlers = (0, react.useMemo)(() => {
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
	(0, react.useEffect)(() => {
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
	const renderDefaultTooltip = (step) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_wordpress_ui.Stack, {
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
	const chartMetadata = (0, react.useMemo)(() => ({
		mainRate,
		changeIndicator,
		stepsCount: steps?.length || 0
	}), [
		mainRate,
		changeIndicator,
		steps?.length
	]);
	useChartRegistration({
		chartId,
		legendItems: [],
		chartType: "conversion-funnel",
		isDataValid,
		metadata: chartMetadata
	});
	const prefersReducedMotion = usePrefersReducedMotion();
	if (!isDataValid) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_wordpress_ui.Stack, {
		direction: "column",
		align: "center",
		justify: "center",
		ref: setScopeNode,
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
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_wordpress_ui.Stack, {
		direction: "column",
		gap: "xl",
		ref: setChartRef,
		className: (0, clsx.default)(conversion_funnel_chart_module_default["conversion-funnel-chart"], loading && conversion_funnel_chart_module_default["conversion-funnel-chart--loading"], className),
		style: {
			...style,
			height: resolvedHeight
		},
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(ChartScopeContext.Provider, {
			value: scopeNode,
			children: [renderMainMetric ? renderMainMetric({
				mainRate,
				changeIndicator,
				className: conversion_funnel_chart_module_default["main-metric"],
				changeColor
			}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_wordpress_ui.Stack, {
				direction: "row",
				align: "baseline",
				gap: "sm",
				className: conversion_funnel_chart_module_default["main-metric"],
				children: renderDefaultMainMetric()
			}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_wordpress_ui.Stack, {
				direction: "row",
				align: "flex-end",
				gap: "lg",
				className: conversion_funnel_chart_module_default["funnel-container"],
				children: steps.map((step, index) => {
					const barHeight = step.rate / maxRate * 100;
					const { isBlurred } = getStepState(step.id);
					return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_wordpress_ui.Stack, {
						direction: "column",
						className: (0, clsx.default)(conversion_funnel_chart_module_default["funnel-step"], isColorPaletteResolved && conversion_funnel_chart_module_default["funnel-step--animated"], isBlurred && conversion_funnel_chart_module_default["funnel-step--blurred"]),
						gap: "xl",
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_wordpress_ui.Stack, {
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
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_wordpress_ui.Stack, {
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
		})
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
			className: (0, clsx.default)("a8c-charts-scope", conversion_funnel_chart_module_default["tooltip-wrapper"]),
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
	if ((0, react.useContext)(GlobalChartsContext)) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ConversionFunnelChartInternal, { ...props });
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
	const scopeElement = useChartScopeElement();
	const containerRef = (0, react.useRef)(null);
	const reportedErrorIdsRef = (0, react.useRef)(/* @__PURE__ */ new Set());
	(0, react.useEffect)(() => {
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
	const backgroundColorHex = normalizeColorToHex(backgroundColor, scopeElement, resolveCssVariable) || DEFAULT_BACKGROUND_COLOR;
	const defaultFillColorHex = normalizeColorToHex(featureFillColor, scopeElement, resolveCssVariable) || DEFAULT_FEATURE_FILL_COLOR;
	const sanitizedData = (0, react.useMemo)(() => {
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
	const options = (0, react.useMemo)(() => ({
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
	const chartEvents = (0, react.useMemo)(() => {
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
	if ((0, react.useContext)(GlobalChartsContext)) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(GeoChartInternal, { ...props });
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(GlobalChartsProvider, { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(GeoChartInternal, { ...props }) });
};
GeoChartWithProvider.displayName = "GeoChart";
const GeoChartResponsive = withResponsive(GeoChartWithProvider);
//#endregion
//#region src/types.ts
let GoogleDataTableColumnRoleType = /* @__PURE__ */ function(GoogleDataTableColumnRoleType) {
	GoogleDataTableColumnRoleType["annotation"] = "annotation";
	GoogleDataTableColumnRoleType["annotationText"] = "annotationText";
	GoogleDataTableColumnRoleType["certainty"] = "certainty";
	GoogleDataTableColumnRoleType["emphasis"] = "emphasis";
	GoogleDataTableColumnRoleType["interval"] = "interval";
	GoogleDataTableColumnRoleType["scope"] = "scope";
	GoogleDataTableColumnRoleType["style"] = "style";
	GoogleDataTableColumnRoleType["tooltip"] = "tooltip";
	GoogleDataTableColumnRoleType["domain"] = "domain";
	return GoogleDataTableColumnRoleType;
}({});
//#endregion
//#region src/charts/heatmap-chart/heatmap-chart.module.scss
var heatmap_chart_module_default = {
	"heatmap-chart": "a8ccharts-O3YMOW-heatmap-chart",
	"heatmap-chart__cell": "a8ccharts-O3YMOW-heatmap-chart__cell",
	"heatmap-chart__cell--filled": "a8ccharts-O3YMOW-heatmap-chart__cell--filled",
	"heatmap-chart__cell--hidden": "a8ccharts-O3YMOW-heatmap-chart__cell--hidden",
	"heatmap-chart__cell--placeholder": "a8ccharts-O3YMOW-heatmap-chart__cell--placeholder",
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
/**
* Resolve one grid bound: an unparseable or narrowing value falls back to the
* series' own bound, so the grid can only ever be widened.
*
* @param bound     - Requested bound as `yyyy-MM-dd`, if any.
* @param fallback  - The series' own bound on this side.
* @param direction - Which way the bound is allowed to move.
* @return The bound to draw to.
*/
const widenTo = (bound, fallback, direction) => {
	if (!bound) return fallback;
	const parsed = (0, date_fns.parseISO)(bound);
	if (isNaN(parsed.getTime())) return fallback;
	if (direction === "earlier") return parsed < fallback ? parsed : fallback;
	return parsed > fallback ? parsed : fallback;
};
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
	const minDayKey = (0, date_fns.format)(minDate, "yyyy-MM-dd");
	const maxDayKey = (0, date_fns.format)(maxDate, "yyyy-MM-dd");
	const gridMinDate = widenTo(options.gridSpan?.start, minDate, "earlier");
	const gridMaxDate = widenTo(options.gridSpan?.end, maxDate, "later");
	const gridMaxDayKey = (0, date_fns.format)(gridMaxDate, "yyyy-MM-dd");
	const gridStart = (0, date_fns.startOfWeek)(gridMinDate, { weekStartsOn });
	const gridMinDayKey = (0, date_fns.format)(gridMinDate < minDate ? gridStart : gridMinDate, "yyyy-MM-dd");
	const weekCount = (0, date_fns.differenceInCalendarWeeks)(gridMaxDate, gridStart, { weekStartsOn }) + 1;
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
			if (key < gridMinDayKey || key > gridMaxDayKey) {
				if (hideOutOfRangeDays) cell.hidden = true;
			} else if (key < minDayKey || key > maxDayKey) cell.placeholder = true;
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
const HeatmapContext = (0, react.createContext)(null);
//#endregion
//#region src/charts/heatmap-chart/private/heatmap-legend.tsx
const HeatmapLegend = ({ steps = 5, lessLabel, moreLabel }) => {
	const context = (0, react.useContext)(HeatmapContext);
	const { legend, backgroundColor } = useGlobalChartsTheme();
	if (!context) return null;
	const { primaryColorHex } = context;
	const labelStyle = legend.labelStyles;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_wordpress_ui.Stack, {
		direction: "row",
		gap: "xs",
		align: "center",
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_wordpress_ui.Text, {
				variant: "body-sm",
				style: labelStyle,
				children: lessLabel ?? (0, _wordpress_i18n.__)("Less", "jetpack-charts")
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_wordpress_ui.Stack, {
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
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_wordpress_ui.Text, {
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
	const { getElementStyles, theme } = useGlobalChartsContext();
	const scopeElement = useChartScopeElement();
	const { heatmapChart: heatmapChartSettings } = theme;
	const { nonLegendChildren } = useChartChildren(children, "HeatmapChart");
	const [selectedIndex, setSelectedIndex] = (0, react.useState)();
	const { tooltipOpen, tooltipLeft, tooltipTop, tooltipData, showTooltip, hideTooltip } = (0, _visx_tooltip.useTooltip)();
	const { containerRef, containerBounds, TooltipInPortal } = (0, _visx_tooltip.useTooltipInPortal)({
		detectBounds: true,
		scroll: true
	});
	const containerBoundsRef = (0, react.useRef)(containerBounds);
	containerBoundsRef.current = containerBounds;
	const { color: primaryColorHex } = getElementStyles({
		index: 0,
		overrideColor: primaryColor || heatmapChartSettings.primaryColor
	});
	const chartBackgroundHex = normalizeColorToHex(theme.backgroundColor, scopeElement, resolveCssVariable);
	const primaryHex = normalizeColorToHex(primaryColorHex);
	const cellHasLightText = (intensity) => isValidHexColor(primaryHex) && isValidHexColor(chartBackgroundHex) && prefersLightText(mixHexColors(primaryHex, chartBackgroundHex, 1 - (CELL_MIX_FLOOR + .85 * intensity)));
	const extent = (0, react.useMemo)(() => getValueExtent(data), [data]);
	const heatmapContext = (0, react.useMemo)(() => ({
		extent,
		primaryColorHex
	}), [extent, primaryColorHex]);
	const columns = data.length;
	const rows = Math.max(0, ...data.map((column) => column.data.length));
	const { compactCellGap, compactCellSize } = heatmapChartSettings;
	const drawValues = showValues ?? !compact;
	const buildTooltipData = (0, react.useCallback)((columnIndex, rowIndex) => {
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
	const onChartBlur = (0, react.useCallback)(() => {
		setSelectedIndex(void 0);
		hideTooltip();
	}, [hideTooltip]);
	const isCellInert = (0, react.useCallback)((col, row) => {
		const cell = data[col]?.data[row];
		return cell?.hidden === true || cell?.placeholder === true;
	}, [data]);
	const onChartKeyDown = (0, react.useCallback)((event) => {
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
			for (let index = 0; index < columns * rows; index++) if (!isCellInert(Math.floor(index / rows), index % rows)) {
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
		} while (col >= 0 && col < columns && row >= 0 && row < rows && isCellInert(col, row));
		if (col < 0 || col >= columns || row < 0 || row >= rows) return;
		setSelectedIndex(col * rows + row);
	}, [
		rows,
		columns,
		selectedIndex,
		hideTooltip,
		isCellInert
	]);
	const handleCellMouseMove = (0, react.useCallback)((event) => {
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
	const handleCellMouseLeave = (0, react.useCallback)(() => {
		if (withTooltips && selectedIndex === void 0) hideTooltip();
	}, [
		withTooltips,
		selectedIndex,
		hideTooltip
	]);
	(0, react.useEffect)(() => {
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
	const defaultRenderTooltip = (0, react.useCallback)((info) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("strong", { children: info.cellLabel || `${info.columnLabel ?? ""} ${info.rowLabel ?? ""}`.trim() }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", { children: info.value === null ? (0, _wordpress_i18n.__)("No data", "jetpack-charts") : (0, _automattic_number_formatters.formatNumber)(info.value) })] }), []);
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
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChartInstanceContext.Provider, {
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
								if (cell?.placeholder) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									"aria-hidden": "true",
									className: (0, clsx.default)(heatmap_chart_module_default["heatmap-chart__cell"], heatmap_chart_module_default["heatmap-chart__cell--placeholder"])
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
						className: "a8c-charts-scope",
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
	if ((0, react.useContext)(GlobalChartsContext)) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(HeatmapChartInternal, { ...props });
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
//#region ../../../node_modules/.pnpm/@wordpress+components@37.0.0_@types+react-dom@18.3.7_@types+react@18.3.31__@types+react_e283446b3cbc213906bb0d97b3dd78c5/node_modules/@wordpress/components/build-module/utils/hooks/use-update-effect.mjs
function useUpdateEffect(effect, deps) {
	const mountedRef = (0, react.useRef)(false);
	(0, react.useEffect)(() => {
		if (mountedRef.current) return effect();
		mountedRef.current = true;
	}, deps);
	(0, react.useEffect)(() => () => {
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
			if (_this.tags.length === 0) {
				if (_this.insertionPoint) before = _this.insertionPoint.nextSibling;
				else if (_this.prepend) before = _this.container.firstChild;
				else before = _this.before;
			} else before = _this.tags[_this.tags.length - 1].nextSibling;
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
		case 92: next();
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
		case "function": if (mergedProps !== void 0) {
			var previousCursor = cursor;
			var result = interpolation(mergedProps);
			cursor = previousCursor;
			return handleInterpolation(mergedProps, registered, result);
		}
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
//#region ../../../node_modules/.pnpm/@wordpress+components@37.0.0_@types+react-dom@18.3.7_@types+react@18.3.31__@types+react_e283446b3cbc213906bb0d97b3dd78c5/node_modules/@wordpress/components/build-module/utils/hooks/use-cx.mjs
var isSerializedStyles = (o) => typeof o !== "undefined" && o !== null && ["name", "styles"].every((p) => typeof o[p] !== "undefined");
var useCx = () => {
	const cache = __unsafe_useEmotionCache();
	return (0, react.useCallback)((...classNames) => {
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
//#region ../../../node_modules/.pnpm/@wordpress+components@37.0.0_@types+react-dom@18.3.7_@types+react@18.3.31__@types+react_e283446b3cbc213906bb0d97b3dd78c5/node_modules/@wordpress/components/build-module/utils/colors-values.mjs
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
//#region ../../../node_modules/.pnpm/@wordpress+components@37.0.0_@types+react-dom@18.3.7_@types+react@18.3.31__@types+react_e283446b3cbc213906bb0d97b3dd78c5/node_modules/@wordpress/components/build-module/utils/config-values.mjs
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
//#region ../../../node_modules/.pnpm/@wordpress+warning@3.53.0/node_modules/@wordpress/warning/build-module/utils.mjs
var logged = /* @__PURE__ */ new Set();
//#endregion
//#region ../../../node_modules/.pnpm/@wordpress+warning@3.53.0/node_modules/@wordpress/warning/build-module/index.mjs
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
//#region ../../../node_modules/.pnpm/@wordpress+components@37.0.0_@types+react-dom@18.3.7_@types+react@18.3.31__@types+react_e283446b3cbc213906bb0d97b3dd78c5/node_modules/@wordpress/components/build-module/context/context-system-provider.mjs
var import_es6 = /* @__PURE__ */ __toESM(require_es6(), 1);
var ComponentsContext = (0, react.createContext)(
	/** @type {Record<string, any>} */
	{}
);
ComponentsContext.displayName = "ComponentsContext";
var useComponentsContext = () => (0, react.useContext)(ComponentsContext);
function useContextSystemBridge({ value }) {
	const parentContext = useComponentsContext();
	const valueRef = (0, react.useRef)(value);
	use_update_effect_default(() => {
		if ((0, import_es6.default)(valueRef.current, value) && valueRef.current !== value) globalThis.SCRIPT_DEBUG === true && warning(`Please memoize your context: ${JSON.stringify(value)}`);
	}, [value]);
	return (0, react.useMemo)(() => {
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
(0, react.memo)(BaseContextSystemProvider);
//#endregion
//#region ../../../node_modules/.pnpm/@wordpress+components@37.0.0_@types+react-dom@18.3.7_@types+react@18.3.31__@types+react_e283446b3cbc213906bb0d97b3dd78c5/node_modules/@wordpress/components/build-module/context/constants.mjs
var COMPONENT_NAMESPACE = "data-wp-component";
var CONNECTED_NAMESPACE = "data-wp-c16t";
var CONNECT_STATIC_NAMESPACE = "__contextSystemKey__";
//#endregion
//#region ../../../node_modules/.pnpm/@wordpress+components@37.0.0_@types+react-dom@18.3.7_@types+react@18.3.31__@types+react_e283446b3cbc213906bb0d97b3dd78c5/node_modules/@wordpress/components/build-module/context/get-styled-class-name-from-key.mjs
var import_dist = require_dist();
function getStyledClassName(namespace) {
	return `components-${(0, import_dist.paramCase)(namespace)}`;
}
var getStyledClassNameFromKey = memize(getStyledClassName);
//#endregion
//#region ../../../node_modules/.pnpm/@wordpress+components@37.0.0_@types+react-dom@18.3.7_@types+react@18.3.31__@types+react_e283446b3cbc213906bb0d97b3dd78c5/node_modules/@wordpress/components/build-module/context/context-connect.mjs
function contextConnect(Component, namespace) {
	return _contextConnect(Component, namespace, { forwardsRef: true });
}
function _contextConnect(Component, namespace, options) {
	const WrappedComponent = options?.forwardsRef ? (0, react.forwardRef)(Component) : Component;
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
//#region ../../../node_modules/.pnpm/@wordpress+components@37.0.0_@types+react-dom@18.3.7_@types+react@18.3.31__@types+react_e283446b3cbc213906bb0d97b3dd78c5/node_modules/@wordpress/components/build-module/context/utils.mjs
function getNamespace(componentName) {
	return { [COMPONENT_NAMESPACE]: componentName };
}
function getConnectedNamespace() {
	return { [CONNECTED_NAMESPACE]: true };
}
//#endregion
//#region ../../../node_modules/.pnpm/@wordpress+components@37.0.0_@types+react-dom@18.3.7_@types+react@18.3.31__@types+react_e283446b3cbc213906bb0d97b3dd78c5/node_modules/@wordpress/components/build-module/context/use-context-system.mjs
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
//#region ../../../node_modules/.pnpm/@wordpress+components@37.0.0_@types+react-dom@18.3.7_@types+react@18.3.31__@types+react_e283446b3cbc213906bb0d97b3dd78c5/node_modules/@wordpress/components/build-module/visually-hidden/styles.mjs
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
//#region ../../../node_modules/.pnpm/@wordpress+components@37.0.0_@types+react-dom@18.3.7_@types+react@18.3.31__@types+react_e283446b3cbc213906bb0d97b3dd78c5/node_modules/@wordpress/components/build-module/utils/polymorphic-element.mjs
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
	const forwardedProps = typeof Element === "string" ? filterIntrinsicElementProps(props, Element) : props;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Element, {
		ref,
		...forwardedProps
	});
}
var PolymorphicElement = (0, react.forwardRef)(UnforwardedPolymorphicElement);
//#endregion
//#region ../../../node_modules/.pnpm/@wordpress+components@37.0.0_@types+react-dom@18.3.7_@types+react@18.3.31__@types+react_e283446b3cbc213906bb0d97b3dd78c5/node_modules/@wordpress/components/build-module/view/component.mjs
function UnforwardedView({ css, ...restProps }, ref) {
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(PolymorphicElement, {
		ref,
		...restProps
	});
}
var component_default$2 = Object.assign((0, react.forwardRef)(UnforwardedView), { selector: ".components-view" });
//#endregion
//#region ../../../node_modules/.pnpm/@wordpress+components@37.0.0_@types+react-dom@18.3.7_@types+react@18.3.31__@types+react_e283446b3cbc213906bb0d97b3dd78c5/node_modules/@wordpress/components/build-module/visually-hidden/component.mjs
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
//#region ../../../node_modules/.pnpm/@wordpress+components@37.0.0_@types+react-dom@18.3.7_@types+react@18.3.31__@types+react_e283446b3cbc213906bb0d97b3dd78c5/node_modules/@wordpress/components/build-module/utils/use-responsive-value.mjs
var breakpoints = [
	"40em",
	"52em",
	"64em"
];
var useBreakpointIndex = (options = {}) => {
	const { defaultIndex = 0 } = options;
	if (typeof defaultIndex !== "number") throw new TypeError(`Default breakpoint index should be a number. Got: ${defaultIndex}, ${typeof defaultIndex}`);
	else if (defaultIndex < 0 || defaultIndex > breakpoints.length - 1) throw new RangeError(`Default breakpoint index out of range. Theme has ${breakpoints.length} breakpoints, got index ${defaultIndex}`);
	const [value, setValue] = (0, react.useState)(defaultIndex);
	(0, react.useEffect)(() => {
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
//#region ../../../node_modules/.pnpm/@wordpress+components@37.0.0_@types+react-dom@18.3.7_@types+react@18.3.31__@types+react_e283446b3cbc213906bb0d97b3dd78c5/node_modules/@wordpress/components/build-module/grid/utils.mjs
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
//#region ../../../node_modules/.pnpm/@wordpress+components@37.0.0_@types+react-dom@18.3.7_@types+react@18.3.31__@types+react_e283446b3cbc213906bb0d97b3dd78c5/node_modules/@wordpress/components/build-module/grid/hook.mjs
function useGrid(props) {
	const { align, alignment, className, columnGap, columns = 2, gap = 3, isInline = false, justify, rowGap, rows, templateColumns, templateRows, ...otherProps } = useContextSystem(props, "Grid");
	const column = useResponsiveValue(Array.isArray(columns) ? columns : [columns]);
	const row = useResponsiveValue(Array.isArray(rows) ? rows : [rows]);
	const gridTemplateColumns = templateColumns || !!columns && `repeat( ${column}, 1fr )`;
	const gridTemplateRows = templateRows || !!rows && `repeat( ${row}, 1fr )`;
	const cx = useCx();
	const classes = (0, react.useMemo)(() => {
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
//#region ../../../node_modules/.pnpm/@wordpress+components@37.0.0_@types+react-dom@18.3.7_@types+react@18.3.31__@types+react_e283446b3cbc213906bb0d97b3dd78c5/node_modules/@wordpress/components/build-module/grid/component.mjs
function UnconnectedGrid(props, forwardedRef) {
	const gridProps = useGrid(props);
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(component_default$2, {
		...gridProps,
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
	const contentRef = (0, react.useRef)(null);
	const [fittedCount, setFittedCount] = (0, react.useState)(rowCount);
	const [isMeasurable, setIsMeasurable] = (0, react.useState)(true);
	const measure = (0, react.useCallback)(() => {
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
	(0, react.useLayoutEffect)(() => {
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
	(0, react.useLayoutEffect)(() => {
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
	return (0, react.useMemo)(() => {
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
const hasPreviousValue = (entry) => entry.previousValue != null && entry.previousShare != null;
const hasDeltaValue = (entry) => hasPreviousValue(entry) && entry.delta != null;
const BarLabel = ({ label }) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(react_jsx_runtime.Fragment, { children: typeof label === "string" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_wordpress_ui.Text, {
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
			showComparisonBar && hasPreviousValue(entry) && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
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
	const isPrimaryVisible = (0, react.useMemo)(() => {
		if (legendItems.length === 0) return true;
		return isSeriesVisible(chartId, legendItems[0].label);
	}, [
		chartId,
		legendItems,
		isSeriesVisible
	]);
	const isComparisonVisible = (0, react.useMemo)(() => {
		if (legendItems.length < 2) return true;
		return isSeriesVisible(chartId, legendItems[1].label);
	}, [
		chartId,
		legendItems,
		isSeriesVisible
	]);
	const allSeriesHidden = (0, react.useMemo)(() => {
		if (withComparison && !withOverlayLabel) return !isPrimaryVisible && !isComparisonVisible;
		return !isPrimaryVisible;
	}, [
		isPrimaryVisible,
		isComparisonVisible,
		withComparison,
		withOverlayLabel
	]);
	const isDataValid = Boolean(data && data.length > 0);
	const chartMetadata = (0, react.useMemo)(() => ({
		withComparison,
		withOverlayLabel
	}), [withComparison, withOverlayLabel]);
	useChartRegistration({
		chartId,
		legendItems,
		chartType: "leaderboard",
		isDataValid,
		metadata: chartMetadata
	});
	const prefersReducedMotion = usePrefersReducedMotion();
	const { contentRef, fittedCount, isMeasurable } = useFittedRowCount(fitRows && !allSeriesHidden, data?.length ?? 0, data);
	const shouldFitRows = fitRows && isMeasurable;
	if (!data || data.length === 0) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChartInstanceContext.Provider, {
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
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChartInstanceContext.Provider, {
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
					children: getAllHiddenMessage(legendInteractive, "series")
				}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)(component_default, {
					templateColumns: "minmax(0, 1fr) auto",
					rowGap,
					columnGap,
					"data-leaderboard-grid": true,
					children: data.map((entry, rowIndex) => {
						const rowStyle = shouldFitRows && rowIndex >= fittedCount ? { visibility: "hidden" } : void 0;
						const showComparisonColumn = withComparison && isComparisonVisible;
						const hasPreviousPeriodValue = hasPreviousValue(entry);
						const hasDelta = hasDeltaValue(entry);
						const showComparisonValue = showComparisonColumn && hasDelta;
						const showComparisonPlaceholder = showComparisonColumn && !hasDelta;
						const colorIndex = showComparisonValue ? Math.sign(entry.delta) + 1 : 1;
						const deltaColor = deltaColors[colorIndex];
						const rowCells = /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(_wordpress_ui.Stack, {
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
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_wordpress_ui.Stack, {
							direction: "row",
							gap: "xs",
							className: (0, clsx.default)(leaderboard_chart_module_default.valueContainer, { [leaderboard_chart_module_default.overlayLabel]: withOverlayLabel }),
							children: [
								isPrimaryVisible && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_wordpress_ui.Text, { children: valueFormatter(entry.currentValue) }),
								showComparisonValue && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_wordpress_ui.Text, {
									className: leaderboard_chart_module_default.deltaValue,
									style: { color: deltaColor },
									children: deltaFormatter(entry.delta)
								}),
								showComparisonPlaceholder && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(_wordpress_ui.Text, {
									className: (0, clsx.default)(leaderboard_chart_module_default.deltaValue, leaderboard_chart_module_default.deltaPlaceholder),
									style: { color: deltaColor },
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										"aria-hidden": "true",
										children: "—"
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(component_default$1, {
										as: "span",
										children: hasPreviousPeriodValue ? (0, _wordpress_i18n.__)("Percentage change unavailable", "jetpack-charts") : (0, _wordpress_i18n.__)("No comparison data", "jetpack-charts")
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
	if ((0, react.useContext)(GlobalChartsContext)) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(LeaderboardChartInternal, { ...props });
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
	const onMouseLeave = (0, react.useCallback)(() => {
		if (!withTooltips) return;
		hideTooltip();
	}, [withTooltips, hideTooltip]);
	const { getElementStyles, isSeriesVisible } = useGlobalChartsContext();
	const dataWithPercentages = useDataWithPercentages(data);
	const { visibleData, allSegmentsHidden, legendData } = useLegendVisibilityData({
		data: dataWithPercentages,
		chartId,
		isSeriesVisible
	});
	const legendItems = useChartLegendItems(legendData, (0, react.useMemo)(() => ({
		showValues: true,
		legendValueDisplay
	}), [legendValueDisplay]));
	const { isValid, message } = validateData$1(data);
	const { svgChildren, htmlChildren, legendChildren, otherChildren } = useChartChildren(children, "PieChart");
	const chartMetadata = (0, react.useMemo)(() => ({
		thickness,
		gapScale,
		cornerScale
	}), [
		thickness,
		gapScale,
		cornerScale
	]);
	useChartRegistration({
		chartId,
		legendItems,
		chartType: "pie",
		isDataValid: isValid,
		metadata: chartMetadata
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
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChartInstanceContext.Provider, {
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
						className: "a8c-charts-scope",
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
								children: getAllHiddenMessage(legendInteractive, "segments")
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
										const backgroundWidth = (0, _visx_text.getStringWidth)(arc.data.label, {
											fontSize,
											fontFamily: svgLabelSmall?.fontFamily,
											fontWeight: svgLabelSmall?.fontWeight
										}) + 12;
										const backgroundHeight = fontSize + 12;
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
	if ((0, react.useContext)(GlobalChartsContext)) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(PieChartInternal, { ...props });
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
	const handleMouseMove = (0, react.useCallback)((event, arc) => {
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
	const handleMouseLeave = (0, react.useCallback)(() => {
		hideTooltip();
	}, [hideTooltip]);
	const handleArcMouseMove = (0, react.useCallback)((arc) => (event) => {
		handleMouseMove(event, arc);
	}, [handleMouseMove]);
	const { isValid, message } = validateData(data);
	const { getElementStyles, isSeriesVisible } = useGlobalChartsContext();
	const dataWithPercentages = useDataWithPercentages(data);
	const { visibleData, allSegmentsHidden, legendData } = useLegendVisibilityData({
		data: dataWithPercentages,
		chartId,
		isSeriesVisible
	});
	const accessors = (0, react.useMemo)(() => ({
		value: (d) => d.value,
		sort: (a, b) => b.value - a.value,
		fill: (d) => getElementStyles({
			data: d,
			index: d.index
		}).color
	}), [getElementStyles]);
	const legendItems = useChartLegendItems(legendData, (0, react.useMemo)(() => ({
		showValues: true,
		legendValueDisplay
	}), [legendValueDisplay]));
	const { svgChildren, htmlChildren, legendChildren, otherChildren } = useChartChildren(children, "PieSemiCircleChart");
	const chartMetadata = (0, react.useMemo)(() => ({
		thickness,
		clockwise
	}), [thickness, clockwise]);
	useChartRegistration({
		chartId,
		legendItems,
		chartType: "pie-semi-circle",
		isDataValid: isValid,
		metadata: chartMetadata
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
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChartInstanceContext.Provider, {
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
						className: "a8c-charts-scope",
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
								children: getAllHiddenMessage(legendInteractive, "segments")
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
	if ((0, react.useContext)(GlobalChartsContext)) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(PieSemiCircleChartInternal, { ...props });
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
const SparklineComponent = (0, react.forwardRef)(({ data, width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT, color, strokeWidth: strokeWidthProp, withGradientFill = true, gradient, className, chartId, margin: marginProp, animation }, ref) => {
	const theme = useGlobalChartsTheme();
	const chartsContext = (0, react.useContext)(GlobalChartsContext);
	const themeStrokeWidth = theme.sparkline?.strokeWidth ?? 1.5;
	const strokeWidth = strokeWidthProp ?? themeStrokeWidth;
	const seriesData = (0, react.useMemo)(() => {
		if (!data || data.length === 0) return [];
		return transformToSeriesData(data, color, strokeWidth);
	}, [
		data,
		color,
		strokeWidth
	]);
	const finalMargin = (0, react.useMemo)(() => {
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
	const seriesWithGradient = (0, react.useMemo)(() => {
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
		const resolvedColor = color || chartsContext?.getElementStyles({ index: 0 }).color || "#000000";
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
	const standaloneScopeClass = useStandaloneScopeClass();
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
		className: (0, clsx.default)(standaloneScopeClass, trend_indicator_module_default["trend-indicator"], trend_indicator_module_default[`trend-indicator--${direction}`], className),
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
exports.GoogleDataTableColumnRoleType = GoogleDataTableColumnRoleType;
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
exports.resolveCssVariable = resolveCssVariable;
exports.useChartLegendItems = useChartLegendItems;
exports.useChartRegistration = useChartRegistration;
exports.useChartScopeElement = useChartScopeElement;
exports.useGlobalChartsContext = useGlobalChartsContext;
exports.useGlobalChartsTheme = useGlobalChartsTheme;
exports.useLeaderboardLegendItems = useLeaderboardLegendItems;
exports.validateHexColor = validateHexColor;

//# sourceMappingURL=index.cjs.map