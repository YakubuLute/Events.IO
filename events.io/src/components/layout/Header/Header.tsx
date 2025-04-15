// components/Header.tsx
'use client'

import React from 'react'
import { Box, Container, Button, Text, Avatar } from '@mantine/core'
import { useAuth } from '@/contexts/authContext'
import classes from './header.module.scss'

const HeaderComponent = () => {
  const { user } = useAuth()

  return (
    <Box className={classes.header}>
      <Container size='lg' className={classes.container}>
        <div className={classes.innerContainer}>
          <Text
            component='a'
            href='/'
            className={classes.logo}
            fw={700}
            size='xl'
            style={{ fontFamily: 'Work Sans, sans-serif', cursor:'pointer' }}
          >
            Events.IO
          </Text>

          {user ? (
            <Avatar
              src={user.photoURL || null}
              alt={user.displayName || 'User'}
              color="blue"
              radius="xl"
              className={classes.avatar}
              component='a'
              href='/dashboard'
            >
              {!user.photoURL && (user.displayName?.[0] || 'U')}
            </Avatar>
          ) : (
            <Button
              component='a'
              href='/auth/login'
              variant='filled'
              radius='sm'
              className={classes.loginButton}
            >
              Login
            </Button>
          )}
        </div>
      </Container>
    </Box>
  )
}

export default HeaderComponent
