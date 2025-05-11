import projectApi, {
  IGetProjectsRequest,
  IProjectStatus,
  IUpdateProjectRequest,
} from '@/app/api/project'
import {
  IProject,
  IProjectBrief,
  IProjectCollaborator,
} from '@/app/models/project'
import { create } from 'zustand/react'

export interface IProjectStore {
  projects: IProjectBrief[]
  selectedProject: IProject | null
  collaborators: IProjectCollaborator[]
  isLoadingProjects: boolean
  isLoadingProject: boolean
  isUpdatingProject: boolean
  isLoadingCollaborators: boolean
  error: string | null
  getProjects: () => Promise<IProjectBrief[]>
  getProjectById: (id: string) => Promise<IProject | null>
  getProjectCollaborators: () => Promise<IProjectCollaborator[]>
  setProjects: (projects: IProjectBrief[]) => void
  setSelectedProject: (project: IProject) => void
  updateProject: (data: IUpdateProjectRequest) => Promise<void>
  changeProjectStatus: (status: IProjectStatus['status']) => Promise<void>
}

const useProjectStore = create<IProjectStore>((set, get) => ({
  projects: [],
  selectedProject: null,
  collaborators: [],
  isLoadingProjects: false,
  isLoadingProject: false,
  isUpdatingProject: false,
  isLoadingCollaborators: false,
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

  updateProject: async (data: IUpdateProjectRequest) => {
    const { selectedProject } = get()
    if (!selectedProject) return

    try {
      set({ isUpdatingProject: true, error: null })
      await projectApi.updateProject(selectedProject.id, data)

      set({
        selectedProject: { ...selectedProject, ...data },
        isUpdatingProject: false,
      })
    } catch (error) {
      throw error
    } finally {
      set({ isUpdatingProject: false })
    }
  },

  changeProjectStatus: async (status: IProjectStatus['status']) => {
    const { selectedProject } = get()
    if (!selectedProject) return

    try {
      set({ isUpdatingProject: true, error: null })
      await projectApi.changeProjectStatus(selectedProject.id, { status })
      set({
        selectedProject: { ...selectedProject, status },
        isUpdatingProject: false,
      })
    } catch (error) {
      throw error
    } finally {
      set({ isUpdatingProject: false })
    }
  },

  getProjectCollaborators: async () => {
    const { selectedProject } = get()
    if (!selectedProject) return []

    try {
      set({ isLoadingCollaborators: true, error: null })
      const response = await projectApi.getProjectCollaborators(
        selectedProject.id,
      )
      const collaborators = response.collaborators || []
      set({ collaborators, isLoadingCollaborators: false })
      return collaborators
    } catch (error) {
      set({ error: (error as Error).message, isLoadingCollaborators: false })
      return []
    }
  },
}))

export default useProjectStore
