import React, { useState } from 'react';
import { Paper, makeStyles, Typography, MobileStepper, Fade, Grid } from '@material-ui/core';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

import  aboutData from '../../../../common/about'

const useStyles = makeStyles(theme=>({
    root:{
        padding:theme.spacing(4,2),
        textAlign:'center'
    },
    stepper:{
        backgroundColor:'white'
    },
}))

const AboutUs = props => {

    const classes = useStyles()

    const [ activeStep, setActiveStep ] = useState(0)

    const handleNext = () =>{
        setActiveStep(prevState=> prevState < aboutData.length-1 ? prevState+1:0)
    }

    const handleBack = () =>{
        setActiveStep(prevState=>prevState > 0 ? prevState-1:aboutData.length-1)
    }

    return ( 
        <Paper className={classes.root}>
            <Typography variant='h3'>About Us</Typography>
            <MobileStepper
                className={classes.stepper}
                variant='dots'
                steps={aboutData.length}
                position='static'
                activeStep={activeStep}
                nextButton={
                    <KeyboardArrowRight onClick={handleNext} />
                }
                backButton={
                    <KeyboardArrowLeft onClick={handleBack} />
                }
            />
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                {
                    aboutData.map((data,i)=> 
                        (
                            activeStep === i && <Fade timeout={{enter:500,exit:300}} in={activeStep === i} key={i} >
                                                    <div>
                                                            <Typography variant='h4' style={{margin:'10px 0'}}>{data.title}</Typography>
                                                            <Typography variant='h5' style={{margin:'10px 0'}}>{data.sub}</Typography>
                                                            <Typography component='i' color='textSecondary' style={{lineHeight:'2'}}>"{data.description}"</Typography>
                                                    </div>
                                                </Fade>
                        )
                    )
                }
                </Grid>
                <Grid item xs={12} sm={6}>
                    <img
                        alt='sample'
                        src='/images/vision.jpg'
                        style={{
                            width:'100%'
                        }}
                    />
                </Grid>
            </Grid>
        </Paper>
     );
}
 
export default AboutUs;