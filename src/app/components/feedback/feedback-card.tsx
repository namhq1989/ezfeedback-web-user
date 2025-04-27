import { IFeedback } from '@/app/models/feedback'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useTranslation } from '@/i18n'
import { formatDateTime24h } from '@/lib/date'
import { cn } from '@/lib/utils'
import { mockReplies } from '@/mock/mock-replies'
import { Star } from 'lucide-react'

interface IFeedbackCardProps {
  feedback: IFeedback
}

const FeedbackCard = ({ feedback }: IFeedbackCardProps) => {
  const { t } = useTranslation()

  // Count replies for this feedback
  const replyCount = mockReplies.filter(
    (r) => r.feedbackId === feedback.id,
  ).length

  return (
    <div
      className={cn(
        'rounded-xl border border-border px-4 py-3 flex flex-col md:flex-row items-start gap-4',
        // No background, no shadow, no outline
      )}
    >
      {/* Mobile layout: Stars and State at top */}
      <div className='flex justify-between items-center w-full md:hidden mb-2'>
        {/* Stars */}
        <span className='flex items-center gap-1'>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={16}
              fill={i < feedback.rating ? 'currentColor' : 'none'}
              stroke={i < feedback.rating ? 'var(--primary)' : '#e5e7eb'}
              className={
                i < feedback.rating ? 'text-primary' : 'text-muted-foreground'
              }
            />
          ))}
        </span>
        {/* State */}
        <Badge variant='outline'>{t(`feedback:state.${feedback.state}`)}</Badge>
      </div>

      {/* Desktop layout: Left column with Stars, Category & State */}
      <div className='hidden md:flex flex-col min-w-[120px] items-start gap-2 pt-1'>
        {/* Stars */}
        <span className='flex items-center gap-1 mb-1'>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={16}
              fill={i < feedback.rating ? 'currentColor' : 'none'}
              stroke={i < feedback.rating ? 'var(--primary)' : '#e5e7eb'}
              className={
                i < feedback.rating ? 'text-primary' : 'text-muted-foreground'
              }
            />
          ))}
        </span>
        <Badge variant='outline'>{t(`feedback:state.${feedback.state}`)}</Badge>
      </div>

      {/* Center: User, Time, Content, Replies */}
      <div className='flex-1 flex flex-col gap-2'>
        {/* User & Time */}
        <div className='flex items-center gap-2 text-xs text-muted-foreground my-1'>
          <span>{feedback.categoryName || '-'}</span>
          <span>•</span>
          <span>
            {feedback.isAnonymous
              ? t('feedback:anonymous')
              : feedback.userId || '-'}
          </span>
          <span>•</span>
          <span>{formatDateTime24h(feedback.createdAt)}</span>
        </div>
        {/* Content */}
        <div className='text-sm'>{feedback.content}</div>
        {/* Replies and Reply Button */}
        <div className='flex items-center gap-3'>
          <span className='text-xs text-muted-foreground'>
            {replyCount} {t('feedback:replies')}
          </span>
          <Button
            variant='ghost'
            size='sm'
            className='rounded-xl px-3 py-1 h-auto text-xs'
          >
            {t('feedback:reply')}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default FeedbackCard
