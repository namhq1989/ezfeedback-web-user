import { CampaignType, FeedbackState, IFeedback } from '@/app/models/feedback'

export const mockCategories = [
  { id: '1', name: 'Performance' },
  { id: '2', name: 'UI/UX' },
  { id: '3', name: 'Bug' },
  { id: '4', name: 'Feature Request' },
  { id: '5', name: 'General' },
  { id: '6', name: 'Security' },
]

export const mockFeedbacks: IFeedback[] = [
  {
    id: '1',
    campaign: {
      id: 'campaign1',
      name: 'Feedback',
    },
    category: {
      id: '1',
      name: 'Performance',
    },
    appUserId: 'user1',
    email: 'user1@example.com',
    content: 'The dashboard takes too long to load. Please optimize it.',
    rating: 3,
    isAnonymous: false,
    state: FeedbackState.New,
    campaignType: CampaignType.Feedback,
    ip: '192.168.1.1',
    countryCode: 'us',
    stats: {
      totalReplies: 0,
    },
    createdAt: '2025-04-20T10:30:00Z',
  },
  {
    id: '2',
    campaign: {
      id: 'campaign1',
      name: 'Feedback',
    },
    category: {
      id: '2',
      name: 'UI/UX',
    },
    appUserId: 'user2',
    email: 'user2@example.com',
    content:
      'It would be great to have a dark mode option for better visibility at night.',
    rating: 4,
    isAnonymous: false,
    state: FeedbackState.InProgress,
    campaignType: CampaignType.Feedback,
    ip: '192.168.1.2',
    countryCode: 'us',
    stats: {
      totalReplies: 2,
    },
    createdAt: '2025-04-19T14:15:00Z',
  },
  {
    id: '3',
    campaign: {
      id: 'campaign1',
      name: 'Feedback',
    },
    category: {
      id: '3',
      name: 'Bug',
    },
    appUserId: 'user3',
    email: 'user3@example.com',
    content: 'The login button is not working properly on mobile devices.',
    rating: 2,
    isAnonymous: false,
    state: FeedbackState.Completed,
    campaignType: CampaignType.Feedback,
    ip: '192.168.1.3',
    countryCode: 'uk',
    stats: {
      totalReplies: 1,
    },
    createdAt: '2025-04-18T08:20:00Z',
  },
  {
    id: '4',
    campaign: {
      id: 'campaign1',
      name: 'Feedback',
    },
    category: {
      id: '4',
      name: 'Feature Request',
    },
    appUserId: 'user4',
    email: 'user4@example.com',
    content: 'Would like to be able to export reports to PDF format.',
    rating: 5,
    isAnonymous: false,
    state: FeedbackState.New,
    campaignType: CampaignType.Feedback,
    ip: '192.168.1.4',
    countryCode: 'ca',
    stats: {
      totalReplies: 0,
    },
    createdAt: '2025-04-17T16:40:00Z',
  },
  {
    id: '5',
    campaign: {
      id: 'campaign1',
      name: 'Feedback',
    },
    category: {
      id: '5',
      name: 'General',
    },
    appUserId: 'user5',
    email: 'user5@example.com',
    content:
      'I have been using this platform for a while now and I must say, the recent updates have made a significant improvement in my workflow. However, I did encounter a few bugs when trying to upload larger files.',
    rating: 3,
    isAnonymous: false,
    state: FeedbackState.InReview,
    campaignType: CampaignType.Feedback,
    ip: '192.168.1.5',
    countryCode: 'au',
    stats: {
      totalReplies: 3,
    },
    createdAt: '2025-04-15T09:00:00Z',
  },
  // CSAT Feedback Examples
  {
    id: '6',
    campaign: {
      id: 'campaign2',
      name: 'Customer Satisfaction',
    },
    category: {
      id: '2',
      name: 'UI/UX',
    },
    appUserId: 'user6',
    email: 'user6@example.com',
    content:
      'The new interface is very intuitive and easy to navigate. I especially like the simplified menu structure.',
    rating: 5,
    isAnonymous: false,
    state: FeedbackState.New,
    campaignType: CampaignType.CSAT,
    ip: '192.168.1.6',
    countryCode: 'fr',
    stats: {
      totalReplies: 0,
    },
    createdAt: '2025-05-10T11:20:00Z',
  },
  {
    id: '7',
    campaign: {
      id: 'campaign2',
      name: 'Customer Satisfaction',
    },
    category: {
      id: '5',
      name: 'General',
    },
    appUserId: 'user7',
    email: 'user7@example.com',
    content:
      'Customer support was helpful but took too long to respond to my initial inquiry.',
    rating: 3,
    isAnonymous: false,
    state: FeedbackState.InReview,
    campaignType: CampaignType.CSAT,
    ip: '192.168.1.7',
    countryCode: 'de',
    stats: {
      totalReplies: 1,
    },
    createdAt: '2025-05-09T14:30:00Z',
  },
  // NPS Feedback Examples
  {
    id: '8',
    campaign: {
      id: 'campaign3',
      name: 'Net Promoter Score',
    },
    category: {
      id: '5',
      name: 'General',
    },
    appUserId: 'user8',
    email: 'user8@example.com',
    content:
      'I would definitely recommend this product to my colleagues. The automation features have saved me hours of work each week.',
    rating: 9,
    isAnonymous: false,
    state: FeedbackState.New,
    campaignType: CampaignType.NPS,
    ip: '192.168.1.8',
    countryCode: 'jp',
    stats: {
      totalReplies: 0,
    },
    createdAt: '2025-05-12T09:15:00Z',
  },
  {
    id: '9',
    campaign: {
      id: 'campaign3',
      name: 'Net Promoter Score',
    },
    category: {
      id: '1',
      name: 'Performance',
    },
    appUserId: 'user9',
    email: 'user9@example.com',
    content:
      'While the product has potential, the frequent downtime makes it difficult to rely on for critical tasks. I would need to see improvements before recommending it.',
    rating: 6,
    isAnonymous: false,
    state: FeedbackState.Planned,
    campaignType: CampaignType.NPS,
    ip: '192.168.1.9',
    countryCode: 'sg',
    stats: {
      totalReplies: 2,
    },
    createdAt: '2025-05-11T16:45:00Z',
  },
]
