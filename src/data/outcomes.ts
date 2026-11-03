// Homepage outcome selector and the implementation package guide.

/** Business results a visitor can start from, each leading to the service that delivers it.
 *  `pains` are the everyday symptoms shown in the "before" half of the outcome video. */
export const outcomes = [
  {
    title: 'Win more sales',
    problem: 'Enquiries get lost in chats and spreadsheets.',
    gain: 'Every lead has an owner, a stage and a next step.',
    slug: 'crm',
    pains: ['WhatsApp: "Any update?"', 'leads_final_v3.xlsx', '3 missed calls', 'Who replied to this?'],
    icon: '<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>',
  },
  {
    title: 'Organize operations',
    problem: 'Sales, stock and accounts live in separate tools.',
    gain: 'One connected system from order to invoice.',
    slug: 'erp-consultation',
    pains: ['stock_count.xlsx', 'Invoice typed twice', 'Which price is right?', 'Month-end: day 9'],
    icon: '<rect x="3" y="3" width="7.5" height="7.5" rx="1.5"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5"/>',
  },
  {
    title: 'Automate repetitive work',
    problem: 'Staff chase approvals and retype the same data.',
    gain: 'Requests move on their own, with a clear audit trail.',
    slug: 'business-automation',
    pains: ['"Can you approve this?"', 'Reminder #4', 'Copy, paste, repeat', 'Who has it now?'],
    icon: '<path d="M4 12a8 8 0 0114-5.3M20 12a8 8 0 01-14 5.3"/><path d="M18 3v4h-4M6 21v-4h4"/>',
  },
  {
    title: 'See business performance',
    problem: 'Reports take days and don\'t agree with each other.',
    gain: 'Sales, cash and stock in one trusted view.',
    slug: 'dashboards-reporting',
    pains: ['report_v7.xlsx', "Numbers don't match", 'Waiting on finance', "Last month's data"],
    icon: '<path d="M4 20V11M10 20V5M16 20v-6M22 20H2"/>',
  },
  {
    title: 'Fix the system you have',
    problem: 'Your ERP is live, but people work around it.',
    gain: 'A diagnosis and fixes ranked by business impact.',
    slug: 'erp-health-check',
    pains: ['workaround.xlsx', 'Report is wrong again', 'Nobody uses this screen', 'Duplicate entries'],
    icon: '<path d="M3 12h4l2-5 4 10 2-5h6"/>',
  },
  {
    title: 'Keep systems running',
    problem: 'Nobody clearly owns issues after go-live.',
    gain: 'Known support channels, priorities and escalation.',
    slug: 'support-maintenance',
    pains: ['"Who do I call?"', 'Open for 3 weeks', 'Same issue again', 'No reply yet'],
    icon: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
  },
]

export type Package = {
  id: string
  name: string
  headline: string
  tag: string
  fit: string
  changes: string[]
}

/** Implementation packages, defined by complexity and process breadth — not app counts. */
export const packages: Package[] = [
  {
    id: 'prime',
    name: 'Prime',
    headline: 'Start organized.',
    tag: 'Standardized',
    fit: 'Essential business operations, standard configuration, agreed apps and reporting. No custom development.',
    changes: ['Core records, sales, purchasing and accounting in one place', 'Standard reports from day one', 'A fast, predictable start'],
  },
  {
    id: 'pro',
    name: 'Pro',
    headline: 'Connect everyday work.',
    tag: 'Configured',
    fit: 'More integrated departments and standard workflows; carefully bounded configuration and optional integrations.',
    changes: ['Sales, stock and finance working as one flow', 'Standard workflows configured to your teams', 'Enhanced reporting'],
  },
  {
    id: 'pro-plus',
    name: 'Pro+',
    headline: 'Scale with control.',
    tag: 'Tailored',
    fit: 'Multiple processes, deeper reporting and selected pre-agreed enhancements; development effort is capped.',
    changes: ['Approvals and tailored processes across departments', 'Advanced reports for management', 'Selected integrations with other systems'],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    headline: 'Built around your business.',
    tag: 'Scope-based',
    fit: 'Discovery-led, multi-department programs with custom workflows and integrations, only as explicitly contracted.',
    changes: ['An organization-wide program planned with you', 'Custom workflows and integrations where contracted', 'Custom BI and reporting'],
  },
]

/** The package comparison matrix, row by row: [dimension, Prime, Pro, Pro+, Enterprise]. */
export const packageMatrix: [string, string, string, string, string][] = [
  ['Business complexity', 'Basic', 'Standard', 'Advanced', 'Complex'],
  ['Business processes', 'Essential', 'Integrated', 'Multiple departments', 'Organization-wide'],
  ['Customization', 'None', 'Minimal', 'Limited and predefined', 'Scope-based'],
  ['Integrations', 'None', 'Optional', 'Selected', 'Custom'],
  ['Reporting', 'Standard', 'Enhanced', 'Advanced', 'Custom BI'],
  ['Implementation approach', 'Standardized', 'Configured', 'Configured + tailored', 'Consultative project'],
]

/** Three questions for the package guide; each answer's index points at a package. */
export const packageQuestions = [
  {
    q: 'How many business functions need to work together?',
    options: ['One or two (e.g. sales and accounting)', 'Three or four', 'Several departments', 'The whole organization, or several companies'],
  },
  {
    q: 'Do you need custom approvals or workflows?',
    options: ['No, standard steps are fine', 'A few simple ones', 'Yes, several tailored ones', 'Yes, complex and unique to us'],
  },
  {
    q: 'Do other systems need to be connected?',
    options: ['No', 'Maybe later', 'One or two', 'Several, with custom logic'],
  },
]
