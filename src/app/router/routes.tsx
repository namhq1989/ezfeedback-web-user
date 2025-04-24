import AuthenticatedLayout from '@/app/components/layout/authenticated-layout'
import CategoryPage from '@/app/pages/category-page'
import DashboardPage from '@/app/pages/dashboard-page'
import FeedbackPage from '@/app/pages/feedback-page'
import MemberPage from '@/app/pages/member-page'
import SettingPage from '@/app/pages/setting-page'
import SignInPage from '@/app/pages/sign-in-page'
import { JSX } from 'react'
import { Navigate } from 'react-router'

import {
  LayoutDashboard,
  Send,
  Settings,
  SquareLibrary,
  UserRound,
} from 'lucide-react'

export interface AppRoute {
  path?: string
  index?: boolean
  element: JSX.Element
  breadcrumb: string
  navigation?: {
    label: string
    icon?: React.ElementType // Use the icon component type
  }
  children?: AppRoute[]
  isPublic?: boolean
}

export const appRoutes: AppRoute[] = [
  {
    path: '/',
    element: <Navigate to='/project/project-a' replace />, // TODO: fix for the real slug value
    breadcrumb: '',
    navigation: undefined,
    isPublic: true,
  },
  {
    path: '/signin',
    element: <SignInPage />,
    breadcrumb: 'navigation.signin',
    isPublic: true,
    navigation: undefined,
  },
  {
    path: '/project/:slug',
    element: <AuthenticatedLayout />,
    breadcrumb: 'navigation.dashboard',
    navigation: { label: 'navigation.dashboard', icon: LayoutDashboard },
    children: [
      {
        path: 'dashboard',
        element: <DashboardPage />,
        breadcrumb: 'navigation.dashboard',
        navigation: { label: 'navigation.dashboard', icon: LayoutDashboard },
      },
      {
        path: 'feedback',
        element: <FeedbackPage />,
        breadcrumb: 'navigation.feedback',
        navigation: { label: 'navigation.feedback', icon: Send },
      },
      {
        path: 'category',
        element: <CategoryPage />,
        breadcrumb: 'navigation.category',
        navigation: { label: 'navigation.category', icon: SquareLibrary },
      },
      {
        path: 'member',
        element: <MemberPage />,
        breadcrumb: 'navigation.member',
        navigation: { label: 'navigation.member', icon: UserRound },
      },
      {
        path: 'setting',
        element: <SettingPage />,
        breadcrumb: 'navigation.setting',
        navigation: { label: 'navigation.setting', icon: Settings },
      },
    ],
  },
]
