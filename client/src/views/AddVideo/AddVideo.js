import React, { useState, useEffect } from 'react';
import { makeStyles, Typography, Paper, TextField, Button, Snackbar } from '@material-ui/core';
import axios from 'axios'

import MovieIcon from '@material-ui/icons/Movie';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles(theme=>({
    root:{
        height:'100vh',
        backgroundImage:'url(/images/products/addVideo.jpg)',
        backgroundSize:'cover',
        backgroundPositionY:'center'
    },
    cover:{
        backgroundColor:'#00000050',
        height:'100vh',
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    },
    form:{
        padding:theme.spacing(2)
    },
    input:{
        width:'100%',
        margin:theme.spacing(1,0)
    },
    buttons:{
        display:'flex',
        justifyContent:'space-between'
    }
}))

const AddVideo = props => {

    const classes = useStyles()

    const { match:{params} } = props

    const [ widget, setWidget ] = useState()

    const [ formData, setFormData ] = useState({
        url:'',
        name:'',
        description:'',
        unit_code:params.unit,
        module:params.module,
        course:params.course
    })
    const [results, setResults] = useState({
        success:false,
        error:false
    });

    useEffect(()=>{
        setWidget(window.cloudinary.createUploadWidget({
            cloudName:'aaron-ogenrwot',
            uploadPreset:'ssdovti_videos',
            folder:'ssdovti_videos',
            resource_type:'video'
        },(err,result)=>{
            if(result && result.event==='success'){
                setFormData(prevState => {
                    return {
                        ...prevState,
                        url : result.info.secure_url
                    }
                })
            }
        }))
    },[])

    const handleFileUpload = event =>{
        event.preventDefault()
        widget.open()
    }

    const handleFormData = event =>{
        event.preventDefault()
        setFormData({
            ...formData,
            [event.target.name]:event.target.value
        })
    }

    const handleAddVideo = event =>{
        axios.post('/api/v1/videos/add',formData)
        .then(res=>{
            setFormData({
                url:'',
                name:'',
                description:'',
                unit_code:params.unit,
                module:params.module,
                course:params.course
            })
            setResults({
                ...results,
                success:true
            })
        })
        .catch(e=>{
            setResults({
                ...!results,
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
            <div className={classes.cover}>
                <Paper>
                    <form className={classes.form}>
                        <Typography variant='h5'>Add Video</Typography>
                        <input onClick={handleFileUpload} type='file' id='upload2' style={{display:'none'}}/>
                        <label htmlFor='upload2'>
                            <Button style={{width:'100%'}} startIcon={<MovieIcon/>} variant='outlined' color='primary' component='span'>
                                Upload Video
                            </Button>
                        </label>
                        <TextField
                            onChange={handleFormData}
                            className={classes.input}
                            label='Video Title'
                            variant='outlined'
                            required
                            name='name'
                            value={formData.name}
                        />
                        <TextField
                            onChange={handleFormData}
                            className={classes.input}
                            label='Video Description'
                            variant='outlined'
                            name='description'
                            required
                            value={formData.description}
                            multiline
                            rowsMax={6}
                        />
                        <div className={classes.buttons}>
                            <Button href={`/module/${params.course}/${params.module}/${params.unit}`}>
                                Cancel
                            </Button>
                            <Button color='primary' onClick={handleAddVideo} variant='contained'>
                                Add Video
                            </Button>
                        </div>
                    </form>
                </Paper>
            </div>
            <Snackbar open={results.success} autoHideDuration={4000} onClose={handleClose}>
                {/*redirect with video id */}
                <Alert 
                    severity='success' 
                    action={
                        <Button 
                            href={`/module/${params.course}/${params.module}/${params.unit}`} 
                            color='inherit' size='small'
                        >
                            View
                        </Button>
                    } 
                    variant='filled' onClose={handleClose} 
                >
                    Upload Successful
                </Alert>
            </Snackbar>
            <Snackbar open={results.error} autoHideDuration={4000} onClose={handleClose}>
                <Alert severity='error' variant='filled' onClose={handleClose} >
                    Upload Failed, try again
                </Alert>
            </Snackbar>
        </div>
     );
}
 
export default AddVideo;