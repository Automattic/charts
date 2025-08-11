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

export type { ChartInstanceRef, SingleChartRef };
