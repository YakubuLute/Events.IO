// src/components/dashboard/UpcomingEvents.tsx
import { Paper, Text, Timeline, Title, createStyles } from '@mantine/core'
import { IconCalendarEvent } from '@tabler/icons-react'
import { format } from 'date-fns'

const useStyles = createStyles((theme) => ({
  item: {
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },
}))

export default function UpcomingEvents({ events }) {
  const { classes } = useStyles()
  
  return (
    <Paper p="md" radius="md" withBorder>
      <Title order={3} mb="md">Upcoming Events</Title>
      
      <Timeline active={events.length - 1} bulletSize={24} lineWidth={2}>
        {events.map((event) => (
          <Timeline.Item 
            key={event._id}
            bullet={<IconCalendarEvent size={12} />}
            title={event.title}
          >
            <Text color="dimmed" size="sm">
              {format(new Date(event.schedule.startDate), 'MMM dd, yyyy')}
            </Text>
            <Text size="xs" mt={4}>
              {event.venue.name}, {event.venue.city}
            </Text>
          </Timeline.Item>
        ))}
      </Timeline>
    </Paper>
  )
}