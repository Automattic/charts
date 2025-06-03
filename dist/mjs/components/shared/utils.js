import"@visx/axis";import"@visx/scale";import{getStringWidth as t}from"@visx/text";const e=(e,r,i)=>{const o=e.map((t=>r(t,0,[]))),s=o.reduce(((t,e)=>t.length>=e.length?t:e),o[0]);return t(s,i)};export{e as getLongestTickWidth};
//# sourceMappingURL=utils.js.map
