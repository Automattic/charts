'use strict';

var scale = require('@visx/scale');
var react = require('react');
require('date-fns');
require('@automattic/number-formatters');
var getLongestTickWidth = require('../utils/get-longest-tick-width.js');
require('deepmerge');

const useChartMargin = (height, options, data, theme, horizontal = false) => {
    const yTicks = react.useMemo(() => {
        const allDataPoints = data.flatMap(series => series.data);
        if (horizontal) {
            // When horizontal, y ticks renders fixed tick labels.
            return allDataPoints.map(d => d.label || options.axis?.y?.tickFormat(d.date.getTime(), 0, []));
        }
        const minY = Math.min(...allDataPoints.map(d => d.value));
        const maxY = Math.max(...allDataPoints.map(d => d.value));
        const yScale = scale.createScale({
            ...options.yScale,
            domain: [minY, maxY],
            range: [height, 0],
        });
        return scale.getTicks(yScale, options.axis?.y?.numTicks);
    }, [options, data, height, horizontal]);
    return react.useMemo(() => {
        // Default margin is for bottom axis labels.
        const defaultMargin = { top: 10, right: 20, bottom: 20, left: 20 };
        const defaultTickWidth = 40;
        // Auto-calculate margin for y axis labels based on orientation and tick width.
        const yAxisOrientation = options.axis?.y?.orientation;
        const yAxisStyles = yAxisOrientation === 'right' ? theme.axisStyles.y.right : theme.axisStyles.y.left;
        const yTickWidth = getLongestTickWidth.getLongestTickWidth(yTicks, options.axis?.y?.tickFormat, yAxisStyles.axisLabel);
        const yMarginValue = (yTickWidth ?? defaultTickWidth) + (yAxisStyles?.tickLength ?? 0);
        if (yAxisOrientation === 'right') {
            defaultMargin.right = yMarginValue;
        }
        else {
            defaultMargin.left = yMarginValue;
        }
        if (options.axis?.x?.orientation === 'top') {
            defaultMargin.top = 20;
            defaultMargin.bottom = 10;
        }
        return defaultMargin;
    }, [options, theme, yTicks]);
};

exports.useChartMargin = useChartMargin;
