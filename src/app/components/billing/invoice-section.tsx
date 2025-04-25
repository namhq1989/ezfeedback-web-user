import type { InvoiceStatus, PlanType } from '@/app/models/invoice'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useTranslation } from '@/i18n'
import { formatDate } from '@/lib/date'
import { mockInvoices } from '@/mock/mock-invoice'
import { Download } from 'lucide-react'

const getStatusColor = (status: InvoiceStatus) => {
  switch (status) {
    case 'paid':
      return 'bg-green-300 text-black/70'
    case 'pending':
      return 'bg-yellow-300 text-black/70'
    case 'failed':
      return 'bg-red-300 text-black/70'
    default:
      return 'bg-gray-300 text-black/70'
  }
}

// Get plan badge color
const getPlanColor = (plan: PlanType) => {
  switch (plan) {
    case 'free':
      return 'bg-gray-100 text-gray-800'
    case 'growth':
      return 'bg-blue-100 text-blue-800'
    case 'pro':
      return 'bg-purple-100 text-purple-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const InvoiceSection = () => {
  const { t } = useTranslation()

  return (
    <div className='w-full border rounded-xl'>
      <div className='h-11 flex items-center px-6 border-b'>
        <h3 className='font-bold text-xs uppercase'>
          {t('billing.invoices.title')}
        </h3>
      </div>
      <div className='p-6'>
        <div className='flex flex-col space-y-4'>
          {/* Desktop view - Table */}
          <div className='hidden md:block'>
            <Table className='w-full table-fixed'>
              <TableHeader>
                <TableRow>
                  <TableHead className='w-[20%]'>
                    {t('billing.invoices.invoiceId')}
                  </TableHead>
                  <TableHead className='w-[20%]'>
                    {t('billing.invoices.date')}
                  </TableHead>
                  <TableHead className='w-[15%] '>
                    {t('billing.invoices.plan')}
                  </TableHead>
                  <TableHead className='w-[15%]'>
                    {t('billing.invoices.amount')}
                  </TableHead>
                  <TableHead className='w-[15%]'>
                    {t('billing.invoices.status')}
                  </TableHead>
                  <TableHead className='w-[15%]'></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className='font-medium'>{invoice.id}</TableCell>
                    <TableCell>{formatDate(new Date(invoice.date))}</TableCell>
                    <TableCell>
                      <Badge
                        className={`${getPlanColor(invoice.plan)} border-0`}
                      >
                        {t(`billing.subscription.plans.${invoice.plan}`)}
                      </Badge>
                    </TableCell>
                    <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge
                        className={`${getStatusColor(invoice.status)} border-0`}
                      >
                        {t(`billing.invoices.statuses.${invoice.status}`)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant='ghost' size='sm' className='text-xs'>
                        <Download className='mr-1' />
                        {t('billing.invoices.download')}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile view - List with separators */}
          <div className='md:hidden flex flex-col gap-4'>
            {mockInvoices.map((invoice) => (
              <div key={invoice.id}>
                <div className='py-4 space-y-6'>
                  <div className='flex justify-between items-center'>
                    <span className='font-medium'>{invoice.id}</span>
                    <Badge
                      className={`${getStatusColor(invoice.status)} border-0`}
                    >
                      {t(`billing.invoices.statuses.${invoice.status}`)}
                    </Badge>
                  </div>

                  <div className='grid grid-cols-3 gap-2 text-sm'>
                    <div>
                      <div className='text-muted-foreground'>
                        {t('billing.invoices.date')}
                      </div>
                      <div>{formatDate(new Date(invoice.date))}</div>
                    </div>
                    <div>
                      <div className='text-muted-foreground'>
                        {t('billing.invoices.amount')}
                      </div>
                      <div>${invoice.amount.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className='text-muted-foreground'>
                        {t('billing.invoices.plan')}
                      </div>
                      <Badge
                        className={`${getPlanColor(invoice.plan)} border-0 mt-1`}
                      >
                        {t(`billing.subscription.plans.${invoice.plan}`)}
                      </Badge>
                    </div>
                  </div>

                  <Button
                    variant='outline'
                    size='sm'
                    className='text-xs w-full'
                  >
                    <Download className='mr-1' />
                    {t('billing.invoices.download')}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default InvoiceSection
