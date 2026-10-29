var Se=Object.defineProperty;var $=(o,e)=>()=>(o&&(e=o(o=0)),e);var Pe=(o,e)=>{for(var t in e)Se(o,t,{get:e[t],enumerable:!0})};var nt,rt,_t,Wt,j,qt,m,Ft,kt,$t=$(()=>{nt=globalThis,rt=nt.ShadowRoot&&(nt.ShadyCSS===void 0||nt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,_t=Symbol(),Wt=new WeakMap,j=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==_t)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(rt&&e===void 0){let i=t!==void 0&&t.length===1;i&&(e=Wt.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&Wt.set(t,e))}return e}toString(){return this.cssText}},qt=o=>new j(typeof o=="string"?o:o+"",void 0,_t),m=(o,...e)=>{let t=o.length===1?o[0]:e.reduce((i,s,n)=>i+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+o[n+1],o[0]);return new j(t,o,_t)},Ft=(o,e)=>{if(rt)o.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let i=document.createElement("style"),s=nt.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=t.cssText,o.appendChild(i)}},kt=rt?o=>o:o=>o instanceof CSSStyleSheet?(e=>{let t="";for(let i of e.cssRules)t+=i.cssText;return qt(t)})(o):o});var Te,Be,Me,Re,Ne,Ie,at,Kt,He,Ue,z,xt,Vt,Gt,C,ct=$(()=>{$t();$t();({is:Te,defineProperty:Be,getOwnPropertyDescriptor:Me,getOwnPropertyNames:Re,getOwnPropertySymbols:Ne,getPrototypeOf:Ie}=Object),at=globalThis,Kt=at.trustedTypes,He=Kt?Kt.emptyScript:"",Ue=at.reactiveElementPolyfillSupport,z=(o,e)=>o,xt={toAttribute(o,e){switch(e){case Boolean:o=o?He:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,e){let t=o;switch(e){case Boolean:t=o!==null;break;case Number:t=o===null?null:Number(o);break;case Object:case Array:try{t=JSON.parse(o)}catch{t=null}}return t}},Vt=(o,e)=>!Te(o,e),Gt={attribute:!0,type:String,converter:xt,reflect:!1,useDefault:!1,hasChanged:Vt};Symbol.metadata??=Symbol("metadata"),at.litPropertyMetadata??=new WeakMap;C=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Gt){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let i=Symbol(),s=this.getPropertyDescriptor(e,i,t);s!==void 0&&Be(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){let{get:s,set:n}=Me(this.prototype,e)??{get(){return this[t]},set(r){this[t]=r}};return{get:s,set(r){let c=s?.call(this);n?.call(this,r),this.requestUpdate(e,c,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Gt}static _$Ei(){if(this.hasOwnProperty(z("elementProperties")))return;let e=Ie(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(z("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(z("properties"))){let t=this.properties,i=[...Re(t),...Ne(t)];for(let s of i)this.createProperty(s,t[s])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[i,s]of t)this.elementProperties.set(i,s)}this._$Eh=new Map;for(let[t,i]of this.elementProperties){let s=this._$Eu(t,i);s!==void 0&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let i=new Set(e.flat(1/0).reverse());for(let s of i)t.unshift(kt(s))}else e!==void 0&&t.push(kt(e));return t}static _$Eu(e,t){let i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ft(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){let i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(s!==void 0&&i.reflect===!0){let n=(i.converter?.toAttribute!==void 0?i.converter:xt).toAttribute(t,i.type);this._$Em=e,n==null?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(e,t){let i=this.constructor,s=i._$Eh.get(e);if(s!==void 0&&this._$Em!==s){let n=i.getPropertyOptions(s),r=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:xt;this._$Em=s;let c=r.fromAttribute(t,n.type);this[s]=c??this._$Ej?.get(s)??c,this._$Em=null}}requestUpdate(e,t,i,s=!1,n){if(e!==void 0){let r=this.constructor;if(s===!1&&(n=this[e]),i??=r.getPropertyOptions(e),!((i.hasChanged??Vt)(n,t)||i.useDefault&&i.reflect&&n===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:s,wrapped:n},r){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,r??t??this[e]),n!==!0||r!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),s===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,n]of this._$Ep)this[s]=n;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[s,n]of i){let{wrapped:r}=n,c=this[s];r!==!0||this._$AL.has(s)||c===void 0||this.C(s,void 0,n,c)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};C.elementStyles=[],C.shadowRootOptions={mode:"open"},C[z("elementProperties")]=new Map,C[z("finalized")]=new Map,Ue?.({ReactiveElement:C}),(at.reactiveElementVersions??=[]).push("2.1.2")});function ne(o,e){if(!Bt(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return Jt!==void 0?Jt.createHTML(e):e}function N(o,e,t=o,i){if(e===E)return e;let s=i!==void 0?t._$Co?.[i]:t._$Cl,n=W(e)?void 0:e._$litDirective$;return s?.constructor!==n&&(s?._$AO?.(!1),n===void 0?s=void 0:(s=new n(o),s._$AT(o,t,i)),i!==void 0?(t._$Co??=[])[i]=s:t._$Cl=s),s!==void 0&&(e=N(o,s._$AS(o,e.values),s,i)),e}var Tt,Qt,lt,Jt,ie,S,se,Oe,R,L,W,Bt,je,wt,D,Zt,Xt,B,Yt,te,oe,Mt,l,Rt,Xe,E,d,ee,M,ze,q,Ct,F,I,Et,At,St,Pt,De,re,K=$(()=>{Tt=globalThis,Qt=o=>o,lt=Tt.trustedTypes,Jt=lt?lt.createPolicy("lit-html",{createHTML:o=>o}):void 0,ie="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,se="?"+S,Oe=`<${se}>`,R=document,L=()=>R.createComment(""),W=o=>o===null||typeof o!="object"&&typeof o!="function",Bt=Array.isArray,je=o=>Bt(o)||typeof o?.[Symbol.iterator]=="function",wt=`[ 	
\f\r]`,D=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Zt=/-->/g,Xt=/>/g,B=RegExp(`>|${wt}(?:([^\\s"'>=/]+)(${wt}*=${wt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Yt=/'/g,te=/"/g,oe=/^(?:script|style|textarea|title)$/i,Mt=o=>(e,...t)=>({_$litType$:o,strings:e,values:t}),l=Mt(1),Rt=Mt(2),Xe=Mt(3),E=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),ee=new WeakMap,M=R.createTreeWalker(R,129);ze=(o,e)=>{let t=o.length-1,i=[],s,n=e===2?"<svg>":e===3?"<math>":"",r=D;for(let c=0;c<t;c++){let a=o[c],h,u,p=-1,f=0;for(;f<a.length&&(r.lastIndex=f,u=r.exec(a),u!==null);)f=r.lastIndex,r===D?u[1]==="!--"?r=Zt:u[1]!==void 0?r=Xt:u[2]!==void 0?(oe.test(u[2])&&(s=RegExp("</"+u[2],"g")),r=B):u[3]!==void 0&&(r=B):r===B?u[0]===">"?(r=s??D,p=-1):u[1]===void 0?p=-2:(p=r.lastIndex-u[2].length,h=u[1],r=u[3]===void 0?B:u[3]==='"'?te:Yt):r===te||r===Yt?r=B:r===Zt||r===Xt?r=D:(r=B,s=void 0);let _=r===B&&o[c+1].startsWith("/>")?" ":"";n+=r===D?a+Oe:p>=0?(i.push(h),a.slice(0,p)+ie+a.slice(p)+S+_):a+S+(p===-2?c:_)}return[ne(o,n+(o[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]},q=class o{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let n=0,r=0,c=e.length-1,a=this.parts,[h,u]=ze(e,t);if(this.el=o.createElement(h,i),M.currentNode=this.el.content,t===2||t===3){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(s=M.nextNode())!==null&&a.length<c;){if(s.nodeType===1){if(s.hasAttributes())for(let p of s.getAttributeNames())if(p.endsWith(ie)){let f=u[r++],_=s.getAttribute(p).split(S),A=/([.?@])?(.*)/.exec(f);a.push({type:1,index:n,name:A[2],strings:_,ctor:A[1]==="."?Et:A[1]==="?"?At:A[1]==="@"?St:I}),s.removeAttribute(p)}else p.startsWith(S)&&(a.push({type:6,index:n}),s.removeAttribute(p));if(oe.test(s.tagName)){let p=s.textContent.split(S),f=p.length-1;if(f>0){s.textContent=lt?lt.emptyScript:"";for(let _=0;_<f;_++)s.append(p[_],L()),M.nextNode(),a.push({type:2,index:++n});s.append(p[f],L())}}}else if(s.nodeType===8)if(s.data===se)a.push({type:2,index:n});else{let p=-1;for(;(p=s.data.indexOf(S,p+1))!==-1;)a.push({type:7,index:n}),p+=S.length-1}n++}}static createElement(e,t){let i=R.createElement("template");return i.innerHTML=e,i}};Ct=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:i}=this._$AD,s=(e?.creationScope??R).importNode(t,!0);M.currentNode=s;let n=M.nextNode(),r=0,c=0,a=i[0];for(;a!==void 0;){if(r===a.index){let h;a.type===2?h=new F(n,n.nextSibling,this,e):a.type===1?h=new a.ctor(n,a.name,a.strings,this,e):a.type===6&&(h=new Pt(n,this,e)),this._$AV.push(h),a=i[++c]}r!==a?.index&&(n=M.nextNode(),r++)}return M.currentNode=R,s}p(e){let t=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}},F=class o{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,s){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=N(this,e,t),W(e)?e===d||e==null||e===""?(this._$AH!==d&&this._$AR(),this._$AH=d):e!==this._$AH&&e!==E&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):je(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==d&&W(this._$AH)?this._$AA.nextSibling.data=e:this.T(R.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:i}=e,s=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=q.createElement(ne(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(t);else{let n=new Ct(s,this),r=n.u(this.options);n.p(t),this.T(r),this._$AH=n}}_$AC(e){let t=ee.get(e.strings);return t===void 0&&ee.set(e.strings,t=new q(e)),t}k(e){Bt(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,i,s=0;for(let n of e)s===t.length?t.push(i=new o(this.O(L()),this.O(L()),this,this.options)):i=t[s],i._$AI(n),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let i=Qt(e).nextSibling;Qt(e).remove(),e=i}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},I=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,s,n){this.type=1,this._$AH=d,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=n,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=d}_$AI(e,t=this,i,s){let n=this.strings,r=!1;if(n===void 0)e=N(this,e,t,0),r=!W(e)||e!==this._$AH&&e!==E,r&&(this._$AH=e);else{let c=e,a,h;for(e=n[0],a=0;a<n.length-1;a++)h=N(this,c[i+a],t,a),h===E&&(h=this._$AH[a]),r||=!W(h)||h!==this._$AH[a],h===d?e=d:e!==d&&(e+=(h??"")+n[a+1]),this._$AH[a]=h}r&&!s&&this.j(e)}j(e){e===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Et=class extends I{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===d?void 0:e}},At=class extends I{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==d)}},St=class extends I{constructor(e,t,i,s,n){super(e,t,i,s,n),this.type=5}_$AI(e,t=this){if((e=N(this,e,t,0)??d)===E)return;let i=this._$AH,s=e===d&&i!==d||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,n=e!==d&&(i===d||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Pt=class{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){N(this,e)}},De=Tt.litHtmlPolyfillSupport;De?.(q,F),(Tt.litHtmlVersions??=[]).push("3.3.3");re=(o,e,t)=>{let i=t?.renderBefore??e,s=i._$litPart$;if(s===void 0){let n=t?.renderBefore??null;i._$litPart$=s=new F(e.insertBefore(L(),n),n,void 0,t??{})}return s._$AI(o),s}});var Nt,y,Le,ae=$(()=>{ct();ct();K();K();Nt=globalThis,y=class extends C{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=re(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return E}};y._$litElement$=!0,y.finalized=!0,Nt.litElementHydrateSupport?.({LitElement:y});Le=Nt.litElementPolyfillSupport;Le?.({LitElement:y});(Nt.litElementVersions??=[]).push("4.2.2")});var ce=$(()=>{});var k=$(()=>{ct();K();ae();ce()});var x,It,pe,ue,qe,P=$(()=>{"use strict";k();x=m`
  :host {
    display: block;
    min-width: 0;
    font-family: var(
      --paper-font-body1_-_font-family,
      Roboto,
      Arial,
      sans-serif
    );
  }
  [part="surface"] {
    display: flex;
    position: relative;
    box-sizing: border-box;
    min-width: 0;
    height: var(--kiosk-height, 69px);
    padding: 0 10px 0 0;
    border: var(--ha-card-border-width, 0px) solid
      var(--ha-card-border-color, transparent);
    border-radius: var(--kiosk-radius, var(--ha-card-border-radius, 12px));
    background: var(--kiosk-background, rgba(0, 0, 0, 0.3));
    background-image: none;
    box-shadow: var(
      --kiosk-shadow,
      0 2px 4px rgba(0, 0, 0, 0.1),
      0 6px 10px rgba(0, 0, 0, 0.08)
    );
    overflow: hidden;
    color: var(--kiosk-off-title, var(--primary-text-color, white));
  }
  [part="surface"].active {
    background: var(--kiosk-active-background, white);
    color: var(--kiosk-active-title, black);
  }
  button {
    font: inherit;
    color: inherit;
    appearance: none;
    border: 0;
    background: transparent;
    margin: 0;
    cursor: pointer;
    padding: 0;
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
  }
  button:focus-visible {
    outline: 2px solid var(--primary-color, #3bc8ce);
    outline-offset: -3px;
    border-radius: 10px;
  }
  button:disabled {
    cursor: default;
  }
  button:active:not(:disabled) {
    background: rgba(127, 127, 127, 0.12);
  }
  [part="icon-target"] {
    flex: 0 0 var(--kiosk-identity-width, 66px);
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 44px;
  }
  [part="icon-circle"] {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 45px;
    height: 45px;
    border-radius: 24px;
    background: var(--kiosk-off-circle, rgba(0, 0, 0, 0.2));
    color: var(--kiosk-glyph, white);
  }
  .active [part="icon-circle"] {
    background: var(
      --kiosk-icon-color,
      var(--kiosk-default-icon-color, #3bc8ce)
    );
  }
  ha-state-icon,
  ha-icon {
    display: block;
    --mdc-icon-size: 25px;
    width: 25px;
    height: 25px;
    color: inherit;
  }
  [part="body-target"] {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    text-align: left;
    min-width: 0;
    min-height: 44px;
  }
  [part="title"] {
    display: block;
    font-size: var(--kiosk-title-size, 17px);
    font-weight: 500;
    line-height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  [part="detail"] {
    display: block;
    color: var(--kiosk-off-detail, rgba(255, 255, 255, 0.5));
    font-size: 15px;
    line-height: 18px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .active [part="detail"] {
    color: var(--kiosk-active-detail, rgba(0, 0, 0, 0.5));
  }
  .unavailable [part="icon-circle"] {
    opacity: 0.5;
  }
  [part="feedback"] {
    position: absolute;
    right: 8px;
    bottom: 2px;
    font-size: 11px;
    line-height: 12px;
    color: inherit;
    pointer-events: none;
  }
  .action {
    --kiosk-height: 68px;
    --kiosk-title-size: 18px;
    --kiosk-identity-width: 64px;
  }
  .action [part="icon-circle"] {
    transform: translateX(2px);
  }
  .action [part="title"] {
    line-height: 21px;
  }
  .large {
    --kiosk-height: 146px;
    flex-direction: column;
  }
  .large [part="icon-target"] {
    flex: 0 0 69px;
    width: 100%;
    justify-content: flex-start;
    padding-left: 10.5px;
    box-sizing: border-box;
  }
  .large [part="body-target"] {
    justify-content: flex-end;
    padding: 0 0 12px 14px;
    box-sizing: border-box;
  }
  .large.action [part="icon-target"] {
    flex-basis: 68px;
    padding-left: 11.5px;
  }
  .large.action [part="icon-circle"] {
    transform: none;
  }
  .large.action [part="body-target"] {
    padding-bottom: 14px;
  }
`,It=m`
  :host {
    display: inline-block;
    max-width: 100%;
  }
  [part="surface"].pill {
    height: auto;
    min-width: var(--kiosk-pill-min-width, 140px);
    width: max-content;
    max-width: var(--kiosk-pill-max-width, 180px);
    padding: 4px 12px;
    column-gap: 8px;
    border-radius: var(--kiosk-radius, 18px);
    background: var(--kiosk-background, rgba(255, 255, 255, 0.9));
    color: rgba(0, 0, 0, 0.9);
  }
  .pill [part="icon-target"] {
    flex: 0 0 24px;
    min-height: 32px;
    margin: -4px 0;
  }
  .pill [part="icon-circle"] {
    width: 24px;
    height: 24px;
    border-radius: 0;
    background: transparent;
    color: var(--kiosk-icon-color, var(--accent-color, #3bc8ce));
    font-size: 16.8px;
    font-weight: 400;
    opacity: 1;
  }
  .pill ha-icon,
  .pill ha-state-icon {
    --mdc-icon-size: 24px;
    width: 24px;
    height: 24px;
  }
  .pill [part="body-target"] {
    align-items: flex-start;
    justify-content: flex-start;
    min-height: 0;
    margin: -4px 0;
    padding: 4px 0;
    flex: 1;
  }
  .pill.no-name:not(.no-state) [part="body-target"] {
    justify-content: flex-end;
  }
  .pill [part="title"] {
    font-size: 10px;
    font-weight: 400;
    line-height: 11px;
    color: rgba(0, 0, 0, 0.7);
    max-width: 100%;
  }
  .pill [part="detail"] {
    font-size: 14px;
    font-weight: 800;
    line-height: 16px;
    color: rgba(0, 0, 0, 0.9);
    max-width: 100%;
  }
  .pill .empty-icon {
    flex: 0 0 0px;
  }
`,pe=m`${x}
 [part="surface"] { padding:10px 12px 10px 10px; --kiosk-title-size:18px; }
 [part="icon-target"] { flex-basis:48px; }
 [part="icon-circle"] { background:transparent; width:48px; height:48px; border-radius:0; opacity:1; }
 .active [part="icon-circle"], .unavailable [part="icon-circle"] { background:transparent; opacity:1; }
 [part="temperature"] { font-size:20px; font-weight:600; line-height:normal; color:var(--kiosk-temperature-color,var(--accent-color)); }
 [part="title"] { line-height:21px; }
 .large [part="icon-target"] { flex-basis:58px; min-height:58px; padding:0; }
 .large [part="icon-circle"] { width:100%; height:58px; justify-content:flex-start; }
 .large [part="temperature"] { font-size:50px; }
 .large [part="body-target"] { padding:0 0 2px 0; }
`,ue=m`${x}
 :host { height:100%; }
 [part="surface"] { height:100%; padding:16px; border:none; }
 [part="body-target"] { display:flex; flex-direction:row; min-height:0; align-items:center; justify-content:center; text-align:center; width:100%; }
 [part="value"], [part="degree"], [part="pad"] { font-size:112px; font-weight:700; line-height:1; color:white; }
 [part="pad"] { visibility:hidden; }
 [part="status"] { width:100%; font-size:20px; font-weight:var(--ha-font-weight-normal,400); line-height:1.35; color:white; white-space:normal; }
 .active [part="status"] { color:black; }
`,qe=Object.freeze({height:69,actionHeight:68,largeHeight:146,pillHeight:35,pillRadius:18,pillIconSize:24,iconDiameter:45,glyphSize:25,titleSize:17,detailSize:15,categoryColor:"#3bc8ce"})});async function H(o=["ha-dialog","ha-button","ha-dialog-footer","ha-form"]){if(o.every(i=>customElements.get(i)))return;let e=await window.loadCardHelpers?.();if(!e||(await(await e.createCardElement({type:"entities",entities:[]})).constructor.getConfigElement?.(),!o.every(i=>customElements.get(i))))throw Error("Home Assistant controls are unavailable")}function fe(o,e){return new Promise(t=>{let i=!1,s=n=>{i||(i=!0,t(n))};o.dispatchEvent(new CustomEvent("show-dialog",{bubbles:!0,composed:!0,detail:{dialogTag:"kiosk-confirmation-dialog",dialogImport:()=>H().catch(n=>{throw s(!1),n}),dialogParams:{...e,confirm:()=>s(!0),cancel:()=>s(!1)}}}))})}var Ht,Ut=$(()=>{"use strict";k();Ht=class extends y{constructor(){super(...arguments);this.open=!1}static{this.properties={open:{state:!0},params:{state:!0}}}async showDialog(t){await H(),this.params=t,this.open=!0,await this.updateComplete}closeDialog(){return this.finish(!1),!0}finish(t){this.open&&(this.open=!1,(t?this.params.confirm:this.params.cancel)(),this.dispatchEvent(new CustomEvent("dialog-closed",{bubbles:!0,composed:!0,detail:{dialog:this.localName}})))}render(){return this.params?l`<ha-dialog
      .open=${this.open}
      header-title=${this.params.title||"Confirm action"}
      @closed=${()=>this.finish(!1)}
      ><p>${this.params.text||"Run this action?"}</p>
      <ha-dialog-footer slot="footer"
        ><ha-button
          slot="secondaryAction"
          appearance="plain"
          @click=${()=>this.finish(!1)}
          >${this.params.dismiss_text||"Cancel"}</ha-button
        ><ha-button slot="primaryAction" @click=${()=>this.finish(!0)}
          >${this.params.confirm_text||"Confirm"}</ha-button
        ></ha-dialog-footer
      ></ha-dialog
    >`:d}};customElements.get("kiosk-confirmation-dialog")||customElements.define("kiosk-confirmation-dialog",Ht)});function mt(o,e){if(!Array.isArray(o)||!o.length||o.length>e.length)throw Error("Choose at least one native command, at most one per configured blind");let t=new Set;for(let i of o){if(!Ot(i)||!ft.includes(i.service)||!e.includes(i.entity_id)||t.has(i.entity_id))throw Error("Only unique configured covers and supported native services are allowed");let s=i.service==="set_cover_position"?"position":i.service==="set_cover_tilt_position"?"tilt_position":void 0;if(!ut(i,["service","entity_id",...s?[s]:[]])||s&&(typeof i[s]!="number"||!Number.isFinite(i[s])||i[s]<0||i[s]>100))throw Error("Native values must be literal numbers 0\u2013100; extra fields are not allowed");t.add(i.entity_id)}return structuredClone(o)}function ve(o,e){let t=o?.config??o;if(!Ot(t)||!Array.isArray(t.sequence)||!t.sequence.length)throw Error("Script must have a simple cover-only sequence");let i=[];for(let s of t.sequence){if(!ut(s,["action","service","target","data"])||Object.hasOwn(s,"action")===Object.hasOwn(s,"service"))throw Error("Only simple literal cover actions are supported");let n=s.action??s.service;if(typeof n!="string"||!n.startsWith("cover.")||!ft.includes(n.slice(6)))throw Error("Only supported native cover actions are allowed");if(s.target!==void 0&&!ut(s.target,["entity_id"]))throw Error("Only literal entity targets are supported");if(s.data!==void 0&&!ut(s.data,["entity_id","position","tilt_position"]))throw Error("Unsupported action data");if(s.target?.entity_id!==void 0&&s.data?.entity_id!==void 0)throw Error("Use exactly one entity target");let r=s.target?.entity_id??s.data?.entity_id,c=Array.isArray(r)?r:[r];if(!c.length)throw Error("Missing target");let{entity_id:a,...h}=s.data??{};for(let u of c)i.push({service:n.slice(6),entity_id:u,...h})}return mt(i,e)}function J(o,e){let i=e.service==="set_cover_tilt_position"?"current_tilt_position":"current_position",s={open_cover:1,close_cover:2,set_cover_position:4,set_cover_tilt_position:128}[e.service],n=o?.attributes.supported_features,r=o?.attributes[i];return!!o&&["open","closed","opening","closing"].includes(o.state)&&typeof n=="number"&&Number.isInteger(n)&&(n&s)!==0&&typeof r=="number"&&Number.isFinite(r)&&r>=0&&r<=100}function jt(o,e){if(!J(o,e)||!["open","closed"].includes(o.state)||e.service==="close_cover"&&o.state!=="closed"||e.service==="set_cover_position"&&e.position===0&&!(typeof o.attributes.current_tilt_position=="number"&&Math.abs(o.attributes.current_tilt_position-100)<=2)||e.service==="set_cover_tilt_position"&&e.tilt_position===100&&!(typeof o.attributes.current_position=="number"&&Math.abs(o.attributes.current_position)<=2))return!1;let t=e.service==="open_cover"?100:e.service==="close_cover"?0:e.service==="set_cover_position"?e.position:e.tilt_position;return Math.abs(o.attributes[e.service==="set_cover_tilt_position"?"current_tilt_position":"current_position"]-t)<=2}var ft,Ot,ut,zt=$(()=>{"use strict";ft=["open_cover","close_cover","set_cover_position","set_cover_tilt_position"],Ot=o=>o&&typeof o=="object"&&!Array.isArray(o),ut=(o,e)=>Ot(o)&&Object.keys(o).every(t=>e.includes(t))});var $e={};Pe($e,{KioskBlindPresetsEditor:()=>gt});var U,ke,_e,gt,xe=$(()=>{"use strict";k();Ut();zt();Dt();U=(o,e,t,i=1)=>({name:o,selector:{number:{min:e,max:t,step:i,mode:"box"}}}),ke=o=>({name:o,selector:{text:{}}}),_e=[{name:"entity",required:!0,selector:{entity:{filter:{domain:"cover"}}}},ke("name"),U("width",.1,10,.1)],gt=class extends y{constructor(){super(...arguments);this.draftIndex=-1;this.newBlind={width:1};this.error="";this.sourceScript="";this.copying=!1;this.copyGeneration=0;this.label=t=>({rows:"Grid rows",columns:"Grid columns",entity:"Cover entity",name:"Accessible name",width:"Relative picture width",top:"Top (% down)",bottom:"Bottom (% down)"})[t.name]||t.name}static{this.properties={hass:{attribute:!1},config:{state:!0},draft:{state:!0},newBlind:{state:!0},error:{state:!0},removing:{state:!0},sourceScript:{state:!0},copying:{state:!0}}}invalidateCopy(){this.copyGeneration++,this.copying=!1}disconnectedCallback(){this.invalidateCopy(),super.disconnectedCallback()}connectedCallback(){super.connectedCallback(),H(["ha-form"]).catch(()=>{this.error="Home Assistant native form controls could not load. Reopen the editor."})}setConfig(t){this.invalidateCopy(),this.sourceScript="",this.config=structuredClone(t),this.draft=void 0,this.removing=void 0,this.error=""}emit(t){try{Z(t)}catch(i){return this.error=i.message,!1}return this.config=t,this.error="",this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:structuredClone(t)},bubbles:!0,composed:!0})),!0}updateGrid(t){t.stopPropagation();let i=t.detail.value;this.emit({...this.config,rows:i.rows,columns:i.columns})}updateBlind(t,i){i.stopPropagation();let s=structuredClone(this.config);s.blinds[t]={...s.blinds[t],...i.detail.value},this.emit(s)}moveBlind(t,i){let s=structuredClone(this.config),n=t+i;[s.blinds[t],s.blinds[n]]=[s.blinds[n],s.blinds[t]];for(let r of s.presets)[r.positions[t],r.positions[n]]=[r.positions[n],r.positions[t]];this.emit(s)}addBlind(){let t={...this.newBlind},i=structuredClone(this.config);i.blinds.push(t);for(let s of i.presets)s.positions.push({top:0,bottom:100});this.emit(i)&&(this.newBlind={width:1})}edit(t){this.invalidateCopy(),this.sourceScript="",this.error="",this.draftIndex=t,this.draft=structuredClone(this.config.presets[t])}addPreset(){this.invalidateCopy(),this.sourceScript="",this.draftIndex=this.config.presets.length,this.error="";let t=this.draftIndex+1;for(;this.config.presets.some(i=>i.id===`preset-${t}`);)t++;this.draft={id:`preset-${t}`,name:`Preset ${this.draftIndex+1}`,positions:this.config.blinds.map(()=>({top:0,bottom:100}))}}get draftProblem(){if(!this.draft)return"";try{let t=structuredClone(this.config);t.presets[this.draftIndex]=this.draft,Z(t)}catch(t){return t.message}return O(this.draft)}save(){if(!this.draft||this.draftProblem)return;let t=structuredClone(this.config);t.presets[this.draftIndex]=this.draft,this.emit(t)&&(this.draft=void 0)}async copyCommands(){if(!this.draft||!/^script\.[a-z0-9_]+$/.test(this.sourceScript)||!this.hass.callWS||this.copying)return;let t=this.draft,i=this.sourceScript,s=this.config,n=++this.copyGeneration;this.copying=!0,this.error="";try{let r=await this.hass.callWS({type:"script/config",entity_id:i});if(this.copyGeneration!==n||!this.isConnected||this.draft!==t||this.sourceScript!==i||this.config!==s)return;let c=ve(r,s.blinds.map(h=>h.entity)),a={...t,commands:c};delete a.actions,this.draft=a}catch(r){this.copyGeneration===n&&this.isConnected&&this.draft===t&&this.sourceScript===i&&this.config===s&&(this.error=r.message)}finally{this.copyGeneration===n&&(this.copying=!1)}}commandChange(t,i){if(i.stopPropagation(),!this.draft)return;let s=i.detail.value,n=structuredClone(this.draft.commands??this.draft.actions??[]),r=n.findIndex(a=>a.entity_id===t);if(!s.service||s.service==="untouched")r>=0&&n.splice(r,1);else{let a=s.service==="set_cover_position"?"position":s.service==="set_cover_tilt_position"?"tilt_position":void 0,h={service:s.service,entity_id:t,...a?{[a]:s.value}:{}};r>=0?n[r]=h:n.push(h)}let c={...this.draft};delete c.actions,n.length?c.commands=n:delete c.commands,this.draft=c}removeItem(){if(!this.removing)return;let t=structuredClone(this.config),{kind:i,index:s}=this.removing;if(i==="blind"){t.blinds.splice(s,1);for(let n of t.presets)n.positions.splice(s,1)}else t.presets.splice(s,1);this.emit(t)&&(this.removing=void 0,this.draft=void 0)}movePreset(t,i){let s=structuredClone(this.config),n=t+i;[s.presets[t],s.presets[n]]=[s.presets[n],s.presets[t]],this.emit(s)}static{this.styles=m`
    :host {
      display: block;
    }
    h3 {
      margin: 16px 0 8px;
      font-size: 16px;
    }
    p {
      font-size: 14px;
      color: var(--secondary-text-color);
    }
    button {
      font: inherit;
      cursor: pointer;
      min-height: 44px;
      padding: 8px 12px;
      border: 1px solid var(--divider-color, #888);
      border-radius: 8px;
      background: var(--ha-card-background, var(--card-background-color, #fff));
      color: var(--primary-text-color);
    }
    button:disabled {
      opacity: 0.45;
      cursor: default;
    }
    button:focus-visible {
      outline: 3px solid var(--accent-color);
      outline-offset: 2px;
    }
    .actions {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin: 8px 0;
    }
    .blind {
      border-bottom: 1px solid var(--divider-color);
      padding: 8px 0;
    }
    .pictures {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
      gap: 12px;
    }
    .tile {
      aspect-ratio: 1.2133333;
      padding: 0;
      background: rgba(0, 0, 0, 0.3);
      color: white;
    }
    .tile svg {
      width: 100%;
      height: 100%;
      pointer-events: none;
    }
    [data-preview] {
      width: 160px;
      height: 132px;
      background: rgba(0, 0, 0, 0.3);
      color: white;
      border-radius: 14px;
      margin: 12px auto;
    }
    [data-preview] svg {
      width: 100%;
      height: 100%;
    }
    [role="status"] {
      display: block;
      color: var(--error-color, #db4437);
      font-size: 14px;
      margin: 8px 0;
    }
    pre {
      white-space: pre-wrap;
      overflow-wrap: anywhere;
    }
  `}render(){if(!this.config)return d;if(this.removing)return l`<p>
          Remove this ${this.removing.kind}?
          ${this.removing.kind==="blind"?"Its coordinates will be removed from every preset.":"This preset will be deleted."}
          This cannot be undone here.
        </p>
        <div class="actions">
          <button @click=${()=>this.removeItem()}>Confirm removal</button
          ><button @click=${()=>this.removing=void 0}>
            Cancel removal
          </button>
        </div>`;if(this.draft){let t=this.draftProblem;return l`<h3>Edit preset</h3>
        <ha-form
          .hass=${this.hass}
          .data=${{name:this.draft.name}}
          .schema=${[ke("name")]}
          .computeLabel=${this.label}
          @value-changed=${i=>{i.stopPropagation(),this.draft={...this.draft,name:i.detail.value.name}}}
        ></ha-form>
        <div data-preview>
          ${yt(this.config.blinds,this.draft.positions)}
        </div>
        <p>
          Pictures use percentages down from the top. Without native overrides,
          sequential blinds require top 0 or bottom 100. Native overrides match
          reported command attributes, not measured rail geometry. Saving never moves blinds.
        </p>
        <ha-form data-script .hass=${this.hass} .data=${{script:this.sourceScript}}
          .schema=${[{name:"script",selector:{entity:{filter:{domain:"script"}}}}]}
          .computeLabel=${()=>"Copy from existing script (optional)"}
          @value-changed=${i=>{i.stopPropagation();let s=i.detail.value.script??"";s!==this.sourceScript&&this.invalidateCopy(),this.sourceScript=s,this.error=""}}
        ></ha-form>
        <button ?disabled=${!this.sourceScript||this.copying||!this.hass?.callWS} @click=${()=>this.copyCommands()}>Copy commands</button>
        <p>Copies only simple cover actions into this draft. Review commands and picture, then Save. No script is run or linked.</p>
        <h3>Native override (optional)</h3>
        <p>With an override, only listed shades are commanded; all others are untouched. Removing the override restores sequential mode.</p>
        ${this.config.blinds.map(i=>{let s=(this.draft.commands??this.draft.actions)?.find(r=>r.entity_id===i.entity),n=s?.service==="set_cover_position"||s?.service==="set_cover_tilt_position";return l`<ha-form data-command=${i.entity} .hass=${this.hass}
            .data=${{service:s?.service??"untouched",value:s?.service==="set_cover_position"?s.position:s?.service==="set_cover_tilt_position"?s.tilt_position:0}}
            .schema=${[{name:"service",selector:{select:{mode:"dropdown",options:[{value:"untouched",label:"Untouched (no native command)"},...ft.map(r=>({value:r,label:r}))]}}},...n?[U("value",0,100)]:[]]}
            .computeLabel=${r=>r.name==="service"?i.name||i.entity:"Native value (%)"}
            @value-changed=${r=>this.commandChange(i.entity,r)}></ha-form>`})}
        ${this.draft.commands??this.draft.actions?l`<pre data-command-preview>${JSON.stringify(this.draft.commands??this.draft.actions,null,2)}</pre><button @click=${()=>{let i={...this.draft};delete i.commands,delete i.actions,this.draft=i}}>Remove override</button>`:d}
        ${this.config.blinds.map((i,s)=>l`<h3>
                ${i.name||["Left","Middle","Right"][s]||`Blind ${s+1}`}
              </h3>
              <ha-form
                data-position=${s}
                .hass=${this.hass}
                .data=${this.draft.positions[s]}
                .schema=${[U("top",0,100),U("bottom",0,100)]}
                .computeLabel=${this.label}
                @value-changed=${n=>{n.stopPropagation();let r=structuredClone(this.draft);r.positions[s]={...r.positions[s],...n.detail.value},this.draft=r}}
              ></ha-form>`)}${t?l`<span role="status">${t}</span>`:d}${this.error?l`<span role="status">${this.error}</span>`:d}
        <div class="actions">
          <button ?disabled=${!!t} @click=${()=>this.save()}>
            Save</button
          ><button @click=${()=>this.draft=void 0}>Cancel</button
          >${this.draftIndex<this.config.presets.length?l`<button @click=${()=>this.removing={kind:"preset",index:this.draftIndex}}>Remove preset</button>`:d}
        </div>`}return l`<ha-form
        data-grid
        .hass=${this.hass}
        .data=${{rows:this.config.rows,columns:this.config.columns}}
        .schema=${[U("rows",1,12),U("columns",1,12)]}
        .computeLabel=${this.label}
        @value-changed=${this.updateGrid}
      ></ha-form>
      <p>
        Remove extra presets explicitly before shrinking the grid. Narrow cards
        wrap columns to keep 44px touch targets.
      </p>
      <h3>Blinds (picture order)</h3>
      ${this.config.blinds.map((t,i)=>l`<section class="blind">
            <ha-form
              data-blind=${i}
              .hass=${this.hass}
              .data=${t}
              .schema=${_e}
              .computeLabel=${this.label}
              @value-changed=${s=>this.updateBlind(i,s)}
            ></ha-form>
            <div class="actions">
              <button
                aria-label=${`Move blind ${t.name||i+1} up`}
                ?disabled=${i===0}
                @click=${()=>this.moveBlind(i,-1)}
              >
                ↑</button
              ><button
                aria-label=${`Move blind ${t.name||i+1} down`}
                ?disabled=${i===this.config.blinds.length-1}
                @click=${()=>this.moveBlind(i,1)}
              >
                ↓</button
              ><button
                aria-label=${`Remove blind ${t.name||i+1}`}
                ?disabled=${this.config.blinds.length===1}
                @click=${()=>this.removing={kind:"blind",index:i}}
              >
                Remove
              </button>
            </div>
          </section>`)}
      <h3>Add blind</h3>
      <ha-form
        data-new-blind
        .hass=${this.hass}
        .data=${this.newBlind}
        .schema=${_e}
        .computeLabel=${this.label}
        @value-changed=${t=>{t.stopPropagation(),this.newBlind={...this.newBlind,...t.detail.value}}}
      ></ha-form>
      <div class="actions">
        <button
          ?disabled=${this.config.blinds.length>=12||!this.newBlind.entity}
          @click=${()=>this.addBlind()}
        >
          Add blind
        </button>
      </div>
      <h3>Presets</h3>
      <div class="pictures">
        ${this.config.presets.map((t,i)=>l`<button class="tile" aria-label=${`Edit ${t.name}`} title=${O(t)} @click=${()=>this.edit(i)}>${yt(this.config.blinds,t.positions)}</button>`)}
      </div>
      ${this.config.presets.map((t,i)=>l`<div class="actions"><span>${t.name}</span><button aria-label=${`Move preset ${t.name} up`} ?disabled=${i===0} @click=${()=>this.movePreset(i,-1)}>↑</button><button aria-label=${`Move preset ${t.name} down`} ?disabled=${i===this.config.presets.length-1} @click=${()=>this.movePreset(i,1)}>↓</button></div>`)}<button
        ?disabled=${!this.config.blinds.length||this.config.presets.length>=this.config.rows*this.config.columns}
        @click=${()=>this.addPreset()}
      >
        Add preset</button
      >${this.error?l`<span role="status">${this.error}</span>`:d}`}};customElements.get("kiosk-blind-presets-editor")||customElements.define("kiosk-blind-presets-editor",gt)});function yt(o,e){let t=o.map(n=>n.width??1),i=t.reduce((n,r)=>n+r,0),s=8;return Rt`<svg viewBox="0 0 120 100" aria-hidden="true" focusable="false">${o.map((n,r)=>{let c=(104-4*(o.length-1))*t[r]/i,a=s;s+=c+4;let h=e[r]??{top:0,bottom:100};return Rt`<g><rect x=${a} y="12" width=${c} height="76" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><rect data-fabric x=${a} y=${12+Math.min(74,76*h.top/100)} width=${c} height=${Math.max(2,76*(h.bottom-h.top)/100)} rx="1" fill="currentColor"/></g>`})}</svg>`}function Z(o){if(!o||!Number.isInteger(o.rows)||o.rows<1||o.rows>12||!Number.isInteger(o.columns)||o.columns<1||o.columns>12)throw Error("Rows and columns must be integers from 1 to 12");if(!Array.isArray(o.blinds)||!o.blinds.length||o.blinds.length>12)throw Error("Choose 1\u201312 blinds");let e=new Set;for(let t of o.blinds){if(!t||typeof t.entity!="string"||!/^cover\.[a-z0-9_]+$/.test(t.entity)||e.has(t.entity))throw Error("Choose unique cover entities");if(e.add(t.entity),t.width!==void 0&&(typeof t.width!="number"||!Number.isFinite(t.width)||t.width<=0||t.width>10))throw Error("Blind widths must be greater than 0 and at most 10");if(t.mapping!==void 0&&t.mapping!=="sequential-tdbu")throw Error("Only sequential-tdbu mapping is supported")}if(!Array.isArray(o.presets)||o.presets.length>o.rows*o.columns)throw Error("Remove presets before shrinking the grid");e.clear();for(let t of o.presets){if(!t||typeof t.id!="string"||!t.id.trim()||e.has(t.id)||typeof t.name!="string"||!t.name.trim())throw Error("Presets need unique IDs and accessible names");if(e.add(t.id),t.commands!==void 0&&t.actions!==void 0)throw Error("Use commands or actions, not both");if((t.commands!==void 0||t.actions!==void 0)&&mt(t.commands??t.actions,o.blinds.map(i=>i.entity)),!Array.isArray(t.positions)||t.positions.length!==o.blinds.length)throw Error("Each preset needs one position per blind");for(let i of t.positions)if(!i||![i.top,i.bottom].every(s=>typeof s=="number"&&Number.isFinite(s)&&s>=0&&s<=100)||i.top>i.bottom)throw Error("Coordinates must be 0\u2013100 with top \u2264 bottom")}}function O(o){return o.commands!==void 0||o.actions!==void 0?"":o.positions.some(e=>e.top!==0&&e.bottom!==100)?"Unsupported sequential TDBU position: top must be 0 or bottom must be 100.":""}function bt(o){return!!o&&!["unknown","unavailable"].includes(o.state)&&["current_position","current_tilt_position"].every(e=>typeof o.attributes[e]=="number"&&Number.isFinite(o.attributes[e])&&o.attributes[e]>=0&&o.attributes[e]<=100)}function we(o,e){return bt(o)&&!["opening","closing"].includes(o.state)&&Math.abs((o.attributes.current_position>0?0:o.attributes.current_tilt_position)-e.top)<=2&&Math.abs(100-o.attributes.current_position-e.bottom)<=2}var vt,Dt=$(()=>{"use strict";k();P();zt();vt=class extends y{constructor(){super(...arguments);this.cardWidth=320;this.busy=!1;this.error="";this.operation=0;this.acknowledged=!1}static async getConfigElement(){return await Promise.resolve().then(()=>(xe(),$e)),document.createElement("kiosk-blind-presets-editor")}static getStubConfig(t){let i=Object.keys(t?.states||{}).filter(s=>s.startsWith("cover.")).slice(0,3).map(s=>({entity:s,mapping:"sequential-tdbu",width:1}));return i.length||i.push({entity:"cover.example_blind",mapping:"sequential-tdbu",width:1}),{type:"custom:kiosk-blind-presets-card",rows:3,columns:3,blinds:i,presets:i.length?[{id:"closed",name:"Closed",positions:i.map(()=>({top:0,bottom:100}))}]:[]}}static{this.properties={hass:{attribute:!1},config:{state:!0},busy:{state:!0},error:{state:!0},cardWidth:{state:!0}}}connectedCallback(){super.connectedCallback(),this.resize=new ResizeObserver(t=>{this.cardWidth=t[0].contentRect.width}),this.resize.observe(this)}invalidate(){this.operation++,clearTimeout(this.watchdog),this.busy=!1,this.expected=void 0,this.acknowledged=!1}disconnectedCallback(){this.resize?.disconnect(),this.invalidate(),super.disconnectedCallback()}shouldUpdate(t){if(t.size!==1||!t.has("hass"))return!0;let i=t.get("hass");return!i||this.config.blinds.some(s=>i.states[s.entity]!==this.hass.states[s.entity])}willUpdate(){this.finishIfConfirmed()}finishIfConfirmed(){this.busy&&this.acknowledged&&this.expected&&this.presetMatches(this.expected)&&this.invalidate()}presetMatches(t){let i=t.commands??t.actions;return i?i.length>0&&i.every(s=>jt(this.hass.states[s.entity_id],s)):this.config.blinds.every((s,n)=>we(this.hass.states[s.entity],t.positions[n]))}plan(t){Z(this.config);let i=t.commands??t.actions;if(i){let s=mt(i,this.config.blinds.map(n=>n.entity));if(!s.every(n=>J(this.hass.states[n.entity_id],n)))throw Error("Required native attribute or capability unavailable");return s.flatMap(n=>{let{service:r,...c}=n;return jt(this.hass.states[n.entity_id],n)?[]:[{service:r,data:c}]})}if(O(t))throw Error(O(t));return this.config.blinds.flatMap((s,n)=>{let r=this.hass.states[s.entity],c=t.positions[n];if(!bt(r))throw Error("Blind unavailable. Check device.");let a,h,u={entity_id:s.entity};if(c.top===0&&c.bottom===0?(a="open_cover",h=1):c.top===0&&c.bottom===100?(a="close_cover",h=2):c.bottom===100?(a="set_cover_tilt_position",h=128,u.tilt_position=c.top):(a="set_cover_position",h=4,u.position=100-c.bottom),!(Number(r.attributes.supported_features)&h))throw Error("Required blind capability is missing. Check device.");return we(r,c)?[]:[{service:a,data:u}]})}async activate(t,i){if(i.stopPropagation(),this.busy||i.detail>1||!this.isConnected||!this.config.presets.includes(t))return;let s;try{s=this.plan(t)}catch(r){this.error=r.message;return}if(this.error="",!s.length)return;let n=++this.operation;this.busy=!0,this.expected=t,this.acknowledged=!1,this.watchdog=setTimeout(()=>{this.operation===n&&(this.invalidate(),this.error="No confirmation. Check device.")},12e3);try{for(let r of s){if(this.operation!==n||!this.isConnected)return;if(t.commands??t.actions?!J(this.hass.states[r.data.entity_id],{service:r.service,...r.data}):!bt(this.hass.states[r.data.entity_id]))throw Error("Unavailable");await this.hass.callService("cover",r.service,r.data)}if(this.operation!==n)return;this.acknowledged=!0,this.finishIfConfirmed()}catch{this.operation===n&&(this.invalidate(),this.error="Action failed. Check device.")}}setConfig(t){Z(t),this.invalidate(),this.error="",this.config=structuredClone(t)}getCardSize(){if(!this.config)return 1;let t=this.getBoundingClientRect().width||this.cardWidth,i=this.columnsForWidth(t),s=Math.ceil(this.config.rows*this.config.columns/i),n=Math.max(44,(t-(i-1)*12)/i/1.2133333);return Math.ceil((s*n+(s-1)*12)/50)}columnsForWidth(t){return Math.min(this.config.columns,Math.max(1,Math.floor((t+12)/56)))}getGridOptions(){return{columns:12,rows:"auto",min_columns:3}}static{this.styles=[x,m`
      :host {
        min-width: 0;
        position: relative;
      }

      .matrix {
        display: grid;
        gap: 12px;
        padding: 0;
        box-sizing: border-box;
        background: transparent;
      }
      .slot {
        aspect-ratio: 1.2133333;
        min-height: 44px;
      }
      button.tile {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        min-width: 44px;
        min-height: 44px;
        aspect-ratio: 1.2133333;
        border-radius: var(--kiosk-radius, var(--ha-card-border-radius, 14px));
        box-shadow: var(--kiosk-shadow, var(--ha-card-box-shadow, 0 2px 4px rgba(0, 0, 0, 0.1), 0 6px 10px rgba(0, 0, 0, 0.08)));
        background: var(--kiosk-background, rgba(0, 0, 0, 0.3));
        color: var(--kiosk-glyph, white);
        overflow: hidden;
      }
      button.tile.active {
        background: var(--kiosk-active-background, white);
        color: var(--kiosk-icon-color, var(--accent-color, #3bc8ce));
      }
      button.tile:active:not(:disabled) {
        filter: brightness(0.85);
        transform: scale(0.98);
      }
      svg {
        width: 100%;
        height: 100%;
        max-height: 110px;
        pointer-events: none;
      }
    `]}render(){return!this.config||!this.hass?d:l`<div
        class="matrix"
        style=${`grid-template-columns:repeat(${this.columnsForWidth(this.cardWidth)},minmax(44px,1fr))`}
      >
        ${this.config.presets.map(t=>{let i=O(t)||((t.commands??t.actions?(t.commands??t.actions).every(n=>J(this.hass.states[n.entity_id],n)):this.config.blinds.every(n=>bt(this.hass.states[n.entity])))?"":"Blind unavailable"),s=!i&&this.presetMatches(t);return l`<button
            type="button"
            class=${`tile ${s?"active":""}`}
            aria-label=${t.name}
            ?disabled=${!!i||this.busy}
            @click=${n=>this.activate(t,n)}
            @keydown=${n=>{n.repeat&&n.preventDefault()}}
            aria-pressed=${String(s)}
          >
            ${yt(this.config.blinds,t.positions)}
          </button>`})}${Array.from({length:this.config.rows*this.config.columns-this.config.presets.length},()=>l`<div class="slot" aria-hidden="true"></div>`)}
      </div>`}};customElements.get("kiosk-blind-presets-card")||customElements.define("kiosk-blind-presets-card",vt)});k();K();var le={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},de=o=>(...e)=>({_$litDirective$:o,values:e}),dt=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};var he="important",We=" !"+he,w=de(class extends dt{constructor(o){if(super(o),o.type!==le.ATTRIBUTE||o.name!=="style"||o.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(o){return Object.keys(o).reduce((e,t)=>{let i=o[t];return i==null?e:e+`${t=t.includes("-")?t:t.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${i};`},"")}update(o,[e]){let{style:t}=o.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(e)),this.render(e);for(let i of this.ft)e[i]==null&&(this.ft.delete(i),i.includes("-")?t.removeProperty(i):t[i]=null);for(let i in e){let s=e[i];if(s!=null){this.ft.add(i);let n=typeof s=="string"&&s.endsWith(We);i.includes("-")||n?t.setProperty(i,n?s.slice(0,-11):s,n?he:""):t[i]=s}}return E}});P();Ut();k();var T=o=>({name:o,selector:{text:{}}}),v=(o,e={})=>({name:o,selector:{entity:e}}),ht=class extends y{constructor(){super(...arguments);this.label=t=>this.config.type==="custom:kiosk-pill-card"&&t.name==="background"?"Background":{aqhi_entity:"Local Canadian PM2.5 smoke index",regional_entity:"Regional Canadian AQHI (optional)",category_entity:"Canadian smoke risk category sensor",source_entity:"Source PM2.5 sensor",data_expected_entity:"History ready timestamp (optional)",stale_after_minutes:"Stale after (minutes; default 120)",location:"Location (optional)",entity:"Primary entity (body more-info target)",door_entity:"Door contact or cover (optional override)",lock_entity:"Linked lock",temperature_format:"Temperature number format",hvac_colors:"HVAC action colors (optional)",status_entity:"Status message sensor",status_active_entity:"Status active sensor",trend_entity:"Temperature trend sensor",name:"Name",icon:"Icon",area:"Area",navigation_path:"Navigation path",temperature_entity:"Temperature sensor",occupancy_entity:"Occupancy sensor",light_entities:"Lights (optional override)",var_large:"Large",show_name:"Show name",show_state:"Show state",show_icon:"Show icon",state_display:"State text (optional override)",detail:"Detail (optional override)",interactions:"Interactions",dynamic:"Declarative rules (advanced, optional)",presentation:"Presentation expressions",action_rules:"Conditional actions",appearance:"Appearance (optional)",icon_color:"Category color (CSS color)",background:"Off background",active_background:"Active background",radius:"Corner radius",tap_action:"Body tap",hold_action:"Body hold",double_tap_action:"Body double tap",icon_tap_action:"Icon tap",icon_hold_action:"Icon hold",icon_double_tap_action:"Icon double tap"}[t.name]||t.name}static{this.properties={hass:{attribute:!1},config:{state:!0}}}static{this.styles=m`
    :host {
      display: block;
    }
    p {
      color: var(--secondary-text-color);
      font-size: 14px;
    }
  `}setConfig(t){this.config={...t}}get schema(){if(this.config.type==="custom:kiosk-air-card")return[v("aqhi_entity",{filter:{domain:"sensor"}}),v("regional_entity",{filter:{domain:"sensor"}}),v("category_entity",{filter:{domain:"sensor"}}),v("source_entity",{filter:{domain:"sensor"}}),v("data_expected_entity",{filter:{domain:"sensor",device_class:"timestamp"}}),T("name"),T("location"),{name:"icon",selector:{icon:{}}},{name:"stale_after_minutes",selector:{number:{min:1,max:1440,mode:"box",unit_of_measurement:"min"}}},{name:"appearance",type:"expandable",schema:["icon_color","background","radius"].map(T)}];let i=this.config.type==="custom:kiosk-room-card",s=this.config.type==="custom:kiosk-action-card",n=this.config.type==="custom:kiosk-pill-card",r=this.config.type==="custom:kiosk-door-card",c=this.config.type==="custom:kiosk-climate-card",a=this.config.type==="custom:kiosk-status-card",h=i?[{name:"area",selector:{area:{}}},T("name"),{name:"icon",selector:{icon:{}}},T("navigation_path"),v("temperature_entity",{filter:{domain:"sensor",device_class:"temperature"}}),v("occupancy_entity",{filter:{domain:"binary_sensor"}}),v("light_entities",{multiple:!0,filter:{domain:"light"}})]:[v("entity",s?{filter:{domain:["script","scene","button"]}}:r?{filter:{domain:["binary_sensor","cover","lock"]}}:c?{filter:{domain:"climate"}}:{}),T("name"),{name:"icon",selector:{icon:{}},context:{icon_entity:"entity"}}],u=i?[]:[{name:"interactions",type:"expandable",flatten:!0,schema:["tap_action","hold_action","double_tap_action","icon_tap_action","icon_hold_action","icon_double_tap_action"].map(p=>({name:p,selector:{ui_action:{default_action:s?"none":p==="icon_tap_action"?!n&&["light","switch","input_boolean"].includes((this.config.entity||"").split(".")[0])?"toggle":"more-info":p.includes("double")?"none":"more-info"}},context:{entity:"entity"}}))}];return[...h,...r?[v("door_entity",{filter:{domain:["binary_sensor","cover"]}}),v("lock_entity",{filter:{domain:"lock"}})]:[],...c?[{name:"temperature_format",selector:{select:{options:["locale","legacy"]}}},{name:"hvac_colors",selector:{object:{}}}]:[],...a?[v("status_entity"),v("status_active_entity",{filter:{domain:"binary_sensor"}}),v("trend_entity",{filter:{domain:"sensor"}})]:[],...n?["show_name","show_state","show_icon"].map(p=>({name:p,selector:{boolean:{}}})):a?[]:[{name:"var_large",selector:{boolean:{}}}],...i?[]:[T(n?"state_display":"detail")],...u,...i?[]:[{name:"dynamic",type:"expandable",flatten:!0,schema:["presentation","action_rules"].map(p=>({name:p,selector:{object:{}}}))}],{name:"appearance",type:"expandable",schema:(n?["icon_color","background","radius"]:["icon_color","background","active_background","radius"]).map(T)}]}change(t){t.stopPropagation();let i=t.detail.value;this.config={...this.config,...i},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this.config},bubbles:!0,composed:!0}))}render(){return!this.config||!this.hass?d:l`<ha-form
        .hass=${this.hass}
        .data=${this.config.type==="custom:kiosk-pill-card"?{...this.config,show_name:this.config.show_name??!0,show_state:this.config.show_state??!0,show_icon:this.config.show_icon??!0}:{...this.config,var_large:this.config.var_large??this.config.variables?.var_large??!1}}
        .schema=${this.schema}
        .computeLabel=${this.label}
        @value-changed=${this.change}
      ></ha-form>
      <p>
        ${this.config.type==="custom:kiosk-air-card"?"Read-only Canadian PM2.5-only smoke estimate with separate optional regional AQHI. Each Details button opens its own native Home Assistant entity history. No device actions or custom dialogs.":l`Pills stay compact and default to more-info on both targets. Large
        applies only to entity, action, room, door and climate cards. Default appearance
        follows the kiosk design. Entity icon taps control only lights, switches
        and input booleans. Room controls only navigate; action cards require an
        explicit action.`}
      </p>`}};customElements.get("kiosk-card-editor")||customElements.define("kiosk-card-editor",ht);var Fe=new Set(["if","eq","ne","includes","in","and","or","not","defined","finite","number","round","gt","lt","concat","capitalize","map","countdown","minutes"]);function G(o,e=0){if(e>24)throw Error("Rule nesting exceeds 24");if(!(!o||typeof o!="object")){if(Array.isArray(o)){if(o.length>100)throw Error("Rule list too large");o.forEach(t=>G(t,e+1));return}if(o.op!==void 0){if(!Fe.has(o.op)||!Array.isArray(o.args)||o.args.length>100)throw Error("Unknown rule operation");o.args.forEach(t=>G(t,e+1))}else if(o.entity!==void 0||o.attribute!==void 0||o.state!==void 0||o.last_changed!==void 0){if(o.attribute&&["__proto__","constructor","prototype"].includes(o.attribute))throw Error("Unsafe attribute");if(o.entity!==void 0&&typeof o.entity!="string")throw Error("Rule entity must be a string")}else Object.values(o).forEach(t=>G(t,e+1))}}function pt(o,e,t,i=Date.now()){if(!o||typeof o!="object")return o;if(!o.op){if(o.entity!==void 0||o.attribute!==void 0||o.state!==void 0||o.last_changed!==void 0){let n=e?.states[o.entity||t.entity||""];return o.attribute!==void 0?n?.attributes[o.attribute]:o.last_changed?n?.last_changed:n?.state}return o}let s=n=>pt(o.args[n],e,t,i);switch(o.op){case"if":return s(0)?s(1):s(2);case"eq":return s(0)===s(1);case"ne":return s(0)!==s(1);case"includes":return typeof s(0)=="string"&&s(0).includes(s(1));case"in":return Array.isArray(s(1))&&s(1).includes(s(0));case"and":return o.args.every((n,r)=>!!s(r));case"or":return o.args.some((n,r)=>!!s(r));case"not":return!s(0);case"defined":return s(0)!==void 0;case"finite":return Number.isFinite(s(0));case"number":return Number(s(0));case"round":return Math.round(Number(s(0)));case"gt":return s(0)>s(1);case"lt":return s(0)<s(1);case"concat":return o.args.map((n,r)=>s(r)??"").join("");case"capitalize":{let n=String(s(0)??"");return n.charAt(0).toUpperCase()+n.slice(1)}case"map":{let n=s(1);return Object.hasOwn(n,String(s(0)))?n[String(s(0))]:n.default??s(2)}case"minutes":{let n=Date.parse(s(0));return Number.isFinite(n)?Math.max(0,Math.ceil((n-i)/6e4)):NaN}case"countdown":{let n=Date.parse(s(0));if(!Number.isFinite(n))return s(1)??"";let r=Math.max(0,Math.ceil((n-i)/6e4)),c=Math.floor(r/60);return c>0?`${c}h ${String(r%60).padStart(2,"0")}m left`:`${r}m left`}}}function me(o){return/"op":"(?:countdown|minutes)"/.test(JSON.stringify(o.presentation))}function ge(o){G(o.presentation);for(let[e,t]of Object.entries(o.action_rules||{})){if(!/^(icon_)?(tap|hold|double_tap)_action$/.test(e)||!Array.isArray(t)||t.length>100)throw Error("Invalid action rules");for(let i of t)if(G(i.when),!i.action||typeof i.action.action!="string")throw Error("Rule requires action")}}var ye=new Set(["light","switch","input_boolean"]);function be(o,e,t){o.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}var Ke=new Set(["off","closed","idle","paused","standby","away","docked","unknown","unavailable","locked","disarmed"]),g=class extends y{constructor(){super(...arguments);this.busy=!1;this.confirming=!1;this.error="";this.operation=0;this.acknowledged=!1;this.held=!1}static{this.properties={hass:{attribute:!1},config:{state:!0},busy:{state:!0},error:{state:!0},confirming:{state:!0}}}connectedCallback(){super.connectedCallback(),this.startClock()}startClock(){clearInterval(this.clock),this.isConnected&&this.config&&me(this.config)&&(this.clock=setInterval(()=>this.requestUpdate(),3e4))}presentation(t){let i=this.config.presentation?.[t];return i===void 0?void 0:pt(i,this.hass,this.config)}resolvedAction(t,i){return this.config.action_rules?.[t]?.find(n=>pt(n.when,this.hass,this.config))?.action||i}action(t,i="tap"){let s=(t==="icon"?"icon_":"")+i+"_action";return this.resolvedAction(s,this.config[s]||{action:i==="tap"?t==="icon"&&this.available&&ye.has((this.config.entity||"").split(".")[0])?"toggle":"more-info":i==="hold"?"more-info":"none"})}async runAction(t,i,s="tap"){i.stopPropagation();let n=this.action(t,s);if(n.action==="none"||this.busy||this.confirming)return;let r=this.config,c=n.confirmation;if(c&&!(typeof c=="object"&&c.exemptions?.some(_=>_.user===this.hass.user?.id))){let _=this.operation;this.confirming=!0;let A=await fe(this,typeof c=="object"?c:{});if(this.operation!==_||(this.confirming=!1,!A||!this.isConnected||this.config!==r))return}if(n.action==="more-info"){be(this,"hass-more-info",{entityId:n.entity||this.config.entity});return}if(!["toggle","perform-action","call-service"].includes(n.action)){let{confirmation:_,...A}=n;be(this,"hass-action",{config:{...this.config,tap_action:A},action:"tap"});return}if(!this.available)return;let a,h,u,p=n.target;if(n.action==="toggle"){if(a=(this.config.entity||"").split(".")[0],!ye.has(a)){this.error="Choose an explicit action for this device.";return}this.expected=this.state?.state==="on"?"off":"on",h=this.expected==="on"?"turn_on":"turn_off",u={entity_id:this.config.entity}}else{if([a,h]=(n.perform_action||n.service||"").split("."),!a||!h){this.error="Choose an action.";return}u=n.data??n.service_data,this.expected=void 0}let f=++this.operation;this.busy=!0,this.error="",this.acknowledged=!1,this.watchdog=setTimeout(()=>{this.operation===f&&(this.operation++,this.busy=!1,this.error="No confirmation. Check device.")},12e3);try{if(await this.hass.callService(a,h,u,p),this.operation!==f)return;this.acknowledged=!0,this.finishIfConfirmed()}catch{this.operation===f&&(this.operation++,this.busy=!1,clearTimeout(this.watchdog),this.error="Action failed. Check device.")}}finishIfConfirmed(){this.busy&&this.acknowledged&&(!this.expected||this.state?.state===this.expected)&&(this.busy=!1,this.expected=void 0,clearTimeout(this.watchdog))}updated(){this.finishIfConfirmed()}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this.clock),clearTimeout(this.watchdog),clearTimeout(this.holdTimer),clearTimeout(this.tapTimer),this.operation++,this.busy=!1}pointerDown(t,i){i.stopPropagation(),i.button===0&&(this.held=!1,clearTimeout(this.holdTimer),this.holdTimer=setTimeout(()=>{this.held=!0,clearTimeout(this.tapTimer),this.runAction(t,i,"hold")},500))}pointerEnd(t){t.stopPropagation(),clearTimeout(this.holdTimer)}tap(t,i){if(i.stopPropagation(),this.held){this.held=!1;return}if(i.detail===0||this.action(t,"double_tap").action==="none"){this.runAction(t,i);return}i.detail>1?(clearTimeout(this.tapTimer),this.runAction(t,i,"double_tap")):this.tapTimer=setTimeout(()=>void this.runAction(t,i),300)}static async getConfigElement(){return window.loadCardHelpers&&await H(["ha-form"]),document.createElement("kiosk-card-editor")}static getStubConfig(t,i=[]){return{entity:i.find(s=>t.states[s])||Object.keys(t.states).find(s=>s.startsWith("light."))||Object.keys(t.states)[0]}}static{this.styles=x}applyConfig(t){ge(t);let i=t.var_large??t.variables?.var_large;if(i!==void 0&&typeof i!="boolean")throw Error("var_large must be a boolean");clearTimeout(this.watchdog),clearTimeout(this.holdTimer),clearTimeout(this.tapTimer),this.operation++,this.busy=!1,this.confirming=!1,this.expected=void 0,this.error="",this.config={...t},this.startClock()}setConfig(t){if(!t.entity)throw new Error("Choose an entity");this.applyConfig(t)}getCardSize(){return this.large?3:1.38}getGridOptions(){return{columns:6,rows:"auto"}}get state(){return this.hass?.states[this.config?.entity||""]}get active(){return!!this.state&&(this.config.active_states?this.config.active_states.includes(this.state.state):!Ke.has(this.state.state))}get cardTitle(){return(this.presentation("name")??this.config.name)||this.state?.attributes.friendly_name||this.config.entity||"Entity"}get detail(){let t=this.presentation("detail");if(t!==void 0)return String(t);if(this.config.detail!==void 0)return this.config.detail;let i=this.state;if(!i)return"Unavailable";if(i.state==="on"&&i.entity_id.startsWith("light.")&&i.attributes.brightness)return`${Math.round(i.attributes.brightness/2.55)}%`;if(i.entity_id.startsWith("climate.")&&!["unknown","unavailable"].includes(i.state)){let n=i.attributes;if(n.target_temp_low!=null&&n.target_temp_high!=null)return`${n.target_temp_low}\xB0\u2013${n.target_temp_high}\xB0`;if(n.temperature!=null)return`${n.temperature}\xB0`;if(n.current_temperature!=null)return`${n.current_temperature}\xB0 (${i.state.charAt(0).toUpperCase()+i.state.slice(1)})`}let s=this.hass.formatEntityState?.(i)||i.state;return s.charAt(0).toUpperCase()+s.slice(1)}get available(){return!!this.state&&!["unknown","unavailable"].includes(this.state.state)}get isAction(){return!1}get large(){return(this.config.var_large??this.config.variables?.var_large)===!0}get cardIcon(){return this.presentation("icon")??this.config.icon}get surfaceStyles(){return{}}get iconContent(){return this.cardIcon?l`<ha-icon .icon=${this.cardIcon}></ha-icon>`:l`<ha-state-icon .hass=${this.hass} .stateObj=${this.state} .stateColor=${!1}></ha-state-icon>`}render(){if(!this.config||!this.hass)return d;let t=this.config.appearance;return l`<ha-card
      part="surface"
      aria-busy=${String(this.busy)}
      class=${[this.active?"active":"",this.available?"":"unavailable",this.isAction?"action":"",this.large?"large":""].join(" ")}
      style=${w({"--kiosk-icon-color":t?.icon_color,"--kiosk-default-icon-color":this.config.entity?.startsWith("light.")?"var(--accent-color,#3bc8ce)":void 0,"--kiosk-background":t?.background,"--kiosk-active-background":t?.active_background,"--kiosk-radius":t?.radius,...this.surfaceStyles})}
    >
      <button
        part="icon-target"
        @click=${i=>this.tap("icon",i)}
        @pointerdown=${i=>this.pointerDown("icon",i)}
        @pointerup=${this.pointerEnd}
        @pointercancel=${this.pointerEnd}
        @pointerleave=${this.pointerEnd}
        aria-label=${`Icon \u2014 ${this.cardTitle}`}
        ?disabled=${this.busy||this.confirming||!this.available&&["none","toggle","perform-action","call-service"].includes(this.action("icon").action)}
      >
        <span part="icon-circle"
          >${this.iconContent}</span
        >
      </button>
      <button
        part="body-target"
        @click=${i=>this.tap("body",i)}
        @pointerdown=${i=>this.pointerDown("body",i)}
        @pointerup=${this.pointerEnd}
        @pointercancel=${this.pointerEnd}
        @pointerleave=${this.pointerEnd}
        aria-label=${this.cardTitle}
        ?disabled=${this.busy||this.confirming||!this.available&&["toggle","perform-action","call-service"].includes(this.action("body").action)}
      >
        <span part="title">${this.cardTitle}</span
        >${this.detail?l`<span part="detail">${this.detail}</span>`:d}</button
      >${this.error?l`<span part="feedback" role="status">${this.error}</span>`:d}</ha-card
    >`}},V=class extends g{},Q=class extends g{static getStubConfig(e,t=[]){let s=[...t,...Object.keys(e.states)].find(n=>["script","scene","button"].includes(n.split(".")[0]));return s?{entity:s}:{name:"Action"}}setConfig(e){if(!e.entity&&!e.name)throw Error("Choose an entity or name");if(e.entity&&!["script","scene","button"].includes(e.entity.split(".")[0]))throw Error("Action entities must be scripts, scenes or buttons");this.applyConfig(e)}get isAction(){return!0}get cardIcon(){return(this.presentation("icon")??this.config.icon)||(this.state?void 0:"mdi:play")}get active(){return!0}get detail(){return this.config.detail||(this.available?"":"Unavailable")}get available(){return!this.config.entity||super.available}action(e,t="tap"){let i=(e==="icon"?"icon_":"")+t+"_action";return this.resolvedAction(i,this.config[i]||(e==="icon"&&t==="tap"?this.config.tap_action:void 0)||{action:"none"})}};Dt();P();var X=class extends g{static getStubConfig(){return{name:"Room",navigation_path:"/lovelace"}}setConfig(e){if(!e.area&&!e.name)throw Error("Choose an area or name");this.applyConfig(e)}get cardTitle(){return this.config.name||this.hass.areas?.[this.config.area||""]?.name||"Room"}get cardIcon(){return this.config.icon||this.hass.areas?.[this.config.area||""]?.icon||"mdi:home-outline"}get available(){return!0}get active(){return this.lights.some(e=>e.state==="on")||(this.config.occupancy_entity?this.hass.states[this.config.occupancy_entity]?.state==="on":this.roomStates.some(e=>e.entity_id.startsWith("binary_sensor.")&&["occupancy","presence","motion"].includes(e.attributes.device_class)&&e.state==="on"))}get roomStates(){return this.config.area?Object.values(this.hass.states).filter(e=>{let t=this.hass.entities?.[e.entity_id];return!t||t.hidden||t.hidden_by||t.disabled_by?!1:(t.area_id||this.hass.devices?.[t.device_id]?.area_id)===this.config.area}):[]}get lights(){return this.config.light_entities!==void 0?this.config.light_entities.map(e=>this.hass.states[e]||{entity_id:e,state:"unavailable",attributes:{}}):this.roomStates.filter(e=>e.entity_id.startsWith("light."))}get detail(){let e=this.roomStates,t=this.config.temperature_entity?this.hass.states[this.config.temperature_entity]||{entity_id:this.config.temperature_entity,state:"unavailable",attributes:{}}:e.find(r=>r.attributes.device_class==="temperature"),i=this.config.occupancy_entity?this.hass.states[this.config.occupancy_entity]||{entity_id:this.config.occupancy_entity,state:"unavailable",attributes:{}}:e.find(r=>r.entity_id.startsWith("binary_sensor.")&&["occupancy","presence","motion"].includes(r.attributes.device_class)),s=[];t&&s.push(["unknown","unavailable"].includes(t.state)?"Temperature unavailable":`${t.state}${t.attributes.unit_of_measurement?" "+t.attributes.unit_of_measurement:""}`),i&&s.push(i.state==="on"?"Occupied":i.state==="off"?"Clear":"Occupancy unavailable");let n=this.lights;if(n.length){let r=n.filter(a=>a.state==="on").length,c=n.filter(a=>["unknown","unavailable"].includes(a.state)).length;r?s.push(`${r} light${r===1?"":"s"} on`):c<n.length&&s.push("Lights off"),c&&s.push(`${c} unavailable`)}return s.join(" \xB7 ")}action(e,t="tap"){return t==="tap"&&this.config.navigation_path?{action:"navigate",navigation_path:this.config.navigation_path}:{action:"none"}}};k();P();var Y=class extends g{static{this.styles=m`
    ${x}${It}
  `}setConfig(e){if(!e.entity)throw Error("Choose an entity");if(e.var_large??e.variables?.var_large)throw Error("Pills are compact; Large is not supported");for(let t of["show_name","show_state","show_icon"])if(e[t]!==void 0&&typeof e[t]!="boolean")throw Error(`${t} must be a boolean`);if(e.show_name===!1&&e.show_state===!1&&e.show_icon===!1)throw Error("Show at least one pill field");this.applyConfig(e)}get large(){return!1}get active(){return!1}getCardSize(){return 1}get detail(){let e=this.presentation("state_display");if(e!==void 0)return String(e);let t=this.state;if(this.config.state_display!==void 0)return this.config.state_display;let i=t?this.config.state_labels?.[t.state]??this.config.state_labels?.default:void 0;if(i!==void 0)return i;if(!t)return"Unavailable";let s=this.hass.formatEntityState?.(t)||t.state;return s.charAt(0).toUpperCase()+s.slice(1)}action(e,t="tap"){let i=(e==="icon"?"icon_":"")+t+"_action";return this.resolvedAction(i,this.config[i]||(e==="icon"?this.config[t+"_action"]:void 0)||{action:t==="double_tap"?"none":"more-info"})}disabled(e){return this.busy||this.confirming||!this.available&&["toggle","perform-action","call-service"].includes(this.action(e).action)}render(){if(!this.config||!this.hass)return d;let e=this.config.appearance,t=this.config.show_name!==!1,i=this.config.show_state!==!1;return l`<ha-card
      part="surface"
      aria-busy=${String(this.busy)}
      class=${`pill ${t?"":"no-name"} ${i?"":"no-state"} ${this.available?"":"unavailable"}`}
      style=${w({"--kiosk-background":e?.background,"--kiosk-icon-color":e?.icon_color,"--kiosk-radius":e?.radius})}
      @click=${s=>this.tap("body",s)}
      @pointerdown=${s=>this.pointerDown("body",s)}
      @pointerup=${this.pointerEnd}
      @pointercancel=${this.pointerEnd}
      @pointerleave=${this.pointerEnd}
    >
      ${this.config.show_icon!==!1?l`<button part="icon-target" aria-label=${`Icon \u2014 ${this.cardTitle}`} ?disabled=${this.disabled("icon")} @click=${s=>this.tap("icon",s)} @pointerdown=${s=>this.pointerDown("icon",s)} @pointerup=${this.pointerEnd} @pointercancel=${this.pointerEnd} @pointerleave=${this.pointerEnd}><span part="icon-circle">${this.cardIcon?l`<ha-icon .icon=${this.cardIcon}></ha-icon>`:l`<ha-state-icon .hass=${this.hass} .stateObj=${this.state} .stateColor=${!1}></ha-state-icon>`}</span></button>`:l`<span class="empty-icon" aria-hidden="true"></span>`}
      <button
        part="body-target"
        aria-label=${`${this.cardTitle}: ${this.detail}`}
        ?disabled=${this.disabled("body")}
        @click=${s=>this.tap("body",s)}
        @pointerdown=${s=>this.pointerDown("body",s)}
        @pointerup=${this.pointerEnd}
        @pointercancel=${this.pointerEnd}
        @pointerleave=${this.pointerEnd}
      >
        ${t?l`<span part="title">${this.cardTitle}</span>`:d}${i?l`<span part="detail">${this.detail}</span>`:d}</button
      >${this.error?l`<span part="feedback" role="status">${this.error}</span>`:d}</ha-card
    >`}};k();var tt=class extends g{static{this.styles=m`${g.styles} .unavailable [part="icon-circle"] { opacity: 1; }`}static getStubConfig(e){return{entity:Object.keys(e?.states||{}).find(i=>["binary_sensor","cover","lock"].includes(i.split(".")[0]))||"binary_sensor.example_door"}}setConfig(e){if(!e.entity)throw Error("Choose a door or lock entity");if(!["binary_sensor","cover","lock"].includes(e.entity.split(".")[0]))throw Error("Choose a contact, cover or lock");if(e.lock_entity&&!e.lock_entity.startsWith("lock."))throw Error("Choose a lock entity");this.applyConfig(e)}get lockEntity(){return this.config.lock_entity||(this.config.entity?.startsWith("lock.")?this.config.entity:void 0)}get doorEntity(){return this.config.door_entity||(this.config.entity?.startsWith("lock.")?void 0:this.config.entity)}get lockState(){return this.hass?.states[this.lockEntity||""]}get doorState(){return this.hass?.states[this.doorEntity||""]?.state||"unknown"}get closed(){return["off","closed"].includes(this.doorState)}get open(){return["on","open"].includes(this.doorState)}get active(){return!(this.lockState?.state==="locked"&&this.closed)}get detail(){let e=this.presentation("detail")??this.config.detail;if(e!==void 0)return String(e);let t=this.open?"open":this.closed?"closed":this.doorState;return this.lockEntity?`${t} / ${this.lockState?.state||"unknown"}`:t}get cardIcon(){let e=super.cardIcon;if(e)return e;let t=this.lockState?.state;return t==="locked"&&this.closed?"mdi:door-closed-lock":t==="locked"&&this.open?"mdi:door-closed-cancel":t==="unlocked"&&this.closed?"mdi:lock-open":t==="unlocked"&&this.open?"mdi:door-open":this.lockState?.attributes.icon||"mdi:lock-question"}get surfaceStyles(){return{"--kiosk-glyph":this.active?"white":this.config.appearance?.icon_color||"#3bc8ce"}}action(e,t="tap"){let i=(e==="icon"?"icon_":"")+t+"_action";return this.resolvedAction(i,this.config[i]||{action:t==="double_tap"?"none":"more-info",...e==="icon"&&this.lockEntity?{entity:this.lockEntity}:{}})}};k();P();var et=class extends g{static{this.styles=pe}static getStubConfig(e){return{entity:Object.keys(e?.states||{}).find(t=>t.startsWith("climate."))||"climate.example"}}setConfig(e){if(!e.entity?.startsWith("climate."))throw Error("Choose a climate entity");this.applyConfig(e)}temperature(e){return this.config.temperature_format==="legacy"?String(e):typeof e!="number"||!Number.isFinite(e)?"\u2014":new Intl.NumberFormat(this.hass.locale?.language||"en",{maximumFractionDigits:2}).format(e)}get active(){return!!this.state&&!["off","idle","standby","away"].includes(this.state.state)}get detail(){let e=this.presentation("detail")??this.config.detail;if(e!==void 0)return String(e);let t=this.state;if(!t)return"Unavailable";let i=t.attributes,s=t.state,n=r=>this.temperature(r)+"\xB0";return s==="off"?"Off":s==="fan_only"?"Fan On":s==="heat"||s==="cool"?`${n(i.temperature)} / ${s} mode`:i.target_temp_low!==void 0&&i.target_temp_high!==void 0?`${n(i.target_temp_low)}\u2013${n(i.target_temp_high)}`:i.temperature!==null&&(i.temperature!==void 0||this.config.temperature_format==="legacy")?n(i.temperature):`${n(i.current_temperature)} (${s.charAt(0).toUpperCase()+s.slice(1)})`}get iconContent(){return l`<span part="temperature">${this.temperature(this.state?.attributes.current_temperature)}°</span>`}get surfaceStyles(){let e=this.config.hvac_colors;return{"--kiosk-temperature-color":e?.[this.state?.attributes.hvac_action]||e?.default||this.config.appearance?.icon_color||"var(--accent-color)","--kiosk-height":this.large?"145px":"68px"}}};k();P();var it=class extends g{static{this.styles=ue}static getStubConfig(e){return{entity:Object.keys(e?.states||{}).find(t=>t.startsWith("sensor.")&&e?.states[t].attributes.device_class==="temperature")||"sensor.example_temperature"}}get active(){return this.hass?.states[this.config.status_active_entity||""]?.state==="on"}get value(){let e=this.state?.state||"unavailable",t=parseFloat(e);return Number.isFinite(t)?t.toFixed(0):e}get message(){let e=this.hass?.states[this.config.status_entity||""]?.state;return e&&e!=="clear"?e:""}get trendColor(){let e=parseFloat(this.hass?.states[this.config.trend_entity||""]?.state||"");return Number.isFinite(e)?e>=3?"#ff1744":e>=1.5?"#ff6d00":e>=.5?"#ffd600":e<=-3?"#2962ff":e<=-1.5?"#00b0ff":e<=-.5?"#00e5ff":"white":"white"}render(){return!this.config||!this.hass?d:l`<ha-card part="surface" class=${this.active?"active":""} style=${w({"--kiosk-background":this.config.appearance?.background||"var(--ha-card-background,var(--card-background-color))","--kiosk-radius":this.config.appearance?.radius})}>
   <button part="body-target" aria-label=${this.cardTitle} @click=${e=>this.tap("body",e)} @pointerdown=${e=>this.pointerDown("body",e)} @pointerup=${this.pointerEnd} @pointercancel=${this.pointerEnd} @pointerleave=${this.pointerEnd}>
    ${this.active?l`<span part="status">${this.message}</span>`:l`<span part="pad" aria-hidden="true">°</span><span part="value">${this.value}</span><span part="degree" style=${w({color:this.trendColor})}>°</span>`}
   </button>
  </ha-card>`}};k();P();var st=[{key:"low",label:"Low risk",color:"var(--blue-color,#3188b5)",sentence:"Low particle levels around your home."},{key:"moderate",label:"Moderate risk",color:"var(--warning-color,#d1bb60)",sentence:"Moderate particle levels around your home."},{key:"high",label:"High risk",color:"var(--error-color,#c9706e)",sentence:"High particle levels around your home."},{key:"very_high",label:"Very high risk",color:"var(--deep-purple-color,#8c6373)",sentence:"Very high particle levels around your home."}],Lt=o=>o&&/^\d+(\.\d+)?$/.test(o.state)&&Number.isFinite(Number(o.state))?Number(o.state):NaN,b=(o,e)=>({label:o,sentence:e,index:-1,value:"\u2014",color:"var(--disabled-text-color,#888)"}),Ce=o=>o<=3?0:o<=6?1:o<=10?2:3,ot=class extends g{static{this.styles=m`${x}
    :host { container-type:inline-size; }
    [part="surface"] { display:block; height:auto; padding:14px 18px 13px; background:var(--kiosk-background,var(--kiosk-active-background,white)); background-image:radial-gradient(ellipse at 95% 0%,color-mix(in srgb,var(--air-color) 25%,transparent),transparent 65%),linear-gradient(145deg,color-mix(in srgb,var(--air-color) 4%,transparent),color-mix(in srgb,var(--air-color) 12%,transparent)); color:var(--kiosk-active-title,black); }
    .identity { display:flex; align-items:center; gap:10px; }
    .identity > div { min-width:0; }
    [part="icon-circle"] { flex:none; width:38px; height:38px; background:var(--kiosk-icon-color,var(--accent-color,#3bc8ce)); }
    [part="title"] { font-size:16px; line-height:20px; white-space:normal; overflow-wrap:anywhere; }
    [part="detail"] { color:inherit; opacity:.65; font-size:12px; line-height:16px; margin-top:0; white-space:normal; overflow-wrap:anywhere; }
    .hero { display:flex; align-items:baseline; flex-wrap:wrap; gap:6px 8px; margin-top:9px; }
    [part="aqhi"] { flex:none; white-space:nowrap; font-size:43px; font-weight:650; letter-spacing:-2px; line-height:1; }
    [part="category"] { font-size:25px; font-weight:650; letter-spacing:-.7px; line-height:1.15; overflow-wrap:anywhere; }
    [part="interpretation"] { font-size:13px; line-height:1.4; margin:7px 0 12px; }
    .rail { display:flex; gap:4px; height:5px; }
    [part="segment"] { flex:1; border-radius:5px; position:relative; opacity:.6; }
    [part="segment"].selected { opacity:1; }
    .selected::after { content:''; position:absolute; width:4px; height:11px; top:-3px; left:calc(50% - 2.5px); background:currentColor; border:1px solid var(--kiosk-active-background,white); border-radius:5px; }
    .labels { display:flex; justify-content:space-between; font-size:9px; line-height:12px; opacity:.7; margin-top:5px; }
    .row { display:flex; align-items:center; justify-content:space-between; gap:12px; }
    .local-summary { cursor:pointer; touch-action:manipulation; border-radius:12px; }
    .local-summary:focus-visible { outline:2px solid var(--primary-color,#3bc8ce); outline-offset:4px; }
    .unit { font-size:12px; font-weight:400; letter-spacing:0; opacity:.7; }
    .provenance { font-size:11px; line-height:1.5; opacity:.75; margin-top:3px; }
    .regional-section { margin-top:20px; padding-top:17px; border-top:1px solid color-mix(in srgb,currentColor 12%,transparent); }
    .regional-reading { min-width:0; }
    [part="regional-category"] { display:block; font-size:20px; font-weight:600; line-height:1.25; overflow-wrap:anywhere; }
    [part="regional-aqhi"] { font-size:17px; font-weight:600; margin-top:5px; }
    button { flex:none; min-height:44px; min-width:44px; padding:10px 14px; border-radius:18px; background:color-mix(in srgb,currentColor 7%,transparent); font-size:13px; }

  `}connectedCallback(){super.connectedCallback(),this.freshnessClock=setInterval(()=>this.requestUpdate(),3e4)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this.freshnessClock)}static getStubConfig(){return{aqhi_entity:"sensor.example_smoke_index",category_entity:"sensor.example_smoke_category",source_entity:"sensor.example_pm25"}}setConfig(e){for(let t of["aqhi_entity","category_entity","source_entity"])if(typeof e[t]!="string"||!/^sensor\.[a-z0-9_]+$/.test(e[t]))throw Error(`Choose a sensor for ${t}`);for(let t of["data_expected_entity","regional_entity"])if(e[t]&&(typeof e[t]!="string"||!/^sensor\.[a-z0-9_]+$/.test(e[t])))throw Error(`Choose a sensor for ${t}`);if(e.stale_after_minutes!==void 0&&(!Number.isFinite(e.stale_after_minutes)||e.stale_after_minutes<1||e.stale_after_minutes>1440))throw Error("stale_after_minutes must be between 1 and 1440");this.applyConfig(e)}getCardSize(){return this.config?.regional_entity?7:4}getGridOptions(){return{columns:12,rows:"auto",min_columns:6}}moreInfo(e,t){e.stopPropagation(),this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:t},bubbles:!0,composed:!0}))}timestampFreshness(e,t=this.config.stale_after_minutes??120){let i=e.map(s=>{if(typeof s!="string"||!/^\d{4}-\d{2}-\d{2}T([01]\d|2[0-3]):[0-5]\d:[0-5]\d(\.\d+)?(Z|[+-]\d{2}:\d{2})$/.test(s))return NaN;let n=Date.parse(s);return Number.isFinite(n)&&new Date(s.slice(0,10)+"T00:00:00Z").toISOString().slice(0,10)===s.slice(0,10)?n:NaN});return i.some(s=>!Number.isFinite(s)||s>Date.now()+6e4)?"Unknown":i.some(s=>Date.now()-s>t*6e4)?"Stale":void 0}freshness(e){return this.timestampFreshness(e.map(t=>t?.last_reported??t?.last_updated))}get local(){let e=this.hass.states,t=e[this.config.aqhi_entity],i=e[this.config.source_entity],s=e[this.config.category_entity];if([t,i,s].some(f=>!f||f.state==="unavailable"))return b("Unavailable","The local air sensor is unavailable.");if(!Number.isFinite(Lt(i)))return b("Unknown","Waiting for a local particle reading.");let n=t.attributes;if(!(n.index_type==="canadian_aqhi_smoke_pm25"&&n.scope==="local_pm25_only_estimate")||n.source_entity!==this.config.source_entity)return b("Unknown","Choose a matching Canadian PM2.5 smoke estimate sensor.");let c=this.timestampFreshness([n.evaluated_at]);if(c)return b(c,"Waiting for a recent smoke calculation.");if(n.status==="source_stale")return b("Stale","Waiting for a recent particle reading.");if(n.status==="incomplete_history")return b("Warming up","Gathering enough particle history.");if(n.status==="history_unavailable")return b("Unavailable","Particle history is unavailable.");if(n.status!=="valid")return b("Unknown","Waiting for a valid particle reading.");let a=n.source_max_age_minutes;if(typeof a!="number"||!Number.isFinite(a)||a<=0)return b("Unknown","Waiting for source freshness metadata.");let h=this.timestampFreshness([n.source_last_reported],Math.min(a,this.config.stale_after_minutes??120));if(h)return b(h,"Waiting for a recent particle reading.");let u=Lt(t);if(!Number.isInteger(u)||u<1||u>11||!st.some(f=>f.key===s.state)){let f=Date.parse(e[this.config.data_expected_entity||""]?.state||"");return(t.state==="unknown"||s.state==="unknown")&&f>Date.now()?b("Warming up","Gathering enough particle history."):b("Unknown","Waiting for a calculated Canadian smoke index.")}let p=Ce(u);return st[p].key!==s.state?b("Updating","Waiting for matching Canadian smoke readings."):{...st[p],index:p,value:u===11?"10+":String(u)}}get regional(){let e=this.hass.states[this.config.regional_entity];if(!e||e.state==="unavailable")return b("Unavailable","Regional AQHI is unavailable.");let t=Lt(e),i=e.state==="10+";if(!i&&(!Number.isFinite(t)||t<0))return b("Unknown","Waiting for regional AQHI.");let s=this.freshness([e]);if(s)return b(s,"Waiting for recent regional AQHI.");let n=i?11:Math.max(1,Math.round(t)),r=Ce(n);return{...st[r],index:r,value:n>10?"10+":String(n)}}render(){if(!this.config||!this.hass)return d;let e=this.local,t=this.regional,i=this.hass.states[this.config.regional_entity];return l`<ha-card part="surface" style=${w({"--air-color":e.color,"--kiosk-background":this.config.appearance?.background,"--kiosk-radius":this.config.appearance?.radius,"--kiosk-icon-color":this.config.appearance?.icon_color})}>
      <div class="local-summary" role="button" tabindex="0" aria-label=${`${this.config.name||"Outside air"}: local Canadian smoke history`} aria-description="Local PM2.5-only Canadian smoke estimate, not full regional AQHI. Bands: low 1–3, moderate 4–6, high 7–10, very high 10+." title="Canadian PM2.5-only smoke estimate, not the full regional multi-pollutant AQHI." @click=${s=>this.moreInfo(s,this.config.aqhi_entity)} @keydown=${s=>{(s.key==="Enter"||s.key===" ")&&(s.preventDefault(),s.repeat||this.moreInfo(s,this.config.aqhi_entity))}}>
      <div class="identity"><span part="icon-circle" aria-hidden="true"><ha-icon .icon=${this.config.icon||"mdi:weather-windy"}></ha-icon></span><div><span part="title">${this.config.name||"Outside air"}</span>${this.config.location?l`<span part="detail">${this.config.location}</span>`:d}</div></div>
      <div role="status" aria-live="polite" aria-atomic="true"><div class="hero"><div part="aqhi">${e.value} <span class="unit">AQHI</span></div><span part="category">${e.label}</span></div><p part="interpretation">${e.sentence}</p></div>
      <div aria-hidden="true"><div class="rail">${st.map((s,n)=>l`<span part="segment" class=${e.index===n?"selected":""} style=${w({background:s.color})}></span>`)}</div><div class="labels"><span>Low · 1–3</span><span>Very high · 10+</span></div></div>
      </div>
      ${this.config.regional_entity?l`<section class="regional-section" aria-label="Regional Canadian AQHI"><div class="provenance">${i?.attributes.location||"Regional"} · Regional AQHI</div><div class="row"><div class="regional-reading" role="status" aria-live="polite" aria-atomic="true"><span part="regional-category">${t.label}</span><div part="regional-aqhi">${t.value} <span class="unit">AQHI</span></div></div><button aria-label="Details: regional AQHI history" @click=${s=>this.moreInfo(s,this.config.regional_entity)}>Details ↗</button></div>${i?.attributes.attribution?l`<div class="provenance">${i.attributes.attribution}</div>`:d}</section>`:d}
    </ha-card>`}};customElements.get("kiosk-door-card")||customElements.define("kiosk-door-card",tt);customElements.get("kiosk-climate-card")||customElements.define("kiosk-climate-card",et);customElements.get("kiosk-status-card")||customElements.define("kiosk-status-card",it);customElements.get("kiosk-air-card")||customElements.define("kiosk-air-card",ot);customElements.get("kiosk-entity-card")||customElements.define("kiosk-entity-card",V);customElements.get("kiosk-action-card")||customElements.define("kiosk-action-card",Q);customElements.get("kiosk-room-card")||customElements.define("kiosk-room-card",X);customElements.get("kiosk-pill-card")||customElements.define("kiosk-pill-card",Y);var Ee=window.customBadges||=[];Ee.some(o=>o.type==="kiosk-pill-card")||Ee.push({type:"kiosk-pill-card",name:"Kiosk pill",description:"Compact status capsule",preview:!0,documentationURL:"https://github.com/myevit/kiosk-cards"});var Ae=window.customCards||=[];for(let[o,e,t]of[["kiosk-blind-presets-card","Kiosk blind presets","Picture-only composite sequential TDBU blind presets"],["kiosk-entity-card","Kiosk entity","State tile with isolated quick control"],["kiosk-action-card","Kiosk action","Explicit momentary action tile"],["kiosk-room-card","Kiosk room","Room summary and navigation"],["kiosk-door-card","Kiosk door","Independent door and linked lock observations"],["kiosk-climate-card","Kiosk climate","Current temperature and HVAC mode"],["kiosk-air-card","Kiosk air","Read-only Canadian smoke estimate and separate regional AQHI"],["kiosk-status-card","Kiosk status","Passive temperature and cross-entity status display"],["kiosk-pill-card","Kiosk pill","Compact status capsule for cards and native badges"]])Ae.some(i=>i.type===o)||Ae.push({type:o,name:e,description:t,preview:!0,documentationURL:"https://github.com/myevit/kiosk-cards"});export{Q as KioskActionCard,ot as KioskAirCard,g as KioskBaseCard,vt as KioskBlindPresetsCard,ht as KioskCardEditor,et as KioskClimateCard,tt as KioskDoorCard,V as KioskEntityCard,Y as KioskPillCard,X as KioskRoomCard,it as KioskStatusCard,qe as designTokens,x as kioskStyles,It as pillStyles};
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
lit-html/lit-html.js:
lit-element/lit-element.js:
lit-html/directive.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/style-map.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
