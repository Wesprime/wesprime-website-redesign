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
    "slug": "odoo-implementation",
    "title": "Odoo Implementation",
    "tagline": "Structured delivery from requirements to a confident go-live.",
    "icon": "<rect x=\"3\" y=\"3\" width=\"7.5\" height=\"7.5\" rx=\"1.5\"></rect><rect x=\"13.5\" y=\"3\" width=\"7.5\" height=\"7.5\" rx=\"1.5\"></rect><rect x=\"3\" y=\"13.5\" width=\"7.5\" height=\"7.5\" rx=\"1.5\"></rect><path d=\"M17.25 13.5v7.5M13.5 17.25H21\"></path>",
    "overview": "We implement Odoo in clear stages — gathering requirements, configuring each module, setting up your workflows, testing with your team and supporting you through go-live — so the system reflects how you work from day one.",
    "included": [
      "Requirement analysis",
      "Configuration",
      "Module implementation",
      "Workflow setup",
      "Testing",
      "Go-live"
    ],
    "modules": [
      "Accounting",
      "Sales",
      "Purchase",
      "Inventory",
      "HR",
      "Manufacturing"
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
    "slug": "custom-odoo-development",
    "title": "Custom Odoo Development",
    "tagline": "Custom modules and logic built for your requirements.",
    "icon": "<path d=\"M8 7l-5 5 5 5M16 7l5 5-5 5M13.5 4l-3 16\"></path>",
    "overview": "When configuration and customization are not enough, we develop new Odoo modules, business logic, dashboards and reports, and connect Odoo to the other applications your business depends on.",
    "included": [
      "Custom modules",
      "Custom workflows",
      "Dashboards",
      "Reports",
      "Business logic",
      "Third-party integrations"
    ],
    "modules": [
      "Any Odoo module"
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
  }
]

export const serviceGroups = [
  { title: 'Odoo ERP', slugs: services.slice(0, 4).map((s) => s.slug) },
  { title: 'Data & Enablement', slugs: services.slice(4, 8).map((s) => s.slug) },
  { title: 'Digital Solutions', slugs: services.slice(8).map((s) => s.slug) },
]

export const getService = (slug: string) => services.find((s) => s.slug === slug)
