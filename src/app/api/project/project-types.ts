import { IProject, IProjectBrief, IProjectCategory, IProjectCollaborator } from '@/app/models/project'

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

//
// UPDATE PROJECT
//

export interface IUpdateProjectRequest {
  description: string
  domain: string
  primaryColor: string
  title: string
}

export interface IUpdateProjectResponse {
  project: IProject
}

//
// CHANGE PROJECT STATUS
//

export interface IProjectStatus {
  status: 'active' | 'inactive'
}

export interface IChangeProjectStatusRequest {
  status: IProjectStatus['status']
}

export interface IChangeProjectStatusResponse {
  project: IProject
}

//
// GET PROJECT COLLABORATORS
//

export interface IGetProjectCollaboratorsRequest {}

export interface IGetProjectCollaboratorsResponse {
  collaborators: IProjectCollaborator[]
}
