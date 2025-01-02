"use strict";var e=require("react/jsx-runtime"),l=require("@visx/group"),t=require("@visx/shape"),o=require("clsx"),i=require("react"),a=require("@visx/event"),n=require("@visx/tooltip"),s=require("@visx/legend"),r=require("@visx/scale");const d={backgroundColor:"#FFFFFF",labelBackgroundColor:"#FFFFFF",colors:["#98C8DF","#006DAB","#A6DC80","#1F9828","#FF8C8F"],gridStyles:{stroke:"#787C82",strokeWidth:1},tickLength:0,gridColor:"",gridColorDark:""},c=i.createContext(d);var u={"legend--horizontal":"legend-module__legend--horizontal__IUN13","legend--vertical":"legend-module__legend--vertical__Scfzo","legend-item":"legend-module__legend-item__feemn","legend-item-swatch":"legend-module__legend-item-swatch__nRyXf","legend-item-label":"legend-module__legend-item-label__ksx6I","legend-item-value":"legend-module__legend-item-value__d9x1j"};const h={horizontal:"row",vertical:"column"},p=({items:l,className:t,orientation:i="horizontal"})=>{const a=r.scaleOrdinal({domain:l.map((e=>e.label)),range:l.map((e=>e.color))});return e.jsx("div",{className:o(u.legend,u[`legend--${i}`],t),role:"list",children:e.jsx(s.LegendOrdinal,{scale:a,direction:h[i],shape:"rect",shapeWidth:16,shapeHeight:16,className:u["legend-items"],children:t=>e.jsx("div",{className:u[`legend--${i}`],children:t.map((t=>{var o,i;return e.jsxs("div",{className:u["legend-item"],children:[e.jsx("svg",{width:16,height:16,children:e.jsx("rect",{width:16,height:16,fill:t.value,className:u["legend-item-swatch"]})}),e.jsxs("span",{className:u["legend-item-label"],children:[t.text,(null===(o=l.find((e=>e.label===t.text)))||void 0===o?void 0:o.value)&&e.jsx("span",{className:u["legend-item-value"],children:null===(i=l.find((e=>e.label===t.text)))||void 0===i?void 0:i.value})]})]},t.text)}))})})})};var g="base-tooltip-module__tooltip__OfX6n";const m=({data:l})=>e.jsxs(e.Fragment,{children:[null==l?void 0:l.label,": ",(null==l?void 0:l.valueDisplay)||(null==l?void 0:l.value)]}),v=({data:l,top:t,left:o,component:i=m,children:a,className:n})=>e.jsx("div",{className:g,style:{top:t,left:o},role:"tooltip",children:a||l&&e.jsx(i,{data:l,className:n})});var x={"pie-chart":"pie-chart-module__pie-chart__R12Vh"};exports.PieChart=({data:s,width:r=500,height:u=500,withTooltips:h=!1,innerRadius:g=0,className:m,showLegend:_,legendOrientation:f})=>{const j=i.useContext(c),{onMouseMove:F,onMouseLeave:b,tooltipOpen:C,tooltipData:N,tooltipLeft:w,tooltipTop:k}=(({withTooltips:e})=>{const{tooltipOpen:l,tooltipLeft:t,tooltipTop:o,tooltipData:s,hideTooltip:r,showTooltip:d}=n.useTooltip();return{onMouseMove:i.useCallback(((l,t)=>{if(!e)return;const o=a.localPoint(l);o&&d({tooltipData:t,tooltipLeft:o.x,tooltipTop:o.y-10})}),[e,d]),onMouseLeave:i.useCallback((()=>{e&&r()}),[e,r]),tooltipOpen:l,tooltipData:s||null,tooltipLeft:t,tooltipTop:o}})({withTooltips:h}),L=Math.min(r,u)/2,M=r/2,T=u/2,q={value:e=>e.value,fill:e=>(null==e?void 0:e.color)||j.colors[e.index]},D=s.map(((e,l)=>({label:e.label,value:e.value.toString(),color:j.colors[l%j.colors.length]})));return e.jsxs("div",{className:o("pie-chart",x["pie-chart"],m),children:[e.jsx("svg",{width:r,height:u,children:e.jsx(l.Group,{top:T,left:M,children:e.jsx(t.Pie,{data:s,pieValue:q.value,outerRadius:L-20,innerRadius:g,children:l=>l.arcs.map(((t,o)=>{const[i,a]=l.path.centroid(t),n=t.endAngle-t.startAngle>=.25,s=e=>F(e,t.data),r={d:l.path(t)||"",fill:q.fill(t)};return h&&(r.onMouseMove=s,r.onMouseLeave=b),e.jsxs("g",{children:[e.jsx("path",{...r}),n&&e.jsx("text",{x:i,y:a,dy:".33em",fill:j.labelBackgroundColor||d.labelBackgroundColor,fontSize:12,textAnchor:"middle",pointerEvents:"none",children:t.data.label})]},`arc-${o}`)}))})})}),_&&e.jsx(p,{items:D,orientation:f,className:x["pie-chart-legend"]}),h&&C&&N&&e.jsx(v,{data:N,top:k||0,left:w||0,style:{transform:"translate(-50%, -100%)"}})]})};
//# sourceMappingURL=index.cjs.js.map
