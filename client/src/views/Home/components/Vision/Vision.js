import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import EmojiObjectsOutlinedIcon from '@material-ui/icons/EmojiObjectsOutlined';

const useStyles =  makeStyles(theme=>({
    root:{
        padding:theme.spacing(4,2),
        textAlign:'center',
        backgroundColor:theme.palette.primary.dark
    },
    icon:{
        fontSize:74,
        color:'white'
    }
}))

const Vision = props => {

    const classes = useStyles()

    return ( 
        <div className={classes.root}>
            <EmojiObjectsOutlinedIcon className={classes.icon}/>
            <Typography variant='h2' style={{margin:'20px 0',color:'white'}}>Our Vision</Typography>
            <Typography variant='h4' component='i' style={{fontWeight:'300',margin:'20px 0',color:'#e7e7e7'}}>
                "Implanted Creativity and Innovations skills that are relevant to sustainable human resource development and stable livelihood economy in the society"
            </Typography>
        </div>
     );
}
 
export default Vision;