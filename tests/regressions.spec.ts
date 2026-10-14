import { test, expect } from "@playwright/test";
async function setup(page: any, config: any) {
  await page.goto("/tests/harness.html");
  await page.waitForFunction(() => (window as any).ready);
  await page.evaluate((config) => {
    const w = window as any;
    w.calls = [];
    w.events = [];
    w.dialogs = [];
    w.resolvers = [];
    w.hass = {
      states: {
        "light.example": {
          entity_id: "light.example",
          state: "off",
          attributes: {},
        },
        "light.other": {
          entity_id: "light.other",
          state: "off",
          attributes: {},
        },
      },
      user: { id: "example" },
      callService: (...args: any[]) => {
        w.calls.push(args);
        return new Promise((resolve) => w.resolvers.push(resolve));
      },
    };
    for (const name of ["hass-action", "show-dialog"])
      document.addEventListener(name, (e: any) =>
        (name === "show-dialog" ? w.dialogs : w.events).push(e.detail),
      );
    w.card = document.createElement("kiosk-entity-card");
    w.card.setConfig({
      type: "custom:kiosk-entity-card",
      entity: "light.example",
      ...config,
    });
    w.card.hass = w.hass;
    document.querySelector("#mount")!.append(w.card);
  }, config);
}
test("navigation confirmation is not delegated twice to HA action handler", async ({
  page,
}) => {
  await setup(page, {
    tap_action: {
      action: "navigate",
      navigation_path: "/lovelace/example",
      confirmation: true,
    },
  });
  await page.locator('[part="body-target"]').click();
  await page.evaluate(() => (window as any).dialogs[0].dialogParams.confirm());
  await expect
    .poll(() => page.evaluate(() => (window as any).events.length))
    .toBe(1);
  expect(
    await page.evaluate(() => (window as any).events[0].config.tap_action),
  ).toEqual({ action: "navigate", navigation_path: "/lovelace/example" });
  expect(await page.evaluate(() => (window as any).calls.length)).toBe(0);
});
test("reconfiguration isolates an in-flight command from the next entity", async ({
  page,
}) => {
  await setup(page, {});
  await page.locator('[part="icon-target"]').click();
  await page.evaluate(() => {
    const w = window as any;
    w.card.setConfig({
      type: "custom:kiosk-entity-card",
      entity: "light.other",
    });
  });
  await page.locator('[part="icon-target"]').click();
  await page.evaluate(() => (window as any).resolvers[0]({}));
  await expect(page.locator('[part="feedback"]')).toHaveText("Saving…");
  expect(
    await page.evaluate(() =>
      (window as any).calls.map((a: any[]) => a[2].entity_id),
    ),
  ).toEqual(["light.example", "light.other"]);
});
test("confirmation after a configuration change sends no stale command", async ({
  page,
}) => {
  await setup(page, {
    icon_tap_action: { action: "toggle", confirmation: true },
  });
  await page.locator('[part="icon-target"]').click();
  await page.evaluate(() => {
    const w = window as any;
    w.card.setConfig({
      type: "custom:kiosk-entity-card",
      entity: "light.other",
    });
    w.dialogs[0].dialogParams.confirm();
  });
  await page.waitForTimeout(50);
  expect(await page.evaluate(() => (window as any).calls.length)).toBe(0);
});
