import { Button, TextField, Stack, Typography, Box, Autocomplete } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FirebaseController from '../services/firebase/firebase'
import { formStyles } from '../styles/loginStyles'
import BackToNewOrExisting from './BackToNewOrExisting'
import LoginPaper from './LoginPaper'

type LoginProps = {
  setUsername: React.Dispatch<React.SetStateAction<string>>
  setUserIsValid: React.Dispatch<React.SetStateAction<boolean>>
}

function Login({ setUsername, setUserIsValid }: LoginProps) {
  const [newUsername, setNewUsername] = useState('')
  const [inputtedUserIsValid, setInputtedUserIsValid] = useState(false)
  const [existingUsers, setExistingUsers] = useState<string[]>([])

  const navigate = useNavigate()

  useEffect(() => {
    const getAllUsers = async () => {
      const allUsers = await FirebaseController.getAllUsernames()
      setExistingUsers(allUsers)
    }
    getAllUsers()
  }, [])

  const handleUsernameChange = (value: string | null) => {
    if (!value || !existingUsers.includes(value)) {
      setInputtedUserIsValid(false)
      return
    }
    setInputtedUserIsValid(true)
    setNewUsername(value)
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!inputtedUserIsValid) return

    setUserIsValid(true)
    setUsername(newUsername)
    navigate('/home')
  }

  return (
    <LoginPaper>
      <BackToNewOrExisting />
      <Box sx={formStyles}>
        <form onSubmit={handleFormSubmit}>
          <Stack spacing={2}>
            <Typography variant="h5" component="h2" sx={{ textAlign: 'center' }}>
              Enter your username to track your net worth
            </Typography>
            <Autocomplete
              onChange={(_, value) => handleUsernameChange(value)}
              disablePortal
              id="combo-box-demo"
              options={existingUsers}
              renderInput={(params) => (
                <TextField required {...params} label="Username" />
              )}
            />
            <Button type="submit" variant="outlined">
              Set user
            </Button>
          </Stack>
        </form>
      </Box>
    </LoginPaper>
  )
}

export default Login
