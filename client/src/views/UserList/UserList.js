import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { UsersTable } from './components';
import mockData from './data';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const UserList = props => {
  const classes = useStyles();

  const { match:{params:{type}} } = props

  const [users] = useState(mockData);

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <UsersTable type={type} users={users} />
      </div>
    </div>
  );
};

export default UserList;
