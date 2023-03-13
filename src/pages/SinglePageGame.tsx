import { useEffect, useState, useContext, useMemo, useCallback } from "react"
import { useParams } from "react-router-dom"
import { Game } from "../services/appInterfaces"
import { Rating, Box, Avatar } from "@mui/material";
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { UserDetailsContext } from "../App";


export const SinglePageGame = (): JSX.Element => {
    const params = useParams()
    const {setErrorPopUp, setErrorMessage, setLoading} = useContext(UserDetailsContext)
    const [game, setGame] = useState<Game>({} as Game)

    useEffect(() => {
        setLoading(true)
        fetchSingleGame(params.slug).then((data) => {
            setGame(data) 
            setLoading(false)
        })
    },[params.slug])

    
    const metaCriticColor = useMemo(() => {
        if (!game.metacritic) {
            return { backgroundColor: 'black' }
        }
        if (game.metacritic > 80) {
            return { backgroundColor: '#36bf08' }
        }
        if (game.metacritic < 80 && game.metacritic > 60) {
            return { backgroundColor: '#b6bf08' }
        }
        if (game.metacritic < 60) {
            return { backgroundColor: '#bf081a' }
        }
    }, [game])
    
    const fetchSingleGame = async (game: string | undefined) => {
        const response: Response = await fetch(`http://localhost:4000/game/${game}`)
        const data = await response.json()
        if (data.status === 500) {
            setErrorPopUp(true)
            setErrorMessage(data.message)
            throw new Error(data.message)
        }
        return data
    }

    
    return (
        <>
        {game && game.rating &&
            <div style={{display: 'flex', justifyContent: 'center', width: '100%', height: '100%', backgroundColor: '#19324f', color: 'white', paddingBottom: 300, paddingRight: 400}}>
                <div style={{alignItems: 'flex-start', flexDirection: 'column'}}>
                    <h1>{game?.name}</h1>
                    <img src={game?.background_image}  style={{height: 500, width: 600}}/>
                </div>
                <div style={{display: 'flex', paddingBottom: 5}}>
                        <Rating name="read-only" icon={<SportsEsportsIcon />} emptyIcon={<SportsEsportsIcon />} value={game?.rating} precision={0.1} readOnly sx={{color: 'white'}} size='large' />
                        <Box style={{color: 'white', paddingLeft: 8}} >{game?.rating?.toFixed(1)}</Box>
                </div>
                <div>
                {game?.metacritic ?
                    <Avatar style={metaCriticColor} variant="rounded">
                        {game?.metacritic}
                    </Avatar>
                :
                    <Avatar style={metaCriticColor} variant="rounded">
                            N/A
                    </Avatar>
                }
                </div>
            </div>
        }
        </>
    )
}