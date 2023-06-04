import { initializeApp } from 'firebase/app'
import {
  collection,
  getFirestore,
  getDocs,
  where,
  query,
  addDoc,
} from 'firebase/firestore'

export type FirebaseControllerType = ReturnType<typeof FirebaseController>

export default function FirebaseController() {
  const firebaseConfig = {
    apiKey: 'AIzaSyCS6CsSSJOjkhWDaByKtx4nf0qxKXFawWs',
    authDomain: 'net-worth-tracker-bab98.firebaseapp.com',
    projectId: 'net-worth-tracker-bab98',
    storageBucket: 'net-worth-tracker-bab98.appspot.com',
    messagingSenderId: '732921134415',
    appId: '1:732921134415:web:d13a317475e6b5f560993a',
  }

  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)
  const usersRef = collection(db, 'users')

  const getUserId = async (username: string) => {
    const userQuery = query(usersRef, where('username', '==', username))
    const userSnapshot = await getDocs(userQuery)
    try {
      return userSnapshot.docs[0].id
    } catch {
      return null
    }
  }

  const getUserAssetCollection = async (userId: string) => {
    return collection(db, `users/${userId}/assets`)
  }

  const getUserLiabilityCollection = async (userId: string) => {
    return collection(db, `users/${userId}/liabilities`)
  }

  const addDocumentToUserAssets = async (
    userId: string,
    document: { name: string; amount: number }
  ) => {
    // TODO: import document data type
    const assetCollection = await getUserAssetCollection(userId)
    addDoc(assetCollection, document)
  }

  const addDocumentToUserLiabilities = async (
    userId: string,
    document: { name: string; amount: number }
  ) => {
    // TODO: import document data type
    const liabilitiesColection = await getUserLiabilityCollection(userId)
    addDoc(liabilitiesColection, document)
  }

  return {
    getUserId,
    getUserAssetCollection,
    getUserLiabilityCollection,
    addDocumentToUserAssets,
    addDocumentToUserLiabilities,
  }
}
