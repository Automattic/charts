'use strict';

var text = require('@visx/text');

/**
 * Returns the width of the longest tick.
 *
 * @param          ticks      - Ticks to get the width of.
 * @param          formatTick - Function to format the tick.
 * @param {object} labelStyle - Style object for the label.
 * @return {number} - Width of the longest tick.
 */
const getLongestTickWidth = (ticks, formatTick, labelStyle) => {
    const formattedTicks = ticks.map(tick => formatTick(tick, 0, []));
    const longestTick = formattedTicks.reduce((longest, current) => (longest.length >= current.length ? longest : current), formattedTicks[0]);
    return text.getStringWidth(longestTick, labelStyle);
};

exports.getLongestTickWidth = getLongestTickWidth;
