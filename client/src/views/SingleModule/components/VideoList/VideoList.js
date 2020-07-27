import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import { VideoCard } from './components';

const useStyles = makeStyles(theme=>({
    root:{
        padding:theme.spacing(2)
    }
}))

const VideoList = props => {

    const { videos, setCurrentVideo, reload, setReload, history, params, role } = props

    const classes = useStyles()

    //const [videos, setVideos] = useState([]);

    return ( 
        <div className={classes.root}>
            {videos.length ? 
                null
            :
                role === 1 ? 
                    <Typography>Upload Course Videos</Typography> 
                : 
                    <Typography>No videos Available</Typography>
            }
            {
                videos
                .map((video,i)=>(
                    <VideoCard role={role} params={params} history={history} reload={reload} setReload={setReload} setCurrentVideo={setCurrentVideo} key={i} video={video}/>
                ))
            }
        </div>
     );
}
 
export default VideoList;