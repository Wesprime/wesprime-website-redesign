// Outcome-first content for each service page: the problem the visitor recognizes,
// what improves, who it suits, honest scope boundaries, FAQs and related services.

export type Demo = 'pipeline' | 'dashboard' | 'packages'

export type ServiceDetail = {
  /** Three pain points, in the customer's own words */
  problems: string[]
  /** Observable improvements — never guaranteed financial results */
  outcomes: string[]
  /** Who the service suits */
  fit: string
  /** Scope limits and responsibilities, stated plainly */
  boundaries: string[]
  faqs: [string, string][]
  /** Up to three related service slugs */
  related: string[]
  /** Primary call-to-action label */
  cta: string
  demo?: Demo
  /** A video file in public/media shown in the hero instead of the animated overview */
  video?: string
}

export const serviceDetails: Record<string, ServiceDetail> = {
  'erp-consultation': {
    problems: [
      'You know something is inefficient, but not whether the answer is a new system, better configuration, automation or training.',
      'Every vendor pitches software before anyone has looked at how you actually work.',
      'Requirements live in people\'s heads, so quotes are hard to compare.',
    ],
    outcomes: [
      'An objective view of root causes before you invest',
      'Documented processes, controls and system gaps',
      'A prioritized roadmap with options, dependencies and risks',
      'Clear requirements you can take to any provider',
    ],
    fit: 'Businesses facing confusing technology choices, fragmented reports or unclear ERP requirements — before or instead of a new implementation.',
    boundaries: [
      'Advice is about processes and systems. Tax and legal questions are referred to appropriately licensed specialists.',
      'Packages are Wesprime implementation scopes, not Odoo licence tiers. Licences, hosting and data migration are quoted separately, and no package includes unlimited apps or development.',
    ],
    faqs: [
      ['Do we have to buy Odoo after the consultation?', 'No. The roadmap is yours. Sometimes the right answer is reconfiguring what you have or training your team.'],
      ['What do we receive at the end?', 'A written summary of current processes, the gaps we found, recommended options and a prioritized next-step plan.'],
      ['Which package is right for us?', 'Use the package guide on this page as a starting point. We confirm the right fit after discovery — a small company with complex integrations may still need a larger scope.'],
    ],
    related: ['odoo-customization', 'erp-health-check', 'data-migration'],
    cta: 'Book an ERP Fit Assessment',
    demo: 'packages',
    video: 'consultation-ai.mp4',
  },
  'odoo-customization': {
    problems: [
      'Standard screens don\'t match the way your team actually works.',
      'Approvals happen over chat because the system has no step for them.',
      'Documents and reports need manual rework before they can be sent.',
    ],
    outcomes: [
      'Workflows, forms and approvals that match your real process',
      'Documents and reports that go out without manual edits',
      'Users only see what their role needs',
    ],
    fit: 'Businesses already on Odoo, or implementing it, whose rules go beyond standard configuration.',
    boundaries: [
      'Every change is agreed and tested against your processes first. We prefer configuration over code where it does the job.',
    ],
    faqs: [
      ['Will customization make upgrades harder?', 'Heavier customization can add upgrade effort, which is why we keep changes as light as possible and document every one.'],
      ['Can you change a system another partner built?', 'Yes, after reviewing it. An ERP Health Check is often the best first step.'],
    ],
    related: ['system-integration', 'business-automation', 'erp-health-check'],
    cta: 'Discuss Your Requirements',
    video: 'customization.mp4',
  },
  'zatca-e-invoicing': {
    problems: [
      'Invoices are prepared manually or in a system that isn\'t set up for e-invoicing.',
      'You aren\'t sure which phase and wave apply to your business.',
      'Rejected or mismatched invoices create reconciliation work.',
    ],
    outcomes: [
      'A clear assessment of your current e-invoicing gaps',
      'Invoice fields, taxes and numbering configured for the agreed requirement',
      'Documented test results and exception handling',
      'A plan for future regulatory changes',
    ],
    fit: 'Saudi businesses needing invoice assessment, Odoo configuration, testing or onboarding for ZATCA e-invoicing.',
    boundaries: [
      'We configure and test the software. Whether your business is compliant, and how tax rules apply to you, should be confirmed with your tax adviser.',
      'QR code generation alone is not Phase 2 integration. Wesprime is not affiliated with or endorsed by ZATCA.',
    ],
    faqs: [
      ['Does Odoo support ZATCA Phase 2?', 'Odoo\'s Saudi localization supports clearance and reporting for standard and simplified invoices. We configure it, test it in the Fatoora simulation portal and onboard you to production.'],
      ['Can you tell us which wave applies to us?', 'We help you review the official announcements with your advisers; applicability is confirmed per business.'],
    ],
    related: ['erp-consultation', 'odoo-customization', 'support-maintenance'],
    cta: 'Request a Fatoora Readiness Review',
    video: 'zatca.mp4',
  },
  'inventory-management': {
    problems: [
      'The stock on screen doesn\'t match the stock on the shelf.',
      'You find out an item is out only when a customer orders it.',
      'Transfers between warehouses or branches are tracked on paper.',
    ],
    outcomes: [
      'Stock levels you can trust across every location',
      'Reorder rules that flag shortages before they hurt sales',
      'Traceability by lot or serial number where you need it',
      'Stock value linked straight to accounting',
    ],
    fit: 'Trading, distribution, retail and light manufacturing businesses with one or more warehouses.',
    boundaries: [
      'Barcode hardware and opening stock counts are planned with you; physical counts remain your team\'s responsibility.',
    ],
    faqs: [
      ['Can we use barcode scanners?', 'Yes. Odoo Barcode works with common scanners and mobile devices; we help you choose and test them.'],
      ['How is opening stock loaded?', 'From a validated count and import, reconciled before go-live.'],
    ],
    related: ['erp-consultation', 'data-migration', 'dashboards-reporting'],
    cta: 'Talk to an Expert',
    video: 'inventory.mp4',
  },
  crm: {
    problems: [
      'Enquiries sit in WhatsApp chats, inboxes and spreadsheets.',
      'Nobody owns the next action, so promising leads go quiet.',
      'Managers can\'t see which deals are hot or why opportunities stall.',
    ],
    outcomes: [
      'Every lead has an owner, a stage and a next action',
      'Overdue follow-ups are easy to spot in one pipeline',
      'Hot and dormant leads follow different, configurable nurture paths',
      'Managers can review conversion, activity and deal age',
    ],
    fit: 'Businesses receiving leads from the website, referrals, WhatsApp or campaigns, where owners and sales managers lack visibility of follow-ups.',
    boundaries: [
      'Built on Odoo CRM, which is third-party software. AI lead scores are suggestions, not guaranteed predictions.',
      'WhatsApp messaging needs customer permission, approved templates and a suitable Odoo edition and plan — we confirm this before scoping.',
    ],
    faqs: [
      ['Can leads from our website go straight into the CRM?', 'Yes, where website capture is in scope, enquiries arrive in the pipeline with their source recorded.'],
      ['Can we follow up through WhatsApp?', 'Odoo\'s WhatsApp app is available on Enterprise plans and requires approved message templates and customer consent. We check your edition and scope first.'],
    ],
    related: ['web-development', 'business-automation', 'erp-consultation'],
    cta: 'Request a CRM Process Review',
    demo: 'pipeline',
    video: 'odoo-crm-customer-management.mp4',
  },
  'erp-health-check': {
    problems: [
      'The system was installed but didn\'t solve the problem it was bought for.',
      'Staff use spreadsheets and workarounds alongside the ERP.',
      'Reports from the system don\'t reconcile, so nobody trusts them.',
    ],
    outcomes: [
      'A clear diagnosis of why the system underperforms',
      'Fixes ranked by business risk and effort',
      'Better fit between your approved processes and the configuration',
      'Adoption and accuracy measures to confirm the improvement',
    ],
    fit: 'Organizations with an existing Odoo system that is slow, underused, error-prone or out of step with real operations — including systems implemented by another provider.',
    boundaries: [
      'Systems are reviewed only with your authorization and access. Fixes after the assessment are a separately approved scope.',
      'Our depth is in Odoo. For other ERPs we start with a narrowly scoped diagnostic.',
    ],
    faqs: [
      ['Our system was implemented by another partner. Can you still help?', 'Yes. Many health checks start exactly there. We review the setup with your permission and recommend what to fix first.'],
      ['Do we have to replace the system?', 'Usually not. The goal is to recover value from what you already own.'],
    ],
    related: ['erp-consultation', 'training-enablement', 'support-maintenance'],
    cta: 'Request an ERP Health Review',
    video: 'health-check-optimization.mp4',
  },
  'data-migration': {
    problems: [
      'Balances, stock and customer records are spread across old systems and files.',
      'You don\'t know how clean the existing data really is.',
      'Fear of losing history makes changing systems feel risky.',
    ],
    outcomes: [
      'Known data-quality gaps before migration starts',
      'Opening and historical data mapped to the approved scope',
      'Documented reconciliation of balances and stock',
      'A controlled cutover with a fallback plan and your sign-off',
    ],
    fit: 'Businesses changing ERP or accounting software, consolidating databases or upgrading systems.',
    boundaries: [
      'Migration covers the data that exists and can be exported — it is not a reconstruction of undocumented history. Export rights from the old system must be confirmed first.',
    ],
    faqs: [
      ['How much history should we migrate?', 'We agree this with you during mapping. Many businesses move opening balances plus a limited period of detail.'],
      ['How do we know the numbers are right?', 'We run trial migrations and reconcile key totals with your team before the final cutover.'],
    ],
    related: ['erp-consultation', 'system-integration', 'dashboards-reporting'],
    cta: 'Assess My Migration',
    video: 'odoo-data-migration.mp4',
  },
  'system-integration': {
    problems: [
      'Orders from your online store or POS are re-keyed into the ERP.',
      'Stock and prices drift out of sync between systems.',
      'Nobody is sure which system holds the right number.',
    ],
    outcomes: [
      'Information flows automatically between the systems you use',
      'One agreed source of truth for each type of data',
      'Errors are logged and visible instead of silently lost',
    ],
    fit: 'Businesses running Odoo alongside e-commerce, POS, banking or other third-party applications.',
    boundaries: [
      'What can be connected depends on each system\'s API, licensing and access. We confirm feasibility before quoting.',
    ],
    faqs: [
      ['Can you connect any system?', 'Many systems, but not every one. It depends on the access the other system provides — we check before we commit.'],
      ['What happens if a sync fails?', 'Integrations are built with error logging and retry, so failures are visible and recoverable.'],
    ],
    related: ['odoo-customization', 'data-migration', 'business-automation'],
    cta: 'Discuss an Integration',
    video: 'odoo-system-integration.mp4',
  },
  'dashboards-reporting': {
    problems: [
      'Reports take days to compile and arrive after decisions are made.',
      'Numbers from different teams don\'t reconcile.',
      'The questions leaders actually ask aren\'t answered by any report.',
    ],
    outcomes: [
      'Management KPIs in one view, refreshed on an agreed schedule',
      'Filters by month, team, branch or product',
      'Early flags for overdue payments, margin shifts and delays',
      'Dashboards shared by role and permission',
    ],
    fit: 'Owners, finance leaders, sales and operations managers using Odoo or other assessed business systems.',
    boundaries: [
      'Connecting other systems depends on API, database or export access, data quality and licensing. Dashboard figures are management information, not audited financial statements.',
    ],
    faqs: [
      ['Does this only work with Odoo?', 'Odoo is where we start. Other systems are assessed case by case for data access and quality.'],
      ['How do we know the dashboard is right?', 'Every KPI is defined with you and validated against your source reports before it goes live.'],
    ],
    related: ['erp-consultation', 'erp-health-check', 'business-automation'],
    cta: 'Book a Data Assessment',
    demo: 'dashboard',
    video: 'odoo-dashboards-insights.mp4',
  },
  'training-enablement': {
    problems: [
      'The system is live, but people still don\'t understand the workflows.',
      'New staff learn from whoever happens to be free.',
      'The same mistakes keep coming back after go-live.',
    ],
    outcomes: [
      'Users understand the process their role requires',
      'Less reliance on informal one-to-one instruction',
      'Guides your team can keep and reuse',
    ],
    fit: 'New Odoo users, finance teams, supervisors, administrators and businesses onboarding new staff.',
    boundaries: [
      'Training is a defined scope in your agreement. It is separate from fixing system incidents, which is handled under support.',
    ],
    faqs: [
      ['Is training in Arabic?', 'Sessions can be delivered in Arabic and English.'],
      ['Can you train our trainers?', 'Yes. Train-the-trainer sessions help you onboard future staff yourselves.'],
    ],
    related: ['go-live-hypercare', 'support-maintenance', 'erp-health-check'],
    cta: 'Plan a Team Training Session',
    video: 'odoo-training-enablement.mp4',
  },
  'go-live-hypercare': {
    problems: [
      'Real transactions reveal edge cases that testing didn\'t catch.',
      'Users need fast answers while they\'re still learning.',
      'It isn\'t clear who owns an issue in the first busy weeks.',
    ],
    outcomes: [
      'Issues are logged and prioritized promptly',
      'Users get guided help with real work during the transition',
      'A clear exit checklist before moving to normal support',
    ],
    fit: 'Businesses entering the first live weeks after a Wesprime implementation, or a separately contracted system transition.',
    boundaries: [
      'HyperCare is time-bounded, intensive support. It does not replace long-term support or include new development.',
    ],
    faqs: [
      ['How long does HyperCare last?', 'Start and end dates are agreed per project, based on its size and complexity.'],
      ['What happens afterwards?', 'Open items are handed over formally to ongoing support, if you choose it.'],
    ],
    related: ['training-enablement', 'support-maintenance', 'erp-health-check'],
    cta: 'Discuss HyperCare Coverage',
    video: 'odoo-go-live-hypercare.mp4',
  },
  'support-maintenance': {
    problems: [
      'Nobody clearly owns system issues after go-live.',
      'The same problems keep recurring.',
      'Answers take too long and work stops while you wait.',
    ],
    outcomes: [
      'A defined channel to report issues',
      'Visible ticket status, priority and escalation',
      'Known support hours, response targets and included scope',
      'Recurring issues reviewed, with preventive changes proposed',
    ],
    fit: 'Existing Wesprime customers and eligible third-party Odoo implementations that need ongoing application support.',
    boundaries: [
      'Support covers your applications. New features and development are scoped separately; hosting is a separate arrangement.',
    ],
    faqs: [
      ['What response times do you offer?', 'Support hours and response targets are agreed in your support plan.'],
      ['Are enhancements included?', 'Small configuration changes may be; new features are quoted separately so the scope stays clear.'],
    ],
    related: ['go-live-hypercare', 'training-enablement', 'erp-health-check'],
    cta: 'Review My Current Application',
    video: 'odoo-support-maintenance.mp4',
  },
  'web-development': {
    problems: [
      'An outdated or generic website fails to explain what you offer.',
      'Enquiries from the site get missed or answered late.',
      'Customers need manual steps a simple portal could remove.',
    ],
    outcomes: [
      'A polished bilingual presence that explains customer value',
      'Enquiry flows that reach the right team',
      'Visibility of where enquiries come from',
    ],
    fit: 'Startups, service providers, trading firms and established businesses needing a professional website or online store.',
    boundaries: [
      'Custom applications are not included in a standard website package. Hosting, domains and third-party subscriptions are agreed separately.',
    ],
    faqs: [
      ['Can enquiries go straight into our CRM?', 'Yes, where CRM lead capture is in scope.'],
      ['Will the site work in Arabic?', 'Yes. We build right-to-left layouts and Arabic content properly, not as an afterthought.'],
    ],
    related: ['crm', 'custom-applications', 'business-automation'],
    cta: 'Explore Digital Experiences',
  },
  'software-development': {
    problems: [
      'Off-the-shelf tools don\'t fit a process that matters to you.',
      'Teams juggle several apps for one job.',
      'Important data is trapped in a tool nobody can change.',
    ],
    outcomes: [
      'Software built around your specific process',
      'Connected to your ERP where it matters',
      'Tested and maintained under an agreed plan',
    ],
    fit: 'Businesses with a clear need that standard software and ERP configuration can\'t meet.',
    boundaries: [
      'Scope, ownership of source code, hosting and maintenance are agreed in writing before development begins.',
    ],
    faqs: [
      ['Do you build mobile apps?', 'We build mobile-friendly web applications. Native mobile apps are estimated separately after a use-case study.'],
      ['How do you estimate?', 'After a requirements study, so you know the scope before you commit.'],
    ],
    related: ['custom-applications', 'system-integration', 'web-development'],
    cta: 'Discuss Your App Idea',
  },
  'business-automation': {
    problems: [
      'Staff chase managers for approvals by phone and chat.',
      'The same data is typed into more than one place.',
      'Reminders are sent by hand, and nobody can see which step is late.',
    ],
    outcomes: [
      'A visible path for every request or task',
      'Fewer repetitive manual steps in suitable processes',
      'Consistent approval rules with an audit trail',
      'Escalation when items become overdue',
    ],
    fit: 'Operations, finance, HR and sales managers handling approvals and repetitive business communication.',
    boundaries: [
      'Automations follow your approved rules and permissions. Critical financial actions keep human approval where required.',
    ],
    faqs: [
      ['Where do we start?', 'With one process that hurts most. We measure it before and after, then decide what to automate next.'],
      ['Does automation replace people?', 'No. It removes repetitive steps so people spend time on work that needs judgement.'],
    ],
    related: ['crm', 'odoo-customization', 'erp-consultation'],
    cta: 'Discuss an Automation Pilot',
  },
  'ai-solutions': {
    problems: [
      'You hear a lot about AI but can\'t see where it fits your business.',
      'Data that could guide decisions sits unused in your systems.',
      'Pilots elsewhere promised a lot and delivered little.',
    ],
    outcomes: [
      'A short list of practical AI use cases for your data',
      'A small pilot to test value before wider rollout',
      'Clear rules on what data is used and who can see it',
    ],
    fit: 'Businesses with data in Odoo or other systems who want to test AI carefully, starting small.',
    boundaries: [
      'AI suggestions are not guaranteed predictions. Results depend on data quality and a validated design; advanced use cases are piloted first.',
    ],
    faqs: [
      ['Is our data shared with AI providers?', 'Data handling is agreed before any pilot, including which services are used and where data is processed.'],
      ['What does a pilot look like?', 'One use case, a limited group of users and agreed success measures.'],
    ],
    related: ['crm', 'dashboards-reporting', 'business-automation'],
    cta: 'Talk to an Expert',
  },
  'custom-applications': {
    problems: [
      'One important task is spread across email, spreadsheets and calls.',
      'Customers or field staff can\'t reach the information they need.',
      'Your ERP holds the data, but not in a form people can use on the go.',
    ],
    outcomes: [
      'A focused tool designed around one job',
      'Portals that let customers or staff serve themselves',
      'Connected to your core systems',
    ],
    fit: 'Businesses that need an internal tool, portal or dashboard linked to their ERP.',
    boundaries: [
      'Each application is scoped separately after a use-case study, with ownership, hosting and user-data handling agreed up front.',
    ],
    faqs: [
      ['Can a portal show data from Odoo?', 'Yes. Portals can read and update Odoo data within the permissions you set.'],
      ['Who maintains the app?', 'Maintenance is agreed as part of the project or a support plan.'],
    ],
    related: ['software-development', 'web-development', 'system-integration'],
    cta: 'Discuss Your App Idea',
  },
}

export const getDetails = (slug: string): ServiceDetail | undefined => serviceDetails[slug]

/** How every engagement is delivered, shown on each service page. */
export const deliverySteps = [
  ['Discover', 'Understand your process, people and goals.'],
  ['Design', 'Agree the solution and scope in writing.'],
  ['Build', 'Configure, tailor or develop what was agreed.'],
  ['Test', 'Validate with your team before go-live.'],
  ['Train', 'Role-based training and guides.'],
  ['Support', 'Stabilize, then improve over time.'],
]
