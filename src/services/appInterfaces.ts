export interface Game {
    id: number
    slug: string 
    name: string 
    released: Date 
    tba: boolean
    background_image: string
    rating: number
    rating_top: number
    ratings: Object
    ratings_count: number
    reviews_text_count:  string 
    added: number
    added_by_status: Object
    metacritic: number
    playtime: number
    suggestions_count: number
    updated: Date
    esrb_rating: Object
    platforms: []
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