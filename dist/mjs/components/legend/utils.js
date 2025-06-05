import"@visx/scale";function e(e){return e&&"object"==typeof e&&"value"in e&&void 0!==e.value?e.value:e}function t(t){return String(e(t))}function n({scale:e,labelFormat:t}){return(n,u)=>({datum:n,index:u,text:`${t(n,u)}`,value:e(n)})}export{n as labelTransformFactory,e as valueOrIdentity,t as valueOrIdentityString};
//# sourceMappingURL=utils.js.map
