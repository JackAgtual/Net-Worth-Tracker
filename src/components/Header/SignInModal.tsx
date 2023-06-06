import { Modal, Box } from '@mui/material'
import UserSelection from './UserSelection'

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

  return (
    <Modal open={signInModalOpen}>
      <Box sx={modalStyle}>
        <UserSelection
          setUsername={setUsername}
          setSignInModalOpen={setSignInModalOpen}
        />
      </Box>
    </Modal>
  )
}

export default SignInModal
