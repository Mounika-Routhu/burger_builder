import React from 'react';

import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = ( props ) => (
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleClicked} />
		<div style={{height:'100%', display:'flex', alignItems: 'center'}}>
			<div className={classes.Logo} onClick={props.logoClicked}>
				<Logo />
			</div>
			<h3 className={[classes.DesktopOnly, classes.User].join(' ')}>
				{props.isAuth? 'Welcome, '+ props.userName : null}
			</h3>
		</div>   
        <nav className={classes.DesktopOnly}>	
            <NavigationItems isAuthenticated= {props.isAuth}/>
        </nav>
    </header>
);

export default toolbar;