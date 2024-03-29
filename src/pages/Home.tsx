import { useState, useContext, useEffect } from "react"
import { ImageList, ImageListItem, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UserDetailsContext } from "../App";
import { HomeGame } from "../services/appInterfaces";
import { homeStyles } from "../styles/homeStyles";



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
        const response: Response = await fetch(`https://video-game-api-six.vercel.app/preset`)
        const searchResults = await response.json()
        if (searchResults.status === 500) {
            setErrorPopUp(true)
            setErrorMessage(searchResults.message)
            throw new Error(searchResults.message)
        }
        return searchResults
    }

    return (
        <div style={homeStyles.homeContainer}>
            <div style={homeStyles.homeTitle}>
                <h1>Welcome to Game Retriever</h1>
            </div>
            {!loading &&
                <ImageList sx={homeStyles.imageList} cols={10} rowHeight={164}>
                    {games?.map((game: HomeGame) => (
                        <Tooltip key={game.image} title={game.name}>
                        <ImageListItem onClick={() => navigate(`/game/${game.title}`)} sx={homeStyles.image}>
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