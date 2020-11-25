import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useState } from 'react';
import { Grid } from '@material-ui/core';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  depositContext: {
    flex: 1,
  },
  title:{
    marginLeft: "10%",
    marginRight: "auto",
    color: theme.palette.secondary.main,
  },
  footerLink: {
    
},

}));

const Weaknesses = () => {
  const classes = useStyles();
  const [tags, setTags] = useState(["chords", "minor keys", "scales","chords", "minor keys", "scales", "scales", "scales"])
  return (
    <React.Fragment>
      <div>
      <Typography
        style={{ fontFamily: 'Arizonia, cursive', "fontWeight": 600, marginRight: "1%" }}
        className={classes.title} variant="h3"
      >
        Weaknesses
      </Typography>
      <Typography
        style={{ fontFamily: 'Arizonia, cursive', "fontWeight": 600, marginRight: "1%", marginLeft: 0 }}
        className={classes.title} variant="h6"
      >
        tags
      </Typography>
      <Grid container xs={12}>
      {tags.map(tag => <Grid item xs={6}><Typography>{tag}</Typography></Grid>)}
      </Grid>
      <div className={classes.footerLink}>
        <Link color="primary" href="/tests">
          take a test on these weaknesses?
        </Link>
      </div>
      </div>
      
    </React.Fragment>
  );
}

export default Weaknesses