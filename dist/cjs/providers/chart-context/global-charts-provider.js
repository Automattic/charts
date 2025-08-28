'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
var themes = require('../theme/themes.js');

const GlobalChartsContext = react.createContext(null);
const GlobalChartsProvider = ({ children, theme = {}, }) => {
    const [charts, setCharts] = react.useState(() => new Map());
    const providerTheme = react.useMemo(() => ({ ...themes.defaultTheme, ...theme }), [theme]);
    // Stable group -> color mapping for this provider lifecycle
    const groupToColorMapRef = react.useRef(new Map());
    // Reset group color mappings when theme changes
    react.useEffect(() => {
        groupToColorMapRef.current = new Map();
    }, [providerTheme.colors]);
    const registerChart = react.useCallback((id, data) => {
        setCharts(prev => new Map(prev).set(id, data));
    }, []);
    const unregisterChart = react.useCallback((id) => {
        setCharts(prev => {
            const newMap = new Map(prev);
            newMap.delete(id);
            return newMap;
        });
    }, []);
    const getChartData = react.useCallback((id) => {
        return charts.get(id);
    }, [charts]);
    const resolveGroupColor = react.useCallback(({ group, index, overrideColor }) => {
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
    const value = react.useMemo(() => ({
        charts,
        registerChart,
        unregisterChart,
        getChartData,
        theme: providerTheme,
        resolveGroupColor,
    }), [charts, registerChart, unregisterChart, getChartData, providerTheme, resolveGroupColor]);
    return jsxRuntime.jsx(GlobalChartsContext.Provider, { value: value, children: children });
};
const useGlobalChartsContext = () => {
    const context = react.useContext(GlobalChartsContext);
    if (!context) {
        throw new Error('useGlobalChartsContext must be used within a GlobalChartsProvider');
    }
    return context;
};

exports.GlobalChartsContext = GlobalChartsContext;
exports.GlobalChartsProvider = GlobalChartsProvider;
exports.useGlobalChartsContext = useGlobalChartsContext;
