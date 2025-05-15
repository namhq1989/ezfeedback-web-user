import { CampaignType } from '@/app/models/feedback'
import { cn } from '@/lib/utils'
import { Frown, Meh, SmilePlus, Star } from 'lucide-react'

export interface IFeedbackRatingProps {
  type: string
  rating: number
  size?: 'sm' | 'md'
}

// Component for star rating (used for Feedback type)
const StarRating = ({
  rating,
  size = 'md',
}: {
  rating: number
  size?: 'sm' | 'md'
}) => {
  const starSize = size === 'sm' ? 12 : 14

  return (
    <div className='flex flex-wrap items-center gap-1'>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={starSize}
          fill={i < rating ? 'currentColor' : 'none'}
          stroke={i < rating ? 'var(--primary)' : '#e5e7eb'}
          className={i < rating ? 'text-primary' : 'text-muted-foreground'}
        />
      ))}
    </div>
  )
}

// Component for CSAT rating (1-5 scale with emoji)
const CSATRating = ({
  rating,
  size = 'md',
}: {
  rating: number
  size?: 'sm' | 'md'
}) => {
  const emojiSize = size === 'sm' ? 16 : 20

  const getCSATColor = (rating: number) => {
    if (rating >= 4) return 'text-green-500'
    if (rating >= 3) return 'text-amber-500'
    return 'text-red-500'
  }

  const getCSATEmoji = (rating: number) => {
    if (rating >= 4)
      return (
        <SmilePlus
          size={emojiSize}
          strokeWidth={1}
          className='text-green-500'
        />
      )
    if (rating >= 3)
      return <Meh size={emojiSize} strokeWidth={1} className='text-amber-500' />
    return <Frown size={emojiSize} strokeWidth={1} className='text-red-500' />
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
const NPSRating = ({
  rating,
  size = 'md',
}: {
  rating: number
  size?: 'sm' | 'md'
}) => {
  const textSize = size === 'sm' ? 'text-xs' : 'text-sm'

  const getNPSCategory = (rating: number) => {
    if (rating >= 9) return { text: 'Promoter', color: 'text-green-500' }
    if (rating >= 7) return { text: 'Passive', color: 'text-amber-500' }
    return { text: 'Detractor', color: 'text-red-500' }
  }

  const category = getNPSCategory(rating)

  return (
    <div className='space-y-1'>
      <div className={cn('flex items-center gap-1', textSize)}>
        <span className={category.color}>{category.text}</span>
        <span className='font-medium'>({rating}/10)</span>
      </div>
    </div>
  )
}

// Main component to render the appropriate rating based on feedback type
const FeedbackRating = ({
  type,
  rating,
  size = 'md',
}: IFeedbackRatingProps) => {
  switch (type) {
    case CampaignType.CSAT:
      return <CSATRating rating={rating} size={size} />
    case CampaignType.NPS:
      return <NPSRating rating={rating} size={size} />
    default:
      return <StarRating rating={rating} size={size} />
  }
}

export default FeedbackRating
