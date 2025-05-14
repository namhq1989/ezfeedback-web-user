import feedbackApi from '@/app/api/feedback/feedback-api'
import feedbackReplyApi from '@/app/api/feedback/feedback-reply-api'

export * from '@/app/api/feedback/feedback-types'
export * from '@/app/api/feedback/feedback-reply-types'

export default {
  ...feedbackApi,
  ...feedbackReplyApi,
}
