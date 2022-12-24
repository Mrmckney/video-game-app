import { useState, useContext, useEffect } from "react"
import { ImageList, ImageListItem } from "@mui/material";
import { UserDetailsContext } from "../App";
import { useNavigate } from "react-router-dom";

type Games = {
    title: string
    image: string
}

export const Home = (): JSX.Element => {

    const navigate = useNavigate()
    const {setErrorPopUp, setErrorMessage, setLoading} = useContext(UserDetailsContext)
    const [games, setGames] = useState<Games[]>([])

    useEffect(() => {
        setLoading(true)
        loadPreset().then((data) => {
            setGames(data)
            setLoading(false)
        })
    }, [])

    const loadPreset = async () => {
        const response: Response = await fetch(`http://localhost:4000/preset`)
        const searchResults = await response.json()
        if (searchResults.status === 500) {
            setErrorPopUp(true)
            setErrorMessage(searchResults.message)
            throw new Error(searchResults.message)
        }
        return searchResults
    }

    return (
        <div style={{backgroundColor: '#19324f'}}>
            <div style={{display: 'flex', justifyContent: 'center', color: 'white' }}>
                <h1>Welcome to Game Retriever</h1>
            </div>
            <ImageList sx={{ width: '100%', height: '100%' }} cols={10} rowHeight={164}>
                {games?.map((game) => (
                    <ImageListItem key={game.image} onClick={() => navigate(`/game/${game.title}`)} style={{cursor: 'pointer'}}>
                    <img
                        src={`${game.image}?w=164&h=164&fit=crop&auto=format`}
                        srcSet={`${game.image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        alt={game.title}
                        loading="lazy"
                    />
                    </ImageListItem>
                ))}
            </ImageList>
        </div>
    )
}