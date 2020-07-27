import React from 'react';
import { Paper, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme=>({
    root:{
        padding:theme.spacing(4,0,0,0)
    }
}))

const MapAddress = props => {

    const classes = useStyles()

    return ( 
        <Paper className={classes.root}>
            <Typography align='center' variant='h4'>Our Location on the map</Typography>
            <iframe title='map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31837.228688430718!2d30.65908072810357!3d4.090734859627064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x176cc2577a458fef%3A0x951911ab63641a20!2sYei%2C%20South%20Sudan!5e0!3m2!1sen!2sug!4v1594807343705!5m2!1sen!2sug" width="100%" height='400px' frameBorder="0" style={{border:0,margin:'10px 0 0 0',padding:'0'}} allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe>
        </Paper>
     );
}
 
export default MapAddress;