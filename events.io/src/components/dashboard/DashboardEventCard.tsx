// src/components/dashboard/DashboardEventCard.tsx
import { Card, Image, Text, Badge, Group, Button, ActionIcon, Menu } from '@mantine/core'
import { IconDots, IconEdit, IconTrash, IconEye, IconCopy } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { format } from 'date-fns'

// Define styles as objects instead of using createStyles
const styles = {
  card: {
    marginBottom: '1rem',
  },
  section: {
    borderBottom: '1px solid #e9ecef',
    paddingBottom: '1rem',
  },
  label: {
    textTransform: 'uppercase',
    fontSize: '0.75rem',
    fontWeight: 700,
  },
}

export default function DashboardEventCard({ event }) {
  const router = useRouter()
  
  const statusColor = {
    published: 'blue',
    draft: 'gray',
    ongoing: 'green',
    completed: 'teal',
    cancelled: 'red',
  }
  
  return (
    <Card withBorder radius="md" p="md" style={styles.card}>
      <Card.Section>
        <Image
          src={event.bannerImage || 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4'}
          height={180}
          alt={event.title}
        />
      </Card.Section>

      <Card.Section style={styles.section} mt="md" pb="md">
        <Group justify="space-between">
          <Text fw={700} size="lg">{event.title}</Text>
          <Menu withinPortal position="bottom-end" shadow="sm">
            <Menu.Target>
              <ActionIcon>
                <IconDots size={16} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item icon={<IconEye size={16} />}>View Event</Menu.Item>
              <Menu.Item icon={<IconEdit size={16} />}>Edit Event</Menu.Item>
              <Menu.Item icon={<IconCopy size={16} />}>Duplicate</Menu.Item>
              <Menu.Item color="red" icon={<IconTrash size={16} />}>Delete Event</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
        <Text size="sm" color="dimmed" mt="xs">
          {event.description}
        </Text>
      </Card.Section>

      <Card.Section style={styles.section} pb="md">
        <Text style={styles.label} c="dimmed">
          Event Details
        </Text>
        <Group spacing={8} mt={5}>
          <Badge color={statusColor[event.status] || 'gray'}>
            {event.status}
          </Badge>
          <Badge color="blue">{format(new Date(event.schedule.startDate), 'MMM dd, yyyy')}</Badge>
          <Badge color="teal">{event.venue.city}, {event.venue.country}</Badge>
        </Group>
      </Card.Section>

      <Group mt="md" justify="space-between">
        <div>
          <Text className={classes.label} color="dimmed">
            Attendees
          </Text>
          <Text fw={700}>{event.attendeeCount}</Text>
        </div>
        <div>
          <Text className={classes.label} color="dimmed">
            Revenue
          </Text>
          <Text fw={700}>${event.totalRevenue}</Text>
        </div>
        <Button variant="light" color="blue" onClick={() => router.push(`/dashboard/events/${event._id}`)}>
          Manage
        </Button>
      </Group>
    </Card>
  )
}