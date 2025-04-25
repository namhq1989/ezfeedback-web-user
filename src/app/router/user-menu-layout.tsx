import { userMenuItems } from '@/app/router/user-menu-items'
import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'
import { Link, Outlet, useLocation } from 'react-router'

const UserMenuLayout = () => {
  const location = useLocation()
  const currentPath = location.pathname
  const { t } = useTranslation()

  return (
    <div className='container mx-auto py-6 px-4 md:py-8 md:px-6'>
      {/* Mobile User Menu Row */}
      <nav
        className='flex md:hidden flex-row overflow-x-auto gap-4 pb-2 mb-4 -mx-4 px-4 scrollbar-thin scrollbar-thumb-muted/60 scrollbar-track-transparent'
        aria-label='User menu'
      >
        {userMenuItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className={cn(
              'flex items-center gap-2 px-3 py-2 text-sm rounded-md whitespace-nowrap hover:bg-muted transition-colors',
              currentPath === item.path && 'bg-muted font-medium',
            )}
            tabIndex={0}
          >
            <item.icon className={item.iconClass} />
            <span>{t(item.label)}</span>
          </Link>
        ))}
      </nav>

      <div className='flex flex-row'>
        {/* Fixed Left Menu - Hidden on mobile */}
        <div className='hidden md:block w-64 min-w-64 pr-6'>
          <div className='sticky top-20'>
            <nav className='flex flex-col space-y-1'>
              {userMenuItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors',
                    currentPath === item.path && 'bg-muted font-medium',
                  )}
                >
                  <item.icon className={item.iconClass} />
                  <span>{t(item.label)}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content Area */}
        <div className='flex-1'>
          <div className='flex flex-col space-y-8'>
            {/* Outlet renders the child route components */}
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserMenuLayout
