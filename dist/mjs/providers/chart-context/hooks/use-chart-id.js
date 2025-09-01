import { useId } from 'react';

const useChartId = (providedId) => {
    const generatedId = useId();
    return providedId || generatedId;
};

export { useChartId };
