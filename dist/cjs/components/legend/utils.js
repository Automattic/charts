"use strict";function e(e){return e&&"object"==typeof e&&"value"in e&&void 0!==e.value?e.value:e}require("@visx/scale"),exports.labelTransformFactory=function({scale:e,labelFormat:t}){return(r,n)=>({datum:r,index:n,text:`${t(r,n)}`,value:e(r)})},exports.valueOrIdentity=e,exports.valueOrIdentityString=function(t){return String(e(t))};
//# sourceMappingURL=utils.js.map
