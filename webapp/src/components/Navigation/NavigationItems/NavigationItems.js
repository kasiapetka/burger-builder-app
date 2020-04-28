import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from './NavigationItems.module.css'

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem
            exact
            path='/'
            label='Burger Builder'
        />
        <NavigationItem
            path='/orders'
            label='Orders'
        />
    </ul>

);

export default navigationItems;