webpackJsonp([5],{159:function(t,e,n){"use strict";function i(t,e){/*!
String.prototype.endsWith
*/
String.prototype.endsWith||Object.defineProperty(String.prototype,"endsWith",{writable:!0,configurable:!0,value:function(t,e){return(void 0===e||e>this.length)&&(e=this.length),this.substring(e-t.length,e)===t}}),/*!
String.prototype.includes
*/
String.prototype.includes||(String.prototype.includes=function(t,e){return"number"!=typeof e&&(e=0),!(e+t.length>this.length)&&-1!==this.indexOf(t,e)}),/*!
String.prototype.startsWith
*/
String.prototype.startsWith||Object.defineProperty(String.prototype,"startsWith",{writable:!0,configurable:!0,value:function(t,e){return this.substr(!e||0>e?0:+e,t.length)===t}})}Object.defineProperty(e,"__esModule",{value:!0}),e.applyPolyfill=i}});
//# sourceMappingURL=5.bundle.js.map