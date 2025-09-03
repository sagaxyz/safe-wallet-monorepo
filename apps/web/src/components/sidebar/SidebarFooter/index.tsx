import type { ReactElement } from 'react'
import { useEffect } from 'react'

import {
  SidebarList,
  SidebarListItemButton,
  SidebarListItemIcon,
  SidebarListItemText,
} from '@/components/sidebar/SidebarList'
import { loadBeamer } from '@/services/beamer'
import { useAppSelector } from '@/store'
import { CookieAndTermType, hasConsentFor } from '@/store/cookiesAndTermsSlice'
import { Divider, Link, ListItem, SvgIcon, Typography } from '@mui/material'
import DebugToggle from '../DebugToggle'
import { IS_PRODUCTION } from '@/config/constants'
import { useCurrentChain } from '@/hooks/useChains'
import ProtofireLogo from '@/public/images/protofire-logo.svg'
import HelpCenterIcon from '@/public/images/sidebar/help-center.svg'
import darkPalette from '@/components/theme/darkPalette'
import Track from '@/components/common/Track'
import { OVERVIEW_EVENTS } from '@/services/analytics'

const SidebarFooter = (): ReactElement => {
  const chain = useCurrentChain()
  const hasBeamerConsent = useAppSelector((state) => hasConsentFor(state, CookieAndTermType.UPDATES))

  useEffect(() => {
    // Initialise Beamer when consent was previously given
    if (hasBeamerConsent && chain?.shortName) {
      loadBeamer(chain.shortName)
    }
  }, [hasBeamerConsent, chain?.shortName])

  return (
    <SidebarList>
      {!IS_PRODUCTION && (
        <>
          <ListItem disablePadding>
            <DebugToggle />
          </ListItem>

          <Divider flexItem />
        </>
      )}
      <Track {...OVERVIEW_EVENTS.HELP_CENTER}>
        <ListItem disablePadding>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://safe-support.protofire.io"
            style={{ width: '100%' }}
          >
            <SidebarListItemButton>
              <SidebarListItemIcon color="primary">
                <HelpCenterIcon />
              </SidebarListItemIcon>
              <SidebarListItemText data-testid="list-item-need-help" bold>
                Need help?
              </SidebarListItemText>
            </SidebarListItemButton>
          </a>
        </ListItem>
      </Track>
      <ListItem>
        <SidebarListItemText>
          <Typography variant="caption">
            Supported by{' '}
            <SvgIcon
              component={ProtofireLogo}
              inheritViewBox
              fontSize="small"
              sx={{ verticalAlign: 'middle', mx: 0.5 }}
            />
            <Link href="https://protofire.io" sx={{ color: darkPalette.primary.main, textDecoration: 'none' }}>
              Protofire
            </Link>
          </Typography>
        </SidebarListItemText>
      </ListItem>
    </SidebarList>

      // <Stack direction="row" alignItems="center" spacing={1} my={0.5} mx={1}>
      //   <IndexingStatus />

      //   <Box ml="auto !important">
      //     <Track {...OVERVIEW_EVENTS.WHATS_NEW}>
      //       <IconButton onClick={handleBeamer} id={BEAMER_SELECTOR} data-testid="list-item-whats-new" color="primary">
      //         <SvgIcon component={BeamerIcon} inheritViewBox fontSize="small" />
      //       </IconButton>
      //     </Track>
      //   </Box>

      //   <Track {...OVERVIEW_EVENTS.HELP_CENTER}>
      //     <IconButton href={HELP_CENTER_URL} target="_blank" data-testid="list-item-need-help" color="primary">
      //       <SvgIcon component={HelpCenterIcon} inheritViewBox fontSize="small" />
      //     </IconButton>
      //   </Track>
      // </Stack>
    // </>
  )
}

export default SidebarFooter
