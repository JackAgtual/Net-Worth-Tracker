import { Paper } from '@mui/material'
import { ReactNode } from 'react'

export const loginPaperStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  borderRadius: '10px',
  boxShadow: 20,
  px: 10,
  py: 5,
}

type LoginPaperProps = {
  children: ReactNode
}

function LoginPaper({ children }: LoginPaperProps) {
  return (
    <>
      <Paper sx={loginPaperStyle}>{children}</Paper>
    </>
  )
}

export default LoginPaper
