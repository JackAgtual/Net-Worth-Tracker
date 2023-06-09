import { IconButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { backButtonStyles } from '../styles/loginStyles'
import { useNavigate } from 'react-router-dom'

function BackToNewOrExisting() {
  const navigage = useNavigate()

  const handleBackButtonClick = () => {
    navigage('/')
  }

  return (
    <IconButton sx={backButtonStyles} onClick={handleBackButtonClick}>
      <ArrowBackIcon />
    </IconButton>
  )
}

export default BackToNewOrExisting
