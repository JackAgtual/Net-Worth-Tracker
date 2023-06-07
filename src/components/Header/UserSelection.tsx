import { Button, TextField, Box } from '@mui/material'
import { useState, useRef } from 'react'

type UserSelectionProps = {
  setUsername: React.Dispatch<React.SetStateAction<string>>
  setSignInModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function UserSelection({ setUsername, setSignInModalOpen }: UserSelectionProps) {
  const [newUsername, setNewUsername] = useState('')
  const usernameField = useRef<HTMLInputElement>(null)

  const handleUsernameChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSignInModalOpen(false)
    setUsername(newUsername)
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
