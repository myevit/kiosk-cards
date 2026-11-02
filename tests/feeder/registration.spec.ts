import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
const candidate = readFileSync('dist/kiosk-cards.js', 'utf8');
const legacy = readFileSync('tests/feeder/legacy/tuya-feeder-card.js', 'utf8');
for (const oldFirst of [true, false]) test(`distinct registrations survive oldFirst=${oldFirst} and repeated candidate`, async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto('/tests/harness.html');
  await page.evaluate(() => document.body.replaceChildren());
  for (const content of oldFirst ? [legacy, candidate, candidate] : [candidate, legacy, candidate]) await page.addScriptTag({ type: 'module', content });
  expect(await page.evaluate(() => {
    const tags = ['kiosk-feeder-card', 'kiosk-feeder-card-editor', 'kiosk-feeder-meal-dialog', 'tuya-feeder-card', 'tuya-feeder-card-editor', 'tuya-feeder-meal-dialog'];
    const ctor: any = customElements.get('kiosk-feeder-card');
    return { defined: tags.map(t => !!customElements.get(t)), distinct: customElements.get(tags[0]) !== customElements.get(tags[3]), editor: ctor.getConfigElement().localName, catalog: (window as any).customCards.filter((x: any) => x.type === tags[0]).length };
  })).toEqual({ defined: [true, true, true, true, true, true], distinct: true, editor: 'kiosk-feeder-card-editor', catalog: 1 });
  expect(errors).toEqual([]);
});
test('editor retains unknown top-level and nested config', async ({ page }) => {
  await page.goto('/tests/harness.html');
  await page.addScriptTag({ type: 'module', content: candidate });
  const config = { type: 'custom:kiosk-feeder-card', entity: 'sensor.synthetic_feeder', unknown: { nested: [1, 'retain'] }, grid_options: { columns: 12 }, appearance: { accent_color: '#123456', future: { retain: true }, off: { title_color: '#abcdef', future: 'retain' } } };
  const result = await page.evaluate(async config => {
    const legacyConfig = { ...config, type: 'custom:tuya-feeder-card' };
    const C: any = customElements.get('kiosk-feeder-card');
    const editor: any = C.getConfigElement(); editor.setConfig(legacyConfig); document.body.append(editor); await editor.updateComplete;
    let saved: any; editor.addEventListener('config-changed', (e: any) => saved = e.detail.config);
    editor.shadowRoot.querySelector('ha-form').dispatchEvent(new CustomEvent('value-changed', { detail: { value: { title: 'Changed', appearance: { accent_color: '#654321', off: { title_color: '#fedcba' } } } } }));
    return saved;
  }, config);
  expect(result).toEqual({ ...config, title: 'Changed', appearance: { ...config.appearance, accent_color: '#654321', off: { ...config.appearance.off, title_color: '#fedcba' } } });
});
