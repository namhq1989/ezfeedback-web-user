import { FeedbackState, FeedbackStateColors } from '@/app/models/feedback'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useTranslation } from '@/i18n'
import { cn } from '@/lib/utils'
import {
  Calendar,
  CheckCheck,
  ChevronDown,
  Inbox,
  PlayCircle,
  ScanSearch,
  Sparkles,
  XCircle,
} from 'lucide-react'
import { useState } from 'react'

// State Combobox Component
export interface IStateComboboxProps {
  state?: FeedbackState
  onStateChange: (state?: FeedbackState) => void
  className?: string
}

// Get the appropriate icon for each feedback state
export function getStateIcon(state?: FeedbackState) {
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

export const StateCombobox = ({
  state,
  onStateChange,
  className,
}: IStateComboboxProps) => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  const stateOptions = [
    {
      value: undefined,
      label: t('feedback:state.all'),
      icon: <Inbox className='w-4 h-4' />,
    },
    ...Object.values(FeedbackState).map((stateValue) => ({
      value: stateValue,
      label: t(`feedback:state.${stateValue}`),
      icon: getStateIcon(stateValue),
    })),
  ]

  const selectedOption =
    stateOptions.find((option) => option.value === state) || stateOptions[0]

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          className={cn(
            'flex items-center justify-between rounded-xl',
            className,
          )}
        >
          <div className='flex items-center gap-2'>
            {selectedOption.icon}
            <span>{selectedOption.label}</span>
          </div>
          <ChevronDown className='h-4 w-4 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='p-0 w-[200px]' align='start'>
        <Command>
          <CommandInput placeholder={t('feedback:filters.searchState')} />
          <CommandList>
            <CommandEmpty>{t('feedback:filters.noResults')}</CommandEmpty>
            <CommandGroup>
              {stateOptions.map((option) => (
                <CommandItem
                  key={option.value || 'all'}
                  value={option.value || 'all'}
                  onSelect={() => {
                    onStateChange(option.value)
                    setOpen(false)
                  }}
                  className='flex items-center gap-2'
                >
                  {option.icon}
                  <span>{option.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default StateCombobox
