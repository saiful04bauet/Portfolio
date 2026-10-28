import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const destination = process.argv[2];
if (!destination) throw new Error('Usage: node scripts/bundle-static.mjs /absolute/output/index.html');
const mime = { svg: 'image/svg+xml', webp: 'image/webp', jpg: 'image/jpeg', otf: 'font/otf' };
const cache = new Map();
async function embedded(path) {
  if (!path.startsWith('assets/') || path.includes('..')) throw new Error('Invalid asset path');
  if (!cache.has(path)) {
    const extension = path.split('.').pop();
    if (!mime[extension]) throw new Error('Unsupported bundled asset');
    cache.set(path, `data:${mime[extension]};base64,${(await readFile(resolve(dist, path))).toString('base64')}`);
  }
  return cache.get(path);
}
let html = await readFile(resolve(dist, 'index.html'), 'utf8');
html = html.replace(/\s*<link rel="preload"[^>]+>/g, '');
for (const stylesheet of ['colors.css', 'styles.css']) {
  let css = await readFile(resolve(dist, stylesheet), 'utf8');
  for (const match of [...css.matchAll(/url\(['"]?(assets\/[^'"\)]+)['"]?\)/g)]) {
    const uri = await embedded(match[1]);
    css = css.replaceAll(match[0], () => `url('${uri}')`);
  }
  html = html.replace(`<link rel="stylesheet" href="${stylesheet}">`, () => `<style>\n${css}\n</style>`);
}
for (const match of [...html.matchAll(/(?:src|href)="(assets\/[^"#]+)"/g)]) {
  const uri = await embedded(match[1]);
  html = html.replaceAll(match[0], () => match[0].replace(match[1], uri));
}
html = html.replace('<script src="app.js" defer></script>', '');
const js = (await readFile(resolve(dist, 'app.js'), 'utf8')).replaceAll('</script', '<\\/script');
const fontLicense = (await readFile(resolve(dist, 'assets/FONT-LICENSE.txt'), 'utf8')).replaceAll('</script', '<\\/script');
html = html.replace('</body>', () => `<script>\n${js}\n</script>\n<script type="text/plain" id="font-license">${fontLicense}</script>\n</body>`);
html = html.replace(/(<meta property="og:image" content=")[^"]+(">)/, (_, before, after) => before + 'https://raw.githubusercontent.com/saiful04bauet/Portfolio/main/dist/assets/saiful-portrait.webp' + after);
if (/(?:src|href)="assets\//.test(html) || /url\(['"]?assets\//.test(html) || html.includes('src="app.js"')) throw new Error('Unbundled asset found');
if (html.includes('.pdf')) throw new Error('Unexpected PDF reference');
await mkdir(dirname(resolve(destination)), { recursive: true });
await writeFile(resolve(destination), html);
console.log(`Self-contained portfolio written: ${Buffer.byteLength(html)} bytes.`);
