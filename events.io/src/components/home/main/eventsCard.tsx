'use client'

import { FC } from 'react'
import { IEvent } from "../../../interface/interface"
import { EventCard } from './EventCard'
import { Text, Button, Group } from '@mantine/core'
import { IconCalendarPlus, IconSearch } from '@tabler/icons-react'
import styles from './event-card.module.scss'
import Link from 'next/link'

export const EventsCard: FC<{ events: IEvent[] }> = ({ events }) => {
  return (
    <div>
      {events.length > 0 ? (
        <div className={styles.eventsGrid}>
          {events.map((event) => (
            <EventCard 
              key={event._id ? event._id.toString() : Math.random().toString()} 
              event={event} 
            />
          ))}
        </div>
      ) : (
        <div className={styles.emptyContainer}>
          <div className={styles.emptyIcon}>
            <IconCalendarPlus size={80} stroke={1.5} />
          </div>
          <Text className={styles.emptyTitle} fw={700} size="xl">
            It&apos;s Empty Here!
          </Text>
          <Text className={styles.emptyText} size="md">
            There are currently no events available. Check back later or create your own event.
          </Text>
          <Group gap="md">
            <Button 
              component={Link}
              href="/events/create"
              leftSection={<IconCalendarPlus size={18} />}
              size="md"
            >
              Create Event
            </Button>
            <Button 
              component={Link}
              href="/events/discover"
              leftSection={<IconSearch size={18} />}
              variant="outline"
              size="md"
            >
              Discover Events
            </Button>
          </Group>
        </div>
      )}
    </div>
  )
}