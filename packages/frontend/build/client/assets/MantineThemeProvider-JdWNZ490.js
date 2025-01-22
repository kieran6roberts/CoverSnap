import{A as L,B as F,C as P,D as j,a as u,p as D,n as W}from"./chunk-SYFQ2XB5-B-0lyqle.js";function nr(r){return function(){const a={params:L(),loaderData:F(),actionData:P(),matches:j()};return u.createElement(r,a)}}function ar(r){return function(){const a={params:L(),loaderData:F(),actionData:P(),error:D()};return u.createElement(r,a)}}function tr(r){return Object.keys(r)}function y(r){return r&&typeof r=="object"&&!Array.isArray(r)}function N(r,e){const a={...r},o=e;return y(r)&&y(e)&&Object.keys(e).forEach(s=>{y(o[s])&&s in r?a[s]=N(a[s],o[s]):a[s]=o[s]}),a}function C(r){return r==="0rem"?"0rem":`calc(${r} * var(--mantine-scale))`}function A(r,{shouldScale:e=!1}={}){function a(o){if(o===0||o==="0")return`0${r}`;if(typeof o=="number"){const s=`${o/16}${r}`;return e?C(s):s}if(typeof o=="string"){if(o===""||o.startsWith("calc(")||o.startsWith("clamp(")||o.includes("rgba("))return o;if(o.includes(","))return o.split(",").map(t=>a(t)).join(",");if(o.includes(" "))return o.split(" ").map(t=>a(t)).join(" ");if(o.includes(r))return e?C(o):o;const s=o.replace("px","");if(!Number.isNaN(Number(s))){const t=`${Number(s)/16}${r}`;return e?C(t):t}}return o}return a}const n=A("rem",{shouldScale:!0}),or=A("em"),z=u.createContext(null);function p(){const r=u.useContext(z);if(!r)throw new Error("[@mantine/core] MantineProvider was not found in tree");return r}function sr(){return p().cssVariablesResolver}function ir(){return p().classNamesPrefix}function fr(){return p().getStyleNonce}function cr(){return p().withStaticClasses}function lr(){return p().headless}function dr(){var r;return(r=p().stylesTransform)==null?void 0:r.sx}function ur(){var r;return(r=p().stylesTransform)==null?void 0:r.styles}function G(r){return/^#?([0-9A-F]{3}){1,2}([0-9A-F]{2})?$/i.test(r)}function O(r){let e=r.replace("#","");if(e.length===3){const f=e.split("");e=[f[0],f[0],f[1],f[1],f[2],f[2]].join("")}if(e.length===8){const f=parseInt(e.slice(6,8),16)/255;return{r:parseInt(e.slice(0,2),16),g:parseInt(e.slice(2,4),16),b:parseInt(e.slice(4,6),16),a:f}}const a=parseInt(e,16),o=a>>16&255,s=a>>8&255,t=a&255;return{r:o,g:s,b:t,a:1}}function V(r){const[e,a,o,s]=r.replace(/[^0-9,./]/g,"").split(/[/,]/).map(Number);return{r:e,g:a,b:o,a:s||1}}function U(r){const e=/^hsla?\(\s*(\d+)\s*,\s*(\d+%)\s*,\s*(\d+%)\s*(,\s*(0?\.\d+|\d+(\.\d+)?))?\s*\)$/i,a=r.match(e);if(!a)return{r:0,g:0,b:0,a:1};const o=parseInt(a[1],10),s=parseInt(a[2],10)/100,t=parseInt(a[3],10)/100,f=a[5]?parseFloat(a[5]):void 0,i=(1-Math.abs(2*t-1))*s,c=o/60,d=i*(1-Math.abs(c%2-1)),v=t-i/2;let b,h,m;return c>=0&&c<1?(b=i,h=d,m=0):c>=1&&c<2?(b=d,h=i,m=0):c>=2&&c<3?(b=0,h=i,m=d):c>=3&&c<4?(b=0,h=d,m=i):c>=4&&c<5?(b=d,h=0,m=i):(b=i,h=0,m=d),{r:Math.round((b+v)*255),g:Math.round((h+v)*255),b:Math.round((m+v)*255),a:f||1}}function M(r){return G(r)?O(r):r.startsWith("rgb")?V(r):r.startsWith("hsl")?U(r):{r:0,g:0,b:0,a:1}}function $(r,e){if(r.startsWith("var("))return`color-mix(in srgb, ${r}, black ${e*100}%)`;const{r:a,g:o,b:s,a:t}=M(r),f=1-e,i=c=>Math.round(c*f);return`rgba(${i(a)}, ${i(o)}, ${i(s)}, ${t})`}function B(r,e){return typeof r.primaryShade=="number"?r.primaryShade:e==="dark"?r.primaryShade.dark:r.primaryShade.light}function k(r){return r<=.03928?r/12.92:((r+.055)/1.055)**2.4}function X(r){const e=r.match(/oklch\((.*?)%\s/);return e?parseFloat(e[1]):null}function Y(r){if(r.startsWith("oklch("))return(X(r)||0)/100;const{r:e,g:a,b:o}=M(r),s=e/255,t=a/255,f=o/255,i=k(s),c=k(t),d=k(f);return .2126*i+.7152*c+.0722*d}function g(r,e=.179){return r.startsWith("var(")?!1:Y(r)>e}function H({color:r,theme:e,colorScheme:a}){if(typeof r!="string")throw new Error(`[@mantine/core] Failed to parse color. Expected color to be a string, instead got ${typeof r}`);if(r==="bright")return{color:r,value:a==="dark"?e.white:e.black,shade:void 0,isThemeColor:!1,isLight:g(a==="dark"?e.white:e.black,e.luminanceThreshold),variable:"--mantine-color-bright"};if(r==="dimmed")return{color:r,value:a==="dark"?e.colors.dark[2]:e.colors.gray[7],shade:void 0,isThemeColor:!1,isLight:g(a==="dark"?e.colors.dark[2]:e.colors.gray[6],e.luminanceThreshold),variable:"--mantine-color-dimmed"};if(r==="white"||r==="black")return{color:r,value:r==="white"?e.white:e.black,shade:void 0,isThemeColor:!1,isLight:g(r==="white"?e.white:e.black,e.luminanceThreshold),variable:`--mantine-color-${r}`};const[o,s]=r.split("."),t=s?Number(s):void 0,f=o in e.colors;if(f){const i=t!==void 0?e.colors[o][t]:e.colors[o][B(e,a||"light")];return{color:o,value:i,shade:t,isThemeColor:f,isLight:g(i,e.luminanceThreshold),variable:s?`--mantine-color-${o}-${t}`:`--mantine-color-${o}-filled`}}return{color:r,value:r,isThemeColor:f,isLight:g(r,e.luminanceThreshold),shade:t,variable:void 0}}function T(r,e){const a=H({color:r||e.primaryColor,theme:e});return a.variable?`var(${a.variable})`:r}function S(r,e){const a={from:(r==null?void 0:r.from)||e.defaultGradient.from,to:(r==null?void 0:r.to)||e.defaultGradient.to,deg:(r==null?void 0:r.deg)||e.defaultGradient.deg||0},o=T(a.from,e),s=T(a.to,e);return`linear-gradient(${a.deg}deg, ${o} 0%, ${s} 100%)`}function l(r,e){if(typeof r!="string"||e>1||e<0)return"rgba(0, 0, 0, 1)";if(r.startsWith("var(")){const t=(1-e)*100;return`color-mix(in srgb, ${r}, transparent ${t}%)`}if(r.startsWith("oklch"))return r.includes("/")?r.replace(/\/\s*[\d.]+\s*\)/,`/ ${e})`):r.replace(")",` / ${e})`);const{r:a,g:o,b:s}=M(r);return`rgba(${a}, ${o}, ${s}, ${e})`}const br=l,q=({color:r,theme:e,variant:a,gradient:o,autoContrast:s})=>{const t=H({color:r,theme:e}),f=typeof s=="boolean"?s:e.autoContrast;if(a==="filled"){const i=f&&t.isLight?"var(--mantine-color-black)":"var(--mantine-color-white)";return t.isThemeColor?t.shade===void 0?{background:`var(--mantine-color-${r}-filled)`,hover:`var(--mantine-color-${r}-filled-hover)`,color:i,border:`${n(1)} solid transparent`}:{background:`var(--mantine-color-${t.color}-${t.shade})`,hover:`var(--mantine-color-${t.color}-${t.shade===9?8:t.shade+1})`,color:i,border:`${n(1)} solid transparent`}:{background:r,hover:$(r,.1),color:i,border:`${n(1)} solid transparent`}}if(a==="light"){if(t.isThemeColor){if(t.shade===void 0)return{background:`var(--mantine-color-${r}-light)`,hover:`var(--mantine-color-${r}-light-hover)`,color:`var(--mantine-color-${r}-light-color)`,border:`${n(1)} solid transparent`};const i=e.colors[t.color][t.shade];return{background:l(i,.1),hover:l(i,.12),color:`var(--mantine-color-${t.color}-${Math.min(t.shade,6)})`,border:`${n(1)} solid transparent`}}return{background:l(r,.1),hover:l(r,.12),color:r,border:`${n(1)} solid transparent`}}if(a==="outline")return t.isThemeColor?t.shade===void 0?{background:"transparent",hover:`var(--mantine-color-${r}-outline-hover)`,color:`var(--mantine-color-${r}-outline)`,border:`${n(1)} solid var(--mantine-color-${r}-outline)`}:{background:"transparent",hover:l(e.colors[t.color][t.shade],.05),color:`var(--mantine-color-${t.color}-${t.shade})`,border:`${n(1)} solid var(--mantine-color-${t.color}-${t.shade})`}:{background:"transparent",hover:l(r,.05),color:r,border:`${n(1)} solid ${r}`};if(a==="subtle"){if(t.isThemeColor){if(t.shade===void 0)return{background:"transparent",hover:`var(--mantine-color-${r}-light-hover)`,color:`var(--mantine-color-${r}-light-color)`,border:`${n(1)} solid transparent`};const i=e.colors[t.color][t.shade];return{background:"transparent",hover:l(i,.12),color:`var(--mantine-color-${t.color}-${Math.min(t.shade,6)})`,border:`${n(1)} solid transparent`}}return{background:"transparent",hover:l(r,.12),color:r,border:`${n(1)} solid transparent`}}return a==="transparent"?t.isThemeColor?t.shade===void 0?{background:"transparent",hover:"transparent",color:`var(--mantine-color-${r}-light-color)`,border:`${n(1)} solid transparent`}:{background:"transparent",hover:"transparent",color:`var(--mantine-color-${t.color}-${Math.min(t.shade,6)})`,border:`${n(1)} solid transparent`}:{background:"transparent",hover:"transparent",color:r,border:`${n(1)} solid transparent`}:a==="white"?t.isThemeColor?t.shade===void 0?{background:"var(--mantine-color-white)",hover:$(e.white,.01),color:`var(--mantine-color-${r}-filled)`,border:`${n(1)} solid transparent`}:{background:"var(--mantine-color-white)",hover:$(e.white,.01),color:`var(--mantine-color-${t.color}-${t.shade})`,border:`${n(1)} solid transparent`}:{background:"var(--mantine-color-white)",hover:$(e.white,.01),color:r,border:`${n(1)} solid transparent`}:a==="gradient"?{background:S(o,e),hover:S(o,e),color:"var(--mantine-color-white)",border:"none"}:a==="default"?{background:"var(--mantine-color-default)",hover:"var(--mantine-color-default-hover)",color:"var(--mantine-color-default-color)",border:`${n(1)} solid var(--mantine-color-default-border)`}:{}},J={dark:["#C9C9C9","#b8b8b8","#828282","#696969","#424242","#3b3b3b","#2e2e2e","#242424","#1f1f1f","#141414"],gray:["#f8f9fa","#f1f3f5","#e9ecef","#dee2e6","#ced4da","#adb5bd","#868e96","#495057","#343a40","#212529"],red:["#fff5f5","#ffe3e3","#ffc9c9","#ffa8a8","#ff8787","#ff6b6b","#fa5252","#f03e3e","#e03131","#c92a2a"],pink:["#fff0f6","#ffdeeb","#fcc2d7","#faa2c1","#f783ac","#f06595","#e64980","#d6336c","#c2255c","#a61e4d"],grape:["#f8f0fc","#f3d9fa","#eebefa","#e599f7","#da77f2","#cc5de8","#be4bdb","#ae3ec9","#9c36b5","#862e9c"],violet:["#f3f0ff","#e5dbff","#d0bfff","#b197fc","#9775fa","#845ef7","#7950f2","#7048e8","#6741d9","#5f3dc4"],indigo:["#edf2ff","#dbe4ff","#bac8ff","#91a7ff","#748ffc","#5c7cfa","#4c6ef5","#4263eb","#3b5bdb","#364fc7"],blue:["#e7f5ff","#d0ebff","#a5d8ff","#74c0fc","#4dabf7","#339af0","#228be6","#1c7ed6","#1971c2","#1864ab"],cyan:["#e3fafc","#c5f6fa","#99e9f2","#66d9e8","#3bc9db","#22b8cf","#15aabf","#1098ad","#0c8599","#0b7285"],teal:["#e6fcf5","#c3fae8","#96f2d7","#63e6be","#38d9a9","#20c997","#12b886","#0ca678","#099268","#087f5b"],green:["#ebfbee","#d3f9d8","#b2f2bb","#8ce99a","#69db7c","#51cf66","#40c057","#37b24d","#2f9e44","#2b8a3e"],lime:["#f4fce3","#e9fac8","#d8f5a2","#c0eb75","#a9e34b","#94d82d","#82c91e","#74b816","#66a80f","#5c940d"],yellow:["#fff9db","#fff3bf","#ffec99","#ffe066","#ffd43b","#fcc419","#fab005","#f59f00","#f08c00","#e67700"],orange:["#fff4e6","#ffe8cc","#ffd8a8","#ffc078","#ffa94d","#ff922b","#fd7e14","#f76707","#e8590c","#d9480f"]},R="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji",_={scale:1,fontSmoothing:!0,focusRing:"auto",white:"#fff",black:"#000",colors:J,primaryShade:{light:6,dark:8},primaryColor:"blue",variantColorResolver:q,autoContrast:!1,luminanceThreshold:.3,fontFamily:R,fontFamilyMonospace:"ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace",respectReducedMotion:!1,cursorType:"default",defaultGradient:{from:"blue",to:"cyan",deg:45},defaultRadius:"sm",activeClassName:"mantine-active",focusClassName:"",headings:{fontFamily:R,fontWeight:"700",textWrap:"wrap",sizes:{h1:{fontSize:n(34),lineHeight:"1.3"},h2:{fontSize:n(26),lineHeight:"1.35"},h3:{fontSize:n(22),lineHeight:"1.4"},h4:{fontSize:n(18),lineHeight:"1.45"},h5:{fontSize:n(16),lineHeight:"1.5"},h6:{fontSize:n(14),lineHeight:"1.5"}}},fontSizes:{xs:n(12),sm:n(14),md:n(16),lg:n(18),xl:n(20)},lineHeights:{xs:"1.4",sm:"1.45",md:"1.55",lg:"1.6",xl:"1.65"},radius:{xs:n(2),sm:n(4),md:n(8),lg:n(16),xl:n(32)},spacing:{xs:n(10),sm:n(12),md:n(16),lg:n(20),xl:n(32)},breakpoints:{xs:"36em",sm:"48em",md:"62em",lg:"75em",xl:"88em"},shadows:{xs:`0 ${n(1)} ${n(3)} rgba(0, 0, 0, 0.05), 0 ${n(1)} ${n(2)} rgba(0, 0, 0, 0.1)`,sm:`0 ${n(1)} ${n(3)} rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 ${n(10)} ${n(15)} ${n(-5)}, rgba(0, 0, 0, 0.04) 0 ${n(7)} ${n(7)} ${n(-5)}`,md:`0 ${n(1)} ${n(3)} rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 ${n(20)} ${n(25)} ${n(-5)}, rgba(0, 0, 0, 0.04) 0 ${n(10)} ${n(10)} ${n(-5)}`,lg:`0 ${n(1)} ${n(3)} rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 ${n(28)} ${n(23)} ${n(-7)}, rgba(0, 0, 0, 0.04) 0 ${n(12)} ${n(12)} ${n(-7)}`,xl:`0 ${n(1)} ${n(3)} rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 ${n(36)} ${n(28)} ${n(-7)}, rgba(0, 0, 0, 0.04) 0 ${n(17)} ${n(17)} ${n(-7)}`},other:{},components:{}},K="[@mantine/core] MantineProvider: Invalid theme.primaryColor, it accepts only key of theme.colors, learn more – https://mantine.dev/theming/colors/#primary-color",E="[@mantine/core] MantineProvider: Invalid theme.primaryShade, it accepts only 0-9 integers or an object { light: 0-9, dark: 0-9 }";function x(r){return r<0||r>9?!1:parseInt(r.toString(),10)===r}function I(r){if(!(r.primaryColor in r.colors))throw new Error(K);if(typeof r.primaryShade=="object"&&(!x(r.primaryShade.dark)||!x(r.primaryShade.light)))throw new Error(E);if(typeof r.primaryShade=="number"&&!x(r.primaryShade))throw new Error(E)}function Q(r,e){var o;if(!e)return I(r),r;const a=N(r,e);return e.fontFamily&&!((o=e.headings)!=null&&o.fontFamily)&&(a.headings.fontFamily=e.fontFamily),I(a),a}const w=u.createContext(null),Z=()=>u.useContext(w)||_;function hr(){const r=u.useContext(w);if(!r)throw new Error("@mantine/core: MantineProvider was not found in component tree, make sure you have it in your app");return r}function rr({theme:r,children:e,inherit:a=!0}){const o=Z(),s=u.useMemo(()=>Q(a?o:_,r),[r,o,a]);return W.jsx(w.Provider,{value:s,children:e})}rr.displayName="@mantine/core/MantineThemeProvider";export{_ as D,z as M,fr as a,br as b,sr as c,N as d,or as e,rr as f,B as g,ar as h,l as i,T as j,tr as k,ur as l,ir as m,cr as n,lr as o,H as p,dr as q,n as r,S as s,hr as u,nr as w};
