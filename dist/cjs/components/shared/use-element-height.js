"use strict";var e=require("react");exports.useElementHeight=function({initialHeight:t=0}={}){const[n,r]=e.useState(t),i=e.useRef(null);return[e.useCallback((e=>{if(i.current&&(i.current.disconnect(),i.current=null),e){const t=()=>{r(e.getBoundingClientRect().height||0)};t();const n=new window.ResizeObserver(t);n.observe(e),i.current=n}}),[]),n]};
//# sourceMappingURL=use-element-height.js.map
