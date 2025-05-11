import projectApi, {
  ICreateProjectCategoryRequest,
  IGetProjectsRequest,
  IProjectCategoryStatus,
  IProjectStatus,
  IUpdateProjectCategoryRequest,
  IUpdateProjectRequest,
} from '@/app/api/project'
import {
  IProject,
  IProjectBrief,
  IProjectCategory,
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
  isLoadingCategories: boolean
  isLoadingCollaborators: boolean
  error: string | null
  getProjects: () => Promise<IProjectBrief[]>
  getProjectById: (id: string) => Promise<IProject | null>
  getProjectCollaborators: () => Promise<IProjectCollaborator[]>
  setProjects: (projects: IProjectBrief[]) => void
  setSelectedProject: (project: IProject) => void
  updateProject: (data: IUpdateProjectRequest) => Promise<void>
  changeProjectStatus: (status: IProjectStatus['status']) => Promise<void>
  createCategory: (
    data: ICreateProjectCategoryRequest,
  ) => Promise<IProjectCategory | null>
  updateCategory: (
    categoryId: string,
    data: IUpdateProjectCategoryRequest,
  ) => Promise<boolean>
  changeCategoryStatus: (
    categoryId: string,
    status: IProjectCategoryStatus['status'],
  ) => Promise<boolean>
}

const useProjectStore = create<IProjectStore>((set, get) => ({
  projects: [],
  selectedProject: null,
  collaborators: [],
  isLoadingProjects: false,
  isLoadingProject: false,
  isUpdatingProject: false,
  isLoadingCategories: false,
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

  createCategory: async (data: ICreateProjectCategoryRequest) => {
    const { selectedProject } = get()
    if (!selectedProject) return null

    try {
      set({ isLoadingCategories: true, error: null })

      // Make API call to create category
      const response = await projectApi.createProjectCategory(
        selectedProject.id,
        data,
      )

      // Create a new category object with the returned ID
      const newCategory: IProjectCategory = {
        id: response.id,
        name: data.name,
        slug: data.name.toLowerCase().replace(/\s+/g, '-'),
        status: 'active',
      }

      // Update the categories in the selected project
      const updatedCategories = [
        ...(selectedProject.categories || []),
        newCategory,
      ]

      // Create a new reference for the selected project to trigger UI updates
      const updatedProject = {
        ...selectedProject,
        categories: updatedCategories,
      }

      // Update the store
      set({
        selectedProject: updatedProject,
        isLoadingCategories: false,
      })

      return newCategory
    } catch (error) {
      set({ error: (error as Error).message, isLoadingCategories: false })
      return null
    }
  },

  updateCategory: async (
    categoryId: string,
    data: IUpdateProjectCategoryRequest,
  ) => {
    const { selectedProject } = get()
    if (!selectedProject) return false

    try {
      set({ isLoadingCategories: true, error: null })

      // Make API call to update category
      await projectApi.updateProjectCategory(
        selectedProject.id,
        categoryId,
        data,
      )

      // Find and update the category in the local state
      const updatedCategories = [...selectedProject.categories]
      const categoryIndex = updatedCategories.findIndex(
        (cat) => cat.id === categoryId,
      )

      if (categoryIndex !== -1) {
        updatedCategories[categoryIndex] = {
          ...updatedCategories[categoryIndex],
          name: data.name,
        }

        // Create a new reference for the selected project
        const updatedProject = {
          ...selectedProject,
          categories: updatedCategories,
        }

        // Update the store
        set({
          selectedProject: updatedProject,
          isLoadingCategories: false,
        })

        return true
      }

      set({ isLoadingCategories: false })
      return false
    } catch (error) {
      set({ error: (error as Error).message, isLoadingCategories: false })
      return false
    }
  },

  changeCategoryStatus: async (
    categoryId: string,
    status: IProjectCategoryStatus['status'],
  ) => {
    const { selectedProject } = get()
    if (!selectedProject) return false

    try {
      set({ isLoadingCategories: true, error: null })

      // Make API call to change category status
      await projectApi.changeProjectCategoryStatus(
        selectedProject.id,
        categoryId,
        { status },
      )

      // Find and update the category in the local state
      const updatedCategories = [...selectedProject.categories]
      const categoryIndex = updatedCategories.findIndex(
        (cat) => cat.id === categoryId,
      )

      if (categoryIndex !== -1) {
        updatedCategories[categoryIndex] = {
          ...updatedCategories[categoryIndex],
          status,
        }

        // Create a new reference for the selected project
        const updatedProject = {
          ...selectedProject,
          categories: updatedCategories,
        }

        // Update the store
        set({
          selectedProject: updatedProject,
          isLoadingCategories: false,
        })

        return true
      }

      set({ isLoadingCategories: false })
      return false
    } catch (error) {
      set({ error: (error as Error).message, isLoadingCategories: false })
      return false
    }
  },
}))

export default useProjectStore
