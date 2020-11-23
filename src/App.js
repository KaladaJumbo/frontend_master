import Quiz from "./components/Quiz"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Container from "@material-ui/core/Container";
import { makeStyles } from '@material-ui/core/styles';

import Home from "./components/Home"
import Test from "./components/Tests"
import Login from "./components/Login";
import NavBar from "./components/NavBar"
import InfoContext from "./context/Tesst"


const useStyles = makeStyles((theme) => ({
  root:{
    margin: 0,
    padding: 0
    // backgroundColor: "#80deea"
  },

}));

const App = props => {
  const classes = useStyles();

  return (
    <div className="App">
      <Router>
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
          <Route exact path="/filler">
            <Quiz />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
        </Switch>
      </Container>
      </Router>
    </div>
  );
}

export default App;

        // <InfoContext.Provider value={"hey"}>
        //   <Quiz />
        // </InfoContext.Provider>

