import { Legend } from '../../legend/legend.js';
import { FC, ComponentType, PropsWithChildren } from 'react';

/**
 * Base interface for chart subcomponents in the composition API
 */
interface BaseChartSubComponents {
    Legend: ComponentType<React.ComponentProps<typeof Legend>>;
    SVG: FC<PropsWithChildren>;
    HTML: FC<PropsWithChildren>;
}
/**
 * Type helper for creating chart components with composition API
 * @template TProps - The props type for the chart component
 * @template TSubComponents - Additional subcomponents beyond the base ones
 */
type ChartComponentWithComposition<TProps, TSubComponents extends BaseChartSubComponents = BaseChartSubComponents> = FC<TProps> & TSubComponents;

export type { BaseChartSubComponents, ChartComponentWithComposition };
