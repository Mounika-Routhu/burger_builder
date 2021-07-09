import React from 'react';
import {useHistory} from 'react-router-dom';

import SadBurger from '../../../assets/images/SadBurger.png';
import './UnknownRoute.css'; //accessing in normal way

const UnknownRoute = (props) => {
	const history = useHistory();
	const clickHandler = () => {	
		//props.history.push("/"); //since, this component is rendered using routes
		history.push("/");
	}
	return(
		<div className="UnknownRoute">
			<p>Page Not Found!</p>
			<img src={SadBurger} alt="sad Burger"/>
			<p className="Blinking" onClick={clickHandler}>Don't worry! Let's build a burger</p>
		</div>
	)
}

export default UnknownRoute;