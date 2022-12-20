import { FormEvent, useState } from "react"
import { GameList } from "./GameList";
import { Game } from "../services/appInterfaces";
import { SearchProps } from "../services/propTypes";
import { searchGameStyles } from "../styles/searchGameStyles";
import { TextField, LinearProgress } from "@mui/material";



export const SearchGames = ({setErrorPopUp, setErrorMessage}: SearchProps): JSX.Element => {

    const [word, setWord] = useState<String>('')
    const [gameData, setGameData] = useState<Game[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    const searchBar = async (e: FormEvent) => {
        e.preventDefault()
        if (word.trim() !== '') {
            setLoading(true)
            const results = await searchFetch()
            setGameData(results)
            setLoading(false)
        }
    }

    const searchFetch = async () => {
        const response = await fetch(`http://localhost:4000/search/search?query=${word}`)
        if (!response.ok) {
            const message = `An error has occured: ${response.status}`
            setErrorPopUp(true)
            setErrorMessage(message)
            throw new Error(message)
        }
        const searchResults = await response.json()
        return searchResults
    }

    return (
        <div style={searchGameStyles.searchGameContainer}>
            {loading &&
                <div style={{width: '100%'}}>
                    <LinearProgress />
                </div>
            }
            <div style={searchGameStyles.searchGameField} > 
                <form onSubmit={(e: FormEvent) => searchBar(e)} style={{width: '500px'}}>
                    <TextField fullWidth id="outlined-search" label="Search over 550,000 games" type="search" variant="filled" onChange={(e) => setWord(e.target.value)}/>
                </form>
            </div>
            {!loading &&
                <GameList gameData={gameData} />
            }
        </div>
    )
}
