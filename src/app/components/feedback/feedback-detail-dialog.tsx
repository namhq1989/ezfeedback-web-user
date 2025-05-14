import EmptyState from '@/app/components/root/empty-state'
import Spinner from '@/app/components/root/spinner'
import { CampaignType, FeedbackState } from '@/app/models/feedback'
import { IFeedbackReply } from '@/app/models/feedback-reply'
import useFeedbackStore from '@/app/stores/feedback'
import useFeedbackReplyStore from '@/app/stores/feedback-reply'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useTranslation } from '@/i18n'
import { formatDateTime24h, timeAgo } from '@/lib/date'
import { cn } from '@/lib/utils'
import {
  Ban,
  Calendar,
  CheckCheck,
  CircleDotDashed,
  Frown,
  Meh,
  ScanSearch,
  Send,
  SmilePlus,
  Sparkles,
  Star,
} from 'lucide-react'
import { ReactElement, useEffect, useState } from 'react'
import { toast } from 'sonner'

interface IFeedbackDetailDialogProps {
  feedbackId: string
  isOpen: boolean
  onClose: () => void
}

interface IFeedbackRatingProps {
  type: string
  rating: number
}

// Component for star rating (used for Feedback type)
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className='flex flex-wrap items-center gap-1'>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          fill={i < rating ? 'currentColor' : 'none'}
          stroke={i < rating ? 'var(--primary)' : '#e5e7eb'}
          className={i < rating ? 'text-primary' : 'text-muted-foreground'}
        />
      ))}
    </div>
  )
}

// Component for CSAT rating (1-5 scale with emoji)
const CSATRating = ({ rating }: { rating: number }) => {
  const getCSATColor = (rating: number) => {
    if (rating >= 4) return 'text-green-500'
    if (rating >= 3) return 'text-amber-500'
    return 'text-red-500'
  }

  const getCSATEmoji = (rating: number) => {
    if (rating >= 4)
      return <SmilePlus size={20} strokeWidth={1} className='text-green-500' />
    if (rating >= 3)
      return <Meh size={20} strokeWidth={1} className='text-amber-500' />
    return <Frown size={20} strokeWidth={1} className='text-red-500' />
  }

  return (
    <div className='flex items-center gap-2'>
      {getCSATEmoji(rating)}
      <span className={cn('text-sm font-medium', getCSATColor(rating))}>
        {rating}/5
      </span>
    </div>
  )
}

// Component for NPS rating (0-10 scale with progress bar)
const NPSRating = ({ rating }: { rating: number }) => {
  const getNPSCategory = (rating: number) => {
    if (rating >= 9) return { text: 'Promoter', color: 'text-green-500' }
    if (rating >= 7) return { text: 'Passive', color: 'text-amber-500' }
    return { text: 'Detractor', color: 'text-red-500' }
  }

  const category = getNPSCategory(rating)

  return (
    <div className='space-y-1'>
      <div className='flex items-center gap-1 text-xs'>
        <span className={category.color}>{category.text}</span>
        <span className='font-medium'>({rating}/10)</span>
      </div>
    </div>
  )
}

// Main component to render the appropriate rating based on feedback type
const FeedbackRating = ({ type, rating }: IFeedbackRatingProps) => {
  switch (type) {
    case CampaignType.CSAT:
      return <CSATRating rating={rating} />
    case CampaignType.NPS:
      return <NPSRating rating={rating} />
    default:
      return <StarRating rating={rating} />
  }
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

// Reply item component
interface IReplyItemProps {
  reply: IFeedbackReply
}

const ReplyItem = ({ reply }: IReplyItemProps) => {
  const { t } = useTranslation()

  return (
    <div className='py-2'>
      <div className='border-l-2 pl-4'>
        <div className='flex gap-2 items-center mb-2'>
          <div className='flex items-center gap-2'>
            <div className='font-medium text-sm text-muted-foreground'>
              {reply.user.name || reply.user.email}
            </div>
            {reply.isEdited && (
              <span className='text-xs text-muted-foreground italic'>
                {t('feedback:edited')}
              </span>
            )}
          </div>
          <div className='text-xs text-muted-foreground'>
            {timeAgo(reply.createdAt, t('common:locale'))}
          </div>
        </div>
        <div className='text-sm whitespace-pre-wrap break-words'>
          {reply.content}
        </div>
      </div>
    </div>
  )
}

const FeedbackDetailDialog = ({
  feedbackId,
  isOpen,
  onClose,
}: IFeedbackDetailDialogProps) => {
  const { t } = useTranslation()
  const [isChangingState, setIsChangingState] = useState(false)
  const { feedbacks, changeFeedbackState } = useFeedbackStore()
  const { replies, isLoading, isCreating, getReplies, limit } =
    useFeedbackReplyStore()

  const [replyContent, setReplyContent] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const [totalReplies, setTotalReplies] = useState(0)

  // Find the feedback from the store using the ID
  const feedback = feedbacks.find((f) => f.id === feedbackId)

  // Reset state when dialog opens with new feedback
  useEffect(() => {
    if (isOpen && feedbackId) {
      setCurrentPage(0)
      setReplyContent('')
      if (feedback) {
        setTotalReplies(feedback.stats?.totalReplies || 0)
      }
    }
  }, [isOpen, feedbackId, feedback])

  // Load replies when dialog opens or page changes
  useEffect(() => {
    if (isOpen && feedbackId) {
      loadReplies()
    }
  }, [isOpen, feedbackId, currentPage])

  if (!feedback) return null

  // Calculate total pages for pagination
  const totalPages = Math.ceil(totalReplies / limit)

  // Load replies with pagination
  const loadReplies = async () => {
    if (!feedbackId) return

    await getReplies(feedbackId, { page: currentPage })

    // Update total replies count if available from feedback
    if (feedback && feedback.stats?.totalReplies !== undefined) {
      setTotalReplies(feedback.stats.totalReplies)
    }
  }

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handlePrevPage = () => {
    if (currentPage > 0) {
      handlePageChange(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      handlePageChange(currentPage + 1)
    }
  }

  // Handle reply submission
  const handleReplySubmit = async () => {
    if (!feedback || !replyContent.trim() || isCreating) return

    try {
      await useFeedbackReplyStore
        .getState()
        .createReply(feedbackId, { content: replyContent.trim() })

      // Clear the input
      setReplyContent('')

      // Show success toast
      toast.success(t('feedback:reply_sent'), {
        description: t('feedback:reply_sent_description'),
      })
    } catch (error) {
      // Show error toast
      toast.error(t('feedback:reply_error'), {
        description:
          (error as Error).message || t('feedback:reply_error_description'),
      })
    }
  }

  // Handle key press in textarea
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Submit on Ctrl+Enter or Command+Enter
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault()
      handleReplySubmit()
    }
  }

  // Handle state change
  const handleStateChange = async (newState: string) => {
    // Skip if state hasn't changed
    if (newState === feedback.state) return

    try {
      setIsChangingState(true)

      // Call the API to change the feedback state
      const success = await changeFeedbackState(
        feedback.id,
        newState as FeedbackState,
      )

      if (success) {
        // Show success toast
        toast.success(t('feedback:state.change_success'), {
          description: t('feedback:state.change_success_description', {
            state: t(`feedback:state.${newState}`),
          }),
        })
      } else {
        // Show error toast
        toast.error(t('feedback:state.change_error'), {
          description: t('feedback:state.change_error_description'),
        })
      }
    } catch (error) {
      // Show error toast
      toast.error(t('feedback:state.change_error'), {
        description:
          (error as Error).message ||
          t('feedback:state.change_error_description'),
      })
    } finally {
      setIsChangingState(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className='w-full md:max-w-1xl overflow-y-auto h-[85vh] p-4 md:p-6 [&>button]:hidden'>
        <div className='flex flex-col gap-8 mt-2 md:mt-0 text-left'>
          <div className='flex justify-between items-center'>
            <div className='flex flex-col gap-1'>
              <div className='text-xs text-muted-foreground'>
                {t(`countries:${feedback.countryCode}`)}
              </div>
              <div className='text-xs text-muted-foreground'>
                {formatDateTime24h(feedback.createdAt)}
              </div>
            </div>
            <Select
              defaultValue={feedback.state}
              onValueChange={handleStateChange}
              disabled={isChangingState}
            >
              <SelectTrigger className='text-xs rounded-xl h-7 px-3'>
                <SelectValue placeholder={t('feedback:state.select')} />
              </SelectTrigger>
              <SelectContent className='rounded-xl'>
                <StateSelectItem
                  state={FeedbackState.New}
                  icon={<Sparkles />}
                />
                <StateSelectItem
                  state={FeedbackState.InReview}
                  icon={<ScanSearch />}
                />
                <StateSelectItem
                  state={FeedbackState.Planned}
                  icon={<Calendar />}
                />
                <StateSelectItem
                  state={FeedbackState.InProgress}
                  icon={<CircleDotDashed />}
                />
                <StateSelectItem
                  state={FeedbackState.Completed}
                  icon={<CheckCheck />}
                />
                <StateSelectItem
                  state={FeedbackState.Declined}
                  icon={<Ban />}
                />
              </SelectContent>
            </Select>
          </div>

          <div className='flex flex-col gap-4'>
            <div className='flex gap-2 items-center'>
              <Badge variant='secondary'>
                {feedback.campaignType
                  ? t(
                      `feedback:campaignType.${feedback.campaignType.toLowerCase()}`,
                    )
                  : t('feedback:campaignType.general')}
              </Badge>
              <FeedbackRating
                type={feedback.campaignType}
                rating={feedback.rating}
              />
            </div>
            <div className='space-y-2'>
              {/* Category - User info */}
              <div className='flex items-center gap-2 text-xs text-muted-foreground'>
                {/* Category */}
                <span>
                  {feedback.category.name || t('feedback:no_category')}
                </span>
                <span>•</span>

                {/* User info */}
                <span className='underline underline-offset-1'>
                  {feedback.isAnonymous ||
                  (!feedback.email && !feedback.appUserId)
                    ? t('feedback:anonymous')
                    : feedback.email || feedback.appUserId}
                </span>
              </div>

              {/* Feedback content */}
              <div className='text-sm'>{feedback.content}</div>

              {/* Replies section */}
              <div className='space-y-2 mt-8'>
                {/* <div className='flex items-center justify-between'>
                  <span className='text-xs text-muted-foreground'>
                    {totalReplies}{' '}
                    {totalReplies === 1
                      ? t('feedback:reply')
                      : t('feedback:replies')}
                  </span>
                  <span className='text-xs text-muted-foreground'>
                    Ctrl + Enter to send
                  </span>
                </div> */}

                <div className='relative w-full'>
                  <Textarea
                    placeholder={t('feedback:write_reply')}
                    className='resize-none text-xs pr-10 min-h-[100px]'
                    rows={4}
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    onKeyDown={handleKeyPress}
                    disabled={isCreating}
                  />
                  <Send
                    onClick={handleReplySubmit}
                    className={`absolute right-3 bottom-3 rounded-xl h-5 w-5 p-0 flex items-center justify-center ${replyContent.trim() && !isCreating ? 'text-primary cursor-pointer' : 'text-muted-foreground cursor-not-allowed'}`}
                  />
                </div>
                <span className='flex justify-end text-xs text-muted-foreground'>
                  {t('common:actions.ctrlEnterToSend')}
                </span>

                {/* Reply list */}
                <div className='mt-4'>
                  {isLoading && currentPage === 0 ? (
                    <div className='flex justify-center items-center py-8'>
                      <Spinner size='sm' />
                    </div>
                  ) : totalReplies === 0 ? (
                    <EmptyState text={t('feedback:no_replies_yet')} size='xs' />
                  ) : replies.length === 0 ? (
                    <div className='p-4 text-center text-sm text-muted-foreground'>
                      {t('feedback:no_replies_yet')}
                    </div>
                  ) : (
                    <div>
                      {replies.map((reply) => (
                        <div key={reply.id} className='p-2'>
                          <ReplyItem reply={reply} />
                        </div>
                      ))}

                      {isLoading && currentPage > 0 && (
                        <div className='flex justify-center items-center py-4'>
                          <Spinner size='sm' />
                        </div>
                      )}

                      {/* Pagination */}
                      {totalReplies > 0 && (
                        <div className='flex justify-between items-center mt-4 px-2'>
                          <div className='text-xs text-muted-foreground'>
                            {t('feedback:pagination.showing', {
                              from: currentPage * limit + 1,
                              to: Math.min(
                                (currentPage + 1) * limit,
                                totalReplies,
                              ),
                              total: totalReplies,
                            })}
                          </div>
                          <div className='flex gap-2'>
                            <Button
                              variant='outline'
                              size='sm'
                              onClick={handlePrevPage}
                              disabled={currentPage === 0}
                              className='rounded-xl text-xs'
                            >
                              {t('feedback:pagination.prev')}
                            </Button>
                            <Button
                              variant='outline'
                              size='sm'
                              onClick={handleNextPage}
                              disabled={currentPage >= totalPages - 1}
                              className='rounded-xl text-xs'
                            >
                              {t('feedback:pagination.next')}
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default FeedbackDetailDialog
