import { Paper } from '@mui/material'
import { ReactNode } from 'react'
import { loginPaperStyle } from '../styles/loginStyles'

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
