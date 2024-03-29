import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Button,
  TextField,
  Link,
  Typography,
  InputAdornment
} from '@material-ui/core';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import palette from 'theme/palette';

const schema = {
  firstName: {
    presence: { allowEmpty: true, message: 'is required' },
    length: {
      maximum: 32
    }
  },
  lastName: {
    presence: { allowEmpty: true, message: 'is required' },
    length: {
      maximum: 32
    }
  },
  email: {
    presence: { allowEmpty: true, message: 'is required' },
    email: true,
    length: {
      maximum: 64
    }
  },
  password: {
    presence: { allowEmpty: true, message: 'is required' },
    length: {
      maximum: 128
    }
  },
  regNumber: {
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
    backgroundColor: theme.palette.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(/favicon.ico)',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    marginLeft:100,
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
    backgroundColor:'white',
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
    paddingBottom: 50,
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
  textField: {
    marginTop: theme.spacing(2)
  },
  textAreaIcon: {
    color:'#7e8294',
    padding:'2px'
  },
  policy: {
    marginTop: theme.spacing(1),
    display: 'flex',
    alignItems: 'center'
  },
  policyCheckbox: {
    marginLeft: '-14px'
  },
  signUpButton: {
    margin: theme.spacing(2, 0)
  }
}));

const SignUp = props => {

  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: true,
    values: {},
    touched: {},
    errors: {}
  });

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
        [event.target.name]:event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const handleSignUp = event => {
    event.preventDefault();
    console.log(formState)
    //history.push('/profile/1');
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
                onSubmit={handleSignUp}
              >
                <Typography
                  className={classes.title}
                  variant="h2"
                  color='primary'
                >
                  Enroll to SSDOVTI
                </Typography>
                {/* <TextField
                  className={classes.textField}
                  error={hasError('firstName')}
                  fullWidth
                  helperText={
                    hasError('firstName') ? formState.errors.firstName[0] : null
                  }
                  label="First name"
                  name="firstName"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.firstName || ''}
                  variant="outlined"
                  InputProps={{
                    startAdornment:(
                      <InputAdornment position="start">
                        <PersonOutlineOutlinedIcon className={classes.textAreaIcon} fontSize="small"/>
                      </InputAdornment>
                    )
                  }}
                /> */}
                {/* <TextField
                  className={classes.textField}
                  error={hasError('lastName')}
                  fullWidth
                  helperText={
                    hasError('lastName') ? formState.errors.lastName[0] : null
                  }
                  label="Last name"
                  name="lastName"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.lastName || ''}
                  variant="outlined"
                  InputProps={{
                    startAdornment:(
                      <InputAdornment position="start">
                        <PersonOutlineOutlinedIcon className={classes.textAreaIcon} fontSize="small"/>
                      </InputAdornment>
                    )
                  }}
                /> */}
                {/* <TextField
                  className={classes.textField}
                  error={hasError('email')}
                  fullWidth
                  helperText={
                    hasError('email') ? formState.errors.email[0] : null
                  }
                  label="Email address"
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
                /> */}
                <TextField
                  className={classes.textField}
                  error={hasError('reg')}
                  fullWidth
                  helperText={
                    hasError('reg') ? formState.errors.regNumber[0] : null
                  }
                  label="Registration Number"
                  name="regNumber"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.regNumber || ''}
                  variant="outlined"
                  placeholder='17/SS/1234/DOVTI'
                  InputProps={{
                    startAdornment:(
                      <InputAdornment position="start">
                        <HowToRegIcon className={classes.textAreaIcon} fontSize="small"/>
                      </InputAdornment>
                    )
                  }}
                />
                {/* <TextField
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
                /> */}
                <Button
                  className={classes.signUpButton}
                  color="primary"
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Enroll Now
                </Button>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Have an account?{' '}
                  <Link
                    component={RouterLink}
                    to="/sign-in"
                    variant="h6"
                    style={{color:palette.primary.dark}}
                  >
                    Sign in
                  </Link>
                </Typography>
              </form>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

SignUp.propTypes = {
  history: PropTypes.object
};

export default withRouter(SignUp);
