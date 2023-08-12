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

type RecordPayload = {
  userId: string
  date: Date
  assets: Data[]
  liabilities: Data[]
}

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY
const authDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN
const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID
const storageBucket = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET
const messagingSenderId = import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID
const appId = import.meta.env.VITE_FIREBASE_APP_ID

export default class FirebaseController {
  static #firebaseConfig = {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
  }

  static #app = initializeApp(this.#firebaseConfig)
  static #db = getFirestore(this.#app)
  static #usersRef = collection(this.#db, 'users')

  static getUserId = async (username: string) => {
    const userQuery = query(this.#usersRef, where('username', '==', username))
    const userSnapshot = await getDocs(userQuery)
    try {
      return userSnapshot.docs[0].id
    } catch {
      return null
    }
  }

  static getAllUsernames = async () => {
    const usersQuery = query(this.#usersRef)
    const usersSnapshot = await getDocs(usersQuery)
    return usersSnapshot.docs.map((user) => {
      const data = user.data()
      return data.username
    })
  }

  static usernameIsValid = async (username: string) => {
    const userQuery = query(this.#usersRef, where('username', '==', username))
    const userSnapshot = await getDocs(userQuery)
    return !userSnapshot.empty
  }

  static addUser = async (username: string) => {
    const docData = await addDoc(this.#usersRef, { username })
    return docData.id
  }

  static getUserRecordsCollectionRef = (userId: string) => {
    return collection(this.#db, `users/${userId}/records`)
  }

  static addRecordToUser = async ({
    userId,
    date,
    assets,
    liabilities,
  }: RecordPayload) => {
    const recordsCollectionRef = this.getUserRecordsCollectionRef(userId)
    const displayDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
    const netWorth = calculateNetWorth(assets, liabilities)
    addDoc(recordsCollectionRef, { date, netWorth, displayDate, assets, liabilities })
  }
}
