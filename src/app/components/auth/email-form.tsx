import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { z } from 'zod'

interface EmailFormProps {
  onSubmit: (email: string) => void
}

const EmailForm = ({ onSubmit }: EmailFormProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const { t } = useTranslation('auth')

  // Create validation schema with translated messages
  const formSchema = z.object({
    email: z
      .string()
      .min(1, t('validation.emailRequired'))
      .email(t('validation.emailInvalid')),
  })

  type EmailFormValues = z.infer<typeof formSchema>

  const form = useForm<EmailFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  const handleSubmit = async (values: EmailFormValues) => {
    setIsLoading(true)

    try {
      // Here you would make the API call to send the verification code
      // For now, we'll simulate the API call with a timeout
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success(t('emailForm.codeSent'))
      onSubmit(values.email)
    } catch (error) {
      toast.error(t('emailForm.sendError'))
      console.error('Error sending verification code:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder={t('emailForm.emailPlaceholder')}
                  type='email'
                  autoComplete='email'
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='w-full' disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              {t('emailForm.sendingCode')}
            </>
          ) : (
            t('emailForm.sendCode')
          )}
        </Button>
      </form>
    </Form>
  )
}

export default EmailForm
