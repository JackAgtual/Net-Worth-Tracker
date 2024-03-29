import { useState } from 'react'
import { Typography, TextField, Button, Stack, Box } from '@mui/material'
import FirebaseController from '../services/firebase/firebase'
import LocalStorageController from '../utils/localStorageUtils'
import { useNavigate } from 'react-router-dom'
import { formStyles } from '../styles/loginStyles'
import BackToNewOrExisting from './BackToNewOrExisting'
import LoginPaper from './LoginPaper'

type CreateUserProps = {
  setUsername: React.Dispatch<React.SetStateAction<string>>
  setUserId: React.Dispatch<React.SetStateAction<string>>
  setUserIsValid: React.Dispatch<React.SetStateAction<boolean>>
}

function CreateUser({ setUsername, setUserId, setUserIsValid }: CreateUserProps) {
  const navigate = useNavigate()
  const [newUsername, setNewUsername] = useState('')
  const [userAlreadyExists, setUserAlreadyExists] = useState(false)

  const createNewuser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const existingUserId = await FirebaseController.getUserId(newUsername)

    if (existingUserId) {
      setUserAlreadyExists(true)
      return
    }

    setUserAlreadyExists(false)
    const newUserId = await FirebaseController.addUser(newUsername)
    setUsername(newUsername)
    setUserId(newUserId)
    setUserIsValid(true)
    LocalStorageController.saveUser(newUsername)
    navigate('/home')
  }

  return (
    <LoginPaper>
      <BackToNewOrExisting />
      <Box sx={formStyles}>
        <form onSubmit={createNewuser}>
          <Stack spacing={2}>
            <Typography variant="h5" component="h2" sx={{ textAlign: 'center' }}>
              Enter a username to sign in with next time
            </Typography>
            <TextField
              size="small"
              label="Username"
              type="text"
              onChange={(e) => setNewUsername(e.target.value)}
              required
              error={userAlreadyExists}
              helperText={userAlreadyExists ? 'User already exists' : ''}
            />
            <Button type="submit" variant="outlined">
              Create account
            </Button>
          </Stack>
        </form>
      </Box>
    </LoginPaper>
  )
}

export default CreateUser
