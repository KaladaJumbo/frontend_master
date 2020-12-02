import React from 'react'
import Column from './column'
import Grid from "@material-ui/core/Grid"

const PianoGrid = (props) => {
  const getColumns = () => {
    let i = 0
    const columns = []
    while (i < props.x){
      columns.push(<Column y={props.y} x={i} sound={props.sound} addToRoll={props.addToRoll} removeFromRoll={props.removeFromRoll} roll={props.roll} setRoll={props.setRoll} />)
      i++
    }
    return columns
  }


  return (
    <Grid 
    container 
    alignItems="flex-start"
    >
      <Grid container item xs={12}>
        {getColumns().map(column => column)}
      </Grid>
    </Grid>
  )
}

export default PianoGrid

