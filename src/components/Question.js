import React, { useEffect } from 'react'
import * as Tone from "tone"

import Button from '@material-ui/core/Button'

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
            <Button style={{backgroundColor: "pink"}} onClick={() => {sound(props.note)}}>play</Button>
        </div>
    )
}

export default Question

//test