import {
  getStringWidth
} from "./chunk-NFRB2POF.js";
import {
  __commonJS,
  __export,
  __toESM
} from "./chunk-G3PMV62Z.js";

// ../../../node_modules/.pnpm/fast-deep-equal@3.1.3/node_modules/fast-deep-equal/index.js
var require_fast_deep_equal = __commonJS({
  "../../../node_modules/.pnpm/fast-deep-equal@3.1.3/node_modules/fast-deep-equal/index.js"(exports, module) {
    "use strict";
    module.exports = function equal(a2, b2) {
      if (a2 === b2) return true;
      if (a2 && b2 && typeof a2 == "object" && typeof b2 == "object") {
        if (a2.constructor !== b2.constructor) return false;
        var length2, i2, keys;
        if (Array.isArray(a2)) {
          length2 = a2.length;
          if (length2 != b2.length) return false;
          for (i2 = length2; i2-- !== 0; )
            if (!equal(a2[i2], b2[i2])) return false;
          return true;
        }
        if (a2.constructor === RegExp) return a2.source === b2.source && a2.flags === b2.flags;
        if (a2.valueOf !== Object.prototype.valueOf) return a2.valueOf() === b2.valueOf();
        if (a2.toString !== Object.prototype.toString) return a2.toString() === b2.toString();
        keys = Object.keys(a2);
        length2 = keys.length;
        if (length2 !== Object.keys(b2).length) return false;
        for (i2 = length2; i2-- !== 0; )
          if (!Object.prototype.hasOwnProperty.call(b2, keys[i2])) return false;
        for (i2 = length2; i2-- !== 0; ) {
          var key = keys[i2];
          if (!equal(a2[key], b2[key])) return false;
        }
        return true;
      }
      return a2 !== a2 && b2 !== b2;
    };
  }
});

// ../../../node_modules/.pnpm/react-is@16.13.1/node_modules/react-is/cjs/react-is.production.min.js
var require_react_is_production_min = __commonJS({
  "../../../node_modules/.pnpm/react-is@16.13.1/node_modules/react-is/cjs/react-is.production.min.js"(exports) {
    "use strict";
    var b2 = "function" === typeof Symbol && Symbol.for;
    var c2 = b2 ? /* @__PURE__ */ Symbol.for("react.element") : 60103;
    var d2 = b2 ? /* @__PURE__ */ Symbol.for("react.portal") : 60106;
    var e2 = b2 ? /* @__PURE__ */ Symbol.for("react.fragment") : 60107;
    var f2 = b2 ? /* @__PURE__ */ Symbol.for("react.strict_mode") : 60108;
    var g2 = b2 ? /* @__PURE__ */ Symbol.for("react.profiler") : 60114;
    var h2 = b2 ? /* @__PURE__ */ Symbol.for("react.provider") : 60109;
    var k2 = b2 ? /* @__PURE__ */ Symbol.for("react.context") : 60110;
    var l2 = b2 ? /* @__PURE__ */ Symbol.for("react.async_mode") : 60111;
    var m2 = b2 ? /* @__PURE__ */ Symbol.for("react.concurrent_mode") : 60111;
    var n2 = b2 ? /* @__PURE__ */ Symbol.for("react.forward_ref") : 60112;
    var p2 = b2 ? /* @__PURE__ */ Symbol.for("react.suspense") : 60113;
    var q = b2 ? /* @__PURE__ */ Symbol.for("react.suspense_list") : 60120;
    var r2 = b2 ? /* @__PURE__ */ Symbol.for("react.memo") : 60115;
    var t2 = b2 ? /* @__PURE__ */ Symbol.for("react.lazy") : 60116;
    var v2 = b2 ? /* @__PURE__ */ Symbol.for("react.block") : 60121;
    var w2 = b2 ? /* @__PURE__ */ Symbol.for("react.fundamental") : 60117;
    var x2 = b2 ? /* @__PURE__ */ Symbol.for("react.responder") : 60118;
    var y2 = b2 ? /* @__PURE__ */ Symbol.for("react.scope") : 60119;
    function z(a2) {
      if ("object" === typeof a2 && null !== a2) {
        var u2 = a2.$$typeof;
        switch (u2) {
          case c2:
            switch (a2 = a2.type, a2) {
              case l2:
              case m2:
              case e2:
              case g2:
              case f2:
              case p2:
                return a2;
              default:
                switch (a2 = a2 && a2.$$typeof, a2) {
                  case k2:
                  case n2:
                  case t2:
                  case r2:
                  case h2:
                    return a2;
                  default:
                    return u2;
                }
            }
          case d2:
            return u2;
        }
      }
    }
    function A(a2) {
      return z(a2) === m2;
    }
    exports.AsyncMode = l2;
    exports.ConcurrentMode = m2;
    exports.ContextConsumer = k2;
    exports.ContextProvider = h2;
    exports.Element = c2;
    exports.ForwardRef = n2;
    exports.Fragment = e2;
    exports.Lazy = t2;
    exports.Memo = r2;
    exports.Portal = d2;
    exports.Profiler = g2;
    exports.StrictMode = f2;
    exports.Suspense = p2;
    exports.isAsyncMode = function(a2) {
      return A(a2) || z(a2) === l2;
    };
    exports.isConcurrentMode = A;
    exports.isContextConsumer = function(a2) {
      return z(a2) === k2;
    };
    exports.isContextProvider = function(a2) {
      return z(a2) === h2;
    };
    exports.isElement = function(a2) {
      return "object" === typeof a2 && null !== a2 && a2.$$typeof === c2;
    };
    exports.isForwardRef = function(a2) {
      return z(a2) === n2;
    };
    exports.isFragment = function(a2) {
      return z(a2) === e2;
    };
    exports.isLazy = function(a2) {
      return z(a2) === t2;
    };
    exports.isMemo = function(a2) {
      return z(a2) === r2;
    };
    exports.isPortal = function(a2) {
      return z(a2) === d2;
    };
    exports.isProfiler = function(a2) {
      return z(a2) === g2;
    };
    exports.isStrictMode = function(a2) {
      return z(a2) === f2;
    };
    exports.isSuspense = function(a2) {
      return z(a2) === p2;
    };
    exports.isValidElementType = function(a2) {
      return "string" === typeof a2 || "function" === typeof a2 || a2 === e2 || a2 === m2 || a2 === g2 || a2 === f2 || a2 === p2 || a2 === q || "object" === typeof a2 && null !== a2 && (a2.$$typeof === t2 || a2.$$typeof === r2 || a2.$$typeof === h2 || a2.$$typeof === k2 || a2.$$typeof === n2 || a2.$$typeof === w2 || a2.$$typeof === x2 || a2.$$typeof === y2 || a2.$$typeof === v2);
    };
    exports.typeOf = z;
  }
});

// ../../../node_modules/.pnpm/react-is@16.13.1/node_modules/react-is/cjs/react-is.development.js
var require_react_is_development = __commonJS({
  "../../../node_modules/.pnpm/react-is@16.13.1/node_modules/react-is/cjs/react-is.development.js"(exports) {
    "use strict";
    if (process.env.NODE_ENV !== "production") {
      (function() {
        "use strict";
        var hasSymbol = typeof Symbol === "function" && Symbol.for;
        var REACT_ELEMENT_TYPE = hasSymbol ? /* @__PURE__ */ Symbol.for("react.element") : 60103;
        var REACT_PORTAL_TYPE = hasSymbol ? /* @__PURE__ */ Symbol.for("react.portal") : 60106;
        var REACT_FRAGMENT_TYPE = hasSymbol ? /* @__PURE__ */ Symbol.for("react.fragment") : 60107;
        var REACT_STRICT_MODE_TYPE = hasSymbol ? /* @__PURE__ */ Symbol.for("react.strict_mode") : 60108;
        var REACT_PROFILER_TYPE = hasSymbol ? /* @__PURE__ */ Symbol.for("react.profiler") : 60114;
        var REACT_PROVIDER_TYPE = hasSymbol ? /* @__PURE__ */ Symbol.for("react.provider") : 60109;
        var REACT_CONTEXT_TYPE = hasSymbol ? /* @__PURE__ */ Symbol.for("react.context") : 60110;
        var REACT_ASYNC_MODE_TYPE = hasSymbol ? /* @__PURE__ */ Symbol.for("react.async_mode") : 60111;
        var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? /* @__PURE__ */ Symbol.for("react.concurrent_mode") : 60111;
        var REACT_FORWARD_REF_TYPE = hasSymbol ? /* @__PURE__ */ Symbol.for("react.forward_ref") : 60112;
        var REACT_SUSPENSE_TYPE = hasSymbol ? /* @__PURE__ */ Symbol.for("react.suspense") : 60113;
        var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? /* @__PURE__ */ Symbol.for("react.suspense_list") : 60120;
        var REACT_MEMO_TYPE = hasSymbol ? /* @__PURE__ */ Symbol.for("react.memo") : 60115;
        var REACT_LAZY_TYPE2 = hasSymbol ? /* @__PURE__ */ Symbol.for("react.lazy") : 60116;
        var REACT_BLOCK_TYPE = hasSymbol ? /* @__PURE__ */ Symbol.for("react.block") : 60121;
        var REACT_FUNDAMENTAL_TYPE = hasSymbol ? /* @__PURE__ */ Symbol.for("react.fundamental") : 60117;
        var REACT_RESPONDER_TYPE = hasSymbol ? /* @__PURE__ */ Symbol.for("react.responder") : 60118;
        var REACT_SCOPE_TYPE = hasSymbol ? /* @__PURE__ */ Symbol.for("react.scope") : 60119;
        function isValidElementType(type) {
          return typeof type === "string" || typeof type === "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
          type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === "object" && type !== null && (type.$$typeof === REACT_LAZY_TYPE2 || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
        }
        function typeOf(object) {
          if (typeof object === "object" && object !== null) {
            var $$typeof = object.$$typeof;
            switch ($$typeof) {
              case REACT_ELEMENT_TYPE:
                var type = object.type;
                switch (type) {
                  case REACT_ASYNC_MODE_TYPE:
                  case REACT_CONCURRENT_MODE_TYPE:
                  case REACT_FRAGMENT_TYPE:
                  case REACT_PROFILER_TYPE:
                  case REACT_STRICT_MODE_TYPE:
                  case REACT_SUSPENSE_TYPE:
                    return type;
                  default:
                    var $$typeofType = type && type.$$typeof;
                    switch ($$typeofType) {
                      case REACT_CONTEXT_TYPE:
                      case REACT_FORWARD_REF_TYPE:
                      case REACT_LAZY_TYPE2:
                      case REACT_MEMO_TYPE:
                      case REACT_PROVIDER_TYPE:
                        return $$typeofType;
                      default:
                        return $$typeof;
                    }
                }
              case REACT_PORTAL_TYPE:
                return $$typeof;
            }
          }
          return void 0;
        }
        var AsyncMode = REACT_ASYNC_MODE_TYPE;
        var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
        var ContextConsumer = REACT_CONTEXT_TYPE;
        var ContextProvider = REACT_PROVIDER_TYPE;
        var Element = REACT_ELEMENT_TYPE;
        var ForwardRef = REACT_FORWARD_REF_TYPE;
        var Fragment6 = REACT_FRAGMENT_TYPE;
        var Lazy = REACT_LAZY_TYPE2;
        var Memo = REACT_MEMO_TYPE;
        var Portal = REACT_PORTAL_TYPE;
        var Profiler = REACT_PROFILER_TYPE;
        var StrictMode2 = REACT_STRICT_MODE_TYPE;
        var Suspense2 = REACT_SUSPENSE_TYPE;
        var hasWarnedAboutDeprecatedIsAsyncMode = false;
        function isAsyncMode(object) {
          {
            if (!hasWarnedAboutDeprecatedIsAsyncMode) {
              hasWarnedAboutDeprecatedIsAsyncMode = true;
              console["warn"]("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.");
            }
          }
          return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
        }
        function isConcurrentMode(object) {
          return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
        }
        function isContextConsumer(object) {
          return typeOf(object) === REACT_CONTEXT_TYPE;
        }
        function isContextProvider(object) {
          return typeOf(object) === REACT_PROVIDER_TYPE;
        }
        function isElement(object) {
          return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
        }
        function isForwardRef(object) {
          return typeOf(object) === REACT_FORWARD_REF_TYPE;
        }
        function isFragment(object) {
          return typeOf(object) === REACT_FRAGMENT_TYPE;
        }
        function isLazy(object) {
          return typeOf(object) === REACT_LAZY_TYPE2;
        }
        function isMemo(object) {
          return typeOf(object) === REACT_MEMO_TYPE;
        }
        function isPortal(object) {
          return typeOf(object) === REACT_PORTAL_TYPE;
        }
        function isProfiler(object) {
          return typeOf(object) === REACT_PROFILER_TYPE;
        }
        function isStrictMode(object) {
          return typeOf(object) === REACT_STRICT_MODE_TYPE;
        }
        function isSuspense(object) {
          return typeOf(object) === REACT_SUSPENSE_TYPE;
        }
        exports.AsyncMode = AsyncMode;
        exports.ConcurrentMode = ConcurrentMode;
        exports.ContextConsumer = ContextConsumer;
        exports.ContextProvider = ContextProvider;
        exports.Element = Element;
        exports.ForwardRef = ForwardRef;
        exports.Fragment = Fragment6;
        exports.Lazy = Lazy;
        exports.Memo = Memo;
        exports.Portal = Portal;
        exports.Profiler = Profiler;
        exports.StrictMode = StrictMode2;
        exports.Suspense = Suspense2;
        exports.isAsyncMode = isAsyncMode;
        exports.isConcurrentMode = isConcurrentMode;
        exports.isContextConsumer = isContextConsumer;
        exports.isContextProvider = isContextProvider;
        exports.isElement = isElement;
        exports.isForwardRef = isForwardRef;
        exports.isFragment = isFragment;
        exports.isLazy = isLazy;
        exports.isMemo = isMemo;
        exports.isPortal = isPortal;
        exports.isProfiler = isProfiler;
        exports.isStrictMode = isStrictMode;
        exports.isSuspense = isSuspense;
        exports.isValidElementType = isValidElementType;
        exports.typeOf = typeOf;
      })();
    }
  }
});

// ../../../node_modules/.pnpm/react-is@16.13.1/node_modules/react-is/index.js
var require_react_is = __commonJS({
  "../../../node_modules/.pnpm/react-is@16.13.1/node_modules/react-is/index.js"(exports, module) {
    "use strict";
    if (process.env.NODE_ENV === "production") {
      module.exports = require_react_is_production_min();
    } else {
      module.exports = require_react_is_development();
    }
  }
});

// ../../../node_modules/.pnpm/hoist-non-react-statics@3.3.2/node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js
var require_hoist_non_react_statics_cjs = __commonJS({
  "../../../node_modules/.pnpm/hoist-non-react-statics@3.3.2/node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js"(exports, module) {
    "use strict";
    var reactIs = require_react_is();
    var REACT_STATICS = {
      childContextTypes: true,
      contextType: true,
      contextTypes: true,
      defaultProps: true,
      displayName: true,
      getDefaultProps: true,
      getDerivedStateFromError: true,
      getDerivedStateFromProps: true,
      mixins: true,
      propTypes: true,
      type: true
    };
    var KNOWN_STATICS = {
      name: true,
      length: true,
      prototype: true,
      caller: true,
      callee: true,
      arguments: true,
      arity: true
    };
    var FORWARD_REF_STATICS = {
      "$$typeof": true,
      render: true,
      defaultProps: true,
      displayName: true,
      propTypes: true
    };
    var MEMO_STATICS = {
      "$$typeof": true,
      compare: true,
      defaultProps: true,
      displayName: true,
      propTypes: true,
      type: true
    };
    var TYPE_STATICS = {};
    TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
    TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;
    function getStatics(component) {
      if (reactIs.isMemo(component)) {
        return MEMO_STATICS;
      }
      return TYPE_STATICS[component["$$typeof"]] || REACT_STATICS;
    }
    var defineProperty = Object.defineProperty;
    var getOwnPropertyNames = Object.getOwnPropertyNames;
    var getOwnPropertySymbols = Object.getOwnPropertySymbols;
    var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
    var getPrototypeOf = Object.getPrototypeOf;
    var objectPrototype = Object.prototype;
    function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
      if (typeof sourceComponent !== "string") {
        if (objectPrototype) {
          var inheritedComponent = getPrototypeOf(sourceComponent);
          if (inheritedComponent && inheritedComponent !== objectPrototype) {
            hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
          }
        }
        var keys = getOwnPropertyNames(sourceComponent);
        if (getOwnPropertySymbols) {
          keys = keys.concat(getOwnPropertySymbols(sourceComponent));
        }
        var targetStatics = getStatics(targetComponent);
        var sourceStatics = getStatics(sourceComponent);
        for (var i2 = 0; i2 < keys.length; ++i2) {
          var key = keys[i2];
          if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
            var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
            try {
              defineProperty(targetComponent, key, descriptor);
            } catch (e2) {
            }
          }
        }
      }
      return targetComponent;
    }
    module.exports = hoistNonReactStatics;
  }
});

// ../../../node_modules/.pnpm/fast-deep-equal@3.1.3/node_modules/fast-deep-equal/es6/index.js
var require_es6 = __commonJS({
  "../../../node_modules/.pnpm/fast-deep-equal@3.1.3/node_modules/fast-deep-equal/es6/index.js"(exports, module) {
    "use strict";
    module.exports = function equal(a2, b2) {
      if (a2 === b2) return true;
      if (a2 && b2 && typeof a2 == "object" && typeof b2 == "object") {
        if (a2.constructor !== b2.constructor) return false;
        var length2, i2, keys;
        if (Array.isArray(a2)) {
          length2 = a2.length;
          if (length2 != b2.length) return false;
          for (i2 = length2; i2-- !== 0; )
            if (!equal(a2[i2], b2[i2])) return false;
          return true;
        }
        if (a2 instanceof Map && b2 instanceof Map) {
          if (a2.size !== b2.size) return false;
          for (i2 of a2.entries())
            if (!b2.has(i2[0])) return false;
          for (i2 of a2.entries())
            if (!equal(i2[1], b2.get(i2[0]))) return false;
          return true;
        }
        if (a2 instanceof Set && b2 instanceof Set) {
          if (a2.size !== b2.size) return false;
          for (i2 of a2.entries())
            if (!b2.has(i2[0])) return false;
          return true;
        }
        if (ArrayBuffer.isView(a2) && ArrayBuffer.isView(b2)) {
          length2 = a2.length;
          if (length2 != b2.length) return false;
          for (i2 = length2; i2-- !== 0; )
            if (a2[i2] !== b2[i2]) return false;
          return true;
        }
        if (a2.constructor === RegExp) return a2.source === b2.source && a2.flags === b2.flags;
        if (a2.valueOf !== Object.prototype.valueOf) return a2.valueOf() === b2.valueOf();
        if (a2.toString !== Object.prototype.toString) return a2.toString() === b2.toString();
        keys = Object.keys(a2);
        length2 = keys.length;
        if (length2 !== Object.keys(b2).length) return false;
        for (i2 = length2; i2-- !== 0; )
          if (!Object.prototype.hasOwnProperty.call(b2, keys[i2])) return false;
        for (i2 = length2; i2-- !== 0; ) {
          var key = keys[i2];
          if (!equal(a2[key], b2[key])) return false;
        }
        return true;
      }
      return a2 !== a2 && b2 !== b2;
    };
  }
});

// ../../../node_modules/.pnpm/highlight-words-core@1.2.3/node_modules/highlight-words-core/dist/index.js
var require_dist = __commonJS({
  "../../../node_modules/.pnpm/highlight-words-core@1.2.3/node_modules/highlight-words-core/dist/index.js"(exports, module) {
    module.exports = /******/
    (function(modules) {
      var installedModules = {};
      function __webpack_require__(moduleId) {
        if (installedModules[moduleId])
          return installedModules[moduleId].exports;
        var module2 = installedModules[moduleId] = {
          /******/
          exports: {},
          /******/
          id: moduleId,
          /******/
          loaded: false
          /******/
        };
        modules[moduleId].call(module2.exports, module2, module2.exports, __webpack_require__);
        module2.loaded = true;
        return module2.exports;
      }
      __webpack_require__.m = modules;
      __webpack_require__.c = installedModules;
      __webpack_require__.p = "";
      return __webpack_require__(0);
    })([
      /* 0 */
      /***/
      (function(module2, exports2, __webpack_require__) {
        module2.exports = __webpack_require__(1);
      }),
      /* 1 */
      /***/
      (function(module2, exports2, __webpack_require__) {
        "use strict";
        Object.defineProperty(exports2, "__esModule", {
          value: true
        });
        var _utils = __webpack_require__(2);
        Object.defineProperty(exports2, "combineChunks", {
          enumerable: true,
          get: function get() {
            return _utils.combineChunks;
          }
        });
        Object.defineProperty(exports2, "fillInChunks", {
          enumerable: true,
          get: function get() {
            return _utils.fillInChunks;
          }
        });
        Object.defineProperty(exports2, "findAll", {
          enumerable: true,
          get: function get() {
            return _utils.findAll;
          }
        });
        Object.defineProperty(exports2, "findChunks", {
          enumerable: true,
          get: function get() {
            return _utils.findChunks;
          }
        });
      }),
      /* 2 */
      /***/
      (function(module2, exports2) {
        "use strict";
        Object.defineProperty(exports2, "__esModule", {
          value: true
        });
        var findAll2 = exports2.findAll = function findAll3(_ref2) {
          var autoEscape = _ref2.autoEscape, _ref$caseSensitive = _ref2.caseSensitive, caseSensitive = _ref$caseSensitive === void 0 ? false : _ref$caseSensitive, _ref$findChunks = _ref2.findChunks, findChunks = _ref$findChunks === void 0 ? defaultFindChunks : _ref$findChunks, sanitize = _ref2.sanitize, searchWords = _ref2.searchWords, textToHighlight = _ref2.textToHighlight;
          return fillInChunks({
            chunksToHighlight: combineChunks({
              chunks: findChunks({
                autoEscape,
                caseSensitive,
                sanitize,
                searchWords,
                textToHighlight
              })
            }),
            totalLength: textToHighlight ? textToHighlight.length : 0
          });
        };
        var combineChunks = exports2.combineChunks = function combineChunks2(_ref2) {
          var chunks = _ref2.chunks;
          chunks = chunks.sort(function(first, second) {
            return first.start - second.start;
          }).reduce(function(processedChunks, nextChunk) {
            if (processedChunks.length === 0) {
              return [nextChunk];
            } else {
              var prevChunk = processedChunks.pop();
              if (nextChunk.start < prevChunk.end) {
                var endIndex = Math.max(prevChunk.end, nextChunk.end);
                processedChunks.push({ highlight: false, start: prevChunk.start, end: endIndex });
              } else {
                processedChunks.push(prevChunk, nextChunk);
              }
              return processedChunks;
            }
          }, []);
          return chunks;
        };
        var defaultFindChunks = function defaultFindChunks2(_ref3) {
          var autoEscape = _ref3.autoEscape, caseSensitive = _ref3.caseSensitive, _ref3$sanitize = _ref3.sanitize, sanitize = _ref3$sanitize === void 0 ? defaultSanitize : _ref3$sanitize, searchWords = _ref3.searchWords, textToHighlight = _ref3.textToHighlight;
          textToHighlight = sanitize(textToHighlight);
          return searchWords.filter(function(searchWord) {
            return searchWord;
          }).reduce(function(chunks, searchWord) {
            searchWord = sanitize(searchWord);
            if (autoEscape) {
              searchWord = escapeRegExpFn(searchWord);
            }
            var regex = new RegExp(searchWord, caseSensitive ? "g" : "gi");
            var match2 = void 0;
            while (match2 = regex.exec(textToHighlight)) {
              var _start = match2.index;
              var _end = regex.lastIndex;
              if (_end > _start) {
                chunks.push({ highlight: false, start: _start, end: _end });
              }
              if (match2.index === regex.lastIndex) {
                regex.lastIndex++;
              }
            }
            return chunks;
          }, []);
        };
        exports2.findChunks = defaultFindChunks;
        var fillInChunks = exports2.fillInChunks = function fillInChunks2(_ref4) {
          var chunksToHighlight = _ref4.chunksToHighlight, totalLength = _ref4.totalLength;
          var allChunks = [];
          var append2 = function append3(start, end, highlight) {
            if (end - start > 0) {
              allChunks.push({
                start,
                end,
                highlight
              });
            }
          };
          if (chunksToHighlight.length === 0) {
            append2(0, totalLength, false);
          } else {
            var lastIndex = 0;
            chunksToHighlight.forEach(function(chunk) {
              append2(lastIndex, chunk.start, false);
              append2(chunk.start, chunk.end, true);
              lastIndex = chunk.end;
            });
            append2(lastIndex, totalLength, false);
          }
          return allChunks;
        };
        function defaultSanitize(string) {
          return string;
        }
        function escapeRegExpFn(string) {
          return string.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        }
      })
      /******/
    ]);
  }
});

// src/charts/bar-chart/bar-chart.tsx
import { formatNumber as formatNumber5 } from "@automattic/number-formatters";
import { PatternLines, PatternCircles, PatternWaves, PatternHexagons } from "@visx/pattern";
import { Axis, BarSeries, BarGroup, Grid, XYChart } from "@visx/xychart";
import { __ } from "@wordpress/i18n";
import clsx2 from "clsx";
import { useCallback as useCallback8, useContext as useContext9, useState as useState6, useRef as useRef7, useMemo as useMemo15 } from "react";

// src/components/legend/legend.tsx
import { useContext as useContext5, useMemo as useMemo9, forwardRef as forwardRef2 } from "react";

// src/charts/private/single-chart-context/single-chart-context.tsx
import { createContext } from "react";
var ChartInstanceContext = /* @__PURE__ */ createContext(null);
var SingleChartContext = ChartInstanceContext;

// src/charts/private/single-chart-context/use-single-chart-context.ts
import { useContext } from "react";
var useChartInstanceContext = () => {
  const context = useContext(ChartInstanceContext);
  if (!context) {
    throw new Error("useChartInstanceContext must be used within a Chart component");
  }
  return context;
};
var useSingleChartContext = useChartInstanceContext;

// src/providers/chart-context/global-charts-provider.tsx
import { hsl as d3Hsl3 } from "@visx/vendor/d3-color";
import { createContext as createContext2, useCallback, useMemo, useState, useEffect as useEffect2, useLayoutEffect, useRef } from "react";

// src/hooks/use-tooltip-portal-relocator.ts
import { useEffect } from "react";

// src/hooks/use-tooltip-portal-relocator.module.scss
var use_tooltip_portal_relocator_module_default = {
  "relocatedPortal": "a8ccharts-jCw5dQ"
};

// src/hooks/use-tooltip-portal-relocator.ts
function isVisxPortalNode(node2) {
  return node2 instanceof HTMLDivElement && node2.parentElement === document.body && !node2.id && !node2.className && node2.querySelector(".visx-tooltip") !== null;
}
var patchRefCount = 0;
var origRemoveChild = null;
var patchedRemoveChild = null;
var relocatedNodes = /* @__PURE__ */ new WeakSet();
function installRemoveChildPatch() {
  if (patchRefCount++ > 0) {
    return;
  }
  origRemoveChild = document.body.removeChild;
  patchedRemoveChild = function(child) {
    if (relocatedNodes.has(child) && child.parentNode !== this) {
      relocatedNodes.delete(child);
      child.parentNode?.removeChild(child);
      return child;
    }
    return origRemoveChild.call(this, child);
  };
  document.body.removeChild = patchedRemoveChild;
}
function uninstallRemoveChildPatch() {
  if (--patchRefCount > 0) {
    return;
  }
  if (document.body.removeChild === patchedRemoveChild) {
    document.body.removeChild = origRemoveChild;
  }
  origRemoveChild = null;
  patchedRemoveChild = null;
}
function useTooltipPortalRelocator(containerRef) {
  useEffect(() => {
    const container = containerRef?.current;
    if (!container) {
      return;
    }
    const instanceNodes = /* @__PURE__ */ new Set();
    const relocateNode = (node2) => {
      if (!isVisxPortalNode(node2)) {
        return;
      }
      node2.style.opacity = "0";
      node2.classList.add(use_tooltip_portal_relocator_module_default.relocatedPortal);
      const { activeElement } = node2.ownerDocument;
      const focusedElement = activeElement instanceof HTMLElement && node2.contains(activeElement) ? activeElement : null;
      container.insertBefore(node2, container.firstChild);
      relocatedNodes.add(node2);
      instanceNodes.add(node2);
      if (focusedElement) {
        focusedElement.focus();
      }
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          node2.style.opacity = "";
        });
      });
    };
    installRemoveChildPatch();
    for (const child of Array.from(document.body.children)) {
      relocateNode(child);
    }
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node2 of mutation.addedNodes) {
          relocateNode(node2);
        }
      }
    });
    observer.observe(document.body, { childList: true });
    return () => {
      observer.disconnect();
      for (const node2 of instanceNodes) {
        if (node2 instanceof HTMLElement) {
          node2.classList.remove(use_tooltip_portal_relocator_module_default.relocatedPortal);
        }
        if (node2.parentNode === container) {
          document.body.appendChild(node2);
        }
        relocatedNodes.delete(node2);
      }
      instanceNodes.clear();
      uninstallRemoveChildPatch();
    };
  }, [containerRef]);
}

// src/utils/create-composition.ts
function attachSubComponents(Chart2, subComponents) {
  return Object.assign(Chart2, subComponents);
}

// src/utils/date-parsing.ts
import { parse, parseISO, isValid } from "date-fns";
var hasTimezone = (dateString) => {
  const tIndex = dateString.indexOf("T");
  if (tIndex === -1) {
    return false;
  }
  if (dateString.endsWith("Z")) {
    return true;
  }
  return /[+-]\d{2}:?\d{2}$/.test(dateString.slice(tIndex + 1));
};
var parseAsLocalDate = (dateString) => {
  const trimmedString = dateString.trim();
  if (hasTimezone(trimmedString)) {
    const isoDate = parseISO(trimmedString);
    if (!isValid(isoDate)) {
      return /* @__PURE__ */ new Date(NaN);
    }
    return isoDate;
  }
  const formats = [
    "yyyy-MM-dd",
    // 2025-01-01
    "yyyy-MM-dd HH:mm:ss",
    // 2025-01-01 14:30:45
    "yyyy-MM-dd HH:mm",
    // 2025-01-01 14:30
    "yyyy-MM-dd'T'HH:mm:ss",
    // 2025-01-01T14:30:45
    "yyyy-MM-dd'T'HH:mm:ss.SSS",
    // 2025-01-01T14:30:45.123
    "yyyy-MM-dd'T'HH:mm"
    // 2025-01-01T14:30
  ];
  for (const format of formats) {
    const result = parse(trimmedString, format, /* @__PURE__ */ new Date());
    if (isValid(result)) {
      return result;
    }
  }
  return /* @__PURE__ */ new Date(NaN);
};

// src/utils/format-metric-value.ts
import { formatNumberCompact, formatNumber } from "@automattic/number-formatters";
var formatMetricValue = (value, type = "number", { decimals, useMultipliers = false, signDisplay } = {}) => {
  if (value === null || value === void 0) {
    return "";
  }
  const numericValue = Number(value);
  if (isNaN(numericValue)) {
    return "";
  }
  switch (type) {
    case "currency": {
      const formatted = useMultipliers ? formatNumberCompact(numericValue, {
        decimals: decimals ?? 2,
        numberFormatOptions: {
          maximumFractionDigits: decimals ?? 2,
          signDisplay
        }
      }) : formatNumber(numericValue, {
        decimals: decimals ?? 2,
        numberFormatOptions: {
          signDisplay
        }
      });
      return `$${formatted}`;
    }
    case "average": {
      if (!Number.isFinite(numericValue)) {
        return "\u2014";
      }
      return formatNumber(numericValue, {
        decimals: decimals ?? 0,
        numberFormatOptions: {
          style: "percent",
          signDisplay: signDisplay ?? "exceptZero"
        }
      });
    }
    case "number":
    default: {
      return useMultipliers ? formatNumberCompact(numericValue, {
        decimals: decimals ?? 0,
        numberFormatOptions: {
          maximumFractionDigits: decimals ?? 0,
          signDisplay
        }
      }) : formatNumber(numericValue, {
        decimals: decimals ?? 0,
        numberFormatOptions: {
          signDisplay
        }
      });
    }
  }
};

// src/utils/format-percentage.ts
import { formatNumber as formatNumber2 } from "@automattic/number-formatters";
var formatPercentage = (value) => {
  return formatNumber2(value / 100, {
    numberFormatOptions: {
      style: "percent",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }
  });
};

// src/utils/get-longest-tick-width.ts
import { getStringWidth as getStringWidth2 } from "@visx/text";
var getLongestTickWidth = (ticks, formatTick, labelStyle) => {
  const formattedTicks = ticks.map((tick) => formatTick(tick, 0, []));
  const longestTick = formattedTicks.reduce(
    (longest, current) => longest.length >= current.length ? longest : current,
    formattedTicks[0]
  );
  return getStringWidth2(longestTick, labelStyle);
};

// src/utils/get-styles.ts
function getSeriesLineStyles(seriesData, index, providerTheme) {
  const themeSemanticLineStyle = providerTheme?.lineChart?.lineStyles?.[seriesData.options?.type];
  const themeSeriesLineStyle = providerTheme?.seriesLineStyles?.[index % providerTheme.seriesLineStyles.length];
  return seriesData.options?.seriesLineStyle ?? themeSemanticLineStyle ?? themeSeriesLineStyle ?? {};
}
function getSeriesStroke(seriesData, index, themeColors) {
  return seriesData.options?.stroke ?? themeColors[index % themeColors.length];
}
function getItemShapeStyles(series, index, theme, legendShape) {
  const seriesShapeStyles = series.options?.legendShapeStyle ?? {};
  const lineStyles = legendShape === "line" ? getSeriesLineStyles(series, index, theme) : {};
  const themeShapeStyles = theme.legend?.shapeStyles?.[index];
  const itemShapeStyles = {
    ...seriesShapeStyles,
    ...lineStyles
  };
  if (Object.values(itemShapeStyles).some(
    (value) => value !== void 0 && value !== null && value !== ""
  )) {
    return itemShapeStyles;
  }
  return themeShapeStyles ?? {};
}

// src/utils/is-safari.ts
var isSafari = () => {
  if (typeof navigator !== "undefined" && navigator.userAgent) {
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  }
  return false;
};

// src/utils/merge-themes.ts
import deepmerge from "deepmerge";
function mergeThemes(baseTheme, overrideTheme) {
  return deepmerge(baseTheme, overrideTheme, {
    // Ensure arrays are replaced rather than concatenated
    arrayMerge: (_destinationArray, sourceArray) => sourceArray
  });
}

// src/utils/color-utils.ts
import { color as d3Color, hsl as d3Hsl } from "@visx/vendor/d3-color";
var isValidHexColor = (hex) => {
  return typeof hex === "string" && /^#[0-9a-fA-F]{6}$/.test(hex);
};
var validateHexColor = (hex) => {
  if (isValidHexColor(hex)) {
    return;
  }
  if (typeof hex !== "string") {
    throw new Error("Hex color must be a string");
  }
  if (!hex.startsWith("#")) {
    throw new Error("Hex color must start with #");
  }
  if (hex.length !== 7) {
    throw new Error("Hex color must be 7 characters long (e.g., #ff0000)");
  }
  throw new Error("Hex color contains invalid characters. Only 0-9, a-f, A-F are allowed");
};
var hexToRgba = (hex, alpha) => {
  validateHexColor(hex);
  if (typeof alpha !== "number" || isNaN(alpha)) {
    throw new Error("Alpha must be a number");
  }
  return d3Color(hex).copy({ opacity: alpha }).formatRgb();
};
var getColorDistance = (hsl1, hsl2) => {
  const [h1, s1, l1] = hsl1;
  const [h2, s2, l2] = hsl2;
  let hueDiff = Math.abs(h1 - h2);
  hueDiff = Math.min(hueDiff, 360 - hueDiff);
  const hueWeight = 2;
  const lightnessWeight = 1;
  const saturationWeight = 0.5;
  return Math.sqrt(
    Math.pow(hueDiff * hueWeight, 2) + Math.pow((l1 - l2) * lightnessWeight, 2) + Math.pow((s1 - s2) * saturationWeight, 2)
  );
};
var parseHslString = (hslString) => {
  const lower = hslString.toLowerCase().trim();
  if (!lower.startsWith("hsl(")) {
    return null;
  }
  const parsed = d3Hsl(lower);
  if (isNaN(parsed.h) && isNaN(parsed.s) && isNaN(parsed.l)) {
    return null;
  }
  const h2 = isNaN(parsed.h) ? 0 : (parsed.h % 360 + 360) % 360;
  return [h2, parsed.s * 100, parsed.l * 100];
};
var parseRgbString = (rgbString) => {
  const lower = rgbString.toLowerCase().trim();
  if (!lower.startsWith("rgb(") || lower.startsWith("rgba(")) {
    return null;
  }
  const parsed = d3Color(lower);
  if (!parsed) {
    return null;
  }
  return parsed.formatHex();
};
var normalizeColorToHex = (color, element, resolveCss) => {
  if (!color || typeof color !== "string") {
    return "";
  }
  if (/^#[0-9a-fA-F]{6}$/.test(color)) {
    return color;
  }
  const trimmed = color.trim().toLowerCase();
  if (/^#[0-9a-f]{3}$/i.test(trimmed)) {
    const r2 = trimmed[1];
    const g2 = trimmed[2];
    const b2 = trimmed[3];
    return `#${r2}${r2}${g2}${g2}${b2}${b2}`;
  }
  if (trimmed.startsWith("--") || trimmed.startsWith("var(")) {
    if (resolveCss) {
      const resolved = resolveCss(color, element);
      if (resolved) {
        return normalizeColorToHex(resolved, element, resolveCss);
      }
    }
    return color;
  }
  if (trimmed.startsWith("hsl(") || trimmed.startsWith("rgb(")) {
    if (trimmed.startsWith("rgba(")) {
      return color;
    }
    const parsed = d3Color(trimmed);
    if (parsed) {
      return parsed.formatHex();
    }
    return color;
  }
  return color;
};
var lightenHexColor = (hex, blend) => {
  validateHexColor(hex);
  const r2 = parseInt(hex.slice(1, 3), 16);
  const g2 = parseInt(hex.slice(3, 5), 16);
  const b2 = parseInt(hex.slice(5, 7), 16);
  const newR = Math.round(r2 + (255 - r2) * blend);
  const newG = Math.round(g2 + (255 - g2) * blend);
  const newB = Math.round(b2 + (255 - b2) * blend);
  return `#${newR.toString(16).padStart(2, "0")}${newG.toString(16).padStart(2, "0")}${newB.toString(16).padStart(2, "0")}`;
};

// src/utils/resolve-css-var.ts
var CSS_VAR_NAME_PATTERN = /^--[\w-]+$/;
var resolveCssVariable = (value, element) => {
  if (!value) {
    return null;
  }
  if (value.startsWith("var(") && value.endsWith(")")) {
    const parsed = parseVarExpression(value);
    if (parsed) {
      const resolved = resolveVariableName(parsed.varName, element);
      return resolved || parsed.fallback;
    }
  }
  if (value.startsWith("--")) {
    return resolveVariableName(value, element);
  }
  return value;
};
function parseVarExpression(expr) {
  const inner = expr.slice(4, -1).trim();
  if (!inner.startsWith("--")) {
    return null;
  }
  const commaIndex = inner.indexOf(",");
  if (commaIndex === -1) {
    const varName2 = inner.trim();
    if (!CSS_VAR_NAME_PATTERN.test(varName2)) {
      return null;
    }
    return { varName: varName2, fallback: null };
  }
  const varName = inner.slice(0, commaIndex).trim();
  if (!CSS_VAR_NAME_PATTERN.test(varName)) {
    return null;
  }
  const fallback = inner.slice(commaIndex + 1).trim();
  return { varName, fallback: fallback || null };
}
function resolveVariableName(varName, element) {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return null;
  }
  try {
    const targetElement = element || document.documentElement;
    const computedValue = getComputedStyle(targetElement).getPropertyValue(varName).trim();
    return computedValue || null;
  } catch {
    return null;
  }
}

// src/providers/chart-context/private/get-chart-color.ts
import { hsl as d3Hsl2 } from "@visx/vendor/d3-color";
var GOLDEN_RATIO = 0.618033988749;
var MIN_COLOR_DISTANCE = 25;
var MAX_COLOR_GENERATION_ATTEMPTS = 50;
var VARIATION_ATTEMPT_OFFSET = 0.1;
var BASE_SATURATION = 45;
var SATURATION_VARIATION_STEPS = 3;
var SATURATION_INCREMENT = 10;
var BASE_LIGHTNESS = 35;
var LIGHTNESS_VARIATION_STEPS = 4;
var LIGHTNESS_INCREMENT = 8;
var MIN_HUE_RANGE_DEGREES = 60;
var HUE_RANGE_EXPANSION_FACTOR = 1.3;
var HUE_WRAP_THRESHOLD_DEGREES = 180;
var FULL_HUE_ROTATION_DEGREES = 360;
var SINGLE_COLOR_HUE_RANGE_FACTOR = 0.33;
var getChartColor = (index, colorCache) => {
  const {
    colors,
    hues,
    existingHslColors,
    minHue: cachedMinHue,
    maxHue: cachedMaxHue
  } = colorCache;
  if (index < colors.length) {
    return colors[index];
  }
  let minHue = cachedMinHue;
  let maxHue = cachedMaxHue;
  for (let attempt = 0; attempt < MAX_COLOR_GENERATION_ATTEMPTS; attempt++) {
    let hue = (index - colors.length + attempt * VARIATION_ATTEMPT_OFFSET) * GOLDEN_RATIO * FULL_HUE_ROTATION_DEGREES % FULL_HUE_ROTATION_DEGREES;
    if (hues.length > 0) {
      let hueRange = maxHue - minHue;
      if (hues.length === 1) {
        hueRange = FULL_HUE_ROTATION_DEGREES * SINGLE_COLOR_HUE_RANGE_FACTOR;
      } else if (hueRange > HUE_WRAP_THRESHOLD_DEGREES) {
        const altMinHue = Math.min(...hues.filter((h2) => h2 > HUE_WRAP_THRESHOLD_DEGREES));
        const altMaxHue = Math.max(...hues.filter((h2) => h2 < HUE_WRAP_THRESHOLD_DEGREES)) + FULL_HUE_ROTATION_DEGREES;
        const altRange = altMaxHue - altMinHue;
        if (altRange < hueRange) {
          minHue = altMinHue;
          maxHue = altMaxHue;
          hueRange = altRange;
        }
      }
      const expandedRange = Math.max(
        hueRange * HUE_RANGE_EXPANSION_FACTOR,
        MIN_HUE_RANGE_DEGREES
      );
      const rangeCenter = (minHue + maxHue) / 2;
      const expandedMin = rangeCenter - expandedRange / 2;
      hue = expandedMin + hue / FULL_HUE_ROTATION_DEGREES * expandedRange;
      hue = (hue % FULL_HUE_ROTATION_DEGREES + FULL_HUE_ROTATION_DEGREES) % FULL_HUE_ROTATION_DEGREES;
    }
    const saturation = BASE_SATURATION + (index + attempt) % SATURATION_VARIATION_STEPS * SATURATION_INCREMENT;
    const lightness = BASE_LIGHTNESS + (index + attempt) % LIGHTNESS_VARIATION_STEPS * LIGHTNESS_INCREMENT;
    const candidateHsl = [hue, saturation, lightness];
    let isSufficientlyDifferent = true;
    for (const existingHsl of existingHslColors) {
      if (getColorDistance(candidateHsl, existingHsl) < MIN_COLOR_DISTANCE) {
        isSufficientlyDifferent = false;
        break;
      }
    }
    if (isSufficientlyDifferent) {
      return d3Hsl2(Math.round(hue), saturation / 100, lightness / 100).formatHex();
    }
  }
  const fallbackHue = (index - colors.length) * GOLDEN_RATIO * FULL_HUE_ROTATION_DEGREES % FULL_HUE_ROTATION_DEGREES;
  const fallbackSaturation = BASE_SATURATION + index % SATURATION_VARIATION_STEPS * SATURATION_INCREMENT;
  const fallbackLightness = BASE_LIGHTNESS + index % LIGHTNESS_VARIATION_STEPS * LIGHTNESS_INCREMENT;
  return d3Hsl2(
    Math.round(fallbackHue),
    fallbackSaturation / 100,
    fallbackLightness / 100
  ).formatHex();
};

// src/providers/chart-context/themes.ts
var defaultTheme = {
  backgroundColor: "#FFFFFF",
  // chart background color
  labelBackgroundColor: "transparent",
  // label background color (transparent by default)
  labelTextColor: "#FFFFFF",
  // label text color (white to match original behavior)
  colors: ["#98C8DF", "#006DAB", "#A6DC80", "#1F9828", "#FF8C8F"],
  gridStyles: {
    stroke: "#DCDCDE",
    strokeWidth: 1
  },
  tickLength: 4,
  gridColor: "",
  gridColorDark: "",
  xTickLineStyles: { stroke: "black" },
  xAxisLineStyles: { stroke: "#DCDCDE", strokeWidth: 1 },
  legend: {
    labelStyles: {
      color: "var(--jp-gray-80, #2c3338)"
    },
    containerStyles: {},
    shapeStyles: []
  },
  seriesLineStyles: [],
  glyphs: [],
  svgLabelSmall: { fill: "var(--jp-gray-80, #2c3338)" },
  annotationStyles: {
    label: {
      anchorLineStroke: "var(--jp-gray-80, #2c3338)",
      backgroundFill: "#fff"
    },
    connector: {
      stroke: "var(--jp-gray-80, #2c3338)"
    },
    circleSubject: {
      stroke: "transparent",
      fill: "var(--jp-gray-80, #2c3338)",
      radius: 5
    }
  },
  geoChart: {
    featureFillColor: "var(--jp-gray-0, #f6f7f7)"
  },
  leaderboardChart: {
    rowGap: 12,
    columnGap: 4,
    labelSpacing: 1.5,
    deltaColors: ["#FF8C8F", "#757575", "#1F9828"]
    // [negative, neutral, positive]
  },
  conversionFunnelChart: {
    backgroundColor: "#F3F4F6",
    positiveChangeColor: "#1F9828",
    negativeChangeColor: "#FF8C8F"
  },
  lineChart: {
    lineStyles: {
      comparison: {
        strokeDasharray: "4 4",
        strokeLinecap: "square"
      }
    }
  },
  sparkline: {
    margin: { top: 2, right: 2, bottom: 2, left: 2 },
    strokeWidth: 1.5
  }
};

// src/providers/chart-context/global-charts-provider.tsx
import { jsx as _jsx } from "react/jsx-runtime";
var GlobalChartsContext = /* @__PURE__ */ createContext2(null);
var GlobalChartsProvider = ({
  children,
  theme,
  portalContainer
}) => {
  const [charts, setCharts] = useState(() => /* @__PURE__ */ new Map());
  const [hiddenSeries, setHiddenSeries] = useState(() => /* @__PURE__ */ new Map());
  const wrapperRef = useRef(null);
  useTooltipPortalRelocator(portalContainer ?? wrapperRef);
  const providerTheme = useMemo(() => {
    return theme ? mergeThemes(defaultTheme, theme) : defaultTheme;
  }, [theme]);
  const [colorCache, setColorCache] = useState(() => ({
    colors: [],
    hues: [],
    existingHslColors: [],
    minHue: 360,
    maxHue: 0
  }));
  useLayoutEffect(() => {
    const {
      colors
    } = providerTheme;
    const resolvedColors = [];
    const hues = [];
    const existingHslColors = [];
    let minHue = 360;
    let maxHue = 0;
    if (Array.isArray(colors)) {
      for (const color of colors) {
        if (color && typeof color === "string") {
          let colorValue = color;
          if (color.startsWith("--") || color.startsWith("var(")) {
            const resolved = resolveCssVariable(color, wrapperRef.current);
            if (resolved === null || resolved === "") {
              continue;
            }
            colorValue = resolved;
          }
          if (colorValue.startsWith("#")) {
            resolvedColors.push(colorValue);
            const hslColor = d3Hsl3(colorValue);
            if (!isNaN(hslColor.h)) {
              const hslTuple = [hslColor.h, hslColor.s * 100, hslColor.l * 100];
              hues.push(hslTuple[0]);
              existingHslColors.push(hslTuple);
              minHue = Math.min(minHue, hslTuple[0]);
              maxHue = Math.max(maxHue, hslTuple[0]);
            }
          }
        }
      }
    }
    setColorCache({
      colors: resolvedColors,
      hues,
      existingHslColors,
      minHue,
      maxHue
    });
  }, [providerTheme]);
  const [groupToColorMap, setGroupToColorMap] = useState(() => /* @__PURE__ */ new Map());
  useEffect2(() => {
    setGroupToColorMap(/* @__PURE__ */ new Map());
  }, [providerTheme.colors]);
  const registerChart = useCallback((id, data) => {
    setCharts((prev2) => new Map(prev2).set(id, data));
  }, []);
  const unregisterChart = useCallback((id) => {
    setCharts((prev2) => {
      const newMap = new Map(prev2);
      newMap.delete(id);
      return newMap;
    });
  }, []);
  const getChartData = useCallback((id) => {
    return charts.get(id);
  }, [charts]);
  const resolveColor = useCallback(({
    group,
    index,
    overrideColor
  }) => {
    if (overrideColor) {
      return normalizeColorToHex(overrideColor, wrapperRef.current, resolveCssVariable);
    }
    if (group) {
      const existing = groupToColorMap.get(group);
      if (existing) {
        return existing;
      }
      const assignedCount = groupToColorMap.size;
      const color = getChartColor(assignedCount, colorCache);
      groupToColorMap.set(group, color);
      return color;
    }
    return getChartColor(index, colorCache);
  }, [colorCache, groupToColorMap]);
  const getElementStyles = useCallback(({
    data,
    index,
    overrideColor,
    legendShape
  }) => {
    const isSeriesData = data && typeof data === "object" && "data" in data && "options" in data;
    const isPointPercentageData = data && typeof data === "object" && "value" in data && typeof data.value === "number" && !("data" in data);
    return {
      color: resolveColor({
        group: data?.group,
        index,
        overrideColor: overrideColor || isSeriesData && data?.options?.stroke || isPointPercentageData && data?.color
      }),
      lineStyles: isSeriesData ? getSeriesLineStyles(data, index, providerTheme) : {},
      glyph: providerTheme.glyphs?.[index],
      shapeStyles: isSeriesData ? getItemShapeStyles(data, index, providerTheme, legendShape) : {}
    };
  }, [providerTheme, resolveColor]);
  const toggleSeriesVisibility = useCallback((chartId, seriesLabel) => {
    setHiddenSeries((prev2) => {
      const newMap = new Map(prev2);
      const chartHidden = newMap.get(chartId) || /* @__PURE__ */ new Set();
      const newSet = new Set(chartHidden);
      if (newSet.has(seriesLabel)) {
        newSet.delete(seriesLabel);
      } else {
        newSet.add(seriesLabel);
      }
      if (newSet.size === 0) {
        newMap.delete(chartId);
      } else {
        newMap.set(chartId, newSet);
      }
      return newMap;
    });
  }, []);
  const isSeriesVisible = useCallback((chartId, seriesLabel) => {
    const chartHidden = hiddenSeries.get(chartId);
    return !chartHidden || !chartHidden.has(seriesLabel);
  }, [hiddenSeries]);
  const getHiddenSeries = useCallback((chartId) => {
    const set = hiddenSeries.get(chartId);
    return set ? new Set(set) : /* @__PURE__ */ new Set();
  }, [hiddenSeries]);
  const value = useMemo(() => ({
    charts,
    registerChart,
    unregisterChart,
    getChartData,
    theme: providerTheme,
    getElementStyles,
    toggleSeriesVisibility,
    isSeriesVisible,
    getHiddenSeries
  }), [charts, registerChart, unregisterChart, getChartData, providerTheme, getElementStyles, toggleSeriesVisibility, isSeriesVisible, getHiddenSeries]);
  return /* @__PURE__ */ _jsx(GlobalChartsContext.Provider, {
    value,
    children: /* @__PURE__ */ _jsx("div", {
      ref: wrapperRef,
      style: {
        display: "contents"
      },
      children
    })
  });
};

// src/providers/chart-context/hooks/use-global-charts-context.ts
import { useContext as useContext2 } from "react";
var useGlobalChartsContext = () => {
  const context = useContext2(GlobalChartsContext);
  if (!context) {
    throw new Error("useGlobalChartsContext must be used within a GlobalChartsProvider");
  }
  return context;
};

// src/providers/chart-context/hooks/use-chart-id.ts
import { useId } from "react";
var useChartId = (providedId) => {
  const generatedId = useId();
  return providedId || generatedId;
};

// src/providers/chart-context/hooks/use-chart-registration.ts
import { useEffect as useEffect4, useMemo as useMemo8 } from "react";

// src/hooks/use-deep-memo.ts
var import_fast_deep_equal = __toESM(require_fast_deep_equal(), 1);
import { useRef as useRef2 } from "react";
var useDeepMemo = (value) => {
  const ref = useRef2(value);
  if (!(0, import_fast_deep_equal.default)(ref.current, value)) {
    ref.current = value;
  }
  return ref.current;
};

// src/hooks/use-chart-mouse-handler.ts
import { localPoint } from "@visx/event";
import { useTooltip } from "@visx/tooltip";
import { useCallback as useCallback2 } from "react";
var useChartMouseHandler = ({
  withTooltips,
  offsetX = 0,
  offsetY = -10
}) => {
  const { tooltipOpen, tooltipLeft, tooltipTop, tooltipData, hideTooltip, showTooltip } = useTooltip();
  const onMouseMove = useCallback2(
    (event, data) => {
      if (!withTooltips) {
        return;
      }
      const coords = localPoint(event);
      if (!coords) {
        return;
      }
      showTooltip({
        tooltipData: data,
        tooltipLeft: coords.x + offsetX,
        tooltipTop: coords.y + offsetY
      });
    },
    [withTooltips, showTooltip, offsetX, offsetY]
  );
  const onMouseLeave = useCallback2(() => {
    if (!withTooltips) {
      return;
    }
    hideTooltip();
  }, [withTooltips, hideTooltip]);
  return {
    onMouseMove,
    onMouseLeave,
    tooltipOpen,
    tooltipData: tooltipData || null,
    tooltipLeft,
    tooltipTop
  };
};

// src/hooks/use-xychart-theme.ts
import { buildChartTheme } from "@visx/xychart";
import { useMemo as useMemo2 } from "react";
var useXYChartTheme = (data) => {
  const theme = useGlobalChartsTheme();
  return useMemo2(() => {
    const seriesColors = (data ?? []).map((series) => series.options?.stroke).filter((color) => Boolean(color));
    return buildChartTheme({
      ...theme,
      colors: [...seriesColors, ...theme.colors ?? []]
    });
  }, [theme, data]);
};

// src/hooks/use-chart-data-transform.ts
import { useMemo as useMemo3 } from "react";
var useChartDataTransform = (data) => {
  return useMemo3(() => {
    const firstPoint = data?.[0]?.data?.[0];
    const hasDateProperties = firstPoint && ("date" in firstPoint || "dateString" in firstPoint);
    if (!hasDateProperties) {
      return data;
    }
    return data.map((series) => ({
      ...series,
      data: series.data.map((point) => {
        let date;
        if ("date" in point && point.date) {
          date = point.date;
        } else if ("dateString" in point && point.dateString) {
          date = parseAsLocalDate(point.dateString);
        }
        return {
          ...point,
          date
        };
      }).sort((a2, b2) => {
        if (!a2.date || !b2.date) return 0;
        return a2.date.getTime() - b2.date.getTime();
      })
    }));
  }, [data]);
};

// src/hooks/use-chart-margin.tsx
import { createScale, getTicks } from "@visx/scale";
import { useMemo as useMemo4 } from "react";
var DEFAULT_MARGIN_TOP = 10;
var DEFAULT_MARGIN_RIGHT = 20;
var DEFAULT_MARGIN_BOTTOM = 20;
var DEFAULT_MARGIN_LEFT = 20;
var DEFAULT_BOTTOM_FOR_TOP_AXIS = 10;
var DEFAULT_FONT_SIZE = 12;
var DEFAULT_TICK_LENGTH = 8;
var DEFAULT_Y_TICK_WIDTH = 40;
var resolveFontSize = (val) => {
  if (typeof val === "number" && !isNaN(val)) {
    return val;
  }
  if (typeof val === "string") {
    const parsed = parseFloat(val);
    return isNaN(parsed) ? void 0 : parsed;
  }
  return void 0;
};
var getXAxisLabelMetrics = (theme, orientation) => {
  const xAxisStyles = orientation === "top" ? theme.axisStyles?.x?.top : theme.axisStyles?.x?.bottom;
  const fontSize = resolveFontSize(xAxisStyles?.axisLabel?.fontSize) || resolveFontSize(theme.svgLabelSmall?.fontSize) || DEFAULT_FONT_SIZE;
  const tickLength = xAxisStyles?.tickLength ?? DEFAULT_TICK_LENGTH;
  return {
    fontSize,
    tickLength
  };
};
var useChartMargin = (height, options, data, theme, horizontal = false) => {
  const yTicks = useMemo4(() => {
    const allDataPoints = data.flatMap((series) => series.data);
    if (horizontal) {
      return allDataPoints.map((d2) => d2.label || options.axis?.y?.tickFormat(d2.date.getTime(), 0, []));
    }
    const minY = Math.min(...allDataPoints.map((d2) => d2.value));
    const maxY = Math.max(...allDataPoints.map((d2) => d2.value));
    const yScale = createScale({
      ...options.yScale,
      domain: [minY, maxY],
      range: [height, 0]
    });
    return getTicks(yScale, options.axis?.y?.numTicks);
  }, [options, data, height, horizontal]);
  return useMemo4(() => {
    const defaultMargin = {
      top: DEFAULT_MARGIN_TOP,
      right: DEFAULT_MARGIN_RIGHT,
      bottom: DEFAULT_MARGIN_BOTTOM,
      left: DEFAULT_MARGIN_LEFT
    };
    const yAxisOrientation = options.axis?.y?.orientation;
    const yAxisStyles = yAxisOrientation === "right" ? theme.axisStyles.y.right : theme.axisStyles.y.left;
    const yTickWidth = getLongestTickWidth(yTicks, options.axis?.y?.tickFormat, yAxisStyles.axisLabel);
    const yMarginValue = (yTickWidth ?? DEFAULT_Y_TICK_WIDTH) + (yAxisStyles?.tickLength ?? 0);
    if (yAxisOrientation === "right") {
      defaultMargin.right = yMarginValue;
    } else {
      defaultMargin.left = yMarginValue;
    }
    const xOrientation = options.axis?.x?.orientation === "top" ? "top" : "bottom";
    const {
      fontSize,
      tickLength
    } = getXAxisLabelMetrics(theme, xOrientation);
    const computedXMargin = fontSize + tickLength;
    if (xOrientation === "top") {
      defaultMargin.top = Math.max(defaultMargin.top, computedXMargin);
      defaultMargin.bottom = DEFAULT_BOTTOM_FOR_TOP_AXIS;
    } else {
      defaultMargin.bottom = Math.max(defaultMargin.bottom, computedXMargin);
    }
    return defaultMargin;
  }, [options, theme, yTicks]);
};

// src/hooks/use-element-size.ts
import { useState as useState2, useCallback as useCallback3, useRef as useRef3 } from "react";
function useElementSize({
  initialWidth = 0,
  initialHeight = 0
} = {}) {
  const [width, setWidth] = useState2(initialWidth);
  const [height, setHeight] = useState2(initialHeight);
  const observerRef = useRef3(null);
  const refCallback = useCallback3((node2) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
    if (node2) {
      const handleResize = () => {
        const rect = node2.getBoundingClientRect();
        setWidth(rect.width || 0);
        setHeight(rect.height || 0);
      };
      handleResize();
      const resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(node2);
      observerRef.current = resizeObserver;
    }
  }, []);
  return [refCallback, width, height];
}

// src/hooks/use-text-truncation.ts
import { useCallback as useCallback4, useRef as useRef4, useState as useState3 } from "react";
function useTextTruncation(enabled = true) {
  const [isTruncated, setIsTruncated] = useState3(false);
  const observerRef = useRef4(null);
  const refCallback = useCallback4(
    (node2) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      if (node2 && enabled) {
        const checkTruncation = () => {
          const truncated = node2.scrollWidth > node2.clientWidth;
          setIsTruncated(truncated);
        };
        checkTruncation();
        const resizeObserver = new ResizeObserver(checkTruncation);
        resizeObserver.observe(node2);
        observerRef.current = resizeObserver;
      } else {
        setIsTruncated(false);
      }
    },
    [enabled]
  );
  return [refCallback, isTruncated];
}

// src/hooks/use-zero-value-display.ts
import { useMemo as useMemo5 } from "react";
var MIN_PIXEL_SIZE = 3;
var ZERO_PIXEL_SIZE = MIN_PIXEL_SIZE - 1;
var useZeroValueDisplay = (data, options = { enabled: false }) => {
  const { enabled, valueAxisLength } = options;
  return useMemo5(() => {
    if (!enabled || !valueAxisLength || valueAxisLength <= 0) return data;
    let maxAbsoluteValue = 0;
    for (const series of data) {
      for (const point of series.data) {
        if (point.value !== null && point.value !== 0) {
          maxAbsoluteValue = Math.max(maxAbsoluteValue, Math.abs(point.value));
        }
      }
    }
    if (maxAbsoluteValue === 0) return data;
    const minNonZeroValue = Math.min(
      MIN_PIXEL_SIZE / valueAxisLength * maxAbsoluteValue,
      maxAbsoluteValue
    );
    const zeroVisualValue = Math.min(
      ZERO_PIXEL_SIZE / valueAxisLength * maxAbsoluteValue,
      maxAbsoluteValue
    );
    return data.map((series) => ({
      ...series,
      data: series.data.map((point) => {
        if (point.value === 0) {
          return {
            ...point,
            visualValue: zeroVisualValue
          };
        }
        if (point.value === null) {
          return point;
        }
        const absValue = Math.abs(point.value);
        if (absValue < minNonZeroValue) {
          return {
            ...point,
            visualValue: Math.sign(point.value) * minNonZeroValue
          };
        }
        return point;
      })
    }));
  }, [data, enabled, valueAxisLength]);
};

// src/hooks/use-data-with-percentages.ts
import { useMemo as useMemo6 } from "react";
var useDataWithPercentages = (data) => {
  return useMemo6(() => {
    const totalValue = data.reduce((sum, segment) => sum + segment.value, 0);
    return data.map((segment) => ({
      ...segment,
      percentage: totalValue > 0 ? segment.value / totalValue * 100 : 0
    }));
  }, [data]);
};

// src/hooks/use-interactive-legend-data.ts
import { useMemo as useMemo7 } from "react";
var useInteractiveLegendData = ({
  data,
  chartId,
  legendInteractive,
  isSeriesVisible
}) => {
  const visibleData = useMemo7(() => {
    if (!chartId || !legendInteractive) {
      return data;
    }
    const filtered = data.filter((segment) => isSeriesVisible(chartId, segment.label));
    if (filtered.length === 0) {
      return [];
    }
    const totalValue = filtered.reduce((sum, segment) => sum + segment.value, 0);
    return filtered.map((segment) => ({
      ...segment,
      percentage: totalValue > 0 ? segment.value / totalValue * 100 : 0
    }));
  }, [data, chartId, isSeriesVisible, legendInteractive]);
  const allSegmentsHidden = useMemo7(() => {
    return legendInteractive && visibleData.length === 0;
  }, [legendInteractive, visibleData]);
  const legendData = useMemo7(() => {
    if (!legendInteractive || !chartId) {
      return data;
    }
    const visibleDataMap = new Map(visibleData.map((d2) => [d2.label, d2]));
    return data.map((segment) => {
      const isVisible = isSeriesVisible(chartId, segment.label);
      if (!isVisible) {
        return segment;
      }
      return visibleDataMap.get(segment.label) || segment;
    });
  }, [data, visibleData, legendInteractive, chartId, isSeriesVisible]);
  return { visibleData, allSegmentsHidden, legendData };
};

// src/hooks/use-prefers-reduced-motion.ts
import { useState as useState4, useEffect as useEffect3 } from "react";
var QUERY = "(prefers-reduced-motion: no-preference)";
var getInitialState = () => !window.matchMedia(QUERY).matches;
function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState4(getInitialState);
  useEffect3(() => {
    const mediaQueryList = window.matchMedia(QUERY);
    const listener = (event) => {
      setPrefersReducedMotion(!event.matches);
    };
    mediaQueryList.addEventListener("change", listener);
    return () => {
      mediaQueryList.removeEventListener("change", listener);
    };
  }, []);
  return prefersReducedMotion;
}

// src/providers/chart-context/hooks/use-chart-registration.ts
var useChartRegistration = ({
  chartId,
  legendItems,
  chartType,
  isDataValid,
  metadata
}) => {
  const { registerChart, unregisterChart } = useGlobalChartsContext();
  const stableLegendItems = useDeepMemo(legendItems);
  const memoizedMetadata = useMemo8(() => metadata, [metadata]);
  useEffect4(() => {
    if (isDataValid) {
      registerChart(chartId, {
        legendItems: stableLegendItems,
        chartType,
        metadata: memoizedMetadata
      });
    }
    return () => {
      unregisterChart(chartId);
    };
  }, [
    chartId,
    stableLegendItems,
    chartType,
    memoizedMetadata,
    isDataValid
    // Removed registerChart and unregisterChart from dependencies
    // They are stable functions created with useCallback and empty deps
  ]);
};

// src/providers/chart-context/hooks/use-global-charts-theme.ts
import { useContext as useContext3 } from "react";
var useGlobalChartsTheme = () => {
  const context = useContext3(GlobalChartsContext);
  const globalTheme = context?.theme;
  return globalTheme ?? defaultTheme;
};

// src/components/legend/private/base-legend.tsx
import { Group } from "@visx/group";
import { LegendItem, LegendLabel, LegendOrdinal, LegendShape } from "@visx/legend";
import { scaleOrdinal } from "@visx/scale";
import clsx from "clsx";
import { forwardRef, useCallback as useCallback5, useContext as useContext4 } from "react";

// src/components/legend/utils/value-or-identity.ts
function valueOrIdentity(_) {
  if (_ && typeof _ === "object" && "value" in _ && typeof _.value !== "undefined")
    return _.value;
  return _;
}
function valueOrIdentityString(_) {
  return String(valueOrIdentity(_));
}

// src/components/legend/utils/label-transform-factory.ts
function labelTransformFactory({
  scale,
  labelFormat
}) {
  return (d2, i2) => ({
    datum: d2,
    index: i2,
    text: `${labelFormat(d2, i2)}`,
    value: scale(d2)
  });
}

// src/components/legend/private/base-legend.module.scss
var base_legend_module_default = {
  "legend": "a8ccharts-89ApsU",
  "legend--horizontal": "a8ccharts-AELBvX",
  "legend--vertical": "a8ccharts-fX8uQe",
  "legend--alignment-start": "a8ccharts-DEe0wg",
  "legend--alignment-center": "a8ccharts-WBKF9I",
  "legend--alignment-end": "a8ccharts-JfwMng",
  "legend-item": "a8ccharts-Vflwq8",
  "legend-item--interactive": "a8ccharts-qGsavM",
  "legend-item--inactive": "a8ccharts-ZtDY-Q",
  "legend-item-label": "a8ccharts-2H65Kr",
  "legend-item-text--wrap": "a8ccharts-faSDBI",
  "legend-item-text--ellipsis": "a8ccharts-FISUIO",
  "legend-item-value": "a8ccharts-DTZlT-"
};

// src/components/legend/private/base-legend.tsx
import { jsx as _jsx2, jsxs as _jsxs } from "react/jsx-runtime";
var orientationToFlexDirection = {
  horizontal: "row",
  vertical: "column"
};
var LegendText = ({
  text,
  textOverflow,
  maxWidth
}) => {
  const isEllipsis = maxWidth != null && textOverflow === "ellipsis";
  const [textRef, isTruncated] = useTextTruncation(Boolean(isEllipsis));
  return /* @__PURE__ */ _jsx2("span", {
    ref: textRef,
    className: clsx(base_legend_module_default["legend-item-text"], maxWidth != null && base_legend_module_default[`legend-item-text--${textOverflow}`]),
    style: {
      ...maxWidth != null && {
        maxWidth,
        minWidth: 0
      }
    },
    title: isEllipsis && isTruncated ? text : void 0,
    children: text
  });
};
var BaseLegend = /* @__PURE__ */ forwardRef(({
  items,
  className,
  orientation = "horizontal",
  alignment = "center",
  shape = "rect",
  fill = valueOrIdentityString,
  size = valueOrIdentityString,
  labelFormat = valueOrIdentity,
  labelTransform = labelTransformFactory,
  itemStyles,
  itemClassName,
  labelStyles,
  labelClassName,
  shapeStyles,
  render,
  interactive = false,
  chartId
}, ref) => {
  const {
    margin: itemMargin = "0",
    flexDirection: itemDirection = "row"
  } = itemStyles ?? {};
  const {
    justifyContent: labelJustifyContent = "flex-start",
    flex: labelFlex = "0 0 auto",
    margin: labelMargin = "0 4px",
    maxWidth,
    textOverflow = "wrap"
  } = labelStyles ?? {};
  const {
    width: shapeWidth = 16,
    height: shapeHeight = 16,
    margin: shapeMargin = "2px 4px 2px 0"
  } = shapeStyles ?? {};
  const theme = useGlobalChartsTheme();
  const context = useContext4(GlobalChartsContext);
  const legendScale = scaleOrdinal({
    domain: items.map((item) => item.label),
    range: items.map((item) => item.color)
  });
  const domain = legendScale.domain();
  const getShapeStyle = useCallback5(({
    index
  }) => items[index]?.shapeStyle, [items]);
  const handleLegendClick = useCallback5((seriesLabel) => {
    if (interactive && chartId && context) {
      context.toggleSeriesVisibility(chartId, seriesLabel);
    }
  }, [interactive, chartId, context]);
  const isSeriesVisible = useCallback5((seriesLabel) => {
    if (!interactive || !chartId || !context) {
      return true;
    }
    return context.isSeriesVisible(chartId, seriesLabel);
  }, [interactive, chartId, context]);
  const createClickHandler = useCallback5((labelText) => {
    if (!interactive) {
      return void 0;
    }
    return () => handleLegendClick(labelText);
  }, [interactive, handleLegendClick]);
  const createKeyDownHandler = useCallback5((labelText) => {
    if (!interactive) {
      return void 0;
    }
    return (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleLegendClick(labelText);
      }
    };
  }, [interactive, handleLegendClick]);
  return render ? render(items) : /* @__PURE__ */ _jsx2(LegendOrdinal, {
    scale: legendScale,
    labelFormat,
    labelTransform,
    children: (labels) => /* @__PURE__ */ _jsx2("div", {
      ref,
      role: "list",
      className: clsx(base_legend_module_default.legend, base_legend_module_default[`legend--${orientation}`], base_legend_module_default[`legend--alignment-${alignment}`], className),
      style: {
        flexDirection: orientationToFlexDirection[orientation],
        ...theme.legend?.containerStyles
      },
      children: labels.map((label, i2) => {
        const visible = isSeriesVisible(label.text);
        const handleClick = createClickHandler(label.text);
        const handleKeyDown = createKeyDownHandler(label.text);
        const matchedItem = items[i2];
        return /* @__PURE__ */ _jsxs(LegendItem, {
          className: clsx("visx-legend-item", base_legend_module_default["legend-item"], interactive && base_legend_module_default["legend-item--interactive"], !visible && base_legend_module_default["legend-item--inactive"], itemClassName),
          margin: itemMargin,
          flexDirection: orientation === "vertical" && alignment === "end" ? "row-reverse" : itemDirection,
          onClick: handleClick,
          onKeyDown: handleKeyDown,
          role: interactive ? "button" : void 0,
          tabIndex: interactive ? 0 : void 0,
          "aria-pressed": interactive ? visible : void 0,
          "aria-label": interactive ? `${label.text}: ${visible ? "visible" : "hidden"}. Toggle visibility.` : void 0,
          children: [items[i2]?.renderGlyph ? /* @__PURE__ */ _jsx2("svg", {
            width: items[i2]?.glyphSize * 2,
            height: items[i2]?.glyphSize * 2,
            children: /* @__PURE__ */ _jsx2(Group, {
              children: items[i2]?.renderGlyph({
                key: `legend-glyph-${label.text}`,
                datum: {},
                index: i2,
                color: fill(label),
                size: items[i2]?.glyphSize,
                x: items[i2]?.glyphSize,
                y: items[i2]?.glyphSize
              })
            })
          }) : /* @__PURE__ */ _jsx2(LegendShape, {
            shape,
            height: shapeHeight,
            width: shapeWidth,
            margin: shapeMargin,
            item: domain[i2],
            itemIndex: i2,
            label,
            fill,
            size,
            shapeStyle: getShapeStyle
          }), /* @__PURE__ */ _jsxs(LegendLabel, {
            className: clsx("visx-legend-label", base_legend_module_default["legend-item-label"], labelClassName),
            style: {
              justifyContent: labelJustifyContent,
              flex: labelFlex,
              margin: labelMargin,
              ...theme.legend?.labelStyles
            },
            children: [/* @__PURE__ */ _jsx2(LegendText, {
              text: label.text,
              textOverflow,
              maxWidth
            }), matchedItem?.value != null && matchedItem.value !== "" && /* @__PURE__ */ _jsxs("span", {
              className: base_legend_module_default["legend-item-value"],
              children: ["\xA0", matchedItem.value]
            })]
          })]
        }, `legend-${label.text}-${i2}`);
      })
    })
  });
});

// src/components/legend/legend.tsx
import { jsx as _jsx3 } from "react/jsx-runtime";
var defaultShapeByChartType = {
  line: "line",
  bar: "rect",
  pie: "circle",
  "pie-semi-circle": "circle",
  leaderboard: "circle"
};
var Legend = /* @__PURE__ */ forwardRef2(({
  chartId,
  items,
  shape,
  ...props
}, ref) => {
  const context = useContext5(GlobalChartsContext);
  const singleChartContext = useContext5(SingleChartContext);
  const contextChartId = chartId ?? singleChartContext?.chartId;
  const chartData = useMemo9(() => contextChartId && context ? context.getChartData(contextChartId) : void 0, [contextChartId, context]);
  const contextItems = chartData?.legendItems;
  const resolvedShape = shape ?? (chartData?.chartType ? defaultShapeByChartType[chartData.chartType] : void 0);
  const legendItems = items || contextItems;
  if (!legendItems) {
    return null;
  }
  return /* @__PURE__ */ _jsx3(BaseLegend, {
    ref,
    items: legendItems,
    shape: resolvedShape,
    ...props,
    chartId: contextChartId
  });
});

// src/components/legend/hooks/use-chart-legend-items.ts
import { formatNumber as formatNumber3 } from "@automattic/number-formatters";
import { useMemo as useMemo10 } from "react";
function formatPointValue(point, showValues, legendValueDisplay = "percentage") {
  if (!showValues || legendValueDisplay === "none") {
    return "";
  }
  if ("percentage" in point) {
    switch (legendValueDisplay) {
      case "percentage":
        return formatPercentage(point.percentage);
      case "value":
        return formatNumber3(point.value);
      case "valueDisplay":
        return point.valueDisplay || formatNumber3(point.value);
      default:
        return "";
    }
  }
  if ("value" in point) {
    return point.value !== null ? formatNumber3(point.value) : "";
  }
  return "";
}
function applyGlyphToLegendItem(baseItem, withGlyph, glyph, renderGlyph, glyphSize) {
  if (withGlyph) {
    const glyphToUse = glyph || renderGlyph;
    if (glyphToUse) {
      return {
        ...baseItem,
        glyphSize,
        renderGlyph: glyphToUse
      };
    }
  }
  return baseItem;
}
function processSeriesData(seriesData, getElementStyles, showValues, withGlyph, glyphSize, renderGlyph, legendShape) {
  const mapper = (series, index) => {
    const { color, glyph, shapeStyles } = getElementStyles({
      data: series,
      index,
      legendShape
    });
    const baseItem = {
      label: series.label,
      value: showValues ? series.data?.length?.toString() || "0" : "",
      color,
      shapeStyle: shapeStyles
    };
    return applyGlyphToLegendItem(baseItem, withGlyph, glyph, renderGlyph, glyphSize);
  };
  return seriesData.map(mapper);
}
function processPointData(pointData, getElementStyles, showValues, legendValueDisplay, withGlyph, glyphSize, renderGlyph, legendShape) {
  const mapper = (point, index) => {
    const { color, glyph, shapeStyles } = getElementStyles({
      data: point,
      index,
      legendShape
    });
    const baseItem = {
      label: point.label,
      value: formatPointValue(point, showValues, legendValueDisplay),
      color,
      shapeStyle: shapeStyles
    };
    return applyGlyphToLegendItem(baseItem, withGlyph, glyph, renderGlyph, glyphSize);
  };
  return pointData.map(mapper);
}
function useChartLegendItems(data, options = {}, legendShape) {
  const {
    showValues = false,
    legendValueDisplay = "percentage",
    withGlyph = false,
    glyphSize = 8,
    renderGlyph
  } = options;
  const { getElementStyles } = useGlobalChartsContext();
  return useMemo10(() => {
    if (!data || !Array.isArray(data) || data.length === 0) {
      return [];
    }
    if ("data" in data[0]) {
      return processSeriesData(
        data,
        getElementStyles,
        showValues,
        withGlyph,
        glyphSize,
        renderGlyph,
        legendShape
      );
    }
    return processPointData(
      data,
      getElementStyles,
      showValues,
      legendValueDisplay,
      withGlyph,
      glyphSize,
      renderGlyph,
      legendShape
    );
  }, [
    data,
    getElementStyles,
    showValues,
    legendValueDisplay,
    withGlyph,
    glyphSize,
    renderGlyph,
    legendShape
  ]);
}

// src/components/tooltip/base-tooltip.tsx
import { formatNumber as formatNumber4 } from "@automattic/number-formatters";

// src/components/tooltip/base-tooltip.module.scss
var base_tooltip_module_default = {
  "tooltip": "a8ccharts-OfX6nd"
};

// src/components/tooltip/base-tooltip.tsx
import { Fragment as _Fragment, jsxs as _jsxs2, jsx as _jsx4 } from "react/jsx-runtime";
var DefaultTooltipContent = ({
  data
}) => /* @__PURE__ */ _jsxs2(_Fragment, {
  children: [data?.label, ": ", data?.valueDisplay || formatNumber4(data?.value)]
});
var BaseTooltip = ({
  data,
  top,
  left,
  component: Component2 = DefaultTooltipContent,
  children,
  className,
  style,
  renderContainer = true
}) => {
  const content = children || data && /* @__PURE__ */ _jsx4(Component2, {
    data,
    className
  });
  if (!renderContainer) {
    return content;
  }
  return /* @__PURE__ */ _jsx4("div", {
    className: base_tooltip_module_default.tooltip,
    style: {
      top,
      left,
      ...style
    },
    role: "tooltip",
    children: content
  });
};

// src/components/tooltip/accessible-tooltip.tsx
import { Tooltip, TooltipContext } from "@visx/xychart";
import { useContext as useContext6, useEffect as useEffect5, useCallback as useCallback6, useMemo as useMemo11 } from "react";
import { jsx as _jsx5 } from "react/jsx-runtime";
var AccessibleTooltip = ({
  renderTooltip,
  selectedIndex,
  tooltipRef,
  keyboardFocusedClassName,
  series = [],
  mode = "group",
  ...props
}) => {
  const tooltipContext = useContext6(TooltipContext);
  const tooltipData = useMemo11(() => {
    if (mode !== "individual") return [];
    if (series.length === 0) return [];
    const maxDataPoints = Math.max(...series.map((s2) => s2.data.length));
    const flattened = [];
    for (let dataPointIndex = 0; dataPointIndex < maxDataPoints; dataPointIndex++) {
      for (let seriesIndex = 0; seriesIndex < series.length; seriesIndex++) {
        const seriesData = series[seriesIndex];
        if (dataPointIndex < seriesData.data.length) {
          flattened.push({
            datum: seriesData.data[dataPointIndex],
            seriesLabel: seriesData.label,
            seriesIndex,
            dataPointIndex
          });
        }
      }
    }
    return flattened;
  }, [series, mode]);
  useEffect5(() => {
    if (selectedIndex === void 0) {
      tooltipContext?.hideTooltip();
      return;
    }
    if (mode === "group") {
      series.forEach((s2, index) => {
        if (selectedIndex < s2.data.length) {
          const datum = s2.data[selectedIndex];
          tooltipContext?.showTooltip({
            datum,
            key: s2.label,
            index
          });
        }
      });
    } else if (mode === "individual") {
      if (selectedIndex < tooltipData.length) {
        const tooltipItem = tooltipData[selectedIndex];
        tooltipContext?.showTooltip({
          datum: tooltipItem.datum,
          key: tooltipItem.seriesLabel,
          index: tooltipItem.seriesIndex
        });
      }
    }
  }, [selectedIndex, tooltipData, series]);
  const focusableRenderTooltip = useMemo11(() => {
    if (!renderTooltip) return void 0;
    return (params) => {
      const tooltipContent = renderTooltip(params);
      if (selectedIndex !== void 0) {
        return /* @__PURE__ */ _jsx5("div", {
          ref: tooltipRef,
          tabIndex: -1,
          role: "tooltip",
          "aria-atomic": "true",
          className: keyboardFocusedClassName,
          children: tooltipContent
        }, `chart-tooltip-${selectedIndex}`);
      }
      return /* @__PURE__ */ _jsx5("div", {
        role: "tooltip",
        "aria-live": "polite",
        children: tooltipContent
      });
    };
  }, [renderTooltip, selectedIndex, tooltipRef, keyboardFocusedClassName]);
  return /* @__PURE__ */ _jsx5(Tooltip, {
    ...props,
    renderTooltip: focusableRenderTooltip
  });
};
var useKeyboardNavigation = ({
  selectedIndex,
  setSelectedIndex,
  isNavigating,
  setIsNavigating,
  chartRef,
  totalPoints
}) => {
  const tooltipRef = useCallback6((element) => {
    if (element && selectedIndex !== void 0) {
      element.focus();
    }
  }, [selectedIndex]);
  const onChartFocus = useCallback6(() => {
    if (!isNavigating && selectedIndex !== void 0) {
      setSelectedIndex(0);
    }
  }, [isNavigating, selectedIndex, setSelectedIndex]);
  const onChartBlur = useCallback6(() => {
    setIsNavigating(false);
  }, [setIsNavigating]);
  const onChartKeyDown = useCallback6((event) => {
    if (totalPoints === 0) return;
    if (event.key === "Tab") {
      chartRef.current?.focus();
      setSelectedIndex(void 0);
      setIsNavigating(false);
      return;
    }
    const currentSelectedIndex = selectedIndex === void 0 ? -1 : selectedIndex;
    if (currentSelectedIndex + 1 >= totalPoints && ["ArrowRight"].includes(event.key)) {
      chartRef.current?.focus();
      setSelectedIndex(void 0);
      setIsNavigating(false);
      return;
    }
    event.preventDefault();
    if (["ArrowRight"].includes(event.key)) {
      setIsNavigating(true);
      setSelectedIndex((currentSelectedIndex + 1) % totalPoints);
    } else if (["ArrowLeft"].includes(event.key)) {
      setIsNavigating(true);
      setSelectedIndex((currentSelectedIndex - 1 + totalPoints) % totalPoints);
    } else if (event.key === "Escape") {
      setSelectedIndex(void 0);
      setIsNavigating(false);
      chartRef.current?.focus();
    }
  }, [totalPoints, selectedIndex, setSelectedIndex, setIsNavigating, chartRef]);
  return {
    tooltipRef,
    onChartFocus,
    onChartBlur,
    onChartKeyDown
  };
};

// src/charts/private/chart-composition/chart-svg.tsx
import { Fragment as _Fragment2, jsx as _jsx6 } from "react/jsx-runtime";
var ChartSVG = ({
  children
}) => {
  return /* @__PURE__ */ _jsx6(_Fragment2, {
    children
  });
};
ChartSVG.displayName = "Chart.SVG";

// src/charts/private/chart-composition/chart-html.tsx
import { Fragment as _Fragment3, jsx as _jsx7 } from "react/jsx-runtime";
var ChartHTML = ({
  children
}) => {
  return /* @__PURE__ */ _jsx7(_Fragment3, {
    children
  });
};
ChartHTML.displayName = "Chart.HTML";

// src/charts/private/chart-composition/render-legend-slot.ts
import { createElement, Fragment } from "react";
function renderLegendSlot(legendChildren, position2) {
  return legendChildren.filter((l2) => l2.position === position2).map(
    (l2, i2) => createElement(Fragment, { key: `legend-${position2}-${i2}` }, l2.element)
  );
}

// src/charts/private/chart-composition/use-chart-children.ts
import { Group as Group2 } from "@visx/group";
import { useMemo as useMemo12, Children, isValidElement } from "react";
function useChartChildren(children, chartType) {
  return useMemo12(() => {
    const svg = [];
    const html = [];
    const legend = [];
    const other = [];
    const nonLegend = [];
    Children.forEach(children, (child) => {
      if (isValidElement(child)) {
        if (child.type === Legend) {
          const rawPosition = child.props?.position;
          const position2 = rawPosition === "top" || rawPosition === "bottom" ? rawPosition : "bottom";
          legend.push({ element: child, position: position2 });
          return;
        }
        const childType = child.type;
        const displayName = childType?.displayName;
        if (displayName === `${chartType}.SVG` || displayName === "Chart.SVG") {
          if (child.props?.children) {
            Children.forEach(child.props.children, (svgChild) => {
              svg.push(svgChild);
            });
          }
        } else if (displayName === `${chartType}.HTML` || displayName === "Chart.HTML") {
          if (child.props?.children) {
            Children.forEach(child.props.children, (htmlChild) => {
              html.push(htmlChild);
            });
          }
        } else if (child.type === Group2) {
          svg.push(child);
        } else {
          other.push(child);
        }
      }
      nonLegend.push(child);
    });
    return {
      svgChildren: svg,
      htmlChildren: html,
      legendChildren: legend,
      otherChildren: other,
      nonLegendChildren: nonLegend
    };
  }, [children, chartType]);
}

// ../../../node_modules/.pnpm/@base-ui+utils@0.2.5_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/esm/useRefWithInit.js
import * as React from "react";
var UNINITIALIZED = {};
function useRefWithInit(init, initArg) {
  const ref = React.useRef(UNINITIALIZED);
  if (ref.current === UNINITIALIZED) {
    ref.current = init(initArg);
  }
  return ref;
}

// ../../../node_modules/.pnpm/@base-ui+utils@0.2.5_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/esm/formatErrorMessage.js
function formatErrorMessage(code, ...args) {
  const url = new URL("https://base-ui.com/production-error");
  url.searchParams.set("code", code.toString());
  args.forEach((arg) => url.searchParams.append("args[]", arg));
  return `Base UI error #${code}; visit ${url} for the full message.`;
}

// ../../../node_modules/.pnpm/@base-ui+react@1.2.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/utils/useRenderElement.js
import * as React4 from "react";

// ../../../node_modules/.pnpm/@base-ui+utils@0.2.5_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/esm/useMergedRefs.js
function useMergedRefs(a2, b2, c2, d2) {
  const forkRef = useRefWithInit(createForkRef).current;
  if (didChange(forkRef, a2, b2, c2, d2)) {
    update(forkRef, [a2, b2, c2, d2]);
  }
  return forkRef.callback;
}
function useMergedRefsN(refs) {
  const forkRef = useRefWithInit(createForkRef).current;
  if (didChangeN(forkRef, refs)) {
    update(forkRef, refs);
  }
  return forkRef.callback;
}
function createForkRef() {
  return {
    callback: null,
    cleanup: null,
    refs: []
  };
}
function didChange(forkRef, a2, b2, c2, d2) {
  return forkRef.refs[0] !== a2 || forkRef.refs[1] !== b2 || forkRef.refs[2] !== c2 || forkRef.refs[3] !== d2;
}
function didChangeN(forkRef, newRefs) {
  return forkRef.refs.length !== newRefs.length || forkRef.refs.some((ref, index) => ref !== newRefs[index]);
}
function update(forkRef, refs) {
  forkRef.refs = refs;
  if (refs.every((ref) => ref == null)) {
    forkRef.callback = null;
    return;
  }
  forkRef.callback = (instance) => {
    if (forkRef.cleanup) {
      forkRef.cleanup();
      forkRef.cleanup = null;
    }
    if (instance != null) {
      const cleanupCallbacks = Array(refs.length).fill(null);
      for (let i2 = 0; i2 < refs.length; i2 += 1) {
        const ref = refs[i2];
        if (ref == null) {
          continue;
        }
        switch (typeof ref) {
          case "function": {
            const refCleanup = ref(instance);
            if (typeof refCleanup === "function") {
              cleanupCallbacks[i2] = refCleanup;
            }
            break;
          }
          case "object": {
            ref.current = instance;
            break;
          }
          default:
        }
      }
      forkRef.cleanup = () => {
        for (let i2 = 0; i2 < refs.length; i2 += 1) {
          const ref = refs[i2];
          if (ref == null) {
            continue;
          }
          switch (typeof ref) {
            case "function": {
              const cleanupCallback = cleanupCallbacks[i2];
              if (typeof cleanupCallback === "function") {
                cleanupCallback();
              } else {
                ref(null);
              }
              break;
            }
            case "object": {
              ref.current = null;
              break;
            }
            default:
          }
        }
      };
    }
  };
}

// ../../../node_modules/.pnpm/@base-ui+utils@0.2.5_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/esm/getReactElementRef.js
import * as React3 from "react";

// ../../../node_modules/.pnpm/@base-ui+utils@0.2.5_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/esm/reactVersion.js
import * as React2 from "react";
var majorVersion = parseInt(React2.version, 10);
function isReactVersionAtLeast(reactVersionToCheck) {
  return majorVersion >= reactVersionToCheck;
}

// ../../../node_modules/.pnpm/@base-ui+utils@0.2.5_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/esm/getReactElementRef.js
function getReactElementRef(element) {
  if (!/* @__PURE__ */ React3.isValidElement(element)) {
    return null;
  }
  const reactElement = element;
  const propsWithRef = reactElement.props;
  return (isReactVersionAtLeast(19) ? propsWithRef?.ref : reactElement.ref) ?? null;
}

// ../../../node_modules/.pnpm/@base-ui+utils@0.2.5_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/esm/mergeObjects.js
function mergeObjects(a2, b2) {
  if (a2 && !b2) {
    return a2;
  }
  if (!a2 && b2) {
    return b2;
  }
  if (a2 || b2) {
    return {
      ...a2,
      ...b2
    };
  }
  return void 0;
}

// ../../../node_modules/.pnpm/@base-ui+react@1.2.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/utils/getStateAttributesProps.js
function getStateAttributesProps(state, customMapping) {
  const props = {};
  for (const key in state) {
    const value = state[key];
    if (customMapping?.hasOwnProperty(key)) {
      const customProps = customMapping[key](value);
      if (customProps != null) {
        Object.assign(props, customProps);
      }
      continue;
    }
    if (value === true) {
      props[`data-${key.toLowerCase()}`] = "";
    } else if (value) {
      props[`data-${key.toLowerCase()}`] = value.toString();
    }
  }
  return props;
}

// ../../../node_modules/.pnpm/@base-ui+react@1.2.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/utils/resolveClassName.js
function resolveClassName(className, state) {
  return typeof className === "function" ? className(state) : className;
}

// ../../../node_modules/.pnpm/@base-ui+react@1.2.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/utils/resolveStyle.js
function resolveStyle(style, state) {
  return typeof style === "function" ? style(state) : style;
}

// ../../../node_modules/.pnpm/@base-ui+react@1.2.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/merge-props/mergeProps.js
var EMPTY_PROPS = {};
function mergeProps(a2, b2, c2, d2, e2) {
  let merged = {
    ...resolvePropsGetter(a2, EMPTY_PROPS)
  };
  if (b2) {
    merged = mergeOne(merged, b2);
  }
  if (c2) {
    merged = mergeOne(merged, c2);
  }
  if (d2) {
    merged = mergeOne(merged, d2);
  }
  if (e2) {
    merged = mergeOne(merged, e2);
  }
  return merged;
}
function mergePropsN(props) {
  if (props.length === 0) {
    return EMPTY_PROPS;
  }
  if (props.length === 1) {
    return resolvePropsGetter(props[0], EMPTY_PROPS);
  }
  let merged = {
    ...resolvePropsGetter(props[0], EMPTY_PROPS)
  };
  for (let i2 = 1; i2 < props.length; i2 += 1) {
    merged = mergeOne(merged, props[i2]);
  }
  return merged;
}
function mergeOne(merged, inputProps) {
  if (isPropsGetter(inputProps)) {
    return inputProps(merged);
  }
  return mutablyMergeInto(merged, inputProps);
}
function mutablyMergeInto(mergedProps, externalProps) {
  if (!externalProps) {
    return mergedProps;
  }
  for (const propName in externalProps) {
    const externalPropValue = externalProps[propName];
    switch (propName) {
      case "style": {
        mergedProps[propName] = mergeObjects(mergedProps.style, externalPropValue);
        break;
      }
      case "className": {
        mergedProps[propName] = mergeClassNames(mergedProps.className, externalPropValue);
        break;
      }
      default: {
        if (isEventHandler(propName, externalPropValue)) {
          mergedProps[propName] = mergeEventHandlers(mergedProps[propName], externalPropValue);
        } else {
          mergedProps[propName] = externalPropValue;
        }
      }
    }
  }
  return mergedProps;
}
function isEventHandler(key, value) {
  const code0 = key.charCodeAt(0);
  const code1 = key.charCodeAt(1);
  const code2 = key.charCodeAt(2);
  return code0 === 111 && code1 === 110 && code2 >= 65 && code2 <= 90 && (typeof value === "function" || typeof value === "undefined");
}
function isPropsGetter(inputProps) {
  return typeof inputProps === "function";
}
function resolvePropsGetter(inputProps, previousProps) {
  if (isPropsGetter(inputProps)) {
    return inputProps(previousProps);
  }
  return inputProps ?? EMPTY_PROPS;
}
function mergeEventHandlers(ourHandler, theirHandler) {
  if (!theirHandler) {
    return ourHandler;
  }
  if (!ourHandler) {
    return theirHandler;
  }
  return (event) => {
    if (isSyntheticEvent(event)) {
      const baseUIEvent = event;
      makeEventPreventable(baseUIEvent);
      const result2 = theirHandler(baseUIEvent);
      if (!baseUIEvent.baseUIHandlerPrevented) {
        ourHandler?.(baseUIEvent);
      }
      return result2;
    }
    const result = theirHandler(event);
    ourHandler?.(event);
    return result;
  };
}
function makeEventPreventable(event) {
  event.preventBaseUIHandler = () => {
    event.baseUIHandlerPrevented = true;
  };
  return event;
}
function mergeClassNames(ourClassName, theirClassName) {
  if (theirClassName) {
    if (ourClassName) {
      return theirClassName + " " + ourClassName;
    }
    return theirClassName;
  }
  return ourClassName;
}
function isSyntheticEvent(event) {
  return event != null && typeof event === "object" && "nativeEvent" in event;
}

// ../../../node_modules/.pnpm/@base-ui+utils@0.2.5_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/utils/esm/empty.js
var EMPTY_ARRAY = Object.freeze([]);
var EMPTY_OBJECT = Object.freeze({});

// ../../../node_modules/.pnpm/@base-ui+react@1.2.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/utils/useRenderElement.js
import { createElement as _createElement } from "react";
function useRenderElement(element, componentProps, params = {}) {
  const renderProp = componentProps.render;
  const outProps = useRenderElementProps(componentProps, params);
  if (params.enabled === false) {
    return null;
  }
  const state = params.state ?? EMPTY_OBJECT;
  return evaluateRenderProp(element, renderProp, outProps, state);
}
function useRenderElementProps(componentProps, params = {}) {
  const {
    className: classNameProp,
    style: styleProp,
    render: renderProp
  } = componentProps;
  const {
    state = EMPTY_OBJECT,
    ref,
    props,
    stateAttributesMapping,
    enabled = true
  } = params;
  const className = enabled ? resolveClassName(classNameProp, state) : void 0;
  const style = enabled ? resolveStyle(styleProp, state) : void 0;
  const stateProps = enabled ? getStateAttributesProps(state, stateAttributesMapping) : EMPTY_OBJECT;
  const outProps = enabled ? mergeObjects(stateProps, Array.isArray(props) ? mergePropsN(props) : props) ?? EMPTY_OBJECT : EMPTY_OBJECT;
  if (typeof document !== "undefined") {
    if (!enabled) {
      useMergedRefs(null, null);
    } else if (Array.isArray(ref)) {
      outProps.ref = useMergedRefsN([outProps.ref, getReactElementRef(renderProp), ...ref]);
    } else {
      outProps.ref = useMergedRefs(outProps.ref, getReactElementRef(renderProp), ref);
    }
  }
  if (!enabled) {
    return EMPTY_OBJECT;
  }
  if (className !== void 0) {
    outProps.className = mergeClassNames(outProps.className, className);
  }
  if (style !== void 0) {
    outProps.style = mergeObjects(outProps.style, style);
  }
  return outProps;
}
var REACT_LAZY_TYPE = /* @__PURE__ */ Symbol.for("react.lazy");
function evaluateRenderProp(element, render, props, state) {
  if (render) {
    if (typeof render === "function") {
      return render(props, state);
    }
    const mergedProps = mergeProps(props, render.props);
    mergedProps.ref = props.ref;
    let newElement = render;
    if (newElement?.$$typeof === REACT_LAZY_TYPE) {
      const children = React4.Children.toArray(render);
      newElement = children[0];
    }
    if (process.env.NODE_ENV !== "production") {
      if (!/* @__PURE__ */ React4.isValidElement(newElement)) {
        throw new Error(["Base UI: The `render` prop was provided an invalid React element as `React.isValidElement(render)` is `false`.", "A valid React element must be provided to the `render` prop because it is cloned with props to replace the default element.", "https://base-ui.com/r/invalid-render-prop"].join("\n"));
      }
    }
    return /* @__PURE__ */ React4.cloneElement(newElement, mergedProps);
  }
  if (element) {
    if (typeof element === "string") {
      return renderTag(element, props);
    }
  }
  throw new Error(process.env.NODE_ENV !== "production" ? "Base UI: Render element or function are not defined." : formatErrorMessage(8));
}
function renderTag(Tag, props) {
  if (Tag === "button") {
    return /* @__PURE__ */ _createElement("button", {
      type: "button",
      ...props,
      key: props.key
    });
  }
  if (Tag === "img") {
    return /* @__PURE__ */ _createElement("img", {
      alt: "",
      ...props,
      key: props.key
    });
  }
  return /* @__PURE__ */ React4.createElement(Tag, props);
}

// ../../../node_modules/.pnpm/@base-ui+react@1.2.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@base-ui/react/esm/use-render/useRender.js
function useRender(params) {
  return useRenderElement(params.defaultTagName ?? "div", params, params);
}

// ../../../node_modules/.pnpm/@wordpress+element@6.41.0/node_modules/@wordpress/element/build-module/react.mjs
import {
  Children as Children3,
  cloneElement as cloneElement2,
  Component,
  createContext as createContext3,
  createElement as createElement3,
  createRef,
  forwardRef as forwardRef3,
  Fragment as Fragment2,
  isValidElement as isValidElement4,
  memo,
  PureComponent,
  StrictMode,
  useCallback as useCallback7,
  useContext as useContext7,
  useDebugValue,
  useDeferredValue,
  useEffect as useEffect6,
  useId as useId2,
  useMemo as useMemo13,
  useImperativeHandle,
  useInsertionEffect,
  useLayoutEffect as useLayoutEffect2,
  useReducer,
  useRef as useRef6,
  useState as useState5,
  useSyncExternalStore,
  useTransition,
  startTransition,
  lazy,
  Suspense
} from "react";

// ../../../node_modules/.pnpm/is-plain-object@5.0.0/node_modules/is-plain-object/dist/is-plain-object.mjs
function isObject(o2) {
  return Object.prototype.toString.call(o2) === "[object Object]";
}
function isPlainObject(o2) {
  var ctor, prot;
  if (isObject(o2) === false) return false;
  ctor = o2.constructor;
  if (ctor === void 0) return true;
  prot = ctor.prototype;
  if (isObject(prot) === false) return false;
  if (prot.hasOwnProperty("isPrototypeOf") === false) {
    return false;
  }
  return true;
}

// ../../../node_modules/.pnpm/lower-case@2.0.2/node_modules/lower-case/dist.es2015/index.js
function lowerCase(str) {
  return str.toLowerCase();
}

// ../../../node_modules/.pnpm/no-case@3.0.4/node_modules/no-case/dist.es2015/index.js
var DEFAULT_SPLIT_REGEXP = [/([a-z0-9])([A-Z])/g, /([A-Z])([A-Z][a-z])/g];
var DEFAULT_STRIP_REGEXP = /[^A-Z0-9]+/gi;
function noCase(input, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.splitRegexp, splitRegexp = _a === void 0 ? DEFAULT_SPLIT_REGEXP : _a, _b = options.stripRegexp, stripRegexp = _b === void 0 ? DEFAULT_STRIP_REGEXP : _b, _c = options.transform, transform = _c === void 0 ? lowerCase : _c, _d = options.delimiter, delimiter2 = _d === void 0 ? " " : _d;
  var result = replace(replace(input, splitRegexp, "$1\0$2"), stripRegexp, "\0");
  var start = 0;
  var end = result.length;
  while (result.charAt(start) === "\0")
    start++;
  while (result.charAt(end - 1) === "\0")
    end--;
  return result.slice(start, end).split("\0").map(transform).join(delimiter2);
}
function replace(input, re, value) {
  if (re instanceof RegExp)
    return input.replace(re, value);
  return re.reduce(function(input2, re2) {
    return input2.replace(re2, value);
  }, input);
}

// ../../../node_modules/.pnpm/dot-case@3.0.4/node_modules/dot-case/dist.es2015/index.js
import { __assign } from "tslib";
function dotCase(input, options) {
  if (options === void 0) {
    options = {};
  }
  return noCase(input, __assign({ delimiter: "." }, options));
}

// ../../../node_modules/.pnpm/param-case@3.0.4/node_modules/param-case/dist.es2015/index.js
import { __assign as __assign2 } from "tslib";
function paramCase(input, options) {
  if (options === void 0) {
    options = {};
  }
  return dotCase(input, __assign2({ delimiter: "-" }, options));
}

// ../../../node_modules/.pnpm/@wordpress+ui@0.8.0_@types+react@18.3.28_react-dom@18.3.1_react@18.3.1__react@18.3.1_stylelint@16.26.1/node_modules/@wordpress/ui/build-module/stack/stack.mjs
if (typeof document !== "undefined" && process.env.NODE_ENV !== "test" && !document.head.querySelector("style[data-wp-hash='71d20935c2']")) {
  const style = document.createElement("style");
  style.setAttribute("data-wp-hash", "71d20935c2");
  style.appendChild(document.createTextNode("@layer wp-ui-utilities, wp-ui-components, wp-ui-compositions, wp-ui-overrides;@layer wp-ui-components{._19ce0419607e1896__stack{display:flex}}"));
  document.head.appendChild(style);
}
var style_default = { "stack": "_19ce0419607e1896__stack" };
var gapTokens = {
  xs: "var(--wpds-dimension-gap-xs, 4px)",
  sm: "var(--wpds-dimension-gap-sm, 8px)",
  md: "var(--wpds-dimension-gap-md, 12px)",
  lg: "var(--wpds-dimension-gap-lg, 16px)",
  xl: "var(--wpds-dimension-gap-xl, 24px)",
  "2xl": "var(--wpds-dimension-gap-2xl, 32px)",
  "3xl": "var(--wpds-dimension-gap-3xl, 40px)"
};
var Stack = forwardRef3(function Stack2({ direction, gap, align, justify, wrap, render, ...props }, ref) {
  const style = {
    gap: gap && gapTokens[gap],
    alignItems: align,
    justifyContent: justify,
    flexDirection: direction,
    flexWrap: wrap
  };
  const element = useRender({
    render,
    ref,
    props: mergeProps(props, { style, className: style_default.stack })
  });
  return element;
});

// src/charts/private/chart-layout/chart-layout.tsx
import { useEffect as useEffect7 } from "react";

// src/charts/private/chart-layout/chart-layout.module.scss
var chart_layout_module_default = {
  "chart-layout__content": "a8ccharts-gXtQZk"
};

// src/charts/private/chart-layout/chart-layout.tsx
import { jsx as _jsx8, jsxs as _jsxs3 } from "react/jsx-runtime";
var ChartLayout = ({
  legendPosition,
  legendElement,
  legendChildren,
  children,
  trailingContent,
  onContentHeightChange,
  gap,
  className,
  style,
  "data-testid": dataTestId,
  "data-chart-id": dataChartId
}) => {
  const [contentRef, contentWidth, contentHeight] = useElementSize();
  const isRenderProp = typeof children === "function";
  const isMeasured = contentHeight > 0;
  const visibilityStyle = isRenderProp && !isMeasured ? {
    visibility: "hidden"
  } : {};
  useEffect7(() => {
    if (isRenderProp && onContentHeightChange && isMeasured) {
      onContentHeightChange(contentHeight);
    }
  }, [isRenderProp, contentHeight, isMeasured, onContentHeightChange]);
  const renderedChildren = isRenderProp ? children({
    contentWidth,
    contentHeight,
    isMeasured
  }) : children;
  return /* @__PURE__ */ _jsxs3(Stack, {
    direction: "column",
    gap,
    className,
    style: {
      ...style,
      ...visibilityStyle
    },
    "data-chart-id": dataChartId,
    children: [legendPosition === "top" && legendElement, renderLegendSlot(legendChildren, "top"), isRenderProp ? /* @__PURE__ */ _jsx8("div", {
      ref: contentRef,
      className: chart_layout_module_default["chart-layout__content"],
      children: renderedChildren
    }) : renderedChildren, legendPosition === "bottom" && legendElement, renderLegendSlot(legendChildren, "bottom"), trailingContent]
  });
};

// src/charts/private/svg-empty-state/svg-empty-state.module.scss
var svg_empty_state_module_default = {
  "svg-empty-state": "a8ccharts-tGXBHV"
};

// src/charts/private/svg-empty-state/svg-empty-state.tsx
import { jsx as _jsx9 } from "react/jsx-runtime";
var SvgEmptyState = ({
  x: x2,
  y: y2,
  width,
  height,
  children
}) => {
  return /* @__PURE__ */ _jsx9("foreignObject", {
    x: x2 - width / 2,
    y: y2 - height / 2,
    width,
    height,
    children: /* @__PURE__ */ _jsx9(Stack, {
      align: "center",
      justify: "center",
      className: svg_empty_state_module_default["svg-empty-state"],
      children
    })
  });
};

// src/charts/private/with-responsive/with-responsive.tsx
import { useParentSize } from "@visx/responsive";

// src/charts/private/with-responsive/with-responsive.module.scss
var with_responsive_module_default = {
  "container": "a8ccharts-GSKfBD"
};

// src/charts/private/with-responsive/with-responsive.tsx
import { jsx as _jsx10 } from "react/jsx-runtime";
var useResponsiveDimensions = ({
  resizeDebounceTime = 300,
  maxWidth = 1200,
  aspectRatio
}) => {
  const {
    parentRef,
    width: parentWidth,
    height: parentHeight
  } = useParentSize({
    debounceTime: resizeDebounceTime,
    enableDebounceLeadingCall: true
  });
  const containerWidth = parentWidth > 0 ? Math.min(parentWidth, maxWidth) : 0;
  const containerHeight = aspectRatio !== void 0 ? containerWidth * aspectRatio : parentHeight;
  return {
    parentRef,
    width: containerWidth,
    height: containerHeight,
    /**
     * Whether an aspectRatio was provided. Used to determine container
     * height styling: 'auto' when true (height derived from width),
     * '100%' when false (fill parent container).
     */
    hasAspectRatio: aspectRatio !== void 0
  };
};
function withResponsive(WrappedComponent) {
  return function ResponsiveChart({
    resizeDebounceTime = 300,
    maxWidth = 1200,
    aspectRatio,
    size,
    width,
    height,
    ...chartProps
  }) {
    const {
      parentRef,
      width: measuredWidth,
      height: measuredHeight,
      hasAspectRatio
    } = useResponsiveDimensions({
      resizeDebounceTime,
      maxWidth,
      aspectRatio
    });
    const effectiveWidth = measuredWidth || width || 0;
    const effectiveHeight = measuredHeight || height || 0;
    const defaultHeight = hasAspectRatio ? "auto" : "100%";
    return /* @__PURE__ */ _jsx10("div", {
      ref: parentRef,
      className: with_responsive_module_default.container,
      style: {
        width: width ?? "100%",
        height: height ?? defaultHeight
      },
      children: /* @__PURE__ */ _jsx10(WrappedComponent, {
        width: effectiveWidth,
        height: effectiveHeight,
        size,
        ...chartProps
      })
    });
  };
}

// src/charts/bar-chart/bar-chart.module.scss
var bar_chart_module_default = {
  "bar-chart": "a8ccharts-3gflnB",
  "bar-chart--animated": "a8ccharts-98W-yu",
  "rise": "a8ccharts-z6AsiQ",
  "bar-chart--animated-horizontal": "a8ccharts-HFA3FF",
  "stretch": "a8ccharts-DQp37O"
};

// src/charts/bar-chart/private/use-bar-chart-options.ts
import { formatNumberCompact as formatNumberCompact2 } from "@automattic/number-formatters";
import { useMemo as useMemo14 } from "react";

// src/charts/bar-chart/private/truncated-tick-component.tsx
import { DataContext } from "@visx/xychart";
import { useContext as useContext8 } from "react";
import { jsx as _jsx11 } from "react/jsx-runtime";
var getScaleBandwidth = (scale) => {
  return scale && "bandwidth" in scale ? scale.bandwidth() ?? 0 : 0;
};
var MIN_TICK_LABEL_WIDTH = 20;
var TruncatedTickComponent = ({
  x: x2,
  y: y2,
  formattedValue,
  axis,
  textAnchor,
  fill,
  dy,
  ...textProps
}) => {
  const {
    xScale,
    yScale
  } = useContext8(DataContext) || {};
  const scale = axis === "x" ? xScale : yScale;
  const bandwidth = getScaleBandwidth(scale);
  const maxWidth = Math.max(bandwidth, MIN_TICK_LABEL_WIDTH);
  let textAlign = "center";
  if (textAnchor === "start") {
    textAlign = "left";
  } else if (textAnchor === "end") {
    textAlign = "right";
  } else if (textAnchor === "middle") {
    textAlign = "center";
  }
  let xOffset = 0;
  if (textAlign === "center") {
    xOffset = -maxWidth / 2;
  } else if (textAlign === "right") {
    xOffset = -maxWidth;
  }
  const {
    fontSize,
    fontFamily,
    fontWeight,
    fontStyle,
    letterSpacing,
    opacity
  } = textProps;
  const textStyles = {
    /**
     * SVG <text> elements are vertically aligned to the baseline by default, but HTML <div> elements inside <foreignObject>
     * are positioned relative to the top-left corner. To visually align the tick label like SVG text,
     * we shift the div up by 100% of its height and adjust by twice the SVG dy value (from visx) to approximate original placement.
     */
    transform: `translateY(calc(-100% + ${dy ?? "0"} * 2))`,
    // Safari doesn't work well with foreignObject positioning. Use position: fixed as a workaround.
    ...isSafari() ? {
      position: "fixed"
    } : {},
    // Apply compatible SVG text styles
    fontSize,
    fontFamily,
    fontWeight,
    fontStyle,
    letterSpacing,
    opacity,
    // Convert svg text styles to CSS styles for the div
    color: fill ?? "inherit",
    textAlign,
    // Ensure text is truncated with ellipsis, remains on one line, and shows the full value in a tooltip on hover.
    // The surrounding div uses CSS to handle overflow, and the 'title' attribute is set for accessibility.
    width: maxWidth,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    cursor: "default",
    pointerEvents: "auto"
  };
  return /* @__PURE__ */ _jsx11("foreignObject", {
    x: x2 + xOffset,
    y: y2,
    width: maxWidth,
    height: 0,
    overflow: "visible",
    children: /* @__PURE__ */ _jsx11("div", {
      style: textStyles,
      title: formattedValue,
      children: formattedValue
    })
  });
};
var createTruncatedTickComponent = (axis) => (props) => {
  return /* @__PURE__ */ _jsx11(TruncatedTickComponent, {
    ...props,
    axis
  });
};
var TruncatedXTickComponent = createTruncatedTickComponent("x");
var TruncatedYTickComponent = createTruncatedTickComponent("y");

// src/charts/bar-chart/private/use-bar-chart-options.ts
var formatDateTick = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString(void 0, {
    month: "short",
    day: "numeric"
  });
};
var getGroupPadding = (scale) => {
  return typeof scale.paddingInner === "number" ? scale.paddingInner : 0;
};
function useBarChartOptions(data, horizontal, options = {}) {
  const defaultOptions = useMemo14(() => {
    const bandScale = {
      type: "band",
      padding: 0.2,
      paddingInner: 0.1
    };
    const linearScale = {
      type: "linear",
      nice: true,
      zero: false
    };
    const labelFormatter = data?.[0]?.data?.[0]?.label ? (label) => label : formatDateTick;
    const valueFormatter = formatNumberCompact2;
    const labelAccessor = (d2) => d2?.label || d2?.date;
    const valueAccessor = (d2) => {
      const enhancedPoint = d2;
      return enhancedPoint?.visualValue !== void 0 ? enhancedPoint.visualValue : d2?.value;
    };
    return {
      vertical: {
        xTickFormat: labelFormatter,
        yTickFormat: valueFormatter,
        tooltipLabelFormatter: labelFormatter,
        xAccessor: labelAccessor,
        yAccessor: valueAccessor,
        gridVisibility: "x",
        xScale: bandScale,
        yScale: linearScale
      },
      horizontal: {
        xTickFormat: valueFormatter,
        yTickFormat: labelFormatter,
        tooltipLabelFormatter: labelFormatter,
        xAccessor: valueAccessor,
        yAccessor: labelAccessor,
        gridVisibility: "y",
        xScale: linearScale,
        yScale: bandScale
      }
    };
  }, [data]);
  return useMemo14(() => {
    const orientationKey = horizontal ? "horizontal" : "vertical";
    const {
      xTickFormat,
      yTickFormat,
      tooltipLabelFormatter: defaultTooltipLabelFormatter,
      xAccessor,
      yAccessor,
      gridVisibility,
      xScale: baseXScale,
      yScale: baseYScale
    } = defaultOptions[orientationKey];
    const xScale = { ...baseXScale, ...options.xScale || {} };
    const yScale = { ...baseYScale, ...options.yScale || {} };
    const providedToolTipLabelFormatter = horizontal ? options.axis?.y?.tickFormat : options.axis?.x?.tickFormat;
    const { labelOverflow: xLabelOverflow, ...xAxisOptions } = options.axis?.x || {};
    const { labelOverflow: yLabelOverflow, ...yAxisOptions } = options.axis?.y || {};
    return {
      gridVisibility,
      xScale,
      yScale,
      accessors: {
        xAccessor,
        yAccessor
      },
      axis: {
        x: {
          orientation: "bottom",
          numTicks: 4,
          tickFormat: xTickFormat,
          ...xLabelOverflow === "ellipsis" ? { tickComponent: TruncatedXTickComponent } : {},
          ...xAxisOptions
        },
        y: {
          orientation: "left",
          numTicks: 4,
          tickFormat: yTickFormat,
          ...yLabelOverflow === "ellipsis" ? { tickComponent: TruncatedYTickComponent } : {},
          ...yAxisOptions
        }
      },
      barGroup: {
        padding: getGroupPadding(horizontal ? yScale : xScale)
      },
      tooltip: {
        labelFormatter: providedToolTipLabelFormatter || defaultTooltipLabelFormatter
      }
    };
  }, [defaultOptions, options, horizontal]);
}

// src/charts/bar-chart/bar-chart.tsx
import { jsx as _jsx12, jsxs as _jsxs4, Fragment as _Fragment4 } from "react/jsx-runtime";
var validateData = (data) => {
  if (!data?.length) return "No data available";
  const hasInvalidData = data.some((series) => series.data.some((point) => isNaN(point.value) || point.value === null || point.value === void 0 || !point.label && (!("date" in point && point.date) || isNaN(point.date.getTime()))));
  if (hasInvalidData) return "Invalid data";
  return null;
};
var getPatternId = (chartId, index) => `bar-pattern-${chartId}-${index}`;
var BarChartInternal = ({
  data,
  chartId: providedChartId,
  width,
  height,
  className,
  margin,
  withTooltips = false,
  showLegend = false,
  legend = {},
  gridVisibility: gridVisibilityProp,
  renderTooltip,
  options = {},
  orientation = "vertical",
  withPatterns = false,
  showZeroValues = false,
  animation,
  children,
  gap = "md"
}) => {
  const legendInteractive = legend.interactive ?? false;
  const horizontal = orientation === "horizontal";
  const chartId = useChartId(providedChartId);
  const theme = useXYChartTheme(data);
  const dataSorted = useChartDataTransform(data);
  const dataWithVisibleZeros = useZeroValueDisplay(dataSorted, {
    enabled: showZeroValues,
    valueAxisLength: horizontal ? width : height
  });
  const legendItems = useChartLegendItems(dataSorted);
  const chartOptions = useBarChartOptions(dataWithVisibleZeros, horizontal, options);
  const defaultMargin = useChartMargin(height, chartOptions, dataSorted, theme, horizontal);
  const chartRef = useRef7(null);
  const {
    legendChildren,
    nonLegendChildren
  } = useChartChildren(children, "BarChart");
  const [measuredChartHeight, setMeasuredChartHeight] = useState6();
  const handleContentHeightChange = useCallback8((contentHeight) => {
    const chartHeight = contentHeight > 0 ? contentHeight : height;
    setMeasuredChartHeight(chartHeight);
  }, [height]);
  const [selectedIndex, setSelectedIndex] = useState6(void 0);
  const [isNavigating, setIsNavigating] = useState6(false);
  const totalPoints = Math.max(0, ...data.map((series) => series.data?.length || 0)) * data.length;
  const {
    tooltipRef,
    onChartFocus,
    onChartBlur,
    onChartKeyDown
  } = useKeyboardNavigation({
    selectedIndex,
    setSelectedIndex,
    isNavigating,
    setIsNavigating,
    chartRef,
    totalPoints
  });
  const {
    getElementStyles,
    isSeriesVisible
  } = useGlobalChartsContext();
  const seriesWithVisibility = useMemo15(() => {
    if (!chartId || !legendInteractive) {
      return dataWithVisibleZeros.map((series, index) => ({
        series,
        index,
        isVisible: true
      }));
    }
    return dataWithVisibleZeros.map((series, index) => ({
      series,
      index,
      isVisible: isSeriesVisible(chartId, series.label)
    }));
  }, [dataWithVisibleZeros, chartId, isSeriesVisible, legendInteractive]);
  const allSeriesHidden = useMemo15(() => {
    return seriesWithVisibility.every(({
      isVisible
    }) => !isVisible);
  }, [seriesWithVisibility]);
  const getBarBackground = useCallback8((index) => () => withPatterns ? `url(#${getPatternId(chartId, index)})` : getElementStyles({
    data: dataSorted[index],
    index
  }).color, [withPatterns, getElementStyles, dataSorted, chartId]);
  const renderDefaultTooltip2 = useCallback8(({
    tooltipData
  }) => {
    const nearestDatum = tooltipData?.nearestDatum?.datum;
    if (!nearestDatum) return null;
    return /* @__PURE__ */ _jsxs4("div", {
      className: bar_chart_module_default["bar-chart__tooltip"],
      children: [/* @__PURE__ */ _jsx12("div", {
        className: bar_chart_module_default["bar-chart__tooltip-header"],
        children: tooltipData?.nearestDatum?.key
      }), /* @__PURE__ */ _jsxs4("div", {
        className: bar_chart_module_default["bar-chart__tooltip-row"],
        children: [/* @__PURE__ */ _jsxs4("span", {
          className: bar_chart_module_default["bar-chart__tooltip-label"],
          children: [chartOptions.tooltip.labelFormatter(nearestDatum.label || (nearestDatum.date ? nearestDatum.date.getTime() : 0), 0, []), ":"]
        }), /* @__PURE__ */ _jsx12("span", {
          className: bar_chart_module_default["bar-chart__tooltip-value"],
          children: formatNumber5(nearestDatum.value)
        })]
      })]
    });
  }, [chartOptions.tooltip]);
  const renderPattern = useCallback8((index, color) => {
    const patternType = index % 4;
    const id = getPatternId(chartId, index);
    const commonProps = {
      id,
      stroke: "white",
      strokeWidth: 1,
      background: color
    };
    switch (patternType) {
      case 0:
      default:
        return /* @__PURE__ */ _jsx12(PatternLines, {
          ...commonProps,
          width: 5,
          height: 5,
          orientation: ["diagonal"]
        }, id);
      case 1:
        return /* @__PURE__ */ _jsx12(PatternCircles, {
          ...commonProps,
          width: 6,
          height: 6,
          fill: "white"
        }, id);
      case 2:
        return /* @__PURE__ */ _jsx12(PatternWaves, {
          ...commonProps,
          width: 4,
          height: 4
        }, id);
      case 3:
        return /* @__PURE__ */ _jsx12(PatternHexagons, {
          ...commonProps,
          size: 8,
          height: 3
        }, id);
    }
  }, [chartId]);
  const createPatternBorderStyle = useCallback8((index, color) => {
    const patternId = getPatternId(chartId, index);
    return `
			.visx-bar[fill="url(#${patternId})"] {
				stroke: ${color};
				stroke-width: 1;
				}
			`;
  }, [chartId]);
  const createKeyboardHighlightStyle = useCallback8(() => {
    if (selectedIndex === void 0) return "";
    const maxDataPoints = Math.max(...data.map((s2) => s2.data.length));
    const dataPointIndex = Math.floor(selectedIndex / data.length);
    const seriesIndex = selectedIndex % data.length;
    if (dataPointIndex >= maxDataPoints || seriesIndex >= data.length) {
      return "";
    }
    const seriesData = data[seriesIndex];
    if (dataPointIndex >= seriesData.data.length) {
      return "";
    }
    const actualBarIndex = seriesIndex * maxDataPoints + dataPointIndex;
    const generatedStyles = `
			.bar-chart[data-chart-id="bar-chart-${chartId}"] .visx-bar-group .visx-bar:nth-child(${actualBarIndex + 1}) {
				stroke: #005fcc;
				stroke-width: 2px;
			}
		`;
    return generatedStyles;
  }, [selectedIndex, data, chartId]);
  const error = validateData(dataSorted);
  const isDataValid = !error;
  const chartMetadata = useMemo15(() => ({
    orientation,
    withPatterns
  }), [orientation, withPatterns]);
  useChartRegistration({
    chartId,
    legendItems,
    chartType: "bar",
    isDataValid,
    metadata: chartMetadata
  });
  const prefersReducedMotion = usePrefersReducedMotion();
  if (error) {
    return /* @__PURE__ */ _jsx12("div", {
      className: clsx2("bar-chart", bar_chart_module_default["bar-chart"]),
      children: error
    });
  }
  const gridVisibility = gridVisibilityProp ?? chartOptions.gridVisibility;
  const highlightedBarStyle = createKeyboardHighlightStyle();
  const legendPosition = legend.position ?? "bottom";
  const legendElement = showLegend && /* @__PURE__ */ _jsx12(Legend, {
    orientation: legend.orientation ?? "horizontal",
    position: legendPosition,
    alignment: legend.alignment ?? "center",
    labelStyles: legend.labelStyles,
    itemClassName: legend.itemClassName,
    itemStyles: legend.itemStyles,
    shapeStyles: legend.shapeStyles,
    className: bar_chart_module_default["bar-chart__legend"],
    shape: legend.shape ?? "rect",
    chartId,
    interactive: legendInteractive
  });
  return /* @__PURE__ */ _jsx12(SingleChartContext.Provider, {
    value: {
      chartId,
      chartWidth: width,
      chartHeight: measuredChartHeight || 0
    },
    children: /* @__PURE__ */ _jsx12(ChartLayout, {
      legendPosition,
      legendElement,
      legendChildren,
      gap,
      className: clsx2("bar-chart", bar_chart_module_default["bar-chart"], {
        [bar_chart_module_default[`bar-chart--animated${horizontal ? "-horizontal" : ""}`]]: animation && !prefersReducedMotion
      }, className),
      style: {
        width,
        height
      },
      "data-chart-id": `bar-chart-${chartId}`,
      trailingContent: nonLegendChildren,
      onContentHeightChange: handleContentHeightChange,
      children: ({
        contentHeight
      }) => {
        const chartHeight = contentHeight > 0 ? contentHeight : height;
        return /* @__PURE__ */ _jsx12("div", {
          role: "grid",
          "aria-label": __("Bar chart", "jetpack-charts"),
          tabIndex: 0,
          onKeyDown: onChartKeyDown,
          onFocus: onChartFocus,
          onBlur: onChartBlur,
          children: chartHeight > 0 && /* @__PURE__ */ _jsx12("div", {
            ref: chartRef,
            children: /* @__PURE__ */ _jsxs4(XYChart, {
              theme,
              width,
              height: chartHeight,
              margin: {
                ...defaultMargin,
                ...margin
              },
              xScale: chartOptions.xScale,
              yScale: chartOptions.yScale,
              horizontal,
              pointerEventsDataKey: "nearest",
              children: [/* @__PURE__ */ _jsx12(Grid, {
                columns: gridVisibility.includes("y"),
                rows: gridVisibility.includes("x"),
                numTicks: 4
              }), withPatterns && /* @__PURE__ */ _jsxs4(_Fragment4, {
                children: [/* @__PURE__ */ _jsx12("defs", {
                  children: dataSorted.map((seriesData, index) => renderPattern(index, getElementStyles({
                    data: seriesData,
                    index
                  }).color))
                }), /* @__PURE__ */ _jsx12("style", {
                  children: dataSorted.map((seriesData, index) => createPatternBorderStyle(index, getElementStyles({
                    data: seriesData,
                    index
                  }).color))
                })]
              }), highlightedBarStyle && /* @__PURE__ */ _jsx12("style", {
                children: highlightedBarStyle
              }), allSeriesHidden ? /* @__PURE__ */ _jsx12(SvgEmptyState, {
                x: width / 2,
                y: chartHeight / 2,
                width,
                height: chartHeight,
                children: __("All series are hidden. Click legend items to show data.", "jetpack-charts")
              }) : null, /* @__PURE__ */ _jsx12(BarGroup, {
                padding: chartOptions.barGroup.padding,
                children: seriesWithVisibility.map(({
                  series: seriesData,
                  index,
                  isVisible
                }) => {
                  if (!isVisible) {
                    return null;
                  }
                  return /* @__PURE__ */ _jsx12(BarSeries, {
                    dataKey: seriesData?.label,
                    data: seriesData.data,
                    yAccessor: chartOptions.accessors.yAccessor,
                    xAccessor: chartOptions.accessors.xAccessor,
                    colorAccessor: getBarBackground(index)
                  }, seriesData?.label);
                })
              }), /* @__PURE__ */ _jsx12(Axis, {
                ...chartOptions.axis.x
              }), /* @__PURE__ */ _jsx12(Axis, {
                ...chartOptions.axis.y
              }), withTooltips && /* @__PURE__ */ _jsx12(AccessibleTooltip, {
                detectBounds: true,
                snapTooltipToDatumX: true,
                snapTooltipToDatumY: true,
                renderTooltip: renderTooltip || renderDefaultTooltip2,
                selectedIndex,
                tooltipRef,
                keyboardFocusedClassName: bar_chart_module_default["bar-chart__tooltip--keyboard-focused"],
                series: data,
                mode: "individual"
              })]
            })
          })
        });
      }
    })
  });
};
var BarChartWithProvider = (props) => {
  const existingContext = useContext9(GlobalChartsContext);
  if (existingContext) {
    return /* @__PURE__ */ _jsx12(BarChartInternal, {
      ...props
    });
  }
  return /* @__PURE__ */ _jsx12(GlobalChartsProvider, {
    children: /* @__PURE__ */ _jsx12(BarChartInternal, {
      ...props
    })
  });
};
BarChartWithProvider.displayName = "BarChart";
var BarChart = attachSubComponents(BarChartWithProvider, {
  Legend
});
var BarChartResponsive = attachSubComponents(withResponsive(BarChartWithProvider), {
  Legend
});

// src/charts/bar-list-chart/bar-list-chart.tsx
import { formatNumberCompact as formatNumberCompact3 } from "@automattic/number-formatters";
import { Group as Group3 } from "@visx/group";
import { createScale as createScale2, scaleBand } from "@visx/scale";
import { Text } from "@visx/text";
import { useContext as useContext10, useMemo as useMemo16 } from "react";
import { jsx as _jsx13, jsxs as _jsxs5 } from "react/jsx-runtime";
var getScaleBandwidth2 = (scale) => {
  const s2 = scale;
  return s2 && "bandwidth" in s2 ? s2?.bandwidth() ?? 0 : 0;
};
var DefaultLabelComponent = ({
  textProps,
  x: x2,
  y: y2,
  label,
  formatter
}) => {
  return /* @__PURE__ */ _jsx13(Text, {
    ...textProps,
    textAnchor: "start",
    x: x2,
    y: y2,
    children: formatter(label)
  });
};
var DefaultValueComponent = ({
  textProps,
  x: x2,
  y: y2,
  value,
  formatter
}) => {
  return /* @__PURE__ */ _jsx13(Text, {
    ...textProps,
    textAnchor: "end",
    x: x2,
    y: y2,
    fontWeight: 500,
    children: formatter(value)
  });
};
var AxisRenderer = ({
  ticks,
  tickLabelProps,
  yOffset,
  labelPosition,
  valuePosition,
  data,
  labelFormatter,
  valueFormatter,
  LabelComponent = DefaultLabelComponent,
  ValueComponent = DefaultValueComponent
}) => {
  if (ticks.length === 0) {
    return null;
  }
  const allTickLabelProps = ticks.map(({
    value,
    index
  }) => typeof tickLabelProps === "function" ? tickLabelProps(value, index, ticks) : {});
  return ticks.map(({
    from: from2,
    formattedValue
  }, index) => {
    const textProps = allTickLabelProps[index] ?? {};
    delete textProps.textAnchor;
    delete textProps.dx;
    const sum = data.reduce((acc, {
      data: seriesData
    }) => acc + (seriesData[index]?.value ?? 0), 0);
    const y2 = from2.y + yOffset;
    return /* @__PURE__ */ _jsxs5(Group3, {
      children: [/* @__PURE__ */ _jsx13(LabelComponent, {
        textProps,
        x: labelPosition,
        y: y2,
        label: formattedValue,
        formatter: labelFormatter
      }), /* @__PURE__ */ _jsx13(ValueComponent, {
        textProps,
        x: valuePosition,
        y: y2,
        value: sum,
        formatter: valueFormatter,
        data,
        index
      })]
    }, index);
  });
};
var getDefaultYOffset = (data, yScaleConfig, height, isMultiSeries) => {
  if (!isMultiSeries) {
    return 0;
  }
  const dataKeys = data.map(({
    label
  }) => label);
  const yScale = createScale2({
    type: "band",
    range: [0, height],
    domain: dataKeys,
    ...yScaleConfig
  });
  const groupScale = scaleBand({
    domain: dataKeys,
    range: [0, getScaleBandwidth2(yScale)],
    padding: yScaleConfig.paddingInner
  });
  const GAP_BETWEEN_BARS = 6;
  const barThickness = getScaleBandwidth2(groupScale);
  return -(barThickness + GAP_BETWEEN_BARS);
};
var BarListChartInternal = ({
  data,
  width,
  height,
  options = {},
  margin = {
    left: 0,
    right: 20,
    bottom: 0,
    top: 0
  },
  ...rest
}) => {
  const chartOptions = useMemo16(() => {
    const isMultiSeries = data.length > 1;
    const defaultYScale = {
      // For multi series, set default padding larger to look better.
      paddingInner: isMultiSeries ? 0.3 : 0.1,
      padding: isMultiSeries ? 0.3 : 0.1
    };
    const defaultXScale = {
      // Always begin at zero since the x axis is hidden.
      zero: true
    };
    const yScale = {
      ...defaultYScale,
      ...options.yScale ?? {}
    };
    const xScale = {
      ...defaultXScale,
      ...options.xScale ?? {}
    };
    return {
      yScale,
      xScale,
      labelPosition: options.labelPosition ?? (isMultiSeries ? 0 : 10),
      valueFormatter: options.valueFormatter ?? ((value) => formatNumberCompact3(value)),
      labelFormatter: options.labelFormatter ?? ((value) => String(value)),
      valuePosition: options.valuePosition ?? width,
      yOffset: options.yOffset ?? getDefaultYOffset(data, yScale, height, isMultiSeries)
    };
  }, [options, width, data, height]);
  return /* @__PURE__ */ _jsx13(BarChart, {
    orientation: "horizontal",
    gridVisibility: "none",
    data,
    width,
    height,
    margin,
    options: {
      axis: {
        y: {
          children: (renderProps) => /* @__PURE__ */ _jsx13(AxisRenderer, {
            ...renderProps,
            data,
            yOffset: chartOptions.yOffset,
            labelPosition: chartOptions.labelPosition,
            valuePosition: chartOptions.valuePosition,
            labelFormatter: chartOptions.labelFormatter,
            valueFormatter: chartOptions.valueFormatter,
            LabelComponent: options.labelComponent,
            ValueComponent: options.valueComponent
          })
        },
        x: {
          children: () => null
        }
      },
      xScale: chartOptions.xScale,
      yScale: chartOptions.yScale
    },
    ...rest
  });
};
var BarListChart = (props) => {
  const existingContext = useContext10(GlobalChartsContext);
  if (existingContext) {
    return /* @__PURE__ */ _jsx13(BarListChartInternal, {
      ...props
    });
  }
  return /* @__PURE__ */ _jsx13(GlobalChartsProvider, {
    children: /* @__PURE__ */ _jsx13(BarListChartInternal, {
      ...props
    })
  });
};
BarListChart.displayName = "BarListChart";
var BarListChartResponsive = withResponsive(BarListChart);

// src/charts/conversion-funnel-chart/conversion-funnel-chart.tsx
import { useTooltip as useTooltip2, useTooltipInPortal } from "@visx/tooltip";
import clsx3 from "clsx";
import { useRef as useRef8, useMemo as useMemo17, useEffect as useEffect8, useCallback as useCallback10, useContext as useContext11 } from "react";

// src/charts/conversion-funnel-chart/conversion-funnel-chart.module.scss
var conversion_funnel_chart_module_default = {
  "conversionFunnelChart": "a8ccharts-lK-YNK",
  "loading": "a8ccharts-DbHKK5",
  "main-metric": "a8ccharts-61WPYr",
  "main-rate": "a8ccharts-RRRI6x",
  "change-indicator": "a8ccharts-661iwx",
  "funnel-container": "a8ccharts-Z7EGnW",
  "funnel-step": "a8ccharts-VqFY0l",
  "blurred": "a8ccharts-7dTRBs",
  "step-header": "a8ccharts-2JsQiV",
  "step-label": "a8ccharts-6OabC4",
  "step-rate": "a8ccharts-9wSZ6n",
  "bar-container": "a8ccharts-sSmCTi",
  "disabled": "a8ccharts-PLWVAW",
  "funnel-bar": "a8ccharts-EzczI-",
  "selected": "a8ccharts-wNpZEu",
  "funnel-bar--animated": "a8ccharts-68HQJl",
  "stretch": "a8ccharts-CmtieZ",
  "tooltip-wrapper": "a8ccharts-2TeoCn",
  "tooltip-title": "a8ccharts-jkRitH",
  "tooltip-content": "a8ccharts-8jgT-3",
  "empty-state": "a8ccharts-Ml6MMr"
};

// src/charts/conversion-funnel-chart/private/use-funnel-selection.ts
import { useCallback as useCallback9, useState as useState7 } from "react";
var useFunnelSelection = (hideTooltip) => {
  const [clickedStep, setClickedStep] = useState7(null);
  const handleBarClick = useCallback9(
    (stepId) => {
      if (clickedStep === stepId) {
        setClickedStep(null);
        hideTooltip?.();
      } else {
        setClickedStep(stepId);
      }
    },
    [clickedStep, hideTooltip]
  );
  const handleBarKeyDown = useCallback9(
    (stepId, event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        if (clickedStep === stepId) {
          setClickedStep(null);
          hideTooltip?.();
        } else {
          setClickedStep(stepId);
        }
      } else if (event.key === "Escape") {
        event.preventDefault();
        setClickedStep(null);
        hideTooltip?.();
      }
    },
    [clickedStep, hideTooltip]
  );
  const clearSelection = useCallback9(() => {
    setClickedStep(null);
    hideTooltip?.();
  }, [hideTooltip]);
  const getStepState = useCallback9(
    (stepId) => ({
      isClicked: clickedStep === stepId,
      isBlurred: clickedStep !== null && clickedStep !== stepId
    }),
    [clickedStep]
  );
  return {
    clickedStep,
    handleBarClick,
    handleBarKeyDown,
    clearSelection,
    getStepState
  };
};

// src/charts/conversion-funnel-chart/conversion-funnel-chart.tsx
import { jsx as _jsx14, Fragment as _Fragment5, jsxs as _jsxs6 } from "react/jsx-runtime";
var ConversionFunnelChartInternal = ({
  mainRate,
  changeIndicator,
  steps,
  loading = false,
  animation,
  className,
  chartId: providedChartId,
  height,
  style,
  renderStepLabel,
  renderStepRate,
  renderMainMetric,
  renderTooltip
}) => {
  const chartId = useChartId(providedChartId);
  const {
    conversionFunnelChart: conversionFunnelChartSettings
  } = useGlobalChartsTheme();
  const {
    getElementStyles
  } = useGlobalChartsContext();
  const chartRef = useRef8(null);
  const selectedBarRef = useRef8(null);
  const {
    tooltipData,
    tooltipLeft,
    tooltipTop,
    tooltipOpen,
    showTooltip,
    hideTooltip
  } = useTooltip2();
  const {
    handleBarClick,
    handleBarKeyDown,
    clearSelection,
    getStepState
  } = useFunnelSelection(hideTooltip);
  const {
    containerRef: portalContainerRef,
    TooltipInPortal,
    containerBounds
  } = useTooltipInPortal({
    // use TooltipWithBounds for boundary detection
    detectBounds: true,
    // when tooltip containers are scrolled, this will correctly update the Tooltip position
    scroll: true
  });
  const clearSelectionAndRef = useCallback10(() => {
    clearSelection();
    selectedBarRef.current = null;
    hideTooltip();
  }, [clearSelection, hideTooltip]);
  const showTooltipAt = useCallback10((step, x2, y2) => {
    showTooltip({
      tooltipData: step,
      tooltipLeft: x2,
      tooltipTop: y2 - 10
    });
  }, [showTooltip]);
  const getMouseTooltipCoords = useCallback10((event) => {
    if (containerBounds.width === 0 || containerBounds.height === 0) {
      return null;
    }
    return {
      x: event.clientX - containerBounds.left,
      y: event.clientY - containerBounds.top
    };
  }, [containerBounds.width, containerBounds.height, containerBounds.left, containerBounds.top]);
  const getKeyboardTooltipCoords = useCallback10((event) => {
    if (containerBounds.width === 0 || containerBounds.height === 0) {
      return null;
    }
    const rect = event.currentTarget.getBoundingClientRect();
    const x2 = rect.left + rect.width / 2 - containerBounds.left;
    const y2 = rect.top - containerBounds.top;
    return {
      x: x2,
      y: y2
    };
  }, [containerBounds.width, containerBounds.height, containerBounds.left, containerBounds.top]);
  const handleStepInteraction = useCallback10((step, event, interactionType) => {
    selectedBarRef.current = event.currentTarget;
    const {
      isClicked
    } = getStepState(step.id);
    if (isClicked) {
      if (interactionType === "click") {
        handleBarClick(step.id);
      } else {
        handleBarKeyDown(step.id, event);
      }
      return;
    }
    if (interactionType === "click") {
      handleBarClick(step.id);
      const coords = getMouseTooltipCoords(event);
      if (coords) {
        showTooltipAt(step, coords.x, coords.y);
      }
    } else {
      handleBarKeyDown(step.id, event);
      const coords = getKeyboardTooltipCoords(event);
      if (coords) {
        showTooltipAt(step, coords.x, coords.y);
      }
    }
  }, [getStepState, handleBarClick, handleBarKeyDown, showTooltipAt, getMouseTooltipCoords, getKeyboardTooltipCoords]);
  const stepHandlers = useMemo17(() => {
    const handlers = /* @__PURE__ */ new Map();
    steps.forEach((step) => {
      const onClick = (event) => {
        event.stopPropagation();
        handleStepInteraction(step, event, "click");
      };
      const onKeyDown = (event) => {
        if (event.key === "Enter" || event.key === " ") {
          handleStepInteraction(step, event, "keyboard");
        } else {
          selectedBarRef.current = event.currentTarget;
          handleBarKeyDown(step.id, event);
        }
      };
      handlers.set(step.id, {
        onClick,
        onKeyDown
      });
    });
    return handlers;
  }, [steps, handleStepInteraction, handleBarKeyDown]);
  useEffect8(() => {
    const handleDocumentClick = (event) => {
      if (selectedBarRef.current && !selectedBarRef.current.contains(event.target)) {
        clearSelectionAndRef();
      }
    };
    document.addEventListener("mousedown", handleDocumentClick);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, [clearSelectionAndRef]);
  const resolvedHeight = height ?? style?.height ?? "100%";
  const {
    primaryColor,
    backgroundColor,
    positiveChangeColor,
    negativeChangeColor
  } = conversionFunnelChartSettings;
  const {
    color: barColor
  } = getElementStyles ? getElementStyles({
    index: 0,
    overrideColor: primaryColor
  }) : {
    color: primaryColor || "#000000"
  };
  const isPositiveChange = changeIndicator?.startsWith("+");
  const changeColor = isPositiveChange ? positiveChangeColor : negativeChangeColor;
  const barBackgroundColor = backgroundColor || hexToRgba(barColor, 0.08) || "rgba(0, 0, 0, 0.08)";
  const renderDefaultMainMetric = () => /* @__PURE__ */ _jsxs6(_Fragment5, {
    children: [/* @__PURE__ */ _jsx14("span", {
      className: conversion_funnel_chart_module_default["main-rate"],
      children: formatPercentage(mainRate)
    }), changeIndicator && /* @__PURE__ */ _jsx14("span", {
      className: conversion_funnel_chart_module_default["change-indicator"],
      style: {
        color: changeColor
      },
      children: changeIndicator
    })]
  });
  const renderDefaultTooltip2 = (step) => /* @__PURE__ */ _jsxs6(_Fragment5, {
    children: [/* @__PURE__ */ _jsx14("div", {
      className: conversion_funnel_chart_module_default["tooltip-title"],
      children: step.label
    }), /* @__PURE__ */ _jsxs6("div", {
      className: conversion_funnel_chart_module_default["tooltip-content"],
      children: [formatPercentage(step.rate), ` \u2022 ${step.count ?? "no"} items`]
    })]
  });
  const isDataValid = Boolean(steps && steps.length > 0);
  const chartMetadata = useMemo17(() => ({
    mainRate,
    changeIndicator,
    stepsCount: steps?.length || 0
  }), [mainRate, changeIndicator, steps?.length]);
  useChartRegistration({
    chartId,
    legendItems: [],
    chartType: "conversion-funnel",
    isDataValid,
    metadata: chartMetadata
  });
  const prefersReducedMotion = usePrefersReducedMotion();
  if (!isDataValid) {
    return /* @__PURE__ */ _jsx14(Stack, {
      direction: "column",
      className: clsx3(conversion_funnel_chart_module_default.conversionFunnelChart, loading && conversion_funnel_chart_module_default.loading, className),
      style: {
        ...style,
        height: resolvedHeight
      },
      children: /* @__PURE__ */ _jsx14("div", {
        className: conversion_funnel_chart_module_default["empty-state"],
        children: loading ? "Loading..." : "No data available"
      })
    });
  }
  const maxRate = Math.max(...steps.map((step) => step.rate));
  return /* @__PURE__ */ _jsxs6(_Fragment5, {
    children: [/* @__PURE__ */ _jsxs6(Stack, {
      direction: "column",
      ref: (node2) => {
        portalContainerRef(node2);
        chartRef.current = node2;
      },
      className: clsx3(conversion_funnel_chart_module_default.conversionFunnelChart, loading && conversion_funnel_chart_module_default.loading, className),
      style: {
        ...style,
        height: resolvedHeight
      },
      children: [renderMainMetric ? renderMainMetric({
        mainRate,
        changeIndicator,
        className: conversion_funnel_chart_module_default["main-metric"],
        changeColor
      }) : /* @__PURE__ */ _jsx14("div", {
        className: conversion_funnel_chart_module_default["main-metric"],
        children: renderDefaultMainMetric()
      }), /* @__PURE__ */ _jsx14("div", {
        className: conversion_funnel_chart_module_default["funnel-container"],
        children: steps.map((step, index) => {
          const barHeight = step.rate / maxRate * 100;
          const {
            isBlurred
          } = getStepState(step.id);
          return /* @__PURE__ */ _jsxs6("div", {
            className: clsx3(conversion_funnel_chart_module_default["funnel-step"], isBlurred && conversion_funnel_chart_module_default.blurred),
            children: [/* @__PURE__ */ _jsxs6("div", {
              className: conversion_funnel_chart_module_default["step-header"],
              children: [renderStepLabel ? renderStepLabel({
                step,
                index,
                className: conversion_funnel_chart_module_default["step-label"]
              }) : /* @__PURE__ */ _jsx14("span", {
                className: conversion_funnel_chart_module_default["step-label"],
                children: step.label
              }), renderStepRate ? renderStepRate({
                step,
                index,
                className: conversion_funnel_chart_module_default["step-rate"]
              }) : /* @__PURE__ */ _jsx14("span", {
                className: conversion_funnel_chart_module_default["step-rate"],
                children: formatPercentage(step.rate)
              })]
            }), /* @__PURE__ */ _jsx14("div", {
              className: clsx3(conversion_funnel_chart_module_default["bar-container"], isBlurred && conversion_funnel_chart_module_default.disabled),
              onClick: stepHandlers.get(step.id)?.onClick,
              onKeyDown: stepHandlers.get(step.id)?.onKeyDown,
              role: "button",
              tabIndex: isBlurred ? -1 : 0,
              "aria-label": step.label,
              style: {
                backgroundColor: barBackgroundColor
              },
              children: /* @__PURE__ */ _jsx14("div", {
                className: clsx3(conversion_funnel_chart_module_default["funnel-bar"], {
                  [conversion_funnel_chart_module_default["funnel-bar--animated"]]: animation && !loading && !prefersReducedMotion
                }),
                style: {
                  height: `${barHeight}%`,
                  backgroundColor: barColor
                }
              })
            })]
          }, step.id);
        })
      })]
    }), tooltipOpen && tooltipData && (() => {
      const tooltipContent = renderTooltip ? renderTooltip({
        step: tooltipData,
        index: steps.findIndex((s2) => s2.id === tooltipData.id),
        top: tooltipTop,
        left: tooltipLeft,
        className: conversion_funnel_chart_module_default["tooltip-wrapper"]
      }) : renderDefaultTooltip2(tooltipData);
      if (!tooltipContent) return null;
      return /* @__PURE__ */ _jsx14(
        TooltipInPortal,
        {
          top: tooltipTop,
          left: tooltipLeft,
          className: conversion_funnel_chart_module_default["tooltip-wrapper"],
          children: tooltipContent
        },
        Math.random()
      );
    })()]
  });
};
var ConversionFunnelChartWithProvider = (props) => {
  const existingContext = useContext11(GlobalChartsContext);
  if (existingContext) {
    return /* @__PURE__ */ _jsx14(ConversionFunnelChartInternal, {
      ...props
    });
  }
  return /* @__PURE__ */ _jsx14(GlobalChartsProvider, {
    children: /* @__PURE__ */ _jsx14(ConversionFunnelChartInternal, {
      ...props
    })
  });
};
ConversionFunnelChartWithProvider.displayName = "ConversionFunnelChart";

// src/charts/geo-chart/geo-chart.tsx
import { __ as __2 } from "@wordpress/i18n";
import clsx4 from "clsx";
import { useContext as useContext12, useMemo as useMemo18 } from "react";
import { Chart } from "react-google-charts";

// src/charts/geo-chart/geo-chart.module.scss
var geo_chart_module_default = {
  "container": "a8ccharts-JvcqOz"
};

// src/charts/geo-chart/geo-chart.tsx
import { jsx as _jsx15 } from "react/jsx-runtime";
var DEFAULT_FEATURE_FILL_COLOR = "#ffffff";
var DEFAULT_BACKGROUND_COLOR = "#ffffff";
var GeoChartInternal = ({
  className,
  data,
  width,
  height,
  region = "world",
  resolution = "countries",
  renderPlaceholder
}) => {
  const {
    getElementStyles,
    theme: {
      geoChart: {
        featureFillColor
      },
      backgroundColor
    }
  } = useGlobalChartsContext();
  const loadingPlaceholder = /* @__PURE__ */ _jsx15("div", {
    className: clsx4("geo-chart", geo_chart_module_default.container, className),
    style: {
      width,
      height
    },
    children: renderPlaceholder ? renderPlaceholder() : __2("Loading map", "jetpack-charts")
  });
  const fullColorHex = getElementStyles({
    index: 0
  }).color;
  const lightColorHex = lightenHexColor(fullColorHex, 0.8);
  const backgroundColorHex = normalizeColorToHex(backgroundColor, null, resolveCssVariable) || DEFAULT_BACKGROUND_COLOR;
  const defaultFillColorHex = normalizeColorToHex(featureFillColor, null, resolveCssVariable) || DEFAULT_FEATURE_FILL_COLOR;
  const hasHtmlTooltips = useMemo18(() => data.length > 0 && data[0].some((col) => typeof col === "object" && col !== null && "role" in col && col.role === "tooltip" && "p" in col && typeof col.p === "object" && col.p !== null && "html" in col.p && col.p.html === true), [data]);
  const options = useMemo18(() => ({
    ...region !== "world" && {
      region
    },
    ...resolution !== "countries" && {
      resolution
    },
    colorAxis: {
      colors: [lightColorHex, fullColorHex]
    },
    backgroundColor: backgroundColorHex,
    datalessRegionColor: defaultFillColorHex,
    defaultColor: defaultFillColorHex,
    tooltip: {
      trigger: "focus",
      isHtml: hasHtmlTooltips
    },
    legend: "none",
    keepAspectRatio: true
  }), [region, resolution, lightColorHex, fullColorHex, backgroundColorHex, defaultFillColorHex, hasHtmlTooltips]);
  return /* @__PURE__ */ _jsx15("div", {
    className: clsx4("geo-chart", geo_chart_module_default.container, className),
    style: {
      width,
      height,
      backgroundColor
    },
    children: /* @__PURE__ */ _jsx15(Chart, {
      chartType: "GeoChart",
      width,
      height,
      data,
      options,
      loader: loadingPlaceholder
    })
  });
};
var GeoChartWithProvider = (props) => {
  const existingContext = useContext12(GlobalChartsContext);
  if (existingContext) {
    return /* @__PURE__ */ _jsx15(GeoChartInternal, {
      ...props
    });
  }
  return /* @__PURE__ */ _jsx15(GlobalChartsProvider, {
    children: /* @__PURE__ */ _jsx15(GeoChartInternal, {
      ...props
    })
  });
};
GeoChartWithProvider.displayName = "GeoChart";
var GeoChartResponsive = withResponsive(GeoChartWithProvider);

// ../../../node_modules/.pnpm/@wordpress+components@32.3.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/utils/values.mjs
function isValueDefined(value) {
  return value !== void 0 && value !== null;
}

// ../../../node_modules/.pnpm/@wordpress+components@32.3.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/utils/hooks/use-update-effect.mjs
function useUpdateEffect(effect, deps) {
  const mountedRef = useRef6(false);
  useEffect6(() => {
    if (mountedRef.current) {
      return effect();
    }
    mountedRef.current = true;
    return void 0;
  }, deps);
  useEffect6(() => () => {
    mountedRef.current = false;
  }, []);
}
var use_update_effect_default = useUpdateEffect;

// ../../../node_modules/.pnpm/@emotion+react@11.14.0_@types+react@18.3.28_react@18.3.1/node_modules/@emotion/react/dist/emotion-element-d59e098f.esm.js
import * as React6 from "react";
import { useContext as useContext14, forwardRef as forwardRef5 } from "react";

// ../../../node_modules/.pnpm/@emotion+sheet@1.4.0/node_modules/@emotion/sheet/dist/emotion-sheet.esm.js
var isDevelopment = false;
function sheetForTag(tag) {
  if (tag.sheet) {
    return tag.sheet;
  }
  for (var i2 = 0; i2 < document.styleSheets.length; i2++) {
    if (document.styleSheets[i2].ownerNode === tag) {
      return document.styleSheets[i2];
    }
  }
  return void 0;
}
function createStyleElement(options) {
  var tag = document.createElement("style");
  tag.setAttribute("data-emotion", options.key);
  if (options.nonce !== void 0) {
    tag.setAttribute("nonce", options.nonce);
  }
  tag.appendChild(document.createTextNode(""));
  tag.setAttribute("data-s", "");
  return tag;
}
var StyleSheet = /* @__PURE__ */ (function() {
  function StyleSheet2(options) {
    var _this = this;
    this._insertTag = function(tag) {
      var before;
      if (_this.tags.length === 0) {
        if (_this.insertionPoint) {
          before = _this.insertionPoint.nextSibling;
        } else if (_this.prepend) {
          before = _this.container.firstChild;
        } else {
          before = _this.before;
        }
      } else {
        before = _this.tags[_this.tags.length - 1].nextSibling;
      }
      _this.container.insertBefore(tag, before);
      _this.tags.push(tag);
    };
    this.isSpeedy = options.speedy === void 0 ? !isDevelopment : options.speedy;
    this.tags = [];
    this.ctr = 0;
    this.nonce = options.nonce;
    this.key = options.key;
    this.container = options.container;
    this.prepend = options.prepend;
    this.insertionPoint = options.insertionPoint;
    this.before = null;
  }
  var _proto = StyleSheet2.prototype;
  _proto.hydrate = function hydrate2(nodes) {
    nodes.forEach(this._insertTag);
  };
  _proto.insert = function insert(rule) {
    if (this.ctr % (this.isSpeedy ? 65e3 : 1) === 0) {
      this._insertTag(createStyleElement(this));
    }
    var tag = this.tags[this.tags.length - 1];
    if (this.isSpeedy) {
      var sheet2 = sheetForTag(tag);
      try {
        sheet2.insertRule(rule, sheet2.cssRules.length);
      } catch (e2) {
      }
    } else {
      tag.appendChild(document.createTextNode(rule));
    }
    this.ctr++;
  };
  _proto.flush = function flush2() {
    this.tags.forEach(function(tag) {
      var _tag$parentNode;
      return (_tag$parentNode = tag.parentNode) == null ? void 0 : _tag$parentNode.removeChild(tag);
    });
    this.tags = [];
    this.ctr = 0;
  };
  return StyleSheet2;
})();

// ../../../node_modules/.pnpm/stylis@4.2.0/node_modules/stylis/src/Enum.js
var MS = "-ms-";
var MOZ = "-moz-";
var WEBKIT = "-webkit-";
var COMMENT = "comm";
var RULESET = "rule";
var DECLARATION = "decl";
var IMPORT = "@import";
var KEYFRAMES = "@keyframes";
var LAYER = "@layer";

// ../../../node_modules/.pnpm/stylis@4.2.0/node_modules/stylis/src/Utility.js
var abs = Math.abs;
var from = String.fromCharCode;
var assign = Object.assign;
function hash(value, length2) {
  return charat(value, 0) ^ 45 ? (((length2 << 2 ^ charat(value, 0)) << 2 ^ charat(value, 1)) << 2 ^ charat(value, 2)) << 2 ^ charat(value, 3) : 0;
}
function trim(value) {
  return value.trim();
}
function match(value, pattern) {
  return (value = pattern.exec(value)) ? value[0] : value;
}
function replace2(value, pattern, replacement) {
  return value.replace(pattern, replacement);
}
function indexof(value, search) {
  return value.indexOf(search);
}
function charat(value, index) {
  return value.charCodeAt(index) | 0;
}
function substr(value, begin, end) {
  return value.slice(begin, end);
}
function strlen(value) {
  return value.length;
}
function sizeof(value) {
  return value.length;
}
function append(value, array) {
  return array.push(value), value;
}
function combine(array, callback) {
  return array.map(callback).join("");
}

// ../../../node_modules/.pnpm/stylis@4.2.0/node_modules/stylis/src/Tokenizer.js
var line = 1;
var column = 1;
var length = 0;
var position = 0;
var character = 0;
var characters = "";
function node(value, root, parent, type, props, children, length2) {
  return { value, root, parent, type, props, children, line, column, length: length2, return: "" };
}
function copy(root, props) {
  return assign(node("", null, null, "", null, null, 0), root, { length: -root.length }, props);
}
function char() {
  return character;
}
function prev() {
  character = position > 0 ? charat(characters, --position) : 0;
  if (column--, character === 10)
    column = 1, line--;
  return character;
}
function next() {
  character = position < length ? charat(characters, position++) : 0;
  if (column++, character === 10)
    column = 1, line++;
  return character;
}
function peek() {
  return charat(characters, position);
}
function caret() {
  return position;
}
function slice(begin, end) {
  return substr(characters, begin, end);
}
function token(type) {
  switch (type) {
    // \0 \t \n \r \s whitespace token
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    // ! + , / > @ ~ isolate token
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    // ; { } breakpoint token
    case 59:
    case 123:
    case 125:
      return 4;
    // : accompanied token
    case 58:
      return 3;
    // " ' ( [ opening delimit token
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    // ) ] closing delimit token
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function alloc(value) {
  return line = column = 1, length = strlen(characters = value), position = 0, [];
}
function dealloc(value) {
  return characters = "", value;
}
function delimit(type) {
  return trim(slice(position - 1, delimiter(type === 91 ? type + 2 : type === 40 ? type + 1 : type)));
}
function whitespace(type) {
  while (character = peek())
    if (character < 33)
      next();
    else
      break;
  return token(type) > 2 || token(character) > 3 ? "" : " ";
}
function escaping(index, count) {
  while (--count && next())
    if (character < 48 || character > 102 || character > 57 && character < 65 || character > 70 && character < 97)
      break;
  return slice(index, caret() + (count < 6 && peek() == 32 && next() == 32));
}
function delimiter(type) {
  while (next())
    switch (character) {
      // ] ) " '
      case type:
        return position;
      // " '
      case 34:
      case 39:
        if (type !== 34 && type !== 39)
          delimiter(character);
        break;
      // (
      case 40:
        if (type === 41)
          delimiter(type);
        break;
      // \
      case 92:
        next();
        break;
    }
  return position;
}
function commenter(type, index) {
  while (next())
    if (type + character === 47 + 10)
      break;
    else if (type + character === 42 + 42 && peek() === 47)
      break;
  return "/*" + slice(index, position - 1) + "*" + from(type === 47 ? type : next());
}
function identifier(index) {
  while (!token(peek()))
    next();
  return slice(index, position);
}

// ../../../node_modules/.pnpm/stylis@4.2.0/node_modules/stylis/src/Parser.js
function compile(value) {
  return dealloc(parse2("", null, null, null, [""], value = alloc(value), 0, [0], value));
}
function parse2(value, root, parent, rule, rules, rulesets, pseudo, points, declarations) {
  var index = 0;
  var offset = 0;
  var length2 = pseudo;
  var atrule = 0;
  var property = 0;
  var previous = 0;
  var variable = 1;
  var scanning = 1;
  var ampersand = 1;
  var character2 = 0;
  var type = "";
  var props = rules;
  var children = rulesets;
  var reference = rule;
  var characters2 = type;
  while (scanning)
    switch (previous = character2, character2 = next()) {
      // (
      case 40:
        if (previous != 108 && charat(characters2, length2 - 1) == 58) {
          if (indexof(characters2 += replace2(delimit(character2), "&", "&\f"), "&\f") != -1)
            ampersand = -1;
          break;
        }
      // " ' [
      case 34:
      case 39:
      case 91:
        characters2 += delimit(character2);
        break;
      // \t \n \r \s
      case 9:
      case 10:
      case 13:
      case 32:
        characters2 += whitespace(previous);
        break;
      // \
      case 92:
        characters2 += escaping(caret() - 1, 7);
        continue;
      // /
      case 47:
        switch (peek()) {
          case 42:
          case 47:
            append(comment(commenter(next(), caret()), root, parent), declarations);
            break;
          default:
            characters2 += "/";
        }
        break;
      // {
      case 123 * variable:
        points[index++] = strlen(characters2) * ampersand;
      // } ; \0
      case 125 * variable:
      case 59:
      case 0:
        switch (character2) {
          // \0 }
          case 0:
          case 125:
            scanning = 0;
          // ;
          case 59 + offset:
            if (ampersand == -1) characters2 = replace2(characters2, /\f/g, "");
            if (property > 0 && strlen(characters2) - length2)
              append(property > 32 ? declaration(characters2 + ";", rule, parent, length2 - 1) : declaration(replace2(characters2, " ", "") + ";", rule, parent, length2 - 2), declarations);
            break;
          // @ ;
          case 59:
            characters2 += ";";
          // { rule/at-rule
          default:
            append(reference = ruleset(characters2, root, parent, index, offset, rules, points, type, props = [], children = [], length2), rulesets);
            if (character2 === 123)
              if (offset === 0)
                parse2(characters2, root, reference, reference, props, rulesets, length2, points, children);
              else
                switch (atrule === 99 && charat(characters2, 3) === 110 ? 100 : atrule) {
                  // d l m s
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    parse2(value, reference, reference, rule && append(ruleset(value, reference, reference, 0, 0, rules, points, type, rules, props = [], length2), children), rules, children, length2, points, rule ? props : children);
                    break;
                  default:
                    parse2(characters2, reference, reference, reference, [""], children, 0, points, children);
                }
        }
        index = offset = property = 0, variable = ampersand = 1, type = characters2 = "", length2 = pseudo;
        break;
      // :
      case 58:
        length2 = 1 + strlen(characters2), property = previous;
      default:
        if (variable < 1) {
          if (character2 == 123)
            --variable;
          else if (character2 == 125 && variable++ == 0 && prev() == 125)
            continue;
        }
        switch (characters2 += from(character2), character2 * variable) {
          // &
          case 38:
            ampersand = offset > 0 ? 1 : (characters2 += "\f", -1);
            break;
          // ,
          case 44:
            points[index++] = (strlen(characters2) - 1) * ampersand, ampersand = 1;
            break;
          // @
          case 64:
            if (peek() === 45)
              characters2 += delimit(next());
            atrule = peek(), offset = length2 = strlen(type = characters2 += identifier(caret())), character2++;
            break;
          // -
          case 45:
            if (previous === 45 && strlen(characters2) == 2)
              variable = 0;
        }
    }
  return rulesets;
}
function ruleset(value, root, parent, index, offset, rules, points, type, props, children, length2) {
  var post = offset - 1;
  var rule = offset === 0 ? rules : [""];
  var size = sizeof(rule);
  for (var i2 = 0, j2 = 0, k2 = 0; i2 < index; ++i2)
    for (var x2 = 0, y2 = substr(value, post + 1, post = abs(j2 = points[i2])), z = value; x2 < size; ++x2)
      if (z = trim(j2 > 0 ? rule[x2] + " " + y2 : replace2(y2, /&\f/g, rule[x2])))
        props[k2++] = z;
  return node(value, root, parent, offset === 0 ? RULESET : type, props, children, length2);
}
function comment(value, root, parent) {
  return node(value, root, parent, COMMENT, from(char()), substr(value, 2, -2), 0);
}
function declaration(value, root, parent, length2) {
  return node(value, root, parent, DECLARATION, substr(value, 0, length2), substr(value, length2 + 1, -1), length2);
}

// ../../../node_modules/.pnpm/stylis@4.2.0/node_modules/stylis/src/Serializer.js
function serialize(children, callback) {
  var output = "";
  var length2 = sizeof(children);
  for (var i2 = 0; i2 < length2; i2++)
    output += callback(children[i2], i2, children, callback) || "";
  return output;
}
function stringify(element, index, children, callback) {
  switch (element.type) {
    case LAYER:
      if (element.children.length) break;
    case IMPORT:
    case DECLARATION:
      return element.return = element.return || element.value;
    case COMMENT:
      return "";
    case KEYFRAMES:
      return element.return = element.value + "{" + serialize(element.children, callback) + "}";
    case RULESET:
      element.value = element.props.join(",");
  }
  return strlen(children = serialize(element.children, callback)) ? element.return = element.value + "{" + children + "}" : "";
}

// ../../../node_modules/.pnpm/stylis@4.2.0/node_modules/stylis/src/Middleware.js
function middleware(collection) {
  var length2 = sizeof(collection);
  return function(element, index, children, callback) {
    var output = "";
    for (var i2 = 0; i2 < length2; i2++)
      output += collection[i2](element, index, children, callback) || "";
    return output;
  };
}
function rulesheet(callback) {
  return function(element) {
    if (!element.root) {
      if (element = element.return)
        callback(element);
    }
  };
}

// ../../../node_modules/.pnpm/@emotion+weak-memoize@0.4.0/node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.esm.js
var weakMemoize = function weakMemoize2(func) {
  var cache2 = /* @__PURE__ */ new WeakMap();
  return function(arg) {
    if (cache2.has(arg)) {
      return cache2.get(arg);
    }
    var ret = func(arg);
    cache2.set(arg, ret);
    return ret;
  };
};

// ../../../node_modules/.pnpm/@emotion+memoize@0.9.0/node_modules/@emotion/memoize/dist/emotion-memoize.esm.js
function memoize(fn) {
  var cache2 = /* @__PURE__ */ Object.create(null);
  return function(arg) {
    if (cache2[arg] === void 0) cache2[arg] = fn(arg);
    return cache2[arg];
  };
}

// ../../../node_modules/.pnpm/@emotion+cache@11.14.0/node_modules/@emotion/cache/dist/emotion-cache.esm.js
var isBrowser = typeof document !== "undefined";
var identifierWithPointTracking = function identifierWithPointTracking2(begin, points, index) {
  var previous = 0;
  var character2 = 0;
  while (true) {
    previous = character2;
    character2 = peek();
    if (previous === 38 && character2 === 12) {
      points[index] = 1;
    }
    if (token(character2)) {
      break;
    }
    next();
  }
  return slice(begin, position);
};
var toRules = function toRules2(parsed, points) {
  var index = -1;
  var character2 = 44;
  do {
    switch (token(character2)) {
      case 0:
        if (character2 === 38 && peek() === 12) {
          points[index] = 1;
        }
        parsed[index] += identifierWithPointTracking(position - 1, points, index);
        break;
      case 2:
        parsed[index] += delimit(character2);
        break;
      case 4:
        if (character2 === 44) {
          parsed[++index] = peek() === 58 ? "&\f" : "";
          points[index] = parsed[index].length;
          break;
        }
      // fallthrough
      default:
        parsed[index] += from(character2);
    }
  } while (character2 = next());
  return parsed;
};
var getRules = function getRules2(value, points) {
  return dealloc(toRules(alloc(value), points));
};
var fixedElements = /* @__PURE__ */ new WeakMap();
var compat = function compat2(element) {
  if (element.type !== "rule" || !element.parent || // positive .length indicates that this rule contains pseudo
  // negative .length indicates that this rule has been already prefixed
  element.length < 1) {
    return;
  }
  var value = element.value;
  var parent = element.parent;
  var isImplicitRule = element.column === parent.column && element.line === parent.line;
  while (parent.type !== "rule") {
    parent = parent.parent;
    if (!parent) return;
  }
  if (element.props.length === 1 && value.charCodeAt(0) !== 58 && !fixedElements.get(parent)) {
    return;
  }
  if (isImplicitRule) {
    return;
  }
  fixedElements.set(element, true);
  var points = [];
  var rules = getRules(value, points);
  var parentRules = parent.props;
  for (var i2 = 0, k2 = 0; i2 < rules.length; i2++) {
    for (var j2 = 0; j2 < parentRules.length; j2++, k2++) {
      element.props[k2] = points[i2] ? rules[i2].replace(/&\f/g, parentRules[j2]) : parentRules[j2] + " " + rules[i2];
    }
  }
};
var removeLabel = function removeLabel2(element) {
  if (element.type === "decl") {
    var value = element.value;
    if (
      // charcode for l
      value.charCodeAt(0) === 108 && // charcode for b
      value.charCodeAt(2) === 98
    ) {
      element["return"] = "";
      element.value = "";
    }
  }
};
function prefix(value, length2) {
  switch (hash(value, length2)) {
    // color-adjust
    case 5103:
      return WEBKIT + "print-" + value + value;
    // animation, animation-(delay|direction|duration|fill-mode|iteration-count|name|play-state|timing-function)
    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921:
    // text-decoration, filter, clip-path, backface-visibility, column, box-decoration-break
    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005:
    // mask, mask-image, mask-(mode|clip|size), mask-(repeat|origin), mask-position, mask-composite,
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855:
    // background-clip, columns, column-(count|fill|gap|rule|rule-color|rule-style|rule-width|span|width)
    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return WEBKIT + value + value;
    // appearance, user-select, transform, hyphens, text-size-adjust
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return WEBKIT + value + MOZ + value + MS + value + value;
    // flex, flex-direction
    case 6828:
    case 4268:
      return WEBKIT + value + MS + value + value;
    // order
    case 6165:
      return WEBKIT + value + MS + "flex-" + value + value;
    // align-items
    case 5187:
      return WEBKIT + value + replace2(value, /(\w+).+(:[^]+)/, WEBKIT + "box-$1$2" + MS + "flex-$1$2") + value;
    // align-self
    case 5443:
      return WEBKIT + value + MS + "flex-item-" + replace2(value, /flex-|-self/, "") + value;
    // align-content
    case 4675:
      return WEBKIT + value + MS + "flex-line-pack" + replace2(value, /align-content|flex-|-self/, "") + value;
    // flex-shrink
    case 5548:
      return WEBKIT + value + MS + replace2(value, "shrink", "negative") + value;
    // flex-basis
    case 5292:
      return WEBKIT + value + MS + replace2(value, "basis", "preferred-size") + value;
    // flex-grow
    case 6060:
      return WEBKIT + "box-" + replace2(value, "-grow", "") + WEBKIT + value + MS + replace2(value, "grow", "positive") + value;
    // transition
    case 4554:
      return WEBKIT + replace2(value, /([^-])(transform)/g, "$1" + WEBKIT + "$2") + value;
    // cursor
    case 6187:
      return replace2(replace2(replace2(value, /(zoom-|grab)/, WEBKIT + "$1"), /(image-set)/, WEBKIT + "$1"), value, "") + value;
    // background, background-image
    case 5495:
    case 3959:
      return replace2(value, /(image-set\([^]*)/, WEBKIT + "$1$`$1");
    // justify-content
    case 4968:
      return replace2(replace2(value, /(.+:)(flex-)?(.*)/, WEBKIT + "box-pack:$3" + MS + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + WEBKIT + value + value;
    // (margin|padding)-inline-(start|end)
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return replace2(value, /(.+)-inline(.+)/, WEBKIT + "$1$2") + value;
    // (min|max)?(width|height|inline-size|block-size)
    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      if (strlen(value) - 1 - length2 > 6) switch (charat(value, length2 + 1)) {
        // (m)ax-content, (m)in-content
        case 109:
          if (charat(value, length2 + 4) !== 45) break;
        // (f)ill-available, (f)it-content
        case 102:
          return replace2(value, /(.+:)(.+)-([^]+)/, "$1" + WEBKIT + "$2-$3$1" + MOZ + (charat(value, length2 + 3) == 108 ? "$3" : "$2-$3")) + value;
        // (s)tretch
        case 115:
          return ~indexof(value, "stretch") ? prefix(replace2(value, "stretch", "fill-available"), length2) + value : value;
      }
      break;
    // position: sticky
    case 4949:
      if (charat(value, length2 + 1) !== 115) break;
    // display: (flex|inline-flex)
    case 6444:
      switch (charat(value, strlen(value) - 3 - (~indexof(value, "!important") && 10))) {
        // stic(k)y
        case 107:
          return replace2(value, ":", ":" + WEBKIT) + value;
        // (inline-)?fl(e)x
        case 101:
          return replace2(value, /(.+:)([^;!]+)(;|!.+)?/, "$1" + WEBKIT + (charat(value, 14) === 45 ? "inline-" : "") + "box$3$1" + WEBKIT + "$2$3$1" + MS + "$2box$3") + value;
      }
      break;
    // writing-mode
    case 5936:
      switch (charat(value, length2 + 11)) {
        // vertical-l(r)
        case 114:
          return WEBKIT + value + MS + replace2(value, /[svh]\w+-[tblr]{2}/, "tb") + value;
        // vertical-r(l)
        case 108:
          return WEBKIT + value + MS + replace2(value, /[svh]\w+-[tblr]{2}/, "tb-rl") + value;
        // horizontal(-)tb
        case 45:
          return WEBKIT + value + MS + replace2(value, /[svh]\w+-[tblr]{2}/, "lr") + value;
      }
      return WEBKIT + value + MS + value + value;
  }
  return value;
}
var prefixer = function prefixer2(element, index, children, callback) {
  if (element.length > -1) {
    if (!element["return"]) switch (element.type) {
      case DECLARATION:
        element["return"] = prefix(element.value, element.length);
        break;
      case KEYFRAMES:
        return serialize([copy(element, {
          value: replace2(element.value, "@", "@" + WEBKIT)
        })], callback);
      case RULESET:
        if (element.length) return combine(element.props, function(value) {
          switch (match(value, /(::plac\w+|:read-\w+)/)) {
            // :read-(only|write)
            case ":read-only":
            case ":read-write":
              return serialize([copy(element, {
                props: [replace2(value, /:(read-\w+)/, ":" + MOZ + "$1")]
              })], callback);
            // :placeholder
            case "::placeholder":
              return serialize([copy(element, {
                props: [replace2(value, /:(plac\w+)/, ":" + WEBKIT + "input-$1")]
              }), copy(element, {
                props: [replace2(value, /:(plac\w+)/, ":" + MOZ + "$1")]
              }), copy(element, {
                props: [replace2(value, /:(plac\w+)/, MS + "input-$1")]
              })], callback);
          }
          return "";
        });
    }
  }
};
var getServerStylisCache = isBrowser ? void 0 : weakMemoize(function() {
  return memoize(function() {
    return {};
  });
});
var defaultStylisPlugins = [prefixer];
var createCache = function createCache2(options) {
  var key = options.key;
  if (isBrowser && key === "css") {
    var ssrStyles = document.querySelectorAll("style[data-emotion]:not([data-s])");
    Array.prototype.forEach.call(ssrStyles, function(node2) {
      var dataEmotionAttribute = node2.getAttribute("data-emotion");
      if (dataEmotionAttribute.indexOf(" ") === -1) {
        return;
      }
      document.head.appendChild(node2);
      node2.setAttribute("data-s", "");
    });
  }
  var stylisPlugins = options.stylisPlugins || defaultStylisPlugins;
  var inserted = {};
  var container;
  var nodesToHydrate = [];
  if (isBrowser) {
    container = options.container || document.head;
    Array.prototype.forEach.call(
      // this means we will ignore elements which don't have a space in them which
      // means that the style elements we're looking at are only Emotion 11 server-rendered style elements
      document.querySelectorAll('style[data-emotion^="' + key + ' "]'),
      function(node2) {
        var attrib = node2.getAttribute("data-emotion").split(" ");
        for (var i2 = 1; i2 < attrib.length; i2++) {
          inserted[attrib[i2]] = true;
        }
        nodesToHydrate.push(node2);
      }
    );
  }
  var _insert;
  var omnipresentPlugins = [compat, removeLabel];
  if (!getServerStylisCache) {
    var currentSheet;
    var finalizingPlugins = [stringify, rulesheet(function(rule) {
      currentSheet.insert(rule);
    })];
    var serializer = middleware(omnipresentPlugins.concat(stylisPlugins, finalizingPlugins));
    var stylis = function stylis2(styles) {
      return serialize(compile(styles), serializer);
    };
    _insert = function insert(selector, serialized, sheet2, shouldCache) {
      currentSheet = sheet2;
      stylis(selector ? selector + "{" + serialized.styles + "}" : serialized.styles);
      if (shouldCache) {
        cache2.inserted[serialized.name] = true;
      }
    };
  } else {
    var _finalizingPlugins = [stringify];
    var _serializer = middleware(omnipresentPlugins.concat(stylisPlugins, _finalizingPlugins));
    var _stylis = function _stylis2(styles) {
      return serialize(compile(styles), _serializer);
    };
    var serverStylisCache = getServerStylisCache(stylisPlugins)(key);
    var getRules3 = function getRules4(selector, serialized) {
      var name = serialized.name;
      if (serverStylisCache[name] === void 0) {
        serverStylisCache[name] = _stylis(selector ? selector + "{" + serialized.styles + "}" : serialized.styles);
      }
      return serverStylisCache[name];
    };
    _insert = function _insert2(selector, serialized, sheet2, shouldCache) {
      var name = serialized.name;
      var rules = getRules3(selector, serialized);
      if (cache2.compat === void 0) {
        if (shouldCache) {
          cache2.inserted[name] = true;
        }
        return rules;
      } else {
        if (shouldCache) {
          cache2.inserted[name] = rules;
        } else {
          return rules;
        }
      }
    };
  }
  var cache2 = {
    key,
    sheet: new StyleSheet({
      key,
      container,
      nonce: options.nonce,
      speedy: options.speedy,
      prepend: options.prepend,
      insertionPoint: options.insertionPoint
    }),
    nonce: options.nonce,
    inserted,
    registered: {},
    insert: _insert
  };
  cache2.sheet.hydrate(nodesToHydrate);
  return cache2;
};

// ../../../node_modules/.pnpm/@emotion+react@11.14.0_@types+react@18.3.28_react@18.3.1/node_modules/@emotion/react/dist/emotion-element-d59e098f.esm.js
import _extends from "@babel/runtime/helpers/esm/extends";

// ../../../node_modules/.pnpm/@emotion+utils@1.4.2/node_modules/@emotion/utils/dist/emotion-utils.esm.js
var isBrowser2 = typeof document !== "undefined";
function getRegisteredStyles(registered, registeredStyles, classNames) {
  var rawClassName = "";
  classNames.split(" ").forEach(function(className) {
    if (registered[className] !== void 0) {
      registeredStyles.push(registered[className] + ";");
    } else if (className) {
      rawClassName += className + " ";
    }
  });
  return rawClassName;
}
var registerStyles = function registerStyles2(cache2, serialized, isStringTag) {
  var className = cache2.key + "-" + serialized.name;
  if (
    // we only need to add the styles to the registered cache if the
    // class name could be used further down
    // the tree but if it's a string tag, we know it won't
    // so we don't have to add it to registered cache.
    // this improves memory usage since we can avoid storing the whole style string
    (isStringTag === false || // we need to always store it if we're in compat mode and
    // in node since emotion-server relies on whether a style is in
    // the registered cache to know whether a style is global or not
    // also, note that this check will be dead code eliminated in the browser
    isBrowser2 === false && cache2.compat !== void 0) && cache2.registered[className] === void 0
  ) {
    cache2.registered[className] = serialized.styles;
  }
};
var insertStyles = function insertStyles2(cache2, serialized, isStringTag) {
  registerStyles(cache2, serialized, isStringTag);
  var className = cache2.key + "-" + serialized.name;
  if (cache2.inserted[serialized.name] === void 0) {
    var stylesForSSR = "";
    var current = serialized;
    do {
      var maybeStyles = cache2.insert(serialized === current ? "." + className : "", current, cache2.sheet, true);
      if (!isBrowser2 && maybeStyles !== void 0) {
        stylesForSSR += maybeStyles;
      }
      current = current.next;
    } while (current !== void 0);
    if (!isBrowser2 && stylesForSSR.length !== 0) {
      return stylesForSSR;
    }
  }
};

// ../../../node_modules/.pnpm/@emotion+hash@0.9.2/node_modules/@emotion/hash/dist/emotion-hash.esm.js
function murmur2(str) {
  var h2 = 0;
  var k2, i2 = 0, len = str.length;
  for (; len >= 4; ++i2, len -= 4) {
    k2 = str.charCodeAt(i2) & 255 | (str.charCodeAt(++i2) & 255) << 8 | (str.charCodeAt(++i2) & 255) << 16 | (str.charCodeAt(++i2) & 255) << 24;
    k2 = /* Math.imul(k, m): */
    (k2 & 65535) * 1540483477 + ((k2 >>> 16) * 59797 << 16);
    k2 ^= /* k >>> r: */
    k2 >>> 24;
    h2 = /* Math.imul(k, m): */
    (k2 & 65535) * 1540483477 + ((k2 >>> 16) * 59797 << 16) ^ /* Math.imul(h, m): */
    (h2 & 65535) * 1540483477 + ((h2 >>> 16) * 59797 << 16);
  }
  switch (len) {
    case 3:
      h2 ^= (str.charCodeAt(i2 + 2) & 255) << 16;
    case 2:
      h2 ^= (str.charCodeAt(i2 + 1) & 255) << 8;
    case 1:
      h2 ^= str.charCodeAt(i2) & 255;
      h2 = /* Math.imul(h, m): */
      (h2 & 65535) * 1540483477 + ((h2 >>> 16) * 59797 << 16);
  }
  h2 ^= h2 >>> 13;
  h2 = /* Math.imul(h, m): */
  (h2 & 65535) * 1540483477 + ((h2 >>> 16) * 59797 << 16);
  return ((h2 ^ h2 >>> 15) >>> 0).toString(36);
}

// ../../../node_modules/.pnpm/@emotion+unitless@0.10.0/node_modules/@emotion/unitless/dist/emotion-unitless.esm.js
var unitlessKeys = {
  animationIterationCount: 1,
  aspectRatio: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  scale: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};

// ../../../node_modules/.pnpm/@emotion+serialize@1.3.3/node_modules/@emotion/serialize/dist/emotion-serialize.esm.js
var isDevelopment2 = false;
var hyphenateRegex = /[A-Z]|^ms/g;
var animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g;
var isCustomProperty = function isCustomProperty2(property) {
  return property.charCodeAt(1) === 45;
};
var isProcessableValue = function isProcessableValue2(value) {
  return value != null && typeof value !== "boolean";
};
var processStyleName = /* @__PURE__ */ memoize(function(styleName) {
  return isCustomProperty(styleName) ? styleName : styleName.replace(hyphenateRegex, "-$&").toLowerCase();
});
var processStyleValue = function processStyleValue2(key, value) {
  switch (key) {
    case "animation":
    case "animationName": {
      if (typeof value === "string") {
        return value.replace(animationRegex, function(match2, p1, p2) {
          cursor = {
            name: p1,
            styles: p2,
            next: cursor
          };
          return p1;
        });
      }
    }
  }
  if (unitlessKeys[key] !== 1 && !isCustomProperty(key) && typeof value === "number" && value !== 0) {
    return value + "px";
  }
  return value;
};
var noComponentSelectorMessage = "Component selectors can only be used in conjunction with @emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware compiler transform.";
function handleInterpolation(mergedProps, registered, interpolation) {
  if (interpolation == null) {
    return "";
  }
  var componentSelector = interpolation;
  if (componentSelector.__emotion_styles !== void 0) {
    return componentSelector;
  }
  switch (typeof interpolation) {
    case "boolean": {
      return "";
    }
    case "object": {
      var keyframes2 = interpolation;
      if (keyframes2.anim === 1) {
        cursor = {
          name: keyframes2.name,
          styles: keyframes2.styles,
          next: cursor
        };
        return keyframes2.name;
      }
      var serializedStyles = interpolation;
      if (serializedStyles.styles !== void 0) {
        var next2 = serializedStyles.next;
        if (next2 !== void 0) {
          while (next2 !== void 0) {
            cursor = {
              name: next2.name,
              styles: next2.styles,
              next: cursor
            };
            next2 = next2.next;
          }
        }
        var styles = serializedStyles.styles + ";";
        return styles;
      }
      return createStringFromObject(mergedProps, registered, interpolation);
    }
    case "function": {
      if (mergedProps !== void 0) {
        var previousCursor = cursor;
        var result = interpolation(mergedProps);
        cursor = previousCursor;
        return handleInterpolation(mergedProps, registered, result);
      }
      break;
    }
  }
  var asString = interpolation;
  if (registered == null) {
    return asString;
  }
  var cached = registered[asString];
  return cached !== void 0 ? cached : asString;
}
function createStringFromObject(mergedProps, registered, obj) {
  var string = "";
  if (Array.isArray(obj)) {
    for (var i2 = 0; i2 < obj.length; i2++) {
      string += handleInterpolation(mergedProps, registered, obj[i2]) + ";";
    }
  } else {
    for (var key in obj) {
      var value = obj[key];
      if (typeof value !== "object") {
        var asString = value;
        if (registered != null && registered[asString] !== void 0) {
          string += key + "{" + registered[asString] + "}";
        } else if (isProcessableValue(asString)) {
          string += processStyleName(key) + ":" + processStyleValue(key, asString) + ";";
        }
      } else {
        if (key === "NO_COMPONENT_SELECTOR" && isDevelopment2) {
          throw new Error(noComponentSelectorMessage);
        }
        if (Array.isArray(value) && typeof value[0] === "string" && (registered == null || registered[value[0]] === void 0)) {
          for (var _i = 0; _i < value.length; _i++) {
            if (isProcessableValue(value[_i])) {
              string += processStyleName(key) + ":" + processStyleValue(key, value[_i]) + ";";
            }
          }
        } else {
          var interpolated = handleInterpolation(mergedProps, registered, value);
          switch (key) {
            case "animation":
            case "animationName": {
              string += processStyleName(key) + ":" + interpolated + ";";
              break;
            }
            default: {
              string += key + "{" + interpolated + "}";
            }
          }
        }
      }
    }
  }
  return string;
}
var labelPattern = /label:\s*([^\s;{]+)\s*(;|$)/g;
var cursor;
function serializeStyles(args, registered, mergedProps) {
  if (args.length === 1 && typeof args[0] === "object" && args[0] !== null && args[0].styles !== void 0) {
    return args[0];
  }
  var stringMode = true;
  var styles = "";
  cursor = void 0;
  var strings = args[0];
  if (strings == null || strings.raw === void 0) {
    stringMode = false;
    styles += handleInterpolation(mergedProps, registered, strings);
  } else {
    var asTemplateStringsArr = strings;
    styles += asTemplateStringsArr[0];
  }
  for (var i2 = 1; i2 < args.length; i2++) {
    styles += handleInterpolation(mergedProps, registered, args[i2]);
    if (stringMode) {
      var templateStringsArr = strings;
      styles += templateStringsArr[i2];
    }
  }
  labelPattern.lastIndex = 0;
  var identifierName = "";
  var match2;
  while ((match2 = labelPattern.exec(styles)) !== null) {
    identifierName += "-" + match2[1];
  }
  var name = murmur2(styles) + identifierName;
  return {
    name,
    styles,
    next: cursor
  };
}

// ../../../node_modules/.pnpm/@emotion+use-insertion-effect-with-fallbacks@1.2.0_react@18.3.1/node_modules/@emotion/use-insertion-effect-with-fallbacks/dist/emotion-use-insertion-effect-with-fallbacks.esm.js
import * as React5 from "react";
var isBrowser3 = typeof document !== "undefined";
var syncFallback = function syncFallback2(create) {
  return create();
};
var useInsertionEffect3 = React5["useInsertionEffect"] ? React5["useInsertionEffect"] : false;
var useInsertionEffectAlwaysWithSyncFallback = !isBrowser3 ? syncFallback : useInsertionEffect3 || syncFallback;

// ../../../node_modules/.pnpm/@emotion+react@11.14.0_@types+react@18.3.28_react@18.3.1/node_modules/@emotion/react/dist/emotion-element-d59e098f.esm.js
var isDevelopment3 = false;
var isBrowser4 = typeof document !== "undefined";
var EmotionCacheContext = /* @__PURE__ */ React6.createContext(
  // we're doing this to avoid preconstruct's dead code elimination in this one case
  // because this module is primarily intended for the browser and node
  // but it's also required in react native and similar environments sometimes
  // and we could have a special build just for that
  // but this is much easier and the native packages
  // might use a different theme context in the future anyway
  typeof HTMLElement !== "undefined" ? /* @__PURE__ */ createCache({
    key: "css"
  }) : null
);
var CacheProvider = EmotionCacheContext.Provider;
var __unsafe_useEmotionCache = function useEmotionCache() {
  return useContext14(EmotionCacheContext);
};
var withEmotionCache = function withEmotionCache2(func) {
  return /* @__PURE__ */ forwardRef5(function(props, ref) {
    var cache2 = useContext14(EmotionCacheContext);
    return func(props, cache2, ref);
  });
};
if (!isBrowser4) {
  withEmotionCache = function withEmotionCache3(func) {
    return function(props) {
      var cache2 = useContext14(EmotionCacheContext);
      if (cache2 === null) {
        cache2 = createCache({
          key: "css"
        });
        return /* @__PURE__ */ React6.createElement(EmotionCacheContext.Provider, {
          value: cache2
        }, func(props, cache2));
      } else {
        return func(props, cache2);
      }
    };
  };
}
var ThemeContext = /* @__PURE__ */ React6.createContext({});
var hasOwn = {}.hasOwnProperty;
var typePropName = "__EMOTION_TYPE_PLEASE_DO_NOT_USE__";
var createEmotionProps = function createEmotionProps2(type, props) {
  var newProps = {};
  for (var _key in props) {
    if (hasOwn.call(props, _key)) {
      newProps[_key] = props[_key];
    }
  }
  newProps[typePropName] = type;
  return newProps;
};
var Insertion = function Insertion2(_ref2) {
  var cache2 = _ref2.cache, serialized = _ref2.serialized, isStringTag = _ref2.isStringTag;
  registerStyles(cache2, serialized, isStringTag);
  var rules = useInsertionEffectAlwaysWithSyncFallback(function() {
    return insertStyles(cache2, serialized, isStringTag);
  });
  if (!isBrowser4 && rules !== void 0) {
    var _ref22;
    var serializedNames = serialized.name;
    var next2 = serialized.next;
    while (next2 !== void 0) {
      serializedNames += " " + next2.name;
      next2 = next2.next;
    }
    return /* @__PURE__ */ React6.createElement("style", (_ref22 = {}, _ref22["data-emotion"] = cache2.key + " " + serializedNames, _ref22.dangerouslySetInnerHTML = {
      __html: rules
    }, _ref22.nonce = cache2.sheet.nonce, _ref22));
  }
  return null;
};
var Emotion = /* @__PURE__ */ withEmotionCache(function(props, cache2, ref) {
  var cssProp = props.css;
  if (typeof cssProp === "string" && cache2.registered[cssProp] !== void 0) {
    cssProp = cache2.registered[cssProp];
  }
  var WrappedComponent = props[typePropName];
  var registeredStyles = [cssProp];
  var className = "";
  if (typeof props.className === "string") {
    className = getRegisteredStyles(cache2.registered, registeredStyles, props.className);
  } else if (props.className != null) {
    className = props.className + " ";
  }
  var serialized = serializeStyles(registeredStyles, void 0, React6.useContext(ThemeContext));
  className += cache2.key + "-" + serialized.name;
  var newProps = {};
  for (var _key2 in props) {
    if (hasOwn.call(props, _key2) && _key2 !== "css" && _key2 !== typePropName && !isDevelopment3) {
      newProps[_key2] = props[_key2];
    }
  }
  newProps.className = className;
  if (ref) {
    newProps.ref = ref;
  }
  return /* @__PURE__ */ React6.createElement(React6.Fragment, null, /* @__PURE__ */ React6.createElement(Insertion, {
    cache: cache2,
    serialized,
    isStringTag: typeof WrappedComponent === "string"
  }), /* @__PURE__ */ React6.createElement(WrappedComponent, newProps));
});
var Emotion$1 = Emotion;

// ../../../node_modules/.pnpm/@emotion+react@11.14.0_@types+react@18.3.28_react@18.3.1/node_modules/@emotion/react/dist/emotion-react.esm.js
import * as React7 from "react";
import "@babel/runtime/helpers/extends";
var import_hoist_non_react_statics = __toESM(require_hoist_non_react_statics_cjs());
var jsx = function jsx2(type, props) {
  var args = arguments;
  if (props == null || !hasOwn.call(props, "css")) {
    return React7.createElement.apply(void 0, args);
  }
  var argsLength = args.length;
  var createElementArgArray = new Array(argsLength);
  createElementArgArray[0] = Emotion$1;
  createElementArgArray[1] = createEmotionProps(type, props);
  for (var i2 = 2; i2 < argsLength; i2++) {
    createElementArgArray[i2] = args[i2];
  }
  return React7.createElement.apply(null, createElementArgArray);
};
(function(_jsx31) {
  var JSX;
  /* @__PURE__ */ (function(_JSX) {
  })(JSX || (JSX = _jsx31.JSX || (_jsx31.JSX = {})));
})(jsx || (jsx = {}));
function css() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return serializeStyles(args);
}

// ../../../node_modules/.pnpm/@emotion+css@11.13.5/node_modules/@emotion/css/create-instance/dist/emotion-css-create-instance.esm.js
function insertWithoutScoping(cache2, serialized) {
  if (cache2.inserted[serialized.name] === void 0) {
    return cache2.insert("", serialized, cache2.sheet, true);
  }
}
function merge(registered, css3, className) {
  var registeredStyles = [];
  var rawClassName = getRegisteredStyles(registered, registeredStyles, className);
  if (registeredStyles.length < 2) {
    return className;
  }
  return rawClassName + css3(registeredStyles);
}
var createEmotion = function createEmotion2(options) {
  var cache2 = createCache(options);
  cache2.sheet.speedy = function(value) {
    this.isSpeedy = value;
  };
  cache2.compat = true;
  var css3 = function css4() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    var serialized = serializeStyles(args, cache2.registered, void 0);
    insertStyles(cache2, serialized, false);
    return cache2.key + "-" + serialized.name;
  };
  var keyframes2 = function keyframes3() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    var serialized = serializeStyles(args, cache2.registered);
    var animation = "animation-" + serialized.name;
    insertWithoutScoping(cache2, {
      name: serialized.name,
      styles: "@keyframes " + animation + "{" + serialized.styles + "}"
    });
    return animation;
  };
  var injectGlobal2 = function injectGlobal3() {
    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }
    var serialized = serializeStyles(args, cache2.registered);
    insertWithoutScoping(cache2, serialized);
  };
  var cx2 = function cx3() {
    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }
    return merge(cache2.registered, css3, classnames(args));
  };
  return {
    css: css3,
    cx: cx2,
    injectGlobal: injectGlobal2,
    keyframes: keyframes2,
    hydrate: function hydrate2(ids) {
      ids.forEach(function(key) {
        cache2.inserted[key] = true;
      });
    },
    flush: function flush2() {
      cache2.registered = {};
      cache2.inserted = {};
      cache2.sheet.flush();
    },
    sheet: cache2.sheet,
    cache: cache2,
    getRegisteredStyles: getRegisteredStyles.bind(null, cache2.registered),
    merge: merge.bind(null, cache2.registered, css3)
  };
};
var classnames = function classnames2(args) {
  var cls = "";
  for (var i2 = 0; i2 < args.length; i2++) {
    var arg = args[i2];
    if (arg == null) continue;
    var toAdd = void 0;
    switch (typeof arg) {
      case "boolean":
        break;
      case "object": {
        if (Array.isArray(arg)) {
          toAdd = classnames2(arg);
        } else {
          toAdd = "";
          for (var k2 in arg) {
            if (arg[k2] && k2) {
              toAdd && (toAdd += " ");
              toAdd += k2;
            }
          }
        }
        break;
      }
      default: {
        toAdd = arg;
      }
    }
    if (toAdd) {
      cls && (cls += " ");
      cls += toAdd;
    }
  }
  return cls;
};

// ../../../node_modules/.pnpm/@emotion+css@11.13.5/node_modules/@emotion/css/dist/emotion-css.esm.js
var _createEmotion = createEmotion({
  key: "css"
});
var flush = _createEmotion.flush;
var hydrate = _createEmotion.hydrate;
var cx = _createEmotion.cx;
var merge2 = _createEmotion.merge;
var getRegisteredStyles2 = _createEmotion.getRegisteredStyles;
var injectGlobal = _createEmotion.injectGlobal;
var keyframes = _createEmotion.keyframes;
var css2 = _createEmotion.css;
var sheet = _createEmotion.sheet;
var cache = _createEmotion.cache;

// ../../../node_modules/.pnpm/@wordpress+components@32.3.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/utils/hooks/use-cx.mjs
var isSerializedStyles = (o2) => typeof o2 !== "undefined" && o2 !== null && ["name", "styles"].every((p2) => typeof o2[p2] !== "undefined");
var useCx = () => {
  const cache2 = __unsafe_useEmotionCache();
  const cx2 = useCallback7((...classNames) => {
    if (cache2 === null) {
      throw new Error("The `useCx` hook should be only used within a valid Emotion Cache Context");
    }
    return cx(...classNames.map((arg) => {
      if (isSerializedStyles(arg)) {
        insertStyles(cache2, arg, false);
        return `${cache2.key}-${arg.name}`;
      }
      return arg;
    }));
  }, [cache2]);
  return cx2;
};

// ../../../node_modules/.pnpm/memize@2.1.1/node_modules/memize/dist/index.js
function memize(fn, options) {
  var size = 0;
  var head;
  var tail;
  options = options || {};
  function memoized() {
    var node2 = head, len = arguments.length, args, i2;
    searchCache: while (node2) {
      if (node2.args.length !== arguments.length) {
        node2 = node2.next;
        continue;
      }
      for (i2 = 0; i2 < len; i2++) {
        if (node2.args[i2] !== arguments[i2]) {
          node2 = node2.next;
          continue searchCache;
        }
      }
      if (node2 !== head) {
        if (node2 === tail) {
          tail = node2.prev;
        }
        node2.prev.next = node2.next;
        if (node2.next) {
          node2.next.prev = node2.prev;
        }
        node2.next = head;
        node2.prev = null;
        head.prev = node2;
        head = node2;
      }
      return node2.val;
    }
    args = new Array(len);
    for (i2 = 0; i2 < len; i2++) {
      args[i2] = arguments[i2];
    }
    node2 = {
      args,
      // Generate the result from original function
      val: fn.apply(null, args)
    };
    if (head) {
      head.prev = node2;
      node2.next = head;
    } else {
      tail = node2;
    }
    if (size === /** @type {MemizeOptions} */
    options.maxSize) {
      tail = /** @type {MemizeCacheNode} */
      tail.prev;
      tail.next = null;
    } else {
      size++;
    }
    head = node2;
    return node2.val;
  }
  memoized.clear = function() {
    head = null;
    tail = null;
    size = 0;
  };
  return memoized;
}

// ../../../node_modules/.pnpm/colord@2.9.3/node_modules/colord/index.mjs
var r = { grad: 0.9, turn: 360, rad: 360 / (2 * Math.PI) };
var t = function(r2) {
  return "string" == typeof r2 ? r2.length > 0 : "number" == typeof r2;
};
var n = function(r2, t2, n2) {
  return void 0 === t2 && (t2 = 0), void 0 === n2 && (n2 = Math.pow(10, t2)), Math.round(n2 * r2) / n2 + 0;
};
var e = function(r2, t2, n2) {
  return void 0 === t2 && (t2 = 0), void 0 === n2 && (n2 = 1), r2 > n2 ? n2 : r2 > t2 ? r2 : t2;
};
var u = function(r2) {
  return (r2 = isFinite(r2) ? r2 % 360 : 0) > 0 ? r2 : r2 + 360;
};
var a = function(r2) {
  return { r: e(r2.r, 0, 255), g: e(r2.g, 0, 255), b: e(r2.b, 0, 255), a: e(r2.a) };
};
var o = function(r2) {
  return { r: n(r2.r), g: n(r2.g), b: n(r2.b), a: n(r2.a, 3) };
};
var i = /^#([0-9a-f]{3,8})$/i;
var s = function(r2) {
  var t2 = r2.toString(16);
  return t2.length < 2 ? "0" + t2 : t2;
};
var h = function(r2) {
  var t2 = r2.r, n2 = r2.g, e2 = r2.b, u2 = r2.a, a2 = Math.max(t2, n2, e2), o2 = a2 - Math.min(t2, n2, e2), i2 = o2 ? a2 === t2 ? (n2 - e2) / o2 : a2 === n2 ? 2 + (e2 - t2) / o2 : 4 + (t2 - n2) / o2 : 0;
  return { h: 60 * (i2 < 0 ? i2 + 6 : i2), s: a2 ? o2 / a2 * 100 : 0, v: a2 / 255 * 100, a: u2 };
};
var b = function(r2) {
  var t2 = r2.h, n2 = r2.s, e2 = r2.v, u2 = r2.a;
  t2 = t2 / 360 * 6, n2 /= 100, e2 /= 100;
  var a2 = Math.floor(t2), o2 = e2 * (1 - n2), i2 = e2 * (1 - (t2 - a2) * n2), s2 = e2 * (1 - (1 - t2 + a2) * n2), h2 = a2 % 6;
  return { r: 255 * [e2, i2, o2, o2, s2, e2][h2], g: 255 * [s2, e2, e2, i2, o2, o2][h2], b: 255 * [o2, o2, s2, e2, e2, i2][h2], a: u2 };
};
var g = function(r2) {
  return { h: u(r2.h), s: e(r2.s, 0, 100), l: e(r2.l, 0, 100), a: e(r2.a) };
};
var d = function(r2) {
  return { h: n(r2.h), s: n(r2.s), l: n(r2.l), a: n(r2.a, 3) };
};
var f = function(r2) {
  return b((n2 = (t2 = r2).s, { h: t2.h, s: (n2 *= ((e2 = t2.l) < 50 ? e2 : 100 - e2) / 100) > 0 ? 2 * n2 / (e2 + n2) * 100 : 0, v: e2 + n2, a: t2.a }));
  var t2, n2, e2;
};
var c = function(r2) {
  return { h: (t2 = h(r2)).h, s: (u2 = (200 - (n2 = t2.s)) * (e2 = t2.v) / 100) > 0 && u2 < 200 ? n2 * e2 / 100 / (u2 <= 100 ? u2 : 200 - u2) * 100 : 0, l: u2 / 2, a: t2.a };
  var t2, n2, e2, u2;
};
var l = /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s*,\s*([+-]?\d*\.?\d+)%\s*,\s*([+-]?\d*\.?\d+)%\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i;
var p = /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s+([+-]?\d*\.?\d+)%\s+([+-]?\d*\.?\d+)%\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i;
var v = /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i;
var m = /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i;
var y = { string: [[function(r2) {
  var t2 = i.exec(r2);
  return t2 ? (r2 = t2[1]).length <= 4 ? { r: parseInt(r2[0] + r2[0], 16), g: parseInt(r2[1] + r2[1], 16), b: parseInt(r2[2] + r2[2], 16), a: 4 === r2.length ? n(parseInt(r2[3] + r2[3], 16) / 255, 2) : 1 } : 6 === r2.length || 8 === r2.length ? { r: parseInt(r2.substr(0, 2), 16), g: parseInt(r2.substr(2, 2), 16), b: parseInt(r2.substr(4, 2), 16), a: 8 === r2.length ? n(parseInt(r2.substr(6, 2), 16) / 255, 2) : 1 } : null : null;
}, "hex"], [function(r2) {
  var t2 = v.exec(r2) || m.exec(r2);
  return t2 ? t2[2] !== t2[4] || t2[4] !== t2[6] ? null : a({ r: Number(t2[1]) / (t2[2] ? 100 / 255 : 1), g: Number(t2[3]) / (t2[4] ? 100 / 255 : 1), b: Number(t2[5]) / (t2[6] ? 100 / 255 : 1), a: void 0 === t2[7] ? 1 : Number(t2[7]) / (t2[8] ? 100 : 1) }) : null;
}, "rgb"], [function(t2) {
  var n2 = l.exec(t2) || p.exec(t2);
  if (!n2) return null;
  var e2, u2, a2 = g({ h: (e2 = n2[1], u2 = n2[2], void 0 === u2 && (u2 = "deg"), Number(e2) * (r[u2] || 1)), s: Number(n2[3]), l: Number(n2[4]), a: void 0 === n2[5] ? 1 : Number(n2[5]) / (n2[6] ? 100 : 1) });
  return f(a2);
}, "hsl"]], object: [[function(r2) {
  var n2 = r2.r, e2 = r2.g, u2 = r2.b, o2 = r2.a, i2 = void 0 === o2 ? 1 : o2;
  return t(n2) && t(e2) && t(u2) ? a({ r: Number(n2), g: Number(e2), b: Number(u2), a: Number(i2) }) : null;
}, "rgb"], [function(r2) {
  var n2 = r2.h, e2 = r2.s, u2 = r2.l, a2 = r2.a, o2 = void 0 === a2 ? 1 : a2;
  if (!t(n2) || !t(e2) || !t(u2)) return null;
  var i2 = g({ h: Number(n2), s: Number(e2), l: Number(u2), a: Number(o2) });
  return f(i2);
}, "hsl"], [function(r2) {
  var n2 = r2.h, a2 = r2.s, o2 = r2.v, i2 = r2.a, s2 = void 0 === i2 ? 1 : i2;
  if (!t(n2) || !t(a2) || !t(o2)) return null;
  var h2 = (function(r3) {
    return { h: u(r3.h), s: e(r3.s, 0, 100), v: e(r3.v, 0, 100), a: e(r3.a) };
  })({ h: Number(n2), s: Number(a2), v: Number(o2), a: Number(s2) });
  return b(h2);
}, "hsv"]] };
var N = function(r2, t2) {
  for (var n2 = 0; n2 < t2.length; n2++) {
    var e2 = t2[n2][0](r2);
    if (e2) return [e2, t2[n2][1]];
  }
  return [null, void 0];
};
var x = function(r2) {
  return "string" == typeof r2 ? N(r2.trim(), y.string) : "object" == typeof r2 && null !== r2 ? N(r2, y.object) : [null, void 0];
};
var M = function(r2, t2) {
  var n2 = c(r2);
  return { h: n2.h, s: e(n2.s + 100 * t2, 0, 100), l: n2.l, a: n2.a };
};
var H = function(r2) {
  return (299 * r2.r + 587 * r2.g + 114 * r2.b) / 1e3 / 255;
};
var $ = function(r2, t2) {
  var n2 = c(r2);
  return { h: n2.h, s: n2.s, l: e(n2.l + 100 * t2, 0, 100), a: n2.a };
};
var j = (function() {
  function r2(r3) {
    this.parsed = x(r3)[0], this.rgba = this.parsed || { r: 0, g: 0, b: 0, a: 1 };
  }
  return r2.prototype.isValid = function() {
    return null !== this.parsed;
  }, r2.prototype.brightness = function() {
    return n(H(this.rgba), 2);
  }, r2.prototype.isDark = function() {
    return H(this.rgba) < 0.5;
  }, r2.prototype.isLight = function() {
    return H(this.rgba) >= 0.5;
  }, r2.prototype.toHex = function() {
    return r3 = o(this.rgba), t2 = r3.r, e2 = r3.g, u2 = r3.b, i2 = (a2 = r3.a) < 1 ? s(n(255 * a2)) : "", "#" + s(t2) + s(e2) + s(u2) + i2;
    var r3, t2, e2, u2, a2, i2;
  }, r2.prototype.toRgb = function() {
    return o(this.rgba);
  }, r2.prototype.toRgbString = function() {
    return r3 = o(this.rgba), t2 = r3.r, n2 = r3.g, e2 = r3.b, (u2 = r3.a) < 1 ? "rgba(" + t2 + ", " + n2 + ", " + e2 + ", " + u2 + ")" : "rgb(" + t2 + ", " + n2 + ", " + e2 + ")";
    var r3, t2, n2, e2, u2;
  }, r2.prototype.toHsl = function() {
    return d(c(this.rgba));
  }, r2.prototype.toHslString = function() {
    return r3 = d(c(this.rgba)), t2 = r3.h, n2 = r3.s, e2 = r3.l, (u2 = r3.a) < 1 ? "hsla(" + t2 + ", " + n2 + "%, " + e2 + "%, " + u2 + ")" : "hsl(" + t2 + ", " + n2 + "%, " + e2 + "%)";
    var r3, t2, n2, e2, u2;
  }, r2.prototype.toHsv = function() {
    return r3 = h(this.rgba), { h: n(r3.h), s: n(r3.s), v: n(r3.v), a: n(r3.a, 3) };
    var r3;
  }, r2.prototype.invert = function() {
    return w({ r: 255 - (r3 = this.rgba).r, g: 255 - r3.g, b: 255 - r3.b, a: r3.a });
    var r3;
  }, r2.prototype.saturate = function(r3) {
    return void 0 === r3 && (r3 = 0.1), w(M(this.rgba, r3));
  }, r2.prototype.desaturate = function(r3) {
    return void 0 === r3 && (r3 = 0.1), w(M(this.rgba, -r3));
  }, r2.prototype.grayscale = function() {
    return w(M(this.rgba, -1));
  }, r2.prototype.lighten = function(r3) {
    return void 0 === r3 && (r3 = 0.1), w($(this.rgba, r3));
  }, r2.prototype.darken = function(r3) {
    return void 0 === r3 && (r3 = 0.1), w($(this.rgba, -r3));
  }, r2.prototype.rotate = function(r3) {
    return void 0 === r3 && (r3 = 15), this.hue(this.hue() + r3);
  }, r2.prototype.alpha = function(r3) {
    return "number" == typeof r3 ? w({ r: (t2 = this.rgba).r, g: t2.g, b: t2.b, a: r3 }) : n(this.rgba.a, 3);
    var t2;
  }, r2.prototype.hue = function(r3) {
    var t2 = c(this.rgba);
    return "number" == typeof r3 ? w({ h: r3, s: t2.s, l: t2.l, a: t2.a }) : n(t2.h);
  }, r2.prototype.isEqual = function(r3) {
    return this.toHex() === w(r3).toHex();
  }, r2;
})();
var w = function(r2) {
  return r2 instanceof j ? r2 : new j(r2);
};
var S = [];
var k = function(r2) {
  r2.forEach(function(r3) {
    S.indexOf(r3) < 0 && (r3(j, y), S.push(r3));
  });
};

// ../../../node_modules/.pnpm/colord@2.9.3/node_modules/colord/plugins/names.mjs
function names_default(e2, f2) {
  var a2 = { white: "#ffffff", bisque: "#ffe4c4", blue: "#0000ff", cadetblue: "#5f9ea0", chartreuse: "#7fff00", chocolate: "#d2691e", coral: "#ff7f50", antiquewhite: "#faebd7", aqua: "#00ffff", azure: "#f0ffff", whitesmoke: "#f5f5f5", papayawhip: "#ffefd5", plum: "#dda0dd", blanchedalmond: "#ffebcd", black: "#000000", gold: "#ffd700", goldenrod: "#daa520", gainsboro: "#dcdcdc", cornsilk: "#fff8dc", cornflowerblue: "#6495ed", burlywood: "#deb887", aquamarine: "#7fffd4", beige: "#f5f5dc", crimson: "#dc143c", cyan: "#00ffff", darkblue: "#00008b", darkcyan: "#008b8b", darkgoldenrod: "#b8860b", darkkhaki: "#bdb76b", darkgray: "#a9a9a9", darkgreen: "#006400", darkgrey: "#a9a9a9", peachpuff: "#ffdab9", darkmagenta: "#8b008b", darkred: "#8b0000", darkorchid: "#9932cc", darkorange: "#ff8c00", darkslateblue: "#483d8b", gray: "#808080", darkslategray: "#2f4f4f", darkslategrey: "#2f4f4f", deeppink: "#ff1493", deepskyblue: "#00bfff", wheat: "#f5deb3", firebrick: "#b22222", floralwhite: "#fffaf0", ghostwhite: "#f8f8ff", darkviolet: "#9400d3", magenta: "#ff00ff", green: "#008000", dodgerblue: "#1e90ff", grey: "#808080", honeydew: "#f0fff0", hotpink: "#ff69b4", blueviolet: "#8a2be2", forestgreen: "#228b22", lawngreen: "#7cfc00", indianred: "#cd5c5c", indigo: "#4b0082", fuchsia: "#ff00ff", brown: "#a52a2a", maroon: "#800000", mediumblue: "#0000cd", lightcoral: "#f08080", darkturquoise: "#00ced1", lightcyan: "#e0ffff", ivory: "#fffff0", lightyellow: "#ffffe0", lightsalmon: "#ffa07a", lightseagreen: "#20b2aa", linen: "#faf0e6", mediumaquamarine: "#66cdaa", lemonchiffon: "#fffacd", lime: "#00ff00", khaki: "#f0e68c", mediumseagreen: "#3cb371", limegreen: "#32cd32", mediumspringgreen: "#00fa9a", lightskyblue: "#87cefa", lightblue: "#add8e6", midnightblue: "#191970", lightpink: "#ffb6c1", mistyrose: "#ffe4e1", moccasin: "#ffe4b5", mintcream: "#f5fffa", lightslategray: "#778899", lightslategrey: "#778899", navajowhite: "#ffdead", navy: "#000080", mediumvioletred: "#c71585", powderblue: "#b0e0e6", palegoldenrod: "#eee8aa", oldlace: "#fdf5e6", paleturquoise: "#afeeee", mediumturquoise: "#48d1cc", mediumorchid: "#ba55d3", rebeccapurple: "#663399", lightsteelblue: "#b0c4de", mediumslateblue: "#7b68ee", thistle: "#d8bfd8", tan: "#d2b48c", orchid: "#da70d6", mediumpurple: "#9370db", purple: "#800080", pink: "#ffc0cb", skyblue: "#87ceeb", springgreen: "#00ff7f", palegreen: "#98fb98", red: "#ff0000", yellow: "#ffff00", slateblue: "#6a5acd", lavenderblush: "#fff0f5", peru: "#cd853f", palevioletred: "#db7093", violet: "#ee82ee", teal: "#008080", slategray: "#708090", slategrey: "#708090", aliceblue: "#f0f8ff", darkseagreen: "#8fbc8f", darkolivegreen: "#556b2f", greenyellow: "#adff2f", seagreen: "#2e8b57", seashell: "#fff5ee", tomato: "#ff6347", silver: "#c0c0c0", sienna: "#a0522d", lavender: "#e6e6fa", lightgreen: "#90ee90", orange: "#ffa500", orangered: "#ff4500", steelblue: "#4682b4", royalblue: "#4169e1", turquoise: "#40e0d0", yellowgreen: "#9acd32", salmon: "#fa8072", saddlebrown: "#8b4513", sandybrown: "#f4a460", rosybrown: "#bc8f8f", darksalmon: "#e9967a", lightgoldenrodyellow: "#fafad2", snow: "#fffafa", lightgrey: "#d3d3d3", lightgray: "#d3d3d3", dimgray: "#696969", dimgrey: "#696969", olivedrab: "#6b8e23", olive: "#808000" }, r2 = {};
  for (var d2 in a2) r2[a2[d2]] = d2;
  var l2 = {};
  e2.prototype.toName = function(f3) {
    if (!(this.rgba.a || this.rgba.r || this.rgba.g || this.rgba.b)) return "transparent";
    var d3, i2, n2 = r2[this.toHex()];
    if (n2) return n2;
    if (null == f3 ? void 0 : f3.closest) {
      var o2 = this.toRgb(), t2 = 1 / 0, b2 = "black";
      if (!l2.length) for (var c2 in a2) l2[c2] = new e2(a2[c2]).toRgb();
      for (var g2 in a2) {
        var u2 = (d3 = o2, i2 = l2[g2], Math.pow(d3.r - i2.r, 2) + Math.pow(d3.g - i2.g, 2) + Math.pow(d3.b - i2.b, 2));
        u2 < t2 && (t2 = u2, b2 = g2);
      }
      return b2;
    }
  };
  f2.string.push([function(f3) {
    var r3 = f3.toLowerCase(), d3 = "transparent" === r3 ? "#0000" : a2[r3];
    return d3 ? new e2(d3).toRgb() : null;
  }, "name"]);
}

// ../../../node_modules/.pnpm/@wordpress+components@32.3.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/utils/colors.mjs
var colorComputationNode;
k([names_default]);
function getColorComputationNode() {
  if (typeof document === "undefined") {
    return;
  }
  if (!colorComputationNode) {
    const el = document.createElement("div");
    el.setAttribute("data-g2-color-computation-node", "");
    document.body.appendChild(el);
    colorComputationNode = el;
  }
  return colorComputationNode;
}
function isColor(value) {
  if (typeof value !== "string") {
    return false;
  }
  const test = w(value);
  return test.isValid();
}
function _getComputedBackgroundColor(backgroundColor) {
  if (typeof backgroundColor !== "string") {
    return "";
  }
  if (isColor(backgroundColor)) {
    return backgroundColor;
  }
  if (!backgroundColor.includes("var(")) {
    return "";
  }
  if (typeof document === "undefined") {
    return "";
  }
  const el = getColorComputationNode();
  if (!el) {
    return "";
  }
  el.style.background = backgroundColor;
  const computedColor = window?.getComputedStyle(el).background;
  el.style.background = "";
  return computedColor || "";
}
var getComputedBackgroundColor = memize(_getComputedBackgroundColor);
function getOptimalTextColor(backgroundColor) {
  const background = getComputedBackgroundColor(backgroundColor);
  return w(background).isLight() ? "#000000" : "#ffffff";
}
function getOptimalTextShade(backgroundColor) {
  const result = getOptimalTextColor(backgroundColor);
  return result === "#000000" ? "dark" : "light";
}

// ../../../node_modules/.pnpm/@wordpress+components@32.3.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/utils/colors-values.mjs
var white = "#fff";
var GRAY = {
  900: "#1e1e1e",
  800: "#2f2f2f",
  /** Meets 4.6:1 text contrast against white. */
  700: "#757575",
  /** Meets 3:1 UI or large text contrast against white. */
  600: "#949494",
  400: "#ccc",
  /** Used for most borders. */
  300: "#ddd",
  /** Used sparingly for light borders. */
  200: "#e0e0e0",
  /** Used for light gray backgrounds. */
  100: "#f0f0f0"
};
var ALERT = {
  yellow: "#f0b849",
  red: "#d94f4f",
  green: "#4ab866"
};
var THEME = {
  accent: `var(--wp-components-color-accent, var(--wp-admin-theme-color, #3858e9))`,
  accentDarker10: `var(--wp-components-color-accent-darker-10, var(--wp-admin-theme-color-darker-10, #2145e6))`,
  accentDarker20: `var(--wp-components-color-accent-darker-20, var(--wp-admin-theme-color-darker-20, #183ad6))`,
  /** Used when placing text on the accent color. */
  accentInverted: `var(--wp-components-color-accent-inverted, ${white})`,
  background: `var(--wp-components-color-background, ${white})`,
  foreground: `var(--wp-components-color-foreground, ${GRAY[900]})`,
  /** Used when placing text on the foreground color. */
  foregroundInverted: `var(--wp-components-color-foreground-inverted, ${white})`,
  gray: {
    /** @deprecated Use `COLORS.theme.foreground` instead. */
    900: `var(--wp-components-color-foreground, ${GRAY[900]})`,
    800: `var(--wp-components-color-gray-800, ${GRAY[800]})`,
    700: `var(--wp-components-color-gray-700, ${GRAY[700]})`,
    600: `var(--wp-components-color-gray-600, ${GRAY[600]})`,
    400: `var(--wp-components-color-gray-400, ${GRAY[400]})`,
    300: `var(--wp-components-color-gray-300, ${GRAY[300]})`,
    200: `var(--wp-components-color-gray-200, ${GRAY[200]})`,
    100: `var(--wp-components-color-gray-100, ${GRAY[100]})`
  }
};
var UI = {
  background: THEME.background,
  backgroundDisabled: THEME.gray[100],
  border: THEME.gray[600],
  borderHover: THEME.gray[700],
  borderFocus: THEME.accent,
  borderDisabled: THEME.gray[400],
  textDisabled: THEME.gray[600],
  // Matches @wordpress/base-styles
  darkGrayPlaceholder: `color-mix(in srgb, ${THEME.foreground}, transparent 38%)`,
  lightGrayPlaceholder: `color-mix(in srgb, ${THEME.background}, transparent 35%)`
};
var COLORS = Object.freeze({
  /**
   * The main gray color object.
   *
   * @deprecated Use semantic aliases in `COLORS.ui` or theme-ready variables in `COLORS.theme.gray`.
   */
  gray: GRAY,
  // TODO: Stop exporting this when everything is migrated to `theme` or `ui`
  /**
   * @deprecated Prefer theme-ready variables in `COLORS.theme`.
   */
  white,
  alert: ALERT,
  /**
   * Theme-ready variables with fallbacks.
   *
   * Prefer semantic aliases in `COLORS.ui` when applicable.
   */
  theme: THEME,
  /**
   * Semantic aliases (prefer these over raw variables when applicable).
   */
  ui: UI
});

// ../../../node_modules/.pnpm/@wordpress+components@32.3.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/utils/config-values.mjs
var CONTROL_HEIGHT = "36px";
var CONTROL_PROPS = {
  // These values should be shared with TextControl.
  controlPaddingX: 12,
  controlPaddingXSmall: 8,
  controlPaddingXLarge: 12 * 1.3334,
  // TODO: Deprecate
  controlBoxShadowFocus: `0 0 0 0.5px ${COLORS.theme.accent}`,
  controlHeight: CONTROL_HEIGHT,
  controlHeightXSmall: `calc( ${CONTROL_HEIGHT} * 0.6 )`,
  controlHeightSmall: `calc( ${CONTROL_HEIGHT} * 0.8 )`,
  controlHeightLarge: `calc( ${CONTROL_HEIGHT} * 1.2 )`,
  controlHeightXLarge: `calc( ${CONTROL_HEIGHT} * 1.4 )`
};
var config_values_default = Object.assign({}, CONTROL_PROPS, {
  colorDivider: "rgba(0, 0, 0, 0.1)",
  colorScrollbarThumb: "rgba(0, 0, 0, 0.2)",
  colorScrollbarThumbHover: "rgba(0, 0, 0, 0.5)",
  colorScrollbarTrack: "rgba(0, 0, 0, 0.04)",
  elevationIntensity: 1,
  radiusXSmall: "1px",
  radiusSmall: "2px",
  radiusMedium: "4px",
  radiusLarge: "8px",
  radiusFull: "9999px",
  radiusRound: "50%",
  borderWidth: "1px",
  borderWidthFocus: "1.5px",
  borderWidthTab: "4px",
  spinnerSize: 16,
  fontSize: "13px",
  fontSizeH1: "calc(2.44 * 13px)",
  fontSizeH2: "calc(1.95 * 13px)",
  fontSizeH3: "calc(1.56 * 13px)",
  fontSizeH4: "calc(1.25 * 13px)",
  fontSizeH5: "13px",
  fontSizeH6: "calc(0.8 * 13px)",
  fontSizeInputMobile: "16px",
  fontSizeMobile: "15px",
  fontSizeSmall: "calc(0.92 * 13px)",
  fontSizeXSmall: "calc(0.75 * 13px)",
  fontLineHeightBase: "1.4",
  fontWeight: "normal",
  fontWeightMedium: "499",
  // ensures fallback to 400 (instead of 600)
  fontWeightHeading: "600",
  gridBase: "4px",
  elevationXSmall: `0 1px 1px rgba(0, 0, 0, 0.03), 0 1px 2px rgba(0, 0, 0, 0.02), 0 3px 3px rgba(0, 0, 0, 0.02), 0 4px 4px rgba(0, 0, 0, 0.01)`,
  elevationSmall: `0 1px 2px rgba(0, 0, 0, 0.05), 0 2px 3px rgba(0, 0, 0, 0.04), 0 6px 6px rgba(0, 0, 0, 0.03), 0 8px 8px rgba(0, 0, 0, 0.02)`,
  elevationMedium: `0 2px 3px rgba(0, 0, 0, 0.05), 0 4px 5px rgba(0, 0, 0, 0.04), 0 12px 12px rgba(0, 0, 0, 0.03), 0 16px 16px rgba(0, 0, 0, 0.02)`,
  elevationLarge: `0 5px 15px rgba(0, 0, 0, 0.08), 0 15px 27px rgba(0, 0, 0, 0.07), 0 30px 36px rgba(0, 0, 0, 0.04), 0 50px 43px rgba(0, 0, 0, 0.02)`,
  surfaceBackgroundColor: COLORS.white,
  surfaceBackgroundSubtleColor: "#F3F3F3",
  surfaceBackgroundTintColor: "#F5F5F5",
  surfaceBorderColor: "rgba(0, 0, 0, 0.1)",
  surfaceBorderBoldColor: "rgba(0, 0, 0, 0.15)",
  surfaceBorderSubtleColor: "rgba(0, 0, 0, 0.05)",
  surfaceBackgroundTertiaryColor: COLORS.white,
  surfaceColor: COLORS.white,
  transitionDuration: "200ms",
  transitionDurationFast: "160ms",
  transitionDurationFaster: "120ms",
  transitionDurationFastest: "100ms",
  transitionTimingFunction: "cubic-bezier(0.08, 0.52, 0.52, 1)",
  transitionTimingFunctionControl: "cubic-bezier(0.12, 0.8, 0.32, 1)"
});

// ../../../node_modules/.pnpm/@wordpress+components@32.3.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/context/context-system-provider.mjs
var import_es6 = __toESM(require_es6(), 1);
import deepmerge2 from "deepmerge";

// ../../../node_modules/.pnpm/@wordpress+warning@3.41.0/node_modules/@wordpress/warning/build-module/utils.mjs
var logged = /* @__PURE__ */ new Set();

// ../../../node_modules/.pnpm/@wordpress+warning@3.41.0/node_modules/@wordpress/warning/build-module/index.mjs
function isDev() {
  return globalThis.SCRIPT_DEBUG === true;
}
function warning(message) {
  if (!isDev()) {
    return;
  }
  if (logged.has(message)) {
    return;
  }
  console.warn(message);
  try {
    throw Error(message);
  } catch (x2) {
  }
  logged.add(message);
}

// ../../../node_modules/.pnpm/@wordpress+components@32.3.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/context/context-system-provider.mjs
import { jsx as _jsx16 } from "react/jsx-runtime";
var ComponentsContext = createContext3(
  /** @type {Record<string, any>} */
  {}
);
ComponentsContext.displayName = "ComponentsContext";
var useComponentsContext = () => useContext7(ComponentsContext);
function useContextSystemBridge({
  value
}) {
  const parentContext = useComponentsContext();
  const valueRef = useRef6(value);
  use_update_effect_default(() => {
    if (
      // Objects are equivalent.
      (0, import_es6.default)(valueRef.current, value) && // But not the same reference.
      valueRef.current !== value
    ) {
      globalThis.SCRIPT_DEBUG === true ? warning(`Please memoize your context: ${JSON.stringify(value)}`) : void 0;
    }
  }, [value]);
  const config = useMemo13(() => {
    return deepmerge2(parentContext ?? {}, value ?? {}, {
      isMergeableObject: isPlainObject
    });
  }, [parentContext, value]);
  return config;
}
var BaseContextSystemProvider = ({
  children,
  value
}) => {
  const contextValue = useContextSystemBridge({
    value
  });
  return /* @__PURE__ */ _jsx16(ComponentsContext.Provider, {
    value: contextValue,
    children
  });
};
var ContextSystemProvider = memo(BaseContextSystemProvider);

// ../../../node_modules/.pnpm/@wordpress+components@32.3.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/context/constants.mjs
var COMPONENT_NAMESPACE = "data-wp-component";
var CONNECTED_NAMESPACE = "data-wp-c16t";
var CONNECT_STATIC_NAMESPACE = "__contextSystemKey__";

// ../../../node_modules/.pnpm/@wordpress+components@32.3.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/context/get-styled-class-name-from-key.mjs
function getStyledClassName(namespace) {
  const kebab = paramCase(namespace);
  return `components-${kebab}`;
}
var getStyledClassNameFromKey = memize(getStyledClassName);

// ../../../node_modules/.pnpm/@wordpress+components@32.3.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/context/context-connect.mjs
function contextConnect(Component2, namespace) {
  return _contextConnect(Component2, namespace, {
    forwardsRef: true
  });
}
function _contextConnect(Component2, namespace, options) {
  const WrappedComponent = options?.forwardsRef ? forwardRef3(Component2) : Component2;
  if (typeof namespace === "undefined") {
    globalThis.SCRIPT_DEBUG === true ? warning("contextConnect: Please provide a namespace") : void 0;
  }
  let mergedNamespace = WrappedComponent[CONNECT_STATIC_NAMESPACE] || [namespace];
  if (Array.isArray(namespace)) {
    mergedNamespace = [...mergedNamespace, ...namespace];
  }
  if (typeof namespace === "string") {
    mergedNamespace = [...mergedNamespace, namespace];
  }
  return Object.assign(WrappedComponent, {
    [CONNECT_STATIC_NAMESPACE]: [...new Set(mergedNamespace)],
    displayName: namespace,
    selector: `.${getStyledClassNameFromKey(namespace)}`
  });
}
function getConnectNamespace(Component2) {
  if (!Component2) {
    return [];
  }
  let namespaces = [];
  if (Component2[CONNECT_STATIC_NAMESPACE]) {
    namespaces = Component2[CONNECT_STATIC_NAMESPACE];
  }
  if (Component2.type && Component2.type[CONNECT_STATIC_NAMESPACE]) {
    namespaces = Component2.type[CONNECT_STATIC_NAMESPACE];
  }
  return namespaces;
}
function hasConnectNamespace(Component2, match2) {
  if (!Component2) {
    return false;
  }
  if (typeof match2 === "string") {
    return getConnectNamespace(Component2).includes(match2);
  }
  if (Array.isArray(match2)) {
    return match2.some((result) => getConnectNamespace(Component2).includes(result));
  }
  return false;
}

// ../../../node_modules/.pnpm/@wordpress+components@32.3.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/context/utils.mjs
function getNamespace(componentName) {
  return {
    [COMPONENT_NAMESPACE]: componentName
  };
}
function getConnectedNamespace() {
  return {
    [CONNECTED_NAMESPACE]: true
  };
}

// ../../../node_modules/.pnpm/@wordpress+components@32.3.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/context/use-context-system.mjs
function useContextSystem(props, namespace) {
  const contextSystemProps = useComponentsContext();
  if (typeof namespace === "undefined") {
    globalThis.SCRIPT_DEBUG === true ? warning("useContextSystem: Please provide a namespace") : void 0;
  }
  const contextProps = contextSystemProps?.[namespace] || {};
  const finalComponentProps = {
    ...getConnectedNamespace(),
    ...getNamespace(namespace)
  };
  const {
    _overrides: overrideProps,
    ...otherContextProps
  } = contextProps;
  const initialMergedProps = Object.entries(otherContextProps).length ? Object.assign({}, otherContextProps, props) : props;
  const cx2 = useCx();
  const classes = cx2(getStyledClassNameFromKey(namespace), props.className);
  const rendered = typeof initialMergedProps.renderChildren === "function" ? initialMergedProps.renderChildren(initialMergedProps) : initialMergedProps.children;
  for (const key in initialMergedProps) {
    finalComponentProps[key] = initialMergedProps[key];
  }
  for (const key in overrideProps) {
    finalComponentProps[key] = overrideProps[key];
  }
  if (rendered !== void 0) {
    finalComponentProps.children = rendered;
  }
  finalComponentProps.className = classes;
  return finalComponentProps;
}

// ../../../node_modules/.pnpm/@emotion+styled@11.14.1_@emotion+react@11.14.0_@types+react@18.3.28_react@18.3.1__@types+react@18.3.28_react@18.3.1/node_modules/@emotion/styled/base/dist/emotion-styled-base.esm.js
import _extends2 from "@babel/runtime/helpers/esm/extends";
import * as React8 from "react";

// ../../../node_modules/.pnpm/@emotion+is-prop-valid@1.4.0/node_modules/@emotion/is-prop-valid/dist/emotion-is-prop-valid.esm.js
var reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|fetchpriority|fetchPriority|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|popover|popoverTarget|popoverTargetAction|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/;
var isPropValid = /* @__PURE__ */ memoize(
  function(prop) {
    return reactPropsRegex.test(prop) || prop.charCodeAt(0) === 111 && prop.charCodeAt(1) === 110 && prop.charCodeAt(2) < 91;
  }
  /* Z+1 */
);

// ../../../node_modules/.pnpm/@emotion+styled@11.14.1_@emotion+react@11.14.0_@types+react@18.3.28_react@18.3.1__@types+react@18.3.28_react@18.3.1/node_modules/@emotion/styled/base/dist/emotion-styled-base.esm.js
var isBrowser5 = typeof document !== "undefined";
var isDevelopment4 = false;
var testOmitPropsOnStringTag = isPropValid;
var testOmitPropsOnComponent = function testOmitPropsOnComponent2(key) {
  return key !== "theme";
};
var getDefaultShouldForwardProp = function getDefaultShouldForwardProp2(tag) {
  return typeof tag === "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  tag.charCodeAt(0) > 96 ? testOmitPropsOnStringTag : testOmitPropsOnComponent;
};
var composeShouldForwardProps = function composeShouldForwardProps2(tag, options, isReal) {
  var shouldForwardProp;
  if (options) {
    var optionsShouldForwardProp = options.shouldForwardProp;
    shouldForwardProp = tag.__emotion_forwardProp && optionsShouldForwardProp ? function(propName) {
      return tag.__emotion_forwardProp(propName) && optionsShouldForwardProp(propName);
    } : optionsShouldForwardProp;
  }
  if (typeof shouldForwardProp !== "function" && isReal) {
    shouldForwardProp = tag.__emotion_forwardProp;
  }
  return shouldForwardProp;
};
var Insertion3 = function Insertion4(_ref2) {
  var cache2 = _ref2.cache, serialized = _ref2.serialized, isStringTag = _ref2.isStringTag;
  registerStyles(cache2, serialized, isStringTag);
  var rules = useInsertionEffectAlwaysWithSyncFallback(function() {
    return insertStyles(cache2, serialized, isStringTag);
  });
  if (!isBrowser5 && rules !== void 0) {
    var _ref22;
    var serializedNames = serialized.name;
    var next2 = serialized.next;
    while (next2 !== void 0) {
      serializedNames += " " + next2.name;
      next2 = next2.next;
    }
    return /* @__PURE__ */ React8.createElement("style", (_ref22 = {}, _ref22["data-emotion"] = cache2.key + " " + serializedNames, _ref22.dangerouslySetInnerHTML = {
      __html: rules
    }, _ref22.nonce = cache2.sheet.nonce, _ref22));
  }
  return null;
};
var createStyled = function createStyled2(tag, options) {
  var isReal = tag.__emotion_real === tag;
  var baseTag = isReal && tag.__emotion_base || tag;
  var identifierName;
  var targetClassName;
  if (options !== void 0) {
    identifierName = options.label;
    targetClassName = options.target;
  }
  var shouldForwardProp = composeShouldForwardProps(tag, options, isReal);
  var defaultShouldForwardProp = shouldForwardProp || getDefaultShouldForwardProp(baseTag);
  var shouldUseAs = !defaultShouldForwardProp("as");
  return function() {
    var args = arguments;
    var styles = isReal && tag.__emotion_styles !== void 0 ? tag.__emotion_styles.slice(0) : [];
    if (identifierName !== void 0) {
      styles.push("label:" + identifierName + ";");
    }
    if (args[0] == null || args[0].raw === void 0) {
      styles.push.apply(styles, args);
    } else {
      var templateStringsArr = args[0];
      styles.push(templateStringsArr[0]);
      var len = args.length;
      var i2 = 1;
      for (; i2 < len; i2++) {
        styles.push(args[i2], templateStringsArr[i2]);
      }
    }
    var Styled = withEmotionCache(function(props, cache2, ref) {
      var FinalTag = shouldUseAs && props.as || baseTag;
      var className = "";
      var classInterpolations = [];
      var mergedProps = props;
      if (props.theme == null) {
        mergedProps = {};
        for (var key in props) {
          mergedProps[key] = props[key];
        }
        mergedProps.theme = React8.useContext(ThemeContext);
      }
      if (typeof props.className === "string") {
        className = getRegisteredStyles(cache2.registered, classInterpolations, props.className);
      } else if (props.className != null) {
        className = props.className + " ";
      }
      var serialized = serializeStyles(styles.concat(classInterpolations), cache2.registered, mergedProps);
      className += cache2.key + "-" + serialized.name;
      if (targetClassName !== void 0) {
        className += " " + targetClassName;
      }
      var finalShouldForwardProp = shouldUseAs && shouldForwardProp === void 0 ? getDefaultShouldForwardProp(FinalTag) : defaultShouldForwardProp;
      var newProps = {};
      for (var _key in props) {
        if (shouldUseAs && _key === "as") continue;
        if (finalShouldForwardProp(_key)) {
          newProps[_key] = props[_key];
        }
      }
      newProps.className = className;
      if (ref) {
        newProps.ref = ref;
      }
      return /* @__PURE__ */ React8.createElement(React8.Fragment, null, /* @__PURE__ */ React8.createElement(Insertion3, {
        cache: cache2,
        serialized,
        isStringTag: typeof FinalTag === "string"
      }), /* @__PURE__ */ React8.createElement(FinalTag, newProps));
    });
    Styled.displayName = identifierName !== void 0 ? identifierName : "Styled(" + (typeof baseTag === "string" ? baseTag : baseTag.displayName || baseTag.name || "Component") + ")";
    Styled.defaultProps = tag.defaultProps;
    Styled.__emotion_real = Styled;
    Styled.__emotion_base = baseTag;
    Styled.__emotion_styles = styles;
    Styled.__emotion_forwardProp = shouldForwardProp;
    Object.defineProperty(Styled, "toString", {
      value: function value() {
        if (targetClassName === void 0 && isDevelopment4) {
          return "NO_COMPONENT_SELECTOR";
        }
        return "." + targetClassName;
      }
    });
    Styled.withComponent = function(nextTag, nextOptions) {
      var newStyled = createStyled2(nextTag, _extends2({}, options, nextOptions, {
        shouldForwardProp: composeShouldForwardProps(Styled, nextOptions, true)
      }));
      return newStyled.apply(void 0, styles);
    };
    return Styled;
  };
};

// ../../../node_modules/.pnpm/@wordpress+components@32.3.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/view/component.mjs
import { jsx as _jsx17 } from "react/jsx-runtime";
var PolymorphicDiv = /* @__PURE__ */ createStyled("div", process.env.NODE_ENV === "production" ? {
  target: "e19lxcc00"
} : {
  target: "e19lxcc00",
  label: "PolymorphicDiv"
})(process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBZWlDIiwiZmlsZSI6ImNvbXBvbmVudC50c3giLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEV4dGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5cbi8qKlxuICogV29yZFByZXNzIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyBmb3J3YXJkUmVmIH0gZnJvbSAnQHdvcmRwcmVzcy9lbGVtZW50JztcblxuLyoqXG4gKiBJbnRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHR5cGUgeyBXb3JkUHJlc3NDb21wb25lbnRQcm9wcyB9IGZyb20gJy4uL2NvbnRleHQnO1xuXG5jb25zdCBQb2x5bW9ycGhpY0RpdiA9IHN0eWxlZC5kaXZgYDtcblxuZnVuY3Rpb24gVW5mb3J3YXJkZWRWaWV3PCBUIGV4dGVuZHMgUmVhY3QuRWxlbWVudFR5cGUgPSAnZGl2JyA+KFxuXHR7IGFzLCAuLi5yZXN0UHJvcHMgfTogV29yZFByZXNzQ29tcG9uZW50UHJvcHM8IHt9LCBUID4sXG5cdHJlZjogUmVhY3QuRm9yd2FyZGVkUmVmPCBhbnkgPlxuKSB7XG5cdHJldHVybiA8UG9seW1vcnBoaWNEaXYgYXM9eyBhcyB9IHJlZj17IHJlZiB9IHsgLi4ucmVzdFByb3BzIH0gLz47XG59XG5cbi8qKlxuICogYFZpZXdgIGlzIGEgY29yZSBjb21wb25lbnQgdGhhdCByZW5kZXJzIGV2ZXJ5dGhpbmcgaW4gdGhlIGxpYnJhcnkuXG4gKiBJdCBpcyB0aGUgcHJpbmNpcGxlIGNvbXBvbmVudCBpbiB0aGUgZW50aXJlIGxpYnJhcnkuXG4gKlxuICogYGBganN4XG4gKiBpbXBvcnQgeyBWaWV3IH0gZnJvbSBgQHdvcmRwcmVzcy9jb21wb25lbnRzYDtcbiAqXG4gKiBmdW5jdGlvbiBFeGFtcGxlKCkge1xuICogXHRyZXR1cm4gKFxuICogXHRcdDxWaWV3PlxuICogXHRcdFx0IENvZGUgaXMgUG9ldHJ5XG4gKiBcdFx0PC9WaWV3PlxuICogXHQpO1xuICogfVxuICogYGBgXG4gKi9cbmV4cG9ydCBjb25zdCBWaWV3ID0gT2JqZWN0LmFzc2lnbiggZm9yd2FyZFJlZiggVW5mb3J3YXJkZWRWaWV3ICksIHtcblx0c2VsZWN0b3I6ICcuY29tcG9uZW50cy12aWV3Jyxcbn0gKTtcblxuZXhwb3J0IGRlZmF1bHQgVmlldztcbiJdfQ== */");
function UnforwardedView({
  as,
  ...restProps
}, ref) {
  return /* @__PURE__ */ _jsx17(PolymorphicDiv, {
    as,
    ref,
    ...restProps
  });
}
var View = Object.assign(forwardRef3(UnforwardedView), {
  selector: ".components-view"
});
var component_default = View;

// ../../../node_modules/.pnpm/@wordpress+components@32.3.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/utils/use-responsive-value.mjs
var breakpoints = ["40em", "52em", "64em"];
var useBreakpointIndex = (options = {}) => {
  const {
    defaultIndex = 0
  } = options;
  if (typeof defaultIndex !== "number") {
    throw new TypeError(`Default breakpoint index should be a number. Got: ${defaultIndex}, ${typeof defaultIndex}`);
  } else if (defaultIndex < 0 || defaultIndex > breakpoints.length - 1) {
    throw new RangeError(`Default breakpoint index out of range. Theme has ${breakpoints.length} breakpoints, got index ${defaultIndex}`);
  }
  const [value, setValue] = useState5(defaultIndex);
  useEffect6(() => {
    const getIndex = () => breakpoints.filter((bp) => {
      return typeof window !== "undefined" ? window.matchMedia(`screen and (min-width: ${bp})`).matches : false;
    }).length;
    const onResize = () => {
      const newValue = getIndex();
      if (value !== newValue) {
        setValue(newValue);
      }
    };
    onResize();
    if (typeof window !== "undefined") {
      window.addEventListener("resize", onResize);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", onResize);
      }
    };
  }, [value]);
  return value;
};
function useResponsiveValue(values, options = {}) {
  const index = useBreakpointIndex(options);
  if (!Array.isArray(values) && typeof values !== "function") {
    return values;
  }
  const array = values || [];
  return array[index >= array.length ? array.length - 1 : index];
}

// ../../../node_modules/.pnpm/@wordpress+components@32.3.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/utils/space.mjs
var GRID_BASE = "4px";
function space(value) {
  if (typeof value === "undefined") {
    return void 0;
  }
  if (!value) {
    return "0";
  }
  const asInt = typeof value === "number" ? value : Number(value);
  if (typeof window !== "undefined" && window.CSS?.supports?.("margin", value.toString()) || Number.isNaN(asInt)) {
    return value.toString();
  }
  return `calc(${GRID_BASE} * ${value})`;
}

// ../../../node_modules/.pnpm/@wordpress+components@32.3.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/truncate/styles.mjs
function _EMOTION_STRINGIFIED_CSS_ERROR__() {
  return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
}
var Truncate = process.env.NODE_ENV === "production" ? {
  name: "hdknak",
  styles: "display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap"
} : {
  name: "abxxyf-Truncate",
  styles: "display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;label:Truncate;/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFLMkIiLCJmaWxlIjoic3R5bGVzLnRzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuXG5leHBvcnQgY29uc3QgVHJ1bmNhdGUgPSBjc3NgXG5cdGRpc3BsYXk6IGJsb2NrO1xuXHRvdmVyZmxvdzogaGlkZGVuO1xuXHR0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcblx0d2hpdGUtc3BhY2U6IG5vd3JhcDtcbmA7XG4iXX0= */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
};

// ../../../node_modules/.pnpm/@wordpress+components@32.3.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/truncate/utils.mjs
var TRUNCATE_ELLIPSIS = "\u2026";
var TRUNCATE_TYPE = {
  auto: "auto",
  head: "head",
  middle: "middle",
  tail: "tail",
  none: "none"
};
var TRUNCATE_DEFAULT_PROPS = {
  ellipsis: TRUNCATE_ELLIPSIS,
  ellipsizeMode: TRUNCATE_TYPE.auto,
  limit: 0,
  numberOfLines: 0
};
function truncateMiddle(word, headLength, tailLength, ellipsis) {
  if (typeof word !== "string") {
    return "";
  }
  const wordLength = word.length;
  const frontLength = ~~headLength;
  const backLength = ~~tailLength;
  const truncateStr = isValueDefined(ellipsis) ? ellipsis : TRUNCATE_ELLIPSIS;
  if (frontLength === 0 && backLength === 0 || frontLength >= wordLength || backLength >= wordLength || frontLength + backLength >= wordLength) {
    return word;
  } else if (backLength === 0) {
    return word.slice(0, frontLength) + truncateStr;
  }
  return word.slice(0, frontLength) + truncateStr + word.slice(wordLength - backLength);
}
function truncateContent(words = "", props) {
  const mergedProps = {
    ...TRUNCATE_DEFAULT_PROPS,
    ...props
  };
  const {
    ellipsis,
    ellipsizeMode,
    limit
  } = mergedProps;
  if (ellipsizeMode === TRUNCATE_TYPE.none) {
    return words;
  }
  let truncateHead;
  let truncateTail;
  switch (ellipsizeMode) {
    case TRUNCATE_TYPE.head:
      truncateHead = 0;
      truncateTail = limit;
      break;
    case TRUNCATE_TYPE.middle:
      truncateHead = Math.floor(limit / 2);
      truncateTail = Math.floor(limit / 2);
      break;
    default:
      truncateHead = limit;
      truncateTail = 0;
  }
  const truncatedContent = ellipsizeMode !== TRUNCATE_TYPE.auto ? truncateMiddle(words, truncateHead, truncateTail, ellipsis) : words;
  return truncatedContent;
}

// ../../../node_modules/.pnpm/@wordpress+components@32.3.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/truncate/hook.mjs
function useTruncate(props) {
  const {
    className,
    children,
    ellipsis = TRUNCATE_ELLIPSIS,
    ellipsizeMode = TRUNCATE_TYPE.auto,
    limit = 0,
    numberOfLines = 0,
    ...otherProps
  } = useContextSystem(props, "Truncate");
  const cx2 = useCx();
  let childrenAsText;
  if (typeof children === "string") {
    childrenAsText = children;
  } else if (typeof children === "number") {
    childrenAsText = children.toString();
  }
  const truncatedContent = childrenAsText ? truncateContent(childrenAsText, {
    ellipsis,
    ellipsizeMode,
    limit,
    numberOfLines
  }) : children;
  const shouldTruncate = !!childrenAsText && ellipsizeMode === TRUNCATE_TYPE.auto;
  const classes = useMemo13(() => {
    const truncateLines = /* @__PURE__ */ css(numberOfLines === 1 ? "word-break: break-all;" : "", " -webkit-box-orient:vertical;-webkit-line-clamp:", numberOfLines, ";display:-webkit-box;overflow:hidden;" + (process.env.NODE_ENV === "production" ? "" : ";label:truncateLines;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvb2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBMEQyQiIsImZpbGUiOiJob29rLnRzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuXG4vKipcbiAqIFdvcmRQcmVzcyBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgdXNlTWVtbyB9IGZyb20gJ0B3b3JkcHJlc3MvZWxlbWVudCc7XG5cbi8qKlxuICogSW50ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB0eXBlIHsgV29yZFByZXNzQ29tcG9uZW50UHJvcHMgfSBmcm9tICcuLi9jb250ZXh0JztcbmltcG9ydCB7IHVzZUNvbnRleHRTeXN0ZW0gfSBmcm9tICcuLi9jb250ZXh0JztcbmltcG9ydCAqIGFzIHN0eWxlcyBmcm9tICcuL3N0eWxlcyc7XG5pbXBvcnQgeyBUUlVOQ0FURV9FTExJUFNJUywgVFJVTkNBVEVfVFlQRSwgdHJ1bmNhdGVDb250ZW50IH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgeyB1c2VDeCB9IGZyb20gJy4uL3V0aWxzL2hvb2tzL3VzZS1jeCc7XG5pbXBvcnQgdHlwZSB7IFRydW5jYXRlUHJvcHMgfSBmcm9tICcuL3R5cGVzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdXNlVHJ1bmNhdGUoXG5cdHByb3BzOiBXb3JkUHJlc3NDb21wb25lbnRQcm9wczwgVHJ1bmNhdGVQcm9wcywgJ3NwYW4nID5cbikge1xuXHRjb25zdCB7XG5cdFx0Y2xhc3NOYW1lLFxuXHRcdGNoaWxkcmVuLFxuXHRcdGVsbGlwc2lzID0gVFJVTkNBVEVfRUxMSVBTSVMsXG5cdFx0ZWxsaXBzaXplTW9kZSA9IFRSVU5DQVRFX1RZUEUuYXV0byxcblx0XHRsaW1pdCA9IDAsXG5cdFx0bnVtYmVyT2ZMaW5lcyA9IDAsXG5cdFx0Li4ub3RoZXJQcm9wc1xuXHR9ID0gdXNlQ29udGV4dFN5c3RlbSggcHJvcHMsICdUcnVuY2F0ZScgKTtcblxuXHRjb25zdCBjeCA9IHVzZUN4KCk7XG5cblx0bGV0IGNoaWxkcmVuQXNUZXh0O1xuXHRpZiAoIHR5cGVvZiBjaGlsZHJlbiA9PT0gJ3N0cmluZycgKSB7XG5cdFx0Y2hpbGRyZW5Bc1RleHQgPSBjaGlsZHJlbjtcblx0fSBlbHNlIGlmICggdHlwZW9mIGNoaWxkcmVuID09PSAnbnVtYmVyJyApIHtcblx0XHRjaGlsZHJlbkFzVGV4dCA9IGNoaWxkcmVuLnRvU3RyaW5nKCk7XG5cdH1cblxuXHRjb25zdCB0cnVuY2F0ZWRDb250ZW50ID0gY2hpbGRyZW5Bc1RleHRcblx0XHQ/IHRydW5jYXRlQ29udGVudCggY2hpbGRyZW5Bc1RleHQsIHtcblx0XHRcdFx0ZWxsaXBzaXMsXG5cdFx0XHRcdGVsbGlwc2l6ZU1vZGUsXG5cdFx0XHRcdGxpbWl0LFxuXHRcdFx0XHRudW1iZXJPZkxpbmVzLFxuXHRcdCAgfSApXG5cdFx0OiBjaGlsZHJlbjtcblxuXHRjb25zdCBzaG91bGRUcnVuY2F0ZSA9XG5cdFx0ISEgY2hpbGRyZW5Bc1RleHQgJiYgZWxsaXBzaXplTW9kZSA9PT0gVFJVTkNBVEVfVFlQRS5hdXRvO1xuXG5cdGNvbnN0IGNsYXNzZXMgPSB1c2VNZW1vKCAoKSA9PiB7XG5cdFx0Ly8gVGhlIGB3b3JkLWJyZWFrOiBicmVhay1hbGxgIHByb3BlcnR5IGZpcnN0IG1ha2VzIHN1cmUgYSB0ZXh0IGxpbmVcblx0XHQvLyBicmVha3MgZXZlbiB3aGVuIGl0IGNvbnRhaW5zICd1bmJyZWFrYWJsZScgY29udGVudCBzdWNoIGFzIGxvbmcgVVJMcy5cblx0XHQvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL1dvcmRQcmVzcy9ndXRlbmJlcmcvaXNzdWVzLzYwODYwLlxuXHRcdGNvbnN0IHRydW5jYXRlTGluZXMgPSBjc3NgXG5cdFx0XHQkeyBudW1iZXJPZkxpbmVzID09PSAxID8gJ3dvcmQtYnJlYWs6IGJyZWFrLWFsbDsnIDogJycgfVxuXHRcdFx0LXdlYmtpdC1ib3gtb3JpZW50OiB2ZXJ0aWNhbDtcblx0XHRcdC13ZWJraXQtbGluZS1jbGFtcDogJHsgbnVtYmVyT2ZMaW5lcyB9O1xuXHRcdFx0ZGlzcGxheTogLXdlYmtpdC1ib3g7XG5cdFx0XHRvdmVyZmxvdzogaGlkZGVuO1xuXHRcdGA7XG5cblx0XHRyZXR1cm4gY3goXG5cdFx0XHRzaG91bGRUcnVuY2F0ZSAmJiAhIG51bWJlck9mTGluZXMgJiYgc3R5bGVzLlRydW5jYXRlLFxuXHRcdFx0c2hvdWxkVHJ1bmNhdGUgJiYgISEgbnVtYmVyT2ZMaW5lcyAmJiB0cnVuY2F0ZUxpbmVzLFxuXHRcdFx0Y2xhc3NOYW1lXG5cdFx0KTtcblx0fSwgWyBjbGFzc05hbWUsIGN4LCBudW1iZXJPZkxpbmVzLCBzaG91bGRUcnVuY2F0ZSBdICk7XG5cblx0cmV0dXJuIHsgLi4ub3RoZXJQcm9wcywgY2xhc3NOYW1lOiBjbGFzc2VzLCBjaGlsZHJlbjogdHJ1bmNhdGVkQ29udGVudCB9O1xufVxuIl19 */");
    return cx2(shouldTruncate && !numberOfLines && Truncate, shouldTruncate && !!numberOfLines && truncateLines, className);
  }, [className, cx2, numberOfLines, shouldTruncate]);
  return {
    ...otherProps,
    className: classes,
    children: truncatedContent
  };
}

// ../../../node_modules/.pnpm/@wordpress+components@32.3.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/text/styles.mjs
var styles_exports2 = {};
__export(styles_exports2, {
  Text: () => Text2,
  block: () => block,
  destructive: () => destructive,
  highlighterText: () => highlighterText,
  muted: () => muted,
  positive: () => positive,
  upperCase: () => upperCase
});
function _EMOTION_STRINGIFIED_CSS_ERROR__2() {
  return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
}
var Text2 = /* @__PURE__ */ css("color:", COLORS.theme.foreground, ";line-height:", config_values_default.fontLineHeightBase, ";margin:0;text-wrap:pretty;" + (process.env.NODE_ENV === "production" ? "" : ";label:Text;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFVdUIiLCJmaWxlIjoic3R5bGVzLnRzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuXG4vKipcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyBDT0xPUlMsIENPTkZJRyB9IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGNvbnN0IFRleHQgPSBjc3NgXG5cdGNvbG9yOiAkeyBDT0xPUlMudGhlbWUuZm9yZWdyb3VuZCB9O1xuXHRsaW5lLWhlaWdodDogJHsgQ09ORklHLmZvbnRMaW5lSGVpZ2h0QmFzZSB9O1xuXHRtYXJnaW46IDA7XG5cdHRleHQtd3JhcDogcHJldHR5O1xuYDtcblxuZXhwb3J0IGNvbnN0IGJsb2NrID0gY3NzYFxuXHRkaXNwbGF5OiBibG9jaztcbmA7XG5cbmV4cG9ydCBjb25zdCBwb3NpdGl2ZSA9IGNzc2Bcblx0Y29sb3I6ICR7IENPTE9SUy5hbGVydC5ncmVlbiB9O1xuYDtcblxuZXhwb3J0IGNvbnN0IGRlc3RydWN0aXZlID0gY3NzYFxuXHRjb2xvcjogJHsgQ09MT1JTLmFsZXJ0LnJlZCB9O1xuYDtcblxuZXhwb3J0IGNvbnN0IG11dGVkID0gY3NzYFxuXHRjb2xvcjogJHsgQ09MT1JTLmdyYXlbIDcwMCBdIH07XG5gO1xuXG5leHBvcnQgY29uc3QgaGlnaGxpZ2h0ZXJUZXh0ID0gY3NzYFxuXHRtYXJrIHtcblx0XHRiYWNrZ3JvdW5kOiAkeyBDT0xPUlMuYWxlcnQueWVsbG93IH07XG5cdFx0Ym9yZGVyLXJhZGl1czogJHsgQ09ORklHLnJhZGl1c1NtYWxsIH07XG5cdFx0Ym94LXNoYWRvdzpcblx0XHRcdDAgMCAwIDFweCByZ2JhKCAwLCAwLCAwLCAwLjA1ICkgaW5zZXQsXG5cdFx0XHQwIC0xcHggMCByZ2JhKCAwLCAwLCAwLCAwLjEgKSBpbnNldDtcblx0fVxuYDtcblxuZXhwb3J0IGNvbnN0IHVwcGVyQ2FzZSA9IGNzc2Bcblx0dGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbmA7XG4iXX0= */");
var block = process.env.NODE_ENV === "production" ? {
  name: "4zleql",
  styles: "display:block"
} : {
  name: "14aceuy-block",
  styles: "display:block;label:block;/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFpQndCIiwiZmlsZSI6InN0eWxlcy50cyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogRXh0ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB7IGNzcyB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcblxuLyoqXG4gKiBJbnRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgQ09MT1JTLCBDT05GSUcgfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBjb25zdCBUZXh0ID0gY3NzYFxuXHRjb2xvcjogJHsgQ09MT1JTLnRoZW1lLmZvcmVncm91bmQgfTtcblx0bGluZS1oZWlnaHQ6ICR7IENPTkZJRy5mb250TGluZUhlaWdodEJhc2UgfTtcblx0bWFyZ2luOiAwO1xuXHR0ZXh0LXdyYXA6IHByZXR0eTtcbmA7XG5cbmV4cG9ydCBjb25zdCBibG9jayA9IGNzc2Bcblx0ZGlzcGxheTogYmxvY2s7XG5gO1xuXG5leHBvcnQgY29uc3QgcG9zaXRpdmUgPSBjc3NgXG5cdGNvbG9yOiAkeyBDT0xPUlMuYWxlcnQuZ3JlZW4gfTtcbmA7XG5cbmV4cG9ydCBjb25zdCBkZXN0cnVjdGl2ZSA9IGNzc2Bcblx0Y29sb3I6ICR7IENPTE9SUy5hbGVydC5yZWQgfTtcbmA7XG5cbmV4cG9ydCBjb25zdCBtdXRlZCA9IGNzc2Bcblx0Y29sb3I6ICR7IENPTE9SUy5ncmF5WyA3MDAgXSB9O1xuYDtcblxuZXhwb3J0IGNvbnN0IGhpZ2hsaWdodGVyVGV4dCA9IGNzc2Bcblx0bWFyayB7XG5cdFx0YmFja2dyb3VuZDogJHsgQ09MT1JTLmFsZXJ0LnllbGxvdyB9O1xuXHRcdGJvcmRlci1yYWRpdXM6ICR7IENPTkZJRy5yYWRpdXNTbWFsbCB9O1xuXHRcdGJveC1zaGFkb3c6XG5cdFx0XHQwIDAgMCAxcHggcmdiYSggMCwgMCwgMCwgMC4wNSApIGluc2V0LFxuXHRcdFx0MCAtMXB4IDAgcmdiYSggMCwgMCwgMCwgMC4xICkgaW5zZXQ7XG5cdH1cbmA7XG5cbmV4cG9ydCBjb25zdCB1cHBlckNhc2UgPSBjc3NgXG5cdHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG5gO1xuIl19 */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__2
};
var positive = /* @__PURE__ */ css("color:", COLORS.alert.green, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:positive;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFxQjJCIiwiZmlsZSI6InN0eWxlcy50cyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogRXh0ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB7IGNzcyB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcblxuLyoqXG4gKiBJbnRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgQ09MT1JTLCBDT05GSUcgfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBjb25zdCBUZXh0ID0gY3NzYFxuXHRjb2xvcjogJHsgQ09MT1JTLnRoZW1lLmZvcmVncm91bmQgfTtcblx0bGluZS1oZWlnaHQ6ICR7IENPTkZJRy5mb250TGluZUhlaWdodEJhc2UgfTtcblx0bWFyZ2luOiAwO1xuXHR0ZXh0LXdyYXA6IHByZXR0eTtcbmA7XG5cbmV4cG9ydCBjb25zdCBibG9jayA9IGNzc2Bcblx0ZGlzcGxheTogYmxvY2s7XG5gO1xuXG5leHBvcnQgY29uc3QgcG9zaXRpdmUgPSBjc3NgXG5cdGNvbG9yOiAkeyBDT0xPUlMuYWxlcnQuZ3JlZW4gfTtcbmA7XG5cbmV4cG9ydCBjb25zdCBkZXN0cnVjdGl2ZSA9IGNzc2Bcblx0Y29sb3I6ICR7IENPTE9SUy5hbGVydC5yZWQgfTtcbmA7XG5cbmV4cG9ydCBjb25zdCBtdXRlZCA9IGNzc2Bcblx0Y29sb3I6ICR7IENPTE9SUy5ncmF5WyA3MDAgXSB9O1xuYDtcblxuZXhwb3J0IGNvbnN0IGhpZ2hsaWdodGVyVGV4dCA9IGNzc2Bcblx0bWFyayB7XG5cdFx0YmFja2dyb3VuZDogJHsgQ09MT1JTLmFsZXJ0LnllbGxvdyB9O1xuXHRcdGJvcmRlci1yYWRpdXM6ICR7IENPTkZJRy5yYWRpdXNTbWFsbCB9O1xuXHRcdGJveC1zaGFkb3c6XG5cdFx0XHQwIDAgMCAxcHggcmdiYSggMCwgMCwgMCwgMC4wNSApIGluc2V0LFxuXHRcdFx0MCAtMXB4IDAgcmdiYSggMCwgMCwgMCwgMC4xICkgaW5zZXQ7XG5cdH1cbmA7XG5cbmV4cG9ydCBjb25zdCB1cHBlckNhc2UgPSBjc3NgXG5cdHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG5gO1xuIl19 */");
var destructive = /* @__PURE__ */ css("color:", COLORS.alert.red, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:destructive;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUF5QjhCIiwiZmlsZSI6InN0eWxlcy50cyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogRXh0ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB7IGNzcyB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcblxuLyoqXG4gKiBJbnRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgQ09MT1JTLCBDT05GSUcgfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBjb25zdCBUZXh0ID0gY3NzYFxuXHRjb2xvcjogJHsgQ09MT1JTLnRoZW1lLmZvcmVncm91bmQgfTtcblx0bGluZS1oZWlnaHQ6ICR7IENPTkZJRy5mb250TGluZUhlaWdodEJhc2UgfTtcblx0bWFyZ2luOiAwO1xuXHR0ZXh0LXdyYXA6IHByZXR0eTtcbmA7XG5cbmV4cG9ydCBjb25zdCBibG9jayA9IGNzc2Bcblx0ZGlzcGxheTogYmxvY2s7XG5gO1xuXG5leHBvcnQgY29uc3QgcG9zaXRpdmUgPSBjc3NgXG5cdGNvbG9yOiAkeyBDT0xPUlMuYWxlcnQuZ3JlZW4gfTtcbmA7XG5cbmV4cG9ydCBjb25zdCBkZXN0cnVjdGl2ZSA9IGNzc2Bcblx0Y29sb3I6ICR7IENPTE9SUy5hbGVydC5yZWQgfTtcbmA7XG5cbmV4cG9ydCBjb25zdCBtdXRlZCA9IGNzc2Bcblx0Y29sb3I6ICR7IENPTE9SUy5ncmF5WyA3MDAgXSB9O1xuYDtcblxuZXhwb3J0IGNvbnN0IGhpZ2hsaWdodGVyVGV4dCA9IGNzc2Bcblx0bWFyayB7XG5cdFx0YmFja2dyb3VuZDogJHsgQ09MT1JTLmFsZXJ0LnllbGxvdyB9O1xuXHRcdGJvcmRlci1yYWRpdXM6ICR7IENPTkZJRy5yYWRpdXNTbWFsbCB9O1xuXHRcdGJveC1zaGFkb3c6XG5cdFx0XHQwIDAgMCAxcHggcmdiYSggMCwgMCwgMCwgMC4wNSApIGluc2V0LFxuXHRcdFx0MCAtMXB4IDAgcmdiYSggMCwgMCwgMCwgMC4xICkgaW5zZXQ7XG5cdH1cbmA7XG5cbmV4cG9ydCBjb25zdCB1cHBlckNhc2UgPSBjc3NgXG5cdHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG5gO1xuIl19 */");
var muted = /* @__PURE__ */ css("color:", COLORS.gray[700], ";" + (process.env.NODE_ENV === "production" ? "" : ";label:muted;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUE2QndCIiwiZmlsZSI6InN0eWxlcy50cyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogRXh0ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB7IGNzcyB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcblxuLyoqXG4gKiBJbnRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgQ09MT1JTLCBDT05GSUcgfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBjb25zdCBUZXh0ID0gY3NzYFxuXHRjb2xvcjogJHsgQ09MT1JTLnRoZW1lLmZvcmVncm91bmQgfTtcblx0bGluZS1oZWlnaHQ6ICR7IENPTkZJRy5mb250TGluZUhlaWdodEJhc2UgfTtcblx0bWFyZ2luOiAwO1xuXHR0ZXh0LXdyYXA6IHByZXR0eTtcbmA7XG5cbmV4cG9ydCBjb25zdCBibG9jayA9IGNzc2Bcblx0ZGlzcGxheTogYmxvY2s7XG5gO1xuXG5leHBvcnQgY29uc3QgcG9zaXRpdmUgPSBjc3NgXG5cdGNvbG9yOiAkeyBDT0xPUlMuYWxlcnQuZ3JlZW4gfTtcbmA7XG5cbmV4cG9ydCBjb25zdCBkZXN0cnVjdGl2ZSA9IGNzc2Bcblx0Y29sb3I6ICR7IENPTE9SUy5hbGVydC5yZWQgfTtcbmA7XG5cbmV4cG9ydCBjb25zdCBtdXRlZCA9IGNzc2Bcblx0Y29sb3I6ICR7IENPTE9SUy5ncmF5WyA3MDAgXSB9O1xuYDtcblxuZXhwb3J0IGNvbnN0IGhpZ2hsaWdodGVyVGV4dCA9IGNzc2Bcblx0bWFyayB7XG5cdFx0YmFja2dyb3VuZDogJHsgQ09MT1JTLmFsZXJ0LnllbGxvdyB9O1xuXHRcdGJvcmRlci1yYWRpdXM6ICR7IENPTkZJRy5yYWRpdXNTbWFsbCB9O1xuXHRcdGJveC1zaGFkb3c6XG5cdFx0XHQwIDAgMCAxcHggcmdiYSggMCwgMCwgMCwgMC4wNSApIGluc2V0LFxuXHRcdFx0MCAtMXB4IDAgcmdiYSggMCwgMCwgMCwgMC4xICkgaW5zZXQ7XG5cdH1cbmA7XG5cbmV4cG9ydCBjb25zdCB1cHBlckNhc2UgPSBjc3NgXG5cdHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG5gO1xuIl19 */");
var highlighterText = /* @__PURE__ */ css("mark{background:", COLORS.alert.yellow, ";border-radius:", config_values_default.radiusSmall, ";box-shadow:0 0 0 1px rgba( 0, 0, 0, 0.05 ) inset,0 -1px 0 rgba( 0, 0, 0, 0.1 ) inset;}" + (process.env.NODE_ENV === "production" ? "" : ";label:highlighterText;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFpQ2tDIiwiZmlsZSI6InN0eWxlcy50cyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogRXh0ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB7IGNzcyB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcblxuLyoqXG4gKiBJbnRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgQ09MT1JTLCBDT05GSUcgfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBjb25zdCBUZXh0ID0gY3NzYFxuXHRjb2xvcjogJHsgQ09MT1JTLnRoZW1lLmZvcmVncm91bmQgfTtcblx0bGluZS1oZWlnaHQ6ICR7IENPTkZJRy5mb250TGluZUhlaWdodEJhc2UgfTtcblx0bWFyZ2luOiAwO1xuXHR0ZXh0LXdyYXA6IHByZXR0eTtcbmA7XG5cbmV4cG9ydCBjb25zdCBibG9jayA9IGNzc2Bcblx0ZGlzcGxheTogYmxvY2s7XG5gO1xuXG5leHBvcnQgY29uc3QgcG9zaXRpdmUgPSBjc3NgXG5cdGNvbG9yOiAkeyBDT0xPUlMuYWxlcnQuZ3JlZW4gfTtcbmA7XG5cbmV4cG9ydCBjb25zdCBkZXN0cnVjdGl2ZSA9IGNzc2Bcblx0Y29sb3I6ICR7IENPTE9SUy5hbGVydC5yZWQgfTtcbmA7XG5cbmV4cG9ydCBjb25zdCBtdXRlZCA9IGNzc2Bcblx0Y29sb3I6ICR7IENPTE9SUy5ncmF5WyA3MDAgXSB9O1xuYDtcblxuZXhwb3J0IGNvbnN0IGhpZ2hsaWdodGVyVGV4dCA9IGNzc2Bcblx0bWFyayB7XG5cdFx0YmFja2dyb3VuZDogJHsgQ09MT1JTLmFsZXJ0LnllbGxvdyB9O1xuXHRcdGJvcmRlci1yYWRpdXM6ICR7IENPTkZJRy5yYWRpdXNTbWFsbCB9O1xuXHRcdGJveC1zaGFkb3c6XG5cdFx0XHQwIDAgMCAxcHggcmdiYSggMCwgMCwgMCwgMC4wNSApIGluc2V0LFxuXHRcdFx0MCAtMXB4IDAgcmdiYSggMCwgMCwgMCwgMC4xICkgaW5zZXQ7XG5cdH1cbmA7XG5cbmV4cG9ydCBjb25zdCB1cHBlckNhc2UgPSBjc3NgXG5cdHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG5gO1xuIl19 */");
var upperCase = process.env.NODE_ENV === "production" ? {
  name: "50zrmy",
  styles: "text-transform:uppercase"
} : {
  name: "1mrt3zt-upperCase",
  styles: "text-transform:uppercase;label:upperCase;/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUEyQzRCIiwiZmlsZSI6InN0eWxlcy50cyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogRXh0ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB7IGNzcyB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcblxuLyoqXG4gKiBJbnRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgQ09MT1JTLCBDT05GSUcgfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBjb25zdCBUZXh0ID0gY3NzYFxuXHRjb2xvcjogJHsgQ09MT1JTLnRoZW1lLmZvcmVncm91bmQgfTtcblx0bGluZS1oZWlnaHQ6ICR7IENPTkZJRy5mb250TGluZUhlaWdodEJhc2UgfTtcblx0bWFyZ2luOiAwO1xuXHR0ZXh0LXdyYXA6IHByZXR0eTtcbmA7XG5cbmV4cG9ydCBjb25zdCBibG9jayA9IGNzc2Bcblx0ZGlzcGxheTogYmxvY2s7XG5gO1xuXG5leHBvcnQgY29uc3QgcG9zaXRpdmUgPSBjc3NgXG5cdGNvbG9yOiAkeyBDT0xPUlMuYWxlcnQuZ3JlZW4gfTtcbmA7XG5cbmV4cG9ydCBjb25zdCBkZXN0cnVjdGl2ZSA9IGNzc2Bcblx0Y29sb3I6ICR7IENPTE9SUy5hbGVydC5yZWQgfTtcbmA7XG5cbmV4cG9ydCBjb25zdCBtdXRlZCA9IGNzc2Bcblx0Y29sb3I6ICR7IENPTE9SUy5ncmF5WyA3MDAgXSB9O1xuYDtcblxuZXhwb3J0IGNvbnN0IGhpZ2hsaWdodGVyVGV4dCA9IGNzc2Bcblx0bWFyayB7XG5cdFx0YmFja2dyb3VuZDogJHsgQ09MT1JTLmFsZXJ0LnllbGxvdyB9O1xuXHRcdGJvcmRlci1yYWRpdXM6ICR7IENPTkZJRy5yYWRpdXNTbWFsbCB9O1xuXHRcdGJveC1zaGFkb3c6XG5cdFx0XHQwIDAgMCAxcHggcmdiYSggMCwgMCwgMCwgMC4wNSApIGluc2V0LFxuXHRcdFx0MCAtMXB4IDAgcmdiYSggMCwgMCwgMCwgMC4xICkgaW5zZXQ7XG5cdH1cbmA7XG5cbmV4cG9ydCBjb25zdCB1cHBlckNhc2UgPSBjc3NgXG5cdHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG5gO1xuIl19 */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__2
};

// ../../../node_modules/.pnpm/@wordpress+components@32.3.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/text/utils.mjs
var import_highlight_words_core = __toESM(require_dist(), 1);
var lowercaseProps = (object) => {
  const mapped = {};
  for (const key in object) {
    mapped[key.toLowerCase()] = object[key];
  }
  return mapped;
};
var memoizedLowercaseProps = memize(lowercaseProps);
function createHighlighterText({
  activeClassName = "",
  activeIndex = -1,
  activeStyle,
  autoEscape,
  caseSensitive = false,
  children,
  findChunks,
  highlightClassName = "",
  highlightStyle = {},
  highlightTag = "mark",
  sanitize,
  searchWords = [],
  unhighlightClassName = "",
  unhighlightStyle
}) {
  if (!children) {
    return null;
  }
  if (typeof children !== "string") {
    return children;
  }
  const textToHighlight = children;
  const chunks = (0, import_highlight_words_core.findAll)({
    autoEscape,
    caseSensitive,
    findChunks,
    sanitize,
    searchWords,
    textToHighlight
  });
  const HighlightTag = highlightTag;
  let highlightIndex = -1;
  let highlightClassNames = "";
  let highlightStyles;
  const textContent = chunks.map((chunk, index) => {
    const text = textToHighlight.substr(chunk.start, chunk.end - chunk.start);
    if (chunk.highlight) {
      highlightIndex++;
      let highlightClass;
      if (typeof highlightClassName === "object") {
        if (!caseSensitive) {
          highlightClassName = memoizedLowercaseProps(highlightClassName);
          highlightClass = highlightClassName[text.toLowerCase()];
        } else {
          highlightClass = highlightClassName[text];
        }
      } else {
        highlightClass = highlightClassName;
      }
      const isActive = highlightIndex === +activeIndex;
      highlightClassNames = `${highlightClass} ${isActive ? activeClassName : ""}`;
      highlightStyles = isActive === true && activeStyle !== null ? Object.assign({}, highlightStyle, activeStyle) : highlightStyle;
      const props = {
        children: text,
        className: highlightClassNames,
        key: index,
        style: highlightStyles
      };
      if (typeof HighlightTag !== "string") {
        props.highlightIndex = highlightIndex;
      }
      return createElement3(HighlightTag, props);
    }
    return createElement3("span", {
      children: text,
      className: unhighlightClassName,
      key: index,
      style: unhighlightStyle
    });
  });
  return textContent;
}

// ../../../node_modules/.pnpm/@wordpress+components@32.3.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/utils/font-size.mjs
var BASE_FONT_SIZE = 13;
var PRESET_FONT_SIZES = {
  body: BASE_FONT_SIZE,
  caption: 10,
  footnote: 11,
  largeTitle: 28,
  subheadline: 12,
  title: 20
};
var HEADING_FONT_SIZES = [1, 2, 3, 4, 5, 6].flatMap((n2) => [n2, n2.toString()]);
function getFontSize(size = BASE_FONT_SIZE) {
  if (size in PRESET_FONT_SIZES) {
    return getFontSize(PRESET_FONT_SIZES[size]);
  }
  if (typeof size !== "number") {
    const parsed = parseFloat(size);
    if (Number.isNaN(parsed)) {
      return size;
    }
    size = parsed;
  }
  const ratio = `(${size} / ${BASE_FONT_SIZE})`;
  return `calc(${ratio} * ${config_values_default.fontSize})`;
}

// ../../../node_modules/.pnpm/@wordpress+components@32.3.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/text/get-line-height.mjs
function getLineHeight(adjustLineHeightForInnerControls, lineHeight) {
  if (lineHeight) {
    return lineHeight;
  }
  if (!adjustLineHeightForInnerControls) {
    return;
  }
  let value = `calc(${config_values_default.controlHeight} + ${space(2)})`;
  switch (adjustLineHeightForInnerControls) {
    case "large":
      value = `calc(${config_values_default.controlHeightLarge} + ${space(2)})`;
      break;
    case "small":
      value = `calc(${config_values_default.controlHeightSmall} + ${space(2)})`;
      break;
    case "xSmall":
      value = `calc(${config_values_default.controlHeightXSmall} + ${space(2)})`;
      break;
    default:
      break;
  }
  return value;
}

// ../../../node_modules/.pnpm/@wordpress+components@32.3.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/text/hook.mjs
function _EMOTION_STRINGIFIED_CSS_ERROR__3() {
  return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
}
var _ref = process.env.NODE_ENV === "production" ? {
  name: "50zrmy",
  styles: "text-transform:uppercase"
} : {
  name: "18bqwxz-sx-upperCase",
  styles: "text-transform:uppercase;label:sx-upperCase;/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvb2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBa0dpQiIsImZpbGUiOiJob29rLnRzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHR5cGUgeyBTZXJpYWxpemVkU3R5bGVzIH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuXG4vKipcbiAqIFdvcmRQcmVzcyBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgdXNlTWVtbywgQ2hpbGRyZW4sIGNsb25lRWxlbWVudCB9IGZyb20gJ0B3b3JkcHJlc3MvZWxlbWVudCc7XG5cbi8qKlxuICogSW50ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB0eXBlIHsgV29yZFByZXNzQ29tcG9uZW50UHJvcHMgfSBmcm9tICcuLi9jb250ZXh0JztcbmltcG9ydCB7IGhhc0Nvbm5lY3ROYW1lc3BhY2UsIHVzZUNvbnRleHRTeXN0ZW0gfSBmcm9tICcuLi9jb250ZXh0JztcbmltcG9ydCB7IHVzZVRydW5jYXRlIH0gZnJvbSAnLi4vdHJ1bmNhdGUnO1xuaW1wb3J0IHsgZ2V0T3B0aW1hbFRleHRTaGFkZSB9IGZyb20gJy4uL3V0aWxzL2NvbG9ycyc7XG5pbXBvcnQgKiBhcyBzdHlsZXMgZnJvbSAnLi9zdHlsZXMnO1xuaW1wb3J0IHsgY3JlYXRlSGlnaGxpZ2h0ZXJUZXh0IH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgeyBnZXRGb250U2l6ZSB9IGZyb20gJy4uL3V0aWxzL2ZvbnQtc2l6ZSc7XG5pbXBvcnQgeyBDT05GSUcsIENPTE9SUyB9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7IGdldExpbmVIZWlnaHQgfSBmcm9tICcuL2dldC1saW5lLWhlaWdodCc7XG5pbXBvcnQgeyB1c2VDeCB9IGZyb20gJy4uL3V0aWxzL2hvb2tzL3VzZS1jeCc7XG5pbXBvcnQgdHlwZSB7IFByb3BzIH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgdHlwZSBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbi8qKlxuICogQHBhcmFtIHtpbXBvcnQoJy4uL2NvbnRleHQnKS5Xb3JkUHJlc3NDb21wb25lbnRQcm9wczxpbXBvcnQoJy4vdHlwZXMnKS5Qcm9wcywgJ3NwYW4nPn0gcHJvcHNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdXNlVGV4dChcblx0cHJvcHM6IFdvcmRQcmVzc0NvbXBvbmVudFByb3BzPCBQcm9wcywgJ3NwYW4nID5cbikge1xuXHRjb25zdCB7XG5cdFx0YWRqdXN0TGluZUhlaWdodEZvcklubmVyQ29udHJvbHMsXG5cdFx0YWxpZ24sXG5cdFx0Y2hpbGRyZW4sXG5cdFx0Y2xhc3NOYW1lLFxuXHRcdGNvbG9yLFxuXHRcdGVsbGlwc2l6ZU1vZGUsXG5cdFx0aXNEZXN0cnVjdGl2ZSA9IGZhbHNlLFxuXHRcdGRpc3BsYXksXG5cdFx0aGlnaGxpZ2h0RXNjYXBlID0gZmFsc2UsXG5cdFx0aGlnaGxpZ2h0Q2FzZVNlbnNpdGl2ZSA9IGZhbHNlLFxuXHRcdGhpZ2hsaWdodFdvcmRzLFxuXHRcdGhpZ2hsaWdodFNhbml0aXplLFxuXHRcdGlzQmxvY2sgPSBmYWxzZSxcblx0XHRsZXR0ZXJTcGFjaW5nLFxuXHRcdGxpbmVIZWlnaHQ6IGxpbmVIZWlnaHRQcm9wLFxuXHRcdG9wdGltaXplUmVhZGFiaWxpdHlGb3IsXG5cdFx0c2l6ZSxcblx0XHR0cnVuY2F0ZSA9IGZhbHNlLFxuXHRcdHVwcGVyQ2FzZSA9IGZhbHNlLFxuXHRcdHZhcmlhbnQsXG5cdFx0d2VpZ2h0ID0gQ09ORklHLmZvbnRXZWlnaHQsXG5cdFx0Li4ub3RoZXJQcm9wc1xuXHR9ID0gdXNlQ29udGV4dFN5c3RlbSggcHJvcHMsICdUZXh0JyApO1xuXG5cdGxldCBjb250ZW50OiBSZWFjdC5SZWFjdE5vZGUgPSBjaGlsZHJlbjtcblx0Y29uc3QgaXNIaWdobGlnaHRlciA9IEFycmF5LmlzQXJyYXkoIGhpZ2hsaWdodFdvcmRzICk7XG5cdGNvbnN0IGlzQ2FwdGlvbiA9IHNpemUgPT09ICdjYXB0aW9uJztcblxuXHRpZiAoIGlzSGlnaGxpZ2h0ZXIgKSB7XG5cdFx0aWYgKCB0eXBlb2YgY2hpbGRyZW4gIT09ICdzdHJpbmcnICkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihcblx0XHRcdFx0J2BjaGlsZHJlbmAgb2YgYFRleHRgIG11c3Qgb25seSBiZSBgc3RyaW5nYCB0eXBlcyB3aGVuIGBoaWdobGlnaHRXb3Jkc2AgaXMgZGVmaW5lZCdcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0Y29udGVudCA9IGNyZWF0ZUhpZ2hsaWdodGVyVGV4dCgge1xuXHRcdFx0YXV0b0VzY2FwZTogaGlnaGxpZ2h0RXNjYXBlLFxuXHRcdFx0Y2hpbGRyZW4sXG5cdFx0XHRjYXNlU2Vuc2l0aXZlOiBoaWdobGlnaHRDYXNlU2Vuc2l0aXZlLFxuXHRcdFx0c2VhcmNoV29yZHM6IGhpZ2hsaWdodFdvcmRzLFxuXHRcdFx0c2FuaXRpemU6IGhpZ2hsaWdodFNhbml0aXplLFxuXHRcdH0gKTtcblx0fVxuXG5cdGNvbnN0IGN4ID0gdXNlQ3goKTtcblxuXHRjb25zdCBjbGFzc2VzID0gdXNlTWVtbyggKCkgPT4ge1xuXHRcdGNvbnN0IHN4OiBSZWNvcmQ8IHN0cmluZywgU2VyaWFsaXplZFN0eWxlcyB8IG51bGwgPiA9IHt9O1xuXG5cdFx0Y29uc3QgbGluZUhlaWdodCA9IGdldExpbmVIZWlnaHQoXG5cdFx0XHRhZGp1c3RMaW5lSGVpZ2h0Rm9ySW5uZXJDb250cm9scyxcblx0XHRcdGxpbmVIZWlnaHRQcm9wXG5cdFx0KTtcblxuXHRcdHN4LkJhc2UgPSBjc3MoIHtcblx0XHRcdGNvbG9yLFxuXHRcdFx0ZGlzcGxheSxcblx0XHRcdGZvbnRTaXplOiBnZXRGb250U2l6ZSggc2l6ZSApLFxuXHRcdFx0Zm9udFdlaWdodDogd2VpZ2h0LFxuXHRcdFx0bGluZUhlaWdodCxcblx0XHRcdGxldHRlclNwYWNpbmcsXG5cdFx0XHR0ZXh0QWxpZ246IGFsaWduLFxuXHRcdH0gKTtcblxuXHRcdHN4LnVwcGVyQ2FzZSA9IGNzcyggeyB0ZXh0VHJhbnNmb3JtOiAndXBwZXJjYXNlJyB9ICk7XG5cblx0XHRzeC5vcHRpbWFsVGV4dENvbG9yID0gbnVsbDtcblxuXHRcdGlmICggb3B0aW1pemVSZWFkYWJpbGl0eUZvciApIHtcblx0XHRcdGNvbnN0IGlzT3B0aW1hbFRleHRDb2xvckRhcmsgPVxuXHRcdFx0XHRnZXRPcHRpbWFsVGV4dFNoYWRlKCBvcHRpbWl6ZVJlYWRhYmlsaXR5Rm9yICkgPT09ICdkYXJrJztcblxuXHRcdFx0Ly8gU2hvdWxkIG5vdCB1c2UgdGhlbWUgY29sb3JzXG5cdFx0XHRzeC5vcHRpbWFsVGV4dENvbG9yID0gaXNPcHRpbWFsVGV4dENvbG9yRGFya1xuXHRcdFx0XHQ/IGNzcyggeyBjb2xvcjogQ09MT1JTLmdyYXlbIDkwMCBdIH0gKVxuXHRcdFx0XHQ6IGNzcyggeyBjb2xvcjogQ09MT1JTLndoaXRlIH0gKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gY3goXG5cdFx0XHRzdHlsZXMuVGV4dCxcblx0XHRcdHN4LkJhc2UsXG5cdFx0XHRzeC5vcHRpbWFsVGV4dENvbG9yLFxuXHRcdFx0aXNEZXN0cnVjdGl2ZSAmJiBzdHlsZXMuZGVzdHJ1Y3RpdmUsXG5cdFx0XHQhISBpc0hpZ2hsaWdodGVyICYmIHN0eWxlcy5oaWdobGlnaHRlclRleHQsXG5cdFx0XHRpc0Jsb2NrICYmIHN0eWxlcy5ibG9jayxcblx0XHRcdGlzQ2FwdGlvbiAmJiBzdHlsZXMubXV0ZWQsXG5cdFx0XHR2YXJpYW50ICYmIHN0eWxlc1sgdmFyaWFudCBdLFxuXHRcdFx0dXBwZXJDYXNlICYmIHN4LnVwcGVyQ2FzZSxcblx0XHRcdGNsYXNzTmFtZVxuXHRcdCk7XG5cdH0sIFtcblx0XHRhZGp1c3RMaW5lSGVpZ2h0Rm9ySW5uZXJDb250cm9scyxcblx0XHRhbGlnbixcblx0XHRjbGFzc05hbWUsXG5cdFx0Y29sb3IsXG5cdFx0Y3gsXG5cdFx0ZGlzcGxheSxcblx0XHRpc0Jsb2NrLFxuXHRcdGlzQ2FwdGlvbixcblx0XHRpc0Rlc3RydWN0aXZlLFxuXHRcdGlzSGlnaGxpZ2h0ZXIsXG5cdFx0bGV0dGVyU3BhY2luZyxcblx0XHRsaW5lSGVpZ2h0UHJvcCxcblx0XHRvcHRpbWl6ZVJlYWRhYmlsaXR5Rm9yLFxuXHRcdHNpemUsXG5cdFx0dXBwZXJDYXNlLFxuXHRcdHZhcmlhbnQsXG5cdFx0d2VpZ2h0LFxuXHRdICk7XG5cblx0bGV0IGZpbmFsRWxsaXBzaXplTW9kZTogdW5kZWZpbmVkIHwgJ2F1dG8nIHwgJ25vbmUnO1xuXHRpZiAoIHRydW5jYXRlID09PSB0cnVlICkge1xuXHRcdGZpbmFsRWxsaXBzaXplTW9kZSA9ICdhdXRvJztcblx0fVxuXHRpZiAoIHRydW5jYXRlID09PSBmYWxzZSApIHtcblx0XHRmaW5hbEVsbGlwc2l6ZU1vZGUgPSAnbm9uZSc7XG5cdH1cblxuXHRjb25zdCBmaW5hbENvbXBvbmVudFByb3BzID0ge1xuXHRcdC4uLm90aGVyUHJvcHMsXG5cdFx0Y2xhc3NOYW1lOiBjbGFzc2VzLFxuXHRcdGNoaWxkcmVuLFxuXHRcdGVsbGlwc2l6ZU1vZGU6IGVsbGlwc2l6ZU1vZGUgfHwgZmluYWxFbGxpcHNpemVNb2RlLFxuXHR9O1xuXG5cdGNvbnN0IHRydW5jYXRlUHJvcHMgPSB1c2VUcnVuY2F0ZSggZmluYWxDb21wb25lbnRQcm9wcyApO1xuXG5cdC8qKlxuXHQgKiBFbmhhbmNlIGNoaWxkIGA8TGluayAvPmAgY29tcG9uZW50cyB0byBpbmhlcml0IGZvbnQgc2l6ZS5cblx0ICovXG5cdGlmICggISB0cnVuY2F0ZSAmJiBBcnJheS5pc0FycmF5KCBjaGlsZHJlbiApICkge1xuXHRcdGNvbnRlbnQgPSBDaGlsZHJlbi5tYXAoIGNoaWxkcmVuLCAoIGNoaWxkICkgPT4ge1xuXHRcdFx0aWYgKFxuXHRcdFx0XHR0eXBlb2YgY2hpbGQgIT09ICdvYmplY3QnIHx8XG5cdFx0XHRcdGNoaWxkID09PSBudWxsIHx8XG5cdFx0XHRcdCEgKCAncHJvcHMnIGluIGNoaWxkIClcblx0XHRcdCkge1xuXHRcdFx0XHRyZXR1cm4gY2hpbGQ7XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IGlzTGluayA9IGhhc0Nvbm5lY3ROYW1lc3BhY2UoIGNoaWxkLCBbICdMaW5rJyBdICk7XG5cdFx0XHRpZiAoIGlzTGluayApIHtcblx0XHRcdFx0cmV0dXJuIGNsb25lRWxlbWVudCggY2hpbGQsIHtcblx0XHRcdFx0XHRzaXplOiBjaGlsZC5wcm9wcy5zaXplIHx8ICdpbmhlcml0Jyxcblx0XHRcdFx0fSApO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gY2hpbGQ7XG5cdFx0fSApO1xuXHR9XG5cblx0cmV0dXJuIHtcblx0XHQuLi50cnVuY2F0ZVByb3BzLFxuXHRcdGNoaWxkcmVuOiB0cnVuY2F0ZSA/IHRydW5jYXRlUHJvcHMuY2hpbGRyZW4gOiBjb250ZW50LFxuXHR9O1xufVxuIl19 */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__3
};
function useText(props) {
  const {
    adjustLineHeightForInnerControls,
    align,
    children,
    className,
    color,
    ellipsizeMode,
    isDestructive = false,
    display,
    highlightEscape = false,
    highlightCaseSensitive = false,
    highlightWords,
    highlightSanitize,
    isBlock = false,
    letterSpacing,
    lineHeight: lineHeightProp,
    optimizeReadabilityFor,
    size,
    truncate = false,
    upperCase: upperCase2 = false,
    variant,
    weight = config_values_default.fontWeight,
    ...otherProps
  } = useContextSystem(props, "Text");
  let content = children;
  const isHighlighter = Array.isArray(highlightWords);
  const isCaption = size === "caption";
  if (isHighlighter) {
    if (typeof children !== "string") {
      throw new TypeError("`children` of `Text` must only be `string` types when `highlightWords` is defined");
    }
    content = createHighlighterText({
      autoEscape: highlightEscape,
      children,
      caseSensitive: highlightCaseSensitive,
      searchWords: highlightWords,
      sanitize: highlightSanitize
    });
  }
  const cx2 = useCx();
  const classes = useMemo13(() => {
    const sx = {};
    const lineHeight = getLineHeight(adjustLineHeightForInnerControls, lineHeightProp);
    sx.Base = /* @__PURE__ */ css({
      color,
      display,
      fontSize: getFontSize(size),
      fontWeight: weight,
      lineHeight,
      letterSpacing,
      textAlign: align
    }, process.env.NODE_ENV === "production" ? "" : ";label:sx-Base;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvb2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBd0ZZIiwiZmlsZSI6Imhvb2sudHMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEV4dGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgdHlwZSB7IFNlcmlhbGl6ZWRTdHlsZXMgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5pbXBvcnQgeyBjc3MgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5cbi8qKlxuICogV29yZFByZXNzIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyB1c2VNZW1vLCBDaGlsZHJlbiwgY2xvbmVFbGVtZW50IH0gZnJvbSAnQHdvcmRwcmVzcy9lbGVtZW50JztcblxuLyoqXG4gKiBJbnRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHR5cGUgeyBXb3JkUHJlc3NDb21wb25lbnRQcm9wcyB9IGZyb20gJy4uL2NvbnRleHQnO1xuaW1wb3J0IHsgaGFzQ29ubmVjdE5hbWVzcGFjZSwgdXNlQ29udGV4dFN5c3RlbSB9IGZyb20gJy4uL2NvbnRleHQnO1xuaW1wb3J0IHsgdXNlVHJ1bmNhdGUgfSBmcm9tICcuLi90cnVuY2F0ZSc7XG5pbXBvcnQgeyBnZXRPcHRpbWFsVGV4dFNoYWRlIH0gZnJvbSAnLi4vdXRpbHMvY29sb3JzJztcbmltcG9ydCAqIGFzIHN0eWxlcyBmcm9tICcuL3N0eWxlcyc7XG5pbXBvcnQgeyBjcmVhdGVIaWdobGlnaHRlclRleHQgfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7IGdldEZvbnRTaXplIH0gZnJvbSAnLi4vdXRpbHMvZm9udC1zaXplJztcbmltcG9ydCB7IENPTkZJRywgQ09MT1JTIH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgZ2V0TGluZUhlaWdodCB9IGZyb20gJy4vZ2V0LWxpbmUtaGVpZ2h0JztcbmltcG9ydCB7IHVzZUN4IH0gZnJvbSAnLi4vdXRpbHMvaG9va3MvdXNlLWN4JztcbmltcG9ydCB0eXBlIHsgUHJvcHMgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB0eXBlIFJlYWN0IGZyb20gJ3JlYWN0JztcblxuLyoqXG4gKiBAcGFyYW0ge2ltcG9ydCgnLi4vY29udGV4dCcpLldvcmRQcmVzc0NvbXBvbmVudFByb3BzPGltcG9ydCgnLi90eXBlcycpLlByb3BzLCAnc3Bhbic+fSBwcm9wc1xuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB1c2VUZXh0KFxuXHRwcm9wczogV29yZFByZXNzQ29tcG9uZW50UHJvcHM8IFByb3BzLCAnc3BhbicgPlxuKSB7XG5cdGNvbnN0IHtcblx0XHRhZGp1c3RMaW5lSGVpZ2h0Rm9ySW5uZXJDb250cm9scyxcblx0XHRhbGlnbixcblx0XHRjaGlsZHJlbixcblx0XHRjbGFzc05hbWUsXG5cdFx0Y29sb3IsXG5cdFx0ZWxsaXBzaXplTW9kZSxcblx0XHRpc0Rlc3RydWN0aXZlID0gZmFsc2UsXG5cdFx0ZGlzcGxheSxcblx0XHRoaWdobGlnaHRFc2NhcGUgPSBmYWxzZSxcblx0XHRoaWdobGlnaHRDYXNlU2Vuc2l0aXZlID0gZmFsc2UsXG5cdFx0aGlnaGxpZ2h0V29yZHMsXG5cdFx0aGlnaGxpZ2h0U2FuaXRpemUsXG5cdFx0aXNCbG9jayA9IGZhbHNlLFxuXHRcdGxldHRlclNwYWNpbmcsXG5cdFx0bGluZUhlaWdodDogbGluZUhlaWdodFByb3AsXG5cdFx0b3B0aW1pemVSZWFkYWJpbGl0eUZvcixcblx0XHRzaXplLFxuXHRcdHRydW5jYXRlID0gZmFsc2UsXG5cdFx0dXBwZXJDYXNlID0gZmFsc2UsXG5cdFx0dmFyaWFudCxcblx0XHR3ZWlnaHQgPSBDT05GSUcuZm9udFdlaWdodCxcblx0XHQuLi5vdGhlclByb3BzXG5cdH0gPSB1c2VDb250ZXh0U3lzdGVtKCBwcm9wcywgJ1RleHQnICk7XG5cblx0bGV0IGNvbnRlbnQ6IFJlYWN0LlJlYWN0Tm9kZSA9IGNoaWxkcmVuO1xuXHRjb25zdCBpc0hpZ2hsaWdodGVyID0gQXJyYXkuaXNBcnJheSggaGlnaGxpZ2h0V29yZHMgKTtcblx0Y29uc3QgaXNDYXB0aW9uID0gc2l6ZSA9PT0gJ2NhcHRpb24nO1xuXG5cdGlmICggaXNIaWdobGlnaHRlciApIHtcblx0XHRpZiAoIHR5cGVvZiBjaGlsZHJlbiAhPT0gJ3N0cmluZycgKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFxuXHRcdFx0XHQnYGNoaWxkcmVuYCBvZiBgVGV4dGAgbXVzdCBvbmx5IGJlIGBzdHJpbmdgIHR5cGVzIHdoZW4gYGhpZ2hsaWdodFdvcmRzYCBpcyBkZWZpbmVkJ1xuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRjb250ZW50ID0gY3JlYXRlSGlnaGxpZ2h0ZXJUZXh0KCB7XG5cdFx0XHRhdXRvRXNjYXBlOiBoaWdobGlnaHRFc2NhcGUsXG5cdFx0XHRjaGlsZHJlbixcblx0XHRcdGNhc2VTZW5zaXRpdmU6IGhpZ2hsaWdodENhc2VTZW5zaXRpdmUsXG5cdFx0XHRzZWFyY2hXb3JkczogaGlnaGxpZ2h0V29yZHMsXG5cdFx0XHRzYW5pdGl6ZTogaGlnaGxpZ2h0U2FuaXRpemUsXG5cdFx0fSApO1xuXHR9XG5cblx0Y29uc3QgY3ggPSB1c2VDeCgpO1xuXG5cdGNvbnN0IGNsYXNzZXMgPSB1c2VNZW1vKCAoKSA9PiB7XG5cdFx0Y29uc3Qgc3g6IFJlY29yZDwgc3RyaW5nLCBTZXJpYWxpemVkU3R5bGVzIHwgbnVsbCA+ID0ge307XG5cblx0XHRjb25zdCBsaW5lSGVpZ2h0ID0gZ2V0TGluZUhlaWdodChcblx0XHRcdGFkanVzdExpbmVIZWlnaHRGb3JJbm5lckNvbnRyb2xzLFxuXHRcdFx0bGluZUhlaWdodFByb3Bcblx0XHQpO1xuXG5cdFx0c3guQmFzZSA9IGNzcygge1xuXHRcdFx0Y29sb3IsXG5cdFx0XHRkaXNwbGF5LFxuXHRcdFx0Zm9udFNpemU6IGdldEZvbnRTaXplKCBzaXplICksXG5cdFx0XHRmb250V2VpZ2h0OiB3ZWlnaHQsXG5cdFx0XHRsaW5lSGVpZ2h0LFxuXHRcdFx0bGV0dGVyU3BhY2luZyxcblx0XHRcdHRleHRBbGlnbjogYWxpZ24sXG5cdFx0fSApO1xuXG5cdFx0c3gudXBwZXJDYXNlID0gY3NzKCB7IHRleHRUcmFuc2Zvcm06ICd1cHBlcmNhc2UnIH0gKTtcblxuXHRcdHN4Lm9wdGltYWxUZXh0Q29sb3IgPSBudWxsO1xuXG5cdFx0aWYgKCBvcHRpbWl6ZVJlYWRhYmlsaXR5Rm9yICkge1xuXHRcdFx0Y29uc3QgaXNPcHRpbWFsVGV4dENvbG9yRGFyayA9XG5cdFx0XHRcdGdldE9wdGltYWxUZXh0U2hhZGUoIG9wdGltaXplUmVhZGFiaWxpdHlGb3IgKSA9PT0gJ2RhcmsnO1xuXG5cdFx0XHQvLyBTaG91bGQgbm90IHVzZSB0aGVtZSBjb2xvcnNcblx0XHRcdHN4Lm9wdGltYWxUZXh0Q29sb3IgPSBpc09wdGltYWxUZXh0Q29sb3JEYXJrXG5cdFx0XHRcdD8gY3NzKCB7IGNvbG9yOiBDT0xPUlMuZ3JheVsgOTAwIF0gfSApXG5cdFx0XHRcdDogY3NzKCB7IGNvbG9yOiBDT0xPUlMud2hpdGUgfSApO1xuXHRcdH1cblxuXHRcdHJldHVybiBjeChcblx0XHRcdHN0eWxlcy5UZXh0LFxuXHRcdFx0c3guQmFzZSxcblx0XHRcdHN4Lm9wdGltYWxUZXh0Q29sb3IsXG5cdFx0XHRpc0Rlc3RydWN0aXZlICYmIHN0eWxlcy5kZXN0cnVjdGl2ZSxcblx0XHRcdCEhIGlzSGlnaGxpZ2h0ZXIgJiYgc3R5bGVzLmhpZ2hsaWdodGVyVGV4dCxcblx0XHRcdGlzQmxvY2sgJiYgc3R5bGVzLmJsb2NrLFxuXHRcdFx0aXNDYXB0aW9uICYmIHN0eWxlcy5tdXRlZCxcblx0XHRcdHZhcmlhbnQgJiYgc3R5bGVzWyB2YXJpYW50IF0sXG5cdFx0XHR1cHBlckNhc2UgJiYgc3gudXBwZXJDYXNlLFxuXHRcdFx0Y2xhc3NOYW1lXG5cdFx0KTtcblx0fSwgW1xuXHRcdGFkanVzdExpbmVIZWlnaHRGb3JJbm5lckNvbnRyb2xzLFxuXHRcdGFsaWduLFxuXHRcdGNsYXNzTmFtZSxcblx0XHRjb2xvcixcblx0XHRjeCxcblx0XHRkaXNwbGF5LFxuXHRcdGlzQmxvY2ssXG5cdFx0aXNDYXB0aW9uLFxuXHRcdGlzRGVzdHJ1Y3RpdmUsXG5cdFx0aXNIaWdobGlnaHRlcixcblx0XHRsZXR0ZXJTcGFjaW5nLFxuXHRcdGxpbmVIZWlnaHRQcm9wLFxuXHRcdG9wdGltaXplUmVhZGFiaWxpdHlGb3IsXG5cdFx0c2l6ZSxcblx0XHR1cHBlckNhc2UsXG5cdFx0dmFyaWFudCxcblx0XHR3ZWlnaHQsXG5cdF0gKTtcblxuXHRsZXQgZmluYWxFbGxpcHNpemVNb2RlOiB1bmRlZmluZWQgfCAnYXV0bycgfCAnbm9uZSc7XG5cdGlmICggdHJ1bmNhdGUgPT09IHRydWUgKSB7XG5cdFx0ZmluYWxFbGxpcHNpemVNb2RlID0gJ2F1dG8nO1xuXHR9XG5cdGlmICggdHJ1bmNhdGUgPT09IGZhbHNlICkge1xuXHRcdGZpbmFsRWxsaXBzaXplTW9kZSA9ICdub25lJztcblx0fVxuXG5cdGNvbnN0IGZpbmFsQ29tcG9uZW50UHJvcHMgPSB7XG5cdFx0Li4ub3RoZXJQcm9wcyxcblx0XHRjbGFzc05hbWU6IGNsYXNzZXMsXG5cdFx0Y2hpbGRyZW4sXG5cdFx0ZWxsaXBzaXplTW9kZTogZWxsaXBzaXplTW9kZSB8fCBmaW5hbEVsbGlwc2l6ZU1vZGUsXG5cdH07XG5cblx0Y29uc3QgdHJ1bmNhdGVQcm9wcyA9IHVzZVRydW5jYXRlKCBmaW5hbENvbXBvbmVudFByb3BzICk7XG5cblx0LyoqXG5cdCAqIEVuaGFuY2UgY2hpbGQgYDxMaW5rIC8+YCBjb21wb25lbnRzIHRvIGluaGVyaXQgZm9udCBzaXplLlxuXHQgKi9cblx0aWYgKCAhIHRydW5jYXRlICYmIEFycmF5LmlzQXJyYXkoIGNoaWxkcmVuICkgKSB7XG5cdFx0Y29udGVudCA9IENoaWxkcmVuLm1hcCggY2hpbGRyZW4sICggY2hpbGQgKSA9PiB7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdHR5cGVvZiBjaGlsZCAhPT0gJ29iamVjdCcgfHxcblx0XHRcdFx0Y2hpbGQgPT09IG51bGwgfHxcblx0XHRcdFx0ISAoICdwcm9wcycgaW4gY2hpbGQgKVxuXHRcdFx0KSB7XG5cdFx0XHRcdHJldHVybiBjaGlsZDtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgaXNMaW5rID0gaGFzQ29ubmVjdE5hbWVzcGFjZSggY2hpbGQsIFsgJ0xpbmsnIF0gKTtcblx0XHRcdGlmICggaXNMaW5rICkge1xuXHRcdFx0XHRyZXR1cm4gY2xvbmVFbGVtZW50KCBjaGlsZCwge1xuXHRcdFx0XHRcdHNpemU6IGNoaWxkLnByb3BzLnNpemUgfHwgJ2luaGVyaXQnLFxuXHRcdFx0XHR9ICk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBjaGlsZDtcblx0XHR9ICk7XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdC4uLnRydW5jYXRlUHJvcHMsXG5cdFx0Y2hpbGRyZW46IHRydW5jYXRlID8gdHJ1bmNhdGVQcm9wcy5jaGlsZHJlbiA6IGNvbnRlbnQsXG5cdH07XG59XG4iXX0= */");
    sx.upperCase = _ref;
    sx.optimalTextColor = null;
    if (optimizeReadabilityFor) {
      const isOptimalTextColorDark = getOptimalTextShade(optimizeReadabilityFor) === "dark";
      sx.optimalTextColor = isOptimalTextColorDark ? /* @__PURE__ */ css({
        color: COLORS.gray[900]
      }, process.env.NODE_ENV === "production" ? "" : ";label:sx-optimalTextColor;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvb2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBNEdNIiwiZmlsZSI6Imhvb2sudHMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEV4dGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgdHlwZSB7IFNlcmlhbGl6ZWRTdHlsZXMgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5pbXBvcnQgeyBjc3MgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5cbi8qKlxuICogV29yZFByZXNzIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyB1c2VNZW1vLCBDaGlsZHJlbiwgY2xvbmVFbGVtZW50IH0gZnJvbSAnQHdvcmRwcmVzcy9lbGVtZW50JztcblxuLyoqXG4gKiBJbnRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHR5cGUgeyBXb3JkUHJlc3NDb21wb25lbnRQcm9wcyB9IGZyb20gJy4uL2NvbnRleHQnO1xuaW1wb3J0IHsgaGFzQ29ubmVjdE5hbWVzcGFjZSwgdXNlQ29udGV4dFN5c3RlbSB9IGZyb20gJy4uL2NvbnRleHQnO1xuaW1wb3J0IHsgdXNlVHJ1bmNhdGUgfSBmcm9tICcuLi90cnVuY2F0ZSc7XG5pbXBvcnQgeyBnZXRPcHRpbWFsVGV4dFNoYWRlIH0gZnJvbSAnLi4vdXRpbHMvY29sb3JzJztcbmltcG9ydCAqIGFzIHN0eWxlcyBmcm9tICcuL3N0eWxlcyc7XG5pbXBvcnQgeyBjcmVhdGVIaWdobGlnaHRlclRleHQgfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7IGdldEZvbnRTaXplIH0gZnJvbSAnLi4vdXRpbHMvZm9udC1zaXplJztcbmltcG9ydCB7IENPTkZJRywgQ09MT1JTIH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgZ2V0TGluZUhlaWdodCB9IGZyb20gJy4vZ2V0LWxpbmUtaGVpZ2h0JztcbmltcG9ydCB7IHVzZUN4IH0gZnJvbSAnLi4vdXRpbHMvaG9va3MvdXNlLWN4JztcbmltcG9ydCB0eXBlIHsgUHJvcHMgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB0eXBlIFJlYWN0IGZyb20gJ3JlYWN0JztcblxuLyoqXG4gKiBAcGFyYW0ge2ltcG9ydCgnLi4vY29udGV4dCcpLldvcmRQcmVzc0NvbXBvbmVudFByb3BzPGltcG9ydCgnLi90eXBlcycpLlByb3BzLCAnc3Bhbic+fSBwcm9wc1xuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB1c2VUZXh0KFxuXHRwcm9wczogV29yZFByZXNzQ29tcG9uZW50UHJvcHM8IFByb3BzLCAnc3BhbicgPlxuKSB7XG5cdGNvbnN0IHtcblx0XHRhZGp1c3RMaW5lSGVpZ2h0Rm9ySW5uZXJDb250cm9scyxcblx0XHRhbGlnbixcblx0XHRjaGlsZHJlbixcblx0XHRjbGFzc05hbWUsXG5cdFx0Y29sb3IsXG5cdFx0ZWxsaXBzaXplTW9kZSxcblx0XHRpc0Rlc3RydWN0aXZlID0gZmFsc2UsXG5cdFx0ZGlzcGxheSxcblx0XHRoaWdobGlnaHRFc2NhcGUgPSBmYWxzZSxcblx0XHRoaWdobGlnaHRDYXNlU2Vuc2l0aXZlID0gZmFsc2UsXG5cdFx0aGlnaGxpZ2h0V29yZHMsXG5cdFx0aGlnaGxpZ2h0U2FuaXRpemUsXG5cdFx0aXNCbG9jayA9IGZhbHNlLFxuXHRcdGxldHRlclNwYWNpbmcsXG5cdFx0bGluZUhlaWdodDogbGluZUhlaWdodFByb3AsXG5cdFx0b3B0aW1pemVSZWFkYWJpbGl0eUZvcixcblx0XHRzaXplLFxuXHRcdHRydW5jYXRlID0gZmFsc2UsXG5cdFx0dXBwZXJDYXNlID0gZmFsc2UsXG5cdFx0dmFyaWFudCxcblx0XHR3ZWlnaHQgPSBDT05GSUcuZm9udFdlaWdodCxcblx0XHQuLi5vdGhlclByb3BzXG5cdH0gPSB1c2VDb250ZXh0U3lzdGVtKCBwcm9wcywgJ1RleHQnICk7XG5cblx0bGV0IGNvbnRlbnQ6IFJlYWN0LlJlYWN0Tm9kZSA9IGNoaWxkcmVuO1xuXHRjb25zdCBpc0hpZ2hsaWdodGVyID0gQXJyYXkuaXNBcnJheSggaGlnaGxpZ2h0V29yZHMgKTtcblx0Y29uc3QgaXNDYXB0aW9uID0gc2l6ZSA9PT0gJ2NhcHRpb24nO1xuXG5cdGlmICggaXNIaWdobGlnaHRlciApIHtcblx0XHRpZiAoIHR5cGVvZiBjaGlsZHJlbiAhPT0gJ3N0cmluZycgKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFxuXHRcdFx0XHQnYGNoaWxkcmVuYCBvZiBgVGV4dGAgbXVzdCBvbmx5IGJlIGBzdHJpbmdgIHR5cGVzIHdoZW4gYGhpZ2hsaWdodFdvcmRzYCBpcyBkZWZpbmVkJ1xuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRjb250ZW50ID0gY3JlYXRlSGlnaGxpZ2h0ZXJUZXh0KCB7XG5cdFx0XHRhdXRvRXNjYXBlOiBoaWdobGlnaHRFc2NhcGUsXG5cdFx0XHRjaGlsZHJlbixcblx0XHRcdGNhc2VTZW5zaXRpdmU6IGhpZ2hsaWdodENhc2VTZW5zaXRpdmUsXG5cdFx0XHRzZWFyY2hXb3JkczogaGlnaGxpZ2h0V29yZHMsXG5cdFx0XHRzYW5pdGl6ZTogaGlnaGxpZ2h0U2FuaXRpemUsXG5cdFx0fSApO1xuXHR9XG5cblx0Y29uc3QgY3ggPSB1c2VDeCgpO1xuXG5cdGNvbnN0IGNsYXNzZXMgPSB1c2VNZW1vKCAoKSA9PiB7XG5cdFx0Y29uc3Qgc3g6IFJlY29yZDwgc3RyaW5nLCBTZXJpYWxpemVkU3R5bGVzIHwgbnVsbCA+ID0ge307XG5cblx0XHRjb25zdCBsaW5lSGVpZ2h0ID0gZ2V0TGluZUhlaWdodChcblx0XHRcdGFkanVzdExpbmVIZWlnaHRGb3JJbm5lckNvbnRyb2xzLFxuXHRcdFx0bGluZUhlaWdodFByb3Bcblx0XHQpO1xuXG5cdFx0c3guQmFzZSA9IGNzcygge1xuXHRcdFx0Y29sb3IsXG5cdFx0XHRkaXNwbGF5LFxuXHRcdFx0Zm9udFNpemU6IGdldEZvbnRTaXplKCBzaXplICksXG5cdFx0XHRmb250V2VpZ2h0OiB3ZWlnaHQsXG5cdFx0XHRsaW5lSGVpZ2h0LFxuXHRcdFx0bGV0dGVyU3BhY2luZyxcblx0XHRcdHRleHRBbGlnbjogYWxpZ24sXG5cdFx0fSApO1xuXG5cdFx0c3gudXBwZXJDYXNlID0gY3NzKCB7IHRleHRUcmFuc2Zvcm06ICd1cHBlcmNhc2UnIH0gKTtcblxuXHRcdHN4Lm9wdGltYWxUZXh0Q29sb3IgPSBudWxsO1xuXG5cdFx0aWYgKCBvcHRpbWl6ZVJlYWRhYmlsaXR5Rm9yICkge1xuXHRcdFx0Y29uc3QgaXNPcHRpbWFsVGV4dENvbG9yRGFyayA9XG5cdFx0XHRcdGdldE9wdGltYWxUZXh0U2hhZGUoIG9wdGltaXplUmVhZGFiaWxpdHlGb3IgKSA9PT0gJ2RhcmsnO1xuXG5cdFx0XHQvLyBTaG91bGQgbm90IHVzZSB0aGVtZSBjb2xvcnNcblx0XHRcdHN4Lm9wdGltYWxUZXh0Q29sb3IgPSBpc09wdGltYWxUZXh0Q29sb3JEYXJrXG5cdFx0XHRcdD8gY3NzKCB7IGNvbG9yOiBDT0xPUlMuZ3JheVsgOTAwIF0gfSApXG5cdFx0XHRcdDogY3NzKCB7IGNvbG9yOiBDT0xPUlMud2hpdGUgfSApO1xuXHRcdH1cblxuXHRcdHJldHVybiBjeChcblx0XHRcdHN0eWxlcy5UZXh0LFxuXHRcdFx0c3guQmFzZSxcblx0XHRcdHN4Lm9wdGltYWxUZXh0Q29sb3IsXG5cdFx0XHRpc0Rlc3RydWN0aXZlICYmIHN0eWxlcy5kZXN0cnVjdGl2ZSxcblx0XHRcdCEhIGlzSGlnaGxpZ2h0ZXIgJiYgc3R5bGVzLmhpZ2hsaWdodGVyVGV4dCxcblx0XHRcdGlzQmxvY2sgJiYgc3R5bGVzLmJsb2NrLFxuXHRcdFx0aXNDYXB0aW9uICYmIHN0eWxlcy5tdXRlZCxcblx0XHRcdHZhcmlhbnQgJiYgc3R5bGVzWyB2YXJpYW50IF0sXG5cdFx0XHR1cHBlckNhc2UgJiYgc3gudXBwZXJDYXNlLFxuXHRcdFx0Y2xhc3NOYW1lXG5cdFx0KTtcblx0fSwgW1xuXHRcdGFkanVzdExpbmVIZWlnaHRGb3JJbm5lckNvbnRyb2xzLFxuXHRcdGFsaWduLFxuXHRcdGNsYXNzTmFtZSxcblx0XHRjb2xvcixcblx0XHRjeCxcblx0XHRkaXNwbGF5LFxuXHRcdGlzQmxvY2ssXG5cdFx0aXNDYXB0aW9uLFxuXHRcdGlzRGVzdHJ1Y3RpdmUsXG5cdFx0aXNIaWdobGlnaHRlcixcblx0XHRsZXR0ZXJTcGFjaW5nLFxuXHRcdGxpbmVIZWlnaHRQcm9wLFxuXHRcdG9wdGltaXplUmVhZGFiaWxpdHlGb3IsXG5cdFx0c2l6ZSxcblx0XHR1cHBlckNhc2UsXG5cdFx0dmFyaWFudCxcblx0XHR3ZWlnaHQsXG5cdF0gKTtcblxuXHRsZXQgZmluYWxFbGxpcHNpemVNb2RlOiB1bmRlZmluZWQgfCAnYXV0bycgfCAnbm9uZSc7XG5cdGlmICggdHJ1bmNhdGUgPT09IHRydWUgKSB7XG5cdFx0ZmluYWxFbGxpcHNpemVNb2RlID0gJ2F1dG8nO1xuXHR9XG5cdGlmICggdHJ1bmNhdGUgPT09IGZhbHNlICkge1xuXHRcdGZpbmFsRWxsaXBzaXplTW9kZSA9ICdub25lJztcblx0fVxuXG5cdGNvbnN0IGZpbmFsQ29tcG9uZW50UHJvcHMgPSB7XG5cdFx0Li4ub3RoZXJQcm9wcyxcblx0XHRjbGFzc05hbWU6IGNsYXNzZXMsXG5cdFx0Y2hpbGRyZW4sXG5cdFx0ZWxsaXBzaXplTW9kZTogZWxsaXBzaXplTW9kZSB8fCBmaW5hbEVsbGlwc2l6ZU1vZGUsXG5cdH07XG5cblx0Y29uc3QgdHJ1bmNhdGVQcm9wcyA9IHVzZVRydW5jYXRlKCBmaW5hbENvbXBvbmVudFByb3BzICk7XG5cblx0LyoqXG5cdCAqIEVuaGFuY2UgY2hpbGQgYDxMaW5rIC8+YCBjb21wb25lbnRzIHRvIGluaGVyaXQgZm9udCBzaXplLlxuXHQgKi9cblx0aWYgKCAhIHRydW5jYXRlICYmIEFycmF5LmlzQXJyYXkoIGNoaWxkcmVuICkgKSB7XG5cdFx0Y29udGVudCA9IENoaWxkcmVuLm1hcCggY2hpbGRyZW4sICggY2hpbGQgKSA9PiB7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdHR5cGVvZiBjaGlsZCAhPT0gJ29iamVjdCcgfHxcblx0XHRcdFx0Y2hpbGQgPT09IG51bGwgfHxcblx0XHRcdFx0ISAoICdwcm9wcycgaW4gY2hpbGQgKVxuXHRcdFx0KSB7XG5cdFx0XHRcdHJldHVybiBjaGlsZDtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgaXNMaW5rID0gaGFzQ29ubmVjdE5hbWVzcGFjZSggY2hpbGQsIFsgJ0xpbmsnIF0gKTtcblx0XHRcdGlmICggaXNMaW5rICkge1xuXHRcdFx0XHRyZXR1cm4gY2xvbmVFbGVtZW50KCBjaGlsZCwge1xuXHRcdFx0XHRcdHNpemU6IGNoaWxkLnByb3BzLnNpemUgfHwgJ2luaGVyaXQnLFxuXHRcdFx0XHR9ICk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBjaGlsZDtcblx0XHR9ICk7XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdC4uLnRydW5jYXRlUHJvcHMsXG5cdFx0Y2hpbGRyZW46IHRydW5jYXRlID8gdHJ1bmNhdGVQcm9wcy5jaGlsZHJlbiA6IGNvbnRlbnQsXG5cdH07XG59XG4iXX0= */") : /* @__PURE__ */ css({
        color: COLORS.white
      }, process.env.NODE_ENV === "production" ? "" : ";label:sx-optimalTextColor;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvb2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBNkdNIiwiZmlsZSI6Imhvb2sudHMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEV4dGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgdHlwZSB7IFNlcmlhbGl6ZWRTdHlsZXMgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5pbXBvcnQgeyBjc3MgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5cbi8qKlxuICogV29yZFByZXNzIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyB1c2VNZW1vLCBDaGlsZHJlbiwgY2xvbmVFbGVtZW50IH0gZnJvbSAnQHdvcmRwcmVzcy9lbGVtZW50JztcblxuLyoqXG4gKiBJbnRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHR5cGUgeyBXb3JkUHJlc3NDb21wb25lbnRQcm9wcyB9IGZyb20gJy4uL2NvbnRleHQnO1xuaW1wb3J0IHsgaGFzQ29ubmVjdE5hbWVzcGFjZSwgdXNlQ29udGV4dFN5c3RlbSB9IGZyb20gJy4uL2NvbnRleHQnO1xuaW1wb3J0IHsgdXNlVHJ1bmNhdGUgfSBmcm9tICcuLi90cnVuY2F0ZSc7XG5pbXBvcnQgeyBnZXRPcHRpbWFsVGV4dFNoYWRlIH0gZnJvbSAnLi4vdXRpbHMvY29sb3JzJztcbmltcG9ydCAqIGFzIHN0eWxlcyBmcm9tICcuL3N0eWxlcyc7XG5pbXBvcnQgeyBjcmVhdGVIaWdobGlnaHRlclRleHQgfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7IGdldEZvbnRTaXplIH0gZnJvbSAnLi4vdXRpbHMvZm9udC1zaXplJztcbmltcG9ydCB7IENPTkZJRywgQ09MT1JTIH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgZ2V0TGluZUhlaWdodCB9IGZyb20gJy4vZ2V0LWxpbmUtaGVpZ2h0JztcbmltcG9ydCB7IHVzZUN4IH0gZnJvbSAnLi4vdXRpbHMvaG9va3MvdXNlLWN4JztcbmltcG9ydCB0eXBlIHsgUHJvcHMgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB0eXBlIFJlYWN0IGZyb20gJ3JlYWN0JztcblxuLyoqXG4gKiBAcGFyYW0ge2ltcG9ydCgnLi4vY29udGV4dCcpLldvcmRQcmVzc0NvbXBvbmVudFByb3BzPGltcG9ydCgnLi90eXBlcycpLlByb3BzLCAnc3Bhbic+fSBwcm9wc1xuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB1c2VUZXh0KFxuXHRwcm9wczogV29yZFByZXNzQ29tcG9uZW50UHJvcHM8IFByb3BzLCAnc3BhbicgPlxuKSB7XG5cdGNvbnN0IHtcblx0XHRhZGp1c3RMaW5lSGVpZ2h0Rm9ySW5uZXJDb250cm9scyxcblx0XHRhbGlnbixcblx0XHRjaGlsZHJlbixcblx0XHRjbGFzc05hbWUsXG5cdFx0Y29sb3IsXG5cdFx0ZWxsaXBzaXplTW9kZSxcblx0XHRpc0Rlc3RydWN0aXZlID0gZmFsc2UsXG5cdFx0ZGlzcGxheSxcblx0XHRoaWdobGlnaHRFc2NhcGUgPSBmYWxzZSxcblx0XHRoaWdobGlnaHRDYXNlU2Vuc2l0aXZlID0gZmFsc2UsXG5cdFx0aGlnaGxpZ2h0V29yZHMsXG5cdFx0aGlnaGxpZ2h0U2FuaXRpemUsXG5cdFx0aXNCbG9jayA9IGZhbHNlLFxuXHRcdGxldHRlclNwYWNpbmcsXG5cdFx0bGluZUhlaWdodDogbGluZUhlaWdodFByb3AsXG5cdFx0b3B0aW1pemVSZWFkYWJpbGl0eUZvcixcblx0XHRzaXplLFxuXHRcdHRydW5jYXRlID0gZmFsc2UsXG5cdFx0dXBwZXJDYXNlID0gZmFsc2UsXG5cdFx0dmFyaWFudCxcblx0XHR3ZWlnaHQgPSBDT05GSUcuZm9udFdlaWdodCxcblx0XHQuLi5vdGhlclByb3BzXG5cdH0gPSB1c2VDb250ZXh0U3lzdGVtKCBwcm9wcywgJ1RleHQnICk7XG5cblx0bGV0IGNvbnRlbnQ6IFJlYWN0LlJlYWN0Tm9kZSA9IGNoaWxkcmVuO1xuXHRjb25zdCBpc0hpZ2hsaWdodGVyID0gQXJyYXkuaXNBcnJheSggaGlnaGxpZ2h0V29yZHMgKTtcblx0Y29uc3QgaXNDYXB0aW9uID0gc2l6ZSA9PT0gJ2NhcHRpb24nO1xuXG5cdGlmICggaXNIaWdobGlnaHRlciApIHtcblx0XHRpZiAoIHR5cGVvZiBjaGlsZHJlbiAhPT0gJ3N0cmluZycgKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFxuXHRcdFx0XHQnYGNoaWxkcmVuYCBvZiBgVGV4dGAgbXVzdCBvbmx5IGJlIGBzdHJpbmdgIHR5cGVzIHdoZW4gYGhpZ2hsaWdodFdvcmRzYCBpcyBkZWZpbmVkJ1xuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRjb250ZW50ID0gY3JlYXRlSGlnaGxpZ2h0ZXJUZXh0KCB7XG5cdFx0XHRhdXRvRXNjYXBlOiBoaWdobGlnaHRFc2NhcGUsXG5cdFx0XHRjaGlsZHJlbixcblx0XHRcdGNhc2VTZW5zaXRpdmU6IGhpZ2hsaWdodENhc2VTZW5zaXRpdmUsXG5cdFx0XHRzZWFyY2hXb3JkczogaGlnaGxpZ2h0V29yZHMsXG5cdFx0XHRzYW5pdGl6ZTogaGlnaGxpZ2h0U2FuaXRpemUsXG5cdFx0fSApO1xuXHR9XG5cblx0Y29uc3QgY3ggPSB1c2VDeCgpO1xuXG5cdGNvbnN0IGNsYXNzZXMgPSB1c2VNZW1vKCAoKSA9PiB7XG5cdFx0Y29uc3Qgc3g6IFJlY29yZDwgc3RyaW5nLCBTZXJpYWxpemVkU3R5bGVzIHwgbnVsbCA+ID0ge307XG5cblx0XHRjb25zdCBsaW5lSGVpZ2h0ID0gZ2V0TGluZUhlaWdodChcblx0XHRcdGFkanVzdExpbmVIZWlnaHRGb3JJbm5lckNvbnRyb2xzLFxuXHRcdFx0bGluZUhlaWdodFByb3Bcblx0XHQpO1xuXG5cdFx0c3guQmFzZSA9IGNzcygge1xuXHRcdFx0Y29sb3IsXG5cdFx0XHRkaXNwbGF5LFxuXHRcdFx0Zm9udFNpemU6IGdldEZvbnRTaXplKCBzaXplICksXG5cdFx0XHRmb250V2VpZ2h0OiB3ZWlnaHQsXG5cdFx0XHRsaW5lSGVpZ2h0LFxuXHRcdFx0bGV0dGVyU3BhY2luZyxcblx0XHRcdHRleHRBbGlnbjogYWxpZ24sXG5cdFx0fSApO1xuXG5cdFx0c3gudXBwZXJDYXNlID0gY3NzKCB7IHRleHRUcmFuc2Zvcm06ICd1cHBlcmNhc2UnIH0gKTtcblxuXHRcdHN4Lm9wdGltYWxUZXh0Q29sb3IgPSBudWxsO1xuXG5cdFx0aWYgKCBvcHRpbWl6ZVJlYWRhYmlsaXR5Rm9yICkge1xuXHRcdFx0Y29uc3QgaXNPcHRpbWFsVGV4dENvbG9yRGFyayA9XG5cdFx0XHRcdGdldE9wdGltYWxUZXh0U2hhZGUoIG9wdGltaXplUmVhZGFiaWxpdHlGb3IgKSA9PT0gJ2RhcmsnO1xuXG5cdFx0XHQvLyBTaG91bGQgbm90IHVzZSB0aGVtZSBjb2xvcnNcblx0XHRcdHN4Lm9wdGltYWxUZXh0Q29sb3IgPSBpc09wdGltYWxUZXh0Q29sb3JEYXJrXG5cdFx0XHRcdD8gY3NzKCB7IGNvbG9yOiBDT0xPUlMuZ3JheVsgOTAwIF0gfSApXG5cdFx0XHRcdDogY3NzKCB7IGNvbG9yOiBDT0xPUlMud2hpdGUgfSApO1xuXHRcdH1cblxuXHRcdHJldHVybiBjeChcblx0XHRcdHN0eWxlcy5UZXh0LFxuXHRcdFx0c3guQmFzZSxcblx0XHRcdHN4Lm9wdGltYWxUZXh0Q29sb3IsXG5cdFx0XHRpc0Rlc3RydWN0aXZlICYmIHN0eWxlcy5kZXN0cnVjdGl2ZSxcblx0XHRcdCEhIGlzSGlnaGxpZ2h0ZXIgJiYgc3R5bGVzLmhpZ2hsaWdodGVyVGV4dCxcblx0XHRcdGlzQmxvY2sgJiYgc3R5bGVzLmJsb2NrLFxuXHRcdFx0aXNDYXB0aW9uICYmIHN0eWxlcy5tdXRlZCxcblx0XHRcdHZhcmlhbnQgJiYgc3R5bGVzWyB2YXJpYW50IF0sXG5cdFx0XHR1cHBlckNhc2UgJiYgc3gudXBwZXJDYXNlLFxuXHRcdFx0Y2xhc3NOYW1lXG5cdFx0KTtcblx0fSwgW1xuXHRcdGFkanVzdExpbmVIZWlnaHRGb3JJbm5lckNvbnRyb2xzLFxuXHRcdGFsaWduLFxuXHRcdGNsYXNzTmFtZSxcblx0XHRjb2xvcixcblx0XHRjeCxcblx0XHRkaXNwbGF5LFxuXHRcdGlzQmxvY2ssXG5cdFx0aXNDYXB0aW9uLFxuXHRcdGlzRGVzdHJ1Y3RpdmUsXG5cdFx0aXNIaWdobGlnaHRlcixcblx0XHRsZXR0ZXJTcGFjaW5nLFxuXHRcdGxpbmVIZWlnaHRQcm9wLFxuXHRcdG9wdGltaXplUmVhZGFiaWxpdHlGb3IsXG5cdFx0c2l6ZSxcblx0XHR1cHBlckNhc2UsXG5cdFx0dmFyaWFudCxcblx0XHR3ZWlnaHQsXG5cdF0gKTtcblxuXHRsZXQgZmluYWxFbGxpcHNpemVNb2RlOiB1bmRlZmluZWQgfCAnYXV0bycgfCAnbm9uZSc7XG5cdGlmICggdHJ1bmNhdGUgPT09IHRydWUgKSB7XG5cdFx0ZmluYWxFbGxpcHNpemVNb2RlID0gJ2F1dG8nO1xuXHR9XG5cdGlmICggdHJ1bmNhdGUgPT09IGZhbHNlICkge1xuXHRcdGZpbmFsRWxsaXBzaXplTW9kZSA9ICdub25lJztcblx0fVxuXG5cdGNvbnN0IGZpbmFsQ29tcG9uZW50UHJvcHMgPSB7XG5cdFx0Li4ub3RoZXJQcm9wcyxcblx0XHRjbGFzc05hbWU6IGNsYXNzZXMsXG5cdFx0Y2hpbGRyZW4sXG5cdFx0ZWxsaXBzaXplTW9kZTogZWxsaXBzaXplTW9kZSB8fCBmaW5hbEVsbGlwc2l6ZU1vZGUsXG5cdH07XG5cblx0Y29uc3QgdHJ1bmNhdGVQcm9wcyA9IHVzZVRydW5jYXRlKCBmaW5hbENvbXBvbmVudFByb3BzICk7XG5cblx0LyoqXG5cdCAqIEVuaGFuY2UgY2hpbGQgYDxMaW5rIC8+YCBjb21wb25lbnRzIHRvIGluaGVyaXQgZm9udCBzaXplLlxuXHQgKi9cblx0aWYgKCAhIHRydW5jYXRlICYmIEFycmF5LmlzQXJyYXkoIGNoaWxkcmVuICkgKSB7XG5cdFx0Y29udGVudCA9IENoaWxkcmVuLm1hcCggY2hpbGRyZW4sICggY2hpbGQgKSA9PiB7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdHR5cGVvZiBjaGlsZCAhPT0gJ29iamVjdCcgfHxcblx0XHRcdFx0Y2hpbGQgPT09IG51bGwgfHxcblx0XHRcdFx0ISAoICdwcm9wcycgaW4gY2hpbGQgKVxuXHRcdFx0KSB7XG5cdFx0XHRcdHJldHVybiBjaGlsZDtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgaXNMaW5rID0gaGFzQ29ubmVjdE5hbWVzcGFjZSggY2hpbGQsIFsgJ0xpbmsnIF0gKTtcblx0XHRcdGlmICggaXNMaW5rICkge1xuXHRcdFx0XHRyZXR1cm4gY2xvbmVFbGVtZW50KCBjaGlsZCwge1xuXHRcdFx0XHRcdHNpemU6IGNoaWxkLnByb3BzLnNpemUgfHwgJ2luaGVyaXQnLFxuXHRcdFx0XHR9ICk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBjaGlsZDtcblx0XHR9ICk7XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdC4uLnRydW5jYXRlUHJvcHMsXG5cdFx0Y2hpbGRyZW46IHRydW5jYXRlID8gdHJ1bmNhdGVQcm9wcy5jaGlsZHJlbiA6IGNvbnRlbnQsXG5cdH07XG59XG4iXX0= */");
    }
    return cx2(Text2, sx.Base, sx.optimalTextColor, isDestructive && destructive, !!isHighlighter && highlighterText, isBlock && block, isCaption && muted, variant && styles_exports2[variant], upperCase2 && sx.upperCase, className);
  }, [adjustLineHeightForInnerControls, align, className, color, cx2, display, isBlock, isCaption, isDestructive, isHighlighter, letterSpacing, lineHeightProp, optimizeReadabilityFor, size, upperCase2, variant, weight]);
  let finalEllipsizeMode;
  if (truncate === true) {
    finalEllipsizeMode = "auto";
  }
  if (truncate === false) {
    finalEllipsizeMode = "none";
  }
  const finalComponentProps = {
    ...otherProps,
    className: classes,
    children,
    ellipsizeMode: ellipsizeMode || finalEllipsizeMode
  };
  const truncateProps = useTruncate(finalComponentProps);
  if (!truncate && Array.isArray(children)) {
    content = Children3.map(children, (child) => {
      if (typeof child !== "object" || child === null || !("props" in child)) {
        return child;
      }
      const isLink = hasConnectNamespace(child, ["Link"]);
      if (isLink) {
        return cloneElement2(child, {
          size: child.props.size || "inherit"
        });
      }
      return child;
    });
  }
  return {
    ...truncateProps,
    children: truncate ? truncateProps.children : content
  };
}

// ../../../node_modules/.pnpm/@wordpress+components@32.3.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/text/component.mjs
import { jsx as _jsx18 } from "react/jsx-runtime";
function UnconnectedText(props, forwardedRef) {
  const textProps = useText(props);
  return /* @__PURE__ */ _jsx18(component_default, {
    as: "span",
    ...textProps,
    ref: forwardedRef
  });
}
var Text3 = contextConnect(UnconnectedText, "Text");
var component_default2 = Text3;

// ../../../node_modules/.pnpm/@wordpress+components@32.3.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/grid/utils.mjs
var ALIGNMENTS = {
  bottom: {
    alignItems: "flex-end",
    justifyContent: "center"
  },
  bottomLeft: {
    alignItems: "flex-start",
    justifyContent: "flex-end"
  },
  bottomRight: {
    alignItems: "flex-end",
    justifyContent: "flex-end"
  },
  center: {
    alignItems: "center",
    justifyContent: "center"
  },
  spaced: {
    alignItems: "center",
    justifyContent: "space-between"
  },
  left: {
    alignItems: "center",
    justifyContent: "flex-start"
  },
  right: {
    alignItems: "center",
    justifyContent: "flex-end"
  },
  stretch: {
    alignItems: "stretch"
  },
  top: {
    alignItems: "flex-start",
    justifyContent: "center"
  },
  topLeft: {
    alignItems: "flex-start",
    justifyContent: "flex-start"
  },
  topRight: {
    alignItems: "flex-start",
    justifyContent: "flex-end"
  }
};
function getAlignmentProps(alignment) {
  const alignmentProps = alignment ? ALIGNMENTS[alignment] : {};
  return alignmentProps;
}

// ../../../node_modules/.pnpm/@wordpress+components@32.3.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/grid/hook.mjs
function useGrid(props) {
  const {
    align,
    alignment,
    className,
    columnGap,
    columns = 2,
    gap = 3,
    isInline = false,
    justify,
    rowGap,
    rows,
    templateColumns,
    templateRows,
    ...otherProps
  } = useContextSystem(props, "Grid");
  const columnsAsArray = Array.isArray(columns) ? columns : [columns];
  const column2 = useResponsiveValue(columnsAsArray);
  const rowsAsArray = Array.isArray(rows) ? rows : [rows];
  const row = useResponsiveValue(rowsAsArray);
  const gridTemplateColumns = templateColumns || !!columns && `repeat( ${column2}, 1fr )`;
  const gridTemplateRows = templateRows || !!rows && `repeat( ${row}, 1fr )`;
  const cx2 = useCx();
  const classes = useMemo13(() => {
    const alignmentProps = getAlignmentProps(alignment);
    const gridClasses = /* @__PURE__ */ css({
      alignItems: align,
      display: isInline ? "inline-grid" : "grid",
      gap: `calc( ${config_values_default.gridBase} * ${gap} )`,
      gridTemplateColumns: gridTemplateColumns || void 0,
      gridTemplateRows: gridTemplateRows || void 0,
      gridRowGap: rowGap,
      gridColumnGap: columnGap,
      justifyContent: justify,
      verticalAlign: isInline ? "middle" : void 0,
      ...alignmentProps
    }, process.env.NODE_ENV === "production" ? "" : ";label:gridClasses;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvb2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBdURzQiIsImZpbGUiOiJob29rLnRzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuXG4vKipcbiAqIFdvcmRQcmVzcyBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgdXNlTWVtbyB9IGZyb20gJ0B3b3JkcHJlc3MvZWxlbWVudCc7XG5cbi8qKlxuICogSW50ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB0eXBlIHsgV29yZFByZXNzQ29tcG9uZW50UHJvcHMgfSBmcm9tICcuLi9jb250ZXh0JztcbmltcG9ydCB7IHVzZUNvbnRleHRTeXN0ZW0gfSBmcm9tICcuLi9jb250ZXh0JztcbmltcG9ydCB7IGdldEFsaWdubWVudFByb3BzIH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgeyB1c2VSZXNwb25zaXZlVmFsdWUgfSBmcm9tICcuLi91dGlscy91c2UtcmVzcG9uc2l2ZS12YWx1ZSc7XG5pbXBvcnQgQ09ORklHIGZyb20gJy4uL3V0aWxzL2NvbmZpZy12YWx1ZXMnO1xuaW1wb3J0IHsgdXNlQ3ggfSBmcm9tICcuLi91dGlscy9ob29rcy91c2UtY3gnO1xuaW1wb3J0IHR5cGUgeyBHcmlkUHJvcHMgfSBmcm9tICcuL3R5cGVzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdXNlR3JpZChcblx0cHJvcHM6IFdvcmRQcmVzc0NvbXBvbmVudFByb3BzPCBHcmlkUHJvcHMsICdkaXYnID5cbikge1xuXHRjb25zdCB7XG5cdFx0YWxpZ24sXG5cdFx0YWxpZ25tZW50LFxuXHRcdGNsYXNzTmFtZSxcblx0XHRjb2x1bW5HYXAsXG5cdFx0Y29sdW1ucyA9IDIsXG5cdFx0Z2FwID0gMyxcblx0XHRpc0lubGluZSA9IGZhbHNlLFxuXHRcdGp1c3RpZnksXG5cdFx0cm93R2FwLFxuXHRcdHJvd3MsXG5cdFx0dGVtcGxhdGVDb2x1bW5zLFxuXHRcdHRlbXBsYXRlUm93cyxcblx0XHQuLi5vdGhlclByb3BzXG5cdH0gPSB1c2VDb250ZXh0U3lzdGVtKCBwcm9wcywgJ0dyaWQnICk7XG5cblx0Y29uc3QgY29sdW1uc0FzQXJyYXkgPSBBcnJheS5pc0FycmF5KCBjb2x1bW5zICkgPyBjb2x1bW5zIDogWyBjb2x1bW5zIF07XG5cdGNvbnN0IGNvbHVtbiA9IHVzZVJlc3BvbnNpdmVWYWx1ZSggY29sdW1uc0FzQXJyYXkgKTtcblx0Y29uc3Qgcm93c0FzQXJyYXkgPSBBcnJheS5pc0FycmF5KCByb3dzICkgPyByb3dzIDogWyByb3dzIF07XG5cdGNvbnN0IHJvdyA9IHVzZVJlc3BvbnNpdmVWYWx1ZSggcm93c0FzQXJyYXkgKTtcblxuXHRjb25zdCBncmlkVGVtcGxhdGVDb2x1bW5zID1cblx0XHR0ZW1wbGF0ZUNvbHVtbnMgfHwgKCAhISBjb2x1bW5zICYmIGByZXBlYXQoICR7IGNvbHVtbiB9LCAxZnIgKWAgKTtcblx0Y29uc3QgZ3JpZFRlbXBsYXRlUm93cyA9XG5cdFx0dGVtcGxhdGVSb3dzIHx8ICggISEgcm93cyAmJiBgcmVwZWF0KCAkeyByb3cgfSwgMWZyIClgICk7XG5cblx0Y29uc3QgY3ggPSB1c2VDeCgpO1xuXG5cdGNvbnN0IGNsYXNzZXMgPSB1c2VNZW1vKCAoKSA9PiB7XG5cdFx0Y29uc3QgYWxpZ25tZW50UHJvcHMgPSBnZXRBbGlnbm1lbnRQcm9wcyggYWxpZ25tZW50ICk7XG5cblx0XHRjb25zdCBncmlkQ2xhc3NlcyA9IGNzcygge1xuXHRcdFx0YWxpZ25JdGVtczogYWxpZ24sXG5cdFx0XHRkaXNwbGF5OiBpc0lubGluZSA/ICdpbmxpbmUtZ3JpZCcgOiAnZ3JpZCcsXG5cdFx0XHRnYXA6IGBjYWxjKCAkeyBDT05GSUcuZ3JpZEJhc2UgfSAqICR7IGdhcCB9IClgLFxuXHRcdFx0Z3JpZFRlbXBsYXRlQ29sdW1uczogZ3JpZFRlbXBsYXRlQ29sdW1ucyB8fCB1bmRlZmluZWQsXG5cdFx0XHRncmlkVGVtcGxhdGVSb3dzOiBncmlkVGVtcGxhdGVSb3dzIHx8IHVuZGVmaW5lZCxcblx0XHRcdGdyaWRSb3dHYXA6IHJvd0dhcCxcblx0XHRcdGdyaWRDb2x1bW5HYXA6IGNvbHVtbkdhcCxcblx0XHRcdGp1c3RpZnlDb250ZW50OiBqdXN0aWZ5LFxuXHRcdFx0dmVydGljYWxBbGlnbjogaXNJbmxpbmUgPyAnbWlkZGxlJyA6IHVuZGVmaW5lZCxcblx0XHRcdC4uLmFsaWdubWVudFByb3BzLFxuXHRcdH0gKTtcblxuXHRcdHJldHVybiBjeCggZ3JpZENsYXNzZXMsIGNsYXNzTmFtZSApO1xuXHR9LCBbXG5cdFx0YWxpZ24sXG5cdFx0YWxpZ25tZW50LFxuXHRcdGNsYXNzTmFtZSxcblx0XHRjb2x1bW5HYXAsXG5cdFx0Y3gsXG5cdFx0Z2FwLFxuXHRcdGdyaWRUZW1wbGF0ZUNvbHVtbnMsXG5cdFx0Z3JpZFRlbXBsYXRlUm93cyxcblx0XHRpc0lubGluZSxcblx0XHRqdXN0aWZ5LFxuXHRcdHJvd0dhcCxcblx0XSApO1xuXG5cdHJldHVybiB7IC4uLm90aGVyUHJvcHMsIGNsYXNzTmFtZTogY2xhc3NlcyB9O1xufVxuIl19 */");
    return cx2(gridClasses, className);
  }, [align, alignment, className, columnGap, cx2, gap, gridTemplateColumns, gridTemplateRows, isInline, justify, rowGap]);
  return {
    ...otherProps,
    className: classes
  };
}

// ../../../node_modules/.pnpm/@wordpress+components@32.3.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/grid/component.mjs
import { jsx as _jsx19 } from "react/jsx-runtime";
function UnconnectedGrid(props, forwardedRef) {
  const gridProps = useGrid(props);
  return /* @__PURE__ */ _jsx19(component_default, {
    ...gridProps,
    ref: forwardedRef
  });
}
var Grid2 = contextConnect(UnconnectedGrid, "Grid");
var component_default3 = Grid2;

// src/charts/leaderboard-chart/leaderboard-chart.tsx
import { __ as __4 } from "@wordpress/i18n";
import clsx5 from "clsx";
import { useContext as useContext17, useMemo as useMemo20 } from "react";

// src/charts/leaderboard-chart/hooks/use-leaderboard-legend-items.ts
import { __ as __3 } from "@wordpress/i18n";
import { useMemo as useMemo19 } from "react";
function useLeaderboardLegendItems({
  data,
  primaryColor,
  secondaryColor,
  withComparison = false,
  withOverlayLabel = false,
  legendLabels
}) {
  const { leaderboardChart: leaderboardChartSettings } = useGlobalChartsTheme();
  const { getElementStyles } = useGlobalChartsContext();
  return useMemo19(() => {
    if (!data || data.length === 0) {
      return [];
    }
    const items = [];
    const { color: resolvedPrimaryColor } = getElementStyles({
      index: 0,
      overrideColor: primaryColor || leaderboardChartSettings.primaryColor
    });
    items.push({
      label: legendLabels?.primary || __3("Current period", "jetpack-charts"),
      color: resolvedPrimaryColor
    });
    if (withComparison && !withOverlayLabel) {
      const { color: resolvedSecondaryColor } = getElementStyles({
        index: 1,
        overrideColor: secondaryColor || leaderboardChartSettings.secondaryColor
      });
      items.push({
        label: legendLabels?.comparison || __3("Previous period", "jetpack-charts"),
        color: resolvedSecondaryColor
      });
    }
    return items;
  }, [
    data,
    primaryColor,
    secondaryColor,
    withComparison,
    legendLabels,
    leaderboardChartSettings,
    getElementStyles,
    withOverlayLabel
  ]);
}

// src/charts/leaderboard-chart/leaderboard-chart.module.scss
var leaderboard_chart_module_default = {
  "leaderboardChart": "a8ccharts-V3NYDq",
  "leaderboardChart--responsive": "a8ccharts-WHNERS",
  "leaderboardChart--loading": "a8ccharts-JQbl6A",
  "leaderboardChart__content": "a8ccharts-Ml1kKc",
  "barWithLabelContainer": "a8ccharts-ETItHW",
  "is-overlay": "a8ccharts-oA4hdH",
  "label": "a8ccharts-UciQnF",
  "bar": "a8ccharts-np8f0T",
  "bar--animated": "a8ccharts-zq3CmS",
  "stretch": "a8ccharts-D0Q3w1",
  "valueContainer": "a8ccharts-B6VcRn",
  "overlayLabel": "a8ccharts-GB7tyM",
  "emptyState": "a8ccharts-E0K4Hr"
};

// src/charts/leaderboard-chart/leaderboard-chart.tsx
import { jsx as _jsx20, Fragment as _Fragment6, jsxs as _jsxs7 } from "react/jsx-runtime";
var defaultValueFormatter = (value) => {
  return formatMetricValue(value, "number", {
    useMultipliers: true,
    decimals: 1
  });
};
var defaultDeltaFormatter = (value) => {
  return formatMetricValue(value / 100, "average", {
    decimals: 0,
    signDisplay: "exceptZero"
  });
};
var BarLabel = ({
  label
}) => /* @__PURE__ */ _jsx20(_Fragment6, {
  children: typeof label === "string" ? /* @__PURE__ */ _jsx20(component_default2, {
    className: leaderboard_chart_module_default.label,
    children: label
  }) : label
});
var BarWithLabel = ({
  entry,
  withComparison,
  withOverlayLabel,
  primaryColor,
  secondaryColor,
  animation,
  isPrimaryVisible = true,
  isComparisonVisible = true
}) => /* @__PURE__ */ _jsxs7("div", {
  className: clsx5(leaderboard_chart_module_default.barWithLabelContainer, {
    [leaderboard_chart_module_default["is-overlay"]]: withOverlayLabel
  }),
  children: [/* @__PURE__ */ _jsx20(BarLabel, {
    label: entry.label
  }), isPrimaryVisible && /* @__PURE__ */ _jsx20("div", {
    className: clsx5(leaderboard_chart_module_default.bar, {
      [leaderboard_chart_module_default["bar--animated"]]: animation
    }),
    style: {
      width: entry.currentShare + "%",
      backgroundColor: primaryColor
    }
  }), withComparison && !withOverlayLabel && isComparisonVisible && /* @__PURE__ */ _jsx20("div", {
    className: clsx5(leaderboard_chart_module_default.bar, {
      [leaderboard_chart_module_default["bar--animated"]]: animation
    }),
    style: {
      width: entry.previousShare + "%",
      backgroundColor: secondaryColor
    }
  })]
});
var LeaderboardChartInternal = ({
  data,
  chartId: providedChartId,
  width: propWidth,
  height: propHeight,
  withComparison = false,
  withOverlayLabel = false,
  primaryColor,
  secondaryColor,
  valueFormatter = defaultValueFormatter,
  deltaFormatter = defaultDeltaFormatter,
  animation,
  loading = false,
  showLegend = false,
  legend = {},
  legendLabels,
  gap = "md",
  className,
  style,
  children
}) => {
  const legendInteractive = legend.interactive ?? false;
  const legendPosition = legend.position ?? "bottom";
  const chartId = useChartId(providedChartId);
  const {
    leaderboardChart: leaderboardChartSettings
  } = useGlobalChartsTheme();
  const legendShapeStyles = {
    width: 8,
    height: 8,
    ...legend.shapeStyles
  };
  const {
    legendChildren,
    nonLegendChildren
  } = useChartChildren(children, "LeaderboardChart");
  const {
    labelSpacing,
    rowGap,
    columnGap,
    primaryColor: settingsPrimaryColor,
    secondaryColor: settingsSecondaryColor,
    deltaColors
  } = leaderboardChartSettings;
  const {
    getElementStyles,
    isSeriesVisible
  } = useGlobalChartsContext();
  const {
    color: resolvedPrimaryColor
  } = getElementStyles({
    index: 0,
    overrideColor: primaryColor || settingsPrimaryColor
  });
  const {
    color: resolvedSecondaryColor
  } = getElementStyles({
    index: 1,
    overrideColor: secondaryColor || settingsSecondaryColor
  });
  const legendItems = useLeaderboardLegendItems({
    data: data || [],
    primaryColor,
    secondaryColor,
    withComparison,
    withOverlayLabel,
    legendLabels
  });
  const isPrimaryVisible = useMemo20(() => {
    if (!chartId || !legendInteractive || legendItems.length === 0) {
      return true;
    }
    return isSeriesVisible(chartId, legendItems[0].label);
  }, [chartId, legendInteractive, legendItems, isSeriesVisible]);
  const isComparisonVisible = useMemo20(() => {
    if (!chartId || !legendInteractive || legendItems.length < 2) {
      return true;
    }
    return isSeriesVisible(chartId, legendItems[1].label);
  }, [chartId, legendInteractive, legendItems, isSeriesVisible]);
  const allSeriesHidden = useMemo20(() => {
    if (!legendInteractive) return false;
    if (withComparison && !withOverlayLabel) {
      return !isPrimaryVisible && !isComparisonVisible;
    }
    return !isPrimaryVisible;
  }, [legendInteractive, isPrimaryVisible, isComparisonVisible, withComparison, withOverlayLabel]);
  const isDataValid = Boolean(data && data.length > 0);
  const chartMetadata = useMemo20(() => ({
    withComparison,
    withOverlayLabel
  }), [withComparison, withOverlayLabel]);
  useChartRegistration({
    chartId,
    legendItems,
    chartType: "leaderboard",
    isDataValid,
    metadata: chartMetadata
  });
  const prefersReducedMotion = usePrefersReducedMotion();
  if (!data || data.length === 0) {
    return /* @__PURE__ */ _jsx20(SingleChartContext.Provider, {
      value: {
        chartId
      },
      children: /* @__PURE__ */ _jsx20(ChartLayout, {
        legendPosition,
        legendElement: false,
        legendChildren,
        className: clsx5(leaderboard_chart_module_default.leaderboardChart, {
          [leaderboard_chart_module_default["leaderboardChart--responsive"]]: !propWidth && !propHeight,
          [leaderboard_chart_module_default["leaderboardChart--loading"]]: loading
        }, className),
        gap,
        style: {
          ...style,
          width: propWidth || void 0,
          height: propHeight || void 0
        },
        trailingContent: nonLegendChildren,
        children: /* @__PURE__ */ _jsx20("div", {
          className: leaderboard_chart_module_default.emptyState,
          children: loading ? __4("Loading\u2026", "jetpack-charts") : __4("No data available", "jetpack-charts")
        })
      })
    });
  }
  const legendElement = showLegend && /* @__PURE__ */ _jsx20(Legend, {
    orientation: legend.orientation ?? "horizontal",
    position: legendPosition,
    alignment: legend.alignment ?? "center",
    labelStyles: legend.labelStyles,
    itemClassName: legend.itemClassName,
    itemStyles: legend.itemStyles,
    shape: legend.shape ?? "circle",
    shapeStyles: legendShapeStyles,
    chartId,
    interactive: legendInteractive
  });
  return /* @__PURE__ */ _jsx20(SingleChartContext.Provider, {
    value: {
      chartId
    },
    children: /* @__PURE__ */ _jsx20(ChartLayout, {
      legendPosition,
      legendElement,
      legendChildren,
      className: clsx5(leaderboard_chart_module_default.leaderboardChart, {
        [leaderboard_chart_module_default["leaderboardChart--responsive"]]: !propWidth && !propHeight,
        [leaderboard_chart_module_default["leaderboardChart--loading"]]: loading
      }, className),
      gap,
      style: {
        ...style,
        width: propWidth || void 0,
        height: propHeight || void 0
      },
      trailingContent: nonLegendChildren,
      children: /* @__PURE__ */ _jsx20("div", {
        className: leaderboard_chart_module_default.leaderboardChart__content,
        children: allSeriesHidden ? /* @__PURE__ */ _jsx20("div", {
          className: leaderboard_chart_module_default.emptyState,
          children: __4("All series are hidden. Click legend items to show data.", "jetpack-charts")
        }) : /* @__PURE__ */ _jsx20(component_default3, {
          templateColumns: "minmax(0, 1fr) auto",
          rowGap,
          columnGap,
          children: data.map((entry) => {
            const colorIndex = Math.sign(entry.delta) + 1;
            const deltaColor = deltaColors[colorIndex];
            return /* @__PURE__ */ _jsxs7(Fragment2, {
              children: [/* @__PURE__ */ _jsx20(Stack, {
                direction: "column",
                gap: labelSpacing,
                children: /* @__PURE__ */ _jsx20(BarWithLabel, {
                  entry,
                  withComparison,
                  withOverlayLabel,
                  primaryColor: resolvedPrimaryColor,
                  secondaryColor: resolvedSecondaryColor,
                  isPrimaryVisible,
                  isComparisonVisible,
                  animation: animation && !loading && !prefersReducedMotion
                })
              }), /* @__PURE__ */ _jsxs7(Stack, {
                direction: "row",
                gap: "xs",
                className: clsx5(leaderboard_chart_module_default.valueContainer, {
                  [leaderboard_chart_module_default.overlayLabel]: withOverlayLabel
                }),
                children: [isPrimaryVisible && /* @__PURE__ */ _jsx20(component_default2, {
                  children: valueFormatter(entry.currentValue)
                }), withComparison && isComparisonVisible && /* @__PURE__ */ _jsx20(component_default2, {
                  style: {
                    color: deltaColor
                  },
                  children: deltaFormatter(entry.delta)
                })]
              })]
            }, entry.id);
          })
        })
      })
    })
  });
};
var LeaderboardChartWithProvider = (props) => {
  const existingContext = useContext17(GlobalChartsContext);
  if (existingContext) {
    return /* @__PURE__ */ _jsx20(LeaderboardChartInternal, {
      ...props
    });
  }
  return /* @__PURE__ */ _jsx20(GlobalChartsProvider, {
    children: /* @__PURE__ */ _jsx20(LeaderboardChartInternal, {
      ...props
    })
  });
};
LeaderboardChartWithProvider.displayName = "LeaderboardChart";
var LeaderboardChart = attachSubComponents(LeaderboardChartWithProvider, {
  Legend
});
var LeaderboardChartResponsive = attachSubComponents(withResponsive(LeaderboardChartWithProvider), {
  Legend
});

// src/charts/line-chart/line-chart.tsx
import { formatNumberCompact as formatNumberCompact4, formatNumber as formatNumber6 } from "@automattic/number-formatters";
import { curveCatmullRom, curveLinear, curveMonotoneX } from "@visx/curve";
import { LinearGradient } from "@visx/gradient";
import { scaleTime } from "@visx/scale";
import { XYChart as XYChart2, AreaSeries, Grid as Grid3, Axis as Axis2, DataContext as DataContext6 } from "@visx/xychart";
import { __ as __6 } from "@wordpress/i18n";
import clsx7 from "clsx";
import { differenceInHours, differenceInYears } from "date-fns";
import { useMemo as useMemo22, useContext as useContext21, forwardRef as forwardRef6, useImperativeHandle as useImperativeHandle2, useState as useState11, useRef as useRef12, useCallback as useCallback12, createElement as _createElement2 } from "react";

// src/charts/private/default-glyph/default-glyph.tsx
import { DataContext as DataContext2 } from "@visx/xychart";
import { useContext as useContext18 } from "react";
import { jsx as _jsx21 } from "react/jsx-runtime";
var DefaultGlyph = (props) => {
  const {
    theme
  } = useContext18(DataContext2) || {};
  const position2 = props.position || "start";
  return /* @__PURE__ */ _jsx21("circle", {
    cx: props.x,
    cy: props.y,
    r: props.size,
    fill: props.color,
    stroke: theme?.backgroundColor,
    strokeWidth: 1.5,
    paintOrder: "fill",
    ...props.glyphStyle
  });
};

// src/charts/line-chart/line-chart.module.scss
var line_chart_module_default = {
  "line-chart": "a8ccharts-v-oO8E",
  "line-chart--animated": "a8ccharts-QrkuTW",
  "rise": "a8ccharts--rxDU3",
  "line-chart__tooltip": "a8ccharts-Tu0rR-",
  "line-chart__annotation-label-popover": "a8ccharts--RSWXi",
  "line-chart__tooltip-date": "a8ccharts-Q-b5A1",
  "line-chart__tooltip-row": "a8ccharts-19N7T9",
  "line-chart__tooltip-label": "a8ccharts-HOAXrD",
  "line-chart__annotations-overlay": "a8ccharts-rQiY8O",
  "line-chart__annotation-label": "a8ccharts-8AKWOe",
  "line-chart__annotation-label-trigger-button": "a8ccharts-7mh3Cl",
  "line-chart__annotation-label-popover--visible": "a8ccharts-VAeVuJ",
  "line-chart__annotation-label-popover--safari": "a8ccharts-TEe-iV",
  "line-chart__annotation-label-popover-header": "a8ccharts-LAUpx7",
  "line-chart__annotation-label-popover-content": "a8ccharts-b76gEu",
  "line-chart__annotation-label-popover-close-button": "a8ccharts-LIpFoS"
};

// src/charts/line-chart/private/line-chart-annotation-label-popover.tsx
import { __ as __5 } from "@wordpress/i18n";
import clsx6 from "clsx";
import Gridicon from "gridicons";
import { useEffect as useEffect9, useId as useId3, useRef as useRef10, useState as useState8 } from "react";
import { jsx as _jsx22, jsxs as _jsxs8 } from "react/jsx-runtime";
var POPOVER_BUTTON_SIZE = 44;
var LineChartAnnotationLabelWithPopover = ({
  title,
  subtitle,
  renderLabel,
  renderLabelPopover
}) => {
  const popoverId = useId3();
  const buttonRef = useRef10(null);
  const popoverRef = useRef10(null);
  const [isPositioned, setIsPositioned] = useState8(false);
  const isBrowserSafari = isSafari();
  useEffect9(() => {
    const button = buttonRef.current;
    const popover = popoverRef.current;
    if (!button || !popover) return;
    const positionPopover = () => {
      if (!isBrowserSafari) {
        const buttonRect = button.getBoundingClientRect();
        popover.style.left = `${buttonRect.right}px`;
        popover.style.top = `${buttonRect.top}px`;
      }
      setIsPositioned(true);
    };
    popover.addEventListener("toggle", (e2) => {
      if (e2.newState === "open") {
        positionPopover();
      }
    });
    try {
      if (popover.matches(":popover-open")) {
        positionPopover();
      }
    } catch {
    }
  }, [isBrowserSafari]);
  return /* @__PURE__ */ _jsxs8("div", {
    className: line_chart_module_default["line-chart__annotation-label"],
    children: [/* @__PURE__ */ _jsx22("button", {
      ref: buttonRef,
      popovertarget: popoverId,
      className: line_chart_module_default["line-chart__annotation-label-trigger-button"],
      style: {
        width: `${POPOVER_BUTTON_SIZE}px`,
        height: `${POPOVER_BUTTON_SIZE}px`,
        transform: `translate(${POPOVER_BUTTON_SIZE / 2}px, 0)`
      },
      "aria-label": title || __5("View details", "jetpack-charts"),
      children: renderLabel({
        title,
        subtitle
      })
    }), /* @__PURE__ */ _jsx22("div", {
      ref: popoverRef,
      id: popoverId,
      popover: "auto",
      className: clsx6(line_chart_module_default["line-chart__annotation-label-popover"], isPositioned && line_chart_module_default["line-chart__annotation-label-popover--visible"], isBrowserSafari && line_chart_module_default["line-chart__annotation-label-popover--safari"]),
      children: /* @__PURE__ */ _jsxs8("div", {
        className: line_chart_module_default["line-chart__annotation-label-popover-header"],
        children: [/* @__PURE__ */ _jsx22("div", {
          className: line_chart_module_default["line-chart__annotation-label-popover-content"],
          children: renderLabelPopover({
            title,
            subtitle
          })
        }), /* @__PURE__ */ _jsx22("button", {
          popovertarget: popoverId,
          popovertargetaction: "hide",
          className: line_chart_module_default["line-chart__annotation-label-popover-close-button"],
          "aria-label": __5("Close", "jetpack-charts"),
          children: /* @__PURE__ */ _jsx22(Gridicon, {
            icon: "cross",
            size: 16
          })
        })]
      })
    })]
  });
};
var line_chart_annotation_label_popover_default = LineChartAnnotationLabelWithPopover;

// src/charts/line-chart/private/line-chart-annotations-overlay.tsx
import { DataContext as DataContext3 } from "@visx/xychart";
import { useEffect as useEffect10, useState as useState9, useCallback as useCallback11 } from "react";
import { jsx as _jsx23 } from "react/jsx-runtime";
var LineChartAnnotationsOverlay = ({
  children
}) => {
  const {
    chartRef,
    chartWidth,
    chartHeight
  } = useSingleChartContext();
  const [scales, setScales] = useState9(null);
  const [scalesStable, setScalesStable] = useState9(false);
  const createScaleSignature = useCallback11((scaleData) => {
    const xDomain = scaleData.xScale.domain();
    const yDomain = scaleData.yScale.domain();
    const xRange = scaleData.xScale.range();
    const yRange = scaleData.yScale.range();
    return `${xDomain.join(",")}-${yDomain.join(",")}-${xRange.join(",")}-${yRange.join(",")}`;
  }, []);
  const getScalesData = useCallback11(() => {
    if (chartRef?.current) {
      const scaleData = chartRef.current.getScales();
      if (scaleData) {
        const scaleInfo = {
          xScale: scaleData.xScale,
          yScale: scaleData.yScale
        };
        return {
          scales: scaleInfo,
          signature: createScaleSignature(scaleInfo)
        };
      }
    }
    return null;
  }, [chartRef, createScaleSignature]);
  useEffect10(() => {
    let timeoutId = null;
    let lastSignature = null;
    let retryCount = 0;
    const maxRetries = 20;
    const checkInterval = 50;
    setScalesStable(false);
    const monitorScales = () => {
      const currentScaleData = getScalesData();
      if (currentScaleData) {
        const scalesSettled = lastSignature && currentScaleData.signature === lastSignature;
        if (scalesSettled) {
          setScalesStable(true);
          return;
        }
        setScales(currentScaleData.scales);
        lastSignature = currentScaleData.signature;
      }
      if (retryCount < maxRetries) {
        retryCount++;
        timeoutId = setTimeout(monitorScales, checkInterval);
      }
    };
    monitorScales();
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [getScalesData, chartWidth, chartHeight]);
  if (!chartRef || !children || !chartWidth || !chartHeight) {
    return null;
  }
  if (!scales || !scalesStable) {
    return null;
  }
  const dataContextValue = {
    xScale: scales.xScale,
    yScale: scales.yScale,
    margin: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    },
    width: chartWidth,
    height: chartHeight
  };
  return /* @__PURE__ */ _jsx23(DataContext3.Provider, {
    value: dataContextValue,
    children: /* @__PURE__ */ _jsx23("svg", {
      width: chartWidth,
      height: chartHeight,
      className: line_chart_module_default["line-chart__annotations-overlay"],
      children
    })
  });
};
var line_chart_annotations_overlay_default = LineChartAnnotationsOverlay;

// src/charts/line-chart/private/line-chart-annotation.tsx
import { Annotation, CircleSubject, Connector, HtmlLabel, Label, LineSubject } from "@visx/annotation";
import { DataContext as DataContext4 } from "@visx/xychart";
import merge3 from "deepmerge";
import { useContext as useContext19, useRef as useRef11, useEffect as useEffect11, useState as useState10, useMemo as useMemo21 } from "react";
import { jsx as _jsx24, jsxs as _jsxs9 } from "react/jsx-runtime";
var ANNOTATION_MAX_WIDTH = 125;
var ANNOTATION_INIT_HEIGHT = 100;
var getLabelPosition = ({
  subjectType,
  x: x2,
  xMax,
  y: y2,
  yMin,
  yMax,
  maxWidth,
  height
}) => {
  const annotationMaxWidth = maxWidth ?? ANNOTATION_MAX_WIDTH;
  const annotationHeight = height ?? ANNOTATION_INIT_HEIGHT;
  let dx = 15;
  let dy = 15;
  let isFlippedHorizontally = false;
  let isFlippedVertically = false;
  if (subjectType === "line-horizontal") {
    dx = 0;
    dy = 20;
  }
  if (subjectType === "line-vertical") {
    dx = 20;
    dy = 0;
  }
  const effectiveX = x2 + dx;
  if (effectiveX + annotationMaxWidth > xMax) {
    isFlippedHorizontally = true;
    if (subjectType === "circle") {
      dx = -dx;
    } else if (subjectType === "line-vertical") {
      dx = -20;
    }
  }
  if (subjectType === "circle") {
    if (y2 + dy + annotationHeight > yMin) {
      isFlippedVertically = true;
      dy = -Math.abs(dy);
    }
  } else if (y2 - annotationHeight < yMax) {
    if (subjectType === "line-horizontal") {
      isFlippedVertically = true;
      dy = Math.abs(dy);
    } else if (subjectType === "line-vertical") {
      isFlippedVertically = true;
    }
  } else if (y2 + annotationHeight > yMin) {
    if (subjectType === "line-horizontal") {
      isFlippedVertically = true;
      dy = -Math.abs(dy);
    } else if (subjectType === "line-vertical") {
      isFlippedVertically = true;
    }
  }
  return {
    dx,
    dy,
    isFlippedHorizontally,
    isFlippedVertically
  };
};
var getHorizontalAnchor = (subjectType, isFlippedHorizontally) => {
  if (subjectType === "line-horizontal") {
    return isFlippedHorizontally ? "end" : "start";
  }
  return void 0;
};
var getVerticalAnchor = (subjectType, isFlippedVertically, y2, yMax, height) => {
  if (subjectType === "line-vertical") {
    if (isFlippedVertically) {
      return y2 - height < yMax ? "start" : "end";
    }
    return "start";
  }
  return void 0;
};
var LineChartAnnotation = ({
  datum,
  title,
  subtitle,
  subjectType = "circle",
  styles: datumStyles,
  testId,
  renderLabel,
  renderLabelPopover
}) => {
  const providerTheme = useGlobalChartsTheme();
  const {
    xScale,
    yScale
  } = useContext19(DataContext4) || {};
  const labelRef = useRef11(null);
  const [height, setHeight] = useState10(null);
  const styles = merge3(providerTheme.annotationStyles ?? {}, datumStyles ?? {});
  useEffect11(() => {
    if (labelRef.current?.getBBox) {
      const bbox = labelRef.current.getBBox();
      setHeight(bbox.height);
    }
  }, []);
  const positionData = useMemo21(() => {
    if (!datum || !datum.date || datum.value == null || !xScale || !yScale) return null;
    const x3 = xScale(datum.date);
    const y3 = yScale(datum.value);
    if (typeof x3 !== "number" || typeof y3 !== "number") return null;
    const [yMin2, yMax2] = yScale.range().map(Number);
    const [xMin2, xMax2] = xScale.range().map(Number);
    if (renderLabel) {
      return {
        x: x3,
        dx: 0,
        y: y3,
        dy: 0,
        yMin: yMin2,
        yMax: yMax2,
        xMin: xMin2,
        xMax: xMax2,
        isFlippedHorizontally: false,
        isFlippedVertically: false
      };
    }
    const position2 = getLabelPosition({
      subjectType,
      x: x3,
      xMax: xMax2,
      y: y3,
      yMin: yMin2,
      yMax: yMax2,
      maxWidth: styles?.label?.maxWidth,
      height
    });
    return {
      x: x3,
      y: y3,
      yMin: yMin2,
      yMax: yMax2,
      xMin: xMin2,
      xMax: xMax2,
      ...position2
    };
  }, [datum, xScale, yScale, subjectType, styles?.label?.maxWidth, height, renderLabel]);
  if (!positionData) return null;
  const {
    x: x2,
    y: y2,
    yMin,
    yMax,
    xMin,
    xMax,
    dx,
    dy,
    isFlippedHorizontally,
    isFlippedVertically
  } = positionData;
  const getLabelY = () => {
    const labelY = styles?.label?.y;
    if (labelY === "start") return yMax;
    if (labelY === "end") return yMin;
    return labelY;
  };
  const getLabelX = () => {
    const labelX = styles?.label?.x;
    if (labelX === "start") return xMin;
    if (labelX === "end") return xMax;
    return labelX;
  };
  const labelPosition = {
    x: getLabelX(),
    y: getLabelY()
  };
  const getSafariHTMLLabelPosition = () => {
    const labelWidth = POPOVER_BUTTON_SIZE;
    const labelHeight = POPOVER_BUTTON_SIZE;
    return isSafari() ? {
      transform: `translate(${x2 + (dx || 0) + (typeof labelPosition.x === "number" ? labelPosition.x - x2 : 0) - labelWidth}px, ${y2 + (dy || 0) + (typeof labelPosition.y === "number" ? labelPosition.y - y2 : 0) - labelHeight}px)`,
      width: labelWidth,
      height: labelHeight
    } : void 0;
  };
  return /* @__PURE__ */ _jsx24("g", {
    children: /* @__PURE__ */ _jsxs9(Annotation, {
      x: x2,
      y: y2,
      dx,
      dy,
      children: [/* @__PURE__ */ _jsx24(Connector, {
        ...styles?.connector
      }), subjectType === "circle" && /* @__PURE__ */ _jsx24(CircleSubject, {
        ...styles?.circleSubject
      }), subjectType === "line-vertical" && /* @__PURE__ */ _jsx24(LineSubject, {
        min: yMax,
        max: yMin,
        ...styles?.lineSubject,
        orientation: "vertical"
      }), subjectType === "line-horizontal" && /* @__PURE__ */ _jsx24(LineSubject, {
        min: xMin,
        max: xMax,
        ...styles?.lineSubject,
        orientation: "horizontal"
      }), renderLabel ? /* @__PURE__ */ _jsx24(HtmlLabel, {
        ...styles?.label,
        ...labelPosition,
        children: /* @__PURE__ */ _jsx24("div", {
          style: getSafariHTMLLabelPosition(),
          children: renderLabelPopover ? /* @__PURE__ */ _jsx24(line_chart_annotation_label_popover_default, {
            title,
            subtitle,
            renderLabel,
            renderLabelPopover
          }) : renderLabel({
            title,
            subtitle
          })
        })
      }) : /* @__PURE__ */ _jsx24("g", {
        ref: labelRef,
        children: /* @__PURE__ */ _jsx24(Label, {
          title,
          subtitle,
          ...styles?.label,
          ...labelPosition,
          horizontalAnchor: getHorizontalAnchor(subjectType, isFlippedHorizontally),
          verticalAnchor: getVerticalAnchor(subjectType, isFlippedVertically, y2, yMax, height ?? ANNOTATION_INIT_HEIGHT)
        })
      })]
    })
  });
};
var line_chart_annotation_default = LineChartAnnotation;

// src/charts/line-chart/private/line-chart-glyph.tsx
import { DataContext as DataContext5 } from "@visx/xychart";
import { useContext as useContext20 } from "react";
var toNumber = (val) => {
  const num = typeof val === "number" ? val : parseFloat(val);
  return isNaN(num) ? void 0 : num;
};
var LineChartGlyph = ({
  data,
  index,
  color,
  glyphStyle,
  renderGlyph,
  accessors,
  position: position2
}) => {
  const {
    xScale,
    yScale
  } = useContext20(DataContext5) || {};
  if (!xScale || !yScale) return null;
  if (data.data.length === 0) return null;
  const point = position2 === "start" ? data.data[0] : data.data[data.data.length - 1];
  const x2 = xScale(accessors.xAccessor(point));
  const y2 = yScale(accessors.yAccessor(point));
  if (typeof x2 !== "number" || typeof y2 !== "number") return null;
  const size = Math.max(0, toNumber(glyphStyle?.radius) ?? 4);
  return renderGlyph({
    key: `${position2}-glyph-${data.label}`,
    index,
    datum: point,
    color,
    size,
    x: x2,
    y: y2,
    glyphStyle,
    position: position2
  });
};
var line_chart_glyph_default = LineChartGlyph;

// src/charts/line-chart/line-chart.tsx
import { jsx as _jsx25, jsxs as _jsxs10 } from "react/jsx-runtime";
var X_TICK_WIDTH = 60;
var defaultRenderGlyph = (props) => {
  return /* @__PURE__ */ _createElement2(DefaultGlyph, {
    ...props,
    key: props.key
  });
};
var toNumber2 = (val) => {
  const num = typeof val === "number" ? val : parseFloat(val);
  return isNaN(num) ? void 0 : num;
};
var getCurveType = (type, smoothing) => {
  if (!type) {
    return smoothing ? curveCatmullRom : curveLinear;
  }
  switch (type) {
    case "smooth":
      return curveCatmullRom;
    case "monotone":
      return curveMonotoneX;
    case "linear":
      return curveLinear;
    default:
      return curveLinear;
  }
};
var renderDefaultTooltip = (params) => {
  const {
    tooltipData
  } = params;
  const nearestDatum = tooltipData?.nearestDatum?.datum;
  if (!nearestDatum) return null;
  const tooltipPoints = Object.entries(tooltipData?.datumByKey || {}).map(([key, {
    datum
  }]) => ({
    key,
    value: datum.value
  })).sort((a2, b2) => b2.value - a2.value);
  return /* @__PURE__ */ _jsxs10("div", {
    className: line_chart_module_default["line-chart__tooltip"],
    children: [/* @__PURE__ */ _jsx25("div", {
      className: line_chart_module_default["line-chart__tooltip-date"],
      children: nearestDatum.date?.toLocaleDateString()
    }), tooltipPoints.map((point) => /* @__PURE__ */ _jsxs10("div", {
      className: line_chart_module_default["line-chart__tooltip-row"],
      children: [/* @__PURE__ */ _jsxs10("span", {
        className: line_chart_module_default["line-chart__tooltip-label"],
        children: [point.key, ":"]
      }), /* @__PURE__ */ _jsx25("span", {
        className: line_chart_module_default["line-chart__tooltip-value"],
        children: formatNumber6(point.value)
      })]
    }, point.key))]
  });
};
var formatYearTick = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString(void 0, {
    year: "numeric"
  });
};
var formatDateTick2 = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString(void 0, {
    month: "short",
    day: "numeric"
  });
};
var formatHourTick = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString(void 0, {
    hour: "numeric",
    hour12: true
  });
};
var getFormatter = (sortedData) => {
  const minX = Math.min(...sortedData.map((datom) => datom.data.at(0)?.date));
  const maxX = Math.max(...sortedData.map((datom) => datom.data.at(-1)?.date));
  const diffInHours = Math.abs(differenceInHours(maxX, minX));
  if (diffInHours <= 24) {
    return formatHourTick;
  }
  const diffInYears = Math.abs(differenceInYears(maxX, minX));
  if (diffInYears <= 1) {
    return formatDateTick2;
  }
  return formatYearTick;
};
var guessOptimalNumTicks = (data, chartWidth, tickFormatter) => {
  const minX = Math.min(...data.map((datom) => datom.data.at(0)?.date));
  const maxX = Math.max(...data.map((datom) => datom.data.at(-1)?.date));
  const xScale = scaleTime({
    domain: [minX, maxX]
  });
  const upperBound = Math.min(
    data[0]?.data.length || 3,
    // A sane fallback to avoid NaN when no data is present
    Math.ceil(chartWidth / X_TICK_WIDTH)
  );
  let secondBestGuess = 1;
  for (let numTicks = upperBound; numTicks > 1; --numTicks) {
    const ticks = xScale.ticks(numTicks).map((d2) => tickFormatter(d2.getTime()));
    if (ticks.length > upperBound) {
      continue;
    }
    secondBestGuess = Math.max(secondBestGuess, ticks.length);
    const uniqueTicks = Array.from(new Set(ticks));
    if (uniqueTicks.length === 1) {
      return 1;
    }
    const hasConsecutiveDuplicate = ticks.some((tick, idx) => idx > 0 && tick === ticks[idx - 1]);
    if (hasConsecutiveDuplicate) {
      continue;
    }
    return ticks.length;
  }
  return secondBestGuess;
};
var validateData2 = (data) => {
  if (!data?.length) return "No data available";
  const hasInvalidData = data.some((series) => series.data.some((point) => isNaN(point.value) || point.value === null || point.value === void 0 || "date" in point && point.date && isNaN(point.date.getTime())));
  if (hasInvalidData) return "Invalid data";
  return null;
};
var LineChartScalesRef = ({
  chartRef,
  width,
  height,
  margin
}) => {
  const context = useContext21(DataContext6);
  useImperativeHandle2(chartRef, () => ({
    getScales: () => {
      if (!context?.xScale || !context?.yScale) {
        return null;
      }
      return {
        xScale: context.xScale,
        yScale: context.yScale
      };
    },
    getChartDimensions: () => ({
      width,
      height,
      margin: margin || {}
    })
  }), [context, width, height, margin]);
  return null;
};
var LineChartInternal = /* @__PURE__ */ forwardRef6(({
  data,
  chartId: providedChartId,
  width,
  height,
  className,
  margin,
  withTooltips = true,
  withTooltipCrosshairs,
  showLegend = false,
  legend = {},
  renderGlyph = defaultRenderGlyph,
  glyphStyle = {},
  withLegendGlyph = false,
  withGradientFill = false,
  smoothing = true,
  curveType,
  renderTooltip = renderDefaultTooltip,
  withStartGlyphs = false,
  withEndGlyphs = false,
  animation,
  options = {},
  onPointerDown = void 0,
  onPointerUp = void 0,
  onPointerMove = void 0,
  onPointerOut = void 0,
  children,
  gridVisibility,
  gap = "md"
}, ref) => {
  const legendInteractive = legend.interactive ?? false;
  const legendShape = legend.shape ?? "line";
  const legendPosition = legend.position ?? "bottom";
  const providerTheme = useGlobalChartsTheme();
  const theme = useXYChartTheme(data);
  const chartId = useChartId(providedChartId);
  const chartRef = useRef12(null);
  const [selectedIndex, setSelectedIndex] = useState11(void 0);
  const [isNavigating, setIsNavigating] = useState11(false);
  const internalChartRef = useRef12(null);
  const {
    legendChildren,
    nonLegendChildren
  } = useChartChildren(children, "LineChart");
  const [measuredChartHeight, setMeasuredChartHeight] = useState11();
  const handleContentHeightChange = useCallback12((contentHeight) => {
    const chartHeight = contentHeight > 0 ? contentHeight : height;
    setMeasuredChartHeight(chartHeight);
  }, [height]);
  useImperativeHandle2(ref, () => ({
    getScales: () => internalChartRef.current?.getScales() || null,
    getChartDimensions: () => internalChartRef.current?.getChartDimensions() || {
      width: 0,
      height: 0,
      margin: {}
    }
  }), [internalChartRef]);
  const dataSorted = useChartDataTransform(data);
  const {
    getElementStyles,
    isSeriesVisible
  } = useGlobalChartsContext();
  const seriesWithVisibility = useMemo22(() => {
    if (!chartId || !legendInteractive) {
      return dataSorted.map((series, index) => ({
        series,
        index,
        isVisible: true
      }));
    }
    return dataSorted.map((series, index) => ({
      series,
      index,
      isVisible: isSeriesVisible(chartId, series.label)
    }));
  }, [dataSorted, chartId, isSeriesVisible, legendInteractive]);
  const allSeriesHidden = useMemo22(() => {
    return seriesWithVisibility.every(({
      isVisible
    }) => !isVisible);
  }, [seriesWithVisibility]);
  const {
    tooltipRef,
    onChartFocus,
    onChartBlur,
    onChartKeyDown
  } = useKeyboardNavigation({
    selectedIndex,
    setSelectedIndex,
    isNavigating,
    setIsNavigating,
    chartRef,
    totalPoints: dataSorted[0]?.data.length || 0
  });
  const chartOptions = useMemo22(() => {
    const formatter = options?.axis?.x?.tickFormat || getFormatter(dataSorted);
    return {
      axis: {
        x: {
          orientation: "bottom",
          numTicks: guessOptimalNumTicks(dataSorted, width, formatter),
          tickFormat: formatter,
          display: true,
          ...options?.axis?.x
        },
        y: {
          orientation: "left",
          numTicks: 4,
          tickFormat: formatNumberCompact4,
          display: true,
          ...options?.axis?.y
        }
      },
      xScale: {
        type: "time",
        ...options?.xScale
      },
      yScale: {
        type: "linear",
        nice: true,
        zero: false,
        ...options?.yScale
      }
    };
  }, [options, dataSorted, width]);
  const tooltipRenderGlyph = useMemo22(() => {
    return (props) => {
      const seriesIndex = dataSorted.findIndex((series) => series.label === props.key || series.data.includes(props.datum));
      const seriesData = dataSorted[seriesIndex];
      const {
        color,
        glyph: themeGlyph
      } = getElementStyles({
        data: seriesData,
        index: seriesIndex
      });
      const propsWithResolvedColor = {
        ...props,
        color
      };
      return themeGlyph ? themeGlyph(propsWithResolvedColor) : renderGlyph(propsWithResolvedColor);
    };
  }, [dataSorted, renderGlyph, getElementStyles]);
  const defaultMargin = useChartMargin(height, chartOptions, dataSorted, theme);
  const error = validateData2(dataSorted);
  const isDataValid = !error;
  const legendOptions = useMemo22(() => ({
    withGlyph: withLegendGlyph,
    glyphSize: Math.max(0, toNumber2(glyphStyle?.radius) ?? 4),
    renderGlyph
  }), [withLegendGlyph, glyphStyle?.radius, renderGlyph]);
  const legendItems = useChartLegendItems(dataSorted, legendOptions, legendShape);
  const chartMetadata = useMemo22(() => ({
    withGradientFill,
    smoothing,
    curveType,
    withStartGlyphs,
    withEndGlyphs,
    withLegendGlyph
  }), [withGradientFill, smoothing, curveType, withStartGlyphs, withEndGlyphs, withLegendGlyph]);
  useChartRegistration({
    chartId,
    legendItems,
    chartType: "line",
    isDataValid,
    metadata: chartMetadata
  });
  const prefersReducedMotion = usePrefersReducedMotion();
  const accessors = {
    xAccessor: (d2) => d2?.date,
    yAccessor: (d2) => d2?.value
  };
  if (error) {
    return /* @__PURE__ */ _jsx25("div", {
      className: clsx7("line-chart", line_chart_module_default["line-chart"]),
      children: error
    });
  }
  const legendElement = showLegend && /* @__PURE__ */ _jsx25(Legend, {
    orientation: legend.orientation ?? "horizontal",
    alignment: legend.alignment ?? "center",
    position: legendPosition,
    labelStyles: legend.labelStyles,
    itemClassName: legend.itemClassName,
    itemStyles: legend.itemStyles,
    shapeStyles: legend.shapeStyles,
    className: line_chart_module_default["line-chart__legend"],
    shape: legendShape,
    chartId,
    interactive: legendInteractive
  });
  return /* @__PURE__ */ _jsx25(SingleChartContext.Provider, {
    value: {
      chartId,
      chartRef: internalChartRef,
      chartWidth: width,
      chartHeight: measuredChartHeight || 0
    },
    children: /* @__PURE__ */ _jsx25(ChartLayout, {
      legendPosition,
      legendElement,
      legendChildren,
      gap,
      className: clsx7("line-chart", line_chart_module_default["line-chart"], {
        [line_chart_module_default["line-chart--animated"]]: animation && !prefersReducedMotion
      }, className),
      style: {
        width,
        height
      },
      trailingContent: nonLegendChildren,
      onContentHeightChange: handleContentHeightChange,
      children: ({
        contentHeight
      }) => {
        const chartHeight = contentHeight > 0 ? contentHeight : height;
        return /* @__PURE__ */ _jsx25("div", {
          role: "grid",
          "aria-label": __6("Line chart", "jetpack-charts"),
          tabIndex: 0,
          onKeyDown: onChartKeyDown,
          onFocus: onChartFocus,
          onBlur: onChartBlur,
          children: chartHeight > 0 && /* @__PURE__ */ _jsx25("div", {
            ref: chartRef,
            children: /* @__PURE__ */ _jsxs10(XYChart2, {
              theme,
              width,
              height: chartHeight,
              margin: {
                ...defaultMargin,
                ...margin
              },
              xScale: chartOptions.xScale,
              yScale: chartOptions.yScale,
              onPointerDown,
              onPointerUp,
              onPointerMove,
              onPointerOut,
              pointerEventsDataKey: "nearest",
              children: [gridVisibility !== "none" && /* @__PURE__ */ _jsx25(Grid3, {
                columns: false,
                numTicks: 4
              }), chartOptions.axis.x.display && /* @__PURE__ */ _jsx25(Axis2, {
                ...chartOptions.axis.x
              }), chartOptions.axis.y.display && /* @__PURE__ */ _jsx25(Axis2, {
                ...chartOptions.axis.y
              }), allSeriesHidden ? /* @__PURE__ */ _jsx25(SvgEmptyState, {
                x: width / 2,
                y: chartHeight / 2,
                width,
                height: chartHeight,
                children: __6("All series are hidden. Click legend items to show data.", "jetpack-charts")
              }) : null, seriesWithVisibility.map(({
                series: seriesData,
                index,
                isVisible
              }) => {
                if (!isVisible) {
                  return null;
                }
                const {
                  color,
                  lineStyles,
                  glyph
                } = getElementStyles({
                  data: seriesData,
                  index
                });
                const lineProps = {
                  stroke: color,
                  ...lineStyles
                };
                return /* @__PURE__ */ _jsxs10("g", {
                  children: [withGradientFill && /* @__PURE__ */ _jsx25(LinearGradient, {
                    id: `area-gradient-${chartId}-${index + 1}`,
                    from: color,
                    fromOpacity: 0.4,
                    toOpacity: 0.1,
                    to: providerTheme.backgroundColor,
                    ...seriesData.options?.gradient,
                    children: seriesData.options?.gradient?.stops?.map((stop, stopIndex) => /* @__PURE__ */ _jsx25("stop", {
                      offset: stop.offset,
                      stopColor: stop.color || color,
                      stopOpacity: stop.opacity ?? 1
                    }, `${stop.offset}-${stop.color || color}`))
                  }), /* @__PURE__ */ _jsx25(AreaSeries, {
                    dataKey: seriesData?.label,
                    data: seriesData.data,
                    ...accessors,
                    fill: withGradientFill ? `url(#area-gradient-${chartId}-${index + 1})` : "transparent",
                    renderLine: true,
                    curve: getCurveType(curveType, smoothing),
                    lineProps
                  }, seriesData?.label), withStartGlyphs && /* @__PURE__ */ _jsx25(line_chart_glyph_default, {
                    index,
                    data: seriesData,
                    color,
                    renderGlyph: glyph ?? renderGlyph,
                    accessors,
                    glyphStyle,
                    position: "start"
                  }), withEndGlyphs && /* @__PURE__ */ _jsx25(line_chart_glyph_default, {
                    index,
                    data: seriesData,
                    color,
                    renderGlyph: glyph ?? renderGlyph,
                    accessors,
                    glyphStyle,
                    position: "end"
                  })]
                }, seriesData?.label || index);
              }), withTooltips && /* @__PURE__ */ _jsx25(AccessibleTooltip, {
                detectBounds: true,
                snapTooltipToDatumX: true,
                snapTooltipToDatumY: true,
                showSeriesGlyphs: true,
                renderTooltip,
                renderGlyph: tooltipRenderGlyph,
                glyphStyle,
                showVerticalCrosshair: withTooltipCrosshairs?.showVertical,
                showHorizontalCrosshair: withTooltipCrosshairs?.showHorizontal,
                selectedIndex,
                tooltipRef,
                keyboardFocusedClassName: line_chart_module_default["line-chart__tooltip--keyboard-focused"],
                series: dataSorted
              }), /* @__PURE__ */ _jsx25(LineChartScalesRef, {
                chartRef: internalChartRef,
                width,
                height,
                margin
              })]
            })
          })
        });
      }
    })
  });
});
var LineChartWithProvider = /* @__PURE__ */ forwardRef6((props, ref) => {
  const existingContext = useContext21(GlobalChartsContext);
  if (existingContext) {
    return /* @__PURE__ */ _jsx25(LineChartInternal, {
      ...props,
      ref
    });
  }
  return /* @__PURE__ */ _jsx25(GlobalChartsProvider, {
    children: /* @__PURE__ */ _jsx25(LineChartInternal, {
      ...props,
      ref
    })
  });
});
LineChartWithProvider.displayName = "LineChart";
var LineChart = attachSubComponents(LineChartWithProvider, {
  Legend,
  AnnotationsOverlay: line_chart_annotations_overlay_default,
  Annotation: line_chart_annotation_default
});
var LineChartResponsive = attachSubComponents(withResponsive(LineChartWithProvider), {
  Legend,
  AnnotationsOverlay: line_chart_annotations_overlay_default,
  Annotation: line_chart_annotation_default
});

// src/charts/pie-chart/pie-chart.tsx
import { Group as Group4 } from "@visx/group";
import { Pie } from "@visx/shape";
import { useTooltip as useTooltip3, useTooltipInPortal as useTooltipInPortal2 } from "@visx/tooltip";
import { __ as __7 } from "@wordpress/i18n";
import clsx8 from "clsx";
import { useCallback as useCallback13, useContext as useContext22, useMemo as useMemo23 } from "react";

// src/charts/private/radial-wipe-animation/radial-wipe-animation.tsx
import { jsx as _jsx26 } from "react/jsx-runtime";
function RadialWipeAnimation({
  id,
  radius,
  innerRadius = 0,
  durationMs = 1e3,
  wipePercentage = 100,
  direction = "clockwise",
  startAngle = "-90deg"
}) {
  const strokeWidth = (radius - innerRadius) * 2 + // The stroke is centered on the circumference, so we need to double the width.
  1;
  const scaleY = direction === "clockwise" ? -1 : 1;
  const isValidWipePercentage = 0 < wipePercentage && wipePercentage <= 100;
  const animationDuration = `${// If wipePercentage is invalid, set animation duration to 0 to disable animation.
  isValidWipePercentage ? durationMs * (100 / wipePercentage) : 0}ms`;
  return /* @__PURE__ */ _jsx26("mask", {
    id,
    children: /* @__PURE__ */ _jsx26("circle", {
      cx: 0,
      cy: 0,
      r: radius,
      pathLength: "100",
      fill: "white",
      stroke: "black",
      strokeWidth,
      strokeDasharray: "100, 1000",
      strokeDashoffset: "0",
      style: {
        transform: `rotate(${startAngle}) scaleY(${scaleY})`
      },
      children: /* @__PURE__ */ _jsx26("animate", {
        attributeName: "stroke-dashoffset",
        from: "0",
        to: "100.1",
        dur: animationDuration,
        fill: "freeze",
        calcMode: "spline",
        keySplines: "0.42 0 0.58 1;0 0 1 1",
        keyTimes: `0;${wipePercentage / 100};1`
      })
    })
  });
}
var radial_wipe_animation_default = RadialWipeAnimation;

// src/charts/pie-chart/pie-chart.module.scss
var pie_chart_module_default = {
  "pie-chart": "a8ccharts-C-n-Gu",
  "pie-chart--responsive": "a8ccharts-IQVR6j",
  "pie-chart__centering": "a8ccharts-eGV3AE"
};

// src/charts/pie-chart/pie-chart.tsx
import { jsx as _jsx27, Fragment as _Fragment7, jsxs as _jsxs11 } from "react/jsx-runtime";
var renderDefaultPieTooltip = ({
  tooltipData
}) => {
  return /* @__PURE__ */ _jsx27(BaseTooltip, {
    data: tooltipData,
    top: 0,
    left: 0,
    renderContainer: false
  });
};
var validateData3 = (data) => {
  if (!data.length) {
    return {
      isValid: false,
      message: "No data available"
    };
  }
  const hasNegativeValues = data.some((item) => item.value < 0);
  if (hasNegativeValues) {
    return {
      isValid: false,
      message: "Invalid data: Negative values are not allowed"
    };
  }
  const totalValue = data.reduce((sum, item) => sum + item.value, 0);
  if (totalValue <= 0) {
    return {
      isValid: false,
      message: "Invalid data: Total value must be greater than 0"
    };
  }
  return {
    isValid: true,
    message: ""
  };
};
var PieChartInternal = ({
  data,
  chartId: providedChartId,
  withTooltips = false,
  className,
  showLegend = false,
  legend = {},
  width: propWidth,
  height: propHeight,
  size,
  animation,
  thickness = 1,
  padding = 0,
  gapScale = 0,
  cornerScale = 0,
  showLabels = true,
  legendValueDisplay = "percentage",
  children = null,
  tooltipOffsetX = 0,
  tooltipOffsetY = -15,
  renderTooltip = renderDefaultPieTooltip,
  gap = "md"
}) => {
  const legendInteractive = legend.interactive ?? false;
  const legendPosition = legend.position ?? "bottom";
  const providerTheme = useGlobalChartsTheme();
  const chartId = useChartId(providedChartId);
  const {
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    hideTooltip,
    showTooltip
  } = useTooltip3();
  const {
    containerRef,
    TooltipInPortal,
    containerBounds
  } = useTooltipInPortal2({
    detectBounds: true,
    scroll: true,
    debounce: 0
  });
  const onMouseLeave = useCallback13(() => {
    if (!withTooltips) {
      return;
    }
    hideTooltip();
  }, [withTooltips, hideTooltip]);
  const {
    getElementStyles,
    isSeriesVisible
  } = useGlobalChartsContext();
  const dataWithPercentages = useDataWithPercentages(data);
  const {
    visibleData,
    allSegmentsHidden,
    legendData
  } = useInteractiveLegendData({
    data: dataWithPercentages,
    chartId,
    legendInteractive,
    isSeriesVisible
  });
  const legendOptions = useMemo23(() => ({
    showValues: true,
    legendValueDisplay
  }), [legendValueDisplay]);
  const legendItems = useChartLegendItems(legendData, legendOptions);
  const {
    isValid: isValid2,
    message
  } = validateData3(data);
  const {
    svgChildren,
    htmlChildren,
    legendChildren,
    otherChildren
  } = useChartChildren(children, "PieChart");
  const chartMetadata = useMemo23(() => ({
    thickness,
    gapScale,
    cornerScale
  }), [thickness, gapScale, cornerScale]);
  useChartRegistration({
    chartId,
    legendItems,
    chartType: "pie",
    isDataValid: isValid2,
    metadata: chartMetadata
  });
  const prefersReducedMotion = usePrefersReducedMotion();
  if (!isValid2) {
    return /* @__PURE__ */ _jsx27("div", {
      className: clsx8("pie-chart", pie_chart_module_default["pie-chart"], className),
      children: /* @__PURE__ */ _jsx27("div", {
        className: pie_chart_module_default["error-message"],
        children: message
      })
    });
  }
  const padAngle = gapScale * (2 * Math.PI / data.length);
  const dataWithIndex = visibleData.map((d2) => {
    const originalIndex = data.findIndex((item) => item.label === d2.label);
    return {
      ...d2,
      index: originalIndex >= 0 ? originalIndex : 0
    };
  });
  const accessors = {
    value: (d2) => d2.value,
    fill: (d2) => {
      return getElementStyles({
        data: d2,
        index: d2.index
      }).color;
    }
  };
  const legendElement = showLegend && /* @__PURE__ */ _jsx27(Legend, {
    orientation: legend.orientation ?? "horizontal",
    position: legendPosition,
    alignment: legend.alignment ?? "center",
    labelStyles: legend.labelStyles,
    itemClassName: legend.itemClassName,
    itemStyles: legend.itemStyles,
    shapeStyles: legend.shapeStyles,
    shape: legend.shape ?? "circle",
    chartId,
    interactive: legendInteractive
  });
  return /* @__PURE__ */ _jsx27(SingleChartContext.Provider, {
    value: {
      chartId
    },
    children: /* @__PURE__ */ _jsx27(ChartLayout, {
      legendPosition,
      legendElement,
      legendChildren,
      gap,
      className: clsx8(
        "pie-chart",
        pie_chart_module_default["pie-chart"],
        // Fill parent when no explicit dimensions provided
        {
          [pie_chart_module_default["pie-chart--responsive"]]: !propWidth && !propHeight
        },
        className
      ),
      style: {
        width: propWidth || void 0,
        height: propHeight || void 0
      },
      trailingContent: /* @__PURE__ */ _jsxs11(_Fragment7, {
        children: [withTooltips && tooltipOpen && tooltipData && /* @__PURE__ */ _jsx27(TooltipInPortal, {
          top: tooltipTop || 0,
          left: tooltipLeft || 0,
          children: /* @__PURE__ */ _jsx27("div", {
            role: "tooltip",
            children: renderTooltip({
              tooltipData
            })
          })
        }), htmlChildren, otherChildren]
      }),
      children: ({
        contentWidth,
        contentHeight
      }) => {
        const availableWidth = contentWidth > 0 ? contentWidth : 300;
        const availableHeight = contentHeight > 0 ? contentHeight : 300;
        const availableSize = Math.min(availableWidth, availableHeight);
        const actualSize = size ? Math.min(size, availableSize) : availableSize;
        const width = actualSize;
        const height = actualSize;
        const radius = Math.min(width, height) / 2;
        const centerX = width / 2;
        const centerY = height / 2;
        const outerRadius = radius - padding;
        const innerRadius = thickness === 0 ? 0 : outerRadius * (1 - thickness);
        const maxCornerRadius = (outerRadius - innerRadius) / 2;
        const cornerRadius = cornerScale ? Math.min(cornerScale * outerRadius, maxCornerRadius) : 0;
        return /* @__PURE__ */ _jsx27(Stack, {
          ref: containerRef,
          align: "center",
          justify: "center",
          className: pie_chart_module_default["pie-chart__centering"],
          children: /* @__PURE__ */ _jsxs11("svg", {
            viewBox: `0 0 ${width} ${height}`,
            preserveAspectRatio: "xMidYMid meet",
            width,
            height,
            children: [/* @__PURE__ */ _jsx27("defs", {
              children: /* @__PURE__ */ _jsx27(radial_wipe_animation_default, {
                id: `radial-wipe-${chartId}`,
                radius: outerRadius,
                innerRadius
              })
            }), /* @__PURE__ */ _jsxs11(Group4, {
              top: centerY,
              left: centerX,
              mask: animation && !prefersReducedMotion ? `url(#radial-wipe-${chartId})` : null,
              children: [allSegmentsHidden ? /* @__PURE__ */ _jsx27(SvgEmptyState, {
                x: 0,
                y: 0,
                width,
                height,
                children: __7("All segments are hidden. Click legend items to show data.", "jetpack-charts")
              }) : /* @__PURE__ */ _jsx27(Pie, {
                data: dataWithIndex,
                pieValue: accessors.value,
                outerRadius,
                innerRadius,
                padAngle,
                cornerRadius,
                children: (pie) => {
                  return pie.arcs.map((arc, index) => {
                    const [centroidX, centroidY] = pie.path.centroid(arc);
                    const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.25;
                    const handleMouseMove = (event) => {
                      if (!withTooltips) {
                        return;
                      }
                      if (containerBounds.width === 0 || containerBounds.height === 0) {
                        return;
                      }
                      showTooltip({
                        tooltipData: arc.data,
                        tooltipLeft: event.clientX - containerBounds.left + tooltipOffsetX,
                        tooltipTop: event.clientY - containerBounds.top + tooltipOffsetY
                      });
                    };
                    const pathProps = {
                      d: pie.path(arc) || "",
                      fill: accessors.fill(arc.data),
                      "data-testid": "pie-segment"
                    };
                    const groupProps = {};
                    if (withTooltips) {
                      groupProps.onMouseMove = handleMouseMove;
                      groupProps.onMouseLeave = onMouseLeave;
                    }
                    const fontSize = 12;
                    const estimatedTextWidth = getStringWidth(arc.data.label, {
                      fontSize
                    });
                    const labelPadding = 6;
                    const backgroundWidth = estimatedTextWidth + labelPadding * 2;
                    const backgroundHeight = fontSize + labelPadding * 2;
                    return /* @__PURE__ */ _jsxs11("g", {
                      ...groupProps,
                      children: [/* @__PURE__ */ _jsx27("path", {
                        ...pathProps
                      }), showLabels && hasSpaceForLabel && /* @__PURE__ */ _jsxs11("g", {
                        children: [providerTheme.labelBackgroundColor && /* @__PURE__ */ _jsx27("rect", {
                          x: centroidX - backgroundWidth / 2,
                          y: centroidY - backgroundHeight / 2,
                          width: backgroundWidth,
                          height: backgroundHeight,
                          fill: providerTheme.labelBackgroundColor,
                          rx: 4,
                          ry: 4,
                          pointerEvents: "none"
                        }), /* @__PURE__ */ _jsx27("text", {
                          x: centroidX,
                          y: centroidY,
                          dy: ".33em",
                          fill: providerTheme.labelTextColor || "#333",
                          fontSize,
                          textAnchor: "middle",
                          pointerEvents: "none",
                          children: arc.data.label
                        })]
                      })]
                    }, `arc-${index}`);
                  });
                }
              }), !allSegmentsHidden && svgChildren]
            })]
          })
        });
      }
    })
  });
};
var PieChartWithProvider = (props) => {
  const existingContext = useContext22(GlobalChartsContext);
  if (existingContext) {
    return /* @__PURE__ */ _jsx27(PieChartInternal, {
      ...props
    });
  }
  return /* @__PURE__ */ _jsx27(GlobalChartsProvider, {
    children: /* @__PURE__ */ _jsx27(PieChartInternal, {
      ...props
    })
  });
};
PieChartWithProvider.displayName = "PieChart";
var PieChart = attachSubComponents(PieChartWithProvider, {
  Legend,
  SVG: ChartSVG,
  HTML: ChartHTML
});
var PieChartResponsive = attachSubComponents(withResponsive(PieChartWithProvider), {
  Legend,
  SVG: ChartSVG,
  HTML: ChartHTML
});

// src/charts/pie-semi-circle-chart/pie-semi-circle-chart.tsx
import { Group as Group5 } from "@visx/group";
import { Pie as Pie2 } from "@visx/shape";
import { Text as Text4 } from "@visx/text";
import { useTooltip as useTooltip4, useTooltipInPortal as useTooltipInPortal3 } from "@visx/tooltip";
import { __ as __8 } from "@wordpress/i18n";
import clsx9 from "clsx";
import { useCallback as useCallback14, useContext as useContext23, useMemo as useMemo24 } from "react";

// src/charts/pie-semi-circle-chart/pie-semi-circle-chart.module.scss
var pie_semi_circle_chart_module_default = {
  "pie-semi-circle-chart--responsive": "a8ccharts-V0wiEb",
  "pie-semi-circle-chart__centering": "a8ccharts-1khYG1",
  "pie-semi-circle-chart": "a8ccharts-8tyaQj",
  "label": "a8ccharts-EKZS3j",
  "note": "a8ccharts-v85A8-"
};

// src/charts/pie-semi-circle-chart/pie-semi-circle-chart.tsx
import { jsx as _jsx28, Fragment as _Fragment8, jsxs as _jsxs12 } from "react/jsx-runtime";
var renderDefaultPieSemiCircleTooltip = ({
  tooltipData
}) => {
  return /* @__PURE__ */ _jsx28(BaseTooltip, {
    data: tooltipData,
    top: 0,
    left: 0,
    renderContainer: false
  });
};
var PAD_ANGLE = 0.03;
var DEFAULT_WIDTH = 400;
var validateData4 = (data) => {
  if (!data.length) {
    return {
      isValid: false,
      message: "No data available"
    };
  }
  const hasNegativeValues = data.some((item) => item.value < 0);
  if (hasNegativeValues) {
    return {
      isValid: false,
      message: "Invalid data: Negative values are not allowed"
    };
  }
  const totalValue = data.reduce((sum, item) => sum + item.value, 0);
  if (totalValue <= 0) {
    return {
      isValid: false,
      message: "Invalid data: Total value must be greater than 0"
    };
  }
  return {
    isValid: true,
    message: ""
  };
};
var PieSemiCircleChartInternal = ({
  data,
  chartId: providedChartId,
  width: propWidth,
  height: propHeight,
  thickness = 0.4,
  clockwise = true,
  withTooltips = false,
  showLegend = false,
  legend = {},
  legendValueDisplay = "percentage",
  label,
  animation,
  note,
  className,
  children,
  tooltipOffsetX = 0,
  tooltipOffsetY = -15,
  renderTooltip = renderDefaultPieSemiCircleTooltip,
  gap = "md"
}) => {
  const legendInteractive = legend.interactive ?? false;
  const legendPosition = legend.position ?? "bottom";
  const chartId = useChartId(providedChartId);
  const {
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    hideTooltip,
    showTooltip
  } = useTooltip4();
  const {
    containerRef,
    TooltipInPortal,
    containerBounds
  } = useTooltipInPortal3({
    detectBounds: true,
    scroll: true,
    debounce: 0
  });
  const handleMouseMove = useCallback14((event, arc) => {
    if (containerBounds.width === 0 || containerBounds.height === 0) {
      return;
    }
    showTooltip({
      tooltipData: arc.data,
      tooltipLeft: event.clientX - containerBounds.left + tooltipOffsetX,
      tooltipTop: event.clientY - containerBounds.top + tooltipOffsetY
    });
  }, [containerBounds.width, containerBounds.height, containerBounds.left, containerBounds.top, showTooltip, tooltipOffsetX, tooltipOffsetY]);
  const handleMouseLeave = useCallback14(() => {
    hideTooltip();
  }, [hideTooltip]);
  const handleArcMouseMove = useCallback14((arc) => (event) => {
    handleMouseMove(event, arc);
  }, [handleMouseMove]);
  const {
    isValid: isValid2,
    message
  } = validateData4(data);
  const {
    getElementStyles,
    isSeriesVisible
  } = useGlobalChartsContext();
  const dataWithPercentages = useDataWithPercentages(data);
  const {
    visibleData,
    allSegmentsHidden,
    legendData
  } = useInteractiveLegendData({
    data: dataWithPercentages,
    chartId,
    legendInteractive,
    isSeriesVisible
  });
  const accessors = useMemo24(() => ({
    value: (d2) => d2.value,
    sort: (a2, b2) => b2.value - a2.value,
    fill: (d2) => getElementStyles({
      data: d2,
      index: d2.index
    }).color
  }), [getElementStyles]);
  const legendOptions = useMemo24(() => ({
    showValues: true,
    legendValueDisplay
  }), [legendValueDisplay]);
  const legendItems = useChartLegendItems(legendData, legendOptions);
  const {
    svgChildren,
    htmlChildren,
    legendChildren,
    otherChildren
  } = useChartChildren(children, "PieSemiCircleChart");
  const chartMetadata = useMemo24(() => ({
    thickness,
    clockwise
  }), [thickness, clockwise]);
  useChartRegistration({
    chartId,
    legendItems,
    chartType: "pie-semi-circle",
    isDataValid: isValid2,
    metadata: chartMetadata
  });
  const prefersReducedMotion = usePrefersReducedMotion();
  const effectiveWidth = propWidth || DEFAULT_WIDTH;
  if (!isValid2) {
    const errorWidth = propHeight ? Math.min(propWidth || propHeight * 2, propHeight * 2) : effectiveWidth;
    const errorHeight = errorWidth / 2;
    return /* @__PURE__ */ _jsx28("div", {
      className: pie_semi_circle_chart_module_default["pie-semi-circle-chart"],
      children: /* @__PURE__ */ _jsx28("svg", {
        width: errorWidth,
        height: errorHeight,
        children: /* @__PURE__ */ _jsx28("text", {
          x: "50%",
          y: "50%",
          textAnchor: "middle",
          className: pie_semi_circle_chart_module_default.error,
          children: message
        })
      })
    });
  }
  const dataWithIndex = visibleData.map((d2) => {
    const originalIndex = data.findIndex((item) => item.label === d2.label);
    return {
      ...d2,
      index: originalIndex >= 0 ? originalIndex : 0
    };
  });
  const startAngle = clockwise ? -Math.PI / 2 : Math.PI / 2;
  const endAngle = clockwise ? Math.PI / 2 : -Math.PI / 2;
  const legendElement = showLegend && /* @__PURE__ */ _jsx28(Legend, {
    orientation: legend.orientation ?? "horizontal",
    position: legendPosition,
    alignment: legend.alignment ?? "center",
    labelStyles: legend.labelStyles,
    itemClassName: legend.itemClassName,
    itemStyles: legend.itemStyles,
    shapeStyles: legend.shapeStyles,
    shape: legend.shape ?? "circle",
    chartId,
    interactive: legendInteractive
  });
  return /* @__PURE__ */ _jsx28(SingleChartContext.Provider, {
    value: {
      chartId
    },
    children: /* @__PURE__ */ _jsx28(ChartLayout, {
      legendPosition,
      legendElement,
      legendChildren,
      gap,
      className: clsx9("pie-semi-circle-chart", pie_semi_circle_chart_module_default["pie-semi-circle-chart"], {
        [pie_semi_circle_chart_module_default["pie-semi-circle-chart--responsive"]]: !propWidth && !propHeight
      }, className),
      style: {
        width: propWidth || void 0,
        height: propHeight || void 0
      },
      trailingContent: /* @__PURE__ */ _jsxs12(_Fragment8, {
        children: [withTooltips && tooltipOpen && tooltipData && /* @__PURE__ */ _jsx28(TooltipInPortal, {
          top: tooltipTop || 0,
          left: tooltipLeft || 0,
          children: /* @__PURE__ */ _jsx28("div", {
            role: "tooltip",
            children: renderTooltip({
              tooltipData
            })
          })
        }), htmlChildren, otherChildren]
      }),
      children: ({
        contentWidth,
        contentHeight
      }) => {
        const availableWidth = contentWidth > 0 ? contentWidth : effectiveWidth;
        const availableHeight = contentHeight > 0 ? contentHeight : propHeight || effectiveWidth / 2;
        const width = Math.min(availableWidth, availableHeight * 2);
        const height = width / 2;
        const radius = height;
        const innerRadius = radius * (1 - thickness);
        return /* @__PURE__ */ _jsx28(Stack, {
          ref: containerRef,
          align: "center",
          justify: "center",
          className: pie_semi_circle_chart_module_default["pie-semi-circle-chart__centering"],
          children: /* @__PURE__ */ _jsxs12("svg", {
            width,
            height,
            viewBox: `0 0 ${width} ${height}`,
            children: [/* @__PURE__ */ _jsx28("defs", {
              children: /* @__PURE__ */ _jsx28(radial_wipe_animation_default, {
                id: `radial-wipe-${chartId}`,
                radius,
                innerRadius,
                startAngle: "-180deg",
                wipePercentage: 50
              })
            }), /* @__PURE__ */ _jsx28(Group5, {
              top: height,
              left: width / 2,
              mask: animation && !prefersReducedMotion ? `url(#radial-wipe-${chartId})` : null,
              children: allSegmentsHidden ? /* @__PURE__ */ _jsx28(SvgEmptyState, {
                x: 0,
                y: -radius / 2,
                width,
                height,
                children: __8("All segments are hidden. Click legend items to show data.", "jetpack-charts")
              }) : /* @__PURE__ */ _jsxs12(_Fragment8, {
                children: [/* @__PURE__ */ _jsx28(Pie2, {
                  data: dataWithIndex,
                  pieValue: accessors.value,
                  outerRadius: radius,
                  innerRadius,
                  cornerRadius: 3,
                  padAngle: PAD_ANGLE,
                  startAngle,
                  endAngle,
                  pieSort: accessors.sort,
                  children: (pie) => {
                    return pie.arcs.map((arc) => /* @__PURE__ */ _jsx28("g", {
                      onMouseMove: withTooltips ? handleArcMouseMove(arc) : void 0,
                      onMouseLeave: withTooltips ? handleMouseLeave : void 0,
                      children: /* @__PURE__ */ _jsx28("path", {
                        d: pie.path(arc) || "",
                        fill: accessors.fill(arc.data)
                      })
                    }, arc.data.label));
                  }
                }), /* @__PURE__ */ _jsxs12(Group5, {
                  children: [/* @__PURE__ */ _jsx28(Text4, {
                    textAnchor: "middle",
                    verticalAnchor: "start",
                    y: -40,
                    className: pie_semi_circle_chart_module_default.label,
                    children: label
                  }), /* @__PURE__ */ _jsx28(Text4, {
                    textAnchor: "middle",
                    verticalAnchor: "start",
                    y: -20,
                    className: pie_semi_circle_chart_module_default.note,
                    children: note
                  })]
                }), !allSegmentsHidden && svgChildren]
              })
            })]
          })
        });
      }
    })
  });
};
var PieSemiCircleChartWithProvider = (props) => {
  const existingContext = useContext23(GlobalChartsContext);
  if (existingContext) {
    return /* @__PURE__ */ _jsx28(PieSemiCircleChartInternal, {
      ...props
    });
  }
  return /* @__PURE__ */ _jsx28(GlobalChartsProvider, {
    children: /* @__PURE__ */ _jsx28(PieSemiCircleChartInternal, {
      ...props
    })
  });
};
PieSemiCircleChartWithProvider.displayName = "PieSemiCircleChart";
var PieSemiCircleChart = attachSubComponents(PieSemiCircleChartWithProvider, {
  Legend,
  SVG: ChartSVG,
  HTML: ChartHTML
});
var PieSemiCircleChartResponsive = attachSubComponents(withResponsive(PieSemiCircleChartWithProvider), {
  Legend,
  SVG: ChartSVG,
  HTML: ChartHTML
});

// src/charts/sparkline/sparkline.tsx
import clsx10 from "clsx";
import { useMemo as useMemo25, forwardRef as forwardRef7 } from "react";

// src/charts/sparkline/sparkline.module.scss
var sparkline_module_default = {
  "sparkline": "a8ccharts-o-3Z8B",
  "sparkline--empty": "a8ccharts-CbLbcd"
};

// src/charts/sparkline/sparkline.tsx
import { jsx as _jsx29 } from "react/jsx-runtime";
var DEFAULT_WIDTH2 = 100;
var DEFAULT_HEIGHT = 40;
var transformToSeriesData = (data, color, strokeWidth) => {
  const baseDate = new Date(2e3, 0, 1);
  return [{
    label: "sparkline",
    data: data.map((value, index) => ({
      date: new Date(baseDate.getTime() + index * 864e5),
      // Add days
      value
    })),
    options: {
      stroke: color,
      seriesLineStyle: strokeWidth ? {
        strokeWidth
      } : void 0
    }
  }];
};
var SparklineComponent = /* @__PURE__ */ forwardRef7(({
  data,
  width = DEFAULT_WIDTH2,
  height = DEFAULT_HEIGHT,
  color,
  strokeWidth: strokeWidthProp,
  withGradientFill = true,
  gradient,
  className,
  chartId,
  margin: marginProp,
  animation
}, ref) => {
  const theme = useGlobalChartsTheme();
  const themeStrokeWidth = theme.sparkline?.strokeWidth ?? 1.5;
  const strokeWidth = strokeWidthProp ?? themeStrokeWidth;
  const seriesData = useMemo25(() => {
    if (!data || data.length === 0) {
      return [];
    }
    return transformToSeriesData(data, color, strokeWidth);
  }, [data, color, strokeWidth]);
  const finalMargin = useMemo25(() => {
    const themeMargin = theme.sparkline?.margin ?? {
      top: 2,
      right: 2,
      bottom: 2,
      left: 2
    };
    const margin = marginProp ?? themeMargin;
    return {
      ...themeMargin,
      ...margin
    };
  }, [marginProp, theme.sparkline?.margin]);
  const seriesWithGradient = useMemo25(() => {
    if (!gradient || seriesData.length === 0) {
      return seriesData;
    }
    return seriesData.map((series) => ({
      ...series,
      options: {
        ...series.options,
        gradient: {
          from: gradient.from || color || "#000000",
          to: gradient.to || "#ffffff",
          fromOpacity: gradient.fromOpacity ?? 0.5,
          toOpacity: gradient.toOpacity ?? 0
        }
      }
    }));
  }, [seriesData, gradient, color]);
  if (!data || data.length === 0) {
    return /* @__PURE__ */ _jsx29("div", {
      ref,
      className: clsx10("sparkline", sparkline_module_default.sparkline, sparkline_module_default["sparkline--empty"], className),
      style: {
        width,
        height
      }
    });
  }
  if (data.length === 1) {
    const cx2 = width / 2;
    const cy = height / 2;
    const resolvedColor = color || "#000000";
    return /* @__PURE__ */ _jsx29("div", {
      ref,
      className: clsx10("sparkline", sparkline_module_default.sparkline, sparkline_module_default["sparkline--single-point"], className),
      style: {
        width,
        height
      },
      children: /* @__PURE__ */ _jsx29("svg", {
        width,
        height,
        "aria-hidden": "true",
        children: /* @__PURE__ */ _jsx29("circle", {
          cx: cx2,
          cy,
          r: strokeWidth * 1.5,
          fill: resolvedColor
        })
      })
    });
  }
  return /* @__PURE__ */ _jsx29("div", {
    ref,
    className: clsx10("sparkline", sparkline_module_default.sparkline, className),
    children: /* @__PURE__ */ _jsx29(LineChart, {
      data: seriesWithGradient,
      width,
      height,
      margin: finalMargin,
      chartId,
      withGradientFill,
      withTooltips: false,
      showLegend: false,
      gridVisibility: "none",
      options: {
        axis: {
          x: {
            display: false
          },
          y: {
            display: false
          }
        }
      },
      curveType: "monotone",
      animation
    })
  });
});
SparklineComponent.displayName = "SparklineComponent";
var SparklineUnresponsive = SparklineComponent;
SparklineUnresponsive.displayName = "SparklineUnresponsive";
var Sparkline = withResponsive(SparklineUnresponsive);

// src/components/trend-indicator/trend-indicator.tsx
import clsx11 from "clsx";

// src/components/trend-indicator/trend-indicator.module.scss
var trend_indicator_module_default = {
  "trend-indicator": "a8ccharts-tGw1PY",
  "trend-indicator--up": "a8ccharts-Fn-D1W",
  "trend-indicator--down": "a8ccharts-HqtGQO",
  "trend-indicator--neutral": "a8ccharts-S10nvO",
  "trend-indicator__icon": "a8ccharts-5HjpOT",
  "trend-indicator__value": "a8ccharts-muLL2Q"
};

// src/components/trend-indicator/trend-indicator.tsx
import { jsx as _jsx30, jsxs as _jsxs13 } from "react/jsx-runtime";
var DIRECTION_LABELS = {
  up: "Increase",
  down: "Decrease",
  neutral: "No change"
};
var Icon = ({
  direction
}) => {
  if (direction === "neutral") {
    return null;
  }
  const isUp = direction === "up";
  return /* @__PURE__ */ _jsx30("svg", {
    className: trend_indicator_module_default["trend-indicator__icon"],
    viewBox: "0 0 16 16",
    fill: "none",
    "aria-hidden": "true",
    children: /* @__PURE__ */ _jsx30("path", {
      d: isUp ? "M8 13V3M4 7l4-4 4 4" : "M8 3v10M4 9l4 4 4-4",
      stroke: "currentColor",
      strokeWidth: "1.5",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    })
  });
};
function TrendIndicator({
  direction,
  value,
  className,
  style,
  showIcon = true
}) {
  const ariaLabel = `${DIRECTION_LABELS[direction]}: ${value}`;
  return /* @__PURE__ */ _jsxs13("span", {
    className: clsx11(trend_indicator_module_default["trend-indicator"], trend_indicator_module_default[`trend-indicator--${direction}`], className),
    style,
    "aria-label": ariaLabel,
    children: [showIcon && /* @__PURE__ */ _jsx30(Icon, {
      direction
    }), /* @__PURE__ */ _jsx30("span", {
      className: trend_indicator_module_default["trend-indicator__value"],
      children: value
    })]
  });
}
export {
  AccessibleTooltip,
  BarChartResponsive as BarChart,
  BarChart as BarChartUnresponsive,
  BarListChartResponsive as BarListChart,
  BarListChart as BarListChartUnresponsive,
  BaseTooltip,
  ConversionFunnelChartWithProvider as ConversionFunnelChart,
  GeoChartResponsive as GeoChart,
  GeoChartWithProvider as GeoChartUnresponsive,
  GlobalChartsContext,
  GlobalChartsProvider,
  LeaderboardChartResponsive as LeaderboardChart,
  LeaderboardChart as LeaderboardChartUnresponsive,
  Legend,
  LineChartResponsive as LineChart,
  LineChart as LineChartUnresponsive,
  PieChartResponsive as PieChart,
  PieChart as PieChartUnresponsive,
  PieSemiCircleChartResponsive as PieSemiCircleChart,
  PieSemiCircleChart as PieSemiCircleChartUnresponsive,
  Sparkline,
  SparklineUnresponsive,
  GlobalChartsProvider as ThemeProvider,
  TrendIndicator,
  attachSubComponents,
  defaultTheme,
  formatMetricValue,
  formatPercentage,
  getColorDistance,
  getItemShapeStyles,
  getLongestTickWidth,
  getSeriesLineStyles,
  getSeriesStroke,
  hexToRgba,
  isSafari,
  isValidHexColor,
  lightenHexColor,
  mergeThemes,
  normalizeColorToHex,
  parseAsLocalDate,
  parseHslString,
  parseRgbString,
  resolveCssVariable,
  useChartDataTransform,
  useChartLegendItems,
  useChartMargin,
  useChartMouseHandler,
  useDeepMemo,
  useElementSize,
  useGlobalChartsContext,
  useGlobalChartsTheme,
  useInteractiveLegendData,
  useKeyboardNavigation,
  useLeaderboardLegendItems,
  usePrefersReducedMotion,
  useTextTruncation,
  useTooltipPortalRelocator,
  useXYChartTheme,
  useZeroValueDisplay,
  validateHexColor
};
/*! Bundled license information:

react-is/cjs/react-is.production.min.js:
  (** @license React v16.13.1
   * react-is.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-is/cjs/react-is.development.js:
  (** @license React v16.13.1
   * react-is.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

is-plain-object/dist/is-plain-object.mjs:
  (*!
   * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
   *
   * Copyright (c) 2014-2017, Jon Schlinkert.
   * Released under the MIT License.
   *)
*/
//# sourceMappingURL=index.js.map