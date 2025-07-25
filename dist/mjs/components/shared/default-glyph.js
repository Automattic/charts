import { jsx } from 'react/jsx-runtime';
import { DataContext } from '@visx/xychart';
import { useContext } from 'react';

const DefaultGlyph = (props) => {
    const { theme } = useContext(DataContext) || {};
    return (jsx("circle", { cx: props.x, cy: props.y, r: props.size, fill: props.color, stroke: theme?.backgroundColor, strokeWidth: 1.5, paintOrder: "fill", "data-testid": `start-glyph-${props.index}`, ...props.glyphStyle }));
};

export { DefaultGlyph };
