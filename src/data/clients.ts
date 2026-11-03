// Client logos for the homepage strip. Files live in public/media.
// `scale` evens out logos that have a lot of empty space around them;
// `trim` clips stray edge pixels (a CSS inset, e.g. '0 3% 0 0');
// `shift` nudges an off-centre logo down (a percentage of its height);
// `dark` recolors an all-white logo so it shows on the white tile.

export type Client = { name: string; logo: string; scale?: number; trim?: string; shift?: string; dark?: boolean }

export const clients: Client[] = [
  { name: 'Al Dur Al Nafees', logo: 'Al Dur Al Nafees LOGO.png', scale: 1.4, trim: '0 3% 0 0' },
  { name: 'HydraTech', logo: 'hydratech-logo.jpg' },
  { name: 'Rahath Al Afiya', logo: 'rahat.jpg', scale: 1.6 },
  { name: 'Diamond SS Contracting Services', logo: 'diamond_logo_icon.png', scale: 1.05 },
  { name: 'Cleanz Doorstep', logo: 'clenz logo.png', scale: 2.4, shift: '24%', dark: true },
]
