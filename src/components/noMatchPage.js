import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'



const useStyles = makeStyles((theme) => ({
    root:{
        backgroundColor: theme.palette.primary.main
    },
    title:{
        marginLeft: "15%",
        marginTop: "10%",
        marginBottom: 0,
        paddingBottom: 0,
        color: theme.palette.secondary.main,
    },
    lost: {
        marginLeft: "40%",
        color: theme.palette.secondary.main,
    },
    toolbar: {
        alignItems: 'center'
    },
    button: {
        color: theme.palette.secondary.main, 
        fontFamily: 'Arizonia, cursive', 
        "fontWeight": 600, 
        textTransform: 'none', 
        fontSize: "200%",
        "&:hover": {
            transform: "scale3d(1.15, 1.15, 0.60)",
            color: theme.palette.secondary.roseGold
        },
    }
  
}));

const NoMatchPage = () => {
    const classes = useStyles();
    return (
        <div>
            <Typography 
            style={{fontFamily: 'Arizonia, cursive', "fontWeight": 600, fontSize: "10rem"}} 
            className={classes.title} variant="h1">
                Master Output
            </Typography>
            <Typography 
            style={{fontFamily: 'times', "fontWeight": 600, fontSize: "3rem", color: "red"}} 
            className={classes.lost} variant="h1">
                404 not found
            </Typography>
        </div>
    )
}

export default NoMatchPage