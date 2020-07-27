import React from 'react';
import { Typography, List, ListItem, ListItemText, makeStyles, Divider } from '@material-ui/core'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme=>({
    list:{
        border:'1px solid #dfdfdf',
        borderRadius:10,
        padding:0,
        margin:theme.spacing(2,0)
    },
    header:{
        backgroundColor:'#dfdfdf',
        borderRadius:'10px 10px 0 0',
    },
    listItem:{
        margin:theme.spacing(2,0)
    }
}))

const CourseModules = props => {

    const { modules,code } = props;

    const classes = useStyles()

    if(!modules){
        return <Typography>No Modules available yet</Typography>
    }

    return ( 
        <div>
            <List component='nav'>
                {
                    modules.map((item,i)=>(
                        <div key={i} className={classes.list}>
                           <ListItem className={classes.header}>
                                <ListItemText primary={item.name} secondary={`Phase ${item.phase}`} />
                            </ListItem> 
                            <Divider/>
                            {
                                item.moduleUnits.map((unit,key)=>(
                                    <Link to={`/module/${code}/${item.id}/${unit.id}`} key={key}>
                                        <ListItem>
                                            <ListItemText primary={unit.name} secondary={`${unit.duration} Days`}/>
                                        </ListItem>
                                        <Divider/>
                                    </Link>
                                ))
                            }
                        </div>
                    ))
                }
            </List>
        </div>
     );
}
 
export default CourseModules;