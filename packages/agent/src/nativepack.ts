import fs from 'node:fs';
import path from 'node:path';
import { ENGINE_DIR } from '@frametell/engine/tools/project.mjs';

interface NativeRenderer { id: string; upstream: string; grammar: string | null; selectedHere: boolean }
export function nativeRenderer(style: string): NativeRenderer | undefined {
  const file = path.join(ENGINE_DIR, 'native/renderers.json');
  if (!fs.existsSync(file)) return undefined;
  return (JSON.parse(fs.readFileSync(file, 'utf8')) as Record<string, NativeRenderer>)[style];
}
export function nativePack(style: string): string | undefined {
  const renderer = nativeRenderer(style);
  if (!renderer) return undefined;
  const parts = [`# Native renderer: ${renderer.id} (${renderer.upstream})`, renderer.selectedHere ? 'This backend was selected for this fork; it is not claimed to be the hosted Frametell implementation.' : 'The upstream project provides this drawing backend.'];
  if (renderer.grammar) parts.push('# Original source style contract', fs.readFileSync(path.join(ENGINE_DIR, renderer.grammar), 'utf8'));
  const api = path.join(ENGINE_DIR, 'native/api', renderer.id + '.md');
  if (fs.existsSync(api)) parts.push(fs.readFileSync(api, 'utf8'));
  const sample = path.join(ENGINE_DIR, 'styles', style, 'example/pages/p01.js');
  if (fs.existsSync(sample)) parts.push('# Native integration example\n```js\n' + fs.readFileSync(sample, 'utf8') + '\n```');
  return parts.join('\n\n');
}
