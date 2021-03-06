import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Typography from "@material-ui/core/Typography"
import { IconButton } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';

const useStyles = makeStyles(theme => ({
  list: {
    width: 250,
    
  },
  drawer: {
    backgroundColor: theme.palette.primary.main,
    height: "100vh"
  },
  fullList: {
    width: 'auto',
  },
  button: {
    float: "right", 
    marginRight: "2%",
    color: theme.palette.secondary.main,
    fontFamily: 'Arizonia, cursive', 
    "fontWeight": 600, 
    transform: "scale(2)",    // fontSize: "200%",
    "&:hover": {
        color: theme.palette.secondary.roseGold, 
    },
    marginTop: "1%",
    marginLeft: theme.spacing(1),
  },
  title: {
    fontFamily: 'Arizonia, cursive', 
    "fontWeight": 600, 
    marginLeft: 0, 
    marginTop: "5%", 
    marginBottom: "40%",
    paddingLeft: "5%",
    background: "linear-gradient(0.25turn, #E3AEB1, #546e7a )",
    color: "#455a64"

  },
  listItemText: {
      color: theme.palette.secondary.main,
      fontFamily: 'times',
      fontSize: "1.2rem" 

  }
}));

const QuizDrawer = (props) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div className={classes.drawer}>
        <div
        className={clsx(classes.list, {
            [classes.fullList]: anchor === 'top' || anchor === 'bottom',
        })}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
        >
            {/* test */}
            <Typography  
            className={classes.title} variant="h4">
                Master Output
            </Typography>
            <span style={{marginLeft: "3%", fontFamily: 'Arizonia, cursive', fontWeight: 300, fontSize: "200%", color: "#455a64"}}>Single Sounds</span>
            <Divider />
            <List>
                <ListItem button onClick={() => props.drawerParams("random10", true)}>
                    <ListItemText classes={{primary: classes.listItemText}} primary={"Random"} />
                </ListItem>
                <ListItem button onClick={() => props.drawerParams("notes", true)}>
                    <ListItemText classes={{primary: classes.listItemText}} primary={"Notes"} />
                </ListItem>
                <ListItem button onClick={() => props.drawerParams("chords", true)}>
                    <ListItemText classes={{primary: classes.listItemText}} primary={"Chords"} />
                </ListItem>
            </List>
            <span style={{marginLeft: "3%", fontFamily: 'Arizonia, cursive', fontWeight: 300, fontSize: "200%", color: "#455a64"}}>Intervals</span>
            <Divider />
            <List>
                <ListItem button onClick={() => props.drawerParams("scales", false)}>
                    <ListItemText classes={{primary: classes.listItemText}} primary={"Scales"} />
                </ListItem>
                <ListItem button onClick={() => props.drawerParams("progressions", false)}>
                    <ListItemText classes={{primary: classes.listItemText}} primary={"Progressions"} />
                </ListItem>
                <span style={{marginLeft: "3%", fontFamily: 'Arizonia, cursive', fontWeight: 300, fontSize: "200%", color: "#455a64"}}>Extras</span>
                <Divider />
                <ListItem button >
                    <a href="/playground"><ListItemText classes={{primary: classes.listItemText}} primary={"Playground"} /></a>
                </ListItem>
                {/* <ListItem button onClick={() => props.drawerParams("major vs minor", true)}>
                    <ListItemText classes={{primary: classes.listItemText}} primary={"major vs minor"} />
                </ListItem> */}
            </List>
        </div>
    </div>
  );

  return (
    <div>
        <React.Fragment key={"left"}>
          <IconButton onClick={toggleDrawer("left", true)} className={classes.button}>
            <SettingsIcon fontSize="30%"/>
          </IconButton>
          <Drawer anchor={"left"} open={state["left"]} onClose={toggleDrawer("left", false)}>
            {list("left")}
          </Drawer>
        </React.Fragment>
    </div>
  );
}

export default QuizDrawer