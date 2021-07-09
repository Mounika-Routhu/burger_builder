import React from 'react';
import { useHistory } from 'react-router-dom'

import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.module.css';

const Logo = (props) => {
  	const history = useHistory()
	
	const logoClicked = () => {
		history.push('/')
	}
	
	return (
		<div className={classes.Logo} style={{height: props.height}} onClick={logoClicked}>
			<img src={burgerLogo} alt="MyBurger" />	
		</div>
	);
}
export default Logo;