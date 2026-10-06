type Props = {
  /** Inner SVG markup (static, from our own data files) */
  markup: string
  size?: number
  viewBox?: number
  strokeWidth?: number
  className?: string
}

export function Icon({ markup, size = 24, viewBox = 24, strokeWidth = 2, className }: Props) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox={`0 0 ${viewBox} ${viewBox}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  )
}

export function Check() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 10.5l4 4 8-9" stroke="#1D5FD6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Logo({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <rect x="1" y="1" width="34" height="34" rx="8" stroke="#6FA3FF" strokeWidth="2" />
      <path d="M9 12l4 13 5-9 5 9 4-13" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
