import { css } from 'lit';
import { KioskBaseCard } from './card.js';
import type { Action, Config } from './types.js';
/** A contact/cover and a lock are independent observations, never inferred from each other. */
export class KioskDoorCard extends KioskBaseCard {
 static styles = css`${KioskBaseCard.styles} .unavailable [part="icon-circle"] { opacity: 1; }`;
 static getStubConfig(hass?: import('./types.js').Hass) {
  const entity=Object.keys(hass?.states || {}).find(e=>['binary_sensor','cover','lock'].includes(e.split('.')[0])) || 'binary_sensor.example_door';
  return {entity};
 }
 setConfig(config:Config) {
  if (!config.entity) throw Error('Choose a door or lock entity');
  if (!['binary_sensor','cover','lock'].includes(config.entity.split('.')[0])) throw Error('Choose a contact, cover or lock');
  if (config.lock_entity && !config.lock_entity.startsWith('lock.')) throw Error('Choose a lock entity');
  this.applyConfig(config);
 }
 protected get lockEntity() { return this.config.lock_entity || (this.config.entity?.startsWith('lock.') ? this.config.entity : undefined); }
 protected get doorEntity() { return this.config.door_entity || (!this.config.entity?.startsWith('lock.') ? this.config.entity : undefined); }
 protected get lockState() { return this.hass?.states[this.lockEntity || '']; }
 protected get doorState() { return this.hass?.states[this.doorEntity || '']?.state || 'unknown'; }
 protected get closed() { return ['off','closed'].includes(this.doorState); }
 protected get open() { return ['on','open'].includes(this.doorState); }
 protected get active() { return !(this.lockState?.state === 'locked' && this.closed); }
 protected get detail() {
  const override=this.presentation('detail') ?? this.config.detail;
  if (override !== undefined) return String(override);
  const door=this.open ? 'open' : this.closed ? 'closed' : this.doorState;
  return this.lockEntity ? `${door} / ${this.lockState?.state || 'unknown'}` : door;
 }
 protected get cardIcon() {
  const override=super.cardIcon;if (override) return override;
  const lock=this.lockState?.state;
  if (lock==='locked' && this.closed) return 'mdi:door-closed-lock';
  if (lock==='locked' && this.open) return 'mdi:door-closed-cancel';
  if (lock==='unlocked' && this.closed) return 'mdi:lock-open';
  if (lock==='unlocked' && this.open) return 'mdi:door-open';
  return this.lockState?.attributes.icon || 'mdi:lock-question';
 }
 protected get surfaceStyles() {
  return {'--kiosk-glyph':this.active ? 'white' : this.config.appearance?.icon_color || '#3bc8ce'};
 }
 protected action(target:'icon'|'body',gesture='tap'):Action {
  const key=(target==='icon'?'icon_':'')+gesture+'_action';
  return this.resolvedAction(key,this.config[key] || {action:gesture==='double_tap'?'none':'more-info',...(target==='icon' && this.lockEntity ? {entity:this.lockEntity} : {})});
 }
}
