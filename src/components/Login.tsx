import UserSelection from './Header/UserSelection'
import { Paper, Box, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  borderRadius: '3px',
  boxShadow: 24,
  p: 10,
}

type LoginProps = {
  setUsername: React.Dispatch<React.SetStateAction<string>>
  setUserIsValid: React.Dispatch<React.SetStateAction<boolean>>
}

function Login({ setUsername, setUserIsValid }: LoginProps) {
  return (
    <Paper sx={modalStyle}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <UserSelection setUsername={setUsername} setUserIsValid={setUserIsValid} />
      </Box>
    </Paper>
  )
}

export default Login
