import react, { useState } from 'react'
import Quiz from "./components/Quiz"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Container from "@material-ui/core/Container";
import { makeStyles } from '@material-ui/core/styles';

import Home from "./components/Home"
import Test from "./components/Tests"
import Login from "./components/Login";
import NavBar from "./components/NavBar"
import UserContext from "./context/UserContext"
import SignUp from "./components/SignUp";
import Main from "./components/dashboard/Main";


const useStyles = makeStyles((theme) => ({
  root:{
    margin: 0,
    padding: 0
    // backgroundColor: "#80deea"
  },

}));

const App = props => {
  const classes = useStyles();
  const [user, setUser] = useState("test")


  return (
    <div className="App">
      <Router>
      <UserContext.Provider value={{user, setUser}}>
        <NavBar />
        <Container  maxWidth="xl" className={classes.root}>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/Practice">
              <Quiz />
            </Route>
            <Route exact path="/Tests">
              <Test />
            </Route>
            <Route exact path="/dashboard">
              <Main />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <SignUp />
            </Route>
          </Switch>
        </Container>
      </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;


