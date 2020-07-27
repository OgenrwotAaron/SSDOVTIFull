import { cloneElement } from 'react'
import PropTypes from 'prop-types'
import { useScrollTrigger } from '@material-ui/core'
import palette from 'theme/palette'

const ElevationScroll = props => {

    const { children } = props

    const trigger = useScrollTrigger({
        disableHysteresis:true,
        threshold:0
    })

    return cloneElement(children,{
        elevation: trigger ? 4:0,
        style:{
            backgroundColor: trigger ? palette.primary.main : '#ffffff00',
            transition:'background-color 0.3s',
        }
    })
}

ElevationScroll.propTypes = {
    children:PropTypes.element.isRequired
}
 
export default ElevationScroll;