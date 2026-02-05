type ResponsiveConfig = {
    /**
     * The maximum width of the chart. Defaults to 1200.
     */
    maxWidth?: number;
    /**
     * The aspect ratio of the chart (height = width * aspectRatio).
     * When provided, height is calculated from width.
     * When omitted, the chart fills the parent container's height.
     */
    aspectRatio?: number;
    /**
     * Child render updates upon resize are delayed until debounceTime milliseconds after the last resize event is observed.
     */
    resizeDebounceTime?: number;
};

export type { ResponsiveConfig as R };
