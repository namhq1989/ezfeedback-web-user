import { appRoutes } from '@/app/router/routes'
import { projects } from '@/mock/projects'
import { matchPath, useLocation } from 'react-router'

export function useBreadcrumb(): string[] {
  const location = useLocation()
  const path = location.pathname

  // Match /project/:slug/:section? pattern
  const projectMatch = matchPath('/project/:slug/:section?', path)

  if (!projectMatch || !projectMatch.params || !projectMatch.params.slug) {
    return []
  }

  const { slug, section } = projectMatch.params as {
    slug: string
    section?: string
  }
  const project = projects.find((p) => p.slug === slug)
  if (!project) {
    return []
  }

  // Find the route for the section to get the i18n key
  let sectionLabel = ''
  if (section) {
    // Find the /project/:slug route
    const projectRoute = appRoutes.find((r) => r.path === '/project/:slug')
    const children =
      projectRoute && projectRoute.children ? projectRoute.children : []
    const sectionRoute = children.find((r) => r.path === section)
    sectionLabel = sectionRoute ? sectionRoute.breadcrumb : section
  }

  return section ? [project.name, sectionLabel] : [project.name]
}
