import React, { useState, useEffect } from 'react';
import { Typography, Button, Snackbar} from '@material-ui/core';
import axios from 'axios';

import DescriptionIcon from '@material-ui/icons/Description';
import { Alert } from '@material-ui/lab';

const Transcript = props => {

    const { currentVideo, reload, setReload, role } = props

    const [widget, setWidget] = useState();
    const [results, setResults] = useState({
        success:false,
        error:false
    });
    const [transcript, setTranscript] = useState();

    useEffect(() => {
        setWidget(window.cloudinary.createUploadWidget({
            cloudName:'aaron-ogenrwot',
            uploadPreset:'ssdovti_videos',
            folder:'ssdovti_images',
        },(err,result)=>{
            if(result && result.event==='success'){
                //update video with transcript file
                axios.post('/api/v1/videos/edit',{...currentVideo,transcript:result.info.secure_url})
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
    }, [reload,results,setReload,currentVideo]);

    const handelUploadFile = event =>{
        event.preventDefault()
        widget.open()
    }

    const handleClose = () =>{
        setResults({
            ...!results
        })
    }

    const renderTxt = async (url) =>{
        if(url){
            try {
                const result = await axios.get(url)
                setTranscript(result.data)
            } catch (error) {
                setTranscript('Error loading Transcript file')
            }
        }
    }

    if(currentVideo){renderTxt(currentVideo.transcript)}

    return ( 
        <div>
            {currentVideo ? transcript : ''}
            {transcript === undefined
                && 
                <div>
                    {
                        role === 2 ?
                            <Typography>No Vidoe Transcipt</Typography>
                        :
                            <div>
                                <Typography>Upload Video Transcript</Typography>
                                <Button onClick={handelUploadFile} startIcon={<DescriptionIcon/>} variant='contained' color='primary' component='span'>
                                    Upload File 
                                </Button>
                            </div>
                    }
                </div>
            }
            <Snackbar autoHideDuration={4000} open={results.success} onClose={handleClose}>
                <Alert variant='filled' severity='success' onClose={handleClose}>
                    Transcript Uploaded Successfully
                </Alert>
            </Snackbar>
            <Snackbar autoHideDuration={4000} open={results.error} onClose={handleClose}>
                <Alert variant='filled' severity='error' onClose={handleClose}>
                    Transcript Uploaded Failed
                </Alert>
            </Snackbar>
        </div>
     );
}
 
export default Transcript;