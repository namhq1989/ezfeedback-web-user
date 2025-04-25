import DefaultProjectSection from '@/app/components/account/default-project-section'
import NotificationSection from '@/app/components/account/notification-section'
import PreferencesSection from '@/app/components/account/preferences-section'
import ProfileSection from '@/app/components/account/profile-section'
import SubscriptionSection from '@/app/components/account/subscription-section'
import { mockUser } from '@/mock/mock-user'

const AccountPage = () => {
  return (
    <div className='space-y-4'>
      <ProfileSection user={mockUser} />
      <PreferencesSection />
      <SubscriptionSection user={mockUser} />
      <NotificationSection />
      <DefaultProjectSection />
    </div>
  )
}

export default AccountPage
