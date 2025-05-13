import { CampaignType, FeedbackState, IFeedback } from '@/app/models/feedback'
import useFeedbackStore from '@/app/stores/feedback'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useTranslation } from '@/i18n'
import { formatDateTime24h } from '@/lib/date'
import { formatNumber } from '@/lib/number'
import { cn } from '@/lib/utils'
import { mockReplies } from '@/mock/mock-replies'
import {
  Ban,
  Calendar,
  CheckCheck,
  CircleDotDashed,
  Frown,
  Globe,
  Meh,
  MessageCircle,
  ScanSearch,
  SmilePlus,
  Sparkles,
  Star,
  Tag,
  User,
} from 'lucide-react'
import { ReactElement, useState } from 'react'
import { toast } from 'sonner'

interface IFeedbackDetailDialogProps {
  feedback: IFeedback | null
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

// Info item component for metadata
interface IInfoItemProps {
  icon: ReactElement
  label: string
  value: string
}

const InfoItem = ({ icon, label, value }: IInfoItemProps) => {
  return (
    <div className='flex items-center gap-2'>
      <div className='text-muted-foreground'>{icon}</div>
      <div className='flex flex-col'>
        <span className='text-xs text-muted-foreground'>{label}</span>
        <span className='text-sm font-medium'>{value}</span>
      </div>
    </div>
  )
}

const FeedbackDetailDialog = ({
  feedback,
  isOpen,
  onClose,
}: IFeedbackDetailDialogProps) => {
  const { t } = useTranslation()
  const [isChangingState, setIsChangingState] = useState(false)
  const { changeFeedbackState } = useFeedbackStore()

  if (!feedback) return null

  // Use actual reply count from stats if available, otherwise count from mock data
  const replyCount =
    feedback.stats?.totalReplies ??
    mockReplies.filter((r) => r.feedbackId === feedback.id).length

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
      <DialogContent className='max-w-2xl overflow-y-auto max-h-[90vh]'>
        <DialogHeader className='space-y-2'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <div className='text-xs px-2 py-1 bg-muted rounded-xl'>
                {feedback.campaignType
                  ? t(
                      `feedback:campaignType.${feedback.campaignType.toLowerCase()}`,
                    )
                  : t('feedback:campaignType.general')}
              </div>
              <FeedbackRating
                type={feedback.campaignType}
                rating={feedback.rating}
              />
            </div>
            <div className='text-xs text-muted-foreground'>
              {formatDateTime24h(feedback.createdAt)}
            </div>
          </div>
          <DialogTitle className='text-xl'>
            {t('feedback:detail.title')}
          </DialogTitle>
        </DialogHeader>

        <div className='space-y-6 mt-2'>
          {/* Feedback content */}
          <div className='p-4 bg-muted/30 rounded-xl'>
            <p className='text-base'>{feedback.content}</p>
          </div>

          {/* Metadata grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <InfoItem
              icon={<Tag size={16} />}
              label={t('feedback:category')}
              value={feedback.category.name || t('feedback:no_category')}
            />
            <InfoItem
              icon={<User size={16} />}
              label={t('feedback:user')}
              value={
                feedback.isAnonymous || (!feedback.email && !feedback.appUserId)
                  ? t('feedback:anonymous')
                  : feedback.email || feedback.appUserId
              }
            />
            <InfoItem
              icon={<Globe size={16} />}
              label={t('feedback:country')}
              value={t(`countries:${feedback.countryCode}`)}
            />
            <InfoItem
              icon={<MessageCircle size={16} />}
              label={t('feedback:replies')}
              value={`${formatNumber(replyCount)} ${t('feedback:replies')}`}
            />
          </div>

          {/* Replies section */}
          <div className='space-y-3'>
            <div className='flex items-center justify-between'>
              <h3 className='text-sm font-medium'>
                {t('feedback:replies')} ({formatNumber(replyCount)})
              </h3>
              <Button
                variant='outline'
                size='sm'
                className='rounded-xl px-3 py-1 h-auto text-xs'
              >
                {t('feedback:add_reply')}
              </Button>
            </div>

            {/* Reply list would go here */}
            <div className='text-sm text-muted-foreground italic text-center py-6 border border-dashed border-muted rounded-xl'>
              {replyCount === 0
                ? t('feedback:no_replies_yet')
                : t('feedback:replies_coming_soon')}
            </div>
          </div>

          {/* State management */}
          <div className='pt-2 border-t'>
            <div className='flex items-center justify-between'>
              <div className='text-sm font-medium'>
                {t('feedback:state.title')}
              </div>
              <div className='w-48'>
                <Select
                  defaultValue={feedback.state}
                  onValueChange={handleStateChange}
                  disabled={isChangingState}
                >
                  <SelectTrigger className='text-sm rounded-xl'>
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
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default FeedbackDetailDialog
