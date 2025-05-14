import noDataSvg from '@/assets/images/no-data.svg'
import { cn } from '@/lib/utils'

interface IEmptyStateProps {
  text: string
  size?: 'xs' | 'sm' | 'md' | 'lg'
}

const EmptyState = ({ text, size = 'sm' }: IEmptyStateProps) => {
  // Determine image size based on the size prop
  const imageSize = {
    xs: 'w-12 h-12',
    sm: 'w-24 h-24',
    md: 'w-32 h-32',
    lg: 'w-48 h-48',
  }

  // Determine text size based on the size prop
  const textSize = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  }

  const mtValue = {
    xs: 'mt-8',
    sm: 'mt-8',
    md: 'mt-16',
    lg: 'mt-16',
  }

  const mbValue = {
    xs: 'mb-4',
    sm: 'mb-8',
    md: 'mb-12',
    lg: 'mb-16',
  }

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-8 px-4',
        mtValue[size],
      )}
    >
      <img
        src={noDataSvg}
        alt='No data'
        className={cn(mbValue[size], imageSize[size])}
      />
      <p
        className={cn(
          'text-center text-sm text-muted-foreground',
          textSize[size],
        )}
      >
        {text}
      </p>
    </div>
  )
}

export default EmptyState
