"use strict";require("@visx/axis"),require("@visx/scale");var e=require("@visx/text");exports.getLongestTickWidth=(t,r,i)=>{const s=t.map((e=>r(e,0,[]))),g=s.reduce(((e,t)=>e.length>=t.length?e:t),s[0]);return e.getStringWidth(g,i)};
//# sourceMappingURL=utils.js.map
