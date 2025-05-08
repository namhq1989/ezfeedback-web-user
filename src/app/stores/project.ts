import projectApi, { IGetProjectsRequest } from '@/app/api/project'
import { IProjectBrief } from '@/app/models/project'
import { create } from 'zustand/react'

export interface IProjectStore {
  projects: IProjectBrief[]
  selectedProjectId: string | null
  isLoading: boolean
  error: string | null
  getProjects: () => Promise<IProjectBrief[]>
  setProjects: (projects: IProjectBrief[]) => void
  setSelectedProjectId: (id: string) => void
  setIsLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
  reset: () => void
}

const useProjectStore = create<IProjectStore>((set) => ({
  projects: [],
  selectedProjectId: null,
  isLoading: false,
  error: null,
  getProjects: async () => {
    try {
      set({ isLoading: true, error: null })
      const request: IGetProjectsRequest = {}
      const response = await projectApi.getProjects(request)
      const projects = response.projects || []
      // Update state with projects and loading status
      set({ projects, isLoading: false })
      
      // Set the first project as selected if there's no selected project yet
      set((state) => ({
        selectedProjectId: state.selectedProjectId || (projects.length > 0 ? projects[0].id : null)
      }))
      return projects
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false })
      return []
    }
  },
  setProjects: (projects: IProjectBrief[]) => {
    set({ projects })
  },
  setSelectedProjectId: (id: string) => {
    set({ selectedProjectId: id })
  },
  setIsLoading: (isLoading: boolean) => {
    set({ isLoading })
  },
  setError: (error: string | null) => {
    set({ error })
  },
  reset: () => {
    set({ projects: [], selectedProjectId: null, isLoading: false, error: null })
  }
}))

export default useProjectStore
