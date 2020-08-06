import React from 'react';
import { Grid, Card, Avatar, CardContent, Typography, makeStyles } from '@material-ui/core';

import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const useStyles = makeStyles(theme=>({
    root:{
        backgroundColor:'white'
    },
    card:{
        display:'flex',
        justifyContent:'center',
        flexDirection:'column',
        alignItems:'center',
        padding:theme.spacing(2),
        width:'60%'
    },
    cardHolder:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        padding:theme.spacing(2)
    },
    avatar:{
        width:theme.spacing(8),
        height:theme.spacing(8),
        backgroundColor:theme.palette.primary.main
    }
}))

const ContactInfo = props => {

    const classes = useStyles()

    return ( 
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={12} sm={4} className={classes.cardHolder}>
                    <Card className={classes.card} elevation={3}>
                        <Avatar className={classes.avatar} variant='circle' >
                            <PhoneIcon/>
                        </Avatar>
                        <CardContent>
                            <Typography align='center' variant='h5'>Phone</Typography>
                            <Typography>+211 (0) 928 930 555</Typography>
                            <Typography>+211 (0) 928 948 555</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4} className={classes.cardHolder}>
                    <Card className={classes.card} elevation={3}>
                        <Avatar className={classes.avatar} variant='circle' >
                            <EmailIcon/>
                        </Avatar>
                        <CardContent>
                            <Typography align='center' variant='h5'>Email</Typography>
                            <Typography>ssdovocin@gmail.com</Typography>
                            <Typography>info@ssdoprog.org</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4} className={classes.cardHolder}>
                    <Card className={classes.card} elevation={3}>
                        <Avatar className={classes.avatar} variant='circle' >
                            <LocationOnIcon/>
                        </Avatar>
                        <CardContent>
                            <Typography align='center' variant='h5'>Address</Typography>
                            <Typography>Hai Guava along Yei – Lasu Road</Typography>
                            <Typography>Yei Town, Republic of South Sudan.</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
     );
}
 
export default ContactInfo;