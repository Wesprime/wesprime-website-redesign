// Homepage copy, taken from the Wesprime redesign prototype.

export const contact = {
  email: 'info@wesprimeit.com',
  phone: '+966 561738911',
  phoneHref: 'tel:+966561738911',
}

/** WhatsApp chat link for the sales number. */
export const whatsappHref = `https://wa.me/${contact.phoneHref.replace(/\D/g, '')}`

export const aboutPoints = [
  'Business-first consulting',
  'Process analysis',
  'Odoo expertise',
  'Custom development',
  'Automation',
  'Long-term support',
]

export const coreServices = [
  {
    slug: 'erp-consultation',
    title: 'ERP Consultation & AI Enhancement',
    points: ['Business process analysis', 'ERP roadmap', 'Odoo module recommendations', 'AI-driven CRM opportunities', 'Process optimization'],
    icon: '<path d="M12 26l5-6 4 3 7-9" stroke-linecap="round" stroke-linejoin="round"/>',
  },
  {
    slug: 'odoo-implementation',
    title: 'Odoo Implementation',
    points: ['Requirement analysis', 'Configuration', 'Module implementation', 'Workflow setup', 'Testing & go-live'],
    icon: '<rect x="12" y="12" width="7" height="7" rx="1.5"/><rect x="21" y="12" width="7" height="7" rx="1.5"/><rect x="12" y="21" width="7" height="7" rx="1.5"/><rect x="21" y="21" width="7" height="7" rx="1.5" fill="currentColor"/>',
  },
  {
    slug: 'custom-odoo-development',
    title: 'Custom Odoo Development',
    points: ['Custom modules & workflows', 'Dashboards & reports', 'Business logic', 'Third-party integrations'],
    icon: '<path d="M16 14l-6 6 6 6M24 14l6 6-6 6" stroke-linecap="round" stroke-linejoin="round"/>',
  },
  {
    slug: 'data-migration',
    title: 'Data Migration & Integration',
    points: ['Legacy data migration', 'Data mapping & validation', 'Odoo integrations', 'E-commerce & POS integrations'],
    icon: '<ellipse cx="20" cy="13" rx="8" ry="3"/><path d="M12 13v14c0 1.7 3.6 3 8 3s8-1.3 8-3V13M12 20c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
  },
  {
    slug: 'training-enablement',
    title: 'Training & Enablement',
    points: ['User & functional training', 'Technical guidance', 'Documentation', 'User adoption'],
    icon: '<path d="M10 17l10-5 10 5-10 5-10-5z" stroke-linejoin="round"/><path d="M14 19v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5"/>',
  },
  {
    slug: 'support-maintenance',
    title: 'Support & Maintenance',
    points: ['Post-go-live support', 'Troubleshooting', 'Performance optimization', 'Enhancements & maintenance'],
    icon: '<path d="M20 11l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9v-6l8-3z" stroke-linejoin="round"/><path d="M16.5 20l2.5 2.5 4.5-5" stroke-linecap="round"/>',
  },
]

export const odooModules = [
  { name: 'Finance', desc: 'Accounting, invoicing, payments, bank reconciliation and financial reporting in one ledger, updated automatically by every sale, purchase and payroll run.', apps: ['Accounting', 'Invoicing', 'Expenses'] },
  { name: 'Sales', desc: 'Quotations, orders and pricing flow straight into delivery and invoicing, so nothing is re-keyed between teams.', apps: ['Sales', 'Point of Sale', 'E-commerce'] },
  { name: 'CRM', desc: 'Track leads and opportunities in one shared pipeline, with AI-driven CRM opportunities identified during consultation.', apps: ['CRM', 'Sales', 'Marketing'] },
  { name: 'Inventory', desc: 'Multi-warehouse stock, transfers, replenishment and traceability linked to purchasing and sales.', apps: ['Inventory', 'Purchase'] },
  { name: 'HR', desc: 'Employees, attendance, leave and payroll kept on a single record and connected to accounting.', apps: ['HR', 'Payroll'] },
  { name: 'Manufacturing', desc: 'Bills of materials, work orders and production planning tied to stock levels and procurement.', apps: ['Manufacturing', 'Inventory', 'Purchase'] },
  { name: 'Projects', desc: 'Plan tasks, track time and bill project work from the same system that runs the rest of the business.', apps: ['Project Management', 'Accounting'] },
  { name: 'Website', desc: 'Websites and online stores connected directly to products, stock and orders.', apps: ['Website', 'E-commerce'] },
  { name: 'Marketing', desc: 'Campaigns and marketing automation built on the customer data already in your CRM.', apps: ['Marketing', 'CRM'] },
]

/** Odoo's own app catalogue, grouped the way odoo.com presents it. */
export const odooAppCategories = [
  { name: 'Finance', apps: ['Accounting', 'Invoicing', 'Expenses', 'Spreadsheet', 'Documents', 'Sign'] },
  { name: 'Sales', apps: ['CRM', 'Sales', 'Point of Sale', 'Subscriptions', 'Rental'] },
  { name: 'Websites', apps: ['Website', 'eCommerce', 'Blog', 'Events', 'eLearning', 'Forum'] },
  { name: 'Supply Chain', apps: ['Inventory', 'Manufacturing', 'Purchase', 'Quality', 'Maintenance', 'PLM'] },
  { name: 'Human Resources', apps: ['Employees', 'Payroll', 'Recruitment', 'Time Off', 'Appraisals', 'Fleet'] },
  { name: 'Marketing', apps: ['Email Marketing', 'Marketing Automation', 'SMS Marketing', 'WhatsApp', 'Social Marketing', 'Surveys'] },
  { name: 'Services', apps: ['Project', 'Timesheets', 'Planning', 'Field Service', 'Helpdesk', 'Appointments'] },
  { name: 'Productivity', apps: ['Discuss', 'Knowledge', 'Approvals', 'IoT', 'VoIP', 'AI'] },
]

/** Implementation journey: 8 steps grouped into 4 phases of 2. */
export const journeyPhases = [
  {
    name: 'Understand',
    steps: [
      { title: 'Discover', text: 'Workshops with your teams to understand processes, challenges and goals.', icon: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>' },
      { title: 'Analyze', text: 'Map inefficiencies and turn them into clear, documented ERP requirements.', icon: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>' },
    ],
  },
  {
    name: 'Build',
    steps: [
      { title: 'Design', text: 'Shape the future workflows and an implementation roadmap you sign off.', icon: '<path d="M3 21l3.5-1 11-11-2.5-2.5-11 11z"/><path d="M14 6l2.5 2.5M15.5 4.5l2-2 4 4-2 2"/>' },
      { title: 'Implement', text: 'Configure and customize Odoo, then test every workflow with your team.', icon: '<rect x="3" y="3" width="7.5" height="7.5" rx="1.5"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5"/><path d="M17.25 13.5v7.5M13.5 17.25H21"/>' },
    ],
  },
  {
    name: 'Connect',
    steps: [
      { title: 'Integrate', text: 'Connect Odoo to the e-commerce, POS, banking and third-party tools you use.', icon: '<path d="M9 3v5M15 3v5M6 8h12v3a6 6 0 01-12 0V8zM12 17v4"/>' },
      { title: 'Migrate', text: 'Move your existing data across with mapping, validation and reconciliation.', icon: '<ellipse cx="12" cy="5.5" rx="7" ry="2.5"/><path d="M5 5.5v13c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-13M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5"/>' },
    ],
  },
  {
    name: 'Grow',
    steps: [
      { title: 'Train', text: 'Role-based training in Arabic and English, with guides your team can keep.', icon: '<path d="M2 9l10-5 10 5-10 5-10-5z"/><path d="M6 11v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5M22 9v6"/>' },
      { title: 'Support', text: 'Go-live support, then continuous improvements as your business grows.', icon: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>' },
    ],
  },
]

export const before = ['Disconnected systems', 'Manual processes', 'Duplicate data', 'Limited visibility', 'Slow reporting', 'Operational complexity']
export const after = ['Connected operations', 'Automated workflows', 'Centralized data', 'Real-time visibility', 'Better decision making', 'Scalable processes']
export const transformSteps = ['Analyze', 'Design', 'Implement', 'Automate', 'Support']

export const reasons = [
  ['Tailored Solutions', 'Built around real business workflows, not generic templates.'],
  ['Smooth Migration', 'Structured data mapping and validation before go-live.'],
  ['Experienced Odoo Experts', 'Functional and technical specialists across the Odoo platform.'],
  ['Scalable & Affordable', 'Enterprise capabilities designed for growing businesses.'],
  ['Dedicated Support', 'Continuous support, maintenance and optimization.'],
  ['Cloud Agility', 'Secure and flexible cloud-based operations.'],
]

export const faqs = [
  ['What is Odoo ERP?', 'Odoo is a suite of integrated business applications — accounting, sales, CRM, inventory, HR, manufacturing, website and more — that share one database, so information flows across departments without re-entry.'],
  ['Which Odoo modules can Wesprime implement?', 'Including Accounting, Sales, CRM, Purchase, Inventory, HR, Payroll, Manufacturing, Project Management, Website, E-commerce, Point of Sale and Marketing, scoped to your requirements.'],
  ['Can Wesprime customize Odoo?', 'Yes. We build custom workflows, dashboards, reports and business logic so Odoo fits the way your business works.'],
  ['Can you migrate data from an existing ERP?', 'Yes. We migrate legacy data with structured mapping and validation before go-live.'],
  ['Can Odoo integrate with third-party applications?', 'Yes. We connect Odoo with external systems, including e-commerce and POS platforms and other third-party applications.'],
  ['Do you provide post-go-live support?', 'Yes — troubleshooting, performance optimization, enhancements and continuous maintenance.'],
  ['Can you develop custom Odoo modules?', 'Yes. Custom module development is one of our core services.'],
  ['How long does an Odoo implementation take?', 'It depends on the number of modules, level of customization and volume of data. We confirm a timeline after the discovery and analysis stage.'],
  ['Can you provide functional and technical training?', 'Yes. We provide user and functional training, technical guidance and documentation to support adoption.'],
  ['Is Odoo compliant with ZATCA Phase 2 e-invoicing?', "Yes. Odoo's Saudi localization includes ZATCA e-invoicing for standard and simplified invoices, including clearance, reporting, QR codes and cryptographic stamps. We configure it, test it in the Fatoora simulation portal and take it to production with you."],
  ['Can Odoo run payroll the Saudi way — GOSI, WPS and end of service?', "Yes. Odoo's Saudi payroll covers housing and transport allowances, GOSI contributions, end-of-service provisions and WPS files for banks and Mudad. We tailor the rules to your policies and test them against real payslips."],
  ['Can Odoo be used in Arabic?', 'Yes. Odoo supports Arabic with right-to-left screens, and invoices, payslips and reports can be printed in Arabic and English.'],
  ['Where should our Odoo be hosted?', 'It depends on your data. Employee and customer personal data falls under the PDPL, so we help you choose between Odoo Online, Odoo.sh, a cloud region inside Saudi Arabia or your own servers.'],
]

export const serviceOptions = [
  'Odoo Implementation',
  'ERP Consultation',
  'Custom Odoo Development',
  'Data Migration & Integration',
  'Training & Support',
  'Digital Solutions',
]

export const companySizes = ['1–10 employees', '11–50 employees', '51–200 employees', '201+ employees']

// ---------- Homepage ----------

export const pillars = [
  {
    title: 'Business first',
    text: 'We map how your business actually runs before we configure anything, so the system fits your people — not the other way round.',
    icon: '<circle cx="12" cy="8" r="3.2"/><path d="M5.5 20c0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5"/><path d="M4 7.5l1 .9 1.8-2M17.2 6.4l1 .9 1.8-2M10.6 2.4l.6.6 1.2-1.3"/>',
  },
  {
    title: 'Quality delivery',
    text: 'Structured phases, testing at every stage and documented handover — so go-live is a milestone, not a gamble.',
    icon: '<path d="M12 2.5l2.2 1.6 2.7-.2.9 2.6 2.2 1.6-.8 2.6.8 2.6-2.2 1.6-.9 2.6-2.7-.2L12 21.5l-2.2-1.6-2.7.2-.9-2.6-2.2-1.6.8-2.6-.8-2.6 2.2-1.6.9-2.6 2.7.2z"/><path d="M8.5 12l2.4 2.4 4.6-4.8"/>',
  },
  {
    title: 'Dedication',
    text: 'One team from the first workshop to long after go-live, with consultants and developers who know your setup.',
    icon: '<path d="M12 9.5s-3.5-2.2-3.5-4.6A2 2 0 0112 3.6a2 2 0 013.5 1.3c0 2.4-3.5 4.6-3.5 4.6z"/><circle cx="7" cy="14" r="2.3"/><circle cx="17" cy="14" r="2.3"/><circle cx="12" cy="13" r="2.3"/><path d="M2.5 21c0-2.5 2-4.3 4.5-4.3M21.5 21c0-2.5-2-4.3-4.5-4.3M7.5 21c0-2.6 2-4.5 4.5-4.5s4.5 1.9 4.5 4.5"/>',
  },
  {
    title: 'Scalable & affordable',
    text: 'Enterprise capabilities sized for growing businesses. Start with the apps you need and add more as you grow.',
    icon: '<path d="M3 21h4v-7H3zM10 21h4V10h-4zM17 21h4V5h-4z"/><path d="M4 10l5-4 4 3 7-6M16 3h4v4"/>',
  },
]

export type StackLayer = { id: string; name: string; summary: string; items: string[]; work: string[] }

/** The layers of a typical Odoo deployment, top (users) to bottom (infrastructure). */
export const stackLayers: StackLayer[] = [
  {
    id: 'experience',
    name: 'Experience',
    summary: 'Where people meet the system — staff, customers and suppliers.',
    items: ['Web client', 'Mobile', 'Customer portal', 'Point of Sale', 'Website & eCommerce'],
    work: ['Arabic and English interfaces with right-to-left layouts', 'Role-based menus and dashboards', 'Customer and vendor portals'],
  },
  {
    id: 'apps',
    name: 'Business apps',
    summary: 'Integrated Odoo apps that share one database.',
    items: ['Accounting', 'Sales & CRM', 'Inventory', 'Manufacturing', 'HR & Payroll', 'Project'],
    work: ['Module selection and configuration', 'Workflows, approvals and automated actions', 'Reports and KPI dashboards'],
  },
  {
    id: 'framework',
    name: 'Odoo framework',
    summary: 'The open-source foundation we extend with custom modules.',
    items: ['Python ORM', 'OWL (JavaScript)', 'QWeb reports', 'Access rules', 'Scheduled actions'],
    work: ['Custom models, fields and business logic', 'OWL front-end components', 'Bilingual PDF layouts in QWeb'],
  },
  {
    id: 'data',
    name: 'Data',
    summary: 'One PostgreSQL database behind every app.',
    items: ['PostgreSQL', 'Data import & mapping', 'Audit trail', 'Backups'],
    work: ['Legacy data migration with validation', 'Opening balances and history', 'Backup and restore planning'],
  },
  {
    id: 'infra',
    name: 'Infrastructure',
    summary: 'Hosted where your data needs to live.',
    items: ['Odoo Online', 'Odoo.sh', 'Cloud server', 'On-premise', 'Docker'],
    work: ['Hosting choice and sizing', 'Staging and production environments', 'Version upgrades and monitoring'],
  },
]

export const integrationTypes = [
  'REST APIs', 'XML-RPC / JSON-RPC', 'Webhooks', 'Payment gateways', 'Bank statements', 'E-commerce platforms',
  'Shipping carriers', 'Biometric attendance', 'BI & reporting tools', 'Email & WhatsApp',
]

export const vision = 'To empower every business owner to operate with clarity and confidence — by converting fragmented operations into intelligent, automated, AI-driven environments that scale with precision.'
export const mission = 'To diagnose real business inefficiencies, simplify operational complexity, and engineer enterprise-grade ERP systems that remove friction, reduce risk, and restore leadership focus.'

export const coreValues = [
  { title: 'Automation', text: 'Repetitive work handled by the system, not by people.', icon: '<path d="M4 12a8 8 0 0114-5.3M20 12a8 8 0 01-14 5.3"/><path d="M18 3v4h-4M6 21v-4h4"/>' },
  { title: 'AI-driven', text: 'Insights and assistance built on your own business data.', icon: '<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9.5 10h5v4h-5zM9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/>' },
  { title: 'Process clarity', text: 'Every workflow mapped, owned and easy to follow.', icon: '<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>' },
  { title: 'Stability', text: 'Reliable systems that keep running through growth and change.', icon: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>' },
  { title: 'Growth', text: 'Foundations that scale with new users, branches and apps.', icon: '<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>' },
  { title: 'Connected systems', text: 'One source of truth across finance, sales, stock and people.', icon: '<circle cx="12" cy="12" r="3"/><circle cx="4.5" cy="5" r="2"/><circle cx="19.5" cy="5" r="2"/><circle cx="4.5" cy="19" r="2"/><circle cx="19.5" cy="19" r="2"/><path d="M6 6.5l3.8 3.8M18 6.5l-3.8 3.8M6 17.5l3.8-3.8M18 17.5l-3.8-3.8"/>' },
]
