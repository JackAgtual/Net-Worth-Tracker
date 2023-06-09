import { useState } from 'react'
import { Typography, TextField, Button, Stack } from '@mui/material'
import FirebaseController from '../services/firebase/firebase'

const firebaseController = FirebaseController()

function CreateUser() {
  const [username, setUsername] = useState('')
  const [userAlreadyExists, setUserAlreadyExists] = useState(false)

  const createNewuser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newUserId = await firebaseController.getUserId(username)

    if (newUserId) {
      setUserAlreadyExists(true)
      return
    }
    setUserAlreadyExists(false)
    firebaseController.addUser(username)
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
