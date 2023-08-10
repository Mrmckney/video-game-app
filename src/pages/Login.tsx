import { ChangeEvent, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TextField, Button } from '@mui/material'
import bcrypt from 'bcryptjs'
import { UserDetailsContext } from '../App'
import { UserCreds } from '../services/appInterfaces'
import { loginStyles } from '../styles/loginStyles'

const mySalt = "$2a$10$Y5H9Mw5WmFVDB46qEhCU0u"

export const Login = (): JSX.Element => {

    const navigate = useNavigate()
    const {setUser, setDisplayName, setErrorMessage, errorPopUp, setErrorPopUp, setLoading, setSuccessMessage, setSuccessPopUp} = useContext(UserDetailsContext)
    const [userCreds, setUserCreds] = useState<UserCreds>({} as UserCreds)
    const [isLogin, setIsLogin] = useState<boolean>(true)
    
    const handleSignIn = async () => {
        if(!userCreds){
            setErrorPopUp(true)
            setErrorMessage('Missing username or password')
            return 
        }
        const {username, password} = userCreds
        if(!username || !password){
            setErrorPopUp(true)
            setErrorMessage('Missing username or password')
            return
        }
        if(username && password){
            setLoading(true)
            const hashedPassword = bcrypt.hashSync(password, mySalt)
            const response: Response = await fetch(`http://localhost:4000/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, password: hashedPassword})
            })
            const data = await response.json()
            setLoading(false)
            if(data.message === 'User login successful'){
                setDisplayName(data.user.username)
                setUser(data.token)
                localStorage.setItem('user', data.token)
                localStorage.setItem('displayname', data.user.username)
                setSuccessPopUp(true)
                setSuccessMessage(`${data.message}: Welcome back ${data.user.username}`)
                navigate('/')
            } else {
                setErrorPopUp(true)
                setErrorMessage(data.message)
                throw new Error(data.message)
            }
            return
        }
    }

    const handleSignUp = async () => {
        if(!userCreds){
            setErrorPopUp(true)
            setErrorMessage('Missing username or password')
            return 
        }
        const {username, password} = userCreds
        if(!username || !password){
            setErrorPopUp(true)
            setErrorMessage('Missing username or password')
            return
        }
        if(username && password){
            setLoading(true)
            const hashedPassword = bcrypt.hashSync(password, mySalt)
            const response: Response = await fetch(`http://localhost:4000/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, password: hashedPassword})
            })
            const data = await response.json()
            setLoading(false)
            if (data.message === "User created successfully") {
                setDisplayName(data.username)
                setUser(data.token)
                localStorage.setItem('user', data.token)
                localStorage.setItem('displayname', data.username)
                setSuccessPopUp(true)
                setSuccessMessage(`${data.message}: Welcome ${data.username}`)
                navigate('/')  
            } else {
                setErrorPopUp(true)
                setErrorMessage(data.message)
                throw new Error(data.message)
            }
            return
        }
    }

    const handleForm = (e: ChangeEvent<HTMLInputElement>) => {
        setUserCreds({ ...userCreds, [e.target.name]: e.target.value})
    }

    return (
        <>
        <div style={loginStyles.loginContainer}>
            <div style={loginStyles.loginFormContainer}>
                <h1 style={{marginBottom: 20}}>{isLogin ? 'Login' : 'Sign Up'}</h1>
                    <TextField
                        error={errorPopUp}
                        required
                        id="filled-basic"
                        label="Username"
                        name="username"
                        onChange={handleForm}
                        variant="filled"
                        sx={{marginBottom: 3, backgroundColor: 'white'}}
                    />
                    <TextField
                        error={errorPopUp}
                        required
                        id="filled-password-input"
                        label="Password"
                        type="password"
                        name="password"
                        onChange={handleForm}
                        variant="filled"
                        sx={{marginBottom: 3, backgroundColor: 'white'}}
                    />
                    <Button sx={{marginBottom: 40}} variant='contained' onClick={isLogin ? handleSignIn : handleSignUp} >
                        Submit
                    </Button>
                    {/* <Button variant='contained' color='inherit' style={{color: 'black'}} onClick={() => setIsLogin(!isLogin)} >
                        Switch to {isLogin ? 'Sign Up' : 'Login'}
                    </Button> */}
            </div>
        </div>
        </>
    )
}