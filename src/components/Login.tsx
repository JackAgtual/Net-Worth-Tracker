import { Button, TextField, Stack, Typography } from '@mui/material'
import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Paper } from '@mui/material'
import FirebaseController from '../services/firebase/firebase'

const loginPaperStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  borderRadius: '10px',
  boxShadow: 20,
  px: 10,
  py: 5,
}

const firebaseController = FirebaseController()

type LoginProps = {
  setUsername: React.Dispatch<React.SetStateAction<string>>
  setUserIsValid: React.Dispatch<React.SetStateAction<boolean>>
}

function Login({ setUsername, setUserIsValid }: LoginProps) {
  const [newUsername, setNewUsername] = useState('')
  const [newUserIsValid, setNewUserIsValid] = useState(true)

  const usernameField = useRef<HTMLInputElement>(null)
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
    <Paper sx={loginPaperStyle}>
      <form onSubmit={handleUsernameChange}>
        <Stack spacing={2}>
          <Typography variant="h5" component="h2" sx={{ textAlign: 'center' }}>
            Enter your username to track your net worth
          </Typography>
          <TextField
            ref={usernameField}
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
    </Paper>
  )
}

export default Login
