import React from 'react'
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'

import JetIcon from '@/components/shared/SVG-components/JetIcon'
import { useHeaderContext } from '@/contexts/headerContext'
import { useOnboardingDialogContext } from '@/contexts/onboardingContext'
import styles from './mainSideBar.module.scss'

const OnboardingLink = () => {
  const { sideBarOpen } = useHeaderContext()
  const { checklistStatus, openOnboardingDialog, setOpenOnboardingDialog } =
    useOnboardingDialogContext()

  return !checklistStatus ? (
    <>
      <Divider
        variant='middle'
        orientation='horizontal'
        className={styles.divider}
      />
      <List className={[styles.listItemBox, styles.marginB].join(' ')}>
        <ListItem disablePadding className={styles.item}>
          <ListItemButton
            className={[
              styles.itemBtn,
              openOnboardingDialog && styles.active
            ].join(' ')}
            onClick={() => setOpenOnboardingDialog(!openOnboardingDialog)}
          >
            <div className={styles.itemTitleBox}>
              <ListItemIcon className={styles.itemIcon}>
                <JetIcon />
              </ListItemIcon>

              {sideBarOpen && (
                <ListItemText
                  primary='Onboarding'
                  className={[
                    styles.itemLabel,
                    !sideBarOpen && styles.hidden
                  ].join(' ')}
                />
              )}
            </div>
          </ListItemButton>
        </ListItem>
      </List>
    </>
  ) : null
}

export default OnboardingLink
