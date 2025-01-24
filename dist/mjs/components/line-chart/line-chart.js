import{jsx as e,jsxs as t}from"react/jsx-runtime";import{curveNatural as a}from"@visx/curve";import{LinearGradient as o}from"@visx/gradient";import{buildChartTheme as r,XYChart as i,AnimatedGrid as l,AnimatedAxis as n,AnimatedAreaSeries as s,Tooltip as c}from"@visx/xychart";import d from"clsx";import{useMemo as m}from"react";import{useChartTheme as h}from"../../providers/theme/theme-provider.js";import{BaseLegend as p}from"../legend/base-legend.js";import{withResponsive as u}from"../shared/with-responsive.js";import g from"./line-chart.module.scss.js";const v=({tooltipData:a})=>{const o=a?.nearestDatum?.datum;if(!o)return null;const r=Object.entries(a?.datumByKey||{}).map((([e,{datum:t}])=>({key:e,value:t.value}))).sort(((e,t)=>t.value-e.value));return t("div",{className:g["line-chart__tooltip"],children:[e("div",{className:g["line-chart__tooltip-date"],children:o.date.toLocaleDateString()}),r.map((a=>t("div",{className:g["line-chart__tooltip-row"],children:[t("span",{className:g["line-chart__tooltip-label"],children:[a.key,":"]}),e("span",{className:g["line-chart__tooltip-value"],children:a.value})]},a.key)))]})},f=e=>new Date(e).toLocaleDateString(void 0,{month:"short",day:"numeric"});var y=u((({data:u,width:y,height:k,className:b,margin:N={},withTooltips:x=!0,showLegend:w=!1,legendOrientation:T="horizontal",withGradientFill:_=!1,options:D={}})=>{const S=h(),j=m((()=>{const e=u?.map((e=>e.options?.stroke??"")).filter(Boolean)??[];return r({backgroundColor:S.backgroundColor,colors:[...e,...S.colors],gridStyles:S.gridStyles,tickLength:S?.tickLength||0,gridColor:S?.gridColor||"",gridColorDark:S?.gridColorDark||""})}),[S,u]),C=(e=>e?.length?e.some((e=>e.data.some((e=>isNaN(e.value)||null===e.value||void 0===e.value||isNaN(e.date.getTime())))))?"Invalid data":null:"No data available")(u);if(C)return e("div",{className:d("line-chart",g["line-chart"]),children:C});const L=u.map(((e,t)=>({label:e.label,value:"",color:S.colors[t%S.colors.length]}))),O={xAccessor:e=>e.date,yAccessor:e=>e.value};return t("div",{className:d("line-chart",g["line-chart"],b),"data-testid":"line-chart",role:"img","aria-label":"line chart",children:[t(i,{theme:j,width:y,height:k,margin:{top:20,right:20,bottom:40,left:40,...N},xScale:{type:"time",...D?.xScale},yScale:{type:"linear",nice:!0,zero:!1,...D?.yScale},children:[e(l,{columns:!1,numTicks:4}),e(n,{orientation:"bottom",numTicks:5,tickFormat:f,...D?.axis?.x}),e(n,{orientation:"left",numTicks:4,...D?.axis?.y}),u.map(((r,i)=>{const l=r.options?.stroke??j.colors[i%j.colors.length];return t("g",{children:[_&&e(o,{id:`area-gradient-${i+1}`,from:l,to:"white",toOpacity:.1,...r.options?.gradient,"data-testid":"line-gradient"}),e(s,{dataKey:r?.label,data:r.data,...O,fill:_?`url(#area-gradient-${i+1})`:void 0,renderLine:!0,curve:a},r?.label)]},r?.label||i)})),x&&e(c,{snapTooltipToDatumX:!0,snapTooltipToDatumY:!0,showSeriesGlyphs:!0,renderTooltip:v})]}),w&&e(p,{items:L,orientation:T,className:g["line-chart-legend"]})]})}));export{y as default};
//# sourceMappingURL=line-chart.js.map
