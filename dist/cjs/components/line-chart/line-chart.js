"use strict";var e=require("react/jsx-runtime"),t=require("@visx/gradient"),r=require("@visx/xychart"),a=require("clsx");require("react");var i=require("../../providers/theme/theme-provider.js"),s=require("../legend/base-legend.js"),o=require("../shared/with-responsive.js"),l=require("./line-chart.module.scss.js");const n=({tooltipData:t})=>{const r=t?.nearestDatum?.datum;if(!r)return null;const a=Object.entries(t?.datumByKey||{}).map((([e,{datum:t}])=>({key:e,value:t.value}))).sort(((e,t)=>t.value-e.value));return e.jsxs("div",{className:l["line-chart__tooltip"],children:[e.jsx("div",{className:l["line-chart__tooltip-date"],children:r.date.toLocaleDateString()}),a.map((t=>e.jsxs("div",{className:l["line-chart__tooltip-row"],children:[e.jsxs("span",{className:l["line-chart__tooltip-label"],children:[t.key,":"]}),e.jsx("span",{className:l["line-chart__tooltip-value"],children:t.value})]},t.key)))]})},c=e=>new Date(e).toLocaleDateString(void 0,{month:"short",day:"numeric"});var d=o.withResponsive((({data:o,width:d,height:h,className:m,margin:u={},withTooltips:p=!0,showLegend:g=!1,legendOrientation:x="horizontal",withGradientFill:j=!1,options:v={}})=>{const y=i.useChartTheme();if(!o?.length)return e.jsx("div",{className:a("line-chart-empty",l["line-chart-empty"]),children:"Empty..."});const k=o.map(((e,t)=>({label:e.label,value:"",color:y.colors[t%y.colors.length]}))),b={xAccessor:e=>e.date,yAccessor:e=>e.value},T=r.buildChartTheme({backgroundColor:y.backgroundColor,colors:y.colors,gridStyles:y.gridStyles,tickLength:y?.tickLength||0,gridColor:y?.gridColor||"",gridColorDark:y?.gridColorDark||""});return e.jsxs("div",{className:a("line-chart",l["line-chart"],m),children:[e.jsxs(r.XYChart,{theme:T,width:d,height:h,margin:{top:20,right:20,bottom:40,left:40,...u},xScale:{type:"time",...v?.xScale},yScale:{type:"linear",nice:!0,zero:!1,...v?.yScale},children:[e.jsx(r.AnimatedGrid,{columns:!1,numTicks:4}),e.jsx(r.AnimatedAxis,{orientation:"bottom",numTicks:5,tickFormat:c,...v?.axis?.x}),e.jsx(r.AnimatedAxis,{orientation:"left",numTicks:4,...v?.axis?.y}),o.map(((a,i)=>{const s=a.options?.stroke??T.colors[i%T.colors.length];return e.jsxs(e.Fragment,{children:[e.jsx(t.LinearGradient,{id:`area-gradient-${i+1}`,from:s,to:"white",toOpacity:.1,...a.options?.gradient}),e.jsx(r.AnimatedLineSeries,{dataKey:a?.label,data:a.data,...b,stroke:s,strokeWidth:2},a?.label),j&&e.jsx(r.AnimatedAreaSeries,{dataKey:a?.label,data:a.data,...b,stroke:s,strokeWidth:0,fill:`url(#area-gradient-${i+1})`,renderLine:!1},a?.label)]})})),p&&e.jsx(r.Tooltip,{snapTooltipToDatumX:!0,snapTooltipToDatumY:!0,showSeriesGlyphs:!0,renderTooltip:n})]}),g&&e.jsx(s.BaseLegend,{items:k,orientation:x,className:l["line-chart-legend"]})]})}));module.exports=d;
//# sourceMappingURL=line-chart.js.map
