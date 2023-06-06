import { useEffect, useState } from 'react'
import FirebaseController from './services/firebase/firebase'
import { Unsubscribe, onSnapshot } from 'firebase/firestore'
import InputData from './components/InputData'
import { Record, RecordData } from './types/data'
import NetWorthTable from './components/NetWorthTable'
import { Container, Typography } from '@mui/material'
import Header from './components/Header'

function App() {
  const firebaseController = FirebaseController()
  const [username, setUsername] = useState<string>('')
  const [userId, setUserId] = useState<string>('')
  const [userIsValid, setUserIsValid] = useState<boolean>(false)
  const [records, setRecrods] = useState<Record[]>([])

  const resetUserData = () => {
    setUsername('')
    setUserId('')
    setUserIsValid(false)
    setRecrods([])
  }

  useEffect(() => {
    let unsubscribeRecords: Unsubscribe
    ;(async () => {
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
        setRecrods(tmpRecords)
      })

      setUserIsValid(true)
      setUserId(tmpUserId)
    })()

    return () => {
      if (unsubscribeRecords) {
        unsubscribeRecords()
      }
    }
  }, [username])

  return (
    <>
      <Header
        userIsSignedIn={userIsValid}
        setUsername={setUsername}
        resetUserData={resetUserData}
      />
      <Container maxWidth="lg">
        {userIsValid && (
          <Typography variant="h6" component="h3">
            Welcome, {username}
          </Typography>
        )}
        <InputData userId={userId} firebaseController={firebaseController} />
        {records.length > 0 && <NetWorthTable records={records} />}
      </Container>
    </>
  )
}

export default App
