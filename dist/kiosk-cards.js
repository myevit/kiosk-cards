var B=globalThis,W=B.ShadowRoot&&(B.ShadyCSS===void 0||B.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Y=Symbol(),ut=new WeakMap,S=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==Y)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(W&&t===void 0){let i=e!==void 0&&e.length===1;i&&(t=ut.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&ut.set(e,t))}return t}toString(){return this.cssText}},ft=o=>new S(typeof o=="string"?o:o+"",void 0,Y),$=(o,...t)=>{let e=o.length===1?o[0]:t.reduce((i,s,n)=>i+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+o[n+1],o[0]);return new S(e,o,Y)},gt=(o,t)=>{if(W)o.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let i=document.createElement("style"),s=B.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=e.cssText,o.appendChild(i)}},Q=W?o=>o:o=>o instanceof CSSStyleSheet?(t=>{let e="";for(let i of t.cssRules)e+=i.cssText;return ft(e)})(o):o;var{is:Lt,defineProperty:Bt,getOwnPropertyDescriptor:Wt,getOwnPropertyNames:Kt,getOwnPropertySymbols:qt,getPrototypeOf:Vt}=Object,K=globalThis,mt=K.trustedTypes,Ft=mt?mt.emptyScript:"",Jt=K.reactiveElementPolyfillSupport,T=(o,t)=>o,tt={toAttribute(o,t){switch(t){case Boolean:o=o?Ft:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,t){let e=o;switch(t){case Boolean:e=o!==null;break;case Number:e=o===null?null:Number(o);break;case Object:case Array:try{e=JSON.parse(o)}catch{e=null}}return e}},bt=(o,t)=>!Lt(o,t),yt={attribute:!0,type:String,converter:tt,reflect:!1,useDefault:!1,hasChanged:bt};Symbol.metadata??=Symbol("metadata"),K.litPropertyMetadata??=new WeakMap;var y=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=yt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let i=Symbol(),s=this.getPropertyDescriptor(t,i,e);s!==void 0&&Bt(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){let{get:s,set:n}=Wt(this.prototype,t)??{get(){return this[e]},set(r){this[e]=r}};return{get:s,set(r){let c=s?.call(this);n?.call(this,r),this.requestUpdate(t,c,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??yt}static _$Ei(){if(this.hasOwnProperty(T("elementProperties")))return;let t=Vt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(T("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(T("properties"))){let e=this.properties,i=[...Kt(e),...qt(e)];for(let s of i)this.createProperty(s,e[s])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[i,s]of e)this.elementProperties.set(i,s)}this._$Eh=new Map;for(let[e,i]of this.elementProperties){let s=this._$Eu(e,i);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let i=new Set(t.flat(1/0).reverse());for(let s of i)e.unshift(Q(s))}else t!==void 0&&e.push(Q(t));return e}static _$Eu(t,e){let i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return gt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){let i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(s!==void 0&&i.reflect===!0){let n=(i.converter?.toAttribute!==void 0?i.converter:tt).toAttribute(e,i.type);this._$Em=t,n==null?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){let i=this.constructor,s=i._$Eh.get(t);if(s!==void 0&&this._$Em!==s){let n=i.getPropertyOptions(s),r=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:tt;this._$Em=s;let c=r.fromAttribute(e,n.type);this[s]=c??this._$Ej?.get(s)??c,this._$Em=null}}requestUpdate(t,e,i,s=!1,n){if(t!==void 0){let r=this.constructor;if(s===!1&&(n=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??bt)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:n},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),n!==!0||r!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),s===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,n]of this._$Ep)this[s]=n;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[s,n]of i){let{wrapped:r}=n,c=this[s];r!==!0||this._$AL.has(s)||c===void 0||this.C(s,void 0,n,c)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[T("elementProperties")]=new Map,y[T("finalized")]=new Map,Jt?.({ReactiveElement:y}),(K.reactiveElementVersions??=[]).push("2.1.2");var at=globalThis,_t=o=>o,q=at.trustedTypes,vt=q?q.createPolicy("lit-html",{createHTML:o=>o}):void 0,Et="$lit$",k=`lit$${Math.random().toFixed(9).slice(2)}$`,Ct="?"+k,Zt=`<${Ct}>`,A=document,U=()=>A.createComment(""),O=o=>o===null||typeof o!="object"&&typeof o!="function",ct=Array.isArray,Gt=o=>ct(o)||typeof o?.[Symbol.iterator]=="function",et=`[ 	
\f\r]`,P=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,$t=/-->/g,kt=/>/g,x=RegExp(`>|${et}(?:([^\\s"'>=/]+)(${et}*=${et}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),xt=/'/g,wt=/"/g,St=/^(?:script|style|textarea|title)$/i,lt=o=>(t,...e)=>({_$litType$:o,strings:t,values:e}),u=lt(1),ce=lt(2),le=lt(3),b=Symbol.for("lit-noChange"),l=Symbol.for("lit-nothing"),At=new WeakMap,w=A.createTreeWalker(A,129);function Tt(o,t){if(!ct(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return vt!==void 0?vt.createHTML(t):t}var Xt=(o,t)=>{let e=o.length-1,i=[],s,n=t===2?"<svg>":t===3?"<math>":"",r=P;for(let c=0;c<e;c++){let a=o[c],p,d,h=-1,f=0;for(;f<a.length&&(r.lastIndex=f,d=r.exec(a),d!==null);)f=r.lastIndex,r===P?d[1]==="!--"?r=$t:d[1]!==void 0?r=kt:d[2]!==void 0?(St.test(d[2])&&(s=RegExp("</"+d[2],"g")),r=x):d[3]!==void 0&&(r=x):r===x?d[0]===">"?(r=s??P,h=-1):d[1]===void 0?h=-2:(h=r.lastIndex-d[2].length,p=d[1],r=d[3]===void 0?x:d[3]==='"'?wt:xt):r===wt||r===xt?r=x:r===$t||r===kt?r=P:(r=x,s=void 0);let g=r===x&&o[c+1].startsWith("/>")?" ":"";n+=r===P?a+Zt:h>=0?(i.push(p),a.slice(0,h)+Et+a.slice(h)+k+g):a+k+(h===-2?c:g)}return[Tt(o,n+(o[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]},R=class o{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,r=0,c=t.length-1,a=this.parts,[p,d]=Xt(t,e);if(this.el=o.createElement(p,i),w.currentNode=this.el.content,e===2||e===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(s=w.nextNode())!==null&&a.length<c;){if(s.nodeType===1){if(s.hasAttributes())for(let h of s.getAttributeNames())if(h.endsWith(Et)){let f=d[r++],g=s.getAttribute(h).split(k),v=/([.?@])?(.*)/.exec(f);a.push({type:1,index:n,name:v[2],strings:g,ctor:v[1]==="."?st:v[1]==="?"?ot:v[1]==="@"?nt:C}),s.removeAttribute(h)}else h.startsWith(k)&&(a.push({type:6,index:n}),s.removeAttribute(h));if(St.test(s.tagName)){let h=s.textContent.split(k),f=h.length-1;if(f>0){s.textContent=q?q.emptyScript:"";for(let g=0;g<f;g++)s.append(h[g],U()),w.nextNode(),a.push({type:2,index:++n});s.append(h[f],U())}}}else if(s.nodeType===8)if(s.data===Ct)a.push({type:2,index:n});else{let h=-1;for(;(h=s.data.indexOf(k,h+1))!==-1;)a.push({type:7,index:n}),h+=k.length-1}n++}}static createElement(t,e){let i=A.createElement("template");return i.innerHTML=t,i}};function E(o,t,e=o,i){if(t===b)return t;let s=i!==void 0?e._$Co?.[i]:e._$Cl,n=O(t)?void 0:t._$litDirective$;return s?.constructor!==n&&(s?._$AO?.(!1),n===void 0?s=void 0:(s=new n(o),s._$AT(o,e,i)),i!==void 0?(e._$Co??=[])[i]=s:e._$Cl=s),s!==void 0&&(t=E(o,s._$AS(o,t.values),s,i)),t}var it=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??A).importNode(e,!0);w.currentNode=s;let n=w.nextNode(),r=0,c=0,a=i[0];for(;a!==void 0;){if(r===a.index){let p;a.type===2?p=new M(n,n.nextSibling,this,t):a.type===1?p=new a.ctor(n,a.name,a.strings,this,t):a.type===6&&(p=new rt(n,this,t)),this._$AV.push(p),a=i[++c]}r!==a?.index&&(n=w.nextNode(),r++)}return w.currentNode=A,s}p(t){let e=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},M=class o{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=l,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=E(this,t,e),O(t)?t===l||t==null||t===""?(this._$AH!==l&&this._$AR(),this._$AH=l):t!==this._$AH&&t!==b&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Gt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==l&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(A.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:i}=t,s=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=R.createElement(Tt(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{let n=new it(s,this),r=n.u(this.options);n.p(e),this.T(r),this._$AH=n}}_$AC(t){let e=At.get(t.strings);return e===void 0&&At.set(t.strings,e=new R(t)),e}k(t){ct(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,i,s=0;for(let n of t)s===e.length?e.push(i=new o(this.O(U()),this.O(U()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let i=_t(t).nextSibling;_t(t).remove(),t=i}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},C=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,n){this.type=1,this._$AH=l,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=l}_$AI(t,e=this,i,s){let n=this.strings,r=!1;if(n===void 0)t=E(this,t,e,0),r=!O(t)||t!==this._$AH&&t!==b,r&&(this._$AH=t);else{let c=t,a,p;for(t=n[0],a=0;a<n.length-1;a++)p=E(this,c[i+a],e,a),p===b&&(p=this._$AH[a]),r||=!O(p)||p!==this._$AH[a],p===l?t=l:t!==l&&(t+=(p??"")+n[a+1]),this._$AH[a]=p}r&&!s&&this.j(t)}j(t){t===l?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},st=class extends C{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===l?void 0:t}},ot=class extends C{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==l)}},nt=class extends C{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){if((t=E(this,t,e,0)??l)===b)return;let i=this._$AH,s=t===l&&i!==l||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==l&&(i===l||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},rt=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){E(this,t)}};var Yt=at.litHtmlPolyfillSupport;Yt?.(R,M),(at.litHtmlVersions??=[]).push("3.3.3");var Pt=(o,t,e)=>{let i=e?.renderBefore??t,s=i._$litPart$;if(s===void 0){let n=e?.renderBefore??null;i._$litPart$=s=new M(t.insertBefore(U(),n),n,void 0,e??{})}return s._$AI(o),s};var ht=globalThis,m=class extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Pt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return b}};m._$litElement$=!0,m.finalized=!0,ht.litElementHydrateSupport?.({LitElement:m});var Qt=ht.litElementPolyfillSupport;Qt?.({LitElement:m});(ht.litElementVersions??=[]).push("4.2.2");var Ut={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Ot=o=>(...t)=>({_$litDirective$:o,values:t}),V=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var Rt="important",te=" !"+Rt,F=Ot(class extends V{constructor(o){if(super(o),o.type!==Ut.ATTRIBUTE||o.name!=="style"||o.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(o){return Object.keys(o).reduce((t,e)=>{let i=o[e];return i==null?t:t+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${i};`},"")}update(o,[t]){let{style:e}=o.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(let i of this.ft)t[i]==null&&(this.ft.delete(i),i.includes("-")?e.removeProperty(i):e[i]=null);for(let i in t){let s=t[i];if(s!=null){this.ft.add(i);let n=typeof s=="string"&&s.endsWith(te);i.includes("-")||n?e.setProperty(i,n?s.slice(0,-11):s,n?Rt:""):e[i]=s}}return b}});var H=$`
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
`,pt=$`
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
`,ee=Object.freeze({height:69,actionHeight:68,largeHeight:146,pillHeight:35,pillRadius:18,pillIconSize:24,iconDiameter:45,glyphSize:25,titleSize:17,detailSize:15,categoryColor:"#3bc8ce"});async function J(o=["ha-dialog","ha-button","ha-dialog-footer","ha-form"]){if(o.every(i=>customElements.get(i)))return;let t=await window.loadCardHelpers?.();if(!t||(await(await t.createCardElement({type:"entities",entities:[]})).constructor.getConfigElement?.(),!o.every(i=>customElements.get(i))))throw Error("Home Assistant controls are unavailable")}function Mt(o,t){return new Promise(e=>{let i=!1,s=n=>{i||(i=!0,e(n))};o.dispatchEvent(new CustomEvent("show-dialog",{bubbles:!0,composed:!0,detail:{dialogTag:"kiosk-confirmation-dialog",dialogImport:()=>J().catch(n=>{throw s(!1),n}),dialogParams:{...t,confirm:()=>s(!0),cancel:()=>s(!1)}}}))})}var dt=class extends m{constructor(){super(...arguments);this.open=!1}static{this.properties={open:{state:!0},params:{state:!0}}}async showDialog(e){await J(),this.params=e,this.open=!0,await this.updateComplete}closeDialog(){return this.finish(!1),!0}finish(e){this.open&&(this.open=!1,(e?this.params.confirm:this.params.cancel)(),this.dispatchEvent(new CustomEvent("dialog-closed",{bubbles:!0,composed:!0,detail:{dialog:this.localName}})))}render(){return this.params?u`<ha-dialog
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
    >`:l}};customElements.get("kiosk-confirmation-dialog")||customElements.define("kiosk-confirmation-dialog",dt);var N=o=>({name:o,selector:{text:{}}}),Z=(o,t={})=>({name:o,selector:{entity:t}}),G=class extends m{constructor(){super(...arguments);this.label=e=>this.config.type==="custom:kiosk-pill-card"&&e.name==="background"?"Background":{entity:"Entity",name:"Name",icon:"Icon",area:"Area",navigation_path:"Navigation path",temperature_entity:"Temperature sensor",occupancy_entity:"Occupancy sensor",light_entities:"Lights (optional override)",var_large:"Large",show_name:"Show name",show_state:"Show state",show_icon:"Show icon",state_display:"State text (optional override)",detail:"Detail (optional override)",interactions:"Interactions",dynamic:"Declarative rules (advanced, optional)",presentation:"Presentation expressions",action_rules:"Conditional actions",appearance:"Appearance (optional)",icon_color:"Category color (CSS color)",background:"Off background",active_background:"Active background",radius:"Corner radius",tap_action:"Body tap",hold_action:"Body hold",double_tap_action:"Body double tap",icon_tap_action:"Icon tap",icon_hold_action:"Icon hold",icon_double_tap_action:"Icon double tap"}[e.name]||e.name}static{this.properties={hass:{attribute:!1},config:{state:!0}}}static{this.styles=$`
    :host {
      display: block;
    }
    p {
      color: var(--secondary-text-color);
      font-size: 14px;
    }
  `}setConfig(e){this.config={...e}}get schema(){let e=this.config.type==="custom:kiosk-room-card",i=this.config.type==="custom:kiosk-action-card",s=this.config.type==="custom:kiosk-pill-card",n=e?[{name:"area",selector:{area:{}}},N("name"),{name:"icon",selector:{icon:{}}},N("navigation_path"),Z("temperature_entity",{filter:{domain:"sensor",device_class:"temperature"}}),Z("occupancy_entity",{filter:{domain:"binary_sensor"}}),Z("light_entities",{multiple:!0,filter:{domain:"light"}})]:[Z("entity",i?{filter:{domain:["script","scene","button"]}}:{}),N("name"),{name:"icon",selector:{icon:{}},context:{icon_entity:"entity"}}],r=e?[]:[{name:"interactions",type:"expandable",flatten:!0,schema:["tap_action","hold_action","double_tap_action","icon_tap_action","icon_hold_action","icon_double_tap_action"].map(c=>({name:c,selector:{ui_action:{default_action:i?"none":c==="icon_tap_action"?!s&&["light","switch","input_boolean"].includes((this.config.entity||"").split(".")[0])?"toggle":"more-info":c.includes("double")?"none":"more-info"}},context:{entity:"entity"}}))}];return[...n,...s?["show_name","show_state","show_icon"].map(c=>({name:c,selector:{boolean:{}}})):[{name:"var_large",selector:{boolean:{}}}],...e?[]:[N(s?"state_display":"detail")],...r,...e?[]:[{name:"dynamic",type:"expandable",flatten:!0,schema:["presentation","action_rules"].map(c=>({name:c,selector:{object:{}}}))}],{name:"appearance",type:"expandable",schema:(s?["icon_color","background","radius"]:["icon_color","background","active_background","radius"]).map(N)}]}change(e){e.stopPropagation();let i=e.detail.value;this.config={...this.config,...i},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this.config},bubbles:!0,composed:!0}))}render(){return!this.config||!this.hass?l:u`<ha-form
        .hass=${this.hass}
        .data=${this.config.type==="custom:kiosk-pill-card"?{...this.config,show_name:this.config.show_name??!0,show_state:this.config.show_state??!0,show_icon:this.config.show_icon??!0}:{...this.config,var_large:this.config.var_large??this.config.variables?.var_large??!1}}
        .schema=${this.schema}
        .computeLabel=${this.label}
        @value-changed=${this.change}
      ></ha-form>
      <p>
        Pills stay compact and default to more-info on both targets. Large
        applies only to entity, action and room cards. Default appearance
        follows the kiosk design. Entity icon taps control only lights, switches
        and input booleans. Room controls only navigate; action cards require an
        explicit action.
      </p>`}};customElements.get("kiosk-card-editor")||customElements.define("kiosk-card-editor",G);var ie=new Set(["if","eq","ne","includes","in","and","or","not","defined","finite","number","round","gt","lt","concat","capitalize","map","countdown","minutes"]);function j(o,t=0){if(t>24)throw Error("Rule nesting exceeds 24");if(!(!o||typeof o!="object")){if(Array.isArray(o)){if(o.length>100)throw Error("Rule list too large");o.forEach(e=>j(e,t+1));return}if(o.op!==void 0){if(!ie.has(o.op)||!Array.isArray(o.args)||o.args.length>100)throw Error("Unknown rule operation");o.args.forEach(e=>j(e,t+1))}else if(o.entity!==void 0||o.attribute!==void 0||o.state!==void 0||o.last_changed!==void 0){if(o.attribute&&["__proto__","constructor","prototype"].includes(o.attribute))throw Error("Unsafe attribute");if(o.entity!==void 0&&typeof o.entity!="string")throw Error("Rule entity must be a string")}else Object.values(o).forEach(e=>j(e,t+1))}}function X(o,t,e,i=Date.now()){if(!o||typeof o!="object")return o;if(!o.op){if(o.entity!==void 0||o.attribute!==void 0||o.state!==void 0||o.last_changed!==void 0){let n=t?.states[o.entity||e.entity||""];return o.attribute!==void 0?n?.attributes[o.attribute]:o.last_changed?n?.last_changed:n?.state}return o}let s=n=>X(o.args[n],t,e,i);switch(o.op){case"if":return s(0)?s(1):s(2);case"eq":return s(0)===s(1);case"ne":return s(0)!==s(1);case"includes":return typeof s(0)=="string"&&s(0).includes(s(1));case"in":return Array.isArray(s(1))&&s(1).includes(s(0));case"and":return o.args.every((n,r)=>!!s(r));case"or":return o.args.some((n,r)=>!!s(r));case"not":return!s(0);case"defined":return s(0)!==void 0;case"finite":return Number.isFinite(s(0));case"number":return Number(s(0));case"round":return Math.round(Number(s(0)));case"gt":return s(0)>s(1);case"lt":return s(0)<s(1);case"concat":return o.args.map((n,r)=>s(r)??"").join("");case"capitalize":{let n=String(s(0)??"");return n.charAt(0).toUpperCase()+n.slice(1)}case"map":{let n=s(1);return Object.hasOwn(n,String(s(0)))?n[String(s(0))]:n.default??s(2)}case"minutes":{let n=Date.parse(s(0));return Number.isFinite(n)?Math.max(0,Math.ceil((n-i)/6e4)):NaN}case"countdown":{let n=Date.parse(s(0));if(!Number.isFinite(n))return s(1)??"";let r=Math.max(0,Math.ceil((n-i)/6e4)),c=Math.floor(r/60);return c>0?`${c}h ${String(r%60).padStart(2,"0")}m left`:`${r}m left`}}}function Ht(o){return/"op":"(?:countdown|minutes)"/.test(JSON.stringify(o.presentation))}function Nt(o){j(o.presentation);for(let[t,e]of Object.entries(o.action_rules||{})){if(!/^(icon_)?(tap|hold|double_tap)_action$/.test(t)||!Array.isArray(e)||e.length>100)throw Error("Invalid action rules");for(let i of e)if(j(i.when),!i.action||typeof i.action.action!="string")throw Error("Rule requires action")}}var jt=new Set(["light","switch","input_boolean"]);function It(o,t,e){o.dispatchEvent(new CustomEvent(t,{detail:e,bubbles:!0,composed:!0}))}var se=new Set(["off","closed","idle","paused","standby","away","docked","unknown","unavailable","locked","disarmed"]),_=class extends m{constructor(){super(...arguments);this.busy=!1;this.confirming=!1;this.error="";this.operation=0;this.acknowledged=!1;this.held=!1}static{this.properties={hass:{attribute:!1},config:{state:!0},busy:{state:!0},error:{state:!0},confirming:{state:!0}}}connectedCallback(){super.connectedCallback(),this.startClock()}startClock(){clearInterval(this.clock),this.isConnected&&this.config&&Ht(this.config)&&(this.clock=setInterval(()=>this.requestUpdate(),3e4))}presentation(e){let i=this.config.presentation?.[e];return i===void 0?void 0:X(i,this.hass,this.config)}resolvedAction(e,i){return this.config.action_rules?.[e]?.find(n=>X(n.when,this.hass,this.config))?.action||i}action(e,i="tap"){let s=(e==="icon"?"icon_":"")+i+"_action";return this.resolvedAction(s,this.config[s]||{action:i==="tap"?e==="icon"&&this.available&&jt.has((this.config.entity||"").split(".")[0])?"toggle":"more-info":i==="hold"?"more-info":"none"})}async runAction(e,i,s="tap"){i.stopPropagation();let n=this.action(e,s);if(n.action==="none"||this.busy||this.confirming)return;let r=this.config,c=n.confirmation;if(c&&!(typeof c=="object"&&c.exemptions?.some(g=>g.user===this.hass.user?.id))){let g=this.operation;this.confirming=!0;let v=await Mt(this,typeof c=="object"?c:{});if(this.operation!==g||(this.confirming=!1,!v||!this.isConnected||this.config!==r))return}if(n.action==="more-info"){It(this,"hass-more-info",{entityId:n.entity||this.config.entity});return}if(!["toggle","perform-action","call-service"].includes(n.action)){let{confirmation:g,...v}=n;It(this,"hass-action",{config:{...this.config,tap_action:v},action:"tap"});return}if(!this.available)return;let a,p,d,h=n.target;if(n.action==="toggle"){if(a=(this.config.entity||"").split(".")[0],!jt.has(a)){this.error="Choose an explicit action for this device.";return}this.expected=this.state?.state==="on"?"off":"on",p=this.expected==="on"?"turn_on":"turn_off",d={entity_id:this.config.entity}}else{if([a,p]=(n.perform_action||n.service||"").split("."),!a||!p){this.error="Choose an action.";return}d=n.data??n.service_data,this.expected=void 0}let f=++this.operation;this.busy=!0,this.error="",this.acknowledged=!1,this.watchdog=setTimeout(()=>{this.operation===f&&(this.operation++,this.busy=!1,this.error="No confirmation. Check device.")},12e3);try{if(await this.hass.callService(a,p,d,h),this.operation!==f)return;this.acknowledged=!0,this.finishIfConfirmed()}catch{this.operation===f&&(this.operation++,this.busy=!1,clearTimeout(this.watchdog),this.error="Action failed. Check device.")}}finishIfConfirmed(){this.busy&&this.acknowledged&&(!this.expected||this.state?.state===this.expected)&&(this.busy=!1,this.expected=void 0,clearTimeout(this.watchdog))}updated(){this.finishIfConfirmed()}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this.clock),clearTimeout(this.watchdog),clearTimeout(this.holdTimer),clearTimeout(this.tapTimer),this.operation++,this.busy=!1}pointerDown(e,i){i.stopPropagation(),i.button===0&&(this.held=!1,clearTimeout(this.holdTimer),this.holdTimer=setTimeout(()=>{this.held=!0,clearTimeout(this.tapTimer),this.runAction(e,i,"hold")},500))}pointerEnd(e){e.stopPropagation(),clearTimeout(this.holdTimer)}tap(e,i){if(i.stopPropagation(),this.held){this.held=!1;return}if(i.detail===0||this.action(e,"double_tap").action==="none"){this.runAction(e,i);return}i.detail>1?(clearTimeout(this.tapTimer),this.runAction(e,i,"double_tap")):this.tapTimer=setTimeout(()=>void this.runAction(e,i),300)}static async getConfigElement(){return window.loadCardHelpers&&await J(["ha-form"]),document.createElement("kiosk-card-editor")}static getStubConfig(e,i=[]){return{entity:i.find(s=>e.states[s])||Object.keys(e.states).find(s=>s.startsWith("light."))||Object.keys(e.states)[0]}}static{this.styles=H}applyConfig(e){Nt(e);let i=e.var_large??e.variables?.var_large;if(i!==void 0&&typeof i!="boolean")throw Error("var_large must be a boolean");clearTimeout(this.watchdog),clearTimeout(this.holdTimer),clearTimeout(this.tapTimer),this.operation++,this.busy=!1,this.confirming=!1,this.expected=void 0,this.error="",this.config={...e},this.startClock()}setConfig(e){if(!e.entity)throw new Error("Choose an entity");this.applyConfig(e)}getCardSize(){return this.large?3:1.38}getGridOptions(){return{columns:6,rows:"auto"}}get state(){return this.hass?.states[this.config?.entity||""]}get active(){return!!this.state&&(this.config.active_states?this.config.active_states.includes(this.state.state):!se.has(this.state.state))}get cardTitle(){return(this.presentation("name")??this.config.name)||this.state?.attributes.friendly_name||this.config.entity||"Entity"}get detail(){let e=this.presentation("detail");if(e!==void 0)return String(e);if(this.config.detail!==void 0)return this.config.detail;let i=this.state;if(!i)return"Unavailable";if(i.state==="on"&&i.entity_id.startsWith("light.")&&i.attributes.brightness)return`${Math.round(i.attributes.brightness/2.55)}%`;if(i.entity_id.startsWith("climate.")&&!["unknown","unavailable"].includes(i.state)){let n=i.attributes;if(n.target_temp_low!=null&&n.target_temp_high!=null)return`${n.target_temp_low}\xB0\u2013${n.target_temp_high}\xB0`;if(n.temperature!=null)return`${n.temperature}\xB0`;if(n.current_temperature!=null)return`${n.current_temperature}\xB0 (${i.state.charAt(0).toUpperCase()+i.state.slice(1)})`}let s=this.hass.formatEntityState?.(i)||i.state;return s.charAt(0).toUpperCase()+s.slice(1)}get available(){return!!this.state&&!["unknown","unavailable"].includes(this.state.state)}get isAction(){return!1}get large(){return(this.config.var_large??this.config.variables?.var_large)===!0}get cardIcon(){return this.presentation("icon")??this.config.icon}render(){if(!this.config||!this.hass)return l;let e=this.config.appearance;return u`<ha-card
      part="surface"
      aria-busy=${String(this.busy)}
      class=${[this.active?"active":"",this.available?"":"unavailable",this.isAction?"action":"",this.large?"large":""].join(" ")}
      style=${F({"--kiosk-icon-color":e?.icon_color,"--kiosk-default-icon-color":this.config.entity?.startsWith("light.")?"var(--accent-color,#3bc8ce)":void 0,"--kiosk-background":e?.background,"--kiosk-active-background":e?.active_background,"--kiosk-radius":e?.radius})}
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
          >${this.cardIcon?u`<ha-icon .icon=${this.cardIcon}></ha-icon>`:u`<ha-state-icon .hass=${this.hass} .stateObj=${this.state} .stateColor=${!1}></ha-state-icon>`}</span
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
        >${this.detail?u`<span part="detail">${this.detail}</span>`:l}</button
      >${this.error?u`<span part="feedback" role="status">${this.error}</span>`:l}</ha-card
    >`}},I=class extends _{},D=class extends _{static getStubConfig(t,e=[]){let s=[...e,...Object.keys(t.states)].find(n=>["script","scene","button"].includes(n.split(".")[0]));return s?{entity:s}:{name:"Action"}}setConfig(t){if(!t.entity&&!t.name)throw Error("Choose an entity or name");if(t.entity&&!["script","scene","button"].includes(t.entity.split(".")[0]))throw Error("Action entities must be scripts, scenes or buttons");this.applyConfig(t)}get isAction(){return!0}get cardIcon(){return(this.presentation("icon")??this.config.icon)||(this.state?void 0:"mdi:play")}get active(){return!0}get detail(){return this.config.detail||(this.available?"":"Unavailable")}get available(){return!this.config.entity||super.available}action(t,e="tap"){let i=(t==="icon"?"icon_":"")+e+"_action";return this.resolvedAction(i,this.config[i]||(t==="icon"&&e==="tap"?this.config.tap_action:void 0)||{action:"none"})}};var z=class extends _{static getStubConfig(){return{name:"Room",navigation_path:"/lovelace"}}setConfig(t){if(!t.area&&!t.name)throw Error("Choose an area or name");this.applyConfig(t)}get cardTitle(){return this.config.name||this.hass.areas?.[this.config.area||""]?.name||"Room"}get cardIcon(){return this.config.icon||this.hass.areas?.[this.config.area||""]?.icon||"mdi:home-outline"}get available(){return!0}get active(){return this.lights.some(t=>t.state==="on")||(this.config.occupancy_entity?this.hass.states[this.config.occupancy_entity]?.state==="on":this.roomStates.some(t=>t.entity_id.startsWith("binary_sensor.")&&["occupancy","presence","motion"].includes(t.attributes.device_class)&&t.state==="on"))}get roomStates(){return this.config.area?Object.values(this.hass.states).filter(t=>{let e=this.hass.entities?.[t.entity_id];return!e||e.hidden||e.hidden_by||e.disabled_by?!1:(e.area_id||this.hass.devices?.[e.device_id]?.area_id)===this.config.area}):[]}get lights(){return this.config.light_entities!==void 0?this.config.light_entities.map(t=>this.hass.states[t]||{entity_id:t,state:"unavailable",attributes:{}}):this.roomStates.filter(t=>t.entity_id.startsWith("light."))}get detail(){let t=this.roomStates,e=this.config.temperature_entity?this.hass.states[this.config.temperature_entity]||{entity_id:this.config.temperature_entity,state:"unavailable",attributes:{}}:t.find(r=>r.attributes.device_class==="temperature"),i=this.config.occupancy_entity?this.hass.states[this.config.occupancy_entity]||{entity_id:this.config.occupancy_entity,state:"unavailable",attributes:{}}:t.find(r=>r.entity_id.startsWith("binary_sensor.")&&["occupancy","presence","motion"].includes(r.attributes.device_class)),s=[];e&&s.push(["unknown","unavailable"].includes(e.state)?"Temperature unavailable":`${e.state}${e.attributes.unit_of_measurement?" "+e.attributes.unit_of_measurement:""}`),i&&s.push(i.state==="on"?"Occupied":i.state==="off"?"Clear":"Occupancy unavailable");let n=this.lights;if(n.length){let r=n.filter(a=>a.state==="on").length,c=n.filter(a=>["unknown","unavailable"].includes(a.state)).length;r?s.push(`${r} light${r===1?"":"s"} on`):c<n.length&&s.push("Lights off"),c&&s.push(`${c} unavailable`)}return s.join(" \xB7 ")}action(t,e="tap"){return e==="tap"&&this.config.navigation_path?{action:"navigate",navigation_path:this.config.navigation_path}:{action:"none"}}};var L=class extends _{static{this.styles=$`
    ${H}${pt}
  `}setConfig(t){if(!t.entity)throw Error("Choose an entity");if(t.var_large??t.variables?.var_large)throw Error("Pills are compact; Large is not supported");for(let e of["show_name","show_state","show_icon"])if(t[e]!==void 0&&typeof t[e]!="boolean")throw Error(`${e} must be a boolean`);if(t.show_name===!1&&t.show_state===!1&&t.show_icon===!1)throw Error("Show at least one pill field");this.applyConfig(t)}get large(){return!1}get active(){return!1}getCardSize(){return 1}get detail(){let t=this.presentation("state_display");if(t!==void 0)return String(t);let e=this.state;if(this.config.state_display!==void 0)return this.config.state_display;let i=e?this.config.state_labels?.[e.state]??this.config.state_labels?.default:void 0;if(i!==void 0)return i;if(!e)return"Unavailable";let s=this.hass.formatEntityState?.(e)||e.state;return s.charAt(0).toUpperCase()+s.slice(1)}action(t,e="tap"){let i=(t==="icon"?"icon_":"")+e+"_action";return this.resolvedAction(i,this.config[i]||(t==="icon"?this.config[e+"_action"]:void 0)||{action:e==="double_tap"?"none":"more-info"})}disabled(t){return this.busy||this.confirming||!this.available&&["toggle","perform-action","call-service"].includes(this.action(t).action)}render(){if(!this.config||!this.hass)return l;let t=this.config.appearance,e=this.config.show_name!==!1,i=this.config.show_state!==!1;return u`<ha-card
      part="surface"
      aria-busy=${String(this.busy)}
      class=${`pill ${e?"":"no-name"} ${i?"":"no-state"} ${this.available?"":"unavailable"}`}
      style=${F({"--kiosk-background":t?.background,"--kiosk-icon-color":t?.icon_color,"--kiosk-radius":t?.radius})}
      @click=${s=>this.tap("body",s)}
      @pointerdown=${s=>this.pointerDown("body",s)}
      @pointerup=${this.pointerEnd}
      @pointercancel=${this.pointerEnd}
      @pointerleave=${this.pointerEnd}
    >
      ${this.config.show_icon!==!1?u`<button part="icon-target" aria-label=${`Icon \u2014 ${this.cardTitle}`} ?disabled=${this.disabled("icon")} @click=${s=>this.tap("icon",s)} @pointerdown=${s=>this.pointerDown("icon",s)} @pointerup=${this.pointerEnd} @pointercancel=${this.pointerEnd} @pointerleave=${this.pointerEnd}><span part="icon-circle">${this.cardIcon?u`<ha-icon .icon=${this.cardIcon}></ha-icon>`:u`<ha-state-icon .hass=${this.hass} .stateObj=${this.state} .stateColor=${!1}></ha-state-icon>`}</span></button>`:u`<span class="empty-icon" aria-hidden="true"></span>`}
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
        ${e?u`<span part="title">${this.cardTitle}</span>`:l}${i?u`<span part="detail">${this.detail}</span>`:l}</button
      >${this.error?u`<span part="feedback" role="status">${this.error}</span>`:l}</ha-card
    >`}};customElements.get("kiosk-entity-card")||customElements.define("kiosk-entity-card",I);customElements.get("kiosk-action-card")||customElements.define("kiosk-action-card",D);customElements.get("kiosk-room-card")||customElements.define("kiosk-room-card",z);customElements.get("kiosk-pill-card")||customElements.define("kiosk-pill-card",L);var Dt=window.customBadges||=[];Dt.some(o=>o.type==="kiosk-pill-card")||Dt.push({type:"kiosk-pill-card",name:"Kiosk pill",description:"Compact status capsule",preview:!0,documentationURL:"https://github.com/myevit/kiosk-cards"});var zt=window.customCards||=[];for(let[o,t,e]of[["kiosk-entity-card","Kiosk entity","State tile with isolated quick control"],["kiosk-action-card","Kiosk action","Explicit momentary action tile"],["kiosk-room-card","Kiosk room","Room summary and navigation"],["kiosk-pill-card","Kiosk pill","Compact status capsule for cards and native badges"]])zt.some(i=>i.type===o)||zt.push({type:o,name:t,description:e,preview:!0,documentationURL:"https://github.com/myevit/kiosk-cards"});export{D as KioskActionCard,_ as KioskBaseCard,G as KioskCardEditor,I as KioskEntityCard,L as KioskPillCard,z as KioskRoomCard,ee as designTokens,H as kioskStyles,pt as pillStyles};
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
