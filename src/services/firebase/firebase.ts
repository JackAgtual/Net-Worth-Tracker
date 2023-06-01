import { initializeApp } from 'firebase/app'
import { getFirestore, getDoc, doc } from 'firebase/firestore'

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

  const fetchTestData = async () => {
    const docRef = doc(db, '/test/We9NP5rry1Rficsj1Jmo')
    const snapshot = await getDoc(docRef)
    return snapshot.data()
  }

  return {
    fetchTestData,
  }
}
