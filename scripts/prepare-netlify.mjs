import { readFile, writeFile } from 'node:fs/promises';

const suppliedUrl = process.env.URL || process.env.DEPLOY_PRIME_URL;
if (suppliedUrl) {
  const parsed = new globalThis.URL(suppliedUrl);
  if (!['https:', 'http:'].includes(parsed.protocol)) throw new Error('Invalid deployment URL');
  const file = new globalThis.URL('../dist/index.html', import.meta.url);
  const html = await readFile(file, 'utf8');
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/);
  if (!canonical) throw new Error('Canonical metadata is missing');
  const previousOrigin = new globalThis.URL(canonical[1]).origin;
  await writeFile(file, html.replaceAll(previousOrigin, parsed.origin));
  console.log('Portfolio metadata configured for the deployment origin.');
} else {
  console.log('Static portfolio ready. Deployment metadata is unchanged.');
}
