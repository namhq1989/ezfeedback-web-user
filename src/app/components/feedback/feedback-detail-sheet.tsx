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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
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
  Meh,
  ScanSearch,
  SmilePlus,
  Sparkles,
  Star,
  X,
} from 'lucide-react'
import { ReactElement, useState } from 'react'
import { toast } from 'sonner'

interface IFeedbackDetailSheetProps {
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

const FeedbackDetailSheet = ({
  feedback,
  isOpen,
  onClose,
}: IFeedbackDetailSheetProps) => {
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
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className='overflow-y-auto'>
        <SheetHeader className='pb-2 border-b'>
          <div className='flex items-center justify-between'>
            <SheetTitle className='text-lg font-medium'>
              {t('feedback:detail.title')}
            </SheetTitle>
            <Button
              variant='ghost'
              size='icon'
              onClick={onClose}
              className='h-8 w-8 rounded-xl'
            >
              <X size={16} />
            </Button>
          </div>
        </SheetHeader>

        <div className='py-4 space-y-6'>
          {/* Feedback type and rating */}
          <div className='flex items-center justify-between'>
            <div className='text-sm font-medium'>
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

          {/* Metadata: Category, User, Date, Country */}
          <div className='space-y-3'>
            <div className='flex items-center justify-between text-sm'>
              <span className='text-muted-foreground'>
                {t('feedback:category')}
              </span>
              <span>{feedback.category.name || t('feedback:no_category')}</span>
            </div>

            <div className='flex items-center justify-between text-sm'>
              <span className='text-muted-foreground'>
                {t('feedback:user')}
              </span>
              <span>
                {feedback.isAnonymous ||
                (!feedback.email && !feedback.appUserId)
                  ? t('feedback:anonymous')
                  : feedback.email || feedback.appUserId}
              </span>
            </div>

            <div className='flex items-center justify-between text-sm'>
              <span className='text-muted-foreground'>
                {t('feedback:date')}
              </span>
              <span>{formatDateTime24h(feedback.createdAt)}</span>
            </div>

            <div className='flex items-center justify-between text-sm'>
              <span className='text-muted-foreground'>
                {t('feedback:country')}
              </span>
              <span>{t(`countries:${feedback.countryCode}`)}</span>
            </div>
          </div>

          {/* Feedback content */}
          <div className='space-y-2'>
            <div className='text-sm font-medium'>{t('feedback:content')}</div>
            <div className='text-sm p-4 bg-muted/50 rounded-xl'>
              {feedback.content}
            </div>
          </div>

          {/* Replies section */}
          <div className='space-y-3'>
            <div className='flex items-center justify-between'>
              <div className='text-sm font-medium'>
                {t('feedback:replies')} ({formatNumber(replyCount)})
              </div>
              <Button
                variant='outline'
                size='sm'
                className='rounded-xl px-3 py-1 h-auto text-xs'
              >
                {t('feedback:add_reply')}
              </Button>
            </div>

            {/* Reply list would go here */}
            <div className='text-sm text-muted-foreground italic text-center py-4'>
              {replyCount === 0
                ? t('feedback:no_replies_yet')
                : t('feedback:replies_coming_soon')}
            </div>
          </div>

          {/* State management */}
          <div className='space-y-2'>
            <div className='text-sm font-medium'>
              {t('feedback:state.title')}
            </div>
            <Select
              defaultValue={feedback.state}
              onValueChange={handleStateChange}
              disabled={isChangingState}
            >
              <SelectTrigger className='w-full text-sm rounded-xl'>
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
      </SheetContent>
    </Sheet>
  )
}

export default FeedbackDetailSheet
