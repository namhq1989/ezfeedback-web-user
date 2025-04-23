import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { AvailableLanguage, LANGUAGES } from '../languages'

export interface Language {
  code: AvailableLanguage
  name: string
  flag: string
}

export const useLanguage = () => {
  const { i18n } = useTranslation()

  const currentLanguage = i18n.language.split('-')[0] as AvailableLanguage

  const changeLanguage = useCallback(
    (language: AvailableLanguage) => {
      i18n.changeLanguage(language)
    },
    [i18n],
  )

  const currentLanguageInfo =
    LANGUAGES.find((lang) => lang.code === currentLanguage) || LANGUAGES[0]

  return {
    currentLanguage,
    currentLanguageInfo,
    languages: LANGUAGES,
    changeLanguage,
  }
}
