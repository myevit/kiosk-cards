import { test, expect } from "@playwright/test";
for (const kind of ["entity", "action", "room", "pill"]) {
  for (const large of kind === "pill" ? [false] : [false, true]) {
    test(`${kind} ${large ? "large" : "standard"} pending has no status text or geometry change`, async ({ page }) => {
      await page.goto("/tests/harness.html");
      await page.waitForFunction(() => (window as any).ready);
      await page.evaluate(({ kind, large }) => {
        const w = window as any;
        w.calls = [];
        w.card = document.createElement(`kiosk-${kind}-card`);
        w.card.setConfig({ type: `custom:kiosk-${kind}-card`, entity: kind === "action" ? "script.example" : "light.example", name: "Synthetic control", var_large: large, light_entities: ["light.example"], tap_action: { action: "perform-action", perform_action: "script.turn_on", target: { entity_id: "script.example" } } });
        w.card.hass = { states: { "light.example": { entity_id: "light.example", state: "off", attributes: {} }, "script.example": { entity_id: "script.example", state: "off", attributes: {} } }, callService: (...a: any[]) => { w.calls.push(a); return new Promise(resolve => w.resolve = resolve); } };
        document.querySelector("#mount")!.append(w.card);
      }, { kind, large });
      const surface = page.locator('[part="surface"]');
      const before = await surface.boundingBox();
      const text = await surface.innerText();
      if (kind === "room") await page.evaluate(() => { (window as any).card.busy = true; });
      else await page.locator('[part="body-target"]').click();
      await expect(surface).toHaveAttribute("aria-busy", "true");
      await expect(page.locator('[part="feedback"]')).toHaveCount(0);
      expect(await surface.innerText()).toBe(text);
      expect(await surface.boundingBox()).toEqual(before);
      await expect(page.locator('[part="body-target"]')).toBeDisabled();
      await page.evaluate(() => { const w = window as any; for (let i = 0; i < 12; i++) w.card.shadowRoot.querySelector('[part="body-target"]').click(); });
      expect(await page.evaluate(() => (window as any).calls.length)).toBe(kind === "room" ? 0 : 1);
      await page.evaluate(() => { const w = window as any; if (w.resolve) w.resolve({}); else w.card.busy = false; });
      await expect(surface).toHaveAttribute("aria-busy", "false");
      await expect(page.locator('[part="feedback"]')).toHaveCount(0);
      expect(await surface.innerText()).toBe(text);
      expect(await surface.boundingBox()).toEqual(before);
    });
  }
}
