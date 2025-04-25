import InvoiceSection from '@/app/components/billing/invoice-section'
import SubscriptionSection from '@/app/components/billing/subscription-section'
import { mockUser } from '@/mock/mock-user'

const BillingPage = () => {
  return (
    <div className='space-y-4'>
      <SubscriptionSection user={mockUser} />
      <InvoiceSection />
    </div>
  )
}

export default BillingPage
