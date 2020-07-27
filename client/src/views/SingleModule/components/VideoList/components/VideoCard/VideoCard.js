import React from 'react';
import { Card, Grid, Typography, makeStyles } from '@material-ui/core';
import axios from 'axios';

import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles(theme=>({
    root:{
        height:100,
        margin:theme.spacing(1,0)
    },
    text:{
        padding:theme.spacing(1)
    },
    cardImage:{
        width:'100%',
        overflowY:'hidden',
        minHeight:100,
        cursor:'pointer'
    },
    actions:{
        padding:theme.spacing(1,1,0,0)
    },
    buttons:{
        cursor:'pointer'
    }
}))

const VideoCard = props => {

    const { video, setCurrentVideo, reload, setReload, history, params, role } = props

    const classes = useStyles()

    const handleVideoDelete = event =>{
        axios.delete(`/api/v1/videos?id=${video.id}`)
        .then(res=>{
            setReload(!reload)
        })
        .catch(e=>{
            setReload(!reload)
        })
    }

    const handleVideoEdit = event =>{
        history.push(`/edit-video/${params.course}/${params.module}/${params.unit}/${video.id}`)
    }

    const handleVideoClick = event =>{
        setCurrentVideo(video)
    }

    return ( 
        <Card className={classes.root}>
                <Grid container style={{width:'100%'}}>
                    <Grid item xs={5}>
                        <img onClick={handleVideoClick} className={classes.cardImage} src={video.url.slice(0,video.url.length-4)+'.jpg'} alt='card' />
                    </Grid>
                    <Grid item xs={6} className={classes.text}>
                        <Typography variant='h5'>{video.name}</Typography>
                        <Typography color='textSecondary'>{video.description.slice(0,50)}{video.description >= 50? '...':null}</Typography>
                    </Grid>
                    {  role !== 2 &&
                        <Grid item xs={1}>
                            <div className={classes.actions}>
                                <div className={classes.buttons} onClick={handleVideoDelete}>
                                    <DeleteOutlineIcon/> 
                                </div>
                                <div className={classes.buttons} onClick={handleVideoEdit}>
                                    <EditIcon/>
                                </div>
                            </div>
                        </Grid>
                    }
                </Grid>
        </Card>
     );
}
 
export default VideoCard;