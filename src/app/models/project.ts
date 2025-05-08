export interface IProjectBrief {
  id: string
  title: string
  slug: string
  status: string
  stats: {
    totalFeedbacks: number
  }
}

export interface IProject extends Omit<IProjectBrief, 'title' | 'stats'> {
  name: string
  stats: {
    totalFeedback: number
  }
  // Additional fields for the detailed project will go here
}
