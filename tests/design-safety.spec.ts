import { test, expect } from "@playwright/test";
async function mount(
  page: any,
  tag = "kiosk-entity-card",
  config: any = { entity: "light.example" },
  state = "off",
) {
  await page.goto("/tests/harness.html");
  await page.waitForFunction(() => (window as any).ready);
  await page.evaluate(
    ({ tag, config, state }: any) => {
      const w = window as any;
      w.calls = [];
      w.events = [];
      w.hass = {
        states: {
          [config.entity]: {
            entity_id: config.entity,
            state,
            attributes: {
              friendly_name: "A synthetic long title for narrow screens",
            },
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
      w.card = document.createElement(tag);
      w.card.setConfig({ type: "custom:" + tag, ...config });
      w.card.hass = w.hass;
      document.querySelector("#mount")!.append(w.card);
    },
    { tag, config, state },
  );
}
for (const width of [320, 640])
  test(`${width}px shared design geometry, touch targets, overflow and auto grid height`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 600 });
    await mount(page);
    await page.locator("#mount").evaluate((e, w) => {
      (e as HTMLElement).style.width = w + "px";
    }, width);
    const values = await page.evaluate(() => {
      const c = (window as any).card;
      const r = c.shadowRoot;
      const surface = r.querySelector('[part="surface"]'),
        circle = r.querySelector('[part="icon-circle"]'),
        body = r.querySelector('[part="body-target"]'),
        icon = r.querySelector('[part="icon-target"]');
      return {
        height: surface.getBoundingClientRect().height,
        width: surface.getBoundingClientRect().width,
        bodyHeight: body.getBoundingClientRect().height,
        iconHeight: icon.getBoundingClientRect().height,
        circleWidth: circle.getBoundingClientRect().width,
        grid: c.getGridOptions(),
        overflow: surface.scrollWidth > surface.clientWidth,
      };
    });
    expect(values).toEqual({
      height: 69,
      width,
      bodyHeight: 69,
      iconHeight: 69,
      circleWidth: 45,
      grid: { columns: 6, min_columns: 3, min_rows: 1 },
      overflow: false,
    });
  });
test("category defaults remain teal independently of primary-color; optional appearance overrides work", async ({
  page,
}) => {
  await mount(page, "kiosk-action-card", {
    name: "Example action",
    appearance: { radius: "20px", active_background: "#eee" },
  });
  await page
    .locator("#mount")
    .evaluate((e) =>
      (e as HTMLElement).style.setProperty("--primary-color", "red"),
    );
  expect(
    await page
      .locator('[part="icon-circle"]')
      .evaluate((e) => getComputedStyle(e).backgroundColor),
  ).toBe("rgb(59, 200, 206)");
  expect(
    await page
      .locator('[part="surface"]')
      .evaluate((e) => getComputedStyle(e).backgroundColor),
  ).toBe("rgb(238, 238, 238)");
  expect(
    await page
      .locator('[part="surface"]')
      .evaluate((e) => getComputedStyle(e).borderRadius),
  ).toBe("20px");
});
test("keyboard body target opens more-info once without quick actuation", async ({
  page,
}) => {
  await mount(page);
  await page.locator('[part="body-target"]').focus();
  await page.keyboard.press("Enter");
  expect(await page.evaluate(() => (window as any).events)).toEqual([
    { entityId: "light.example" },
  ]);
  expect(await page.evaluate(() => (window as any).calls.length)).toBe(0);
});
for (const domain of ["light", "switch", "input_boolean", "fan"])
  test(`${domain} safe toggle uses its own domain and explicit next state`, async ({
    page,
  }) => {
    await mount(
      page,
      "kiosk-entity-card",
      { entity: domain + ".example" },
      "on",
    );
    await page.locator('[part="icon-target"]').click();
    expect(await page.evaluate(() => (window as any).calls)).toEqual([
      [domain, "turn_off", { entity_id: domain + ".example" }, undefined],
    ]);
  });
test("missing room sensors and every unknown light are unavailable, never confirmed off", async ({
  page,
}) => {
  await mount(page, "kiosk-room-card", {
    name: "Example room",
    temperature_entity: "sensor.missing",
    occupancy_entity: "binary_sensor.missing",
    light_entities: ["light.missing"],
  });
  await expect(page.locator('[part="detail"]')).toHaveText(
    "Temperature unavailable · Occupancy unavailable · 1 unavailable",
  );
});
test("climate summary preserves target-range semantics rather than a bare HVAC mode", async ({
  page,
}) => {
  await mount(
    page,
    "kiosk-entity-card",
    { entity: "climate.example" },
    "heat_cool",
  );
  await page.evaluate(() => {
    const w = window as any;
    w.card.hass = {
      ...w.hass,
      states: {
        "climate.example": {
          entity_id: "climate.example",
          state: "heat_cool",
          attributes: { target_temp_low: 18, target_temp_high: 23 },
        },
      },
    };
  });
  await expect(page.locator('[part="detail"]')).toHaveText("18°–23°");
});
