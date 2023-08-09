import { FC, useState, createContext, useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { SearchGames } from './components/SearchGame'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { NavBar } from './components/NavBar'
import { Alert, LinearProgress } from '@mui/material'
import { UserContext } from './services/contextTypes'
import { Game } from './services/appInterfaces'
import './App.css'
import { WishList } from './pages/WishList'
import { TopRatedGames } from './pages/TopRatedGames'
import { TopSuggestedGames } from './pages/TopSuggestedGames'
import { MostPlayedGames } from './pages/MostPlayedGames'
import { SinglePageGame } from './pages/SinglePageGame'

export const UserDetailsContext = createContext<UserContext>({} as UserContext)

const App: FC = () =>  {

  const [user, setUser] = useState<string>('');
  const [favData, setFavData] = useState<Game[]>([])
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
    <UserDetailsContext.Provider value={{user, setUser, displayName, setDisplayName, setErrorMessage, errorPopUp, setErrorPopUp, loading, setLoading, setSuccessMessage, setSuccessPopUp, favData, setFavData}}>
      <div className="App">
        <NavBar />
        {loading && <div style={{width: '100%'}}><LinearProgress /></div>}
        {errorPopUp && <Alert severity='error' onClose={() => {setErrorPopUp(false)}}>{errorMessage}</Alert>}
        {successPopUp && <Alert severity='success' onClose={() => {setSuccessPopUp(false)}}>{successMessage}</Alert>}
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/mostplayed' element={<MostPlayedGames />}/>
          <Route path='/topsuggested' element={<TopSuggestedGames />}/>
          <Route path='/toprated' element={<TopRatedGames />}/>
          <Route path='/game/:slug' element={<SinglePageGame />}/>
          {
            user ?
            [ 
              <Route path='/search' element={<SearchGames />}/>,
              <Route path='/wishlist' element={<WishList />}/>
            ]
            :
            null
          }
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
        <footer style={{display: 'flex', justifyContent: 'center', background: '#19324f'}}>
          <a href='https://rawg.io/' style={{textDecoration: 'none', color: 'white'}}>
            &copy; RAWG.IO
          </a>
        </footer>
      </div>
    </UserDetailsContext.Provider>
  )
}

export default App
