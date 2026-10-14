import { test, expect } from "@playwright/test";
async function setup(page: any, config: any = {}, state = "off") {
  await page.goto("/tests/harness.html");
  await page.waitForFunction(() => (window as any).ready);
  return page.evaluate(
    ({ config, state }: any) => {
      const w = window as any;
      w.calls = [];
      w.events = [];
      w.hass = {
        states: {
          "switch.example": {
            entity_id: "switch.example",
            state,
            attributes: {
              friendly_name: "Example status",
              icon: "mdi:air-filter",
            },
          },
          "lock.example": {
            entity_id: "lock.example",
            state: "unlocked",
            attributes: { friendly_name: "Example lock" },
          },
        },
        callService: async (...a: any[]) => {
          w.calls.push(a);
          return {};
        },
      };
      document.addEventListener("hass-more-info", (e: any) =>
        w.events.push(e.detail),
      );
      if (!customElements.get("kiosk-pill-card")) return false;
      w.card = document.createElement("kiosk-pill-card");
      w.card.setConfig({
        type: "custom:kiosk-pill-card",
        entity: "switch.example",
        ...config,
      });
      w.card.hass = w.hass;
      document.querySelector("#mount")!.append(w.card);
      return true;
    },
    { config, state },
  );
}
for (const width of [320, 640])
  for (const state of ["off", "on", "unknown", "unavailable"])
    test(`compact pill ${state} ${width}px matches extracted typography and neutral state style`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 600 });
      expect(await setup(page, {}, state)).toBe(true);
      const value = await page.evaluate(() => {
        const c = (window as any).card,
          r = c.shadowRoot,
          s = r.querySelector('[part="surface"]'),
          i = r.querySelector('[part="icon-circle"]'),
          n = r.querySelector('[part="title"]'),
          d = r.querySelector('[part="detail"]'),
          sr = s.getBoundingClientRect();
        return {
          height: sr.height,
          width: sr.width,
          padding: getComputedStyle(s).padding,
          radius: getComputedStyle(s).borderRadius,
          background: getComputedStyle(s).backgroundColor,
          icon: {
            width: i.getBoundingClientRect().width,
            height: i.getBoundingClientRect().height,
            x: i.getBoundingClientRect().x - sr.x,
            y: i.getBoundingClientRect().y - sr.y,
          },
          name: {
            size: getComputedStyle(n).fontSize,
            weight: getComputedStyle(n).fontWeight,
            color: getComputedStyle(n).color,
            x: n.getBoundingClientRect().x - sr.x,
            y: n.getBoundingClientRect().y - sr.y,
          },
          state: {
            size: getComputedStyle(d).fontSize,
            weight: getComputedStyle(d).fontWeight,
            color: getComputedStyle(d).color,
            x: d.getBoundingClientRect().x - sr.x,
            y: d.getBoundingClientRect().y - sr.y,
          },
          grid: c.getGridOptions(),
          overflow: s.scrollWidth > s.clientWidth,
        };
      });
      expect(value.width).toBeGreaterThanOrEqual(140);
      expect(value.width).toBeLessThanOrEqual(180);
      expect(value).toEqual({
        height: 35,
        width: value.width,
        padding: "4px 12px",
        radius: "18px",
        background: "rgba(255, 255, 255, 0.9)",
        icon: { width: 24, height: 24, x: 12, y: 5.5 },
        name: {
          size: "10px",
          weight: "400",
          color: "rgba(0, 0, 0, 0.7)",
          x: 44,
          y: 4,
        },
        state: {
          size: "14px",
          weight: "800",
          color: "rgba(0, 0, 0, 0.9)",
          x: 44,
          y: 15,
        },
        grid: { columns: 6, rows: "auto" },
        overflow: false,
      });
      await page.locator('[part="body-target"]').click();
      expect(await page.evaluate(() => (window as any).calls.length)).toBe(0);
      expect(await page.evaluate(() => (window as any).events)).toEqual([
        { entityId: "switch.example" },
      ]);
    });
for (const config of [
  { show_name: false },
  { show_state: false },
  { show_icon: false },
  { show_name: false, show_state: false },
])
  test(`pill optional fields ${JSON.stringify(config)}`, async ({ page }) => {
    await setup(page, config);
    await expect(page.locator('[part="title"]')).toHaveCount(
      config.show_name === false ? 0 : 1,
    );
    await expect(page.locator('[part="detail"]')).toHaveCount(
      config.show_state === false ? 0 : 1,
    );
    await expect(page.locator('[part="icon-circle"]')).toHaveCount(
      config.show_icon === false ? 0 : 1,
    );
    expect(
      await page
        .locator('[part="surface"]')
        .evaluate((e) => e.getBoundingClientRect().height),
    ).toBe(config.show_name === false || config.show_state === false ? 32 : 35);
  });
test("pill controls default to more-info even for switches/locks; explicit safe action only and unavailable fails closed", async ({
  page,
}) => {
  await setup(page, { entity: "lock.example" });
  await page.locator('[part="icon-target"]').click();
  expect(await page.evaluate(() => (window as any).calls.length)).toBe(0);
  expect(await page.evaluate(() => (window as any).events)).toEqual([
    { entityId: "lock.example" },
  ]);
  await setup(page, { icon_tap_action: { action: "toggle" } }, "unavailable");
  await expect(page.locator('[part="icon-target"]')).toBeDisabled();
  await page.locator('[part="body-target"]').click();
  expect(await page.evaluate(() => (window as any).calls.length)).toBe(0);
});
test("pill native editor has field switches, no invented Large mode, preserves explicit grid and sends no services", async ({
  page,
}) => {
  await setup(page, { grid_options: { columns: 12, rows: "auto" } });
  const value = await page.evaluate(async () => {
    const w = window as any,
      e = await w.card.constructor.getConfigElement();
    e.setConfig(w.card.config);
    e.hass = w.hass;
    document.querySelector("#mount")!.append(e);
    await e.updateComplete;
    const f = e.shadowRoot.querySelector("ha-form");
    let changed: any;
    e.addEventListener(
      "config-changed",
      (ev: any) => (changed = ev.detail.config),
    );
    f.dispatchEvent(
      new CustomEvent("value-changed", {
        detail: { value: { ...f.data, show_name: false, show_state: true } },
      }),
    );
    w.card.setConfig(changed);
    await w.card.updateComplete;
    return {
      fields: f.schema
        .filter((s: any) => s.selector?.boolean)
        .map((s: any) => s.name),
      large: f.schema.some((s: any) => s.name === "var_large"),
      changed,
      cardCatalog: (window as any).customCards.some(
        (c: any) => c.type === "kiosk-pill-card",
      ),
      badgeCatalog: (window as any).customBadges.some(
        (c: any) => c.type === "kiosk-pill-card",
      ),
      calls: w.calls.length,
    };
  });
  expect(value.fields).toEqual(["show_name", "show_state", "show_icon"]);
  expect(value.large).toBe(false);
  expect(value.changed.grid_options).toEqual({ columns: 12, rows: "auto" });
  expect(value.changed.show_name).toBe(false);
  expect(value.cardCatalog && value.badgeCatalog).toBe(true);
  expect(value.calls).toBe(0);
});
test("pill state labels update from hass, long text stays compact and unsupported Large is rejected", async ({
  page,
}) => {
  await setup(page, {
    name: "A deliberately long synthetic status label",
    state_labels: {
      off: "Off",
      on: "Enabled",
      unknown: "Offline",
      unavailable: "Offline",
    },
    appearance: { background: "rgba(255,193,7,0.92)" },
  });
  expect(
    await page
      .locator('[part="surface"]')
      .evaluate((e) => e.getBoundingClientRect().width),
  ).toBeLessThanOrEqual(180);
  await expect(page.locator('[part="detail"]')).toHaveText("Off");
  await page.evaluate(() => {
    const w = window as any;
    w.card.hass = {
      ...w.hass,
      states: {
        "switch.example": {
          ...w.hass.states["switch.example"],
          state: "unavailable",
        },
      },
    };
  });
  await expect(page.locator('[part="detail"]')).toHaveText("Offline");
  expect(
    await page.evaluate(() => {
      const w = window as any;
      try {
        w.card.setConfig({ ...w.card.config, var_large: true });
        return false;
      } catch {
        return true;
      }
    }),
  ).toBe(true);
});
