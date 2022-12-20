import { FC, useState } from 'react'
import { Alert } from '@mui/material'
import { SearchGames } from './components/SearchGame'
import { NavBar } from './components/NavBar'
import { User } from './services/appInterfaces'
import './App.css'



const App: FC = () =>  {
  const [user, setUser] = useState<User>({username: ''})
  const [errorPopUp, setErrorPopUp] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  return (
    <div className="App">
      <NavBar user={user}/>
      {errorPopUp && <Alert severity='error' onClose={() => {setErrorPopUp(false)}}>{errorMessage}</Alert>}
      <SearchGames setErrorPopUp={setErrorPopUp} setErrorMessage={setErrorMessage}/>
    </div>
  )
}

export default App
