import React, { useState } from 'react';
import { Tabs, Tab, Typography, Grid, Avatar, makeStyles } from '@material-ui/core';
import { TabPanel } from 'views/Home/components/Courses/components';
import PersonIcon from '@material-ui/icons/Person';
import { CourseModules, Students } from './components';

const useStyles = makeStyles(theme=>({
    avatar:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        height:'100%'
    }
}))

const Details = props => {

    const classes = useStyles()

    const { description, modules, code, user, hod } = props

    const [ value, setValue ]= useState(0)

    const handleChange = (event,newValue) =>{
        setValue(newValue)
    }

    return ( 
        <div>
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
            >
                <Tab label="Description" />
                <Tab label="Modules" />
                <Tab label="Head of Department" />
                {user.role !== 2 && <Tab label="Students"/>}
            </Tabs>
            <TabPanel value={value} index={0}>
                <div>
                    <Typography variant='h4'>Course Description</Typography>
                    <Typography color='textSecondary' component='p'>
                        {description ? description:'Add Course Description'}
                    </Typography>
                </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <CourseModules code={code} modules={modules}/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <div>
                    <Typography variant='h4' align='center' >About the H.O.D</Typography>
                    <Grid style={{paddingTop:'10px'}} container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <div className={classes.avatar}>
                                {
                                    hod.avatar ?
                                        <Avatar src={hod.avatar} alt={hod.fname}/>
                                    :
                                        <Avatar style={{height:'100px', width:'100px'}}>
                                            <PersonIcon fontSize='large'/>
                                        </Avatar>
                                }
                                
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <Typography variant='h5'>
                                {hod.fname} {hod.lname}-
                                <Typography color='textSecondary' component='span'>
                                    Head of Department
                                </Typography>
                            </Typography>
                            <Typography color='textSecondary' component='p'>
                                {hod.description}
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
            </TabPanel>
            {user.role !== 2 &&
                <TabPanel value={value} index={3}>
                    <Students  code={code}/>
                </TabPanel>
            }
        </div>
     );
}
 
export default Details;