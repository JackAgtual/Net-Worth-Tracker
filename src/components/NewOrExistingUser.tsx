import { Button, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

function NewOrExistingUser() {
  const navigate = useNavigate()
  const routeToUserSignIn = () => navigate('/userlogin')

  const routeToCreateuser = () => navigate('/createuser')

  return (
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
  )
}

export default NewOrExistingUser
