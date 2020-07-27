import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, Hidden } from '@material-ui/core';
import ElevationScroll from './components/ElevationScroll/ElevationScroll';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import MenuIcon from '@material-ui/icons/Menu';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { logOut } from '../../../../actions'
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme=>({
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
          display: 'block',
        },
    },
    logo:{
        display:'flex',
        justifyContent:'space-around',
        alignItems:'center',
        padding:'5px 0',
        color:'white'
    },
    grow:{
        flexGrow:1
    },
    menu:{
        width:'100%'
    }
}))

const Topbar = props => {

    const [ anchorEl, setAnchorEl ] = useState(null)
    const [anchorEl1,setAnchorEl1] = useState(null)

    const { user, logOut,...rest } = props

    const classes = useStyles()

    const handleOpenMenu = event =>{
        setAnchorEl(event.currentTarget)
    }

    const handleMobileMenuOpen = event =>{
        setAnchorEl1(event.currentTarget)
    }

    const handleMenuClose = () =>{
        setAnchorEl(null)
    }

    const handleMobileMenuClose = () =>{
        setAnchorEl1(null)
    }

    const handleLogOut = () =>{
        logOut()
    }

    return ( 
        <div>
            <ElevationScroll {...props}>
                <AppBar {...rest} position='fixed'>
                    <Toolbar>
                        <Link to='/' className={classes.logo}>
                            <img
                                src='/favicon.ico'
                                alt='logo'
                                style={{width:'60px',marginRight:'10px'}}
                            />
                            <Typography className={classes.title} color='inherit' variant='h2' noWrap>SSDOVTI</Typography>
                        </Link>
                        {/* about,contact,signin/sign-up,courses(calendar) */}
                        <div className={classes.grow}/>
                        <Hidden xsDown>
                            <Button color='inherit' endIcon={ Boolean(anchorEl) ? <ExpandLessIcon/>:<ExpandMoreIcon/>} onClick={handleOpenMenu}>
                                Courses
                            </Button>
                            <Button color='inherit' href='/about'>
                                About Us
                            </Button>
                            <Button color='inherit' href='/contact-us'>
                                Contact
                            </Button>
                            <Button color='inherit' href='/enrollment'>
                                Enrollment
                            </Button>
                            {user.role === undefined ? 
                                <Button color='inherit' href='/sign-in'>
                                    Login
                                </Button>
                            :
                                <Button color='inherit' onClick={handleLogOut}>
                                    LogOut
                                </Button>
                            }
                            {user.role === 0 &&
                                <Button color='inherit' href='/dashboard'>
                                    <DashboardIcon/>
                                </Button>
                            }
                            {user.role ? user.role !==0 ?
                                <Button color='inherit' href={`/profile/${user.id}`}>
                                    <AccountCircleIcon/>
                                </Button>:null:null
                            }
                        </Hidden>
                        <Hidden smUp>
                            <Button startIcon={Boolean(anchorEl1) ? <MenuOpenIcon/> :<MenuIcon/>  } onClick={handleMobileMenuOpen} color='inherit'>Menu</Button>
                        </Hidden>
                        <Menu
                            id='course-menu'
                            className={classes.menu}
                            keepMounted
                            anchorOrigin={{vertical:'bottom',horizontal:'left'}}
                            getContentAnchorEl={null}
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                        >
                            <MenuItem><Button size='small' href='/course/EIS-0024'>Solar PV Systems and Electrical Installation</Button> </MenuItem>
                            <MenuItem><Button size='small' href='/course/BC-0014'>Building and Constructions</Button></MenuItem>
                            <MenuItem><Button size='small' href='/course/ATM-0044'>Auto mechanic</Button></MenuItem>
                            <MenuItem><Button size='small' href='/course/AGB-0034'>Agribusiness</Button></MenuItem>
                            <MenuItem><Button size='small' href='/course/CHS-0054'>Catering and Hospitality Services</Button></MenuItem>
                            <MenuItem><Button size='small' href='/course/HBT-0064'>Hairdressing and Beauty Therapy</Button></MenuItem>
                            <MenuItem><Button size='small' href='/all-courses'>View All Courses</Button></MenuItem>
                        </Menu>
                        <Menu
                            id='moblie-menu'
                            keepMounted
                            anchorOrigin={{vertical:'bottom',horizontal:'left'}}
                            getContentAnchorEl={null}
                            anchorEl={anchorEl1}
                            open={Boolean(anchorEl1)}
                            onClose={handleMobileMenuClose}
                        >
                            <MenuItem>
                                <Button color='inherit' href='/courses'>
                                    Courses
                                </Button>
                            </MenuItem>
                            <MenuItem>
                                <Button color='inherit' href='/about'>
                                    About Us
                                </Button>
                            </MenuItem>
                            <MenuItem>
                                <Button color='inherit' href='/contact-us'>
                                    Contact
                                </Button>
                            </MenuItem>
                            <MenuItem>
                                <Button color='inherit' href='/team'>
                                    Our Team
                                </Button>
                            </MenuItem>
                            <MenuItem>
                                <Button color='inherit' href='/sign-in'>
                                    Login
                                </Button>
                            </MenuItem>
                            <MenuItem>
                                <Button color='inherit' href='/sign-up'>
                                    Enroll
                                </Button>
                            </MenuItem>
                        </Menu>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
        </div>
        
     );
}

Topbar.propTypes = {
    user:PropTypes.object,
    logOut:PropTypes.func
}

const mapStateToProps = state =>{
    return {
        user:state.loggedUser.user
    }
}

const mapDispatchToProps = dispatch =>{
    return bindActionCreators({logOut},dispatch)
}
 
export default connect(mapStateToProps,mapDispatchToProps)(Topbar);