import { AppRoute, appRoutes } from '@/app/router/routes'
import { JSX } from 'react'
import { Route, Routes } from 'react-router'

// Helper to recursively convert AppRoute tree to <Route> elements
function renderRoutes(routes: AppRoute[]): JSX.Element[] {
  return routes.map((route) => {
    const hasChildren = route.children && route.children.length > 0
    if (route.index) {
      return <Route index key='index' element={route.element} />
    }
    return (
      <Route key={route.path} path={route.path} element={route.element}>
        {hasChildren ? renderRoutes(route.children!) : null}
      </Route>
    )
  })
}

const App = () => {
  return <Routes>{renderRoutes(appRoutes)}</Routes>
}

export default App
