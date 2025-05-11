import FeedbackCard from '@/app/components/feedback/feedback-card'
import Spinner from '@/app/components/root/spinner'
import useFeedbackStore from '@/app/stores/feedback'
import { useTranslation } from '@/i18n'

const FeedbackList = () => {
  const { t } = useTranslation()
  const { feedbacks, isLoadingFeedbacks } = useFeedbackStore()

  // Single column list layout for feedback cards
  const listClass = 'flex flex-col gap-4'

  // No longer fetch feedbacks on component mount
  // The parent component (FeedbackPage) is responsible for data fetching

  return (
    <div className='w-full'>
      {isLoadingFeedbacks ? (
        <div className='flex justify-center py-8'>
          <Spinner size='md' />
        </div>
      ) : (
        <div className={listClass}>
          {feedbacks.length === 0 ? (
            <div className='text-center text-muted-foreground py-8'>
              {t('feedback:table.noFeedbacks')}
            </div>
          ) : (
            feedbacks.map((feedback) => (
              <FeedbackCard key={feedback.id} feedback={feedback} />
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default FeedbackList
