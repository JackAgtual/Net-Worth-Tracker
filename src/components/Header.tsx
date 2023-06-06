import { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import SignInModal from './SignInModal'

type HeaderProps = {
  userIsSignedIn: boolean
  setUsername: React.Dispatch<React.SetStateAction<string>>
  resetUserData: () => void
}

export default function Header({
  userIsSignedIn,
  setUsername,
  resetUserData,
}: HeaderProps) {
  const [signInModalOpen, setSignInModalOpen] = useState(false)

  const handleSignOut = () => {
    resetUserData()
    setSignInModalOpen(false)
  }

  return (
    <Box sx={{ flexGrow: 1, marginBottom: 3 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="h1" sx={{ flexGrow: 1 }}>
            Net Worth Tracker
          </Typography>
          <Box>
            <Button variant="outlined" color="inherit">
              Record Net Worth
            </Button>
            {userIsSignedIn ? (
              <Button
                onClick={handleSignOut}
                style={{ marginLeft: '20px' }}
                variant="outlined"
                color="inherit"
              >
                Sign Out
              </Button>
            ) : (
              <Button
                onClick={() => setSignInModalOpen(true)}
                style={{ marginLeft: '20px' }}
                variant="outlined"
                color="inherit"
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <SignInModal
        signInModalOpen={signInModalOpen}
        setUsername={setUsername}
        setSignInModalOpen={setSignInModalOpen}
      />
    </Box>
  )
}
