import { useSidebar } from '@/components/ui/sidebar'
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'

const AppSidebarTrigger = () => {
  const { toggleSidebar, open } = useSidebar()

  const Icon = open ? PanelLeftClose : PanelLeftOpen

  return (
    <Icon
      size={20}
      className='stroke-muted-foreground cursor-pointer'
      onClick={toggleSidebar}
    />
  )
}

export default AppSidebarTrigger
