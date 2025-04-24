import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import {
  Bell,
  ChevronsUpDown,
  CreditCard,
  GalleryVerticalEnd,
  LifeBuoy,
  LogOut,
  Settings,
  Sparkles,
} from 'lucide-react'

const USER_EMAIL = 'namhq.1989@gmail.com'
const USER_PLAN = 'Free'

const AppSidebarFooter = () => {
  const { open, isMobile } = useSidebar()

  // Define the dropdown items as an array, with support for separators and groups
  type DropdownItemType =
    | {
        type: 'item'
        label: string
        icon: React.ComponentType<{ className?: string }>
        iconClass?: string
      }
    | { type: 'separator' }

  const dropdownItems: DropdownItemType[] = [
    {
      type: 'item',
      label: 'Upgrade to Pro',
      icon: Sparkles,
      iconClass: 'size-4 text-primary',
    },
    { type: 'separator' },
    {
      type: 'item',
      label: 'Preference',
      icon: Settings,
      iconClass: 'size-4',
    },
    {
      type: 'item',
      label: 'Billing',
      icon: CreditCard,
      iconClass: 'size-4',
    },
    {
      type: 'item',
      label: 'Notification',
      icon: Bell,
      iconClass: 'size-4',
    },
    {
      type: 'item',
      label: 'Support',
      icon: LifeBuoy,
      iconClass: 'size-4',
    },
    { type: 'separator' },
    {
      type: 'item',
      label: 'Sign out',
      icon: LogOut,
      iconClass: 'size-4',
    },
  ]

  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size='lg'
                className='flex gap-2 items-center justify-center'
              >
                {open ? (
                  <>
                    <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-primary'>
                      <GalleryVerticalEnd className='size-4 text-primary-foreground' />
                    </div>
                    <div className='flex flex-col gap-1 leading-none'>
                      <span
                        className='text-sm font-semibold truncate overflow-hidden whitespace-nowrap'
                        style={{ width: isMobile ? 170 : 150 }}
                      >
                        {USER_EMAIL}
                      </span>
                      <span className='text-xs text-muted-foreground'>
                        Plan: {USER_PLAN}
                      </span>
                    </div>
                    <ChevronsUpDown className='ml-auto' />
                  </>
                ) : (
                  <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-primary'>
                    <GalleryVerticalEnd className='size-4 text-primary-foreground' />
                  </div>
                )}
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              style={{ width: isMobile ? 270 : 240 }}
              side='top'
              align='start'
              className='flex flex-col gap-1 mt-2 bg-background'
            >
              {dropdownItems.map((item, idx) => {
                if (item.type === 'separator') {
                  return <DropdownMenuSeparator key={`sep-${idx}`} />
                }
                const Icon = item.icon
                return (
                  <DropdownMenuItem
                    className='gap-2 cursor-pointer'
                    key={item.label}
                  >
                    <Icon className={item.iconClass} />
                    <span>{item.label}</span>
                  </DropdownMenuItem>
                )
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  )
}

export default AppSidebarFooter
