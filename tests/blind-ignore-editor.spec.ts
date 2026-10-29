import { test, expect, type Page } from '@playwright/test';
import { useBlindEditorSource } from './blind-editor-source';

const config = {
  type: 'custom:kiosk-blind-presets-card', rows: 1, columns: 2,
  extra: { root: true },
  blinds: [
    { entity: 'cover.left', name: 'Left', width: 1, mapping: 'independent-tdbu' },
    { entity: 'cover.right', name: 'Right', width: 1 },
  ],
  presets: [
    { id: 'a', name: 'A', extra: { preset: true }, positions: [
      { top: 27, bottom: 73, extra: { coordinate: true } },
      { top: 0, bottom: 84 },
    ], commands: [{ service: 'set_cover_position', entity_id: 'cover.right', position: 42 }] },
    { id: 'b', name: 'B', positions: [{ top: 0, bottom: 100 }, { top: 0, bottom: 100 }] },
  ],
};

async function setup(page: Page, value: any = config) {
  await useBlindEditorSource(page);
  await page.goto('/tests/harness.html');
  await page.waitForFunction(() => (window as any).ready);
  await page.evaluate(async value => {
    const w = window as any;
    customElements.define('ha-form', class extends HTMLElement {});
    w.calls = []; w.reads = []; w.changes = [];
    const card: any = document.createElement('kiosk-blind-presets-card');
    w.editor = await card.constructor.getConfigElement();
    w.editor.hass = { states: {}, callService: (...args: any[]) => w.calls.push(args), callWS: (...args: any[]) => w.reads.push(args) };
    w.editor.setConfig(value);
    w.editor.addEventListener('config-changed', (event: any) => w.changes.push(event.detail.config));
    document.querySelector('#mount')!.append(w.editor);
  }, value);
}
async function change(page: Page, selector: string, value: any) {
  await page.locator(selector).evaluate((form, value) => form.dispatchEvent(new CustomEvent('value-changed', { detail: { value }, bubbles: true, composed: true })), value);
}
async function ignore(page: Page, index: number, ignored: boolean) {
  await change(page, `[data-ignore="${index}"]`, { ignored });
}
async function untouchedHA(page: Page) {
  expect(await page.evaluate(() => ({ calls: (window as any).calls, reads: (window as any).reads }))).toEqual({ calls: [], reads: [] });
}

test('normal picture workflow exposes native Ignore this shade checkbox, with atomic draft and Cancel', async ({ page }) => {
  const pictureConfig: any = structuredClone(config);
  delete pictureConfig.presets[0].commands;
  await setup(page, pictureConfig);
  await page.getByRole('button', { name: 'Edit A', exact: true }).click();
  await expect(page.locator('[data-ignore="0"]')).toHaveCount(1);
  expect(await page.locator('[data-ignore="0"]').evaluate((form: any) => ({ schema: form.schema, data: form.data, label: form.computeLabel(form.schema[0]) }))).toEqual({ schema: [{ name: 'ignored', selector: { boolean: {} } }], data: { ignored: false }, label: 'Ignore this shade' });
  await ignore(page, 0, true);
  await expect(page.locator('[data-preview] [data-ignored]')).toHaveCount(1);
  await expect(page.locator('[data-preview] [data-ignored] [data-fabric]')).toHaveCount(0);
  await change(page, '[data-position="0"]', { top: 31, bottom: 69 });
  expect(await page.evaluate(() => (window as any).editor.config)).toEqual(pictureConfig);
  expect(await page.evaluate(() => (window as any).changes)).toEqual([]);
  await page.getByRole('button', { name: 'Cancel', exact: true }).click();
  await page.getByRole('button', { name: 'Edit A', exact: true }).click();
  expect(await page.locator('[data-ignore="0"]').evaluate((form: any) => form.data.ignored)).toBe(false);
  expect(await page.locator('[data-position="0"]').evaluate((form: any) => form.data)).toEqual(config.presets[0].positions[0]);
  await expect(page.locator('[data-script], [data-command], [data-command-preview]')).toHaveCount(0);
  await expect(page.getByRole('button', { name: /Copy commands|Copy from|Remove override/ })).toHaveCount(0);
  await untouchedHA(page);
});

test('Save persists ignore without losing exact targets, legacy commands, or unknown fields; re-enable restores inclusion', async ({ page }) => {
  await setup(page);
  await page.getByRole('button', { name: 'Edit A', exact: true }).click();
  await ignore(page, 0, true);
  await page.getByRole('button', { name: 'Save', exact: true }).click();
  const expected: any = structuredClone(config);
  expected.presets[0].positions[0].ignored = true;
  expect(await page.evaluate(() => (window as any).changes)).toEqual([expected]);
  await page.getByRole('button', { name: 'Edit A', exact: true }).click();
  expect(await page.locator('[data-ignore="0"]').evaluate((form: any) => form.data.ignored)).toBe(true);
  await ignore(page, 0, false);
  await change(page, '[data-position="0"]', { top: 33, bottom: 67 });
  await page.getByRole('button', { name: 'Cancel', exact: true }).click();
  expect(await page.evaluate(() => (window as any).editor.config)).toEqual(expected);
  await page.getByRole('button', { name: 'Edit A', exact: true }).click();
  expect(await page.locator('[data-position="0"]').evaluate((form: any) => form.data)).toEqual(expected.presets[0].positions[0]);
  await ignore(page, 0, false);
  await page.getByRole('button', { name: 'Save', exact: true }).click();
  expected.presets[0].positions[0].ignored = false;
  expect(await page.evaluate(() => (window as any).changes.at(-1))).toEqual(expected);
  await untouchedHA(page);
});

test('blind reorder carries ignore and coordinates together; added blinds included and removal drops only their positions', async ({ page }) => {
  const initial: any = structuredClone(config);
  initial.presets[0].positions[0].ignored = true;
  await setup(page, initial);
  await page.getByRole('button', { name: 'Move blind Right up' }).click();
  const expected: any = structuredClone(initial);
  expected.blinds.reverse();
  expected.presets.forEach((preset: any) => preset.positions.reverse());
  expect(await page.evaluate(() => (window as any).changes.at(-1))).toEqual(expected);
  await change(page, '[data-new-blind]', { entity: 'cover.new', name: 'New', width: 1 });
  await page.getByRole('button', { name: 'Add blind', exact: true }).click();
  expected.blinds.push({ entity: 'cover.new', name: 'New', width: 1 });
  expected.presets.forEach((preset: any) => preset.positions.push({ top: 0, bottom: 100 }));
  expect(await page.evaluate(() => (window as any).changes.at(-1))).toEqual(expected);
  await page.getByRole('button', { name: 'Remove blind Left', exact: true }).click();
  await page.getByRole('button', { name: 'Confirm removal', exact: true }).click();
  expected.blinds.splice(1, 1);
  expected.presets.forEach((preset: any) => preset.positions.splice(1, 1));
  expect(await page.evaluate(() => (window as any).changes.at(-1))).toEqual(expected);
  await untouchedHA(page);
});

test('all-ignored draft remains editable with an editor validation error, cannot save, and recovers by including a shade', async ({ page }) => {
  await setup(page);
  await page.getByRole('button', { name: 'Edit A', exact: true }).click();
  await ignore(page, 0, true);
  await ignore(page, 1, true);
  await expect(page.getByRole('status')).toContainText(/at least one|all.*ignored|no.*controlled/i);
  await expect(page.getByRole('button', { name: 'Save', exact: true })).toBeDisabled();
  // Also verify the save handler refuses an invalid draft if invoked directly.
  await page.evaluate(() => (window as any).editor.save());
  expect(await page.evaluate(() => (window as any).changes)).toEqual([]);
  expect(await page.evaluate(() => (window as any).editor.config)).toEqual(config);
  await expect(page.locator('[data-ignore]')).toHaveCount(2);
  await ignore(page, 1, false);
  await expect(page.getByRole('status')).toHaveCount(0);
  await page.getByRole('button', { name: 'Save', exact: true }).click();
  const saved = await page.evaluate(() => (window as any).changes.at(-1));
  expect(saved.presets[0].positions).toEqual([{ ...config.presets[0].positions[0], ignored: true }, { ...config.presets[0].positions[1], ignored: false }]);
  await untouchedHA(page);
});
