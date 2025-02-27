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
  Group
} from '@mantine/core'

import { useAllEvents } from '@/hooks/hooks'
import { IconCalendar, IconMapPin } from '@tabler/icons-react'
import styles from './landing-main.module.scss'
import { IEvent } from '@/interface/interface'

export default function LandingPage () {
  const { data: events, isLoading, error } = useAllEvents()

  if (isLoading) return <div>Loading events...</div>
  if (error) return <div>Error loading events: {error.message}</div>

  return (
    <Container size='lg' py={60}>
      <Title order={2} ta='center' mb='xl'>
        Upcoming Events
      </Title>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing='xl'>
        {events!.map((event: IEvent) => (
          <Card
            key={event.id}
            shadow='md'
            radius='md'
            padding='xl'
            className={styles.eventCard}
          >
            <Card.Section>
              <Image
                src={event?.image || '/default-event.jpg'}
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
                  {event?.date}
                </Text>
              </Group>
              <Group gap='xs'>
                <IconMapPin size={16} />
                <Text size='sm' c='dimmed'>
                  {event?.location}
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
  )
}
