import {
  CampaignType,
  FeedbackState,
  FeedbackStateColors,
} from '@/app/models/feedback'
import useProjectStore from '@/app/stores/project'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Toggle } from '@/components/ui/toggle'
import { useTranslation } from '@/i18n'
import { cn } from '@/lib/utils'
import {
  Calendar,
  CheckCheck,
  Inbox,
  PlayCircle,
  ScanSearch,
  Sparkles,
  XCircle,
} from 'lucide-react'
import { useState } from 'react'

interface IFeedbackFiltersProps {
  onFilterChange: (filters: IFeedbackFilters) => void
  stateFilterOnly?: boolean
  horizontal?: boolean
}

export interface IFeedbackFilters {
  projectId?: string
  categoryId?: string
  campaignType?: CampaignType
  keyword?: string
  state?: FeedbackState
  rating?: number
  page?: number
}

const FeedbackFilters = ({
  onFilterChange,
  stateFilterOnly = false,
  horizontal = false,
}: IFeedbackFiltersProps) => {
  const { t } = useTranslation()
  const [filters, setFilters] = useState<IFeedbackFilters>({
    page: 0,
  })
  const { selectedProject } = useProjectStore()
  const categories = selectedProject?.categories || []

  // We no longer automatically call onFilterChange when filters change
  // This prevents the infinite loop

  const handleClearFilters = () => {
    const newFilters = {
      page: 0,
    }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleCampaignTypeChange = (value: CampaignType) => {
    const newFilters = {
      ...filters,
      campaignType: filters.campaignType === value ? undefined : value,
      page: 0,
    }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = {
      ...filters,
      keyword: e.target.value || undefined,
      page: 0,
    }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleCategoryClick = (categoryId: string) => {
    const newFilters = {
      ...filters,
      categoryId: filters.categoryId === categoryId ? undefined : categoryId,
      page: 0,
    }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleStateClick = (state?: FeedbackState) => {
    const newFilters = {
      ...filters,
      state: state,
      page: 0,
    }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleRatingClick = (rating: number) => {
    const newFilters = {
      ...filters,
      rating: filters.rating === rating ? undefined : rating,
      page: 0,
    }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  // Get the appropriate icon for each feedback state
  const getStateIcon = (state?: FeedbackState) => {
    switch (state) {
      case FeedbackState.New:
        return (
          <Sparkles
            className={`w-4 h-4 text-${FeedbackStateColors[FeedbackState.New]}`}
          />
        )
      case FeedbackState.InReview:
        return (
          <ScanSearch
            className={`w-4 h-4 text-${FeedbackStateColors[FeedbackState.InReview]}`}
          />
        )
      case FeedbackState.Planned:
        return (
          <Calendar
            className={`w-4 h-4 text-${FeedbackStateColors[FeedbackState.Planned]}`}
          />
        )
      case FeedbackState.InProgress:
        return (
          <PlayCircle
            className={`w-4 h-4 text-${FeedbackStateColors[FeedbackState.InProgress]}`}
          />
        )
      case FeedbackState.Completed:
        return (
          <CheckCheck
            className={`w-4 h-4 text-${FeedbackStateColors[FeedbackState.Completed]}`}
          />
        )
      case FeedbackState.Declined:
        return (
          <XCircle
            className={`w-4 h-4 text-${FeedbackStateColors[FeedbackState.Declined]}`}
          />
        )
      default:
        return <Inbox className='w-4 h-4' />
    }
  }

  // Render horizontal state filters only (for mobile-like view)
  if (stateFilterOnly && horizontal) {
    return (
      <div className='flex flex-row overflow-x-auto gap-4 pb-2 mb-4 -mx-4 px-4 scrollbar-thin scrollbar-thumb-muted/60 scrollbar-track-transparent'>
        <div
          className={cn(
            'flex items-center gap-2 px-3 py-2 text-sm rounded-xl whitespace-nowrap hover:bg-muted transition-colors cursor-pointer',
            !filters.state && 'bg-muted font-medium',
          )}
          onClick={() => handleStateClick(undefined)}
        >
          <Inbox className='w-4 h-4' />
          <span>{t('feedback:state.all')}</span>
        </div>
        {Object.values(FeedbackState).map((stateValue) => (
          <div
            key={stateValue}
            className={cn(
              'flex items-center gap-2 px-3 py-2 text-sm rounded-xl whitespace-nowrap hover:bg-muted transition-colors cursor-pointer',
              filters.state === stateValue && 'bg-muted font-medium',
            )}
            onClick={() => handleStateClick(stateValue)}
          >
            {getStateIcon(stateValue)}
            <span>{t(`feedback:state.${stateValue}`)}</span>
          </div>
        ))}
      </div>
    )
  }

  // Render state filters only (vertical layout)
  if (stateFilterOnly) {
    return (
      <div className='w-full space-y-2'>
        <Label>{t('feedback:filters.state')}</Label>
        <div className='flex flex-wrap gap-1'>
          <Toggle
            size='sm'
            variant='outline'
            pressed={!filters.state}
            aria-label={t('feedback:state.all')}
            onClick={() => handleStateClick(undefined)}
            className={cn(
              'rounded-xl text-xs px-4 py-2',
              !filters.state ? 'bg-primary text-primary-foreground' : '',
            )}
          >
            {t('feedback:state.all')}
          </Toggle>
          {Object.values(FeedbackState).map((stateValue) => (
            <Toggle
              key={stateValue}
              size='sm'
              variant='outline'
              pressed={filters.state === stateValue}
              aria-label={t(`feedback:state.${stateValue}`)}
              onClick={() => handleStateClick(stateValue)}
              className={cn(
                'rounded-xl text-xs px-4 py-2',
                filters.state === stateValue
                  ? 'bg-primary text-primary-foreground'
                  : '',
              )}
            >
              {t(`feedback:state.${stateValue}`)}
            </Toggle>
          ))}
        </div>
      </div>
    )
  }

  // Render all filters
  return (
    <div className='w-full space-y-6'>
      <div className='space-y-6'>
        {/* Keyword filter */}
        <div className='space-y-2'>
          <Label>{t('feedback:filters.keyword')}</Label>
          <Input
            value={filters.keyword || ''}
            onChange={handleKeywordChange}
            placeholder={t('feedback:filters.keywordPlaceholder')}
            className='w-full rounded-xl'
          />
        </div>
        {/* Campaign Type filter */}
        <div className='space-y-2'>
          <Label>{t('feedback:filters.campaignType')}</Label>
          <div className='flex flex-wrap gap-1'>
            {Object.values(CampaignType).map((type) => (
              <Toggle
                key={type}
                size='sm'
                variant='outline'
                pressed={filters.campaignType === type}
                aria-label={t(`feedback:campaignType.${type}`)}
                onClick={() => handleCampaignTypeChange(type)}
                className={cn(
                  'rounded-xl text-xs px-4 py-2',
                  filters.campaignType === type
                    ? 'bg-primary text-primary-foreground'
                    : '',
                )}
              >
                {t(`feedback:campaignType.${type}`)}
              </Toggle>
            ))}
          </div>
        </div>
        {/* Category filter */}
        <div className='space-y-2'>
          <Label>{t('feedback:filters.category')}</Label>
          <div className='flex flex-wrap gap-1'>
            {categories.map((category) => (
              <Toggle
                key={category.id}
                size='sm'
                variant='outline'
                pressed={filters.categoryId === category.id}
                aria-label={category.name}
                onClick={() => handleCategoryClick(category.id)}
                className={cn(
                  'rounded-xl text-xs px-4 py-2',
                  filters.categoryId === category.id
                    ? 'bg-primary text-primary-foreground'
                    : '',
                )}
              >
                {category.name}
              </Toggle>
            ))}
          </div>
        </div>

        {/* State filter */}
        <div className='space-y-2'>
          <Label>{t('feedback:filters.state')}</Label>
          <div className='flex flex-wrap gap-1'>
            <Toggle
              size='sm'
              variant='outline'
              pressed={!filters.state}
              aria-label={t('feedback:state.all')}
              onClick={() => handleStateClick(undefined)}
              className={cn(
                'rounded-xl text-xs px-4 py-2',
                !filters.state ? 'bg-primary text-primary-foreground' : '',
              )}
            >
              {t('feedback:state.all')}
            </Toggle>
            {Object.values(FeedbackState).map((stateValue) => (
              <Toggle
                key={stateValue}
                size='sm'
                variant='outline'
                pressed={filters.state === stateValue}
                aria-label={t(`feedback:state.${stateValue}`)}
                onClick={() => handleStateClick(stateValue)}
                className={cn(
                  'rounded-xl text-xs px-4 py-2',
                  filters.state === stateValue
                    ? 'bg-primary text-primary-foreground'
                    : '',
                )}
              >
                {t(`feedback:state.${stateValue}`)}
              </Toggle>
            ))}
          </div>
        </div>

        {/* Rating filter */}
        <div className='space-y-2'>
          <Label>{t('feedback:filters.rating')}</Label>
          <div className='flex flex-wrap gap-1'>
            {[1, 2, 3, 4, 5].map((rating) => (
              <Toggle
                key={rating}
                size='sm'
                variant='outline'
                pressed={filters.rating === rating}
                aria-label={`Rating ${rating}`}
                onClick={() => handleRatingClick(rating)}
                className={cn(
                  'rounded-xl text-xs px-4 py-2',
                  filters.rating === rating
                    ? 'bg-primary text-primary-foreground'
                    : '',
                )}
              >
                {rating}
              </Toggle>
            ))}
          </div>
        </div>

        {/* Clear filters button */}
        <Button
          onClick={handleClearFilters}
          variant='ghost'
          className='w-full rounded-xl mt-2'
        >
          {t('feedback:filters.clearFilters')}
        </Button>
      </div>
    </div>
  )
}

export default FeedbackFilters
