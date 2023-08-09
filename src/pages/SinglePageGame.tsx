import { useEffect, useState, useContext, useMemo, useCallback } from "react"
import { useParams } from "react-router-dom"
import { DefaultizedPieValueType } from '@mui/x-charts';
import { Game } from "../services/appInterfaces"
import { Rating, Box, Avatar } from "@mui/material";
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { UserDetailsContext } from "../App";
import { ChartRating } from "../services/appInterfaces";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts";

export const SinglePageGame = (): JSX.Element => {
    const params = useParams()
    const {setErrorPopUp, setErrorMessage, setLoading} = useContext(UserDetailsContext)
    const [game, setGame] = useState<Game>({} as Game)
    const [platformsReleasedOn, setPlatformsReleasedOn] = useState<(string | undefined)[]>([])
    const [ratings, setRatings] = useState<ChartRating[]>([])
    
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
            setRatings(getRatings())
        }
    }, [game])

    const getPlatforms = () => {
        const platformNames = game?.platforms.map(({platform}) => {
            return platform?.name
        }).sort().reverse()

        return platformNames
    }

    const getRatings = () => {
        const ratings = game?.ratings.map((rating) => {
            return {
                id: rating.id,
                value: rating.count,
                label: rating.title,
                percent: rating.percent
            }
        })

        return ratings
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

    const TOTAL = game?.ratings?.map((item) => item.percent).reduce((a, b) => a + b, 0);

    const getArcLabel = (params: DefaultizedPieValueType) => {
        const percent = params.percent / TOTAL;
        return `${(percent * 100).toFixed(0)}%`;
    };

    return (
        <>
        {game && game.rating &&
        <div style={{width: '100%', height: '100%', backgroundColor: '#19324f', color: 'white'}}>
            <div style={{display: 'flex', margin: 60, backgroundColor: '#214969'}}>
                <div style={{position: 'relative'}}>
                    <div style={{position: 'relative', zIndex: 1}}>
                        <img src={game?.background_image} style={{height: 700, width: 2000}}/>
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
                <div style={{width: 500 ,paddingLeft: 15}}>
                    <div style={{display: 'flex', paddingBottom: 5, flexDirection: 'column'}}>
                        <h2>{game?.name}</h2>
                        <div style={{display: 'flex'}}>
                            <Rating name="read-only" icon={<SportsEsportsIcon style={{width: 40, height: 40}}/>} emptyIcon={<SportsEsportsIcon style={{width: 40, height: 40}}/>} value={game?.rating} precision={0.1} readOnly sx={{color: 'white'}} size="large" />
                            <Box style={{color: 'white', fontSize: '1.75em', paddingLeft: 5}} >{game?.rating?.toFixed(1)}</Box>
                        </div>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', marginTop: 40}}>
                        <h3 style={{marginLeft: 170, marginBottom: 5}}>Ratings</h3>
                        <PieChart
                            colors={['green', 'blue', 'orange', 'red']}
                            series={[
                                {
                                    data: ratings,
                                    startAngle: -135,
                                    endAngle: 135,
                                    paddingAngle: 1,
                                    innerRadius: 100,
                                    outerRadius: 200,
                                    arcLabel: getArcLabel,         
                                },
                            ]}
                            sx={{
                                [`& .${pieArcLabelClasses.root}`]: {
                                  fill: 'white',
                                  fontSize: 15,
                                },
                            }}
                            width={500}
                            height={400}
                            legend={{ hidden: true }}
                        />
                    </div>
                    <div style={{marginTop: 50}}>
                        <h3>Playtime - {game?.playtime ?? 'N/A'} Hours</h3>
                        <h3 style={{marginRight: 10}}>ESRB - {game?.esrb_rating?.name ?? 'N/A'}</h3>  
                        <h2>Date Released - {game?.released ?? 'N/A'}</h2>
                    </div>
                </div>
                <div style={{textAlign: 'end', marginTop: 10, marginRight: 10, width: 500}}>
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
        }
        </>
    )
}