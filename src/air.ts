import { css, html, nothing } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { KioskBaseCard } from './card.js';
import { kioskStyles } from './design.js';
import type { Config, State } from './types.js';

const risks = [
  { key: 'low', label: 'Low risk', color: 'var(--blue-color,#3188b5)', sentence: 'Low particle levels around your home.' },
  { key: 'moderate', label: 'Moderate risk', color: 'var(--warning-color,#d1bb60)', sentence: 'Moderate particle levels around your home.' },
  { key: 'high', label: 'High risk', color: 'var(--error-color,#c9706e)', sentence: 'High particle levels around your home.' },
  { key: 'very_high', label: 'Very high risk', color: 'var(--deep-purple-color,#8c6373)', sentence: 'Very high particle levels around your home.' },
];
const numeric = (s?: State) => s && /^\d+(\.\d+)?$/.test(s.state) && Number.isFinite(Number(s.state)) ? Number(s.state) : NaN;
const pending = (label: string, sentence: string) => ({ label, sentence, index: -1, value: '—', color: 'var(--disabled-text-color,#888)' });
const band = (n: number) => n <= 3 ? 0 : n <= 6 ? 1 : n <= 10 ? 2 : 3;

/** Read-only Canadian local smoke estimate and independent regional AQHI. */
export class KioskAirCard extends KioskBaseCard {
  static styles = css`${kioskStyles}
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

  `;
  private freshnessClock?: ReturnType<typeof setInterval>;
  connectedCallback() { super.connectedCallback(); this.freshnessClock = setInterval(() => this.requestUpdate(), 30000); }
  disconnectedCallback() { super.disconnectedCallback(); clearInterval(this.freshnessClock); }
  static getStubConfig() { return { aqhi_entity: 'sensor.example_smoke_index', category_entity: 'sensor.example_smoke_category', source_entity: 'sensor.example_pm25' }; }
  setConfig(config: Config) {
    for (const key of ['aqhi_entity', 'category_entity', 'source_entity']) {
      if (typeof config[key] !== 'string' || !/^sensor\.[a-z0-9_]+$/.test(config[key])) throw Error(`Choose a sensor for ${key}`);
    }
    for (const key of ['data_expected_entity', 'regional_entity']) {
      if (config[key] && (typeof config[key] !== 'string' || !/^sensor\.[a-z0-9_]+$/.test(config[key]))) throw Error(`Choose a sensor for ${key}`);
    }
    if (config.stale_after_minutes !== undefined && (!Number.isFinite(config.stale_after_minutes) || config.stale_after_minutes < 1 || config.stale_after_minutes > 1440)) throw Error('stale_after_minutes must be between 1 and 1440');
    this.applyConfig(config);
  }
  getCardSize() { return this.config?.regional_entity ? 7 : 4; }
  getGridOptions() { return { columns: 12, rows: 'auto' as const, min_columns: 6 }; }
  private moreInfo(e: Event, entityId: string) {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('hass-more-info', { detail: { entityId }, bubbles: true, composed: true }));
  }
  private timestampFreshness(values: unknown[], minutes = this.config.stale_after_minutes ?? 120) {
    const times = values.map(value => {
      if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}T([01]\d|2[0-3]):[0-5]\d:[0-5]\d(\.\d+)?(Z|[+-]\d{2}:\d{2})$/.test(value)) return NaN;
      const time = Date.parse(value);
      // Date.parse normalizes impossible dates such as February 30.
      return Number.isFinite(time) && new Date(value.slice(0, 10) + 'T00:00:00Z').toISOString().slice(0, 10) === value.slice(0, 10) ? time : NaN;
    });
    // Allow at most one minute of clock skew, never missing/malformed metadata.
    if (times.some(t => !Number.isFinite(t) || t > Date.now() + 60000)) return 'Unknown';
    return times.some(t => Date.now() - t > minutes * 60000) ? 'Stale' : undefined;
  }
  private freshness(states: (State | undefined)[]) {
    // Regional feeds without explicit report metadata retain conservative aging.
    return this.timestampFreshness(states.map(s => s?.last_reported ?? s?.last_updated));
  }
  private get local() {
    const states = this.hass.states, calculated = states[this.config.aqhi_entity!], source = states[this.config.source_entity!], category = states[this.config.category_entity!];
    if ([calculated, source, category].some(s => !s || s.state === 'unavailable')) return pending('Unavailable', 'The local air sensor is unavailable.');
    if (!Number.isFinite(numeric(source))) return pending('Unknown', 'Waiting for a local particle reading.');
    const attributes = calculated.attributes;
    const typed = attributes.index_type === 'canadian_aqhi_smoke_pm25' && attributes.scope === 'local_pm25_only_estimate';
    // Bind the certification to this source; frontend last_updated is not a
    // receipt time for unchanged reports in HA's subscribe_entities transport.
    if (!typed || attributes.source_entity !== this.config.source_entity) return pending('Unknown', 'Choose a matching Canadian PM2.5 smoke estimate sensor.');
    const evaluated = this.timestampFreshness([attributes.evaluated_at]);
    if (evaluated) return pending(evaluated, 'Waiting for a recent smoke calculation.');
    if (attributes.status === 'source_stale') return pending('Stale', 'Waiting for a recent particle reading.');
    if (attributes.status === 'incomplete_history') return pending('Warming up', 'Gathering enough particle history.');
    if (attributes.status === 'history_unavailable') return pending('Unavailable', 'Particle history is unavailable.');
    if (attributes.status !== 'valid') return pending('Unknown', 'Waiting for a valid particle reading.');
    const maxAge = attributes.source_max_age_minutes;
    if (typeof maxAge !== 'number' || !Number.isFinite(maxAge) || maxAge <= 0) return pending('Unknown', 'Waiting for source freshness metadata.');
    const freshness = this.timestampFreshness([attributes.source_last_reported], Math.min(maxAge, this.config.stale_after_minutes ?? 120));
    if (freshness) return pending(freshness, 'Waiting for a recent particle reading.');
    const n = numeric(calculated);
    if (!Number.isInteger(n) || n < 1 || n > 11 || !risks.some(r => r.key === category.state)) {
      const expected = Date.parse(states[this.config.data_expected_entity || '']?.state || '');
      if ((calculated.state === 'unknown' || category.state === 'unknown') && expected > Date.now()) return pending('Warming up', 'Gathering enough particle history.');
      return pending('Unknown', 'Waiting for a calculated Canadian smoke index.');
    }

    const index = band(n);
    if (risks[index].key !== category.state) return pending('Updating', 'Waiting for matching Canadian smoke readings.');
    return { ...risks[index], index, value: n === 11 ? '10+' : String(n) };
  }
  private get regional() {
    const state = this.hass.states[this.config.regional_entity!];
    if (!state || state.state === 'unavailable') return pending('Unavailable', 'Regional AQHI is unavailable.');
    const n = numeric(state), above = state.state === '10+';
    if (!above && (!Number.isFinite(n) || n < 0)) return pending('Unknown', 'Waiting for regional AQHI.');
    const freshness = this.freshness([state]);
    if (freshness) return pending(freshness, 'Waiting for recent regional AQHI.');
    // Environment Canada XML retains decimals; public reporting uses whole numbers.
    const reported = above ? 11 : Math.max(1, Math.round(n)), index = band(reported);
    return { ...risks[index], index, value: reported > 10 ? '10+' : String(reported) };
  }
  render() {
    if (!this.config || !this.hass) return nothing;
    const local = this.local, regional = this.regional, regionalState = this.hass.states[this.config.regional_entity!];
    return html`<ha-card part="surface" style=${styleMap({ '--air-color': local.color, '--kiosk-background': this.config.appearance?.background, '--kiosk-radius': this.config.appearance?.radius, '--kiosk-icon-color': this.config.appearance?.icon_color })}>
      <div class="local-summary" role="button" tabindex="0" aria-label=${`${this.config.name || 'Outside air'}: local Canadian smoke history`} aria-description="Local PM2.5-only Canadian smoke estimate, not full regional AQHI. Bands: low 1–3, moderate 4–6, high 7–10, very high 10+." title="Canadian PM2.5-only smoke estimate, not the full regional multi-pollutant AQHI." @click=${(e: Event) => this.moreInfo(e, this.config.aqhi_entity!)} @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (!e.repeat) this.moreInfo(e, this.config.aqhi_entity!); } }}>
      <div class="identity"><span part="icon-circle" aria-hidden="true"><ha-icon .icon=${this.config.icon || 'mdi:weather-windy'}></ha-icon></span><div><span part="title">${this.config.name || 'Outside air'}</span>${this.config.location ? html`<span part="detail">${this.config.location}</span>` : nothing}</div></div>
      <div role="status" aria-live="polite" aria-atomic="true"><div class="hero"><div part="aqhi">${local.value} <span class="unit">AQHI</span></div><span part="category">${local.label}</span></div><p part="interpretation">${local.sentence}</p></div>
      <div aria-hidden="true"><div class="rail">${risks.map((risk, i) => html`<span part="segment" class=${local.index === i ? 'selected' : ''} style=${styleMap({ background: risk.color })}></span>`)}</div><div class="labels"><span>Low · 1–3</span><span>Very high · 10+</span></div></div>
      </div>
      ${this.config.regional_entity ? html`<section class="regional-section" aria-label="Regional Canadian AQHI"><div class="provenance">${regionalState?.attributes.location || 'Regional'} · Regional AQHI</div><div class="row"><div class="regional-reading" role="status" aria-live="polite" aria-atomic="true"><span part="regional-category">${regional.label}</span><div part="regional-aqhi">${regional.value} <span class="unit">AQHI</span></div></div><button aria-label="Details: regional AQHI history" @click=${(e: Event) => this.moreInfo(e, this.config.regional_entity!)}>Details ↗</button></div>${regionalState?.attributes.attribution ? html`<div class="provenance">${regionalState.attributes.attribution}</div>` : nothing}</section>` : nothing}
    </ha-card>`;
  }
}
