export default function(state={user:{}},action){
    switch (action.type) {
        case 'SAVE_USER':
            return {
                ...state,
                user:action.payload
            }
        case 'LOGOUT':
            return {
                ...state,
                user:{},
            }
        case 'RELOAD_USER':
            return {
                ...state,
                user:action.payload,
            }
        default:
            return state
    }
}