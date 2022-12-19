import {FormEvent, useState} from "react"
import { Game } from "../services/interfaces";
import { TextField, CircularProgress } from "@mui/material";
import { GameList } from "./GameList";



export const SearchGames = () => {

    const [word, setWord] = useState<String>('')
    const [gameData, setGameData] = useState<Game[]>([])
    const [loading, setLoading] = useState<Boolean>(false)

    const searchBar = async (e: FormEvent) => {
        e.preventDefault()
        if (word.trim() !== '') {
            setLoading(true)
            const results = await searchFetch().catch((err: Error) => alert(err.message))
            setGameData(results)
            setLoading(false)
        }
    }

    const searchFetch = async () => {
        const response = await fetch(`http://localhost:4000/search/search?query=${word}`)
        if (!response.ok) {
            const message = `An error has occured: ${response.status}`
            throw new Error(message)
        }
        const searchResults = await response.json()
        return searchResults
    }

    return (
        <div style={{height: '100%', width: '100%'}}>
            <div style={{display: 'flex', justifyContent: 'center', margin: 20}} > 
                <form onSubmit={(e: FormEvent) => searchBar(e)} style={{width: '400px'}}>
                    <TextField fullWidth id="outlined-search" label="Search field" type="search" variant="filled" onChange={(e) => setWord(e.target.value)}/>
                </form>
            </div>
            {loading 
                ? 
                <div style={{height: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <CircularProgress size={150}/> 
                </div>
                :
                <GameList gameData={gameData} />
            }
        </div>
    )
}
