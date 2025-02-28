// 'use client'
// import {
//   Container,
//   Title,
//   Text,
//   Button,
//   Card,
//   Image,
//   SimpleGrid,
//   Stack,
//   Group,
//   Paper
// } from '@mantine/core'
// import {
//   IconCalendar,
//   IconUsers,
//   IconTicket,
//   IconStar,
//   IconMapPin
// } from '@tabler/icons-react'
// import styles from './landing-main.module.scss'

// // Placeholder events data (replace with API call later)
// const placeholderEvents = [
//   {
//     id: 1,
//     title: 'Tech Summit 2025',
//     date: 'March 15, 2025',
//     location: 'San Francisco, CA',
//     image: '/event1.jpg'
//   },
//   {
//     id: 2,
//     title: 'Music Festival',
//     date: 'April 20, 2025',
//     location: 'New York, NY',
//     image: '/event2.jpg'
//   },
//   {
//     id: 3,
//     title: 'Art Expo',
//     date: 'May 10, 2025',
//     location: 'London, UK',
//     image: '/event3.jpg'
//   }
// ]

// export default function LandingPage () {
//   return (
//     <>
//       {/* Hero Section */}
//       <div className={styles.hero}>
//         <Container size='lg' py={100}>
//           <Stack align='center' gap='xl'>
//             <Title order={1} className={styles.heroTitle} ta='center'>
//               Welcome to Events.IO
//             </Title>
//             <Text
//               size='xl'
//               c='dimmed'
//               ta='center'
//               className={styles.heroSubtitle}
//             >
//               Discover, create, and manage unforgettable events with ease. Join
//               thousands of organizers and attendees worldwide!
//             </Text>
//             <Button
//               size='lg'
//               radius='xl'
//               variant='gradient'
//               gradient={{ from: 'purple', to: 'violet' }}
//             >
//               Get Started
//             </Button>
//           </Stack>
//         </Container>
//       </div>

//       {/* Events Section */}
//       <Container size='lg' py={60}>
//         <Title order={2} ta='center' mb='xl'>
//           Upcoming Events
//         </Title>
//         <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing='xl'>
//           {placeholderEvents.map(event => (
//             <Card
//               key={event.id}
//               shadow='md'
//               radius='md'
//               padding='xl'
//               className={styles.eventCard}
//             >
//               <Card.Section>
//                 <Image
//                   src={event.image}
//                   height={200}
//                   alt={event.title}
//                   className={styles.eventImage}
//                 />
//               </Card.Section>
//               <Stack gap='sm' mt='md'>
//                 <Title order={3}>{event.title}</Title>
//                 <Group gap='xs'>
//                   <IconCalendar size={16} />
//                   <Text size='sm' c='dimmed'>
//                     {event.date}
//                   </Text>
//                 </Group>
//                 <Group gap='xs'>
//                   <IconMapPin size={16} />
//                   <Text size='sm' c='dimmed'>
//                     {event.location}
//                   </Text>
//                 </Group>
//                 <Button variant='light' radius='md' fullWidth mt='md'>
//                   View Details
//                 </Button>
//               </Stack>
//             </Card>
//           ))}
//         </SimpleGrid>
//       </Container>

//       {/* Features Section */}
//       <Container size='lg' py={60} className={styles.featuresSection}>
//         <Title order={2} ta='center' mb='xl'>
//           Why Choose Events.IO?
//         </Title>
//         <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing='xl'>
//           <Paper shadow='md' radius='md' p='xl' withBorder>
//             <IconCalendar size={40} color='purple' />
//             <Text mt='sm' fw={500}>
//               Easy Event Management
//             </Text>
//             <Text size='sm' c='dimmed' mt='xs'>
//               Create, manage, and promote events with our intuitive tools.
//             </Text>
//           </Paper>
//           <Paper shadow='md' radius='md' p='xl' withBorder>
//             <IconUsers size={40} color='purple' />
//             <Text mt='sm' fw={500}>
//               Connect with Attendees
//             </Text>
//             <Text size='sm' c='dimmed' mt='xs'>
//               Build communities and engage with your audience effortlessly.
//             </Text>
//           </Paper>
//           <Paper shadow='md' radius='md' p='xl' withBorder>
//             <IconTicket size={40} color='purple' />
//             <Text mt='sm' fw={500}>
//               Seamless Ticketing
//             </Text>
//             <Text size='sm' c='dimmed' mt='xs'>
//               Sell tickets online with secure, instant processing.
//             </Text>
//           </Paper>
//         </SimpleGrid>
//       </Container>

//       {/* Testimonials Section */}
//       <Container size='lg' py={60} bg='gray.1'>
//         <Title order={2} ta='center' mb='xl'>
//           What Our Users Say
//         </Title>
//         <SimpleGrid cols={{ base: 1, sm: 2 }} spacing='xl'>
//           <Paper shadow='md' radius='md' p='xl' withBorder>
//             <Group gap='xs' mb='sm'>
//               <IconStar size={20} color='yellow' />
//               <IconStar size={20} color='yellow' />
//               <IconStar size={20} color='yellow' />
//               <IconStar size={20} color='yellow' />
//               <IconStar size={20} color='yellow' />
//             </Group>
//             <Text size='lg' fw={500}>
//               {'Events.IO transformed how I organize events!'}
//             </Text>
//             <Text size='sm' c='dimmed' mt='xs'>
//               – Jane Doe, Event Organizer
//             </Text>
//           </Paper>
//           <Paper shadow='md' radius='md' p='xl' withBorder>
//             <Group gap='xs' mb='sm'>
//               <IconStar size={20} color='yellow' />
//               <IconStar size={20} color='yellow' />
//               <IconStar size={20} color='yellow' />
//               <IconStar size={20} color='yellow' />
//               <IconStar size={20} color='gray' />
//             </Group>
//             <Text size='lg' fw={500}>
//               {'Amazing platform for finding local events.'}
//             </Text>
//             <Text size='sm' c='dimmed' mt='xs'>
//               – John Smith, Attendee
//             </Text>
//           </Paper>
//         </SimpleGrid>
//       </Container>
//     </>
//   )
// }

// /*

// export const styles = {
//   hero: 'bg-gradient-to-r from-purple-500 to-violet-600 text-white',
//   heroTitle: 'text-4xl font-bold mb-4',
//   heroSubtitle: 'max-w-2xl',
//   eventCard: 'hover:shadow-lg transition-shadow duration-300',
//   eventImage: 'object-cover',
//   featuresSection: 'bg-gray-100',
//   footer: 'w-full'
// }

// */

// app/page.tsx
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
  Paper,
  Box
} from '@mantine/core'
import {
  IconCalendar,
  IconUsers,
  IconTicket,
  IconStar,
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandFacebook,
  IconMapPin,
  IconPlayCard
} from '@tabler/icons-react'
import classes from './LandingPage.module.css' // Optional CSS module for custom styling

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
  },
  {
    id: 4,
    title: 'Tech Conference',
    date: 'June 5, 2025',
    location: 'Seattle, WA',
    image: '/event4.jpg'
  }
]

// Placeholder videos data
const placeholderVideos = [
  { id: 1, title: 'Event Highlight 1', image: '/video1.jpg' },
  { id: 2, title: 'Event Highlight 2', image: '/video2.jpg' },
  { id: 3, title: 'Event Highlight 3', image: '/video3.jpg' },
  { id: 4, title: 'Event Highlight 4', image: '/video4.jpg' },
  { id: 5, title: 'Event Highlight 5', image: '/video5.jpg' },
  { id: 6, title: 'Event Highlight 6', image: '/video6.jpg' }
]

export default function LandingPage () {
  return (
    <>
      {/* Hero Section */}
      <div className={classes.hero}>
        <Container size='lg' py={100}>
          <Stack align='center' gap='xl'>
            <Title
              order={1}
              className={classes.heroTitle}
              ta='center'
              c='white'
            >
              Welcome to Events.IO
            </Title>
            <Text
              size='xl'
              c='gray.3'
              ta='center'
              className={classes.heroSubtitle}
            >
              Discover, create, and manage unforgettable events with ease. Join
              thousands of organizers and attendees worldwide!
            </Text>
            <Button size='lg' radius='xl' variant='filled' color='yellow'>
              Discover Events
            </Button>
          </Stack>
        </Container>
      </div>

      {/* Featured Events Section */}
      <Container size='lg' py={60}>
        <Title order={2} ta='center' mb='xl' c='dark'>
          Featured Events
        </Title>
        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing='xl'>
          {placeholderEvents.map(event => (
            <Card
              key={event.id}
              shadow='md'
              radius='md'
              padding='xl'
              className={classes.eventCard}
            >
              <Card.Section>
                <Image
                  src={event.image}
                  height={200}
                  alt={event.title}
                  // withPlaceholder
                  className={classes.eventImage}
                />
              </Card.Section>
              <Stack gap='sm' mt='md'>
                <Title order={3} c='dark'>
                  {event.title}
                </Title>
                <Group gap='xs'>
                  <IconCalendar size={16} color='gray.6' />
                  <Text size='sm' c='gray.6'>
                    {event.date}
                  </Text>
                </Group>
                <Group gap='xs'>
                  <IconMapPin size={16} color='gray.6' />
                  <Text size='sm' c='gray.6'>
                    {event.location}
                  </Text>
                </Group>
                <Button
                  variant='subtle'
                  color='yellow'
                  radius='md'
                  fullWidth
                  mt='md'
                >
                  View Details
                </Button>
              </Stack>
            </Card>
          ))}
        </SimpleGrid>
      </Container>

      {/* Features Section */}
      <Container size='lg' py={60} className={classes.featuresSection}>
        <Title order={2} ta='center' mb='xl' c='dark'>
          Why Choose Events.IO?
        </Title>
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing='xl'>
          <Paper shadow='md' radius='md' p='xl' bg='dark' c='white'>
            <IconCalendar size={40} color='yellow' />
            <Text mt='sm' fw={500} c='white'>
              Easy Event Management
            </Text>
            <Text size='sm' c='gray.4' mt='xs'>
              Create, manage, and promote events with our intuitive tools.
            </Text>
          </Paper>
          <Paper shadow='md' radius='md' p='xl' bg='dark' c='white'>
            <IconUsers size={40} color='yellow' />
            <Text mt='sm' fw={500} c='white'>
              Connect with Attendees
            </Text>
            <Text size='sm' c='gray.4' mt='xs'>
              Build communities and engage with your audience effortlessly.
            </Text>
          </Paper>
          <Paper shadow='md' radius='md' p='xl' bg='dark' c='white'>
            <IconTicket size={40} color='yellow' />
            <Text mt='sm' fw={500} c='white'>
              Seamless Ticketing
            </Text>
            <Text size='sm' c='gray.4' mt='xs'>
              Sell tickets online with secure, instant processing.
            </Text>
          </Paper>
        </SimpleGrid>
      </Container>

      {/* Testimonials Section */}
      <Container size='lg' py={60} bg='gray.8'>
        <Title order={2} ta='center' mb='xl' c='white'>
          What Our Users Say
        </Title>
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing='xl'>
          <Paper shadow='md' radius='md' p='xl' bg='dark' c='white'>
            <Group gap='xs' mb='sm'>
              <IconStar size={20} color='yellow' />
              <IconStar size={20} color='yellow' />
              <IconStar size={20} color='yellow' />
              <IconStar size={20} color='yellow' />
              <IconStar size={20} color='yellow' />
            </Group>
            <Text size='lg' fw={500} c='white'>
              {'Events.IO transformed how I organize events!'}
            </Text>
            <Text size='sm' c='gray.4' mt='xs'>
              – Jane Doe, Event Organizer
            </Text>
          </Paper>
          <Paper shadow='md' radius='md' p='xl' bg='dark' c='white'>
            <Group gap='xs' mb='sm'>
              <IconStar size={20} color='yellow' />
              <IconStar size={20} color='yellow' />
              <IconStar size={20} color='yellow' />
              <IconStar size={20} color='yellow' />
              <IconStar size={20} color='gray.4' />
            </Group>
            <Text size='lg' fw={500} c='white'>
              {'Amazing platform for finding local events.'}
            </Text>
            <Text size='sm' c='gray.4' mt='xs'>
              – John Smith, Attendee
            </Text>
          </Paper>
        </SimpleGrid>
      </Container>

      {/* Video Gallery Section */}
      <Container size='lg' py={60}>
        <Title order={2} ta='center' mb='xl' c='dark'>
          Event Highlights
        </Title>
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing='xl'>
          {placeholderVideos.map(video => (
            <Card
              key={video.id}
              shadow='md'
              radius='md'
              padding='xl'
              className={classes.videoCard}
            >
              <Card.Section>
                <div className={classes.videoPlaceholder}>
                  <IconPlayCard size={50} color='white' />
                </div>
              </Card.Section>
              <Stack gap='sm' mt='md'>
                <Title order={3} c='dark'>
                  {video.title}
                </Title>
                <Button
                  variant='subtle'
                  color='yellow'
                  radius='md'
                  fullWidth
                  mt='md'
                >
                  Watch Now
                </Button>
              </Stack>
            </Card>
          ))}
        </SimpleGrid>
      </Container>

      {/* Call-to-Action Section */}
      <Container size='lg' py={60} bg='gray.2'>
        <Stack align='center' gap='xl'>
          <Title order={2} ta='center' c='dark'>
            Join Events.IO Today
          </Title>
          <Text size='xl' c='gray.6' ta='center' className={classes.ctaText}>
            Create, manage, and discover events like never before. Sign up now
            and start your journey!
          </Text>
          <Button size='lg' radius='xl' variant='filled' color='yellow'>
            Join Now
          </Button>
        </Stack>
      </Container>

      {/* Footer */}
      <Box
        // height={120}
        bg='dark'
        c='white'
        py='md'
        className={classes.footer}
      >
        <Container size='lg'>
          <Stack align='center' gap='sm'>
            <div className={classes.logo}>Events.IO</div>
            <Group gap='xl'>
              <Text size='sm' c='gray.4'>
                Home
              </Text>
              <Text size='sm' c='gray.4'>
                Events
              </Text>
              <Text size='sm' c='gray.4'>
                About
              </Text>
              <Text size='sm' c='gray.4'>
                Contact
              </Text>
            </Group>
            <Group gap='md'>
              <a
                href='https://facebook.com'
                target='_blank'
                rel='noopener noreferrer'
              >
                <IconBrandFacebook size={24} color='white' />
              </a>
              <a
                href='https://twitter.com'
                target='_blank'
                rel='noopener noreferrer'
              >
                <IconBrandTwitter size={24} color='white' />
              </a>
              <a
                href='https://instagram.com'
                target='_blank'
                rel='noopener noreferrer'
              >
                <IconBrandInstagram size={24} color='white' />
              </a>
            </Group>
            <Text size='xs' c='gray.4'>
              © 2025 Events.IO. All rights reserved.
            </Text>
          </Stack>
        </Container>
      </Box>
    </>
  )
}
