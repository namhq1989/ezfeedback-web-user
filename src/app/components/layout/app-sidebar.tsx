import AppSidebarContent from '@/app/components/layout/app-sidebar-content'
import AppSidebarFooter from '@/app/components/layout/app-sidebar-footer'
import AppSidebarHeader from '@/app/components/layout/app-sidebar-header'
import useProjectStore from '@/app/stores/project'
import { Sidebar } from '@/components/ui/sidebar'

const AppSidebar = () => {
  const { projects } = useProjectStore()

  if (!projects || projects.length === 0) {
    return null
  }

  return (
    <Sidebar collapsible='icon'>
      <AppSidebarHeader />
      <AppSidebarContent />
      <AppSidebarFooter />
    </Sidebar>
  )
}

export default AppSidebar
