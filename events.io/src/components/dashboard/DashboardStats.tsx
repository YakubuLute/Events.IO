// src/components/dashboard/DashboardStats.tsx
import { Paper, Text, Group, ThemeIcon, createStyles } from '@mantine/core'

const useStyles = createStyles((theme) => ({
  root: {
    padding: theme.spacing.xl,
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.xs,
  },
  value: {
    fontSize: 24,
    fontWeight: 700,
    lineHeight: 1,
  },
  title: {
    fontWeight: 700,
    textTransform: 'uppercase',
    fontSize: theme.fontSizes.xs,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[6],
    lineHeight: 1.2,
  },
  icon: {
    borderRadius: theme.radius.md,
  },
}))

export default function DashboardStats({ title, value, icon, color }) {
  const { classes } = useStyles()
  
  return (
    <Paper withBorder p="md" radius="md" className={classes.root}>
      <Group position="apart">
        <div>
          <Text color="dimmed" className={classes.title}>
            {title}
          </Text>
          <Text className={classes.value}>{value}</Text>
        </div>
        <ThemeIcon
          color={color}
          variant="light"
          className={classes.icon}
          size={45}
          radius="md"
        >
          {icon}
        </ThemeIcon>
      </Group>
    </Paper>
  )
}