import React, { useContext, useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import UserContext from '../context/UserContext';


const useStyles = makeStyles((theme) => ({
  container:{
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
      color: theme.palette.secondary.main,
    "&:hover": {
        color: "red"
      }
  },
  title: {
      color: theme.palette.secondary.main
  }
}));

const Login = () => {
  const classes = useStyles();
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [token, setToken] = useState(null)

  const {user, setUser} = useContext(UserContext)

  const bURL = "http://localhost:3000/"

  const submitHandler = (e) => {
    e.preventDefault()
    
    const meta = {
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({username: username, password: password})
    }
    fetch( bURL + `login`, meta )
    .then(res => res.json())
    .then(async (data) => {
      if(data.auth){
        await setTimeout( () => {
            console.log("login");
            console.log(data);
            localStorage.setItem("token", data.token)
            setUser(data.user)
            setToken(localStorage.getItem("token"))
        }, 0)
      }
      else {
        alert(data.info)
      }
    })
}

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <CssBaseline />
      <div className={classes.paper}>
      <Typography 
      style={{fontFamily: 'Arizonia, cursive', "fontWeight": 600}} 
      className={classes.title} 
      variant="h2">
        Master Output
      </Typography>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} noValidate onSubmit={(e) => submitHandler(e)}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="email"
            autoComplete="username"
            autoFocus
            onChange={(e) => {setUsername(e.target.value)}}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => {setPassword(e.target.value)}}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="secondary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Login
          </Button>
          <Grid container>
            <Grid item xs>
            </Grid>
            <Grid item>
              <Link className={classes.link} href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
      </Box>
    </Container>
  );
}

export default Login
