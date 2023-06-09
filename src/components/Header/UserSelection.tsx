import { Button, TextField, Box } from '@mui/material'
import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

type UserSelectionProps = {
  setUsername: React.Dispatch<React.SetStateAction<string>>
  setUserIsValid: React.Dispatch<React.SetStateAction<boolean>>
}

function UserSelection({ setUsername, setUserIsValid }: UserSelectionProps) {
  const [newUsername, setNewUsername] = useState('')
  const usernameField = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const handleUsernameChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // TODO: validate username
    setUserIsValid(true)
    setUsername(newUsername)
    navigate('/home')
  }
  return (
    <>
      <form onSubmit={handleUsernameChange}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            ref={usernameField}
            sx={{ mr: 2 }}
            size="small"
            label="Username"
            type="text"
            onChange={(e) => setNewUsername(e.target.value)}
          />
          <Button type="submit" variant="outlined">
            Set user
          </Button>
        </Box>
      </form>
    </>
  )
}

export default UserSelection
