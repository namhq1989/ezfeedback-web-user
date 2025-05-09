import '@/assets/stylesheets/spinner.css'
import { cn } from '@/lib/utils'

interface ISpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const Spinner = ({ size = 'md', className }: ISpinnerProps) => {
  const sizeMap = {
    sm: 16,
    md: 24,
    lg: 48,
  }

  const borderSize = {
    sm: 2,
    md: 3,
    lg: 4,
  }

  const width = sizeMap[size]
  const border = borderSize[size]

  return (
    <span
      className={cn('spinner', className)}
      style={
        {
          width: `${width}px`,
          height: `${width}px`,
          borderTop: `${border}px solid #FFF`,
          borderRight: `${border}px solid transparent`,
          '--border-size': `${border}px`,
        } as React.CSSProperties
      }
    />
  )
}

export default Spinner
