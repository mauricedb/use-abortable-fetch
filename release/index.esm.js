import{useState as r,useRef as n,useLayoutEffect as t,useEffect as e}from"react";import o from"media-typer";import u from"content-type";function i(){return(i=Object.assign||function(r){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&(r[e]=t[e])}return r}).apply(this,arguments)}export default function(a,l){var f=r({data:null,loading:0,error:null,controller:null}),c=f[0],s=f[1],d=n(!1);return t(function(){return d.current=!0,function(){d.current=!1}},[]),e(function(){var r=new AbortController;return a&&function(r,n,t,e){void 0===n&&(n={});try{var a=i({},n,{signal:t.signal}),l=null;Promise.resolve(function(n,f){try{var c=(e(function(r){return{data:null,loading:r.loading+1,error:null,controller:t}}),Promise.resolve(fetch(r,a)).then(function(r){function n(){if(!l.ok){var r=new Error(l.statusText);throw r.status=l.status,r}}var t=(l=r).headers.get("content-type"),a=function(){if(t){var r=function(){e(function(r){return i({},r,{data:n,loading:r.loading-1})})},n=null,a=function(r){if(r){var n=u.parse(r),t=o.parse(n.type);if("json"===t.subtype)return!0;if("json"===t.suffix)return!0;if(t.suffix&&/\bjson\b/i.test(t.suffix))return!0;if(t.subtype&&/\bjson\b/i.test(t.subtype))return!0}return!1}(t)?Promise.resolve(l.json()).then(function(r){n=r}):Promise.resolve(l.text()).then(function(r){n=r});return a&&a.then?a.then(r):r()}e(function(r){return i({},r,{loading:r.loading-1})})}();return a&&a.then?a.then(n):n()}))}catch(r){return f(r)}return c&&c.then?c.then(void 0,f):c}(0,function(r){var n="AbortError"!==r.name?r:null;e(function(r){return i({},r,{error:n,loading:l?r.loading:r.loading-1})})}))}catch(r){return Promise.reject(r)}}(a,l,r,function(r){d.current&&s(r)}),function(){return r.abort()}},[l,a]),{data:c.data,loading:!!c.loading,error:c.error,abort:function(){return c.controller&&c.controller.abort()}}}
//# sourceMappingURL=index.esm.js.map