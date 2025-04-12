// src/components/dashboard/DashboardEventCard.tsx
import { Card, Image, Text, Badge, Group, Button, ActionIcon, Menu, createStyles } from '@mantine/core'
import { IconDots, IconEdit, IconTrash, IconEye, IconCopy } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { format } from 'date-fns'

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    marginBottom: theme.spacing.md,
  },
  section: {
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    paddingBottom: theme.spacing.md,
  },
  label: {
    textTransform: 'uppercase',
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },
}))

export default function DashboardEventCard({ event }) {
  const { classes } = useStyles()
  const router = useRouter()
  
  const statusColor = {
    published: 'blue',
    draft: 'gray',
    ongoing: 'green',
    completed: 'teal',
    cancelled: 'red',
  }
  
  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section>
        <Image
          src={event.bannerImage || '[https://images.unsplash.com/photo-1501281668745-f7f57925c3b4'}](https://images.unsplash.com/photo-1501281668745-f7f57925c3b4'})
          height={180}
          alt={event.title}
        />
      </Card.Section>

      <Card.Section className={classes.section} mt="md" pb="md">
        <Group position="apart">
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

      <Card.Section className={classes.section} pb="md">
        <Text className={classes.label} color="dimmed">
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

      <Group mt="md" position="apart">
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