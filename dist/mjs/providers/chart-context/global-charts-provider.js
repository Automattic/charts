import { jsx } from 'react/jsx-runtime';
import { createContext, useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { defaultTheme } from '../theme/themes.js';

const GlobalChartsContext = createContext(null);
const GlobalChartsProvider = ({ children, theme = {}, }) => {
    const [charts, setCharts] = useState(() => new Map());
    const providerTheme = useMemo(() => ({ ...defaultTheme, ...theme }), [theme]);
    // Stable group -> color mapping for this provider lifecycle
    const groupToColorMapRef = useRef(new Map());
    // Reset group color mappings when theme changes
    useEffect(() => {
        groupToColorMapRef.current = new Map();
    }, [providerTheme.colors]);
    const registerChart = useCallback((id, data) => {
        setCharts(prev => new Map(prev).set(id, data));
    }, []);
    const unregisterChart = useCallback((id) => {
        setCharts(prev => {
            const newMap = new Map(prev);
            newMap.delete(id);
            return newMap;
        });
    }, []);
    const getChartData = useCallback((id) => {
        return charts.get(id);
    }, [charts]);
    const resolveGroupColor = useCallback(({ group, index, overrideColor }) => {
        // Highest precedence: explicit series stroke
        if (overrideColor) {
            return overrideColor;
        }
        const palette = providerTheme.colors ?? [];
        // If group provided, maintain a stable assignment
        if (group) {
            const existing = groupToColorMapRef.current.get(group);
            if (existing) {
                return existing;
            }
            // Assign next color from palette in a deterministic cycling manner
            const assignedCount = groupToColorMapRef.current.size;
            const color = palette.length > 0 ? palette[assignedCount % palette.length] : '#000000';
            groupToColorMapRef.current.set(group, color);
            return color;
        }
        // Fallback: index-based color cycling
        return palette.length > 0 ? palette[(index || 0) % palette.length] : '#000000';
    }, [providerTheme.colors]);
    const value = useMemo(() => ({
        charts,
        registerChart,
        unregisterChart,
        getChartData,
        theme: providerTheme,
        resolveGroupColor,
    }), [charts, registerChart, unregisterChart, getChartData, providerTheme, resolveGroupColor]);
    return jsx(GlobalChartsContext.Provider, { value: value, children: children });
};

export { GlobalChartsContext, GlobalChartsProvider };
