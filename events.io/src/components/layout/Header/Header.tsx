'use client'

import React from 'react'
import { Button, Group } from '@mantine/core'
import Link from 'next/link'
import classes from './header.module.scss'

export default function Header() {
  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <Link href="/" className={classes.logo}>
          Events.IO
        </Link>
        
        <Group gap="md">
          <Button variant="outline" component={Link} href="/login">
            Login
          </Button>
        </Group>
      </div>
    </header>
  )
}
