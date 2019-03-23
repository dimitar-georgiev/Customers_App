import React from 'react';

import classes from './NavigationItems.css';

import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem
            link="/"
            exact
        >Home</NavigationItem>
        
        <NavigationItem
            link="/customers"
        >Customers</NavigationItem>
    </ul>
);

export default navigationItems;