import {
  FeedbackList,
  FeedbackPagination,
  FilterSection,
} from '@/app/components/feedback'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useTranslation } from '@/i18n'
import { mockCategories } from '@/mock/mock-feedbacks'
import { ChevronDown, ChevronUp, Filter, Search } from 'lucide-react'
import { useEffect, useState } from 'react'

const FeedbackPage = () => {
  const { t } = useTranslation()
  const [isFilterVisible, setIsFilterVisible] = useState(false)
  const [activeFilters, setActiveFilters] = useState({
    searchQuery: '',
    selectedCategory: [] as string[],
    selectedState: [] as string[],
    selectedRating: null as number | null,
  })

  // Listen for filter changes
  useEffect(() => {
    const handleFilterChange = (event: CustomEvent) => {
      const { searchQuery, selectedCategory, selectedState, selectedRating } =
        event.detail
      setActiveFilters({
        searchQuery,
        selectedCategory,
        selectedState,
        selectedRating,
      })
    }

    document.addEventListener(
      'feedbackFilterChange',
      handleFilterChange as EventListener,
    )
    return () => {
      document.removeEventListener(
        'feedbackFilterChange',
        handleFilterChange as EventListener,
      )
    }
  }, [])

  const toggleFilter = () => {
    setIsFilterVisible(!isFilterVisible)
  }

  // Get category names from IDs
  const getCategoryNames = (categoryIds: string[]) => {
    return categoryIds.map((id) => {
      const category = mockCategories.find((c) => c.id === id)
      return category ? category.name : id
    })
  }

  return (
    <div className='container mx-auto py-6 px-4 md:py-8 md:px-6'>
      <div className='max-w-6xl mx-auto'>
        {/* Mobile filter toggle button - only visible on small screens */}
        <div className='md:hidden mb-4'>
          <Button
            onClick={toggleFilter}
            variant='outline'
            className='w-full rounded-xl flex items-center justify-between'
          >
            <span className='flex items-center gap-2'>
              <Filter size={16} />
              {t('feedback:filters.title')}
            </span>
            {isFilterVisible ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
          </Button>
        </div>

        {/* Responsive layout */}
        <div className='flex flex-col md:flex-row gap-6'>
          {/* Filter section - collapsible on mobile, always visible on desktop */}
          <div
            className={`${isFilterVisible ? 'block' : 'hidden'} md:block md:w-64`}
          >
            <FilterSection />
          </div>

          {/* Main content: Feedback list with pagination */}
          <div className='flex-1 space-y-4'>
            {/* Active filters display - mobile only */}
            {(activeFilters.searchQuery ||
              activeFilters.selectedCategory.length > 0 ||
              activeFilters.selectedState.length > 0 ||
              activeFilters.selectedRating !== null) && (
              <div className='md:hidden space-y-2 mb-3'>
                {/* Search query filter (commented out)
                {activeFilters.searchQuery && (
                  <div className='mb-2'>
                    <Badge
                      variant='secondary'
                      className='flex items-center gap-1 rounded-xl'
                    >
                      <Search size={12} />
                      <span className='truncate max-w-[150px]'>
                        {activeFilters.searchQuery}
                      </span>
                    </Badge>
                  </div>
                )}
                */}

                {/* Category filters */}
                {activeFilters.selectedCategory.length > 0 && (
                  <div className='flex flex-wrap gap-2 mb-2'>
                    {activeFilters.selectedCategory.map((categoryId) => (
                      <Badge
                        key={categoryId}
                        variant='secondary'
                        className='rounded-xl'
                      >
                        {getCategoryNames([categoryId])[0]}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* State filters */}
                {activeFilters.selectedState.length > 0 && (
                  <div className='flex flex-wrap gap-2 mb-2'>
                    {activeFilters.selectedState.map((state) => (
                      <Badge
                        key={state}
                        variant='secondary'
                        className='rounded-xl'
                      >
                        {t(`feedback:state.${state}`)}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Rating filter */}
                {activeFilters.selectedRating !== null && (
                  <div className='mb-2'>
                    <Badge variant='secondary' className='rounded-xl'>
                      {t('feedback:filters.rating')}:{' '}
                      {activeFilters.selectedRating}
                    </Badge>
                  </div>
                )}
              </div>
            )}

            <FeedbackList />
            <FeedbackPagination />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeedbackPage
