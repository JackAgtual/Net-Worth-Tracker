import { Modal, Box, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import UserSelection from './UserSelection'

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '3px',
}

type SignInModalProps = {
  signInModalOpen: boolean
  setUsername: React.Dispatch<React.SetStateAction<string>>
  setSignInModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function SignInModal({
  signInModalOpen,
  setUsername,
  setSignInModalOpen,
}: SignInModalProps) {
  const handleCloseModal = () => {
    setSignInModalOpen(false)
    setUsername('')
  }

  return (
    <Modal open={signInModalOpen}>
      <Box sx={modalStyle}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton onClick={handleCloseModal}>
            <CloseIcon />
          </IconButton>
        </Box>
        <UserSelection
          setUsername={setUsername}
          setSignInModalOpen={setSignInModalOpen}
        />
      </Box>
    </Modal>
  )
}

export default SignInModal
