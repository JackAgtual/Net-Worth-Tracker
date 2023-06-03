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
        <label>
          Username:
          <input type="text" onChange={(e) => setNewUsername(e.target.value)} />
        </label>
        <button type="submit">Set user</button>
      </form>
      <p>Current user: {usernameIsValid ? username : `${username} (invalid)`}</p>
    </>
  )
}

export default UserSelection
