import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (name, price) => {
	return {
		type: actionTypes.ADD_INGREDIENT,
		ingName: name,
		ingPrice: price
	}
}

export const removeIngredient = (name, price) => {
	return {
		type: actionTypes.REMOVE_INGREDIENT,
		ingName: name,
		ingPrice: price
	}
}

export const setIngredients = (ingredients) => {
	return {
		type: actionTypes.SET_INGREDIENTS,
		ing: ingredients
	}
}

export const fetchIngredientsFailed = () => {
	return {
		type: actionTypes.FETCH_INGREDIENTS_FAILED,
	}
} 

export const fetchIngredientsStart = () => {
	return {
		type: actionTypes.FETCH_INGREDIENTS_START,
	}
} 


export const initIngredients = () => {
	return (dispatch) => {
		dispatch(fetchIngredientsStart());
		axios.get( '/ingredients.json' )
			.then( response => {
				dispatch(setIngredients(response.data));
			} )
			.catch( error => {
				dispatch(fetchIngredientsFailed());
			} );
	}
}