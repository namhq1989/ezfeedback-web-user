import { CategoriesSection, CollaboratorsSection, SettingsSection } from '@/app/components/admin'
import { Spinner } from '@/app/components/root'
import useProjectStore from '@/app/stores/project'
import { useEffect } from 'react'

const AdminPage = () => {
  const { isLoadingProject, selectedProject, getProjects } = useProjectStore()

  useEffect(() => {
    // Load projects if not already loaded
    if (!selectedProject) {
      getProjects()
    }
  }, [])

  if (isLoadingProject) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <Spinner size='lg' />
      </div>
    )
  }

  return (
    <div className='container mx-auto py-6 px-4 md:py-8 md:px-6'>
      <div className='max-w-6xl mx-auto'>
        <div className='space-y-4'>
          {/* Settings Section */}
          <SettingsSection />

          {/* Categories Section */}
          <CategoriesSection />

          {/* Collaborators Section */}
          <CollaboratorsSection />

          {/* Team Management Section */}
          {/* <TeamMembersSection
            initialMembers={mockTeamMembers}
            initialInvitations={mockTeamInvitations}
            currentUserId='1' // Assuming the first user is the current user
          /> */}
        </div>
      </div>
    </div>
  )
}

export default AdminPage
