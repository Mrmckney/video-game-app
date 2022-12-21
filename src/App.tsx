import { FC, useState, createContext, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { SearchGames } from './components/SearchGame'
import { Login } from './components/Login'
import { NavBar } from './components/NavBar'
import { Alert, LinearProgress } from '@mui/material'
import { UserContext } from './services/contextTypes'
import './App.css'

export const UserDetailsContext = createContext<UserContext>({} as UserContext)

const App: FC = () =>  {

  const [user, setUser] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [successPopUp, setSuccessPopUp] = useState<boolean>(false)
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [errorPopUp, setErrorPopUp] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    if(localStorage.getItem('user') && localStorage.getItem('displayname')) {
      const grabUser: string | undefined = localStorage.getItem('user')?.toString()
      const grabDisplayName: string | undefined = localStorage.getItem('displayname')?.toString()
      if (grabUser !== undefined) {
        setUser(grabUser)
      }
      if (grabDisplayName !== undefined) {
        setDisplayName(grabDisplayName)
      }
    }

  }, [])

  useEffect(() => {
    if (errorPopUp == true) {
      setTimeout(() => {
        setErrorPopUp(false)
      }, 5000)
    }
  }, [errorPopUp])

  useEffect(() => {
    if (successPopUp == true) {
      setTimeout(() => {
        setSuccessPopUp(false)
      }, 5000)
    }
  }, [successPopUp])

  return (
    <UserDetailsContext.Provider value={{user, setUser, displayName, setDisplayName, setErrorMessage, errorPopUp, setErrorPopUp, setLoading, setSuccessMessage, setSuccessPopUp}}>
      <div className="App">
        <NavBar />
        {loading && <div style={{width: '100%'}}><LinearProgress /></div>}
        {errorPopUp && <Alert severity='error' onClose={() => {setErrorPopUp(false)}}>{errorMessage}</Alert>}
        {successPopUp && <Alert severity='success' onClose={() => {setSuccessPopUp(false)}}>{successMessage}</Alert>}
        <Routes>
          <Route path='/' element={<SearchGames />}/>
          <Route path='/login' element={<Login />}/>
        </Routes>
      </div>
    </UserDetailsContext.Provider>
  )
}

export default App
