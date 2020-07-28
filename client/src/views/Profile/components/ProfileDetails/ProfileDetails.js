import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import axios from 'axios'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
  Snackbar
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles(() => ({
  root: {}
}));

const ProfileDetails = props => {
  const { className, user, reload, reloadUser, setReload, ...rest } = props;

  const classes = useStyles();

  const [values, setValues] = useState({
    firstName: 'First',
    lastName: 'Last',
    email: 'firstlast@mail.com',
    phone: '',
    course:'Building and Construction',
    regNumber:'17/SS/2312/DOVTI',
    dob:'',
    class:'One(I)',
    newPass:'',
    rePass:''
  });

  const [results, setResults] = useState({
    success:false,
    error:false
  });

  useEffect(() => {
    if(user){
      setValues({
        firstName: user.fname,
        lastName: user.lname,
        email: user.email,
        phone: user.phone,
        course:user.course_code,
        regNumber:user.reg_number,
        newPass:user.password,
        user_name:user.user_name,
        rePass:'',
        role:user.role
      })
    }
  }, [user]);

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleSaveDetails = event =>{
    //email, phone, password, user_name, role
    axios.post('/api/v1/users/edit',{
      email:values.email,
      phone:values.phone,
      password:values.rePass,
      user_name:values.user_name,
      role:values.role
    })
    .then(res=>{
      reloadUser(user.role,user.user_name)
      setResults({
        ...results,
        success:true
      })
      setReload(!reload)
    })
    .catch(e=>{
      setResults({
        ...results,
        error:true
      })
      setReload(!reload)
    })
  }

  const handleClose = () =>{
    setResults({
      ...!results
    })
  }

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form
        autoComplete="off"
        noValidate
      >
        <CardHeader
          subheader="Only Phone Number and Email can be updated, contact the Administration for editing other details"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Course Code"
                margin="dense"
                name="course"
                onChange={handleChange}
                disabled
                value={values.course}
                variant="outlined"
              />
            </Grid>
            {user.role ===2 && <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Registration Number"
                margin="dense"
                name="regNumber"
                onChange={handleChange}
                disabled
                value={values.regNumber}
                variant="outlined"
              />
            </Grid>}
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="First name"
                margin="dense"
                name="firstName"
                onChange={handleChange}
                disabled
                value={values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Last name"
                margin="dense"
                name="lastName"
                onChange={handleChange}
                disabled
                value={values.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email Address"
                margin="dense"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Phone Number"
                margin="dense"
                name="phone"
                onChange={handleChange}
                value={values.phone}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label='Old Password'
                margin="dense"
                name="newPass"
                onChange={handleChange}
                value={values.newPass}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={user.role === 2 ? 6:12}
              xs={12}
            >
              <TextField
                fullWidth
                label='New Password'
                margin="dense"
                name="rePass"
                onChange={handleChange}
                type="password"
                value={values.rePass}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={handleSaveDetails}
          >
            Save details
          </Button>
        </CardActions>
      </form>
      <Snackbar open={results.success} autoHideDuration={4000} onClose={handleClose}>
        <Alert variant='filled' severity='success' onClose={handleClose}>
          Updated Successfully
        </Alert>
      </Snackbar>
      <Snackbar open={results.error} autoHideDuration={4000} onClose={handleClose}>
        <Alert variant='filled' severity='error' onClose={handleClose}>
          Updated failed, try again
        </Alert>
      </Snackbar>
    </Card>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;
