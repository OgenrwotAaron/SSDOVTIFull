import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme=>({
    root:{
        backgroundImage:'url(/images/hero.jpg)',
        backgroundSize:'cover',
        backgroundPositionY:'bottom',
    },
    title:{
        backgroundColor:'#00131b87',
        padding:theme.spacing(14,3,6,3),
        [theme.breakpoints.down('sm')]: {
            padding:theme.spacing(9,2,3,2)
        },
        display:'flex',
        justifyContent:'center'
    }
}))

const Hero = props => {

    const classes = useStyles()

    return ( 
        <div className={classes.root}>
            <div className={classes.title}>
                <Typography style={{color:'white'}} variant='h1'>All Courses Available</Typography>
            </div>
        </div>
     );
}
 
export default Hero;