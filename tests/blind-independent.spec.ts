import { test, expect } from '@playwright/test';
const entity='cover.example_blind';
const config=(top=30,bottom=70):any=>({type:'custom:kiosk-blind-presets-card',rows:1,columns:1,blinds:[{entity,mapping:'independent-tdbu'}],presets:[{id:'band',name:'Band',positions:[{top,bottom}]}]});
async function setup(page:any,c=config(),attrs:any={current_position:0,current_tilt_position:0,rail_top:0,rail_bottom:100,rails_known:true},state='closed',editor=false){
 await page.goto('/tests/harness.html');await page.waitForFunction(()=>(window as any).ready);
 await page.evaluate(async({c,attrs,state,editor})=>{const w=window as any;w.calls=[];w.changes=[];
 if(editor&&!customElements.get('ha-form'))customElements.define('ha-form',class extends HTMLElement{});
 const card:any=document.createElement('kiosk-blind-presets-card');w.el=editor?await card.constructor.getConfigElement():card;
 w.hass={states:{'cover.example_blind':{state,attributes:{supported_features:135,...attrs}}},callService:async(...a:any[])=>{w.calls.push(a)}};
 w.el.hass=w.hass;w.el.setConfig(c);w.el.addEventListener('config-changed',(e:any)=>w.changes.push(e.detail.config));document.querySelector('#mount')!.append(w.el);
 },{c,attrs,state,editor});
}
async function report(page:any,top:number,bottom:number,extra:any={},state='open'){
 await page.evaluate(({top,bottom,extra,state})=>{const w=window as any;w.el.hass=w.hass={...w.hass,states:{'cover.example_blind':{state,attributes:{supported_features:135,current_position:100-bottom,current_tilt_position:top,rail_top:top,rail_bottom:bottom,rails_known:true,...extra}}}}},{top,bottom,extra,state});
}
const calls=(page:any)=>page.evaluate(()=>(window as any).calls);
const axis=(service:string,value:number)=>['cover',service,{entity_id:entity,[service==='set_cover_position'?'position':'tilt_position']:value}];
test('cold partial measurement advances while global cover state remains unknown, but moving axis waits',async({page})=>{
 await setup(page,config(),{current_position:30,current_tilt_position:30,rails_known:false},'unknown');
 const b=page.getByRole('button');await b.click();await expect.poll(()=>calls(page)).toEqual([axis('set_cover_position',0)]);
 await report(page,0,100,{rail_top:null,rails_known:false},'unknown');
 await expect.poll(()=>calls(page)).toEqual([axis('set_cover_position',0),axis('set_cover_tilt_position',30)]);
 await report(page,30,100,{motion_top:'OPEN'});expect((await calls(page)).length).toBe(2);
 await report(page,30,100,{motion_top:'STOP'});await expect.poll(async()=> (await calls(page)).length).toBe(3);
 await report(page,30,70,{motion_top:'STOP',motion_bottom:'STOP'});await expect(b).toHaveAttribute('aria-pressed','true');
});
for(const flag of ['motion_top','motion_bottom'])test(`moving ${flag} cannot select a matching independent picture`,async({page})=>{
 await setup(page,config(),{rail_top:30,rail_bottom:70,rails_known:true,[flag]:'OPEN'},'open');
 const b=page.getByRole('button');await expect(b).toHaveAttribute('aria-pressed','false');
 await report(page,30,70,{[flag]:'STOP'});await expect(b).toHaveAttribute('aria-pressed','true');
});
test('explicit whole OPEN needs both measured rail edges, not only bottom zero',async({page})=>{
 const c=config();c.presets[0].commands=[{service:'open_cover',entity_id:entity}];
 await setup(page,c,{rail_top:null,rail_bottom:0,rails_known:false},'open');
 await expect(page.getByRole('button')).toHaveAttribute('aria-pressed','false');
 await report(page,0,0);await expect(page.getByRole('button')).toHaveAttribute('aria-pressed','true');
});
test('independent 30/70 dispatches both axes and selects only measured native 30/30',async({page})=>{
 await setup(page);const b=page.getByRole('button',{name:'Band',exact:true});await expect(b).toBeEnabled();await b.click();
 await expect.poll(()=>calls(page)).toEqual([axis('set_cover_tilt_position',30)]);
 await expect(b).toHaveAttribute('aria-pressed','false');
 await report(page,30,100);await expect.poll(()=>calls(page)).toEqual([axis('set_cover_tilt_position',30),axis('set_cover_position',30)]);
 await expect(b).toHaveAttribute('aria-pressed','false');await report(page,30,70);await expect(b).toHaveAttribute('aria-pressed','true');
 expect(await page.evaluate(()=>(window as any).el.busy)).toBe(false);
 await expect(page.locator('[title],[role=status],[role=alert]')).toHaveCount(0);expect((await b.innerText()).trim()).toBe('');
 expect(await page.locator('.matrix').evaluate(e=>getComputedStyle(e).padding)).toBe('0px');
});
for(const [top,bottom,targetTop,targetBottom,first,value] of [
 [0,20,60,80,'set_cover_position',20],
 [80,100,20,40,'set_cover_tilt_position',20],
] as const)test(`crossing ${top}/${bottom} to ${targetTop}/${targetBottom} waits for safe ${first}`,async({page})=>{
 await setup(page,config(targetTop,targetBottom),{current_position:100-bottom,current_tilt_position:top,rail_top:top,rail_bottom:bottom,rails_known:true});
 await page.getByRole('button',{name:'Band',exact:true}).click();await expect.poll(()=>calls(page)).toEqual([axis(first,value)]);
 await report(page,first==='set_cover_tilt_position'?targetTop:top,first==='set_cover_position'?targetBottom:bottom,{},'opening');
 expect((await calls(page)).length).toBe(1);
 await report(page,first==='set_cover_tilt_position'?targetTop:top,first==='set_cover_position'?targetBottom:bottom);
 await expect.poll(async()=> (await calls(page)).length).toBe(2);
 await report(page,targetTop,targetBottom);await expect(page.getByRole('button',{name:'Band',exact:true})).toHaveAttribute('aria-pressed','true');
});
for(const state of ['open','closed','unknown'])test(`migration ${state} ignores cached legacy values and initializes bottom100 then top then bottom`,async({page})=>{
 await setup(page,config(),{current_position:30,current_tilt_position:30,rails_known:false},state);
 const b=page.getByRole('button',{name:'Band',exact:true});await expect(b).toBeEnabled();await expect(b).toHaveAttribute('aria-pressed','false');await b.click();
 await expect.poll(()=>calls(page)).toEqual([axis('set_cover_position',0)]);
 // Bottom measurement alone can release the safety stage, but cannot confirm top.
 await report(page,30,100,{rails_known:false,rail_top:null,rail_bottom:100,rail_bottom_known:true});
 await expect.poll(()=>calls(page)).toEqual([axis('set_cover_position',0),axis('set_cover_tilt_position',30)]);
 await report(page,30,100);await expect.poll(()=>calls(page)).toEqual([axis('set_cover_position',0),axis('set_cover_tilt_position',30),axis('set_cover_position',30)]);
 await report(page,30,70);await expect(b).toHaveAttribute('aria-pressed','true');
});
test('raw unique rail fields permit per-axis feedback without global flag; partial report is not selected',async({page})=>{
 await setup(page,config(),{current_position:30,current_tilt_position:30,rail_bottom:70});
 const b=page.getByRole('button',{name:'Band',exact:true});await expect(b).toHaveAttribute('aria-pressed','false');await b.click();
 await expect.poll(()=>calls(page)).toEqual([axis('set_cover_position',0)]);
 await report(page,0,100,{rails_known:undefined,rail_top:undefined,current_tilt_position:undefined});
 await expect.poll(async()=> (await calls(page)).length).toBe(2);
 await report(page,30,100,{rails_known:undefined});await expect.poll(async()=> (await calls(page)).length).toBe(3);
 await report(page,30,70,{rails_known:undefined});await expect(b).toHaveAttribute('aria-pressed','true');
});
test('preflight all required services and all covers atomically; unavailable is never initialized',async({page})=>{
 await setup(page);
 for(const features of [4,128,0]){
 await page.evaluate(features=>{const w=window as any;w.hass.states['cover.example_blind'].attributes.supported_features=features;w.el.hass={...w.hass};w.el.activate(w.el.config.presets[0],new MouseEvent('click'));},features);
 expect(await calls(page)).toEqual([]);
 }
 await report(page,0,100,{},'unavailable');await expect(page.getByRole('button')).toBeDisabled();
});
test('120 second per-destination bound allows 60 second travel, timeout aborts without retry',async({page})=>{
 await setup(page);await page.clock.install();const b=page.getByRole('button');await b.click();
 await page.clock.fastForward(60000);expect(await page.evaluate(()=>(window as any).el.busy)).toBe(true);
 await report(page,30,100);await expect.poll(async()=> (await calls(page)).length).toBe(2);
 await page.clock.fastForward(119000);expect(await page.evaluate(()=>(window as any).el.busy)).toBe(true);
 await page.clock.fastForward(1001);expect(await page.evaluate(()=>(window as any).el.busy)).toBe(false);
 await report(page,30,70);expect((await calls(page)).length).toBe(2);
});
for(const [service,data,top,bottom] of [
 ['set_cover_position',{position:0},30,100],['set_cover_tilt_position',{tilt_position:100},100,100],
] as const)test(`independent explicit ${service} has no sequential endpoint alias`,async({page})=>{
 const c=config();c.presets[0].commands=[{service,entity_id:entity,...data}];
 await setup(page,c,{current_position:44,current_tilt_position:77,rail_top:top,rail_bottom:bottom,rails_known:true});
 await expect(page.getByRole('button')).toHaveAttribute('aria-pressed','true');expect(await calls(page)).toEqual([]);
});
test('independent explicit partial command needs only its own axis and not uncommanded entities',async({page})=>{
 const c=config();c.blinds.push({entity:'cover.example_absent'});c.presets[0].positions.push({top:0,bottom:100});c.presets[0].commands=[{service:'set_cover_position',entity_id:entity,position:0}];
 await setup(page,c,{current_position:30,rail_bottom:70,rail_bottom_known:true,rails_known:false});
 const b=page.getByRole('button');await expect(b).toBeEnabled();await b.click();await expect.poll(()=>calls(page)).toEqual([axis('set_cover_position',0)]);
 await report(page,30,100,{current_tilt_position:undefined,rail_top:undefined,rails_known:false,rail_bottom_known:true});await expect(b).toHaveAttribute('aria-pressed','true');
});
test('mapping is selectable per blind; preset cancel and save preserve independent mapping and picture',async({page})=>{
 const c=config();delete c.blinds[0].mapping;await setup(page,c,{},'open',true);
 expect(await page.locator('[data-blind="0"]').evaluate((e:any)=>e.schema.find((s:any)=>s.name==='mapping').selector.select.options.map((o:any)=>o.value))).toEqual(['sequential-tdbu','independent-tdbu']);
 await page.locator('[data-blind="0"]').evaluate((e:any)=>e.dispatchEvent(new CustomEvent('value-changed',{detail:{value:{mapping:'independent-tdbu'}},bubbles:true,composed:true})));
 await page.getByRole('button',{name:'Edit Band'}).click();await expect(page.getByRole('button',{name:'Save',exact:true})).toBeEnabled();
 await page.getByRole('button',{name:'Cancel',exact:true}).click();await page.getByRole('button',{name:'Edit Band'}).click();await page.getByRole('button',{name:'Save',exact:true}).click();
 const saved=await page.evaluate(()=>(window as any).changes.at(-1));expect(saved.blinds[0].mapping).toBe('independent-tdbu');expect(saved.presets[0].positions).toEqual([{top:30,bottom:70}]);expect(await calls(page)).toEqual([]);
});
test('nine command-free pictures survive independent mapping and preset cancel/save unchanged',async({page})=>{
 const c=config();c.rows=3;c.columns=3;c.blinds=[{entity,mapping:'sequential-tdbu'},{entity:'cover.example_second',mapping:'sequential-tdbu'}];
 c.presets=Array.from({length:9},(_,i)=>({id:`p${i}`,name:`Preset ${i}`,positions:[{top:30,bottom:70},{top:0,bottom:i*10}]}));
 await setup(page,c,{},'open',true);
 await page.locator('[data-blind="0"]').evaluate((e:any)=>e.dispatchEvent(new CustomEvent('value-changed',{detail:{value:{mapping:'independent-tdbu'}},bubbles:true,composed:true})));
 expect(await page.locator('[data-blind="1"]').evaluate((e:any)=>e.data.mapping)).toBe('sequential-tdbu');
 await page.getByRole('button',{name:'Edit Preset 4',exact:true}).click();await page.getByRole('button',{name:'Cancel',exact:true}).click();
 await page.getByRole('button',{name:'Edit Preset 6',exact:true}).click();await page.getByRole('button',{name:'Save',exact:true}).click();
 const saved=await page.evaluate(()=>(window as any).changes.at(-1));expect(saved.presets).toEqual(c.presets);expect(saved.blinds.map((b:any)=>b.mapping)).toEqual(['independent-tdbu','sequential-tdbu']);expect(await calls(page)).toEqual([]);
});
test('source unique raw rails override cached HA values, including absent flat attributes',async({page})=>{
 await setup(page,config(),{current_position:30,current_tilt_position:100,rail_top:30,rail_bottom:70,rails_known:true});
 await expect(page.getByRole('button')).toHaveAttribute('aria-pressed','true');
 await report(page,30,70,{current_position:undefined,current_tilt_position:undefined});
 await expect(page.getByRole('button')).toHaveAttribute('aria-pressed','true');await page.getByRole('button').click();expect(await calls(page)).toEqual([]);
 await report(page,30,70,{rails_known:false,rail_top:null});await expect(page.getByRole('button')).toHaveAttribute('aria-pressed','false');
});
test('preflight later unavailable blind prevents earlier independent movement',async({page})=>{
 const c=config();c.blinds.push({entity:'cover.example_missing',mapping:'independent-tdbu'});c.presets[0].positions.push({top:30,bottom:70});await setup(page,c);
 await page.evaluate(()=>{const w=window as any;w.el.activate(w.el.config.presets[0],new MouseEvent('click'))});expect(await calls(page)).toEqual([]);
});
for(const action of ['setConfig','disconnect'])test(`${action} cancels safety continuation; late ACK cannot move next rail`,async({page})=>{
 await setup(page,config(60,80),{rail_top:0,rail_bottom:20,rails_known:true});
 await page.evaluate(()=>{const w=window as any;w.hass.callService=(...a:any[])=>{w.calls.push(a);return new Promise(r=>w.ack=r)}});
 await page.getByRole('button').click();await expect.poll(()=>calls(page)).toEqual([axis('set_cover_position',20)]);
 await page.evaluate(action=>{const w=window as any;if(action==='setConfig')w.el.setConfig(w.el.config);else w.el.remove();w.ack()},action);
 await report(page,0,80);expect((await calls(page)).length).toBe(1);expect(await page.evaluate(()=>(window as any).el.busy)).toBe(false);
});
test('stale rejection after timeout cannot clear a new operation; no automatic retries',async({page})=>{
 await setup(page);await page.clock.install();
 await page.evaluate(()=>{const w=window as any;w.waiters=[];w.hass.callService=(...a:any[])=>{w.calls.push(a);return new Promise((resolve,reject)=>w.waiters.push({resolve,reject}))}});
 const b=page.getByRole('button');await b.click();await page.clock.fastForward(120001);expect(await page.evaluate(()=>(window as any).el.busy)).toBe(false);
 expect((await calls(page)).length).toBe(1);await b.click();await page.evaluate(()=>{const w=window as any;w.waiters[0].reject(Error('old'));w.waiters[1].resolve()});
 expect(await page.evaluate(()=>(window as any).el.busy)).toBe(true);await report(page,30,100);await expect.poll(async()=> (await calls(page)).length).toBe(3);
});
test('fully closed unknown target uses bottom safety then top without duplicate bottom',async({page})=>{
 await setup(page,config(0,100),{rail_top:null,rail_bottom:null,rails_known:false},'unknown');
 await page.getByRole('button').click();await expect.poll(()=>calls(page)).toEqual([axis('set_cover_position',0)]);
 await report(page,0,100,{rail_top:null,rails_known:false});await expect.poll(()=>calls(page)).toEqual([axis('set_cover_position',0),axis('set_cover_tilt_position',0)]);
 await report(page,0,100,{},'closed');await expect(page.getByRole('button')).toHaveAttribute('aria-pressed','true');expect((await calls(page)).length).toBe(2);
});
test('explicit false aggregate flag prevents cached-target skipping even with numeric raw remnants',async({page})=>{
 await setup(page,config(),{rail_top:30,rail_bottom:70,rails_known:false,current_position:30,current_tilt_position:30});
 const b=page.getByRole('button');await expect(b).toHaveAttribute('aria-pressed','false');await b.click();await expect.poll(()=>calls(page)).toEqual([axis('set_cover_position',0)]);
});
test('crossing waits for a safe measured boundary, not merely a within-tolerance report',async({page})=>{
 await setup(page,config(60,60),{rail_top:0,rail_bottom:20,rails_known:true});await page.getByRole('button').click();
 await expect.poll(()=>calls(page)).toEqual([axis('set_cover_position',40)]);
 await report(page,0,58);await page.waitForTimeout(40);expect((await calls(page)).length).toBe(1);
 await report(page,0,60);await expect.poll(()=>calls(page)).toEqual([axis('set_cover_position',40),axis('set_cover_tilt_position',60)]);
});
