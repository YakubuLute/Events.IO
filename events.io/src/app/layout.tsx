import type { Metadata } from 'next'
import './globals.css'
import '@mantine/core/styles.css'

import React, { ReactNode } from 'react'
import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps
} from '@mantine/core'
import { theme } from '../../theme'
import QueryProvider from '@/contexts/queryProvider'
import { AuthProvider } from '@/contexts/authContext'
import '@mantine/notifications/styles.css';
import { Notifications } from '@mantine/notifications'

export const metadata: Metadata = {
  title: 'Events.IO - Discover Unforgettable Events',
  description:
    'Join Events.IO to create, manage, and discover events worldwide.',
  openGraph: {
    title: 'Events.IO',
    description: 'Event management made easy.',
    images: ['/og-image.jpg']
  }
}

export default function RootLayout ({ children }: { children: ReactNode }) {
  return (
    <html lang='en' {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <link rel='shortcut icon' href='/favicon.svg' />
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no'
        />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <React.StrictMode>
            <QueryProvider>
              <AuthProvider>
              <Notifications />
                {children}
              </AuthProvider>
            </QueryProvider>
          </React.StrictMode>
        </MantineProvider>
      </body>
    </html>
  )
}
