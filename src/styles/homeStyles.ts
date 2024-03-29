type HomeStyles = {
    homeContainer: Object
    homeTitle: Object
    imageList: Object
    image: Object
}

export const homeStyles: HomeStyles = {
    homeContainer: {
        backgroundColor: '#19324f',
        height: '100%'
    },
    homeTitle: {
        display: 'flex', 
        justifyContent: 'center',
        textAlign: 'center',
        color: 'white'
    },
    imageList: {
        width: '100%', 
    },
    image: {
        cursor: 'pointer',
        '&:hover': {
            boxShadow: 'lightblue 0px 0px 20px 12px',
            transform: 'translateY(-10px)',
        }
    }
}