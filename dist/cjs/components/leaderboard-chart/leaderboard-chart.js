'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var components = require('@wordpress/components');
var element = require('@wordpress/element');
var clsx = require('clsx');
require('react');
require('fast-deep-equal');
var useGlobalChartTheme = require('../../hooks/use-global-chart-theme.js');
require('@visx/event');
require('@visx/tooltip');
require('@visx/xychart');
var formatMetricValue = require('../shared/format-metric-value.js');
var leaderboardChart_module = require('./leaderboard-chart.module.scss.js');

/**
 * Default settings for LeaderboardChart component
 */
const DEFAULT_LEADERBOARD_SETTINGS = {
    labelSpacing: 1.5,
    rowGap: 12,
    columnGap: 4,
    primaryColor: '#3858E9',
    secondaryColor: '#66BDFF',
    deltaColors: ['#D63638', '#757575', '#008A20'],
};
/**
 * Default value formatter using formatMetricValue
 *
 * @param value - The numeric value to format
 * @return Formatted string representation of the value
 */
const defaultValueFormatter = (value) => {
    return formatMetricValue.formatMetricValue(value, 'number', {
        useMultipliers: true,
        decimals: 1,
    });
};
/**
 * Default delta formatter using formatMetricValue
 *
 * @param value - The delta value to format
 * @return Formatted percentage string
 */
const defaultDeltaFormatter = (value) => {
    return formatMetricValue.formatMetricValue(value / 100, 'average', {
        decimals: 0,
        signDisplay: 'exceptZero',
    });
};
const BarLabel = ({ label }) => (jsxRuntime.jsx(jsxRuntime.Fragment, { children: typeof label === 'string' ? jsxRuntime.jsx(components.__experimentalText, { className: leaderboardChart_module.default.label, children: label }) : label }));
const BarWithLabel = ({ entry, withComparison, withOverlayLabel, }) => (jsxRuntime.jsxs("div", { className: clsx(leaderboardChart_module.default.barWithLabelContainer, {
        [leaderboardChart_module.default['is-overlay']]: withOverlayLabel,
    }), children: [jsxRuntime.jsx(BarLabel, { label: entry.label }), jsxRuntime.jsx("div", { className: clsx(leaderboardChart_module.default.bar, leaderboardChart_module.default.primaryBar), style: { width: entry.currentShare + '%' } }), withComparison && !withOverlayLabel && (jsxRuntime.jsx("div", { className: clsx(leaderboardChart_module.default.bar, leaderboardChart_module.default.secondaryBar), style: { width: entry.previousShare + '%' } }))] }));
/**
 * LeaderboardChart component displays a ranked list of data with progress bars
 * and optional comparison values.
 *
 * @param props                  - Component props
 * @param props.data             - Array of leaderboard entries to display
 * @param props.withComparison   - Whether to show comparison data
 * @param props.withOverlayLabel - Whether to overlay the label on top of the bar
 * @param props.primaryColor     - Primary color for current period bars
 * @param props.secondaryColor   - Secondary color for comparison period bars
 * @param props.valueFormatter   - Custom formatter for values
 * @param props.deltaFormatter   - Custom formatter for delta values
 * @param props.loading          - Whether the chart is in loading state
 * @param props.className        - Additional CSS class name
 * @param props.style            - Custom styling for the chart container
 * @return JSX element representing the leaderboard chart
 */
const LeaderboardChart = ({ data, withComparison = false, withOverlayLabel = false, primaryColor, secondaryColor, valueFormatter = defaultValueFormatter, deltaFormatter = defaultDeltaFormatter, loading = false, className, style, }) => {
    const theme = useGlobalChartTheme.useGlobalChartTheme();
    // Get component settings from theme with fallbacks
    const leaderboardSettings = theme.leaderboardChart;
    const labelSpacing = leaderboardSettings?.labelSpacing ?? DEFAULT_LEADERBOARD_SETTINGS.labelSpacing;
    const rowGap = leaderboardSettings?.rowGap ?? DEFAULT_LEADERBOARD_SETTINGS.rowGap;
    const columnGap = leaderboardSettings?.columnGap ?? DEFAULT_LEADERBOARD_SETTINGS.columnGap;
    // Use theme colors with prop overrides, fallback to defaults
    const finalPrimaryColor = primaryColor || leaderboardSettings?.primaryColor || DEFAULT_LEADERBOARD_SETTINGS.primaryColor;
    const finalSecondaryColor = secondaryColor ||
        leaderboardSettings?.secondaryColor ||
        DEFAULT_LEADERBOARD_SETTINGS.secondaryColor;
    // Delta sign colors: negative, neutral, positive
    const signColors = leaderboardSettings?.deltaColors ?? DEFAULT_LEADERBOARD_SETTINGS.deltaColors;
    const chartStyle = {
        '--primary-color': finalPrimaryColor,
        '--secondary-color': finalSecondaryColor,
        ...style,
    };
    // Handle empty or undefined data
    if (!data || data.length === 0) {
        return (jsxRuntime.jsx("div", { className: clsx(leaderboardChart_module.default.leaderboardChart, loading && leaderboardChart_module.default.loading, className), style: chartStyle, children: jsxRuntime.jsx("div", { className: leaderboardChart_module.default.emptyState, children: loading ? 'Loading...' : 'No data available' }) }));
    }
    return (jsxRuntime.jsx(components.__experimentalGrid, { className: clsx(leaderboardChart_module.default.leaderboardChart, loading && leaderboardChart_module.default.loading, className), templateColumns: "minmax(0, 1fr) auto", rowGap: rowGap, columnGap: columnGap, style: chartStyle, children: data.map(entry => {
            const colorIndex = Math.sign(entry.delta) + 1;
            const deltaColor = signColors[colorIndex];
            return (jsxRuntime.jsxs(element.Fragment, { children: [jsxRuntime.jsx(components.__experimentalVStack, { spacing: labelSpacing, children: jsxRuntime.jsx(BarWithLabel, { entry: entry, withComparison: withComparison, withOverlayLabel: withOverlayLabel }) }), jsxRuntime.jsxs("div", { className: clsx(leaderboardChart_module.default.valueContainer, {
                            [leaderboardChart_module.default.overlayLabel]: withOverlayLabel,
                        }), children: [jsxRuntime.jsx(components.__experimentalText, { children: valueFormatter(entry.currentValue) }), withComparison && (jsxRuntime.jsx(components.__experimentalText, { style: { color: deltaColor }, children: deltaFormatter(entry.delta) }))] })] }, entry.id));
        }) }));
};

exports.LeaderboardChart = LeaderboardChart;
exports.default = LeaderboardChart;
