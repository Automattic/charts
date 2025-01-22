import{jsx as e,jsxs as l,Fragment as t}from"react/jsx-runtime";import{localPoint as i}from"@visx/event";import{Group as a}from"@visx/group";import o from"@visx/shape/lib/shapes/Pie";import{Text as r}from"@visx/text";import{useTooltip as n}from"@visx/tooltip";import s from"clsx";import{createContext as d,useContext as c,useCallback as m}from"react";import{LegendOrdinal as h}from"@visx/legend";import{scaleOrdinal as p}from"@visx/scale";import{useParentSize as g}from"@visx/responsive";const u=d({backgroundColor:"#FFFFFF",labelBackgroundColor:"#FFFFFF",colors:["#98C8DF","#006DAB","#A6DC80","#1F9828","#FF8C8F"],gridStyles:{stroke:"#787C82",strokeWidth:1},tickLength:0,gridColor:"",gridColorDark:""});var v={"legend--horizontal":"legend-module__legend--horizontal__IUN13","legend--vertical":"legend-module__legend--vertical__Scfzo","legend-item":"legend-module__legend-item__feemn","legend-item-swatch":"legend-module__legend-item-swatch__nRyXf","legend-item-label":"legend-module__legend-item-label__ksx6I","legend-item-value":"legend-module__legend-item-value__d9x1j"};const _={horizontal:"row",vertical:"column"},f=({items:t,className:i,orientation:a="horizontal"})=>{const o=p({domain:t.map((e=>e.label)),range:t.map((e=>e.color))});return e("div",{className:s(v.legend,v[`legend--${a}`],i),role:"list",children:e(h,{scale:o,direction:_[a],shape:"rect",shapeWidth:16,shapeHeight:16,className:v["legend-items"],children:i=>e("div",{className:v[`legend--${a}`],children:i.map((i=>l("div",{className:v["legend-item"],children:[e("svg",{width:16,height:16,children:e("rect",{width:16,height:16,fill:i.value,className:v["legend-item-swatch"]})}),l("span",{className:v["legend-item-label"],children:[i.text,t.find((e=>e.label===i.text))?.value&&e("span",{className:v["legend-item-value"],children:t.find((e=>e.label===i.text))?.value})]})]},i.text)))})})})};var x="base-tooltip-module__tooltip__OfX6n";const b=({data:e})=>l(t,{children:[e?.label,": ",e?.valueDisplay||e?.value]}),N=({data:l,top:t,left:i,component:a=b,children:o,className:r})=>e("div",{className:x,style:{top:t,left:i},role:"tooltip",children:o||l&&e(a,{data:l,className:r})});var F="pie-semi-circle-chart-module__pie-semi-circle-chart__r5jk9",w="pie-semi-circle-chart-module__pie-semi-circle-chart-legend__c8W1Y",C="pie-semi-circle-chart-module__label__nPqOg",y="pie-semi-circle-chart-module__note__LpBZQ";const D=({data:t,size:d=500,label:h,note:p,className:g,withTooltips:v=!1,clockwise:_=!0,thickness:x=.4,showLegend:b,legendOrientation:D})=>{const k=c(u),{tooltipOpen:A,tooltipLeft:z,tooltipTop:M,tooltipData:P,hideTooltip:L,showTooltip:S}=n(),T=d/2,I=d/2,R=d/2,$=R*(1-x+.03),B=t.map(((e,l)=>({...e,index:l}))),O=_?-Math.PI/2:Math.PI/2,W=_?Math.PI/2:-Math.PI/2,j={value:e=>e.value,sort:(e,l)=>l.value-e.value,fill:e=>e.color||k.colors[e.index%k.colors.length]},H=m(((e,l)=>{const t=i(e);t&&S({tooltipData:l.data,tooltipLeft:t.x,tooltipTop:t.y-10})}),[S]),X=m((()=>{L()}),[L]),q=m((e=>l=>{H(l,e)}),[H]),Q=t.map(((e,l)=>({label:e.label,value:e.valueDisplay||e.value.toString(),color:j.fill({...e,index:l})})));return l("div",{className:s("pie-semi-circle-chart",F,g),children:[e("svg",{viewBox:`0 0 ${d} ${I}`,children:l(a,{top:T,left:T,children:[e(o,{data:B,pieValue:j.value,outerRadius:R,innerRadius:$,cornerRadius:3,padAngle:.03,startAngle:O,endAngle:W,pieSort:j.sort,children:l=>l.arcs.map((t=>e("g",{onMouseMove:q(t),onMouseLeave:X,children:e("path",{d:l.path(t)||"",fill:j.fill(t.data)})},t.data.label)))}),l(a,{children:[e(r,{textAnchor:"middle",verticalAnchor:"start",y:-40,className:C,children:h}),e(r,{textAnchor:"middle",verticalAnchor:"start",y:-20,className:y,children:p})]})]})}),v&&A&&P&&e(N,{data:{label:P.label,value:P.value,valueDisplay:P.valueDisplay},top:M||0,left:z||0}),b&&e(f,{items:Q,orientation:D,className:w})]})};D.displayName="PieSemiCircleChart";var k=function(l,t){const{maxWidth:i=1200,aspectRatio:a=.5,debounceTime:o=50}=t||{};return function(t){const{parentRef:r,width:n}=g({debounceTime:o,enableDebounceLeadingCall:!0,initialSize:{width:600,height:400}}),s=n?Math.min(n,i):600,d=s*a;return e("div",{ref:r,style:{width:"100%",minHeight:`${d}px`},children:e(l,{width:s,height:d,size:s,...t})})}}(D);export{k as PieSemiCircleChart};
//# sourceMappingURL=index.js.map
