import { useMemo } from 'react';

const useZeroValueDisplay = (data, options = { enabled: false }) => {
    const { enabled, minValueRatio = 0.6, maxValueRatio = 0.008 } = options;
    return useMemo(() => {
        if (!enabled)
            return data;
        // Collect all non-zero, non-null values (both positive and negative)
        const nonZeroValues = [];
        for (const series of data) {
            for (const point of series.data) {
                if (point.value !== null && point.value !== 0) {
                    nonZeroValues.push(point.value);
                }
            }
        }
        if (nonZeroValues.length === 0)
            return data;
        // Convert to absolute values to find the range
        const absoluteValues = nonZeroValues.map(Math.abs);
        // Calculate min and max based on absolute values
        const minAbsoluteValue = Math.min(...absoluteValues);
        const maxAbsoluteValue = Math.max(...absoluteValues);
        // Calculate minimum visible value using absolute range
        const minVisibleValue = Math.min(minAbsoluteValue * minValueRatio, maxAbsoluteValue * maxValueRatio);
        return data.map(series => ({
            ...series,
            data: series.data.map((point) => {
                if (point.value === 0) {
                    return {
                        ...point,
                        visualValue: minVisibleValue,
                    };
                }
                return point;
            }),
        }));
    }, [data, enabled, minValueRatio, maxValueRatio]);
};

export { useZeroValueDisplay };
