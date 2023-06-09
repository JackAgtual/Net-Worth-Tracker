import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'

type HeaderProps = {
  userIsSignedIn: boolean
  resetUserData: () => void
}

export default function Header({ userIsSignedIn, resetUserData }: HeaderProps) {
  const navigate = useNavigate()

  const handleSignOut = () => {
    navigate('/')
    resetUserData()
  }

  const textJustifyContent = userIsSignedIn ? 'start' : { xs: 'center', sm: 'start' }

  return (
    <Box sx={{ flexGrow: 1, marginBottom: 3 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h5"
            component="h1"
            sx={{
              display: 'flex',
              flexGrow: 1,
              justifyContent: textJustifyContent,
            }}
          >
            Net Worth Tracker
          </Typography>
          <Box>
            {userIsSignedIn && (
              <Button
                onClick={handleSignOut}
                style={{ marginLeft: '20px' }}
                variant="outlined"
                color="inherit"
              >
                Sign Out
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
