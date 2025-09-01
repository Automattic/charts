'use strict';

var react = require('react');
var globalChartsProvider = require('../global-charts-provider.js');

const useGlobalChartsContext = () => {
    const context = react.useContext(globalChartsProvider.GlobalChartsContext);
    if (!context) {
        throw new Error('useGlobalChartsContext must be used within a GlobalChartsProvider');
    }
    return context;
};

exports.useGlobalChartsContext = useGlobalChartsContext;
