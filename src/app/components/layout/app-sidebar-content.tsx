import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import {
  LayoutDashboard,
  Send,
  Settings,
  SquareLibrary,
  UserRound,
} from 'lucide-react'
import { Link, useLocation } from 'react-router'

const items = [
  {
    title: 'Dashboard',
    url: '/',
    icon: LayoutDashboard,
  },
  {
    title: 'Feedback',
    url: '/feedback',
    icon: Send,
  },
  {
    title: 'Category',
    url: '/category',
    icon: SquareLibrary,
  },
  {
    title: 'Member',
    url: '/member',
    icon: UserRound,
  },
  {
    title: 'Setting',
    url: '/setting',
    icon: Settings,
  },
]

const AppSidebarContent = () => {
  const location = useLocation()
  const { open } = useSidebar()

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu className='gap-2'>
            {items.map((item) => {
              const isActive =
                item.url === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(item.url)
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    className={`px-4 gap-4 ${!open ? 'items-center justify-center' : ''} [&>svg]:size-5 [&>svg]:stroke-2 hover:bg-muted ${isActive ? 'bg-muted [&>svg]:text-primary' : '[&>svg]:stroke-muted-foreground'}`}
                    size='lg'
                  >
                    <Link to={item.url}>
                      <item.icon />
                      {open && (
                        <span className={`${isActive ? 'text-primary' : ''}`}>
                          {item.title}
                        </span>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  )
}

export default AppSidebarContent
