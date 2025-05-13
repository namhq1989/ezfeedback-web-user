import noDataSvg from '@/assets/images/no-data.svg'
import { cn } from '@/lib/utils'

interface IEmptyStateProps {
  text: string
  size?: 'xs' | 'sm' | 'md' | 'lg'
}

const EmptyState = ({ text, size = 'sm' }: IEmptyStateProps) => {
  // Determine image size based on the size prop
  const imageSize = {
    xs: 'w-16 h-16',
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

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-8 px-4',
        size === 'xs' ? 'mt-4' : 'mt-16',
      )}
    >
      <img
        src={noDataSvg}
        alt='No data'
        className={cn('mb-8', imageSize[size])}
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
