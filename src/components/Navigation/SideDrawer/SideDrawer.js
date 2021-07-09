import React from 'react';

import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

const sideDrawer = ( props ) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
	
    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>	
                <h2 className={classes.Title} onClick={props.closed}>
					{props.isAuth
						? <span><i className="fa fa-user-circle fa-lg" aria-hidden="true"></i> Hello, {props.userName}</span> 
						: 'My Burger'}
				</h2>
				<hr/>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth} clicked={props.closed}/>
                </nav>
            </div>
        </Aux>
    );
};

export default sideDrawer;