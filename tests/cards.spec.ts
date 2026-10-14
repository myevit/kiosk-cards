import { test, expect } from "@playwright/test";
async function mount(page: any, config: any, state = "off") {
  await page.goto("/tests/harness.html");
  await page.waitForFunction(() => (window as any).ready);
  return page.evaluate(
    ({ config, state }: any) => {
      const w = window as any;
      w.calls = [];
      w.events = [];
      w.hass = {
        states: {
          [config.entity]: {
            entity_id: config.entity,
            state,
            attributes: {
              friendly_name: "Synthetic lamp",
              brightness: state === "on" ? 127 : 0,
            },
          },
        },
        entities: {},
        devices: {},
        areas: {},
        locale: { language: "en" },
        formatEntityState: (s: any) => s.state,
        callService: async (...args: any[]) => {
          w.calls.push(args);
          return {};
        },
        localize: (k: string) => k.split(".").at(-1),
      };
      if (!customElements.get(config.type.replace("custom:", ""))) return false;
      w.card = document.createElement(config.type.replace("custom:", ""));
      w.card.setConfig(config);
      w.card.hass = w.hass;
      document.querySelector("#mount")!.append(w.card);
      return true;
    },
    { config, state },
  );
}
test("entity renders standard OFF geometry and distinct ON presentation", async ({
  page,
}) => {
  expect(
    await mount(page, {
      type: "custom:kiosk-entity-card",
      entity: "light.example",
    }),
  ).toBe(true);
  await expect(page.locator('[part="title"]')).toHaveText("Synthetic lamp");
  const off = await page
    .locator('[part="surface"]')
    .evaluate((e) => ({
      height: e.getBoundingClientRect().height,
      bg: getComputedStyle(e).backgroundColor,
    }));
  expect(off).toEqual({ height: 69, bg: "rgba(0, 0, 0, 0.3)" });
  expect(
    await page
      .locator('[part="icon-circle"]')
      .evaluate((e) => e.getBoundingClientRect().width),
  ).toBe(45);
  await page.evaluate(() => {
    const w = window as any;
    w.card.hass = {
      ...w.hass,
      states: {
        "light.example": {
          ...w.hass.states["light.example"],
          state: "on",
          attributes: { friendly_name: "Synthetic lamp", brightness: 127 },
        },
      },
    };
  });
  await expect(page.locator('[part="detail"]')).toHaveText("50%");
  expect(
    await page
      .locator('[part="surface"]')
      .evaluate((e) => getComputedStyle(e).backgroundColor),
  ).toBe("rgb(255, 255, 255)");
  expect(
    await page
      .locator('[part="icon-circle"]')
      .evaluate((e) => getComputedStyle(e).backgroundColor),
  ).toBe("rgb(255, 165, 0)");
});
test("quick icon sends one safe domain call, body opens more-info, incoming state confirms", async ({
  page,
}) => {
  await mount(page, {
    type: "custom:kiosk-entity-card",
    entity: "light.example",
  });
  await page.evaluate(() => {
    const w = window as any;
    document.addEventListener("hass-more-info", (e: any) =>
      w.events.push(e.detail),
    );
  });
  await page.locator('[part="body-target"]').click();
  expect(await page.evaluate(() => (window as any).events)).toEqual([
    { entityId: "light.example" },
  ]);
  await page.locator("ha-state-icon").click();
  expect(await page.evaluate(() => (window as any).calls)).toEqual([
    ["light", "turn_on", { entity_id: "light.example" }, undefined],
  ]);
  await expect(page.locator('[part="feedback"]')).toHaveText("Saving…");
  await page.evaluate(() => {
    const w = window as any;
    w.card.hass = {
      ...w.hass,
      states: {
        "light.example": { ...w.hass.states["light.example"], state: "on" },
      },
    };
  });
  await expect(page.locator('[part="feedback"]')).toHaveCount(0);
});
