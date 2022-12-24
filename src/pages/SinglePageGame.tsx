import { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"
import { Game } from "../services/appInterfaces"
import { UserDetailsContext } from "../App";


export const SinglePageGame = (): JSX.Element => {
    const params = useParams()
    const {setErrorPopUp, setErrorMessage, setLoading} = useContext(UserDetailsContext)
    const [game, setGame] = useState<Game>({} as Game)

    useEffect(() => {
        console.log('we ran')
        setLoading(true)
        fetchSingleGame(params.slug).then((data) => {
            console.log(data)
            setGame(data) 
            setLoading(false)
        })
    },[params.slug])

    const fetchSingleGame = async (game: string | undefined) => {
        console.log(game)
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
        {game &&
            <div>
                <h1>{game?.name}</h1>
                <img src={game?.background_image}  style={{height: 300, width: 500}}/>
                <h6>{game?.added}</h6>
                <h6>{game?.rating}</h6>
                <h6>{game?.playtime}</h6>
                <div>
                    {game?.platforms?.map((platform, i) => {
                        return (
                            <div key={i}>
                                <h6>{platform.platform?.games_count}</h6>
                                <h6>{platform.platform?.id}</h6>
                                <h6>{platform.platform?.image}</h6>
                                <h6>{platform.platform?.image_background}</h6>
                                <h6>{platform.platform?.name}</h6>
                                <h6>{platform.platform?.slug}</h6>
                                <h6>{platform.platform?.year_end}</h6>
                                <h6>{platform.platform?.year_start}</h6>
                                <h6>{platform.released_at}</h6>
                                <h6>{platform.requirements_en?.minimum}</h6>
                                <h6>{platform.requirements_en?.recommended}</h6>
                            </div>
                        )
                    })}
                </div>
                <h6>{game?.metacritic}</h6>
                <h6>{game?.id}</h6>
                <h6>{game?.esrb_rating?.name}</h6>
                <h6>{game?.esrb_rating?.slug}</h6>
                <h6>{game?.added_by_status?.beaten}</h6>
                <h6>{game?.added_by_status?.dropped}</h6>
                <h6>{game?.added_by_status?.owned}</h6>
                <h6>{game?.added_by_status?.playing}</h6>
                <h6>{game?.added_by_status?.toplay}</h6>
                <h6>{game?.added_by_status?.yet}</h6>
                <h6>{game?.rating_top}</h6>
                <div>
                    {game?.ratings?.map((rating, i) => {
                        return (
                            <div key={i}>
                                <h6>{rating.count}</h6>
                                <h6>{rating.id}</h6>
                                <h6>{rating.percent}</h6>
                                <h6>{rating.title}</h6>
                            </div>
                        )
                    })}
                
                </div>
                <h6>{game?.ratings_count}</h6>
                <h6>{game?.released?.toString()}</h6>
                <h6>{game?.reviews_text_count}</h6>
                <h6>{game?.slug}</h6>
                <h6>{game?.suggestions_count}</h6>
                <h6>{game?.tba}</h6>
                <h6>{game?.updated?.toString()}</h6>
            </div>
        }
        </>
    )
}