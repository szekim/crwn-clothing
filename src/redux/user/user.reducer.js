import { UserActionTypes } from './user.types'

const INNITIAL_STATE = {
    curremtUser: null
}

const userReducer = (state = INNITIAL_STATE, action) => {
    switch(action.type) {
        case UserActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            }
        default:
            return state;
    }
}

export default userReducer;