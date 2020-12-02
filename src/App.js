import react, { useEffect, useState } from 'react'
import Quiz from "./components/Quiz"
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";

import Container from "@material-ui/core/Container";
import { makeStyles } from '@material-ui/core/styles';

import Home from "./components/Home"
import Test from "./components/Tests"
import Login from "./components/Login";
import NavBar from "./components/NavBar"
import UserContext from "./context/UserContext"
import SignUp from "./components/SignUp";
import Main from "./components/dashboard/Main";
import NoMatchPage from "./components/noMatchPage"
import PApp from './playgroundComponents/pianoRoll/Papp';
import Playground from './components/playground';


const useStyles = makeStyles((theme) => ({
  root:{
    margin: 0,
    padding: 0
    // backgroundColor: "#80deea"
  },

}));

const App = props => {
  const classes = useStyles();
  const [user, setUser] = useState(null)
  const [loggedIn, setLoggedIn] = useState(null)

  const bURL = "http://localhost:3000/"

  const fetchUser = () => {

    const meta = {
      headers: {
        "Authentication": `Bearer ${localStorage.getItem("token")}`
      }
    }

    fetch( bURL + `login/user`, meta )
      .then(res => res.json())
      .then(async (data) => {
      if(data.auth){
        await setTimeout( () => {
          console.log("login");
          console.log(data);
          setUser({...data.user, tags: data.tags})
        }, 0)
      }
      else {
        alert(data.info)
      }
    })
  }

  useEffect(() => {
    if (localStorage.getItem("token")){
      fetchUser()
    }
  }, [])

  useEffect(() => {
    if (!!user){
      setLoggedIn(true)
      console.log("loggedIn")
    }
  }, [user])

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
              {loggedIn ? <Test /> : <Redirect to="/login"/> }
            </Route>
            <Route exact path="/dashboard">
            {loggedIn ? <Main /> : <Redirect to="/login"/> }
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <SignUp />
            </Route>
            <Route exact path="/playground">
              <Playground />
            </Route>
            <Route exact path="/pianoroll">
              <PApp />
            </Route>
            <Route component={NoMatchPage} />
          </Switch>
        </Container>
      </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;


