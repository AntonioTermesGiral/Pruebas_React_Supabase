import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid } from "@mui/material";
import Avatar from "@mui/material/Avatar";

type Props = {
    title : string,
    score : number,
    platforms : string,
    cover : string,
    style : Object,
    imageSize : number
}

const GameCard = ( {title, score, platforms, cover, style, imageSize} : Props) => {

    const getScoreColor = () => {
        switch(true) {
            case (score > 60):
                return "lime"
            case (score > 30):
                return "yellow"
            case (score >= 0):
                return "red"
        }
    }

    return (
        <Card sx={style}>
            <CardActionArea>
                <div
                style={{
                    display: "inlineBlock",
                    overflow: "hidden",
                    backgroundColor: "black",
                    width: "100%",
                    height: "100%"
                }}
                >
                {/* TODO Meter zoom programaticamente */}
                <CardMedia
                    component="img"
                    height= {imageSize}
                    image= {cover}
                    alt="game image"
                    sx={{
                    transition: "transform .9s",
                    "&:hover": {
                        transform: "scale(1.4)"
                    }
                    }}
                />
                </div>
                <CardContent>
                <Grid style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Avatar
                        sx={{
                            bgcolor: getScoreColor(),
                            width: "1.5em",
                            height: "1.5em"
                        }}
                    >
                    {score}
                    </Avatar>
                </Grid>
                {/*Cambiar por algo como estado + platforms*/}
                <Typography variant="body2" color="text.secondary">
                    {platforms}
                </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default GameCard;