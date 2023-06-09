import { useEffect } from 'react'
import FirebaseController from './services/firebase/firebase'
import { Unsubscribe, onSnapshot } from 'firebase/firestore'
import InputData from './components/InputData'
import { Record, RecordData } from './types/data'
import NetWorthTable from './components/NetWorthTable'
import { Container, Typography } from '@mui/material'

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
  const firebaseController = FirebaseController()
  // Hooks: Get data, set data (use setter in AssetLiabilityForm)

  useEffect(() => {
    let unsubscribeRecords: Unsubscribe
    const getRecords = async () => {
      const tmpUserId = await firebaseController.getUserId(username)

      if (!tmpUserId) {
        resetUserData()
        return
      }

      const recordsCollecitonRef =
        firebaseController.getUserRecordsCollectionRef(tmpUserId)
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
      <Typography variant="h6" component="h3">
        Welcome, {username}
      </Typography>
      <InputData userId={userId} firebaseController={firebaseController} />
      {records.length > 0 && <NetWorthTable records={records} setRecords={setRecords} />}
    </Container>
  )
}

export default Home
