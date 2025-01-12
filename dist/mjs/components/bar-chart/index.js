/*! For license information please see index.js.LICENSE.txt */
import*as e from"react";import*as t from"@visx/axis";import*as r from"@visx/event";import*as o from"@visx/group";import*as n from"@visx/scale";import*as i from"@visx/shape";import*as a from"@visx/tooltip";import*as l from"clsx";import*as s from"@visx/grid";import*as c from"@visx/legend";import*as d from"@visx/responsive";var u={572:(e,t,r)=>{var o=r(649),n=Symbol.for("react.element"),i=Symbol.for("react.fragment"),a=Object.prototype.hasOwnProperty,l=o.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,s={key:!0,ref:!0,__self:!0,__source:!0};function c(e,t,r){var o,i={},c=null,d=null;for(o in void 0!==r&&(c=""+r),void 0!==t.key&&(c=""+t.key),void 0!==t.ref&&(d=t.ref),t)a.call(t,o)&&!s.hasOwnProperty(o)&&(i[o]=t[o]);if(e&&e.defaultProps)for(o in t=e.defaultProps)void 0===i[o]&&(i[o]=t[o]);return{$$typeof:n,type:e,key:c,ref:d,props:i,_owner:l.current}}t.Fragment=i,t.jsx=c,t.jsxs=c},48:(e,t,r)=>{e.exports=r(572)},649:t=>{t.exports=e}},p={};function v(e){var t=p[e];if(void 0!==t)return t.exports;var r=p[e]={exports:{}};return u[e](r,r.exports,v),r.exports}v.d=(e,t)=>{for(var r in t)v.o(t,r)&&!v.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},v.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var f={};function m(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,o=Array(t);r<t;r++)o[r]=e[r];return o}function h(e){return function(e){if(Array.isArray(e))return m(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(e){if("string"==typeof e)return m(e,t);var r={}.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?m(e,t):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}v.d(f,{E:()=>X});const b=(g={AxisBottom:()=>t.AxisBottom,AxisLeft:()=>t.AxisLeft},x={},v.d(x,g),x);var g,x;const y=(e=>{var t={};return v.d(t,e),t})({localPoint:()=>r.localPoint}),j=(e=>{var t={};return v.d(t,e),t})({Group:()=>o.Group}),w=(e=>{var t={};return v.d(t,e),t})({scaleBand:()=>n.scaleBand,scaleLinear:()=>n.scaleLinear,scaleOrdinal:()=>n.scaleOrdinal}),O=(e=>{var t={};return v.d(t,e),t})({Bar:()=>i.Bar}),S=(e=>{var t={};return v.d(t,e),t})({useTooltip:()=>a.useTooltip}),P=(e=>{var t={};return v.d(t,e),t})({default:()=>l.default});var F=v(649),L={backgroundColor:"#FFFFFF",labelBackgroundColor:"#FFFFFF",colors:["#98C8DF","#006DAB","#A6DC80","#1F9828","#FF8C8F"],gridStyles:{stroke:"#787C82",strokeWidth:1},tickLength:0,gridColor:"",gridColorDark:""},N=v(48),C=(0,F.createContext)(L);const A=(e=>{var t={};return v.d(t,e),t})({GridColumns:()=>s.GridColumns,GridRows:()=>s.GridRows}),B=function(e){var t=e.width,r=e.height,o=e.xScale,n=e.yScale,i=e.gridVisibility,a=void 0===i?"x":i,l=e.top,s=void 0===l?0:l;return(0,N.jsxs)("g",{transform:"translate(0, ".concat(s,")"),className:"jfpeES0fbFrqCPR8dRN7",children:[a.includes("x")&&(0,N.jsx)(A.GridRows,{scale:o,width:t}),a.includes("y")&&(0,N.jsx)(A.GridColumns,{scale:n,height:r})]})},_=(e=>{var t={};return v.d(t,e),t})({LegendOrdinal:()=>c.LegendOrdinal}),E={"legend--horizontal":"b1_5FxxoK4aEFLoe67IA","legend--vertical":"vpmQkJAPhp3XJ9Wb6vOw","legend-item":"IKM8KG1lF9e5NzDqMLOJ","legend-item-swatch":"_eccyBq0v2puKsHw8XND","legend-item-label":"UeZrUEpEK0tLzXHmeUco","legend-item-value":"R5msPOYKm79jYV13H0v7"};var D={horizontal:"row",vertical:"column"},T=function(e){var t=e.items,r=e.className,o=e.orientation,n=void 0===o?"horizontal":o,i=(0,w.scaleOrdinal)({domain:t.map((function(e){return e.label})),range:t.map((function(e){return e.color}))});return(0,N.jsx)("div",{className:(0,P.default)(E.legend,E["legend--".concat(n)],r),role:"list",children:(0,N.jsx)(_.LegendOrdinal,{scale:i,direction:D[n],shape:"rect",shapeWidth:16,shapeHeight:16,className:E["legend-items"],children:function(e){return(0,N.jsx)("div",{className:E["legend--".concat(n)],children:e.map((function(e){var r,o;return(0,N.jsxs)("div",{className:E["legend-item"],children:[(0,N.jsx)("svg",{width:16,height:16,children:(0,N.jsx)("rect",{width:16,height:16,fill:e.value,className:E["legend-item-swatch"]})}),(0,N.jsxs)("span",{className:E["legend-item-label"],children:[e.text,(null===(r=t.find((function(t){return t.label===e.text})))||void 0===r?void 0:r.value)&&(0,N.jsx)("span",{className:E["legend-item-value"],children:null===(o=t.find((function(t){return t.label===e.text})))||void 0===o?void 0:o.value})]})]},e.text)}))})}})})};function k(e){return k="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},k(e)}function R(e,t,r){return(t=function(e){var t=function(e){if("object"!=k(e)||!e)return e;var t=e[Symbol.toPrimitive];if(void 0!==t){var r=t.call(e,"string");if("object"!=k(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==k(t)?t:t+""}(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}const G=(e=>{var t={};return v.d(t,e),t})({useParentSize:()=>d.useParentSize});function M(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function z(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?M(Object(r),!0).forEach((function(t){R(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):M(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var I=function(e){var t=e.data;return(0,N.jsxs)(N.Fragment,{children:[null==t?void 0:t.label,": ",(null==t?void 0:t.valueDisplay)||(null==t?void 0:t.value)]})},K=function(e){var t=e.data,r=e.top,o=e.left,n=e.component,i=void 0===n?I:n,a=e.children,l=e.className;return(0,N.jsx)("div",{className:"Jmgc7XAf2uAyK5059rBe",style:{top:r,left:o},role:"tooltip",children:a||t&&(0,N.jsx)(i,{data:t,className:l})})};const H={"bar-chart":"Vm_cn8YnIXBavFt6eHSp","bar-chart-legend":"e4dhKgBP7e6FBRAX2SrP"};var U=function(e){var t,r=e.data,o=e.margin,n=void 0===o?{top:20,right:20,bottom:40,left:40}:o,i=e.withTooltips,a=void 0!==i&&i,l=e.showLegend,s=void 0!==l&&l,c=e.legendOrientation,d=void 0===c?"horizontal":c,u=e.className,p=e.gridVisibility,v=void 0===p?"x":p,f=e.width,m=e.height,g=void 0===m?400:m,x=(0,F.useContext)(C),L=(0,S.useTooltip)(),A=L.tooltipOpen,_=L.tooltipLeft,E=L.tooltipTop,D=L.tooltipData,k=L.hideTooltip,R=L.showTooltip,G=(0,F.useCallback)((function(e,t,r,o,n){var i=(0,y.localPoint)(e);i&&R({tooltipData:{value:t,xLabel:r,yLabel:o,seriesIndex:n},tooltipLeft:i.x,tooltipTop:i.y-10})}),[R]),M=(0,F.useCallback)((function(){k()}),[k]);if(null==r||!r.length)return(0,N.jsx)("div",{className:(0,P.default)("bar-chart-empty",H["bat-chart-empty"]),children:"Empty..."});var z=n,I=f-z.left-z.right,U=g-z.top-z.bottom,X=null===(t=r[0].data)||void 0===t?void 0:t.map((function(e){return(null==e?void 0:e.label)||""})),V=(0,w.scaleBand)({range:[0,I],domain:X,padding:.2}),W=(0,w.scaleBand)({range:[0,V.bandwidth()],domain:r.map((function(e,t){return t.toString()})),padding:.1}),J=(0,w.scaleLinear)({range:[U,0],domain:[0,Math.max.apply(Math,h(r.map((function(e){return Math.max.apply(Math,h(e.data.map((function(e){return(null==e?void 0:e.value)||0}))))}))))]}),Y=r.map((function(e,t){return{label:e.label,value:"",color:x.colors[t%x.colors.length]}}));return(0,N.jsxs)("div",{className:(0,P.default)("bar-chart",u,H["bar-chart"]),children:[(0,N.jsx)("svg",{width:f,height:g,children:(0,N.jsxs)(j.Group,{left:z.left,top:z.top,children:[(0,N.jsx)(B,{width:I,height:U,xScale:V,yScale:J,gridVisibility:v}),r.map((function(e,t){return(0,N.jsx)(j.Group,{children:e.data.map((function(r){var o,n,i=V((null==r?void 0:r.label)||"");if(void 0===i)return null;var l=W.bandwidth(),s=i+(null!==(o=W(t.toString()))&&void 0!==o?o:0);return(0,N.jsx)(O.Bar,{x:s,y:J(r.value),width:l,height:U-(null!==(n=J(r.value))&&void 0!==n?n:0),fill:x.colors[t%x.colors.length],onMouseMove:a?function(o){return G(o,r.value,(null==r?void 0:r.label)||"",e.label,t)}:void 0,onMouseLeave:a?M:void 0},"bar-".concat(t,"-").concat(r.label))}))},t)})),(0,N.jsx)(b.AxisLeft,{scale:J}),(0,N.jsx)(b.AxisBottom,{scale:V,top:U})]})}),a&&A&&D&&(0,N.jsx)(K,{top:E||0,left:_||0,children:(0,N.jsxs)("div",{children:[(0,N.jsx)("div",{children:D.yLabel}),(0,N.jsxs)("div",{children:[D.xLabel,": ",D.value]})]})}),s&&(0,N.jsx)(T,{items:Y,orientation:d,className:H["bar-chart-legend"]})]})};U.displayName="BarChart";const X=(V=U,J=(W={}).maxWidth,Y=void 0===J?1200:J,$=void 0===(q=W.aspectRatio)?.5:q,Z=void 0===(Q=W.debounceTime)?50:Q,function(e){var t=(0,G.useParentSize)({debounceTime:Z,enableDebounceLeadingCall:!0,initialSize:{width:600,height:400}}),r=t.parentRef,o=t.width,n=o?Math.min(o,Y):600,i=n*$;return(0,N.jsx)("div",{ref:r,style:{width:"100%",minHeight:"".concat(i,"px")},children:(0,N.jsx)(V,z({width:n,height:i},e))})});var V,W,J,Y,q,$,Q,Z,ee=f.E;export{ee as BarChart};
//# sourceMappingURL=index.js.map