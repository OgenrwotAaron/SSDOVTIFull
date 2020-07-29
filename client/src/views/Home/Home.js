import React from 'react';
import PropTypes from 'prop-types'
import { Hero, Courses, Vision, AboutUs, Start } from './components';

import { connect } from 'react-redux';

const Home = props => {

    const { user } = props

    return ( 
        <div>
            <Hero user={user}/>
            <Courses user={user}/>
            <Vision/>
            <AboutUs/>
            { user.role ? null:<Start/>}
        </div>
     );
}

Home.propTypes = {
    user:PropTypes.object
}

const mapStateToProps = state =>{
    return{
        user:state.loggedUser.user
    }
}
 
export default connect(mapStateToProps)(Home);
