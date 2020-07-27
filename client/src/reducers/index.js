import { combineReducers } from "redux";
import loggedUser from './userReducer'

const rootReducer = combineReducers({
    loggedUser
})

export default rootReducer;