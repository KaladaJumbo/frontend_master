import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper"
import Box from "@material-ui/core/Box"
import { Typography } from '@material-ui/core';




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

const Key = (props) => {
  const classes = useStyles();

  const [clicked, setClicked]= useState(false)
  const [textColor, setTextColor]= useState("black")

  useEffect(() => {
     if (props.color === "white"){
      setTextColor("black")
    }
    else{
        setTextColor("white")
    }
  }, [props.color])
  

  return (
    <div style= {{display: "inline"}}>
      <span onClick={() => setClicked(!clicked)} >
        <Box  display="inline">
            <Paper variant="outlined" square={true} border={1} className={classes.cell} style={{backgroundColor: props.color}}>
                <Typography style={{textAlign: "center", marginTop: "10%", marginLeft: "60%", transform: "rotate(-90deg)", color: textColor}}>
                    {props.noteName}
                </Typography>
            </Paper>
        </Box>
      </span>
    </div>
  )
}

export default Key
