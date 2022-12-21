import { FormEvent, useState, useContext } from "react"
import { GameList } from "./GameList";
import { Game } from "../services/appInterfaces";
import { searchGameStyles } from "../styles/searchGameStyles";
import { TextField, LinearProgress } from "@mui/material";
import { UserDetailsContext } from "../App";



export const SearchGames = (): JSX.Element => {

    const {setErrorPopUp, setErrorMessage, setLoading} = useContext(UserDetailsContext)
    const [word, setWord] = useState<string>('')
    const [gameData, setGameData] = useState<Game[]>([])

    const searchBar = async (e: FormEvent) => {
        e.preventDefault()
        if (word.trim() !== '') {
            setLoading(true)
            const results: Game[] = await searchFetch()
            setGameData(results)
            setLoading(false)
        }
    }

    const searchFetch = async () => {
        const response: Response = await fetch(`http://localhost:4000/search/search?query=${word}`)
        const searchResults = await response.json()
        if (searchResults.status === 500) {
            setErrorPopUp(true)
            setErrorMessage(searchResults.message)
            throw new Error(searchResults.message)
        }
        return searchResults
    }

    return (
        <div style={searchGameStyles.searchGameContainer}>
            <div style={searchGameStyles.searchGameField} > 
                <form onSubmit={(e: FormEvent) => searchBar(e)} style={{width: '500px'}}>
                    <TextField fullWidth id="outlined-search" label="Search over 550,000 games" type="search" variant="filled" onChange={(e) => setWord(e.target.value)}/>
                </form>
            </div>
            {gameData.length > 0 &&
                <GameList gameData={gameData} />
            }
        </div>
    )
}
