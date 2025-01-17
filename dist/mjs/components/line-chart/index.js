/*! For license information please see index.js.LICENSE.txt */
import*as e from"react";import*as t from"@visx/xychart";import*as r from"clsx";import*as n from"@visx/legend";import*as o from"@visx/scale";import*as i from"@visx/responsive";var l={572:(e,t,r)=>{var n=r(649),o=Symbol.for("react.element"),i=(Symbol.for("react.fragment"),Object.prototype.hasOwnProperty),l=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,a={key:!0,ref:!0,__self:!0,__source:!0};function c(e,t,r){var n,c={},s=null,u=null;for(n in void 0!==r&&(s=""+r),void 0!==t.key&&(s=""+t.key),void 0!==t.ref&&(u=t.ref),t)i.call(t,n)&&!a.hasOwnProperty(n)&&(c[n]=t[n]);if(e&&e.defaultProps)for(n in t=e.defaultProps)void 0===c[n]&&(c[n]=t[n]);return{$$typeof:o,type:e,key:s,ref:u,props:c,_owner:l.current}}t.jsx=c,t.jsxs=c},48:(e,t,r)=>{e.exports=r(572)},649:t=>{t.exports=e}},a={};function c(e){var t=a[e];if(void 0!==t)return t.exports;var r=a[e]={exports:{}};return l[e](r,r.exports,c),r.exports}c.d=(e,t)=>{for(var r in t)c.o(t,r)&&!c.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},c.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var s={};function u(e){return u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},u(e)}function d(e,t,r){return(t=function(e){var t=function(e){if("object"!=u(e)||!e)return e;var t=e[Symbol.toPrimitive];if(void 0!==t){var r=t.call(e,"string");if("object"!=u(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==u(t)?t:t+""}(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function m(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=Array(t);r<t;r++)n[r]=e[r];return n}c.d(s,{b:()=>T});const p=(f={AnimatedAxis:()=>t.AnimatedAxis,AnimatedGrid:()=>t.AnimatedGrid,AnimatedLineSeries:()=>t.AnimatedLineSeries,Tooltip:()=>t.Tooltip,XYChart:()=>t.XYChart,buildChartTheme:()=>t.buildChartTheme},v={},c.d(v,f),v);var f,v;const h=(e=>{var t={};return c.d(t,e),t})({default:()=>r.default});var y=c(649),b={backgroundColor:"#FFFFFF",labelBackgroundColor:"#FFFFFF",colors:["#98C8DF","#006DAB","#A6DC80","#1F9828","#FF8C8F"],gridStyles:{stroke:"#787C82",strokeWidth:1},tickLength:0,gridColor:"",gridColorDark:""},g=c(48),O=(0,y.createContext)(b);const j=(e=>{var t={};return c.d(t,e),t})({LegendOrdinal:()=>n.LegendOrdinal}),x=(e=>{var t={};return c.d(t,e),t})({scaleOrdinal:()=>o.scaleOrdinal}),w={"legend--horizontal":"b1_5FxxoK4aEFLoe67IA","legend--vertical":"vpmQkJAPhp3XJ9Wb6vOw","legend-item":"IKM8KG1lF9e5NzDqMLOJ","legend-item-swatch":"_eccyBq0v2puKsHw8XND","legend-item-label":"UeZrUEpEK0tLzXHmeUco","legend-item-value":"R5msPOYKm79jYV13H0v7"};var S={horizontal:"row",vertical:"column"},_=function(e){var t=e.items,r=e.className,n=e.orientation,o=void 0===n?"horizontal":n,i=(0,x.scaleOrdinal)({domain:t.map((function(e){return e.label})),range:t.map((function(e){return e.color}))});return(0,g.jsx)("div",{className:(0,h.default)(w.legend,w["legend--".concat(o)],r),role:"list",children:(0,g.jsx)(j.LegendOrdinal,{scale:i,direction:S[o],shape:"rect",shapeWidth:16,shapeHeight:16,className:w["legend-items"],children:function(e){return(0,g.jsx)("div",{className:w["legend--".concat(o)],children:e.map((function(e){var r,n;return(0,g.jsxs)("div",{className:w["legend-item"],children:[(0,g.jsx)("svg",{width:16,height:16,children:(0,g.jsx)("rect",{width:16,height:16,fill:e.value,className:w["legend-item-swatch"]})}),(0,g.jsxs)("span",{className:w["legend-item-label"],children:[e.text,(null===(r=t.find((function(t){return t.label===e.text})))||void 0===r?void 0:r.value)&&(0,g.jsx)("span",{className:w["legend-item-value"],children:null===(n=t.find((function(t){return t.label===e.text})))||void 0===n?void 0:n.value})]})]},e.text)}))})}})})};const k=(e=>{var t={};return c.d(t,e),t})({useParentSize:()=>i.useParentSize});function P(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function C(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?P(Object(r),!0).forEach((function(t){d(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):P(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}const D={"line-chart":"vbyo4J2HC_KvyGgsWui7","line-chart__tooltip":"nLSohGgB7OyUmLRN_dLD","line-chart__tooltip-date":"MGw7UT3IImVKXXuBYmwf","line-chart__tooltip-row":"KwvDxit9dbF2E6ZzF29e","line-chart__tooltip-label":"WmFS4ekGu9e3G6URbkhd"};function A(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function F(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?A(Object(r),!0).forEach((function(t){d(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):A(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var L=function(e){var t,r=e.tooltipData,n=null==r||null===(t=r.nearestDatum)||void 0===t?void 0:t.datum;if(!n)return null;var o=Object.entries((null==r?void 0:r.datumByKey)||{}).map((function(e){var t,r,n=(r=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,i,l,a=[],c=!0,s=!1;try{if(i=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;c=!1}else for(;!(c=(n=i.call(r)).done)&&(a.push(n.value),a.length!==t);c=!0);}catch(e){s=!0,o=e}finally{try{if(!c&&null!=r.return&&(l=r.return(),Object(l)!==l))return}finally{if(s)throw o}}return a}}(t,r)||function(e,t){if(e){if("string"==typeof e)return m(e,t);var r={}.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?m(e,t):void 0}}(t,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}());return{key:n[0],value:n[1].datum.value}})).sort((function(e,t){return t.value-e.value}));return(0,g.jsxs)("div",{className:D["line-chart__tooltip"],children:[(0,g.jsx)("div",{className:D["line-chart__tooltip-date"],children:n.date.toLocaleDateString()}),o.map((function(e){return(0,g.jsxs)("div",{className:D["line-chart__tooltip-row"],children:[(0,g.jsxs)("span",{className:D["line-chart__tooltip-label"],children:[e.key,":"]}),(0,g.jsx)("span",{className:D["line-chart__tooltip-value"],children:e.value})]},e.key)}))]})},N=function(e){return new Date(e).toLocaleDateString(void 0,{month:"short",day:"numeric"})};const T=(E=function(e){var t,r,n=e.data,o=e.width,i=e.height,l=e.margin,a=void 0===l?{top:20,right:20,bottom:40,left:40}:l,c=e.className,s=e.withTooltips,u=void 0===s||s,d=e.showLegend,m=void 0!==d&&d,f=e.legendOrientation,v=void 0===f?"horizontal":f,b=e.options,j=void 0===b?{}:b,x=(0,y.useContext)(O);if(null==n||!n.length)return(0,g.jsx)("div",{className:(0,h.default)("line-chart-empty",D["line-chart-empty"]),children:"Empty..."});var w=n.map((function(e,t){return{label:e.label,value:"",color:x.colors[t%x.colors.length]}})),S={xAccessor:function(e){return e.date},yAccessor:function(e){return e.value}},k=(0,p.buildChartTheme)({backgroundColor:x.backgroundColor,colors:x.colors,gridStyles:x.gridStyles,tickLength:(null==x?void 0:x.tickLength)||0,gridColor:(null==x?void 0:x.gridColor)||"",gridColorDark:(null==x?void 0:x.gridColorDark)||""});return(0,g.jsxs)("div",{className:(0,h.default)("line-chart",D["line-chart"],c),children:[(0,g.jsxs)(p.XYChart,{theme:k,width:o,height:i,margin:a,xScale:{type:"time"},yScale:{type:"linear",nice:!0},children:[(0,g.jsx)(p.AnimatedGrid,{columns:!1,numTicks:4}),(0,g.jsx)(p.AnimatedAxis,F({orientation:"bottom",numTicks:5,tickFormat:N},null==j||null===(t=j.axis)||void 0===t?void 0:t.x)),(0,g.jsx)(p.AnimatedAxis,F({orientation:"left",numTicks:4},null==j||null===(r=j.axis)||void 0===r?void 0:r.y)),n.map((function(e,t){return(0,g.jsx)(p.AnimatedLineSeries,F(F({dataKey:null==e?void 0:e.label,data:e.data},S),{},{stroke:k.colors[t%k.colors.length],strokeWidth:2}),null==e?void 0:e.label)})),u&&(0,g.jsx)(p.Tooltip,{snapTooltipToDatumX:!0,snapTooltipToDatumY:!0,showSeriesGlyphs:!0,renderTooltip:L})]}),m&&(0,g.jsx)(_,{items:w,orientation:v,className:D["line-chart-legend"]})]})},K=(z={}).maxWidth,G=void 0===K?1200:K,R=void 0===(I=z.aspectRatio)?.5:I,X=void 0===(U=z.debounceTime)?50:U,function(e){var t=(0,k.useParentSize)({debounceTime:X,enableDebounceLeadingCall:!0,initialSize:{width:600,height:400}}),r=t.parentRef,n=t.width,o=n?Math.min(n,G):600,i=o*R;return(0,g.jsx)("div",{ref:r,style:{width:"100%",minHeight:"".concat(i,"px")},children:(0,g.jsx)(E,C({width:o,height:i,size:o},e))})});var E,z,K,G,I,R,U,X,W=s.b;export{W as LineChart};
//# sourceMappingURL=index.js.map