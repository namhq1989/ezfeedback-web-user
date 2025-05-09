import {
  IGetProjectByIdRequest,
  IGetProjectByIdResponse,
  IGetProjectsRequest,
  IGetProjectsResponse,
} from '@/app/api/project/project-types'
import useHttpStore from '@/core/http'

const API_PREFIX = 'api/project'

const API_PATHS = {
  GET_PROJECTS: `${API_PREFIX}`,
  GET_PROJECT_BY_ID: (id: string) => `${API_PREFIX}/${id}`,
}

const getProjects = async (params?: IGetProjectsRequest) => {
  try {
    const { get } = useHttpStore.getState()
    return get<IGetProjectsResponse>(API_PATHS.GET_PROJECTS, params)
  } catch (error) {
    throw error
  }
}

const getProjectById = async (id: string, params?: IGetProjectByIdRequest) => {
  try {
    const { get } = useHttpStore.getState()
    return get<IGetProjectByIdResponse>(API_PATHS.GET_PROJECT_BY_ID(id), params)
  } catch (error) {
    throw error
  }
}

export default {
  getProjects,
  getProjectById,
}
