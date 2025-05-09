import projectApi from '@/app/api/project'
import CategoryForm from '@/app/components/admin/category-form'
import EmptyCategoriesState from '@/app/components/admin/empty-categories-state'
import { IProjectCategory } from '@/app/models/project'
import useProjectStore from '@/app/stores/project'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { useTranslation } from '@/i18n'
import { Plus, SquarePen } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

const CategoriesSection = () => {
  const { t } = useTranslation()
  const { selectedProject, setSelectedProject } = useProjectStore()
  const [isAddingCategory, setIsAddingCategory] = useState(false)
  const [editingCategory, setEditingCategory] =
    useState<IProjectCategory | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const categories = selectedProject?.categories || []

  const handleAddCategory = async (name: string) => {
    if (!selectedProject) return

    try {
      setIsLoading(true)

      const response = await projectApi.createProjectCategory(
        selectedProject.id,
        { name },
      )

      // Force a re-render by creating a completely new project object
      if (selectedProject && response.category) {
        // Create a new array with all categories plus the new one
        const updatedCategories = [
          ...(selectedProject.categories || []),
          response.category,
        ]

        // Create a completely new project object
        const updatedProject = JSON.parse(
          JSON.stringify({
            ...selectedProject,
            categories: updatedCategories,
          }),
        )

        // Update the project in the store
        setSelectedProject(updatedProject)
      }

      setIsAddingCategory(false)
      toast.success(t('admin:categories.addSuccess'))
    } catch (error) {
      toast.error(t('admin:categories.addError'))
      console.error('Failed to add category:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateCategory = async (categoryId: string, name: string) => {
    if (!selectedProject || !editingCategory) return

    try {
      setIsLoading(true)

      // Make the API call to update the name
      await projectApi.updateProjectCategory(selectedProject.id, categoryId, {
        name,
      })

      // Create a new array with all categories
      const updatedCategories = [...selectedProject.categories]

      // Find the category to update
      const categoryIndex = updatedCategories.findIndex(
        (cat) => cat.id === categoryId,
      )

      // Update the category with the new name
      if (categoryIndex !== -1) {
        // Create a new category object with the updated name
        updatedCategories[categoryIndex] = {
          ...updatedCategories[categoryIndex],
          name,
        }
      }

      // Create a completely new project object
      const updatedProject = JSON.parse(
        JSON.stringify({
          ...selectedProject,
          categories: updatedCategories,
        }),
      )

      // Update the project in the store
      setSelectedProject(updatedProject)

      setEditingCategory(null)
      toast.success(t('admin:categories.updateSuccess'))
    } catch (error) {
      toast.error(t('admin:categories.updateError'))
    } finally {
      setIsLoading(false)
    }
  }

  const handleToggleStatus = async (category: IProjectCategory) => {
    if (!selectedProject) return

    try {
      setIsLoading(true)
      const newStatus = category.status === 'active' ? 'inactive' : 'active'

      // Make the API call to update the status
      await projectApi.changeProjectCategoryStatus(
        selectedProject.id,
        category.id,
        { status: newStatus },
      )

      // Create a new array with all categories
      const updatedCategories = [...selectedProject.categories]

      // Find the category to update
      const categoryIndex = updatedCategories.findIndex(
        (cat) => cat.id === category.id,
      )

      // Update the category with the new status
      if (categoryIndex !== -1) {
        // Create a new category object with the updated status
        updatedCategories[categoryIndex] = {
          ...updatedCategories[categoryIndex],
          status: newStatus,
        }
      }

      // Create a completely new project object
      const updatedProject = JSON.parse(
        JSON.stringify({
          ...selectedProject,
          categories: updatedCategories,
        }),
      )

      // Update the project in the store
      setSelectedProject(updatedProject)

      toast.success(t('admin:categories.statusUpdateSuccess'))
    } catch (error) {
      toast.error(t('admin:categories.statusUpdateError'))
      console.error('Failed to update category status:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className='w-full border rounded-xl'>
        <div className='h-11 flex items-center justify-between px-6 border-b'>
          <h3 className='font-bold text-xs uppercase'>
            {t('admin:categories.title')}
          </h3>
          <div
            onClick={() =>
              !isAddingCategory &&
              !editingCategory &&
              !isLoading &&
              setIsAddingCategory(true)
            }
            className={`flex items-center cursor-pointer text-xs ${isAddingCategory || !!editingCategory || isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:text-primary'}`}
          >
            <Plus className='mr-1 h-4 w-4' />
            <span>{t('admin:categories.addCategory')}</span>
          </div>
        </div>
        <div className='px-6 py-4'>
          {isAddingCategory && (
            <CategoryForm
              onSave={handleAddCategory}
              onCancel={() => setIsAddingCategory(false)}
              isLoading={isLoading}
            />
          )}

          {categories.length === 0 && !isAddingCategory ? (
            <EmptyCategoriesState
              onAddCategory={() => setIsAddingCategory(true)}
            />
          ) : (
            <div>
              {categories.map((category: IProjectCategory) =>
                editingCategory?.id === category.id ? (
                  <CategoryForm
                    key={category.id}
                    initialValue={category.name}
                    onSave={(name: string) =>
                      handleUpdateCategory(category.id, name)
                    }
                    onCancel={() => setEditingCategory(null)}
                    isLoading={isLoading}
                  />
                ) : (
                  <div
                    key={category.id}
                    className='flex flex-col sm:flex-row items-center py-4 border-b last:border-0'
                  >
                    <div className='w-full sm:w-1/2 mb-2 sm:mb-0'>
                      <span
                        className='text-sm'
                        data-testid={`category-${category.id}`}
                      >
                        {category.name}
                      </span>
                    </div>
                    <div className='w-full sm:w-1/2 flex items-center'>
                      <div className='w-[30%] flex items-center space-x-2'>
                        <Switch
                          checked={category.status === 'active'}
                          onCheckedChange={() => handleToggleStatus(category)}
                          aria-label={t('admin:categories.toggleStatus')}
                          disabled={isLoading}
                        />
                        <span
                          key={`status-${category.id}-${category.status}`}
                          className='text-xs text-muted-foreground'
                        >
                          {category.status === 'active'
                            ? t('admin:categories.active')
                            : t('admin:categories.inactive')}
                        </span>
                      </div>
                      <div className='w-[70%] flex items-center justify-end space-x-2'>
                        <Button
                          variant='ghost'
                          size='icon'
                          onClick={() => setEditingCategory(category)}
                          disabled={
                            !!editingCategory || isAddingCategory || isLoading
                          }
                        >
                          <SquarePen className='h-4 w-4' />
                        </Button>
                      </div>
                    </div>
                  </div>
                ),
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default CategoriesSection
