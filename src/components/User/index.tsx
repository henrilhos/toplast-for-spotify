import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { useContext } from 'react'

import * as S from './styles'
import { SpotifyContext } from 'contexts/Spotify'

function User() {
  const { user, setToken } = useContext(SpotifyContext)

  function logout() {
    if (setToken) setToken('')
  }

  return (
    <Box display="flex" alignItems="center">
      <S.Avatar alt={user?.name} src={user?.image} />
      <Typography variant="body1" color="secondary">
        {user?.name}
      </Typography>

      <S.Logout>
        <IconButton size="small" onClick={logout} color="secondary">
          <ExitToAppIcon fontSize="inherit" />
        </IconButton>
      </S.Logout>
    </Box>
  )
}

export default User
