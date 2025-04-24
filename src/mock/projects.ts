import { IProject } from '@/app/models/project'

export const projects: IProject[] = [
  {
    id: '1',
    name: 'Project A',
    slug: 'project-a',
    stats: { totalFeedback: 42 },
  },
  {
    id: '2',
    name: 'Project B',
    slug: 'project-b',
    stats: { totalFeedback: 17 },
  },
  {
    id: '3',
    name: 'Project C',
    slug: 'project-c',
    stats: { totalFeedback: 5 },
  },
]
