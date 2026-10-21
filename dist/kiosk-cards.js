var Z=globalThis,J=Z.ShadowRoot&&(Z.ShadyCSS===void 0||Z.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,st=Symbol(),vt=new WeakMap,M=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==st)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(J&&t===void 0){let i=e!==void 0&&e.length===1;i&&(t=vt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&vt.set(e,t))}return t}toString(){return this.cssText}},kt=s=>new M(typeof s=="string"?s:s+"",void 0,st),y=(s,...t)=>{let e=s.length===1?s[0]:t.reduce((i,o,n)=>i+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+s[n+1],s[0]);return new M(e,s,st)},$t=(s,t)=>{if(J)s.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let i=document.createElement("style"),o=Z.litNonce;o!==void 0&&i.setAttribute("nonce",o),i.textContent=e.cssText,s.appendChild(i)}},nt=J?s=>s:s=>s instanceof CSSStyleSheet?(t=>{let e="";for(let i of t.cssRules)e+=i.cssText;return kt(e)})(s):s;var{is:Jt,defineProperty:Xt,getOwnPropertyDescriptor:Yt,getOwnPropertyNames:te,getOwnPropertySymbols:ee,getPrototypeOf:ie}=Object,X=globalThis,xt=X.trustedTypes,oe=xt?xt.emptyScript:"",se=X.reactiveElementPolyfillSupport,N=(s,t)=>s,rt={toAttribute(s,t){switch(t){case Boolean:s=s?oe:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,t){let e=s;switch(t){case Boolean:e=s!==null;break;case Number:e=s===null?null:Number(s);break;case Object:case Array:try{e=JSON.parse(s)}catch{e=null}}return e}},Et=(s,t)=>!Jt(s,t),wt={attribute:!0,type:String,converter:rt,reflect:!1,useDefault:!1,hasChanged:Et};Symbol.metadata??=Symbol("metadata"),X.litPropertyMetadata??=new WeakMap;var $=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=wt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let i=Symbol(),o=this.getPropertyDescriptor(t,i,e);o!==void 0&&Xt(this.prototype,t,o)}}static getPropertyDescriptor(t,e,i){let{get:o,set:n}=Yt(this.prototype,t)??{get(){return this[e]},set(r){this[e]=r}};return{get:o,set(r){let c=o?.call(this);n?.call(this,r),this.requestUpdate(t,c,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??wt}static _$Ei(){if(this.hasOwnProperty(N("elementProperties")))return;let t=ie(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(N("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(N("properties"))){let e=this.properties,i=[...te(e),...ee(e)];for(let o of i)this.createProperty(o,e[o])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[i,o]of e)this.elementProperties.set(i,o)}this._$Eh=new Map;for(let[e,i]of this.elementProperties){let o=this._$Eu(e,i);o!==void 0&&this._$Eh.set(o,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let i=new Set(t.flat(1/0).reverse());for(let o of i)e.unshift(nt(o))}else t!==void 0&&e.push(nt(t));return e}static _$Eu(t,e){let i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return $t(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){let i=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,i);if(o!==void 0&&i.reflect===!0){let n=(i.converter?.toAttribute!==void 0?i.converter:rt).toAttribute(e,i.type);this._$Em=t,n==null?this.removeAttribute(o):this.setAttribute(o,n),this._$Em=null}}_$AK(t,e){let i=this.constructor,o=i._$Eh.get(t);if(o!==void 0&&this._$Em!==o){let n=i.getPropertyOptions(o),r=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:rt;this._$Em=o;let c=r.fromAttribute(e,n.type);this[o]=c??this._$Ej?.get(o)??c,this._$Em=null}}requestUpdate(t,e,i,o=!1,n){if(t!==void 0){let r=this.constructor;if(o===!1&&(n=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??Et)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:o,wrapped:n},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),n!==!0||r!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),o===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[o,n]of this._$Ep)this[o]=n;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[o,n]of i){let{wrapped:r}=n,c=this[o];r!==!0||this._$AL.has(o)||c===void 0||this.C(o,void 0,n,c)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[N("elementProperties")]=new Map,$[N("finalized")]=new Map,se?.({ReactiveElement:$}),(X.reactiveElementVersions??=[]).push("2.1.2");var ut=globalThis,Ct=s=>s,Y=ut.trustedTypes,At=Y?Y.createPolicy("lit-html",{createHTML:s=>s}):void 0,Mt="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,Nt="?"+C,ne=`<${Nt}>`,P=document,R=()=>P.createComment(""),I=s=>s===null||typeof s!="object"&&typeof s!="function",ft=Array.isArray,re=s=>ft(s)||typeof s?.[Symbol.iterator]=="function",at=`[ 	
\f\r]`,O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,St=/-->/g,Tt=/>/g,S=RegExp(`>|${at}(?:([^\\s"'>=/]+)(${at}*=${at}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Pt=/'/g,Ht=/"/g,Ot=/^(?:script|style|textarea|title)$/i,mt=s=>(t,...e)=>({_$litType$:s,strings:t,values:e}),h=mt(1),be=mt(2),_e=mt(3),x=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),Ut=new WeakMap,T=P.createTreeWalker(P,129);function Rt(s,t){if(!ft(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return At!==void 0?At.createHTML(t):t}var ae=(s,t)=>{let e=s.length-1,i=[],o,n=t===2?"<svg>":t===3?"<math>":"",r=O;for(let c=0;c<e;c++){let a=s[c],u,d,l=-1,f=0;for(;f<a.length&&(r.lastIndex=f,d=r.exec(a),d!==null);)f=r.lastIndex,r===O?d[1]==="!--"?r=St:d[1]!==void 0?r=Tt:d[2]!==void 0?(Ot.test(d[2])&&(o=RegExp("</"+d[2],"g")),r=S):d[3]!==void 0&&(r=S):r===S?d[0]===">"?(r=o??O,l=-1):d[1]===void 0?l=-2:(l=r.lastIndex-d[2].length,u=d[1],r=d[3]===void 0?S:d[3]==='"'?Ht:Pt):r===Ht||r===Pt?r=S:r===St||r===Tt?r=O:(r=S,o=void 0);let _=r===S&&s[c+1].startsWith("/>")?" ":"";n+=r===O?a+ne:l>=0?(i.push(u),a.slice(0,l)+Mt+a.slice(l)+C+_):a+C+(l===-2?c:_)}return[Rt(s,n+(s[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]},j=class s{constructor({strings:t,_$litType$:e},i){let o;this.parts=[];let n=0,r=0,c=t.length-1,a=this.parts,[u,d]=ae(t,e);if(this.el=s.createElement(u,i),T.currentNode=this.el.content,e===2||e===3){let l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(o=T.nextNode())!==null&&a.length<c;){if(o.nodeType===1){if(o.hasAttributes())for(let l of o.getAttributeNames())if(l.endsWith(Mt)){let f=d[r++],_=o.getAttribute(l).split(C),E=/([.?@])?(.*)/.exec(f);a.push({type:1,index:n,name:E[2],strings:_,ctor:E[1]==="."?lt:E[1]==="?"?pt:E[1]==="@"?ht:U}),o.removeAttribute(l)}else l.startsWith(C)&&(a.push({type:6,index:n}),o.removeAttribute(l));if(Ot.test(o.tagName)){let l=o.textContent.split(C),f=l.length-1;if(f>0){o.textContent=Y?Y.emptyScript:"";for(let _=0;_<f;_++)o.append(l[_],R()),T.nextNode(),a.push({type:2,index:++n});o.append(l[f],R())}}}else if(o.nodeType===8)if(o.data===Nt)a.push({type:2,index:n});else{let l=-1;for(;(l=o.data.indexOf(C,l+1))!==-1;)a.push({type:7,index:n}),l+=C.length-1}n++}}static createElement(t,e){let i=P.createElement("template");return i.innerHTML=t,i}};function H(s,t,e=s,i){if(t===x)return t;let o=i!==void 0?e._$Co?.[i]:e._$Cl,n=I(t)?void 0:t._$litDirective$;return o?.constructor!==n&&(o?._$AO?.(!1),n===void 0?o=void 0:(o=new n(s),o._$AT(s,e,i)),i!==void 0?(e._$Co??=[])[i]=o:e._$Cl=o),o!==void 0&&(t=H(s,o._$AS(s,t.values),o,i)),t}var ct=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:i}=this._$AD,o=(t?.creationScope??P).importNode(e,!0);T.currentNode=o;let n=T.nextNode(),r=0,c=0,a=i[0];for(;a!==void 0;){if(r===a.index){let u;a.type===2?u=new z(n,n.nextSibling,this,t):a.type===1?u=new a.ctor(n,a.name,a.strings,this,t):a.type===6&&(u=new dt(n,this,t)),this._$AV.push(u),a=i[++c]}r!==a?.index&&(n=T.nextNode(),r++)}return T.currentNode=P,o}p(t){let e=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},z=class s{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,o){this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=H(this,t,e),I(t)?t===p||t==null||t===""?(this._$AH!==p&&this._$AR(),this._$AH=p):t!==this._$AH&&t!==x&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):re(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==p&&I(this._$AH)?this._$AA.nextSibling.data=t:this.T(P.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:i}=t,o=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=j.createElement(Rt(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===o)this._$AH.p(e);else{let n=new ct(o,this),r=n.u(this.options);n.p(e),this.T(r),this._$AH=n}}_$AC(t){let e=Ut.get(t.strings);return e===void 0&&Ut.set(t.strings,e=new j(t)),e}k(t){ft(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,i,o=0;for(let n of t)o===e.length?e.push(i=new s(this.O(R()),this.O(R()),this,this.options)):i=e[o],i._$AI(n),o++;o<e.length&&(this._$AR(i&&i._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let i=Ct(t).nextSibling;Ct(t).remove(),t=i}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},U=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,o,n){this.type=1,this._$AH=p,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=n,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=p}_$AI(t,e=this,i,o){let n=this.strings,r=!1;if(n===void 0)t=H(this,t,e,0),r=!I(t)||t!==this._$AH&&t!==x,r&&(this._$AH=t);else{let c=t,a,u;for(t=n[0],a=0;a<n.length-1;a++)u=H(this,c[i+a],e,a),u===x&&(u=this._$AH[a]),r||=!I(u)||u!==this._$AH[a],u===p?t=p:t!==p&&(t+=(u??"")+n[a+1]),this._$AH[a]=u}r&&!o&&this.j(t)}j(t){t===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},lt=class extends U{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===p?void 0:t}},pt=class extends U{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==p)}},ht=class extends U{constructor(t,e,i,o,n){super(t,e,i,o,n),this.type=5}_$AI(t,e=this){if((t=H(this,t,e,0)??p)===x)return;let i=this._$AH,o=t===p&&i!==p||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==p&&(i===p||o);o&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},dt=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){H(this,t)}};var ce=ut.litHtmlPolyfillSupport;ce?.(j,z),(ut.litHtmlVersions??=[]).push("3.3.3");var It=(s,t,e)=>{let i=e?.renderBefore??t,o=i._$litPart$;if(o===void 0){let n=e?.renderBefore??null;i._$litPart$=o=new z(t.insertBefore(R(),n),n,void 0,e??{})}return o._$AI(s),o};var gt=globalThis,v=class extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=It(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return x}};v._$litElement$=!0,v.finalized=!0,gt.litElementHydrateSupport?.({LitElement:v});var le=gt.litElementPolyfillSupport;le?.({LitElement:v});(gt.litElementVersions??=[]).push("4.2.2");var jt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},zt=s=>(...t)=>({_$litDirective$:s,values:t}),tt=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var Dt="important",pe=" !"+Dt,k=zt(class extends tt{constructor(s){if(super(s),s.type!==jt.ATTRIBUTE||s.name!=="style"||s.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(s){return Object.keys(s).reduce((t,e)=>{let i=s[e];return i==null?t:t+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${i};`},"")}update(s,[t]){let{style:e}=s.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(let i of this.ft)t[i]==null&&(this.ft.delete(i),i.includes("-")?e.removeProperty(i):e[i]=null);for(let i in t){let o=t[i];if(o!=null){this.ft.add(i);let n=typeof o=="string"&&o.endsWith(pe);i.includes("-")||n?e.setProperty(i,n?o.slice(0,-11):o,n?Dt:""):e[i]=o}}return x}});var w=y`
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
`,yt=y`
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
`,Lt=y`${w}
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
`,Wt=y`${w}
 :host { height:100%; }
 [part="surface"] { height:100%; padding:16px; border:none; }
 [part="body-target"] { display:flex; flex-direction:row; min-height:0; align-items:center; justify-content:center; text-align:center; width:100%; }
 [part="value"], [part="degree"], [part="pad"] { font-size:112px; font-weight:700; line-height:1; color:white; }
 [part="pad"] { visibility:hidden; }
 [part="status"] { width:100%; font-size:20px; font-weight:var(--ha-font-weight-normal,400); line-height:1.35; color:white; white-space:normal; }
 .active [part="status"] { color:black; }
`,he=Object.freeze({height:69,actionHeight:68,largeHeight:146,pillHeight:35,pillRadius:18,pillIconSize:24,iconDiameter:45,glyphSize:25,titleSize:17,detailSize:15,categoryColor:"#3bc8ce"});async function et(s=["ha-dialog","ha-button","ha-dialog-footer","ha-form"]){if(s.every(i=>customElements.get(i)))return;let t=await window.loadCardHelpers?.();if(!t||(await(await t.createCardElement({type:"entities",entities:[]})).constructor.getConfigElement?.(),!s.every(i=>customElements.get(i))))throw Error("Home Assistant controls are unavailable")}function Bt(s,t){return new Promise(e=>{let i=!1,o=n=>{i||(i=!0,e(n))};s.dispatchEvent(new CustomEvent("show-dialog",{bubbles:!0,composed:!0,detail:{dialogTag:"kiosk-confirmation-dialog",dialogImport:()=>et().catch(n=>{throw o(!1),n}),dialogParams:{...t,confirm:()=>o(!0),cancel:()=>o(!1)}}}))})}var bt=class extends v{constructor(){super(...arguments);this.open=!1}static{this.properties={open:{state:!0},params:{state:!0}}}async showDialog(e){await et(),this.params=e,this.open=!0,await this.updateComplete}closeDialog(){return this.finish(!1),!0}finish(e){this.open&&(this.open=!1,(e?this.params.confirm:this.params.cancel)(),this.dispatchEvent(new CustomEvent("dialog-closed",{bubbles:!0,composed:!0,detail:{dialog:this.localName}})))}render(){return this.params?h`<ha-dialog
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
    >`:p}};customElements.get("kiosk-confirmation-dialog")||customElements.define("kiosk-confirmation-dialog",bt);var A=s=>({name:s,selector:{text:{}}}),b=(s,t={})=>({name:s,selector:{entity:t}}),it=class extends v{constructor(){super(...arguments);this.label=e=>this.config.type==="custom:kiosk-pill-card"&&e.name==="background"?"Background":{aqhi_entity:"Local Canadian PM2.5 smoke index",regional_entity:"Regional Canadian AQHI (optional)",category_entity:"Canadian smoke risk category sensor",source_entity:"Source PM2.5 sensor",data_expected_entity:"History ready timestamp (optional)",stale_after_minutes:"Stale after (minutes; default 120)",location:"Location (optional)",entity:"Primary entity (body more-info target)",door_entity:"Door contact or cover (optional override)",lock_entity:"Linked lock",temperature_format:"Temperature number format",hvac_colors:"HVAC action colors (optional)",status_entity:"Status message sensor",status_active_entity:"Status active sensor",trend_entity:"Temperature trend sensor",name:"Name",icon:"Icon",area:"Area",navigation_path:"Navigation path",temperature_entity:"Temperature sensor",occupancy_entity:"Occupancy sensor",light_entities:"Lights (optional override)",var_large:"Large",show_name:"Show name",show_state:"Show state",show_icon:"Show icon",state_display:"State text (optional override)",detail:"Detail (optional override)",interactions:"Interactions",dynamic:"Declarative rules (advanced, optional)",presentation:"Presentation expressions",action_rules:"Conditional actions",appearance:"Appearance (optional)",icon_color:"Category color (CSS color)",background:"Off background",active_background:"Active background",radius:"Corner radius",tap_action:"Body tap",hold_action:"Body hold",double_tap_action:"Body double tap",icon_tap_action:"Icon tap",icon_hold_action:"Icon hold",icon_double_tap_action:"Icon double tap"}[e.name]||e.name}static{this.properties={hass:{attribute:!1},config:{state:!0}}}static{this.styles=y`
    :host {
      display: block;
    }
    p {
      color: var(--secondary-text-color);
      font-size: 14px;
    }
  `}setConfig(e){this.config={...e}}get schema(){if(this.config.type==="custom:kiosk-air-card")return[b("aqhi_entity",{filter:{domain:"sensor"}}),b("regional_entity",{filter:{domain:"sensor"}}),b("category_entity",{filter:{domain:"sensor"}}),b("source_entity",{filter:{domain:"sensor"}}),b("data_expected_entity",{filter:{domain:"sensor",device_class:"timestamp"}}),A("name"),A("location"),{name:"icon",selector:{icon:{}}},{name:"stale_after_minutes",selector:{number:{min:1,max:1440,mode:"box",unit_of_measurement:"min"}}},{name:"appearance",type:"expandable",schema:["icon_color","background","radius"].map(A)}];let i=this.config.type==="custom:kiosk-room-card",o=this.config.type==="custom:kiosk-action-card",n=this.config.type==="custom:kiosk-pill-card",r=this.config.type==="custom:kiosk-door-card",c=this.config.type==="custom:kiosk-climate-card",a=this.config.type==="custom:kiosk-status-card",u=i?[{name:"area",selector:{area:{}}},A("name"),{name:"icon",selector:{icon:{}}},A("navigation_path"),b("temperature_entity",{filter:{domain:"sensor",device_class:"temperature"}}),b("occupancy_entity",{filter:{domain:"binary_sensor"}}),b("light_entities",{multiple:!0,filter:{domain:"light"}})]:[b("entity",o?{filter:{domain:["script","scene","button"]}}:r?{filter:{domain:["binary_sensor","cover","lock"]}}:c?{filter:{domain:"climate"}}:{}),A("name"),{name:"icon",selector:{icon:{}},context:{icon_entity:"entity"}}],d=i?[]:[{name:"interactions",type:"expandable",flatten:!0,schema:["tap_action","hold_action","double_tap_action","icon_tap_action","icon_hold_action","icon_double_tap_action"].map(l=>({name:l,selector:{ui_action:{default_action:o?"none":l==="icon_tap_action"?!n&&["light","switch","input_boolean"].includes((this.config.entity||"").split(".")[0])?"toggle":"more-info":l.includes("double")?"none":"more-info"}},context:{entity:"entity"}}))}];return[...u,...r?[b("door_entity",{filter:{domain:["binary_sensor","cover"]}}),b("lock_entity",{filter:{domain:"lock"}})]:[],...c?[{name:"temperature_format",selector:{select:{options:["locale","legacy"]}}},{name:"hvac_colors",selector:{object:{}}}]:[],...a?[b("status_entity"),b("status_active_entity",{filter:{domain:"binary_sensor"}}),b("trend_entity",{filter:{domain:"sensor"}})]:[],...n?["show_name","show_state","show_icon"].map(l=>({name:l,selector:{boolean:{}}})):a?[]:[{name:"var_large",selector:{boolean:{}}}],...i?[]:[A(n?"state_display":"detail")],...d,...i?[]:[{name:"dynamic",type:"expandable",flatten:!0,schema:["presentation","action_rules"].map(l=>({name:l,selector:{object:{}}}))}],{name:"appearance",type:"expandable",schema:(n?["icon_color","background","radius"]:["icon_color","background","active_background","radius"]).map(A)}]}change(e){e.stopPropagation();let i=e.detail.value;this.config={...this.config,...i},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this.config},bubbles:!0,composed:!0}))}render(){return!this.config||!this.hass?p:h`<ha-form
        .hass=${this.hass}
        .data=${this.config.type==="custom:kiosk-pill-card"?{...this.config,show_name:this.config.show_name??!0,show_state:this.config.show_state??!0,show_icon:this.config.show_icon??!0}:{...this.config,var_large:this.config.var_large??this.config.variables?.var_large??!1}}
        .schema=${this.schema}
        .computeLabel=${this.label}
        @value-changed=${this.change}
      ></ha-form>
      <p>
        ${this.config.type==="custom:kiosk-air-card"?"Read-only Canadian PM2.5-only smoke estimate with separate optional regional AQHI. Each Details button opens its own native Home Assistant entity history. No device actions or custom dialogs.":h`Pills stay compact and default to more-info on both targets. Large
        applies only to entity, action, room, door and climate cards. Default appearance
        follows the kiosk design. Entity icon taps control only lights, switches
        and input booleans. Room controls only navigate; action cards require an
        explicit action.`}
      </p>`}};customElements.get("kiosk-card-editor")||customElements.define("kiosk-card-editor",it);var de=new Set(["if","eq","ne","includes","in","and","or","not","defined","finite","number","round","gt","lt","concat","capitalize","map","countdown","minutes"]);function D(s,t=0){if(t>24)throw Error("Rule nesting exceeds 24");if(!(!s||typeof s!="object")){if(Array.isArray(s)){if(s.length>100)throw Error("Rule list too large");s.forEach(e=>D(e,t+1));return}if(s.op!==void 0){if(!de.has(s.op)||!Array.isArray(s.args)||s.args.length>100)throw Error("Unknown rule operation");s.args.forEach(e=>D(e,t+1))}else if(s.entity!==void 0||s.attribute!==void 0||s.state!==void 0||s.last_changed!==void 0){if(s.attribute&&["__proto__","constructor","prototype"].includes(s.attribute))throw Error("Unsafe attribute");if(s.entity!==void 0&&typeof s.entity!="string")throw Error("Rule entity must be a string")}else Object.values(s).forEach(e=>D(e,t+1))}}function ot(s,t,e,i=Date.now()){if(!s||typeof s!="object")return s;if(!s.op){if(s.entity!==void 0||s.attribute!==void 0||s.state!==void 0||s.last_changed!==void 0){let n=t?.states[s.entity||e.entity||""];return s.attribute!==void 0?n?.attributes[s.attribute]:s.last_changed?n?.last_changed:n?.state}return s}let o=n=>ot(s.args[n],t,e,i);switch(s.op){case"if":return o(0)?o(1):o(2);case"eq":return o(0)===o(1);case"ne":return o(0)!==o(1);case"includes":return typeof o(0)=="string"&&o(0).includes(o(1));case"in":return Array.isArray(o(1))&&o(1).includes(o(0));case"and":return s.args.every((n,r)=>!!o(r));case"or":return s.args.some((n,r)=>!!o(r));case"not":return!o(0);case"defined":return o(0)!==void 0;case"finite":return Number.isFinite(o(0));case"number":return Number(o(0));case"round":return Math.round(Number(o(0)));case"gt":return o(0)>o(1);case"lt":return o(0)<o(1);case"concat":return s.args.map((n,r)=>o(r)??"").join("");case"capitalize":{let n=String(o(0)??"");return n.charAt(0).toUpperCase()+n.slice(1)}case"map":{let n=o(1);return Object.hasOwn(n,String(o(0)))?n[String(o(0))]:n.default??o(2)}case"minutes":{let n=Date.parse(o(0));return Number.isFinite(n)?Math.max(0,Math.ceil((n-i)/6e4)):NaN}case"countdown":{let n=Date.parse(o(0));if(!Number.isFinite(n))return o(1)??"";let r=Math.max(0,Math.ceil((n-i)/6e4)),c=Math.floor(r/60);return c>0?`${c}h ${String(r%60).padStart(2,"0")}m left`:`${r}m left`}}}function Kt(s){return/"op":"(?:countdown|minutes)"/.test(JSON.stringify(s.presentation))}function qt(s){D(s.presentation);for(let[t,e]of Object.entries(s.action_rules||{})){if(!/^(icon_)?(tap|hold|double_tap)_action$/.test(t)||!Array.isArray(e)||e.length>100)throw Error("Invalid action rules");for(let i of e)if(D(i.when),!i.action||typeof i.action.action!="string")throw Error("Rule requires action")}}var Ft=new Set(["light","switch","input_boolean"]);function Vt(s,t,e){s.dispatchEvent(new CustomEvent(t,{detail:e,bubbles:!0,composed:!0}))}var ue=new Set(["off","closed","idle","paused","standby","away","docked","unknown","unavailable","locked","disarmed"]),m=class extends v{constructor(){super(...arguments);this.busy=!1;this.confirming=!1;this.error="";this.operation=0;this.acknowledged=!1;this.held=!1}static{this.properties={hass:{attribute:!1},config:{state:!0},busy:{state:!0},error:{state:!0},confirming:{state:!0}}}connectedCallback(){super.connectedCallback(),this.startClock()}startClock(){clearInterval(this.clock),this.isConnected&&this.config&&Kt(this.config)&&(this.clock=setInterval(()=>this.requestUpdate(),3e4))}presentation(e){let i=this.config.presentation?.[e];return i===void 0?void 0:ot(i,this.hass,this.config)}resolvedAction(e,i){return this.config.action_rules?.[e]?.find(n=>ot(n.when,this.hass,this.config))?.action||i}action(e,i="tap"){let o=(e==="icon"?"icon_":"")+i+"_action";return this.resolvedAction(o,this.config[o]||{action:i==="tap"?e==="icon"&&this.available&&Ft.has((this.config.entity||"").split(".")[0])?"toggle":"more-info":i==="hold"?"more-info":"none"})}async runAction(e,i,o="tap"){i.stopPropagation();let n=this.action(e,o);if(n.action==="none"||this.busy||this.confirming)return;let r=this.config,c=n.confirmation;if(c&&!(typeof c=="object"&&c.exemptions?.some(_=>_.user===this.hass.user?.id))){let _=this.operation;this.confirming=!0;let E=await Bt(this,typeof c=="object"?c:{});if(this.operation!==_||(this.confirming=!1,!E||!this.isConnected||this.config!==r))return}if(n.action==="more-info"){Vt(this,"hass-more-info",{entityId:n.entity||this.config.entity});return}if(!["toggle","perform-action","call-service"].includes(n.action)){let{confirmation:_,...E}=n;Vt(this,"hass-action",{config:{...this.config,tap_action:E},action:"tap"});return}if(!this.available)return;let a,u,d,l=n.target;if(n.action==="toggle"){if(a=(this.config.entity||"").split(".")[0],!Ft.has(a)){this.error="Choose an explicit action for this device.";return}this.expected=this.state?.state==="on"?"off":"on",u=this.expected==="on"?"turn_on":"turn_off",d={entity_id:this.config.entity}}else{if([a,u]=(n.perform_action||n.service||"").split("."),!a||!u){this.error="Choose an action.";return}d=n.data??n.service_data,this.expected=void 0}let f=++this.operation;this.busy=!0,this.error="",this.acknowledged=!1,this.watchdog=setTimeout(()=>{this.operation===f&&(this.operation++,this.busy=!1,this.error="No confirmation. Check device.")},12e3);try{if(await this.hass.callService(a,u,d,l),this.operation!==f)return;this.acknowledged=!0,this.finishIfConfirmed()}catch{this.operation===f&&(this.operation++,this.busy=!1,clearTimeout(this.watchdog),this.error="Action failed. Check device.")}}finishIfConfirmed(){this.busy&&this.acknowledged&&(!this.expected||this.state?.state===this.expected)&&(this.busy=!1,this.expected=void 0,clearTimeout(this.watchdog))}updated(){this.finishIfConfirmed()}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this.clock),clearTimeout(this.watchdog),clearTimeout(this.holdTimer),clearTimeout(this.tapTimer),this.operation++,this.busy=!1}pointerDown(e,i){i.stopPropagation(),i.button===0&&(this.held=!1,clearTimeout(this.holdTimer),this.holdTimer=setTimeout(()=>{this.held=!0,clearTimeout(this.tapTimer),this.runAction(e,i,"hold")},500))}pointerEnd(e){e.stopPropagation(),clearTimeout(this.holdTimer)}tap(e,i){if(i.stopPropagation(),this.held){this.held=!1;return}if(i.detail===0||this.action(e,"double_tap").action==="none"){this.runAction(e,i);return}i.detail>1?(clearTimeout(this.tapTimer),this.runAction(e,i,"double_tap")):this.tapTimer=setTimeout(()=>void this.runAction(e,i),300)}static async getConfigElement(){return window.loadCardHelpers&&await et(["ha-form"]),document.createElement("kiosk-card-editor")}static getStubConfig(e,i=[]){return{entity:i.find(o=>e.states[o])||Object.keys(e.states).find(o=>o.startsWith("light."))||Object.keys(e.states)[0]}}static{this.styles=w}applyConfig(e){qt(e);let i=e.var_large??e.variables?.var_large;if(i!==void 0&&typeof i!="boolean")throw Error("var_large must be a boolean");clearTimeout(this.watchdog),clearTimeout(this.holdTimer),clearTimeout(this.tapTimer),this.operation++,this.busy=!1,this.confirming=!1,this.expected=void 0,this.error="",this.config={...e},this.startClock()}setConfig(e){if(!e.entity)throw new Error("Choose an entity");this.applyConfig(e)}getCardSize(){return this.large?3:1.38}getGridOptions(){return{columns:6,rows:"auto"}}get state(){return this.hass?.states[this.config?.entity||""]}get active(){return!!this.state&&(this.config.active_states?this.config.active_states.includes(this.state.state):!ue.has(this.state.state))}get cardTitle(){return(this.presentation("name")??this.config.name)||this.state?.attributes.friendly_name||this.config.entity||"Entity"}get detail(){let e=this.presentation("detail");if(e!==void 0)return String(e);if(this.config.detail!==void 0)return this.config.detail;let i=this.state;if(!i)return"Unavailable";if(i.state==="on"&&i.entity_id.startsWith("light.")&&i.attributes.brightness)return`${Math.round(i.attributes.brightness/2.55)}%`;if(i.entity_id.startsWith("climate.")&&!["unknown","unavailable"].includes(i.state)){let n=i.attributes;if(n.target_temp_low!=null&&n.target_temp_high!=null)return`${n.target_temp_low}\xB0\u2013${n.target_temp_high}\xB0`;if(n.temperature!=null)return`${n.temperature}\xB0`;if(n.current_temperature!=null)return`${n.current_temperature}\xB0 (${i.state.charAt(0).toUpperCase()+i.state.slice(1)})`}let o=this.hass.formatEntityState?.(i)||i.state;return o.charAt(0).toUpperCase()+o.slice(1)}get available(){return!!this.state&&!["unknown","unavailable"].includes(this.state.state)}get isAction(){return!1}get large(){return(this.config.var_large??this.config.variables?.var_large)===!0}get cardIcon(){return this.presentation("icon")??this.config.icon}get surfaceStyles(){return{}}get iconContent(){return this.cardIcon?h`<ha-icon .icon=${this.cardIcon}></ha-icon>`:h`<ha-state-icon .hass=${this.hass} .stateObj=${this.state} .stateColor=${!1}></ha-state-icon>`}render(){if(!this.config||!this.hass)return p;let e=this.config.appearance;return h`<ha-card
      part="surface"
      aria-busy=${String(this.busy)}
      class=${[this.active?"active":"",this.available?"":"unavailable",this.isAction?"action":"",this.large?"large":""].join(" ")}
      style=${k({"--kiosk-icon-color":e?.icon_color,"--kiosk-default-icon-color":this.config.entity?.startsWith("light.")?"var(--accent-color,#3bc8ce)":void 0,"--kiosk-background":e?.background,"--kiosk-active-background":e?.active_background,"--kiosk-radius":e?.radius,...this.surfaceStyles})}
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
        >${this.detail?h`<span part="detail">${this.detail}</span>`:p}</button
      >${this.error?h`<span part="feedback" role="status">${this.error}</span>`:p}</ha-card
    >`}},L=class extends m{},W=class extends m{static getStubConfig(t,e=[]){let o=[...e,...Object.keys(t.states)].find(n=>["script","scene","button"].includes(n.split(".")[0]));return o?{entity:o}:{name:"Action"}}setConfig(t){if(!t.entity&&!t.name)throw Error("Choose an entity or name");if(t.entity&&!["script","scene","button"].includes(t.entity.split(".")[0]))throw Error("Action entities must be scripts, scenes or buttons");this.applyConfig(t)}get isAction(){return!0}get cardIcon(){return(this.presentation("icon")??this.config.icon)||(this.state?void 0:"mdi:play")}get active(){return!0}get detail(){return this.config.detail||(this.available?"":"Unavailable")}get available(){return!this.config.entity||super.available}action(t,e="tap"){let i=(t==="icon"?"icon_":"")+e+"_action";return this.resolvedAction(i,this.config[i]||(t==="icon"&&e==="tap"?this.config.tap_action:void 0)||{action:"none"})}};var B=class extends m{static getStubConfig(){return{name:"Room",navigation_path:"/lovelace"}}setConfig(t){if(!t.area&&!t.name)throw Error("Choose an area or name");this.applyConfig(t)}get cardTitle(){return this.config.name||this.hass.areas?.[this.config.area||""]?.name||"Room"}get cardIcon(){return this.config.icon||this.hass.areas?.[this.config.area||""]?.icon||"mdi:home-outline"}get available(){return!0}get active(){return this.lights.some(t=>t.state==="on")||(this.config.occupancy_entity?this.hass.states[this.config.occupancy_entity]?.state==="on":this.roomStates.some(t=>t.entity_id.startsWith("binary_sensor.")&&["occupancy","presence","motion"].includes(t.attributes.device_class)&&t.state==="on"))}get roomStates(){return this.config.area?Object.values(this.hass.states).filter(t=>{let e=this.hass.entities?.[t.entity_id];return!e||e.hidden||e.hidden_by||e.disabled_by?!1:(e.area_id||this.hass.devices?.[e.device_id]?.area_id)===this.config.area}):[]}get lights(){return this.config.light_entities!==void 0?this.config.light_entities.map(t=>this.hass.states[t]||{entity_id:t,state:"unavailable",attributes:{}}):this.roomStates.filter(t=>t.entity_id.startsWith("light."))}get detail(){let t=this.roomStates,e=this.config.temperature_entity?this.hass.states[this.config.temperature_entity]||{entity_id:this.config.temperature_entity,state:"unavailable",attributes:{}}:t.find(r=>r.attributes.device_class==="temperature"),i=this.config.occupancy_entity?this.hass.states[this.config.occupancy_entity]||{entity_id:this.config.occupancy_entity,state:"unavailable",attributes:{}}:t.find(r=>r.entity_id.startsWith("binary_sensor.")&&["occupancy","presence","motion"].includes(r.attributes.device_class)),o=[];e&&o.push(["unknown","unavailable"].includes(e.state)?"Temperature unavailable":`${e.state}${e.attributes.unit_of_measurement?" "+e.attributes.unit_of_measurement:""}`),i&&o.push(i.state==="on"?"Occupied":i.state==="off"?"Clear":"Occupancy unavailable");let n=this.lights;if(n.length){let r=n.filter(a=>a.state==="on").length,c=n.filter(a=>["unknown","unavailable"].includes(a.state)).length;r?o.push(`${r} light${r===1?"":"s"} on`):c<n.length&&o.push("Lights off"),c&&o.push(`${c} unavailable`)}return o.join(" \xB7 ")}action(t,e="tap"){return e==="tap"&&this.config.navigation_path?{action:"navigate",navigation_path:this.config.navigation_path}:{action:"none"}}};var K=class extends m{static{this.styles=y`
    ${w}${yt}
  `}setConfig(t){if(!t.entity)throw Error("Choose an entity");if(t.var_large??t.variables?.var_large)throw Error("Pills are compact; Large is not supported");for(let e of["show_name","show_state","show_icon"])if(t[e]!==void 0&&typeof t[e]!="boolean")throw Error(`${e} must be a boolean`);if(t.show_name===!1&&t.show_state===!1&&t.show_icon===!1)throw Error("Show at least one pill field");this.applyConfig(t)}get large(){return!1}get active(){return!1}getCardSize(){return 1}get detail(){let t=this.presentation("state_display");if(t!==void 0)return String(t);let e=this.state;if(this.config.state_display!==void 0)return this.config.state_display;let i=e?this.config.state_labels?.[e.state]??this.config.state_labels?.default:void 0;if(i!==void 0)return i;if(!e)return"Unavailable";let o=this.hass.formatEntityState?.(e)||e.state;return o.charAt(0).toUpperCase()+o.slice(1)}action(t,e="tap"){let i=(t==="icon"?"icon_":"")+e+"_action";return this.resolvedAction(i,this.config[i]||(t==="icon"?this.config[e+"_action"]:void 0)||{action:e==="double_tap"?"none":"more-info"})}disabled(t){return this.busy||this.confirming||!this.available&&["toggle","perform-action","call-service"].includes(this.action(t).action)}render(){if(!this.config||!this.hass)return p;let t=this.config.appearance,e=this.config.show_name!==!1,i=this.config.show_state!==!1;return h`<ha-card
      part="surface"
      aria-busy=${String(this.busy)}
      class=${`pill ${e?"":"no-name"} ${i?"":"no-state"} ${this.available?"":"unavailable"}`}
      style=${k({"--kiosk-background":t?.background,"--kiosk-icon-color":t?.icon_color,"--kiosk-radius":t?.radius})}
      @click=${o=>this.tap("body",o)}
      @pointerdown=${o=>this.pointerDown("body",o)}
      @pointerup=${this.pointerEnd}
      @pointercancel=${this.pointerEnd}
      @pointerleave=${this.pointerEnd}
    >
      ${this.config.show_icon!==!1?h`<button part="icon-target" aria-label=${`Icon \u2014 ${this.cardTitle}`} ?disabled=${this.disabled("icon")} @click=${o=>this.tap("icon",o)} @pointerdown=${o=>this.pointerDown("icon",o)} @pointerup=${this.pointerEnd} @pointercancel=${this.pointerEnd} @pointerleave=${this.pointerEnd}><span part="icon-circle">${this.cardIcon?h`<ha-icon .icon=${this.cardIcon}></ha-icon>`:h`<ha-state-icon .hass=${this.hass} .stateObj=${this.state} .stateColor=${!1}></ha-state-icon>`}</span></button>`:h`<span class="empty-icon" aria-hidden="true"></span>`}
      <button
        part="body-target"
        aria-label=${`${this.cardTitle}: ${this.detail}`}
        ?disabled=${this.disabled("body")}
        @click=${o=>this.tap("body",o)}
        @pointerdown=${o=>this.pointerDown("body",o)}
        @pointerup=${this.pointerEnd}
        @pointercancel=${this.pointerEnd}
        @pointerleave=${this.pointerEnd}
      >
        ${e?h`<span part="title">${this.cardTitle}</span>`:p}${i?h`<span part="detail">${this.detail}</span>`:p}</button
      >${this.error?h`<span part="feedback" role="status">${this.error}</span>`:p}</ha-card
    >`}};var q=class extends m{static{this.styles=y`${m.styles} .unavailable [part="icon-circle"] { opacity: 1; }`}static getStubConfig(t){return{entity:Object.keys(t?.states||{}).find(i=>["binary_sensor","cover","lock"].includes(i.split(".")[0]))||"binary_sensor.example_door"}}setConfig(t){if(!t.entity)throw Error("Choose a door or lock entity");if(!["binary_sensor","cover","lock"].includes(t.entity.split(".")[0]))throw Error("Choose a contact, cover or lock");if(t.lock_entity&&!t.lock_entity.startsWith("lock."))throw Error("Choose a lock entity");this.applyConfig(t)}get lockEntity(){return this.config.lock_entity||(this.config.entity?.startsWith("lock.")?this.config.entity:void 0)}get doorEntity(){return this.config.door_entity||(this.config.entity?.startsWith("lock.")?void 0:this.config.entity)}get lockState(){return this.hass?.states[this.lockEntity||""]}get doorState(){return this.hass?.states[this.doorEntity||""]?.state||"unknown"}get closed(){return["off","closed"].includes(this.doorState)}get open(){return["on","open"].includes(this.doorState)}get active(){return!(this.lockState?.state==="locked"&&this.closed)}get detail(){let t=this.presentation("detail")??this.config.detail;if(t!==void 0)return String(t);let e=this.open?"open":this.closed?"closed":this.doorState;return this.lockEntity?`${e} / ${this.lockState?.state||"unknown"}`:e}get cardIcon(){let t=super.cardIcon;if(t)return t;let e=this.lockState?.state;return e==="locked"&&this.closed?"mdi:door-closed-lock":e==="locked"&&this.open?"mdi:door-closed-cancel":e==="unlocked"&&this.closed?"mdi:lock-open":e==="unlocked"&&this.open?"mdi:door-open":this.lockState?.attributes.icon||"mdi:lock-question"}get surfaceStyles(){return{"--kiosk-glyph":this.active?"white":this.config.appearance?.icon_color||"#3bc8ce"}}action(t,e="tap"){let i=(t==="icon"?"icon_":"")+e+"_action";return this.resolvedAction(i,this.config[i]||{action:e==="double_tap"?"none":"more-info",...t==="icon"&&this.lockEntity?{entity:this.lockEntity}:{}})}};var F=class extends m{static{this.styles=Lt}static getStubConfig(t){return{entity:Object.keys(t?.states||{}).find(e=>e.startsWith("climate."))||"climate.example"}}setConfig(t){if(!t.entity?.startsWith("climate."))throw Error("Choose a climate entity");this.applyConfig(t)}temperature(t){return this.config.temperature_format==="legacy"?String(t):typeof t!="number"||!Number.isFinite(t)?"\u2014":new Intl.NumberFormat(this.hass.locale?.language||"en",{maximumFractionDigits:2}).format(t)}get active(){return!!this.state&&!["off","idle","standby","away"].includes(this.state.state)}get detail(){let t=this.presentation("detail")??this.config.detail;if(t!==void 0)return String(t);let e=this.state;if(!e)return"Unavailable";let i=e.attributes,o=e.state,n=r=>this.temperature(r)+"\xB0";return o==="off"?"Off":o==="fan_only"?"Fan On":o==="heat"||o==="cool"?`${n(i.temperature)} / ${o} mode`:i.target_temp_low!==void 0&&i.target_temp_high!==void 0?`${n(i.target_temp_low)}\u2013${n(i.target_temp_high)}`:i.temperature!==null&&(i.temperature!==void 0||this.config.temperature_format==="legacy")?n(i.temperature):`${n(i.current_temperature)} (${o.charAt(0).toUpperCase()+o.slice(1)})`}get iconContent(){return h`<span part="temperature">${this.temperature(this.state?.attributes.current_temperature)}°</span>`}get surfaceStyles(){let t=this.config.hvac_colors;return{"--kiosk-temperature-color":t?.[this.state?.attributes.hvac_action]||t?.default||this.config.appearance?.icon_color||"var(--accent-color)","--kiosk-height":this.large?"145px":"68px"}}};var V=class extends m{static{this.styles=Wt}static getStubConfig(t){return{entity:Object.keys(t?.states||{}).find(e=>e.startsWith("sensor.")&&t?.states[e].attributes.device_class==="temperature")||"sensor.example_temperature"}}get active(){return this.hass?.states[this.config.status_active_entity||""]?.state==="on"}get value(){let t=this.state?.state||"unavailable",e=parseFloat(t);return Number.isFinite(e)?e.toFixed(0):t}get message(){let t=this.hass?.states[this.config.status_entity||""]?.state;return t&&t!=="clear"?t:""}get trendColor(){let t=parseFloat(this.hass?.states[this.config.trend_entity||""]?.state||"");return Number.isFinite(t)?t>=3?"#ff1744":t>=1.5?"#ff6d00":t>=.5?"#ffd600":t<=-3?"#2962ff":t<=-1.5?"#00b0ff":t<=-.5?"#00e5ff":"white":"white"}render(){return!this.config||!this.hass?p:h`<ha-card part="surface" class=${this.active?"active":""} style=${k({"--kiosk-background":this.config.appearance?.background||"var(--ha-card-background,var(--card-background-color))","--kiosk-radius":this.config.appearance?.radius})}>
   <button part="body-target" aria-label=${this.cardTitle} @click=${t=>this.tap("body",t)} @pointerdown=${t=>this.pointerDown("body",t)} @pointerup=${this.pointerEnd} @pointercancel=${this.pointerEnd} @pointerleave=${this.pointerEnd}>
    ${this.active?h`<span part="status">${this.message}</span>`:h`<span part="pad" aria-hidden="true">°</span><span part="value">${this.value}</span><span part="degree" style=${k({color:this.trendColor})}>°</span>`}
   </button>
  </ha-card>`}};var Q=[{key:"low",label:"Low risk",color:"var(--blue-color,#3188b5)",sentence:"Low particle levels around your home."},{key:"moderate",label:"Moderate risk",color:"var(--warning-color,#d1bb60)",sentence:"Moderate particle levels around your home."},{key:"high",label:"High risk",color:"var(--error-color,#c9706e)",sentence:"High particle levels around your home."},{key:"very_high",label:"Very high risk",color:"var(--deep-purple-color,#8c6373)",sentence:"Very high particle levels around your home."}],_t=s=>s&&/^\d+(\.\d+)?$/.test(s.state)&&Number.isFinite(Number(s.state))?Number(s.state):NaN,g=(s,t)=>({label:s,sentence:t,index:-1,value:"\u2014",color:"var(--disabled-text-color,#888)"}),Qt=s=>s<=3?0:s<=6?1:s<=10?2:3,G=class extends m{static{this.styles=y`${w}
    :host { container-type:inline-size; }
    [part="surface"] { display:block; height:auto; padding:16px; background:var(--kiosk-background,var(--kiosk-active-background,white)); background-image:radial-gradient(ellipse at 95% 0%,color-mix(in srgb,var(--air-color) 25%,transparent),transparent 65%),linear-gradient(145deg,color-mix(in srgb,var(--air-color) 4%,transparent),color-mix(in srgb,var(--air-color) 12%,transparent)); color:var(--kiosk-active-title,black); }
    .identity { display:flex; align-items:center; gap:10px; }
    .identity > div { min-width:0; }
    [part="icon-circle"] { flex:none; background:var(--kiosk-icon-color,var(--accent-color,#3bc8ce)); }
    [part="detail"] { color:inherit; opacity:.65; margin-top:2px; }
    .hero { display:flex; align-items:baseline; flex-wrap:wrap; gap:6px 12px; margin-top:12px; }
    [part="aqhi"] { flex:none; white-space:nowrap; font-size:52px; font-weight:650; letter-spacing:-2px; line-height:1; }
    [part="category"] { font-size:28px; font-weight:650; letter-spacing:-.7px; line-height:1.1; overflow-wrap:anywhere; }
    [part="interpretation"] { font-size:16px; line-height:1.4; margin:6px 0 0; max-width:28ch; }
    .rail { display:flex; gap:4px; margin-top:14px; height:7px; }
    [part="segment"] { flex:1; border-radius:5px; position:relative; opacity:.6; }
    [part="segment"].selected { opacity:1; }
    .selected::after { content:''; position:absolute; width:5px; height:15px; top:-4px; left:calc(50% - 2.5px); background:currentColor; border:1px solid var(--kiosk-active-background,white); border-radius:5px; }
    .labels { display:flex; justify-content:space-between; font-size:10px; line-height:12px; opacity:.7; margin-top:5px; }
    .row { display:flex; align-items:center; justify-content:space-between; gap:12px; }
    .local-summary { cursor:pointer; touch-action:manipulation; border-radius:12px; }
    .local-summary:focus-visible { outline:2px solid var(--primary-color,#3bc8ce); outline-offset:4px; }
    .unit { font-size:13px; font-weight:400; letter-spacing:0; opacity:.7; }
    .provenance { font-size:11px; line-height:1.5; opacity:.75; margin-top:3px; }
    .regional-section { margin-top:20px; padding-top:17px; border-top:1px solid color-mix(in srgb,currentColor 12%,transparent); }
    .regional-reading { min-width:0; }
    [part="regional-category"] { display:block; font-size:20px; font-weight:600; line-height:1.25; overflow-wrap:anywhere; }
    [part="regional-aqhi"] { font-size:17px; font-weight:600; margin-top:5px; }
    button { flex:none; min-height:44px; min-width:44px; padding:10px 14px; border-radius:18px; background:color-mix(in srgb,currentColor 7%,transparent); font-size:13px; }
    @container (max-width:340px) { [part="category"] { font-size:26px; } }
  `}connectedCallback(){super.connectedCallback(),this.freshnessClock=setInterval(()=>this.requestUpdate(),3e4)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this.freshnessClock)}static getStubConfig(){return{aqhi_entity:"sensor.example_smoke_index",category_entity:"sensor.example_smoke_category",source_entity:"sensor.example_pm25"}}setConfig(t){for(let e of["aqhi_entity","category_entity","source_entity"])if(typeof t[e]!="string"||!/^sensor\.[a-z0-9_]+$/.test(t[e]))throw Error(`Choose a sensor for ${e}`);for(let e of["data_expected_entity","regional_entity"])if(t[e]&&(typeof t[e]!="string"||!/^sensor\.[a-z0-9_]+$/.test(t[e])))throw Error(`Choose a sensor for ${e}`);if(t.stale_after_minutes!==void 0&&(!Number.isFinite(t.stale_after_minutes)||t.stale_after_minutes<1||t.stale_after_minutes>1440))throw Error("stale_after_minutes must be between 1 and 1440");this.applyConfig(t)}getCardSize(){return this.config?.regional_entity?7:4}getGridOptions(){return{columns:12,rows:"auto",min_columns:6}}moreInfo(t,e){t.stopPropagation(),this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:e},bubbles:!0,composed:!0}))}timestampFreshness(t,e=this.config.stale_after_minutes??120){let i=t.map(o=>{if(typeof o!="string"||!/^\d{4}-\d{2}-\d{2}T([01]\d|2[0-3]):[0-5]\d:[0-5]\d(\.\d+)?(Z|[+-]\d{2}:\d{2})$/.test(o))return NaN;let n=Date.parse(o);return Number.isFinite(n)&&new Date(o.slice(0,10)+"T00:00:00Z").toISOString().slice(0,10)===o.slice(0,10)?n:NaN});return i.some(o=>!Number.isFinite(o)||o>Date.now()+6e4)?"Unknown":i.some(o=>Date.now()-o>e*6e4)?"Stale":void 0}freshness(t){return this.timestampFreshness(t.map(e=>e?.last_reported??e?.last_updated))}get local(){let t=this.hass.states,e=t[this.config.aqhi_entity],i=t[this.config.source_entity],o=t[this.config.category_entity];if([e,i,o].some(f=>!f||f.state==="unavailable"))return g("Unavailable","The local air sensor is unavailable.");if(!Number.isFinite(_t(i)))return g("Unknown","Waiting for a local particle reading.");let n=e.attributes;if(!(n.index_type==="canadian_aqhi_smoke_pm25"&&n.scope==="local_pm25_only_estimate")||n.source_entity!==this.config.source_entity)return g("Unknown","Choose a matching Canadian PM2.5 smoke estimate sensor.");let c=this.timestampFreshness([n.evaluated_at]);if(c)return g(c,"Waiting for a recent smoke calculation.");if(n.status==="source_stale")return g("Stale","Waiting for a recent particle reading.");if(n.status==="incomplete_history")return g("Warming up","Gathering enough particle history.");if(n.status==="history_unavailable")return g("Unavailable","Particle history is unavailable.");if(n.status!=="valid")return g("Unknown","Waiting for a valid particle reading.");let a=n.source_max_age_minutes;if(typeof a!="number"||!Number.isFinite(a)||a<=0)return g("Unknown","Waiting for source freshness metadata.");let u=this.timestampFreshness([n.source_last_reported],Math.min(a,this.config.stale_after_minutes??120));if(u)return g(u,"Waiting for a recent particle reading.");let d=_t(e);if(!Number.isInteger(d)||d<1||d>11||!Q.some(f=>f.key===o.state)){let f=Date.parse(t[this.config.data_expected_entity||""]?.state||"");return(e.state==="unknown"||o.state==="unknown")&&f>Date.now()?g("Warming up","Gathering enough particle history."):g("Unknown","Waiting for a calculated Canadian smoke index.")}let l=Qt(d);return Q[l].key!==o.state?g("Updating","Waiting for matching Canadian smoke readings."):{...Q[l],index:l,value:d===11?"10+":String(d)}}get regional(){let t=this.hass.states[this.config.regional_entity];if(!t||t.state==="unavailable")return g("Unavailable","Regional AQHI is unavailable.");let e=_t(t),i=t.state==="10+";if(!i&&(!Number.isFinite(e)||e<0))return g("Unknown","Waiting for regional AQHI.");let o=this.freshness([t]);if(o)return g(o,"Waiting for recent regional AQHI.");let n=i?11:Math.max(1,Math.round(e)),r=Qt(n);return{...Q[r],index:r,value:n>10?"10+":String(n)}}render(){if(!this.config||!this.hass)return p;let t=this.local,e=this.regional,i=this.hass.states[this.config.regional_entity];return h`<ha-card part="surface" style=${k({"--air-color":t.color,"--kiosk-background":this.config.appearance?.background,"--kiosk-radius":this.config.appearance?.radius,"--kiosk-icon-color":this.config.appearance?.icon_color})}>
      <div class="local-summary" role="button" tabindex="0" aria-label=${`${this.config.name||"Outside air"}: local Canadian smoke history`} aria-description="Local PM2.5-only Canadian smoke estimate, not full regional AQHI. Bands: low 1–3, moderate 4–6, high 7–10, very high 10+." title="Canadian PM2.5-only smoke estimate, not the full regional multi-pollutant AQHI." @click=${o=>this.moreInfo(o,this.config.aqhi_entity)} @keydown=${o=>{(o.key==="Enter"||o.key===" ")&&(o.preventDefault(),o.repeat||this.moreInfo(o,this.config.aqhi_entity))}}>
      <div class="identity"><span part="icon-circle" aria-hidden="true"><ha-icon .icon=${this.config.icon||"mdi:weather-windy"}></ha-icon></span><div><span part="title">${this.config.name||"Outside air"}</span>${this.config.location?h`<span part="detail">${this.config.location}</span>`:p}</div></div>
      <div role="status" aria-live="polite" aria-atomic="true"><div class="hero"><div part="aqhi">${t.value} <span class="unit">AQHI</span></div><span part="category">${t.label}</span></div><p part="interpretation">${t.sentence}</p></div>
      <div aria-hidden="true"><div class="rail">${Q.map((o,n)=>h`<span part="segment" class=${t.index===n?"selected":""} style=${k({background:o.color})}></span>`)}</div><div class="labels"><span>Low · 1–3</span><span>Very high · 10+</span></div></div>
      </div>
      ${this.config.regional_entity?h`<section class="regional-section" aria-label="Regional Canadian AQHI"><div class="provenance">${i?.attributes.location||"Regional"} · Regional AQHI</div><div class="row"><div class="regional-reading" role="status" aria-live="polite" aria-atomic="true"><span part="regional-category">${e.label}</span><div part="regional-aqhi">${e.value} <span class="unit">AQHI</span></div></div><button aria-label="Details: regional AQHI history" @click=${o=>this.moreInfo(o,this.config.regional_entity)}>Details ↗</button></div>${i?.attributes.attribution?h`<div class="provenance">${i.attributes.attribution}</div>`:p}</section>`:p}
    </ha-card>`}};customElements.get("kiosk-door-card")||customElements.define("kiosk-door-card",q);customElements.get("kiosk-climate-card")||customElements.define("kiosk-climate-card",F);customElements.get("kiosk-status-card")||customElements.define("kiosk-status-card",V);customElements.get("kiosk-air-card")||customElements.define("kiosk-air-card",G);customElements.get("kiosk-entity-card")||customElements.define("kiosk-entity-card",L);customElements.get("kiosk-action-card")||customElements.define("kiosk-action-card",W);customElements.get("kiosk-room-card")||customElements.define("kiosk-room-card",B);customElements.get("kiosk-pill-card")||customElements.define("kiosk-pill-card",K);var Gt=window.customBadges||=[];Gt.some(s=>s.type==="kiosk-pill-card")||Gt.push({type:"kiosk-pill-card",name:"Kiosk pill",description:"Compact status capsule",preview:!0,documentationURL:"https://github.com/myevit/kiosk-cards"});var Zt=window.customCards||=[];for(let[s,t,e]of[["kiosk-entity-card","Kiosk entity","State tile with isolated quick control"],["kiosk-action-card","Kiosk action","Explicit momentary action tile"],["kiosk-room-card","Kiosk room","Room summary and navigation"],["kiosk-door-card","Kiosk door","Independent door and linked lock observations"],["kiosk-climate-card","Kiosk climate","Current temperature and HVAC mode"],["kiosk-air-card","Kiosk air","Read-only Canadian smoke estimate and separate regional AQHI"],["kiosk-status-card","Kiosk status","Passive temperature and cross-entity status display"],["kiosk-pill-card","Kiosk pill","Compact status capsule for cards and native badges"]])Zt.some(i=>i.type===s)||Zt.push({type:s,name:t,description:e,preview:!0,documentationURL:"https://github.com/myevit/kiosk-cards"});export{W as KioskActionCard,G as KioskAirCard,m as KioskBaseCard,it as KioskCardEditor,F as KioskClimateCard,q as KioskDoorCard,L as KioskEntityCard,K as KioskPillCard,B as KioskRoomCard,V as KioskStatusCard,he as designTokens,w as kioskStyles,yt as pillStyles};
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
