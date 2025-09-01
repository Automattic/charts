'use strict';

var react = require('react');

const useChartId = (providedId) => {
    const generatedId = react.useId();
    return providedId || generatedId;
};

exports.useChartId = useChartId;
