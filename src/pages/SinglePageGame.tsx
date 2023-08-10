import { useEffect, useState, useContext, useMemo } from "react"
import { useParams } from "react-router-dom"
import { Rating, Box, Avatar } from "@mui/material";
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { UserDetailsContext } from "../App";
import { Game } from "../services/appInterfaces"
import '../styles/single-page.scss'

export const SinglePageGame = (): JSX.Element => {
    const params = useParams()
    const {setErrorPopUp, setErrorMessage, setLoading} = useContext(UserDetailsContext)
    const [game, setGame] = useState<Game>({} as Game)
    const [platformsReleasedOn, setPlatformsReleasedOn] = useState<(string | undefined)[]>([])
    
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
        const response: Response = await fetch(`https://video-game-api-six.vercel.app/game/${game}`)
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
        <div className="single-page-container">
            <div className="game-container">
                <div style={{position: 'relative'}}>
                    <div style={{position: 'relative', zIndex: 1}}>
                        <img src={game?.background_image} style={{height: '100%', width: '100%'}}/>
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
                <div style={{paddingLeft: 15}}>
                    <div style={{display: 'flex', paddingBottom: 5, flexDirection: 'column'}}>
                        <h2>{game?.name}</h2>
                        <div style={{display: 'flex'}}>
                            <Rating name="read-only" icon={<SportsEsportsIcon style={{width: 40, height: 40}}/>} emptyIcon={<SportsEsportsIcon style={{width: 40, height: 40}}/>} value={game?.rating} precision={0.1} readOnly sx={{color: 'white'}} size="large" />
                            <Box style={{color: 'white', fontSize: '1.75em', paddingLeft: 5}} >{game?.rating?.toFixed(1)}</Box>
                        </div>
                    </div>
                    <div>
                        <h4>Date Released - {game?.released ?? 'N/A'}</h4>
                        <h3>Playtime - {game?.playtime ?? 'N/A'} Hours</h3>
                        <h3>ESRB - {game?.esrb_rating?.name ?? 'N/A'}</h3>  
                    </div>
                    <div style={{marginTop: 10, marginBottom: 10}}>
                        <h3>Available on</h3>
                        <div>
                            {platformsReleasedOn?.map((platform, i) => {
                                return (
                                    <p key={i} >{platform}</p>
                                )
                            })}
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        }
        </>
    )
}