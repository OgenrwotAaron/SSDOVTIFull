import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Avatar,
  Typography,
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
}));

const ProfileSummary = props => {
  const { className, user, ...rest } = props;

  const classes = useStyles();

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
            user ? user.avatar ? <Avatar alt={user.fname} src={user.avatar}/>
            :
              <Avatar className={classes.avatar}>
                <PersonIcon fontSize='large'/>
              </Avatar>
            :null
          }
        </div>
      </CardContent>
    </Card>
  );
};

ProfileSummary.propTypes = {
  className: PropTypes.string
};

export default ProfileSummary;
