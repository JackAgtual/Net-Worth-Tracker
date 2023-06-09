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

  return (
    <Box sx={{ flexGrow: 1, marginBottom: 3 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="h1" sx={{ flexGrow: 1 }}>
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
