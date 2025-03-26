'use client'

import { FC } from 'react'
import { IEvent } from "../../../interface/interface"
import { Card, Image, Text, Badge, Group, Avatar } from '@mantine/core'
import { IconCalendar, IconMapPin, IconUsers, IconClock } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import styles from './event-card.module.scss'

interface EventCardProps {
  event: IEvent
}

export const EventCard: FC<EventCardProps> = ({ event }) => {
  const router = useRouter()
  
  // Format date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }
  
  // Format time
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }
  
  // Handle click to navigate to event detail page
  const handleClick = () => {
    router.push(`/events/${event._id}`)
  }
  
  // Get status color based on event status
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'published': return 'blue'
      case 'ongoing': return 'green'
      case 'completed': return 'gray'
      case 'cancelled': return 'red'
      default: return 'yellow'
    }
  }
  
  // Get day and month
  const getDay = (date: Date) => {
    return new Date(date).getDate();
  }
  
  const getMonth = (date: Date) => {
    return new Date(date).toLocaleString('default', { month: 'short' }).toUpperCase();
  }
  
  return (
    <Card 
      className={styles.eventCard} 
      onClick={handleClick}
      radius="md"
      withBorder
      padding="0"
    >
      <Card.Section>
        <div className={styles.imageContainer}>
          <Image
            src={ "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"|| event.bannerImage || event.images[0]}
            height={200}
            alt={event.title}
            className={styles.eventImage}
          />
          <Badge 
            className={styles.statusBadge} 
            color={getStatusColor(event.status)}
            size="md"
          >
            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
          </Badge>
          
          <div className={styles.dateChip}>
            <Text fw={700} className={styles.dateDay}>
              {getDay(event.schedule.startDate)}
            </Text>
            <Text size="xs" className={styles.dateMonth}>
              {getMonth(event.schedule.startDate)}
            </Text>
          </div>
        </div>
      </Card.Section>
      
      <div style={{ padding: '16px' }}>
        <Text fw={700} size="lg" className={styles.eventTitle} lineClamp={2}>
          {event.title}
        </Text>
        
        <Text c="dimmed" size="sm" lineClamp={2} mb="md" className={styles.eventDescription}>
          {event.description}
        </Text>
        
        <Group className={styles.eventDetails}>
          <Group gap="xs">
            <IconCalendar size={16} color="var(--mantine-color-blue-6)" />
            <Text size="sm">
              {formatDate(event.schedule.startDate)}
            </Text>
          </Group>
          
          <Group gap="xs">
            <IconClock size={16} color="var(--mantine-color-blue-6)" />
            <Text size="sm">
              {formatTime(event.schedule.startDate)}
            </Text>
          </Group>
        </Group>
        
        <Group className={styles.eventDetails}>
          <Group gap="xs">
            <IconMapPin size={16} color="var(--mantine-color-blue-6)" />
            <Text size="sm" lineClamp={1}>
              {event.venue.name}
            </Text>
          </Group>
          
          <Group gap="xs">
            <IconUsers size={16} color="var(--mantine-color-blue-6)" />
            <Text size="sm">
              {event.attendeeCount}/{event.capacity}
            </Text>
          </Group>
        </Group>
        
        <Group justify="space-between" align="center" mt="md">
          <Group gap="xs">
            <Avatar 
              src={event.organizer?.photoURL} 
              size="sm" 
              radius="xl"
            />
            <Text size="sm" fw={500}>
              {event.organizer?.displayName || event.organizer?.name}
            </Text>
          </Group>
          
          {event.ticketTypes && event.ticketTypes.length > 0 && (
            <Text fw={700} size="md" className={styles.price}>
              ${event.ticketTypes[0].price === 0 
                ? 'Free' 
                : event.ticketTypes[0].price.toFixed(2)}
            </Text>
          )}
        </Group>
        
        <Group gap="xs" mt="md">
          {event.category.slice(0, 3).map((cat, index) => (
            <Badge key={index} color="blue" variant="light">
              {cat}
            </Badge>
          ))}
        </Group>
      </div>
    </Card>
  )
}
