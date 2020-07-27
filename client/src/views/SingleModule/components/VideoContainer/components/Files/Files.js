import React, { useEffect, useState } from 'react';
import axios from 'axios'

import { Typography, Button, Snackbar, ButtonGroup} from '@material-ui/core';

import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import { Alert } from '@material-ui/lab';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import GetAppIcon from '@material-ui/icons/GetApp';

const Files = props => {

    const { reload, setReload, currentVideo, role } = props

    const [widget, setWidget] = useState();
    const [results, setResults] = useState({
        success:false,
        error:false
    });
    const [files, setFiles] = useState();

    useEffect(() => {
        if(currentVideo){
            axios.get(`/api/v1/files?video=${currentVideo.id}`)
            .then(res=>setFiles(res.data))
        }
        
    }, [currentVideo]);

    useEffect(() => {
        setWidget(window.cloudinary.createUploadWidget({
            cloudName:'aaron-ogenrwot',
            uploadPreset:'ssdovti_blob',
            flags:'attachment'
        },(err,result)=>{
            if(result && result.event==='success'){
                //add to pdfs name, url, video_id
                axios.post('/api/v1/files/add',{name:result.info.public_id,video_id:currentVideo.id,url:result.info.secure_url})
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

    const handleUploadFiles = event =>{
        event.preventDefault()
        widget.open()
    }

    const handleClose = () =>{
        setResults({
            ...!results
        })
    }

    const handleDeleteFile = id =>{
        axios.delete(`/api/v1/files?id=${id}`)
        .then(res=>{
            setReload(!reload)
        })
       .catch(e=>{
           setReload(!reload)
       })
    }
    return ( 
        <div>
            <Typography>Topic Documents to be downloaded</Typography>
            { files &&
                files.map((file,i)=>(
                    <div key={i}>
                        <ButtonGroup style={{margin:'5px 0'}} color='secondary'>
                            <Button>{file.name.split('/')[1].split('_')[0]}</Button>
                            <Button target='_blank' href={file.url} download><GetAppIcon/></Button>
                            {role !== 2 && <Button onClick={()=>handleDeleteFile(file.id)}><DeleteOutlineIcon/></Button>}
                        </ButtonGroup>
                    </div>
                ))
            }
            {
                role === 2 ?
                    <Typography>No Course Documents</Typography>
                :
                    <div>
                        <Typography>Upload Files For the Video</Typography>
                        <Button onClick={handleUploadFiles} startIcon={<PictureAsPdfIcon/>} variant='contained' color='primary' component='span'>
                            Upload Document
                        </Button>
                    </div>
            }
            <Snackbar open={results.success} autoHideDuration={4000} onClose={handleClose}>
                <Alert variant='filled' severity='success' onClose={handleClose}>
                    Uploaded Successfully
                </Alert>
            </Snackbar>
            <Snackbar open={results.error} autoHideDuration={4000} onClose={handleClose}>
                <Alert variant='filled' severity='error' onClose={handleClose}>
                    Upload Failed
                </Alert>
            </Snackbar>
        </div>
     );
}
 
export default Files;