import React from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import LibraryBooksOutlinedIcon from '@material-ui/icons/LibraryBooksOutlined';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SchoolOutlinedIcon from '@material-ui/icons/SchoolOutlined';
import SecurityIcon from '@material-ui/icons/Security';
import HowToRegIcon from '@material-ui/icons/HowToReg';

import { Profile, SidebarNav } from './components';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

const Sidebar = props => {
  const { open, variant, onClose, user, className } = props;

  const classes = useStyles();

  const pages = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: <DashboardIcon />
    },
    {
      title: 'Students',
      href: '/users/students',
      icon: <SchoolOutlinedIcon />
    },
    {
      title: 'Teachers',
      href: '/users/teachers',
      icon: <PeopleIcon />
    },
    {
      title: 'Courses',
      href: '/my-courses',
      icon: <LibraryBooksOutlinedIcon />
    },
    {
      title: 'Account',
      href: '/account',
      icon: <AccountBoxIcon />
    },
  ];

  if(user){
    user.role === 0 && pages.unshift(
      {
        title: 'Admins',
        href: '/users/admins',
        icon: <SecurityIcon />
      },
      {
        title: 'H.O.Ds',
        href: '/users/hods',
        icon: <HowToRegIcon />
      }
    )
  }

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div
        className={clsx(classes.root, className)}
      >
        <Profile user={user} />
        <Divider className={classes.divider} />
        <SidebarNav
          className={classes.nav}
          pages={pages}
        />
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired,
  user:PropTypes.object
};

const mapStateToProps = state =>{
  return {
    user:state.loggedUser.user
  }
}

export default connect(mapStateToProps)(Sidebar);
