import Spinner from '@/app/components/root/spinner'
import { IFeedbackReply } from '@/app/models/feedback-reply'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useTranslation } from '@/i18n'
import { timeAgo } from '@/lib/date'
import { formatNumber } from '@/lib/number'

interface IFeedbackRepliesProps {
  replies: IFeedbackReply[]
  isLoading: boolean
  totalReplies: number
}

interface IReplyItemProps {
  reply: IFeedbackReply
}

const ReplyItem = ({ reply }: IReplyItemProps) => {
  const { t } = useTranslation()

  return (
    <div className='flex items-start gap-3'>
      <Avatar className='h-10 w-10'>
        <AvatarFallback>
          {reply.user.name.substring(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className='flex-1'>
        <div className='flex items-center gap-2'>
          <div className='font-medium text-sm text-muted-foreground'>
            {reply.user.name || reply.user.email}
          </div>
          <div className='text-xs text-muted-foreground flex items-center gap-1'>
            {timeAgo(reply.createdAt, t('common:locale'))}
            {reply.isEdited && (
              <>
                <span className='text-muted-foreground'>•</span>
                <span className='italic'>{t('feedback:edited')}</span>
              </>
            )}
          </div>
        </div>
        <div className='text-sm whitespace-pre-wrap break-words mt-1'>
          {reply.content}
        </div>
      </div>
    </div>
  )
}

const FeedbackReplies = ({
  replies,
  isLoading,
  totalReplies,
}: IFeedbackRepliesProps) => {
  const { t } = useTranslation()

  if (isLoading) {
    return (
      <div className='flex items-center justify-center py-8'>
        <Spinner size='sm' />
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center justify-between'>
        <h3 className='text-sm'>
          {formatNumber(totalReplies)} {t('feedback:replies')}
        </h3>
      </div>
      <div>
        {replies.length === 0 ? (
          <div className='flex items-center justify-center h-24 text-muted-foreground text-sm'>
            {t('feedback:noReplies')}
          </div>
        ) : (
          <div className='flex flex-col gap-8'>
            {replies.map((reply) => (
              <div key={reply.id}>
                <ReplyItem reply={reply} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default FeedbackReplies
