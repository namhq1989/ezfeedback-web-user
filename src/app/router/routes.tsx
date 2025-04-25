import AuthenticatedLayout from '@/app/components/layout/authenticated-layout'
import BillingPage from '@/app/pages/billing-page'
import CategoryPage from '@/app/pages/category-page'
import DashboardPage from '@/app/pages/dashboard-page'
import FeedbackPage from '@/app/pages/feedback-page'
import MemberPage from '@/app/pages/member-page'
import NotificationPage from '@/app/pages/notification-page'
import PricingPage from '@/app/pages/pricing-page'
import SettingPage from '@/app/pages/setting-page'
import SignInPage from '@/app/pages/sign-in-page'
import SupportPage from '@/app/pages/support-page'
import UserMenuLayout from '@/app/router/user-menu-layout'
import { JSX } from 'react'
import { Navigate } from 'react-router'

import AccountPage from '@/app/pages/account-page'
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
    icon?: React.ElementType
  }
  children?: AppRoute[]
  isPublic?: boolean
}

export const appRoutes: AppRoute[] = [
  {
    element: <AuthenticatedLayout />,
    breadcrumb: '',
    navigation: undefined,
    isPublic: false,
    children: [
      {
        element: <UserMenuLayout />,
        breadcrumb: '',
        navigation: undefined,
        children: [
          {
            path: 'account',
            element: <AccountPage />,
            breadcrumb: 'navigation.account',
            navigation: undefined,
          },
          {
            path: 'billing',
            element: <BillingPage />,
            breadcrumb: 'navigation.billing',
            navigation: undefined,
          },
          {
            path: 'notification',
            element: <NotificationPage />,
            breadcrumb: 'navigation.notification',
            navigation: undefined,
          },
          {
            path: 'support',
            element: <SupportPage />,
            breadcrumb: 'navigation.support',
            navigation: undefined,
          },
        ],
      },
      {
        path: 'pricing',
        element: <PricingPage />,
        breadcrumb: 'navigation.pricing',
        navigation: undefined,
      },
    ],
  },
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
