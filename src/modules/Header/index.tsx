import { AppBar, Box, Toolbar, Typography } from '@material-ui/core'
import { useState } from 'react'
import styled from 'styled-components'

import { APP_NAME, VERSION } from 'common/constants'
import Menu from 'components/Menu'
import ToggleButton from 'components/ToggleButton'

const Version = styled(Typography)`
  margin-left: 0.5rem;
`

const Header = (): JSX.Element => {
  const [isMenuOpen, setMenuState] = useState(false)

  const handleMenuState = () => {
    setMenuState((prevState) => !prevState)
  }

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Box
          alignItems="center"
          display="flex"
          justifyContent="space-between"
          width="100%"
        >
          <Box alignItems="center" display="flex">
            <Typography variant="h6">{APP_NAME}</Typography>
            <Version variant="body2">v{VERSION}</Version>
          </Box>

          <ToggleButton onClick={handleMenuState} />
          <Menu open={isMenuOpen} />
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
