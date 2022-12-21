import { Dispatch, SetStateAction } from "react"
import { Game } from "./appInterfaces"


export type UserContext = {
    user: string
    setUser: Dispatch<SetStateAction<string>>
    displayName: string
    setDisplayName: Dispatch<SetStateAction<string>>
    errorPopUp: boolean
    setErrorPopUp: Dispatch<SetStateAction<boolean>>
    setErrorMessage: Dispatch<SetStateAction<string>>
    loading: boolean
    setLoading: Dispatch<SetStateAction<boolean>>
    setSuccessPopUp: Dispatch<SetStateAction<boolean>>
    setSuccessMessage: Dispatch<SetStateAction<string>>
    favData: Game[]
    setFavData: Dispatch<SetStateAction<Game[]>>
}
  