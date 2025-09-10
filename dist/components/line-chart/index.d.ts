import { L as Legend } from '../../legend-iXnk1-uq.js';
import { B as BaseChartProps, c as SeriesData, b as DataPointDate, A as AnnotationStyles, O as Optional } from '../../types-pVkkGIaQ.js';
import { FC, ReactNode, SVGProps } from 'react';
import { GlyphProps } from '@visx/xychart';
import { RenderTooltipParams } from '@visx/xychart/lib/components/Tooltip';
import { R as ResponsiveConfig } from '../../with-responsive-Cp2qnQPo.js';
import '../../types-4lieC41v.js';
import '@visx/legend';
import '@visx/annotation/lib/components/CircleSubject';
import '@visx/annotation/lib/components/Connector';
import '@visx/annotation/lib/components/Label';
import '@visx/annotation/lib/components/LineSubject';
import '@visx/axis';
import '@visx/legend/lib/types';
import '@visx/scale';

interface ChartInstanceRef {
    getScales: () => {
        xScale: unknown;
        yScale: unknown;
    } | null;
    getChartDimensions: () => {
        width: number;
        height: number;
        margin: {
            top?: number;
            right?: number;
            bottom?: number;
            left?: number;
        };
    };
}
type SingleChartRef = ChartInstanceRef;

interface LineChartAnnotationsProps {
    children?: ReactNode;
}
declare const LineChartAnnotationsOverlay: FC<LineChartAnnotationsProps>;

type LineChartAnnotationProps = {
    datum: DataPointDate;
    title: string;
    subtitle?: string;
    subjectType?: 'circle' | 'line-vertical' | 'line-horizontal';
    styles?: AnnotationStyles;
    testId?: string;
    renderLabel?: FC<{
        title: string;
        subtitle?: string;
    }>;
    renderLabelPopover?: FC<{
        title: string;
        subtitle?: string;
    }>;
};
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
type TooltipDatum = {
    key: string;
    value: number;
};

declare const LineChartAnnotation: FC<LineChartAnnotationProps>;

type LineChartAnnotationComponents = {
    AnnotationsOverlay: typeof LineChartAnnotationsOverlay;
    Annotation: typeof LineChartAnnotation;
    Legend: typeof Legend;
};
type LineChartBaseProps = Optional<LineChartProps, 'width' | 'height' | 'size'>;
type LineChartComponent = React.ForwardRefExoticComponent<LineChartBaseProps & React.RefAttributes<SingleChartRef>> & LineChartAnnotationComponents;
type LineChartResponsiveComponent = React.ForwardRefExoticComponent<LineChartBaseProps & ResponsiveConfig & React.RefAttributes<SingleChartRef>> & LineChartAnnotationComponents;
declare const LineChart: LineChartComponent;
declare const LineChartResponsive: LineChartResponsiveComponent;

export { AnnotationStyles, type CurveType, LineChartResponsive as LineChart, type LineChartAnnotationProps, type LineChartProps, LineChart as LineChartUnresponsive, type RenderLineStartGlyphProps, type TooltipDatum };
