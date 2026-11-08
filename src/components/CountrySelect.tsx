import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { countryOptions, flagUrl, type CountryOption } from '../data/countries'
import { useLang, useT } from '../i18n'

type Props = { value: string; onChange: (value: string) => void; label: string }

/** Country field with flags and a search box. The value is the English country name. */
export function CountrySelect({ value, onChange, label }: Props) {
  const t = useT()
  const { lang } = useLang()
  const id = useId()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [hi, setHi] = useState(0)
  const wrap = useRef<HTMLDivElement>(null)
  const search = useRef<HTMLInputElement>(null)
  const list = useRef<HTMLUListElement>(null)
  const { priority, rest } = useMemo(() => countryOptions(lang), [lang])
  const all = useMemo(() => [...priority, ...rest], [priority, rest])
  const selected = all.find((c) => c.value === value)

  // Search matches the shown name or the English one.
  const q = query.trim().toLowerCase()
  const match = (c: CountryOption) => !q || c.label.toLowerCase().includes(q) || c.value.toLowerCase().includes(q)
  const groups: [string, CountryOption[]][] = q
    ? [['', all.filter(match)]]
    : [[t('Gulf & nearby'), priority], [t('All countries'), rest]]
  const flat = groups.flatMap(([, items]) => items)

  useEffect(() => {
    if (!open) return
    search.current?.focus()
    const onDown = (e: MouseEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [open])

  // Keep the highlighted option in view.
  useEffect(() => {
    list.current?.querySelector<HTMLElement>(`[data-i="${hi}"]`)?.scrollIntoView({ block: 'nearest' })
  }, [hi, open])

  const openList = () => {
    setQuery('')
    const i = flat.findIndex((c) => c.value === value)
    setHi(i < 0 ? 0 : i)
    setOpen(true)
  }
  const choose = (c: CountryOption) => {
    onChange(c.value)
    setOpen(false)
  }

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setHi((h) => Math.min(h + 1, flat.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setHi((h) => Math.max(h - 1, 0)) }
    else if (e.key === 'Enter') { e.preventDefault(); if (flat[hi]) choose(flat[hi]) }
    else if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); setOpen(false) }
  }

  let n = -1
  return (
    <div className={`cp-fl cp-fl-select cp-country${open ? ' is-open' : ''}`} ref={wrap}>
      <button
        type="button"
        id={`${id}-btn`}
        className={`cp-country-btn${selected ? ' has-value' : ''}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={`${id}-label ${id}-btn`}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={(e) => { if (e.key === 'ArrowDown' && !open) { e.preventDefault(); openList() } }}
      >
        {selected && (
          <span className="cp-country-val">
            <img src={flagUrl(selected.code)} alt="" width={22} height={15} />
            {selected.label}
          </span>
        )}
      </button>
      <label id={`${id}-label`} htmlFor={`${id}-btn`}>{label}</label>
      <svg className="cp-select-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>

      {open && (
        <div className="cp-country-pop">
          <input
            ref={search}
            className="cp-country-search"
            type="search"
            placeholder={t('Search country')}
            value={query}
            onChange={(e) => { setQuery(e.target.value); setHi(0) }}
            onKeyDown={onKey}
            role="combobox"
            aria-expanded="true"
            aria-controls={`${id}-list`}
            aria-activedescendant={flat[hi] ? `${id}-o-${hi}` : undefined}
            aria-label={t('Search country')}
          />
          <ul className="cp-country-list" id={`${id}-list`} role="listbox" ref={list} aria-label={label}>
            {flat.length === 0 && <li className="cp-country-empty">{t('No country found')}</li>}
            {groups.map(([title, items]) => items.length > 0 && (
              <li key={title || 'results'} role="presentation">
                {title && <span className="cp-country-group">{title}</span>}
                <ul role="presentation">
                  {items.map((c) => {
                    n += 1
                    const i = n
                    return (
                      <li
                        key={c.code}
                        id={`${id}-o-${i}`}
                        data-i={i}
                        role="option"
                        aria-selected={c.value === value}
                        className={`cp-country-opt${i === hi ? ' is-hi' : ''}${c.value === value ? ' is-on' : ''}`}
                        onMouseEnter={() => setHi(i)}
                        onMouseDown={(e) => { e.preventDefault(); choose(c) }}
                      >
                        <img src={flagUrl(c.code)} alt="" width={22} height={15} loading={i < 12 ? 'eager' : 'lazy'} />
                        <span>{c.label}</span>
                      </li>
                    )
                  })}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
