"use strict";var t=require("@visx/text");exports.getLongestTickWidth=(e,r,i)=>{const g=e.map((t=>r(t,0,[]))),n=g.reduce(((t,e)=>t.length>=e.length?t:e),g[0]);return t.getStringWidth(n,i)};
//# sourceMappingURL=utils.js.map
