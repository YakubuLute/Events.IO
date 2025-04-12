// src/app/dashboard/layout.tsx
'use client'
import { useState } from 'react'
import { AppShell, Navbar, Header, Footer, MediaQuery, Burger, useMantineTheme, Group, Avatar, Text, UnstyledButton, Box, ThemeIcon, Divider } from '@mantine/core'
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
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      navbar={
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 250, lg: 300 }}>
          <Navbar.Section mt="xs">
            <Group position="apart">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar src={user?.photoURL} radius="xl" size={40} />
                <Box ml="md">
                  <Text fw={700} size="sm" sx={{ textTransform: 'uppercase' }} color="dimmed">
                    {user?.role || 'User'}
                  </Text>
                  <Text fw={500} size="md">
                    {user?.name || 'User Name'}
                  </Text>
                </Box>
              </Box>
            </Group>
          </Navbar.Section>

          <Divider my="lg" />

          <Navbar.Section grow>
            {navItems.map((item) => (
              <UnstyledButton
                key={item.label}
                sx={(theme) => ({
                  display: 'block',
                  width: '100%',
                  padding: theme.spacing.xs,
                  borderRadius: theme.radius.sm,
                  color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
                  '&:hover': {
                    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                  },
                  marginBottom: 8,
                })}
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
          </Navbar.Section>

          <Divider my="lg" />

          <Navbar.Section>
            <UnstyledButton
              sx={(theme) => ({
                display: 'block',
                width: '100%',
                padding: theme.spacing.xs,
                borderRadius: theme.radius.sm,
                color: theme.colors.red[6],
                '&:hover': {
                  backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                },
              })}
              onClick={() => logout()}
            >
              <Group>
                <ThemeIcon color="red" variant="light">
                  <IconLogout size={18} />
                </ThemeIcon>
                <Text size="sm">Logout</Text>
              </Group>
            </UnstyledButton>
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={70} p="md">
          <div style={{ display: 'flex', alignItems: 'center', height: '100%', justifyContent: 'space-between' }}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Text fw={900} size="lg" color="blue.7">Events.IO</Text>
            
            <Group>
              {/* Notification bell and other header elements can go here */}
            </Group>
          </div>
        </Header>
      }
    >
      {children}
    </AppShell>
  )
}