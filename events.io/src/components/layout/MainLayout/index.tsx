'use client'

import React from 'react'

import Header from '../Header'
import SideBar from '../SideBar/SideBar'

interface Props {
  children: React.ReactNode
  verificationStatistics?: React.ReactNode
}

export default function MainLayout ({ children }: Props) {
  return <div className='root-wrapper'>Main layout</div>
}
