import { Bell, CreditCard, LifeBuoy, Sparkles, User } from 'lucide-react'
import { ComponentType } from 'react'

export interface IMenuItem {
  path: string
  label: string
  icon: ComponentType<{ className?: string }>
  iconClass?: string
  type?: 'item' | 'separator'
}

// Shared menu items for user-related navigation
export const userMenuItems: IMenuItem[] = [
  {
    path: '/account',
    label: 'navigation.account',
    icon: User,
    iconClass: 'size-4',
  },
  {
    path: '/billing',
    label: 'navigation.billing',
    icon: CreditCard,
    iconClass: 'size-4',
  },
  {
    path: '/notification',
    label: 'navigation.notification',
    icon: Bell,
    iconClass: 'size-4',
  },
  {
    path: '/support',
    label: 'navigation.support',
    icon: LifeBuoy,
    iconClass: 'size-4',
  },
]

// Extended menu items for the dropdown in sidebar footer
export const sidebarFooterMenuItems: IMenuItem[] = [
  {
    path: '/pricing',
    label: 'navigation.upgrade',
    icon: Sparkles,
    iconClass: 'size-4 text-primary',
  },
  {
    type: 'separator',
    path: '',
    label: '',
    icon: () => null,
  },
  ...userMenuItems,
]
