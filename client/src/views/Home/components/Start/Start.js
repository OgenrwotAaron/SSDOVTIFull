import React from 'react';
import { makeStyles, Typography, Button } from '@material-ui/core';
const useStyles = makeStyles(theme=>({
    root:{
        backgroundImage:'url(/images/visit.jpg)',
        backgroundSize:'contain',
    },
    inner:{
        backgroundColor:'#3d239ab5',
        padding:theme.spacing(8,2),
        textAlign:'center',
    }
}))

const Start = props => {

    const classes = useStyles()

    return ( 
        <div className={classes.root}>
            <div className={classes.inner}>
                <Typography variant='h4' style={{color:'white',padding:'0 0 20px 0'}}>SSDO-VTI as the provider of Technical Education and Vocational Training in South Sudan</Typography>
                <Button href='/sign-up' variant='contained' color='primary'>Get Enrolled</Button>
            </div>
        </div>
     );
}
 
export default Start;