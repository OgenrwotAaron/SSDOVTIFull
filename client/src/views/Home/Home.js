import React from 'react';
import PropTypes from 'prop-types'
import { Hero, Courses, Vision, AboutUs, Start } from './components';

import { connect } from 'react-redux';
import { logOut } from '../../actions'
import { bindActionCreators } from 'redux';

const Home = props => {

    const { user, logOut } = props

    if(user===undefined){
        logOut()
    }

    console.log(user)

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

const mapDispatchToProps = dispatch =>{
    return bindActionCreators({logOut},dispatch)
}
 
export default connect(mapStateToProps,mapDispatchToProps)(Home);