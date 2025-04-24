import { ReactNode } from 'react'
import { appRoutes } from './routes'

export interface NavigationItem {
  path: string
  label: string
  icon?: ReactNode
}

// Flatten navigation items for sidebar/menu
export function getNavigationItems(): NavigationItem[] {
  const navItems: NavigationItem[] = []
  const mainRoute = appRoutes.find((r) => r.path === '/')
  if (mainRoute && mainRoute.children) {
    for (const child of mainRoute.children) {
      if (child.navigation) {
        navItems.push({
          path: child.path ? `/${child.path}` : '/',
          label: child.navigation.label,
          icon: child.navigation.icon,
        })
      }
    }
  }
  return navItems
}
