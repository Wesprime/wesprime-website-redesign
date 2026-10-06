// Resources hub guides. Each guide is written from public sources listed at
// its end. Update `reviewed` whenever a guide is checked again.

export type Block =
  | { p: string }
  | { list: string[] }
  | { steps: [string, string][] }
  | { table: { head: string[]; rows: string[][] } }
  | { note: string }

export type Guide = {
  slug: string
  title: string
  category: 'Compliance' | 'HR & Payroll' | 'Infrastructure' | 'Implementation' | 'Industry'
  summary: string
  minutes: number
  reviewed: string
  sections: { id: string; heading: string; blocks: Block[] }[]
  sources: { label: string; url: string }[]
}

export const guides: Guide[] = [
  {
    slug: 'zatca-phase-2-e-invoicing',
    title: 'ZATCA Phase 2 e-invoicing, explained',
    category: 'Compliance',
    summary: 'What the integration phase requires, how clearance and reporting differ, which wave you are in, and how Odoo handles it.',
    minutes: 8,
    reviewed: 'October 2026',
    sections: [
      {
        id: 'phases',
        heading: 'Phase 1 and Phase 2',
        blocks: [
          { p: 'Saudi e-invoicing (Fatoora) arrived in two phases. Phase 1, the generation phase, has applied since 4 December 2021: VAT-registered businesses must issue invoices electronically from a compliant system, not by hand or in a word processor.' },
          { p: 'Phase 2, the integration phase, goes further. Your invoicing system has to connect to ZATCA\'s Fatoora platform, sign every invoice cryptographically, and send it to ZATCA — either for clearance before the buyer receives it, or as a report shortly after.' },
        ],
      },
      {
        id: 'waves',
        heading: 'Which wave are you in?',
        blocks: [
          { p: 'ZATCA brings taxpayers into Phase 2 in waves, based on taxable turnover in reference years, and gives at least six months\' notice. The most recent waves:' },
          {
            table: {
              head: ['Wave', 'Taxable turnover above', 'Integrate by'],
              rows: [
                ['25', 'SAR 187,500 (in 2022, 2023 or 2024)', '1 February 2027'],
                ['24', 'SAR 375,000', '30 June 2026'],
                ['23', 'SAR 750,000', '31 March 2026'],
              ],
            },
          },
          { p: 'SAR 187,500 is also the voluntary VAT registration threshold, so Wave 25 reaches almost every VAT-registered business in the Kingdom.' },
          { note: 'ZATCA notifies targeted taxpayers directly. Always confirm your own wave and deadline in your ZATCA account.' },
        ],
      },
      {
        id: 'clearance-reporting',
        heading: 'Clearance vs reporting',
        blocks: [
          {
            table: {
              head: ['', 'Standard tax invoice', 'Simplified tax invoice'],
              rows: [
                ['Issued to', 'VAT-registered businesses (B2B)', 'Consumers (B2C), usually at POS'],
                ['ZATCA flow', 'Clearance — ZATCA validates and stamps it first', 'Reporting — sent to ZATCA within 24 hours'],
                ['Buyer receives it', 'Only after clearance', 'Immediately, with a QR code'],
              ],
            },
          },
          { p: 'Credit and debit notes follow the same path as the invoice they adjust, and reference it.' },
        ],
      },
      {
        id: 'technical',
        heading: 'What a compliant invoice contains',
        blocks: [
          {
            list: [
              'UBL 2.1 XML with line-level VAT and the Saudi-specific fields',
              'A cryptographic stamp from your ZATCA-issued certificate (CSID)',
              'A TLV-encoded QR code (mandatory on simplified invoices)',
              'A UUID and a hash of the previous invoice, forming a tamper-evident chain',
              'For archiving, a PDF/A-3 that embeds the XML',
            ],
          },
        ],
      },
      {
        id: 'odoo',
        heading: 'How Odoo handles it',
        blocks: [
          { p: 'Odoo\'s Saudi localization provides three modules: l10n_sa (accounting localization), l10n_sa_edi (ZATCA e-invoicing) and l10n_sa_pos (point of sale compliance). A typical rollout:' },
          {
            steps: [
              ['Complete master data', 'Company name (up to 63 characters for ZATCA), building number, full address, identification scheme such as CR, VAT number and SAR currency — and the same for B2B customers.'],
              ['Configure taxes', 'Zero-rated and exempt taxes need an exemption reason code; retention and withholding taxes must be set up explicitly.'],
              ['Test in simulation', 'Onboard each sales journal on the Fatoora simulation portal using a one-time password (valid for one hour) and test every document type.'],
              ['Go to production', 'Switch the API mode to production — this cannot be undone — and onboard the journals again on the live portal.'],
              ['Monitor', 'Track ZATCA responses and fix rejected invoices promptly.'],
            ],
          },
          { note: 'Production submissions are permanent. Test thoroughly in simulation before you switch.' },
        ],
      },
    ],
    sources: [
      { label: 'Odoo documentation — Saudi Arabia fiscal localization', url: 'https://www.odoo.com/documentation/18.0/applications/finance/fiscal_localizations/saudi_arabia.html' },
      { label: 'ZATCA — E-invoicing', url: 'https://zatca.gov.sa/en/E-Invoicing/Pages/default.aspx' },
      { label: 'VATupdate — ZATCA announces Wave 25', url: 'https://www.vatupdate.com/2026/08/05/ksa-zatca-announces-e-invoicing-readiness-for-wave-25/' },
    ],
  },
  {
    slug: 'saudi-payroll-gosi-wps-qiwa',
    title: 'Saudi payroll compliance: GOSI, WPS, Mudad and Qiwa',
    category: 'HR & Payroll',
    summary: 'The new GOSI rates, why Qiwa, Mudad and GOSI must agree, and what your payroll system needs to get right.',
    minutes: 7,
    reviewed: 'October 2026',
    sections: [
      {
        id: 'gosi',
        heading: 'GOSI contributions after the new Social Insurance Law',
        blocks: [
          { p: 'The new Social Insurance Law applies to employees with no previous contribution period who joined on or after 3 July 2024. For them, the annuities rate rises by 0.5% each July until it reaches 11% for both employee and employer:' },
          {
            table: {
              head: ['Period', 'Employee', 'Employer'],
              rows: [
                ['July 2025 – June 2026', '9.5%', '9.5%'],
                ['July 2026 – June 2027', '10%', '10%'],
                ['July 2027 – June 2028', '10.5%', '10.5%'],
                ['From July 2028', '11%', '11%'],
              ],
            },
          },
          {
            list: [
              'Saudi employees registered before 3 July 2024 stay on 9% each.',
              'Occupational hazards (2%, employer only) and SANED (0.75% each) continue for Saudis.',
              'For non-Saudi employees, only the 2% occupational hazards contribution applies.',
            ],
          },
          { note: 'Payroll must know which population each employee belongs to. A single hard-coded GOSI percentage silently under- or over-pays.' },
        ],
      },
      {
        id: 'alignment',
        heading: 'One employee, four portals',
        blocks: [
          { p: 'The Ministry of Human Resources and Social Development cross-checks data between Qiwa (contracts), GOSI (social insurance) and Mudad (wage protection). Since 15 April 2026, only Saudi employees whose contracts are documented on Qiwa count towards Nitaqat.' },
          { p: 'Salary, housing and transport allowances and job title should match across the Qiwa contract, the Mudad salary file and the GOSI contributory wage. Mismatches can affect your Nitaqat band, visa and Iqama services, and eligibility for government tenders.' },
        ],
      },
      {
        id: 'odoo-payroll',
        heading: 'What Odoo\'s Saudi payroll covers',
        blocks: [
          {
            list: [
              'l10n_sa_hr_payroll: Saudi salary structures with housing and transport allowances, GOSI employee and employer contributions and end-of-service provisions',
              'l10n_sa_hr_payroll_account: journal entries posted to accounting',
              'WPS files for banks and for Mudad',
              'Employee records with Iqama number, GOSI number, nationality and a trusted IBAN',
            ],
          },
          { p: 'We add the rules your business needs on top — for example new-system GOSI rates by registration date, leave policies and allowance structures — and test them against real payslips before go-live.' },
        ],
      },
    ],
    sources: [
      { label: 'Argaam — GOSI to increase pension contributions for new employees', url: 'https://www.argaam.com/en/article/articledetail/id/1824657' },
      { label: 'Odoo documentation — Saudi Arabia payroll', url: 'https://www.odoo.com/documentation/19.0/applications/hr/payroll/payroll_localizations/saudi_arabia.html' },
      { label: 'Erickson Immigration Group — Qiwa contract documentation and Nitaqat', url: 'https://eiglaw.com/saudi-arabia-saudization-updates-qiwa-contract-documentation-impacts-nitaqat-calculations/' },
    ],
  },
  {
    slug: 'hosting-odoo-in-saudi-arabia',
    title: 'Hosting Odoo in Saudi Arabia: PDPL and data residency',
    category: 'Infrastructure',
    summary: 'Odoo Online, Odoo.sh, a KSA cloud region or on-premise — what each means for the Personal Data Protection Law.',
    minutes: 5,
    reviewed: 'October 2026',
    sections: [
      {
        id: 'pdpl',
        heading: 'Why hosting is a compliance decision',
        blocks: [
          { p: 'Saudi Arabia\'s Personal Data Protection Law (PDPL), enforced by SDAIA since September 2024, applies to anyone processing personal data of people in the Kingdom. Transfers outside the Kingdom are allowed only under specific conditions, and fines can reach SAR 5 million.' },
          { p: 'An ERP holds exactly this kind of data: national IDs and Iqama numbers, GOSI numbers, salaries and bank accounts, plus customer contact details. Where Odoo runs is therefore a decision to make with your data protection officer, not only with IT.' },
        ],
      },
      {
        id: 'options',
        heading: 'Your options',
        blocks: [
          {
            table: {
              head: ['Option', 'Custom modules', 'Data location'],
              rows: [
                ['Odoo Online', 'No — configuration only', 'Odoo\'s data centres'],
                ['Odoo.sh', 'Yes', 'Odoo\'s data centres (outside KSA)'],
                ['KSA cloud, self-managed', 'Yes', 'A cloud region inside Saudi Arabia'],
                ['On-premise', 'Yes', 'Your own servers'],
              ],
            },
          },
          { p: 'Several providers now run cloud regions inside the Kingdom. For companies holding Saudi HR and payroll data, self-managed Odoo in a KSA region is usually the most straightforward route to residency requirements.' },
          { note: 'This is general information, not legal advice. Confirm your obligations with your data protection officer or legal counsel.' },
        ],
      },
    ],
    sources: [
      { label: 'U.S. International Trade Administration — Saudi Arabia cross-border data transfer rules', url: 'https://www.trade.gov/market-intelligence/saudi-arabia-ict-cross-border-data-transfer-rules-now-under-enforcement' },
      { label: 'SDAIA — Personal Data Protection Law', url: 'https://sdaia.gov.sa/en/SDAIA/about/Pages/RegulationsAndPolicies.aspx' },
    ],
  },
  {
    slug: 'migrating-to-odoo',
    title: 'Moving to Odoo from your current system',
    category: 'Implementation',
    summary: 'How to move from Tally, QuickBooks, SAP Business One, Dynamics or spreadsheets without losing data — or a month of invoicing.',
    minutes: 6,
    reviewed: 'October 2026',
    sections: [
      {
        id: 'plan',
        heading: 'A migration in six steps',
        blocks: [
          {
            steps: [
              ['Audit and map', 'Review the source system, decide what moves and write a field-by-field mapping.'],
              ['Rebuild the chart of accounts', 'Structure accounts and taxes so VAT returns and ZATCA e-invoicing work from day one.'],
              ['Migrate master data', 'Customers, suppliers, products, employees and assets — validated and signed off by their owners.'],
              ['Bring over balances and history', 'Opening balances, open receivables and payables, stock on hand and the history you need for reporting.'],
              ['Handle personal data carefully', 'Move employee records in line with the PDPL, with access limited to the people who need it.'],
              ['Run in parallel, then cut over', 'Keep the old system running until Odoo\'s outputs reconcile, then switch.'],
            ],
          },
        ],
      },
      {
        id: 'risks',
        heading: 'Where migrations go wrong',
        blocks: [
          {
            list: [
              'Account codes mapped one-to-one from a structure that never fitted VAT reporting',
              'Opening balances that do not reconcile because cut-off dates differ by module',
              'Silent data loss from custom fields that exports skip',
              'A go-live date chosen around a VAT return or payroll run',
            ],
          },
          { note: 'Mid-year migrations are possible. Plan the cut-over date around your VAT return and payroll calendar.' },
        ],
      },
    ],
    sources: [
      { label: 'Odoo documentation — Data import', url: 'https://www.odoo.com/documentation/18.0/applications/essentials/export_import_data.html' },
    ],
  },
  {
    slug: 'fit-gap-analysis',
    title: 'Fit-gap analysis: start an ERP project with a real scope',
    category: 'Implementation',
    summary: 'What a fit-gap analysis covers, what you get at the end, and why it saves money before implementation starts.',
    minutes: 4,
    reviewed: 'October 2026',
    sections: [
      {
        id: 'what',
        heading: 'What it is',
        blocks: [
          { p: 'A fit-gap analysis compares how your business works today with what Odoo does out of the box. Each requirement is marked as a fit (standard), a configuration, a customization, or a process you agree to change.' },
          { p: 'Projects that skip this step usually discover their real scope during implementation, when changes cost the most.' },
        ],
      },
      {
        id: 'deliverables',
        heading: 'What you receive',
        blocks: [
          {
            list: [
              'Current-state process maps for each department in scope',
              'A module-by-module fit assessment',
              'A gap register with severity, options and effort for each gap',
              'A Saudi compliance baseline: ZATCA Phase 2, VAT, GOSI, WPS, Nitaqat and Arabic requirements',
              'A build / configure / accept decision for every gap',
              'A fixed implementation scope, plan and budget',
            ],
          },
          { note: 'The report is yours. You can use it to tender the implementation, whoever delivers it.' },
        ],
      },
    ],
    sources: [],
  },
  {
    slug: 'future-factories-erp',
    title: 'Future Factories and ERP readiness for Saudi manufacturers',
    category: 'Industry',
    summary: 'How the Ministry of Industry\'s programme assesses digital maturity, and where an ERP fits in.',
    minutes: 4,
    reviewed: 'October 2026',
    sections: [
      {
        id: 'programme',
        heading: 'The programme',
        blocks: [
          { p: 'The Future Factories Programme, run by the Ministry of Industry and Mineral Resources, aims to move Saudi factories from manual, low-productivity operations to smart, data-driven production.' },
          { p: 'Factories are assessed with the Smart Industry Readiness Index (SIRI), which scores maturity across process, technology and organisation. Eligible factories can receive financial support towards approved transformation solutions.' },
          { note: 'Eligibility rules and support levels are set by the Ministry and can change. Check current terms with the programme before planning around funding.' },
        ],
      },
      {
        id: 'erp',
        heading: 'Where Odoo fits',
        blocks: [
          {
            list: [
              'Manufacturing: bills of materials, work orders and capacity planning',
              'Quality: control points, checks and alerts on the shop floor',
              'Maintenance: preventive and corrective maintenance tied to equipment',
              'Inventory and Purchase: lot and serial traceability from supplier to customer',
              'Accounting: real production costs and ZATCA-compliant invoicing',
            ],
          },
        ],
      },
    ],
    sources: [
      { label: 'Ministry of Industry and Mineral Resources', url: 'https://www.mim.gov.sa/en' },
    ],
  },
]

export const getGuide = (slug: string) => guides.find((g) => g.slug === slug)
export const guideCategories = ['All', ...new Set(guides.map((g) => g.category))] as const
