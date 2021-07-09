import React, { Component } from 'react';
import { Route, Switch , Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Auth from './containers/Auth/Auth';
import LogOut from './containers/Auth/LogOut';
import Checkout from './containers/Checkout/Checkout';
import * as actions from './store/actions/index';
import asyncComponent from './hoc/AsyncComponent/AsyncComponent';
import UnknownRoute from './components/UI/UnknownRoute/UnknownRoute';

const asyncOrders = asyncComponent( () => import('./containers/Orders/Orders') );

class App extends Component {
	componentDidMount(){
		this.props.onTryAutoSignIn();
	}
	
	render () {
		let routes = 
			<Switch>
				<Route exact path="/auth" component={Auth} />
				<Route exact path="/" component={BurgerBuilder} />
				{/*<Redirect to='/auth' />*/}
				<Route component = {UnknownRoute} />
			</Switch>
		if(this.props.isAuth){
			console.log(this.props.isAuth)
			routes=
				<Switch>
					<Route path="/checkout" component={Checkout} />
					<Route exact path="/orders" component={asyncOrders} />
					<Route exact path="/logOut" component={LogOut} />
					<Route exact path="/auth" component={Auth} />		
					<Route exact path="/" component={BurgerBuilder} />
					{/*<Redirect to='/' />*/}
					<Route component = {UnknownRoute} />
				</Switch>
		}
		return (
		  <div>
			<Layout>
			  {routes}
			</Layout>
		  </div>
		);
	}
}

const mapStateToProps = (state) => {
	return{
		isAuth: state.auth.token !== null
	}
}

const mapDispatchToProps = (dispatch) => {
	return{
		onTryAutoSignIn: () => dispatch(actions.authCheckState())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
