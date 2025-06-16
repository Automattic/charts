import{jsx as r}from"react/jsx-runtime";import{DataContext as t}from"@visx/xychart";import{useContext as o}from"react";const e=e=>{const{theme:i}=o(t)||{};return r("circle",{cx:e.x,cy:e.y,r:e.size,fill:e.color,stroke:i?.backgroundColor,strokeWidth:1.5,paintOrder:"fill","data-testid":`start-glyph-${e.index}`,...e.glyphStyle})};export{e as DefaultGlyph};
//# sourceMappingURL=default-glyph.js.map
