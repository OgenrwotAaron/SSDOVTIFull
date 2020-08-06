import React, { useState, useEffect} from 'react';
import axios from 'axios'
import PropTypes from 'prop-types'
import { Hero, Summary, Details } from './components';

import { Grid, makeStyles } from '@material-ui/core';
import { connect } from 'react-redux'

const useStyles = makeStyles(theme=>({
    grid:{
        padding: theme.spacing(3),
    }
}))

const Course = props => {
    const { user, history } = props;

    const classes = useStyles()

    const [course, setCourse] = useState({});
    const [hod, setHod] = useState({});

    useEffect(() => {
        if(user.role===undefined){
            history.push('/')
        }else{
            if(user.role === 2 && user.course_code !==props.match.params.id ){
                history.push('/')
            }else{
                axios.get(`/api/v1/courses/single?code=${props.match.params.id}`)
                .then(res=>{
                    setCourse(res.data.course)
                    setHod(res.data.hod)
                })
            }
        }
    }, [props.match.params.id,history,user.role,user.course_code]);

    return ( 
        <div>
            <Hero title={course.name} cover={course.cover} code={course.code}/>
            <div className={classes.grid}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <Summary user={user} phases={course.phases} modules={course.courseModules} duration={course.duration}/>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <Details hod={hod} user={user} code={course.code} modules={course.courseModules} description={course.description}/>
                    </Grid>
                </Grid>
            </div>
        </div>
     );
}

Course.propTypes = {
    user:PropTypes.object
}

const mapStateToProps = state =>{
    return {
        user:state.loggedUser.user
    }
}
 
export default connect(mapStateToProps)(Course);