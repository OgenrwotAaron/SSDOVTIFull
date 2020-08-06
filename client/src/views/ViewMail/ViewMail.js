import React,{ useEffect, useState} from 'react';
import axios from 'axios';
import { makeStyles, Typography, Paper, Button } from '@material-ui/core';
import moment from 'moment'

const useStyles = makeStyles(theme=>({
    root:{
        padding:theme.spacing(3)
    },
    paper:{
        padding:theme.spacing(2)
    }
}))

const ViewMail = props => {

    const { match:{params:{id}}} = props

    const classes = useStyles()

    const [message, setMessage] = useState({});

    useEffect(() => {
        axios.get(`/api/v1/mail?id=${id}`)
        .then(res=>{
            if(res.data.seen === 0){
                axios.post('/api/v1/mail/read',{id})
                .then(res=>{
                    setMessage(res.data)
                })
            }else{
                setMessage(res.data)
            }
            
        })
        .catch(e=>{
            setMessage({})
        })
    }, [id]);

    return ( 
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Typography variant='h4'>
                    Subject: {message.subject}
                </Typography>
                <br/>
                <Typography>
                    Sender: {message.sender}
                </Typography>
                <Typography>
                    From: {message.email}
                </Typography>
                <br/>
                <Typography color='textSecondary'>
                    Sent: {moment(message.createdAt).format("Do MMM YYYY, hh:mm a")}
                </Typography>
                <br/>
                <Typography>
                    Body:
                </Typography>
                <Typography color='textSecondary' component='p'>
                    {message.body}
                </Typography>
                <br/>
                <Button href={`mailto:${message.email}?&subject=${message.subject}&body=Hello ${message.sender}`} variant='contained' color='primary'>Reply</Button>
            </Paper>
        </div>
     );
}
 
export default ViewMail;