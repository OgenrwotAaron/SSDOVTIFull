import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar, CardActionArea } from '@material-ui/core';
import SchoolOutlinedIcon from '@material-ui/icons/SchoolOutlined';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.error.main,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  },
}));

const Budget = props => {
  const { className, count, ...rest } = props;

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardActionArea href='/users/students'>
        <CardContent>
          <Grid
            container
            justify="space-between"
          >
            <Grid item>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                STUDENTS
              </Typography>
              <Typography variant="h3">{count && count[0].n_students}</Typography>
            </Grid>
            <Grid item>
              <Avatar className={classes.avatar}>
                <SchoolOutlinedIcon className={classes.icon} />
              </Avatar>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

Budget.propTypes = {
  className: PropTypes.string
};

export default Budget;
