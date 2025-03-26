/* eslint-disable @typescript-eslint/no-explicit-any */
import { IEvent } from '../interface/interface';

// Mock data for development
export const mockEvent: IEvent = {
  _id: '1' as any,
  title: 'Tech Conference 2025',
  description: 'Join us for the biggest tech conference of the year. Learn from industry experts, network with peers, and discover the latest innovations in technology.',
  category: ['Technology', 'Conference', 'Networking'],
  tags: ['tech', 'innovation', 'ai', 'blockchain'],
  organizer: {
    _id: '1' as any,
    name: 'Tech Events Inc.',
    email: 'info@techevents.com',
    phoneNumber: '+1234567890',
    isAdmin: false,
    role: 'organizer',
    isVerified: true,
    countryCode: 'US',
    displayName: 'Tech Events',
    photoURL: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    createdAt: new Date(),
    eventsOrganized: [] as any[],
    eventsAttended: [] as any[],
  } as any,
  ticketTypes: [
    {
      _id: '1' as any,
      name: 'Regular',
      price: 99.99,
      quantity: 500,
      available: 350,
      description: 'Regular admission ticket'
    },
    {
      _id: '2' as any,
      name: 'VIP',
      price: 199.99,
      quantity: 100,
      available: 75,
      description: 'VIP admission with exclusive access'
    }
  ],
  schedule: {
    startDate: new Date('2025-06-15T09:00:00'),
    endDate: new Date('2025-06-17T18:00:00'),
    timezone: 'America/New_York',
    sessions: [
      {
        _id: '1' as any,
        title: 'Opening Keynote',
        description: 'Welcome address and keynote speech',
        startTime: new Date('2025-06-15T09:30:00'),
        endTime: new Date('2025-06-15T11:00:00')
      }
    ]
  },
  venue: {
    name: 'Tech Convention Center',
    address: '123 Innovation Blvd',
    city: 'San Francisco',
    state: 'CA',
    country: 'USA',
    postalCode: '94107',
    capacity: 1000
  },
  images: [
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1112&q=80',
    'https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
  ],
  bannerImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  status: 'published',
  visibility: 'public',
  capacity: 600,
  attendees: [] as any[],
  attendeeCount: 175,
  checkInStats: {
    totalCheckedIn: 0
  },
  checkInList: [] as any[],
  totalRevenue: 15000,
  createdAt: new Date('2024-01-15'),
  updatedAt: new Date('2024-02-20'),
  settings: {
    allowRefunds: true,
    requireApproval: false,
    guestCheckIn: true,
    ticketTransfer: false
  },
  videos: [
    {
      type: 'youtube',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      title: 'Conference Promo'
    },
    {
      type: 'direct',
      url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1073&q=80',
      title: 'Event Highlights'
    }
  ]
} as any;