import { jsx, jsxs } from 'react/jsx-runtime';
import { ProgressBar } from '@wordpress/components';
import clsx from 'clsx';
import 'react';
import { formatMetricValue } from '../shared/format-metric-value.js';
import styles from './leaderboard-chart.module.scss.js';

/**
 * Default value formatter using formatMetricValue
 *
 * @param value - The numeric value to format
 * @return Formatted string representation of the value
 */
const defaultValueFormatter = (value) => {
    return formatMetricValue(value, 'number', {
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
    return formatMetricValue(value / 100, 'average', {
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
        return (jsx("div", { className: clsx(styles.leaderboardChart, loading && styles.loading, className), style: chartStyle, children: jsx("div", { className: styles.emptyState, children: loading ? 'Loading...' : 'No data available' }) }));
    }
    return (jsx("div", { className: clsx(styles.leaderboardChart, loading && styles.loading, className), style: chartStyle, children: data.map(entry => {
            const colorIndex = Math.sign(entry.delta) + 1;
            const deltaColor = signColors[colorIndex];
            return (jsxs("div", { className: styles.entryContainer, children: [jsxs("div", { className: styles.labelContainer, children: [jsx("span", { className: styles.entryLabel, children: entry.label }), jsxs("div", { className: styles.progressContainer, children: [jsx(ProgressBar, { value: entry.currentShare, className: clsx(styles.progressBar, styles.primaryBar) }), withComparison && (jsx(ProgressBar, { value: entry.previousShare, className: clsx(styles.progressBar, styles.secondaryBar) }))] })] }), jsxs("div", { className: styles.valueContainer, children: [jsx("span", { className: styles.currentValue, children: valueFormatter(entry.currentValue) }), withComparison && (jsx("span", { className: styles.deltaValue, style: { color: deltaColor }, children: deltaFormatter(entry.delta) }))] })] }, entry.id));
        }) }));
};

export { LeaderboardChart, LeaderboardChart as default };
