import { createContext, useContext } from 'react'
import { ar } from './ar'
import { hi } from './hi'

// Translations. English text lives in the components and data files and
// is the lookup key; ar.ts and hi.ts map each English string to its translation.
// Anything not translated falls back to English, so the site never breaks.

export type Lang = 'en' | 'ar' | 'hi'

export const languages: { code: Lang; label: string; short: string; dir: 'ltr' | 'rtl' }[] = [
  { code: 'en', label: 'English', short: 'EN', dir: 'ltr' },
  { code: 'ar', label: 'العربية', short: 'ع', dir: 'rtl' },
  { code: 'hi', label: 'हिंदी', short: 'हि', dir: 'ltr' },
]

export const dictionaries: Record<Lang, Record<string, string>> = { en: {}, ar, hi }

type Vars = Record<string, string | number>
export type Translate = (text: string, vars?: Vars) => string

export type LangCtx = { lang: Lang; dir: 'ltr' | 'rtl'; t: Translate }

export const LangContext = createContext<LangCtx | null>(null)

export const fill = (text: string, vars?: Vars) =>
  vars ? text.replace(/\{(\w+)\}/g, (m, k: string) => (k in vars ? String(vars[k]) : m)) : text

/** Translator for one language, e.g. for showing the same text in all three at once. */
export const makeT = (lang: Lang): Translate => (text, vars) => fill(dictionaries[lang][text] ?? text, vars)

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used inside <LangProvider>')
  return ctx
}

/** Shorthand for components that only need the translator. */
export const useT = () => useLang().t
