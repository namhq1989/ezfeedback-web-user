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
import useProjectStore from '@/app/stores/project'
import { useEffect } from 'react'

const AppSidebarContent = () => {
  const location = useLocation()
  const { open } = useSidebar()
  const params = useParams()
  const { t } = useTranslation()
  const { projects, selectedProject, getProjectById, isLoadingProject } =
    useProjectStore()

  // Update the selected project when the URL param changes
  useEffect(() => {
    if (params.id && (!selectedProject || params.id !== selectedProject.id)) {
      getProjectById(params.id)
    }
  }, [params.id, selectedProject, getProjectById])

  // Find the /project/:id route
  const projectRoute = appRoutes.find((r) => r.path === '/project/:id')
  const sidebarItems =
    projectRoute && projectRoute.children
      ? projectRoute.children.filter((child) => child.navigation)
      : []

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          {isLoadingProject ? null : (
            <SidebarMenu className='gap-2 mt-4'>
              {sidebarItems.map((item) => {
                // Use the selected project ID from the store, or fall back to the URL param
                const id =
                  (selectedProject ? selectedProject.id : null) ||
                  params.id ||
                  (projects.length > 0 ? projects[0].id : '')
                const url = `/project/${id}/${item.path}`
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
          )}
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  )
}

export default AppSidebarContent
