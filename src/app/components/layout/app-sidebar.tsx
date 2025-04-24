import { Sidebar } from '@/components/ui/sidebar'
import AppSidebarContent from './app-sidebar-content'
import AppSidebarFooter from './app-sidebar-footer'
import AppSidebarHeader from './app-sidebar-header'

const data = {
  versions: ['1.0.1', '1.1.0-alpha', '2.0.0-beta1'],
}

const AppSidebar = () => {
  return (
    <Sidebar>
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
