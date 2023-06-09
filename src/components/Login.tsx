import { Button, TextField, Stack, Typography, Box } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FirebaseController from '../services/firebase/firebase'
import { formStyles } from '../styles/loginStyles'
import BackToNewOrExisting from './BackToNewOrExisting'

const firebaseController = FirebaseController()

type LoginProps = {
  setUsername: React.Dispatch<React.SetStateAction<string>>
  setUserIsValid: React.Dispatch<React.SetStateAction<boolean>>
}

function Login({ setUsername, setUserIsValid }: LoginProps) {
  const [newUsername, setNewUsername] = useState('')
  const [newUserIsValid, setNewUserIsValid] = useState(true)

  const navigate = useNavigate()

  const handleUsernameChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const isValid = await firebaseController.usernameIsValid(newUsername)

    if (!isValid) {
      setNewUserIsValid(false)
      return
    }

    setNewUserIsValid(true)
    setUserIsValid(true)
    setUsername(newUsername)
    navigate('/home')
  }

  return (
    <>
      <BackToNewOrExisting />
      <Box sx={formStyles}>
        <form onSubmit={handleUsernameChange}>
          <Stack spacing={2}>
            <Typography variant="h5" component="h2" sx={{ textAlign: 'center' }}>
              Enter your username to track your net worth
            </Typography>
            <TextField
              size="small"
              label="Username"
              type="text"
              onChange={(e) => setNewUsername(e.target.value)}
              required
              error={!newUserIsValid}
              helperText={!newUserIsValid ? 'Invalid username' : ''}
            />
            <Button type="submit" variant="outlined">
              Set user
            </Button>
          </Stack>
        </form>
      </Box>
    </>
  )
}

export default Login
