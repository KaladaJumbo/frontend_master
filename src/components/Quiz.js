import React, { useState, useEffect } from 'react';
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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';



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
    button: {
        color: theme.palette.secondary.main, 
        fontFamily: 'Arizonia, cursive', 
        "fontWeight": 600, 
        textTransform: 'none', 
        fontSize: "200%",
        "&:hover": {
            transform: "scale3d(1.15, 1.15, 0.60)",
            color: theme.palette.secondary.roseGold
        },
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
    dialog: {

    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Checkout() {
    const classes = useStyles();
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const [test, setTest] = useState([])
    const [disabled, setDisabled] = useState(false)
    const [note, setNote] = useState("")
    const [answer, setAnswer] = useState("")
    const [currentQuestion, setCurrentQuestion] = useState(null)
    const [correct, setCorrect] = useState(0)
    const [total, setTotal] = useState(0)
    const [wrongAnswers, setWrongAnswers] = useState("")
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState({})

    const bURL = "http://localhost:3000/"

    const nextQuestion = () => {
        if (test.length > 0){
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
        setMessage({title: right === true ? `CORRECT`: `WRONG`, text: `The sound was a(n) ${answer}`});
        setOpen(true)
        if (right) {
            setCorrect(correct+1)
        }
        else {
            setWrongAnswers(prevState => ([...prevState, currentQuestion.id]))
        }
        setTotal(total+1)
        setDisabled(true)
    }

    const fetchRandom10 = async () => {
        const res  = await fetch(bURL + "questions/random10")
        const data = await res.json()
        await setTest(data)
        await setActiveStep(0)
        await setCorrect(0)
        await setTotal(0)
        console.log(data)

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
                <div>
                    <Dialog
                    open={open}
                    onClose={() => setOpen(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    TransitionComponent={Transition}
                    keepMounted
                    fullWidth={true}
                    maxWidth = {'sm'}
                    >
                        <DialogTitle id="alert-dialog-title">
                            <Typography  
                            style={{fontFamily: 'times', "fontWeight": 500, marginRight: "1%", marginBottom: "1%"}} 
                            className={classes.title}
                            variant="h3"
                            >
                                {message.title}
                            </Typography>
                        </DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <Typography  
                            style={{fontFamily: 'times', "fontWeight": 500, marginRight: "1%", marginBottom: "1%"}} 
                            className={classes.title}
                            variant="h5"
                            >
                                {message.text}
                            </Typography>
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Question note={note} />
                        </DialogActions>
                    </Dialog>
                </div>
                <Typography  
                style={{fontFamily: 'Arizonia, cursive', "fontWeight": 600, marginRight: "1%", transform: "scale3d(1.15, 1.15, 1)"}} 
                className={classes.title} variant="h2"
                >
                    Practice
                </Typography>
                <Typography  
                style={{fontFamily: 'Times', "fontWeight": 500, marginRight: "1%", marginBottom: "1%"}} 
                className={classes.title} variant="h6"
                >
                    Take a load off, chill, and casually train your ear. 
                </Typography>
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <div>

                            {test.length >= 0 ? 
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
                                        <CardActions  >
                                            <span style={{marginLeft: "auto"}}></span>
                                            {!!currentQuestion ? currentQuestion.multipleChoice.map(res => <Button disabled={disabled} onClick={() => {submitHandler(res)}}>{res}</Button>): null}
                                            <span style={{marginRight: "auto"}}></span>
                                        </CardActions>
                                </Card> : null}
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
                    <Typography  
                    style={{fontFamily: 'Arizonia, cursive', "fontWeight": 500, marginRight: "1%", marginBottom: "1%"}} 
                    className={classes.title} variant="h3"
                    >
                        Score: {correct}/{total}
                    </Typography>
                    <Button onClick={() => {fetchRandom10()}}>
                    <Typography  
                    style={{fontFamily: 'times', "fontWeight": 500, marginRight: "1%", marginBottom: "1%"}} 
                    className={classes.title}
                    >
                        Restart?
                    </Typography>
                    </Button>
                </main>
            </Container>
        </React.Fragment>
    );
}
