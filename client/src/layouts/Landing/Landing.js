import React from 'react';
import PropTypes from 'prop-types'
import { makeStyles, useTheme } from '@material-ui/styles';
import { Topbar, Footer } from './components';
import { useMediaQuery } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles(theme=>({
    root: {
        paddingTop: 0,
        height: '100%',
        [theme.breakpoints.up('sm')]: {
            paddingTop: 0
        }
    },
    shiftContent: {
        paddingLeft: 0
    },
    content:{
        height:'100%'
    }
}))

const Landing = props => {

    const { children } = props

    const classes = useStyles();
    const theme = useTheme();

    const isDesktop = useMediaQuery(theme.breakpoints.up("lg"),{
        defaultMatches:true
    })

    // const [openSidebar,setOpenSidebar] = useState(false)

    // const handleSidebarClose = () => {
    //     setOpenSidebar(false);
    // };

    // const shouldOpenSidebar = isDesktop ? true : openSidebar;

    return ( 
        <div className={clsx({
            [classes.root]:true,
            [classes.shiftContent]:isDesktop
        })}>
            <Topbar/>
            {/* <Sidebar
                onClose={handleSidebarClose}
                open={shouldOpenSidebar}
                variant={isDesktop ? 'persistent':'temporary'}
            /> */}
            <main className={classes.content}>
                {children}
                <Footer/>
            </main>
        </div>
     );
}

Landing.propTypes = {
    children:PropTypes.node
}
 
export default Landing;