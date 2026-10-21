import { test, expect } from '@playwright/test';
const config = { type:'custom:kiosk-air-card',aqhi_entity:'sensor.example_smoke',category_entity:'sensor.example_category',source_entity:'sensor.example_pm25',regional_entity:'sensor.example_regional',data_expected_entity:'sensor.example_expected',location:'Patio' };
const state=(entity_id:string,state:string,attributes:any={})=>({entity_id,state,attributes,last_updated:new Date().toISOString()});
const metadata={index_type:'canadian_aqhi_smoke_pm25',scope:'local_pm25_only_estimate',status:'valid',source_entity:config.source_entity,source_max_age_minutes:15,source_last_reported:new Date().toISOString(),evaluated_at:new Date().toISOString()};
async function mount(page:any){
 await page.goto('/tests/harness.html');await page.waitForFunction(()=>(window as any).ready);
 await page.evaluate(config=>{const w=window as any;w.calls=[];w.events=[];document.addEventListener('hass-more-info',(e:any)=>w.events.push(e.detail));w.card=document.createElement('kiosk-air-card');w.card.setConfig(config);document.querySelector('#mount')!.append(w.card);},config);
}
async function update(page:any,value='3',category='low',pm='20',regional='2.9',extra:any={}){
 const states={ 'sensor.example_smoke':state('sensor.example_smoke',value,metadata),'sensor.example_category':state('sensor.example_category',category),'sensor.example_pm25':state('sensor.example_pm25',pm),'sensor.example_regional':state('sensor.example_regional',regional,{location:'Example city',attribution:'Data provided by Environment Canada'}),...extra };
 await page.evaluate(states=>{const w=window as any;w.card.hass={states,callService:async(...a:any[])=>w.calls.push(a)};},states);
}
test('native Canadian smoke bands and 10+ display never use the US six-category scale',async({page})=>{
 await mount(page);
 for(const [n,key,label] of [['1','low','Low risk'],['3','low','Low risk'],['4','moderate','Moderate risk'],['6','moderate','Moderate risk'],['7','high','High risk'],['10','high','High risk'],['11','very_high','Very high risk']]){
  await update(page,n,key);await expect(page.locator('[part="category"]')).toHaveText(label);await expect(page.locator('[part="aqhi"]')).toHaveText((n==='11'?'10+':n)+' AQHI');
  await expect(page.locator('[part="regional-category"]')).toHaveText('Low risk');await expect(page.locator('[part="regional-aqhi"]')).toHaveText('3 AQHI');
  expect(await page.locator('[part="segment"]').count()).toBe(4);expect(await page.locator('[part="segment"].selected').count()).toBe(1);
 }
 await update(page);await expect(page.locator('[part="interpretation"]')).toHaveText('Low particle levels around your home.');
 await expect(page.getByRole('button',{name:'Outside air: local Canadian smoke history'})).toHaveAttribute('title',/PM2.5-only.*not.*full regional/);
});
for(const width of [320,360,374,400,600])test(`compact local summary ${width}px retains the crop without footer noise`,async({page})=>{
 await page.setViewportSize({width,height:800});await mount(page);await page.evaluate(width=>{document.querySelector<HTMLElement>('#mount')!.style.width=width+'px'},width);
 await page.evaluate(()=>{const w=window as any;const {regional_entity,...config}=w.card.config;w.card.setConfig(config)});
 await update(page,'1','low');
 const geometry=await page.locator('[part="surface"]').evaluate(e=>{const s=e.getRootNode() as ShadowRoot,r=(selector:string)=>s.querySelector(selector)!.getBoundingClientRect();return {height:e.getBoundingClientRect().height,overflow:e.scrollWidth>e.clientWidth,aqhi:r('[part="aqhi"]'),category:r('[part="category"]')}});
 expect(geometry.height).toBeLessThanOrEqual(184);expect(geometry.height).toBeGreaterThanOrEqual(164);expect(geometry.overflow).toBe(false);
 expect(geometry.category.top).toBeLessThan(geometry.aqhi.bottom);expect(geometry.category.left).toBeGreaterThanOrEqual(geometry.aqhi.right);
 await expect(page.locator('.primary-details')).toHaveCount(0);await expect(page.locator('.provenance')).toHaveCount(0);await expect(page.locator('[part="interpretation"]')).toHaveText('Low particle levels around your home.');
 await expect(page.locator('[part="title"]')).toHaveText('Outside air');await expect(page.locator('[part="detail"]')).toHaveText('Patio');expect(await page.locator('[part="segment"]').count()).toBe(4);
});
for(const width of [320,360,374,400,600])test(`compact ${width}px high risk and long identity wrap without clipping`,async({page})=>{
 await page.setViewportSize({width,height:1100});await mount(page);
 await page.evaluate(width=>{const w=window as any;document.querySelector<HTMLElement>('#mount')!.style.width=width+'px';const {regional_entity,...config}=w.card.config;w.card.setConfig({...config,name:'Outside air and local particle conditions',location:'Covered patio beside the garden entrance'});},width);
 for(const [n,key] of [['11','very_high'],['6','moderate'],['unknown','unknown'],['unavailable','unavailable']]){
  await update(page,n,key);await page.locator('[part="category"]').waitFor();
  const fit=await page.locator('[part="surface"]').evaluate(e=>{const s=e.getRootNode() as ShadowRoot,r=e.getBoundingClientRect();return [...s.querySelectorAll('[part="title"],[part="detail"],[part="aqhi"],[part="category"],[part="interpretation"],.labels')].map(el=>{const b=el.getBoundingClientRect();return {part:el.getAttribute('part')||el.className,contained:b.left>=r.left&&b.right<=r.right&&b.bottom<=r.bottom,sw:el.scrollWidth,cw:el.clientWidth,sh:el.scrollHeight,ch:el.clientHeight,clipsY:getComputedStyle(el).overflowY==='hidden'}}).filter(el=>!el.contained||el.sw>el.cw||(el.clipsY&&el.sh>el.ch))});
  expect(fit).toEqual([]);
 }
 expect(await page.evaluate(()=>(window as any).calls)).toEqual([]);
});
test('live partial availability, invalid data, warmup and stale branches clear retained local values',async({page})=>{
 await mount(page);
 const old=new Date(Date.now()-121*60000).toISOString();
 for(const [n,cat,pm,label,extra] of [
  ['3','low','unavailable','Unavailable',{}],['unavailable','low','2','Unavailable',{}],['3','unavailable','2','Unavailable',{}],
  ['unknown','unknown','2','Unknown',{}],['3','low','unknown','Unknown',{}],['3','moderate','2','Updating',{}],
  ['0','low','2','Unknown',{}],['-1','low','2','Unknown',{}],['3.5','low','2','Unknown',{}],['12','very_high','2','Unknown',{}],['7bad','high','2','Unknown',{}],['','low','2','Unknown',{}],
  ['3','good','2','Unknown',{}],['3','low','-1','Unknown',{}],
  ['unknown','unknown','2','Warming up',{'sensor.example_expected':state('sensor.example_expected',new Date(Date.now()+60*60000).toISOString())}],
  ['3','low','2','Stale',{'sensor.example_smoke':state('sensor.example_smoke','3',{...metadata,source_last_reported:old})}],
  ['3','low','2','Stale',{'sensor.example_smoke':state('sensor.example_smoke','3',{...metadata,evaluated_at:old})}],
 ] as const){
  await update(page,n,cat,pm,'2.9',extra);await expect(page.locator('[part="category"]')).toHaveText(label);await expect(page.locator('[part="aqhi"]')).toHaveText('— AQHI');
  expect(await page.locator('[part="segment"].selected').count()).toBe(0);await expect(page.locator('[part="regional-category"]')).toHaveText('Low risk');
 }
 await update(page,'1','low','0');await expect(page.locator('[part="aqhi"]')).toHaveText('1 AQHI');
 await update(page,'3','low','2','unavailable');await expect(page.locator('[part="category"]')).toHaveText('Low risk');await expect(page.locator('[part="regional-category"]')).toHaveText('Unavailable');
});
test('native backend history and source validity flags are respected independently of HA state',async({page})=>{
 await mount(page);
 for(const [status,label] of [['source_stale','Stale'],['incomplete_history','Warming up'],['history_unavailable','Unavailable'],['source_invalid','Unknown']]){
  await update(page,'unknown','unknown','2','2.9',{'sensor.example_smoke':state('sensor.example_smoke','unknown',{...metadata,status})});await expect(page.locator('[part="category"]')).toHaveText(label);await expect(page.locator('[part="regional-category"]')).toHaveText('Low risk');
 }
 await update(page,'3','low','2','2.9',{'sensor.example_smoke':state('sensor.example_smoke','3',{...metadata,source_last_reported:new Date(Date.now()-16*60000).toISOString()})});await expect(page.locator('[part="category"]')).toHaveText('Stale');
 await update(page,'3','low','2','2.9',{'sensor.example_smoke':state('sensor.example_smoke','3',{...metadata,source_entity:'sensor.other_pm25'})});await expect(page.locator('[part="category"]')).toHaveText('Unknown');
});
test('US AQI or unspecified source metadata cannot be relabelled as Canadian',async({page})=>{
 await mount(page);
 for(const attributes of [{},{index_type:'us_aqi',scope:'local_pm25_only_estimate'},{index_type:'canadian_aqhi_smoke_pm25',scope:'regional'}]){
  await update(page,'3','low','2','2.9',{'sensor.example_smoke':state('sensor.example_smoke','3',attributes)});await expect(page.locator('[part="category"]')).toHaveText('Unknown');
 }
});
test('regional XML decimals follow public integer reporting without gaps or score conversion',async({page})=>{
 await mount(page);
 for(const [raw,value,label] of [['2.9','3','Low risk'],['3.49','3','Low risk'],['3.5','4','Moderate risk'],['6.49','6','Moderate risk'],['6.5','7','High risk'],['10','10','High risk'],['10.49','10','High risk'],['10.5','10+','Very high risk'],['11','10+','Very high risk'],['10+','10+','Very high risk'],['unknown','—','Unknown'],['-1','—','Unknown']]){
  await update(page,'3','low','2',raw);await expect(page.locator('[part="regional-aqhi"]')).toHaveText(value+' AQHI');await expect(page.locator('[part="regional-category"]')).toHaveText(label);await expect(page.locator('[part="category"]')).toHaveText('Low risk');
 }
});
test('backend-certified unchanged zero and positive reports survive old frontend timestamps',async({page})=>{
 await mount(page);
 const old=new Date(Date.now()-121*60000).toISOString(),now=new Date().toISOString();
 for(const pm of ['0','20']){
  await update(page,'1','low',pm,'2.9',{
   'sensor.example_pm25':{...state('sensor.example_pm25',pm),last_changed:old,last_updated:old},
   'sensor.example_smoke':{...state('sensor.example_smoke','1',{...metadata,status:'valid',source_entity:config.source_entity,source_max_age_minutes:15,source_last_reported:now,evaluated_at:now}),last_updated:old},
  });
  await expect(page.locator('[part="category"]')).toHaveText('Low risk');
 }
});
test('certified reports age without updates and disconnect cleanup',async({page})=>{
 await page.clock.install();await mount(page);
 const old=new Date(Date.now()-121*60000).toISOString();
 await update(page,'3','low','0','2.9',{'sensor.example_pm25':{...state('sensor.example_pm25','0'),last_changed:old,last_updated:old}});
 await expect(page.locator('[part="category"]')).toHaveText('Low risk');
 await page.clock.fastForward(16*60000);await expect(page.locator('[part="category"]')).toHaveText('Stale');
 await page.evaluate(()=>{const w=window as any;w.renders=0;w.card.addController({hostUpdated(){w.renders++}});w.card.remove()});await page.clock.fastForward(60000);expect(await page.evaluate(()=>(window as any).renders)).toBe(0);
});
test('backend evaluation independently ages even with a new source certification',async({page})=>{
 await page.clock.install();await mount(page);await update(page);
 await expect(page.locator('[part="category"]')).toHaveText('Low risk');
 await page.clock.fastForward(121*60000);
 await page.evaluate(()=>{const w=window as any,s=w.card.hass.states;w.card.hass={states:{...s,'sensor.example_smoke':{...s['sensor.example_smoke'],attributes:{...s['sensor.example_smoke'].attributes,source_last_reported:new Date().toISOString()}}}}});
 await expect(page.locator('[part="category"]')).toHaveText('Stale');
 await expect(page.locator('[part="aqhi"]')).toHaveText('— AQHI');
});
test('missing and future timestamps and missing observations fail closed',async({page})=>{
 await mount(page);
 for(const field of ['source_last_reported','evaluated_at'])for(const timestamp of [undefined,'invalid','2026','2026-02-30T12:00:00Z',new Date(Date.now()+5*60000).toISOString()]){
  await update(page,'3','low','2','2.9',{'sensor.example_smoke':state('sensor.example_smoke','3',{...metadata,[field]:timestamp})});await expect(page.locator('[part="category"]')).toHaveText('Unknown');
 }
 for(const field of ['source_entity','source_max_age_minutes','status'])for(const value of [undefined,null,'',0,-1,Infinity,'15']){
  await update(page,'3','low','2','2.9',{'sensor.example_smoke':state('sensor.example_smoke','3',{...metadata,[field]:value})});await expect(page.locator('[part="category"]')).toHaveText('Unknown');
 }
 await update(page,'3','low','2','2.9',{'sensor.example_category':undefined});await expect(page.locator('[part="category"]')).toHaveText('Unavailable');
});
for(const width of [320,360,400,600])test(`Canadian air ${width}px fit, touch, keyboard and exact native details`,async({page},info)=>{
 await page.setViewportSize({width,height:1100});await mount(page);await page.evaluate(width=>{document.querySelector<HTMLElement>('#mount')!.style.width=width+'px'},width);
 for(const [n,key] of [['3','low'],['6','moderate'],['10','high'],['11','very_high'],['unknown','unknown'],['unavailable','unavailable']]){
  await update(page,n,key);await page.locator('[part="category"]').waitFor();
  const bounds=await page.locator('[part="surface"]').evaluate(e=>{const s=e.getRootNode() as ShadowRoot;return {width:e.getBoundingClientRect().width,overflow:e.scrollWidth>e.clientWidth,buttons:[...s.querySelectorAll('button')].map(b=>({w:b.getBoundingClientRect().width,h:b.getBoundingClientRect().height})),icon:s.querySelector('[part="icon-circle"]')!.getBoundingClientRect().width}});
  expect(bounds.width).toBe(width);expect(bounds.overflow).toBe(false);expect(bounds.icon).toBe(38);for(const b of bounds.buttons){expect(b.w).toBeGreaterThanOrEqual(44);expect(b.h).toBeGreaterThanOrEqual(44)}
 }
 await update(page);await page.getByRole('button',{name:'Outside air: local Canadian smoke history'}).focus();await page.keyboard.press('Enter');await page.keyboard.press('Space');await page.getByRole('button',{name:'Details: regional AQHI history'}).click();
 expect(await page.evaluate(()=>(window as any).events)).toEqual([{entityId:config.aqhi_entity},{entityId:config.aqhi_entity},{entityId:config.regional_entity}]);expect(await page.evaluate(()=>(window as any).calls)).toEqual([]);
 await page.screenshot({path:info.outputPath(`air-${width}.png`)});
});
test('optional regional observation is omitted rather than invented',async({page})=>{
 await mount(page);await update(page);
 await page.evaluate(()=>{const w=window as any;const {regional_entity,...config}=w.card.config;w.card.setConfig(config)});
 await expect(page.locator('[part="regional-category"]')).toHaveCount(0);await expect(page.getByRole('button')).toHaveCount(1);
 expect(await page.evaluate(()=>(window as any).card.getGridOptions())).toEqual({columns:12,rows:'auto',min_columns:6});
});
test('native editor includes Canadian observations only; configuration and read-only actions fail closed',async({page})=>{
 await mount(page);await update(page);
 const proof=await page.evaluate(async config=>{
  const w=window as any,editor=await w.card.constructor.getConfigElement();editor.setConfig({...config,grid_options:{columns:12,rows:'auto'}});editor.hass=w.card.hass;document.querySelector('#mount')!.append(editor);await editor.updateComplete;const form=editor.shadowRoot.querySelector('ha-form');
  const errors=[];for(const patch of [{aqhi_entity:'light.example'},{category_entity:''},{source_entity:undefined},{regional_entity:'switch.example'},{stale_after_minutes:0},{stale_after_minutes:Infinity},{stale_after_minutes:1441}]){try{w.card.setConfig({...config,...patch});errors.push(false)}catch{errors.push(true)}}
  w.card.setConfig({...config,tap_action:{action:'perform-action',perform_action:'light.turn_on'},icon_tap_action:{action:'toggle'}});
  return {names:form.schema.map((s:any)=>s.name),data:form.data,errors,stub:w.card.constructor.getStubConfig()};
 },config);
 for(const name of ['aqhi_entity','regional_entity','category_entity','source_entity','data_expected_entity','stale_after_minutes','location','name','icon','appearance'])expect(proof.names).toContain(name);
 for(const name of ['entity','interactions','dynamic','var_large'])expect(proof.names).not.toContain(name);
 expect(proof.data.grid_options).toEqual({columns:12,rows:'auto'});expect(proof.errors.every(Boolean)).toBe(true);expect(proof.stub.aqhi_entity).toMatch(/^sensor\./);
 await page.locator('[part="icon-circle"]').click();expect(await page.evaluate(()=>(window as any).calls)).toEqual([]);expect(await page.evaluate(()=>(window as any).events)).toEqual([{entityId:config.aqhi_entity}]);
});
test('compact body tap and keyboard open only native local history, with accessible scope and bands',async({page})=>{
 await mount(page);await update(page);
 await page.evaluate(()=>{const w=window as any;const {regional_entity,...config}=w.card.config;w.card.setConfig(config)});
 const target=page.getByRole('button',{name:'Outside air: local Canadian smoke history'});
 await expect(target).toHaveAttribute('aria-description',/Local PM2.5-only.*not.*full regional.*1–3.*4–6.*7–10.*10\+/);
 const box=await target.boundingBox();expect(box!.width).toBeGreaterThanOrEqual(44);expect(box!.height).toBeGreaterThanOrEqual(44);
 await target.click();await target.focus();await page.keyboard.press('Enter');await page.keyboard.press('Space');await page.keyboard.press('ArrowDown');
 expect(await page.evaluate(()=>(window as any).events)).toEqual(Array(3).fill({entityId:config.aqhi_entity}));expect(await page.evaluate(()=>(window as any).calls)).toEqual([]);
 expect(await page.evaluate(()=>(window as any).card.getCardSize())).toBe(4);
});
