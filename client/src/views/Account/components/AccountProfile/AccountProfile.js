import React, { useEffect, useState }  from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import axios from 'axios';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Button,
} from '@material-ui/core';

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
    flexGrow: 0,
    fontSize:50
  },
  progress: {
    marginTop: theme.spacing(2)
  },
  uploadButton: {
    marginRight: theme.spacing(2)
  }
}));

const AccountProfile = props => {
  const { className, user, setUser, ...rest } = props;

  const classes = useStyles();

  const [widget, setWidget] = useState();

  useEffect(() => {
    setWidget(window.cloudinary.createUploadWidget({
      cloudName:'aaron-ogenrwot',
      uploadPreset:'ssdovti_videos',
      folder:'ssdovti_images',
    },(err,result)=>{
        if(result && result.event==='success'){
          axios.post('/api/v1/admins/edit',{...user,avatar:result.info.secure_url})
          .then(res=> setUser(res.data) )
          .catch(e=>setUser(user))
        }
    }))
  }, [user,setUser]);

  const handleUploadAvatar = event =>{
    event.preventDefault()
    widget.open()
  }

  const handleRemoveAvatar = event =>{
    event.preventDefault()
    axios.post('/api/v1/admins/edit',{...user,avatar:null})
    .then(res=> setUser(res.data) )
    .catch(e=>setUser(user))
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
              {user ? user.fname:'First'} {user ? user.lname:'Last'}
            </Typography>
            <Typography
              variant="h5"
            >
              {user ? user.position:'Position'}
            </Typography>
            <Typography
              color="textSecondary"
              variant="body1"
            >
              {user ? user.email:'email@example.com'}, {user ? user.phone:'1234'}
            </Typography>
            <Typography
              color="textSecondary"
              variant="body2"
            >
              {user ? user.description:'Your Description'}
            </Typography>
          </div>
          { user ?
              user.avatar?
                <Avatar
                  className={classes.avatar}
                  src={user.avatar}
                />
              :
                <Avatar
                  className={classes.avatar}
                >
                  {user.fname[0]}{user.lname[0]}
                </Avatar>
            :
              <Avatar
                className={classes.avatar}
              >
                FL
              </Avatar>
          }
        </div>
      </CardContent>
      <Divider />
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
    </Card>
  );
};

AccountProfile.propTypes = {
  className: PropTypes.string
};

export default AccountProfile;
