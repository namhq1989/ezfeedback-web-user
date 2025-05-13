import FeedbackCard from '@/app/components/feedback/feedback-card'
import FeedbackDetailDialog from '@/app/components/feedback/feedback-detail-dialog'
import EmptyState from '@/app/components/root/empty-state'
import Spinner from '@/app/components/root/spinner'
import { IFeedback } from '@/app/models/feedback'
import useFeedbackStore from '@/app/stores/feedback'
import { useTranslation } from '@/i18n'
import { useState } from 'react'

const FeedbackList = () => {
  const { t } = useTranslation()
  const { feedbacks, isLoadingFeedbacks } = useFeedbackStore()
  const [selectedFeedback, setSelectedFeedback] = useState<IFeedback | null>(
    null,
  )
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)

  // Single column list layout for feedback cards
  const listClass = 'flex flex-col gap-4'

  // No longer fetch feedbacks on component mount
  // The parent component (FeedbackPage) is responsible for data fetching

  const handleFeedbackClick = (feedback: IFeedback) => {
    setSelectedFeedback(feedback)
    setIsDetailDialogOpen(true)
  }

  const handleCloseDetailDialog = () => {
    setIsDetailDialogOpen(false)
  }

  return (
    <div className='w-full'>
      {isLoadingFeedbacks ? (
        <div className='flex justify-center py-8'>
          <Spinner size='md' />
        </div>
      ) : (
        <div className={listClass}>
          {feedbacks.length === 0 ? (
            <EmptyState
              text={t('feedback:emptyState.waitingForFeedback')}
              size='sm'
            />
          ) : (
            feedbacks.map((feedback) => (
              <div
                key={feedback.id}
                className='cursor-pointer'
                onClick={() => handleFeedbackClick(feedback)}
              >
                <FeedbackCard feedback={feedback} />
              </div>
            ))
          )}
        </div>
      )}

      <FeedbackDetailDialog
        feedback={selectedFeedback}
        isOpen={isDetailDialogOpen}
        onClose={handleCloseDetailDialog}
      />
    </div>
  )
}

export default FeedbackList
