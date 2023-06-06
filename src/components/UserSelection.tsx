import { Button, TextField } from '@mui/material'
import { useState } from 'react'

type UserSelectionProps = {
  setUsername: React.Dispatch<React.SetStateAction<string>>
  setSignInModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}
function UserSelection({ setUsername, setSignInModalOpen }: UserSelectionProps) {
  const [newUsername, setNewUsername] = useState('')

  const handleUsernameChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSignInModalOpen(false)
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
    </>
  )
}

export default UserSelection
