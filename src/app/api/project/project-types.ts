import { IProject, IProjectBrief } from '@/app/models/project'

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
