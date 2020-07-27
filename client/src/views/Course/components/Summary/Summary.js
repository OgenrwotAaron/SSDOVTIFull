import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Button, List, ListItem, ListItemText, makeStyles, Divider, ListItemIcon, Snackbar } from '@material-ui/core';

import DateRangeIcon from '@material-ui/icons/DateRange';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import HorizontalSplitIcon from '@material-ui/icons/HorizontalSplit';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';

const useStyles = makeStyles(theme=>({
    root:{
        border:'1px solid #d7d7d7'
    },
    btn:{
        width:'100%',
        margin: theme.spacing(0,0,1,0),
    },
    snack:{
        borderRadius:5,
        '& .MuiSnackbarContent-root':{
            backgroundColor:theme.palette.success.light,
            borderRadius:5
        },
    },
    snackError:{
        borderRadius:5,
        '& .MuiSnackbarContent-root':{
            backgroundColor:theme.palette.error.light,
            borderRadius:5
        },
    }
}))

const Summary = props => {

    const { phases, modules, user } = props

    const classes = useStyles()

    const [ snack, setSnack ] = useState({
        error:false,
        success:false
    })
    const [ units, setUnits ] = useState(0)
    const [ duration, setDuration ] = useState(0)

    useEffect(()=>{
        if(modules){
            const totalUnits = modules.map(item=> item.moduleUnits.length).reduce((a,b)=>a+b,0)
            const totalDuration = modules.map(item=>item.moduleUnits.map(unit=> unit.duration).reduce((a,b)=>a+b,0)).reduce((c,d)=>c+d,0)
            setUnits(totalUnits)
            setDuration(totalDuration)
        }
    },[modules])

    const handleOpen = () =>{
        axios.post(`/api/v1/students/edit`,{...user,status:'enrolled'})
        .then(res=>{
            setSnack({
                ...snack,
                success:true
            })
        })
        .catch(e=>{
            setSnack({
                ...snack,
                error:true
            })
        })
    }

    const handleClose = () =>{
        setSnack(false)
    }

    return ( 
        <div>
            {user.role === 2 ?
                user.status === 'pending' ?
                    <Button onClick={handleOpen} className={classes.btn} color='primary' variant='contained'>Enroll Now</Button>
                :
                    null
            :
                null
            }
            
            <div className={classes.root}>
                <List component='nav'>
                    <ListItem>
                        <ListItemIcon>
                            <HorizontalSplitIcon/>
                        </ListItemIcon>
                        <ListItemText primary='Phases' secondary={`${phases} Course Phases`}/>
                    </ListItem>
                    <Divider/>
                    <ListItem>
                        <ListItemIcon>
                            <ViewModuleIcon/>
                        </ListItemIcon>
                        <ListItemText primary='Modules' secondary={`${modules ? modules.length:''} Course Modules`}/>
                    </ListItem>
                    <Divider/>
                    <ListItem>
                        <ListItemIcon>
                            <LibraryBooksIcon/>
                        </ListItemIcon>
                        <ListItemText primary='Course Units' secondary={`${units} Course Units`}/>
                    </ListItem>
                    <Divider/>
                    <ListItem>
                        <ListItemIcon>
                            <DateRangeIcon/>
                        </ListItemIcon>
                        <ListItemText primary='Duration' secondary={`${duration} Days`}/>
                    </ListItem>
                </List>
            </div>
            <Snackbar 
                open={snack.success} 
                autoHideDuration={3000} 
                onClose={handleClose}
                message='Enrolled Successfully'
                className={classes.snack}
            />
            <Snackbar 
                open={snack.error} 
                autoHideDuration={3000} 
                onClose={handleClose}
                message='Failed to Enroll'
                className={classes.snackError}
            />
        </div>
     );
}
 
export default Summary;