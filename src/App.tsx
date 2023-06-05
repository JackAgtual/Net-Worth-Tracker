import { useEffect, useState } from 'react'
import FirebaseController from './services/firebase/firebase'
import { DocumentData, QuerySnapshot, Unsubscribe, onSnapshot } from 'firebase/firestore'
import UserSelection from './components/UserSelection'
import AssetLiabilityForm from './components/AssetLiabilityForm'

function App() {
  const firebaseController = FirebaseController()
  const [username, setUsername] = useState<string>('Jack')
  const [userId, setUserId] = useState<string>('8oOMP68ABVzWCfvGW7OM')
  const [userIsValid, setUserIsValid] = useState<boolean>(true)
  const [assets, setAssets] = useState<undefined | DocumentData[]>(undefined)
  const [liabilities, setLiabilities] = useState<undefined | DocumentData[]>(undefined)

  const setStateFromCollection = (
    collectionSnapshot: QuerySnapshot<DocumentData>,
    setState: React.Dispatch<React.SetStateAction<DocumentData[] | undefined>>
  ) => {
    setState(
      collectionSnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id }
      })
    )
  }

  useEffect(() => {
    let unsubscribeAssets: Unsubscribe
    let unsubscribeLiabilities: Unsubscribe
    ;(async () => {
      const tmpUserId = await firebaseController.getUserId(username)

      if (!tmpUserId) {
        setUserIsValid(false)
        setUserId('')
        setAssets([])
        setLiabilities([])
        return
      }

      const assetsCollection = await firebaseController.getUserAssetCollection(tmpUserId)
      unsubscribeAssets = onSnapshot(assetsCollection, (assetsSnapshot) => {
        setStateFromCollection(assetsSnapshot, setAssets)
      })

      const liabilitiesCollection = await firebaseController.getUserLiabilityCollection(
        tmpUserId
      )
      unsubscribeLiabilities = onSnapshot(
        liabilitiesCollection,
        (liabilitiesSnapshot) => {
          setStateFromCollection(liabilitiesSnapshot, setLiabilities)
        }
      )

      setUserIsValid(true)
      setUserId(tmpUserId)
    })()

    return () => {
      if (unsubscribeAssets) {
        unsubscribeAssets()
      }
      if (unsubscribeLiabilities) {
        unsubscribeLiabilities()
      }
    }
  }, [username])

  return (
    <>
      <h1>Net Worth Tracker</h1>
      <UserSelection
        username={username}
        setUsername={setUsername}
        usernameIsValid={userIsValid}
      />
      <AssetLiabilityForm userId={userId} firebaseController={firebaseController} />
    </>
  )
}

export default App
