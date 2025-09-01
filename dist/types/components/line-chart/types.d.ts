import { DataPointDate, BaseChartProps, SeriesData } from '../../types.js';
import { CircleSubjectProps } from '@visx/annotation/lib/components/CircleSubject';
import { ConnectorProps } from '@visx/annotation/lib/components/Connector';
import { LabelProps } from '@visx/annotation/lib/components/Label';
import { LineSubjectProps } from '@visx/annotation/lib/components/LineSubject';
import { GlyphProps } from '@visx/xychart';
import { RenderTooltipParams } from '@visx/xychart/lib/components/Tooltip';
import { FC, SVGProps, ReactNode } from 'react';

type AnnotationStyles = {
    circleSubject?: Omit<CircleSubjectProps, 'x' | 'y'> & {
        fill?: string;
    };
    lineSubject?: Omit<LineSubjectProps, 'x' | 'y'>;
    connector?: Omit<ConnectorProps, 'x' | 'y' | 'dx' | 'dy'>;
    label?: Omit<LabelProps, 'title' | 'subtitle' | 'x' | 'y'> & {
        x?: number | 'start' | 'end';
        y?: number | 'start' | 'end';
    };
};
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

export type { AnnotationStyles, CurveType, LineChartAnnotationProps, LineChartProps, RenderLineStartGlyphProps, TooltipDatum };
