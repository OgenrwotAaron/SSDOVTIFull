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
  CircularProgress,
  Snackbar
} from '@material-ui/core';
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles(() => ({
  root: {}
}));

const AccountDetails = props => {
  const { className, saveUser, user,setUser, ...rest } = props;

  const classes = useStyles();

  const [values, setValues] = useState(user);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState({
    success:false,
    error:false
  });

  useEffect(() => {
    setValues(user)
  },[user]);

  const handleChange = event => {
    event.preventDefault();
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleSaveDetails = event =>{
    //if phone=admin, axios.post('/api/v1/admins/add',{...values})
    //once login is working
    setLoading(true)
    axios.post('/api/v1/admins/edit',{...values})
    .then(res=>{
      saveUser(res.data)
      setUser(res.data)
      setLoading(false)
      setResults({
        ...results,
        success:true
      })
    })
    .catch(e=>{
      setResults({
        ...results,
        error:true
      })
      setLoading(false)
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
          subheader="The information can be edited"
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
                helperText="Please specify the first name"
                label="First name"
                margin="dense"
                name="fname"
                onChange={handleChange}
                required
                value={values.fname}
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
                name="lname"
                onChange={handleChange}
                required
                value={values.lname}
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
              xs={12}
            >
              <TextField
                fullWidth
                label="Select Position"
                margin="dense"
                name="position"
                onChange={handleChange}
                required
                value={values.position}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <TextField
                fullWidth
                label="Description"
                margin="dense"
                name="description"
                onChange={handleChange}
                required
                value={values.description}
                variant="outlined"
                multiline
                rows={4}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            endIcon={loading ? <CircularProgress color='inherit' size={20} /> : null }
            color="primary"
            variant="contained"
            onClick={handleSaveDetails}
          >
            Save details
          </Button>
        </CardActions>
      </form>
      <Snackbar open={results.success} autoHideDuration={3000} onClose={handleClose}>
        <Alert variant='filled' onClose={handleClose} severity='success'>
            Updated Successfully
        </Alert>
      </Snackbar>
      <Snackbar open={results.error} autoHideDuration={3000} onClose={handleClose}>
        <Alert variant='filled' onClose={handleClose} severity='error'>
            Updated Failed
        </Alert>
      </Snackbar>
    </Card>
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string
};

export default AccountDetails;
