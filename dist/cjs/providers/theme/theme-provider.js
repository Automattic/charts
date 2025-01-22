"use strict";var e=require("react/jsx-runtime"),r=require("react"),t=require("./themes.js");const s=r.createContext(t.defaultTheme);exports.ThemeProvider=({theme:r={},children:u})=>{const h={...t.defaultTheme,...r};return e.jsx(s.Provider,{value:h,children:u})},exports.useChartTheme=()=>r.useContext(s);
//# sourceMappingURL=theme-provider.js.map
