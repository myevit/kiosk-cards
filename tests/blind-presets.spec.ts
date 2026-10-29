import { test, expect } from "@playwright/test";
const config = {
  type: "custom:kiosk-blind-presets-card",
  rows: 1,
  columns: 3,
  blinds: [
    { entity: "cover.example_left", width: 1 },
    { entity: "cover.example_middle", width: 2 },
    { entity: "cover.example_right", width: 1 },
  ],
  presets: [
    {
      id: "open",
      name: "Open",
      positions: [
        { top: 0, bottom: 0 },
        { top: 0, bottom: 0 },
        { top: 0, bottom: 0 },
      ],
    },
    {
      id: "closed",
      name: "Closed",
      positions: [
        { top: 0, bottom: 100 },
        { top: 0, bottom: 100 },
        { top: 0, bottom: 100 },
      ],
    },
    {
      id: "bottom",
      name: "Bottom",
      positions: [
        { top: 100, bottom: 100 },
        { top: 100, bottom: 100 },
        { top: 100, bottom: 100 },
      ],
    },
  ],
};
async function mount(
  page: any,
  cfg: any = config,
  attributes: any = {
    current_position: 0,
    current_tilt_position: 0,
    supported_features: 135,
  },
) {
  await page.goto("/tests/harness.html");
  await page.waitForFunction(() => (window as any).ready);
  return page.evaluate(
    ({ cfg, attributes }: any) => {
      const w = window as any;
      w.calls = [];
      w.configs = [];
      w.card = document.createElement("kiosk-blind-presets-card");
      if (!w.card.setConfig) return false;
      w.card.setConfig(cfg);
      w.hass = {
        states: Object.fromEntries(
          cfg.blinds.map((b: any) => [
            b.entity,
            {
              entity_id: b.entity,
              state: "open",
              attributes: { ...attributes },
            },
          ]),
        ),
        callService: async (...a: any[]) => {
          w.calls.push(a);
        },
      };
      w.card.hass = w.hass;
      document.querySelector("#mount")!.append(w.card);
      return true;
    },
    { cfg, attributes },
  );
}
test("picture-only registered composite renders exact absolute geometry including gathered top", async ({
  page,
}) => {
  expect(await mount(page)).toBe(true);
  await expect(page.getByRole("button")).toHaveCount(3);
  await expect(
    page.getByRole("button", { name: "Open", exact: true }),
  ).toHaveAttribute("aria-pressed", "false");
  await expect(
    page.getByRole("button", { name: "Closed", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  expect(await page.locator("button").first().innerText()).toBe("");
  expect(
    await page
      .locator("button")
      .first()
      .locator("svg")
      .getAttribute("aria-hidden"),
  ).toBe("true");
  const rects = await page
    .locator("button")
    .first()
    .locator("[data-fabric]")
    .evaluateAll((els: any[]) =>
      els.map((e) => ({
        y: e.getAttribute("y"),
        height: e.getAttribute("height"),
      })),
    );
  expect(rects).toEqual([
    { y: "12", height: "2" },
    { y: "12", height: "2" },
    { y: "12", height: "2" },
  ]);
  expect(
    await page.evaluate(() =>
      (window as any).customCards.some(
        (c: any) => c.type === "kiosk-blind-presets-card",
      ),
    ),
  ).toBe(true);
});
test("structural config errors reject safely; unsupported middle bands stay rendered but disabled", async ({
  page,
}) => {
  await mount(page);
  const errors = await page.evaluate((cfg) => {
    const w = window as any;
    return [
      { ...cfg, rows: 0 },
      { ...cfg, columns: 1.5 },
      { ...cfg, rows: 1, columns: 1 },
      { ...cfg, blinds: [] },
      { ...cfg, blinds: [cfg.blinds[0], cfg.blinds[0]] },
      { ...cfg, blinds: [{ entity: "light.example" }] },
      { ...cfg, blinds: [{ entity: "cover.example", width: 0 }] },
      { ...cfg, blinds: [{ entity: "cover.example", mapping: "independent" }] },
      { ...cfg, presets: [{ ...cfg.presets[0], positions: [] }] },
      { ...cfg, presets: [cfg.presets[0], cfg.presets[0]] },
      {
        ...cfg,
        presets: [
          {
            ...cfg.presets[0],
            positions: [
              { top: -1, bottom: 100 },
              { top: 0, bottom: 100 },
              { top: 0, bottom: 100 },
            ],
          },
        ],
      },
    ].map((c) => {
      try {
        w.card.setConfig(c);
        return "";
      } catch (e) {
        return String(e);
      }
    });
  }, config);
  expect(errors.every(Boolean)).toBe(true);
  const cfg = structuredClone(config);
  cfg.presets[0].positions[0] = { top: 30, bottom: 80 };
  await page.evaluate((cfg) => (window as any).card.setConfig(cfg), cfg);
  await expect(
    page.getByRole("button", { name: "Open", exact: true }),
  ).toBeDisabled();
  await expect(
    page.getByRole("button", { name: "Open", exact: true }),
  ).toHaveAttribute("title", /sequential/i);
  await expect(
    page.getByRole("button", { name: "Closed", exact: true }),
  ).toBeEnabled();
  await page.evaluate(() => {
    const w = window as any;
    w.card.hass = {
      ...w.hass,
      states: {
        ...w.hass.states,
        "cover.example_right": {
          ...w.hass.states["cover.example_right"],
          state: "unavailable",
        },
      },
    };
  });
  await expect(
    page.getByRole("button", { name: "Closed", exact: true }),
  ).toBeDisabled();
  await expect(
    page.getByRole("button", { name: "Closed", exact: true }),
  ).toHaveAttribute("aria-pressed", "false");
});
async function report(page: any, values: any[], state = "open") {
  await page.evaluate(
    ({ values, state }: any) => {
      const w = window as any;
      w.hass = {
        ...w.hass,
        states: Object.fromEntries(
          Object.entries(w.hass.states).map(([id, s]: any, i) => [
            id,
            { ...s, state, attributes: { ...s.attributes, ...values[i] } },
          ]),
        ),
      };
      w.card.hass = w.hass;
    },
    { values, state },
  );
}
test("dispatches exactly one mapped command per nonmatching shade; no optimistic active", async ({
  page,
}) => {
  await mount(page);
  await page.getByRole("button", { name: "Open", exact: true }).click();
  await expect
    .poll(() => page.evaluate(() => (window as any).calls))
    .toEqual(
      config.blinds.map((b) => [
        "cover",
        "open_cover",
        { entity_id: b.entity },
      ]),
    );
  await expect(
    page.getByRole("button", { name: "Open", exact: true }),
  ).toHaveAttribute("aria-pressed", "false");
  await expect(
    page.getByRole("button", { name: "Bottom", exact: true }),
  ).toBeDisabled();
  await report(
    page,
    config.blinds.map(() => ({
      current_position: 100,
      current_tilt_position: 0,
    })),
  );
  await expect(
    page.getByRole("button", { name: "Open", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Bottom", exact: true }).click();
  await expect
    .poll(() => page.evaluate(() => (window as any).calls.slice(3)))
    .toEqual(
      config.blinds.map((b) => [
        "cover",
        "set_cover_tilt_position",
        { entity_id: b.entity, tilt_position: 100 },
      ]),
    );
  await report(
    page,
    config.blinds.map(() => ({
      current_position: 0,
      current_tilt_position: 100,
    })),
  );
  await page.getByRole("button", { name: "Closed", exact: true }).click();
  await expect
    .poll(() => page.evaluate(() => (window as any).calls.slice(6)))
    .toEqual(
      config.blinds.map((b) => [
        "cover",
        "close_cover",
        { entity_id: b.entity },
      ]),
    );
});
test("validates all capabilities before dispatch, skips matching shades, maps generic coordinates", async ({
  page,
}) => {
  const cfg = structuredClone(config);
  cfg.presets[0].positions = [
    { top: 0, bottom: 40 },
    { top: 30, bottom: 100 },
    { top: 0, bottom: 100 },
  ];
  await mount(page, cfg);
  await report(page, [{}, { supported_features: 0 }, {}]);
  await page.getByRole("button", { name: "Open", exact: true }).click();
  await expect(page.getByRole("status")).toContainText(/capabilit/i);
  expect(await page.evaluate(() => (window as any).calls)).toEqual([]);
  await report(page, [{}, { supported_features: 135 }, {}]);
  await page.getByRole("button", { name: "Open", exact: true }).click();
  await expect
    .poll(() => page.evaluate(() => (window as any).calls))
    .toEqual([
      [
        "cover",
        "set_cover_position",
        { entity_id: cfg.blinds[0].entity, position: 60 },
      ],
      [
        "cover",
        "set_cover_tilt_position",
        { entity_id: cfg.blinds[1].entity, tilt_position: 30 },
      ],
    ]);
});
test("global duplicate suppression, partial failure stops later dispatch, timeout and stale guards", async ({
  page,
}) => {
  await mount(page);
  await page.clock.install();
  await page.evaluate(() => {
    const w = window as any;
    w.hass.callService = (...a: any[]) => {
      w.calls.push(a);
      return new Promise((resolve, reject) => {
        w.resolve = resolve;
        w.reject = reject;
      });
    };
  });
  await page.getByRole("button", { name: "Open", exact: true }).click();
  await page.evaluate(() => {
    const w = window as any;
    for (let i = 0; i < 5; i++)
      w.card.shadowRoot.querySelector("button").click();
  });
  expect(await page.evaluate(() => (window as any).calls.length)).toBe(1);
  await page.evaluate(() => (window as any).reject(Error("no")));
  await expect(page.getByRole("status")).toContainText("Action failed");
  expect(await page.evaluate(() => (window as any).calls.length)).toBe(1);
  await page.getByRole("button", { name: "Open", exact: true }).click();
  await page.clock.fastForward(12001);
  await expect(page.getByRole("status")).toContainText("No confirmation");
  await page.evaluate(() => (window as any).resolve());
  expect(await page.evaluate(() => (window as any).calls.length)).toBe(2);
  await page.getByRole("button", { name: "Open", exact: true }).click();
  await page.evaluate(() => {
    const w = window as any;
    w.card.setConfig(w.card.config);
    w.resolve();
  });
  await expect(page.getByRole("status")).toHaveCount(0);
  expect(await page.evaluate(() => (window as any).calls.length)).toBe(3);
  await page.getByRole("button", { name: "Open", exact: true }).click();
  await page.evaluate(() => {
    const w = window as any;
    w.card.remove();
    w.resolve();
  });
  await page.waitForTimeout(20);
  expect(await page.evaluate(() => (window as any).calls.length)).toBe(4);
});
test("native sequential decode, tolerance, moving/unknown never active; unrelated updates do not rerender", async ({
  page,
}) => {
  await mount(page);
  await report(
    page,
    config.blinds.map(() => ({
      current_position: 100,
      current_tilt_position: 100,
    })),
  );
  await expect(
    page.getByRole("button", { name: "Open", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await report(
    page,
    config.blinds.map(() => ({
      current_position: 0,
      current_tilt_position: 98,
    })),
  );
  await expect(
    page.getByRole("button", { name: "Bottom", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await report(
    page,
    config.blinds.map(() => ({
      current_position: 0,
      current_tilt_position: 97,
    })),
  );
  await expect(
    page.getByRole("button", { name: "Bottom", exact: true }),
  ).toHaveAttribute("aria-pressed", "false");
  await report(
    page,
    config.blinds.map(() => ({
      current_position: 0,
      current_tilt_position: 100,
    })),
    "opening",
  );
  await expect(
    page.getByRole("button", { name: "Bottom", exact: true }),
  ).toHaveAttribute("aria-pressed", "false");
  await report(page, [{}, {}, {}], "unknown");
  await expect(
    page.getByRole("button", { name: "Bottom", exact: true }),
  ).toBeDisabled();
  await page.evaluate(() => {
    const w = window as any;
    w.renders = 0;
    const original = w.card.render.bind(w.card);
    w.card.render = () => {
      w.renders++;
      return original();
    };
    w.card.hass = {
      ...w.card.hass,
      states: {
        ...w.card.hass.states,
        "sensor.unrelated": { state: "1", attributes: {} },
      },
    };
  });
  await page.waitForTimeout(20);
  expect(await page.evaluate(() => (window as any).renders)).toBe(0);
});
test("keyboard Enter/Space, key repeat, inner svg, double click and hold produce one plan", async ({
  page,
}) => {
  await mount(page);
  const open = page.getByRole("button", { name: "Open", exact: true });
  await open.focus();
  await page.keyboard.press("Enter");
  await expect
    .poll(() => page.evaluate(() => (window as any).calls.length))
    .toBe(3);
  await report(
    page,
    config.blinds.map(() => ({
      current_position: 100,
      current_tilt_position: 100,
    })),
  );
  const bottom = page.getByRole("button", { name: "Bottom", exact: true });
  await bottom.focus();
  await page.keyboard.down("Space");
  await page.keyboard.down("Space");
  await page.keyboard.up("Space");
  await expect
    .poll(() => page.evaluate(() => (window as any).calls.length))
    .toBe(6);
  await report(
    page,
    config.blinds.map(() => ({
      current_position: 0,
      current_tilt_position: 100,
    })),
  );
  await open
    .locator("svg")
    .evaluate((e: any) =>
      e.dispatchEvent(
        new MouseEvent("click", { bubbles: true, composed: true }),
      ),
    );
  await expect
    .poll(() => page.evaluate(() => (window as any).calls.length))
    .toBe(9);
  await report(
    page,
    config.blinds.map(() => ({
      current_position: 100,
      current_tilt_position: 100,
    })),
  );
  await page
    .getByRole("button", { name: "Closed", exact: true })
    .dblclick({ force: true });
  await expect
    .poll(() => page.evaluate(() => (window as any).calls.length))
    .toBe(12);
  await report(
    page,
    config.blinds.map(() => ({
      current_position: 0,
      current_tilt_position: 0,
    })),
  );
  await open.hover();
  await page.mouse.down();
  await page.waitForTimeout(700);
  await page.mouse.up();
  await expect
    .poll(() => page.evaluate(() => (window as any).calls.length))
    .toBe(15);
});
for (const width of [320, 360, 400, 420, 600])
  test(`responsive matrix ${width}px: touch bounds, no titles, theme and geometry`, async ({
    page,
  }) => {
    const cfg = structuredClone(config);
    cfg.rows = 3;
    cfg.presets = Array.from({ length: 9 }, (_, i) => ({
      ...cfg.presets[i % 3],
      id: `p-${i}`,
      name: `Preset ${i}`,
    }));
    await mount(page, cfg);
    await page.addStyleTag({ content: "body{--kiosk-radius:14px}" });
    await page
      .locator("#mount")
      .evaluate((e: any, width) => (e.style.width = `${width}px`), width);
    const info = await page
      .locator(".matrix")
      .evaluate((el: any) => ({
        w: el.getBoundingClientRect().width,
        h: el.getBoundingClientRect().height,
        background: getComputedStyle(el).backgroundColor,
        rects: [...el.querySelectorAll("button")].map((b: any) => ({
          w: b.getBoundingClientRect().width,
          h: b.getBoundingClientRect().height,
          right: b.getBoundingClientRect().right,
          left: b.getBoundingClientRect().left,
          radius: getComputedStyle(b).borderRadius,
          shadow: getComputedStyle(b).boxShadow,
        })),
      }));
    expect((await page.evaluate(() => (window as any).card.getCardSize())) * 50).toBeGreaterThanOrEqual(info.h);
    expect(info.background).toBe("rgba(0, 0, 0, 0)");
    expect(
      info.rects.every(
        (r) => r.w >= 44 && r.h >= 44 && r.right <= width && r.left >= 0,
      ),
    ).toBe(true);
    expect(info.rects.every((r) => r.radius === "14px")).toBe(true);
    expect(info.rects.every((r) => r.shadow !== "none")).toBe(true);
    if (width === 420) {
      expect(info.rects[0].w).toBeCloseTo(121.33, 1);
      expect(info.rects[0].h).toBeCloseTo(100, 1);
      expect(info.h).toBeCloseTo(356, 0);
    }
    const fabric = await page
      .locator("button")
      .nth(2)
      .locator("[data-fabric]")
      .first()
      .evaluate((e) => ({
        y: e.getAttribute("y"),
        h: e.getAttribute("height"),
      }));
    expect(fabric).toEqual({ y: "86", h: "2" });
    await page.screenshot({ path: `test-results/blind-matrix-${width}.png` });
  });
test("many configured columns wrap within native grid and retain all tiles", async ({
  page,
}) => {
  const cfg = structuredClone(config);
  cfg.columns = 12;
  cfg.rows = 1;
  cfg.presets = Array.from({ length: 12 }, (_, i) => ({
    ...cfg.presets[0],
    id: `p-${i}`,
    name: `P${i}`,
  }));
  await mount(page, cfg);
  await expect
    .poll(() =>
      page
        .locator("button")
        .evaluateAll((els: any[]) =>
          els.every(
            (e) =>
              e.getBoundingClientRect().right <= 320 &&
              e.getBoundingClientRect().width >= 44 &&
              e.getBoundingClientRect().height >= 44,
          ),
        ),
    )
    .toBe(true);
  expect(
    await page.evaluate(() => (window as any).card.getGridOptions()),
  ).toEqual({ columns: 12, rows: "auto", min_columns: 3 });
});
test("picker stub valid without cover discovery; configurable picture counts stay centered and within viewbox", async ({
  page,
}) => {
  await mount(page);
  expect(
    await page.evaluate(() => {
      const w = window as any;
      try {
        w.card.setConfig(w.card.constructor.getStubConfig({ states: {} }));
        return true;
      } catch {
        return false;
      }
    }),
  ).toBe(true);
  for (const count of [1, 2, 4, 12]) {
    const cfg = {
      ...config,
      blinds: Array.from({ length: count }, (_, i) => ({
        entity: `cover.example_${i}`,
        width: 1,
      })),
      presets: config.presets.map((p) => ({
        ...p,
        positions: Array.from({ length: count }, () => ({
          top: 0,
          bottom: 100,
        })),
      })),
    };
    await mount(page, cfg);
    const rects = await page
      .locator("button")
      .first()
      .locator("[data-fabric]")
      .evaluateAll((els: any[]) =>
        els.map((e) => ({
          x: Number(e.getAttribute("x")),
          w: Number(e.getAttribute("width")),
          y: Number(e.getAttribute("y")),
          h: Number(e.getAttribute("height")),
        })),
      );
    expect(rects.length).toBe(count);
    expect(rects[0].x).toBe(8);
    expect(rects.at(-1)!.x + rects.at(-1)!.w).toBeCloseTo(112, 4);
    expect(rects.every((r) => r.y === 12 && r.h === 76)).toBe(true);
  }
});
test("partial failure after first success never dispatches third; pending has no status text", async ({
  page,
}) => {
  await mount(page);
  await page.evaluate(() => {
    const w = window as any;
    w.hass.callService = async (...a: any[]) => {
      w.calls.push(a);
      if (w.calls.length === 2) throw Error("second rejected");
    };
  });
  await page.getByRole("button", { name: "Open", exact: true }).click();
  await expect(page.getByRole("status")).toContainText("Action failed");
  expect(await page.evaluate(() => (window as any).calls.length)).toBe(2);
  await page.evaluate(() => {
    const w = window as any;
    w.hass.callService = (...a: any[]) => {
      w.calls.push(a);
      return new Promise(() => {});
    };
  });
  await page.getByRole("button", { name: "Open", exact: true }).click();
  await expect(page.getByRole("status")).toHaveCount(0);
  await expect(page.locator(".tile:disabled")).toHaveCount(3);
});
test("stale pre-render click after reconfiguration cannot target new blinds", async ({
  page,
}) => {
  await mount(page);
  await page.evaluate(() => {
    const w = window as any,
      button = w.card.shadowRoot.querySelector("button"),
      next = structuredClone(w.card.config);
    next.blinds[0].entity = "cover.other";
    w.hass.states["cover.other"] = {
      ...w.hass.states["cover.example_left"],
      entity_id: "cover.other",
    };
    w.card.setConfig(next);
    button.click();
  });
  expect(await page.evaluate(() => (window as any).calls)).toEqual([]);
});
test("old service rejection cannot release or overwrite a newer operation after timeout", async ({
  page,
}) => {
  await mount(page);
  await page.clock.install();
  await page.evaluate(() => {
    const w = window as any;
    w.waiters = [];
    w.hass.callService = (...a: any[]) => {
      w.calls.push(a);
      return new Promise((resolve, reject) =>
        w.waiters.push({ resolve, reject }),
      );
    };
  });
  await page.getByRole("button", { name: "Open", exact: true }).click();
  await page.clock.fastForward(12001);
  await page.getByRole("button", { name: "Bottom", exact: true }).click();
  await page.evaluate(() => (window as any).waiters[0].reject(Error("late")));
  await expect(page.getByRole("status")).toHaveCount(0);
  await expect(page.locator(".tile:disabled")).toHaveCount(3);
  expect(await page.evaluate(() => (window as any).calls.length)).toBe(2);
});