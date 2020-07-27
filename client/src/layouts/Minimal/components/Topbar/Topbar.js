import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: 'none',
    backgroundColor:theme.palette.background.paper
  },
}));

const Topbar = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
      color="primary"
      position="fixed"
    >
      <Toolbar>
        <RouterLink to="/">
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',paddingTop:'5px'}}>
            <img
              alt="Logo"
              src="/favicon.ico"
              style={{width:'60px',marginRight:'10px'}}
            />
            <Typography
              variant="h2"
              color="primary"
            >
              SSDO-VTI
            </Typography>
          </div>
          
        </RouterLink>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string
};

export default Topbar;
