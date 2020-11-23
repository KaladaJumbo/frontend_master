import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container';

import Question from './Question'

const useStyles = makeStyles((theme) => ({
    root: {
        marginRight: "auto",
        marginLeft: "auto"
    },
    container: {
        backgroundColor: "grey",
        height: window.innerHeight,
        overflow: "Hidden",
    },
    card: {
        padding: "auto",
        margin: "auto",
        marginTop: "auto",
        marginBottom: "auto",
        width: "50%",

    }
}));

const Quiz = () => {
    const classes = useStyles();

    const [response, setResponse] = useState("")
    const [note, setNote] = useState("")
    const [answer, setAnswer] = useState("")
    const [test, setTest] = useState([])

    const bURL = "http://localhost:3000/"

    const nextQuestion = () => {
        if (test.length > 0){
            let newTest = test
            let question = newTest.pop()
            setTest(newTest)
            if (question.note[0] == "["){
                setNote(JSON.parse(question.note))
            }
            else{
                setNote(question.note)
            }
            setAnswer(question.answer)
        }
        
    }

    const submitHandler = (e) => {
        e.preventDefault();
        let right = answer == response || response == "next"
        alert(right === true ? "correct": "wrong");
        setResponse("");
        if (right) {
            //do something
        }
        else {
            //do something else
        }
        nextQuestion()

    }

    const fetchRandom10 = async () => {
        const res  = await fetch(bURL + "questions/random10")
        const data = await res.json()
        await setTest(data)
    }
    
    useEffect(() => {
        console.log("fetch");
        fetchRandom10()
        
    }, [])

    useEffect(() => {
        console.log("next");
        nextQuestion()
        
    }, [test])

    return (
        <Container className={classes.container}>
            <div className={classes.root}>
            <br/>
            <br/>
            <br/>
            <Typography variant="h1">Practice</Typography>
            <br/>
            <br/>
            <br/>
                <Card className={classes.card}>
                        <CardContent>
                            <h2>Quiz</h2>
                            <h4>what is the note?</h4>
                            <Question note={note} />
                        </CardContent>
                        <CardActions>
                            <form onSubmit={(e) => { submitHandler(e) }}>
                                <input type="text" value={response} onChange={(e) => { setResponse(e.target.value) }} />
                            </form>
                        </CardActions>
                </Card>  
            </div>
        </Container>
    )
}

export default Quiz

//test
