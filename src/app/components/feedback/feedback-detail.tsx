import { FeedbackRating, FeedbackReplies } from '@/app/components/feedback'
import Spinner from '@/app/components/root/spinner'
import {
  FeedbackState,
  FeedbackStateColors,
  IFeedback,
  IFeedbackStateHistory,
} from '@/app/models/feedback'
import useFeedbackReplyStore from '@/app/stores/feedback-reply'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { useTranslation } from '@/i18n'
import { timeAgo } from '@/lib/date'
import {
  Calendar,
  CheckCheck,
  Globe,
  MapPin,
  PlayCircle,
  ScanSearch,
  Send,
  Sparkles,
  Tag,
  XCircle,
} from 'lucide-react'
import { ReactElement, useEffect, useState } from 'react'

interface IFeedbackDetailProps {
  feedback: IFeedback | null
  stateHistory: IFeedbackStateHistory[]
  isLoading: boolean
}

// Helper component for feedback state select items
interface IStateSelectItemProps {
  state: FeedbackState
  icon: ReactElement
}

const StateSelectItem = ({ state, icon }: IStateSelectItemProps) => {
  const { t } = useTranslation()

  return (
    <SelectItem value={state} className='text-xs'>
      <div className='flex items-center gap-3'>
        <div className='h-3 w-3 flex items-center justify-center'>{icon}</div>
        <span>{t(`feedback:state.${state}`)}</span>
      </div>
    </SelectItem>
  )
}

const FeedbackDetail = ({
  feedback,
  stateHistory,
  isLoading,
}: IFeedbackDetailProps) => {
  const { t } = useTranslation()
  const {
    replies,
    isLoading: isLoadingReplies,
    getReplies,
    clearReplies,
    createReply,
  } = useFeedbackReplyStore()
  const [replyContent, setReplyContent] = useState('')
  const [isCreating, setIsCreating] = useState(false)

  // Fetch replies when feedback changes
  useEffect(() => {
    if (feedback) {
      getReplies(feedback.id)
    } else {
      clearReplies()
    }
  }, [feedback?.id])

  // Handle reply submission
  const handleReplySubmit = async () => {
    if (!feedback || !replyContent.trim() || isCreating) return

    setIsCreating(true)
    try {
      await createReply(feedback.id, { content: replyContent.trim() })
      setReplyContent('')
    } catch (error) {
      console.error('Failed to create reply:', error)
    } finally {
      setIsCreating(false)
    }
  }

  // Handle Ctrl+Enter to submit
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      handleReplySubmit()
    }
  }

  if (isLoading) {
    return (
      <div className='flex h-full items-center justify-center'>
        <Spinner size='md' />
      </div>
    )
  }

  if (!feedback) {
    return (
      <div className='flex h-full items-center justify-center'>
        <div className='text-muted-foreground'>
          {t('feedback:content.select')}
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-4 h-full pl-0 md:pl-4'>
      {/* New Header */}
      <div className='flex items-center justify-between'>
        {/* Left side */}
        <div className='flex flex-col gap-2'>
          {/* Line 1: User and creation date */}
          <div className='flex items-center gap-2 text-sm'>
            {/* User info */}
            <span>
              {feedback.isAnonymous || (!feedback.email && !feedback.appUserId)
                ? t('feedback:anonymous')
                : feedback.email || feedback.appUserId}
            </span>
            <span>•</span>
            {/* Date */}
            <span>{timeAgo(feedback.createdAt, t('common:locale'))}</span>
          </div>

          {/* Line 2: Category, country, IP with icons */}
          <div className='flex items-center gap-4 text-xs text-muted-foreground'>
            <div className='flex items-center gap-1'>
              <Tag className='h-3 w-3' />
              <span>{feedback?.category?.name || '-'}</span>
            </div>
            <div className='flex items-center gap-1'>
              <Globe className='h-3 w-3' />
              <span>
                {feedback?.countryCode
                  ? t(`countries:${feedback.countryCode}`)
                  : '-'}
              </span>
            </div>
            <div className='flex items-center gap-1'>
              <MapPin className='h-3 w-3 text-muted-foreground' />
              <span>{feedback?.ip || '-'}</span>
            </div>
          </div>
        </div>

        {/* Right side: State select box */}
        <div>
          {feedback && (
            <Select defaultValue={feedback.state}>
              <SelectTrigger className='w-auto text-xs rounded-xl h-7 px-3'>
                <SelectValue
                  placeholder={t(`feedback:state.${feedback.state}`)}
                />
              </SelectTrigger>
              <SelectContent className='rounded-xl'>
                <StateSelectItem
                  state={FeedbackState.New}
                  icon={
                    <Sparkles
                      className={`text-${FeedbackStateColors[FeedbackState.New]}`}
                    />
                  }
                />
                <StateSelectItem
                  state={FeedbackState.InReview}
                  icon={
                    <ScanSearch
                      className={`text-${FeedbackStateColors[FeedbackState.InReview]}`}
                    />
                  }
                />
                <StateSelectItem
                  state={FeedbackState.Planned}
                  icon={
                    <Calendar
                      className={`text-${FeedbackStateColors[FeedbackState.Planned]}`}
                    />
                  }
                />
                <StateSelectItem
                  state={FeedbackState.InProgress}
                  icon={
                    <PlayCircle
                      className={`text-${FeedbackStateColors[FeedbackState.InProgress]}`}
                    />
                  }
                />
                <StateSelectItem
                  state={FeedbackState.Completed}
                  icon={
                    <CheckCheck
                      className={`text-${FeedbackStateColors[FeedbackState.Completed]}`}
                    />
                  }
                />
                <StateSelectItem
                  state={FeedbackState.Declined}
                  icon={
                    <XCircle
                      className={`text-${FeedbackStateColors[FeedbackState.Declined]}`}
                    />
                  }
                />
              </SelectContent>
            </Select>
          )}
        </div>
      </div>
      <Separator />
      {/* Column 1: Feedback Data and Replies */}
      <div className='flex justify-between mt-8'>
        <div className='flex flex-col gap-8 mt-8'>
          <div className='flex flex-col gap-8 mr-8'>
            {/* Section 1: Feedback Data */}
            <div className='flex flex-col gap-8'>
              <div className='flex flex-col justify-center gap-3'>
                <div className='flex gap-2'>
                  <Badge className='text-xs font-medium'>
                    {feedback.campaignType
                      ? t(
                          `feedback:campaignType.${feedback.campaignType.toLowerCase()}`,
                        )
                      : t('feedback:campaignType.general')}
                  </Badge>
                  <FeedbackRating
                    type={feedback.campaignType}
                    rating={feedback.rating}
                    size='md'
                  />
                </div>

                <p className='whitespace-pre-wrap text-sm'>
                  {feedback.content || '-'}
                </p>
              </div>
            </div>
          </div>
          {/* Column 2: State History Timeline */}
          <div className='flex border rounded-xl p-5 overflow-auto'>
            <h3 className='text-sm font-medium mb-4'>
              {t('feedback:stateHistory')}
            </h3>

            {stateHistory.length === 0 ? (
              <div className='flex items-center justify-center h-32 text-muted-foreground text-sm'>
                {t('feedback:noHistory')}
              </div>
            ) : (
              <div className='relative'>
                {/* Timeline line */}
                <div className='absolute left-3 top-1 bottom-0 w-0.5 bg-muted z-0'></div>

                {/* Timeline items */}
                <div className='space-y-6 relative z-10'>
                  {stateHistory.map((history) => (
                    <div key={history.id} className='pl-10 relative'>
                      {/* Timeline dot */}
                      <div
                        className={`absolute left-0 top-1 w-6 h-6 rounded-full border-2 border-background flex items-center justify-center bg-${FeedbackStateColors[history.state]}`}
                      >
                        <div className='w-2 h-2 rounded-full bg-background'></div>
                      </div>

                      {/* Content */}
                      <div className='border rounded-xl p-3 hover:bg-muted/10 transition-colors'>
                        <div className='flex items-center gap-2 mb-1'>
                          <Avatar className='h-5 w-5'>
                            <AvatarFallback className='text-[10px]'>
                              {history.user.name.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span className='text-xs font-medium'>
                            {history.user.name}
                          </span>
                        </div>

                        <div className='flex items-center gap-2 mb-1'>
                          <Badge
                            className={`bg-${FeedbackStateColors[history.state]} text-white text-xs hover:bg-${FeedbackStateColors[history.state]}/90`}
                          >
                            {t(`feedback:state.${history.state}`)}
                          </Badge>
                        </div>

                        <div className='text-xs text-muted-foreground'>
                          {timeAgo(history.createdAt, t('common:locale'))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Section 2: Replies */}
        <div className='flex flex-col gap-4'>
          {/* Reply input */}
          <div className='relative w-full'>
            <Textarea
              placeholder={t('feedback:write_reply')}
              className='resize-none text-xs pr-10 min-h-[100px] rounded-xl'
              rows={4}
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={isCreating}
            />
            <Send
              onClick={handleReplySubmit}
              className={`absolute right-4 bottom-8 h-5 w-5 p-0 flex items-center justify-center ${replyContent.trim() && !isCreating ? 'text-primary cursor-pointer' : 'text-muted-foreground cursor-not-allowed'}`}
            />
            <div className='flex justify-end mt-2 mr-1'>
              <span className='text-xs text-muted-foreground'>
                {t('common:actions.ctrlEnterToSend')}
              </span>
            </div>
          </div>

          {/* Replies list */}
          <div className='overflow-auto'>
            <FeedbackReplies
              replies={replies}
              isLoading={isLoadingReplies}
              totalReplies={feedback.stats.totalReplies}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeedbackDetail
