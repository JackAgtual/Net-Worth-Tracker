import Login from './components/Login'
import Home from './Home'
import NewOrExistingUser from './components/NewOrExistingUser'
import CreateUser from './components/CreateUser'
import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Header from './components/Header'
import { Record } from './types/data'
import LoginPaper from './components/LoginPaper'

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
          element={
            <LoginPaper>
              <NewOrExistingUser />
            </LoginPaper>
          }
        />
        <Route
          path="/userlogin"
          element={
            <LoginPaper>
              <Login setUsername={setUsername} setUserIsValid={setUserIsValid} />
            </LoginPaper>
          }
        />
        <Route
          path="/createuser"
          element={
            <LoginPaper>
              <CreateUser
                setUsername={setUsername}
                setUserId={setUserId}
                setUserIsValid={setUserIsValid}
              />
            </LoginPaper>
          }
        />
      </Routes>
    </>
  )
}

export default App
