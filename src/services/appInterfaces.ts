export interface Game {
    id: number
    slug: string 
    name: string 
    released: string 
    tba: boolean
    background_image: string
    rating: number
    rating_top: number
    ratings: Array<{
        id: number
        title: string
        count: number
        percent: number
    }>
    ratings_count: number
    reviews_text_count:  string 
    added: number
    added_by_status: {
        yet: number
        owned: number
        beaten: number
        toplay: number
        dropped: number
        playing: number
    }
    metacritic: number
    playtime: number
    suggestions_count: number
    updated: Date
    esrb_rating: {
        id: number
        name: string
        slug: string
    }
    platforms: Array<{
        platform?: {
            id?: number
            name?: string
            slug?: string
            image?: string | null
            year_end?: number | null
            year_start?: number | null
            games_count?: number
            image_background?: string
        }
        released_at?: string
        requirements_en?: {
            minimum: string
            recommended: string
        } | null
    }>
}

export interface UserCreds {
    username: string
    password: string
}

export interface User {
    username?: string
    user?: {
        _id: string
        favorites: Game[]
        username: string
    }
    message: string
    token: string
}

export interface HomeGame {
    title: string
    image: string
    name: string
}

export interface GameRating {
    count: number
    id: number
    percent: number
    title: string
}

export interface ChartRating {
    id: number
    value: number
    label: string
    percent: number
}
