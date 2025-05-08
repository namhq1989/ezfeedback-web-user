import { IProjectBrief } from '@/app/models/project'

//
// GET PROJECTS
//

export interface IGetProjectsRequest {}

export interface IGetProjectsResponse {
  projects: IProjectBrief[]
}
