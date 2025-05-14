export interface IFeedbackReply {
  id: string
  content: string
  createdAt: string
  updatedAt?: string
  isEdited: boolean
  user: {
    id: string
    name: string
    email: string
  }
}

export interface IFeedbackReplyUser {
  id: string
  name: string
  email: string
}
