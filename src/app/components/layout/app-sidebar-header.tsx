import { Spinner } from '@/app/components/root'
import { getProjectDashboardRoute } from '@/app/router/route-constants'
import useProjectStore from '@/app/stores/project'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { Check, ChevronsUpDown, GalleryVerticalEnd, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

const TRANSITION_DURATION = 300
const SHOW_TEXT_DELAY = 150

const AppSidebarHeader = () => {
  const { open, isMobile } = useSidebar()
  const { projects, selectedProject, isLoadingProject, getProjectById } =
    useProjectStore()
  const navigate = useNavigate()

  const [showText, setShowText] = useState(open)
  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (open) {
      timeout = setTimeout(() => setShowText(true), SHOW_TEXT_DELAY)
    } else {
      setShowText(false)
    }
    return () => clearTimeout(timeout)
  }, [open])

  return (
    <SidebarHeader className='flex items-center mt-2'>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size='lg'
                className='flex gap-4 items-center justify-center'
              >
                {isLoadingProject ? (
                  <Spinner size='sm' />
                ) : (
                  <>
                    {open ? (
                      <>
                        <div className='flex aspect-square size-8 items-center justify-center rounded-xl bg-primary'>
                          <GalleryVerticalEnd className='size-4 text-primary-foreground' />
                        </div>
                        <div
                          className={`flex flex-col gap-1 leading-none transition-all duration-${TRANSITION_DURATION} overflow-hidden
                      ${open ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                          style={{ width: isMobile ? 170 : 150 }}
                        >
                          {showText && selectedProject && (
                            <>
                              <span className='font-semibold truncate overflow-hidden whitespace-nowrap'>
                                {selectedProject.title}
                              </span>
                              <span className='text-xs text-muted-foreground'>
                                {selectedProject.stats.totalFeedbacks.toLocaleString()}{' '}
                                feedback
                              </span>
                            </>
                          )}
                        </div>
                        <ChevronsUpDown className='ml-auto' />
                      </>
                    ) : (
                      <div className='flex aspect-square size-8 items-center justify-center rounded-xl bg-primary'>
                        <GalleryVerticalEnd className='size-4 text-primary-foreground' />
                      </div>
                    )}
                  </>
                )}
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              style={{ width: isMobile ? 270 : 240 }}
              side='bottom'
              align='start'
              className='flex flex-col gap-1 mt-2 bg-background'
            >
              {projects.map((project) => (
                <DropdownMenuItem
                  key={project.id}
                  onSelect={() => {
                    // If the selected project is already the current one, do nothing
                    if (selectedProject && project.id === selectedProject.id) {
                      return
                    }
                    // Fetch the full project details and update the store
                    getProjectById(project.id)
                    // Navigate to the project dashboard
                    navigate(getProjectDashboardRoute(project.id))
                  }}
                  className='p-0'
                >
                  <button
                    type='button'
                    className='flex w-full gap-4 items-center px-4 py-2 gap-2'
                  >
                    <div className='flex aspect-square size-8 items-center justify-center rounded-xl bg-primary'>
                      <GalleryVerticalEnd className='size-4 text-primary-foreground' />
                    </div>
                    <div className='flex flex-col gap-1 leading-none text-left'>
                      <span className='font-semibold'>{project.title}</span>
                      <span className='text-xs text-muted-foreground'>
                        {project.stats.totalFeedbacks.toLocaleString()} feedback
                      </span>
                    </div>
                    {selectedProject && project.id === selectedProject.id ? (
                      <Check className='ml-auto' />
                    ) : null}
                  </button>
                </DropdownMenuItem>
              ))}

              <Separator />
              <Button
                variant='ghost'
                size='lg'
                className='w-full flex items-center justify-start gap-2'
              >
                <div className='w-0' />
                <Plus size={16} />
                <span className='text-xs ml-1'>New Project</span>
              </Button>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  )
}

export default AppSidebarHeader
