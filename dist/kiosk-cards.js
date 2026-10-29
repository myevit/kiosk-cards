var ke=Object.defineProperty;var x=(o,t)=>()=>(o&&(t=o(o=0)),t);var _e=(o,t)=>{for(var e in t)ke(o,e,{get:t[e],enumerable:!0})};var ot,nt,gt,Nt,O,Ot,m,zt,bt,yt=x(()=>{ot=globalThis,nt=ot.ShadowRoot&&(ot.ShadyCSS===void 0||ot.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,gt=Symbol(),Nt=new WeakMap,O=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==gt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(nt&&t===void 0){let i=e!==void 0&&e.length===1;i&&(t=Nt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&Nt.set(e,t))}return t}toString(){return this.cssText}},Ot=o=>new O(typeof o=="string"?o:o+"",void 0,gt),m=(o,...t)=>{let e=o.length===1?o[0]:t.reduce((i,s,n)=>i+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+o[n+1],o[0]);return new O(e,o,gt)},zt=(o,t)=>{if(nt)o.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let i=document.createElement("style"),s=ot.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=e.cssText,o.appendChild(i)}},bt=nt?o=>o:o=>o instanceof CSSStyleSheet?(t=>{let e="";for(let i of t.cssRules)e+=i.cssText;return Ot(e)})(o):o});var $e,xe,we,Ce,Ee,Ae,rt,jt,Se,Pe,z,vt,Lt,Dt,C,at=x(()=>{yt();yt();({is:$e,defineProperty:xe,getOwnPropertyDescriptor:we,getOwnPropertyNames:Ce,getOwnPropertySymbols:Ee,getPrototypeOf:Ae}=Object),rt=globalThis,jt=rt.trustedTypes,Se=jt?jt.emptyScript:"",Pe=rt.reactiveElementPolyfillSupport,z=(o,t)=>o,vt={toAttribute(o,t){switch(t){case Boolean:o=o?Se:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,t){let e=o;switch(t){case Boolean:e=o!==null;break;case Number:e=o===null?null:Number(o);break;case Object:case Array:try{e=JSON.parse(o)}catch{e=null}}return e}},Lt=(o,t)=>!$e(o,t),Dt={attribute:!0,type:String,converter:vt,reflect:!1,useDefault:!1,hasChanged:Lt};Symbol.metadata??=Symbol("metadata"),rt.litPropertyMetadata??=new WeakMap;C=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Dt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let i=Symbol(),s=this.getPropertyDescriptor(t,i,e);s!==void 0&&xe(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){let{get:s,set:n}=we(this.prototype,t)??{get(){return this[e]},set(r){this[e]=r}};return{get:s,set(r){let c=s?.call(this);n?.call(this,r),this.requestUpdate(t,c,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Dt}static _$Ei(){if(this.hasOwnProperty(z("elementProperties")))return;let t=Ae(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(z("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(z("properties"))){let e=this.properties,i=[...Ce(e),...Ee(e)];for(let s of i)this.createProperty(s,e[s])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[i,s]of e)this.elementProperties.set(i,s)}this._$Eh=new Map;for(let[e,i]of this.elementProperties){let s=this._$Eu(e,i);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let i=new Set(t.flat(1/0).reverse());for(let s of i)e.unshift(bt(s))}else t!==void 0&&e.push(bt(t));return e}static _$Eu(t,e){let i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return zt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){let i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(s!==void 0&&i.reflect===!0){let n=(i.converter?.toAttribute!==void 0?i.converter:vt).toAttribute(e,i.type);this._$Em=t,n==null?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){let i=this.constructor,s=i._$Eh.get(t);if(s!==void 0&&this._$Em!==s){let n=i.getPropertyOptions(s),r=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:vt;this._$Em=s;let c=r.fromAttribute(e,n.type);this[s]=c??this._$Ej?.get(s)??c,this._$Em=null}}requestUpdate(t,e,i,s=!1,n){if(t!==void 0){let r=this.constructor;if(s===!1&&(n=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??Lt)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:n},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),n!==!0||r!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),s===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,n]of this._$Ep)this[s]=n;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[s,n]of i){let{wrapped:r}=n,c=this[s];r!==!0||this._$AL.has(s)||c===void 0||this.C(s,void 0,n,c)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};C.elementStyles=[],C.shadowRootOptions={mode:"open"},C[z("elementProperties")]=new Map,C[z("finalized")]=new Map,Pe?.({ReactiveElement:C}),(rt.reactiveElementVersions??=[]).push("2.1.2")});function Yt(o,t){if(!At(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return qt!==void 0?qt.createHTML(t):t}function I(o,t,e=o,i){if(t===E)return t;let s=i!==void 0?e._$Co?.[i]:e._$Cl,n=L(t)?void 0:t._$litDirective$;return s?.constructor!==n&&(s?._$AO?.(!1),n===void 0?s=void 0:(s=new n(o),s._$AT(o,e,i)),i!==void 0?(e._$Co??=[])[i]=s:e._$Cl=s),s!==void 0&&(t=I(o,s._$AS(o,t.values),s,i)),t}var Et,Wt,ct,qt,Zt,S,Jt,Te,R,D,L,At,Me,kt,j,Kt,Ft,M,Vt,Qt,Xt,St,l,Pt,qe,E,d,Gt,B,Be,W,_t,q,H,$t,xt,wt,Ct,Re,te,K=x(()=>{Et=globalThis,Wt=o=>o,ct=Et.trustedTypes,qt=ct?ct.createPolicy("lit-html",{createHTML:o=>o}):void 0,Zt="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,Jt="?"+S,Te=`<${Jt}>`,R=document,D=()=>R.createComment(""),L=o=>o===null||typeof o!="object"&&typeof o!="function",At=Array.isArray,Me=o=>At(o)||typeof o?.[Symbol.iterator]=="function",kt=`[ 	
\f\r]`,j=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Kt=/-->/g,Ft=/>/g,M=RegExp(`>|${kt}(?:([^\\s"'>=/]+)(${kt}*=${kt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Vt=/'/g,Qt=/"/g,Xt=/^(?:script|style|textarea|title)$/i,St=o=>(t,...e)=>({_$litType$:o,strings:t,values:e}),l=St(1),Pt=St(2),qe=St(3),E=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),Gt=new WeakMap,B=R.createTreeWalker(R,129);Be=(o,t)=>{let e=o.length-1,i=[],s,n=t===2?"<svg>":t===3?"<math>":"",r=j;for(let c=0;c<e;c++){let a=o[c],p,u,h=-1,f=0;for(;f<a.length&&(r.lastIndex=f,u=r.exec(a),u!==null);)f=r.lastIndex,r===j?u[1]==="!--"?r=Kt:u[1]!==void 0?r=Ft:u[2]!==void 0?(Xt.test(u[2])&&(s=RegExp("</"+u[2],"g")),r=M):u[3]!==void 0&&(r=M):r===M?u[0]===">"?(r=s??j,h=-1):u[1]===void 0?h=-2:(h=r.lastIndex-u[2].length,p=u[1],r=u[3]===void 0?M:u[3]==='"'?Qt:Vt):r===Qt||r===Vt?r=M:r===Kt||r===Ft?r=j:(r=M,s=void 0);let k=r===M&&o[c+1].startsWith("/>")?" ":"";n+=r===j?a+Te:h>=0?(i.push(p),a.slice(0,h)+Zt+a.slice(h)+S+k):a+S+(h===-2?c:k)}return[Yt(o,n+(o[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]},W=class o{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,r=0,c=t.length-1,a=this.parts,[p,u]=Be(t,e);if(this.el=o.createElement(p,i),B.currentNode=this.el.content,e===2||e===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(s=B.nextNode())!==null&&a.length<c;){if(s.nodeType===1){if(s.hasAttributes())for(let h of s.getAttributeNames())if(h.endsWith(Zt)){let f=u[r++],k=s.getAttribute(h).split(S),A=/([.?@])?(.*)/.exec(f);a.push({type:1,index:n,name:A[2],strings:k,ctor:A[1]==="."?$t:A[1]==="?"?xt:A[1]==="@"?wt:H}),s.removeAttribute(h)}else h.startsWith(S)&&(a.push({type:6,index:n}),s.removeAttribute(h));if(Xt.test(s.tagName)){let h=s.textContent.split(S),f=h.length-1;if(f>0){s.textContent=ct?ct.emptyScript:"";for(let k=0;k<f;k++)s.append(h[k],D()),B.nextNode(),a.push({type:2,index:++n});s.append(h[f],D())}}}else if(s.nodeType===8)if(s.data===Jt)a.push({type:2,index:n});else{let h=-1;for(;(h=s.data.indexOf(S,h+1))!==-1;)a.push({type:7,index:n}),h+=S.length-1}n++}}static createElement(t,e){let i=R.createElement("template");return i.innerHTML=t,i}};_t=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??R).importNode(e,!0);B.currentNode=s;let n=B.nextNode(),r=0,c=0,a=i[0];for(;a!==void 0;){if(r===a.index){let p;a.type===2?p=new q(n,n.nextSibling,this,t):a.type===1?p=new a.ctor(n,a.name,a.strings,this,t):a.type===6&&(p=new Ct(n,this,t)),this._$AV.push(p),a=i[++c]}r!==a?.index&&(n=B.nextNode(),r++)}return B.currentNode=R,s}p(t){let e=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},q=class o{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=I(this,t,e),L(t)?t===d||t==null||t===""?(this._$AH!==d&&this._$AR(),this._$AH=d):t!==this._$AH&&t!==E&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Me(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==d&&L(this._$AH)?this._$AA.nextSibling.data=t:this.T(R.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:i}=t,s=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=W.createElement(Yt(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{let n=new _t(s,this),r=n.u(this.options);n.p(e),this.T(r),this._$AH=n}}_$AC(t){let e=Gt.get(t.strings);return e===void 0&&Gt.set(t.strings,e=new W(t)),e}k(t){At(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,i,s=0;for(let n of t)s===e.length?e.push(i=new o(this.O(D()),this.O(D()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let i=Wt(t).nextSibling;Wt(t).remove(),t=i}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},H=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,n){this.type=1,this._$AH=d,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=d}_$AI(t,e=this,i,s){let n=this.strings,r=!1;if(n===void 0)t=I(this,t,e,0),r=!L(t)||t!==this._$AH&&t!==E,r&&(this._$AH=t);else{let c=t,a,p;for(t=n[0],a=0;a<n.length-1;a++)p=I(this,c[i+a],e,a),p===E&&(p=this._$AH[a]),r||=!L(p)||p!==this._$AH[a],p===d?t=d:t!==d&&(t+=(p??"")+n[a+1]),this._$AH[a]=p}r&&!s&&this.j(t)}j(t){t===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},$t=class extends H{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===d?void 0:t}},xt=class extends H{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==d)}},wt=class extends H{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){if((t=I(this,t,e,0)??d)===E)return;let i=this._$AH,s=t===d&&i!==d||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==d&&(i===d||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Ct=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){I(this,t)}},Re=Et.litHtmlPolyfillSupport;Re?.(W,q),(Et.litHtmlVersions??=[]).push("3.3.3");te=(o,t,e)=>{let i=e?.renderBefore??t,s=i._$litPart$;if(s===void 0){let n=e?.renderBefore??null;i._$litPart$=s=new q(t.insertBefore(D(),n),n,void 0,e??{})}return s._$AI(o),s}});var Tt,b,Ie,ee=x(()=>{at();at();K();K();Tt=globalThis,b=class extends C{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=te(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return E}};b._$litElement$=!0,b.finalized=!0,Tt.litElementHydrateSupport?.({LitElement:b});Ie=Tt.litElementPolyfillSupport;Ie?.({LitElement:b});(Tt.litElementVersions??=[]).push("4.2.2")});var ie=x(()=>{});var _=x(()=>{at();K();ee();ie()});var $,Mt,re,ae,Ue,P=x(()=>{"use strict";_();$=m`
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
`,Mt=m`
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
`,re=m`${$}
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
`,ae=m`${$}
 :host { height:100%; }
 [part="surface"] { height:100%; padding:16px; border:none; }
 [part="body-target"] { display:flex; flex-direction:row; min-height:0; align-items:center; justify-content:center; text-align:center; width:100%; }
 [part="value"], [part="degree"], [part="pad"] { font-size:112px; font-weight:700; line-height:1; color:white; }
 [part="pad"] { visibility:hidden; }
 [part="status"] { width:100%; font-size:20px; font-weight:var(--ha-font-weight-normal,400); line-height:1.35; color:white; white-space:normal; }
 .active [part="status"] { color:black; }
`,Ue=Object.freeze({height:69,actionHeight:68,largeHeight:146,pillHeight:35,pillRadius:18,pillIconSize:24,iconDiameter:45,glyphSize:25,titleSize:17,detailSize:15,categoryColor:"#3bc8ce"})});async function U(o=["ha-dialog","ha-button","ha-dialog-footer","ha-form"]){if(o.every(i=>customElements.get(i)))return;let t=await window.loadCardHelpers?.();if(!t||(await(await t.createCardElement({type:"entities",entities:[]})).constructor.getConfigElement?.(),!o.every(i=>customElements.get(i))))throw Error("Home Assistant controls are unavailable")}function ce(o,t){return new Promise(e=>{let i=!1,s=n=>{i||(i=!0,e(n))};o.dispatchEvent(new CustomEvent("show-dialog",{bubbles:!0,composed:!0,detail:{dialogTag:"kiosk-confirmation-dialog",dialogImport:()=>U().catch(n=>{throw s(!1),n}),dialogParams:{...t,confirm:()=>s(!0),cancel:()=>s(!1)}}}))})}var Bt,Rt=x(()=>{"use strict";_();Bt=class extends b{constructor(){super(...arguments);this.open=!1}static{this.properties={open:{state:!0},params:{state:!0}}}async showDialog(e){await U(),this.params=e,this.open=!0,await this.updateComplete}closeDialog(){return this.finish(!1),!0}finish(e){this.open&&(this.open=!1,(e?this.params.confirm:this.params.cancel)(),this.dispatchEvent(new CustomEvent("dialog-closed",{bubbles:!0,composed:!0,detail:{dialog:this.localName}})))}render(){return this.params?l`<ha-dialog
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
    >`:d}};customElements.get("kiosk-confirmation-dialog")||customElements.define("kiosk-confirmation-dialog",Bt)});var me={};_e(me,{KioskBlindPresetsEditor:()=>pt});var G,fe,ue,pt,ge=x(()=>{"use strict";_();Rt();It();G=(o,t,e,i=1)=>({name:o,selector:{number:{min:t,max:e,step:i,mode:"box"}}}),fe=o=>({name:o,selector:{text:{}}}),ue=[{name:"entity",required:!0,selector:{entity:{filter:{domain:"cover"}}}},fe("name"),G("width",.1,10,.1)],pt=class extends b{constructor(){super(...arguments);this.draftIndex=-1;this.newBlind={width:1};this.error="";this.label=e=>({rows:"Grid rows",columns:"Grid columns",entity:"Cover entity",name:"Accessible name",width:"Relative picture width",top:"Top (% down)",bottom:"Bottom (% down)"})[e.name]||e.name}static{this.properties={hass:{attribute:!1},config:{state:!0},draft:{state:!0},newBlind:{state:!0},error:{state:!0},removing:{state:!0}}}connectedCallback(){super.connectedCallback(),U(["ha-form"]).catch(()=>{this.error="Home Assistant native form controls could not load. Reopen the editor."})}setConfig(e){this.config=structuredClone(e),this.draft=void 0,this.removing=void 0,this.error=""}emit(e){try{Z(e)}catch(i){return this.error=i.message,!1}return this.config=e,this.error="",this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:structuredClone(e)},bubbles:!0,composed:!0})),!0}updateGrid(e){e.stopPropagation();let i=e.detail.value;this.emit({...this.config,rows:i.rows,columns:i.columns})}updateBlind(e,i){i.stopPropagation();let s=structuredClone(this.config);s.blinds[e]={...s.blinds[e],...i.detail.value},this.emit(s)}moveBlind(e,i){let s=structuredClone(this.config),n=e+i;[s.blinds[e],s.blinds[n]]=[s.blinds[n],s.blinds[e]];for(let r of s.presets)[r.positions[e],r.positions[n]]=[r.positions[n],r.positions[e]];this.emit(s)}addBlind(){let e={...this.newBlind},i=structuredClone(this.config);i.blinds.push(e);for(let s of i.presets)s.positions.push({top:0,bottom:100});this.emit(i)&&(this.newBlind={width:1})}edit(e){this.error="",this.draftIndex=e,this.draft=structuredClone(this.config.presets[e])}addPreset(){this.draftIndex=this.config.presets.length,this.error="";let e=this.draftIndex+1;for(;this.config.presets.some(i=>i.id===`preset-${e}`);)e++;this.draft={id:`preset-${e}`,name:`Preset ${this.draftIndex+1}`,positions:this.config.blinds.map(()=>({top:0,bottom:100}))}}get draftProblem(){if(!this.draft)return"";try{let e=structuredClone(this.config);e.presets[this.draftIndex]=this.draft,Z(e)}catch(e){return e.message}return N(this.draft)}save(){if(!this.draft||this.draftProblem)return;let e=structuredClone(this.config);e.presets[this.draftIndex]=this.draft,this.emit(e)&&(this.draft=void 0)}removeItem(){if(!this.removing)return;let e=structuredClone(this.config),{kind:i,index:s}=this.removing;if(i==="blind"){e.blinds.splice(s,1);for(let n of e.presets)n.positions.splice(s,1)}else e.presets.splice(s,1);this.emit(e)&&(this.removing=void 0,this.draft=void 0)}movePreset(e,i){let s=structuredClone(this.config),n=e+i;[s.presets[e],s.presets[n]]=[s.presets[n],s.presets[e]],this.emit(s)}static{this.styles=m`
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
        </div>`;if(this.draft){let e=this.draftProblem;return l`<h3>Edit preset</h3>
        <ha-form
          .hass=${this.hass}
          .data=${{name:this.draft.name}}
          .schema=${[fe("name")]}
          .computeLabel=${this.label}
          @value-changed=${i=>{i.stopPropagation(),this.draft={...this.draft,name:i.detail.value.name}}}
        ></ha-form>
        <div data-preview>
          ${ut(this.config.blinds,this.draft.positions)}
        </div>
        <p>
          Absolute percentages down from the top. Sequential blinds require top
          0 or bottom 100. Saving changes this card only; it does not move
          blinds.
        </p>
        ${this.config.blinds.map((i,s)=>l`<h3>
                ${i.name||["Left","Middle","Right"][s]||`Blind ${s+1}`}
              </h3>
              <ha-form
                data-position=${s}
                .hass=${this.hass}
                .data=${this.draft.positions[s]}
                .schema=${[G("top",0,100),G("bottom",0,100)]}
                .computeLabel=${this.label}
                @value-changed=${n=>{n.stopPropagation();let r=structuredClone(this.draft);r.positions[s]={...r.positions[s],...n.detail.value},this.draft=r}}
              ></ha-form>`)}${e?l`<span role="status">${e}</span>`:d}
        <div class="actions">
          <button ?disabled=${!!e} @click=${()=>this.save()}>
            Save</button
          ><button @click=${()=>this.draft=void 0}>Cancel</button
          >${this.draftIndex<this.config.presets.length?l`<button @click=${()=>this.removing={kind:"preset",index:this.draftIndex}}>Remove preset</button>`:d}
        </div>`}return l`<ha-form
        data-grid
        .hass=${this.hass}
        .data=${{rows:this.config.rows,columns:this.config.columns}}
        .schema=${[G("rows",1,12),G("columns",1,12)]}
        .computeLabel=${this.label}
        @value-changed=${this.updateGrid}
      ></ha-form>
      <p>
        Remove extra presets explicitly before shrinking the grid. Narrow cards
        wrap columns to keep 44px touch targets.
      </p>
      <h3>Blinds (picture order)</h3>
      ${this.config.blinds.map((e,i)=>l`<section class="blind">
            <ha-form
              data-blind=${i}
              .hass=${this.hass}
              .data=${e}
              .schema=${ue}
              .computeLabel=${this.label}
              @value-changed=${s=>this.updateBlind(i,s)}
            ></ha-form>
            <div class="actions">
              <button
                aria-label=${`Move blind ${e.name||i+1} up`}
                ?disabled=${i===0}
                @click=${()=>this.moveBlind(i,-1)}
              >
                ↑</button
              ><button
                aria-label=${`Move blind ${e.name||i+1} down`}
                ?disabled=${i===this.config.blinds.length-1}
                @click=${()=>this.moveBlind(i,1)}
              >
                ↓</button
              ><button
                aria-label=${`Remove blind ${e.name||i+1}`}
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
        .schema=${ue}
        .computeLabel=${this.label}
        @value-changed=${e=>{e.stopPropagation(),this.newBlind={...this.newBlind,...e.detail.value}}}
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
        ${this.config.presets.map((e,i)=>l`<button class="tile" aria-label=${`Edit ${e.name}`} title=${N(e)} @click=${()=>this.edit(i)}>${ut(this.config.blinds,e.positions)}</button>`)}
      </div>
      ${this.config.presets.map((e,i)=>l`<div class="actions"><span>${e.name}</span><button aria-label=${`Move preset ${e.name} up`} ?disabled=${i===0} @click=${()=>this.movePreset(i,-1)}>↑</button><button aria-label=${`Move preset ${e.name} down`} ?disabled=${i===this.config.presets.length-1} @click=${()=>this.movePreset(i,1)}>↓</button></div>`)}<button
        ?disabled=${!this.config.blinds.length||this.config.presets.length>=this.config.rows*this.config.columns}
        @click=${()=>this.addPreset()}
      >
        Add preset</button
      >${this.error?l`<span role="status">${this.error}</span>`:d}`}};customElements.get("kiosk-blind-presets-editor")||customElements.define("kiosk-blind-presets-editor",pt)});function ut(o,t){let e=o.map(n=>n.width??1),i=e.reduce((n,r)=>n+r,0),s=8;return Pt`<svg viewBox="0 0 120 100" aria-hidden="true" focusable="false">${o.map((n,r)=>{let c=(104-4*(o.length-1))*e[r]/i,a=s;s+=c+4;let p=t[r]??{top:0,bottom:100};return Pt`<g><rect x=${a} y="12" width=${c} height="76" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><rect data-fabric x=${a} y=${12+Math.min(74,76*p.top/100)} width=${c} height=${Math.max(2,76*(p.bottom-p.top)/100)} rx="1" fill="currentColor"/></g>`})}</svg>`}function Z(o){if(!o||!Number.isInteger(o.rows)||o.rows<1||o.rows>12||!Number.isInteger(o.columns)||o.columns<1||o.columns>12)throw Error("Rows and columns must be integers from 1 to 12");if(!Array.isArray(o.blinds)||!o.blinds.length||o.blinds.length>12)throw Error("Choose 1\u201312 blinds");let t=new Set;for(let e of o.blinds){if(!e||typeof e.entity!="string"||!/^cover\.[a-z0-9_]+$/.test(e.entity)||t.has(e.entity))throw Error("Choose unique cover entities");if(t.add(e.entity),e.width!==void 0&&(typeof e.width!="number"||!Number.isFinite(e.width)||e.width<=0||e.width>10))throw Error("Blind widths must be greater than 0 and at most 10");if(e.mapping!==void 0&&e.mapping!=="sequential-tdbu")throw Error("Only sequential-tdbu mapping is supported")}if(!Array.isArray(o.presets)||o.presets.length>o.rows*o.columns)throw Error("Remove presets before shrinking the grid");t.clear();for(let e of o.presets){if(!e||typeof e.id!="string"||!e.id.trim()||t.has(e.id)||typeof e.name!="string"||!e.name.trim())throw Error("Presets need unique IDs and accessible names");if(t.add(e.id),!Array.isArray(e.positions)||e.positions.length!==o.blinds.length)throw Error("Each preset needs one position per blind");for(let i of e.positions)if(!i||![i.top,i.bottom].every(s=>typeof s=="number"&&Number.isFinite(s)&&s>=0&&s<=100)||i.top>i.bottom)throw Error("Coordinates must be 0\u2013100 with top \u2264 bottom")}}function N(o){return o.positions.some(t=>t.top!==0&&t.bottom!==100)?"Unsupported sequential TDBU position: top must be 0 or bottom must be 100.":""}function ft(o){return!!o&&!["unknown","unavailable"].includes(o.state)&&["current_position","current_tilt_position"].every(t=>typeof o.attributes[t]=="number"&&Number.isFinite(o.attributes[t])&&o.attributes[t]>=0&&o.attributes[t]<=100)}function Ht(o,t){return ft(o)&&!["opening","closing"].includes(o.state)&&Math.abs((o.attributes.current_position>0?0:o.attributes.current_tilt_position)-t.top)<=2&&Math.abs(100-o.attributes.current_position-t.bottom)<=2}var mt,It=x(()=>{"use strict";_();P();mt=class extends b{constructor(){super(...arguments);this.cardWidth=320;this.busy=!1;this.error="";this.operation=0;this.acknowledged=!1}static async getConfigElement(){return await Promise.resolve().then(()=>(ge(),me)),document.createElement("kiosk-blind-presets-editor")}static getStubConfig(e){let i=Object.keys(e?.states||{}).filter(s=>s.startsWith("cover.")).slice(0,3).map(s=>({entity:s,mapping:"sequential-tdbu",width:1}));return i.length||i.push({entity:"cover.example_blind",mapping:"sequential-tdbu",width:1}),{type:"custom:kiosk-blind-presets-card",rows:3,columns:3,blinds:i,presets:i.length?[{id:"closed",name:"Closed",positions:i.map(()=>({top:0,bottom:100}))}]:[]}}static{this.properties={hass:{attribute:!1},config:{state:!0},busy:{state:!0},error:{state:!0},cardWidth:{state:!0}}}connectedCallback(){super.connectedCallback(),this.resize=new ResizeObserver(e=>{this.cardWidth=e[0].contentRect.width}),this.resize.observe(this)}invalidate(){this.operation++,clearTimeout(this.watchdog),this.busy=!1,this.expected=void 0,this.acknowledged=!1}disconnectedCallback(){this.resize?.disconnect(),this.invalidate(),super.disconnectedCallback()}shouldUpdate(e){if(e.size!==1||!e.has("hass"))return!0;let i=e.get("hass");return!i||this.config.blinds.some(s=>i.states[s.entity]!==this.hass.states[s.entity])}willUpdate(){this.finishIfConfirmed()}finishIfConfirmed(){this.busy&&this.acknowledged&&this.expected&&this.config.blinds.every((e,i)=>Ht(this.hass.states[e.entity],this.expected.positions[i]))&&this.invalidate()}plan(e){if(Z(this.config),N(e))throw Error(N(e));return this.config.blinds.flatMap((i,s)=>{let n=this.hass.states[i.entity],r=e.positions[s];if(!ft(n))throw Error("Blind unavailable. Check device.");let c,a,p={entity_id:i.entity};if(r.top===0&&r.bottom===0?(c="open_cover",a=1):r.top===0&&r.bottom===100?(c="close_cover",a=2):r.bottom===100?(c="set_cover_tilt_position",a=128,p.tilt_position=r.top):(c="set_cover_position",a=4,p.position=100-r.bottom),!(Number(n.attributes.supported_features)&a))throw Error("Required blind capability is missing. Check device.");return Ht(n,r)?[]:[{service:c,data:p}]})}async activate(e,i){if(i.stopPropagation(),this.busy||i.detail>1||!this.isConnected||!this.config.presets.includes(e))return;let s;try{s=this.plan(e)}catch(r){this.error=r.message;return}if(this.error="",!s.length)return;let n=++this.operation;this.busy=!0,this.expected=e,this.acknowledged=!1,this.watchdog=setTimeout(()=>{this.operation===n&&(this.invalidate(),this.error="No confirmation. Check device.")},12e3);try{for(let r of s){if(this.operation!==n||!this.isConnected)return;if(!ft(this.hass.states[r.data.entity_id]))throw Error("Unavailable");await this.hass.callService("cover",r.service,r.data)}if(this.operation!==n)return;this.acknowledged=!0,this.finishIfConfirmed()}catch{this.operation===n&&(this.invalidate(),this.error="Action failed. Check device.")}}setConfig(e){Z(e),this.invalidate(),this.error="",this.config=structuredClone(e)}getCardSize(){if(!this.config)return 1;let e=this.getBoundingClientRect().width||this.cardWidth,i=Math.min(this.config.columns,Math.max(1,Math.floor((e-20)/56))),s=Math.ceil(this.config.rows*this.config.columns/i),n=Math.max(44,(e-32-(i-1)*12)/i/1.2133333);return Math.ceil((32+s*n+(s-1)*12)/50)}getGridOptions(){return{columns:12,rows:"auto",min_columns:3}}static{this.styles=[$,m`
      :host {
        min-width: 0;
        position: relative;
      }
      [part="feedback"] {
        position: static;
        display: block;
        padding: 0 16px 8px;
        color: var(--error-color, #db4437);
      }
      .matrix {
        display: grid;
        gap: 12px;
        padding: 16px;
        box-sizing: border-box;
        background: transparent;
      }
      .slot {
        aspect-ratio: 1.2133333;
      }
      button.tile {
        display: flex;
        align-items: center;
        justify-content: center;
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
        style=${`grid-template-columns:repeat(${Math.min(this.config.columns,Math.max(1,Math.floor((this.cardWidth-20)/56)))},minmax(44px,1fr))`}
      >
        ${this.config.presets.map(e=>{let i=N(e)||(this.config.blinds.every(n=>ft(this.hass.states[n.entity]))?"":"Blind unavailable"),s=!i&&this.config.blinds.every((n,r)=>Ht(this.hass.states[n.entity],e.positions[r]));return l`<button
            type="button"
            class=${`tile ${s?"active":""}`}
            aria-label=${e.name}
            title=${i}
            ?disabled=${!!i||this.busy}
            @click=${n=>this.activate(e,n)}
            @keydown=${n=>{n.repeat&&n.preventDefault()}}
            aria-pressed=${String(s)}
          >
            ${ut(this.config.blinds,e.positions)}
          </button>`})}${Array.from({length:this.config.rows*this.config.columns-this.config.presets.length},()=>l`<div class="slot" aria-hidden="true"></div>`)}
      </div>
      ${this.error?l`<span part="feedback" role="status">${this.error}</span>`:d}`}};customElements.get("kiosk-blind-presets-card")||customElements.define("kiosk-blind-presets-card",mt)});_();K();var se={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},oe=o=>(...t)=>({_$litDirective$:o,values:t}),lt=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var ne="important",He=" !"+ne,w=oe(class extends lt{constructor(o){if(super(o),o.type!==se.ATTRIBUTE||o.name!=="style"||o.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(o){return Object.keys(o).reduce((t,e)=>{let i=o[e];return i==null?t:t+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${i};`},"")}update(o,[t]){let{style:e}=o.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(let i of this.ft)t[i]==null&&(this.ft.delete(i),i.includes("-")?e.removeProperty(i):e[i]=null);for(let i in t){let s=t[i];if(s!=null){this.ft.add(i);let n=typeof s=="string"&&s.endsWith(He);i.includes("-")||n?e.setProperty(i,n?s.slice(0,-11):s,n?ne:""):e[i]=s}}return E}});P();Rt();_();var T=o=>({name:o,selector:{text:{}}}),v=(o,t={})=>({name:o,selector:{entity:t}}),dt=class extends b{constructor(){super(...arguments);this.label=e=>this.config.type==="custom:kiosk-pill-card"&&e.name==="background"?"Background":{aqhi_entity:"Local Canadian PM2.5 smoke index",regional_entity:"Regional Canadian AQHI (optional)",category_entity:"Canadian smoke risk category sensor",source_entity:"Source PM2.5 sensor",data_expected_entity:"History ready timestamp (optional)",stale_after_minutes:"Stale after (minutes; default 120)",location:"Location (optional)",entity:"Primary entity (body more-info target)",door_entity:"Door contact or cover (optional override)",lock_entity:"Linked lock",temperature_format:"Temperature number format",hvac_colors:"HVAC action colors (optional)",status_entity:"Status message sensor",status_active_entity:"Status active sensor",trend_entity:"Temperature trend sensor",name:"Name",icon:"Icon",area:"Area",navigation_path:"Navigation path",temperature_entity:"Temperature sensor",occupancy_entity:"Occupancy sensor",light_entities:"Lights (optional override)",var_large:"Large",show_name:"Show name",show_state:"Show state",show_icon:"Show icon",state_display:"State text (optional override)",detail:"Detail (optional override)",interactions:"Interactions",dynamic:"Declarative rules (advanced, optional)",presentation:"Presentation expressions",action_rules:"Conditional actions",appearance:"Appearance (optional)",icon_color:"Category color (CSS color)",background:"Off background",active_background:"Active background",radius:"Corner radius",tap_action:"Body tap",hold_action:"Body hold",double_tap_action:"Body double tap",icon_tap_action:"Icon tap",icon_hold_action:"Icon hold",icon_double_tap_action:"Icon double tap"}[e.name]||e.name}static{this.properties={hass:{attribute:!1},config:{state:!0}}}static{this.styles=m`
    :host {
      display: block;
    }
    p {
      color: var(--secondary-text-color);
      font-size: 14px;
    }
  `}setConfig(e){this.config={...e}}get schema(){if(this.config.type==="custom:kiosk-air-card")return[v("aqhi_entity",{filter:{domain:"sensor"}}),v("regional_entity",{filter:{domain:"sensor"}}),v("category_entity",{filter:{domain:"sensor"}}),v("source_entity",{filter:{domain:"sensor"}}),v("data_expected_entity",{filter:{domain:"sensor",device_class:"timestamp"}}),T("name"),T("location"),{name:"icon",selector:{icon:{}}},{name:"stale_after_minutes",selector:{number:{min:1,max:1440,mode:"box",unit_of_measurement:"min"}}},{name:"appearance",type:"expandable",schema:["icon_color","background","radius"].map(T)}];let i=this.config.type==="custom:kiosk-room-card",s=this.config.type==="custom:kiosk-action-card",n=this.config.type==="custom:kiosk-pill-card",r=this.config.type==="custom:kiosk-door-card",c=this.config.type==="custom:kiosk-climate-card",a=this.config.type==="custom:kiosk-status-card",p=i?[{name:"area",selector:{area:{}}},T("name"),{name:"icon",selector:{icon:{}}},T("navigation_path"),v("temperature_entity",{filter:{domain:"sensor",device_class:"temperature"}}),v("occupancy_entity",{filter:{domain:"binary_sensor"}}),v("light_entities",{multiple:!0,filter:{domain:"light"}})]:[v("entity",s?{filter:{domain:["script","scene","button"]}}:r?{filter:{domain:["binary_sensor","cover","lock"]}}:c?{filter:{domain:"climate"}}:{}),T("name"),{name:"icon",selector:{icon:{}},context:{icon_entity:"entity"}}],u=i?[]:[{name:"interactions",type:"expandable",flatten:!0,schema:["tap_action","hold_action","double_tap_action","icon_tap_action","icon_hold_action","icon_double_tap_action"].map(h=>({name:h,selector:{ui_action:{default_action:s?"none":h==="icon_tap_action"?!n&&["light","switch","input_boolean"].includes((this.config.entity||"").split(".")[0])?"toggle":"more-info":h.includes("double")?"none":"more-info"}},context:{entity:"entity"}}))}];return[...p,...r?[v("door_entity",{filter:{domain:["binary_sensor","cover"]}}),v("lock_entity",{filter:{domain:"lock"}})]:[],...c?[{name:"temperature_format",selector:{select:{options:["locale","legacy"]}}},{name:"hvac_colors",selector:{object:{}}}]:[],...a?[v("status_entity"),v("status_active_entity",{filter:{domain:"binary_sensor"}}),v("trend_entity",{filter:{domain:"sensor"}})]:[],...n?["show_name","show_state","show_icon"].map(h=>({name:h,selector:{boolean:{}}})):a?[]:[{name:"var_large",selector:{boolean:{}}}],...i?[]:[T(n?"state_display":"detail")],...u,...i?[]:[{name:"dynamic",type:"expandable",flatten:!0,schema:["presentation","action_rules"].map(h=>({name:h,selector:{object:{}}}))}],{name:"appearance",type:"expandable",schema:(n?["icon_color","background","radius"]:["icon_color","background","active_background","radius"]).map(T)}]}change(e){e.stopPropagation();let i=e.detail.value;this.config={...this.config,...i},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this.config},bubbles:!0,composed:!0}))}render(){return!this.config||!this.hass?d:l`<ha-form
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
      </p>`}};customElements.get("kiosk-card-editor")||customElements.define("kiosk-card-editor",dt);var Ne=new Set(["if","eq","ne","includes","in","and","or","not","defined","finite","number","round","gt","lt","concat","capitalize","map","countdown","minutes"]);function F(o,t=0){if(t>24)throw Error("Rule nesting exceeds 24");if(!(!o||typeof o!="object")){if(Array.isArray(o)){if(o.length>100)throw Error("Rule list too large");o.forEach(e=>F(e,t+1));return}if(o.op!==void 0){if(!Ne.has(o.op)||!Array.isArray(o.args)||o.args.length>100)throw Error("Unknown rule operation");o.args.forEach(e=>F(e,t+1))}else if(o.entity!==void 0||o.attribute!==void 0||o.state!==void 0||o.last_changed!==void 0){if(o.attribute&&["__proto__","constructor","prototype"].includes(o.attribute))throw Error("Unsafe attribute");if(o.entity!==void 0&&typeof o.entity!="string")throw Error("Rule entity must be a string")}else Object.values(o).forEach(e=>F(e,t+1))}}function ht(o,t,e,i=Date.now()){if(!o||typeof o!="object")return o;if(!o.op){if(o.entity!==void 0||o.attribute!==void 0||o.state!==void 0||o.last_changed!==void 0){let n=t?.states[o.entity||e.entity||""];return o.attribute!==void 0?n?.attributes[o.attribute]:o.last_changed?n?.last_changed:n?.state}return o}let s=n=>ht(o.args[n],t,e,i);switch(o.op){case"if":return s(0)?s(1):s(2);case"eq":return s(0)===s(1);case"ne":return s(0)!==s(1);case"includes":return typeof s(0)=="string"&&s(0).includes(s(1));case"in":return Array.isArray(s(1))&&s(1).includes(s(0));case"and":return o.args.every((n,r)=>!!s(r));case"or":return o.args.some((n,r)=>!!s(r));case"not":return!s(0);case"defined":return s(0)!==void 0;case"finite":return Number.isFinite(s(0));case"number":return Number(s(0));case"round":return Math.round(Number(s(0)));case"gt":return s(0)>s(1);case"lt":return s(0)<s(1);case"concat":return o.args.map((n,r)=>s(r)??"").join("");case"capitalize":{let n=String(s(0)??"");return n.charAt(0).toUpperCase()+n.slice(1)}case"map":{let n=s(1);return Object.hasOwn(n,String(s(0)))?n[String(s(0))]:n.default??s(2)}case"minutes":{let n=Date.parse(s(0));return Number.isFinite(n)?Math.max(0,Math.ceil((n-i)/6e4)):NaN}case"countdown":{let n=Date.parse(s(0));if(!Number.isFinite(n))return s(1)??"";let r=Math.max(0,Math.ceil((n-i)/6e4)),c=Math.floor(r/60);return c>0?`${c}h ${String(r%60).padStart(2,"0")}m left`:`${r}m left`}}}function le(o){return/"op":"(?:countdown|minutes)"/.test(JSON.stringify(o.presentation))}function de(o){F(o.presentation);for(let[t,e]of Object.entries(o.action_rules||{})){if(!/^(icon_)?(tap|hold|double_tap)_action$/.test(t)||!Array.isArray(e)||e.length>100)throw Error("Invalid action rules");for(let i of e)if(F(i.when),!i.action||typeof i.action.action!="string")throw Error("Rule requires action")}}var he=new Set(["light","switch","input_boolean"]);function pe(o,t,e){o.dispatchEvent(new CustomEvent(t,{detail:e,bubbles:!0,composed:!0}))}var Oe=new Set(["off","closed","idle","paused","standby","away","docked","unknown","unavailable","locked","disarmed"]),g=class extends b{constructor(){super(...arguments);this.busy=!1;this.confirming=!1;this.error="";this.operation=0;this.acknowledged=!1;this.held=!1}static{this.properties={hass:{attribute:!1},config:{state:!0},busy:{state:!0},error:{state:!0},confirming:{state:!0}}}connectedCallback(){super.connectedCallback(),this.startClock()}startClock(){clearInterval(this.clock),this.isConnected&&this.config&&le(this.config)&&(this.clock=setInterval(()=>this.requestUpdate(),3e4))}presentation(e){let i=this.config.presentation?.[e];return i===void 0?void 0:ht(i,this.hass,this.config)}resolvedAction(e,i){return this.config.action_rules?.[e]?.find(n=>ht(n.when,this.hass,this.config))?.action||i}action(e,i="tap"){let s=(e==="icon"?"icon_":"")+i+"_action";return this.resolvedAction(s,this.config[s]||{action:i==="tap"?e==="icon"&&this.available&&he.has((this.config.entity||"").split(".")[0])?"toggle":"more-info":i==="hold"?"more-info":"none"})}async runAction(e,i,s="tap"){i.stopPropagation();let n=this.action(e,s);if(n.action==="none"||this.busy||this.confirming)return;let r=this.config,c=n.confirmation;if(c&&!(typeof c=="object"&&c.exemptions?.some(k=>k.user===this.hass.user?.id))){let k=this.operation;this.confirming=!0;let A=await ce(this,typeof c=="object"?c:{});if(this.operation!==k||(this.confirming=!1,!A||!this.isConnected||this.config!==r))return}if(n.action==="more-info"){pe(this,"hass-more-info",{entityId:n.entity||this.config.entity});return}if(!["toggle","perform-action","call-service"].includes(n.action)){let{confirmation:k,...A}=n;pe(this,"hass-action",{config:{...this.config,tap_action:A},action:"tap"});return}if(!this.available)return;let a,p,u,h=n.target;if(n.action==="toggle"){if(a=(this.config.entity||"").split(".")[0],!he.has(a)){this.error="Choose an explicit action for this device.";return}this.expected=this.state?.state==="on"?"off":"on",p=this.expected==="on"?"turn_on":"turn_off",u={entity_id:this.config.entity}}else{if([a,p]=(n.perform_action||n.service||"").split("."),!a||!p){this.error="Choose an action.";return}u=n.data??n.service_data,this.expected=void 0}let f=++this.operation;this.busy=!0,this.error="",this.acknowledged=!1,this.watchdog=setTimeout(()=>{this.operation===f&&(this.operation++,this.busy=!1,this.error="No confirmation. Check device.")},12e3);try{if(await this.hass.callService(a,p,u,h),this.operation!==f)return;this.acknowledged=!0,this.finishIfConfirmed()}catch{this.operation===f&&(this.operation++,this.busy=!1,clearTimeout(this.watchdog),this.error="Action failed. Check device.")}}finishIfConfirmed(){this.busy&&this.acknowledged&&(!this.expected||this.state?.state===this.expected)&&(this.busy=!1,this.expected=void 0,clearTimeout(this.watchdog))}updated(){this.finishIfConfirmed()}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this.clock),clearTimeout(this.watchdog),clearTimeout(this.holdTimer),clearTimeout(this.tapTimer),this.operation++,this.busy=!1}pointerDown(e,i){i.stopPropagation(),i.button===0&&(this.held=!1,clearTimeout(this.holdTimer),this.holdTimer=setTimeout(()=>{this.held=!0,clearTimeout(this.tapTimer),this.runAction(e,i,"hold")},500))}pointerEnd(e){e.stopPropagation(),clearTimeout(this.holdTimer)}tap(e,i){if(i.stopPropagation(),this.held){this.held=!1;return}if(i.detail===0||this.action(e,"double_tap").action==="none"){this.runAction(e,i);return}i.detail>1?(clearTimeout(this.tapTimer),this.runAction(e,i,"double_tap")):this.tapTimer=setTimeout(()=>void this.runAction(e,i),300)}static async getConfigElement(){return window.loadCardHelpers&&await U(["ha-form"]),document.createElement("kiosk-card-editor")}static getStubConfig(e,i=[]){return{entity:i.find(s=>e.states[s])||Object.keys(e.states).find(s=>s.startsWith("light."))||Object.keys(e.states)[0]}}static{this.styles=$}applyConfig(e){de(e);let i=e.var_large??e.variables?.var_large;if(i!==void 0&&typeof i!="boolean")throw Error("var_large must be a boolean");clearTimeout(this.watchdog),clearTimeout(this.holdTimer),clearTimeout(this.tapTimer),this.operation++,this.busy=!1,this.confirming=!1,this.expected=void 0,this.error="",this.config={...e},this.startClock()}setConfig(e){if(!e.entity)throw new Error("Choose an entity");this.applyConfig(e)}getCardSize(){return this.large?3:1.38}getGridOptions(){return{columns:6,rows:"auto"}}get state(){return this.hass?.states[this.config?.entity||""]}get active(){return!!this.state&&(this.config.active_states?this.config.active_states.includes(this.state.state):!Oe.has(this.state.state))}get cardTitle(){return(this.presentation("name")??this.config.name)||this.state?.attributes.friendly_name||this.config.entity||"Entity"}get detail(){let e=this.presentation("detail");if(e!==void 0)return String(e);if(this.config.detail!==void 0)return this.config.detail;let i=this.state;if(!i)return"Unavailable";if(i.state==="on"&&i.entity_id.startsWith("light.")&&i.attributes.brightness)return`${Math.round(i.attributes.brightness/2.55)}%`;if(i.entity_id.startsWith("climate.")&&!["unknown","unavailable"].includes(i.state)){let n=i.attributes;if(n.target_temp_low!=null&&n.target_temp_high!=null)return`${n.target_temp_low}\xB0\u2013${n.target_temp_high}\xB0`;if(n.temperature!=null)return`${n.temperature}\xB0`;if(n.current_temperature!=null)return`${n.current_temperature}\xB0 (${i.state.charAt(0).toUpperCase()+i.state.slice(1)})`}let s=this.hass.formatEntityState?.(i)||i.state;return s.charAt(0).toUpperCase()+s.slice(1)}get available(){return!!this.state&&!["unknown","unavailable"].includes(this.state.state)}get isAction(){return!1}get large(){return(this.config.var_large??this.config.variables?.var_large)===!0}get cardIcon(){return this.presentation("icon")??this.config.icon}get surfaceStyles(){return{}}get iconContent(){return this.cardIcon?l`<ha-icon .icon=${this.cardIcon}></ha-icon>`:l`<ha-state-icon .hass=${this.hass} .stateObj=${this.state} .stateColor=${!1}></ha-state-icon>`}render(){if(!this.config||!this.hass)return d;let e=this.config.appearance;return l`<ha-card
      part="surface"
      aria-busy=${String(this.busy)}
      class=${[this.active?"active":"",this.available?"":"unavailable",this.isAction?"action":"",this.large?"large":""].join(" ")}
      style=${w({"--kiosk-icon-color":e?.icon_color,"--kiosk-default-icon-color":this.config.entity?.startsWith("light.")?"var(--accent-color,#3bc8ce)":void 0,"--kiosk-background":e?.background,"--kiosk-active-background":e?.active_background,"--kiosk-radius":e?.radius,...this.surfaceStyles})}
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
    >`}},V=class extends g{},Q=class extends g{static getStubConfig(t,e=[]){let s=[...e,...Object.keys(t.states)].find(n=>["script","scene","button"].includes(n.split(".")[0]));return s?{entity:s}:{name:"Action"}}setConfig(t){if(!t.entity&&!t.name)throw Error("Choose an entity or name");if(t.entity&&!["script","scene","button"].includes(t.entity.split(".")[0]))throw Error("Action entities must be scripts, scenes or buttons");this.applyConfig(t)}get isAction(){return!0}get cardIcon(){return(this.presentation("icon")??this.config.icon)||(this.state?void 0:"mdi:play")}get active(){return!0}get detail(){return this.config.detail||(this.available?"":"Unavailable")}get available(){return!this.config.entity||super.available}action(t,e="tap"){let i=(t==="icon"?"icon_":"")+e+"_action";return this.resolvedAction(i,this.config[i]||(t==="icon"&&e==="tap"?this.config.tap_action:void 0)||{action:"none"})}};It();P();var J=class extends g{static getStubConfig(){return{name:"Room",navigation_path:"/lovelace"}}setConfig(t){if(!t.area&&!t.name)throw Error("Choose an area or name");this.applyConfig(t)}get cardTitle(){return this.config.name||this.hass.areas?.[this.config.area||""]?.name||"Room"}get cardIcon(){return this.config.icon||this.hass.areas?.[this.config.area||""]?.icon||"mdi:home-outline"}get available(){return!0}get active(){return this.lights.some(t=>t.state==="on")||(this.config.occupancy_entity?this.hass.states[this.config.occupancy_entity]?.state==="on":this.roomStates.some(t=>t.entity_id.startsWith("binary_sensor.")&&["occupancy","presence","motion"].includes(t.attributes.device_class)&&t.state==="on"))}get roomStates(){return this.config.area?Object.values(this.hass.states).filter(t=>{let e=this.hass.entities?.[t.entity_id];return!e||e.hidden||e.hidden_by||e.disabled_by?!1:(e.area_id||this.hass.devices?.[e.device_id]?.area_id)===this.config.area}):[]}get lights(){return this.config.light_entities!==void 0?this.config.light_entities.map(t=>this.hass.states[t]||{entity_id:t,state:"unavailable",attributes:{}}):this.roomStates.filter(t=>t.entity_id.startsWith("light."))}get detail(){let t=this.roomStates,e=this.config.temperature_entity?this.hass.states[this.config.temperature_entity]||{entity_id:this.config.temperature_entity,state:"unavailable",attributes:{}}:t.find(r=>r.attributes.device_class==="temperature"),i=this.config.occupancy_entity?this.hass.states[this.config.occupancy_entity]||{entity_id:this.config.occupancy_entity,state:"unavailable",attributes:{}}:t.find(r=>r.entity_id.startsWith("binary_sensor.")&&["occupancy","presence","motion"].includes(r.attributes.device_class)),s=[];e&&s.push(["unknown","unavailable"].includes(e.state)?"Temperature unavailable":`${e.state}${e.attributes.unit_of_measurement?" "+e.attributes.unit_of_measurement:""}`),i&&s.push(i.state==="on"?"Occupied":i.state==="off"?"Clear":"Occupancy unavailable");let n=this.lights;if(n.length){let r=n.filter(a=>a.state==="on").length,c=n.filter(a=>["unknown","unavailable"].includes(a.state)).length;r?s.push(`${r} light${r===1?"":"s"} on`):c<n.length&&s.push("Lights off"),c&&s.push(`${c} unavailable`)}return s.join(" \xB7 ")}action(t,e="tap"){return e==="tap"&&this.config.navigation_path?{action:"navigate",navigation_path:this.config.navigation_path}:{action:"none"}}};_();P();var X=class extends g{static{this.styles=m`
    ${$}${Mt}
  `}setConfig(t){if(!t.entity)throw Error("Choose an entity");if(t.var_large??t.variables?.var_large)throw Error("Pills are compact; Large is not supported");for(let e of["show_name","show_state","show_icon"])if(t[e]!==void 0&&typeof t[e]!="boolean")throw Error(`${e} must be a boolean`);if(t.show_name===!1&&t.show_state===!1&&t.show_icon===!1)throw Error("Show at least one pill field");this.applyConfig(t)}get large(){return!1}get active(){return!1}getCardSize(){return 1}get detail(){let t=this.presentation("state_display");if(t!==void 0)return String(t);let e=this.state;if(this.config.state_display!==void 0)return this.config.state_display;let i=e?this.config.state_labels?.[e.state]??this.config.state_labels?.default:void 0;if(i!==void 0)return i;if(!e)return"Unavailable";let s=this.hass.formatEntityState?.(e)||e.state;return s.charAt(0).toUpperCase()+s.slice(1)}action(t,e="tap"){let i=(t==="icon"?"icon_":"")+e+"_action";return this.resolvedAction(i,this.config[i]||(t==="icon"?this.config[e+"_action"]:void 0)||{action:e==="double_tap"?"none":"more-info"})}disabled(t){return this.busy||this.confirming||!this.available&&["toggle","perform-action","call-service"].includes(this.action(t).action)}render(){if(!this.config||!this.hass)return d;let t=this.config.appearance,e=this.config.show_name!==!1,i=this.config.show_state!==!1;return l`<ha-card
      part="surface"
      aria-busy=${String(this.busy)}
      class=${`pill ${e?"":"no-name"} ${i?"":"no-state"} ${this.available?"":"unavailable"}`}
      style=${w({"--kiosk-background":t?.background,"--kiosk-icon-color":t?.icon_color,"--kiosk-radius":t?.radius})}
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
        ${e?l`<span part="title">${this.cardTitle}</span>`:d}${i?l`<span part="detail">${this.detail}</span>`:d}</button
      >${this.error?l`<span part="feedback" role="status">${this.error}</span>`:d}</ha-card
    >`}};_();var Y=class extends g{static{this.styles=m`${g.styles} .unavailable [part="icon-circle"] { opacity: 1; }`}static getStubConfig(t){return{entity:Object.keys(t?.states||{}).find(i=>["binary_sensor","cover","lock"].includes(i.split(".")[0]))||"binary_sensor.example_door"}}setConfig(t){if(!t.entity)throw Error("Choose a door or lock entity");if(!["binary_sensor","cover","lock"].includes(t.entity.split(".")[0]))throw Error("Choose a contact, cover or lock");if(t.lock_entity&&!t.lock_entity.startsWith("lock."))throw Error("Choose a lock entity");this.applyConfig(t)}get lockEntity(){return this.config.lock_entity||(this.config.entity?.startsWith("lock.")?this.config.entity:void 0)}get doorEntity(){return this.config.door_entity||(this.config.entity?.startsWith("lock.")?void 0:this.config.entity)}get lockState(){return this.hass?.states[this.lockEntity||""]}get doorState(){return this.hass?.states[this.doorEntity||""]?.state||"unknown"}get closed(){return["off","closed"].includes(this.doorState)}get open(){return["on","open"].includes(this.doorState)}get active(){return!(this.lockState?.state==="locked"&&this.closed)}get detail(){let t=this.presentation("detail")??this.config.detail;if(t!==void 0)return String(t);let e=this.open?"open":this.closed?"closed":this.doorState;return this.lockEntity?`${e} / ${this.lockState?.state||"unknown"}`:e}get cardIcon(){let t=super.cardIcon;if(t)return t;let e=this.lockState?.state;return e==="locked"&&this.closed?"mdi:door-closed-lock":e==="locked"&&this.open?"mdi:door-closed-cancel":e==="unlocked"&&this.closed?"mdi:lock-open":e==="unlocked"&&this.open?"mdi:door-open":this.lockState?.attributes.icon||"mdi:lock-question"}get surfaceStyles(){return{"--kiosk-glyph":this.active?"white":this.config.appearance?.icon_color||"#3bc8ce"}}action(t,e="tap"){let i=(t==="icon"?"icon_":"")+e+"_action";return this.resolvedAction(i,this.config[i]||{action:e==="double_tap"?"none":"more-info",...t==="icon"&&this.lockEntity?{entity:this.lockEntity}:{}})}};_();P();var tt=class extends g{static{this.styles=re}static getStubConfig(t){return{entity:Object.keys(t?.states||{}).find(e=>e.startsWith("climate."))||"climate.example"}}setConfig(t){if(!t.entity?.startsWith("climate."))throw Error("Choose a climate entity");this.applyConfig(t)}temperature(t){return this.config.temperature_format==="legacy"?String(t):typeof t!="number"||!Number.isFinite(t)?"\u2014":new Intl.NumberFormat(this.hass.locale?.language||"en",{maximumFractionDigits:2}).format(t)}get active(){return!!this.state&&!["off","idle","standby","away"].includes(this.state.state)}get detail(){let t=this.presentation("detail")??this.config.detail;if(t!==void 0)return String(t);let e=this.state;if(!e)return"Unavailable";let i=e.attributes,s=e.state,n=r=>this.temperature(r)+"\xB0";return s==="off"?"Off":s==="fan_only"?"Fan On":s==="heat"||s==="cool"?`${n(i.temperature)} / ${s} mode`:i.target_temp_low!==void 0&&i.target_temp_high!==void 0?`${n(i.target_temp_low)}\u2013${n(i.target_temp_high)}`:i.temperature!==null&&(i.temperature!==void 0||this.config.temperature_format==="legacy")?n(i.temperature):`${n(i.current_temperature)} (${s.charAt(0).toUpperCase()+s.slice(1)})`}get iconContent(){return l`<span part="temperature">${this.temperature(this.state?.attributes.current_temperature)}°</span>`}get surfaceStyles(){let t=this.config.hvac_colors;return{"--kiosk-temperature-color":t?.[this.state?.attributes.hvac_action]||t?.default||this.config.appearance?.icon_color||"var(--accent-color)","--kiosk-height":this.large?"145px":"68px"}}};_();P();var et=class extends g{static{this.styles=ae}static getStubConfig(t){return{entity:Object.keys(t?.states||{}).find(e=>e.startsWith("sensor.")&&t?.states[e].attributes.device_class==="temperature")||"sensor.example_temperature"}}get active(){return this.hass?.states[this.config.status_active_entity||""]?.state==="on"}get value(){let t=this.state?.state||"unavailable",e=parseFloat(t);return Number.isFinite(e)?e.toFixed(0):t}get message(){let t=this.hass?.states[this.config.status_entity||""]?.state;return t&&t!=="clear"?t:""}get trendColor(){let t=parseFloat(this.hass?.states[this.config.trend_entity||""]?.state||"");return Number.isFinite(t)?t>=3?"#ff1744":t>=1.5?"#ff6d00":t>=.5?"#ffd600":t<=-3?"#2962ff":t<=-1.5?"#00b0ff":t<=-.5?"#00e5ff":"white":"white"}render(){return!this.config||!this.hass?d:l`<ha-card part="surface" class=${this.active?"active":""} style=${w({"--kiosk-background":this.config.appearance?.background||"var(--ha-card-background,var(--card-background-color))","--kiosk-radius":this.config.appearance?.radius})}>
   <button part="body-target" aria-label=${this.cardTitle} @click=${t=>this.tap("body",t)} @pointerdown=${t=>this.pointerDown("body",t)} @pointerup=${this.pointerEnd} @pointercancel=${this.pointerEnd} @pointerleave=${this.pointerEnd}>
    ${this.active?l`<span part="status">${this.message}</span>`:l`<span part="pad" aria-hidden="true">°</span><span part="value">${this.value}</span><span part="degree" style=${w({color:this.trendColor})}>°</span>`}
   </button>
  </ha-card>`}};_();P();var it=[{key:"low",label:"Low risk",color:"var(--blue-color,#3188b5)",sentence:"Low particle levels around your home."},{key:"moderate",label:"Moderate risk",color:"var(--warning-color,#d1bb60)",sentence:"Moderate particle levels around your home."},{key:"high",label:"High risk",color:"var(--error-color,#c9706e)",sentence:"High particle levels around your home."},{key:"very_high",label:"Very high risk",color:"var(--deep-purple-color,#8c6373)",sentence:"Very high particle levels around your home."}],Ut=o=>o&&/^\d+(\.\d+)?$/.test(o.state)&&Number.isFinite(Number(o.state))?Number(o.state):NaN,y=(o,t)=>({label:o,sentence:t,index:-1,value:"\u2014",color:"var(--disabled-text-color,#888)"}),be=o=>o<=3?0:o<=6?1:o<=10?2:3,st=class extends g{static{this.styles=m`${$}
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

  `}connectedCallback(){super.connectedCallback(),this.freshnessClock=setInterval(()=>this.requestUpdate(),3e4)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this.freshnessClock)}static getStubConfig(){return{aqhi_entity:"sensor.example_smoke_index",category_entity:"sensor.example_smoke_category",source_entity:"sensor.example_pm25"}}setConfig(t){for(let e of["aqhi_entity","category_entity","source_entity"])if(typeof t[e]!="string"||!/^sensor\.[a-z0-9_]+$/.test(t[e]))throw Error(`Choose a sensor for ${e}`);for(let e of["data_expected_entity","regional_entity"])if(t[e]&&(typeof t[e]!="string"||!/^sensor\.[a-z0-9_]+$/.test(t[e])))throw Error(`Choose a sensor for ${e}`);if(t.stale_after_minutes!==void 0&&(!Number.isFinite(t.stale_after_minutes)||t.stale_after_minutes<1||t.stale_after_minutes>1440))throw Error("stale_after_minutes must be between 1 and 1440");this.applyConfig(t)}getCardSize(){return this.config?.regional_entity?7:4}getGridOptions(){return{columns:12,rows:"auto",min_columns:6}}moreInfo(t,e){t.stopPropagation(),this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:e},bubbles:!0,composed:!0}))}timestampFreshness(t,e=this.config.stale_after_minutes??120){let i=t.map(s=>{if(typeof s!="string"||!/^\d{4}-\d{2}-\d{2}T([01]\d|2[0-3]):[0-5]\d:[0-5]\d(\.\d+)?(Z|[+-]\d{2}:\d{2})$/.test(s))return NaN;let n=Date.parse(s);return Number.isFinite(n)&&new Date(s.slice(0,10)+"T00:00:00Z").toISOString().slice(0,10)===s.slice(0,10)?n:NaN});return i.some(s=>!Number.isFinite(s)||s>Date.now()+6e4)?"Unknown":i.some(s=>Date.now()-s>e*6e4)?"Stale":void 0}freshness(t){return this.timestampFreshness(t.map(e=>e?.last_reported??e?.last_updated))}get local(){let t=this.hass.states,e=t[this.config.aqhi_entity],i=t[this.config.source_entity],s=t[this.config.category_entity];if([e,i,s].some(f=>!f||f.state==="unavailable"))return y("Unavailable","The local air sensor is unavailable.");if(!Number.isFinite(Ut(i)))return y("Unknown","Waiting for a local particle reading.");let n=e.attributes;if(!(n.index_type==="canadian_aqhi_smoke_pm25"&&n.scope==="local_pm25_only_estimate")||n.source_entity!==this.config.source_entity)return y("Unknown","Choose a matching Canadian PM2.5 smoke estimate sensor.");let c=this.timestampFreshness([n.evaluated_at]);if(c)return y(c,"Waiting for a recent smoke calculation.");if(n.status==="source_stale")return y("Stale","Waiting for a recent particle reading.");if(n.status==="incomplete_history")return y("Warming up","Gathering enough particle history.");if(n.status==="history_unavailable")return y("Unavailable","Particle history is unavailable.");if(n.status!=="valid")return y("Unknown","Waiting for a valid particle reading.");let a=n.source_max_age_minutes;if(typeof a!="number"||!Number.isFinite(a)||a<=0)return y("Unknown","Waiting for source freshness metadata.");let p=this.timestampFreshness([n.source_last_reported],Math.min(a,this.config.stale_after_minutes??120));if(p)return y(p,"Waiting for a recent particle reading.");let u=Ut(e);if(!Number.isInteger(u)||u<1||u>11||!it.some(f=>f.key===s.state)){let f=Date.parse(t[this.config.data_expected_entity||""]?.state||"");return(e.state==="unknown"||s.state==="unknown")&&f>Date.now()?y("Warming up","Gathering enough particle history."):y("Unknown","Waiting for a calculated Canadian smoke index.")}let h=be(u);return it[h].key!==s.state?y("Updating","Waiting for matching Canadian smoke readings."):{...it[h],index:h,value:u===11?"10+":String(u)}}get regional(){let t=this.hass.states[this.config.regional_entity];if(!t||t.state==="unavailable")return y("Unavailable","Regional AQHI is unavailable.");let e=Ut(t),i=t.state==="10+";if(!i&&(!Number.isFinite(e)||e<0))return y("Unknown","Waiting for regional AQHI.");let s=this.freshness([t]);if(s)return y(s,"Waiting for recent regional AQHI.");let n=i?11:Math.max(1,Math.round(e)),r=be(n);return{...it[r],index:r,value:n>10?"10+":String(n)}}render(){if(!this.config||!this.hass)return d;let t=this.local,e=this.regional,i=this.hass.states[this.config.regional_entity];return l`<ha-card part="surface" style=${w({"--air-color":t.color,"--kiosk-background":this.config.appearance?.background,"--kiosk-radius":this.config.appearance?.radius,"--kiosk-icon-color":this.config.appearance?.icon_color})}>
      <div class="local-summary" role="button" tabindex="0" aria-label=${`${this.config.name||"Outside air"}: local Canadian smoke history`} aria-description="Local PM2.5-only Canadian smoke estimate, not full regional AQHI. Bands: low 1–3, moderate 4–6, high 7–10, very high 10+." title="Canadian PM2.5-only smoke estimate, not the full regional multi-pollutant AQHI." @click=${s=>this.moreInfo(s,this.config.aqhi_entity)} @keydown=${s=>{(s.key==="Enter"||s.key===" ")&&(s.preventDefault(),s.repeat||this.moreInfo(s,this.config.aqhi_entity))}}>
      <div class="identity"><span part="icon-circle" aria-hidden="true"><ha-icon .icon=${this.config.icon||"mdi:weather-windy"}></ha-icon></span><div><span part="title">${this.config.name||"Outside air"}</span>${this.config.location?l`<span part="detail">${this.config.location}</span>`:d}</div></div>
      <div role="status" aria-live="polite" aria-atomic="true"><div class="hero"><div part="aqhi">${t.value} <span class="unit">AQHI</span></div><span part="category">${t.label}</span></div><p part="interpretation">${t.sentence}</p></div>
      <div aria-hidden="true"><div class="rail">${it.map((s,n)=>l`<span part="segment" class=${t.index===n?"selected":""} style=${w({background:s.color})}></span>`)}</div><div class="labels"><span>Low · 1–3</span><span>Very high · 10+</span></div></div>
      </div>
      ${this.config.regional_entity?l`<section class="regional-section" aria-label="Regional Canadian AQHI"><div class="provenance">${i?.attributes.location||"Regional"} · Regional AQHI</div><div class="row"><div class="regional-reading" role="status" aria-live="polite" aria-atomic="true"><span part="regional-category">${e.label}</span><div part="regional-aqhi">${e.value} <span class="unit">AQHI</span></div></div><button aria-label="Details: regional AQHI history" @click=${s=>this.moreInfo(s,this.config.regional_entity)}>Details ↗</button></div>${i?.attributes.attribution?l`<div class="provenance">${i.attributes.attribution}</div>`:d}</section>`:d}
    </ha-card>`}};customElements.get("kiosk-door-card")||customElements.define("kiosk-door-card",Y);customElements.get("kiosk-climate-card")||customElements.define("kiosk-climate-card",tt);customElements.get("kiosk-status-card")||customElements.define("kiosk-status-card",et);customElements.get("kiosk-air-card")||customElements.define("kiosk-air-card",st);customElements.get("kiosk-entity-card")||customElements.define("kiosk-entity-card",V);customElements.get("kiosk-action-card")||customElements.define("kiosk-action-card",Q);customElements.get("kiosk-room-card")||customElements.define("kiosk-room-card",J);customElements.get("kiosk-pill-card")||customElements.define("kiosk-pill-card",X);var ye=window.customBadges||=[];ye.some(o=>o.type==="kiosk-pill-card")||ye.push({type:"kiosk-pill-card",name:"Kiosk pill",description:"Compact status capsule",preview:!0,documentationURL:"https://github.com/myevit/kiosk-cards"});var ve=window.customCards||=[];for(let[o,t,e]of[["kiosk-blind-presets-card","Kiosk blind presets","Picture-only composite sequential TDBU blind presets"],["kiosk-entity-card","Kiosk entity","State tile with isolated quick control"],["kiosk-action-card","Kiosk action","Explicit momentary action tile"],["kiosk-room-card","Kiosk room","Room summary and navigation"],["kiosk-door-card","Kiosk door","Independent door and linked lock observations"],["kiosk-climate-card","Kiosk climate","Current temperature and HVAC mode"],["kiosk-air-card","Kiosk air","Read-only Canadian smoke estimate and separate regional AQHI"],["kiosk-status-card","Kiosk status","Passive temperature and cross-entity status display"],["kiosk-pill-card","Kiosk pill","Compact status capsule for cards and native badges"]])ve.some(i=>i.type===o)||ve.push({type:o,name:t,description:e,preview:!0,documentationURL:"https://github.com/myevit/kiosk-cards"});export{Q as KioskActionCard,st as KioskAirCard,g as KioskBaseCard,mt as KioskBlindPresetsCard,dt as KioskCardEditor,tt as KioskClimateCard,Y as KioskDoorCard,V as KioskEntityCard,X as KioskPillCard,J as KioskRoomCard,et as KioskStatusCard,Ue as designTokens,$ as kioskStyles,Mt as pillStyles};
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
