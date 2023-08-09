type LoginStyles = {
    loginContainer: Object
    loginFormContainer: Object
}

export const loginStyles: LoginStyles = {
    loginContainer: {
        display: 'flex', 
        justifyContent: 'center', 
        marginTop: 80,
        color: 'white'
    },
    loginFormContainer: {
        width: '500px', 
        height: '700px', 
        display: 'flex', 
        justifyContent: 'center', 
        flexDirection: 'column', 
        alignItems: 'center', 
        borderStyle: 'solid', 
        borderRadius: 20,
        borderWidth: 5
    }
}