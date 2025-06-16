"use strict";var e=require("react/jsx-runtime"),t=require("@visx/xychart"),r=require("react");exports.DefaultGlyph=i=>{const{theme:s}=r.useContext(t.DataContext)||{};return e.jsx("circle",{cx:i.x,cy:i.y,r:i.size,fill:i.color,stroke:s?.backgroundColor,strokeWidth:1.5,paintOrder:"fill","data-testid":`start-glyph-${i.index}`,...i.glyphStyle})};
//# sourceMappingURL=default-glyph.js.map
