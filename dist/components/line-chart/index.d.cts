import { L as Legend } from '../../legend-C9ahiwOt.cjs';
import { B as BaseChartProps, c as SeriesData, b as DataPointDate, A as AnnotationStyles, O as Optional } from '../../types-DU5eF3uf.cjs';
import { FC, ReactNode, SVGProps } from 'react';
import { GlyphProps } from '@visx/xychart';
import { RenderTooltipParams } from '@visx/xychart/lib/components/Tooltip';
import { R as ResponsiveConfig } from '../../with-responsive-Cp2qnQPo.cjs';
import '../../types-C05PdDJa.cjs';
import '@visx/legend';
import '@visx/annotation/lib/components/CircleSubject';
import '@visx/annotation/lib/components/Connector';
import '@visx/annotation/lib/components/Label';
import '@visx/annotation/lib/components/LineSubject';
import '@visx/axis';
import '@visx/legend/lib/types';
import '@visx/scale';
import '@visx/text/lib/Text';

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
type RenderLineGlyphProps<Datum extends object> = GlyphProps<Datum> & {
    glyphStyle?: SVGProps<SVGCircleElement>;
    position?: 'start' | 'end';
};
interface LineChartProps extends BaseChartProps<SeriesData[]> {
    withGradientFill: boolean;
    smoothing?: boolean;
    curveType?: CurveType;
    renderTooltip?: (params: RenderTooltipParams<DataPointDate>) => ReactNode;
    withStartGlyphs?: boolean;
    withEndGlyphs?: boolean;
    renderGlyph?: <Datum extends object>(props: GlyphProps<Datum>) => ReactNode;
    glyphStyle?: SVGProps<SVGCircleElement>;
    withLegendGlyph?: boolean;
    withTooltipCrosshairs?: {
        showVertical?: boolean;
        showHorizontal?: boolean;
    };
    legendInteractive?: boolean;
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

export { AnnotationStyles, type CurveType, LineChartResponsive as LineChart, type LineChartAnnotationProps, type LineChartProps, LineChart as LineChartUnresponsive, type RenderLineGlyphProps, type TooltipDatum };
