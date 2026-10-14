import { test, expect } from "@playwright/test";
async function mount(page: any, type: string, config: any, states: any = {}) {
  await page.goto("/tests/harness.html");
  await page.waitForFunction(() => (window as any).ready);
  return page.evaluate(
    ({ type, config, states }: any) => {
      const w = window as any;
      w.calls = [];
      w.events = [];
      w.hass = {
        states,
        areas: { example: { name: "Example room", icon: "mdi:sofa" } },
        entities: {
          "light.example": { area_id: "example" },
          "light.unknown": { device_id: "example-device" },
        },
        devices: { "example-device": { area_id: "example" } },
        callService: async (...a: any[]) => w.calls.push(a),
      };
      document.addEventListener("hass-action", (e: any) =>
        w.events.push(e.detail),
      );
      const tag = type.replace("custom:", "");
      if (!customElements.get(tag)) return false;
      w.card = document.createElement(tag);
      w.card.setConfig({ type, ...config });
      w.card.hass = w.hass;
      document.querySelector("#mount")!.append(w.card);
      return true;
    },
    { type, config, states },
  );
}
test("room explicit sensors, state summary and navigation never toggle an area", async ({
  page,
}) => {
  expect(
    await mount(
      page,
      "custom:kiosk-room-card",
      {
        name: "Example room",
        navigation_path: "/lovelace/example",
        temperature_entity: "sensor.example_temperature",
        occupancy_entity: "binary_sensor.example_presence",
        light_entities: ["light.example", "light.unknown"],
      },
      {
        "sensor.example_temperature": {
          entity_id: "sensor.example_temperature",
          state: "21.5",
          attributes: { unit_of_measurement: "°C" },
        },
        "binary_sensor.example_presence": {
          entity_id: "binary_sensor.example_presence",
          state: "on",
          attributes: {},
        },
        "light.example": {
          entity_id: "light.example",
          state: "on",
          attributes: {},
        },
        "light.unknown": {
          entity_id: "light.unknown",
          state: "unavailable",
          attributes: {},
        },
      },
    ),
  ).toBe(true);
  await expect(page.locator('[part="detail"]')).toHaveText(
    "21.5 °C · Occupied · 1 light on · 1 unavailable",
  );
  await page.locator('[part="body-target"]').click();
  expect(await page.evaluate(() => (window as any).calls.length)).toBe(0);
  expect(
    await page.evaluate(() => (window as any).events[0].config.tap_action),
  ).toEqual({ action: "navigate", navigation_path: "/lovelace/example" });
});
test("room area discovery respects entity override then device area and ignores hidden entities", async ({
  page,
}) => {
  await mount(
    page,
    "custom:kiosk-room-card",
    { area: "example", navigation_path: "/lovelace/example" },
    {
      "light.example": {
        entity_id: "light.example",
        state: "on",
        attributes: {},
      },
      "light.unknown": {
        entity_id: "light.unknown",
        state: "off",
        attributes: {},
      },
    },
  );
  await expect(page.locator('[part="title"]')).toHaveText("Example room");
  await expect(page.locator('[part="detail"]')).toHaveText("1 light on");
  await page.evaluate(() => {
    const w = window as any;
    w.card.hass = {
      ...w.hass,
      entities: {
        ...w.hass.entities,
        "light.example": { area_id: "other" },
        "light.unknown": { area_id: "example", hidden: true },
      },
    };
  });
  await expect(page.locator('[part="detail"]')).toHaveCount(0);
});
test("visual editor exposes native selectors, preserves unknown HA grid fields and emits only config changes", async ({
  page,
}) => {
  await mount(
    page,
    "custom:kiosk-entity-card",
    {
      entity: "light.example",
      grid_options: { columns: 6 },
      visibility: [{ condition: "screen", media_query: "(min-width: 1px)" }],
    },
    {
      "light.example": {
        entity_id: "light.example",
        state: "off",
        attributes: {},
      },
    },
  );
  expect(
    await page.evaluate(async () => {
      const w = window as any;
      const editor = await w.card.constructor.getConfigElement();
      editor.setConfig(w.card.config);
      editor.hass = w.hass;
      w.editor = editor;
      w.configs = [];
      editor.addEventListener("config-changed", (e: any) =>
        w.configs.push(e.detail.config),
      );
      document.querySelector("#mount")!.replaceChildren(editor);
      await editor.updateComplete;
      return !!editor.shadowRoot.querySelector("ha-form");
    }),
  ).toBe(true);
  const config = await page.evaluate(() => {
    const w = window as any;
    const form = w.editor.shadowRoot.querySelector("ha-form");
    form.dispatchEvent(
      new CustomEvent("value-changed", {
        detail: {
          value: {
            ...form.data,
            name: "New example",
            appearance: { icon_color: "teal" },
          },
        },
      }),
    );
    return w.configs[0];
  });
  expect(config.name).toBe("New example");
  expect(config.grid_options).toEqual({ columns: 6 });
  expect(config.visibility.length).toBe(1);
  expect(await page.evaluate(() => (window as any).calls.length)).toBe(0);
});
test("hold gesture performs only configured more-info and double tap does not also fire tap", async ({
  page,
}) => {
  await mount(
    page,
    "custom:kiosk-entity-card",
    {
      entity: "light.example",
      tap_action: { action: "navigate", navigation_path: "/tap" },
      double_tap_action: { action: "navigate", navigation_path: "/double" },
      hold_action: { action: "navigate", navigation_path: "/hold" },
    },
    {
      "light.example": {
        entity_id: "light.example",
        state: "off",
        attributes: {},
      },
    },
  );
  const target = page.locator('[part="body-target"]');
  await target.dblclick();
  await page.waitForTimeout(350);
  expect(
    await page.evaluate(() =>
      (window as any).events.map(
        (e: any) => e.config.tap_action.navigation_path,
      ),
    ),
  ).toEqual(["/double"]);
  await target.hover();
  await page.mouse.down();
  await page.waitForTimeout(550);
  await page.mouse.up();
  await page.waitForTimeout(350);
  expect(
    await page.evaluate(() =>
      (window as any).events.map(
        (e: any) => e.config.tap_action.navigation_path,
      ),
    ),
  ).toEqual(["/double", "/hold"]);
  expect(await page.evaluate(() => (window as any).calls.length)).toBe(0);
});
