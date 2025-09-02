import { jsx, jsxs, Fragment as Fragment$1 } from 'react/jsx-runtime';
import { __experimentalGrid, __experimentalVStack, __experimentalText } from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import clsx from 'clsx';
import 'react';
import '../../providers/chart-context/global-charts-provider.js';
import 'fast-deep-equal';
import '@visx/event';
import '@visx/tooltip';
import '@visx/xychart';
import 'date-fns';
import { formatMetricValue } from '../../utils/format-metric-value.js';
import '@automattic/number-formatters';
import '@visx/text';
import 'deepmerge';
import '@visx/scale';
import { useGlobalChartsTheme } from '../../providers/chart-context/hooks/use-global-charts-theme.js';
import styles from './leaderboard-chart.module.scss.js';

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
const BarLabel = ({ label }) => (jsx(Fragment$1, { children: typeof label === 'string' ? jsx(__experimentalText, { className: styles.label, children: label }) : label }));
const BarWithLabel = ({ entry, withComparison, withOverlayLabel, }) => (jsxs("div", { className: clsx(styles.barWithLabelContainer, {
        [styles['is-overlay']]: withOverlayLabel,
    }), children: [jsx(BarLabel, { label: entry.label }), jsx("div", { className: clsx(styles.bar, styles.primaryBar), style: { width: entry.currentShare + '%' } }), withComparison && !withOverlayLabel && (jsx("div", { className: clsx(styles.bar, styles.secondaryBar), style: { width: entry.previousShare + '%' } }))] }));
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
    const theme = useGlobalChartsTheme();
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
        return (jsx("div", { className: clsx(styles.leaderboardChart, loading && styles.loading, className), style: chartStyle, children: jsx("div", { className: styles.emptyState, children: loading ? 'Loading...' : 'No data available' }) }));
    }
    return (jsx(__experimentalGrid, { className: clsx(styles.leaderboardChart, loading && styles.loading, className), templateColumns: "minmax(0, 1fr) auto", rowGap: rowGap, columnGap: columnGap, style: chartStyle, children: data.map(entry => {
            const colorIndex = Math.sign(entry.delta) + 1;
            const deltaColor = signColors[colorIndex];
            return (jsxs(Fragment, { children: [jsx(__experimentalVStack, { spacing: labelSpacing, children: jsx(BarWithLabel, { entry: entry, withComparison: withComparison, withOverlayLabel: withOverlayLabel }) }), jsxs("div", { className: clsx(styles.valueContainer, {
                            [styles.overlayLabel]: withOverlayLabel,
                        }), children: [jsx(__experimentalText, { children: valueFormatter(entry.currentValue) }), withComparison && (jsx(__experimentalText, { style: { color: deltaColor }, children: deltaFormatter(entry.delta) }))] })] }, entry.id));
        }) }));
};

export { LeaderboardChart, LeaderboardChart as default };
