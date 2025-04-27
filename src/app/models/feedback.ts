export interface IFeedback {
  id: string
  projectId: string
  userId?: string
  categoryId: string
  categoryName?: string // Added for UI display purposes
  content: string
  rating: number
  isAnonymous: boolean
  state: FeedbackState
  status: Status
  createdAt: string
  updatedAt: string
}

export enum FeedbackState {
  New = 'new',
  InReview = 'in_review',
  Planned = 'planned',
  InProgress = 'in_progress',
  Completed = 'completed',
  Declined = 'declined',
}

export type FeedbackStateType = keyof typeof FeedbackState

// Assuming Status is another enum type that wasn't provided in the Golang code
// Creating a placeholder enum for Status
export enum Status {
  Active = 'active',
  Inactive = 'inactive',
  Deleted = 'deleted',
}

export type StatusType = keyof typeof Status
