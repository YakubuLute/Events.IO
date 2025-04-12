// src/app/dashboard/layout.tsx
'use client'
import { useState } from 'react'
import { AppShell, Burger, useMantineTheme, Group, Avatar, Text, UnstyledButton, Box, ThemeIcon, Divider } from '@mantine/core'
import { IconCalendarEvent, IconUser, IconSettings, IconLogout, IconTicket, IconChartBar, IconPlus } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/authContext'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const theme = useMantineTheme()
  const [opened, setOpened] = useState(false)
  const { user, logout } = useAuth()
  const router = useRouter()

  const navItems = [
    { icon: <IconChartBar size={20} />, color: 'blue', label: 'Dashboard', path: '/dashboard' },
    { icon: <IconCalendarEvent size={20} />, color: 'teal', label: 'My Events', path: '/dashboard/events' },
    { icon: <IconPlus size={20} />, color: 'green', label: 'Create Event', path: '/dashboard/events/create' },
    { icon: <IconTicket size={20} />, color: 'orange', label: 'Tickets', path: '/dashboard/tickets' },
    { icon: <IconUser size={20} />, color: 'indigo', label: 'Profile', path: '/dashboard/profile' },
    { icon: <IconSettings size={20} />, color: 'gray', label: 'Settings', path: '/dashboard/settings' },
  ]

  return (
    <AppShell
      header={{ height: 70 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened }
      }}
      padding="md"
    >
      <AppShell.Header p="md">
        <div style={{ display: 'flex', alignItems: 'center', height: '100%', justifyContent: 'space-between' }}>
          <Burger
            opened={opened}
            onClick={() => setOpened((o) => !o)}
            size="sm"
            hiddenFrom="sm"
            color={theme.colors.gray[6]}
          />

          <Text fw={900} size="lg" c="blue.7">Events.IO</Text>
          
          <Group>
            {/* Notification bell and other header elements can go here */}
          </Group>
        </div>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <AppShell.Section mt="xs">
          <Group justify="space-between">
            <Box style={{ display: 'flex', alignItems: 'center' }}>
              <Avatar src={user?.photoURL} radius="xl" size={40} />
              <Box ml="md">
                <Text fw={700} size="sm" style={{ textTransform: 'uppercase' }} c="dimmed">
                  {user?.role || 'User'}
                </Text>
                <Text fw={500} size="md">
                  {user?.name || 'User Name'}
                </Text>
              </Box>
            </Box>
          </Group>
        </AppShell.Section>

        <Divider my="lg" />

        <AppShell.Section grow>
          {navItems.map((item) => (
            <UnstyledButton
              key={item.label}
              style={{
                display: 'block',
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                color: theme.colors.dark[9],
                marginBottom: 8,
              }}
              onClick={() => router.push(item.path)}
            >
              <Group>
                <ThemeIcon color={item.color} variant="light">
                  {item.icon}
                </ThemeIcon>
                <Text size="sm">{item.label}</Text>
              </Group>
            </UnstyledButton>
          ))}
        </AppShell.Section>

        <Divider my="lg" />

        <AppShell.Section>
          <UnstyledButton
            style={{
              display: 'block',
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              color: theme.colors.red[6],
            }}
            onClick={() => logout()}
          >
            <Group>
              <ThemeIcon color="red" variant="light">
                <IconLogout size={18} />
              </ThemeIcon>
              <Text size="sm">Logout</Text>
            </Group>
          </UnstyledButton>
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
  )
}