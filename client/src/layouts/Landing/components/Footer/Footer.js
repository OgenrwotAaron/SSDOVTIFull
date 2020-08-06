import React from 'react';
import { Link } from 'react-router-dom'
import { makeStyles, Typography, Grid, Divider } from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import RoomIcon from '@material-ui/icons/Room';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles(theme=>({
    root:{
        padding:theme.spacing(2,2),
        textAlign:'center',
    },
    pages:{
        display:'flex',
        flexDirection:'column',
        textAlign:'left',
    },
    links:{
        color:'#546e7a',
        margin:theme.spacing(1,0),
        fontSize:18
    },
    divider:{
        backgroundColor:theme.palette.primary.main,
        height:4,
        margin:theme.spacing(1,0)
    },
    icons:{
        marginBottom:-6
    },
    date:{
        backgroundColor:'white',
        display:'flex',
        justifyContent:'center',
        padding:theme.spacing(1,1,3,1)
    },
    gridItem:{
        padding:theme.spacing(2)
    }
}))

const Footer = props => {

    const classes = useStyles()

    return ( 
        <div style={{backgroundColor:'white'}}>
            <Grid className={classes.root} container>
                <Grid item className={classes.gridItem} xs={6} sm={4}>
                    <Typography variant='h5' style={{color:'#e77924'}} >Pages</Typography>
                    <Divider className={classes.divider}/>
                    <div className={classes.pages}>
                        <Link to='/all-courses' ><Typography className={classes.links}>Courses</Typography></Link>
                        <Link to='/about' ><Typography className={classes.links}>About Us</Typography></Link>
                        <Link to='/contact' ><Typography className={classes.links}>Contact</Typography></Link>
                        <Link to='/sign-in' ><Typography className={classes.links}>Login</Typography></Link>
                        <Link to='/enrollment' ><Typography className={classes.links}>Enrollment</Typography></Link>
                    </div>
                </Grid>
                <Grid item className={classes.gridItem} xs={6} sm={4} >
                    <Typography variant='h5' style={{color:'#e77924'}} >Contact</Typography>
                    <Divider className={classes.divider}/>
                    <div className={classes.pages}>
                        <Typography className={classes.links}><PhoneIcon className={classes.icons}/> +211 (0) 928 930 555</Typography>
                        <Typography className={classes.links}><PhoneIcon className={classes.icons}/>  +211 (0) 928 948 555</Typography>
                        <Typography className={classes.links}><EmailIcon className={classes.icons}/> ssdovocin@gmail.com</Typography>
                        <Typography className={classes.links}><EmailIcon className={classes.icons}/>  info@ssdoprog.org</Typography>
                    </div>
                </Grid>
                <Grid item className={classes.gridItem} xs={12} sm={4}>
                    <Typography variant='h5' style={{color:'#e77924'}} >Address</Typography>
                    <Divider className={classes.divider}/>
                    <div className={classes.pages}>
                        <Typography className={classes.links}><RoomIcon className={classes.icons}/>Hai Guava along Yei – Lasu Road</Typography>
                        <Typography className={classes.links}><HomeIcon className={classes.icons}/>Yei Town, Republic of South Sudan.</Typography>
                    </div>
                </Grid>
            </Grid>
            <div className={classes.date}>
                <Typography variant='h5' color='textSecondary'>SSDOVTI {new Date().getFullYear()} &copy;</Typography>
            </div>
        </div>
     );
}
 
export default Footer;