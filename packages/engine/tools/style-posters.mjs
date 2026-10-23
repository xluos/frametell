// Render style thumbnails from the code shipped in the pack, never from a hosted reference film.
// node packages/engine/tools/style-posters.mjs [--only crayon,metro,mascot]
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {ENGINE_DIR,linkProject} from './project.mjs';
const index=process.argv.indexOf('--only');
const only=index>=0?new Set(process.argv[index+1].split(',')):undefined;
for(const id of fs.readdirSync(path.join(ENGINE_DIR,'styles'))){
  if(only&&!only.has(id))continue;
  const src=path.join(ENGINE_DIR,'styles',id,'example');
  if(!fs.existsSync(path.join(src,'script.js')))continue;
  const dir=fs.mkdtempSync(path.join(os.tmpdir(),'frametell-poster-'));
  try{
    fs.cpSync(src,dir,{recursive:true,filter:p=>!/[\\/](engine|engine_modules|out)$/.test(p)});linkProject(dir);
    const r=spawnSync(process.execPath,['engine/tools/snap.mjs','--sheet','poster','6'],{cwd:dir,encoding:'utf8',env:{...process.env,SNAP_LABEL:'0',SNAP_TILE:'960'},timeout:90000});
    if(r.status!==0)throw new Error(`${id} poster failed: ${r.stderr||r.error?.message||r.stdout}`);
    fs.cpSync(path.join(dir,'out/snap/poster.jpg'),path.join(ENGINE_DIR,'styles',id,'poster.jpg'));
    console.log(id);
  }finally{fs.rmSync(dir,{recursive:true,force:true});}
}
