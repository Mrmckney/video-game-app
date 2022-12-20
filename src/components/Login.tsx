import { useContext, useState } from 'react'
import bcrypt from 'bcryptjs'

const mySalt = "$2a$10$Y5H9Mw5WmFVDB46qEhCU0u"

export const Login = (): JSX.Element => {

    // const {setUser, setDisplayName} = useContext(UserDetailsContext)
    const [userCreds, setUserCreds] = useState(null)
    const [showPassword, setShowPassword] = useState(false)
    
    const handleSignIn = () => {
        if(!userCreds){
            alert('Missing username or password')
            return 
        }
        const {username, password} = userCreds
        if(!username || !password){
            alert('Missing username or password')
            return
        }
        if(username && password){
            const hashedPassword = bcrypt.hashSync(password, mySalt)
            fetch(`${process.env.REACT_APP_API_ENDPOINT}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, password: hashedPassword})
            })
            .then(response => response.json())
            .then(data => {
                if(data.status !== 200){
                    alert(data.message)
                    return
                }
                if(data.message !== 'Login Attempt Failed'){
                    // handleClose(false)
                }
                // setDisplayName(data.user.username)
                // setUser(data.token)
                localStorage.setItem('user', data.token)
                localStorage.setItem('displayname', data.user.username)
            })
            .catch(err => alert(err))
        }
    }

    const handleSignUp = () => {
        if(!userCreds){
            alert('Missing username or password')
            return 
        }
        const {username, password} = userCreds
        if(!username || !password){
            alert('Missing username or password')
            return
        }
        if(username && password){
            const hashedPassword = bcrypt.hashSync(password, mySalt)
            fetch(`${process.env.REACT_APP_API_ENDPOINT}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, password: hashedPassword})
            })
            .then(response => response.json())
            .then(data => {
                // setDisplayName(data.user.username)
                // setUser(data.token)
                localStorage.setItem('user', data.token)
                localStorage.setItem('displayname', data.user.username)
            })
            // .then(() => handleClose(false))
            .catch(err => alert(err))
    }
    }

    // const handleForm = e => {
    //     setUserCreds({ ...userCreds, [e.target.name]: e.target.value})
    // }

    const togglePassword = () => {
        setShowPassword(!showPassword)
    }
    return (
        <></>
    )
}