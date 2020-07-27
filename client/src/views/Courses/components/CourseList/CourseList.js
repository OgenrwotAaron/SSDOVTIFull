import React, { useState, useEffect} from 'react';
import { Paper, makeStyles, Grid } from '@material-ui/core';
import axios from 'axios';

import { CourseCard } from 'views/Home/components/Courses/components';

const useStyles = makeStyles(theme=>({
    root:{
        padding:theme.spacing(4,3)
    }
}))

const CourseList = props => {

    const classes = useStyles()

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        axios.get('/api/v1/courses')
        .then(res=>setCourses(res.data))
    }, []);

    return ( 
        <Paper className={classes.root}>
            <Grid container spacing={2}>
                {
                    courses.map((item,i)=>(
                        <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
                            <CourseCard {...item}/>
                        </Grid>
                    ))
                }
            </Grid>
        </Paper>
     );
}
 
export default CourseList;