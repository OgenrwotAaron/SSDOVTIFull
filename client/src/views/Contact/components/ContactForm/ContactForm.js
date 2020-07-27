import React, { useState } from 'react';
import { TextField, makeStyles, Typography, Button } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

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
        fullname:'',
        email:'',
        subject:'',
        message:''
    })

    const handleChange = event =>{
        event.preventDefault()
        setFormData({
            ...formData,
            [event.target.name]:event.target.value
        })
    }

    const handleSend = () =>{
        console.log(formData)
    }

    return ( 
        <div className={classes.root}>
            <Typography variant='h4' >Message Us</Typography>
            <form className={classes.form}>
                <TextField
                    onChange={handleChange}
                    name='fullname'
                    value={formData.fullname}
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
                    name='message'
                    type='text'
                    variant='outlined'
                    label='Message'
                    value={formData.message}
                    multiline
                    rows={4}
                    className={classes.input}
                />
                <Button onClick={handleSend} style={{width:'100%'}} endIcon={<SendIcon/>} color='primary' variant='contained'>Send</Button>
            </form>
        </div>
     );
}
 
export default ContactForm;