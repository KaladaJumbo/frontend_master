import React, { useState, useEffect, useContext } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Question from './Question'
import { Container } from '@material-ui/core';
import UserContext from '../context/UserContext';




const useStyles = makeStyles((theme) => ({
    stepperSkin: {
        backgroundColor: theme.palette.primary.main,
        // paddingLeft: "20%"
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: "10%",
        marginBottom: "auto",
        padding: "5%"
        
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
    card: {
        margin: "1%",
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        // alignContent: 
    },
    CardContent: {
        flexGrow: 1,
    },
    container: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(4),
    },
    title:{
      flexGrow: 1,
      marginLeft: "auto",
      marginRight: "auto",
      color: theme.palette.secondary.main,
      
    },
}));

export default function Checkout() {
    const classes = useStyles();
    const theme = useTheme();

    const {user} = useContext(UserContext)

    const [activeStep, setActiveStep] = useState(0);
    const [test, setTest] = useState([])
    const [disabled, setDisabled] = useState(false)
    const [note, setNote] = useState("")
    const [answer, setAnswer] = useState("")
    const [currentQuestion, setCurrentQuestion] = useState(null)
    const [correct, setCorrect] = useState(0)
    const [total, setTotal] = useState(0)
    const [finished, setFinished] = useState(false)
    const [wrongAnswers, setWrongAnswers] = useState("")


    const bURL = "http://localhost:3000/"

    const sendResults = () => {
        console.log(user);
        const meta = {
            method: "POST",
            headers: {
              "Content-Type" : "application/json"
            },
            body: JSON.stringify({wrongAnswers: wrongAnswers, user: user.id})
        }
        fetch( bURL + `tags`, meta )
        .then(res => res.json())
        .then(async (data) => {
        if(data.auth){
            await setTimeout( () => {
                console.log(data);
            }, 0)
        }
        else {
        alert(data.info)
        }
    })
    }

    const nextQuestion = () => {
        if (test.length > 0){
            setTotal(total+1)
            let newTest = test
            let question = newTest.pop()
            question.multipleChoice = JSON.parse(question.multipleChoice)
            setCurrentQuestion(question)
            setTest(newTest)
            if (question.note[0] === "["){
                setNote(JSON.parse(question.note))
            }
            else{
                setNote(question.note)
            }
            setAnswer(question.answer)
        }
        setDisabled(false)
        console.log(test.length);
        
    }

    const submitHandler = (response) => {
        let right = answer === response || response === "next"
        alert(right === true ? "correct": "wrong");
        if (right) {
            setCorrect(correct+1)
        }
        else {
            setWrongAnswers(prevState => ([...prevState, currentQuestion.id]))
        }
        if (test.length === 0){
            setFinished(true)
            sendResults()
        }
        setDisabled(true)
        
    }

    const fetchRandom10 = async () => {
        const res  = await fetch(bURL + "questions/random10")
        const data = await res.json()
        await setTest(data)
    }

    const handleNext = () => {
        setActiveStep(activeStep + 1);
        console.log(wrongAnswers);
        nextQuestion()
    };
    
    useEffect(() => {
        console.log("fetch");
        fetchRandom10()
        
    }, [])

    useEffect(() => {
        console.log("next");
        nextQuestion()
        
    }, [test])

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg" className={classes.container} >
                <Typography  
                style={{fontFamily: 'Arizonia, cursive', "fontWeight": 600, marginRight: "1%", transform: "scale3d(1.15, 1.15, 1)"}} 
                className={classes.title} variant="h2"
                >
                    Tests
                </Typography>
                <Typography  
                style={{fontFamily: 'Times', "fontWeight": 500, marginRight: "1%", marginBottom: "1%"}} 
                className={classes.title} variant="h6"
                >
                    Challenge yourself and find out what you hear
                </Typography>
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <div>

                        {test.length >= 0 ? 
                            finished === false ?
                                <Card align="center" className={classes.card} style={{boxShadow: "none"}}>
                                    <CardContent >
                                    <Typography  
                                    style={{fontFamily: 'Times', "fontWeight": 500, marginRight: "1%", marginBottom: "1%"}} 
                                    className={classes.title} variant="h6"
                                    >
                                        What is being played?
                                    </Typography>
                                        <Question note={note} />
                                    </CardContent>
                                        <CardActions >
                                            <span style={{marginLeft: "auto"}}></span>
                                            {!!currentQuestion ? currentQuestion.multipleChoice.map(res => <Button disabled={disabled} onClick={() => {submitHandler(res)}}>{res}</Button>): null}
                                            <span style={{marginRight: "auto"}}></span>
                                        </CardActions>
                                </Card> : 
                                <Typography  
                                style={{fontFamily: 'Arizonia, cursive', "fontWeight": 500, marginRight: "1%", marginBottom: "1%"}} 
                                className={classes.title} variant="h3"
                                >
                                    Score: {correct}/{total}
                                </Typography>
                            : null}
                            <MobileStepper
                            variant="progress"
                            steps={10}
                            position="static"
                            activeStep={activeStep}
                            className={classes.stepperSkin}
                            nextButton={
                                <Button size="small" onClick={handleNext} disabled={activeStep === 9}>
                                    Next
                                    {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                                </Button>
                                }
                                backButton={
                                    <Button>{10 - test.length}/10</Button>
                                }
                            />
                        </div>
                    </Paper>
                </main>
            </Container>
        </React.Fragment>
    );
}
