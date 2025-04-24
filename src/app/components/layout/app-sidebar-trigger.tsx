import { useSidebar } from '@/components/ui/sidebar'
import { PanelLeft } from 'lucide-react'

const AppSidebarTrigger = () => {
  const { toggleSidebar } = useSidebar()

  return (
    <PanelLeft
      size={24}
      className='stroke-muted-foreground cursor-pointer'
      onClick={toggleSidebar}
    />
  )
}

export default AppSidebarTrigger
