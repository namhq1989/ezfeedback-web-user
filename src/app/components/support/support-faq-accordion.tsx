import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { useTranslation } from 'react-i18next'

interface FaqItem {
  id: string
  category: string
}

const SupportFaqAccordion = () => {
  const { t } = useTranslation('common')

  const faqCategories = [
    'gettingStarted',
    'account',
    'projects',
    'feedbackCollection',
  ]

  const faqItems: FaqItem[] = [
    { id: 'createAccount', category: 'gettingStarted' },
    { id: 'createProject', category: 'gettingStarted' },
    { id: 'changePassword', category: 'account' },
    { id: 'deleteAccount', category: 'account' },
    { id: 'projectSettings', category: 'projects' },
    { id: 'collectFeedback', category: 'feedbackCollection' },
    { id: 'exportData', category: 'feedbackCollection' },
  ]

  return (
    <div className='w-full border rounded-xl mb-6'>
      <div className='h-11 flex items-center px-6 border-b'>
        <h3 className='font-bold text-xs uppercase'>
          {t('support.faq.title')}
        </h3>
      </div>
      <div className='flex flex-col gap-6 p-6'>
        {faqCategories.map((category) => {
          const categoryItems = faqItems.filter(
            (item) => item.category === category,
          )

          if (categoryItems.length === 0) return null

          return (
            <div key={category} className='last:mb-0'>
              <h3 className='text-base font-bold mb-2'>
                {t(`support.faq.categories.${category}`)}
              </h3>
              <Accordion type='single' collapsible>
                {categoryItems.map((item) => (
                  <AccordionItem key={item.id} value={item.id}>
                    <AccordionTrigger>
                      {t(`support.faq.items.${item.id}.question`)}
                    </AccordionTrigger>
                    <AccordionContent>
                      {t(`support.faq.items.${item.id}.answer`)}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SupportFaqAccordion
