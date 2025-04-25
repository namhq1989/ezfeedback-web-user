import { useTranslation } from 'react-i18next'

const SupportContactCard = () => {
  const { t } = useTranslation('common')

  return (
    <div className='w-full border rounded-xl mb-6'>
      <div className='h-11 flex items-center px-6 border-b'>
        <h3 className='font-bold text-xs uppercase'>
          {t('support.contact.title')}
        </h3>
      </div>
      <div className='p-6'>
        <div className='flex flex-col items-start'>
          <p className='text-sm mb-4'>{t('support.contact.description')}</p>
          <a
            href='mailto:support@ezfeedback.com'
            className='text-primary text-sm font-medium hover:underline'
          >
            support@ezfeedback.com
          </a>
          <p className='text-xs text-muted-foreground mt-1'>
            {t('support.contact.responseTime')}
          </p>
        </div>
      </div>
    </div>
  )
}

export default SupportContactCard
