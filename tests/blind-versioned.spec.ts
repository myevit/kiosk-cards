import { test, expect } from '@playwright/test';

test('versioned native card and editor bypass immutable old registrations', async ({ page }) => {
  await page.addInitScript(() => {
    customElements.define('kiosk-blind-presets-card', class extends HTMLElement {
      setConfig() { throw Error('Choose sequential-tdbu or independent-tdbu mapping'); }
    });
    customElements.define('kiosk-blind-presets-editor', class extends HTMLElement {});
    customElements.define('ha-form', class extends HTMLElement {});
  });
  await page.goto('/tests/harness.html');
  await page.waitForFunction(() => (window as any).ready);
  expect(await page.evaluate(() => !!customElements.get('kiosk-blind-presets-v2-card'))).toBe(true);
  const result = await page.evaluate(async () => {
    const config = { type: 'custom:kiosk-blind-presets-v2-card', rows: 1, columns: 1,
      blinds: [0, 1, 2].map(i => ({ mapping: 'native-dual-cover', entity: `cover.example_identity_${i}`, entity_top: `cover.example_top_${i}`, entity_bottom: `cover.example_bottom_${i}` })),
      presets: [{ id: 'band', name: 'Band', positions: [0, 1, 2].map(() => ({ top: 30, bottom: 70 })) }] };
    const calls: any[] = [], changes: any[] = [];
    const hass = { states: Object.fromEntries(config.blinds.flatMap(b => [b.entity_top, b.entity_bottom].map(id => [id, { state: 'unknown', attributes: { supported_features: 4 } }]))), callService: (...args: any[]) => { calls.push(args); } };
    const card: any = document.createElement('kiosk-blind-presets-v2-card');
    card.hass = hass; card.setConfig(config); document.querySelector('#mount')!.append(card); await card.updateComplete;
    const editor: any = await card.constructor.getConfigElement();
    editor.hass = hass; editor.setConfig(config); editor.addEventListener('config-changed', (e: any) => changes.push(e.detail.config));
    document.querySelector('#mount')!.append(editor); await editor.updateComplete;
    (window as any).versioned = { editor, config, calls, changes };
    return { editor: editor.localName, buttons: card.shadowRoot.querySelectorAll('button').length,
      selectors: [...editor.shadowRoot.querySelectorAll('[data-blind]')].flatMap((e: any) => e.schema.filter((s: any) => s.selector?.entity).map((s: any) => s.name)) };
  });
  expect(result).toEqual({ editor: 'kiosk-blind-presets-v2-editor', buttons: 1, selectors: ['entity_top', 'entity_bottom', 'entity_top', 'entity_bottom', 'entity_top', 'entity_bottom'] });
  await page.getByRole('button', { name: 'Edit Band', exact: true }).click();
  await page.getByRole('button', { name: 'Cancel', exact: true }).click();
  expect(await page.evaluate(() => (window as any).versioned.changes)).toEqual([]);
  await page.getByRole('button', { name: 'Edit Band', exact: true }).click();
  await page.getByRole('button', { name: 'Save', exact: true }).click();
  expect(await page.evaluate(() => { const v = (window as any).versioned; return { saved: v.changes.at(-1), original: v.config, calls: v.calls }; })).toEqual(await page.evaluate(() => { const v = (window as any).versioned; return { saved: v.config, original: v.config, calls: [] }; }));
});
