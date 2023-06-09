import UserSelection from './Header/UserSelection'
import { Paper } from '@mui/material'

const loginPaperStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  borderRadius: '10px',
  boxShadow: 20,
  px: 10,
  py: 5,
}

type LoginProps = {
  setUsername: React.Dispatch<React.SetStateAction<string>>
  setUserIsValid: React.Dispatch<React.SetStateAction<boolean>>
}

function Login({ setUsername, setUserIsValid }: LoginProps) {
  return (
    <Paper sx={loginPaperStyle}>
      <UserSelection setUsername={setUsername} setUserIsValid={setUserIsValid} />
    </Paper>
  )
}

export default Login
