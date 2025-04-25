import { Theme, useTheme } from '@/components/theme/theme'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useTranslation } from '@/i18n'
import { useLanguage } from '@/i18n/hooks/use-language'
import { AvailableLanguage } from '@/i18n/languages'

interface IPreferencesSectionProps {}

const PreferencesSection = ({}: IPreferencesSectionProps) => {
  const { t } = useTranslation()
  const { theme, setTheme } = useTheme()
  const { currentLanguage, languages, changeLanguage } = useLanguage()

  const handleThemeChange = (value: string) => {
    setTheme(value as Theme)
  }

  const handleLanguageChange = (value: string) => {
    changeLanguage(value as AvailableLanguage)
  }

  return (
    <div className='w-full border rounded-xl'>
      <div className='h-11 flex items-center px-6 border-b'>
        <h3 className='font-bold text-xs uppercase'>
          {t('account.preferences.title')}
        </h3>
      </div>
      <div className='p-6'>
        <div className='flex flex-col space-y-4'>
          {/* Language row */}
          <div className='flex flex-col sm:flex-row items-center'>
            <div className='w-full sm:w-1/2 mb-2 sm:mb-0'>
              <span className='text-sm'>
                {t('account.preferences.language')}
              </span>
            </div>
            <div className='w-full sm:w-1/2'>
              <Select
                value={currentLanguage}
                onValueChange={handleLanguageChange}
              >
                <SelectTrigger className='w-full'>
                  <SelectValue
                    placeholder={t(
                      `account.preferences.languages.${currentLanguage}`,
                    )}
                  />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {t(`account.preferences.languages.${lang.code}`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Theme row */}
          <div className='flex flex-col sm:flex-row items-center'>
            <div className='w-full sm:w-1/2 mb-2 sm:mb-0'>
              <span className='text-sm'>{t('account.preferences.theme')}</span>
            </div>
            <div className='w-full sm:w-1/2'>
              <Select value={theme} onValueChange={handleThemeChange}>
                <SelectTrigger className='w-full'>
                  <SelectValue
                    placeholder={t(`account.preferences.themes.${theme}`)}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='system'>
                    {t('account.preferences.themes.system')}
                  </SelectItem>
                  <SelectItem value='dark'>
                    {t('account.preferences.themes.dark')}
                  </SelectItem>
                  <SelectItem value='light'>
                    {t('account.preferences.themes.light')}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PreferencesSection
