import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  useSidebar,
} from '@/components/ui/sidebar'
import { useTranslation } from 'react-i18next'
import { Link, useLocation, useParams } from 'react-router'

import { appRoutes } from '@/app/router/routes'

const AppSidebarContent = () => {
  const location = useLocation()
  const { open } = useSidebar()
  const params = useParams()
  const { t } = useTranslation()

  // Find the /project/:slug route
  const projectRoute = appRoutes.find((r) => r.path === '/project/:slug')
  const sidebarItems =
    projectRoute && projectRoute.children
      ? projectRoute.children.filter((child) => child.navigation)
      : []

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu className='gap-2 mt-4'>
            {sidebarItems.map((item) => {
              const slug = params.slug
              const url = `/project/${slug}/${item.path}`
              const isActive =
                location.pathname === url ||
                location.pathname.startsWith(url + '/')
              const IconComponent = item.navigation?.icon
              return (
                <SidebarMenuButton
                  key={item.navigation?.label}
                  asChild
                  isActive={isActive}
                  className={`px-4 gap-4 ${!open ? 'items-center justify-center' : ''} [&>svg]:size-5 [&>svg]:stroke-2 hover:bg-muted ${isActive ? 'bg-muted [&>svg]:text-primary' : '[&>svg]:stroke-muted-foreground'}`}
                  size='lg'
                >
                  <Link to={url}>
                    {IconComponent && <IconComponent />}
                    {open && (
                      <span className={`${isActive ? 'text-primary' : ''}`}>
                        {t(item.navigation?.label || '')}
                      </span>
                    )}
                  </Link>
                </SidebarMenuButton>
              )
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  )
}

export default AppSidebarContent
