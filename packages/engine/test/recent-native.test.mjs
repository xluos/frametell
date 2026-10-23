import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {createRequire} from 'node:module';
import {ENGINE_DIR,linkProject} from '../tools/project.mjs';
import {findChrome} from '../tools/bins.mjs';

test('recent backends load offline in portrait; chat stack effects remain stable after repeated and backwards seeks', {timeout:120000}, async t => {
  const {chromium}=createRequire(import.meta.url)('playwright-core');
  const browser=await chromium.launch({executablePath:findChrome()});
  const temp=fs.mkdtempSync(path.join(os.tmpdir(),'ft-recent-native-'));
  try {
    const selected=process.env.NATIVE_STYLE_IDS?.split(',');
    for(const id of ['math','mascot','chat','metro'].filter(id=>!selected||selected.includes(id))) await t.test(id,async()=>{
      const dir=path.join(temp,id);fs.cpSync(path.join(ENGINE_DIR,'styles',id,'example'),dir,{recursive:true});
      if(id==='math') {
        const p=path.join(dir,'pages/p01.js');
        // Write may introduce a formula later; it need not be in scene.mobjects at the first seek.
        fs.writeFileSync(p,fs.readFileSync(p,'utf8').replace('scene.add(axes,curve,formula);','scene.add(axes,curve);'));
      }
      fs.cpSync(path.join(dir,'pages'),path.join(dir,'pages-portrait'),{recursive:true});linkProject(dir);
      if(id==='chat') {
        const p=path.join(dir,'pages-portrait/p02.js');fs.writeFileSync(p,fs.readFileSync(p,'utf8').replace('"type": "bubble"','"type": "stack", "repeat": 3'));
      }
      const page=await browser.newPage({viewport:{width:1080,height:1920}}),errors=[];
      page.on('pageerror',e=>errors.push(e.message));
      page.on('request',r=>{if(/^https?:/.test(r.url()))errors.push('external request: '+r.url());});
      await page.route('https://**',r=>r.abort());await page.route('http://**',r=>r.abort());
      try {
        await page.goto('file://'+path.join(dir,'index.html')+'?render&portrait');await page.evaluate(()=>window.__ready);
        const state=await page.evaluate(()=>{const p=ENGINE.pages[0];ENGINE.renderAt(p.pg.start+5);const mount=p.root.querySelector('.native-scene'),r=mount.getBoundingClientRect();return{errors:ENGINE.errors,renderer:STYLE.renderer.id,ready:typeof ENGINE.whenReady==='function',bounds:{left:r.left,top:r.top,right:r.right,bottom:r.bottom},roots:document.querySelectorAll('.native-scene').length};});
        assert.deepEqual(errors,[]);assert.deepEqual(state.errors,[]);assert.equal(state.roots,3);
        assert.ok(state.bounds.left>=-1&&state.bounds.top>=-1&&state.bounds.right<=1081&&state.bounds.bottom<=1921);
        if(id==='metro') {
          const refused=await page.evaluate(()=>{
            try {NATIVE_FACTORIES['nf-metro']().mount({},'<svg xmlns="http://www.w3.org/2000/svg"><path d="M0 0L10 10"/></svg>');return false;}
            catch(e){return e.message.includes('original CLI diagram manifest');}
          });
          assert.equal(refused,true,'a handmade SVG must not masquerade as native nf-metro output');
        }
        if(id==='math') {
          const runtime=await page.evaluate(()=>{for(let frame=0;frame<=84;frame++)ENGINE.renderAt(frame/12);return ENGINE.errors;});
          assert.deepEqual(runtime,[],'continuous formula Write must retain a stable synchronous glyph snapshot');
        }
        if(id==='chat') {
          const result=await page.evaluate(()=>{
            const p=ENGINE.pages[1],counts=[];
            for(let i=0;i<12;i++){ENGINE.renderAt(i%2?p.pg.end-.1:p.pg.start+2);ENGINE.renderAt(p.pg.start+2);counts.push(p.root.querySelector('.native-scene').shadowRoot.querySelectorAll('.msg').length);}
            return {counts,errors:ENGINE.errors};
          });
          assert.deepEqual(result.errors,[]);assert.deepEqual(result.counts,Array(12).fill(6));
        }
      } finally {await page.close();}
    });
  } finally {await browser.close();fs.rmSync(temp,{recursive:true,force:true});}
});
