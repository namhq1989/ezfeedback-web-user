import AppHeader from '@/app/components/layout/app-header'
import AppSidebar from '@/app/components/layout/app-sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { Outlet } from 'react-router'

const AuthenticatedLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className='hidden'>
        <span className='text-blue-600' />
        <span className='text-yellow-600' />
        <span className='text-purple-600' />
        <span className='text-orange-600' />
        <span className='text-green-600' />
        <span className='text-red-600' />
        <span className='bg-blue-600' />
        <span className='bg-yellow-600' />
        <span className='bg-purple-600' />
        <span className='bg-orange-600' />
        <span className='bg-green-600' />
        <span className='bg-red-600' />
      </div>
      <main className='w-full flex flex-col'>
        <AppHeader />
        <Outlet />
      </main>
    </SidebarProvider>
  )
}

export default AuthenticatedLayout
