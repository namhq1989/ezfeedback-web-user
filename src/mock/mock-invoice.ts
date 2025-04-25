import type { IInvoice } from '@/app/models/invoice'

export const mockInvoices: IInvoice[] = [
  {
    id: 'INV-2025-0001',
    date: '2025-04-01T00:00:00Z',
    amount: 29.99,
    status: 'paid',
    plan: 'growth',
  },
  {
    id: 'INV-2025-0002',
    date: '2025-03-01T00:00:00Z',
    amount: 29.99,
    status: 'paid',
    plan: 'growth',
  },
  {
    id: 'INV-2025-0003',
    date: '2025-02-01T00:00:00Z',
    amount: 29.99,
    status: 'paid',
    plan: 'growth',
  },
  {
    id: 'INV-2025-0004',
    date: '2025-01-01T00:00:00Z',
    amount: 19.99,
    status: 'paid',
    plan: 'free',
  },
]
