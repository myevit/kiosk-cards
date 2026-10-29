import { test, expect } from "@playwright/test";
import { useBlindEditorSource } from './blind-editor-source';
const cfg = {
  type: "custom:kiosk-blind-presets-card",
  rows: 1,
  columns: 2,
  blinds: [
    { entity: "cover.example_left", name: "L", width: 1, extra: "blind" },
    { entity: "cover.example_middle", name: "M", width: 2 },
  ],
  presets: [
    {
      id: "a",
      name: "A",
      extra: "preset",
      positions: [
        { top: 0, bottom: 0, extra: "coord" },
        { top: 0, bottom: 100 },
      ],
    },
    {
      id: "b",
      name: "B",
      positions: [
        { top: 30, bottom: 80 },
        { top: 0, bottom: 100 },
      ],
    },
  ],
  grid_options: { columns: 12, rows: 6 },
  visibility: [{ condition: "user", users: ["synthetic"] }],
  extra: "root",
};
async function setup(page: any) {
  await useBlindEditorSource(page);
  await page.goto("/tests/harness.html");
  await page.waitForFunction(() => (window as any).ready);
  return page.evaluate(async (cfg) => {
    const w = window as any;
    customElements.define("ha-form", class extends HTMLElement {});
    w.calls = [];
    w.changes = [];
    const card: any = document.createElement("kiosk-blind-presets-card");
    if (!card.constructor.getConfigElement) return false;
    w.editor = await card.constructor.getConfigElement();
    w.editor.hass = {
      states: {},
      callService: (...a: any[]) => w.calls.push(a),
    };
    w.editor.setConfig(cfg);
    w.editor.addEventListener("config-changed", (e: any) =>
      w.changes.push(e.detail.config),
    );
    document.querySelector("#mount")!.append(w.editor);
    return true;
  }, cfg);
}
async function change(page: any, selector: string, data: any) {
  await page
    .locator(selector)
    .evaluate(
      (el: any, data: any) =>
        el.dispatchEvent(
          new CustomEvent("value-changed", {
            detail: { value: data },
            bubbles: true,
            composed: true,
          }),
        ),
      data,
    );
}
test('picture workflow has no script import or manual native command controls and never reads HA', async ({page}) => {
  await setup(page);
  await page.evaluate(() => {
    const w = window as any;
    w.reads = [];
    w.editor.hass = {...w.editor.hass, callWS: async (message: any) => {w.reads.push(message); throw new Error('Editor must not read scripts');}};
  });
  await page.getByRole('button', {name:'Edit A',exact:true}).click();
  await expect(page.locator('[data-script], [data-command], [data-command-preview]')).toHaveCount(0);
  await expect(page.getByRole('button',{name:/Copy commands|Remove override/})).toHaveCount(0);
  const formMetadata = await page.locator('ha-form').evaluateAll((forms: any[]) => forms.map(form => ({schema:form.schema,labels:form.schema.map((field:any)=>form.computeLabel(field))})));
  expect(JSON.stringify(formMetadata)).not.toMatch(/script|Native value|Native override|Copy from existing/i);
  await change(page,'[data-position="0"]',{top:20,bottom:100});
  await page.getByRole('button',{name:'Save',exact:true}).click();
  await page.getByRole('button',{name:'Edit A',exact:true}).click();
  await page.getByRole('button',{name:'Cancel',exact:true}).click();
  await page.evaluate(async () => {const w=window as any; w.editor.remove(); document.querySelector('#mount')!.append(w.editor); await w.editor.updateComplete;});
  expect(await page.evaluate(()=>(window as any).reads)).toEqual([]);
  expect(await page.evaluate(()=>(window as any).calls)).toEqual([]);
});

test('absolute independent picture targets Save and Cancel retain per-blind mappings and other presets', async ({page}) => {
  await setup(page);
  const config = await page.evaluate(() => {
    const w=window as any;
    const config=structuredClone(w.editor.config);
    config.blinds[0].mapping='independent-tdbu';
    config.blinds[1].mapping='sequential-tdbu';
    w.editor.setConfig(config);
    return config;
  });
  await page.getByRole('button',{name:'Edit A',exact:true}).click();
  await change(page,'[data-position="0"]',{top:30,bottom:70});
  await page.getByRole('button',{name:'Cancel',exact:true}).click();
  expect(await page.evaluate(()=>(window as any).changes)).toEqual([]);
  await page.getByRole('button',{name:'Edit A',exact:true}).click();
  expect(await page.locator('[data-position="0"]').evaluate((form:any)=>form.data)).toEqual(config.presets[0].positions[0]);
  await change(page,'[data-position="0"]',{top:30,bottom:70});
  await page.getByRole('button',{name:'Save',exact:true}).click();
  const saved=await page.evaluate(()=>(window as any).changes.at(-1));
  expect(saved.blinds).toEqual(config.blinds);
  expect(saved.presets[1]).toEqual(config.presets[1]);
  expect(saved.presets[0].positions).toEqual([{...config.presets[0].positions[0],top:30,bottom:70},config.presets[0].positions[1]]);
  expect(saved.presets[0].commands).toBeUndefined();
  expect(saved.presets[0].actions).toBeUndefined();
  expect(await page.evaluate(()=>(window as any).calls)).toEqual([]);
});

test("native form selectors and clickable picture editor: draft Save/Cancel emits config only", async ({
  page,
}) => {
  expect(await setup(page)).toBe(true);
  expect(
    await page
      .locator("ha-form[data-grid]")
      .evaluate((e: any) => e.schema.map((s: any) => s.selector.number.mode)),
  ).toEqual(["box", "box"]);
  expect(
    await page
      .locator('ha-form[data-blind="0"]')
      .evaluate((e: any) => e.schema[0].selector.entity.filter.domain),
  ).toBe("cover");
  await page.getByRole("button", { name: "Edit A", exact: true }).click();
  await expect(page.locator("[data-preview] svg")).toHaveCount(1);
  expect(
    await page
      .locator('ha-form[data-position="0"]')
      .evaluate((e: any) =>
        e.schema.map((s: any) => [
          s.name,
          s.selector.number.min,
          s.selector.number.max,
        ]),
      ),
  ).toEqual([
    ["top", 0, 100],
    ["bottom", 0, 100],
  ]);
  await change(page, 'ha-form[data-position="0"]', { top: 40, bottom: 100 });
  expect(await page.evaluate(() => (window as any).changes.length)).toBe(0);
  await page.getByRole("button", { name: "Cancel", exact: true }).click();
  await page.getByRole("button", { name: "Edit A", exact: true }).click();
  expect(
    await page
      .locator('ha-form[data-position="0"]')
      .evaluate((e: any) => e.data.top),
  ).toBe(0);
  await change(page, 'ha-form[data-position="0"]', { top: 40, bottom: 100 });
  await page.getByRole("button", { name: "Save", exact: true }).click();
  const result = await page.evaluate(() => (window as any).changes.at(-1));
  expect(result.presets[0].positions[0]).toEqual({
    top: 40,
    bottom: 100,
    extra: "coord",
  });
  expect(result.extra).toBe("root");
  expect(result.grid_options).toEqual(cfg.grid_options);
  expect(result.visibility).toEqual(cfg.visibility);
  expect(result.presets[0].extra).toBe("preset");
  expect(await page.evaluate(() => (window as any).calls)).toEqual([]);
});
test("grid grow/shrink preserves values; reorder blinds carries coordinates; destructive removals explicit", async ({
  page,
}) => {
  await setup(page);
  await page.getByRole('button', {name:'Move preset B up'}).click();
  expect(await page.evaluate(()=>(window as any).changes.at(-1).presets)).toEqual([...cfg.presets].reverse());
  await page.getByRole('button', {name:'Move preset B down'}).click();
  expect(await page.evaluate(()=>(window as any).changes.at(-1).presets)).toEqual(cfg.presets);
  await page.evaluate(()=>(window as any).changes=[]);
  await change(page, "ha-form[data-grid]", { rows: 1, columns: 1 });
  await expect(page.getByRole("status")).toContainText(/Remove presets/);
  expect(await page.evaluate(() => (window as any).changes.length)).toBe(0);
  await change(page, "ha-form[data-grid]", { rows: 2, columns: 2 });
  expect(
    await page.evaluate(() => (window as any).changes.at(-1).presets),
  ).toEqual(cfg.presets);
  await page.getByRole("button", { name: "Move blind M up" }).click();
  const reordered = await page.evaluate(() => (window as any).changes.at(-1));
  expect(reordered.blinds.map((b: any) => b.entity)).toEqual(
    [...cfg.blinds].reverse().map((b) => b.entity),
  );
  expect(reordered.presets[0].positions).toEqual(
    [...cfg.presets[0].positions].reverse(),
  );
  await change(page, "ha-form[data-new-blind]", {
    entity: "cover.example_right",
    name: "R",
    width: 1,
  });
  await page.getByRole("button", { name: "Add blind", exact: true }).click();
  expect(
    await page.evaluate(
      () => (window as any).changes.at(-1).presets[0].positions,
    ),
  ).toEqual(
    [...cfg.presets[0].positions].reverse().concat([{ top: 0, bottom: 100 }]),
  );
  await page
    .getByRole("button", { name: "Remove blind R", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Confirm removal", exact: true }),
  ).toBeVisible();
  expect(
    await page.evaluate(() => (window as any).changes.at(-1).blinds.length),
  ).toBe(3);
  await page
    .getByRole("button", { name: "Confirm removal", exact: true })
    .click();
  expect(
    await page.evaluate(() => (window as any).changes.at(-1).blinds.length),
  ).toBe(2);
  await page.getByRole("button", { name: "Edit B", exact: true }).click();
  await expect(page.getByRole("status")).toContainText(/sequential/);
  await expect(
    page.getByRole("button", { name: "Save", exact: true }),
  ).toBeDisabled();
  await change(page, 'ha-form[data-position="1"]', { top: 30, bottom: 100 });
  await page.getByRole("button", { name: "Save", exact: true }).click();
  await page.getByRole("button", { name: "Add preset", exact: true }).click();
  await page.getByRole("button", { name: "Save", exact: true }).click();
  expect(
    await page.evaluate(() => (window as any).changes.at(-1).presets.length),
  ).toBe(3);
  await page
    .getByRole("button", { name: "Edit Preset 3", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Remove preset", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Confirm removal", exact: true })
    .click();
  expect(
    await page.evaluate(() => (window as any).changes.at(-1).presets.length),
  ).toBe(2);
  expect(await page.evaluate(() => (window as any).calls)).toEqual([]);
});