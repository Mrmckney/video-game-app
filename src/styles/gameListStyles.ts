type GameListStyles = {
    gameListContainer: Object
    gameListCard: Object
    gameListCardAction: Object
}

export const gameListStyles: GameListStyles = {
    gameListContainer: {
        display: 'flex', 
        flexWrap: 'wrap', 
        backgroundColor: '#19324f'
    },
    gameListCard: {
        width: 350, 
        margin: 5, 
        borderRadius: 3,
        backgroundColor: '#214969',
        boxShadow: 'rgba(0, 0, 0, 0.56) 0px 22px 70px 4px',
        '&:hover': {
            transform: 'translateY(4px)',
            transition: 'transform 0.5s',
            backgroundColor: '#162c3d',

        }
    },
    gameListCardAction: {
        display: 'flex', 
        justifyContent: 'space-between'
    }
}