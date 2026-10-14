var D=globalThis,B=D.ShadowRoot&&(D.ShadyCSS===void 0||D.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,G=Symbol(),pt=new WeakMap,S=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==G)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(B&&t===void 0){let i=e!==void 0&&e.length===1;i&&(t=pt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&pt.set(e,t))}return t}toString(){return this.cssText}},dt=o=>new S(typeof o=="string"?o:o+"",void 0,G),v=(o,...t)=>{let e=o.length===1?o[0]:t.reduce((i,s,n)=>i+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+o[n+1],o[0]);return new S(e,o,G)},ut=(o,t)=>{if(B)o.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let i=document.createElement("style"),s=D.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=e.cssText,o.appendChild(i)}},X=B?o=>o:o=>o instanceof CSSStyleSheet?(t=>{let e="";for(let i of t.cssRules)e+=i.cssText;return dt(e)})(o):o;var{is:jt,defineProperty:Lt,getOwnPropertyDescriptor:It,getOwnPropertyNames:zt,getOwnPropertySymbols:Dt,getPrototypeOf:Bt}=Object,W=globalThis,ft=W.trustedTypes,Wt=ft?ft.emptyScript:"",Kt=W.reactiveElementPolyfillSupport,T=(o,t)=>o,Y={toAttribute(o,t){switch(t){case Boolean:o=o?Wt:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,t){let e=o;switch(t){case Boolean:e=o!==null;break;case Number:e=o===null?null:Number(o);break;case Object:case Array:try{e=JSON.parse(o)}catch{e=null}}return e}},mt=(o,t)=>!jt(o,t),gt={attribute:!0,type:String,converter:Y,reflect:!1,useDefault:!1,hasChanged:mt};Symbol.metadata??=Symbol("metadata"),W.litPropertyMetadata??=new WeakMap;var y=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=gt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let i=Symbol(),s=this.getPropertyDescriptor(t,i,e);s!==void 0&&Lt(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){let{get:s,set:n}=It(this.prototype,t)??{get(){return this[e]},set(a){this[e]=a}};return{get:s,set(a){let c=s?.call(this);n?.call(this,a),this.requestUpdate(t,c,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??gt}static _$Ei(){if(this.hasOwnProperty(T("elementProperties")))return;let t=Bt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(T("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(T("properties"))){let e=this.properties,i=[...zt(e),...Dt(e)];for(let s of i)this.createProperty(s,e[s])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[i,s]of e)this.elementProperties.set(i,s)}this._$Eh=new Map;for(let[e,i]of this.elementProperties){let s=this._$Eu(e,i);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let i=new Set(t.flat(1/0).reverse());for(let s of i)e.unshift(X(s))}else t!==void 0&&e.push(X(t));return e}static _$Eu(t,e){let i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ut(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){let i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(s!==void 0&&i.reflect===!0){let n=(i.converter?.toAttribute!==void 0?i.converter:Y).toAttribute(e,i.type);this._$Em=t,n==null?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){let i=this.constructor,s=i._$Eh.get(t);if(s!==void 0&&this._$Em!==s){let n=i.getPropertyOptions(s),a=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:Y;this._$Em=s;let c=a.fromAttribute(e,n.type);this[s]=c??this._$Ej?.get(s)??c,this._$Em=null}}requestUpdate(t,e,i,s=!1,n){if(t!==void 0){let a=this.constructor;if(s===!1&&(n=this[t]),i??=a.getPropertyOptions(t),!((i.hasChanged??mt)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(a._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:n},a){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,a??e??this[t]),n!==!0||a!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),s===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,n]of this._$Ep)this[s]=n;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[s,n]of i){let{wrapped:a}=n,c=this[s];a!==!0||this._$AL.has(s)||c===void 0||this.C(s,void 0,n,c)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[T("elementProperties")]=new Map,y[T("finalized")]=new Map,Kt?.({ReactiveElement:y}),(W.reactiveElementVersions??=[]).push("2.1.2");var nt=globalThis,yt=o=>o,K=nt.trustedTypes,bt=K?K.createPolicy("lit-html",{createHTML:o=>o}):void 0,wt="$lit$",k=`lit$${Math.random().toFixed(9).slice(2)}$`,At="?"+k,Vt=`<${At}>`,A=document,U=()=>A.createComment(""),O=o=>o===null||typeof o!="object"&&typeof o!="function",at=Array.isArray,qt=o=>at(o)||typeof o?.[Symbol.iterator]=="function",Q=`[ 	
\f\r]`,P=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_t=/-->/g,$t=/>/g,x=RegExp(`>|${Q}(?:([^\\s"'>=/]+)(${Q}*=${Q}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),vt=/'/g,kt=/"/g,Et=/^(?:script|style|textarea|title)$/i,rt=o=>(t,...e)=>({_$litType$:o,strings:t,values:e}),u=rt(1),se=rt(2),oe=rt(3),b=Symbol.for("lit-noChange"),l=Symbol.for("lit-nothing"),xt=new WeakMap,w=A.createTreeWalker(A,129);function Ct(o,t){if(!at(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return bt!==void 0?bt.createHTML(t):t}var Ft=(o,t)=>{let e=o.length-1,i=[],s,n=t===2?"<svg>":t===3?"<math>":"",a=P;for(let c=0;c<e;c++){let r=o[c],p,d,h=-1,f=0;for(;f<r.length&&(a.lastIndex=f,d=a.exec(r),d!==null);)f=a.lastIndex,a===P?d[1]==="!--"?a=_t:d[1]!==void 0?a=$t:d[2]!==void 0?(Et.test(d[2])&&(s=RegExp("</"+d[2],"g")),a=x):d[3]!==void 0&&(a=x):a===x?d[0]===">"?(a=s??P,h=-1):d[1]===void 0?h=-2:(h=a.lastIndex-d[2].length,p=d[1],a=d[3]===void 0?x:d[3]==='"'?kt:vt):a===kt||a===vt?a=x:a===_t||a===$t?a=P:(a=x,s=void 0);let g=a===x&&o[c+1].startsWith("/>")?" ":"";n+=a===P?r+Vt:h>=0?(i.push(p),r.slice(0,h)+wt+r.slice(h)+k+g):r+k+(h===-2?c:g)}return[Ct(o,n+(o[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]},H=class o{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,a=0,c=t.length-1,r=this.parts,[p,d]=Ft(t,e);if(this.el=o.createElement(p,i),w.currentNode=this.el.content,e===2||e===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(s=w.nextNode())!==null&&r.length<c;){if(s.nodeType===1){if(s.hasAttributes())for(let h of s.getAttributeNames())if(h.endsWith(wt)){let f=d[a++],g=s.getAttribute(h).split(k),$=/([.?@])?(.*)/.exec(f);r.push({type:1,index:n,name:$[2],strings:g,ctor:$[1]==="."?et:$[1]==="?"?it:$[1]==="@"?st:C}),s.removeAttribute(h)}else h.startsWith(k)&&(r.push({type:6,index:n}),s.removeAttribute(h));if(Et.test(s.tagName)){let h=s.textContent.split(k),f=h.length-1;if(f>0){s.textContent=K?K.emptyScript:"";for(let g=0;g<f;g++)s.append(h[g],U()),w.nextNode(),r.push({type:2,index:++n});s.append(h[f],U())}}}else if(s.nodeType===8)if(s.data===At)r.push({type:2,index:n});else{let h=-1;for(;(h=s.data.indexOf(k,h+1))!==-1;)r.push({type:7,index:n}),h+=k.length-1}n++}}static createElement(t,e){let i=A.createElement("template");return i.innerHTML=t,i}};function E(o,t,e=o,i){if(t===b)return t;let s=i!==void 0?e._$Co?.[i]:e._$Cl,n=O(t)?void 0:t._$litDirective$;return s?.constructor!==n&&(s?._$AO?.(!1),n===void 0?s=void 0:(s=new n(o),s._$AT(o,e,i)),i!==void 0?(e._$Co??=[])[i]=s:e._$Cl=s),s!==void 0&&(t=E(o,s._$AS(o,t.values),s,i)),t}var tt=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??A).importNode(e,!0);w.currentNode=s;let n=w.nextNode(),a=0,c=0,r=i[0];for(;r!==void 0;){if(a===r.index){let p;r.type===2?p=new R(n,n.nextSibling,this,t):r.type===1?p=new r.ctor(n,r.name,r.strings,this,t):r.type===6&&(p=new ot(n,this,t)),this._$AV.push(p),r=i[++c]}a!==r?.index&&(n=w.nextNode(),a++)}return w.currentNode=A,s}p(t){let e=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},R=class o{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=l,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=E(this,t,e),O(t)?t===l||t==null||t===""?(this._$AH!==l&&this._$AR(),this._$AH=l):t!==this._$AH&&t!==b&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):qt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==l&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(A.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:i}=t,s=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=H.createElement(Ct(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{let n=new tt(s,this),a=n.u(this.options);n.p(e),this.T(a),this._$AH=n}}_$AC(t){let e=xt.get(t.strings);return e===void 0&&xt.set(t.strings,e=new H(t)),e}k(t){at(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,i,s=0;for(let n of t)s===e.length?e.push(i=new o(this.O(U()),this.O(U()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let i=yt(t).nextSibling;yt(t).remove(),t=i}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},C=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,n){this.type=1,this._$AH=l,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=l}_$AI(t,e=this,i,s){let n=this.strings,a=!1;if(n===void 0)t=E(this,t,e,0),a=!O(t)||t!==this._$AH&&t!==b,a&&(this._$AH=t);else{let c=t,r,p;for(t=n[0],r=0;r<n.length-1;r++)p=E(this,c[i+r],e,r),p===b&&(p=this._$AH[r]),a||=!O(p)||p!==this._$AH[r],p===l?t=l:t!==l&&(t+=(p??"")+n[r+1]),this._$AH[r]=p}a&&!s&&this.j(t)}j(t){t===l?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},et=class extends C{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===l?void 0:t}},it=class extends C{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==l)}},st=class extends C{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){if((t=E(this,t,e,0)??l)===b)return;let i=this._$AH,s=t===l&&i!==l||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==l&&(i===l||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},ot=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){E(this,t)}};var Jt=nt.litHtmlPolyfillSupport;Jt?.(H,R),(nt.litHtmlVersions??=[]).push("3.3.3");var St=(o,t,e)=>{let i=e?.renderBefore??t,s=i._$litPart$;if(s===void 0){let n=e?.renderBefore??null;i._$litPart$=s=new R(t.insertBefore(U(),n),n,void 0,e??{})}return s._$AI(o),s};var ct=globalThis,m=class extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=St(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return b}};m._$litElement$=!0,m.finalized=!0,ct.litElementHydrateSupport?.({LitElement:m});var Zt=ct.litElementPolyfillSupport;Zt?.({LitElement:m});(ct.litElementVersions??=[]).push("4.2.2");var Tt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Pt=o=>(...t)=>({_$litDirective$:o,values:t}),V=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var Ut="important",Gt=" !"+Ut,q=Pt(class extends V{constructor(o){if(super(o),o.type!==Tt.ATTRIBUTE||o.name!=="style"||o.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(o){return Object.keys(o).reduce((t,e)=>{let i=o[e];return i==null?t:t+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${i};`},"")}update(o,[t]){let{style:e}=o.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(let i of this.ft)t[i]==null&&(this.ft.delete(i),i.includes("-")?e.removeProperty(i):e[i]=null);for(let i in t){let s=t[i];if(s!=null){this.ft.add(i);let n=typeof s=="string"&&s.endsWith(Gt);i.includes("-")||n?e.setProperty(i,n?s.slice(0,-11):s,n?Ut:""):e[i]=s}}return b}});var M=v`
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
`,lt=v`
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
`,Xt=Object.freeze({height:69,actionHeight:68,largeHeight:146,pillHeight:35,pillRadius:18,pillIconSize:24,iconDiameter:45,glyphSize:25,titleSize:17,detailSize:15,categoryColor:"#3bc8ce"});async function F(o=["ha-dialog","ha-button","ha-dialog-footer","ha-form"]){if(o.every(i=>customElements.get(i)))return;let t=await window.loadCardHelpers?.();if(!t||(await(await t.createCardElement({type:"entities",entities:[]})).constructor.getConfigElement?.(),!o.every(i=>customElements.get(i))))throw Error("Home Assistant controls are unavailable")}function Ot(o,t){return new Promise(e=>{let i=!1,s=n=>{i||(i=!0,e(n))};o.dispatchEvent(new CustomEvent("show-dialog",{bubbles:!0,composed:!0,detail:{dialogTag:"kiosk-confirmation-dialog",dialogImport:()=>F().catch(n=>{throw s(!1),n}),dialogParams:{...t,confirm:()=>s(!0),cancel:()=>s(!1)}}}))})}var ht=class extends m{constructor(){super(...arguments);this.open=!1}static{this.properties={open:{state:!0},params:{state:!0}}}async showDialog(e){await F(),this.params=e,this.open=!0,await this.updateComplete}closeDialog(){return this.finish(!1),!0}finish(e){this.open&&(this.open=!1,(e?this.params.confirm:this.params.cancel)(),this.dispatchEvent(new CustomEvent("dialog-closed",{bubbles:!0,composed:!0,detail:{dialog:this.localName}})))}render(){return this.params?u`<ha-dialog
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
    >`:l}};customElements.get("kiosk-confirmation-dialog")||customElements.define("kiosk-confirmation-dialog",ht);var N=o=>({name:o,selector:{text:{}}}),J=(o,t={})=>({name:o,selector:{entity:t}}),Z=class extends m{constructor(){super(...arguments);this.label=e=>this.config.type==="custom:kiosk-pill-card"&&e.name==="background"?"Background":{entity:"Entity",name:"Name",icon:"Icon",area:"Area",navigation_path:"Navigation path",temperature_entity:"Temperature sensor",occupancy_entity:"Occupancy sensor",light_entities:"Lights (optional override)",var_large:"Large",show_name:"Show name",show_state:"Show state",show_icon:"Show icon",state_display:"State text (optional override)",detail:"Detail (optional override)",interactions:"Interactions",appearance:"Appearance (optional)",icon_color:"Category color (CSS color)",background:"Off background",active_background:"Active background",radius:"Corner radius",tap_action:"Body tap",hold_action:"Body hold",double_tap_action:"Body double tap",icon_tap_action:"Icon tap",icon_hold_action:"Icon hold",icon_double_tap_action:"Icon double tap"}[e.name]||e.name}static{this.properties={hass:{attribute:!1},config:{state:!0}}}static{this.styles=v`
    :host {
      display: block;
    }
    p {
      color: var(--secondary-text-color);
      font-size: 14px;
    }
  `}setConfig(e){this.config={...e}}get schema(){let e=this.config.type==="custom:kiosk-room-card",i=this.config.type==="custom:kiosk-action-card",s=this.config.type==="custom:kiosk-pill-card",n=e?[{name:"area",selector:{area:{}}},N("name"),{name:"icon",selector:{icon:{}}},N("navigation_path"),J("temperature_entity",{filter:{domain:"sensor",device_class:"temperature"}}),J("occupancy_entity",{filter:{domain:"binary_sensor"}}),J("light_entities",{multiple:!0,filter:{domain:"light"}})]:[J("entity",i?{filter:{domain:["script","scene","button"]}}:{}),N("name"),{name:"icon",selector:{icon:{}},context:{icon_entity:"entity"}}],a=e?[]:[{name:"interactions",type:"expandable",flatten:!0,schema:["tap_action","hold_action","double_tap_action","icon_tap_action","icon_hold_action","icon_double_tap_action"].map(c=>({name:c,selector:{ui_action:{default_action:i?"none":c==="icon_tap_action"?!s&&["light","switch","input_boolean"].includes((this.config.entity||"").split(".")[0])?"toggle":"more-info":c.includes("double")?"none":"more-info"}},context:{entity:"entity"}}))}];return[...n,...s?["show_name","show_state","show_icon"].map(c=>({name:c,selector:{boolean:{}}})):[{name:"var_large",selector:{boolean:{}}}],...e?[]:[N(s?"state_display":"detail")],...a,{name:"appearance",type:"expandable",schema:(s?["icon_color","background","radius"]:["icon_color","background","active_background","radius"]).map(N)}]}change(e){e.stopPropagation();let i=e.detail.value;this.config={...this.config,...i},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this.config},bubbles:!0,composed:!0}))}render(){return!this.config||!this.hass?l:u`<ha-form
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
      </p>`}};customElements.get("kiosk-card-editor")||customElements.define("kiosk-card-editor",Z);var Ht=new Set(["light","switch","input_boolean"]);function Rt(o,t,e){o.dispatchEvent(new CustomEvent(t,{detail:e,bubbles:!0,composed:!0}))}var Yt=new Set(["off","closed","idle","paused","standby","away","docked","unknown","unavailable","locked","disarmed"]),_=class extends m{constructor(){super(...arguments);this.busy=!1;this.confirming=!1;this.error="";this.operation=0;this.acknowledged=!1;this.held=!1}static{this.properties={hass:{attribute:!1},config:{state:!0},busy:{state:!0},error:{state:!0},confirming:{state:!0}}}action(e,i="tap"){let s=(e==="icon"?"icon_":"")+i+"_action";return this.config[s]||{action:i==="tap"?e==="icon"&&Ht.has((this.config.entity||"").split(".")[0])?"toggle":"more-info":i==="hold"?"more-info":"none"}}async runAction(e,i,s="tap"){i.stopPropagation();let n=this.action(e,s);if(n.action==="none"||this.busy||this.confirming)return;let a=this.config,c=n.confirmation;if(c&&!(typeof c=="object"&&c.exemptions?.some(g=>g.user===this.hass.user?.id))){let g=this.operation;this.confirming=!0;let $=await Ot(this,typeof c=="object"?c:{});if(this.operation!==g||(this.confirming=!1,!$||!this.isConnected||this.config!==a))return}if(n.action==="more-info"){Rt(this,"hass-more-info",{entityId:n.entity||this.config.entity});return}if(!["toggle","perform-action","call-service"].includes(n.action)){let{confirmation:g,...$}=n;Rt(this,"hass-action",{config:{...this.config,tap_action:$},action:"tap"});return}if(!this.available)return;let r,p,d,h=n.target;if(n.action==="toggle"){if(r=(this.config.entity||"").split(".")[0],!Ht.has(r)){this.error="Choose an explicit action for this device.";return}this.expected=this.state?.state==="on"?"off":"on",p=this.expected==="on"?"turn_on":"turn_off",d={entity_id:this.config.entity}}else{if([r,p]=(n.perform_action||n.service||"").split("."),!r||!p){this.error="Choose an action.";return}d=n.data??n.service_data,this.expected=void 0}let f=++this.operation;this.busy=!0,this.error="",this.acknowledged=!1,this.watchdog=setTimeout(()=>{this.operation===f&&(this.operation++,this.busy=!1,this.error="No confirmation. Check device.")},12e3);try{if(await this.hass.callService(r,p,d,h),this.operation!==f)return;this.acknowledged=!0,this.finishIfConfirmed()}catch{this.operation===f&&(this.operation++,this.busy=!1,clearTimeout(this.watchdog),this.error="Action failed. Check device.")}}finishIfConfirmed(){this.busy&&this.acknowledged&&(!this.expected||this.state?.state===this.expected)&&(this.busy=!1,this.expected=void 0,clearTimeout(this.watchdog))}updated(){this.finishIfConfirmed()}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.watchdog),clearTimeout(this.holdTimer),clearTimeout(this.tapTimer),this.operation++,this.busy=!1}pointerDown(e,i){i.stopPropagation(),i.button===0&&(this.held=!1,clearTimeout(this.holdTimer),this.holdTimer=setTimeout(()=>{this.held=!0,clearTimeout(this.tapTimer),this.runAction(e,i,"hold")},500))}pointerEnd(e){e.stopPropagation(),clearTimeout(this.holdTimer)}tap(e,i){if(i.stopPropagation(),this.held){this.held=!1;return}if(i.detail===0||this.action(e,"double_tap").action==="none"){this.runAction(e,i);return}i.detail>1?(clearTimeout(this.tapTimer),this.runAction(e,i,"double_tap")):this.tapTimer=setTimeout(()=>void this.runAction(e,i),300)}static async getConfigElement(){return window.loadCardHelpers&&await F(["ha-form"]),document.createElement("kiosk-card-editor")}static getStubConfig(e,i=[]){return{entity:i.find(s=>e.states[s])||Object.keys(e.states).find(s=>s.startsWith("light."))||Object.keys(e.states)[0]}}static{this.styles=M}applyConfig(e){let i=e.var_large??e.variables?.var_large;if(i!==void 0&&typeof i!="boolean")throw Error("var_large must be a boolean");clearTimeout(this.watchdog),clearTimeout(this.holdTimer),clearTimeout(this.tapTimer),this.operation++,this.busy=!1,this.confirming=!1,this.expected=void 0,this.error="",this.config={...e}}setConfig(e){if(!e.entity)throw new Error("Choose an entity");this.applyConfig(e)}getCardSize(){return this.large?3:1.38}getGridOptions(){return{columns:6,rows:"auto"}}get state(){return this.hass?.states[this.config?.entity||""]}get active(){return!!this.state&&(this.config.active_states?this.config.active_states.includes(this.state.state):!Yt.has(this.state.state))}get cardTitle(){return this.config.name||this.state?.attributes.friendly_name||this.config.entity||"Entity"}get detail(){if(this.config.detail!==void 0)return this.config.detail;let e=this.state;if(!e)return"Unavailable";if(e.state==="on"&&e.entity_id.startsWith("light.")&&e.attributes.brightness)return`${Math.round(e.attributes.brightness/2.55)}%`;if(e.entity_id.startsWith("climate.")&&!["unknown","unavailable"].includes(e.state)){let s=e.attributes;if(s.target_temp_low!=null&&s.target_temp_high!=null)return`${s.target_temp_low}\xB0\u2013${s.target_temp_high}\xB0`;if(s.temperature!=null)return`${s.temperature}\xB0`;if(s.current_temperature!=null)return`${s.current_temperature}\xB0 (${e.state.charAt(0).toUpperCase()+e.state.slice(1)})`}let i=this.hass.formatEntityState?.(e)||e.state;return i.charAt(0).toUpperCase()+i.slice(1)}get available(){return!!this.state&&!["unknown","unavailable"].includes(this.state.state)}get isAction(){return!1}get large(){return(this.config.var_large??this.config.variables?.var_large)===!0}get cardIcon(){return this.config.icon}render(){if(!this.config||!this.hass)return l;let e=this.config.appearance;return u`<ha-card
      part="surface"
      aria-busy=${String(this.busy)}
      class=${[this.active?"active":"",this.available?"":"unavailable",this.isAction?"action":"",this.large?"large":""].join(" ")}
      style=${q({"--kiosk-icon-color":e?.icon_color,"--kiosk-default-icon-color":this.config.entity?.startsWith("light.")?"var(--accent-color,#3bc8ce)":void 0,"--kiosk-background":e?.background,"--kiosk-active-background":e?.active_background,"--kiosk-radius":e?.radius})}
    >
      <button
        part="icon-target"
        @click=${i=>this.tap("icon",i)}
        @pointerdown=${i=>this.pointerDown("icon",i)}
        @pointerup=${this.pointerEnd}
        @pointercancel=${this.pointerEnd}
        @pointerleave=${this.pointerEnd}
        aria-label=${`Icon \u2014 ${this.cardTitle}`}
        ?disabled=${!this.available||this.busy||this.confirming}
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
    >`}},j=class extends _{},L=class extends _{static getStubConfig(t,e=[]){let s=[...e,...Object.keys(t.states)].find(n=>["script","scene","button"].includes(n.split(".")[0]));return s?{entity:s}:{name:"Action"}}setConfig(t){if(!t.entity&&!t.name)throw Error("Choose an entity or name");if(t.entity&&!["script","scene","button"].includes(t.entity.split(".")[0]))throw Error("Action entities must be scripts, scenes or buttons");this.applyConfig(t)}get isAction(){return!0}get cardIcon(){return this.config.icon||(this.state?void 0:"mdi:play")}get active(){return!0}get detail(){return this.config.detail||(this.available?"":"Unavailable")}get available(){return!this.config.entity||super.available}action(t,e="tap"){let i=(t==="icon"?"icon_":"")+e+"_action";return this.config[i]||(t==="icon"&&e==="tap"?this.config.tap_action:void 0)||{action:"none"}}};var I=class extends _{static getStubConfig(){return{name:"Room",navigation_path:"/lovelace"}}setConfig(t){if(!t.area&&!t.name)throw Error("Choose an area or name");this.applyConfig(t)}get cardTitle(){return this.config.name||this.hass.areas?.[this.config.area||""]?.name||"Room"}get cardIcon(){return this.config.icon||this.hass.areas?.[this.config.area||""]?.icon||"mdi:home-outline"}get available(){return!0}get active(){return this.lights.some(t=>t.state==="on")||(this.config.occupancy_entity?this.hass.states[this.config.occupancy_entity]?.state==="on":this.roomStates.some(t=>t.entity_id.startsWith("binary_sensor.")&&["occupancy","presence","motion"].includes(t.attributes.device_class)&&t.state==="on"))}get roomStates(){return this.config.area?Object.values(this.hass.states).filter(t=>{let e=this.hass.entities?.[t.entity_id];return!e||e.hidden||e.hidden_by||e.disabled_by?!1:(e.area_id||this.hass.devices?.[e.device_id]?.area_id)===this.config.area}):[]}get lights(){return this.config.light_entities!==void 0?this.config.light_entities.map(t=>this.hass.states[t]||{entity_id:t,state:"unavailable",attributes:{}}):this.roomStates.filter(t=>t.entity_id.startsWith("light."))}get detail(){let t=this.roomStates,e=this.config.temperature_entity?this.hass.states[this.config.temperature_entity]||{entity_id:this.config.temperature_entity,state:"unavailable",attributes:{}}:t.find(a=>a.attributes.device_class==="temperature"),i=this.config.occupancy_entity?this.hass.states[this.config.occupancy_entity]||{entity_id:this.config.occupancy_entity,state:"unavailable",attributes:{}}:t.find(a=>a.entity_id.startsWith("binary_sensor.")&&["occupancy","presence","motion"].includes(a.attributes.device_class)),s=[];e&&s.push(["unknown","unavailable"].includes(e.state)?"Temperature unavailable":`${e.state}${e.attributes.unit_of_measurement?" "+e.attributes.unit_of_measurement:""}`),i&&s.push(i.state==="on"?"Occupied":i.state==="off"?"Clear":"Occupancy unavailable");let n=this.lights;if(n.length){let a=n.filter(r=>r.state==="on").length,c=n.filter(r=>["unknown","unavailable"].includes(r.state)).length;a?s.push(`${a} light${a===1?"":"s"} on`):c<n.length&&s.push("Lights off"),c&&s.push(`${c} unavailable`)}return s.join(" \xB7 ")}action(t,e="tap"){return e==="tap"&&this.config.navigation_path?{action:"navigate",navigation_path:this.config.navigation_path}:{action:"none"}}};var z=class extends _{static{this.styles=v`
    ${M}${lt}
  `}setConfig(t){if(!t.entity)throw Error("Choose an entity");if(t.var_large??t.variables?.var_large)throw Error("Pills are compact; Large is not supported");for(let e of["show_name","show_state","show_icon"])if(t[e]!==void 0&&typeof t[e]!="boolean")throw Error(`${e} must be a boolean`);if(t.show_name===!1&&t.show_state===!1&&t.show_icon===!1)throw Error("Show at least one pill field");this.applyConfig(t)}get large(){return!1}get active(){return!1}getCardSize(){return 1}get detail(){let t=this.state;if(this.config.state_display!==void 0)return this.config.state_display;let e=t?this.config.state_labels?.[t.state]??this.config.state_labels?.default:void 0;if(e!==void 0)return e;if(!t)return"Unavailable";let i=this.hass.formatEntityState?.(t)||t.state;return i.charAt(0).toUpperCase()+i.slice(1)}action(t,e="tap"){let i=(t==="icon"?"icon_":"")+e+"_action";return this.config[i]||(t==="icon"?this.config[e+"_action"]:void 0)||{action:e==="double_tap"?"none":"more-info"}}disabled(t){return this.busy||this.confirming||!this.available&&["toggle","perform-action","call-service"].includes(this.action(t).action)}render(){if(!this.config||!this.hass)return l;let t=this.config.appearance,e=this.config.show_name!==!1,i=this.config.show_state!==!1;return u`<ha-card
      part="surface"
      aria-busy=${String(this.busy)}
      class=${`pill ${e?"":"no-name"} ${i?"":"no-state"} ${this.available?"":"unavailable"}`}
      style=${q({"--kiosk-background":t?.background,"--kiosk-icon-color":t?.icon_color,"--kiosk-radius":t?.radius})}
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
    >`}};customElements.get("kiosk-entity-card")||customElements.define("kiosk-entity-card",j);customElements.get("kiosk-action-card")||customElements.define("kiosk-action-card",L);customElements.get("kiosk-room-card")||customElements.define("kiosk-room-card",I);customElements.get("kiosk-pill-card")||customElements.define("kiosk-pill-card",z);var Mt=window.customBadges||=[];Mt.some(o=>o.type==="kiosk-pill-card")||Mt.push({type:"kiosk-pill-card",name:"Kiosk pill",description:"Compact status capsule",preview:!0,documentationURL:"https://github.com/myevit/kiosk-cards"});var Nt=window.customCards||=[];for(let[o,t,e]of[["kiosk-entity-card","Kiosk entity","State tile with isolated quick control"],["kiosk-action-card","Kiosk action","Explicit momentary action tile"],["kiosk-room-card","Kiosk room","Room summary and navigation"],["kiosk-pill-card","Kiosk pill","Compact status capsule for cards and native badges"]])Nt.some(i=>i.type===o)||Nt.push({type:o,name:t,description:e,preview:!0,documentationURL:"https://github.com/myevit/kiosk-cards"});export{L as KioskActionCard,_ as KioskBaseCard,Z as KioskCardEditor,j as KioskEntityCard,z as KioskPillCard,I as KioskRoomCard,Xt as designTokens,M as kioskStyles,lt as pillStyles};
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
