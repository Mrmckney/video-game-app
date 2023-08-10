import { useEffect, useState, useContext } from "react"
import { UserDetailsContext } from "../App";
import { GameList } from "../components/GameList";
import { Game } from "../services/appInterfaces";

export const TopSuggestedGames = (): JSX.Element => {

    const {setErrorPopUp, setErrorMessage, setLoading} = useContext(UserDetailsContext)
    const [gameData, setGameData] = useState<Game[]>([])

    useEffect(() => {
        setLoading(true)
        const games = async () => {
            const results: Game[] = await topSuggestedFetch()
            setGameData(results)
        }
        games().then(() => setLoading(false))
    }, [])

    const topSuggestedFetch = async () => {
        const response: Response = await fetch(`https://video-game-api-six.vercel.app/topsuggested`)
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
            <GameList gameData={gameData} />
        </>
    )
}