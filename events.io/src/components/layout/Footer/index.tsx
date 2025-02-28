'use client'
import React from 'react'
import { Container, Text, Stack, Group, Box } from '@mantine/core'
import {
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandFacebook
} from '@tabler/icons-react'
import classes from '../../home/landing.module.scss'

function Footer () {
  return (
    <footer>
      <Box
        // height={120}
        bg='dark'
        c='white'
        py='md'
        className={classes.footer}
      >
        <Container size='lg'>
          <Stack align='center' gap='sm'>
            <div className={classes.logo}>Events.IO</div>
            <Group gap='xl'>
              <Text size='sm' c='gray.4'>
                Home
              </Text>
              <Text size='sm' c='gray.4'>
                Events
              </Text>
              <Text size='sm' c='gray.4'>
                About
              </Text>
              <Text size='sm' c='gray.4'>
                Contact
              </Text>
            </Group>
            <Group gap='md'>
              <a
                href='https://facebook.com'
                target='_blank'
                rel='noopener noreferrer'
              >
                <IconBrandFacebook size={24} color='white' />
              </a>
              <a
                href='https://twitter.com'
                target='_blank'
                rel='noopener noreferrer'
              >
                <IconBrandTwitter size={24} color='white' />
              </a>
              <a
                href='https://instagram.com'
                target='_blank'
                rel='noopener noreferrer'
              >
                <IconBrandInstagram size={24} color='white' />
              </a>
            </Group>
            <Text size='xs' c='gray.4'>
              © 2025 Events.IO. All rights reserved.
            </Text>
          </Stack>
        </Container>
      </Box>
    </footer>
  )
}

export default Footer
