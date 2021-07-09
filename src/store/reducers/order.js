import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
	loading: false,
	show: false
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
		case actionTypes.PURCHASE_BURGER_START:
            return {
				...state,
				loading: true
			}
        case actionTypes.PURCHASE_BURGER_SUCCESS:
			const newOrder = {
				...action.orderData,
				id: action.id
			};
            return {
				...state,
				loading: false,
				orders: state.orders.concat(newOrder),
				show: true
			}
        case actionTypes.PURCHASE_BURGER_FAILURE:
            return {
                ...state,
				loading: false                
            }
		case actionTypes.CLOSE_MODAL:
            return {
                ...state,
				show: false                
            }
		case actionTypes.FETCH_ORDERS_START:
            return {
				...state,
				loading: true
			}
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return {
				...state,
				loading: false,
				orders: action.orders,
			}
        case actionTypes.FETCH_ORDERS_FAILURE:
            return {
                ...state,
				loading: false                
            }
        default:
            return state;
    }
};

export default reducer;