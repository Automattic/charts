import { jsx, Fragment } from 'react/jsx-runtime';

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
    // This component doesn't render directly - its children are extracted by the parent chart
    // We just return the children as-is
    return jsx(Fragment, { children: children });
};
// Set displayName for better debugging and type checking
ChartSVG.displayName = 'Chart.SVG';

export { ChartSVG };
