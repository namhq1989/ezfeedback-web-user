import { IReply } from '@/app/models/reply'

export const mockReplies: IReply[] = [
  {
    id: 'r1',
    feedbackId: '1',
    userId: 'user2',
    content: 'Thanks for your feedback!',
    createdAt: '2025-04-21T09:00:00Z',
    updatedAt: '2025-04-21T09:00:00Z',
  },
  {
    id: 'r2',
    feedbackId: '1',
    userId: 'user3',
    content: 'We are working on this.',
    createdAt: '2025-04-21T10:00:00Z',
    updatedAt: '2025-04-21T10:00:00Z',
  },
  {
    id: 'r3',
    feedbackId: '2',
    userId: 'user1',
    content: 'Dark mode is on the roadmap.',
    createdAt: '2025-04-20T15:00:00Z',
    updatedAt: '2025-04-20T15:00:00Z',
  },
  {
    id: 'r4',
    feedbackId: '3',
    userId: 'user5',
    content: 'We are fixing this bug.',
    createdAt: '2025-04-22T12:00:00Z',
    updatedAt: '2025-04-22T12:00:00Z',
  },
]
