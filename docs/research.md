# Website research notes

Research done in October 2026 for the Wesprime website. It covers the reference sites, the Saudi rules the site describes, and what still needs Wesprime's confirmation.

## Reference sites

### iwesabe.com: Saudi Odoo partner, the closest competitor
- **Positioning:** "Odoo Gold Partner in Saudi Arabia", with years in business, project counts, delivery centres and 24/7 support up front. The WhatsApp CTA sits next to "Talk to Our Experts".
- **Saudi trust badges:** ZATCA-approved e-invoicing provider, Monsha'at Mazaya provider, CST-certified, Future Factories Programme accredited.
- **Services split finely:** implementation, customization, integration, training, support, development, migration, consulting and **gap analysis**. Each has a dedicated page with an FAQ.
- **City landing pages** for SEO (Riyadh, Jeddah, Eastern Province), plus Bahrain and UAE.
- **The blog drives Saudi search traffic.** Topics include ZATCA, GOSI rate changes, healthcare (NPHIES and SFDA), logistics, education, "Odoo vs Zoho", "ERPNext vs Odoo" and "SAP to Odoo".
- **Payroll page:** GOSI, WPS/Mudad, Nitaqat tracking, end-of-service benefits, Hajj leave, Arabic payslips.
- **Hosting article:** PDPL residency. Odoo.sh is hosted outside KSA, so self-managed Odoo on a KSA cloud is the cleaner route for HR data.

### telenoc.org: Saudi ICT integrator
- English/Arabic toggle, Vision 2030 branding, downloadable company profiles (in English and Arabic, and per division), and a partner-logo gallery.
- Office tabs for Riyadh, Jeddah and Khobar. The contact form has a service dropdown.

### accenture.com
- Hero announcement with expand/collapse, a rotating insights carousel, a CEO quote, client stories led by outcomes, awards cards and a news cadence.

### infosys.com
- Blocked direct fetching (HTTP 403). The public structure: "Navigate your next" positioning, a research hub, and named platforms (Cobalt for cloud, Topaz for AI). Branded offerings and a research hub are the transferable ideas.

### gitbook.com
- Problem → solution framing, testimonials with role and company, and three CTAs at the end.
- Docs layout: sidebar navigation, an on-page table of contents, search.

### odoo.com
- App catalogue in 8 categories (Finance, Sales, Websites, Supply Chain, Human Resources, Marketing, Services, Productivity) and "one need, one app".
- Saudi localization modules: `l10n_sa`, `l10n_sa_edi` (ZATCA), `l10n_sa_pos`, `l10n_sa_hr_payroll` and `l10n_sa_hr_payroll_account`.

## What the site now uses

| Idea | Taken from | Where |
|---|---|---|
| Industry pages with Saudi requirements per sector | iwesabe industry guides | `#/industries/<sector>` |
| Odoo app catalogue by category | odoo.com | `#/solutions` |
| Fit-gap → implementation entry path | iwesabe gap analysis | `#/services` "How to start", guide |
| Migration source systems | iwesabe migration page | `#/solutions`, guide |
| Knowledge hub: search, filters, docs layout, table of contents | GitBook, Infosys research hub | `#/resources` |
| Floating WhatsApp button | iwesabe, telenoc | Every page |
| Saudi FAQs (ZATCA, payroll, Arabic, hosting) | iwesabe FAQs | `#/faq` |

The ZATCA announcement bar and the Saudi Compliance pages were removed at Wesprime's request (October 2026). The Saudi detail remains in the guides, industry pages and FAQ.

## Key facts and sources

- **ZATCA Wave 25:** taxable turnover above SAR 187,500 in 2022, 2023 or 2024; integration deadline 1 February 2027. Announced 24 July 2026. [VATupdate](https://www.vatupdate.com/2026/08/05/ksa-zatca-announces-e-invoicing-readiness-for-wave-25/)
- **Waves 24 and 23:** Wave 24 covered turnover above SAR 375,000, deadline 30 June 2026. Wave 23 covered turnover above SAR 750,000, deadline 31 March 2026.
- **Clearance and reporting:** standard (B2B) invoices are cleared by ZATCA before they reach the buyer. Simplified (B2C) invoices are reported within 24 hours. A compliant invoice includes UBL 2.1 XML, a CSID stamp, a QR code, and a UUID with a hash chain. [Odoo docs](https://www.odoo.com/documentation/18.0/applications/finance/fiscal_localizations/saudi_arabia.html)
- **GOSI new system (registered from 3 July 2024):** annuities are 9.5% each side from July 2025, rising 0.5% every July to 11% from July 2028. Legacy employees stay at 9%. Non-Saudi employees pay only the 2% occupational hazards contribution, paid by the employer. [Argaam](https://www.argaam.com/en/article/articledetail/id/1824657)
- **Qiwa:** since 15 April 2026, only Saudi employees with Qiwa-documented contracts count for Nitaqat. MHRSD cross-checks Qiwa, GOSI and Mudad. [EIG](https://eiglaw.com/saudi-arabia-saudization-updates-qiwa-contract-documentation-impacts-nitaqat-calculations/)
- **PDPL:** enforced by SDAIA since September 2024; fines up to SAR 5M; cross-border transfers restricted. [trade.gov](https://www.trade.gov/market-intelligence/saudi-arabia-ict-cross-border-data-transfer-rules-now-under-enforcement)

## Needs Wesprime's confirmation before launch

1. **WhatsApp number.** The button uses +966 561738911, the phone number from the prototype. Confirm it is on WhatsApp.
2. **Partner tier and certifications.** The site makes no claim of Odoo partner tier, ZATCA, Monsha'at, CST or Future Factories accreditation. If Wesprime holds any, add them as badges near the hero. They are the strongest trust signals in this market.
3. **"Free" scoping call (60 minutes) and "fixed scope" fit-gap.** These are commercial offers. Confirm them or reword.
4. **Migration source systems listed** (Tally, QuickBooks, Zoho, SAP B1, Dynamics, ERPNext). Keep only the ones Wesprime has delivered.

## Suggested next steps
- **Arabic version (RTL).** Every Saudi competitor offers one. It needs native-speaker copy, not machine translation.
- **City pages** (Riyadh, Jeddah, Eastern Province) and **industry guide pages**, for search.
- **Downloadable company profile** (English and Arabic), as telenoc does.
- **Real case studies with measurable outcomes**, to replace the placeholders.
- **Review cycle.** Re-check `src/data/saudi.ts` and `src/data/guides.ts` every quarter, because regulations change.
