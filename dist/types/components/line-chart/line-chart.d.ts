import { Legend } from '../legend/legend.js';
import { Optional } from '../../types.js';
import { SingleChartRef } from '../private/single-chart-context/single-chart-context.js';
import LineChartAnnotationsOverlay from './private/line-chart-annotations-overlay.js';
import LineChartAnnotation from './private/line-chart-annotation.js';
import { LineChartProps } from './types.js';
import { ResponsiveConfig } from '../private/with-responsive/with-responsive.js';

type LineChartAnnotationComponents = {
    AnnotationsOverlay: typeof LineChartAnnotationsOverlay;
    Annotation: typeof LineChartAnnotation;
    Legend: typeof Legend;
};
type LineChartBaseProps = Optional<LineChartProps, 'width' | 'height' | 'size'>;
type LineChartResponsiveComponent = React.ForwardRefExoticComponent<LineChartBaseProps & ResponsiveConfig & React.RefAttributes<SingleChartRef>> & LineChartAnnotationComponents;
declare const LineChartResponsive: LineChartResponsiveComponent;

export { LineChartResponsive as default };
