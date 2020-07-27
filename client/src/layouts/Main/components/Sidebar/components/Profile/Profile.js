import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: theme.spacing(1)
  }
}));

const Profile = props => {
  const { className, user, ...rest } = props;

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      {
        user.avatar !== null ?
          <Avatar
            alt="Person"
            className={classes.avatar}
            component={RouterLink}
            src={user.avatar}
            to="/account"
          />
        :
          <Avatar className={classes.avatar} component={RouterLink} to="/account">
            {user.fname[0]}{user.lname[0]}
          </Avatar>
      }
      
      <Typography
        className={classes.name}
        variant="h4"
      >
        {user.fname} {user.lname}
      </Typography>
      <Typography variant="body2">{user.email}</Typography>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
