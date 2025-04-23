import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

// en
import enAuth from './locales/en/auth.json'
import enCommon from './locales/en/common.json'

// vi
import { LANG_EN } from './languages'
import viAuth from './locales/vi/auth.json'
import viCommon from './locales/vi/common.json'

i18next
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: LANG_EN,
    debug: process.env.NODE_ENV === 'development',
    defaultNS: 'common',
    ns: ['common', 'auth'],
    resources: {
      en: {
        common: enCommon,
        auth: enAuth,
      },
      vi: {
        common: viCommon,
        auth: viAuth,
      },
    },
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  })

export default i18next
