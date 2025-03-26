'use client'

// import classes from './landing-main.module.scss'
import { EventsCard } from './EventsCard'
import { IEvent } from '../../../interface/interface'

// Define a type for our mock events that matches what EventsCard expects
type MockEvent = {
  _id: { toString: () => string };
  title: string;
  description: string;
  category: string[];
  tags: string[];
  organizer: {
    name: string;
    email: string;
  };
  ticketTypes: {
    name: string;
    price: number;
    quantity: number;
    description: string;
  }[];
  schedule: {
    startDate: Date;
    endDate: Date;
    timezone: string;
  };
  venue: {
    name: string;
    address: string;
    city: string;
    country: string;
    postalCode: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
    capacity: number;
  };
  images: string[];
  status: string;
  visibility: string;
  capacity: number;
  attendees: Array<{ userId: string; ticketId: string }>;
  attendeeCount: number;
  checkInStats: { totalCheckedIn: number };
  checkInList: Array<{ userId: string; checkedInAt: Date }>;
  totalRevenue: number;
  createdAt: Date;
  updatedAt: Date;
  settings: {
    allowRefunds: boolean;
    requireApproval: boolean;
    guestCheckIn: boolean;
    ticketTransfer: boolean;
  };
};

// Create a simplified mock data structure that doesn't rely on actual ObjectId
// but still provides the necessary data for the EventsCard component
const mockEvents: MockEvent[] = [
  {
    _id: { toString: () => '60d21b4667d0d8992e610c85' },
    title: 'Tech Conference 2025',
    description: 'A conference for tech enthusiasts and professionals',
    category: ['Technology', 'Conference'],
    tags: ['tech', 'innovation', 'networking'],
    organizer: {
      name: 'John Doe',
      email: 'john@example.com'
    },
    ticketTypes: [
      {
        name: 'General Admission',
        price: 50,
        quantity: 100,
        description: 'Standard entry ticket'
      }
    ],
    schedule: {
      startDate: new Date(),
      endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      timezone: 'UTC'
    },
    venue: {
      name: 'Convention Center',
      address: '123 Main St',
      city: 'San Francisco',
      country: 'USA',
      postalCode: '94105',
      coordinates: {
        latitude: 37.7749,
        longitude: -122.4194
      },
      capacity: 1000
    },
    images: ['image1.jpg', 'image2.jpg'],
    status: 'published',
    visibility: 'public',
    capacity: 500,
    attendees: [],
    attendeeCount: 0,
    checkInStats: { totalCheckedIn: 0 },
    checkInList: [],
    totalRevenue: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    settings: {
      allowRefunds: true,
      requireApproval: false,
      guestCheckIn: true,
      ticketTransfer: true
    }
  },
  {
    _id: { toString: () => '60d21b4667d0d8992e610c86' },
    title: 'Music Festival',
    description: 'Annual music festival featuring top artists',
    category: ['Music', 'Festival'],
    tags: ['music', 'entertainment', 'live'],
    organizer: {
      name: 'Jane Smith',
      email: 'jane@example.com'
    },
    ticketTypes: [
      {
        name: 'VIP Pass',
        price: 150,
        quantity: 50,
        description: 'Premium access with backstage privileges'
      }
    ],
    schedule: {
      startDate: new Date(),
      endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      timezone: 'UTC'
    },
    venue: {
      name: 'Central Park',
      address: '456 Park Ave',
      city: 'New York',
      country: 'USA',
      postalCode: '10022',
      coordinates: {
        latitude: 40.7812,
        longitude: -73.9665
      },
      capacity: 5000
    },
    images: ['festival1.jpg', 'festival2.jpg'],
    status: 'published',
    visibility: 'public',
    capacity: 1000,
    attendees: [],
    attendeeCount: 0,
    checkInStats: { totalCheckedIn: 0 },
    checkInList: [],
    totalRevenue: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    settings: {
      allowRefunds: true,
      requireApproval: false,
      guestCheckIn: true,
      ticketTransfer: true
    }
  }
];

export default function LandingPage() {
  return (
    <>
      <EventsCard events={mockEvents as unknown as IEvent[]} />
    </>
  )
}
