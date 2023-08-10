import { useEffect, useState, useContext } from "react"
import { UserDetailsContext } from "../App";
import { GameList } from "../components/GameList";
import { Game } from "../services/appInterfaces";

export const MostPlayedGames = (): JSX.Element => {

    const {setErrorPopUp, setErrorMessage, setLoading} = useContext(UserDetailsContext)
    const [gameData, setGameData] = useState<Game[]>([])

    useEffect(() => {
        setLoading(true)
        const games = async () => {
            const results: Game[] = await mostPlayedFetch()
            setGameData(results)
            return
        }
        games().then(() => setLoading(false))
    }, [])

    const mostPlayedFetch = async () => {
        const response: Response = await fetch(`http://localhost:4000/mostplayed`)
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