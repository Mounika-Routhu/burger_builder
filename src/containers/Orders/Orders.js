import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrders(this.props.token, this.props.userId);
    }

    render () {
		let orders = <Spinner />;

		if(!this.props.loading){ 
			if(this.props.token !== null){
				if(this.props.orders.length !== 0){
				orders = this.props.orders.map(order => (
						<Order 
							key={order.id}
							ingredients={order.ingredients}
							price={order.price} />
					))
				}
				else{
					const style=  {
						color: '#666464',
						textAlign:'center',
						marginTop: '200px',
						fontSize: '20px'
					}
					orders = <p style={style}> No orders yet :( </p>
				}
			}
			else{
				orders = <Redirect to='/auth' />
			}
		}
		
        return orders;
    }
}

const mapStateToProps = state => {
	return {
		loading: state.order.loading,
		orders: state.order.orders,
		token: state.auth.token,
		userId: state.auth.userId
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));