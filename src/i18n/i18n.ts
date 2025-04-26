import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'
import { LANG_EN } from './languages'

// en
import enAdmin from './locales/en/admin.json'
import enAuth from './locales/en/auth.json'
import enCommon from './locales/en/common.json'

// vi
import viAdmin from './locales/vi/admin.json'
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
    ns: ['common', 'auth', 'admin'],
    resources: {
      en: {
        common: enCommon,
        auth: enAuth,
        admin: enAdmin,
      },
      vi: {
        common: viCommon,
        auth: viAuth,
        admin: viAdmin,
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
