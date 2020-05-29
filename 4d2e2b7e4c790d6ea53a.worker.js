/*! For license information please see 4d2e2b7e4c790d6ea53a.worker.js.LICENSE.txt */
!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/schedulestacker-js/",r(r.s=6)}([function(e,t,r){"use strict";(function(t){function n(e,t){if(e===t)return 0;for(var r=e.length,n=t.length,o=0,i=Math.min(r,n);o<i;++o)if(e[o]!==t[o]){r=e[o],n=t[o];break}return r<n?-1:n<r?1:0}function o(e){return t.Buffer&&"function"===typeof t.Buffer.isBuffer?t.Buffer.isBuffer(e):!(null==e||!e._isBuffer)}var i=r(2),u=Object.prototype.hasOwnProperty,c=Array.prototype.slice,a="foo"===function(){}.name;function f(e){return Object.prototype.toString.call(e)}function s(e){return!o(e)&&("function"===typeof t.ArrayBuffer&&("function"===typeof ArrayBuffer.isView?ArrayBuffer.isView(e):!!e&&(e instanceof DataView||!!(e.buffer&&e.buffer instanceof ArrayBuffer))))}var l=e.exports=m,p=/\s*function\s+([^\(\s]*)\s*/;function y(e){if(i.isFunction(e)){if(a)return e.name;var t=e.toString().match(p);return t&&t[1]}}function g(e,t){return"string"===typeof e?e.length<t?e:e.slice(0,t):e}function h(e){if(a||!i.isFunction(e))return i.inspect(e);var t=y(e);return"[Function"+(t?": "+t:"")+"]"}function d(e,t,r,n,o){throw new l.AssertionError({message:r,actual:e,expected:t,operator:n,stackStartFunction:o})}function m(e,t){e||d(e,!0,t,"==",l.ok)}function b(e,t,r,u){if(e===t)return!0;if(o(e)&&o(t))return 0===n(e,t);if(i.isDate(e)&&i.isDate(t))return e.getTime()===t.getTime();if(i.isRegExp(e)&&i.isRegExp(t))return e.source===t.source&&e.global===t.global&&e.multiline===t.multiline&&e.lastIndex===t.lastIndex&&e.ignoreCase===t.ignoreCase;if(null!==e&&"object"===typeof e||null!==t&&"object"===typeof t){if(s(e)&&s(t)&&f(e)===f(t)&&!(e instanceof Float32Array||e instanceof Float64Array))return 0===n(new Uint8Array(e.buffer),new Uint8Array(t.buffer));if(o(e)!==o(t))return!1;var a=(u=u||{actual:[],expected:[]}).actual.indexOf(e);return-1!==a&&a===u.expected.indexOf(t)||(u.actual.push(e),u.expected.push(t),function(e,t,r,n){if(null===e||void 0===e||null===t||void 0===t)return!1;if(i.isPrimitive(e)||i.isPrimitive(t))return e===t;if(r&&Object.getPrototypeOf(e)!==Object.getPrototypeOf(t))return!1;var o=v(e),u=v(t);if(o&&!u||!o&&u)return!1;if(o)return e=c.call(e),t=c.call(t),b(e,t,r);var a,f,s=E(e),l=E(t);if(s.length!==l.length)return!1;for(s.sort(),l.sort(),f=s.length-1;f>=0;f--)if(s[f]!==l[f])return!1;for(f=s.length-1;f>=0;f--)if(a=s[f],!b(e[a],t[a],r,n))return!1;return!0}(e,t,r,u))}return r?e===t:e==t}function v(e){return"[object Arguments]"==Object.prototype.toString.call(e)}function O(e,t){if(!e||!t)return!1;if("[object RegExp]"==Object.prototype.toString.call(t))return t.test(e);try{if(e instanceof t)return!0}catch(r){}return!Error.isPrototypeOf(t)&&!0===t.call({},e)}function w(e,t,r,n){var o;if("function"!==typeof t)throw new TypeError('"block" argument must be a function');"string"===typeof r&&(n=r,r=null),o=function(e){var t;try{e()}catch(r){t=r}return t}(t),n=(r&&r.name?" ("+r.name+").":".")+(n?" "+n:"."),e&&!o&&d(o,r,"Missing expected exception"+n);var u="string"===typeof n,c=!e&&o&&!r;if((!e&&i.isError(o)&&u&&O(o,r)||c)&&d(o,r,"Got unwanted exception"+n),e&&o&&r&&!O(o,r)||!e&&o)throw o}l.AssertionError=function(e){var t;this.name="AssertionError",this.actual=e.actual,this.expected=e.expected,this.operator=e.operator,e.message?(this.message=e.message,this.generatedMessage=!1):(this.message=g(h((t=this).actual),128)+" "+t.operator+" "+g(h(t.expected),128),this.generatedMessage=!0);var r=e.stackStartFunction||d;if(Error.captureStackTrace)Error.captureStackTrace(this,r);else{var n=new Error;if(n.stack){var o=n.stack,i=y(r),u=o.indexOf("\n"+i);if(u>=0){var c=o.indexOf("\n",u+1);o=o.substring(c+1)}this.stack=o}}},i.inherits(l.AssertionError,Error),l.fail=d,l.ok=m,l.equal=function(e,t,r){e!=t&&d(e,t,r,"==",l.equal)},l.notEqual=function(e,t,r){e==t&&d(e,t,r,"!=",l.notEqual)},l.deepEqual=function(e,t,r){b(e,t,!1)||d(e,t,r,"deepEqual",l.deepEqual)},l.deepStrictEqual=function(e,t,r){b(e,t,!0)||d(e,t,r,"deepStrictEqual",l.deepStrictEqual)},l.notDeepEqual=function(e,t,r){b(e,t,!1)&&d(e,t,r,"notDeepEqual",l.notDeepEqual)},l.notDeepStrictEqual=function e(t,r,n){b(t,r,!0)&&d(t,r,n,"notDeepStrictEqual",e)},l.strictEqual=function(e,t,r){e!==t&&d(e,t,r,"===",l.strictEqual)},l.notStrictEqual=function(e,t,r){e===t&&d(e,t,r,"!==",l.notStrictEqual)},l.throws=function(e,t,r){w(!0,e,t,r)},l.doesNotThrow=function(e,t,r){w(!1,e,t,r)},l.ifError=function(e){if(e)throw e};var E=Object.keys||function(e){var t=[];for(var r in e)u.call(e,r)&&t.push(r);return t}}).call(this,r(1))},function(e,t){var r;r=function(){return this}();try{r=r||new Function("return this")()}catch(n){"object"===typeof window&&(r=window)}e.exports=r},function(e,t,r){(function(e){var n=Object.getOwnPropertyDescriptors||function(e){for(var t=Object.keys(e),r={},n=0;n<t.length;n++)r[t[n]]=Object.getOwnPropertyDescriptor(e,t[n]);return r},o=/%[sdj%]/g;t.format=function(e){if(!m(e)){for(var t=[],r=0;r<arguments.length;r++)t.push(c(arguments[r]));return t.join(" ")}r=1;for(var n=arguments,i=n.length,u=String(e).replace(o,(function(e){if("%%"===e)return"%";if(r>=i)return e;switch(e){case"%s":return String(n[r++]);case"%d":return Number(n[r++]);case"%j":try{return JSON.stringify(n[r++])}catch(t){return"[Circular]"}default:return e}})),a=n[r];r<i;a=n[++r])h(a)||!O(a)?u+=" "+a:u+=" "+c(a);return u},t.deprecate=function(r,n){if("undefined"!==typeof e&&!0===e.noDeprecation)return r;if("undefined"===typeof e)return function(){return t.deprecate(r,n).apply(this,arguments)};var o=!1;return function(){if(!o){if(e.throwDeprecation)throw new Error(n);e.traceDeprecation?console.trace(n):console.error(n),o=!0}return r.apply(this,arguments)}};var i,u={};function c(e,r){var n={seen:[],stylize:f};return arguments.length>=3&&(n.depth=arguments[2]),arguments.length>=4&&(n.colors=arguments[3]),g(r)?n.showHidden=r:r&&t._extend(n,r),b(n.showHidden)&&(n.showHidden=!1),b(n.depth)&&(n.depth=2),b(n.colors)&&(n.colors=!1),b(n.customInspect)&&(n.customInspect=!0),n.colors&&(n.stylize=a),s(n,e,n.depth)}function a(e,t){var r=c.styles[t];return r?"\x1b["+c.colors[r][0]+"m"+e+"\x1b["+c.colors[r][1]+"m":e}function f(e,t){return e}function s(e,r,n){if(e.customInspect&&r&&j(r.inspect)&&r.inspect!==t.inspect&&(!r.constructor||r.constructor.prototype!==r)){var o=r.inspect(n,e);return m(o)||(o=s(e,o,n)),o}var i=function(e,t){if(b(t))return e.stylize("undefined","undefined");if(m(t)){var r="'"+JSON.stringify(t).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return e.stylize(r,"string")}if(d(t))return e.stylize(""+t,"number");if(g(t))return e.stylize(""+t,"boolean");if(h(t))return e.stylize("null","null")}(e,r);if(i)return i;var u=Object.keys(r),c=function(e){var t={};return e.forEach((function(e,r){t[e]=!0})),t}(u);if(e.showHidden&&(u=Object.getOwnPropertyNames(r)),E(r)&&(u.indexOf("message")>=0||u.indexOf("description")>=0))return l(r);if(0===u.length){if(j(r)){var a=r.name?": "+r.name:"";return e.stylize("[Function"+a+"]","special")}if(v(r))return e.stylize(RegExp.prototype.toString.call(r),"regexp");if(w(r))return e.stylize(Date.prototype.toString.call(r),"date");if(E(r))return l(r)}var f,O="",S=!1,x=["{","}"];(y(r)&&(S=!0,x=["[","]"]),j(r))&&(O=" [Function"+(r.name?": "+r.name:"")+"]");return v(r)&&(O=" "+RegExp.prototype.toString.call(r)),w(r)&&(O=" "+Date.prototype.toUTCString.call(r)),E(r)&&(O=" "+l(r)),0!==u.length||S&&0!=r.length?n<0?v(r)?e.stylize(RegExp.prototype.toString.call(r),"regexp"):e.stylize("[Object]","special"):(e.seen.push(r),f=S?function(e,t,r,n,o){for(var i=[],u=0,c=t.length;u<c;++u)A(t,String(u))?i.push(p(e,t,r,n,String(u),!0)):i.push("");return o.forEach((function(o){o.match(/^\d+$/)||i.push(p(e,t,r,n,o,!0))})),i}(e,r,n,c,u):u.map((function(t){return p(e,r,n,c,t,S)})),e.seen.pop(),function(e,t,r){if(e.reduce((function(e,t){return t.indexOf("\n")>=0&&0,e+t.replace(/\u001b\[\d\d?m/g,"").length+1}),0)>60)return r[0]+(""===t?"":t+"\n ")+" "+e.join(",\n  ")+" "+r[1];return r[0]+t+" "+e.join(", ")+" "+r[1]}(f,O,x)):x[0]+O+x[1]}function l(e){return"["+Error.prototype.toString.call(e)+"]"}function p(e,t,r,n,o,i){var u,c,a;if((a=Object.getOwnPropertyDescriptor(t,o)||{value:t[o]}).get?c=a.set?e.stylize("[Getter/Setter]","special"):e.stylize("[Getter]","special"):a.set&&(c=e.stylize("[Setter]","special")),A(n,o)||(u="["+o+"]"),c||(e.seen.indexOf(a.value)<0?(c=h(r)?s(e,a.value,null):s(e,a.value,r-1)).indexOf("\n")>-1&&(c=i?c.split("\n").map((function(e){return"  "+e})).join("\n").substr(2):"\n"+c.split("\n").map((function(e){return"   "+e})).join("\n")):c=e.stylize("[Circular]","special")),b(u)){if(i&&o.match(/^\d+$/))return c;(u=JSON.stringify(""+o)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(u=u.substr(1,u.length-2),u=e.stylize(u,"name")):(u=u.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'"),u=e.stylize(u,"string"))}return u+": "+c}function y(e){return Array.isArray(e)}function g(e){return"boolean"===typeof e}function h(e){return null===e}function d(e){return"number"===typeof e}function m(e){return"string"===typeof e}function b(e){return void 0===e}function v(e){return O(e)&&"[object RegExp]"===S(e)}function O(e){return"object"===typeof e&&null!==e}function w(e){return O(e)&&"[object Date]"===S(e)}function E(e){return O(e)&&("[object Error]"===S(e)||e instanceof Error)}function j(e){return"function"===typeof e}function S(e){return Object.prototype.toString.call(e)}function x(e){return e<10?"0"+e.toString(10):e.toString(10)}t.debuglog=function(r){if(b(i)&&(i=Object({NODE_ENV:"production",PUBLIC_URL:"/schedulestacker-js",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0}).NODE_DEBUG||""),r=r.toUpperCase(),!u[r])if(new RegExp("\\b"+r+"\\b","i").test(i)){var n=e.pid;u[r]=function(){var e=t.format.apply(t,arguments);console.error("%s %d: %s",r,n,e)}}else u[r]=function(){};return u[r]},t.inspect=c,c.colors={bold:[1,22],italic:[3,23],underline:[4,24],inverse:[7,27],white:[37,39],grey:[90,39],black:[30,39],blue:[34,39],cyan:[36,39],green:[32,39],magenta:[35,39],red:[31,39],yellow:[33,39]},c.styles={special:"cyan",number:"yellow",boolean:"yellow",undefined:"grey",null:"bold",string:"green",date:"magenta",regexp:"red"},t.isArray=y,t.isBoolean=g,t.isNull=h,t.isNullOrUndefined=function(e){return null==e},t.isNumber=d,t.isString=m,t.isSymbol=function(e){return"symbol"===typeof e},t.isUndefined=b,t.isRegExp=v,t.isObject=O,t.isDate=w,t.isError=E,t.isFunction=j,t.isPrimitive=function(e){return null===e||"boolean"===typeof e||"number"===typeof e||"string"===typeof e||"symbol"===typeof e||"undefined"===typeof e},t.isBuffer=r(4);var T=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function P(){var e=new Date,t=[x(e.getHours()),x(e.getMinutes()),x(e.getSeconds())].join(":");return[e.getDate(),T[e.getMonth()],t].join(" ")}function A(e,t){return Object.prototype.hasOwnProperty.call(e,t)}t.log=function(){console.log("%s - %s",P(),t.format.apply(t,arguments))},t.inherits=r(5),t._extend=function(e,t){if(!t||!O(t))return e;for(var r=Object.keys(t),n=r.length;n--;)e[r[n]]=t[r[n]];return e};var D="undefined"!==typeof Symbol?Symbol("util.promisify.custom"):void 0;function k(e,t){if(!e){var r=new Error("Promise was rejected with a falsy value");r.reason=e,e=r}return t(e)}t.promisify=function(e){if("function"!==typeof e)throw new TypeError('The "original" argument must be of type Function');if(D&&e[D]){var t;if("function"!==typeof(t=e[D]))throw new TypeError('The "util.promisify.custom" argument must be of type Function');return Object.defineProperty(t,D,{value:t,enumerable:!1,writable:!1,configurable:!0}),t}function t(){for(var t,r,n=new Promise((function(e,n){t=e,r=n})),o=[],i=0;i<arguments.length;i++)o.push(arguments[i]);o.push((function(e,n){e?r(e):t(n)}));try{e.apply(this,o)}catch(u){r(u)}return n}return Object.setPrototypeOf(t,Object.getPrototypeOf(e)),D&&Object.defineProperty(t,D,{value:t,enumerable:!1,writable:!1,configurable:!0}),Object.defineProperties(t,n(e))},t.promisify.custom=D,t.callbackify=function(t){if("function"!==typeof t)throw new TypeError('The "original" argument must be of type Function');function r(){for(var r=[],n=0;n<arguments.length;n++)r.push(arguments[n]);var o=r.pop();if("function"!==typeof o)throw new TypeError("The last argument must be of type Function");var i=this,u=function(){return o.apply(i,arguments)};t.apply(this,r).then((function(t){e.nextTick(u,null,t)}),(function(t){e.nextTick(k,t,u)}))}return Object.setPrototypeOf(r,Object.getPrototypeOf(t)),Object.defineProperties(r,n(t)),r}}).call(this,r(3))},function(e,t){var r,n,o=e.exports={};function i(){throw new Error("setTimeout has not been defined")}function u(){throw new Error("clearTimeout has not been defined")}function c(e){if(r===setTimeout)return setTimeout(e,0);if((r===i||!r)&&setTimeout)return r=setTimeout,setTimeout(e,0);try{return r(e,0)}catch(t){try{return r.call(null,e,0)}catch(t){return r.call(this,e,0)}}}!function(){try{r="function"===typeof setTimeout?setTimeout:i}catch(e){r=i}try{n="function"===typeof clearTimeout?clearTimeout:u}catch(e){n=u}}();var a,f=[],s=!1,l=-1;function p(){s&&a&&(s=!1,a.length?f=a.concat(f):l=-1,f.length&&y())}function y(){if(!s){var e=c(p);s=!0;for(var t=f.length;t;){for(a=f,f=[];++l<t;)a&&a[l].run();l=-1,t=f.length}a=null,s=!1,function(e){if(n===clearTimeout)return clearTimeout(e);if((n===u||!n)&&clearTimeout)return n=clearTimeout,clearTimeout(e);try{n(e)}catch(t){try{return n.call(null,e)}catch(t){return n.call(this,e)}}}(e)}}function g(e,t){this.fun=e,this.array=t}function h(){}o.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)t[r-1]=arguments[r];f.push(new g(e,t)),1!==f.length||s||c(y)},g.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=h,o.addListener=h,o.once=h,o.off=h,o.removeListener=h,o.removeAllListeners=h,o.emit=h,o.prependListener=h,o.prependOnceListener=h,o.listeners=function(e){return[]},o.binding=function(e){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(e){throw new Error("process.chdir is not supported")},o.umask=function(){return 0}},function(e,t){e.exports=function(e){return e&&"object"===typeof e&&"function"===typeof e.copy&&"function"===typeof e.fill&&"function"===typeof e.readUInt8}},function(e,t){"function"===typeof Object.create?e.exports=function(e,t){e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}})}:e.exports=function(e,t){e.super_=t;var r=function(){};r.prototype=t.prototype,e.prototype=new r,e.prototype.constructor=e}},function(e,t,r){"use strict";function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function o(e){return function(e){if(Array.isArray(e))return n(e)}(e)||function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(e){if("string"===typeof e)return n(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(r):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(e,t):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}r.r(t),r.d(t,"generateSchedules",(function(){return u}));var i=r(0);function u(e,t,r){var n=0,u=[],c=function(e){return e+"-"+(e+1)},a=function(e){return t[e-1]},f=function(e,t){return e.some((function(e){return e.some((function(e){return e&&e.name===t.name}))}))},s=function t(s,p){if(p>8){if(!e.every((function(e){return f(s,e)})))return;s.shift(),console.log("Adding schedule",s),u.push(s);var y=Date.now();y-n>=100&&(n=y,postMessage(u.length))}else{if(a(p)){var g=o(s);return g[p]=[],void t(g,p+1)}var h=o(s);h[p]=[],t(h,p+1),l(s,p,null),e.forEach((function(e){f(s,e)||(e.year?(i(Object.keys(e.year).length>0),e.year[p]?(i(e.year[p].length>0),e.year[p].forEach((function(e){if(r[e.name][e.teacher]){var n=o(s);n[p]=[e],t(n,p+1)}}))):e.year[c(p)]&&!a(p+1)&&(i(e.year[c(p)].length>0),e.year[c(p)].forEach((function(e){if(r[e.name][e.teacher]){var n=o(s);n[p]=[e],n[p+1]=[e],t(n,p+2)}})))):e.s1&&e.s1[p]&&(i(e.s1[p].length>0),e.s1[p].forEach((function(e){r[e.name][e.teacher]&&l(s,p,e)}))))}))}},l=function(t,n,u){if(null!=u){var c=o(t);c[n]=[u,null],s(c,n+1)}e.forEach((function(e){f(t,e)||!e.s2||!e.s2[n]||null!==u&&u.name==e.name||(i(e.s2[n].length>0),e.s2[n].forEach((function(e){if(r[e.name][e.teacher]){var i=o(t);i[n]=[u,e],s(i,n+1)}})))}))};return s([[]],1),u}addEventListener("message",(function(e){var r,n=e.data,o=n.type,i=n.method,u=n.id,c=n.params;"RPC"===o&&i&&((r=t[i])?Promise.resolve().then((function(){return r.apply(t,c)})):Promise.reject("No such method")).then((function(e){postMessage({type:"RPC",id:u,result:e})})).catch((function(e){var t={message:e};e.stack&&(t.message=e.message,t.stack=e.stack,t.name=e.name),postMessage({type:"RPC",id:u,error:t})}))})),postMessage({type:"RPC",method:"ready"})}]);
//# sourceMappingURL=4d2e2b7e4c790d6ea53a.worker.js.map