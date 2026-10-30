import { test, expect } from '@playwright/test';
const top='cover.example_top', bottom='cover.example_bottom';
const cfg=(t=30,b=70):any=>({type:'custom:kiosk-blind-presets-card',rows:1,columns:1,blinds:[{mapping:'native-dual-cover',entity_top:top,entity_bottom:bottom,name:'Example',width:1}],presets:[{id:'band',name:'Band',positions:[{top:t,bottom:b}]}]});
const call=(entity_id:string,position:number)=>['cover','set_cover_position',{entity_id,position}];
async function setup(page:any,c=cfg(),editor=false){
 await page.goto('/tests/harness.html');await page.waitForFunction(()=>(window as any).ready);
 await page.evaluate(async({c,editor})=>{const w=window as any;w.calls=[];w.changes=[];if(editor)customElements.define('ha-form',class extends HTMLElement{});const card:any=document.createElement('kiosk-blind-presets-card');w.el=editor?await card.constructor.getConfigElement():card;w.hass={states:{'cover.example_top':{state:'open',attributes:{current_position:0,supported_features:4}},'cover.example_bottom':{state:'closed',attributes:{current_position:0,supported_features:4}}},callService:async(...a:any[])=>{w.calls.push(a)}};w.el.hass=w.hass;w.el.setConfig(c);w.el.addEventListener('config-changed',(e:any)=>w.changes.push(e.detail.config));document.querySelector('#mount')!.append(w.el)},{c,editor});
}
const calls=(page:any)=>page.evaluate(()=>(window as any).calls);
async function report(page:any,id:string,position:any,state='open'){await page.evaluate(({id,position,state})=>{const w=window as any;w.hass={...w.hass,states:{...w.hass.states,[id]:{state,attributes:{current_position:position,supported_features:4}}}};w.el.hass=w.hass},{id,position,state})}
test('native pair without legacy identity dispatches absolute rails and selects only both measured reports',async({page})=>{
 await setup(page);const b=page.getByRole('button');await expect(b).toBeEnabled();await b.click();await expect.poll(()=>calls(page)).toEqual([call(top,30),call(bottom,30)]);await expect(b).toHaveAttribute('aria-pressed','false');expect(await page.evaluate(()=>(window as any).el.busy)).toBe(false);
 await report(page,top,30);await expect(b).toHaveAttribute('aria-pressed','false');await report(page,bottom,30);await expect(b).toHaveAttribute('aria-pressed','true');
 for(const [p,s] of [[null,'open'],[30,'unknown'],[30,'opening'],['30','open'],[NaN,'open']] as any[]){await report(page,top,p,s);await expect(b).toHaveAttribute('aria-pressed','false')}
});
test('two native cards share latest physical-pair intent without dropping either axis',async({page})=>{
 await setup(page);
 await page.evaluate(c=>{const w=window as any;w.waiters=[];w.hass.callService=(...a:any[])=>{w.calls.push(a);return new Promise((resolve,reject)=>w.waiters.push({resolve,reject}))};w.other=document.createElement('kiosk-blind-presets-card');w.other.hass=w.hass;w.other.setConfig(c);document.querySelector('#mount')!.append(w.other);w.el.activate(w.el.config.presets[0],new MouseEvent('click'))},cfg());
 await expect.poll(()=>calls(page)).toEqual([call(top,30),call(bottom,30)]);
 await page.evaluate(()=>{const w=window as any;w.el.config.presets[0].positions[0]={top:40,bottom:80};w.el.activate(w.el.config.presets[0],new MouseEvent('click'));w.other.config.presets[0].positions[0]={top:50,bottom:90};w.other.activate(w.other.config.presets[0],new MouseEvent('click'))});
 expect(await calls(page)).toHaveLength(2);
 await page.evaluate(()=>{const w=window as any;w.waiters[0].resolve();w.waiters[1].reject(Error('stale'))});
 await expect.poll(()=>calls(page)).toEqual([call(top,30),call(bottom,30),call(top,50),call(bottom,10)]);
 await page.evaluate(()=>{const w=window as any;w.waiters.slice(2).forEach((x:any)=>x.resolve())});
 await expect.poll(()=>page.evaluate(()=>(window as any).other.busy)).toBe(false);
});
for(const [t,b] of [[0,0],[0,100],[30,60],[100,100]])test(`absolute ${t}/${b} always uses positions, never native OPEN direction`,async({page})=>{
 await setup(page,cfg(t,b));await page.getByRole('button').click();await expect.poll(()=>calls(page)).toEqual([call(top,t),call(bottom,100-b)]);
});
test('optional old entity is identity only, absent state never read or commanded',async({page})=>{
 const c=cfg();c.blinds[0].entity='cover.example_identity';await setup(page,c);await page.getByRole('button').click();expect(await calls(page)).toEqual([call(top,30),call(bottom,30)]);
});
test('ignored native pair sends zero calls even when absent; all ignored is disabled',async({page})=>{
 const c=cfg();c.blinds.push({mapping:'native-dual-cover',entity_top:'cover.example_absent_top',entity_bottom:'cover.example_absent_bottom'});c.presets[0].positions.push({top:22,bottom:55,ignored:true});await setup(page,c);await page.getByRole('button').click();expect(await calls(page)).toEqual([call(top,30),call(bottom,30)]);
 await page.evaluate(()=>{const w=window as any;w.calls=[];w.el.config.presets[0].positions[0].ignored=true;w.el.requestUpdate();w.el.activate(w.el.config.presets[0],new MouseEvent('click'))});await expect(page.getByRole('button')).toBeDisabled();expect(await calls(page)).toEqual([]);
});
for(const bad of ['unavailable','unknown','missing','features'])test(`all-pair preflight ${bad} prevents every earlier shade dispatch`,async({page})=>{
 const c=cfg();c.blinds.push({mapping:'native-dual-cover',entity_top:'cover.example_second_top',entity_bottom:'cover.example_second_bottom'});c.presets[0].positions.push({top:20,bottom:80});await setup(page,c);
 await page.evaluate(bad=>{const w=window as any;w.hass.states['cover.example_second_top']={state:'open',attributes:{supported_features:4}};w.hass.states['cover.example_second_bottom']={state:bad==='features'?'open':bad,attributes:{supported_features:bad==='features'?0:4}};if(bad==='missing')delete w.hass.states['cover.example_second_bottom'];w.el.hass={...w.hass};w.el.activate(w.el.config.presets[0],new MouseEvent('click'))},bad);expect(await calls(page)).toEqual([]);await expect(page.getByRole('button')).toBeDisabled();
});
test('unknown measured values never become zero but available motors may accept absolute intent',async({page})=>{
 await setup(page,cfg(0,100));await report(page,top,null);await expect(page.getByRole('button')).toHaveAttribute('aria-pressed','false');await page.getByRole('button').click();expect(await calls(page)).toEqual([call(top,0),call(bottom,0)]);
});
test('strict pair validation and legacy recipe allowlist stay separate',async({page})=>{
 await setup(page);const invalid=[{entity_top:top,entity_bottom:top},{entity_top:'light.example'},{entity_bottom:undefined}];
 for(const patch of invalid)expect(await page.evaluate(({c,patch})=>{Object.assign(c.blinds[0],patch);try{(window as any).el.setConfig(c);return false}catch{return true}},{c:cfg(),patch})).toBe(true);
 for(const entity_id of [top,bottom,'cover.example_identity']){const c=cfg();c.blinds[0].entity='cover.example_identity';c.presets[0].commands=[{service:'set_cover_position',entity_id,position:30}];expect(await page.evaluate(c=>{try{(window as any).el.setConfig(c);return false}catch{return true}},c)).toBe(true)}expect(await calls(page)).toEqual([]);
});
test('native editor preserves ordinary positions, ignore, metadata and height with zero calls',async({page})=>{
 const c=cfg();c.blinds[0].entity='cover.example_identity';c.height=222;c.presets[0].positions[0].ignored=true;await setup(page,c,true);
 const schema=await page.locator('[data-blind="0"]').evaluate((e:any)=>e.schema);expect(schema.filter((s:any)=>['entity_top','entity_bottom'].includes(s.name)).map((s:any)=>s.selector.entity.filter.domain)).toEqual(['cover','cover']);
 await page.getByRole('button',{name:'Edit Band'}).click();expect(await page.locator('[data-position="0"]').evaluate((e:any)=>e.schema.map((s:any)=>s.name))).toEqual(['top','bottom']);await expect(page.locator('[data-command],[data-script]')).toHaveCount(0);await page.getByRole('button',{name:'Cancel',exact:true}).click();expect(await page.evaluate(()=>(window as any).changes)).toEqual([]);
 await page.getByRole('button',{name:'Edit Band'}).click();await page.locator('[data-ignore="0"]').evaluate((e:any)=>e.dispatchEvent(new CustomEvent('value-changed',{detail:{value:{ignored:false}},bubbles:true,composed:true})));await page.getByRole('button',{name:'Save',exact:true}).click();const saved=await page.evaluate(()=>(window as any).changes.at(-1));c.presets[0].positions[0].ignored=false;expect(saved).toEqual(c);expect(await calls(page)).toEqual([]);
});
test('switching legacy mapping fills native selectors without emitting incomplete configuration',async({page})=>{
 const c=cfg();c.blinds=[{entity:'cover.example_identity'}];c.presets[0].positions=[{top:0,bottom:100}];await setup(page,c,true);
 const change=async(value:any)=>page.locator('[data-blind="0"]').evaluate((e:any,value:any)=>e.dispatchEvent(new CustomEvent('value-changed',{detail:{value},bubbles:true,composed:true})),value);
 await change({mapping:'native-dual-cover'});expect(await page.locator('[data-blind="0"]').evaluate((e:any)=>e.schema.some((s:any)=>s.name==='entity_top'))).toBe(true);expect(await page.evaluate(()=>(window as any).changes)).toEqual([]);await change({entity_top:top});expect(await page.evaluate(()=>(window as any).changes)).toEqual([]);await change({entity_bottom:bottom});expect(await page.evaluate(()=>(window as any).changes.at(-1).blinds[0])).toEqual({entity:'cover.example_identity',mapping:'native-dual-cover',entity_top:top,entity_bottom:bottom});expect(await calls(page)).toEqual([]);
});
for(const action of ['disconnect','setConfig'])test(`native ${action} cancels pending intent but retains transport fence`,async({page})=>{
 await setup(page);await page.evaluate(()=>{const w=window as any;w.waiters=[];w.hass.callService=(...a:any[])=>{w.calls.push(a);return new Promise((resolve,reject)=>w.waiters.push({resolve,reject}))};w.el.activate(w.el.config.presets[0],new MouseEvent('click'))});await expect.poll(()=>calls(page)).toHaveLength(2);
 await page.evaluate(action=>{const w=window as any;if(action==='disconnect'){w.el.remove();document.querySelector('#mount')!.append(w.el)}else w.el.setConfig(w.el.config);w.el.config.presets[0].positions[0]={top:45,bottom:65};w.el.activate(w.el.config.presets[0],new MouseEvent('click'))},action);expect(await calls(page)).toHaveLength(2);await page.evaluate(()=>{const w=window as any;w.waiters[0].resolve();w.waiters[1].resolve()});await expect.poll(()=>calls(page)).toEqual([call(top,30),call(bottom,30),call(top,45),call(bottom,35)]);
});
test('native timeout releases busy without clearing fences or blocking the other motor',async({page})=>{
 await setup(page);await page.clock.install();await page.evaluate(()=>{const w=window as any;w.hass.callService=(...a:any[])=>{w.calls.push(a);return a[2].entity_id==='cover.example_top'?new Promise(resolve=>w.ack=resolve):Promise.resolve()};w.el.activate(w.el.config.presets[0],new MouseEvent('click'))});await expect.poll(()=>calls(page)).toHaveLength(2);await page.clock.fastForward(120001);expect(await page.evaluate(()=>(window as any).el.busy)).toBe(false);
 await page.evaluate(()=>{const w=window as any;w.el.config.presets[0].positions[0]={top:40,bottom:80};w.el.activate(w.el.config.presets[0],new MouseEvent('click'))});await expect.poll(()=>calls(page)).toEqual([call(top,30),call(bottom,30),call(bottom,20)]);await page.evaluate(()=>(window as any).ack());await expect.poll(()=>calls(page)).toEqual([call(top,30),call(bottom,30),call(bottom,20),call(top,40)]);
});
test('legacy transport cannot block new native mapping with the same optional identity',async({page})=>{
 const c=cfg();c.blinds=[{entity:top,mapping:'independent-tdbu'}];await setup(page,c);await page.evaluate(()=>{const w=window as any;w.hass.states['cover.example_top'].attributes.supported_features=132;w.hass.callService=(...a:any[])=>{w.calls.push(a);return a[1]==='set_cover_tilt_position'?new Promise(()=>{}):Promise.resolve()};w.el.activate(w.el.config.presets[0],new MouseEvent('click'))});await expect.poll(()=>calls(page)).toHaveLength(1);
 await page.evaluate(c=>{const w=window as any;w.el.setConfig(c);w.el.activate(w.el.config.presets[0],new MouseEvent('click'))},cfg());await expect.poll(()=>calls(page)).toEqual([['cover','set_cover_tilt_position',{entity_id:top,tilt_position:30}],call(top,30),call(bottom,30)]);
});
