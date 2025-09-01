'use strict';

var group = require('@visx/group');
var react = require('react');

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
    return react.useMemo(() => {
        const svg = [];
        const html = [];
        const other = [];
        react.Children.forEach(children, child => {
            if (react.isValidElement(child)) {
                // Check displayName for compound components
                const childType = child.type;
                const displayName = childType?.displayName;
                // Handle chart-specific compound components (e.g., PieChart.SVG)
                if (displayName === `${chartType}.SVG` || displayName === 'Chart.SVG') {
                    // Extract children from Chart.SVG with safety checks
                    if (child.props?.children) {
                        react.Children.forEach(child.props.children, svgChild => {
                            svg.push(svgChild);
                        });
                    }
                }
                else if (displayName === `${chartType}.HTML` || displayName === 'Chart.HTML') {
                    // Extract children from Chart.HTML with safety checks
                    if (child.props?.children) {
                        react.Children.forEach(child.props.children, htmlChild => {
                            html.push(htmlChild);
                        });
                    }
                }
                else if (child.type === group.Group) {
                    // Legacy support: still check for Group type for backward compatibility
                    svg.push(child);
                }
                else {
                    other.push(child);
                }
            }
        });
        return { svgChildren: svg, htmlChildren: html, otherChildren: other };
    }, [children, chartType]);
}

exports.useChartChildren = useChartChildren;
