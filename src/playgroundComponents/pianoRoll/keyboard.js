import React from 'react'
import Cell from "./cell"
import Key from './key'

//in charge of x 

const Keyboard = (props) => {

  return (
    <div>
      <Key color={"white"} noteName={"C"} sound={props.sound} />
      <Key color={"white"} noteName={"B"} sound={props.sound} />
      <Key color={"black"} noteName={"A#"} sound={props.sound} />
      <Key color={"white"} noteName={"A"} sound={props.sound} />
      <Key color={"black"} noteName={"G#"} sound={props.sound} />
      <Key color={"white"} noteName={"G"} sound={props.sound} />
      <Key color={"black"} noteName={"F#"} sound={props.sound} />
      <Key color={"white"} noteName={"F"} sound={props.sound} />
      <Key color={"white"} noteName={"E"} sound={props.sound} />
      <Key color={"black"} noteName={"D#"} sound={props.sound} />
      <Key color={"white"} noteName={"D"} sound={props.sound} />
      <Key color={"black"} noteName={"C#"} sound={props.sound} />
      <Key color={"white"} noteName={"C"} sound={props.sound} />
      <Key color={"white"} noteName={"B"} sound={props.sound} />
      <Key color={"black"} noteName={"A#"} sound={props.sound} />
      <Key color={"white"} noteName={"A"} sound={props.sound} />
      <Key color={"black"} noteName={"G#"} sound={props.sound} />
      <Key color={"white"} noteName={"G"} sound={props.sound} />
      <Key color={"black"} noteName={"F#"} sound={props.sound} />
      <Key color={"white"} noteName={"F"} sound={props.sound} />
      <Key color={"white"} noteName={"E"} sound={props.sound} />
      <Key color={"black"} noteName={"D#"} sound={props.sound} />
      <Key color={"white"} noteName={"D"} sound={props.sound} />
      <Key color={"black"} noteName={"C#"} sound={props.sound} />
      <Key color={"white"} noteName={"C"} sound={props.sound} />
    </div>
  )
}

export default Keyboard
