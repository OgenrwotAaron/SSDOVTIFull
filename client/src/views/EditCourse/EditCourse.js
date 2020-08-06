import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles, Typography, Grid, Card, CardContent, CardActions, Button, Paper, Tabs, Tab, TextField, CircularProgress, Snackbar } from '@material-ui/core'

import { TabPanel } from 'views/Home/components/Courses/components';
import { Alert } from '@material-ui/lab';
import { CourseModules } from './components';

const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(3)
    },
    media:{
        width:'100%'
    },
    form:{
        display:'flex',
        flexDirection:'column',
        alignItems: 'center',
    },
    input:{
        margin:theme.spacing(1,0),
        width:'80%'
    }
  }));

const EditCourse = props => {

    const { match:{params},history } = props

    const [ data, setData ] = useState({
        code: "",
        cover: "",
        description: null,
        phases: 0,
        name: ""
    }) 
    const [ value, setValue ] = useState(0)
    const [widget, setWidget] = useState();
    const [reload, setReload] = useState(false);
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState({
        success:false,
        error:false
    });
    
    const classes = useStyles()

    useEffect(() => {
        axios.get(`/api/v1/courses/single?code=${params.id}`)
        .then(res=>{
            setData(res.data.course)
        })
    }, [params.id,reload]);

    useEffect(() => {
        setWidget(window.cloudinary.createUploadWidget({
            cloudName:'aaron-ogenrwot',
            uploadPreset:'ssdovti_videos',
            folder:'ssdovti_images',
        },(err,result)=>{
            if(result && result.event==='success'){
                //update course
                axios.post('/api/v1/courses/edit',{...data,oldId:data.code,cover:result.info.secure_url})
                .then(res=> {
                    setReload(!reload)
                    setResults({
                        ...results,
                        success:true
                    })
                })
                .catch(e=>{
                    setReload(!reload)
                    setResults({
                        ...results,
                        error:true
                    })
                })
            }
        }))
    }, [data,reload,results]);

    const handleTabChange = (event,newValue) =>{
        setValue(newValue)
    }

    const handleChangeCover = event =>{
        event.preventDefault()
        widget.open()
    }

    const handleCourseUpdate = event =>{
        event.preventDefault()
        setLoading(true)
        axios.post('/api/v1/courses/edit',{...data,oldId:data.code})
        .then(res=>{
            setReload(!reload)
            setLoading(false)
            setResults({
                ...results,
                success:true
            })
        })
        .catch(e=>{
            setReload(!reload)
            setLoading(false)
            setResults({
                ...results,
                error:true
            })
        })
    }

    const handleChange = event =>{
        setData({
            ...data,
            [event.target.name]:event.target.value
        })
    }

    const handleClose = () =>{
        setResults({
            ...!results
        })
    }

    return ( 
        <div className={classes.root}>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={4}>
                    <Card>
                        <img
                            src={data.cover}
                            alt={data.name}
                            className={classes.media}
                        />
                        <CardContent>
                            <Typography variant='h5'>{data.title}</Typography>
                            <Typography color='textSecondary'>{data.code}</Typography>
                        </CardContent>
                        <CardActions>
                            <Button onClick={handleChangeCover} variant='outlined' color='primary'>
                                Change Photo
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Paper elevation={0}>
                        <Tabs value={value} onChange={handleTabChange} indicatorColor='primary'>
                            <Tab label="Edit Details"/>
                            <Tab label="Modules"/>
                        </Tabs>
                        <TabPanel value={value} index={0}>
                           <form className={classes.form}>
                                <TextField
                                    name="code"
                                    onChange={handleChange}
                                    className={classes.input}
                                    label='Course Code'
                                    variant='outlined'
                                    value = {data.code}
                                />
                                <TextField
                                    name="name"
                                    onChange={handleChange}
                                    className={classes.input}
                                    label='Name'
                                    variant='outlined'
                                    value = {data.name}
                                />
                                <TextField
                                    name="phases"
                                    onChange={handleChange}
                                    className={classes.input}
                                    label='Phases'
                                    variant='outlined'
                                    type='number'
                                    value={data.phases}
                                />
                                <TextField
                                    name="description"
                                    onChange={handleChange}
                                    className={classes.input}
                                    label='Description'
                                    variant='outlined'
                                    value = {data.description? data.description : ''}
                                    multiline
                                    rowsMax={20}
                                />
                                <Button startIcon={loading ? <CircularProgress color='inherit' size={20}/>:null} onClick={handleCourseUpdate} style={{width:'80%'}} variant='contained' color='primary'>
                                    {loading ? 'Updating...':'Update'}
                                </Button>
                                {/*code,name,description,phases*/}
                            </form> 
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <div>
                                <CourseModules reload={reload} setReload={setReload} courseModules={data.courseModules} history={history} code={data.code} />
                                {/*code,name,units,duration*/}
                            </div>
                        </TabPanel>
                    </Paper>
                </Grid>
            </Grid>
            <Snackbar open={results.success} autoHideDuration={4000} onClose={handleClose}>
                <Alert variant='filled' severity='success' onClose={handleClose}>
                    Course Updated Successfully
                </Alert>
            </Snackbar>
            <Snackbar open={results.error} autoHideDuration={4000} onClose={handleClose}>
                <Alert variant='filled' severity='error' onClose={handleClose}>
                    Course Update failed
                </Alert>
            </Snackbar>
        </div>
     );
}
 
export default EditCourse;