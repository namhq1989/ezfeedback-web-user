import {
  IChangeProjectCategoryStatusRequest,
  IChangeProjectCategoryStatusResponse,
  IChangeProjectStatusRequest,
  IChangeProjectStatusResponse,
  ICreateProjectCategoryRequest,
  ICreateProjectCategoryResponse,
  IGetProjectByIdRequest,
  IGetProjectByIdResponse,
  IGetProjectCollaboratorsRequest,
  IGetProjectCollaboratorsResponse,
  IGetProjectsRequest,
  IGetProjectsResponse,
  IUpdateProjectCategoryRequest,
  IUpdateProjectCategoryResponse,
  IUpdateProjectRequest,
  IUpdateProjectResponse,
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
  UPDATE_PROJECT: (id: string) => `${API_PREFIX}/${id}`,
  CHANGE_PROJECT_STATUS: (id: string) => `${API_PREFIX}/${id}/status`,
  GET_PROJECT_COLLABORATORS: (id: string) =>
    `${API_PREFIX}/${id}/collaborators`,
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

const updateProject = async (id: string, data: IUpdateProjectRequest) => {
  try {
    const { put } = useHttpStore.getState()
    return put<IUpdateProjectResponse>(API_PATHS.UPDATE_PROJECT(id), data)
  } catch (error) {
    throw error
  }
}

const changeProjectStatus = async (
  id: string,
  data: IChangeProjectStatusRequest,
) => {
  try {
    const { patch } = useHttpStore.getState()
    return patch<IChangeProjectStatusResponse>(
      API_PATHS.CHANGE_PROJECT_STATUS(id),
      data,
    )
  } catch (error) {
    throw error
  }
}

const getProjectCollaborators = async (
  id: string,
  params?: IGetProjectCollaboratorsRequest,
) => {
  try {
    const { get } = useHttpStore.getState()
    return get<IGetProjectCollaboratorsResponse>(
      API_PATHS.GET_PROJECT_COLLABORATORS(id),
      params,
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
  updateProject,
  changeProjectStatus,
  getProjectCollaborators,
}
