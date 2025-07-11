"use strict";var e=require("react"),t=require("./chart-context.js");exports.useChartId=t=>{const r=e.useId();return t||r},exports.useChartRegistration=(r,s,a,u,c,h)=>{const{registerChart:n,unregisterChart:o}=t.useChartContext(),i=e.useMemo((()=>h),[h]);e.useEffect((()=>(c&&n(r,{legendItems:s,theme:a,chartType:u,metadata:i}),()=>{o(r)})),[r,s,a,u,i,c,n,o])};
//# sourceMappingURL=utils.js.map
