import { test, expect } from '@playwright/test';
async function mount(page:any,config:any,states:any){
 await page.goto('/tests/harness.html');await page.waitForFunction(()=> (window as any).ready);
 return page.evaluate(async ({config,states}:any)=>{const w=window as any;w.calls=[];w.events=[];document.addEventListener('hass-more-info',(e:any)=>w.events.push(e.detail));w.hass={states,locale:{language:'en'},config:{unit_system:{temperature:'°C'}},callService:async(...args:any[])=>w.calls.push(args)};const tag=config.type.slice(7);if(!customElements.get(tag))return false;w.card=document.createElement(tag);w.card.setConfig(config);w.card.hass=w.hass;document.querySelector('#mount')!.append(w.card);await w.card.updateComplete;return true;},{config,states});
}
const s=(entity_id:string,state:string,attributes:any={})=>({entity_id,state,attributes});
test('door reports contact and lock independently and defaults to non-actuating native more-info',async({page})=>{
 expect(await mount(page,{type:'custom:kiosk-door-card',entity:'binary_sensor.example_contact',lock_entity:'lock.example',name:'Example door'}, {'binary_sensor.example_contact':s('binary_sensor.example_contact','on'),'lock.example':s('lock.example','locked')})).toBe(true);
 await expect(page.locator('[part="detail"]')).toHaveText('open / locked');await expect(page.locator('ha-icon')).toHaveJSProperty('icon','mdi:door-closed-cancel');
 await page.locator('[part="body-target"]').click();await page.locator('[part="icon-target"]').click();expect(await page.evaluate(()=> (window as any).calls)).toEqual([]);expect(await page.evaluate(()=> (window as any).events)).toEqual([{entityId:'binary_sensor.example_contact'},{entityId:'lock.example'}]);
 for(const [door,lock,detail,icon,active]of [['off','locked','closed / locked','mdi:door-closed-lock',false],['off','unlocked','closed / unlocked','mdi:lock-open',true],['on','unlocked','open / unlocked','mdi:door-open',true],['unavailable','locked','unavailable / locked','mdi:lock-question',true]]){
  await page.evaluate(({door,lock}:any)=>{const w=window as any;w.card.hass={...w.hass,states:{'binary_sensor.example_contact':{...w.hass.states['binary_sensor.example_contact'],state:door},'lock.example':{...w.hass.states['lock.example'],state:lock}}};},{door,lock});
  await expect(page.locator('[part="detail"]')).toHaveText(String(detail));await expect(page.locator('ha-icon')).toHaveJSProperty('icon',icon);expect(await page.locator('[part="surface"]').evaluate(e=>e.classList.contains('active'))).toBe(active);
 }
 expect(await page.evaluate(()=> (window as any).card.getGridOptions())).toEqual({columns:6,rows:'auto'});
});
test('climate preserves mode priority, current-temperature glyph and non-actuating actions',async({page})=>{
 expect(await mount(page,{type:'custom:kiosk-climate-card',entity:'climate.example',var_large:true,temperature_format:'legacy',hvac_colors:{heating:'rgb(240,90,40)',cooling:'rgb(84,190,240)',default:'black'}},{'climate.example':s('climate.example','heat',{current_temperature:21.5,temperature:23,target_temp_low:20,target_temp_high:24,hvac_action:'heating'})})).toBe(true);
 await expect(page.locator('[part="temperature"]')).toHaveText('21.5°');await expect(page.locator('[part="detail"]')).toHaveText('23° / heat mode');
 expect(await page.locator('[part="temperature"]').evaluate(e=>getComputedStyle(e).color)).toBe('rgb(240, 90, 40)');
 await page.locator('[part="body-target"]').click();await page.locator('[part="icon-target"]').click();expect(await page.evaluate(()=> (window as any).calls)).toEqual([]);expect(await page.evaluate(()=> (window as any).events)).toEqual([{entityId:'climate.example'},{entityId:'climate.example'}]);
 for(const [mode,expected,active]of [['off','Off',false],['fan_only','Fan On',true],['cool','23° / cool mode',true],['auto','20°–24°',true],['unknown','20°–24°',true],['unavailable','20°–24°',true]]){
 await page.evaluate((mode)=>{const w=window as any;w.card.hass={...w.hass,states:{'climate.example':{...w.hass.states['climate.example'],state:mode}}};},mode);
 await expect(page.locator('[part="detail"]')).toHaveText(String(expected));expect(await page.locator('[part="surface"]').evaluate(e=>e.classList.contains('active'))).toBe(active);
 }
});
test('status card swaps rounded temperature for genuine status without progress banners',async({page})=>{
 const config={type:'custom:kiosk-status-card',entity:'sensor.example_temperature',status_entity:'sensor.example_message',status_active_entity:'binary_sensor.example_status',trend_entity:'sensor.example_trend'};
 expect(await mount(page,config,{'sensor.example_temperature':s('sensor.example_temperature','21.6'),'sensor.example_message':s('sensor.example_message','Example appliance done.'),'binary_sensor.example_status':s('binary_sensor.example_status','off'),'sensor.example_trend':s('sensor.example_trend','1.5')})).toBe(true);
 await expect(page.locator('[part="value"]')).toHaveText('22');expect(await page.locator('[part="degree"]').evaluate(e=>getComputedStyle(e).color)).toBe('rgb(255, 109, 0)');
 await page.evaluate(()=>{const w=window as any;w.card.hass={...w.hass,states:{...w.hass.states,'binary_sensor.example_status':{entity_id:'binary_sensor.example_status',state:'on',attributes:{}}}};});
 await expect(page.locator('[part="status"]')).toHaveText('Example appliance done.');await expect(page.locator('[part="value"]')).toHaveCount(0);
 await page.locator('[part="body-target"]').click();expect(await page.evaluate(()=> (window as any).events)).toEqual([{entityId:'sensor.example_temperature'}]);expect(await page.evaluate(()=> (window as any).calls)).toEqual([]);
});
test('door and climate picker/editor use native selectors, Large and preserve action confirmation',async({page})=>{
 await mount(page,{type:'custom:kiosk-door-card',entity:'binary_sensor.example_contact',lock_entity:'lock.example',icon_tap_action:{action:'perform-action',perform_action:'lock.unlock',target:{entity_id:'lock.example'},confirmation:{text:'Example approval'}}},{'binary_sensor.example_contact':s('binary_sensor.example_contact','off')});
 const proof=await page.evaluate(async()=>{const w=window as any;const editor=await w.card.constructor.getConfigElement();editor.setConfig(w.card.config);editor.hass=w.hass;document.querySelector('#mount')!.replaceChildren(editor);await editor.updateComplete;const form=editor.shadowRoot.querySelector('ha-form');return {names:form.schema.map((s:any)=>s.name),entity:form.schema.find((s:any)=>s.name==='entity'),lock:form.schema.find((s:any)=>s.name==='lock_entity'),large:form.data.var_large,confirmation:form.data.icon_tap_action.confirmation,catalog:w.customCards.map((c:any)=>c.type)};});
 expect(proof.names).toContain('lock_entity');expect(proof.names).toContain('door_entity');expect(proof.entity.selector.entity.filter.domain).toEqual(['binary_sensor','cover','lock']);expect(proof.lock.selector.entity.filter.domain).toBe('lock');expect(proof.large).toBe(false);expect(proof.confirmation).toEqual({text:'Example approval'});for(const type of ['kiosk-door-card','kiosk-climate-card','kiosk-status-card'])expect(proof.catalog).toContain(type);
});
test('specialized stubs are valid, cover observations stay separate, locale formatting and unavailable more-info are accessible',async({page})=>{
 await mount(page,{type:'custom:kiosk-climate-card',entity:'climate.example'},{'climate.example':s('climate.example','unavailable',{current_temperature:21.5})});
 const stubs=await page.evaluate(()=>{const w=window as any;return ['kiosk-door-card','kiosk-climate-card','kiosk-status-card'].map(tag=>customElements.get(tag)!.getStubConfig(w.hass));});
 expect(stubs[0].entity).toMatch(/^(binary_sensor|cover|lock)\./);expect(stubs[1].entity).toBe('climate.example');expect(stubs[2].entity).toMatch(/^sensor\./);
 await page.evaluate(()=>{const w=window as any;w.card.hass={...w.hass,locale:{language:'de'}}});await expect(page.locator('[part="temperature"]')).toHaveText('21,5°');await page.locator('[part="icon-target"]').click();await page.locator('[part="body-target"]').click();expect(await page.evaluate(()=> (window as any).calls)).toEqual([]);expect(await page.evaluate(()=> (window as any).events.length)).toBe(2);
 await mount(page,{type:'custom:kiosk-door-card',entity:'cover.example_door',lock_entity:'lock.example'},{'cover.example_door':s('cover.example_door','open'),'lock.example':s('lock.example','locked')});await expect(page.locator('kiosk-door-card [part="detail"]')).toHaveText('open / locked');
});
export {mount,s};
