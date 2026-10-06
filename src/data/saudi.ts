// Industry and implementation content with Saudi-specific detail. Facts were
// checked against public sources in October 2026 (see docs/research.md).
// Regulations change: review this file at least every quarter.

export type Industry = {
  id: string
  title: string
  summary: string
  challenges: string[]
  saudi: string[]
  modules: string[]
  /** File name in public/media. Industries without one show an icon tile. */
  image?: string
  /** Inner markup of a 24x24 stroke icon, used when there is no image */
  icon: string
}

/** URL for an image in public/media. encodeURI keeps "&" literal, which every static server resolves. */
export const mediaUrl = (file: string) => `${import.meta.env.BASE_URL}media/${encodeURI(file)}`

export const industries: Industry[] = [
  {
    id: 'trading',
    image: 'Wholesale and Distribution.jpg',
    icon: '<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',
    title: 'Trading & Distribution',
    summary: 'Purchasing, stock and multi-channel sales on one connected flow.',
    challenges: ['Stock spread across warehouses and vans', 'Customer-specific price lists and credit limits', 'Landed costs on imported goods'],
    saudi: ['Every B2B invoice cleared through ZATCA before it reaches the customer', 'Customs and landed-cost tracking for imports', 'VAT returns built from posted transactions'],
    modules: ['Sales', 'Purchase', 'Inventory', 'Accounting'],
  },
  {
    id: 'retail',
    image: 'Retail.jpg',
    icon: '<path d="M5 8h14l-1 12H6z"/><path d="M9 8V6a3 3 0 016 0v2"/>',
    title: 'Retail',
    summary: 'Point of sale, stock and customer data kept in sync across stores.',
    challenges: ['Stock and prices drifting between branches', 'Slow end-of-day reconciliation', 'Loyalty and promotions managed outside the system'],
    saudi: ['Simplified e-invoices with QR codes on every receipt, reported to ZATCA within 24 hours', 'Card and mada payment terminals connected to POS', 'Bilingual Arabic and English receipts'],
    modules: ['Point of Sale', 'Inventory', 'Loyalty', 'Accounting'],
  },
  {
    id: 'manufacturing',
    image: 'Manufacturing.jpg',
    icon: '<path d="M3 21V10l6 4V10l6 4V6h6v15z"/>',
    title: 'Manufacturing',
    summary: 'Bills of materials, work orders and production linked to procurement.',
    challenges: ['Production planned in spreadsheets', 'No live view of work-in-progress cost', 'Quality checks and maintenance on paper'],
    saudi: ['Readiness for the Future Factories Programme and its SIRI assessment', 'Traceability by lot and serial number', 'ZATCA-compliant invoicing from day one'],
    modules: ['Manufacturing', 'Quality', 'Maintenance', 'PLM', 'Inventory'],
  },
  {
    id: 'construction',
    image: 'Construction.jpg',
    icon: '<path d="M3 21h18M5 21V11h6v10M13 21V5h6v16"/>',
    title: 'Construction & Contracting',
    summary: 'Project costs, subcontractors and progress billing under control.',
    challenges: ['Costs tracked per project only at month end', 'Progress billing and retention handled manually', 'Many subcontractors and site purchases'],
    saudi: ['Retention and withholding configured as ZATCA requires', 'Nitaqat compliance to stay eligible for Etimad tenders', 'Large site workforces with GOSI, WPS and Iqama tracking'],
    modules: ['Project', 'Accounting', 'Purchase', 'Timesheets', 'Payroll'],
  },
  {
    id: 'healthcare',
    image: 'Healthcare.jpg',
    icon: '<path d="M12 21s-8-4.5-8-11a4.5 4.5 0 018-2.8A4.5 4.5 0 0120 10c0 6.5-8 11-8 11z"/>',
    title: 'Healthcare & Pharmacy',
    summary: 'Clinics, pharmacies and medical suppliers with traceable stock and clean billing.',
    challenges: ['Charges from several departments billed separately', 'Insurance and self-pay splits handled by hand', 'Medicine expiry and recalls hard to trace'],
    saudi: ['Insurance workflows that line up with NPHIES eligibility, pre-authorisation and claims', 'Lot and expiry tracking with first-expiry-first-out picking to support SFDA traceability', 'ZATCA e-invoices for insurers and patients'],
    modules: ['Inventory', 'Point of Sale', 'Accounting', 'Appointments'],
  },
  {
    id: 'logistics',
    image: 'Logistics & Warehousing.jpg',
    icon: '<path d="M2 7h11v9H2zM13 10h5l3 3v3h-8"/><circle cx="6.5" cy="18" r="2"/><circle cx="17.5" cy="18" r="2"/>',
    title: 'Logistics & Warehousing',
    summary: 'Warehouse operations, transfers and delivery visibility.',
    challenges: ['Manual picking and put-away', 'Little visibility of stock in transit', 'Fleet costs scattered across sheets'],
    saudi: ['Multi-warehouse operations across Riyadh, Jeddah and the Eastern Province', 'Barcode-driven receipts, picking and transfers', 'Fleet contracts, fuel and maintenance costs in one place'],
    modules: ['Inventory', 'Barcode', 'Fleet', 'Accounting'],
  },
  {
    id: 'education',
    image: 'Education.jpg',
    icon: '<path d="M2 9l10-5 10 5-10 5-10-5z"/><path d="M6 11v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5M22 9v6"/>',
    title: 'Education',
    summary: 'Schools, institutes and training centres with admissions, fees and staff in one system.',
    challenges: ['Admissions and student records kept in spreadsheets', 'Fee schedules, instalments and discounts tracked by hand', 'Courses, staff and finance spread across separate tools'],
    saudi: ['VAT on tuition, transport and other fees set up correctly, with ZATCA-compliant invoices for parents', 'Bilingual Arabic and English invoices, receipts and parent communication', 'Staff payroll with GOSI, WPS and Saudization tracking'],
    modules: ['eLearning', 'Website', 'Subscriptions', 'Accounting', 'Payroll'],
  },
  {
    id: 'ecommerce',
    image: 'E-commerce.jpg',
    icon: '<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.5 12h12L22 7H6.5"/>',
    title: 'E-commerce',
    summary: 'Online store, orders and fulfilment connected to your ERP.',
    challenges: ['Orders re-typed into the back office', 'Stock oversold online', 'Separate systems for store and website'],
    saudi: ['Local payment gateways and mada at checkout', 'Simplified e-invoices for every consumer order', 'Arabic storefront with right-to-left layout'],
    modules: ['Website', 'eCommerce', 'Inventory', 'Accounting'],
  },
  {
    id: 'hospitality',
    title: 'Hospitality',
    image: 'Hospitality.jpg',
    icon: '<path d="M3 20h18M5 20V9l7-5 7 5v11M10 20v-6h4v6"/>',
    summary: 'Hotels, serviced apartments and resorts with purchasing, F&B and accounting connected.',
    challenges: ['Front office, restaurants and stores in separate systems', 'Night audit and revenue reconciliation done by hand', 'Purchasing not linked to stock and cost control'],
    saudi: ['Simplified e-invoices with QR codes for guests, reported to ZATCA', 'Systems that scale across properties as tourism grows under Vision 2030', 'Bilingual Arabic and English guest documents'],
    modules: ['Point of Sale', 'Inventory', 'Purchase', 'Accounting', 'Planning'],
  },
  {
    id: 'travel',
    title: 'Travel & Tourism',
    image: 'Travel & Tourism.jpg',
    icon: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z"/>',
    summary: 'Tour operators and travel agencies with bookings, suppliers and invoicing in one place.',
    challenges: ['Packages priced in spreadsheets', 'Supplier payments and commissions tracked by hand', 'Customer enquiries scattered across WhatsApp and email'],
    saudi: ['VAT set up for domestic and international travel services', 'Ready for growing tourism demand under Vision 2030', 'Arabic and English quotations, vouchers and invoices'],
    modules: ['CRM', 'Sales', 'Purchase', 'Accounting', 'Website'],
  },
]

export const migrationSources = ['Tally', 'QuickBooks', 'Zoho Books', 'SAP Business One', 'Microsoft Dynamics', 'ERPNext', 'Older Odoo versions', 'Excel & Access']

export const startSteps = [
  {
    title: 'Scoping call',
    detail: 'A 60-minute conversation about your processes, systems and deadlines — including where you stand on ZATCA.',
    tag: 'Free',
  },
  {
    title: 'Fit-gap analysis',
    detail: 'Workshops across finance, sales, inventory and HR. You receive a documented fit-gap report and a build / configure / accept decision for each gap.',
    tag: 'Fixed scope',
  },
  {
    title: 'Implementation',
    detail: 'Configuration, data migration, testing and bilingual training — delivered against the scope agreed in the fit-gap.',
    tag: 'Planned delivery',
  },
]

