'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'

import { useHeaderContext } from '@/contexts/headerContext'
import { UserTypes } from '@/@types/shared/type'
import { candidateMenuList, univercityMenuList } from '@/constants/MenuList'
import { getCurrentUser } from '@/utils'
import LargeScreenSidebar from './candidate-side-bar/LargeScreenSidebar'
import SmallScreenSidebar from './candidate-side-bar/SmallScreenSidebar'
import JobSideBar from './job-side-bar/JobSideBar'
import { MenuItem } from './sideBar.interface'
import UniversitySideBar from './university-side-bar/UniversitySideBar'
import ContactSupportModals from '../Header/ContactSupportModals/ContactSupportModals'

const SideBar = () => {
  let sideBarContent: MenuItem[] = []
  const { screenSize } = useHeaderContext()
  const isLargeScreen = screenSize === 'desktop'

  // const userType = userDecoded?.userType;
  const user = getCurrentUser()
  const pathname = usePathname().replaceAll('/en', '').replaceAll('/fr', '')

  // State
  const [contactSupport, setContactSupport] = useState(false)

  const handleContactSupport = () => {
    setContactSupport(true)
  }

  const conditionalSideBar = () => {
    if (
      pathname.startsWith('/employer') ||
      user?.userType === UserTypes.EMPLOYEE
    ) {
      return <JobSideBar />
    } else if (
      pathname.startsWith('/university') ||
      user?.userType === UserTypes.STAFF
    ) {
      sideBarContent = univercityMenuList
      return <UniversitySideBar />
    } else if (
      pathname.startsWith('/candidate') ||
      user?.userType === UserTypes.CANDIDATE
    ) {
      sideBarContent = candidateMenuList
      return isLargeScreen ? (
        <LargeScreenSidebar
          sideBarContent={sideBarContent}
          handleContactSupport={handleContactSupport}
        />
      ) : (
        <SmallScreenSidebar
          sideBarContent={sideBarContent}
          handleContactSupport={handleContactSupport}
        />
      )
    }
  }

  return (
    <>
      {conditionalSideBar()}

      <ContactSupportModals
        contactSupport={contactSupport}
        onCloseSupport={() => setContactSupport(false)}
      />
    </>
  )
}

export default SideBar
