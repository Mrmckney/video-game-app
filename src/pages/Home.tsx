import { useState, useContext, useEffect } from "react"
import { ImageList, ImageListItem, Button, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UserDetailsContext } from "../App";
import { homeStyles } from "../styles/homeStyles";
import { HomeGame } from "../services/appInterfaces";



export const Home = (): JSX.Element => {

    const navigate = useNavigate()
    const { setErrorPopUp, setErrorMessage, setLoading, loading, user } = useContext(UserDetailsContext)
    const [games, setGames] = useState<HomeGame[]>([])

    useEffect(() => {
        setLoading(true)
        loadPreset().then((data: HomeGame[]) => {
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

    const refreshPreset = async () => {
        setLoading(true)
        loadPreset().then((data: HomeGame[]) => {
            setGames(data)
            setLoading(false)
        })
    }

    return (
        <div style={homeStyles.homeContainer}>
            <div style={homeStyles.homeTitle}>
                <h1>Welcome to Game Retriever</h1>
            </div>
            {!loading &&
                <ImageList sx={homeStyles.imageList} cols={10} rowHeight={164}>
                    {games?.map((game: HomeGame) => (
                        <Tooltip title={game.name}>
                        <ImageListItem key={game.image} onClick={() => navigate(`/game/${game.title}`)} sx={homeStyles.image}>
                            <img
                                src={`${game.image}?w=164&h=164&fit=crop`}
                                alt={game.title}
                            />
                        </ImageListItem>
                        </Tooltip>
                    ))}
                </ImageList>
            }
        </div>
    )
}