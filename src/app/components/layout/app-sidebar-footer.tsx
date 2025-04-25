import { sidebarFooterMenuItems } from '@/app/router/user-menu-items'
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
import { ChevronsUpDown, GalleryVerticalEnd } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

const USER_EMAIL = 'namhq.1989@gmail.com'
const USER_PLAN = 'Free'

const AppSidebarFooter = () => {
  const { t } = useTranslation()
  const { open, isMobile } = useSidebar()

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
                    <div className='flex aspect-square size-8 items-center justify-center rounded-xl bg-primary'>
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
                  <div className='flex aspect-square size-8 items-center justify-center rounded-xl bg-primary'>
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
              {sidebarFooterMenuItems.map((item, idx) => {
                if (item.type === 'separator') {
                  return <DropdownMenuSeparator key={`sep-${idx}`} />
                }
                return (
                  <Link key={item.label} to={item.path}>
                    <DropdownMenuItem className='items-center gap-2 cursor-pointer'>
                      <item.icon className={item.iconClass} />
                      <span>{t(item.label)}</span>
                    </DropdownMenuItem>
                  </Link>
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
