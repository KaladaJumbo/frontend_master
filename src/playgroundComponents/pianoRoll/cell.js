import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper"
import Box from "@material-ui/core/Box"



const useStyles = makeStyles((theme) => ({
  cell: {
    height: "40px",
    width: "100px",
    margin: 0,
    padding: 0,
    borderColor: theme.palette.primary.main,
    
    // display:
  },
}))

const Cell = (props) => {
  const classes = useStyles();

  const [clicked, setClicked]= useState(false)

  const keyClicked = () => {
    const currentClicked = !clicked
    setClicked(currentClicked)
    console.log(props.keyName)
    if (currentClicked){
      props.addToRoll(props.x, props.keyName)
      props.sound([props.keyName])
    }
    else {
      props.removeFromRoll(props.x, props.keyName)
    }
  }

  return (
    <div style= {{display: "inline"}}>
      <span onClick={() => keyClicked()} >
        <Box  display="inline">
          <Paper variant="outlined" square={true} border={1} className={classes.cell} style={clicked ? {backgroundColor: "red"} : {backgroundColor: "white"}}>
            {/* {props.x % 4 === 0 && props.x !== 0 && props.y !== 0 ? "here" : null} */}
        </Paper>
        </Box>
      </span>
    </div>
  )
}

export default Cell
