import { Legend } from '../legend/legend.js';
import { SVGProps, ReactNode } from 'react';
import { GlyphProps } from '@visx/xychart';
import { Optional, BaseChartProps, SeriesData, DataPointDate } from '../../types.js';
import { SingleChartRef } from '../shared/single-chart-context.js';
import LineChartAnnotation from './line-chart-annotation.js';
import LineChartAnnotationsOverlay from './line-chart-annotations-overlay.js';
import { ResponsiveConfig } from '../shared/with-responsive.js';
import { RenderTooltipParams } from '@visx/xychart/lib/components/Tooltip';

type CurveType = 'smooth' | 'linear' | 'monotone';
type RenderLineStartGlyphProps<Datum extends object> = GlyphProps<Datum> & {
    glyphStyle?: SVGProps<SVGCircleElement>;
};
interface LineChartProps extends BaseChartProps<SeriesData[]> {
    withGradientFill: boolean;
    smoothing?: boolean;
    curveType?: CurveType;
    renderTooltip?: (params: RenderTooltipParams<DataPointDate>) => ReactNode;
    withStartGlyphs?: boolean;
    renderGlyph?: <Datum extends object>(props: GlyphProps<Datum>) => ReactNode;
    glyphStyle?: SVGProps<SVGCircleElement>;
    withLegendGlyph?: boolean;
    withTooltipCrosshairs?: {
        showVertical?: boolean;
        showHorizontal?: boolean;
    };
    children?: ReactNode;
}
type LineChartAnnotationComponents = {
    AnnotationsOverlay: typeof LineChartAnnotationsOverlay;
    Annotation: typeof LineChartAnnotation;
    Legend: typeof Legend;
};
type LineChartBaseProps = Optional<LineChartProps, 'width' | 'height' | 'size'>;
type LineChartResponsiveComponent = React.ForwardRefExoticComponent<LineChartBaseProps & ResponsiveConfig & React.RefAttributes<SingleChartRef>> & LineChartAnnotationComponents;
declare const LineChartResponsive: LineChartResponsiveComponent;

export { type RenderLineStartGlyphProps, LineChartResponsive as default };
