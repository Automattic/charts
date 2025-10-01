import {
  useChartChildren
} from "./chunk-D3DZT2EK.js";
import {
  withResponsive
} from "./chunk-TYYW4BG3.js";
import {
  Legend,
  SingleChartContext
} from "./chunk-HLYQZPY4.js";
import {
  GlobalChartsContext,
  GlobalChartsProvider,
  attachSubComponents,
  formatMetricValue,
  useChartId,
  useChartRegistration,
  useGlobalChartsContext,
  useGlobalChartsTheme
} from "./chunk-KACVKFMH.js";
import {
  __commonJS,
  __export,
  __toESM
} from "./chunk-G3PMV62Z.js";

// ../../../node_modules/.pnpm/react-is@16.13.1/node_modules/react-is/cjs/react-is.production.min.js
var require_react_is_production_min = __commonJS({
  "../../../node_modules/.pnpm/react-is@16.13.1/node_modules/react-is/cjs/react-is.production.min.js"(exports) {
    "use strict";
    var b2 = "function" === typeof Symbol && Symbol.for;
    var c2 = b2 ? Symbol.for("react.element") : 60103;
    var d2 = b2 ? Symbol.for("react.portal") : 60106;
    var e2 = b2 ? Symbol.for("react.fragment") : 60107;
    var f2 = b2 ? Symbol.for("react.strict_mode") : 60108;
    var g2 = b2 ? Symbol.for("react.profiler") : 60114;
    var h2 = b2 ? Symbol.for("react.provider") : 60109;
    var k2 = b2 ? Symbol.for("react.context") : 60110;
    var l2 = b2 ? Symbol.for("react.async_mode") : 60111;
    var m2 = b2 ? Symbol.for("react.concurrent_mode") : 60111;
    var n2 = b2 ? Symbol.for("react.forward_ref") : 60112;
    var p2 = b2 ? Symbol.for("react.suspense") : 60113;
    var q = b2 ? Symbol.for("react.suspense_list") : 60120;
    var r2 = b2 ? Symbol.for("react.memo") : 60115;
    var t2 = b2 ? Symbol.for("react.lazy") : 60116;
    var v2 = b2 ? Symbol.for("react.block") : 60121;
    var w2 = b2 ? Symbol.for("react.fundamental") : 60117;
    var x2 = b2 ? Symbol.for("react.responder") : 60118;
    var y2 = b2 ? Symbol.for("react.scope") : 60119;
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
        var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for("react.element") : 60103;
        var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for("react.portal") : 60106;
        var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for("react.fragment") : 60107;
        var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for("react.strict_mode") : 60108;
        var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for("react.profiler") : 60114;
        var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for("react.provider") : 60109;
        var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for("react.context") : 60110;
        var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for("react.async_mode") : 60111;
        var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for("react.concurrent_mode") : 60111;
        var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for("react.forward_ref") : 60112;
        var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for("react.suspense") : 60113;
        var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for("react.suspense_list") : 60120;
        var REACT_MEMO_TYPE = hasSymbol ? Symbol.for("react.memo") : 60115;
        var REACT_LAZY_TYPE = hasSymbol ? Symbol.for("react.lazy") : 60116;
        var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for("react.block") : 60121;
        var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for("react.fundamental") : 60117;
        var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for("react.responder") : 60118;
        var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for("react.scope") : 60119;
        function isValidElementType(type) {
          return typeof type === "string" || typeof type === "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
          type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === "object" && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
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
                      case REACT_LAZY_TYPE:
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
        var Lazy = REACT_LAZY_TYPE;
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
          return typeOf(object) === REACT_LAZY_TYPE;
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

// ../../../node_modules/.pnpm/@wordpress+element@6.31.0/node_modules/@wordpress/element/build-module/react.js
import { Children, cloneElement, Component, createContext, createElement, createRef, forwardRef, Fragment, isValidElement, memo, PureComponent, StrictMode, useCallback, useContext, useDebugValue, useDeferredValue, useEffect, useId, useMemo, useImperativeHandle, useInsertionEffect, useLayoutEffect, useReducer, useRef, useState, useSyncExternalStore, useTransition, startTransition, lazy, Suspense } from "react";

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

// ../../../node_modules/.pnpm/@wordpress+hooks@4.31.0/node_modules/@wordpress/hooks/build-module/validateNamespace.js
function validateNamespace(namespace) {
  if ("string" !== typeof namespace || "" === namespace) {
    console.error("The namespace must be a non-empty string.");
    return false;
  }
  if (!/^[a-zA-Z][a-zA-Z0-9_.\-\/]*$/.test(namespace)) {
    console.error("The namespace can only contain numbers, letters, dashes, periods, underscores and slashes.");
    return false;
  }
  return true;
}
var validateNamespace_default = validateNamespace;

// ../../../node_modules/.pnpm/@wordpress+hooks@4.31.0/node_modules/@wordpress/hooks/build-module/validateHookName.js
function validateHookName(hookName) {
  if ("string" !== typeof hookName || "" === hookName) {
    console.error("The hook name must be a non-empty string.");
    return false;
  }
  if (/^__/.test(hookName)) {
    console.error("The hook name cannot begin with `__`.");
    return false;
  }
  if (!/^[a-zA-Z][a-zA-Z0-9_.-]*$/.test(hookName)) {
    console.error("The hook name can only contain numbers, letters, dashes, periods and underscores.");
    return false;
  }
  return true;
}
var validateHookName_default = validateHookName;

// ../../../node_modules/.pnpm/@wordpress+hooks@4.31.0/node_modules/@wordpress/hooks/build-module/createAddHook.js
function createAddHook(hooks, storeKey) {
  return function addHook(hookName, namespace, callback, priority = 10) {
    const hooksStore = hooks[storeKey];
    if (!validateHookName_default(hookName)) {
      return;
    }
    if (!validateNamespace_default(namespace)) {
      return;
    }
    if ("function" !== typeof callback) {
      console.error("The hook callback must be a function.");
      return;
    }
    if ("number" !== typeof priority) {
      console.error("If specified, the hook priority must be a number.");
      return;
    }
    const handler = {
      callback,
      priority,
      namespace
    };
    if (hooksStore[hookName]) {
      const handlers = hooksStore[hookName].handlers;
      let i2;
      for (i2 = handlers.length; i2 > 0; i2--) {
        if (priority >= handlers[i2 - 1].priority) {
          break;
        }
      }
      if (i2 === handlers.length) {
        handlers[i2] = handler;
      } else {
        handlers.splice(i2, 0, handler);
      }
      hooksStore.__current.forEach((hookInfo) => {
        if (hookInfo.name === hookName && hookInfo.currentIndex >= i2) {
          hookInfo.currentIndex++;
        }
      });
    } else {
      hooksStore[hookName] = {
        handlers: [handler],
        runs: 0
      };
    }
    if (hookName !== "hookAdded") {
      hooks.doAction("hookAdded", hookName, namespace, callback, priority);
    }
  };
}
var createAddHook_default = createAddHook;

// ../../../node_modules/.pnpm/@wordpress+hooks@4.31.0/node_modules/@wordpress/hooks/build-module/createRemoveHook.js
function createRemoveHook(hooks, storeKey, removeAll = false) {
  return function removeHook(hookName, namespace) {
    const hooksStore = hooks[storeKey];
    if (!validateHookName_default(hookName)) {
      return;
    }
    if (!removeAll && !validateNamespace_default(namespace)) {
      return;
    }
    if (!hooksStore[hookName]) {
      return 0;
    }
    let handlersRemoved = 0;
    if (removeAll) {
      handlersRemoved = hooksStore[hookName].handlers.length;
      hooksStore[hookName] = {
        runs: hooksStore[hookName].runs,
        handlers: []
      };
    } else {
      const handlers = hooksStore[hookName].handlers;
      for (let i2 = handlers.length - 1; i2 >= 0; i2--) {
        if (handlers[i2].namespace === namespace) {
          handlers.splice(i2, 1);
          handlersRemoved++;
          hooksStore.__current.forEach((hookInfo) => {
            if (hookInfo.name === hookName && hookInfo.currentIndex >= i2) {
              hookInfo.currentIndex--;
            }
          });
        }
      }
    }
    if (hookName !== "hookRemoved") {
      hooks.doAction("hookRemoved", hookName, namespace);
    }
    return handlersRemoved;
  };
}
var createRemoveHook_default = createRemoveHook;

// ../../../node_modules/.pnpm/@wordpress+hooks@4.31.0/node_modules/@wordpress/hooks/build-module/createHasHook.js
function createHasHook(hooks, storeKey) {
  return function hasHook(hookName, namespace) {
    const hooksStore = hooks[storeKey];
    if ("undefined" !== typeof namespace) {
      return hookName in hooksStore && hooksStore[hookName].handlers.some((hook) => hook.namespace === namespace);
    }
    return hookName in hooksStore;
  };
}
var createHasHook_default = createHasHook;

// ../../../node_modules/.pnpm/@wordpress+hooks@4.31.0/node_modules/@wordpress/hooks/build-module/createRunHook.js
function createRunHook(hooks, storeKey, returnFirstArg, async) {
  return function runHook(hookName, ...args) {
    const hooksStore = hooks[storeKey];
    if (!hooksStore[hookName]) {
      hooksStore[hookName] = {
        handlers: [],
        runs: 0
      };
    }
    hooksStore[hookName].runs++;
    const handlers = hooksStore[hookName].handlers;
    if ("production" !== process.env.NODE_ENV) {
      if ("hookAdded" !== hookName && hooksStore.all) {
        handlers.push(...hooksStore.all.handlers);
      }
    }
    if (!handlers || !handlers.length) {
      return returnFirstArg ? args[0] : void 0;
    }
    const hookInfo = {
      name: hookName,
      currentIndex: 0
    };
    async function asyncRunner() {
      try {
        hooksStore.__current.add(hookInfo);
        let result = returnFirstArg ? args[0] : void 0;
        while (hookInfo.currentIndex < handlers.length) {
          const handler = handlers[hookInfo.currentIndex];
          result = await handler.callback.apply(null, args);
          if (returnFirstArg) {
            args[0] = result;
          }
          hookInfo.currentIndex++;
        }
        return returnFirstArg ? result : void 0;
      } finally {
        hooksStore.__current.delete(hookInfo);
      }
    }
    function syncRunner() {
      try {
        hooksStore.__current.add(hookInfo);
        let result = returnFirstArg ? args[0] : void 0;
        while (hookInfo.currentIndex < handlers.length) {
          const handler = handlers[hookInfo.currentIndex];
          result = handler.callback.apply(null, args);
          if (returnFirstArg) {
            args[0] = result;
          }
          hookInfo.currentIndex++;
        }
        return returnFirstArg ? result : void 0;
      } finally {
        hooksStore.__current.delete(hookInfo);
      }
    }
    return (async ? asyncRunner : syncRunner)();
  };
}
var createRunHook_default = createRunHook;

// ../../../node_modules/.pnpm/@wordpress+hooks@4.31.0/node_modules/@wordpress/hooks/build-module/createCurrentHook.js
function createCurrentHook(hooks, storeKey) {
  return function currentHook() {
    var _currentArray$at$name;
    const hooksStore = hooks[storeKey];
    const currentArray = Array.from(hooksStore.__current);
    return (_currentArray$at$name = currentArray.at(-1)?.name) !== null && _currentArray$at$name !== void 0 ? _currentArray$at$name : null;
  };
}
var createCurrentHook_default = createCurrentHook;

// ../../../node_modules/.pnpm/@wordpress+hooks@4.31.0/node_modules/@wordpress/hooks/build-module/createDoingHook.js
function createDoingHook(hooks, storeKey) {
  return function doingHook(hookName) {
    const hooksStore = hooks[storeKey];
    if ("undefined" === typeof hookName) {
      return hooksStore.__current.size > 0;
    }
    return Array.from(hooksStore.__current).some((hook) => hook.name === hookName);
  };
}
var createDoingHook_default = createDoingHook;

// ../../../node_modules/.pnpm/@wordpress+hooks@4.31.0/node_modules/@wordpress/hooks/build-module/createDidHook.js
function createDidHook(hooks, storeKey) {
  return function didHook(hookName) {
    const hooksStore = hooks[storeKey];
    if (!validateHookName_default(hookName)) {
      return;
    }
    return hooksStore[hookName] && hooksStore[hookName].runs ? hooksStore[hookName].runs : 0;
  };
}
var createDidHook_default = createDidHook;

// ../../../node_modules/.pnpm/@wordpress+hooks@4.31.0/node_modules/@wordpress/hooks/build-module/createHooks.js
var _Hooks = class {
  constructor() {
    this.actions = /* @__PURE__ */ Object.create(null);
    this.actions.__current = /* @__PURE__ */ new Set();
    this.filters = /* @__PURE__ */ Object.create(null);
    this.filters.__current = /* @__PURE__ */ new Set();
    this.addAction = createAddHook_default(this, "actions");
    this.addFilter = createAddHook_default(this, "filters");
    this.removeAction = createRemoveHook_default(this, "actions");
    this.removeFilter = createRemoveHook_default(this, "filters");
    this.hasAction = createHasHook_default(this, "actions");
    this.hasFilter = createHasHook_default(this, "filters");
    this.removeAllActions = createRemoveHook_default(this, "actions", true);
    this.removeAllFilters = createRemoveHook_default(this, "filters", true);
    this.doAction = createRunHook_default(this, "actions", false, false);
    this.doActionAsync = createRunHook_default(this, "actions", false, true);
    this.applyFilters = createRunHook_default(this, "filters", true, false);
    this.applyFiltersAsync = createRunHook_default(this, "filters", true, true);
    this.currentAction = createCurrentHook_default(this, "actions");
    this.currentFilter = createCurrentHook_default(this, "filters");
    this.doingAction = createDoingHook_default(this, "actions");
    this.doingFilter = createDoingHook_default(this, "filters");
    this.didAction = createDidHook_default(this, "actions");
    this.didFilter = createDidHook_default(this, "filters");
  }
};
function createHooks() {
  return new _Hooks();
}
var createHooks_default = createHooks;

// ../../../node_modules/.pnpm/@wordpress+hooks@4.31.0/node_modules/@wordpress/hooks/build-module/index.js
var defaultHooks = createHooks_default();
var {
  addAction,
  addFilter,
  removeAction,
  removeFilter,
  hasAction,
  hasFilter,
  removeAllActions,
  removeAllFilters,
  doAction,
  doActionAsync,
  applyFilters,
  applyFiltersAsync,
  currentAction,
  currentFilter,
  doingAction,
  doingFilter,
  didAction,
  didFilter,
  actions,
  filters
} = defaultHooks;

// ../../../node_modules/.pnpm/@wordpress+deprecated@4.31.0/node_modules/@wordpress/deprecated/build-module/index.js
var logged = /* @__PURE__ */ Object.create(null);
function deprecated(feature, options = {}) {
  const {
    since,
    version,
    alternative,
    plugin,
    link,
    hint
  } = options;
  const pluginMessage = plugin ? ` from ${plugin}` : "";
  const sinceMessage = since ? ` since version ${since}` : "";
  const versionMessage = version ? ` and will be removed${pluginMessage} in version ${version}` : "";
  const useInsteadMessage = alternative ? ` Please use ${alternative} instead.` : "";
  const linkMessage = link ? ` See: ${link}` : "";
  const hintMessage = hint ? ` Note: ${hint}` : "";
  const message = `${feature} is deprecated${sinceMessage}${versionMessage}.${useInsteadMessage}${linkMessage}${hintMessage}`;
  if (message in logged) {
    return;
  }
  doAction("deprecated", feature, options, message);
  console.warn(message);
  logged[message] = true;
}

// ../../../node_modules/.pnpm/@wordpress+components@30.4.0_@types+react@18.3.25_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/context/context-system-provider.js
import deepmerge from "deepmerge";
import fastDeepEqual from "fast-deep-equal/es6";

// ../../../node_modules/.pnpm/@wordpress+warning@3.31.0/node_modules/@wordpress/warning/build-module/utils.js
var logged2 = /* @__PURE__ */ new Set();

// ../../../node_modules/.pnpm/@wordpress+warning@3.31.0/node_modules/@wordpress/warning/build-module/index.js
function isDev() {
  return globalThis.SCRIPT_DEBUG === true;
}
function warning(message) {
  if (!isDev()) {
    return;
  }
  if (logged2.has(message)) {
    return;
  }
  console.warn(message);
  try {
    throw Error(message);
  } catch (x2) {
  }
  logged2.add(message);
}

// ../../../node_modules/.pnpm/@wordpress+components@30.4.0_@types+react@18.3.25_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/utils/values.js
function isValueDefined(value) {
  return value !== void 0 && value !== null;
}

// ../../../node_modules/.pnpm/@wordpress+components@30.4.0_@types+react@18.3.25_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/utils/hooks/use-update-effect.js
function useUpdateEffect(effect, deps) {
  const mountedRef = useRef(false);
  useEffect(() => {
    if (mountedRef.current) {
      return effect();
    }
    mountedRef.current = true;
    return void 0;
  }, deps);
  useEffect(() => () => {
    mountedRef.current = false;
  }, []);
}
var use_update_effect_default = useUpdateEffect;

// ../../../node_modules/.pnpm/@emotion+react@11.14.0_@types+react@18.3.25_react@18.3.1/node_modules/@emotion/react/dist/emotion-element-d59e098f.esm.js
import * as React2 from "react";
import { useContext as useContext3, forwardRef as forwardRef3 } from "react";

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
  return dealloc(parse("", null, null, null, [""], value = alloc(value), 0, [0], value));
}
function parse(value, root, parent, rule, rules, rulesets, pseudo, points, declarations) {
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
                parse(characters2, root, reference, reference, props, rulesets, length2, points, children);
              else
                switch (atrule === 99 && charat(characters2, 3) === 110 ? 100 : atrule) {
                  // d l m s
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    parse(value, reference, reference, rule && append(ruleset(value, reference, reference, 0, 0, rules, points, type, rules, props = [], length2), children), rules, children, length2, points, rule ? props : children);
                    break;
                  default:
                    parse(characters2, reference, reference, reference, [""], children, 0, points, children);
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

// ../../../node_modules/.pnpm/@emotion+react@11.14.0_@types+react@18.3.25_react@18.3.1/node_modules/@emotion/react/dist/emotion-element-d59e098f.esm.js
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
import * as React from "react";
var isBrowser3 = typeof document !== "undefined";
var syncFallback = function syncFallback2(create) {
  return create();
};
var useInsertionEffect3 = React["useInsertionEffect"] ? React["useInsertionEffect"] : false;
var useInsertionEffectAlwaysWithSyncFallback = !isBrowser3 ? syncFallback : useInsertionEffect3 || syncFallback;

// ../../../node_modules/.pnpm/@emotion+react@11.14.0_@types+react@18.3.25_react@18.3.1/node_modules/@emotion/react/dist/emotion-element-d59e098f.esm.js
var isDevelopment3 = false;
var isBrowser4 = typeof document !== "undefined";
var EmotionCacheContext = /* @__PURE__ */ React2.createContext(
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
  return useContext3(EmotionCacheContext);
};
var withEmotionCache = function withEmotionCache2(func) {
  return /* @__PURE__ */ forwardRef3(function(props, ref) {
    var cache2 = useContext3(EmotionCacheContext);
    return func(props, cache2, ref);
  });
};
if (!isBrowser4) {
  withEmotionCache = function withEmotionCache3(func) {
    return function(props) {
      var cache2 = useContext3(EmotionCacheContext);
      if (cache2 === null) {
        cache2 = createCache({
          key: "css"
        });
        return /* @__PURE__ */ React2.createElement(EmotionCacheContext.Provider, {
          value: cache2
        }, func(props, cache2));
      } else {
        return func(props, cache2);
      }
    };
  };
}
var ThemeContext = /* @__PURE__ */ React2.createContext({});
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
    return /* @__PURE__ */ React2.createElement("style", (_ref22 = {}, _ref22["data-emotion"] = cache2.key + " " + serializedNames, _ref22.dangerouslySetInnerHTML = {
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
  var serialized = serializeStyles(registeredStyles, void 0, React2.useContext(ThemeContext));
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
  return /* @__PURE__ */ React2.createElement(React2.Fragment, null, /* @__PURE__ */ React2.createElement(Insertion, {
    cache: cache2,
    serialized,
    isStringTag: typeof WrappedComponent === "string"
  }), /* @__PURE__ */ React2.createElement(WrappedComponent, newProps));
});
var Emotion$1 = Emotion;

// ../../../node_modules/.pnpm/@emotion+react@11.14.0_@types+react@18.3.25_react@18.3.1/node_modules/@emotion/react/dist/emotion-react.esm.js
import * as React3 from "react";
import "@babel/runtime/helpers/extends";
var import_hoist_non_react_statics = __toESM(require_hoist_non_react_statics_cjs());
var jsx = function jsx2(type, props) {
  var args = arguments;
  if (props == null || !hasOwn.call(props, "css")) {
    return React3.createElement.apply(void 0, args);
  }
  var argsLength = args.length;
  var createElementArgArray = new Array(argsLength);
  createElementArgArray[0] = Emotion$1;
  createElementArgArray[1] = createEmotionProps(type, props);
  for (var i2 = 2; i2 < argsLength; i2++) {
    createElementArgArray[i2] = args[i2];
  }
  return React3.createElement.apply(null, createElementArgArray);
};
(function(_jsx8) {
  var JSX;
  /* @__PURE__ */ (function(_JSX) {
  })(JSX || (JSX = _jsx8.JSX || (_jsx8.JSX = {})));
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

// ../../../node_modules/.pnpm/@wordpress+components@30.4.0_@types+react@18.3.25_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/utils/hooks/use-cx.js
var isSerializedStyles = (o2) => typeof o2 !== "undefined" && o2 !== null && ["name", "styles"].every((p2) => typeof o2[p2] !== "undefined");
var useCx = () => {
  const cache2 = __unsafe_useEmotionCache();
  const cx2 = useCallback((...classNames) => {
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

// ../../../node_modules/.pnpm/@wordpress+components@30.4.0_@types+react@18.3.25_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/utils/colors.js
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

// ../../../node_modules/.pnpm/@wordpress+components@30.4.0_@types+react@18.3.25_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/utils/space.js
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

// ../../../node_modules/.pnpm/@wordpress+components@30.4.0_@types+react@18.3.25_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/utils/colors-values.js
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

// ../../../node_modules/.pnpm/@wordpress+components@30.4.0_@types+react@18.3.25_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/utils/config-values.js
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
  fontWeightHeading: "600",
  gridBase: "4px",
  cardPaddingXSmall: `${space(2)}`,
  cardPaddingSmall: `${space(4)}`,
  cardPaddingMedium: `${space(4)} ${space(6)}`,
  cardPaddingLarge: `${space(6)} ${space(8)}`,
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

// ../../../node_modules/.pnpm/@wordpress+components@30.4.0_@types+react@18.3.25_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/context/context-system-provider.js
import { jsx as _jsx } from "react/jsx-runtime";
var ComponentsContext = createContext(
  /** @type {Record<string, any>} */
  {}
);
ComponentsContext.displayName = "ComponentsContext";
var useComponentsContext = () => useContext(ComponentsContext);
function useContextSystemBridge({
  value
}) {
  const parentContext = useComponentsContext();
  const valueRef = useRef(value);
  use_update_effect_default(() => {
    if (
      // Objects are equivalent.
      fastDeepEqual(valueRef.current, value) && // But not the same reference.
      valueRef.current !== value
    ) {
      globalThis.SCRIPT_DEBUG === true ? warning(`Please memoize your context: ${JSON.stringify(value)}`) : void 0;
    }
  }, [value]);
  const config = useMemo(() => {
    return deepmerge(parentContext !== null && parentContext !== void 0 ? parentContext : {}, value !== null && value !== void 0 ? value : {}, {
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
  return /* @__PURE__ */ _jsx(ComponentsContext.Provider, {
    value: contextValue,
    children
  });
};
var ContextSystemProvider = memo(BaseContextSystemProvider);

// ../../../node_modules/.pnpm/@wordpress+components@30.4.0_@types+react@18.3.25_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/context/constants.js
var COMPONENT_NAMESPACE = "data-wp-component";
var CONNECTED_NAMESPACE = "data-wp-c16t";
var CONNECT_STATIC_NAMESPACE = "__contextSystemKey__";

// ../../../node_modules/.pnpm/@wordpress+components@30.4.0_@types+react@18.3.25_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/context/get-styled-class-name-from-key.js
function getStyledClassName(namespace) {
  const kebab = paramCase(namespace);
  return `components-${kebab}`;
}
var getStyledClassNameFromKey = memize(getStyledClassName);

// ../../../node_modules/.pnpm/@wordpress+components@30.4.0_@types+react@18.3.25_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/context/context-connect.js
function contextConnect(Component2, namespace) {
  return _contextConnect(Component2, namespace, {
    forwardsRef: true
  });
}
function _contextConnect(Component2, namespace, options) {
  const WrappedComponent = options?.forwardsRef ? forwardRef(Component2) : Component2;
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

// ../../../node_modules/.pnpm/@wordpress+components@30.4.0_@types+react@18.3.25_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/context/utils.js
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

// ../../../node_modules/.pnpm/@wordpress+components@30.4.0_@types+react@18.3.25_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/context/use-context-system.js
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

// ../../../node_modules/.pnpm/@emotion+styled@11.14.1_@emotion+react@11.14.0_@types+react@18.3.25_react@18.3.1__@types+react@18.3.25_react@18.3.1/node_modules/@emotion/styled/base/dist/emotion-styled-base.esm.js
import _extends2 from "@babel/runtime/helpers/esm/extends";
import * as React4 from "react";

// ../../../node_modules/.pnpm/@emotion+is-prop-valid@1.4.0/node_modules/@emotion/is-prop-valid/dist/emotion-is-prop-valid.esm.js
var reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|fetchpriority|fetchPriority|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|popover|popoverTarget|popoverTargetAction|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/;
var isPropValid = /* @__PURE__ */ memoize(
  function(prop) {
    return reactPropsRegex.test(prop) || prop.charCodeAt(0) === 111 && prop.charCodeAt(1) === 110 && prop.charCodeAt(2) < 91;
  }
  /* Z+1 */
);

// ../../../node_modules/.pnpm/@emotion+styled@11.14.1_@emotion+react@11.14.0_@types+react@18.3.25_react@18.3.1__@types+react@18.3.25_react@18.3.1/node_modules/@emotion/styled/base/dist/emotion-styled-base.esm.js
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
    return /* @__PURE__ */ React4.createElement("style", (_ref22 = {}, _ref22["data-emotion"] = cache2.key + " " + serializedNames, _ref22.dangerouslySetInnerHTML = {
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
        mergedProps.theme = React4.useContext(ThemeContext);
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
      return /* @__PURE__ */ React4.createElement(React4.Fragment, null, /* @__PURE__ */ React4.createElement(Insertion3, {
        cache: cache2,
        serialized,
        isStringTag: typeof FinalTag === "string"
      }), /* @__PURE__ */ React4.createElement(FinalTag, newProps));
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

// ../../../node_modules/.pnpm/@wordpress+components@30.4.0_@types+react@18.3.25_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/view/component.js
import { jsx as _jsx2 } from "react/jsx-runtime";
var PolymorphicDiv = /* @__PURE__ */ createStyled("div", process.env.NODE_ENV === "production" ? {
  target: "e19lxcc00"
} : {
  target: "e19lxcc00",
  label: "PolymorphicDiv"
})(process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvdmlldy9jb21wb25lbnQudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWVpQyIsImZpbGUiOiJAd29yZHByZXNzL2NvbXBvbmVudHMvc3JjL3ZpZXcvY29tcG9uZW50LnRzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogRXh0ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcblxuLyoqXG4gKiBXb3JkUHJlc3MgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB7IGZvcndhcmRSZWYgfSBmcm9tICdAd29yZHByZXNzL2VsZW1lbnQnO1xuXG4vKipcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgdHlwZSB7IFdvcmRQcmVzc0NvbXBvbmVudFByb3BzIH0gZnJvbSAnLi4vY29udGV4dCc7XG5cbmNvbnN0IFBvbHltb3JwaGljRGl2ID0gc3R5bGVkLmRpdmBgO1xuXG5mdW5jdGlvbiBVbmZvcndhcmRlZFZpZXc8IFQgZXh0ZW5kcyBSZWFjdC5FbGVtZW50VHlwZSA9ICdkaXYnID4oXG5cdHsgYXMsIC4uLnJlc3RQcm9wcyB9OiBXb3JkUHJlc3NDb21wb25lbnRQcm9wczwge30sIFQgPixcblx0cmVmOiBSZWFjdC5Gb3J3YXJkZWRSZWY8IGFueSA+XG4pIHtcblx0cmV0dXJuIDxQb2x5bW9ycGhpY0RpdiBhcz17IGFzIH0gcmVmPXsgcmVmIH0geyAuLi5yZXN0UHJvcHMgfSAvPjtcbn1cblxuLyoqXG4gKiBgVmlld2AgaXMgYSBjb3JlIGNvbXBvbmVudCB0aGF0IHJlbmRlcnMgZXZlcnl0aGluZyBpbiB0aGUgbGlicmFyeS5cbiAqIEl0IGlzIHRoZSBwcmluY2lwbGUgY29tcG9uZW50IGluIHRoZSBlbnRpcmUgbGlicmFyeS5cbiAqXG4gKiBgYGBqc3hcbiAqIGltcG9ydCB7IFZpZXcgfSBmcm9tIGBAd29yZHByZXNzL2NvbXBvbmVudHNgO1xuICpcbiAqIGZ1bmN0aW9uIEV4YW1wbGUoKSB7XG4gKiBcdHJldHVybiAoXG4gKiBcdFx0PFZpZXc+XG4gKiBcdFx0XHQgQ29kZSBpcyBQb2V0cnlcbiAqIFx0XHQ8L1ZpZXc+XG4gKiBcdCk7XG4gKiB9XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGNvbnN0IFZpZXcgPSBPYmplY3QuYXNzaWduKCBmb3J3YXJkUmVmKCBVbmZvcndhcmRlZFZpZXcgKSwge1xuXHRzZWxlY3RvcjogJy5jb21wb25lbnRzLXZpZXcnLFxufSApO1xuXG5leHBvcnQgZGVmYXVsdCBWaWV3O1xuIl19 */");
function UnforwardedView({
  as,
  ...restProps
}, ref) {
  return /* @__PURE__ */ _jsx2(PolymorphicDiv, {
    as,
    ref,
    ...restProps
  });
}
var View = Object.assign(forwardRef(UnforwardedView), {
  selector: ".components-view"
});
var component_default = View;

// ../../../node_modules/.pnpm/@wordpress+components@30.4.0_@types+react@18.3.25_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/utils/use-responsive-value.js
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
  const [value, setValue] = useState(defaultIndex);
  useEffect(() => {
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
  return (
    /** @type {T[]} */
    array[
      /* eslint-enable jsdoc/no-undefined-types */
      index >= array.length ? array.length - 1 : index
    ]
  );
}

// ../../../node_modules/.pnpm/@wordpress+components@30.4.0_@types+react@18.3.25_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/flex/styles.js
function _EMOTION_STRINGIFIED_CSS_ERROR__() {
  return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
}
var Flex = process.env.NODE_ENV === "production" ? {
  name: "zjik7",
  styles: "display:flex"
} : {
  name: "a57899-Flex",
  styles: "display:flex;label:Flex;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvZmxleC9zdHlsZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS3VCIiwiZmlsZSI6IkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvZmxleC9zdHlsZXMudHMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEV4dGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyBjc3MgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5cbmV4cG9ydCBjb25zdCBGbGV4ID0gY3NzYFxuXHRkaXNwbGF5OiBmbGV4O1xuYDtcblxuZXhwb3J0IGNvbnN0IEl0ZW0gPSBjc3NgXG5cdGRpc3BsYXk6IGJsb2NrO1xuXHRtYXgtaGVpZ2h0OiAxMDAlO1xuXHRtYXgtd2lkdGg6IDEwMCU7XG5cdG1pbi1oZWlnaHQ6IDA7XG5cdG1pbi13aWR0aDogMDtcbmA7XG5cbmV4cG9ydCBjb25zdCBibG9jayA9IGNzc2Bcblx0ZmxleDogMTtcbmA7XG5cbi8qKlxuICogV29ya2Fyb3VuZCB0byBvcHRpbWl6ZSBET00gcmVuZGVyaW5nLlxuICogV2UnbGwgZW5oYW5jZSBhbGlnbm1lbnQgd2l0aCBuYWl2ZSBwYXJlbnQgZmxleCBhc3N1bXB0aW9ucy5cbiAqXG4gKiBUcmFkZS1vZmY6XG4gKiBGYXIgbGVzcyBET00gbGVzcy4gSG93ZXZlciwgVUkgcmVuZGVyaW5nIGlzIG5vdCBhcyByZWxpYWJsZS5cbiAqL1xuXG4vKipcbiAqIEltcHJvdmVzIHN0YWJpbGl0eSBvZiB3aWR0aC9oZWlnaHQgcmVuZGVyaW5nLlxuICogaHR0cHM6Ly9naXRodWIuY29tL0l0c0pvblEvZzIvcHVsbC8xNDlcbiAqL1xuZXhwb3J0IGNvbnN0IEl0ZW1zQ29sdW1uID0gY3NzYFxuXHQ+ICoge1xuXHRcdG1pbi1oZWlnaHQ6IDA7XG5cdH1cbmA7XG5cbmV4cG9ydCBjb25zdCBJdGVtc1JvdyA9IGNzc2Bcblx0PiAqIHtcblx0XHRtaW4td2lkdGg6IDA7XG5cdH1cbmA7XG4iXX0= */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
};
var Item = process.env.NODE_ENV === "production" ? {
  name: "qgaee5",
  styles: "display:block;max-height:100%;max-width:100%;min-height:0;min-width:0"
} : {
  name: "14ac8g8-Item",
  styles: "display:block;max-height:100%;max-width:100%;min-height:0;min-width:0;label:Item;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvZmxleC9zdHlsZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBU3VCIiwiZmlsZSI6IkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvZmxleC9zdHlsZXMudHMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEV4dGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyBjc3MgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5cbmV4cG9ydCBjb25zdCBGbGV4ID0gY3NzYFxuXHRkaXNwbGF5OiBmbGV4O1xuYDtcblxuZXhwb3J0IGNvbnN0IEl0ZW0gPSBjc3NgXG5cdGRpc3BsYXk6IGJsb2NrO1xuXHRtYXgtaGVpZ2h0OiAxMDAlO1xuXHRtYXgtd2lkdGg6IDEwMCU7XG5cdG1pbi1oZWlnaHQ6IDA7XG5cdG1pbi13aWR0aDogMDtcbmA7XG5cbmV4cG9ydCBjb25zdCBibG9jayA9IGNzc2Bcblx0ZmxleDogMTtcbmA7XG5cbi8qKlxuICogV29ya2Fyb3VuZCB0byBvcHRpbWl6ZSBET00gcmVuZGVyaW5nLlxuICogV2UnbGwgZW5oYW5jZSBhbGlnbm1lbnQgd2l0aCBuYWl2ZSBwYXJlbnQgZmxleCBhc3N1bXB0aW9ucy5cbiAqXG4gKiBUcmFkZS1vZmY6XG4gKiBGYXIgbGVzcyBET00gbGVzcy4gSG93ZXZlciwgVUkgcmVuZGVyaW5nIGlzIG5vdCBhcyByZWxpYWJsZS5cbiAqL1xuXG4vKipcbiAqIEltcHJvdmVzIHN0YWJpbGl0eSBvZiB3aWR0aC9oZWlnaHQgcmVuZGVyaW5nLlxuICogaHR0cHM6Ly9naXRodWIuY29tL0l0c0pvblEvZzIvcHVsbC8xNDlcbiAqL1xuZXhwb3J0IGNvbnN0IEl0ZW1zQ29sdW1uID0gY3NzYFxuXHQ+ICoge1xuXHRcdG1pbi1oZWlnaHQ6IDA7XG5cdH1cbmA7XG5cbmV4cG9ydCBjb25zdCBJdGVtc1JvdyA9IGNzc2Bcblx0PiAqIHtcblx0XHRtaW4td2lkdGg6IDA7XG5cdH1cbmA7XG4iXX0= */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
};
var block = process.env.NODE_ENV === "production" ? {
  name: "82a6rk",
  styles: "flex:1"
} : {
  name: "1ya6i3g-block",
  styles: "flex:1;label:block;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvZmxleC9zdHlsZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBaUJ3QiIsImZpbGUiOiJAd29yZHByZXNzL2NvbXBvbmVudHMvc3JjL2ZsZXgvc3R5bGVzLnRzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuXG5leHBvcnQgY29uc3QgRmxleCA9IGNzc2Bcblx0ZGlzcGxheTogZmxleDtcbmA7XG5cbmV4cG9ydCBjb25zdCBJdGVtID0gY3NzYFxuXHRkaXNwbGF5OiBibG9jaztcblx0bWF4LWhlaWdodDogMTAwJTtcblx0bWF4LXdpZHRoOiAxMDAlO1xuXHRtaW4taGVpZ2h0OiAwO1xuXHRtaW4td2lkdGg6IDA7XG5gO1xuXG5leHBvcnQgY29uc3QgYmxvY2sgPSBjc3NgXG5cdGZsZXg6IDE7XG5gO1xuXG4vKipcbiAqIFdvcmthcm91bmQgdG8gb3B0aW1pemUgRE9NIHJlbmRlcmluZy5cbiAqIFdlJ2xsIGVuaGFuY2UgYWxpZ25tZW50IHdpdGggbmFpdmUgcGFyZW50IGZsZXggYXNzdW1wdGlvbnMuXG4gKlxuICogVHJhZGUtb2ZmOlxuICogRmFyIGxlc3MgRE9NIGxlc3MuIEhvd2V2ZXIsIFVJIHJlbmRlcmluZyBpcyBub3QgYXMgcmVsaWFibGUuXG4gKi9cblxuLyoqXG4gKiBJbXByb3ZlcyBzdGFiaWxpdHkgb2Ygd2lkdGgvaGVpZ2h0IHJlbmRlcmluZy5cbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9JdHNKb25RL2cyL3B1bGwvMTQ5XG4gKi9cbmV4cG9ydCBjb25zdCBJdGVtc0NvbHVtbiA9IGNzc2Bcblx0PiAqIHtcblx0XHRtaW4taGVpZ2h0OiAwO1xuXHR9XG5gO1xuXG5leHBvcnQgY29uc3QgSXRlbXNSb3cgPSBjc3NgXG5cdD4gKiB7XG5cdFx0bWluLXdpZHRoOiAwO1xuXHR9XG5gO1xuIl19 */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
};
var ItemsColumn = process.env.NODE_ENV === "production" ? {
  name: "13nosa1",
  styles: ">*{min-height:0;}"
} : {
  name: "9k4k7f-ItemsColumn",
  styles: ">*{min-height:0;};label:ItemsColumn;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvZmxleC9zdHlsZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBaUM4QiIsImZpbGUiOiJAd29yZHByZXNzL2NvbXBvbmVudHMvc3JjL2ZsZXgvc3R5bGVzLnRzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuXG5leHBvcnQgY29uc3QgRmxleCA9IGNzc2Bcblx0ZGlzcGxheTogZmxleDtcbmA7XG5cbmV4cG9ydCBjb25zdCBJdGVtID0gY3NzYFxuXHRkaXNwbGF5OiBibG9jaztcblx0bWF4LWhlaWdodDogMTAwJTtcblx0bWF4LXdpZHRoOiAxMDAlO1xuXHRtaW4taGVpZ2h0OiAwO1xuXHRtaW4td2lkdGg6IDA7XG5gO1xuXG5leHBvcnQgY29uc3QgYmxvY2sgPSBjc3NgXG5cdGZsZXg6IDE7XG5gO1xuXG4vKipcbiAqIFdvcmthcm91bmQgdG8gb3B0aW1pemUgRE9NIHJlbmRlcmluZy5cbiAqIFdlJ2xsIGVuaGFuY2UgYWxpZ25tZW50IHdpdGggbmFpdmUgcGFyZW50IGZsZXggYXNzdW1wdGlvbnMuXG4gKlxuICogVHJhZGUtb2ZmOlxuICogRmFyIGxlc3MgRE9NIGxlc3MuIEhvd2V2ZXIsIFVJIHJlbmRlcmluZyBpcyBub3QgYXMgcmVsaWFibGUuXG4gKi9cblxuLyoqXG4gKiBJbXByb3ZlcyBzdGFiaWxpdHkgb2Ygd2lkdGgvaGVpZ2h0IHJlbmRlcmluZy5cbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9JdHNKb25RL2cyL3B1bGwvMTQ5XG4gKi9cbmV4cG9ydCBjb25zdCBJdGVtc0NvbHVtbiA9IGNzc2Bcblx0PiAqIHtcblx0XHRtaW4taGVpZ2h0OiAwO1xuXHR9XG5gO1xuXG5leHBvcnQgY29uc3QgSXRlbXNSb3cgPSBjc3NgXG5cdD4gKiB7XG5cdFx0bWluLXdpZHRoOiAwO1xuXHR9XG5gO1xuIl19 */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
};
var ItemsRow = process.env.NODE_ENV === "production" ? {
  name: "1pwxzk4",
  styles: ">*{min-width:0;}"
} : {
  name: "1ozeagb-ItemsRow",
  styles: ">*{min-width:0;};label:ItemsRow;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvZmxleC9zdHlsZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBdUMyQiIsImZpbGUiOiJAd29yZHByZXNzL2NvbXBvbmVudHMvc3JjL2ZsZXgvc3R5bGVzLnRzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuXG5leHBvcnQgY29uc3QgRmxleCA9IGNzc2Bcblx0ZGlzcGxheTogZmxleDtcbmA7XG5cbmV4cG9ydCBjb25zdCBJdGVtID0gY3NzYFxuXHRkaXNwbGF5OiBibG9jaztcblx0bWF4LWhlaWdodDogMTAwJTtcblx0bWF4LXdpZHRoOiAxMDAlO1xuXHRtaW4taGVpZ2h0OiAwO1xuXHRtaW4td2lkdGg6IDA7XG5gO1xuXG5leHBvcnQgY29uc3QgYmxvY2sgPSBjc3NgXG5cdGZsZXg6IDE7XG5gO1xuXG4vKipcbiAqIFdvcmthcm91bmQgdG8gb3B0aW1pemUgRE9NIHJlbmRlcmluZy5cbiAqIFdlJ2xsIGVuaGFuY2UgYWxpZ25tZW50IHdpdGggbmFpdmUgcGFyZW50IGZsZXggYXNzdW1wdGlvbnMuXG4gKlxuICogVHJhZGUtb2ZmOlxuICogRmFyIGxlc3MgRE9NIGxlc3MuIEhvd2V2ZXIsIFVJIHJlbmRlcmluZyBpcyBub3QgYXMgcmVsaWFibGUuXG4gKi9cblxuLyoqXG4gKiBJbXByb3ZlcyBzdGFiaWxpdHkgb2Ygd2lkdGgvaGVpZ2h0IHJlbmRlcmluZy5cbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9JdHNKb25RL2cyL3B1bGwvMTQ5XG4gKi9cbmV4cG9ydCBjb25zdCBJdGVtc0NvbHVtbiA9IGNzc2Bcblx0PiAqIHtcblx0XHRtaW4taGVpZ2h0OiAwO1xuXHR9XG5gO1xuXG5leHBvcnQgY29uc3QgSXRlbXNSb3cgPSBjc3NgXG5cdD4gKiB7XG5cdFx0bWluLXdpZHRoOiAwO1xuXHR9XG5gO1xuIl19 */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
};

// ../../../node_modules/.pnpm/@wordpress+components@30.4.0_@types+react@18.3.25_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/flex/flex/hook.js
function useDeprecatedProps(props) {
  const {
    isReversed,
    ...otherProps
  } = props;
  if (typeof isReversed !== "undefined") {
    deprecated("Flex isReversed", {
      alternative: 'Flex direction="row-reverse" or "column-reverse"',
      since: "5.9"
    });
    return {
      ...otherProps,
      direction: isReversed ? "row-reverse" : "row"
    };
  }
  return otherProps;
}
function useFlex(props) {
  const {
    align,
    className,
    direction: directionProp = "row",
    expanded = true,
    gap = 2,
    justify = "space-between",
    wrap = false,
    ...otherProps
  } = useContextSystem(useDeprecatedProps(props), "Flex");
  const directionAsArray = Array.isArray(directionProp) ? directionProp : [directionProp];
  const direction = useResponsiveValue(directionAsArray);
  const isColumn = typeof direction === "string" && !!direction.includes("column");
  const cx2 = useCx();
  const classes = useMemo(() => {
    const base = /* @__PURE__ */ css({
      alignItems: align !== null && align !== void 0 ? align : isColumn ? "normal" : "center",
      flexDirection: direction,
      flexWrap: wrap ? "wrap" : void 0,
      gap: space(gap),
      justifyContent: justify,
      height: isColumn && expanded ? "100%" : void 0,
      width: !isColumn && expanded ? "100%" : void 0
    }, process.env.NODE_ENV === "production" ? "" : ";label:base;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvZmxleC9mbGV4L2hvb2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBZ0VlIiwiZmlsZSI6IkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvZmxleC9mbGV4L2hvb2sudHMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEV4dGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyBjc3MgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5cbi8qKlxuICogV29yZFByZXNzIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyB1c2VNZW1vIH0gZnJvbSAnQHdvcmRwcmVzcy9lbGVtZW50JztcbmltcG9ydCBkZXByZWNhdGVkIGZyb20gJ0B3b3JkcHJlc3MvZGVwcmVjYXRlZCc7XG5cbi8qKlxuICogSW50ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB0eXBlIHsgV29yZFByZXNzQ29tcG9uZW50UHJvcHMgfSBmcm9tICcuLi8uLi9jb250ZXh0JztcbmltcG9ydCB7IHVzZUNvbnRleHRTeXN0ZW0gfSBmcm9tICcuLi8uLi9jb250ZXh0JztcbmltcG9ydCB7IHVzZVJlc3BvbnNpdmVWYWx1ZSB9IGZyb20gJy4uLy4uL3V0aWxzL3VzZS1yZXNwb25zaXZlLXZhbHVlJztcbmltcG9ydCB7IHNwYWNlIH0gZnJvbSAnLi4vLi4vdXRpbHMvc3BhY2UnO1xuaW1wb3J0ICogYXMgc3R5bGVzIGZyb20gJy4uL3N0eWxlcyc7XG5pbXBvcnQgeyB1c2VDeCB9IGZyb20gJy4uLy4uL3V0aWxzJztcbmltcG9ydCB0eXBlIHsgRmxleFByb3BzIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG5mdW5jdGlvbiB1c2VEZXByZWNhdGVkUHJvcHMoXG5cdHByb3BzOiBXb3JkUHJlc3NDb21wb25lbnRQcm9wczwgRmxleFByb3BzLCAnZGl2JyA+XG4pOiBPbWl0PCB0eXBlb2YgcHJvcHMsICdpc1JldmVyc2VkJyA+IHtcblx0Y29uc3QgeyBpc1JldmVyc2VkLCAuLi5vdGhlclByb3BzIH0gPSBwcm9wcztcblxuXHRpZiAoIHR5cGVvZiBpc1JldmVyc2VkICE9PSAndW5kZWZpbmVkJyApIHtcblx0XHRkZXByZWNhdGVkKCAnRmxleCBpc1JldmVyc2VkJywge1xuXHRcdFx0YWx0ZXJuYXRpdmU6ICdGbGV4IGRpcmVjdGlvbj1cInJvdy1yZXZlcnNlXCIgb3IgXCJjb2x1bW4tcmV2ZXJzZVwiJyxcblx0XHRcdHNpbmNlOiAnNS45Jyxcblx0XHR9ICk7XG5cdFx0cmV0dXJuIHtcblx0XHRcdC4uLm90aGVyUHJvcHMsXG5cdFx0XHRkaXJlY3Rpb246IGlzUmV2ZXJzZWQgPyAncm93LXJldmVyc2UnIDogJ3JvdycsXG5cdFx0fTtcblx0fVxuXG5cdHJldHVybiBvdGhlclByb3BzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXNlRmxleCggcHJvcHM6IFdvcmRQcmVzc0NvbXBvbmVudFByb3BzPCBGbGV4UHJvcHMsICdkaXYnID4gKSB7XG5cdGNvbnN0IHtcblx0XHRhbGlnbixcblx0XHRjbGFzc05hbWUsXG5cdFx0ZGlyZWN0aW9uOiBkaXJlY3Rpb25Qcm9wID0gJ3JvdycsXG5cdFx0ZXhwYW5kZWQgPSB0cnVlLFxuXHRcdGdhcCA9IDIsXG5cdFx0anVzdGlmeSA9ICdzcGFjZS1iZXR3ZWVuJyxcblx0XHR3cmFwID0gZmFsc2UsXG5cdFx0Li4ub3RoZXJQcm9wc1xuXHR9ID0gdXNlQ29udGV4dFN5c3RlbSggdXNlRGVwcmVjYXRlZFByb3BzKCBwcm9wcyApLCAnRmxleCcgKTtcblxuXHRjb25zdCBkaXJlY3Rpb25Bc0FycmF5ID0gQXJyYXkuaXNBcnJheSggZGlyZWN0aW9uUHJvcCApXG5cdFx0PyBkaXJlY3Rpb25Qcm9wXG5cdFx0OiBbIGRpcmVjdGlvblByb3AgXTtcblx0Y29uc3QgZGlyZWN0aW9uID0gdXNlUmVzcG9uc2l2ZVZhbHVlKCBkaXJlY3Rpb25Bc0FycmF5ICk7XG5cblx0Y29uc3QgaXNDb2x1bW4gPVxuXHRcdHR5cGVvZiBkaXJlY3Rpb24gPT09ICdzdHJpbmcnICYmICEhIGRpcmVjdGlvbi5pbmNsdWRlcyggJ2NvbHVtbicgKTtcblxuXHRjb25zdCBjeCA9IHVzZUN4KCk7XG5cblx0Y29uc3QgY2xhc3NlcyA9IHVzZU1lbW8oICgpID0+IHtcblx0XHRjb25zdCBiYXNlID0gY3NzKCB7XG5cdFx0XHRhbGlnbkl0ZW1zOiBhbGlnbiA/PyAoIGlzQ29sdW1uID8gJ25vcm1hbCcgOiAnY2VudGVyJyApLFxuXHRcdFx0ZmxleERpcmVjdGlvbjogZGlyZWN0aW9uLFxuXHRcdFx0ZmxleFdyYXA6IHdyYXAgPyAnd3JhcCcgOiB1bmRlZmluZWQsXG5cdFx0XHRnYXA6IHNwYWNlKCBnYXAgKSxcblx0XHRcdGp1c3RpZnlDb250ZW50OiBqdXN0aWZ5LFxuXHRcdFx0aGVpZ2h0OiBpc0NvbHVtbiAmJiBleHBhbmRlZCA/ICcxMDAlJyA6IHVuZGVmaW5lZCxcblx0XHRcdHdpZHRoOiAhIGlzQ29sdW1uICYmIGV4cGFuZGVkID8gJzEwMCUnIDogdW5kZWZpbmVkLFxuXHRcdH0gKTtcblxuXHRcdHJldHVybiBjeChcblx0XHRcdHN0eWxlcy5GbGV4LFxuXHRcdFx0YmFzZSxcblx0XHRcdGlzQ29sdW1uID8gc3R5bGVzLkl0ZW1zQ29sdW1uIDogc3R5bGVzLkl0ZW1zUm93LFxuXHRcdFx0Y2xhc3NOYW1lXG5cdFx0KTtcblx0fSwgW1xuXHRcdGFsaWduLFxuXHRcdGNsYXNzTmFtZSxcblx0XHRjeCxcblx0XHRkaXJlY3Rpb24sXG5cdFx0ZXhwYW5kZWQsXG5cdFx0Z2FwLFxuXHRcdGlzQ29sdW1uLFxuXHRcdGp1c3RpZnksXG5cdFx0d3JhcCxcblx0XSApO1xuXG5cdHJldHVybiB7IC4uLm90aGVyUHJvcHMsIGNsYXNzTmFtZTogY2xhc3NlcywgaXNDb2x1bW4gfTtcbn1cbiJdfQ== */");
    return cx2(Flex, base, isColumn ? ItemsColumn : ItemsRow, className);
  }, [align, className, cx2, direction, expanded, gap, isColumn, justify, wrap]);
  return {
    ...otherProps,
    className: classes,
    isColumn
  };
}

// ../../../node_modules/.pnpm/@wordpress+components@30.4.0_@types+react@18.3.25_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/flex/context.js
var FlexContext = createContext({
  flexItemDisplay: void 0
});
var useFlexContext = () => useContext(FlexContext);

// ../../../node_modules/.pnpm/@wordpress+components@30.4.0_@types+react@18.3.25_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/flex/flex-item/hook.js
function useFlexItem(props) {
  const {
    className,
    display: displayProp,
    isBlock = false,
    ...otherProps
  } = useContextSystem(props, "FlexItem");
  const sx = {};
  const contextDisplay = useFlexContext().flexItemDisplay;
  sx.Base = /* @__PURE__ */ css({
    display: displayProp || contextDisplay
  }, process.env.NODE_ENV === "production" ? "" : ";label:sx-Base;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvZmxleC9mbGV4LWl0ZW0vaG9vay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFnQ1ciLCJmaWxlIjoiQHdvcmRwcmVzcy9jb21wb25lbnRzL3NyYy9mbGV4L2ZsZXgtaXRlbS9ob29rLnRzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHR5cGUgeyBTZXJpYWxpemVkU3R5bGVzIH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuXG4vKipcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgdHlwZSB7IFdvcmRQcmVzc0NvbXBvbmVudFByb3BzIH0gZnJvbSAnLi4vLi4vY29udGV4dCc7XG5pbXBvcnQgeyB1c2VDb250ZXh0U3lzdGVtIH0gZnJvbSAnLi4vLi4vY29udGV4dCc7XG5pbXBvcnQgeyB1c2VGbGV4Q29udGV4dCB9IGZyb20gJy4uL2NvbnRleHQnO1xuaW1wb3J0ICogYXMgc3R5bGVzIGZyb20gJy4uL3N0eWxlcyc7XG5pbXBvcnQgeyB1c2VDeCB9IGZyb20gJy4uLy4uL3V0aWxzL2hvb2tzL3VzZS1jeCc7XG5pbXBvcnQgdHlwZSB7IEZsZXhJdGVtUHJvcHMgfSBmcm9tICcuLi90eXBlcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VGbGV4SXRlbShcblx0cHJvcHM6IFdvcmRQcmVzc0NvbXBvbmVudFByb3BzPCBGbGV4SXRlbVByb3BzLCAnZGl2JyA+XG4pIHtcblx0Y29uc3Qge1xuXHRcdGNsYXNzTmFtZSxcblx0XHRkaXNwbGF5OiBkaXNwbGF5UHJvcCxcblx0XHRpc0Jsb2NrID0gZmFsc2UsXG5cdFx0Li4ub3RoZXJQcm9wc1xuXHR9ID0gdXNlQ29udGV4dFN5c3RlbSggcHJvcHMsICdGbGV4SXRlbScgKTtcblxuXHRjb25zdCBzeDoge1xuXHRcdEJhc2U/OiBTZXJpYWxpemVkU3R5bGVzO1xuXHR9ID0ge307XG5cblx0Y29uc3QgY29udGV4dERpc3BsYXkgPSB1c2VGbGV4Q29udGV4dCgpLmZsZXhJdGVtRGlzcGxheTtcblxuXHRzeC5CYXNlID0gY3NzKCB7XG5cdFx0ZGlzcGxheTogZGlzcGxheVByb3AgfHwgY29udGV4dERpc3BsYXksXG5cdH0gKTtcblxuXHRjb25zdCBjeCA9IHVzZUN4KCk7XG5cblx0Y29uc3QgY2xhc3NlcyA9IGN4KFxuXHRcdHN0eWxlcy5JdGVtLFxuXHRcdHN4LkJhc2UsXG5cdFx0aXNCbG9jayAmJiBzdHlsZXMuYmxvY2ssXG5cdFx0Y2xhc3NOYW1lXG5cdCk7XG5cblx0cmV0dXJuIHtcblx0XHQuLi5vdGhlclByb3BzLFxuXHRcdGNsYXNzTmFtZTogY2xhc3Nlcyxcblx0fTtcbn1cbiJdfQ== */");
  const cx2 = useCx();
  const classes = cx2(Item, sx.Base, isBlock && block, className);
  return {
    ...otherProps,
    className: classes
  };
}

// ../../../node_modules/.pnpm/@wordpress+components@30.4.0_@types+react@18.3.25_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/flex/flex-item/component.js
import { jsx as _jsx3 } from "react/jsx-runtime";
function UnconnectedFlexItem(props, forwardedRef) {
  const flexItemProps = useFlexItem(props);
  return /* @__PURE__ */ _jsx3(component_default, {
    ...flexItemProps,
    ref: forwardedRef
  });
}
var FlexItem = contextConnect(UnconnectedFlexItem, "FlexItem");
var component_default2 = FlexItem;

// ../../../node_modules/.pnpm/@wordpress+components@30.4.0_@types+react@18.3.25_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/truncate/styles.js
function _EMOTION_STRINGIFIED_CSS_ERROR__2() {
  return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
}
var Truncate = process.env.NODE_ENV === "production" ? {
  name: "hdknak",
  styles: "display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap"
} : {
  name: "abxxyf-Truncate",
  styles: "display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;label:Truncate;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvdHJ1bmNhdGUvc3R5bGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUsyQiIsImZpbGUiOiJAd29yZHByZXNzL2NvbXBvbmVudHMvc3JjL3RydW5jYXRlL3N0eWxlcy50cyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogRXh0ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB7IGNzcyB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcblxuZXhwb3J0IGNvbnN0IFRydW5jYXRlID0gY3NzYFxuXHRkaXNwbGF5OiBibG9jaztcblx0b3ZlcmZsb3c6IGhpZGRlbjtcblx0dGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG5cdHdoaXRlLXNwYWNlOiBub3dyYXA7XG5gO1xuIl19 */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__2
};

// ../../../node_modules/.pnpm/@wordpress+components@30.4.0_@types+react@18.3.25_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/truncate/utils.js
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

// ../../../node_modules/.pnpm/@wordpress+components@30.4.0_@types+react@18.3.25_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/truncate/hook.js
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
  const classes = useMemo(() => {
    const truncateLines = /* @__PURE__ */ css(numberOfLines === 1 ? "word-break: break-all;" : "", " -webkit-box-orient:vertical;-webkit-line-clamp:", numberOfLines, ";display:-webkit-box;overflow:hidden;" + (process.env.NODE_ENV === "production" ? "" : ";label:truncateLines;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvdHJ1bmNhdGUvaG9vay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUEwRDJCIiwiZmlsZSI6IkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvdHJ1bmNhdGUvaG9vay50cyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogRXh0ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB7IGNzcyB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcblxuLyoqXG4gKiBXb3JkUHJlc3MgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB7IHVzZU1lbW8gfSBmcm9tICdAd29yZHByZXNzL2VsZW1lbnQnO1xuXG4vKipcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgdHlwZSB7IFdvcmRQcmVzc0NvbXBvbmVudFByb3BzIH0gZnJvbSAnLi4vY29udGV4dCc7XG5pbXBvcnQgeyB1c2VDb250ZXh0U3lzdGVtIH0gZnJvbSAnLi4vY29udGV4dCc7XG5pbXBvcnQgKiBhcyBzdHlsZXMgZnJvbSAnLi9zdHlsZXMnO1xuaW1wb3J0IHsgVFJVTkNBVEVfRUxMSVBTSVMsIFRSVU5DQVRFX1RZUEUsIHRydW5jYXRlQ29udGVudCB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHsgdXNlQ3ggfSBmcm9tICcuLi91dGlscy9ob29rcy91c2UtY3gnO1xuaW1wb3J0IHR5cGUgeyBUcnVuY2F0ZVByb3BzIH0gZnJvbSAnLi90eXBlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHVzZVRydW5jYXRlKFxuXHRwcm9wczogV29yZFByZXNzQ29tcG9uZW50UHJvcHM8IFRydW5jYXRlUHJvcHMsICdzcGFuJyA+XG4pIHtcblx0Y29uc3Qge1xuXHRcdGNsYXNzTmFtZSxcblx0XHRjaGlsZHJlbixcblx0XHRlbGxpcHNpcyA9IFRSVU5DQVRFX0VMTElQU0lTLFxuXHRcdGVsbGlwc2l6ZU1vZGUgPSBUUlVOQ0FURV9UWVBFLmF1dG8sXG5cdFx0bGltaXQgPSAwLFxuXHRcdG51bWJlck9mTGluZXMgPSAwLFxuXHRcdC4uLm90aGVyUHJvcHNcblx0fSA9IHVzZUNvbnRleHRTeXN0ZW0oIHByb3BzLCAnVHJ1bmNhdGUnICk7XG5cblx0Y29uc3QgY3ggPSB1c2VDeCgpO1xuXG5cdGxldCBjaGlsZHJlbkFzVGV4dDtcblx0aWYgKCB0eXBlb2YgY2hpbGRyZW4gPT09ICdzdHJpbmcnICkge1xuXHRcdGNoaWxkcmVuQXNUZXh0ID0gY2hpbGRyZW47XG5cdH0gZWxzZSBpZiAoIHR5cGVvZiBjaGlsZHJlbiA9PT0gJ251bWJlcicgKSB7XG5cdFx0Y2hpbGRyZW5Bc1RleHQgPSBjaGlsZHJlbi50b1N0cmluZygpO1xuXHR9XG5cblx0Y29uc3QgdHJ1bmNhdGVkQ29udGVudCA9IGNoaWxkcmVuQXNUZXh0XG5cdFx0PyB0cnVuY2F0ZUNvbnRlbnQoIGNoaWxkcmVuQXNUZXh0LCB7XG5cdFx0XHRcdGVsbGlwc2lzLFxuXHRcdFx0XHRlbGxpcHNpemVNb2RlLFxuXHRcdFx0XHRsaW1pdCxcblx0XHRcdFx0bnVtYmVyT2ZMaW5lcyxcblx0XHQgIH0gKVxuXHRcdDogY2hpbGRyZW47XG5cblx0Y29uc3Qgc2hvdWxkVHJ1bmNhdGUgPVxuXHRcdCEhIGNoaWxkcmVuQXNUZXh0ICYmIGVsbGlwc2l6ZU1vZGUgPT09IFRSVU5DQVRFX1RZUEUuYXV0bztcblxuXHRjb25zdCBjbGFzc2VzID0gdXNlTWVtbyggKCkgPT4ge1xuXHRcdC8vIFRoZSBgd29yZC1icmVhazogYnJlYWstYWxsYCBwcm9wZXJ0eSBmaXJzdCBtYWtlcyBzdXJlIGEgdGV4dCBsaW5lXG5cdFx0Ly8gYnJlYWtzIGV2ZW4gd2hlbiBpdCBjb250YWlucyAndW5icmVha2FibGUnIGNvbnRlbnQgc3VjaCBhcyBsb25nIFVSTHMuXG5cdFx0Ly8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9Xb3JkUHJlc3MvZ3V0ZW5iZXJnL2lzc3Vlcy82MDg2MC5cblx0XHRjb25zdCB0cnVuY2F0ZUxpbmVzID0gY3NzYFxuXHRcdFx0JHsgbnVtYmVyT2ZMaW5lcyA9PT0gMSA/ICd3b3JkLWJyZWFrOiBicmVhay1hbGw7JyA6ICcnIH1cblx0XHRcdC13ZWJraXQtYm94LW9yaWVudDogdmVydGljYWw7XG5cdFx0XHQtd2Via2l0LWxpbmUtY2xhbXA6ICR7IG51bWJlck9mTGluZXMgfTtcblx0XHRcdGRpc3BsYXk6IC13ZWJraXQtYm94O1xuXHRcdFx0b3ZlcmZsb3c6IGhpZGRlbjtcblx0XHRgO1xuXG5cdFx0cmV0dXJuIGN4KFxuXHRcdFx0c2hvdWxkVHJ1bmNhdGUgJiYgISBudW1iZXJPZkxpbmVzICYmIHN0eWxlcy5UcnVuY2F0ZSxcblx0XHRcdHNob3VsZFRydW5jYXRlICYmICEhIG51bWJlck9mTGluZXMgJiYgdHJ1bmNhdGVMaW5lcyxcblx0XHRcdGNsYXNzTmFtZVxuXHRcdCk7XG5cdH0sIFsgY2xhc3NOYW1lLCBjeCwgbnVtYmVyT2ZMaW5lcywgc2hvdWxkVHJ1bmNhdGUgXSApO1xuXG5cdHJldHVybiB7IC4uLm90aGVyUHJvcHMsIGNsYXNzTmFtZTogY2xhc3NlcywgY2hpbGRyZW46IHRydW5jYXRlZENvbnRlbnQgfTtcbn1cbiJdfQ== */");
    return cx2(shouldTruncate && !numberOfLines && Truncate, shouldTruncate && !!numberOfLines && truncateLines, className);
  }, [className, cx2, numberOfLines, shouldTruncate]);
  return {
    ...otherProps,
    className: classes,
    children: truncatedContent
  };
}

// ../../../node_modules/.pnpm/@wordpress+components@30.4.0_@types+react@18.3.25_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/text/styles.js
var styles_exports3 = {};
__export(styles_exports3, {
  Text: () => Text,
  block: () => block2,
  destructive: () => destructive,
  highlighterText: () => highlighterText,
  muted: () => muted,
  positive: () => positive,
  upperCase: () => upperCase
});
function _EMOTION_STRINGIFIED_CSS_ERROR__3() {
  return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
}
var Text = /* @__PURE__ */ css("color:", COLORS.theme.foreground, ";line-height:", config_values_default.fontLineHeightBase, ";margin:0;text-wrap:balance;text-wrap:pretty;" + (process.env.NODE_ENV === "production" ? "" : ";label:Text;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvdGV4dC9zdHlsZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBVXVCIiwiZmlsZSI6IkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvdGV4dC9zdHlsZXMudHMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEV4dGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyBjc3MgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5cbi8qKlxuICogSW50ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB7IENPTE9SUywgQ09ORklHIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgY29uc3QgVGV4dCA9IGNzc2Bcblx0Y29sb3I6ICR7IENPTE9SUy50aGVtZS5mb3JlZ3JvdW5kIH07XG5cdGxpbmUtaGVpZ2h0OiAkeyBDT05GSUcuZm9udExpbmVIZWlnaHRCYXNlIH07XG5cdG1hcmdpbjogMDtcblx0dGV4dC13cmFwOiBiYWxhbmNlOyAvKiBGYWxsYmFjayBmb3IgU2FmYXJpLiAqL1xuXHR0ZXh0LXdyYXA6IHByZXR0eTtcbmA7XG5cbmV4cG9ydCBjb25zdCBibG9jayA9IGNzc2Bcblx0ZGlzcGxheTogYmxvY2s7XG5gO1xuXG5leHBvcnQgY29uc3QgcG9zaXRpdmUgPSBjc3NgXG5cdGNvbG9yOiAkeyBDT0xPUlMuYWxlcnQuZ3JlZW4gfTtcbmA7XG5cbmV4cG9ydCBjb25zdCBkZXN0cnVjdGl2ZSA9IGNzc2Bcblx0Y29sb3I6ICR7IENPTE9SUy5hbGVydC5yZWQgfTtcbmA7XG5cbmV4cG9ydCBjb25zdCBtdXRlZCA9IGNzc2Bcblx0Y29sb3I6ICR7IENPTE9SUy5ncmF5WyA3MDAgXSB9O1xuYDtcblxuZXhwb3J0IGNvbnN0IGhpZ2hsaWdodGVyVGV4dCA9IGNzc2Bcblx0bWFyayB7XG5cdFx0YmFja2dyb3VuZDogJHsgQ09MT1JTLmFsZXJ0LnllbGxvdyB9O1xuXHRcdGJvcmRlci1yYWRpdXM6ICR7IENPTkZJRy5yYWRpdXNTbWFsbCB9O1xuXHRcdGJveC1zaGFkb3c6XG5cdFx0XHQwIDAgMCAxcHggcmdiYSggMCwgMCwgMCwgMC4wNSApIGluc2V0LFxuXHRcdFx0MCAtMXB4IDAgcmdiYSggMCwgMCwgMCwgMC4xICkgaW5zZXQ7XG5cdH1cbmA7XG5cbmV4cG9ydCBjb25zdCB1cHBlckNhc2UgPSBjc3NgXG5cdHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG5gO1xuIl19 */");
var block2 = process.env.NODE_ENV === "production" ? {
  name: "4zleql",
  styles: "display:block"
} : {
  name: "14aceuy-block",
  styles: "display:block;label:block;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvdGV4dC9zdHlsZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBa0J3QiIsImZpbGUiOiJAd29yZHByZXNzL2NvbXBvbmVudHMvc3JjL3RleHQvc3R5bGVzLnRzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuXG4vKipcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyBDT0xPUlMsIENPTkZJRyB9IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGNvbnN0IFRleHQgPSBjc3NgXG5cdGNvbG9yOiAkeyBDT0xPUlMudGhlbWUuZm9yZWdyb3VuZCB9O1xuXHRsaW5lLWhlaWdodDogJHsgQ09ORklHLmZvbnRMaW5lSGVpZ2h0QmFzZSB9O1xuXHRtYXJnaW46IDA7XG5cdHRleHQtd3JhcDogYmFsYW5jZTsgLyogRmFsbGJhY2sgZm9yIFNhZmFyaS4gKi9cblx0dGV4dC13cmFwOiBwcmV0dHk7XG5gO1xuXG5leHBvcnQgY29uc3QgYmxvY2sgPSBjc3NgXG5cdGRpc3BsYXk6IGJsb2NrO1xuYDtcblxuZXhwb3J0IGNvbnN0IHBvc2l0aXZlID0gY3NzYFxuXHRjb2xvcjogJHsgQ09MT1JTLmFsZXJ0LmdyZWVuIH07XG5gO1xuXG5leHBvcnQgY29uc3QgZGVzdHJ1Y3RpdmUgPSBjc3NgXG5cdGNvbG9yOiAkeyBDT0xPUlMuYWxlcnQucmVkIH07XG5gO1xuXG5leHBvcnQgY29uc3QgbXV0ZWQgPSBjc3NgXG5cdGNvbG9yOiAkeyBDT0xPUlMuZ3JheVsgNzAwIF0gfTtcbmA7XG5cbmV4cG9ydCBjb25zdCBoaWdobGlnaHRlclRleHQgPSBjc3NgXG5cdG1hcmsge1xuXHRcdGJhY2tncm91bmQ6ICR7IENPTE9SUy5hbGVydC55ZWxsb3cgfTtcblx0XHRib3JkZXItcmFkaXVzOiAkeyBDT05GSUcucmFkaXVzU21hbGwgfTtcblx0XHRib3gtc2hhZG93OlxuXHRcdFx0MCAwIDAgMXB4IHJnYmEoIDAsIDAsIDAsIDAuMDUgKSBpbnNldCxcblx0XHRcdDAgLTFweCAwIHJnYmEoIDAsIDAsIDAsIDAuMSApIGluc2V0O1xuXHR9XG5gO1xuXG5leHBvcnQgY29uc3QgdXBwZXJDYXNlID0gY3NzYFxuXHR0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuYDtcbiJdfQ== */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__3
};
var positive = /* @__PURE__ */ css("color:", COLORS.alert.green, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:positive;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvdGV4dC9zdHlsZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBc0IyQiIsImZpbGUiOiJAd29yZHByZXNzL2NvbXBvbmVudHMvc3JjL3RleHQvc3R5bGVzLnRzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuXG4vKipcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyBDT0xPUlMsIENPTkZJRyB9IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGNvbnN0IFRleHQgPSBjc3NgXG5cdGNvbG9yOiAkeyBDT0xPUlMudGhlbWUuZm9yZWdyb3VuZCB9O1xuXHRsaW5lLWhlaWdodDogJHsgQ09ORklHLmZvbnRMaW5lSGVpZ2h0QmFzZSB9O1xuXHRtYXJnaW46IDA7XG5cdHRleHQtd3JhcDogYmFsYW5jZTsgLyogRmFsbGJhY2sgZm9yIFNhZmFyaS4gKi9cblx0dGV4dC13cmFwOiBwcmV0dHk7XG5gO1xuXG5leHBvcnQgY29uc3QgYmxvY2sgPSBjc3NgXG5cdGRpc3BsYXk6IGJsb2NrO1xuYDtcblxuZXhwb3J0IGNvbnN0IHBvc2l0aXZlID0gY3NzYFxuXHRjb2xvcjogJHsgQ09MT1JTLmFsZXJ0LmdyZWVuIH07XG5gO1xuXG5leHBvcnQgY29uc3QgZGVzdHJ1Y3RpdmUgPSBjc3NgXG5cdGNvbG9yOiAkeyBDT0xPUlMuYWxlcnQucmVkIH07XG5gO1xuXG5leHBvcnQgY29uc3QgbXV0ZWQgPSBjc3NgXG5cdGNvbG9yOiAkeyBDT0xPUlMuZ3JheVsgNzAwIF0gfTtcbmA7XG5cbmV4cG9ydCBjb25zdCBoaWdobGlnaHRlclRleHQgPSBjc3NgXG5cdG1hcmsge1xuXHRcdGJhY2tncm91bmQ6ICR7IENPTE9SUy5hbGVydC55ZWxsb3cgfTtcblx0XHRib3JkZXItcmFkaXVzOiAkeyBDT05GSUcucmFkaXVzU21hbGwgfTtcblx0XHRib3gtc2hhZG93OlxuXHRcdFx0MCAwIDAgMXB4IHJnYmEoIDAsIDAsIDAsIDAuMDUgKSBpbnNldCxcblx0XHRcdDAgLTFweCAwIHJnYmEoIDAsIDAsIDAsIDAuMSApIGluc2V0O1xuXHR9XG5gO1xuXG5leHBvcnQgY29uc3QgdXBwZXJDYXNlID0gY3NzYFxuXHR0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuYDtcbiJdfQ== */");
var destructive = /* @__PURE__ */ css("color:", COLORS.alert.red, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:destructive;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvdGV4dC9zdHlsZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBMEI4QiIsImZpbGUiOiJAd29yZHByZXNzL2NvbXBvbmVudHMvc3JjL3RleHQvc3R5bGVzLnRzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuXG4vKipcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyBDT0xPUlMsIENPTkZJRyB9IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGNvbnN0IFRleHQgPSBjc3NgXG5cdGNvbG9yOiAkeyBDT0xPUlMudGhlbWUuZm9yZWdyb3VuZCB9O1xuXHRsaW5lLWhlaWdodDogJHsgQ09ORklHLmZvbnRMaW5lSGVpZ2h0QmFzZSB9O1xuXHRtYXJnaW46IDA7XG5cdHRleHQtd3JhcDogYmFsYW5jZTsgLyogRmFsbGJhY2sgZm9yIFNhZmFyaS4gKi9cblx0dGV4dC13cmFwOiBwcmV0dHk7XG5gO1xuXG5leHBvcnQgY29uc3QgYmxvY2sgPSBjc3NgXG5cdGRpc3BsYXk6IGJsb2NrO1xuYDtcblxuZXhwb3J0IGNvbnN0IHBvc2l0aXZlID0gY3NzYFxuXHRjb2xvcjogJHsgQ09MT1JTLmFsZXJ0LmdyZWVuIH07XG5gO1xuXG5leHBvcnQgY29uc3QgZGVzdHJ1Y3RpdmUgPSBjc3NgXG5cdGNvbG9yOiAkeyBDT0xPUlMuYWxlcnQucmVkIH07XG5gO1xuXG5leHBvcnQgY29uc3QgbXV0ZWQgPSBjc3NgXG5cdGNvbG9yOiAkeyBDT0xPUlMuZ3JheVsgNzAwIF0gfTtcbmA7XG5cbmV4cG9ydCBjb25zdCBoaWdobGlnaHRlclRleHQgPSBjc3NgXG5cdG1hcmsge1xuXHRcdGJhY2tncm91bmQ6ICR7IENPTE9SUy5hbGVydC55ZWxsb3cgfTtcblx0XHRib3JkZXItcmFkaXVzOiAkeyBDT05GSUcucmFkaXVzU21hbGwgfTtcblx0XHRib3gtc2hhZG93OlxuXHRcdFx0MCAwIDAgMXB4IHJnYmEoIDAsIDAsIDAsIDAuMDUgKSBpbnNldCxcblx0XHRcdDAgLTFweCAwIHJnYmEoIDAsIDAsIDAsIDAuMSApIGluc2V0O1xuXHR9XG5gO1xuXG5leHBvcnQgY29uc3QgdXBwZXJDYXNlID0gY3NzYFxuXHR0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuYDtcbiJdfQ== */");
var muted = /* @__PURE__ */ css("color:", COLORS.gray[700], ";" + (process.env.NODE_ENV === "production" ? "" : ";label:muted;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvdGV4dC9zdHlsZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBOEJ3QiIsImZpbGUiOiJAd29yZHByZXNzL2NvbXBvbmVudHMvc3JjL3RleHQvc3R5bGVzLnRzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuXG4vKipcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyBDT0xPUlMsIENPTkZJRyB9IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGNvbnN0IFRleHQgPSBjc3NgXG5cdGNvbG9yOiAkeyBDT0xPUlMudGhlbWUuZm9yZWdyb3VuZCB9O1xuXHRsaW5lLWhlaWdodDogJHsgQ09ORklHLmZvbnRMaW5lSGVpZ2h0QmFzZSB9O1xuXHRtYXJnaW46IDA7XG5cdHRleHQtd3JhcDogYmFsYW5jZTsgLyogRmFsbGJhY2sgZm9yIFNhZmFyaS4gKi9cblx0dGV4dC13cmFwOiBwcmV0dHk7XG5gO1xuXG5leHBvcnQgY29uc3QgYmxvY2sgPSBjc3NgXG5cdGRpc3BsYXk6IGJsb2NrO1xuYDtcblxuZXhwb3J0IGNvbnN0IHBvc2l0aXZlID0gY3NzYFxuXHRjb2xvcjogJHsgQ09MT1JTLmFsZXJ0LmdyZWVuIH07XG5gO1xuXG5leHBvcnQgY29uc3QgZGVzdHJ1Y3RpdmUgPSBjc3NgXG5cdGNvbG9yOiAkeyBDT0xPUlMuYWxlcnQucmVkIH07XG5gO1xuXG5leHBvcnQgY29uc3QgbXV0ZWQgPSBjc3NgXG5cdGNvbG9yOiAkeyBDT0xPUlMuZ3JheVsgNzAwIF0gfTtcbmA7XG5cbmV4cG9ydCBjb25zdCBoaWdobGlnaHRlclRleHQgPSBjc3NgXG5cdG1hcmsge1xuXHRcdGJhY2tncm91bmQ6ICR7IENPTE9SUy5hbGVydC55ZWxsb3cgfTtcblx0XHRib3JkZXItcmFkaXVzOiAkeyBDT05GSUcucmFkaXVzU21hbGwgfTtcblx0XHRib3gtc2hhZG93OlxuXHRcdFx0MCAwIDAgMXB4IHJnYmEoIDAsIDAsIDAsIDAuMDUgKSBpbnNldCxcblx0XHRcdDAgLTFweCAwIHJnYmEoIDAsIDAsIDAsIDAuMSApIGluc2V0O1xuXHR9XG5gO1xuXG5leHBvcnQgY29uc3QgdXBwZXJDYXNlID0gY3NzYFxuXHR0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuYDtcbiJdfQ== */");
var highlighterText = /* @__PURE__ */ css("mark{background:", COLORS.alert.yellow, ";border-radius:", config_values_default.radiusSmall, ";box-shadow:0 0 0 1px rgba( 0, 0, 0, 0.05 ) inset,0 -1px 0 rgba( 0, 0, 0, 0.1 ) inset;}" + (process.env.NODE_ENV === "production" ? "" : ";label:highlighterText;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvdGV4dC9zdHlsZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBa0NrQyIsImZpbGUiOiJAd29yZHByZXNzL2NvbXBvbmVudHMvc3JjL3RleHQvc3R5bGVzLnRzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuXG4vKipcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyBDT0xPUlMsIENPTkZJRyB9IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGNvbnN0IFRleHQgPSBjc3NgXG5cdGNvbG9yOiAkeyBDT0xPUlMudGhlbWUuZm9yZWdyb3VuZCB9O1xuXHRsaW5lLWhlaWdodDogJHsgQ09ORklHLmZvbnRMaW5lSGVpZ2h0QmFzZSB9O1xuXHRtYXJnaW46IDA7XG5cdHRleHQtd3JhcDogYmFsYW5jZTsgLyogRmFsbGJhY2sgZm9yIFNhZmFyaS4gKi9cblx0dGV4dC13cmFwOiBwcmV0dHk7XG5gO1xuXG5leHBvcnQgY29uc3QgYmxvY2sgPSBjc3NgXG5cdGRpc3BsYXk6IGJsb2NrO1xuYDtcblxuZXhwb3J0IGNvbnN0IHBvc2l0aXZlID0gY3NzYFxuXHRjb2xvcjogJHsgQ09MT1JTLmFsZXJ0LmdyZWVuIH07XG5gO1xuXG5leHBvcnQgY29uc3QgZGVzdHJ1Y3RpdmUgPSBjc3NgXG5cdGNvbG9yOiAkeyBDT0xPUlMuYWxlcnQucmVkIH07XG5gO1xuXG5leHBvcnQgY29uc3QgbXV0ZWQgPSBjc3NgXG5cdGNvbG9yOiAkeyBDT0xPUlMuZ3JheVsgNzAwIF0gfTtcbmA7XG5cbmV4cG9ydCBjb25zdCBoaWdobGlnaHRlclRleHQgPSBjc3NgXG5cdG1hcmsge1xuXHRcdGJhY2tncm91bmQ6ICR7IENPTE9SUy5hbGVydC55ZWxsb3cgfTtcblx0XHRib3JkZXItcmFkaXVzOiAkeyBDT05GSUcucmFkaXVzU21hbGwgfTtcblx0XHRib3gtc2hhZG93OlxuXHRcdFx0MCAwIDAgMXB4IHJnYmEoIDAsIDAsIDAsIDAuMDUgKSBpbnNldCxcblx0XHRcdDAgLTFweCAwIHJnYmEoIDAsIDAsIDAsIDAuMSApIGluc2V0O1xuXHR9XG5gO1xuXG5leHBvcnQgY29uc3QgdXBwZXJDYXNlID0gY3NzYFxuXHR0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuYDtcbiJdfQ== */");
var upperCase = process.env.NODE_ENV === "production" ? {
  name: "50zrmy",
  styles: "text-transform:uppercase"
} : {
  name: "1mrt3zt-upperCase",
  styles: "text-transform:uppercase;label:upperCase;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvdGV4dC9zdHlsZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBNEM0QiIsImZpbGUiOiJAd29yZHByZXNzL2NvbXBvbmVudHMvc3JjL3RleHQvc3R5bGVzLnRzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuXG4vKipcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyBDT0xPUlMsIENPTkZJRyB9IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGNvbnN0IFRleHQgPSBjc3NgXG5cdGNvbG9yOiAkeyBDT0xPUlMudGhlbWUuZm9yZWdyb3VuZCB9O1xuXHRsaW5lLWhlaWdodDogJHsgQ09ORklHLmZvbnRMaW5lSGVpZ2h0QmFzZSB9O1xuXHRtYXJnaW46IDA7XG5cdHRleHQtd3JhcDogYmFsYW5jZTsgLyogRmFsbGJhY2sgZm9yIFNhZmFyaS4gKi9cblx0dGV4dC13cmFwOiBwcmV0dHk7XG5gO1xuXG5leHBvcnQgY29uc3QgYmxvY2sgPSBjc3NgXG5cdGRpc3BsYXk6IGJsb2NrO1xuYDtcblxuZXhwb3J0IGNvbnN0IHBvc2l0aXZlID0gY3NzYFxuXHRjb2xvcjogJHsgQ09MT1JTLmFsZXJ0LmdyZWVuIH07XG5gO1xuXG5leHBvcnQgY29uc3QgZGVzdHJ1Y3RpdmUgPSBjc3NgXG5cdGNvbG9yOiAkeyBDT0xPUlMuYWxlcnQucmVkIH07XG5gO1xuXG5leHBvcnQgY29uc3QgbXV0ZWQgPSBjc3NgXG5cdGNvbG9yOiAkeyBDT0xPUlMuZ3JheVsgNzAwIF0gfTtcbmA7XG5cbmV4cG9ydCBjb25zdCBoaWdobGlnaHRlclRleHQgPSBjc3NgXG5cdG1hcmsge1xuXHRcdGJhY2tncm91bmQ6ICR7IENPTE9SUy5hbGVydC55ZWxsb3cgfTtcblx0XHRib3JkZXItcmFkaXVzOiAkeyBDT05GSUcucmFkaXVzU21hbGwgfTtcblx0XHRib3gtc2hhZG93OlxuXHRcdFx0MCAwIDAgMXB4IHJnYmEoIDAsIDAsIDAsIDAuMDUgKSBpbnNldCxcblx0XHRcdDAgLTFweCAwIHJnYmEoIDAsIDAsIDAsIDAuMSApIGluc2V0O1xuXHR9XG5gO1xuXG5leHBvcnQgY29uc3QgdXBwZXJDYXNlID0gY3NzYFxuXHR0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuYDtcbiJdfQ== */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__3
};

// ../../../node_modules/.pnpm/@wordpress+components@30.4.0_@types+react@18.3.25_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/text/utils.js
var import_highlight_words_core = __toESM(require_dist());
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
      return createElement(HighlightTag, props);
    }
    return createElement("span", {
      children: text,
      className: unhighlightClassName,
      key: index,
      style: unhighlightStyle
    });
  });
  return textContent;
}

// ../../../node_modules/.pnpm/@wordpress+components@30.4.0_@types+react@18.3.25_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/utils/font-size.js
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

// ../../../node_modules/.pnpm/@wordpress+components@30.4.0_@types+react@18.3.25_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/text/get-line-height.js
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

// ../../../node_modules/.pnpm/@wordpress+components@30.4.0_@types+react@18.3.25_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/text/hook.js
function _EMOTION_STRINGIFIED_CSS_ERROR__4() {
  return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
}
var _ref = process.env.NODE_ENV === "production" ? {
  name: "50zrmy",
  styles: "text-transform:uppercase"
} : {
  name: "18bqwxz-sx-upperCase",
  styles: "text-transform:uppercase;label:sx-upperCase;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvdGV4dC9ob29rLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWtHaUIiLCJmaWxlIjoiQHdvcmRwcmVzcy9jb21wb25lbnRzL3NyYy90ZXh0L2hvb2sudHMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEV4dGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgdHlwZSB7IFNlcmlhbGl6ZWRTdHlsZXMgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5pbXBvcnQgeyBjc3MgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5cbi8qKlxuICogV29yZFByZXNzIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyB1c2VNZW1vLCBDaGlsZHJlbiwgY2xvbmVFbGVtZW50IH0gZnJvbSAnQHdvcmRwcmVzcy9lbGVtZW50JztcblxuLyoqXG4gKiBJbnRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHR5cGUgeyBXb3JkUHJlc3NDb21wb25lbnRQcm9wcyB9IGZyb20gJy4uL2NvbnRleHQnO1xuaW1wb3J0IHsgaGFzQ29ubmVjdE5hbWVzcGFjZSwgdXNlQ29udGV4dFN5c3RlbSB9IGZyb20gJy4uL2NvbnRleHQnO1xuaW1wb3J0IHsgdXNlVHJ1bmNhdGUgfSBmcm9tICcuLi90cnVuY2F0ZSc7XG5pbXBvcnQgeyBnZXRPcHRpbWFsVGV4dFNoYWRlIH0gZnJvbSAnLi4vdXRpbHMvY29sb3JzJztcbmltcG9ydCAqIGFzIHN0eWxlcyBmcm9tICcuL3N0eWxlcyc7XG5pbXBvcnQgeyBjcmVhdGVIaWdobGlnaHRlclRleHQgfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7IGdldEZvbnRTaXplIH0gZnJvbSAnLi4vdXRpbHMvZm9udC1zaXplJztcbmltcG9ydCB7IENPTkZJRywgQ09MT1JTIH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgZ2V0TGluZUhlaWdodCB9IGZyb20gJy4vZ2V0LWxpbmUtaGVpZ2h0JztcbmltcG9ydCB7IHVzZUN4IH0gZnJvbSAnLi4vdXRpbHMvaG9va3MvdXNlLWN4JztcbmltcG9ydCB0eXBlIHsgUHJvcHMgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB0eXBlIFJlYWN0IGZyb20gJ3JlYWN0JztcblxuLyoqXG4gKiBAcGFyYW0ge2ltcG9ydCgnLi4vY29udGV4dCcpLldvcmRQcmVzc0NvbXBvbmVudFByb3BzPGltcG9ydCgnLi90eXBlcycpLlByb3BzLCAnc3Bhbic+fSBwcm9wc1xuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB1c2VUZXh0KFxuXHRwcm9wczogV29yZFByZXNzQ29tcG9uZW50UHJvcHM8IFByb3BzLCAnc3BhbicgPlxuKSB7XG5cdGNvbnN0IHtcblx0XHRhZGp1c3RMaW5lSGVpZ2h0Rm9ySW5uZXJDb250cm9scyxcblx0XHRhbGlnbixcblx0XHRjaGlsZHJlbixcblx0XHRjbGFzc05hbWUsXG5cdFx0Y29sb3IsXG5cdFx0ZWxsaXBzaXplTW9kZSxcblx0XHRpc0Rlc3RydWN0aXZlID0gZmFsc2UsXG5cdFx0ZGlzcGxheSxcblx0XHRoaWdobGlnaHRFc2NhcGUgPSBmYWxzZSxcblx0XHRoaWdobGlnaHRDYXNlU2Vuc2l0aXZlID0gZmFsc2UsXG5cdFx0aGlnaGxpZ2h0V29yZHMsXG5cdFx0aGlnaGxpZ2h0U2FuaXRpemUsXG5cdFx0aXNCbG9jayA9IGZhbHNlLFxuXHRcdGxldHRlclNwYWNpbmcsXG5cdFx0bGluZUhlaWdodDogbGluZUhlaWdodFByb3AsXG5cdFx0b3B0aW1pemVSZWFkYWJpbGl0eUZvcixcblx0XHRzaXplLFxuXHRcdHRydW5jYXRlID0gZmFsc2UsXG5cdFx0dXBwZXJDYXNlID0gZmFsc2UsXG5cdFx0dmFyaWFudCxcblx0XHR3ZWlnaHQgPSBDT05GSUcuZm9udFdlaWdodCxcblx0XHQuLi5vdGhlclByb3BzXG5cdH0gPSB1c2VDb250ZXh0U3lzdGVtKCBwcm9wcywgJ1RleHQnICk7XG5cblx0bGV0IGNvbnRlbnQ6IFJlYWN0LlJlYWN0Tm9kZSA9IGNoaWxkcmVuO1xuXHRjb25zdCBpc0hpZ2hsaWdodGVyID0gQXJyYXkuaXNBcnJheSggaGlnaGxpZ2h0V29yZHMgKTtcblx0Y29uc3QgaXNDYXB0aW9uID0gc2l6ZSA9PT0gJ2NhcHRpb24nO1xuXG5cdGlmICggaXNIaWdobGlnaHRlciApIHtcblx0XHRpZiAoIHR5cGVvZiBjaGlsZHJlbiAhPT0gJ3N0cmluZycgKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKFxuXHRcdFx0XHQnYGNoaWxkcmVuYCBvZiBgVGV4dGAgbXVzdCBvbmx5IGJlIGBzdHJpbmdgIHR5cGVzIHdoZW4gYGhpZ2hsaWdodFdvcmRzYCBpcyBkZWZpbmVkJ1xuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRjb250ZW50ID0gY3JlYXRlSGlnaGxpZ2h0ZXJUZXh0KCB7XG5cdFx0XHRhdXRvRXNjYXBlOiBoaWdobGlnaHRFc2NhcGUsXG5cdFx0XHRjaGlsZHJlbixcblx0XHRcdGNhc2VTZW5zaXRpdmU6IGhpZ2hsaWdodENhc2VTZW5zaXRpdmUsXG5cdFx0XHRzZWFyY2hXb3JkczogaGlnaGxpZ2h0V29yZHMsXG5cdFx0XHRzYW5pdGl6ZTogaGlnaGxpZ2h0U2FuaXRpemUsXG5cdFx0fSApO1xuXHR9XG5cblx0Y29uc3QgY3ggPSB1c2VDeCgpO1xuXG5cdGNvbnN0IGNsYXNzZXMgPSB1c2VNZW1vKCAoKSA9PiB7XG5cdFx0Y29uc3Qgc3g6IFJlY29yZDwgc3RyaW5nLCBTZXJpYWxpemVkU3R5bGVzIHwgbnVsbCA+ID0ge307XG5cblx0XHRjb25zdCBsaW5lSGVpZ2h0ID0gZ2V0TGluZUhlaWdodChcblx0XHRcdGFkanVzdExpbmVIZWlnaHRGb3JJbm5lckNvbnRyb2xzLFxuXHRcdFx0bGluZUhlaWdodFByb3Bcblx0XHQpO1xuXG5cdFx0c3guQmFzZSA9IGNzcygge1xuXHRcdFx0Y29sb3IsXG5cdFx0XHRkaXNwbGF5LFxuXHRcdFx0Zm9udFNpemU6IGdldEZvbnRTaXplKCBzaXplICksXG5cdFx0XHRmb250V2VpZ2h0OiB3ZWlnaHQsXG5cdFx0XHRsaW5lSGVpZ2h0LFxuXHRcdFx0bGV0dGVyU3BhY2luZyxcblx0XHRcdHRleHRBbGlnbjogYWxpZ24sXG5cdFx0fSApO1xuXG5cdFx0c3gudXBwZXJDYXNlID0gY3NzKCB7IHRleHRUcmFuc2Zvcm06ICd1cHBlcmNhc2UnIH0gKTtcblxuXHRcdHN4Lm9wdGltYWxUZXh0Q29sb3IgPSBudWxsO1xuXG5cdFx0aWYgKCBvcHRpbWl6ZVJlYWRhYmlsaXR5Rm9yICkge1xuXHRcdFx0Y29uc3QgaXNPcHRpbWFsVGV4dENvbG9yRGFyayA9XG5cdFx0XHRcdGdldE9wdGltYWxUZXh0U2hhZGUoIG9wdGltaXplUmVhZGFiaWxpdHlGb3IgKSA9PT0gJ2RhcmsnO1xuXG5cdFx0XHQvLyBTaG91bGQgbm90IHVzZSB0aGVtZSBjb2xvcnNcblx0XHRcdHN4Lm9wdGltYWxUZXh0Q29sb3IgPSBpc09wdGltYWxUZXh0Q29sb3JEYXJrXG5cdFx0XHRcdD8gY3NzKCB7IGNvbG9yOiBDT0xPUlMuZ3JheVsgOTAwIF0gfSApXG5cdFx0XHRcdDogY3NzKCB7IGNvbG9yOiBDT0xPUlMud2hpdGUgfSApO1xuXHRcdH1cblxuXHRcdHJldHVybiBjeChcblx0XHRcdHN0eWxlcy5UZXh0LFxuXHRcdFx0c3guQmFzZSxcblx0XHRcdHN4Lm9wdGltYWxUZXh0Q29sb3IsXG5cdFx0XHRpc0Rlc3RydWN0aXZlICYmIHN0eWxlcy5kZXN0cnVjdGl2ZSxcblx0XHRcdCEhIGlzSGlnaGxpZ2h0ZXIgJiYgc3R5bGVzLmhpZ2hsaWdodGVyVGV4dCxcblx0XHRcdGlzQmxvY2sgJiYgc3R5bGVzLmJsb2NrLFxuXHRcdFx0aXNDYXB0aW9uICYmIHN0eWxlcy5tdXRlZCxcblx0XHRcdHZhcmlhbnQgJiYgc3R5bGVzWyB2YXJpYW50IF0sXG5cdFx0XHR1cHBlckNhc2UgJiYgc3gudXBwZXJDYXNlLFxuXHRcdFx0Y2xhc3NOYW1lXG5cdFx0KTtcblx0fSwgW1xuXHRcdGFkanVzdExpbmVIZWlnaHRGb3JJbm5lckNvbnRyb2xzLFxuXHRcdGFsaWduLFxuXHRcdGNsYXNzTmFtZSxcblx0XHRjb2xvcixcblx0XHRjeCxcblx0XHRkaXNwbGF5LFxuXHRcdGlzQmxvY2ssXG5cdFx0aXNDYXB0aW9uLFxuXHRcdGlzRGVzdHJ1Y3RpdmUsXG5cdFx0aXNIaWdobGlnaHRlcixcblx0XHRsZXR0ZXJTcGFjaW5nLFxuXHRcdGxpbmVIZWlnaHRQcm9wLFxuXHRcdG9wdGltaXplUmVhZGFiaWxpdHlGb3IsXG5cdFx0c2l6ZSxcblx0XHR1cHBlckNhc2UsXG5cdFx0dmFyaWFudCxcblx0XHR3ZWlnaHQsXG5cdF0gKTtcblxuXHRsZXQgZmluYWxFbGxpcHNpemVNb2RlOiB1bmRlZmluZWQgfCAnYXV0bycgfCAnbm9uZSc7XG5cdGlmICggdHJ1bmNhdGUgPT09IHRydWUgKSB7XG5cdFx0ZmluYWxFbGxpcHNpemVNb2RlID0gJ2F1dG8nO1xuXHR9XG5cdGlmICggdHJ1bmNhdGUgPT09IGZhbHNlICkge1xuXHRcdGZpbmFsRWxsaXBzaXplTW9kZSA9ICdub25lJztcblx0fVxuXG5cdGNvbnN0IGZpbmFsQ29tcG9uZW50UHJvcHMgPSB7XG5cdFx0Li4ub3RoZXJQcm9wcyxcblx0XHRjbGFzc05hbWU6IGNsYXNzZXMsXG5cdFx0Y2hpbGRyZW4sXG5cdFx0ZWxsaXBzaXplTW9kZTogZWxsaXBzaXplTW9kZSB8fCBmaW5hbEVsbGlwc2l6ZU1vZGUsXG5cdH07XG5cblx0Y29uc3QgdHJ1bmNhdGVQcm9wcyA9IHVzZVRydW5jYXRlKCBmaW5hbENvbXBvbmVudFByb3BzICk7XG5cblx0LyoqXG5cdCAqIEVuaGFuY2UgY2hpbGQgYDxMaW5rIC8+YCBjb21wb25lbnRzIHRvIGluaGVyaXQgZm9udCBzaXplLlxuXHQgKi9cblx0aWYgKCAhIHRydW5jYXRlICYmIEFycmF5LmlzQXJyYXkoIGNoaWxkcmVuICkgKSB7XG5cdFx0Y29udGVudCA9IENoaWxkcmVuLm1hcCggY2hpbGRyZW4sICggY2hpbGQgKSA9PiB7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdHR5cGVvZiBjaGlsZCAhPT0gJ29iamVjdCcgfHxcblx0XHRcdFx0Y2hpbGQgPT09IG51bGwgfHxcblx0XHRcdFx0ISAoICdwcm9wcycgaW4gY2hpbGQgKVxuXHRcdFx0KSB7XG5cdFx0XHRcdHJldHVybiBjaGlsZDtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgaXNMaW5rID0gaGFzQ29ubmVjdE5hbWVzcGFjZSggY2hpbGQsIFsgJ0xpbmsnIF0gKTtcblx0XHRcdGlmICggaXNMaW5rICkge1xuXHRcdFx0XHRyZXR1cm4gY2xvbmVFbGVtZW50KCBjaGlsZCwge1xuXHRcdFx0XHRcdHNpemU6IGNoaWxkLnByb3BzLnNpemUgfHwgJ2luaGVyaXQnLFxuXHRcdFx0XHR9ICk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBjaGlsZDtcblx0XHR9ICk7XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdC4uLnRydW5jYXRlUHJvcHMsXG5cdFx0Y2hpbGRyZW46IHRydW5jYXRlID8gdHJ1bmNhdGVQcm9wcy5jaGlsZHJlbiA6IGNvbnRlbnQsXG5cdH07XG59XG4iXX0= */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__4
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
  const classes = useMemo(() => {
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
    }, process.env.NODE_ENV === "production" ? "" : ";label:sx-Base;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvdGV4dC9ob29rLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXdGWSIsImZpbGUiOiJAd29yZHByZXNzL2NvbXBvbmVudHMvc3JjL3RleHQvaG9vay50cyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogRXh0ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB0eXBlIHsgU2VyaWFsaXplZFN0eWxlcyB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcbmltcG9ydCB7IGNzcyB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcblxuLyoqXG4gKiBXb3JkUHJlc3MgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB7IHVzZU1lbW8sIENoaWxkcmVuLCBjbG9uZUVsZW1lbnQgfSBmcm9tICdAd29yZHByZXNzL2VsZW1lbnQnO1xuXG4vKipcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgdHlwZSB7IFdvcmRQcmVzc0NvbXBvbmVudFByb3BzIH0gZnJvbSAnLi4vY29udGV4dCc7XG5pbXBvcnQgeyBoYXNDb25uZWN0TmFtZXNwYWNlLCB1c2VDb250ZXh0U3lzdGVtIH0gZnJvbSAnLi4vY29udGV4dCc7XG5pbXBvcnQgeyB1c2VUcnVuY2F0ZSB9IGZyb20gJy4uL3RydW5jYXRlJztcbmltcG9ydCB7IGdldE9wdGltYWxUZXh0U2hhZGUgfSBmcm9tICcuLi91dGlscy9jb2xvcnMnO1xuaW1wb3J0ICogYXMgc3R5bGVzIGZyb20gJy4vc3R5bGVzJztcbmltcG9ydCB7IGNyZWF0ZUhpZ2hsaWdodGVyVGV4dCB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHsgZ2V0Rm9udFNpemUgfSBmcm9tICcuLi91dGlscy9mb250LXNpemUnO1xuaW1wb3J0IHsgQ09ORklHLCBDT0xPUlMgfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgeyBnZXRMaW5lSGVpZ2h0IH0gZnJvbSAnLi9nZXQtbGluZS1oZWlnaHQnO1xuaW1wb3J0IHsgdXNlQ3ggfSBmcm9tICcuLi91dGlscy9ob29rcy91c2UtY3gnO1xuaW1wb3J0IHR5cGUgeyBQcm9wcyB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHR5cGUgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG4vKipcbiAqIEBwYXJhbSB7aW1wb3J0KCcuLi9jb250ZXh0JykuV29yZFByZXNzQ29tcG9uZW50UHJvcHM8aW1wb3J0KCcuL3R5cGVzJykuUHJvcHMsICdzcGFuJz59IHByb3BzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHVzZVRleHQoXG5cdHByb3BzOiBXb3JkUHJlc3NDb21wb25lbnRQcm9wczwgUHJvcHMsICdzcGFuJyA+XG4pIHtcblx0Y29uc3Qge1xuXHRcdGFkanVzdExpbmVIZWlnaHRGb3JJbm5lckNvbnRyb2xzLFxuXHRcdGFsaWduLFxuXHRcdGNoaWxkcmVuLFxuXHRcdGNsYXNzTmFtZSxcblx0XHRjb2xvcixcblx0XHRlbGxpcHNpemVNb2RlLFxuXHRcdGlzRGVzdHJ1Y3RpdmUgPSBmYWxzZSxcblx0XHRkaXNwbGF5LFxuXHRcdGhpZ2hsaWdodEVzY2FwZSA9IGZhbHNlLFxuXHRcdGhpZ2hsaWdodENhc2VTZW5zaXRpdmUgPSBmYWxzZSxcblx0XHRoaWdobGlnaHRXb3Jkcyxcblx0XHRoaWdobGlnaHRTYW5pdGl6ZSxcblx0XHRpc0Jsb2NrID0gZmFsc2UsXG5cdFx0bGV0dGVyU3BhY2luZyxcblx0XHRsaW5lSGVpZ2h0OiBsaW5lSGVpZ2h0UHJvcCxcblx0XHRvcHRpbWl6ZVJlYWRhYmlsaXR5Rm9yLFxuXHRcdHNpemUsXG5cdFx0dHJ1bmNhdGUgPSBmYWxzZSxcblx0XHR1cHBlckNhc2UgPSBmYWxzZSxcblx0XHR2YXJpYW50LFxuXHRcdHdlaWdodCA9IENPTkZJRy5mb250V2VpZ2h0LFxuXHRcdC4uLm90aGVyUHJvcHNcblx0fSA9IHVzZUNvbnRleHRTeXN0ZW0oIHByb3BzLCAnVGV4dCcgKTtcblxuXHRsZXQgY29udGVudDogUmVhY3QuUmVhY3ROb2RlID0gY2hpbGRyZW47XG5cdGNvbnN0IGlzSGlnaGxpZ2h0ZXIgPSBBcnJheS5pc0FycmF5KCBoaWdobGlnaHRXb3JkcyApO1xuXHRjb25zdCBpc0NhcHRpb24gPSBzaXplID09PSAnY2FwdGlvbic7XG5cblx0aWYgKCBpc0hpZ2hsaWdodGVyICkge1xuXHRcdGlmICggdHlwZW9mIGNoaWxkcmVuICE9PSAnc3RyaW5nJyApIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXG5cdFx0XHRcdCdgY2hpbGRyZW5gIG9mIGBUZXh0YCBtdXN0IG9ubHkgYmUgYHN0cmluZ2AgdHlwZXMgd2hlbiBgaGlnaGxpZ2h0V29yZHNgIGlzIGRlZmluZWQnXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGNvbnRlbnQgPSBjcmVhdGVIaWdobGlnaHRlclRleHQoIHtcblx0XHRcdGF1dG9Fc2NhcGU6IGhpZ2hsaWdodEVzY2FwZSxcblx0XHRcdGNoaWxkcmVuLFxuXHRcdFx0Y2FzZVNlbnNpdGl2ZTogaGlnaGxpZ2h0Q2FzZVNlbnNpdGl2ZSxcblx0XHRcdHNlYXJjaFdvcmRzOiBoaWdobGlnaHRXb3Jkcyxcblx0XHRcdHNhbml0aXplOiBoaWdobGlnaHRTYW5pdGl6ZSxcblx0XHR9ICk7XG5cdH1cblxuXHRjb25zdCBjeCA9IHVzZUN4KCk7XG5cblx0Y29uc3QgY2xhc3NlcyA9IHVzZU1lbW8oICgpID0+IHtcblx0XHRjb25zdCBzeDogUmVjb3JkPCBzdHJpbmcsIFNlcmlhbGl6ZWRTdHlsZXMgfCBudWxsID4gPSB7fTtcblxuXHRcdGNvbnN0IGxpbmVIZWlnaHQgPSBnZXRMaW5lSGVpZ2h0KFxuXHRcdFx0YWRqdXN0TGluZUhlaWdodEZvcklubmVyQ29udHJvbHMsXG5cdFx0XHRsaW5lSGVpZ2h0UHJvcFxuXHRcdCk7XG5cblx0XHRzeC5CYXNlID0gY3NzKCB7XG5cdFx0XHRjb2xvcixcblx0XHRcdGRpc3BsYXksXG5cdFx0XHRmb250U2l6ZTogZ2V0Rm9udFNpemUoIHNpemUgKSxcblx0XHRcdGZvbnRXZWlnaHQ6IHdlaWdodCxcblx0XHRcdGxpbmVIZWlnaHQsXG5cdFx0XHRsZXR0ZXJTcGFjaW5nLFxuXHRcdFx0dGV4dEFsaWduOiBhbGlnbixcblx0XHR9ICk7XG5cblx0XHRzeC51cHBlckNhc2UgPSBjc3MoIHsgdGV4dFRyYW5zZm9ybTogJ3VwcGVyY2FzZScgfSApO1xuXG5cdFx0c3gub3B0aW1hbFRleHRDb2xvciA9IG51bGw7XG5cblx0XHRpZiAoIG9wdGltaXplUmVhZGFiaWxpdHlGb3IgKSB7XG5cdFx0XHRjb25zdCBpc09wdGltYWxUZXh0Q29sb3JEYXJrID1cblx0XHRcdFx0Z2V0T3B0aW1hbFRleHRTaGFkZSggb3B0aW1pemVSZWFkYWJpbGl0eUZvciApID09PSAnZGFyayc7XG5cblx0XHRcdC8vIFNob3VsZCBub3QgdXNlIHRoZW1lIGNvbG9yc1xuXHRcdFx0c3gub3B0aW1hbFRleHRDb2xvciA9IGlzT3B0aW1hbFRleHRDb2xvckRhcmtcblx0XHRcdFx0PyBjc3MoIHsgY29sb3I6IENPTE9SUy5ncmF5WyA5MDAgXSB9IClcblx0XHRcdFx0OiBjc3MoIHsgY29sb3I6IENPTE9SUy53aGl0ZSB9ICk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGN4KFxuXHRcdFx0c3R5bGVzLlRleHQsXG5cdFx0XHRzeC5CYXNlLFxuXHRcdFx0c3gub3B0aW1hbFRleHRDb2xvcixcblx0XHRcdGlzRGVzdHJ1Y3RpdmUgJiYgc3R5bGVzLmRlc3RydWN0aXZlLFxuXHRcdFx0ISEgaXNIaWdobGlnaHRlciAmJiBzdHlsZXMuaGlnaGxpZ2h0ZXJUZXh0LFxuXHRcdFx0aXNCbG9jayAmJiBzdHlsZXMuYmxvY2ssXG5cdFx0XHRpc0NhcHRpb24gJiYgc3R5bGVzLm11dGVkLFxuXHRcdFx0dmFyaWFudCAmJiBzdHlsZXNbIHZhcmlhbnQgXSxcblx0XHRcdHVwcGVyQ2FzZSAmJiBzeC51cHBlckNhc2UsXG5cdFx0XHRjbGFzc05hbWVcblx0XHQpO1xuXHR9LCBbXG5cdFx0YWRqdXN0TGluZUhlaWdodEZvcklubmVyQ29udHJvbHMsXG5cdFx0YWxpZ24sXG5cdFx0Y2xhc3NOYW1lLFxuXHRcdGNvbG9yLFxuXHRcdGN4LFxuXHRcdGRpc3BsYXksXG5cdFx0aXNCbG9jayxcblx0XHRpc0NhcHRpb24sXG5cdFx0aXNEZXN0cnVjdGl2ZSxcblx0XHRpc0hpZ2hsaWdodGVyLFxuXHRcdGxldHRlclNwYWNpbmcsXG5cdFx0bGluZUhlaWdodFByb3AsXG5cdFx0b3B0aW1pemVSZWFkYWJpbGl0eUZvcixcblx0XHRzaXplLFxuXHRcdHVwcGVyQ2FzZSxcblx0XHR2YXJpYW50LFxuXHRcdHdlaWdodCxcblx0XSApO1xuXG5cdGxldCBmaW5hbEVsbGlwc2l6ZU1vZGU6IHVuZGVmaW5lZCB8ICdhdXRvJyB8ICdub25lJztcblx0aWYgKCB0cnVuY2F0ZSA9PT0gdHJ1ZSApIHtcblx0XHRmaW5hbEVsbGlwc2l6ZU1vZGUgPSAnYXV0byc7XG5cdH1cblx0aWYgKCB0cnVuY2F0ZSA9PT0gZmFsc2UgKSB7XG5cdFx0ZmluYWxFbGxpcHNpemVNb2RlID0gJ25vbmUnO1xuXHR9XG5cblx0Y29uc3QgZmluYWxDb21wb25lbnRQcm9wcyA9IHtcblx0XHQuLi5vdGhlclByb3BzLFxuXHRcdGNsYXNzTmFtZTogY2xhc3Nlcyxcblx0XHRjaGlsZHJlbixcblx0XHRlbGxpcHNpemVNb2RlOiBlbGxpcHNpemVNb2RlIHx8IGZpbmFsRWxsaXBzaXplTW9kZSxcblx0fTtcblxuXHRjb25zdCB0cnVuY2F0ZVByb3BzID0gdXNlVHJ1bmNhdGUoIGZpbmFsQ29tcG9uZW50UHJvcHMgKTtcblxuXHQvKipcblx0ICogRW5oYW5jZSBjaGlsZCBgPExpbmsgLz5gIGNvbXBvbmVudHMgdG8gaW5oZXJpdCBmb250IHNpemUuXG5cdCAqL1xuXHRpZiAoICEgdHJ1bmNhdGUgJiYgQXJyYXkuaXNBcnJheSggY2hpbGRyZW4gKSApIHtcblx0XHRjb250ZW50ID0gQ2hpbGRyZW4ubWFwKCBjaGlsZHJlbiwgKCBjaGlsZCApID0+IHtcblx0XHRcdGlmIChcblx0XHRcdFx0dHlwZW9mIGNoaWxkICE9PSAnb2JqZWN0JyB8fFxuXHRcdFx0XHRjaGlsZCA9PT0gbnVsbCB8fFxuXHRcdFx0XHQhICggJ3Byb3BzJyBpbiBjaGlsZCApXG5cdFx0XHQpIHtcblx0XHRcdFx0cmV0dXJuIGNoaWxkO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBpc0xpbmsgPSBoYXNDb25uZWN0TmFtZXNwYWNlKCBjaGlsZCwgWyAnTGluaycgXSApO1xuXHRcdFx0aWYgKCBpc0xpbmsgKSB7XG5cdFx0XHRcdHJldHVybiBjbG9uZUVsZW1lbnQoIGNoaWxkLCB7XG5cdFx0XHRcdFx0c2l6ZTogY2hpbGQucHJvcHMuc2l6ZSB8fCAnaW5oZXJpdCcsXG5cdFx0XHRcdH0gKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGNoaWxkO1xuXHRcdH0gKTtcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0Li4udHJ1bmNhdGVQcm9wcyxcblx0XHRjaGlsZHJlbjogdHJ1bmNhdGUgPyB0cnVuY2F0ZVByb3BzLmNoaWxkcmVuIDogY29udGVudCxcblx0fTtcbn1cbiJdfQ== */");
    sx.upperCase = _ref;
    sx.optimalTextColor = null;
    if (optimizeReadabilityFor) {
      const isOptimalTextColorDark = getOptimalTextShade(optimizeReadabilityFor) === "dark";
      sx.optimalTextColor = isOptimalTextColorDark ? /* @__PURE__ */ css({
        color: COLORS.gray[900]
      }, process.env.NODE_ENV === "production" ? "" : ";label:sx-optimalTextColor;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvdGV4dC9ob29rLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTRHTSIsImZpbGUiOiJAd29yZHByZXNzL2NvbXBvbmVudHMvc3JjL3RleHQvaG9vay50cyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogRXh0ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB0eXBlIHsgU2VyaWFsaXplZFN0eWxlcyB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcbmltcG9ydCB7IGNzcyB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcblxuLyoqXG4gKiBXb3JkUHJlc3MgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB7IHVzZU1lbW8sIENoaWxkcmVuLCBjbG9uZUVsZW1lbnQgfSBmcm9tICdAd29yZHByZXNzL2VsZW1lbnQnO1xuXG4vKipcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgdHlwZSB7IFdvcmRQcmVzc0NvbXBvbmVudFByb3BzIH0gZnJvbSAnLi4vY29udGV4dCc7XG5pbXBvcnQgeyBoYXNDb25uZWN0TmFtZXNwYWNlLCB1c2VDb250ZXh0U3lzdGVtIH0gZnJvbSAnLi4vY29udGV4dCc7XG5pbXBvcnQgeyB1c2VUcnVuY2F0ZSB9IGZyb20gJy4uL3RydW5jYXRlJztcbmltcG9ydCB7IGdldE9wdGltYWxUZXh0U2hhZGUgfSBmcm9tICcuLi91dGlscy9jb2xvcnMnO1xuaW1wb3J0ICogYXMgc3R5bGVzIGZyb20gJy4vc3R5bGVzJztcbmltcG9ydCB7IGNyZWF0ZUhpZ2hsaWdodGVyVGV4dCB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHsgZ2V0Rm9udFNpemUgfSBmcm9tICcuLi91dGlscy9mb250LXNpemUnO1xuaW1wb3J0IHsgQ09ORklHLCBDT0xPUlMgfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgeyBnZXRMaW5lSGVpZ2h0IH0gZnJvbSAnLi9nZXQtbGluZS1oZWlnaHQnO1xuaW1wb3J0IHsgdXNlQ3ggfSBmcm9tICcuLi91dGlscy9ob29rcy91c2UtY3gnO1xuaW1wb3J0IHR5cGUgeyBQcm9wcyB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHR5cGUgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG4vKipcbiAqIEBwYXJhbSB7aW1wb3J0KCcuLi9jb250ZXh0JykuV29yZFByZXNzQ29tcG9uZW50UHJvcHM8aW1wb3J0KCcuL3R5cGVzJykuUHJvcHMsICdzcGFuJz59IHByb3BzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHVzZVRleHQoXG5cdHByb3BzOiBXb3JkUHJlc3NDb21wb25lbnRQcm9wczwgUHJvcHMsICdzcGFuJyA+XG4pIHtcblx0Y29uc3Qge1xuXHRcdGFkanVzdExpbmVIZWlnaHRGb3JJbm5lckNvbnRyb2xzLFxuXHRcdGFsaWduLFxuXHRcdGNoaWxkcmVuLFxuXHRcdGNsYXNzTmFtZSxcblx0XHRjb2xvcixcblx0XHRlbGxpcHNpemVNb2RlLFxuXHRcdGlzRGVzdHJ1Y3RpdmUgPSBmYWxzZSxcblx0XHRkaXNwbGF5LFxuXHRcdGhpZ2hsaWdodEVzY2FwZSA9IGZhbHNlLFxuXHRcdGhpZ2hsaWdodENhc2VTZW5zaXRpdmUgPSBmYWxzZSxcblx0XHRoaWdobGlnaHRXb3Jkcyxcblx0XHRoaWdobGlnaHRTYW5pdGl6ZSxcblx0XHRpc0Jsb2NrID0gZmFsc2UsXG5cdFx0bGV0dGVyU3BhY2luZyxcblx0XHRsaW5lSGVpZ2h0OiBsaW5lSGVpZ2h0UHJvcCxcblx0XHRvcHRpbWl6ZVJlYWRhYmlsaXR5Rm9yLFxuXHRcdHNpemUsXG5cdFx0dHJ1bmNhdGUgPSBmYWxzZSxcblx0XHR1cHBlckNhc2UgPSBmYWxzZSxcblx0XHR2YXJpYW50LFxuXHRcdHdlaWdodCA9IENPTkZJRy5mb250V2VpZ2h0LFxuXHRcdC4uLm90aGVyUHJvcHNcblx0fSA9IHVzZUNvbnRleHRTeXN0ZW0oIHByb3BzLCAnVGV4dCcgKTtcblxuXHRsZXQgY29udGVudDogUmVhY3QuUmVhY3ROb2RlID0gY2hpbGRyZW47XG5cdGNvbnN0IGlzSGlnaGxpZ2h0ZXIgPSBBcnJheS5pc0FycmF5KCBoaWdobGlnaHRXb3JkcyApO1xuXHRjb25zdCBpc0NhcHRpb24gPSBzaXplID09PSAnY2FwdGlvbic7XG5cblx0aWYgKCBpc0hpZ2hsaWdodGVyICkge1xuXHRcdGlmICggdHlwZW9mIGNoaWxkcmVuICE9PSAnc3RyaW5nJyApIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXG5cdFx0XHRcdCdgY2hpbGRyZW5gIG9mIGBUZXh0YCBtdXN0IG9ubHkgYmUgYHN0cmluZ2AgdHlwZXMgd2hlbiBgaGlnaGxpZ2h0V29yZHNgIGlzIGRlZmluZWQnXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGNvbnRlbnQgPSBjcmVhdGVIaWdobGlnaHRlclRleHQoIHtcblx0XHRcdGF1dG9Fc2NhcGU6IGhpZ2hsaWdodEVzY2FwZSxcblx0XHRcdGNoaWxkcmVuLFxuXHRcdFx0Y2FzZVNlbnNpdGl2ZTogaGlnaGxpZ2h0Q2FzZVNlbnNpdGl2ZSxcblx0XHRcdHNlYXJjaFdvcmRzOiBoaWdobGlnaHRXb3Jkcyxcblx0XHRcdHNhbml0aXplOiBoaWdobGlnaHRTYW5pdGl6ZSxcblx0XHR9ICk7XG5cdH1cblxuXHRjb25zdCBjeCA9IHVzZUN4KCk7XG5cblx0Y29uc3QgY2xhc3NlcyA9IHVzZU1lbW8oICgpID0+IHtcblx0XHRjb25zdCBzeDogUmVjb3JkPCBzdHJpbmcsIFNlcmlhbGl6ZWRTdHlsZXMgfCBudWxsID4gPSB7fTtcblxuXHRcdGNvbnN0IGxpbmVIZWlnaHQgPSBnZXRMaW5lSGVpZ2h0KFxuXHRcdFx0YWRqdXN0TGluZUhlaWdodEZvcklubmVyQ29udHJvbHMsXG5cdFx0XHRsaW5lSGVpZ2h0UHJvcFxuXHRcdCk7XG5cblx0XHRzeC5CYXNlID0gY3NzKCB7XG5cdFx0XHRjb2xvcixcblx0XHRcdGRpc3BsYXksXG5cdFx0XHRmb250U2l6ZTogZ2V0Rm9udFNpemUoIHNpemUgKSxcblx0XHRcdGZvbnRXZWlnaHQ6IHdlaWdodCxcblx0XHRcdGxpbmVIZWlnaHQsXG5cdFx0XHRsZXR0ZXJTcGFjaW5nLFxuXHRcdFx0dGV4dEFsaWduOiBhbGlnbixcblx0XHR9ICk7XG5cblx0XHRzeC51cHBlckNhc2UgPSBjc3MoIHsgdGV4dFRyYW5zZm9ybTogJ3VwcGVyY2FzZScgfSApO1xuXG5cdFx0c3gub3B0aW1hbFRleHRDb2xvciA9IG51bGw7XG5cblx0XHRpZiAoIG9wdGltaXplUmVhZGFiaWxpdHlGb3IgKSB7XG5cdFx0XHRjb25zdCBpc09wdGltYWxUZXh0Q29sb3JEYXJrID1cblx0XHRcdFx0Z2V0T3B0aW1hbFRleHRTaGFkZSggb3B0aW1pemVSZWFkYWJpbGl0eUZvciApID09PSAnZGFyayc7XG5cblx0XHRcdC8vIFNob3VsZCBub3QgdXNlIHRoZW1lIGNvbG9yc1xuXHRcdFx0c3gub3B0aW1hbFRleHRDb2xvciA9IGlzT3B0aW1hbFRleHRDb2xvckRhcmtcblx0XHRcdFx0PyBjc3MoIHsgY29sb3I6IENPTE9SUy5ncmF5WyA5MDAgXSB9IClcblx0XHRcdFx0OiBjc3MoIHsgY29sb3I6IENPTE9SUy53aGl0ZSB9ICk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGN4KFxuXHRcdFx0c3R5bGVzLlRleHQsXG5cdFx0XHRzeC5CYXNlLFxuXHRcdFx0c3gub3B0aW1hbFRleHRDb2xvcixcblx0XHRcdGlzRGVzdHJ1Y3RpdmUgJiYgc3R5bGVzLmRlc3RydWN0aXZlLFxuXHRcdFx0ISEgaXNIaWdobGlnaHRlciAmJiBzdHlsZXMuaGlnaGxpZ2h0ZXJUZXh0LFxuXHRcdFx0aXNCbG9jayAmJiBzdHlsZXMuYmxvY2ssXG5cdFx0XHRpc0NhcHRpb24gJiYgc3R5bGVzLm11dGVkLFxuXHRcdFx0dmFyaWFudCAmJiBzdHlsZXNbIHZhcmlhbnQgXSxcblx0XHRcdHVwcGVyQ2FzZSAmJiBzeC51cHBlckNhc2UsXG5cdFx0XHRjbGFzc05hbWVcblx0XHQpO1xuXHR9LCBbXG5cdFx0YWRqdXN0TGluZUhlaWdodEZvcklubmVyQ29udHJvbHMsXG5cdFx0YWxpZ24sXG5cdFx0Y2xhc3NOYW1lLFxuXHRcdGNvbG9yLFxuXHRcdGN4LFxuXHRcdGRpc3BsYXksXG5cdFx0aXNCbG9jayxcblx0XHRpc0NhcHRpb24sXG5cdFx0aXNEZXN0cnVjdGl2ZSxcblx0XHRpc0hpZ2hsaWdodGVyLFxuXHRcdGxldHRlclNwYWNpbmcsXG5cdFx0bGluZUhlaWdodFByb3AsXG5cdFx0b3B0aW1pemVSZWFkYWJpbGl0eUZvcixcblx0XHRzaXplLFxuXHRcdHVwcGVyQ2FzZSxcblx0XHR2YXJpYW50LFxuXHRcdHdlaWdodCxcblx0XSApO1xuXG5cdGxldCBmaW5hbEVsbGlwc2l6ZU1vZGU6IHVuZGVmaW5lZCB8ICdhdXRvJyB8ICdub25lJztcblx0aWYgKCB0cnVuY2F0ZSA9PT0gdHJ1ZSApIHtcblx0XHRmaW5hbEVsbGlwc2l6ZU1vZGUgPSAnYXV0byc7XG5cdH1cblx0aWYgKCB0cnVuY2F0ZSA9PT0gZmFsc2UgKSB7XG5cdFx0ZmluYWxFbGxpcHNpemVNb2RlID0gJ25vbmUnO1xuXHR9XG5cblx0Y29uc3QgZmluYWxDb21wb25lbnRQcm9wcyA9IHtcblx0XHQuLi5vdGhlclByb3BzLFxuXHRcdGNsYXNzTmFtZTogY2xhc3Nlcyxcblx0XHRjaGlsZHJlbixcblx0XHRlbGxpcHNpemVNb2RlOiBlbGxpcHNpemVNb2RlIHx8IGZpbmFsRWxsaXBzaXplTW9kZSxcblx0fTtcblxuXHRjb25zdCB0cnVuY2F0ZVByb3BzID0gdXNlVHJ1bmNhdGUoIGZpbmFsQ29tcG9uZW50UHJvcHMgKTtcblxuXHQvKipcblx0ICogRW5oYW5jZSBjaGlsZCBgPExpbmsgLz5gIGNvbXBvbmVudHMgdG8gaW5oZXJpdCBmb250IHNpemUuXG5cdCAqL1xuXHRpZiAoICEgdHJ1bmNhdGUgJiYgQXJyYXkuaXNBcnJheSggY2hpbGRyZW4gKSApIHtcblx0XHRjb250ZW50ID0gQ2hpbGRyZW4ubWFwKCBjaGlsZHJlbiwgKCBjaGlsZCApID0+IHtcblx0XHRcdGlmIChcblx0XHRcdFx0dHlwZW9mIGNoaWxkICE9PSAnb2JqZWN0JyB8fFxuXHRcdFx0XHRjaGlsZCA9PT0gbnVsbCB8fFxuXHRcdFx0XHQhICggJ3Byb3BzJyBpbiBjaGlsZCApXG5cdFx0XHQpIHtcblx0XHRcdFx0cmV0dXJuIGNoaWxkO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBpc0xpbmsgPSBoYXNDb25uZWN0TmFtZXNwYWNlKCBjaGlsZCwgWyAnTGluaycgXSApO1xuXHRcdFx0aWYgKCBpc0xpbmsgKSB7XG5cdFx0XHRcdHJldHVybiBjbG9uZUVsZW1lbnQoIGNoaWxkLCB7XG5cdFx0XHRcdFx0c2l6ZTogY2hpbGQucHJvcHMuc2l6ZSB8fCAnaW5oZXJpdCcsXG5cdFx0XHRcdH0gKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGNoaWxkO1xuXHRcdH0gKTtcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0Li4udHJ1bmNhdGVQcm9wcyxcblx0XHRjaGlsZHJlbjogdHJ1bmNhdGUgPyB0cnVuY2F0ZVByb3BzLmNoaWxkcmVuIDogY29udGVudCxcblx0fTtcbn1cbiJdfQ== */") : /* @__PURE__ */ css({
        color: COLORS.white
      }, process.env.NODE_ENV === "production" ? "" : ";label:sx-optimalTextColor;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvdGV4dC9ob29rLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTZHTSIsImZpbGUiOiJAd29yZHByZXNzL2NvbXBvbmVudHMvc3JjL3RleHQvaG9vay50cyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogRXh0ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB0eXBlIHsgU2VyaWFsaXplZFN0eWxlcyB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcbmltcG9ydCB7IGNzcyB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcblxuLyoqXG4gKiBXb3JkUHJlc3MgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB7IHVzZU1lbW8sIENoaWxkcmVuLCBjbG9uZUVsZW1lbnQgfSBmcm9tICdAd29yZHByZXNzL2VsZW1lbnQnO1xuXG4vKipcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgdHlwZSB7IFdvcmRQcmVzc0NvbXBvbmVudFByb3BzIH0gZnJvbSAnLi4vY29udGV4dCc7XG5pbXBvcnQgeyBoYXNDb25uZWN0TmFtZXNwYWNlLCB1c2VDb250ZXh0U3lzdGVtIH0gZnJvbSAnLi4vY29udGV4dCc7XG5pbXBvcnQgeyB1c2VUcnVuY2F0ZSB9IGZyb20gJy4uL3RydW5jYXRlJztcbmltcG9ydCB7IGdldE9wdGltYWxUZXh0U2hhZGUgfSBmcm9tICcuLi91dGlscy9jb2xvcnMnO1xuaW1wb3J0ICogYXMgc3R5bGVzIGZyb20gJy4vc3R5bGVzJztcbmltcG9ydCB7IGNyZWF0ZUhpZ2hsaWdodGVyVGV4dCB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHsgZ2V0Rm9udFNpemUgfSBmcm9tICcuLi91dGlscy9mb250LXNpemUnO1xuaW1wb3J0IHsgQ09ORklHLCBDT0xPUlMgfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgeyBnZXRMaW5lSGVpZ2h0IH0gZnJvbSAnLi9nZXQtbGluZS1oZWlnaHQnO1xuaW1wb3J0IHsgdXNlQ3ggfSBmcm9tICcuLi91dGlscy9ob29rcy91c2UtY3gnO1xuaW1wb3J0IHR5cGUgeyBQcm9wcyB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHR5cGUgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG4vKipcbiAqIEBwYXJhbSB7aW1wb3J0KCcuLi9jb250ZXh0JykuV29yZFByZXNzQ29tcG9uZW50UHJvcHM8aW1wb3J0KCcuL3R5cGVzJykuUHJvcHMsICdzcGFuJz59IHByb3BzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHVzZVRleHQoXG5cdHByb3BzOiBXb3JkUHJlc3NDb21wb25lbnRQcm9wczwgUHJvcHMsICdzcGFuJyA+XG4pIHtcblx0Y29uc3Qge1xuXHRcdGFkanVzdExpbmVIZWlnaHRGb3JJbm5lckNvbnRyb2xzLFxuXHRcdGFsaWduLFxuXHRcdGNoaWxkcmVuLFxuXHRcdGNsYXNzTmFtZSxcblx0XHRjb2xvcixcblx0XHRlbGxpcHNpemVNb2RlLFxuXHRcdGlzRGVzdHJ1Y3RpdmUgPSBmYWxzZSxcblx0XHRkaXNwbGF5LFxuXHRcdGhpZ2hsaWdodEVzY2FwZSA9IGZhbHNlLFxuXHRcdGhpZ2hsaWdodENhc2VTZW5zaXRpdmUgPSBmYWxzZSxcblx0XHRoaWdobGlnaHRXb3Jkcyxcblx0XHRoaWdobGlnaHRTYW5pdGl6ZSxcblx0XHRpc0Jsb2NrID0gZmFsc2UsXG5cdFx0bGV0dGVyU3BhY2luZyxcblx0XHRsaW5lSGVpZ2h0OiBsaW5lSGVpZ2h0UHJvcCxcblx0XHRvcHRpbWl6ZVJlYWRhYmlsaXR5Rm9yLFxuXHRcdHNpemUsXG5cdFx0dHJ1bmNhdGUgPSBmYWxzZSxcblx0XHR1cHBlckNhc2UgPSBmYWxzZSxcblx0XHR2YXJpYW50LFxuXHRcdHdlaWdodCA9IENPTkZJRy5mb250V2VpZ2h0LFxuXHRcdC4uLm90aGVyUHJvcHNcblx0fSA9IHVzZUNvbnRleHRTeXN0ZW0oIHByb3BzLCAnVGV4dCcgKTtcblxuXHRsZXQgY29udGVudDogUmVhY3QuUmVhY3ROb2RlID0gY2hpbGRyZW47XG5cdGNvbnN0IGlzSGlnaGxpZ2h0ZXIgPSBBcnJheS5pc0FycmF5KCBoaWdobGlnaHRXb3JkcyApO1xuXHRjb25zdCBpc0NhcHRpb24gPSBzaXplID09PSAnY2FwdGlvbic7XG5cblx0aWYgKCBpc0hpZ2hsaWdodGVyICkge1xuXHRcdGlmICggdHlwZW9mIGNoaWxkcmVuICE9PSAnc3RyaW5nJyApIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoXG5cdFx0XHRcdCdgY2hpbGRyZW5gIG9mIGBUZXh0YCBtdXN0IG9ubHkgYmUgYHN0cmluZ2AgdHlwZXMgd2hlbiBgaGlnaGxpZ2h0V29yZHNgIGlzIGRlZmluZWQnXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGNvbnRlbnQgPSBjcmVhdGVIaWdobGlnaHRlclRleHQoIHtcblx0XHRcdGF1dG9Fc2NhcGU6IGhpZ2hsaWdodEVzY2FwZSxcblx0XHRcdGNoaWxkcmVuLFxuXHRcdFx0Y2FzZVNlbnNpdGl2ZTogaGlnaGxpZ2h0Q2FzZVNlbnNpdGl2ZSxcblx0XHRcdHNlYXJjaFdvcmRzOiBoaWdobGlnaHRXb3Jkcyxcblx0XHRcdHNhbml0aXplOiBoaWdobGlnaHRTYW5pdGl6ZSxcblx0XHR9ICk7XG5cdH1cblxuXHRjb25zdCBjeCA9IHVzZUN4KCk7XG5cblx0Y29uc3QgY2xhc3NlcyA9IHVzZU1lbW8oICgpID0+IHtcblx0XHRjb25zdCBzeDogUmVjb3JkPCBzdHJpbmcsIFNlcmlhbGl6ZWRTdHlsZXMgfCBudWxsID4gPSB7fTtcblxuXHRcdGNvbnN0IGxpbmVIZWlnaHQgPSBnZXRMaW5lSGVpZ2h0KFxuXHRcdFx0YWRqdXN0TGluZUhlaWdodEZvcklubmVyQ29udHJvbHMsXG5cdFx0XHRsaW5lSGVpZ2h0UHJvcFxuXHRcdCk7XG5cblx0XHRzeC5CYXNlID0gY3NzKCB7XG5cdFx0XHRjb2xvcixcblx0XHRcdGRpc3BsYXksXG5cdFx0XHRmb250U2l6ZTogZ2V0Rm9udFNpemUoIHNpemUgKSxcblx0XHRcdGZvbnRXZWlnaHQ6IHdlaWdodCxcblx0XHRcdGxpbmVIZWlnaHQsXG5cdFx0XHRsZXR0ZXJTcGFjaW5nLFxuXHRcdFx0dGV4dEFsaWduOiBhbGlnbixcblx0XHR9ICk7XG5cblx0XHRzeC51cHBlckNhc2UgPSBjc3MoIHsgdGV4dFRyYW5zZm9ybTogJ3VwcGVyY2FzZScgfSApO1xuXG5cdFx0c3gub3B0aW1hbFRleHRDb2xvciA9IG51bGw7XG5cblx0XHRpZiAoIG9wdGltaXplUmVhZGFiaWxpdHlGb3IgKSB7XG5cdFx0XHRjb25zdCBpc09wdGltYWxUZXh0Q29sb3JEYXJrID1cblx0XHRcdFx0Z2V0T3B0aW1hbFRleHRTaGFkZSggb3B0aW1pemVSZWFkYWJpbGl0eUZvciApID09PSAnZGFyayc7XG5cblx0XHRcdC8vIFNob3VsZCBub3QgdXNlIHRoZW1lIGNvbG9yc1xuXHRcdFx0c3gub3B0aW1hbFRleHRDb2xvciA9IGlzT3B0aW1hbFRleHRDb2xvckRhcmtcblx0XHRcdFx0PyBjc3MoIHsgY29sb3I6IENPTE9SUy5ncmF5WyA5MDAgXSB9IClcblx0XHRcdFx0OiBjc3MoIHsgY29sb3I6IENPTE9SUy53aGl0ZSB9ICk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGN4KFxuXHRcdFx0c3R5bGVzLlRleHQsXG5cdFx0XHRzeC5CYXNlLFxuXHRcdFx0c3gub3B0aW1hbFRleHRDb2xvcixcblx0XHRcdGlzRGVzdHJ1Y3RpdmUgJiYgc3R5bGVzLmRlc3RydWN0aXZlLFxuXHRcdFx0ISEgaXNIaWdobGlnaHRlciAmJiBzdHlsZXMuaGlnaGxpZ2h0ZXJUZXh0LFxuXHRcdFx0aXNCbG9jayAmJiBzdHlsZXMuYmxvY2ssXG5cdFx0XHRpc0NhcHRpb24gJiYgc3R5bGVzLm11dGVkLFxuXHRcdFx0dmFyaWFudCAmJiBzdHlsZXNbIHZhcmlhbnQgXSxcblx0XHRcdHVwcGVyQ2FzZSAmJiBzeC51cHBlckNhc2UsXG5cdFx0XHRjbGFzc05hbWVcblx0XHQpO1xuXHR9LCBbXG5cdFx0YWRqdXN0TGluZUhlaWdodEZvcklubmVyQ29udHJvbHMsXG5cdFx0YWxpZ24sXG5cdFx0Y2xhc3NOYW1lLFxuXHRcdGNvbG9yLFxuXHRcdGN4LFxuXHRcdGRpc3BsYXksXG5cdFx0aXNCbG9jayxcblx0XHRpc0NhcHRpb24sXG5cdFx0aXNEZXN0cnVjdGl2ZSxcblx0XHRpc0hpZ2hsaWdodGVyLFxuXHRcdGxldHRlclNwYWNpbmcsXG5cdFx0bGluZUhlaWdodFByb3AsXG5cdFx0b3B0aW1pemVSZWFkYWJpbGl0eUZvcixcblx0XHRzaXplLFxuXHRcdHVwcGVyQ2FzZSxcblx0XHR2YXJpYW50LFxuXHRcdHdlaWdodCxcblx0XSApO1xuXG5cdGxldCBmaW5hbEVsbGlwc2l6ZU1vZGU6IHVuZGVmaW5lZCB8ICdhdXRvJyB8ICdub25lJztcblx0aWYgKCB0cnVuY2F0ZSA9PT0gdHJ1ZSApIHtcblx0XHRmaW5hbEVsbGlwc2l6ZU1vZGUgPSAnYXV0byc7XG5cdH1cblx0aWYgKCB0cnVuY2F0ZSA9PT0gZmFsc2UgKSB7XG5cdFx0ZmluYWxFbGxpcHNpemVNb2RlID0gJ25vbmUnO1xuXHR9XG5cblx0Y29uc3QgZmluYWxDb21wb25lbnRQcm9wcyA9IHtcblx0XHQuLi5vdGhlclByb3BzLFxuXHRcdGNsYXNzTmFtZTogY2xhc3Nlcyxcblx0XHRjaGlsZHJlbixcblx0XHRlbGxpcHNpemVNb2RlOiBlbGxpcHNpemVNb2RlIHx8IGZpbmFsRWxsaXBzaXplTW9kZSxcblx0fTtcblxuXHRjb25zdCB0cnVuY2F0ZVByb3BzID0gdXNlVHJ1bmNhdGUoIGZpbmFsQ29tcG9uZW50UHJvcHMgKTtcblxuXHQvKipcblx0ICogRW5oYW5jZSBjaGlsZCBgPExpbmsgLz5gIGNvbXBvbmVudHMgdG8gaW5oZXJpdCBmb250IHNpemUuXG5cdCAqL1xuXHRpZiAoICEgdHJ1bmNhdGUgJiYgQXJyYXkuaXNBcnJheSggY2hpbGRyZW4gKSApIHtcblx0XHRjb250ZW50ID0gQ2hpbGRyZW4ubWFwKCBjaGlsZHJlbiwgKCBjaGlsZCApID0+IHtcblx0XHRcdGlmIChcblx0XHRcdFx0dHlwZW9mIGNoaWxkICE9PSAnb2JqZWN0JyB8fFxuXHRcdFx0XHRjaGlsZCA9PT0gbnVsbCB8fFxuXHRcdFx0XHQhICggJ3Byb3BzJyBpbiBjaGlsZCApXG5cdFx0XHQpIHtcblx0XHRcdFx0cmV0dXJuIGNoaWxkO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBpc0xpbmsgPSBoYXNDb25uZWN0TmFtZXNwYWNlKCBjaGlsZCwgWyAnTGluaycgXSApO1xuXHRcdFx0aWYgKCBpc0xpbmsgKSB7XG5cdFx0XHRcdHJldHVybiBjbG9uZUVsZW1lbnQoIGNoaWxkLCB7XG5cdFx0XHRcdFx0c2l6ZTogY2hpbGQucHJvcHMuc2l6ZSB8fCAnaW5oZXJpdCcsXG5cdFx0XHRcdH0gKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGNoaWxkO1xuXHRcdH0gKTtcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0Li4udHJ1bmNhdGVQcm9wcyxcblx0XHRjaGlsZHJlbjogdHJ1bmNhdGUgPyB0cnVuY2F0ZVByb3BzLmNoaWxkcmVuIDogY29udGVudCxcblx0fTtcbn1cbiJdfQ== */");
    }
    return cx2(Text, sx.Base, sx.optimalTextColor, isDestructive && destructive, !!isHighlighter && highlighterText, isBlock && block2, isCaption && muted, variant && styles_exports3[variant], upperCase2 && sx.upperCase, className);
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
    content = Children.map(children, (child) => {
      if (typeof child !== "object" || child === null || !("props" in child)) {
        return child;
      }
      const isLink = hasConnectNamespace(child, ["Link"]);
      if (isLink) {
        return cloneElement(child, {
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

// ../../../node_modules/.pnpm/@wordpress+components@30.4.0_@types+react@18.3.25_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/text/component.js
import { jsx as _jsx4 } from "react/jsx-runtime";
function UnconnectedText(props, forwardedRef) {
  const textProps = useText(props);
  return /* @__PURE__ */ _jsx4(component_default, {
    as: "span",
    ...textProps,
    ref: forwardedRef
  });
}
var Text2 = contextConnect(UnconnectedText, "Text");
var component_default4 = Text2;

// ../../../node_modules/.pnpm/@wordpress+components@30.4.0_@types+react@18.3.25_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/h-stack/utils.js
var H_ALIGNMENTS = {
  bottom: {
    align: "flex-end",
    justify: "center"
  },
  bottomLeft: {
    align: "flex-end",
    justify: "flex-start"
  },
  bottomRight: {
    align: "flex-end",
    justify: "flex-end"
  },
  center: {
    align: "center",
    justify: "center"
  },
  edge: {
    align: "center",
    justify: "space-between"
  },
  left: {
    align: "center",
    justify: "flex-start"
  },
  right: {
    align: "center",
    justify: "flex-end"
  },
  stretch: {
    align: "stretch"
  },
  top: {
    align: "flex-start",
    justify: "center"
  },
  topLeft: {
    align: "flex-start",
    justify: "flex-start"
  },
  topRight: {
    align: "flex-start",
    justify: "flex-end"
  }
};
var V_ALIGNMENTS = {
  bottom: {
    justify: "flex-end",
    align: "center"
  },
  bottomLeft: {
    justify: "flex-end",
    align: "flex-start"
  },
  bottomRight: {
    justify: "flex-end",
    align: "flex-end"
  },
  center: {
    justify: "center",
    align: "center"
  },
  edge: {
    justify: "space-between",
    align: "center"
  },
  left: {
    justify: "center",
    align: "flex-start"
  },
  right: {
    justify: "center",
    align: "flex-end"
  },
  stretch: {
    align: "stretch"
  },
  top: {
    justify: "flex-start",
    align: "center"
  },
  topLeft: {
    justify: "flex-start",
    align: "flex-start"
  },
  topRight: {
    justify: "flex-start",
    align: "flex-end"
  }
};
function getAlignmentProps(alignment, direction = "row") {
  if (!isValueDefined(alignment)) {
    return {};
  }
  const isVertical = direction === "column";
  const props = isVertical ? V_ALIGNMENTS : H_ALIGNMENTS;
  const alignmentProps = alignment in props ? props[alignment] : {
    align: alignment
  };
  return alignmentProps;
}

// ../../../node_modules/.pnpm/@wordpress+components@30.4.0_@types+react@18.3.25_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/utils/get-valid-children.js
function getValidChildren(children) {
  if (typeof children === "string") {
    return [children];
  }
  return Children.toArray(children).filter((child) => isValidElement(child));
}

// ../../../node_modules/.pnpm/@wordpress+components@30.4.0_@types+react@18.3.25_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/h-stack/hook.js
import { jsx as _jsx5 } from "react/jsx-runtime";
function useHStack(props) {
  const {
    alignment = "edge",
    children,
    direction,
    spacing = 2,
    ...otherProps
  } = useContextSystem(props, "HStack");
  const align = getAlignmentProps(alignment, direction);
  const validChildren = getValidChildren(children);
  const clonedChildren = validChildren.map((child, index) => {
    const _isSpacer = hasConnectNamespace(child, ["Spacer"]);
    if (_isSpacer) {
      const childElement = child;
      const _key = childElement.key || `hstack-${index}`;
      return /* @__PURE__ */ _jsx5(component_default2, {
        isBlock: true,
        ...childElement.props
      }, _key);
    }
    return child;
  });
  const propsForFlex = {
    children: clonedChildren,
    direction,
    justify: "center",
    ...align,
    ...otherProps,
    gap: spacing
  };
  const {
    isColumn,
    ...flexProps
  } = useFlex(propsForFlex);
  return flexProps;
}

// ../../../node_modules/.pnpm/@wordpress+components@30.4.0_@types+react@18.3.25_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/v-stack/hook.js
function useVStack(props) {
  const {
    expanded = false,
    alignment = "stretch",
    ...otherProps
  } = useContextSystem(props, "VStack");
  const hStackProps = useHStack({
    direction: "column",
    expanded,
    alignment,
    ...otherProps
  });
  return hStackProps;
}

// ../../../node_modules/.pnpm/@wordpress+components@30.4.0_@types+react@18.3.25_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/v-stack/component.js
import { jsx as _jsx6 } from "react/jsx-runtime";
function UnconnectedVStack(props, forwardedRef) {
  const vStackProps = useVStack(props);
  return /* @__PURE__ */ _jsx6(component_default, {
    ...vStackProps,
    ref: forwardedRef
  });
}
var VStack = contextConnect(UnconnectedVStack, "VStack");
var component_default5 = VStack;

// ../../../node_modules/.pnpm/@wordpress+components@30.4.0_@types+react@18.3.25_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/grid/utils.js
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
function getAlignmentProps2(alignment) {
  const alignmentProps = alignment ? ALIGNMENTS[alignment] : {};
  return alignmentProps;
}

// ../../../node_modules/.pnpm/@wordpress+components@30.4.0_@types+react@18.3.25_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/grid/hook.js
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
  const classes = useMemo(() => {
    const alignmentProps = getAlignmentProps2(alignment);
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
    }, process.env.NODE_ENV === "production" ? "" : ";label:gridClasses;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvY29tcG9uZW50cy9zcmMvZ3JpZC9ob29rLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXVEc0IiLCJmaWxlIjoiQHdvcmRwcmVzcy9jb21wb25lbnRzL3NyYy9ncmlkL2hvb2sudHMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEV4dGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyBjc3MgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5cbi8qKlxuICogV29yZFByZXNzIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyB1c2VNZW1vIH0gZnJvbSAnQHdvcmRwcmVzcy9lbGVtZW50JztcblxuLyoqXG4gKiBJbnRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHR5cGUgeyBXb3JkUHJlc3NDb21wb25lbnRQcm9wcyB9IGZyb20gJy4uL2NvbnRleHQnO1xuaW1wb3J0IHsgdXNlQ29udGV4dFN5c3RlbSB9IGZyb20gJy4uL2NvbnRleHQnO1xuaW1wb3J0IHsgZ2V0QWxpZ25tZW50UHJvcHMgfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7IHVzZVJlc3BvbnNpdmVWYWx1ZSB9IGZyb20gJy4uL3V0aWxzL3VzZS1yZXNwb25zaXZlLXZhbHVlJztcbmltcG9ydCBDT05GSUcgZnJvbSAnLi4vdXRpbHMvY29uZmlnLXZhbHVlcyc7XG5pbXBvcnQgeyB1c2VDeCB9IGZyb20gJy4uL3V0aWxzL2hvb2tzL3VzZS1jeCc7XG5pbXBvcnQgdHlwZSB7IEdyaWRQcm9wcyB9IGZyb20gJy4vdHlwZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB1c2VHcmlkKFxuXHRwcm9wczogV29yZFByZXNzQ29tcG9uZW50UHJvcHM8IEdyaWRQcm9wcywgJ2RpdicgPlxuKSB7XG5cdGNvbnN0IHtcblx0XHRhbGlnbixcblx0XHRhbGlnbm1lbnQsXG5cdFx0Y2xhc3NOYW1lLFxuXHRcdGNvbHVtbkdhcCxcblx0XHRjb2x1bW5zID0gMixcblx0XHRnYXAgPSAzLFxuXHRcdGlzSW5saW5lID0gZmFsc2UsXG5cdFx0anVzdGlmeSxcblx0XHRyb3dHYXAsXG5cdFx0cm93cyxcblx0XHR0ZW1wbGF0ZUNvbHVtbnMsXG5cdFx0dGVtcGxhdGVSb3dzLFxuXHRcdC4uLm90aGVyUHJvcHNcblx0fSA9IHVzZUNvbnRleHRTeXN0ZW0oIHByb3BzLCAnR3JpZCcgKTtcblxuXHRjb25zdCBjb2x1bW5zQXNBcnJheSA9IEFycmF5LmlzQXJyYXkoIGNvbHVtbnMgKSA/IGNvbHVtbnMgOiBbIGNvbHVtbnMgXTtcblx0Y29uc3QgY29sdW1uID0gdXNlUmVzcG9uc2l2ZVZhbHVlKCBjb2x1bW5zQXNBcnJheSApO1xuXHRjb25zdCByb3dzQXNBcnJheSA9IEFycmF5LmlzQXJyYXkoIHJvd3MgKSA/IHJvd3MgOiBbIHJvd3MgXTtcblx0Y29uc3Qgcm93ID0gdXNlUmVzcG9uc2l2ZVZhbHVlKCByb3dzQXNBcnJheSApO1xuXG5cdGNvbnN0IGdyaWRUZW1wbGF0ZUNvbHVtbnMgPVxuXHRcdHRlbXBsYXRlQ29sdW1ucyB8fCAoICEhIGNvbHVtbnMgJiYgYHJlcGVhdCggJHsgY29sdW1uIH0sIDFmciApYCApO1xuXHRjb25zdCBncmlkVGVtcGxhdGVSb3dzID1cblx0XHR0ZW1wbGF0ZVJvd3MgfHwgKCAhISByb3dzICYmIGByZXBlYXQoICR7IHJvdyB9LCAxZnIgKWAgKTtcblxuXHRjb25zdCBjeCA9IHVzZUN4KCk7XG5cblx0Y29uc3QgY2xhc3NlcyA9IHVzZU1lbW8oICgpID0+IHtcblx0XHRjb25zdCBhbGlnbm1lbnRQcm9wcyA9IGdldEFsaWdubWVudFByb3BzKCBhbGlnbm1lbnQgKTtcblxuXHRcdGNvbnN0IGdyaWRDbGFzc2VzID0gY3NzKCB7XG5cdFx0XHRhbGlnbkl0ZW1zOiBhbGlnbixcblx0XHRcdGRpc3BsYXk6IGlzSW5saW5lID8gJ2lubGluZS1ncmlkJyA6ICdncmlkJyxcblx0XHRcdGdhcDogYGNhbGMoICR7IENPTkZJRy5ncmlkQmFzZSB9ICogJHsgZ2FwIH0gKWAsXG5cdFx0XHRncmlkVGVtcGxhdGVDb2x1bW5zOiBncmlkVGVtcGxhdGVDb2x1bW5zIHx8IHVuZGVmaW5lZCxcblx0XHRcdGdyaWRUZW1wbGF0ZVJvd3M6IGdyaWRUZW1wbGF0ZVJvd3MgfHwgdW5kZWZpbmVkLFxuXHRcdFx0Z3JpZFJvd0dhcDogcm93R2FwLFxuXHRcdFx0Z3JpZENvbHVtbkdhcDogY29sdW1uR2FwLFxuXHRcdFx0anVzdGlmeUNvbnRlbnQ6IGp1c3RpZnksXG5cdFx0XHR2ZXJ0aWNhbEFsaWduOiBpc0lubGluZSA/ICdtaWRkbGUnIDogdW5kZWZpbmVkLFxuXHRcdFx0Li4uYWxpZ25tZW50UHJvcHMsXG5cdFx0fSApO1xuXG5cdFx0cmV0dXJuIGN4KCBncmlkQ2xhc3NlcywgY2xhc3NOYW1lICk7XG5cdH0sIFtcblx0XHRhbGlnbixcblx0XHRhbGlnbm1lbnQsXG5cdFx0Y2xhc3NOYW1lLFxuXHRcdGNvbHVtbkdhcCxcblx0XHRjeCxcblx0XHRnYXAsXG5cdFx0Z3JpZFRlbXBsYXRlQ29sdW1ucyxcblx0XHRncmlkVGVtcGxhdGVSb3dzLFxuXHRcdGlzSW5saW5lLFxuXHRcdGp1c3RpZnksXG5cdFx0cm93R2FwLFxuXHRdICk7XG5cblx0cmV0dXJuIHsgLi4ub3RoZXJQcm9wcywgY2xhc3NOYW1lOiBjbGFzc2VzIH07XG59XG4iXX0= */");
    return cx2(gridClasses, className);
  }, [align, alignment, className, columnGap, cx2, gap, gridTemplateColumns, gridTemplateRows, isInline, justify, rowGap]);
  return {
    ...otherProps,
    className: classes
  };
}

// ../../../node_modules/.pnpm/@wordpress+components@30.4.0_@types+react@18.3.25_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/@wordpress/components/build-module/grid/component.js
import { jsx as _jsx7 } from "react/jsx-runtime";
function UnconnectedGrid(props, forwardedRef) {
  const gridProps = useGrid(props);
  return /* @__PURE__ */ _jsx7(component_default, {
    ...gridProps,
    ref: forwardedRef
  });
}
var Grid = contextConnect(UnconnectedGrid, "Grid");
var component_default6 = Grid;

// src/components/leaderboard-chart/leaderboard-chart.tsx
import { __ as __2 } from "@wordpress/i18n";
import clsx from "clsx";
import { useContext as useContext6, useMemo as useMemo3 } from "react";

// src/components/leaderboard-chart/hooks/use-leaderboard-legend-items.ts
import { __ } from "@wordpress/i18n";
import { useMemo as useMemo2 } from "react";
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
  return useMemo2(() => {
    if (!data || data.length === 0) {
      return [];
    }
    const items = [];
    const { color: resolvedPrimaryColor } = getElementStyles({
      index: 0,
      overrideColor: primaryColor || leaderboardChartSettings.primaryColor
    });
    items.push({
      label: legendLabels?.primary || __("Current period", "jetpack-charts"),
      value: "",
      color: resolvedPrimaryColor
    });
    if (withComparison && !withOverlayLabel) {
      const { color: resolvedSecondaryColor } = getElementStyles({
        index: 1,
        overrideColor: secondaryColor || leaderboardChartSettings.secondaryColor
      });
      items.push({
        label: legendLabels?.comparison || __("Previous period", "jetpack-charts"),
        value: "",
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

// src/components/leaderboard-chart/leaderboard-chart.module.scss
var leaderboard_chart_module_default = {
  "leaderboardChart": "a8ccharts-zxakPT",
  "loading": "a8ccharts--AGv-8",
  "barWithLabelContainer": "a8ccharts-9RE0Uo",
  "is-overlay": "a8ccharts-Fqdi5w",
  "label": "a8ccharts-7ZUu0T",
  "bar": "a8ccharts-CnJvgl",
  "valueContainer": "a8ccharts-ZlLh4R",
  "overlayLabel": "a8ccharts-pRqShB",
  "emptyState": "a8ccharts-0dkfyF"
};

// src/components/leaderboard-chart/leaderboard-chart.tsx
import { Fragment as Fragment5, jsx as jsx3, jsxs } from "react/jsx-runtime";
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
var BarLabel = ({ label }) => /* @__PURE__ */ jsx3(Fragment5, { children: typeof label === "string" ? /* @__PURE__ */ jsx3(component_default4, { className: leaderboard_chart_module_default.label, children: label }) : label });
var BarWithLabel = ({
  entry,
  withComparison,
  withOverlayLabel,
  primaryColor,
  secondaryColor
}) => /* @__PURE__ */ jsxs(
  "div",
  {
    className: clsx(leaderboard_chart_module_default.barWithLabelContainer, {
      [leaderboard_chart_module_default["is-overlay"]]: withOverlayLabel
    }),
    children: [
      /* @__PURE__ */ jsx3(BarLabel, { label: entry.label }),
      /* @__PURE__ */ jsx3(
        "div",
        {
          className: leaderboard_chart_module_default.bar,
          style: {
            width: entry.currentShare + "%",
            backgroundColor: primaryColor
          }
        }
      ),
      withComparison && !withOverlayLabel && /* @__PURE__ */ jsx3(
        "div",
        {
          className: leaderboard_chart_module_default.bar,
          style: {
            width: entry.previousShare + "%",
            backgroundColor: secondaryColor
          }
        }
      )
    ]
  }
);
var LeaderboardChartInternal = ({
  data,
  chartId: providedChartId,
  withComparison = false,
  withOverlayLabel = false,
  primaryColor,
  secondaryColor,
  valueFormatter = defaultValueFormatter,
  deltaFormatter = defaultDeltaFormatter,
  loading = false,
  showLegend = false,
  legendOrientation = "horizontal",
  legendPosition = "bottom",
  legendAlignment = "center",
  legendShape = "circle",
  legendShapeWidth = 8,
  legendShapeHeight = 8,
  legendLabels,
  className,
  style,
  children
}) => {
  const chartId = useChartId(providedChartId);
  const { leaderboardChart: leaderboardChartSettings } = useGlobalChartsTheme();
  const { otherChildren } = useChartChildren(children, "LeaderboardChart");
  const {
    labelSpacing,
    rowGap,
    columnGap,
    primaryColor: settingsPrimaryColor,
    secondaryColor: settingsSecondaryColor,
    deltaColors
  } = leaderboardChartSettings;
  const { getElementStyles } = useGlobalChartsContext();
  const { color: resolvedPrimaryColor } = getElementStyles({
    index: 0,
    overrideColor: primaryColor || settingsPrimaryColor
  });
  const { color: resolvedSecondaryColor } = getElementStyles({
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
  const isDataValid = Boolean(data && data.length > 0);
  const chartMetadata = useMemo3(
    () => ({
      withComparison,
      withOverlayLabel
    }),
    [withComparison, withOverlayLabel]
  );
  useChartRegistration({
    chartId,
    legendItems,
    chartType: "leaderboard",
    isDataValid,
    metadata: chartMetadata
  });
  if (!data || data.length === 0) {
    return /* @__PURE__ */ jsx3(
      SingleChartContext.Provider,
      {
        value: {
          chartId,
          chartWidth: 0,
          // LeaderboardChart doesn't need specific dimensions
          chartHeight: 0
        },
        children: /* @__PURE__ */ jsxs(
          "div",
          {
            className: clsx(leaderboard_chart_module_default.leaderboardChart, loading && leaderboard_chart_module_default.loading, className),
            style,
            children: [
              /* @__PURE__ */ jsx3("div", { className: leaderboard_chart_module_default.emptyState, children: loading ? __2("Loading\u2026", "jetpack-charts") : __2("No data available", "jetpack-charts") }),
              otherChildren
            ]
          }
        )
      }
    );
  }
  return /* @__PURE__ */ jsx3(
    SingleChartContext.Provider,
    {
      value: {
        chartId,
        chartWidth: 0,
        // LeaderboardChart doesn't need specific dimensions
        chartHeight: 0
      },
      children: /* @__PURE__ */ jsxs(
        "div",
        {
          className: clsx(leaderboard_chart_module_default.leaderboardChart, loading && leaderboard_chart_module_default.loading, className),
          style: {
            ...style,
            display: "flex",
            flexDirection: showLegend && legendPosition === "top" ? "column-reverse" : "column",
            gap: showLegend ? "16px" : "0"
          },
          children: [
            /* @__PURE__ */ jsx3(
              component_default6,
              {
                className: leaderboard_chart_module_default.leaderboardGrid,
                templateColumns: "minmax(0, 1fr) auto",
                rowGap,
                columnGap,
                style: {
                  flex: 1
                },
                children: data.map((entry) => {
                  const colorIndex = Math.sign(entry.delta) + 1;
                  const deltaColor = deltaColors[colorIndex];
                  return /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsx3(component_default5, { spacing: labelSpacing, children: /* @__PURE__ */ jsx3(
                      BarWithLabel,
                      {
                        entry,
                        withComparison,
                        withOverlayLabel,
                        primaryColor: resolvedPrimaryColor,
                        secondaryColor: resolvedSecondaryColor
                      }
                    ) }),
                    /* @__PURE__ */ jsxs(
                      "div",
                      {
                        className: clsx(leaderboard_chart_module_default.valueContainer, {
                          [leaderboard_chart_module_default.overlayLabel]: withOverlayLabel
                        }),
                        children: [
                          /* @__PURE__ */ jsx3(component_default4, { children: valueFormatter(entry.currentValue) }),
                          withComparison && /* @__PURE__ */ jsx3(component_default4, { style: { color: deltaColor }, children: deltaFormatter(entry.delta) })
                        ]
                      }
                    )
                  ] }, entry.id);
                })
              }
            ),
            showLegend && /* @__PURE__ */ jsx3(
              Legend,
              {
                orientation: legendOrientation,
                position: legendPosition,
                alignment: legendAlignment,
                shape: legendShape,
                shapeWidth: legendShapeWidth,
                shapeHeight: legendShapeHeight,
                chartId
              }
            ),
            otherChildren
          ]
        }
      )
    }
  );
};
var LeaderboardChartWithProvider = (props) => {
  const existingContext = useContext6(GlobalChartsContext);
  if (existingContext) {
    return /* @__PURE__ */ jsx3(LeaderboardChartInternal, { ...props });
  }
  return /* @__PURE__ */ jsx3(GlobalChartsProvider, { children: /* @__PURE__ */ jsx3(LeaderboardChartInternal, { ...props }) });
};
LeaderboardChartWithProvider.displayName = "LeaderboardChart";
var LeaderboardChart = attachSubComponents(LeaderboardChartWithProvider, {
  Legend
});
var LeaderboardChartResponsive = attachSubComponents(
  withResponsive(LeaderboardChartWithProvider),
  {
    Legend
  }
);

export {
  useLeaderboardLegendItems,
  LeaderboardChart,
  LeaderboardChartResponsive
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
//# sourceMappingURL=chunk-QPM4XHPG.js.map