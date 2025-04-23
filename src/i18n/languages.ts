export type AvailableLanguage = 'en' | 'vi'

export type LanguageItem = {
  code: AvailableLanguage
  name: string
  flag: string
}

const LANG_EN: AvailableLanguage = 'en'
const LANG_VI: AvailableLanguage = 'vi'
const LANG_CODES = [LANG_EN, LANG_VI]

const LANGUAGES: LanguageItem[] = [
  { code: LANG_EN, name: 'English', flag: '🇺🇸' },
  { code: LANG_VI, name: 'Tiếng Việt', flag: '🇻🇳' },
]

export { LANG_CODES, LANG_EN, LANG_VI, LANGUAGES }
