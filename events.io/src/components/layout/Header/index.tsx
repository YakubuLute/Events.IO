// components/Header.tsx
'use client'

import React, { useMemo } from 'react'
import { useRouter } from 'next/navigation'
import {
  Header, // Corrected from MantineHeader to Header
  Container,
  Group,
  Button,
  Text,
  Box
} from '@mantine/core'
import {
  IconMenu2,
  IconBrandFacebook,
  IconBrandTwitter,
  IconBrandInstagram
} from '@tabler/icons-react'
import { useAuth } from '@/contexts/authContext'
import { useDisclosure } from '@mantine/hooks' // Imported from @mantine/hooks
import classes from './Header.module.css' // Optional CSS module for custom styling

const HeaderComponent = () => {
  const router = useRouter()
  const { user, logout } = useAuth()
  const [opened, { toggle, close }] = useDisclosure(false) // Using useDisclosure from @mantine/hooks

  // Memoize navigation items to prevent unnecessary re-renders
  const navItems = useMemo(() => {
    if (user) {
      return (
        <>
          <Button
            component='a'
            href='/dashboard'
            variant='subtle'
            color='yellow'
            radius='md'
            className={classes.navLink}
          >
            Dashboard
          </Button>
          <Button
            onClick={() => {
              logout()
              close()
            }}
            variant='filled'
            color='yellow'
            radius='md'
            className={classes.navLink}
          >
            Logout
          </Button>
        </>
      )
    } else {
      return (
        <>
          <Button
            component='a'
            href='/login'
            variant='subtle'
            color='yellow'
            radius='md'
            className={classes.navLink}
          >
            Login
          </Button>
          <Button
            component='a'
            href='/register'
            variant='filled'
            color='yellow'
            radius='md'
            className={classes.navLink}
          >
            Register
          </Button>
        </>
      )
    }
  }, [user, logout, close])

  return (
    <>
      <Header // Corrected to Header (from @mantine/core)
        height={60}
        bg='dark'
        className={classes.header}
        sx={{
          position: { xs: 'sticky', xl: 'fixed' },
          top: 0,
          zIndex: 1000,
          boxShadow: 'none'
        }}
      >
        <Container size='lg' className={classes.container}>
          <Group justify='space-between' align='center' h='100%'>
            {/* Logo/Brand (Text-based, matching Organic Design template) */}
            <Text
              component='a'
              href='/'
              className={classes.logo}
              fw={700}
              size='xl'
              c='yellow'
            >
              Events.IO
            </Text>

            {/* Desktop Navigation Links */}
            <Group gap='md' visibleFrom='sm'>
              {navItems}
            </Group>

            {/* Mobile Menu Toggle (Hidden on desktop) */}
            <Box visibleFrom='xs' hiddenFrom='sm'>
              <Button
                variant='subtle'
                color='yellow'
                radius='md'
                leftSection={<IconMenu2 size={18} />}
                onClick={toggle}
                className={classes.mobileMenu}
              >
                Menu
              </Button>
            </Box>
          </Group>
        </Container>
      </Header>

      {/* Mobile Drawer Menu */}
      <Drawer
        opened={opened}
        onClose={close}
        position='right'
        title={
          <Text c='yellow' fw={700}>
            Menu
          </Text>
        }
        overlayProps={{ blur: 3 }}
        zIndex={1001}
      >
        <Stack gap='md'>{navItems}</Stack>
      </Drawer>
    </>
  )
}

export default HeaderComponent // Renamed to avoid naming conflicts (optional, but recommended)
