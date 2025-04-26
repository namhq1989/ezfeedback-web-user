import CategoryForm from '@/app/components/admin/category-form'
import EmptyCategoriesState from '@/app/components/admin/empty-categories-state'
import { ICategory } from '@/app/models/admin'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { useTranslation } from '@/i18n'
import { Plus, SquarePen, Trash2 } from 'lucide-react'
import { useState } from 'react'

interface ICategoriesSectionProps {
  initialCategories: ICategory[]
}

const CategoriesSection = ({ initialCategories }: ICategoriesSectionProps) => {
  const { t } = useTranslation()
  const [categories, setCategories] = useState<ICategory[]>(initialCategories)
  const [isAddingCategory, setIsAddingCategory] = useState(false)
  const [editingCategory, setEditingCategory] = useState<ICategory | null>(null)

  const handleAddCategory = (name: string) => {
    const newCategory = {
      id: `category-${Date.now()}`,
      name,
      isActive: true,
    }
    setCategories([...categories, newCategory])
    setIsAddingCategory(false)
  }

  const handleUpdateCategory = (_id: string, name: string) => {
    if (editingCategory) {
      const updatedCategory = { ...editingCategory, name }
      setCategories(
        categories.map((cat) =>
          cat.id === updatedCategory.id ? updatedCategory : cat,
        ),
      )
      setEditingCategory(null)
    }
  }

  const handleToggleStatus = (category: ICategory) => {
    const isActive = !category.isActive
    setCategories(
      categories.map((cat) =>
        cat.id === category.id ? { ...cat, isActive } : cat,
      ),
    )
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
              !isAddingCategory && !editingCategory && setIsAddingCategory(true)
            }
            className={`flex items-center cursor-pointer text-xs ${isAddingCategory || !!editingCategory ? 'opacity-50 cursor-not-allowed' : 'hover:text-primary'}`}
          >
            <Plus className='mr-1 h-4 w-4' />
            <span>{t('admin:categories.addCategory')}</span>
          </div>
        </div>
        <div className='p-6'>
          {isAddingCategory && (
            <CategoryForm
              onSave={handleAddCategory}
              onCancel={() => setIsAddingCategory(false)}
            />
          )}

          {categories.length === 0 && !isAddingCategory ? (
            <EmptyCategoriesState
              onAddCategory={() => setIsAddingCategory(true)}
            />
          ) : (
            <div className='space-y-4'>
              {categories.map((category: ICategory) =>
                editingCategory?.id === category.id ? (
                  <CategoryForm
                    key={category.id}
                    initialValue={category.name}
                    onSave={(name: string) =>
                      handleUpdateCategory(category.id, name)
                    }
                    onCancel={() => setEditingCategory(null)}
                  />
                ) : (
                  <div
                    key={category.id}
                    className='flex flex-col sm:flex-row items-start py-3 border-b last:border-0'
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
                          checked={category.isActive}
                          onCheckedChange={() => handleToggleStatus(category)}
                          aria-label={t('admin.categories.toggleStatus')}
                        />
                        <span
                          key={`status-${category.id}-${category.isActive}`}
                          className='text-xs text-muted-foreground'
                        >
                          {category.isActive
                            ? t('admin:categories.active')
                            : t('admin:categories.inactive')}
                        </span>
                      </div>
                      <div className='w-[70%] flex items-center justify-end space-x-2'>
                        <Button
                          variant='ghost'
                          size='icon'
                          onClick={() => setEditingCategory(category)}
                          disabled={!!editingCategory || isAddingCategory}
                        >
                          <SquarePen className='h-4 w-4' />
                        </Button>
                        <DeleteConfirmationDialog
                          category={category}
                          onDelete={() => {
                            setCategories(
                              categories.filter(
                                (cat) => cat.id !== category.id,
                              ),
                            )
                          }}
                        />
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

interface IDeleteConfirmationDialogProps {
  category: ICategory
  onDelete: () => void
}

const DeleteConfirmationDialog = ({
  category,
  onDelete,
}: IDeleteConfirmationDialogProps) => {
  const { t } = useTranslation()
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant='ghost' size='icon'>
          <Trash2 className='h-4 w-4 text-destructive' />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {t('admin:categories.deleteConfirmTitle')}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {t('admin:categories.deleteConfirmDescription', {
              name: category.name,
            })}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t('admin:common.cancel')}</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete}>
            {t('admin:categories.delete')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default CategoriesSection
