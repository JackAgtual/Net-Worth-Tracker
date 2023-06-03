import { useEffect, useState } from 'react'
import FirebaseController from './services/firebase/firebase'
import { DocumentData, Unsubscribe, onSnapshot } from 'firebase/firestore'

const firebaseController = FirebaseController()

function App() {
  const [assets, setAssets] = useState<undefined | DocumentData[]>(undefined)

  useEffect(() => {
    let unsubscribe: Unsubscribe
    ;(async () => {
      const assetsCollection = await firebaseController.getUserAssetCollection('Jack')
      unsubscribe = onSnapshot(assetsCollection, (assetsSnapshot) => {
        setAssets(
          assetsSnapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id }
          })
        )
      })
    })()

    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [])

  return (
    <>
      <h1>Net Worth Tracker</h1>
      <h2>Assets</h2>
      <ul>
        {assets?.map((asset) => {
          return (
            <li key={asset.id}>
              {asset.name}: ${asset.amount}
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default App
