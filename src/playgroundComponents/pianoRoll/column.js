import React from 'react'
import Cell from "./cell"
//in charge of x 

const Column = (props) => {
  const getRows = () => {
    let i = 0
    const columns = []
    const keys = ["C5", "B4", "A#4", "A4", "G#4", "G4", "F#4", "F4", "E4", "D#4", "D4", "C#4", "C4", "B3", "A#3", "A3", "G#3", "G3", "F#3", "F3", "E3", "D#3", "D3", "C#3", "C3"]
    keys.forEach(key => {
      columns.push(<Cell x={props.x} y={i} keyName={key} sound={props.sound} addToRoll={props.addToRoll} removeFromRoll={props.removeFromRoll} />)
      i++
    })
    return columns
  }

  return (
    <div>
      {getRows().map(row => row)}
    </div>
  )
}

export default Column
