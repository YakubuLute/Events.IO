'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { 
  Container, 
  Title, 
  Text, 
  Badge, 
  Group, 
  Avatar, 
  Paper, 
  Card, 
  Image, 
  Button,
  Tabs,
  Divider,
  ActionIcon
} from '@mantine/core'
import { 
  IconCalendar, 
  IconMapPin, 
  IconUsers, 
  IconClock, 
  IconChevronLeft, 
  IconChevronRight,
  IconBrandYoutube,
  IconPlayerPlay
} from '@tabler/icons-react'
import styles from './event-detail.module.scss'
import { IEvent } from '../../../interface/interface'
import PageLoader from '@/components/shared/page-loader'
import { mockEvent } from '@/data/event-data'
import NotFound from '@/components/shared/not-found/not-found'
import { useRouter } from 'next/navigation'

export default function EventDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<IEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState<string | null>('details');

  // Combine images and videos for the slider
  const mediaItems = event ? [
    ...(event.images || []).map(img => ({ type: 'image', url: img })),
    ...(event.videos || []).map(video => ({ type: 'video', ...video }))
  ] : [];

  // Format date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  // Format time
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get status color based on event status
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'published': return 'blue';
      case 'ongoing': return 'green';
      case 'completed': return 'gray';
      case 'cancelled': return 'red';
      default: return 'yellow';
    }
  };

  // Fetch event data
  useEffect(() => {
    //TODO: In a real app, fetch data from API
    // For now, use mock data
    setEvent(mockEvent);
    setLoading(false);
  }, [id]);

  // Handle slider navigation
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === mediaItems.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? mediaItems.length - 1 : prev - 1));
  };

  if (loading) {
    return <PageLoader />;
  }

  if (!event) {
    return (
      <NotFound 
        title="Event Not Found" 
        message="The event you're looking for doesn't exist or may have been removed." 
        actionButton={{
          text: "Back to Events",
          onClick: () => router.push('/events')
        }}
      />
    );
  }

  return (
    <Container size="lg" className={styles.eventDetailContainer}>
      {/* Media Slider */}
      <div className={styles.sliderContainer}>
        <div className={styles.sliderWrapper} style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {mediaItems.map((item, index) => (
            <div key={index} className={styles.slide}>
              {item.type === 'image' ? (
                <Image
                  src={item.url}
                  alt={`Event image ${index + 1}`}
                  className={styles.slideImage}
                />
              ) : item.type === 'video' && item.type === 'youtube' ? (
                <div className={styles.videoSlide}>
                  <Image
                    src={item.thumbnail}
                    alt={item.title || `Video ${index + 1}`}
                    className={styles.slideImage}
                  />
                  <div className={styles.videoOverlay}>
                    <IconBrandYoutube size={48} className={styles.videoIcon} />
                  </div>
                </div>
              ) : (
                <div className={styles.videoSlide}>
                  <Image
                    src={item.thumbnail}
                    alt={item.title || `Video ${index + 1}`}
                    className={styles.slideImage}
                  />
                  <div className={styles.videoOverlay}>
                    <IconPlayerPlay size={48} className={styles.videoIcon} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {mediaItems.length > 1 && (
          <>
            <ActionIcon 
              className={`${styles.sliderNav} ${styles.sliderNavPrev}`}
              onClick={prevSlide}
              variant="filled"
              radius="xl"
              size="lg"
            >
              <IconChevronLeft size={24} />
            </ActionIcon>
            <ActionIcon 
              className={`${styles.sliderNav} ${styles.sliderNavNext}`}
              onClick={nextSlide}
              variant="filled"
              radius="xl"
              size="lg"
            >
              <IconChevronRight size={24} />
            </ActionIcon>
          </>
        )}
        
        {/* Slider Dots */}
        {mediaItems.length > 1 && (
          <div className={styles.sliderDots}>
            {mediaItems.map((_, index) => (
              <span 
                key={index} 
                className={`${styles.dot} ${currentSlide === index ? styles.activeDot : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Event Header */}
      <div className={styles.eventHeader}>
        <div>
          <Badge 
            color={getStatusColor(event.status)}
            size="lg"
            className={styles.statusBadge}
          >
            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
          </Badge>
          <Title order={1} className={styles.eventTitle}>{event.title}</Title>
          
          <Group className={styles.eventMeta} mt="md">
            <Group gap="xs">
              <IconCalendar size={20} color="var(--mantine-color-blue-6)" />
              <Text size="md">
                {formatDate(event.schedule.startDate)}
              </Text>
            </Group>
            
            <Group gap="xs">
              <IconClock size={20} color="var(--mantine-color-blue-6)" />
              <Text size="md">
                {formatTime(event.schedule.startDate)}
              </Text>
            </Group>
            
            <Group gap="xs">
              <IconMapPin size={20} color="var(--mantine-color-blue-6)" />
              <Text size="md">
                {event.venue.name}, {event.venue.city}
              </Text>
            </Group>
            
            <Group gap="xs">
              <IconUsers size={20} color="var(--mantine-color-blue-6)" />
              <Text size="md">
                {event.attendeeCount}/{event.capacity} attendees
              </Text>
            </Group>
          </Group>
          
          <Group mt="md">
            {event.category.map((cat, index) => (
              <Badge key={index} color="blue" variant="light" size="lg">
                {cat}
              </Badge>
            ))}
          </Group>
        </div>
        
        <div className={styles.organizerSection}>
          <Group gap="sm">
            <Avatar 
              src={event.organizer?.photoURL} 
              size="md" 
              radius="xl"
            />
            <div>
              <Text size="sm" c="dimmed">Organized by</Text>
              <Text fw={600}>
                {event.organizer?.displayName || event.organizer?.name}
              </Text>
            </div>
          </Group>
        </div>
      </div>

      {/* Event Content */}
      <Tabs value={activeTab} onChange={setActiveTab} className={styles.eventTabs}>
        <Tabs.List>
          <Tabs.Tab value="details">Details</Tabs.Tab>
          <Tabs.Tab value="schedule">Schedule</Tabs.Tab>
          <Tabs.Tab value="venue">Venue</Tabs.Tab>
          <Tabs.Tab value="tickets">Tickets</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="details" pt="xl">
          <Paper p="md" radius="md" className={styles.contentSection}>
            <Title order={3} mb="md">About This Event</Title>
            <Text>{event.description}</Text>
            
            <Divider my="xl" />
            
            <Title order={3} mb="md">Tags</Title>
            <Group>
              {event.tags.map((tag, index) => (
                <Badge key={index} color="gray" variant="outline">
                  {tag}
                </Badge>
              ))}
            </Group>
          </Paper>
        </Tabs.Panel>

        <Tabs.Panel value="schedule" pt="xl">
          <Paper p="md" radius="md" className={styles.contentSection}>
            <Title order={3} mb="md">Event Schedule</Title>
            <Text mb="md">
              From {formatDate(event.schedule.startDate)} to {formatDate(event.schedule.endDate)}
            </Text>
            
            {event.schedule.sessions && event.schedule.sessions.length > 0 ? (
              <div className={styles.sessionsList}>
                {event.schedule.sessions.map((session, index) => (
                  <Card key={index} withBorder className={styles.sessionCard}>
                    <Group position="apart" mb="xs">
                      <Text fw={700}>{session.title}</Text>
                      <Badge color="blue">
                        {formatTime(session.startTime)} - {formatTime(session.endTime)}
                      </Badge>
                    </Group>
                    <Text size="sm">{session.description}</Text>
                  </Card>
                ))}
              </div>
            ) : (
              <Text c="dimmed">No detailed schedule available yet.</Text>
            )}
          </Paper>
        </Tabs.Panel>

        <Tabs.Panel value="venue" pt="xl">
          <Paper p="md" radius="md" className={styles.contentSection}>
            <Title order={3} mb="md">Venue Information</Title>
            <Text fw={600} size="lg">{event.venue.name}</Text>
            <Text>{event.venue.address}</Text>
            <Text>{event.venue.city}, {event.venue.state} {event.venue.postalCode}</Text>
            <Text>{event.venue.country}</Text>
            
            <Text mt="md">Venue Capacity: {event.venue.capacity}</Text>
            
            {/* Map placeholder - would integrate with Google Maps in a real app */}
            <div className={styles.mapPlaceholder}>
              <Text c="dimmed" ta="center">Map would be displayed here</Text>
            </div>
          </Paper>
        </Tabs.Panel>

        <Tabs.Panel value="tickets" pt="xl">
          <Paper p="md" radius="md" className={styles.contentSection}>
            <Title order={3} mb="md">Ticket Information</Title>
            
            <div className={styles.ticketsList}>
              {event.ticketTypes.map((ticket, index) => (
                <Card key={index} withBorder className={styles.ticketCard}>
                  <Group position="apart">
                    <div>
                      <Text fw={700} size="lg">{ticket.name}</Text>
                      <Text size="sm">{ticket.description}</Text>
                      <Text size="sm" mt="xs">
                        Available: {ticket.available} of {ticket.quantity}
                      </Text>
                    </div>
                    <div className={styles.ticketPrice}>
                      <Text fw={700} size="xl">
                        ${ticket.price.toFixed(2)}
                      </Text>
                      <Button variant="filled" color="blue" mt="sm">
                        Buy Ticket
                      </Button>
                    </div>
                  </Group>
                </Card>
              ))}
            </div>
          </Paper>
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
}
