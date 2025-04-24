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
} from '@/components/ui/sidebar'
import {
  Bell,
  ChevronsUpDown,
  CreditCard,
  GalleryVerticalEnd,
  LogOut,
  Settings,
  Sparkles,
  User,
} from 'lucide-react'
import * as React from 'react'

const USER_EMAIL = 'user@example.com'
const USER_PLAN = 'Free'

export default function AppSidebarFooter() {
  const triggerRef = React.useRef<HTMLButtonElement | null>(null)
  const [dropdownWidth, setDropdownWidth] = React.useState<number | undefined>()
  const [dropdownOpen, setDropdownOpen] = React.useState(false)

  React.useEffect(() => {
    if (triggerRef.current) {
      setDropdownWidth(triggerRef.current.offsetWidth)
    }
  }, [triggerRef.current, dropdownOpen])

  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu onOpenChange={setDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                ref={triggerRef}
                size='lg'
                className='flex gap-2 items-center justify-center'
              >
                <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-primary'>
                  <GalleryVerticalEnd className='size-4 text-primary-foreground' />
                </div>
                <div className='flex flex-col gap-1 leading-none'>
                  <span className='font-semibold truncate max-w-[120px]'>
                    {USER_EMAIL}
                  </span>
                  <span className='text-xs text-muted-foreground'>
                    Plan: {USER_PLAN}
                  </span>
                </div>
                <ChevronsUpDown className='ml-auto' />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              style={dropdownWidth ? { width: dropdownWidth } : {}}
              side='top'
              align='start'
              className='flex flex-col gap-1 mt-2 bg-background'
            >
              {/* Group 1 */}
              <DropdownMenuItem className='gap-2'>
                <Sparkles className='size-4 text-primary' />
                <span>Upgrade to Pro</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {/* Group 2 */}
              <DropdownMenuItem className='gap-2'>
                <User className='size-4' />
                <span>Account</span>
              </DropdownMenuItem>
              <DropdownMenuItem className='gap-2'>
                <CreditCard className='size-4' />
                <span>Billing</span>
              </DropdownMenuItem>
              <DropdownMenuItem className='gap-2'>
                <Bell className='size-4' />
                <span>Notification</span>
              </DropdownMenuItem>
              <DropdownMenuItem className='gap-2'>
                <Settings className='size-4' />
                <span>Preference</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {/* Group 3 */}
              <DropdownMenuItem className='gap-2'>
                <LogOut className='size-4' />
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  )
}
