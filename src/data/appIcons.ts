// 24×24 stroke icons for the Odoo apps shown on the Solutions page.
// Apps not listed here fall back to their category's icon.

const doc = '<path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4"/>'
const users = '<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M14 15.5c.9-.6 1.9-1 3-1 2.8 0 4.5 2 4.5 5"/>'

export const appIcons: Record<string, string> = {
  // Finance
  Accounting: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 7h8M8 11h2M12 11h2M16 11h0M8 15h2M12 15h2M8 18h8"/>',
  Invoicing: `${doc}<path d="M10 12h5M10 16h5"/>`,
  Expenses: '<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18M7 15h3"/>',
  Spreadsheet: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M3 14h18M9 4v16M15 4v16"/>',
  Documents: '<path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>',
  Sign: '<path d="M3 19c3-1 4-5 6-5s1 4 3 4 3-3 5-3 2 2 4 2"/><path d="M14 4l5 5-8 8H6v-5z"/>',
  // Sales
  CRM: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/>',
  Sales: '<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>',
  'Point of Sale': '<rect x="4" y="3" width="16" height="10" rx="2"/><path d="M8 17h8M6 21h12M12 13v4"/>',
  Subscriptions: '<path d="M4 12a8 8 0 0114-5.3M20 12a8 8 0 01-14 5.3"/><path d="M18 3v4h-4M6 21v-4h4"/>',
  Rental: '<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M15 8l2 2"/>',
  // Websites
  Website: '<rect x="2.5" y="4" width="19" height="16" rx="2"/><path d="M2.5 8.5h19M6 6.3h0M8.5 6.3h0"/>',
  eCommerce: '<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.5 12h12L22 7H6.5"/>',
  Blog: '<path d="M4 20h16M6 16l10-10 3 3-10 10H6z"/>',
  Events: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4M8 14h3"/>',
  eLearning: '<path d="M2 9l10-5 10 5-10 5-10-5z"/><path d="M6 11v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5"/>',
  Forum: '<path d="M4 4h12v9H8l-4 3z"/><path d="M8 16v1h8l4 3V9h-4"/>',
  // Supply chain
  Inventory: '<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',
  Manufacturing: '<path d="M3 21V10l6 4V10l6 4V6h6v15z"/>',
  Purchase: '<path d="M6 7h12l-1 13H7z"/><path d="M9 7V5a3 3 0 016 0v2"/>',
  Quality: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
  Maintenance: '<path d="M14.7 6.3a4 4 0 00-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 005.4-5.4l-2.6 2.6-2.4-.6-.6-2.4z"/>',
  PLM: '<circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="12" r="2.5"/><circle cx="6" cy="18" r="2.5"/><path d="M8.5 6H12a3 3 0 013 3v.5M8.5 18H12a3 3 0 003-3v-.5"/>',
  // Human resources
  Employees: users,
  Payroll: '<rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 9v0M18 15v0"/>',
  Recruitment: '<circle cx="10" cy="8" r="3.5"/><path d="M3.5 20c0-3.6 2.9-6.5 6.5-6.5 1.4 0 2.6.4 3.6 1.1M17 15v6M14 18h6"/>',
  'Time Off': '<path d="M12 4v2M4 12H2M22 12h-2M5.6 5.6l1.4 1.4M18.4 5.6L17 7"/><circle cx="12" cy="13" r="4"/><path d="M3 21h18"/>',
  Appraisals: '<path d="M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.4 6.7 19.4l1.2-6L3.4 9.3l6-.7z"/>',
  Fleet: '<path d="M5 17h14v-5l-2-5H7l-2 5z"/><circle cx="8" cy="17" r="2"/><circle cx="16" cy="17" r="2"/><path d="M5 12h14"/>',
  // Marketing
  'Email Marketing': '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  'Marketing Automation': '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
  'SMS Marketing': '<rect x="6" y="2.5" width="12" height="19" rx="2.5"/><path d="M9.5 8h5M9.5 11.5h3M10 18.5h4"/>',
  WhatsApp: '<path d="M21 12a8 8 0 01-11.6 7.1L4 20l1-4.6A8 8 0 1121 12z"/>',
  'Social Marketing': '<circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.2 10.8l7.6-3.6M8.2 13.2l7.6 3.6"/>',
  Surveys: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8l1.5 1.5L12 7M8 14l1.5 1.5L12 13M14 8.5h2M14 14.5h2"/>',
  // Services
  Project: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M8 4v16M3 9h5M13 9h5M13 13h3"/>',
  Timesheets: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  Planning: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4M7 14h4M13 17h4"/>',
  'Field Service': '<path d="M12 21s-7-6.2-7-11a7 7 0 0114 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  Helpdesk: '<path d="M4 14v-2a8 8 0 0116 0v2"/><rect x="3" y="14" width="4" height="6" rx="1.5"/><rect x="17" y="14" width="4" height="6" rx="1.5"/>',
  Appointments: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/><path d="M9 15l2 2 4-4"/>',
  // Productivity
  Discuss: '<path d="M4 4h16v12H8l-4 4z"/><path d="M8 9h8M8 12h5"/>',
  Knowledge: '<path d="M4 4.5A1.5 1.5 0 015.5 3H20v16H5.5A1.5 1.5 0 004 20.5z"/><path d="M4 20.5A1.5 1.5 0 005.5 22H20M8 7h8M8 11h6"/>',
  Approvals: '<circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.7 2.7L16 9.5"/>',
  IoT: '<rect x="7" y="7" width="10" height="10" rx="2"/><path d="M10 2v5M14 2v5M10 17v5M14 17v5M2 10h5M2 14h5M17 10h5M17 14h5"/>',
  VoIP: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/>',
  AI: '<path d="M12 3l1.8 4.8L18.6 9.6 13.8 11.4 12 16.2 10.2 11.4 5.4 9.6 10.2 7.8z"/><path d="M18 15l.8 2.2L21 18l-2.2.8L18 21l-.8-2.2L15 18l2.2-.8z"/>',
}
