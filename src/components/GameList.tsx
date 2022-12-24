import { useContext, useEffect, useState } from "react";
import { Game } from "../services/appInterfaces";
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Rating, Box } from "@mui/material";
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { GameProps } from "../services/propTypes";
import { gameListStyles } from "../styles/gameListStyles";
import { UserDetailsContext } from "../App";
import { useNavigate } from "react-router-dom";

export const GameList = ({gameData}: GameProps): JSX.Element => {

    const navigate = useNavigate()
    const {user, setFavData, favData, setErrorMessage, setErrorPopUp, setSuccessMessage, setSuccessPopUp} = useContext(UserDetailsContext)

    useEffect(() => {
        if(user) {
            loadFavorites().then()
        }   
    }, [user])

    const loadFavorites = async () => {
        const response = await fetch(`http://localhost:4000/favorites`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application',
                Authorization: `Bearer: ${user}`
            }
        })
        const data = await response.json()
        if (data.favorites) {
            setFavData(data.favorites)
        } else {
            setErrorMessage(data.message)
            setErrorPopUp(true)
            throw new Error(data.message)
        }
    }

    const handleFavorite = async (game: Game) => {
        const response = await fetch(`http://localhost:4000/addfav`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer: ${user}`
            },
            body: JSON.stringify(game)
        })
        const data = await response.json()
        if (data.message === 'Favorite added') {
            loadFavorites().then()
            setSuccessPopUp(true)
            setSuccessMessage(`Added ${game.name} to your Wishlist`)
        } else {
            setErrorMessage(data.message)
            setErrorPopUp(true)
            throw new Error(data.message)
        }
        return
    }  

    const handleRemoveFav = async (game: Game) => {
        const response = await fetch(`http://localhost:4000/removefav`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer: ${user}`
            },
            body: JSON.stringify(game)
        })
        const data = await response.json()
        if (data.message === 'Removed Favorite') {
            loadFavorites().then()
            setSuccessPopUp(true)
            setSuccessMessage(`Removed ${game.name} from your Wishlist`)
        } else {
            setErrorMessage(data.message)
            setErrorPopUp(true)
            throw new Error(data.message)
        }
        return
    }

    return (
        <div style={gameListStyles.gameListContainer}>
        {favData && gameData?.map((game: Game) => {
            const isFavorite: Game | undefined = favData && favData?.find(({id}) => id === game.id);
            return (
                <Card key={game.id} sx={gameListStyles.gameListCard}>
                    <CardMedia
                        component="img"
                        height="300"
                        image={game.background_image}
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" sx={{color: 'white'}}>
                            {game.name}
                        </Typography>
                        <div style={{display: 'flex', paddingBottom: 5}}>
                            <Rating name="read-only" icon={<SportsEsportsIcon />} emptyIcon={<SportsEsportsIcon />} value={game.rating} precision={0.1} readOnly sx={{color: 'white'}} size='large' />
                            <Box style={{color: 'white', paddingLeft: 8}} >{game.rating.toFixed(1)}</Box>
                        </div>
                        <Typography gutterBottom component="div" sx={{color: 'white'}}>
                            R | {game.esrb_rating ? game.esrb_rating.name : 'Unrated'}
                        </Typography>
                    </CardContent>
                    <CardActions style={gameListStyles.gameListCardAction}>
                        {user ? 
                            <Button size="small" color={isFavorite ? "success" : "warning"} variant="contained" onClick={() => isFavorite ? handleRemoveFav(game) : handleFavorite(game)}>{isFavorite ? "Remove Wishlist" : "Wishlist"}</Button>
                        : 
                            <Button size="small" color="inherit" variant="contained" onClick={() => navigate('/login')}>Login to Wishlist game</Button>
                        }
                            <Button size="small" color="info" variant="contained" onClick={() => navigate(`/game/${game.slug}`)}>Learn More</Button>
                    </CardActions>
                </Card>
            )
        })}
    </div>  
    )
}