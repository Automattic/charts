import LineChartAnnotation from './line-chart-annotation.js';
import LineChartAnnotationsOverlay from './line-chart-annotations-overlay.js';
import { LineChartRef } from './line-chart-context.js';
import { Optional, BaseChartProps, SeriesData, DataPointDate } from '../../types.js';
import { ResponsiveConfig } from '../shared/with-responsive.js';
import { GlyphProps } from '@visx/xychart';
import { RenderTooltipParams } from '@visx/xychart/lib/components/Tooltip';
import { ReactNode, SVGProps } from 'react';

type CurveType = 'smooth' | 'linear' | 'monotone';
interface LineChartProps extends BaseChartProps<SeriesData[]> {
    withGradientFill: boolean;
    smoothing?: boolean;
    curveType?: CurveType;
    renderTooltip?: (params: RenderTooltipParams<DataPointDate>) => ReactNode;
    withStartGlyphs?: boolean;
    renderGlyph?: <Datum extends object>(props: GlyphProps<Datum>) => ReactNode;
    glyphStyle?: SVGProps<SVGCircleElement>;
    withLegendGlyph: boolean;
    withTooltipCrosshairs?: {
        showVertical?: boolean;
        showHorizontal?: boolean;
    };
    children?: ReactNode;
}
type LineChartAnnotationComponents = {
    AnnotationsOverlay: typeof LineChartAnnotationsOverlay;
    Annotation: typeof LineChartAnnotation;
};
type LineChartBaseProps = Optional<LineChartProps, 'width' | 'height' | 'size'>;
type LineChartResponsiveComponent = React.ForwardRefExoticComponent<LineChartBaseProps & ResponsiveConfig & React.RefAttributes<LineChartRef>> & LineChartAnnotationComponents;
declare const ResponsiveLineChart: LineChartResponsiveComponent;

export { ResponsiveLineChart as default };
