import { useMemo, type ReactNode } from 'react'
import { LangContext, languages, makeT, type Lang } from './core'

/** Language for everything inside it. The site runs in English; only the hero rotates languages. */
export function LangProvider({ lang = 'en', children }: { lang?: Lang; children: ReactNode }) {
  const value = useMemo(() => ({ lang, dir: languages.find((l) => l.code === lang)!.dir, t: makeT(lang) }), [lang])
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}
