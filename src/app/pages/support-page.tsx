import SupportContactCard from '@/app/components/support/support-contact-card'
import SupportFaqAccordion from '@/app/components/support/support-faq-accordion'

const SupportPage = () => {
  return (
    <div className='space-y-4'>
      <SupportContactCard />
      <SupportFaqAccordion />
    </div>
  )
}

export default SupportPage
