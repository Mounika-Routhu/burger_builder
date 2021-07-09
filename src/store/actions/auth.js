import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
	return{
		type: actionTypes.AUTH_START
	}
}

export const switchAuthHandler = () => {
	return{
		type: actionTypes.SWITCH_HANDLER
	}
}

export const authSuccess = (name, email, idToken, loaclId) => {
	return{
		type: actionTypes.AUTH_SUCCESS,
		name: name,
		email: email,
		tokenID: idToken,
		userId: loaclId
	}
}

export const authFailure = (error) => {
	return{
		type: actionTypes.AUTH_FAILURE,
		error: error
	}
}

export const authLogOut = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('expirationDate');
	localStorage.removeItem('userId');
	localStorage.removeItem('email');
	localStorage.removeItem('name');
	return{
		type: actionTypes.AUTH_LOGOUT,
	}
}

export const setAuthTimeout = (expirationTime) => {
	return dispatch => {
		setTimeout( () => { dispatch(authLogOut()) }, expirationTime*1000 )
	}
}

const setUserData = (name, email, token, userId, expirationDate, expiresIn) => {
	return dispatch => {
		const user = {
			name: name,
			email: email,
			userId: userId
		}
		axios.post('https://routhu-myburger.firebaseio.com/users.json', user)
			.then(response => { 
				setLocalStorage(name, email, token, userId, expirationDate)
				dispatch(authSuccess(name, email, token, userId));
				dispatch(setAuthTimeout(expiresIn))
			})
			.catch(error => dispatch(authFailure('Something went wrong!! Try after some time')))	
	}
}

const getUserData = (email, token, userId, expirationDate, expiresIn) => {
	return dispatch => {
		axios.get('https://routhu-myburger.firebaseio.com/users.json?orderBy="userId"&equalTo="'+ userId + '"')
			.then(response => {
				let userName = null;
				for (let key in response.data) {
					userName = response.data[key].name	
				}
				setLocalStorage(userName, email, token, userId, expirationDate)
				dispatch(authSuccess(userName, email, token, userId));
				dispatch(setAuthTimeout(expiresIn))
			})
			.catch(err => dispatch(authFailure('Something went wrong!! Try after some time')))
	}
}

const setLocalStorage = (name, email, token, userId, expirationDate) => {
	localStorage.setItem('name', name);
	localStorage.setItem('email', email);
	localStorage.setItem('token', token);
	localStorage.setItem('userId', userId);
	localStorage.setItem('expirationDate', expirationDate);
}

export const auth = (name, email, password, isSignin) => {
	return dispatch => {
		const authData = {
			email: email,
			password: password,
			returnSecureToken: true
		}
		
		let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
		if(isSignin){
			url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='
		}
		
		dispatch(authStart());
		
		axios.post(url+'AIzaSyCPy2ugzdca86sPIENPGC68hHQU8pT-fdI', authData)
		.then( response => {
			const expirationDate = new Date(new Date().getTime() + response.data.expiresIn*1000)
			const token = response.data.idToken;
			const userId = response.data.localId;
			const expiresIn = response.data.expiresIn;
			if(!isSignin){
				dispatch(setUserData(name, email, token, userId, expirationDate, expiresIn));	
			} else{
				dispatch(getUserData(email, token, userId, expirationDate, expiresIn));
			}	
		})
		.catch( err => dispatch(authFailure(err.response.data.error)) );
	}
}

export const authCheckState = () => {
	return dispatch => {
		const token = localStorage.getItem('token');
		if(!token){	//nthg to do still do logout
			dispatch(authLogOut());
		} else{
			const expirationDate = new Date(localStorage.getItem('expirationDate'));
			if(expirationDate > new Date()){
				const userId = localStorage.getItem('userId');
				const email = localStorage.getItem('email');
				const name = localStorage.getItem('name');
				dispatch(authSuccess(name, email, token, userId));
				dispatch(setAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000))
			}else{
				dispatch(authLogOut());
			}	
		}
	}
}