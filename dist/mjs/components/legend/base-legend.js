import{jsx as e,jsxs as l}from"react/jsx-runtime";import{LegendOrdinal as a}from"@visx/legend";import{scaleOrdinal as i}from"@visx/scale";import t from"clsx";import"react";import s from"./legend.module.scss.js";const r={horizontal:"row",vertical:"column"},n=({items:n,className:m,orientation:c="horizontal"})=>{const d=i({domain:n.map((e=>e.label)),range:n.map((e=>e.color))});return e("div",{className:t(s.legend,s[`legend--${c}`],m),role:"list",children:e(a,{scale:d,direction:r[c],shape:"rect",shapeWidth:16,shapeHeight:16,className:s["legend-items"],children:a=>e("div",{className:s[`legend--${c}`],children:a.map((a=>l("div",{className:s["legend-item"],children:[e("svg",{width:16,height:16,children:e("rect",{width:16,height:16,fill:a.value,className:s["legend-item-swatch"]})}),l("span",{className:s["legend-item-label"],children:[a.text,n.find((e=>e.label===a.text))?.value&&e("span",{className:s["legend-item-value"],children:n.find((e=>e.label===a.text))?.value})]})]},a.text)))})})})};export{n as BaseLegend};
//# sourceMappingURL=base-legend.js.map
