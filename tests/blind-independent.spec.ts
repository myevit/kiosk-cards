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
// Synthetic regression fixture: no private baseline or device identifiers.
async function threeShades(page:any) {
 const c=config();c.rows=3;c.columns=3;
 c.blinds=['left','middle','right'].map(n=>({entity:`cover.example_${n}`,mapping:'independent-tdbu'}));
 c.presets=Array.from({length:9},(_,i)=>({id:`p${i+1}`,name:`Preset ${i+1}`,positions:c.blinds.map((_:any,j:number)=>({top:30,bottom:i===3&&j===0?70:100}))}));
 await setup(page,c);
 await page.evaluate(async()=>{const w=window as any;const states:any={};
 for(const n of ['left','middle','right'])states[`cover.example_${n}`]={state:'open',attributes:{supported_features:135,current_position:0,current_tilt_position:30,rail_top:n==='left'?30:null,rail_bottom:n==='left'?100:null,rails_known:n==='left',motion_top:'STOP',motion_bottom:'STOP'}};
 w.el.hass=w.hass={...w.hass,states,callService:async(...a:any[])=>{w.calls.push(a);const next=structuredClone(w.hass.states),id=a[2].entity_id;
 if(id==='cover.example_left'){if(a[1]==='set_cover_position')next[id].attributes.rail_bottom=100-a[2].position;else next[id].attributes.rail_top=a[2].tilt_position;}
 else next[id].attributes.target_bottom=100-a[2].position;
 w.el.hass=w.hass={...w.hass,states:next};await w.el.updateComplete;}};await w.el.updateComplete;});
}
const calls=(page:any)=>page.evaluate(()=>(window as any).calls);
const axis=(service:string,value:number)=>['cover',service,{entity_id:entity,[service==='set_cover_position'?'position':'tilt_position']:value}];
const targets=(top=30,bottom=70)=>[axis('set_cover_tilt_position',top),axis('set_cover_position',100-bottom)];
test('all three shades publish both targets without actual samples, no-op echoes or refresh',async({page})=>{
 await threeShades(page);await page.getByRole('button',{name:'Preset 4',exact:true}).click();
 await expect.poll(async()=> (await calls(page)).length).toBe(6);
 for(const n of ['left','middle','right'])expect((await calls(page)).filter((c:any)=>c[2].entity_id===`cover.example_${n}`).map((c:any)=>[c[1],c[2].tilt_position??c[2].position])).toEqual([['set_cover_tilt_position',30],['set_cover_position',n==='left'?30:0]]);
 await expect(page.locator('button:disabled')).toHaveCount(0);await expect(page.locator('[aria-pressed=true]')).toHaveCount(0);
 expect(await page.evaluate(()=>(window as any).el.busy)).toBe(false);
 await page.getByRole('button',{name:'Preset 5',exact:true}).click();await expect.poll(async()=> (await calls(page)).length).toBe(12);
});
for(const settle of ['resolve','reject'])test(`latest intent coalesces unsent targets after stale publish ${settle}, without rail reports`,async({page})=>{
 const c=config();c.columns=3;c.presets=[30,60,10].map(top=>({id:`t${top}`,name:`Top ${top}`,positions:[{top,bottom:70}]}));
 await setup(page,c);await page.evaluate(()=>{const w=window as any;w.pending=[];w.hass.callService=(...a:any[])=>{w.calls.push(a);return new Promise((resolve,reject)=>w.pending.push({resolve,reject}))}});
 await page.getByRole('button',{name:'Top 30',exact:true}).click();
 for(const n of [60,30,60,10])await page.getByRole('button',{name:`Top ${n}`,exact:true}).click();
 expect(await calls(page)).toEqual([axis('set_cover_tilt_position',30)]);
 await page.evaluate(settle=>{const w=window as any;w.pending[0][settle](settle==='reject'?Error('stale'):undefined)},settle);
 await expect.poll(()=>calls(page)).toEqual([axis('set_cover_tilt_position',30),axis('set_cover_tilt_position',10)]);
 expect(await page.evaluate(()=>({busy:(window as any).el.busy,error:(window as any).el.error}))).toEqual({busy:true,error:''});
 await page.evaluate(()=>{(window as any).pending[1].resolve()});await expect.poll(async()=> (await calls(page)).length).toBe(3);
 expect((await calls(page))[2]).toEqual(axis('set_cover_position',30));
 await page.evaluate(()=>{(window as any).pending[2].resolve()});await expect.poll(()=>page.evaluate(()=>(window as any).el.busy)).toBe(false);
});
test('moving old motor and stale matching coordinates cannot block or skip either new target',async({page})=>{
 const c=config();c.columns=2;c.presets=[{id:'old',name:'Old',positions:[{top:80,bottom:100}]},{id:'new',name:'New',positions:[{top:30,bottom:70}]}];
 await setup(page,c,{rail_top:30,rail_bottom:70,motion_top:'OPEN',motion_bottom:'CLOSE'});
 await page.getByRole('button',{name:'Old',exact:true}).click();await expect.poll(()=>calls(page)).toEqual(targets(80,100));
 await page.getByRole('button',{name:'New',exact:true}).click();await expect.poll(()=>calls(page)).toEqual([...targets(80,100),...targets()]);
 await expect(page.getByRole('button',{name:'New',exact:true})).toHaveAttribute('aria-pressed','false');
});
test('invalid replacement validates both axes before cancellation or any new calls',async({page})=>{
 const c=config();c.columns=2;c.presets.push({id:'new',name:'New',positions:[{top:60,bottom:70}]});await setup(page,c);
 await page.evaluate(()=>{const w=window as any;w.hass.callService=(...a:any[])=>{w.calls.push(a);return new Promise(r=>w.ack=r)}});
 await page.getByRole('button',{name:'Band',exact:true}).click();
 await page.evaluate(()=>{const w=window as any;w.hass.states['cover.example_blind'].attributes.supported_features=4;const before=w.el.operation;w.el.activate(w.el.config.presets[1],new MouseEvent('click'));w.sameGeneration=before===w.el.operation;});
 expect(await page.evaluate(()=>(window as any).sameGeneration)).toBe(true);expect(await calls(page)).toEqual([axis('set_cover_tilt_position',30)]);
 await page.evaluate(()=>{const w=window as any;w.hass.states['cover.example_blind'].attributes.supported_features=135;w.ack()});
 await expect.poll(()=>calls(page)).toEqual(targets());
});
test('malformed replacement coordinates fail before cancellation and all service calls',async({page})=>{
 const c=config();c.columns=2;c.presets.push({id:'new',name:'New',positions:[{top:60,bottom:70}]});await setup(page,c);
 await page.evaluate(()=>{const w=window as any;w.hass.callService=(...a:any[])=>{w.calls.push(a);return new Promise(r=>w.ack=r)}});
 await page.getByRole('button',{name:'Band',exact:true}).click();
 await page.evaluate(()=>{const w=window as any;const old=w.el.operation;const p=w.el.config.presets[1];w.validations=[];
 for(const position of [{top:90,bottom:20},{top:-1,bottom:70},{top:30,bottom:101},{top:'30',bottom:70},{top:NaN,bottom:70}]){p.positions[0]=position;w.el.activate(p,new MouseEvent('click'));w.validations.push(old===w.el.operation&&w.calls.length===1)}
 p.positions[0]={top:60,bottom:70};w.ack();});
 expect(await page.evaluate(()=>(window as any).validations)).toEqual([true,true,true,true,true]);await expect.poll(()=>calls(page)).toEqual(targets());
});
test('one failed or unresponsive publish cannot starve other shades or disable the grid',async({page})=>{
 await threeShades(page);await page.clock.install();await page.evaluate(()=>{const w=window as any;const service=w.hass.callService;w.hass.callService=(...args:any[])=>args[2].entity_id==='cover.example_middle'?(w.calls.push(args),new Promise(()=>{})):service(...args)});
 await page.getByRole('button',{name:'Preset 4',exact:true}).click();await expect.poll(async()=> (await calls(page)).length).toBe(5);
 await expect(page.locator('button:disabled')).toHaveCount(0);await page.clock.fastForward(120001);
 expect(await page.evaluate(()=>({busy:(window as any).el.busy,error:(window as any).el.error}))).toEqual({busy:false,error:'Publish timed out. Check device.'});
 await page.getByRole('button',{name:'Preset 5',exact:true}).click();await expect.poll(async()=> (await calls(page)).filter((c:any)=>c[2].entity_id==='cover.example_right').length).toBe(4);
});
test('publish rejection stops only its own shade and reports an error',async({page})=>{
 await threeShades(page);await page.evaluate(()=>{const w=window as any;const service=w.hass.callService;w.hass.callService=(...args:any[])=>args[2].entity_id==='cover.example_middle'?(w.calls.push(args),Promise.reject(Error('failed'))):service(...args)});
 await page.getByRole('button',{name:'Preset 4',exact:true}).click();await expect.poll(async()=> (await calls(page)).length).toBe(5);
 expect(await page.evaluate(()=>({busy:(window as any).el.busy,error:(window as any).el.error}))).toEqual({busy:false,error:'Action failed. Check device.'});
});
for(const mapping of ['independent-tdbu','sequential-tdbu'])test(`ignored unavailable ${mapping} shade has zero checks or calls`,async({page})=>{
 const c=config();c.blinds.push({entity:'cover.example_missing',mapping});c.presets[0].positions.push({top:45,bottom:75,ignored:true});await setup(page,c);
 const b=page.getByRole('button');await expect(b).toBeEnabled();await b.click();await expect.poll(()=>calls(page)).toEqual(targets());
 await expect(b.locator('[data-fabric]')).toHaveCount(1);await expect(b.locator('[data-ignored]')).toHaveCount(1);
 await report(page,30,70);await expect(b).toHaveAttribute('aria-pressed','true');
 expect(await page.evaluate(()=>(window as any).el.config.presets[0].positions[1])).toEqual({top:45,bottom:75,ignored:true});
});
for(const key of ['commands','actions'])test(`ignored legacy ${key} filter preserves included native semantics and schema validation`,async({page})=>{
 const c=config();c.blinds.push({entity:'cover.example_missing',mapping:'independent-tdbu'});c.presets[0].positions.push({top:45,bottom:75,ignored:true});c.presets[0][key]=[{service:'set_cover_tilt_position',entity_id:entity,tilt_position:40},{service:'set_cover_position',entity_id:'cover.example_missing',position:25}];await setup(page,c);
 const b=page.getByRole('button');await expect(b).toBeEnabled();await b.click();expect(await calls(page)).toEqual([axis('set_cover_tilt_position',40)]);await report(page,40,100);await expect(b).toHaveAttribute('aria-pressed','true');
 await page.evaluate(({c,key})=>{const w=window as any;try{c.presets[0][key][1].entity_id='light.invalid';w.el.setConfig(c)}catch(e){w.validationError=String(e)}},{c,key});
 expect(await page.evaluate(()=>(window as any).validationError)).toContain('configured covers');
});
test('all ignored or all native commands filtered out are disabled, never selected successful no-ops',async({page})=>{
 const c=config();c.presets[0].positions[0].ignored=true;await setup(page,c,{rail_top:30,rail_bottom:70});
 await expect(page.getByRole('button')).toBeDisabled();await expect(page.getByRole('button')).toHaveAttribute('aria-pressed','false');
 await page.evaluate(()=>{const w=window as any;w.el.activate(w.el.config.presets[0],new MouseEvent('click'))});expect(await calls(page)).toEqual([]);
 c.blinds.push({entity:'cover.example_missing',mapping:'independent-tdbu'});c.presets[0].positions.push({top:45,bottom:75,ignored:false});c.presets[0].commands=[{service:'set_cover_tilt_position',entity_id:entity,tilt_position:40}];
 await page.evaluate(c=>{(window as any).el.setConfig(c)},c);await expect(page.getByRole('button')).toBeDisabled();expect(await calls(page)).toEqual([]);
});
test('ignore is strictly boolean and never relaxes absolute coordinate validation; re-enable preserves targets',async({page})=>{
 const c=config();c.presets[0].positions[0].ignored=true;await setup(page,c);
 await page.evaluate(c=>{const w=window as any;w.errors=[];for(const patch of [{ignored:'true'},{ignored:true,top:90,bottom:20}])try{const bad=structuredClone(c);Object.assign(bad.presets[0].positions[0],patch);w.el.setConfig(bad)}catch(e){w.errors.push(String(e))}c.presets[0].positions[0].ignored=false;w.el.setConfig(c)},c);
 expect((await page.evaluate(()=>(window as any).errors)).length).toBe(2);await page.getByRole('button').click();expect(await calls(page)).toEqual(targets());
 expect(await page.evaluate(()=>(window as any).el.config.presets[0].positions[0])).toEqual({top:30,bottom:70,ignored:false});
});
for(const settle of ['resolve','reject'])test(`new goal can ignore an old unresponsive shade after late ${settle}`,async({page})=>{
 await threeShades(page);await page.evaluate(()=>{const w=window as any;const call=w.hass.callService;w.hass.callService=(...args:any[])=>{if(args[2].entity_id==='cover.example_left'){w.calls.push(args);return new Promise((resolve,reject)=>w.old={resolve,reject})}return call(...args)};w.el.config.presets[4].positions[0].ignored=true});
 await page.getByRole('button',{name:'Preset 4',exact:true}).click();await page.getByRole('button',{name:'Preset 5',exact:true}).click();
 await expect.poll(()=>page.evaluate(()=>(window as any).el.busy)).toBe(false);
 await page.evaluate(settle=>{(window as any).old[settle](settle==='reject'?Error('late ignored'):undefined)},settle);
 expect((await calls(page)).filter((c:any)=>c[2].entity_id==='cover.example_left')).toHaveLength(1);
 expect(await page.evaluate(()=>({busy:(window as any).el.busy,error:(window as any).el.error}))).toEqual({busy:false,error:''});
});
for(const settle of ['resolve','reject'])test(`config switch retains only publish fence until old ${settle}, not physical arrival`,async({page})=>{
 const c=config(80,100);await setup(page,c,{rail_top:30,rail_bottom:100});
 await page.evaluate(()=>{const w=window as any;w.hass.callService=(...a:any[])=>{w.calls.push(a);return w.calls.length===1?new Promise((resolve,reject)=>w.publishGate={resolve,reject}):Promise.resolve()}});
 await page.getByRole('button').click();
 c.presets[0].commands=[{service:'set_cover_tilt_position',entity_id:entity,tilt_position:60}];
 await page.evaluate(c=>{const w=window as any;w.el.setConfig(c);w.el.activate(w.el.config.presets[0],new MouseEvent('click'))},c);
 expect(await calls(page)).toEqual([axis('set_cover_tilt_position',80)]);
 await page.evaluate(settle=>{(window as any).publishGate[settle](settle==='reject'?Error('late failure'):undefined)},settle);
 await expect.poll(()=>calls(page)).toEqual([axis('set_cover_tilt_position',80),axis('set_cover_tilt_position',60)]);
 expect(await page.evaluate(()=>({busy:(window as any).el.busy,error:(window as any).el.error}))).toEqual({busy:false,error:''});
});
for(const flag of ['motion_top','motion_bottom'])for(const motion of ['OPEN','CLOSE','UNKNOWN'])test(`${flag} ${motion} cannot select a matching independent picture`,async({page})=>{
 await setup(page,config(),{rail_top:30,rail_bottom:70,rails_known:true,[flag]:motion},'open');
 const b=page.getByRole('button');await expect(b).toHaveAttribute('aria-pressed','false');
 await report(page,30,70,{[flag]:'STOP'});await expect(b).toHaveAttribute('aria-pressed','true');
});
test('global unknown state cannot select even matching measured rails',async({page})=>{
 await setup(page,config(),{rail_top:30,rail_bottom:70,rails_known:true},'unknown');
 await expect(page.getByRole('button')).toHaveAttribute('aria-pressed','false');
});
test('explicit whole OPEN needs both measured rail edges, not only bottom zero',async({page})=>{
 const c=config();c.presets[0].commands=[{service:'open_cover',entity_id:entity}];
 await setup(page,c,{rail_top:null,rail_bottom:0,rails_known:false},'open');
 await expect(page.getByRole('button')).toHaveAttribute('aria-pressed','false');
 await report(page,0,0);await expect(page.getByRole('button')).toHaveAttribute('aria-pressed','true');
});
test('independent 30/70 dispatches both axes and selects only measured native 30/30',async({page})=>{
 await setup(page);const b=page.getByRole('button',{name:'Band',exact:true});await expect(b).toBeEnabled();await b.click();
 await expect.poll(()=>calls(page)).toEqual([axis('set_cover_tilt_position',30),axis('set_cover_position',30)]);
 await expect(b).toHaveAttribute('aria-pressed','false');
 expect(await page.evaluate(()=>(window as any).el.busy)).toBe(false);
 await report(page,30,100);
 await expect(b).toHaveAttribute('aria-pressed','false');await report(page,30,70);await expect(b).toHaveAttribute('aria-pressed','true');
 expect(await page.evaluate(()=>(window as any).el.busy)).toBe(false);
 await expect(page.locator('[title],[role=status],[role=alert]')).toHaveCount(0);expect((await b.innerText()).trim()).toBe('');
 expect(await page.locator('.matrix').evaluate(e=>getComputedStyle(e).padding)).toBe('0px');
});
for(const [top,bottom,targetTop,targetBottom] of [[0,20,60,80],[80,100,20,40],[0,20,60,60]])test(`crossing ${top}/${bottom} sends requested ${targetTop}/${targetBottom} without clearance reports`,async({page})=>{
 await setup(page,config(targetTop,targetBottom),{rail_top:top,rail_bottom:bottom,rails_known:true});
 await page.getByRole('button').click();await expect.poll(()=>calls(page)).toEqual(targets(targetTop,targetBottom));
});
for(const state of ['open','closed','unknown'])test(`unknown raw rails in ${state} send requested targets, never bottom100 homing`,async({page})=>{
 await setup(page,config(),{rail_top:null,rail_bottom:null,current_position:30,current_tilt_position:30,rails_known:false},state);
 const b=page.getByRole('button');await expect(b).toBeEnabled();await b.click();await expect.poll(()=>calls(page)).toEqual(targets());
 await expect(b).toHaveAttribute('aria-pressed','false');expect(await page.evaluate(()=>(window as any).el.busy)).toBe(false);
 await page.evaluate(()=>{const w=window as any;w.el.hass=w.hass={...w.hass,states:{'cover.example_blind':{state:'open',attributes:{...w.hass.states['cover.example_blind'].attributes,target_top:30,target_bottom:70}}}}});
 await expect(b).toHaveAttribute('aria-pressed','false');await report(page,30,70);await expect(b).toHaveAttribute('aria-pressed','true');
});
test('partial actual feedback cannot select a picture and is not needed for dispatch',async({page})=>{
 await setup(page,config(),{rail_top:undefined,rail_bottom:70,current_tilt_position:30});const b=page.getByRole('button');
 await expect(b).toHaveAttribute('aria-pressed','false');await b.click();await expect.poll(()=>calls(page)).toEqual(targets());
 await report(page,30,70,{rails_known:undefined,current_position:undefined,current_tilt_position:undefined});await expect(b).toHaveAttribute('aria-pressed','true');
});
test('preflight all required services and all covers atomically; unavailable is never initialized',async({page})=>{
 await setup(page);
 for(const features of [4,128,0,135.5,NaN,"135"]){
 await page.evaluate(features=>{const w=window as any;w.hass.states['cover.example_blind'].attributes.supported_features=features;w.el.hass={...w.hass};w.el.activate(w.el.config.presets[0],new MouseEvent('click'));},features);
 expect(await calls(page)).toEqual([]);
 }
 await report(page,0,100,{},'unavailable');await expect(page.getByRole('button')).toBeDisabled();
});
test('120 second publish timeout never fakes ACK, retries, or unlocks the unsettled lane',async({page})=>{
 await setup(page);await page.clock.install();await page.evaluate(()=>{const w=window as any;w.hass.callService=(...a:any[])=>{w.calls.push(a);return new Promise(()=>{})}});
 const b=page.getByRole('button');await b.click();await page.clock.fastForward(120001);
 expect(await page.evaluate(()=>(window as any).el.busy)).toBe(false);await expect(b).toBeEnabled();await b.click();
 await page.clock.fastForward(120001);expect(await calls(page)).toEqual([axis('set_cover_tilt_position',30)]);
 await expect(b).toHaveAttribute('aria-pressed','false');
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
 expect(await page.locator('[data-blind="0"]').evaluate((e:any)=>e.schema.find((s:any)=>s.name==='mapping').selector.select.options.map((o:any)=>o.value))).toEqual(['sequential-tdbu','independent-tdbu','native-dual-cover']);
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
 await expect(page.getByRole('button')).toHaveAttribute('aria-pressed','true');await page.getByRole('button').click();await expect.poll(()=>calls(page)).toEqual(targets());
 await report(page,30,70,{rails_known:false,rail_top:null});await expect(page.getByRole('button')).toHaveAttribute('aria-pressed','false');
});
test('preflight later unavailable blind prevents earlier independent movement',async({page})=>{
 const c=config();c.blinds.push({entity:'cover.example_missing',mapping:'independent-tdbu'});c.presets[0].positions.push({top:30,bottom:70});await setup(page,c);
 await page.evaluate(()=>{const w=window as any;w.el.activate(w.el.config.presets[0],new MouseEvent('click'))});expect(await calls(page)).toEqual([]);
});
for(const action of ['setConfig','disconnect'])test(`${action} cancels unsent continuation; late publish cannot send bottom`,async({page})=>{
 await setup(page,config(60,80),{rail_top:0,rail_bottom:20,rails_known:true});
 await page.evaluate(()=>{const w=window as any;w.hass.callService=(...a:any[])=>{w.calls.push(a);return new Promise(r=>w.ack=r)}});
 await page.getByRole('button').click();await expect.poll(()=>calls(page)).toEqual([axis('set_cover_tilt_position',60)]);
 await page.evaluate(action=>{const w=window as any;if(action==='setConfig')w.el.setConfig(w.el.config);else w.el.remove();w.ack()},action);
 expect((await calls(page)).length).toBe(1);expect(await page.evaluate(()=>(window as any).el.busy)).toBe(false);
});
test('stale rejection after timeout cannot clear a newer publish or cause old bottom dispatch',async({page})=>{
 await setup(page);await page.clock.install();await page.evaluate(()=>{const w=window as any;w.waiters=[];w.hass.callService=(...a:any[])=>{w.calls.push(a);return new Promise((resolve,reject)=>w.waiters.push({resolve,reject}))}});
 const b=page.getByRole('button');await b.click();await page.clock.fastForward(120001);expect(await page.evaluate(()=>(window as any).el.busy)).toBe(false);
 await b.click();await page.evaluate(()=>{(window as any).waiters[0].reject(Error('old'))});
 await expect.poll(()=>calls(page)).toEqual([axis('set_cover_tilt_position',30),axis('set_cover_tilt_position',30)]);
 expect(await page.evaluate(()=>({busy:(window as any).el.busy,error:(window as any).el.error}))).toEqual({busy:true,error:''});
 await page.evaluate(()=>{(window as any).waiters[1].resolve()});await expect.poll(()=>calls(page)).toEqual([axis('set_cover_tilt_position',30),...targets()]);
});
test('measured matching picture still sends both targets to override in-flight motor intent',async({page})=>{
 await setup(page,config(),{rail_top:30,rail_bottom:70,rails_known:true});await expect(page.getByRole('button')).toHaveAttribute('aria-pressed','true');
 await page.getByRole('button').click();await expect.poll(()=>calls(page)).toEqual(targets());
});
