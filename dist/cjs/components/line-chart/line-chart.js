"use strict";var e=require("react/jsx-runtime"),t=require("@visx/curve"),a=require("@visx/gradient"),r=require("@visx/xychart"),i=require("clsx"),l=require("react"),s=require("../../providers/theme/theme-provider.js"),o=require("../legend/base-legend.js"),n=require("../shared/with-responsive.js"),c=require("./line-chart.module.scss.js");const d=({tooltipData:t})=>{const a=t?.nearestDatum?.datum;if(!a)return null;const r=Object.entries(t?.datumByKey||{}).map((([e,{datum:t}])=>({key:e,value:t.value}))).sort(((e,t)=>t.value-e.value));return e.jsxs("div",{className:c["line-chart__tooltip"],children:[e.jsx("div",{className:c["line-chart__tooltip-date"],children:a.date.toLocaleDateString()}),r.map((t=>e.jsxs("div",{className:c["line-chart__tooltip-row"],children:[e.jsxs("span",{className:c["line-chart__tooltip-label"],children:[t.key,":"]}),e.jsx("span",{className:c["line-chart__tooltip-value"],children:t.value})]},t.key)))]})},h=e=>new Date(e).toLocaleDateString(void 0,{month:"short",day:"numeric"});var u=n.withResponsive((({data:n,width:u,height:m,className:g,margin:p={},withTooltips:v=!0,showLegend:x=!1,legendOrientation:j="horizontal",withGradientFill:y=!1,options:b={}})=>{const k=s.useChartTheme(),N=l.useMemo((()=>{const e=n?.map((e=>e.options?.stroke??"")).filter(Boolean)??[];return r.buildChartTheme({backgroundColor:k.backgroundColor,colors:[...e,...k.colors],gridStyles:k.gridStyles,tickLength:k?.tickLength||0,gridColor:k?.gridColor||"",gridColorDark:k?.gridColorDark||""})}),[k,n]),T=(e=>e?.length?e.some((e=>e.data.some((e=>isNaN(e.value)||null===e.value||void 0===e.value||isNaN(e.date.getTime())))))?"Invalid data":null:"No data available")(n);if(T)return e.jsx("div",{className:i("line-chart",c["line-chart"]),children:T});const w=n.map(((e,t)=>({label:e.label,value:"",color:k.colors[t%k.colors.length]}))),q={xAccessor:e=>e.date,yAccessor:e=>e.value};return e.jsxs("div",{className:i("line-chart",c["line-chart"],g),"data-testid":"line-chart",role:"img","aria-label":"line chart",children:[e.jsxs(r.XYChart,{theme:N,width:u,height:m,margin:{top:20,right:20,bottom:40,left:40,...p},xScale:{type:"time",...b?.xScale},yScale:{type:"linear",nice:!0,zero:!1,...b?.yScale},children:[e.jsx(r.AnimatedGrid,{columns:!1,numTicks:4}),e.jsx(r.AnimatedAxis,{orientation:"bottom",numTicks:5,tickFormat:h,...b?.axis?.x}),e.jsx(r.AnimatedAxis,{orientation:"left",numTicks:4,...b?.axis?.y}),n.map(((i,l)=>{const s=i.options?.stroke??N.colors[l%N.colors.length];return e.jsxs("g",{children:[y&&e.jsx(a.LinearGradient,{id:`area-gradient-${l+1}`,from:s,to:"white",toOpacity:.1,...i.options?.gradient,"data-testid":"line-gradient"}),e.jsx(r.AnimatedAreaSeries,{dataKey:i?.label,data:i.data,...q,fill:y?`url(#area-gradient-${l+1})`:void 0,renderLine:!0,curve:t.curveNatural},i?.label)]},i?.label||l)})),v&&e.jsx(r.Tooltip,{snapTooltipToDatumX:!0,snapTooltipToDatumY:!0,showSeriesGlyphs:!0,renderTooltip:d})]}),x&&e.jsx(o.BaseLegend,{items:w,orientation:j,className:c["line-chart-legend"]})]})}));module.exports=u;
//# sourceMappingURL=line-chart.js.map
