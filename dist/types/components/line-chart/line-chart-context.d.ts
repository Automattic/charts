interface LineChartRef {
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

export type { LineChartRef };
