import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper"
import Box from "@material-ui/core/Box"
import { Grid, Typography } from '@material-ui/core';


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

const PianoHeader = (props) => {
    const classes = useStyles();

    const header = () => {
        return (
            <Box  display="inline" onClick={() => props.play()}>
                <Paper variant="outlined" square={true} border={1} className={classes.cell} style={{backgroundColor: "red"}}>
                    <Typography style={{textAlign: "center", color: "yellow", marginTop: "5%"}}>
                        play
                    </Typography>
                </Paper>
            </Box>
        )
    }

  return (
    <div>
        <Grid>
            <Grid item>
                {header()}
            </Grid>
        </Grid>
    </div>
  )
}

export default PianoHeader
