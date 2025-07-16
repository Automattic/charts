import{getStringWidth as t}from"@visx/text";const e=(e,r,n)=>{const o=e.map((t=>r(t,0,[]))),a=o.reduce(((t,e)=>t.length>=e.length?t:e),o[0]);return t(a,n)},r=()=>!("undefined"==typeof navigator||!navigator.userAgent)&&/^((?!chrome|android).)*safari/i.test(navigator.userAgent);export{e as getLongestTickWidth,r as isSafari};
//# sourceMappingURL=utils.js.map
