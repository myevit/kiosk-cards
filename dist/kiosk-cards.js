var Se=Object.defineProperty;var $=(s,e)=>()=>(s&&(e=s(s=0)),e);var Pe=(s,e)=>{for(var t in e)Se(s,t,{get:e[t],enumerable:!0})};var st,ot,bt,zt,O,Dt,m,Lt,yt,vt=$(()=>{st=globalThis,ot=st.ShadowRoot&&(st.ShadyCSS===void 0||st.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,bt=Symbol(),zt=new WeakMap,O=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==bt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(ot&&e===void 0){let i=t!==void 0&&t.length===1;i&&(e=zt.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&zt.set(t,e))}return e}toString(){return this.cssText}},Dt=s=>new O(typeof s=="string"?s:s+"",void 0,bt),m=(s,...e)=>{let t=s.length===1?s[0]:e.reduce((i,n,o)=>i+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+s[o+1],s[0]);return new O(t,s,bt)},Lt=(s,e)=>{if(ot)s.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let i=document.createElement("style"),n=st.litNonce;n!==void 0&&i.setAttribute("nonce",n),i.textContent=t.cssText,s.appendChild(i)}},yt=ot?s=>s:s=>s instanceof CSSStyleSheet?(e=>{let t="";for(let i of e.cssRules)t+=i.cssText;return Dt(t)})(s):s});var Te,Be,Me,Ie,Re,Ne,rt,qt,He,Ue,j,_t,Ft,Wt,E,at=$(()=>{vt();vt();({is:Te,defineProperty:Be,getOwnPropertyDescriptor:Me,getOwnPropertyNames:Ie,getOwnPropertySymbols:Re,getPrototypeOf:Ne}=Object),rt=globalThis,qt=rt.trustedTypes,He=qt?qt.emptyScript:"",Ue=rt.reactiveElementPolyfillSupport,j=(s,e)=>s,_t={toAttribute(s,e){switch(e){case Boolean:s=s?He:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,e){let t=s;switch(e){case Boolean:t=s!==null;break;case Number:t=s===null?null:Number(s);break;case Object:case Array:try{t=JSON.parse(s)}catch{t=null}}return t}},Ft=(s,e)=>!Te(s,e),Wt={attribute:!0,type:String,converter:_t,reflect:!1,useDefault:!1,hasChanged:Ft};Symbol.metadata??=Symbol("metadata"),rt.litPropertyMetadata??=new WeakMap;E=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Wt){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let i=Symbol(),n=this.getPropertyDescriptor(e,i,t);n!==void 0&&Be(this.prototype,e,n)}}static getPropertyDescriptor(e,t,i){let{get:n,set:o}=Me(this.prototype,e)??{get(){return this[t]},set(r){this[t]=r}};return{get:n,set(r){let a=n?.call(this);o?.call(this,r),this.requestUpdate(e,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Wt}static _$Ei(){if(this.hasOwnProperty(j("elementProperties")))return;let e=Ne(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(j("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(j("properties"))){let t=this.properties,i=[...Ie(t),...Re(t)];for(let n of i)this.createProperty(n,t[n])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[i,n]of t)this.elementProperties.set(i,n)}this._$Eh=new Map;for(let[t,i]of this.elementProperties){let n=this._$Eu(t,i);n!==void 0&&this._$Eh.set(n,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let i=new Set(e.flat(1/0).reverse());for(let n of i)t.unshift(yt(n))}else e!==void 0&&t.push(yt(e));return t}static _$Eu(e,t){let i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Lt(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){let i=this.constructor.elementProperties.get(e),n=this.constructor._$Eu(e,i);if(n!==void 0&&i.reflect===!0){let o=(i.converter?.toAttribute!==void 0?i.converter:_t).toAttribute(t,i.type);this._$Em=e,o==null?this.removeAttribute(n):this.setAttribute(n,o),this._$Em=null}}_$AK(e,t){let i=this.constructor,n=i._$Eh.get(e);if(n!==void 0&&this._$Em!==n){let o=i.getPropertyOptions(n),r=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:_t;this._$Em=n;let a=r.fromAttribute(t,o.type);this[n]=a??this._$Ej?.get(n)??a,this._$Em=null}}requestUpdate(e,t,i,n=!1,o){if(e!==void 0){let r=this.constructor;if(n===!1&&(o=this[e]),i??=r.getPropertyOptions(e),!((i.hasChanged??Ft)(o,t)||i.useDefault&&i.reflect&&o===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:n,wrapped:o},r){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,r??t??this[e]),o!==!0||r!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),n===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[n,o]of this._$Ep)this[n]=o;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[n,o]of i){let{wrapped:r}=o,a=this[n];r!==!0||this._$AL.has(n)||a===void 0||this.C(n,void 0,o,a)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};E.elementStyles=[],E.shadowRootOptions={mode:"open"},E[j("elementProperties")]=new Map,E[j("finalized")]=new Map,Ue?.({ReactiveElement:E}),(rt.reactiveElementVersions??=[]).push("2.1.2")});function ie(s,e){if(!St(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return Vt!==void 0?Vt.createHTML(e):e}function N(s,e,t=s,i){if(e===A)return e;let n=i!==void 0?t._$Co?.[i]:t._$Cl,o=L(e)?void 0:e._$litDirective$;return n?.constructor!==o&&(n?._$AO?.(!1),o===void 0?n=void 0:(n=new o(s),n._$AT(s,t,i)),i!==void 0?(t._$Co??=[])[i]=n:t._$Cl=n),n!==void 0&&(e=N(s,n._$AS(s,e.values),n,i)),e}var At,Kt,ct,Vt,Yt,P,te,Oe,R,D,L,St,je,kt,z,Qt,Gt,M,Zt,Jt,ee,Pt,l,lt,ei,A,d,Xt,I,ze,q,$t,W,H,wt,xt,Ct,Et,De,ne,F=$(()=>{At=globalThis,Kt=s=>s,ct=At.trustedTypes,Vt=ct?ct.createPolicy("lit-html",{createHTML:s=>s}):void 0,Yt="$lit$",P=`lit$${Math.random().toFixed(9).slice(2)}$`,te="?"+P,Oe=`<${te}>`,R=document,D=()=>R.createComment(""),L=s=>s===null||typeof s!="object"&&typeof s!="function",St=Array.isArray,je=s=>St(s)||typeof s?.[Symbol.iterator]=="function",kt=`[ 	
\f\r]`,z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Qt=/-->/g,Gt=/>/g,M=RegExp(`>|${kt}(?:([^\\s"'>=/]+)(${kt}*=${kt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Zt=/'/g,Jt=/"/g,ee=/^(?:script|style|textarea|title)$/i,Pt=s=>(e,...t)=>({_$litType$:s,strings:e,values:t}),l=Pt(1),lt=Pt(2),ei=Pt(3),A=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),Xt=new WeakMap,I=R.createTreeWalker(R,129);ze=(s,e)=>{let t=s.length-1,i=[],n,o=e===2?"<svg>":e===3?"<math>":"",r=z;for(let a=0;a<t;a++){let c=s[a],p,u,h=-1,f=0;for(;f<c.length&&(r.lastIndex=f,u=r.exec(c),u!==null);)f=r.lastIndex,r===z?u[1]==="!--"?r=Qt:u[1]!==void 0?r=Gt:u[2]!==void 0?(ee.test(u[2])&&(n=RegExp("</"+u[2],"g")),r=M):u[3]!==void 0&&(r=M):r===M?u[0]===">"?(r=n??z,h=-1):u[1]===void 0?h=-2:(h=r.lastIndex-u[2].length,p=u[1],r=u[3]===void 0?M:u[3]==='"'?Jt:Zt):r===Jt||r===Zt?r=M:r===Qt||r===Gt?r=z:(r=M,n=void 0);let v=r===M&&s[a+1].startsWith("/>")?" ":"";o+=r===z?c+Oe:h>=0?(i.push(p),c.slice(0,h)+Yt+c.slice(h)+P+v):c+P+(h===-2?a:v)}return[ie(s,o+(s[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]},q=class s{constructor({strings:e,_$litType$:t},i){let n;this.parts=[];let o=0,r=0,a=e.length-1,c=this.parts,[p,u]=ze(e,t);if(this.el=s.createElement(p,i),I.currentNode=this.el.content,t===2||t===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(n=I.nextNode())!==null&&c.length<a;){if(n.nodeType===1){if(n.hasAttributes())for(let h of n.getAttributeNames())if(h.endsWith(Yt)){let f=u[r++],v=n.getAttribute(h).split(P),x=/([.?@])?(.*)/.exec(f);c.push({type:1,index:o,name:x[2],strings:v,ctor:x[1]==="."?wt:x[1]==="?"?xt:x[1]==="@"?Ct:H}),n.removeAttribute(h)}else h.startsWith(P)&&(c.push({type:6,index:o}),n.removeAttribute(h));if(ee.test(n.tagName)){let h=n.textContent.split(P),f=h.length-1;if(f>0){n.textContent=ct?ct.emptyScript:"";for(let v=0;v<f;v++)n.append(h[v],D()),I.nextNode(),c.push({type:2,index:++o});n.append(h[f],D())}}}else if(n.nodeType===8)if(n.data===te)c.push({type:2,index:o});else{let h=-1;for(;(h=n.data.indexOf(P,h+1))!==-1;)c.push({type:7,index:o}),h+=P.length-1}o++}}static createElement(e,t){let i=R.createElement("template");return i.innerHTML=e,i}};$t=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:i}=this._$AD,n=(e?.creationScope??R).importNode(t,!0);I.currentNode=n;let o=I.nextNode(),r=0,a=0,c=i[0];for(;c!==void 0;){if(r===c.index){let p;c.type===2?p=new W(o,o.nextSibling,this,e):c.type===1?p=new c.ctor(o,c.name,c.strings,this,e):c.type===6&&(p=new Et(o,this,e)),this._$AV.push(p),c=i[++a]}r!==c?.index&&(o=I.nextNode(),r++)}return I.currentNode=R,n}p(e){let t=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}},W=class s{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,n){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=N(this,e,t),L(e)?e===d||e==null||e===""?(this._$AH!==d&&this._$AR(),this._$AH=d):e!==this._$AH&&e!==A&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):je(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==d&&L(this._$AH)?this._$AA.nextSibling.data=e:this.T(R.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:i}=e,n=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=q.createElement(ie(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===n)this._$AH.p(t);else{let o=new $t(n,this),r=o.u(this.options);o.p(t),this.T(r),this._$AH=o}}_$AC(e){let t=Xt.get(e.strings);return t===void 0&&Xt.set(e.strings,t=new q(e)),t}k(e){St(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,i,n=0;for(let o of e)n===t.length?t.push(i=new s(this.O(D()),this.O(D()),this,this.options)):i=t[n],i._$AI(o),n++;n<t.length&&(this._$AR(i&&i._$AB.nextSibling,n),t.length=n)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let i=Kt(e).nextSibling;Kt(e).remove(),e=i}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},H=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,n,o){this.type=1,this._$AH=d,this._$AN=void 0,this.element=e,this.name=t,this._$AM=n,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=d}_$AI(e,t=this,i,n){let o=this.strings,r=!1;if(o===void 0)e=N(this,e,t,0),r=!L(e)||e!==this._$AH&&e!==A,r&&(this._$AH=e);else{let a=e,c,p;for(e=o[0],c=0;c<o.length-1;c++)p=N(this,a[i+c],t,c),p===A&&(p=this._$AH[c]),r||=!L(p)||p!==this._$AH[c],p===d?e=d:e!==d&&(e+=(p??"")+o[c+1]),this._$AH[c]=p}r&&!n&&this.j(e)}j(e){e===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},wt=class extends H{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===d?void 0:e}},xt=class extends H{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==d)}},Ct=class extends H{constructor(e,t,i,n,o){super(e,t,i,n,o),this.type=5}_$AI(e,t=this){if((e=N(this,e,t,0)??d)===A)return;let i=this._$AH,n=e===d&&i!==d||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,o=e!==d&&(i===d||n);n&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Et=class{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){N(this,e)}},De=At.litHtmlPolyfillSupport;De?.(q,W),(At.litHtmlVersions??=[]).push("3.3.3");ne=(s,e,t)=>{let i=t?.renderBefore??e,n=i._$litPart$;if(n===void 0){let o=t?.renderBefore??null;i._$litPart$=n=new W(e.insertBefore(D(),o),o,void 0,t??{})}return n._$AI(s),n}});var Tt,b,Le,se=$(()=>{at();at();F();F();Tt=globalThis,b=class extends E{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=ne(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return A}};b._$litElement$=!0,b.finalized=!0,Tt.litElementHydrateSupport?.({LitElement:b});Le=Tt.litElementPolyfillSupport;Le?.({LitElement:b});(Tt.litElementVersions??=[]).push("4.2.2")});var oe=$(()=>{});var k=$(()=>{at();F();se();oe()});var w,Bt,le,de,We,T=$(()=>{"use strict";k();w=m`
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
`,Bt=m`
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
`,le=m`${w}
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
`,de=m`${w}
 :host { height:100%; }
 [part="surface"] { height:100%; padding:16px; border:none; }
 [part="body-target"] { display:flex; flex-direction:row; min-height:0; align-items:center; justify-content:center; text-align:center; width:100%; }
 [part="value"], [part="degree"], [part="pad"] { font-size:112px; font-weight:700; line-height:1; color:white; }
 [part="pad"] { visibility:hidden; }
 [part="status"] { width:100%; font-size:20px; font-weight:var(--ha-font-weight-normal,400); line-height:1.35; color:white; white-space:normal; }
 .active [part="status"] { color:black; }
`,We=Object.freeze({height:69,actionHeight:68,largeHeight:146,pillHeight:35,pillRadius:18,pillIconSize:24,iconDiameter:45,glyphSize:25,titleSize:17,detailSize:15,categoryColor:"#3bc8ce"})});async function U(s=["ha-dialog","ha-button","ha-dialog-footer","ha-form"]){if(s.every(i=>customElements.get(i)))return;let e=await window.loadCardHelpers?.();if(!e||(await(await e.createCardElement({type:"entities",entities:[]})).constructor.getConfigElement?.(),!s.every(i=>customElements.get(i))))throw Error("Home Assistant controls are unavailable")}function pe(s,e){return new Promise(t=>{let i=!1,n=o=>{i||(i=!0,t(o))};s.dispatchEvent(new CustomEvent("show-dialog",{bubbles:!0,composed:!0,detail:{dialogTag:"kiosk-confirmation-dialog",dialogImport:()=>U().catch(o=>{throw n(!1),o}),dialogParams:{...e,confirm:()=>n(!0),cancel:()=>n(!1)}}}))})}var Mt,It=$(()=>{"use strict";k();Mt=class extends b{constructor(){super(...arguments);this.open=!1}static{this.properties={open:{state:!0},params:{state:!0}}}async showDialog(t){await U(),this.params=t,this.open=!0,await this.updateComplete}closeDialog(){return this.finish(!1),!0}finish(t){this.open&&(this.open=!1,(t?this.params.confirm:this.params.cancel)(),this.dispatchEvent(new CustomEvent("dialog-closed",{bubbles:!0,composed:!0,detail:{dialog:this.localName}})))}render(){return this.params?l`<ha-dialog
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
    >`:d}};customElements.get("kiosk-confirmation-dialog")||customElements.define("kiosk-confirmation-dialog",Mt)});function be(s,e){if(!Array.isArray(s)||!s.length||s.length>e.length)throw Error("Choose at least one native command, at most one per configured blind");let t=new Set;for(let i of s){if(!ge(i)||!Ve.includes(i.service)||!e.includes(i.entity_id)||t.has(i.entity_id))throw Error("Only unique configured covers and supported native services are allowed");let n=i.service==="set_cover_position"?"position":i.service==="set_cover_tilt_position"?"tilt_position":void 0;if(!Qe(i,["service","entity_id",...n?[n]:[]])||n&&(typeof i[n]!="number"||!Number.isFinite(i[n])||i[n]<0||i[n]>100))throw Error("Native values must be literal numbers 0\u2013100; extra fields are not allowed");t.add(i.entity_id)}return structuredClone(s)}function Rt(s,e){let i=e.service==="set_cover_tilt_position"?"current_tilt_position":"current_position",n={open_cover:1,close_cover:2,set_cover_position:4,set_cover_tilt_position:128}[e.service],o=s?.attributes.supported_features,r=s?.attributes[i];return!!s&&["open","closed","opening","closing"].includes(s.state)&&typeof o=="number"&&Number.isInteger(o)&&(o&n)!==0&&typeof r=="number"&&Number.isFinite(r)&&r>=0&&r<=100}function ye(s,e){if(!Rt(s,e)||!["open","closed"].includes(s.state)||e.service==="close_cover"&&s.state!=="closed"||e.service==="set_cover_position"&&e.position===0&&!(typeof s.attributes.current_tilt_position=="number"&&Math.abs(s.attributes.current_tilt_position-100)<=2)||e.service==="set_cover_tilt_position"&&e.tilt_position===100&&!(typeof s.attributes.current_position=="number"&&Math.abs(s.attributes.current_position)<=2))return!1;let t=e.service==="open_cover"?100:e.service==="close_cover"?0:e.service==="set_cover_position"?e.position:e.tilt_position;return Math.abs(s.attributes[e.service==="set_cover_tilt_position"?"current_tilt_position":"current_position"]-t)<=2}var Ve,ge,Qe,ve=$(()=>{"use strict";Ve=["open_cover","close_cover","set_cover_position","set_cover_tilt_position"],ge=s=>s&&typeof s=="object"&&!Array.isArray(s),Qe=(s,e)=>ge(s)&&Object.keys(s).every(t=>e.includes(t))});var $e={};Pe($e,{KioskBlindPresetsEditor:()=>ut});var G,ke,_e,ut,we=$(()=>{"use strict";k();It();Nt();G=(s,e,t,i=1)=>({name:s,selector:{number:{min:e,max:t,step:i,mode:"box"}}}),ke=s=>({name:s,selector:{text:{}}}),_e=[{name:"entity",required:!0,selector:{entity:{filter:{domain:"cover"}}}},ke("name"),G("width",.1,10,.1),{name:"mapping",selector:{select:{mode:"dropdown",options:[{value:"sequential-tdbu",label:"Sequential TDBU (default)"},{value:"independent-tdbu",label:"Independent top and bottom rails"}]}}}],ut=class extends b{constructor(){super(...arguments);this.draftIndex=-1;this.newBlind={width:1};this.error="";this.label=t=>({rows:"Grid rows",columns:"Grid columns",entity:"Cover entity",name:"Accessible name",width:"Relative picture width",mapping:"Rail mapping",top:"Top (% down)",bottom:"Bottom (% down)",ignored:"Ignore this shade"})[t.name]||t.name}static{this.properties={hass:{attribute:!1},config:{state:!0},draft:{state:!0},newBlind:{state:!0},error:{state:!0},removing:{state:!0}}}connectedCallback(){super.connectedCallback(),U(["ha-form"]).catch(()=>{this.error="Home Assistant native form controls could not load. Reopen the editor."})}setConfig(t){this.config=structuredClone(t),this.draft=void 0,this.removing=void 0,this.error=""}emit(t){try{Z(t)}catch(i){return this.error=i.message,!1}return this.config=t,this.error="",this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:structuredClone(t)},bubbles:!0,composed:!0})),!0}updateGrid(t){t.stopPropagation();let i=t.detail.value;this.emit({...this.config,rows:i.rows,columns:i.columns})}updateBlind(t,i){i.stopPropagation();let n=structuredClone(this.config);n.blinds[t]={...n.blinds[t],...i.detail.value},this.emit(n)}moveBlind(t,i){let n=structuredClone(this.config),o=t+i;[n.blinds[t],n.blinds[o]]=[n.blinds[o],n.blinds[t]];for(let r of n.presets)[r.positions[t],r.positions[o]]=[r.positions[o],r.positions[t]];this.emit(n)}addBlind(){let t={...this.newBlind},i=structuredClone(this.config);i.blinds.push(t);for(let n of i.presets)n.positions.push({top:0,bottom:100});this.emit(i)&&(this.newBlind={width:1})}edit(t){this.error="",this.draftIndex=t,this.draft=structuredClone(this.config.presets[t])}addPreset(){this.draftIndex=this.config.presets.length,this.error="";let t=this.draftIndex+1;for(;this.config.presets.some(i=>i.id===`preset-${t}`);)t++;this.draft={id:`preset-${t}`,name:`Preset ${this.draftIndex+1}`,positions:this.config.blinds.map(()=>({top:0,bottom:100}))}}get draftProblem(){if(!this.draft)return"";try{let t=structuredClone(this.config);t.presets[this.draftIndex]=this.draft,Z(t)}catch(t){return t.message}return S(this.draft,this.config.blinds)}save(){if(!this.draft||this.draftProblem)return;let t=structuredClone(this.config);t.presets[this.draftIndex]=this.draft,this.emit(t)&&(this.draft=void 0)}removeItem(){if(!this.removing)return;let t=structuredClone(this.config),{kind:i,index:n}=this.removing;if(i==="blind"){t.blinds.splice(n,1);for(let o of t.presets)o.positions.splice(n,1)}else t.presets.splice(n,1);this.emit(t)&&(this.removing=void 0,this.draft=void 0)}movePreset(t,i){let n=structuredClone(this.config),o=t+i;[n.presets[t],n.presets[o]]=[n.presets[o],n.presets[t]],this.emit(n)}static{this.styles=m`
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
        </div>`;if(this.draft){let t=this.draftProblem;return l`<h3>Edit preset</h3>
        <ha-form
          .hass=${this.hass}
          .data=${{name:this.draft.name}}
          .schema=${[ke("name")]}
          .computeLabel=${this.label}
          @value-changed=${i=>{i.stopPropagation(),this.draft={...this.draft,name:i.detail.value.name}}}
        ></ha-form>
        <div data-preview>
          ${ft(this.config.blinds,this.draft.positions)}
        </div>
        <p>
          Pictures are absolute rail targets, in percentages down from the top.
          Each blind uses its configured rail mapping. Sequential blinds require
          top 0 or bottom 100; independent blinds support middle bands.
          Saving never moves blinds.
        </p>
        ${this.config.blinds.map((i,n)=>l`<h3>
                ${i.name||["Left","Middle","Right"][n]||`Blind ${n+1}`}
              </h3>
              <ha-form
                data-ignore=${n}
                .hass=${this.hass}
                .data=${{ignored:this.draft.positions[n].ignored??!1}}
                .schema=${[{name:"ignored",selector:{boolean:{}}}]}
                .computeLabel=${this.label}
                @value-changed=${o=>{o.stopPropagation();let r=structuredClone(this.draft);r.positions[n]={...r.positions[n],ignored:o.detail.value.ignored},this.draft=r}}
              ></ha-form>
              <ha-form
                data-position=${n}
                .hass=${this.hass}
                .data=${this.draft.positions[n]}
                .schema=${[G("top",0,100),G("bottom",0,100)]}
                .computeLabel=${this.label}
                @value-changed=${o=>{o.stopPropagation();let r=structuredClone(this.draft);r.positions[n]={...r.positions[n],...o.detail.value},this.draft=r}}
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
        .schema=${[G("rows",1,12),G("columns",1,12)]}
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
              .data=${{...t,mapping:t.mapping??"sequential-tdbu"}}
              .schema=${_e}
              .computeLabel=${this.label}
              @value-changed=${n=>this.updateBlind(i,n)}
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
        ${this.config.presets.map((t,i)=>l`<button class="tile" aria-label=${`Edit ${t.name}`} title=${S(t,this.config.blinds)} @click=${()=>this.edit(i)}>${ft(this.config.blinds,t.positions)}</button>`)}
      </div>
      ${this.config.presets.map((t,i)=>l`<div class="actions"><span>${t.name}</span><button aria-label=${`Move preset ${t.name} up`} ?disabled=${i===0} @click=${()=>this.movePreset(i,-1)}>↑</button><button aria-label=${`Move preset ${t.name} down`} ?disabled=${i===this.config.presets.length-1} @click=${()=>this.movePreset(i,1)}>↓</button></div>`)}<button
        ?disabled=${!this.config.blinds.length||this.config.presets.length>=this.config.rows*this.config.columns}
        @click=${()=>this.addPreset()}
      >
        Add preset</button
      >${this.error?l`<span role="status">${this.error}</span>`:d}`}};customElements.get("kiosk-blind-presets-editor")||customElements.define("kiosk-blind-presets-editor",ut)});function ft(s,e){let t=s.map(o=>o.width??1),i=t.reduce((o,r)=>o+r,0),n=8;return lt`<svg viewBox="0 0 120 100" aria-hidden="true" focusable="false">${s.map((o,r)=>{let a=(104-4*(s.length-1))*t[r]/i,c=n;n+=a+4;let p=e[r]??{top:0,bottom:100};return p.ignored?lt`<g data-ignored opacity="0.35"><rect x=${c} y="12" width=${a} height="76" rx="1" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 3"/></g>`:lt`<g><rect x=${c} y="12" width=${a} height="76" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><rect data-fabric x=${c} y=${12+Math.min(74,76*p.top/100)} width=${a} height=${Math.max(2,76*(p.bottom-p.top)/100)} rx="1" fill="currentColor"/></g>`})}</svg>`}function Z(s){if(!s||!Number.isInteger(s.rows)||s.rows<1||s.rows>12||!Number.isInteger(s.columns)||s.columns<1||s.columns>12)throw Error("Rows and columns must be integers from 1 to 12");if(!Array.isArray(s.blinds)||!s.blinds.length||s.blinds.length>12)throw Error("Choose 1\u201312 blinds");let e=new Set;for(let t of s.blinds){if(!t||typeof t.entity!="string"||!/^cover\.[a-z0-9_]+$/.test(t.entity)||e.has(t.entity))throw Error("Choose unique cover entities");if(e.add(t.entity),t.width!==void 0&&(typeof t.width!="number"||!Number.isFinite(t.width)||t.width<=0||t.width>10))throw Error("Blind widths must be greater than 0 and at most 10");if(t.mapping!==void 0&&!["sequential-tdbu","independent-tdbu"].includes(t.mapping))throw Error("Choose sequential-tdbu or independent-tdbu mapping")}if(!Array.isArray(s.presets)||s.presets.length>s.rows*s.columns)throw Error("Remove presets before shrinking the grid");e.clear();for(let t of s.presets){if(!t||typeof t.id!="string"||!t.id.trim()||e.has(t.id)||typeof t.name!="string"||!t.name.trim())throw Error("Presets need unique IDs and accessible names");if(e.add(t.id),t.commands!==void 0&&t.actions!==void 0)throw Error("Use commands or actions, not both");if((t.commands!==void 0||t.actions!==void 0)&&be(t.commands??t.actions,s.blinds.map(i=>i.entity)),!Array.isArray(t.positions)||t.positions.length!==s.blinds.length)throw Error("Each preset needs one position per blind");for(let i of t.positions){if(i&&i.ignored!==void 0&&typeof i.ignored!="boolean")throw Error("Ignored must be a boolean");if(!i||![i.top,i.bottom].every(n=>typeof n=="number"&&Number.isFinite(n)&&n>=0&&n<=100)||i.top>i.bottom)throw Error("Coordinates must be 0\u2013100 with top \u2264 bottom")}}}function mt(s,e){return(s.commands??s.actions)?.filter(i=>!e||!s.positions[e.findIndex(n=>n.entity===i.entity_id)]?.ignored)}function S(s,e){return s.positions.some(t=>!t.ignored)?s.commands!==void 0||s.actions!==void 0?mt(s,e)?.length?"":"Include at least one native command":s.positions.some((t,i)=>!t.ignored&&e?.[i]?.mapping!=="independent-tdbu"&&t.top!==0&&t.bottom!==100)?"Unsupported sequential TDBU position: top must be 0 or bottom must be 100.":"":"Include at least one shade"}function Ut(s){return!!s&&!["unknown","unavailable"].includes(s.state)&&["current_position","current_tilt_position"].every(e=>typeof s.attributes[e]=="number"&&Number.isFinite(s.attributes[e])&&s.attributes[e]>=0&&s.attributes[e]<=100)}function Ht(s,e){let t=s?.attributes[e?"rail_top":"rail_bottom"];return typeof t=="number"&&Number.isFinite(t)&&t>=0&&t<=100?t:void 0}function Ot(s,e){if(!s||!["open","closed"].includes(s.state))return!1;let t=r=>{let a=s.attributes[r?"motion_top":"motion_bottom"];return a!==void 0&&a!=="STOP"};if(e.service==="open_cover"||e.service==="close_cover"){let r=Ht(s,!0),a=Ht(s,!1);return s.attributes.rails_known!==!1&&r!==void 0&&a!==void 0&&!t(!0)&&!t(!1)&&Math.abs(r)<=2&&Math.abs(a-(e.service==="open_cover"?0:100))<=2&&(e.service!=="close_cover"||s.state==="closed")}let i=e.service==="set_cover_tilt_position",n=Ht(s,i);if(n===void 0||t(i))return!1;let o=i?e.tilt_position:e.position;return Math.abs((i?n:100-n)-o)<=2}function Ge(s,e,t){if(!e||!["open","closed","opening","closing","unknown"].includes(e.state))throw Error("Independent blind unavailable");let i=e.attributes.supported_features;if(typeof i!="number"||!Number.isInteger(i)||(i&132)!==132)throw Error("Required independent capability unavailable");return[{service:"set_cover_tilt_position",data:{entity_id:s.entity,tilt_position:t.top}},{service:"set_cover_position",data:{entity_id:s.entity,position:100-t.bottom}}]}function xe(s,e,t){return t?.mapping==="independent-tdbu"?s?.attributes.rails_known!==!1&&Ot(s,{service:"set_cover_tilt_position",entity_id:t.entity,tilt_position:e.top})&&Ot(s,{service:"set_cover_position",entity_id:t.entity,position:100-e.bottom}):Ut(s)&&!["opening","closing"].includes(s.state)&&Math.abs((s.attributes.current_position>0?0:s.attributes.current_tilt_position)-e.top)<=2&&Math.abs(100-s.attributes.current_position-e.bottom)<=2}var gt,Nt=$(()=>{"use strict";k();T();ve();gt=class extends b{constructor(){super(...arguments);this.cardWidth=320;this.busy=!1;this.error="";this.operation=0;this.publishCancels=new Set;this.transports=new Map}static async getConfigElement(){return await Promise.resolve().then(()=>(we(),$e)),document.createElement("kiosk-blind-presets-editor")}static getStubConfig(t){let i=Object.keys(t?.states||{}).filter(n=>n.startsWith("cover.")).slice(0,3).map(n=>({entity:n,mapping:"sequential-tdbu",width:1}));return i.length||i.push({entity:"cover.example_blind",mapping:"sequential-tdbu",width:1}),{type:"custom:kiosk-blind-presets-card",rows:3,columns:3,blinds:i,presets:i.length?[{id:"closed",name:"Closed",positions:i.map(()=>({top:0,bottom:100}))}]:[]}}static{this.properties={hass:{attribute:!1},config:{state:!0},busy:{state:!0},error:{state:!0},cardWidth:{state:!0}}}connectedCallback(){super.connectedCallback(),this.resize=new ResizeObserver(t=>{this.cardWidth=t[0].contentRect.width}),this.resize.observe(this)}async publishRail(t,i,n){let o=t.data.entity_id;for(;this.transports.has(o);)if(await Promise.race([this.transports.get(o),n]),!i())return!1;if(!i())return!1;let r=Promise.resolve().then(()=>{if(i()){if(!this.commandAvailable({service:t.service,...t.data}))throw Error("Unavailable");return this.hass.callService("cover",t.service,t.data)}}),a=r.catch(()=>{});return this.transports.set(o,a),a.then(()=>{this.transports.get(o)===a&&(this.transports.delete(o),this.requestUpdate())}),await r,i()}async runPlan(t,i,n){let r=!(t.commands||t.actions)&&this.config.blinds.some(a=>a.mapping==="independent-tdbu")?[...new Set(i.map(a=>a.data.entity_id))].map(a=>i.filter(c=>c.data.entity_id===a)):[i];await Promise.allSettled(r.map(async a=>{try{for(let c of a){let p=!0,u,h=()=>p&&this.operation===n&&this.isConnected,f=new Promise(x=>{u=()=>{p=!1,x(!1)}});this.publishCancels.add(u);let v=setTimeout(()=>{h()&&(this.error="Publish timed out. Check device."),u()},12e4);try{if(!await Promise.race([f,this.publishRail(c,h,f)]))return}finally{clearTimeout(v),this.publishCancels.delete(u),u()}}}catch{this.operation===n&&(this.error="Action failed. Check device.")}})),this.operation===n&&(this.busy=!1)}invalidate(){for(let t of this.publishCancels)t();this.publishCancels.clear(),this.operation++,this.busy=!1}disconnectedCallback(){this.resize?.disconnect(),this.invalidate(),super.disconnectedCallback()}shouldUpdate(t){if(t.size!==1||!t.has("hass"))return!0;let i=t.get("hass");return!i||this.config.blinds.some(n=>i.states[n.entity]!==this.hass.states[n.entity])}presetMatches(t){if(S(t,this.config.blinds))return!1;let i=mt(t,this.config.blinds);return i?i.length>0&&i.every(n=>this.commandMatches(n)):this.config.blinds.every((n,o)=>t.positions[o].ignored||xe(this.hass.states[n.entity],t.positions[o],n))}isIndependent(t){return this.config.blinds.find(i=>i.entity===t)?.mapping==="independent-tdbu"}commandMatches(t){return this.isIndependent(t.entity_id)?Ot(this.hass.states[t.entity_id],t):ye(this.hass.states[t.entity_id],t)}commandAvailable(t){let i=this.hass.states[t.entity_id];if(!this.isIndependent(t.entity_id))return Rt(i,t);let n=i?.attributes.supported_features,o={open_cover:1,close_cover:2,set_cover_position:4,set_cover_tilt_position:128}[t.service];return!!i&&["open","closed","opening","closing","unknown"].includes(i.state)&&typeof n=="number"&&Number.isInteger(n)&&(n&o)!==0}plan(t){if(Z(this.config),S(t,this.config.blinds))throw Error(S(t,this.config.blinds));let i=mt(t,this.config.blinds);if(i){let n=i;if(!n.every(o=>this.commandAvailable(o)))throw Error("Required native attribute or capability unavailable");return n.flatMap(o=>{let{service:r,...a}=o;return this.commandMatches(o)?[]:[{service:r,data:a}]})}if(S(t,this.config.blinds))throw Error(S(t,this.config.blinds));return this.config.blinds.flatMap((n,o)=>{if(t.positions[o].ignored)return[];let r=this.hass.states[n.entity],a=t.positions[o];if(n.mapping==="independent-tdbu")return Ge(n,r,a);if(!Ut(r))throw Error("Blind unavailable. Check device.");let c,p,u={entity_id:n.entity};if(a.top===0&&a.bottom===0?(c="open_cover",p=1):a.top===0&&a.bottom===100?(c="close_cover",p=2):a.bottom===100?(c="set_cover_tilt_position",p=128,u.tilt_position=a.top):(c="set_cover_position",p=4,u.position=100-a.bottom),!(Number(r.attributes.supported_features)&p))throw Error("Required blind capability is missing. Check device.");return xe(r,a)?[]:[{service:c,data:u}]})}async activate(t,i){if(i.stopPropagation(),i.detail>1||!this.isConnected||!this.config.presets.includes(t))return;let n;try{n=this.plan(t)}catch(o){this.error=o.message;return}this.invalidate(),this.error="",n.length&&(this.busy=!0,await this.runPlan(t,n,this.operation))}setConfig(t){Z(t),this.invalidate(),this.error="",this.config=structuredClone(t)}getCardSize(){if(!this.config)return 1;let t=this.getBoundingClientRect().width||this.cardWidth,i=this.columnsForWidth(t),n=Math.ceil(this.config.rows*this.config.columns/i),o=Math.max(44,(t-(i-1)*12)/i/1.2133333);return Math.ceil((n*o+(n-1)*12)/50)}columnsForWidth(t){return Math.min(this.config.columns,Math.max(1,Math.floor((t+12)/56)))}getGridOptions(){return{columns:12,rows:"auto",min_columns:3}}static{this.styles=[w,m`
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
        ${this.config.presets.map(t=>{let i=S(t,this.config.blinds)||(mt(t,this.config.blinds)?.every(o=>this.commandAvailable(o))??this.config.blinds.every((o,r)=>t.positions[r].ignored||(o.mapping==="independent-tdbu"?!!this.hass.states[o.entity]&&this.hass.states[o.entity].state!=="unavailable":Ut(this.hass.states[o.entity])))?"":"Blind unavailable"),n=!i&&this.presetMatches(t);return l`<button
            type="button"
            class=${`tile ${n?"active":""}`}
            aria-label=${t.name}
            ?disabled=${!!i}
            @click=${o=>this.activate(t,o)}
            @keydown=${o=>{o.repeat&&o.preventDefault()}}
            aria-pressed=${String(n)}
          >
            ${ft(this.config.blinds,t.positions)}
          </button>`})}${Array.from({length:this.config.rows*this.config.columns-this.config.presets.length},()=>l`<div class="slot" aria-hidden="true"></div>`)}
      </div>`}};customElements.get("kiosk-blind-presets-card")||customElements.define("kiosk-blind-presets-card",gt)});k();F();var re={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},ae=s=>(...e)=>({_$litDirective$:s,values:e}),dt=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};var ce="important",qe=" !"+ce,C=ae(class extends dt{constructor(s){if(super(s),s.type!==re.ATTRIBUTE||s.name!=="style"||s.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(s){return Object.keys(s).reduce((e,t)=>{let i=s[t];return i==null?e:e+`${t=t.includes("-")?t:t.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${i};`},"")}update(s,[e]){let{style:t}=s.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(e)),this.render(e);for(let i of this.ft)e[i]==null&&(this.ft.delete(i),i.includes("-")?t.removeProperty(i):t[i]=null);for(let i in e){let n=e[i];if(n!=null){this.ft.add(i);let o=typeof n=="string"&&n.endsWith(qe);i.includes("-")||o?t.setProperty(i,o?n.slice(0,-11):n,o?ce:""):t[i]=n}}return A}});T();It();k();var B=s=>({name:s,selector:{text:{}}}),_=(s,e={})=>({name:s,selector:{entity:e}}),pt=class extends b{constructor(){super(...arguments);this.label=t=>this.config.type==="custom:kiosk-pill-card"&&t.name==="background"?"Background":{aqhi_entity:"Local Canadian PM2.5 smoke index",regional_entity:"Regional Canadian AQHI (optional)",category_entity:"Canadian smoke risk category sensor",source_entity:"Source PM2.5 sensor",data_expected_entity:"History ready timestamp (optional)",stale_after_minutes:"Stale after (minutes; default 120)",location:"Location (optional)",entity:"Primary entity (body more-info target)",door_entity:"Door contact or cover (optional override)",lock_entity:"Linked lock",temperature_format:"Temperature number format",hvac_colors:"HVAC action colors (optional)",status_entity:"Status message sensor",status_active_entity:"Status active sensor",trend_entity:"Temperature trend sensor",name:"Name",icon:"Icon",area:"Area",navigation_path:"Navigation path",temperature_entity:"Temperature sensor",occupancy_entity:"Occupancy sensor",light_entities:"Lights (optional override)",var_large:"Large",show_name:"Show name",show_state:"Show state",show_icon:"Show icon",state_display:"State text (optional override)",detail:"Detail (optional override)",interactions:"Interactions",dynamic:"Declarative rules (advanced, optional)",presentation:"Presentation expressions",action_rules:"Conditional actions",appearance:"Appearance (optional)",icon_color:"Category color (CSS color)",background:"Off background",active_background:"Active background",radius:"Corner radius",tap_action:"Body tap",hold_action:"Body hold",double_tap_action:"Body double tap",icon_tap_action:"Icon tap",icon_hold_action:"Icon hold",icon_double_tap_action:"Icon double tap"}[t.name]||t.name}static{this.properties={hass:{attribute:!1},config:{state:!0}}}static{this.styles=m`
    :host {
      display: block;
    }
    p {
      color: var(--secondary-text-color);
      font-size: 14px;
    }
  `}setConfig(t){this.config={...t}}get schema(){if(this.config.type==="custom:kiosk-air-card")return[_("aqhi_entity",{filter:{domain:"sensor"}}),_("regional_entity",{filter:{domain:"sensor"}}),_("category_entity",{filter:{domain:"sensor"}}),_("source_entity",{filter:{domain:"sensor"}}),_("data_expected_entity",{filter:{domain:"sensor",device_class:"timestamp"}}),B("name"),B("location"),{name:"icon",selector:{icon:{}}},{name:"stale_after_minutes",selector:{number:{min:1,max:1440,mode:"box",unit_of_measurement:"min"}}},{name:"appearance",type:"expandable",schema:["icon_color","background","radius"].map(B)}];let i=this.config.type==="custom:kiosk-room-card",n=this.config.type==="custom:kiosk-action-card",o=this.config.type==="custom:kiosk-pill-card",r=this.config.type==="custom:kiosk-door-card",a=this.config.type==="custom:kiosk-climate-card",c=this.config.type==="custom:kiosk-status-card",p=i?[{name:"area",selector:{area:{}}},B("name"),{name:"icon",selector:{icon:{}}},B("navigation_path"),_("temperature_entity",{filter:{domain:"sensor",device_class:"temperature"}}),_("occupancy_entity",{filter:{domain:"binary_sensor"}}),_("light_entities",{multiple:!0,filter:{domain:"light"}})]:[_("entity",n?{filter:{domain:["script","scene","button"]}}:r?{filter:{domain:["binary_sensor","cover","lock"]}}:a?{filter:{domain:"climate"}}:{}),B("name"),{name:"icon",selector:{icon:{}},context:{icon_entity:"entity"}}],u=i?[]:[{name:"interactions",type:"expandable",flatten:!0,schema:["tap_action","hold_action","double_tap_action","icon_tap_action","icon_hold_action","icon_double_tap_action"].map(h=>({name:h,selector:{ui_action:{default_action:n?"none":h==="icon_tap_action"?!o&&["light","switch","input_boolean"].includes((this.config.entity||"").split(".")[0])?"toggle":"more-info":h.includes("double")?"none":"more-info"}},context:{entity:"entity"}}))}];return[...p,...r?[_("door_entity",{filter:{domain:["binary_sensor","cover"]}}),_("lock_entity",{filter:{domain:"lock"}})]:[],...a?[{name:"temperature_format",selector:{select:{options:["locale","legacy"]}}},{name:"hvac_colors",selector:{object:{}}}]:[],...c?[_("status_entity"),_("status_active_entity",{filter:{domain:"binary_sensor"}}),_("trend_entity",{filter:{domain:"sensor"}})]:[],...o?["show_name","show_state","show_icon"].map(h=>({name:h,selector:{boolean:{}}})):c?[]:[{name:"var_large",selector:{boolean:{}}}],...i?[]:[B(o?"state_display":"detail")],...u,...i?[]:[{name:"dynamic",type:"expandable",flatten:!0,schema:["presentation","action_rules"].map(h=>({name:h,selector:{object:{}}}))}],{name:"appearance",type:"expandable",schema:(o?["icon_color","background","radius"]:["icon_color","background","active_background","radius"]).map(B)}]}change(t){t.stopPropagation();let i=t.detail.value;this.config={...this.config,...i},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this.config},bubbles:!0,composed:!0}))}render(){return!this.config||!this.hass?d:l`<ha-form
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
      </p>`}};customElements.get("kiosk-card-editor")||customElements.define("kiosk-card-editor",pt);var Fe=new Set(["if","eq","ne","includes","in","and","or","not","defined","finite","number","round","gt","lt","concat","capitalize","map","countdown","minutes"]);function K(s,e=0){if(e>24)throw Error("Rule nesting exceeds 24");if(!(!s||typeof s!="object")){if(Array.isArray(s)){if(s.length>100)throw Error("Rule list too large");s.forEach(t=>K(t,e+1));return}if(s.op!==void 0){if(!Fe.has(s.op)||!Array.isArray(s.args)||s.args.length>100)throw Error("Unknown rule operation");s.args.forEach(t=>K(t,e+1))}else if(s.entity!==void 0||s.attribute!==void 0||s.state!==void 0||s.last_changed!==void 0){if(s.attribute&&["__proto__","constructor","prototype"].includes(s.attribute))throw Error("Unsafe attribute");if(s.entity!==void 0&&typeof s.entity!="string")throw Error("Rule entity must be a string")}else Object.values(s).forEach(t=>K(t,e+1))}}function ht(s,e,t,i=Date.now()){if(!s||typeof s!="object")return s;if(!s.op){if(s.entity!==void 0||s.attribute!==void 0||s.state!==void 0||s.last_changed!==void 0){let o=e?.states[s.entity||t.entity||""];return s.attribute!==void 0?o?.attributes[s.attribute]:s.last_changed?o?.last_changed:o?.state}return s}let n=o=>ht(s.args[o],e,t,i);switch(s.op){case"if":return n(0)?n(1):n(2);case"eq":return n(0)===n(1);case"ne":return n(0)!==n(1);case"includes":return typeof n(0)=="string"&&n(0).includes(n(1));case"in":return Array.isArray(n(1))&&n(1).includes(n(0));case"and":return s.args.every((o,r)=>!!n(r));case"or":return s.args.some((o,r)=>!!n(r));case"not":return!n(0);case"defined":return n(0)!==void 0;case"finite":return Number.isFinite(n(0));case"number":return Number(n(0));case"round":return Math.round(Number(n(0)));case"gt":return n(0)>n(1);case"lt":return n(0)<n(1);case"concat":return s.args.map((o,r)=>n(r)??"").join("");case"capitalize":{let o=String(n(0)??"");return o.charAt(0).toUpperCase()+o.slice(1)}case"map":{let o=n(1);return Object.hasOwn(o,String(n(0)))?o[String(n(0))]:o.default??n(2)}case"minutes":{let o=Date.parse(n(0));return Number.isFinite(o)?Math.max(0,Math.ceil((o-i)/6e4)):NaN}case"countdown":{let o=Date.parse(n(0));if(!Number.isFinite(o))return n(1)??"";let r=Math.max(0,Math.ceil((o-i)/6e4)),a=Math.floor(r/60);return a>0?`${a}h ${String(r%60).padStart(2,"0")}m left`:`${r}m left`}}}function he(s){return/"op":"(?:countdown|minutes)"/.test(JSON.stringify(s.presentation))}function ue(s){K(s.presentation);for(let[e,t]of Object.entries(s.action_rules||{})){if(!/^(icon_)?(tap|hold|double_tap)_action$/.test(e)||!Array.isArray(t)||t.length>100)throw Error("Invalid action rules");for(let i of t)if(K(i.when),!i.action||typeof i.action.action!="string")throw Error("Rule requires action")}}var fe=new Set(["light","switch","input_boolean"]);function me(s,e,t){s.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}var Ke=new Set(["off","closed","idle","paused","standby","away","docked","unknown","unavailable","locked","disarmed"]),g=class extends b{constructor(){super(...arguments);this.busy=!1;this.confirming=!1;this.error="";this.operation=0;this.acknowledged=!1;this.held=!1}static{this.properties={hass:{attribute:!1},config:{state:!0},busy:{state:!0},error:{state:!0},confirming:{state:!0}}}connectedCallback(){super.connectedCallback(),this.startClock()}startClock(){clearInterval(this.clock),this.isConnected&&this.config&&he(this.config)&&(this.clock=setInterval(()=>this.requestUpdate(),3e4))}presentation(t){let i=this.config.presentation?.[t];return i===void 0?void 0:ht(i,this.hass,this.config)}resolvedAction(t,i){return this.config.action_rules?.[t]?.find(o=>ht(o.when,this.hass,this.config))?.action||i}action(t,i="tap"){let n=(t==="icon"?"icon_":"")+i+"_action";return this.resolvedAction(n,this.config[n]||{action:i==="tap"?t==="icon"&&this.available&&fe.has((this.config.entity||"").split(".")[0])?"toggle":"more-info":i==="hold"?"more-info":"none"})}async runAction(t,i,n="tap"){i.stopPropagation();let o=this.action(t,n);if(o.action==="none"||this.busy||this.confirming)return;let r=this.config,a=o.confirmation;if(a&&!(typeof a=="object"&&a.exemptions?.some(v=>v.user===this.hass.user?.id))){let v=this.operation;this.confirming=!0;let x=await pe(this,typeof a=="object"?a:{});if(this.operation!==v||(this.confirming=!1,!x||!this.isConnected||this.config!==r))return}if(o.action==="more-info"){me(this,"hass-more-info",{entityId:o.entity||this.config.entity});return}if(!["toggle","perform-action","call-service"].includes(o.action)){let{confirmation:v,...x}=o;me(this,"hass-action",{config:{...this.config,tap_action:x},action:"tap"});return}if(!this.available)return;let c,p,u,h=o.target;if(o.action==="toggle"){if(c=(this.config.entity||"").split(".")[0],!fe.has(c)){this.error="Choose an explicit action for this device.";return}this.expected=this.state?.state==="on"?"off":"on",p=this.expected==="on"?"turn_on":"turn_off",u={entity_id:this.config.entity}}else{if([c,p]=(o.perform_action||o.service||"").split("."),!c||!p){this.error="Choose an action.";return}u=o.data??o.service_data,this.expected=void 0}let f=++this.operation;this.busy=!0,this.error="",this.acknowledged=!1,this.watchdog=setTimeout(()=>{this.operation===f&&(this.operation++,this.busy=!1,this.error="No confirmation. Check device.")},12e3);try{if(await this.hass.callService(c,p,u,h),this.operation!==f)return;this.acknowledged=!0,this.finishIfConfirmed()}catch{this.operation===f&&(this.operation++,this.busy=!1,clearTimeout(this.watchdog),this.error="Action failed. Check device.")}}finishIfConfirmed(){this.busy&&this.acknowledged&&(!this.expected||this.state?.state===this.expected)&&(this.busy=!1,this.expected=void 0,clearTimeout(this.watchdog))}updated(){this.finishIfConfirmed()}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this.clock),clearTimeout(this.watchdog),clearTimeout(this.holdTimer),clearTimeout(this.tapTimer),this.operation++,this.busy=!1}pointerDown(t,i){i.stopPropagation(),i.button===0&&(this.held=!1,clearTimeout(this.holdTimer),this.holdTimer=setTimeout(()=>{this.held=!0,clearTimeout(this.tapTimer),this.runAction(t,i,"hold")},500))}pointerEnd(t){t.stopPropagation(),clearTimeout(this.holdTimer)}tap(t,i){if(i.stopPropagation(),this.held){this.held=!1;return}if(i.detail===0||this.action(t,"double_tap").action==="none"){this.runAction(t,i);return}i.detail>1?(clearTimeout(this.tapTimer),this.runAction(t,i,"double_tap")):this.tapTimer=setTimeout(()=>void this.runAction(t,i),300)}static async getConfigElement(){return window.loadCardHelpers&&await U(["ha-form"]),document.createElement("kiosk-card-editor")}static getStubConfig(t,i=[]){return{entity:i.find(n=>t.states[n])||Object.keys(t.states).find(n=>n.startsWith("light."))||Object.keys(t.states)[0]}}static{this.styles=w}applyConfig(t){ue(t);let i=t.var_large??t.variables?.var_large;if(i!==void 0&&typeof i!="boolean")throw Error("var_large must be a boolean");clearTimeout(this.watchdog),clearTimeout(this.holdTimer),clearTimeout(this.tapTimer),this.operation++,this.busy=!1,this.confirming=!1,this.expected=void 0,this.error="",this.config={...t},this.startClock()}setConfig(t){if(!t.entity)throw new Error("Choose an entity");this.applyConfig(t)}getCardSize(){return this.large?3:1.38}getGridOptions(){return{columns:6,rows:"auto"}}get state(){return this.hass?.states[this.config?.entity||""]}get active(){return!!this.state&&(this.config.active_states?this.config.active_states.includes(this.state.state):!Ke.has(this.state.state))}get cardTitle(){return(this.presentation("name")??this.config.name)||this.state?.attributes.friendly_name||this.config.entity||"Entity"}get detail(){let t=this.presentation("detail");if(t!==void 0)return String(t);if(this.config.detail!==void 0)return this.config.detail;let i=this.state;if(!i)return"Unavailable";if(i.state==="on"&&i.entity_id.startsWith("light.")&&i.attributes.brightness)return`${Math.round(i.attributes.brightness/2.55)}%`;if(i.entity_id.startsWith("climate.")&&!["unknown","unavailable"].includes(i.state)){let o=i.attributes;if(o.target_temp_low!=null&&o.target_temp_high!=null)return`${o.target_temp_low}\xB0\u2013${o.target_temp_high}\xB0`;if(o.temperature!=null)return`${o.temperature}\xB0`;if(o.current_temperature!=null)return`${o.current_temperature}\xB0 (${i.state.charAt(0).toUpperCase()+i.state.slice(1)})`}let n=this.hass.formatEntityState?.(i)||i.state;return n.charAt(0).toUpperCase()+n.slice(1)}get available(){return!!this.state&&!["unknown","unavailable"].includes(this.state.state)}get isAction(){return!1}get large(){return(this.config.var_large??this.config.variables?.var_large)===!0}get cardIcon(){return this.presentation("icon")??this.config.icon}get surfaceStyles(){return{}}get iconContent(){return this.cardIcon?l`<ha-icon .icon=${this.cardIcon}></ha-icon>`:l`<ha-state-icon .hass=${this.hass} .stateObj=${this.state} .stateColor=${!1}></ha-state-icon>`}render(){if(!this.config||!this.hass)return d;let t=this.config.appearance;return l`<ha-card
      part="surface"
      aria-busy=${String(this.busy)}
      class=${[this.active?"active":"",this.available?"":"unavailable",this.isAction?"action":"",this.large?"large":""].join(" ")}
      style=${C({"--kiosk-icon-color":t?.icon_color,"--kiosk-default-icon-color":this.config.entity?.startsWith("light.")?"var(--accent-color,#3bc8ce)":void 0,"--kiosk-background":t?.background,"--kiosk-active-background":t?.active_background,"--kiosk-radius":t?.radius,...this.surfaceStyles})}
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
    >`}},V=class extends g{},Q=class extends g{static getStubConfig(e,t=[]){let n=[...t,...Object.keys(e.states)].find(o=>["script","scene","button"].includes(o.split(".")[0]));return n?{entity:n}:{name:"Action"}}setConfig(e){if(!e.entity&&!e.name)throw Error("Choose an entity or name");if(e.entity&&!["script","scene","button"].includes(e.entity.split(".")[0]))throw Error("Action entities must be scripts, scenes or buttons");this.applyConfig(e)}get isAction(){return!0}get cardIcon(){return(this.presentation("icon")??this.config.icon)||(this.state?void 0:"mdi:play")}get active(){return!0}get detail(){return this.config.detail||(this.available?"":"Unavailable")}get available(){return!this.config.entity||super.available}action(e,t="tap"){let i=(e==="icon"?"icon_":"")+t+"_action";return this.resolvedAction(i,this.config[i]||(e==="icon"&&t==="tap"?this.config.tap_action:void 0)||{action:"none"})}};Nt();T();var J=class extends g{static getStubConfig(){return{name:"Room",navigation_path:"/lovelace"}}setConfig(e){if(!e.area&&!e.name)throw Error("Choose an area or name");this.applyConfig(e)}get cardTitle(){return this.config.name||this.hass.areas?.[this.config.area||""]?.name||"Room"}get cardIcon(){return this.config.icon||this.hass.areas?.[this.config.area||""]?.icon||"mdi:home-outline"}get available(){return!0}get active(){return this.lights.some(e=>e.state==="on")||(this.config.occupancy_entity?this.hass.states[this.config.occupancy_entity]?.state==="on":this.roomStates.some(e=>e.entity_id.startsWith("binary_sensor.")&&["occupancy","presence","motion"].includes(e.attributes.device_class)&&e.state==="on"))}get roomStates(){return this.config.area?Object.values(this.hass.states).filter(e=>{let t=this.hass.entities?.[e.entity_id];return!t||t.hidden||t.hidden_by||t.disabled_by?!1:(t.area_id||this.hass.devices?.[t.device_id]?.area_id)===this.config.area}):[]}get lights(){return this.config.light_entities!==void 0?this.config.light_entities.map(e=>this.hass.states[e]||{entity_id:e,state:"unavailable",attributes:{}}):this.roomStates.filter(e=>e.entity_id.startsWith("light."))}get detail(){let e=this.roomStates,t=this.config.temperature_entity?this.hass.states[this.config.temperature_entity]||{entity_id:this.config.temperature_entity,state:"unavailable",attributes:{}}:e.find(r=>r.attributes.device_class==="temperature"),i=this.config.occupancy_entity?this.hass.states[this.config.occupancy_entity]||{entity_id:this.config.occupancy_entity,state:"unavailable",attributes:{}}:e.find(r=>r.entity_id.startsWith("binary_sensor.")&&["occupancy","presence","motion"].includes(r.attributes.device_class)),n=[];t&&n.push(["unknown","unavailable"].includes(t.state)?"Temperature unavailable":`${t.state}${t.attributes.unit_of_measurement?" "+t.attributes.unit_of_measurement:""}`),i&&n.push(i.state==="on"?"Occupied":i.state==="off"?"Clear":"Occupancy unavailable");let o=this.lights;if(o.length){let r=o.filter(c=>c.state==="on").length,a=o.filter(c=>["unknown","unavailable"].includes(c.state)).length;r?n.push(`${r} light${r===1?"":"s"} on`):a<o.length&&n.push("Lights off"),a&&n.push(`${a} unavailable`)}return n.join(" \xB7 ")}action(e,t="tap"){return t==="tap"&&this.config.navigation_path?{action:"navigate",navigation_path:this.config.navigation_path}:{action:"none"}}};k();T();var X=class extends g{static{this.styles=m`
    ${w}${Bt}
  `}setConfig(e){if(!e.entity)throw Error("Choose an entity");if(e.var_large??e.variables?.var_large)throw Error("Pills are compact; Large is not supported");for(let t of["show_name","show_state","show_icon"])if(e[t]!==void 0&&typeof e[t]!="boolean")throw Error(`${t} must be a boolean`);if(e.show_name===!1&&e.show_state===!1&&e.show_icon===!1)throw Error("Show at least one pill field");this.applyConfig(e)}get large(){return!1}get active(){return!1}getCardSize(){return 1}get detail(){let e=this.presentation("state_display");if(e!==void 0)return String(e);let t=this.state;if(this.config.state_display!==void 0)return this.config.state_display;let i=t?this.config.state_labels?.[t.state]??this.config.state_labels?.default:void 0;if(i!==void 0)return i;if(!t)return"Unavailable";let n=this.hass.formatEntityState?.(t)||t.state;return n.charAt(0).toUpperCase()+n.slice(1)}action(e,t="tap"){let i=(e==="icon"?"icon_":"")+t+"_action";return this.resolvedAction(i,this.config[i]||(e==="icon"?this.config[t+"_action"]:void 0)||{action:t==="double_tap"?"none":"more-info"})}disabled(e){return this.busy||this.confirming||!this.available&&["toggle","perform-action","call-service"].includes(this.action(e).action)}render(){if(!this.config||!this.hass)return d;let e=this.config.appearance,t=this.config.show_name!==!1,i=this.config.show_state!==!1;return l`<ha-card
      part="surface"
      aria-busy=${String(this.busy)}
      class=${`pill ${t?"":"no-name"} ${i?"":"no-state"} ${this.available?"":"unavailable"}`}
      style=${C({"--kiosk-background":e?.background,"--kiosk-icon-color":e?.icon_color,"--kiosk-radius":e?.radius})}
      @click=${n=>this.tap("body",n)}
      @pointerdown=${n=>this.pointerDown("body",n)}
      @pointerup=${this.pointerEnd}
      @pointercancel=${this.pointerEnd}
      @pointerleave=${this.pointerEnd}
    >
      ${this.config.show_icon!==!1?l`<button part="icon-target" aria-label=${`Icon \u2014 ${this.cardTitle}`} ?disabled=${this.disabled("icon")} @click=${n=>this.tap("icon",n)} @pointerdown=${n=>this.pointerDown("icon",n)} @pointerup=${this.pointerEnd} @pointercancel=${this.pointerEnd} @pointerleave=${this.pointerEnd}><span part="icon-circle">${this.cardIcon?l`<ha-icon .icon=${this.cardIcon}></ha-icon>`:l`<ha-state-icon .hass=${this.hass} .stateObj=${this.state} .stateColor=${!1}></ha-state-icon>`}</span></button>`:l`<span class="empty-icon" aria-hidden="true"></span>`}
      <button
        part="body-target"
        aria-label=${`${this.cardTitle}: ${this.detail}`}
        ?disabled=${this.disabled("body")}
        @click=${n=>this.tap("body",n)}
        @pointerdown=${n=>this.pointerDown("body",n)}
        @pointerup=${this.pointerEnd}
        @pointercancel=${this.pointerEnd}
        @pointerleave=${this.pointerEnd}
      >
        ${t?l`<span part="title">${this.cardTitle}</span>`:d}${i?l`<span part="detail">${this.detail}</span>`:d}</button
      >${this.error?l`<span part="feedback" role="status">${this.error}</span>`:d}</ha-card
    >`}};k();var Y=class extends g{static{this.styles=m`${g.styles} .unavailable [part="icon-circle"] { opacity: 1; }`}static getStubConfig(e){return{entity:Object.keys(e?.states||{}).find(i=>["binary_sensor","cover","lock"].includes(i.split(".")[0]))||"binary_sensor.example_door"}}setConfig(e){if(!e.entity)throw Error("Choose a door or lock entity");if(!["binary_sensor","cover","lock"].includes(e.entity.split(".")[0]))throw Error("Choose a contact, cover or lock");if(e.lock_entity&&!e.lock_entity.startsWith("lock."))throw Error("Choose a lock entity");this.applyConfig(e)}get lockEntity(){return this.config.lock_entity||(this.config.entity?.startsWith("lock.")?this.config.entity:void 0)}get doorEntity(){return this.config.door_entity||(this.config.entity?.startsWith("lock.")?void 0:this.config.entity)}get lockState(){return this.hass?.states[this.lockEntity||""]}get doorState(){return this.hass?.states[this.doorEntity||""]?.state||"unknown"}get closed(){return["off","closed"].includes(this.doorState)}get open(){return["on","open"].includes(this.doorState)}get active(){return!(this.lockState?.state==="locked"&&this.closed)}get detail(){let e=this.presentation("detail")??this.config.detail;if(e!==void 0)return String(e);let t=this.open?"open":this.closed?"closed":this.doorState;return this.lockEntity?`${t} / ${this.lockState?.state||"unknown"}`:t}get cardIcon(){let e=super.cardIcon;if(e)return e;let t=this.lockState?.state;return t==="locked"&&this.closed?"mdi:door-closed-lock":t==="locked"&&this.open?"mdi:door-closed-cancel":t==="unlocked"&&this.closed?"mdi:lock-open":t==="unlocked"&&this.open?"mdi:door-open":this.lockState?.attributes.icon||"mdi:lock-question"}get surfaceStyles(){return{"--kiosk-glyph":this.active?"white":this.config.appearance?.icon_color||"#3bc8ce"}}action(e,t="tap"){let i=(e==="icon"?"icon_":"")+t+"_action";return this.resolvedAction(i,this.config[i]||{action:t==="double_tap"?"none":"more-info",...e==="icon"&&this.lockEntity?{entity:this.lockEntity}:{}})}};k();T();var tt=class extends g{static{this.styles=le}static getStubConfig(e){return{entity:Object.keys(e?.states||{}).find(t=>t.startsWith("climate."))||"climate.example"}}setConfig(e){if(!e.entity?.startsWith("climate."))throw Error("Choose a climate entity");this.applyConfig(e)}temperature(e){return this.config.temperature_format==="legacy"?String(e):typeof e!="number"||!Number.isFinite(e)?"\u2014":new Intl.NumberFormat(this.hass.locale?.language||"en",{maximumFractionDigits:2}).format(e)}get active(){return!!this.state&&!["off","idle","standby","away"].includes(this.state.state)}get detail(){let e=this.presentation("detail")??this.config.detail;if(e!==void 0)return String(e);let t=this.state;if(!t)return"Unavailable";let i=t.attributes,n=t.state,o=r=>this.temperature(r)+"\xB0";return n==="off"?"Off":n==="fan_only"?"Fan On":n==="heat"||n==="cool"?`${o(i.temperature)} / ${n} mode`:i.target_temp_low!==void 0&&i.target_temp_high!==void 0?`${o(i.target_temp_low)}\u2013${o(i.target_temp_high)}`:i.temperature!==null&&(i.temperature!==void 0||this.config.temperature_format==="legacy")?o(i.temperature):`${o(i.current_temperature)} (${n.charAt(0).toUpperCase()+n.slice(1)})`}get iconContent(){return l`<span part="temperature">${this.temperature(this.state?.attributes.current_temperature)}°</span>`}get surfaceStyles(){let e=this.config.hvac_colors;return{"--kiosk-temperature-color":e?.[this.state?.attributes.hvac_action]||e?.default||this.config.appearance?.icon_color||"var(--accent-color)","--kiosk-height":this.large?"145px":"68px"}}};k();T();var et=class extends g{static{this.styles=de}static getStubConfig(e){return{entity:Object.keys(e?.states||{}).find(t=>t.startsWith("sensor.")&&e?.states[t].attributes.device_class==="temperature")||"sensor.example_temperature"}}get active(){return this.hass?.states[this.config.status_active_entity||""]?.state==="on"}get value(){let e=this.state?.state||"unavailable",t=parseFloat(e);return Number.isFinite(t)?t.toFixed(0):e}get message(){let e=this.hass?.states[this.config.status_entity||""]?.state;return e&&e!=="clear"?e:""}get trendColor(){let e=parseFloat(this.hass?.states[this.config.trend_entity||""]?.state||"");return Number.isFinite(e)?e>=3?"#ff1744":e>=1.5?"#ff6d00":e>=.5?"#ffd600":e<=-3?"#2962ff":e<=-1.5?"#00b0ff":e<=-.5?"#00e5ff":"white":"white"}render(){return!this.config||!this.hass?d:l`<ha-card part="surface" class=${this.active?"active":""} style=${C({"--kiosk-background":this.config.appearance?.background||"var(--ha-card-background,var(--card-background-color))","--kiosk-radius":this.config.appearance?.radius})}>
   <button part="body-target" aria-label=${this.cardTitle} @click=${e=>this.tap("body",e)} @pointerdown=${e=>this.pointerDown("body",e)} @pointerup=${this.pointerEnd} @pointercancel=${this.pointerEnd} @pointerleave=${this.pointerEnd}>
    ${this.active?l`<span part="status">${this.message}</span>`:l`<span part="pad" aria-hidden="true">°</span><span part="value">${this.value}</span><span part="degree" style=${C({color:this.trendColor})}>°</span>`}
   </button>
  </ha-card>`}};k();T();var it=[{key:"low",label:"Low risk",color:"var(--blue-color,#3188b5)",sentence:"Low particle levels around your home."},{key:"moderate",label:"Moderate risk",color:"var(--warning-color,#d1bb60)",sentence:"Moderate particle levels around your home."},{key:"high",label:"High risk",color:"var(--error-color,#c9706e)",sentence:"High particle levels around your home."},{key:"very_high",label:"Very high risk",color:"var(--deep-purple-color,#8c6373)",sentence:"Very high particle levels around your home."}],jt=s=>s&&/^\d+(\.\d+)?$/.test(s.state)&&Number.isFinite(Number(s.state))?Number(s.state):NaN,y=(s,e)=>({label:s,sentence:e,index:-1,value:"\u2014",color:"var(--disabled-text-color,#888)"}),Ce=s=>s<=3?0:s<=6?1:s<=10?2:3,nt=class extends g{static{this.styles=m`${w}
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

  `}connectedCallback(){super.connectedCallback(),this.freshnessClock=setInterval(()=>this.requestUpdate(),3e4)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this.freshnessClock)}static getStubConfig(){return{aqhi_entity:"sensor.example_smoke_index",category_entity:"sensor.example_smoke_category",source_entity:"sensor.example_pm25"}}setConfig(e){for(let t of["aqhi_entity","category_entity","source_entity"])if(typeof e[t]!="string"||!/^sensor\.[a-z0-9_]+$/.test(e[t]))throw Error(`Choose a sensor for ${t}`);for(let t of["data_expected_entity","regional_entity"])if(e[t]&&(typeof e[t]!="string"||!/^sensor\.[a-z0-9_]+$/.test(e[t])))throw Error(`Choose a sensor for ${t}`);if(e.stale_after_minutes!==void 0&&(!Number.isFinite(e.stale_after_minutes)||e.stale_after_minutes<1||e.stale_after_minutes>1440))throw Error("stale_after_minutes must be between 1 and 1440");this.applyConfig(e)}getCardSize(){return this.config?.regional_entity?7:4}getGridOptions(){return{columns:12,rows:"auto",min_columns:6}}moreInfo(e,t){e.stopPropagation(),this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:t},bubbles:!0,composed:!0}))}timestampFreshness(e,t=this.config.stale_after_minutes??120){let i=e.map(n=>{if(typeof n!="string"||!/^\d{4}-\d{2}-\d{2}T([01]\d|2[0-3]):[0-5]\d:[0-5]\d(\.\d+)?(Z|[+-]\d{2}:\d{2})$/.test(n))return NaN;let o=Date.parse(n);return Number.isFinite(o)&&new Date(n.slice(0,10)+"T00:00:00Z").toISOString().slice(0,10)===n.slice(0,10)?o:NaN});return i.some(n=>!Number.isFinite(n)||n>Date.now()+6e4)?"Unknown":i.some(n=>Date.now()-n>t*6e4)?"Stale":void 0}freshness(e){return this.timestampFreshness(e.map(t=>t?.last_reported??t?.last_updated))}get local(){let e=this.hass.states,t=e[this.config.aqhi_entity],i=e[this.config.source_entity],n=e[this.config.category_entity];if([t,i,n].some(f=>!f||f.state==="unavailable"))return y("Unavailable","The local air sensor is unavailable.");if(!Number.isFinite(jt(i)))return y("Unknown","Waiting for a local particle reading.");let o=t.attributes;if(!(o.index_type==="canadian_aqhi_smoke_pm25"&&o.scope==="local_pm25_only_estimate")||o.source_entity!==this.config.source_entity)return y("Unknown","Choose a matching Canadian PM2.5 smoke estimate sensor.");let a=this.timestampFreshness([o.evaluated_at]);if(a)return y(a,"Waiting for a recent smoke calculation.");if(o.status==="source_stale")return y("Stale","Waiting for a recent particle reading.");if(o.status==="incomplete_history")return y("Warming up","Gathering enough particle history.");if(o.status==="history_unavailable")return y("Unavailable","Particle history is unavailable.");if(o.status!=="valid")return y("Unknown","Waiting for a valid particle reading.");let c=o.source_max_age_minutes;if(typeof c!="number"||!Number.isFinite(c)||c<=0)return y("Unknown","Waiting for source freshness metadata.");let p=this.timestampFreshness([o.source_last_reported],Math.min(c,this.config.stale_after_minutes??120));if(p)return y(p,"Waiting for a recent particle reading.");let u=jt(t);if(!Number.isInteger(u)||u<1||u>11||!it.some(f=>f.key===n.state)){let f=Date.parse(e[this.config.data_expected_entity||""]?.state||"");return(t.state==="unknown"||n.state==="unknown")&&f>Date.now()?y("Warming up","Gathering enough particle history."):y("Unknown","Waiting for a calculated Canadian smoke index.")}let h=Ce(u);return it[h].key!==n.state?y("Updating","Waiting for matching Canadian smoke readings."):{...it[h],index:h,value:u===11?"10+":String(u)}}get regional(){let e=this.hass.states[this.config.regional_entity];if(!e||e.state==="unavailable")return y("Unavailable","Regional AQHI is unavailable.");let t=jt(e),i=e.state==="10+";if(!i&&(!Number.isFinite(t)||t<0))return y("Unknown","Waiting for regional AQHI.");let n=this.freshness([e]);if(n)return y(n,"Waiting for recent regional AQHI.");let o=i?11:Math.max(1,Math.round(t)),r=Ce(o);return{...it[r],index:r,value:o>10?"10+":String(o)}}render(){if(!this.config||!this.hass)return d;let e=this.local,t=this.regional,i=this.hass.states[this.config.regional_entity];return l`<ha-card part="surface" style=${C({"--air-color":e.color,"--kiosk-background":this.config.appearance?.background,"--kiosk-radius":this.config.appearance?.radius,"--kiosk-icon-color":this.config.appearance?.icon_color})}>
      <div class="local-summary" role="button" tabindex="0" aria-label=${`${this.config.name||"Outside air"}: local Canadian smoke history`} aria-description="Local PM2.5-only Canadian smoke estimate, not full regional AQHI. Bands: low 1–3, moderate 4–6, high 7–10, very high 10+." title="Canadian PM2.5-only smoke estimate, not the full regional multi-pollutant AQHI." @click=${n=>this.moreInfo(n,this.config.aqhi_entity)} @keydown=${n=>{(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),n.repeat||this.moreInfo(n,this.config.aqhi_entity))}}>
      <div class="identity"><span part="icon-circle" aria-hidden="true"><ha-icon .icon=${this.config.icon||"mdi:weather-windy"}></ha-icon></span><div><span part="title">${this.config.name||"Outside air"}</span>${this.config.location?l`<span part="detail">${this.config.location}</span>`:d}</div></div>
      <div role="status" aria-live="polite" aria-atomic="true"><div class="hero"><div part="aqhi">${e.value} <span class="unit">AQHI</span></div><span part="category">${e.label}</span></div><p part="interpretation">${e.sentence}</p></div>
      <div aria-hidden="true"><div class="rail">${it.map((n,o)=>l`<span part="segment" class=${e.index===o?"selected":""} style=${C({background:n.color})}></span>`)}</div><div class="labels"><span>Low · 1–3</span><span>Very high · 10+</span></div></div>
      </div>
      ${this.config.regional_entity?l`<section class="regional-section" aria-label="Regional Canadian AQHI"><div class="provenance">${i?.attributes.location||"Regional"} · Regional AQHI</div><div class="row"><div class="regional-reading" role="status" aria-live="polite" aria-atomic="true"><span part="regional-category">${t.label}</span><div part="regional-aqhi">${t.value} <span class="unit">AQHI</span></div></div><button aria-label="Details: regional AQHI history" @click=${n=>this.moreInfo(n,this.config.regional_entity)}>Details ↗</button></div>${i?.attributes.attribution?l`<div class="provenance">${i.attributes.attribution}</div>`:d}</section>`:d}
    </ha-card>`}};customElements.get("kiosk-door-card")||customElements.define("kiosk-door-card",Y);customElements.get("kiosk-climate-card")||customElements.define("kiosk-climate-card",tt);customElements.get("kiosk-status-card")||customElements.define("kiosk-status-card",et);customElements.get("kiosk-air-card")||customElements.define("kiosk-air-card",nt);customElements.get("kiosk-entity-card")||customElements.define("kiosk-entity-card",V);customElements.get("kiosk-action-card")||customElements.define("kiosk-action-card",Q);customElements.get("kiosk-room-card")||customElements.define("kiosk-room-card",J);customElements.get("kiosk-pill-card")||customElements.define("kiosk-pill-card",X);var Ee=window.customBadges||=[];Ee.some(s=>s.type==="kiosk-pill-card")||Ee.push({type:"kiosk-pill-card",name:"Kiosk pill",description:"Compact status capsule",preview:!0,documentationURL:"https://github.com/myevit/kiosk-cards"});var Ae=window.customCards||=[];for(let[s,e,t]of[["kiosk-blind-presets-card","Kiosk blind presets","Picture-only composite sequential TDBU blind presets"],["kiosk-entity-card","Kiosk entity","State tile with isolated quick control"],["kiosk-action-card","Kiosk action","Explicit momentary action tile"],["kiosk-room-card","Kiosk room","Room summary and navigation"],["kiosk-door-card","Kiosk door","Independent door and linked lock observations"],["kiosk-climate-card","Kiosk climate","Current temperature and HVAC mode"],["kiosk-air-card","Kiosk air","Read-only Canadian smoke estimate and separate regional AQHI"],["kiosk-status-card","Kiosk status","Passive temperature and cross-entity status display"],["kiosk-pill-card","Kiosk pill","Compact status capsule for cards and native badges"]])Ae.some(i=>i.type===s)||Ae.push({type:s,name:e,description:t,preview:!0,documentationURL:"https://github.com/myevit/kiosk-cards"});export{Q as KioskActionCard,nt as KioskAirCard,g as KioskBaseCard,gt as KioskBlindPresetsCard,pt as KioskCardEditor,tt as KioskClimateCard,Y as KioskDoorCard,V as KioskEntityCard,X as KioskPillCard,J as KioskRoomCard,et as KioskStatusCard,We as designTokens,w as kioskStyles,Bt as pillStyles};
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
