export interface ICategory {
  id: string
  name: string
  isActive: boolean
}

export enum TeamMemberRole {
  OWNER = 'owner',
  EDITOR = 'editor',
  VIEWER = 'viewer',
}

export type TeamMemberRoleType = keyof typeof TeamMemberRole

export interface ITeamMember {
  id: string
  name: string
  email: string
  role: TeamMemberRoleType
  avatar?: string
}

export interface ITeamInvitation {
  id: string
  email: string
  role: TeamMemberRoleType
  createdAt: Date
}
