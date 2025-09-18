import { useCallback, useState, type ReactElement } from 'react'
import { Divider, Drawer, ListItem } from '@mui/material'
import ChevronRight from '@mui/icons-material/ChevronRight'

import ChainIndicator from '@/components/common/ChainIndicator'
import SidebarHeader from '@/components/sidebar/SidebarHeader'
import SidebarNavigation from '@/components/sidebar/SidebarNavigation'
import SidebarFooter from '@/components/sidebar/SidebarFooter'

import { IS_PRODUCTION } from '@/config/constants'

import css from './styles.module.css'
import { trackEvent, OVERVIEW_EVENTS } from '@/services/analytics'
import MyAccounts from '@/features/myAccounts'

import DebugToggle from '../DebugToggle'
import IndexingStatus from '../IndexingStatus'

const Sidebar = (): ReactElement => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)

  const onDrawerToggle = useCallback(() => {
    setIsDrawerOpen((isOpen) => {
      trackEvent({ ...OVERVIEW_EVENTS.SIDEBAR, label: isOpen ? 'Close' : 'Open' })

      return !isOpen
    })
  }, [])

  const closeDrawer = useCallback(() => setIsDrawerOpen(false), [])

  return (
    <div data-testid="sidebar-container" className={css.container}>
      <div className={css.scroll}>
        <ChainIndicator showLogo={false} />

        {/* Open the safes list */}
        <button data-testid="open-safes-icon" className={css.drawerButton} onClick={onDrawerToggle}>
          <ChevronRight />
        </button>

        {/* Address, balance, copy button, etc */}
        <SidebarHeader />

        {/* Nav menu */}
        <SidebarNavigation />

        <Divider flexItem />

        {!IS_PRODUCTION && (
          <>
            <ListItem disablePadding>
              <DebugToggle />
            </ListItem>

            <Divider flexItem />
          </>
        )}

        <SidebarFooter />

        <Divider flexItem />

        <IndexingStatus />
      </div>
      <Drawer variant="temporary" anchor="left" open={isDrawerOpen} onClose={onDrawerToggle}>
        <div className={css.drawer}>
          <MyAccounts onLinkClick={closeDrawer} isSidebar></MyAccounts>
        </div>
      </Drawer>
    </div>
  )
}

export default Sidebar
