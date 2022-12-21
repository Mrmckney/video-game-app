import { Game } from "./appInterfaces";

export class GameCount {
    games: Game[]
    constructor(g: Game[]) {
        this.games = g
    }
    getAmount() {
        return this.games.length
    }
}