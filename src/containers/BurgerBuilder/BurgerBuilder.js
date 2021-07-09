import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';

const INGREDIENT_PRICES = {
    salad: 10,
    cheese: 15,
    meat: 25,
    bacon: 20
};

class BurgerBuilder extends Component {
    state = {
        purchasing: false
	}

	componentDidMount(){
		this.props.onInitIngredients();
	}

    purchaseHandler = () => {
		if(this.props.isAuth){
			this.setState( { purchasing: true } );
		}
		else{
			this.props.history.push('/auth');
		}
    }

    purchaseCancelHandler = () => {
        this.setState( { purchasing: false } );
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }

    render () {
        const disabledInfo = { ...this.props.ings };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
		const style=  {
			color: '#666464',
			textAlign:'center',
			marginTop: '40%',
			fontSize: '20px'
		}
		
		let burger= this.props.error 
					? <p style={style}>Ingredients can't be loaded!<br/>Try after some time.</p> 
					: <Spinner />;
			
		let orderSummary = null;
		
        if ( this.props.ings && this.props.loading === false) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={(name) => this.props.onIngredientAdded(name, INGREDIENT_PRICES[name])}
                        ingredientRemoved={(name) => this.props.onIngredientRemoved(name, INGREDIENT_PRICES[name])}
                        disabled={disabledInfo}
                        ordered={this.purchaseHandler}
						isAuth={this.props.isAuth}
						ing_price = {INGREDIENT_PRICES}
                        price={this.props.price} />
                </Aux>
            );
			
            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                price={this.props.price}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />
        }
		
	    return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
		error: state.burgerBuilder.error,
		loading: state.burgerBuilder.loading,
		isAuth: state.auth.token !== null
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (name, price) => dispatch(actions.addIngredient(name, price)),
        onIngredientRemoved: (name, price) => dispatch(actions.removeIngredient(name, price)),
		onInitIngredients: () => dispatch(actions.initIngredients())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));