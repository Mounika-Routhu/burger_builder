import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import Input from '../../components/UI/Input/Input';
import * as actions from '../../store/actions/index';
import {checkValidity} from '../../shared/utility';

class Auth extends Component {
    state = {
        controls: {
			name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Name'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
			email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'E-Mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
			password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            }
		},
		isSignin: true
	}
	    
    inputChangedHandler = (event, controlName) => {
        const updatedOrderForm = {
            ...this.state.controls,
			[controlName]: {
				...this.state.controls[controlName],
				value: event.target.value,
				valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
				touched: true
			}
        };
        this.setState({controls: updatedOrderForm});
    }
	
	loginHandler = ( event ) => {
		event.preventDefault();
		this.props.onLoginHandler( this.state.controls.name.value, this.state.controls.email.value, this.state.controls.password.value, this.state.isSignin);

	}
	
	switchAuthHandler = () => {
		this.setState({isSignin: !this.state.isSignin});
		this.props.onSwitchHandler();
	}
	
    render () {
        const formElementsArray = [];
        for (let key in this.state.controls) {
			if(key === 'name'){
				if(!this.state.isSignin){
					formElementsArray.push({
						id: key,
						config: this.state.controls[key]
					});
				}
			}else{
				formElementsArray.push({
					id: key,
					config: this.state.controls[key]
				});
			}
            
        }
        let form = (
            <form onSubmit= {this.loginHandler}>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
			    <Button btnType="Success">{(this.state.isSignin)? 'LOGIN' : 'SIGN UP'}</Button>
            </form>
        );	
		
		const errorStyle = {
			textAlign: 'center',
			color: 'red'
		}
		
		let errorMessage = (this.props.error)
			? <p style={errorStyle}>{ (this.props.error.message)? this.props.error.message: this.props.error }</p>
			: null;	
		
		let auth =  <div >
						{errorMessage}
						{form}
						<Button btnType='Danger' clicked={this.switchAuthHandler}>
							{(this.state.isSignin)? 'CREATE AN ACCOUNT' : 'SIGN IN INSTEAD'}
						</Button>
					</div>
		
		if(this.props.loading){
			auth = <Spinner />
		}
			
		if(this.props.isAuth){
			let path = '/';
			if(this.props.burgerBuilding){
				path = '/checkOut'
			}
			auth = <Redirect to={path} />
		}
        return <div className={classes.Auth}>{auth}</div>
    }
}

const mapStateToProps = (state) =>{
	return{
		loading: state.auth.loading,
		error: state.auth.error,
		isAuth: state.auth.token !== null,
		burgerBuilding: state.burgerBuilder.building
	}
} 

const mapDispatchToProps = (dispatch) =>{
	return{
		onLoginHandler: (name, email, password, isSignin) => {dispatch(actions.auth(name, email, password, isSignin))},
		onSwitchHandler: () => dispatch(actions.switchAuthHandler())
	}
}  

export default connect(mapStateToProps, mapDispatchToProps)(Auth);