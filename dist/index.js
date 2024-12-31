var Ee=Object.create;var Z=Object.defineProperty;var Ie=Object.getOwnPropertyDescriptor;var Xe=Object.getOwnPropertyNames;var Ve=Object.getPrototypeOf,Ke=Object.prototype.hasOwnProperty;var We=(e,t)=>{for(var o in t)Z(e,o,{get:t[o],enumerable:!0})},fe=(e,t,o,a)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of Xe(t))!Ke.call(e,r)&&r!==o&&Z(e,r,{get:()=>t[r],enumerable:!(a=Ie(t,r))||a.enumerable});return e};var W=(e,t,o)=>(o=e!=null?Ee(Ve(e)):{},fe(t||!e||!e.__esModule?Z(o,"default",{value:e,enumerable:!0}):o,e)),Ye=e=>fe(Z({},"__esModule",{value:!0}),e);var tt={};We(tt,{BarChart:()=>se,BaseTooltip:()=>N,Legend:()=>T,LineChart:()=>me,PieChart:()=>he,PieSemiCircleChart:()=>ge,ThemeProvider:()=>re,useChartMouseHandler:()=>te});module.exports=Ye(tt);var ee=require("@visx/axis"),De=require("@visx/event"),le=require("@visx/group"),U=require("@visx/scale"),Fe=require("@visx/shape"),ke=require("@visx/tooltip"),ie=W(require("clsx")),ne=require("react");var j=require("react");var Y={backgroundColor:"#FFFFFF",labelBackgroundColor:"#FFFFFF",colors:["#98C8DF","#006DAB","#A6DC80","#1F9828","#FF8C8F"],gridStyles:{stroke:"#787C82",strokeWidth:1},tickLength:0,gridColor:"",gridColorDark:""};var Ce=require("react/jsx-runtime"),ve=(0,j.createContext)(Y),B=()=>(0,j.useContext)(ve),re=({theme:e={},children:t})=>{let o={...Y,...e};return(0,Ce.jsx)(ve.Provider,{value:o,children:t})};var Q=require("@visx/grid");var be={"grid-control":"grid-control-module__grid-control___KOnZN"};var q=require("react/jsx-runtime"),He=({width:e,height:t,xScale:o,yScale:a,gridVisibility:r="x",top:i=0})=>(0,q.jsxs)("g",{transform:`translate(0, ${i})`,className:be["grid-control"],children:[r.includes("x")&&(0,q.jsx)(Q.GridRows,{scale:o,width:e}),r.includes("y")&&(0,q.jsx)(Q.GridColumns,{scale:a,height:t})]}),ae=He;var ye=require("@visx/legend"),xe=require("@visx/scale"),Pe=W(require("clsx"));var S={"legend--horizontal":"legend-module__legend--horizontal___IUN13","legend--vertical":"legend-module__legend--vertical___Scfzo","legend-item":"legend-module__legend-item___feemn","legend-item-swatch":"legend-module__legend-item-swatch___nRyXf","legend-item-label":"legend-module__legend-item-label___ksx6I","legend-item-value":"legend-module__legend-item-value___d9x1j"};var k=require("react/jsx-runtime"),qe={horizontal:"row",vertical:"column"},T=({items:e,className:t,orientation:o="horizontal"})=>{let a=(0,xe.scaleOrdinal)({domain:e.map(r=>r.label),range:e.map(r=>r.color)});return(0,k.jsx)("div",{className:(0,Pe.default)(S.legend,S[`legend--${o}`],t),role:"list",children:(0,k.jsx)(ye.LegendOrdinal,{scale:a,direction:qe[o],shape:"rect",shapeWidth:16,shapeHeight:16,className:S["legend-items"],children:r=>(0,k.jsx)("div",{className:S[`legend--${o}`],children:r.map(i=>(0,k.jsxs)("div",{className:S["legend-item"],children:[(0,k.jsx)("svg",{width:16,height:16,children:(0,k.jsx)("rect",{width:16,height:16,fill:i.value,className:S["legend-item-swatch"]})}),(0,k.jsxs)("span",{className:S["legend-item-label"],children:[i.text,e.find(_=>_.label===i.text)?.value&&(0,k.jsx)("span",{className:S["legend-item-value"],children:e.find(_=>_.label===i.text)?.value})]})]},i.text))})})})};var Te={tooltip:"base-tooltip-module__tooltip___OfX6n"};var E=require("react/jsx-runtime"),Ue=({data:e})=>(0,E.jsxs)(E.Fragment,{children:[e?.label,": ",e?.valueDisplay||e?.value]}),N=({data:e,top:t,left:o,component:a=Ue,children:r,className:i})=>(0,E.jsx)("div",{className:Te.tooltip,style:{top:t,left:o},role:"tooltip",children:r||(0,E.jsx)(a,{data:e,className:i})});var J={"bar-chart":"bar-chart-module__bar-chart___lmYNi","bar-chart-legend":"bar-chart-module__bar-chart-legend___vgKKq"};var h=require("react/jsx-runtime"),Me=({data:e,width:t,height:o,margin:a={top:20,right:20,bottom:40,left:40},withTooltips:r=!1,showLegend:i=!1,legendOrientation:_="horizontal",className:M,gridVisibility:s="x"})=>{let b=B(),{tooltipOpen:F,tooltipLeft:g,tooltipTop:c,tooltipData:y,hideTooltip:L,showTooltip:z}=(0,ke.useTooltip)(),I=(0,ne.useCallback)((d,m,x,K,l)=>{let n=(0,De.localPoint)(d);n&&z({tooltipData:{value:m,xLabel:x,yLabel:K,seriesIndex:l},tooltipLeft:n.x,tooltipTop:n.y-10})},[z]),X=(0,ne.useCallback)(()=>{L()},[L]);if(!e?.length)return(0,h.jsx)("div",{className:(0,ie.default)("bar-chart-empty",J["bat-chart-empty"]),children:"Empty..."});let P=a,O=t-P.left-P.right,p=o-P.top-P.bottom,f=e[0].data?.map(d=>d?.label),w=(0,U.scaleBand)({range:[0,O],domain:f,padding:.2}),V=(0,U.scaleBand)({range:[0,w.bandwidth()],domain:e.map((d,m)=>m.toString()),padding:.1}),G=(0,U.scaleLinear)({range:[p,0],domain:[0,Math.max(...e.map(d=>Math.max(...d.data.map(m=>m?.value||0))))]}),R=e.map((d,m)=>({label:d.label,value:"",color:b.colors[m%b.colors.length]}));return(0,h.jsxs)("div",{className:(0,ie.default)("bar-chart",M,J["bar-chart"]),children:[(0,h.jsx)("svg",{width:t,height:o,children:(0,h.jsxs)(le.Group,{left:P.left,top:P.top,children:[(0,h.jsx)(ae,{width:O,height:p,xScale:w,yScale:G,gridVisibility:s}),e.map((d,m)=>(0,h.jsx)(le.Group,{children:d.data.map(x=>{let K=w(x.label);if(K===void 0)return null;let l=V.bandwidth(),n=K+(V(m.toString())??0),H=Oe=>I(Oe,x.value,x.label,d.label,m);return(0,h.jsx)(Fe.Bar,{x:n,y:G(x.value),width:l,height:p-(G(x.value)??0),fill:b.colors[m%b.colors.length],onMouseMove:r?H:void 0,onMouseLeave:r?X:void 0},`bar-${m}-${x.label}`)})},m)),(0,h.jsx)(ee.AxisLeft,{scale:G}),(0,h.jsx)(ee.AxisBottom,{scale:w,top:p})]})}),r&&F&&y&&(0,h.jsx)(N,{top:c,left:g,children:(0,h.jsxs)("div",{children:[(0,h.jsx)("div",{children:y.yLabel}),(0,h.jsxs)("div",{children:[y.xLabel,": ",y.value]})]})}),i&&(0,h.jsx)(T,{items:R,orientation:_,className:J["bar-chart-legend"]})]})};Me.displayName="BarChart";var se=Me;var v=require("@visx/xychart"),pe=W(require("clsx"));var A={"line-chart":"line-chart-module__line-chart___ITM3d","line-chart__tooltip":"line-chart-module__line-chart__tooltip___aqcme","line-chart__tooltip-date":"line-chart-module__line-chart__tooltip-date___4Dzab","line-chart__tooltip-row":"line-chart-module__line-chart__tooltip-row___6A37G","line-chart__tooltip-label":"line-chart-module__line-chart__tooltip-label___IvnFF"};var u=require("react/jsx-runtime"),$e=({tooltipData:e})=>{let t=e?.nearestDatum?.datum;if(!t)return null;let o=Object.entries(e?.datumByKey||{}).map(([a,{datum:r}])=>({key:a,value:r.value})).sort((a,r)=>r.value-a.value);return(0,u.jsxs)("div",{className:A["line-chart__tooltip"],children:[(0,u.jsx)("div",{className:A["line-chart__tooltip-date"],children:t.date.toLocaleDateString()}),o.map(a=>(0,u.jsxs)("div",{className:A["line-chart__tooltip-row"],children:[(0,u.jsxs)("span",{className:A["line-chart__tooltip-label"],children:[a.key,":"]}),(0,u.jsx)("span",{className:A["line-chart__tooltip-value"],children:a.value})]},a.key))]})},Ze=e=>new Date(e).toLocaleDateString(void 0,{month:"short",day:"numeric"}),je=({data:e,width:t,height:o,margin:a={top:20,right:20,bottom:40,left:40},className:r,withTooltips:i=!0,showLegend:_=!1,legendOrientation:M="horizontal"})=>{let s=B();if(!e?.length)return(0,u.jsx)("div",{className:(0,pe.default)("line-chart-empty",A["line-chart-empty"]),children:"Empty..."});let b=e.map((c,y)=>({label:c.label,value:"",color:s.colors[y%s.colors.length]})),F={xAccessor:c=>c.date,yAccessor:c=>c.value},g=(0,v.buildChartTheme)({backgroundColor:s.backgroundColor,colors:s.colors,gridStyles:s.gridStyles,tickLength:s?.tickLength||0,gridColor:s?.gridColor||"",gridColorDark:s?.gridColorDark||""});return(0,u.jsxs)("div",{className:(0,pe.default)("line-chart",A["line-chart"],r),children:[(0,u.jsxs)(v.XYChart,{theme:g,width:t,height:o,margin:a,xScale:{type:"time"},yScale:{type:"linear",nice:!0},children:[(0,u.jsx)(v.AnimatedGrid,{columns:!1,numTicks:4}),(0,u.jsx)(v.AnimatedAxis,{orientation:"bottom",numTicks:5,tickFormat:Ze}),(0,u.jsx)(v.AnimatedAxis,{orientation:"left",numTicks:4}),e.map((c,y)=>(0,u.jsx)(v.AnimatedLineSeries,{dataKey:c?.label,data:c.data,...F,stroke:g.colors[y%g.colors.length],strokeWidth:2},c?.label)),i&&(0,u.jsx)(v.Tooltip,{snapTooltipToDatumX:!0,snapTooltipToDatumY:!0,showSeriesGlyphs:!0,renderTooltip:$e})]}),_&&(0,u.jsx)(T,{items:b,orientation:M,className:A["line-chart-legend"]})]})},me=je;var Se=require("@visx/group"),Ne=require("@visx/shape"),Ae=W(require("clsx"));var Le=require("@visx/event"),Be=require("@visx/tooltip"),ce=require("react"),Qe=({withTooltips:e})=>{let{tooltipOpen:t,tooltipLeft:o,tooltipTop:a,tooltipData:r,hideTooltip:i,showTooltip:_}=(0,Be.useTooltip)(),M=(0,ce.useCallback)((b,F)=>{if(!e)return;let g=(0,Le.localPoint)(b);g&&_({tooltipData:F,tooltipLeft:g.x,tooltipTop:g.y-10})},[e,_]),s=(0,ce.useCallback)(()=>{e&&i()},[e,i]);return{onMouseMove:M,onMouseLeave:s,tooltipOpen:t,tooltipData:r,tooltipLeft:o,tooltipTop:a}},te=Qe;var de={"pie-chart":"pie-chart-module__pie-chart___R12Vh"};var D=require("react/jsx-runtime"),Je=({data:e,width:t,height:o,withTooltips:a=!1,innerRadius:r=0,className:i,showLegend:_,legendOrientation:M})=>{let s=B(),{onMouseMove:b,onMouseLeave:F,tooltipOpen:g,tooltipData:c,tooltipLeft:y,tooltipTop:L}=te({withTooltips:a}),z=Math.min(t,o)/2,I=t/2,X=o/2,P={value:p=>p.value,fill:p=>p.color||s.colors[p.index]},O=e.map((p,f)=>({label:p.label,value:p.value.toString(),color:s.colors[f%s.colors.length]}));return(0,D.jsxs)("div",{className:(0,Ae.default)("pie-chart",de["pie-chart"],i),children:[(0,D.jsx)("svg",{width:t,height:o,children:(0,D.jsx)(Se.Group,{top:X,left:I,children:(0,D.jsx)(Ne.Pie,{data:e,pieValue:P.value,outerRadius:z-20,innerRadius:r,children:p=>p.arcs.map((f,w)=>{let[V,G]=p.path.centroid(f),R=f.endAngle-f.startAngle>=.25,d=x=>b(x,f.data),m={d:p.path(f)||"",fill:P.fill(f)};return a&&(m.onMouseMove=d,m.onMouseLeave=F),(0,D.jsxs)("g",{children:[(0,D.jsx)("path",{...m}),R&&(0,D.jsx)("text",{x:V,y:G,dy:".33em",fill:s.labelBackgroundColor||Y.labelBackgroundColor,fontSize:12,textAnchor:"middle",pointerEvents:"none",children:f.data.label})]},`arc-${w}`)})})})}),_&&(0,D.jsx)(T,{items:O,orientation:M,className:de["pie-chart-legend"]}),a&&g&&c&&(0,D.jsx)(N,{data:c,top:L,left:y,style:{transform:"translate(-50%, -100%)"}})]})},he=Je;var we=require("@visx/event"),ue=require("@visx/group"),Ge=W(require("@visx/shape/lib/shapes/Pie")),_e=require("@visx/text"),Re=require("@visx/tooltip"),ze=W(require("clsx")),oe=require("react");var $={"pie-semi-circle-chart":"pie-semi-circle-chart-module__pie-semi-circle-chart___r5jk9","pie-semi-circle-chart-legend":"pie-semi-circle-chart-module__pie-semi-circle-chart-legend___c8W1Y",label:"pie-semi-circle-chart-module__label___nPqOg",note:"pie-semi-circle-chart-module__note___LpBZQ"};var C=require("react/jsx-runtime"),et=({data:e,width:t,label:o,note:a,className:r,withTooltips:i=!1,clockwise:_=!0,thickness:M=.4,showLegend:s,legendOrientation:b})=>{let F=B(),{tooltipOpen:g,tooltipLeft:c,tooltipTop:y,tooltipData:L,hideTooltip:z,showTooltip:I}=(0,Re.useTooltip)(),X=t/2,P=t/2,O=t/2,p=.03,f=O*(1-M+p),w=e.map((l,n)=>({...l,index:n})),V=_?-Math.PI/2:Math.PI/2,G=_?Math.PI/2:-Math.PI/2,R={value:l=>l.value,sort:(l,n)=>n.value-l.value,fill:l=>l.color||F.colors[l.index%F.colors.length]},d=(0,oe.useCallback)((l,n)=>{let H=(0,we.localPoint)(l);H&&I({tooltipData:n.data,tooltipLeft:H.x,tooltipTop:H.y-10})},[I]),m=(0,oe.useCallback)(()=>{z()},[z]),x=(0,oe.useCallback)(l=>n=>{d(n,l)},[d]),K=e.map((l,n)=>({label:l.label,value:l.valueDisplay||l.value.toString(),color:R.fill({...l,index:n})}));return(0,C.jsxs)("div",{className:(0,ze.default)("pie-semi-circle-chart",$["pie-semi-circle-chart"],r),children:[(0,C.jsx)("svg",{width:t,height:P,children:(0,C.jsxs)(ue.Group,{top:X,left:X,children:[(0,C.jsx)(Ge.default,{data:w,pieValue:R.value,outerRadius:O,innerRadius:f,cornerRadius:3,padAngle:p,startAngle:V,endAngle:G,pieSort:R.sort,children:l=>l.arcs.map(n=>(0,C.jsx)("g",{onMouseMove:x(n),onMouseLeave:m,children:(0,C.jsx)("path",{d:l.path(n)||"",fill:R.fill(n.data)})},n.data.label))}),(0,C.jsxs)(ue.Group,{children:[(0,C.jsx)(_e.Text,{textAnchor:"middle",verticalAnchor:"start",y:-40,className:$.label,children:o}),(0,C.jsx)(_e.Text,{textAnchor:"middle",verticalAnchor:"start",y:-20,className:$.note,children:a})]})]})}),i&&g&&L&&(0,C.jsx)(N,{data:{label:L.label,value:L.value,valueDisplay:L.valueDisplay},top:y,left:c}),s&&(0,C.jsx)(T,{items:K,orientation:b,className:$["pie-semi-circle-chart-legend"]})]})},ge=et;0&&(module.exports={BarChart,BaseTooltip,Legend,LineChart,PieChart,PieSemiCircleChart,ThemeProvider,useChartMouseHandler});
//# sourceMappingURL=index.js.map