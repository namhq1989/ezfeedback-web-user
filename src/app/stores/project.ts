import projectApi, { IGetProjectsRequest } from '@/app/api/project'
import { IProject, IProjectBrief } from '@/app/models/project'
import { create } from 'zustand/react'

export interface IProjectStore {
  projects: IProjectBrief[]
  selectedProject: IProject | null
  isLoadingProjects: boolean
  isLoadingProject: boolean
  error: string | null
  getProjects: () => Promise<IProjectBrief[]>
  getProjectById: (id: string) => Promise<IProject | null>
  setProjects: (projects: IProjectBrief[]) => void
  setSelectedProject: (project: IProject) => void
  setError: (error: string | null) => void
  reset: () => void
}

const useProjectStore = create<IProjectStore>((set) => ({
  projects: [],
  selectedProject: null,
  isLoadingProjects: false,
  isLoadingProject: false,
  error: null,
  getProjects: async () => {
    try {
      set({ isLoadingProjects: true, error: null })
      const request: IGetProjectsRequest = {}

      const response = await projectApi.getProjects(request)
      const projects = response.projects || []
      // Update state with projects and loading status
      set({ projects, isLoadingProjects: false })

      // Load the first project details if there's no selected project yet
      if (projects.length > 0) {
        const state = useProjectStore.getState()
        if (!state.selectedProject) {
          state.getProjectById(projects[0].id)
        }
      }
      return projects
    } catch (error) {
      set({ error: (error as Error).message, isLoadingProjects: false })
      return []
    }
  },
  getProjectById: async (id: string) => {
    try {
      set({ isLoadingProject: true, error: null })

      const response = await projectApi.getProjectById(id)
      const project = response.project
      set({ selectedProject: project, isLoadingProject: false })
      return project
    } catch (error) {
      set({ error: (error as Error).message, isLoadingProject: false })
      return null
    }
  },
  setProjects: (projects: IProjectBrief[]) => {
    set({ projects })
  },
  setSelectedProject: (project: IProject) => {
    set({ selectedProject: project })
  },

  setError: (error: string | null) => {
    set({ error })
  },
  reset: () => {
    set({
      projects: [],
      selectedProject: null,
      isLoadingProjects: false,
      isLoadingProject: false,
      error: null,
    })
  },
}))

export default useProjectStore
