'use strict';

/**
 * Utility function to create chart components with composition API.
 *
 * This function attaches subcomponents to a chart component to enable
 * dot notation access like <Chart.Legend />, <Chart.Tooltip />, etc.
 *
 * @param Chart         - The main chart component
 * @param subComponents - Object containing subcomponents to attach
 * @return Chart component with attached subcomponents
 */
function attachSubComponents(Chart, subComponents) {
    return Object.assign(Chart, subComponents);
}

exports.attachSubComponents = attachSubComponents;
