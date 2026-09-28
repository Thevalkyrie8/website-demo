import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { execFileSync } from 'node:child_process';

// Build an isolated static customer preview; preserve the server application.
const root = resolve(import.meta.dirname, '..');
const stage = join(root, '.pages-build');
const base = '/website-demo';
rmSync(stage, { recursive: true, force: true });
cpSync(join(root, 'plant-shop/apps/web'), stage, {
  recursive: true,
  filter: (p) => !p.split('/').some((s) => ['node_modules', '.next', 'out'].includes(s)) && !p.endsWith('.tsbuildinfo'),
});
for (const p of ['middleware.ts', 'src/app/api', 'src/app/admin']) rmSync(join(stage, p), { recursive: true, force: true });
writeFileSync(join(stage, 'next.config.mjs'), `export default { output: 'export', basePath: '${base}', trailingSlash: true, images: { unoptimized: true }, experimental: { cpus: 2 } };\n`);
writeFileSync(join(stage, '.eslintrc.json'), JSON.stringify({ extends: ['next/core-web-vitals'] }));

function edit(path, transform) {
  const file = join(stage, path);
  writeFileSync(file, transform(readFileSync(file, 'utf8')));
}
function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) walk(path);
    else if (/\.(tsx?|css)$/.test(path)) {
      let source = readFileSync(path, 'utf8').replaceAll('/assets/', `${base}/assets/`);
      // Next Link adds basePath itself; plain anchors and location do not.
      source = source.replace(/(<a\b[^>]*\bhref=")\/(?!\/)/g, `$1${base}/`);
      source = source.replace(/(window\.location\.href\s*=\s*['"`])\/(?!\/)/g, `$1${base}/`);
      writeFileSync(path, source);
    }
  }
}
walk(join(stage, 'src'));
const productPage = 'src/app/(storefront)/san-pham/[slug]/page.tsx';
cpSync(join(stage, productPage), join(stage, 'src/components/storefront/ProductDetailPage.tsx'));
writeFileSync(join(stage, productPage), `import ProductDetailPage from '@/components/storefront/ProductDetailPage';
import { catalogProducts, productSlug } from '@/features/products/catalog';
export function generateStaticParams() { return catalogProducts.map(p => ({ slug: productSlug(p.name) })); }
export default function Page({ params }: { params: { slug: string } }) { return <ProductDetailPage params={params} />; }
`);
edit('src/app/layout.tsx', s => s.replace("description: 'Cửa hàng", "robots: { index: false, follow: false },\n  description: 'Cửa hàng").replace('<body>{children}</body>', '<body><div role="note" style={{background:"#173d2c",color:"white",textAlign:"center",padding:"9px 16px",fontSize:12}}>Bản demo để duyệt giao diện · Chưa tiếp nhận đơn hàng hoặc thanh toán thật.</div>{children}</body>'));
edit('src/app/(storefront)/dat-hang/page.tsx', s => s.replace('event.preventDefault();', "event.preventDefault();\n    if (process.env.NEXT_PUBLIC_DEMO_MODE === 'true') { setSubmitMessage('Đây là bản demo giao diện. Chức năng gửi đơn sẽ hoạt động sau khi kết nối máy chủ.');\n    return; }"));
edit('src/app/(storefront)/lien-he/page.tsx', s => s.replace('event.preventDefault();', "event.preventDefault(); if (process.env.NEXT_PUBLIC_DEMO_MODE === 'true') { setNotice('Bản demo chưa gửi yêu cầu tư vấn. Thông tin chưa được chuyển đến cửa hàng.'); return; }"));
edit('src/components/auth/CustomerAuthForm.tsx', s => s.replace('event.preventDefault();', "event.preventDefault();\n    if (process.env.NEXT_PUBLIC_DEMO_MODE === 'true') { setForgotMessage('Bản demo giao diện: đăng nhập và đăng ký sẽ hoạt động khi kết nối máy chủ.');\n    return; }").replace('Liên kết khôi phục sẽ được gửi đến thông tin tài khoản của bạn.', 'Bản demo chưa hỗ trợ khôi phục tài khoản.'));
writeFileSync(join(stage, 'src/app/robots.ts'), `export default function robots() { return { rules: { userAgent: '*', disallow: '/' } }; }\n`);
const env = { ...process.env, NEXT_TELEMETRY_DISABLED: '1', NEXT_PUBLIC_DEMO_MODE: 'true', NEXT_PUBLIC_SITE_URL: `https://thevalkyrie8.github.io${base}` };
execFileSync('npm', ['ci', '--workspaces=false', '--no-audit', '--no-fund'], { cwd: stage, env, stdio: 'inherit' });
execFileSync(process.execPath, [join(stage, 'node_modules/next/dist/bin/next'), 'build'], { cwd: stage, env, stdio: 'inherit' });
rmSync(join(root, 'dist'), { recursive: true, force: true });
cpSync(join(stage, 'out'), join(root, 'dist'), { recursive: true });
writeFileSync(join(root, 'dist/.nojekyll'), '');
if (!existsSync(join(root, 'dist/index.html'))) throw new Error('Static homepage missing');
console.log('Static customer preview ready in dist/');
