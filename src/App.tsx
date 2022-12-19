import { SearchGames } from './components/SearchGames'
import './App.css'
import { NavBar } from './components/NavBar'
import { useState } from 'react'
import { User } from './services/interfaces'



function App() {
  const [user, setUser] = useState<User>({username: ''})
  return (
    <div className="App">
      <NavBar user={user}/>
      <SearchGames />
    </div>
  )
}

export default App
