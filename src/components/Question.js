import React, { useEffect } from 'react'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import IconButton from "@material-ui/core/IconButton"
import * as Tone from "tone"

const Question = (props) => {
    
    const sampler = new Tone.Sampler({
        urls: {
            "C4": "C4.mp3",
            "D#4": "Ds4.mp3",
            "F#4": "Fs4.mp3",
            "A4": "A4.mp3",
        },
        release: 1,
        baseUrl: "https://tonejs.github.io/audio/salamander/",
    }).toDestination();
    
    
    const sound = (notes = ["C4"]) => {

        Tone.loaded().then(() => {
            sampler.triggerAttackRelease(notes, 2);
        })
    
    }

    useEffect(() => {
    }, [props.note])

    return (
        <div>
        <IconButton color="primary" aria-label="upload picture" component="span" onClick={() => {sound(props.note)}} >
          <PlayCircleOutlineIcon fontSize="large" style={{fontSize: "70px", fill: "#E3AEB1"}} />
        </IconButton >
        </div>
    )
}

export default Question
