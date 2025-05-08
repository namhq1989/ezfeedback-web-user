import AppSidebarContent from '@/app/components/layout/app-sidebar-content'
import AppSidebarFooter from '@/app/components/layout/app-sidebar-footer'
import AppSidebarHeader from '@/app/components/layout/app-sidebar-header'
import { Sidebar } from '@/components/ui/sidebar'

const AppSidebar = () => {
  return (
    <Sidebar collapsible='icon'>
      <AppSidebarHeader />
      <AppSidebarContent />
      <AppSidebarFooter />
    </Sidebar>
  )
}

export default AppSidebar
