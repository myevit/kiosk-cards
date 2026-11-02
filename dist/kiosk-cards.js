var We=Object.defineProperty;var w=(n,i)=>()=>(n&&(i=n(n=0)),i);var Ke=(n,i)=>{for(var t in i)We(n,t,{get:i[t],enumerable:!0})};var ht,pt,Et,ee,D,ie,m,se,At,St=w(()=>{ht=globalThis,pt=ht.ShadowRoot&&(ht.ShadyCSS===void 0||ht.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Et=Symbol(),ee=new WeakMap,D=class{constructor(i,t,e){if(this._$cssResult$=!0,e!==Et)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=i,this.t=t}get styleSheet(){let i=this.o,t=this.t;if(pt&&i===void 0){let e=t!==void 0&&t.length===1;e&&(i=ee.get(t)),i===void 0&&((this.o=i=new CSSStyleSheet).replaceSync(this.cssText),e&&ee.set(t,i))}return i}toString(){return this.cssText}},ie=n=>new D(typeof n=="string"?n:n+"",void 0,Et),m=(n,...i)=>{let t=n.length===1?n[0]:i.reduce((e,s,o)=>e+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+n[o+1],n[0]);return new D(t,n,Et)},se=(n,i)=>{if(pt)n.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of i){let e=document.createElement("style"),s=ht.litNonce;s!==void 0&&e.setAttribute("nonce",s),e.textContent=t.cssText,n.appendChild(e)}},At=pt?n=>n:n=>n instanceof CSSStyleSheet?(i=>{let t="";for(let e of i.cssRules)t+=e.cssText;return ie(t)})(n):n});var Ge,Ve,Qe,Ze,Je,Ye,ut,ne,Xe,ti,F,Pt,re,oe,E,ft=w(()=>{St();St();({is:Ge,defineProperty:Ve,getOwnPropertyDescriptor:Qe,getOwnPropertyNames:Ze,getOwnPropertySymbols:Je,getPrototypeOf:Ye}=Object),ut=globalThis,ne=ut.trustedTypes,Xe=ne?ne.emptyScript:"",ti=ut.reactiveElementPolyfillSupport,F=(n,i)=>n,Pt={toAttribute(n,i){switch(i){case Boolean:n=n?Xe:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,i){let t=n;switch(i){case Boolean:t=n!==null;break;case Number:t=n===null?null:Number(n);break;case Object:case Array:try{t=JSON.parse(n)}catch{t=null}}return t}},re=(n,i)=>!Ge(n,i),oe={attribute:!0,type:String,converter:Pt,reflect:!1,useDefault:!1,hasChanged:re};Symbol.metadata??=Symbol("metadata"),ut.litPropertyMetadata??=new WeakMap;E=class extends HTMLElement{static addInitializer(i){this._$Ei(),(this.l??=[]).push(i)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(i,t=oe){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(i)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(i,t),!t.noAccessor){let e=Symbol(),s=this.getPropertyDescriptor(i,e,t);s!==void 0&&Ve(this.prototype,i,s)}}static getPropertyDescriptor(i,t,e){let{get:s,set:o}=Qe(this.prototype,i)??{get(){return this[t]},set(r){this[t]=r}};return{get:s,set(r){let a=s?.call(this);o?.call(this,r),this.requestUpdate(i,a,e)},configurable:!0,enumerable:!0}}static getPropertyOptions(i){return this.elementProperties.get(i)??oe}static _$Ei(){if(this.hasOwnProperty(F("elementProperties")))return;let i=Ye(this);i.finalize(),i.l!==void 0&&(this.l=[...i.l]),this.elementProperties=new Map(i.elementProperties)}static finalize(){if(this.hasOwnProperty(F("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(F("properties"))){let t=this.properties,e=[...Ze(t),...Je(t)];for(let s of e)this.createProperty(s,t[s])}let i=this[Symbol.metadata];if(i!==null){let t=litPropertyMetadata.get(i);if(t!==void 0)for(let[e,s]of t)this.elementProperties.set(e,s)}this._$Eh=new Map;for(let[t,e]of this.elementProperties){let s=this._$Eu(t,e);s!==void 0&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(i){let t=[];if(Array.isArray(i)){let e=new Set(i.flat(1/0).reverse());for(let s of e)t.unshift(At(s))}else i!==void 0&&t.push(At(i));return t}static _$Eu(i,t){let e=t.attribute;return e===!1?void 0:typeof e=="string"?e:typeof i=="string"?i.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(i=>this.enableUpdating=i),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(i=>i(this))}addController(i){(this._$EO??=new Set).add(i),this.renderRoot!==void 0&&this.isConnected&&i.hostConnected?.()}removeController(i){this._$EO?.delete(i)}_$E_(){let i=new Map,t=this.constructor.elementProperties;for(let e of t.keys())this.hasOwnProperty(e)&&(i.set(e,this[e]),delete this[e]);i.size>0&&(this._$Ep=i)}createRenderRoot(){let i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return se(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(i=>i.hostConnected?.())}enableUpdating(i){}disconnectedCallback(){this._$EO?.forEach(i=>i.hostDisconnected?.())}attributeChangedCallback(i,t,e){this._$AK(i,e)}_$ET(i,t){let e=this.constructor.elementProperties.get(i),s=this.constructor._$Eu(i,e);if(s!==void 0&&e.reflect===!0){let o=(e.converter?.toAttribute!==void 0?e.converter:Pt).toAttribute(t,e.type);this._$Em=i,o==null?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(i,t){let e=this.constructor,s=e._$Eh.get(i);if(s!==void 0&&this._$Em!==s){let o=e.getPropertyOptions(s),r=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:Pt;this._$Em=s;let a=r.fromAttribute(t,o.type);this[s]=a??this._$Ej?.get(s)??a,this._$Em=null}}requestUpdate(i,t,e,s=!1,o){if(i!==void 0){let r=this.constructor;if(s===!1&&(o=this[i]),e??=r.getPropertyOptions(i),!((e.hasChanged??re)(o,t)||e.useDefault&&e.reflect&&o===this._$Ej?.get(i)&&!this.hasAttribute(r._$Eu(i,e))))return;this.C(i,t,e)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(i,t,{useDefault:e,reflect:s,wrapped:o},r){e&&!(this._$Ej??=new Map).has(i)&&(this._$Ej.set(i,r??t??this[i]),o!==!0||r!==void 0)||(this._$AL.has(i)||(this.hasUpdated||e||(t=void 0),this._$AL.set(i,t)),s===!0&&this._$Em!==i&&(this._$Eq??=new Set).add(i))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let i=this.scheduleUpdate();return i!=null&&await i,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,o]of this._$Ep)this[s]=o;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[s,o]of e){let{wrapped:r}=o,a=this[s];r!==!0||this._$AL.has(s)||a===void 0||this.C(s,void 0,o,a)}}let i=!1,t=this._$AL;try{i=this.shouldUpdate(t),i?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(e){throw i=!1,this._$EM(),e}i&&this._$AE(t)}willUpdate(i){}_$AE(i){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(i)),this.updated(i)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(i){return!0}update(i){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(i){}firstUpdated(i){}};E.elementStyles=[],E.shadowRootOptions={mode:"open"},E[F("elementProperties")]=new Map,E[F("finalized")]=new Map,ti?.({ReactiveElement:E}),(ut.reactiveElementVersions??=[]).push("2.1.2")});function be(n,i){if(!Ht(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return ce!==void 0?ce.createHTML(i):i}function R(n,i,t=n,e){if(i===A)return i;let s=e!==void 0?t._$Co?.[e]:t._$Cl,o=q(i)?void 0:i._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(n),s._$AT(n,t,e)),e!==void 0?(t._$Co??=[])[e]=s:t._$Cl=s),s!==void 0&&(i=R(n,s._$AS(n,i.values),s,e)),i}var Nt,ae,mt,ce,fe,B,me,ei,z,j,q,Ht,ii,Bt,O,le,de,M,he,pe,ge,Ut,l,gt,yi,A,d,ue,I,si,L,Tt,W,N,Mt,It,zt,Rt,ni,ye,K=w(()=>{Nt=globalThis,ae=n=>n,mt=Nt.trustedTypes,ce=mt?mt.createPolicy("lit-html",{createHTML:n=>n}):void 0,fe="$lit$",B=`lit$${Math.random().toFixed(9).slice(2)}$`,me="?"+B,ei=`<${me}>`,z=document,j=()=>z.createComment(""),q=n=>n===null||typeof n!="object"&&typeof n!="function",Ht=Array.isArray,ii=n=>Ht(n)||typeof n?.[Symbol.iterator]=="function",Bt=`[ 	
\f\r]`,O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,le=/-->/g,de=/>/g,M=RegExp(`>|${Bt}(?:([^\\s"'>=/]+)(${Bt}*=${Bt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),he=/'/g,pe=/"/g,ge=/^(?:script|style|textarea|title)$/i,Ut=n=>(i,...t)=>({_$litType$:n,strings:i,values:t}),l=Ut(1),gt=Ut(2),yi=Ut(3),A=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),ue=new WeakMap,I=z.createTreeWalker(z,129);si=(n,i)=>{let t=n.length-1,e=[],s,o=i===2?"<svg>":i===3?"<math>":"",r=O;for(let a=0;a<t;a++){let c=n[a],p,h,u=-1,f=0;for(;f<c.length&&(r.lastIndex=f,h=r.exec(c),h!==null);)f=r.lastIndex,r===O?h[1]==="!--"?r=le:h[1]!==void 0?r=de:h[2]!==void 0?(ge.test(h[2])&&(s=RegExp("</"+h[2],"g")),r=M):h[3]!==void 0&&(r=M):r===M?h[0]===">"?(r=s??O,u=-1):h[1]===void 0?u=-2:(u=r.lastIndex-h[2].length,p=h[1],r=h[3]===void 0?M:h[3]==='"'?pe:he):r===pe||r===he?r=M:r===le||r===de?r=O:(r=M,s=void 0);let y=r===M&&n[a+1].startsWith("/>")?" ":"";o+=r===O?c+ei:u>=0?(e.push(p),c.slice(0,u)+fe+c.slice(u)+B+y):c+B+(u===-2?a:y)}return[be(n,o+(n[t]||"<?>")+(i===2?"</svg>":i===3?"</math>":"")),e]},L=class n{constructor({strings:i,_$litType$:t},e){let s;this.parts=[];let o=0,r=0,a=i.length-1,c=this.parts,[p,h]=si(i,t);if(this.el=n.createElement(p,e),I.currentNode=this.el.content,t===2||t===3){let u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(s=I.nextNode())!==null&&c.length<a;){if(s.nodeType===1){if(s.hasAttributes())for(let u of s.getAttributeNames())if(u.endsWith(fe)){let f=h[r++],y=s.getAttribute(u).split(B),$=/([.?@])?(.*)/.exec(f);c.push({type:1,index:o,name:$[2],strings:y,ctor:$[1]==="."?Mt:$[1]==="?"?It:$[1]==="@"?zt:N}),s.removeAttribute(u)}else u.startsWith(B)&&(c.push({type:6,index:o}),s.removeAttribute(u));if(ge.test(s.tagName)){let u=s.textContent.split(B),f=u.length-1;if(f>0){s.textContent=mt?mt.emptyScript:"";for(let y=0;y<f;y++)s.append(u[y],j()),I.nextNode(),c.push({type:2,index:++o});s.append(u[f],j())}}}else if(s.nodeType===8)if(s.data===me)c.push({type:2,index:o});else{let u=-1;for(;(u=s.data.indexOf(B,u+1))!==-1;)c.push({type:7,index:o}),u+=B.length-1}o++}}static createElement(i,t){let e=z.createElement("template");return e.innerHTML=i,e}};Tt=class{constructor(i,t){this._$AV=[],this._$AN=void 0,this._$AD=i,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(i){let{el:{content:t},parts:e}=this._$AD,s=(i?.creationScope??z).importNode(t,!0);I.currentNode=s;let o=I.nextNode(),r=0,a=0,c=e[0];for(;c!==void 0;){if(r===c.index){let p;c.type===2?p=new W(o,o.nextSibling,this,i):c.type===1?p=new c.ctor(o,c.name,c.strings,this,i):c.type===6&&(p=new Rt(o,this,i)),this._$AV.push(p),c=e[++a]}r!==c?.index&&(o=I.nextNode(),r++)}return I.currentNode=z,s}p(i){let t=0;for(let e of this._$AV)e!==void 0&&(e.strings!==void 0?(e._$AI(i,e,t),t+=e.strings.length-2):e._$AI(i[t])),t++}},W=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(i,t,e,s){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=i,this._$AB=t,this._$AM=e,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let i=this._$AA.parentNode,t=this._$AM;return t!==void 0&&i?.nodeType===11&&(i=t.parentNode),i}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(i,t=this){i=R(this,i,t),q(i)?i===d||i==null||i===""?(this._$AH!==d&&this._$AR(),this._$AH=d):i!==this._$AH&&i!==A&&this._(i):i._$litType$!==void 0?this.$(i):i.nodeType!==void 0?this.T(i):ii(i)?this.k(i):this._(i)}O(i){return this._$AA.parentNode.insertBefore(i,this._$AB)}T(i){this._$AH!==i&&(this._$AR(),this._$AH=this.O(i))}_(i){this._$AH!==d&&q(this._$AH)?this._$AA.nextSibling.data=i:this.T(z.createTextNode(i)),this._$AH=i}$(i){let{values:t,_$litType$:e}=i,s=typeof e=="number"?this._$AC(i):(e.el===void 0&&(e.el=L.createElement(be(e.h,e.h[0]),this.options)),e);if(this._$AH?._$AD===s)this._$AH.p(t);else{let o=new Tt(s,this),r=o.u(this.options);o.p(t),this.T(r),this._$AH=o}}_$AC(i){let t=ue.get(i.strings);return t===void 0&&ue.set(i.strings,t=new L(i)),t}k(i){Ht(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,e,s=0;for(let o of i)s===t.length?t.push(e=new n(this.O(j()),this.O(j()),this,this.options)):e=t[s],e._$AI(o),s++;s<t.length&&(this._$AR(e&&e._$AB.nextSibling,s),t.length=s)}_$AR(i=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);i!==this._$AB;){let e=ae(i).nextSibling;ae(i).remove(),i=e}}setConnected(i){this._$AM===void 0&&(this._$Cv=i,this._$AP?.(i))}},N=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(i,t,e,s,o){this.type=1,this._$AH=d,this._$AN=void 0,this.element=i,this.name=t,this._$AM=s,this.options=o,e.length>2||e[0]!==""||e[1]!==""?(this._$AH=Array(e.length-1).fill(new String),this.strings=e):this._$AH=d}_$AI(i,t=this,e,s){let o=this.strings,r=!1;if(o===void 0)i=R(this,i,t,0),r=!q(i)||i!==this._$AH&&i!==A,r&&(this._$AH=i);else{let a=i,c,p;for(i=o[0],c=0;c<o.length-1;c++)p=R(this,a[e+c],t,c),p===A&&(p=this._$AH[c]),r||=!q(p)||p!==this._$AH[c],p===d?i=d:i!==d&&(i+=(p??"")+o[c+1]),this._$AH[c]=p}r&&!s&&this.j(i)}j(i){i===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,i??"")}},Mt=class extends N{constructor(){super(...arguments),this.type=3}j(i){this.element[this.name]=i===d?void 0:i}},It=class extends N{constructor(){super(...arguments),this.type=4}j(i){this.element.toggleAttribute(this.name,!!i&&i!==d)}},zt=class extends N{constructor(i,t,e,s,o){super(i,t,e,s,o),this.type=5}_$AI(i,t=this){if((i=R(this,i,t,0)??d)===A)return;let e=this._$AH,s=i===d&&e!==d||i.capture!==e.capture||i.once!==e.once||i.passive!==e.passive,o=i!==d&&(e===d||s);s&&this.element.removeEventListener(this.name,this,e),o&&this.element.addEventListener(this.name,this,i),this._$AH=i}handleEvent(i){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,i):this._$AH.handleEvent(i)}},Rt=class{constructor(i,t,e){this.element=i,this.type=6,this._$AN=void 0,this._$AM=t,this.options=e}get _$AU(){return this._$AM._$AU}_$AI(i){R(this,i)}},ni=Nt.litHtmlPolyfillSupport;ni?.(L,W),(Nt.litHtmlVersions??=[]).push("3.3.3");ye=(n,i,t)=>{let e=t?.renderBefore??i,s=e._$litPart$;if(s===void 0){let o=t?.renderBefore??null;e._$litPart$=s=new W(i.insertBefore(j(),o),o,void 0,t??{})}return s._$AI(n),s}});var Dt,g,oi,ve=w(()=>{ft();ft();K();K();Dt=globalThis,g=class extends E{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let i=super.createRenderRoot();return this.renderOptions.renderBefore??=i.firstChild,i}update(i){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(i),this._$Do=ye(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return A}};g._$litElement$=!0,g.finalized=!0,Dt.litElementHydrateSupport?.({LitElement:g});oi=Dt.litElementPolyfillSupport;oi?.({LitElement:g});(Dt.litElementVersions??=[]).push("4.2.2")});var _e=w(()=>{});var _=w(()=>{ft();K();ve();_e()});var k,Ft,$e,Ce,Ot,S=w(()=>{"use strict";_();k=m`
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
`,Ft=m`
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
`,$e=m`${k}
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
`,Ce=m`${k}
 :host { height:100%; }
 [part="surface"] { height:100%; padding:16px; border:none; }
 [part="body-target"] { display:flex; flex-direction:row; min-height:0; align-items:center; justify-content:center; text-align:center; width:100%; }
 [part="value"], [part="degree"], [part="pad"] { font-size:112px; font-weight:700; line-height:1; color:white; }
 [part="pad"] { visibility:hidden; }
 [part="status"] { width:100%; font-size:20px; font-weight:var(--ha-font-weight-normal,400); line-height:1.35; color:white; white-space:normal; }
 .active [part="status"] { color:black; }
`,Ot=Object.freeze({height:69,actionHeight:68,largeHeight:146,pillHeight:35,pillRadius:18,pillIconSize:24,iconDiameter:45,glyphSize:25,titleSize:17,detailSize:15,categoryColor:"#3bc8ce"})});async function H(n=["ha-dialog","ha-button","ha-dialog-footer","ha-form"]){if(n.every(e=>customElements.get(e)))return;let i=await window.loadCardHelpers?.();if(!i||(await(await i.createCardElement({type:"entities",entities:[]})).constructor.getConfigElement?.(),!n.every(e=>customElements.get(e))))throw Error("Home Assistant controls are unavailable")}function Ee(n,i){return new Promise(t=>{let e=!1,s=o=>{e||(e=!0,t(o))};n.dispatchEvent(new CustomEvent("show-dialog",{bubbles:!0,composed:!0,detail:{dialogTag:"kiosk-confirmation-dialog",dialogImport:()=>H().catch(o=>{throw s(!1),o}),dialogParams:{...i,confirm:()=>s(!0),cancel:()=>s(!1)}}}))})}var jt,qt=w(()=>{"use strict";_();jt=class extends g{constructor(){super(...arguments);this.open=!1}static{this.properties={open:{state:!0},params:{state:!0}}}async showDialog(t){await H(),this.params=t,this.open=!0,await this.updateComplete}closeDialog(){return this.finish(!1),!0}finish(t){this.open&&(this.open=!1,(t?this.params.confirm:this.params.cancel)(),this.dispatchEvent(new CustomEvent("dialog-closed",{bubbles:!0,composed:!0,detail:{dialog:this.localName}})))}render(){return this.params?l`<ha-dialog
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
    >`:d}};customElements.get("kiosk-confirmation-dialog")||customElements.define("kiosk-confirmation-dialog",jt)});function Me(n,i){if(!Array.isArray(n)||!n.length||n.length>i.length)throw Error("Choose at least one native command, at most one per configured blind");let t=new Set;for(let e of n){if(!Te(e)||!li.includes(e.service)||!i.includes(e.entity_id)||t.has(e.entity_id))throw Error("Only unique configured covers and supported native services are allowed");let s=e.service==="set_cover_position"?"position":e.service==="set_cover_tilt_position"?"tilt_position":void 0;if(!di(e,["service","entity_id",...s?[s]:[]])||s&&(typeof e[s]!="number"||!Number.isFinite(e[s])||e[s]<0||e[s]>100))throw Error("Native values must be literal numbers 0\u2013100; extra fields are not allowed");t.add(e.entity_id)}return structuredClone(n)}function Lt(n,i){let e=i.service==="set_cover_tilt_position"?"current_tilt_position":"current_position",s={open_cover:1,close_cover:2,set_cover_position:4,set_cover_tilt_position:128}[i.service],o=n?.attributes.supported_features,r=n?.attributes[e];return!!n&&["open","closed","opening","closing"].includes(n.state)&&typeof o=="number"&&Number.isInteger(o)&&(o&s)!==0&&typeof r=="number"&&Number.isFinite(r)&&r>=0&&r<=100}function Ie(n,i){if(!Lt(n,i)||!["open","closed"].includes(n.state)||i.service==="close_cover"&&n.state!=="closed"||i.service==="set_cover_position"&&i.position===0&&!(typeof n.attributes.current_tilt_position=="number"&&Math.abs(n.attributes.current_tilt_position-100)<=2)||i.service==="set_cover_tilt_position"&&i.tilt_position===100&&!(typeof n.attributes.current_position=="number"&&Math.abs(n.attributes.current_position)<=2))return!1;let t=i.service==="open_cover"?100:i.service==="close_cover"?0:i.service==="set_cover_position"?i.position:i.tilt_position;return Math.abs(n.attributes[i.service==="set_cover_tilt_position"?"current_tilt_position":"current_position"]-t)<=2}var li,Te,di,ze=w(()=>{"use strict";li=["open_cover","close_cover","set_cover_position","set_cover_tilt_position"],Te=n=>n&&typeof n=="object"&&!Array.isArray(n),di=(n,i)=>Te(n)&&Object.keys(n).every(t=>i.includes(t))});var Wt={};Ke(Wt,{KioskBlindPresetsEditor:()=>J});var Z,Ne,Re,J,Kt=w(()=>{"use strict";_();qt();S();Vt();Z=(n,i,t,e=1)=>({name:n,selector:{number:{min:i,max:t,step:e,mode:"box"}}}),Ne=n=>({name:n,selector:{text:{}}}),Re=n=>[...n.mapping==="native-dual-cover"?["entity_top","entity_bottom"].map(i=>({name:i,required:!0,selector:{entity:{filter:{domain:"cover"}}}})):[{name:"entity",required:!0,selector:{entity:{filter:{domain:"cover"}}}}],Ne("name"),Z("width",.1,10,.1),{name:"mapping",selector:{select:{mode:"dropdown",options:[{value:"sequential-tdbu",label:"Sequential TDBU (default)"},{value:"independent-tdbu",label:"Independent top and bottom rails"},{value:"native-dual-cover",label:"Native top and bottom cover pair"}]}}}],J=class extends g{constructor(){super(...arguments);this.draftIndex=-1;this.newBlind={width:1};this.error="";this.label=t=>({rows:"Grid rows",columns:"Grid columns",entity:"Cover entity",entity_top:"Top rail cover",entity_bottom:"Bottom rail cover",name:"Accessible name",width:"Relative picture width",mapping:"Rail mapping",top:"Top (% down)",bottom:"Bottom (% down)",ignored:"Ignore this shade"})[t.name]||t.name}static{this.properties={hass:{attribute:!1},config:{state:!0},draft:{state:!0},newBlind:{state:!0},error:{state:!0},removing:{state:!0}}}connectedCallback(){super.connectedCallback(),H(["ha-form"]).catch(()=>{this.error="Home Assistant native form controls could not load. Reopen the editor."})}setConfig(t){this.config=structuredClone(t),this.draft=void 0,this.removing=void 0,this.error=""}emit(t){try{Y(t)}catch(e){return this.error=e.message,!1}return this.config=t,this.error="",this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:structuredClone(t)},bubbles:!0,composed:!0})),!0}updateGrid(t){t.stopPropagation();let e=t.detail.value;this.emit({...this.config,rows:e.rows,columns:e.columns})}updateBlind(t,e){e.stopPropagation();let s=structuredClone(this.config);if(s.blinds[t]={...s.blinds[t],...e.detail.value},s.blinds[t].mapping==="native-dual-cover"&&(!s.blinds[t].entity_top||!s.blinds[t].entity_bottom)){this.config=s,this.error="Choose top and bottom cover entities";return}this.emit(s)}moveBlind(t,e){let s=structuredClone(this.config),o=t+e;[s.blinds[t],s.blinds[o]]=[s.blinds[o],s.blinds[t]];for(let r of s.presets)[r.positions[t],r.positions[o]]=[r.positions[o],r.positions[t]];this.emit(s)}addBlind(){let t={...this.newBlind},e=structuredClone(this.config);e.blinds.push(t);for(let s of e.presets)s.positions.push({top:0,bottom:100});this.emit(e)&&(this.newBlind={width:1})}edit(t){this.error="",this.draftIndex=t,this.draft=structuredClone(this.config.presets[t])}addPreset(){this.draftIndex=this.config.presets.length,this.error="";let t=this.draftIndex+1;for(;this.config.presets.some(e=>e.id===`preset-${t}`);)t++;this.draft={id:`preset-${t}`,name:`Preset ${this.draftIndex+1}`,positions:this.config.blinds.map(()=>({top:0,bottom:100}))}}get draftProblem(){if(!this.draft)return"";try{let t=structuredClone(this.config);t.presets[this.draftIndex]=this.draft,Y(t)}catch(t){return t.message}return P(this.draft,this.config.blinds)}save(){if(!this.draft||this.draftProblem)return;let t=structuredClone(this.config);t.presets[this.draftIndex]=this.draft,this.emit(t)&&(this.draft=void 0)}removeItem(){if(!this.removing)return;let t=structuredClone(this.config),{kind:e,index:s}=this.removing;if(e==="blind"){t.blinds.splice(s,1);for(let o of t.presets)o.positions.splice(s,1)}else t.presets.splice(s,1);this.emit(t)&&(this.removing=void 0,this.draft=void 0)}movePreset(t,e){let s=structuredClone(this.config),o=t+e;[s.presets[t],s.presets[o]]=[s.presets[o],s.presets[t]],this.emit(s)}static{this.styles=[k,Gt,m`
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
      gap: var(--ha-section-grid-column-gap, 8px);
    }
    [data-preview] {
      width: 160px;
      margin: 12px auto;
    }
    [role="status"] {
      display: block;
      color: var(--error-color, #db4437);
      font-size: 14px;
      margin: 8px 0;
    }
  `]}render(){if(!this.config)return d;if(this.removing)return l`<p>
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
          .schema=${[Ne("name")]}
          .computeLabel=${this.label}
          @value-changed=${e=>{e.stopPropagation(),this.draft={...this.draft,name:e.detail.value.name}}}
        ></ha-form>
        <div data-preview class="large">
          ${_t(this.config.blinds,this.draft.positions)}
        </div>
        <p>
          Pictures are absolute rail targets, in percentages down from the top.
          Each blind uses its configured rail mapping. Sequential blinds require
          top 0 or bottom 100; independent blinds support middle bands.
          Saving never moves blinds.
        </p>
        ${this.config.blinds.map((e,s)=>l`<h3>
                ${e.name||["Left","Middle","Right"][s]||`Blind ${s+1}`}
              </h3>
              <ha-form
                data-ignore=${s}
                .hass=${this.hass}
                .data=${{ignored:this.draft.positions[s].ignored??!1}}
                .schema=${[{name:"ignored",selector:{boolean:{}}}]}
                .computeLabel=${this.label}
                @value-changed=${o=>{o.stopPropagation();let r=structuredClone(this.draft);r.positions[s]={...r.positions[s],ignored:o.detail.value.ignored},this.draft=r}}
              ></ha-form>
              <ha-form
                data-position=${s}
                .hass=${this.hass}
                .data=${this.draft.positions[s]}
                .schema=${[Z("top",0,100),Z("bottom",0,100)]}
                .computeLabel=${this.label}
                @value-changed=${o=>{o.stopPropagation();let r=structuredClone(this.draft);r.positions[s]={...r.positions[s],...o.detail.value},this.draft=r}}
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
        .schema=${[Z("rows",1,12),Z("columns",1,12)]}
        .computeLabel=${this.label}
        @value-changed=${this.updateGrid}
      ></ha-form>
      <p>
        Remove extra presets explicitly before shrinking the grid. Narrow cards
        wrap columns to keep 44px touch targets.
      </p>
      <h3>Blinds (picture order)</h3>
      ${this.config.blinds.map((t,e)=>l`<section class="blind">
            <ha-form
              data-blind=${e}
              .hass=${this.hass}
              .data=${{...t,mapping:t.mapping??"sequential-tdbu"}}
              .schema=${Re(t)}
              .computeLabel=${this.label}
              @value-changed=${s=>this.updateBlind(e,s)}
            ></ha-form>
            <div class="actions">
              <button
                aria-label=${`Move blind ${t.name||e+1} up`}
                ?disabled=${e===0}
                @click=${()=>this.moveBlind(e,-1)}
              >
                ↑</button
              ><button
                aria-label=${`Move blind ${t.name||e+1} down`}
                ?disabled=${e===this.config.blinds.length-1}
                @click=${()=>this.moveBlind(e,1)}
              >
                ↓</button
              ><button
                aria-label=${`Remove blind ${t.name||e+1}`}
                ?disabled=${this.config.blinds.length===1}
                @click=${()=>this.removing={kind:"blind",index:e}}
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
        .schema=${Re(this.newBlind)}
        .computeLabel=${this.label}
        @value-changed=${t=>{t.stopPropagation(),this.newBlind={...this.newBlind,...t.detail.value}}}
      ></ha-form>
      <div class="actions">
        <button
          ?disabled=${this.config.blinds.length>=12||(this.newBlind.mapping==="native-dual-cover"?!this.newBlind.entity_top||!this.newBlind.entity_bottom:!this.newBlind.entity)}
          @click=${()=>this.addBlind()}
        >
          Add blind
        </button>
      </div>
      <h3>Presets</h3>
      <div class="pictures">
        ${this.config.presets.map((t,e)=>l`<button class="tile large" aria-label=${`Edit ${t.name}`} title=${P(t,this.config.blinds)} @click=${()=>this.edit(e)}>${_t(this.config.blinds,t.positions)}</button>`)}
      </div>
      ${this.config.presets.map((t,e)=>l`<div class="actions"><span>${t.name}</span><button aria-label=${`Move preset ${t.name} up`} ?disabled=${e===0} @click=${()=>this.movePreset(e,-1)}>↑</button><button aria-label=${`Move preset ${t.name} down`} ?disabled=${e===this.config.presets.length-1} @click=${()=>this.movePreset(e,1)}>↓</button></div>`)}<button
        ?disabled=${!this.config.blinds.length||this.config.presets.length>=this.config.rows*this.config.columns}
        @click=${()=>this.addPreset()}
      >
        Add preset</button
      >${this.error?l`<span role="status">${this.error}</span>`:d}`}};customElements.get("kiosk-blind-presets-editor")||customElements.define("kiosk-blind-presets-editor",J);customElements.get("kiosk-blind-presets-v2-editor")||customElements.define("kiosk-blind-presets-v2-editor",class extends J{})});function _t(n,i){let t=n.map(o=>o.width??1),e=t.reduce((o,r)=>o+r,0),s=8;return gt`<svg viewBox="0 0 120 100" aria-hidden="true" focusable="false">${n.map((o,r)=>{let a=(104-4*(n.length-1))*t[r]/e,c=s;s+=a+4;let p=i[r]??{top:0,bottom:100};return p.ignored?gt`<g data-ignored opacity="0.35"><rect x=${c} y="12" width=${a} height="76" rx="1" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 3"/><path data-ignore-mark d=${`M ${c} 88 L ${c+a} 12`} fill="none" stroke="currentColor" stroke-width="2"/></g>`:gt`<g><rect x=${c} y="12" width=${a} height="76" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/><rect data-fabric x=${c} y=${12+Math.min(74,76*p.top/100)} width=${a} height=${Math.max(2,76*(p.bottom-p.top)/100)} rx="1" fill="currentColor"/></g>`})}</svg>`}function Y(n){if(!n||!Number.isInteger(n.rows)||n.rows<1||n.rows>12||!Number.isInteger(n.columns)||n.columns<1||n.columns>12)throw Error("Rows and columns must be integers from 1 to 12");if(!Array.isArray(n.blinds)||!n.blinds.length||n.blinds.length>12)throw Error("Choose 1\u201312 blinds");let i=new Set;for(let t of n.blinds){if(!t)throw Error("Choose unique cover entities");let e=t.mapping==="native-dual-cover"?[t.entity_top,t.entity_bottom,...t.entity===void 0?[]:[t.entity]]:[t.entity];for(let s of e){if(typeof s!="string"||!/^cover\.[a-z0-9_]+$/.test(s)||i.has(s))throw Error("Choose unique cover entities (native dual cover requires distinct top and bottom)");i.add(s)}if(t.width!==void 0&&(typeof t.width!="number"||!Number.isFinite(t.width)||t.width<=0||t.width>10))throw Error("Blind widths must be greater than 0 and at most 10");if(t.mapping!==void 0&&!["sequential-tdbu","independent-tdbu","native-dual-cover"].includes(t.mapping))throw Error("Choose sequential-tdbu, independent-tdbu or native-dual-cover mapping")}if(!Array.isArray(n.presets)||n.presets.length>n.rows*n.columns)throw Error("Remove presets before shrinking the grid");i.clear();for(let t of n.presets){if(!t||typeof t.id!="string"||!t.id.trim()||i.has(t.id)||typeof t.name!="string"||!t.name.trim())throw Error("Presets need unique IDs and accessible names");if(i.add(t.id),t.commands!==void 0&&t.actions!==void 0)throw Error("Use commands or actions, not both");if((t.commands!==void 0||t.actions!==void 0)&&Me(t.commands??t.actions,n.blinds.flatMap(e=>e.mapping!=="native-dual-cover"&&e.entity?[e.entity]:[])),!Array.isArray(t.positions)||t.positions.length!==n.blinds.length)throw Error("Each preset needs one position per blind");for(let e of t.positions){if(e&&e.ignored!==void 0&&typeof e.ignored!="boolean")throw Error("Ignored must be a boolean");if(!e||![e.top,e.bottom].every(s=>typeof s=="number"&&Number.isFinite(s)&&s>=0&&s<=100)||e.top>e.bottom)throw Error("Coordinates must be 0\u2013100 with top \u2264 bottom")}}}function xt(n,i){return(n.commands??n.actions)?.filter(e=>!i||!n.positions[i.findIndex(s=>s.entity===e.entity_id)]?.ignored)}function P(n,i){return n.positions.some(t=>!t.ignored)?n.commands!==void 0||n.actions!==void 0?xt(n,i)?.length?"":"Include at least one native command":n.positions.some((t,e)=>!t.ignored&&!["independent-tdbu","native-dual-cover"].includes(i?.[e]?.mapping??"")&&t.top!==0&&t.bottom!==100)?"Unsupported sequential TDBU position: top must be 0 or bottom must be 100.":"":"Include at least one shade"}function Zt(n){return!!n&&!["unknown","unavailable"].includes(n.state)&&["current_position","current_tilt_position"].every(i=>typeof n.attributes[i]=="number"&&Number.isFinite(n.attributes[i])&&n.attributes[i]>=0&&n.attributes[i]<=100)}function Qt(n,i){let t=n?.attributes[i?"rail_top":"rail_bottom"];return typeof t=="number"&&Number.isFinite(t)&&t>=0&&t<=100?t:void 0}function Jt(n,i){if(!n||!["open","closed"].includes(n.state))return!1;let t=r=>{let a=n.attributes[r?"motion_top":"motion_bottom"];return a!==void 0&&a!=="STOP"};if(i.service==="open_cover"||i.service==="close_cover"){let r=Qt(n,!0),a=Qt(n,!1);return n.attributes.rails_known!==!1&&r!==void 0&&a!==void 0&&!t(!0)&&!t(!1)&&Math.abs(r)<=2&&Math.abs(a-(i.service==="open_cover"?0:100))<=2&&(i.service!=="close_cover"||n.state==="closed")}let e=i.service==="set_cover_tilt_position",s=Qt(n,e);if(s===void 0||t(e))return!1;let o=e?i.tilt_position:i.position;return Math.abs((e?s:100-s)-o)<=2}function Ue(n,i){return[n.entity_top,n.entity_bottom].every(t=>{let e=i[t],s=e?.attributes.supported_features;return!!e&&["open","closed","opening","closing","unknown"].includes(e.state)&&typeof s=="number"&&Number.isInteger(s)&&(s&4)!==0})}function hi(n,i,t){return[n.entity_top,n.entity_bottom].every((e,s)=>{let o=i[e],r=o?.attributes.current_position;return!!o&&["open","closed"].includes(o.state)&&typeof r=="number"&&Number.isFinite(r)&&r>=0&&r<=100&&Math.abs(r-(s===0?t.top:100-t.bottom))<=2})}function pi(n,i,t){if(!i||!["open","closed","opening","closing","unknown"].includes(i.state))throw Error("Independent blind unavailable");let e=i.attributes.supported_features;if(typeof e!="number"||!Number.isInteger(e)||(e&132)!==132)throw Error("Required independent capability unavailable");return[{service:"set_cover_tilt_position",data:{entity_id:n.entity,tilt_position:t.top}},{service:"set_cover_position",data:{entity_id:n.entity,position:100-t.bottom}}]}function De(n,i,t){return t?.mapping==="independent-tdbu"?n?.attributes.rails_known!==!1&&Jt(n,{service:"set_cover_tilt_position",entity_id:t.entity,tilt_position:i.top})&&Jt(n,{service:"set_cover_position",entity_id:t.entity,position:100-i.bottom}):Zt(n)&&!["opening","closing"].includes(n.state)&&Math.abs((n.attributes.current_position>0?0:n.attributes.current_tilt_position)-i.top)<=2&&Math.abs(100-n.attributes.current_position-i.bottom)<=2}var Gt,He,X,kt,Vt=w(()=>{"use strict";_();S();ze();Gt=m`
      .tile, [data-preview] {
        box-sizing: border-box;
        border: 0;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        min-width: 44px;
        min-height: 44px;
        height: var(--kiosk-height);
        border-radius: var(--kiosk-radius, var(--ha-card-border-radius, 12px));
        box-shadow: var(--kiosk-shadow, var(--ha-card-box-shadow, 0 2px 4px rgba(0, 0, 0, 0.1), 0 6px 10px rgba(0, 0, 0, 0.08)));
        background: var(--kiosk-background, rgba(0, 0, 0, 0.3));
        color: var(--kiosk-glyph, white);
        overflow: hidden;
      }
      svg {
        width: 100%;
        height: 100%;
        max-height: 110px;
        pointer-events: none;
      }
`;He=new WeakMap;X=class extends g{constructor(){super(...arguments);this.busy=!1;this.error="";this.operation=0;this.publishCancels=new Set;this.transports=new Map;this.releasePairs=[]}static async getConfigElement(){return await Promise.resolve().then(()=>(Kt(),Wt)),document.createElement("kiosk-blind-presets-editor")}static getStubConfig(t){let e=Object.keys(t?.states||{}).filter(s=>s.startsWith("cover.")).slice(0,3).map(s=>({entity:s,mapping:"sequential-tdbu",width:1}));return e.length||e.push({entity:"cover.example_blind",mapping:"sequential-tdbu",width:1}),{type:"custom:kiosk-blind-presets-card",rows:3,columns:3,blinds:e,presets:e.length?[{id:"closed",name:"Closed",positions:e.map(()=>({top:0,bottom:100}))}]:[]}}static{this.properties={hass:{attribute:!1},config:{state:!0},busy:{state:!0},error:{state:!0}}}async publishRail(t,e,s){let o=t.data.entity_id,r=t.pair?.scope.transports??this.transports;for(;r.has(o);)if(await Promise.race([r.get(o),s]),!e())return!1;if(!e())return!1;let a=Promise.resolve().then(()=>{if(e()){if(!this.commandAvailable({service:t.service,...t.data}))throw Error("Unavailable");return this.hass.callService("cover",t.service,t.data)}}),c=a.catch(()=>{});return r.set(o,c),c.then(()=>{r.get(o)===c&&(r.delete(o),this.requestUpdate())}),await a,e()}async runPlan(t,e,s){let r=!(t.commands||t.actions)&&this.config.blinds.some(a=>["independent-tdbu","native-dual-cover"].includes(a.mapping??""))?[...new Set(e.map(a=>a.data.entity_id))].map(a=>e.filter(c=>c.data.entity_id===a)):[e];await Promise.allSettled(r.map(async a=>{try{for(let c of a){let p=!0,h,u=()=>p&&this.operation===s&&this.isConnected&&(c.pair?.goal.active??!0),f=new Promise($=>{h=()=>{p=!1,$(!1)}});this.publishCancels.add(h),c.pair?.goal.cancels.add(h);let y=setTimeout(()=>{u()&&(this.error="Publish timed out. Check device."),h()},12e4);try{if(!await Promise.race([f,this.publishRail(c,u,f)]))return}finally{clearTimeout(y),this.publishCancels.delete(h),c.pair?.goal.cancels.delete(h),h()}}}catch{this.operation===s&&(this.error="Action failed. Check device.")}})),this.operation===s&&(this.busy=!1)}invalidate(){for(let t of this.releasePairs)t();this.releasePairs=[];for(let t of this.publishCancels)t();this.publishCancels.clear(),this.operation++,this.busy=!1}disconnectedCallback(){this.invalidate(),super.disconnectedCallback()}shouldUpdate(t){if(t.size!==1||!t.has("hass"))return!0;let e=t.get("hass");return!e||this.config.blinds.some(s=>(s.mapping==="native-dual-cover"?[s.entity_top,s.entity_bottom]:[s.entity]).some(o=>e.states[o]!==this.hass.states[o]))}presetMatches(t){if(P(t,this.config.blinds))return!1;let e=xt(t,this.config.blinds);return e?e.length>0&&e.every(s=>this.commandMatches(s)):this.config.blinds.every((s,o)=>t.positions[o].ignored||(s.mapping==="native-dual-cover"?hi(s,this.hass.states,t.positions[o]):De(this.hass.states[s.entity],t.positions[o],s)))}isIndependent(t){return this.config.blinds.find(e=>e.entity===t)?.mapping==="independent-tdbu"}commandMatches(t){return this.isIndependent(t.entity_id)?Jt(this.hass.states[t.entity_id],t):Ie(this.hass.states[t.entity_id],t)}commandAvailable(t){let e=this.hass.states[t.entity_id];if(this.config.blinds.some(r=>r.mapping==="native-dual-cover"&&[r.entity_top,r.entity_bottom].includes(t.entity_id))){let r=e?.attributes.supported_features;return!!e&&["open","closed","opening","closing","unknown"].includes(e.state)&&t.service==="set_cover_position"&&typeof r=="number"&&Number.isInteger(r)&&(r&4)!==0}if(!this.isIndependent(t.entity_id))return Lt(e,t);let s=e?.attributes.supported_features,o={open_cover:1,close_cover:2,set_cover_position:4,set_cover_tilt_position:128}[t.service];return!!e&&["open","closed","opening","closing","unknown"].includes(e.state)&&typeof s=="number"&&Number.isInteger(s)&&(s&o)!==0}plan(t){if(Y(this.config),P(t,this.config.blinds))throw Error(P(t,this.config.blinds));let e=xt(t,this.config.blinds);if(e){let s=e;if(!s.every(o=>this.commandAvailable(o)))throw Error("Required native attribute or capability unavailable");return s.flatMap(o=>{let{service:r,...a}=o;return this.commandMatches(o)?[]:[{service:r,data:a}]})}if(P(t,this.config.blinds))throw Error(P(t,this.config.blinds));return this.config.blinds.flatMap((s,o)=>{if(t.positions[o].ignored)return[];let r=this.hass.states[s.entity],a=t.positions[o];if(s.mapping==="native-dual-cover"){if(!Ue(s,this.hass.states))throw Error("Required native pair capability unavailable");return[{service:"set_cover_position",data:{entity_id:s.entity_top,position:a.top}},{service:"set_cover_position",data:{entity_id:s.entity_bottom,position:100-a.bottom}}]}if(s.mapping==="independent-tdbu")return pi(s,r,a);if(!Zt(r))throw Error("Blind unavailable. Check device.");let c,p,h={entity_id:s.entity};if(a.top===0&&a.bottom===0?(c="open_cover",p=1):a.top===0&&a.bottom===100?(c="close_cover",p=2):a.bottom===100?(c="set_cover_tilt_position",p=128,h.tilt_position=a.top):(c="set_cover_position",p=4,h.position=100-a.bottom),!(Number(r.attributes.supported_features)&p))throw Error("Required blind capability is missing. Check device.");return De(r,a)?[]:[{service:c,data:h}]})}async activate(t,e){if(e.stopPropagation(),e.detail>1||!this.isConnected||!this.config.presets.includes(t))return;let s;try{s=this.plan(t)}catch(o){this.error=o.message;return}if(this.invalidate(),this.error="",!!s.length){for(let[o,r]of this.config.blinds.entries()){if(r.mapping!=="native-dual-cover"||t.positions[o].ignored||t.commands||t.actions)continue;let a=He.get(this.hass.callService);a||(a={goals:new Map,transports:new Map},He.set(this.hass.callService,a));let c=`${r.entity_top}/${r.entity_bottom}`,p=a.goals.get(c);if(p){p.active=!1;for(let f of p.cancels)f()}let h={active:!0,cancels:new Set};a.goals.set(c,h);let u=a;this.releasePairs.push(()=>{h.active=!1;for(let f of h.cancels)f();u.goals.get(c)===h&&u.goals.delete(c)});for(let f of s)[r.entity_top,r.entity_bottom].includes(f.data.entity_id)&&(f.pair={goal:h,scope:a})}this.busy=!0,await this.runPlan(t,s,this.operation)}}setConfig(t){Y(t),this.invalidate(),this.error="",this.config=structuredClone(t)}getCardSize(){if(!this.config)return 1;let t=this.getBoundingClientRect().width||320,e=this.columnsForWidth(t),s=Math.ceil(this.config.presets.length/e),o=this.shadowRoot?.querySelector(".tile"),r=Math.max(44,o?parseFloat(getComputedStyle(o).height):Ot.largeHeight),a=this.shadowRoot?.querySelector(".matrix"),c=a?parseFloat(getComputedStyle(a).rowGap):8;return Math.ceil((s*r+Math.max(0,s-1)*c)/50)}gridGap(){let t=this.shadowRoot?.querySelector(".matrix");return t?parseFloat(getComputedStyle(t).columnGap):8}columnsForWidth(t){let e=this.gridGap();return Math.min(this.config.columns,Math.max(1,Math.floor((t+e)/(44+e))))}getGridOptions(){return{columns:12,rows:"auto",min_columns:3}}static{this.styles=[k,Gt,m`
      :host {
        min-width: 0;
        position: relative;
      }

      .matrix {
        display: grid;
        --matrix-gap: var(--ha-section-grid-column-gap, 8px);
        gap: var(--matrix-gap);
        /* Preserve configured empty tracks; wrap natively when 44px no longer fits. */
        grid-template-columns: repeat(auto-fill, minmax(max(44px, calc((100% - (var(--preset-columns) - 1) * var(--matrix-gap)) / var(--preset-columns))), 1fr));
        padding: 0;
        box-sizing: border-box;
        background: transparent;
      }
      button.tile.active {
        background: var(--kiosk-active-background, white);
        color: var(--kiosk-icon-color, var(--accent-color, #3bc8ce));
      }
      button.tile:active:not(:disabled) {
        filter: brightness(0.85);
        transform: scale(0.98);
      }
    `]}render(){return!this.config||!this.hass?d:l`<div
        class="matrix"
        style=${`--preset-columns:${this.config.columns}`}
      >
        ${this.config.presets.map(t=>{let e=P(t,this.config.blinds)||(xt(t,this.config.blinds)?.every(o=>this.commandAvailable(o))??this.config.blinds.every((o,r)=>t.positions[r].ignored||(o.mapping==="native-dual-cover"?Ue(o,this.hass.states):o.mapping==="independent-tdbu"?!!this.hass.states[o.entity]&&this.hass.states[o.entity].state!=="unavailable":Zt(this.hass.states[o.entity])))?"":"Blind unavailable"),s=!e&&this.presetMatches(t);return l`<button
            type="button"
            class=${`tile large ${s?"active":""}`}
            aria-label=${t.name}
            ?disabled=${!!e}
            @click=${o=>this.activate(t,o)}
            @keydown=${o=>{o.repeat&&o.preventDefault()}}
            aria-pressed=${String(s)}
          >
            ${_t(this.config.blinds,t.positions)}
          </button>`})}
      </div>`}};customElements.get("kiosk-blind-presets-card")||customElements.define("kiosk-blind-presets-card",X);kt=class extends X{static async getConfigElement(){return await Promise.resolve().then(()=>(Kt(),Wt)),document.createElement("kiosk-blind-presets-v2-editor")}static getStubConfig(i){return{...super.getStubConfig(i),type:"custom:kiosk-blind-presets-v2-card"}}};customElements.get("kiosk-blind-presets-v2-card")||customElements.define("kiosk-blind-presets-v2-card",kt)});_();K();var xe={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},ke=n=>(...i)=>({_$litDirective$:n,values:i}),bt=class{constructor(i){}get _$AU(){return this._$AM._$AU}_$AT(i,t,e){this._$Ct=i,this._$AM=t,this._$Ci=e}_$AS(i,t){return this.update(i,t)}update(i,t){return this.render(...t)}};var we="important",ri=" !"+we,C=ke(class extends bt{constructor(n){if(super(n),n.type!==xe.ATTRIBUTE||n.name!=="style"||n.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(n){return Object.keys(n).reduce((i,t)=>{let e=n[t];return e==null?i:i+`${t=t.includes("-")?t:t.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${e};`},"")}update(n,[i]){let{style:t}=n.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(i)),this.render(i);for(let e of this.ft)i[e]==null&&(this.ft.delete(e),e.includes("-")?t.removeProperty(e):t[e]=null);for(let e in i){let s=i[e];if(s!=null){this.ft.add(e);let o=typeof s=="string"&&s.endsWith(ri);e.includes("-")||o?t.setProperty(e,o?s.slice(0,-11):s,o?we:""):t[e]=s}}return A}});S();qt();_();var T=n=>({name:n,selector:{text:{}}}),x=(n,i={})=>({name:n,selector:{entity:i}}),yt=class extends g{constructor(){super(...arguments);this.label=t=>this.config.type==="custom:kiosk-pill-card"&&t.name==="background"?"Background":{aqhi_entity:"Local Canadian PM2.5 smoke index",regional_entity:"Regional Canadian AQHI (optional)",category_entity:"Canadian smoke risk category sensor",source_entity:"Source PM2.5 sensor",data_expected_entity:"History ready timestamp (optional)",stale_after_minutes:"Stale after (minutes; default 120)",location:"Location (optional)",entity:"Primary entity (body more-info target)",door_entity:"Door contact or cover (optional override)",lock_entity:"Linked lock",temperature_format:"Temperature number format",hvac_colors:"HVAC action colors (optional)",status_entity:"Status message sensor",status_active_entity:"Status active sensor",trend_entity:"Temperature trend sensor",name:"Name",icon:"Icon",area:"Area",navigation_path:"Navigation path",temperature_entity:"Temperature sensor",occupancy_entity:"Occupancy sensor",light_entities:"Lights (optional override)",var_large:"Large",show_name:"Show name",show_state:"Show state",show_icon:"Show icon",state_display:"State text (optional override)",detail:"Detail (optional override)",interactions:"Interactions",dynamic:"Declarative rules (advanced, optional)",presentation:"Presentation expressions",action_rules:"Conditional actions",appearance:"Appearance (optional)",icon_color:"Category color (CSS color)",background:"Off background",active_background:"Active background",radius:"Corner radius",tap_action:"Body tap",hold_action:"Body hold",double_tap_action:"Body double tap",icon_tap_action:"Icon tap",icon_hold_action:"Icon hold",icon_double_tap_action:"Icon double tap"}[t.name]||t.name}static{this.properties={hass:{attribute:!1},config:{state:!0}}}static{this.styles=m`
    :host {
      display: block;
    }
    p {
      color: var(--secondary-text-color);
      font-size: 14px;
    }
  `}setConfig(t){this.config={...t}}get schema(){if(this.config.type==="custom:kiosk-air-card")return[x("aqhi_entity",{filter:{domain:"sensor"}}),x("regional_entity",{filter:{domain:"sensor"}}),x("category_entity",{filter:{domain:"sensor"}}),x("source_entity",{filter:{domain:"sensor"}}),x("data_expected_entity",{filter:{domain:"sensor",device_class:"timestamp"}}),T("name"),T("location"),{name:"icon",selector:{icon:{}}},{name:"stale_after_minutes",selector:{number:{min:1,max:1440,mode:"box",unit_of_measurement:"min"}}},{name:"appearance",type:"expandable",schema:["icon_color","background","radius"].map(T)}];let e=this.config.type==="custom:kiosk-room-card",s=this.config.type==="custom:kiosk-action-card",o=this.config.type==="custom:kiosk-pill-card",r=this.config.type==="custom:kiosk-door-card",a=this.config.type==="custom:kiosk-climate-card",c=this.config.type==="custom:kiosk-status-card",p=e?[{name:"area",selector:{area:{}}},T("name"),{name:"icon",selector:{icon:{}}},T("navigation_path"),x("temperature_entity",{filter:{domain:"sensor",device_class:"temperature"}}),x("occupancy_entity",{filter:{domain:"binary_sensor"}}),x("light_entities",{multiple:!0,filter:{domain:"light"}})]:[x("entity",s?{filter:{domain:["script","scene","button"]}}:r?{filter:{domain:["binary_sensor","cover","lock"]}}:a?{filter:{domain:"climate"}}:{}),T("name"),{name:"icon",selector:{icon:{}},context:{icon_entity:"entity"}}],h=e?[]:[{name:"interactions",type:"expandable",flatten:!0,schema:["tap_action","hold_action","double_tap_action","icon_tap_action","icon_hold_action","icon_double_tap_action"].map(u=>({name:u,selector:{ui_action:{default_action:s?"none":u==="icon_tap_action"?!o&&["light","switch","input_boolean"].includes((this.config.entity||"").split(".")[0])?"toggle":"more-info":u.includes("double")?"none":"more-info"}},context:{entity:"entity"}}))}];return[...p,...r?[x("door_entity",{filter:{domain:["binary_sensor","cover"]}}),x("lock_entity",{filter:{domain:"lock"}})]:[],...a?[{name:"temperature_format",selector:{select:{options:["locale","legacy"]}}},{name:"hvac_colors",selector:{object:{}}}]:[],...c?[x("status_entity"),x("status_active_entity",{filter:{domain:"binary_sensor"}}),x("trend_entity",{filter:{domain:"sensor"}})]:[],...o?["show_name","show_state","show_icon"].map(u=>({name:u,selector:{boolean:{}}})):c?[]:[{name:"var_large",selector:{boolean:{}}}],...e?[]:[T(o?"state_display":"detail")],...h,...e?[]:[{name:"dynamic",type:"expandable",flatten:!0,schema:["presentation","action_rules"].map(u=>({name:u,selector:{object:{}}}))}],{name:"appearance",type:"expandable",schema:(o?["icon_color","background","radius"]:["icon_color","background","active_background","radius"]).map(T)}]}change(t){t.stopPropagation();let e=t.detail.value;this.config={...this.config,...e},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this.config},bubbles:!0,composed:!0}))}render(){return!this.config||!this.hass?d:l`<ha-form
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
      </p>`}};customElements.get("kiosk-card-editor")||customElements.define("kiosk-card-editor",yt);var ai=new Set(["if","eq","ne","includes","in","and","or","not","defined","finite","number","round","gt","lt","concat","capitalize","map","countdown","minutes"]);function G(n,i=0){if(i>24)throw Error("Rule nesting exceeds 24");if(!(!n||typeof n!="object")){if(Array.isArray(n)){if(n.length>100)throw Error("Rule list too large");n.forEach(t=>G(t,i+1));return}if(n.op!==void 0){if(!ai.has(n.op)||!Array.isArray(n.args)||n.args.length>100)throw Error("Unknown rule operation");n.args.forEach(t=>G(t,i+1))}else if(n.entity!==void 0||n.attribute!==void 0||n.state!==void 0||n.last_changed!==void 0){if(n.attribute&&["__proto__","constructor","prototype"].includes(n.attribute))throw Error("Unsafe attribute");if(n.entity!==void 0&&typeof n.entity!="string")throw Error("Rule entity must be a string")}else Object.values(n).forEach(t=>G(t,i+1))}}function vt(n,i,t,e=Date.now()){if(!n||typeof n!="object")return n;if(!n.op){if(n.entity!==void 0||n.attribute!==void 0||n.state!==void 0||n.last_changed!==void 0){let o=i?.states[n.entity||t.entity||""];return n.attribute!==void 0?o?.attributes[n.attribute]:n.last_changed?o?.last_changed:o?.state}return n}let s=o=>vt(n.args[o],i,t,e);switch(n.op){case"if":return s(0)?s(1):s(2);case"eq":return s(0)===s(1);case"ne":return s(0)!==s(1);case"includes":return typeof s(0)=="string"&&s(0).includes(s(1));case"in":return Array.isArray(s(1))&&s(1).includes(s(0));case"and":return n.args.every((o,r)=>!!s(r));case"or":return n.args.some((o,r)=>!!s(r));case"not":return!s(0);case"defined":return s(0)!==void 0;case"finite":return Number.isFinite(s(0));case"number":return Number(s(0));case"round":return Math.round(Number(s(0)));case"gt":return s(0)>s(1);case"lt":return s(0)<s(1);case"concat":return n.args.map((o,r)=>s(r)??"").join("");case"capitalize":{let o=String(s(0)??"");return o.charAt(0).toUpperCase()+o.slice(1)}case"map":{let o=s(1);return Object.hasOwn(o,String(s(0)))?o[String(s(0))]:o.default??s(2)}case"minutes":{let o=Date.parse(s(0));return Number.isFinite(o)?Math.max(0,Math.ceil((o-e)/6e4)):NaN}case"countdown":{let o=Date.parse(s(0));if(!Number.isFinite(o))return s(1)??"";let r=Math.max(0,Math.ceil((o-e)/6e4)),a=Math.floor(r/60);return a>0?`${a}h ${String(r%60).padStart(2,"0")}m left`:`${r}m left`}}}function Ae(n){return/"op":"(?:countdown|minutes)"/.test(JSON.stringify(n.presentation))}function Se(n){G(n.presentation);for(let[i,t]of Object.entries(n.action_rules||{})){if(!/^(icon_)?(tap|hold|double_tap)_action$/.test(i)||!Array.isArray(t)||t.length>100)throw Error("Invalid action rules");for(let e of t)if(G(e.when),!e.action||typeof e.action.action!="string")throw Error("Rule requires action")}}var Pe=new Set(["light","switch","input_boolean"]);function Be(n,i,t){n.dispatchEvent(new CustomEvent(i,{detail:t,bubbles:!0,composed:!0}))}var ci=new Set(["off","closed","idle","paused","standby","away","docked","unknown","unavailable","locked","disarmed"]),b=class extends g{constructor(){super(...arguments);this.busy=!1;this.confirming=!1;this.error="";this.operation=0;this.acknowledged=!1;this.held=!1}static{this.properties={hass:{attribute:!1},config:{state:!0},busy:{state:!0},error:{state:!0},confirming:{state:!0}}}connectedCallback(){super.connectedCallback(),this.startClock()}startClock(){clearInterval(this.clock),this.isConnected&&this.config&&Ae(this.config)&&(this.clock=setInterval(()=>this.requestUpdate(),3e4))}presentation(t){let e=this.config.presentation?.[t];return e===void 0?void 0:vt(e,this.hass,this.config)}resolvedAction(t,e){return this.config.action_rules?.[t]?.find(o=>vt(o.when,this.hass,this.config))?.action||e}action(t,e="tap"){let s=(t==="icon"?"icon_":"")+e+"_action";return this.resolvedAction(s,this.config[s]||{action:e==="tap"?t==="icon"&&this.available&&Pe.has((this.config.entity||"").split(".")[0])?"toggle":"more-info":e==="hold"?"more-info":"none"})}async runAction(t,e,s="tap"){e.stopPropagation();let o=this.action(t,s);if(o.action==="none"||this.busy||this.confirming)return;let r=this.config,a=o.confirmation;if(a&&!(typeof a=="object"&&a.exemptions?.some(y=>y.user===this.hass.user?.id))){let y=this.operation;this.confirming=!0;let $=await Ee(this,typeof a=="object"?a:{});if(this.operation!==y||(this.confirming=!1,!$||!this.isConnected||this.config!==r))return}if(o.action==="more-info"){Be(this,"hass-more-info",{entityId:o.entity||this.config.entity});return}if(!["toggle","perform-action","call-service"].includes(o.action)){let{confirmation:y,...$}=o;Be(this,"hass-action",{config:{...this.config,tap_action:$},action:"tap"});return}if(!this.available)return;let c,p,h,u=o.target;if(o.action==="toggle"){if(c=(this.config.entity||"").split(".")[0],!Pe.has(c)){this.error="Choose an explicit action for this device.";return}this.expected=this.state?.state==="on"?"off":"on",p=this.expected==="on"?"turn_on":"turn_off",h={entity_id:this.config.entity}}else{if([c,p]=(o.perform_action||o.service||"").split("."),!c||!p){this.error="Choose an action.";return}h=o.data??o.service_data,this.expected=void 0}let f=++this.operation;this.busy=!0,this.error="",this.acknowledged=!1,this.watchdog=setTimeout(()=>{this.operation===f&&(this.operation++,this.busy=!1,this.error="No confirmation. Check device.")},12e3);try{if(await this.hass.callService(c,p,h,u),this.operation!==f)return;this.acknowledged=!0,this.finishIfConfirmed()}catch{this.operation===f&&(this.operation++,this.busy=!1,clearTimeout(this.watchdog),this.error="Action failed. Check device.")}}finishIfConfirmed(){this.busy&&this.acknowledged&&(!this.expected||this.state?.state===this.expected)&&(this.busy=!1,this.expected=void 0,clearTimeout(this.watchdog))}updated(){this.finishIfConfirmed()}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this.clock),clearTimeout(this.watchdog),clearTimeout(this.holdTimer),clearTimeout(this.tapTimer),this.operation++,this.busy=!1}pointerDown(t,e){e.stopPropagation(),e.button===0&&(this.held=!1,clearTimeout(this.holdTimer),this.holdTimer=setTimeout(()=>{this.held=!0,clearTimeout(this.tapTimer),this.runAction(t,e,"hold")},500))}pointerEnd(t){t.stopPropagation(),clearTimeout(this.holdTimer)}tap(t,e){if(e.stopPropagation(),this.held){this.held=!1;return}if(e.detail===0||this.action(t,"double_tap").action==="none"){this.runAction(t,e);return}e.detail>1?(clearTimeout(this.tapTimer),this.runAction(t,e,"double_tap")):this.tapTimer=setTimeout(()=>void this.runAction(t,e),300)}static async getConfigElement(){return window.loadCardHelpers&&await H(["ha-form"]),document.createElement("kiosk-card-editor")}static getStubConfig(t,e=[]){return{entity:e.find(s=>t.states[s])||Object.keys(t.states).find(s=>s.startsWith("light."))||Object.keys(t.states)[0]}}static{this.styles=k}applyConfig(t){Se(t);let e=t.var_large??t.variables?.var_large;if(e!==void 0&&typeof e!="boolean")throw Error("var_large must be a boolean");clearTimeout(this.watchdog),clearTimeout(this.holdTimer),clearTimeout(this.tapTimer),this.operation++,this.busy=!1,this.confirming=!1,this.expected=void 0,this.error="",this.config={...t},this.startClock()}setConfig(t){if(!t.entity)throw new Error("Choose an entity");this.applyConfig(t)}getCardSize(){return this.large?3:1.38}getGridOptions(){return{columns:6,rows:"auto"}}get state(){return this.hass?.states[this.config?.entity||""]}get active(){return!!this.state&&(this.config.active_states?this.config.active_states.includes(this.state.state):!ci.has(this.state.state))}get cardTitle(){return(this.presentation("name")??this.config.name)||this.state?.attributes.friendly_name||this.config.entity||"Entity"}get detail(){let t=this.presentation("detail");if(t!==void 0)return String(t);if(this.config.detail!==void 0)return this.config.detail;let e=this.state;if(!e)return"Unavailable";if(e.state==="on"&&e.entity_id.startsWith("light.")&&e.attributes.brightness)return`${Math.round(e.attributes.brightness/2.55)}%`;if(e.entity_id.startsWith("climate.")&&!["unknown","unavailable"].includes(e.state)){let o=e.attributes;if(o.target_temp_low!=null&&o.target_temp_high!=null)return`${o.target_temp_low}\xB0\u2013${o.target_temp_high}\xB0`;if(o.temperature!=null)return`${o.temperature}\xB0`;if(o.current_temperature!=null)return`${o.current_temperature}\xB0 (${e.state.charAt(0).toUpperCase()+e.state.slice(1)})`}let s=this.hass.formatEntityState?.(e)||e.state;return s.charAt(0).toUpperCase()+s.slice(1)}get available(){return!!this.state&&!["unknown","unavailable"].includes(this.state.state)}get isAction(){return!1}get large(){return(this.config.var_large??this.config.variables?.var_large)===!0}get cardIcon(){return this.presentation("icon")??this.config.icon}get surfaceStyles(){return{}}get iconContent(){return this.cardIcon?l`<ha-icon .icon=${this.cardIcon}></ha-icon>`:l`<ha-state-icon .hass=${this.hass} .stateObj=${this.state} .stateColor=${!1}></ha-state-icon>`}render(){if(!this.config||!this.hass)return d;let t=this.config.appearance;return l`<ha-card
      part="surface"
      aria-busy=${String(this.busy)}
      class=${[this.active?"active":"",this.available?"":"unavailable",this.isAction?"action":"",this.large?"large":""].join(" ")}
      style=${C({"--kiosk-icon-color":t?.icon_color,"--kiosk-default-icon-color":this.config.entity?.startsWith("light.")?"var(--accent-color,#3bc8ce)":void 0,"--kiosk-background":t?.background,"--kiosk-active-background":t?.active_background,"--kiosk-radius":t?.radius,...this.surfaceStyles})}
    >
      <button
        part="icon-target"
        @click=${e=>this.tap("icon",e)}
        @pointerdown=${e=>this.pointerDown("icon",e)}
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
        @click=${e=>this.tap("body",e)}
        @pointerdown=${e=>this.pointerDown("body",e)}
        @pointerup=${this.pointerEnd}
        @pointercancel=${this.pointerEnd}
        @pointerleave=${this.pointerEnd}
        aria-label=${this.cardTitle}
        ?disabled=${this.busy||this.confirming||!this.available&&["toggle","perform-action","call-service"].includes(this.action("body").action)}
      >
        <span part="title">${this.cardTitle}</span
        >${this.detail?l`<span part="detail">${this.detail}</span>`:d}</button
      >${this.error?l`<span part="feedback" role="status">${this.error}</span>`:d}</ha-card
    >`}},V=class extends b{},Q=class extends b{static getStubConfig(i,t=[]){let s=[...t,...Object.keys(i.states)].find(o=>["script","scene","button"].includes(o.split(".")[0]));return s?{entity:s}:{name:"Action"}}setConfig(i){if(!i.entity&&!i.name)throw Error("Choose an entity or name");if(i.entity&&!["script","scene","button"].includes(i.entity.split(".")[0]))throw Error("Action entities must be scripts, scenes or buttons");this.applyConfig(i)}get isAction(){return!0}get cardIcon(){return(this.presentation("icon")??this.config.icon)||(this.state?void 0:"mdi:play")}get active(){return!0}get detail(){return this.config.detail||(this.available?"":"Unavailable")}get available(){return!this.config.entity||super.available}action(i,t="tap"){let e=(i==="icon"?"icon_":"")+t+"_action";return this.resolvedAction(e,this.config[e]||(i==="icon"&&t==="tap"?this.config.tap_action:void 0)||{action:"none"})}};Vt();S();var tt=class extends b{static getStubConfig(){return{name:"Room",navigation_path:"/lovelace"}}setConfig(i){if(!i.area&&!i.name)throw Error("Choose an area or name");this.applyConfig(i)}get cardTitle(){return this.config.name||this.hass.areas?.[this.config.area||""]?.name||"Room"}get cardIcon(){return this.config.icon||this.hass.areas?.[this.config.area||""]?.icon||"mdi:home-outline"}get available(){return!0}get active(){return this.lights.some(i=>i.state==="on")||(this.config.occupancy_entity?this.hass.states[this.config.occupancy_entity]?.state==="on":this.roomStates.some(i=>i.entity_id.startsWith("binary_sensor.")&&["occupancy","presence","motion"].includes(i.attributes.device_class)&&i.state==="on"))}get roomStates(){return this.config.area?Object.values(this.hass.states).filter(i=>{let t=this.hass.entities?.[i.entity_id];return!t||t.hidden||t.hidden_by||t.disabled_by?!1:(t.area_id||this.hass.devices?.[t.device_id]?.area_id)===this.config.area}):[]}get lights(){return this.config.light_entities!==void 0?this.config.light_entities.map(i=>this.hass.states[i]||{entity_id:i,state:"unavailable",attributes:{}}):this.roomStates.filter(i=>i.entity_id.startsWith("light."))}get detail(){let i=this.roomStates,t=this.config.temperature_entity?this.hass.states[this.config.temperature_entity]||{entity_id:this.config.temperature_entity,state:"unavailable",attributes:{}}:i.find(r=>r.attributes.device_class==="temperature"),e=this.config.occupancy_entity?this.hass.states[this.config.occupancy_entity]||{entity_id:this.config.occupancy_entity,state:"unavailable",attributes:{}}:i.find(r=>r.entity_id.startsWith("binary_sensor.")&&["occupancy","presence","motion"].includes(r.attributes.device_class)),s=[];t&&s.push(["unknown","unavailable"].includes(t.state)?"Temperature unavailable":`${t.state}${t.attributes.unit_of_measurement?" "+t.attributes.unit_of_measurement:""}`),e&&s.push(e.state==="on"?"Occupied":e.state==="off"?"Clear":"Occupancy unavailable");let o=this.lights;if(o.length){let r=o.filter(c=>c.state==="on").length,a=o.filter(c=>["unknown","unavailable"].includes(c.state)).length;r?s.push(`${r} light${r===1?"":"s"} on`):a<o.length&&s.push("Lights off"),a&&s.push(`${a} unavailable`)}return s.join(" \xB7 ")}action(i,t="tap"){return t==="tap"&&this.config.navigation_path?{action:"navigate",navigation_path:this.config.navigation_path}:{action:"none"}}};_();S();var et=class extends b{static{this.styles=m`
    ${k}${Ft}
  `}setConfig(i){if(!i.entity)throw Error("Choose an entity");if(i.var_large??i.variables?.var_large)throw Error("Pills are compact; Large is not supported");for(let t of["show_name","show_state","show_icon"])if(i[t]!==void 0&&typeof i[t]!="boolean")throw Error(`${t} must be a boolean`);if(i.show_name===!1&&i.show_state===!1&&i.show_icon===!1)throw Error("Show at least one pill field");this.applyConfig(i)}get large(){return!1}get active(){return!1}getCardSize(){return 1}get detail(){let i=this.presentation("state_display");if(i!==void 0)return String(i);let t=this.state;if(this.config.state_display!==void 0)return this.config.state_display;let e=t?this.config.state_labels?.[t.state]??this.config.state_labels?.default:void 0;if(e!==void 0)return e;if(!t)return"Unavailable";let s=this.hass.formatEntityState?.(t)||t.state;return s.charAt(0).toUpperCase()+s.slice(1)}action(i,t="tap"){let e=(i==="icon"?"icon_":"")+t+"_action";return this.resolvedAction(e,this.config[e]||(i==="icon"?this.config[t+"_action"]:void 0)||{action:t==="double_tap"?"none":"more-info"})}disabled(i){return this.busy||this.confirming||!this.available&&["toggle","perform-action","call-service"].includes(this.action(i).action)}render(){if(!this.config||!this.hass)return d;let i=this.config.appearance,t=this.config.show_name!==!1,e=this.config.show_state!==!1;return l`<ha-card
      part="surface"
      aria-busy=${String(this.busy)}
      class=${`pill ${t?"":"no-name"} ${e?"":"no-state"} ${this.available?"":"unavailable"}`}
      style=${C({"--kiosk-background":i?.background,"--kiosk-icon-color":i?.icon_color,"--kiosk-radius":i?.radius})}
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
        ${t?l`<span part="title">${this.cardTitle}</span>`:d}${e?l`<span part="detail">${this.detail}</span>`:d}</button
      >${this.error?l`<span part="feedback" role="status">${this.error}</span>`:d}</ha-card
    >`}};_();var it=class extends b{static{this.styles=m`${b.styles} .unavailable [part="icon-circle"] { opacity: 1; }`}static getStubConfig(i){return{entity:Object.keys(i?.states||{}).find(e=>["binary_sensor","cover","lock"].includes(e.split(".")[0]))||"binary_sensor.example_door"}}setConfig(i){if(!i.entity)throw Error("Choose a door or lock entity");if(!["binary_sensor","cover","lock"].includes(i.entity.split(".")[0]))throw Error("Choose a contact, cover or lock");if(i.lock_entity&&!i.lock_entity.startsWith("lock."))throw Error("Choose a lock entity");this.applyConfig(i)}get lockEntity(){return this.config.lock_entity||(this.config.entity?.startsWith("lock.")?this.config.entity:void 0)}get doorEntity(){return this.config.door_entity||(this.config.entity?.startsWith("lock.")?void 0:this.config.entity)}get lockState(){return this.hass?.states[this.lockEntity||""]}get doorState(){return this.hass?.states[this.doorEntity||""]?.state||"unknown"}get closed(){return["off","closed"].includes(this.doorState)}get open(){return["on","open"].includes(this.doorState)}get active(){return!(this.lockState?.state==="locked"&&this.closed)}get detail(){let i=this.presentation("detail")??this.config.detail;if(i!==void 0)return String(i);let t=this.open?"open":this.closed?"closed":this.doorState;return this.lockEntity?`${t} / ${this.lockState?.state||"unknown"}`:t}get cardIcon(){let i=super.cardIcon;if(i)return i;let t=this.lockState?.state;return t==="locked"&&this.closed?"mdi:door-closed-lock":t==="locked"&&this.open?"mdi:door-closed-cancel":t==="unlocked"&&this.closed?"mdi:lock-open":t==="unlocked"&&this.open?"mdi:door-open":this.lockState?.attributes.icon||"mdi:lock-question"}get surfaceStyles(){return{"--kiosk-glyph":this.active?"white":this.config.appearance?.icon_color||"#3bc8ce"}}action(i,t="tap"){let e=(i==="icon"?"icon_":"")+t+"_action";return this.resolvedAction(e,this.config[e]||{action:t==="double_tap"?"none":"more-info",...i==="icon"&&this.lockEntity?{entity:this.lockEntity}:{}})}};_();S();var st=class extends b{static{this.styles=$e}static getStubConfig(i){return{entity:Object.keys(i?.states||{}).find(t=>t.startsWith("climate."))||"climate.example"}}setConfig(i){if(!i.entity?.startsWith("climate."))throw Error("Choose a climate entity");this.applyConfig(i)}temperature(i){return this.config.temperature_format==="legacy"?String(i):typeof i!="number"||!Number.isFinite(i)?"\u2014":new Intl.NumberFormat(this.hass.locale?.language||"en",{maximumFractionDigits:2}).format(i)}get active(){return!!this.state&&!["off","idle","standby","away"].includes(this.state.state)}get detail(){let i=this.presentation("detail")??this.config.detail;if(i!==void 0)return String(i);let t=this.state;if(!t)return"Unavailable";let e=t.attributes,s=t.state,o=r=>this.temperature(r)+"\xB0";return s==="off"?"Off":s==="fan_only"?"Fan On":s==="heat"||s==="cool"?`${o(e.temperature)} / ${s} mode`:e.target_temp_low!==void 0&&e.target_temp_high!==void 0?`${o(e.target_temp_low)}\u2013${o(e.target_temp_high)}`:e.temperature!==null&&(e.temperature!==void 0||this.config.temperature_format==="legacy")?o(e.temperature):`${o(e.current_temperature)} (${s.charAt(0).toUpperCase()+s.slice(1)})`}get iconContent(){return l`<span part="temperature">${this.temperature(this.state?.attributes.current_temperature)}°</span>`}get surfaceStyles(){let i=this.config.hvac_colors;return{"--kiosk-temperature-color":i?.[this.state?.attributes.hvac_action]||i?.default||this.config.appearance?.icon_color||"var(--accent-color)","--kiosk-height":this.large?"145px":"68px"}}};_();S();var nt=class extends b{static{this.styles=Ce}static getStubConfig(i){return{entity:Object.keys(i?.states||{}).find(t=>t.startsWith("sensor.")&&i?.states[t].attributes.device_class==="temperature")||"sensor.example_temperature"}}get active(){return this.hass?.states[this.config.status_active_entity||""]?.state==="on"}get value(){let i=this.state?.state||"unavailable",t=parseFloat(i);return Number.isFinite(t)?t.toFixed(0):i}get message(){let i=this.hass?.states[this.config.status_entity||""]?.state;return i&&i!=="clear"?i:""}get trendColor(){let i=parseFloat(this.hass?.states[this.config.trend_entity||""]?.state||"");return Number.isFinite(i)?i>=3?"#ff1744":i>=1.5?"#ff6d00":i>=.5?"#ffd600":i<=-3?"#2962ff":i<=-1.5?"#00b0ff":i<=-.5?"#00e5ff":"white":"white"}render(){return!this.config||!this.hass?d:l`<ha-card part="surface" class=${this.active?"active":""} style=${C({"--kiosk-background":this.config.appearance?.background||"var(--ha-card-background,var(--card-background-color))","--kiosk-radius":this.config.appearance?.radius})}>
   <button part="body-target" aria-label=${this.cardTitle} @click=${i=>this.tap("body",i)} @pointerdown=${i=>this.pointerDown("body",i)} @pointerup=${this.pointerEnd} @pointercancel=${this.pointerEnd} @pointerleave=${this.pointerEnd}>
    ${this.active?l`<span part="status">${this.message}</span>`:l`<span part="pad" aria-hidden="true">°</span><span part="value">${this.value}</span><span part="degree" style=${C({color:this.trendColor})}>°</span>`}
   </button>
  </ha-card>`}};_();S();var ot=[{key:"low",label:"Low risk",color:"var(--blue-color,#3188b5)",sentence:"Low particle levels around your home."},{key:"moderate",label:"Moderate risk",color:"var(--warning-color,#d1bb60)",sentence:"Moderate particle levels around your home."},{key:"high",label:"High risk",color:"var(--error-color,#c9706e)",sentence:"High particle levels around your home."},{key:"very_high",label:"Very high risk",color:"var(--deep-purple-color,#8c6373)",sentence:"Very high particle levels around your home."}],Yt=n=>n&&/^\d+(\.\d+)?$/.test(n.state)&&Number.isFinite(Number(n.state))?Number(n.state):NaN,v=(n,i)=>({label:n,sentence:i,index:-1,value:"\u2014",color:"var(--disabled-text-color,#888)"}),Fe=n=>n<=3?0:n<=6?1:n<=10?2:3,rt=class extends b{static{this.styles=m`${k}
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

  `}connectedCallback(){super.connectedCallback(),this.freshnessClock=setInterval(()=>this.requestUpdate(),3e4)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this.freshnessClock)}static getStubConfig(){return{aqhi_entity:"sensor.example_smoke_index",category_entity:"sensor.example_smoke_category",source_entity:"sensor.example_pm25"}}setConfig(i){for(let t of["aqhi_entity","category_entity","source_entity"])if(typeof i[t]!="string"||!/^sensor\.[a-z0-9_]+$/.test(i[t]))throw Error(`Choose a sensor for ${t}`);for(let t of["data_expected_entity","regional_entity"])if(i[t]&&(typeof i[t]!="string"||!/^sensor\.[a-z0-9_]+$/.test(i[t])))throw Error(`Choose a sensor for ${t}`);if(i.stale_after_minutes!==void 0&&(!Number.isFinite(i.stale_after_minutes)||i.stale_after_minutes<1||i.stale_after_minutes>1440))throw Error("stale_after_minutes must be between 1 and 1440");this.applyConfig(i)}getCardSize(){return this.config?.regional_entity?7:4}getGridOptions(){return{columns:12,rows:"auto",min_columns:6}}moreInfo(i,t){i.stopPropagation(),this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:t},bubbles:!0,composed:!0}))}timestampFreshness(i,t=this.config.stale_after_minutes??120){let e=i.map(s=>{if(typeof s!="string"||!/^\d{4}-\d{2}-\d{2}T([01]\d|2[0-3]):[0-5]\d:[0-5]\d(\.\d+)?(Z|[+-]\d{2}:\d{2})$/.test(s))return NaN;let o=Date.parse(s);return Number.isFinite(o)&&new Date(s.slice(0,10)+"T00:00:00Z").toISOString().slice(0,10)===s.slice(0,10)?o:NaN});return e.some(s=>!Number.isFinite(s)||s>Date.now()+6e4)?"Unknown":e.some(s=>Date.now()-s>t*6e4)?"Stale":void 0}freshness(i){return this.timestampFreshness(i.map(t=>t?.last_reported??t?.last_updated))}get local(){let i=this.hass.states,t=i[this.config.aqhi_entity],e=i[this.config.source_entity],s=i[this.config.category_entity];if([t,e,s].some(f=>!f||f.state==="unavailable"))return v("Unavailable","The local air sensor is unavailable.");if(!Number.isFinite(Yt(e)))return v("Unknown","Waiting for a local particle reading.");let o=t.attributes;if(!(o.index_type==="canadian_aqhi_smoke_pm25"&&o.scope==="local_pm25_only_estimate")||o.source_entity!==this.config.source_entity)return v("Unknown","Choose a matching Canadian PM2.5 smoke estimate sensor.");let a=this.timestampFreshness([o.evaluated_at]);if(a)return v(a,"Waiting for a recent smoke calculation.");if(o.status==="source_stale")return v("Stale","Waiting for a recent particle reading.");if(o.status==="incomplete_history")return v("Warming up","Gathering enough particle history.");if(o.status==="history_unavailable")return v("Unavailable","Particle history is unavailable.");if(o.status!=="valid")return v("Unknown","Waiting for a valid particle reading.");let c=o.source_max_age_minutes;if(typeof c!="number"||!Number.isFinite(c)||c<=0)return v("Unknown","Waiting for source freshness metadata.");let p=this.timestampFreshness([o.source_last_reported],Math.min(c,this.config.stale_after_minutes??120));if(p)return v(p,"Waiting for a recent particle reading.");let h=Yt(t);if(!Number.isInteger(h)||h<1||h>11||!ot.some(f=>f.key===s.state)){let f=Date.parse(i[this.config.data_expected_entity||""]?.state||"");return(t.state==="unknown"||s.state==="unknown")&&f>Date.now()?v("Warming up","Gathering enough particle history."):v("Unknown","Waiting for a calculated Canadian smoke index.")}let u=Fe(h);return ot[u].key!==s.state?v("Updating","Waiting for matching Canadian smoke readings."):{...ot[u],index:u,value:h===11?"10+":String(h)}}get regional(){let i=this.hass.states[this.config.regional_entity];if(!i||i.state==="unavailable")return v("Unavailable","Regional AQHI is unavailable.");let t=Yt(i),e=i.state==="10+";if(!e&&(!Number.isFinite(t)||t<0))return v("Unknown","Waiting for regional AQHI.");let s=this.freshness([i]);if(s)return v(s,"Waiting for recent regional AQHI.");let o=e?11:Math.max(1,Math.round(t)),r=Fe(o);return{...ot[r],index:r,value:o>10?"10+":String(o)}}render(){if(!this.config||!this.hass)return d;let i=this.local,t=this.regional,e=this.hass.states[this.config.regional_entity];return l`<ha-card part="surface" style=${C({"--air-color":i.color,"--kiosk-background":this.config.appearance?.background,"--kiosk-radius":this.config.appearance?.radius,"--kiosk-icon-color":this.config.appearance?.icon_color})}>
      <div class="local-summary" role="button" tabindex="0" aria-label=${`${this.config.name||"Outside air"}: local Canadian smoke history`} aria-description="Local PM2.5-only Canadian smoke estimate, not full regional AQHI. Bands: low 1–3, moderate 4–6, high 7–10, very high 10+." title="Canadian PM2.5-only smoke estimate, not the full regional multi-pollutant AQHI." @click=${s=>this.moreInfo(s,this.config.aqhi_entity)} @keydown=${s=>{(s.key==="Enter"||s.key===" ")&&(s.preventDefault(),s.repeat||this.moreInfo(s,this.config.aqhi_entity))}}>
      <div class="identity"><span part="icon-circle" aria-hidden="true"><ha-icon .icon=${this.config.icon||"mdi:weather-windy"}></ha-icon></span><div><span part="title">${this.config.name||"Outside air"}</span>${this.config.location?l`<span part="detail">${this.config.location}</span>`:d}</div></div>
      <div role="status" aria-live="polite" aria-atomic="true"><div class="hero"><div part="aqhi">${i.value} <span class="unit">AQHI</span></div><span part="category">${i.label}</span></div><p part="interpretation">${i.sentence}</p></div>
      <div aria-hidden="true"><div class="rail">${ot.map((s,o)=>l`<span part="segment" class=${i.index===o?"selected":""} style=${C({background:s.color})}></span>`)}</div><div class="labels"><span>Low · 1–3</span><span>Very high · 10+</span></div></div>
      </div>
      ${this.config.regional_entity?l`<section class="regional-section" aria-label="Regional Canadian AQHI"><div class="provenance">${e?.attributes.location||"Regional"} · Regional AQHI</div><div class="row"><div class="regional-reading" role="status" aria-live="polite" aria-atomic="true"><span part="regional-category">${t.label}</span><div part="regional-aqhi">${t.value} <span class="unit">AQHI</span></div></div><button aria-label="Details: regional AQHI history" @click=${s=>this.moreInfo(s,this.config.regional_entity)}>Details ↗</button></div>${e?.attributes.attribution?l`<div class="provenance">${e.attributes.attribution}</div>`:d}</section>`:d}
    </ha-card>`}};_();_();async function at(){if(!["ha-dialog","ha-form","ha-button","ha-dialog-footer"].every(n=>customElements.get(n))){let n=await window.loadCardHelpers?.();if(!n)throw new Error("Home Assistant dialog controls are unavailable");await(await n.createCardElement({type:"entities",entities:[]})).constructor.getConfigElement?.()}if(!["ha-dialog","ha-form","ha-button","ha-dialog-footer"].every(n=>customElements.get(n)))throw new Error("Home Assistant dialog controls are unavailable")}function ct(n){n.dispatchEvent(new CustomEvent("show-dialog",{bubbles:!0,composed:!0,detail:{dialogTag:"kiosk-feeder-meal-dialog",dialogImport:()=>Promise.resolve(),dialogParams:{owner:n}}}))}var wt=class extends g{constructor(){super(...arguments);this.open=!1}static{this.properties={hass:{attribute:!1},owner:{state:!0},open:{state:!0}}}async showDialog(t){this.owner=t.owner,this.owner.nativeDialog=this,this.open=!0,await this.updateComplete}invalidate(){this.open&&(this.open=!1,this.owner.nativeDialog=void 0,this.dispatchEvent(new CustomEvent("dialog-closed",{bubbles:!0,composed:!0,detail:{dialog:this.localName}})))}closeDialog(){return this.dismiss(),!0}dismiss(){this.open&&(this.open=!1,this.owner.nativeDialog=void 0,this.owner.view==="delete"&&!this.owner.busy&&(this.owner.view="edit"),this.owner.cancel(),this.dispatchEvent(new CustomEvent("dialog-closed",{bubbles:!0,composed:!0,detail:{dialog:this.localName}})))}save(){!this.renderRoot.querySelector("ha-form")?.reportValidity?.()||!this.owner.saveable||(this.owner.save(),this.dismiss())}render(){let t=this.owner,e=t?.draft[t?.editing];if(t?.view==="feed")return l`<ha-dialog
        .open=${this.open}
        header-title=${`Feed ${t.feedDose} portions?`}
        @closed=${this.dismiss}
        ><p>This dispenses food immediately.</p>
        <ha-dialog-footer slot="footer"
          ><ha-button
            slot="secondaryAction"
            appearance="plain"
            @click=${this.dismiss}
            >Cancel</ha-button
          ><ha-button
            slot="primaryAction"
            ?disabled=${!t.feedReady}
            @click=${()=>{t.feed(),this.dismiss()}}
            >Feed now</ha-button
          ></ha-dialog-footer
        ></ha-dialog
      >`;if(!t||!e)return d;let s=t.view==="delete",o=[{name:"time",required:!0,selector:{time:{no_second:!0}}},{name:"portions",required:!0,selector:{number:{min:1,max:Math.min(60,t.attrs.max_portions??60),step:1,mode:"box"}}},{name:"enabled",selector:{boolean:{}}},...t.attrs.snapshot_source==="restored"?[{name:"acknowledged",selector:{boolean:{}}}]:[]];return l`<ha-dialog
      .open=${this.open}
      .headerTitle=${s?"Delete meal?":t.operation==="add_feeder_meal"?"Add meal":"Edit meal"}
      @closed=${this.dismiss}
    >
      ${s?l`<p>Delete ${e.time} · ${e.portions} portions?</p>`:l`<ha-form
              autofocus
              .hass=${this.hass??t.hass}
              .locale=${(this.hass??t.hass).locale}
              .data=${{time:e.time,portions:e.portions,enabled:e.enabled,acknowledged:t.acknowledged}}
              .schema=${o}
              .computeLabel=${r=>({time:"Time",portions:"Portions",enabled:"Enabled",acknowledged:"Use saved plan?"})[r.name]}
              @value-changed=${r=>{let a=r.detail.value;t.edit("time",a.time?.slice(0,5)),t.edit("portions",a.portions),t.edit("enabled",a.enabled),t.acknowledged=a.acknowledged===!0,this.requestUpdate()}}
            ></ha-form>`}
      <ha-dialog-footer slot="footer">
        ${!s&&t.operation!=="add_feeder_meal"?l`<ha-button
                slot="secondaryAction"
                appearance="plain"
                variant="danger"
                ?disabled=${t.baseline.length<=1}
                @click=${()=>{t.view="delete",this.requestUpdate()}}
                >Delete</ha-button
              >`:d}
        <ha-button
          slot="secondaryAction"
          appearance="plain"
          @click=${()=>{s?(t.view="edit",this.requestUpdate()):this.dismiss()}}
          >Cancel</ha-button
        >
        <ha-button
          slot="primaryAction"
          variant=${s?"danger":"brand"}
          ?disabled=${s?t.locked||t.attrs.snapshot_source==="restored"&&!t.acknowledged:!t.saveable}
          @click=${()=>{s?(t.save(!0),this.dismiss()):this.save()}}
          >${s?"Delete":"Save"}</ha-button
        >
      </ha-dialog-footer>
    </ha-dialog>`}};customElements.get("kiosk-feeder-meal-dialog")||customElements.define("kiosk-feeder-meal-dialog",wt);var Oe=["monday","tuesday","wednesday","thursday","friday","saturday","sunday"],lt=n=>n.map(i=>({...i,days:[...i.days]})),dt=(n,i=10,t=60)=>Array.isArray(n)&&n.length<=Math.min(10,i)&&n.every(e=>e&&typeof e=="object"&&Object.keys(e).sort().join(",")==="days,enabled,portions,time"&&Array.isArray(e.days)&&e.days.length===7&&new Set(e.days).size===7&&Oe.every(s=>e.days.includes(s))&&typeof e.time=="string"&&/^([01]\d|2[0-3]):[0-5]\d$/.test(e.time)&&Number.isInteger(e.portions)&&e.portions>=1&&e.portions<=Math.min(60,t)&&typeof e.enabled=="boolean"),U=(n,i)=>n.length===i.length&&n.every((t,e)=>t.time===i[e].time&&t.portions===i[e].portions&&t.enabled===i[e].enabled&&t.days.length===i[e].days.length&&t.days.every(s=>i[e].days.includes(s))),Xt=["accent_color","icon_color","border_radius","font_family","header_font_size","meal_time_font_size","row_background","card_background","control_size"],te=["background","icon_background","icon_color","title_color","subtitle_color"];function je(n={}){let i={},t={accent_color:"color",icon_color:"color",border_radius:"border-radius",font_family:"font-family",header_font_size:"font-size",meal_time_font_size:"font-size",row_background:"background-color",card_background:"background-color",control_size:"width"};for(let e of Xt){let s=n[e];if(!(s===void 0||s==="")){if(typeof s!="string"||s.length>160||/[;{}<>\\]|url\s*\(|expression\s*\(|!important|\/\*/i.test(s)||!CSS.supports(t[e],s))throw new Error(`Invalid appearance.${e}`);i[e]=s}}if(n.off!==void 0){if(!n.off||typeof n.off!="object"||Array.isArray(n.off))throw new Error("Invalid appearance.off");i.off={};for(let e of te){let s=n.off[e];if(!(s===void 0||s==="")){if(typeof s!="string"||s.length>160||/[;{}<>\\]|url\s*\(|expression\s*\(|!important|\/\*/i.test(s)||!CSS.supports("color",s))throw new Error(`Invalid appearance.off.${e}`);i.off[e]=s}}}return i}var $t=class extends g{constructor(){super(...arguments);this.draft=[];this.editing=null;this.view="list";this.busy=!1;this.feedBusy=!1;this.helperBusy=!1;this.message="";this.conflict=!1;this.acknowledged=!1;this.feedPortions=1;this.base=0;this.baseline=[];this.serviceCompleted=!1;this.attempt=0;this.failed=!1;this.toggling=null;this.operation="update_feeder_meal";this.feedUnresolved=!1}static{this.properties={config:{state:!0},draft:{state:!0},editing:{state:!0},view:{state:!0},busy:{state:!0},message:{state:!0},conflict:{state:!0},acknowledged:{state:!0},feedPortions:{state:!0},feedBusy:{state:!0},helperBusy:{state:!0}}}setConfig(t){if(!t.entity?.startsWith("sensor."))throw new Error("Select a schedule sensor");if(t.portions_entity&&!t.portions_entity.startsWith("input_number."))throw new Error("Select a portions helper");if(this.busy||this.feedBusy)throw new Error("Wait for completion before changing config");if(t.meal_icon_mode&&!["time_of_day","fixed"].includes(t.meal_icon_mode))throw new Error("Select time_of_day or fixed meal icons");this.config={...t,appearance:je(t.appearance)};for(let e of Xt){this.style.removeProperty(`--feeder-${e.replaceAll("_","-")}`);let s=this.config.appearance?.[e];s&&this.style.setProperty(`--feeder-${e.replaceAll("_","-")}`,s)}for(let e of te){let s=`--feeder-off-${e.replaceAll("_","-")}`;this.style.removeProperty(s);let o=this.config.appearance?.off?.[e];o&&this.style.setProperty(s,o)}this.reset()}set hass(t){this._hass=t;let e=this.attrs;this.busy?e.error&&!e.pending?this.failure(e.error):this.toggling!==null&&e.revision>this.base&&this.sent&&dt(e.meals,e.max_meals,e.max_portions)&&!U(this.sent,e.meals)?this.failure("Schedule changed during update"):this.serviceCompleted&&this.writable&&e.snapshot_source==="received"&&e.revision>this.base&&Date.parse(e.last_received_at)>Date.parse(this.sentAt??"")&&this.sent&&U(this.sent,e.meals)&&(this.clearTimer(),this.busy=!1,this.failed=!1,this.sent=void 0,this.toggling=null,this.editing=null,this.load(),this.message=""):this.editing!==null||this.failed?(e.revision!==this.base||!this.writable||!U(this.baseline,e.meals))&&(this.conflict=!0,this.view="list",this.message="Schedule changed. Reload to continue.",this.nativeDialog?.invalidate()):this.load(),this.nativeDialog?.requestUpdate(),this.requestUpdate()}get hass(){return this._hass}get attrs(){return this._hass?.states[this.config?.entity]?.attributes??{}}get writable(){let t=this._hass?.states[this.config?.entity],e=this.attrs;return!!t&&e.native_feeder_profile==="ft11w"&&(!this._hass?.services||["update_feeder_meal","add_feeder_meal","delete_feeder_meal"].every(s=>!!this._hass?.services?.localtuya?.[s]))&&!["unknown","unavailable"].includes(t.state)&&(e.supports_schedule_write===!0&&e.snapshot_source==="received"||e.supports_restored_schedule_write===!0&&e.snapshot_source==="restored"&&e.requires_restored_snapshot_acknowledgement===!0)&&e.supported_days_mode==="every_day"&&Number.isSafeInteger(e.revision)&&e.revision>0&&typeof e.last_received_at=="string"&&Number.isFinite(Date.parse(e.last_received_at))&&e.schedule_valid===!0&&e.pending===!1&&!e.error&&Number.isInteger(e.max_meals)&&e.max_meals>0&&Number.isInteger(e.max_portions)&&e.max_portions>0&&dt(e.meals,e.max_meals,e.max_portions)}get scheduleActive(){let t=this._hass?.states[this.config?.entity],e=this.attrs;return!!t&&!["unknown","unavailable"].includes(t.state)&&e.schedule_valid===!0&&["received","restored"].includes(e.snapshot_source)&&dt(e.meals,e.max_meals,e.max_portions)&&e.meals.some(s=>s.enabled===!0)}get locked(){return!this.writable||this.conflict||this.busy||this.feedBusy||this.attrs.feeding_pending===!0}load(){this.base=this.attrs.revision,this.baseline=dt(this.attrs.meals,this.attrs.max_meals,this.attrs.max_portions)?lt(this.attrs.meals):[],this.draft=lt(this.baseline)}reset(){this.busy||this.feedBusy||(this.editing=null,this.view="list",this.conflict=!1,this.failed=!1,this.toggling=null,this.message="",this.acknowledged=!1,this.load())}async openEditor(t,e){if(!(this.locked||this.view!=="list")){this.load(),this.operation="update_feeder_meal",this.editing=t,this.view="edit",this.acknowledged=!1,this.message="",e!==void 0&&this.edit("enabled",e);try{await at(),ct(this)}catch{this.view="list",this.message="Couldn\u2019t open editor. Refresh Home Assistant."}}}async toggle(t,e){let s=e.target,o=s.tagName==="BUTTON"?!this.baseline[t]?.enabled:s.checked;s.checked=this.busy&&this.toggling===t?this.sent?.[t].enabled??!1:this.baseline[t]?.enabled??!1,!(this.locked||this.failed||this.view!=="list")&&(this.load(),!(!this.baseline[t]||this.baseline[t].enabled===o)&&(this.operation="update_feeder_meal",this.editing=t,this.toggling=t,this.acknowledged=this.attrs.snapshot_source==="restored",this.edit("enabled",o),await this.save()))}async add(){if(!(this.locked||this.view!=="list"||this.baseline.length>=Math.min(10,this.attrs.max_meals))){this.load(),this.editing=this.draft.length,this.operation="add_feeder_meal",this.view="edit",this.acknowledged=!1,this.message="",this.draft=[...this.draft,{days:[...Oe],time:"23:59",portions:1,enabled:!1}];try{await at(),ct(this)}catch{this.view="list",this.message="Couldn\u2019t open editor. Refresh Home Assistant."}}}edit(t,e){this.locked||this.editing===null||(this.draft=this.draft.map((s,o)=>o===this.editing?{...s,[t]:e}:s))}async cancel(){if(this.busy||this.feedBusy)return;if(this.view==="delete"){this.view="edit";return}let t=this.editing;this.reset(),await this.updateComplete,this.renderRoot.querySelector(`[data-meal="${t}"]`)?.focus()}get saveable(){return!this.locked&&this.editing!==null&&dt(this.draft,this.attrs.max_meals,this.attrs.max_portions)&&!U(this.draft,this.baseline)&&(this.attrs.snapshot_source!=="restored"||this.acknowledged)}clearTimer(){this.timer&&clearTimeout(this.timer),this.timer=void 0}failure(t){if(this.attempt++,this.clearTimer(),this.busy=!1,this.failed=!0,this.toggling!==null){this.toggling=null,this.sent=void 0,this.editing=null,this.failed=!1,this.load(),this.message="Couldn\u2019t change meal. Check the schedule before trying again.",this.requestUpdate();return}this.message="Couldn\u2019t save. Try again.",this.requestUpdate()}async retry(){if(!(this.busy||this.conflict||this.editing===null||this.attrs.revision!==this.base||!this.writable||!U(this.baseline,this.attrs.meals))){this.failed=!1,this.view=this.operation==="delete_feeder_meal"?"delete":"edit",this.message="";try{await at(),ct(this)}catch{this.view="list",this.message="Couldn\u2019t open editor. Refresh Home Assistant."}}}async save(t=!1){if(this.editing===null||this.locked||this.attrs.revision!==this.base||!U(this.baseline,this.attrs.meals)||(t?this.view!=="delete"||this.attrs.snapshot_source==="restored"&&!this.acknowledged:!this.saveable)||t&&this.baseline.length<=1)return;t&&(this.operation="delete_feeder_meal");let e=this.editing;this.sent=lt(t?this.baseline.filter((r,a)=>a!==e):this.draft);let s={entity_id:this.config.entity,expected_revision:this.base,...this.operation!=="add_feeder_meal"?{meal_index:e}:{},...t?{}:{meal:lt([this.draft[e]])[0]},...this.attrs.snapshot_source==="restored"?{acknowledge_restored_snapshot:!0}:{}};this.sentAt=this.attrs.last_received_at;let o=++this.attempt;this.serviceCompleted=!1,this.busy=!0,this.failed=!1,this.view="list",this.message="",this.clearTimer(),this.timer=setTimeout(()=>{this.busy&&this.attempt===o&&this.failure(new Error("Schedule confirmation timed out; no retry sent"))},2e4);try{let r=await this.hass.callService("localtuya",this.operation,s,void 0,void 0,!0);if(!this.busy||this.attempt!==o)return;r?.error||r?.response?.error||r?.confirmed===!1||r?.response?.confirmed===!1?this.failure(r?.error??r?.response?.error??"unconfirmed"):(this.serviceCompleted=!0,this.hass=this.hass)}catch(r){this.busy&&this.attempt===o&&this.failure(r)}}get helper(){return this.config.portions_entity?this._hass?.states[this.config.portions_entity]:void 0}get selectedPortions(){return this.config.portions_entity?Number(this.helper?.state):this.feedPortions}get feedBounds(){if(!this.config.portions_entity)return{min:1,max:60};let t=this.helper;if(!(!t||["unknown","unavailable",""].includes(t.state)||!Number.isInteger(Number(t.attributes.min))||!Number.isInteger(Number(t.attributes.max))))return{min:Math.max(1,Number(t.attributes.min)),max:Math.min(60,Number(t.attributes.max))}}get feedReady(){let t=this.selectedPortions,e=this.feedBounds;return this.attrs.native_feeder_profile==="ft11w"&&!this.feedUnresolved&&!!this._hass?.states[this.config.entity]&&!["unknown","unavailable"].includes(this._hass.states[this.config.entity].state)&&!["unknown","command_pending","feeding"].includes(this.attrs.feeding_state)&&this.attrs.supports_manual_feed===!0&&!this.attrs.feeding_pending&&!this.attrs.pending&&(!this.hass.services||!!this.hass.services.localtuya?.feed)&&!!e&&Number.isInteger(t)&&t>=e.min&&t<=e.max&&!this.busy&&!this.feedBusy&&!this.helperBusy}async selectFeed(t){let e=this.feedBounds,s=this.selectedPortions;if(!(!e||this.helperBusy||this.feedBusy||this.busy||!Number.isInteger(s)||s<e.min||s>e.max||s+t<e.min||s+t>e.max)){if(!this.config.portions_entity){this.feedPortions=s+t;return}this.helperBusy=!0;try{await this.hass.callService("input_number",t>0?"increment":"decrement",{entity_id:this.config.portions_entity})}catch{this.message="Couldn\u2019t change portions. Try again."}finally{this.helperBusy=!1}}}async confirmFeed(){if(!(!this.feedReady||this.view!=="list")){this.feedDose=this.selectedPortions,this.view="feed",this.message="";try{await at(),ct(this)}catch{this.view="list",this.message="Couldn\u2019t open confirmation. Refresh Home Assistant."}}}async feed(){if(!(!this.feedReady||!Number.isInteger(this.feedDose)||this.feedDose<1||this.feedDose>60)){this.feedBusy=!0,this.view="list",this.message="";try{this.feedUnresolved=!0;let t=await this.hass.callService("localtuya","feed",{entity_id:this.config.entity,portions:this.feedDose,confirmed:!0},void 0,void 0,!0),e=t?.response??t;if(e?.error||e?.reported!==!0)throw new Error("unconfirmed");this.feedUnresolved=!1,this.message=""}catch{this.message="Feeding outcome unknown. Check the feeder before any further action."}finally{this.feedBusy=!1,this.feedDose=void 0}}}static getConfigElement(){return document.createElement("kiosk-feeder-card-editor")}static getStubConfig(){return{entity:"",title:"Feeder",icon:"mdi:food-drumstick"}}getCardSize(){return 2+this.baseline.length}getGridOptions(){return{columns:12,min_columns:6}}mealIcon(t){if(this.config.meal_icon_mode==="fixed")return this.config.meal_icon??this.config.icon??"mdi:food-drumstick";let e=Number(t.slice(0,2));return e>=5&&e<11?"mdi:weather-sunset-up":e>=11&&e<16?"mdi:white-balance-sunny":e>=16&&e<21?"mdi:weather-sunset-down":"mdi:weather-night"}lastFeedLabel(){let t=this.attrs.last_feed_at;if(typeof t!="string"||!/(Z|[+-]\d{2}:\d{2})$/.test(t))return"No recent feeding";let e=new Date(t),s=new Date;if(!Number.isFinite(e.getTime())||e>s)return"No recent feeding";let o=this.hass?.config?.time_zone,r=f=>new Intl.DateTimeFormat("en-CA",{timeZone:o,year:"numeric",month:"2-digit",day:"2-digit"}).format(f),a=new Intl.DateTimeFormat("en-CA",{timeZone:o,year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(s),c=f=>Number(a.find(y=>y.type===f)?.value),p=new Date(Date.UTC(c("year"),c("month")-1,c("day")-1,12)),h=new Intl.DateTimeFormat("en-CA",{timeZone:"UTC",year:"numeric",month:"2-digit",day:"2-digit"}).format(p),u=new Intl.DateTimeFormat("en-GB",{timeZone:o,hour:"2-digit",minute:"2-digit",hourCycle:"h23"}).format(e);return r(e)===r(s)?`Last fed ${u}`:r(e)===h?`Last fed yesterday \xB7 ${u}`:`Last fed ${new Intl.DateTimeFormat("en-US",{timeZone:o,month:"short",day:"numeric"}).format(e)} \xB7 ${u}`}render(){return this.config?l`<ha-card
      part="card outer"
      aria-busy=${String(this.busy||this.feedBusy||this.helperBusy)}
      data-active=${String(this.scheduleActive)}
      @keydown=${t=>{t.key==="Escape"&&this.view!=="list"&&(t.preventDefault(),this.cancel())}}
    >
      ${l`<header
          part=${this.config.manual_feed?"header feed-container manual-feed row":"header feed-container"}
          data-active=${String(this.scheduleActive)}
          class=${this.config.manual_feed?"manual":""}
        >
          <button
            class="identity-add"
            part="add control"
            aria-label="Add meal"
            title="Add meal"
            ?disabled=${this.locked||this.failed||this.baseline.length>=Math.min(10,this.attrs.max_meals)}
            @click=${this.add}
          >
            <ha-icon
              part="header-icon"
              .icon=${this.config.icon??this.config.feed_icon??"mdi:food-drumstick"}
            ></ha-icon>
          </button>
          <div class="identity">
            <h2 part="title">
              ${this.config.title??this.config.feed_title??"Feeder"}
            </h2>
            <div class="last-feed" part="subtitle">${this.lastFeedLabel()}</div>
          </div>
          ${this.config.manual_feed?l`<button part="control" aria-label="Decrease feeding portions" ?disabled=${!this.feedBounds||!Number.isInteger(this.selectedPortions)||this.selectedPortions<=this.feedBounds.min||this.helperBusy||this.feedBusy||this.busy} @click=${()=>this.selectFeed(-1)}>−</button><output aria-label="Feeding portions">${Number.isInteger(this.selectedPortions)&&this.feedBounds&&this.selectedPortions>=this.feedBounds.min&&this.selectedPortions<=this.feedBounds.max?this.selectedPortions:"\u2014"}</output><button part="control" aria-label="Increase feeding portions" ?disabled=${!this.feedBounds||!Number.isInteger(this.selectedPortions)||this.selectedPortions>=this.feedBounds.max||this.helperBusy||this.feedBusy||this.busy} @click=${()=>this.selectFeed(1)}>+</button><button class="accent feed" ?disabled=${!this.feedReady} @click=${this.confirmFeed}>Feed</button>`:d}
        </header>
        ${this.message?l`<div part="status" class="status" role="status">${this.message}</div>`:d}
        <section
          aria-label="FeederMeal schedule"
          ?inert=${this.busy||this.feedBusy}
        >
          ${this.writable||this.attrs.native_feeder_profile==="ft11w"&&this.attrs.snapshot_source==="restored"&&this.attrs.schedule_valid===!0||this.busy||this.failed||this.conflict?this.baseline.map((t,e)=>l`<div
                      class="meal"
                      part="meal row"
                      data-enabled=${String(t.enabled)}
                    >
                      <button
                        class="meal-toggle"
                        part="enabled control"
                        role="switch"
                        aria-label=${`Enabled ${e+1}`}
                        aria-description=${`FeederMeal ${e+1} at ${t.time}; tap to ${t.enabled?"disable":"enable"}`}
                        aria-checked=${String(t.enabled)}
                        aria-busy=${String(this.busy&&this.toggling===e)}
                        ?disabled=${this.locked||this.failed}
                        @click=${s=>{s.stopPropagation(),this.toggle(e,{target:s.currentTarget})}}
                      >
                        <ha-icon .icon=${this.mealIcon(t.time)}></ha-icon>
                      </button>
                      <button
                        part="meal-button"
                        class="open"
                        data-meal=${e}
                        aria-label=${`Edit meal ${e+1}`}
                        ?disabled=${this.locked||this.failed}
                        @click=${()=>this.openEditor(e)}
                      >
                        <span class="time" part="meal-time">${t.time}</span
                        ><span class="detail"
                          >Every day ·
                          <span aria-label=${`Portions ${e+1}`}
                            >${t.portions}</span
                          >
                          portion${t.portions===1?"":"s"}</span
                        >
                      </button>
                    </div>`):l`<div class="unavailable">Schedule unavailable</div>`}
          ${!this.writable&&this.attrs.snapshot_source==="restored"&&this.attrs.schedule_valid===!0?l`<div class="unavailable">Schedule unavailable</div>`:d}
          ${!this.writable&&!this.busy&&!this.failed&&!this.conflict?l`<button @click=${this.reset}>Retry</button>`:d}
        </section>`}
      ${this.conflict?l`<button @click=${this.reset}>Reload</button>`:this.failed?l`<div class="actions"><button @click=${this.reset}>Cancel</button><button ?disabled=${!this.writable} @click=${this.retry}>Try again</button></div>`:d}
    </ha-card>`:d}static{this.styles=m`
    :host {
      display: block;
      container-type: inline-size;
      color: var(--primary-text-color, #222);
      font-family: var(
        --feeder-font-family,
        var(--ha-font-family-body, system-ui)
      );
      font-size: 15px;
      --accent: var(
        --feeder-accent-color,
        var(--accent-color, var(--primary-color, #03a9f4))
      );
      --icon-palette: var(
        --feeder-icon-color,
        var(--color-teal, var(--accent))
      );
      --control: max(44px, var(--feeder-control-size, 44px));
    }
    * {
      box-sizing: border-box;
    }
    ha-card {
      display: block;
      padding: 10px;
      background: var(
        --feeder-card-background,
        var(--ha-card-background, var(--card-background-color, #fff))
      );
      border-radius: var(
        --feeder-border-radius,
        var(--ha-card-border-radius, 20px)
      );
      border: var(--ha-card-border-width, 1px) solid
        var(--ha-card-border-color, var(--divider-color, #ddd));
      box-shadow: var(--ha-card-box-shadow, none);
    }
    header[data-active="true"] {
      background: var(--feeder-active-card-background, white);
      color: var(--feeder-active-text-color, black);
      --primary-text-color: var(--feeder-active-text-color, black);
      --secondary-text-color: var(--feeder-active-muted-color, gray);
      --feeder-header-icon-background: var(
        --feeder-active-icon-background,
        var(--icon-palette)
      );
      --feeder-header-icon-color: var(--feeder-active-icon-color, white);
    }
    section > .add {
      display: block;
      margin: 8px 0 0 auto;
    }
    header {
      display: flex;
      align-items: center;
      gap: 14px;
      min-height: 68px;
      margin-bottom: 12px;
    }
    h2 {
      margin: 0;
      font-size: var(--feeder-header-font-size, 18px);
      font-weight: 500;
      color: var(--primary-text-color, #222);
      line-height: 1.3;
    }
    ha-icon {
      --mdc-icon-size: 20px;
      width: 20px;
      height: 20px;
      flex-shrink: 0;
      color: var(--secondary-text-color, #777);
    }
    header .identity-add ha-icon {
      --mdc-icon-size: 25px;
      width: 45px;
      height: 45px;
      padding: 10px;
      border-radius: 50%;
      background: var(--feeder-header-icon-background, transparent);
      color: var(--feeder-header-icon-color, #9da0a2);
    }
    header:not(.edit-header):has(> .identity-add) {
      display: grid;
      grid-template-columns: 64px minmax(0, 1fr);
      gap: 0;
      margin-left: -10px;
      margin-right: -10px;
    }
    header .identity-add ha-icon {
      margin-left: 11.5px;
    }
    .meal {
      display: flex;
      align-items: center;
      gap: 8px;
      border-radius: var(
        --feeder-border-radius,
        var(--ha-card-border-radius, 20px)
      );
      background: var(
        --feeder-row-background,
        color-mix(in srgb, var(--primary-text-color, #222) 4.5%, transparent)
      );
      margin: 8px 0;
      overflow: hidden;
    }
    .open {
      display: flex;
      align-items: center;
      gap: 12px;
      flex: 1;
      min-width: 0;
      text-align: left;
      padding: 16px 12px;
      border-radius: 0;
    }
    .time {
      display: block;
      flex-shrink: 0;
      font-size: var(--feeder-meal-time-font-size, 32px);
      font-weight: 500;
      letter-spacing: -1.5px;
      line-height: 1.15;
      font-variant-numeric: tabular-nums;
    }
    .detail,
    .status,
    .unavailable {
      color: var(--secondary-text-color, #777);
    }
    .detail {
      font-size: 13px;
    }
    .open .detail {
      display: block;
      margin: 0;
      line-height: 1.3;
      text-wrap: pretty;
    }
    button {
      min-height: var(--control);
      min-width: 44px;
      border: 0;
      border-radius: 12px;
      background: transparent;
      color: inherit;
      font: inherit;
      font-weight: 500;
      padding: 10px 14px;
      cursor: pointer;
      touch-action: manipulation;
    }
    button:disabled,
    input:disabled {
      opacity: 0.28;
      cursor: default;
    }
    button:focus-visible,
    input:focus-visible {
      outline: 2px solid var(--accent);
      outline-offset: 2px;
    }
    .accent {
      background: var(--accent);
      color: var(--text-primary-color, #fff);
    }
    .add {
      width: var(--control);
      height: var(--control);
      padding: 0;
      margin-left: auto;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--accent);
    }
    .add ha-icon {
      color: inherit;
    }
    .status {
      font-size: 13px;
      line-height: 1.5;
      margin-top: 12px;
    }
    .switch {
      appearance: none;
      width: 49px;
      height: var(--control);
      flex: 0 0 49px;
      margin: 0 14px 0 0;
      background: linear-gradient(
          var(--disabled-text-color, #aaa),
          var(--disabled-text-color, #aaa)
        )
        center/49px 30px no-repeat;
      position: relative;
      cursor: pointer;
      border: 0;
      border-radius: 22px;
    }
    .switch:after {
      content: "";
      position: absolute;
      left: 3px;
      top: calc(50% - 12px);
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: #fff;
    }
    .switch:checked {
      background: linear-gradient(var(--accent), var(--accent)) center/49px 30px
        no-repeat;
    }
    .switch:checked:after {
      left: 22px;
    }
    .field {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 0;
      border-bottom: 1px solid var(--divider-color, #ddd);
      gap: 12px;
    }
    .field .switch {
      margin: 0;
    }
    input[type="time"] {
      color: inherit;
      background: transparent;
      border: 1px solid var(--divider-color, #ddd);
      border-radius: 12px;
      padding: 8px;
      font: inherit;
      min-height: var(--control);
      max-width: 155px;
    }
    input[type="checkbox"]:not(.switch) {
      width: 44px;
      height: 44px;
      margin: 0;
      accent-color: var(--accent);
    }
    .stepper {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .stepper button,
    .manual > button:not(.feed):not(.identity-add) {
      width: var(--control);
      height: var(--control);
      padding: 0;
      font-size: 22px;
      background: var(
        --feeder-row-background,
        color-mix(in srgb, var(--primary-text-color, #222) 4.5%, transparent)
      );
    }
    output {
      min-width: 28px;
      text-align: center;
      font-size: 24px;
      font-weight: 500;
      font-variant-numeric: tabular-nums;
    }
    .danger {
      color: var(--error-color, #db4437);
    }
    .delete {
      width: 100%;
      text-align: left;
      margin-top: 12px;
    }
    .actions {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      margin-top: 16px;
    }
    .edit-header {
      justify-content: space-between;
      gap: 6px;
    }
    .edit-header [data-back] {
      display: flex;
      align-items: center;
      padding-left: 0;
      gap: 2px;
    }
    .edit-header [data-back] ha-icon {
      color: inherit;
    }
    header.manual:not(.edit-header):has(> .identity-add) {
      display: grid;
      grid-template-columns:
        64px minmax(33px, 1fr) var(--control) 32px var(--control)
        minmax(64px, 1fr);
      column-gap: 0;
      align-items: center;
      min-height: 68px;
      margin: 0 -10px 12px;
      padding: 0 6px 0 0;
    }
    .manual h2 {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .manual output {
      font-size: 32px;
      letter-spacing: -2px;
    }
    .manual .feed {
      margin-left: 8px;
      padding: 8px;
    }
    .unavailable {
      padding: 16px 0;
    }
    @container (max-width: 360px) {
      .meal {
        gap: 4px;
      }
      .open {
        gap: 8px;
        padding: 16px 8px;
      }
      .open .time {
        font-size: var(--feeder-meal-time-font-size, 26px);
      }
      .open .detail {
        font-size: 12px;
      }
      .meal .switch {
        margin-right: 8px;
      }
    }
    ha-card {
      padding: 0;
      background: var(--feeder-outer-background, transparent);
      border: 0;
      box-shadow: none;
    }
    header:not(.edit-header):has(> .identity-add),
    header.manual:not(.edit-header):has(> .identity-add) {
      margin: 0 0 8px;
      min-height: 68px;
      border-radius: var(
        --feeder-border-radius,
        var(--ha-card-border-radius, 20px)
      );
      background: var(
        --feeder-feed-background,
        var(--feeder-card-background, rgba(0, 0, 0, 0.3))
      );
      box-shadow:
        0 2px 4px rgba(0, 0, 0, 0.1),
        0 6px 10px rgba(0, 0, 0, 0.08);
    }
    header[data-active="true"]:not(.edit-header):has(> .identity-add) {
      background: var(--feeder-active-card-background, white);
    }
    header .identity-add ha-icon {
      margin-left: 11.5px;
      background: var(--feeder-header-icon-background, transparent);
      color: var(--feeder-header-icon-color, var(--icon-palette));
    }
    .identity-add {
      width: 64px;
      min-height: 68px;
      padding: 0;
      display: flex;
      align-items: center;
      border-radius: inherit;
    }
    .identity {
      min-width: 0;
    }
    .last-feed {
      font-size: 15px;
      line-height: 1.3;
      color: var(--secondary-text-color, #777);
      white-space: normal;
    }
    header.manual:not(.edit-header):has(> .identity-add) {
      grid-template-columns:
        64px minmax(80px, 1fr) var(--control) 32px var(--control)
        minmax(64px, 1fr);
    }
    .meal {
      display: grid;
      grid-template-columns: 66px minmax(0, 1fr);
      gap: 0;
      min-height: 69px;
      margin: 8px 0;
      background: var(
        --feeder-meal-background,
        var(--feeder-row-background, rgba(0, 0, 0, 0.3))
      );
      color: white;
      box-shadow:
        0 2px 4px rgba(0, 0, 0, 0.1),
        0 6px 10px rgba(0, 0, 0, 0.08);
    }
    .meal[data-enabled="true"] {
      background: var(
        --feeder-meal-active-background,
        var(--feeder-active-card-background, white)
      );
      color: var(--feeder-active-text-color, black);
    }
    .meal-toggle {
      width: 66px;
      height: 69px;
      padding: 0;
      display: grid;
      place-items: center;
      border-radius: 0;
    }
    .meal-toggle ha-icon {
      width: 45px;
      height: 45px;
      padding: 10px;
      --mdc-icon-size: 25px;
      border-radius: 24px;
      color: var(--icon-palette);
      background: transparent;
    }
    .meal[data-enabled="true"] .meal-toggle ha-icon {
      background: var(--feeder-active-icon-background, var(--icon-palette));
      color: var(--feeder-active-icon-color, white);
    }
    .open {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      gap: 0;
      min-height: 69px;
      padding: 0 10px 0 0;
    }
    .open .time {
      font-size: var(--feeder-meal-time-font-size, 17px);
      letter-spacing: normal;
      font-weight: 500;
      line-height: 1.3;
    }
    .open .detail {
      font-size: 15px;
      line-height: 1.3;
      color: rgba(255, 255, 255, 0.5);
    }
    .meal[data-enabled="true"] .detail {
      color: var(--feeder-active-muted-color, rgba(0, 0, 0, 0.5));
    }
    .status {
      margin: 0 0 8px;
      font-size: 15px;
    }
    @container (max-width:360px) {
      header.manual:not(.edit-header):has(> .identity-add) {
        grid-template-columns:
          64px minmax(0, 1fr) var(--control) 28px var(--control)
          55px;
        padding-right: 0;
      }
      .manual .feed {
        min-width: 50px;
        margin-left: 5px;
      }
      .manual output {
        min-width: 28px;
      }
      .last-feed {
        font-size: 12px;
      }
      .meal {
        gap: 0;
      }
      .open {
        gap: 0;
        padding: 0 10px 0 0;
      }
      .open .time {
        font-size: var(--feeder-meal-time-font-size, 17px);
      }
      .open .detail {
        font-size: 15px;
      }
    }
    /* OFF is a semantic state, not a transparent category-accent glyph.
       Keep each tile independent: an active header cannot color disabled meals. */
    header[data-active="false"]:not(.edit-header):has(> .identity-add),
    .meal[data-enabled="false"] {
      background: var(
        --feeder-off-background,
        var(--feeder-row-background, rgba(0, 0, 0, 0.3))
      );
      color: var(--feeder-off-title-color, white);
      font-size: 1.2rem;
      min-height: 69px;
    }
    header[data-active="false"]:not(.edit-header):has(> .identity-add) {
      background: var(
        --feeder-off-background,
        var(
          --feeder-feed-background,
          var(--feeder-card-background, rgba(0, 0, 0, 0.3))
        )
      );
    }
    header[data-active="false"] .identity-add ha-icon,
    .meal[data-enabled="false"] .meal-toggle ha-icon {
      background: var(--feeder-off-icon-background, rgba(0, 0, 0, 0.2));
      color: var(--feeder-off-icon-color, white);
      border-radius: 24px;
      box-sizing: content-box;
      width: 25px;
      height: 25px;
      font-size: inherit;
      font-weight: 400;
    }
    header[data-active="false"] h2 {
      color: var(--feeder-off-title-color, white);
      font-size: var(--feeder-header-font-size, 17px);
      line-height: normal;
    }
    header[data-active="false"] .last-feed,
    .meal[data-enabled="false"] .detail {
      color: var(--feeder-off-subtitle-color, rgba(255, 255, 255, 0.5));
      font-size: 15px;
      font-weight: 400;
      line-height: normal;
    }
    .meal[data-enabled="false"] .time {
      color: var(--feeder-off-title-color, white);
      line-height: normal;
    }
    header:not(.edit-header):has(> .identity-add),
    header.manual:not(.edit-header):has(> .identity-add),
    .meal {
      padding: 0 10px 0 0;
    }
    .open {
      padding-right: 0;
    }
    header[data-active="false"] {
      min-height: 69px;
      grid-template-columns: 66px minmax(0, 1fr);
    }
    /* Reserve the same comfortable action space in active, OFF and compact rows. */
    header.manual[data-active]:not(.edit-header):has(> .identity-add) {
      grid-template-columns:
        64px minmax(0, 1fr) var(--control) 28px var(--control) 84px;
      padding-right: 10px;
    }
    .manual .feed {
      box-sizing: border-box;
      width: 76px;
      min-width: 76px;
      min-height: var(--control);
      margin-left: 8px;
      padding: 8px 16px;
      white-space: nowrap;
    }
    [inert] {
      pointer-events: none;
    }
    p {
      color: var(--secondary-text-color, #777);
    }
  `}},Ct=class extends g{static{this.properties={hass:{attribute:!1},config:{state:!0}}}setConfig(i){this.config={...i}}render(){let i={entity:"Schedule sensor",title:"Title",icon:"Identity icon (Add meal)",meal_icon_mode:"FeederMeal icons",meal_icon:"Fixed meal icon",manual_feed:"Show manual feeding",feed_title:"Feeding title",feed_icon:"Feeding icon",portions_entity:"Portions helper (optional)",appearance:"Appearance",accent_color:"Accent color",icon_color:"Icon color",border_radius:"Corner radius",font_family:"Font family",header_font_size:"Header size",meal_time_font_size:"FeederMeal time size",row_background:"Row color",card_background:"Card color",control_size:"Control size (minimum 44px)",off:"Off appearance",background:"Tile color",icon_background:"Icon circle color",title_color:"Title color",subtitle_color:"Details color"};return l`<ha-form
      .hass=${this.hass}
      .data=${this.config}
      .schema=${[{name:"entity",required:!0,selector:{entity:{domain:"sensor",integration:"localtuya",include_entities:Object.entries(this.hass?.states??{}).filter(([t,e])=>t.startsWith("sensor.")&&e.attributes.native_feeder_profile==="ft11w").map(([t])=>t)}}},{name:"title",selector:{text:{}}},{name:"icon",selector:{icon:{}}},{name:"meal_icon_mode",selector:{select:{options:[{value:"time_of_day",label:"Time of day"},{value:"fixed",label:"Fixed icon"}]}}},{name:"meal_icon",selector:{icon:{}}},{name:"manual_feed",selector:{boolean:{}}},{name:"feed_title",selector:{text:{}}},{name:"feed_icon",selector:{icon:{}}},{name:"portions_entity",selector:{entity:{domain:"input_number"}}},{name:"appearance",type:"expandable",schema:[...Xt.map(t=>({name:t,selector:{text:{}}})),{name:"off",type:"expandable",schema:te.map(t=>({name:t,selector:{text:{}}}))}]}]}
      .computeLabel=${t=>i[t.name]??t.name}
      @value-changed=${t=>{let e=t.detail.value,s={...this.config,...e,...e.appearance?{appearance:{...this.config?.appearance,...e.appearance,...e.appearance.off?{off:{...this.config?.appearance?.off,...e.appearance.off}}:{}}}:{}};je(s.appearance),this.config=s,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this.config},bubbles:!0,composed:!0}))}}
    ></ha-form>`}};customElements.get("kiosk-feeder-card")||customElements.define("kiosk-feeder-card",$t);customElements.get("kiosk-feeder-card-editor")||customElements.define("kiosk-feeder-card-editor",Ct);customElements.get("kiosk-door-card")||customElements.define("kiosk-door-card",it);customElements.get("kiosk-climate-card")||customElements.define("kiosk-climate-card",st);customElements.get("kiosk-status-card")||customElements.define("kiosk-status-card",nt);customElements.get("kiosk-air-card")||customElements.define("kiosk-air-card",rt);customElements.get("kiosk-entity-card")||customElements.define("kiosk-entity-card",V);customElements.get("kiosk-action-card")||customElements.define("kiosk-action-card",Q);customElements.get("kiosk-room-card")||customElements.define("kiosk-room-card",tt);customElements.get("kiosk-pill-card")||customElements.define("kiosk-pill-card",et);var qe=window.customBadges||=[];qe.some(n=>n.type==="kiosk-pill-card")||qe.push({type:"kiosk-pill-card",name:"Kiosk pill",description:"Compact status capsule",preview:!0,documentationURL:"https://github.com/myevit/kiosk-cards"});var Le=window.customCards||=[];for(let[n,i,t]of[["kiosk-feeder-card","Kiosk feeder","Native LocalTuya daily meals and optional confirmed manual feeding"],["kiosk-blind-presets-v2-card","Kiosk blind presets","Picture-only composite native dual-cover and legacy TDBU blind presets"],["kiosk-entity-card","Kiosk entity","State tile with isolated quick control"],["kiosk-action-card","Kiosk action","Explicit momentary action tile"],["kiosk-room-card","Kiosk room","Room summary and navigation"],["kiosk-door-card","Kiosk door","Independent door and linked lock observations"],["kiosk-climate-card","Kiosk climate","Current temperature and HVAC mode"],["kiosk-air-card","Kiosk air","Read-only Canadian smoke estimate and separate regional AQHI"],["kiosk-status-card","Kiosk status","Passive temperature and cross-entity status display"],["kiosk-pill-card","Kiosk pill","Compact status capsule for cards and native badges"]])Le.some(e=>e.type===n)||Le.push({type:n,name:i,description:t,preview:!0,documentationURL:"https://github.com/myevit/kiosk-cards"});export{Q as KioskActionCard,rt as KioskAirCard,b as KioskBaseCard,X as KioskBlindPresetsCard,kt as KioskBlindPresetsV2Card,yt as KioskCardEditor,st as KioskClimateCard,it as KioskDoorCard,V as KioskEntityCard,$t as KioskFeederCard,Ct as KioskFeederCardEditor,wt as KioskFeederMealDialog,et as KioskPillCard,tt as KioskRoomCard,nt as KioskStatusCard,Ot as designTokens,k as kioskStyles,Ft as pillStyles};
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
