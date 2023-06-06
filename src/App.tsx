import { useEffect, useState } from 'react'
import FirebaseController from './services/firebase/firebase'
import { Unsubscribe, onSnapshot } from 'firebase/firestore'
import UserSelection from './components/UserSelection'
import InputData from './components/InputData'
import { Record, RecordData } from './types/data'
import NetWorthTable from './components/NetWorthTable'
import { Container } from '@mui/material'
import Header from './components/Header'

function App() {
  const firebaseController = FirebaseController()
  const [username, setUsername] = useState<string>('Jack')
  const [userId, setUserId] = useState<string>('8oOMP68ABVzWCfvGW7OM')
  const [userIsValid, setUserIsValid] = useState<boolean>(true)
  const [records, setRecrods] = useState<Record[]>([])

  useEffect(() => {
    let unsubscribeRecords: Unsubscribe
    ;(async () => {
      const tmpUserId = await firebaseController.getUserId(username)

      if (!tmpUserId) {
        setUserIsValid(false)
        setUserId('')
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
      <Header />
      <Container maxWidth="lg">
        <UserSelection
          username={username}
          setUsername={setUsername}
          usernameIsValid={userIsValid}
        />
        <InputData userId={userId} firebaseController={firebaseController} />
        {records.length > 0 && <NetWorthTable records={records} />}
      </Container>
    </>
  )
}

export default App
