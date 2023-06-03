import { initializeApp } from 'firebase/app'
import { collection, getFirestore, getDocs, where, query } from 'firebase/firestore'

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

  const _getUserId = async (username: string) => {
    const userQuery = query(usersRef, where('username', '==', username))
    const userSnapshot = await getDocs(userQuery)
    return userSnapshot.docs[0].id
  }

  const getUserAssetCollection = async (username: string) => {
    const userId = await _getUserId(username)
    return collection(db, `users/${userId}/assets`)
  }

  const getUserLiabilityCollection = async (username: string) => {
    const userId = await _getUserId(username)
    return collection(db, `users/${userId}/liabilities`)
  }

  return {
    getUserAssetCollection,
    getUserLiabilityCollection,
  }
}
