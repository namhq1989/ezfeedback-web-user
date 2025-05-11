export interface IProjectCategory {
  id: string
  name: string
  slug: string
  status: string
}

export interface ICampaignSettings {
  widgetPosition: string
  allowAnonymous: boolean
  enableRating: boolean
  minRating: number
  maxRating: number
  followUpQuestion: string
}

export interface ICampaignStats {
  totalFeedbacks: number
}

export interface IProjectCampaign {
  id: string
  name: string
  campaignType: string
  status: string
  settings: ICampaignSettings
  createdAt: string
  updatedAt: string
  stats: ICampaignStats
  categories: IProjectCategory[]
}

export interface IProjectSetting {
  domain: string
  primaryColor: string
}

export interface IProjectStats {
  totalFeedbacks: number
}

export interface IProjectBrief {
  id: string
  title: string
  slug: string
  status: string
  stats: IProjectStats
}

export type CollaboratorRoleType = 'owner' | 'editor' | 'viewer'

export interface IProjectCollaboratorUser {
  id: string
  name: string
  email: string
  status: string
}

export interface IProjectCollaborator {
  id: string
  user: IProjectCollaboratorUser
  role: CollaboratorRoleType
  createdAt: string
}

export interface IProject {
  id: string
  title: string
  slug: string
  description: string
  status: string
  campaigns: IProjectCampaign[]
  categories: IProjectCategory[]
  setting: IProjectSetting
  stats: IProjectStats
  createdAt: string
  updatedAt: string
}
