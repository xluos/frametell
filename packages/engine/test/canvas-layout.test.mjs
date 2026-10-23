import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { createProject } from '../tools/project.mjs';
import { findChrome } from '../tools/bins.mjs';

test('native HTML lettering counts as visible ink while empty containers remain blank', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'frametell-native-html-'));
  try {
    createProject(dir, {style:'chat',title:'Native HTML visibility'});
    fs.writeFileSync(path.join(dir,'script.js'), `globalThis.SCRIPT={META:{style:'chat',gap:.5},PAGES:['p01','p02','p03'].map(id=>({id,cues:['A real native chat message stays visible.']}))};`);
    for (const id of ['p01','p02','p03']) fs.writeFileSync(path.join(dir,'pages',id+'.js'), `ENGINE.visual('${id}',P=>P.nativeScene((N,host)=>{
      ${id === 'p02' ? `const empty=document.createElement('div');empty.style.cssText='width:900px;height:900px';host.root.appendChild(empty);return ()=>{};` : `const chat=N.create(host,{characters:[{id:'a',side:'left',name:'A'}],elements:[{id:'visible',type:'bubble',from:'a',text:'原生文字持续可见',start_ms:-1000,duration_ms:host.duration*1000+3000,camera_mode:'bubble'}]});return {render:t=>chat.renderAt(t*1000),dispose:()=>chat.dispose()};`}
    }));`);
    const stdout=execFileSync(process.execPath,['engine/tools/lint.mjs','--json'],{cwd:dir,encoding:'utf8',timeout:60000,env:{...process.env,CHROME_PATH:findChrome()}});
    const issues=JSON.parse(stdout.trim().split('\n').at(-1));
    assert.deepEqual(issues.filter(i=>i.kind.startsWith('empty-')).map(i=>[i.page,i.kind]),[
      ['p02','empty-opening'],['p02','empty-ending'],
    ]);
  } finally {fs.rmSync(dir,{recursive:true,force:true});}
});

test('transparent drawing canvases do not hide empty page openings or endings', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'frametell-canvas-layout-'));
  try {
    createProject(dir, { style: 'study', title: 'Canvas checks' });
    fs.writeFileSync(path.join(dir, 'script.js'), `globalThis.SCRIPT = {
      META: { style: 'study', gap: .5 },
      PAGES: ['p01', 'p02', 'p03'].map(id => ({ id, cues: ['A visible page should not become blank.'] })),
    };`);
    for (const [id, visible] of [
      ['p01', 't < P.endT - .3'],
      ['p02', 't > .8'],
      ['p03', 'true'],
    ]) {
      fs.writeFileSync(path.join(dir, 'pages', `${id}.js`), `ENGINE.visual('${id}', P => {
        P.canvas(0, 0, 1920, 1080, (ctx, t) => {
          if (${visible}) {
            ctx.fillStyle = '#245a8d';
            ctx.fillRect(200, 240, 1500, 580);
          }
        });
      });`);
    }
    const stdout = execFileSync(process.execPath, ['engine/tools/lint.mjs', '--json'], {
      cwd: dir, encoding: 'utf8', timeout: 60000, env: { ...process.env, CHROME_PATH: findChrome() },
    });
    const issues = JSON.parse(stdout.trim().split('\n').at(-1));
    assert.deepEqual(issues.filter(i => i.kind.startsWith('empty-')).map(i => [i.page, i.kind]), [
      ['p01', 'empty-ending'], ['p02', 'empty-opening'],
    ]);
    assert.equal(issues.some(i => i.page === 'p03'), false, 'painted canvas remains valid visible content');
  } finally { fs.rmSync(dir, { recursive: true, force: true }); }
});

test('native crayon rings and underlines check glyph centres, with jitter and decorative strokes allowed', () => {
  const dir=fs.mkdtempSync(path.join(os.tmpdir(),'frametell-annotation-'));
  try {
    createProject(dir,{style:'crayon',title:'Annotation alignment'});
    fs.writeFileSync(path.join(dir,'script.js'),`globalThis.SCRIPT={META:{style:'crayon'},PAGES:[{id:'p01',cues:['Check actual glyph bounds and annotation centres.']}]};`);
    fs.writeFileSync(path.join(dir,'pages/p01.js'),`ENGINE.visual('p01',P=>{
      P.crayonScene((D,t)=>{
        const oval=(x,y)=>Array.from({length:37},(_,i)=>[x+Math.cos(i/36*Math.PI*2)*103,y+Math.sin(i/36*Math.PI*2)*65]);
        D.text('1/4',400-69,400+23,{size:70});
        D.line(oval(400,400),{sw:3});
        D.line([[335,442],[466,442]],{sw:7});
        D.label('1/4',900,400,{size:70,ring:true,underline:true,rx:103,ry:65});
        D.text('1/4',1400-69,400+23,{size:70});
        D.line(oval(1400,400),{sw:3,decorative:true});
        D.text('1/4',400-69,700+23,{size:70,reveal:.7});
        D.line(oval(400,700),{sw:3});
        D.text('1/4',900+3,700+23,{size:70});
        D.line(oval(900,700),{sw:3});
        D.circle(1450,700,110,{fill:'blue'});
        D.text('1/4',1381,723,{size:70});
      },{at:-1});
    });`);
    const stdout=execFileSync(process.execPath,['engine/tools/check.mjs','--only','p01','--sheet','alignment','--determinism','1.4','2.2'],{cwd:dir,encoding:'utf8',timeout:90000,env:{...process.env,CHROME_PATH:findChrome()}});
    const out=JSON.parse(stdout.trim().split('\n').at(-1));
    assert.equal(out.crash,undefined);assert.equal(out.lintComplete,true);
    const errors=out.issues.filter(i=>i.kind==='alignment');
    assert.equal(errors.length,2,JSON.stringify(errors));
    assert.deepEqual(errors.map(i=>i.data.mark).sort(),['ring','underline']);
    assert.ok(errors.every(i=>i.level==='error'&&Math.abs(i.data.dx)>55));
    assert.ok(fs.existsSync(path.join(dir,out.details)),'review gets enlarged annotation details');
  } finally {fs.rmSync(dir,{recursive:true,force:true});}
});

test('plain Canvas text and stroked ellipses also participate in alignment checks', () => {
  const dir=fs.mkdtempSync(path.join(os.tmpdir(),'frametell-canvas-text-'));
  try {
    createProject(dir,{style:'study'});
    fs.writeFileSync(path.join(dir,'script.js'),`globalThis.SCRIPT={META:{style:'study'},PAGES:[{id:'p01',cues:['Canvas annotations should share their text centre.']}]};`);
    fs.writeFileSync(path.join(dir,'pages/p01.js'),`ENGINE.visual('p01',P=>{P.canvas(0,0,1920,1080,ctx=>{
      ctx.font='70px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
      ctx.fillText('1/4',331,400);ctx.beginPath();ctx.ellipse(400,400,103,65,0,0,Math.PI*2);ctx.stroke();
      ctx.fillText('1/4',900,400);ctx.beginPath();ctx.ellipse(900,400,103,65,0,0,Math.PI*2);ctx.stroke();
      ctx.fillText('1/4',1331,400);ctx.beginPath();ctx.ellipse(1400,400,103,65,0,0,Math.PI*2);ctx.fill();ctx.stroke();
    });});`);
    const stdout=execFileSync(process.execPath,['engine/tools/lint.mjs','--json'],{cwd:dir,encoding:'utf8',timeout:60000,env:{...process.env,CHROME_PATH:findChrome()}});
    const errors=JSON.parse(stdout.trim().split('\n').at(-1)).filter(i=>i.kind==='alignment');
    assert.equal(errors.length,1,JSON.stringify(errors));
    assert.ok(Math.abs(errors[0].data.dx)>60);
  } finally {fs.rmSync(dir,{recursive:true,force:true});}
});

test('a timed out layout check explicitly reports incomplete instead of passing with an empty list',()=>{
  const dir=fs.mkdtempSync(path.join(os.tmpdir(),'frametell-lint-timeout-'));
  try {
    createProject(dir,{style:'study'});
    const stdout=execFileSync(process.execPath,['engine/tools/check.mjs','--only','p01','--sheet','timeout','--lint-ms','1','1.0'],{cwd:dir,encoding:'utf8',timeout:60000,env:{...process.env,CHROME_PATH:findChrome()}});
    const out=JSON.parse(stdout.trim().split('\n').at(-1));
    assert.equal(out.crash,undefined);assert.equal(out.lintComplete,false);assert.ok(out.sheet);
  } finally {fs.rmSync(dir,{recursive:true,force:true});}
});
