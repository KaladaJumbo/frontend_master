import React, { useEffect } from 'react'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import IconButton from "@material-ui/core/IconButton"
import * as Tone from "tone"

const IntervalQuestion = (props) => {
    
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
    
    
    const sound = (notes = ["C4", "d4", ["c4", "e4", "g4"]]) => {
        const now = Tone.now()
        let interval = 0
        console.log(notes)
        notes.forEach(note => {
            console.log(note)
           Tone.loaded().then(() => {
                sampler.triggerAttackRelease(note, 0.8, now + interval);
                interval += 0.8
            }) 
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

export default IntervalQuestion
