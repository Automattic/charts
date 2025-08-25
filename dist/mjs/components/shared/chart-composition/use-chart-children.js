import { Group } from '@visx/group';
import { useMemo, Children, isValidElement } from 'react';

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
    return useMemo(() => {
        const svg = [];
        const html = [];
        const other = [];
        Children.forEach(children, child => {
            if (isValidElement(child)) {
                // Check displayName for compound components
                const childType = child.type;
                const displayName = childType?.displayName;
                // Handle chart-specific compound components (e.g., PieChart.SVG)
                if (displayName === `${chartType}.SVG` || displayName === 'Chart.SVG') {
                    // Extract children from Chart.SVG with safety checks
                    if (child.props?.children) {
                        Children.forEach(child.props.children, svgChild => {
                            svg.push(svgChild);
                        });
                    }
                }
                else if (displayName === `${chartType}.HTML` || displayName === 'Chart.HTML') {
                    // Extract children from Chart.HTML with safety checks
                    if (child.props?.children) {
                        Children.forEach(child.props.children, htmlChild => {
                            html.push(htmlChild);
                        });
                    }
                }
                else if (child.type === Group) {
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

export { useChartChildren };
