import { CampaignType, FeedbackState, IFeedback } from '@/app/models/feedback'
import useFeedbackStore from '@/app/stores/feedback'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useTranslation } from '@/i18n'
import { formatDateTime24h, timeAgo } from '@/lib/date'
import { formatNumber } from '@/lib/number'
import { cn } from '@/lib/utils'
import { mockReplies } from '@/mock/mock-replies'
import {
  Ban,
  Calendar,
  CheckCheck,
  CircleDotDashed,
  Frown,
  Meh,
  ScanSearch,
  SmilePlus,
  Sparkles,
  Star,
} from 'lucide-react'
import { ReactElement, useState } from 'react'
import { toast } from 'sonner'

interface IFeedbackCardProps {
  feedback: IFeedback
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
        {/* Render the icon with the desired size */}
        <div className='h-3 w-3 flex items-center justify-center'>{icon}</div>
        <span>{t(`feedback:state.${state}`)}</span>
      </div>
    </SelectItem>
  )
}

const FeedbackCard = ({ feedback }: IFeedbackCardProps) => {
  const { t } = useTranslation()
  const [isChangingState, setIsChangingState] = useState(false)
  const { changeFeedbackState } = useFeedbackStore()

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
    <div
      className={cn(
        'rounded-xl border border-border p-4 flex flex-col md:flex-row gap-4',
      )}
    >
      {/* Left Column: Feedback/NPS/CSAT tag + Rating + (Mobile: Date & Country) */}
      <div className='flex flex-col gap-3 md:w-1/5'>
        {/* Mobile view: Feedback type and country */}
        <div className='flex justify-between items-center md:hidden'>
          <div className='text-xs'>
            {feedback.campaignType
              ? t(
                  `feedback:campaignType.${feedback.campaignType.toLowerCase()}`,
                )
              : t('feedback:campaignType.general')}
          </div>

          {/* Country - Mobile only */}
          <div className='text-xs text-muted-foreground'>
            {t(`countries:${feedback.countryCode}`)}
          </div>
        </div>

        {/* Desktop view: Feedback type */}
        <div className='hidden md:block text-xs'>
          {feedback.campaignType
            ? t(`feedback:campaignType.${feedback.campaignType.toLowerCase()}`)
            : t('feedback:campaignType.general')}
        </div>

        {/* Mobile view: Rating and date */}
        <div className='flex justify-between items-center md:hidden'>
          <FeedbackRating
            type={feedback.campaignType}
            rating={feedback.rating}
          />

          {/* Date - Mobile only */}
          <div className='text-xs text-muted-foreground'>
            {formatDateTime24h(feedback.createdAt)}
          </div>
        </div>

        {/* Desktop view: Rating */}
        <div className='hidden md:block mt-1'>
          <FeedbackRating
            type={feedback.campaignType}
            rating={feedback.rating}
          />
        </div>
      </div>

      {/* Right Column: Category-User-Date, Content, Stats-State */}
      <div className='flex-1 flex flex-col gap-3'>
        {/* Category - User - Date (Desktop only for Date and Country) */}
        <div className='flex items-center gap-2 text-xs text-muted-foreground mt-2 md:mt-0'>
          {/* Category */}
          <span>{feedback.category.name || t('feedback:no_category')}</span>
          <span>•</span>

          {/* User info */}
          <span className='underline underline-offset-1'>
            {feedback.isAnonymous || (!feedback.email && !feedback.appUserId)
              ? t('feedback:anonymous')
              : feedback.email || feedback.appUserId}
          </span>

          {/* Date & Country - Desktop only */}
          <div className='hidden md:contents'>
            <span>•</span>
            {/* Date */}
            <span>{timeAgo(feedback.createdAt, t('common:locale'))}</span>
            <span>•</span>
            {/* Country */}
            <span>{t(`countries:${feedback.countryCode}`)}</span>
          </div>
        </div>

        {/* Feedback content */}
        <div className='text-sm'>{feedback.content}</div>

        {/* Stats replies - State */}
        <div className='flex items-center justify-between mt-auto'>
          {/* Stats replies with Reply button */}
          <div className='flex items-center gap-2'>
            <span className='text-xs text-muted-foreground'>
              {formatNumber(replyCount)} {t('feedback:replies')}
            </span>

            <Button
              variant='ghost'
              size='sm'
              className='rounded-xl px-3 py-1 h-auto text-xs'
            >
              {t('feedback:reply')}
            </Button>
          </div>

          {/* State as select box */}
          <Select
            defaultValue={feedback.state}
            onValueChange={handleStateChange}
            disabled={isChangingState}
          >
            <SelectTrigger className='w-auto text-xs rounded-xl h-7 px-3'>
              <SelectValue placeholder={t('feedback:state.select')} />
            </SelectTrigger>
            <SelectContent className='rounded-xl'>
              <StateSelectItem state={FeedbackState.New} icon={<Sparkles />} />
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
              <StateSelectItem state={FeedbackState.Declined} icon={<Ban />} />
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

export default FeedbackCard
