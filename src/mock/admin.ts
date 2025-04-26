import { ICategory, IProjectSettings, ITeamInvitation, ITeamMember } from '@/app/models/admin'

export const mockCategories: ICategory[] = [
  {
    id: '1',
    name: 'Bug Report',
    isActive: true
  },
  {
    id: '2',
    name: 'Feature Request',
    isActive: true
  },
  {
    id: '3',
    name: 'General Feedback',
    isActive: false
  }
]

export const mockTeamMembers: ITeamMember[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'OWNER',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'EDITOR',
    avatar: 'https://ui-avatars.com/api/?name=Jane+Smith'
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    role: 'VIEWER'
  }
]

export const mockTeamInvitations: ITeamInvitation[] = [
  {
    id: '1',
    email: 'alice.brown@example.com',
    role: 'EDITOR',
    createdAt: new Date('2025-04-20T10:00:00Z')
  },
  {
    id: '2',
    email: 'charlie.davis@example.com',
    role: 'VIEWER',
    createdAt: new Date('2025-04-22T14:30:00Z')
  }
]

export const mockProjectSettings: IProjectSettings = {
  allowAnonymousFeedback: true,
  requireEmailVerification: false,
  autoPublishFeedback: true
}