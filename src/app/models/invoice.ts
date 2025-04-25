export type PlanType = 'free' | 'growth' | 'pro'
export type InvoiceStatus = 'paid' | 'pending' | 'failed'

// Define invoice interface
export interface IInvoice {
  id: string
  date: string
  amount: number
  status: InvoiceStatus
  plan: PlanType
}
