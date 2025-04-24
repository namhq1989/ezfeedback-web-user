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
import { projects } from '@/mock/projects'
import { Check, ChevronsUpDown, GalleryVerticalEnd, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'

const TRANSITION_DURATION = 300
const SHOW_TEXT_DELAY = 150

const AppSidebarHeader = ({
  versions,
  defaultVersion,
}: {
  versions: string[]
  defaultVersion: string
}) => {
  const { open, isMobile } = useSidebar()
  // Use the slug as "version" for compatibility with the prop API
  const [selectedVersion, setSelectedVersion] = useState(
    defaultVersion || projects[0]?.slug,
  )

  const selectedProject =
    projects.find((p) => p.slug === selectedVersion) || projects[0]

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
                {open ? (
                  <>
                    <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-primary'>
                      <GalleryVerticalEnd className='size-4 text-primary-foreground' />
                    </div>
                    <div
                      className={`flex flex-col gap-1 leading-none transition-all duration-${TRANSITION_DURATION} overflow-hidden
                      ${open ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                      style={{ width: isMobile ? 170 : 150 }}
                    >
                      {showText && (
                        <>
                          <span className='font-semibold truncate overflow-hidden whitespace-nowrap'>
                            {selectedProject.name}
                          </span>
                          <span className='text-xs text-muted-foreground'>
                            {selectedProject.stats.totalFeedback.toLocaleString()}{' '}
                            feedback
                          </span>
                        </>
                      )}
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
              side='bottom'
              align='start'
              className='flex flex-col gap-1 mt-2 bg-background'
            >
              {projects.map((project) => (
                <DropdownMenuItem
                  key={project.slug}
                  onSelect={() => setSelectedVersion(project.slug)}
                  className='p-0'
                >
                  <button
                    type='button'
                    className='flex w-full gap-4 items-center px-4 py-2 gap-2'
                  >
                    <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-primary'>
                      <GalleryVerticalEnd className='size-4 text-primary-foreground' />
                    </div>
                    <div className='flex flex-col gap-1 leading-none text-left'>
                      <span className='font-semibold'>{project.name}</span>
                      <span className='text-xs text-muted-foreground'>
                        {project.stats.totalFeedback.toLocaleString()} feedback
                      </span>
                    </div>
                    {project.slug === selectedVersion ? (
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
