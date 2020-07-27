import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Paper, makeStyles, Tabs, Tab, Typography, Grid, Button } from '@material-ui/core';
import { TabPanel, CourseCard } from './components';

const useStyles = makeStyles(theme=>({
    root:{
        textAlign:'center',
        paddingTop:10
    }
}))

const Courses = props => {

    const classes = useStyles()

    const [ value, setValue ]= useState(0)
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        axios.get('/api/v1/courses')
        .then(res=>setCourses(res.data))
    }, []);

    const handleChange = (event,newValue) =>{
        setValue(newValue)
    }
    
    return ( 
        <Paper className={classes.root} elevation={0}>
            <Typography variant='h3'>Courses</Typography>
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
            >
                <Tab label="TECHNICAL EDUCATION" />
                <Tab label="VOCATIONAL TRAINING" />
            </Tabs>
            <TabPanel value={value} index={0}>
                <Grid container spacing={2}>
                    {
                        courses.slice(0,4).map((item,i)=>(
                            <Grid item xs={12} key={i} sm={6} md={4} lg={3}>
                                <CourseCard code={item.code} name={item.name} cover={item.cover}/>
                            </Grid>
                        ))
                    }
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Grid container spacing={2}>
                    {
                        courses.slice(5,9).map((item,i)=>(
                            <Grid item xs={12} key={i} sm={6} md={4} lg={3}>
                                <CourseCard code={item.code} name={item.name} cover={item.cover}/>
                            </Grid>
                        ))
                    }
                </Grid>
            </TabPanel>
            {courses.length < 1 ? <Typography>No Courses Available Right now</Typography>:<Button href='/all-courses'>View All Courses...</Button>}
        </Paper>
     );
}
 
export default Courses;