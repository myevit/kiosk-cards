import { test, expect } from "@playwright/test";
async function setup(page: any, action: any = { action: "more-info" }) {
  await page.goto("/tests/harness.html");
  await page.waitForFunction(() => (window as any).ready);
  await page.evaluate((action) => {
    const w = window as any;
    w.calls = [];
    w.events = [];
    w.dialogs = [];
    w.parentClicks = 0;
    w.hass = {
      states: {
        "switch.example": {
          entity_id: "switch.example",
          state: "off",
          attributes: { friendly_name: "Example status" },
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
    document.addEventListener("show-dialog", (e: any) =>
      w.dialogs.push(e.detail),
    );
    document.body.addEventListener("click", () => w.parentClicks++);
    w.card = document.createElement("kiosk-pill-card");
    w.card.setConfig({
      type: "custom:kiosk-pill-card",
      entity: "switch.example",
      icon_tap_action: action,
    });
    w.card.hass = w.hass;
    document.querySelector("#mount")!.append(w.card);
  }, action);
}
test("pill keyboard and padding taps stay isolated and open one more-info each", async ({
  page,
}) => {
  await setup(page);
  await page.locator('[part="body-target"]').focus();
  await page.keyboard.press("Enter");
  await page.locator('[part="surface"]').click({ position: { x: 2, y: 17 } });
  expect(await page.evaluate(() => (window as any).events.length)).toBe(2);
  expect(await page.evaluate(() => (window as any).calls.length)).toBe(0);
  expect(await page.evaluate(() => (window as any).parentClicks)).toBe(0);
});
test("explicit pill safe quick action sends one idempotent domain request and awaits incoming state", async ({
  page,
}) => {
  await setup(page, { action: "toggle" });
  await page.locator('[part="icon-target"]').click();
  expect(await page.evaluate(() => (window as any).calls)).toEqual([
    ["switch", "turn_on", { entity_id: "switch.example" }, undefined],
  ]);
  await expect(page.locator('[part="icon-target"]')).toBeDisabled();
  await expect(page.locator('[part="detail"]')).toHaveText("Off");
  await page.evaluate(() => {
    const w = window as any;
    w.card.hass = {
      ...w.hass,
      states: {
        "switch.example": { ...w.hass.states["switch.example"], state: "on" },
      },
    };
  });
  await expect(page.locator('[part="detail"]')).toHaveText("On");
  await expect(page.locator('[part="icon-target"]')).toBeEnabled();
  expect(
    await page
      .locator('[part="surface"]')
      .evaluate((e) => getComputedStyle(e).backgroundColor),
  ).toBe("rgba(255, 255, 255, 0.9)");
});
test("pill explicit confirmation cancel is inert and confirm reserves exactly one mock command", async ({
  page,
}) => {
  await setup(page, {
    action: "toggle",
    confirmation: { text: "Enable the synthetic switch?" },
  });
  await page.locator('[part="icon-target"]').click();
  await page.evaluate(() => (window as any).dialogs[0].dialogParams.cancel());
  expect(await page.evaluate(() => (window as any).calls.length)).toBe(0);
  await page.locator('[part="icon-target"]').click();
  await page.evaluate(() => (window as any).dialogs[1].dialogParams.confirm());
  await expect
    .poll(() => page.evaluate(() => (window as any).calls.length))
    .toBe(1);
});
