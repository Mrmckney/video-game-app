import { FC, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { SearchGames } from './components/SearchGame'
import { Login } from './components/Login'
import { NavBar } from './components/NavBar'
import { User } from './services/appInterfaces'
import { Alert } from '@mui/material'
import './App.css'



const App: FC = () =>  {
  const [user, setUser] = useState<User>({username: '', password: ''})
  const [errorPopUp, setErrorPopUp] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  return (
    <div className="App">
      <NavBar user={user}/>
      {errorPopUp && <Alert severity='error' onClose={() => {setErrorPopUp(false)}}>{errorMessage}</Alert>}
      <Routes>
        <Route path='/' element={<SearchGames setErrorPopUp={setErrorPopUp} setErrorMessage={setErrorMessage}/>}/>
        <Route path='/login' element={<Login />}/>
      </Routes>
    </div>
  )
}

export default App
