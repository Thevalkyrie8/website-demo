# Plant Shop · September 2026 design preview

The GitHub Pages site is a static customer review build. It does not accept real orders, payments or consultation submissions.

## Included
- Original forest-green / ivory storefront; editorial hero, category collections, gift occasions, landscape services, care FAQ and footer.
- Button-operated horizontal dropdowns, vertical category flyouts, mobile category accordions and search.
- Configurable local preview of flash sale title, enabled state, start/end dates and per-SKU sale prices. Active sale prices flow into product cards, product detail and cart. Settings are per browser, not public administration.
- Optional accessory selection with explicit totals, quantity and inventory checks, buyer/recipient checkout preview.
- Metadata and canonical URLs for collections/products, Product and Breadcrumb JSON-LD without fabricated reviews or offers, sitemap excluding cart/account/admin/preview routes.
- Demo noindex and robots exclusion remain intentional until business data is approved. These must be reviewed at production launch.
- Existing photo assets compressed to approximately 1.8 MB total; static export and internal link checks pass.

## Production work still required
Connect a supported server/database deployment for authenticated administration, inventory, campaign persistence, coupon validation, order creation, notifications and payment. GitHub Pages cannot run the included NestJS backend. Server validation must remain authoritative for prices, stock and order success.

Confirm brand, contact channels, actual product SKUs/variants/photos/prices, delivery areas and costs, returns/privacy policies, company information and domain. Add owner-provided analytics and Search Console configuration only after those are available. No search ranking guarantee is implied.

The reference websites informed navigation and merchandising patterns; this design does not reuse their branding, customer reviews, policies or product claims.
