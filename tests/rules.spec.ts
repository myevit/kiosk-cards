import { test, expect } from "@playwright/test";
test("declarative attributes resolve each gesture from current state; unavailable diagnostics stay accessible", async ({ page }) => {
  await page.goto('/tests/harness.html');
  await page.waitForFunction(() => (window as any).ready);
  await page.evaluate(() => {
    const w = window as any; w.calls=[];w.events=[];
    w.card=document.createElement('kiosk-entity-card');
    w.card.setConfig({entity:'light.example',tap_action:{action:'toggle'},icon_tap_action:{action:'more-info'},action_rules:{tap_action:[{when:{op:'defined',args:[{attribute:'brightness'}]},action:{action:'more-info'}}]}});
    w.card.hass={states:{'light.example':{entity_id:'light.example',state:'on',attributes:{brightness:0}}},callService:async(...a:any[])=>w.calls.push(a)};
    document.body.append(w.card);document.addEventListener('hass-more-info',e=>w.events.push((e as CustomEvent).detail));
  });
  await page.locator('[part="body-target"]').click();
  expect(await page.evaluate(()=>(window as any).events.length)).toBe(1);
  expect(await page.evaluate(()=>(window as any).calls.length)).toBe(0);
  await page.evaluate(()=>{const c=(window as any).card;c.hass={...c.hass,states:{'light.example':{entity_id:'light.example',state:'unavailable',attributes:{}}}}});
  await expect(page.locator('[part="icon-target"]')).toBeEnabled();
  await page.locator('[part="icon-target"]').click();
  expect(await page.evaluate(()=>(window as any).events.length)).toBe(2);
  expect(await page.evaluate(()=>(window as any).calls.length)).toBe(0);
});
test("safe cross-entity presentation and countdown react without services or JavaScript evaluation", async ({ page }) => {
  await page.clock.install({time:new Date('2026-01-01T00:00:00Z')});
  await page.goto('/tests/harness.html');await page.waitForFunction(()=>(window as any).ready);
  await page.evaluate(()=>{const w=window as any;w.calls=[];w.card=document.createElement('kiosk-pill-card');w.card.setConfig({entity:'sensor.example',presentation:{name:{op:'map',args:[{state:true},{running:'Active',default:'Idle'}]},icon:{op:'if',args:[{op:'eq',args:[{state:true},'running']},'mdi:play','mdi:pause']},state_display:{op:'countdown',args:[{entity:'sensor.end',state:true},'Running']}}});w.card.hass={states:{'sensor.example':{entity_id:'sensor.example',state:'running',attributes:{}},'sensor.end':{entity_id:'sensor.end',state:'2026-01-01T01:01:00Z',attributes:{}}},callService:async(...a:any[])=>w.calls.push(a)};document.body.append(w.card)});
  await expect(page.locator('[part="title"]')).toHaveText('Active');await expect(page.locator('[part="detail"]')).toHaveText('1h 01m left');
  await page.clock.fastForward(60000);await expect(page.locator('[part="detail"]')).toHaveText('1h 00m left');
  await page.evaluate(()=>{const c=(window as any).card;c.hass={...c.hass,states:{...c.hass.states,'sensor.example':{entity_id:'sensor.example',state:'paused',attributes:{}},'sensor.end':{entity_id:'sensor.end',state:'unknown',attributes:{}}}}});
  await expect(page.locator('[part="title"]')).toHaveText('Idle');await expect(page.locator('[part="detail"]')).toHaveText('Running');expect(await page.evaluate(()=>(window as any).calls.length)).toBe(0);
  expect(await page.evaluate(()=>{try{(window as any).card.setConfig({entity:'sensor.example',presentation:{name:{op:'eval',args:['alert(1)']}}});return false}catch{return true}})).toBe(true);
});
