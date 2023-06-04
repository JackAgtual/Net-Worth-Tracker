import { Button, TextField } from '@mui/material'
import { useState } from 'react'

type UserSelectionProps = {
  username: string
  setUsername: React.Dispatch<React.SetStateAction<string>>
  usernameIsValid: boolean
}
function UserSelection({ username, setUsername, usernameIsValid }: UserSelectionProps) {
  const [newUsername, setNewUsername] = useState('')

  const handleUsernameChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setUsername(newUsername)
  }
  return (
    <>
      <form onSubmit={handleUsernameChange}>
        <TextField
          size="small"
          label="Username"
          type="text"
          onChange={(e) => setNewUsername(e.target.value)}
        />
        <Button type="submit" variant="outlined">
          Set user
        </Button>
      </form>
      <p>Current user: {usernameIsValid ? username : `${username} (invalid)`}</p>
    </>
  )
}

export default UserSelection
