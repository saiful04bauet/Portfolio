import { readFile, writeFile } from 'node:fs/promises';

const suppliedUrl = process.env.URL || process.env.DEPLOY_PRIME_URL;
if (suppliedUrl) {
  const parsed = new globalThis.URL(suppliedUrl);
  if (!['https:', 'http:'].includes(parsed.protocol)) throw new Error('Invalid deployment URL');
  const origin = parsed.origin;
  const file = new globalThis.URL('../dist/index.html', import.meta.url);
  const html = await readFile(file, 'utf8');
  await writeFile(file, html.replaceAll('https://saiful-ridoy.wintrycake1.chatgpt.site', origin));
  console.log('Portfolio metadata configured for the deployment origin.');
} else {
  console.log('Static portfolio ready. Deployment metadata is unchanged.');
}
