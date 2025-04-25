import type { IUser } from '@/app/models/user'
import { Switch } from '@/components/ui/switch'
import { useTranslation } from '@/i18n'
import { mockUser } from '@/mock/mock-user'
import { useState } from 'react'

const DEFAULT_PROJECT_OPTIONS = [
  { key: 'publicFeedback', translationKey: 'publicFeedback' },
  { key: 'anonymousFeedback', translationKey: 'anonymousFeedback' },
  { key: 'votingEnabled', translationKey: 'votingEnabled' },
]

const DefaultProjectSection = () => {
  const { t } = useTranslation()
  const [defaults, setDefaults] = useState<{
    [K in keyof IUser['defaultProjectSettings']]: boolean
  }>({ ...mockUser.defaultProjectSettings })

  const handleToggle = (key: keyof IUser['defaultProjectSettings']) => {
    setDefaults((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className='w-full border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200'>
      <div className='h-11 flex items-center px-6 border-b'>
        <h3 className='font-bold text-xs uppercase'>
          {t('account.defaultProject.title')}
        </h3>
      </div>
      <div className='p-6'>
        <div className='flex flex-col space-y-8'>
          {DEFAULT_PROJECT_OPTIONS.map((opt) => (
            <div
              className='flex flex-col sm:flex-row items-start'
              key={opt.key}
            >
              <div className='w-full sm:w-1/2 mb-2 sm:mb-0'>
                <div className='flex flex-col'>
                  <span className='text-sm'>
                    {t(`account.defaultProject.${opt.translationKey}.title`)}
                  </span>
                  <span className='text-xs text-muted-foreground mt-1'>
                    {t(
                      `account.defaultProject.${opt.translationKey}.description`,
                    )}
                  </span>
                </div>
              </div>
              <div className='w-full sm:w-1/2 flex'>
                <Switch
                  checked={defaults[opt.key as keyof typeof defaults]}
                  onCheckedChange={() =>
                    handleToggle(
                      opt.key as keyof IUser['defaultProjectSettings'],
                    )
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DefaultProjectSection
