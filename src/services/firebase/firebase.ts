import { initializeApp } from 'firebase/app'
import {
  collection,
  getFirestore,
  getDocs,
  where,
  query,
  addDoc,
} from 'firebase/firestore'
import { Data } from '../../types/data'
import { calculateNetWorth } from '../../utils/finance'

export type FirebaseControllerType = ReturnType<typeof FirebaseController>

type RecordPayload = {
  userId: string
  date: Date
  assets: Data[]
  liabilities: Data[]
}

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

  const usernameIsValid = async (username: string) => {
    const userQuery = query(usersRef, where('username', '==', username))
    const userSnapshot = await getDocs(userQuery)
    return !userSnapshot.empty
  }

  const addUser = async (username: string) => {
    const docData = await addDoc(usersRef, { username })
    return docData.id
  }

  const getUserRecordsCollectionRef = (userId: string) => {
    return collection(db, `users/${userId}/records`)
  }

  const addRecordToUser = async ({
    userId,
    date,
    assets,
    liabilities,
  }: RecordPayload) => {
    const recordsCollectionRef = getUserRecordsCollectionRef(userId)
    const displayDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
    const netWorth = calculateNetWorth(assets, liabilities)
    addDoc(recordsCollectionRef, { date, netWorth, displayDate, assets, liabilities })
  }

  return {
    getUserId,
    usernameIsValid,
    addUser,
    getUserRecordsCollectionRef,
    addRecordToUser,
  }
}
