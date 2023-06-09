import Login from './components/Login'
import Home from './Home'
import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Header from './components/Header'
import { Record } from './types/data'

function App() {
  const [username, setUsername] = useState<string>('')
  const [userIsValid, setUserIsValid] = useState<boolean>(false)
  const [userId, setUserId] = useState<string>('')
  const [records, setRecrods] = useState<Record[]>([])

  const resetUserData = () => {
    setUsername('')
    setUserId('')
    setUserIsValid(false)
    setRecrods([])
  }

  return (
    <>
      <Header userIsSignedIn={userIsValid} resetUserData={resetUserData} />
      <Routes>
        <Route
          path="/home"
          element={
            <Home
              username={username}
              userId={userId}
              setUserId={setUserId}
              records={records}
              setRecords={setRecrods}
              resetUserData={resetUserData}
            />
          }
        />
        <Route
          path="/"
          element={<Login setUsername={setUsername} setUserIsValid={setUserIsValid} />}
        />
      </Routes>
    </>
  )
}

export default App
