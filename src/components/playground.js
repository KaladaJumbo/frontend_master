import React from 'react'
import PlayCard from '../playgroundComponents/card'
import pianorollPhoto from "../images/pianoroll.png"
import { Container, Grid } from '@material-ui/core'
import Typography from "@material-ui/core/Typography"
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    title:{
        flexGrow: 1,
        marginLeft: "auto",
        marginRight: "auto",
        color: theme.palette.secondary.main,
        
    },
    container: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(4),
    },
}))

const Playground = () => {
    const classes = useStyles();

    const piano = {
        info: "Simple two octave piano roll. Notes can be recorded and played in the sequence.",
        heading: "Piano Roll",
    }
    return (
        <div>
            <Container maxWidth="lg" className={classes.container} >
                <Typography  
                style={{fontFamily: 'Arizonia, cursive', "fontWeight": 600, marginRight: "1%", transform: "scale3d(1.15, 1.15, 1)"}} 
                className={classes.title} variant="h2"
                >
                    Playground
                </Typography>
                <Typography  
                style={{fontFamily: 'Times', "fontWeight": 500, marginRight: "1%", marginBottom: "5%"}} 
                className={classes.title} variant="h6"
                >
                    Wanna have fun? Check out the new features currently in development!
                </Typography>
                <Grid container>
                    <Grid container item xs={6} s={6}>
                        {/* pianoroll */}
                        <PlayCard overline={'28 MAR 2019'} heading={piano.heading} imageURL={pianorollPhoto} info={piano.info} />
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default Playground
