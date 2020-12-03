import React, { useEffect, useState } from 'react';

import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Chart from './Chart';
import Weaknesses from './weaknesses';
import User from './User'
import { Slide } from '@material-ui/core';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    backgroundColor: theme.palette.primary.main
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    "&:hover": {
        transform: "scale3d(1.05, 1.05, 0.50)"
      },
    
  },
  fixedHeight: {
    height: 240,
  },
  title:{
    flexGrow: 1,
    marginLeft: "auto",
    marginRight: "auto",
    color: theme.palette.secondary.main,
    
  },
}));

const Main = () => {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const handleUser = () => {
    setChecked((prev) => !prev);
  };

  useEffect(() => {
    handleUser()
  }, [])

  return (
    <div className={classes.root}>
      <CssBaseline />
      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
                <Typography  
                style={{fontFamily: 'Arizonia, cursive', "fontWeight": 600, marginRight: "1%", transform: "scale3d(1.15, 1.15, 1)"}} 
                className={classes.title} variant="h2"
                >
                    Dashboard
                </Typography>
                <Typography  
                style={{fontFamily: 'Times', "fontWeight": 500, marginRight: "1%", marginBottom: "1%"}} 
                className={classes.title} variant="h6"
                >
                    Track your progress and find personalized tricks, tips, and tests!
                </Typography>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Slide direction="right" in={checked} mountOnEnter unmountOnExit timeout={800}>
                <Paper className={fixedHeightPaper} elevation={12}>
                  <Chart />
                </Paper>
              </Slide>
            </Grid>
            {/* Weaknesses */}
            <Grid item xs={12} md={4} lg={3}>
              <Slide direction="left" in={checked} mountOnEnter unmountOnExit timeout={800}>
                <Paper className={fixedHeightPaper} elevation={12}>
                  <Weaknesses />
                </Paper>
              </Slide>
            </Grid>
            {/* User Data */}
            <Grid item xs={12}>
              <Slide direction="up" in={checked} mountOnEnter unmountOnExit timeout={800}>
                <Paper className={classes.paper} elevation={12}>
                  <User />
                </Paper>
              </Slide>
            </Grid>
          </Grid>
          <Box pt={4}>
          </Box>
        </Container>
      </main>
    </div>
  );
}

export default Main