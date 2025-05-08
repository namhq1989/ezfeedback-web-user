import RootPage from '@/app/pages/root'
import { getProjectDashboardRoute } from '@/app/router/route-constants'
import useProjectStore from '@/app/stores/project'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

const RootHandler = () => {
  const navigate = useNavigate()
  const { projects } = useProjectStore()

  useEffect(() => {
    // Navigate to first project dashboard if projects exist
    if (projects && projects.length > 0) {
      navigate(getProjectDashboardRoute(projects[0].id))
    }
  }, [projects, navigate])

  // If we're still here, it means user has no projects
  return <RootPage />
}

export default RootHandler
