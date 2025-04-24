import AppSidebarContent from '@/app/components/layout/app-sidebar-content'
import AppSidebarFooter from '@/app/components/layout/app-sidebar-footer'
import AppSidebarHeader from '@/app/components/layout/app-sidebar-header'
import { Sidebar } from '@/components/ui/sidebar'

const data = {
  versions: ['1.0.1', '1.1.0-alpha', '2.0.0-beta1'],
}

const AppSidebar = () => {
  return (
    <Sidebar collapsible='icon'>
      <AppSidebarHeader
        versions={data.versions}
        defaultVersion={data.versions[0]}
      />
      <AppSidebarContent />
      <AppSidebarFooter />
    </Sidebar>
  )
}

export default AppSidebar
