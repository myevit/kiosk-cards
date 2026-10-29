var Me=Object.defineProperty;var $=(n,e)=>()=>(n&&(e=n(n=0)),e);var Ie=(n,e)=>{for(var t in e)Me(n,t,{get:e[t],enumerable:!0})};var rt,at,kt,Ft,z,Kt,m,Gt,$t,wt=$(()=>{rt=globalThis,at=rt.ShadowRoot&&(rt.ShadyCSS===void 0||rt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,kt=Symbol(),Ft=new WeakMap,z=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==kt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(at&&e===void 0){let i=t!==void 0&&t.length===1;i&&(e=Ft.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&Ft.set(t,e))}return e}toString(){return this.cssText}},Kt=n=>new z(typeof n=="string"?n:n+"",void 0,kt),m=(n,...e)=>{let t=n.length===1?n[0]:e.reduce((i,s,o)=>i+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+n[o+1],n[0]);return new z(t,n,kt)},Gt=(n,e)=>{if(at)n.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let i=document.createElement("style"),s=rt.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=t.cssText,n.appendChild(i)}},$t=at?n=>n:n=>n instanceof CSSStyleSheet?(e=>{let t="";for(let i of e.cssRules)t+=i.cssText;return Kt(t)})(n):n});var Re,Ne,Ue,He,Oe,je,ct,Vt,ze,De,D,xt,Jt,Qt,C,lt=$(()=>{wt();wt();({is:Re,defineProperty:Ne,getOwnPropertyDescriptor:Ue,getOwnPropertyNames:He,getOwnPropertySymbols:Oe,getPrototypeOf:je}=Object),ct=globalThis,Vt=ct.trustedTypes,ze=Vt?Vt.emptyScript:"",De=ct.reactiveElementPolyfillSupport,D=(n,e)=>n,xt={toAttribute(n,e){switch(e){case Boolean:n=n?ze:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,e){let t=n;switch(e){case Boolean:t=n!==null;break;case Number:t=n===null?null:Number(n);break;case Object:case Array:try{t=JSON.parse(n)}catch{t=null}}return t}},Jt=(n,e)=>!Re(n,e),Qt={attribute:!0,type:String,converter:xt,reflect:!1,useDefault:!1,hasChanged:Jt};Symbol.metadata??=Symbol("metadata"),ct.litPropertyMetadata??=new WeakMap;C=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Qt){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let i=Symbol(),s=this.getPropertyDescriptor(e,i,t);s!==void 0&&Ne(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){let{get:s,set:o}=Ue(this.prototype,e)??{get(){return this[t]},set(r){this[t]=r}};return{get:s,set(r){let c=s?.call(this);o?.call(this,r),this.requestUpdate(e,c,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Qt}static _$Ei(){if(this.hasOwnProperty(D("elementProperties")))return;let e=je(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(D("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(D("properties"))){let t=this.properties,i=[...He(t),...Oe(t)];for(let s of i)this.createProperty(s,t[s])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[i,s]of t)this.elementProperties.set(i,s)}this._$Eh=new Map;for(let[t,i]of this.elementProperties){let s=this._$Eu(t,i);s!==void 0&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let i=new Set(e.flat(1/0).reverse());for(let s of i)t.unshift($t(s))}else e!==void 0&&t.push($t(e));return t}static _$Eu(e,t){let i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Gt(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){let i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(s!==void 0&&i.reflect===!0){let o=(i.converter?.toAttribute!==void 0?i.converter:xt).toAttribute(t,i.type);this._$Em=e,o==null?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(e,t){let i=this.constructor,s=i._$Eh.get(e);if(s!==void 0&&this._$Em!==s){let o=i.getPropertyOptions(s),r=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:xt;this._$Em=s;let c=r.fromAttribute(t,o.type);this[s]=c??this._$Ej?.get(s)??c,this._$Em=null}}requestUpdate(e,t,i,s=!1,o){if(e!==void 0){let r=this.constructor;if(s===!1&&(o=this[e]),i??=r.getPropertyOptions(e),!((i.hasChanged??Jt)(o,t)||i.useDefault&&i.reflect&&o===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:s,wrapped:o},r){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,r??t??this[e]),o!==!0||r!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),s===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,o]of this._$Ep)this[s]=o;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[s,o]of i){let{wrapped:r}=o,c=this[s];r!==!0||this._$AL.has(s)||c===void 0||this.C(s,void 0,o,c)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};C.elementStyles=[],C.shadowRootOptions={mode:"open"},C[D("elementProperties")]=new Map,C[D("finalized")]=new Map,De?.({ReactiveElement:C}),(ct.reactiveElementVersions??=[]).push("2.1.2")});function ae(n,e){if(!Mt(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return Xt!==void 0?Xt.createHTML(e):e}function N(n,e,t=n,i){if(e===E)return e;let s=i!==void 0?t._$Co?.[i]:t._$Cl,o=W(e)?void 0:e._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(n),s._$AT(n,t,i)),i!==void 0?(t._$Co??=[])[i]=s:t._$Cl=s),s!==void 0&&(e=N(n,s._$AS(n,e.values),s,i)),e}var Bt,Zt,dt,Xt,ne,S,oe,Le,I,q,W,Mt,qe,Ct,L,Yt,te,B,ee,ie,re,It,l,Rt,si,E,p,se,M,We,F,Et,K,U,At,St,Pt,Tt,Fe,ce,G=$(()=>{Bt=globalThis,Zt=n=>n,dt=Bt.trustedTypes,Xt=dt?dt.createPolicy("lit-html",{createHTML:n=>n}):void 0,ne="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,oe="?"+S,Le=`<${oe}>`,I=document,q=()=>I.createComment(""),W=n=>n===null||typeof n!="object"&&typeof n!="function",Mt=Array.isArray,qe=n=>Mt(n)||typeof n?.[Symbol.iterator]=="function",Ct=`[ 	
\f\r]`,L=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Yt=/-->/g,te=/>/g,B=RegExp(`>|${Ct}(?:([^\\s"'>=/]+)(${Ct}*=${Ct}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ee=/'/g,ie=/"/g,re=/^(?:script|style|textarea|title)$/i,It=n=>(e,...t)=>({_$litType$:n,strings:e,values:t}),l=It(1),Rt=It(2),si=It(3),E=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),se=new WeakMap,M=I.createTreeWalker(I,129);We=(n,e)=>{let t=n.length-1,i=[],s,o=e===2?"<svg>":e===3?"<math>":"",r=L;for(let c=0;c<t;c++){let a=n[c],d,h,u=-1,f=0;for(;f<a.length&&(r.lastIndex=f,h=r.exec(a),h!==null);)f=r.lastIndex,r===L?h[1]==="!--"?r=Yt:h[1]!==void 0?r=te:h[2]!==void 0?(re.test(h[2])&&(s=RegExp("</"+h[2],"g")),r=B):h[3]!==void 0&&(r=B):r===B?h[0]===">"?(r=s??L,u=-1):h[1]===void 0?u=-2:(u=r.lastIndex-h[2].length,d=h[1],r=h[3]===void 0?B:h[3]==='"'?ie:ee):r===ie||r===ee?r=B:r===Yt||r===te?r=L:(r=B,s=void 0);let v=r===B&&n[c+1].startsWith("/>")?" ":"";o+=r===L?a+Le:u>=0?(i.push(d),a.slice(0,u)+ne+a.slice(u)+S+v):a+S+(u===-2?c:v)}return[ae(n,o+(n[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]},F=class n{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let o=0,r=0,c=e.length-1,a=this.parts,[d,h]=We(e,t);if(this.el=n.createElement(d,i),M.currentNode=this.el.content,t===2||t===3){let u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(s=M.nextNode())!==null&&a.length<c;){if(s.nodeType===1){if(s.hasAttributes())for(let u of s.getAttributeNames())if(u.endsWith(ne)){let f=h[r++],v=s.getAttribute(u).split(S),A=/([.?@])?(.*)/.exec(f);a.push({type:1,index:o,name:A[2],strings:v,ctor:A[1]==="."?At:A[1]==="?"?St:A[1]==="@"?Pt:U}),s.removeAttribute(u)}else u.startsWith(S)&&(a.push({type:6,index:o}),s.removeAttribute(u));if(re.test(s.tagName)){let u=s.textContent.split(S),f=u.length-1;if(f>0){s.textContent=dt?dt.emptyScript:"";for(let v=0;v<f;v++)s.append(u[v],q()),M.nextNode(),a.push({type:2,index:++o});s.append(u[f],q())}}}else if(s.nodeType===8)if(s.data===oe)a.push({type:2,index:o});else{let u=-1;for(;(u=s.data.indexOf(S,u+1))!==-1;)a.push({type:7,index:o}),u+=S.length-1}o++}}static createElement(e,t){let i=I.createElement("template");return i.innerHTML=e,i}};Et=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:i}=this._$AD,s=(e?.creationScope??I).importNode(t,!0);M.currentNode=s;let o=M.nextNode(),r=0,c=0,a=i[0];for(;a!==void 0;){if(r===a.index){let d;a.type===2?d=new K(o,o.nextSibling,this,e):a.type===1?d=new a.ctor(o,a.name,a.strings,this,e):a.type===6&&(d=new Tt(o,this,e)),this._$AV.push(d),a=i[++c]}r!==a?.index&&(o=M.nextNode(),r++)}return M.currentNode=I,s}p(e){let t=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}},K=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,s){this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=N(this,e,t),W(e)?e===p||e==null||e===""?(this._$AH!==p&&this._$AR(),this._$AH=p):e!==this._$AH&&e!==E&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):qe(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==p&&W(this._$AH)?this._$AA.nextSibling.data=e:this.T(I.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:i}=e,s=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=F.createElement(ae(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(t);else{let o=new Et(s,this),r=o.u(this.options);o.p(t),this.T(r),this._$AH=o}}_$AC(e){let t=se.get(e.strings);return t===void 0&&se.set(e.strings,t=new F(e)),t}k(e){Mt(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,i,s=0;for(let o of e)s===t.length?t.push(i=new n(this.O(q()),this.O(q()),this,this.options)):i=t[s],i._$AI(o),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let i=Zt(e).nextSibling;Zt(e).remove(),e=i}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},U=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,s,o){this.type=1,this._$AH=p,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=p}_$AI(e,t=this,i,s){let o=this.strings,r=!1;if(o===void 0)e=N(this,e,t,0),r=!W(e)||e!==this._$AH&&e!==E,r&&(this._$AH=e);else{let c=e,a,d;for(e=o[0],a=0;a<o.length-1;a++)d=N(this,c[i+a],t,a),d===E&&(d=this._$AH[a]),r||=!W(d)||d!==this._$AH[a],d===p?e=p:e!==p&&(e+=(d??"")+o[a+1]),this._$AH[a]=d}r&&!s&&this.j(e)}j(e){e===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},At=class extends U{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===p?void 0:e}},St=class extends U{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==p)}},Pt=class extends U{constructor(e,t,i,s,o){super(e,t,i,s,o),this.type=5}_$AI(e,t=this){if((e=N(this,e,t,0)??p)===E)return;let i=this._$AH,s=e===p&&i!==p||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,o=e!==p&&(i===p||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Tt=class{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){N(this,e)}},Fe=Bt.litHtmlPolyfillSupport;Fe?.(F,K),(Bt.litHtmlVersions??=[]).push("3.3.3");ce=(n,e,t)=>{let i=t?.renderBefore??e,s=i._$litPart$;if(s===void 0){let o=t?.renderBefore??null;i._$litPart$=s=new K(e.insertBefore(q(),o),o,void 0,t??{})}return s._$AI(n),s}});var Nt,b,Ke,le=$(()=>{lt();lt();G();G();Nt=globalThis,b=class extends C{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=ce(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return E}};b._$litElement$=!0,b.finalized=!0,Nt.litElementHydrateSupport?.({LitElement:b});Ke=Nt.litElementPolyfillSupport;Ke?.({LitElement:b});(Nt.litElementVersions??=[]).push("4.2.2")});var de=$(()=>{});var k=$(()=>{lt();G();le();de()});var w,Ut,fe,me,Ve,P=$(()=>{"use strict";k();w=m`
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
`,Ut=m`
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
`,fe=m`${w}
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
`,me=m`${w}
 :host { height:100%; }
 [part="surface"] { height:100%; padding:16px; border:none; }
 [part="body-target"] { display:flex; flex-direction:row; min-height:0; align-items:center; justify-content:center; text-align:center; width:100%; }
 [part="value"], [part="degree"], [part="pad"] { font-size:112px; font-weight:700; line-height:1; color:white; }
 [part="pad"] { visibility:hidden; }
 [part="status"] { width:100%; font-size:20px; font-weight:var(--ha-font-weight-normal,400); line-height:1.35; color:white; white-space:normal; }
 .active [part="status"] { color:black; }
`,Ve=Object.freeze({height:69,actionHeight:68,largeHeight:146,pillHeight:35,pillRadius:18,pillIconSize:24,iconDiameter:45,glyphSize:25,titleSize:17,detailSize:15,categoryColor:"#3bc8ce"})});async function H(n=["ha-dialog","ha-button","ha-dialog-footer","ha-form"]){if(n.every(i=>customElements.get(i)))return;let e=await window.loadCardHelpers?.();if(!e||(await(await e.createCardElement({type:"entities",entities:[]})).constructor.getConfigElement?.(),!n.every(i=>customElements.get(i))))throw Error("Home Assistant controls are unavailable")}function ge(n,e){return new Promise(t=>{let i=!1,s=o=>{i||(i=!0,t(o))};n.dispatchEvent(new CustomEvent("show-dialog",{bubbles:!0,composed:!0,detail:{dialogTag:"kiosk-confirmation-dialog",dialogImport:()=>H().catch(o=>{throw s(!1),o}),dialogParams:{...e,confirm:()=>s(!0),cancel:()=>s(!1)}}}))})}var Ht,Ot=$(()=>{"use strict";k();Ht=class extends b{constructor(){super(...arguments);this.open=!1}static{this.properties={open:{state:!0},params:{state:!0}}}async showDialog(t){await H(),this.params=t,this.open=!0,await this.updateComplete}closeDialog(){return this.finish(!1),!0}finish(t){this.open&&(this.open=!1,(t?this.params.confirm:this.params.cancel)(),this.dispatchEvent(new CustomEvent("dialog-closed",{bubbles:!0,composed:!0,detail:{dialog:this.localName}})))}render(){return this.params?l`<ha-dialog
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
    >`:p}};customElements.get("kiosk-confirmation-dialog")||customElements.define("kiosk-confirmation-dialog",Ht)});function gt(n,e){if(!Array.isArray(n)||!n.length||n.length>e.length)throw Error("Choose at least one native command, at most one per configured blind");let t=new Set;for(let i of n){if(!jt(i)||!mt.includes(i.service)||!e.includes(i.entity_id)||t.has(i.entity_id))throw Error("Only unique configured covers and supported native services are allowed");let s=i.service==="set_cover_position"?"position":i.service==="set_cover_tilt_position"?"tilt_position":void 0;if(!ft(i,["service","entity_id",...s?[s]:[]])||s&&(typeof i[s]!="number"||!Number.isFinite(i[s])||i[s]<0||i[s]>100))throw Error("Native values must be literal numbers 0\u2013100; extra fields are not allowed");t.add(i.entity_id)}return structuredClone(n)}function ke(n,e){let t=n?.config??n;if(!jt(t)||!Array.isArray(t.sequence)||!t.sequence.length)throw Error("Script must have a simple cover-only sequence");let i=[];for(let s of t.sequence){if(!ft(s,["action","service","target","data"])||Object.hasOwn(s,"action")===Object.hasOwn(s,"service"))throw Error("Only simple literal cover actions are supported");let o=s.action??s.service;if(typeof o!="string"||!o.startsWith("cover.")||!mt.includes(o.slice(6)))throw Error("Only supported native cover actions are allowed");if(s.target!==void 0&&!ft(s.target,["entity_id"]))throw Error("Only literal entity targets are supported");if(s.data!==void 0&&!ft(s.data,["entity_id","position","tilt_position"]))throw Error("Unsupported action data");if(s.target?.entity_id!==void 0&&s.data?.entity_id!==void 0)throw Error("Use exactly one entity target");let r=s.target?.entity_id??s.data?.entity_id,c=Array.isArray(r)?r:[r];if(!c.length)throw Error("Missing target");let{entity_id:a,...d}=s.data??{};for(let h of c)i.push({service:o.slice(6),entity_id:h,...d})}return gt(i,e)}function zt(n,e){let i=e.service==="set_cover_tilt_position"?"current_tilt_position":"current_position",s={open_cover:1,close_cover:2,set_cover_position:4,set_cover_tilt_position:128}[e.service],o=n?.attributes.supported_features,r=n?.attributes[i];return!!n&&["open","closed","opening","closing"].includes(n.state)&&typeof o=="number"&&Number.isInteger(o)&&(o&s)!==0&&typeof r=="number"&&Number.isFinite(r)&&r>=0&&r<=100}function $e(n,e){if(!zt(n,e)||!["open","closed"].includes(n.state)||e.service==="close_cover"&&n.state!=="closed"||e.service==="set_cover_position"&&e.position===0&&!(typeof n.attributes.current_tilt_position=="number"&&Math.abs(n.attributes.current_tilt_position-100)<=2)||e.service==="set_cover_tilt_position"&&e.tilt_position===100&&!(typeof n.attributes.current_position=="number"&&Math.abs(n.attributes.current_position)<=2))return!1;let t=e.service==="open_cover"?100:e.service==="close_cover"?0:e.service==="set_cover_position"?e.position:e.tilt_position;return Math.abs(n.attributes[e.service==="set_cover_tilt_position"?"current_tilt_position":"current_position"]-t)<=2}var mt,jt,ft,Dt=$(()=>{"use strict";mt=["open_cover","close_cover","set_cover_position","set_cover_tilt_position"],jt=n=>n&&typeof n=="object"&&!Array.isArray(n),ft=(n,e)=>jt(n)&&Object.keys(n).every(t=>e.includes(t))});var Ce={};Ie(Ce,{KioskBlindPresetsEditor:()=>bt});var O,xe,we,bt,Ee=$(()=>{"use strict";k();Ot();Dt();Lt();O=(n,e,t,i=1)=>({name:n,selector:{number:{min:e,max:t,step:i,mode:"box"}}}),xe=n=>({name:n,selector:{text:{}}}),we=[{name:"entity",required:!0,selector:{entity:{filter:{domain:"cover"}}}},xe("name"),O("width",.1,10,.1),{name:"mapping",selector:{select:{mode:"dropdown",options:[{value:"sequential-tdbu",label:"Sequential TDBU (default)"},{value:"independent-tdbu",label:"Independent top and bottom rails"}]}}}],bt=class extends b{constructor(){super(...arguments);this.draftIndex=-1;this.newBlind={width:1};this.error="";this.sourceScript="";this.copying=!1;this.copyGeneration=0;this.label=t=>({rows:"Grid rows",columns:"Grid columns",entity:"Cover entity",name:"Accessible name",width:"Relative picture width",mapping:"Rail mapping",top:"Top (% down)",bottom:"Bottom (% down)"})[t.name]||t.name}static{this.properties={hass:{attribute:!1},config:{state:!0},draft:{state:!0},newBlind:{state:!0},error:{state:!0},removing:{state:!0},sourceScript:{state:!0},copying:{state:!0}}}invalidateCopy(){this.copyGeneration++,this.copying=!1}disconnectedCallback(){this.invalidateCopy(),super.disconnectedCallback()}connectedCallback(){super.connectedCallback(),H(["ha-form"]).catch(()=>{this.error="Home Assistant native form controls could not load. Reopen the editor."})}setConfig(t){this.invalidateCopy(),this.sourceScript="",this.config=structuredClone(t),this.draft=void 0,this.removing=void 0,this.error=""}emit(t){try{Z(t)}catch(i){return this.error=i.message,!1}return this.config=t,this.error="",this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:structuredClone(t)},bubbles:!0,composed:!0})),!0}updateGrid(t){t.stopPropagation();let i=t.detail.value;this.emit({...this.config,rows:i.rows,columns:i.columns})}updateBlind(t,i){i.stopPropagation();let s=structuredClone(this.config);s.blinds[t]={...s.blinds[t],...i.detail.value},this.emit(s)}moveBlind(t,i){let s=structuredClone(this.config),o=t+i;[s.blinds[t],s.blinds[o]]=[s.blinds[o],s.blinds[t]];for(let r of s.presets)[r.positions[t],r.positions[o]]=[r.positions[o],r.positions[t]];this.emit(s)}addBlind(){let t={...this.newBlind},i=structuredClone(this.config);i.blinds.push(t);for(let s of i.presets)s.positions.push({top:0,bottom:100});this.emit(i)&&(this.newBlind={width:1})}edit(t){this.invalidateCopy(),this.sourceScript="",this.error="",this.draftIndex=t,this.draft=structuredClone(this.config.presets[t])}addPreset(){this.invalidateCopy(),this.sourceScript="",this.draftIndex=this.config.presets.length,this.error="";let t=this.draftIndex+1;for(;this.config.presets.some(i=>i.id===`preset-${t}`);)t++;this.draft={id:`preset-${t}`,name:`Preset ${this.draftIndex+1}`,positions:this.config.blinds.map(()=>({top:0,bottom:100}))}}get draftProblem(){if(!this.draft)return"";try{let t=structuredClone(this.config);t.presets[this.draftIndex]=this.draft,Z(t)}catch(t){return t.message}return j(this.draft,this.config.blinds)}save(){if(!this.draft||this.draftProblem)return;let t=structuredClone(this.config);t.presets[this.draftIndex]=this.draft,this.emit(t)&&(this.draft=void 0)}async copyCommands(){if(!this.draft||!/^script\.[a-z0-9_]+$/.test(this.sourceScript)||!this.hass.callWS||this.copying)return;let t=this.draft,i=this.sourceScript,s=this.config,o=++this.copyGeneration;this.copying=!0,this.error="";try{let r=await this.hass.callWS({type:"script/config",entity_id:i});if(this.copyGeneration!==o||!this.isConnected||this.draft!==t||this.sourceScript!==i||this.config!==s)return;let c=ke(r,s.blinds.map(d=>d.entity)),a={...t,commands:c};delete a.actions,this.draft=a}catch(r){this.copyGeneration===o&&this.isConnected&&this.draft===t&&this.sourceScript===i&&this.config===s&&(this.error=r.message)}finally{this.copyGeneration===o&&(this.copying=!1)}}commandChange(t,i){if(i.stopPropagation(),!this.draft)return;let s=i.detail.value,o=structuredClone(this.draft.commands??this.draft.actions??[]),r=o.findIndex(a=>a.entity_id===t);if(!s.service||s.service==="untouched")r>=0&&o.splice(r,1);else{let a=s.service==="set_cover_position"?"position":s.service==="set_cover_tilt_position"?"tilt_position":void 0,d={service:s.service,entity_id:t,...a?{[a]:s.value}:{}};r>=0?o[r]=d:o.push(d)}let c={...this.draft};delete c.actions,o.length?c.commands=o:delete c.commands,this.draft=c}removeItem(){if(!this.removing)return;let t=structuredClone(this.config),{kind:i,index:s}=this.removing;if(i==="blind"){t.blinds.splice(s,1);for(let o of t.presets)o.positions.splice(s,1)}else t.presets.splice(s,1);this.emit(t)&&(this.removing=void 0,this.draft=void 0)}movePreset(t,i){let s=structuredClone(this.config),o=t+i;[s.presets[t],s.presets[o]]=[s.presets[o],s.presets[t]],this.emit(s)}static{this.styles=m`
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
  `}render(){if(!this.config)return p;if(this.removing)return l`<p>
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
          .schema=${[xe("name")]}
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
        <p>With an override, only listed shades are commanded; all others are untouched. Removing the override restores each blind's configured rail mapping.</p>
        ${this.config.blinds.map(i=>{let s=(this.draft.commands??this.draft.actions)?.find(r=>r.entity_id===i.entity),o=s?.service==="set_cover_position"||s?.service==="set_cover_tilt_position";return l`<ha-form data-command=${i.entity} .hass=${this.hass}
            .data=${{service:s?.service??"untouched",value:s?.service==="set_cover_position"?s.position:s?.service==="set_cover_tilt_position"?s.tilt_position:0}}
            .schema=${[{name:"service",selector:{select:{mode:"dropdown",options:[{value:"untouched",label:"Untouched (no native command)"},...mt.map(r=>({value:r,label:r}))]}}},...o?[O("value",0,100)]:[]]}
            .computeLabel=${r=>r.name==="service"?i.name||i.entity:"Native value (%)"}
            @value-changed=${r=>this.commandChange(i.entity,r)}></ha-form>`})}
        ${this.draft.commands??this.draft.actions?l`<pre data-command-preview>${JSON.stringify(this.draft.commands??this.draft.actions,null,2)}</pre><button @click=${()=>{let i={...this.draft};delete i.commands,delete i.actions,this.draft=i}}>Remove override</button>`:p}
        ${this.config.blinds.map((i,s)=>l`<h3>
                ${i.name||["Left","Middle","Right"][s]||`Blind ${s+1}`}
              </h3>
              <ha-form
                data-position=${s}
                .hass=${this.hass}
                .data=${this.draft.positions[s]}
                .schema=${[O("top",0,100),O("bottom",0,100)]}
                .computeLabel=${this.label}
                @value-changed=${o=>{o.stopPropagation();let r=structuredClone(this.draft);r.positions[s]={...r.positions[s],...o.detail.value},this.draft=r}}
              ></ha-form>`)}${t?l`<span role="status">${t}</span>`:p}${this.error?l`<span role="status">${this.error}</span>`:p}
        <div class="actions">
          <button ?disabled=${!!t} @click=${()=>this.save()}>
            Save</button
          ><button @click=${()=>this.draft=void 0}>Cancel</button
          >${this.draftIndex<this.config.presets.length?l`<button @click=${()=>this.removing={kind:"preset",index:this.draftIndex}}>Remove preset</button>`:p}
        </div>`}return l`<ha-form
        data-grid
        .hass=${this.hass}
        .data=${{rows:this.config.rows,columns:this.config.columns}}
        .schema=${[O("rows",1,12),O("columns",1,12)]}
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
              .schema=${we}
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
        .schema=${we}
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
        ${this.config.presets.map((t,i)=>l`<button class="tile" aria-label=${`Edit ${t.name}`} title=${j(t,this.config.blinds)} @click=${()=>this.edit(i)}>${yt(this.config.blinds,t.positions)}</button>`)}
      </div>
      ${this.config.presets.map((t,i)=>l`<div class="actions"><span>${t.name}</span><button aria-label=${`Move preset ${t.name} up`} ?disabled=${i===0} @click=${()=>this.movePreset(i,-1)}>↑</button><button aria-label=${`Move preset ${t.name} down`} ?disabled=${i===this.config.presets.length-1} @click=${()=>this.movePreset(i,1)}>↓</button></div>`)}<button
        ?disabled=${!this.config.blinds.length||this.config.presets.length>=this.config.rows*this.config.columns}
        @click=${()=>this.addPreset()}
      >
        Add preset</button
      >${this.error?l`<span role="status">${this.error}</span>`:p}`}};customElements.get("kiosk-blind-presets-editor")||customElements.define("kiosk-blind-presets-editor",bt)});function yt(n,e){let t=n.map(o=>o.width??1),i=t.reduce((o,r)=>o+r,0),s=8;return Rt`<svg viewBox="0 0 120 100" aria-hidden="true" focusable="false">${n.map((o,r)=>{let c=(104-4*(n.length-1))*t[r]/i,a=s;s+=c+4;let d=e[r]??{top:0,bottom:100};return Rt`<g><rect x=${a} y="12" width=${c} height="76" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><rect data-fabric x=${a} y=${12+Math.min(74,76*d.top/100)} width=${c} height=${Math.max(2,76*(d.bottom-d.top)/100)} rx="1" fill="currentColor"/></g>`})}</svg>`}function Z(n){if(!n||!Number.isInteger(n.rows)||n.rows<1||n.rows>12||!Number.isInteger(n.columns)||n.columns<1||n.columns>12)throw Error("Rows and columns must be integers from 1 to 12");if(!Array.isArray(n.blinds)||!n.blinds.length||n.blinds.length>12)throw Error("Choose 1\u201312 blinds");let e=new Set;for(let t of n.blinds){if(!t||typeof t.entity!="string"||!/^cover\.[a-z0-9_]+$/.test(t.entity)||e.has(t.entity))throw Error("Choose unique cover entities");if(e.add(t.entity),t.width!==void 0&&(typeof t.width!="number"||!Number.isFinite(t.width)||t.width<=0||t.width>10))throw Error("Blind widths must be greater than 0 and at most 10");if(t.mapping!==void 0&&!["sequential-tdbu","independent-tdbu"].includes(t.mapping))throw Error("Choose sequential-tdbu or independent-tdbu mapping")}if(!Array.isArray(n.presets)||n.presets.length>n.rows*n.columns)throw Error("Remove presets before shrinking the grid");e.clear();for(let t of n.presets){if(!t||typeof t.id!="string"||!t.id.trim()||e.has(t.id)||typeof t.name!="string"||!t.name.trim())throw Error("Presets need unique IDs and accessible names");if(e.add(t.id),t.commands!==void 0&&t.actions!==void 0)throw Error("Use commands or actions, not both");if((t.commands!==void 0||t.actions!==void 0)&&gt(t.commands??t.actions,n.blinds.map(i=>i.entity)),!Array.isArray(t.positions)||t.positions.length!==n.blinds.length)throw Error("Each preset needs one position per blind");for(let i of t.positions)if(!i||![i.top,i.bottom].every(s=>typeof s=="number"&&Number.isFinite(s)&&s>=0&&s<=100)||i.top>i.bottom)throw Error("Coordinates must be 0\u2013100 with top \u2264 bottom")}}function j(n,e){return n.commands!==void 0||n.actions!==void 0?"":n.positions.some((t,i)=>e?.[i]?.mapping!=="independent-tdbu"&&t.top!==0&&t.bottom!==100)?"Unsupported sequential TDBU position: top must be 0 or bottom must be 100.":""}function vt(n){return!!n&&!["unknown","unavailable"].includes(n.state)&&["current_position","current_tilt_position"].every(e=>typeof n.attributes[e]=="number"&&Number.isFinite(n.attributes[e])&&n.attributes[e]>=0&&n.attributes[e]<=100)}function R(n,e){let t=n?.attributes[e?"rail_top":"rail_bottom"];return typeof t=="number"&&Number.isFinite(t)&&t>=0&&t<=100?t:void 0}function X(n,e){if(!n||!["open","closed","unknown"].includes(n.state))return!1;let t=r=>["OPEN","CLOSE"].includes(n.attributes[r?"motion_top":"motion_bottom"]);if(e.service==="open_cover"||e.service==="close_cover"){let r=R(n,!0),c=R(n,!1);return n.attributes.rails_known!==!1&&r!==void 0&&c!==void 0&&!t(!0)&&!t(!1)&&Math.abs(r)<=2&&Math.abs(c-(e.service==="open_cover"?0:100))<=2&&(e.service!=="close_cover"||n.state==="closed")}let i=e.service==="set_cover_tilt_position",s=R(n,i);if(s===void 0||t(i))return!1;let o=i?e.tilt_position:e.position;return Math.abs((i?s:100-s)-o)<=2}function qt(n,e){if(e.service==="set_cover_tilt_position"){let t=R(n,!1);return e.tilt_position===0||t!==void 0&&t>=e.tilt_position}if(e.service==="set_cover_position"){let t=R(n,!0);return e.position===0||t!==void 0&&t<=100-e.position}return!0}function Ae(n,e){return!!e.arrival&&X(n,e.arrival)&&(!e.safeFor||qt(n,e.safeFor))}function Ze(n,e,t){if(!e||!["open","closed","opening","closing","unknown"].includes(e.state))throw Error("Independent blind unavailable");let i={service:"set_cover_tilt_position",entity_id:n.entity,tilt_position:t.top},s={service:"set_cover_position",entity_id:n.entity,position:100-t.bottom},o=R(e,!0),r=R(e,!1),c=e.attributes.rails_known!==!1&&o!==void 0&&r!==void 0,a;if(!c)a=[{service:"set_cover_position",entity_id:n.entity,position:0},i,...t.bottom===100?[]:[s]];else{let h=t.top>r?[s,i]:[i,s];a=h.filter((u,f)=>!X(e,u)||f===0&&!qt(e,h[1]))}let d=e.attributes.supported_features;if(typeof d!="number"||!Number.isInteger(d)||a.some(h=>!(d&(h.service==="set_cover_tilt_position"?128:4))))throw Error("Required independent capability unavailable");return a.map((h,u)=>{let{service:f,...v}=h;return{service:f,data:v,arrival:h,safeFor:a[u+1]}})}function Se(n,e,t){return t?.mapping==="independent-tdbu"?n?.attributes.rails_known!==!1&&X(n,{service:"set_cover_tilt_position",entity_id:t.entity,tilt_position:e.top})&&X(n,{service:"set_cover_position",entity_id:t.entity,position:100-e.bottom}):vt(n)&&!["opening","closing"].includes(n.state)&&Math.abs((n.attributes.current_position>0?0:n.attributes.current_tilt_position)-e.top)<=2&&Math.abs(100-n.attributes.current_position-e.bottom)<=2}var _t,Lt=$(()=>{"use strict";k();P();Dt();_t=class extends b{constructor(){super(...arguments);this.cardWidth=320;this.busy=!1;this.error="";this.operation=0;this.acknowledged=!1}static async getConfigElement(){return await Promise.resolve().then(()=>(Ee(),Ce)),document.createElement("kiosk-blind-presets-editor")}static getStubConfig(t){let i=Object.keys(t?.states||{}).filter(s=>s.startsWith("cover.")).slice(0,3).map(s=>({entity:s,mapping:"sequential-tdbu",width:1}));return i.length||i.push({entity:"cover.example_blind",mapping:"sequential-tdbu",width:1}),{type:"custom:kiosk-blind-presets-card",rows:3,columns:3,blinds:i,presets:i.length?[{id:"closed",name:"Closed",positions:i.map(()=>({top:0,bottom:100}))}]:[]}}static{this.properties={hass:{attribute:!1},config:{state:!0},busy:{state:!0},error:{state:!0},cardWidth:{state:!0}}}connectedCallback(){super.connectedCallback(),this.resize=new ResizeObserver(t=>{this.cardWidth=t[0].contentRect.width}),this.resize.observe(this)}invalidate(){this.waiting?.resolve(!1),this.waiting=void 0,this.operation++,clearTimeout(this.watchdog),this.busy=!1,this.expected=void 0,this.acknowledged=!1}disconnectedCallback(){this.resize?.disconnect(),this.invalidate(),super.disconnectedCallback()}shouldUpdate(t){if(t.size!==1||!t.has("hass"))return!0;let i=t.get("hass");return!i||this.config.blinds.some(s=>i.states[s.entity]!==this.hass.states[s.entity])}willUpdate(){this.finishIfConfirmed()}finishIfConfirmed(){if(this.waiting&&Ae(this.hass.states[this.waiting.step.data.entity_id],this.waiting.step)){let t=this.waiting;this.waiting=void 0,t.resolve(!0)}this.busy&&this.acknowledged&&this.expected&&this.presetMatches(this.expected)&&this.invalidate()}presetMatches(t){let i=t.commands??t.actions;return i?i.length>0&&i.every(s=>this.commandMatches(s)):this.config.blinds.every((s,o)=>Se(this.hass.states[s.entity],t.positions[o],s))}isIndependent(t){return this.config.blinds.find(i=>i.entity===t)?.mapping==="independent-tdbu"}commandMatches(t){return this.isIndependent(t.entity_id)?X(this.hass.states[t.entity_id],t):$e(this.hass.states[t.entity_id],t)}commandAvailable(t){let i=this.hass.states[t.entity_id];if(!this.isIndependent(t.entity_id))return zt(i,t);let s=i?.attributes.supported_features,o={open_cover:1,close_cover:2,set_cover_position:4,set_cover_tilt_position:128}[t.service];return!!i&&["open","closed","opening","closing","unknown"].includes(i.state)&&typeof s=="number"&&Number.isInteger(s)&&(s&o)!==0}plan(t){Z(this.config);let i=t.commands??t.actions;if(i){let s=gt(i,this.config.blinds.map(o=>o.entity));if(!s.every(o=>this.commandAvailable(o)))throw Error("Required native attribute or capability unavailable");return s.flatMap(o=>{let{service:r,...c}=o;return this.commandMatches(o)?[]:[{service:r,data:c}]})}if(j(t,this.config.blinds))throw Error(j(t,this.config.blinds));return this.config.blinds.flatMap((s,o)=>{let r=this.hass.states[s.entity],c=t.positions[o];if(s.mapping==="independent-tdbu")return Ze(s,r,c);if(!vt(r))throw Error("Blind unavailable. Check device.");let a,d,h={entity_id:s.entity};if(c.top===0&&c.bottom===0?(a="open_cover",d=1):c.top===0&&c.bottom===100?(a="close_cover",d=2):c.bottom===100?(a="set_cover_tilt_position",d=128,h.tilt_position=c.top):(a="set_cover_position",d=4,h.position=100-c.bottom),!(Number(r.attributes.supported_features)&d))throw Error("Required blind capability is missing. Check device.");return Se(r,c)?[]:[{service:a,data:h}]})}async activate(t,i){if(i.stopPropagation(),this.busy||i.detail>1||!this.isConnected||!this.config.presets.includes(t))return;let s;try{s=this.plan(t)}catch(r){this.error=r.message;return}if(this.error="",!s.length)return;let o=++this.operation;this.busy=!0,this.expected=t,this.acknowledged=!1;try{for(let r of s){if(this.operation!==o||!this.isConnected)return;if(clearTimeout(this.watchdog),this.watchdog=setTimeout(()=>{this.operation===o&&(this.invalidate(),this.error="No confirmation. Check device.")},12e4),r.arrival?!this.commandAvailable(r.arrival):t.commands??t.actions?!this.commandAvailable({service:r.service,...r.data}):!vt(this.hass.states[r.data.entity_id]))throw Error("Unavailable");if(r.arrival&&!qt(this.hass.states[r.data.entity_id],r.arrival))throw Error("Unsafe rail boundary");if(await this.hass.callService("cover",r.service,r.data),this.operation!==o||r.arrival&&!Ae(this.hass.states[r.data.entity_id],r)&&(!await new Promise(a=>{this.waiting={step:r,resolve:a}})||this.operation!==o))return}if(this.operation!==o)return;this.acknowledged=!0,this.finishIfConfirmed()}catch{this.operation===o&&(this.invalidate(),this.error="Action failed. Check device.")}}setConfig(t){Z(t),this.invalidate(),this.error="",this.config=structuredClone(t)}getCardSize(){if(!this.config)return 1;let t=this.getBoundingClientRect().width||this.cardWidth,i=this.columnsForWidth(t),s=Math.ceil(this.config.rows*this.config.columns/i),o=Math.max(44,(t-(i-1)*12)/i/1.2133333);return Math.ceil((s*o+(s-1)*12)/50)}columnsForWidth(t){return Math.min(this.config.columns,Math.max(1,Math.floor((t+12)/56)))}getGridOptions(){return{columns:12,rows:"auto",min_columns:3}}static{this.styles=[w,m`
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
    `]}render(){return!this.config||!this.hass?p:l`<div
        class="matrix"
        style=${`grid-template-columns:repeat(${this.columnsForWidth(this.cardWidth)},minmax(44px,1fr))`}
      >
        ${this.config.presets.map(t=>{let i=j(t,this.config.blinds)||((t.commands??t.actions?(t.commands??t.actions).every(o=>this.commandAvailable(o)):this.config.blinds.every(o=>o.mapping==="independent-tdbu"?!!this.hass.states[o.entity]&&this.hass.states[o.entity].state!=="unavailable":vt(this.hass.states[o.entity])))?"":"Blind unavailable"),s=!i&&this.presetMatches(t);return l`<button
            type="button"
            class=${`tile ${s?"active":""}`}
            aria-label=${t.name}
            ?disabled=${!!i||this.busy}
            @click=${o=>this.activate(t,o)}
            @keydown=${o=>{o.repeat&&o.preventDefault()}}
            aria-pressed=${String(s)}
          >
            ${yt(this.config.blinds,t.positions)}
          </button>`})}${Array.from({length:this.config.rows*this.config.columns-this.config.presets.length},()=>l`<div class="slot" aria-hidden="true"></div>`)}
      </div>`}};customElements.get("kiosk-blind-presets-card")||customElements.define("kiosk-blind-presets-card",_t)});k();G();var pe={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},he=n=>(...e)=>({_$litDirective$:n,values:e}),pt=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};var ue="important",Ge=" !"+ue,x=he(class extends pt{constructor(n){if(super(n),n.type!==pe.ATTRIBUTE||n.name!=="style"||n.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(n){return Object.keys(n).reduce((e,t)=>{let i=n[t];return i==null?e:e+`${t=t.includes("-")?t:t.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${i};`},"")}update(n,[e]){let{style:t}=n.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(e)),this.render(e);for(let i of this.ft)e[i]==null&&(this.ft.delete(i),i.includes("-")?t.removeProperty(i):t[i]=null);for(let i in e){let s=e[i];if(s!=null){this.ft.add(i);let o=typeof s=="string"&&s.endsWith(Ge);i.includes("-")||o?t.setProperty(i,o?s.slice(0,-11):s,o?ue:""):t[i]=s}}return E}});P();Ot();k();var T=n=>({name:n,selector:{text:{}}}),_=(n,e={})=>({name:n,selector:{entity:e}}),ht=class extends b{constructor(){super(...arguments);this.label=t=>this.config.type==="custom:kiosk-pill-card"&&t.name==="background"?"Background":{aqhi_entity:"Local Canadian PM2.5 smoke index",regional_entity:"Regional Canadian AQHI (optional)",category_entity:"Canadian smoke risk category sensor",source_entity:"Source PM2.5 sensor",data_expected_entity:"History ready timestamp (optional)",stale_after_minutes:"Stale after (minutes; default 120)",location:"Location (optional)",entity:"Primary entity (body more-info target)",door_entity:"Door contact or cover (optional override)",lock_entity:"Linked lock",temperature_format:"Temperature number format",hvac_colors:"HVAC action colors (optional)",status_entity:"Status message sensor",status_active_entity:"Status active sensor",trend_entity:"Temperature trend sensor",name:"Name",icon:"Icon",area:"Area",navigation_path:"Navigation path",temperature_entity:"Temperature sensor",occupancy_entity:"Occupancy sensor",light_entities:"Lights (optional override)",var_large:"Large",show_name:"Show name",show_state:"Show state",show_icon:"Show icon",state_display:"State text (optional override)",detail:"Detail (optional override)",interactions:"Interactions",dynamic:"Declarative rules (advanced, optional)",presentation:"Presentation expressions",action_rules:"Conditional actions",appearance:"Appearance (optional)",icon_color:"Category color (CSS color)",background:"Off background",active_background:"Active background",radius:"Corner radius",tap_action:"Body tap",hold_action:"Body hold",double_tap_action:"Body double tap",icon_tap_action:"Icon tap",icon_hold_action:"Icon hold",icon_double_tap_action:"Icon double tap"}[t.name]||t.name}static{this.properties={hass:{attribute:!1},config:{state:!0}}}static{this.styles=m`
    :host {
      display: block;
    }
    p {
      color: var(--secondary-text-color);
      font-size: 14px;
    }
  `}setConfig(t){this.config={...t}}get schema(){if(this.config.type==="custom:kiosk-air-card")return[_("aqhi_entity",{filter:{domain:"sensor"}}),_("regional_entity",{filter:{domain:"sensor"}}),_("category_entity",{filter:{domain:"sensor"}}),_("source_entity",{filter:{domain:"sensor"}}),_("data_expected_entity",{filter:{domain:"sensor",device_class:"timestamp"}}),T("name"),T("location"),{name:"icon",selector:{icon:{}}},{name:"stale_after_minutes",selector:{number:{min:1,max:1440,mode:"box",unit_of_measurement:"min"}}},{name:"appearance",type:"expandable",schema:["icon_color","background","radius"].map(T)}];let i=this.config.type==="custom:kiosk-room-card",s=this.config.type==="custom:kiosk-action-card",o=this.config.type==="custom:kiosk-pill-card",r=this.config.type==="custom:kiosk-door-card",c=this.config.type==="custom:kiosk-climate-card",a=this.config.type==="custom:kiosk-status-card",d=i?[{name:"area",selector:{area:{}}},T("name"),{name:"icon",selector:{icon:{}}},T("navigation_path"),_("temperature_entity",{filter:{domain:"sensor",device_class:"temperature"}}),_("occupancy_entity",{filter:{domain:"binary_sensor"}}),_("light_entities",{multiple:!0,filter:{domain:"light"}})]:[_("entity",s?{filter:{domain:["script","scene","button"]}}:r?{filter:{domain:["binary_sensor","cover","lock"]}}:c?{filter:{domain:"climate"}}:{}),T("name"),{name:"icon",selector:{icon:{}},context:{icon_entity:"entity"}}],h=i?[]:[{name:"interactions",type:"expandable",flatten:!0,schema:["tap_action","hold_action","double_tap_action","icon_tap_action","icon_hold_action","icon_double_tap_action"].map(u=>({name:u,selector:{ui_action:{default_action:s?"none":u==="icon_tap_action"?!o&&["light","switch","input_boolean"].includes((this.config.entity||"").split(".")[0])?"toggle":"more-info":u.includes("double")?"none":"more-info"}},context:{entity:"entity"}}))}];return[...d,...r?[_("door_entity",{filter:{domain:["binary_sensor","cover"]}}),_("lock_entity",{filter:{domain:"lock"}})]:[],...c?[{name:"temperature_format",selector:{select:{options:["locale","legacy"]}}},{name:"hvac_colors",selector:{object:{}}}]:[],...a?[_("status_entity"),_("status_active_entity",{filter:{domain:"binary_sensor"}}),_("trend_entity",{filter:{domain:"sensor"}})]:[],...o?["show_name","show_state","show_icon"].map(u=>({name:u,selector:{boolean:{}}})):a?[]:[{name:"var_large",selector:{boolean:{}}}],...i?[]:[T(o?"state_display":"detail")],...h,...i?[]:[{name:"dynamic",type:"expandable",flatten:!0,schema:["presentation","action_rules"].map(u=>({name:u,selector:{object:{}}}))}],{name:"appearance",type:"expandable",schema:(o?["icon_color","background","radius"]:["icon_color","background","active_background","radius"]).map(T)}]}change(t){t.stopPropagation();let i=t.detail.value;this.config={...this.config,...i},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this.config},bubbles:!0,composed:!0}))}render(){return!this.config||!this.hass?p:l`<ha-form
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
      </p>`}};customElements.get("kiosk-card-editor")||customElements.define("kiosk-card-editor",ht);var Qe=new Set(["if","eq","ne","includes","in","and","or","not","defined","finite","number","round","gt","lt","concat","capitalize","map","countdown","minutes"]);function V(n,e=0){if(e>24)throw Error("Rule nesting exceeds 24");if(!(!n||typeof n!="object")){if(Array.isArray(n)){if(n.length>100)throw Error("Rule list too large");n.forEach(t=>V(t,e+1));return}if(n.op!==void 0){if(!Qe.has(n.op)||!Array.isArray(n.args)||n.args.length>100)throw Error("Unknown rule operation");n.args.forEach(t=>V(t,e+1))}else if(n.entity!==void 0||n.attribute!==void 0||n.state!==void 0||n.last_changed!==void 0){if(n.attribute&&["__proto__","constructor","prototype"].includes(n.attribute))throw Error("Unsafe attribute");if(n.entity!==void 0&&typeof n.entity!="string")throw Error("Rule entity must be a string")}else Object.values(n).forEach(t=>V(t,e+1))}}function ut(n,e,t,i=Date.now()){if(!n||typeof n!="object")return n;if(!n.op){if(n.entity!==void 0||n.attribute!==void 0||n.state!==void 0||n.last_changed!==void 0){let o=e?.states[n.entity||t.entity||""];return n.attribute!==void 0?o?.attributes[n.attribute]:n.last_changed?o?.last_changed:o?.state}return n}let s=o=>ut(n.args[o],e,t,i);switch(n.op){case"if":return s(0)?s(1):s(2);case"eq":return s(0)===s(1);case"ne":return s(0)!==s(1);case"includes":return typeof s(0)=="string"&&s(0).includes(s(1));case"in":return Array.isArray(s(1))&&s(1).includes(s(0));case"and":return n.args.every((o,r)=>!!s(r));case"or":return n.args.some((o,r)=>!!s(r));case"not":return!s(0);case"defined":return s(0)!==void 0;case"finite":return Number.isFinite(s(0));case"number":return Number(s(0));case"round":return Math.round(Number(s(0)));case"gt":return s(0)>s(1);case"lt":return s(0)<s(1);case"concat":return n.args.map((o,r)=>s(r)??"").join("");case"capitalize":{let o=String(s(0)??"");return o.charAt(0).toUpperCase()+o.slice(1)}case"map":{let o=s(1);return Object.hasOwn(o,String(s(0)))?o[String(s(0))]:o.default??s(2)}case"minutes":{let o=Date.parse(s(0));return Number.isFinite(o)?Math.max(0,Math.ceil((o-i)/6e4)):NaN}case"countdown":{let o=Date.parse(s(0));if(!Number.isFinite(o))return s(1)??"";let r=Math.max(0,Math.ceil((o-i)/6e4)),c=Math.floor(r/60);return c>0?`${c}h ${String(r%60).padStart(2,"0")}m left`:`${r}m left`}}}function be(n){return/"op":"(?:countdown|minutes)"/.test(JSON.stringify(n.presentation))}function ye(n){V(n.presentation);for(let[e,t]of Object.entries(n.action_rules||{})){if(!/^(icon_)?(tap|hold|double_tap)_action$/.test(e)||!Array.isArray(t)||t.length>100)throw Error("Invalid action rules");for(let i of t)if(V(i.when),!i.action||typeof i.action.action!="string")throw Error("Rule requires action")}}var ve=new Set(["light","switch","input_boolean"]);function _e(n,e,t){n.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}var Je=new Set(["off","closed","idle","paused","standby","away","docked","unknown","unavailable","locked","disarmed"]),g=class extends b{constructor(){super(...arguments);this.busy=!1;this.confirming=!1;this.error="";this.operation=0;this.acknowledged=!1;this.held=!1}static{this.properties={hass:{attribute:!1},config:{state:!0},busy:{state:!0},error:{state:!0},confirming:{state:!0}}}connectedCallback(){super.connectedCallback(),this.startClock()}startClock(){clearInterval(this.clock),this.isConnected&&this.config&&be(this.config)&&(this.clock=setInterval(()=>this.requestUpdate(),3e4))}presentation(t){let i=this.config.presentation?.[t];return i===void 0?void 0:ut(i,this.hass,this.config)}resolvedAction(t,i){return this.config.action_rules?.[t]?.find(o=>ut(o.when,this.hass,this.config))?.action||i}action(t,i="tap"){let s=(t==="icon"?"icon_":"")+i+"_action";return this.resolvedAction(s,this.config[s]||{action:i==="tap"?t==="icon"&&this.available&&ve.has((this.config.entity||"").split(".")[0])?"toggle":"more-info":i==="hold"?"more-info":"none"})}async runAction(t,i,s="tap"){i.stopPropagation();let o=this.action(t,s);if(o.action==="none"||this.busy||this.confirming)return;let r=this.config,c=o.confirmation;if(c&&!(typeof c=="object"&&c.exemptions?.some(v=>v.user===this.hass.user?.id))){let v=this.operation;this.confirming=!0;let A=await ge(this,typeof c=="object"?c:{});if(this.operation!==v||(this.confirming=!1,!A||!this.isConnected||this.config!==r))return}if(o.action==="more-info"){_e(this,"hass-more-info",{entityId:o.entity||this.config.entity});return}if(!["toggle","perform-action","call-service"].includes(o.action)){let{confirmation:v,...A}=o;_e(this,"hass-action",{config:{...this.config,tap_action:A},action:"tap"});return}if(!this.available)return;let a,d,h,u=o.target;if(o.action==="toggle"){if(a=(this.config.entity||"").split(".")[0],!ve.has(a)){this.error="Choose an explicit action for this device.";return}this.expected=this.state?.state==="on"?"off":"on",d=this.expected==="on"?"turn_on":"turn_off",h={entity_id:this.config.entity}}else{if([a,d]=(o.perform_action||o.service||"").split("."),!a||!d){this.error="Choose an action.";return}h=o.data??o.service_data,this.expected=void 0}let f=++this.operation;this.busy=!0,this.error="",this.acknowledged=!1,this.watchdog=setTimeout(()=>{this.operation===f&&(this.operation++,this.busy=!1,this.error="No confirmation. Check device.")},12e3);try{if(await this.hass.callService(a,d,h,u),this.operation!==f)return;this.acknowledged=!0,this.finishIfConfirmed()}catch{this.operation===f&&(this.operation++,this.busy=!1,clearTimeout(this.watchdog),this.error="Action failed. Check device.")}}finishIfConfirmed(){this.busy&&this.acknowledged&&(!this.expected||this.state?.state===this.expected)&&(this.busy=!1,this.expected=void 0,clearTimeout(this.watchdog))}updated(){this.finishIfConfirmed()}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this.clock),clearTimeout(this.watchdog),clearTimeout(this.holdTimer),clearTimeout(this.tapTimer),this.operation++,this.busy=!1}pointerDown(t,i){i.stopPropagation(),i.button===0&&(this.held=!1,clearTimeout(this.holdTimer),this.holdTimer=setTimeout(()=>{this.held=!0,clearTimeout(this.tapTimer),this.runAction(t,i,"hold")},500))}pointerEnd(t){t.stopPropagation(),clearTimeout(this.holdTimer)}tap(t,i){if(i.stopPropagation(),this.held){this.held=!1;return}if(i.detail===0||this.action(t,"double_tap").action==="none"){this.runAction(t,i);return}i.detail>1?(clearTimeout(this.tapTimer),this.runAction(t,i,"double_tap")):this.tapTimer=setTimeout(()=>void this.runAction(t,i),300)}static async getConfigElement(){return window.loadCardHelpers&&await H(["ha-form"]),document.createElement("kiosk-card-editor")}static getStubConfig(t,i=[]){return{entity:i.find(s=>t.states[s])||Object.keys(t.states).find(s=>s.startsWith("light."))||Object.keys(t.states)[0]}}static{this.styles=w}applyConfig(t){ye(t);let i=t.var_large??t.variables?.var_large;if(i!==void 0&&typeof i!="boolean")throw Error("var_large must be a boolean");clearTimeout(this.watchdog),clearTimeout(this.holdTimer),clearTimeout(this.tapTimer),this.operation++,this.busy=!1,this.confirming=!1,this.expected=void 0,this.error="",this.config={...t},this.startClock()}setConfig(t){if(!t.entity)throw new Error("Choose an entity");this.applyConfig(t)}getCardSize(){return this.large?3:1.38}getGridOptions(){return{columns:6,rows:"auto"}}get state(){return this.hass?.states[this.config?.entity||""]}get active(){return!!this.state&&(this.config.active_states?this.config.active_states.includes(this.state.state):!Je.has(this.state.state))}get cardTitle(){return(this.presentation("name")??this.config.name)||this.state?.attributes.friendly_name||this.config.entity||"Entity"}get detail(){let t=this.presentation("detail");if(t!==void 0)return String(t);if(this.config.detail!==void 0)return this.config.detail;let i=this.state;if(!i)return"Unavailable";if(i.state==="on"&&i.entity_id.startsWith("light.")&&i.attributes.brightness)return`${Math.round(i.attributes.brightness/2.55)}%`;if(i.entity_id.startsWith("climate.")&&!["unknown","unavailable"].includes(i.state)){let o=i.attributes;if(o.target_temp_low!=null&&o.target_temp_high!=null)return`${o.target_temp_low}\xB0\u2013${o.target_temp_high}\xB0`;if(o.temperature!=null)return`${o.temperature}\xB0`;if(o.current_temperature!=null)return`${o.current_temperature}\xB0 (${i.state.charAt(0).toUpperCase()+i.state.slice(1)})`}let s=this.hass.formatEntityState?.(i)||i.state;return s.charAt(0).toUpperCase()+s.slice(1)}get available(){return!!this.state&&!["unknown","unavailable"].includes(this.state.state)}get isAction(){return!1}get large(){return(this.config.var_large??this.config.variables?.var_large)===!0}get cardIcon(){return this.presentation("icon")??this.config.icon}get surfaceStyles(){return{}}get iconContent(){return this.cardIcon?l`<ha-icon .icon=${this.cardIcon}></ha-icon>`:l`<ha-state-icon .hass=${this.hass} .stateObj=${this.state} .stateColor=${!1}></ha-state-icon>`}render(){if(!this.config||!this.hass)return p;let t=this.config.appearance;return l`<ha-card
      part="surface"
      aria-busy=${String(this.busy)}
      class=${[this.active?"active":"",this.available?"":"unavailable",this.isAction?"action":"",this.large?"large":""].join(" ")}
      style=${x({"--kiosk-icon-color":t?.icon_color,"--kiosk-default-icon-color":this.config.entity?.startsWith("light.")?"var(--accent-color,#3bc8ce)":void 0,"--kiosk-background":t?.background,"--kiosk-active-background":t?.active_background,"--kiosk-radius":t?.radius,...this.surfaceStyles})}
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
        >${this.detail?l`<span part="detail">${this.detail}</span>`:p}</button
      >${this.error?l`<span part="feedback" role="status">${this.error}</span>`:p}</ha-card
    >`}},Q=class extends g{},J=class extends g{static getStubConfig(e,t=[]){let s=[...t,...Object.keys(e.states)].find(o=>["script","scene","button"].includes(o.split(".")[0]));return s?{entity:s}:{name:"Action"}}setConfig(e){if(!e.entity&&!e.name)throw Error("Choose an entity or name");if(e.entity&&!["script","scene","button"].includes(e.entity.split(".")[0]))throw Error("Action entities must be scripts, scenes or buttons");this.applyConfig(e)}get isAction(){return!0}get cardIcon(){return(this.presentation("icon")??this.config.icon)||(this.state?void 0:"mdi:play")}get active(){return!0}get detail(){return this.config.detail||(this.available?"":"Unavailable")}get available(){return!this.config.entity||super.available}action(e,t="tap"){let i=(e==="icon"?"icon_":"")+t+"_action";return this.resolvedAction(i,this.config[i]||(e==="icon"&&t==="tap"?this.config.tap_action:void 0)||{action:"none"})}};Lt();P();var Y=class extends g{static getStubConfig(){return{name:"Room",navigation_path:"/lovelace"}}setConfig(e){if(!e.area&&!e.name)throw Error("Choose an area or name");this.applyConfig(e)}get cardTitle(){return this.config.name||this.hass.areas?.[this.config.area||""]?.name||"Room"}get cardIcon(){return this.config.icon||this.hass.areas?.[this.config.area||""]?.icon||"mdi:home-outline"}get available(){return!0}get active(){return this.lights.some(e=>e.state==="on")||(this.config.occupancy_entity?this.hass.states[this.config.occupancy_entity]?.state==="on":this.roomStates.some(e=>e.entity_id.startsWith("binary_sensor.")&&["occupancy","presence","motion"].includes(e.attributes.device_class)&&e.state==="on"))}get roomStates(){return this.config.area?Object.values(this.hass.states).filter(e=>{let t=this.hass.entities?.[e.entity_id];return!t||t.hidden||t.hidden_by||t.disabled_by?!1:(t.area_id||this.hass.devices?.[t.device_id]?.area_id)===this.config.area}):[]}get lights(){return this.config.light_entities!==void 0?this.config.light_entities.map(e=>this.hass.states[e]||{entity_id:e,state:"unavailable",attributes:{}}):this.roomStates.filter(e=>e.entity_id.startsWith("light."))}get detail(){let e=this.roomStates,t=this.config.temperature_entity?this.hass.states[this.config.temperature_entity]||{entity_id:this.config.temperature_entity,state:"unavailable",attributes:{}}:e.find(r=>r.attributes.device_class==="temperature"),i=this.config.occupancy_entity?this.hass.states[this.config.occupancy_entity]||{entity_id:this.config.occupancy_entity,state:"unavailable",attributes:{}}:e.find(r=>r.entity_id.startsWith("binary_sensor.")&&["occupancy","presence","motion"].includes(r.attributes.device_class)),s=[];t&&s.push(["unknown","unavailable"].includes(t.state)?"Temperature unavailable":`${t.state}${t.attributes.unit_of_measurement?" "+t.attributes.unit_of_measurement:""}`),i&&s.push(i.state==="on"?"Occupied":i.state==="off"?"Clear":"Occupancy unavailable");let o=this.lights;if(o.length){let r=o.filter(a=>a.state==="on").length,c=o.filter(a=>["unknown","unavailable"].includes(a.state)).length;r?s.push(`${r} light${r===1?"":"s"} on`):c<o.length&&s.push("Lights off"),c&&s.push(`${c} unavailable`)}return s.join(" \xB7 ")}action(e,t="tap"){return t==="tap"&&this.config.navigation_path?{action:"navigate",navigation_path:this.config.navigation_path}:{action:"none"}}};k();P();var tt=class extends g{static{this.styles=m`
    ${w}${Ut}
  `}setConfig(e){if(!e.entity)throw Error("Choose an entity");if(e.var_large??e.variables?.var_large)throw Error("Pills are compact; Large is not supported");for(let t of["show_name","show_state","show_icon"])if(e[t]!==void 0&&typeof e[t]!="boolean")throw Error(`${t} must be a boolean`);if(e.show_name===!1&&e.show_state===!1&&e.show_icon===!1)throw Error("Show at least one pill field");this.applyConfig(e)}get large(){return!1}get active(){return!1}getCardSize(){return 1}get detail(){let e=this.presentation("state_display");if(e!==void 0)return String(e);let t=this.state;if(this.config.state_display!==void 0)return this.config.state_display;let i=t?this.config.state_labels?.[t.state]??this.config.state_labels?.default:void 0;if(i!==void 0)return i;if(!t)return"Unavailable";let s=this.hass.formatEntityState?.(t)||t.state;return s.charAt(0).toUpperCase()+s.slice(1)}action(e,t="tap"){let i=(e==="icon"?"icon_":"")+t+"_action";return this.resolvedAction(i,this.config[i]||(e==="icon"?this.config[t+"_action"]:void 0)||{action:t==="double_tap"?"none":"more-info"})}disabled(e){return this.busy||this.confirming||!this.available&&["toggle","perform-action","call-service"].includes(this.action(e).action)}render(){if(!this.config||!this.hass)return p;let e=this.config.appearance,t=this.config.show_name!==!1,i=this.config.show_state!==!1;return l`<ha-card
      part="surface"
      aria-busy=${String(this.busy)}
      class=${`pill ${t?"":"no-name"} ${i?"":"no-state"} ${this.available?"":"unavailable"}`}
      style=${x({"--kiosk-background":e?.background,"--kiosk-icon-color":e?.icon_color,"--kiosk-radius":e?.radius})}
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
        ${t?l`<span part="title">${this.cardTitle}</span>`:p}${i?l`<span part="detail">${this.detail}</span>`:p}</button
      >${this.error?l`<span part="feedback" role="status">${this.error}</span>`:p}</ha-card
    >`}};k();var et=class extends g{static{this.styles=m`${g.styles} .unavailable [part="icon-circle"] { opacity: 1; }`}static getStubConfig(e){return{entity:Object.keys(e?.states||{}).find(i=>["binary_sensor","cover","lock"].includes(i.split(".")[0]))||"binary_sensor.example_door"}}setConfig(e){if(!e.entity)throw Error("Choose a door or lock entity");if(!["binary_sensor","cover","lock"].includes(e.entity.split(".")[0]))throw Error("Choose a contact, cover or lock");if(e.lock_entity&&!e.lock_entity.startsWith("lock."))throw Error("Choose a lock entity");this.applyConfig(e)}get lockEntity(){return this.config.lock_entity||(this.config.entity?.startsWith("lock.")?this.config.entity:void 0)}get doorEntity(){return this.config.door_entity||(this.config.entity?.startsWith("lock.")?void 0:this.config.entity)}get lockState(){return this.hass?.states[this.lockEntity||""]}get doorState(){return this.hass?.states[this.doorEntity||""]?.state||"unknown"}get closed(){return["off","closed"].includes(this.doorState)}get open(){return["on","open"].includes(this.doorState)}get active(){return!(this.lockState?.state==="locked"&&this.closed)}get detail(){let e=this.presentation("detail")??this.config.detail;if(e!==void 0)return String(e);let t=this.open?"open":this.closed?"closed":this.doorState;return this.lockEntity?`${t} / ${this.lockState?.state||"unknown"}`:t}get cardIcon(){let e=super.cardIcon;if(e)return e;let t=this.lockState?.state;return t==="locked"&&this.closed?"mdi:door-closed-lock":t==="locked"&&this.open?"mdi:door-closed-cancel":t==="unlocked"&&this.closed?"mdi:lock-open":t==="unlocked"&&this.open?"mdi:door-open":this.lockState?.attributes.icon||"mdi:lock-question"}get surfaceStyles(){return{"--kiosk-glyph":this.active?"white":this.config.appearance?.icon_color||"#3bc8ce"}}action(e,t="tap"){let i=(e==="icon"?"icon_":"")+t+"_action";return this.resolvedAction(i,this.config[i]||{action:t==="double_tap"?"none":"more-info",...e==="icon"&&this.lockEntity?{entity:this.lockEntity}:{}})}};k();P();var it=class extends g{static{this.styles=fe}static getStubConfig(e){return{entity:Object.keys(e?.states||{}).find(t=>t.startsWith("climate."))||"climate.example"}}setConfig(e){if(!e.entity?.startsWith("climate."))throw Error("Choose a climate entity");this.applyConfig(e)}temperature(e){return this.config.temperature_format==="legacy"?String(e):typeof e!="number"||!Number.isFinite(e)?"\u2014":new Intl.NumberFormat(this.hass.locale?.language||"en",{maximumFractionDigits:2}).format(e)}get active(){return!!this.state&&!["off","idle","standby","away"].includes(this.state.state)}get detail(){let e=this.presentation("detail")??this.config.detail;if(e!==void 0)return String(e);let t=this.state;if(!t)return"Unavailable";let i=t.attributes,s=t.state,o=r=>this.temperature(r)+"\xB0";return s==="off"?"Off":s==="fan_only"?"Fan On":s==="heat"||s==="cool"?`${o(i.temperature)} / ${s} mode`:i.target_temp_low!==void 0&&i.target_temp_high!==void 0?`${o(i.target_temp_low)}\u2013${o(i.target_temp_high)}`:i.temperature!==null&&(i.temperature!==void 0||this.config.temperature_format==="legacy")?o(i.temperature):`${o(i.current_temperature)} (${s.charAt(0).toUpperCase()+s.slice(1)})`}get iconContent(){return l`<span part="temperature">${this.temperature(this.state?.attributes.current_temperature)}°</span>`}get surfaceStyles(){let e=this.config.hvac_colors;return{"--kiosk-temperature-color":e?.[this.state?.attributes.hvac_action]||e?.default||this.config.appearance?.icon_color||"var(--accent-color)","--kiosk-height":this.large?"145px":"68px"}}};k();P();var st=class extends g{static{this.styles=me}static getStubConfig(e){return{entity:Object.keys(e?.states||{}).find(t=>t.startsWith("sensor.")&&e?.states[t].attributes.device_class==="temperature")||"sensor.example_temperature"}}get active(){return this.hass?.states[this.config.status_active_entity||""]?.state==="on"}get value(){let e=this.state?.state||"unavailable",t=parseFloat(e);return Number.isFinite(t)?t.toFixed(0):e}get message(){let e=this.hass?.states[this.config.status_entity||""]?.state;return e&&e!=="clear"?e:""}get trendColor(){let e=parseFloat(this.hass?.states[this.config.trend_entity||""]?.state||"");return Number.isFinite(e)?e>=3?"#ff1744":e>=1.5?"#ff6d00":e>=.5?"#ffd600":e<=-3?"#2962ff":e<=-1.5?"#00b0ff":e<=-.5?"#00e5ff":"white":"white"}render(){return!this.config||!this.hass?p:l`<ha-card part="surface" class=${this.active?"active":""} style=${x({"--kiosk-background":this.config.appearance?.background||"var(--ha-card-background,var(--card-background-color))","--kiosk-radius":this.config.appearance?.radius})}>
   <button part="body-target" aria-label=${this.cardTitle} @click=${e=>this.tap("body",e)} @pointerdown=${e=>this.pointerDown("body",e)} @pointerup=${this.pointerEnd} @pointercancel=${this.pointerEnd} @pointerleave=${this.pointerEnd}>
    ${this.active?l`<span part="status">${this.message}</span>`:l`<span part="pad" aria-hidden="true">°</span><span part="value">${this.value}</span><span part="degree" style=${x({color:this.trendColor})}>°</span>`}
   </button>
  </ha-card>`}};k();P();var nt=[{key:"low",label:"Low risk",color:"var(--blue-color,#3188b5)",sentence:"Low particle levels around your home."},{key:"moderate",label:"Moderate risk",color:"var(--warning-color,#d1bb60)",sentence:"Moderate particle levels around your home."},{key:"high",label:"High risk",color:"var(--error-color,#c9706e)",sentence:"High particle levels around your home."},{key:"very_high",label:"Very high risk",color:"var(--deep-purple-color,#8c6373)",sentence:"Very high particle levels around your home."}],Wt=n=>n&&/^\d+(\.\d+)?$/.test(n.state)&&Number.isFinite(Number(n.state))?Number(n.state):NaN,y=(n,e)=>({label:n,sentence:e,index:-1,value:"\u2014",color:"var(--disabled-text-color,#888)"}),Pe=n=>n<=3?0:n<=6?1:n<=10?2:3,ot=class extends g{static{this.styles=m`${w}
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

  `}connectedCallback(){super.connectedCallback(),this.freshnessClock=setInterval(()=>this.requestUpdate(),3e4)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this.freshnessClock)}static getStubConfig(){return{aqhi_entity:"sensor.example_smoke_index",category_entity:"sensor.example_smoke_category",source_entity:"sensor.example_pm25"}}setConfig(e){for(let t of["aqhi_entity","category_entity","source_entity"])if(typeof e[t]!="string"||!/^sensor\.[a-z0-9_]+$/.test(e[t]))throw Error(`Choose a sensor for ${t}`);for(let t of["data_expected_entity","regional_entity"])if(e[t]&&(typeof e[t]!="string"||!/^sensor\.[a-z0-9_]+$/.test(e[t])))throw Error(`Choose a sensor for ${t}`);if(e.stale_after_minutes!==void 0&&(!Number.isFinite(e.stale_after_minutes)||e.stale_after_minutes<1||e.stale_after_minutes>1440))throw Error("stale_after_minutes must be between 1 and 1440");this.applyConfig(e)}getCardSize(){return this.config?.regional_entity?7:4}getGridOptions(){return{columns:12,rows:"auto",min_columns:6}}moreInfo(e,t){e.stopPropagation(),this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:t},bubbles:!0,composed:!0}))}timestampFreshness(e,t=this.config.stale_after_minutes??120){let i=e.map(s=>{if(typeof s!="string"||!/^\d{4}-\d{2}-\d{2}T([01]\d|2[0-3]):[0-5]\d:[0-5]\d(\.\d+)?(Z|[+-]\d{2}:\d{2})$/.test(s))return NaN;let o=Date.parse(s);return Number.isFinite(o)&&new Date(s.slice(0,10)+"T00:00:00Z").toISOString().slice(0,10)===s.slice(0,10)?o:NaN});return i.some(s=>!Number.isFinite(s)||s>Date.now()+6e4)?"Unknown":i.some(s=>Date.now()-s>t*6e4)?"Stale":void 0}freshness(e){return this.timestampFreshness(e.map(t=>t?.last_reported??t?.last_updated))}get local(){let e=this.hass.states,t=e[this.config.aqhi_entity],i=e[this.config.source_entity],s=e[this.config.category_entity];if([t,i,s].some(f=>!f||f.state==="unavailable"))return y("Unavailable","The local air sensor is unavailable.");if(!Number.isFinite(Wt(i)))return y("Unknown","Waiting for a local particle reading.");let o=t.attributes;if(!(o.index_type==="canadian_aqhi_smoke_pm25"&&o.scope==="local_pm25_only_estimate")||o.source_entity!==this.config.source_entity)return y("Unknown","Choose a matching Canadian PM2.5 smoke estimate sensor.");let c=this.timestampFreshness([o.evaluated_at]);if(c)return y(c,"Waiting for a recent smoke calculation.");if(o.status==="source_stale")return y("Stale","Waiting for a recent particle reading.");if(o.status==="incomplete_history")return y("Warming up","Gathering enough particle history.");if(o.status==="history_unavailable")return y("Unavailable","Particle history is unavailable.");if(o.status!=="valid")return y("Unknown","Waiting for a valid particle reading.");let a=o.source_max_age_minutes;if(typeof a!="number"||!Number.isFinite(a)||a<=0)return y("Unknown","Waiting for source freshness metadata.");let d=this.timestampFreshness([o.source_last_reported],Math.min(a,this.config.stale_after_minutes??120));if(d)return y(d,"Waiting for a recent particle reading.");let h=Wt(t);if(!Number.isInteger(h)||h<1||h>11||!nt.some(f=>f.key===s.state)){let f=Date.parse(e[this.config.data_expected_entity||""]?.state||"");return(t.state==="unknown"||s.state==="unknown")&&f>Date.now()?y("Warming up","Gathering enough particle history."):y("Unknown","Waiting for a calculated Canadian smoke index.")}let u=Pe(h);return nt[u].key!==s.state?y("Updating","Waiting for matching Canadian smoke readings."):{...nt[u],index:u,value:h===11?"10+":String(h)}}get regional(){let e=this.hass.states[this.config.regional_entity];if(!e||e.state==="unavailable")return y("Unavailable","Regional AQHI is unavailable.");let t=Wt(e),i=e.state==="10+";if(!i&&(!Number.isFinite(t)||t<0))return y("Unknown","Waiting for regional AQHI.");let s=this.freshness([e]);if(s)return y(s,"Waiting for recent regional AQHI.");let o=i?11:Math.max(1,Math.round(t)),r=Pe(o);return{...nt[r],index:r,value:o>10?"10+":String(o)}}render(){if(!this.config||!this.hass)return p;let e=this.local,t=this.regional,i=this.hass.states[this.config.regional_entity];return l`<ha-card part="surface" style=${x({"--air-color":e.color,"--kiosk-background":this.config.appearance?.background,"--kiosk-radius":this.config.appearance?.radius,"--kiosk-icon-color":this.config.appearance?.icon_color})}>
      <div class="local-summary" role="button" tabindex="0" aria-label=${`${this.config.name||"Outside air"}: local Canadian smoke history`} aria-description="Local PM2.5-only Canadian smoke estimate, not full regional AQHI. Bands: low 1–3, moderate 4–6, high 7–10, very high 10+." title="Canadian PM2.5-only smoke estimate, not the full regional multi-pollutant AQHI." @click=${s=>this.moreInfo(s,this.config.aqhi_entity)} @keydown=${s=>{(s.key==="Enter"||s.key===" ")&&(s.preventDefault(),s.repeat||this.moreInfo(s,this.config.aqhi_entity))}}>
      <div class="identity"><span part="icon-circle" aria-hidden="true"><ha-icon .icon=${this.config.icon||"mdi:weather-windy"}></ha-icon></span><div><span part="title">${this.config.name||"Outside air"}</span>${this.config.location?l`<span part="detail">${this.config.location}</span>`:p}</div></div>
      <div role="status" aria-live="polite" aria-atomic="true"><div class="hero"><div part="aqhi">${e.value} <span class="unit">AQHI</span></div><span part="category">${e.label}</span></div><p part="interpretation">${e.sentence}</p></div>
      <div aria-hidden="true"><div class="rail">${nt.map((s,o)=>l`<span part="segment" class=${e.index===o?"selected":""} style=${x({background:s.color})}></span>`)}</div><div class="labels"><span>Low · 1–3</span><span>Very high · 10+</span></div></div>
      </div>
      ${this.config.regional_entity?l`<section class="regional-section" aria-label="Regional Canadian AQHI"><div class="provenance">${i?.attributes.location||"Regional"} · Regional AQHI</div><div class="row"><div class="regional-reading" role="status" aria-live="polite" aria-atomic="true"><span part="regional-category">${t.label}</span><div part="regional-aqhi">${t.value} <span class="unit">AQHI</span></div></div><button aria-label="Details: regional AQHI history" @click=${s=>this.moreInfo(s,this.config.regional_entity)}>Details ↗</button></div>${i?.attributes.attribution?l`<div class="provenance">${i.attributes.attribution}</div>`:p}</section>`:p}
    </ha-card>`}};customElements.get("kiosk-door-card")||customElements.define("kiosk-door-card",et);customElements.get("kiosk-climate-card")||customElements.define("kiosk-climate-card",it);customElements.get("kiosk-status-card")||customElements.define("kiosk-status-card",st);customElements.get("kiosk-air-card")||customElements.define("kiosk-air-card",ot);customElements.get("kiosk-entity-card")||customElements.define("kiosk-entity-card",Q);customElements.get("kiosk-action-card")||customElements.define("kiosk-action-card",J);customElements.get("kiosk-room-card")||customElements.define("kiosk-room-card",Y);customElements.get("kiosk-pill-card")||customElements.define("kiosk-pill-card",tt);var Te=window.customBadges||=[];Te.some(n=>n.type==="kiosk-pill-card")||Te.push({type:"kiosk-pill-card",name:"Kiosk pill",description:"Compact status capsule",preview:!0,documentationURL:"https://github.com/myevit/kiosk-cards"});var Be=window.customCards||=[];for(let[n,e,t]of[["kiosk-blind-presets-card","Kiosk blind presets","Picture-only composite sequential TDBU blind presets"],["kiosk-entity-card","Kiosk entity","State tile with isolated quick control"],["kiosk-action-card","Kiosk action","Explicit momentary action tile"],["kiosk-room-card","Kiosk room","Room summary and navigation"],["kiosk-door-card","Kiosk door","Independent door and linked lock observations"],["kiosk-climate-card","Kiosk climate","Current temperature and HVAC mode"],["kiosk-air-card","Kiosk air","Read-only Canadian smoke estimate and separate regional AQHI"],["kiosk-status-card","Kiosk status","Passive temperature and cross-entity status display"],["kiosk-pill-card","Kiosk pill","Compact status capsule for cards and native badges"]])Be.some(i=>i.type===n)||Be.push({type:n,name:e,description:t,preview:!0,documentationURL:"https://github.com/myevit/kiosk-cards"});export{J as KioskActionCard,ot as KioskAirCard,g as KioskBaseCard,_t as KioskBlindPresetsCard,ht as KioskCardEditor,it as KioskClimateCard,et as KioskDoorCard,Q as KioskEntityCard,tt as KioskPillCard,Y as KioskRoomCard,st as KioskStatusCard,Ve as designTokens,w as kioskStyles,Ut as pillStyles};
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
