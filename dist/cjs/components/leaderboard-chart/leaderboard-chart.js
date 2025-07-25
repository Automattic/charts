'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var components = require('@wordpress/components');
var clsx = require('clsx');
require('react');
var formatMetricValue = require('../shared/format-metric-value.js');
var leaderboardChart_module = require('./leaderboard-chart.module.scss.js');

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
/**
 * LeaderboardChart component displays a ranked list of data with progress bars
 * and optional comparison values.
 *
 * @param props                - Component props
 * @param props.data           - Array of leaderboard entries to display
 * @param props.withComparison - Whether to show comparison data
 * @param props.primaryColor   - Primary color for current period bars
 * @param props.secondaryColor - Secondary color for comparison period bars
 * @param props.valueFormatter - Custom formatter for values
 * @param props.deltaFormatter - Custom formatter for delta values
 * @param props.loading        - Whether the chart is in loading state
 * @param props.className      - Additional CSS class name
 * @param props.style          - Custom styling for the chart container
 * @return JSX element representing the leaderboard chart
 */
const LeaderboardChart = ({ data, withComparison = false, primaryColor = '#3858E9', secondaryColor = '#66BDFF', valueFormatter = defaultValueFormatter, deltaFormatter = defaultDeltaFormatter, loading = false, className, style, }) => {
    // TODO: Integrate with ThemeProvider:
    // 1. Use theme.colors for primaryColor/secondaryColor defaults
    // 2. Get delta sign colors from theme instead of hardcoding
    // 3. Add useChartTheme() hook like other chart components
    const signColors = ['#D63638', '#757575', '#008A20'];
    const chartStyle = {
        '--primary-color': primaryColor,
        '--secondary-color': secondaryColor,
        ...style,
    };
    // Handle empty or undefined data
    if (!data || data.length === 0) {
        return (jsxRuntime.jsx("div", { className: clsx(leaderboardChart_module.default.leaderboardChart, loading && leaderboardChart_module.default.loading, className), style: chartStyle, children: jsxRuntime.jsx("div", { className: leaderboardChart_module.default.emptyState, children: loading ? 'Loading...' : 'No data available' }) }));
    }
    return (jsxRuntime.jsx("div", { className: clsx(leaderboardChart_module.default.leaderboardChart, loading && leaderboardChart_module.default.loading, className), style: chartStyle, children: data.map(entry => {
            const colorIndex = Math.sign(entry.delta) + 1;
            const deltaColor = signColors[colorIndex];
            return (jsxRuntime.jsxs("div", { className: leaderboardChart_module.default.entryContainer, children: [jsxRuntime.jsxs("div", { className: leaderboardChart_module.default.labelContainer, children: [jsxRuntime.jsx("span", { className: leaderboardChart_module.default.entryLabel, children: entry.label }), jsxRuntime.jsxs("div", { className: leaderboardChart_module.default.progressContainer, children: [jsxRuntime.jsx(components.ProgressBar, { value: entry.currentShare, className: clsx(leaderboardChart_module.default.progressBar, leaderboardChart_module.default.primaryBar) }), withComparison && (jsxRuntime.jsx(components.ProgressBar, { value: entry.previousShare, className: clsx(leaderboardChart_module.default.progressBar, leaderboardChart_module.default.secondaryBar) }))] })] }), jsxRuntime.jsxs("div", { className: leaderboardChart_module.default.valueContainer, children: [jsxRuntime.jsx("span", { className: leaderboardChart_module.default.currentValue, children: valueFormatter(entry.currentValue) }), withComparison && (jsxRuntime.jsx("span", { className: leaderboardChart_module.default.deltaValue, style: { color: deltaColor }, children: deltaFormatter(entry.delta) }))] })] }, entry.id));
        }) }));
};

exports.LeaderboardChart = LeaderboardChart;
exports.default = LeaderboardChart;
