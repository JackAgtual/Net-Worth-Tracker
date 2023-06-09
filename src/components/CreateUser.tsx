import { useState } from 'react'
import { Typography, TextField, Button, Stack } from '@mui/material'
import FirebaseController from '../services/firebase/firebase'
import { useNavigate } from 'react-router-dom'

const firebaseController = FirebaseController()

function CreateUser() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [userAlreadyExists, setUserAlreadyExists] = useState(false)

  const createNewuser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newUserId = await firebaseController.getUserId(username)

    if (newUserId) {
      setUserAlreadyExists(true)
      return
    }
    // TODO: Set username, user id, user is valid
    // FIXME: Error: uncaught (in promise) somethign went wrong
    setUserAlreadyExists(false)
    firebaseController.addUser(username)
    navigate('/home')
  }

  return (
    <form onSubmit={createNewuser}>
      <Stack spacing={2}>
        <Typography variant="h5" component="h2" sx={{ textAlign: 'center' }}>
          Enter a username to sign in with next time
        </Typography>
        <TextField
          size="small"
          label="Username"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          required
          error={userAlreadyExists}
          helperText={userAlreadyExists ? 'User already exists' : ''}
        />
        <Button type="submit" variant="outlined">
          Create account
        </Button>
      </Stack>
    </form>
  )
}

export default CreateUser
