import { DataPointDate } from '../../types.js';
import { CircleSubjectProps } from '@visx/annotation/lib/components/CircleSubject';
import { ConnectorProps } from '@visx/annotation/lib/components/Connector';
import { LabelProps } from '@visx/annotation/lib/components/Label';
import { LineSubjectProps } from '@visx/annotation/lib/components/LineSubject';
import { FC } from 'react';

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
type SubjectType = 'circle' | 'line-vertical' | 'line-horizontal';
type LineChartAnnotationProps = {
    datum: DataPointDate;
    title: string;
    subtitle?: string;
    subjectType?: SubjectType;
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
declare const LineChartAnnotation: FC<LineChartAnnotationProps>;

export { type AnnotationStyles, type LineChartAnnotationProps, LineChartAnnotation as default };
