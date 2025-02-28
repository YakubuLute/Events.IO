// components/Header.tsx
'use client'

import React, { useMemo } from 'react'
// import { useRouter } from 'next/navigation'
import {
  Box,
  Container,
  Group,
  Button,
  Text,
  Drawer,
  Stack
} from '@mantine/core'
import { IconMenu2 } from '@tabler/icons-react'
import { useAuth } from '@/contexts/authContext'
import { useDisclosure } from '@mantine/hooks'
import classes from './header.module.scss'

const HeaderComponent = () => {
  // const router = useRouter()
  const { user, logout } = useAuth()
  const [opened, { toggle, close }] = useDisclosure()

  // Memoizing navigation items to prevent unnecessary re-renders
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
      <Box h={60} bg='dark' className={classes.header}>
        <Container size='lg' className={classes.container}>
          <Group justify='space-between' align='center' h='100%'>
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
      </Box>

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

export default HeaderComponent
