import AppSidebar from '@/app/components/layout/app-sidebar'
import AppSidebarTrigger from '@/app/components/layout/app-sidebar-trigger'
import { SidebarProvider } from '@/components/ui/sidebar'
import { Outlet } from 'react-router'

const AuthenticatedLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <AppSidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  )
}

export default AuthenticatedLayout
