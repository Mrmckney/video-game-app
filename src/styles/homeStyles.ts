type HomeStyles = {
    homeContainer: Object
    homeTitle: Object
    imageList: Object
    image: Object
}

export const homeStyles: HomeStyles = {
    homeContainer: {
        backgroundColor: '#19324f'
    },
    homeTitle: {
        display: 'flex', 
        justifyContent: 'center', 
        color: 'white'
    },
    imageList: {
        width: '100%', 
        height: '100%'
    },
    image: {
        cursor: 'pointer',
        '&:hover': {
            transform: 'translateY(-10px)',
        }
    }
}