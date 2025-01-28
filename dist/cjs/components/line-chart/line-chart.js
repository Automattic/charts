"use strict";var e=require("react/jsx-runtime"),t=require("@visx/curve"),a=require("@visx/gradient"),i=require("@visx/xychart"),r=require("clsx"),s=require("react"),l=require("../../providers/theme/theme-provider.js"),o=require("../legend/base-legend.js"),n=require("../shared/with-responsive.js"),c=require("./line-chart.module.scss.js");const d=({tooltipData:t})=>{const a=t?.nearestDatum?.datum;if(!a)return null;const i=Object.entries(t?.datumByKey||{}).map((([e,{datum:t}])=>({key:e,value:t.value}))).sort(((e,t)=>t.value-e.value));return e.jsxs("div",{className:c["line-chart__tooltip"],children:[e.jsx("div",{className:c["line-chart__tooltip-date"],children:a.date.toLocaleDateString()}),i.map((t=>e.jsxs("div",{className:c["line-chart__tooltip-row"],children:[e.jsxs("span",{className:c["line-chart__tooltip-label"],children:[t.key,":"]}),e.jsx("span",{className:c["line-chart__tooltip-value"],children:t.value})]},t.key)))]})},h=e=>new Date(e).toLocaleDateString(void 0,{month:"short",day:"numeric"});var u=n.withResponsive((({data:n,width:u,height:m,className:p,margin:x,withTooltips:v=!0,showLegend:g=!1,legendOrientation:j="horizontal",withGradientFill:y=!1,options:N={}})=>{const b=l.useChartTheme(),T=s.useMemo((()=>{const e=n?.map((e=>e.options?.stroke??"")).filter(Boolean)??[];return i.buildChartTheme({...b,colors:[...e,...b.colors]})}),[b,n]);x=s.useMemo((()=>{let e={top:0,right:0,bottom:40,left:40};return"right"===N.axis?.y?.orientation&&(e={...e,right:40,left:0}),"top"===N.axis?.x?.orientation&&(e={...e,top:40,bottom:0}),{...e,...x}}),[x,N]);const w=(e=>e?.length?e.some((e=>e.data.some((e=>isNaN(e.value)||null===e.value||void 0===e.value||isNaN(e.date.getTime())))))?"Invalid data":null:"No data available")(n);if(w)return e.jsx("div",{className:r("line-chart",c["line-chart"]),children:w});const q=n.map(((e,t)=>({label:e.label,value:"",color:b.colors[t%b.colors.length]}))),_={xAccessor:e=>e.date,yAccessor:e=>e.value};return e.jsxs("div",{className:r("line-chart",c["line-chart"],p),"data-testid":"line-chart",role:"img","aria-label":"line chart",children:[e.jsxs(i.XYChart,{theme:T,width:u,height:m,margin:x,xScale:{type:"time",...N?.xScale},yScale:{type:"linear",nice:!0,zero:!1,...N?.yScale},children:[e.jsx(i.AnimatedGrid,{columns:!1,numTicks:4}),e.jsx(i.AnimatedAxis,{orientation:"bottom",numTicks:5,tickFormat:h,...N?.axis?.x}),e.jsx(i.AnimatedAxis,{orientation:"left",numTicks:4,...N?.axis?.y}),n.map(((r,s)=>{const l=r.options?.stroke??T.colors[s%T.colors.length];return e.jsxs("g",{children:[y&&e.jsx(a.LinearGradient,{id:`area-gradient-${s+1}`,from:l,to:"white",toOpacity:.1,...r.options?.gradient,"data-testid":"line-gradient"}),e.jsx(i.AnimatedAreaSeries,{dataKey:r?.label,data:r.data,..._,fill:y?`url(#area-gradient-${s+1})`:void 0,renderLine:!0,curve:t.curveNatural},r?.label)]},r?.label||s)})),v&&e.jsx(i.Tooltip,{snapTooltipToDatumX:!0,snapTooltipToDatumY:!0,showSeriesGlyphs:!0,renderTooltip:d})]}),g&&e.jsx(o.BaseLegend,{items:q,orientation:j,className:c["line-chart-legend"]})]})}));module.exports=u;
//# sourceMappingURL=line-chart.js.map
