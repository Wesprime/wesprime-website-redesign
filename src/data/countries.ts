// Countries for the contact form. Names come from the browser (Intl.DisplayNames),
// so they appear in the visitor's language; the English name is what the enquiry records.

/** Shown first: where most enquiries come from. */
export const priorityCountries = ['SA', 'AE', 'BH', 'QA', 'KW', 'OM', 'EG', 'JO', 'IN']

const allCodes = [
  'AF', 'AL', 'DZ', 'AD', 'AO', 'AG', 'AR', 'AM', 'AU', 'AT', 'AZ', 'BS', 'BH', 'BD', 'BB', 'BY', 'BE', 'BZ', 'BJ', 'BT',
  'BO', 'BA', 'BW', 'BR', 'BN', 'BG', 'BF', 'BI', 'CV', 'KH', 'CM', 'CA', 'CF', 'TD', 'CL', 'CN', 'CO', 'KM', 'CG', 'CD',
  'CR', 'CI', 'HR', 'CU', 'CY', 'CZ', 'DK', 'DJ', 'DM', 'DO', 'EC', 'EG', 'SV', 'GQ', 'ER', 'EE', 'SZ', 'ET', 'FJ', 'FI',
  'FR', 'GA', 'GM', 'GE', 'DE', 'GH', 'GR', 'GD', 'GT', 'GN', 'GW', 'GY', 'HT', 'HN', 'HK', 'HU', 'IS', 'IN', 'ID', 'IR',
  'IQ', 'IE', 'IT', 'JM', 'JP', 'JO', 'KZ', 'KE', 'KI', 'KW', 'KG', 'LA', 'LV', 'LB', 'LS', 'LR', 'LY', 'LI', 'LT', 'LU',
  'MG', 'MW', 'MY', 'MV', 'ML', 'MT', 'MH', 'MR', 'MU', 'MX', 'FM', 'MD', 'MC', 'MN', 'ME', 'MA', 'MZ', 'MM', 'NA', 'NR',
  'NP', 'NL', 'NZ', 'NI', 'NE', 'NG', 'KP', 'MK', 'NO', 'OM', 'PK', 'PW', 'PS', 'PA', 'PG', 'PY', 'PE', 'PH', 'PL', 'PT',
  'QA', 'RO', 'RU', 'RW', 'KN', 'LC', 'VC', 'WS', 'SM', 'ST', 'SA', 'SN', 'RS', 'SC', 'SL', 'SG', 'SK', 'SI', 'SB', 'SO',
  'ZA', 'KR', 'SS', 'ES', 'LK', 'SD', 'SR', 'SE', 'CH', 'SY', 'TW', 'TJ', 'TZ', 'TH', 'TL', 'TG', 'TO', 'TT', 'TN', 'TR',
  'TM', 'TV', 'UG', 'UA', 'AE', 'GB', 'US', 'UY', 'UZ', 'VU', 'VA', 'VE', 'VN', 'YE', 'ZM', 'ZW',
]

export type CountryOption = { code: string; value: string; label: string }

const names = (lang: string) => {
  try {
    return new Intl.DisplayNames([lang], { type: 'region' })
  } catch {
    return null
  }
}

/** Priority countries, then the rest sorted by their name in the given language. */
export function countryOptions(lang: string): { priority: CountryOption[]; rest: CountryOption[] } {
  const en = names('en')
  const local = names(lang) ?? en
  const option = (code: string): CountryOption => ({
    code,
    value: en?.of(code) ?? code,
    label: local?.of(code) ?? en?.of(code) ?? code,
  })
  const priority = priorityCountries.map(option)
  const rest = allCodes
    .filter((c) => !priorityCountries.includes(c))
    .map(option)
    .sort((a, b) => a.label.localeCompare(b.label, lang))
  return { priority, rest }
}

/** Flag image for a country code, from public/flags. */
export const flagUrl = (code: string) => `${import.meta.env.BASE_URL}flags/${code}.svg`
