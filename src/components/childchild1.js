import React, {useContext} from 'react'
import User from '../context/UserContext'
import * as Tone from "tone"


const Childchild1 = (props) => {
    const msg = useContext(User)


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

    return (
        <div>
            <h1>msg</h1>
            <h2>{msg}</h2>
            <br/>
            <button onClick={() => {sound()}}>play</button>
        </div>
    )
}

export default Childchild1


