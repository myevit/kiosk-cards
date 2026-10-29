import { test, expect } from '@playwright/test';
import { useBlindEditorSource } from './blind-editor-source';
const entities = ['cover.example_left', 'cover.example_middle', 'cover.example_right'];
const command = (entity = entities[2], value = 30) => ({service:'set_cover_tilt_position', entity_id:entity, tilt_position:value});
const cfg = (commands?: any[]) => ({type:'custom:kiosk-blind-presets-card',rows:1,columns:1,blinds:entities.map(entity=>({entity})),presets:[{id:'band',name:'Band',positions:entities.map(()=>({top:30,bottom:70})),...(commands ? {commands}: {})}]});
async function setup(page:any, config:any, editor=false) {
 await useBlindEditorSource(page);
 await page.goto('/tests/harness.html'); await page.waitForFunction(()=>(window as any).ready);
 await page.evaluate(async ({config,editor})=>{
  const w=window as any; w.calls=[]; w.reads=[]; w.changes=[];
  if(editor) customElements.define('ha-form',class extends HTMLElement {});
  const card:any=document.createElement('kiosk-blind-presets-card');
  w.el=editor?await card.constructor.getConfigElement():card;
  w.hass={states:Object.fromEntries(config.blinds.map((b:any)=>[b.entity,{state:'open',attributes:{current_position:90,current_tilt_position:0,supported_features:135}}])),callService:async (...a:any[])=>{w.calls.push(a)},callWS:async (a:any)=>{w.reads.push(a); throw new Error('Editor must not read script configurations')}};
  w.el.hass=w.hass; w.el.setConfig(config); w.el.addEventListener('config-changed',(e:any)=>w.changes.push(e.detail.config)); document.querySelector('#mount')!.append(w.el);
 },{config,editor});
}
async function change(page:any,selector:string,value:any){await page.locator(selector).evaluate((el:any,value)=>el.dispatchEvent(new CustomEvent('value-changed',{detail:{value},bubbles:true,composed:true})),value)}
test('native close is not already matched by a top-open cover with zero bottom opening',async({page})=>{
 await setup(page,cfg([{service:'close_cover',entity_id:entities[0]}]));
 await page.evaluate(()=>{const w=window as any;w.el.hass=w.hass={...w.hass,states:{...w.hass.states,'cover.example_left':{state:'open',attributes:{current_position:0,current_tilt_position:30,supported_features:255}}}}});
 const b=page.getByRole('button',{name:'Band',exact:true});await expect(b).toHaveAttribute('aria-pressed','false');await b.click();
 await expect.poll(()=>page.evaluate(()=>(window as any).calls)).toEqual([['cover','close_cover',{entity_id:entities[0]}]]);
 await page.evaluate(()=>{const w=window as any;w.el.hass=w.hass={...w.hass,states:{...w.hass.states,'cover.example_left':{state:'closed',attributes:{current_position:0,current_tilt_position:0,supported_features:255}}}}});
 await expect(b).toHaveAttribute('aria-pressed','true');expect(await page.evaluate(()=>(window as any).el.busy)).toBe(false);
});
for(const [service,data,initial] of [
 ['set_cover_position',{position:0},{current_position:0,current_tilt_position:30}],
 ['set_cover_tilt_position',{tilt_position:100},{current_position:30,current_tilt_position:100}],
] as const)test(`native ${service} gathered-bottom endpoint is not matched by another segment`,async({page})=>{
 await setup(page,cfg([{service,entity_id:entities[0],...data}]));
 await page.evaluate(initial=>{const w=window as any;w.el.hass=w.hass={...w.hass,states:{...w.hass.states,'cover.example_left':{state:'open',attributes:{...initial,supported_features:255}}}}},initial);
 const b=page.getByRole('button',{name:'Band',exact:true});await expect(b).toHaveAttribute('aria-pressed','false');await b.click();
 await expect.poll(()=>page.evaluate(()=>(window as any).calls)).toEqual([['cover',service,{entity_id:entities[0],...data}]]);
 await page.evaluate(()=>{const w=window as any;w.el.hass=w.hass={...w.hass,states:{...w.hass.states,'cover.example_left':{state:'open',attributes:{current_position:0,current_tilt_position:100,supported_features:255}}}}});
 await expect(b).toHaveAttribute('aria-pressed','true');expect(await page.evaluate(()=>(window as any).el.busy)).toBe(false);
});
for(const [service,data,attribute,expected] of [
 ['open_cover',{},'current_position',100],['close_cover',{},'current_position',0],['set_cover_position',{position:40},'current_position',40],['set_cover_tilt_position',{tilt_position:70},'current_tilt_position',70],
] as const) test(`explicit actions alias dispatches and confirms ${service} independently of picture`,async({page})=>{
 const config:any=cfg();config.presets[0].actions=[{service,entity_id:entities[2],...data}];await setup(page,config);
 await page.getByRole('button',{name:'Band',exact:true}).click(); await expect.poll(()=>page.evaluate(()=>(window as any).calls)).toEqual([['cover',service,{entity_id:entities[2],...data}]]);
 await page.evaluate(({attribute,expected})=>{const w=window as any;w.el.hass=w.hass={...w.hass,states:{...w.hass.states,'cover.example_right':{state:expected===0?'closed':'open',attributes:{supported_features:135,[attribute]:expected}}}}},{attribute,expected});
 await expect(page.getByRole('button',{name:'Band',exact:true})).toHaveAttribute('aria-pressed','true');expect(await page.evaluate(()=>(window as any).el.busy)).toBe(false);
});
test('explicit 30/70 executes only verified tilt and matches native attribute, not picture',async({page})=>{
 await setup(page,cfg([command()])); const button=page.getByRole('button',{name:'Band',exact:true}); await expect(button).toBeEnabled(); await button.click();
 await expect.poll(()=>page.evaluate(()=>(window as any).calls)).toEqual([['cover','set_cover_tilt_position',{entity_id:entities[2],tilt_position:30}]]);
 await page.evaluate(()=>{const w=window as any; w.hass={...w.hass,states:{...w.hass.states,'cover.example_right':{state:'open',attributes:{current_position:90,current_tilt_position:30,supported_features:128}}}};w.el.hass=w.hass});
 await expect(button).toHaveAttribute('aria-pressed','true'); expect(await page.evaluate(()=>(window as any).el.busy)).toBe(false); await button.click(); expect(await page.evaluate(()=>(window as any).calls.length)).toBe(1);
 await expect(page.locator('[title],[role=status],[role=alert]')).toHaveCount(0); expect((await button.innerText()).trim()).toBe('');
});
test('implicit band blocked; explicit partial target ignores other unavailable covers but fails closed for missing native attribute',async({page})=>{
 await setup(page,cfg()); await expect(page.getByRole('button')).toBeDisabled();
 await page.evaluate(config=>{const w=window as any;w.el.setConfig(config);delete w.hass.states['cover.example_left']; delete w.hass.states['cover.example_right'].attributes.current_position;w.el.hass={...w.hass}},cfg([command()]));
 await expect(page.getByRole('button')).toBeEnabled();
 await page.evaluate(()=>{const w=window as any;delete w.hass.states['cover.example_right'].attributes.current_tilt_position;w.el.hass={...w.hass,states:{...w.hass.states,'cover.example_right':{...w.hass.states['cover.example_right']}}}});
 await expect(page.getByRole('button')).toBeDisabled(); expect(await page.evaluate(()=>(window as any).calls)).toEqual([]);
});
test('explicit config rejects empty commands, duplicate axes, extra fields and invalid values before any dispatch',async({page})=>{
 await setup(page,cfg([command()]));
 const invalid:any[]=[[],[command(),command()],[command(),{service:'set_cover_position',entity_id:entities[2],position:40}],[{...command(),tilt_position:'30'}],[{...command(),tilt_position:-1}],[{...command(),tilt_position:101}],[{...command(),position:40}],[{...command(),entity_id:'cover.other'}],[{service:'stop_cover',entity_id:entities[0]}]];
 for(const commands of invalid){expect(await page.evaluate(config=>{try{(window as any).el.setConfig(config);return false}catch{return true}},cfg(commands))).toBe(true)}
 expect(await page.evaluate(()=>(window as any).calls)).toEqual([]);
});
for (const alias of ['commands','actions']) test(`picture editor preserves legacy ${alias} without exposing manual override controls`,async({page})=>{
 const config:any=cfg();config.presets[0][alias]=[command()];
 await setup(page,config,true); await page.getByRole('button',{name:'Edit Band'}).click();
 await expect(page.locator('[data-script], [data-command], [data-command-preview]')).toHaveCount(0);
 await expect(page.getByRole('button',{name:/Copy commands|Remove override/})).toHaveCount(0);
 await change(page,'[data-position="0"]',{top:20,bottom:80});
 await page.getByRole('button',{name:'Cancel',exact:true}).click();
 expect(await page.evaluate(()=>(window as any).changes)).toEqual([]);
 await page.getByRole('button',{name:'Edit Band'}).click();
 await change(page,'[data-position="0"]',{top:20,bottom:80});
 await page.getByRole('button',{name:'Save',exact:true}).click();
 const saved=await page.evaluate(()=>(window as any).changes.at(-1));
 expect(saved.presets[0][alias]).toEqual([command()]);
 expect(saved.presets[0].positions[0]).toEqual({top:20,bottom:80});
 expect(await page.evaluate(()=>(window as any).calls)).toEqual([]);
 expect(await page.evaluate(()=>(window as any).reads)).toEqual([]);
});
test('explicit native plan preserves command order, validates all capabilities before dispatch, skips matched entities',async({page})=>{
 await setup(page,cfg([command(entities[2],30),command(entities[0],70),command(entities[1],0)]));
 await page.evaluate(()=>{const w=window as any;w.hass.states['cover.example_left'].attributes.supported_features=0;w.el.hass={...w.hass};w.el.activate(w.el.config.presets[0],new MouseEvent('click'))});
 expect(await page.evaluate(()=>(window as any).calls)).toEqual([]);
 await page.evaluate(()=>{const w=window as any;w.el.hass=w.hass={...w.hass,states:{...w.hass.states,'cover.example_left':{state:'open',attributes:{current_tilt_position:0,supported_features:128}}}}}); await page.getByRole('button',{name:'Band',exact:true}).click();
 await expect.poll(()=>page.evaluate(()=>(window as any).calls)).toEqual([['cover','set_cover_tilt_position',{entity_id:entities[2],tilt_position:30}],['cover','set_cover_tilt_position',{entity_id:entities[0],tilt_position:70}]]);
});
test('explicit ACK never means arrival, moving reports do not confirm; timeout and late ACK silent',async({page})=>{
 await setup(page,cfg([command()])); await page.clock.install();
 await page.evaluate(()=>{const w=window as any;w.waiters=[];w.hass.callService=(...a:any[])=>{w.calls.push(a);return new Promise((resolve,reject)=>w.waiters.push({resolve,reject}))}});
 const b=page.getByRole('button',{name:'Band',exact:true}); await b.click();
 await page.evaluate(()=>{const w=window as any;w.waiters[0].resolve()}); await expect(b).toHaveAttribute('aria-pressed','false'); expect(await page.evaluate(()=>(window as any).el.busy)).toBe(false);
 await page.evaluate(()=>{const w=window as any;w.el.hass=w.hass={...w.hass,states:{...w.hass.states,'cover.example_right':{state:'opening',attributes:{current_position:0,current_tilt_position:30,supported_features:128}}}}});
 await expect(b).toHaveAttribute('aria-pressed','false'); await page.clock.fastForward(120001); expect(await page.evaluate(()=>(window as any).el.busy)).toBe(false);
 await page.evaluate(()=>{const w=window as any;w.el.hass=w.hass={...w.hass,states:{...w.hass.states,'cover.example_right':{state:'open',attributes:{current_position:0,current_tilt_position:0,supported_features:128}}}}}); await b.click(); await page.clock.fastForward(120001); await b.click();
 await page.evaluate(()=>{const w=window as any;w.waiters[1].reject(Error('late'))}); expect(await page.evaluate(()=>(window as any).el.busy)).toBe(true);
 await expect(page.locator('[title],[role=status],[role=alert]')).toHaveCount(0); expect((await b.innerText()).trim()).toBe('');
});
