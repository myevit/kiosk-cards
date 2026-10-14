import { html, nothing } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { KioskBaseCard } from './card.js';
import { statusStyles } from './design.js';
/** Passive hero display: genuine cross-entity activity, never local operation progress. */
export class KioskStatusCard extends KioskBaseCard {
 static styles = statusStyles;
 static getStubConfig(hass?: import('./types.js').Hass) {
  return {entity:Object.keys(hass?.states || {}).find(e=>e.startsWith('sensor.') && hass?.states[e].attributes.device_class==='temperature') || 'sensor.example_temperature'};
 }
 protected get active() { return this.hass?.states[this.config.status_active_entity || '']?.state === 'on'; }
 private get value() { const raw=this.state?.state || 'unavailable',n=parseFloat(raw);return Number.isFinite(n)?n.toFixed(0):raw; }
 private get message() { const msg=this.hass?.states[this.config.status_entity || '']?.state;return msg && msg!=='clear'?msg:''; }
 private get trendColor() {
  const n=parseFloat(this.hass?.states[this.config.trend_entity || '']?.state || '');
  if (!Number.isFinite(n))return 'white';
  if (n>=3)return '#ff1744';if(n>=1.5)return '#ff6d00';if(n>=0.5)return '#ffd600';
  if (n<=-3)return '#2962ff';if(n<=-1.5)return '#00b0ff';if(n<=-0.5)return '#00e5ff';return 'white';
 }
 render() {
  if(!this.config || !this.hass)return nothing;
  return html`<ha-card part="surface" class=${this.active?'active':''} style=${styleMap({'--kiosk-background':this.config.appearance?.background || 'var(--ha-card-background,var(--card-background-color))','--kiosk-radius':this.config.appearance?.radius})}>
   <button part="body-target" aria-label=${this.cardTitle} @click=${(e:MouseEvent)=>this.tap('body',e)} @pointerdown=${(e:PointerEvent)=>this.pointerDown('body',e)} @pointerup=${this.pointerEnd} @pointercancel=${this.pointerEnd} @pointerleave=${this.pointerEnd}>
    ${this.active?html`<span part="status">${this.message}</span>`:html`<span part="pad" aria-hidden="true">°</span><span part="value">${this.value}</span><span part="degree" style=${styleMap({color:this.trendColor})}>°</span>`}
   </button>
  </ha-card>`;
 }
}
