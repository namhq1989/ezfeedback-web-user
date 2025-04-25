import { Switch } from '@/components/ui/switch'
import { useTranslation } from '@/i18n'
import { useState } from 'react'

const NOTIFICATION_OPTIONS = [
  { key: 'newFeedback', translationKey: 'newFeedback' },
  { key: 'dailySummary', translationKey: 'dailySummary' },
  { key: 'weeklySummary', translationKey: 'weeklySummary' },
]

const NotificationSection = () => {
  const { t } = useTranslation()
  const [notifications, setNotifications] = useState<{
    [key: string]: boolean
  }>({
    newFeedback: true,
    dailySummary: false,
    weeklySummary: true,
  })

  const handleToggle = (key: string) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className='w-full border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200'>
      <div className='h-11 flex items-center px-6 border-b'>
        <h3 className='font-bold text-xs uppercase'>
          {t('account.notification.title')}
        </h3>
      </div>
      <div className='p-6'>
        <div className='flex flex-col space-y-8'>
          {NOTIFICATION_OPTIONS.map((opt) => (
            <div
              className='flex flex-col sm:flex-row items-start'
              key={opt.key}
            >
              <div className='w-full sm:w-1/2 mb-2 sm:mb-0'>
                <div className='flex flex-col'>
                  <span className='text-sm'>
                    {t(`account.notification.${opt.translationKey}.title`)}
                  </span>
                  <span className='text-xs text-muted-foreground mt-1'>
                    {t(
                      `account.notification.${opt.translationKey}.description`,
                    )}
                  </span>
                </div>
              </div>
              <div className='w-full sm:w-1/2 flex'>
                <Switch
                  checked={notifications[opt.key]}
                  onCheckedChange={() => handleToggle(opt.key)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NotificationSection
