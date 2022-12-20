type GameListStyles = {
    gameListContainer: Object
    gameListCard: Object
    gameListCardAction: Object
}

export const gameListStyles: GameListStyles = {
    gameListContainer: {
        display: 'flex', 
        flexWrap: 'wrap', 
        backgroundColor: '#104676'
    },
    gameListCard: {
        width: 350, 
        margin: 5, 
        borderRadius: 3 
    },
    gameListCardAction: {
        display: 'flex', 
        justifyContent: 'space-between'
    }
}