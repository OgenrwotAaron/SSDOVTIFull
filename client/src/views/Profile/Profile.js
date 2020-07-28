import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import { ProfileSummary, ProfileDetails } from './components';
import { reloadUser } from '../../actions'
import { bindActionCreators } from 'redux';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  hero:{
        height:'30vh',
        backgroundImage:'url(/images/hero.jpg)',
        backgroundSize:'cover',
        backgroundPositionY:'bottom',
  }
}));

const Profile = props => {

  const { user,history, reloadUser } = props

  const classes = useStyles();

  const [reload, setReload] = useState(false);

  useEffect(() => {
    if(user.role===0 || !user.role){
      history.push('/')
    }
  }, [reload,user.role,history]);

  return (
    <div>
        <div className={classes.hero}></div>
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
                    <ProfileSummary user={user} />
                </Grid>
                <Grid
                    item
                    lg={8}
                    md={6}
                    xl={8}
                    xs={12}
                >
                    <ProfileDetails reloadUser={reloadUser} reload={reload} setReload={setReload} user={user} />
                </Grid>
            </Grid>
        </div> 
    </div>
  );
};

Profile.propTypes = {
  user:PropTypes.object
}

const mapStateToProps = state =>{
  return {
    user:state.loggedUser.user
  }
}

const mapDispatchToProps = dispatch =>{
  return bindActionCreators({reloadUser},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Profile);
