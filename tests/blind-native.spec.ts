import { test, expect } from '@playwright/test';
const entities = ['cover.example_left', 'cover.example_middle', 'cover.example_right'];
const command = (entity = entities[2], value = 30) => ({service:'set_cover_tilt_position', entity_id:entity, tilt_position:value});
const cfg = (commands?: any[]) => ({type:'custom:kiosk-blind-presets-card',rows:1,columns:1,blinds:entities.map(entity=>({entity})),presets:[{id:'band',name:'Band',positions:entities.map(()=>({top:30,bottom:70})),...(commands ? {commands}: {})}]});
async function setup(page:any, config:any, editor=false) {
 await page.goto('/tests/harness.html'); await page.waitForFunction(()=>(window as any).ready);
 await page.evaluate(async ({config,editor})=>{
  const w=window as any; w.calls=[]; w.reads=[]; w.changes=[];
  if(editor) customElements.define('ha-form',class extends HTMLElement {});
  const card:any=document.createElement('kiosk-blind-presets-card');
  w.el=editor?await card.constructor.getConfigElement():card;
  w.hass={states:Object.fromEntries(config.blinds.map((b:any)=>[b.entity,{state:'open',attributes:{current_position:90,current_tilt_position:0,supported_features:135}}])),callService:async (...a:any[])=>{w.calls.push(a)},callWS:async (a:any)=>{w.reads.push(a); return {config:{alias:'Synthetic recipe',mode:'single',sequence:w.sequence}}}};
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
test('script import grouped Privacy actions and right-only Peep-hole copies draft, never actuates, cancel and save',async({page})=>{
 await setup(page,cfg(),true); await page.getByRole('button',{name:'Edit Band'}).click();
 expect(await page.locator('[data-script]').evaluate((e:any)=>e.schema[0].selector.entity.filter.domain)).toBe('script');
 await change(page,'[data-script]',{script:'script.example_privacy'});
 await page.evaluate(()=>{(window as any).sequence=[{action:'cover.set_cover_tilt_position',target:{entity_id:['cover.example_left','cover.example_middle','cover.example_right']},data:{tilt_position:30}}]});
 await page.getByRole('button',{name:'Copy commands'}).click();
 await expect(page.locator('[data-command-preview]')).toContainText('set_cover_tilt_position');
 expect(await page.evaluate(()=>(window as any).el.draft.commands)).toEqual(entities.map(entity=>command(entity)));
 expect(await page.evaluate(()=>(window as any).changes)).toEqual([]); expect(await page.evaluate(()=>(window as any).calls)).toEqual([]);
 await page.getByRole('button',{name:'Cancel',exact:true}).click(); await page.getByRole('button',{name:'Edit Band'}).click();
 await change(page,'[data-script]',{script:'script.example_peep_hole'}); await page.evaluate(()=>{(window as any).sequence=[{service:'cover.set_cover_position',data:{entity_id:'cover.example_right',position:40}}]});
 await page.getByRole('button',{name:'Copy commands'}).click(); await page.getByRole('button',{name:'Save',exact:true}).click();
 expect(await page.evaluate(()=>(window as any).changes.at(-1).presets[0].commands)).toEqual([{service:'set_cover_position',entity_id:entities[2],position:40}]);
 expect(await page.evaluate(()=>(window as any).changes.at(-1).presets[0].positions)).toEqual(cfg().presets[0].positions);
 expect(await page.evaluate(()=>(window as any).reads)).toEqual([{type:'script/config',entity_id:'script.example_privacy'},{type:'script/config',entity_id:'script.example_peep_hole'}]);
 expect(await page.evaluate(()=>(window as any).calls)).toEqual([]);
});
test('all unsafe sequences fail atomically without replacing existing draft or dispatching',async({page})=>{
 await setup(page,cfg([command()]),true); await page.getByRole('button',{name:'Edit Band'}).click(); await change(page,'[data-script]',{script:'script.example_privacy'});
 const valid={action:'cover.set_cover_tilt_position',target:{entity_id:entities[0]},data:{tilt_position:70}};
 const bad:any[]=[{delay:1},{choose:[]},{action:'script.example'},{action:'scene.turn_on'},{action:'shell_command.example'}, {...valid,target:{area_id:'example'}},{...valid,target:{entity_id:'cover.not_configured'}},{...valid,data:{tilt_position:'{{ 30 }}'}},{...valid,data:{tilt_position:101}},{...valid,data:{tilt_position:30,position:40}},{...valid,enabled:false},{...valid,data:{tilt_position:30,entity_id:entities[0]}},{...valid,target:{entity_id:[]}}];
 for(const step of bad){
  await page.evaluate(sequence=>(window as any).sequence=sequence,[valid,step]);
  await page.getByRole('button',{name:'Copy commands'}).click(); await expect(page.getByRole('status')).toHaveCount(1);
  expect(await page.evaluate(()=>(window as any).el.draft.commands)).toEqual([command()]);
 }
 await page.evaluate(sequence=>(window as any).sequence=sequence,[valid,{...valid,data:{tilt_position:40}}]); await page.getByRole('button',{name:'Copy commands'}).click();
 expect(await page.evaluate(()=>(window as any).el.draft.commands)).toEqual([command()]); expect(await page.evaluate(()=>(window as any).calls)).toEqual([]); expect(await page.evaluate(()=>(window as any).changes)).toEqual([]);
});
test('explicit config rejects empty commands, duplicate axes, extra fields and invalid values before any dispatch',async({page})=>{
 await setup(page,cfg([command()]));
 const invalid:any[]=[[],[command(),command()],[command(),{service:'set_cover_position',entity_id:entities[2],position:40}],[{...command(),tilt_position:'30'}],[{...command(),tilt_position:-1}],[{...command(),tilt_position:101}],[{...command(),position:40}],[{...command(),entity_id:'cover.other'}],[{service:'stop_cover',entity_id:entities[0]}]];
 for(const commands of invalid){expect(await page.evaluate(config=>{try{(window as any).el.setConfig(config);return false}catch{return true}},cfg(commands))).toBe(true)}
 expect(await page.evaluate(()=>(window as any).calls)).toEqual([]);
});
test('direct native editor saves inline only and remove override restores blocked sequential band',async({page})=>{
 await setup(page,cfg(),true); await page.getByRole('button',{name:'Edit Band'}).click();
 await change(page,'[data-command="cover.example_right"]',{service:'set_cover_position',value:40});
 await expect(page.locator('[data-command-preview]')).toContainText('40');
 await page.getByRole('button',{name:'Save',exact:true}).click();
 expect(await page.evaluate(()=>(window as any).changes.at(-1).presets[0].commands)).toEqual([{service:'set_cover_position',entity_id:entities[2],position:40}]);
 await page.getByRole('button',{name:'Edit Band'}).click(); await page.getByRole('button',{name:'Remove override',exact:true}).click(); await expect(page.getByRole('button',{name:'Save',exact:true})).toBeDisabled();
 expect(await page.evaluate(()=>(window as any).calls)).toEqual([]); expect(await page.evaluate(()=>(window as any).reads)).toEqual([]);
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
 await page.evaluate(()=>{const w=window as any;w.waiters[0].resolve()}); await expect(b).toHaveAttribute('aria-pressed','false'); expect(await page.evaluate(()=>(window as any).el.busy)).toBe(true);
 await page.evaluate(()=>{const w=window as any;w.el.hass=w.hass={...w.hass,states:{...w.hass.states,'cover.example_right':{state:'opening',attributes:{current_position:0,current_tilt_position:30,supported_features:128}}}}});
 await expect(b).toHaveAttribute('aria-pressed','false'); await page.clock.fastForward(12001); expect(await page.evaluate(()=>(window as any).el.busy)).toBe(false);
 await page.evaluate(()=>{const w=window as any;w.el.hass=w.hass={...w.hass,states:{...w.hass.states,'cover.example_right':{state:'open',attributes:{current_position:0,current_tilt_position:0,supported_features:128}}}}}); await b.click(); await page.clock.fastForward(12001); await b.click();
 await page.evaluate(()=>{const w=window as any;w.waiters[1].reject(Error('late'))}); expect(await page.evaluate(()=>(window as any).el.busy)).toBe(true);
 await expect(page.locator('[title],[role=status],[role=alert]')).toHaveCount(0); expect((await b.innerText()).trim()).toBe('');
});
