import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import vm from 'node:vm';
import {createRequire} from 'node:module';
import {ENGINE_DIR,linkProject} from '../tools/project.mjs';
import {findChrome} from '../tools/bins.mjs';

const styles=fs.readdirSync(path.join(ENGINE_DIR,'styles')).filter(id=>fs.existsSync(path.join(ENGINE_DIR,'styles',id,'kit.js')));
function styleOf(id){const ctx={};ctx.window=ctx;vm.runInNewContext(fs.readFileSync(path.join(ENGINE_DIR,'styles',id,'style.js'),'utf8'),ctx);return ctx.STYLE;}
const hue=hex=>{const [r,g,b]=hex.slice(1).match(/../g).map(v=>parseInt(v,16)/255),max=Math.max(r,g,b),min=Math.min(r,g,b),d=max-min;if(!d)return -1;let h=max===r?(g-b)/d:max===g?(b-r)/d+2:(r-g)/d+4;return (h*60+360)%360;};
const luminance=hex=>hex.slice(1).match(/../g).map(v=>parseInt(v,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0);
async function bounded(promise, ms, message) {
  let timer;
  try { return await Promise.race([promise, new Promise((_, reject) => {timer=setTimeout(()=>reject(new Error(message)),ms);})]); }
  finally {clearTimeout(timer);}
}
// The engine's tools also bound close(): Chromium may have exited while Playwright still awaits its reply.
async function closeBrowser(browser) {try {await bounded(browser.close(),5000,'browser close timed out');} catch {}}

test('named colours keep their meaning and body ink is readable in every new style',()=>{
  assert.equal(styles.length,25);
  for(const id of styles){const {palette:p}=styleOf(id),h={};for(const c of ['red','orange','yellow','green','blue','purple'])h[c]=hue(p[c]);
    assert.ok(h.red<30||h.red>320,`${id}: red became ${p.red}`);
    assert.ok(h.blue>=180&&h.blue<=260,`${id}: blue became ${p.blue}`);
    assert.ok(h.green>=80&&h.green<=180,`${id}: green became ${p.green}`);
    assert.ok(h.orange>=10&&h.orange<50,`${id}: orange became ${p.orange}`);
    const a=luminance(p.ink),b=luminance(p.paper);assert.ok((Math.max(a,b)+.05)/(Math.min(a,b)+.05)>=4.5,`${id}: ink is illegible on paper`);
  }
});

test('boot loads each native kit and source assets with empty META.extras on file URLs',async(t)=>{
  const {chromium}=createRequire(import.meta.url)('playwright-core');
  const browser=await chromium.launch({executablePath:findChrome()});
  const page=await browser.newPage({viewport:{width:1920,height:1080}});
  const temp=fs.mkdtempSync(path.join(os.tmpdir(),'frametell-native-'));
  let errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('requestfailed',r=>errors.push(r.url()));
  try{for(const id of styles){
    errors=[];const dir=path.join(temp,id);fs.cpSync(path.join(ENGINE_DIR,'styles',id,'example'),dir,{recursive:true});linkProject(dir);
    await page.goto('file://'+path.join(dir,'index.html')+'?render');await bounded(page.evaluate(()=>window.__ready),30000,`${id} did not become ready`);
    const names=[...fs.readFileSync(path.join(ENGINE_DIR,'styles',id,'kit.js'),'utf8').matchAll(/B\.(\w+) = function/g)].map(m=>m[1]);
    const result=await page.evaluate(names=>{ENGINE.renderAt(6);return{missing:names.filter(n=>typeof PV.Builder.prototype[n]!=='function'),material:STYLE.material,marks:document.querySelectorAll('[data-material]').length,native:STYLE.renderer?.id,renderers:ENGINE.pages.map(p=>p.sh.native?.renderer)};},names);
    assert.deepEqual(errors,[],`${id} assets or runtime failed`);assert.deepEqual(result.missing,[],`${id} kit was not loaded`);
    assert.ok(result.material,`${id}: no renderer selected`);
    if(result.native)assert.ok(result.renderers.every(r=>r===result.native),`${id}: native backend did not mount`);
    t.diagnostic(`${id}: kit, assets and rendering passed`);
  }}finally{await closeBrowser(browser);fs.rmSync(temp,{recursive:true,force:true});}
});

test('a native kit explicitly requested in META.extras loads once with its dependencies',async()=>{
  const {chromium}=createRequire(import.meta.url)('playwright-core');
  const browser=await chromium.launch({executablePath:findChrome()});
  const page=await browser.newPage({viewport:{width:1920,height:1080}});
  const dir=fs.mkdtempSync(path.join(os.tmpdir(),'frametell-native-extras-'));
  const errors=[];let kitRequests=0;
  page.on('pageerror',e=>errors.push(e.message));
  page.on('requestfailed',r=>errors.push(r.url()));
  page.on('request',r=>{if(r.url().endsWith('/styles/metro/kit.js'))kitRequests++;});
  try{
    fs.cpSync(path.join(ENGINE_DIR,'styles/metro/example'),dir,{recursive:true});
    fs.appendFileSync(path.join(dir,'script.js'),"\nSCRIPT.META.extras = ['engine/styles/metro/kit.js'];\n");
    linkProject(dir);
    await page.goto('file://'+path.join(dir,'index.html')+'?render');
    await bounded(page.evaluate(()=>window.__ready),30000,'metro extras did not become ready');
    const available=await page.evaluate(()=>{ENGINE.renderAt(6);return typeof PV.Builder.prototype.metroRoute==='function'&&typeof PV.Studio.metroRoute==='function';});
    assert.deepEqual(errors,[]);
    assert.equal(available,true);
    assert.equal(kitRequests,1);
  }finally{await closeBrowser(browser);fs.rmSync(dir,{recursive:true,force:true});}
});
