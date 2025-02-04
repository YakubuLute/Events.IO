import { Button, Container, Menu, Skeleton } from '@mantine/core'
import { useState } from 'react'
import NavBar from './nav'
import { Footer } from '../../layouts/EventHomepage/Footer'
import Banner from './banner'
import Main from './main'

const HomePageSkeleton = () => {
  return (
    <>
      <Skeleton height={120} radius='l' mb='20px' />
      <Skeleton height={120} radius='l' mb='20px' />
      <Skeleton height={120} radius='l' />
    </>
  )
}

export const HomePage: React.FC = () => {
  const [isEvent, setIsEvent] = useState()
  const [isFetching, setIsFetching] = useState(false)

  if (isFetching) {
    return <HomePageSkeleton />
  }
  return (
    <Container>
      <NavBar />
      <Banner />
      <Main />
      <Footer />
    </Container>
  )
}

export default HomePage
