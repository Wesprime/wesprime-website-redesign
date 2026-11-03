// Content for the service detail pages, taken from the Wesprime redesign prototype.
export type Service = {
  slug: string
  title: string
  tagline: string
  /** Inner markup of a 24x24 stroke icon */
  icon: string
  overview: string
  included: string[]
  modules: string[]
}

export const services: Service[] = [
  {
    "slug": "erp-consultation",
    "title": "ERP Consultation & AI Enhancement",
    "tagline": "Understand your processes first — then map the right ERP roadmap.",
    "icon": "<circle cx=\"9\" cy=\"8\" r=\"3\"></circle><circle cx=\"17\" cy=\"9\" r=\"2.5\"></circle><path d=\"M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M14 15.5c.9-.6 1.9-1 3-1 2.8 0 4.5 2 4.5 5\"></path>",
    "overview": "Before anything is configured, we study how your business actually operates: where data is re-entered, where approvals stall and where reporting breaks down. The outcome is a clear ERP roadmap, the right Odoo modules for your needs, and practical opportunities to apply AI to your CRM and everyday decisions.",
    "included": [
      "Business process analysis",
      "ERP roadmap",
      "Odoo module recommendations",
      "AI-driven CRM opportunities",
      "Process optimization",
      "Requirement documentation"
    ],
    "modules": [
      "CRM",
      "Sales",
      "Accounting",
      "Inventory"
    ]
  },
  {
    "slug": "odoo-customization",
    "title": "Odoo Customization",
    "tagline": "Tailor Odoo to the way your business really works.",
    "icon": "<path d=\"M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0\"></path><circle cx=\"16\" cy=\"6\" r=\"2\"></circle><circle cx=\"10\" cy=\"12\" r=\"2\"></circle><circle cx=\"18\" cy=\"18\" r=\"2\"></circle>",
    "overview": "Standard Odoo covers a lot, but every business has its own rules. We adapt workflows, forms, approvals and documents so your team works in a system that fits their day — not the other way round.",
    "included": [
      "Workflow tailoring",
      "Forms & views",
      "Approval flows",
      "Automated actions",
      "Report & document layouts",
      "User roles & access"
    ],
    "modules": [
      "Sales",
      "Purchase",
      "Inventory",
      "Accounting"
    ]
  },
  {
    "slug": "zatca-e-invoicing",
    "title": "ZATCA E-Invoicing",
    "tagline": "Saudi e-invoicing readiness — configured, tested and documented in Odoo.",
    "icon": "<path d=\"M6 3h9l4 4v14H6z\"></path><path d=\"M15 3v4h4\"></path><path d=\"M9 13l2 2 4-4\"></path><path d=\"M9 18h6\"></path>",
    "overview": "We configure Odoo's Saudi localization so every standard and simplified invoice is signed, cleared or reported to ZATCA automatically. That includes master data, taxes and exemption codes, onboarding each journal in the Fatoora simulation portal, and taking you to production with confidence.",
    "included": [
      "Phase 2 readiness review",
      "Company and customer master data",
      "VAT and exemption setup",
      "Fatoora simulation testing",
      "Production onboarding",
      "POS and credit note compliance"
    ],
    "modules": [
      "Accounting",
      "Invoicing",
      "Point of Sale"
    ]
  },
  {
    "slug": "inventory-management",
    "title": "Inventory Management",
    "tagline": "Accurate stock across every warehouse, branch and van.",
    "icon": "<path d=\"M3 7l9-4 9 4-9 4z\"></path><path d=\"M3 7v10l9 4 9-4V7\"></path><path d=\"M12 11v10\"></path>",
    "overview": "We set up Odoo Inventory around how your goods really move: warehouses and locations, receipt and delivery routes, replenishment rules and barcode scanning. Stock stays linked to purchasing, sales and accounting, so the number on screen matches the shelf.",
    "included": [
      "Multi-warehouse setup",
      "Routes and transfers",
      "Reordering rules",
      "Barcode scanning",
      "Lot and serial tracking",
      "Inventory valuation"
    ],
    "modules": [
      "Inventory",
      "Purchase",
      "Sales",
      "Barcode"
    ]
  },
  {
    "slug": "crm",
    "title": "CRM Implementation",
    "tagline": "One shared pipeline from first enquiry to signed deal.",
    "icon": "<path d=\"M3 4h18l-7 8v6l-4 2v-8z\"></path>",
    "overview": "We implement Odoo CRM so every lead, call and quotation sits in one pipeline your whole sales team can see. Stages, activities and lead scoring are shaped around your sales process, with AI-driven insights where they genuinely help and a direct link to quotations and invoices.",
    "included": [
      "Pipeline and stage design",
      "Lead capture from website and email",
      "Activities and follow-ups",
      "Lead scoring and AI insights",
      "Sales dashboards",
      "Quotation integration"
    ],
    "modules": [
      "CRM",
      "Sales",
      "Email Marketing",
      "Website"
    ]
  },
  {
    "slug": "data-migration",
    "title": "Data Migration",
    "tagline": "Move your existing data into Odoo — mapped and validated.",
    "icon": "<ellipse cx=\"12\" cy=\"5.5\" rx=\"7\" ry=\"2.5\"></ellipse><path d=\"M5 5.5v13c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-13M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5\"></path>",
    "overview": "We move data from legacy systems and spreadsheets into Odoo through structured mapping and validation, so customers, products, balances and history arrive clean and ready for go-live.",
    "included": [
      "Legacy data migration",
      "Data mapping",
      "Data validation",
      "Master data preparation",
      "Migration testing",
      "Go-live cutover"
    ],
    "modules": [
      "Accounting",
      "Inventory",
      "Sales",
      "CRM"
    ]
  },
  {
    "slug": "system-integration",
    "title": "System Integration",
    "tagline": "Connect Odoo with the rest of your business systems.",
    "icon": "<path d=\"M9 3v5M15 3v5M6 8h12v3a6 6 0 01-12 0V8zM12 17v4\"></path>",
    "overview": "We connect Odoo to e-commerce platforms, point-of-sale systems and other third-party applications so information flows automatically instead of being copied between tools.",
    "included": [
      "Odoo integrations",
      "E-commerce integrations",
      "POS integrations",
      "Third-party applications",
      "API connections",
      "Data synchronization"
    ],
    "modules": [
      "E-commerce",
      "Point of Sale",
      "Website",
      "Accounting"
    ]
  },
  {
    "slug": "training-enablement",
    "title": "Training & Enablement",
    "tagline": "Help every user get real value from Odoo.",
    "icon": "<path d=\"M2 9l10-5 10 5-10 5-10-5z\"></path><path d=\"M6 11v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5M22 9v6\"></path>",
    "overview": "A new system only works when people use it well. We provide user, functional and technical training with clear documentation, so your teams adopt Odoo confidently.",
    "included": [
      "User training",
      "Functional training",
      "Technical guidance",
      "Documentation",
      "User adoption",
      "Role-based sessions"
    ],
    "modules": [
      "All implemented modules"
    ]
  },
  {
    "slug": "support-maintenance",
    "title": "Support & Maintenance",
    "tagline": "Continuous support long after go-live.",
    "icon": "<path d=\"M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z\"></path><path d=\"M8.5 12l2.5 2.5 4.5-5\"></path>",
    "overview": "After go-live we stay with you — resolving issues, optimizing performance and making enhancements as your business grows and your needs change.",
    "included": [
      "Post-go-live support",
      "Troubleshooting",
      "Performance optimization",
      "Enhancements",
      "Continuous maintenance",
      "User assistance"
    ],
    "modules": [
      "All implemented modules"
    ]
  },
  {
    "slug": "web-development",
    "title": "Web Development",
    "tagline": "Websites built to present your business and connect to operations.",
    "icon": "<rect x=\"2.5\" y=\"4\" width=\"19\" height=\"16\" rx=\"2\"></rect><path d=\"M2.5 8.5h19M6 6.3h0M8.5 6.3h0\"></path>",
    "overview": "We design and build responsive business websites and online stores, including sites built on Odoo Website and E-commerce so products, orders and enquiries flow straight into your ERP.",
    "included": [
      "Business websites",
      "Odoo Website",
      "Responsive design",
      "Online stores",
      "Content management",
      "SEO-ready structure"
    ],
    "modules": [
      "Website",
      "E-commerce"
    ]
  },
  {
    "slug": "software-development",
    "title": "Software Development",
    "tagline": "Custom software for needs off-the-shelf tools miss.",
    "icon": "<rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"3\"></rect><path d=\"M9 9l-2.5 3L9 15M15 9l2.5 3L15 15\"></path>",
    "overview": "From requirement analysis to testing and maintenance, we build software around your specific processes — and connect it to your ERP where it matters.",
    "included": [
      "Requirement analysis",
      "Custom software",
      "Web applications",
      "API development",
      "Testing",
      "Maintenance"
    ],
    "modules": [
      "ERP-connected"
    ]
  },
  {
    "slug": "business-automation",
    "title": "Business Automation",
    "tagline": "Remove repetitive manual work from everyday operations.",
    "icon": "<path d=\"M4 12a8 8 0 0114-5.3M20 12a8 8 0 01-14 5.3\"></path><path d=\"M18 3v4h-4M6 21v-4h4\"></path>",
    "overview": "We identify repetitive tasks and automate them — approvals, notifications, scheduled actions and documents — so your team spends time on work that needs judgement.",
    "included": [
      "Workflow automation",
      "Approval flows",
      "Automated notifications",
      "Scheduled actions",
      "Document generation",
      "Process monitoring"
    ],
    "modules": [
      "CRM",
      "Sales",
      "Accounting",
      "Inventory"
    ]
  },
  {
    "slug": "ai-solutions",
    "title": "AI Solutions",
    "tagline": "Practical AI applied to your business data.",
    "icon": "<rect x=\"6\" y=\"6\" width=\"12\" height=\"12\" rx=\"2\"></rect><path d=\"M9.5 10h5v4h-5zM9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4\"></path>",
    "overview": "We help you find where AI can genuinely help — such as CRM insights and intelligent automation — and build solutions that work with the data already in your ERP.",
    "included": [
      "AI use-case discovery",
      "AI-driven CRM insights",
      "Intelligent automation",
      "Data analysis & reporting",
      "ERP data integration",
      "Pilot & rollout"
    ],
    "modules": [
      "CRM",
      "Sales"
    ]
  },
  {
    "slug": "custom-applications",
    "title": "Custom Applications",
    "tagline": "Business-specific applications for your team and customers.",
    "icon": "<rect x=\"6\" y=\"2.5\" width=\"12\" height=\"19\" rx=\"2.5\"></rect><path d=\"M10 18.5h4M9.5 7h5M9.5 10.5h5\"></path>",
    "overview": "We build focused applications — internal tools, portals and dashboards — designed around one job and connected to your core systems.",
    "included": [
      "Business-specific apps",
      "Internal portals",
      "Mobile-friendly tools",
      "ERP-connected apps",
      "Dashboards",
      "Ongoing enhancement"
    ],
    "modules": [
      "ERP-connected"
    ]
  },
  {
    "slug": "erp-health-check",
    "title": "ERP Health Check & Optimization",
    "tagline": "Get more from the system you already have — even if someone else implemented it.",
    "icon": "<path d=\"M3 12h4l2-5 4 10 2-5h6\"></path>",
    "overview": "Many ERP systems are installed but never quite solve the problem they were bought for. We review how your existing system is configured and used, find why it underperforms, and fix the issues that matter most — ranked by business risk and effort — before retraining your team.",
    "included": [
      "Existing-system health assessment",
      "Stakeholder interviews",
      "Configuration and report review",
      "Prioritized issue register",
      "Targeted fixes and retesting",
      "Retraining and adoption support"
    ],
    "modules": [
      "Accounting",
      "Sales",
      "Purchase",
      "Inventory"
    ]
  },
  {
    "slug": "dashboards-reporting",
    "title": "Dashboards & Business Insights",
    "tagline": "See sales, cash, stock and profitability in one place.",
    "icon": "<path d=\"M4 20V11M10 20V5M16 20v-6M22 20H2\"></path>",
    "overview": "Reports that take days to compile, or don't agree with each other, leave leaders guessing. We agree the KPIs that matter, define where each number comes from, and build dashboards on your business data that are checked against your source reports and shared by role.",
    "included": [
      "KPI workshop and definitions",
      "Data-source review",
      "Dashboard design",
      "Validation against source reports",
      "Role-based access",
      "Training and refresh schedule"
    ],
    "modules": [
      "Accounting",
      "Sales",
      "Inventory",
      "Spreadsheet"
    ]
  },
  {
    "slug": "go-live-hypercare",
    "title": "Go-Live HyperCare",
    "tagline": "Focused support in the first weeks after go-live.",
    "icon": "<circle cx=\"12\" cy=\"12\" r=\"9\"></circle><circle cx=\"12\" cy=\"12\" r=\"4\"></circle><path d=\"M5.6 5.6l3.6 3.6M14.8 14.8l3.6 3.6M18.4 5.6l-3.6 3.6M9.2 14.8l-3.6 3.6\"></path>",
    "overview": "Real transactions reveal edge cases that testing never does. For an agreed period after go-live we log and prioritize issues, check in with key users, watch critical processes and guide people through real work — then hand over formally to ongoing support.",
    "included": [
      "Agreed start and end dates",
      "Go-live issue board",
      "Priority-based issue handling",
      "Regular check-ins with key users",
      "Critical process monitoring",
      "Handover to ongoing support"
    ],
    "modules": [
      "All implemented modules"
    ]
  }
]

// Services in each menu group, in display order.
export const serviceGroups = [
  { title: 'Odoo ERP', slugs: ['erp-consultation', 'odoo-customization', 'zatca-e-invoicing', 'inventory-management', 'crm', 'erp-health-check'] },
  { title: 'Data & Enablement', slugs: ['data-migration', 'system-integration', 'dashboards-reporting', 'training-enablement', 'go-live-hypercare', 'support-maintenance'] },
  { title: 'Digital Solutions', slugs: ['web-development', 'software-development', 'business-automation', 'ai-solutions', 'custom-applications'] },
]

export const getService = (slug: string) => services.find((s) => s.slug === slug)
