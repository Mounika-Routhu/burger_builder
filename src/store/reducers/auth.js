import * as actionTypes from '../actions/actionTypes';

const initialState = {
	name: null,
	email: null,
	token: null,
	userId: null,
	error: null,
	loading: false
}

const reducer = (state=initialState, action) => {
	switch(action.type) {
		case(actionTypes.AUTH_START):
			return {
				...state,
				error: null,
				loading: true
			}
		case(actionTypes.SWITCH_HANDLER):
			return{
				...state,
				error: null
			}
		case(actionTypes.AUTH_SUCCESS):
			return {
				...state,
				name: action.name[0].toUpperCase() + action.name.slice(1).toLowerCase(),
				email: action.email,
				token: action.tokenID,
				userId: action.userId,
				error: null,
				loading: false
			}
		case(actionTypes.AUTH_FAILURE):
			return {
				...state,
				error: action.error,
				loading: false
			}
		case(actionTypes.AUTH_LOGOUT):
			return {
				...state,
				email: null,
				token: null,
				userId: null
			}
		default:
			return state
	}
}

export default reducer;