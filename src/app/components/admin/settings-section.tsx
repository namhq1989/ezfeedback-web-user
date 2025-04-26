import { IProjectSettings } from '@/app/models/admin'
import { Switch } from '@/components/ui/switch'
import { useTranslation } from '@/i18n'
import { useState } from 'react'

const getSettingsOptions = (t: any) => [
  {
    key: 'allowAnonymousFeedback',
    title: t('admin:settings.anonymousFeedback.title'),
    description: t('admin:settings.anonymousFeedback.description'),
  },
  {
    key: 'requireEmailVerification',
    title: t('admin:settings.emailVerification.title'),
    description: t('admin:settings.emailVerification.description'),
  },
  {
    key: 'autoPublishFeedback',
    title: t('admin:settings.autoPublish.title'),
    description: t('admin:settings.autoPublish.description'),
  },
]

interface ISettingsSectionProps {
  initialSettings: IProjectSettings
}

const SettingsSection = ({ initialSettings }: ISettingsSectionProps) => {
  const { t } = useTranslation()
  const [settings, setSettings] = useState<IProjectSettings>(initialSettings)
  const SETTINGS_OPTIONS = getSettingsOptions(t)

  const handleToggle = (key: keyof IProjectSettings) => {
    setSettings({
      ...settings,
      [key]: !settings[key],
    })
  }

  return (
    <div className='w-full border rounded-xl'>
      <div className='h-11 flex items-center px-6 border-b'>
        <h3 className='font-bold text-xs uppercase'>
          {t('admin:settings.title')}
        </h3>
      </div>
      <div className='p-6'>
        <div className='flex flex-col space-y-8'>
          {SETTINGS_OPTIONS.map((opt) => (
            <div
              className='flex flex-col sm:flex-row items-start'
              key={opt.key}
            >
              <div className='w-full sm:w-1/2 mb-2 sm:mb-0'>
                <div className='flex flex-col'>
                  <span className='text-sm'>{opt.title}</span>
                  <span className='text-xs text-muted-foreground mt-1'>
                    {opt.description}
                  </span>
                </div>
              </div>
              <div className='w-full sm:w-1/2 flex'>
                <Switch
                  checked={settings[opt.key as keyof IProjectSettings]}
                  onCheckedChange={() =>
                    handleToggle(opt.key as keyof IProjectSettings)
                  }
                  aria-label={opt.title}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SettingsSection
