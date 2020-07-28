import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Grid } from '@material-ui/core';

import { AccountProfile, AccountDetails } from './components';
import { saveUser } from '../../actions'
import { bindActionCreators } from 'redux';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Account = props => {
  const classes = useStyles();

  const [user, setUser] = useState({
    fname: 'John',
    lname:'Doe',
    position: 'Principal',
    email: 'john@doe.com',
    phone: '2910',
    description:'Short Description',
    avatar: '/images/avatars/avatar_1.png'
  });

  useEffect(() => {
      setUser(props.user)
  }, [props.user]);

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={4}
          md={6}
          xl={4}
          xs={12}
        >
          <AccountProfile saveUser={props.saveUser} setUser={setUser} user={user}/>
        </Grid>
        <Grid
          item
          lg={8}
          md={6}
          xl={8}
          xs={12}
        >
          <AccountDetails saveUser={props.saveUser} setUser={setUser} user={user}/>
        </Grid>
      </Grid>
    </div>
  );
};

Account.propTypes = {
  user:PropTypes.object
}

const mapStateToProps = state =>{
  return {
    user:state.loggedUser.user
  }
}

const mapDispatchToProps = dispatch =>{
  return bindActionCreators({saveUser},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Account);
