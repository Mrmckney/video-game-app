import { Game } from "../services/interfaces";
import { GameProps } from "../services/types";
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Rating } from "@mui/material";

export const GameList = ({gameData}: GameProps): JSX.Element => {

    return (
        <div style={{display: 'flex', flexWrap: 'wrap', backgroundColor: '#104676'}}>
        {gameData?.map((game: Game) => {
            return (
                <Card key={game.id} sx={{ width: 350, margin: 5, borderRadius: 3 }}>
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
                    <CardActions style={{display: 'flex', justifyContent: 'space-between'}}>
                            <Button size="small" color="warning" variant="contained">Wishlist</Button>
                            <Button size="small" color="info" variant="contained">Learn More</Button>
                    </CardActions>
                </Card>
            )
        })}
    </div>  
    )
}