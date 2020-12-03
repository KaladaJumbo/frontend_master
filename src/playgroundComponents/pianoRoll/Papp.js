import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

import React, { useEffect, useState } from 'react'
import PianoGrid from "./grid"
import Keyboard from './keyboard'
import * as Tone from "tone"
import PianoHeader from './pianoHeader';


const useStyles = makeStyles((theme) => ({
    root: {
        // overflowX: 
    }
})) 

const PApp = () => {
    const classes = useStyles();
    const [roll, setRoll] = useState([])
    const [x, setX] = useState(44)
    const [played, setPlayed] = useState(-1)

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

  const playRoll = (notes = ["C4", "d4", ["c4", "e4", "g4"]]) => {
    const now = Tone.now()
    let interval = 0
    let counter = 0
    console.log(notes)
    notes.forEach(note => {
        if(note.length > 0){
            Tone.loaded().then(() => {
                sampler.triggerAttackRelease(note, 0.8, now + interval, 1);
                interval += .2
            }) 
        }
        else{
            Tone.loaded().then(() => {
                sampler.triggerAttackRelease("c4", 0.8, now + interval, 0.0);
                interval += .2
            }) 
        }
        counter++
    })
  }

  const addToRoll = (location, note) => {
    const r = roll
    r[location].push(note)
    console.log(r[location])
    console.log(r)
    setRoll(r)
  }

    const removeFromRoll = (location, note) => {
        const r = roll
        r[location] = r[location].filter(oNote => oNote !== note )
        console.log(r[location])
        console.log(r)
        setRoll(r)
    }

    const play = () => {
        playRoll(roll)
    }

    useEffect(() => {
        const data = []
        while(data.length < x){
            data.push([])
        }
        setRoll(data)
    }, [x])

    return (
        <div className={classes.root} style={{ width: 'max-content' }}>
            <PianoHeader x={x} play={play}/>
            <Grid container>
                <Grid item className={classes.Keyboard}>
                    <Keyboard sound={sound}/>
                </Grid>
                <Grid item >
                    <PianoGrid 
                    x={x} 
                    y={25} 
                    type={"normal"} 
                    sound={sound} 
                    roll={roll} 
                    setRoll={setRoll} 
                    addToRoll={addToRoll} 
                    removeFromRoll={removeFromRoll} 
                    played={played}
                    />
                </Grid>
            </Grid>
        </div>
    )
}

export default PApp
