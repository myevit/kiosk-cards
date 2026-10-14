import { html } from 'lit';
import { KioskBaseCard } from './card.js';
import { climateStyles } from './design.js';
import type { Config } from './types.js';
/** Current temperature and HVAC mode are observations; defaults never command HVAC. */
export class KioskClimateCard extends KioskBaseCard {
 static styles = climateStyles;
 static getStubConfig(hass?: import('./types.js').Hass) {
  return {entity:Object.keys(hass?.states || {}).find(e=>e.startsWith('climate.')) || 'climate.example'};
 }
 setConfig(config:Config) {
  if (!config.entity?.startsWith('climate.')) throw Error('Choose a climate entity');
  this.applyConfig(config);
 }
 private temperature(value:unknown) {
  if(this.config.temperature_format === 'legacy')return String(value);
  if(typeof value !== 'number' || !Number.isFinite(value))return '—';
  return new Intl.NumberFormat(this.hass.locale?.language || 'en',{maximumFractionDigits:2}).format(value);
 }
 protected get active() { return !!this.state && !['off','idle','standby','away'].includes(this.state.state); }
 protected get detail() {
  const override=this.presentation('detail') ?? this.config.detail;if(override!==undefined)return String(override);
  const s=this.state;if(!s)return 'Unavailable';const a=s.attributes,mode=s.state,t=(v:unknown)=>this.temperature(v)+'°';
  if(mode==='off')return 'Off';
  if(mode==='fan_only')return 'Fan On';
  if(mode==='heat' || mode==='cool')return `${t(a.temperature)} / ${mode} mode`;
  if(a.target_temp_low!==undefined && a.target_temp_high!==undefined)return `${t(a.target_temp_low)}–${t(a.target_temp_high)}`;
  if(a.temperature!==null && (a.temperature!==undefined || this.config.temperature_format==='legacy'))return t(a.temperature);
  return `${t(a.current_temperature)} (${mode.charAt(0).toUpperCase()+mode.slice(1)})`;
 }
 protected get iconContent() { return html`<span part="temperature">${this.temperature(this.state?.attributes.current_temperature)}°</span>`; }
 protected get surfaceStyles() {
  const colors=this.config.hvac_colors;
  return {'--kiosk-temperature-color':colors?.[this.state?.attributes.hvac_action] || colors?.default || this.config.appearance?.icon_color || 'var(--accent-color)', '--kiosk-height':this.large?'145px':'68px'};
 }
}
