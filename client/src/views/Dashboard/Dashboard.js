import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import {
  Budget,
  TotalUsers,
  TotalProfit,
  LatestOrders
} from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Dashboard = () => {

  const classes = useStyles();
  const [count, setCount] = useState({
    courses:0,
    students:0,
    teachers:0
  });

  useEffect(() => {
    axios.get('/api/v1/users/count')
    .then(res=>{
      setCount(res.data)
    })
  }, []);

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={4}
          sm={6}
          xl={4}
          xs={12}
        >
          <Budget count={count.users} />
        </Grid>
        <Grid
          item
          lg={4}
          sm={6}
          xl={4}
          xs={12}
        >
          <TotalUsers count={count.teachers} />
        </Grid>
        <Grid
          item
          lg={4}
          sm={6}
          xl={4}
          xs={12}
        >
          <TotalProfit count={count.courses} />
        </Grid>
        <Grid
          item
          xs={12}
        >
          <LatestOrders/>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
