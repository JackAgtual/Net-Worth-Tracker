import { useEffect } from 'react'
import FirebaseController from '../services/firebase/firebase'
import { Unsubscribe, onSnapshot } from 'firebase/firestore'
import InputData from './InputData'
import { Record, RecordData } from '../types/data'
import NetWorthTable from './NetWorthTable'
import { Container, Typography, Box } from '@mui/material'
import Plot from './Plot'

type HomeProps = {
  username: string
  userId: string
  setUserId: React.Dispatch<React.SetStateAction<string>>
  records: Record[]
  setRecords: React.Dispatch<React.SetStateAction<Record[]>>
  resetUserData: () => void
}

function Home({
  username,
  userId,
  setUserId,
  records,
  setRecords,
  resetUserData,
}: HomeProps) {
  useEffect(() => {
    let unsubscribeRecords: Unsubscribe
    const getRecords = async () => {
      const tmpUserId = await FirebaseController.getUserId(username)

      if (!tmpUserId) {
        resetUserData()
        return
      }

      const recordsCollecitonRef =
        FirebaseController.getUserRecordsCollectionRef(tmpUserId)
      unsubscribeRecords = onSnapshot(recordsCollecitonRef, (recordsSnapshot) => {
        const tmpRecords: Record[] = []

        recordsSnapshot.forEach((record) => {
          const recordId = record.id
          const recordData = record.data() as RecordData
          tmpRecords.push({ id: recordId, ...recordData })
        })
        setRecords(tmpRecords)
      })

      setUserId(tmpUserId)
    }
    getRecords()

    return () => {
      if (unsubscribeRecords) {
        unsubscribeRecords()
      }
    }
  }, [username])

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography
          sx={{ textAlign: { xs: 'center', sm: 'left' } }}
          variant="h6"
          component="h3"
        >
          Welcome, {username}
        </Typography>
        {records.length == 0 && (
          <Typography
            variant="h6"
            component="p"
            sx={{ textAlign: { xs: 'center', sm: 'left' } }}
          >
            It looks like you don't have any existing records. Record your net worth to
            get started.
          </Typography>
        )}
        <InputData userId={userId} />
      </Box>
      {records.length > 0 && (
        <>
          <Typography
            sx={{ textAlign: { xs: 'center', sm: 'start' } }}
            component="h1"
            variant="h3"
          >
            Your Net Worth Over Time
          </Typography>
          <Plot records={records} />
          <NetWorthTable records={records} setRecords={setRecords} />
        </>
      )}
    </Container>
  )
}

export default Home
