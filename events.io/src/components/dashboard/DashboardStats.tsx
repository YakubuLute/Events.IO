// src/components/dashboard/DashboardStats.tsx
import { Paper, Text, Group, ThemeIcon } from '@mantine/core'

// Define styles as objects for Mantine v7
const styles = {
  root: {
    padding: '1.5rem',
  },
  value: {
    fontSize: 24,
    fontWeight: 700,
    lineHeight: 1,
  },
  title: {
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    fontSize: '0.75rem',
    color: '#868e96',
    lineHeight: 1.2,
  },
  icon: {
    borderRadius: '0.5rem',
  },
}

export default function DashboardStats({ title, value, icon, color }) {
  return (
    <Paper withBorder p="md" radius="md" style={styles.root}>
      <Group justify="space-between">
        <div>
          <Text c="dimmed" style={styles.title}>
            {title}
          </Text>
          <Text style={styles.value}>{value}</Text>
        </div>
        <ThemeIcon
          color={color}
          variant="light"
          style={styles.icon}
          size={45}
          radius="md"
        >
          {icon}
        </ThemeIcon>
      </Group>
    </Paper>
  )
}