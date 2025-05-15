import AppHeader from '@/app/components/layout/app-header'
import AppSidebar from '@/app/components/layout/app-sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { Outlet } from 'react-router'

const AuthenticatedLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className='hidden'>
        <span className='text-blue-700' />
        <span className='text-yellow-700' />
        <span className='text-purple-700' />
        <span className='text-orange-700' />
        <span className='text-green-700' />
        <span className='text-red-700' />
      </div>
      <main className='w-full flex flex-col'>
        <AppHeader />
        <Outlet />
      </main>
    </SidebarProvider>
  )
}

export default AuthenticatedLayout
