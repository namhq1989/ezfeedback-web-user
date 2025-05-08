import { appRoutes } from '@/app/router/routes'
import useProjectStore from '@/app/stores/project'
import { useLocation } from 'react-router'

export function useBreadcrumb(): string[] {
  const location = useLocation()
  const path = location.pathname
  const { projects } = useProjectStore()

  // --- Project Pages: /project/:id/... ---
  const projectPattern = /^\/project\/([^/]+)(.*)$/
  const match = path.match(projectPattern)
  if (match) {
    const id = match[1]
    const rest = match[2] // e.g. /feedback/detail
    const project = projects?.find((p) => p.id === id)
    if (!project) return []

    // Split rest of the path
    const segments = rest.split('/').filter(Boolean) // e.g. ['feedback', 'detail']
    // Find corresponding route for each segment
    let routeChildren =
      appRoutes.find((r) => r.path === '/project/:id')?.children || []
    const breadcrumbs = [project.title]
    segments.forEach((seg) => {
      const found = routeChildren.find((r) => r.path === seg)
      breadcrumbs.push(found ? found.breadcrumb : seg)
      // Prepare for next level if nested children exist
      routeChildren = found && found.children ? found.children : []
    })
    return breadcrumbs
  }

  // --- Single Pages: /{page-name} ---
  // These are now children of the root AuthenticatedLayout
  const root = appRoutes.find((r) => !r.path && r.children)
  if (root && root.children) {
    // First check direct children
    const childRoute = root.children.find(
      (child) => child.path && `/${child.path}` === path,
    )
    if (childRoute) {
      return [childRoute.breadcrumb]
    }

    // Check for nested routes in UserMenuLayout
    const userMenuLayout = root.children.find(
      (child) => !child.path && child.children,
    )
    if (userMenuLayout && userMenuLayout.children) {
      const nestedRoute = userMenuLayout.children.find(
        (child) => `/${child.path}` === path,
      )
      if (nestedRoute) {
        return [nestedRoute.breadcrumb]
      }
    }
  }

  // --- Fallback (could be extended for future patterns) ---
  return []
}
