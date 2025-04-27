import { FeedbackState } from '@/app/models/feedback'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Toggle } from '@/components/ui/toggle'
import { useTranslation } from '@/i18n'
import { cn } from '@/lib/utils'
import { mockCategories } from '@/mock/mock-feedbacks'
import { useEffect, useState } from 'react'

const FilterSection = () => {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string[]>([])
  const [selectedState, setSelectedState] = useState<string[]>([])
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const categories = mockCategories

  // Create a custom event for filter changes
  const dispatchFilterChange = () => {
    const filterEvent = new CustomEvent('feedbackFilterChange', {
      detail: {
        searchQuery,
        selectedCategory,
        selectedState,
        selectedRating,
      },
      bubbles: true,
    })
    document.dispatchEvent(filterEvent)
  }

  // Dispatch event whenever filters change
  useEffect(() => {
    dispatchFilterChange()
  }, [searchQuery, selectedCategory, selectedState, selectedRating])

  const handleClearFilters = () => {
    setSearchQuery('')
    setSelectedCategory([])
    setSelectedState([])
    setSelectedRating(null)
  }

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId],
    )
  }

  const handleStateClick = (state: string) => {
    setSelectedState((prev) =>
      prev.includes(state) ? prev.filter((s) => s !== state) : [...prev, state],
    )
  }

  const handleRatingClick = (rating: number) => {
    setSelectedRating(selectedRating === rating ? null : rating)
  }

  return (
    <div className='w-full md:w-64 space-y-6'>
      <div className='space-y-6'>
        {/* Search input (commented out)
        <div className='space-y-2'>
          <Label htmlFor='search'>{t('feedback:filters.search')}</Label>
          <Input
            id='search'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('feedback:filters.searchPlaceholder')}
            className='w-full rounded-xl'
          />
        </div>
        */}

        {/* Category filter */}
        <div className='space-y-2'>
          <Label>{t('feedback:filters.category')}</Label>
          <div className='flex flex-wrap gap-1'>
            {categories.map((category) => (
              <Toggle
                key={category.id}
                size='sm'
                variant='outline'
                pressed={selectedCategory.includes(category.id)}
                aria-label={category.name}
                onClick={() => handleCategoryClick(category.id)}
                className={cn(
                  'rounded-xl text-xs px-4 py-2',
                  selectedCategory.includes(category.id)
                    ? 'bg-primary! text-primary-foreground!'
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
            {Object.values(FeedbackState).map((stateValue) => (
              <Toggle
                key={stateValue}
                size='sm'
                variant='outline'
                pressed={selectedState.includes(stateValue)}
                aria-label={t(`feedback:state.${stateValue}`)}
                onClick={() => handleStateClick(stateValue)}
                className={cn(
                  'rounded-xl text-xs px-4 py-2',
                  selectedState.includes(stateValue)
                    ? 'bg-primary! text-primary-foreground!'
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
          <div className='flex gap-2'>
            {[1, 2, 3, 4, 5].map((rating) => (
              <Button
                key={rating}
                onClick={() => handleRatingClick(rating)}
                variant={selectedRating === rating ? 'default' : 'outline'}
                className={cn(
                  'rounded-xl aspect-square w-10 h-10 p-0',
                  selectedRating === rating
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-background! text-muted-foreground!',
                )}
              >
                {rating}
              </Button>
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

export default FilterSection
