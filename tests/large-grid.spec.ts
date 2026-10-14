import { test, expect } from "@playwright/test";
async function setup(page: any, tag: string, config: any = {}, state = "off") {
  await page.goto("/tests/harness.html");
  await page.waitForFunction(() => (window as any).ready);
  await page.evaluate(
    ({ tag, config, state }: any) => {
      const w = window as any;
      w.calls = [];
      w.events = [];
      w.hass = {
        states: {
          "light.example": {
            entity_id: "light.example",
            state,
            attributes: { friendly_name: "Synthetic example" },
          },
          "script.example": {
            entity_id: "script.example",
            state: "off",
            attributes: { friendly_name: "Synthetic action" },
          },
        },
        callService: async (...a: any[]) => w.calls.push(a),
      };
      for (const name of ["hass-more-info", "hass-action"])
        document.addEventListener(name, (e: any) => w.events.push(e.detail));
      const base =
        tag === "kiosk-room-card"
          ? {
              name: "Synthetic room",
              navigation_path: "/lovelace/example",
              light_entities: ["light.example"],
            }
          : {
              entity:
                tag === "kiosk-action-card"
                  ? "script.example"
                  : "light.example",
              tap_action: { action: "more-info" },
            };
      w.card = document.createElement(tag);
      w.card.setConfig({ type: "custom:" + tag, ...base, ...config });
      w.card.hass = w.hass;
      document.querySelector("#mount")!.append(w.card);
    },
    { tag, config, state },
  );
}
for (const width of [320, 640])
  for (const state of ["off", "on"])
    for (const tag of [
      "kiosk-entity-card",
      "kiosk-action-card",
      "kiosk-room-card",
    ])
      test(`${tag} Large ${state} ${width}px matches measured stacked geometry`, async ({
        page,
      }) => {
        await page.setViewportSize({ width, height: 600 });
        await setup(page, tag, { var_large: true }, state);
        await page
          .locator("#mount")
          .evaluate(
            (e, w) => ((e as HTMLElement).style.width = w + "px"),
            width,
          );
        const metrics = await page.evaluate(() => {
          const c = (window as any).card;
          const r = c.shadowRoot,
            s = r.querySelector('[part="surface"]'),
            t = r.querySelector('[part="title"]'),
            i = r.querySelector('[part="icon-circle"]');
          const sr = s.getBoundingClientRect(),
            tr = t.getBoundingClientRect(),
            ir = i.getBoundingClientRect();
          return {
            height: sr.height,
            circleWidth: ir.width,
            circleHeight: ir.height,
            circleX: ir.x - sr.x,
            circleY: ir.y - sr.y,
            titleX: tr.x - sr.x,
            titleY: tr.y - sr.y,
            font: getComputedStyle(t).fontSize,
            overflow: s.scrollWidth > s.clientWidth,
            grid: c.getGridOptions(),
          };
        });
        expect(metrics).toEqual({
          height: 146,
          circleWidth: 45,
          circleHeight: 45,
          circleX: tag === "kiosk-action-card" ? 11.5 : 10.5,
          circleY: tag === "kiosk-action-card" ? 11.5 : 12,
          titleX: 14,
          titleY: tag === "kiosk-action-card" ? 111 : 96,
          font: tag === "kiosk-action-card" ? "18px" : "17px",
          overflow: false,
          grid: { columns: 6, rows: "auto" },
        });
        await page.locator('[part="body-target"]').focus();
        await page.keyboard.press("Enter");
        expect(await page.evaluate(() => (window as any).calls.length)).toBe(0);
        expect(await page.evaluate(() => (window as any).events.length)).toBe(
          1,
        );
      });
for (const tag of ["kiosk-entity-card", "kiosk-action-card", "kiosk-room-card"])
  test(`${tag} getter/stub/editor keeps auto grid defaults and custom overrides`, async ({
    page,
  }) => {
    await setup(page, tag, { grid_options: { columns: 12, rows: 3 } });
    const result = await page.evaluate(async () => {
      const w = window as any;
      const stub = w.card.constructor.getStubConfig(w.hass, []);
      const editor = await w.card.constructor.getConfigElement();
      editor.setConfig(w.card.config);
      editor.hass = w.hass;
      document.querySelector("#mount")!.append(editor);
      await editor.updateComplete;
      let changed: any;
      editor.addEventListener(
        "config-changed",
        (e: any) => (changed = e.detail.config),
      );
      const f = editor.shadowRoot.querySelector("ha-form");
      const large = f.schema.find((s: any) => s.name === "var_large");
      f.dispatchEvent(
        new CustomEvent("value-changed", {
          detail: { value: { ...f.data, var_large: true } },
        }),
      );
      w.card.setConfig(changed);
      await w.card.updateComplete;
      return {
        defaults: w.card.getGridOptions(),
        stubGrid: stub.grid_options,
        selector: large.selector,
        label: f.computeLabel(large),
        configGrid: changed.grid_options,
        large: changed.var_large,
        height: w.card.shadowRoot
          .querySelector('[part="surface"]')
          .getBoundingClientRect().height,
        calls: w.calls.length,
      };
    });
    expect(result).toEqual({
      defaults: { columns: 6, rows: "auto" },
      stubGrid: undefined,
      selector: { boolean: {} },
      label: "Large",
      configGrid: { columns: 12, rows: 3 },
      large: true,
      height: 146,
      calls: 0,
    });
  });
test("top-level var_large wins over legacy alias and non-boolean flags are rejected", async ({
  page,
}) => {
  await setup(page, "kiosk-entity-card", { variables: { var_large: true } });
  expect(
    await page
      .locator('[part="surface"]')
      .evaluate((e) => e.getBoundingClientRect().height),
  ).toBe(146);
  await page.evaluate(() => {
    const w = window as any;
    w.card.setConfig({ ...w.card.config, var_large: false });
  });
  expect(
    await page
      .locator('[part="surface"]')
      .evaluate((e) => e.getBoundingClientRect().height),
  ).toBe(69);
  const rejected = await page.evaluate(() => {
    const w = window as any;
    try {
      w.card.setConfig({ ...w.card.config, var_large: "true" });
      return false;
    } catch {
      return true;
    }
  });
  expect(rejected).toBe(true);
});
