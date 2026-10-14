import { test, expect } from "@playwright/test";
async function setup(page: any, config: any, state = "off") {
  await page.goto("/tests/harness.html");
  await page.waitForFunction(() => (window as any).ready);
  return page.evaluate(
    ({ config, state }: any) => {
      const w = window as any;
      w.calls = [];
      w.events = [];
      w.dialogs = [];
      w.hass = {
        states: {
          [config.entity]: {
            entity_id: config.entity,
            state,
            attributes: { friendly_name: "Example action" },
          },
        },
        user: { id: "example" },
        callService: async (...a: any[]) => {
          w.calls.push(a);
          return {};
        },
      };
      document.addEventListener("hass-more-info", (e: any) =>
        w.events.push(e.detail),
      );
      document.addEventListener("show-dialog", (e: any) =>
        w.dialogs.push(e.detail),
      );
      document.addEventListener("hass-action", (e: any) =>
        w.events.push(e.detail),
      );
      const tag = config.type.replace("custom:", "");
      if (!customElements.get(tag)) return false;
      w.card = document.createElement(tag);
      w.card.setConfig(config);
      w.card.hass = w.hass;
      document.querySelector("#mount")!.append(w.card);
      return true;
    },
    { config, state },
  );
}
test("action card is momentary, requires explicit action and uses native confirmation host", async ({
  page,
}) => {
  expect(
    await setup(page, {
      type: "custom:kiosk-action-card",
      entity: "script.example",
      tap_action: {
        action: "perform-action",
        perform_action: "script.turn_on",
        target: { entity_id: "script.example" },
        confirmation: { text: "Run example?" },
      },
    }),
  ).toBe(true);
  expect(
    await page
      .locator('[part="surface"]')
      .evaluate((e) => e.getBoundingClientRect().height),
  ).toBe(68);
  await expect(page.locator('[part="detail"]')).toHaveCount(0);
  await page.locator('[part="body-target"]').click();
  expect(await page.evaluate(() => (window as any).calls.length)).toBe(0);
  expect(await page.evaluate(() => (window as any).dialogs.length)).toBe(1);
  await page.evaluate(() => (window as any).dialogs[0].dialogParams.cancel());
  expect(await page.evaluate(() => (window as any).calls.length)).toBe(0);
  await page.locator('[part="body-target"]').click();
  await page.evaluate(() => (window as any).dialogs[1].dialogParams.confirm());
  await expect
    .poll(() => page.evaluate(() => (window as any).calls))
    .toEqual([
      ["script", "turn_on", undefined, { entity_id: "script.example" }],
    ]);
});
for (const domain of [
  "lock",
  "cover",
  "alarm_control_panel",
  "script",
  "button",
  "scene",
])
  test(`${domain} never receives implicit quick actuation`, async ({
    page,
  }) => {
    await setup(
      page,
      { type: "custom:kiosk-entity-card", entity: domain + ".example" },
      domain === "lock" ? "locked" : "off",
    );
    await page.locator('[part="icon-target"]').click();
    expect(await page.evaluate(() => (window as any).calls.length)).toBe(0);
    expect(await page.evaluate(() => (window as any).events)).toEqual([
      { entityId: domain + ".example" },
    ]);
  });
for (const state of ["unknown", "unavailable"])
  test(`${state} command controls fail closed`, async ({ page }) => {
    await setup(
      page,
      {
        type: "custom:kiosk-entity-card",
        entity: "light.example",
        tap_action: { action: "toggle" },
      },
      state,
    );
    // Default unavailable icon is diagnostics-only; explicit body toggle stays blocked.
    await expect(page.locator('[part="icon-target"]')).toBeEnabled();
    await page.locator('[part="icon-target"]').click();
    await expect(page.locator('[part="body-target"]')).toBeDisabled();
    expect(await page.evaluate(() => (window as any).calls.length)).toBe(0);
    await expect(page.locator('[part="detail"]')).toHaveText(
      state === "unknown" ? "Unknown" : "Unavailable",
    );
  });
test("pending locks duplicate taps, timeout has no retry and late ACK cannot clear new operation", async ({
  page,
}) => {
  await page.clock.install();
  await setup(page, {
    type: "custom:kiosk-entity-card",
    entity: "light.example",
  });
  await page.evaluate(() => {
    const w = window as any;
    w.resolvers = [];
    w.card.hass.callService = (...a: any[]) => {
      w.calls.push(a);
      return new Promise((resolve) => w.resolvers.push(resolve));
    };
  });
  await page.locator('[part="icon-target"]').click();
  await expect(page.locator('[part="icon-target"]')).toBeDisabled();
  await page.clock.runFor(12001);
  await expect(page.locator('[part="feedback"]')).toContainText(
    "No confirmation",
  );
  expect(await page.evaluate(() => (window as any).calls.length)).toBe(1);
  await page.locator('[part="icon-target"]').click();
  await page.evaluate(() => (window as any).resolvers[0]({}));
  await expect(page.locator('[part="feedback"]')).toHaveCount(0);
  await expect(page.locator('[part="surface"]')).toHaveAttribute("aria-busy", "true");
  expect(await page.evaluate(() => (window as any).calls.length)).toBe(2);
});
test("service failure surfaces local feedback without inventing ON state", async ({
  page,
}) => {
  await setup(page, {
    type: "custom:kiosk-entity-card",
    entity: "light.example",
  });
  await page.evaluate(() => {
    (window as any).hass.callService = async () => {
      throw Error("mock failure");
    };
  });
  await page.locator('[part="icon-target"]').click();
  await expect(page.locator('[part="feedback"]')).toContainText(
    "Action failed",
  );
  expect(
    await page
      .locator('[part="surface"]')
      .evaluate((e) => e.classList.contains("active")),
  ).toBe(false);
});
