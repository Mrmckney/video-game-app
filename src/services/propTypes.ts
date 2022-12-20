import {SetStateAction, Dispatch} from 'react';

import { Game, User } from "./appInterfaces"

export type GameProps = {
    gameData: Game[]
}

export type UserProps = {
    user: User
}

export type DrawerProps = {
    openDrawer: boolean
    setOpenDrawer: Dispatch<SetStateAction<boolean>>
}