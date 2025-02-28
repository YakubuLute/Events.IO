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

export const metadata: Metadata = {
  title: 'Events.IO',
  description: 'An event management app built by LtECH'
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
              <AuthProvider>{children}</AuthProvider>
            </QueryProvider>
          </React.StrictMode>
        </MantineProvider>
      </body>
    </html>
  )
}
