import Link from 'next/link'
import { Box } from '@mui/system'

import Classes from '@/components/shared/icons/classes'
import Logo from '@/components/shared/icons/logo'
import LogoWithLabel from '@/components/shared/icons/logoWithLabel'
import HStack from '@/components/shared/stacks/HStack'
// import { useHeaderContext } from '@/contexts/headerContext';
import { getCurrentUser } from '@/utils'
import { useHeaderContext } from '@/contexts/headerContext'

interface SearchProps {
  haveSidebar?: boolean
  showLabel?: boolean
  platform?: 'university' | 'candidate' | 'employer'
  isSmall?: boolean
}

export const HeaderLogoBurger: React.FC<SearchProps> = (props: SearchProps) => {
  const { sideBarOpen, screenSize } = useHeaderContext()
  const user = getCurrentUser()

  const renderLogo = () => {
    if (
      (screenSize === 'desktop' ||
        screenSize === 'laptop' ||
        screenSize === 'tablet') &&
      sideBarOpen
    ) {
      return <LogoWithLabel />
    } else if (
      (screenSize === 'desktop' ||
        screenSize === 'laptop' ||
        screenSize === 'tablet') &&
      props.showLabel
    ) {
      return <LogoWithLabel />
    } else if (props.isSmall) {
      return <LogoWithLabel />
    } else if (!user) {
      return <LogoWithLabel />
    } else {
      return <Logo />
    }
  }

  return (
    <HStack sx={{ alignItems: 'center', gap: '11px', px: { xxl: '1rem' } }}>
      <Box display={{ xs: 'flex', xxl: 'none' }}>
        {props.haveSidebar && <Classes />}
      </Box>
      <Link href={`/${props.platform || ''}`}>{renderLogo()}</Link>
    </HStack>
  )
}
