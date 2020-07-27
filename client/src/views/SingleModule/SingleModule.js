import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { Grid, makeStyles } from '@material-ui/core';
import theme from 'theme';
import { VideoContainer, VideoList } from './components';

const useStyles = makeStyles(theme=>({
    root:{
    }
}))

const SingleModule = props => {

    const { match:{params}, history, user } = props

    const classes = useStyles()

    const [ data, setData ] = useState({
        code:'',
        duration:0,
        name:''
    })
    const [videos, setVideos] = useState([]);
    const [currentVideo, setCurrentVideo] = useState({
        description: "",
        name: "",
        transcript: null,
        unit_code: "4.1.1",
        url:""
    });
    const [reload, setReload ] = useState(false)

    useEffect(() => {
        axios.get(`/api/v1/units/joined?id=${params.unit}`)
        .then(res=>{
            setData(res.data)
            setVideos(res.data.videos)
            setCurrentVideo(res.data.videos[0])
        })
    }, [params.unit,reload]);

    return ( 
        <div className={classes.root}>
            <div style={{height:theme.spacing(9), backgroundColor:'#e77924'}}></div>
            <Grid container>
                <Grid item sm={12} md={8}>
                    <VideoContainer role={user.role} reload={reload} setReload={setReload} currentVideo={currentVideo} params={params} data={data}/>
                </Grid>
                <Grid item sm={12} md={4}>
                    <VideoList role={user.role} params={params} history={history} reload={reload} setReload={setReload} setCurrentVideo={setCurrentVideo} videos={videos}/>
                </Grid>
            </Grid>
        </div>
     );
}

SingleModule.propTypes = {
    user:PropTypes.object
}

const mapStateToProps = state =>{
    return {
        user:state.loggedUser.user
    }
}
 
export default connect(mapStateToProps)(SingleModule);