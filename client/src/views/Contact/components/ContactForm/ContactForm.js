import React, { useState } from 'react';
import { TextField, makeStyles, Typography, Button, Snackbar } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import axios from 'axios'
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles(theme=>({
    root:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',
        padding:theme.spacing(4)
    },
    form:{
        width:'30%',
        [theme.breakpoints.down('sm')]: {
            width:'90%'
        },
        padding:theme.spacing(2)
    },
    input:{
        width:'100%',
        margin:theme.spacing(1,0)
    }
}))

const ContactForm = props => {

    const classes = useStyles()

    const [ formData, setFormData ] = useState({
        sender:'',
        email:'',
        subject:'',
        body:''
    })
    const [results, setResults] = useState({
        success:false,
        error:false
    });

    const handleChange = event =>{
        event.preventDefault()
        setFormData({
            ...formData,
            [event.target.name]:event.target.value
        })
    }

    const handleSend = event =>{
        event.preventDefault()
        axios.post('/api/v1/mail/add',{...formData})
        .then(res=>{
            setResults({
                ...results,
                success:true
            })
            setFormData({
                sender:'',
                email:'',
                subject:'',
                body:''
            })
        })
        .catch(e=>{
            setResults({
                ...results,
                error:true
            })
        })
    }

    const handleClose = () =>{
        setResults({
            ...!results
        })
    }

    return ( 
        <div className={classes.root}>
            <Typography variant='h4' >Message Us</Typography>
            <form className={classes.form} onSubmit={handleSend}>
                <TextField
                    onChange={handleChange}
                    name='sender'
                    value={formData.sender}
                    type='text'
                    variant='outlined'
                    label='Fullname'
                    className={classes.input}
                />
                <TextField
                    onChange={handleChange}
                    name='email'
                    type='email'
                    value={formData.email}
                    variant='outlined'
                    label='Email'
                    className={classes.input}
                />
                 <TextField
                    onChange={handleChange}
                    name='subject'
                    type='text'
                    value={formData.subject}
                    variant='outlined'
                    label='Subject'
                    className={classes.input}
                />
                 <TextField
                    onChange={handleChange}
                    name='body'
                    type='text'
                    variant='outlined'
                    label='Message'
                    value={formData.body}
                    multiline
                    rows={4}
                    className={classes.input}
                />
                <Button type='submit' style={{width:'100%'}} endIcon={<SendIcon/>} color='primary' variant='contained'>Send</Button>
            </form>
            <Snackbar open={results.success} autoHideDuration={3000} onClose={handleClose}>
                <Alert severity='success' variant='filled' onClose={handleClose}>
                    Message Sent Successfully!
                </Alert>
            </Snackbar>
            <Snackbar open={results.error} autoHideDuration={3000} onClose={handleClose}>
                <Alert severity='error' variant='filled' onClose={handleClose}>
                    Message Not Sent, Try again
                </Alert>
            </Snackbar>
        </div>
     );
}
 
export default ContactForm;