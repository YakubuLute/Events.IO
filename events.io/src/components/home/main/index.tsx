'use client'
import {
  Container,
  Title,
  Text,
  Button,
  Card,
  Image,
  SimpleGrid,
  Stack,
  Group,
  Paper
} from '@mantine/core'
import {
  IconCalendar,
  IconUsers,
  IconTicket,
  IconStar,
  IconMapPin
} from '@tabler/icons-react'
import styles from './landing-main.module.scss'

// Placeholder events data (replace with API call later)
const placeholderEvents = [
  {
    id: 1,
    title: 'Tech Summit 2025',
    date: 'March 15, 2025',
    location: 'San Francisco, CA',
    image: '/event1.jpg'
  },
  {
    id: 2,
    title: 'Music Festival',
    date: 'April 20, 2025',
    location: 'New York, NY',
    image: '/event2.jpg'
  },
  {
    id: 3,
    title: 'Art Expo',
    date: 'May 10, 2025',
    location: 'London, UK',
    image: '/event3.jpg'
  }
]

export default function LandingPage () {
  return (
    <>
      {/* Hero Section */}
      <div className={styles.hero}>
        <Container size='lg' py={100}>
          <Stack align='center' gap='xl'>
            <Title order={1} className={styles.heroTitle} ta='center'>
              Welcome to Events.IO
            </Title>
            <Text
              size='xl'
              c='dimmed'
              ta='center'
              className={styles.heroSubtitle}
            >
              Discover, create, and manage unforgettable events with ease. Join
              thousands of organizers and attendees worldwide!
            </Text>
            <Button
              size='lg'
              radius='xl'
              variant='gradient'
              gradient={{ from: 'purple', to: 'violet' }}
            >
              Get Started
            </Button>
          </Stack>
        </Container>
      </div>

      {/* Events Section */}
      <Container size='lg' py={60}>
        <Title order={2} ta='center' mb='xl'>
          Upcoming Events
        </Title>
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing='xl'>
          {placeholderEvents.map(event => (
            <Card
              key={event.id}
              shadow='md'
              radius='md'
              padding='xl'
              className={styles.eventCard}
            >
              <Card.Section>
                <Image
                  src={event.image}
                  height={200}
                  alt={event.title}
                  className={styles.eventImage}
                />
              </Card.Section>
              <Stack gap='sm' mt='md'>
                <Title order={3}>{event.title}</Title>
                <Group gap='xs'>
                  <IconCalendar size={16} />
                  <Text size='sm' c='dimmed'>
                    {event.date}
                  </Text>
                </Group>
                <Group gap='xs'>
                  <IconMapPin size={16} />
                  <Text size='sm' c='dimmed'>
                    {event.location}
                  </Text>
                </Group>
                <Button variant='light' radius='md' fullWidth mt='md'>
                  View Details
                </Button>
              </Stack>
            </Card>
          ))}
        </SimpleGrid>
      </Container>

      {/* Features Section */}
      <Container size='lg' py={60} className={styles.featuresSection}>
        <Title order={2} ta='center' mb='xl'>
          Why Choose Events.IO?
        </Title>
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing='xl'>
          <Paper shadow='md' radius='md' p='xl' withBorder>
            <IconCalendar size={40} color='purple' />
            <Text mt='sm' fw={500}>
              Easy Event Management
            </Text>
            <Text size='sm' c='dimmed' mt='xs'>
              Create, manage, and promote events with our intuitive tools.
            </Text>
          </Paper>
          <Paper shadow='md' radius='md' p='xl' withBorder>
            <IconUsers size={40} color='purple' />
            <Text mt='sm' fw={500}>
              Connect with Attendees
            </Text>
            <Text size='sm' c='dimmed' mt='xs'>
              Build communities and engage with your audience effortlessly.
            </Text>
          </Paper>
          <Paper shadow='md' radius='md' p='xl' withBorder>
            <IconTicket size={40} color='purple' />
            <Text mt='sm' fw={500}>
              Seamless Ticketing
            </Text>
            <Text size='sm' c='dimmed' mt='xs'>
              Sell tickets online with secure, instant processing.
            </Text>
          </Paper>
        </SimpleGrid>
      </Container>

      {/* Testimonials Section */}
      <Container size='lg' py={60} bg='gray.1'>
        <Title order={2} ta='center' mb='xl'>
          What Our Users Say
        </Title>
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing='xl'>
          <Paper shadow='md' radius='md' p='xl' withBorder>
            <Group gap='xs' mb='sm'>
              <IconStar size={20} color='yellow' />
              <IconStar size={20} color='yellow' />
              <IconStar size={20} color='yellow' />
              <IconStar size={20} color='yellow' />
              <IconStar size={20} color='yellow' />
            </Group>
            <Text size='lg' fw={500}>
              '''Events.IO transformed how I organize events!'''
            </Text>
            <Text size='sm' c='dimmed' mt='xs'>
              – Jane Doe, Event Organizer
            </Text>
          </Paper>
          <Paper shadow='md' radius='md' p='xl' withBorder>
            <Group gap='xs' mb='sm'>
              <IconStar size={20} color='yellow' />
              <IconStar size={20} color='yellow' />
              <IconStar size={20} color='yellow' />
              <IconStar size={20} color='yellow' />
              <IconStar size={20} color='gray' />
            </Group>
            <Text size='lg' fw={500}>
              'Amazing platform for finding local events.'
            </Text>
            <Text size='sm' c='dimmed' mt='xs'>
              – John Smith, Attendee
            </Text>
          </Paper>
        </SimpleGrid>
      </Container>
    </>
  )
}

/*

export const styles = {
  hero: 'bg-gradient-to-r from-purple-500 to-violet-600 text-white',
  heroTitle: 'text-4xl font-bold mb-4',
  heroSubtitle: 'max-w-2xl',
  eventCard: 'hover:shadow-lg transition-shadow duration-300',
  eventImage: 'object-cover',
  featuresSection: 'bg-gray-100',
  footer: 'w-full'
}

*/
