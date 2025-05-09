import {
  IChangeProjectCategoryStatusRequest,
  IChangeProjectCategoryStatusResponse,
  ICreateProjectCategoryRequest,
  ICreateProjectCategoryResponse,
  IGetProjectByIdRequest,
  IGetProjectByIdResponse,
  IGetProjectsRequest,
  IGetProjectsResponse,
  IUpdateProjectCategoryRequest,
  IUpdateProjectCategoryResponse,
} from '@/app/api/project/project-types'
import useHttpStore from '@/core/http'

const API_PREFIX = 'api/project'

const API_PATHS = {
  GET_PROJECTS: `${API_PREFIX}`,
  GET_PROJECT_BY_ID: (id: string) => `${API_PREFIX}/${id}`,
  CREATE_PROJECT_CATEGORY: (projectId: string) =>
    `${API_PREFIX}/${projectId}/category`,
  UPDATE_PROJECT_CATEGORY: (projectId: string, categoryId: string) =>
    `${API_PREFIX}/${projectId}/category/${categoryId}`,
  CHANGE_PROJECT_CATEGORY_STATUS: (projectId: string, categoryId: string) =>
    `${API_PREFIX}/${projectId}/category/${categoryId}/status`,
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

const createProjectCategory = async (
  projectId: string,
  data: ICreateProjectCategoryRequest,
) => {
  try {
    const { post } = useHttpStore.getState()
    return post<ICreateProjectCategoryResponse>(
      API_PATHS.CREATE_PROJECT_CATEGORY(projectId),
      data,
    )
  } catch (error) {
    throw error
  }
}

const updateProjectCategory = async (
  projectId: string,
  categoryId: string,
  data: IUpdateProjectCategoryRequest,
) => {
  try {
    const { put } = useHttpStore.getState()
    return put<IUpdateProjectCategoryResponse>(
      API_PATHS.UPDATE_PROJECT_CATEGORY(projectId, categoryId),
      data,
    )
  } catch (error) {
    throw error
  }
}

const changeProjectCategoryStatus = async (
  projectId: string,
  categoryId: string,
  data: IChangeProjectCategoryStatusRequest,
) => {
  try {
    const { patch } = useHttpStore.getState()
    return patch<IChangeProjectCategoryStatusResponse>(
      API_PATHS.CHANGE_PROJECT_CATEGORY_STATUS(projectId, categoryId),
      data,
    )
  } catch (error) {
    throw error
  }
}

export default {
  getProjects,
  getProjectById,
  createProjectCategory,
  updateProjectCategory,
  changeProjectCategoryStatus,
}
