// Careers page: open positions and how hiring works.
// To open or close a role, add or remove it from `jobs`.

export type Job = {
  slug: string
  title: string
  team: 'Technical' | 'Functional' | 'Delivery' | 'Support'
  location: string
  type: string
  experience: string
  summary: string
  responsibilities: string[]
  requirements: string[]
}

export const careersEmail = 'info@wesprimeit.com'

export const jobs: Job[] = [
  {
    slug: 'odoo-developer',
    title: 'Odoo Developer',
    team: 'Technical',
    location: 'Riyadh · Hybrid',
    type: 'Full-time',
    experience: '2+ years',
    summary: 'Build the custom modules, integrations and reports that make Odoo fit each client.',
    responsibilities: [
      'Develop and customize Odoo modules in Python, XML and JavaScript (OWL)',
      'Build integrations with payment gateways, e-commerce platforms and government systems',
      'Migrate modules and data between Odoo versions',
      'Turn functional requirements into clean, tested and reviewed code',
    ],
    requirements: [
      '2+ years of hands-on Odoo development',
      'Strong Python and PostgreSQL skills',
      'Experience with the Odoo ORM, QWeb reports and Git',
      'Odoo certification is a plus',
    ],
  },
  {
    slug: 'odoo-functional-consultant',
    title: 'Odoo Functional Consultant',
    team: 'Functional',
    location: 'Riyadh · Hybrid',
    type: 'Full-time',
    experience: '3+ years',
    summary: 'Map how a business really works to Odoo, and guide clients from discovery to go-live.',
    responsibilities: [
      'Run discovery workshops and fit-gap analysis with client teams',
      'Configure Odoo Accounting, Inventory, Sales, Purchase, HR and Manufacturing',
      'Write functional specifications for the development team',
      'Lead user acceptance testing, training and go-live support',
    ],
    requirements: [
      '3+ years implementing Odoo or another ERP',
      'Solid understanding of finance, supply chain or HR processes',
      'Clear communication in English; Arabic is a strong advantage',
      'Knowledge of ZATCA e-invoicing and Saudi VAT is a plus',
    ],
  },
  {
    slug: 'frontend-developer',
    title: 'Frontend Developer',
    team: 'Technical',
    location: 'Riyadh · Hybrid',
    type: 'Full-time',
    experience: '2+ years',
    summary: 'Craft fast, bilingual websites, portals and dashboards on top of Odoo.',
    responsibilities: [
      'Build responsive websites and customer portals with React and TypeScript',
      'Customize Odoo website and portal themes',
      'Deliver Arabic and English interfaces with right-to-left layouts',
      'Turn designs into accessible, high-performance pages',
    ],
    requirements: [
      '2+ years with React and TypeScript',
      'Strong HTML, CSS and accessibility fundamentals',
      'Experience with right-to-left layouts is a plus',
      'A portfolio or GitHub profile we can look at',
    ],
  },
  {
    slug: 'erp-project-manager',
    title: 'ERP Project Manager',
    team: 'Delivery',
    location: 'Riyadh · On-site',
    type: 'Full-time',
    experience: '4+ years',
    summary: 'Keep Odoo implementations on scope, on time and on budget, with clients kept in the loop.',
    responsibilities: [
      'Plan and run Odoo projects from kickoff to handover',
      'Coordinate consultants, developers and client stakeholders',
      'Manage scope, risks and change requests',
      'Report progress clearly to client leadership',
    ],
    requirements: [
      '4+ years managing ERP or software projects',
      'Experience with Agile and phased delivery',
      'PMP, PRINCE2 or a similar certification is a plus',
      'Fluent English; Arabic preferred',
    ],
  },
  {
    slug: 'odoo-support-engineer',
    title: 'Odoo Support Engineer',
    team: 'Support',
    location: 'Riyadh · Hybrid',
    type: 'Full-time',
    experience: '1+ year',
    summary: 'Be the first to help when clients need answers, and keep their systems running smoothly.',
    responsibilities: [
      'Respond to client tickets within agreed response times',
      'Reproduce issues and hand clear reports to developers',
      'Handle configuration changes, user access and data fixes',
      'Keep the support knowledge base up to date',
    ],
    requirements: [
      '1+ year supporting Odoo or another business system',
      'Strong problem-solving and clear written communication',
      'Basic SQL or Python is a plus',
      'Arabic and English',
    ],
  },
]

export const jobTeams = ['All', ...new Set(jobs.map((j) => j.team))] as const

export const perks = [
  { title: 'Real projects, real impact', text: 'Work on live systems that run real Saudi businesses, not internal demos.', icon: '<path d="M12 2l3 7h7l-5.5 4.5L18.5 21 12 16.5 5.5 21l2-7.5L2 9h7z"/>' },
  { title: 'Grow your expertise', text: 'Learn alongside senior consultants and developers, with support toward Odoo certification.', icon: '<path d="M2 9l10-5 10 5-10 5-10-5z"/><path d="M6 11v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5"/>' },
  { title: 'Flexible working', text: 'Hybrid roles where the work allows, with a team that respects your time.', icon: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>' },
  { title: 'Every industry', text: 'Retail, manufacturing, healthcare, logistics and more, so no two projects feel the same.', icon: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>' },
]

export const hiringSteps: [string, string][] = [
  ['Apply', 'Send your CV and a short note about the role you want.'],
  ['Intro call', 'A 30-minute conversation about you, the role and the team.'],
  ['Skills interview', 'A practical technical or case discussion with the people you would work with.'],
  ['Offer', 'We move quickly and give you a clear answer within days.'],
]
