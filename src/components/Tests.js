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
    qButton: {
        color: theme.palette.secondary.main, 
        textTransform: 'capitalize', 
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const Tests = (props) => {
    const classes = useStyles();
    const theme = useTheme();

    const {user, setUser} = useContext(UserContext)

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
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState({})


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
            await setTimeout( async () => {
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
        setMessage({title: "Score", text: `${correct}/${total}`});
        if (right) {
            setCorrect(correct+1)
        }
        else {
            setWrongAnswers(prevState => ([...prevState, currentQuestion.id]))
        }
        if (test.length === 0){
            setOpen(true)
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
                        {/* <Question note={note} /> */}
                    </DialogActions>
                </Dialog>
            </div>
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
                                            {!!currentQuestion ? currentQuestion.multipleChoice.map(res => <Button className={classes.qButton} disabled={disabled} onClick={() => {submitHandler(res)}}>{res}</Button>): null}
                                            <span style={{marginRight: "auto"}}></span>
                                        </CardActions>
                                </Card> : 
                                null
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

export default Tests