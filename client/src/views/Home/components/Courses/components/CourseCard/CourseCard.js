import React from 'react';
import { connect } from 'react-redux'
import { Card, CardActionArea, CardMedia, CardContent, Typography, makeStyles, CardActions, Button } from '@material-ui/core';

const useStyles = makeStyles(theme=>({
    root:{
        width:'100%',
        borderRadius:10
    },
    content:{
        textAlign:'start'
    },
    contentImage:{
        height:200
    }
}))

const CourseCard = props => {

    const classes = useStyles()

    const { code, name, cover, user } = props

    return ( 
        <Card elevation={5} className={classes.root}>
            <CardActionArea disabled={user.course_code===code || user.role===0 ? false:true} href={`/course/${code}`} >
                <CardMedia
                    component='img'
                    image={cover}
                    title={name}
                    className={classes.contentImage}
                />
                <CardContent className={classes.content}>
                    <Typography gutterBottom variant='h5' component='h2'>
                        {name}
                    </Typography>
                    <Typography variant='h6' color='textSecondary' component='p'>
                        Code: {code}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button disabled={user.course_code===code || user.role===0 ? false:true} href={`/course/${code}`} variant='contained' color='primary' disableElevation>
                    Start Now
                </Button>
            </CardActions>
        </Card>
     );
}

const mapStateToProps = state =>{
    return {
        user:state.loggedUser.user
    }
}
 
export default connect(mapStateToProps)(CourseCard);