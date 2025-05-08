import {
  IGetProjectsRequest,
  IGetProjectsResponse,
} from '@/app/api/project/project-types'
import useHttpStore from '@/core/http'

const API_PREFIX = 'api/project'

const API_PATHS = {
  GET_PROJECTS: `${API_PREFIX}`,
}

const getProjects = async (params?: IGetProjectsRequest) => {
  try {
    const { get } = useHttpStore.getState()
    return get<IGetProjectsResponse>(API_PATHS.GET_PROJECTS, params)
  } catch (error) {
    throw error
  }
}

export default {
  getProjects,
}
