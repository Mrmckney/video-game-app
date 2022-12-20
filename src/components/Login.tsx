import { ChangeEvent, useContext, useState } from 'react'
import { User } from '../services/appInterfaces'
import { TextField, Button } from '@mui/material'
import bcrypt from 'bcryptjs'

const mySalt = "$2a$10$Y5H9Mw5WmFVDB46qEhCU0u"

export const Login = (): JSX.Element => {

    // const {setUser, setDisplayName} = useContext(UserDetailsContext)
    const [userCreds, setUserCreds] = useState<User>({username: '', password: ''})
    // const [showPassword, setShowPassword] = useState(false)
    
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
            fetch(`http://localhost:4000/login`, {
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
            fetch(`http://localhost:4000/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, password: hashedPassword})
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                // setDisplayName(data.user.username)
                // setUser(data.token)
                // localStorage.setItem('user', data.token)
                // localStorage.setItem('displayname', data.user.username)
            })
            // .then(() => handleClose(false))
            .catch(err => alert(err))
    }
    }

    const handleForm = (e: ChangeEvent<HTMLInputElement>) => {
        setUserCreds({ ...userCreds, [e.target.name]: e.target.value})
    }

    return (
        <>
        <form>
            <TextField
                required
                id="outlined-required"
                label="Username"
                name="username"
                onChange={handleForm}
            />
            <TextField
                required
                id="outlined-password-input"
                label="Password"
                type="password"
                name="password"
                autoComplete="current-password"
                onChange={handleForm}
            />
            <Button onClick={handleSignUp} >
                Submit
            </Button>
        </form>
        </>
    )
}