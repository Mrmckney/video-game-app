import { Dispatch, SetStateAction } from "react"


export type UserContext = {
    user: string
    setUser: Dispatch<SetStateAction<string>>
    displayName: string
    setDisplayName: Dispatch<SetStateAction<string>>
    errorPopUp: boolean
    setErrorPopUp: Dispatch<SetStateAction<boolean>>
    setErrorMessage: Dispatch<SetStateAction<string>>
    setLoading: Dispatch<SetStateAction<boolean>>
    setSuccessPopUp: Dispatch<SetStateAction<boolean>>
    setSuccessMessage: Dispatch<SetStateAction<string>>
}
  