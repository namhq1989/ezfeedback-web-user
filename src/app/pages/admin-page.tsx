import {
  CategoriesSection,
  SettingsSection,
  TeamMembersSection,
} from '@/app/components/admin'
import {
  mockCategories,
  mockProjectSettings,
  mockTeamInvitations,
  mockTeamMembers,
} from '@/mock/admin'

const AdminPage = () => {
  return (
    <div className='container mx-auto py-6 px-4 md:py-8 md:px-6'>
      <div className='max-w-6xl mx-auto'>
        <div className='space-y-4'>
          {/* Categories Section */}
          <CategoriesSection initialCategories={mockCategories} />

          {/* Settings Section */}
          <SettingsSection initialSettings={mockProjectSettings} />

          {/* Team Management Section */}
          <TeamMembersSection
            initialMembers={mockTeamMembers}
            initialInvitations={mockTeamInvitations}
            currentUserId='1' // Assuming the first user is the current user
          />
        </div>
      </div>
    </div>
  )
}

export default AdminPage
