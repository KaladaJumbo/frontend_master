import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  root: {
    margin: 'auto',
    borderRadius: spacing(2), // 16px
    transition: '0.3s',
    boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
    position: 'relative',
    maxWidth: 500,
    // marginLeft: 'auto',
    overflow: 'initial',
    backgroundImage: 'linear-gradient(147deg, #c2cad0 10%, #E3AEB1 80%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: spacing(2),
    [breakpoints.up('md')]: {
      flexDirection: 'row',
      paddingTop: spacing(2),
    },

  },
  media: {
    width: '88%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: spacing(-3),
    height: 0,
    paddingBottom: '48%',
    borderRadius: spacing(2),
    backgroundColor: '#fff',
    position: 'relative',
    [breakpoints.up('md')]: {
      width: '100%',
      marginLeft: spacing(-3),
      marginTop: 0,
      transform: 'translateX(-8px)',
    },
    '&:after': {
      content: '" "',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    //   backgroundImage: 'linear-gradient(147deg, #c2cad0 0%, #E3AEB1 60%)',
      borderRadius: spacing(2), // 16
      opacity: 0.5,
    },
  },
  content: {
    padding: 24,
  },
  cta: {
    marginTop: 24,
    textTransform: 'initial',
  },
  button: {
    float: "right"
  },
  spacer:{
      margin: "1%"
  }
}));

const PlayCard = (props) => {
  const styles = useStyles();
  
  return (
    <Card className={styles.root}>
      <CardMedia
        className={styles.media}
        image={props.imageURL}
      />
      <CardContent>
      {/* <div>{props.overline}</div> */}
      <div>{props.heading}</div>
      <span className={styles.spacer}></span>
      <div>{props.info}</div>
        <a href="/pianoroll"><Button variant="outlined" className={styles.button}>Explore</Button></a>
      </CardContent>
    </Card>
  );
};

export default PlayCard