'use client'

import React from 'react'
import SideBar from '@/components/layout/SideBar/SideBar'

export default function EventsLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return <SideBar>{children}</SideBar>
}
