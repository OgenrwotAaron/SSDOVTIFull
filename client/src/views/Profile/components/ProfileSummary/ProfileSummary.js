import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  CardActions,
  Button
} from '@material-ui/core';

import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles(theme => ({
  root: {},
  details: {
    display: 'flex'
  },
  avatar: {
    marginLeft: 'auto',
    height: 100,
    width: 100,
    flexShrink: 0,
    flexGrow: 0
  },
  progress: {
    marginTop: theme.spacing(2)
  },
  uploadButton: {
    marginRight: theme.spacing(2)
  },
  images:{
    width:theme.spacing(10),
    height:theme.spacing(10),
    marginLeft:theme.spacing(2)
  }
}));

const ProfileSummary = props => {
  const { className, user,reload, setReload, saveUser, ...rest } = props;

  const classes = useStyles();

  const [widget, setWidget] = useState();

  useEffect(() => {
    setWidget(window.cloudinary.createUploadWidget({
      cloudName:'aaron-ogenrwot',
      uploadPreset:'ssdovti_videos',
      folder:'ssdovti_images',
    },(err,result)=>{
        if(result && result.event==='success'){
          axios.post('/api/v1/hods/edit',{...user,avatar:result.info.secure_url})
          .then(res=> {
            saveUser({...res.data.newHod,...res.data.user})
            setReload(!reload)
          } )
          .catch(e=>setReload(!reload))
        }
    }))
  }, [user,reload,setReload,saveUser]);

  const handleUploadAvatar = event =>{
    event.preventDefault()
    widget.open()
  }

  const handleRemoveAvatar = event =>{
    event.preventDefault()
    axios.post('/api/v1/hods/edit',{...user,avatar:null})
    .then(res=> {
      saveUser({...res.data.newHod,...res.data.user})
      setReload(!reload)
    } )
    .catch(e=>setReload(!reload))
  }

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <div className={classes.details}>
          <div>
            <Typography
              gutterBottom
              variant="h2"
            >
              {user&& user.fname+' '+user.lname}
            </Typography>
            <Typography
              className={classes.regNumber}
              color="textSecondary"
              variant="body1"
            >
              {user ? user.role === 2 ? <span>Reg &#8470; {user.reg_number}</span>:<span>Phone: {user.phone}</span>:null}
            </Typography>
            <Typography
              className={classes.course}
              color="textSecondary"
              variant="body1"
            >
              {user ? user.role === 2 ? <span>Course: {user.course_code}</span>:<span>Email: {user.email}</span>:null}
            </Typography>
          </div>
          {
            user ? user.avatar ? <Avatar className={classes.images} alt={user.fname} src={user.avatar}/>
            :
              <Avatar className={classes.avatar}>
                <PersonIcon fontSize='large'/>
              </Avatar>
            :null
          }
        </div>
        <CardActions>
          <Button
            className={classes.uploadButton}
            color="primary"
            variant="text"
            onClick={handleUploadAvatar}
          >
            Upload picture
          </Button>
          <Button onClick={handleRemoveAvatar} disabled={user.avatar ? false:true} variant="text">Remove picture</Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

ProfileSummary.propTypes = {
  className: PropTypes.string
};

export default ProfileSummary;
