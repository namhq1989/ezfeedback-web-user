import { FeedbackRating } from '@/app/components/feedback'
import EmptyState from '@/app/components/root/empty-state'
import Spinner from '@/app/components/root/spinner'
import { FeedbackStateColors, IFeedback } from '@/app/models/feedback'
import { Badge } from '@/components/ui/badge'
import { useTranslation } from '@/i18n'
import { timeAgo } from '@/lib/date'
import { cn } from '@/lib/utils'

interface IFeedbackCompactListProps {
  feedbacks: IFeedback[]
  isLoading: boolean
  selectedFeedbackId: string | null
  onFeedbackSelect: (feedbackId: string) => void
}

const FeedbackCompactList = ({
  feedbacks,
  isLoading,
  selectedFeedbackId,
  onFeedbackSelect,
}: IFeedbackCompactListProps) => {
  const { t } = useTranslation()

  return (
    <div className='flex-1 overflow-hidden border rounded-xl p-2'>
      {isLoading ? (
        <div className='flex justify-center items-center h-96'>
          <Spinner size='md' />
        </div>
      ) : feedbacks.length === 0 ? (
        <div className='flex justify-center items-center h-96'>
          <EmptyState
            text={t('feedback:emptyState.waitingForFeedback')}
            size='sm'
          />
        </div>
      ) : (
        <div className='flex flex-col gap-2'>
          {feedbacks.map((feedback) => (
            <div
              key={feedback.id}
              className={cn(
                'p-4 cursor-pointer hover:bg-muted hover:rounded-xl rounded-xl transition-colors',
                selectedFeedbackId === feedback.id && 'bg-muted',
              )}
              onClick={() => onFeedbackSelect(feedback.id)}
            >
              <div className='flex flex-col gap-2'>
                <div className='flex gap-2 items-center'>
                  <div
                    className={cn(
                      'w-4 h-2 rounded-full',
                      `bg-${FeedbackStateColors[feedback.state]}`,
                    )}
                  />
                  <span className='flex gap-1 text-xs text-muted-foreground'>
                    {timeAgo(feedback.createdAt, t('common:locale'))}
                  </span>
                </div>
                {/* Line 1: User (left), campaign type (right) */}
                <div className='flex justify-between items-center'>
                  <span className='text-sm font-medium'>
                    {feedback.isAnonymous ||
                    (!feedback.email && !feedback.appUserId)
                      ? t('feedback:anonymous')
                      : feedback.email || feedback.appUserId}
                  </span>
                  <Badge variant='outline'>
                    {feedback.campaignType
                      ? t(
                          `feedback:campaignType.${feedback.campaignType.toLowerCase()}`,
                        )
                      : t('feedback:campaignType.general')}
                  </Badge>
                </div>

                {/* Line 2: Creation date (left), rating (right) */}
                <div className='flex justify-between items-center'>
                  <span className='text-xs text-muted-foreground'>
                    {feedback.stats.totalReplies} {t('feedback:replies')}
                  </span>
                  <FeedbackRating
                    type={feedback.campaignType}
                    rating={feedback.rating}
                    size='sm'
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default FeedbackCompactList
