import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Button,
  Checkbox,
  TextField,
  Typography,
  InputAdornment
} from '@material-ui/core';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';
//import palette from 'theme/palette';
import axios from 'axios'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { saveUser } from '../../actions'

const schema = {
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 64
    }
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128
    }
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: '100%'
  },
  grid: {
    height: '100%'
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  quote: {
    marginLeft:100,
    backgroundColor: theme.palette.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(/favicon.ico)',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px'
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.white
  },
  contentContainer: {},
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  form: {
    paddingLeft: 50,
    paddingRight: 50,
    paddingBottom: 125,
    flexBasis: 700,
    //background: 'linear-gradient(145deg, #f1f1f1, #ffffff);',
    boxShadow:'50px 50px 68px #6d609d57, -30px -30px 68px #ffffff',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 30,
      paddingRight: 30,
      marginLeft: 30,
      marginRight:30,
    },
    [theme.breakpoints.up('lg')]:{
      marginLeft: 200,
      marginRight:200,
      borderRadius:10,
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  socialButtons: {
    marginTop: theme.spacing(3)
  },
  socialIcon: {
    marginRight: theme.spacing(1)
  },
  sugestion: {
    marginTop: theme.spacing(2)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  signInButton: {
    margin: theme.spacing(2, 0)
  },
  textAreaIcon: {
    color:'#7e8294',
    padding:'2px'
  },
  buttonIcon:{
    padding:"2px"
  },
  policy: {
    marginTop: theme.spacing(1),
    display: 'flex',
    alignItems: 'center'
  },
  policyCheckbox: {
    marginLeft: '-14px'
  },
}));

const SignIn = props => {
  const { history, user, saveUser } = props;

  if(Object.keys(user).length>0){
    history.push('/')
  }

  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });
  const [error, setError] = useState(false);

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? true
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const handleSignIn = event => {
    event.preventDefault();
    axios.post('/api/v1/users/login',{
      user_name:formState.values.email,
      password:formState.values.password
    })
    .then(res=>{
      saveUser(res.data)
    })
    .catch(e=>{
      setError(true)
    })
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div className={classes.root}>
      <Grid
        className={classes.grid}
        container
      >
        <Grid
          className={classes.quoteContainer}
          item
          lg={5}
        >
          <div className={classes.quote}>
          </div>
        </Grid>
        <Grid
          className={classes.content}
          item
          lg={7}
          xs={12}
        >
          <div className={classes.content}>
            <div className={classes.contentBody}>
              <form
                className={classes.form}
                onSubmit={handleSignIn}
              >
                <Typography
                  className={classes.title}
                  variant="h2"
                  color="primary"
                >
                  Sign in
                </Typography>
                <Typography>
                  Instant Access
                </Typography>
                <TextField
                  className={classes.textField}
                  error={hasError('email')}
                  fullWidth
                  helperText={
                    hasError('email') ? formState.errors.email[0] : null
                  }
                  label="Username"
                  name="email"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.email || ''}
                  variant="outlined"
                  InputProps={{
                    startAdornment:(
                      <InputAdornment position="start">
                        <EmailOutlinedIcon className={classes.textAreaIcon} fontSize="small"/>
                      </InputAdornment>
                    )
                  }}
                  
                />
                <TextField
                  className={classes.textField}
                  error={hasError('password')}
                  fullWidth
                  helperText={
                    hasError('password') ? formState.errors.password[0] : null
                  }
                  label="Password"
                  name="password"
                  onChange={handleChange}
                  type="password"
                  value={formState.values.password || ''}
                  variant="outlined"
                  InputProps={{
                    startAdornment:(
                      <InputAdornment position="start">
                        <VpnKeyOutlinedIcon className={classes.textAreaIcon} fontSize="small"/>
                      </InputAdornment>
                    )
                  }}
                />
                <div className={classes.policy}>
                  <Checkbox
                      checked={formState.values.policy || false}
                      className={classes.policyCheckbox}
                      color="primary"
                      name="rememberme"
                      onChange={handleChange}
                    />
                  <Typography
                    className={classes.policyText}
                    color="textSecondary"
                    variant="body1"
                  >
                    Remember me
                  </Typography>
                </div>
                <div>
                  {error && <Typography style={{color:'red'}}>Incorrect Password or Username</Typography>}
                </div>
                <Grid item>
                    <Button
                      className={classes.signInButton}
                      color="primary"
                      disabled={!formState.isValid}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      <LockOpenOutlinedIcon className={classes.buttonIcon} fontSize="small"/>
                      Login
                    </Button>
                  </Grid>
                {/* <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Don't have an account?{' '}
                  <Link
                    component={RouterLink}
                    to="/sign-up"
                    variant="h6"
                    style={{color:palette.primary.dark}}
                  >
                    Enroll
                  </Link>
                </Typography> */}
              </form>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

SignIn.propTypes = {
  history: PropTypes.object
};

const mapStateToProps = state =>{
  return {
    user:state.loggedUser.user
  }
}

const mapDispatchToProps = dispatch =>{
  return bindActionCreators({saveUser},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(SignIn));
