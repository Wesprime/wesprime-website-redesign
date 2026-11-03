// Blog posts: practical, evergreen articles about running a business on Odoo.
// Newest first. `image` is a file in public/media.

export type Block =
  | { p: string }
  | { list: string[] }
  | { steps: [string, string][] }
  | { table: { head: string[]; rows: string[][] } }
  | { note: string }

export type Post = {
  slug: string
  title: string
  category: 'Odoo Tips' | 'Automation & AI' | 'Implementation' | 'Industry Insights'
  excerpt: string
  image: string
  date: string
  minutes: number
  tags: string[]
  sections: { id: string; heading: string; blocks: Block[] }[]
}

export const posts: Post[] = [
  {
    slug: 'outgrown-spreadsheets',
    title: 'Seven signs your business has outgrown spreadsheets',
    category: 'Implementation',
    excerpt: 'Spreadsheets get a business started. These are the signals that they have started holding it back — and what to do first.',
    image: 'home.jpg',
    date: '20 October 2026',
    minutes: 6,
    tags: ['ERP', 'Growth', 'Reporting'],
    sections: [
      {
        id: 'why',
        heading: 'Why spreadsheets stop working',
        blocks: [
          { p: 'Spreadsheets are flexible, cheap and familiar, which is exactly why most businesses run on them for years. The trouble starts when several people depend on the same numbers, and each department keeps its own copy.' },
          { p: 'At that point the cost is no longer the software. It is the hours spent re-typing, reconciling and asking which file is the latest one.' },
        ],
      },
      {
        id: 'signs',
        heading: 'The seven signs',
        blocks: [
          {
            steps: [
              ['The same data is typed twice', 'An order is entered in a sales sheet, then again in accounting, then again for the warehouse.'],
              ['Month-end takes days', 'Closing the books means collecting exports from several places and matching them by hand.'],
              ['Nobody trusts the stock figure', 'Sales calls the warehouse before confirming an order, just to be sure.'],
              ['Reports arrive too late to act on', 'By the time the numbers are ready, the decision has already been made.'],
              ['Approvals live in email', 'Purchases and discounts wait in inboxes, with no record of who agreed to what.'],
              ['One person holds the knowledge', 'A key file only works because one colleague knows its formulas.'],
              ['Compliance is a scramble', 'VAT returns and e-invoicing depend on manual checks every period.'],
            ],
          },
        ],
      },
      {
        id: 'first-step',
        heading: 'What to do first',
        blocks: [
          { p: 'Do not start by choosing software. Start by writing down how an order, a purchase and a payroll run actually move through the business today, and where they get stuck.' },
          { note: 'A short process review usually shows that two or three connected apps remove most of the pain. You can add the rest later.' },
        ],
      },
    ],
  },
  {
    slug: 'odoo-pos-saudi-retail',
    title: 'Odoo Point of Sale for Saudi retailers: what to set up before opening day',
    category: 'Odoo Tips',
    excerpt: 'Receipts, mada terminals, simplified e-invoices and stock between branches — a checklist for a calm first day.',
    image: 'Retail.jpg',
    date: '6 October 2026',
    minutes: 5,
    tags: ['POS', 'Retail', 'ZATCA'],
    sections: [
      {
        id: 'before',
        heading: 'Get the basics right',
        blocks: [
          { p: 'Odoo Point of Sale shares products, prices and stock with the rest of Odoo, so most of the setup happens before a single till is opened.' },
          { list: ['Products with barcodes, VAT and Arabic names', 'Price lists and promotions per branch', 'Cashier accounts with the right access', 'Opening cash and closing procedures'] },
        ],
      },
      {
        id: 'compliance',
        heading: 'Receipts and e-invoicing',
        blocks: [
          { p: 'Sales to consumers are simplified tax invoices. Each receipt needs a QR code and has to be reported to ZATCA, which Odoo handles through its Saudi localization once the point of sale is onboarded.' },
          { p: 'Print receipts in Arabic and English, and test returns and refunds, because credit notes follow the same rules as the original sale.' },
        ],
      },
      {
        id: 'day-one',
        heading: 'On the day',
        blocks: [
          { steps: [['Run a test sale on every till', 'Cash, card and a refund — then check they reach accounting.'], ['Connect payment terminals', 'Make sure card and mada payments are matched to the right journal.'], ['Close the session together', 'The first closing is the best time to show the team how differences are found.']] },
        ],
      },
    ],
  },
  {
    slug: 'automate-approvals-odoo',
    title: 'Automating approvals in Odoo without writing code',
    category: 'Automation & AI',
    excerpt: 'Purchase limits, discount checks and expense sign-off can all run inside Odoo. Here is how to design them so they help instead of slowing people down.',
    image: 'hero-office.jpg',
    date: '22 September 2026',
    minutes: 4,
    tags: ['Automation', 'Approvals', 'Workflows'],
    sections: [
      {
        id: 'where',
        heading: 'Where approvals belong',
        blocks: [
          { p: 'An approval is useful when it protects money or risk: a large purchase, an unusual discount, a new supplier. Everything else should flow straight through.' },
          { list: ['Purchase orders above a set amount', 'Sales discounts beyond a margin threshold', 'Expense claims outside policy', 'New customers with credit terms'] },
        ],
      },
      {
        id: 'how',
        heading: 'How to set them up',
        blocks: [
          { p: 'Odoo\'s approval rules and automated actions let you send a document to the right person, notify them, and block confirmation until it is approved — all through configuration.' },
          { note: 'Keep the rule list short. If everything needs approval, people stop reading the requests.' },
        ],
      },
      {
        id: 'measure',
        heading: 'Check that it works',
        blocks: [
          { p: 'After a month, look at how long requests wait and how many are rejected. Rules that are always approved can usually be removed.' },
        ],
      },
    ],
  },
  {
    slug: 'ai-in-odoo-crm',
    title: 'Where AI actually helps in an Odoo CRM',
    category: 'Automation & AI',
    excerpt: 'Less hype, more pipeline: practical places where AI saves sales teams time, and the data it needs to work.',
    image: 'Wholesale and Distribution.jpg',
    date: '8 September 2026',
    minutes: 5,
    tags: ['AI', 'CRM', 'Sales'],
    sections: [
      {
        id: 'start-with-data',
        heading: 'Start with clean data',
        blocks: [
          { p: 'AI can only work with what is in the CRM. Before anything else, make sure leads have a source, a stage and an owner, and that won and lost reasons are recorded.' },
        ],
      },
      {
        id: 'use-cases',
        heading: 'Useful places to begin',
        blocks: [
          { list: ['Scoring leads so the team calls the most promising ones first', 'Drafting follow-up emails from the conversation history', 'Summarising long email threads before a meeting', 'Flagging deals that have gone quiet'] },
          { p: 'Each of these saves minutes many times a day, and none of them takes the decision away from the salesperson.' },
        ],
      },
      {
        id: 'pilot',
        heading: 'Run a small pilot',
        blocks: [
          { p: 'Pick one team and one use case, agree how you will measure it, and review after a few weeks. Expand only what people actually use.' },
        ],
      },
    ],
  },
  {
    slug: 'multi-warehouse-odoo',
    title: 'Running several warehouses in Odoo: a practical setup',
    category: 'Odoo Tips',
    excerpt: 'Locations, routes and transfers explained simply — so stock in Riyadh, Jeddah and on the road always adds up.',
    image: 'Logistics & Warehousing.jpg',
    date: '25 August 2026',
    minutes: 6,
    tags: ['Inventory', 'Warehousing', 'Barcode'],
    sections: [
      {
        id: 'structure',
        heading: 'Model the real buildings',
        blocks: [
          { p: 'Create one warehouse per physical site, and locations inside it only where stock really needs to be tracked separately, such as a returns area or a van.' },
        ],
      },
      {
        id: 'routes',
        heading: 'Let routes do the moving',
        blocks: [
          { p: 'Routes decide how goods travel: receive in one step or two, pick and pack before shipping, or replenish a branch from the main warehouse. Choosing them well removes most manual transfers.' },
          { list: ['One-step receipts for small sites', 'Pick, pack and ship for busy dispatch areas', 'Inter-warehouse resupply on minimum stock levels'] },
        ],
      },
      {
        id: 'barcodes',
        heading: 'Scan instead of typing',
        blocks: [
          { p: 'The Barcode app turns receipts, picks and counts into scans on a phone or handheld, which keeps stock accurate without extra office work.' },
        ],
      },
    ],
  },
  {
    slug: 'manufacturing-real-cost',
    title: 'Manufacturing in Odoo: from bill of materials to real cost',
    category: 'Industry Insights',
    excerpt: 'How bills of materials, work orders and quality checks come together to show what each product really costs to make.',
    image: 'Manufacturing.jpg',
    date: '11 August 2026',
    minutes: 7,
    tags: ['Manufacturing', 'Costing', 'Quality'],
    sections: [
      {
        id: 'bom',
        heading: 'Begin with the bill of materials',
        blocks: [
          { p: 'A bill of materials lists the components and operations for each product. Accurate quantities and work centres are what make every later number trustworthy.' },
        ],
      },
      {
        id: 'shop-floor',
        heading: 'Record work as it happens',
        blocks: [
          { p: 'Work orders on a tablet let operators start, pause and finish steps, log scrap and run quality checks on the spot. Time and materials flow straight into the cost of the order.' },
          { list: ['Work centres with hourly costs', 'Quality control points on critical steps', 'Lot or serial tracking where traceability matters'] },
        ],
      },
      {
        id: 'cost',
        heading: 'Compare planned and actual cost',
        blocks: [
          { p: 'Once production is recorded, compare the planned cost with what was actually used. The differences point to the products, steps or suppliers worth looking at first.' },
          { note: 'Saudi factories preparing for the Future Factories Programme often start here: reliable production data is the base for any digital maturity assessment.' },
        ],
      },
    ],
  },
]

export const getPost = (slug: string) => posts.find((p) => p.slug === slug)
export const postCategories = ['All', ...new Set(posts.map((p) => p.category))]
