import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    totalPrice: 30,
	error: false,
	loading: false,
	building: false
};

const addIngredients = (state, action) => {
	return {
		...state,
		ingredients: {
			...state.ingredients,
			[action.ingName]: state.ingredients[action.ingName] + 1
		},
		totalPrice: state.totalPrice + action.ingPrice,
		building: true
	};
}

const removeIngredients = (state, action) => {
	return {
		...state,
		ingredients: {
			...state.ingredients,
			[action.ingName]: state.ingredients[action.ingName] - 1
		},
		totalPrice: state.totalPrice - action.ingPrice,
		building: true
	}
}

const setIngredients = (state, action) => {
	return {
		// ingredients: action.ing,
		ingredients: {
			salad: action.ing.salad,
			bacon: action.ing.bacon,
			cheese: action.ing.cheese,
			meat: action.ing.meat
		},
		totalPrice: 30,
		error: false,
		loading: false,
		building: false
	};
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_INGREDIENT: return addIngredients(state, action);            
        case actionTypes.REMOVE_INGREDIENT: return removeIngredients(state, action); 
		case actionTypes.FETCH_INGREDIENTS_START: return { ...state, loading: true };	
		case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
		case actionTypes.FETCH_INGREDIENTS_FAILED: return { ...state, error: true };
        default: return state;
    }
};

export default reducer;