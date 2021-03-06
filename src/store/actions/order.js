import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
	return {
		type: actionTypes.PURCHASE_BURGER_SUCCESS,
		id: id,
		orderData: orderData
	}
}

export const purchaseBurgerFailure = (error) => {
	return {
		type: actionTypes.PURCHASE_BURGER_FAILURE,
		error: error
	}
}

export const purchaseBurgerStart = () => {
	return {
		type: actionTypes.PURCHASE_BURGER_START
	}
}

export const closeModal = () => {
	return {
		type: actionTypes.CLOSE_MODAL
	}
}

export const purchaseBurger = (orderData, token) => {
	return dispatch => {
		dispatch(purchaseBurgerStart())
		axios.post( '/orders.json?auth='+token, orderData )
            .then( response => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData))
            } )
            .catch( error => {
                dispatch(purchaseBurgerFailure(error))          
            } );
	}
}

export const fetchOrdersSuccess = (orders) => {
	return {
		type: actionTypes.FETCH_ORDERS_SUCCESS,
		orders: orders
	}
}

export const fetchOrdersFailure = (error) => {
	return {
		type: actionTypes.FETCH_ORDERS_FAILURE,
		error: error
	}
}

export const fetchOrdersStart = () => {
	return {
		type: actionTypes.FETCH_ORDERS_START
	}
}

export const fetchOrders = (token, userId) => {
	return dispatch => {
		dispatch(fetchOrdersStart());
		const queryParams = '?auth='+ token + '&orderBy="userId"&equalTo="' + userId + '"'
		axios.get('/orders.json' + queryParams)
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrdersSuccess(fetchedOrders));
            })
            .catch( error => {
                dispatch(fetchOrdersFailure(error))          
            } );
	}
}