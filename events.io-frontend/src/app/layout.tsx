/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from 'next'
// import { Geist, Geist_Mono } from 'next/font/google'

import '@mantine/core/styles.css'

import React from 'react'
import {
  ColorSchemeScript,
  mantineHtmlProps,
  MantineProvider
} from '@mantine/core'
import { theme } from '../../theme'
import HeaderProvider from '@/context/headerContext'

export const metadata: Metadata = {
  title: 'Events.IO',
  description: 'An event management app built by LtECH'
}

export default function RootLayout ({ children }: { children: any }) {
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
          <HeaderProvider>

          {children}
          </HeaderProvider>
          </MantineProvider>
      </body>
    </html>
  )
}
