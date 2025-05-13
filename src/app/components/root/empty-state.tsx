import noDataSvg from '@/assets/images/no-data.svg'
import { cn } from '@/lib/utils'

interface IEmptyStateProps {
  text: string
  size?: 'sm' | 'md' | 'lg'
}

const EmptyState = ({ text, size = 'sm' }: IEmptyStateProps) => {
  // Determine image size based on the size prop
  const imageSize = {
    sm: 'w-24 h-24',
    md: 'w-32 h-32',
    lg: 'w-48 h-48',
  }

  // Determine text size based on the size prop
  const textSize = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  }

  return (
    <div className='flex flex-col items-center justify-center py-8 px-4 mt-16'>
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
