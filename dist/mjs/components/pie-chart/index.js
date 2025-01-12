import*as e from"@visx/group";import*as t from"@visx/shape";import*as r from"clsx";import*as n from"@visx/event";import*as o from"@visx/tooltip";import*as a from"react";import*as l from"@visx/legend";import*as i from"@visx/scale";import*as c from"@visx/responsive";var u={d:(e,t)=>{for(var r in t)u.o(t,r)&&!u.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)},s={};function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=Array(t);r<t;r++)n[r]=e[r];return n}function p(e){return p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},p(e)}function m(e,t,r){return(t=function(e){var t=function(e){if("object"!=p(e)||!e)return e;var t=e[Symbol.toPrimitive];if(void 0!==t){var r=t.call(e,"string");if("object"!=p(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==p(t)?t:t+""}(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}u.d(s,{r:()=>z});const f=(v={Group:()=>e.Group},h={},u.d(h,v),h);var v,h;const g=(e=>{var t={};return u.d(t,e),t})({Pie:()=>t.Pie}),b=(e=>{var t={};return u.d(t,e),t})({default:()=>r.default}),y=(e=>{var t={};return u.d(t,e),t})({localPoint:()=>n.localPoint}),O=(e=>{var t={};return u.d(t,e),t})({useTooltip:()=>o.useTooltip}),w=(e=>{var t={};return u.d(t,e),t})({createContext:()=>a.createContext,useCallback:()=>a.useCallback,useContext:()=>a.useContext});var x={backgroundColor:"#FFFFFF",labelBackgroundColor:"#FFFFFF",colors:["#98C8DF","#006DAB","#A6DC80","#1F9828","#FF8C8F"],gridStyles:{stroke:"#787C82",strokeWidth:1},tickLength:0,gridColor:"",gridColorDark:""},E=(0,w.createContext)(x);const R=(e=>{var t={};return u.d(t,e),t})({LegendOrdinal:()=>l.LegendOrdinal}),P=(e=>{var t={};return u.d(t,e),t})({scaleOrdinal:()=>i.scaleOrdinal}),C={"legend--horizontal":"b1_5FxxoK4aEFLoe67IA","legend--vertical":"vpmQkJAPhp3XJ9Wb6vOw","legend-item":"IKM8KG1lF9e5NzDqMLOJ","legend-item-swatch":"_eccyBq0v2puKsHw8XND","legend-item-label":"UeZrUEpEK0tLzXHmeUco","legend-item-value":"R5msPOYKm79jYV13H0v7"};var j={horizontal:"row",vertical:"column"},F=function(e){var t=e.items,r=e.className,n=e.orientation,o=void 0===n?"horizontal":n,a=(0,P.scaleOrdinal)({domain:t.map((function(e){return e.label})),range:t.map((function(e){return e.color}))});return React.createElement("div",{className:(0,b.default)(C.legend,C["legend--".concat(o)],r),role:"list"},React.createElement(R.LegendOrdinal,{scale:a,direction:j[o],shape:"rect",shapeWidth:16,shapeHeight:16,className:C["legend-items"]},(function(e){return React.createElement("div",{className:C["legend--".concat(o)]},e.map((function(e){var r,n;return React.createElement("div",{key:e.text,className:C["legend-item"]},React.createElement("svg",{width:16,height:16},React.createElement("rect",{width:16,height:16,fill:e.value,className:C["legend-item-swatch"]})),React.createElement("span",{className:C["legend-item-label"]},e.text,(null===(r=t.find((function(t){return t.label===e.text})))||void 0===r?void 0:r.value)&&React.createElement("span",{className:C["legend-item-value"]},null===(n=t.find((function(t){return t.label===e.text})))||void 0===n?void 0:n.value)))})))})))};function S(){return S=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)({}).hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},S.apply(null,arguments)}const L=(e=>{var t={};return u.d(t,e),t})({useParentSize:()=>c.useParentSize});var k=function(e){var t=e.data;return React.createElement(React.Fragment,null,null==t?void 0:t.label,": ",(null==t?void 0:t.valueDisplay)||(null==t?void 0:t.value))},N=function(e){var t=e.data,r=e.top,n=e.left,o=e.component,a=void 0===o?k:o,l=e.children,i=e.className;return React.createElement("div",{className:"Jmgc7XAf2uAyK5059rBe",style:{top:r,left:n},role:"tooltip"},l||t&&React.createElement(a,{data:t,className:i}))};const A={"pie-chart":"R2Ly_tkJtgL0HA8P3fpm"};function D(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function T(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?D(Object(r),!0).forEach((function(t){m(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):D(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var M=function(e){var t=e.data,r=e.width,n=void 0===r?500:r,o=e.height,a=void 0===o?500:o,l=e.withTooltips,i=void 0!==l&&l,c=e.innerRadius,u=void 0===c?0:c,s=e.className,p=e.showLegend,m=e.legendOrientation,v=(0,w.useContext)(E),h=function(e){var t=e.withTooltips,r=(0,O.useTooltip)(),n=r.tooltipOpen,o=r.tooltipLeft,a=r.tooltipTop,l=r.tooltipData,i=r.hideTooltip,c=r.showTooltip;return{onMouseMove:(0,w.useCallback)((function(e,r){if(t){var n=(0,y.localPoint)(e);n&&c({tooltipData:r,tooltipLeft:n.x,tooltipTop:n.y-10})}}),[t,c]),onMouseLeave:(0,w.useCallback)((function(){t&&i()}),[t,i]),tooltipOpen:n,tooltipData:l||null,tooltipLeft:o,tooltipTop:a}}({withTooltips:i}),R=h.onMouseMove,P=h.onMouseLeave,C=h.tooltipOpen,j=h.tooltipData,S=h.tooltipLeft,L=h.tooltipTop,k=Math.min(n,a)/2,D=n/2,M=a/2,z=t.map((function(e,t){return T(T({},e),{},{index:t})})),K={value:function(e){return e.value},fill:function(e){return(null==e?void 0:e.color)||v.colors[e.index]}},B=t.map((function(e,t){return{label:e.label,value:e.value.toString(),color:v.colors[t%v.colors.length]}}));return React.createElement("div",{className:(0,b.default)("pie-chart",A["pie-chart"],s)},React.createElement("svg",{width:n,height:a},React.createElement(f.Group,{top:M,left:D},React.createElement(g.Pie,{data:z,pieValue:K.value,outerRadius:k-20,innerRadius:u},(function(e){return e.arcs.map((function(t,r){var n,o,a=(n=e.path.centroid(t),o=2,function(e){if(Array.isArray(e))return e}(n)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,a,l,i=[],c=!0,u=!1;try{if(a=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;c=!1}else for(;!(c=(n=a.call(r)).done)&&(i.push(n.value),i.length!==t);c=!0);}catch(e){u=!0,o=e}finally{try{if(!c&&null!=r.return&&(l=r.return(),Object(l)!==l))return}finally{if(u)throw o}}return i}}(n,o)||function(e,t){if(e){if("string"==typeof e)return d(e,t);var r={}.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?d(e,t):void 0}}(n,o)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),l=a[0],c=a[1],u=t.endAngle-t.startAngle>=.25,s={d:e.path(t)||"",fill:K.fill(t.data)};return i&&(s.onMouseMove=function(e){return R(e,t.data)},s.onMouseLeave=P),React.createElement("g",{key:"arc-".concat(r)},React.createElement("path",s),u&&React.createElement("text",{x:l,y:c,dy:".33em",fill:v.labelBackgroundColor||x.labelBackgroundColor,fontSize:12,textAnchor:"middle",pointerEvents:"none"},t.data.label))}))})))),p&&React.createElement(F,{items:B,orientation:m,className:A["pie-chart-legend"]}),i&&C&&j&&React.createElement(N,{data:j,top:L||0,left:S||0,style:{transform:"translate(-50%, -100%)"}}))};M.displayName="PieChart";const z=(K=M,H=(B={}).maxWidth,I=void 0===H?1200:H,G=void 0===(J=B.aspectRatio)?.5:J,W=void 0===(U=B.debounceTime)?50:U,function(e){var t=(0,L.useParentSize)({debounceTime:W,enableDebounceLeadingCall:!0,initialSize:{width:600,height:400}}),r=t.parentRef,n=t.width,o=n?Math.min(n,I):600,a=o*G;return React.createElement("div",{ref:r,style:{width:"100%",minHeight:"".concat(a,"px")}},React.createElement(K,S({width:o,height:a},e)))});var K,B,H,I,J,G,U,W,X=s.r;export{X as PieChart};
//# sourceMappingURL=index.js.map