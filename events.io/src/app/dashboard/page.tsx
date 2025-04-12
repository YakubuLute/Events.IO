'use client'

import { useEffect, useState } from 'react'
import { Grid, Card, Text, Group, Badge, Button, SimpleGrid, RingProgress, Title, Paper, useMantineTheme } from '@mantine/core'
import { IconCalendarEvent, IconTicket, IconUsers, IconCurrencyDollar, IconArrowUpRight } from '@tabler/icons-react'
// import { useCurrentUser, useUserEvents } from '@/hooks/hooks'
// import { IEvent } from '@/interface/interface'
import DashboardEventCard from '@/components/dashboard/DashboardEventCard'
import DashboardStats from '@/components/dashboard/DashboardStats'
import UpcomingEvents from '@/components/dashboard/UpcomingEvents'

// Dummy data for demonstration
const dummyStats = {
  totalEvents: 12,
  upcomingEvents: 5,
  totalAttendees: 1240,
  totalRevenue: 15750
}

const dummyEvents = [
  {
    _id: '1',
    title: 'Tech Conference 2025',
    description: 'A conference for tech enthusiasts and professionals',
    status: 'upcoming',
    bannerImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87',
    schedule: {
      startDate: new Date('2025-06-15'),
      endDate: new Date('2025-06-17'),
      timezone: 'UTC'
    },
    venue: {
      name: 'Tech Convention Center',
      city: 'San Francisco',
      country: 'USA'
    },
    attendeeCount: 450,
    totalRevenue: 9000
  },
  {
    _id: '2',
    title: 'Music Festival',
    description: 'Annual music festival featuring top artists',
    status: 'published',
    bannerImage: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4',
    schedule: {
      startDate: new Date('2025-07-20'),
      endDate: new Date('2025-07-22'),
      timezone: 'UTC'
    },
    venue: {
      name: 'Central Park',
      city: 'New York',
      country: 'USA'
    },
    attendeeCount: 1200,
    totalRevenue: 24000
  },
  {
    _id: '3',
    title: 'Art Exhibition',
    description: 'Contemporary art exhibition featuring local artists',
    status: 'completed',
    bannerImage: 'https://images.unsplash.com/photo-1531058020387-3be344556be6',
    schedule: {
      startDate: new Date('2025-03-10'),
      endDate: new Date('2025-03-15'),
      timezone: 'UTC'
    },
    venue: {
      name: 'Modern Art Gallery',
      city: 'London',
      country: 'UK'
    },
    attendeeCount: 350,
    totalRevenue: 5250
  }
]

export default function DashboardPage() {
  const theme = useMantineTheme()
  // const { data: user, isLoading: userLoading } = useCurrentUser()
  const [stats, setStats] = useState(dummyStats)
  const [events, setEvents] = useState(dummyEvents)
  const [loading, setLoading] = useState(false)
  
  // Simulating a user for now
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    role: 'organizer'
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <Title order={2} mb="md">Dashboard</Title>
      <Text color="dimmed" mb="xl">Welcome back, {user?.name || 'User'}! Here's an overview of your events.</Text>
      
      <SimpleGrid cols={4} breakpoints={[{ maxWidth: 'sm', cols: 1 }, { maxWidth: 'md', cols: 2 }]} mb="xl">
        <DashboardStats 
          title="Total Events" 
          value={stats.totalEvents} 
          icon={<IconCalendarEvent size={24} />} 
          color="blue" 
        />
        <DashboardStats 
          title="Upcoming Events" 
          value={stats.upcomingEvents} 
          icon={<IconCalendarEvent size={24} />} 
          color="teal" 
        />
        <DashboardStats 
          title="Total Attendees" 
          value={stats.totalAttendees} 
          icon={<IconUsers size={24} />} 
          color="violet" 
        />
        <DashboardStats 
          title="Total Revenue" 
          value={`$${stats.totalRevenue}`} 
          icon={<IconCurrencyDollar size={24} />} 
          color="green" 
        />
      </SimpleGrid>

      <Grid gutter="md">
        <Grid.Col span={8}>
          <Paper p="md" radius="md" withBorder mb="md">
            <Title order={3} mb="md">Your Events</Title>
            {events.slice(0, 2).map((event) => (
              <DashboardEventCard key={event._id} event={event} />
            ))}
            <Button variant="subtle" color="blue" mt="md" fullWidth>View All Events</Button>
          </Paper>
        </Grid.Col>
        
        <Grid.Col span={4}>
          <UpcomingEvents events={events.filter(e => e.status === 'upcoming')} />
          
          <Paper p="md" radius="md" withBorder mt="md">
            <Title order={3} mb="md">Ticket Sales</Title>
            <Group position="center">
              <RingProgress
                size={150}
                thickness={16}
                sections={[
                  { value: 40, color: theme.colors.blue[6] },
                  { value: 25, color: theme.colors.teal[6] },
                  { value: 15, color: theme.colors.orange[6] },
                ]}
                label={
                  <Text size="xs" align="center" px="xs" sx={{ pointerEvents: 'none' }}>
                    <Text size="xl" align="center" fw={700}>80%</Text>
                    <Text size="sm" align="center">Sold</Text>
                  </Text>
                }
              />
            </Group>
            <SimpleGrid cols={3} mt="md">
              <div>
                <Text size="xs" color="dimmed">VIP</Text>
                <Text fw={700} size="sm">40%</Text>
              </div>
              <div>
                <Text size="xs" color="dimmed">Regular</Text>
                <Text fw={700} size="sm">25%</Text>
              </div>
              <div>
                <Text size="xs" color="dimmed">Early Bird</Text>
                <Text fw={700} size="sm">15%</Text>
              </div>
            </SimpleGrid>
          </Paper>
        </Grid.Col>
      </Grid>
    </div>
  )
}