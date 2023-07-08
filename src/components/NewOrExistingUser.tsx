import { Button, Stack, Typography, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { newOrExistingUserStyles } from '../styles/loginStyles'
import LoginPaper from './LoginPaper'

function NewOrExistingUser() {
  const navigate = useNavigate()
  const routeToUserSignIn = () => navigate('/userlogin')

  const routeToCreateuser = () => navigate('/createuser')

  return (
    <LoginPaper>
      <Box sx={newOrExistingUserStyles}>
        <Stack spacing={2}>
          <Typography textAlign="center" variant="h5">
            I am a
          </Typography>
          <Button size="large" variant="outlined" onClick={routeToUserSignIn}>
            Exising user
          </Button>
          <Button size="large" variant="outlined" onClick={routeToCreateuser}>
            New User
          </Button>
        </Stack>
      </Box>
    </LoginPaper>
  )
}

export default NewOrExistingUser
