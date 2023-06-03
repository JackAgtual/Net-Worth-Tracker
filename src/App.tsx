import { useEffect, useState } from 'react'
import FirebaseController from './services/firebase/firebase'
import { DocumentData, Unsubscribe, onSnapshot } from 'firebase/firestore'
import UserSelection from './components/UserSelection'

const firebaseController = FirebaseController()

function App() {
  const [username, setUsername] = useState<string>('Jack')
  const [userIsValid, setUserIsValid] = useState<boolean>(true)
  const [assets, setAssets] = useState<undefined | DocumentData[]>(undefined)
  const [liabilities, setLiabilities] = useState<undefined | DocumentData[]>(undefined)

  useEffect(() => {
    let unsubscribeAssets: Unsubscribe
    let unsubscribeLiabilities: Unsubscribe
    ;(async () => {
      const userId = await firebaseController.getUserId(username)

      if (!userId) {
        setUserIsValid(false)
        setAssets([])
        setLiabilities([])
        return
      }
      setUserIsValid(true)

      const assetsCollection = await firebaseController.getUserAssetCollection(userId)
      unsubscribeAssets = onSnapshot(assetsCollection, (assetsSnapshot) => {
        setAssets(
          assetsSnapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id }
          })
        )
      })

      const liabilitiesCollection = await firebaseController.getUserLiabilityCollection(
        userId
      )
      unsubscribeLiabilities = onSnapshot(
        liabilitiesCollection,
        (liabilitiesSnapshot) => {
          setLiabilities(
            liabilitiesSnapshot.docs.map((doc) => {
              return { ...doc.data(), id: doc.id }
            })
          )
        }
      )
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
      <h2>Assets</h2>
      <ul>
        {assets
          ? assets?.map((asset) => {
              return (
                <li key={asset.id}>
                  {asset.name}: ${asset.amount}
                </li>
              )
            })
          : 'Loading...'}
      </ul>
      <h2>Liabilities</h2>
      <ul>
        {liabilities
          ? liabilities?.map((liability) => {
              return (
                <li key={liability.id}>
                  {liability.name}: ${liability.amount}
                </li>
              )
            })
          : 'Loading...'}
      </ul>
    </>
  )
}

export default App
