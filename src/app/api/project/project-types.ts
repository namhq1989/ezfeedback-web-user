import { IProject, IProjectBrief, IProjectCategory } from '@/app/models/project'

//
// GET PROJECTS
//

export interface IGetProjectsRequest {}

export interface IGetProjectsResponse {
  projects: IProjectBrief[]
}

//
// GET PROJECT BY ID
//

export interface IGetProjectByIdRequest {}

export interface IGetProjectByIdResponse {
  project: IProject
}

//
// CREATE PROJECT CATEGORY
//

export interface ICreateProjectCategoryRequest {
  name: string
}

export interface ICreateProjectCategoryResponse {
  category: IProjectCategory
}

//
// UPDATE PROJECT CATEGORY
//

export interface IUpdateProjectCategoryRequest {
  name: string
}

export interface IUpdateProjectCategoryResponse {
  category: IProjectCategory
}

//
// CHANGE PROJECT CATEGORY STATUS
//

export interface IProjectCategoryStatus {
  status: 'active' | 'inactive'
}

export interface IChangeProjectCategoryStatusRequest {
  status: IProjectCategoryStatus['status']
}

export interface IChangeProjectCategoryStatusResponse {
  category: IProjectCategory
}
