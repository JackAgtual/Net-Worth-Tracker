import Login from './components/Login'
import Home from './components/Home'
import NewOrExistingUser from './components/NewOrExistingUser'
import CreateUser from './components/CreateUser'
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
        <Route path="/" element={<NewOrExistingUser />} />
        <Route
          path="/userlogin"
          element={<Login setUsername={setUsername} setUserIsValid={setUserIsValid} />}
        />
        <Route
          path="/createuser"
          element={
            <CreateUser
              setUsername={setUsername}
              setUserId={setUserId}
              setUserIsValid={setUserIsValid}
            />
          }
        />
      </Routes>
    </>
  )
}

export default App
