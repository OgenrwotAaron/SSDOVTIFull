export default function(state={},action){
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