import{jsx as t,jsxs as e}from"react/jsx-runtime";import{curveCatmullRom as a,curveLinear as o}from"@visx/curve";import{LinearGradient as i}from"@visx/gradient";import{buildChartTheme as r,XYChart as l,AnimatedGrid as n,AnimatedAxis as s,AnimatedAreaSeries as c,Tooltip as m}from"@visx/xychart";import"@visx/xychart/lib/components/Tooltip";import d from"clsx";import{useId as h,useMemo as p}from"react";import{useChartTheme as u}from"../../providers/theme/theme-provider.js";import{BaseLegend as v}from"../legend/base-legend.js";import{withResponsive as g}from"../shared/with-responsive.js";import f from"./line-chart.module.scss.js";const x=({tooltipData:a})=>{const o=a?.nearestDatum?.datum;if(!o)return null;const i=Object.entries(a?.datumByKey||{}).map((([t,{datum:e}])=>({key:t,value:e.value}))).sort(((t,e)=>e.value-t.value));return e("div",{className:f["line-chart__tooltip"],children:[t("div",{className:f["line-chart__tooltip-date"],children:o.date?.toLocaleDateString()}),i.map((a=>e("div",{className:f["line-chart__tooltip-row"],children:[e("span",{className:f["line-chart__tooltip-label"],children:[a.key,":"]}),t("span",{className:f["line-chart__tooltip-value"],children:a.value})]},a.key)))]})},y=t=>new Date(t).toLocaleDateString(void 0,{month:"short",day:"numeric"});var b=g((({data:g,width:b,height:N,className:T,margin:k,withTooltips:_=!0,showLegend:w=!1,legendOrientation:D="horizontal",withGradientFill:S=!1,smoothing:j=!0,renderTooltip:L=x,options:O={}})=>{const $=u(),M=h(),z=p((()=>g.map((t=>({...t,data:t.data.sort(((t,e)=>t.date.getTime()-e.date.getTime()))})))),[g]),A=p((()=>{const t=z?.map((t=>t.options?.stroke??"")).filter(Boolean)??[];return r({...$,colors:[...t,...$.colors]})}),[$,z]);k=p((()=>{let t={};return"right"===O.axis?.y?.orientation&&(t={...t,right:40,left:0}),"top"===O.axis?.x?.orientation&&(t={...t,top:20,bottom:10}),{...t,...k}}),[k,O]);const B=p((()=>Math.max(Math.floor(Math.min(z[0]?.data.length,b/60)),5)),[z,b]),F=(t=>t?.length?t.some((t=>t.data.some((t=>isNaN(t.value)||null===t.value||void 0===t.value||isNaN(t.date.getTime())))))?"Invalid data":null:"No data available")(z);if(F)return t("div",{className:d("line-chart",f["line-chart"]),children:F});const G=z.map(((t,e)=>({label:t.label,value:"",color:$.colors[e%$.colors.length]}))),K={xAccessor:t=>t?.date,yAccessor:t=>t?.value};return e("div",{className:d("line-chart",f["line-chart"],T),"data-testid":"line-chart",role:"img","aria-label":"line chart",children:[e(l,{theme:A,width:b,height:N,margin:{top:10,right:0,bottom:20,left:40,...k},xScale:{type:"time",...O?.xScale},yScale:{type:"linear",nice:!0,zero:!1,...O?.yScale},children:[t(n,{columns:!1,numTicks:4}),t(s,{orientation:"bottom",numTicks:B,tickFormat:y,...O?.axis?.x}),t(s,{orientation:"left",numTicks:4,...O?.axis?.y}),z.map(((r,l)=>{const n=r.options?.stroke??A.colors[l%A.colors.length];return e("g",{children:[S&&t(i,{id:`area-gradient-${M}-${l+1}`,from:n,fromOpacity:.4,toOpacity:.1,to:A.backgroundColor,...r.options?.gradient,"data-testid":"line-gradient"}),t(c,{dataKey:r?.label,data:r.data,...K,fill:S?`url(#area-gradient-${M}-${l+1})`:void 0,renderLine:!0,curve:j?a:o},r?.label)]},r?.label||l)})),_&&t(m,{snapTooltipToDatumX:!0,snapTooltipToDatumY:!0,showSeriesGlyphs:!0,renderTooltip:L})]}),w&&t(v,{items:G,orientation:D,className:f["line-chart-legend"]})]})}));export{b as default};
//# sourceMappingURL=line-chart.js.map
