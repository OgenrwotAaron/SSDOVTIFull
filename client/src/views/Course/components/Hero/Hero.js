import React from 'react';

import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme=>({
    root:{
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
        justifyContent:'center',
        flexDirection:'column',
        alignItems:'center'
    }
}))

const Hero = props => {

    const { title, code, cover } = props

    const classes = useStyles()

    return ( 
        <div className={classes.root} style={{backgroundImage:`url(${cover})`}}>
            <div className={classes.title}>
                <Typography style={{color:'white'}} variant='h1'>Code: {code}</Typography>
                <Typography style={{color:'#d7d7d7'}} variant='h2'>Department of {title}</Typography>
            </div>
        </div>
     );
}
 
export default Hero;