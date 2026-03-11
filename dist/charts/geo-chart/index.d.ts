import * as react_jsx_runtime from 'react/jsx-runtime';
import { R as ResponsiveConfig } from '../../with-responsive-CNfhzAUu.js';
import { FC } from 'react';
import { B as BaseChartProps, G as GeoData } from '../../types-ChOUI9-N.js';
import '@visx/annotation/lib/components/CircleSubject';
import '@visx/annotation/lib/components/Connector';
import '@visx/annotation/lib/components/Label';
import '@visx/annotation/lib/components/LineSubject';
import '@visx/axis';
import '@visx/legend/lib/types';
import '@visx/scale';
import '@visx/text/lib/Text';
import '@visx/xychart';
import '@wordpress/theme';
import 'react-google-charts';

/**
 * Region to display on the map.
 * Use 'world' for global view or any ISO 3166-1 alpha-2 country code
 * (e.g., 'US' for United States, 'CA' for Canada).
 */
type GeoRegion = 'world' | (string & {});
/**
 * Resolution level for the map.
 * - 'countries': Country-level (default for 'world')
 * - 'provinces': State/province level (use with specific region like 'US')
 * - 'metros': Metropolitan areas (US only)
 */
type GeoResolution = 'countries' | 'provinces' | 'metros';
interface GeoChartProps extends Pick<BaseChartProps, 'className' | 'chartId' | 'width' | 'height'> {
    /**
     * Data in Google Charts native format for maximum flexibility.
     * First row contains column headers, subsequent rows contain data.
     *
     * Country identifiers can be either full country names or ISO 3166-1 alpha-2 codes
     * (e.g., 'United States' or 'US').
     */
    data: GeoData;
    /**
     * Region to display. Use 'world' for global view, 'US' for United States,
     * or any ISO 3166-1 alpha-2 country code.
     * @default 'world'
     */
    region?: GeoRegion;
    /**
     * Resolution level for the map.
     * - 'countries': Country-level (default for 'world')
     * - 'provinces': State/province level (use with specific region like 'US')
     * - 'metros': Metropolitan areas (US only)
     * @default 'countries'
     */
    resolution?: GeoResolution;
    /**
     * Optional render function for the loading placeholder.
     * Called while Google Charts is loading.
     */
    renderPlaceholder?: () => React.ReactNode;
}

declare const GeoChartWithProvider: FC<GeoChartProps>;
declare const GeoChartResponsive: ({ resizeDebounceTime, maxWidth, aspectRatio, size, width, height, ...chartProps }: Omit<GeoChartProps, "width" | "height" | "size"> & {
    width?: number;
    height?: number;
    size?: number;
} & ResponsiveConfig) => react_jsx_runtime.JSX.Element;

export { GeoChartResponsive as GeoChart, type GeoChartProps, GeoChartWithProvider as GeoChartUnresponsive, type GeoRegion, type GeoResolution };
