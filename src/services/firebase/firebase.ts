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

export default class FirebaseController {
  static #firebaseConfig = {
    apiKey: 'AIzaSyCS6CsSSJOjkhWDaByKtx4nf0qxKXFawWs',
    authDomain: 'net-worth-tracker-bab98.firebaseapp.com',
    projectId: 'net-worth-tracker-bab98',
    storageBucket: 'net-worth-tracker-bab98.appspot.com',
    messagingSenderId: '732921134415',
    appId: '1:732921134415:web:d13a317475e6b5f560993a',
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
