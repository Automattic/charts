"use strict";var t=require("@visx/text");exports.getLongestTickWidth=(e,r,i)=>{const n=e.map((t=>r(t,0,[]))),a=n.reduce(((t,e)=>t.length>=e.length?t:e),n[0]);return t.getStringWidth(a,i)},exports.isSafari=()=>!("undefined"==typeof navigator||!navigator.userAgent)&&/^((?!chrome|android).)*safari/i.test(navigator.userAgent);
//# sourceMappingURL=utils.js.map
