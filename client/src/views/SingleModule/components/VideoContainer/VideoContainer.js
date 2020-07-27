import React, { useState } from 'react';
import { makeStyles, Tabs, Tab, Typography, Fab } from '@material-ui/core';
import { TabPanel } from 'views/Home/components/Courses/components';

import AddIcon from '@material-ui/icons/Add';
import { Transcript, Files } from './components';
import poster from '../../favicon.ico'

const useStyles = makeStyles(theme=>({
    root:{
        width:'100%',
        padding:theme.spacing(2)
    },
    tabpanel:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
    },
    fab:{
        position:'fixed',
        bottom:theme.spacing(6),
        right:theme.spacing(6),
        zIndex:99,
        transition:' width 2s '
    }
}))

const VideoContainer = props => {

    const { data, params:{course,module,unit}, currentVideo, reload, setReload, role } = props

    const classes = useStyles()

    const [ value, setValue ] = useState(0)
    const [ hover, setHover ] = useState(false)

    const handleChange = (event,newValue) =>{
        setValue(newValue)
    }

    const handleHover = event =>{
        setHover(true)
    }

    const handleEndHover = event =>{
        setHover(false)
    }

    return ( 
        <div className={classes.root} >
            <video preload='none' src={currentVideo ? currentVideo.url:''} width='100%' style={{maxHeight:'400px'}} height='100%' controls poster={ currentVideo ? currentVideo.url.slice(0,currentVideo.url.length-4)+'.jpg' : poster}>
                
            </video> 
            <Tabs
                indicatorColor='primary'
                textColor='primary'
                value={value}
                onChange={handleChange}
            >
                <Tab label='Description'/>
                <Tab label='Transcript'/>
                <Tab label='Files'/>
            </Tabs>
            <TabPanel value={value} index={0}>
                <div>
                    {currentVideo && <div>
                        <Typography variant='h5'>Title: {currentVideo.name}</Typography>
                        <Typography variant='h5' color='textSecondary'>Unit: {data.name}</Typography>
                        <Typography variant='h5' color='textSecondary'>Code: {data.code}</Typography>
                        <Typography>{currentVideo.description}</Typography>
                    </div>}
                </div>
                
            </TabPanel>
            <TabPanel value={value} index={1} >
                <div className={classes.tabpanel}>
                    <Transcript role={role} reload={reload} setReload={setReload} currentVideo={currentVideo}/>
                </div>
            </TabPanel>
            <TabPanel value={value} index={2} >
                <div className={classes.tabpanel}>
                    <Files role={role} reload={reload} setReload={setReload} currentVideo={currentVideo}/>
                </div>
            </TabPanel>
            {
                role !== 2 &&
                <Fab href={`/add-video/${course}/${module}/${unit}`} onMouseEnter={handleHover} onMouseLeave={handleEndHover} variant={hover ? 'extended':'round'} className={classes.fab} color='primary'>
                    <AddIcon/> {hover && 'Add Video'}
                </Fab>
            }
            
        </div>
     );
}
 
export default VideoContainer;