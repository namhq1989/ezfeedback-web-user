import CategoryForm from '@/app/components/admin/category-form'
import EmptyCategoriesState from '@/app/components/admin/empty-categories-state'
import { IProjectCategory } from '@/app/models/project'
import useProjectStore from '@/app/stores/project'
import { Switch } from '@/components/ui/switch'
import { useTranslation } from '@/i18n'
import { Plus, SquarePen } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

const CategoriesSection = () => {
  const { t } = useTranslation()
  const {
    selectedProject,
    isLoadingCategories,
    createCategory,
    updateCategory,
    changeCategoryStatus,
  } = useProjectStore()
  const [isAddingCategory, setIsAddingCategory] = useState(false)
  const [editingCategory, setEditingCategory] =
    useState<IProjectCategory | null>(null)

  const categories = selectedProject?.categories || []

  const handleAddCategory = async (name: string) => {
    if (!selectedProject) return

    try {
      const result = await createCategory({ name })

      if (result) {
        setIsAddingCategory(false)
        toast.success(t('admin:categories.addSuccess'))
      } else {
        toast.error(t('admin:categories.addError'))
      }
    } catch (error) {
      toast.error(t('admin:categories.addError'))
      console.error('Failed to add category:', error)
      setIsAddingCategory(false)
    }
  }

  const handleUpdateCategory = async (categoryId: string, name: string) => {
    if (!selectedProject || !editingCategory) return

    try {
      const success = await updateCategory(categoryId, { name })

      if (success) {
        setEditingCategory(null)
        toast.success(t('admin:categories.updateSuccess'))
      } else {
        toast.error(t('admin:categories.updateError'))
        setEditingCategory(null)
      }
    } catch (error) {
      toast.error(t('admin:categories.updateError'))
      console.error('Failed to update category:', error)
      setEditingCategory(null)
    }
  }

  const handleToggleStatus = async (category: IProjectCategory) => {
    if (!selectedProject) return

    try {
      const newStatus = category.status === 'active' ? 'inactive' : 'active'
      const success = await changeCategoryStatus(category.id, newStatus)

      if (success) {
        toast.success(t('admin:categories.statusUpdateSuccess'))
      } else {
        toast.error(t('admin:categories.statusUpdateError'))
      }
    } catch (error) {
      toast.error(t('admin:categories.statusUpdateError'))
      console.error('Failed to update category status:', error)
    }
  }

  return (
    <>
      <div className='w-full border rounded-xl'>
        <div className='h-11 flex items-center justify-between px-4 sm:px-6 border-b'>
          <h3 className='font-bold text-xs uppercase'>
            {t('admin:categories.title')}
          </h3>
          <div
            onClick={() =>
              !isAddingCategory &&
              !editingCategory &&
              !isLoadingCategories &&
              setIsAddingCategory(true)
            }
            className={`flex items-center cursor-pointer text-xs ${isAddingCategory || !!editingCategory || isLoadingCategories ? 'opacity-50 cursor-not-allowed' : 'hover:text-primary'}`}
          >
            <Plus className='mr-1 h-4 w-4' />
            <span>{t('admin:categories.addCategory')}</span>
          </div>
        </div>
        <div className='px-4 sm:px-6 py-4'>
          {isAddingCategory && (
            <CategoryForm
              onSave={handleAddCategory}
              onCancel={() => setIsAddingCategory(false)}
              isLoading={isLoadingCategories}
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
                    isLoading={isLoadingCategories}
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
                          disabled={isLoadingCategories}
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
                        <div
                          className='flex items-center cursor-pointer text-xs hover:text-primary'
                          onClick={() => {
                            if (
                              !isLoadingCategories &&
                              !isAddingCategory &&
                              !editingCategory
                            ) {
                              setEditingCategory(category)
                            }
                          }}
                        >
                          <SquarePen className='h-4 w-4' />
                        </div>
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
