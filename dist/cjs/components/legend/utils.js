"use strict";function t(t){return t&&"object"==typeof t&&"value"in t&&void 0!==t.value?t.value:t}exports.labelTransformFactory=function({scale:t,labelFormat:e}){return(r,n)=>({datum:r,index:n,text:`${e(r,n)}`,value:t(r)})},exports.valueOrIdentity=t,exports.valueOrIdentityString=function(e){return String(t(e))};
//# sourceMappingURL=utils.js.map
