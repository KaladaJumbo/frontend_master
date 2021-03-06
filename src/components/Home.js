import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import Logo from "../images/Logo5.png"
import { Grow, Slide } from '@material-ui/core';


const currentWindow = window.innerHeight

const useStyles = makeStyles((theme) => ({

    section:{
        height: currentWindow * .65,
        width: window.innerWidth,
        backgroundColor:  theme.palette.primary.main,
        margin: 0,
    },
    section2:{
        height: currentWindow * .65,
        width: window.innerWidth,
        backgroundColor: "#c2b9b0",
        margin: 0,
    },
    image: {
        width: window.innerWidth * .87,
        marginLeft: "auto",
        marginRight: "auto",
        display: "block"
    },
    filler:{
        height: currentWindow * .35,
        width: window.innerWidth,
        backgroundColor: "#c2b9b0",
        margin: 0,
    },
    info:{
        marginLeft: "10%",
        marginRight: "10%",
    }
  
}));
  
const Home = () => {
    const classes = useStyles();
    const [checked, setChecked] = useState(false);


    const handleUser = () => {
        setChecked((prev) => !prev);
    }

    useEffect(() => {
        handleUser()
    }, [])


    return (
        <div>
            <div className={classes.section}>
                <br/>
                <Grow
                in={checked}
                style={{ transformOrigin: '0 0 0' }}
                {...(checked ? { timeout: 2000 } : {})}
                >
                    <div>
                        <img className={classes.image} src={Logo} alt="master output logo" />;
                    </div>
                </Grow>
            </div>
            <div className={classes.filler}></div>
            <div className={classes.section2}>
                <Typography className={classes.info} variant="h1" style={{fontFamily: "ArialBoldItalicMT", color: "white"}}>
                    Learn music as intended, by ear not hand.  
                </Typography>
                <Typography className={classes.info} variant="h4" style={{fontFamily: "ArialBoldItalicMT", color: "#546e7a"}}>
                    Take back control of the master output. Train your ear.
                </Typography>
            </div>
            <div className={classes.section}>
                
            </div>
        </div>
    )
}

export default Home
