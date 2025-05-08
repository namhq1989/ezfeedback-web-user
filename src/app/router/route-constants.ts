/**
 * Route constants for the application
 * Use these constants instead of hardcoded strings to avoid typos and make refactoring easier
 */

export const ROUTES = {
  // Auth routes
  SIGN_IN: '/signin',

  // Main routes
  ROOT: '/',

  // Project routes
  PROJECT: '/project',
  PROJECT_WITH_SLUG: (slug: string) => `/project/${slug}`,
  PROJECT_DASHBOARD: (slug: string) => `/project/${slug}/dashboard`,
  PROJECT_FEEDBACK: (slug: string) => `/project/${slug}/feedback`,
  PROJECT_ADMIN: (slug: string) => `/project/${slug}/admin`,

  // User menu routes
  ACCOUNT: '/account',
  BILLING: '/billing',
  NOTIFICATION: '/notification',
  SUPPORT: '/support',
  PRICING: '/pricing',

  // Default project for redirection (TODO: replace with dynamic project selection)
  DEFAULT_PROJECT_SLUG: 'project-a',
}

// Helper to get default dashboard route
export const getDefaultDashboardRoute = (): string => {
  return ROUTES.PROJECT_DASHBOARD(ROUTES.DEFAULT_PROJECT_SLUG)
}
