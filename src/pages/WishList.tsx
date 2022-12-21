import { useContext, useEffect, useState } from "react";
import { Game } from "../services/appInterfaces";
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Rating } from "@mui/material";
import { GameProps } from "../services/propTypes";
import { gameListStyles } from "../styles/gameListStyles";
import { UserDetailsContext } from "../App";
import { useNavigate } from "react-router-dom";

export const WishList = (): JSX.Element => {

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
            setSuccessMessage(`Removed ${game.name} from your wishlist`)
        } else {
            setErrorMessage(data.message)
            setErrorPopUp(true)
            throw new Error(data.message)
        }
        return
    }

    return (
        <div style={gameListStyles.gameListContainer}>
        {favData?.map((game: Game) => {
            return (
                <Card key={game.id} sx={gameListStyles.gameListCard}>
                    <CardMedia
                        component="img"
                        height="300"
                        image={game.background_image}
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {game.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {game.suggestions_count}
                        </Typography>
                        <Rating name="read-only" value={game.rating} precision={0.5} readOnly />
                    </CardContent>
                    <CardActions style={gameListStyles.gameListCardAction}>
                            <Button size="small" color={"success"} variant="contained" onClick={() => handleRemoveFav(game)}>Remove Wishlist</Button>
                            <Button size="small" color="info" variant="contained">Learn More</Button>
                    </CardActions>
                </Card>
            )
        })}
    </div>  
    )
}