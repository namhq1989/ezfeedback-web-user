import { FeedbackRating } from '@/app/components/feedback'
import EmptyState from '@/app/components/root/empty-state'
import Spinner from '@/app/components/root/spinner'
import { FeedbackStateColors, IFeedback } from '@/app/models/feedback'
import { Badge } from '@/components/ui/badge'
import { useTranslation } from '@/i18n'
import { timeAgo } from '@/lib/date'
import { cn } from '@/lib/utils'
import { Clock, MessageCircle } from 'lucide-react'

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
    <div className='flex-1 overflow-hidden'>
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
        <div className='flex flex-col divide-y divide-border'>
          {feedbacks.map((feedback) => (
            <div
              key={feedback.id}
              className={cn(
                'p-4 cursor-pointer hover:bg-muted transition-colors h-[140px] flex flex-col justify-between',
                selectedFeedbackId === feedback.id && 'bg-muted',
              )}
              onClick={() => onFeedbackSelect(feedback.id)}
            >
              {/* Line 1: Rating (left), State (right) */}
              <div className='flex justify-between items-center'>
                <FeedbackRating
                  type={feedback.campaignType}
                  rating={feedback.rating}
                  size='sm'
                />
                <Badge
                  className={cn(
                    'text-xs font-medium',
                    `bg-${FeedbackStateColors[feedback.state]} text-${FeedbackStateColors[feedback.state]}/30`,
                  )}
                >
                  {t(`feedback:state.${feedback.state}`)}
                </Badge>
              </div>

              {/* Line 2: Content with max 2 lines */}
              <p className='text-sm line-clamp-2 min-h-[40px]'>
                {feedback.content || '-'}
              </p>

              {/* Line 3: Creation date and replies count */}
              <div className='flex justify-between items-center text-xs text-muted-foreground'>
                <div className='flex items-center gap-1'>
                  <Clock className='w-3.5 h-3.5' />
                  <span>{timeAgo(feedback.createdAt, t('common:locale'))}</span>
                </div>
                <div className='flex items-center gap-1'>
                  <MessageCircle className='w-3.5 h-3.5' />
                  <span>
                    {feedback.stats.totalReplies} {t('feedback:replies')}
                  </span>
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
