import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem clicked= {props.clicked}link="/" exact>
			<i className="fa fa-cutlery" aria-hidden="true"></i> Burger Builder</NavigationItem>
		{ props.isAuthenticated
		    ? <NavigationItem clicked= {props.clicked} link="/orders">
				<i className="fa fa-heart" aria-hidden="true"></i> My Orders</NavigationItem> : null }
		{! props.isAuthenticated
			? <NavigationItem clicked= {props.clicked} link="/auth">
				<i className="fa fa-sign-in" aria-hidden="true"></i> Login/Sign Up</NavigationItem>
			: <NavigationItem clicked= {props.clicked} link="/logOut">
				<i className="fa fa-sign-out" aria-hidden="true"></i> LogOut</NavigationItem> }
        
    </ul>
);

export default navigationItems;