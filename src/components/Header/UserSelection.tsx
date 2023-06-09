import { Button, TextField, Stack, Typography } from '@mui/material'
import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import FirebaseController from '../../services/firebase/firebase'

const firebaseController = FirebaseController()

type UserSelectionProps = {
  setUsername: React.Dispatch<React.SetStateAction<string>>
  setUserIsValid: React.Dispatch<React.SetStateAction<boolean>>
}

function UserSelection({ setUsername, setUserIsValid }: UserSelectionProps) {
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
    <>
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
    </>
  )
}

export default UserSelection
