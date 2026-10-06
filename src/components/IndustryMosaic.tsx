import { industries, mediaUrl, type Industry } from '../data/saudi'
import { industryHref } from '../router'
import { Icon } from './Icon'

// Three columns of tiles with different heights. Spans are relative heights
// within a column, and each column adds up to the same total so the bottoms line up.
// Any industry not placed here is added to the shortest column.
const layout: [id: string, span: number][][] = [
  [['manufacturing', 3], ['retail', 2], ['logistics', 4]],
  [['education', 2], ['healthcare', 4], ['hospitality', 3]],
  [['trading', 2], ['ecommerce', 3], ['construction', 2], ['travel', 2]],
]

function columns(): [Industry, number][][] {
  const byId = new Map(industries.map((i) => [i.id, i]))
  const cols = layout.map((col) =>
    col.flatMap(([id, span]) => {
      const ind = byId.get(id)
      byId.delete(id)
      return ind ? [[ind, span] as [Industry, number]] : []
    }),
  )
  for (const ind of byId.values()) {
    const shortest = cols.reduce((a, b) => (a.length <= b.length ? a : b))
    shortest.push([ind, 2])
  }
  return cols
}

function Tile({ industry, span }: { industry: Industry; span: number }) {
  return (
    <a className={`ind-tile${industry.image ? '' : ' no-image'}`} style={{ flexGrow: span }} href={industryHref(industry.id)}>
      {industry.image ? (
        <img src={mediaUrl(industry.image)} alt="" loading="lazy" decoding="async" />
      ) : (
        <Icon className="ind-tile-icon" markup={industry.icon} size={120} strokeWidth={1.2} />
      )}
      <span className="ind-tile-plus" aria-hidden="true">+</span>
      <span className="ind-tile-body">
        <span className="ind-tile-title">{industry.title}</span>
        <span className="ind-tile-summary">{industry.summary}</span>
        <span className="ind-tile-cta">Explore industry →</span>
      </span>
    </a>
  )
}

export function IndustryMosaic() {
  return (
    <div className="ind-mosaic">
      {columns().map((col, i) => (
        <div key={i} className="ind-col">
          {col.map(([industry, span]) => <Tile key={industry.id} industry={industry} span={span} />)}
        </div>
      ))}
    </div>
  )
}
