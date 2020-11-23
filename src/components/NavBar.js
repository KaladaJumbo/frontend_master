import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button"
import { useHistory } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    root:{
        backgroundColor: "#c2cad0",
    },
    title:{
        flexGrow: 1,
        marginLeft: "1%",
        marginRight: "5%",
        color: "#546e7a",
    },
    toolbar: {
        alignItems: 'center'
    },
    button: {
        color: "#546e7a", 
        fontFamily: 'Arizonia, cursive', 
        "fontWeight": 600, 
        textTransform: 'none', 
        fontSize: "200%"
    }
  
}));


const ElevationScroll = (props) => {
  const { children, window } = props;
  

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 10 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,

  window: PropTypes.func,
};


const NavBar = (props) => {
    const classes = useStyles();
    const history = useHistory();

    const homeLink = () =>{ 
        let path = `/`; 
        history.push(path);
    }

    const practiceLink = () =>{ 
        let path = `/practice`; 
        history.push(path);
    }

    const testsLink = () =>{ 
        let path = `/tests`; 
        history.push(path);
    }

    const fillerLink = () =>{ 
        let path = `/filler`; 
        history.push(path);
    }

    const loginLink = () =>{ 
        let path = `/login`; 
        history.push(path);
    }


    return (
        <div>
            <CssBaseline />
            <ElevationScroll {...props}>
                <AppBar className={classes.root} >
                    <Toolbar className={classes.toolbar}>
                        <Typography style={{fontFamily: 'Arizonia, cursive', "fontWeight": 600}} className={classes.title} variant="h5">Master Output</Typography>
                        <Button className={classes.button} onClick={() => {homeLink()}} style={{marginRight: "1%"}}>Home</Button>
                        <Button className={classes.button} onClick={() => {practiceLink()}} style={{marginRight: "1%"}}>Practice</Button>
                        <Button className={classes.button} onClick={() => {testsLink()}} style={{marginRight: "1%"}}>Tests</Button>
                        <Button className={classes.button} onClick={() => {fillerLink()}} style={{marginRight: "5%"}}>Filler</Button>
                        <Button className={classes.button} onClick={() => {loginLink()}} style={{marginRight: "1%"}}>Login</Button>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <Toolbar />
        </div>
    )
}

export default NavBar