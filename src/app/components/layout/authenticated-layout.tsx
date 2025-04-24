import AppHeader from '@/app/components/layout/app-header'
import AppSidebar from '@/app/components/layout/app-sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { Outlet } from 'react-router'

const AuthenticatedLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className='w-full flex flex-col'>
        <AppHeader />
        <Outlet />
      </main>
    </SidebarProvider>
  )
}

export default AuthenticatedLayout
