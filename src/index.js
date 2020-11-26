import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import Typography from '@material-ui/core/Typography'

const theme = createMuiTheme({

  typography: {
      h1: {
        
      },
      subtitle1: {
  
      }
  },
  palette: {
    primary: {
      main: "#c2cad0" //light blue-grey
    },
    secondary: {
      main: "#546e7a", //dark blue
      roseGold: "pink"
    }
  },
  //fontFamily: 'Chilanka' // as an aside, highly recommend importing roboto font for Material UI projects! Looks really nice
});

ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider 
    theme={theme}
    >
      <Typography /> 
        <App />
      <Typography />
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

