import { useEffect, useState, useContext, useMemo, useCallback } from "react"
import { useParams } from "react-router-dom"
import { Game } from "../services/appInterfaces"
import { Rating, Box, Avatar } from "@mui/material";
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { UserDetailsContext } from "../App";
import { GameRating } from "../services/appInterfaces";

export const SinglePageGame = (): JSX.Element => {
    const params = useParams()
    const {setErrorPopUp, setErrorMessage, setLoading} = useContext(UserDetailsContext)
    const [game, setGame] = useState<Game>({} as Game)
    const [platformsReleasedOn, setPlatformsReleasedOn] = useState<(string | undefined)[]>([])
    const [ratings, setRatings] = useState<GameRating[]>([])
    
    useEffect(() => {
        setLoading(true)
        fetchSingleGame(params.slug).then((data) => {
            let test: Date = new Date(data.released)
            data.released = test.toString().slice(0, 16)
            setGame(data) 
            setLoading(false)
        })
    },[params.slug])
    
    useEffect(() => {
        if (game.name) {
            setPlatformsReleasedOn(getPlatforms())
            setRatings(game?.ratings)
        }
    }, [game])

    const getPlatforms = () => {
        const platformNames = game?.platforms.map(({platform}) => {
            return platform?.name
        }).sort().reverse()

        return platformNames
    }

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
         <div style={{width: '100%', backgroundColor: '#19324f', color: 'white'}}>
            <div style={{display: 'flex', justifyContent: 'center', paddingTop: 60}}>
                <div style={{flexDirection: 'column'}}>
                    <div style={{display: 'flex', paddingBottom: 5, justifyContent: 'space-between'}}>
                        <h1 style={{fontSize: '2em'}}>{game?.name}</h1>
                        <div style={{display: 'flex'}}>
                            <Rating name="read-only" icon={<SportsEsportsIcon style={{width: 40, height: 40}}/>} emptyIcon={<SportsEsportsIcon style={{width: 40, height: 40}}/>} value={game?.rating} precision={0.1} readOnly sx={{color: 'white'}} size="large" />
                            <Box style={{color: 'white', paddingLeft: 8, fontSize: '2em'}} >{game?.rating?.toFixed(1)}</Box>
                        </div>
                    </div>
                    <div style={{position: 'relative'}}>
                        <div style={{position: 'relative', zIndex: 1}}>
                            <img src={game?.background_image} style={{height: 700, width: 1200, borderRadius: 10}}/>
                        </div>
                        <div style={{position: 'absolute', zIndex: 2, top: 20, left: 20}}>
                        {game?.metacritic ?
                            <Avatar style={metaCriticColor} variant="rounded" sx={{fontSize: 40, padding: 5}}>
                                {game?.metacritic}
                            </Avatar>
                        :
                            <Avatar style={metaCriticColor} variant="rounded" sx={{fontSize: 40, padding: 5}}>
                                    N/A
                            </Avatar>
                        }
                        </div>
                    </div>
                </div>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                <div>
                    <span>Date Released - {game.released}</span>
                </div>
                <div>
                    <h3>Playable on</h3>
                    {platformsReleasedOn?.map((platform, i) => {
                        return (
                            <p key={i} >{platform}</p>
                        )
                    })}
                </div>
                <div>
                    <h3>Ratings</h3>
                    {ratings.map((rating, i) => {
                        return (
                            <div key={i}>
                                <p>{rating.title}</p>
                                <p>{rating.percent}</p>
                                <p>{rating.count}</p>
                                <p>{rating.id}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
        }
        </>
    )
}