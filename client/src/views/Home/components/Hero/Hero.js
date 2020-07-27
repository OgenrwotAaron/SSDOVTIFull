import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography, Button, Hidden } from '@material-ui/core';

const useStyles = makeStyles(theme=>({
    root:{
        backgroundImage:'url(/images/main.jpg)',
        backgroundSize:'cover',
        backgroundPositionY:'center',
        
    },
    grid:{
        backgroundColor:'#00131b87',
        padding:theme.spacing(14,3,6,3),
        [theme.breakpoints.down('sm')]: {
            padding:theme.spacing(9,2,3,2)
        }
    },
    title:{
        color:'white',
        fontSize:42,
        lineHeight:1.5,
        fontWeight:900,
        [theme.breakpoints.down('sm')]: {
            fontSize:32,
        }
    },
    logo:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    }
}))

const Hero = props => {

    const { user } = props

    const classes = useStyles()

    return ( 
        <div className={classes.root}>
            <Grid container className={classes.grid}>
                <Grid item sm={7}>
                    <Typography variant='h1' className={classes.title}>
                        South Sudanese Development Organization 
                        Vocational Training Institute <br/>
                    </Typography>
                    <Typography variant='button' component='div' style={{ color:'#d4d4d4',textTransform:'capitalize',margin:'15px 0' }}>
                        ‘Institute for Excellence, National Empowerment and Innovations for Positive Change in the Youth Mindset’<br/>
                    </Typography>
                    { user.role!==undefined ? null : <Button variant='contained' href='/sign-in' color='primary'>Enroll Now</Button>}
                </Grid>
                
                <Grid item sm={5}>
                    <Hidden xsDown>
                        <div className={classes.logo}>
                            <img
                                alt='logo'
                                src='/favicon.ico'
                                style={{
                                    width:'70%',
                                }}
                            />
                        </div>
                    </Hidden>
                    
                </Grid>
            </Grid>
        </div>
     );
}
 
export default Hero;